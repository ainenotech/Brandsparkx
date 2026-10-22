const topics = [
  "AI Voice Agents",
  "24/7 Call Answering",
  "Lead Qualification",
  "AI Calling",
  "Appointment Booking",
  "Multilingual Voice",
  "AI Receptionist",
  "Smart Follow-ups",
  "WhatsApp Automation",
  "AI Chatbots",
  "CRM Integration",
  "Workflow Automation",
  "Agentic AI",
  "Sales Pipelines",
  "Growth Strategy",
  "AI Engineers",
  "Content at Scale",
  "Performance Marketing",
] as const;

/** Times the topic group repeats per half, so one half is always wider than the widest screen. */
const GROUPS_PER_HALF = 3;

function Star() {
  return (
    <svg className="hero-ribbon-star" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 1.5l3.1 6.9 7.4.7-5.6 5 1.7 7.4L12 17.6l-6.6 3.9 1.7-7.4-5.6-5 7.4-.7z" />
    </svg>
  );
}

function Half({ copy = false }: { copy?: boolean }) {
  return (
    <div className="hero-ribbon-set" aria-hidden={copy || undefined}>
      {Array.from({ length: GROUPS_PER_HALF }, (_, group) =>
        topics.map((topic) => (
          <span className="hero-ribbon-item" key={`${group}-${topic}`}>
            {topic}
            <Star />
          </span>
        )),
      )}
    </div>
  );
}

/** Decorative tilted red band across the bottom of the home hero, scrolling AI topics. */
export function HeroRibbon() {
  return (
    <div className="hero-ribbon" aria-hidden="true">
      <div className="hero-ribbon-band">
        {/* Two identical halves; the track slides by exactly one half, so the loop is seamless. */}
        <div className="hero-ribbon-track">
          <Half />
          <Half copy />
        </div>
      </div>
    </div>
  );
}
