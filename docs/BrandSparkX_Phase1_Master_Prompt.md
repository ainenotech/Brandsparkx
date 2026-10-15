# PHASE 1 MASTER PROMPT — BrandSparkX: Convert legacy HTML to a Next.js frontend

> **Before you start:** save the original website file in the project folder as `legacy/brandsparkx.html`.

---

## 0. Your role and how to work

You are a senior Next.js engineer focused on clean code, performance and technical SEO.

**Scope of Phase 1: FRONTEND ONLY.** Convert the existing single-file website into a multi-page, statically generated Next.js application with excellent SEO, keeping the design, copy, animations and interactions identical to the original.

**OUT OF SCOPE for Phase 1 (do not build):** backend, database, API routes, server actions, email sending, real AI chatbot, analytics, cookie consent, deployment configuration, authentication.

**Working method:**

1. Read `legacy/brandsparkx.html` completely: markup, the CSS in `<style>`, the single `<script>`, and the inline SVG icon sprite.
2. Before coding, create an Implementation Plan listing the route map, component tree, content files, and the parity checklist from Section 5. Wait for my approval.
3. Build phase by phase (Section 10). After each phase, run the dev server, open the browser, and compare the new site against the legacy file at 1440px, 768px and 375px. Report any differences.
4. Never silently remove, simplify or "improve" anything. If something cannot be ported exactly, stop and ask me.

---

## 1. Source of truth

- `legacy/brandsparkx.html` is the reference for design, layout, copy, colours, spacing, animation timing and behaviour.
- Copy all text **verbatim**. Do not rewrite or "polish" marketing copy.
- Extract the two base64 PNG logos into `/public/brand/`. Use `/public/brand/logo.svg` if I provide it; otherwise convert the PNG to an optimised WebP + PNG and render it with `next/image` (explicit width/height, `priority` in the header). No base64 images anywhere in the final code.

---

## 2. Tech stack (keep it simple)

- **Next.js** latest stable, App Router, React Server Components by default.
- **TypeScript**, `strict: true`, no `any`.
- **Styling:** port the legacy CSS faithfully.
  - `app/globals.css`: CSS variables (design tokens), reset, base typography, and shared classes the legacy CSS uses globally.
  - CSS Modules (`*.module.css`) for component-specific styles.
  - Keep the exact token values: `--red:#D83232; --red-d:#A8202B; --ink:#101014; --soft:#F3F3F5; --line:#E5E5E8; --text2:#62626B; --white:#FFFFFF; --wrap:1200px; --ease:cubic-bezier(.2,.7,.1,1)`.
  - Keep every legacy breakpoint and the light-only colour scheme.
- **Fonts:** `next/font/google`. Manrope (500, 600, 700, 800), Inter (400, 500, 600), JetBrains Mono (400, 500), latin subset, `display: 'swap'`, exposed as the CSS variables `--display`, `--body` and `--mono`. Remove the Google Fonts `<link>` tags.
- **Images:** `next/image`.
- **Tooling:** ESLint (`next/core-web-vitals`, `next/typescript`), Prettier, pnpm.
- **Do NOT add:** Tailwind, UI component libraries, icon libraries, animation libraries (Framer Motion, GSAP), state libraries or form libraries. The legacy site uses plain CSS/SVG/JS and it must stay that way.
- **Do NOT use `output: 'export'`.** Use the default Next.js build. All pages will still be statically generated, and Phase 2 backend features can be added without restructuring.

---

## 3. Code quality rules

- Clean, readable, production-ready code with **no unnecessary abstractions**: no generic factories, no wrapper components that only pass props, no custom hooks used only once, no premature folders.
- Server Components for all static content. Use `"use client"` only for small interactive islands.
- Every `setInterval`, `setTimeout`, `requestAnimationFrame` and `IntersectionObserver` must be cleaned up on unmount.
- Replace all `innerHTML` / HTML-string rendering with React elements. No `dangerouslySetInnerHTML` except for JSON-LD script tags.
- Use `next/link` for internal links.
- Small, well-named components. Comments only where logic is non-obvious.

---

## 4. Project structure

```
legacy/brandsparkx.html            # reference only, not imported
app/
  layout.tsx                       # html lang="en", fonts, Header, Footer, floating buttons, Chat, Organization JSON-LD
  page.tsx                         # Home
  solutions/page.tsx
  solutions/[slug]/page.tsx        # generateStaticParams for all solutions
  ai-voice-calling/page.tsx
  ai-engineers/page.tsx
  work/page.tsx
  about/page.tsx
  contact/page.tsx
  privacy/page.tsx
  terms/page.tsx
  not-found.tsx
  sitemap.ts
  robots.ts
  opengraph-image.tsx
  icon.tsx  (or favicon files in /app)
  globals.css
components/
  layout/      Header, MobileNav, Footer, BackToTop, WhatsAppButton, LegacyHashRedirect
  home/        HeroWalkthrough, SolutionsHub, GrowthFlow, CaseCard, CaseArt, TestimonialCarousel, ...
  voice/       Waveform, TranscriptDemo
  engineers/   CodeEditorDemo, EngagementModels
  contact/     ContactForm
  chat/        ChatWidget
  Icon.tsx     # typed component built from the legacy SVG sprite
  Reveal.tsx   # scroll-reveal wrapper (IntersectionObserver)
content/
  site.ts          # brand name, site URL, emails, phones, WhatsApp, addresses, socials, nav items
  solutions.ts     # from legacy SOL array (+ slug, seoTitle, seoDescription)
  flow.ts          # from legacy FLOW array
  cases.ts         # from legacy CASES array
  testimonials.ts  # from legacy TESTI array
  team.ts
  interests.ts     # from legacy INTERESTS array
  chat.ts          # suggestions + reply rules from legacy chat script
lib/
  validation.ts    # contact form rules (pure functions, reusable on the server in Phase 2)
  seo.ts           # metadata helper + JSON-LD builders
public/brand/
```

- All data from the legacy JavaScript arrays (`SOL`, `FLOW`, `CASES`, `TESTI`, `INTERESTS`, chat `SUG`/`REPLIES`, `TITLES`) moves to typed files in `content/`.
- Navigation, footer, hub, sitemap, contact interests and solution pages must all read from `content/`. One source of truth.
- Site URL: read from `process.env.NEXT_PUBLIC_SITE_URL`, defaulting to `https://brandsparkx.com`. Add `.env.example`.

---

## 5. Feature parity checklist (all must work exactly as legacy)

### Global

- [ ] Skip-to-content link targeting `<main id="main">`
- [ ] Sticky header gaining the "scrolled" style after 10px of scroll
- [ ] Desktop nav; mobile burger menu with `aria-expanded` and `aria-label` toggle; closes on Escape and on route change
- [ ] Active nav link with `aria-current="page"` (use `usePathname`)
- [ ] Back-to-top button visible after 600px of scroll
- [ ] WhatsApp floating button → `https://wa.me/971559963778`
- [ ] Footer: tagline, Dubai + Bengaluru addresses, phone/WhatsApp, email, solution links, social links, Privacy/Terms links, dynamic year
- [ ] Scroll-reveal animations: IntersectionObserver threshold `.15`, rootMargin `0px 0px -40px 0px`; reveal-host variant at threshold `.25`
- [ ] Full `prefers-reduced-motion` support everywhere, matching legacy behaviour
- [ ] Off-screen looping animations pause, and resume when visible
- [ ] SVG sprite converted to a typed `<Icon name="…" />` component

### Home `/`

- [ ] Announcement pill, H1 "Build. Automate. Grow with AI.", subtitle, both CTAs, 3 capability tags, 4 stats
- [ ] Hero walkthrough animation: inbound call UI, transcript, lead-qualification card with intent score counting 0 → 86 between 4.32s and 11.16s of a 12s loop, workflow steps, "Meeting booked" card, play/pause button (aria-label toggles), time display `00:xx / 00:12`
- [ ] "Built for ambitious businesses" strip and intro with 4 benefits
- [ ] 7 solution cards
- [ ] Radial solutions hub generated from `content/solutions.ts` (viewBox 460, centre 230, radius 172, inner ring 112), spokes, `animateMotion` particles, nodes lighting up in sequence every 1.1s, "AI core" centre; short labels "AI Engineers" and "Automation"
- [ ] Growth flow: 6 stages Attract → Retain, progress fill, detail panel `0N/06`, auto-advance every 2.6s starting only when scrolled into view, stopped permanently by hover or click; tabs with `role="tab"` and `aria-selected`
- [ ] "How we work" 5 steps and "Why BrandSparkX" 5 points
- [ ] Team: 2 leaders + 3 placeholder cards
- [ ] Client logos: 6 slots, monochrome → colour on hover
- [ ] 3 case-study cards with procedurally generated SVG art (port `caseArt(v)` as a server component); first card wide, third card a full-width row on desktop and a column below 900px; whole card clickable and Enter-key accessible → `/work`
- [ ] Testimonials carousel: prev/next, dots, wrap-around, `aria-roledescription="slide"`, "x of y" labels
- [ ] Final CTA band with WhatsApp link

### Solutions `/solutions`

- [ ] Jump-link bar and numbered solution rows (number, title, sub-heading, description, chips, CTA link)
- [ ] Each row has `id="<slug>"`; `/solutions#<slug>` scrolls smoothly to it (instant under reduced motion)
- [ ] CTA links → `/contact?interest=<Solution Title>`

### Solution detail pages `/solutions/[slug]` (NEW, for SEO)

- [ ] Statically generated for: `ai-growth`, `ai-content`, `ai-marketing`, `ai-sales`, `business-automation`, `ai-engineers`, `ai-voice-calling`
- [ ] Built only from existing copy in `content/solutions.ts` (heading, description, capability chips) plus shared sections (process steps, CTA band). No invented claims, statistics or client names.
- [ ] `ai-voice-calling` and `ai-engineers` slugs redirect permanently to `/ai-voice-calling` and `/ai-engineers` to avoid duplicate content
- [ ] Breadcrumb: Home / Solutions / {Title}

### AI Voice & Calling `/ai-voice-calling`

- [ ] Hero, 40-bar animated waveform (same delay/duration formula), transcript animation that replays each time the page is visited (1.1s stagger), status chips
- [ ] 6 capability cards, "Built for" chips, CTA

### AI Engineers `/ai-engineers`

- [ ] Code editor typing animation (420ms per line, 160ms for blank lines) plus terminal deploy sequence, looping after 3.5s; static full render under reduced motion
- [ ] Engagement models (Project / Weekly / Monthly / Dedicated) as an accessible radiogroup with arrow-key navigation and `aria-checked`
- [ ] 8 capability tiles, CTA

### Work `/work`

- [ ] Impact dashboard with "Sample data" label
- [ ] Demo notice + 3 full case studies (challenge / solution / impact) with "Demonstration project" badge
- [ ] CTA

### About `/about`

- [ ] Intro, 4-layer diagram with staggered reveal, approach, 5 values, vision (Today / Tomorrow), CTA, "Meet the team" → `/#team`

### Contact `/contact`

- [ ] Primary contact card (Krishna Patil, Krishna@brandsparkx.com, +971 55 996 3778), general email info@brandsparkx.com, both offices, `tel:` and `mailto:` links
- [ ] Fields: name\*, company, work email\*, WhatsApp/phone, website, 8 interest checkboxes, message\*
- [ ] Identical rules and error messages, implemented as pure functions in `lib/validation.ts`:
  - name: trimmed length > 1
  - email: `^[^\s@]+@[^\s@]+\.[^\s@]{2,}$`
  - phone (optional): `^\+?[\d\s()-]{7,}$`
  - website (optional): `^https?:\/\/\S+\.\S+`
  - message: trimmed length ≥ 10
- [ ] Validate on blur once touched, re-validate on input while in error, error summary, focus first invalid field, `aria-invalid`, errors announced via `aria-live`
- [ ] `?interest=` query param pre-checks the matching interest
- [ ] Submit shows the "Sending…" spinner for ~1.1s, then the success message, then resets, exactly like legacy (demo mode, nothing sent)
- [ ] All submission logic isolated in ONE function `submitContact(data)` inside ContactForm, with a `// PHASE 2: replace with server action` comment
- [ ] Contact-page layout variant (legacy `on-contact` body class) preserved

### Chat assistant (all pages)

- [ ] Launcher, greeting bubble (dismissible, auto-hides after 12s), panel with minimise and close; Escape closes and returns focus to the launcher
- [ ] "Demo mode" label and demo note kept
- [ ] Suggestion chips, typing indicator (900ms; 100ms under reduced motion), identical keyword replies
- [ ] Replies rendered as React elements with `next/link` links (no HTML strings); user text rendered as plain text
- [ ] On screens < 600px, clicking a link in a reply closes the panel
- [ ] Reply logic isolated in ONE function `getReply(text)` in `content/chat.ts`, with a `// PHASE 2: replace with API call` comment
- [ ] Chat widget lazy-loaded so it does not affect initial page load

### Other pages and behaviour

- [ ] `/privacy` and `/terms`: designed pages with clearly marked placeholder text "[Legal text to be provided]"
- [ ] Custom 404 page in the site design, with links to home and contact
- [ ] Legacy hash redirect (client component on the home page), using `router.replace`:
  - `#/solutions?s=x` → `/solutions#x`
  - `#/contact?i=x` → `/contact?interest=x`
  - `#/privacy` → `/privacy` and `#/terms` → `/terms`
  - `#/<page>` → `/<page>`

### Placeholder content

- [ ] Team placeholders, logos, testimonials and demo cases each have a `published: boolean` field in `content/`
- [ ] Unpublished items show in development and are hidden in production; if a section has no published items in production, hide the whole section and any links to its anchor
- [ ] Keep the "Demonstration project", "Sample data" and "Demo mode" labels wherever demo content shows

---

## 6. SEO (top priority)

- Every page statically generated with real URLs.
- `metadataBase` from `NEXT_PUBLIC_SITE_URL`; title template `%s | BrandSparkX`.
- Keep the legacy page titles:

| Page | Title |
|---|---|
| Home | BrandSparkX \| AI Growth & Automation Company in Dubai, UAE |
| Solutions | AI Solutions & Automation Services \| BrandSparkX Dubai |
| AI Voice & Calling | AI Voice Agents & AI Calling Solutions \| BrandSparkX Dubai |
| AI Engineers | AI Engineers on Demand \| AI Development Talent \| BrandSparkX |
| Work | Work & Case Studies \| BrandSparkX |
| About | About \| BrandSparkX |
| Contact | Contact \| BrandSparkX |
| Solution pages | {Title} Services in Dubai \| BrandSparkX |

- A unique meta description (140–155 characters) per page, written only from that page's existing copy, naturally including relevant terms such as "AI automation", "AI voice agents", "Dubai" and "UAE".
- Canonical URL on every page; Open Graph (title, description, url, siteName, locale `en_AE`, image) and Twitter `summary_large_image`.
- Dynamic OG image via `opengraph-image.tsx` in brand colours (ink background, red accent, Manrope), with the page title on the image.
- Favicon set and apple-touch-icon from the logo mark.
- `sitemap.ts` listing all pages, including solution slugs (exclude redirected slugs), with `lastModified`. `robots.ts` allowing all and pointing to the sitemap.
- JSON-LD via `<script type="application/ld+json">`:
  - **Site-wide:** `Organization` (name, url, logo, email, telephone, sameAs social links, contactPoint) and `WebSite`
  - **Contact page:** two `ProfessionalService` entries:
    - Dubai: 801–806, Office No. 5, Clover Bay Tower, Business Bay, Dubai, UAE, +971 55 996 3778
    - Bengaluru: World Trade Centre, Unit 2274A, 22nd Floor, Brigade Gateway, Bengaluru 560055, +91 93532 25524
  - **Each solution page, AI Voice and AI Engineers:** `Service` (name, description, provider, areaServed: UAE, India, Worldwide)
  - **All inner pages:** `BreadcrumbList`
- Exactly one H1 per page and a logical H2/H3 hierarchy. Report any legacy issues before changing them.
- Descriptive alt text on meaningful images; decorative SVGs get `aria-hidden="true"`.
- Internal linking: the footer and the solution rows link to the solution detail pages.
- No content hidden behind client-side JS. All page text must be present in the server-rendered HTML (check with "View Page Source").

---

## 7. Performance targets (production build, mobile Lighthouse)

- Performance ≥ 95, Accessibility 100, Best Practices 100, SEO 100 on every page
- LCP < 2.0s, CLS < 0.05, INP < 200ms
- First-load JS per route ≤ 100 KB gzipped (report the `next build` output)
- Logo ≤ 15 KB; no base64 assets; fonts only in the weights used
- Below-the-fold interactive islands and the chat widget loaded lazily with `next/dynamic`
- No layout shift from fonts, images, the hero animation or the chat launcher

---

## 8. Accessibility (WCAG 2.2 AA)

- Keep every ARIA attribute and keyboard behaviour from legacy.
- Visible focus styles; text contrast ≥ 4.5:1.
- Carousel, tabs, radiogroup and chat dialog follow the WAI-ARIA Authoring Practices.

---

## 9. Basic frontend hygiene (full security hardening is Phase 2)

- No HTML-string rendering of any data or user input.
- External links use `target="_blank" rel="noopener noreferrer"`.
- No secrets in the codebase. The only env var in Phase 1 is `NEXT_PUBLIC_SITE_URL`.
- `pnpm audit` with no high/critical issues; commit the lockfile.

---

## 10. Build phases (stop and report after each)

1. Project setup, tokens, `globals.css`, fonts, Icon component, layout (Header, MobileNav, Footer, BackToTop, WhatsApp button), and all routes with placeholder sections.
2. Home page complete, with every animation and interaction.
3. Solutions, solution detail pages, AI Voice, AI Engineers, Work and About.
4. Contact page (demo form), chat widget (demo), privacy, terms, 404 and the legacy hash redirect.
5. SEO: metadata, OG images, favicon, sitemap, robots and JSON-LD.
6. Performance and accessibility pass: fix all Lighthouse and axe issues, and write the final README.

---

## 11. Definition of done

- Every checkbox in Section 5 verified in the browser. Deliver a Walkthrough with desktop and mobile screenshots beside the legacy equivalents.
- `pnpm lint`, `pnpm tsc --noEmit` and `pnpm build` pass with zero errors and zero warnings. No browser console errors.
- Lighthouse targets in Section 7 met on all pages.
- View Page Source on every page shows the full text content, correct title, description, canonical, OG tags and JSON-LD.
- Every legacy `#/...` URL lands on the correct new page.
- README explains: setup, scripts, folder structure, how to edit content in `content/`, how to publish a testimonial, logo, case study or team member, and the two Phase 2 integration points (`submitContact` and `getReply`).
