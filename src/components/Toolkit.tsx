"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { skills } from "@/data/portfolio";
import ChapterHead from "./ChapterHead";

/**
 * The toolkit as pure type, no cards: each group is one big line that slides sideways
 * as you scroll (alternating directions). Hovering a tool lights it up.
 */
function Row({ group, items, i, p }: { group: string; items: string[]; i: number; p: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const dir = i % 2 === 0 ? -1 : 1;
  const x = useTransform(p, [0, 1], [`${dir * -6}%`, `${dir * 6}%`]);
  return (
    <div className="grid items-baseline gap-2 border-b border-line py-6 md:grid-cols-[180px_1fr] md:gap-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">
        <span className="text-accent">{String(i + 1).padStart(2, "0")}</span> {group}
      </p>
      <div className="overflow-hidden">
        <motion.p style={{ x }} className="whitespace-nowrap font-display text-[clamp(1.8rem,4.6vw,4rem)] font-bold uppercase leading-none tracking-tight">
          {items.map((t, k) => (
            <span key={t}>
              <span className="cursor-default text-ink/25 transition-colors duration-300 hover:text-accent">{t}</span>
              {k < items.length - 1 && <span className="mx-[0.35em] text-ink/15">/</span>}
            </span>
          ))}
        </motion.p>
      </div>
    </div>
  );
}

export default function Toolkit() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-28 sm:px-10">
      <ChapterHead
        n={6}
        label="Tools I use"
        title="My | toolkit"
        lead="And these are the tools that got me here, plus the ones I'm still getting better at."
      />
      <div ref={ref} className="mt-16 border-t border-ink">
        {skills.map((g, i) => (
          <Row key={g.group} group={g.group} items={g.items} i={i} p={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
