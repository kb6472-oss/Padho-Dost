import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Private / non-content routes crawlers should skip.
      disallow: ["/test/", "/dashboard", "/auth/", "/practice/", "/login", "/api/", "/admin"],
    },
    sitemap: "https://padhodost.com/sitemap.xml",
    host: "https://padhodost.com",
  };
}
