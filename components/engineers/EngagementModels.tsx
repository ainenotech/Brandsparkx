"use client";

import { useRef, useState, type KeyboardEvent } from "react";

const models = [
  {
    dur: "Defined scope",
    title: "Project",
    text: "For a defined build or technical requirement.",
    level: 1,
  },
  {
    dur: "Short term",
    title: "Weekly",
    text: "For short-term development and delivery needs.",
    level: 2,
  },
  { dur: "Ongoing", title: "Monthly", text: "For ongoing engineering capacity.", level: 3 },
  {
    dur: "Long term",
    title: "Dedicated",
    text: "For businesses that need consistent technical support.",
    level: 4,
  },
];

/** Engagement-model picker: an accessible radio group (arrow keys move the selection). */
export function EngagementModels() {
  const [selected, setSelected] = useState(2);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (selected + step + models.length) % models.length;
    setSelected(next);
    refs.current[next]?.focus();
  };

  return (
    <div
      className="models rv"
      role="radiogroup"
      aria-label="Engagement models"
      onKeyDown={onKeyDown}
    >
      {models.map((m, i) => (
        <button
          key={m.title}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="button"
          className={i === selected ? "model sel" : "model"}
          role="radio"
          aria-checked={i === selected}
          tabIndex={i === selected ? 0 : -1}
          onClick={() => setSelected(i)}
        >
          <span className="dur">{m.dur}</span>
          <h3>{m.title}</h3>
          <p>{m.text}</p>
          <div className="meter" aria-hidden="true">
            {[1, 2, 3, 4].map((n) => (
              <i key={n} className={n <= m.level ? "f" : undefined} />
            ))}
          </div>
        </button>
      ))}
    </div>
  );
}
