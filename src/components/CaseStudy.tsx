"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Download } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { profile, type Project } from "@/data/portfolio";
import Art from "./Art";
import BlurText from "./BlurText";
import Navbar from "./Navbar";
import Reveal from "./Reveal";
import Tag from "./Tag";
import HireMe from "./HireMe";

const sections = [
  { id: "problem", label: "Problem" },
  { id: "approach", label: "Approach" },
  { id: "architecture", label: "Architecture" },
  { id: "results", label: "Results" },
];

export default function CaseStudy({ project: p, next }: { project: Project; next: Project }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgScale = useTransform(heroP, [0, 1], [1, 1.15]);
  const nav = [...sections, ...(p.learnings.length ? [{ id: "learnings", label: "Learnings" }] : [])];

  return (
    <>
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-accent" />
      <Navbar base="/" solid />
      <HireMe />

      <header ref={heroRef} className="bg-accent pt-28 text-white">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-10">
          <Link href="/#work" className="inline-flex items-center gap-2 text-sm hover:underline">
            <ArrowLeft size={16} /> All work
          </Link>
          <div className="mt-10 grid gap-10 pb-14 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div>
              <Tag className="bg-white/15 text-white">{p.context}</Tag>
              <BlurText as="h1" onLoad by="letter" text={p.title.toUpperCase()} className="display mt-5 text-[clamp(3rem,10vw,8.5rem)]" />
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-6 max-w-xl text-lg leading-relaxed text-white/90 sm:text-xl">
                {p.tagline}
              </motion.p>
            </div>
            <motion.dl initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="grid grid-cols-2 gap-px bg-white/20 text-sm">
              {[["Role", p.role], ["Timeline", p.timeline], ["Category", p.category], ["Stack", p.stack.slice(0, 4).join(", ")]].map(([k, v]) => (
                <div key={k} className="bg-accent p-4">
                  <dt className="text-xs uppercase tracking-wide text-white/60">{k}</dt>
                  <dd className="mt-1 font-medium">{v}</dd>
                </div>
              ))}
            </motion.dl>
          </div>
        </div>
        <div className="mx-auto max-w-[1400px] px-5 sm:px-10">
          <div className="aspect-[16/8] overflow-hidden">
            <motion.div style={{ scale: imgScale }} className="h-full w-full">
              <Art kind={p.art} src={p.image} alt={`${p.title} preview`} />
            </motion.div>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1400px] gap-12 px-5 py-20 sm:px-10 lg:grid-cols-[220px_1fr]">
        {/* sticky section nav */}
        <aside className="hidden lg:block">
          <nav className="sticky top-28 space-y-3 text-sm">
            {nav.map((s, i) => (
              <a key={s.id} href={`#${s.id}`} className="flex items-center gap-3 text-ink/60 transition hover:text-accent">
                <span className="text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                {s.label}
              </a>
            ))}
            <div className="space-y-2 border-t border-line pt-6">
              {p.live && <a href={p.live} target="_blank" className="flex items-center gap-2 font-medium hover:text-accent">Live site <ArrowUpRight size={14} /></a>}
              {p.github && <a href={p.github} target="_blank" className="flex items-center gap-2 font-medium hover:text-accent"><FaGithub /> Source code</a>}
            </div>
          </nav>
        </aside>

        <div className="min-w-0 space-y-28">
          <section id="problem" className="scroll-mt-28">
            <Reveal><Tag>01 · The problem</Tag></Reveal>
            <Reveal delay={0.1}><p className="mt-6 max-w-3xl font-display text-2xl font-semibold leading-snug tracking-tight sm:text-4xl">{p.problem}</p></Reveal>
          </section>

          <section id="approach" className="scroll-mt-28">
            <Reveal><Tag>02 · My approach</Tag></Reveal>
            <ol className="mt-8 grid gap-3 sm:grid-cols-2">
              {p.approach.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.08}>
                  <li className="group h-full bg-card p-7 transition-colors hover:bg-ink hover:text-white">
                    <span className="display text-5xl text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-6 font-display text-xl font-bold">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed opacity-70">{s.text}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </section>

          <section id="architecture" className="scroll-mt-28">
            <Reveal><Tag>03 · How it works</Tag></Reveal>
            <Flow steps={p.architecture} />
          </section>

          <section id="results" className="scroll-mt-28">
            <Reveal><Tag>04 · Results</Tag></Reveal>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {p.results.map((r, i) => (
                <Reveal key={r.label} delay={i * 0.1}>
                  <div className="h-full bg-card p-7">
                    <p className="display text-5xl">{r.value}</p>
                    <p className="mt-4 text-sm text-ink/60">{r.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <ul className="mt-8 space-y-3">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-3 border-b border-line pb-3"><span className="text-accent">✳</span>{h}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-2">
              {p.stack.map((s) => <span key={s} className="bg-black/[0.05] px-3 py-1.5 text-xs">{s}</span>)}
            </div>
          </section>

          {p.learnings.length > 0 && (
            <section id="learnings" className="scroll-mt-28">
              <Reveal><Tag>05 · What I learned</Tag></Reveal>
              <ul className="mt-6 space-y-4 text-lg">
                {p.learnings.map((l) => <li key={l} className="max-w-3xl leading-relaxed">{l}</li>)}
              </ul>
            </section>
          )}

          {/* conversion block */}
          <Reveal>
            <div className="flex flex-col gap-6 bg-ink p-8 text-white sm:p-12 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="display text-3xl sm:text-4xl">Want this on your team?</p>
                <p className="mt-2 text-white/60">{profile.availability}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/#contact" className="inline-flex items-center gap-2 bg-accent px-5 py-3 text-sm font-semibold">Hire me <ArrowUpRight size={16} /></Link>
                <a href={profile.resume} target="_blank" className="inline-flex items-center gap-2 border border-white/25 px-5 py-3 text-sm font-semibold"><Download size={16} /> Resume</a>
              </div>
            </div>
          </Reveal>
        </div>
      </main>

      <Link href={`/work/${next.slug}`} className="group block bg-accent text-white">
        <div className="mx-auto flex max-w-[1400px] items-end justify-between gap-6 px-5 py-16 sm:px-10">
          <div>
            <p className="text-sm uppercase tracking-wide text-white/70">Next case study</p>
            <p className="display mt-3 text-[clamp(2.5rem,8vw,7rem)] transition-transform duration-500 group-hover:translate-x-3">{next.title}</p>
          </div>
          <ArrowUpRight className="h-14 w-14 shrink-0 transition-transform duration-500 group-hover:rotate-45" />
        </div>
      </Link>
    </>
  );
}

/** Architecture diagram: boxes light up one after another as it scrolls into view */
function Flow({ steps }: { steps: string[] }) {
  return (
    <motion.ol
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="mt-8 flex flex-col items-stretch gap-2 md:flex-row md:items-center"
    >
      {steps.map((s, i) => (
        <motion.li key={s} className="flex flex-1 flex-col items-center gap-2 md:flex-row"
          variants={{ hidden: {}, show: {} }}>
          <motion.div
            variants={{
              hidden: { opacity: 0.25, y: 12, backgroundColor: "#ffffff", color: "#15181e" },
              show: { opacity: 1, y: 0, backgroundColor: i === steps.length - 1 ? "#1e3a6e" : "#15181e", color: "#ffffff",
                transition: { delay: i * 0.35, duration: 0.5 } },
            }}
            className="w-full flex-1 p-5 text-center text-sm font-semibold"
          >
            <span className="block text-[10px] font-normal opacity-60">{String(i + 1).padStart(2, "0")}</span>
            {s}
          </motion.div>
          {i < steps.length - 1 && (
            <motion.span
              aria-hidden
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: i * 0.35 + 0.25 } } }}
              className="text-xl text-accent md:-mx-1"
            >
              <span className="md:hidden">↓</span>
              <span className="hidden md:inline">→</span>
            </motion.span>
          )}
        </motion.li>
      ))}
    </motion.ol>
  );
}
