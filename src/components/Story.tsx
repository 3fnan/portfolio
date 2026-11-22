import { profile, storyFile } from "@/data/portfolio";
import Reveal from "./Reveal";
import ScrollLetter from "./ScrollLetter";

/**
 * "My story so far", laid out like a personal file:
 * a status strip and a first-person letter that plays as you scroll.
 */

export default function Story() {
  return (
    <div className="mt-28">
      {/* status strip */}
      <Reveal>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-line py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink/55">
          <span className="flex items-center gap-2 text-ink">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            {profile.firstName.toUpperCase()}::HERE
          </span>
          {storyFile.meta.map((m) => (
            <span key={m.k}>
              {m.k}::<span className="text-ink">{m.v}</span>
            </span>
          ))}
          <span className="ml-auto hidden sm:inline">My story so far</span>
        </div>
      </Reveal>

      {/* the letter: pinned, scroll-driven */}
      <ScrollLetter />
    </div>
  );
}
