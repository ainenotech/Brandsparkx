"use client";

import { Fragment, useEffect, useRef, useState, type CSSProperties } from "react";

type Point = readonly [title: string, text: string];

const pad = (n: number) => String(n).padStart(2, "0");

/** Headline words; the two inside `mark` get the hand-drawn underline. */
const lead = ["AI", "should", "create"];
const mark = ["business", "value —"];
const tail = ["not", "complexity."];

const vars = (v: Record<string, string | number>) => v as CSSProperties;

export function WhyPrinciples({ points }: { points: readonly Point[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const rows = Array.from(list.querySelectorAll<HTMLElement>(".why2-row"));

    // The row crossing the middle band of the viewport is the current principle.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(rows.indexOf(e.target as HTMLElement));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    rows.forEach((r) => io.observe(r));

    // The spine fills as the list travels past the middle of the viewport.
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = list.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight / 2 - r.top) / r.height));
      list.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Each word gets the next stagger step; words within a group are space-separated.
  let w = 0;
  const word = (text: string, i: number, group: string[]) => (
    <Fragment key={text}>
      <span className="why2-w">
        <span style={vars({ "--w": w++ })}>{text}</span>
      </span>
      {i < group.length - 1 && " "}
    </Fragment>
  );

  return (
    <div className="wrap why2">
      <div className="why2-intro" data-reveal-host>
        <div className="kicker">Why BrandSparkX</div>
        <h2>
          {lead.map(word)}{" "}
          <span className="why2-mark">
            {mark.map(word)}
            <svg viewBox="0 0 300 14" preserveAspectRatio="none" aria-hidden="true">
              <path d="M3 9.5C62 4.5 150 2.5 297 6.5" pathLength={1} />
            </svg>
          </span>{" "}
          {tail.map(word)}
        </h2>
        <p className="lede">
          Businesses don&apos;t need more disconnected tools. They need the right AI, connected to
          the way they already work.
        </p>

        {/* Mirrors the list for sighted users, so it is hidden from screen readers. */}
        <div className="why2-now" aria-hidden="true" style={vars({ "--a": active })}>
          <div className="why2-count">
            <span className="why2-roll">
              {points.map((_, i) => (
                <span key={i}>{pad(i + 1)}</span>
              ))}
            </span>
            <small>/ {pad(points.length)}</small>
          </div>
          <div className="why2-now-copy">
            <div className="why2-titles">
              {points.map(([title], i) => (
                <span key={title} style={vars({ "--k": i })} data-on={i === active || undefined}>
                  {title}
                </span>
              ))}
            </div>
            <div className="why2-bars">
              {points.map(([title], i) => (
                <i key={title} data-on={i <= active || undefined} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="why2-side">
        <div className="why2-meta rv" aria-hidden="true">
          <span>Our principles</span>
          <span>{pad(points.length)}</span>
        </div>
        <ol className="why2-list" ref={listRef} data-reveal-host>
          {points.map(([title, text], i) => (
            <li
              className="why2-row"
              key={title}
              style={vars({ "--i": i })}
              data-on={i === active || undefined}
              data-past={i < active || undefined}
              onPointerEnter={() => setActive(i)}
            >
              <span className="why2-node" aria-hidden="true" />
              <span className="why2-num" aria-hidden="true">
                {pad(i + 1)}
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
