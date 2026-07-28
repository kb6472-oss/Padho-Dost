"use client";

import { useEffect, useRef, useState } from "react";
import type { Block } from "@/content/explainers";
import { saveReadingProgress } from "@/lib/explainer-actions";

export default function ExplainerReader({ slug, blocks }: { slug: string; blocks: Block[] }) {
  const [pct, setPct] = useState(0);
  const lastSaved = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrollable = el.scrollHeight - el.clientHeight;
      const p = scrollable > 0 ? Math.min(100, Math.round((el.scrollTop / scrollable) * 100)) : 100;
      setPct(p);
      // Fire a save at >=90 (the server's DONE cutoff) so a read that ends in the
      // 90-94% band is deterministically credited, plus on any big scroll jump.
      if (p - lastSaved.current >= 25 || (p >= 90 && lastSaved.current < 90)) {
        lastSaved.current = p;
        saveReadingProgress(slug, p).catch(() => {});
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  // Give every heading a stable anchor id, and collect them for the contents nav.
  // Long prose explainers (grammar, polity, GK) are walls of text with no way to
  // jump around; a short "On this page" list turns the headings into wayfinding.
  const idByIndex = new Map<number, string>();
  const headings: { id: string; text: string }[] = [];
  blocks.forEach((b, i) => {
    if (b.type === "heading") {
      const id = `${slugify(b.text)}-${i}`;
      idByIndex.set(i, id);
      headings.push({ id, text: b.text });
    }
  });

  return (
    <>
      <div className="fixed left-0 top-16 z-40 h-1 bg-brand-600 transition-[width] duration-150" style={{ width: `${pct}%` }} />
      <div className="space-y-5">
        {headings.length >= 4 && <Contents headings={headings} />}
        {blocks.map((b, i) => (
          <BlockView key={i} block={b} headingId={idByIndex.get(i)} />
        ))}
      </div>
    </>
  );
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function Contents({ headings }: { headings: { id: string; text: string }[] }) {
  return (
    <nav aria-label="On this page" className="rounded-2xl border border-border bg-surface p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">On this page</p>
      <ul className="mt-2 space-y-1.5">
        {headings.map((h) => (
          <li key={h.id} className="flex gap-2 text-[15px]">
            <span aria-hidden="true" className="text-muted">·</span>
            <a href={`#${h.id}`} className="font-medium text-brand-700 hover:text-brand-900 hover:underline">
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function BlockView({ block, headingId }: { block: Block; headingId?: string }) {
  switch (block.type) {
    case "heading":
      // scroll-mt clears the sticky navbar so an anchor jump lands the heading in view.
      return <h2 id={headingId} className="scroll-mt-24 pt-2 font-display text-xl font-bold tracking-tight text-foreground">{block.text}</h2>;
    case "para":
      return <p className="text-[15px] leading-relaxed text-foreground/90">{block.text}</p>;
    case "analogy":
      return (
        <div className="rounded-2xl border border-brand-200 bg-brand-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">🧠 {block.title || "Think of it this way"}</p>
          <p className="mt-1.5 text-[15px] leading-relaxed text-brand-900">{block.text}</p>
        </div>
      );
    case "formula":
      return (
        // whitespace-pre-wrap is load-bearing: 28 of the 63 formula blocks in the
        // corpus use runs of 2-8 spaces as their ONLY separator between distinct
        // formulas. HTML collapses those to one space, so without this they render
        // as run-on gibberish. overflow-x-auto keeps long formulas from forcing
        // the whole page to scroll sideways on a 360px phone.
        <div className="overflow-x-auto rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3">
          <div className="whitespace-pre-wrap text-center font-mono text-body-lg font-bold tracking-wide text-indigo-800">
            {block.text}
          </div>
        </div>
      );
    case "steps":
      return (
        <div>
          {block.title && <p className="mb-2 text-sm font-semibold text-foreground">{block.title}</p>}
          <ol className="space-y-2">
            {block.items.map((it, i) => (
              <li key={i} className="flex gap-3 text-[15px] text-foreground/90">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{it}</span>
              </li>
            ))}
          </ol>
        </div>
      );
    case "example":
      return (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          {block.title && <p className="text-sm font-semibold text-emerald-900">📝 {block.title}</p>}
          <div className="mt-2 space-y-1">
            {block.lines.map((l, i) => (
              <p key={i} className="font-mono text-sm leading-relaxed text-emerald-900">{l}</p>
            ))}
          </div>
        </div>
      );
    case "callout": {
      const tone = block.tone || "info";
      const styles = {
        tip: "border-emerald-200 bg-emerald-50 text-emerald-900",
        warn: "border-amber-200 bg-amber-50 text-amber-900",
        info: "border-sky-200 bg-sky-50 text-sky-900",
      }[tone];
      const icon = { tip: "💡", warn: "⚠️", info: "ℹ️" }[tone];
      return <div className={`rounded-xl border p-3.5 text-sm leading-relaxed ${styles}`}>{icon} {block.text}</div>;
    }
    case "keypoints":
      return (
        <div className="rounded-2xl border border-border bg-surface p-4">
          {block.title && <p className="mb-2 text-sm font-semibold text-foreground">{block.title}</p>}
          <ul className="space-y-1.5">
            {block.items.map((it, i) => (
              <li key={i} className="flex gap-2 text-[15px] text-foreground/90">
                <span className="flex-shrink-0 text-emerald-600">✓</span>
                <span className="leading-relaxed">{it}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface">
                {block.headers.map((h, i) => (
                  <th key={i} className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-muted">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-t border-border">
                  {row.map((cell, j) => (
                    <td key={j} className={`px-3 py-2.5 ${j === 0 ? "font-medium text-foreground" : "font-mono text-foreground/90"}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "figure":
      return (
        <figure className="my-1">
          {/* Build-time authored + validated SVG (no scripts). White plate keeps
              dark-stroked diagrams legible in both light and dark themes.
              The [&_svg] utilities force the SVG to scale to the container. */}
          <div
            className="mx-auto flex justify-center overflow-x-auto rounded-2xl border border-border bg-white p-4 [&_svg]:h-auto [&_svg]:w-full [&_svg]:max-w-[440px]"
            dangerouslySetInnerHTML={{ __html: block.svg }}
          />
          {block.caption && (
            <figcaption className="mt-2 text-center text-caption text-muted">{block.caption}</figcaption>
          )}
        </figure>
      );
    case "quiz":
      return <QuizBlock block={block} />;
  }
}

function QuizBlock({ block }: { block: Extract<Block, { type: "quiz" }> }) {
  const [picked, setPicked] = useState<number | null>(null);
  const done = picked !== null;
  return (
    <div className="rounded-2xl border border-border bg-background p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">⚡ Quick check</p>
      <p className="mt-1.5 text-[15px] font-medium text-foreground">{block.question}</p>
      <div className="mt-3 space-y-2">
        {block.options.map((o, i) => {
          const isCorrect = i === block.correct;
          let cls = "border-border bg-background hover:border-brand-300";
          if (done && isCorrect) cls = "border-emerald-300 bg-emerald-50 text-emerald-900";
          else if (done && i === picked) cls = "border-rose-300 bg-rose-50 text-rose-900";
          return (
            <button
              key={i}
              type="button"
              disabled={done}
              onClick={() => setPicked(i)}
              className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left text-sm transition-colors ${cls}`}
            >
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-surface text-xs font-bold">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="font-medium">{o}</span>
            </button>
          );
        })}
      </div>
      {done && (
        <div className="mt-3 rounded-xl bg-brand-50 p-3 text-sm leading-relaxed text-brand-900">
          {picked === block.correct ? "✅ Correct! " : "❌ Not quite. "}
          {block.explain}
        </div>
      )}
    </div>
  );
}
