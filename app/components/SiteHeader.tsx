import Link from "next/link";
import Shell from "./Shell";
import { getNav } from "@/app/lib/content";

// Top bar on every page: wordmark, nav (Research before Portfolio per
// REPORT.md's menu-order recommendation), and a CV button per REPORT.md §1.4.
// The CV file itself is a Phase 4 deliverable (owner supplies the PDF) — the
// link points at the stable /cv.pdf URL now so the button doesn't move later.
export default function SiteHeader() {
  const nav = getNav();

  return (
    <header style={{ borderBottom: "1px solid var(--line)" }}>
      <Shell>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "var(--space-md)",
            padding: `var(--space-sm) 0`,
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-wordmark)",
              color: "var(--ink)",
              textDecoration: "none",
            }}
          >
            Home
          </Link>

          <nav
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "var(--space-lg)",
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-label)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{ color: "var(--ink)", textDecoration: "none" }}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="/cv.pdf"
              style={{
                color: "var(--accent)",
                textDecoration: "none",
                border: "1px solid var(--accent)",
                borderRadius: "var(--radius-sm)",
                padding: "var(--button-padding)",
              }}
            >
              CV
            </a>
          </nav>
        </div>
      </Shell>
    </header>
  );
}
