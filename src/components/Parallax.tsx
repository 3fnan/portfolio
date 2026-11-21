"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/** Moves children vertically at a different speed while scrolling. speed > 0 = slower (drifts down). */
export default function Parallax({ children, speed = 60, className }: { children: React.ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
