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
    let resizeHandoff: (() => void) | undefined;
    const startTimer = window.setTimeout(() => {
      if (!root.hasAttribute("data-brand-intro-pending")) return;
      try {
        window.sessionStorage.setItem(STORAGE_KEY, "true");
      } catch {
        finishIntro();
        return;
      }
      const updateHandoff = () => {
        const mark = document.querySelector<HTMLElement>(".brand-intro__mark");
        const logo = document.querySelector<HTMLImageElement>(".hdr .logo img");
        if (!mark || !logo) return;
        const logoBounds = logo.getBoundingClientRect();
        const markWidth = mark.offsetWidth || Math.min(window.innerWidth * 0.86, 480);
        if (!logoBounds.width || !markWidth) return;
        mark.style.setProperty(
          "--brand-intro-handoff-x",
          `${logoBounds.left + logoBounds.width / 2 - window.innerWidth / 2}px`,
        );
        mark.style.setProperty(
          "--brand-intro-handoff-y",
          `${logoBounds.top + logoBounds.height / 2 - window.innerHeight / 2}px`,
        );
        mark.style.setProperty(
          "--brand-intro-handoff-scale",
          `${logoBounds.width / markWidth}`,
        );
      };
      updateHandoff();
      window.addEventListener("resize", updateHandoff);
      resizeHandoff = updateHandoff;
      document.body.classList.add("brand-intro-active");
      finishTimer = window.setTimeout(
        finishIntro,
        reducedMotion ? REDUCED_MOTION_DURATION_MS : INTRO_DURATION_MS,
      );
    }, 0);

    return () => {
      window.clearTimeout(startTimer);
      if (resizeHandoff) window.removeEventListener("resize", resizeHandoff);
      if (finishTimer !== undefined) {
        window.clearTimeout(finishTimer);
        finishIntro();
      }
    };
  }, []);

  return (
    <div className="brand-intro" aria-hidden="true">
      <span className="brand-intro__x-stinger">
        <Image
          src="/brand/intro-x.png"
          alt=""
          width={152}
          height={127}
          priority
          unoptimized
        />
      </span>
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
        <span className="brand-intro__x brand-intro__x--assembly">
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
