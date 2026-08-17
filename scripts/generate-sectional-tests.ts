import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

// Creates ONE SECTIONAL (whole-subject) mock test per eligible exam-subject — the
// middle rung between a single-chapter test and a full mock that we were missing.
// Idempotent: upserts by (examId, slug=sectional-<subjectSlug>) and rebuilds its
// question set, so it is safe to run on every deploy. `--dry` reports the plan only.
//
// Run:  npx tsx scripts/generate-sectional-tests.ts [--dry]
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });

const DRY = process.argv.includes("--dry");
const MIN_Q = 20; // skip thin subjects that don't warrant a section test
const CAP = 40; // keep a section test to a focused, finishable length

async function main() {
  const subjects = await prisma.subject.findMany({
    where: { exam: { status: "LIVE" }, slug: { not: "previous-year-papers" } },
    select: { id: true, slug: true, name: true, examId: true, exam: { select: { slug: true, shortName: true } } },
    orderBy: [{ examId: "asc" }, { order: "asc" }],
  });

  let eligible = 0,
    upserted = 0,
    skipped = 0;

  for (const s of subjects) {
    const total = await prisma.question.count({ where: { chapter: { subjectId: s.id } } });
    if (total < MIN_Q) {
      skipped++;
      continue;
    }
    eligible++;

    const qs = await prisma.question.findMany({
      where: { chapter: { subjectId: s.id } },
      select: { id: true },
      orderBy: [{ chapter: { order: "asc" } }, { createdAt: "asc" }],
      take: CAP,
    });
    const n = qs.length;
    const slug = `sectional-${s.slug}`;
    const title = `${s.name} — Full Section Test`;

    if (DRY) {
      console.log(`  [dry] ${s.exam.slug}/${s.slug}: ${n} Q (of ${total}) → "${title}"`);
      continue;
    }

    const test = await prisma.mockTest.upsert({
      where: { examId_slug: { examId: s.examId, slug } },
      update: { title, type: "SECTIONAL", durationMinutes: n, totalMarks: n, negativeMarking: true, isFree: true },
      create: {
        examId: s.examId,
        slug,
        title,
        type: "SECTIONAL",
        durationMinutes: n,
        totalMarks: n,
        negativeMarking: true,
        isFree: true,
        description: `Practise the entire ${s.name} section of ${s.exam.shortName} in one timed test — ${n} questions with full step-by-step solutions.`,
      },
      select: { id: true },
    });

    // Rebuild the question set (idempotent — reflects any content added since last run).
    await prisma.testQuestion.deleteMany({ where: { mockTestId: test.id } });
    await prisma.testQuestion.createMany({ data: qs.map((q, i) => ({ mockTestId: test.id, questionId: q.id, order: i })) });
    upserted++;
  }

  console.log(
    `${DRY ? "[DRY] " : ""}sectional tests: ${eligible} eligible subject(s)` +
      `${DRY ? "" : `, ${upserted} upserted`}, ${skipped} skipped (<${MIN_Q} Q).`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
