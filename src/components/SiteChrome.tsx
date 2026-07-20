"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

/**
 * Decides whether a route gets the site chrome (navbar, footer, bottom tabs).
 *
 * A live timed test gets none of it. The navbar (64px) plus the test's own
 * status bar (~85px) were permanently occupying ~150px — over 23% of a 640px
 * low-end Android viewport — while a student is trying to read a question, and
 * the bottom tab bar would have taken another 56px. The runner has its own Exit
 * affordance, so the global chrome is pure tax there.
 *
 * The RESULT page is deliberately excluded from this rule: it is a normal page
 * where navigating onward is the whole point.
 *
 * usePathname resolves during SSR too, so the chrome is correctly absent from
 * the server-rendered HTML rather than flashing in and out on hydration.
 */
function isBareRoute(pathname: string): boolean {
  return pathname.startsWith("/test/") && !pathname.includes("/result/");
}

export function SiteHeader() {
  const pathname = usePathname();
  if (isBareRoute(pathname)) return null;
  return <Navbar />;
}

export function SiteFooter() {
  const pathname = usePathname();
  if (isBareRoute(pathname)) return null;
  return (
    <>
      <Footer />
      <BottomNav />
      {/* Reserves the fixed tab bar's height so it never covers page content
          or a sticky CTA. BottomNav is h-14 (56px) PLUS a 1px top border, so
          the +1px matters — without it the footer sits a hairline under the bar. */}
      <div
        aria-hidden="true"
        className="md:hidden"
        style={{ height: "calc(3.5rem + 1px + env(safe-area-inset-bottom))" }}
      />
    </>
  );
}
