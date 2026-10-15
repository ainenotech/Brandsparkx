import { Breadcrumbs } from "@/components/Breadcrumbs";
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
    <div className="page on">
      {officesJsonLd().map((office) => (
        <JsonLd key={office.name} data={office} />
      ))}
      <div className="phero">
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
          <h1>Let&apos;s build something with AI.</h1>
          <p className="lede">
            Tell us what you want to improve, automate or build. We&apos;ll help you identify the
            right starting point.
          </p>
        </div>
      </div>
      <section>
        <div className="wrap cgrid">
          <ContactForm />
          <aside className="cside">
            <div className="card dark">
              <b>Primary contact</b>
              <p style={{ color: "#fff", fontWeight: 600, fontSize: "1.05rem" }}>
                {site.primaryContact.name}
              </p>
              <a
                className="big"
                href={`mailto:${site.primaryContact.email}`}
                style={{ color: "#fff" }}
              >
                {site.primaryContact.email}
              </a>
              <a className="big" href={site.phoneHref} style={{ color: "#fff" }}>
                {site.phone}
              </a>
              <p style={{ marginTop: 10 }}>
                Call or WhatsApp to book your free AI business automation consultation.
              </p>
            </div>
            <div className="card">
              <b>General enquiries</b>
              <a className="big" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </div>
            <div className="card">
              <b>{dubai.city}</b>
              <p>{dubai.address}</p>
            </div>
            <div className="card">
              <b>{bengaluru.city}</b>
              <p>{bengaluru.address}</p>
              <a className="big" href={bengaluru.phoneHref} style={{ fontSize: "1rem" }}>
                {bengaluru.phone}
              </a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
