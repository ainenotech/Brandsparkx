import type { CSSProperties } from "react";

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
  "AI Engineers",
] as const;

/** The back tape runs the same topics in reverse so the two bands never line up. */
const backTopics = [...topics].reverse();

/** Times the topic group repeats per half, so one half is always wider than the widest screen. */
const GROUPS_PER_HALF = 2;

/** Five bars that bounce like a live voice signal; each bar's delay comes from --i. */
function Wave() {
  return (
    <span className="hero-ribbon-wave" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <i key={i} style={{ "--i": i } as CSSProperties} />
      ))}
    </span>
  );
}

function Spark() {
  return (
    <svg className="hero-tape-spark" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0z" />
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
            <Wave />
          </span>
        )),
      )}
    </div>
  );
}

function BackHalf() {
  return (
    <div className="hero-tape-set">
      {Array.from({ length: GROUPS_PER_HALF }, (_, group) =>
        backTopics.map((topic) => (
          <span className="hero-tape-item" key={`${group}-${topic}`}>
            {topic}
            <Spark />
          </span>
        )),
      )}
    </div>
  );
}

/** Decorative crossed tapes across the bottom of the home hero: a dark outlined band behind,
    a red band in front with a passing sheen, scrolling AI topics in opposite directions. */
export function HeroRibbon() {
  return (
    <div className="hero-ribbon" aria-hidden="true">
      <div className="hero-tape">
        <div className="hero-tape-track">
          <BackHalf />
          <BackHalf />
        </div>
      </div>
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
