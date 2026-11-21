import { GraduationCap } from "lucide-react";
import { education, experience } from "@/data/portfolio";
import BlurText from "./BlurText";
import Reveal from "./Reveal";
import Tag from "./Tag";

const icons = ["✦", "✱", "✥", "✚"];
// alternating vertical offsets give the staggered-card look
const offsets = ["lg:mt-0", "lg:mt-16", "lg:mt-0", "lg:mt-16"];

export default function Experience() {
  const cards = [
    ...experience.map((e) => ({
      key: e.company + e.period,
      top: e.period,
      title: e.role,
      sub: `${e.company} · ${e.location}`,
      text: e.summary,
      points: e.points,
      current: e.current,
    })),
    {
      key: "edu",
      top: education.period,
      title: "B.E. Computer Science",
      sub: "AI & ML · Sahyadri College",
      text: `${education.school}, ${education.location}.`,
      points: [],
      current: false,
    },
  ];

  return (
    <section id="experience" className="mx-auto max-w-[1400px] px-5 py-28 sm:px-10">
      <div className="text-center">
        <Reveal><Tag>My journey</Tag></Reveal>
        <BlurText text="Experience | that ships" className="display mt-5 text-[clamp(2.6rem,6vw,5rem)]" />
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c, i) => (
          <Reveal key={c.key} delay={i * 0.12} className={offsets[i % 4]}>
            <article className="group flex h-full min-h-[380px] flex-col bg-ink p-6 text-white transition-transform duration-500 hover:-translate-y-2">
              <div className="flex items-start justify-between">
                <span className="text-2xl text-orange transition-transform duration-700 group-hover:rotate-180">
                  {c.key === "edu" ? <GraduationCap /> : icons[i % 4]}
                </span>
                {c.current && <span className="bg-orange px-2 py-0.5 text-[10px] font-semibold uppercase">Now</span>}
              </div>
              <p className="mt-6 text-[11px] uppercase tracking-wide text-white/50">{c.top}</p>
              <h3 className="mt-1 font-display text-lg font-bold uppercase leading-tight">{c.title}</h3>
              <p className="text-xs text-white/60">{c.sub}</p>
              <div className="mt-auto pt-8">
                <p className="text-xs leading-relaxed text-white/80">{c.text}</p>
                {c.points.length > 0 && (
                  <ul className="mt-3 space-y-1.5 text-[11px] leading-relaxed text-white/55">
                    {c.points.map((p) => (
                      <li key={p}>— {p}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
