import Link from "next/link";
import type { getRecentAttempts } from "@/lib/admin-stats";

// Shared building blocks for the /admin pages (server components, no client JS).

export function AdminNav({ active }: { active: "overview" | "students" | "messages" }) {
  const tabs = [
    { key: "overview", href: "/admin", label: "Overview" },
    { key: "students", href: "/admin/students", label: "Students" },
    { key: "messages", href: "/admin/messages", label: "Messages" },
  ] as const;
  return (
    <nav className="flex flex-wrap items-center gap-2 border-b border-border pb-3 text-body">
      {tabs.map((t) => (
        <Link
          key={t.key}
          href={t.href}
          className={`rounded-full px-3.5 py-1.5 font-semibold transition-colors ${
            active === t.key ? "bg-brand-600 text-white" : "text-muted hover:bg-surface hover:text-foreground"
          }`}
        >
          {t.label}
        </Link>
      ))}
      <a
        href="https://analytics.google.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="ml-auto text-caption font-semibold text-brand-600 hover:text-brand-700"
      >
        Traffic in Google Analytics ↗
      </a>
    </nav>
  );
}

export function Stat({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="surface-1 p-4">
      <div className="text-caption font-medium text-muted">{label}</div>
      <div className="mt-1 font-display text-h3 font-bold text-foreground">{value}</div>
      {sub && <div className="mt-0.5 text-caption text-muted">{sub}</div>}
    </div>
  );
}

const IST: Intl.DateTimeFormatOptions = { timeZone: "Asia/Kolkata", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" };
export const istDateTime = (d: Date | null | undefined) => (d ? d.toLocaleString("en-IN", IST) : "—");
export const istDate = (d: Date | null | undefined) =>
  d ? d.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric" }) : "—";

export function timeAgo(d: Date | null | undefined): string {
  if (!d) return "never";
  const s = Math.max(0, (Date.now() - d.getTime()) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)} min ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} h ago`;
  if (s < 86400 * 30) return `${Math.floor(s / 86400)} d ago`;
  return istDate(d);
}

export const duration = (sec: number | null | undefined) =>
  sec == null ? "—" : sec < 60 ? `${sec}s` : `${Math.floor(sec / 60)}m ${String(sec % 60).padStart(2, "0")}s`;

export const guestLabel = (anonId: string | null) => `Guest ${anonId ? anonId.slice(0, 6) : "?"}`;

type Attempt = Awaited<ReturnType<typeof getRecentAttempts>>[number];

// An unsubmitted attempt untouched for a day was abandoned, not "in progress".
function attemptState(a: Attempt): { label: string; cls: string } {
  if (a.status === "SUBMITTED") return { label: "Finished", cls: "bg-emerald-50 text-emerald-700" };
  if (Date.now() - a.startedAt.getTime() > 86_400_000) return { label: "Abandoned", cls: "bg-rose-50 text-rose-700" };
  return { label: "In progress", cls: "bg-amber-50 text-amber-700" };
}

export function AttemptList({ attempts, showWho = true }: { attempts: Attempt[]; showWho?: boolean }) {
  if (attempts.length === 0) return <div className="surface-1 p-6 text-center text-body text-muted">No test attempts yet.</div>;
  return (
    <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border">
      {attempts.map((a) => {
        const st = attemptState(a);
        const pct = a.status === "SUBMITTED" && a.score != null && a.totalMarks > 0 ? Math.round((a.score / a.totalMarks) * 100) : null;
        return (
          <li key={a.id} className="flex flex-wrap items-center gap-x-4 gap-y-1 bg-background px-4 py-3 text-body">
            {showWho && (
              <span className="w-full font-semibold sm:w-48 sm:truncate">
                {a.user ? (
                  <Link href={`/admin/students/${a.user.id}`} className="text-brand-700 hover:underline">
                    {a.user.name || a.user.email}
                  </Link>
                ) : (
                  <Link href={`/admin/guests/${a.anonId ?? ""}`} className="text-muted hover:underline">
                    {guestLabel(a.anonId)}
                  </Link>
                )}
              </span>
            )}
            <span className="min-w-0 flex-1">
              <span className="text-foreground">{a.mockTest.title}</span>
              <span className="ml-2 text-caption text-muted">{a.mockTest.exam.shortName}</span>
            </span>
            <span className={`rounded-full px-2 py-0.5 text-caption font-semibold ${st.cls}`}>{st.label}</span>
            <span className="w-24 text-right text-caption text-muted">
              {pct != null ? (
                <>
                  <span className="font-semibold text-foreground">{pct}%</span> · {a.correctCount}✓ {a.wrongCount}✗
                </>
              ) : (
                "—"
              )}
            </span>
            <span className="w-16 text-right text-caption text-muted">{duration(a.timeTakenSec)}</span>
            <span className="w-24 text-right text-caption text-muted" title={istDateTime(a.startedAt)}>
              {timeAgo(a.startedAt)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
