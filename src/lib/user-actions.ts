"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { syncUser } from "@/lib/auth";

// Ensure a Prisma User row exists for the currently signed-in Supabase user.
export async function syncCurrentUser(): Promise<{ ok: boolean }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false };
  await syncUser(user);
  return { ok: true };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

// Merge a guest's anonymous attempts into the now-logged-in account.
export async function claimAnonData(anonId: string): Promise<{ ok: boolean; claimed: number }> {
  if (!anonId) return { ok: false, claimed: 0 };
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, claimed: 0 };

  // Make sure the Prisma User row exists before re-pointing attempts to it.
  await syncUser(user);

  const res = await prisma.attempt.updateMany({
    where: { anonId, userId: null },
    data: { userId: user.id, anonId: null },
  });
  if (res.count > 0) revalidatePath("/", "layout");
  return { ok: true, claimed: res.count };
}
