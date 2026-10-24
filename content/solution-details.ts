/**
 * The self-contained, citable part of each solution page: who it's for, the problems it solves,
 * how it works and how it applies by industry.
 *
 * Industry use cases describe how the service CAN be applied. They are not client stories:
 * no client names, numbers or results here. Add those only as approved case studies.
 */

export type SolutionDetail = {
  /** Service name as used in the question headings, e.g. "How does an AI voice agent work?". */
  name: string;
  /** Omitted where the page already shows its own "Built for" list (AI Voice). */
  whoFor?: string[];
  problems: string[];
  steps: { title: string; text: string }[];
  useCases: { industry: string; text: string }[];
};

export const solutionDetails: Record<string, SolutionDetail> = {
  "ai-voice-calling": {
    name: "an AI voice agent",
    problems: [
      "Calls and enquiries missed after hours, at weekends or at busy times",
      "Leads that wait too long for a first response",
      "Sales time spent on prospects who aren't ready to buy",
      "Follow-up calls that slip through the cracks",
      "Call details that never make it into the CRM",
    ],
    steps: [
      {
        title: "Define the calls",
        text: "We agree which calls the agent handles, such as inbound enquiries, qualification or booking, and what a good outcome looks like.",
      },
      {
        title: "Script and connect",
        text: "We write the conversation flow with your team and connect your calendar and CRM.",
      },
      {
        title: "Test and launch",
        text: "We test real call scenarios, refine the answers and put the agent live on your number or campaign.",
      },
      {
        title: "Review and improve",
        text: "Every call is logged, so we review conversations and keep improving scripts and results.",
      },
    ],
    useCases: [
      {
        industry: "Real estate",
        text: "Answer property enquiries at any hour, qualify budget and area, and book viewings straight into an agent's calendar.",
      },
      {
        industry: "Clinics and healthcare",
        text: "Handle appointment requests and reminders, and answer common questions about services and opening times.",
      },
      {
        industry: "Education and training",
        text: "Respond to course enquiries, qualify applicants and book counselling or campus visits.",
      },
      {
        industry: "Professional services",
        text: "Qualify inbound leads and book consultations so advisors spend their time with serious prospects.",
      },
    ],
  },

  "ai-growth": {
    name: "AI growth strategy",
    whoFor: [
      "Business owners and leadership teams deciding where to invest in AI",
      "Companies that have tried AI tools without clear results",
      "Teams planning an AI programme across sales, marketing or operations",
    ],
    problems: [
      "Unclear where AI would make a measurable difference",
      "Disconnected AI tools that don't add up to business results",
      "No prioritised plan or budget logic for AI projects",
      "Difficulty turning AI ideas into implementation",
    ],
    steps: [
      {
        title: "Understand",
        text: "We review your goals, processes, tools and where time or revenue is being lost.",
      },
      {
        title: "Identify use cases",
        text: "We list the AI opportunities and score them on value, effort and readiness.",
      },
      {
        title: "Build the roadmap",
        text: "You get a practical, prioritised plan: what to build first, what it needs and how it connects.",
      },
      {
        title: "Prove and scale",
        text: "We help implement the first use case, measure it and extend the roadmap from there.",
      },
    ],
    useCases: [
      {
        industry: "Real estate",
        text: "Map where AI can speed up lead response, listings content and follow-up across the sales cycle.",
      },
      {
        industry: "E-commerce and retail",
        text: "Prioritise AI for customer service, product content and marketing automation.",
      },
      {
        industry: "Professional services",
        text: "Find where AI can reduce admin, speed up proposals and improve client follow-up.",
      },
      {
        industry: "Education",
        text: "Plan AI for enquiry handling, applicant follow-up and course marketing.",
      },
    ],
  },

  "ai-content": {
    name: "AI content creation",
    whoFor: [
      "Marketing teams that need more content without a larger team",
      "Brands publishing across social media, video, web and email",
      "Businesses that want consistent, on-brand content at a steady pace",
    ],
    problems: [
      "Too little content for the number of channels you run",
      "Slow production of video and creative assets",
      "Inconsistent tone and quality across channels",
      "Good material that is used once and never repurposed",
    ],
    steps: [
      {
        title: "Set the brand rules",
        text: "We capture your tone of voice, messaging and visual guidelines.",
      },
      {
        title: "Build the content engine",
        text: "We set up AI workflows for copy, social posts, video and avatars around your channels.",
      },
      {
        title: "Produce and review",
        text: "Content is drafted with AI and reviewed by people before anything is published.",
      },
      {
        title: "Repurpose and improve",
        text: "Strong pieces are turned into new formats, and the workflow improves over time.",
      },
    ],
    useCases: [
      {
        industry: "Real estate",
        text: "Create property descriptions, listing videos and social posts for new launches.",
      },
      {
        industry: "E-commerce and retail",
        text: "Produce product descriptions, ad variations and social content for each campaign.",
      },
      {
        industry: "Education and training",
        text: "Turn courses and webinars into short videos, posts and email content.",
      },
      {
        industry: "Hospitality",
        text: "Keep social channels active with seasonal offers, event content and short videos.",
      },
    ],
  },

  "ai-marketing": {
    name: "AI marketing automation",
    whoFor: [
      "Marketing teams running paid, social and email campaigns",
      "Businesses that capture leads from several channels",
      "Teams that rely on WhatsApp for customer conversations",
    ],
    problems: [
      "Leads captured but not followed up quickly",
      "Contacts scattered across forms, spreadsheets and inboxes",
      "Manual, generic nurturing that doesn't convert",
      "No clear view of which campaigns produce real leads",
    ],
    steps: [
      {
        title: "Map the journey",
        text: "We map how leads arrive today, from ads and forms to calls and WhatsApp.",
      },
      {
        title: "Connect the tools",
        text: "We connect your lead sources, CRM, email and WhatsApp into one workflow.",
      },
      {
        title: "Automate follow-up",
        text: "AI scores leads, sends personalised follow-ups and routes hot leads to your team.",
      },
      {
        title: "Measure and refine",
        text: "We track what happens to every lead and improve the workflows over time.",
      },
    ],
    useCases: [
      {
        industry: "Real estate",
        text: "Capture leads from portals and ads, follow up on WhatsApp and pass ready buyers to agents.",
      },
      {
        industry: "Clinics and healthcare",
        text: "Nurture enquiries with reminders and information until they book an appointment.",
      },
      {
        industry: "Education",
        text: "Follow up with course enquiries and applicants through each step of admissions.",
      },
      {
        industry: "E-commerce and retail",
        text: "Automate welcome, abandoned-cart and re-engagement messages across email and WhatsApp.",
      },
    ],
  },

  "ai-sales": {
    name: "AI sales automation",
    whoFor: [
      "Sales teams handling a high volume of inbound leads",
      "Businesses whose leads go cold before anyone follows up",
      "Teams that want their CRM kept up to date automatically",
    ],
    problems: [
      "Slow first response to new enquiries",
      "Sales time spent on leads that aren't ready to buy",
      "Inconsistent follow-up across the team",
      "Missed meetings and incomplete CRM records",
    ],
    steps: [
      {
        title: "Define qualification",
        text: "We agree your qualifying questions and what makes a lead sales-ready.",
      },
      {
        title: "Connect channels and CRM",
        text: "We connect calls, WhatsApp and chat to your CRM and calendar.",
      },
      {
        title: "Automate follow-up",
        text: "AI agents qualify every lead, follow up on time and book meetings for your team.",
      },
      {
        title: "Hand over and improve",
        text: "Sales-ready leads go to your salespeople with full context; we refine the flow over time.",
      },
    ],
    useCases: [
      {
        industry: "Real estate",
        text: "Qualify buyer and tenant leads by budget, area and timeline before an agent calls back.",
      },
      {
        industry: "Automotive",
        text: "Follow up with test-drive and finance enquiries and book showroom appointments.",
      },
      {
        industry: "Professional services",
        text: "Respond to every enquiry quickly and book consultations with the right advisor.",
      },
      {
        industry: "B2B services",
        text: "Re-engage cold leads and keep the pipeline moving with timely, consistent follow-up.",
      },
    ],
  },

  "business-automation": {
    name: "business process automation",
    whoFor: [
      "Operations teams buried in repetitive admin",
      "Businesses running on disconnected tools and spreadsheets",
      "Leaders who want processes to scale without adding headcount",
    ],
    problems: [
      "Manual data entry between tools",
      "Requests and approvals that get stuck or lost",
      "Reports that take hours to prepare",
      "Errors from copying information by hand",
    ],
    steps: [
      {
        title: "Map the process",
        text: "We document how the workflow runs today and where time is lost.",
      },
      {
        title: "Design the automation",
        text: "We decide which steps run automatically and where people or AI agents make decisions.",
      },
      {
        title: "Connect and build",
        text: "We connect your systems and build the automation, with checks and notifications.",
      },
      {
        title: "Monitor and expand",
        text: "We monitor the workflow, fix edge cases and extend automation to the next process.",
      },
    ],
    useCases: [
      {
        industry: "Real estate",
        text: "Sync leads, listings and documents between portals, CRM and shared drives.",
      },
      {
        industry: "Clinics and healthcare",
        text: "Automate appointment confirmations, intake forms and internal notifications.",
      },
      {
        industry: "E-commerce and retail",
        text: "Connect orders, inventory and customer updates across your store and back-office tools.",
      },
      {
        industry: "Professional services",
        text: "Automate client onboarding, document collection and reporting.",
      },
    ],
  },

  "ai-engineers": {
    name: "hiring AI engineers on demand",
    whoFor: [
      "Companies building AI agents, AI features or automation",
      "Product teams that need extra engineering capacity",
      "Businesses without an in-house AI or engineering team",
    ],
    problems: [
      "Months spent recruiting the right technical skills",
      "Short-term projects that don't justify a permanent hire",
      "AI prototypes that never make it to production",
      "Applications that need ongoing support after launch",
    ],
    steps: [
      {
        title: "Share the requirement",
        text: "Tell us what you are building, the skills you need and how long for.",
      },
      {
        title: "Choose the model",
        text: "Pick a project, weekly, monthly or dedicated engagement, with one point of contact.",
      },
      {
        title: "Build and deliver",
        text: "Engineers join your team or own a defined scope, working in your tools and processes.",
      },
      {
        title: "Support and scale",
        text: "Keep the same engineers for deployment and support, and scale capacity up or down.",
      },
    ],
    useCases: [
      {
        industry: "Startups and product companies",
        text: "Add AI and full-stack engineers to ship features or a new product faster.",
      },
      {
        industry: "E-commerce and retail",
        text: "Build AI features such as product search, recommendations or customer-service agents.",
      },
      {
        industry: "Professional services",
        text: "Develop internal AI tools and automation for document-heavy workflows.",
      },
      {
        industry: "Any business with legacy systems",
        text: "Connect older systems to modern AI tools through backend and cloud integration work.",
      },
    ],
  },
};

/**
 * Integrations: kept general until confirmed.
 * TODO(integrations): list the CRMs, calendars, messaging and marketing platforms you have
 * connected before (by name), per solution if they differ.
 */
export const integrationsText =
  "We connect to the tools you already use, such as your CRM, calendar, email, WhatsApp, forms and spreadsheets, through their built-in integrations or APIs. Where no ready connection exists, our engineers can build one. We confirm the exact integrations for your systems during the free strategy call.";
