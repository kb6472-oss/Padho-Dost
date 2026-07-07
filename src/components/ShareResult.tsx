"use client";

import { useState } from "react";

export default function ShareResult({
  testId,
  testTitle,
  score,
  total,
  pct,
  rank,
}: {
  testId: string;
  testTitle: string;
  score: string;
  total: string;
  pct: number;
  rank: number | null;
}) {
  const [copied, setCopied] = useState(false);

  function message() {
    const url = `${window.location.origin}/test/${testId}`;
    const rankLine = rank ? ` 🏆 Rank ${rank}!` : "";
    return `🎯 I scored ${score}/${total} (${pct}%) on "${testTitle}" at PadhoDost!${rankLine}\n\nTake this FREE mock test 👇\n${url}`;
  }

  async function share() {
    const text = message();
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "PadhoDost", text });
        return;
      } catch {
        /* user cancelled — fall through to WhatsApp */
      }
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(message());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="mt-5 flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={share}
        className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
      >
        📲 Share my score
      </button>
      <button
        type="button"
        onClick={copy}
        className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
      >
        {copied ? "Copied! ✓" : "Copy"}
      </button>
    </div>
  );
}
