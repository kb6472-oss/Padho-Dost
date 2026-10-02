import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

// Daily current-affairs fetcher. Run once a day via cron on the VPS:
//   0 6 * * *  cd /root/padhodost && npx tsx scripts/fetch-current-affairs.ts >> /root/ca-fetch.log 2>&1
// Requires in .env:  NEWS_API_KEY=...   NEWS_API_PROVIDER=gnews|newsdata  (default gnews)

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DIRECT_URL }) });

type Item = { title: string; summary: string | null; source: string | null; url: string; imageUrl: string | null; category: string | null; publishedAt: Date | null };

function istDayKey(): string {
  return new Date(Date.now() + 5.5 * 3600_000).toISOString().slice(0, 10);
}

// GNews' free tier returns at most 10 articles per request, and "nation" alone left
// the digest with only 1–2 exam-relevant facts a day. Pull several categories
// (6 requests/day of the free 100). Override with GNEWS_CATEGORIES="a,b,c".
const GNEWS_CATEGORIES = (process.env.GNEWS_CATEGORIES ?? "nation,business,world,science,technology,sports")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

async function fetchGNews(key: string): Promise<Item[]> {
  const out: Item[] = [];
  for (const category of GNEWS_CATEGORIES) {
    try {
      const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=in&max=10&apikey=${key}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`GNews ${res.status}: ${(await res.text()).slice(0, 200)}`);
      const data = (await res.json()) as { articles?: Array<Record<string, unknown>> };
      for (const a of data.articles ?? []) {
        out.push({
          title: String(a.title ?? "").trim(),
          summary: a.description ? String(a.description).trim() : null,
          source: (a.source as { name?: string })?.name ?? null,
          url: String(a.url ?? ""),
          imageUrl: a.image ? String(a.image) : null,
          category,
          publishedAt: a.publishedAt ? new Date(String(a.publishedAt)) : null,
        });
      }
    } catch (e) {
      console.warn(`GNews category "${category}" failed:`, e instanceof Error ? e.message : e);
    }
    await new Promise((r) => setTimeout(r, 1200)); // stay under the free tier's per-second limit
  }
  // The same story can appear under two categories — keep the first.
  const seen = new Set<string>();
  return out.filter((it) => (seen.has(it.url) ? false : (seen.add(it.url), true)));
}

async function fetchNewsData(key: string): Promise<Item[]> {
  const url = `https://newsdata.io/api/1/latest?country=in&language=en&category=politics,business,science,world&apikey=${key}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`NewsData ${res.status}: ${await res.text()}`);
  const data = (await res.json()) as { results?: Array<Record<string, unknown>> };
  return (data.results ?? []).slice(0, 12).map((a) => ({
    title: String(a.title ?? "").trim(),
    summary: a.description ? String(a.description).trim() : null,
    source: (a.source_name as string) ?? (a.source_id as string) ?? null,
    url: String(a.link ?? ""),
    imageUrl: a.image_url ? String(a.image_url) : null,
    category: Array.isArray(a.category) ? String(a.category[0]) : null,
    publishedAt: a.pubDate ? new Date(String(a.pubDate)) : null,
  }));
}

async function main() {
  const key = process.env.NEWS_API_KEY;
  if (!key) {
    console.error("NEWS_API_KEY not set in .env — skipping. Get a free key from gnews.io or newsdata.io.");
    process.exit(1);
  }
  const provider = (process.env.NEWS_API_PROVIDER ?? "gnews").toLowerCase();
  const items = provider === "newsdata" ? await fetchNewsData(key) : await fetchGNews(key);

  const day = new Date(istDayKey());
  let saved = 0;
  for (const it of items) {
    if (!it.title || !it.url) continue;
    await prisma.currentAffair.upsert({
      where: { day_url: { day, url: it.url } },
      update: { title: it.title, summary: it.summary, source: it.source, imageUrl: it.imageUrl, category: it.category, publishedAt: it.publishedAt },
      create: { day, title: it.title, summary: it.summary, source: it.source, url: it.url, imageUrl: it.imageUrl, category: it.category, publishedAt: it.publishedAt },
    });
    saved++;
  }
  console.log(`[${new Date().toISOString()}] current-affairs (${provider}): saved ${saved} items for ${istDayKey()}.`);
}

main()
  .catch((e) => {
    console.error("fetch-current-affairs failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
