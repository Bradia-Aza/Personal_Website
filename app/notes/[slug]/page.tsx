import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Shell from "@/app/components/Shell";
import { getNote } from "@/app/lib/content";

// Title comes from the essay's own frontmatter; no essays are published yet
// so this only takes effect once one exists.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};
  return { title: note.title };
}

// One essay's full text. Reads the matching file from content/notes/, the
// same way app/portfolio/[slug]/page.tsx reads a project. No essays are
// published yet (the essays themselves are the owner's to write per
// EXECUTION_PLAN.md's "what happens after Phase 5"), so every slug still
// 404s for now — but publishing one is a content-only change, no route code
// to touch.
export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getNote(slug);

  if (!note) {
    notFound();
  }

  return (
    <main>
      <Shell>
        <section style={{ padding: `var(--space-2xl) 0 var(--space-lg)` }}>
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
            {note.dates}
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
            {note.title}
          </h1>
        </section>

        <section
          style={{
            borderTop: "1px solid var(--line)",
            padding: `var(--space-lg) 0 var(--space-4xl)`,
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-body)",
            color: "var(--ink)",
            maxWidth: "68ch",
            lineHeight: 1.65,
            whiteSpace: "pre-wrap",
          }}
        >
          {note.body}
        </section>
      </Shell>
    </main>
  );
}

// No published notes yet, so this returns no static params — the dynamic
// route falls through to the 404 above for every slug until one exists.
export function generateStaticParams() {
  return [];
}
