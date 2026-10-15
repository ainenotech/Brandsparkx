"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

// Syntax-highlight helpers (classes from the original stylesheet).
const kw = (t: string) => <span className="sk">{t}</span>;
const fn = (t: string) => <span className="sf">{t}</span>;
const str = (t: string) => <span className="ss">{t}</span>;
const cm = (t: string) => <span className="sc">{t}</span>;

const codeLines: ReactNode[] = [
  <>
    {kw("from")} agents {kw("import")} Agent, tools
  </>,
  "",
  <>agent = {fn("Agent")}(</>,
  <> goal={str('"qualify and book leads"')},</>,
  "    tools=[tools.crm, tools.calendar],",
  ")",
  "",
  cm("# runs on every inbound call"),
  <>
    {kw("@")}agent.on({str('"inbound_call"')})
  </>,
  <>
    {kw("def")} {fn("handle")}(call):
  </>,
  "    lead = agent.qualify(call)",
  <>
    {" "}
    {kw("if")} lead.intent == {str('"high"')}:
  </>,
  "        agent.book_meeting(lead)",
];

const terminalLines: ReactNode[] = [
  <>
    <span className="pr">$</span> deploy agent --env production
  </>,
  <>
    <span className="ok">✓</span> build passed · tests 24/24
  </>,
  <>
    <span className="ok">✓</span> 3 services healthy · live
  </>,
];

const caret = <span className="caret" />;

/** Animated code editor: types an agent definition, then "deploys" it, and loops. */
export function CodeEditorDemo() {
  const reduce = useReducedMotion();
  const [lines, setLines] = useState(0);
  const [termLines, setTermLines] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));

    at(0, () => {
      setLines(0);
      setTermLines(0);
    });
    let t = 300;
    codeLines.forEach((line, i) => {
      at(t, () => setLines(i + 1));
      t += line ? 420 : 160;
    });
    terminalLines.forEach((_, i) => {
      t += i ? 700 : 500;
      at(t, () => setTermLines(i + 1));
    });
    at(t + 3500, () => setRun((r) => r + 1));

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [reduce, run]);

  const shownCode = reduce ? codeLines.length : lines;
  const shownTerm = reduce ? terminalLines.length : termLines;

  return (
    <>
      <pre className="ed-code">
        {codeLines.slice(0, shownCode).map((line, i) => (
          <span
            key={`${run}-${i}`}
            className="cl"
            style={reduce ? { animation: "none", clipPath: "none" } : undefined}
          >
            {line || " "}
          </span>
        ))}
      </pre>
      <div className="ed-term">
        {shownTerm === 0 && !reduce ? (
          <>
            <span className="pr">$</span> {caret}
          </>
        ) : (
          terminalLines.slice(0, shownTerm).map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {line}
              {!reduce && i === shownTerm - 1 && i < terminalLines.length - 1 && <> {caret}</>}
            </span>
          ))
        )}
      </div>
    </>
  );
}
