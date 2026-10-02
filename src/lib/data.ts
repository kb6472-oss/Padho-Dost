import { cache } from "react";
import { cacheContent } from "@/lib/content-cache";
import { prisma } from "@/lib/prisma";

// All exams in catalogue order (for the /exams listing).
const getExamsUncached = cache(async () => {
  return prisma.exam.findMany({ orderBy: { order: "asc" } });
});

// Per-exam content volume, keyed by exam slug — surfaced on every ExamCard so a
// student can see there are thousands of questions here instead of guessing.
// One grouped query per entity rather than N per card.
const getExamCountEntries = cacheContent(async () => {
  const [exams, questions, explainers] = await Promise.all([
    prisma.exam.findMany({
      select: { id: true, slug: true, _count: { select: { mockTests: true } } },
    }),
    prisma.question.groupBy({ by: ["examId"], _count: { _all: true } }),
    prisma.explainer.groupBy({ by: ["examId"], _count: { _all: true } }),
  ]);

  const qById = new Map(questions.map((q) => [q.examId, q._count._all]));
  const eById = new Map(explainers.map((e) => [e.examId, e._count._all]));

  // Plain entries (not a Map) so the result survives the JSON cache.
  return [...new Map(
    exams.map((e) => [
      e.slug,
      {
        tests: e._count.mockTests,
        questions: qById.get(e.id) ?? 0,
        explainers: eById.get(e.id) ?? 0,
      },
    ]),
  )];
}, "data:examCounts");

// One exam with its mock tests + question counts (for /exams/[slug]).
const getExamWithTestsUncached = cache(async (slug: string) => {
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

// Cached for an hour (content only changes on deploy) — see content-cache.ts.
export const getExams = cache(cacheContent(getExamsUncached, "data:getExams"));
export const getExamWithTests = cache(cacheContent(getExamWithTestsUncached, "data:getExamWithTests"));
export const getExamCounts = cache(async () => new Map(await getExamCountEntries()));
