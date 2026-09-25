// Shared page-width container. Every route wraps its content in this so the
// 900px shell width and horizontal padding (Quiet Manuscript, globals.css)
// stay consistent without each page re-declaring them.
export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        maxWidth: "var(--shell-max-width)",
        margin: "0 auto",
        padding: `0 var(--shell-padding)`,
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}
