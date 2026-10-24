import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { TeamGrid } from "@/components/home/TeamGrid";
import { site } from "@/content/site";
import { solutionHref, solutions } from "@/content/solutions";
import { team } from "@/content/team";
import { visible } from "@/lib/placeholders";
import { Icon, type IconName } from "@/components/Icon";
import { leadershipJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("about");

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
  const members = visible(team);
  return (
    <div className="page on">
      <div className="phero">
        <div className="wrap pgrid">
          <div className="ptext">
            <Breadcrumbs items={[{ name: "About", path: "/about" }]} />
            <h1>We believe AI should make business better.</h1>
            <p className="lede">{site.about}</p>
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

      <section style={{ background: "var(--soft)" }} aria-labelledby="facts-title">
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <div className="kicker">Company facts</div>
              <h2 id="facts-title">BrandSparkX at a glance.</h2>
            </div>
            <p className="lede">{site.description}</p>
          </div>
          {/*
            Facts only. TODO(about): add "Founded" (year) and "Team size" rows once confirmed;
            they are left out until then rather than shown as placeholders.
          */}
          <dl className="facts rv">
            <div>
              <dt>What we do</dt>
              <dd>
                AI growth and automation: AI voice agents, AI sales and marketing automation, AI
                content, business process automation, AI growth strategy and AI engineers on demand.
              </dd>
            </div>
            <div>
              <dt>Who we serve</dt>
              <dd>
                Businesses in the UAE, India and worldwide that want to use AI for growth, sales,
                customer engagement and operations.
              </dd>
            </div>
            <div>
              <dt>Headquarters</dt>
              <dd>{site.offices[0].address}</dd>
            </div>
            <div>
              <dt>Offices</dt>
              <dd>
                <ul>
                  {site.offices.map((o) => (
                    <li key={o.city}>
                      <Link className="link" href={`/contact#office-${o.locality.toLowerCase()}`}>
                        {o.city}
                      </Link>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt>Contact</dt>
              <dd>
                <a className="link" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
                <br />
                <a className="link" href={site.phoneHref}>
                  {site.phone}
                </a>{" "}
                (phone and WhatsApp)
                <br />
                Careers:{" "}
                <a className="link" href={`mailto:${site.careers.email}`}>
                  {site.careers.email}
                </a>
              </dd>
            </div>
            <div>
              <dt>Services</dt>
              <dd>
                <ul>
                  {solutions.map((s) => (
                    <li key={s.slug}>
                      <Link className="link" href={solutionHref(s)}>
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section id="team" aria-labelledby="team-title">
        {leadershipJsonLd(members).map((person) => (
          <JsonLd key={person["@id"]} data={person} />
        ))}
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <div className="kicker">Meet our team</div>
              <h2 id="team-title">People behind the intelligence.</h2>
            </div>
            <p className="lede">
              Strategy, engineering and delivery, led by people who answer for the outcome.
            </p>
          </div>
          <TeamGrid members={members} />
        </div>
      </section>

      <FinalCta title="Let's talk about what you want to build.">
        <Link href="/contact" className="btn btn-red">
          Start a Conversation <Icon name="i-arrow" />
        </Link>
        <Link
          href="#team"
          className="btn"
          style={{ color: "#fff", border: "1.5px solid rgba(255,255,255,.2)" }}
        >
          Meet the team
        </Link>
      </FinalCta>
    </div>
  );
}
