import { expect, test, type Page } from "@playwright/test";

async function waitForIntro(page: Page) {
  await expect(page.locator("body")).not.toHaveClass(/brand-intro-active/, { timeout: 10000 });
}

test.describe("Contact Form E2E", () => {
  test("shows validation errors on blur for empty required fields and blocks submission", async ({
    page,
  }) => {
    await page.goto("/contact", { waitUntil: "domcontentloaded" });
    await waitForIntro(page);

    const nameInput = page.locator("#f-name");
    const emailInput = page.locator("#f-email");
    const heading = page.locator("h1");

    // Focus and click outside to trigger blur across all browser engines
    await nameInput.click();
    await heading.click();
    await expect(page.locator("#f-name-msg")).toBeVisible();

    // Focus email and click outside
    await emailInput.click();
    await heading.click();
    await expect(page.locator("#f-email-msg")).toBeVisible();

    // Submit invalid form
    const submitBtn = page.locator("button[type='submit']");
    await submitBtn.click();

    // Verify error banner is shown
    await expect(page.locator("div.fstate.e.show")).toBeVisible();
    await expect(page.locator("div.fstate.s.show")).not.toBeVisible();
  });

  test("fills contact form happy path and submits to the Apps Script endpoint", async ({
    page,
  }) => {
    let body: Record<string, unknown> | null = null;
    await page.route("https://script.google.com/**", async (route) => {
      body = JSON.parse(route.request().postData() ?? "{}");
      await route.fulfill({ contentType: "application/json", body: '{"ok":true}' });
    });

    await page.goto("/contact", { waitUntil: "domcontentloaded" });
    await waitForIntro(page);

    await page.fill("#f-name", "Johnathan Smith");
    await page.fill("#f-company", "Acme Logistics");
    await page.fill("#f-email", "john@acme.ae");
    await page.fill("#f-phone", "+971 55 123 4567");
    await page.fill("#f-website", "https://acme.ae");
    await page.locator("label", { hasText: "AI Voice & Calling" }).click();
    await page.fill(
      "#f-message",
      "We need an AI voice receptionist to answer customer service inquiries 24/7.",
    );

    const submitBtn = page.locator("button[type='submit']");
    await submitBtn.click();

    // Status banner is displayed
    const statusBanner = page.locator("div.fstate.s.show");
    await expect(statusBanner).toBeVisible();
    await expect(statusBanner).toContainText("Thank you!");

    expect(body).toMatchObject({
      name: "Johnathan Smith",
      company: "Acme Logistics",
      services: ["AI Voice & Calling"],
      hp: "",
    });
  });

  test("preselects the interest checkbox from ?interest= query param", async ({ page }) => {
    await page.goto("/contact?interest=AI%20Voice%20%26%20Calling", {
      waitUntil: "domcontentloaded",
    });
    await waitForIntro(page);

    const voiceCheckbox = page.locator("input[name='interest'][value='AI Voice & Calling']");
    await expect(voiceCheckbox).toBeChecked();

    const otherCheckbox = page.locator("input[name='interest'][value='AI Growth']");
    await expect(otherCheckbox).not.toBeChecked();
  });
});
