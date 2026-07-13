import { prisma } from "@/lib/prisma";

// All-India Rank + percentile for a score within a test's submitted-attempt cohort.
// Uses index-backed COUNTs (not a full table scan) so it stays fast as attempts grow.
export async function getTestRanking(
  mockTestId: string,
  myScore: number,
): Promise<{ rank: number; total: number; percentile: number | null }> {
  // Exclude launch benchmark rows, but keep real logged-in users (anonId = null).
  const base = {
    mockTestId,
    status: "SUBMITTED" as const,
    OR: [{ anonId: null }, { anonId: { not: "seed-benchmark" } }],
  };

  const [total, better, worse] = await Promise.all([
    prisma.attempt.count({ where: base }),
    prisma.attempt.count({ where: { ...base, score: { gt: myScore } } }),
    prisma.attempt.count({ where: { ...base, score: { lt: myScore } } }),
  ]);

  const rank = better + 1; // competition ranking (ties share the higher rank)
  const others = total - 1;
  const percentile = others > 0 ? Math.round((worse / others) * 100) : null;

  return { rank, total, percentile };
}
