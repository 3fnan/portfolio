"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/portfolio";

/** Floating "Hire me" button: appears after the hero, hides once the contact section is on screen */
export default function HireMe() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const contact = document.getElementById("contact");
      const pastHero = window.scrollY > window.innerHeight * 0.8;
      const atContact = contact ? contact.getBoundingClientRect().top < window.innerHeight * 0.8 : false;
      setShow(pastHero && !atContact);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="/#contact"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 bg-ink py-2 pl-2 pr-4 text-white shadow-2xl shadow-black/30"
        >
          <span className="relative grid h-9 w-9 place-items-center bg-accent font-display text-xs font-bold">
            {profile.initials}
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-ink bg-green-400" />
          </span>
          <span className="text-sm font-semibold">Contact {profile.firstName}</span>
          <ArrowUpRight size={16} className="transition-transform group-hover:rotate-45" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
