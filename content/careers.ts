/**
 * Careers page copy and application choices.
 * The page renders this data; individual openings are not listed here.
 */

import type { IconName } from "@/components/Icon";

export const careerCategories = [
  {
    title: "AI & Automation",
    icon: "i-auto",
    roles:
      "AI engineers, automation specialists, AI agent developers, workflow automation experts.",
    tags: "Engineering · Product · Innovation",
  },
  {
    title: "Creative & Digital Marketing",
    icon: "i-mkt",
    roles:
      "Content strategists, graphic designers, video editors, performance marketers, SEO specialists.",
    tags: "Creative · Content · Growth",
  },
  {
    title: "Sales & Business Development",
    icon: "i-sales",
    roles:
      "Business development executives, sales professionals, lead generation specialists, client relationship managers.",
    tags: "Revenue · Partnerships · Client Success",
  },
  {
    title: "Business Development Executive (BDE)",
    icon: "i-growth",
    roles:
      "Find and qualify new leads, run outreach and discovery calls, and turn prospects into long-term clients.",
    tags: "Lead Generation · Outreach · Client Acquisition",
  },
] as const satisfies readonly { title: string; icon: IconName; roles: string; tags: string }[];

/** Position choices in the application form: every team, plus "Other" (free text). */
export const careerPositions = [...careerCategories.map((c) => c.title), "Other"] as const;

export const careerLocations = ["Dubai, UAE", "Bengaluru, India", "Remote / Flexible"] as const;

export const careerPage = {
  hero: {
    kicker: "Careers at BrandSparkX",
    title: "Build What's Next. Grow Beyond Limits.",
    intro:
      "Join the people shaping the future of AI, automation, technology, and digital growth. At BrandSparkX, we turn bold ideas into intelligent solutions that help businesses move forward.",
    places: "Dubai · Bengaluru · Opportunities across teams",
    // Stat cards beside the hero on desktop. Keep these factual.
    highlights: [
      { icon: "i-pin", value: "2 hubs", label: "Dubai & Bengaluru" },
      { icon: "i-users", value: "4 teams", label: "Hiring across AI, marketing, sales & BD" },
      { icon: "i-spark", value: "AI-first", label: "Modern AI tools in everyday work" },
      { icon: "i-check", value: "5 steps", label: "A clear, simple hiring process" },
    ] as const satisfies readonly { icon: IconName; value: string; label: string }[],
  },
  opportunities: {
    title: "Find your place at BrandSparkX",
    intro:
      "We're looking for curious minds, creative thinkers, problem-solvers, and ambitious people who want to do meaningful work. Whether you build technology, create campaigns, automate workflows, or drive business growth, there's room to make an impact.",
  },
  culture: {
    title: "Think boldly. Build intelligently. Grow together.",
    intro:
      "At BrandSparkX, we believe the future belongs to people who are willing to learn, adapt, and build. We value ownership over excuses, curiosity over assumptions, collaboration over silos, and measurable impact over activity alone.",
    values: [
      {
        title: "Stay curious",
        text: "Keep learning and experimenting with emerging technologies.",
      },
      {
        title: "Take ownership",
        text: "Bring solutions, not just problems.",
      },
      {
        title: "Move with purpose",
        text: "Focus on work that creates genuine value.",
      },
      {
        title: "Grow together",
        text: "Share knowledge, respect different perspectives, and celebrate collective progress.",
      },
    ],
    // TODO(careers): review this "Why BrandSparkX" copy. Keep claims general: no specific
    // salary, benefits or perks that haven't been confirmed.
    perks: [
      {
        icon: "i-spark",
        title: "Work with AI daily",
        text: "Use modern AI tools on real client work.",
      },
      {
        icon: "i-growth",
        title: "Learn and grow fast",
        text: "Pick up new skills across AI, marketing and technology.",
      },
      {
        icon: "i-check",
        title: "Real ownership",
        text: "Own your work from first idea to outcome.",
      },
      {
        icon: "i-pin",
        title: "Dubai & Bengaluru teams",
        text: "Collaborate across our two hubs.",
      },
    ] as const satisfies readonly { icon: IconName; title: string; text: string }[],
  },
  process: {
    title: "How our hiring process works",
    steps: [
      {
        title: "Apply online",
        text: "Share your details, resume or portfolio, and the role you're interested in.",
      },
      {
        title: "Initial conversation",
        text: "We learn about your experience, strengths, interests, and career goals.",
      },
      {
        title: "Skills assessment",
        text: "Depending on the role, complete a practical task or technical discussion.",
      },
      {
        title: "Meet the team",
        text: "Discuss the role, expectations, ways of working, and mutual fit.",
      },
      {
        title: "Welcome to BrandSparkX",
        text: "Successful candidates receive an offer with the role, compensation, and employment terms.",
      },
    ],
  },
  apply: {
    eyebrow: "Apply",
    title: "Let's build something meaningful.",
    intro:
      "Tell us about yourself. No role that fits yet? Apply anyway — we're always looking for builders.",
    // Icons are set in app/careers/page.tsx (clock, file, pin, in this order).
    points: ["Takes 2 minutes", "CV in PDF, DOC or DOCX", "Dubai · Bengaluru · Remote"],
  },
} as const;
