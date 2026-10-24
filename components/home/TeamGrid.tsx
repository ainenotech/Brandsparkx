import Image from "next/image";
import { Icon } from "@/components/Icon";
import type { TeamMember } from "@/content/team";

export function TeamGrid({ members }: { members: TeamMember[] }) {
  const total = String(members.length).padStart(2, "0");

  return (
    <div className="team">
      {members.map((m, i) => (
        <article
          key={`${m.name}-${i}`}
          className={["member", m.lead && "lead", !m.published && "ph-card", "rv"]
            .filter(Boolean)
            .join(" ")}
          style={{ ["--i" as string]: i }}
        >
          <div className="member-card">
            <div className="portrait">
              <span className="member-idx" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
                <span> / {total}</span>
              </span>
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
            <div className="member-body">
              <div className="role">{m.role}</div>
              <h3>{m.name}</h3>
              <p>{m.bio}</p>
              {(m.email || m.phoneHref || m.linkedin) && (
                <div className="member-links">
                  {m.email && (
                    <a href={`mailto:${m.email}`} aria-label={`Email ${m.name}`}>
                      <Icon name="i-mail" />
                      Email
                    </a>
                  )}
                  {m.linkedin && (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${m.name} on LinkedIn`}
                    >
                      <Icon name="i-in" />
                      LinkedIn
                    </a>
                  )}
                  {m.phoneHref && (
                    <a href={m.phoneHref} aria-label={`Call ${m.name}`}>
                      <Icon name="i-phone" />
                      Call
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
