import type { Comparison } from "@/content/comparisons";

/** A short, plain HTML comparison table (easy for readers and answer engines to quote). */
export function ComparisonTable({ data }: { data: Comparison }) {
  return (
    <section aria-labelledby="compare-title">
      <div className="wrap">
        <div className="sec-head rv">
          <div>
            <div className="kicker">Compare</div>
            <h2 id="compare-title">{data.title}</h2>
          </div>
          <p className="lede">{data.intro}</p>
        </div>
        {/* Scrolls sideways on narrow screens, so keyboard users must be able to focus it. */}
        <div className="cmp-wrap rv" role="region" aria-labelledby="compare-title" tabIndex={0}>
          <table className="cmp">
            <thead>
              <tr>
                <td />
                <th scope="col">{data.columns[0]}</th>
                <th scope="col">{data.columns[1]}</th>
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  <td>{row.values[0]}</td>
                  <td>{row.values[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
