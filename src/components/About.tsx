import { profile, stats, projects } from "@/data/portfolio";
import Art from "./Art";
import BlurText from "./BlurText";
import Counter from "./Counter";
import Parallax from "./Parallax";
import Reveal from "./Reveal";
import { ChapterLabel } from "./ChapterHead";
import Story from "./Story";

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-[1400px] overflow-x-clip px-5 py-28 sm:px-10">
      <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
        <div>
          <Reveal><ChapterLabel n={1} label="About me" /></Reveal>
          <BlurText
            text="Learning by | building"
            className="display mt-5 text-[clamp(2.6rem,6vw,5rem)]"
          />
        </div>
        <div className="relative hidden items-start justify-between md:flex">
          <span />
          <Parallax speed={50} className="w-40">
            <div className="aspect-[4/5] overflow-hidden shadow-xl">
              <Art kind={projects[1].art} src={projects[1].image} alt={projects[1].title} />
            </div>
          </Parallax>
        </div>
      </div>

      <div className="mt-16 grid items-center gap-14 md:grid-cols-2">
        <Parallax speed={40} className="relative mx-auto w-full max-w-[300px] text-grey">
          <div className="float-y aspect-[4/5] overflow-hidden shadow-2xl shadow-black/15">
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
              Hi, I&apos;m {profile.firstName}, a computer science student who enjoys learning AI and
              building things with code.
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
                    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-accent">{s.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-ink/60">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <Story />
    </section>
  );
}
