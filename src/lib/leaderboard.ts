import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export type LeaderboardOpts = { limit?: number; period?: "all" | "week"; examSlug?: string };

// Shorten a name for a PUBLIC board: "Aarav Sharma" → "Aarav S." (protects minors).
function displayName(name: string | null, email: string | null): string {
  const base = (name?.trim() || email?.split("@")[0] || "Student").trim();
  const parts = base.split(/\s+/).filter(Boolean);
  if (parts.length > 1) {
    const last = parts[parts.length - 1];
    return `${parts[0]} ${last.charAt(0).toUpperCase()}.`;
  }
  return parts[0] || "Student";
}

// Shared attempt filter for every leaderboard query, so the top-N list, the self-row
// and its rank all count exactly the same attempts. Returns null when an examSlug is
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

export type LeaderboardRow = {
  userId: string;
  name: string;
  image: string | null;
  tests: number;
  correct: number;
  accuracy: number;
};

// Top students by total correct answers — aggregated in the DB, not in JS. Ordering
// is tie-broken by userId so a separately-computed self-rank matches this list.
export async function getLeaderboard(opts: LeaderboardOpts = {}): Promise<LeaderboardRow[]> {
  const where = await attemptFilter(opts);
  if (!where) return [];

  const grouped = await prisma.attempt.groupBy({
    by: ["userId"],
    where,
    _sum: { correctCount: true, wrongCount: true },
    _count: { _all: true },
    orderBy: [{ _sum: { correctCount: "desc" } }, { userId: "asc" }],
    take: opts.limit ?? 25,
  });

  const ids = grouped.map((g) => g.userId).filter((x): x is string => !!x);
  const users = await prisma.user.findMany({
    where: { id: { in: ids } },
    select: { id: true, name: true, email: true, image: true },
  });
  const byId = new Map(users.map((u) => [u.id, u]));

  return grouped
    .filter((g) => g.userId && (g._sum.correctCount ?? 0) > 0)
    .map((g) => {
      const u = byId.get(g.userId as string);
      const correct = g._sum.correctCount ?? 0;
      const answered = correct + (g._sum.wrongCount ?? 0);
      return {
        userId: g.userId as string,
        name: displayName(u?.name ?? null, u?.email ?? null),
        image: u?.image ?? null,
        tests: g._count._all,
        correct,
        accuracy: answered > 0 ? Math.round((correct / answered) * 100) : 0,
      };
    });
}

export type MyLeaderboardRow = { rank: number; correct: number; tests: number; accuracy: number };

// The signed-in user's own rank in the same cohort — for a pinned "You — #147" row
// when they're outside the visible top-N. Rank mirrors getLeaderboard's ordering
// exactly (more-correct first, then userId asc for ties). Note: this aggregates the
// whole cohort; denormalising examId onto Attempt would let this become a raw count.
export async function getMyLeaderboardRow(userId: string, opts: LeaderboardOpts = {}): Promise<MyLeaderboardRow | null> {
  const where = await attemptFilter(opts);
  if (!where) return null;

  const grouped = await prisma.attempt.groupBy({
    by: ["userId"],
    where,
    _sum: { correctCount: true, wrongCount: true },
    _count: { _all: true },
  });

  const mine = grouped.find((g) => g.userId === userId);
  const myCorrect = mine?._sum.correctCount ?? 0;
  if (!mine || myCorrect <= 0) return null;

  let rank = 1;
  for (const g of grouped) {
    if (!g.userId || g.userId === userId) continue;
    const c = g._sum.correctCount ?? 0;
    if (c > myCorrect || (c === myCorrect && g.userId < userId)) rank++;
  }

  const answered = myCorrect + (mine._sum.wrongCount ?? 0);
  return {
    rank,
    correct: myCorrect,
    tests: mine._count._all,
    accuracy: answered > 0 ? Math.round((myCorrect / answered) * 100) : 0,
  };
}
