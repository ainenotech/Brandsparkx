"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { useReducedMotion } from "@/lib/useReducedMotion";

const LOOP_SECONDS = 12;
const formatTime = (s: number) => `00:${String(Math.floor(s)).padStart(2, "0")}`;

// 30 waveform bars: staggered delays, five repeating durations (same values as the original).
const waveBars = Array.from({ length: 30 }, (_, i) => ({
  animationDelay: `${(i * 0.05).toFixed(2)}s`,
  animationDuration: `${(0.8 + (i % 5) * 0.14).toFixed(2)}s`,
}));

/**
 * Hero "video": a CSS-animated 12-second walkthrough of an AI voice agent handling a call.
 * JavaScript only syncs the clock and the intent score with the CSS animation, and handles play/pause.
 */
export function HeroWalkthrough() {
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const timerRef = useRef<HTMLSpanElement>(null);
  const scoreRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reduce) return;
    let frame = 0;
    let visible = true;

    const tick = () => {
      const animation = fillRef.current?.getAnimations?.()[0];
      const current = animation?.currentTime;
      if (typeof current === "number") {
        const t = (current / 1000) % LOOP_SECONDS;
        if (timeRef.current) timeRef.current.textContent = `${formatTime(t)} / 00:12`;
        if (timerRef.current) timerRef.current.textContent = formatTime(Math.min(t, 11));
        // The score counts up while the qualification card animates in (4.32s → 7.2s), then holds.
        const score = t < 4.32 || t > 11.16 ? 0 : Math.round(Math.min(1, (t - 4.32) / 2.88) * 86);
        if (scoreRef.current) scoreRef.current.textContent = String(score);
      }
      if (visible) frame = requestAnimationFrame(tick);
    };

    // Stop the loop while the hero is off-screen.
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible) frame = requestAnimationFrame(tick);
    });
    if (rootRef.current) observer.observe(rootRef.current);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [reduce]);

  return (
    <div className={paused ? "vid paused" : "vid"} ref={rootRef}>
      <div className="vid-bar" aria-hidden="true">
        <span className="dots">
          <i />
          <i />
          <i />
        </span>
        <span>brandsparkx · ai operations</span>
        <span className="rec">
          <i />
          LIVE
        </span>
      </div>
      <div
        className="vid-screen"
        role="img"
        aria-label="Sample walkthrough: an AI voice agent answers an inbound enquiry, qualifies the lead, updates the CRM and books a meeting"
      >
        <div className="vc vcall">
          <div className="vh">
            <span>Inbound call</span>
            <span ref={timerRef}>00:00</span>
          </div>
          <div className="caller">
            <span className="cav">NE</span>
            <div>
              <b>New enquiry</b>
              <small>Property viewing request</small>
            </div>
          </div>
          <div className="vwave">
            {waveBars.map((style, i) => (
              <i key={i} style={style} />
            ))}
          </div>
          <div className="tl l1">
            <small>Caller</small>Hi, I&apos;d like to view an apartment this week.
          </div>
          <div className="tl ai l2">
            <small>AI agent</small>Happy to help. What budget and area do you have in mind?
          </div>
          <div className="tl l3">
            <small>Caller</small>Business Bay, ready to move soon.
          </div>
        </div>

        <div className="vc score">
          <div className="vh">
            <span>Lead qualification</span>
          </div>
          <div className="ring">
            <svg viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="32" className="rbg" />
              <circle cx="40" cy="40" r="32" className="rfg" />
            </svg>
            <div className="rlbl">
              <b ref={scoreRef}>86</b>
              <small>intent</small>
            </div>
          </div>
          <div className="tg t1">
            <Icon name="i-check" />
            Budget confirmed
          </div>
          <div className="tg t2">
            <Icon name="i-check" />
            Area matched
          </div>
          <div className="tg t3">
            <Icon name="i-check" />
            Ready this week
          </div>
        </div>

        <div className="vc pipe">
          <div className="vh">
            <span>Automated workflow</span>
            <span>agent.run()</span>
          </div>
          <div className="ptrack">
            <div className="pline">
              <i className="pfill" />
            </div>
            <div className="pn n1">
              <span className="d">
                <Icon name="i-phone" />
              </span>
              Answer
            </div>
            <div className="pn n2">
              <span className="d">
                <Icon name="i-sales" />
              </span>
              Qualify
            </div>
            <div className="pn n3">
              <span className="d">
                <Icon name="i-db" />
              </span>
              Update CRM
            </div>
            <div className="pn n4">
              <span className="d">
                <Icon name="i-check" />
              </span>
              Book
            </div>
          </div>
        </div>

        <div className="toast">
          <Icon name="i-check" />
          <div>
            <b>Meeting booked</b>
            <small>Thu · 11:00 · added to calendar</small>
          </div>
        </div>
      </div>

      <div className="vid-ctrl">
        <button
          type="button"
          className="vplay"
          aria-label={paused ? "Play walkthrough" : "Pause walkthrough"}
          onClick={() => setPaused((p) => !p)}
        >
          <Icon name="i-pause" className="pa" />
          <Icon name="i-play" className="pl" />
        </button>
        <div className="vtrack">
          <i className="vfill" ref={fillRef} />
        </div>
        <span className="vtime" ref={timeRef}>
          00:00 / 00:12
        </span>
        <span className="vlbl">Sample walkthrough</span>
      </div>
    </div>
  );
}
