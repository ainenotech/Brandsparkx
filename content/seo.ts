/**
 * Search metadata for every route, in one place. lib/seo.ts turns an entry into the page's
 * <title>, description, canonical, Open Graph and Twitter tags; app/sitemap.ts lists the
 * indexable entries; app/og/[key] draws each page's social-share image.
 *
 * Rules (checked by tests/unit/seo.test.ts): title ≤ 60 characters and ends with
 * "| BrandSparkX"; description 140–160 characters. Update `lastModified` when a page's content
 * changes meaningfully.
 */

export type PageSeo = {
  /** Path starting with "/". */
  path: string;
  /** Full <title>, used as-is. */
  title: string;
  description: string;
  /** Short heading drawn on the page's Open Graph image. */
  ogTitle: string;
  /** ISO date of the last meaningful content change (used in the sitemap). */
  lastModified: string;
  /** false = noindex and left out of the sitemap (e.g. placeholder legal pages). */
  index?: boolean;
};

const UPDATED = "2026-10-24";

export const pageSeo = {
  home: {
    path: "/",
    title: "AI Growth & Automation Company in Dubai | BrandSparkX",
    description:
      "BrandSparkX helps businesses in Dubai and the UAE grow with AI: voice agents that answer and book calls, sales and marketing automation, and AI engineers.",
    ogTitle: "Build. Automate. Grow with AI.",
    lastModified: UPDATED,
  },
  solutions: {
    path: "/solutions",
    title: "AI Solutions & Automation Services in Dubai | BrandSparkX",
    description:
      "Explore seven AI solutions from BrandSparkX in Dubai: AI voice agents, AI sales, marketing, content, growth strategy, business automation and AI engineers.",
    ogTitle: "AI solutions for growing businesses",
    lastModified: UPDATED,
  },
  "ai-voice-calling": {
    path: "/ai-voice-calling",
    title: "AI Voice Agents & AI Calling in Dubai | BrandSparkX",
    description:
      "AI voice agents for businesses in Dubai and the UAE that answer inbound calls, make outbound calls, qualify leads and book appointments around the clock.",
    ogTitle: "AI voice agents that answer, qualify and book",
    lastModified: UPDATED,
  },
  "ai-engineers": {
    path: "/ai-engineers",
    title: "AI Engineers on Demand in Dubai & India | BrandSparkX",
    description:
      "Hire AI engineers and developers on demand from BrandSparkX in Dubai and Bengaluru, by project, week or month, to build AI agents, automation and integrations.",
    ogTitle: "AI engineers on demand",
    lastModified: UPDATED,
  },
  "ai-growth": {
    path: "/solutions/ai-growth",
    title: "AI Growth Strategy & Roadmap in Dubai | BrandSparkX",
    description:
      "Find where AI creates the most value in your business. BrandSparkX builds practical AI strategies and roadmaps for companies in Dubai and across the UAE.",
    ogTitle: "Turn AI into a growth strategy",
    lastModified: UPDATED,
  },
  "ai-content": {
    path: "/solutions/ai-content",
    title: "AI Content Creation Services in Dubai | BrandSparkX",
    description:
      "An AI-powered content engine for social media, video, copy and campaigns. BrandSparkX helps businesses in Dubai and the UAE create more content in less time.",
    ogTitle: "Create more content. Work less.",
    lastModified: UPDATED,
  },
  "ai-marketing": {
    path: "/solutions/ai-marketing",
    title: "AI Marketing Automation in Dubai | BrandSparkX",
    description:
      "Automate lead generation, nurturing, CRM and WhatsApp workflows with AI. BrandSparkX builds AI marketing automation for businesses in Dubai and across the UAE.",
    ogTitle: "Make marketing more intelligent",
    lastModified: UPDATED,
  },
  "ai-sales": {
    path: "/solutions/ai-sales",
    title: "AI Sales Automation & Lead Follow-Up in Dubai | BrandSparkX",
    description:
      "Use AI to qualify leads, follow up on time and move every opportunity forward. BrandSparkX builds AI sales automation for businesses in Dubai and the UAE.",
    ogTitle: "Turn leads into conversations",
    lastModified: UPDATED,
  },
  "business-automation": {
    path: "/solutions/business-automation",
    title: "Business Process Automation in Dubai | BrandSparkX",
    description:
      "Connect your people, tools and data so repetitive work runs on its own. BrandSparkX builds AI-powered business automation for companies in Dubai and the UAE.",
    ogTitle: "Connect your business. Automate the work.",
    lastModified: UPDATED,
  },
  work: {
    path: "/work",
    title: "AI Use Cases & Examples | BrandSparkX",
    description:
      "Example use cases showing how BrandSparkX applies AI voice agents, sales follow-up and business automation to real business problems, from challenge to fix.",
    ogTitle: "AI applied to real business problems",
    lastModified: UPDATED,
  },
  about: {
    path: "/about",
    title: "About Us: AI Growth & Automation Team | BrandSparkX",
    description:
      "Meet BrandSparkX, an AI growth and automation company with teams in Dubai and Bengaluru, bringing strategy, engineering and delivery together for your business.",
    ogTitle: "People behind the intelligence",
    lastModified: UPDATED,
  },
  careers: {
    path: "/careers",
    title: "Careers in AI, Marketing & Sales | BrandSparkX",
    description:
      "Careers at BrandSparkX in Dubai and Bengaluru. Explore AI, marketing, sales and business development teams, and apply online with your CV in a few minutes.",
    ogTitle: "Build what's next. Grow beyond limits.",
    lastModified: UPDATED,
  },
  contact: {
    path: "/contact",
    title: "Contact Us: AI Automation in Dubai | BrandSparkX",
    description:
      "Talk to BrandSparkX about AI voice agents, automation or AI engineers. Offices in Dubai, Bengaluru, the United States and Gandhinagar. Call +971 55 996 3778.",
    ogTitle: "Let's build your growth system",
    lastModified: UPDATED,
  },
  // Placeholder legal pages: kept out of search until the reviewed text is published.
  privacy: {
    path: "/privacy",
    title: "Privacy Policy | BrandSparkX",
    description:
      "How BrandSparkX collects, uses and protects personal information shared through this website, including contact and careers forms, and how to reach us about it.",
    ogTitle: "Privacy Policy",
    lastModified: UPDATED,
    index: false,
  },
  terms: {
    path: "/terms",
    title: "Terms & Conditions | BrandSparkX",
    description:
      "The terms and conditions for using the BrandSparkX website and its content, and how to contact BrandSparkX with any questions about them or about our services.",
    ogTitle: "Terms & Conditions",
    lastModified: UPDATED,
    index: false,
  },
} as const satisfies Record<string, PageSeo>;

export type PageKey = keyof typeof pageSeo;
