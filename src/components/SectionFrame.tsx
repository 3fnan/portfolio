/**
 * Marks a section for the scroll HUD. Sections now share one continuous background
 * (see StoryMain) instead of being separate sheets, so the page flows as one story.
 */
export default function SectionFrame({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div data-section={name} className="relative">
      {children}
    </div>
  );
}
