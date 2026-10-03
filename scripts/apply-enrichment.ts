import "dotenv/config";
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

// Applies chapter enrichment files — prisma/data/enrich/<exam>/<subject>__<chapter>.json —
// extra solved MCQs + quick revision notes for chapters that were too thin to rank.
// Idempotent: deterministic ids, and rows are only written when their content changed,
// so re-running on every deploy is cheap. New questions are appended to the chapter's
// practice test. Questions dropped from a file are detached (not deleted — deleting
// would cascade away students' recorded answers).

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });
const ROOT = join(process.cwd(), "prisma", "data", "enrich");
const DIFFS = ["EASY", "MEDIUM", "HARD"] as const;
const DRY = process.argv.includes("--dry"); // read-only: report what would change

type EnrichQ = { text: string; difficulty: (typeof DIFFS)[number]; options: string[]; answer: number; explanation: string };
type EnrichFile = { exam: string; subject: string; chapter: string; notes?: unknown; questions: EnrichQ[] };

// Case/whitespace-insensitive only — symbols matter (2√2 vs √2, M − X × N vs M ÷ X × N).
const norm = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();
const isNotes = (n: unknown) => {
  const v = n as { summary?: unknown; keyPoints?: unknown } | null;
  return !!v && typeof v.summary === "string" && Array.isArray(v.keyPoints) && v.keyPoints.length > 0;
};

async function inChunks<T>(items: T[], size: number, fn: (t: T) => Promise<unknown>) {
  for (let i = 0; i < items.length; i += size) await Promise.all(items.slice(i, i + size).map(fn));
}

async function applyFile(path: string) {
  const f = JSON.parse(readFileSync(path, "utf8")) as EnrichFile;
  const label = `${f.exam}/${f.subject}/${f.chapter}`;
  const chapter = await prisma.chapter.findFirst({
    where: { slug: f.chapter, subject: { slug: f.subject }, exam: { slug: f.exam } },
    select: {
      id: true, examId: true, subjectId: true, notes: !DRY, // dry runs may predate the notes column
      questions: {
        select: {
          id: true, text: true, explanation: true, difficulty: true, marks: true, negativeMarks: true,
          options: { orderBy: { order: "asc" }, select: { text: true, isCorrect: true } },
        },
      },
    },
  });
  if (!chapter) return console.log(`apply-enrichment: ${label} — chapter not found, skipped.`);

  const prefix = `enr-${createHash("sha1").update(label).digest("hex").slice(0, 10)}`;
  const original = chapter.questions.filter((q) => !q.id.startsWith(prefix));
  const current = new Map(chapter.questions.filter((q) => q.id.startsWith(prefix)).map((q) => [q.id, q]));
  const marks = original[0]?.marks ?? 1;
  const negativeMarks = original[0]?.negativeMarks ?? 0;

  // Validate + drop anything malformed or duplicating a question already in the chapter.
  const seen = new Set(original.map((q) => norm(q.text)));
  let rejected = 0;
  const valid = (f.questions ?? []).filter((q) => {
    const ok =
      typeof q.text === "string" && q.text.trim() &&
      typeof q.explanation === "string" && q.explanation.trim() &&
      DIFFS.includes(q.difficulty) &&
      Array.isArray(q.options) && q.options.length === 4 && q.options.every((o) => typeof o === "string" && o.trim()) &&
      new Set(q.options.map((o) => o.replace(/\s+/g, " ").trim())).size === 4 && // case matters: Tt vs TT vs tt
      Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4 &&
      !seen.has(norm(q.text));
    if (ok) seen.add(norm(q.text));
    else rejected++;
    return ok;
  });

  const ids = valid.map((_, i) => `${prefix}-q${String(i + 1).padStart(2, "0")}`);
  let written = 0;
  await inChunks(valid.map((q, i) => ({ q, id: ids[i] })), 10, async ({ q, id }) => {
    const prev = current.get(id);
    const same =
      prev && prev.text === q.text && prev.explanation === q.explanation && prev.difficulty === q.difficulty &&
      prev.marks === marks && prev.negativeMarks === negativeMarks &&
      prev.options.length === 4 && prev.options.every((o, i) => o.text === q.options[i] && o.isCorrect === (i === q.answer));
    if (same) return;
    written++;
    if (DRY) return;
    const data = { text: q.text, explanation: q.explanation, difficulty: q.difficulty, marks, negativeMarks, chapterId: chapter.id };
    await prisma.question.upsert({
      where: { id },
      update: data,
      create: { id, ...data, type: "MCQ", examId: chapter.examId, subjectId: chapter.subjectId },
    });
    await Promise.all(
      q.options.map((text, i) =>
        prisma.option.upsert({
          where: { id: `${id}-o${i}` },
          update: { text, isCorrect: i === q.answer, order: i },
          create: { id: `${id}-o${i}`, questionId: id, text, isCorrect: i === q.answer, order: i },
        }),
      ),
    );
  });

  // Append to the chapter's practice test (the CHAPTER test that holds its original questions).
  const test = await prisma.mockTest.findFirst({
    where: { examId: chapter.examId, type: "CHAPTER", questions: { some: { question: { chapterId: chapter.id, id: { notIn: ids } } } } },
    select: { id: true },
  });
  const stale = [...current.keys()].filter((id) => !ids.includes(id));
  if (stale.length && !DRY) {
    await prisma.question.updateMany({ where: { id: { in: stale } }, data: { chapterId: null } });
    if (test) await prisma.testQuestion.deleteMany({ where: { mockTestId: test.id, questionId: { in: stale } } });
  }
  if (test && !DRY) {
    await prisma.testQuestion.createMany({
      data: ids.map((questionId, i) => ({ mockTestId: test.id, questionId, order: 1000 + i })),
      skipDuplicates: true,
    });
    const n = await prisma.testQuestion.count({ where: { mockTestId: test.id } });
    await prisma.mockTest.update({
      where: { id: test.id },
      data: { totalMarks: Math.round(n * marks * 100) / 100, durationMinutes: Math.max(5, n * 2) },
    });
  }

  if (!DRY && isNotes(f.notes) && JSON.stringify(chapter.notes) !== JSON.stringify(f.notes)) {
    await prisma.chapter.update({ where: { id: chapter.id }, data: { notes: f.notes as object } });
  }

  console.log(
    `apply-enrichment${DRY ? " (dry run)" : ""}: ${label} — ${valid.length} questions (${written} written${rejected ? `, ${rejected} rejected` : ""}${stale.length ? `, ${stale.length} detached` : ""}), ` +
      `chapter now ${original.length + valid.length}${test ? "" : " — no chapter test found"}${isNotes(f.notes) ? ", notes ✓" : ""}`,
  );
}

async function main() {
  if (!existsSync(ROOT)) return console.log("apply-enrichment: no prisma/data/enrich — nothing to do.");
  const files = readdirSync(ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .flatMap((d) => readdirSync(join(ROOT, d.name)).filter((n) => n.endsWith(".json")).map((n) => join(ROOT, d.name, n)));
  await inChunks(files, 4, applyFile);
  console.log(`apply-enrichment: ${files.length} file(s) processed.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
