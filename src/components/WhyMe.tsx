import { Zap } from "lucide-react";
import { certifications, experience, highlights, languages } from "@/data/portfolio";
import Art from "./Art";
import BlurText from "./BlurText";
import Counter from "./Counter";
import Reveal from "./Reveal";
import Tag from "./Tag";

function Stat({ h }: { h: { value: number; suffix: string; label: string; text: string } }) {
  return (
    <div className="flex h-full flex-col bg-card p-6">
      <Tag className="self-start bg-transparent px-0">{h.label}</Tag>
      <Counter value={h.value} suffix={h.suffix} className="display mt-6 text-6xl" />
      <p className="mt-auto pt-6 text-xs leading-relaxed text-ink/60">{h.text}</p>
    </div>
  );
}

export default function WhyMe() {
  const current = experience.find((e) => e.current);
  const cert = certifications[0];
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-28 sm:px-10">
      <div className="grid gap-6 md:grid-cols-[200px_1fr]">
        <Reveal><Tag>Why work with me</Tag></Reveal>
        <BlurText text="Focused on code | that delivers results" className="display text-[clamp(2.6rem,6vw,5rem)]" />
      </div>

      <div className="mt-16 grid gap-3 md:grid-cols-4 md:grid-rows-[auto_auto]">
        <Reveal className="md:row-span-1"><Stat h={highlights.apis} /></Reveal>

        <Reveal delay={0.1} className="md:row-span-2">
          <div className="relative flex h-full min-h-[360px] flex-col justify-between overflow-hidden p-6 text-white"
            style={{ background: "linear-gradient(170deg,#1a1210 0%,#3b1a0f 55%,#e4572e 140%)" }}>
            <div>
              <Tag className="bg-white/10 text-white">Certified</Tag>
              <p className="mt-6 font-display text-2xl font-bold leading-tight">{cert.name}</p>
              <p className="mt-2 text-sm text-white/60">{cert.issuer} · {cert.year}</p>
            </div>
            <p className="text-sm leading-relaxed text-white/80">
              Plus <span className="font-semibold text-white">{certifications[1].name}</span>, {certifications[1].issuer}.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="md:col-span-2 md:row-span-1">
          <div className="h-full min-h-[220px] overflow-hidden">
            <Art kind="wave" alt="Hummello audio artwork" />
          </div>
        </Reveal>

        <Reveal delay={0.05}><Stat h={highlights.accuracy} /></Reveal>

        {current && (
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col bg-card p-6">
              <Zap className="text-orange" size={20} />
              <p className="mt-6 text-xs font-semibold uppercase">Currently</p>
              <p className="mt-1 font-display text-xl font-bold leading-tight">{current.role}</p>
              <p className="text-sm text-ink/60">{current.company}</p>
              <p className="mt-auto pt-6 text-xs leading-relaxed text-ink/60">
                Languages: {languages.map((l) => l.name).join(", ")}.
              </p>
            </div>
          </Reveal>
        )}

        <Reveal delay={0.15}><Stat h={highlights.schema} /></Reveal>
      </div>
    </section>
  );
}
