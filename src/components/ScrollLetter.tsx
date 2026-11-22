"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { profile, storyFile } from "@/data/portfolio";

/**
 * The letter, told while the screen is pinned:
 * the section sticks in place and the story plays like slides as you scroll.
 * Each slide pops in, its words light up one by one, then it floats away for the next.
 */

type Slide = { kind: "greeting" | "para"; text: string };

const slides: Slide[] = [
  { kind: "greeting", text: storyFile.greeting },
  ...storyFile.letter.map((text) => ({ kind: "para" as const, text })),
];
const N = slides.length;
const keywords = new Set(storyFile.highlights.map((w) => w.toLowerCase()));
const clean = (w: string) => w.toLowerCase().replace(/[.,:;!?'’"]+$/g, "").replace(/'s$/, "");

function Word({ word, p, from, to }: { word: string; p: MotionValue<number>; from: number; to: number }) {
  const opacity = useTransform(p, [from, to], [0.1, 1]);
  const y = useTransform(p, [from, to], [18, 0]);
  const blur = useTransform(p, [from, to], [6, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  const hot = keywords.has(clean(word));
  return (
    <motion.span style={{ opacity, y, filter }} className={`inline-block will-change-transform ${hot ? "text-accent" : ""}`}>
      {word}&nbsp;
    </motion.span>
  );
}

function SlideView({ slide, i, p }: { slide: Slide; i: number; p: MotionValue<number> }) {
  const start = i / N;
  const end = (i + 1) / N;
  const span = end - start;
  const last = i === N - 1;

  // pop in, hold, float away (the first starts visible, the last stays)
  const inAt = [start, start + span * 0.08];
  const outAt = [start + span * 0.86, end];
  const opacity = useTransform(
    p,
    i === 0 ? [0, outAt[0], outAt[1]] : last ? inAt : [...inAt, ...outAt],
    i === 0 ? [1, 1, 0] : last ? [0, 1] : [0, 1, 1, 0],
  );
  const y = useTransform(
    p,
    i === 0 ? [0, outAt[0], outAt[1]] : last ? inAt : [...inAt, ...outAt],
    i === 0 ? [0, 0, -70] : last ? [70, 0] : [70, 0, 0, -70],
  );
  const scale = useTransform(p, last ? inAt : [inAt[0], inAt[1], outAt[0], outAt[1]], last ? [0.94, 1] : [0.94, 1, 1, 0.97]);
  const signOpacity = useTransform(p, [0.9, 0.97], [0, 1]);

  const words = slide.text.split(" ");
  // words light up across 8%–70% of this slide's scroll range
  const wStart = start + span * 0.08;
  const wSpan = span * 0.62;

  return (
    <motion.div style={{ opacity, y, scale }} className="absolute inset-0 flex items-center">
      {slide.kind === "greeting" ? (
        <p className="font-display text-[clamp(2.6rem,7vw,6rem)] font-bold leading-[0.95] tracking-tight">
          {words.map((w, k) => (
            <Word key={k} word={w} p={p} from={k * 0.012} to={k * 0.012 + 0.02} />
          ))}
        </p>
      ) : (
        <div>
          <p className="font-display text-[clamp(1.35rem,2.6vw,2.35rem)] font-semibold leading-[1.25] tracking-tight">
            {words.map((w, k) => {
              const from = wStart + (k / words.length) * wSpan;
              return <Word key={k} word={w} p={p} from={from} to={from + wSpan / words.length * 4} />;
            })}
          </p>
          {last && (
            <motion.p
              style={{ opacity: signOpacity }}
              className="mt-8 font-display text-3xl font-semibold italic text-accent"
            >
              — {storyFile.signOff}
            </motion.p>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default function ScrollLetter() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const counter = useTransform(scrollYProgress, (v) => String(Math.min(N, Math.floor(v * N) + 1)).padStart(2, "0"));
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
  const photoRot = useTransform(scrollYProgress, [0, 1], [-6, 4]);
  const photoY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  // Reduced motion: plain, readable letter
  if (reduce) {
    return (
      <div className="mt-16 max-w-3xl space-y-5 text-lg leading-relaxed text-ink/80">
        <p className="font-display text-4xl font-bold text-ink">{storyFile.greeting}</p>
        {storyFile.letter.map((t, i) => <p key={i}>{t}</p>)}
        <p className="font-display text-2xl font-semibold italic text-accent">— {storyFile.signOff}</p>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative mt-10" style={{ height: `${N * 115}vh` }}>
      <div className="sticky top-0 flex h-svh flex-col justify-center py-24">
        {/* header row: label + chapter counter */}
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em]">
          <span className="text-accent">The letter <span className="opacity-60">::</span></span>
          <span className="flex items-center gap-3 text-ink/55">
            <span>
              <motion.span className="text-ink">{counter}</motion.span> / {String(N).padStart(2, "0")}
            </span>
            <span className="relative h-px w-24 bg-line sm:w-40">
              <motion.span style={{ width: bar }} className="absolute inset-y-0 left-0 bg-accent" />
            </span>
          </span>
        </div>

        <div className="mt-8 grid flex-1 items-center gap-10 md:grid-cols-[270px_1fr] md:gap-16">
          {/* floating stamp photo */}
          <motion.figure style={{ rotate: photoRot, y: photoY }} className="hidden md:block">
            <div className="float-y border border-line bg-card p-2.5 pb-3 shadow-2xl shadow-black/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={storyFile.stampImage} alt={profile.name} className="aspect-[4/5] w-full object-cover grayscale-[35%]" />
              <figcaption className="mt-2.5 flex justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-ink/55">
                <span>{profile.firstName}</span>
                <span>N°01</span>
              </figcaption>
            </div>
            <p className="mt-6 font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-ink/55">
              Calicut · Kannur · Mangalore · IN
            </p>
          </motion.figure>

          {/* the slides */}
          <div className="relative h-[60svh] md:h-[56svh]">
            {slides.map((s, i) => (
              <SlideView key={i} slide={s} i={i} p={scrollYProgress} />
            ))}
          </div>
        </div>

        {/* scroll hint, fades as soon as you start */}
        <motion.p
          style={{ opacity: hintOpacity }}
          className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45"
        >
          <span className="inline-block h-4 w-px animate-pulse bg-ink/40" /> Keep scrolling to read
        </motion.p>
      </div>
    </div>
  );
}
