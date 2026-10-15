/** Generated cover artwork for case studies (three variants), ported from the original site. */
export function CaseArt({ variant }: { variant: 1 | 2 | 3 }) {
  return (
    <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="800" height="450" fill="#101014" />
      <g stroke="#ffffff" strokeOpacity=".05">
        {Array.from({ length: 21 }, (_, i) => (
          <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="450" />
        ))}
        {Array.from({ length: 12 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 40} x2="800" y2={i * 40} />
        ))}
      </g>
      <circle cx="680" cy="90" r="160" fill="#D83232" opacity=".08" />
      {variant === 1 && <Waveform />}
      {variant === 2 && <Pipeline />}
      {variant === 3 && <Grid />}
    </svg>
  );
}

function Waveform() {
  return (
    <g stroke="#D83232" strokeWidth="3" strokeLinecap="round">
      {Array.from({ length: 28 }, (_, i) => {
        const h = 20 + Math.abs(Math.sin(i * 0.7)) * 90;
        return (
          <line
            key={i}
            x1={120 + i * 20}
            y1={225 - h / 2}
            x2={120 + i * 20}
            y2={225 + h / 2}
            opacity={0.4 + (i % 3) * 0.2}
          />
        );
      })}
    </g>
  );
}

function Pipeline() {
  return (
    <g fill="none" stroke="#D83232" strokeWidth="2.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={150 + i * 140} cy="225" r="18" fill={i % 2 ? "#D83232" : undefined} />
      ))}
      <path d="M168 225h104M308 225h104M448 225h104M588 225h104" stroke="#fff" strokeOpacity=".3" />
    </g>
  );
}

function Grid() {
  return (
    <g fill="none" strokeWidth="2.5">
      {[0, 1, 2].flatMap((r) =>
        [0, 1, 2, 3].map((c) => (
          <rect
            key={`${r}-${c}`}
            x={170 + c * 130}
            y={120 + r * 75}
            width="100"
            height="48"
            rx="10"
            stroke={(r + c) % 3 ? "#ffffff40" : "#D83232"}
          />
        )),
      )}
    </g>
  );
}
