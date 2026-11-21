"use client";

import { motion } from "framer-motion";

type Props = {
  /** Words before "|" are dark, words after are grey — e.g. "My impact through | user experience" */
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  by?: "word" | "letter";
  delay?: number;
  onLoad?: boolean; // animate on mount instead of when scrolled into view
};

export default function BlurText({ text, className = "", as = "h2", by = "word", delay = 0, onLoad = false }: Props) {
  const [dark, grey = ""] = text.split("|").map((s) => s.trim());
  const parts = [
    ...split(grey ? dark + " " : dark, by).map((t) => ({ t, grey: false })),
    ...split(grey, by).map((t) => ({ t, grey: true })),
  ];
  const Tag = motion[as];
  const step = by === "letter" ? 0.045 : 0.08;

  return (
    <Tag
      className={className}
      initial="hidden"
      {...(onLoad ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "-80px" } })}
      aria-label={text.replace("|", "")}
    >
      {parts.map((p, i) => (
        <motion.span
          key={i}
          aria-hidden
          className={`inline-block whitespace-pre ${p.grey ? "text-grey" : ""}`}
          variants={{
            hidden: { opacity: 0, filter: "blur(14px)", y: "0.25em" },
            show: {
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              transition: { duration: 0.8, delay: delay + i * step, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {p.t}
        </motion.span>
      ))}
    </Tag>
  );
}

function split(s: string, by: "word" | "letter") {
  if (!s) return [];
  if (by === "letter") return s.split("");
  return s.split(/(?<= )/); // keep the trailing space on each word
}
