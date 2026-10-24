import type { CSSProperties } from "react";
import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";
import { HeroBackdrop } from "@/components/home/HeroBackdrop";
import { HeroRibbon } from "@/components/home/HeroRibbon";
import { HeroWalkthrough } from "@/components/home/HeroWalkthrough";
import { site } from "@/content/site";
import "./hero.css";

const services: { href: string; icon: IconName; label: string }[] = [
  { href: "/ai-voice-calling", icon: "i-voice", label: "AI voice agents" },
  { href: "/solutions/business-automation", icon: "i-auto", label: "Business automation" },
  { href: "/ai-engineers", icon: "i-eng", label: "AI engineers" },
];

const stats = [
  { n: 7, unit: "", label: "AI capabilities", note: "One connected growth system" },
  { n: 7, unit: "days", label: "To prove it", note: "Start with one problem" },
  { n: 2, unit: "hubs", label: "Dubai & Bengaluru", note: "Serving businesses globally" },
] as const;

/** Odometer digits that roll from 0 up to n. */
function Roll({ n, delay }: { n: number; delay: number }) {
  return (
    <span className="hx-roll" aria-hidden="true">
      <span style={{ "--n": n, "--d": `${delay}s` } as CSSProperties}>
        {Array.from({ length: n + 1 }, (_, i) => (
          <span key={i}>{i}</span>
        ))}
      </span>
    </span>
  );
}

function Spark({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0z" />
    </svg>
  );
}

const delay = (d: string) => ({ "--d": d }) as CSSProperties;

export function Hero() {
  return (
    <section className="hero hx">
      <HeroBackdrop />
      <div className="wrap hero-grid">
        <div className="hx-copy">
          <Link href="/ai-voice-calling" className="hx-pill hx-in" style={delay(".05s")}>
            <span className="hx-pill-new">
              <i />
              New
            </span>
            <span className="hx-pill-txt">AI voice agents that answer, qualify and book, 24/7</span>
            <span className="hx-pill-go">
              <Icon name="i-arrow" />
            </span>
          </Link>

          <h1>
            <span className="hx-ln">
              <span>
                Build<i className="hx-dot">.</i>
              </span>
            </span>{" "}
            <span className="hx-ln">
              <span>
                Automate<i className="hx-dot">.</i>
              </span>
            </span>{" "}
            <span className="hx-ln hx-ln-red">
              <span>
                Grow with{" "}
                <em className="hx-ai">
                  AI.
                  <svg className="hx-swoosh" viewBox="0 0 140 20" aria-hidden="true">
                    <path pathLength={1} d="M3 14C38 5 92 3 137 9" />
                  </svg>
                  <Spark className="hx-spark" />
                </em>
              </span>
            </span>
          </h1>

          <p className="lede hx-in" style={delay(".55s")}>
            {site.description}
          </p>

          <div className="hx-ctas hx-in" style={delay(".7s")}>
            <Link href="/solutions" className="btn btn-red hx-go">
              Explore Solutions
              <span className="hx-go-ic">
                <Icon name="i-arrow" />
              </span>
            </Link>
            <Link href="/contact" className="btn btn-ghost hx-talk">
              Talk to Us
            </Link>
          </div>

          <nav className="hx-svc hx-in" style={delay(".82s")} aria-label="Popular solutions">
            {services.map((s) => (
              <Link key={s.href} href={s.href}>
                <span>
                  <Icon name={s.icon} />
                </span>
                {s.label}
              </Link>
            ))}
          </nav>

          <div className="hx-stats hx-in" style={delay(".95s")}>
            {stats.map((s, i) => (
              <div className="hx-stat" key={s.label}>
                <b>
                  <span className="hx-sr">{s.n}</span>
                  <Roll n={s.n} delay={1.1 + i * 0.15} />
                  {s.unit && <em>{s.unit}</em>}
                </b>
                <span>{s.label}</span>
                <small>{s.note}</small>
              </div>
            ))}
          </div>
        </div>
        <HeroWalkthrough />
      </div>
      <HeroRibbon />
    </section>
  );
}
