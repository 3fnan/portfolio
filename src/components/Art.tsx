import type { Art as ArtKind } from "@/data/portfolio";

/**
 * Generated orange artwork used wherever a real image hasn't been added yet.
 * Pass `src` to show a real image instead.
 */
export default function Art({
  kind,
  src,
  alt = "",
  className = "",
}: {
  kind: ArtKind;
  src?: string;
  alt?: string;
  className?: string;
}) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={`h-full w-full object-cover ${className}`} />;
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ background: "linear-gradient(160deg,#f6894f 0%,#e4572e 55%,#b93a16 100%)" }}
    >
      <div className="absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-b from-[#d24a22] to-[#a8320f]" />
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id={`g-${kind}`} cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#fff7ef" />
            <stop offset="55%" stopColor="#f3d9c6" />
            <stop offset="100%" stopColor="#c98a68" />
          </radialGradient>
        </defs>
        {kind === "ring" && (
          <>
            <ellipse cx="100" cy="162" rx="46" ry="7" fill="#9c2e0d" opacity=".45" />
            <circle cx="100" cy="110" r="44" fill="none" stroke={`url(#g-${kind})`} strokeWidth="20" />
            <path d="M100 58 C 92 40, 112 30, 102 10" stroke="#fff" strokeOpacity=".5" strokeWidth="3" fill="none" />
          </>
        )}
        {kind === "sphere" && (
          <>
            <path d="M0 200 L 120 60 L 200 60 L 200 200 Z" fill="#c13d16" opacity=".55" />
            <ellipse cx="96" cy="160" rx="40" ry="7" fill="#8d2a0b" opacity=".5" />
            <circle cx="96" cy="122" r="38" fill={`url(#g-${kind})`} />
          </>
        )}
        {kind === "grid" && (
          <g transform="translate(100 108) rotate(-18)">
            {Array.from({ length: 5 }).map((_, r) =>
              Array.from({ length: 5 }).map((_, c) => (
                <rect key={`${r}-${c}`} x={-55 + c * 22} y={-55 + r * 22} width="18" height="18" rx="3"
                  fill={(r + c) % 3 === 0 ? `url(#g-${kind})` : "#fff"} opacity={(r + c) % 3 === 0 ? 1 : 0.16} />
              )),
            )}
          </g>
        )}
        {kind === "wave" && (
          <g fill={`url(#g-${kind})`}>
            {Array.from({ length: 22 }).map((_, i) => {
              const h = 12 + Math.abs(Math.sin(i * 0.7)) * 55 + (i % 4) * 4;
              const x = 32 + i * 6.2;
              return <rect key={i} x={x} y={105 - h / 2} width="3.6" height={h} rx="1.8" />;
            })}
          </g>
        )}
        {kind === "stack" && (
          <g>
            {[0, 1, 2].map((i) => (
              <g key={i} transform={`translate(0 ${-i * 26})`}>
                <path d="M100 128 L150 110 L100 92 L50 110 Z" fill={i === 2 ? `url(#g-${kind})` : "#fff"} opacity={i === 2 ? 1 : 0.25 + i * 0.15} />
                <path d="M50 110 L50 118 L100 136 L150 118 L150 110 L100 128 Z" fill="#8d2a0b" opacity=".35" />
              </g>
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}
