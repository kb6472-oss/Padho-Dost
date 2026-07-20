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
