/**
 * Letter-roll hover: each letter slides up and an identical copy rolls in from below,
 * staggered left to right. Put `roll-host` on the hoverable parent (link/button).
 */
export default function RollText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <>
      <span aria-hidden className={`roll ${className}`}>
        {Array.from(text).map((ch, i) => (
          <span key={i} style={{ "--i": i } as React.CSSProperties}>
            {ch === " " ? " " : ch}
          </span>
        ))}
      </span>
      <span className="sr-only">{text}</span>
    </>
  );
}
