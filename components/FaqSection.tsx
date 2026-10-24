import { JsonLd } from "@/components/JsonLd";
import type { Faq } from "@/content/faqs";
import { faqJsonLd } from "@/lib/seo";

/**
 * FAQ accordion plus matching FAQPage structured data. Native <details>, so every answer is in
 * the server-rendered HTML (readable by search engines and AI crawlers) even while collapsed,
 * and it works without JavaScript.
 */
export function FaqSection({
  items,
  title = "Frequently asked questions",
  intro,
  soft = false,
}: {
  items: Faq[];
  title?: string;
  intro?: string;
  /** Grey background, for pages where the section before it is white. */
  soft?: boolean;
}) {
  if (items.length === 0) return null;
  return (
    <section
      className="faq-sec"
      aria-labelledby="faq-title"
      style={soft ? { background: "var(--soft)" } : undefined}
    >
      <div className="wrap faq-grid">
        <div className="faq-head rv">
          <div className="kicker">FAQ</div>
          <h2 id="faq-title">{title}</h2>
          {intro && <p className="lede">{intro}</p>}
        </div>
        <div className="faq">
          {items.map((f, i) => (
            <details key={f.q} className="faq-item" open={i === 0}>
              <summary>
                <h3>{f.q}</h3>
                <span className="faq-icon" aria-hidden="true" />
              </summary>
              <div className="faq-a">
                <p>{f.a}</p>
                {f.more?.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
      <JsonLd data={faqJsonLd(items)} />
    </section>
  );
}
