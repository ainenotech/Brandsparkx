import { processSteps } from "@/content/process";

/** "How we work" five-step process. The parent is a reveal host, so the bar and steps animate in. */
export function Process() {
  return (
    <div data-reveal-host="">
      <div className="proc">
        <div className="bar" />
        {processSteps.map((s, i) => (
          <div className="step" key={s.title}>
            <div className="n">0{i + 1}</div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
