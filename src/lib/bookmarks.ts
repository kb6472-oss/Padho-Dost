import { prisma } from "@/lib/prisma";

// Which of these question ids the user has bookmarked — one query to seed the
// result-page toggles. Plain server util (NOT a server action), so it can return a
// Set to the server component that calls it.
export async function getBookmarkedQuestionIds(userId: string, questionIds: string[]): Promise<Set<string>> {
  if (questionIds.length === 0) return new Set();
  const rows = await prisma.bookmark.findMany({
    where: { userId, questionId: { in: questionIds } },
    select: { questionId: true },
  });
  return new Set(rows.map((r) => r.questionId).filter((id): id is string => id != null));
}
