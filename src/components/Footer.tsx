import { navLinks, profile } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden bg-orange px-5 pt-16 text-white sm:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <p className="max-w-xs text-sm font-semibold uppercase leading-relaxed">{profile.heroIntro}</p>
          <ul className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}><a href={l.href} className="hover:underline">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <p aria-hidden className="display mt-12 select-none text-center text-[24vw] leading-[0.8] text-white/90 sm:text-[22vw]">
          {profile.firstName.toUpperCase()}
        </p>
        <div className="flex flex-col justify-between gap-2 border-t border-white/25 py-6 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <a href="#top" className="hover:underline">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
