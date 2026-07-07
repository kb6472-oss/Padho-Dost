import { prisma } from "@/lib/prisma";

// Today's date in IST as "YYYY-MM-DD".
export function istToday(): string {
  return new Date(Date.now() + 5.5 * 3600_000).toISOString().slice(0, 10);
}

function dayNumber(dateStr: string): number {
  return Math.floor(Date.parse(dateStr + "T00:00:00Z") / 86_400_000);
}

// Deterministic Question of the Day — the same question for everyone on a given date.
export async function getDailyQuestion(dateStr: string) {
  const count = await prisma.question.count();
  if (count === 0) return null;
  const idx = (((dayNumber(dateStr) % count) + count) % count);
  const rows = await prisma.question.findMany({
    orderBy: { id: "asc" },
    skip: idx,
    take: 1,
    include: {
      options: { orderBy: { order: "asc" }, select: { id: true, text: true, isCorrect: true } },
      exam: { select: { shortName: true } },
      chapter: { select: { name: true } },
    },
  });
  return rows[0] ?? null;
}
