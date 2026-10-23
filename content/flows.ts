import type { Icon } from "@phosphor-icons/react";
import {
  Bell,
  CalendarCheck,
  ChartBar,
  ChartLineUp,
  Clock,
  Database,
  Envelope,
  FileText,
  FileXls,
  Handshake,
  Lightbulb,
  Lightning,
  MagnifyingGlass,
  MapTrifold,
  Megaphone,
  Pen,
  Phone,
  PhoneOutgoing,
  Rocket,
  Snowflake,
  Target,
  TreeStructure,
  UserCheck,
  UserPlus,
  VideoCamera,
  WhatsappLogo,
  Image as ImageIcon,
} from "@phosphor-icons/react";
import { siHubspot, siWhatsapp } from "simple-icons";

type FlowNodeBase = {
  label: string;
  sub?: string;
};

/** A brand mark drawn in a 24×24 box; multi-part logos keep their official colours per part. */
export type FlowLogo = {
  slug: string;
  parts: { d: string; fill: string }[];
};

export type FlowNode = FlowNodeBase &
  ({ icon: Icon; logo?: undefined } | { logo: FlowLogo; icon?: undefined });

const googleAds: FlowLogo = {
  slug: "googleads",
  parts: [
    {
      d: "M3.9998 22.9291C1.7908 22.9291 0 21.1383 0 18.9293s1.7908-3.9998 3.9998-3.9998 3.9998 1.7908 3.9998 3.9998-1.7908 3.9998-3.9998 3.9998z",
      fill: "#34A853",
    },
    {
      d: "M23.4641 16.9287L15.4632 3.072C14.3586 1.1587 11.9121.5028 9.9988 1.6074S7.4295 5.1585 8.5341 7.0718l8.0009 13.8567c1.1046 1.9133 3.5511 2.5679 5.4644 1.4646 1.9134-1.1046 2.568-3.5511 1.4647-5.4644z",
      fill: "#4285F4",
    },
    {
      d: "M7.5137 4.8438L1.5645 15.1484A4.5 4.5 0 0 1 4 14.4297c2.5597-.0075 4.6248 2.1585 4.4941 4.7148l3.2168-5.5723-3.6094-6.25c-.4499-.7793-.6322-1.6394-.5878-2.4784z",
      fill: "#FBBC04",
    },
  ],
};

const whatsapp: FlowLogo = {
  slug: siWhatsapp.slug,
  parts: [{ d: siWhatsapp.path, fill: `#${siWhatsapp.hex}` }],
};

const hubspot: FlowLogo = {
  slug: siHubspot.slug,
  parts: [{ d: siHubspot.path, fill: `#${siHubspot.hex}` }],
};

export type FlowConfig = {
  id: string;
  ariaSummary: string;
  inputs: FlowNode[];
  hub: { label: string; sub: string };
  check: { label: string; sub: string };
  outputs: FlowNode[];
  kicker: string;
  title: string;
  text: string;
  interest?: string;
};

const voiceFlow: FlowConfig = {
  id: "voice",
  ariaSummary:
    "Calls, WhatsApp messages and website enquiries go to the BrandSparkX AI voice agent, which qualifies each lead, then books the meeting, updates the CRM and notifies your team.",
  kicker: "How it works",
  title: "From ring to booked meeting.",
  text: "Every call is answered, qualified and turned into a next step — even after hours.",
  interest: "AI Voice & Calling",
  inputs: [
    { label: "Inbound call", sub: "24/7", icon: Phone },
    { label: "WhatsApp", sub: "messages & missed calls", icon: WhatsappLogo },
    { label: "Website enquiry", sub: "forms", icon: FileText },
  ],
  hub: { label: "BrandSparkX AI Voice Agent", sub: "answers, understands, qualifies" },
  check: { label: "Qualified lead", sub: "intent scored" },
  outputs: [
    { label: "Meeting booked", sub: "on your calendar", icon: CalendarCheck },
    { label: "CRM updated", sub: "automatically", icon: Database },
    { label: "Team notified", sub: "on WhatsApp", icon: Bell },
  ],
};

const growthFlow: FlowConfig = {
  id: "home",
  ariaSummary:
    "Website and ads, calls and WhatsApp, and your tools go to BrandSparkX AI, which handles every lead, then produces qualified leads, faster sales and less manual work.",
  kicker: "The AI growth system",
  title: "One connected AI ecosystem.",
  text: "Website traffic, calls, WhatsApp and the tools you already use connect into one system.",
  inputs: [
    { label: "Website & ads", sub: "traffic", logo: googleAds },
    { label: "Calls & WhatsApp", sub: "conversations", logo: whatsapp },
    { label: "Your tools", sub: "CRM, sheets, apps", logo: hubspot },
  ],
  hub: { label: "BrandSparkX AI", sub: "connects, automates, follows up" },
  check: { label: "Nothing missed", sub: "every lead handled" },
  outputs: [
    { label: "Qualified leads", sub: "captured", icon: UserCheck },
    { label: "Faster sales", sub: "followed up", icon: ChartLineUp },
    { label: "Less manual work", sub: "automated", icon: Lightning },
  ],
};

const salesFlow: FlowConfig = {
  id: "ai-sales",
  ariaSummary:
    "New enquiries, cold leads and missed follow-ups go to BrandSparkX AI Sales, which scores them, then follows up by call and WhatsApp and books a meeting.",
  kicker: "How it works",
  title: "No lead goes cold.",
  text: "Fresh enquiries, older leads and missed follow-ups get qualified and moved forward.",
  interest: "AI Sales",
  inputs: [
    { label: "New enquiries", sub: "fresh leads", icon: UserPlus },
    { label: "Cold leads", sub: "old database", icon: Snowflake },
    { label: "Missed follow-ups", sub: "lost in the inbox", icon: Clock },
  ],
  hub: { label: "BrandSparkX AI Sales", sub: "qualifies & follows up" },
  check: { label: "Sales-ready", sub: "scored & prioritised" },
  outputs: [
    { label: "Call follow-up", sub: "AI calling", icon: PhoneOutgoing },
    { label: "WhatsApp follow-up", sub: "instant", icon: WhatsappLogo },
    { label: "Meeting booked", sub: "with your team", icon: CalendarCheck },
  ],
};

const automationFlow: FlowConfig = {
  id: "business-automation",
  ariaSummary:
    "Forms, email and spreadsheets go to BrandSparkX Automation, which syncs them, then updates the CRM, generates reports and alerts the team.",
  kicker: "How it works",
  title: "Work that runs itself.",
  text: "Forms, inbox and spreadsheets connect so records stay up to date.",
  interest: "Business Automation",
  inputs: [
    { label: "Forms", sub: "submissions", icon: FileText },
    { label: "Email inbox", sub: "requests", icon: Envelope },
    { label: "Spreadsheets", sub: "manual data", icon: FileXls },
  ],
  hub: { label: "BrandSparkX Automation", sub: "connects your tools" },
  check: { label: "Synced", sub: "no manual entry" },
  outputs: [
    { label: "CRM updated", sub: "in real time", icon: Database },
    { label: "Reports generated", sub: "on schedule", icon: ChartBar },
    { label: "Team alerted", sub: "when it matters", icon: Bell },
  ],
};

const marketingFlow: FlowConfig = {
  id: "ai-marketing",
  ariaSummary:
    "Meta ads, Google ads and website forms go to BrandSparkX AI Marketing, which saves each lead, then nurtures on WhatsApp and email and hands it to sales.",
  kicker: "How it works",
  title: "Every lead captured and nurtured.",
  text: "Ad responses and website forms are captured, saved and followed up.",
  interest: "AI Marketing",
  inputs: [
    { label: "Meta ads", icon: Megaphone },
    { label: "Google ads", icon: MagnifyingGlass },
    { label: "Website forms", icon: FileText },
  ],
  hub: { label: "BrandSparkX AI Marketing", sub: "captures & routes every lead" },
  check: { label: "Saved to CRM", sub: "nothing lost" },
  outputs: [
    { label: "WhatsApp nurture", icon: WhatsappLogo },
    { label: "Email sequence", icon: Envelope },
    { label: "Handed to sales", icon: Handshake },
  ],
};

const contentFlow: FlowConfig = {
  id: "ai-content",
  ariaSummary:
    "One brief goes to the BrandSparkX Content Engine, which keeps it on brand, then produces videos, social posts and ad copy.",
  kicker: "How it works",
  title: "One idea. Every channel.",
  text: "One brief becomes video, social posts and ad copy.",
  interest: "AI Content",
  inputs: [{ label: "One brief", sub: "your idea", icon: Lightbulb }],
  hub: { label: "BrandSparkX Content Engine", sub: "writes, designs, adapts" },
  check: { label: "On-brand", sub: "reviewed & approved" },
  outputs: [
    { label: "Videos & avatars", icon: VideoCamera },
    { label: "Social posts", icon: ImageIcon },
    { label: "Ad copy", icon: Pen },
  ],
};

const aiGrowthFlow: FlowConfig = {
  id: "ai-growth",
  ariaSummary:
    "Your goals, processes and data go to the BrandSparkX AI Audit, which identifies use cases, then proposes quick wins, a 7-day pilot and a scale roadmap.",
  kicker: "How it works",
  title: "From goals to a practical AI roadmap.",
  text: "Goals, processes and the tools you already use become a practical AI roadmap.",
  interest: "AI Growth",
  inputs: [
    { label: "Your goals", icon: Target },
    { label: "Your processes", icon: TreeStructure },
    { label: "Your data & tools", icon: Database },
  ],
  hub: { label: "BrandSparkX AI Audit", sub: "finds where AI pays off" },
  check: { label: "Use cases identified", sub: "ranked by value" },
  outputs: [
    { label: "Quick wins", icon: Lightning },
    { label: "7-day pilot", icon: Rocket },
    { label: "Scale roadmap", icon: MapTrifold },
  ],
};

const flows: Record<string, FlowConfig> = {
  home: growthFlow,
  voice: voiceFlow,
  "ai-sales": salesFlow,
  "business-automation": automationFlow,
  "ai-marketing": marketingFlow,
  "ai-content": contentFlow,
  "ai-growth": aiGrowthFlow,
};

export function getFlow(id: string): FlowConfig | undefined {
  return Object.prototype.hasOwnProperty.call(flows, id) ? flows[id] : undefined;
}

export { contentFlow, growthFlow };
