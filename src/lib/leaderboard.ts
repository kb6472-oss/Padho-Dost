import type { Prisma } from "@/generated/prisma/client";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export type LeaderboardOpts = { limit?: number; period?: "all" | "week"; examSlug?: string };

// Shorten a name for a PUBLIC board: "Aarav Sharma" → "Aarav S." (protects minors).
// When only an email is on file we do NOT surface its local-part publicly.
function displayName(name: string | null): string {
  const base = (name ?? "").trim();
  if (!base) return "Student";
  const parts = base.split(/\s+/).filter(Boolean);
  if (parts.length > 1) {
    const last = parts[parts.length - 1];
    return `${parts[0]} ${last.charAt(0).toUpperCase()}.`;
  }
  return parts[0] || "Student";
}

// Shared attempt filter for every leaderboard query. Returns null when an examSlug is
// supplied but doesn't resolve → the caller treats that as an empty board.
async function attemptFilter(opts: LeaderboardOpts): Promise<Prisma.AttemptWhereInput | null> {
  const demo = await prisma.user.findMany({
    where: { email: { endsWith: "@padhodost.seed" } },
    select: { id: true },
  });
  const demoIds = demo.map((d) => d.id);

  const where: Prisma.AttemptWhereInput = {
    status: "SUBMITTED",
    AND: [{ userId: { not: null } }, ...(demoIds.length ? [{ userId: { notIn: demoIds } }] : [])],
  };
  if (opts.period === "week") {
    where.submittedAt = { gte: new Date(Date.now() - 7 * 86_400_000) };
  }
  if (opts.examSlug) {
    const exam = await prisma.exam.findUnique({ where: { slug: opts.examSlug }, select: { id: true } });
    if (!exam) return null;
    // Attempt has no denormalised examId, so filter through the MockTest relation.
    where.mockTest = { examId: exam.id };
  }
  return where;
}

type CohortRow = { userId: string; correct: number; wrong: number; tests: number };

// The whole ranked cohort for a (period, exam) — userId + aggregates only, so it is
// user-INDEPENDENT and cacheable. ONE groupBy backs both the top-N list and any user's
// self-rank (rank = index+1, since it's pre-sorted), replacing what used to be two full
// aggregations + two demo-user scans per page load. Cached 5 min per filter combo.
function rankedCohort(opts: LeaderboardOpts): Promise<CohortRow[]> {
  const cached = unstable_cache(
    async (): Promise<CohortRow[]> => {
      const where = await attemptFilter(opts);
      if (!where) return [];
      const grouped = await prisma.attempt.groupBy({
        by: ["userId"],
        where,
        _sum: { correctCount: true, wrongCount: true },
        _count: { _all: true },
        orderBy: [{ _sum: { correctCount: "desc" } }, { userId: "asc" }],
      });
      return grouped
        .filter((g) => g.userId && (g._sum.correctCount ?? 0) > 0)
        .map((g) => ({
          userId: g.userId as string,
          correct: g._sum.correctCount ?? 0,
          wrong: g._sum.wrongCount ?? 0,
          tests: g._count._all,
        }));
    },
    ["leaderboard-cohort", opts.period ?? "all", opts.examSlug ?? "all"],
    { revalidate: 300 },
  );
  return cached();
}

const accuracy = (correct: number, wrong: number) =>
  correct + wrong > 0 ? Math.round((correct / (correct + wrong)) * 100) : 0;

export type LeaderboardRow = {
  userId: string;
  name: string;
  image: string | null;
  tests: number;
  correct: number;
  accuracy: number;
};

// Top students by total correct answers. Ordering is tie-broken by userId so a
// separately-computed self-rank matches this list exactly.
export async function getLeaderboard(opts: LeaderboardOpts = {}): Promise<LeaderboardRow[]> {
  const cohort = await rankedCohort(opts);
  const top = cohort.slice(0, opts.limit ?? 25);
  if (top.length === 0) return [];

  const users = await prisma.user.findMany({
    where: { id: { in: top.map((r) => r.userId) } },
    select: { id: true, name: true, image: true },
  });
  const byId = new Map(users.map((u) => [u.id, u]));

  return top.map((r) => {
    const u = byId.get(r.userId);
    return {
      userId: r.userId,
      name: displayName(u?.name ?? null),
      image: u?.image ?? null,
      tests: r.tests,
      correct: r.correct,
      accuracy: accuracy(r.correct, r.wrong),
    };
  });
}

export type MyLeaderboardRow = { rank: number; correct: number; tests: number; accuracy: number };

// The signed-in user's own rank in the same cohort — for a pinned "You — #147" row
// when they're outside the visible top-N. Rank is the index in the pre-sorted cohort.
export async function getMyLeaderboardRow(userId: string, opts: LeaderboardOpts = {}): Promise<MyLeaderboardRow | null> {
  const cohort = await rankedCohort(opts);
  const idx = cohort.findIndex((r) => r.userId === userId);
  if (idx < 0) return null;
  const mine = cohort[idx];
  return { rank: idx + 1, correct: mine.correct, tests: mine.tests, accuracy: accuracy(mine.correct, mine.wrong) };
}
