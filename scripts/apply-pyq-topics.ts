import "dotenv/config";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { PYQ_TOPICS } from "../src/lib/pyq-topics";

// Applies the committed PYQ topic classification (prisma/data/pyq-topics.json) to
// Question.topic, and backfills Question.year from each paper's name. Idempotent —
// safe to run on every deploy. Only touches previous-year-paper questions.
//
// Run:  npx tsx scripts/apply-pyq-topics.ts
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });

const VALID = new Set(PYQ_TOPICS.map((t) => t.slug));
const PYQ_WHERE = { chapter: { subject: { slug: "previous-year-papers" } } } as const;

function yearOf(name: string): number | null {
  const m = name.match(/\b(19|20)\d{2}\b/);
  return m ? parseInt(m[0], 10) : null;
}

async function main() {
  // 1) Backfill year on any PYQ question that still lacks one (parsed from the paper).
  const papers = await prisma.chapter.findMany({
    where: { subject: { slug: "previous-year-papers" } },
    select: { id: true, name: true },
  });
  let yearFilled = 0;
  for (const p of papers) {
    const y = yearOf(p.name);
    if (!y) continue;
    const r = await prisma.question.updateMany({ where: { chapterId: p.id, year: null }, data: { year: y } });
    yearFilled += r.count;
  }

  // 2) Apply topics from the classification file, grouped so each topic is one UPDATE.
  const file = join(process.cwd(), "prisma", "data", "pyq-topics.json");
  const raw = JSON.parse(readFileSync(file, "utf8")) as { id: string; topic: string }[];
  const byTopic = new Map<string, string[]>();
  let bad = 0;
  for (const { id, topic } of raw) {
    if (!VALID.has(topic)) { bad++; continue; }
    let ids = byTopic.get(topic);
    if (!ids) { ids = []; byTopic.set(topic, ids); }
    ids.push(id);
  }
  let topicSet = 0;
  for (const [topic, ids] of byTopic) {
    // Scope to PYQ questions so a stray id can never mis-tag normal content.
    const r = await prisma.question.updateMany({ where: { id: { in: ids }, ...PYQ_WHERE }, data: { topic } });
    topicSet += r.count;
  }

  const classified = await prisma.question.count({ where: { topic: { not: null }, ...PYQ_WHERE } });
  const totalPyq = await prisma.question.count({ where: PYQ_WHERE });
  console.log(
    `apply-pyq-topics: year backfilled ${yearFilled}, topics set ${topicSet} (${bad} skipped bad-slug) — ` +
      `${classified}/${totalPyq} PYQ questions now classified.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
