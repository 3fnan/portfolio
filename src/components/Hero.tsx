"use client";

import { useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { profile, projects } from "@/data/portfolio";
import Art from "./Art";
import Ambient from "./Ambient";
import SlotText from "./SlotText";
import { INTRO_DELAY as D, introRemaining } from "./Intro";
import RollText from "./RollText";

const ease = [0.22, 1, 0.36, 1] as const;
const up = (delay: number, base: number) => ({
  initial: { opacity: 0, y: 30, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1, delay: delay + base, ease },
});

export default function Hero() {
  // JS-driven entrances wait for whatever is left of the intro (CSS reels use D, from page load)
  const [R] = useState(introRemaining);
  const { scrollY } = useScroll();
  // As the page scrolls, the hero zooms in and blurs while the next section slides over it
  const scale = useTransform(scrollY, [0, 900], [1, 1.25]);
  const blur = useTransform(scrollY, [0, 900], ["blur(0px)", "blur(10px)"]);
  const watermarkX = useTransform(scrollY, [0, 900], [0, -120]);
  const featured = projects[0];

  // Mouse parallax: the photo drifts with the cursor, the background name drifts against it
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const photoX = useTransform(sx, (v) => v * 26);
  const photoY = useTransform(sy, (v) => v * 14);
  const photoRot = useTransform(sx, (v) => v * 3);
  const nameX = useTransform(sx, (v) => v * -46);
  const nameY = useTransform(sy, (v) => v * -18);
  const glowX = useTransform(sx, (v) => `${50 + v * 8}%`);
  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      id="top"
      data-section="intro"
      onPointerMove={onMove}
      className="sticky top-0 h-svh min-h-[640px] overflow-hidden bg-accent text-white"
      style={{ background: "linear-gradient(180deg,#24467f 0%,#1e3a6e 45%,#11244a 100%)" }}
    >
      <motion.div style={{ scale, filter: blur }} className="absolute inset-0 origin-[50%_40%]">
        {/* drifting light so the navy never sits still */}
        <Ambient tone="dark" />

        {/* light: a soft spotlight behind the portrait + darker vignette at the edges */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            left: 0,
            backgroundImage: useTransform(
              glowX,
              (x) => `radial-gradient(ellipse 38% 55% at calc(${x} + 4%) 62%, rgba(159,179,214,0.42), rgba(159,179,214,0) 70%)`,
            ),
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 85% 75% at 50% 45%, transparent 55%, rgba(5,12,28,0.55) 100%)" }}
        />

        {/* background name: outlined echo behind, gradient-shaded fill in front, soft long shadow */}
        <motion.div
          aria-hidden
          style={{ x: watermarkX }}
          className="pointer-events-none absolute inset-x-0 top-[3%] select-none"
          initial={{ opacity: 0, filter: "blur(20px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.6, delay: Math.max(0, R - 0.2), ease }}
        >
          <motion.div style={{ x: nameX, y: nameY }} className="relative flex justify-center">
            <span
              className="display absolute whitespace-nowrap text-[22vw] text-transparent"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.14)", transform: "translate(1.2vw, 1.4vw)" }}
            >
              {profile.brand}
            </span>
            <span
              className="display relative whitespace-nowrap bg-clip-text text-[22vw] text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(255,255,255,0.34) 0%, rgba(214,225,244,0.18) 45%, rgba(159,179,214,0.02) 88%)",
                filter: "drop-shadow(0 24px 40px rgba(5,12,28,0.45))",
              }}
            >
              {profile.brand}
            </span>
          </motion.div>
        </motion.div>

        {/* portrait: floats gently and follows the cursor */}
        <motion.div
          className="absolute bottom-0 left-1/2 h-[82%] w-[min(92vw,620px)] -translate-x-1/2 md:left-[54%]"
          initial={{ opacity: 0, y: 80, scale: 1.08 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, delay: R + 0.05, ease }}
        >
          <motion.div style={{ x: photoX, y: photoY, rotate: photoRot }} className="h-full w-full">
            <div className="float-y relative h-full w-full">
              {profile.photo ? (
                // The studio backdrop fades out at the edges, so the photo reads as a soft spotlight on navy
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="h-full w-full object-contain object-bottom [filter:contrast(1.06)_drop-shadow(0_30px_40px_rgba(5,12,28,0.45))]"
                  style={{
                    maskImage: "radial-gradient(ellipse 48% 52% at 50% 52%, #000 55%, transparent 98%)",
                    WebkitMaskImage: "radial-gradient(ellipse 48% 52% at 50% 52%, #000 55%, transparent 98%)",
                  }}
                />
              ) : (
                <PortraitPlaceholder />
              )}
            </div>
          </motion.div>
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#11244a] to-transparent" />
        </motion.div>
      </motion.div>

      {/* foreground content (not blurred) */}
      <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-between px-5 pb-10 pt-28 sm:px-10 md:pb-14">
        <div className="max-w-[300px]">
          <motion.p {...up(0.6, R)} className="text-xs font-semibold uppercase leading-relaxed tracking-wide sm:text-sm">
            {profile.heroIntro}
          </motion.p>
          <motion.div {...up(0.75, R)} className="mt-6 flex flex-wrap gap-2">
            <a href="#work" className="roll-host bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-accent transition hover:bg-ink hover:text-white">
              <RollText text="See my projects" />
            </a>
            <a href="#contact" className="roll-host border border-white/70 px-4 py-2.5 text-xs font-bold uppercase tracking-wide transition hover:bg-white hover:text-accent">
              <RollText text="Get in touch" />
            </a>
          </motion.div>
        </div>

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.p {...up(0.6, R)} className="mb-2 font-mono text-sm font-semibold">
              ©<SlotText text={String(new Date().getFullYear())} delay={D + 0.9} stagger={0.08} />
            </motion.p>
            {/* slot-machine name: each letter's reel spins and lands, left to right */}
            <SlotText
              as="h1"
              grade
              delay={D + 0.35}
              text={profile.firstName.toUpperCase()}
              className="display name-depth text-[clamp(4rem,15vw,13rem)]"
            />
          </div>

          <motion.a
            {...up(1.1, R)}
            href="#contact"
            className="group flex w-full max-w-[300px] items-center gap-3 bg-ink p-2.5 pr-3 text-white sm:w-[300px]"
          >
            <span className="h-16 w-16 shrink-0 overflow-hidden bg-accent">
              {profile.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.photo} alt="" className="h-full w-full object-cover object-top" />
              ) : (
                <span className="grid h-full w-full place-items-center font-display font-bold">{profile.initials}</span>
              )}
            </span>
            <span className="flex-1">
              <span className="block text-[10px] text-white/60">Let&apos;s talk</span>
              <span className="mt-1 block text-sm font-semibold">{profile.firstName}</span>
              <span className="block text-[11px] text-white/60">{profile.role}</span>
            </span>
            <span className="grid h-8 w-8 place-items-center self-end bg-white text-ink transition group-hover:bg-accent group-hover:text-white">
              <ArrowUpRight size={16} />
            </span>
          </motion.a>
        </div>
      </div>

      {/* floating featured project card */}
      <motion.a
        href={`/work/${featured.slug}`}
        initial={{ opacity: 0, y: 40, rotate: 4 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 1.1, delay: R + 0.8, ease }}
        whileHover={{ y: -6 }}
        className="absolute right-[10%] top-[26%] hidden w-44 bg-white p-2 text-ink shadow-2xl shadow-black/20 lg:block"
      >
        <div className="aspect-[4/4.4] overflow-hidden">
          <Art kind={featured.art} src={featured.image} alt={featured.title} />
        </div>
        <div className="mt-2 flex items-center justify-between bg-black/5 px-2 py-1.5 text-[10px] font-medium">
          <span><span className="text-accent">✳</span> {featured.title.toUpperCase()}</span>
          <span>/{featured.category}</span>
        </div>
      </motion.a>
    </section>
  );
}

function PortraitPlaceholder() {
  return (
    <svg viewBox="0 0 400 500" className="h-full w-full" preserveAspectRatio="xMidYMax meet" aria-label="Portrait placeholder">
      <defs>
        <linearGradient id="pp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".28" />
          <stop offset="1" stopColor="#ffffff" stopOpacity=".08" />
        </linearGradient>
      </defs>
      <ellipse cx="205" cy="190" rx="78" ry="96" fill="url(#pp)" />
      <path d="M40 500 C 50 380, 120 330, 205 325 C 290 330, 360 380, 370 500 Z" fill="url(#pp)" />
      <text x="205" y="200" textAnchor="middle" fill="#fff" fillOpacity=".55" fontSize="15" fontFamily="sans-serif">
        add public/profile.png
      </text>
    </svg>
  );
}
