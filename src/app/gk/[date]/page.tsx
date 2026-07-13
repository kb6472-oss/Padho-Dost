import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDailyGk } from "@/lib/daily";
import DailyChallenge from "@/components/DailyChallenge";

type Props = { params: Promise<{ date: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date } = await params;
  const description = `Free Daily GK / General Awareness question for SSC, Banking & Railway aspirants — ${date}. New question every day.`;
  return {
    title: `Daily GK — ${date}`,
    description,
    alternates: { canonical: `/gk/${date}` },
    openGraph: { title: `Daily GK — ${date}`, description, url: `/gk/${date}`, type: "article" },
  };
}

export default async function GkDatePage({ params }: Props) {
  const { date } = await params;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) notFound();

  const q = await getDailyGk(date);
  if (!q) notFound();

  return (
    <DailyChallenge
      date={date}
      track="gk"
      kicker="🧠 Daily GK"
      title="Daily GK Challenge"
      question={{
        text: q.text,
        options: q.options.map((o) => ({ id: o.id, text: o.text })),
        examShort: q.exam.shortName,
        chapter: q.chapter?.name ?? null,
      }}
    />
  );
}
