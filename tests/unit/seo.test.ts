import { describe, expect, it } from "vitest";
import {
  breadcrumbJsonLd,
  organizationJsonLd,
  pageMetadata,
  serviceJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import { SITE_URL, site } from "@/content/site";

describe("lib/seo", () => {
  describe("pageMetadata", () => {
    it("builds correct canonical URLs and absolute titles", () => {
      const meta = pageMetadata({
        title: "Test Page | BrandSparkX",
        description: "Test description for SEO",
        path: "/solutions",
      });

      expect(meta.title).toEqual({ absolute: "Test Page | BrandSparkX" });
      expect(meta.description).toBe("Test description for SEO");
      expect(meta.alternates?.canonical).toBe("/solutions");
      expect(meta.openGraph?.title).toBe("Test Page | BrandSparkX");
      expect(meta.openGraph?.url).toBe("/solutions");
      expect(meta.openGraph?.siteName).toBe(site.name);
      expect(meta.twitter?.title).toBe("Test Page | BrandSparkX");
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
