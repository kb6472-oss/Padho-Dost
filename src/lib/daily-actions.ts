"use server";

import { createClient } from "@/lib/supabase/server";
import { syncUser } from "@/lib/auth";
import { bumpStudyStreak } from "@/lib/progress";
import { getDailyQuestion } from "@/lib/daily";

// Grade the Daily Challenge SERVER-SIDE (the correct answer is never sent to the client
// before the student picks) and keep the streak alive for logged-in students.
export async function submitDaily(
  date: string,
  selectedOptionId: string,
): Promise<{ correctOptionId: string | null; isCorrect: boolean; explanation: string | null }> {
  const q = await getDailyQuestion(date);
  if (!q) return { correctOptionId: null, isCorrect: false, explanation: null };

  const correct = q.options.find((o) => o.isCorrect) ?? null;
  const isCorrect = !!correct && correct.id === selectedOptionId;

  // Showing up daily keeps the streak (any attempt counts), for logged-in students.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    await syncUser(user);
    await bumpStudyStreak(user.id, 1);
  }

  return { correctOptionId: correct?.id ?? null, isCorrect, explanation: q.explanation };
}
