import type { Metadata } from "next";
import Link from "next/link";
import { getLeaderboard, getMyLeaderboardRow } from "@/lib/leaderboard";
import { getSessionUser } from "@/lib/auth";
import { liveExams } from "@/lib/exams";

export const metadata: Metadata = {
  title: "Leaderboard",
  description: "Top PadhoDost students ranked by questions answered correctly. Climb the board — it's free.",
  alternates: { canonical: "/leaderboard" },
};

const medal = (rank: number) => (rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : `${rank}`);

function href({ period, exam }: { period?: "week"; exam?: string }) {
  const p = new URLSearchParams();
  if (period === "week") p.set("period", "week");
  if (exam) p.set("exam", exam);
  const q = p.toString();
  return q ? `/leaderboard?${q}` : "/leaderboard";
}

type SP = Record<string, string | string[] | undefined>;

export default async function LeaderboardPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const periodParam = Array.isArray(sp.period) ? sp.period[0] : sp.period;
  const examParam = Array.isArray(sp.exam) ? sp.exam[0] : sp.exam;
  const period: "all" | "week" = periodParam === "week" ? "week" : "all";
  const examSlug = examParam && liveExams.some((e) => e.slug === examParam) ? examParam : undefined;
  const opts = { period, examSlug };
  const weekParam: "week" | undefined = period === "week" ? "week" : undefined;

  const su = await getSessionUser();
  const [rows, myRow] = await Promise.all([
    getLeaderboard(opts),
    su ? getMyLeaderboardRow(su.id, opts) : Promise.resolve(null),
  ]);

  const inTop = su ? rows.some((r) => r.userId === su.id) : false;
  const showSelfRow = !!(su && myRow && !inTop);
  const examName = examSlug ? liveExams.find((e) => e.slug === examSlug)?.name : null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="text-center">
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          🏅 Leaderboard
        </h1>
        <p className="mt-1 text-sm text-muted">
          Top students by questions answered correctly{period === "week" ? " this week" : ""}
          {examName ? ` · ${examName}` : ""}. Take more tests to climb!
        </p>
        <p className="mt-1 text-xs text-muted">Names are shortened for privacy · updates every few minutes</p>
      </div>

      {/* Period toggle */}
      <div className="mt-6 flex justify-center gap-2">
        {([
          ["all", "All-time"] as const,
          ["week", "This week"] as const,
        ]).map(([p, label]) => {
          const active = period === p;
          return (
            <Link
              key={p}
              href={href({ period: p === "week" ? "week" : undefined, exam: examSlug })}
              aria-current={active ? "page" : undefined}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                active ? "bg-brand-600 text-white" : "border border-border text-muted hover:text-foreground"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>

      {/* Exam filter chips */}
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        <Link
          href={href({ period: weekParam })}
          aria-current={!examSlug ? "page" : undefined}
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
            !examSlug ? "bg-brand-50 text-brand-700 ring-1 ring-brand-200" : "border border-border text-muted hover:text-foreground"
          }`}
        >
          All exams
        </Link>
        {liveExams.map((e) => {
          const active = examSlug === e.slug;
          return (
            <Link
              key={e.slug}
              href={href({ period: weekParam, exam: e.slug })}
              aria-current={active ? "page" : undefined}
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                active ? "bg-brand-50 text-brand-700 ring-1 ring-brand-200" : "border border-border text-muted hover:text-foreground"
              }`}
            >
              {e.emoji} {e.name}
            </Link>
          );
        })}
      </div>

      {rows.length === 0 ? (
        <p className="mt-8 text-center text-sm text-muted">
          No scores yet{period === "week" ? " this week" : ""} — be the first on the board!
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-3 text-left font-semibold">#</th>
                <th className="px-4 py-3 text-left font-semibold">Student</th>
                <th className="px-3 py-3 text-right font-semibold">Tests</th>
                <th className="px-3 py-3 text-right font-semibold">Correct</th>
                <th className="px-4 py-3 text-right font-semibold">Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const isMe = su && r.userId === su.id;
                return (
                  <tr
                    key={r.userId}
                    className={`border-t border-border ${isMe ? "bg-brand-50" : i < 3 ? "bg-amber-50/40" : ""}`}
                  >
                    <td className="px-4 py-3 text-base font-bold">{medal(i + 1)}</td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                          {r.name.charAt(0).toUpperCase()}
                        </span>
                        <span className="font-medium text-foreground">{isMe ? "You" : r.name}</span>
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right text-muted">{r.tests}</td>
                    <td className="px-3 py-3 text-right font-bold text-brand-700">{r.correct}</td>
                    <td className="px-4 py-3 text-right text-muted">{r.accuracy}%</td>
                  </tr>
                );
              })}
              {showSelfRow && myRow && (
                <tr className="border-t-2 border-brand-300 bg-brand-50">
                  <td className="px-4 py-3 text-base font-bold text-brand-700">{myRow.rank}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                        Y
                      </span>
                      <span className="font-semibold text-brand-800">You</span>
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right text-muted">{myRow.tests}</td>
                  <td className="px-3 py-3 text-right font-bold text-brand-700">{myRow.correct}</td>
                  <td className="px-4 py-3 text-right text-muted">{myRow.accuracy}%</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showSelfRow && myRow && (
        <p className="mt-3 text-center text-xs text-muted">
          You&apos;re #{myRow.rank} with {myRow.correct} correct — keep going to break into the top 25!
        </p>
      )}
    </div>
  );
}
