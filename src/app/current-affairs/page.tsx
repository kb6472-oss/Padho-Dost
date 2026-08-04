import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getLatestCADate } from "@/lib/current-affairs";
import { istToday } from "@/lib/daily";

// See /current-affairs/[date] — this whole section is noindex until the digest
// is original exam-format content rather than an aggregated headline list.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// Dynamic so it re-checks the latest digest date per request (and auto-advances the
// moment the daily build-ca-digest job publishes a new day) instead of baking the
// build-day date into a static redirect.
export const dynamic = "force-dynamic";

export default async function CurrentAffairsIndex() {
  const latest = await getLatestCADate();
  redirect(`/current-affairs/${latest ?? istToday()}`);
}
