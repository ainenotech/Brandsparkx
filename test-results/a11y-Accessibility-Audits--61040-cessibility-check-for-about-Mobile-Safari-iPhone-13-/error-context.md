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
+               "fontSize": "18.0pt (24px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.52 (foreground color: #9a9aa2, background color: #f3f3f5, font size: 18.0pt (24px), font weight: bold). Expected contrast ratio of 3:1",
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
+   Element has insufficient color contrast of 2.52 (foreground color: #9a9aa2, background color: #f3f3f5, font size: 18.0pt (24px), font weight: bold). Expected contrast ratio of 3:1",
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
  - link "Skip to content" [ref=e2]:
    - /url: "#main"
  - banner [ref=e3]:
    - generic [ref=e4]:
      - link "BrandSparkX home" [ref=e5]:
        - /url: /
        - img "BrandSparkX" [ref=e6]
      - button "Open menu" [ref=e7] [cursor=pointer]
  - main [ref=e9]:
    - generic [ref=e10]:
      - generic [ref=e12]:
        - generic [ref=e13]:
          - navigation "Breadcrumb" [ref=e14]:
            - link "Home" [ref=e15]:
              - /url: /
            - text: /
            - generic [ref=e16]: About
          - heading "We believe AI should make business better." [level=1] [ref=e17]
          - paragraph [ref=e18]: BrandSparkX is an AI growth and automation company based in Dubai, helping businesses turn artificial intelligence into practical business outcomes. We combine strategy, automation, engineering and AI-powered customer engagement to help businesses build smarter systems.
        - generic [aria-hidden] [ref=e19]:
          - generic [ref=e22]:
            - text: Business outcomes
            - generic [ref=e23]: Growth, speed, efficiency
          - generic [ref=e28]:
            - text: AI agents & automation
            - generic [ref=e29]: Voice, sales, workflows
          - generic [ref=e34]:
            - text: Engineering & cloud
            - generic [ref=e35]: Integrations, data, deployment
          - generic [ref=e40]:
            - text: Your people & tools
            - generic [ref=e41]: The way you already work
      - generic [ref=e46]:
        - generic [ref=e47]: Our approach
        - heading "Business first. Technology second." [level=2] [ref=e48]
        - generic [ref=e49]:
          - generic [ref=e50]:
            - generic [ref=e51]: We don't start with
            - blockquote [ref=e52]: “Which AI tool should you buy?”
          - generic [ref=e53]:
            - generic [ref=e54]: We start with
            - blockquote [ref=e55]: “What are you trying to achieve?”
        - paragraph [ref=e56]: Then we identify the right technology, workflow or engineering solution to get there.
      - generic [ref=e58]:
        - generic [ref=e60]:
          - generic [ref=e61]: What we stand for
          - heading "Practical AI, adopted well." [level=2] [ref=e62]
        - generic [ref=e63]:
          - generic [ref=e64]:
            - heading "Business first" [level=3] [ref=e65]
            - paragraph [ref=e66]: Every engagement starts from a business goal.
          - generic [ref=e67]:
            - heading "Practical adoption" [level=3] [ref=e68]
            - paragraph [ref=e69]: Designed around outcomes you can measure.
          - generic [ref=e70]:
            - heading "Human + AI" [level=3] [ref=e71]
            - paragraph [ref=e72]: AI enhances your people and processes.
          - generic [ref=e73]:
            - heading "Flexible technology" [level=3] [ref=e74]
            - paragraph [ref=e75]: The right tools and engineering for the requirement.
          - generic [ref=e76]:
            - heading "Scalable" [level=3] [ref=e77]
            - paragraph [ref=e78]: One workflow first, then the whole business.
      - generic [ref=e80]:
        - generic [ref=e81]: Our vision
        - heading "Build. Automate. Grow with AI." [level=2] [ref=e82]
        - generic [ref=e83]:
          - generic [ref=e84]:
            - text: Today
            - paragraph [ref=e85]: We help businesses implement AI.
          - generic [ref=e86]:
            - text: Tomorrow
            - paragraph [ref=e87]: We aim to build technology that makes AI-powered business growth simpler, smarter and more accessible.
      - generic [ref=e90]:
        - heading "Let's talk about what you want to build." [level=2] [ref=e92]
        - generic [ref=e93]:
          - link "Start a Conversation" [ref=e94]:
            - /url: /contact
          - link "Meet the team" [ref=e97]:
            - /url: /#team
  - contentinfo [ref=e98]:
    - generic [ref=e99]:
      - generic [aria-hidden] [ref=e100]: B
      - generic [aria-hidden] [ref=e101]: R
      - generic [aria-hidden] [ref=e102]: A
      - generic [aria-hidden] [ref=e103]: "N"
      - generic [aria-hidden] [ref=e104]: D
      - generic [aria-hidden] [ref=e105]: S
      - generic [aria-hidden] [ref=e106]: P
      - generic [aria-hidden] [ref=e107]: A
      - generic [aria-hidden] [ref=e108]: R
      - generic [aria-hidden] [ref=e109]: K
      - generic [aria-hidden] [ref=e110]: X
    - generic:
      - generic [ref=e111]:
        - link "BrandSparkX home":
          - /url: /
          - img "BrandSparkX"
        - generic [ref=e112]: Build. Automate.Grow with AI.
        - paragraph [ref=e113]: AI growth & automation for ambitious businesses — strategy, automation, engineering and AI voice, connected into one growth system.
        - generic [ref=e114]:
          - link "WhatsApp" [ref=e115]:
            - /url: https://wa.me/971559963778
          - link "Email" [ref=e118]:
            - /url: mailto:business@brandsparkx.com
      - generic [ref=e121]:
        - heading "Contact us" [level=2] [ref=e122]
        - generic [ref=e123]:
          - link "Phone / WhatsApp +971 55 996 3778" [ref=e124]:
            - /url: tel:+971559963778
            - generic [ref=e127]:
              - generic [ref=e128]: Phone / WhatsApp
              - text: +971 55 996 3778
          - link "Email business@brandsparkx.com" [ref=e129]:
            - /url: mailto:business@brandsparkx.com
            - generic [ref=e132]:
              - generic [ref=e133]: Email
              - text: business@brandsparkx.com
      - generic [ref=e134]:
        - heading "Careers" [level=2] [ref=e135]
        - generic [ref=e136]:
          - link "Phone +971 52 564 8489" [ref=e137]:
            - /url: tel:+971525648489
            - generic [ref=e140]:
              - generic [ref=e141]: Phone
              - text: +971 52 564 8489
          - link "Email hr@brandsparkx.com" [ref=e142]:
            - /url: mailto:hr@brandsparkx.com
            - generic [ref=e145]:
              - generic [ref=e146]: Email
              - text: hr@brandsparkx.com
          - link "View careers" [ref=e147]:
            - /url: /careers
      - generic [ref=e151]:
        - heading "Solutions" [level=2] [ref=e152]
        - list [ref=e153]:
          - listitem [ref=e154]:
            - link "AI Voice & Calling" [ref=e155]:
              - /url: /ai-voice-calling
          - listitem [ref=e156]:
            - link "AI Growth" [ref=e157]:
              - /url: /solutions/ai-growth
          - listitem [ref=e158]:
            - link "AI Content" [ref=e159]:
              - /url: /solutions/ai-content
          - listitem [ref=e160]:
            - link "AI Marketing" [ref=e161]:
              - /url: /solutions/ai-marketing
          - listitem [ref=e162]:
            - link "AI Sales" [ref=e163]:
              - /url: /solutions/ai-sales
          - listitem [ref=e164]:
            - link "AI Engineers" [ref=e165]:
              - /url: /ai-engineers
          - listitem [ref=e166]:
            - link "Business Automation" [ref=e167]:
              - /url: /solutions/business-automation
      - generic [ref=e168]:
        - heading "Our locations" [level=2] [ref=e169]
        - generic [ref=e170]:
          - generic [ref=e174]:
            - strong [ref=e175]: Dubai, UAE
            - text: 801–806, Office No. 5, Clover Bay Tower, Burj Khalifa Area, Business Bay, Dubai, UAE
          - generic [ref=e179]:
            - strong [ref=e180]: Bengaluru, India
            - text: World Trade Centre, Unit 2274A, 22nd Floor, Brigade Gateway, Bengaluru – 560055
          - generic [ref=e184]:
            - strong [ref=e185]: United States
            - text: 3838 Andrew Johnson Hwy, Limestone, TN 37681, United States
          - generic [ref=e189]:
            - strong [ref=e190]: Gandhinagar
            - text: 13th Floor, GIFT Tower One, GIFT City, Gandhinagar, Gujarat
    - generic [ref=e191]:
      - paragraph [ref=e192]: © 2026 BrandSparkX. All rights reserved.
      - navigation "Legal" [ref=e193]:
        - link "Privacy Policy" [ref=e194]:
          - /url: /privacy
        - link "Terms & Conditions" [ref=e195]:
          - /url: /terms
  - generic [ref=e196]:
    - button "Back to top"
  - alert [ref=e197]
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