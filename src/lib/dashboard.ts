import { prisma } from "@/lib/prisma";
import { getBadges } from "@/lib/badges";
import { getStudyHeatmap } from "@/lib/progress";

export async function getDashboardData(userId: string) {
  const attempts = await prisma.attempt.findMany({
    where: { userId, status: "SUBMITTED" },
    include: { mockTest: { include: { exam: true } } },
    orderBy: { submittedAt: "desc" },
  });

  // Per-chapter accuracy (weak areas) from the maintained ChapterProgress rollup —
  // recordTestProgress increments attempted/correct per chapter on each submit, so this
  // is one indexed read per user instead of scanning every Answer row they ever wrote.
  const chapterRollup = await prisma.chapterProgress.findMany({
    where: { userId, questionsAttempted: { gt: 0 } },
    select: { questionsAttempted: true, questionsCorrect: true, chapter: { select: { name: true } } },
  });

  const weakAreas = chapterRollup
    .map((c) => ({
      name: c.chapter.name,
      accuracy: Math.round((c.questionsCorrect / c.questionsAttempted) * 100),
      total: c.questionsAttempted,
    }))
    .sort((a, b) => a.accuracy - b.accuracy);

  const pcts = attempts.map((a) => (a.totalMarks > 0 ? ((a.score ?? 0) / a.totalMarks) * 100 : 0));
  const stats = {
    testsTaken: attempts.length,
    avg: pcts.length ? Math.round(pcts.reduce((s, x) => s + x, 0) / pcts.length) : 0,
    best: pcts.length ? Math.round(Math.max(...pcts)) : 0,
  };

  const [user, enrollments, reading, mistakes, explainersRead, heatmap, bookmarksCount] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId }, select: { currentStreak: true, longestStreak: true } }),
    prisma.enrollment.findMany({
      where: { userId },
      include: { exam: { select: { name: true, shortName: true, emoji: true, slug: true } } },
      orderBy: { lastActiveAt: "desc" },
    }),
    prisma.explainerProgress.findMany({
      where: { userId, status: "IN_PROGRESS" },
      include: { explainer: { select: { slug: true, title: true } } },
      orderBy: { lastReadAt: "desc" },
      take: 3,
    }),
    prisma.answer.findMany({
      where: { attempt: { userId, status: "SUBMITTED" }, isCorrect: false },
      distinct: ["questionId"],
      select: { questionId: true },
    }),
    prisma.explainerProgress.count({ where: { userId, status: "DONE" } }),
    getStudyHeatmap(userId),
    prisma.bookmark.count({ where: { userId, questionId: { not: null } } }),
  ]);

  const totalAnswered = attempts.reduce((a, x) => a + x.correctCount + x.wrongCount, 0);
  const badges = getBadges({
    testsTaken: stats.testsTaken,
    bestPct: stats.best,
    streak: user?.currentStreak ?? 0,
    totalAnswered,
    explainersRead,
  });

  return {
    attempts,
    weakAreas,
    stats,
    streak: { current: user?.currentStreak ?? 0, longest: user?.longestStreak ?? 0 },
    enrollments,
    reading,
    mistakesCount: mistakes.length,
    bookmarksCount,
    badges,
    heatmap,
  };
}
