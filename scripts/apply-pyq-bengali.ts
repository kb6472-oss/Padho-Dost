import "dotenv/config";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

// Applies the committed Bengali translations (prisma/data/pyq-bengali.json) to
// Question.textBn / Question.explanationBn and Option.textBn. Idempotent — safe to
// run on every deploy. Only touches ids present in the file (WB-vertical PYQ).
//
// Run:  npx tsx scripts/apply-pyq-bengali.ts
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });

type Row = {
  id: string;
  textBn: string;
  explanationBn: string;
  options: { id: string; textBn: string }[];
};

// Run promises in bounded-concurrency chunks (pooled connection — avoid 2000 at once).
async function inChunks<T>(items: T[], size: number, fn: (t: T) => Promise<unknown>) {
  for (let i = 0; i < items.length; i += size) {
    await Promise.all(items.slice(i, i + size).map(fn));
  }
}

async function main() {
  const file = join(process.cwd(), "prisma", "data", "pyq-bengali.json");
  const rows = JSON.parse(readFileSync(file, "utf8")) as Row[];

  let qUpdated = 0;
  await inChunks(rows, 40, async (r) => {
    const textBn = r.textBn?.trim() || null;
    const explanationBn = r.explanationBn?.trim() || null;
    await prisma.question.update({
      where: { id: r.id },
      data: { textBn, explanationBn },
    }).then(() => { qUpdated++; }).catch(() => {}); // skip ids that no longer exist
  });

  // Flatten option updates across all rows.
  const optRows = rows.flatMap((r) => r.options ?? []);
  let oUpdated = 0;
  await inChunks(optRows, 60, async (o) => {
    const textBn = o.textBn?.trim() || null;
    if (!textBn) return;
    await prisma.option.update({ where: { id: o.id }, data: { textBn } })
      .then(() => { oUpdated++; })
      .catch(() => {});
  });

  const qHave = await prisma.question.count({ where: { textBn: { not: null } } });
  const oHave = await prisma.option.count({ where: { textBn: { not: null } } });
  console.log(
    `apply-pyq-bengali: questions updated ${qUpdated}/${rows.length}, options updated ${oUpdated}/${optRows.length} — ` +
      `now ${qHave} questions & ${oHave} options carry Bengali.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
