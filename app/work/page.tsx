import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CaseArt } from "@/components/CaseArt";
import { FinalCta } from "@/components/FinalCta";
import { Icon } from "@/components/Icon";
import { cases } from "@/content/cases";
import { visible } from "@/lib/placeholders";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("work");

// Bar heights and delays for the decorative dashboard (sample data, as in the original).
const kpis = [
  { label: "Time saved", bars: [30, 42, 38, 58, 66, 90], start: 0 },
  { label: "Leads processed", bars: [24, 36, 52, 48, 72, 96], start: 0.1 },
  { label: "Response speed", bars: [20, 34, 46, 62, 78, 88], start: 0.2 },
];

export default function WorkPage() {
  const items = visible(cases);

  return (
    <div className="page on">
      <div className="phero">
        <div className="wrap pgrid">
          <div className="ptext">
            <Breadcrumbs items={[{ name: "Work", path: "/work" }]} />
            <h1>AI applied to real business problems.</h1>
            <p className="lede">
              Explore how AI, automation and intelligent systems can create measurable business
              impact. Each example use case follows the same shape: the challenge, then the
              solution.
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
                <span>impact.dashboard</span>
              </div>
              <div className="dash-h">
                <b>Business impact</b>
                <span className="chip-s">Sample data</span>
              </div>
              <div className="kpis">
                {kpis.map((k) => (
                  <div className="kpi" key={k.label}>
                    <small>{k.label}</small>
                    <div className="bars">
                      {k.bars.map((h, i) => (
                        <i
                          key={i}
                          style={{
                            height: `${h}%`,
                            animationDelay: `${+(k.start + i * 0.08).toFixed(2)}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="chart">
                <svg viewBox="0 0 440 150">
                  <defs>
                    <linearGradient id="areaG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#D83232" stopOpacity=".18" />
                      <stop offset="1" stopColor="#D83232" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <g className="gl">
                    <line x1="0" y1="30" x2="440" y2="30" />
                    <line x1="0" y1="75" x2="440" y2="75" />
                    <line x1="0" y1="120" x2="440" y2="120" />
                  </g>
                  <path
                    className="area"
                    d="M0 130 C60 125 90 110 140 104 S220 92 260 70 S350 40 440 18 L440 150 L0 150Z"
                  />
                  <path
                    className="lnp"
                    d="M0 130 C60 125 90 110 140 104 S220 92 260 70 S350 40 440 18"
                  />
                  <circle className="pt" cx="440" cy="18" r="5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap">
        {items.map((c) => (
          <article className="cs-full rv" key={c.title}>
            <div className="case-img" style={{ position: "relative" }}>
              <CaseArt variant={c.art} />
            </div>
            <div>
              <div className="kicker" style={{ marginBottom: 14 }}>
                {c.category}
              </div>
              <h2 style={{ fontSize: "clamp(1.7rem,3vw,2.4rem)" }}>{c.title}</h2>
              <div className="cip">
                <div>
                  <b>The challenge</b>
                  <span>{c.challenge}</span>
                </div>
                <div>
                  <b>The solution</b>
                  <span>{c.solution}</span>
                </div>
                {/* Impact appears only once a client has approved verified results. */}
                {c.impact && (
                  <div>
                    <b>The impact</b>
                    <span>{c.impact}</span>
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <FinalCta compactTop title="Your business could be the next story.">
        <Link href="/contact" className="btn btn-red">
          Start a Conversation <Icon name="i-arrow" />
        </Link>
      </FinalCta>
    </div>
  );
}
