"use server";

import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { syncUser } from "@/lib/auth";

export type ResumeState = {
  resumed: boolean;
  serverManaged: boolean; // true when a server-side attempt exists (logged-in) → client should autosave
  clientAttemptId: string;
  progressJson: string | null;
  currentQuestionIndex: number;
  remainingSec: number | null;
};

// Called when a test loads. For LOGGED-IN users it creates/looks up a server-side
// IN_PROGRESS attempt so the test can be resumed on another device. Guests fall back
// to localStorage-only resume (unchanged), so this is a cheap no-op for them.
export async function startAttempt(mockTestId: string, clientAttemptId: string): Promise<ResumeState> {
  const idle: ResumeState = {
    resumed: false,
    serverManaged: false,
    clientAttemptId,
    progressJson: null,
    currentQuestionIndex: 0,
    remainingSec: null,
  };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return idle;

  await syncUser(user);

  // Resume an existing unfinished attempt for this user + test, if any.
  const existing = await prisma.attempt.findFirst({
    where: { userId: user.id, mockTestId, status: "IN_PROGRESS" },
    orderBy: { lastSavedAt: "desc" },
    select: { clientAttemptId: true, progressJson: true, currentQuestionIndex: true, remainingSec: true },
  });
  if (existing) {
    return {
      resumed: true,
      serverManaged: true,
      clientAttemptId: existing.clientAttemptId ?? clientAttemptId,
      progressJson: existing.progressJson,
      currentQuestionIndex: existing.currentQuestionIndex,
      remainingSec: existing.remainingSec,
    };
  }

  // Otherwise open a fresh in-progress attempt keyed by this device's clientAttemptId.
  try {
    await prisma.attempt.upsert({
      where: { clientAttemptId },
      update: {},
      create: { mockTestId, userId: user.id, clientAttemptId, status: "IN_PROGRESS" },
    });
  } catch {
    /* best-effort — resume is a convenience, never blocks the test */
  }
  return { ...idle, serverManaged: true };
}

// Throttled autosave of in-progress state. No-ops if the attempt is already submitted.
export async function saveProgress(
  clientAttemptId: string,
  data: { currentQuestionIndex: number; remainingSec: number | null; progressJson: string },
): Promise<void> {
  if (!clientAttemptId) return;
  try {
    await prisma.attempt.updateMany({
      where: { clientAttemptId, status: "IN_PROGRESS" },
      data: {
        currentQuestionIndex: data.currentQuestionIndex,
        remainingSec: data.remainingSec,
        progressJson: data.progressJson.slice(0, 20000), // guard against oversized payloads
      },
    });
  } catch {
    /* best-effort */
  }
}
