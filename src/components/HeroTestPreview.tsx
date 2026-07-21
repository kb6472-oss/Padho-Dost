import { Clock } from "lucide-react";

/**
 * A phone-framed, non-interactive preview of the real test runner, for the hero.
 *
 * The audit found the product had ZERO imagery — a wall of text a student
 * couldn't picture using. Rather than a fake mockup or a stock illustration,
 * this mirrors the actual TestRunner UI (question card, A/B/C/D options, timer
 * pill, palette) and is fed a REAL question from the bank, so it shows the
 * genuine article rather than a marketing fiction.
 *
 * Server component, pure markup — it must not delay the hero paint.
 */
export default function HeroTestPreview({
  question,
  options,
  selectedIndex,
}: {
  question: string;
  options: string[];
  selectedIndex: number;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[300px]">
      {/* Phone frame */}
      <div className="rounded-[2.25rem] border-[6px] border-slate-800 bg-background shadow-e3">
        <div className="overflow-hidden rounded-[1.75rem]">
          {/* Test top bar */}
          <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-2.5">
            <div>
              <div className="text-[11px] font-semibold text-foreground">SSC CGL — Quant</div>
              <div className="text-[10px] text-muted">Question 3 of 25</div>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-background px-2 py-1 text-[11px] font-bold tabular-nums text-foreground">
              <Clock className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
              18:42
            </span>
          </div>

          {/* Question */}
          <div className="px-4 py-4">
            <p className="text-[13px] font-medium leading-snug text-foreground">{question}</p>
            <div className="mt-3 space-y-1.5">
              {options.map((opt, i) => {
                const active = i === selectedIndex;
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 text-[12px] ${
                      active
                        ? "border-brand-600 bg-brand-50 text-brand-900"
                        : "border-border bg-background text-foreground"
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                        active ? "bg-brand-600 text-white" : "bg-surface text-muted"
                      }`}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="font-medium">{opt}</span>
                    {active && (
                      <span aria-hidden="true" className="ml-auto text-[12px] font-bold text-brand-600">
                        ✓
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mini palette */}
            <div className="mt-4 grid grid-cols-6 gap-1">
              {Array.from({ length: 12 }, (_, i) => {
                const answered = i < 2;
                const current = i === 2;
                return (
                  <span
                    key={i}
                    className={`flex h-6 items-center justify-center rounded text-[10px] font-semibold ${
                      current
                        ? "bg-brand-600 text-white"
                        : answered
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-surface text-muted"
                    }`}
                  >
                    {i + 1}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Floating result chip — the payoff, in one glance */}
      <div className="absolute -bottom-4 -right-3 rotate-3 rounded-2xl border border-border bg-surface-raised px-3.5 py-2 shadow-e2">
        <div className="text-[10px] font-semibold uppercase tracking-wide text-muted">Your rank</div>
        <div className="font-display text-body-lg font-extrabold text-brand-600">All-India</div>
      </div>
    </div>
  );
}
