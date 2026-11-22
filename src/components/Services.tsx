"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { services } from "@/data/portfolio";
import { SERVICE_LOGOS, TechLogo } from "./TechLogo";
import ChapterHead from "./ChapterHead";

/**
 * "What I build and am learning" as an orbit: the section pins, the skills sit on a ring
 * that turns as you scroll, and whichever one reaches the front opens up in the middle.
 */
const N = services.length;

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // one full step of the ring per skill; the front (top) slot is 0deg
  const ringRot = useTransform(scrollYProgress, [0, 1], [0, -360 * ((N - 1) / N)]);
  const counterRot = useTransform(ringRot, (r) => -r);
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(N - 1, Math.round(v * (N - 1)))));
  const s = services[active];

  return (
    <section id="services" className="relative">
      <div className="mx-auto max-w-[1400px] px-5 pt-28 sm:px-10">
        <ChapterHead
          n={2}
          label="What I work on"
          title="What I build | and am learning"
          lead="It started with curiosity. These are the four things I now spend most of my time building and learning."
        />
      </div>

      <div ref={ref} style={{ height: reduce ? "auto" : `${N * 80}vh` }} className="relative">
        <div className={`${reduce ? "py-10" : "sticky top-0 h-svh pt-20 pb-6"} flex items-center justify-center overflow-hidden`}>
          <div className="relative aspect-square" style={{ "--orb": "min(84vw, 640px, calc(100svh - 10rem))", width: "var(--orb)" } as React.CSSProperties}>
            {/* orbit rings */}
            <div aria-hidden className="absolute inset-0 rounded-full border border-ink/10" />
            <div aria-hidden className="absolute inset-[14%] rounded-full border border-dashed border-ink/10 [animation:spin-slow_60s_linear_infinite]" />
            {/* progress arc on the outer ring */}
            <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
              <motion.circle cx="50" cy="50" r="49.8" fill="none" stroke="var(--accent)" strokeWidth="0.35" style={{ pathLength: scrollYProgress }} />
            </svg>

            {/* the turning ring of skills */}
            <motion.div style={{ rotate: ringRot }} className="absolute inset-0">
              {services.map((sv, i) => {
                const angle = (i / N) * 360;
                const on = i === active;
                return (
                  <div
                    key={sv.title}
                    className="absolute left-1/2 top-1/2"
                    style={{ transform: `rotate(${angle}deg) translateY(calc(var(--orb) * -0.5)) rotate(${-angle}deg)` }}
                  >
                    {/* keep each bubble upright while the ring turns */}
                    <motion.div style={{ rotate: counterRot }} className="-translate-x-1/2 -translate-y-1/2">
                      <div
                        className={`grid place-items-center rounded-full bg-white ring-1 ring-black/5 transition-all duration-500 ${
                          on
                            ? "h-16 w-16 shadow-[0_18px_40px_-14px_rgba(21,24,30,0.45)] ring-4 ring-accent/20 sm:h-24 sm:w-24"
                            : "h-10 w-10 opacity-70 shadow-lg grayscale sm:h-14 sm:w-14"
                        }`}
                      >
                        <TechLogo name={SERVICE_LOGOS[i]} className={on ? "h-8 w-8 sm:h-12 sm:w-12" : "h-5 w-5 sm:h-7 sm:w-7"} />
                      </div>
                      <p
                        className={`mt-2 whitespace-nowrap text-center font-mono text-[10px] uppercase tracking-[0.14em] transition-opacity ${
                          on ? "text-accent opacity-100" : "opacity-0"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </p>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>

            {/* centre: the skill at the front */}
            <div className="absolute inset-[13%] flex sm:inset-[22%] items-center justify-center rounded-full bg-card/70 p-6 text-center shadow-[0_30px_80px_-30px_rgba(21,24,30,0.35)] backdrop-blur-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -24, filter: "blur(8px)" }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45">
                    {String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
                  </p>
                  <h3 className="display mt-3 text-[clamp(1.4rem,3.4vw,2.4rem)]">{s.title}</h3>
                  <p className="mx-auto mt-3 max-w-[30ch] text-sm leading-relaxed text-ink/65">{s.text}</p>
                  <div className="mx-auto mt-4 hidden max-w-[34ch] sm:flex flex-wrap justify-center gap-1.5">
                    {s.tags.map((t) => (
                      <span key={t} className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-white/70 px-2.5 py-1 text-[10px] font-medium">
                        <TechLogo name={t} className="h-3 w-3" />
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
