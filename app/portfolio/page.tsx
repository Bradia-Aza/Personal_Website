import Link from "next/link";
import type { Metadata } from "next";
import Shell from "@/app/components/Shell";
import { getProjects } from "@/app/lib/content";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "ML and LLM engineering projects by Bardia Azami, including CareerFlow AI, DataMind, and the Ottawa Rental Market ETL & Analytics Pipeline.",
};

// Portfolio index — three projects in depth, the rest listed briefly, per
// REPORT.md ("you have too many projects to show equally"). All seven exist
// as full detail pages; this page just varies how much weight each gets.
export default function PortfolioPage() {
  const projects = getProjects();
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <main>
      <Shell>
        <section style={{ padding: `var(--space-2xl) 0 var(--space-lg)` }}>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 400,
              fontSize: "var(--text-h1)",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            Portfolio
          </h1>
        </section>

        <section style={{ paddingBottom: "var(--space-3xl)" }}>
          {featured.map((project) => (
            <article
              key={project.slug}
              style={{
                borderTop: "1px solid var(--line)",
                padding: `var(--space-lg) 0`,
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
                {project.dates}
              </p>
              <Link
                href={`/portfolio/${project.slug}`}
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-h1-mobile)",
                  color: "var(--ink)",
                  textDecoration: "none",
                  display: "block",
                  marginTop: "var(--space-xs)",
                }}
              >
                {project.title}
              </Link>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-body)",
                  color: "var(--ink-soft)",
                  maxWidth: "68ch",
                  marginTop: "var(--space-sm)",
                  lineHeight: 1.55,
                }}
              >
                {project.summary}
              </p>
              <Link
                href={`/portfolio/${project.slug}`}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-meta)",
                  color: "var(--accent)",
                  display: "inline-block",
                  marginTop: "var(--space-sm)",
                }}
              >
                Read the full write-up →
              </Link>
            </article>
          ))}
        </section>

        <section style={{ paddingBottom: "var(--space-4xl)" }}>
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
            More projects
          </p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {rest.map((project) => (
              <li
                key={project.slug}
                style={{
                  borderTop: "1px solid var(--line)",
                  padding: `var(--space-sm) 0`,
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "var(--space-md)",
                  flexWrap: "wrap",
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
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "var(--text-label)",
                    color: "var(--ink-soft)",
                    alignSelf: "center",
                  }}
                >
                  {project.dates}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </Shell>
    </main>
  );
}
