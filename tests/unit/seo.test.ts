import { describe, expect, it } from "vitest";
import { pageSeo, type PageKey } from "@/content/seo";
import { SITE_URL, site } from "@/content/site";
import { solutions } from "@/content/solutions";
import { team } from "@/content/team";
import {
  breadcrumbJsonLd,
  leadershipJsonLd,
  officesJsonLd,
  organizationJsonLd,
  pageMetadata,
  serviceJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

const entries = Object.entries(pageSeo) as [PageKey, (typeof pageSeo)[PageKey]][];

describe("content/seo", () => {
  it("uses the www canonical origin", () => {
    expect(SITE_URL).toBe("https://www.brandsparkx.com");
  });

  it.each(entries)("%s: title ≤ 60 chars ending in '| BrandSparkX'", (_, page) => {
    expect(page.title.length).toBeLessThanOrEqual(60);
    expect(page.title).toMatch(/\| BrandSparkX$/);
  });

  it.each(entries)("%s: description is 140–160 chars", (_, page) => {
    expect(page.description.length).toBeGreaterThanOrEqual(140);
    expect(page.description.length).toBeLessThanOrEqual(160);
  });

  it("has a unique title and description for every page", () => {
    const titles = entries.map(([, p]) => p.title);
    const descriptions = entries.map(([, p]) => p.description);
    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });

  it("covers every solution page", () => {
    for (const s of solutions) {
      const path = s.page ?? `/solutions/${s.slug}`;
      expect(entries.some(([, p]) => p.path === path)).toBe(true);
    }
  });
});

describe("lib/seo", () => {
  describe("pageMetadata", () => {
    it("builds the canonical, Open Graph and Twitter tags from content/seo", () => {
      const meta = pageMetadata("solutions");

      expect(meta.title).toEqual({ absolute: pageSeo.solutions.title });
      expect(meta.description).toBe(pageSeo.solutions.description);
      expect(meta.alternates?.canonical).toBe("/solutions");
      expect(meta.robots).toEqual({ index: true, follow: true });
      expect(meta.openGraph?.title).toBe(pageSeo.solutions.title);
      expect(meta.openGraph?.url).toBe("/solutions");
      expect(meta.openGraph?.siteName).toBe(site.name);
      expect(meta.openGraph?.images).toEqual([expect.objectContaining({ url: "/og/solutions" })]);
      expect(meta.twitter?.title).toBe(pageSeo.solutions.title);
    });

    it("marks placeholder legal pages noindex", () => {
      expect(pageMetadata("privacy").robots).toEqual({ index: false, follow: true });
      expect(pageMetadata("terms").robots).toEqual({ index: false, follow: true });
    });
  });

  describe("JSON-LD builders", () => {
    it("builds valid organization structured data", () => {
      const org = organizationJsonLd();
      expect(org["@context"]).toBe("https://schema.org");
      expect(org["@type"]).toBe("Organization");
      expect(org.name).toBe(site.name);
      expect(org.url).toBe(SITE_URL);
    });

    it("builds valid website structured data", () => {
      const web = websiteJsonLd();
      expect(web["@context"]).toBe("https://schema.org");
      expect(web["@type"]).toBe("WebSite");
      expect(web.url).toBe(SITE_URL);
    });

    it("builds valid service structured data with absolute URL", () => {
      const service = serviceJsonLd(
        "AI Voice & Calling",
        "AI voice description",
        "/ai-voice-calling",
      );
      expect(service["@context"]).toBe("https://schema.org");
      expect(service["@type"]).toBe("Service");
      expect(service.name).toBe("AI Voice & Calling");
      expect(service.url).toBe(`${SITE_URL}/ai-voice-calling`);
    });

    it("gives the organization a logo, contact details and office references, but no empty sameAs", () => {
      const org = organizationJsonLd();
      expect(org["@id"]).toBe(`${SITE_URL}/#organization`);
      expect(org.logo).toEqual(expect.objectContaining({ "@type": "ImageObject" }));
      expect(org.email).toBe("business@brandsparkx.com");
      expect(org.telephone).toBe("+971 55 996 3778");
      expect(org.location).toHaveLength(site.offices.length);
      if (site.socials.length === 0) expect(org).not.toHaveProperty("sameAs");
    });

    it("describes each office with the exact address shown on the site", () => {
      const offices = officesJsonLd();
      expect(offices).toHaveLength(4);
      offices.forEach((office, i) => {
        const o = site.offices[i];
        expect(office["@type"]).toBe("ProfessionalService");
        expect(office["@id"]).toBe(`${SITE_URL}/contact#office-${o.locality.toLowerCase()}`);
        expect(office.address).toEqual(
          expect.objectContaining({
            streetAddress: o.streetAddress,
            addressLocality: o.locality,
            addressCountry: o.country,
          }),
        );
        // Every part of the structured address appears in the visible address text.
        for (const part of [o.streetAddress, o.locality, o.region, o.postalCode].filter(Boolean)) {
          expect(o.address).toContain(part);
        }
        expect(office.hasMap).toContain(encodeURIComponent(o.address));
        expect(office.parentOrganization).toEqual({ "@id": `${SITE_URL}/#organization` });
      });
    });

    it("adds opening hours to an office only once they are filled in", () => {
      expect(officesJsonLd()[0]).not.toHaveProperty("openingHoursSpecification");

      const hours = site.offices[0].hours as unknown as {
        days: string[];
        opens: string;
        closes: string;
      }[];
      hours.push({ days: ["Monday", "Friday"], opens: "09:00", closes: "18:00" });
      try {
        expect(officesJsonLd()[0].openingHoursSpecification).toEqual([
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Friday"],
            opens: "09:00",
            closes: "18:00",
          },
        ]);
      } finally {
        hours.length = 0;
      }
    });

    it("adds Person entries only for the leadership, using what the site shows", () => {
      const people = leadershipJsonLd(team);
      expect(people.map((p) => p.name)).toEqual(["Krishna Patil", "Tirth Patel"]);
      expect(people[1].jobTitle).toBe("Partner & CTO");
      expect(people[0].worksFor).toEqual({ "@id": `${SITE_URL}/#organization` });
      expect(people[0].image).toBe(`${SITE_URL}/team/krishna-patil.webp`);
    });

    it("never emits review, rating or job posting types", () => {
      const all = JSON.stringify([
        organizationJsonLd(),
        websiteJsonLd(),
        officesJsonLd(),
        serviceJsonLd("AI Sales", "x", "/solutions/ai-sales"),
        leadershipJsonLd(team),
      ]);
      expect(all).not.toMatch(/AggregateRating|"Review"|JobPosting/);
    });

    it("builds valid breadcrumb structured data with 1-based positions", () => {
      const trail = [
        { name: "Home", path: "/" },
        { name: "Solutions", path: "/solutions" },
      ];
      const breadcrumbs = breadcrumbJsonLd(trail);
      expect(breadcrumbs["@context"]).toBe("https://schema.org");
      expect(breadcrumbs["@type"]).toBe("BreadcrumbList");
      expect(breadcrumbs.itemListElement).toHaveLength(2);
      expect(breadcrumbs.itemListElement[0]).toEqual({
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}`,
      });
      expect(breadcrumbs.itemListElement[1]).toEqual({
        "@type": "ListItem",
        position: 2,
        name: "Solutions",
        item: `${SITE_URL}/solutions`,
      });
    });
  });
});
