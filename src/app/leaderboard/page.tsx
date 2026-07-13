import type { Metadata } from "next";
import { getLeaderboard } from "@/lib/leaderboard";

export const metadata: Metadata = {
  title: "Leaderboard",
  description: "Top PadhoDost students ranked by questions answered correctly. Climb the board — it's free.",
  alternates: { canonical: "/leaderboard" },
};

// Public, non-personalised — cache for 5 minutes instead of recomputing per request.
export const revalidate = 300;

const medal = (i: number) => (i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}`);

export default async function LeaderboardPage() {
  const rows = await getLeaderboard();

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="text-center">
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          🏅 Leaderboard
        </h1>
        <p className="mt-1 text-sm text-muted">Top students by questions answered correctly. Take more tests to climb!</p>
        <p className="mt-1 text-xs text-muted">Names are shortened for privacy · updates every few minutes</p>
      </div>

      {rows.length === 0 ? (
        <p className="mt-8 text-center text-sm text-muted">No scores yet — be the first on the board!</p>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border border-border">
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
              {rows.map((r, i) => (
                <tr key={i} className={`border-t border-border ${i < 3 ? "bg-amber-50/40" : ""}`}>
                  <td className="px-4 py-3 text-base font-bold">{medal(i)}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                        {r.name.charAt(0).toUpperCase()}
                      </span>
                      <span className="font-medium text-foreground">{r.name}</span>
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right text-muted">{r.tests}</td>
                  <td className="px-3 py-3 text-right font-bold text-brand-700">{r.correct}</td>
                  <td className="px-4 py-3 text-right text-muted">{r.accuracy}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
