import type { User as SupabaseUser } from "@supabase/supabase-js";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export type DisplayUser = {
  id: string;
  email: string | null;
  name: string | null;
  image: string | null;
};

// The currently signed-in Supabase user (or null). Safe before Supabase is configured.
export async function getSessionUser(): Promise<SupabaseUser | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ?? null;
}

export function toDisplayUser(su: SupabaseUser | null): DisplayUser | null {
  if (!su) return null;
  const meta = su.user_metadata ?? {};
  return {
    id: su.id,
    email: su.email ?? null,
    name: (meta.full_name as string) || (meta.name as string) || null,
    image: (meta.avatar_url as string) || (meta.picture as string) || null,
  };
}

// Ensure a Prisma User row exists for this Supabase user (id = Supabase uid).
export async function syncUser(su: SupabaseUser) {
  const meta = su.user_metadata ?? {};
  const name = (meta.full_name as string) || (meta.name as string) || null;
  const image = (meta.avatar_url as string) || (meta.picture as string) || null;
  const email = su.email ?? `${su.id}@user.padhodost`;

  await prisma.user.upsert({
    where: { id: su.id },
    update: {
      email,
      name: name ?? undefined,
      image: image ?? undefined,
      lastActiveAt: new Date(),
    },
    create: { id: su.id, email, name, image },
  });
}
