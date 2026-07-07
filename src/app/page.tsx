import Link from "next/link";
import { exams } from "@/lib/exams";
import ExamCard from "@/components/ExamCard";

const features = [
  {
    emoji: "🆓",
    title: "Truly 100% free",
    body: "Every mock test, explainer and PDF — free forever. No paywalls, no “trial ended”. We run on ads, not your wallet.",
  },
  {
    emoji: "🖼️",
    title: "Visual explainers",
    body: "Concepts taught with analogies, diagrams and worked examples — so you actually understand, not just memorise.",
  },
  {
    emoji: "📊",
    title: "Know your weak spots",
    body: "Every test shows your accuracy by topic, your All-India rank and exactly what to practise next.",
  },
  {
    emoji: "🚫",
    title: "No spam, ever",
    body: "No sales calls. No WhatsApp flooding. Your phone number stays yours. Just honest, free learning.",
  },
  {
    emoji: "🗺️",
    title: "Built for all of India",
    body: "School boards, govt exams and entrance — in one place, with Hindi and regional languages on the way.",
  },
  {
    emoji: "📱",
    title: "Works like an app",
    body: "Add PadhoDost to your home screen, study offline, and get gentle daily reminders. No Play Store needed.",
  },
];

const steps = [
  {
    n: "1",
    title: "Pick your exam",
    body: "SSC CGL, Class 10 and more — choose your goal in one tap. No sign-up needed to start.",
  },
  {
    n: "2",
    title: "Take a free mock test",
    body: "Real exam interface, instant scoring, step-by-step solutions and your All-India rank.",
  },
  {
    n: "3",
    title: "Learn & improve",
    body: "Read visual explainers for your weak topics, build a streak, and watch your score climb.",
  },
];

export default function Home() {
  return (
    <>
      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-100 blur-3xl" />
          <div className="absolute right-0 top-32 h-64 w-64 rounded-full bg-accent-100 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              100% Free · No paywalls · For every Indian student
            </span>

            <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-6xl">
              Padho, <span className="text-brand-600">Dost</span>! 📚
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base text-muted sm:text-lg">
              Free mock tests and visual explainers for{" "}
              <span className="font-semibold text-foreground">SSC, Banking, Boards, JEE, NEET &amp; UPSC</span> —
              all in one place. Your free study buddy for every exam.
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/exams"
                className="w-full rounded-full bg-brand-600 px-6 py-3 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 sm:w-auto"
              >
                Start a free mock test
              </Link>
              <Link
                href="/#exams"
                className="w-full rounded-full border border-border bg-background px-6 py-3 text-center text-sm font-semibold text-foreground transition-colors hover:bg-surface sm:w-auto"
              >
                Explore exams
              </Link>
            </div>

            <p className="mt-4 text-xs text-muted">
              No sign-up needed to start · No spam calls, ever
            </p>
          </div>

          {/* Trust stats */}
          <div className="mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-3">
            {[
              { v: "40+", l: "Exam categories" },
              { v: "₹0", l: "Cost to students" },
              { v: "All", l: "Boards & languages" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-border bg-surface px-3 py-4 text-center">
                <div className="font-display text-2xl font-extrabold text-brand-600">{s.v}</div>
                <div className="mt-1 text-xs text-muted">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── Exams ───────────────────────── */}
      <section id="exams" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Choose your exam
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted">
              We&apos;re starting with SSC CGL and Class 10 — and adding new exams every month.
            </p>
          </div>
          <Link href="/exams" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
            View all →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {exams.map((exam) => (
            <ExamCard key={exam.slug} exam={exam} />
          ))}
        </div>
      </section>

      {/* ───────────────────────── How it works ───────────────────────── */}
      <section id="how" className="scroll-mt-20 bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              How it works
            </h2>
            <p className="mt-2 text-sm text-muted">Three steps from confused to confident.</p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {steps.map((step) => (
              <div key={step.n} className="rounded-2xl border border-border bg-background p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 font-display text-base font-bold text-white">
                  {step.n}
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── Why PadhoDost ───────────────────────── */}
      <section id="why" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Why students love PadhoDost
          </h2>
          <p className="mt-2 text-sm text-muted">
            Built to be the honest, free alternative in a market full of paywalls and sales calls.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-background p-6">
              <div className="text-3xl">{f.emoji}</div>
              <h3 className="mt-3 font-display text-base font-semibold text-foreground">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────────────── CTA band ───────────────────────── */}
      <section className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-brand-600 px-6 py-14 text-center sm:py-16">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Ready to start? Padho, Dost! 🚀
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-brand-100 sm:text-base">
            Take your first free mock test in under a minute. No sign-up, no payment, no pressure.
          </p>
          <Link
            href="/exams"
            className="mt-7 inline-block rounded-full bg-white px-7 py-3 text-sm font-semibold text-brand-700 shadow-sm transition-transform hover:scale-[1.02]"
          >
            Start free now
          </Link>
        </div>
      </section>
    </>
  );
}
