"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const [showPw, setShowPw] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("error")) {
      setStatus("error");
      setMessage("That sign-in link didn't work. Please try again.");
    }
  }, []);

  function nextUrl() {
    return new URLSearchParams(window.location.search).get("next") || "/dashboard";
  }
  function redirectTo() {
    return `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextUrl())}`;
  }

  async function sendMagicLink() {
    if (!email) return;
    setStatus("sending");
    setMessage("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo() } });
    if (error) {
      setStatus("error");
      setMessage(error.message);
    } else {
      setStatus("sent");
    }
  }

  async function signInPassword(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) return;
    setStatus("sending");
    setMessage("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setStatus("error");
      setMessage(error.message);
    } else {
      window.location.replace(nextUrl());
    }
  }

  async function signInWithGoogle() {
    setMessage("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: redirectTo() } });
    if (error) {
      setStatus("error");
      setMessage(error.message);
    }
  }

  async function sendReset() {
    if (!email) {
      setStatus("error");
      setMessage("Enter your email above first, then tap “Forgot password?”.");
      return;
    }
    setStatus("sending");
    setMessage("");
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: redirectTo() });
    if (error) {
      setStatus("error");
      setMessage(error.message);
    } else {
      setStatus("sent");
    }
  }

  return (
    <div className="mx-auto flex max-w-sm flex-col px-4 py-16 sm:px-6">
      <div className="flex flex-col items-center text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="" className="h-12 w-12" width={48} height={48} />
        <h1 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-foreground">
          Log in to PadhoDost
        </h1>
        <p className="mt-1 text-sm text-muted">Save your scores, track progress, resume anytime.</p>
      </div>

      {status === "sent" ? (
        <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
          <div className="text-3xl">📧</div>
          <p className="mt-2 text-sm font-semibold text-emerald-900">Check your email</p>
          <p className="mt-1 text-sm text-emerald-700">
            We sent a secure sign-in link to <strong>{email}</strong>. Tap it to log in.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          <button
            type="button"
            onClick={signInWithGoogle}
            className="flex w-full items-center justify-center gap-3 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="w-full rounded-full border border-border bg-background px-5 py-3 text-sm outline-none focus:border-brand-500"
          />

          {/* Magic link — primary, passwordless (works for new & returning users). */}
          <button
            type="button"
            onClick={sendMagicLink}
            disabled={status === "sending" || !email}
            className="w-full rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Email me a login link"}
          </button>
          <p className="text-center text-xs text-muted">
            No password needed — we&apos;ll email you a secure link.
          </p>

          {/* Password login — secondary, revealed on demand. */}
          {!showPw ? (
            <button
              type="button"
              onClick={() => setShowPw(true)}
              className="w-full text-center text-xs font-medium text-muted transition-colors hover:text-brand-600"
            >
              Sign in with a password instead
            </button>
          ) : (
            <form onSubmit={signInPassword} className="space-y-3 rounded-2xl border border-border p-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full rounded-full border border-border bg-background px-5 py-3 text-sm outline-none focus:border-brand-500"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-full border border-brand-300 bg-background px-5 py-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50 disabled:opacity-60"
              >
                {status === "sending" ? "Logging in…" : "Log in with password"}
              </button>
              <button
                type="button"
                onClick={sendReset}
                className="w-full text-center text-xs font-medium text-muted transition-colors hover:text-brand-600"
              >
                Forgot password?
              </button>
            </form>
          )}

          {status === "error" && <p className="text-center text-xs text-rose-600">{message}</p>}
        </div>
      )}

      <p className="mt-6 text-center text-xs text-muted">No spam, no calls — ever.</p>
      <Link href="/" className="mt-4 text-center text-xs font-medium text-muted hover:text-brand-600">
        ← Back to home
      </Link>
    </div>
  );
}
