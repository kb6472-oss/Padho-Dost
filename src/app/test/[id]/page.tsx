import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import TestRunner, { type RunnerTest } from "@/components/TestRunner";

type Props = { params: Promise<{ id: string }> };

export const metadata: Metadata = { title: "Mock Test", robots: { index: false } };

export default async function TestPage({ params }: Props) {
  const { id } = await params;

  // Fetch questions + options WITHOUT isCorrect — never send answers to the client.
  const test = await prisma.mockTest.findUnique({
    where: { id },
    include: {
      questions: {
        orderBy: { order: "asc" },
        include: {
          question: {
            select: {
              id: true,
              text: true,
              marks: true,
              negativeMarks: true,
              options: { select: { id: true, text: true }, orderBy: { order: "asc" } },
            },
          },
        },
      },
    },
  });

  if (!test || test.questions.length === 0) notFound();

  const runnerTest: RunnerTest = {
    id: test.id,
    title: test.title,
    durationMinutes: test.durationMinutes,
    totalMarks: test.totalMarks,
    negativeMarking: test.negativeMarking,
    questions: test.questions.map((tq) => tq.question),
  };

  return <TestRunner test={runnerTest} />;
}
