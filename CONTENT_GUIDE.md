# Content Guide

Every sentence on the site lives in a plain Markdown file under `content/`.
This is the "to change X, edit file Y" list from `EXECUTION_PLAN.md` Phase 3.
No file listed here requires touching TypeScript or component code — open the
file, edit the text between the `---` lines or below them, save.

Format: Markdown files with a YAML-style frontmatter block (the part between
the two `---` lines) for short fields, and the rest of the file for prose.
This was chosen over JSON because `STRUCTURE.md` §3 specifically calls for
Markdown for long-form writing and simple structured files for short lists —
one plain-text format, no code editor required, and lists/paragraphs both
read naturally without escaping or matching brackets.

## Site-wide text

| To change... | Edit this file |
|---|---|
| Name, location, email, GitHub, LinkedIn | `content/identity.md` (top block) |
| The one-paragraph "positioning statement" on the homepage | `content/identity.md`, under `## Positioning statement` |
| The "trained as an electrical engineer..." bio paragraph | `content/identity.md`, under `## Story` |
| The closing "thread through all of it" line | `content/identity.md`, under `## Thread` |
| Nav bar links and labels (currently Research / Portfolio / Writing) | `content/nav.md` |
| The two short taglines on the homepage's Hiring/Research cards | `content/home.md` |

## Projects (Portfolio page)

Each project is one file in `content/projects/`, e.g.
`content/projects/careerflow-ai.md`. The filename becomes the URL
(`careerflow-ai` → `/portfolio/careerflow-ai`).

Each file has:

- A frontmatter block: `title`, `dates`, `featured` (`true` for one of the
  three in-depth projects on the index, `false` for the rest), `outcome`,
  `stack` (a list), `keywords` (a list).
- A body: one lede paragraph (the project summary), followed by any number
  of `## Problem` / `## Solution` / `## Result` sections in that repeating
  order — one triple per thing you did on the project.

**To edit an existing project:** open its file, change the sentence, save.

**To add a new project:** copy any existing file in `content/projects/` to a
new filename, replace every field and paragraph, save. It appears on the
site automatically — no route or component code to touch.

**To remove a project from the site:** delete its file, or rename it to
start with an underscore (e.g. `_careerflow-ai.md`) to keep it around
without publishing it — files starting with `_` are skipped.

## Research entries (Research page)

Same pattern, one file per entry in `content/research/`, e.g.
`content/research/ct-reconstruction.md`. Frontmatter: `title`, `role`,
`dates`, `outcome`, `stack`. Body: the summary paragraph (no Problem/
Solution/Result sections here — research entries are shorter).

## Notes / essays (Writing page)

No essays are published yet — the Notes page correctly shows its real empty
state until real ones exist. `content/notes/_template.md` is the pattern to
copy (it starts with `_` so it's never picked up as a real post):

1. Copy `content/notes/_template.md` to `content/notes/your-slug.md`.
2. Fill in `title` and `dates`.
3. Write the essay as the file body.
4. Set `published: true` when ready to go live. Leave it `false` (or leave
   the file named with a leading `_`) while still drafting.

## What's intentionally not a content file

The homepage's former "What's next" placeholder is now filled in: it's the
"How I Like to Work" section, backed by `content/home-work-style.md` and
read via `getHomeWorkStyle()` in `app/lib/content.ts`. That's a real content
file now — edit it like any other.

The Research page's "Where this is headed" section is still an "owner
placeholder" block, on purpose. Per `CLAUDE.md` rule 4, the forward-looking
research-direction statement isn't in `BACKGROUND.md`, so nothing was
invented for it — it's backed by `content/research-interest.md`, which is
still a placeholder file. It needs to be written in Bardia's own voice. Once
written, set its `status` away from `placeholder` (or replace the
`OwnerPlaceholder` usage in `app/research/page.tsx` with the file's body,
matching how the homepage section above now reads `home-work-style.md`) —
that's a small follow-up code change to wire up, not something this phase
should guess at.

## Where the loader lives

`app/lib/content.ts` is a thin file-reader — it turns the Markdown files
above into the objects the page templates render. It intentionally contains
no actual copy; if you ever find a real sentence sitting in a `.tsx` file
instead of here, that's a bug, not a feature — flag it.
