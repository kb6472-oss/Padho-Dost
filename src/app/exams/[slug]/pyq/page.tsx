import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, FileText } from "lucide-react";
import { getPyqTopicsForExam } from "@/lib/pyq";
import { ogImage } from "@/lib/og-meta";
import JsonLd from "@/components/JsonLd";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPyqTopicsForExam(slug);
  if (!data || data.topics.length === 0) return { title: "Previous year questions" };

  const span = data.years.length ? `${Math.min(...data.years)}–${Math.max(...data.years)}` : "";
  const title = `${data.exam.shortName} Previous Year Questions by Topic`;
  const description = `${data.total} ${data.exam.name} previous-year questions ${span ? `(${span}) ` : ""}sorted by topic — Polity, History, Geography, Economy and more — each with full solutions. Free.`;
  const og = ogImage(`${data.exam.shortName} PYQ by Topic`, `${data.total} solved questions`);
  return {
    title,
    description,
    alternates: { canonical: `/exams/${slug}/pyq` },
    openGraph: { title, description, url: `/exams/${slug}/pyq`, type: "website", images: [og] },
    twitter: { card: "summary_large_image", title, description, images: [og] },
  };
}

export default async function ExamPyqTopicsPage({ params }: Props) {
  const { slug } = await params;
  const data = await getPyqTopicsForExam(slug);
  if (!data || data.topics.length === 0) notFound();

  const { exam, topics, total, years } = data;
  const span = years.length ? `${Math.min(...years)}–${Math.max(...years)}` : "";

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Exams", item: "https://padhodost.com/exams" },
      { "@type": "ListItem", position: 2, name: exam.name, item: `https://padhodost.com/exams/${slug}` },
      { "@type": "ListItem", position: 3, name: "Previous Year Questions by Topic", item: `https://padhodost.com/exams/${slug}/pyq` },
    ],
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={breadcrumb} />

      <nav aria-label="Breadcrumb" className="text-caption text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li><Link href="/exams" className="hover:text-brand-600">Exams</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href={`/exams/${slug}`} className="hover:text-brand-600">{exam.shortName}</Link></li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-foreground">PYQ by topic</li>
        </ol>
      </nav>

      <header className="mt-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{exam.emoji ?? "📘"}</span>
          <span className="text-body font-semibold text-muted">{exam.name}</span>
        </div>
        <h1 className="mt-2 font-display text-h1 font-extrabold tracking-tight text-foreground">
          Previous year questions by topic
        </h1>
        <p className="mt-2 text-body text-muted">
          {total.toLocaleString("en-IN")} real {exam.shortName} previous-year questions{span ? ` (${span})` : ""},
          sorted by subject topic — with full solutions. Pick a topic to revise the ones that repeat.
        </p>
      </header>

      <ul className="mt-8 space-y-3">
        {topics.map((t) => (
          <li key={t.slug}>
            <Link
              href={`/exams/${slug}/pyq/${t.slug}`}
              className="surface-2 group flex items-center gap-4 p-4 transition-colors hover:border-brand-300"
            >
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-body-lg font-semibold text-foreground">{t.label}</h2>
                <p className="mt-0.5 text-caption text-muted">{t.blurb}</p>
                <div className="mt-1.5 inline-flex items-center gap-1.5 text-caption text-muted">
                  <FileText className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  {t.count} previous-year question{t.count > 1 ? "s" : ""}
                </div>
              </div>
              <ArrowRight
                className="h-5 w-5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600"
                strokeWidth={2}
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Link href={`/exams/${slug}`} className="text-body font-semibold text-brand-600 hover:text-brand-700">
          ← All {exam.shortName} content
        </Link>
      </div>
    </div>
  );
}
