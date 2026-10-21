"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Icon } from "@/components/Icon";
import { flowStages } from "@/content/flow";
import { useReducedMotion } from "@/lib/useReducedMotion";

const AUTO_ADVANCE_MS = 2500;
const last = flowStages.length - 1;

/**
 * Customer-journey stepper. Advances on its own while in view and loops continuously.
 */
export function GrowthFlow() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || reduce) return;
    const timer = window.setInterval(
      () => setActive((i) => (i + 1) % flowStages.length),
      AUTO_ADVANCE_MS,
    );
    return () => window.clearInterval(timer);
  }, [inView, reduce]);

  const select = (i: number) => setActive(i);

  const onKeyDown = (e: KeyboardEvent) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    let next: number | undefined;
    if (step) next = (active + step + flowStages.length) % flowStages.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next === undefined) return;
    e.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  };

  const stage = flowStages[active];

  return (
    <div className="flow rv" ref={rootRef}>
      <div
        className="flow-track"
        role="tablist"
        aria-label="Customer journey stages"
        onKeyDown={onKeyDown}
      >
        <div className="flow-line">
          <i style={{ transform: `scaleX(${active / last})` }} />
        </div>
        {flowStages.map((s, i) => (
          <button
            key={s.name}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            className={i <= active ? "fnode on" : "fnode"}
            role="tab"
            id={`flow-tab-${i}`}
            aria-selected={i === active}
            aria-controls="flow-panel"
            tabIndex={i === active ? 0 : -1}
            onClick={() => select(i)}
          >
            <span className="dot">
              <Icon name={s.icon} />
            </span>
            <b>{s.name.toUpperCase()}</b>
          </button>
        ))}
      </div>
      {/* `key` remounts the panel so its fade-in replays on every stage change. */}
      <div
        className="flow-detail"
        id="flow-panel"
        role="tabpanel"
        aria-labelledby={`flow-tab-${active}`}
        aria-live="polite"
        key={active}
      >
        <div className="flow-anim st">
          0{active + 1}
          <span style={{ color: "var(--red)" }}>/</span>06
        </div>
        <div className="flow-anim">
          <h3>
            {stage.name} — {stage.headline}
          </h3>
          <p>{stage.text}</p>
        </div>
        <div className="uses flow-anim">
          {stage.uses.map((u) => (
            <span className="chip" key={u}>
              {u}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
