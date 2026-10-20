"use client";

import Image from "next/image";
import { useEffect } from "react";

const STORAGE_KEY = "brandsparkx-intro-played";
const INTRO_DURATION_MS = 4800;
const REDUCED_MOTION_DURATION_MS = 450;

function finishIntro() {
  const root = document.documentElement;
  const fallbackTimer = Number(root.dataset.brandIntroFallback);
  if (fallbackTimer) window.clearTimeout(fallbackTimer);
  delete root.dataset.brandIntroFallback;
  document.body.classList.remove("brand-intro-active");
  root.removeAttribute("data-brand-intro-pending");
}

export function EntranceIntro() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.hasAttribute("data-brand-intro-pending")) return;

    try {
      if (window.sessionStorage.getItem(STORAGE_KEY)) {
        finishIntro();
        return;
      }
    } catch {
      finishIntro();
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let finishTimer: number | undefined;
    const startTimer = window.setTimeout(() => {
      if (!root.hasAttribute("data-brand-intro-pending")) return;
      try {
        window.sessionStorage.setItem(STORAGE_KEY, "true");
      } catch {
        finishIntro();
        return;
      }
      document.body.classList.add("brand-intro-active");
      finishTimer = window.setTimeout(
        finishIntro,
        reducedMotion ? REDUCED_MOTION_DURATION_MS : INTRO_DURATION_MS,
      );
    }, 0);

    return () => {
      window.clearTimeout(startTimer);
      if (finishTimer !== undefined) {
        window.clearTimeout(finishTimer);
        finishIntro();
      }
    };
  }, []);

  return (
    <div className="brand-intro" aria-hidden="true">
      <div className="brand-intro__mark">
        <span className="brand-intro__wordmark">
          <Image
            src="/brand/intro-wordmark.png"
            alt=""
            width={406}
            height={51}
            priority
            unoptimized
            sizes="(max-width: 558px) 72vw, 406px"
            onError={finishIntro}
          />
        </span>
        <span className="brand-intro__x">
          <Image
            src="/brand/intro-x.png"
            alt=""
            width={152}
            height={127}
            priority
            unoptimized
            sizes="(max-width: 558px) 12vw, 68px"
            onError={finishIntro}
          />
        </span>
      </div>
    </div>
  );
}
