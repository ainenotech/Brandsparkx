import type { ReactNode } from "react";
import { FinalCtaField } from "@/components/FinalCtaField";

type FinalCtaProps = {
  title: string;
  text?: string;
  /** Small label above the title. */
  eyebrow?: string;
  /** Buttons/links shown on the right. */
  children: ReactNode;
  /** Smaller top padding, used when the CTA follows content without its own section padding. */
  compactTop?: boolean;
};

/**
 * Dark call-to-action band used at the bottom of most pages, set over an interactive
 * three.js signal field (see FinalCtaField).
 */
export function FinalCta({
  title,
  text,
  eyebrow = "Your next step",
  children,
  compactTop,
}: FinalCtaProps) {
  return (
    <div className="fcta" style={compactTop ? { paddingTop: "clamp(60px,8vw,100px)" } : undefined}>
      <div className="wrap">
        <div className="fcta-box rv">
          <FinalCtaField />
          <div className="fcta-copy">
            <span className="fcta-eyebrow">
              <i aria-hidden="true" />
              {eyebrow}
            </span>
            <h2>{title}</h2>
            {text && <p>{text}</p>}
          </div>
          <div className="acts">{children}</div>
          <span className="fcta-hint" aria-hidden="true">
            <span className="fcta-hint__fine">Move across the field · click to send a pulse</span>
            <span className="fcta-hint__touch">Tap the field to send a pulse</span>
          </span>
        </div>
      </div>
    </div>
  );
}
