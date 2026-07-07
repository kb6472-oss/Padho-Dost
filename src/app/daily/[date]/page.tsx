import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDailyQuestion } from "@/lib/daily";
import DailyChallenge from "@/components/DailyChallenge";

type Props = { params: Promise<{ date: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date } = await params;
  return {
    title: `Daily Challenge — ${date}`,
    description: `Free Question of the Day for SSC, Class 10, JEE & NEET aspirants on PadhoDost (${date}).`,
  };
}

export default async function DailyDatePage({ params }: Props) {
  const { date } = await params;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) notFound();

  const q = await getDailyQuestion(date);
  if (!q) notFound();

  const correctIndex = q.options.findIndex((o) => o.isCorrect);

  return (
    <DailyChallenge
      date={date}
      question={{
        text: q.text,
        explanation: q.explanation,
        options: q.options.map((o) => ({ id: o.id, text: o.text })),
        correctIndex,
        examShort: q.exam.shortName,
        chapter: q.chapter?.name ?? null,
      }}
    />
  );
}
