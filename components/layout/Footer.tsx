import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { site } from "@/content/site";
import { solutionHref, solutions } from "@/content/solutions";

// AI Voice & Calling leads as the main offering; the rest follow the original site order.
const footerSolutions = [
  "ai-voice-calling",
  "ai-growth",
  "ai-content",
  "ai-marketing",
  "ai-sales",
  "business-automation",
  "ai-engineers",
]
  .map((slug) => solutions.find((s) => s.slug === slug)!)
  .map((s) => ({
    href: solutionHref(s),
    label: s.slug === "ai-engineers" ? "AI Engineers" : s.title,
  }));

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

      <div className="skyline" aria-hidden="true">
        <svg viewBox="0 0 1440 260" preserveAspectRatio="xMidYMax slice">
          <g fill="#16161C">
            <rect x="40" y="150" width="60" height="110" />
            <rect x="110" y="120" width="44" height="140" />
            <rect x="164" y="170" width="70" height="90" />
            <rect x="250" y="90" width="50" height="170" />
            <polygon points="320,260 320,110 350,80 380,110 380,260" />
            <rect x="395" y="140" width="80" height="120" />
            <rect x="490" y="60" width="46" height="200" />
            <rect x="550" y="130" width="64" height="130" />
            <rect x="630" y="100" width="40" height="160" />
            <rect x="900" y="120" width="56" height="140" />
            <polygon points="970,260 970,70 1010,50 1010,260" />
            <rect x="1025" y="140" width="70" height="120" />
            <rect x="1110" y="95" width="48" height="165" />
            <rect x="1170" y="160" width="90" height="100" />
            <rect x="1275" y="110" width="44" height="150" />
            <rect x="1330" y="150" width="80" height="110" />
          </g>
          <g fill="#1E1E25">
            {/* tall needle tower */}
            <polygon points="760,260 772,40 780,0 788,40 800,260" />
            <polygon points="740,260 760,120 760,260" />
            <polygon points="800,260 800,120 820,260" />
            <polygon points="690,260 700,140 730,150 730,260" />
            <polygon points="830,260 830,150 860,140 870,260" />
          </g>
          <line x1="0" y1="259.5" x2="1440" y2="259.5" stroke="#D83232" strokeOpacity=".5" />
        </svg>
      </div>

      <div className="wrap ftr-top">
        <div>
          <Link href="/" className="flogo" aria-label="BrandSparkX home">
            <Image
              src="/brand/logo-light.webp"
              alt="BrandSparkX"
              width={190}
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
        </div>

        <div>
          <h2 className="fh">Our locations</h2>
          {site.offices.map((o) => (
            <div className="loc" key={o.city}>
              <Icon name="i-pin" />
              <address>
                <strong>{o.city}</strong>
                {o.address}
              </address>
            </div>
          ))}
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
          </div>
          <h2 className="fh fh-sub">Careers</h2>
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
            <Link href="/careers">
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
