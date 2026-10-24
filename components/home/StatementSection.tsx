"use client";

import { Fragment, useEffect, useRef, type CSSProperties, type PointerEvent } from "react";

const vars = (v: Record<string, string | number>) => v as CSSProperties;
const pad = (n: number) => String(n).padStart(2, "0");

const claim = "AI should do more than generate content or answer questions.";
const promise =
  "It should help your business attract customers, automate work, accelerate sales and build better systems.";

const capabilities = [
  "Automate repetitive processes",
  "Build AI-powered customer experiences",
  "Develop custom AI solutions",
  "Add AI talent to your technology team",
];

/** Headline lines; `strike` words get crossed out once the line is in. */
const headline: { text: string; strike?: boolean; accent?: boolean }[][] = [
  [{ text: "Stop" }, { text: "experimenting.", strike: true }],
  [{ text: "Start" }, { text: "building" }, { text: "with" }, { text: "AI.", accent: true }],
];

export function StatementSection() {
  const copyRef = useRef<HTMLParagraphElement>(null);

  // The statement lights up word by word as it scrolls through the viewport (--p from 0 to 1).
  useEffect(() => {
    const copy = copyRef.current;
    if (!copy) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      copy.style.setProperty("--p", "1");
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const p = (vh * 0.9 - copy.getBoundingClientRect().top) / (vh * 0.65);
      copy.style.setProperty("--p", Math.min(1, Math.max(0, p)).toFixed(4));
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

  // Cards carry a soft spotlight that follows the pointer.
  const track = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const words = [
    ...claim.split(" ").map((text) => ({ text, soft: false })),
    ...promise.split(" ").map((text) => ({ text, soft: true })),
  ];

  let w = 0;
  return (
    <div className="wrap st2" data-reveal-host>
      <div className="st2-left">
        <div className="kicker">AI that works for your business</div>
        <h2>
          {headline.map((line, l) => (
            <span className="st2-line" key={l}>
              {line.map(({ text, strike, accent }, i) => (
                <Fragment key={text}>
                  <span className="st2-w">
                    <span
                      className={strike ? "st2-strike" : accent ? "st2-accent" : undefined}
                      style={vars({ "--w": w++ })}
                    >
                      {text}
                    </span>
                  </span>
                  {i < line.length - 1 && " "}
                </Fragment>
              ))}
            </span>
          ))}
        </h2>
      </div>

      <span className="st2-rule" aria-hidden="true" />

      <div className="st2-right">
        <p className="st2-big" ref={copyRef} style={vars({ "--n": words.length })}>
          {words.map(({ text, soft }, i) => (
            <Fragment key={i}>
              <span className={soft ? "soft" : undefined} style={vars({ "--i": i })}>
                {text}
              </span>{" "}
            </Fragment>
          ))}
        </p>
        <p className="lede st2-lede">
          BrandSparkX brings strategy, technology and execution together to make AI work inside your
          business.
        </p>
        <ul className="st2-list" data-reveal-host>
          {capabilities.map((item, i) => (
            <li key={item} style={vars({ "--i": i })}>
              <div className="st2-card" onPointerMove={track}>
                <span className="st2-ic" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M5 12.5l4.5 4.5L19 7.5" pathLength={1} />
                  </svg>
                </span>
                <span className="st2-t">{item}</span>
                <span className="st2-n" aria-hidden="true">
                  {pad(i + 1)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
