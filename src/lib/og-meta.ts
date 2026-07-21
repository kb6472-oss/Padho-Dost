// Shared Open Graph image config.
//
// The /api/og route renders the actual card; content pages reference it via
// ogImage() inside their openGraph/twitter metadata. This is necessary because
// a page that sets its own `openGraph` in generateMetadata REPLACES the object
// inherited from the root layout — including the default og:image — so every
// exam/hub/study page was shipping with no share image at all. Pointing at a
// stable /api/og URL (resolved against metadataBase) restores it, with a card
// titled for that specific page.
export const OG_SIZE = { width: 1200, height: 630 };

export function ogImage(title: string, eyebrow: string) {
  const url = `/api/og?t=${encodeURIComponent(title)}&e=${encodeURIComponent(eyebrow)}`;
  return { url, width: OG_SIZE.width, height: OG_SIZE.height, alt: title };
}
