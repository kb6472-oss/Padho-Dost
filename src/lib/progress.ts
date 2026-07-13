import { prisma } from "@/lib/prisma";

// Calendar date (UTC-midnight) for the IST day `offsetDays` from now.
function istDate(offsetDays = 0): Date {
  const ms = Date.now() + 5.5 * 3600_000 + offsetDays * 86_400_000;
  const d = new Date(ms);
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}
const dateKey = (d: Date) => d.toISOString().slice(0, 10);

type ChapterStat = { chapterId: string; attempted: number; correct: number };

// Log today's study activity + advance the consecutive-IST-day streak.
export async function bumpStudyStreak(userId: string, questionsAnswered = 0, secondsStudied = 0) {
  const today = istDate();
  await prisma.studyDay.upsert({
    where: { userId_day: { userId, day: today } },
    update: { questionsAnswered: { increment: questionsAnswered }, secondsStudied: { increment: secondsStudied } },
    create: { userId, day: today, questionsAnswered, secondsStudied },
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
