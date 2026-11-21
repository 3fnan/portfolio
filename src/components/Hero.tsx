"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Download, MapPin } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { profile, stats } from "@/data/portfolio";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-4 pb-16 pt-32 sm:pt-40">
      <div className="grain pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div {...fade(0)} className="mb-8 flex flex-wrap items-center gap-3">
          {profile.available && (
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Open to opportunities
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 text-sm text-muted">
            <MapPin size={14} /> {profile.location}
          </span>
        </motion.div>

        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <motion.p {...fade(0.1)} className="mb-3 font-display text-xl text-muted sm:text-2xl">
              Hi, I&apos;m {profile.firstName} 👋
            </motion.p>
            <motion.h1
              {...fade(0.2)}
              className="font-display text-[clamp(2.75rem,9vw,7.5rem)] font-bold leading-[0.92] tracking-tight"
            >
              AI/ML &amp; Backend
              <br />
              <span className="inline-flex items-center gap-4">
                <span className="text-accent">Engineer</span>
                <ArrowDownRight className="hidden h-[0.7em] w-[0.7em] text-muted sm:block" strokeWidth={1.5} />
              </span>
            </motion.h1>
            <motion.p {...fade(0.35)} className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
              {profile.tagline}
            </motion.p>

            <motion.div {...fade(0.45)} className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 font-medium text-accent-fg transition hover:gap-3"
              >
                View my work <ArrowUpRight size={18} />
              </a>
              <a
                href={profile.resume}
                target="_blank"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 font-medium transition hover:border-fg"
              >
                <Download size={18} /> Resume
              </a>
              <div className="flex gap-2">
                <a
                  aria-label="GitHub"
                  href={profile.socials.github}
                  target="_blank"
                  className="grid h-12 w-12 place-items-center rounded-full border border-border transition hover:bg-fg hover:text-bg"
                >
                  <FaGithub size={18} />
                </a>
                <a
                  aria-label="LinkedIn"
                  href={profile.socials.linkedin}
                  target="_blank"
                  className="grid h-12 w-12 place-items-center rounded-full border border-border transition hover:bg-fg hover:text-bg"
                >
                  <FaLinkedinIn size={18} />
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 3 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto hidden h-80 w-64 lg:block"
          >
            <div className="absolute inset-0 rotate-[-8deg] rounded-[2rem] bg-accent" />
            <div className="relative grid h-full w-full place-items-center overflow-hidden rounded-[2rem] border border-border bg-surface-2">
              {profile.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.photo} alt={profile.name} className="h-full w-full object-cover" />
              ) : (
                <span className="font-display text-8xl font-bold text-muted/40">{profile.initials}</span>
              )}
            </div>
            <div className="absolute -bottom-5 -left-10 rounded-2xl border border-border bg-surface px-4 py-3 shadow-xl">
              <p className="text-xs text-muted">Oracle Certified</p>
              <p className="font-display text-sm font-semibold">GenAI Professional</p>
            </div>
          </motion.div>
        </div>

        <motion.dl
          {...fade(0.6)}
          className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-surface p-6">
              <dt className="font-display text-4xl font-bold">{s.value}</dt>
              <dd className="mt-1 text-sm text-muted">{s.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
