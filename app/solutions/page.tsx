import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FinalCta } from "@/components/FinalCta";
import { Icon, type IconName } from "@/components/Icon";
import { SolutionsHub } from "@/components/solutions/SolutionsHub";
import { solutionHref, solutions } from "@/content/solutions";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("solutions");

const services: { href: string; title: string; text: string; icon: IconName }[] = [
  {
    href: "/ai-voice-calling",
    title: "AI Voice & Calling",
    text: "Answer enquiries, qualify leads, follow up and book appointments with AI voice agents.",
    icon: "i-voice",
  },
  {
    href: "/ai-engineers",
    title: "AI Engineers",
    text: "Add experienced AI and software engineering capacity for a project, week or month.",
    icon: "i-eng",
  },
  {
    href: "/work",
    title: "Work & Case Studies",
    text: "See how AI, automation and intelligent systems can address practical business problems.",
    icon: "i-growth",
  },
];

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

      <section>
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <div className="kicker">Our services</div>
              <h2>Choose the right place to start.</h2>
            </div>
            <p className="lede">
              Keep your existing team and tools. Add the AI capability or delivery support your
              business needs.
            </p>
          </div>
          <div className="bento">
            {services.map((service, index) => (
              <Link
                href={service.href}
                className={`sol s2 rv${index === 0 ? " dark orange-hover-glow" : ""}`}
                key={service.href}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <span className="ic">
                  <Icon name={service.icon} />
                </span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <span className="go">
                  <Icon name="i-arrow" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
