import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Skyline } from "@/components/layout/Skyline";
import { site } from "@/content/site";
import { solutionHref, solutions } from "@/content/solutions";

// AI Marketing and AI Sales are left out of the footer only (still in the nav and pages).
// AI Voice & Calling leads as the main offering; the rest follow the original site order.
const footerSolutions = [
  "ai-voice-calling",
  "ai-growth",
  "ai-content",
  "ai-engineers",
  "business-automation",
]
  .map((slug) => solutions.find((s) => s.slug === slug)!)
  .map((s) => ({
    href: solutionHref(s),
    label: s.slug === "ai-engineers" ? "AI Engineers" : s.title,
  }));

// Footer shows office names only; each opens the full address (site.offices) in Google Maps.
const mapsHref = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export function Footer() {
  return (
    <footer className="ftr">
      <div className="ftr-brand-bg" aria-hidden="true">
        <span>
          {"BRANDSPARKX".split("").map((letter, index) => (
            <span key={`${letter}-${index}`} aria-hidden="true">
              {letter}
            </span>
          ))}
        </span>
      </div>

      <Skyline />

      <div className="wrap ftr-top">
        <div>
          <Link href="/" className="flogo" aria-label="BrandSparkX home">
            <Image
              src="/brand/brand-logo-light.webp"
              alt="BrandSparkX"
              width={186}
              height={26}
              style={{ width: "auto", height: "auto" }}
            />
          </Link>
          <div className="tagl">
            Build. Automate.
            <br />
            Grow with AI.
          </div>
          <p>{site.description}</p>
          {site.socials.length > 0 && (
            <div className="soc">
              {site.socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                >
                  <Icon name={s.label === "Instagram" ? "i-ig" : "i-in"} />
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="fh">Contact us</h2>
          <div className="cl">
            <a href={site.phoneHref}>
              <Icon name="i-phone" />
              <span>
                <small>Phone / WhatsApp</small>
                {site.phone}
              </span>
            </a>
            <a href={`mailto:${site.email}`}>
              <Icon name="i-mail" />
              <span>
                <small>Email</small>
                {site.email}
              </span>
            </a>
            <div className="cl-row">
              <Link href="/contact" className="cl-link">
                <Icon name="i-arrow" />
                <span>Contact us</span>
              </Link>
              <div className="soc">
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <Icon name="i-wa" />
                </a>
                <a href={`mailto:${site.email}`} aria-label="Email">
                  <Icon name="i-mail" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="fh">Careers</h2>
          <div className="cl">
            <a href={site.careers.phoneHref}>
              <Icon name="i-phone" />
              <span>
                <small>Phone</small>
                {site.careers.phone}
              </span>
            </a>
            <a href={`mailto:${site.careers.email}`}>
              <Icon name="i-mail" />
              <span>
                <small>Email</small>
                {site.careers.email}
              </span>
            </a>
            <Link href="/careers" className="cl-link">
              <Icon name="i-arrow" />
              <span>View careers</span>
            </Link>
          </div>
        </div>

        <div>
          <h2 className="fh">Solutions</h2>
          <ul>
            {footerSolutions.map((s) => (
              <li key={s.href}>
                <Link href={s.href}>{s.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="ftr-locs">
          <h2 className="fh">Our locations</h2>
          <div className="ftr-locs__grid">
            {site.offices.map((o) => (
              <a
                className="loc"
                key={o.city}
                href={mapsHref(o.address)}
                target="_blank"
                rel="noopener noreferrer"
                // The label must contain the visible name (WCAG 2.5.3, label in name).
                aria-label={`Open ${o.city} office in Google Maps`}
              >
                <Icon name="i-pin" />
                <span>{o.city}</span>
                <svg className="loc__ext" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                  <path
                    d="M9 3h4v4M13 3 7.5 8.5M11 9.5V13H3V5h3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap ftr-bot">
        <p>© {new Date().getFullYear()} BrandSparkX. All rights reserved.</p>
        <nav aria-label="Legal">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms &amp; Conditions</Link>
        </nav>
      </div>
    </footer>
  );
}
