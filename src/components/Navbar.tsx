"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { navLinks, profile } from "@/data/portfolio";

type LenisLike = { stop(): void; start(): void };
const lenis = () => (window as unknown as { __lenis?: LenisLike }).__lenis;

export default function Navbar({ base = "", solid = false }: { base?: string; solid?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(solid ? window.scrollY > 40 : window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  useEffect(() => {
    if (open) lenis()?.stop();
    else lenis()?.start();
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const links = navLinks.map((l) => ({ ...l, href: base + l.href }));
  const short = links.filter((l) => ["#about", "#services", "#work", "#contact"].some((h) => l.href.endsWith(h)));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
          scrolled ? "bg-paper/85 text-ink backdrop-blur-md" : "text-white"
        }`}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 sm:px-10">
          <a href={base + "#top"} className="font-display text-lg font-bold tracking-tight">
            {profile.brand}
            <sup className="ml-0.5 text-[10px]">®</sup>
          </a>
          <ul className="hidden items-center gap-14 text-sm md:flex">
            {short.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="group relative">
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-5">
            <a
              href={profile.resume}
              target="_blank"
              className={`hidden border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition sm:block ${
                scrolled ? "border-ink hover:bg-ink hover:text-white" : "border-white/70 hover:bg-white hover:text-orange"
              }`}
            >
              Resume ↓
            </a>
            <button aria-label="Open menu" onClick={() => setOpen(true)} className="flex h-8 w-9 flex-col justify-center gap-[7px]">
              <span className="block h-[2px] w-full bg-current" />
              <span className="block h-[2px] w-full bg-current" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 overflow-y-auto bg-[#0c0909] text-white"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 sm:px-10">
              <span className="font-display text-lg font-bold">
                {profile.brand}
                <sup className="ml-0.5 text-[10px]">®</sup>
              </span>
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="relative h-9 w-9">
                <span className="absolute left-0 top-1/2 h-[2px] w-full rotate-45 bg-white" />
                <span className="absolute left-0 top-1/2 h-[2px] w-full -rotate-45 bg-white" />
              </button>
            </div>

            <div className="mx-auto grid max-w-[1400px] gap-12 px-5 pb-12 pt-6 sm:px-10 lg:grid-cols-[1.4fr_1fr]">
              <ul>
                {links.map((l, i) => (
                  <li key={l.href} className="overflow-hidden border-b border-white/10">
                    <motion.a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between py-2"
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.35 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span className="display text-[clamp(2.5rem,7vw,5rem)] transition-colors duration-300 group-hover:text-orange">
                        {l.label}
                      </span>
                      <span className="text-3xl font-light transition-transform duration-300 group-hover:rotate-90">+</span>
                    </motion.a>
                  </li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col justify-between gap-10 text-sm"
              >
                <div className="space-y-8">
                  <div>
                    <p className="text-white/50">Contact phone</p>
                    <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="mt-1 block text-lg">{profile.phone}</a>
                  </div>
                  <div>
                    <p className="text-white/50">Contact mail</p>
                    <a href={`mailto:${profile.email}`} className="mt-1 block break-all text-lg">{profile.email}</a>
                  </div>
                  <div>
                    <p className="text-white/50">Based in</p>
                    <p className="mt-1 text-lg">{profile.location}</p>
                  </div>
                  <p className="max-w-xs text-white/60">{profile.lookingFor}</p>
                </div>
                <div className="flex gap-3">
                  {[{ I: FaGithub, h: profile.socials.github, l: "GitHub" }, { I: FaLinkedinIn, h: profile.socials.linkedin, l: "LinkedIn" }].map(({ I, h, l }) => (
                    <a key={l} aria-label={l} href={h} target="_blank" className="grid h-10 w-10 place-items-center rounded-full border border-white/20 transition hover:bg-orange hover:border-orange">
                      <I size={16} />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
