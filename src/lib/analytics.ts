"use client";

// ────────────────────────────────────────────────────────────
// Lightweight, provider-agnostic event tracking.
//
// No-ops completely when no measurement id is configured, so local dev and
// pre-launch production stay clean and ship zero extra bytes.
//
// GA4 covers all five metrics W0 exists to establish a baseline for:
// start rate, completion rate, guest signup rate, pages/session, D1/D7 return.
// `track()` also calls window.posthog if it is ever present, so adding PostHog
// later is a script tag and nothing else — no call sites change.
// ────────────────────────────────────────────────────────────

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * The six funnel events. Keep this union CLOSED — if an event is not one of
 * these it is not answering a question we are currently asking, and untyped
 * event soup is how analytics becomes unreadable within a month.
 */
export type PdEvent =
  | "test_start"
  | "test_abandon"
  | "test_submit"
  | "signup_prompt_click"
  | "signup_complete"
  | "share_click";

type Props = Record<string, string | number | boolean | undefined>;

type AnalyticsWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  posthog?: { capture: (event: string, props?: Props) => void };
};

export function track(event: PdEvent, props: Props = {}) {
  if (typeof window === "undefined") return;

  // Drop undefined values — GA4 renders them as the literal string "undefined".
  const clean: Props = {};
  for (const [k, v] of Object.entries(props)) {
    if (v !== undefined) clean[k] = v;
  }

  const w = window as AnalyticsWindow;
  try {
    w.gtag?.("event", event, clean);
  } catch {
    /* never let analytics break the page */
  }
  try {
    w.posthog?.capture(event, clean);
  } catch {
    /* ditto */
  }

  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event, clean);
  }
}
