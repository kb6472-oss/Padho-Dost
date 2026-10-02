import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getExamInfo, INFO_KINDS, type ExamInfo, type InfoKind } from "@/lib/exam-info";
import { exams } from "@/lib/exams";
import { ogImage } from "@/lib/og-meta";
import JsonLd from "@/components/JsonLd";

// Shared renderer for the six exam-information pages (/exams/[slug]/syllabus etc.).
// Each route file is just `infoMetadata(kind)` + `infoPage(kind)`.

type Props = { params: Promise<{ slug: string }> };

const kindMeta = (kind: InfoKind) => INFO_KINDS.find((k) => k.kind === kind)!;
const fmtChecked = (d: string) =>
  new Date(`${d}T00:00:00+05:30`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

export function infoMetadata(kind: InfoKind) {
  return async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const info = getExamInfo(slug);
    if (!info) return { title: "Not found" };
    const k = kindMeta(kind);
    const title = `${info.examName} ${k.title}`;
    const description = `${info.examName} ${k.label.toLowerCase()} from the official ${info.conductingBody} notification — checked ${fmtChecked(info.lastChecked)}. Plus free ${info.examName.split(" ")[0]} mock tests with solutions.`;
    const og = ogImage(`${info.examName} ${k.label}`, "Official details · PadhoDost");
    return {
      title,
      description,
      alternates: { canonical: `/exams/${slug}/${kind}` },
      openGraph: { title, description, url: `/exams/${slug}/${kind}`, type: "article", images: [og] },
      twitter: { card: "summary_large_image", title, description, images: [og] },
    };
  };
}

function Table({ head, rows }: { head: string[]; rows: (string | number | null)[][] }) {
  return (
    <div className="mt-3 overflow-x-auto rounded-2xl border border-border">
      <table className="w-full min-w-[480px] text-left text-body">
        <thead className="bg-surface text-caption text-muted">
          <tr>{head.map((h) => <th key={h} className="px-4 py-2.5 font-semibold">{h}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((r, i) => (
            <tr key={i} className="bg-background">
              {r.map((c, j) => <td key={j} className="px-4 py-2.5 align-top">{c ?? "—"}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const STATUS = {
  done: "bg-surface text-muted",
  upcoming: "bg-brand-50 text-brand-700",
  tentative: "bg-amber-50 text-amber-700",
} as const;

function Body({ kind, info }: { kind: InfoKind; info: ExamInfo }) {
  const H2 = ({ children }: { children: React.ReactNode }) => (
    <h2 className="mt-8 font-display text-h3 font-bold text-foreground">{children}</h2>
  );
  switch (kind) {
    case "important-dates":
      return (
        <>
          <p className="mt-4 text-body leading-relaxed text-muted">{info.overview}</p>
          <H2>Important dates ({info.cycle})</H2>
          <div className="mt-3 overflow-hidden rounded-2xl border border-border">
            <ul className="divide-y divide-border">
              {info.dates.map((d) => (
                <li key={d.event} className="flex flex-wrap items-center gap-x-3 gap-y-1 bg-background px-4 py-3 text-body">
                  <span className="min-w-0 flex-1 text-foreground">{d.event}</span>
                  <span className="font-semibold text-foreground">{d.date}</span>
                  <span className={`rounded-full px-2 py-0.5 text-caption font-semibold ${STATUS[d.status]}`}>{d.status}</span>
                </li>
              ))}
            </ul>
          </div>
          <H2>Vacancies</H2>
          <div className="mt-3 surface-1 p-5">
            {info.vacancies.total != null && (
              <div className="font-display text-h2 font-extrabold text-foreground">{info.vacancies.total.toLocaleString("en-IN")}</div>
            )}
            <p className="mt-1 text-body text-muted">{info.vacancies.note}</p>
          </div>
          {(info.notificationUrl || info.officialWebsite) && (
            <div className="mt-4 flex flex-wrap gap-3">
              {info.notificationUrl && (
                <a href={info.notificationUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-brand-600 px-5 py-2.5 text-body font-semibold text-white hover:bg-brand-700">
                  Official notification ↗
                </a>
              )}
              <a href={info.officialWebsite} target="_blank" rel="noopener noreferrer" className="rounded-full border border-border px-5 py-2.5 text-body font-semibold text-foreground hover:border-brand-300">
                {info.conductingBody} website ↗
              </a>
            </div>
          )}
        </>
      );
    case "syllabus":
      return (
        <>
          {info.syllabus.map((st) => (
            <section key={st.stage}>
              <H2>{st.stage}</H2>
              <div className="mt-3 space-y-3">
                {st.sections.map((s) => (
                  <div key={s.name} className="surface-1 p-5">
                    <h3 className="font-display text-body-lg font-semibold text-foreground">{s.name}</h3>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {s.topics.map((t) => (
                        <li key={t} className="rounded-full bg-surface px-3 py-1 text-caption text-foreground">{t}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </>
      );
    case "exam-pattern":
      return (
        <>
          {info.pattern.map((p) => (
            <section key={p.stage}>
              <H2>{p.stage}</H2>
              <p className="mt-1 text-caption text-muted">{[p.mode, p.duration].filter(Boolean).join(" · ")}</p>
              <Table
                head={["Section", "Questions", "Marks"]}
                rows={[
                  ...p.sections.map((s) => [s.name, s.questions, s.marks]),
                  ...(p.totalQuestions != null || p.totalMarks != null ? [["Total", p.totalQuestions, p.totalMarks]] : []),
                ]}
              />
              {p.marking && <p className="mt-3 text-body text-foreground"><span className="font-semibold">Marking: </span>{p.marking}</p>}
              {p.notes.length > 0 && (
                <ul className="mt-2 list-disc space-y-1 pl-5 text-body text-muted">{p.notes.map((n) => <li key={n}>{n}</li>)}</ul>
              )}
            </section>
          ))}
        </>
      );
    case "eligibility":
      return (
        <>
          <H2>Age limit</H2>
          <p className="mt-2 text-body text-foreground">{info.eligibility.age.summary}</p>
          {info.eligibility.age.relaxations.length > 0 && (
            <Table head={["Category", "Age relaxation"]} rows={info.eligibility.age.relaxations.map((r) => [r.category, r.relaxation])} />
          )}
          <H2>Educational qualification</H2>
          <Table head={["Posts", "Requirement"]} rows={info.eligibility.education.map((e) => [e.posts, e.requirement])} />
          <H2>Nationality & other conditions</H2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-body text-muted">
            <li>{info.eligibility.nationality}</li>
            {info.eligibility.other.map((o) => <li key={o}>{o}</li>)}
          </ul>
        </>
      );
    case "cut-off":
      return info.cutoffs.length === 0 ? (
        <div className="mt-6 surface-1 p-6 text-body text-muted">
          {info.conductingBody} has not officially published category-wise cut-off marks that we could verify. We only show
          official figures — check back after the next result.
        </div>
      ) : (
        <>
          {info.cutoffs.map((c) => (
            <section key={`${c.year}-${c.stage}`}>
              <H2>{c.year} · {c.stage}</H2>
              <Table head={["Category", "Cut-off marks"]} rows={c.rows.map((r) => [r.category, r.marks])} />
              {c.note && <p className="mt-2 text-caption text-muted">{c.note}</p>}
            </section>
          ))}
        </>
      );
    case "salary":
      return (
        <>
          <Table head={["Posts", "Pay level", "Pay"]} rows={info.salary.map((s) => [s.posts, s.payLevel, s.pay])} />
          {info.salaryNote && <p className="mt-3 text-body text-muted">{info.salaryNote}</p>}
        </>
      );
  }
}

export function infoPage(kind: InfoKind) {
  return async function ExamInfoRoute({ params }: Props) {
    const { slug } = await params;
    const info = getExamInfo(slug);
    if (!info) notFound();
    const k = kindMeta(kind);
    const short = exams.find((e) => e.slug === slug)?.short ?? info.examName;
    const url = `https://padhodost.com/exams/${slug}/${kind}`;
    const ld: Record<string, unknown>[] = [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Exams", item: "https://padhodost.com/exams" },
          { "@type": "ListItem", position: 2, name: short, item: `https://padhodost.com/exams/${slug}` },
          { "@type": "ListItem", position: 3, name: k.label, item: url },
        ],
      },
    ];
    if (kind === "important-dates" && info.faqs.length) {
      ld.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: info.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      });
    }

    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        {ld.map((d, i) => <JsonLd key={i} data={d} />)}
        <nav aria-label="Breadcrumb" className="text-caption text-muted">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li><Link href="/exams" className="hover:text-brand-600">Exams</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href={`/exams/${slug}`} className="hover:text-brand-600">{short}</Link></li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-foreground">{k.label}</li>
          </ol>
        </nav>

        <h1 className="mt-4 font-display text-h1 font-extrabold tracking-tight text-foreground">
          {info.examName} {k.title}
        </h1>
        <p className="mt-2 text-caption text-muted">
          From the official {info.conductingBody} documents · last checked {fmtChecked(info.lastChecked)}
        </p>

        <ExamGuideNav slug={slug} active={kind} hasCalculator={!!info.calculator} />

        <Body kind={kind} info={info} />

        {kind === "important-dates" && info.faqs.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-h3 font-bold text-foreground">Frequently asked questions</h2>
            <div className="mt-3 divide-y divide-border overflow-hidden rounded-2xl border border-border">
              {info.faqs.map((f) => (
                <details key={f.q} className="group bg-background">
                  <summary className="cursor-pointer px-4 py-3 text-body font-medium text-foreground">{f.q}</summary>
                  <p className="px-4 pb-4 text-body leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        <div className="mt-10 surface-3 border-brand-200 bg-brand-50 p-5">
          <p className="font-display text-body-lg font-bold text-brand-900">Practise for {info.examName.split(" ").slice(0, 2).join(" ")} free</p>
          <p className="mt-1 text-body text-brand-800">Chapter tests, full mocks and previous-year papers with full solutions — no sign-up needed.</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <Link href={`/exams/${slug}`} className="rounded-full bg-brand-600 px-5 py-2.5 text-body font-semibold text-white hover:bg-brand-700">
              Free mock tests →
            </Link>
            {info.calculator && (
              <Link href={`/exams/${slug}/score-calculator`} className="rounded-full border border-brand-300 bg-background px-5 py-2.5 text-body font-semibold text-brand-700 hover:border-brand-500">
                Score calculator
              </Link>
            )}
          </div>
        </div>

        {info.sources.length > 0 && (
          <section className="mt-8 border-t border-border pt-5">
            <h2 className="text-caption font-semibold uppercase tracking-wide text-muted">Official sources</h2>
            <ul className="mt-2 space-y-1 text-caption">
              {info.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-brand-700 hover:underline">{s.label} ↗</a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    );
  };
}

// Tabs across the guide pages (+ calculator). Also used on the calculator page.
export function ExamGuideNav({ slug, active, hasCalculator }: { slug: string; active?: InfoKind | "calculator"; hasCalculator: boolean }) {
  const tabs = [
    ...INFO_KINDS.map((k) => ({ key: k.kind as string, href: `/exams/${slug}/${k.kind}`, label: k.label })),
    ...(hasCalculator ? [{ key: "calculator", href: `/exams/${slug}/score-calculator`, label: "Score calculator" }] : []),
  ];
  return (
    <nav aria-label="Exam guide" className="-mx-4 mt-5 overflow-x-auto px-4">
      <ul className="flex w-max gap-2">
        {tabs.map((t) => (
          <li key={t.key}>
            <Link
              href={t.href}
              aria-current={active === t.key ? "page" : undefined}
              className={`block whitespace-nowrap rounded-full px-3.5 py-2 text-caption font-semibold transition-colors ${
                active === t.key ? "bg-brand-600 text-white" : "bg-surface text-muted hover:text-foreground"
              }`}
            >
              {t.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
