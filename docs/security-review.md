# Security Review — BrandSparkX

Conducted: 2026-10-22  
Scope: Static analysis, secret scanning, dependency audit, header evaluation, URL/parameter sanitization, and input handling.

---

## 1. Executive Summary Table

| Issue | File : Line | Severity | Recommended Fix |
| :--- | :--- | :--- | :--- |
| **Transitive Vulnerabilities in Dev Dependencies** (`braces` / `fast-glob` via `eslint-config-next`) | `package.json:23`, `package-lock.json` | **High** *(Dev only)* | Add `"overrides": { "braces": "^3.0.4" }` (or patched version) in `package.json` to resolve GHSA-vfj7-8cjw-p6xm without breaking Next.js 16. `npm audit --omit=dev` verifies 0 production vulnerabilities. |
| **Incomplete `.env*` pattern in `.gitignore`** | `.gitignore:4-5` | **Medium** | Replace `.env*.local` and `.env` with `.env*` and whitelist example: `!.env.example`. Prevents accidental commit of `.env.production` or `.env.staging`. |
| **Missing HTTP Security Headers & Content Security Policy (CSP)** | `next.config.ts:3-18` | **Medium** | Add `async headers()` in `next.config.ts` defining `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, and `X-Frame-Options: DENY`. |
| **External links missing `noopener`** | `app/contact/page.tsx:87`, `app/contact/page.tsx:114` | **Low** | Change `rel="noreferrer"` to `rel="noopener noreferrer"` on WhatsApp and Google Maps links. |
| **JSON-LD Script Character Escaping (Defense-in-depth)** | `components/JsonLd.tsx:6` | **Low** | Broaden `.replace(/</g, "\\u003c")` to also escape `\u2028` and `\u2029` (ECMAScript line/paragraph separators) to safeguard against parser quirks. (All current data is static). |
| **`mailto:` URI length limit on long messages** | `components/contact/ContactForm.tsx:109-111` | **Low** | Inputs are properly escaped with `encodeURIComponent` (no header injection possible), but a 2000-char message can exceed browser/OS mail client URL limits (~2000 chars). Provide a copy-to-clipboard fallback if URL is excessively long. |
| **`X-Powered-By` Header Disabled** | `next.config.ts:5` | **Info (Pass)** | Confirmed `poweredByHeader: false` is configured. Next.js server banner is suppressed. |
| **Public Crawling & Metadata Inspection** | `app/robots.ts:5-9`, `app/sitemap.ts:5-25` | **Info (Pass)** | No confidential internal routes exposed. Public marketing routes accurately indexed. Legal routes (`/privacy`, `/terms`) are not in sitemap (optional inclusion). |

---

## 2. Detailed Findings

### 2.1 Dependency Audit (`npm audit`)
- **Production Dependencies**: 0 vulnerabilities (`npm audit --omit=dev` exited with code 0).
- **Development Dependencies**: 5 high-severity vulnerabilities:
  - `braces <=3.0.3` (GHSA-vfj7-8cjw-p6xm — Stack-exhaustion denial of service through deeply nested patterns).
  - Chain: `eslint-config-next@16.3.8` -> `@next/eslint-plugin-next` -> `fast-glob` -> `micromatch` -> `braces`.
  - Fix: Override `braces` in `package.json` rather than downgrading Next.js to 14.

### 2.2 Secrets & Key Leakage
- Ran pattern matching for secret tokens (`sk-`, `AIza`, `ghp_`, API keys, passwords, bearer tokens) across current code, `legacy/`, and git history.
- **Result**: No secrets, tokens, or credentials found in the repository.

### 2.3 DangerouslySetInnerHTML & JSON-LD
- `dangerouslySetInnerHTML` is only used in `components/JsonLd.tsx`.
- Current code: `JSON.stringify(data).replace(/</g, "\\u003c")`.
- Data sources:
  - `app/layout.tsx`: `organizationJsonLd()`, `websiteJsonLd()` (static).
  - `app/solutions/[slug]/page.tsx`: `serviceJsonLd(...)` (whitelist driven by `content/solutions.ts`).
  - `app/contact/page.tsx`: `siteConfig.offices` (static).
  - `components/Breadcrumbs.tsx`: `breadcrumbJsonLd(...)` (static route titles).
- Risk: No untrusted user data flows into JSON-LD. Defense-in-depth escaping for `\u2028` and `\u2029` recommended.

### 2.4 External Links & Reverse Tabnabbing
- `components/layout/Footer.tsx`: Lines 83 and 96 use `rel="noopener noreferrer"`.
- `app/page.tsx`: Line 416 uses `rel="noopener noreferrer"`.
- `app/contact/page.tsx`:
  - Line 87 (WhatsApp link): `rel="noreferrer"` (missing `noopener`).
  - Line 114 (Google Maps directions link): `rel="noreferrer"` (missing `noopener`).

### 2.5 Mailto Link Construction
- `components/contact/ContactForm.tsx`: Lines 109-111 use `encodeURIComponent(subject)` and `encodeURIComponent(body)`.
- Because `&`, `=`, `?`, and newlines are safely percent-encoded, attackers cannot inject extraneous email headers (e.g. `&cc=`, `&bcc=`, `&to=`).
- Max payload length consideration: with `maxLength={2000}` on the message input, URL encoding can create ~6000-8000 character `mailto:` strings. OS mail clients typically truncate past ~2000 chars.

### 2.6 Query Parameter Reflection & Open Redirects
- `/contact?interest=`: Handled in `components/contact/ContactForm.tsx` lines 33-38. The value is strictly checked via `input.value === wanted` to check existing checkboxes; it is never injected into DOM or innerHTML.
- `components/layout/LegacyHashRedirect.tsx`: Legacy hash navigation (e.g. `/#/solutions?s=...`) strictly validates `path` against a whitelist array `["solutions", "ai-voice-calling", "ai-engineers", "work", "about", "contact", "privacy", "terms"]`. Destination is always prefixed with `/`. No open redirect possible.

### 2.7 Proposed Security Headers Block (`next.config.ts`)

```ts
async headers() {
  return [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Content-Security-Policy",
          value: [
            "default-src 'self'",
            // 'unsafe-inline' is required for Next.js hydration scripts & inline brand-intro-gate script
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
            // 'unsafe-inline' required for Next.js font CSS and inline styles
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: https: blob:",
            "font-src 'self' data:",
            "connect-src 'self'",
            "frame-ancestors 'none'",
            "base-uri 'self'",
            "form-action 'self' mailto:",
          ].join("; "),
        },
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ],
    },
  ];
}
```

*Compatibility Note*: Omitting `'unsafe-inline'` from `script-src` would break Next.js App Router client hydration and the `<Script id="brand-intro-gate">` script unless nonces are generated per request via Next.js middleware.
