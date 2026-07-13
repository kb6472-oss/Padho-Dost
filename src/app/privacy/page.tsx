import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How PadhoDost collects, uses, and protects your data.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-muted">Last updated: 10 July 2026</p>

      <div className="prose-pd mt-8 space-y-6 text-sm leading-relaxed text-foreground">
        <p>
          PadhoDost (&ldquo;we&rdquo;, &ldquo;us&rdquo;) runs a free exam-preparation website at
          padhodost.com. We believe study tools should be free and respectful of your
          privacy. This policy explains what we collect and why. We do not sell your
          personal data — ever.
        </p>

        <section>
          <h2 className="font-display text-lg font-bold text-foreground">What we collect</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
            <li>
              <strong className="text-foreground">Account info</strong> — if you sign in, your
              email address and (for Google sign-in) your name and profile picture, provided
              through our authentication partner, Supabase.
            </li>
            <li>
              <strong className="text-foreground">Practice activity</strong> — the tests you
              take, your answers, scores, time spent, and study streak, so we can show your
              dashboard, rank, and progress.
            </li>
            <li>
              <strong className="text-foreground">Guest activity</strong> — if you practise
              without signing in, we store a random anonymous ID on your device to save your
              attempt. It is linked to your account only if you later sign in.
            </li>
            <li>
              <strong className="text-foreground">Basic technical data</strong> — standard
              server logs (such as browser type and approximate region) needed to run and
              secure the site.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-foreground">How we use it</h2>
          <p className="mt-2 text-muted">
            To provide the service: score your tests, save your progress, compute your
            All-India rank and percentile, maintain leaderboards and streaks, and improve our
            content. We do not use your data for spam calls or marketing messages.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-foreground">
            Advertising &amp; cookies
          </h2>
          <p className="mt-2 text-muted">
            PadhoDost is funded entirely by advertising. We use Google AdSense to show ads.
            Third-party vendors, including Google, use cookies to serve ads based on your
            prior visits to this and other websites. Google&rsquo;s use of advertising cookies
            enables it and its partners to serve ads to you based on your visit to our site
            and/or other sites on the Internet.
          </p>
          <p className="mt-2 text-muted">
            You may opt out of personalised advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              className="font-medium text-brand-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Ads Settings
            </a>
            . For more on how third parties use cookies, visit{" "}
            <a
              href="https://www.aboutads.info"
              className="font-medium text-brand-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              aboutads.info
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-foreground">
            Service providers
          </h2>
          <p className="mt-2 text-muted">
            We rely on a few trusted providers to operate: Supabase (authentication and
            database), Cloudflare (content delivery and security), and Google AdSense
            (advertising). Your data is processed by these providers only to run the service.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-foreground">Your choices</h2>
          <p className="mt-2 text-muted">
            You can use most of PadhoDost without an account. You may request deletion of your
            account and associated data at any time by contacting us. You can also clear
            cookies through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-foreground">Children</h2>
          <p className="mt-2 text-muted">
            PadhoDost serves students, including those in school. We collect only what is
            described above and never knowingly collect more than is needed to provide study
            tools. If you are a parent and have concerns, please contact us.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-foreground">Contact</h2>
          <p className="mt-2 text-muted">
            Questions about this policy? Reach us via our{" "}
            <a href="/contact" className="font-medium text-brand-600 hover:underline">
              contact page
            </a>
            . We may update this policy from time to time; the &ldquo;last updated&rdquo; date
            above will reflect any changes.
          </p>
        </section>
      </div>
    </div>
  );
}
