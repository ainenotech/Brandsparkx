import type { IconName } from "@/components/Icon";

export type Solution = {
  slug: string;
  /** Legacy key from the original site (used to map old `#/solutions?s=` links). */
  key: string;
  icon: IconName;
  title: string;
  /** Short label used in the hub graphic. */
  shortTitle: string;
  headline: string;
  description: string;
  capabilities: string[];
  linkLabel: string;
  /** Dedicated page, if this solution has one outside /solutions/[slug]. */
  page?: string;
  /** Value of the matching interest checkbox on the contact form. */
  interest: string;
  seoTitle: string;
  seoDescription: string;
};

export const solutions: Solution[] = [
  {
    slug: "ai-voice-calling",
    key: "voice",
    icon: "i-voice",
    title: "AI Voice & Calling",
    shortTitle: "AI Voice & Calling",
    headline: "Give your business a voice.",
    description:
      "Deploy AI voice agents that communicate with customers at scale — from lead qualification and outbound calling to inbound enquiries, appointment booking and follow-ups.",
    capabilities: [
      "AI voice agents",
      "AI calling",
      "Inbound calls",
      "Outbound calls",
      "Lead qualification",
      "Appointment booking",
      "Automated follow-up",
    ],
    linkLabel: "Explore AI Voice",
    page: "/ai-voice-calling",
    interest: "AI Voice & Calling",
    seoTitle: "AI Voice Agents & AI Calling Solutions | BrandSparkX Dubai",
    seoDescription:
      "AI voice agents in Dubai that answer inbound calls, run outbound calling, qualify leads and book appointments 24/7 — without growing your headcount.",
  },
  {
    slug: "ai-growth",
    key: "growth",
    icon: "i-growth",
    title: "AI Growth",
    shortTitle: "AI Growth",
    headline: "Turn AI into a growth strategy.",
    description:
      "AI should be connected to your business goals — not added because everyone else is using it. We identify high-value AI opportunities across your business and create a practical roadmap for implementation.",
    capabilities: [
      "AI strategy",
      "AI roadmap",
      "Workflow analysis",
      "Use-case identification",
      "AI transformation",
    ],
    linkLabel: "Explore AI Growth",
    interest: "AI Growth",
    seoTitle: "AI Growth Strategy Services in Dubai | BrandSparkX",
    seoDescription:
      "AI strategy and roadmaps for businesses in Dubai and the UAE. BrandSparkX finds high-value AI opportunities and plans practical, measurable implementation.",
  },
  {
    slug: "ai-content",
    key: "content",
    icon: "i-content",
    title: "AI Content",
    shortTitle: "AI Content",
    headline: "Build an AI-powered content engine.",
    description: "Create high-quality content faster and more consistently across your channels.",
    capabilities: [
      "AI video",
      "AI avatars",
      "Social content",
      "Copywriting",
      "Creative generation",
      "Content repurposing",
    ],
    linkLabel: "Explore AI Content",
    interest: "AI Content",
    seoTitle: "AI Content Creation Services in Dubai | BrandSparkX",
    seoDescription:
      "An AI-powered content engine for social, video, copy and campaigns. BrandSparkX helps UAE businesses create quality content faster and more consistently.",
  },
  {
    slug: "ai-marketing",
    key: "marketing",
    icon: "i-mkt",
    title: "AI Marketing",
    shortTitle: "AI Marketing",
    headline: "Make your marketing work smarter.",
    description:
      "Connect campaigns, lead generation, CRM and follow-up into intelligent marketing workflows.",
    capabilities: [
      "Lead generation",
      "Marketing automation",
      "CRM automation",
      "WhatsApp automation",
      "Lead nurturing",
      "Campaign workflows",
    ],
    linkLabel: "Explore AI Marketing",
    interest: "AI Marketing",
    seoTitle: "AI Marketing Automation Services in Dubai | BrandSparkX",
    seoDescription:
      "AI marketing automation in Dubai: lead generation, CRM and WhatsApp automation and lead nurturing, connected into intelligent workflows by BrandSparkX.",
  },
  {
    slug: "ai-sales",
    key: "sales",
    icon: "i-sales",
    title: "AI Sales",
    shortTitle: "AI Sales",
    headline: "Turn more leads into opportunities.",
    description:
      "AI can qualify, engage, follow up and support your sales team — helping your business move faster from enquiry to revenue.",
    capabilities: [
      "Lead qualification",
      "AI follow-up",
      "Appointment booking",
      "Sales workflows",
      "CRM automation",
      "AI agents",
    ],
    linkLabel: "Explore AI Sales",
    interest: "AI Sales",
    seoTitle: "AI Sales Automation Services in Dubai | BrandSparkX",
    seoDescription:
      "AI sales automation for UAE businesses: lead qualification, AI follow-up and appointment booking that move every enquiry faster towards revenue.",
  },
  {
    slug: "business-automation",
    key: "automation",
    icon: "i-auto",
    title: "Business Automation",
    shortTitle: "Automation",
    headline: "Automate the work behind your business.",
    description:
      "Connect your systems, data and workflows so repetitive work happens automatically.",
    capabilities: [
      "Workflow automation",
      "Process automation",
      "System integration",
      "AI agents",
      "CRM workflows",
      "Business operations",
    ],
    linkLabel: "Explore Business Automation",
    interest: "Business Automation",
    seoTitle: "AI Business Automation Services in Dubai | BrandSparkX",
    seoDescription:
      "AI business automation in Dubai: workflow and process automation, system integration and AI agents that connect your tools so repetitive work runs itself.",
  },
  {
    slug: "ai-engineers",
    key: "engineers",
    icon: "i-eng",
    title: "AI Engineers on Demand",
    shortTitle: "AI Engineers",
    headline: "AI talent when you need it.",
    description:
      "Build, improve or maintain your technology without waiting months to find the right technical team. Access AI engineers and software specialists on project, weekly or monthly engagements — with one point of contact.",
    capabilities: [
      "AI engineering",
      "Agentic AI",
      "Full-stack",
      "Backend",
      "Cloud",
      "Deployment",
      "Application support",
    ],
    linkLabel: "Get AI Engineers",
    page: "/ai-engineers",
    interest: "AI Engineers",
    seoTitle: "AI Engineers on Demand | AI Development Talent | BrandSparkX",
    seoDescription:
      "Hire AI engineers on demand by project, week or month. Agentic AI, full-stack, backend, cloud and application support with one point of contact.",
  },
];

/** Public URL for a solution: its dedicated page if it has one, otherwise /solutions/[slug]. */
export function solutionHref(s: Solution): string {
  return s.page ?? `/solutions/${s.slug}`;
}

export function contactHref(interest?: string): string {
  return interest ? `/contact?interest=${encodeURIComponent(interest)}` : "/contact";
}
