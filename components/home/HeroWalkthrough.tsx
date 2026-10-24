"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { Icon, type IconName } from "@/components/Icon";
import { useReducedMotion } from "@/lib/useReducedMotion";

const LOOP_SECONDS = 12;

/** When each beat of the sample call starts, in seconds into the loop. */
const CUES = {
  answer: 0.8,
  caller: 1.5,
  typing: 2.6,
  reply: 3.4,
  detail: 4.8,
  qualify: 5.5,
  budget: 6.1,
  area: 6.6,
  ready: 7.1,
  crm: 8.1,
  book: 9.1,
  reset: 11.4,
} as const;
type Cue = keyof typeof CUES;
const CUE_TIMES = Object.values(CUES);

/** Reduced motion shows this moment of the call as a still frame. */
const STILL_FRAME = 10;
const SCORE = 86;
/** Matches the ring's 2s fill transition in hero.css. */
const SCORE_SECONDS = 2;

const flow: { cue: Cue; icon: IconName; label: string }[] = [
  { cue: "answer", icon: "i-phone", label: "Answer" },
  { cue: "qualify", icon: "i-sales", label: "Qualify" },
  { cue: "crm", icon: "i-db", label: "Update CRM" },
  { cue: "book", icon: "i-check", label: "Book" },
];

const checks: { cue: Cue; label: string }[] = [
  { cue: "budget", label: "Budget confirmed" },
  { cue: "area", label: "Area matched" },
  { cue: "ready", label: "Ready this week" },
];

// Fixed bar heights, speeds and delays so the server and client render the same markup.
const waveBars = Array.from(
  { length: 30 },
  (_, i) =>
    ({
      "--h": (0.4 + ((i * 7) % 10) / 15).toFixed(2),
      "--s": `${(0.45 + (i % 5) * 0.12).toFixed(2)}s`,
      "--d": `${(-(i % 6) * 0.17).toFixed(2)}s`,
    }) as CSSProperties,
);

const formatTime = (s: number) => `00:${String(Math.floor(s)).padStart(2, "0")}`;
const easeOut = (x: number) => 1 - (1 - x) ** 3;
const phaseAt = (t: number) => CUE_TIMES.reduce((p, cue) => (cue <= t ? Math.max(p, cue) : p), 0);
const cls = (...names: (string | false)[]) => names.filter(Boolean).join(" ");

/**
 * Hero "video": a 12-second walkthrough of an AI voice agent answering a call, qualifying the lead,
 * updating the CRM and booking a meeting. One clock drives it: React flips a class at each cue and
 * CSS transitions do the motion; the counters and progress bar are written straight to the DOM.
 */
export function HeroWalkthrough() {
  const reduce = useReducedMotion();
  const gradientId = `hx-g${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const [paused, setPaused] = useState(false);
  const [livePhase, setLivePhase] = useState(0);
  const elapsed = useRef(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const callRef = useRef<HTMLSpanElement>(null);
  const scoreRef = useRef<HTMLElement>(null);

  const phase = reduce ? phaseAt(STILL_FRAME) : livePhase;
  const has = (cue: Cue) => phase >= CUES[cue] && phase < CUES.reset;
  const step = flow.reduce((last, f, i) => (has(f.cue) ? i : last), -1);

  useEffect(() => {
    const paint = (t: number) => {
      trackRef.current?.style.setProperty("--t", String(t / LOOP_SECONDS));
      if (timeRef.current) {
        timeRef.current.textContent = `${formatTime(t)} / ${formatTime(LOOP_SECONDS)}`;
      }
      if (callRef.current) {
        callRef.current.textContent = formatTime(
          Math.max(0, Math.min(t, CUES.reset) - CUES.answer),
        );
      }
      if (scoreRef.current) {
        const filled =
          t < CUES.qualify || t >= CUES.reset
            ? 0
            : easeOut(Math.min(1, (t - CUES.qualify) / SCORE_SECONDS));
        scoreRef.current.textContent = String(Math.round(filled * SCORE));
      }
    };

    if (reduce) {
      paint(STILL_FRAME);
      return;
    }
    if (paused) return;

    let frame = 0;
    let last = 0;
    const tick = (now: number) => {
      // Cap each step so a tab coming back from the background doesn't jump ahead.
      if (last)
        elapsed.current = (elapsed.current + Math.min(now - last, 100) / 1000) % LOOP_SECONDS;
      last = now;
      setLivePhase(phaseAt(elapsed.current));
      paint(elapsed.current);
      frame = requestAnimationFrame(tick);
    };

    // Run the clock only while the console is on screen.
    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      last = 0;
      if (entry.isIntersecting) frame = requestAnimationFrame(tick);
    });
    if (stageRef.current) observer.observe(stageRef.current);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [reduce, paused]);

  // Lean the console toward the mouse.
  const tilt = (e: PointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (!stage || reduce || e.pointerType !== "mouse") return;
    const box = stage.getBoundingClientRect();
    const x = (e.clientX - box.left) / box.width - 0.5;
    const y = (e.clientY - box.top) / box.height - 0.5;
    stage.style.setProperty("--ry", `${(x * 8).toFixed(2)}deg`);
    stage.style.setProperty("--rx", `${(-y * 6).toFixed(2)}deg`);
  };
  const untilt = () => {
    stageRef.current?.style.setProperty("--rx", "0deg");
    stageRef.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <div className="hx-stage" ref={stageRef} onPointerMove={tilt} onPointerLeave={untilt}>
      <div className="hx-tilt">
        <div className="hx-halo" aria-hidden="true" />

        <div className={cls("hx-console", paused && "paused")}>
          <div className="hx-bar" aria-hidden="true">
            <span className="hx-dots">
              <i />
              <i />
              <i />
            </span>
            <span>
              brandsparkx<em>/</em>voice-agent
            </span>
            <span className={cls("hx-live", has("answer") && "on")}>
              <i />
              {has("answer") ? "Live" : "Ringing"}
            </span>
          </div>

          <div
            className="hx-screen"
            role="img"
            aria-label="Sample walkthrough: an AI voice agent answers an inbound enquiry, qualifies the lead, updates the CRM and books a meeting"
          >
            <div className="hx-panel hx-call">
              <div className="hx-ph">
                <span>Inbound call</span>
                <span ref={callRef}>00:00</span>
              </div>
              <div className={cls("hx-caller", has("answer") && "on")}>
                <span className="hx-av">
                  NE
                  <i />
                  <i />
                </span>
                <div>
                  <b>New enquiry</b>
                  <small>{has("answer") ? "Connected · property viewing" : "Incoming call…"}</small>
                </div>
              </div>
              <div className={cls("hx-wave", has("answer") && "on")}>
                {waveBars.map((style, i) => (
                  <i key={i} style={style} />
                ))}
              </div>
              <div className="hx-chat">
                <p className={cls("hx-msg", has("caller") && "on")}>
                  <small>Caller</small>Hi, I&apos;d like to view an apartment this week.
                </p>
                <p className={cls("hx-msg ai", has("typing") && "on", has("reply") && "said")}>
                  <small>AI agent</small>
                  <span className="hx-said">
                    Happy to help. What budget and area do you have in mind?
                  </span>
                  <span className="hx-typing">
                    <i />
                    <i />
                    <i />
                  </span>
                </p>
                <p className={cls("hx-msg", has("detail") && "on")}>
                  <small>Caller</small>Business Bay, ready to move soon.
                </p>
              </div>
            </div>

            <div className="hx-panel hx-intent">
              <div className="hx-ph">
                <span>Lead score</span>
                <span className={cls("hx-hot", has("ready") && "on")}>
                  {has("ready") ? "Hot lead" : "Scoring"}
                </span>
              </div>
              <div className={cls("hx-ring", has("qualify") && "on")}>
                <svg viewBox="0 0 80 80">
                  <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#ff8a5c" />
                      <stop offset="1" stopColor="#d83232" />
                    </linearGradient>
                  </defs>
                  <circle cx="40" cy="40" r="39" className="hx-ring-tick" />
                  <circle cx="40" cy="40" r="32" className="hx-ring-bg" />
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    className="hx-ring-fg"
                    stroke={`url(#${gradientId})`}
                  />
                </svg>
                <div className="hx-ring-l">
                  <b ref={scoreRef}>0</b>
                  <small>intent</small>
                </div>
              </div>
              <ul className="hx-checks">
                {checks.map((c) => (
                  <li key={c.cue} className={has(c.cue) ? "on" : undefined}>
                    <span>
                      <Icon name="i-check" />
                    </span>
                    {c.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="hx-panel hx-flow">
              <div className="hx-ph">
                <span>Automated workflow</span>
                <span>agent.run()</span>
              </div>
              <div
                className={cls("hx-track", step > 0 && "flowing")}
                style={{ "--p": Math.max(step, 0) / (flow.length - 1) } as CSSProperties}
              >
                <div className="hx-line">
                  <i />
                  <b />
                </div>
                {flow.map((f, i) => (
                  <div
                    key={f.cue}
                    className={cls("hx-node", i <= step && "on", i === step && "now")}
                  >
                    <span>
                      <Icon name={f.icon} />
                    </span>
                    {f.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hx-ctrl">
            <button
              type="button"
              className="hx-play"
              aria-label={paused ? "Play walkthrough" : "Pause walkthrough"}
              onClick={() => setPaused((p) => !p)}
            >
              <Icon name={paused ? "i-play" : "i-pause"} />
            </button>
            <div className="hx-ptrack" ref={trackRef} aria-hidden="true">
              <i />
              <b />
            </div>
            <span className="hx-time" ref={timeRef}>
              00:00 / 00:12
            </span>
            <span className="hx-tag">Sample walkthrough</span>
          </div>
        </div>

        <div className="hx-chip c1" aria-hidden="true">
          <span>
            <i />
          </span>
          Answering 24/7
        </div>
        <div className="hx-chip c2" aria-hidden="true">
          <span>
            <Icon name="i-voice" />
          </span>
          Multilingual voice
        </div>
        <div className={cls("hx-toast", has("book") && "on")} aria-hidden="true">
          <span>
            <Icon name="i-check" />
          </span>
          <div>
            <b>Meeting booked</b>
            <small>Thu · 11:00 · added to calendar</small>
          </div>
        </div>
      </div>
    </div>
  );
}
