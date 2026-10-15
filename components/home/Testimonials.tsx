"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import type { Testimonial } from "@/content/testimonials";

export function Testimonials({ items }: { items: Testimonial[] }) {
  const [active, setActive] = useState(0);
  const go = (n: number) => setActive((n + items.length) % items.length);

  return (
    <div
      className="tcard"
      role="region"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
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
