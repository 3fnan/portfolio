export default function Marquee({
  children,
  duration = 40,
  className = "",
  gap = "2.5rem",
}: {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  gap?: string;
}) {
  return (
    <div
      className={`group flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)] ${className}`}
    >
      {[0, 1].map((k) => (
        <div
          key={k}
          aria-hidden={k === 1}
          className="flex shrink-0 items-stretch group-hover:[animation-play-state:paused]"
          style={{ gap, paddingRight: gap, animation: `marquee ${duration}s linear infinite` }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
