"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { profile, projects } from "@/data/portfolio";
import Art from "./Art";
import ChapterHead from "./ChapterHead";
import Reveal from "./Reveal";
import RollText from "./RollText";

/**
 * "Things I've built" as an index, like the reference site's work list:
 * one row per project; on desktop a preview card follows the cursor while you hover.
 */
export default function Projects() {
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 26 });
  const sy = useSpring(y, { stiffness: 220, damping: 26 });
  const rot = useSpring(0, { stiffness: 120, damping: 14 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    rot.set(Math.max(-8, Math.min(8, (e.clientX - x.get()) * 0.4)));
    x.set(e.clientX);
    y.set(e.clientY);
  };

  return (
    <section id="work" className="mx-auto max-w-[1400px] px-5 py-28 sm:px-10" onPointerMove={onMove}>
      <ChapterHead
        n={3}
        label="Projects"
        title="Things I've | built"
        lead="All that learning had to go somewhere. These are the things I built along the way."
      />

      <ul className="mt-16 border-t border-ink" onPointerLeave={() => setActive(null)}>
        {projects.map((p, i) => {
          const href = p.live || `/work/${p.slug}`;
          const external = Boolean(p.live);
          const row = (
            <>
              <span className="font-mono text-xs text-ink/40">{String(i + 1).padStart(2, "0")}</span>
              <span className="min-w-0">
                <span className="block font-display text-[clamp(1.6rem,4vw,3.4rem)] font-bold uppercase leading-none tracking-tight transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-3">
                  <RollText text={p.title} />
                </span>
                <span className="mt-2 block max-w-xl text-sm text-ink/60">{p.tagline}</span>
                {/* phones get the image inline */}
                <span className="mt-4 block aspect-[16/10] overflow-hidden md:hidden">
                  <Art kind={p.art} src={p.image} alt={p.title} />
                </span>
              </span>
              <span className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-ink/55 md:block">
                {p.category}
              </span>
              <span className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-ink/55 md:block">{p.year}</span>
              <span className="flex items-center gap-2 justify-self-end font-mono text-[10px] uppercase tracking-[0.14em] text-ink/55">
                <span className="hidden transition-colors group-hover:text-accent lg:inline">{external ? "Live site" : "Case study"}</span>
                {/* arrow-roll: the arrow leaves top-right and a new one comes in from bottom-left */}
                <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-ink/15 transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                  <ArrowUpRight size={16} className="transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-6 group-hover:translate-x-6" />
                  <ArrowUpRight size={16} className="absolute -translate-x-6 translate-y-6 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-0 group-hover:translate-y-0" />
                </span>
              </span>
            </>
          );
          const cls =
            "roll-host relative z-10 grid grid-cols-[32px_1fr_auto] items-center gap-4 border-b border-line py-7 md:grid-cols-[48px_1fr_140px_70px_auto] md:gap-8 md:py-9";
          return (
            <Reveal key={p.slug} delay={i * 0.04}>
              <li onPointerEnter={() => setActive(i)} className="group relative">
                {/* hover wash */}
                <span
                  aria-hidden
                  className="absolute inset-0 origin-bottom scale-y-0 bg-card transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-y-100"
                />
                {external ? (
                  <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
                    {row}
                  </a>
                ) : (
                  <Link href={href} className={cls}>
                    {row}
                  </Link>
                )}
              </li>
            </Reveal>
          );
        })}
      </ul>

      {/* floating preview that follows the cursor (desktop) */}
      <motion.div
        aria-hidden
        style={{ left: sx, top: sy, rotate: rot }}
        className="pointer-events-none fixed z-30 hidden -translate-x-1/2 -translate-y-1/2 md:block"
      >
        <AnimatePresence mode="popLayout">
          {active !== null && (
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.6, clipPath: "inset(50% 50% 50% 50%)" }}
              animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="w-[380px] bg-card p-2 shadow-2xl shadow-black/25"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <Art kind={projects[active].art} src={projects[active].image} alt={projects[active].title} />
              </div>
              <div className="flex items-center justify-between px-1 pt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/60">
                <span>{projects[active].title}</span>
                <span>{projects[active].stack.slice(0, 3).join(" · ")}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <Reveal className="mt-14">
        <a
          href={profile.socials.github}
          target="_blank"
          className="roll-host group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.14em]"
        >
          <span data-underline-link>
            <RollText text="All projects on GitHub" />
          </span>
          <ArrowUpRight size={14} className="transition-transform group-hover:rotate-45" />
        </a>
      </Reveal>
    </section>
  );
}
