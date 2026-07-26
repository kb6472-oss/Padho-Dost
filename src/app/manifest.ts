import type { MetadataRoute } from "next";

// PWA manifest — lets students "Add to Home Screen" and use PadhoDost like an app.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PadhoDost — Free Mock Tests & Learning",
    short_name: "PadhoDost",
    description:
      "Free mock tests and visual explainers for SSC, Banking, Boards, JEE, NEET & UPSC. Padho, Dost!",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#4f46e5",
    lang: "en-IN",
    categories: ["education"],
    icons: [
      { src: "/app-icon/192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/app-icon/512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/app-icon/512", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/logo.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
