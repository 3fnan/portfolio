import BlurText from "./BlurText";
import Reveal from "./Reveal";

/**
 * One header style for every section, so the page reads as one story:
 * "Chapter 03 :: Projects", a big title, and a lead line that picks up where the last section left off.
 */
export default function ChapterHead({
  n,
  label,
  title,
  lead,
  center = false,
}: {
  n: number;
  label: string;
  title: string;
  lead?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "grid gap-6 md:grid-cols-[220px_1fr] md:gap-10"}>
      <Reveal>
        <p className={`flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/50 ${center ? "justify-center" : ""}`}>
          <span className="text-accent">Ch.{String(n).padStart(2, "0")}</span>
          <span className="h-px w-8 bg-ink/25" />
          <span>{label}</span>
        </p>
      </Reveal>
      <div>
        <BlurText text={title} className="display text-[clamp(2.6rem,6vw,5rem)]" />
        {lead && (
          <Reveal delay={0.1}>
            <p className={`mt-6 max-w-xl text-lg leading-relaxed text-ink/65 ${center ? "mx-auto" : ""}`}>{lead}</p>
          </Reveal>
        )}
      </div>
    </div>
  );
}

/** Just the "Ch.01 —— Label" line, for sections with their own custom layout. */
export function ChapterLabel({ n, label, light = false }: { n: number; label: string; light?: boolean }) {
  return (
    <p className={`flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] ${light ? "text-white/60" : "text-ink/50"}`}>
      <span className={light ? "text-accent-soft" : "text-accent"}>Ch.{String(n).padStart(2, "0")}</span>
      <span className={`h-px w-8 ${light ? "bg-white/30" : "bg-ink/25"}`} />
      <span>{label}</span>
    </p>
  );
}
