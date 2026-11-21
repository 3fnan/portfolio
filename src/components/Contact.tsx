"use client";

import { useState } from "react";
import { ArrowUpRight, Download } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { enquiryTypes, profile } from "@/data/portfolio";
import BlurText from "./BlurText";
import Reveal from "./Reveal";
import Tag from "./Tag";

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

  const input =
    "w-full border-b border-line bg-transparent py-4 outline-none transition placeholder:text-ink/40 focus:border-orange";

  return (
    <section id="contact" className="mx-auto max-w-[1400px] px-5 py-28 sm:px-10">
      <div className="grid gap-16 lg:grid-cols-2">
        <div>
          <Reveal><Tag>Contact</Tag></Reveal>
          <BlurText text="Let's build | something great" className="display mt-5 text-[clamp(2.6rem,6vw,5rem)]" />
          <Reveal delay={0.05}>
            <p className="mt-6 max-w-md text-ink/70">
              Hiring for an AI/ML or backend role, or need something built? Tell me a little about it.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 space-y-1">
              {[
                { l: "Email", v: profile.email, h: `mailto:${profile.email}` },
                { l: "Phone", v: profile.phone, h: `tel:${profile.phone.replace(/\s/g, "")}` },
                { l: "Location", v: profile.location, h: "" },
              ].map((c) => (
                <div key={c.l} className="grid grid-cols-[90px_1fr] border-t border-line py-4 text-sm">
                  <span className="text-ink/50">{c.l}</span>
                  {c.h ? <a href={c.h} className="break-all font-medium hover:text-orange">{c.v}</a> : <span className="font-medium">{c.v}</span>}
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={profile.resume} target="_blank" className="inline-flex items-center gap-2 bg-ink px-5 py-3 text-sm font-medium text-white transition hover:bg-orange">
                <Download size={16} /> Download resume
              </a>
              {[{ I: FaGithub, h: profile.socials.github, l: "GitHub" }, { I: FaLinkedinIn, h: profile.socials.linkedin, l: "LinkedIn" }].map(({ I, h, l }) => (
                <a key={l} aria-label={l} href={h} target="_blank" className="grid h-11 w-11 place-items-center border border-line transition hover:border-orange hover:bg-orange hover:text-white">
                  <I size={16} />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <form onSubmit={handleSubmit} className="bg-card p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">I&apos;m reaching out about</p>
            <div className="mt-3 flex flex-wrap gap-2" role="radiogroup">
              {enquiryTypes.map((t) => (
                <button
                  key={t}
                  type="button"
                  role="radio"
                  aria-checked={kind === t}
                  onClick={() => setKind(t)}
                  className={`px-3.5 py-2 text-xs font-semibold transition ${
                    kind === t ? "bg-orange text-white" : "bg-black/[0.05] hover:bg-black/10"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <input required placeholder="Your name" className={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input required type="email" placeholder="Your email" className={input} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <textarea required rows={5} placeholder="Tell me about the role or project…" className={`${input} resize-none`} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            <button type="submit" className="group mt-8 inline-flex items-center gap-6 border-l-2 border-orange bg-paper py-2 pl-5 pr-2 text-sm font-semibold uppercase">
              Send message
              <span className="grid h-8 w-8 place-items-center bg-orange text-white transition-transform group-hover:rotate-45">
                <ArrowUpRight size={16} />
              </span>
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
