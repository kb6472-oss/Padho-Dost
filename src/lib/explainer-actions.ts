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
    select: { scrollPct: true, status: true },
  });
  const pct = Math.min(100, Math.max(existing?.scrollPct ?? 0, scrollPct)); // never regress
  const status = pct >= 90 ? "DONE" : "IN_PROGRESS";

  await prisma.explainerProgress.upsert({
    where: { userId_explainerId: { userId: user.id, explainerId: ex.id } },
    update: { scrollPct: pct, status },
    create: { userId: user.id, explainerId: ex.id, scrollPct: pct, status },
  });

  // Finishing an explainer is studying too — advance the streak and log the read.
  // Fires once, on the first (none | IN_PROGRESS) -> DONE transition; saveReadingProgress
  // is called repeatedly on scroll, so the status guard prevents double-counting.
  if (status === "DONE" && existing?.status !== "DONE") {
    await bumpStudyStreak(user.id, 0, ex.readingMinutes * 60, 1);
  }
}
