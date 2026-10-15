"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Scroll-reveal, as in the original site: elements with `.rv` (and parents marked
 * `data-reveal-host`) get the `.in` class the first time they scroll into view.
 * Re-scans the page after every route change.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const reveal = (threshold: number, rootMargin?: string) =>
      new IntersectionObserver(
        (entries, observer) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        },
        { threshold, rootMargin },
      );

    const items = reveal(0.15, "0px 0px -40px 0px");
    const hosts = reveal(0.25);
    const frame = requestAnimationFrame(() => {
      document.querySelectorAll(".rv:not(.in)").forEach((el) => items.observe(el));
      document.querySelectorAll("[data-reveal-host]:not(.in)").forEach((el) => hosts.observe(el));
    });

    return () => {
      cancelAnimationFrame(frame);
      items.disconnect();
      hosts.disconnect();
    };
  }, [pathname]);

  return null;
}
