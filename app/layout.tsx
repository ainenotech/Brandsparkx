import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Manrope } from "next/font/google";
import Script from "next/script";
import { LazyFloatingControls } from "@/components/chat/LazyFloatingControls";
import { IconSprite } from "@/components/IconSprite";
import { JsonLd } from "@/components/JsonLd";
import { Footer } from "@/components/layout/Footer";
import { EntranceIntro } from "@/components/layout/EntranceIntro";
import { Header } from "@/components/layout/Header";
import { LegacyHashRedirect } from "@/components/layout/LegacyHashRedirect";
import { RevealObserver } from "@/components/layout/RevealObserver";
import { SITE_URL, site } from "@/content/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
  variable: "--font-manrope",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-inter",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "BrandSparkX | AI Growth & Automation Company in Dubai, UAE",
  description:
    "BrandSparkX helps businesses grow with AI through AI automation, AI marketing, AI sales, AI voice agents, business automation and AI engineering.",
  applicationName: site.name,
  formatDetection: { telephone: false },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${inter.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Without JavaScript, show scroll-reveal content immediately. */}
        <noscript>
          <style>{".rv{opacity:1!important;transform:none!important}"}</style>
        </noscript>
      </head>
      <body>
        <Script id="brand-intro-gate" strategy="beforeInteractive">
          {`try {
  if (!sessionStorage.getItem("brandsparkx-intro-played")) {
    const root = document.documentElement;
    root.dataset.brandIntroPending = "true";
    root.dataset.brandIntroFallback = String(
      window.setTimeout(() => {
        root.removeAttribute("data-brand-intro-pending");
        delete root.dataset.brandIntroFallback;
      }, 5500),
    );
  }
} catch {}`}
        </Script>
        <a href="#main" className="sr skip">
          Skip to content
        </a>
        <EntranceIntro />
        <IconSprite />
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <LazyFloatingControls />
        <RevealObserver />
        <LegacyHashRedirect />
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
      </body>
    </html>
  );
}
