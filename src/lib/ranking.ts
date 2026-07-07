import { prisma } from "@/lib/prisma";

// All-India Rank + percentile for a score within a test's submitted-attempt cohort.
export async function getTestRanking(
  mockTestId: string,
  myScore: number,
): Promise<{ rank: number; total: number; percentile: number | null }> {
  const cohort = await prisma.attempt.findMany({
    where: { mockTestId, status: "SUBMITTED" },
    select: { score: true },
  });

  const scores = cohort.map((a) => a.score ?? 0);
  const total = scores.length;
  const better = scores.filter((s) => s > myScore).length;
  const worse = scores.filter((s) => s < myScore).length;

  const rank = better + 1; // competition ranking (ties share the higher rank)
  const others = total - 1;
  const percentile = others > 0 ? Math.round((worse / others) * 100) : null;

  return { rank, total, percentile };
}
