"use client";

import { useEffect, useRef, useState } from "react";
import { processSteps } from "@/content/process";
import { useReducedMotion } from "@/lib/useReducedMotion";

function useFlowMotion(reduce: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || reduce) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.3;
        if (visible) setEntered(true);
        setPlaying(visible);
      },
      { threshold: [0, 0.3] },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduce]);

  return { ref, entered, playing };
}

/** Five-step line for "How we work", using the sentences in content/process.ts. */
export function LinearFlow() {
  const reduce = useReducedMotion();
  const { ref, entered, playing } = useFlowMotion(reduce);

  return (
    <div
      ref={ref}
      className={["lflow", entered ? "is-entered" : "", playing ? "is-playing" : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="lflow-rail lflow-rail-h" aria-hidden="true">
        <span />
      </div>
      <div className="lflow-rail lflow-rail-v" aria-hidden="true">
        <span />
      </div>
      <ol>
        {processSteps.map((step, index) => (
          <li key={step.title} style={{ ["--i" as string]: index }}>
            <div className="lflow-n">0{index + 1}</div>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
