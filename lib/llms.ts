import { faqs, type FaqPage } from "@/content/faqs";
import { solutionDetails } from "@/content/solution-details";
import { SITE_URL, site } from "@/content/site";
import { solutionHref, solutions } from "@/content/solutions";
import { faqAnswerText } from "@/lib/seo";

/**
 * /llms.txt and /llms-full.txt (llmstxt.org format): a plain-Markdown summary of the company for
 * AI assistants and answer engines, built from the same content as the pages so nothing drifts.
 */

const url = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

const keyPages = [
  { title: "Home", path: "/", text: "Overview of BrandSparkX and its AI solutions." },
  { title: "All solutions", path: "/solutions", text: "Every service in one place." },
  { title: "About", path: "/about", text: "Company facts, approach, offices and leadership." },
  {
    title: "Example use cases",
    path: "/work",
    text: "How the services apply to real business problems.",
  },
  { title: "Careers", path: "/careers", text: "Teams that are hiring and how to apply online." },
  {
    title: "Contact",
    path: "/contact",
    text: "Enquiry form, phone, WhatsApp, email and office addresses.",
  },
];

function header() {
  return [`# ${site.name}`, "", `> ${site.description}`, "", site.about, ""];
}

function services(detailed: boolean) {
  const out = ["## Services", ""];
  for (const s of solutions) {
    if (!detailed) {
      // One line: the first sentence of the plain-language definition.
      const firstSentence = s.definition.split(/(?<=\.)\s+/)[0];
      out.push(`- [${s.title}](${url(solutionHref(s))}): ${firstSentence}`);
      continue;
    }
    const d = solutionDetails[s.slug];
    out.push(
      `### ${s.title}`,
      "",
      `URL: ${url(solutionHref(s))}`,
      "",
      `**${s.definitionQuestion}** ${s.definition}`,
      "",
    );
    out.push(`Capabilities: ${s.capabilities.join(", ")}.`, "");
    if (d?.whoFor) out.push("Who it's for:", ...d.whoFor.map((x) => `- ${x}`), "");
    if (d) {
      out.push("Problems it solves:", ...d.problems.map((x) => `- ${x}`), "");
      out.push("How it works:", ...d.steps.map((x, i) => `${i + 1}. ${x.title}: ${x.text}`), "");
      out.push(
        "Use cases by industry:",
        ...d.useCases.map((x) => `- ${x.industry}: ${x.text}`),
        "",
      );
    }
    const qs = faqs[s.slug as FaqPage] ?? [];
    if (qs.length)
      out.push("FAQ:", "", ...qs.flatMap((f) => [`- Q: ${f.q}`, `  A: ${faqAnswerText(f)}`]), "");
  }
  if (!detailed) out.push("");
  return out;
}

function locations() {
  return [
    "## Locations",
    "",
    ...site.offices.map((o, i) => `- ${o.city}${i === 0 ? " (headquarters)" : ""}: ${o.address}`),
    "",
  ];
}

function contact() {
  return [
    "## Contact",
    "",
    `- Email: ${site.email}`,
    `- Phone and WhatsApp: ${site.phone}`,
    `- Careers: ${site.careers.email}, ${site.careers.phone}`,
    `- Contact page: ${url("/contact")} (we reply within 24 hours; the first strategy call is free)`,
    "",
  ];
}

function pages() {
  return [
    "## Key pages",
    "",
    ...keyPages.map((p) => `- [${p.title}](${url(p.path)}): ${p.text}`),
    "",
  ];
}

function generalFaqs() {
  const out = ["## General FAQ", ""];
  for (const key of ["home", "contact", "careers"] as const) {
    for (const f of faqs[key]) out.push(`- Q: ${f.q}`, `  A: ${faqAnswerText(f)}`);
  }
  return [...out, ""];
}

export function llmsTxt() {
  return [
    ...header(),
    ...services(false),
    ...locations(),
    ...contact(),
    ...pages(),
    "## Optional",
    "",
    `- [Full details](${url("/llms-full.txt")}): every service with definitions, steps, industry use cases and FAQs.`,
    "",
  ].join("\n");
}

export function llmsFullTxt() {
  return [
    ...header(),
    ...locations(),
    ...contact(),
    ...services(true),
    ...generalFaqs(),
    ...pages(),
  ].join("\n");
}
