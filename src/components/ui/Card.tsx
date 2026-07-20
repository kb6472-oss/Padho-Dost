import Link from "next/link";
import type { ReactNode } from "react";

/**
 * The product has exactly three surface levels. Pick by ROLE, not by looks:
 *
 *   1 — recessed. Subordinate to the page: stat tiles, palettes, inline notes.
 *   2 — default content card. Test rows, explainer cards, list items.
 *   3 — raised. What the eye should land on first: exam cards, result hero.
 *
 * Before reaching for a custom `border border-border rounded-2xl` — which the
 * old codebase repeated 47 times until every surface weighed the same — use
 * one of these. If none fits, the design is drifting.
 */
export type Level = 1 | 2 | 3;

const LEVEL_CLASS: Record<Level, string> = {
  1: "surface-1",
  2: "surface-2",
  3: "surface-3",
};

type BaseProps = {
  level?: Level;
  className?: string;
  children: ReactNode;
};

export function Card({ level = 2, className = "", children }: BaseProps) {
  return <div className={`${LEVEL_CLASS[level]} ${className}`}>{children}</div>;
}

/** A card that is itself a link. Lifts on hover at level 3. */
export function CardLink({
  href,
  level = 3,
  className = "",
  children,
}: BaseProps & { href: string }) {
  const interactive = level === 3 ? "surface-3-interactive" : "transition-colors hover:border-brand-300";
  return (
    <Link href={href} className={`block ${LEVEL_CLASS[level]} ${interactive} ${className}`}>
      {children}
    </Link>
  );
}
