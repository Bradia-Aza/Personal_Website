# Architecture Plan

No code yet — this is the shape of the thing before any of it gets built.
Companion to `REPORT.md` (what goes on each page) and `RESEARCH.md` (why).
This file answers a different question: **how is the codebase organized, and
where does content live.**

---

## 1. There is no backend

This is a static content site: five kinds of pages (home, portfolio, research,
notes, project/essay detail), all built from text you write and files you
commit. There's no database, no user accounts, no server-side logic that
reacts to a request. Next.js renders every page to static HTML at build time,
and Vercel serves those files from a CDN.

Concretely, that means:

- No API routes, no server functions, nothing that runs "live" per request.
- No database. Content is files in the repo, not rows in a table.
- The only "backend" work at all is a build step: turn your text files into
  HTML pages when you push to git. Vercel does this automatically.

This is deliberate, not a shortcut — `RESEARCH.md` §2.8 covers hosting, and a
static site is the correct answer for a five-page portfolio. Reaching for a
database or an API layer here would be the overengineering the CLAUDE.md rule
exists to prevent. If a real backend need shows up later (a comment system, a
contact form that emails you, view analytics beyond what Vercel gives for
free), that's a small, separate addition — not a reason to restructure now.

---

## 2. The frontend

**Framework:** Next.js (App Router), because it's the agreed choice and
because its file-based routing maps cleanly onto the site map without any
custom routing code. Pages are React components; there is no client-side app
state to speak of — most pages render once and stay static.

**Styling:** one small, consistent design system (type scale, one accent
color, a spacing scale), not a component library. The "simple and minimal"
brief means the design decisions are made once, in one place, and every page
just uses them — not that every page invents its own layout.

**Interactivity is minimal by default.** Nearly every page is static text and
links. The one place interactivity might matter is inside a Notes essay — an
embeddable diagram or small visualization — and even that is opt-in per essay,
not a site-wide requirement.

### Site map (from `REPORT.md`)

```
/                Home       — identity, interests, routing, CV link
/portfolio       Portfolio  — 3 projects in depth, rest listed
/portfolio/<x>   one project's full write-up
/research        Research   — thesis-adjacent work, direction
/notes           Notes      — essay index
/notes/<x>       one essay
/cv.pdf          static file, stable URL
```

Each route is a folder; each detail page (`/portfolio/<x>`, `/notes/<x>`) is
one route template that renders whichever content file matches the URL slug.
Adding a project or essay never means adding a route — it means adding a
content file, and the existing template picks it up.

---

## 3. Where content lives, and the editing rule

The rule that makes this maintainable without AI help: **content and code are
different folders, and neither depends on the other's internals.**

- **Content** — every fact, sentence, project write-up, and essay — lives in
  one clearly named directory as plain text files (Markdown for long-form
  writing, simple structured files for short lists like nav links or contact
  info).
- **Code** — page templates, layout, styling — never contains a sentence of
  actual content. It only knows *how* to display a project or essay, not
  *which* projects or essays exist.

Practically, this means three kinds of editing, none of which touch code:

1. **Change existing text** (bio line, a project's summary) → open the one
   file that holds it, edit the sentence, save.
2. **Add a project or essay** → add one new content file following the same
   pattern as the others already there. It appears on the site automatically
   because the listing pages read "whatever's in the folder," not a hardcoded
   list.
3. **Hide something** (an unfinished essay, a project you no longer want
   shown) → a single flag in that file's metadata, not a deletion or a code
   change.

The only things that ever require touching actual code are structural: adding
a new *kind* of page, changing the navigation, or changing how something looks
site-wide. Those are rare and are exactly the cases where AI help (or you,
reading component code) makes sense.

---

## 4. Deployment

Vercel, connected to the GitHub repo. Pushing to the main branch rebuilds and
redeploys automatically — no manual deploy step, no server to maintain.
`RESEARCH.md` §2.8–2.9 already covers hosting and domain; nothing above
changes that recommendation.

---

## 5. What's intentionally not here

- No CMS. Editing a file in the repo *is* the CMS. Adding a headless CMS would
  mean an external service, an API layer, and a sync step — real
  infrastructure for a problem five content files don't have.
- No database, no auth, no user accounts.
- No component library or design-system dependency. A handful of shared,
  simple building blocks (a page layout, a card, a nav bar) covers this site.
- No state management library. There isn't meaningful client state.

This list will only grow if a real requirement shows up that a static site
can't meet — not by default.
