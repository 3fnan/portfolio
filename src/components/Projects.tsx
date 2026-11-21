import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { profile, projects } from "@/data/portfolio";
import Art from "./Art";
import BlurText from "./BlurText";
import Parallax from "./Parallax";
import Reveal from "./Reveal";
import Tag from "./Tag";

// Scattered layout: each card gets its own width, offset and scroll speed
const layout = [
  { wrap: "md:col-start-1 md:w-[78%]", speed: 30, ratio: "aspect-[4/4.6]" },
  { wrap: "md:col-start-2 md:ml-auto md:w-[62%] md:mt-24", speed: 80, ratio: "aspect-[4/4.4]" },
  { wrap: "md:col-span-2 md:mx-auto md:w-[72%]", speed: 40, ratio: "aspect-[16/9]" },
  { wrap: "md:col-start-1 md:w-[60%] md:ml-[8%]", speed: 70, ratio: "aspect-[4/4]" },
  { wrap: "md:col-start-2 md:ml-auto md:w-[70%] md:mt-32", speed: 50, ratio: "aspect-[4/3]" },
];

export default function Projects() {
  return (
    <section id="work" className="mx-auto max-w-[1400px] px-5 py-28 sm:px-10">
      <Reveal><Tag>Portfolio</Tag></Reveal>
      <BlurText text="Selected | work." className="display mt-5 text-[clamp(2.6rem,6vw,5rem)]" />

      <div className="mt-16 grid gap-16 md:grid-cols-2 md:gap-x-16 md:gap-y-24">
        {projects.map((p, i) => {
          const l = layout[i % layout.length];
          return (
            <Parallax key={p.title} speed={l.speed} className={l.wrap}>
              <Reveal>
                <Link href={`/work/${p.slug}`} className="group block bg-card p-2.5 shadow-sm">
                  <div className={`relative overflow-hidden ${l.ratio}`}>
                    <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
                      <Art kind={p.art} src={p.image} alt={p.title} />
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/25 to-transparent p-5 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <p className="max-w-sm text-sm leading-relaxed">{p.description}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {p.stack.slice(0, 5).map((s) => (
                          <span key={s} className="bg-white/15 px-2 py-1 text-[10px] backdrop-blur">{s}</span>
                        ))}
                      </div>
                      <span className="mt-4 inline-flex w-fit items-center gap-2 bg-orange px-3 py-2 text-xs font-bold uppercase">
                        Read case study <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between bg-black/[0.04] px-3 py-2 text-[11px] font-semibold">
                    <span><span className="text-orange">✳</span> {p.title.toUpperCase()}</span>
                    <span className="text-ink/60">/{p.category} · {p.year}</span>
                  </div>
                  <p className="px-1 pb-1 pt-3 text-sm text-ink/70">{p.tagline}</p>
                </Link>
              </Reveal>
            </Parallax>
          );
        })}
      </div>

      <Reveal className="mt-20">
        <a
          href={profile.socials.github}
          target="_blank"
          className="group inline-flex items-center gap-6 border-l-2 border-orange bg-card py-1.5 pl-4 pr-1.5 text-xs font-semibold uppercase"
        >
          All projects on GitHub
          <span className="grid h-7 w-7 place-items-center bg-orange text-white transition-transform group-hover:rotate-45">
            <ArrowUpRight size={14} />
          </span>
        </a>
      </Reveal>
    </section>
  );
}
