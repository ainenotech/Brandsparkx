/**
 * FAQ sections, shown as accordions and mirrored exactly in FAQPage structured data.
 *
 * Writing rules (checked by tests/unit/faqs.test.ts):
 * - `a` is the direct answer: 40–60 words, answer first, plain language.
 * - `more` holds optional extra detail paragraphs.
 * - Never state anything unverified (prices, languages, named integrations, timelines,
 *   guarantees). Where the real answer is unknown, the visible text describes the process
 *   honestly and a TODO(faq) comment says what to confirm.
 */

export type Faq = { q: string; a: string; more?: string[] };

export type FaqPage =
  | "home"
  | "ai-voice-calling"
  | "ai-engineers"
  | "ai-growth"
  | "ai-content"
  | "ai-marketing"
  | "ai-sales"
  | "business-automation"
  | "contact"
  | "careers";

export const faqs: Record<FaqPage, Faq[]> = {
  home: [
    {
      q: "What does BrandSparkX do?",
      a: "BrandSparkX is an AI growth and automation company. We help businesses use AI where it creates real value: AI voice agents that answer and book calls, AI sales and marketing automation, AI content, business process automation, AI strategy, and AI engineers on demand who build and support the systems behind it.",
    },
    {
      q: "Where is BrandSparkX based?",
      a: "BrandSparkX is based in Dubai, UAE, with offices in Bengaluru and Gandhinagar in India and in the United States. We work with businesses in the UAE and India and serve clients globally, so your project can be delivered by a team close to you or fully remotely.",
    },
    {
      q: "Where should a business start with AI?",
      a: "Start with one clear business problem, not a tool. Pick something measurable, such as missed calls, slow lead follow-up or manual data entry. We help you choose that first use case, prove its value within 7 days, and then expand to more workflows once it works.",
    },
    {
      q: "Do we need to replace our existing tools or team?",
      a: "No. We design AI around the way your business already works. Our solutions connect to your existing tools and data and support your people rather than replacing them, so your team keeps control while repetitive work, follow-ups and routine conversations are handled automatically.",
    },
    {
      // TODO(faq): add starting prices or typical ranges if you want to publish them.
      q: "How much does working with BrandSparkX cost?",
      a: "Pricing depends on the solution and scope: a single AI voice agent costs differently from a multi-system automation or a dedicated engineer. We start with a free strategy call, agree the first problem to solve, and then share a clear proposal with the cost before any work begins.",
    },
  ],

  "ai-voice-calling": [
    {
      q: "What is an AI voice agent?",
      a: "An AI voice agent is software that holds natural phone conversations with your customers. It answers inbound calls, makes outbound calls, asks qualifying questions, books appointments and follows up, using your scripts and information, so every caller gets a fast, consistent response even when your team is busy or offline.",
    },
    {
      q: "What can an AI voice agent do for my business?",
      a: "It can answer enquiries around the clock, qualify leads before they reach your sales team, book appointments into your calendar, run outbound calling and follow-up campaigns, and log each conversation. That means fewer missed calls, faster responses and more conversations handled without adding headcount.",
    },
    {
      // TODO(faq): confirm which languages and accents are supported (especially Arabic) and
      // replace this answer with a direct yes/no.
      q: "Does the AI voice agent work in Arabic?",
      a: "AI voice agents can be set up for multilingual conversations. Language and accent support depends on the voice technology chosen for your project, so tell us which languages your customers speak, including Arabic, and we confirm what is possible for your use case before anything goes live.",
    },
    {
      // TODO(faq): list the CRMs and calendars you have connected before (e.g. by name).
      q: "Which CRMs does the AI voice agent integrate with?",
      a: "The agent can update your CRM after each call, recording the caller's details, answers and next steps. We connect to the CRM and calendar tools you already use, typically through their integrations or API, and confirm the exact connection for your system during the free strategy call.",
    },
    {
      // TODO(faq): add typical go-live timelines once confirmed.
      q: "How long does it take to set up an AI voice agent?",
      a: "We start with one use case, such as answering inbound enquiries or booking appointments, and aim to prove it within 7 days. The full timeline depends on your scripts, the number of call flows and the systems we connect, and we agree it with you before work starts.",
    },
    {
      // TODO(faq): add pricing or a starting price if you want to publish it.
      q: "How much does an AI voice agent cost?",
      a: "The cost depends on call volume, the number of call flows and the integrations you need, so there is no one-size price. After a free strategy call about your use case, we send a clear proposal with the setup and running costs before anything is built.",
    },
  ],

  "ai-engineers": [
    {
      q: "What are AI engineers on demand?",
      a: "AI engineers on demand are experienced engineers you can add to your project without hiring them permanently. BrandSparkX provides AI, full-stack, backend and cloud specialists by project, week or month, with one point of contact, so you get the skills you need when you need them.",
    },
    {
      q: "How do engagements work?",
      a: "Choose the model that fits your need: a project for a defined build, weekly support for short-term delivery, monthly engagements for ongoing capacity, or a dedicated engineer for consistent long-term support. Whichever you choose, you work with one point of contact who coordinates the engineering work.",
    },
    {
      q: "What can your engineers build?",
      a: "Our engineers build AI agents and agentic workflows, AI-powered applications, automation, full-stack web products and backend services. They also handle cloud deployment and ongoing application support, so the same team that builds a solution can keep it running, improve it and connect it to your existing systems.",
    },
    {
      q: "Can your engineers work with our existing team?",
      a: "Yes. Our engineers can plug into your existing team and follow your tools, processes and code standards, or take full ownership of a defined requirement and deliver it end to end. Either way, you keep one point of contact and clear visibility of the work.",
    },
    {
      // TODO(faq): confirm typical start times for each engagement model.
      q: "How quickly can an engineer start?",
      a: "The aim is to help you add capacity without waiting months to hire. The exact start date depends on the skills and the engagement model you need, so tell us what you are building and we confirm availability and a start date during the first conversation.",
    },
  ],

  "ai-growth": [
    {
      q: "What is an AI growth strategy?",
      a: "An AI growth strategy is a plan for where AI will create the most value in your business and how to implement it. Instead of adopting tools because others do, you identify high-value use cases tied to your goals and get a practical, prioritised roadmap to put them in place.",
    },
    {
      q: "What do we get from an AI strategy engagement?",
      a: "You get a clear view of where AI fits your business: workflow analysis, the use cases with the highest impact, and a practical AI roadmap that shows what to build first, what it needs and how it connects to your existing tools, people and goals.",
    },
    {
      q: "Do we need technical staff to follow the roadmap?",
      a: "No. The roadmap is written for business decision-makers, and BrandSparkX can also implement it for you through our automation, AI agent and engineering services. If you have an internal technical team, we can work alongside them or hand the plan over to them.",
    },
    {
      // TODO(faq): add a typical duration for the strategy/roadmap work if you want to publish it.
      q: "How long does it take to build an AI roadmap?",
      a: "It depends on the size of your business and how many teams and workflows are involved. Many businesses start with a focused review of one area, such as sales or operations, then extend the roadmap once the first use case has proven its value.",
    },
  ],

  "ai-content": [
    {
      q: "What is AI content creation?",
      a: "AI content creation uses AI tools to produce and adapt marketing content faster: social posts, copy, video, AI avatars and creative assets. Combined with clear brand guidelines and human review, it helps you publish more consistent, high-quality content across channels with less time and manual effort.",
    },
    {
      q: "What types of content can you create with AI?",
      a: "We help with social media content, copywriting, AI video, AI avatars, creative generation and repurposing existing material into new formats. For example, one webinar or article can be turned into short videos, social posts and email copy, keeping your message consistent across every channel.",
    },
    {
      // TODO(faq): describe your actual review/approval process if you want to be specific.
      q: "Will AI content match our brand voice?",
      a: "Content follows your brand guidelines, tone of voice and approved messaging, and you review it before anything is published. AI speeds up drafting, variation and repurposing, while people stay in control of quality, accuracy and brand consistency, so the output sounds like your business.",
    },
    {
      q: "Will AI replace our marketing team?",
      a: "No. AI content tools take over repetitive production work such as first drafts, resizing and repurposing, so your marketing team can spend more time on strategy, ideas and campaigns. The goal is to help your people create more and better content, not to replace them.",
    },
  ],

  "ai-marketing": [
    {
      q: "What is AI marketing automation?",
      a: "AI marketing automation connects your campaigns, lead generation, CRM and follow-up into workflows that run automatically. New leads are captured, scored, nurtured and routed to the right person, using AI to personalise messages and decide next steps, so fewer opportunities are lost between tools.",
    },
    {
      q: "Which marketing tasks can be automated with AI?",
      a: "Common examples are capturing and qualifying leads, sending personalised follow-ups, nurturing leads over email and WhatsApp, updating your CRM, and moving contacts through campaign workflows. We start with the tasks that take your team the most time or cause the most missed opportunities.",
    },
    {
      q: "Can you automate WhatsApp follow-ups?",
      a: "Yes. WhatsApp automation is one of our marketing capabilities: following up with new leads, sending reminders and nurturing contacts through conversations, connected to your CRM so every message and reply is recorded. Messaging follows WhatsApp's business rules, and we set it up around your approved templates.",
    },
    {
      // TODO(faq): list the CRMs/marketing platforms you have integrated before.
      q: "Which CRMs and marketing tools do you work with?",
      a: "We connect AI marketing workflows to the CRM, email and messaging tools you already use, typically through their integrations or API, rather than asking you to switch platforms. Tell us your current stack and we confirm the exact connections during the free strategy call.",
    },
  ],

  "ai-sales": [
    {
      q: "What is AI sales automation?",
      a: "AI sales automation uses AI to handle the repetitive parts of selling: qualifying leads, following up, booking meetings and updating the CRM. Your salespeople spend their time on the conversations most likely to close, while every enquiry still gets a fast, consistent response from the first contact.",
    },
    {
      q: "How does AI qualify leads?",
      a: "An AI agent asks each new lead your qualifying questions by phone, WhatsApp or chat, such as budget, timeline and needs, then scores the answers against your criteria. Qualified leads are booked or passed to your sales team, and the details are saved in your CRM.",
    },
    {
      q: "Will AI replace our sales team?",
      a: "No. AI supports your sales team rather than replacing it. It handles first responses, qualification, reminders and routine follow-up at any hour, so your salespeople get better-prepared conversations with serious prospects and spend less time chasing leads that are not ready to buy.",
    },
    {
      // TODO(faq): list the CRMs you have connected before.
      q: "Does AI sales automation work with our CRM?",
      a: "Yes, it is designed to work with the CRM you already use. Sales workflows can create and update contacts, log calls and messages, and move deals through your pipeline. We confirm the exact integration for your CRM, through its built-in connections or API, during the free strategy call.",
    },
  ],

  "business-automation": [
    {
      q: "What is business process automation?",
      a: "Business process automation connects your systems, data and workflows so repetitive work happens on its own. Tasks like copying data between tools, routing requests, sending updates and preparing reports run automatically, with AI agents handling steps that need judgement, so your team can focus on higher-value work.",
    },
    {
      q: "Which processes can be automated?",
      a: "Good candidates are repetitive, rule-based tasks that happen often: data entry between disconnected tools, form and request handling, CRM updates, approvals, notifications and reporting. We look for the workflows that cost your team the most time or cause the most errors, and automate those first.",
    },
    {
      // TODO(faq): list the platforms and tools you typically connect, if you want to be specific.
      q: "Which tools and systems can you connect?",
      a: "We connect the systems you already use, such as your CRM, forms, spreadsheets, email and internal tools, through their integrations or APIs. Where no ready connection exists, our engineers can build one. We review your current stack first and confirm what can be connected.",
    },
    {
      q: "How do we get started with automation?",
      a: "Start with one workflow. We map how the process works today, identify where time is lost, and automate that single workflow first so you can see the result quickly. Once it is proven, we extend automation to more processes and departments at a pace that suits you.",
    },
  ],

  contact: [
    {
      q: "How quickly will BrandSparkX reply?",
      a: "We reply to every enquiry within 24 hours. Send the form on this page, email business@brandsparkx.com, or call or WhatsApp +971 55 996 3778. The more detail you share about what you want to improve, automate or build, the more useful our first reply will be.",
    },
    {
      q: "Is the first consultation free?",
      a: "Yes. The first strategy call is free and comes with no commitment. We use it to understand your business, the problem you want to solve and the tools you already use, then suggest a practical starting point and explain how we would approach it with you.",
    },
    {
      q: "What should I include in my message?",
      a: "Tell us what you want to improve, automate or build, which teams or processes are involved and the tools you currently use. A rough timeline also helps. You do not need a technical brief; a few sentences about the problem are enough for us to prepare a useful first conversation.",
    },
    {
      q: "Can I contact BrandSparkX on WhatsApp?",
      a: "Yes. You can call or message us on WhatsApp at +971 55 996 3778, or tap the WhatsApp button on this page. For general enquiries you can also email business@brandsparkx.com, and our team will get back to you within 24 hours.",
    },
  ],

  careers: [
    {
      q: "How do I apply for a job at BrandSparkX?",
      a: "Apply online with the form on this page. Add your details, choose the team you are applying for, and upload your CV as a PDF, DOC or DOCX file up to 5 MB. It takes about two minutes, and you can also email your CV to hr@brandsparkx.com.",
    },
    {
      q: "Where are BrandSparkX roles based?",
      a: "Our teams work from Dubai, UAE and Bengaluru, India, and some roles are open to remote or flexible arrangements. When you apply, choose the location that suits you: Dubai, Bengaluru or remote. Remote options depend on the role, so mention any location preference in your message.",
    },
    {
      q: "What is the hiring process?",
      a: "Our hiring process has five steps: you apply online, then have an initial conversation with us, complete a skills assessment where relevant, meet the team, and successful candidates receive an offer covering the role, compensation and employment terms. Depending on the role, the assessment is a practical task or a technical discussion.",
    },
    {
      q: "Can I apply if I don't see the right role?",
      a: "Yes. If none of the teams match exactly, choose Other in the Position field and tell us the role you are interested in. We are always looking for builders with fresh ideas and strong skills, and we keep promising applications in mind for future opportunities.",
    },
  ],
};
