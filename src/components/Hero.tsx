"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { profile, projects } from "@/data/portfolio";
import Art from "./Art";
import BlurText from "./BlurText";
import Crosshair from "./Crosshair";

const ease = [0.22, 1, 0.36, 1] as const;
const up = (delay: number) => ({
  initial: { opacity: 0, y: 30, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1, delay, ease },
});

export default function Hero() {
  const { scrollY } = useScroll();
  // As the page scrolls, the hero zooms in and blurs while the next section slides over it
  const scale = useTransform(scrollY, [0, 900], [1, 1.25]);
  const blur = useTransform(scrollY, [0, 900], ["blur(0px)", "blur(10px)"]);
  const watermarkX = useTransform(scrollY, [0, 900], [0, -120]);
  const featured = projects[0];

  return (
    <section id="top" className="sticky top-0 h-svh min-h-[640px] overflow-hidden bg-orange text-white">
      <motion.div style={{ scale, filter: blur }} className="absolute inset-0 origin-[50%_40%]">
        {/* grid lines + crosshairs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 text-white/50">
          {[18, 50, 82].map((x) => (
            <span key={x} className="absolute inset-y-0 w-px bg-white/10" style={{ left: `${x}%` }} />
          ))}
          {[34, 66].map((y) => (
            <span key={y} className="absolute inset-x-0 h-px bg-white/10" style={{ top: `${y}%` }} />
          ))}
          {[18, 82].flatMap((x) =>
            [34, 66].map((y) => (
              <span key={`${x}-${y}`} className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
                <Crosshair className="-translate-x-1/2 -translate-y-1/2" />
              </span>
            )),
          )}
        </div>

        {/* faded watermark */}
        <motion.p
          style={{ x: watermarkX }}
          aria-hidden
          className="display pointer-events-none absolute left-1/2 top-[4%] -translate-x-1/2 select-none whitespace-nowrap text-[22vw] text-white/[0.12]"
          initial={{ opacity: 0, filter: "blur(20px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.6, ease }}
        >
          {profile.firstName}
        </motion.p>

        {/* portrait */}
        <motion.div
          className="absolute bottom-0 left-1/2 h-[82%] w-[min(92vw,620px)] -translate-x-1/2 md:left-[54%]"
          initial={{ opacity: 0, y: 80, scale: 1.08 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.15, ease }}
        >
          {profile.photo ? (
            // White/light studio backgrounds melt into the orange via multiply
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.photo}
              alt={profile.name}
              className="h-full w-full object-contain object-bottom mix-blend-multiply [filter:contrast(1.08)_saturate(1.05)]"
            />
          ) : (
            <PortraitPlaceholder />
          )}
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-orange to-transparent" />
        </motion.div>
      </motion.div>

      {/* foreground content (not blurred) */}
      <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-between px-5 pb-10 pt-28 sm:px-10 md:pb-14">
        <div className="max-w-[300px]">
          <motion.span {...up(0.5)} className="mb-4 inline-flex items-center gap-2 bg-white/15 px-3 py-1 text-[11px] font-semibold backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-300" />
            </span>
            {profile.availability}
          </motion.span>
          <motion.p {...up(0.6)} className="text-xs font-semibold uppercase leading-relaxed tracking-wide sm:text-sm">
            {profile.heroIntro}
          </motion.p>
          <motion.div {...up(0.75)} className="mt-6 flex flex-wrap gap-2">
            <a href="#work" className="bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-orange transition hover:bg-ink hover:text-white">
              See case studies
            </a>
            <a href="#contact" className="border border-white/70 px-4 py-2.5 text-xs font-bold uppercase tracking-wide transition hover:bg-white hover:text-orange">
              Hire me
            </a>
          </motion.div>
        </div>

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.p {...up(0.9)} className="mb-2 text-sm font-semibold">©{new Date().getFullYear()}</motion.p>
            <BlurText
              as="h1"
              by="letter"
              onLoad
              delay={0.5}
              text={profile.firstName.toUpperCase()}
              className="display text-[clamp(4rem,15vw,13rem)] drop-shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
            />
          </div>

          <motion.a
            {...up(1.1)}
            href="#contact"
            className="group flex w-full max-w-[300px] items-center gap-3 bg-ink p-2.5 pr-3 text-white sm:w-[300px]"
          >
            <span className="h-16 w-16 shrink-0 overflow-hidden bg-orange">
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
            <span className="grid h-8 w-8 place-items-center self-end bg-white text-ink transition group-hover:bg-orange group-hover:text-white">
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
        transition={{ duration: 1.1, delay: 0.8, ease }}
        whileHover={{ y: -6 }}
        className="absolute right-[10%] top-[26%] hidden w-44 bg-white p-2 text-ink shadow-2xl shadow-black/20 lg:block"
      >
        <div className="aspect-[4/4.4] overflow-hidden">
          <Art kind={featured.art} src={featured.image} alt={featured.title} />
        </div>
        <div className="mt-2 flex items-center justify-between bg-black/5 px-2 py-1.5 text-[10px] font-medium">
          <span><span className="text-orange">✳</span> {featured.title.toUpperCase()}</span>
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
