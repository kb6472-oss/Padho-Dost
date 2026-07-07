"use server";

import { createClient } from "@/lib/supabase/server";
import { syncUser } from "@/lib/auth";
import { bumpStudyStreak } from "@/lib/progress";

// Logging-in students who answer the Daily Challenge keep/extend their streak.
export async function recordDailyDone(): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;
  await syncUser(user);
  await bumpStudyStreak(user.id, 1);
}
