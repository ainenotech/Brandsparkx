import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FinalCta } from "@/components/FinalCta";
import { Icon } from "@/components/Icon";
import { SolutionsHub } from "@/components/solutions/SolutionsHub";
import { solutionHref, solutions } from "@/content/solutions";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "AI Solutions & Automation Services | BrandSparkX Dubai",
  description:
    "Seven connected AI solutions for UAE businesses: AI growth, content, marketing, sales, business automation, AI engineers on demand and AI voice agents.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <div className="page on">
      <div className="phero">
        <div className="wrap pgrid">
          <div className="ptext">
            <Breadcrumbs items={[{ name: "Solutions", path: "/solutions" }]} />
            <h1>AI solutions built around your business.</h1>
            <p className="lede">
              From strategy to engineering, BrandSparkX helps businesses adopt AI where it matters
              most.
            </p>
            <nav className="jump" aria-label="Jump to a solution">
              {solutions.map((s) => (
                <a key={s.slug} href={`#${s.slug}`}>
                  {s.title}
                </a>
              ))}
            </nav>
          </div>
          <SolutionsHub />
        </div>
      </div>

      <div className="wrap slist">
        {solutions.map((s, i) => (
          <div className="srow rv" id={s.slug} key={s.slug}>
            <div className="num">0{i + 1}</div>
            <div>
              <h2>{s.title}</h2>
              <div className="sub">{s.headline}</div>
            </div>
            <div>
              <p>{s.description}</p>
              <div className="chips">
                {s.capabilities.map((c) => (
                  <span key={c}>{c}</span>
                ))}
              </div>
              <Link className="link" href={solutionHref(s)}>
                {s.linkLabel} <Icon name="i-arrow" width={16} height={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <FinalCta
        compactTop
        title="Not sure where to start?"
        text="Start with one problem. We'll show you where AI can create the most value."
      >
        <Link href="/contact" className="btn btn-red">
          Start a Conversation <Icon name="i-arrow" />
        </Link>
      </FinalCta>
    </div>
  );
}
