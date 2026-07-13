"use client";

import { useState, useTransition } from "react";
import { submitContact } from "@/lib/contact-actions";

const KIND_OPTIONS = [
  { value: "general", label: "General question" },
  { value: "report", label: "Report a mistake in a question" },
  { value: "request", label: "Request a new exam or chapter" },
];

export default function ContactForm({
  defaultKind = "general",
  defaultRef = "",
}: {
  defaultKind?: string;
  defaultRef?: string;
}) {
  const [kind, setKind] = useState(defaultKind);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <div className="text-3xl">✅</div>
        <p className="mt-2 text-sm font-semibold text-emerald-900">Thanks — we got your message!</p>
        <p className="mt-1 text-sm text-emerald-700">
          We read every message and act on the ones that make PadhoDost better for students.
        </p>
      </div>
    );
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      const res = await submitContact({ kind, name, email, message, ref: defaultRef });
      if (res.ok) setStatus("sent");
      else {
        setStatus("error");
        setError(res.error ?? "Something went wrong. Please try again.");
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-border bg-background p-6">
      <div>
        <label className="text-sm font-medium text-foreground">What&apos;s this about?</label>
        <select
          value={kind}
          onChange={(e) => setKind(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-500"
        >
          {KIND_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {defaultRef && (
        <p className="rounded-lg bg-surface px-3 py-2 text-xs text-muted">Reference: {defaultRef}</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name (optional)"
          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-500"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email (optional, for a reply)"
          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-500"
        />
      </div>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Tell us what's on your mind…"
        rows={5}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand-500"
      />

      {status === "error" && <p className="text-sm text-rose-600">{error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
      <p className="text-center text-xs text-muted">No spam, no calls — we only use your email to reply.</p>
    </form>
  );
}
