import Link from "next/link";

const columns = [
  {
    title: "Exams",
    links: [
      { label: "SSC CGL & Banking", href: "/exams/ssc-cgl" },
      { label: "Class 10 (CBSE)", href: "/exams/class-10" },
      { label: "JEE (Main + Adv)", href: "/exams/jee" },
      { label: "NEET (Medical)", href: "/exams/neet" },
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

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="text-sm text-muted">© 2026 PadhoDost. Made in India 🇮🇳</p>
          <p className="text-sm font-medium text-muted">Padho, Dost! 📚</p>
        </div>
      </div>
    </footer>
  );
}
