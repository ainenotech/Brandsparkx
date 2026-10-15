import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Icon } from "@/components/Icon";
import { site } from "@/content/site";

/** Shared layout for Privacy Policy and Terms & Conditions until the final legal text is supplied. */
export function LegalPage({ title, path }: { title: string; path: string }) {
  return (
    <div className="page on">
      <div className="phero">
        <div className="wrap">
          <Breadcrumbs items={[{ name: title, path }]} />
          <h1>{title}</h1>
        </div>
      </div>
      <section>
        <div className="wrap">
          <div className="note">
            <Icon name="i-info" />
            [Legal text to be provided] Replace this section with the reviewed {title.toLowerCase()}{" "}
            before launch.
          </div>
          <p className="lede" style={{ marginTop: 30 }}>
            Questions in the meantime? Email{" "}
            <a className="link" href={`mailto:${site.email}`}>
              {site.email}
            </a>{" "}
            or{" "}
            <Link className="link" href="/contact">
              contact the team
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
