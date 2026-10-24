"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import type { ClientLogo } from "@/content/clients";

const vars = (v: Record<string, string | number>) => v as CSSProperties;

/** Height that gives every logo roughly the same visual area, so wide and square marks balance. */
const logoHeight = ({ width, height }: ClientLogo) =>
  Math.round(Math.min(56, Math.max(26, Math.sqrt(5200 / (width / height)))));

/** Steady drift in px/s. Page scrolling deliberately has no effect on it. */
const SPEED = 30;
/** A hovered row eases almost to a stop so its logos can be looked at. */
const HOVER_SPEED = 0.06;

/**
 * Two rows of client logos drifting in opposite directions, greyscale until hovered, with soft
 * edge fades.
 * With no logos, `slots` placeholder cells are shown instead.
 */
export function ClientMarquee({ logos, slots = 0 }: { logos: ClientLogo[]; slots?: number }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const half = Math.ceil(logos.length / 2);
  const rows = logos.length ? [logos.slice(0, half), logos.slice(half)] : [[], []];

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rowEls = Array.from(root.querySelectorAll<HTMLElement>(".cm-row"));
    const tracks = rowEls.map((row) => row.querySelector(".cm-track") as HTMLElement);
    const offsets = tracks.map(() => 0);
    const hovered = tracks.map(() => false);
    const pace = tracks.map(() => 1);
    const listeners = rowEls.map((row, i) => {
      const enter = () => (hovered[i] = true);
      const leave = () => (hovered[i] = false);
      row.addEventListener("pointerenter", enter);
      row.addEventListener("pointerleave", leave);
      return () => {
        row.removeEventListener("pointerenter", enter);
        row.removeEventListener("pointerleave", leave);
      };
    });
    let last = 0;
    let frame = 0;

    const step = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      tracks.forEach((track, i) => {
        // Each track holds two identical sets, so wrapping at half its width loops seamlessly.
        const loop = track.scrollWidth / 2;
        if (!loop) return;
        pace[i] += ((hovered[i] ? HOVER_SPEED : 1) - pace[i]) * 0.08;
        offsets[i] = (offsets[i] + SPEED * dt * pace[i]) % loop;
        const x = i % 2 ? offsets[i] - loop : -offsets[i];
        track.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
      });
      frame = requestAnimationFrame(step);
    };

    // Only animate while the strip is on screen.
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      last = 0;
      if (entry.isIntersecting) frame = requestAnimationFrame(step);
    });
    io.observe(root);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      listeners.forEach((off) => off());
    };
  }, []);

  return (
    <div className="cm" ref={rootRef} data-reveal-host>
      <div className="cm-label">
        <span>Businesses we work with</span>
        {logos.length > 0 && <span>{String(logos.length).padStart(2, "0")}</span>}
      </div>
      {rows.map((row, r) => (
        <div className="cm-row" key={r} style={vars({ "--r": r })}>
          <div className="cm-track">
            {/* Two identical sets so the strip loops; the copy is hidden from screen readers. */}
            {[0, 1].map((copy) => (
              <div className="cm-set" key={copy} aria-hidden={copy === 1 || undefined}>
                {row.length
                  ? row.map((c) => (
                      <div className="cm-logo" key={c.name}>
                        <Image
                          src={c.logo}
                          alt={copy ? "" : `${c.name} logo`}
                          width={c.width}
                          height={c.height}
                          style={{ height: logoHeight(c) }}
                        />
                        <span className="cm-name" aria-hidden="true">
                          {c.name}
                        </span>
                      </div>
                    ))
                  : Array.from({ length: slots }, (_, i) => (
                      <div className="cm-logo" key={i}>
                        <span className="cm-slot">Client logo</span>
                      </div>
                    ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
