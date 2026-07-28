// Compact 🔥 streak indicator for the navbar. Pure presentational — rendered inside
// the client Navbar from the streak the server action returns. Amber when the streak
// is alive but today's activity isn't done yet (nudges the student back in).
export default function StreakPill({ streak, atRisk }: { streak: number; atRisk: boolean }) {
  if (streak <= 0) return null;
  return (
    <span
      title={atRisk ? "Study today to keep your streak alive!" : `${streak}-day study streak`}
      aria-label={`${streak}-day streak${atRisk ? ", study today to keep it" : ""}`}
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
        atRisk ? "bg-amber-50 text-amber-700 ring-1 ring-amber-300" : "bg-rose-50 text-rose-600"
      }`}
    >
      🔥 {streak}
    </span>
  );
}
