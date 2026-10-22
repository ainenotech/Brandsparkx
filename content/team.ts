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
    bio: "Leads technology and AI engineering delivery.",
    photo: "/team/tirth-patel.webp",
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
  {
    name: "Simran",
    initials: "S",
    role: "Project Manager",
    bio: "Keeps projects on track from kickoff to delivery.",
    photo: "/team/simran.webp",
    published: true,
  },
];
