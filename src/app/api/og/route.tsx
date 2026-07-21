import { ImageResponse } from "next/og";
import { OG_SIZE } from "@/lib/og-meta";

// Titled share-card generator. Query: ?t=<title>&e=<eyebrow>.
// Deliberately DB-free and cacheable so social scrapers and Cloudflare can
// store each card. Inputs are length-capped; the card only ever renders our
// own brand chrome around the passed text.
export function GET(req: Request) {
  const sp = new URL(req.url).searchParams;
  const raw = (sp.get("t") || "Free Mock Tests for Every Indian Student").trim().slice(0, 100);
  const title = raw.length > 95 ? `${raw.slice(0, 92)}…` : raw || "Free Mock Tests";
  const eyebrow = (sp.get("e") || "PadhoDost").trim().slice(0, 60);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 36, fontWeight: 800 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "white",
              color: "#4f46e5",
              fontSize: 38,
            }}
          >
            📚
          </div>
          PadhoDost
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 30, fontWeight: 600, color: "#c7d2fe" }}>{eyebrow}</div>
          <div style={{ marginTop: 16, fontSize: 66, fontWeight: 800, lineHeight: 1.1 }}>{title}</div>
        </div>

        <div style={{ display: "flex", gap: 16, fontSize: 26 }}>
          <span style={{ background: "#f59e0b", color: "#1e1b4b", padding: "10px 22px", borderRadius: 999, fontWeight: 700 }}>
            ₹0 forever
          </span>
          <span style={{ background: "rgba(255,255,255,0.15)", padding: "10px 22px", borderRadius: 999 }}>
            Free mock tests
          </span>
          <span style={{ background: "rgba(255,255,255,0.15)", padding: "10px 22px", borderRadius: 999 }}>
            All-India rank
          </span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      headers: { "Cache-Control": "public, immutable, no-transform, max-age=86400, s-maxage=2592000" },
    },
  );
}
