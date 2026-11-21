import { experience } from "@/data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="02" label="Experience" title="Where I've worked" />

        <ol className="divide-y divide-border border-y border-border">
          {experience.map((job, i) => (
            <Reveal key={job.company + job.period} delay={i * 0.05}>
              <li className="grid gap-6 py-10 md:grid-cols-[220px_1fr]">
                <div>
                  <p className="text-sm text-muted">{job.period}</p>
                  {job.current && (
                    <span className="mt-2 inline-block rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-fg">
                      Current
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold">{job.role}</h3>
                  <p className="mt-1 text-muted">
                    {job.company} · {job.location}
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {job.points.map((p) => (
                      <li key={p} className="flex gap-3 leading-relaxed text-muted">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {job.tags.map((t) => (
                      <span key={t} className="rounded-full bg-surface-2 px-3 py-1 text-xs">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
