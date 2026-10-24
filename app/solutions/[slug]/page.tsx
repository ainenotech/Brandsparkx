import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FinalCta } from "@/components/FinalCta";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { FaqSection } from "@/components/FaqSection";
import { SolutionDetails } from "@/components/solutions/SolutionDetails";
import { SolutionDefinition } from "@/components/solutions/SolutionDefinition";
import { faqs, type FaqPage } from "@/content/faqs";
import { FlowSection } from "@/components/flow/FlowSection";
import type { PageKey } from "@/content/seo";
import { RelatedSolutions } from "@/components/solutions/RelatedSolutions";
import { contactHref, solutions } from "@/content/solutions";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";

// Solutions with their own dedicated page (AI Voice, AI Engineers) are redirected in next.config.ts.
const detailSolutions = solutions.filter((s) => !s.page);

export const dynamicParams = false;

export function generateStaticParams() {
  return detailSolutions.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = detailSolutions.find((item) => item.slug === slug);
  if (!s) return {};
  return pageMetadata(s.slug as PageKey);
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const s = detailSolutions.find((item) => item.slug === slug);
  if (!s) notFound();

  const path = `/solutions/${s.slug}`;

  return (
    <div className="page on">
      <JsonLd data={serviceJsonLd(s.title, s.description, path)} />
      <div className="phero">
        <div className="wrap">
          <Breadcrumbs
            items={[
              { name: "Solutions", path: "/solutions" },
              { name: s.title, path },
            ]}
          />
          <h1>{s.title}</h1>
          <p className="lede">
            <strong>{s.headline}</strong> {s.description}
          </p>
          <div className="chips sol-chips">
            {s.capabilities.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
          <Link href={contactHref(s.interest)} className="btn btn-red">
            Talk to Us <Icon name="i-arrow" />
          </Link>
        </div>
      </div>

      <SolutionDefinition
        pageKey={s.slug as PageKey}
        question={s.definitionQuestion}
        definition={s.definition}
      />

      <FlowSection id={s.slug} />

      <SolutionDetails slug={s.slug} />

      <FaqSection items={faqs[s.slug as FaqPage]} />

      <RelatedSolutions slug={s.slug} />

      <FinalCta
        title="Start with one problem."
        text="Tell us what you want to improve, automate or build. We'll help you identify where AI can create the most value."
      >
        <Link href={contactHref(s.interest)} className="btn btn-red">
          Start a Conversation <Icon name="i-arrow" />
        </Link>
      </FinalCta>
    </div>
  );
}
