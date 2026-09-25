import Link from "next/link";
import Shell from "./components/Shell";
import OwnerPlaceholder from "./components/OwnerPlaceholder";
import { getIdentity, getProjects, getHomeTaglines } from "./lib/content";

// Home — a signpost, not a biography, per REPORT.md §2: name + one-line
// identity, a sentence on what's next, links to the best work, and an
// explicit hiring/research fork. Content sourced from content/.
export default function HomePage() {
  const identity = getIdentity();
  const homeTaglines = getHomeTaglines();
  const featured = getProjects().filter((p) => p.featured);

  return (
    <main>
      <Shell>
        <section style={{ padding: `var(--space-3xl) 0 var(--space-2xl)` }}>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 400,
              fontSize: "var(--text-h1)",
              lineHeight: 1.15,
              margin: 0,
              maxWidth: "16ch",
            }}
          >
            {identity.name}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-body)",
              color: "var(--ink-soft)",
              maxWidth: "58ch",
              marginTop: "var(--space-md)",
              lineHeight: 1.55,
            }}
          >
            {identity.positioning}
          </p>
        </section>

        <section style={{ paddingBottom: "var(--space-2xl)" }}>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-label)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: "var(--space-sm)",
            }}
          >
            What&rsquo;s next
          </p>
          <OwnerPlaceholder
            label="research-interest statement"
            note="This is the forward-looking sentence or two on what Bardia wants to work on next — not in BACKGROUND.md, and per CLAUDE.md rule 4 it isn't invented here. REPORT.md Part 4 Q1 notes this needs Bardia's own voice, ideally naming a specific question rather than a general interest area. Write this and it replaces this block, on both Home and Research."
          />
        </section>

        <section style={{ paddingBottom: "var(--space-2xl)" }}>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-label)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: "var(--space-sm)",
            }}
          >
            Best work
          </p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {featured.map((project) => (
              <li
                key={project.slug}
                style={{
                  borderTop: "1px solid var(--line)",
                  padding: `var(--space-sm) 0`,
                }}
              >
                <Link
                  href={`/portfolio/${project.slug}`}
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "var(--text-row-title)",
                    color: "var(--ink)",
                    textDecoration: "none",
                  }}
                >
                  {project.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "var(--space-lg)",
            paddingBottom: "var(--space-4xl)",
          }}
        >
          <div
            style={{
              border: "1px solid var(--line)",
              borderRadius: "var(--radius-sm)",
              padding: "var(--space-lg)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-label)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--ink-soft)",
                margin: 0,
              }}
            >
              Hiring
            </p>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-meta)",
                color: "var(--ink-soft)",
                marginTop: "var(--space-xs)",
              }}
            >
              {homeTaglines.hiring}
            </p>
            <Link
              href="/portfolio"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-meta)",
                color: "var(--accent)",
                display: "inline-block",
                marginTop: "var(--space-sm)",
              }}
            >
              See the portfolio →
            </Link>
          </div>

          <div
            style={{
              border: "1px solid var(--line)",
              borderRadius: "var(--radius-sm)",
              padding: "var(--space-lg)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-label)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--ink-soft)",
                margin: 0,
              }}
            >
              Research
            </p>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-meta)",
                color: "var(--ink-soft)",
                marginTop: "var(--space-xs)",
              }}
            >
              {homeTaglines.research}
            </p>
            <Link
              href="/research"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-meta)",
                color: "var(--accent)",
                display: "inline-block",
                marginTop: "var(--space-sm)",
              }}
            >
              See the research →
            </Link>
          </div>
        </section>
      </Shell>
    </main>
  );
}
