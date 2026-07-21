import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getExplainer, type Block } from "@/content/explainers";
import { ogImage } from "@/lib/og-meta";
import ExplainerReader from "@/components/ExplainerReader";
import JsonLd from "@/components/JsonLd";
import { AdSlot } from "@/components/Ads";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getExplainer(slug);
  if (!c) return { title: "Explainer not found" };
  const og = ogImage(c.title, "Free visual explainer");
  return {
    title: c.title,
    description: c.summary,
    alternates: { canonical: `/study/${slug}` },
    openGraph: { title: c.title, description: c.summary, url: `/study/${slug}`, type: "article", images: [og] },
    twitter: { card: "summary_large_image", title: c.title, description: c.summary, images: [og] },
  };
}

export default async function ExplainerPage({ params }: Props) {
  const { slug } = await params;
  const content = getExplainer(slug);
  if (!content) notFound();

  let testId: string | null = null;
  if (content.practiceTestSlug) {
    const t = await prisma.mockTest.findFirst({
      where: { slug: content.practiceTestSlug, exam: { slug: content.examSlug } },
      select: { id: true },
    });
    testId = t?.id ?? null;
  }

  // Real byline data — an attributed, dated page is more trustworthy (and better
  // for SEO) than an anonymous undated one. The row exists because the sitemap
  // lists published explainers.
  const row = await prisma.explainer.findUnique({ where: { slug }, select: { updatedAt: true } });
  const updated = row?.updatedAt ?? null;
  const updatedLabel = updated
    ? updated.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : null;

  const quizzes = content.blocks.filter((b): b is Extract<Block, { type: "quiz" }> => b.type === "quiz");
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LearningResource",
        name: content.title,
        description: content.summary,
        learningResourceType: "Concept explainer",
        timeRequired: `PT${content.readingMinutes}M`,
        isAccessibleForFree: true,
        author: { "@type": "Organization", name: "PadhoDost Team", url: "https://padhodost.com" },
        provider: { "@type": "Organization", name: "PadhoDost", url: "https://padhodost.com" },
        ...(updated ? { dateModified: updated.toISOString() } : {}),
        url: `https://padhodost.com/study/${slug}`,
      },
      ...(quizzes.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: quizzes.map((q) => ({
                "@type": "Question",
                name: q.question,
                acceptedAnswer: { "@type": "Answer", text: q.explain },
              })),
            },
          ]
        : []),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://padhodost.com" },
          { "@type": "ListItem", position: 2, name: "Study", item: "https://padhodost.com/study" },
          { "@type": "ListItem", position: 3, name: content.title, item: `https://padhodost.com/study/${slug}` },
        ],
      },
    ],
  };

  return (
    <article className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <JsonLd data={jsonLd} />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li><Link href="/" className="hover:text-brand-600">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/study" className="hover:text-brand-600">Study</Link></li>
        </ol>
      </nav>

      <h1 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
        {content.title}
      </h1>
      <p className="mt-2 text-sm text-muted">{content.summary}</p>
      <p className="mt-2 text-xs text-muted">
        By the PadhoDost Team · 📖 {content.readingMinutes} min read
        {updatedLabel ? ` · Updated ${updatedLabel}` : ""}
      </p>

      <div className="mt-7">
        <ExplainerReader slug={slug} blocks={content.blocks} />
      </div>

      {/* After the read, before the test CTA — the natural pause in the page. */}
      <AdSlot slot="explainer-end" className="mt-10" />

      {testId && (
        <div className="mt-10 rounded-2xl border border-brand-200 bg-brand-50 p-6 text-center">
          <p className="font-display text-base font-semibold text-brand-900">Ready to test yourself? 🎯</p>
          <p className="mt-1 text-sm text-brand-700">Lock it in with the practice test for this chapter.</p>
          <Link
            href={`/test/${testId}`}
            className="mt-4 inline-block rounded-full bg-brand-600 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Take the practice test →
          </Link>
        </div>
      )}
    </article>
  );
}
