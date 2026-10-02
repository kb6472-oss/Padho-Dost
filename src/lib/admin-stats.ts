import { prisma } from "@/lib/prisma";

// ─────────────────────────────────────────────────────────────────────────────
// Read-only aggregates for the /admin dashboard. Callers MUST gate on isAdmin().
// Visitors who never start a test aren't in the DB (Google Analytics covers raw
// traffic); this is the "what are students actually doing" view: test attempts,
// sign-ups, activity, popular content. Days are bucketed in IST.
// ─────────────────────────────────────────────────────────────────────────────

const DAY = 86_400_000;
const since = (days: number) => new Date(Date.now() - days * DAY);
const n = (v: unknown) => Number(v ?? 0); // raw-SQL counts arrive as bigint

export type DailyPoint = { day: string; started: number; finished: number; people: number; signups: number };

export async function getAdminOverview() {
  const d1 = since(1), d7 = since(7), d30 = since(30);

  const [
    usersTotal, usersNew7, usersNew30, activeUsers7,
    started1, started7, started30, finished7, finished30,
    takers7, takers30, avgPct30, daily, signupsDaily, topTests, topExams, goals,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { createdAt: { gte: d7 } } }),
    prisma.user.count({ where: { createdAt: { gte: d30 } } }),
    prisma.user.count({ where: { lastActiveAt: { gte: d7 } } }),
    prisma.attempt.count({ where: { startedAt: { gte: d1 } } }),
    prisma.attempt.count({ where: { startedAt: { gte: d7 } } }),
    prisma.attempt.count({ where: { startedAt: { gte: d30 } } }),
    prisma.attempt.count({ where: { status: "SUBMITTED", submittedAt: { gte: d7 } } }),
    prisma.attempt.count({ where: { status: "SUBMITTED", submittedAt: { gte: d30 } } }),
    takers(d7),
    takers(d30),
    prisma.$queryRaw<{ pct: number | null }[]>`
      SELECT avg("score" / NULLIF("totalMarks", 0)) AS pct FROM "Attempt"
      WHERE "status" = 'SUBMITTED' AND "submittedAt" >= ${d30} AND "score" IS NOT NULL`,
    prisma.$queryRaw<{ day: string; started: bigint; finished: bigint; people: bigint }[]>`
      SELECT to_char(("startedAt" AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Kolkata', 'YYYY-MM-DD') AS day,
             count(*) AS started,
             count(*) FILTER (WHERE "status" = 'SUBMITTED') AS finished,
             count(DISTINCT coalesce("userId", "anonId")) AS people
      FROM "Attempt" WHERE "startedAt" >= ${d30} GROUP BY 1`,
    prisma.$queryRaw<{ day: string; signups: bigint }[]>`
      SELECT to_char(("createdAt" AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Kolkata', 'YYYY-MM-DD') AS day, count(*) AS signups
      FROM "User" WHERE "createdAt" >= ${d30} GROUP BY 1`,
    prisma.$queryRaw<{ id: string; title: string; exam: string; started: bigint; finished: bigint }[]>`
      SELECT t."id", t."title", e."shortName" AS exam, count(*) AS started,
             count(*) FILTER (WHERE a."status" = 'SUBMITTED') AS finished
      FROM "Attempt" a JOIN "MockTest" t ON t."id" = a."mockTestId" JOIN "Exam" e ON e."id" = t."examId"
      WHERE a."startedAt" >= ${d30} GROUP BY t."id", t."title", e."shortName" ORDER BY started DESC LIMIT 10`,
    prisma.$queryRaw<{ exam: string; started: bigint; people: bigint }[]>`
      SELECT e."shortName" AS exam, count(*) AS started, count(DISTINCT coalesce(a."userId", a."anonId")) AS people
      FROM "Attempt" a JOIN "MockTest" t ON t."id" = a."mockTestId" JOIN "Exam" e ON e."id" = t."examId"
      WHERE a."startedAt" >= ${d30} GROUP BY e."shortName" ORDER BY started DESC LIMIT 10`,
    prisma.user.groupBy({ by: ["targetExamSlug"], where: { targetExamSlug: { not: null } }, _count: { _all: true } }),
  ]);

  // Fill every one of the last 30 IST days so the chart has no gaps.
  const byDay = new Map(daily.map((r) => [r.day, r]));
  const suByDay = new Map(signupsDaily.map((r) => [r.day, n(r.signups)]));
  const series: DailyPoint[] = [];
  for (let i = 29; i >= 0; i--) {
    const day = new Date(Date.now() + 5.5 * 3_600_000 - i * DAY).toISOString().slice(0, 10);
    const r = byDay.get(day);
    series.push({ day, started: n(r?.started), finished: n(r?.finished), people: n(r?.people), signups: suByDay.get(day) ?? 0 });
  }

  return {
    users: { total: usersTotal, new7: usersNew7, new30: usersNew30, active7: activeUsers7 },
    attempts: { today: started1, started7, started30, finished7, finished30 },
    takers: { d7: takers7, d30: takers30 },
    avgScorePct30: avgPct30[0]?.pct == null ? null : Math.round(Number(avgPct30[0].pct) * 100),
    series,
    topTests: topTests.map((t) => ({ ...t, started: n(t.started), finished: n(t.finished) })),
    topExams: topExams.map((e) => ({ exam: e.exam, started: n(e.started), people: n(e.people) })),
    goals: goals
      .map((g) => ({ exam: g.targetExamSlug as string, count: g._count._all }))
      .sort((a, b) => b.count - a.count),
  };
}

// Distinct people who started a test since `from`, split signed-in vs guest.
async function takers(from: Date) {
  const [r] = await prisma.$queryRaw<{ registered: bigint; guests: bigint }[]>`
    SELECT count(DISTINCT "userId") AS registered,
           count(DISTINCT "anonId") FILTER (WHERE "userId" IS NULL) AS guests
    FROM "Attempt" WHERE "startedAt" >= ${from}`;
  return { registered: n(r?.registered), guests: n(r?.guests) };
}

const attemptSelect = {
  id: true, status: true, score: true, totalMarks: true, correctCount: true, wrongCount: true,
  timeTakenSec: true, startedAt: true, submittedAt: true, anonId: true,
  user: { select: { id: true, email: true, name: true } },
  mockTest: { select: { id: true, title: true, exam: { select: { shortName: true } } } },
} as const;

export async function getRecentAttempts(take = 40) {
  return prisma.attempt.findMany({ orderBy: { startedAt: "desc" }, take, select: attemptSelect });
}

export async function getAdminStudents(q?: string) {
  const query = q?.trim();
  const users = await prisma.user.findMany({
    where: query
      ? { OR: [{ email: { contains: query, mode: "insensitive" } }, { name: { contains: query, mode: "insensitive" } }] }
      : {},
    orderBy: [{ lastActiveAt: { sort: "desc", nulls: "last" } }, { createdAt: "desc" }],
    take: 200,
    select: {
      id: true, email: true, name: true, targetExamSlug: true, createdAt: true, lastActiveAt: true,
      currentStreak: true, longestStreak: true, _count: { select: { attempts: true } },
    },
  });
  const ids = users.map((u) => u.id);
  const scores = ids.length
    ? await prisma.$queryRaw<{ userId: string; pct: number | null; finished: bigint }[]>`
        SELECT "userId", avg("score" / NULLIF("totalMarks", 0)) AS pct, count(*) AS finished
        FROM "Attempt" WHERE "userId" = ANY(${ids}) AND "status" = 'SUBMITTED' GROUP BY "userId"`
    : [];
  const byUser = new Map(scores.map((s) => [s.userId, s]));
  return users.map((u) => {
    const s = byUser.get(u.id);
    return {
      ...u,
      attempts: u._count.attempts,
      finished: n(s?.finished),
      avgPct: s?.pct == null ? null : Math.round(Number(s.pct) * 100),
    };
  });
}

export async function getAdminStudent(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true, email: true, name: true, phone: true, targetExamSlug: true, classLevel: true, board: true, examYear: true,
      createdAt: true, lastActiveAt: true, currentStreak: true, longestStreak: true,
      enrollments: { select: { exam: { select: { shortName: true } }, chaptersDone: true, totalChapters: true, lastActiveAt: true } },
      _count: { select: { bookmarks: true, explainerProgress: true, chapterProgress: true } },
    },
  });
  if (!user) return null;
  const [attempts, studyDays] = await Promise.all([
    prisma.attempt.findMany({ where: { userId: id }, orderBy: { startedAt: "desc" }, take: 100, select: attemptSelect }),
    prisma.studyDay.findMany({ where: { userId: id, day: { gte: since(30) } }, orderBy: { day: "asc" } }),
  ]);
  return { user, attempts, studyDays };
}

// A guest is identified only by the anonymous id cookie set on first test.
export async function getAdminGuest(anonId: string) {
  return prisma.attempt.findMany({ where: { anonId, userId: null }, orderBy: { startedAt: "desc" }, take: 100, select: attemptSelect });
}
