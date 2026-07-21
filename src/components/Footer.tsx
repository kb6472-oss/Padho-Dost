import Link from "next/link";
import { site, hasGrievance } from "@/lib/site";

const columns = [
  {
    title: "Exams",
    links: [
      { label: "SSC CGL", href: "/exams/ssc-cgl" },
      { label: "Banking (IBPS / SBI)", href: "/exams/banking" },
      { label: "Railways (RRB)", href: "/exams/railways" },
      { label: "UPSC Prelims", href: "/exams/upsc" },
      { label: "JEE / NEET", href: "/exams/jee" },
      { label: "CBSE Boards", href: "/exams/class-10" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Mock Tests", href: "/exams" },
      { label: "Visual Explainers", href: "/study" },
      { label: "Daily Challenge", href: "/daily" },
      { label: "Daily GK", href: "/gk" },
      { label: "Current Affairs", href: "/current-affairs" },
      { label: "Leaderboard", href: "/leaderboard" },
      { label: "Rank Predictor", href: "/predictor" },
      { label: "Exam Calendar", href: "/exam-calendar" },
    ],
  },
  {
    title: "PadhoDost",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="" className="h-8 w-8" width={32} height={32} />
              <span className="font-display text-lg font-extrabold tracking-tight">
                Padho<span className="text-brand-600">Dost</span>
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted">
              Free mock tests &amp; visual explainers for every Indian student. No paywalls, no spam — ever.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-sm font-semibold text-foreground">{col.title}</h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-muted transition-colors hover:text-brand-600">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Grievance Officer notice — required by the IT (Intermediary Guidelines)
            Rules 2021 for a site that hosts accounts and publishes student names.
            Renders only once real details are set in src/lib/site.ts. */}
        {hasGrievance() && (
          <div className="mt-10 border-t border-border pt-6 text-sm text-muted">
            <p className="font-semibold text-foreground">Grievance Officer</p>
            <p className="mt-1">
              {site.grievance.name} —{" "}
              <a href={`mailto:${site.grievance.email}`} className="text-brand-600 hover:underline">
                {site.grievance.email}
              </a>
              {site.grievance.address ? ` · ${site.grievance.address}` : ""}
            </p>
            <p className="mt-1">
              Have a complaint about content or conduct?{" "}
              <Link href="/contact" className="text-brand-600 hover:underline">
                Contact us
              </Link>{" "}
              and we&apos;ll acknowledge it within 24 hours and resolve it within 15 days.
            </p>
          </div>
        )}

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} PadhoDost{site.operator.name ? ` · ${site.operator.name}` : ""}. Made in
            India 🇮🇳
          </p>
          <p className="text-sm font-medium text-muted">Padho, Dost! 📚</p>
        </div>
      </div>
    </footer>
  );
}
