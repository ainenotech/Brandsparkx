import Link from "next/link";
import { CaseArt } from "@/components/CaseArt";
import { Icon } from "@/components/Icon";
import type { CaseStudy } from "@/content/cases";

/** Use-case cards on the home page. Each card links to the Work page. */
export function CaseCards({ items }: { items: CaseStudy[] }) {
  return (
    <div className="cases">
      {items.map((c, i) => (
        <Link
          key={c.title}
          href="/work"
          className={[
            "case",
            i === 0 && "wide",
            // A third card fills the whole row, image beside text (stacks on small screens via CSS).
            i === 2 && "case-row",
            "rv",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div className="case-img">
            <CaseArt variant={c.art} />
          </div>
          <div className="case-body">
            <div className="cat">{c.category}</div>
            <h3>{c.title}</h3>
            <dl className="csr">
              <dt>Challenge</dt>
              <dd>{c.challenge}</dd>
              <dt>Solution</dt>
              <dd>{c.solution}</dd>
              {/* Impact appears only once a client has approved verified results. */}
              {c.impact && (
                <>
                  <dt>Impact</dt>
                  <dd>{c.impact}</dd>
                </>
              )}
            </dl>
            <span className="link">
              Learn more <Icon name="i-arrow" width={16} height={16} />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
