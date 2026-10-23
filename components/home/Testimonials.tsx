"use client";

import { useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import type { Testimonial } from "@/content/testimonials";

export function Testimonials({ items }: { items: Testimonial[] }) {
  const [active, setActive] = useState(0);
  const go = (n: number) => setActive((n + items.length) % items.length);
  // Horizontal swipe on touch screens moves between slides.
  const swipeStart = useRef<{ x: number; y: number } | null>(null);

  return (
    <div
      className="tcard"
      role="region"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onTouchStart={(e) => {
        const t = e.touches[0];
        swipeStart.current = { x: t.clientX, y: t.clientY };
      }}
      onTouchEnd={(e) => {
        const start = swipeStart.current;
        swipeStart.current = null;
        if (!start || items.length < 2) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - start.x;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(t.clientY - start.y)) {
          go(active + (dx < 0 ? 1 : -1));
        }
      }}
    >
      <div className="q" aria-hidden="true">
        “
      </div>
      <div aria-live="polite">
        {items.map((t, i) => (
          <div
            key={i}
            className={i === active ? "tslide on" : "tslide"}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}`}
            hidden={i !== active}
          >
            <p className="tquote">{t.quote}</p>
            <div className="tperson">
              <div className="av" aria-hidden="true" />
              <div>
                <b>{t.name}</b>
                <span>
                  {t.role}
                  {!t.published && " · placeholder"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {items.length > 1 && (
        <div className="tctrl">
          <button type="button" aria-label="Previous testimonial" onClick={() => go(active - 1)}>
            <Icon name="i-left" />
          </button>
          <button type="button" aria-label="Next testimonial" onClick={() => go(active + 1)}>
            <Icon name="i-arrow" />
          </button>
          <div className="tdots" aria-hidden="true">
            {items.map((_, i) => (
              <i key={i} className={i === active ? "on" : undefined} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
