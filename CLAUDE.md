# CLAUDE.md

Guidance for Claude Code (or any AI assistant) working in this repository.

## What this is

Bardia Azami's personal website: a portfolio + research + writing site for two
audiences — hiring managers and graduate-admissions readers. Source of truth
for all content decisions:

- `BACKGROUND.md` — every fact about education, work, and projects. Ground
  every claim on the site in this file. Never invent an employer, metric, or
  skill that isn't in it.
- `REPORT.md` — plain-language plan and rationale (structure + build options).
- `RESEARCH.md` — the technical version of the same plan, with sourcing.
- `STRUCTURE.md` — the architecture (frontend/backend/content split), no code.
- `EXECUTION_PLAN.md` — the phased build order this project follows.

Read `REPORT.md` before making structural decisions, and `EXECUTION_PLAN.md`
before starting or resuming build work — it says what phase comes next and
what each phase is and isn't allowed to decide.

## Core rules

1. **No overengineering.** This is a five-page content site, not a platform.
   Prefer the plain, boring solution. If a pattern (abstraction layer, state
   manager, generic plugin system) doesn't earn its keep on a site this size,
   don't add it.
2. **Content and code stay separated.** All editable text/data lives in
   `content/` as plain files the owner can find without reading code.
   Components and pages contain layout, not copy.
3. **Comment professionally, not excessively.** Comment *why*, not *what* —
   skip comments that restate the line below them. A short header comment on
   a file explaining its role is welcome; a comment on every line is not.
4. **No content invention.** If a page needs copy that isn't in `BACKGROUND.md`
   (e.g. a forward-looking research-interest statement), say so explicitly
   and mark it as a placeholder for the owner to write, rather than fabricating
   something that reads as fact.
5. **Keep it editable without AI help.** Every content change (new project,
   new essay, changed bio line) should be a plain-text edit in an obvious
   place — not a change to component logic.
6. **Design is the owner's decision.** Per `EXECUTION_PLAN.md` Phase 1, no
   site-wide visual direction (type, spacing, color) gets finalized without
   the owner explicitly approving it. Present options; don't unilaterally pick.
7. **Reviewer checks builder output before it reaches the owner.** Any change
   produced by the `frontend-site-builder` or `content-writer` agents must be
   handed to the `reviewer` agent for a compliance check against these rules
   and `BACKGROUND.md` before it's presented as done. This applies to future
   builder-role agents too, not just these two by name.

## Status

Phase 0 (scaffold) complete: blank Next.js app with empty route stubs for the
five pages in the site map. No design, no real content yet. Next step is
Phase 1 (design direction) per `EXECUTION_PLAN.md`.
