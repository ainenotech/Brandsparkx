"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import type { Testimonial } from "@/content/testimonials";

const vars = (v: Record<string, string | number>) => v as CSSProperties;

/** Steady drift in px/s, same feel as the client logo strip. */
const SPEED = 38;
/** A hovered row slows to a crawl so its quote can be read, but never fully stops. */
const HOVER_SPEED = 0.18;

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

function Card({ t, dark }: { t: Testimonial; dark?: boolean }) {
  return (
    <figure className={dark ? "tst-card dark" : "tst-card"}>
      <div className="tst-top">
        <svg className="tst-q" viewBox="0 0 32 24" aria-hidden="true">
          <path d="M0 24V14.4C0 6.6 4.3 1.8 12.2 0l1.4 3.6C9.2 5 6.9 7.6 6.6 11.2H12V24H0Zm18.4 0V14.4C18.4 6.6 22.7 1.8 30.6 0L32 3.6c-4.4 1.4-6.7 4-7 7.6h5.4V24H18.4Z" />
        </svg>
        <span className="tst-tag">{t.published ? "Verified client" : "Placeholder"}</span>
      </div>
      <blockquote>
        <p>{t.quote}</p>
      </blockquote>
      <figcaption className="tst-person">
        <span className="tst-av" aria-hidden="true">
          {initials(t.name)}
        </span>
        <span>
          <b>{t.name}</b>
          <small>{t.role}</small>
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Client testimonials as two rows drifting endlessly in opposite directions inside the content
 * width, like the client logo strip. Rows slow on hover; reduced motion turns them into scrollers.
 */
export function Testimonials({ items }: { items: Testimonial[] }) {
  const rootRef = useRef<HTMLDivElement>(null);

  // Repeat the list so one set is wider than the view, then rotate it for the second row.
  const base = Array.from({ length: Math.ceil(5 / items.length) }, () => items).flat();
  const shift = Math.ceil(items.length / 2);
  const rows = [base, [...base.slice(shift), ...base.slice(0, shift)]];

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rowEls = Array.from(root.querySelectorAll<HTMLElement>(".tst-row"));
    const tracks = rowEls.map((row) => row.querySelector(".tst-track") as HTMLElement);
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

    // Only animate while the rows are on screen.
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
  }, [items.length]);

  return (
    <div className="wrap">
      <div
        className="tst"
        ref={rootRef}
        role="region"
        aria-label="Client testimonials"
        data-reveal-host
      >
        {rows.map((row, r) => (
          <div
            className="tst-row"
            key={r}
            // The second row repeats the first, so screen readers only get one.
            aria-hidden={r ? true : undefined}
            style={vars({ "--r": r })}
          >
            <div className="tst-track">
              {/* Two identical sets so the row loops; the copy is hidden from screen readers. */}
              {[0, 1].map((copy) => (
                <div className="tst-set" key={copy} aria-hidden={copy === 1 || undefined}>
                  {row.map((t, i) => (
                    <Card key={i} t={t} dark={(i + r) % 3 === 1} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
