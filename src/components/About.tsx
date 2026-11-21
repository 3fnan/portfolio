import { Award, GraduationCap, Languages, Sparkles } from "lucide-react";
import { certifications, education, experience, languages, profile } from "@/data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const card = "h-full rounded-3xl border border-border bg-surface p-7";

export default function About() {
  const current = experience.find((e) => e.current);
  return (
    <section id="about" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="01" label="About" title="A bit about me" />

        <div className="grid gap-4 md:grid-cols-6">
          <Reveal className="md:col-span-4">
            <div className={card}>
              <Sparkles className="mb-6 text-accent" />
              <p className="font-display text-2xl leading-snug sm:text-3xl">{profile.summary}</p>
            </div>
          </Reveal>

          {current && (
            <Reveal delay={0.1} className="md:col-span-2">
              <div className="flex h-full flex-col justify-between rounded-3xl bg-accent p-7 text-accent-fg">
                <p className="text-sm font-medium uppercase tracking-widest opacity-70">Currently</p>
                <div>
                  <p className="font-display text-3xl font-bold leading-tight">{current.role}</p>
                  <p className="mt-2 opacity-80">@ {current.company}</p>
                </div>
              </div>
            </Reveal>
          )}

          <Reveal delay={0.05} className="md:col-span-3">
            <div className={card}>
              <GraduationCap className="mb-6 text-accent" />
              <p className="text-sm text-muted">{education.period}</p>
              <p className="mt-2 font-display text-xl font-semibold">{education.degree}</p>
              <p className="mt-2 text-muted">
                {education.school}, {education.location}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-3">
            <div className={card}>
              <Award className="mb-6 text-accent" />
              <ul className="space-y-4">
                {certifications.map((c) => (
                  <li key={c.name}>
                    <p className="font-display text-lg font-semibold">{c.name}</p>
                    <p className="text-sm text-muted">
                      {c.issuer} · {c.year}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.05} className="md:col-span-6">
            <div className={`${card} flex flex-col gap-6 sm:flex-row sm:items-center`}>
              <Languages className="shrink-0 text-accent" />
              <ul className="flex flex-wrap gap-3">
                {languages.map((l) => (
                  <li key={l.name} className="rounded-full border border-border px-4 py-2 text-sm">
                    <span className="font-medium">{l.name}</span>
                    <span className="text-muted"> · {l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
