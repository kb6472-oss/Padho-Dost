import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { searchSite } from "@/lib/search";

type Props = { searchParams: Promise<{ q?: string }> };

export const metadata: Metadata = {
  title: "Search",
  description: "Search PadhoDost — exams, subjects, chapters, tests and visual explainers.",
  // The results page is per-query and thin for crawlers; keep it out of the index.
  robots: { index: false, follow: true },
};

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const groups = query.length >= 2 ? await searchSite(query) : [];
  const total = groups.reduce((n, g) => n + g.results.length, 0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-h1 font-extrabold tracking-tight text-foreground">Search</h1>

      {/* Plain GET form — works with no JS, which matters on a slow connection. */}
      <form action="/search" method="get" className="mt-5">
        <div className="flex items-center gap-2 rounded-full border border-border bg-surface-raised px-4 py-2.5 focus-within:border-brand-400">
          <Search className="h-5 w-5 shrink-0 text-muted" strokeWidth={2} aria-hidden="true" />
          <input
            type="search"
            name="q"
            defaultValue={query}
            autoFocus
            placeholder="Try “profit and loss”, “polity”, “percentages”…"
            aria-label="Search"
            className="w-full bg-transparent text-body text-foreground outline-none placeholder:text-muted"
          />
        </div>
      </form>

      {query.length >= 2 ? (
        total === 0 ? (
          <div className="mt-10 surface-1 p-8 text-center">
            <p className="text-body font-medium text-foreground">No matches for “{query}”.</p>
            <p className="mt-1 text-body text-muted">
              Try a shorter word, or{" "}
              <Link href="/exams" className="font-semibold text-brand-600 hover:text-brand-700">
                browse by exam
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-8">
            <p className="text-caption text-muted">
              {total} result{total === 1 ? "" : "s"} for “{query}”
            </p>
            {groups.map((g) => (
              <section key={g.kind}>
                <h2 className="text-caption font-semibold uppercase tracking-wide text-muted">{g.label}</h2>
                <ul className="mt-3 space-y-2">
                  {g.results.map((r) => (
                    <li key={r.href}>
                      <Link
                        href={r.href}
                        className="surface-2 block p-4 transition-colors hover:border-brand-300"
                      >
                        <div className="font-display text-body-lg font-semibold text-foreground">{r.title}</div>
                        {r.sub && <div className="mt-0.5 line-clamp-1 text-caption text-muted">{r.sub}</div>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )
      ) : (
        <p className="mt-8 text-body text-muted">
          Search across every exam, subject, chapter, test and explainer. Type at least two letters.
        </p>
      )}
    </div>
  );
}
