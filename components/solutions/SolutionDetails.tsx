import { Icon } from "@/components/Icon";
import { integrationsText, solutionDetails } from "@/content/solution-details";

const soft = { background: "var(--soft)" } as const;

/**
 * Self-contained, citable sections for a solution page: who it's for and the problems it solves,
 * how it works (steps), and use cases by industry with integrations. Backgrounds alternate,
 * starting grey when `firstSoft` is set, so the block fits the sections around it.
 */
export function SolutionDetails({ slug, firstSoft = true }: { slug: string; firstSoft?: boolean }) {
  const d = solutionDetails[slug];
  if (!d) return null;
  const { name } = d;
  const tone = (i: number) => ((i % 2 === 0) === firstSoft ? soft : undefined);

  return (
    <>
      <section style={tone(0)} aria-labelledby={`${slug}-fit`}>
        <div className="wrap fit-grid">
          {d.whoFor && (
            <div className="rv">
              <div className="kicker">Who it&apos;s for</div>
              <h2 id={`${slug}-fit`}>Who is {name} for?</h2>
              <ul className="ticks">
                {d.whoFor.map((item) => (
                  <li key={item}>
                    <Icon name="i-check" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="rv">
            <div className="kicker">Problems it solves</div>
            {d.whoFor ? (
              <h2>What problems does it solve?</h2>
            ) : (
              <h2 id={`${slug}-fit`}>What problems does {name} solve?</h2>
            )}
            <ul className="ticks">
              {d.problems.map((item) => (
                <li key={item}>
                  <Icon name="i-check" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section style={tone(1)} aria-labelledby={`${slug}-steps`}>
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <div className="kicker">How it works</div>
              <h2 id={`${slug}-steps`}>How does {name} work?</h2>
            </div>
            <p className="lede">Start with one use case, prove it, then expand what works.</p>
          </div>
          <ol className="steps4 rv">
            {d.steps.map((step, i) => (
              <li key={step.title}>
                <span className="steps4-n" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section style={tone(2)} aria-labelledby={`${slug}-uses`}>
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <div className="kicker">Use cases</div>
              <h2 id={`${slug}-uses`}>How is {name} used in different industries?</h2>
            </div>
            <p className="lede">
              Examples of how businesses can apply it. Every project starts from your own goals and
              tools.
            </p>
          </div>
          <div className="uses rv">
            {d.useCases.map((u) => (
              <div key={u.industry}>
                <h3>{u.industry}</h3>
                <p>{u.text}</p>
              </div>
            ))}
          </div>
          <div className="integrations rv">
            <h3>Which tools does it connect to?</h3>
            <p>{integrationsText}</p>
          </div>
        </div>
      </section>
    </>
  );
}
