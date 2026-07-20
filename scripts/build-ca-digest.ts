import "dotenv/config";
import Anthropic from "@anthropic-ai/sdk";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

// ─────────────────────────────────────────────────────────────────────────────
// Editorial pass: raw news headlines → ORIGINAL exam-format current affairs.
//
// Why this exists: publishing third-party article descriptions verbatim is
// scraped content, and the penalty is site-wide. This script never republishes
// the source text. It reads the day's raw items as *source material* and writes
// something that does not otherwise exist: compact exam-format facts in the
// genre Indian competitive exams actually test (appointments, schemes, summits,
// indices, awards, defence, sports records), each tied to the static-GK hook an
// examiner would pair it with, plus an original MCQ quiz.
//
// Run AFTER fetch-current-affairs.ts, once a day via cron on the VPS:
//   30 6 * * *  cd /root/padhodost && npx tsx scripts/build-ca-digest.ts >> /root/ca-digest.log 2>&1
//
// Requires in .env:  ANTHROPIC_API_KEY=...   (optional: CA_DIGEST_MODEL=...)
// ─────────────────────────────────────────────────────────────────────────────

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DIRECT_URL }) });

// Defaults to the most capable model. Override per-deployment if you want to
// trade quality for cost — that is a judgement call for whoever pays the bill.
const MODEL = process.env.CA_DIGEST_MODEL ?? "claude-opus-4-8";

const CATEGORIES = [
  "Appointments",
  "Schemes & Policy",
  "Economy & Banking",
  "International",
  "Defence",
  "Science & Tech",
  "Environment",
  "Sports",
  "Awards & Honours",
  "Reports & Indices",
] as const;

// JSON Schema — constrains the response shape so we never have to parse prose.
// Note: numeric/length/array-size constraints are not supported by structured
// outputs, so counts and option-length are validated in code below.
const DIGEST_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["intro", "facts", "quiz"],
  properties: {
    intro: {
      type: "string",
      description: "One or two plain sentences orienting a student to the day. No hype.",
    },
    facts: {
      type: "array",
      description: "Exam-format facts, most exam-relevant first.",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["category", "headline", "detail", "sourceIndex"],
        properties: {
          category: { type: "string", enum: [...CATEGORIES] },
          headline: {
            type: "string",
            description: "The fact stated plainly in one line, as an exam would phrase it.",
          },
          detail: {
            type: "string",
            description:
              "2-3 sentences of the surrounding facts an exam actually tests: who, which ministry/body, which number, which state, effective when.",
          },
          staticLink: {
            type: "string",
            description:
              "The static-GK hook an examiner pairs this with (e.g. 'RBI was nationalised in 1949; the Governor is appointed by the Appointments Committee of the Cabinet'). Empty string if none applies.",
          },
          sourceIndex: {
            type: "integer",
            description: "0-based index of the source item this was derived from.",
          },
        },
      },
    },
    quiz: {
      type: "array",
      description: "Original MCQs testing the facts above.",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["text", "options", "correctIndex", "explanation"],
        properties: {
          text: { type: "string" },
          options: { type: "array", items: { type: "string" } },
          correctIndex: { type: "integer", enum: [0, 1, 2, 3] },
          explanation: { type: "string" },
        },
      },
    },
  },
} as const;

type Digest = {
  intro: string;
  facts: Array<{
    category: string;
    headline: string;
    detail: string;
    staticLink?: string;
    sourceIndex: number;
  }>;
  quiz: Array<{ text: string; options: string[]; correctIndex: number; explanation: string }>;
};

const SYSTEM = `You write the daily current-affairs section of PadhoDost, a free exam-prep site for Indian students preparing for SSC CGL, IBPS/SBI Banking, RRB Railways and UPSC Prelims.

You are given raw news headlines as SOURCE MATERIAL. Your job is to write original exam-format current affairs from them — not to summarise or paraphrase the articles.

WHAT EXAMS ACTUALLY TEST. Indian competitive exams test a narrow genre of current affairs:
appointments and resignations, government schemes and their ministries, MoUs and summits,
indices and rankings (and India's position in them), defence exercises and inductions,
space and science missions, awards and honours, banking/RBI policy and rates, sports records
and tournament winners, obituaries of notable figures.

They do NOT test: crime, accidents, celebrity news, film releases, cricket match commentary,
opinion pieces, foreign domestic politics with no India angle, or market fluctuation stories.

RULES:
1. DISCARD ruthlessly. If a source item is not in the exam genre above, skip it entirely.
   Returning 4 excellent facts is far better than padding to 10 with irrelevant ones.
   If nothing in the input is exam-relevant, return an empty facts array — that is a valid answer.
2. NEVER reproduce the source's wording. Write every line yourself, in your own words.
   You are extracting facts, not rewriting sentences.
3. Write the FACT, not the story. "X was appointed Y of Z, succeeding W" — not "In a move that
   observers say signals...". No narrative framing, no speculation, no adjectives that carry opinion.
4. Include the specifics an exam tests: full names, exact designations, the ministry or body,
   the number, the state, the date it takes effect. If the source does not give you a specific,
   do not invent one — leave it out.
5. staticLink is where you add the value a news site cannot: connect the item to the static GK
   an examiner pairs it with. A new RBI Deputy Governor → how many Deputy Governors the RBI has.
   A summit → where the previous one was held and which body runs it.
6. NEVER state a fact that is not supported by the source material. No invented dates, numbers,
   names or positions. Under-specify rather than guess.
7. The quiz must test the facts you wrote above, in the exact style of SSC/Banking GA sections.
   Exactly 4 options. Exactly one correct. Wrong options must be plausible to someone who half-remembers
   the topic — never filler, never obviously absurd. The explanation states why the answer is right in
   one or two sentences.
8. Write for a student whose English is a second language: short sentences, plain words, no idioms.`;

function istDayKey(): string {
  return new Date(Date.now() + 5.5 * 3600_000).toISOString().slice(0, 10);
}

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY not set in .env — skipping digest build.");
    process.exit(1);
  }

  const dayKey = istDayKey();
  const day = new Date(dayKey);

  const existing = await prisma.caDigest.findUnique({ where: { day } });
  if (existing) {
    console.log(`[${new Date().toISOString()}] digest for ${dayKey} already exists — nothing to do.`);
    return;
  }

  const raw = await prisma.currentAffair.findMany({
    where: { day },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });
  if (raw.length === 0) {
    console.log(`[${new Date().toISOString()}] no raw items for ${dayKey} — run fetch-current-affairs.ts first.`);
    return;
  }

  // Source material for the model, indexed so facts can cite what they came from.
  const sourceBlock = raw
    .map((r, i) => `[${i}] ${r.title}${r.summary ? `\n    ${r.summary}` : ""}\n    — ${r.source ?? "unknown source"}`)
    .join("\n\n");

  const client = new Anthropic({ apiKey });

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 16000,
    system: SYSTEM,
    thinking: { type: "adaptive" },
    output_config: {
      effort: "high",
      format: { type: "json_schema", schema: DIGEST_SCHEMA },
    },
    messages: [
      {
        role: "user",
        content: `Today is ${dayKey} (IST). Here are today's raw news items as source material:\n\n${sourceBlock}\n\nWrite the exam-format current-affairs digest for this day. Aim for up to 10 facts and up to 5 quiz questions, but include only genuinely exam-relevant items — discard the rest.`,
      },
    ],
  });

  if (response.stop_reason === "refusal") {
    console.error("Model declined to produce the digest:", response.stop_details);
    process.exitCode = 1;
    return;
  }

  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    console.error("No text block in response — got:", response.content.map((b) => b.type).join(", "));
    process.exitCode = 1;
    return;
  }

  let digest: Digest;
  try {
    digest = JSON.parse(textBlock.text) as Digest;
  } catch (e) {
    console.error("Response was not valid JSON:", e);
    process.exitCode = 1;
    return;
  }

  // Validate what the schema cannot express, and drop anything malformed rather
  // than publishing a broken question.
  const facts = (digest.facts ?? []).filter((f) => f.headline?.trim() && f.detail?.trim()).slice(0, 12);
  const quiz = (digest.quiz ?? [])
    .filter(
      (q) =>
        q.text?.trim() &&
        Array.isArray(q.options) &&
        q.options.length === 4 &&
        q.options.every((o) => typeof o === "string" && o.trim()) &&
        q.correctIndex >= 0 &&
        q.correctIndex <= 3,
    )
    .slice(0, 5);

  if (facts.length === 0) {
    console.log(
      `[${new Date().toISOString()}] nothing exam-relevant in ${raw.length} items for ${dayKey} — no digest written. This is a valid outcome.`,
    );
    return;
  }

  await prisma.caDigest.create({
    data: {
      day,
      intro: digest.intro?.trim() || `Current affairs for ${dayKey}.`,
      model: response.model,
      facts: {
        create: facts.map((f, i) => {
          const src = raw[f.sourceIndex];
          return {
            order: i,
            category: f.category,
            headline: f.headline.trim(),
            detail: f.detail.trim(),
            staticLink: f.staticLink?.trim() || null,
            sourceUrl: src?.url ?? null,
            sourceName: src?.source ?? null,
          };
        }),
      },
      quiz: {
        create: quiz.map((q, i) => ({
          order: i,
          text: q.text.trim(),
          options: q.options.map((o) => o.trim()),
          correctIndex: q.correctIndex,
          explanation: q.explanation?.trim() || "",
        })),
      },
    },
  });

  const u = response.usage;
  console.log(
    `[${new Date().toISOString()}] ca-digest ${dayKey}: ${facts.length} facts, ${quiz.length} quiz Q ` +
      `from ${raw.length} raw items (${response.model}; in ${u.input_tokens} / out ${u.output_tokens} tokens).`,
  );
}

main()
  .catch((e) => {
    console.error("build-ca-digest failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
