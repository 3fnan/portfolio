"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { enquiryTypes, profile } from "@/data/portfolio";
import BlurText from "./BlurText";
import Reveal from "./Reveal";
import RollText from "./RollText";
import { ChapterLabel } from "./ChapterHead";

// The form opens the visitor's email app with the message pre-filled.
// To receive messages without that step, swap handleSubmit for Formspree or Resend.
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [kind, setKind] = useState(enquiryTypes[0]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`${kind}: enquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  const whatsappUrl = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(profile.whatsappMessage)}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=${encodeURIComponent(
    "Hello from your portfolio"
  )}`;

  // inline "blank" inside the sentence: grows with what you type, underline glows on focus
  const blank =
    "mx-1 inline-block border-b-2 border-ink/20 bg-transparent px-1 pb-0.5 text-accent outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-ink/30 focus:border-accent focus:shadow-[0_10px_18px_-12px_rgba(30,58,110,0.55)]";
  const widthFor = (value: string, ph: string) => ({ width: `${Math.max(value.length, ph.length) + 1}ch` });
  const nextKind = () => setKind(enquiryTypes[(enquiryTypes.indexOf(kind) + 1) % enquiryTypes.length]);

  return (
    <section id="contact" className="mx-auto max-w-[1400px] px-5 py-28 sm:px-10">
      <div className="grid gap-16 lg:grid-cols-2">
        <div>
          <Reveal><ChapterLabel n={7} label="Contact" /></Reveal>
          <BlurText text="Let's | connect" className="display mt-5 text-[clamp(2.6rem,6vw,5rem)]" />
          <Reveal delay={0.05}>
            <p className="mt-6 max-w-md text-ink/70">
              That&apos;s my story so far. If you have an opportunity, a project or an idea, the next chapter could be ours. I&apos;d be glad to hear from you.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-[#25D366] px-5 py-4 text-white transition hover:bg-[#1ebe5b]"
              >
                <FaWhatsapp size={24} />
                <span className="flex-1">
                  <span className="block text-sm font-semibold">Chat on WhatsApp</span>
                  <span className="block text-xs text-white/80">Quickest way to reach me</span>
                </span>
                <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" />
              </a>
              <a
                href={gmailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-ink px-5 py-4 text-white transition hover:bg-accent"
              >
                <SiGmail size={22} />
                <span className="flex-1">
                  <span className="block text-sm font-semibold">Email via Gmail</span>
                  <span className="block text-xs text-white/70">Opens a new message</span>
                </span>
                <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" />
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 space-y-1">
              {[
                { l: "Email", v: profile.email, h: `mailto:${profile.email}` },
                { l: "Phone", v: profile.phone, h: `tel:${profile.phone.replace(/\s/g, "")}` },
                { l: "WhatsApp", v: profile.phone, h: whatsappUrl },
                { l: "Location", v: profile.location, h: "" },
              ].map((c) => (
                <div key={c.l} className="grid grid-cols-[90px_1fr] border-t border-line py-4 text-sm">
                  <span className="text-ink/50">{c.l}</span>
                  {c.h ? <a href={c.h} className="break-all font-medium hover:text-accent">{c.v}</a> : <span className="font-medium">{c.v}</span>}
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={profile.resume} target="_blank" className="inline-flex items-center gap-2 bg-ink px-5 py-3 text-sm font-medium text-white transition hover:bg-accent">
                <Download size={16} /> Download resume
              </a>
              {[{ I: FaGithub, h: profile.socials.github, l: "GitHub" }, { I: FaLinkedinIn, h: profile.socials.linkedin, l: "LinkedIn" }].map(({ I, h, l }) => (
                <a key={l} aria-label={l} href={h} target="_blank" className="grid h-11 w-11 place-items-center border border-line transition hover:border-accent hover:bg-accent hover:text-white">
                  <I size={16} />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        {/* the message as a fill-in-the-blanks sentence (no box) */}
        <Reveal delay={0.15}>
          <form onSubmit={handleSubmit} className="lg:pt-16">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">
              Write to me <span className="opacity-60">::</span> fill in the blanks
            </p>
            <div className="mt-8 font-display text-[clamp(1.5rem,2.6vw,2.35rem)] font-semibold leading-[1.7] tracking-tight text-ink/85">
              Hi {profile.firstName}, I&apos;m
              <input
                required
                aria-label="Your name"
                placeholder="your name"
                className={blank}
                style={widthFor(form.name, "your name")}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              , and I&apos;m reaching out about
              {/* click to cycle the topic; each change rolls in like a slot reel */}
              <button
                type="button"
                onClick={nextKind}
                aria-label={`Topic: ${kind}. Click to change`}
                className="group mx-1 inline-flex items-baseline gap-2 border-b-2 border-accent px-1 text-accent"
              >
                <span className="relative inline-block overflow-hidden pb-[0.18em] align-bottom leading-[1.2]" style={{ height: "1.4em" }}>
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={kind}
                      className="inline-block whitespace-nowrap"
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "-100%" }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {kind.toLowerCase()}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="text-[0.55em] transition-transform duration-500 group-hover:rotate-180">⟳</span>
              </button>
              . You can reply to me at
              <input
                required
                type="email"
                aria-label="Your email"
                placeholder="your email"
                className={blank}
                style={widthFor(form.email, "your email")}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              .
            </div>

            <label className="mt-8 block">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">A little more about it</span>
              <textarea
                required
                rows={3}
                placeholder="The role, the project or the idea…"
                className="mt-3 w-full resize-none border-b-2 border-ink/20 bg-transparent py-3 text-lg outline-none transition-colors duration-300 placeholder:text-ink/30 focus:border-accent"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </label>

            <button type="submit" className="roll-host group mt-10 inline-flex items-center gap-5">
              <span className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold uppercase leading-none tracking-tight">
                <RollText text="Send it" />
              </span>
              <span className="grid h-14 w-14 place-items-center rounded-full bg-accent text-white shadow-[0_12px_30px_-10px_rgba(30,58,110,0.7)] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:rotate-45 group-hover:scale-110">
                <ArrowUpRight size={22} />
              </span>
            </button>
            <p className="mt-4 text-xs text-ink/45">Opens your email app with everything filled in.</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
