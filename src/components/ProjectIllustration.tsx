/**
 * Hand-drawn SVG illustrations for project cards, one per project.
 * Drawn on a 400×300 canvas and scaled with "meet", so nothing gets cropped
 * whatever the card's aspect ratio; the accent background fills the rest.
 */

export type IllustrationKind = "policy" | "resume" | "flute" | "website" | "planner";

const C = {
  cream: "#f6f8fb",
  sand: "#dbe1ea",
  clay: "#8e9bb0",
  ink: "#15181e",
  inkSoft: "#2b313c",
  accent: "#4f74b8",
  peach: "#9fb3d6",
  rust: "#0b1a3a",
};

const font = { fontFamily: "ui-sans-serif, system-ui, sans-serif" };

// Soft drop shadow drawn as an offset rounded rect
function Shadow({ x, y, w, h, r = 10 }: { x: number; y: number; w: number; h: number; r?: number }) {
  return <rect x={x + 4} y={y + 14} width={w} height={h} rx={r} fill={C.rust} opacity=".35" filter="url(#soft)" />;
}

function Policy() {
  const leaves = [
    { x: 30, label: "CVE", value: "critical", ok: false },
    { x: 112, label: "Score", value: "≥ 9.0", ok: true },
    { x: 214, label: "License", value: "GPL", ok: true },
    { x: 296, label: "Owner", value: "unknown", ok: false },
  ];
  return (
    <g style={font}>
      {/* connectors */}
      <g stroke={C.cream} strokeWidth="2" fill="none" opacity=".75">
        <path d="M200 66 C 200 90, 110 86, 110 110" />
        <path d="M200 66 C 200 90, 290 86, 290 110" />
        <path d="M110 136 C 110 160, 66 156, 66 178" />
        <path d="M110 136 C 110 160, 148 156, 148 178" />
        <path d="M290 136 C 290 160, 250 156, 250 178" />
        <path d="M290 136 C 290 160, 332 156, 332 178" />
      </g>

      {/* root */}
      <Shadow x={140} y={28} w={120} h={38} />
      <rect x="140" y="28" width="120" height="38" rx="10" fill={C.cream} />
      <path d="M160 38 l10 -4 l10 4 v8 c0 7 -5 11 -10 13 c-5 -2 -10 -6 -10 -13 z" fill={C.accent} />
      <text x="214" y="52" textAnchor="middle" fontSize="13" fontWeight="800" fill={C.ink}>POLICY</text>

      {/* groups */}
      {[
        { x: 110, t: "AND" },
        { x: 290, t: "OR" },
      ].map((g) => (
        <g key={g.t}>
          <rect x={g.x - 32} y="110" width="64" height="26" rx="13" fill={C.ink} />
          <text x={g.x} y="127" textAnchor="middle" fontSize="12" fontWeight="800" fill={C.peach} letterSpacing="1">{g.t}</text>
        </g>
      ))}

      {/* rules */}
      {leaves.map((l) => (
        <g key={l.label}>
          <Shadow x={l.x} y={178} w={74} h={50} r={8} />
          <rect x={l.x} y="178" width="74" height="50" rx="8" fill={C.cream} />
          <text x={l.x + 9} y="198" fontSize="8.5" fill={C.clay} fontWeight="700">{l.label.toUpperCase()}</text>
          <text x={l.x + 9} y="214" fontSize="11" fill={C.ink} fontWeight="700">{l.value}</text>
          <circle cx={l.x + 64} cy="188" r="7" fill={l.ok ? C.ink : C.accent} />
          <text x={l.x + 64} y="191.5" textAnchor="middle" fontSize="9" fontWeight="800" fill={C.cream}>{l.ok ? "✓" : "✕"}</text>
        </g>
      ))}

      {/* result */}
      <rect x="120" y="248" width="160" height="28" rx="14" fill={C.ink} />
      <circle cx="140" cy="262" r="5" fill={C.accent} />
      <text x="212" y="266" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={C.cream} letterSpacing=".5">BLOCKED · 2 of 4 failed</text>
    </g>
  );
}

function Resume() {
  const circ = 2 * Math.PI * 30;
  return (
    <g style={font}>
      {/* resume page */}
      <g transform="rotate(-7 140 150)">
        <Shadow x={62} y={36} w={152} h={216} r={6} />
        <rect x="62" y="36" width="152" height="216" rx="6" fill={C.cream} />
        <circle cx="92" cy="70" r="15" fill={C.sand} />
        <circle cx="92" cy="66" r="6" fill={C.clay} />
        <path d="M81 80 c3 -7 19 -7 22 0" fill={C.clay} />
        <rect x="116" y="61" width="74" height="8" rx="4" fill={C.ink} opacity=".85" />
        <rect x="116" y="75" width="48" height="6" rx="3" fill={C.clay} opacity=".6" />
        {[106, 152, 198].map((y, s) => (
          <g key={y}>
            <rect x="78" y={y} width="40" height="6" rx="3" fill={C.accent} />
            {[0, 1, 2].map((i) => (
              <rect key={i} x="78" y={y + 13 + i * 10} width={[118, 96, 108][(i + s) % 3]} height="5" rx="2.5" fill={C.clay} opacity=".45" />
            ))}
          </g>
        ))}
        {/* highlighted line, like the AI marking it */}
        <rect x="74" y="173" width="104" height="11" rx="3" fill={C.peach} opacity=".35" />
      </g>

      {/* ATS score */}
      <Shadow x={214} y={52} w={132} h={130} r={14} />
      <rect x="214" y="52" width="132" height="130" rx="14" fill={C.ink} />
      <circle cx="280" cy="106" r="30" fill="none" stroke={C.inkSoft} strokeWidth="9" />
      <circle
        cx="280" cy="106" r="30" fill="none" stroke={C.peach} strokeWidth="9" strokeLinecap="round"
        strokeDasharray={`${circ * 0.86} ${circ}`} transform="rotate(-90 280 106)"
      />
      <text x="280" y="113" textAnchor="middle" fontSize="20" fontWeight="800" fill={C.cream}>86</text>
      <text x="280" y="164" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={C.cream} opacity=".65" letterSpacing="1.5">ATS SCORE</text>

      {/* skill gaps */}
      <rect x="206" y="198" width="78" height="24" rx="12" fill={C.cream} />
      <text x="245" y="214" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={C.ink}>+ Docker</text>
      <rect x="290" y="198" width="62" height="24" rx="12" fill={C.cream} />
      <text x="321" y="214" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={C.ink}>+ SQL</text>
      <rect x="206" y="230" width="146" height="24" rx="12" fill={C.rust} />
      <text x="279" y="246" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={C.cream}>Job match · 72%</text>

      {/* AI sparkle */}
      <path d="M356 30 q3 12 14 15 q-11 3 -14 15 q-3 -12 -14 -15 q11 -3 14 -15 z" fill={C.cream} />
      <path d="M40 252 q2 7 8 9 q-6 2 -8 9 q-2 -7 -8 -9 q6 -2 8 -9 z" fill={C.cream} opacity=".7" />
    </g>
  );
}

function Flute() {
  // irregular "humming" bars vs a clean melody line
  const bars = Array.from({ length: 13 }, (_, i) => 14 + Math.abs(Math.sin(i * 1.7) * 30) + ((i * 7) % 11));
  return (
    <g style={font}>
      {/* microphone */}
      <rect x="40" y="104" width="34" height="58" rx="17" fill={C.cream} />
      <g stroke={C.clay} strokeWidth="2" opacity=".6">
        <line x1="47" y1="118" x2="67" y2="118" />
        <line x1="47" y1="126" x2="67" y2="126" />
        <line x1="47" y1="134" x2="67" y2="134" />
      </g>
      <path d="M31 140 a26 26 0 0 0 52 0" stroke={C.cream} strokeWidth="4" fill="none" strokeLinecap="round" />
      <line x1="57" y1="166" x2="57" y2="186" stroke={C.cream} strokeWidth="4" strokeLinecap="round" />
      <line x1="42" y1="188" x2="72" y2="188" stroke={C.cream} strokeWidth="4" strokeLinecap="round" />

      {/* humming waveform */}
      {bars.map((h, i) => (
        <rect key={i} x={96 + i * 7} y={140 - h / 2} width="4" height={h} rx="2" fill={C.cream} opacity={0.35 + (i % 3) * 0.2} />
      ))}

      {/* arrow */}
      <path d="M192 140 h22 m-7 -7 l7 7 l-7 7" stroke={C.cream} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {/* bansuri */}
      <defs>
        <linearGradient id="bamboo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.cream} />
          <stop offset=".6" stopColor={C.sand} />
          <stop offset="1" stopColor={C.clay} />
        </linearGradient>
      </defs>
      <rect x="227" y="138" width="150" height="20" rx="10" transform="rotate(-8 302 148)" fill={C.rust} opacity=".3" />
      <g transform="rotate(-8 302 140)">
        <rect x="222" y="131" width="150" height="20" rx="10" fill="url(#bamboo)" />
        <rect x="232" y="131" width="4" height="20" fill={C.ink} opacity=".5" />
        <rect x="358" y="131" width="4" height="20" fill={C.ink} opacity=".5" />
        <ellipse cx="248" cy="141" rx="5" ry="4" fill={C.rust} />
        {[276, 292, 308, 324, 340].map((x) => (
          <circle key={x} cx={x} cy="141" r="3.6" fill={C.rust} />
        ))}
      </g>

      {/* melody */}
      <path d="M226 206 C 252 186, 270 226, 296 206 S 340 186, 372 206" stroke={C.cream} strokeWidth="2.5" fill="none" strokeDasharray="1 7" strokeLinecap="round" />
      <text x="262" y="102" fontSize="30" fill={C.cream}>♪</text>
      <text x="302" y="82" fontSize="24" fill={C.peach}>♫</text>
      <text x="344" y="108" fontSize="20" fill={C.cream} opacity=".8">♪</text>
    </g>
  );
}

function Website() {
  return (
    <g style={font}>
      {/* desktop browser */}
      <Shadow x={34} y={36} w={268} h={210} r={12} />
      <rect x="34" y="36" width="268" height="210" rx="12" fill={C.cream} />
      <path d="M34 48 a12 12 0 0 1 12 -12 h244 a12 12 0 0 1 12 12 v14 h-268 z" fill={C.sand} />
      {[50, 62, 74].map((x) => <circle key={x} cx={x} cy="49" r="4" fill={C.clay} />)}
      <rect x="96" y="42" width="150" height="14" rx="7" fill={C.cream} />
      <text x="171" y="52.5" textAnchor="middle" fontSize="8.5" fill={C.ink} opacity=".65">alfanalaniq.ae</text>

      {/* hero block */}
      <rect x="46" y="72" width="244" height="84" rx="7" fill={C.ink} />
      <rect x="60" y="88" width="112" height="10" rx="3" fill={C.cream} />
      <rect x="60" y="103" width="82" height="10" rx="3" fill={C.cream} />
      <rect x="60" y="120" width="118" height="5" rx="2.5" fill={C.cream} opacity=".4" />
      <rect x="60" y="134" width="50" height="13" rx="6.5" fill={C.accent} />
      {/* gear */}
      <g transform="translate(240 114)">
        {Array.from({ length: 8 }).map((_, i) => (
          <rect key={i} x="-4" y="-30" width="8" height="12" rx="2" fill={C.accent} transform={`rotate(${i * 45})`} />
        ))}
        <circle r="22" fill={C.accent} />
        <circle r="9" fill={C.ink} />
      </g>

      {/* service cards */}
      {[46, 128, 210].map((x) => (
        <g key={x}>
          <rect x={x} y="166" width="78" height="66" rx="6" fill={C.sand} />
          <rect x={x + 9} y="175" width="15" height="15" rx="4" fill={C.accent} />
          <rect x={x + 9} y="198" width="52" height="6" rx="3" fill={C.ink} opacity=".75" />
          <rect x={x + 9} y="210" width="40" height="5" rx="2.5" fill={C.clay} opacity=".6" />
          <rect x={x + 9} y="220" width="48" height="5" rx="2.5" fill={C.clay} opacity=".6" />
        </g>
      ))}

      {/* phone: responsive */}
      <Shadow x={282} y={92} w={86} h={170} r={16} />
      <rect x="282" y="92" width="86" height="170" rx="16" fill={C.ink} />
      <rect x="289" y="106" width="72" height="146" rx="9" fill={C.cream} />
      <rect x="313" y="97" width="24" height="5" rx="2.5" fill={C.inkSoft} />
      <rect x="295" y="113" width="60" height="44" rx="5" fill={C.ink} />
      <rect x="302" y="122" width="38" height="6" rx="3" fill={C.cream} />
      <rect x="302" y="132" width="26" height="6" rx="3" fill={C.cream} />
      <rect x="302" y="144" width="20" height="7" rx="3.5" fill={C.accent} />
      {[164, 192, 220].map((y) => (
        <g key={y}>
          <rect x="295" y={y} width="60" height="22" rx="4" fill={C.sand} />
          <rect x="300" y={y + 6} width="10" height="10" rx="3" fill={C.accent} />
          <rect x="315" y={y + 8} width="32" height="5" rx="2.5" fill={C.ink} opacity=".6" />
        </g>
      ))}
    </g>
  );
}

function Planner() {
  const accent = new Set([3, 9, 10, 17, 24]);
  const today = 12;
  const tasks = [
    { done: true, w: 92 },
    { done: true, w: 74 },
    { done: false, w: 100 },
    { done: false, w: 64 },
  ];
  return (
    <g style={font}>
      {/* calendar */}
      <Shadow x={34} y={46} w={184} h={200} r={14} />
      <rect x="34" y="46" width="184" height="200" rx="14" fill={C.cream} />
      <path d="M34 60 a14 14 0 0 1 14 -14 h156 a14 14 0 0 1 14 14 v24 h-184 z" fill={C.ink} />
      <text x="52" y="71" fontSize="11" fontWeight="800" fill={C.cream} letterSpacing="1.5">THIS MONTH</text>
      <circle cx="196" cy="66" r="5" fill={C.accent} />
      {Array.from({ length: 35 }).map((_, i) => {
        const col = i % 7;
        const row = Math.floor(i / 7);
        const fill = i === today ? C.ink : accent.has(i) ? C.accent : C.sand;
        return <rect key={i} x={48 + col * 23} y={96 + row * 29} width="18" height="22" rx="4" fill={fill} opacity={i > 30 ? 0.4 : 1} />;
      })}

      {/* checklist */}
      <Shadow x={196} y={112} w={168} h={150} r={14} />
      <rect x="196" y="112" width="168" height="150" rx="14" fill={C.ink} />
      <text x="214" y="136" fontSize="10" fontWeight="800" fill={C.peach} letterSpacing="1.5">TODAY</text>
      {tasks.map((t, i) => {
        const y = 150 + i * 26;
        return (
          <g key={i}>
            <rect x="214" y={y} width="15" height="15" rx="4" fill={t.done ? C.peach : "none"} stroke={C.peach} strokeWidth="2" />
            {t.done && <path d={`M217.5 ${y + 7.5} l3 3 l5.5 -6`} stroke={C.ink} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
            <rect x="238" y={y + 5} width={t.w} height="6" rx="3" fill={C.cream} opacity={t.done ? 0.35 : 0.9} />
          </g>
        );
      })}

      {/* goal */}
      <g transform="translate(330 70)">
        <circle r="30" fill={C.cream} />
        <circle r="20" fill={C.accent} />
        <circle r="10" fill={C.cream} />
        <circle r="4" fill={C.ink} />
        <path d="M30 -30 L3 -3" stroke={C.ink} strokeWidth="3" strokeLinecap="round" />
        <path d="M30 -30 l-1 9 m1 -9 l-9 1" stroke={C.ink} strokeWidth="3" strokeLinecap="round" />
      </g>
    </g>
  );
}

const drawings: Record<IllustrationKind, () => React.ReactElement> = {
  policy: Policy,
  resume: Resume,
  flute: Flute,
  website: Website,
  planner: Planner,
};

export default function ProjectIllustration({ kind, alt = "" }: { kind: IllustrationKind; alt?: string }) {
  const Drawing = drawings[kind];
  return (
    <div
      role="img"
      aria-label={alt}
      className="relative h-full w-full overflow-hidden"
      style={{ background: "linear-gradient(160deg,#3b5d99 0%,#1e3a6e 55%,#0f2148 100%)" }}
    >
      {/* studio lighting: a soft key light from the top-left and a floor the objects sit on */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 55% at 30% 18%, rgba(255,255,255,0.22), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[30%]"
        style={{ background: "linear-gradient(180deg, transparent, rgba(5,12,28,0.35))" }}
      />
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full p-[6%]">
        <defs>
          <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        <Drawing />
      </svg>
    </div>
  );
}
