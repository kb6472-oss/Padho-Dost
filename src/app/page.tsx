import Link from "next/link";
import { ArrowRight, BookOpen, CalendarCheck, CheckCircle2, ShieldOff, Trophy, Wallet } from "lucide-react";
import { getExams, getExamCounts } from "@/lib/data";
import { getChip, type Exam } from "@/lib/exams";
import { getDailyQuestion, istToday } from "@/lib/daily";
import { ButtonLink } from "@/components/ui/Button";
import ExamCard from "@/components/ExamCard";
import HeroTestPreview from "@/components/HeroTestPreview";

// The homepage reads today's daily question, so it renders per request rather
// than being statically frozen. Cloudflare already serves these routes DYNAMIC
// (see W2), so there is no edge-cache to lose, and the query is one indexed row.

// Every claim on this page must be true TODAY. A first-generation aspirant
// screening for scams reads one broken promise as evidence about all the others,
// so nothing here is aspirational — offline, reminders, PDFs and Hindi are
// deliberately absent because they don't exist yet.
const features = [
  {
    Icon: Wallet,
    title: "Free is the whole model, not a trial",
    body: "Every mock test and explainer, forever. No “Premium”, no locked papers, no card on file. Testbook and Adda charge for this; we run on ads instead.",
  },
  {
    Icon: BookOpen,
    title: "Concept first, then practice",
    body: "Each chapter opens with a plain-English explainer — analogy, worked example, quick self-check — so you understand it instead of memorising four options.",
  },
  {
    Icon: Trophy,
    title: "Real exam conditions",
    body: "Live timer, negative marking, a question palette, and your All-India rank against everyone who sat the same paper. Not a quiz — the actual thing.",
  },
  {
    Icon: CheckCircle2,
    title: "Every answer explained",
    body: "Not just a score. Each question comes with a full step-by-step solution, so a wrong answer teaches you something instead of only costing you marks.",
  },
  {
    Icon: ShieldOff,
    title: "No spam, ever",
    body: "No sales calls, no WhatsApp flooding, no counsellor ringing at dinner. We never ask for your phone number. Your prep is nobody's lead list.",
  },
  {
    Icon: CalendarCheck,
    title: "A reason to come back daily",
    body: "A fresh Question of the Day and daily GK keep your streak alive between mocks — five minutes a day beats a panic marathon the night before.",
  },
];

const steps = [
  { n: "1", title: "Pick your exam", body: "SSC, Banking, Railways, UPSC, JEE, NEET or a CBSE class — choose in one tap. No sign-up to start." },
  { n: "2", title: "Sit a real mock", body: "Exam interface, live timer, instant scoring, step-by-step solutions and your All-India rank." },
  { n: "3", title: "Fix your weak topics", body: "The result names your weakest chapter and links its explainer and next test. Build a streak. Watch the score climb." },
];

export default async function Home() {
  const [dbExams, counts] = await Promise.all([getExams(), getExamCounts()]);

  let daily: Awaited<ReturnType<typeof getDailyQuestion>> = null;
  try {
    daily = await getDailyQuestion(istToday());
  } catch {
    daily = null;
  }

  const cards: Exam[] = dbExams.map((e) => ({
    slug: e.slug,
    name: e.name,
    short: e.shortName,
    emoji: e.emoji ?? "📘",
    blurb: e.description ?? "",
    status: e.status === "LIVE" ? "live" : "soon",
    chip: getChip(e.slug),
  }));
  const liveCount = cards.filter((c) => c.status === "live").length;

  const totals = [...counts.values()].reduce(
    (acc, c) => ({
      questions: acc.questions + c.questions,
      tests: acc.tests + c.tests,
      explainers: acc.explainers + c.explainers,
    }),
    { questions: 0, tests: 0, explainers: 0 },
  );

  // Honest trust signals: what the library actually contains. For a content
  // product this is the real proof — not invented "50,000 students" numbers.
  const stats = [
    { v: `${liveCount}`, l: "Exams live" },
    { v: totals.questions.toLocaleString("en-IN"), l: "Practice questions" },
    { v: `${totals.explainers}`, l: "Visual explainers" },
    { v: "₹0", l: "Cost, forever" },
  ];

  // A curated, real question for the hero phone frame — kept STABLE and separate
  // from the live daily band below, so the same question never appears twice and
  // the showcase always reads cleanly in the small frame.
  const heroQ = {
    question: "A train 180 m long crosses a pole in 12 seconds. What is its speed?",
    options: ["36 km/h", "54 km/h", "60 km/h", "45 km/h"],
    selectedIndex: 1,
  };

  return (
    <>
      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-100 blur-3xl" />
          <div className="absolute right-0 top-32 h-64 w-64 rounded-full bg-accent-100 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-caption font-semibold text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Padho, Dost 📚 · your free study buddy
            </span>

            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
              Every mock test, every subject — <span className="text-brand-600">free, forever.</span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-body-lg text-muted lg:mx-0">
              Exam-pattern papers, All-India rank and concept-first explainers for{" "}
              <span className="font-semibold text-foreground">SSC, Banking, Railways, UPSC, JEE, NEET</span> and
              CBSE boards. No paywall. No sales calls. No catch.
            </p>

            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
              <ButtonLink href="/exams" size="lg" className="w-full sm:w-auto">
                Start a free mock test
                <ArrowRight className="h-[18px] w-[18px]" strokeWidth={2.4} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/#exams" variant="secondary" size="lg" className="w-full sm:w-auto">
                Browse {liveCount} exams
              </ButtonLink>
            </div>

            <p className="mt-4 text-caption text-muted">No sign-up needed to start · No spam calls, ever</p>
          </div>

          <div className="px-6 pt-6 sm:px-0 lg:pt-0">
            <HeroTestPreview {...heroQ} />
          </div>
        </div>

        {/* Content-depth stat strip — the real proof for a content product. */}
        <div className="mx-auto max-w-5xl px-4 pb-14 sm:px-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.l} className="surface-1 px-3 py-4 text-center">
                <div className="font-display text-h2 font-extrabold text-brand-600">{s.v}</div>
                <div className="mt-1 text-caption text-muted">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── Today's challenge ───────────────────────── */}
      {daily && (
        <section className="px-4 pb-4 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <Link
              href={`/daily/${istToday()}`}
              className="surface-3 surface-3-interactive flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:gap-6"
            >
              <div className="flex-1">
                <span className="text-caption font-semibold uppercase tracking-wide text-brand-600">
                  🔥 Question of the day
                </span>
                <p className="mt-2 font-display text-body-lg font-semibold leading-snug text-foreground">
                  {daily.text}
                </p>
                <p className="mt-1.5 text-caption text-muted">
                  {daily.exam.shortName}
                  {daily.chapter ? ` · ${daily.chapter.name}` : ""} — answer it free, no sign-up, and keep your
                  streak alive.
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full bg-brand-600 px-5 py-2.5 text-body font-semibold text-white sm:self-auto">
                Solve it
                <ArrowRight className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </section>
      )}

      {/* ───────────────────────── Exams ───────────────────────── */}
      <section id="exams" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-h1 font-bold tracking-tight text-foreground">Choose your exam</h2>
            <p className="mt-2 max-w-xl text-body text-muted">
              {liveCount} exams live, {totals.tests.toLocaleString("en-IN")} tests, every paper free — new
              chapters added every month.
            </p>
          </div>
          <Link href="/exams" className="text-body font-semibold text-brand-600 hover:text-brand-700">
            View all →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((exam) => (
            <ExamCard key={exam.slug} exam={exam} counts={counts.get(exam.slug)} />
          ))}
        </div>
      </section>

      {/* ───────────────────────── How it works ───────────────────────── */}
      <section id="how" className="scroll-mt-20 bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-h1 font-bold tracking-tight text-foreground">How it works</h2>
            <p className="mt-2 text-body text-muted">Three steps from confused to confident.</p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {steps.map((step) => (
              <div key={step.n} className="surface-2 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 font-display text-body-lg font-bold text-white">
                  {step.n}
                </div>
                <h3 className="mt-4 font-display text-h3 font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1.5 text-body text-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── Why PadhoDost ───────────────────────── */}
      <section id="why" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-h1 font-bold tracking-tight text-foreground">
            The honest, free alternative
          </h2>
          <p className="mt-2 text-body text-muted">
            Built for students the coaching industry treats as a sales funnel.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="surface-2 p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <f.Icon className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-h3 font-semibold text-foreground">{f.title}</h3>
              <p className="mt-1.5 text-body text-muted">{f.body}</p>
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
          <p className="mx-auto mt-3 max-w-xl text-body-lg text-brand-100">
            Your first free mock test takes under a minute. No sign-up, no payment, no pressure.
          </p>
          <Link
            href="/exams"
            className="mt-7 inline-block rounded-full bg-white px-8 py-3 text-body font-semibold text-brand-700 shadow-e1 transition-transform hover:scale-[1.02]"
          >
            Start free now
          </Link>
        </div>
      </section>
    </>
  );
}
