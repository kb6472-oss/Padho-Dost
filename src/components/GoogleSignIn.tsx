"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";
import { syncCurrentUser } from "@/lib/user-actions";
import { track } from "@/lib/analytics";

// "Sign in with Google" rendered by Google Identity Services ON padhodost.com, then
// handed to Supabase via signInWithIdToken. Because the sign-in never redirects
// through <project>.supabase.co, Google's consent screen names padhodost.com
// (or "PadhoDost" once the brand is verified) instead of the Supabase domain.
// Without NEXT_PUBLIC_GOOGLE_CLIENT_ID set, the redirect-based `fallback` is used.

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

type Gsi = {
  accounts: {
    id: {
      initialize: (o: Record<string, unknown>) => void;
      renderButton: (el: HTMLElement, o: Record<string, unknown>) => void;
    };
  };
};

async function sha256Hex(s: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

export default function GoogleSignIn({
  nextUrl,
  onError,
  fallback,
}: {
  nextUrl: () => string;
  onError: (message: string) => void;
  fallback: ReactNode;
}) {
  const slot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!CLIENT_ID || !slot.current) return;
    let cancelled = false;

    const start = async () => {
      const google = (window as unknown as { google?: Gsi }).google;
      if (cancelled || !google || !slot.current) return;
      // Supabase checks sha256(rawNonce) against the nonce Google signs into the token.
      const rawNonce = crypto.randomUUID();
      const hashedNonce = await sha256Hex(rawNonce);

      google.accounts.id.initialize({
        client_id: CLIENT_ID,
        nonce: hashedNonce,
        ux_mode: "popup",
        use_fedcm_for_prompt: true,
        callback: async ({ credential }: { credential: string }) => {
          const supabase = createClient();
          const { error } = await supabase.auth.signInWithIdToken({ provider: "google", token: credential, nonce: rawNonce });
          if (error) return onError(error.message);
          try {
            const { isNew } = await syncCurrentUser();
            if (isNew) {
              track("signup_complete", { next: nextUrl(), method: "google" });
              await new Promise((r) => setTimeout(r, 250));
            }
          } catch {
            // non-fatal; the session exists and the navbar will reflect it
          }
          window.location.replace(nextUrl());
        },
      });
      google.accounts.id.renderButton(slot.current, {
        theme: "outline",
        size: "large",
        shape: "pill",
        text: "continue_with",
        logo_alignment: "center",
        width: Math.min(400, slot.current.offsetWidth || 400),
      });
    };

    const SRC = "https://accounts.google.com/gsi/client";
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SRC}"]`);
    if ((window as unknown as { google?: Gsi }).google) void start();
    else if (existing) existing.addEventListener("load", () => void start(), { once: true });
    else {
      const s = document.createElement("script");
      s.src = SRC;
      s.async = true;
      s.onload = () => void start();
      s.onerror = () => onError("Couldn't load Google sign-in. Please use email instead.");
      document.head.appendChild(s);
    }
    return () => {
      cancelled = true;
    };
    // Initialise once per mount; the callbacks read the latest props when they fire.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!CLIENT_ID) return <>{fallback}</>;
  return <div ref={slot} className="flex min-h-[44px] w-full justify-center" />;
}
