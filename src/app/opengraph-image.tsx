import { ImageResponse } from "next/og";

export const alt = "PadhoDost — Free Mock Tests & Visual Learning for Every Indian Student";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 40, fontWeight: 800 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "white",
              color: "#4f46e5",
              fontSize: 44,
            }}
          >
            📚
          </div>
          PadhoDost
        </div>
        <div style={{ marginTop: 40, fontSize: 68, fontWeight: 800, lineHeight: 1.1 }}>
          Free Mock Tests &amp; Visual Learning
        </div>
        <div style={{ marginTop: 24, fontSize: 34, color: "#c7d2fe" }}>
          SSC · Class 10 · JEE · NEET — 100% free, no spam. Padho, Dost!
        </div>
        <div style={{ marginTop: 48, display: "flex", gap: 16, fontSize: 26 }}>
          <span style={{ background: "#f59e0b", color: "#1e1b4b", padding: "10px 22px", borderRadius: 999, fontWeight: 700 }}>
            ₹0 forever
          </span>
          <span style={{ background: "rgba(255,255,255,0.15)", padding: "10px 22px", borderRadius: 999 }}>
            All-India Rank
          </span>
          <span style={{ background: "rgba(255,255,255,0.15)", padding: "10px 22px", borderRadius: 999 }}>
            1,400+ questions
          </span>
        </div>
      </div>
    ),
    size,
  );
}
