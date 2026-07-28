import { prisma } from "@/lib/prisma";

// Calendar date (UTC-midnight) for the IST day `offsetDays` from now.
function istDate(offsetDays = 0): Date {
  const ms = Date.now() + 5.5 * 3600_000 + offsetDays * 86_400_000;
  const d = new Date(ms);
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}
const dateKey = (d: Date) => d.toISOString().slice(0, 10);

type ChapterStat = { chapterId: string; attempted: number; correct: number };

export type StreakSummary = { streak: number; doneToday: boolean; atRisk: boolean };

// Effective streak for display — derived from lastStudyDay vs the current IST day.
// The cached User.currentStreak is only recomputed on activity (never after a missed
// day), so reading it raw would keep showing a broken streak. today -> stands & done;
// yesterday -> stands but at risk of breaking today; older/none -> effectively 0.
export async function getStreakSummary(userId: string): Promise<StreakSummary> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { currentStreak: true, lastStudyDay: true },
  });
  const streak = user?.currentStreak ?? 0;
  const last = user?.lastStudyDay ? dateKey(user.lastStudyDay) : null;
  if (last === dateKey(istDate())) return { streak, doneToday: true, atRisk: false };
  if (last === dateKey(istDate(-1))) return { streak, doneToday: false, atRisk: true };
  return { streak: 0, doneToday: false, atRisk: false };
}

// Log today's study activity + advance the consecutive-IST-day streak.
export async function bumpStudyStreak(userId: string, questionsAnswered = 0, secondsStudied = 0, explainersRead = 0) {
  const today = istDate();
  await prisma.studyDay.upsert({
    where: { userId_day: { userId, day: today } },
    update: {
      questionsAnswered: { increment: questionsAnswered },
      secondsStudied: { increment: secondsStudied },
      explainersRead: { increment: explainersRead },
    },
    create: { userId, day: today, questionsAnswered, secondsStudied, explainersRead },
  });

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { currentStreak: true, longestStreak: true, lastStudyDay: true },
  });
  let streak: number;
  const last = user?.lastStudyDay ? dateKey(user.lastStudyDay) : null;
  if (last === dateKey(today)) streak = user?.currentStreak || 1;
  else if (last === dateKey(istDate(-1))) streak = (user?.currentStreak || 0) + 1;
  else streak = 1;
  const longest = Math.max(user?.longestStreak ?? 0, streak);

  await prisma.user.update({
    where: { id: userId },
    data: { currentStreak: streak, longestStreak: longest, lastStudyDay: today, lastActiveAt: new Date() },
  });
}

export type HeatCell = { key: string | null; level: 0 | 1 | 2 | 3 | 4 };

// A GitHub-style "don't break the chain" grid of the last `weeks` weeks, columns =
// weeks, rows = Sun..Sat. Cells past today (top-right of the current week) are null.
// Level buckets a day's total activity (questions answered + explainers finished).
export async function getStudyHeatmap(userId: string, weeks = 13): Promise<{ grid: HeatCell[][]; activeDays: number }> {
  const rows = await prisma.studyDay.findMany({
    where: { userId, day: { gte: istDate(-(weeks * 7 + 7)) } },
    select: { day: true, questionsAnswered: true, explainersRead: true },
  });
  const activity = new Map<string, number>();
  for (const r of rows) activity.set(dateKey(r.day), r.questionsAnswered + r.explainersRead);

  const bucket = (n: number): 0 | 1 | 2 | 3 | 4 => (n <= 0 ? 0 : n < 10 ? 1 : n < 30 ? 2 : n < 80 ? 3 : 4);
  const todayDow = istDate().getUTCDay(); // 0=Sun
  const startOffset = -(todayDow + (weeks - 1) * 7); // Sunday of the earliest shown week

  const grid: HeatCell[][] = [];
  let activeDays = 0;
  for (let col = 0; col < weeks; col++) {
    const week: HeatCell[] = [];
    for (let row = 0; row < 7; row++) {
      const offset = startOffset + col * 7 + row;
      if (offset > 0) {
        week.push({ key: null, level: 0 }); // a future day in the current (partial) week
        continue;
      }
      const key = dateKey(istDate(offset));
      const level = bucket(activity.get(key) ?? 0);
      if (level > 0) activeDays++;
      week.push({ key, level });
    }
    grid.push(week);
  }
  return { grid, activeDays };
}

// Records LMS progress after a logged-in user submits a test.
export async function recordTestProgress(input: {
  userId: string;
  examId: string;
  perChapter: ChapterStat[];
  totalAnswered: number;
  timeTakenSec: number;
}) {
  const { userId, examId, perChapter, totalAnswered, timeTakenSec } = input;

  // Chapter progress — practising a chapter's test marks it DONE + accrues mastery.
  // Run the independent upserts concurrently (was a serial N+1 loop).
  await Promise.all(
    perChapter.map((c) =>
      prisma.chapterProgress.upsert({
        where: { userId_chapterId: { userId, chapterId: c.chapterId } },
        update: {
          questionsAttempted: { increment: c.attempted },
          questionsCorrect: { increment: c.correct },
          status: "DONE",
        },
        create: {
          userId,
          chapterId: c.chapterId,
          examId,
          questionsAttempted: c.attempted,
          questionsCorrect: c.correct,
          status: "DONE",
        },
      }),
    ),
  );

  // Enrollment rollup (which exams the student is pursuing + % chapters done).
  const [totalChapters, chaptersDone] = await Promise.all([
    prisma.chapter.count({ where: { examId } }),
    prisma.chapterProgress.count({ where: { userId, examId } }),
  ]);
  await prisma.enrollment.upsert({
    where: { userId_examId: { userId, examId } },
    update: { lastActiveAt: new Date(), chaptersDone, totalChapters },
    create: { userId, examId, lastActiveAt: new Date(), chaptersDone, totalChapters },
  });

  // Daily study log + streak.
  await bumpStudyStreak(userId, totalAnswered, timeTakenSec);
}
