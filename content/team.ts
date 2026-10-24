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
    bio: "Business vision, strategic partnerships, market expansion and commercial growth.",
    photo: "/team/krishna-patil.webp",
    email: "Krishna@brandsparkx.com",
    phoneHref: "tel:+971559963778",
    lead: true,
    published: true,
  },
  {
    name: "Tirth Patel",
    initials: "TP",
    role: "Leadership · Partner & CTO",
    bio: "AI technology, engineering, technical strategy and product development.",
    photo: "/team/tirth-patel.webp",
    published: true,
  },
  {
    name: "Ratnesh",
    initials: "R",
    role: "Partner | High Growth Strategist",
    bio: "Growth strategy, customer acquisition and marketing expertise.",
    photo: "/team/ratnesh.jpeg",
    published: true,
  },
  {
    name: "Scott",
    initials: "S",
    role: "Head of Paid Media",
    bio: "Leads paid media strategy and performance campaigns.",
    photo: "/team/scott.webp",
    published: true,
  },
];
