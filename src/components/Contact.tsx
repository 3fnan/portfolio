"use client";

import { useState } from "react";
import { ArrowUpRight, Mail, Phone, Send } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { profile } from "@/data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

// The form opens the visitor's email app with the message pre-filled.
// To receive messages without that step, swap handleSubmit for Formspree or Resend.
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  const input =
    "w-full rounded-2xl border border-border bg-bg px-5 py-4 outline-none transition placeholder:text-muted focus:border-accent";

  const channels = [
    { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
    { icon: FaLinkedinIn, label: "LinkedIn", href: profile.socials.linkedin },
    { icon: FaGithub, label: "GitHub", href: profile.socials.github },
  ];

  return (
    <section id="contact" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="05" label="Contact" title="Let's build something" />

        <div className="grid gap-4 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="flex h-full flex-col justify-between gap-10 rounded-3xl bg-accent p-8 text-accent-fg">
              <p className="font-display text-3xl font-bold leading-tight">
                Looking for an AI/ML, Python backend or software engineering role.
              </p>
              <ul className="space-y-1">
                {channels.map(({ icon: Icon, label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      className="group flex items-center justify-between gap-3 border-t border-accent-fg/15 py-3 font-medium"
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <Icon size={18} className="shrink-0" />
                        <span className="truncate">{label}</span>
                      </span>
                      <ArrowUpRight size={18} className="shrink-0 transition group-hover:rotate-45" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-border bg-surface p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  required
                  placeholder="Your name"
                  className={input}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  required
                  type="email"
                  placeholder="Your email"
                  className={input}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <textarea
                required
                rows={6}
                placeholder="Tell me about your project or role…"
                className={`${input} resize-none`}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-fg px-6 py-4 font-medium text-bg transition hover:opacity-85"
              >
                Send message <Send size={16} />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
