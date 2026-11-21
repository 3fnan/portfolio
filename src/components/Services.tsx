import { services } from "@/data/portfolio";
import Art from "./Art";
import BlurText from "./BlurText";
import Reveal from "./Reveal";
import Tag from "./Tag";

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-[1400px] px-5 py-28 sm:px-10">
      <div className="grid gap-6 md:grid-cols-[200px_1fr]">
        <Reveal><Tag>What I do</Tag></Reveal>
        <BlurText text="Powerful engineering | for real products" className="display text-[clamp(2.6rem,6vw,5rem)]" />
      </div>

      <ol className="mt-20">
        {services.map((s, i) => (
          <Reveal key={s.title}>
            <li className="group grid gap-6 border-t border-line py-10 md:grid-cols-[200px_1fr_320px]">
              <span className="text-xs font-semibold"><span className="text-orange">✳</span> {String(i + 1).padStart(3, "0")}</span>
              <div>
                <h3 className="display text-3xl transition-colors duration-300 group-hover:text-orange sm:text-4xl">{s.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/60">{s.text}</p>
                <div className="mt-6 flex max-w-md flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span key={t} className="bg-black/[0.05] px-2.5 py-1.5 text-[11px] font-medium">{t}</span>
                  ))}
                </div>
              </div>
              <div className="aspect-[4/3] overflow-hidden">
                <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110">
                  <Art kind={s.art} src={s.image} alt={s.title} />
                </div>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
