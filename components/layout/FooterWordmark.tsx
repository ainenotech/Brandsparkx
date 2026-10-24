"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type PointerEvent,
} from "react";
import { wordmarkLetters } from "@/content/wordmark";

// Screen gutter the cloud keeps, and how close its puffs may get to the cloud's ends.
const GUTTER = 16;
const TAIL_INSET = 40;

// Cloud outline in a 380×130 box (bumpy top and sides, soft flat base). It stretches to the
// cloud's size, and is also the clip for the frosted layer.
const CLOUD =
  "M40 122C14 122 4 102 14 86C2 72 12 50 34 52C36 30 62 20 84 30C98 6 140 0 162 20" +
  "C182-2 230 0 244 24C262 8 302 12 308 38C336 32 362 50 356 72C378 82 376 116 346 122" +
  "C280 127 100 127 40 122Z";

type Pos ={ left: number; tail: number; glide: boolean };

// The footer BRANDSPARKX wordmark. Hovering (mouse), tapping (touch) or focusing (keyboard) a
// letter lifts it and floats a glass cloud with its message above it. The cloud is clamped
// inside the screen (so it never runs off on B or X) while its tail keeps pointing at the letter.
export function FooterWordmark() {
  const [active, setActive] = useState<number | null>(null);
  // Last letter shown, so the cloud keeps its text while it fades out.
  const [shown, setShown] = useState(0);
  const [pos, setPos] = useState<Pos>({ left: 0, tail: 0, glide: false });
  const ref = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const show = (i: number) => {
    const mark = ref.current?.getBoundingClientRect();
    const letter = letterRefs.current[i]?.getBoundingClientRect();
    const width = tipRef.current?.offsetWidth ?? 0;
    if (mark && letter) {
      const center = letter.left + letter.width / 2;
      const maxLeft = document.documentElement.clientWidth - GUTTER - width;
      const left = Math.max(GUTTER, Math.min(center - width / 2, maxLeft));
      const tail = Math.max(TAIL_INSET, Math.min(center - left, width - TAIL_INSET));
      // Glide between letters, but appear in place when opening from closed.
      setPos({ left: left - mark.left, tail, glide: active !== null });
    }
    setActive(i);
    setShown(i);
  };

  // While a message is open, a tap outside the word, Escape or a resize clears it.
  useEffect(() => {
    if (active === null) return;
    const close = () => setActive(null);
    // Width only: phones fire resize as the address bar hides while scrolling.
    const width = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth !== width) close();
    };
    const onDown = (e: globalThis.PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [active]);

  // Touch has no hover: taps go through onClick, and leaving only counts for a mouse or pen.
  const onLeave = (e: PointerEvent) => {
    if (e.pointerType !== "touch") setActive(null);
  };
  const onBlur = (e: FocusEvent) => {
    if (!ref.current?.contains(e.relatedTarget as Node)) setActive(null);
  };

  const msg = wordmarkLetters[shown];

  return (
    <div
      className="ftr-mark"
      ref={ref}
      data-open={active !== null || undefined}
      onPointerLeave={onLeave}
      onBlur={onBlur}
    >
      {/* Each letter's aria-label already carries its message, so the cloud is visual only. */}
      <div
        className="ftr-mark__tip"
        ref={tipRef}
        aria-hidden="true"
        data-glide={pos.glide || undefined}
        style={{ left: pos.left, "--tail": `${pos.tail}px` } as CSSProperties}
      >
        {/* Frosted layer cut to the cloud shape, with its glass edge drawn on top. */}
        <div className="ftr-mark__glass" />
        <svg className="ftr-mark__edge" viewBox="0 0 380 130" preserveAspectRatio="none">
          <defs>
            <clipPath id="ftr-cloud" clipPathUnits="objectBoundingBox">
              <path d={CLOUD} transform="scale(0.0026316 0.0076923)" />
            </clipPath>
            <linearGradient id="ftr-cloud-sheen" x1="0" y1="0" x2="0.4" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity="0.09" />
              <stop offset="1" stopColor="#fff" stopOpacity="0.01" />
            </linearGradient>
          </defs>
          <path d={CLOUD} fill="url(#ftr-cloud-sheen)" />
        </svg>
        {/* A div, not a p, so the footer's grey paragraph style stays off the cloud. */}
        <div key={shown} className="ftr-mark__msg">
          <strong>{msg.title}</strong>
          <span>{msg.text}</span>
        </div>
        <i className="ftr-mark__puff" />
        <i className="ftr-mark__puff" />
      </div>
      <div className="ftr-mark__word" role="group" aria-label="What BrandSparkX does">
        {wordmarkLetters.map((l, i) => (
          <button
            key={i}
            ref={(el) => {
              letterRefs.current[i] = el;
            }}
            type="button"
            className="ftr-mark__l"
            data-index={i}
            data-active={active === i || undefined}
            // Starts with the visible letter (WCAG 2.5.3, label in name).
            aria-label={`${l.letter}: ${l.title}. ${l.text}`}
            onPointerEnter={(e) => e.pointerType !== "touch" && show(i)}
            onFocus={() => show(i)}
            onClick={() => show(i)}
          >
            {l.letter}
          </button>
        ))}
      </div>
    </div>
  );
}
