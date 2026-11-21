import { profile, skills } from "@/data/portfolio";
import BlurText from "./BlurText";
import Marquee from "./Marquee";
import Reveal from "./Reveal";
import Tag from "./Tag";

export default function Toolkit() {
  return (
    <section className="py-28">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-5 sm:px-10 md:grid-cols-2 md:items-end">
        <div>
          <Reveal><Tag>Tools I trust</Tag></Reveal>
          <BlurText text="My | toolkit" className="display mt-5 text-[clamp(2.6rem,6vw,5rem)]" />
        </div>
        <Reveal>
          <p className="max-w-sm text-xs font-semibold uppercase leading-relaxed md:ml-auto md:text-right">
            {profile.lookingFor}. Here&apos;s the stack I work in every day.
          </p>
        </Reveal>
      </div>

      <Marquee duration={45} className="mt-14" gap="0.75rem">
        {skills.map((g) => (
          <div key={g.group} className="flex w-72 shrink-0 flex-col bg-card p-6">
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-bold uppercase">{g.group}</span>
              <span className="text-orange">+</span>
            </div>
            <div className="mt-10 flex flex-wrap gap-1.5">
              {g.items.map((s) => (
                <span key={s} className="bg-black/[0.05] px-2.5 py-1.5 text-xs">{s}</span>
              ))}
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
