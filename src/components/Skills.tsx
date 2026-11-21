import { skills } from "@/data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  const all = skills.flatMap((s) => s.items);
  return (
    <section id="skills" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading index="04" label="Skills" title="My toolkit" />
      </div>

      <div className="relative mb-14 flex overflow-hidden border-y border-border py-6 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        {[0, 1].map((k) => (
          <div key={k} aria-hidden={k === 1} className="flex shrink-0 animate-[marquee_40s_linear_infinite] gap-10 pr-10">
            {all.map((s) => (
              <span key={s} className="whitespace-nowrap font-display text-3xl font-semibold text-muted">
                {s} <span className="text-accent">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((g, i) => (
          <Reveal key={g.group} delay={(i % 3) * 0.05}>
            <div className="h-full rounded-3xl border border-border bg-surface p-7">
              <h3 className="mb-5 font-display text-lg font-semibold">{g.group}</h3>
              <div className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span key={s} className="rounded-full bg-surface-2 px-3 py-1.5 text-sm">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
