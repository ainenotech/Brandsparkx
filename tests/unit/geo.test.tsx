import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "@/components/layout/Footer";
import { SITE_URL, site } from "@/content/site";
import { solutionHref, solutions } from "@/content/solutions";
import { llmsFullTxt, llmsTxt } from "@/lib/llms";
import { organizationJsonLd } from "@/lib/seo";

describe("canonical company description", () => {
  it("is the same sentence in the footer, Organization schema and llms.txt", () => {
    const { container } = render(<Footer />);
    expect(container).toHaveTextContent(site.description);
    expect(organizationJsonLd().description).toBe(site.description);
    expect(llmsTxt()).toContain(`> ${site.description}`);
    expect(llmsTxt()).toContain(site.about);
  });
});

describe("llms.txt", () => {
  const short = llmsTxt();
  const full = llmsFullTxt();

  it("starts with the company name as an H1 and the summary as a blockquote", () => {
    expect(short.startsWith(`# ${site.name}\n\n> `)).toBe(true);
  });

  it("lists every service with its canonical URL and a one-sentence description", () => {
    for (const s of solutions) {
      const line = short.split("\n").find((l) => l.includes(`(${SITE_URL}${solutionHref(s)})`));
      expect(line).toBeDefined();
      expect(line).toMatch(/\): [A-Z].{40,}\.$/);
    }
  });

  it("includes every office address and the main contact details", () => {
    for (const o of site.offices) expect(short).toContain(o.address);
    expect(short).toContain(site.email);
    expect(short).toContain(site.phone);
    expect(short).toContain(site.careers.email);
  });

  it("links to the full version, which has each service's steps and FAQs", () => {
    expect(short).toContain(`${SITE_URL}/llms-full.txt`);
    for (const s of solutions) expect(full).toContain(`### ${s.title}`);
    expect(full).toContain("How it works:");
    expect(full).toContain("- Q: What is an AI voice agent?");
  });

  it("never leaks internal TODO notes or non-www URLs", () => {
    for (const text of [short, full]) {
      expect(text).not.toMatch(/TODO/);
      expect(text).not.toMatch(/https?:\/\/brandsparkx\.com/);
    }
  });
});
