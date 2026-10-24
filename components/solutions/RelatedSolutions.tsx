import Link from "next/link";
import { Icon } from "@/components/Icon";
import { contactHref, relatedSolutions, solutionHref, solutions } from "@/content/solutions";

/** "Related solutions" block for the bottom of a solution page: three cards plus links to all solutions and Contact. */
export function RelatedSolutions({ slug }: { slug: string }) {
  const current = solutions.find((s) => s.slug === slug);
  const related = (relatedSolutions[slug] ?? [])
    .map((key) => solutions.find((s) => s.slug === key))
    .filter((s) => s !== undefined);
  if (!current || related.length === 0) return null;

  return (
    <section style={{ background: "#fff" }} aria-labelledby="related-title">
      <div className="wrap">
        <div className="sec-head rv">
          <div>
            <div className="kicker">Related solutions</div>
            <h2 id="related-title">Works well with {current.title}.</h2>
          </div>
          <p className="lede">
            Each capability works on its own. Together they form one connected growth system.
          </p>
        </div>
        <div className="bento">
          {related.map((s) => (
            <Link key={s.slug} href={solutionHref(s)} className="sol s2 rv">
              <span className="ic">
                <Icon name={s.icon} />
              </span>
              <span className="go">
                <Icon name="i-arrow" />
              </span>
              <h3>{s.title}</h3>
              <p>{s.headline}</p>
            </Link>
          ))}
        </div>
        <div className="related-links rv">
          <Link className="link" href="/solutions">
            View all solutions <Icon name="i-arrow" width={16} height={16} />
          </Link>
          <Link className="link" href={contactHref(current.interest)}>
            Talk to us about {current.title} <Icon name="i-arrow" width={16} height={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
