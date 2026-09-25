import Link from "next/link";
import type { Metadata } from "next";
import Shell from "@/app/components/Shell";
import { getNotes } from "@/app/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays by Bardia Azami.",
};

// Notes ("Writing" in nav, per REPORT.md §1's rename). Lists whatever's
// published in content/notes/ — with none published yet, this renders the
// honest empty state rather than sample or lorem posts pretending to be real
// content. Publishing an essay (content/notes/<slug>.md, published: true) is
// enough to make it appear here; no code change needed.
export default function NotesPage() {
  const notes = getNotes();

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
            Writing
          </h1>
        </section>

        {notes.length === 0 ? (
          <section
            style={{
              borderTop: "1px solid var(--line)",
              padding: `var(--space-2xl) 0 var(--space-4xl)`,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-body)",
                color: "var(--ink-soft)",
                maxWidth: "56ch",
                lineHeight: 1.55,
              }}
            >
              No essays published yet. This section is meant to hold four to
              six pieces of real, original thinking — not summaries — so
              nothing is going here until that exists.
            </p>
          </section>
        ) : (
          <section style={{ paddingBottom: "var(--space-4xl)" }}>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {notes.map((note) => (
                <li
                  key={note.slug}
                  style={{
                    borderTop: "1px solid var(--line)",
                    padding: `var(--space-sm) 0`,
                  }}
                >
                  <Link
                    href={`/notes/${note.slug}`}
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "var(--text-row-title)",
                      color: "var(--ink)",
                      textDecoration: "none",
                    }}
                  >
                    {note.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </Shell>
    </main>
  );
}
