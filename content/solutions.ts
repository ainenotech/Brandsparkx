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
  /** Plain-language "What is …?" answer shown near the top of the solution page (2–3 sentences). */
  /** Question heading for `definition`, e.g. "What is an AI voice agent?". */
  definitionQuestion: string;
  definition: string;
  capabilities: string[];
  linkLabel: string;
  /** Dedicated page, if this solution has one outside /solutions/[slug]. */
  page?: string;
  /** Value of the matching interest checkbox on the contact form. */
  interest: string;
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
    definitionQuestion: "What is an AI voice agent?",
    definition:
      "An AI voice agent is software that answers and makes phone calls in natural conversation. It responds to enquiries, qualifies leads, books appointments and follows up 24/7, and records each call in your CRM so your team sees every conversation.",
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
    definitionQuestion: "What is an AI growth strategy?",
    definition:
      "AI growth strategy is deciding where AI will create measurable value in your business, and how to put it in place. It turns AI from a collection of tools into a prioritised roadmap tied to your goals, from the first use case to a wider rollout.",
    capabilities: [
      "AI strategy",
      "AI roadmap",
      "Workflow analysis",
      "Use-case identification",
      "AI transformation",
    ],
    linkLabel: "Explore AI Growth",
    interest: "AI Growth",
  },
  {
    slug: "ai-content",
    key: "content",
    icon: "i-content",
    title: "AI Content",
    shortTitle: "AI Content",
    headline: "Build an AI-powered content engine.",
    description: "Create high-quality content faster and more consistently across your channels.",
    definitionQuestion: "What is AI content creation?",
    definition:
      "AI content creation means using AI to draft, produce and repurpose marketing content such as social posts, copy, video and AI avatars. Guided by your brand guidelines and reviewed by people, it lets a small team publish more consistent content in less time.",
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
    definitionQuestion: "What is AI marketing automation?",
    definition:
      "AI marketing automation connects lead generation, your CRM, email and WhatsApp into workflows that run on their own. AI scores, nurtures and routes leads and personalises follow-up, so no enquiry is forgotten between campaigns and tools.",
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
    definitionQuestion: "What is AI sales automation?",
    definition:
      "AI sales automation uses AI agents to qualify leads, follow up and book meetings automatically. Every enquiry gets a fast first response and your CRM stays up to date, so your sales team spends its time on prospects who are ready to buy.",
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
    definitionQuestion: "What is business process automation?",
    definition:
      "Business process automation connects your systems, data and workflows so repetitive tasks run without manual work. Data moves between tools, requests are routed and reports are prepared automatically, with AI agents handling the steps that need judgement.",
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
    definitionQuestion: "What are AI engineers on demand?",
    definition:
      "AI engineers on demand are AI and software specialists you add to your project for as long as you need them, by project, week or month. You get the skills to build, deploy and support AI systems without the time and cost of hiring a permanent team.",
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
  },
];

/** Public URL for a solution: its dedicated page if it has one, otherwise /solutions/[slug]. */
/**
 * Two or three closely related solutions linked from the bottom of each solution page
 * (internal linking for visitors and search engines). Keyed by slug.
 */
export const relatedSolutions: Record<string, [string, string, string]> = {
  "ai-voice-calling": ["ai-sales", "business-automation", "ai-marketing"],
  "ai-growth": ["business-automation", "ai-marketing", "ai-engineers"],
  "ai-content": ["ai-marketing", "ai-growth", "business-automation"],
  "ai-marketing": ["ai-content", "ai-sales", "ai-voice-calling"],
  "ai-sales": ["ai-voice-calling", "ai-marketing", "business-automation"],
  "business-automation": ["ai-engineers", "ai-sales", "ai-growth"],
  "ai-engineers": ["business-automation", "ai-growth", "ai-voice-calling"],
};

export function solutionHref(s: Solution): string {
  return s.page ?? `/solutions/${s.slug}`;
}

export function contactHref(interest?: string): string {
  return interest ? `/contact?interest=${encodeURIComponent(interest)}` : "/contact";
}
