"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { solutions } from "@/content/solutions";

const pages = [
  "solutions",
  "ai-voice-calling",
  "ai-engineers",
  "work",
  "about",
  "contact",
  "privacy",
  "terms",
];

/** Keeps links from the old single-page site (e.g. `/#/contact?i=AI%20Sales`) working. */
export function LegacyHashRedirect() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash.startsWith("#/")) return;

    const [path, query = ""] = hash.slice(2).split("?");
    const params = new URLSearchParams(query);
    let target = pages.includes(path) ? `/${path}` : "/";

    if (path === "solutions" && params.get("s")) {
      const match = solutions.find((s) => s.key === params.get("s"));
      if (match) target = `/solutions#${match.slug}`;
    }
    if (path === "contact" && params.get("i")) {
      target = `/contact?interest=${encodeURIComponent(params.get("i")!)}`;
    }
    router.replace(target);
  }, [router]);

  return null;
}
