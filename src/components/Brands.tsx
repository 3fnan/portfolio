import { brands } from "@/data/portfolio";
import Marquee from "./Marquee";

const styles = [
  "font-display font-bold tracking-tight",
  "italic font-semibold",
  "font-display font-extrabold tracking-tighter",
  "font-medium tracking-wide",
  "font-display font-semibold uppercase tracking-[0.2em] text-sm",
  "font-bold",
];

export default function Brands() {
  return (
    <section className="border-b border-line bg-paper">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-5 py-10 sm:px-10 md:flex-row md:items-center">
        <p className="shrink-0 text-xs font-semibold uppercase leading-snug md:w-44">
          Worked with &amp;
          <br />
          certified by
        </p>
        <Marquee duration={30} className="flex-1" gap="4rem">
          {brands.map((b, i) => (
            <span key={b} className={`whitespace-nowrap text-xl text-ink/70 ${styles[i % styles.length]}`}>
              {b}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
