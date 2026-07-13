import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center sm:px-6">
      <div className="font-display text-6xl font-extrabold text-brand-600">404</div>
      <h1 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-foreground">
        Page not found
      </h1>
      <p className="mt-2 text-sm text-muted">
        This page doesn&apos;t exist or has moved. Let&apos;s get you back to studying.
      </p>
      <div className="mt-6 flex gap-3">
        <Link
          href="/exams"
          className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          Browse exams
        </Link>
        <Link
          href="/"
          className="rounded-full border border-border px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
