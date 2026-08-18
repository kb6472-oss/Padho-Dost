import "dotenv/config";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

// Seeds the CDS (Defence) previous-year paper — CDS-II 2025 General Knowledge —
// from the committed, key-verified data in prisma/data/cds2-2025-gk.json.
// Idempotent: deterministic ids + upserts, so re-running on every deploy neither
// duplicates rows nor breaks existing Answer links. Only touches CDS PYQ rows.
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

const EXAM_SLUG = "cds";
const SUBJECT_SLUG = "previous-year-papers";
const CHAPTER_SLUG = "cds-ii-2025-general-knowledge";
const TEST_SLUG = "cds-ii-2025-gk-pyq";
const YEAR = 2025;
const MARKS = 100 / 120;          // CDS GK: 120 Q, 100 marks
const NEG = 100 / 120 / 3;        // −1/3 negative marking

async function main() {
  const rows = JSON.parse(
    readFileSync(join(process.cwd(), "prisma", "data", "cds2-2025-gk.json"), "utf8"),
  ) as Row[];

  // 1) Exam (also created by db:seed from exams.ts; upsert keeps this self-sufficient).
  const exam = await prisma.exam.upsert({
    where: { slug: EXAM_SLUG },
    update: {},
    create: {
      slug: EXAM_SLUG,
      name: "CDS (Defence)",
      shortName: "CDS",
      emoji: "🎖️",
      description:
        "Combined Defence Services (IMA / OTA / Navy / Air Force) — General Knowledge, with real UPSC previous-year papers.",
      status: "LIVE",
      order: 0,
    },
    select: { id: true },
  });

  // 2) Subject + 3) Chapter (deterministic slugs).
  const subject = await prisma.subject.upsert({
    where: { examId_slug: { examId: exam.id, slug: SUBJECT_SLUG } },
    update: {},
    create: { examId: exam.id, slug: SUBJECT_SLUG, name: "Previous Year Papers", order: 99 },
    select: { id: true },
  });
  const chapter = await prisma.chapter.upsert({
    where: { subjectId_slug: { subjectId: subject.id, slug: CHAPTER_SLUG } },
    update: { name: "CDS-II 2025 — General Knowledge" },
    create: { examId: exam.id, subjectId: subject.id, slug: CHAPTER_SLUG, name: "CDS-II 2025 — General Knowledge", order: 1 },
    select: { id: true },
  });

  // 4) Questions + options (deterministic ids → idempotent, answer-safe).
  const letters = ["A", "B", "C", "D"] as const;
  for (const r of rows) {
    const qid = `cds2gk25-q${String(r.qno).padStart(3, "0")}`;
    const opts = [r.a, r.b, r.c, r.d];
    await prisma.question.upsert({
      where: { id: qid },
      update: { text: r.text, explanation: r.explanation, difficulty: r.difficulty, topic: r.topic, year: YEAR, marks: MARKS, negativeMarks: NEG },
      create: {
        id: qid,
        text: r.text,
        type: "MCQ",
        difficulty: r.difficulty,
        explanation: r.explanation,
        topic: r.topic,
        year: YEAR,
        marks: MARKS,
        negativeMarks: NEG,
        examId: exam.id,
        subjectId: subject.id,
        chapterId: chapter.id,
      },
    });
    for (let i = 0; i < 4; i++) {
      const oid = `${qid}-o${i}`;
      await prisma.option.upsert({
        where: { id: oid },
        update: { text: opts[i], isCorrect: letters[i] === r.correct, order: i },
        create: { id: oid, questionId: qid, text: opts[i], isCorrect: letters[i] === r.correct, order: i },
      });
    }
  }

  // 5) MockTest (type PYQ) + its question set.
  const test = await prisma.mockTest.upsert({
    where: { examId_slug: { examId: exam.id, slug: TEST_SLUG } },
    update: { title: "CDS-II 2025 — General Knowledge (PYQ)" },
    create: {
      examId: exam.id,
      slug: TEST_SLUG,
      title: "CDS-II 2025 — General Knowledge (PYQ)",
      description:
        "Real UPSC CDS-II 2025 General Knowledge paper (Series A). Source: UPSC official question paper + official answer key. 120 questions with step-by-step solutions.",
      type: "PYQ",
      durationMinutes: 120,
      totalMarks: 100,
      negativeMarking: true,
      isFree: true,
      year: YEAR,
    },
    select: { id: true },
  });
  await prisma.testQuestion.deleteMany({ where: { mockTestId: test.id } });
  await prisma.testQuestion.createMany({
    data: rows.map((r, i) => ({ mockTestId: test.id, questionId: `cds2gk25-q${String(r.qno).padStart(3, "0")}`, order: i })),
  });

  const n = await prisma.question.count({ where: { chapterId: chapter.id } });
  console.log(`seed-pyq-cds: CDS-II 2025 GK — ${rows.length} rows applied, chapter now has ${n} questions, test ${TEST_SLUG} rebuilt.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
