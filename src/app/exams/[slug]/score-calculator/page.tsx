import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getExamInfo, examInfoSlugs } from "@/lib/exam-info";
import { exams } from "@/lib/exams";
import { ogImage } from "@/lib/og-meta";
import JsonLd from "@/components/JsonLd";
import { ExamGuideNav } from "@/components/exam-info/ExamInfoPage";
import ScoreCalculator from "@/components/exam-info/ScoreCalculator";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () =>
  examInfoSlugs().filter((s) => getExamInfo(s)?.calculator).map((slug) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const info = getExamInfo(slug);
  if (!info?.calculator) return { title: "Not found" };
  const title = `${info.examName} Score Calculator (${info.calculator.stage})`;
  const description = `Calculate your ${info.examName} ${info.calculator.stage} score with the official negative marking, and compare it with last year's official cut-off. Free, instant, no sign-up.`;
  const og = ogImage(`${info.examName} Score Calculator`, "Free · official marking scheme");
  return {
    title,
    description,
    alternates: { canonical: `/exams/${slug}/score-calculator` },
    openGraph: { title, description, url: `/exams/${slug}/score-calculator`, images: [og] },
    twitter: { card: "summary_large_image", title, description, images: [og] },
  };
}

export default async function ScoreCalculatorPage({ params }: Props) {
  const { slug } = await params;
  const info = getExamInfo(slug);
  if (!info?.calculator) notFound();
  const calc = info.calculator;
  const short = exams.find((e) => e.slug === slug)?.short ?? info.examName;

  // Latest official cut-off for the same stage as the calculator, if published.
  const stageWord = calc.stage.toLowerCase().split(/[\s(]/)[0];
  const cutoff =
    [...info.cutoffs]
      .filter((c) => c.stage.toLowerCase().includes(stageWord) && c.rows.length)
      .sort((a, b) => b.year.localeCompare(a.year))[0] ?? null;

  const markingLine = calc.sections.every(
    (s) => s.correctMarks === calc.sections[0].correctMarks && s.wrongMarks === calc.sections[0].wrongMarks,
  )
    ? `+${calc.sections[0].correctMarks} for each right answer, ${calc.sections[0].wrongMarks} for each wrong one, 0 for skipped`
    : "section-wise marks as shown in the table";

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: `${info.examName} Score Calculator`,
          applicationCategory: "EducationalApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
          url: `https://padhodost.com/exams/${slug}/score-calculator`,
        }}
      />
      <nav aria-label="Breadcrumb" className="text-caption text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li><Link href="/exams" className="hover:text-brand-600">Exams</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href={`/exams/${slug}`} className="hover:text-brand-600">{short}</Link></li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-foreground">Score calculator</li>
        </ol>
      </nav>
      <h1 className="mt-4 font-display text-h1 font-extrabold tracking-tight text-foreground">
        {info.examName} Score Calculator
      </h1>
      <p className="mt-2 text-body text-muted">
        {calc.stage}: enter how many questions you got right and wrong in each section (from the official answer key or
        your own count). Marking: {markingLine}.
      </p>

      <ExamGuideNav slug={slug} active="calculator" hasCalculator />

      <ScoreCalculator calc={calc} cutoff={cutoff} />

      <div className="mt-10 surface-3 border-brand-200 bg-brand-50 p-5">
        <p className="font-display text-body-lg font-bold text-brand-900">Want a higher score next time?</p>
        <p className="mt-1 text-body text-brand-800">Practise the exact pattern with free mock tests and previous-year papers — with full solutions.</p>
        <Link href={`/exams/${slug}`} className="mt-3 inline-block rounded-full bg-brand-600 px-5 py-2.5 text-body font-semibold text-white hover:bg-brand-700">
          Free {short} mock tests →
        </Link>
      </div>
    </div>
  );
}
