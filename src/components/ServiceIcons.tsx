import { useId } from "react";

/**
 * Original icons for the skills orbit (drawn in the style of the references the owner chose):
 * 0 AI/ML: gradient brain with circuit nodes · 1 Backend: offset gear with </>
 * 2 Web: stacked layers with a </> badge · 3 GenAI: chat bubble with a sparkle
 */

function Brain({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className="h-full w-full">
      <defs>
        <linearGradient id={`${id}l`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#22b8d6" />
          <stop offset="1" stopColor="#5b3fb8" />
        </linearGradient>
        <linearGradient id={`${id}r`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#6a3db5" />
          <stop offset="1" stopColor="#ef4f78" />
        </linearGradient>
        <linearGradient id={`${id}c`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2f6fd0" />
          <stop offset="1" stopColor="#8a3fb0" />
        </linearGradient>
      </defs>
      {/* left and right hemispheres */}
      <path
        d="M31 12c-3-3-9-3-11 1-4-1-8 2-8 6-4 2-5 7-2 10-2 3-1 8 3 9 0 4 4 7 8 6 1 3 5 5 10 4z"
        fill={`url(#${id}l)`}
      />
      <path
        d="M33 12c3-3 9-3 11 1 4-1 8 2 8 6 4 2 5 7 2 10 2 3 1 8-3 9 0 4-4 7-8 6-1 3-5 5-10 4z"
        fill={`url(#${id}r)`}
      />
      {/* circuit traces */}
      <g fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M26 15v6l4 4" />
        <path d="M38 15v6l-4 4" />
        <path d="M19 26h6l4 4" />
        <path d="M45 26h-6l-4 4" />
        <path d="M22 37l5-4h3" />
        <path d="M42 37l-5-4h-3" />
      </g>
      <g fill="#ffd1dc" stroke="#fff" strokeWidth="1.4">
        <circle cx="26" cy="14.5" r="2" />
        <circle cx="38" cy="14.5" r="2" />
        <circle cx="18.5" cy="26" r="2" />
        <circle cx="45.5" cy="26" r="2" />
        <circle cx="21.5" cy="37.5" r="2" />
        <circle cx="42.5" cy="37.5" r="2" />
      </g>
      {/* node chains on each side */}
      <g fill="none" stroke={`url(#${id}c)`} strokeWidth="1.8" strokeLinecap="round">
        <path d="M8 34l4 10 7 7" />
        <path d="M56 34l-4 10-7 7" />
      </g>
      <g>
        <circle cx="8" cy="33" r="3" fill="#22b8d6" />
        <circle cx="12" cy="44.5" r="2.6" fill="#2f6fd0" />
        <circle cx="19.5" cy="51.5" r="3" fill="#2c4fb0" />
        <circle cx="56" cy="33" r="3" fill="#ef4f78" />
        <circle cx="52" cy="44.5" r="2.6" fill="#a0428f" />
        <circle cx="44.5" cy="51.5" r="3" fill="#6a3db5" />
      </g>
    </svg>
  );
}

// 8-tooth gear path centred at (cx, cy)
function gear(cx: number, cy: number, rOut: number, rIn: number, teeth = 8) {
  const pts: string[] = [];
  for (let t = 0; t < teeth; t++) {
    const a = (t / teeth) * Math.PI * 2;
    const w = (Math.PI / teeth) * 0.55;
    for (const [ang, r] of [
      [a - w * 1.25, rIn],
      [a - w * 0.7, rOut],
      [a + w * 0.7, rOut],
      [a + w * 1.25, rIn],
    ] as const) {
      pts.push(`${(cx + Math.cos(ang) * r).toFixed(2)},${(cy + Math.sin(ang) * r).toFixed(2)}`);
    }
  }
  return `M${pts.join("L")}Z`;
}

function Gear() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className="h-full w-full">
      {/* soft lavender gear, offset */}
      <path d={gear(35, 35, 25, 19)} fill="#a9b3e6" />
      {/* bold navy outline gear */}
      <path d={gear(30, 30, 24, 18.5)} fill="none" stroke="#141d4a" strokeWidth="4" strokeLinejoin="round" />
      {/* </> */}
      <g fill="none" stroke="#141d4a" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 25l-5 5 5 5" />
        <path d="M37 25l5 5-5 5" />
        <path d="M32.5 22l-5 16" />
      </g>
    </svg>
  );
}

function Layers({ id }: { id: string }) {
  const slab = (y: number) =>
    `M32 ${y}l20 9c2 1 2 3 0 4l-20 9c-1 .5-2 .5-3 0l-20-9c-2-1-2-3 0-4l20-9c1-.5 2-.5 3 0z`;
  return (
    <svg viewBox="0 0 64 64" aria-hidden className="h-full w-full">
      <defs>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#14a9f5" />
          <stop offset="1" stopColor="#5a55f0" />
        </linearGradient>
      </defs>
      <g fill={`url(#${id}g)`} stroke="#fff" strokeWidth="2">
        <path d={slab(34)} />
        <path d={slab(28)} />
        <path d={slab(22)} />
      </g>
      {/* badge */}
      <circle cx="31" cy="18" r="11" fill={`url(#${id}g)`} stroke="#fff" strokeWidth="2.4" />
      <g fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M27 15l-3 3 3 3" />
        <path d="M35 15l3 3-3 3" />
        <path d="M32.2 13.5l-2.4 9" />
      </g>
    </svg>
  );
}

function Spark({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className="h-full w-full">
      <defs>
        <linearGradient id={`${id}s`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4f8df5" />
          <stop offset=".55" stopColor="#8a5cf0" />
          <stop offset="1" stopColor="#ef5a8a" />
        </linearGradient>
      </defs>
      {/* chat bubble */}
      <path d="M14 14h36a6 6 0 0 1 6 6v20a6 6 0 0 1-6 6H30l-10 8v-8h-6a6 6 0 0 1-6-6V20a6 6 0 0 1 6-6z" fill={`url(#${id}s)`} />
      {/* AI sparkle */}
      <path d="M32 18q2 10 10 12q-8 2-10 12q-2-10-10-12q8-2 10-12z" fill="#fff" />
      <path d="M45 18q.8 3.5 4 4.5q-3.2 1-4 4.5q-.8-3.5-4-4.5q3.2-1 4-4.5z" fill="#fff" opacity=".85" />
    </svg>
  );
}

export default function ServiceIcon({ index, className = "" }: { index: number; className?: string }) {
  const id = useId().replace(/:/g, "");
  const Icon = [<Brain key="b" id={id} />, <Gear key="g" />, <Layers key="l" id={id} />, <Spark key="s" id={id} />][index];
  return <span className={`block ${className}`}>{Icon}</span>;
}
