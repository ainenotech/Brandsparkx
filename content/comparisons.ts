/**
 * Simple, quotable comparison tables for solution pages. Keep every cell to what the site
 * already states (24/7 answering, scale, CRM logging, engagement models, one point of contact);
 * no numbers or results that haven't been verified.
 */

export type Comparison = {
  /** Question-style heading for the table. */
  title: string;
  intro: string;
  columns: [string, string];
  rows: { label: string; values: [string, string] }[];
};

export const comparisons: Record<string, Comparison> = {
  "ai-voice-calling": {
    title: "AI voice agent vs. human receptionist: what's the difference?",
    intro:
      "An AI voice agent doesn't replace your team. It takes the repetitive, high-volume calls so your people can focus on the conversations that need them.",
    columns: ["AI voice agent", "Human receptionist"],
    rows: [
      {
        label: "Availability",
        values: ["24 hours a day, 7 days a week", "Working hours and shifts"],
      },
      { label: "Calls at once", values: ["Many calls at the same time", "One call at a time"] },
      {
        label: "Consistency",
        values: ["Same script and answers on every call", "Varies with the person and the day"],
      },
      { label: "CRM updates", values: ["Logged automatically after each call", "Entered by hand"] },
      {
        label: "Best for",
        values: [
          "High-volume, repeatable calls: enquiries, qualification, booking, follow-up",
          "Complex, sensitive or high-value conversations",
        ],
      },
    ],
  },
  "ai-engineers": {
    title: "AI engineers on demand vs. hiring in-house: which fits?",
    intro:
      "On-demand engineers add capacity quickly and flexibly; in-house hiring builds a permanent team. Many businesses use both.",
    columns: ["AI engineers on demand", "Hiring in-house"],
    rows: [
      {
        label: "Time to add capacity",
        values: ["No long recruitment process", "Recruiting can take months"],
      },
      {
        label: "Commitment",
        values: ["By project, week or month, or a dedicated engineer", "Permanent employment"],
      },
      {
        label: "Skills",
        values: [
          "AI, full-stack, backend and cloud specialists as needed",
          "Limited to the people you hire",
        ],
      },
      { label: "Management", values: ["One point of contact", "Managed by your own team"] },
      {
        label: "Best for",
        values: [
          "Defined builds, short-term delivery and extra capacity",
          "Long-term ownership of your core product",
        ],
      },
    ],
  },
};
