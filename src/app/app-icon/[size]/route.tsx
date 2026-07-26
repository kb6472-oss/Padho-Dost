import { ImageResponse } from "next/og";

// Maskable PNG app icons for the PWA manifest (Android home screen + install UI).
// The manifest previously shipped only an SVG, which renders inconsistently on
// Android and fails PWA icon checks. This renders a brand-filled, safe-zoned
// mark at 192 or 512 px on demand (cached a week). Awaiting params is safe
// whether it's a promise (Next 16) or a plain object.
export async function GET(_req: Request, ctx: { params: Promise<{ size: string }> }) {
  const { size: raw } = await ctx.params;
  const size = raw === "512" ? 512 : 192;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)",
        }}
      >
        <div style={{ fontSize: Math.round(size * 0.52), lineHeight: 1 }}>📚</div>
      </div>
    ),
    {
      width: size,
      height: size,
      headers: { "Cache-Control": "public, max-age=604800, immutable, no-transform" },
    },
  );
}
