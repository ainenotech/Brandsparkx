/**
 * Site-wide settings and contact details.
 * Edit here once; header, footer, contact page and structured data all read from this file.
 */

/**
 * The one canonical origin, used for metadataBase, canonical URLs, Open Graph, the sitemap,
 * robots.txt and JSON-LD. Fixed on purpose: brandsparkx.com redirects here, so every absolute
 * URL must use the www host (an env var set to the bare domain made canonicals point at a
 * redirect). Preview deployments are noindexed by Vercel, so they don't need their own value.
 */
export const SITE_URL = "https://www.brandsparkx.com";

/**
 * While real testimonials, client logos, case studies and team bios are being collected,
 * placeholder items are shown (as in the original design). Set to `false` before launch to
 * hide every item that is not marked `published: true`.
 */
export const SHOW_PLACEHOLDER_CONTENT = true;

/**
 * TODO(testimonials): switch on once real, approved client testimonials are in
 * content/testimonials.ts (quote exactly as given, with name, role and company only with consent).
 * While false, the home-page testimonials section is not rendered at all.
 */
export const SHOW_TESTIMONIALS = false;

/** Opening hours for one or more days, e.g. { days: ["Monday", …, "Friday"], opens: "09:00", closes: "18:00" }. */
export type OfficeHours = { days: string[]; opens: string; closes: string };
/**
 * TODO(contact): add each office's business hours. While a list is empty, the Contact page shows
 * no hours for that office and the schema leaves openingHoursSpecification out.
 */
const noHoursYet: OfficeHours[] = [];

export const site = {
  name: "BrandSparkX",
  tagline: "Build. Automate. Grow with AI.",
  /**
   * Canonical company description: one sentence, used word for word in the home hero, footer,
   * Organization schema and llms.txt. Keep every channel in sync by editing it only here.
   */
  description:
    "BrandSparkX is an AI growth and automation company based in Dubai, helping businesses turn AI into practical results with AI voice agents, sales and marketing automation, business automation and AI engineers on demand.",
  /** The canonical one-paragraph version (About page, llms.txt). */
  about:
    "BrandSparkX is an AI growth and automation company headquartered in Dubai, UAE, with offices in Bengaluru and Gandhinagar, India, and in the United States. We help businesses use AI where it creates measurable value: AI voice agents that answer, qualify and book calls; AI sales and marketing automation; AI content; business process automation; AI growth strategy; and AI engineers on demand. We start with one business problem, prove the value, then scale what works, connecting AI to the tools and teams a business already has.",
  email: "business@brandsparkx.com",
  phone: "+971 55 996 3778",
  phoneHref: "tel:+971559963778",
  whatsappHref: "https://wa.me/971559963778",
  /** Careers contact shown in the footer. */
  careers: {
    phone: "+971 52 564 8489",
    phoneHref: "tel:+971525648489",
    email: "hr@brandsparkx.com",
  },
  primaryContact: {
    name: "Krishna Patil",
    email: "Krishna@brandsparkx.com",
  },
  /** Add verified social profile URLs here; they appear in the footer and in structured data. */
  socials: [] as { label: string; href: string }[],
  offices: [
    {
      city: "Dubai, UAE",
      address:
        "801–806, Office No. 5, Clover Bay Tower, Burj Khalifa Area, Business Bay, Dubai, UAE",
      streetAddress: "801–806, Office No. 5, Clover Bay Tower, Burj Khalifa Area, Business Bay",
      locality: "Dubai",
      region: "",
      postalCode: "",
      country: "AE",
      phone: "+971 55 996 3778",
      phoneHref: "tel:+971559963778",
      hours: noHoursYet,
    },
    {
      city: "Bengaluru, India",
      address: "World Trade Centre, Unit 2274A, 22nd Floor, Brigade Gateway, Bengaluru – 560055",
      streetAddress: "World Trade Centre, Unit 2274A, 22nd Floor, Brigade Gateway",
      locality: "Bengaluru",
      region: "",
      postalCode: "560055",
      country: "IN",
      phone: "+91 93532 25524",
      phoneHref: "tel:+919353225524",
      hours: noHoursYet,
    },
    {
      city: "United States",
      address: "3838 Andrew Johnson Hwy, Limestone, TN 37681, United States",
      streetAddress: "3838 Andrew Johnson Hwy",
      locality: "Limestone",
      region: "TN",
      postalCode: "37681",
      country: "US",
      // No local number for this office yet; leave empty to hide it.
      phone: "",
      phoneHref: "",
      hours: noHoursYet,
    },
    {
      city: "Gandhinagar",
      address: "13th Floor, GIFT Tower One, GIFT City, Gandhinagar, Gujarat",
      streetAddress: "13th Floor, GIFT Tower One, GIFT City",
      locality: "Gandhinagar",
      region: "Gujarat",
      postalCode: "",
      country: "IN",
      phone: "",
      phoneHref: "",
      hours: noHoursYet,
    },
  ],
} as const;

export const nav = [
  { href: "/ai-voice-calling", label: "AI Voice & Calling" },
  { href: "/ai-engineers", label: "AI Engineers" },
  { href: "/work", label: "Case Studies" },
  { href: "/solutions", label: "Solutions" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
] as const;
