import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FinalCta } from "@/components/FinalCta";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { FlowSection } from "@/components/flow/FlowSection";
import { LinearFlow } from "@/components/flow/LinearFlow";
import { contactHref, solutionHref, solutions } from "@/content/solutions";
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
  return pageMetadata({
    title: s.seoTitle,
    description: s.seoDescription,
    path: `/solutions/${s.slug}`,
  });
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const s = detailSolutions.find((item) => item.slug === slug);
  if (!s) notFound();

  const path = `/solutions/${s.slug}`;
  const others = solutions.filter((item) => item.slug !== s.slug);

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

      <FlowSection id={s.slug} />

      <section>
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <div className="kicker">How we work</div>
              <h2>From idea to intelligent execution.</h2>
            </div>
            <p className="lede">
              Five stages, one direction. Start small, prove value, then scale what works.
            </p>
          </div>
          <LinearFlow />
        </div>
      </section>

      <section style={{ background: "var(--soft)" }}>
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <div className="kicker">Our solutions</div>
              <h2>Each capability works on its own.</h2>
            </div>
            <p className="lede">Together they form one connected growth system.</p>
          </div>
          <nav className="jump rv" aria-label="Other solutions">
            {others.map((o) => (
              <Link key={o.slug} href={solutionHref(o)}>
                {o.title}
              </Link>
            ))}
          </nav>
        </div>
      </section>

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
