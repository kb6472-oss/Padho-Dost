import { prisma } from "@/lib/prisma";

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

// Top students ranked by total correct answers — aggregated in the DB, not in JS.
export async function getLeaderboard(limit = 25) {
  // Exclude launch demo accounts.
  const demo = await prisma.user.findMany({
    where: { email: { endsWith: "@padhodost.seed" } },
    select: { id: true },
  });
  const demoIds = demo.map((d) => d.id);

  const grouped = await prisma.attempt.groupBy({
    by: ["userId"],
    where: {
      status: "SUBMITTED",
      AND: [{ userId: { not: null } }, ...(demoIds.length ? [{ userId: { notIn: demoIds } }] : [])],
    },
    _sum: { correctCount: true, wrongCount: true },
    _count: { _all: true },
    orderBy: { _sum: { correctCount: "desc" } },
    take: limit,
  });

  const ids = grouped.map((g) => g.userId).filter((x): x is string => !!x);
  const users = await prisma.user.findMany({
    where: { id: { in: ids } },
    select: { id: true, name: true, email: true, image: true },
  });
  const byId = new Map(users.map((u) => [u.id, u]));

  return grouped
    .map((g) => {
      const u = g.userId ? byId.get(g.userId) : null;
      const correct = g._sum.correctCount ?? 0;
      const wrong = g._sum.wrongCount ?? 0;
      const answered = correct + wrong;
      const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : 0;
      return {
        name: displayName(u?.name ?? null, u?.email ?? null),
        image: u?.image ?? null,
        tests: g._count._all,
        correct,
        accuracy,
      };
    })
    .filter((r) => r.correct > 0);
}
