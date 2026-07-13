"use server";

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { syncUser } from "@/lib/auth";
import { recordTestProgress } from "@/lib/progress";
import { ANON_COOKIE } from "@/lib/anon";

export type SubmitInput = {
  mockTestId: string;
  anonId: string;
  timeTakenSec: number;
  answers: { questionId: string; selectedOptionId: string }[];
  times?: { questionId: string; seconds: number }[];
  clientAttemptId?: string; // client-generated id → makes submit idempotent (retry-safe)
};

const clampSec = (n: number, max: number) => Math.min(max, Math.max(0, Math.round(Number(n) || 0)));

// Scoring is computed SERVER-SIDE (authoritative) — never trust the client for correctness.
export async function submitAttempt(input: SubmitInput): Promise<{ attemptId: string }> {
  // Idempotency: a retried submit with the same clientAttemptId returns the first result.
  // (An IN_PROGRESS attempt with this id is finalized below, not short-circuited here.)
  if (input.clientAttemptId) {
    const existing = await prisma.attempt.findUnique({
      where: { clientAttemptId: input.clientAttemptId },
      select: { id: true, status: true },
    });
    if (existing?.status === "SUBMITTED") return { attemptId: existing.id };
  }

  const test = await prisma.mockTest.findUnique({
    where: { id: input.mockTestId },
    include: {
      questions: {
        orderBy: { order: "asc" },
        include: { question: { include: { options: true } } },
      },
    },
  });
  if (!test) throw new Error("Test not found");

  const durationSec = test.durationMinutes * 60;
  // Only trust answers/times for questions that actually belong to this test.
  const validQ = new Set(test.questions.map((tq) => tq.question.id));
  const selectedByQ = new Map(
    (input.answers ?? []).filter((a) => validQ.has(a.questionId)).map((a) => [a.questionId, a.selectedOptionId]),
  );
  const timeByQ = new Map((input.times ?? []).filter((t) => validQ.has(t.questionId)).map((t) => [t.questionId, t.seconds]));

  let correctCount = 0;
  let wrongCount = 0;
  let unattemptedCount = 0;
  let score = 0;
  const perChapter = new Map<string, { attempted: number; correct: number }>();

  const answerRows = test.questions.map((tq) => {
    const q = tq.question;
    const selectedOptionId = selectedByQ.get(q.id) ?? null;

    const timeSpentSec = timeByQ.has(q.id) ? clampSec(timeByQ.get(q.id) as number, 14400) : null;

    if (!selectedOptionId) {
      unattemptedCount++;
      return { questionId: q.id, selectedOptionId: null, isCorrect: null as boolean | null, timeSpentSec };
    }

    const correctOption = q.options.find((o) => o.isCorrect);
    const isCorrect = !!correctOption && correctOption.id === selectedOptionId;

    if (isCorrect) {
      correctCount++;
      score += q.marks;
    } else {
      wrongCount++;
      score -= test.negativeMarking ? q.negativeMarks : 0;
    }
    if (q.chapterId) {
      const e = perChapter.get(q.chapterId) ?? { attempted: 0, correct: 0 };
      e.attempted++;
      if (isCorrect) e.correct++;
      perChapter.set(q.chapterId, e);
    }
    return { questionId: q.id, selectedOptionId, isCorrect, timeSpentSec };
  });

  // If signed in, own the attempt directly; otherwise tag it with the guest anonId.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) await syncUser(user);

  // Guests: bind their anonId to an httpOnly cookie so only they can view the result.
  if (!user && input.anonId) {
    (await cookies()).set(ANON_COOKIE, input.anonId, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 180,
    });
  }

  const finalData = {
    userId: user?.id ?? null,
    anonId: user ? null : input.anonId,
    status: "SUBMITTED" as const,
    score,
    totalMarks: test.totalMarks,
    correctCount,
    wrongCount,
    unattemptedCount,
    timeTakenSec: clampSec(input.timeTakenSec, durationSec),
    submittedAt: new Date(),
    progressJson: null,
  };

  // A server-side IN_PROGRESS attempt (from cross-device resume) is finalized in place;
  // otherwise a fresh SUBMITTED attempt is created.
  const prior = input.clientAttemptId
    ? await prisma.attempt.findUnique({ where: { clientAttemptId: input.clientAttemptId }, select: { id: true } })
    : null;

  let attempt: { id: string };
  try {
    if (prior) {
      await prisma.answer.deleteMany({ where: { attemptId: prior.id } });
      attempt = await prisma.attempt.update({
        where: { id: prior.id },
        data: { ...finalData, answers: { create: answerRows } },
        select: { id: true },
      });
    } else {
      attempt = await prisma.attempt.create({
        data: {
          mockTestId: test.id,
          clientAttemptId: input.clientAttemptId ?? null,
          ...finalData,
          answers: { create: answerRows },
        },
        select: { id: true },
      });
    }
  } catch (e) {
    // Concurrent retry with the same clientAttemptId lost the race — return the winner.
    if (input.clientAttemptId) {
      const winner = await prisma.attempt.findUnique({
        where: { clientAttemptId: input.clientAttemptId },
        select: { id: true },
      });
      if (winner) return { attemptId: winner.id };
    }
    throw e;
  }

  // Record LMS progress (streak, chapter completion, syllabus %) — non-fatal.
  if (user) {
    try {
      await recordTestProgress({
        userId: user.id,
        examId: test.examId,
        perChapter: [...perChapter.entries()].map(([chapterId, s]) => ({ chapterId, ...s })),
        totalAnswered: correctCount + wrongCount,
        timeTakenSec: input.timeTakenSec,
      });
    } catch (e) {
      console.error("[submitAttempt] recordTestProgress failed:", e);
    }
  }

  return { attemptId: attempt.id };
}
