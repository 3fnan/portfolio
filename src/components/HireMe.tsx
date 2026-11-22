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
          aria-label={`Contact ${profile.firstName}`}
          className="group fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full bg-ink p-1.5 pr-3 text-white shadow-2xl shadow-black/30 sm:bottom-5 sm:right-5 sm:gap-3 sm:rounded-none sm:py-2 sm:pl-2 sm:pr-4"
        >
          <span className="relative h-10 w-10 shrink-0 sm:h-9 sm:w-9">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.photo}
              alt=""
              className="h-full w-full rounded-full object-cover object-top sm:rounded-none"
            />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-ink bg-green-400" />
          </span>
          <span className="hidden text-sm font-semibold sm:inline">Contact {profile.firstName}</span>
          <ArrowUpRight size={16} className="transition-transform group-hover:rotate-45" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
