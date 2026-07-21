import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import { getExamGoal } from "@/lib/enroll";
import StudyBrowser, { type StudyExplainer, type StudyExam } from "@/components/StudyBrowser";

export const metadata: Metadata = {
  title: "Study — Visual Explainers",
  description:
    "Learn every concept with simple analogies, worked examples and quick checks — then test yourself. 100% free, for SSC, Banking, Railways, UPSC, JEE, NEET and CBSE boards.",
  alternates: { canonical: "/study" },
};

export default async function StudyPage() {
  const [rows, user, goal] = await Promise.all([
    prisma.explainer.findMany({
      where: { status: "PUBLISHED" },
      select: {
        slug: true,
        title: true,
        summary: true,
        readingMinutes: true,
        exam: { select: { slug: true, shortName: true, emoji: true } },
        subject: { select: { name: true, order: true } },
      },
      orderBy: [{ examId: "asc" }, { title: "asc" }],
    }),
    getSessionUser(),
    getExamGoal(),
  ]);

  // Reading progress, logged-in only — powers the progress bars and the
  // "continue reading" strip. Guests just don't get them.
  const progress = new Map<string, { pct: number; done: boolean; lastReadAt: number }>();
  if (user) {
    const p = await prisma.explainerProgress.findMany({
      where: { userId: user.id },
      select: { scrollPct: true, status: true, lastReadAt: true, explainer: { select: { slug: true } } },
    });
    for (const r of p) {
      progress.set(r.explainer.slug, {
        pct: r.scrollPct,
        done: r.status === "DONE",
        lastReadAt: r.lastReadAt.getTime(),
      });
    }
  }

  const explainers: StudyExplainer[] = rows
    .filter((e) => e.exam) // an explainer with no exam can't be grouped or filtered
    .map((e) => {
      const pr = progress.get(e.slug);
      return {
        slug: e.slug,
        title: e.title,
        summary: e.summary ?? "",
        minutes: e.readingMinutes,
        examSlug: e.exam!.slug,
        examLabel: e.exam!.shortName,
        examEmoji: e.exam!.emoji ?? "📘",
        subject: e.subject?.name ?? "General",
        subjectOrder: e.subject?.order ?? 999,
        pct: pr?.pct ?? null,
        done: pr?.done ?? false,
        lastReadAt: pr?.lastReadAt ?? null,
      };
    });

  // Exam chips — only exams that actually have explainers, in first-seen order.
  const examMap = new Map<string, StudyExam>();
  for (const e of explainers) {
    const cur = examMap.get(e.examSlug);
    if (cur) cur.count++;
    else examMap.set(e.examSlug, { slug: e.examSlug, label: e.examLabel, emoji: e.examEmoji, count: 1 });
  }
  const exams = [...examMap.values()];

  // Default the filter to the student's goal, but only if it has explainers.
  const defaultExam = goal && examMap.has(goal) ? goal : "all";

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="font-display text-h1 font-extrabold tracking-tight text-foreground">Visual explainers</h1>
        <p className="mt-2 text-body text-muted">
          Understand the concept first — with analogies, worked examples and a quick self-check — then take the
          matching test. Every explainer is free.
        </p>
      </div>

      {explainers.length === 0 ? (
        <p className="mt-8 text-body text-muted">Explainers are being added — check back soon!</p>
      ) : (
        <StudyBrowser explainers={explainers} exams={exams} defaultExam={defaultExam} signedIn={!!user} />
      )}
    </div>
  );
}
