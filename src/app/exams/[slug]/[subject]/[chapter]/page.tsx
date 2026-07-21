import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, Target } from "lucide-react";
import { getChapterHub } from "@/lib/hubs";
import { ogImage } from "@/lib/og-meta";
import JsonLd from "@/components/JsonLd";
import { ButtonLink } from "@/components/ui/Button";

type Props = { params: Promise<{ slug: string; subject: string; chapter: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, subject, chapter } = await params;
  const hub = await getChapterHub(slug, subject, chapter);
  if (!hub) return { title: "Chapter not found" };

  const title = `${hub.chapter.name} — ${hub.exam.shortName} Practice`;
  const description = `Free ${hub.chapter.name} practice for ${hub.exam.name} ${hub.subject.name}: ${hub.questions} questions with step-by-step solutions${hub.explainers.length ? " and a visual explainer" : ""}. No sign-up, no paywall.`;

  const og = ogImage(hub.chapter.name, `${hub.exam.shortName} · ${hub.subject.name}`);
  return {
    title,
    description,
    alternates: { canonical: `/exams/${slug}/${subject}/${chapter}` },
    openGraph: { title: `${hub.chapter.name} — ${hub.exam.name}`, description, url: `/exams/${slug}/${subject}/${chapter}`, type: "website", images: [og] },
    twitter: { card: "summary_large_image", title: `${hub.chapter.name} — ${hub.exam.name}`, description, images: [og] },
  };
}

export default async function ChapterHubPage({ params }: Props) {
  const { slug, subject, chapter } = await params;
  const hub = await getChapterHub(slug, subject, chapter);
  if (!hub) notFound();

  const base = `/exams/${slug}/${subject}`;
  const explainer = hub.explainers[0] ?? null;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Exams", item: "https://padhodost.com/exams" },
      { "@type": "ListItem", position: 2, name: hub.exam.name, item: `https://padhodost.com/exams/${slug}` },
      { "@type": "ListItem", position: 3, name: hub.subject.name, item: `https://padhodost.com${base}` },
      { "@type": "ListItem", position: 4, name: hub.chapter.name, item: `https://padhodost.com${base}/${chapter}` },
    ],
  };

  const diffRows = (["EASY", "MEDIUM", "HARD"] as const)
    .map((k) => ({ k, n: hub.difficulty[k] ?? 0 }))
    .filter((r) => r.n > 0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={breadcrumb} />

      <nav aria-label="Breadcrumb" className="text-caption text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li><Link href="/exams" className="hover:text-brand-600">Exams</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href={`/exams/${slug}`} className="hover:text-brand-600">{hub.exam.shortName}</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href={base} className="hover:text-brand-600">{hub.subject.name}</Link></li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-foreground">{hub.chapter.name}</li>
        </ol>
      </nav>

      <header className="mt-4">
        <p className="text-body font-semibold text-muted">
          {hub.exam.name} · {hub.subject.name}
        </p>
        <h1 className="mt-1.5 font-display text-h1 font-extrabold tracking-tight text-foreground">
          {hub.chapter.name}
        </h1>
        <p className="mt-2 text-body text-muted">
          {hub.questions} practice questions with full step-by-step solutions
          {explainer ? ", plus a concept-first explainer" : ""} — free, no sign-up.
        </p>
      </header>

      {/* Primary actions: read then practise. */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {explainer && (
          <ButtonLink href={`/study/${explainer.slug}`} variant="secondary" size="lg" className="sm:flex-1">
            <BookOpen className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden="true" />
            Read the explainer · {explainer.readingMinutes} min
          </ButtonLink>
        )}
        {hub.test && (
          <ButtonLink href={`/test/${hub.test.id}`} size="lg" className="sm:flex-1">
            <Target className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden="true" />
            Practise · {hub.test.questions} questions
          </ButtonLink>
        )}
      </div>

      {/* Explainer summary — real content, and a reason for the page to exist. */}
      {explainer?.summary && (
        <section className="mt-8">
          <h2 className="font-display text-h3 font-bold text-foreground">What you&apos;ll learn</h2>
          <p className="mt-2 text-body leading-relaxed text-muted">{explainer.summary}</p>
          <Link
            href={`/study/${explainer.slug}`}
            className="mt-3 inline-flex items-center gap-1 text-body font-semibold text-brand-600 hover:text-brand-700"
          >
            Read {explainer.title}
            <ArrowRight className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
          </Link>
        </section>
      )}

      {/* Difficulty mix — substance, and honest about what's inside. */}
      {diffRows.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-h3 font-bold text-foreground">This chapter has</h2>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {diffRows.map(({ k, n }) => (
              <div key={k} className="surface-1 py-3 text-center">
                <div className="font-display text-h3 font-bold text-foreground">{n}</div>
                <div className="text-caption capitalize text-muted">{k.toLowerCase()}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Prev / next within the subject — keeps a student moving through it. */}
      {(hub.prev || hub.next) && (
        <nav className="mt-10 flex items-stretch justify-between gap-3 border-t border-border pt-6">
          {hub.prev ? (
            <Link href={`${base}/${hub.prev.slug}`} className="surface-2 flex-1 p-3.5 transition-colors hover:border-brand-300">
              <div className="text-caption text-muted">← Previous</div>
              <div className="mt-0.5 text-body font-semibold text-foreground">{hub.prev.name}</div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {hub.next ? (
            <Link href={`${base}/${hub.next.slug}`} className="surface-2 flex-1 p-3.5 text-right transition-colors hover:border-brand-300">
              <div className="text-caption text-muted">Next →</div>
              <div className="mt-0.5 text-body font-semibold text-foreground">{hub.next.name}</div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </nav>
      )}

      <div className="mt-8">
        <Link href={base} className="text-body font-semibold text-brand-600 hover:text-brand-700">
          ← All {hub.subject.name} chapters
        </Link>
      </div>
    </div>
  );
}
