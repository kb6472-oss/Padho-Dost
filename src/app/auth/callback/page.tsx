"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { syncCurrentUser } from "@/lib/user-actions";
import { track } from "@/lib/analytics";

// Completes sign-in in the BROWSER, where the PKCE code verifier lives.
// (Works for both email magic links and Google OAuth.)
export default function AuthCallbackPage() {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(window.location.search);
      const next = params.get("next") || "/";
      const code = params.get("code");
      const errorParam = params.get("error_description") || params.get("error");

      if (errorParam || !code) {
        window.location.replace("/login?error=1");
        return;
      }

      const supabase = createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) {
        setFailed(true);
        setTimeout(() => window.location.replace("/login?error=1"), 600);
        return;
      }

      // Create/refresh the Prisma user row now that a session exists.
      try {
        const { isNew } = await syncCurrentUser();
        if (isNew) {
          track("signup_complete", { next });
          // gtag uses sendBeacon, but give it a beat before we navigate away.
          await new Promise((r) => setTimeout(r, 250));
        }
      } catch {
        // non-fatal; navbar will still reflect the session
      }
      window.location.replace(next);
    })();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-28 text-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600" />
      <p className="mt-4 text-sm text-muted">{failed ? "Almost there…" : "Signing you in…"}</p>
    </div>
  );
}
