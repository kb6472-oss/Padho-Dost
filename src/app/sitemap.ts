import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const BASE = "https://padhodost.com";

// YYYY-MM-DD for the IST day `offsetDays` from now (matches /daily/[date]).
function istDateKey(offsetDays = 0): string {
  const ms = Date.now() + 5.5 * 3600_000 + offsetDays * 86_400_000;
  return new Date(ms).toISOString().slice(0, 10);
}

// Regenerate at most once a day so freshly-seeded exams/explainers show up
// without needing a full rebuild.
export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/exams`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/study`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/leaderboard`, lastModified: now, changeFrequency: "daily", priority: 0.6 },
    { url: `${BASE}/predictor`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/exam-calendar`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // Live exams only — "coming soon" exams are thin/empty pages.
  const exams = await prisma.exam.findMany({
    where: { status: "LIVE" },
    select: { slug: true, updatedAt: true },
  });
  const examRoutes: MetadataRoute.Sitemap = exams.map((e) => ({
    url: `${BASE}/exams/${e.slug}`,
    lastModified: e.updatedAt,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Published visual explainers.
  const explainers = await prisma.explainer.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true, updatedAt: true },
  });
  const explainerRoutes: MetadataRoute.Sitemap = explainers.map((e) => ({
    url: `${BASE}/study/${e.slug}`,
    lastModified: e.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // The last 7 days of the (dated, indexable) Daily Challenge + Daily GK.
  const dailyRoutes: MetadataRoute.Sitemap = Array.from({ length: 7 }, (_, i) => ({
    url: `${BASE}/daily/${istDateKey(-i)}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.5,
  }));
  const gkRoutes: MetadataRoute.Sitemap = Array.from({ length: 7 }, (_, i) => ({
    url: `${BASE}/gk/${istDateKey(-i)}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.5,
  }));

  // Current-affairs pages are deliberately EXCLUDED from the sitemap and marked
  // noindex: they are an aggregated third-party headline digest, not original
  // content, and submitting them for indexing risks a site-wide scaled-content
  // penalty. Re-add once the editorial pipeline produces original exam-format CA.

  return [...staticRoutes, ...examRoutes, ...explainerRoutes, ...dailyRoutes, ...gkRoutes];
}
