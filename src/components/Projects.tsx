import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projects } from "@/data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Projects() {
  return (
    <section id="projects" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="03" label="Projects" title="Selected work" />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.1}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface transition duration-300 hover:-translate-y-1 hover:border-muted/50">
                <div
                  className="relative flex h-52 items-end overflow-hidden p-7"
                  style={{
                    background: `radial-gradient(120% 120% at 100% 0%, ${p.accent}, transparent 60%), var(--surface-2)`,
                  }}
                >
                  <span className="absolute right-6 top-6 rounded-full bg-bg/70 px-3 py-1 text-xs backdrop-blur">
                    {p.year}
                  </span>
                  <h3 className="font-display text-4xl font-bold tracking-tight transition duration-500 group-hover:translate-x-1">
                    {p.title}
                  </h3>
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <p className="text-sm uppercase tracking-widest text-muted">{p.subtitle}</p>
                  <p className="mt-3 leading-relaxed">{p.description}</p>
                  <ul className="mt-4 space-y-1.5 text-sm text-muted">
                    {p.highlights.map((h) => (
                      <li key={h}>→ {h}</li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span key={s} className="rounded-full border border-border px-3 py-1 text-xs">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex gap-3 pt-7">
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition hover:bg-fg hover:text-bg"
                      >
                        <FaGithub /> Code
                      </a>
                    )}
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-fg"
                      >
                        Live <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
