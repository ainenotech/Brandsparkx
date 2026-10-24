"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { processSteps } from "@/content/process";

const vars = (v: Record<string, string | number>) => v as CSSProperties;

/** The track rises left to right in a gentle wave; y is in viewBox units (0–140, smaller is higher). */
const VIEW_H = 140;
const curveY = (t: number) => 112 - 84 * t + 10 * Math.sin(2 * Math.PI * 2.5 * t);
const trackPath = Array.from({ length: 121 }, (_, i) => {
  const t = i / 120;
  return `${i ? "L" : "M"}${(t * 1000).toFixed(1)} ${curveY(t).toFixed(2)}`;
}).join(" ");

/** Each stage sits at the centre of its column. */
const stageX = processSteps.map((_, i) => (i + 0.5) / processSteps.length);

/** Small line icons, one per stage; every stroke draws itself when its stage is reached. */
const icons: ReactNode[] = [
  <>
    <circle cx="10.5" cy="10.5" r="6" pathLength={1} />
    <path d="M15 15l5 5" pathLength={1} />
  </>,
  <>
    <circle cx="12" cy="12" r="8.5" pathLength={1} />
    <circle cx="12" cy="12" r="4.5" pathLength={1} />
    <path d="M12 12l6-6M15.5 5.5H18.5V8.5" pathLength={1} />
  </>,
  <>
    <path d="M4 8l8-4 8 4-8 4z" pathLength={1} />
    <path d="M4 12l8 4 8-4" pathLength={1} />
    <path d="M4 16l8 4 8-4" pathLength={1} />
  </>,
  <>
    <path d="M20 12a8 8 0 0 1-14.3 4.9" pathLength={1} />
    <path d="M4 12a8 8 0 0 1 14.3-4.9" pathLength={1} />
    <path d="M18.6 3.2v4.1h-4.1M5.4 20.8v-4.1h4.1" pathLength={1} />
  </>,
  <>
    <path d="M4 20h16" pathLength={1} />
    <path d="M7 16v-3M12 16v-6M17 16V7" pathLength={1} />
    <path d="M14.5 6.5L17 4l2.5 2.5" pathLength={1} />
  </>,
];

export function HowWeWork() {
  const ref = useRef<HTMLDivElement>(null);
  const [reached, setReached] = useState(0);

  // Scroll drives the line: --p is how far it has drawn, and each stage lights up once the line passes it.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const apply = (p: number) => {
      el.style.setProperty("--p", p.toFixed(4));
      el.style.setProperty("--cy", (curveY(p) / VIEW_H).toFixed(4));
      setReached(stageX.filter((x) => p >= x - 0.02).length);
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply(1);
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const r = el.getBoundingClientRect();
      // Starts as the top reaches 85% of the viewport and finishes while the cards are still in view.
      const p = (vh * 0.85 - r.top) / (r.height * 0.8);
      apply(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="hw" ref={ref}>
      <div className="hw-track" aria-hidden="true">
        <svg className="hw-ghost" viewBox={`0 0 1000 ${VIEW_H}`} preserveAspectRatio="none">
          <path d={trackPath} />
        </svg>
        <div className="hw-live">
          <svg viewBox={`0 0 1000 ${VIEW_H}`} preserveAspectRatio="none">
            <path d={trackPath} />
          </svg>
        </div>
        <span className="hw-comet" />
      </div>
      <ol className="hw-steps">
        {processSteps.map((step, i) => (
          <li
            key={step.title}
            className="hw-step"
            style={vars({ "--x": stageX[i], "--y": curveY(stageX[i]) / VIEW_H, "--i": i })}
            data-on={i < reached || undefined}
            data-current={i === reached - 1 || undefined}
          >
            <span className="hw-node" aria-hidden="true">
              <span>0{i + 1}</span>
            </span>
            <div className="hw-card">
              <span className="hw-ic" aria-hidden="true">
                <svg viewBox="0 0 24 24">{icons[i]}</svg>
              </span>
              <span className="hw-label">Stage 0{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
