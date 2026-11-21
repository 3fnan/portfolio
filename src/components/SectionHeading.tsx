import Reveal from "./Reveal";

export default function SectionHeading({
  index,
  label,
  title,
}: {
  index: string;
  label: string;
  title: string;
}) {
  return (
    <Reveal className="mb-12">
      <div className="mb-4 flex items-center gap-3 text-sm text-muted">
        <span className="font-display text-accent">{index}</span>
        <span className="h-px w-10 bg-border" />
        <span className="uppercase tracking-[0.2em]">{label}</span>
      </div>
      <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h2>
    </Reveal>
  );
}
