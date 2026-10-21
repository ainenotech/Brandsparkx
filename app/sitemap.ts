import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";
import { solutions } from "@/content/solutions";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/solutions", priority: 0.9 },
    { path: "/ai-voice-calling", priority: 0.9 },
    { path: "/ai-engineers", priority: 0.9 },
    ...solutions
      .filter((s) => !s.page)
      .map((s) => ({ path: `/solutions/${s.slug}`, priority: 0.8 })),
    { path: "/work", priority: 0.6 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.7 },
  ];
  return pages.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: p.priority,
  }));
}
