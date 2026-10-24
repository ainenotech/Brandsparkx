import type { MetadataRoute } from "next";
import { pageSeo } from "@/content/seo";
import { SITE_URL } from "@/content/site";

/** Higher for the pages that sell; everything else defaults to 0.6. */
const priority: Record<string, number> = {
  "/": 1,
  "/solutions": 0.9,
  "/ai-voice-calling": 0.9,
  "/ai-engineers": 0.9,
  "/contact": 0.8,
};

/** Every indexable page from content/seo.ts (noindex pages such as placeholder legal text are left out). */
export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(pageSeo)
    .filter((page) => !("index" in page) || page.index !== false)
    .map((page) => ({
      url: `${SITE_URL}${page.path === "/" ? "" : page.path}`,
      lastModified: new Date(page.lastModified),
      changeFrequency: "monthly",
      priority: priority[page.path] ?? (page.path.startsWith("/solutions/") ? 0.8 : 0.6),
    }));
}
