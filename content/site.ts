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
    {
      city: "United States",
      address: "3838 Andrew Johnson Hwy, Limestone, TN 37681, United States",
      streetAddress: "3838 Andrew Johnson Hwy",
      locality: "Limestone",
      postalCode: "37681",
      country: "US",
      // No local number for this office yet; leave empty to hide it.
      phone: "",
      phoneHref: "",
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
