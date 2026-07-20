"use client";

import Script from "next/script";
import { GA_ID } from "@/lib/analytics";

// Loads GA4 once, site-wide. Renders nothing until NEXT_PUBLIC_GA_ID is set,
// so the site ships zero analytics payload before you create the property.
// `afterInteractive` keeps it off the critical path — important on 4G.
export default function Analytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: true });
        `}
      </Script>
    </>
  );
}
