import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FinalCta } from "@/components/FinalCta";
import { Icon, type IconName } from "@/components/Icon";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "AI Services | BrandSparkX",
  description:
    "Explore BrandSparkX AI services: AI voice and calling, on-demand AI engineers, and practical AI work built around business outcomes.",
  path: "/services",
});

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

export default function ServicesPage() {
  return (
    <div className="page on">
      <div className="phero">
        <div className="wrap pgrid">
          <div className="ptext">
            <Breadcrumbs items={[{ name: "Services", path: "/services" }]} />
            <h1>Practical AI services, built around your business.</h1>
            <p className="lede">
              Explore our AI voice, engineering and delivery services. Choose a starting point, then
              connect it to the outcomes that matter to your business.
            </p>
          </div>
          <div className="pvis" aria-hidden="true">
            <div className="win">
              <div className="win-bar">
                <span className="dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span>brandsparkx.services</span>
              </div>
              <div className="dash-h">
                <b>One connected team</b>
                <span className="chip-s">AI · Automation · Engineering</span>
              </div>
              <div className="kpis">
                {services.map((service, index) => (
                  <div className="kpi" key={service.title}>
                    <small>{service.title}</small>
                    <div className="bars" aria-hidden="true">
                      {[34, 52, 42, 68, 58, 82].map((height, bar) => (
                        <i
                          key={bar}
                          style={{
                            height: `${height + index * 3}%`,
                            animationDelay: `${(index + bar) * 0.08}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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

      <FinalCta
        title="Need help choosing a service?"
        text="Tell us about your goal and we’ll help you find the right first step."
      >
        <Link href="/contact" className="btn btn-red">
          Contact Us <Icon name="i-arrow" />
        </Link>
      </FinalCta>
    </div>
  );
}
