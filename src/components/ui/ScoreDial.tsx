/**
 * Circular score dial for the result hero.
 *
 * Pure SVG, no client JS — this is the first thing a student sees after a test
 * and the image they screenshot into a WhatsApp group, so it should not wait on
 * hydration. The ring colour is earned, not decorative: a 30% result should not
 * be dressed in celebratory green.
 */
export default function ScoreDial({
  pct,
  score,
  total,
  size = 168,
}: {
  pct: number;
  score: string;
  total: string;
  size?: number;
}) {
  const clamped = Math.max(0, Math.min(100, pct));
  const stroke = 12;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const dash = (clamped / 100) * circumference;

  const tone =
    clamped >= 70
      ? { ring: "var(--color-brand-600)", text: "text-brand-600" }
      : clamped >= 40
        ? { ring: "#d97706", text: "text-amber-600" }
        : { ring: "#e11d48", text: "text-rose-600" };

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={`Score ${score} out of ${total}, ${clamped} percent`}
        className="-rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--border)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={tone.ring}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference - dash}`}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`font-display text-h1 font-extrabold leading-none ${tone.text}`}>{clamped}%</span>
        <span className="mt-1.5 text-caption font-semibold text-muted">
          {score} / {total}
        </span>
      </div>
    </div>
  );
}
