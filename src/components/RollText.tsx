/**
 * Letter-roll hover: each letter slides up and an identical copy rolls in from below,
 * staggered left to right. Put `roll-host` on the hoverable parent (link/button).
 *
 * Each WORD is its own clipped roll, so long titles can wrap between words on phones
 * without the hidden copy (drawn one line below) showing through on the next line,
 * and without breaking a word in the middle.
 */
export default function RollText({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  let n = 0; // running letter index keeps the left-to-right stagger across words
  return (
    <>
      <span aria-hidden className={className}>
        {words.map((w, wi) => (
          <span key={wi}>
            <span className="roll whitespace-nowrap">
              {Array.from(w).map((ch, i) => (
                <span key={i} style={{ "--i": n++ } as React.CSSProperties}>
                  {ch}
                </span>
              ))}
            </span>
            {wi < words.length - 1 && " "}
          </span>
        ))}
      </span>
      <span className="sr-only">{text}</span>
    </>
  );
}
