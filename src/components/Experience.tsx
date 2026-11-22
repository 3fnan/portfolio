"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { education, experience } from "@/data/portfolio";
import ChapterHead from "./ChapterHead";

/**
 * "Where I've learned" as a journey you travel sideways: the section pins and scrolling
 * moves along a timeline, from where I started to where I am now. Each stop lights up as it reaches focus.
 */
type Stop = { when: string; year: string; place: string; role: string; where: string; text: string; points: string[]; now?: boolean };

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
// "Aug 2026 – Sep 2026" -> sortable number for the start date
const startOf = (period: string) => {
  const m = period.toLowerCase().match(/([a-z]{3})[a-z]*\s+(\d{4})/);
  return m ? Number(m[2]) * 12 + MONTHS.indexOf(m[1]) : 0;
};

// Oldest first: where I started (college) → internships → where I am now
const stops: Stop[] = [
  {
    when: education.period,
    year: education.period.slice(0, 4),
    place: "Sahyadri College",
    role: "B.E. Computer Science (AI & ML)",
    where: education.location,
    text: "Where it all began: the degree that got me curious about how machines learn.",
    points: [],
  },
  ...[...experience]
    .sort((a, b) => startOf(a.period) - startOf(b.period))
    .map((e) => ({
      when: e.period,
      year: (e.period.match(/\d{4}/) ?? [""])[0],
      place: e.company,
      role: e.role,
      where: e.location,
      text: e.summary,
      points: e.points,
      now: e.current,
    })),
];

function StopCard({ s, i, p }: { s: Stop; i: number; p: MotionValue<number> }) {
  // each stop is "in focus" around its share of the scroll
  const c = stops.length === 1 ? 0.5 : i / (stops.length - 1);
  // keyframe positions must stay inside 0–1 (the animation runs on the browser's scroll timeline)
  const at = (v: number) => Math.min(1, Math.max(0, v));
  const lift = useTransform(p, [at(c - 0.35), c, at(c + 0.35)], [40, 0, 40]);
  const opacity = useTransform(p, [at(c - 0.4), c, at(c + 0.4)], [0.7, 1, 0.7]);
  const dot = useTransform(p, [at(c - 0.08), c], [0, 1]);

  return (
    <motion.article style={{ y: lift, opacity }} className="relative w-[78vw] shrink-0 pt-14 sm:w-[46vw] lg:w-[30vw]">
      {/* node on the line */}
      <span className="absolute left-0 top-0 grid h-5 w-5 -translate-y-1/2 place-items-center rounded-full border border-ink/25 bg-paper">
        <motion.span style={{ scale: dot }} className="h-2.5 w-2.5 rounded-full bg-accent" />
      </span>
      <p className="font-display text-[clamp(4rem,9vw,8rem)] font-extrabold leading-none tracking-tighter text-ink/[0.1]">{s.year}</p>
      <div className="-mt-6 sm:-mt-10">
        <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink/70">
          {s.when}
          {s.now && <span className="rounded-full bg-accent px-2 py-0.5 text-[9px] text-white">Now</span>}
        </p>
        <h3 className="mt-2 font-display text-3xl font-bold leading-tight tracking-tight text-ink">{s.place}</h3>
        <p className="mt-1 text-sm font-medium text-accent">
          {s.role} <span className="text-ink/65">· {s.where}</span>
        </p>
        <p className="mt-4 max-w-sm leading-relaxed text-ink/85">{s.text}</p>
        {s.points.length > 0 && (
          <ul className="mt-4 max-w-sm space-y-1.5 text-sm text-ink/75">
            {s.points.map((pt) => (
              <li key={pt} className="flex gap-2">
                <span className="mt-2.5 h-px w-3 shrink-0 bg-ink/45" />
                {pt}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.article>
  );
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // slide the track left by exactly its overflow, so the last stop ends fully in view
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  useEffect(() => {
    const measure = () => {
      const el = track.current;
      if (el) setDistance(Math.max(0, el.scrollWidth - el.clientWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    <section id="experience" className="relative">
      <div className="mx-auto max-w-[1400px] px-5 pt-28 sm:px-10">
        <ChapterHead
          n={4}
          label="My journey"
          title="Where I've | learned"
          lead="Building on my own only taught me so much. These are the places that taught me the rest, from where I started to where I am now."
        />
      </div>

      <div ref={ref} style={{ height: reduce ? "auto" : `${stops.length * 70}vh` }} className="relative">
        <div className={`${reduce ? "py-16" : "sticky top-0 h-svh"} flex flex-col justify-center overflow-hidden`}>
          <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-10">
            {/* the line you travel along */}
            <div className="absolute inset-x-5 top-0 h-px bg-ink/10 sm:inset-x-10">
              <motion.div style={{ scaleX: scrollYProgress }} className="h-full origin-left bg-accent" />
            </div>
            <motion.div ref={track} style={reduce ? undefined : { x }} className={`flex gap-[6vw] ${reduce ? "flex-wrap" : ""}`}>
              {stops.map((s, i) => (
                <StopCard key={s.place + s.when} s={s} i={i} p={scrollYProgress} />
              ))}
            </motion.div>
          </div>
          {!reduce && (
            <p className="mx-auto mt-12 w-full max-w-[1400px] px-5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/60 sm:px-10">
              Keep scrolling to travel → {stops.length} stops
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
