"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { navLinks, profile } from "@/data/portfolio";
import SlotText from "./SlotText";

// Solid 3D extrusion: stacked hard shadows stepping down and darkening, then a soft cast shadow
const EXTRUDE = [
  ...Array.from({ length: 12 }, (_, i) => {
    const k = i / 11;
    const c = `rgb(${Math.round(120 - 95 * k)} ${Math.round(146 - 112 * k)} ${Math.round(196 - 132 * k)})`;
    return `0 ${((i + 1) * 0.0045).toFixed(4)}em 0 ${c}`;
  }),
  "0 0.09em 0.06em rgba(3, 8, 20, 0.55)",
  "0 0.16em 0.18em rgba(3, 8, 20, 0.35)",
].join(", ");

export default function Footer() {
  const name = profile.firstName.toUpperCase();

  // 3D tilt that follows the mouse
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [14, -14]), { stiffness: 90, damping: 16 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-18, 18]), { stiffness: 90, damping: 16 });
  const glowX = useTransform(mx, (v) => `${50 + v * 60}%`);
  const glow = useTransform(glowX, (x) => `radial-gradient(ellipse 45% 70% at ${x} 55%, rgba(159,179,214,0.35), transparent 70%)`);
  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const cls = "display select-none text-center text-[24vw] leading-[0.8] sm:text-[22vw]";

  return (
    <footer
      className="relative z-10 overflow-hidden px-5 pt-16 text-white sm:px-10"
      style={{ background: "linear-gradient(180deg,#1e3a6e 0%,#16305d 60%,#0d1f42 100%)" }}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <p className="max-w-xs text-sm font-semibold uppercase leading-relaxed">{profile.heroIntro}</p>
          <ul className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} data-underline-link>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* the big 3D name */}
        <div onPointerMove={onMove} onPointerLeave={onLeave} className="relative mt-12 pb-[3vw]" style={{ perspective: "900px" }}>
          {/* spotlight that follows the tilt */}
          <motion.div aria-hidden style={{ backgroundImage: glow }} className="pointer-events-none absolute -inset-x-10 -inset-y-6" />
          {/* ground shadow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-[8%] bottom-0 h-[4vw] rounded-[50%] bg-black/40 blur-2xl"
          />

          <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} className="relative">
            {/* extrusion: a solid copy behind the reels, fading in once they've landed */}
            <motion.p
              aria-hidden
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: 1.9, duration: 0.6 }}
              className={`${cls} absolute inset-0`}
              style={{ color: "#7892c4", textShadow: EXTRUDE, transform: "translateZ(-1px)" }}
            >
              {Array.from(name).map((c, i) => (
                <span key={i} className="inline-block align-bottom" style={{ height: "1em", lineHeight: "1em" }}>
                  {c}
                </span>
              ))}
            </motion.p>

            {/* slot-machine name on top: reels respin every time the footer scrolls into view */}
            <SlotText as="p" inView repeat grade stagger={0.09} text={name} className={`${cls} relative`} />
          </motion.div>
        </div>

        <div className="flex flex-col justify-between gap-2 border-t border-white/25 py-6 text-xs sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <a href="#top" data-underline-link>
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
