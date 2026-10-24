"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Wraps the footer skyline and flags when it is on screen, so its CSS animations only run while visible. */
export function SkylineInView({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      el?.setAttribute("data-inview", "");
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      el.toggleAttribute("data-inview", entry.isIntersecting);
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="skyline" aria-hidden="true">
      {children}
    </div>
  );
}
