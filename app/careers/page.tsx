import { ClockIcon, EnvelopeSimpleIcon, FileTextIcon, MapPinIcon } from "@phosphor-icons/react/ssr";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CareerBoard } from "@/components/careers/CareerBoard";
import { CareersForm } from "@/components/careers/CareersForm";
import { Icon } from "@/components/Icon";
import { FaqSection } from "@/components/FaqSection";
import { careerCategories, careerPage } from "@/content/careers";
import { faqs } from "@/content/faqs";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("careers");

/*
 * TODO(schema): no JobPosting structured data yet, on purpose: the page lists hiring areas, not
 * individual openings, and Google only accepts JobPosting for a real, open position (one per
 * job page). When roles are approved, publish one page per opening with JobPosting containing:
 * title, description (HTML), datePosted, validThrough, employmentType, hiringOrganization
 * (@id ${SITE_URL}/#organization), jobLocation (PostalAddress of the office) or
 * jobLocationType "TELECOMMUTE" + applicantLocationRequirements, and baseSalary if disclosed.
 */
export default function CareersPage() {
  const { hero, opportunities, culture, process, apply } = careerPage;

  return (
    <div className="page on career-page">
      <section className="kx-hero" aria-labelledby="careers-title">
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Careers", path: "/careers" }]} />
          <div className="kx-hero__grid">
            <div>
              <div className="kicker">{hero.kicker}</div>
              <h1 id="careers-title">{hero.title}</h1>
              <p className="lede">{hero.intro}</p>
              <div className="kx-hero__cta">
                <a href="#opportunities" className="btn btn-red">
                  Explore opportunities <Icon name="i-arrow" />
                </a>
                <p className="kx-places">
                  <Icon name="i-pin" />
                  {hero.places}
                </p>
              </div>
            </div>
            <ul className="kx-stats" aria-label="BrandSparkX at a glance">
              {hero.highlights.map((h) => (
                <li key={h.value}>
                  <span className="kx-stats__icon" aria-hidden="true">
                    <Icon name={h.icon} />
                  </span>
                  <strong>{h.value}</strong>
                  <span>{h.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CareerBoard
        title={opportunities.title}
        intro={opportunities.intro}
        categories={careerCategories}
      />

      {/* Values and "Why BrandSparkX" share one section so they don't repeat each other. */}
      <section className="kx-sec kx-why" aria-labelledby="why-title">
        <div className="wrap kx-why__grid">
          <div>
            <h2 id="why-title">{culture.title}</h2>
            <p className="lede">{culture.intro}</p>
            <ul className="kx-values">
              {culture.values.map((value) => (
                <li key={value.title}>
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="kx-why__label">Why BrandSparkX</h3>
            <ul className="kx-perks">
              {culture.perks.map((perk) => (
                <li key={perk.title}>
                  <span className="kx-perks__icon" aria-hidden="true">
                    <Icon name={perk.icon} />
                  </span>
                  <h4>{perk.title}</h4>
                  <p>{perk.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="kx-sec" aria-labelledby="process-title">
        <div className="wrap">
          <h2 id="process-title" className="kx-center">
            {process.title}
          </h2>
          <ol className="kx-steps">
            {process.steps.map((step, i) => (
              <li key={step.title}>
                <span className="kx-steps__num" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FaqSection items={faqs.careers} />

      <section id="apply" className="kx-sec kx-apply" aria-labelledby="apply-title">
        <div className="wrap kx-apply__grid">
          <div className="kx-apply__intro">
            <span className="contact-eyebrow">
              <span />
              {apply.eyebrow.toUpperCase()}
            </span>
            <h2 id="apply-title">{apply.title}</h2>
            <p>{apply.intro}</p>
            <ul className="kx-apply__points">
              {apply.points.map((point, i) => {
                const PointIcon = [ClockIcon, FileTextIcon, MapPinIcon][i];
                return (
                  <li key={point}>
                    <PointIcon aria-hidden="true" />
                    {point}
                  </li>
                );
              })}
            </ul>
            <a className="kx-apply__email" href={`mailto:${site.careers.email}`}>
              <EnvelopeSimpleIcon aria-hidden="true" />
              <span>
                Prefer email? <strong>{site.careers.email}</strong>
              </span>
            </a>
          </div>
          <div className="cf-card">
            <CareersForm />
          </div>
        </div>
      </section>
    </div>
  );
}
