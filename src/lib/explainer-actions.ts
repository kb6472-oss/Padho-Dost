"use server";

import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { bumpStudyStreak } from "@/lib/progress";

// Save reading progress for a logged-in student (powers "continue reading").
export async function saveReadingProgress(slug: string, scrollPct: number): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return; // only tracked once signed in

  const ex = await prisma.explainer.findUnique({ where: { slug }, select: { id: true, readingMinutes: true } });
  if (!ex) return;

  const existing = await prisma.explainerProgress.findUnique({
    where: { userId_explainerId: { userId: user.id, explainerId: ex.id } },
    select: { scrollPct: true },
  });
  const pct = Math.min(100, Math.max(existing?.scrollPct ?? 0, scrollPct)); // never regress

  // Ensure the row exists + advance scroll %, but do NOT mark DONE here — the
  // completion transition is done atomically below so it credits the read exactly once.
  await prisma.explainerProgress.upsert({
    where: { userId_explainerId: { userId: user.id, explainerId: ex.id } },
    update: { scrollPct: pct },
    create: { userId: user.id, explainerId: ex.id, scrollPct: pct, status: "IN_PROGRESS" },
  });

  // Reading to the end (>=90%) counts as studying. Flip IN_PROGRESS->DONE with a guarded
  // updateMany: even under the repeated concurrent saves the scroll handler fires, only
  // ONE writer matches `status != DONE`, so the streak bump can't double-count.
  if (pct >= 90) {
    const flipped = await prisma.explainerProgress.updateMany({
      where: { userId: user.id, explainerId: ex.id, status: { not: "DONE" } },
      data: { status: "DONE" },
    });
    if (flipped.count === 1) {
      await bumpStudyStreak(user.id, 0, ex.readingMinutes * 60, 1);
    }
  }
}
