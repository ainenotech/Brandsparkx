# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y.spec.ts >> Accessibility Audits (serious / critical violations) >> accessibility check for /about
- Location: tests\e2e\a11y.spec.ts:10:9

# Error details

```
Error: Page /about has serious or critical a11y violations!

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 58

- Array []
+ Array [
+   Object {
+     "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
+     "help": "Elements must meet minimum color contrast ratio thresholds",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.14/color-contrast?application=playwright",
+     "id": "color-contrast",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#f3f3f5",
+               "contrastRatio": 2.52,
+               "expectedContrastRatio": "3:1",
+               "fgColor": "#9a9aa2",
+               "fontSize": "25.0pt (33.28px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.52 (foreground color: #9a9aa2, background color: #f3f3f5, font size: 25.0pt (33.28px), font weight: bold). Expected contrast ratio of 3:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"cbox no\"><div class=\"lbl\">We don't start with</div><blockquote>“Which AI tool should you buy?”</blockquote></div>",
+                 "target": Array [
+                   ".no",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.52 (foreground color: #9a9aa2, background color: #f3f3f5, font size: 25.0pt (33.28px), font weight: bold). Expected contrast ratio of 3:1",
+         "html": "<blockquote>“Which AI tool should you buy?”</blockquote>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".no > blockquote",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.color",
+       "wcag2aa",
+       "wcag143",
+       "TTv5",
+       "TT13.c",
+       "EN-301-549",
+       "EN-9.1.4.3",
+       "ACT",
+       "RGAAv4",
+       "RGAA-3.2.1",
+     ],
+   },
+ ]
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to content" [ref=e2] [cursor=pointer]:
    - /url: "#main"
  - banner [ref=e3]:
    - generic [ref=e4]:
      - link "BrandSparkX home" [ref=e5] [cursor=pointer]:
        - /url: /
        - img "BrandSparkX" [ref=e6]
      - navigation "Primary" [ref=e7]:
        - link "AI Voice & Calling" [ref=e8] [cursor=pointer]:
          - /url: /ai-voice-calling
        - link "AI Engineers" [ref=e9] [cursor=pointer]:
          - /url: /ai-engineers
        - link "Case Studies" [ref=e10] [cursor=pointer]:
          - /url: /work
        - link "Solutions" [ref=e11] [cursor=pointer]:
          - /url: /solutions
        - link "About Us" [ref=e12] [cursor=pointer]:
          - /url: /about
        - link "Contact Us" [ref=e13] [cursor=pointer]:
          - /url: /contact
  - main [ref=e14]:
    - generic [ref=e15]:
      - generic [ref=e17]:
        - generic [ref=e18]:
          - navigation "Breadcrumb" [ref=e19]:
            - link "Home" [ref=e20] [cursor=pointer]:
              - /url: /
            - text: /
            - generic [ref=e21]: About
          - heading "We believe AI should make business better." [level=1] [ref=e22]
          - paragraph [ref=e23]: BrandSparkX is an AI growth and automation company based in Dubai, helping businesses turn artificial intelligence into practical business outcomes. We combine strategy, automation, engineering and AI-powered customer engagement to help businesses build smarter systems.
        - generic [aria-hidden] [ref=e24]:
          - generic [ref=e27]:
            - text: Business outcomes
            - generic [ref=e28]: Growth, speed, efficiency
          - generic [ref=e33]:
            - text: AI agents & automation
            - generic [ref=e34]: Voice, sales, workflows
          - generic [ref=e39]:
            - text: Engineering & cloud
            - generic [ref=e40]: Integrations, data, deployment
          - generic [ref=e45]:
            - text: Your people & tools
            - generic [ref=e46]: The way you already work
      - generic [ref=e51]:
        - generic [ref=e52]: Our approach
        - heading "Business first. Technology second." [level=2] [ref=e53]
        - generic [ref=e54]:
          - generic [ref=e55]:
            - generic [ref=e56]: We don't start with
            - blockquote [ref=e57]: “Which AI tool should you buy?”
          - generic [ref=e58]:
            - generic [ref=e59]: We start with
            - blockquote [ref=e60]: “What are you trying to achieve?”
        - paragraph [ref=e61]: Then we identify the right technology, workflow or engineering solution to get there.
      - generic [ref=e63]:
        - generic [ref=e65]:
          - generic [ref=e66]: What we stand for
          - heading "Practical AI, adopted well." [level=2] [ref=e67]
        - generic [ref=e68]:
          - generic [ref=e69]:
            - heading "Business first" [level=3] [ref=e70]
            - paragraph [ref=e71]: Every engagement starts from a business goal.
          - generic [ref=e72]:
            - heading "Practical adoption" [level=3] [ref=e73]
            - paragraph [ref=e74]: Designed around outcomes you can measure.
          - generic [ref=e75]:
            - heading "Human + AI" [level=3] [ref=e76]
            - paragraph [ref=e77]: AI enhances your people and processes.
          - generic [ref=e78]:
            - heading "Flexible technology" [level=3] [ref=e79]
            - paragraph [ref=e80]: The right tools and engineering for the requirement.
          - generic [ref=e81]:
            - heading "Scalable" [level=3] [ref=e82]
            - paragraph [ref=e83]: One workflow first, then the whole business.
      - generic [ref=e85]:
        - generic [ref=e86]: Our vision
        - heading "Build. Automate. Grow with AI." [level=2] [ref=e87]
        - generic [ref=e88]:
          - generic [ref=e89]:
            - text: Today
            - paragraph [ref=e90]: We help businesses implement AI.
          - generic [ref=e91]:
            - text: Tomorrow
            - paragraph [ref=e92]: We aim to build technology that makes AI-powered business growth simpler, smarter and more accessible.
      - generic [ref=e95]:
        - heading "Let's talk about what you want to build." [level=2] [ref=e97]
        - generic [ref=e98]:
          - link "Start a Conversation" [ref=e99] [cursor=pointer]:
            - /url: /contact
          - link "Meet the team" [ref=e102] [cursor=pointer]:
            - /url: /#team
  - contentinfo [ref=e103]:
    - generic [ref=e104]:
      - generic [aria-hidden] [ref=e105]: B
      - generic [aria-hidden] [ref=e106]: R
      - generic [aria-hidden] [ref=e107]: A
      - generic [aria-hidden] [ref=e108]: "N"
      - generic [aria-hidden] [ref=e109]: D
      - generic [aria-hidden] [ref=e110]: S
      - generic [aria-hidden] [ref=e111]: P
      - generic [aria-hidden] [ref=e112]: A
      - generic [aria-hidden] [ref=e113]: R
      - generic [aria-hidden] [ref=e114]: K
      - generic [aria-hidden] [ref=e115]: X
    - generic:
      - generic [ref=e116]:
        - link "BrandSparkX home" [ref=e117] [cursor=pointer]:
          - /url: /
          - img "BrandSparkX" [ref=e118]
        - generic [ref=e119]: Build. Automate.Grow with AI.
        - paragraph [ref=e120]: AI growth & automation for ambitious businesses — strategy, automation, engineering and AI voice, connected into one growth system.
        - generic [ref=e121]:
          - link "WhatsApp" [ref=e122] [cursor=pointer]:
            - /url: https://wa.me/971559963778
          - link "Email" [ref=e125] [cursor=pointer]:
            - /url: mailto:business@brandsparkx.com
      - generic [ref=e128]:
        - heading "Contact us" [level=2] [ref=e129]
        - generic [ref=e130]:
          - link "Phone / WhatsApp +971 55 996 3778" [ref=e131] [cursor=pointer]:
            - /url: tel:+971559963778
            - generic [ref=e134]:
              - generic [ref=e135]: Phone / WhatsApp
              - text: +971 55 996 3778
          - link "Email business@brandsparkx.com" [ref=e136] [cursor=pointer]:
            - /url: mailto:business@brandsparkx.com
            - generic [ref=e139]:
              - generic [ref=e140]: Email
              - text: business@brandsparkx.com
      - generic [ref=e141]:
        - heading "Careers" [level=2] [ref=e142]
        - generic [ref=e143]:
          - link "Phone +971 52 564 8489" [ref=e144] [cursor=pointer]:
            - /url: tel:+971525648489
            - generic [ref=e147]:
              - generic [ref=e148]: Phone
              - text: +971 52 564 8489
          - link "Email hr@brandsparkx.com" [ref=e149] [cursor=pointer]:
            - /url: mailto:hr@brandsparkx.com
            - generic [ref=e152]:
              - generic [ref=e153]: Email
              - text: hr@brandsparkx.com
          - link "View careers" [ref=e154] [cursor=pointer]:
            - /url: /careers
      - generic [ref=e158]:
        - heading "Solutions" [level=2] [ref=e159]
        - list [ref=e160]:
          - listitem [ref=e161]:
            - link "AI Voice & Calling" [ref=e162] [cursor=pointer]:
              - /url: /ai-voice-calling
          - listitem [ref=e163]:
            - link "AI Growth" [ref=e164] [cursor=pointer]:
              - /url: /solutions/ai-growth
          - listitem [ref=e165]:
            - link "AI Content" [ref=e166] [cursor=pointer]:
              - /url: /solutions/ai-content
          - listitem [ref=e167]:
            - link "AI Marketing" [ref=e168] [cursor=pointer]:
              - /url: /solutions/ai-marketing
          - listitem [ref=e169]:
            - link "AI Sales" [ref=e170] [cursor=pointer]:
              - /url: /solutions/ai-sales
          - listitem [ref=e171]:
            - link "AI Engineers" [ref=e172] [cursor=pointer]:
              - /url: /ai-engineers
          - listitem [ref=e173]:
            - link "Business Automation" [ref=e174] [cursor=pointer]:
              - /url: /solutions/business-automation
      - generic [ref=e175]:
        - heading "Our locations" [level=2] [ref=e176]
        - generic [ref=e177]:
          - generic [ref=e181]:
            - strong [ref=e182]: Dubai, UAE
            - text: 801–806, Office No. 5, Clover Bay Tower, Burj Khalifa Area, Business Bay, Dubai, UAE
          - generic [ref=e186]:
            - strong [ref=e187]: Bengaluru, India
            - text: World Trade Centre, Unit 2274A, 22nd Floor, Brigade Gateway, Bengaluru – 560055
          - generic [ref=e191]:
            - strong [ref=e192]: United States
            - text: 3838 Andrew Johnson Hwy, Limestone, TN 37681, United States
          - generic [ref=e196]:
            - strong [ref=e197]: Gandhinagar
            - text: 13th Floor, GIFT Tower One, GIFT City, Gandhinagar, Gujarat
    - generic [ref=e198]:
      - paragraph [ref=e199]: © 2026 BrandSparkX. All rights reserved.
      - navigation "Legal" [ref=e200]:
        - link "Privacy Policy" [ref=e201] [cursor=pointer]:
          - /url: /privacy
        - link "Terms & Conditions" [ref=e202] [cursor=pointer]:
          - /url: /terms
  - generic [ref=e203]:
    - button "Back to top"
  - alert [ref=e204]
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import AxeBuilder from "@axe-core/playwright";
  3  | import sitemap from "@/app/sitemap";
  4  | 
  5  | const sitemapEntries = sitemap();
  6  | const routes = sitemapEntries.map((e) => new URL(e.url).pathname);
  7  | 
  8  | test.describe("Accessibility Audits (serious / critical violations)", () => {
  9  |   for (const route of routes) {
  10 |     test(`accessibility check for ${route}`, async ({ page }) => {
  11 |       // Use reduced motion so scroll-reveal (.rv) elements are immediately at 100% resting opacity
  12 |       await page.emulateMedia({ reducedMotion: "reduce" });
  13 |       await page.goto(route, { waitUntil: "domcontentloaded" });
  14 | 
  15 |       // Wait for entrance intro to clear
  16 |       await expect(page.locator("body")).not.toHaveClass(/brand-intro-active/, { timeout: 10000 });
  17 | 
  18 |       // Ensure all reveal elements are fully revealed
  19 |       await page.evaluate(() => {
  20 |         document.querySelectorAll(".rv").forEach((el) => el.classList.add("in"));
  21 |       });
  22 | 
  23 |       const results = await new AxeBuilder({ page })
  24 |         .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
  25 |         .analyze();
  26 | 
  27 |       const criticalViolations = results.violations.filter(
  28 |         (v) => v.impact === "serious" || v.impact === "critical",
  29 |       );
  30 | 
  31 |       if (criticalViolations.length > 0) {
  32 |         console.error(
  33 |           `[a11y violation on ${route}]`,
  34 |           JSON.stringify(
  35 |             criticalViolations.map((v) => ({
  36 |               id: v.id,
  37 |               impact: v.impact,
  38 |               description: v.description,
  39 |               nodes: v.nodes.map((n) => n.html),
  40 |             })),
  41 |             null,
  42 |             2,
  43 |           ),
  44 |         );
  45 |       }
  46 | 
  47 |       expect(
  48 |         criticalViolations,
  49 |         `Page ${route} has serious or critical a11y violations!`,
> 50 |       ).toEqual([]);
     |         ^ Error: Page /about has serious or critical a11y violations!
  51 |     });
  52 |   }
  53 | });
  54 | 
```