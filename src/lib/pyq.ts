import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { PYQ_TOPICS, pyqTopic, pyqTopicOrder } from "@/lib/pyq-topics";

// ─────────────────────────────────────────────────────────────────────────────
// PYQ-by-topic — regroups the previous-year-paper question bank by syllabus topic
// (Question.topic, set by scripts/apply-pyq-topics.ts) rather than by paper. Turns
// "UPSC Prelims 2024" + "UPSC Prelims 2023" into one "UPSC Polity — Previous Year
// Questions" archive that spans years — the shape students actually revise in.
// ─────────────────────────────────────────────────────────────────────────────

const PYQ_WHERE = { chapter: { subject: { slug: "previous-year-papers" } } } as const;

// Exams that have any classified PYQ — the crawl roots + sitemap source.
export const getPyqExams = cache(async () => {
  const exams = await prisma.exam.findMany({
    where: { status: "LIVE", questions: { some: { ...PYQ_WHERE, topic: { not: null } } } },
    orderBy: { name: "asc" },
    select: { slug: true, name: true, shortName: true, emoji: true },
  });
  return exams;
});

// One exam's topics with question counts + the year span — for /exams/[slug]/pyq.
export const getPyqTopicsForExam = cache(async (examSlug: string) => {
  const exam = await prisma.exam.findFirst({
    where: { slug: examSlug, status: "LIVE" },
    select: { slug: true, name: true, shortName: true, emoji: true },
  });
  if (!exam) return null;

  const [grouped, years] = await Promise.all([
    prisma.question.groupBy({
      by: ["topic"],
      where: { exam: { slug: examSlug }, topic: { not: null }, ...PYQ_WHERE },
      _count: { _all: true },
    }),
    prisma.question.findMany({
      where: { exam: { slug: examSlug }, year: { not: null }, ...PYQ_WHERE },
      distinct: ["year"],
      select: { year: true },
      orderBy: { year: "desc" },
    }),
  ]);

  const topics = grouped
    .map((g) => {
      const t = pyqTopic(g.topic as string);
      return t ? { ...t, count: g._count._all } : null;
    })
    .filter((t): t is NonNullable<typeof t> => t !== null)
    .sort((a, b) => pyqTopicOrder(a.slug) - pyqTopicOrder(b.slug));

  const total = topics.reduce((n, t) => n + t.count, 0);
  return {
    exam,
    topics,
    total,
    years: years.map((y) => y.year as number),
  };
});

export type PyqSolvedQuestion = {
  id: string;
  text: string;
  explanation: string | null;
  year: number | null;
  paper: string | null;
  options: { text: string; isCorrect: boolean }[];
};

// All PYQs of one topic within one exam, newest year first — for the topic page.
export const getPyqTopicQuestions = cache(async (examSlug: string, topicSlug: string) => {
  const topic = pyqTopic(topicSlug);
  if (!topic) return null;

  const exam = await prisma.exam.findFirst({
    where: { slug: examSlug, status: "LIVE" },
    select: { slug: true, name: true, shortName: true, emoji: true },
  });
  if (!exam) return null;

  const rows = await prisma.question.findMany({
    where: { exam: { slug: examSlug }, topic: topicSlug, ...PYQ_WHERE },
    orderBy: [{ year: "desc" }, { createdAt: "asc" }],
    select: {
      id: true,
      text: true,
      explanation: true,
      year: true,
      chapter: { select: { name: true } },
      options: { orderBy: { order: "asc" }, select: { text: true, isCorrect: true } },
    },
  });
  if (rows.length === 0) return null;

  const questions: PyqSolvedQuestion[] = rows.map((q) => ({
    id: q.id,
    text: q.text,
    explanation: q.explanation,
    year: q.year,
    paper: q.chapter?.name ?? null,
    options: q.options,
  }));

  // Sibling topics (same exam) for cross-linking at the foot of the page.
  const siblings = await getPyqTopicsForExam(examSlug);

  return {
    exam,
    topic,
    questions,
    years: [...new Set(questions.map((q) => q.year).filter((y): y is number => y !== null))].sort((a, b) => b - a),
    siblings: (siblings?.topics ?? []).filter((t) => t.slug !== topicSlug),
  };
});

// Sitemap: every (exam, topic) that has classified PYQs.
export const getPyqTopicPaths = cache(async () => {
  const rows = await prisma.question.groupBy({
    by: ["examId", "topic"],
    where: { topic: { not: null }, exam: { status: "LIVE" }, ...PYQ_WHERE },
    _count: { _all: true },
  });
  const examIds = [...new Set(rows.map((r) => r.examId))];
  const exams = await prisma.exam.findMany({ where: { id: { in: examIds } }, select: { id: true, slug: true } });
  const slugById = new Map(exams.map((e) => [e.id, e.slug]));
  return rows
    .map((r) => ({ exam: slugById.get(r.examId), topic: r.topic as string }))
    .filter((r): r is { exam: string; topic: string } => !!r.exam && PYQ_TOPICS.some((t) => t.slug === r.topic));
});
