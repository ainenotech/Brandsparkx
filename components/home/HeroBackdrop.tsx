"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/** Rising sparks: [left %, delay s, duration s]. */
const dust = [
  [56, 0, 9],
  [63, 3.2, 11],
  [71, 1.4, 8],
  [78, 5, 12],
  [85, 2.2, 10],
  [92, 6.4, 9],
  [97, 4.1, 13],
] as const;

/** Ambient layers behind the home hero. On fine pointers, a red grid lights up around the cursor. */
export function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = ref.current;
    const hero = layer?.parentElement;
    if (!layer || !hero || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = 0;

    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = hero.getBoundingClientRect();
        layer.style.setProperty("--mx", `${e.clientX - box.left}px`);
        layer.style.setProperty("--my", `${e.clientY - box.top}px`);
        layer.style.setProperty("--lit", "1");
      });
    };
    const leave = () => layer.style.setProperty("--lit", "0");

    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div className="hx-bg" ref={ref} aria-hidden="true">
      <div className="hx-grid" />
      <div className="hx-grid hx-grid-lit" />
      <div className="hx-orb o1" />
      <div className="hx-orb o2" />
      <div className="hx-dust">
        {dust.map(([x, d, t]) => (
          <i key={x} style={{ "--x": `${x}%`, "--d": `${d}s`, "--t": `${t}s` } as CSSProperties} />
        ))}
      </div>
    </div>
  );
}
