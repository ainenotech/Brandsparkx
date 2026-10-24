"use client";

import type { MouseEvent } from "react";
import { Icon, type IconName } from "@/components/Icon";

type Category = {
  title: string;
  icon: IconName;
  roles: string;
  tags: string;
};

/** Fired by a team card's Apply button; CareersForm listens, pre-fills Position and scrolls in. */
export const APPLY_EVENT = "careers:apply";

const mark = "BrandSparkX";

function BoardTitle({ title }: { title: string }) {
  const at = title.indexOf(mark);
  if (at === -1) return title;
  return (
    <>
      {title.slice(0, at)}
      <span>{mark}</span>
      {title.slice(at + mark.length)}
    </>
  );
}

export function CareerBoard({
  title,
  intro,
  categories,
}: {
  title: string;
  intro: string;
  categories: readonly Category[];
}) {
  // The link still jumps to #apply without JavaScript; with it, the form handles the scroll.
  const apply = (event: MouseEvent<HTMLAnchorElement>, team: string) => {
    event.preventDefault();
    window.dispatchEvent(new CustomEvent(APPLY_EVENT, { detail: team }));
  };

  return (
    <section id="opportunities" className="kx-sec">
      <div className="wrap">
        <div className="kx-head">
          <h2>
            <BoardTitle title={title} />
          </h2>
          <p className="lede">{intro}</p>
        </div>

        <div className="kx-teams">
          {categories.map((category) => (
            <article key={category.title} className="kx-team">
              <span className="kx-team__icon" aria-hidden="true">
                <Icon name={category.icon} />
              </span>
              <h3>{category.title}</h3>
              <p>{category.roles}</p>
              <ul aria-label="Focus areas">
                {category.tags.split(" · ").map((chip) => (
                  <li key={chip}>{chip}</li>
                ))}
              </ul>
              <div className="kx-team__foot">
                <span className="kx-team__place">
                  <Icon name="i-pin" />
                  Dubai · Bengaluru
                </span>
                <a
                  href="#apply"
                  className="btn btn-red"
                  aria-label={`Apply for ${category.title}`}
                  onClick={(event) => apply(event, category.title)}
                >
                  Apply <Icon name="i-arrow" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
