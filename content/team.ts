export type TeamMember = {
  name: string;
  initials: string;
  role: string;
  bio: string;
  /** Path under /public, e.g. "/team/krishna.webp". Leave empty until a photo is approved. */
  photo?: string;
  /**
   * Full LinkedIn profile URL, e.g. "https://www.linkedin.com/in/handle/". Makes the card's
   * LinkedIn badge a link and is used as sameAs in the Person structured data.
   * TODO(team): add for each member.
   */
  linkedin?: string;
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
    linkedin: "", // add profile URL
    published: true,
  },
  {
    name: "Tirth Patel",
    initials: "TP",
    role: "Leadership · Partner & CTO",
    bio: "AI technology, engineering, technical strategy and product development.",
    photo: "/team/tirth-patel.webp",
    linkedin: "", // add profile URL
    published: true,
  },
  {
    // TODO(team): add Ratnesh's surname (and Scott's below) so all names are shown the same way.
    name: "Ratnesh",
    initials: "R",
    role: "Partner | High Growth Strategist",
    bio: "Growth strategy, customer acquisition and marketing expertise.",
    photo: "/team/ratnesh.jpeg",
    linkedin: "", // add profile URL
    published: true,
  },
  {
    // TODO(team): surname missing (see Ratnesh above).
    name: "Scott",
    initials: "S",
    role: "Head of Paid Media",
    bio: "Leads paid media strategy and campaigns.",
    photo: "/team/scott.webp",
    linkedin: "", // add profile URL
    published: true,
  },
];
