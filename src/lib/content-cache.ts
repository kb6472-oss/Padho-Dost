import { unstable_cache } from "next/cache";

// Site content (exams, chapters, questions, explainers) only changes on deploy, and
// every deploy wipes .next — and with it this cache. So DB reads for content pages
// are cached for an hour instead of paying the database round-trips on every
// visit (they were 1–4 s of each page's response time).
//
// Results are JSON-serialised by the cache: return plain data only — a Map or Set
// comes back empty, and a Date comes back as a string.
// (This Next version recommends `use cache`, but that requires opting the whole app
// into Cache Components; unstable_cache is the documented path without it.)
export const CONTENT_REVALIDATE = 3600;

export function cacheContent<A extends unknown[], R>(fn: (...args: A) => Promise<R>, key: string) {
  return unstable_cache(fn, [key], { revalidate: CONTENT_REVALIDATE, tags: ["content"] });
}
