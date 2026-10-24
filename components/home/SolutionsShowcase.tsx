"use client";

import Link from "next/link";
import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import { Icon, type IconName } from "@/components/Icon";
import { CtaOrb } from "@/components/home/CtaOrb";

const vars = (v: Record<string, string | number>) => v as CSSProperties;
const pad = (n: number) => String(n).padStart(2, "0");

const voiceChips = [
  "Inbound & outbound",
  "Lead qualification",
  "Appointment booking",
  "Answers 24/7",
];

/** One scripted call the console plays on a loop; the last stage holds before it restarts. */
const call = [
  { status: "Incoming call", line: "Ringing…" },
  { status: "Answered", line: "Hi, thanks for calling. How can I help today?" },
  { status: "Qualifying", line: "Great. What timeline are you working with?" },
  { status: "Booked", line: "You're booked in. A confirmation is on its way." },
];
const callSteps = ["Answer", "Qualify", "Book"];

const flow: { icon: IconName; label: string }[] = [
  { icon: "i-users", label: "New lead" },
  { icon: "i-db", label: "CRM updated" },
  { icon: "i-wa", label: "WhatsApp follow-up" },
];

const solutions: {
  href: string;
  icon: IconName;
  title: string;
  tag: string;
  text: string;
  scope: string[];
}[] = [
  {
    href: "/solutions/ai-sales",
    icon: "i-sales",
    title: "AI Sales",
    tag: "Turn leads into conversations.",
    text: "Use AI to qualify leads, follow up, engage prospects and move every opportunity forward.",
    scope: ["Qualify", "Follow up", "Engage"],
  },
  {
    href: "/solutions/ai-growth",
    icon: "i-growth",
    title: "AI Growth",
    tag: "Turn AI into a growth strategy.",
    text: "Find where AI creates the greatest impact, then get a practical roadmap.",
    scope: ["Impact", "Roadmap"],
  },
  {
    href: "/solutions/ai-content",
    icon: "i-content",
    title: "AI Content",
    tag: "Create more. Work less.",
    text: "An AI-powered content engine for social, video, copy and campaigns.",
    scope: ["Social", "Video", "Copy"],
  },
  {
    href: "/solutions/ai-marketing",
    icon: "i-mkt",
    title: "AI Marketing",
    tag: "Make marketing more intelligent.",
    text: "Automate lead generation, nurturing, CRM and WhatsApp workflows.",
    scope: ["Lead gen", "CRM", "WhatsApp"],
  },
  {
    href: "/ai-engineers",
    icon: "i-eng",
    title: "AI Engineers on Demand",
    tag: "AI talent when you need it.",
    text: "AI engineers and developers by project, week or month.",
    scope: ["Project", "Week", "Month"],
  },
];

/** Each card's slot within its desktop row (Sales sits beside Automation), so rows stagger left to right. */
const rowSlot = [1, 0, 1, 2, 0];

/** Waveform bar heights: a soft envelope so the middle of the wave peaks. */
const bars = Array.from({ length: 36 }, (_, i) => {
  const env = Math.sin((Math.PI * (i + 0.5)) / 36);
  return { h: (0.3 + 0.7 * env * (0.55 + 0.45 * Math.abs(Math.sin(i * 1.7)))).toFixed(2), i };
});

// Cards carry a soft spotlight that follows the pointer.
const track = (e: PointerEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

/** Card footer: what the capability covers, and an arrow that turns on hover. */
const Foot = ({ scope }: { scope: string[] }) => (
  <span className="sx-foot">
    <span className="sx-scope">
      {scope.map((s) => (
        <span key={s}>{s}</span>
      ))}
    </span>
    <span className="sx-go">
      <Icon name="i-arrow" />
    </span>
  </span>
);

const Check = () => (
  <svg viewBox="0 0 24 24">
    <path d="M5 12.5l4.5 4.5L19 7.5" pathLength={1} />
  </svg>
);

export function SolutionsShowcase() {
  const consoleRef = useRef<HTMLDivElement>(null);
  const [tick, setTick] = useState(0);
  const stage = Math.min(tick, call.length - 1);

  // Play the call loop only while the console is on screen; reduced motion shows the finished call.
  useEffect(() => {
    const el = consoleRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = requestAnimationFrame(() => setTick(call.length - 1));
      return () => cancelAnimationFrame(frame);
    }
    let timer = 0;
    const io = new IntersectionObserver(([entry]) => {
      window.clearInterval(timer);
      if (entry.isIntersecting) {
        timer = window.setInterval(() => setTick((t) => (t + 1) % (call.length + 1)), 2200);
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div className="sx-grid">
      <Link
        href="/ai-voice-calling"
        className="sx-card sx-voice"
        style={vars({ "--d": 0 })}
        data-reveal-host
        onPointerMove={track}
      >
        <div className="sx-voice-copy">
          <span className="sx-badge">
            <i />
            Our flagship
          </span>
          <h3>AI Voice &amp; Calling</h3>
          <div className="sx-tag">Give your business a voice.</div>
          <p>
            AI voice agents that answer, qualify and book appointments for you, 24/7 — inbound and
            outbound.
          </p>
          <ul className="sx-chips">
            {voiceChips.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <span className="sx-cta">
            Explore voice agents <Icon name="i-arrow" />
          </span>
        </div>

        <div className="sx-console" ref={consoleRef} data-stage={stage} aria-hidden="true">
          <div className="sx-console-head">
            <span className="sx-orb">
              <Icon name="i-voice" />
            </span>
            <div>
              <b>AI voice agent</b>
              <small key={stage}>{call[stage].status}</small>
            </div>
            <span className="sx-live">
              <i />
              Live
            </span>
          </div>
          <div className="sx-wave">
            {bars.map(({ h, i }) => (
              <i key={i} style={vars({ "--h": h, "--b": i })} />
            ))}
          </div>
          <p className="sx-line" key={stage}>
            {call[stage].line}
          </p>
          <ol className="sx-steps">
            {callSteps.map((s, i) => (
              <li key={s} data-on={stage > i || undefined}>
                <span>
                  <Check />
                </span>
                {s}
              </li>
            ))}
          </ol>
        </div>
      </Link>

      <Link
        href="/solutions/business-automation"
        className="sx-card sx-auto"
        style={vars({ "--d": 0 })}
        data-reveal-host
        onPointerMove={track}
      >
        <span className="sx-top">
          <span className="sx-ic">
            <Icon name="i-auto" />
          </span>
          <span className="sx-idx">02</span>
        </span>
        <div className="sx-flow" aria-hidden="true">
          {flow.map((n, i) => (
            <Fragment key={n.label}>
              <span className="sx-node" style={vars({ "--n": i })}>
                <span>
                  <Icon name={n.icon} />
                </span>
                {n.label}
              </span>
              {i < flow.length - 1 && <span className="sx-pipe" style={vars({ "--n": i })} />}
            </Fragment>
          ))}
        </div>
        <h3>Business Automation</h3>
        <div className="sx-tag">Connect your business. Automate the work.</div>
        <p>Connect people, tools and data so repetitive work runs itself.</p>
        <Foot scope={["People", "Tools", "Data"]} />
      </Link>

      {solutions.map((s, i) => (
        <Link
          key={s.href}
          href={s.href}
          className="sx-card"
          style={vars({ "--d": rowSlot[i] })}
          data-reveal-host
          onPointerMove={track}
        >
          <span className="sx-top">
            <span className="sx-ic">
              <Icon name={s.icon} />
            </span>
            <span className="sx-idx">{pad(i + 3)}</span>
          </span>
          <h3>{s.title}</h3>
          <div className="sx-tag">{s.tag}</div>
          <p>{s.text}</p>
          <Foot scope={s.scope} />
        </Link>
      ))}

      <Link
        href="/contact"
        className="sx-card sx-cta-card"
        style={vars({ "--d": 1 })}
        data-reveal-host
        onPointerMove={track}
      >
        <CtaOrb />
        <div className="sx-cta-copy">
          <span className="sx-eyebrow">Your first step</span>
          <h3>Start with one problem.</h3>
          <p>Build from there. Prove it in 7 days.</p>
          <span className="btn btn-white">
            Talk to Us <Icon name="i-arrow" />
          </span>
        </div>
      </Link>
    </div>
  );
}
