import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FaqSection } from "@/components/FaqSection";
import { faqs, type FaqPage } from "@/content/faqs";
import { solutions } from "@/content/solutions";
import { faqAnswerText } from "@/lib/seo";

const pages = Object.entries(faqs) as [FaqPage, (typeof faqs)[FaqPage]][];
const words = (s: string) => s.trim().split(/\s+/).length;

describe("content/faqs", () => {
  it.each(pages)("%s has 4–6 unique questions", (_, items) => {
    expect(items.length).toBeGreaterThanOrEqual(4);
    expect(items.length).toBeLessThanOrEqual(6);
    expect(new Set(items.map((f) => f.q)).size).toBe(items.length);
  });

  it.each(pages.flatMap(([page, items]) => items.map((f) => [page, f.q, f.a] as const)))(
    "%s › %s: direct answer is 40–60 words",
    (_, __, answer) => {
      expect(words(answer)).toBeGreaterThanOrEqual(40);
      expect(words(answer)).toBeLessThanOrEqual(60);
    },
  );

  it("covers home, every solution page, contact and careers", () => {
    for (const s of solutions) expect(faqs[s.slug as FaqPage]).toBeDefined();
    expect(faqs.home && faqs.contact && faqs.careers).toBeTruthy();
  });
});

describe("FaqSection", () => {
  it.each(pages)(
    "%s: FAQPage schema matches the visible questions and answers exactly",
    (_, items) => {
      const { container } = render(<FaqSection items={items} />);
      const schema = JSON.parse(
        container.querySelector('script[type="application/ld+json"]')!.innerHTML,
      );
      expect(schema["@type"]).toBe("FAQPage");

      const details = [...container.querySelectorAll("details")];
      expect(details).toHaveLength(items.length);
      details.forEach((d, i) => {
        const question = d.querySelector("summary h3")!.textContent;
        const answer = [...d.querySelectorAll(".faq-a p")].map((p) => p.textContent).join(" ");
        expect(schema.mainEntity[i].name).toBe(question);
        expect(schema.mainEntity[i].acceptedAnswer.text).toBe(answer);
        expect(answer).toBe(faqAnswerText(items[i]));
      });
    },
  );

  it("keeps every answer in the HTML even when its accordion is closed", () => {
    const { container } = render(<FaqSection items={faqs["ai-sales"]} />);
    const closed = [...container.querySelectorAll("details:not([open])")];
    expect(closed.length).toBeGreaterThan(0);
    for (const d of closed)
      expect(d.querySelector(".faq-a p")!.textContent!.length).toBeGreaterThan(0);
  });
});

describe("solution definitions", () => {
  it.each(solutions.map((s) => [s.slug, s.definition] as const))(
    "%s: 'What is …?' definition is 2–3 sentences",
    (_, definition) => {
      const sentences = definition.split(/(?<=[.!?])\s+/).filter(Boolean);
      expect(sentences.length).toBeGreaterThanOrEqual(2);
      expect(sentences.length).toBeLessThanOrEqual(3);
    },
  );
});
