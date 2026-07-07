"use server";

import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { syncUser } from "@/lib/auth";
import { recordTestProgress } from "@/lib/progress";

export type SubmitInput = {
  mockTestId: string;
  anonId: string;
  timeTakenSec: number;
  answers: { questionId: string; selectedOptionId: string }[];
  times?: { questionId: string; seconds: number }[];
};

// Scoring is computed SERVER-SIDE (authoritative) — never trust the client for correctness.
export async function submitAttempt(input: SubmitInput): Promise<{ attemptId: string }> {
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

  const selectedByQ = new Map(input.answers.map((a) => [a.questionId, a.selectedOptionId]));
  const timeByQ = new Map((input.times ?? []).map((t) => [t.questionId, t.seconds]));

  let correctCount = 0;
  let wrongCount = 0;
  let unattemptedCount = 0;
  let score = 0;
  const perChapter = new Map<string, { attempted: number; correct: number }>();

  const answerRows = test.questions.map((tq) => {
    const q = tq.question;
    const selectedOptionId = selectedByQ.get(q.id) ?? null;

    if (!selectedOptionId) {
      unattemptedCount++;
      return { questionId: q.id, selectedOptionId: null, isCorrect: null as boolean | null, timeSpentSec: timeByQ.get(q.id) ?? null };
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
    return { questionId: q.id, selectedOptionId, isCorrect, timeSpentSec: timeByQ.get(q.id) ?? null };
  });

  // If signed in, own the attempt directly; otherwise tag it with the guest anonId.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) await syncUser(user);

  const attempt = await prisma.attempt.create({
    data: {
      mockTestId: test.id,
      userId: user?.id ?? null,
      anonId: user ? null : input.anonId,
      status: "SUBMITTED",
      score,
      totalMarks: test.totalMarks,
      correctCount,
      wrongCount,
      unattemptedCount,
      timeTakenSec: input.timeTakenSec,
      submittedAt: new Date(),
      answers: { create: answerRows },
    },
  });

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
