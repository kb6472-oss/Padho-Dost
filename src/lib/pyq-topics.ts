// Canonical PYQ topic taxonomy — the closed set the classifier assigns and the
// /exams/[slug]/pyq/[topic] pages group by. `Question.topic` stores the slug.
// Keep this list in sync with scripts/classify-pyq-topics (the workflow enum).

export type PyqTopic = {
  slug: string;
  label: string;
  blurb: string; // one-line description for the topic page + meta
};

export const PYQ_TOPICS: PyqTopic[] = [
  { slug: "polity", label: "Polity & Governance", blurb: "Constitution, polity, governance, rights and institutions" },
  { slug: "history", label: "History & National Movement", blurb: "Ancient, medieval and modern India and the freedom struggle" },
  { slug: "geography", label: "Geography", blurb: "Physical, Indian, world and West Bengal geography" },
  { slug: "economy", label: "Economy", blurb: "Economy, banking, budget, taxation and planning" },
  { slug: "environment", label: "Environment & Ecology", blurb: "Environment, ecology, biodiversity and conservation" },
  { slug: "science-tech", label: "Science & Technology", blurb: "Physics, chemistry, biology, health, IT, space and defence" },
  { slug: "current-affairs", label: "Current Affairs", blurb: "Recent events, awards, sports, schemes and appointments" },
  { slug: "reasoning", label: "Reasoning & Aptitude", blurb: "Reasoning, mental ability and quantitative aptitude" },
  { slug: "english-language", label: "English Language", blurb: "Grammar, vocabulary and comprehension" },
  { slug: "art-culture", label: "Art & Culture", blurb: "Art, culture, festivals, literature and heritage" },
  { slug: "general-knowledge", label: "General Knowledge", blurb: "Static general knowledge and miscellaneous topics" },
];

const BY_SLUG = new Map(PYQ_TOPICS.map((t) => [t.slug, t]));

export function pyqTopic(slug: string): PyqTopic | null {
  return BY_SLUG.get(slug) ?? null;
}

// Order index for stable sorting (falls back to end for unknown slugs).
export function pyqTopicOrder(slug: string): number {
  const i = PYQ_TOPICS.findIndex((t) => t.slug === slug);
  return i === -1 ? PYQ_TOPICS.length : i;
}
