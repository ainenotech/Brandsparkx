import { expect, test } from "@playwright/test";
import sitemap from "@/app/sitemap";

const sitemapEntries = sitemap();
const routes = sitemapEntries.map((e) => {
  const url = new URL(e.url);
  return url.pathname;
});

test.describe("Sitemap Routes & Content Verification", () => {
  for (const route of routes) {
    test(`route ${route} returns 200, has <title>, one <h1>, and no console errors`, async ({
      page,
    }) => {
      const consoleErrors: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") {
          consoleErrors.push(msg.text());
        }
      });

      const response = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(response?.status()).toBe(200);

      // Check title
      const title = await page.title();
      expect(title.length).toBeGreaterThan(0);
      expect(title).toContain("BrandSparkX");

      // Check single <h1> per page
      const h1Count = await page.locator("h1").count();
      expect(h1Count).toBe(1);

      // Check console errors
      expect(consoleErrors).toEqual([]);
    });
  }
});

test.describe("Redirects & 404 Handling", () => {
  test("/services redirects permanently (308) to /solutions", async ({ page }) => {
    const response = await page.goto("/services", { waitUntil: "domcontentloaded" });
    expect(page.url()).toContain("/solutions");
    // Verify redirect chain
    const request = response?.request();
    const redirectedFrom = request?.redirectedFrom();
    expect(redirectedFrom).not.toBeNull();
    const status = (await redirectedFrom?.response())?.status();
    expect([301, 307, 308]).toContain(status);
  });

  test("/solutions/ai-voice-calling redirects to /ai-voice-calling", async ({ page }) => {
    await page.goto("/solutions/ai-voice-calling", { waitUntil: "domcontentloaded" });
    expect(page.url()).toContain("/ai-voice-calling");
    expect(page.url()).not.toContain("/solutions/ai-voice-calling");
  });

  test("/solutions/ai-engineers redirects to /ai-engineers", async ({ page }) => {
    await page.goto("/solutions/ai-engineers", { waitUntil: "domcontentloaded" });
    expect(page.url()).toContain("/ai-engineers");
    expect(page.url()).not.toContain("/solutions/ai-engineers");
  });

  test("unknown URL shows 404 page", async ({ page }) => {
    const response = await page.goto("/unknown-page-path-12345", {
      waitUntil: "domcontentloaded",
    });
    expect(response?.status()).toBe(404);
    const bodyText = await page.textContent("body");
    expect(bodyText).toContain("404");
  });
});

test.describe("Internal Broken Links Crawl", () => {
  test("crawls internal links and asserts no broken 404 links", async ({ page }) => {
    const visited = new Set<string>();
    const queue: string[] = ["/", "/solutions", "/work", "/about", "/contact"];

    while (queue.length > 0) {
      const current = queue.shift()!;
      if (visited.has(current)) continue;
      visited.add(current);

      const res = await page.goto(current, { waitUntil: "domcontentloaded" });
      expect(res?.status()).toBeLessThan(400);

      // Collect links on current page
      const hrefs = await page.$$eval("a[href]", (elements) =>
        elements
          .map((el) => el.getAttribute("href") || "")
          .filter(
            (href) =>
              href.startsWith("/") &&
              !href.startsWith("//") &&
              !href.startsWith("/#") &&
              !href.includes("#"),
          ),
      );

      for (const href of hrefs) {
        // Clean query strings for crawl check
        const cleanPath = href.split("?")[0];
        if (!visited.has(cleanPath) && !queue.includes(cleanPath)) {
          queue.push(cleanPath);
        }
      }
    }
  });
});
