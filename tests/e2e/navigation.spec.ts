import { expect, test, type Page } from "@playwright/test";
import { site } from "@/content/site";

async function waitForIntro(page: Page) {
  await expect(page.locator("body")).not.toHaveClass(/brand-intro-active/, { timeout: 10000 });
}

test.describe("Header Navigation", () => {
  test("header links navigate to correct pages", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await waitForIntro(page);

    const primaryNav = page.locator("header nav.nav");
    const isVisible = await primaryNav.isVisible();

    if (isVisible) {
      // Test desktop links
      await primaryNav.getByRole("link", { name: "AI Voice & Calling" }).click();
      await page.waitForURL("**/ai-voice-calling");
      expect(page.url()).toContain("/ai-voice-calling");

      await primaryNav.getByRole("link", { name: "AI Engineers" }).click();
      await page.waitForURL("**/ai-engineers");
      expect(page.url()).toContain("/ai-engineers");

      await primaryNav.getByRole("link", { name: "Case Studies" }).click();
      await page.waitForURL("**/work");
      expect(page.url()).toContain("/work");

      await primaryNav.getByRole("link", { name: "Solutions" }).click();
      await page.waitForURL("**/solutions");
      expect(page.url()).toContain("/solutions");

      await primaryNav.getByRole("link", { name: "Contact Us" }).click();
      await page.waitForURL("**/contact");
      expect(page.url()).toContain("/contact");
    }
  });

  test("mobile menu opens, closes, and closes on link click", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile menu test is only applicable on mobile viewports");

    await page.goto("/", { waitUntil: "domcontentloaded" });
    await waitForIntro(page);

    const burger = page.locator("button.burger");
    await expect(burger).toBeVisible();

    // Open mobile menu
    await burger.click();
    await expect(page.locator("body")).toHaveClass(/menu-open/);
    await expect(burger).toHaveAttribute("aria-expanded", "true");

    // Close with burger
    await burger.click();
    await expect(page.locator("body")).not.toHaveClass(/menu-open/);
    await expect(burger).toHaveAttribute("aria-expanded", "false");

    // Reopen and navigate
    await burger.click();
    await expect(page.locator("body")).toHaveClass(/menu-open/);

    const mobileLink = page.locator("#mnav a[href='/about']");
    await mobileLink.click();
    await page.waitForURL("**/about");
    expect(page.url()).toContain("/about");
    await expect(page.locator("body")).not.toHaveClass(/menu-open/);
  });
});

test.describe("Solutions Page Layout & Jump Links", () => {
  test("solutions page renders 'Our services' before row 01 and 01 is AI Voice & Calling", async ({
    page,
  }) => {
    await page.goto("/solutions", { waitUntil: "domcontentloaded" });
    await waitForIntro(page);

    const ourServicesKicker = page.locator(".kicker", { hasText: "Our services" });
    await expect(ourServicesKicker).toBeVisible();

    const firstRow = page.locator(".slist .srow").first();
    const firstRowNumber = firstRow.locator(".num");
    const firstRowTitle = firstRow.locator("h2");

    await expect(firstRowNumber).toHaveText("01");
    await expect(firstRowTitle).toHaveText("AI Voice & Calling");

    // Verify 'Our services' appears before row 01 in DOM order
    const kickerBox = await ourServicesKicker.boundingBox();
    const firstRowBox = await firstRow.boundingBox();
    expect(kickerBox).not.toBeNull();
    expect(firstRowBox).not.toBeNull();
    expect(kickerBox!.y).toBeLessThan(firstRowBox!.y);
  });

  test("jump links scroll to the corresponding solution section", async ({ page }) => {
    await page.goto("/solutions", { waitUntil: "domcontentloaded" });
    await waitForIntro(page);

    const jumpNav = page.locator("nav.jump");
    await expect(jumpNav).toBeVisible();

    const voiceJumpLink = jumpNav.locator("a[href='#ai-voice-calling']");
    await expect(voiceJumpLink).toBeVisible();
    await voiceJumpLink.click();

    // Check target element #ai-voice-calling is in view
    const targetSection = page.locator("#ai-voice-calling");
    await expect(targetSection).toBeVisible();
  });
});

test.describe("Footer Links Verification", () => {
  test("footer phone, mailto, and WhatsApp links have correct hrefs", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await waitForIntro(page);

    const footer = page.locator("footer.ftr");
    await expect(footer).toBeVisible();

    // WhatsApp link
    const waLink = footer.locator(`a[href="${site.whatsappHref}"]`).first();
    await expect(waLink).toBeVisible();
    expect(await waLink.getAttribute("target")).toBe("_blank");

    // Contact Phone & Email
    const phoneLink = footer.locator(`a[href="${site.phoneHref}"]`).first();
    await expect(phoneLink).toBeVisible();

    const emailLink = footer.locator(`a[href="mailto:${site.email}"]`).first();
    await expect(emailLink).toBeVisible();

    // Careers Phone & Email
    const careersPhoneLink = footer.locator(`a[href="${site.careers.phoneHref}"]`).first();
    await expect(careersPhoneLink).toBeVisible();

    const careersEmailLink = footer.locator(`a[href="mailto:${site.careers.email}"]`).first();
    await expect(careersEmailLink).toBeVisible();
  });
});
