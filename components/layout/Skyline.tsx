import type { CSSProperties } from "react";
import { SkylineInView } from "@/components/layout/SkylineInView";

/*
 * Night-time skyline behind the footer. Everything is computed at module load from a fixed
 * seed, so server and client always render the same SVG. Windows are batched into a handful
 * of <path>s; only the few blinking windows are separate elements (CSS-animated, see globals.css).
 *
 * Geometry (viewBox units, ground at y=260):
 * - The core scene spans x 0–1440; filler towers extend it to −480…1920 so wide screens are
 *   covered. The SVG crops only the sides (xMidYMax slice); its height is set in CSS from the
 *   room under the office names, so the scene scales as large as that room allows.
 * - Every building except the Burj stays at or below y=115, which CSS keeps clear of the names.
 *   The Burj (centre x=700) rises above that through the gap between the 2nd and 3rd names.
 * - Buildings tagged `col` light up when that office in .ftr-locs is hovered/focused
 *   (1 Dubai = the Burj, 2 Bengaluru, 3 United States, 4 Gandhinagar). Columns map to roughly
 *   Dubai 271–447, Bengaluru 504–699, US 737–935, Gandhinagar 991–1170 at desktop widths.
 */

type Body = { x: number; y: number; w: number; h: number; lit?: number };
type Building = {
  rect?: Body;
  points?: string;
  bodies: Body[];
  col?: number;
  /** Hidden on small screens to keep mobile light. */
  opt?: boolean;
};

const box = (x: number, y: number, w: number, h = 260 - y): Body => ({ x, y, w, h });
const tower = (x: number, y: number, w: number, extra: Partial<Building> = {}): Building => {
  const b = box(x, y, w);
  return { rect: b, bodies: [b], ...extra };
};

// mulberry32: tiny deterministic PRNG
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Burj-style centrepiece: staggered setbacks tapering to a long spire (tip at y=40).
const BURJ_X = 700;
const burjPoints = [
  "666,260 666,200 673,200 673,164 679,164 679,132 685,132 685,104 690,104 690,86 694,86 694,74",
  "698.6,74 699.3,52 700,40 700.7,52 701.4,74",
  "706,74 706,80 710,80 710,98 715,98 715,124 721,124 721,156 727,156 727,190 734,190 734,260",
].join(" ");
const burj: Building = {
  points: burjPoints,
  // Lower and middle tiers carry windows, fewer lit the higher they go.
  bodies: [
    { ...box(666, 202, 68), lit: 0.16 },
    { ...box(673, 166, 54, 34), lit: 0.2 },
    { ...box(679, 134, 42, 30), lit: 0.12 },
  ],
  col: 1,
};
// Facade fins on the Burj body.
const burjFins = "M676 260V164M688 260V104M700 260V80M712 260V98M724 260V156";

// Modern twin towers with chamfered crowns (GIFT City).
const twin = (x: number): Building => ({
  points: `${x},260 ${x},123 ${x + 5},115 ${x + 31},115 ${x + 36},123 ${x + 36},260`,
  bodies: [box(x, 127, 36)],
  col: 4,
});

// Plain towers filling the wide-screen margins (no column, no landmarks).
function fillerTowers(from: number, to: number, seed: number) {
  const rand = seeded(seed);
  const out: Building[] = [];
  for (let x = from; ;) {
    const w = 40 + Math.round(rand() * 40);
    if (x + w > to) break;
    out.push(tower(x, 118 + Math.round(rand() * 64), w, { opt: true }));
    x += w + 8 + Math.round(rand() * 14);
  }
  return out;
}

const front: Building[] = [
  ...fillerTowers(-472, 20, 1201),
  tower(30, 150, 56, { opt: true }),
  tower(96, 122, 44),
  tower(150, 168, 64, { opt: true }),
  tower(222, 128, 46),
  tower(280, 160, 46, { opt: true }),
  tower(334, 118, 52),
  tower(394, 140, 48, { opt: true }),
  tower(450, 176, 46, { opt: true }),
  tower(506, 117, 46, { col: 2 }),
  tower(560, 140, 62, { col: 2 }),
  tower(628, 125, 34, { col: 2 }),
  tower(742, 150, 40, { col: 3 }),
  tower(790, 120, 54, { col: 3 }),
  { points: "852,260 852,134 890,116 890,260", bodies: [box(852, 138, 38)], col: 3 },
  tower(900, 156, 50, { opt: true }),
  tower(950, 172, 40, { opt: true }),
  twin(1036),
  twin(1088),
  tower(1136, 152, 50, { opt: true }),
  tower(1196, 170, 70),
  tower(1280, 118, 44),
  tower(1334, 150, 80, { opt: true }),
  ...fillerTowers(1424, 1916, 1202),
  burj,
];

// Back layer: shorter, darker blocks behind the front row, no windows.
function buildBack() {
  const rand = seeded(7331);
  const out: Body[] = [];
  for (let x = -490; x < 1920;) {
    const w = 26 + Math.round(rand() * 30);
    out.push(box(x, 150 + Math.round(rand() * 64), w));
    x += w + 4 + Math.round(rand() * 22);
  }
  return out;
}

// Area behind the BRANDSPARKX outline: windows there are rarely lit.
const behindWordmark = (x: number, y: number) => x > 280 && x < 1170 && y > 145;

type Blinker = {
  x: number;
  y: number;
  w: number;
  h: number;
  red: boolean;
  sparse: boolean;
  style: CSSProperties;
};

function buildWindows() {
  const rand = seeded(20260517);
  // "sparse" paths hold odd rows and optional buildings, hidden on small screens.
  // hover[col] holds windows that only light up while that office is hovered.
  const d = {
    dark: "",
    darkSparse: "",
    warm: "",
    warmSparse: "",
    red: "",
    redSparse: "",
    glow: "",
  };
  const hover: Record<number, string> = { 1: "", 2: "", 3: "", 4: "" };
  const blinkers: Blinker[] = [];

  for (const { bodies, col, opt } of front) {
    for (const body of bodies) {
      // Window size and spacing scale with building width.
      const ww = Math.max(3, Math.min(6, Math.round(body.w * 0.085)));
      const wh = Math.round(ww * 1.5);
      const gapX = Math.round(ww * 1.1);
      const gapY = Math.round(ww * 1.3);
      const margin = Math.max(5, Math.round(body.w * 0.12));
      const cols = Math.floor((body.w - 2 * margin + gapX) / (ww + gapX));
      const rows = Math.floor((body.h - margin - 6 + gapY) / (wh + gapY));
      const x0 = body.x + (body.w - (cols * ww + (cols - 1) * gapX)) / 2;
      const y0 = body.y + margin;

      for (let r = 0; r < rows; r++) {
        const sparse = !!opt || r % 2 === 1;
        for (let c = 0; c < cols; c++) {
          const x = +(x0 + c * (ww + gapX)).toFixed(1);
          const y = y0 + r * (wh + gapY);
          const seg = `M${x} ${y}h${ww}v${wh}h-${ww}z`;
          const shy = behindWordmark(x, y);
          if (rand() >= (body.lit ?? (shy ? 0.1 : 0.24))) {
            d[sparse ? "darkSparse" : "dark"] += seg;
            if (col && rand() < 0.45) hover[col] += seg;
            continue;
          }
          const red = rand() < 0.14;
          if (!shy && rand() < 0.1) {
            blinkers.push({
              x,
              y,
              w: ww,
              h: wh,
              red,
              sparse,
              style: {
                "--sk-dur": `${(3 + rand() * 5).toFixed(1)}s`,
                "--sk-delay": `-${(rand() * 8).toFixed(1)}s`,
              } as CSSProperties,
            });
            continue;
          }
          const key = red ? "red" : "warm";
          d[sparse ? (`${key}Sparse` as const) : key] += seg;
          if (!shy && !red && !sparse && rand() < 0.12) d.glow += seg;
        }
      }
    }
  }
  return { d, hover, blinkers };
}

const back = buildBack();
const { d, hover, blinkers } = buildWindows();

// Faint stars in the empty sky at the far edges, clear of the footer text.
const stars = (() => {
  const rand = seeded(424242);
  return Array.from({ length: 16 }, (_, i) => ({
    cx: +(i % 2 ? 1300 + rand() * 610 : -470 + rand() * 610).toFixed(1),
    cy: +(38 + rand() * 62).toFixed(1),
    r: +(0.6 + rand() * 0.5).toFixed(2),
    o: +(0.2 + rand() * 0.25).toFixed(2),
    twinkle: i % 6 === 1,
    delay: `-${(rand() * 6).toFixed(1)}s`,
  }));
})();

// Rooftop lights per office column; `beacon` ones pulse like aviation lights.
const roofLights = [
  { col: 1, cx: BURJ_X, cy: 41, beacon: true },
  { col: 2, cx: 529, cy: 106, beacon: true },
  { col: 3, cx: 817, cy: 111, beacon: false },
  { col: 4, cx: 1054, cy: 113, beacon: false },
  { col: 4, cx: 1106, cy: 113, beacon: false },
];

// Car lights drifting along the road line (wide screens only, see globals.css).
const cars = [
  { y: 256.6, w: 16, color: "#FFD27A", dur: "26s", delay: "-4s", reverse: false },
  { y: 257.6, w: 12, color: "#E11D2E", dur: "34s", delay: "-19s", reverse: true },
  { y: 256.6, w: 14, color: "#FFD27A", dur: "41s", delay: "-30s", reverse: false },
];

const waterTank = (x: number, roof: number) => (
  <g key={`tank-${x}`}>
    <rect x={x} y={roof - 11} width="14" height="8" rx="1.5" />
    <path d={`M${x + 2} ${roof - 3}v3M${x + 12} ${roof - 3}v3`} fill="none" />
  </g>
);

export function Skyline() {
  return (
    <SkylineInView>
      {/* Top edge at y=28 leaves room above the Burj tip (y=40); CSS fades the top edge. */}
      <svg viewBox="-480 28 2400 232" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="sk-horizon" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#E11D2E" stopOpacity="0" />
            <stop offset="1" stopColor="#E11D2E" stopOpacity=".16" />
          </linearGradient>
          {/* Dim windows across the content column (office names) and more so behind the
              BRANDSPARKX outline. */}
          <linearGradient
            id="sk-dim-grad"
            gradientUnits="userSpaceOnUse"
            x1="-480"
            x2="1920"
            y1="0"
            y2="0"
          >
            <stop offset=".2625" stopColor="#fff" />
            <stop offset=".304" stopColor="#fff" stopOpacity=".55" />
            <stop offset=".696" stopColor="#fff" stopOpacity=".55" />
            <stop offset=".7375" stopColor="#fff" />
          </linearGradient>
          <filter id="sk-soft" x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
          <mask id="sk-dim" maskUnits="userSpaceOnUse" x="-480" y="0" width="2400" height="260">
            <rect x="-480" width="2400" height="260" fill="url(#sk-dim-grad)" />
            <rect
              x="290"
              y="150"
              width="870"
              height="130"
              fill="#000"
              fillOpacity=".5"
              filter="url(#sk-soft)"
            />
          </mask>
          {/* Hover lights are user-triggered and short-lived: text-column dimming only. */}
          <mask
            id="sk-dim-text"
            maskUnits="userSpaceOnUse"
            x="-480"
            y="0"
            width="2400"
            height="260"
          >
            <rect x="-480" width="2400" height="260" fill="url(#sk-dim-grad)" />
          </mask>
          <filter id="sk-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="1.6" />
          </filter>
          <filter id="sk-roof-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <clipPath id="sk-burj-clip">
            <polygon points={burjPoints} />
          </clipPath>
          <linearGradient id="sk-sweep-grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#FFD27A" stopOpacity="0" />
            <stop offset=".5" stopColor="#FFD27A" stopOpacity=".22" />
            <stop offset="1" stopColor="#FFD27A" stopOpacity="0" />
          </linearGradient>
          {cars.map((c, i) => (
            <linearGradient
              key={i}
              id={`sk-car-${i}`}
              x1={c.reverse ? 1 : 0}
              x2={c.reverse ? 0 : 1}
              y1="0"
              y2="0"
            >
              <stop offset="0" stopColor={c.color} stopOpacity="0" />
              <stop offset="1" stopColor={c.color} />
            </linearGradient>
          ))}
        </defs>

        <rect x="-480" y="170" width="2400" height="90" fill="url(#sk-horizon)" />

        {stars.map((s, i) => (
          <circle
            key={i}
            className={s.twinkle ? "sk-twinkle" : undefined}
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            fill="#FFFFFF"
            fillOpacity={s.o}
            style={s.twinkle ? { animationDelay: s.delay } : undefined}
          />
        ))}

        <g
          className="sk-back"
          fill="#0F0F13"
          stroke="#C8C8D2"
          strokeOpacity=".05"
          vectorEffect="non-scaling-stroke"
        >
          {back.map((b, i) => (
            <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} />
          ))}
        </g>

        <g fill="#17171E" stroke="#C8C8D2" strokeOpacity=".14" vectorEffect="non-scaling-stroke">
          {front
            .filter((b) => b !== burj)
            .map((b, i) =>
              b.rect ? (
                <rect
                  key={i}
                  className={b.opt ? "sk-sparse" : undefined}
                  x={b.rect.x}
                  y={b.rect.y}
                  width={b.rect.w}
                  height={b.rect.h}
                />
              ) : (
                <polygon key={i} className={b.opt ? "sk-sparse" : undefined} points={b.points} />
              ),
            )}
          {/* sky bridge between the twin towers */}
          <rect x="1072" y="176" width="16" height="5" />
        </g>

        {/* rooftop details: antennas, a small spire, water tanks */}
        <g fill="#17171E" stroke="#C8C8D2" strokeOpacity=".22" vectorEffect="non-scaling-stroke">
          <path d="M118 122V114M529 117V107M1302 118V110M360 118V110" fill="none" />
          <polygon points="812,120 817,111 822,120" />
          {waterTank(175, 168)}
          {waterTank(584, 140)}
          {waterTank(1224, 170)}
        </g>

        {/* The Burj: slightly brighter fill and outline so it reads as the focal point. */}
        <g>
          <polygon
            points={burjPoints}
            fill="#1C1C24"
            stroke="#D6D6DE"
            strokeOpacity=".26"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={burjFins}
            stroke="#D6D6DE"
            strokeOpacity=".1"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
          <g clipPath="url(#sk-burj-clip)">
            <rect
              className="sk-sweep"
              x="660"
              y="236"
              width="80"
              height="48"
              fill="url(#sk-sweep-grad)"
            />
          </g>
        </g>

        <g mask="url(#sk-dim)">
          <g fill="#FFFFFF" fillOpacity=".035">
            <path d={d.dark} />
            <path className="sk-sparse" d={d.darkSparse} />
          </g>
          <path d={d.glow} fill="#FFD27A" opacity=".45" filter="url(#sk-glow)" />
          <g fill="#FFD27A" fillOpacity=".34">
            <path d={d.warm} />
            <path className="sk-sparse" d={d.warmSparse} />
          </g>
          <g fill="#E11D2E" fillOpacity=".4">
            <path d={d.red} />
            <path className="sk-sparse" d={d.redSparse} />
          </g>
          {blinkers.map((b, i) => (
            <rect
              key={i}
              className={b.sparse ? "sk-blink sk-sparse" : "sk-blink"}
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.h}
              fill={b.red ? "#E11D2E" : "#FFD27A"}
              fillOpacity={b.red ? 0.4 : 0.34}
              style={b.style}
            />
          ))}
        </g>
        <g mask="url(#sk-dim-text)">
          {[1, 2, 3, 4].map((col) => (
            <path
              key={col}
              className={`sk-hover sk-c${col}`}
              d={hover[col]}
              fill="#FFD27A"
              fillOpacity=".4"
            />
          ))}
        </g>

        {/* soft brand-red roof accents on the edge buildings, echoing the red baseline */}
        <g stroke="#D83232" strokeOpacity=".45" strokeWidth="1.5" vectorEffect="non-scaling-stroke">
          <line className="sk-sparse" x1="30" y1="150.5" x2="86" y2="150.5" />
          <line x1="96" y1="122.5" x2="140" y2="122.5" />
          <line x1="1280" y1="118.5" x2="1324" y2="118.5" />
          <line className="sk-sparse" x1="1334" y1="150.5" x2="1414" y2="150.5" />
        </g>

        {roofLights.map((l) => (
          <g key={l.cx} className={`sk-c${l.col}`}>
            <circle
              className="sk-roof-glow"
              cx={l.cx}
              cy={l.cy}
              r="5"
              fill="#E11D2E"
              filter="url(#sk-roof-glow)"
            />
            <circle
              className={l.beacon ? "sk-roof sk-beacon" : "sk-roof"}
              cx={l.cx}
              cy={l.cy}
              r="1.8"
              fill="#E11D2E"
              style={l.beacon ? { animationDelay: `-${(l.col * 0.6).toFixed(1)}s` } : undefined}
            />
          </g>
        ))}

        {/* road with a few drifting car lights */}
        <line
          x1="-480"
          y1="257.5"
          x2="1920"
          y2="257.5"
          stroke="#FFFFFF"
          strokeOpacity=".06"
          vectorEffect="non-scaling-stroke"
        />
        {cars.map((c, i) => (
          <rect
            key={i}
            className="sk-car"
            x="-500"
            y={c.y}
            width={c.w}
            height="1.2"
            rx=".6"
            fill={`url(#sk-car-${i})`}
            style={{
              animationDuration: c.dur,
              animationDelay: c.delay,
              animationDirection: c.reverse ? "reverse" : undefined,
            }}
          />
        ))}

        <line x1="-480" y1="259.5" x2="1920" y2="259.5" stroke="#D83232" strokeOpacity=".5" />
      </svg>
    </SkylineInView>
  );
}
