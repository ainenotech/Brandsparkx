import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { site } from "@/content/site";
import { solutionHref, solutions } from "@/content/solutions";

// AI Voice & Calling leads as the main offering; the rest follow the original site order.
const footerSolutions = [
  "ai-voice-calling",
  "business-automation",
  "ai-sales",
  "ai-growth",
  "ai-content",
  "ai-marketing",
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
        <svg viewBox="0 0 1440 340" preserveAspectRatio="xMidYMax slice">
          <defs>
            <linearGradient id="sky-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0a0a0d" stopOpacity="1" />
              <stop offset="40%" stopColor="#0a0a0d" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0a0a0d" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* ── far-back layer: subtle depth buildings ── */}
          <g className="skyline-far" fill="#0f0f14" opacity="0.55">
            <rect x="0" y="200" width="90" height="150" />
            <rect x="100" y="170" width="65" height="180" />
            <rect x="180" y="220" width="100" height="130" />
            <rect x="300" y="160" width="55" height="190" />
            <rect x="370" y="190" width="80" height="160" />
            <rect x="470" y="140" width="50" height="210" />
            <rect x="540" y="200" width="70" height="150" />
            <rect x="920" y="180" width="60" height="170" />
            <rect x="1000" y="150" width="70" height="200" />
            <rect x="1090" y="200" width="90" height="150" />
            <rect x="1200" y="170" width="55" height="180" />
            <rect x="1270" y="190" width="80" height="160" />
            <rect x="1360" y="210" width="80" height="140" />
          </g>

          {/* ── mid layer: main city buildings ── */}
          <g className="skyline-bg" fill="#16161C">
            {/* left cluster */}
            <rect x="20" y="190" width="50" height="160" />
            <rect x="78" y="150" width="42" height="200" />
            <rect x="128" y="180" width="60" height="170" />
            {/* stepped tower */}
            <polygon points="200,350 200,130 210,125 220,120 230,125 240,130 240,350" />
            <rect x="205" y="140" width="30" height="210" />
            <rect x="260" y="100" width="38" height="250" />
            {/* triangular roof */}
            <polygon points="310,350 310,155 340,130 370,155 370,350" />
            {/* wide commercial */}
            <rect x="385" y="170" width="75" height="180" />
            <rect x="468" y="120" width="40" height="230" />
            {/* twin slim towers */}
            <rect x="520" y="90" width="30" height="260" />
            <rect x="558" y="105" width="30" height="245" />
            {/* bridge connector */}
            <rect x="550" y="150" width="8" height="12" />
            {/* mid-left block */}
            <rect x="600" y="140" width="55" height="210" />
            <rect x="662" y="165" width="40" height="185" />
            
            {/* right cluster */}
            <rect x="870" y="155" width="50" height="195" />
            <rect x="928" y="120" width="44" height="230" />
            <polygon points="985,350 985,100 1010,80 1035,100 1035,350" />
            <rect x="1050" y="140" width="60" height="210" />
            {/* sail-shaped tower */}
            <polygon points="1120,350 1120,85 1160,60 1168,350" />
            <rect x="1180" y="130" width="45" height="220" />
            <rect x="1235" y="170" width="55" height="180" />
            {/* stepped right */}
            <rect x="1300" y="110" width="35" height="240" />
            <rect x="1342" y="155" width="50" height="195" />
            <rect x="1398" y="185" width="42" height="165" />
          </g>

          {/* ── window detail lines on mid buildings ── */}
          <g className="skyline-windows" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" fill="none">
            {/* windows on left tall tower at x=260 */}
            {[110, 125, 140, 155, 170, 185, 200, 215, 230, 245, 260, 275, 290, 305, 320].map(y => (
              <line key={`w260-${y}`} x1="265" y1={y} x2="293" y2={y} />
            ))}
            {/* windows on twin tower at x=520 */}
            {[100, 115, 130, 145, 160, 175, 190, 205, 220, 235, 250, 265, 280, 295, 310, 325].map(y => (
              <line key={`w520-${y}`} x1="524" y1={y} x2="546" y2={y} />
            ))}
            {/* windows on right cluster at x=928 */}
            {[130, 145, 160, 175, 190, 205, 220, 235, 250, 265, 280, 295, 310, 325].map(y => (
              <line key={`w928-${y}`} x1="932" y1={y} x2="968" y2={y} />
            ))}
            {/* windows on tall right tower x=1300 */}
            {[120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330].map(y => (
              <line key={`w1300-${y}`} x1="1304" y1={y} x2="1331" y2={y} />
            ))}
          </g>

          {/* ── foreground: Burj Khalifa + iconic towers ── */}
          <g className="skyline-fg" fill="#1E1E25">
            {/* Burj Khalifa — detailed multi-setback spire */}
            <polygon points="762,350 768,60 772,30 776,12 780,0 784,12 788,30 792,60 798,350" />
            {/* setback tiers */}
            <polygon points="752,350 762,150 762,350" />
            <polygon points="798,350 798,150 808,350" />
            <polygon points="745,350 755,200 755,350" />
            <polygon points="805,350 805,200 815,350" />
            {/* observation deck accent */}
            <rect x="770" y="80" width="20" height="4" rx="1" />
            <rect x="773" y="56" width="14" height="3" rx="1" />

            {/* Emirates Towers style — left of Burj */}
            <polygon points="685,350 690,100 705,90 720,100 725,350" />
            <rect x="693" y="95" width="10" height="3" />
            {/* antenna */}
            <line x1="705" y1="90" x2="705" y2="72" className="skyline-antenna" />

            {/* Address tower — right of Burj */}
            <polygon points="835,350 840,120 855,105 870,120 875,350" />
            <rect x="843" y="110" width="10" height="3" />
            {/* antenna */}
            <line x1="855" y1="105" x2="855" y2="88" className="skyline-antenna" />

            {/* Cayan / Twisted tower shape */}
            <polygon points="650,350 655,135 670,130 672,350" />

            {/* Index tower */}
            <polygon points="730,350 733,160 745,155 748,350" />
          </g>

          {/* ── tiny lit windows on Burj Khalifa ── */}
          <g fill="rgba(255,255,255,0.12)">
            {[90, 110, 130, 150, 170, 190, 210, 230, 250, 270, 290, 310, 330].map(y => (
              <g key={`bk-${y}`}>
                <rect x="776" y={y} width="2" height="1.5" rx="0.5" />
                <rect x="782" y={y} width="2" height="1.5" rx="0.5" />
              </g>
            ))}
          </g>

          {/* ── ground line ── */}
          <line x1="0" y1="349.5" x2="1440" y2="349.5" stroke="#D83232" strokeOpacity=".4" strokeWidth="1" />

          {/* ── top fade overlay ── */}
          <rect x="0" y="0" width="1440" height="160" fill="url(#sky-fade)" />
        </svg>
      </div>

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

        <div className="ftr-locs">
          <h2 className="fh">Our locations</h2>
          <div className="ftr-locs__grid">
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
