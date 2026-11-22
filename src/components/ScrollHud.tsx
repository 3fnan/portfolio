"use client";

import { useEffect, useState } from "react";

/** Small monospace status pill (like the reference's status strip): scroll % and current section. */
export default function ScrollHud() {
  const [pct, setPct] = useState(0);
  const [section, setSection] = useState("intro");
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.round((window.scrollY / max) * 100) : 0);
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
      let current = 0;
      els.forEach((el, i) => {
        if (el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = i;
      });
      setIdx(current);
      setSection(els[current]?.dataset.section ?? "intro");
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-5 left-5 z-40 hidden items-center gap-3 bg-ink/85 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/70 backdrop-blur-md md:flex"
    >
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-soft" />
      <span>
        N°<span className="text-white">{String(idx + 1).padStart(2, "0")}</span>
      </span>
      <span className="text-white/30">/</span>
      <span>
        SEC::<span className="text-white">{section}</span>
      </span>
      <span className="text-white/30">/</span>
      <span className="tabular-nums">
        SCROLL::<span className="text-white">{String(pct).padStart(3, "0")}%</span>
      </span>
      <span className="relative ml-1 h-px w-16 bg-white/15">
        <span className="absolute inset-y-0 left-0 bg-accent-soft" style={{ width: `${pct}%` }} />
      </span>
    </div>
  );
}
