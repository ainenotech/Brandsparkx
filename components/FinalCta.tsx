import type { ReactNode } from "react";

type FinalCtaProps = {
  title: string;
  text?: string;
  /** Buttons/links shown on the right. */
  children: ReactNode;
  /** Smaller top padding, used when the CTA follows content without its own section padding. */
  compactTop?: boolean;
};

/** Dark call-to-action band used at the bottom of most pages. */
export function FinalCta({ title, text, children, compactTop }: FinalCtaProps) {
  return (
    <div className="fcta" style={compactTop ? { paddingTop: "clamp(60px,8vw,100px)" } : undefined}>
      <div className="wrap">
        <div className="fcta-box rv orange-hover-glow">
          <div className="fgrid" aria-hidden="true" />
          <div style={{ position: "relative" }}>
            <h2>{title}</h2>
            {text && <p>{text}</p>}
          </div>
          <div className="acts">{children}</div>
        </div>
      </div>
    </div>
  );
}
