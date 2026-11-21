import { profile } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="overflow-hidden px-4 pb-8 pt-16">
      <div className="mx-auto max-w-6xl">
        <p className="select-none font-display text-[clamp(3rem,13vw,10rem)] font-bold leading-none tracking-tighter text-surface-2">
          {profile.firstName.toUpperCase()}
        </p>
        <div className="mt-6 flex flex-col justify-between gap-3 border-t border-border pt-6 text-sm text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <a href="#top" className="hover:text-fg">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
