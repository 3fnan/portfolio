import { profile, storyFile } from "@/data/portfolio";
import Marquee from "./Marquee";
import ScrollLetter from "./ScrollLetter";

/**
 * "My story so far": a moving status line (like the logo strip, no box), then the letter
 * that plays as you scroll.
 */
export default function Story() {
  const items = [
    `${profile.firstName.toUpperCase()}::HERE`,
    ...storyFile.meta.map((m) => `${m.k}::${m.v}`),
    "MY STORY SO FAR",
  ];

  return (
    <div className="mt-28">
      <Marquee duration={28} gap="2.5rem" className="py-4">
        {items.map((t) => (
          <span key={t} className="whitespace-nowrap font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-ink/60">
            {t.split("::").map((part, i, arr) => (
              <span key={i}>
                {i > 0 && <span className="opacity-50">::</span>}
                <span className={i === arr.length - 1 && arr.length > 1 ? "text-ink" : ""}>{part}</span>
              </span>
            ))}
          </span>
        ))}
      </Marquee>

      {/* the letter: pinned, scroll-driven */}
      <ScrollLetter />
    </div>
  );
}
