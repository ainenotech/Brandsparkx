"use client";

import { Icon } from "@/components/Icon";

/** "Back to top" button: scrolls up and moves focus to the main content. */
export function ScrollTopButton({ className, id }: { className: string; id?: string }) {
  const toTop = () => {
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
    document.getElementById("main")?.focus({ preventScroll: true });
  };
  return (
    <button type="button" className={className} id={id} aria-label="Back to top" onClick={toTop}>
      <Icon name="i-up" />
    </button>
  );
}
