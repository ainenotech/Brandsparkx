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

export default function ContactPage() {
  const [dubai, bengaluru] = site.offices;

  return (
    <div className="page on contact-page">
      {officesJsonLd().map((office) => (
        <JsonLd key={office.name} data={office} />
      ))}
      <section className="contact-hero" aria-labelledby="contact-title">
        <div className="wrap contact-hero__inner">
          <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
          <div className="contact-hero__grid">
            <div className="contact-hero__copy">
              <span className="contact-eyebrow">
                <span />
                START A CONVERSATION
              </span>
              <h1 id="contact-title">
                Let&apos;s build something <span>with AI.</span>
              </h1>
              <p className="lede">
                Tell us what you want to improve, automate or build. We&apos;ll help you identify the
                right starting point.
              </p>
            </div>
            <div className="contact-orbit" aria-hidden="true">
              <div className="contact-orbit__ring contact-orbit__ring--outer" />
              <div className="contact-orbit__ring contact-orbit__ring--inner" />
              <div className="contact-orbit__core">
                <Icon name="i-spark" />
              </div>
              <span className="contact-orbit__node contact-orbit__node--dubai">{dubai.city}</span>
              <span className="contact-orbit__node contact-orbit__node--bengaluru">
                {bengaluru.city}
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="contact-main" aria-label="Contact BrandSparkX">
        <div className="wrap contact-layout">
          <div className="contact-form-glass">
            <div className="contact-form-heading">
              <div>
                <span className="contact-form-step">01 / YOUR PROJECT</span>
                <h2>What can we help you move forward?</h2>
              </div>
              <span className="contact-form-mark" aria-hidden="true">
                <Icon name="i-arrow" />
              </span>
            </div>
            <p className="contact-form-intro">
              A few details will help us understand where to begin.
            </p>
            <ContactForm />
          </div>

          <aside className="contact-details" aria-label="Contact details">
            <div className="contact-primary-glass">
              <span className="contact-detail-label">DIRECT LINE</span>
              <div className="contact-primary-name">
                <span className="contact-presence" />
                <span>{site.primaryContact.name}</span>
              </div>
              <a className="contact-detail-link" href={`mailto:${site.primaryContact.email}`}>
                {site.primaryContact.email}
                <Icon name="i-arrow" />
              </a>
              <a className="contact-detail-link" href={site.phoneHref}>
                {site.phone}
                <Icon name="i-arrow" />
              </a>
              <a className="contact-whatsapp-link" href={site.whatsappHref} target="_blank" rel="noreferrer">
                <Icon name="i-wa" />
                Call or WhatsApp
              </a>
            </div>

            <a className="contact-general-glass" href={`mailto:${site.email}`}>
              <span className="contact-icon-box" aria-hidden="true">
                <Icon name="i-mail" />
              </span>
              <span>
                <small>GENERAL ENQUIRIES</small>
                <strong>{site.email}</strong>
              </span>
              <Icon name="i-arrow" />
            </a>

            {[dubai, bengaluru].map((office, index) => (
              <article className="contact-office-glass" key={office.city}>
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
                {office.phoneHref !== site.phoneHref && (
                  <a className="contact-office-phone" href={office.phoneHref}>
                    {office.phone}
                  </a>
                )}
              </article>
            ))}
          </aside>
        </div>
      </section>
    </div>
  );
}
