import type { Metadata } from "next";
import { SITE_URL, site } from "@/content/site";

type PageSeo = {
  /** Full <title>, used as-is. */
  title: string;
  description: string;
  /** Path starting with "/", e.g. "/solutions". */
  path: string;
};

/** Per-page metadata: title, description, canonical URL, Open Graph and Twitter card. */
export function pageMetadata({ title, description, path }: PageSeo): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: site.name,
      locale: "en_AE",
      title,
      description,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name} — ${site.tagline}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  };
}

const absolute = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: site.name,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/brand-logo.webp`,
    email: site.email,
    telephone: site.phone,
    slogan: site.tagline,
    description: site.description,
    sameAs: site.socials.map((s) => s.href),
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

export function officesJsonLd() {
  return site.offices.map((o) => ({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${site.name} — ${o.city}`,
    url: SITE_URL,
    image: `${SITE_URL}/og.png`,
    ...(o.phone ? { telephone: o.phone } : {}),
    email: site.email,
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    address: {
      "@type": "PostalAddress",
      streetAddress: o.streetAddress,
      addressLocality: o.locality,
      ...(o.postalCode ? { postalCode: o.postalCode } : {}),
      addressCountry: o.country,
    },
  }));
}

export function serviceJsonLd(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absolute(path),
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "India" },
      { "@type": "Place", name: "Worldwide" },
    ],
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
