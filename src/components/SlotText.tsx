"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

/**
 * Slot-machine text: every character is a reel of random characters that spins
 * and lands on the real one, reels stopping left to right with a small settle.
 *
 * The spin is a pure CSS animation (.slot-reel in globals.css): it starts on first paint,
 * before JavaScript loads, runs on the GPU (transform only) and never re-renders React.
 * - `delay` is measured from page load (or from scrolling into view with `inView`)
 * - `inView`: reels wait (paused) until the word scrolls into view
 * - `grade`: shaded gradient letters; the landed letters get a light sweep
 * Reels are seeded, so server and browser render the same characters.
 */
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS = "0123456789";

function seeded(i: number, k: number) {
  const x = Math.sin(i * 97.13 + k * 13.37) * 43758.5453;
  return x - Math.floor(x);
}

export default function SlotText({
  text,
  className = "",
  as: Tag = "span",
  delay = 0,
  stagger = 0.11,
  inView = false,
  grade = false,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
  delay?: number;
  stagger?: number;
  inView?: boolean;
  grade?: boolean;
}) {
  // watch the whole word (a reel is a tall strip that's mostly hidden)
  const ref = useRef<HTMLElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.3 });
  const waiting = inView && !seen;

  const chars = Array.from(text);
  const durOf = (i: number) => 1.25 + i * stagger * 1.6;
  const landed = delay + (chars.length - 1) * stagger + durOf(chars.length - 1);

  return (
    <Tag ref={ref as React.Ref<never>} className={`${className} ${waiting ? "slot-wait" : ""}`} aria-label={text}>
      {chars.map((ch, i) => {
        if (ch === " ") return <span key={i}>&nbsp;</span>;
        const pool = /\d/.test(ch) ? DIGITS : /[A-Za-z]/.test(ch) ? LETTERS : "";
        if (!pool) return <span key={i} aria-hidden>{ch}</span>;
        const spins = 12 + i * 3; // later reels spin longer, so they stop one after another
        const reel = Array.from({ length: spins }, (_, k) => pool[Math.floor(seeded(i, k) * pool.length)]);
        reel.push(ch);
        return (
          <span key={i} aria-hidden className="relative inline-block overflow-hidden align-bottom" style={{ height: "1em", lineHeight: "1em" }}>
            {/* invisible copy keeps the correct letter width */}
            <span className="invisible">{ch}</span>
            <span
              className="slot-reel"
              style={
                {
                  "--end": -(reel.length - 1),
                  "--dur": `${durOf(i).toFixed(2)}s`,
                  "--delay": `${(delay + i * stagger).toFixed(2)}s`,
                } as React.CSSProperties
              }
            >
              {reel.map((c, k) => {
                const last = k === reel.length - 1;
                return (
                  <span
                    key={k}
                    className={`block ${grade ? "slot-grade" : ""} ${grade && last ? "slot-sheen" : ""}`}
                    style={
                      grade && last
                        ? ({ height: "1em", "--i": i, "--sheen-delay": `${landed.toFixed(2)}s` } as React.CSSProperties)
                        : { height: "1em" }
                    }
                  >
                    {c}
                  </span>
                );
              })}
            </span>
          </span>
        );
      })}
    </Tag>
  );
}
