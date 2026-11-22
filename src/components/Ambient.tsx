/**
 * Living background: soft light orbs that drift slowly behind a section.
 * Pure CSS (see .ambient in globals.css), sits behind content, ignores the mouse.
 * `tone="dark"` is tuned for the navy hero, `light` for the grey paper sections.
 */
export default function Ambient({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <div aria-hidden className={`ambient ambient--${tone}`}>
      <i className="o1" />
      <i className="o2" />
      <i className="o3" />
      <i className="spot" />
    </div>
  );
}
