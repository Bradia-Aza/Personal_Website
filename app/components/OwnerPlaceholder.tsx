// Visually distinct marker for copy CLAUDE.md rule 4 forbids inventing.
// Used for the forward-looking research-interest statement, which isn't in
// BACKGROUND.md — REPORT.md Part 4 Q1 confirms no thesis statement exists
// yet. Renders as an obviously-unfinished block so it can't be mistaken for
// real content once the page is live.
export default function OwnerPlaceholder({
  label,
  note,
}: {
  label: string;
  note: string;
}) {
  return (
    <div
      style={{
        border: "1px dashed var(--accent)",
        borderRadius: "var(--radius-sm)",
        padding: "var(--space-md)",
        background: "var(--accent-tint)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-label)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--accent)",
          margin: 0,
          marginBottom: "var(--space-xs)",
        }}
      >
        Owner placeholder — {label}
      </p>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-meta)",
          color: "var(--ink-soft)",
          margin: 0,
        }}
      >
        {note}
      </p>
    </div>
  );
}
