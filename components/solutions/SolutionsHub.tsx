"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";
import { solutions } from "@/content/solutions";
import { useReducedMotion } from "@/lib/useReducedMotion";

const RADIUS = 172;
const CENTER = 230;
const SIZE = 460;

const nodes = solutions.map((s, i) => {
  const angle = -Math.PI / 2 + (i * 2 * Math.PI) / solutions.length;
  return {
    ...s,
    x: +(CENTER + RADIUS * Math.cos(angle)).toFixed(1),
    y: +(CENTER + RADIUS * Math.sin(angle)).toFixed(1),
  };
});

/** Decorative radial graphic: the seven solutions orbiting an "AI core". */
export function SolutionsHub() {
  const reduce = useReducedMotion();
  const [lit, setLit] = useState(-1);

  useEffect(() => {
    if (reduce) return;
    let k = 0;
    const timer = window.setInterval(() => {
      setLit(k);
      k = (k + 1) % nodes.length;
    }, 1100);
    return () => window.clearInterval(timer);
  }, [reduce]);

  return (
    <div className="pvis hub" aria-hidden="true">
      <svg className="hs" viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <circle className="orb" cx={CENTER} cy={CENTER} r={RADIUS} />
        <circle className="orb2" cx={CENTER} cy={CENTER} r="112" />
        {nodes.map((n, i) => (
          <g key={n.slug}>
            <line className="spoke" x1={CENTER} y1={CENTER} x2={n.x} y2={n.y} />
            <line
              className="flow"
              x1={CENTER}
              y1={CENTER}
              x2={n.x}
              y2={n.y}
              style={{ animationDelay: `${(-i * 0.23).toFixed(2)}s` }}
            />
            {!reduce && (
              <circle r="3.5" fill="#D83232">
                <animateMotion
                  dur="2.6s"
                  begin={`${(i * 0.37).toFixed(2)}s`}
                  repeatCount="indefinite"
                  path={`M${CENTER} ${CENTER} L${n.x} ${n.y}`}
                />
              </circle>
            )}
          </g>
        ))}
      </svg>
      <div className="hub-core">
        <Icon name="i-spark" />
        <span>AI core</span>
      </div>
      {nodes.map((n, i) => (
        <div
          key={n.slug}
          className={i === lit ? "hnode lit" : "hnode"}
          style={{
            left: `${((n.x / SIZE) * 100).toFixed(2)}%`,
            top: `${((n.y / SIZE) * 100).toFixed(2)}%`,
          }}
        >
          <span>
            <Icon name={n.icon} />
          </span>
          {n.shortTitle}
        </div>
      ))}
    </div>
  );
}
