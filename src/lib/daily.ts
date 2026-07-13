import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

// Today's date in IST as "YYYY-MM-DD".
export function istToday(): string {
  return new Date(Date.now() + 5.5 * 3600_000).toISOString().slice(0, 10);
}

function dayNumber(dateStr: string): number {
  return Math.floor(Date.parse(dateStr + "T00:00:00Z") / 86_400_000);
}

// Deterministic daily pick from a question pool — same question for everyone on a date.
async function pickDaily(dateStr: string, where: Prisma.QuestionWhereInput = {}) {
  const count = await prisma.question.count({ where });
  if (count === 0) return null;
  const idx = (((dayNumber(dateStr) % count) + count) % count);
  const rows = await prisma.question.findMany({
    where,
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

// Question of the Day — drawn from the whole bank.
export const getDailyQuestion = (dateStr: string) => pickDaily(dateStr);

// Daily GK — drawn only from General Awareness (evergreen static GK).
export const getDailyGk = (dateStr: string) => pickDaily(dateStr, { subject: { slug: "general-awareness" } });
