import type { Metadata } from "next";

// The predictor page itself is a client component, so its title lives here (a client
// component can't export metadata). Without this it fell back to the site-default title.
export const metadata: Metadata = {
  title: "Rank & College Predictor",
  description:
    "Estimate your JEE / NEET percentile, rank and likely colleges from your expected marks — free, instant, no sign-up.",
  alternates: { canonical: "/predictor" },
};

export default function PredictorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
