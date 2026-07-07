"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { signOut } from "@/lib/user-actions";
import ClaimAnon from "@/components/ClaimAnon";

const navLinks = [
  { href: "/exams", label: "Exams" },
  { href: "/study", label: "Study" },
  { href: "/daily", label: "Daily" },
  { href: "/#how", label: "How it works" },
];

type NavUser = { name: string | null; email: string | null; image: string | null };

function toNavUser(su: { email?: string | null; user_metadata?: Record<string, unknown> } | null): NavUser | null {
  if (!su) return null;
  const meta = su.user_metadata ?? {};
  return {
    email: su.email ?? null,
    name: (meta.full_name as string) || (meta.name as string) || null,
    image: (meta.avatar_url as string) || (meta.picture as string) || null,
  };
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<NavUser | null>(null);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return;
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(toNavUser(data.user)));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(toNavUser(session?.user ?? null));
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const initial = (user?.name || user?.email || "?").charAt(0).toUpperCase();

  const Avatar = () =>
    user?.image ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={user.image} alt="" className="h-8 w-8 rounded-full" width={32} height={32} />
    ) : (
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
        {initial}
      </span>
    );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      {user && <ClaimAnon />}
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="" className="h-8 w-8" width={32} height={32} />
          <span className="font-display text-lg font-extrabold tracking-tight text-foreground">
            Padho<span className="text-brand-600">Dost</span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-muted transition-colors hover:text-foreground">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link href="/dashboard" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                <Avatar />
                <span className="max-w-[120px] truncate text-sm font-medium text-foreground">
                  {user.name || user.email}
                </span>
              </Link>
              <form action={signOut}>
                <button type="submit" className="text-sm font-semibold text-muted transition-colors hover:text-rose-600">
                  Log out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-semibold text-foreground transition-colors hover:text-brand-600">
                Log in
              </Link>
              <Link href="/exams" className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700">
                Start free
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground md:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-surface">
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-surface"
                  >
                    <Avatar />
                    <span className="truncate text-sm font-medium text-foreground">{user.name || user.email}</span>
                  </Link>
                  <form action={signOut}>
                    <button type="submit" className="w-full rounded-full border border-border px-4 py-2.5 text-center text-sm font-semibold text-foreground">
                      Log out
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setOpen(false)} className="rounded-full border border-border px-4 py-2.5 text-center text-sm font-semibold text-foreground">
                    Log in
                  </Link>
                  <Link href="/exams" onClick={() => setOpen(false)} className="rounded-full bg-brand-600 px-4 py-2.5 text-center text-sm font-semibold text-white">
                    Start free
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
