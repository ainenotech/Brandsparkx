import Image from "next/image";
import { Icon } from "@/components/Icon";
import type { TeamMember } from "@/content/team";

/** Each card gets its own torn-paper edge, so no two outlines match. */
const edgeId = (i: number) => `paper-edge-${i}`;

export function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <div className="team">
      <svg className="paper-defs" width="0" height="0" aria-hidden="true" focusable="false">
        {members.map((m, i) => (
          <filter key={`${m.name}-${i}`} id={edgeId(i)} x="-4%" y="-4%" width="108%" height="108%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.045"
              numOctaves="4"
              seed={i * 7 + 3}
              result="grain"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="grain"
              scale="9"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        ))}
      </svg>
      {members.map((m, i) => (
        <article
          key={`${m.name}-${i}`}
          className={["member", m.lead && "lead", !m.published && "ph-card", "rv"]
            .filter(Boolean)
            .join(" ")}
          style={{ ["--i" as string]: i, ["--edge" as string]: `url(#${edgeId(i)})` }}
        >
          <div className="member-card">
            <header className="member-head">
              <span className="member-tag">{m.role}</span>
              {/* The badge shows on every card; it becomes a link once a profile URL is added. */}
              {m.linkedin ? (
                <a
                  className="member-in"
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${m.name} on LinkedIn`}
                >
                  <Icon name="i-in" />
                </a>
              ) : (
                <span className="member-in" aria-hidden="true">
                  <Icon name="i-in" />
                </span>
              )}
            </header>
            <div className="portrait">
              {m.photo ? (
                // Photos come in mixed shapes (circular cut-outs and full shots), so all are shown as a round avatar.
                <span className="avatar-ring">
                  <span className="avatar">
                    <Image src={m.photo} alt={m.name} fill sizes="(max-width: 560px) 60vw, 200px" />
                  </span>
                </span>
              ) : (
                <>
                  <span className="ph">{m.published ? "Photo to be added" : "Placeholder"}</span>
                  <span className="ini">{m.initials}</span>
                </>
              )}
            </div>
            <h3>{m.name}</h3>
            <p>{m.bio}</p>
            {(m.email || m.phoneHref) && (
              <div className="member-foot">
                <span className="member-links">
                  {m.email && (
                    <a href={`mailto:${m.email}`} aria-label={`Email ${m.name}`}>
                      <Icon name="i-mail" />
                    </a>
                  )}
                  {m.phoneHref && (
                    <a href={m.phoneHref} aria-label={`Call ${m.name}`}>
                      <Icon name="i-phone" />
                    </a>
                  )}
                </span>
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
