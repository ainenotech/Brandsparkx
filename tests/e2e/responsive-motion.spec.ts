import { expect, test } from "@playwright/test";
import sitemap from "@/app/sitemap";

const sitemapEntries = sitemap();
const routes = sitemapEntries.map((e) => new URL(e.url).pathname);

test.describe("Responsive - No Horizontal Overflow at 375px", () => {
  for (const route of routes) {
    test(`no horizontal scroll on ${route} at 375px viewport`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(route, { waitUntil: "domcontentloaded" });

      const hasHorizontalScroll = await page.evaluate(() => {
        const scrollingElement = document.scrollingElement || document.documentElement;
        return scrollingElement.scrollWidth > window.innerWidth;
      });

      expect(
        hasHorizontalScroll,
        `Page ${route} has horizontal scroll at 375px width!`,
      ).toBe(false);
    });
  }
});

test.describe("Hero Ribbon Animation & Reduced Motion", () => {
  test("hero ribbon is visible and animating under normal motion", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const ribbon = page.locator(".hero-ribbon");
    await expect(ribbon).toBeVisible();

    const track = page.locator(".hero-ribbon-track");
    await expect(track).toBeVisible();

    const animationName = await track.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.animationName;
    });

    expect(animationName).toBe("ribbonScroll");
  });

  test("hero ribbon track is static when prefers-reduced-motion is reduce", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const track = page.locator(".hero-ribbon-track");
    await expect(track).toBeVisible();

    const animationName = await track.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.animationName;
    });

    expect(animationName).toBe("none");
  });
});
