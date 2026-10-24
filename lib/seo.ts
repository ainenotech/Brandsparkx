import type { Metadata } from "next";
import type { Faq } from "@/content/faqs";
import { pageSeo, type PageKey } from "@/content/seo";
import { SITE_URL, site } from "@/content/site";

/** URL of a page's generated Open Graph image (app/og/[key]/route.tsx). */
export const ogImagePath = (key: PageKey) => `/og/${key}`;

/**
 * Per-page metadata from content/seo.ts: title, description, canonical URL, robots,
 * Open Graph and Twitter card. Relative URLs resolve against metadataBase (SITE_URL).
 */
export function pageMetadata(key: PageKey): Metadata {
  const page = pageSeo[key];
  const { title, description, path, ogTitle } = page;
  const index = !("index" in page) || page.index !== false;
  const image = {
    url: ogImagePath(key),
    width: 1200,
    height: 630,
    alt: `${ogTitle} — ${site.name}`,
  };
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    robots: { index, follow: true },
    openGraph: {
      type: "website",
      url: path,
      siteName: site.name,
      locale: "en_AE",
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

const absolute = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

const ORG_ID = `${SITE_URL}/#organization`;

type Office = (typeof site.offices)[number];
/** Matches the office card anchors on the Contact page (id="office-dubai", …). */
export const officeId = (o: Office) => `${SITE_URL}/contact#office-${o.locality.toLowerCase()}`;

function postalAddress(o: Office) {
  return {
    "@type": "PostalAddress",
    streetAddress: o.streetAddress,
    addressLocality: o.locality,
    ...(o.region ? { addressRegion: o.region } : {}),
    ...(o.postalCode ? { postalCode: o.postalCode } : {}),
    addressCountry: o.country,
  };
}

const mapsUrl = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export function organizationJsonLd() {
  const hq = site.offices[0];
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/brand/brand-logo.webp`,
      width: 201,
      height: 28,
    },
    email: site.email,
    telephone: site.phone,
    slogan: site.tagline,
    description: site.description,
    address: postalAddress(hq),
    // Each office is a ProfessionalService on the Contact page; reference them by @id.
    location: site.offices.map((o) => ({ "@id": officeId(o) })),
    // TODO(schema): add real social profile URLs to site.socials (LinkedIn, Instagram, …);
    // they appear here as sameAs. Left out entirely while the list is empty.
    ...(site.socials.length ? { sameAs: site.socials.map((s) => s.href) } : {}),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: site.phone,
      email: site.email,
      areaServed: ["AE", "IN", "Worldwide"],
      availableLanguage: ["English"],
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: site.name,
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

/** One ProfessionalService per office, with the exact address shown on the site. */
export function officesJsonLd() {
  return site.offices.map((o) => ({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": officeId(o),
    name: `${site.name} — ${o.city}`,
    url: officeId(o),
    image: `${SITE_URL}/og/contact`,
    ...(o.phone ? { telephone: o.phone } : {}),
    email: site.email,
    address: postalAddress(o),
    hasMap: mapsUrl(o.address),
    ...(o.hours.length
      ? {
          openingHoursSpecification: o.hours.map((h) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: h.days,
            opens: h.opens,
            closes: h.closes,
          })),
        }
      : {}),
    parentOrganization: { "@id": ORG_ID },
    // TODO(schema): add geo (latitude/longitude) per office once confirmed. Opening hours come
    // from site.offices[].hours (see TODO(contact) in content/site.ts).
  }));
}

/** Where each service is offered: the two hub countries plus remote delivery worldwide. */
const serviceArea = [
  { "@type": "Country", name: "United Arab Emirates" },
  { "@type": "Country", name: "India" },
  { "@type": "Place", name: "Worldwide" },
];

export function serviceJsonLd(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absolute(path)}#service`,
    name,
    serviceType: name,
    description,
    url: absolute(path),
    provider: { "@id": ORG_ID },
    areaServed: serviceArea,
  };
}

/**
 * Person entries for the leadership shown on the home page team section, using only what the
 * site shows: name, role, photo and (where listed) email.
 */
export function leadershipJsonLd(
  members: { name: string; role: string; photo?: string; email?: string; linkedin?: string }[],
) {
  return members
    .filter((m) => m.role.startsWith("Leadership"))
    .map((m) => ({
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${SITE_URL}/#person-${m.name.toLowerCase().replace(/\s+/g, "-")}`,
      name: m.name,
      // Role text exactly as on the site, minus the "Leadership ·" group label.
      jobTitle: m.role.replace(/^Leadership\s*·\s*/, ""),
      worksFor: { "@id": ORG_ID },
      ...(m.photo ? { image: `${SITE_URL}${m.photo}` } : {}),
      ...(m.email ? { email: m.email } : {}),
      ...(m.linkedin ? { sameAs: [m.linkedin] } : {}),
    }));
}

/**
 * WebPage for a solution page: dateModified matches the visible "Last updated" date, and the
 * page is about the Service described on it.
 */
export function webPageJsonLd(key: PageKey) {
  const page = pageSeo[key];
  const url = absolute(page.path);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: page.title,
    description: page.description,
    dateModified: page.lastModified,
    inLanguage: "en",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${url}#service` },
    publisher: { "@id": ORG_ID },
  };
}

/** The answer text exactly as the FAQ section shows it (direct answer, then any detail). */
export const faqAnswerText = (f: Faq) => [f.a, ...(f.more ?? [])].join(" ");

/** FAQPage for a page's visible FAQ section; questions and answers match the page word for word. */
export function faqJsonLd(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: faqAnswerText(f) },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}
