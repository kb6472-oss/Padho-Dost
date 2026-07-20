import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCurrentAffairs } from "@/lib/current-affairs";

type Props = { params: Promise<{ date: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date } = await params;
  const description = `Current affairs headline digest for ${date} — links to original reporting for SSC, Banking & Railway aspirants.`;
  return {
    title: `Current Affairs — ${date}`,
    description,
    alternates: { canonical: `/current-affairs/${date}` },
    // NOINDEX — deliberate. This page is an aggregated headline digest built from
    // third-party news APIs; it is not original PadhoDost content. Publishing it to
    // search would be scaled content abuse, and that penalty applies SITE-WIDE.
    // Remove this only once the editorial pipeline produces original exam-format
    // current affairs (see docs/REDESIGN-PLAN.md).
    robots: { index: false, follow: false },
    openGraph: { title: `Current Affairs — ${date}`, description, url: `/current-affairs/${date}`, type: "article" },
  };
}

export default async function CurrentAffairsDatePage({ params }: Props) {
  const { date } = await params;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) notFound();

  const items = await getCurrentAffairs(date);
  const pretty = new Date(date + "T00:00:00Z").toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">🗞️ Daily Current Affairs</p>
        <h1 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          Current Affairs
        </h1>
        <p className="mt-1 text-sm text-muted">{pretty}</p>
      </div>

      {items.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-border bg-surface p-8 text-center">
          <div className="text-3xl">🗞️</div>
          <p className="mt-2 text-sm font-medium text-foreground">No digest for this date yet</p>
          <p className="mt-1 text-sm text-muted">Fresh current affairs are published every morning — check back soon!</p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {items.map((it) => (
            <article key={it.id} className="rounded-2xl border border-border bg-background p-5">
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                {it.source && <span className="font-semibold text-foreground">{it.source}</span>}
                {it.category && (
                  <span className="rounded-full bg-surface px-2 py-0.5 capitalize">{it.category}</span>
                )}
              </div>
              <h2 className="mt-1.5 font-display text-base font-semibold text-foreground">{it.title}</h2>
              {/* The publisher's own description is deliberately NOT rendered.
                  Reproducing it verbatim is republishing someone else's copy —
                  the headline plus an attributed link is a citation instead. */}
              <a
                href={it.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="mt-2 inline-block text-sm font-medium text-brand-600 hover:underline"
              >
                Read at source →
              </a>
            </article>
          ))}
          <p className="pt-2 text-xs text-muted">
            Headlines link to the original publishers — PadhoDost is not the publisher and does not
            reproduce their articles. This digest is a reading list, not exam study material.
          </p>
        </div>
      )}
    </div>
  );
}
