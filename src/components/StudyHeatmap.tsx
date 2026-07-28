import type { HeatCell } from "@/lib/progress";

// GitHub-style activity grid. Server component (pure markup) — the whole grid is
// prebuilt in getStudyHeatmap so this just paints it.
const LEVELS = [
  "bg-surface",
  "bg-emerald-200",
  "bg-emerald-300",
  "bg-emerald-500",
  "bg-emerald-700",
] as const;

export default function StudyHeatmap({ grid, activeDays }: { grid: HeatCell[][]; activeDays: number }) {
  return (
    <section className="rounded-2xl border border-border bg-background p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-display text-lg font-bold text-foreground">Your study activity</h2>
        <span className="text-xs text-muted">
          {activeDays} active {activeDays === 1 ? "day" : "days"} · last {grid.length} weeks
        </span>
      </div>

      <div className="mt-3 flex gap-1 overflow-x-auto pb-1">
        {grid.map((week, ci) => (
          <div key={ci} className="flex flex-col gap-1">
            {week.map((cell, ri) => (
              <div
                key={ri}
                title={cell.key ?? undefined}
                className={`h-3 w-3 rounded-[3px] ${cell.key ? LEVELS[cell.level] : "bg-transparent"}`}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-muted">
        <span>Less</span>
        {LEVELS.map((c, i) => (
          <span key={i} className={`h-3 w-3 rounded-[3px] ${c}`} aria-hidden="true" />
        ))}
        <span>More</span>
      </div>
    </section>
  );
}
