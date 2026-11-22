import type { IconType } from "react-icons";
import {
  SiDjango,
  SiDocker,
  SiFastapi,
  SiGooglegemini,
  SiNextdotjs,
  SiOpencv,
  SiPostgresql,
  SiPytorch,
  SiReact,
  SiScikitlearn,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
} from "react-icons/si";

/** Real brand logos (Simple Icons) with their official colours, keyed by tag name. */
export const LOGOS: Record<string, { Icon: IconType; color: string }> = {
  PyTorch: { Icon: SiPytorch, color: "#EE4C2C" },
  "TensorFlow / Keras": { Icon: SiTensorflow, color: "#FF6F00" },
  "Computer Vision": { Icon: SiOpencv, color: "#5C3EE8" },
  "scikit-learn": { Icon: SiScikitlearn, color: "#F7931E" },
  FastAPI: { Icon: SiFastapi, color: "#009688" },
  "Django / DRF": { Icon: SiDjango, color: "#092E20" },
  PostgreSQL: { Icon: SiPostgresql, color: "#4169E1" },
  Docker: { Icon: SiDocker, color: "#2496ED" },
  "Next.js": { Icon: SiNextdotjs, color: "#000000" },
  React: { Icon: SiReact, color: "#149ECA" },
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  "Tailwind CSS": { Icon: SiTailwindcss, color: "#06B6D4" },
  "Gemini API": { Icon: SiGooglegemini, color: "#8E75B2" },
};

/** The headline logo for each skill on the orbit, by service index. */
export const SERVICE_LOGOS = ["PyTorch", "FastAPI", "React", "Gemini API"];

export function TechLogo({ name, className = "", mono = false }: { name: string; className?: string; mono?: boolean }) {
  const l = LOGOS[name];
  if (!l) return null;
  const { Icon } = l;
  return <Icon aria-hidden className={className} style={{ color: mono ? undefined : l.color }} />;
}
