"use client";

import { useEffect, useRef } from "react";

/**
 * Glowing cursor path + glitter sparkles, drawn on one full-screen canvas.
 * Off on touch devices and for people who prefer reduced motion.
 * The animation loop sleeps when the cursor is still, so it costs nothing at rest.
 */

type Point = { x: number; y: number; t: number };
type Spark = { x: number; y: number; vx: number; vy: number; life: number; max: number; size: number; color: string; spin: number };

const TRAIL_MS = 380;
const COLORS = ["#9fb3d6", "#c9d7f0", "#5b82c9", "#ffffff", "#ffd479"];

export default function CursorGlow() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const trail: Point[] = [];
    const sparks: Spark[] = [];
    const dot = { x: -100, y: -100, tx: -100, ty: -100 };
    let raf = 0;
    let last = performance.now();

    const star = (s: Spark, alpha: number) => {
      const r = s.size;
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.spin);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = s.color;
      ctx.shadowColor = s.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      // four-point twinkle
      ctx.moveTo(0, -r * 2.4);
      ctx.quadraticCurveTo(0, 0, r * 2.4, 0);
      ctx.quadraticCurveTo(0, 0, 0, r * 2.4);
      ctx.quadraticCurveTo(0, 0, -r * 2.4, 0);
      ctx.quadraticCurveTo(0, 0, 0, -r * 2.4);
      ctx.fill();
      ctx.restore();
    };

    const frame = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // drop old trail points
      while (trail.length && now - trail[0].t > TRAIL_MS) trail.shift();

      // glowing path: wide soft pass, then a bright thin core
      if (trail.length > 2) {
        for (const pass of [
          { w: 10, color: "rgba(111,143,208,0.22)", blur: 22 },
          { w: 2.2, color: "rgba(220,231,255,0.95)", blur: 10 },
        ]) {
          for (let i = 1; i < trail.length; i++) {
            const a = trail[i - 1];
            const b = trail[i];
            const k = i / trail.length; // 0 = tail, 1 = head
            ctx.globalAlpha = k;
            ctx.strokeStyle = pass.color;
            ctx.shadowColor = "#6f8fd0";
            ctx.shadowBlur = pass.blur;
            ctx.lineWidth = pass.w * (0.25 + 0.75 * k);
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        ctx.globalAlpha = 1;
      }

      // sparkles drift, slow down and fade
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life += dt;
        if (s.life >= s.max) {
          sparks.splice(i, 1);
          continue;
        }
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.vx *= 0.96;
        s.vy = s.vy * 0.96 + 0.0006 * dt; // a little gravity
        s.spin += 0.004 * dt;
        const p = s.life / s.max;
        star(s, Math.sin(Math.PI * Math.min(1, p * 1.4)) * (1 - p));
      }

      // soft glow that eases after the cursor
      dot.x += (dot.tx - dot.x) * 0.22;
      dot.y += (dot.ty - dot.y) * 0.22;
      const g = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, 26);
      g.addColorStop(0, "rgba(159,179,214,0.35)");
      g.addColorStop(1, "rgba(159,179,214,0)");
      ctx.shadowBlur = 0;
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, 26, 0, Math.PI * 2);
      ctx.fill();

      const settling = Math.abs(dot.tx - dot.x) + Math.abs(dot.ty - dot.y) > 0.5;
      if (trail.length || sparks.length || settling) raf = requestAnimationFrame(frame);
      else raf = 0;
    };

    const wake = () => {
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      const prev = trail[trail.length - 1];
      trail.push({ x: e.clientX, y: e.clientY, t: now });
      dot.tx = e.clientX;
      dot.ty = e.clientY;
      if (dot.x < 0) {
        dot.x = e.clientX;
        dot.y = e.clientY;
      }
      // more glitter the faster you move
      const speed = prev ? Math.hypot(e.clientX - prev.x, e.clientY - prev.y) : 0;
      const count = speed > 18 ? 2 : Math.random() < 0.45 ? 1 : 0;
      for (let i = 0; i < count && sparks.length < 90; i++) {
        const ang = Math.random() * Math.PI * 2;
        const v = 0.02 + Math.random() * 0.06;
        sparks.push({
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          vx: Math.cos(ang) * v,
          vy: Math.sin(ang) * v - 0.02,
          life: 0,
          max: 550 + Math.random() * 500,
          size: 1 + Math.random() * 1.8,
          color: COLORS[Math.random() < 0.12 ? 4 : Math.floor(Math.random() * 4)],
          spin: Math.random() * Math.PI,
        });
      }
      wake();
    };

    // a small burst of glitter on click
    const onDown = (e: PointerEvent) => {
      for (let i = 0; i < 14; i++) {
        const ang = (i / 14) * Math.PI * 2;
        const v = 0.08 + Math.random() * 0.08;
        sparks.push({
          x: e.clientX, y: e.clientY, vx: Math.cos(ang) * v, vy: Math.sin(ang) * v,
          life: 0, max: 600 + Math.random() * 400, size: 1.2 + Math.random() * 1.6,
          color: COLORS[i % COLORS.length], spin: Math.random() * Math.PI,
        });
      }
      wake();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-[80] h-full w-full" />;
}
