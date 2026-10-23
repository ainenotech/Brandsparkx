import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { FinalCta } from "@/components/FinalCta";
import { FlowSection } from "@/components/flow/FlowSection";
import { LinearFlow } from "@/components/flow/LinearFlow";
import { CaseCards } from "@/components/home/CaseCards";
import { HeroRibbon } from "@/components/home/HeroRibbon";
import { HeroWalkthrough } from "@/components/home/HeroWalkthrough";
import { TeamGrid } from "@/components/home/TeamGrid";
import { Testimonials } from "@/components/home/Testimonials";
import { cases } from "@/content/cases";
import { clientLogos } from "@/content/clients";
import { SHOW_PLACEHOLDER_CONTENT, site } from "@/content/site";
import { team } from "@/content/team";
import { testimonials } from "@/content/testimonials";
import { pageMetadata } from "@/lib/seo";
import { visible } from "@/lib/placeholders";

export const metadata = pageMetadata({
  title: "BrandSparkX | AI Growth & Automation Company in Dubai, UAE",
  description:
    "BrandSparkX is an AI growth and automation company in Dubai: AI voice agents, AI sales and marketing, business automation and AI engineers on demand.",
  path: "/",
});

const smallCards = [
  {
    href: "/solutions/ai-growth",
    icon: "i-growth",
    title: "AI Growth",
    tag: "Turn AI into a growth strategy.",
    text: "Find where AI creates the greatest impact, then get a practical roadmap.",
  },
  {
    href: "/solutions/ai-content",
    icon: "i-content",
    title: "AI Content",
    tag: "Create more. Work less.",
    text: "An AI-powered content engine for social, video, copy and campaigns.",
  },
  {
    href: "/solutions/ai-marketing",
    icon: "i-mkt",
    title: "AI Marketing",
    tag: "Make marketing more intelligent.",
    text: "Automate lead generation, nurturing, CRM and WhatsApp workflows.",
  },
  {
    href: "/solutions/business-automation",
    icon: "i-auto",
    title: "Business Automation",
    tag: "Connect your business. Automate the work.",
    text: "Connect people, tools and data so repetitive work runs itself.",
  },
  {
    href: "/ai-engineers",
    icon: "i-eng",
    title: "AI Engineers on Demand",
    tag: "AI talent when you need it.",
    text: "AI engineers and developers by project, week or month.",
  },
] as const;

const whyPoints = [
  ["Strategy first.", "We start with the business problem, not the technology."],
  ["Built for business.", "Every solution is designed around practical outcomes."],
  ["Human + AI.", "AI enhances your people and processes rather than simply replacing them."],
  [
    "Flexible technology.",
    "We work with the right technologies and engineering capabilities for the requirement.",
  ],
  ["Built to scale.", "Start with one workflow, one department or one problem — then expand."],
];

export default function HomePage() {
  const members = visible(team);
  const caseItems = visible(cases);
  const quotes = visible(testimonials);
  const showLogoSlots = clientLogos.length === 0 && SHOW_PLACEHOLDER_CONTENT;

  return (
    <div className="page on">
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <Link href="/ai-voice-calling" className="pill fade" style={{ animationDelay: ".05s" }}>
              <b>New</b>AI voice agents that answer, qualify and book, 24/7
              <Icon name="i-arrow" />
            </Link>
            <h1>
              <span className="ln">
                <span>Build.</span>
              </span>{" "}
              <span className="ln">
                <span>Automate.</span>
              </span>{" "}
              <span className="ln">
                <span>Grow with AI.</span>
              </span>
            </h1>
            <p className="lede fade" style={{ animationDelay: ".55s" }}>
              Turn AI into a practical growth engine for your business — from strategy and sales to
              automation, engineering and intelligent customer experiences.
            </p>
            <div className="hero-ctas fade" style={{ animationDelay: ".7s" }}>
              <Link href="/solutions" className="btn btn-red">
                Explore Solutions <Icon name="i-arrow" />
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Talk to Us
              </Link>
            </div>
            <div className="svc-row fade" style={{ animationDelay: ".8s" }}>
              <span>
                <Icon name="i-voice" />
                AI voice agents
              </span>
              <span>
                <Icon name="i-auto" />
                Business automation
              </span>
              <span>
                <Icon name="i-eng" />
                AI engineers
              </span>
            </div>
            <div className="hero-meta fade" style={{ animationDelay: ".9s" }}>
              <div>
                <b>7 AI capabilities</b>One connected growth system
              </div>
              <div>
                <b>Prove it in 7 days</b>Start with one problem
              </div>
              <div>
                <b>Dubai &amp; Bengaluru</b>Serving businesses globally
              </div>
            </div>
          </div>
          <HeroWalkthrough />
        </div>
        <HeroRibbon />
      </section>

      {(clientLogos.length > 0 || showLogoSlots) && (
        <section className="trust" id="clients">
          <div className="wrap">
            <div className="trust-grid">
              <div className="trust-head rv">
                <div className="kicker">Our clients</div>
                <h2>Trusted by ambitious businesses.</h2>
                <p>Building intelligent solutions for businesses ready to grow.</p>
              </div>
              <div className="trust-marquee rv">
                <div className="trust-track">
                  {/* Two identical sets so the strip loops seamlessly; the copy is hidden from screen readers. */}
                  {[0, 1].map((copy) => (
                    <div className="trust-set" key={copy} aria-hidden={copy === 1 || undefined}>
                      {showLogoSlots
                        ? Array.from({ length: 6 }, (_, i) => (
                            <div className="trust-logo" key={i}>
                              <div className="slot">Client logo</div>
                            </div>
                          ))
                        : clientLogos.map((c) => (
                            <div className="trust-logo" key={c.name}>
                              <Image src={c.logo} alt={c.name} width={c.width} height={c.height} />
                            </div>
                          ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {showLogoSlots && (
              <div className="note rv">
                <Icon name="i-info" />
                Logo slots are placeholders. Add approved client logos (monochrome SVG works best) —
                they gain a colour transition on hover.
              </div>
            )}
          </div>
        </section>
      )}

      <section>
        <div className="wrap statement">
          <div className="rv">
            <div className="kicker">AI that works for your business</div>
            <h2>Stop experimenting. Start building with AI.</h2>
          </div>
          <div className="rv">
            <p className="big">
              AI should do more than generate content or answer questions.{" "}
              <em>
                It should help your business attract customers, automate work, accelerate sales and
                build better systems.
              </em>
            </p>
            <p className="lede" style={{ marginTop: 22 }}>
              BrandSparkX brings strategy, technology and execution together to make AI work inside
              your business.
            </p>
            <div className="statement-list">
              {[
                "Automate repetitive processes",
                "Build AI-powered customer experiences",
                "Develop custom AI solutions",
                "Add AI talent to your technology team",
              ].map((item) => (
                <div key={item}>
                  <Icon name="i-check" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FlowSection id="home" />

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <div className="kicker">Our solutions</div>
              <h2>Seven ways we help businesses build with AI.</h2>
            </div>
            <p className="lede">
              Each capability works on its own. Together they form one connected growth system.
            </p>
          </div>
          <div className="bento">
            <Link href="/ai-voice-calling" className="sol dark feat rv orange-hover-glow">
              <span className="ic">
                <Icon name="i-voice" />
              </span>
              <span className="go">
                <Icon name="i-arrow" />
              </span>
              <h3>AI Voice &amp; Calling</h3>
              <div className="tag">Give your business a voice.</div>
              <p style={{ maxWidth: "34ch" }}>
                AI voice agents that answer, qualify and book appointments for you, 24/7 — inbound
                and outbound.
              </p>
              <div className="wave" aria-hidden="true">
                {[0, 0.15, 0.3, 0.45, 0.6, 0.75].map((d) => (
                  <i key={d} style={{ animationDelay: `${d}s` }} />
                ))}
              </div>
            </Link>
            <Link href="/solutions/ai-sales" className="sol feat rv">
              <span className="ic">
                <Icon name="i-sales" />
              </span>
              <span className="go">
                <Icon name="i-arrow" />
              </span>
              <h3>AI Sales</h3>
              <div className="tag">Turn leads into conversations.</div>
              <p>
                Use AI to qualify leads, follow up, engage prospects and move every opportunity
                forward.
              </p>
            </Link>
            {smallCards.map((c) => (
              <Link key={c.href} href={c.href} className="sol s2 rv">
                <span className="ic">
                  <Icon name={c.icon} />
                </span>
                <span className="go">
                  <Icon name="i-arrow" />
                </span>
                <h3>{c.title}</h3>
                <div className="tag">{c.tag}</div>
                <p>{c.text}</p>
              </Link>
            ))}
            <Link href="/contact" className="sol cta rv">
              <h3>Start with one problem.</h3>
              <p>Build from there. Prove it in 7 days.</p>
              <span className="btn btn-white" style={{ alignSelf: "flex-start", marginTop: 24 }}>
                Talk to Us <Icon name="i-arrow" />
              </span>
            </Link>
          </div>
          <div style={{ marginTop: 36 }} className="rv">
            <Link href="/solutions" className="link">
              Explore all solutions <Icon name="i-arrow" width={16} height={16} />
            </Link>
          </div>
        </div>
      </section>

      <section id="how">
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
        <div className="wrap why">
          <div className="sticky rv">
            <div className="kicker">Why BrandSparkX</div>
            <h2>AI should create business value — not complexity.</h2>
            <p className="lede" style={{ marginTop: 22 }}>
              Businesses don&apos;t need more disconnected tools. They need the right AI, connected
              to the way they already work.
            </p>
          </div>
          <div className="why-list rv">
            {whyPoints.map(([title, text]) => (
              <div className="why-row" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="team">
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <div className="kicker">Meet our team</div>
              <h2>People behind the intelligence.</h2>
            </div>
            <p className="lede">
              Strategy, engineering and delivery — led by people who answer for the outcome.
            </p>
          </div>
          <TeamGrid members={members} />
          <div style={{ marginTop: 40 }} className="rv">
            <Link href="/about" className="link">
              Learn about us <Icon name="i-arrow" width={16} height={16} />
            </Link>
          </div>
        </div>
      </section>

      {caseItems.length > 0 && (
        <section style={{ background: "var(--soft)" }} id="stories">
          <div className="wrap">
            <div className="sec-head rv">
              <div>
                <div className="kicker">Stories of success</div>
                <h2>Real problems. Practical AI.</h2>
              </div>
              <p className="lede">
                Explore how intelligent technology can create meaningful business impact.
              </p>
            </div>
            <CaseCards items={caseItems} />
            <div style={{ marginTop: 40 }} className="rv">
              <Link href="/work" className="link">
                See all work <Icon name="i-arrow" width={16} height={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {quotes.length > 0 && (
        <section id="testimonials">
          <div className="wrap testi">
            <div className="rv">
              <div className="kicker">Client testimonials</div>
              <h2>Hear what our clients have to say.</h2>
              <p className="lede" style={{ marginTop: 22 }}>
                Only approved, attributed feedback appears here.
              </p>
            </div>
            <div className="rv">
              <Testimonials items={quotes} />
            </div>
          </div>
        </section>
      )}

      <FinalCta
        title="Ready to build with AI?"
        text="Tell us what you want to improve, automate or build. We'll help you identify where AI can create the most value."
      >
        <Link href="/contact" className="btn btn-red">
          Start a Conversation <Icon name="i-arrow" />
        </Link>
        <a
          href={site.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
          style={{ color: "#fff", border: "1.5px solid rgba(255,255,255,.2)" }}
        >
          WhatsApp us
        </a>
      </FinalCta>
    </div>
  );
}
