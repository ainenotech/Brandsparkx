"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";

type Category = {
  title: string;
  roles: string;
  tags: string;
};

const mark = "BrandSparkX";

function fillPosition(title: string) {
  const field = document.getElementById("c-position");
  if (!(field instanceof HTMLInputElement)) return;
  field.value = title;
  field.dispatchEvent(new Event("input", { bubbles: true }));
}

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
  note,
  categories,
}: {
  title: string;
  note: string;
  categories: readonly Category[];
}) {
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();
  const visible = categories.filter((category) => {
    if (!needle) return true;
    return `${category.title} ${category.roles} ${category.tags}`.toLowerCase().includes(needle);
  });

  return (
    <section id="opportunities">
      <div className="wrap">
        <div className="job-board-head">
          <h2>
            <BoardTitle title={title} />
          </h2>
          <p className="lede">{note}</p>
        </div>

        <div className="job-board-bar">
          <label className="job-board-search">
            <svg viewBox="0 0 24 24" aria-hidden="true" width="16" height="16">
              <circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path
                d="M16 16l4 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <span className="job-board-search-label">Search by role</span>
            <input
              type="search"
              value={query}
              placeholder="Search by role"
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <p className="job-board-count">
            <span>Active</span> {visible.length} {visible.length === 1 ? "team" : "teams"}
          </p>
        </div>

        {visible.length === 0 ? (
          <p className="job-board-empty">No teams match that search.</p>
        ) : (
          <div className="job-board">
            {visible.map((category) => (
              <article key={category.title}>
                <div className="job-board-meta">
                  <span>{category.tags}</span>
                  <span>Dubai · Bengaluru</span>
                </div>
                <h3>{category.title}</h3>
                <p>{category.roles}</p>
                <ul>
                  {category.tags.split(" · ").map((chip) => (
                    <li key={chip}>{chip}</li>
                  ))}
                </ul>
                <a
                  href="#apply"
                  className="btn btn-red"
                  aria-label={`Apply for ${category.title}`}
                  onClick={() => fillPosition(category.title)}
                >
                  Apply <Icon name="i-arrow" />
                </a>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
