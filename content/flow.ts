import type { IconName } from "@/components/Icon";

export const flowStages: {
  name: string;
  icon: IconName;
  headline: string;
  text: string;
  uses: string[];
}[] = [
  {
    name: "Attract",
    icon: "s-attract",
    headline: "Be found by the right customers.",
    text: "AI content and marketing put your business in front of the people most likely to buy.",
    uses: ["AI Content", "AI Marketing"],
  },
  {
    name: "Engage",
    icon: "s-engage",
    headline: "Respond the moment interest appears.",
    text: "AI voice agents and WhatsApp workflows answer enquiries instantly, any hour.",
    uses: ["AI Voice", "WhatsApp automation"],
  },
  {
    name: "Capture",
    icon: "s-capture",
    headline: "Turn every enquiry into a lead record.",
    text: "Conversations flow straight into your CRM with context, so nothing is lost.",
    uses: ["CRM automation", "AI agents"],
  },
  {
    name: "Nurture",
    icon: "s-nurture",
    headline: "Keep warm leads moving.",
    text: "Automated follow-up keeps prospects engaged until they are ready to talk.",
    uses: ["Lead nurturing", "AI follow-up"],
  },
  {
    name: "Convert",
    icon: "s-convert",
    headline: "Move opportunities to revenue.",
    text: "AI qualifies, books appointments and hands sales teams the right conversations.",
    uses: ["AI Sales", "Appointment booking"],
  },
  {
    name: "Retain",
    icon: "s-retain",
    headline: "Grow the customers you already have.",
    text: "Automated service and engagement keep customers coming back.",
    uses: ["Business Automation", "AI Voice"],
  },
];
