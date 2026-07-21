import { cache } from "react";
import { prisma } from "@/lib/prisma";

// ─────────────────────────────────────────────────────────────────────────────
// Topic hub data — the /exams/[slug]/[subject] and /…/[chapter] pages.
//
// The DB has always carried a full exam > subject > chapter taxonomy that no
// route exposed (~106 indexable URLs where the data supports 300+). These
// functions turn that latent structure into real pages, built entirely from
// content that already exists.
//
// MockTest has no chapter FK. But each chapter's practice test is seeded as a
// single type:"CHAPTER" test whose questions all belong to that one chapter, so
// we map tests to chapters through their first question — one query, no N+1.
// ─────────────────────────────────────────────────────────────────────────────

type ChapterTestInfo = { id: string; title: string; questions: number; durationMinutes: number };

// exam.id -> (chapter.id -> its practice test). One query for the whole exam.
async function chapterTestsForExam(examId: string): Promise<Map<string, ChapterTestInfo>> {
  const tests = await prisma.mockTest.findMany({
    where: { examId, type: "CHAPTER" },
    select: {
      id: true,
      title: true,
      durationMinutes: true,
      _count: { select: { questions: true } },
      questions: { take: 1, select: { question: { select: { chapterId: true } } } },
    },
  });
  const byChapter = new Map<string, ChapterTestInfo>();
  for (const t of tests) {
    const chId = t.questions[0]?.question.chapterId;
    if (chId && !byChapter.has(chId)) {
      byChapter.set(chId, {
        id: t.id,
        title: t.title,
        questions: t._count.questions,
        durationMinutes: t.durationMinutes,
      });
    }
  }
  return byChapter;
}

export const getSubjectHub = cache(async (examSlug: string, subjectSlug: string) => {
  const subject = await prisma.subject.findFirst({
    where: { slug: subjectSlug, exam: { slug: examSlug } },
    include: {
      exam: { select: { slug: true, name: true, shortName: true, emoji: true } },
      chapters: {
        orderBy: { order: "asc" },
        include: {
          _count: { select: { questions: true } },
          explainers: {
            where: { status: "PUBLISHED" },
            select: { slug: true, title: true, readingMinutes: true },
            take: 1,
          },
        },
      },
    },
  });
  if (!subject) return null;

  const testByChapter = await chapterTestsForExam(subject.examId);

  const chapters = subject.chapters
    // Only surface chapters that actually have questions — an empty chapter hub
    // is exactly the thin page we're trying not to create.
    .filter((c) => c._count.questions > 0)
    .map((c) => ({
      slug: c.slug,
      name: c.name,
      questions: c._count.questions,
      explainer: c.explainers[0] ?? null,
      test: testByChapter.get(c.id) ?? null,
    }));

  const totalQuestions = chapters.reduce((n, c) => n + c.questions, 0);
  const withExplainer = chapters.filter((c) => c.explainer).length;

  return {
    exam: subject.exam,
    subject: { slug: subject.slug, name: subject.name },
    chapters,
    totals: { chapters: chapters.length, questions: totalQuestions, explainers: withExplainer },
  };
});

export const getChapterHub = cache(async (examSlug: string, subjectSlug: string, chapterSlug: string) => {
  const chapter = await prisma.chapter.findFirst({
    where: { slug: chapterSlug, subject: { slug: subjectSlug }, exam: { slug: examSlug } },
    include: {
      exam: { select: { slug: true, name: true, shortName: true, emoji: true } },
      subject: { select: { slug: true, name: true } },
      _count: { select: { questions: true } },
      explainers: {
        where: { status: "PUBLISHED" },
        select: { slug: true, title: true, summary: true, readingMinutes: true },
      },
    },
  });
  if (!chapter || chapter._count.questions === 0) return null;

  const [difficulty, testByChapter, siblingsRaw] = await Promise.all([
    prisma.question.groupBy({
      by: ["difficulty"],
      where: { chapterId: chapter.id },
      _count: { _all: true },
    }),
    chapterTestsForExam(chapter.examId),
    // Siblings in the same subject, for prev/next navigation and cross-linking.
    prisma.chapter.findMany({
      where: { subjectId: chapter.subjectId, questions: { some: {} } },
      orderBy: { order: "asc" },
      select: { slug: true, name: true },
    }),
  ]);

  const diff = { EASY: 0, MEDIUM: 0, HARD: 0 } as Record<string, number>;
  for (const d of difficulty) diff[d.difficulty] = d._count._all;

  const idx = siblingsRaw.findIndex((s) => s.slug === chapter.slug);
  const prev = idx > 0 ? siblingsRaw[idx - 1] : null;
  const next = idx >= 0 && idx < siblingsRaw.length - 1 ? siblingsRaw[idx + 1] : null;

  return {
    exam: chapter.exam,
    subject: chapter.subject,
    chapter: { slug: chapter.slug, name: chapter.name },
    questions: chapter._count.questions,
    difficulty: diff,
    explainers: chapter.explainers,
    test: testByChapter.get(chapter.id) ?? null,
    siblings: siblingsRaw,
    prev,
    next,
  };
});

// Subjects for an exam, each with its chapter + question counts — for the
// "Study by topic" strip on the exam page (the crawl path into the hubs).
export const getExamSubjects = cache(async (examSlug: string) => {
  const subjects = await prisma.subject.findMany({
    where: { exam: { slug: examSlug }, chapters: { some: { questions: { some: {} } } } },
    orderBy: { order: "asc" },
    select: {
      slug: true,
      name: true,
      chapters: { where: { questions: { some: {} } }, select: { _count: { select: { questions: true } } } },
    },
  });
  return subjects.map((s) => ({
    slug: s.slug,
    name: s.name,
    chapters: s.chapters.length,
    questions: s.chapters.reduce((n, c) => n + c._count.questions, 0),
  }));
});

// ── Sitemap helpers ──────────────────────────────────────────────────────────
// Every subject/chapter that has questions becomes an indexable URL.

export const getSubjectPaths = cache(async () => {
  const subjects = await prisma.subject.findMany({
    where: { chapters: { some: { questions: { some: {} } } } },
    select: { slug: true, exam: { select: { slug: true } } },
  });
  return subjects.map((s) => ({ exam: s.exam.slug, subject: s.slug }));
});

export const getChapterPaths = cache(async () => {
  const chapters = await prisma.chapter.findMany({
    where: { questions: { some: {} } },
    select: { slug: true, subject: { select: { slug: true } }, exam: { select: { slug: true } } },
  });
  return chapters.map((c) => ({ exam: c.exam.slug, subject: c.subject.slug, chapter: c.slug }));
});
