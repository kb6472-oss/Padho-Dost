"use client";

import { useEffect } from "react";
import Script from "next/script";

// Your AdSense publisher id, e.g. "ca-pub-1234567890123456". Set in .env once approved.
const CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

// Loads the AdSense library once, site-wide. Renders nothing until CLIENT is set,
// so the site runs ad-free (and error-free) before/while AdSense approval is pending.
export function AdScript() {
  if (!CLIENT) return null;
  return (
    <Script
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CLIENT}`}
    />
  );
}

// A single responsive ad unit. Pass the ad-unit slot id from your AdSense dashboard.
export function AdSlot({ slot, className }: { slot: string; className?: string }) {
  useEffect(() => {
    if (!CLIENT) return;
    try {
      // @ts-expect-error adsbygoogle is injected by the AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* ignore — script not ready yet */
    }
  }, [slot]);

  if (!CLIENT) return null;
  return (
    <ins
      className={`adsbygoogle block ${className ?? ""}`}
      style={{ display: "block" }}
      data-ad-client={CLIENT}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
