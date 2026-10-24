import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { solutionHref, solutions } from "@/content/solutions";

export const metadata: Metadata = {
  title: { absolute: "Page Not Found | BrandSparkX" },
  robots: { index: false, follow: true },
};

const mainPages = [
  { href: "/solutions", label: "All solutions" },
  { href: "/work", label: "Example use cases" },
  { href: "/about", label: "About us" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <div className="page on">
      <div className="phero">
        <div className="wrap">
          <p className="crumb">Error 404</p>
          <h1>This page doesn&apos;t exist.</h1>
          <p className="lede">
            The link may be old or mistyped. Try one of the pages below, go back home, or tell us
            what you need.
          </p>
          <div className="hero-ctas" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/" className="btn btn-red">
              Go to home <Icon name="i-arrow" />
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Contact us
            </Link>
          </div>
        </div>
      </div>
      <section>
        <div className="wrap nf-links">
          <div>
            <h2>Solutions</h2>
            <ul>
              {solutions.map((s) => (
                <li key={s.slug}>
                  <Link className="link" href={solutionHref(s)}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Company</h2>
            <ul>
              {mainPages.map((p) => (
                <li key={p.href}>
                  <Link className="link" href={p.href}>
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
