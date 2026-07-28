"use server";

import { prisma } from "@/lib/prisma";
import { getSessionUser, syncUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// Set a question's saved-for-revision bookmark to an EXPLICIT desired state. Taking
// the target (not blindly flipping server state) means a stale optimistic seed can't
// invert intent. Backed by the @@unique([userId, questionId]): unset is an idempotent
// deleteMany, set is an atomic upsert (no duplicate rows possible). The question is
// validated first so a bad id returns cleanly instead of an unhandled FK 500.
// Guests are a no-op (ok:false → the button reverts its optimistic flip).
export async function setQuestionBookmark(
  questionId: string,
  bookmarked: boolean,
): Promise<{ ok: boolean; bookmarked: boolean }> {
  const su = await getSessionUser();
  if (!su) return { ok: false, bookmarked: false };
  await syncUser(su); // ensure the User row exists for the FK

  if (!bookmarked) {
    await prisma.bookmark.deleteMany({ where: { userId: su.id, questionId } });
    revalidatePath("/practice/bookmarks");
    return { ok: true, bookmarked: false };
  }

  const q = await prisma.question.findUnique({ where: { id: questionId }, select: { id: true } });
  if (!q) return { ok: false, bookmarked: false };
  await prisma.bookmark.upsert({
    where: { userId_questionId: { userId: su.id, questionId } },
    create: { userId: su.id, questionId },
    update: {},
  });
  revalidatePath("/practice/bookmarks");
  return { ok: true, bookmarked: true };
}
