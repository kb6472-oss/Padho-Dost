import { cache } from "react";
import { prisma } from "@/lib/prisma";

// All exams in catalogue order (for the /exams listing).
export const getExams = cache(async () => {
  return prisma.exam.findMany({ orderBy: { order: "asc" } });
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
