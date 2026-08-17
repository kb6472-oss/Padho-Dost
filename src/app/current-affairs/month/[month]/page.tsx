import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaMonth, getDigestMonths } from "@/lib/current-affairs";
import { AdSlot } from "@/components/Ads";

type Props = { params: Promise<{ month: string }> };

// Same opt-in gate as the daily digest — index only once the content is reviewed.
const INDEXABLE = process.env.CA_INDEXABLE === "true";

function prettyMonth(month: string): string {
  return new Date(`${month}-01T00:00:00Z`).toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}
function prettyDay(d: Date): string {
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { month } = await params;
  if (!/^\d{4}-\d{2}$/.test(month)) return { title: "Current Affairs" };
  const label = prettyMonth(month);
  const description = `${label} current affairs for SSC, Banking, Railways & UPSC — the whole month's exam-relevant updates compiled in one place, in exam format.`;
  return {
    title: `${label} Current Affairs — Monthly Compilation`,
    description,
    alternates: { canonical: INDEXABLE ? `/current-affairs/month/${month}` : null },
    robots: INDEXABLE ? undefined : { index: false, follow: false },
    openGraph: { title: `${label} Current Affairs`, description, url: `/current-affairs/month/${month}`, type: "article" },
  };
}

export default async function MonthlyCurrentAffairsPage({ params }: Props) {
  const { month } = await params;
  if (!/^\d{4}-\d{2}$/.test(month)) notFound();

  const digests = await getCaMonth(month);
  if (!digests || digests.length === 0) notFound();

  const totalFacts = digests.reduce((n, d) => n + d.facts.length, 0);

  // Prev/next month, restricted to months that actually have content.
  const months = await getDigestMonths(); // newest-first
  const idx = months.indexOf(month);
  const newer = idx > 0 ? months[idx - 1] : null;
  const older = idx >= 0 && idx < months.length - 1 ? months[idx + 1] : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <nav aria-label="Breadcrumb" className="text-caption text-muted">
        <Link href={`/current-affairs/${digests[digests.length - 1].day.toISOString().slice(0, 10)}`} className="hover:text-brand-600">
          Daily Current Affairs
        </Link>{" "}
        / <span className="text-foreground">{prettyMonth(month)}</span>
      </nav>

      <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-brand-600">🗞️ Monthly Compilation</p>
      <h1 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
        {prettyMonth(month)} Current Affairs
      </h1>
      <p className="mt-2 text-sm text-muted">
        Every exam-relevant update from {prettyMonth(month)} in one place — {totalFacts} fact
        {totalFacts === 1 ? "" : "s"} across {digests.length} day{digests.length === 1 ? "" : "s"}. Perfect for
        last-mile revision before SSC, Banking, Railways & UPSC.
      </p>

      <div className="mt-8 space-y-8">
        {digests.map((d) => {
          const dayKey = d.day.toISOString().slice(0, 10);
          return (
            <section key={dayKey}>
              <div className="flex items-baseline justify-between gap-3 border-b border-border pb-1.5">
                <h2 className="font-display text-h3 font-bold text-foreground">{prettyDay(d.day)}</h2>
                <Link href={`/current-affairs/${dayKey}`} className="shrink-0 text-caption font-semibold text-brand-600 hover:text-brand-700">
                  quiz + full day →
                </Link>
              </div>
              <div className="mt-3 space-y-3">
                {d.facts.map((f) => (
                  <article key={f.id} className="rounded-2xl border border-border bg-background p-4">
                    <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">{f.category}</span>
                    <h3 className="mt-2 font-display text-base font-bold leading-snug text-foreground">{f.headline}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.detail}</p>
                    {f.staticLink && (
                      <p className="mt-2 rounded-xl bg-amber-50 p-2.5 text-sm leading-relaxed text-amber-900">
                        <span className="font-semibold">📌 Static GK: </span>
                        {f.staticLink}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <AdSlot slot="ca-monthly-mid" className="mt-10" />

      <nav className="mt-10 flex items-center justify-between gap-3 border-t border-border pt-6 text-sm">
        {older ? (
          <Link href={`/current-affairs/month/${older}`} className="font-semibold text-brand-600 hover:text-brand-700">
            ← {prettyMonth(older)}
          </Link>
        ) : (
          <span />
        )}
        {newer ? (
          <Link href={`/current-affairs/month/${newer}`} className="font-semibold text-brand-600 hover:text-brand-700">
            {prettyMonth(newer)} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
