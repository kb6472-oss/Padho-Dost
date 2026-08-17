import { prisma } from "@/lib/prisma";

// The editorialised digest for a day — original exam-format facts + quiz.
// This is the publishable content; CurrentAffair rows are raw source material.
export async function getCaDigest(day: string) {
  try {
    return await prisma.caDigest.findUnique({
      where: { day: new Date(day) },
      include: {
        facts: { orderBy: { order: "asc" } },
        quiz: { orderBy: { order: "asc" } },
      },
    });
  } catch {
    return null;
  }
}

// Days that have a published digest — these are the only CA pages worth indexing.
export async function getDigestDates(limit = 30): Promise<string[]> {
  try {
    const rows = await prisma.caDigest.findMany({
      orderBy: { day: "desc" },
      take: limit,
      select: { day: true },
    });
    return rows.map((r) => r.day.toISOString().slice(0, 10));
  } catch {
    return [];
  }
}

// All current-affairs items for a given IST day ("YYYY-MM-DD").
export async function getCurrentAffairs(day: string) {
  try {
    return await prisma.currentAffair.findMany({
      where: { day: new Date(day) },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    });
  } catch {
    return [];
  }
}

// The most recent day that actually has a digest (for the /current-affairs hub).
export async function getLatestCADate(): Promise<string | null> {
  try {
    const latest = await prisma.currentAffair.findFirst({
      orderBy: { day: "desc" },
      select: { day: true },
    });
    return latest ? latest.day.toISOString().slice(0, 10) : null;
  } catch {
    return null;
  }
}

// All published digests in a calendar month ("YYYY-MM"), oldest-first, with their
// facts — for the monthly current-affairs compilation (a high-intent revision page).
export async function getCaMonth(month: string) {
  if (!/^\d{4}-\d{2}$/.test(month)) return null;
  const start = new Date(`${month}-01T00:00:00Z`);
  const end = new Date(start);
  end.setUTCMonth(end.getUTCMonth() + 1);
  try {
    return await prisma.caDigest.findMany({
      where: { day: { gte: start, lt: end } },
      orderBy: { day: "asc" },
      include: { facts: { orderBy: { order: "asc" } } },
    });
  } catch {
    return null;
  }
}

// Distinct months (newest-first, "YYYY-MM") that have at least one digest — powers the
// monthly compilation's prev/next nav and the archive listing.
export async function getDigestMonths(): Promise<string[]> {
  try {
    const rows = await prisma.caDigest.findMany({ select: { day: true }, orderBy: { day: "desc" } });
    return [...new Set(rows.map((r) => r.day.toISOString().slice(0, 7)))];
  } catch {
    return [];
  }
}

// Recent days that actually have a digest — for the sitemap (only real content).
// Defensive: if the table isn't migrated yet, return [] rather than breaking the sitemap.
export async function getRecentCADates(limit = 14): Promise<string[]> {
  try {
    const rows = await prisma.currentAffair.findMany({
      distinct: ["day"],
      orderBy: { day: "desc" },
      take: limit,
      select: { day: true },
    });
    return rows.map((r) => r.day.toISOString().slice(0, 10));
  } catch {
    return [];
  }
}
