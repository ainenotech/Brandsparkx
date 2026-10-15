import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FinalCta } from "@/components/FinalCta";
import { Icon, type IconName } from "@/components/Icon";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About | BrandSparkX",
  description:
    "BrandSparkX is an AI growth and automation company based in Dubai, combining strategy, automation, engineering and AI customer engagement for real outcomes.",
  path: "/about",
});

const layers: {
  title: string;
  text: string;
  icon: IconName;
  i: number;
  d: number;
  top?: boolean;
}[] = [
  {
    title: "Business outcomes",
    text: "Growth, speed, efficiency",
    icon: "i-growth",
    i: 3,
    d: 0.9,
    top: true,
  },
  {
    title: "AI agents & automation",
    text: "Voice, sales, workflows",
    icon: "i-auto",
    i: 2,
    d: 0.6,
  },
  {
    title: "Engineering & cloud",
    text: "Integrations, data, deployment",
    icon: "i-cloud",
    i: 1,
    d: 0.3,
  },
  { title: "Your people & tools", text: "The way you already work", icon: "i-users", i: 0, d: 0 },
];

const pillars = [
  ["Business first", "Every engagement starts from a business goal."],
  ["Practical adoption", "Designed around outcomes you can measure."],
  ["Human + AI", "AI enhances your people and processes."],
  ["Flexible technology", "The right tools and engineering for the requirement."],
  ["Scalable", "One workflow first, then the whole business."],
];

export default function AboutPage() {
  return (
    <div className="page on">
      <div className="phero">
        <div className="wrap pgrid">
          <div className="ptext">
            <Breadcrumbs items={[{ name: "About", path: "/about" }]} />
            <h1>We believe AI should make business better.</h1>
            <p className="lede">
              BrandSparkX is an AI growth and automation company based in Dubai, helping businesses
              turn artificial intelligence into practical business outcomes. We combine strategy,
              automation, engineering and AI-powered customer engagement to help businesses build
              smarter systems.
            </p>
          </div>
          <div className="pvis stk" aria-hidden="true">
            <span className="sig" />
            {layers.map((l) => (
              <div
                key={l.title}
                className={l.top ? "layer top" : "layer"}
                style={{ "--i": l.i, "--d": l.d } as React.CSSProperties}
              >
                <div>
                  <b>{l.title}</b>
                  <small>{l.text}</small>
                </div>
                <span className="lic">
                  <Icon name={l.icon} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section>
        <div className="wrap">
          <div className="kicker rv">Our approach</div>
          <h2 className="rv" style={{ marginBottom: 40 }}>
            Business first. Technology second.
          </h2>
          <div className="contrast rv">
            <div className="cbox no">
              <div className="lbl">We don&apos;t start with</div>
              <blockquote>“Which AI tool should you buy?”</blockquote>
            </div>
            <div className="cbox yes">
              <div className="lbl">We start with</div>
              <blockquote>“What are you trying to achieve?”</blockquote>
            </div>
          </div>
          <p className="lede rv" style={{ marginTop: 30 }}>
            Then we identify the right technology, workflow or engineering solution to get there.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--soft)" }}>
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <div className="kicker">What we stand for</div>
              <h2>Practical AI, adopted well.</h2>
            </div>
          </div>
          <div className="pillars rv">
            {pillars.map(([title, text]) => (
              <div className="pillar" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="kicker rv">Our vision</div>
          <h2 className="rv" style={{ marginBottom: 40 }}>
            Build. Automate. Grow with AI.
          </h2>
          <div className="vision rv">
            <div>
              <b>Today</b>
              <p>We help businesses implement AI.</p>
            </div>
            <div>
              <b>Tomorrow</b>
              <p>
                We aim to build technology that makes AI-powered business growth simpler, smarter
                and more accessible.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FinalCta title="Let's talk about what you want to build.">
        <Link href="/contact" className="btn btn-red">
          Start a Conversation <Icon name="i-arrow" />
        </Link>
        <Link
          href="/#team"
          className="btn"
          style={{ color: "#fff", border: "1.5px solid rgba(255,255,255,.2)" }}
        >
          Meet the team
        </Link>
      </FinalCta>
    </div>
  );
}
