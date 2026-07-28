"use server";

import { prisma } from "@/lib/prisma";
import { getSessionUser, syncUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// Toggle a saved-for-revision bookmark on a question. The Bookmark model has no
// @@unique([userId, questionId]), so dedup via findFirst-then-delete/create rather
// than upsert — keeps this migration-free. Guests get a no-op (ok:false → the button
// reverts its optimistic flip).
export async function toggleQuestionBookmark(questionId: string): Promise<{ ok: boolean; bookmarked: boolean }> {
  const su = await getSessionUser();
  if (!su) return { ok: false, bookmarked: false };
  await syncUser(su); // ensure the User row exists for the FK

  const existing = await prisma.bookmark.findFirst({
    where: { userId: su.id, questionId },
    select: { id: true },
  });

  if (existing) {
    await prisma.bookmark.delete({ where: { id: existing.id } });
    revalidatePath("/practice/bookmarks");
    return { ok: true, bookmarked: false };
  }

  await prisma.bookmark.create({ data: { userId: su.id, questionId } });
  revalidatePath("/practice/bookmarks");
  return { ok: true, bookmarked: true };
}
