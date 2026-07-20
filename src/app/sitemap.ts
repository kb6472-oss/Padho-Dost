import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const BASE = "https://padhodost.com";

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

  // Dated /daily, /gk and /current-affairs pages are deliberately EXCLUDED and
  // marked noindex:
  //   - daily + gk are a single MCQ each (~40 words) — thin inventory
  //   - current-affairs is an aggregated third-party headline digest, not ours
  // Both are good product surfaces and bad search results. Re-add each once it
  // carries substantive original content (Phase 2 of docs/REDESIGN-PLAN.md).

  return [...staticRoutes, ...examRoutes, ...explainerRoutes];
}
