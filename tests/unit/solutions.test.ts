import { describe, expect, it } from "vitest";
import {
  contactHref,
  solutionHref,
  solutions,
} from "@/content/solutions";

describe("content/solutions", () => {
  it("has 'AI Voice & Calling' as the very first solution", () => {
    expect(solutions[0].title).toBe("AI Voice & Calling");
    expect(solutions[0].slug).toBe("ai-voice-calling");
    expect(solutions[0].key).toBe("voice");
  });

  it("ensures every solution has a unique slug", () => {
    const slugs = solutions.map((s) => s.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  it("ensures every solution has a unique legacy key", () => {
    const keys = solutions.map((s) => s.key);
    const uniqueKeys = new Set(keys);
    expect(uniqueKeys.size).toBe(keys.length);
  });

  describe("solutionHref", () => {
    it("returns dedicated page when s.page is defined", () => {
      const voice = solutions.find((s) => s.slug === "ai-voice-calling")!;
      expect(solutionHref(voice)).toBe("/ai-voice-calling");

      const engineers = solutions.find((s) => s.slug === "ai-engineers")!;
      expect(solutionHref(engineers)).toBe("/ai-engineers");
    });

    it("returns /solutions/[slug] when no dedicated page is defined", () => {
      const growth = solutions.find((s) => s.slug === "ai-growth")!;
      expect(solutionHref(growth)).toBe("/solutions/ai-growth");
    });
  });

  describe("contactHref", () => {
    it("returns /contact when no interest is provided", () => {
      expect(contactHref()).toBe("/contact");
      expect(contactHref("")).toBe("/contact");
    });

    it("correctly encodes '&' and spaces for 'AI Voice & Calling'", () => {
      const href = contactHref("AI Voice & Calling");
      expect(href).toBe("/contact?interest=AI%20Voice%20%26%20Calling");
      expect(href).toContain("%26");
      expect(href).not.toContain("&Calling");
    });

    it("correctly encodes other interests", () => {
      expect(contactHref("AI Growth")).toBe("/contact?interest=AI%20Growth");
      expect(contactHref("AI Engineers")).toBe("/contact?interest=AI%20Engineers");
    });
  });
});
