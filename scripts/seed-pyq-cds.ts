import "dotenv/config";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

// Seeds the CDS (Defence) previous-year papers from committed, key-verified data
// in prisma/data/. Idempotent: deterministic ids + upserts, so re-running on every
// deploy neither duplicates rows nor breaks existing Answer links. A paper whose
// data file is missing is skipped, so papers can be added one at a time.
//
// Run:  npx tsx scripts/seed-pyq-cds.ts
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });

type Row = {
  qno: number;
  text: string;
  a: string; b: string; c: string; d: string;
  correct: "A" | "B" | "C" | "D";
  explanation: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  topic: string;
};

type Paper = {
  dataFile: string;
  paperName: string;     // shown in titles, e.g. "General Knowledge"
  chapterSlug: string;
  testSlug: string;
  idPrefix: string;      // question ids are `${idPrefix}-qNNN` — never change once seeded
  totalQuestions: number; // as printed on the paper
  maxMarks: number;
  order: number;
};

// GK's slugs/ids are already live — keep them exactly as they are.
const PAPERS: Paper[] = [
  { dataFile: "cds2-2025-gk.json", paperName: "General Knowledge", chapterSlug: "cds-ii-2025-general-knowledge", testSlug: "cds-ii-2025-gk-pyq", idPrefix: "cds2gk25", totalQuestions: 120, maxMarks: 100, order: 1 },
  { dataFile: "cds2-2025-maths.json", paperName: "Elementary Mathematics", chapterSlug: "cds-ii-2025-elementary-mathematics", testSlug: "cds-ii-2025-maths-pyq", idPrefix: "cds2mt25", totalQuestions: 100, maxMarks: 100, order: 2 },
  { dataFile: "cds2-2025-english.json", paperName: "English", chapterSlug: "cds-ii-2025-english", testSlug: "cds-ii-2025-english-pyq", idPrefix: "cds2en25", totalQuestions: 120, maxMarks: 100, order: 3 },
];

const EXAM_SLUG = "cds";
const SUBJECT_SLUG = "previous-year-papers";
const YEAR = 2025;
const LETTERS = ["A", "B", "C", "D"] as const;

const qid = (p: Paper, qno: number) => `${p.idPrefix}-q${String(qno).padStart(3, "0")}`;

async function inChunks<T>(items: T[], size: number, fn: (t: T) => Promise<unknown>) {
  for (let i = 0; i < items.length; i += size) await Promise.all(items.slice(i, i + size).map(fn));
}

async function seedPaper(p: Paper, examId: string, subjectId: string) {
  const file = join(process.cwd(), "prisma", "data", p.dataFile);
  if (!existsSync(file)) {
    console.log(`seed-pyq-cds: ${p.paperName} — no data file yet, skipped.`);
    return;
  }
  const rows = JSON.parse(readFileSync(file, "utf8")) as Row[];
  const marks = p.maxMarks / p.totalQuestions; // marks per question as on the real paper
  const neg = marks / 3;                       // −1/3 negative marking
  const name = `CDS-II 2025 — ${p.paperName}`;

  const chapter = await prisma.chapter.upsert({
    where: { subjectId_slug: { subjectId, slug: p.chapterSlug } },
    update: { name },
    create: { examId, subjectId, slug: p.chapterSlug, name, order: p.order },
    select: { id: true },
  });

  await inChunks(rows, 10, async (r) => {
    const id = qid(p, r.qno);
    const data = { text: r.text, explanation: r.explanation, difficulty: r.difficulty, topic: r.topic, year: YEAR, marks, negativeMarks: neg };
    await prisma.question.upsert({
      where: { id },
      update: data,
      create: { id, ...data, type: "MCQ", examId, subjectId, chapterId: chapter.id },
    });
    const opts = [r.a, r.b, r.c, r.d];
    await Promise.all(
      opts.map((text, i) =>
        prisma.option.upsert({
          where: { id: `${id}-o${i}` },
          update: { text, isCorrect: LETTERS[i] === r.correct, order: i },
          create: { id: `${id}-o${i}`, questionId: id, text, isCorrect: LETTERS[i] === r.correct, order: i },
        }),
      ),
    );
  });

  const omitted = p.totalQuestions - rows.length;
  const description =
    `Real UPSC CDS-II 2025 ${p.paperName} paper (Series A). Source: UPSC official question paper + official answer key. ` +
    `${rows.length} questions with step-by-step solutions` +
    (omitted > 0 ? ` (${omitted} diagram-based question${omitted > 1 ? "s" : ""} omitted).` : ".");
  const totalMarks = Math.round(rows.length * marks * 100) / 100;

  const test = await prisma.mockTest.upsert({
    where: { examId_slug: { examId, slug: p.testSlug } },
    update: { title: `${name} (PYQ)`, description, totalMarks },
    create: {
      examId, slug: p.testSlug, title: `${name} (PYQ)`, description,
      type: "PYQ", durationMinutes: 120, totalMarks, negativeMarking: true, isFree: true, year: YEAR,
    },
    select: { id: true },
  });
  await prisma.testQuestion.deleteMany({ where: { mockTestId: test.id } });
  await prisma.testQuestion.createMany({
    data: rows.map((r, i) => ({ mockTestId: test.id, questionId: qid(p, r.qno), order: i })),
  });

  const n = await prisma.question.count({ where: { chapterId: chapter.id } });
  console.log(`seed-pyq-cds: ${name} — ${rows.length} rows applied, chapter has ${n} questions, test ${p.testSlug} rebuilt.`);
}

async function main() {
  // Exam (also created by db:seed from exams.ts; upsert keeps this self-sufficient).
  const exam = await prisma.exam.upsert({
    where: { slug: EXAM_SLUG },
    update: {},
    create: {
      slug: EXAM_SLUG,
      name: "CDS (Defence)",
      shortName: "CDS",
      emoji: "🎖️",
      description: "Combined Defence Services (IMA / OTA / Navy / Air Force) — real UPSC previous-year papers with full solutions.",
      status: "LIVE",
      order: 0,
    },
    select: { id: true },
  });
  const subject = await prisma.subject.upsert({
    where: { examId_slug: { examId: exam.id, slug: SUBJECT_SLUG } },
    update: {},
    create: { examId: exam.id, slug: SUBJECT_SLUG, name: "Previous Year Papers", order: 99 },
    select: { id: true },
  });

  for (const p of PAPERS) await seedPaper(p, exam.id, subject.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
