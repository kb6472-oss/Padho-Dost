/**
 * Loading placeholders. Every route on the conversion path gets a loading.tsx
 * built from these — a blank screen on a 4G connection reads as "broken", and
 * a student who thinks the site is broken doesn't come back.
 *
 * `aria-hidden` because a screen reader should hear the loading announcement
 * once from the region, not a stream of empty boxes.
 */
export function Skeleton({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`pd-skeleton ${className}`} />;
}

/** Placeholder for a list of content cards (tests, explainers, exams). */
export function SkeletonCards({ count = 6, className = "" }: { count?: number; className?: string }) {
  return (
    <div role="status" aria-label="Loading" className={`space-y-3 ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="surface-2 p-5">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="mt-3 h-3 w-full" />
          <div className="mt-4 flex gap-2">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </div>
      ))}
      <span className="sr-only">Loading…</span>
    </div>
  );
}

/** Placeholder for a page header (kicker + title + subtitle). */
export function SkeletonHeader({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <Skeleton className="h-3 w-28" />
      <Skeleton className="mt-3 h-8 w-3/5" />
      <Skeleton className="mt-3 h-4 w-4/5" />
    </div>
  );
}
