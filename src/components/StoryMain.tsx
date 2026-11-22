"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Ambient from "./Ambient";

/**
 * Wraps every section below the hero in ONE continuous surface:
 * a single drifting background (fixed, clipped to this area) and a story "spine" on the left
 * that fills as you read, so the sections feel like chapters of the same page.
 */
export default function StoryMain({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const fill = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    ref.current.style.setProperty("--mx", `${e.clientX}px`);
    ref.current.style.setProperty("--my", `${e.clientY}px`);
    ref.current.style.setProperty("--spot", "1");
  };

  return (
    <main
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => ref.current?.style.setProperty("--spot", "0")}
      // clip-path also clips the fixed layers inside, so they never cover the hero or footer
      className="relative z-10 bg-paper [clip-path:inset(0)]"
    >
      <div aria-hidden className="pointer-events-none fixed inset-0">
        <Ambient />
      </div>

      {/* story spine */}
      <div aria-hidden className="pointer-events-none fixed left-5 top-1/2 z-20 hidden h-[46vh] -translate-y-1/2 lg:block">
        <span className="absolute inset-y-0 left-0 w-px bg-ink/10" />
        <motion.span style={{ scaleY: fill }} className="absolute inset-y-0 left-0 w-px origin-top bg-accent" />
        <span className="absolute -left-[3px] top-0 h-[7px] w-[7px] rounded-full bg-accent" />
        <span className="absolute -left-[3px] bottom-0 h-[7px] w-[7px] rounded-full border border-ink/30 bg-paper" />
      </div>

      <div className="relative z-10">{children}</div>
    </main>
  );
}
