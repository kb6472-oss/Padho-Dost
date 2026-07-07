"use server";

import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

// Save reading progress for a logged-in student (powers "continue reading").
export async function saveReadingProgress(slug: string, scrollPct: number): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return; // only tracked once signed in

  const ex = await prisma.explainer.findUnique({ where: { slug }, select: { id: true } });
  if (!ex) return;

  const existing = await prisma.explainerProgress.findUnique({
    where: { userId_explainerId: { userId: user.id, explainerId: ex.id } },
    select: { scrollPct: true },
  });
  const pct = Math.min(100, Math.max(existing?.scrollPct ?? 0, scrollPct)); // never regress
  const status = pct >= 90 ? "DONE" : "IN_PROGRESS";

  await prisma.explainerProgress.upsert({
    where: { userId_explainerId: { userId: user.id, explainerId: ex.id } },
    update: { scrollPct: pct, status },
    create: { userId: user.id, explainerId: ex.id, scrollPct: pct, status },
  });
}
