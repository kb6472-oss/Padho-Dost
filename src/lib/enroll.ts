import { cookies } from "next/headers";

// Cookie that remembers the student's chosen target exam (works for guests too).
export const TARGET_EXAM_COOKIE = "pd_target_exam";

// The exam slug the student picked as their goal, or null if not chosen yet.
export async function getExamGoal(): Promise<string | null> {
  const jar = await cookies();
  return jar.get(TARGET_EXAM_COOKIE)?.value || null;
}
