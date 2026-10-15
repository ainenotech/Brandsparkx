/**
 * Inline SVG icon sprite, rendered once in the root layout.
 * Icons are referenced with <Icon name="..." /> (components/Icon.tsx).
 */
export function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <symbol id="i-pause" viewBox="0 0 24 24">
          <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
          <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
        </symbol>
        <symbol id="i-play" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" fill="currentColor" />
        </symbol>
        <symbol id="i-cloud" viewBox="0 0 24 24">
          <path
            d="M7 18a4 4 0 01-.5-8 6 6 0 0111.5 1.5A3.5 3.5 0 0117.5 18z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </symbol>
        <symbol id="i-db" viewBox="0 0 24 24">
          <ellipse
            cx="12"
            cy="6"
            rx="7"
            ry="3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </symbol>
        <symbol id="i-users" viewBox="0 0 24 24">
          <circle cx="9" cy="8" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 4.5a3.5 3.5 0 010 7M18 14c2 .8 3 2.8 3 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </symbol>
        <symbol id="i-arrow" viewBox="0 0 24 24">
          <path
            d="M5 12h14M13 6l6 6-6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </symbol>
        <symbol id="i-up" viewBox="0 0 24 24">
          <path
            d="M12 19V5M6 11l6-6 6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </symbol>
        <symbol id="i-left" viewBox="0 0 24 24">
          <path
            d="M19 12H5M11 6l-6 6 6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </symbol>
        <symbol id="i-check" viewBox="0 0 24 24">
          <path
            d="M5 12.5l4.5 4.5L19 7.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </symbol>
        <symbol id="i-info" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M12 11v6M12 7.5v.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </symbol>
        <symbol id="i-growth" viewBox="0 0 24 24">
          <path
            d="M3 17l6-6 4 4 8-8M15 7h6v6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </symbol>
        <symbol id="i-content" viewBox="0 0 24 24">
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path d="M10 9.5v5l4.5-2.5z" fill="currentColor" />
        </symbol>
        <symbol id="i-mkt" viewBox="0 0 24 24">
          <path
            d="M4 10v4h3l6 4V6L7 10zM17 9a4 4 0 010 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </symbol>
        <symbol id="i-sales" viewBox="0 0 24 24">
          <path
            d="M4 6h16l-6 7v5l-4 2v-7z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </symbol>
        <symbol id="i-auto" viewBox="0 0 24 24">
          <circle cx="6" cy="6" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="18" cy="18" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="18" cy="6" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M8.5 6h7M18 8.5v7M7.8 7.8l8.4 8.4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </symbol>
        <symbol id="i-eng" viewBox="0 0 24 24">
          <path
            d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </symbol>
        <symbol id="i-voice" viewBox="0 0 24 24">
          <path
            d="M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </symbol>
        <symbol id="i-pin" viewBox="0 0 24 24">
          <path
            d="M12 21s7-6.2 7-11.5A7 7 0 005 9.5C5 14.8 12 21 12 21z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <circle cx="12" cy="9.5" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </symbol>
        <symbol id="i-phone" viewBox="0 0 24 24">
          <path
            d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </symbol>
        <symbol id="i-mail" viewBox="0 0 24 24">
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </symbol>
        <symbol id="i-wa" viewBox="0 0 24 24">
          <path
            d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-3.9-1z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-1.8-1.8l.8-1-1-2z"
            fill="currentColor"
          />
        </symbol>
        <symbol id="i-in" viewBox="0 0 24 24">
          <path
            d="M6 9v10M6 5v.5M10 19v-6a3 3 0 016 0v6M10 9v10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </symbol>
        <symbol id="i-ig" viewBox="0 0 24 24">
          <rect
            x="4"
            y="4"
            width="16"
            height="16"
            rx="5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="17" cy="7" r="1" fill="currentColor" />
        </symbol>
        <symbol id="i-chat" viewBox="0 0 24 24">
          <path
            d="M4 5h16v11H9l-5 4z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M12 8l.9 2.1L15 11l-2.1.9L12 14l-.9-2.1L9 11l2.1-.9z" fill="currentColor" />
        </symbol>
        <symbol id="i-x" viewBox="0 0 24 24">
          <path
            d="M6 6l12 12M18 6L6 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </symbol>
        <symbol id="i-min" viewBox="0 0 24 24">
          <path
            d="M6 12h12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </symbol>
        <symbol id="i-send" viewBox="0 0 24 24">
          <path
            d="M5 12h13M12 5l7 7-7 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </symbol>
        <symbol id="i-spark" viewBox="0 0 24 24">
          <path d="M12 3l2 6.5L20.5 12 14 14.5 12 21l-2-6.5L3.5 12 10 9.5z" fill="currentColor" />
        </symbol>
        {/* stage icons */}
        <symbol id="s-attract" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="3.5" fill="currentColor" />
        </symbol>
        <symbol id="s-engage" viewBox="0 0 24 24">
          <path
            d="M4 6h12v8H8l-4 3z M10 17h6l4 3v-9h-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </symbol>
        <symbol id="s-capture" viewBox="0 0 24 24">
          <path
            d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4M9 12h6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </symbol>
        <symbol id="s-nurture" viewBox="0 0 24 24">
          <path
            d="M12 20V10M12 10c0-4 3-6 7-6 0 4-3 6-7 6zM12 13c0-3-2-5-6-5 0 3 2 5 6 5z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </symbol>
        <symbol id="s-convert" viewBox="0 0 24 24">
          <path
            d="M5 12.5l4.5 4.5L19 7.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </symbol>
        <symbol id="s-retain" viewBox="0 0 24 24">
          <path
            d="M20 12a8 8 0 11-2.3-5.6M20 4v4h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </symbol>
        <linearGradient id="gA" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E84646" />
          <stop offset=".55" stopColor="#D83232" />
          <stop offset="1" stopColor="#B8242E" />
        </linearGradient>
        <linearGradient id="gB" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8E1A24" />
          <stop offset=".6" stopColor="#A8202B" />
          <stop offset="1" stopColor="#C02A30" />
        </linearGradient>
        <linearGradient id="gSheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".35" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
