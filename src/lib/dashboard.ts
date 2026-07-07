import { prisma } from "@/lib/prisma";
import { getBadges } from "@/lib/badges";

export async function getDashboardData(userId: string) {
  const attempts = await prisma.attempt.findMany({
    where: { userId, status: "SUBMITTED" },
    include: { mockTest: { include: { exam: true } } },
    orderBy: { submittedAt: "desc" },
  });

  // Per-chapter accuracy (weak areas) from this user's answered questions.
  const answers = await prisma.answer.findMany({
    where: {
      attempt: { userId, status: "SUBMITTED" },
      selectedOptionId: { not: null },
    },
    select: {
      isCorrect: true,
      question: { select: { chapter: { select: { id: true, name: true } } } },
    },
  });

  const byChapter = new Map<string, { name: string; correct: number; total: number }>();
  for (const a of answers) {
    const ch = a.question.chapter;
    if (!ch) continue;
    const e = byChapter.get(ch.id) ?? { name: ch.name, correct: 0, total: 0 };
    e.total++;
    if (a.isCorrect) e.correct++;
    byChapter.set(ch.id, e);
  }

  const weakAreas = [...byChapter.values()]
    .map((e) => ({ name: e.name, accuracy: Math.round((e.correct / e.total) * 100), total: e.total }))
    .sort((a, b) => a.accuracy - b.accuracy);

  const pcts = attempts.map((a) => (a.totalMarks > 0 ? ((a.score ?? 0) / a.totalMarks) * 100 : 0));
  const stats = {
    testsTaken: attempts.length,
    avg: pcts.length ? Math.round(pcts.reduce((s, x) => s + x, 0) / pcts.length) : 0,
    best: pcts.length ? Math.round(Math.max(...pcts)) : 0,
  };

  const [user, enrollments, reading, mistakes, explainersRead] = await Promise.all([
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
    prisma.explainerProgress.count({ where: { userId } }),
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
    badges,
  };
}
