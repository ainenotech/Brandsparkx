import { expect, test } from "@playwright/test";
import { solutionHref, solutions } from "@/content/solutions";

const routes = [
  "/",
  "/about",
  "/ai-engineers",
  "/ai-voice-calling",
  "/careers",
  "/contact",
  "/privacy",
  "/terms",
  "/solutions",
  "/work",
  ...solutions.map(solutionHref).filter((href) => href.startsWith("/solutions/")),
];

const widths = [320, 375, 768, 1024, 1440, 1920];

test.describe("No horizontal overflow", () => {
  for (const route of routes) {
    test(`${route} fits every width`, async ({ page }) => {
      // Viewports are set per check, so one Chromium and one WebKit project are enough.
      // WebKit matters: iOS Safari lets the page scroll sideways even with overflow-x hidden on body.
      const project = test.info().project.name;
      test.skip(
        project !== "Desktop Chrome" && project !== "Mobile Safari (iPhone 13)",
        "Runs in Desktop Chrome and Mobile Safari only",
      );
      test.setTimeout(60000);
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.goto(route, { waitUntil: "load" });
      // The entrance animation hides all overflow while it plays, so measure after it ends.
      await expect(page.locator("html")).not.toHaveAttribute("data-brand-intro-pending", /.*/, {
        timeout: 10000,
      });

      for (const width of widths) {
        await page.setViewportSize({ width, height: 900 });
        const { scrollWidth, innerWidth } = await page.evaluate(() => {
          // body hides horizontal overflow, which would mask a real problem; measure without it.
          document.body.style.overflowX = "visible";
          const result = {
            scrollWidth: document.documentElement.scrollWidth,
            innerWidth: window.innerWidth,
          };
          document.body.style.overflowX = "";
          return result;
        });
        expect(scrollWidth, `${route} at ${width}px`).toBeLessThanOrEqual(innerWidth);
      }
    });
  }
});
