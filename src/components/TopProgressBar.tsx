"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * A thin top-of-screen progress bar shown during client-side navigations.
 *
 * The audit found that tapping an exam/hub link gave no feedback for >1s (those
 * pages are server-rendered on demand), so students re-tapped, thinking nothing
 * had happened. Route-level `loading.tsx` is broken in this project (see
 * docs/REDESIGN-PLAN.md), so instead of a per-route Suspense fallback we drive a
 * single global indicator: START on an internal link click, FINISH when
 * usePathname() reports the new route has rendered.
 *
 * Uses usePathname (not useSearchParams) so it needs no Suspense boundary and
 * doesn't force pages into dynamic rendering.
 */
export default function TopProgressBar() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [width, setWidth] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const firstRender = useRef(true);

  const clearTimers = () => {
    for (const t of timers.current) clearTimeout(t);
    timers.current = [];
  };
  const finish = () => {
    clearTimers();
    setWidth(100);
    timers.current.push(setTimeout(() => setActive(false), 220));
    timers.current.push(setTimeout(() => setWidth(0), 420));
  };
  const start = () => {
    clearTimers();
    setActive(true);
    setWidth(8);
    // Trickle upward so the bar keeps moving while the server responds.
    timers.current.push(setTimeout(() => setWidth(38), 120));
    timers.current.push(setTimeout(() => setWidth(65), 450));
    timers.current.push(setTimeout(() => setWidth(82), 1400));
    // Safety: never leave the bar stuck if a navigation never resolves.
    timers.current.push(setTimeout(finish, 12000));
  };

  // Finish when the destination route has rendered (pathname changed).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Start on internal link clicks and browser back/forward.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as Element | null)?.closest?.("a");
      if (!anchor) return;
      const targetAttr = anchor.getAttribute("target");
      if (targetAttr && targetAttr !== "_self") return;
      if (anchor.hasAttribute("download")) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      let url: URL;
      try {
        url = new URL((anchor as HTMLAnchorElement).href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      // Same page (or search/hash-only change) — no full navigation, don't start
      // (finish() only fires on pathname change, so this avoids a stuck bar).
      if (url.pathname === window.location.pathname) return;
      start();
    };
    const onPop = () => start();

    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPop);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPop);
      clearTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!active) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-0.5"
    >
      <div
        className="h-full rounded-r-full bg-brand-600 shadow-[0_0_10px_rgba(79,70,229,0.7)] transition-[width] duration-300 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
