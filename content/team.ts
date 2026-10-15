export type TeamMember = {
  name: string;
  initials: string;
  role: string;
  bio: string;
  /** Path under /public, e.g. "/team/krishna.webp". Leave empty until a photo is approved. */
  photo?: string;
  email?: string;
  phoneHref?: string;
  lead?: boolean;
  published: boolean;
};

export const team: TeamMember[] = [
  {
    name: "Krishna Patil",
    initials: "KP",
    role: "Leadership · Primary contact",
    bio: "Your first point of contact for AI growth, automation and voice AI engagements across the UAE and beyond.",
    email: "Krishna@brandsparkx.com",
    phoneHref: "tel:+971559963778",
    lead: true,
    published: true,
  },
  {
    name: "Tirth Patel",
    initials: "TP",
    role: "Leadership · Partner & CTO",
    bio: "Leads technology and AI engineering delivery.",
    published: true,
  },
  {
    name: "Team member name",
    initials: "+",
    role: "Engineering",
    bio: "Replace with a verified name, title and short bio.",
    published: false,
  },
  {
    name: "Team member name",
    initials: "+",
    role: "Design",
    bio: "Replace with a verified name, title and short bio.",
    published: false,
  },
  {
    name: "Team member name",
    initials: "+",
    role: "Delivery",
    bio: "Replace with a verified name, title and short bio.",
    published: false,
  },
];
