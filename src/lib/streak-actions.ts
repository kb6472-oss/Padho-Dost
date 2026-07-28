"use server";

import { getSessionUser } from "@/lib/auth";
import { getStreakSummary, type StreakSummary } from "@/lib/progress";

// Called from the client navbar after it resolves the Supabase user. Keeping this a
// server action (rather than reading the streak in the root layout) keeps every route
// statically renderable — the pill loads client-side just like the avatar already does.
export async function fetchStreakSummary(): Promise<StreakSummary | null> {
  const su = await getSessionUser();
  if (!su) return null;
  return getStreakSummary(su.id);
}
