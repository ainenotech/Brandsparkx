import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import sitemap from "@/app/sitemap";

const sitemapEntries = sitemap();
const routes = sitemapEntries.map((e) => new URL(e.url).pathname);

test.describe("Accessibility Audits (serious / critical violations)", () => {
  for (const route of routes) {
    test(`accessibility check for ${route}`, async ({ page }) => {
      // Use reduced motion so scroll-reveal (.rv) elements are immediately at 100% resting opacity
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(route, { waitUntil: "domcontentloaded" });

      // Wait for entrance intro to clear
      await expect(page.locator("body")).not.toHaveClass(/brand-intro-active/, { timeout: 10000 });

      // Ensure all reveal elements are fully revealed
      await page.evaluate(() => {
        document.querySelectorAll(".rv").forEach((el) => el.classList.add("in"));
      });

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();

      const criticalViolations = results.violations.filter(
        (v) => v.impact === "serious" || v.impact === "critical",
      );

      if (criticalViolations.length > 0) {
        console.error(
          `[a11y violation on ${route}]`,
          JSON.stringify(
            criticalViolations.map((v) => ({
              id: v.id,
              impact: v.impact,
              description: v.description,
              nodes: v.nodes.map((n) => n.html),
            })),
            null,
            2,
          ),
        );
      }

      expect(
        criticalViolations,
        `Page ${route} has serious or critical a11y violations!`,
      ).toEqual([]);
    });
  }
});
