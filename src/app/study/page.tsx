import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Study — Visual Explainers",
  description: "Learn every concept with simple analogies, worked examples and quick checks — then test yourself. 100% free.",
  alternates: { canonical: "/study" },
};

export default async function StudyPage() {
  const items = await prisma.explainer.findMany({
    where: { status: "PUBLISHED" },
    include: { exam: { select: { shortName: true, emoji: true } } },
    orderBy: [{ examId: "asc" }, { title: "asc" }],
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground">Visual explainers</h1>
        <p className="mt-2 text-sm text-muted">
          Understand the concept first — with analogies, worked examples and quick checks — then take the matching test.
        </p>
      </div>

      {items.length === 0 ? (
        <p className="mt-8 text-sm text-muted">Explainers are being added — check back soon!</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((e) => (
            <Link
              key={e.id}
              href={`/study/${e.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-border bg-background p-5 transition-colors hover:border-brand-300"
            >
              <span className="text-xs font-semibold text-muted">
                {e.exam?.emoji} {e.exam?.shortName}
              </span>
              <h3 className="mt-2 font-display text-base font-semibold text-foreground">{e.title}</h3>
              <p className="mt-1 flex-1 text-sm text-muted">{e.summary}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:gap-2">
                Read · {e.readingMinutes} min →
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
