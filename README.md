# BrandSparkX website (Next.js)

Production Next.js version of the original single-file BrandSparkX site (`legacy/brandsparkx.html`).
Phase 1: frontend only. Every page is statically generated for speed and SEO.

## Tech stack

| Area | Choice |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript (strict) |
| Styling | The original CSS, ported to `app/globals.css` (no Tailwind, no UI kit) |
| Fonts | Manrope, Inter, JetBrains Mono — self-hosted via `next/font` |
| Images | `next/image` (logos converted from 200 KB base64 to ~16 KB WebP) |
| Quality | ESLint (`next/core-web-vitals`, `next/typescript`), Prettier |

No other runtime dependencies.

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # add the contact form script URL
npm run dev                  # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (all pages pre-rendered) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run format` | Prettier |

## Pages

| URL | Notes |
|---|---|
| `/` | Home |
| `/solutions` | All seven solutions; `/solutions#ai-sales` jumps to one |
| `/solutions/[slug]` | SEO pages: `ai-growth`, `ai-content`, `ai-marketing`, `ai-sales`, `business-automation` |
| `/ai-voice-calling` | AI Voice & Calling (`/solutions/ai-voice-calling` redirects here) |
| `/ai-engineers` | AI Engineers on Demand (`/solutions/ai-engineers` redirects here) |
| `/work`, `/about`, `/contact` | |
| `/privacy`, `/terms` | Placeholder legal pages (set to `noindex` until the real text is added) |
| `/sitemap.xml`, `/robots.txt` | Generated |

Old links from the single-page site (`/#/contact?i=AI%20Sales`, `/#/solutions?s=sales`, …) are
redirected to the new URLs automatically.

## Project structure

```
app/            Routes, metadata, sitemap, robots, icons, globals.css
components/     UI components (layout/, home/, solutions/, voice/, engineers/, contact/, chat/)
content/        All text and data — edit content here
lib/            SEO helpers, form validation, small hooks
public/         Logos (brand/) and the social share image (og.png)
legacy/         The original HTML file, kept for reference only
docs/           The Phase 1 master prompt
```

## Editing content

All copy and data live in `content/`. Pages, navigation, footer, sitemap and structured data read
from these files, so a change in one place updates the whole site.

| File | Contains |
|---|---|
| `site.ts` | Contact details, offices, social links, navigation, placeholder switch |
| `solutions.ts` | The seven solutions, including SEO titles and descriptions |
| `flow.ts`, `process.ts` | Growth-system stages and "How we work" steps |
| `team.ts` | Team members |
| `testimonials.ts` | Testimonials |
| `cases.ts` | Case studies |
| `clients.ts` | Client logos |
| `interests.ts` | Contact-form interest options |
| `chat.ts` | Demo assistant replies |

### Publishing real content (before launch)

1. **Testimonials / case studies / team:** add the item in its file with `published: true`.
   For team photos, put the image in `public/team/` and set `photo: "/team/name.webp"`.
2. **Client logos:** put logo files in `public/clients/` and list them in `content/clients.ts`.
   Once at least one logo is listed, the placeholder slots disappear.
3. **Social profiles:** add them to `socials` in `content/site.ts` (footer + structured data).
4. **Switch off placeholders:** set `SHOW_PLACEHOLDER_CONTENT = false` in `content/site.ts`.
   Every item without `published: true` is then hidden, and empty sections are removed.
5. **Legal pages:** replace the placeholder in `components/LegalPage.tsx` with the real text and
   remove the `robots: { index: false }` lines in `app/privacy/page.tsx` and `app/terms/page.tsx`.

## SEO

- Real URLs, all pre-rendered as static HTML (full text visible in "View source").
- Per-page title, description, canonical URL, Open Graph and Twitter card (`lib/seo.ts`).
- Structured data: Organization, WebSite, ProfessionalService (Dubai + Bengaluru offices),
  Service (each solution) and BreadcrumbList.
- `sitemap.xml`, `robots.txt`, favicon, Apple touch icon, a generated 1200×630 share image per page
  (`app/og/[key]`), titles and descriptions for every page in `content/seo.ts`.
- One `<h1>` per page.

The canonical origin is fixed to `https://www.brandsparkx.com` (`SITE_URL` in `content/site.ts`) —
canonical URLs, Open Graph, the sitemap and structured data all use it.

## Phase 2 integration points

| Feature | Where to plug in |
|---|---|
| Contact form | `submitContact()` in `components/contact/ContactForm.tsx`. Reuse `lib/validation.ts` on the server. |
| Chat assistant | `getReply()` in `content/chat.ts` |

Phase 2 also covers: spam protection and rate limiting, email/CRM delivery, database, analytics with
consent, security headers (CSP, HSTS) and deployment.

## Performance

All pages are static HTML; fonts are self-hosted; images are optimised; the chat widget loads after
the page is interactive; JavaScript targets modern browsers only. About 150 KB (gzipped) of the
first-load JavaScript is the Next.js/React runtime that every Next.js 16 site ships; the site's own
code adds roughly 30 KB. Measure with Lighthouse on the deployed site for real-world numbers.

## Accessibility and motion

- Skip link, visible focus styles, keyboard support for the growth-flow tabs, engagement-model
  radio group, testimonial carousel, mobile menu and chat (Escape closes both).
- `prefers-reduced-motion` turns off all looping animations.
- Without JavaScript, all content is still visible.
