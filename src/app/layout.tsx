import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { AdScript } from "@/components/Ads";
import Analytics from "@/components/Analytics";

const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

// Site-wide structured data (Organization + WebSite) for rich results.
const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://padhodost.com/#org",
      name: "PadhoDost",
      url: "https://padhodost.com",
      logo: "https://padhodost.com/logo.svg",
      description:
        "100% free mock tests and visual explainers for SSC, Banking, Class 10 & 12 boards, JEE, NEET and UPSC.",
    },
    {
      "@type": "WebSite",
      "@id": "https://padhodost.com/#website",
      url: "https://padhodost.com",
      name: "PadhoDost",
      publisher: { "@id": "https://padhodost.com/#org" },
    },
  ],
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://padhodost.com"),
  alternates: { canonical: "/" },
  ...(adsenseClient ? { other: { "google-adsense-account": adsenseClient } } : {}),
  title: {
    default: "PadhoDost — Free Mock Tests & Visual Learning for Every Indian Student",
    template: "%s · PadhoDost",
  },
  description:
    "100% free mock tests and visual explainers for SSC CGL, Banking, Class 10 & 12 boards, JEE, NEET and UPSC. No paywalls, no spam calls. Padho, Dost!",
  keywords: [
    "free mock test",
    "SSC CGL mock test",
    "Class 10 CBSE",
    "JEE NEET preparation",
    "UPSC current affairs",
    "online study India",
  ],
  applicationName: "PadhoDost",
  authors: [{ name: "PadhoDost" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://padhodost.com",
    siteName: "PadhoDost",
    title: "PadhoDost — Free Mock Tests & Visual Learning for Every Indian Student",
    description:
      "100% free mock tests and visual explainers for SSC, Banking, Boards, JEE, NEET & UPSC. No paywalls, no spam calls.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PadhoDost — Free learning for every Indian student",
    description:
      "Free mock tests & visual explainers for SSC, Banking, Boards, JEE, NEET & UPSC. Padho, Dost!",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4f46e5",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${poppins.variable} antialiased`}>
      <head>
        {/*
          Applies a saved theme choice BEFORE first paint. Without this, a user
          who picked dark on a light-preference device sees a white flash on
          every navigation. Kept inline and tiny on purpose — it must run
          before the stylesheet paints. Mirrors apply() in ThemeToggle.tsx.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('pd_theme');if(t==='dark'||t==='light')document.documentElement.setAttribute('data-theme',t)}catch(e){}`,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground">
        <JsonLd data={siteJsonLd} />
        <Analytics />
        <AdScript />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
