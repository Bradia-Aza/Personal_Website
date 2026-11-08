import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Shell from "@/app/components/Shell";
import { getResearchEntries, getResearchEntry } from "@/app/lib/content";

// One research entry's full write-up, matching app/portfolio/[slug]/page.tsx.
// All copy comes from the entry's file in content/research/.
export function generateStaticParams() {
  return getResearchEntries().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getResearchEntry(slug);
  if (!entry) return {};
  return {
    title: entry.title,
    description: entry.outcome || entry.summary,
  };
}

export default async function ResearchEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getResearchEntry(slug);

  if (!entry) {
    notFound();
  }

  return (
    <main>
      <Shell>
        <section style={{ padding: `var(--space-2xl) 0 var(--space-lg)` }}>
          <Link
            href="/research"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-label)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--accent)",
              textDecoration: "none",
            }}
          >
            ← Research
          </Link>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "var(--space-sm)",
              marginTop: "var(--space-md)",
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
              {entry.role} · {entry.dates}
            </p>
            {entry.report && (
              <a
                href={entry.report}
                target="_blank"
                rel="noopener"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-meta)",
                  color: "var(--accent)",
                  border: "1px solid var(--accent)",
                  borderRadius: "var(--radius-sm)",
                  padding: "var(--chip-padding)",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {entry.reportLabel || "Read the report (PDF)"} ↗
              </a>
            )}
          </div>
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
            {entry.title}
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
            {entry.summary}
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
            {entry.outcome}
          </p>
        </section>

        {entry.sections.map((section) => (
          <section
            key={section.heading}
            style={{
              borderTop: "1px solid var(--line)",
              padding: `var(--space-lg) 0`,
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 400,
                fontSize: "var(--text-label)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--accent)",
                margin: 0,
              }}
            >
              {section.heading}
            </h2>
            {section.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-body)",
                  color: "var(--ink)",
                  maxWidth: "68ch",
                  margin: 0,
                  marginTop: "var(--space-sm)",
                  lineHeight: 1.55,
                }}
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}

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
            Stack
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--space-xs)",
            }}
          >
            {entry.stack.map((item) => (
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
      </Shell>
    </main>
  );
}
