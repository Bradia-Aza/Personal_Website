import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Shell from "@/app/components/Shell";
import { getProjects, getProject } from "@/app/lib/content";

// One project's full write-up. Renders whichever project matches the slug —
// adding a file to content/projects/ is enough to get a working page here,
// no route changes needed (STRUCTURE.md §2).
export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

// Title and description come straight from the project's own content file —
// nothing paraphrased or added here.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.outcome || project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main>
      <Shell>
        <section style={{ padding: `var(--space-2xl) 0 var(--space-lg)` }}>
          <Link
            href="/portfolio"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-label)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--accent)",
              textDecoration: "none",
            }}
          >
            ← Portfolio
          </Link>

          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-label)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--ink-soft)",
              marginTop: "var(--space-md)",
            }}
          >
            {project.dates}
          </p>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 400,
              fontSize: "var(--text-h1)",
              lineHeight: 1.15,
              margin: 0,
              marginTop: "var(--space-xs)",
            }}
          >
            {project.title}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-body)",
              color: "var(--ink-soft)",
              maxWidth: "68ch",
              marginTop: "var(--space-md)",
              lineHeight: 1.55,
            }}
          >
            {project.summary}
          </p>
        </section>

        <section
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
              color: "var(--accent)",
              margin: 0,
            }}
          >
            Headline outcome
          </p>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-body)",
              color: "var(--ink)",
              maxWidth: "68ch",
              marginTop: "var(--space-sm)",
              lineHeight: 1.55,
            }}
          >
            {project.outcome}
          </p>
        </section>

        <section
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
              color: "var(--accent)",
              margin: 0,
              marginBottom: "var(--space-md)",
            }}
          >
            Stack
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--space-xs)",
            }}
          >
            {project.stack.map((item) => (
              <span
                key={item}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-meta)",
                  color: "var(--ink-soft)",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--radius-sm)",
                  padding: "var(--chip-padding)",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <section
          style={{
            borderTop: "1px solid var(--line)",
            padding: `var(--space-lg) 0 var(--space-4xl)`,
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
              marginBottom: "var(--space-md)",
            }}
          >
            Write-up
          </p>
          {project.body.map((block, i) =>
            block.type === "heading" ? (
              <h3
                key={i}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: "var(--text-body)",
                  color: "var(--ink)",
                  maxWidth: "68ch",
                  marginTop: i === 0 ? 0 : "var(--space-lg)",
                  marginBottom: 0,
                }}
              >
                {block.text}
              </h3>
            ) : (
              <p
                key={i}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-meta)",
                  color: "var(--ink)",
                  maxWidth: "68ch",
                  marginTop: i === 0 ? 0 : "var(--space-md)",
                  lineHeight: 1.55,
                }}
              >
                {block.text}
              </p>
            )
          )}
        </section>
      </Shell>
    </main>
  );
}
