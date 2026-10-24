export type Testimonial = { quote: string; name: string; role: string; published: boolean };

// Sample reviews so the section reads naturally while real ones are collected. They carry no
// real client names and stay `published: false` (tagged "Placeholder"). Replace each with the
// client's approved words and set `published: true`.
export const testimonials: Testimonial[] = [
  {
    quote:
      "We were missing half our inbound calls after 7pm. The AI voice agent now picks up every one, books the visit and sends the details to our team on WhatsApp. Honestly didn't expect it to sound this natural.",
    name: "Sample review",
    role: "Operations Head, Real estate developer",
    published: false,
  },
  {
    quote:
      "Our team used to spend most of Monday copying leads between sheets and the CRM. BrandSparkX automated the whole flow in about two weeks, and nobody has touched a spreadsheet since.",
    name: "Sample review",
    role: "Founder, D2C food brand",
    published: false,
  },
  {
    quote:
      "What I liked most is they didn't oversell. They started with one small use case, showed us numbers, then we expanded. Very practical team, quick on calls and clear on timelines.",
    name: "Sample review",
    role: "Director, Healthcare clinic chain",
    published: false,
  },
  {
    quote:
      "The content engine keeps our social pages active every single day without our marketing team burning out. The posts actually sound like us, which was my biggest worry.",
    name: "Sample review",
    role: "Marketing Manager, Hospitality group",
    published: false,
  },
  {
    quote:
      "We needed two AI engineers fast for an internal tool. They were onboarded within the week and shipped the first version before our deadline. Smooth from start to finish.",
    name: "Sample review",
    role: "CTO, Fintech startup",
    published: false,
  },
  {
    quote:
      "Follow-ups were always our weak point. Now every enquiry gets a call and a message within minutes, and our sales team only talks to people who are actually ready.",
    name: "Sample review",
    role: "Sales Lead, Education provider",
    published: false,
  },
];
