"use server";

import { prisma } from "@/lib/prisma";
import { getSessionUser, syncUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// Set a question's saved-for-revision bookmark to an EXPLICIT desired state. Taking
// the target (not blindly flipping server state) means a stale optimistic seed can't
// invert intent. The Bookmark model has no @@unique([userId, questionId]) yet, so:
//  - unset uses deleteMany (idempotent; also sweeps up any old duplicate rows),
//  - set validates the question exists (avoids an unhandled FK-violation 500) and
//    only creates when not already present.
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
  const existing = await prisma.bookmark.findFirst({ where: { userId: su.id, questionId }, select: { id: true } });
  if (!existing) await prisma.bookmark.create({ data: { userId: su.id, questionId } });
  revalidatePath("/practice/bookmarks");
  return { ok: true, bookmarked: true };
}
