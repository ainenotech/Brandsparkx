import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FinalCta } from "@/components/FinalCta";
import { Icon, type IconName } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { contactHref } from "@/content/solutions";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";

const PATH = "/ai-voice-calling";
const DESCRIPTION =
  "AI voice agents in Dubai that answer inbound calls, run outbound calling, qualify leads and book appointments 24/7 — without growing your headcount.";

export const metadata = pageMetadata({
  title: "AI Voice Agents & AI Calling Solutions | BrandSparkX Dubai",
  description: DESCRIPTION,
  path: PATH,
});

// 40 bars; staggered delays and five repeating durations, as in the original.
const bars = Array.from({ length: 40 }, (_, i) => ({
  animationDelay: `${(i * 0.06).toFixed(2)}s`,
  animationDuration: `${(0.8 + (i % 5) * 0.15).toFixed(2)}s`,
}));

// The transcript animates in with CSS on every visit (delays of 1.1s per message).
const transcript = [
  {
    who: "a",
    label: "AI agent",
    text: "Hi, thanks for calling. Are you looking to automate your customer calls?",
  },
  { who: "c", label: "Caller", text: "Yes — we miss a lot of enquiries after hours." },
  {
    who: "a",
    label: "AI agent",
    text: "I can help with that. Shall I book a demo with our team for Thursday at 11?",
  },
  { who: "c", label: "Caller", text: "Thursday works." },
];

const capabilities: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "i-sales",
    title: "Qualify leads",
    text: "Identify serious prospects before your sales team gets involved.",
  },
  {
    icon: "s-retain",
    title: "Follow up automatically",
    text: "Never let a promising lead go cold.",
  },
  {
    icon: "i-check",
    title: "Book appointments",
    text: "Turn conversations into scheduled meetings.",
  },
  { icon: "i-phone", title: "Handle inbound calls", text: "Answer customer enquiries instantly." },
  {
    icon: "i-voice",
    title: "Outbound calling",
    text: "Reach prospects at scale with natural, consistent conversations.",
  },
  {
    icon: "i-growth",
    title: "Scale conversations",
    text: "Grow call volume without growing headcount.",
  },
];

const builtFor = [
  "Sales teams",
  "Lead generation",
  "Customer support",
  "Appointment booking",
  "Follow-up campaigns",
  "High-volume calling",
];

const voiceContact = contactHref("AI Voice & Calling");

export default function VoicePage() {
  return (
    <div className="page on">
      <JsonLd data={serviceJsonLd("AI Voice & Calling", DESCRIPTION, PATH)} />
      <div className="phero">
        <div className="wrap voice-hero">
          <div>
            <Breadcrumbs items={[{ name: "AI Voice & Calling", path: PATH }]} />
            <h1>AI that speaks to your customers.</h1>
            <p className="lede">
              Automate conversations without losing the human connection. Handle inbound and
              outbound calls, qualify leads, follow up with prospects and book appointments.
            </p>
            <Link href={voiceContact} className="btn btn-red">
              Book an AI Voice Demo <Icon name="i-arrow" />
            </Link>
          </div>
          <div
            className="call orange-hover-glow"
            role="group"
            aria-label="Illustrative AI voice call"
          >
            <div className="call-top">
              <span className="live">
                <i />
                AI agent · live call
              </span>
              <span>Sample conversation</span>
            </div>
            <div className="vw" aria-hidden="true">
              {bars.map((style, i) => (
                <i key={i} style={style} />
              ))}
            </div>
            <div className="tx">
              {transcript.map((m, i) => (
                <div key={i} className={m.who} style={{ animationDelay: `${i * 1.1}s` }}>
                  <small>{m.label}</small>
                  {m.text}
                </div>
              ))}
            </div>
            <div className="call-foot">
              <span className="chip">intent: book_demo</span>
              <span className="chip">lead_score: high</span>
              <span className="chip">crm: updated</span>
            </div>
          </div>
        </div>
      </div>

      <section>
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <div className="kicker">What it can do</div>
              <h2>Every call answered. Every lead followed up.</h2>
            </div>
            <p className="lede">
              Engage hundreds or thousands of prospects without increasing manual workload.
            </p>
          </div>
          <div className="caps rv">
            {capabilities.map((c) => (
              <div className="cap" key={c.title}>
                <div className="ic">
                  <Icon name={c.icon} />
                </div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--soft)" }}>
        <div className="wrap">
          <div className="kicker rv">Built for</div>
          <h2 className="rv" style={{ marginBottom: 36 }}>
            Teams that live on the phone.
          </h2>
          <div className="built rv">
            {builtFor.map((b) => (
              <span key={b}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      <FinalCta compactTop title="Your next customer conversation could be AI-powered.">
        <Link href={voiceContact} className="btn btn-red">
          Talk to Us <Icon name="i-arrow" />
        </Link>
      </FinalCta>
    </div>
  );
}
