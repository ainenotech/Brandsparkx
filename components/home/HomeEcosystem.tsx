"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { Icon } from "@/components/Icon";
import { FlowDiagram, type FlowZone } from "@/components/flow/FlowDiagram";
import { getFlow } from "@/content/flows";
import { contactHref } from "@/content/solutions";
import { useReducedMotion } from "@/lib/useReducedMotion";

const vars = (v: Record<string, string | number>) => v as CSSProperties;

/** What the system does, each tied to the part of the diagram it spotlights. */
const modes: { zone: FlowZone; title: string; text: string }[] = [
  {
    zone: "in",
    title: "Connects",
    text: "Ads, calls, WhatsApp and your CRM, all feeding one place.",
  },
  { zone: "hub", title: "Automates", text: "BrandSparkX AI picks up the repetitive work." },
  { zone: "out", title: "Follows up", text: "Every lead is handled, so nothing is missed." },
];
const CYCLE_MS = 3600;

export function HomeEcosystem() {
  const flow = getFlow("home");
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [focus, setFocus] = useState(0);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.2,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Step to the next mode on a timer while on screen, unless the visitor is pointing at one.
  useEffect(() => {
    if (!visible || paused || reduce) return;
    const timer = window.setTimeout(() => setFocus((f) => (f + 1) % modes.length), CYCLE_MS);
    return () => window.clearTimeout(timer);
  }, [focus, visible, paused, reduce]);

  // The diagram leans gently toward the pointer.
  const tilt = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.setProperty("--ry", `${(x * 8).toFixed(2)}deg`);
    e.currentTarget.style.setProperty("--rx", `${(-y * 6).toFixed(2)}deg`);
  };
  const untilt = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--ry", "0deg");
    e.currentTarget.style.setProperty("--rx", "0deg");
  };

  if (!flow) return null;

  let w = 0;
  return (
    <section className="eco-sec">
      <div
        className="wrap eco"
        ref={rootRef}
        data-reveal-host
        data-focus={reduce ? undefined : modes[focus].zone}
      >
        <div className="eco-text">
          <div className="kicker">{flow.kicker}</div>
          <h2>
            {flow.title.split(" ").map((word, i, all) => (
              <span key={word}>
                <span className="eco-w">
                  <span style={vars({ "--w": w++ })}>{word}</span>
                </span>
                {i < all.length - 1 && " "}
              </span>
            ))}
          </h2>
          <p className="lede">{flow.text}</p>

          <ul
            className="eco-modes"
            data-paused={paused || undefined}
            onPointerLeave={() => setPaused(false)}
          >
            {modes.map((m, i) => (
              <li key={m.zone}>
                <button
                  type="button"
                  aria-pressed={i === focus}
                  onPointerEnter={() => {
                    setFocus(i);
                    setPaused(true);
                  }}
                  onFocus={() => setFocus(i)}
                  onClick={() => setFocus(i)}
                >
                  <span className="eco-n">0{i + 1}</span>
                  <span className="eco-copy">
                    <b>{m.title}</b>
                    <small>{m.text}</small>
                  </span>
                  <span className="eco-bar" aria-hidden="true">
                    {i === focus && <i key={focus} />}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="eco-actions">
            <Link href={contactHref(flow.interest)} className="eco-cta">
              Talk to Us <Icon name="i-arrow" />
            </Link>
            <Link href="#how" className="link">
              See how we work <Icon name="i-arrow" width={16} height={16} />
            </Link>
          </div>
        </div>

        <div className="eco-visual">
          <div className="eco-tilt" onPointerMove={tilt} onPointerLeave={untilt}>
            <div className="eco-frame">
              <FlowDiagram flow={flow} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
