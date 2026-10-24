import type { ReactNode } from "react";

/** Wraps a form control with a muted leading icon (styled by `.cf-ctl` in globals.css). */
export function IconField({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="cf-ctl">
      <span className="cf-ctl__icon" aria-hidden="true">
        {icon}
      </span>
      {children}
    </div>
  );
}
