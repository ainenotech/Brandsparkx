"use client";

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { SealCheck } from "@phosphor-icons/react";
import type { FlowConfig, FlowNode } from "@/content/flows";
import { useReducedMotion } from "@/lib/useReducedMotion";

const STAGE_W = 360;
const STAGE_H = 556;
const CENTER = 180;
const TILE = 44;
const HUB = 64;
const CHECK = 36;
const GAP = 48;
const LABEL_GAP = 10;
const BEND = 10;
const RING = 80;
const HUB_LABEL_GAP = 16;

const INPUT_TOP = 64;
const INPUT_BOTTOM = INPUT_TOP + TILE;
const INPUT_CY = INPUT_TOP + TILE / 2;
const BUS_TOP = INPUT_BOTTOM + GAP;
const HUB_TOP = BUS_TOP + GAP;
const HUB_BOTTOM = HUB_TOP + HUB;
const HUB_CY = HUB_TOP + HUB / 2;
const CHECK_TOP = HUB_BOTTOM + GAP;
const CHECK_BOTTOM = CHECK_TOP + CHECK;
const CHECK_CY = CHECK_TOP + CHECK / 2;
const BUS_BOTTOM = CHECK_BOTTOM + GAP;
const OUTPUT_TOP = BUS_BOTTOM + GAP;
const OUTPUT_BOTTOM = OUTPUT_TOP + TILE;
const OUTPUT_CY = OUTPUT_TOP + TILE / 2;
const OUTPUT_LABEL_TOP = OUTPUT_BOTTOM + LABEL_GAP;
const OUTPUT_LABEL_H = 52;
const HUB_LABEL_X = CENTER + RING / 2 + HUB_LABEL_GAP;

const TOP_DELAY = [0, 0.85, 1.7];
const BOTTOM_DELAY = [0.4, 1.3, 2.1];
const ICON = "#3A3F4B";

type Wire = { d: string; delay: number };
type Anchor = "center" | "start" | "bottom" | "top";

function columns(count: number): number[] {
  if (count <= 1) return [CENTER];
  if (count === 2) return [120, 240];
  return [60, CENTER, 300];
}

function inputPath(x: number): string {
  const start = INPUT_BOTTOM;
  const end = HUB_TOP;
  if (x === CENTER) return `M ${x},${start} V ${end}`;
  const toward = x < CENTER ? 1 : -1;
  const corner = x + toward * BEND;
  const approach = CENTER - toward * BEND;
  return `M ${x},${start} V ${BUS_TOP - BEND} Q ${x},${BUS_TOP} ${corner},${BUS_TOP} H ${approach} Q ${CENTER},${BUS_TOP} ${CENTER},${BUS_TOP + BEND} V ${end}`;
}

function outputPath(x: number): string {
  const start = CHECK_BOTTOM;
  const end = OUTPUT_TOP;
  if (x === CENTER) return `M ${CENTER},${start} V ${end}`;
  const toward = x < CENTER ? -1 : 1;
  const leave = CENTER + toward * BEND;
  const arrive = x - toward * BEND;
  return `M ${CENTER},${start} V ${BUS_BOTTOM - BEND} Q ${CENTER},${BUS_BOTTOM} ${leave},${BUS_BOTTOM} H ${arrive} Q ${x},${BUS_BOTTOM} ${x},${BUS_BOTTOM + BEND} V ${end}`;
}

function wiresFor(flow: FlowConfig): Wire[] {
  const inputs = columns(flow.inputs.length).map((x, index) => ({
    d: inputPath(x),
    delay: TOP_DELAY[index] ?? 0,
  }));
  const outputs = columns(flow.outputs.length).map((x, index) => ({
    d: outputPath(x),
    delay: BOTTOM_DELAY[index] ?? 0,
  }));
  return [...inputs, { d: `M ${CENTER},${HUB_BOTTOM} V ${CHECK_TOP}`, delay: 1.2 }, ...outputs];
}

function labelWidth(count: number): number {
  if (count <= 1) return 200;
  if (count === 2) return 110;
  return 112;
}

const pinTransform: Record<Anchor, string> = {
  center: "translate(-50%, -50%)",
  start: "translate(0, -50%)",
  bottom: "translate(-50%, -100%)",
  top: "translate(-50%, 0)",
};

function Pin({
  x,
  y,
  width,
  height,
  anchor = "center",
  delay,
  children,
}: {
  x: number;
  y: number;
  width: number;
  height?: number;
  anchor?: Anchor;
  delay: number;
  children: ReactNode;
}) {
  return (
    <div
      className={anchor === "center" ? "dflow-pin" : `dflow-pin ${anchor}`}
      style={{
        left: `${(x / STAGE_W) * 100}%`,
        top: `${(y / STAGE_H) * 100}%`,
        width: `${(width / STAGE_W) * 100}%`,
        height: height ? `${(height / STAGE_H) * 100}%` : undefined,
        transform: pinTransform[anchor],
      }}
    >
      <div className="dflow-rise" style={{ ["--d" as string]: `${delay}ms` }}>
        {children}
      </div>
    </div>
  );
}

function NodeCopy({
  label,
  sub,
  kind,
}: {
  label: string;
  sub?: string;
  kind?: "hub" | "check" | "out";
}) {
  return (
    <p className={kind ? `dflow-copy ${kind}` : "dflow-copy"}>
      <b>{label}</b>
      {sub ? <small>{sub}</small> : null}
    </p>
  );
}

function NodeGlyph({ node, duotone }: { node: FlowNode; duotone?: boolean }) {
  if (node.logo) {
    return (
      <svg className="dflow-logo" viewBox="0 0 24 24" width={20} height={20} aria-hidden="true">
        {node.logo.parts.map((part) => (
          <path key={part.d} d={part.d} fill={part.fill} />
        ))}
      </svg>
    );
  }

  const Icon = node.icon;
  return (
    <Icon
      className={duotone ? "dflow-ico dflow-ico-duo" : "dflow-ico"}
      size={duotone ? 20 : 18}
      weight={duotone ? "duotone" : "regular"}
      color={ICON}
      aria-hidden="true"
    />
  );
}

function useFlowMotion(reduce: boolean) {
  const ref = useRef<HTMLElement>(null);
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

export function FlowDiagram({
  flow,
  theme = "light",
  className,
}: {
  flow: FlowConfig;
  theme?: "light" | "dark";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const { ref, entered, playing } = useFlowMotion(reduce);
  const wires = wiresFor(flow);
  const inputX = columns(flow.inputs.length);
  const outputX = columns(flow.outputs.length);
  const hubDelay = flow.inputs.length * 60;
  const checkDelay = hubDelay + 60;

  return (
    <figure
      ref={ref}
      className={["dflow", entered ? "is-entered" : "", playing ? "is-playing" : "", className]
        .filter(Boolean)
        .join(" ")}
      data-theme={theme}
      aria-label={flow.ariaSummary}
    >
      <div className="dflow-card">
        <div
          className="dflow-stage"
          style={{
            aspectRatio: `${STAGE_W} / ${STAGE_H}`,
            ["--hub-y" as string]: `${(HUB_CY / STAGE_H) * 100}%`,
          }}
        >
          <svg className="dflow-wires" viewBox={`0 0 ${STAGE_W} ${STAGE_H}`} aria-hidden="true">
            {wires.map((wire) => (
              <path key={wire.d} className="dflow-line" d={wire.d} pathLength={100} />
            ))}
            {wires.map((wire) => (
              <path
                key={`pulse-${wire.d}`}
                className="dflow-pulse"
                d={wire.d}
                pathLength={100}
                style={{ ["--delay" as string]: `${wire.delay}s` }}
              />
            ))}
          </svg>

          {flow.inputs.map((node, index) => {
            const x = inputX[index] ?? CENTER;
            return (
              <Fragment key={node.label}>
                <Pin
                  x={x}
                  y={INPUT_TOP - LABEL_GAP}
                  width={labelWidth(flow.inputs.length)}
                  anchor="bottom"
                  delay={index * 60}
                >
                  <NodeCopy label={node.label} sub={node.sub} />
                </Pin>
                <Pin x={x} y={INPUT_CY} width={TILE} height={TILE} delay={index * 60}>
                  <div className="dflow-tile">
                    <NodeGlyph node={node} />
                  </div>
                </Pin>
              </Fragment>
            );
          })}

          <Pin x={CENTER} y={HUB_CY} width={HUB} height={HUB} delay={hubDelay}>
            <div className="dflow-hub">
              <span className="dflow-ring" aria-hidden="true" />
              <span className="dflow-mark" />
            </div>
          </Pin>
          <Pin
            x={HUB_LABEL_X}
            y={HUB_CY}
            width={STAGE_W - HUB_LABEL_X - 4}
            anchor="start"
            delay={hubDelay}
          >
            <NodeCopy label={flow.hub.label} sub={flow.hub.sub} kind="hub" />
          </Pin>

          <Pin x={CENTER} y={CHECK_CY} width={CHECK} height={CHECK} delay={checkDelay}>
            <div className="dflow-tile dflow-check">
              <SealCheck size={16} weight="regular" color="var(--flow-accent)" aria-hidden="true" />
            </div>
          </Pin>
          <Pin x={206} y={CHECK_CY} width={142} anchor="start" delay={checkDelay}>
            <NodeCopy label={flow.check.label} sub={flow.check.sub} kind="check" />
          </Pin>

          {flow.outputs.map((node, index) => {
            const x = outputX[index] ?? CENTER;
            return (
              <Fragment key={node.label}>
                <Pin
                  x={x}
                  y={OUTPUT_CY}
                  width={TILE}
                  height={TILE}
                  delay={checkDelay + 60 + index * 60}
                >
                  <div className="dflow-tile">
                    <NodeGlyph node={node} duotone />
                    <span
                      className="dflow-badge"
                      style={{ ["--i" as string]: index }}
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 12 12">
                        <path
                          d="M2.5 6.3 5 8.7 9.5 3.6"
                          fill="none"
                          stroke="var(--flow-accent)"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </Pin>
                <Pin
                  x={x}
                  y={OUTPUT_LABEL_TOP}
                  width={labelWidth(flow.outputs.length)}
                  height={OUTPUT_LABEL_H}
                  anchor="top"
                  delay={checkDelay + 60 + index * 60}
                >
                  <NodeCopy label={node.label} sub={node.sub} kind="out" />
                </Pin>
              </Fragment>
            );
          })}
        </div>
      </div>

      <ol className="dflow-sr">
        <li>
          Inputs:{" "}
          {flow.inputs
            .map((node) => (node.sub ? `${node.label}, ${node.sub}` : node.label))
            .join("; ")}
        </li>
        <li>
          {flow.hub.label}. {flow.hub.sub}
        </li>
        <li>
          {flow.check.label}. {flow.check.sub}
        </li>
        <li>
          Results:{" "}
          {flow.outputs
            .map((node) => (node.sub ? `${node.label}, ${node.sub}` : node.label))
            .join("; ")}
        </li>
      </ol>
    </figure>
  );
}
