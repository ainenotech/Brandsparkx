import Link from "next/link";
import { Icon } from "@/components/Icon";

export const metadata = { title: "Page not found | BrandSparkX" };

export default function NotFound() {
  return (
    <div className="page on">
      <div className="phero">
        <div className="wrap">
          <div className="crumb">404</div>
          <h1>This page doesn&apos;t exist.</h1>
          <p className="lede">
            The link may be old or mistyped. Go back home or tell us what you need.
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
    </div>
  );
}
