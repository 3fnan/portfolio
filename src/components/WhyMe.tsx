"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight, Zap } from "lucide-react";
import { certifications, experience, highlights, languages } from "@/data/portfolio";
import Art from "./Art";
import ChapterHead from "./ChapterHead";
import Counter from "./Counter";

/**
 * "Small wins so far": the tiles fly in from every side of the screen
 * (left, right, top, bottom), tilted and scaled down, and lock into place together
 * as the section scrolls into view.
 */
type From = { x: string; y: string; r: number };

function Fly({ p, from, className = "", children }: { p: MotionValue<number>; from: From; className?: string; children: React.ReactNode }) {
  const x = useTransform(p, [0, 1], [from.x, "0vw"]);
  const y = useTransform(p, [0, 1], [from.y, "0vh"]);
  const rotate = useTransform(p, [0, 1], [from.r, 0]);
  const scale = useTransform(p, [0, 1], [0.82, 1]);
  const opacity = useTransform(p, [0, 0.35, 1], [0, 1, 1]);
  return (
    <motion.div style={{ x, y, rotate, scale, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

export default function WhyMe() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.25"] });
  const still = useTransform(scrollYProgress, () => 1);
  const p = reduce ? still : scrollYProgress;

  const current = experience.find((e) => e.current);
  const cert = certifications[0];
  const numbers = [highlights.apis, highlights.accuracy, highlights.schema];

  return (
    <section className="mx-auto max-w-[1400px] overflow-x-clip px-5 py-28 sm:px-10">
      <ChapterHead
        n={5}
        label="A few highlights"
        title="Small wins | so far"
        lead="Along the way, a few things went right. Here are the ones I'm proudest of."
      />

      <div ref={ref} className="mt-16 grid gap-3 md:grid-cols-4">
        {/* the numbers, together in one panel (from the left) */}
        <Fly p={p} from={{ x: "-60vw", y: "8vh", r: -8 }} className="md:col-span-3">
          <div className="grid h-full divide-y divide-line bg-card sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {numbers.map((h) => (
              <div key={h.label} className="flex flex-col p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{h.label}</p>
                <Counter value={h.value} suffix={h.suffix} className="display mt-6 text-[clamp(3rem,6vw,4.5rem)]" />
                <p className="mt-auto pt-6 text-xs leading-relaxed text-ink/60">{h.text}</p>
              </div>
            ))}
          </div>
        </Fly>

        {/* certificate (from the right) */}
        <Fly p={p} from={{ x: "60vw", y: "-6vh", r: 10 }} className="md:row-span-2">
          <div
            className="relative flex h-full min-h-[360px] flex-col justify-between overflow-hidden p-7 text-white"
            style={{ background: "linear-gradient(170deg,#12161d 0%,#1a2742 55%,#3b5d99 140%)" }}
          >
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent-soft">Certified ::</p>
              <p className="mt-6 font-display text-2xl font-bold leading-tight">{cert.name}</p>
              <p className="mt-2 text-sm text-white/60">
                {cert.issuer} · {cert.year}
              </p>
              {cert.url && (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 border-b border-white/40 pb-0.5 text-xs font-semibold uppercase tracking-wide hover:border-white"
                >
                  Verify certificate <ArrowUpRight size={14} />
                </a>
              )}
            </div>
            <ul className="space-y-2 text-sm leading-relaxed text-white/80">
              {certifications.slice(1).map((c) => (
                <li key={c.name}>
                  Plus <span className="font-semibold text-white">{c.name}</span>, {c.issuer}.
                </li>
              ))}
            </ul>
          </div>
        </Fly>

        {/* Hummello artwork (from below) */}
        <Fly p={p} from={{ x: "-10vw", y: "50vh", r: 6 }} className="md:col-span-2">
          <div className="h-full min-h-[220px] overflow-hidden">
            <Art kind="flute" src="/projects/hummello.webp" alt="Hummello: humming turned into bansuri audio" />
          </div>
        </Fly>

        {/* currently (from above) */}
        {current && (
          <Fly p={p} from={{ x: "20vw", y: "-45vh", r: -12 }}>
            <div className="flex h-full flex-col bg-card p-7">
              <Zap className="text-accent" size={20} />
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/50">Currently</p>
              <p className="mt-1 font-display text-xl font-bold leading-tight">{current.role}</p>
              <p className="text-sm text-ink/60">{current.company}</p>
              <p className="mt-auto pt-6 text-xs leading-relaxed text-ink/60">
                Languages: {languages.map((l) => l.name).join(", ")}.
              </p>
            </div>
          </Fly>
        )}
      </div>
    </section>
  );
}
