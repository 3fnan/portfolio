"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/data/portfolio";
import SlotText from "./SlotText";

/** How long the intro covers the page, measured from page load. */
export const INTRO_DELAY = 2.1;

/**
 * Seconds of intro left right now. Everything is timed from page load, so if JavaScript
 * arrives late (slow network, dev mode) the hero doesn't wait a second time.
 */
export function introRemaining() {
  if (typeof window === "undefined") return INTRO_DELAY;
  return Math.max(0, INTRO_DELAY - performance.now() / 1000);
}

type LenisLike = { stop(): void; start(): void };
const lenis = () => (window as unknown as { __lenis?: LenisLike }).__lenis;

/**
 * Opening screen for the home page: the brand spins in like a slot machine while a counter
 * runs to 100, then the panel lifts away with a curved edge and the hero rises underneath.
 * The reels, counter and bar are pure CSS (they start on first paint, never re-render);
 * JavaScript only removes the panel. A CSS failsafe (.intro-failsafe) hides it regardless.
 */
export default function Intro() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }
    lenis()?.stop();
    const t = setTimeout(() => setDone(true), introRemaining() * 1000);
    return () => {
      clearTimeout(t);
      lenis()?.start();
    };
  }, []);

  useEffect(() => {
    if (done) lenis()?.start();
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="intro"
          aria-hidden
          className="intro-failsafe fixed inset-0 z-[95] flex flex-col justify-between overflow-hidden p-6 text-white sm:p-10"
          style={{ background: "linear-gradient(180deg,#24467f 0%,#1e3a6e 50%,#11244a 100%)" }}
          exit={{ y: "-100%", borderBottomLeftRadius: "50% 18%", borderBottomRightRadius: "50% 18%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-white/55">
            <span>{profile.brand}::portfolio</span>
            <span>{profile.location}</span>
          </div>

          <div className="flex flex-col items-center">
            <SlotText
              as="p"
              grade
              delay={0.05}
              stagger={0.05}
              text={profile.brand.toUpperCase()}
              className="display name-depth text-[clamp(3.5rem,14vw,11rem)]"
            />
            <p className="intro-fade mt-4 font-mono text-[11px] uppercase tracking-[0.24em] text-white/60">{profile.role}</p>
          </div>

          <div>
            <div className="flex items-end justify-between font-mono uppercase">
              <span className="text-[11px] tracking-[0.18em] text-white/55">Loading the story</span>
              <span className="intro-count text-[clamp(2rem,5vw,3.5rem)] font-medium leading-none tabular-nums" />
            </div>
            <div className="mt-4 h-px w-full bg-white/15">
              <div className="intro-bar h-full bg-accent-soft" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
