import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/content/site";
import { officesJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact | BrandSparkX",
  description:
    "Talk to BrandSparkX about AI automation, AI voice agents or AI engineers. Offices in Business Bay, Dubai and Bengaluru. Call or WhatsApp +971 55 996 3778.",
  path: "/contact",
});

const trustPoints = ["Free strategy call", "No commitment", "Your data stays private"];
const officeId = (locality: string) => `office-${locality.toLowerCase()}`;

export default function ContactPage() {
  return (
    <div className="page on contact-page">
      {officesJsonLd().map((office) => (
        <JsonLd key={office.name} data={office} />
      ))}
      <section className="cx" aria-labelledby="contact-title">
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
          <div className="cx-grid">
            <div className="cx-intro">
              <span className="contact-eyebrow">
                <span />
                START A CONVERSATION
              </span>
              <h1 id="contact-title">
                Let&apos;s build your <span>growth system.</span>
              </h1>
              <p className="cx-lede">
                Tell us what you want to improve, automate or build. We&apos;ll help you find the
                right starting point.
              </p>
              <p className="cx-reply">
                <span className="cx-pulse" aria-hidden="true" />
                We reply within 24 hours
              </p>

              <ul className="cx-quick" aria-label="Quick contact options">
                <li>
                  <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer">
                    <span className="cx-ico cx-ico--wa" aria-hidden="true">
                      <Icon name="i-wa" />
                    </span>
                    <span>
                      <small>WhatsApp or call</small>
                      <strong>{site.phone}</strong>
                    </span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`}>
                    <span className="cx-ico" aria-hidden="true">
                      <Icon name="i-mail" />
                    </span>
                    <span>
                      <small>Email</small>
                      <strong>{site.email}</strong>
                    </span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.primaryContact.email}`}>
                    <span className="cx-ico" aria-hidden="true">
                      <Icon name="i-users" />
                    </span>
                    <span>
                      <small>Direct line · {site.primaryContact.name}</small>
                      <strong>{site.primaryContact.email}</strong>
                    </span>
                  </a>
                </li>
              </ul>

              <div className="cx-cities">
                <h2>Offices</h2>
                <ul>
                  {site.offices.map((o) => (
                    <li key={o.city}>
                      <a href={`#${officeId(o.locality)}`}>
                        <Icon name="i-pin" />
                        {o.city}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <ul className="cx-trust" aria-label="What to expect">
                {trustPoints.map((t) => (
                  <li key={t}>
                    <Icon name="i-check" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="cf-card" id="contact-form">
              <div className="cf-head">
                <span className="contact-form-step">01 / YOUR PROJECT</span>
                <h2>What can we help you move forward?</h2>
                <p>A few details will help us understand where to begin.</p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="cx-offices" aria-labelledby="offices-title">
        <div className="wrap">
          <span className="contact-eyebrow">
            <span />
            OUR OFFICES
          </span>
          <h2 id="offices-title">Find us in four cities</h2>
          <div className="cx-offices__grid">
            {site.offices.map((office, index) => (
              <article
                className="contact-office-glass"
                key={office.city}
                id={officeId(office.locality)}
              >
                <div className="contact-office-heading">
                  <span className="contact-office-index">0{index + 1}</span>
                  <h3>{office.city}</h3>
                </div>
                <p>{office.address}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-directions-link"
                >
                  Get directions <Icon name="i-arrow" />
                </a>
                {office.phoneHref && office.phoneHref !== site.phoneHref && (
                  <a className="contact-office-phone" href={office.phoneHref}>
                    {office.phone}
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
