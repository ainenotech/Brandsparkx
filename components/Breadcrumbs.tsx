import Link from "next/link";
import { Fragment } from "react";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

type Crumb = { name: string; path: string };

/** Visible breadcrumb trail plus matching BreadcrumbList structured data. "Home" is added automatically. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav className="crumb" aria-label="Breadcrumb">
        {trail.map((c, i) => (
          <Fragment key={c.path}>
            {i > 0 && "/"}
            {i < trail.length - 1 ? (
              <Link href={c.path}>{c.name}</Link>
            ) : (
              <span aria-current="page">{c.name}</span>
            )}
          </Fragment>
        ))}
      </nav>
      <JsonLd data={breadcrumbJsonLd(trail)} />
    </>
  );
}
