import { prisma } from "@/lib/prisma";

// A full-length "grand" mock is identified by its slug convention (…-full-mock…).
// It mixes questions from every subject into one exam-pattern paper.
export function isGrandMock(slug: string): boolean {
  return slug.includes("-full-mock");
}

// Per-subject "Full Section Test" tests use the `…-section` slug convention.
export function isSectionTest(slug: string): boolean {
  return slug.endsWith("-section");
}

// How many chapters a student must clear (via chapter practice) before the
// exam's full-length mock unlocks. Kept modest so it motivates without grinding.
export const FULL_MOCK_MIN_CHAPTERS = 5;

export type UnlockState = {
  unlocked: boolean;
  done: number; // chapters cleared so far
  needed: number; // chapters required to unlock
  remaining: number; // needed - done (never below 0)
};

// Decide whether this user has unlocked the full-length mock for an exam.
// Guests (userId null) are always locked — a nudge to sign in and practise.
export async function getFullMockUnlock(
  userId: string | null,
  examId: string
): Promise<UnlockState> {
  const totalChapters = await prisma.chapter.count({ where: { examId } });
  const needed = Math.min(FULL_MOCK_MIN_CHAPTERS, totalChapters || FULL_MOCK_MIN_CHAPTERS);

  if (!userId) return { unlocked: false, done: 0, needed, remaining: needed };

  const done = await prisma.chapterProgress.count({
    where: { userId, examId, status: "DONE" },
  });
  const remaining = Math.max(0, needed - done);
  return { unlocked: remaining === 0, done, needed, remaining };
}
