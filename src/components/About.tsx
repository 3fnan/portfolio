import { profile, stats, projects, quickFacts } from "@/data/portfolio";
import Art from "./Art";
import BlurText from "./BlurText";
import Counter from "./Counter";
import Crosshair from "./Crosshair";
import Parallax from "./Parallax";
import Reveal from "./Reveal";
import Tag from "./Tag";

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-[1400px] overflow-hidden px-5 py-28 sm:px-10">
      <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
        <div>
          <Reveal><Tag>Better software, real impact</Tag></Reveal>
          <BlurText
            text="My impact through | AI & code"
            className="display mt-5 text-[clamp(2.6rem,6vw,5rem)]"
          />
        </div>
        <div className="relative hidden items-start justify-between md:flex">
          <span aria-hidden className="mt-10 text-7xl text-line [animation:spin-slow_14s_linear_infinite]">✳</span>
          <Parallax speed={50} className="w-40">
            <div className="aspect-[4/5] overflow-hidden shadow-xl">
              <Art kind={projects[1].art} src={projects[1].image} alt={projects[1].title} />
            </div>
          </Parallax>
        </div>
      </div>

      <div className="mt-16 grid items-center gap-14 md:grid-cols-2">
        <Parallax speed={40} className="relative mx-auto w-full max-w-[300px] text-grey">
          <Crosshair className="-left-5 -top-5" />
          <Crosshair className="-right-5 -top-5" />
          <Crosshair className="-bottom-5 -left-5" />
          <Crosshair className="-bottom-5 -right-5" />
          <div className="aspect-[4/5] overflow-hidden">
            {profile.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.photo} alt={profile.name} className="h-full w-full object-cover" />
            ) : (
              <Art kind="sphere" alt="Portrait placeholder" />
            )}
          </div>
        </Parallax>

        <div>
          <Reveal>
            <p className="max-w-md text-sm font-semibold uppercase leading-relaxed">
              Hi, I&apos;m {profile.firstName}, an {profile.role.toLowerCase()} passionate about building
              intelligent, reliable and well-crafted software.
            </p>
            <p className="mt-5 max-w-md font-display text-xl font-semibold leading-snug">{profile.valueProp}</p>
            <p className="mt-4 max-w-md leading-relaxed text-ink/60">{profile.summary}</p>
          </Reveal>
          <div className="mt-8 space-y-3">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <div className="grid grid-cols-[120px_1fr] items-center bg-card p-6 sm:grid-cols-[150px_1fr]">
                  <Counter value={s.value} suffix={s.suffix} className="display text-5xl sm:text-6xl" />
                  <div className="border-l border-line pl-6">
                    <Tag className="bg-transparent px-0">{s.label}</Tag>
                    <p className="mt-1 text-xs leading-relaxed text-ink/60">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Recruiter quick view */}
      <Reveal className="mt-24">
        <div className="grid gap-px bg-line md:grid-cols-[260px_1fr]">
          <div className="flex flex-col justify-between gap-6 bg-ink p-7 text-white">
            <div>
              <Tag className="bg-white/10 text-white">Recruiter quick view</Tag>
              <p className="mt-5 font-display text-2xl font-bold leading-tight">Everything you need in 10 seconds.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href={profile.resume} target="_blank" className="bg-orange px-4 py-2 text-xs font-bold uppercase">Resume</a>
              <a href={profile.socials.linkedin} target="_blank" className="border border-white/30 px-4 py-2 text-xs font-bold uppercase">LinkedIn</a>
            </div>
          </div>
          <dl className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {quickFacts.map((f) => (
              <div key={f.label} className="bg-card p-6">
                <dt className="text-[11px] font-semibold uppercase tracking-wide text-ink/50">{f.label}</dt>
                <dd className="mt-2 font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </section>
  );
}
