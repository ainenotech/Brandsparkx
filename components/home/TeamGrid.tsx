import Image from "next/image";
import { Icon } from "@/components/Icon";
import type { TeamMember } from "@/content/team";

export function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <div className="team">
      {members.map((m, i) => (
        <article
          key={`${m.name}-${i}`}
          className={["member", m.lead && "lead", !m.published && "ph-card", "rv"]
            .filter(Boolean)
            .join(" ")}
        >
          <div className="portrait">
            {m.photo ? (
              // Photos come in mixed shapes (circular cut-outs and full shots), so all are shown as a round avatar.
              <span className="avatar">
                <Image src={m.photo} alt={m.name} fill sizes="(max-width: 560px) 70vw, 240px" />
              </span>
            ) : (
              <>
                <span className="ph">{m.published ? "Photo to be added" : "Placeholder"}</span>
                <span className="ini">{m.initials}</span>
              </>
            )}
          </div>
          <div className="role">{m.role}</div>
          <h3>{m.name}</h3>
          <p>{m.bio}</p>
          {(m.email || m.phoneHref) && (
            <div className="soc">
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
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
