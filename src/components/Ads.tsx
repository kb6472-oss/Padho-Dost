"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

// Your AdSense publisher id, e.g. "ca-pub-1234567890123456". Set in .env once approved.
const CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

// Routes where ads are suppressed entirely. A live timed test is the one place
// a student cannot afford the data cost or the distraction — and /test is
// noindex anyway, so there is no revenue being given up here.
function adsSuppressed(pathname: string | null): boolean {
  if (!pathname) return false;
  return pathname.startsWith("/test/") && !pathname.includes("/result/");
}

// Loads the AdSense library once, site-wide. Renders nothing until CLIENT is set,
// so the site runs ad-free (and error-free) before/while AdSense approval is pending.
export function AdScript() {
  const pathname = usePathname();
  if (!CLIENT || adsSuppressed(pathname)) return null;
  return (
    <Script
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CLIENT}`}
    />
  );
}

/**
 * A single responsive ad unit. Pass the ad-unit slot id from your AdSense dashboard.
 *
 * `minHeight` reserves vertical space so the unit filling in later does not shove
 * content down and tank CLS — the layout cost is paid up front either way.
 */
export function AdSlot({
  slot,
  className,
  minHeight = 280,
}: {
  slot: string;
  className?: string;
  minHeight?: number;
}) {
  const pathname = usePathname();
  const suppressed = adsSuppressed(pathname);

  useEffect(() => {
    if (!CLIENT || suppressed) return;
    try {
      // @ts-expect-error adsbygoogle is injected by the AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* ignore — script not ready yet */
    }
  }, [slot, suppressed]);

  if (!CLIENT || suppressed) return null;
  return (
    <div className={className} style={{ minHeight }}>
      <div className="mb-1 text-center text-[10px] uppercase tracking-wide text-muted">
        Advertisement
      </div>
      <ins
        className="adsbygoogle block"
        style={{ display: "block", minHeight }}
        data-ad-client={CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
