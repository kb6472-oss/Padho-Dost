import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, FileText, ListChecks } from "lucide-react";
import { getSubjectHub } from "@/lib/hubs";
import JsonLd from "@/components/JsonLd";
import Badge from "@/components/ui/Badge";

type Props = { params: Promise<{ slug: string; subject: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, subject } = await params;
  const hub = await getSubjectHub(slug, subject);
  if (!hub) return { title: "Subject not found" };

  const title = `${hub.subject.name} — ${hub.exam.shortName}`;
  const description = `Free ${hub.subject.name} practice for ${hub.exam.name}: ${hub.totals.chapters} chapters, ${hub.totals.questions.toLocaleString("en-IN")} questions with full solutions${hub.totals.explainers ? ` and ${hub.totals.explainers} visual explainers` : ""}. No paywall.`;

  return {
    title,
    description,
    alternates: { canonical: `/exams/${slug}/${subject}` },
    openGraph: { title: `${hub.subject.name} — ${hub.exam.name}`, description, url: `/exams/${slug}/${subject}`, type: "website" },
  };
}

export default async function SubjectHubPage({ params }: Props) {
  const { slug, subject } = await params;
  const hub = await getSubjectHub(slug, subject);
  if (!hub || hub.chapters.length === 0) notFound();

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Exams", item: "https://padhodost.com/exams" },
      { "@type": "ListItem", position: 2, name: hub.exam.name, item: `https://padhodost.com/exams/${slug}` },
      { "@type": "ListItem", position: 3, name: hub.subject.name, item: `https://padhodost.com/exams/${slug}/${subject}` },
    ],
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={breadcrumb} />

      <nav aria-label="Breadcrumb" className="text-caption text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li><Link href="/exams" className="hover:text-brand-600">Exams</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href={`/exams/${slug}`} className="hover:text-brand-600">{hub.exam.shortName}</Link></li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-foreground">{hub.subject.name}</li>
        </ol>
      </nav>

      <header className="mt-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{hub.exam.emoji ?? "📘"}</span>
          <span className="text-body font-semibold text-muted">{hub.exam.name}</span>
        </div>
        <h1 className="mt-2 font-display text-h1 font-extrabold tracking-tight text-foreground">
          {hub.subject.name}
        </h1>
        <p className="mt-2 text-body text-muted">
          {hub.totals.chapters} chapters · {hub.totals.questions.toLocaleString("en-IN")} practice questions
          with full solutions{hub.totals.explainers ? ` · ${hub.totals.explainers} visual explainers` : ""} — all
          free.
        </p>
      </header>

      <ul className="mt-8 space-y-3">
        {hub.chapters.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/exams/${slug}/${subject}/${c.slug}`}
              className="surface-2 group flex items-center gap-4 p-4 transition-colors hover:border-brand-300"
            >
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-body-lg font-semibold text-foreground">{c.name}</h2>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-caption text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <FileText className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                    {c.questions} questions
                  </span>
                  {c.test && (
                    <span className="inline-flex items-center gap-1.5">
                      <ListChecks className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                      Practice test
                    </span>
                  )}
                  {c.explainer && (
                    <span className="inline-flex items-center gap-1.5 text-brand-600">
                      <BookOpen className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                      Explainer
                    </span>
                  )}
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

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link href={`/exams/${slug}`} className="text-body font-semibold text-brand-600 hover:text-brand-700">
          ← All {hub.exam.shortName} tests
        </Link>
      </div>

      {/* A subject with no explainers yet still gets a nudge toward practice. */}
      {hub.totals.explainers === 0 && (
        <div className="mt-6">
          <Badge tone="neutral">Visual explainers for this subject are on the way</Badge>
        </div>
      )}
    </div>
  );
}
