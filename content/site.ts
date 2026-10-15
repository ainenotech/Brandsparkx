/**
 * Site-wide settings and contact details.
 * Edit here once; header, footer, contact page and structured data all read from this file.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://brandsparkx.com").replace(
  /\/$/,
  "",
);

/**
 * While real testimonials, client logos, case studies and team bios are being collected,
 * placeholder items are shown (as in the original design). Set to `false` before launch to
 * hide every item that is not marked `published: true`.
 */
export const SHOW_PLACEHOLDER_CONTENT = true;

export const site = {
  name: "BrandSparkX",
  tagline: "Build. Automate. Grow with AI.",
  description:
    "AI growth & automation for ambitious businesses — strategy, automation, engineering and AI voice, connected into one growth system.",
  email: "info@brandsparkx.com",
  phone: "+971 55 996 3778",
  phoneHref: "tel:+971559963778",
  whatsappHref: "https://wa.me/971559963778",
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
      postalCode: "",
      country: "AE",
      phone: "+971 55 996 3778",
      phoneHref: "tel:+971559963778",
    },
    {
      city: "Bengaluru, India",
      address: "World Trade Centre, Unit 2274A, 22nd Floor, Brigade Gateway, Bengaluru – 560055",
      streetAddress: "World Trade Centre, Unit 2274A, 22nd Floor, Brigade Gateway",
      locality: "Bengaluru",
      postalCode: "560055",
      country: "IN",
      phone: "+91 93532 25524",
      phoneHref: "tel:+919353225524",
    },
  ],
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/solutions", label: "Solutions" },
  { href: "/ai-voice-calling", label: "AI Voice & Calling" },
  { href: "/ai-engineers", label: "AI Engineers" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
