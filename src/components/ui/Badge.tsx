import type { ReactNode } from "react";

/**
 * Small status/metadata pill. Tone carries meaning — don't pick by colour:
 *   neutral  — factual metadata (question count, duration)
 *   brand    — marks, scoring, anything about the exam itself
 *   positive — free, live, answered, correct
 *   warning  — negative marking, marked-for-review, at-risk
 *   danger   — wrong, locked, expired
 */
type Tone = "neutral" | "brand" | "positive" | "warning" | "danger";

const TONE: Record<Tone, string> = {
  neutral: "bg-surface text-muted",
  brand: "bg-brand-50 text-brand-700",
  positive: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  danger: "bg-rose-50 text-rose-700",
};

export default function Badge({
  tone = "neutral",
  className = "",
  children,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-caption font-semibold ${TONE[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
