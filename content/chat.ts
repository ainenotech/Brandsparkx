/**
 * Demo assistant: rule-based replies ported from the original site.
 * PHASE 2: replace `getReply` with a call to the chatbot API.
 */

export type ReplyPart = string | { href: string; label: string };

export const chatSuggestions = [
  "Explore AI Solutions",
  "Learn About AI Automation",
  "Hire AI Engineers",
  "Book a Consultation",
];

export const chatWelcome =
  "Hi, welcome to BrandSparkX 👋 I can help you find the right AI solution for your business. What would you like to explore?";

const replies: Record<string, ReplyPart[]> = {
  "explore ai solutions": [
    "We offer seven connected capabilities: AI Growth, AI Content, AI Marketing, AI Sales, Business Automation, AI Engineers on Demand and AI Voice & Calling. ",
    { href: "/solutions", label: "See all solutions" },
    ".",
  ],
  "learn about ai automation": [
    "Business Automation connects your people, tools and data so repetitive work runs itself — workflow automation, system integration, CRM workflows and AI agents. ",
    { href: "/solutions/business-automation", label: "Read more" },
    ".",
  ],
  "hire ai engineers": [
    "You can engage AI engineers by project, week, month or as a dedicated resource, with one point of contact. ",
    { href: "/ai-engineers", label: "Compare engagement models" },
    ".",
  ],
  "book a consultation": [
    "Happy to set that up. Share your details on the ",
    { href: "/contact", label: "contact page" },
    ", or call / WhatsApp +971 55 996 3778.",
  ],
};

export function getReply(text: string): ReplyPart[] {
  const k = text.toLowerCase().trim();
  if (replies[k]) return replies[k];
  if (/voice|call/.test(k))
    return [
      "AI voice agents can answer inbound calls, run outbound calling, qualify leads and book appointments, 24/7. ",
      { href: "/ai-voice-calling", label: "See AI Voice & Calling" },
      ".",
    ];
  if (/engineer|developer|hire|talent/.test(k)) return replies["hire ai engineers"];
  if (/automat|workflow|crm/.test(k)) return replies["learn about ai automation"];
  if (/price|cost|quote|budget/.test(k))
    return [
      "Pricing depends on scope. The quickest route is a free consultation — ",
      { href: "/contact", label: "tell us what you need" },
      ".",
    ];
  if (/contact|call|meet|book|consult/.test(k)) return replies["book a consultation"];
  return [
    "Thanks! In this demo I can point you to solutions, AI automation, AI engineers or booking a consultation. For anything else, ",
    { href: "/contact", label: "contact the team" },
    ".",
  ];
}
