import Image from "next/image";
import Link from "next/link";
import Shell from "./components/Shell";
import { getIdentity, getProjects, getHomeTaglines, getHomeWorkStyle } from "./lib/content";

// Home — a signpost, not a biography, per REPORT.md §2: name + one-line
// identity, a sentence on what's next, links to the best work, and an
// explicit hiring/research fork. Content sourced from content/.
export default function HomePage() {
  const identity = getIdentity();
  const homeTaglines = getHomeTaglines();
  const homeWorkStyle = getHomeWorkStyle();
  const featured = getProjects().filter((p) => p.featured);

  return (
    <main>
      <Shell>
        <section
          style={{
            padding: `var(--space-3xl) 0 var(--space-2xl)`,
            display: "flex",
            alignItems: "center",
            gap: "var(--space-lg)",
            flexWrap: "wrap",
          }}
        >
          <Image
            src="/bardia.jpg"
            alt={identity.name}
            width={180}
            height={180}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
          <div>
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 400,
                fontSize: "var(--text-h1)",
                lineHeight: 1.15,
                margin: 0,
                maxWidth: "14ch",
              }}
            >
              {identity.name}
            </h1>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-body)",
                color: "var(--ink-soft)",
                maxWidth: "46ch",
                marginTop: "var(--space-md)",
                lineHeight: 1.55,
              }}
            >
              {identity.positioning}
            </p>
          </div>
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
            How I Like to Work
          </p>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-body)",
              color: "var(--ink-soft)",
              maxWidth: "58ch",
              lineHeight: 1.55,
            }}
          >
            {homeWorkStyle}
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
            Selected Projects
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
              What I've built
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
              Professional Experience & Research
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
