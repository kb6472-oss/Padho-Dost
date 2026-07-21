import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCurrentAffairs, getCaDigest } from "@/lib/current-affairs";
import { AdSlot } from "@/components/Ads";
import CaQuiz from "@/components/CaQuiz";

type Props = { params: Promise<{ date: string }> };

// Indexing is opt-in per deployment. The digest IS original content, but flip
// this on only after reviewing a few days of real output — see docs/REDESIGN-PLAN.md.
const INDEXABLE = process.env.CA_INDEXABLE === "true";

function pretty(date: string): string {
  return new Date(date + "T00:00:00Z").toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date } = await params;
  const digest = await getCaDigest(date);

  // Only a page carrying an original digest is ever a candidate for indexing.
  // The raw fallback below is an aggregated headline list — never indexable.
  const indexable = INDEXABLE && !!digest;

  const description = digest
    ? `Current affairs for ${date} in exam format for SSC, Banking, Railways & UPSC — key facts with static-GK links, plus a practice quiz.`
    : `Current affairs headline digest for ${date}.`;

  return {
    title: `Current Affairs — ${date}`,
    description,
    // Canonical only when indexable; null (no canonical) otherwise — a canonical on a
    // noindex page is a conflicting signal, and inheriting the homepage canonical is wrong.
    alternates: { canonical: indexable ? `/current-affairs/${date}` : null },
    robots: indexable ? undefined : { index: false, follow: false },
    openGraph: { title: `Current Affairs — ${date}`, description, url: `/current-affairs/${date}`, type: "article" },
  };
}

export default async function CurrentAffairsDatePage({ params }: Props) {
  const { date } = await params;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) notFound();

  const digest = await getCaDigest(date);

  // ── Published path: original exam-format digest ────────────────────────────
  if (digest) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">🗞️ Daily Current Affairs</p>
        <h1 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          Current Affairs for {pretty(date)}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted">{digest.intro}</p>
        <p className="mt-2 text-xs text-muted">
          {digest.facts.length} exam-relevant updates
          {digest.quiz.length > 0 ? ` · ${digest.quiz.length}-question quiz` : ""}
        </p>

        <div className="mt-8 space-y-5">
          {digest.facts.map((f, i) => (
            <article key={f.id} className="rounded-2xl border border-border bg-background p-5">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
                  {f.category}
                </span>
                <span className="text-xs text-muted">#{i + 1}</span>
              </div>

              <h2 className="mt-2.5 font-display text-base font-bold leading-snug text-foreground">{f.headline}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.detail}</p>

              {f.staticLink && (
                <p className="mt-3 rounded-xl bg-amber-50 p-3 text-sm leading-relaxed text-amber-900">
                  <span className="font-semibold">📌 Static GK link: </span>
                  {f.staticLink}
                </p>
              )}

              {f.sourceUrl && (
                <a
                  href={f.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="mt-3 inline-block text-xs font-medium text-muted hover:text-brand-600 hover:underline"
                >
                  Source: {f.sourceName ?? "original report"} ↗
                </a>
              )}
            </article>
          ))}
        </div>

        <AdSlot slot="current-affairs-mid" className="mt-8" />

        {digest.quiz.length > 0 && (
          <CaQuiz
            questions={digest.quiz.map((q) => ({
              id: q.id,
              text: q.text,
              options: q.options,
              correctIndex: q.correctIndex,
              explanation: q.explanation,
            }))}
          />
        )}

        <div className="mt-10 rounded-2xl border border-brand-200 bg-brand-50 p-6 text-center">
          <p className="font-display text-base font-semibold text-brand-900">Keep the streak going 🔥</p>
          <p className="mt-1 text-sm text-brand-700">
            Current affairs stick when you revise them daily. Try today&apos;s GK question too.
          </p>
          <Link
            href={`/gk/${date}`}
            className="mt-4 inline-block rounded-full bg-brand-600 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Today&apos;s GK question →
          </Link>
        </div>

        <p className="mt-8 text-xs leading-relaxed text-muted">
          Written by PadhoDost in exam format from the day&apos;s reported news. Facts are summarised for
          exam preparation, not reproduced from the original articles — follow the source links for full reports.
        </p>
      </div>
    );
  }

  // ── Fallback: raw headline list. Never indexed, never monetised. ───────────
  const items = await getCurrentAffairs(date);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">🗞️ Daily Current Affairs</p>
      <h1 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
        Current Affairs
      </h1>
      <p className="mt-1 text-sm text-muted">{pretty(date)}</p>

      {items.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-border bg-surface p-8 text-center">
          <div className="text-3xl">🗞️</div>
          <p className="mt-2 text-sm font-medium text-foreground">No digest for this date yet</p>
          <p className="mt-1 text-sm text-muted">Fresh current affairs are published every morning — check back soon!</p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          <p className="rounded-xl bg-surface p-3 text-sm text-muted">
            Today&apos;s exam-format digest isn&apos;t ready yet. In the meantime, here are the headlines it
            will be written from.
          </p>
          {items.map((it) => (
            <article key={it.id} className="rounded-2xl border border-border bg-background p-5">
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                {it.source && <span className="font-semibold text-foreground">{it.source}</span>}
                {it.category && <span className="rounded-full bg-surface px-2 py-0.5 capitalize">{it.category}</span>}
              </div>
              <h2 className="mt-1.5 font-display text-base font-semibold text-foreground">{it.title}</h2>
              {/* Publisher descriptions are deliberately not rendered — headline + attributed link only. */}
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
            reproduce their articles.
          </p>
        </div>
      )}
    </div>
  );
}
