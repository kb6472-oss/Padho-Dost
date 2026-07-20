"use client";

import Link from "next/link";
import { track, type PdEvent } from "@/lib/analytics";

/**
 * A <Link> that fires one analytics event on click.
 *
 * Exists so server components (result page, dashboard, exam pages) can measure
 * a CTA without being converted into client components just to attach a handler.
 */
export default function TrackedLink({
  href,
  event,
  props,
  className,
  children,
}: {
  href: string;
  event: PdEvent;
  props?: Record<string, string | number | boolean | undefined>;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={className} onClick={() => track(event, props)}>
      {children}
    </Link>
  );
}
