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
    alternates: { canonical: `/daily/${date}` },
    openGraph: {
      title: `Daily Challenge — ${date}`,
      description: "Free Question of the Day for SSC, Class 10, JEE & NEET aspirants.",
      url: `/daily/${date}`,
      type: "article",
    },
  };
}

export default async function DailyDatePage({ params }: Props) {
  const { date } = await params;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) notFound();

  const q = await getDailyQuestion(date);
  if (!q) notFound();

  // Note: correct answer + explanation are NOT sent to the client — grading happens
  // server-side via submitDaily() only after the student picks.
  return (
    <DailyChallenge
      date={date}
      question={{
        text: q.text,
        options: q.options.map((o) => ({ id: o.id, text: o.text })),
        examShort: q.exam.shortName,
        chapter: q.chapter?.name ?? null,
      }}
    />
  );
}
