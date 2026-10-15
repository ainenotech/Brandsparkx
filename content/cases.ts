export type CaseStudy = {
  category: string;
  title: string;
  challenge: string;
  solution: string;
  /** Verified outcome, once approved by the client. */
  impact?: string;
  metrics: string[];
  /** Artwork variant for the generated cover image (1, 2 or 3). */
  art: 1 | 2 | 3;
  /** `false` = demonstration layout, shown only while SHOW_PLACEHOLDER_CONTENT is on. */
  published: boolean;
};

export const cases: CaseStudy[] = [
  {
    category: "Demo · Real estate",
    title: "Inbound enquiries answered in seconds",
    challenge: "Enquiries arrived after hours and waited until morning.",
    solution: "AI voice agent for inbound calls with CRM sync and booking.",
    metrics: ["Response time", "Leads processed"],
    art: 1,
    published: false,
  },
  {
    category: "Demo · Professional services",
    title: "Follow-up that never goes cold",
    challenge: "Sales team couldn’t follow up every lead consistently.",
    solution: "AI sales follow-up across calls and WhatsApp.",
    metrics: ["Sales efficiency", "Time saved"],
    art: 2,
    published: false,
  },
  {
    category: "Demo · Operations",
    title: "Back-office workflows that run themselves",
    challenge: "Manual data entry between disconnected tools.",
    solution: "Business automation connecting forms, CRM and reporting.",
    metrics: ["Operational efficiency", "Time saved"],
    art: 3,
    published: false,
  },
];
