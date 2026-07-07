import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getExplainer } from "@/content/explainers";
import ExplainerReader from "@/components/ExplainerReader";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getExplainer(slug);
  if (!c) return { title: "Explainer not found" };
  return { title: c.title, description: c.summary };
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

  return (
    <article className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <Link href="/study" className="text-sm font-medium text-muted hover:text-brand-600">
        ← All explainers
      </Link>

      <h1 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
        {content.title}
      </h1>
      <p className="mt-2 text-sm text-muted">{content.summary}</p>
      <p className="mt-1 text-xs text-muted">📖 {content.readingMinutes} min read</p>

      <div className="mt-7">
        <ExplainerReader slug={slug} blocks={content.blocks} />
      </div>

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
