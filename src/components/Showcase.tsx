"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "@/data/portfolio";

// Wide media block that grows from a card to full width as it scrolls into view
export default function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.72, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [28, 12]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "0%"]);

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-10 sm:px-10">
      <motion.div ref={ref} style={{ scale, borderRadius: radius }} className="relative aspect-[16/10] overflow-hidden bg-ink md:aspect-[16/8]">
        {profile.showcaseImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <motion.img style={{ y: imgY }} src={profile.showcaseImage} alt="" className="h-[116%] w-full object-cover" />
        ) : (
          <CodeArt />
        )}
      </motion.div>
    </section>
  );
}

function CodeArt() {
  const lines: [string, string][] = [
    ["#e4572e", "from fastapi import FastAPI, Depends"],
    ["#8a8a8a", "from app.policy import evaluate_group"],
    ["", ""],
    ["#ffffff", "app = FastAPI(title=\"CVETrack Policy Engine\")"],
    ["", ""],
    ["#f6894f", "@app.post(\"/policies/{policy_id}/evaluate\")"],
    ["#ffffff", "async def evaluate(policy_id: int, db = Depends(get_db)):"],
    ["#ffffff", "    policy = await db.get_policy(policy_id)"],
    ["#8a8a8a", "    # nested AND / OR groups, evaluated recursively"],
    ["#ffffff", "    result = evaluate_group(policy.root_group, ctx)"],
    ["#ffffff", "    await db.save_history(policy_id, result)"],
    ["#e4572e", "    return {\"passed\": result.passed, \"rules\": result.trace}"],
  ];
  return (
    <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(ellipse_at_80%_100%,#e4572e55,transparent_60%)] p-6">
      <pre className="w-full max-w-3xl overflow-hidden rounded-xl border border-white/10 bg-black/50 p-5 font-mono text-[10px] leading-relaxed backdrop-blur sm:p-8 sm:text-sm">
        <div className="mb-4 flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#e4572e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
        </div>
        {lines.map(([c, t], i) => (
          <div key={i} style={{ color: c || undefined }} className="whitespace-pre">{t || " "}</div>
        ))}
      </pre>
    </div>
  );
}
