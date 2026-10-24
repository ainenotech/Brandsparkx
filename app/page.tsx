import Link from "next/link";
import { Icon } from "@/components/Icon";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { FinalCta } from "@/components/FinalCta";
import { CaseCards } from "@/components/home/CaseCards";
import { ClientMarquee } from "@/components/home/ClientMarquee";
import { Hero } from "@/components/home/Hero";
import { HomeEcosystem } from "@/components/home/HomeEcosystem";
import { HowWeWork } from "@/components/home/HowWeWork";
import { SolutionsShowcase } from "@/components/home/SolutionsShowcase";
import { StatementSection } from "@/components/home/StatementSection";
import { TeamGrid } from "@/components/home/TeamGrid";
import { Testimonials } from "@/components/home/Testimonials";
import { WhyPrinciples } from "@/components/home/WhyPrinciples";
import { cases } from "@/content/cases";
import { faqs } from "@/content/faqs";
import { clientLogos } from "@/content/clients";
import { SHOW_PLACEHOLDER_CONTENT, SHOW_TESTIMONIALS, site } from "@/content/site";
import { team } from "@/content/team";
import { testimonials } from "@/content/testimonials";
import { leadershipJsonLd, pageMetadata } from "@/lib/seo";
import { visible } from "@/lib/placeholders";

export const metadata = pageMetadata("home");

const whyPoints = [
  ["Strategy first.", "We start with the business problem, not the technology."],
  ["Built for business.", "Every solution is designed around practical outcomes."],
  ["Human + AI.", "AI enhances your people and processes rather than simply replacing them."],
  [
    "Flexible technology.",
    "We work with the right technologies and engineering capabilities for the requirement.",
  ],
  ["Built to scale.", "Start with one workflow, one department or one problem — then expand."],
] as const;

export default function HomePage() {
  const members = visible(team);
  const caseItems = visible(cases);
  const quotes = visible(testimonials);
  const showLogoSlots = clientLogos.length === 0 && SHOW_PLACEHOLDER_CONTENT;

  return (
    <div className="page on">
      {leadershipJsonLd(members).map((person) => (
        <JsonLd key={person["@id"]} data={person} />
      ))}
      <Hero />

      {(clientLogos.length > 0 || showLogoSlots) && (
        <section className="cm-sec" id="clients">
          <div className="wrap">
            <div className="sec-head rv">
              <div>
                <div className="kicker">Our clients</div>
                <h2>Trusted by ambitious businesses.</h2>
              </div>
              <p className="lede">Building intelligent solutions for businesses ready to grow.</p>
            </div>
            <ClientMarquee logos={clientLogos} slots={showLogoSlots ? 6 : 0} />
            {showLogoSlots && (
              <div className="note rv">
                <Icon name="i-info" />
                Logo slots are placeholders. Add approved client logos (monochrome SVG works best);
                they are shown in greyscale.
              </div>
            )}
          </div>
        </section>
      )}

      <section className="st2-sec">
        <StatementSection />
      </section>

      <HomeEcosystem />

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
          <SolutionsShowcase />
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
          <HowWeWork />
        </div>
      </section>

      <section className="why2-sec" id="why">
        <WhyPrinciples points={whyPoints} />
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
        <section className="stx-sec dark-sec" id="stories">
          <div className="wrap">
            <div className="sec-head rv">
              <div>
                <div className="kicker">Practical AI</div>
                <h2>Example use cases</h2>
              </div>
              <p className="lede">
                Explore how intelligent technology can create meaningful business impact.
              </p>
            </div>
            <CaseCards items={caseItems} />
            <div style={{ marginTop: 40 }} className="rv">
              <Link href="/work" className="link">
                See how it works <Icon name="i-arrow" width={16} height={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Hidden until real testimonials exist (see SHOW_TESTIMONIALS in content/site.ts). */}
      {SHOW_TESTIMONIALS && quotes.length > 0 && (
        <section className="tst-sec" id="testimonials">
          <div className="wrap">
            <div className="sec-head rv">
              <div>
                <div className="kicker">Client testimonials</div>
                <h2>Hear what our clients have to say.</h2>
              </div>
              <p className="lede">
                Only approved, attributed feedback appears here — in our clients&rsquo; own words.
              </p>
            </div>
          </div>
          <Testimonials items={quotes} />
        </section>
      )}

      <FaqSection items={faqs.home} />

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
          className="btn btn-glass"
        >
          <span className="wa-dot" aria-hidden="true" />
          WhatsApp us
        </a>
      </FinalCta>
    </div>
  );
}
