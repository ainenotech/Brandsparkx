import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CareerBoard } from "@/components/careers/CareerBoard";
import { CareersForm } from "@/components/careers/CareersForm";
import { FinalCta } from "@/components/FinalCta";
import { Icon } from "@/components/Icon";
import { careerCategories, careerPage } from "@/content/careers";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Careers | BrandSparkX",
  description:
    "Careers at BrandSparkX in Dubai and Bengaluru. Explore AI, marketing, sales, and technology teams, then prepare an application by email.",
  path: "/careers",
});

export default function CareersPage() {
  const { hero, chapter, opportunities, culture, process, apply, closing } = careerPage;

  return (
    <div className="page on career-page">
      <div className="phero">
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Careers", path: "/careers" }]} />
          <div className="kicker">{hero.kicker}</div>
          <h1>{hero.title}</h1>
          <p className="lede">{hero.intro}</p>
          <Link href="#opportunities" className="btn btn-red">
            Explore Opportunities <Icon name="i-arrow" />
          </Link>
          <p className="career-places">{hero.places}</p>
        </div>
      </div>

      <section>
        <div className="wrap">
          <h2 className="rv">{chapter.title}</h2>
          <p className="lede rv">{chapter.text}</p>
        </div>
      </section>

      <CareerBoard
        title={opportunities.title}
        note={opportunities.note}
        categories={careerCategories}
      />

      <section style={{ background: "var(--soft)" }}>
        <div className="wrap">
          <h2 className="rv">{culture.title}</h2>
          <p className="lede rv">{culture.intro}</p>
          <div className="career-list rv">
            {culture.values.map((value) => (
              <article key={value.title}>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2 className="rv">{process.title}</h2>
          <ol className="career-steps rv">
            {process.steps.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="apply" className="career-apply">
        <div className="wrap">
          <h2 className="rv">{apply.title}</h2>
          <p className="lede rv">{apply.intro}</p>
          <CareersForm />
          <p className="career-note">
            Prefer email? Send your CV and the role you&apos;re applying for to{" "}
            <a className="link" href={`mailto:${site.careers.email}`}>
              {site.careers.email}
            </a>
          </p>
        </div>
      </section>

      <FinalCta title={closing.title} text={closing.text}>
        <Link href="#apply" className="btn btn-red">
          Apply <Icon name="i-arrow" />
        </Link>
      </FinalCta>
    </div>
  );
}
