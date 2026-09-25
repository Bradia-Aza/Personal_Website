import type { Metadata } from "next";
import Shell from "@/app/components/Shell";
import OwnerPlaceholder from "@/app/components/OwnerPlaceholder";
import { getResearchEntries } from "@/app/lib/content";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Bardia Azami's research work: a comparative ViT vs. CNN study for fire detection, and a deep-learning edge-preserving CT reconstruction pipeline.",
};

// Research — thesis-adjacent work and stated direction, per REPORT.md.
// BACKGROUND.md has no stated thesis (REPORT.md Part 4, Q1), so this page is
// built around the two research-shaped roles that exist (vision-model
// benchmarking, CT reconstruction) plus a direction placeholder, exactly as
// REPORT.md describes for the no-thesis case.
export default function ResearchPage() {
  const researchEntries = getResearchEntries();

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
            Research
          </h1>
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
            Where this is headed
          </p>
          <OwnerPlaceholder
            label="research-interest statement"
            note="A statement of the specific question Bardia wants to pursue next — not in BACKGROUND.md, and REPORT.md flags that a general interest area ('I'm interested in foundation models') reads as filler compared to a specific question. Not invented here per CLAUDE.md rule 4; write this in Bardia's own voice and it replaces this block."
          />
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
            Research work
          </p>
          {researchEntries.map((entry) => (
            <article
              key={entry.slug}
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
                {entry.role} · {entry.dates}
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 400,
                  fontSize: "var(--text-h1-mobile)",
                  margin: 0,
                  marginTop: "var(--space-xs)",
                }}
              >
                {entry.title}
              </h2>
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
                {entry.summary}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-meta)",
                  color: "var(--ink)",
                  maxWidth: "68ch",
                  marginTop: "var(--space-sm)",
                  lineHeight: 1.55,
                }}
              >
                <strong>Outcome.</strong> {entry.outcome}
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "var(--space-xs)",
                  marginTop: "var(--space-md)",
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
            </article>
          ))}
        </section>
      </Shell>
    </main>
  );
}
