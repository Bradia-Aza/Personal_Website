# Execution Plan

Step-by-step build order. Companion to `STRUCTURE.md` (architecture) and
`REPORT.md`/`RESEARCH.md` (what goes on each page, why).

Two constraints shape every phase below:

1. **The design is your call, not mine.** Phase 2 is built to show you real
   options and stop — nothing site-wide gets finalized without you picking it.
2. **Content has to stay editable by you, without AI help, forever after.**
   Every phase after scaffolding treats "can Bardia find and change this
   sentence in under a minute" as a pass/fail test, not a nice-to-have.

---

## Phase 0 — Scaffold (no design decisions, nothing visible)

Get a blank, working Next.js project running locally. No real content, no
styling beyond framework defaults.

- Initialize Next.js (App Router, TypeScript) in this repo.
- Set up the folder split from `STRUCTURE.md` §3: a `content/` directory
  (plain text/Markdown, nothing else) and the app code, kept separate from
  the start so it's never retrofitted.
- Empty route stubs for the five pages in the site map, each just rendering
  its own title — proves the routing works before anything else is built.
- Confirm `npm run dev` runs locally and each route loads.

**Output:** a boring, unstyled, empty site running on localhost. Nothing to
review yet — this phase is plumbing.

---

## Phase 1 — Design direction (interactive, stops for your decision)

This is the phase you flagged. It happens before any real content or final
layout goes in, and it does not proceed on my judgment alone.

**Step 1.1 — Present options, not one answer.**
I'll build 2–3 distinct visual directions for the same page (probably Home,
since it's the one every visitor sees first) — different type pairings,
spacing rhythm, accent color, and overall feel, all still within the "simple
and minimal" brief. These get shown as real, running pages (or an Artifact
mockup, whichever is faster to compare), not descriptions of design.

**Step 1.2 — You pick, or ask for changes.**
You choose a direction outright, ask for a hybrid, or send any of them back
for adjustment. This can loop — it's cheap to iterate on at this stage because
no content or page logic depends on it yet.

**Step 1.3 — Lock it in as the design system.**
Once you sign off, the winning direction becomes the single source of styling
truth (type scale, spacing scale, one accent color, light/dark handling) that
every later page reuses. Locking it here means no page gets built twice.

**I do not move to Phase 2 until you've explicitly approved a direction.**

---

## Phase 2 — Page templates, built against real content

With the design locked, build the actual page templates — Home, Portfolio
(index + detail), Research, Notes (index + detail) — using the approved look.
Content at this stage is pulled from `BACKGROUND.md` per the shape `REPORT.md`
already specifies, so what you review is close to the real site, not
lorem-ipsum.

Two things flagged explicitly rather than invented:

- The **forward-looking research-interest statement** (Home + Research) isn't
  in `BACKGROUND.md` — I'll mark it as a placeholder for you to write, per
  CLAUDE.md rule 4, not guess at it.
- **Notes essays** don't exist yet — the Notes page will show its real empty
  state, not fake posts.

**Output:** a site that looks and reads like the real thing, running locally,
ready for you to click through end to end.

---

## Phase 3 — The content-editing layer (the part that has to outlive me)

This phase exists specifically for your second requirement — that you can
find and change content yourself later. Concretely:

- One clearly named file per "thing you might want to change often": your
  bio/tagline, the interests list, nav links, contact info — short, plain
  files, not buried in component code.
- One file per project and per essay, all following the same simple template,
  so adding a new one is copying the pattern, not learning the system.
- A short section at the end of `STRUCTURE.md` (or a new `CONTENT_GUIDE.md`,
  whichever ends up clearer once the folders exist) listing exactly: "to
  change X, edit file Y." This is the artifact that proves the requirement is
  actually met, not just claimed.
- I'll do a final pass here specifically hunting for any stray content that
  leaked into a component file, and move it out.

**Output:** every sentence on the site traceable to one obvious file, no
exceptions.

---

## Phase 4 — CV, polish, and correctness pass

- CV as a header button per `REPORT.md` §1.4 — stable `/cv.pdf` URL. (You'll
  need to supply the actual PDF; I won't fabricate one.)
- Metadata (page titles, favicon, basic SEO tags), responsive check on mobile
  width, dark-mode check if the chosen design supports it.
- Link check across all pages (nav, footer, project links, CV button).
- Re-read `REPORT.md`'s five changes and confirm each one actually landed on
  the site, not just the plan.

---

## Phase 5 — Deploy

- Push to GitHub, connect to Vercel, confirm the production build matches
  what you approved locally.
- Domain: only if you've bought one already (`RESEARCH.md` §2.9) — otherwise
  ship on the free Vercel subdomain and point the domain at it later; that
  swap is a DNS change, not a rebuild.

**This phase is outward-facing** (a real public URL), so I'll confirm with
you before the first deploy and before pointing a purchased domain at it.

---

## What happens after Phase 5

The site is done, but two things from `REPORT.md`/`RESEARCH.md` stay open by
design, not by oversight:

- **Writing 3–6 real Notes essays** is on you — per `REPORT.md`, launching
  with an empty or thin Notes section is worse than not launching it, and no
  one else can write these.
- **The research-direction paragraph** flagged in Phase 2 needs your actual
  voice before it's real.

I can scaffold, template, and wire all of this up; I can't write the two
pieces of text that are supposed to be evidence of your own thinking.

---

## Where each phase leaves off if you stop early

Every phase above ends in a working, reviewable state — there's no phase that
has to fully complete before you can look at something real. If you want to
pause after Phase 1 to sit with the design choice, or after Phase 2 before
committing to the content-file structure, that's a natural stopping point,
not a half-finished one.
