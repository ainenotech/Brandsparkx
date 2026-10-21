"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** Bottom-right back-to-top control. */
export function FloatingControls() {
  const reduce = useReducedMotion();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fab-wrap">
      <button
        type="button"
        className={showTop ? "totop show" : "totop"}
        aria-label="Back to top"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
          document.getElementById("main")?.focus({ preventScroll: true });
        }}
      >
        <Icon name="i-up" />
      </button>
    </div>
  );
}
