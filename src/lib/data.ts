import { cache } from "react";
import { prisma } from "@/lib/prisma";

// All exams in catalogue order (for the /exams listing).
export const getExams = cache(async () => {
  return prisma.exam.findMany({ orderBy: { order: "asc" } });
});

// Per-exam content volume, keyed by exam slug — surfaced on every ExamCard so a
// student can see there are thousands of questions here instead of guessing.
// One grouped query per entity rather than N per card.
export const getExamCounts = cache(async () => {
  const [exams, questions, explainers] = await Promise.all([
    prisma.exam.findMany({
      select: { id: true, slug: true, _count: { select: { mockTests: true } } },
    }),
    prisma.question.groupBy({ by: ["examId"], _count: { _all: true } }),
    prisma.explainer.groupBy({ by: ["examId"], _count: { _all: true } }),
  ]);

  const qById = new Map(questions.map((q) => [q.examId, q._count._all]));
  const eById = new Map(explainers.map((e) => [e.examId, e._count._all]));

  return new Map(
    exams.map((e) => [
      e.slug,
      {
        tests: e._count.mockTests,
        questions: qById.get(e.id) ?? 0,
        explainers: eById.get(e.id) ?? 0,
      },
    ]),
  );
});

// One exam with its mock tests + question counts (for /exams/[slug]).
export const getExamWithTests = cache(async (slug: string) => {
  return prisma.exam.findUnique({
    where: { slug },
    include: {
      mockTests: {
        orderBy: { createdAt: "asc" },
        include: { _count: { select: { questions: true } } },
      },
    },
  });
});
