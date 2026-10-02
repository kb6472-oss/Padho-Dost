import { createClient } from "@/lib/supabase/client";

// Sign out in the BROWSER, where the Supabase session cookies live, then hard-reload.
// The old server-action logout could leave students signed in: supabase-js keeps
// the local session when its sign-out API call errors, and the proxy's session
// refresh could re-set the auth cookie in the same response. A local sign-out
// always clears the cookies; the reload resets every bit of client state.
export async function logoutAndReload() {
  const supabase = createClient();
  try {
    const { error } = await supabase.auth.signOut(); // revokes the refresh token too
    if (error) await supabase.auth.signOut({ scope: "local" });
  } catch {
    await supabase.auth.signOut({ scope: "local" }).catch(() => {});
  }
  window.location.replace("/");
}
