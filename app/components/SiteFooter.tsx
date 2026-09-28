import Shell from "./Shell";
import { getIdentity } from "@/app/lib/content";

// Contact belongs in the footer of every page, not a contact form, per
// REPORT.md §5. Email, GitHub, LinkedIn — all three sourced from
// content/identity.md.
export default function SiteFooter() {
  const identity = getIdentity();

  return (
    <footer style={{ borderTop: "1px solid var(--line)", marginTop: "auto" }}>
      <Shell>
        <div
          style={{
            display: "flex",
            gap: "var(--space-lg)",
            flexWrap: "wrap",
            padding: `var(--space-lg) 0`,
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-meta)",
            color: "var(--ink-soft)",
          }}
        >
          <a
            href={`mailto:${identity.email}`}
            style={{ color: "inherit", padding: "var(--space-xs) 0" }}
          >
            {identity.email}
          </a>
          <a
            href={identity.github}
            style={{ color: "inherit", padding: "var(--space-xs) 0" }}
          >
            GitHub
          </a>
          <a
            href={identity.linkedin}
            style={{ color: "inherit", padding: "var(--space-xs) 0" }}
          >
            LinkedIn
          </a>
          <span>{identity.location}</span>
        </div>
      </Shell>
    </footer>
  );
}
