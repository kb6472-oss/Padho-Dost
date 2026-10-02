import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Private / non-content routes crawlers should skip. "/*_rsc=" = Next.js client-navigation
      // prefetch payloads (not pages) that were eating ~88% of Googlebot's crawl requests.
      disallow: ["/test/", "/dashboard", "/auth/", "/practice/", "/login", "/api/", "/admin", "/*_rsc="],
    },
    sitemap: "https://padhodost.com/sitemap.xml",
    host: "https://padhodost.com",
  };
}
