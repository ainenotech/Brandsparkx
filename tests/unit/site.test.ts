import { describe, expect, it } from "vitest";
import { nav, site } from "@/content/site";

describe("content/site", () => {
  describe("nav links", () => {
    it("has no duplicate hrefs", () => {
      const hrefs = nav.map((item) => item.href);
      const uniqueHrefs = new Set(hrefs);
      expect(uniqueHrefs.size).toBe(hrefs.length);
    });

    it("has no legacy '/services' link", () => {
      const hasServices = nav.some((item) => (item.href as string) === "/services");
      expect(hasServices).toBe(false);
    });
  });

  describe("contact numbers and href matching", () => {
    const cleanDigits = (str: string) => str.replace(/\D/g, "");

    it("matches site phoneHref with displayed phone number", () => {
      const phoneDigits = cleanDigits(site.phone);
      const hrefDigits = cleanDigits(site.phoneHref);
      expect(site.phoneHref.startsWith("tel:")).toBe(true);
      expect(hrefDigits).toBe(phoneDigits);
    });

    it("matches site whatsappHref with displayed phone number", () => {
      const phoneDigits = cleanDigits(site.phone);
      const waDigits = cleanDigits(site.whatsappHref);
      expect(site.whatsappHref.startsWith("https://wa.me/")).toBe(true);
      expect(waDigits).toBe(phoneDigits);
    });

    it("matches careers phoneHref with displayed careers phone number", () => {
      const phoneDigits = cleanDigits(site.careers.phone);
      const hrefDigits = cleanDigits(site.careers.phoneHref);
      expect(site.careers.phoneHref.startsWith("tel:")).toBe(true);
      expect(hrefDigits).toBe(phoneDigits);
    });

    it("matches office phoneHref with displayed office phone for each office", () => {
      for (const office of site.offices) {
        const phoneDigits = cleanDigits(office.phone);
        const hrefDigits = cleanDigits(office.phoneHref);
        expect(office.phoneHref.startsWith("tel:")).toBe(true);
        expect(hrefDigits).toBe(phoneDigits);
      }
    });
  });
});
