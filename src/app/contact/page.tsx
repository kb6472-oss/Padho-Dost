import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the PadhoDost team — report a mistake, request an exam, or ask a question.",
  alternates: { canonical: "/contact" },
};

type Props = { searchParams: Promise<{ kind?: string; ref?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const { kind, ref } = await searchParams;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground">Contact us</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Spotted a wrong answer? Want a new exam or chapter added? Have a suggestion? Tell us — we
        read every message and it directly shapes what we build next.
      </p>

      <div className="mt-8">
        <ContactForm defaultKind={kind ?? "general"} defaultRef={ref ?? ""} />
      </div>

      {site.contactEmail && (
        <p className="mt-6 text-center text-xs text-muted">
          Prefer email? Write to us at{" "}
          <a href={`mailto:${site.contactEmail}`} className="font-medium text-brand-600 hover:underline">
            {site.contactEmail}
          </a>
          .
        </p>
      )}
    </div>
  );
}
