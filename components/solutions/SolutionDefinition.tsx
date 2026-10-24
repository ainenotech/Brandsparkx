import { JsonLd } from "@/components/JsonLd";
import { pageSeo, type PageKey } from "@/content/seo";
import { webPageJsonLd } from "@/lib/seo";

const dateLabel = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

/**
 * Answer-first "What is …?" block near the top of a solution page, with the visible
 * "Last updated" date (the same date as dateModified in the page's WebPage schema).
 */
export function SolutionDefinition({
  pageKey,
  question,
  definition,
}: {
  pageKey: PageKey;
  question: string;
  definition: string;
}) {
  const { lastModified } = pageSeo[pageKey];
  return (
    <section className="define" aria-labelledby="define-title">
      <JsonLd data={webPageJsonLd(pageKey)} />
      <div className="wrap define-grid">
        <h2 id="define-title">{question}</h2>
        <div>
          <p className="define-text">{definition}</p>
          <p className="updated">
            Last updated <time dateTime={lastModified}>{dateLabel(lastModified)}</time>
          </p>
        </div>
      </div>
    </section>
  );
}
