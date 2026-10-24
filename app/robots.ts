import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

/**
 * AI search and assistant crawlers named explicitly so the intent is clear (and survives a
 * future tightening of the "*" rule). All may crawl the whole public site.
 */
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: aiCrawlers, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
