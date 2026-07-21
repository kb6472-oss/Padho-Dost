import { getSessionUser } from "@/lib/auth";

// Admin access is granted by email via the ADMIN_EMAILS env var (comma-separated),
// so the owner doesn't need a DB migration to become admin — and their address
// lives only in the VPS .env, never in git. The User.role ADMIN enum is honoured
// too, for when a proper admin-management UI exists.
function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export async function isAdmin(): Promise<boolean> {
  const user = await getSessionUser();
  const email = user?.email?.toLowerCase();
  if (!email) return false;
  return adminEmails().includes(email);
}
