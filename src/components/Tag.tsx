export default function Tag({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm bg-black/[0.05] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${className}`}
    >
      <span className="text-orange">✳</span>
      {children}
    </span>
  );
}
