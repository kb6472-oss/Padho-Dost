// ─────────────────────────────────────────────────────────────────────────────
// Public site identity & legal details.
//
// These render in the footer and About page. They are intentionally EMPTY until
// filled with real values — a fabricated grievance officer or legal entity is
// worse than none (legally misleading), so nothing here is invented. Sections
// that depend on a value simply don't render while it's blank.
//
// IMPORTANT: never put the private work email here. Use a public support/
// grievance address. This file IS committed, so everything in it is public by
// design — which is correct for the grievance-officer notice the IT Rules 2021
// require, but wrong for anything that should stay private.
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
  // The person or organisation that operates PadhoDost, shown on About.
  operator: {
    name: "", // e.g. "Prabhanjan K." or a registered company name
    isCompany: false, // true if a registered entity, false for an individual
    bio: "", // 1–3 sentences: who built this and why
  },

  // Public contact used across the site (NOT the private work email).
  // TEMPORARY: a personal Gmail, chosen to move forward; upgrade to a
  // hello@padhodost.com address once domain email is set up.
  contactEmail: "kb6472@gmail.com",

  // Grievance Officer — required by the IT (Intermediary Guidelines) Rules 2021
  // because PadhoDost hosts user accounts and publishes student names publicly
  // (the leaderboard). Must be a NAMED, reachable person.
  grievance: {
    name: "", // Grievance Officer's name
    email: "", // a reachable email for grievances (public)
    // A contact location. City + state is the usual minimum for an individual
    // operator; a registered company gives its registered address.
    address: "",
  },
} as const;

export const hasOperator = () => site.operator.name.trim().length > 0;
export const hasGrievance = () => site.grievance.name.trim().length > 0 && site.grievance.email.trim().length > 0;
