---
title: CareerFlow AI — LLM resume-tailoring pipeline
dates: Dec 2025 – Present
featured: true
outcome: Cut tailoring a resume and cover letter for a new posting from roughly an hour of manual editing to a single command, with 73 offline tests covering the pipeline and no LLM calls in CI.
stack:
  - Python
  - LLM provider APIs (Anthropic, OpenAI, Google Gemini) behind one interface — native structured output, parsed completions, and a forced tool call for Claude
  - Pydantic (schema validation and structured-output modeling per call)
  - FastAPI (local API server)
  - ThreadPoolExecutor concurrency
  - YAML configuration (section mappings, length limits, prompts, per-step provider/model choice) with a web admin UI
  - LaTeX generation
  - Chrome Extension (MV3)
  - pytest (73 offline tests against a fake provider, no network calls in CI)
keywords:
  - LLM application development
  - prompt engineering
  - structured output
  - multi-provider abstraction
  - layered architecture
  - dependency injection
  - test-driven development
  - concurrency
  - REST API
  - configuration-driven design
---

CareerFlow AI tailors a LaTeX resume and cover letter to a job posting end to end: mine the job description, rank my experience against it, regenerate every section, compile to PDF. Solo project — architecture, prompt engineering, LaTeX generation, a local API server, and a Chrome extension, all built from scratch.

A resume has a page budget, and generated content doesn't know that. A section that runs long silently breaks the layout, and the obvious fix — compile, check, ask the model to shorten, repeat — is slow, non-deterministic, and can still fail after several round trips. I built a constraint engine instead: every generated section is checked against configured character, line, and item limits, and if it's over, the pipeline retries once with a stricter prompt. If it's still over after that, it truncates deterministically — whole bullets first, then sentences, then words, never mid-word. Page length became a guarantee, with a bounded worst case of two LLM calls per section, instead of something I had to hope worked out.

Getting the content right took a similar shape. A single LLM pass over a job description tends to return generic keywords — the core failure mode of naive tailoring, where the ranking and the bullets are working off requirements that were only surface-read. I replaced that with a two-pass Miner→Judge extraction: the miner over-extracts candidate requirements, the judge filters them for genuine relevance, and only the survivors get merged into the job description every downstream step reads from. Ranking, bullets, skills, and the cover letter all draw on the same vetted set of requirements, so the sections reinforce each other instead of quietly disagreeing.

That fix exposed a sharper problem underneath it: structured LLM output can't be trusted to be internally consistent. The ranking step, in particular, would sometimes return section keys that were hallucinated, duplicated, or silently dropped — and a dropped key meant real experience missing from the output resume. I added a reconciliation step at the call boundary that checks model output against the known section keys, keeps the model's ordering, and re-appends anything it omitted. It's structurally impossible now for a model error to delete a section, while a genuinely good ranking still comes through untouched.

Reconciliation only works if every provider's structured output looks the same by the time it reaches that boundary, and the providers don't agree with each other. Gemini rejects schemas with open-ended dict keys. Claude has no native structured-output mode at all. Left alone, that disagreement leaks provider-specific logic into generation code — so instead I defined one provider interface that takes a Pydantic schema, and implemented it per vendor: native structured output where it's supported, parsed completions where it isn't, and a forced tool call to get structure out of Claude. Where a provider couldn't express a schema as given, I reshaped it for that call. The payoff is that the model behind any step is now a config change, not a code change, and the entire test suite runs against a fake provider with no network calls at all.

### Making it fast enough to iterate on

None of this was fast if it ran the obvious way. A full run meant a dozen sequential LLM round trips, and waiting that long after every tweak discourages the kind of iterating this project actually needed. Looking at the dependency graph, ranking, bullets, profile, skills, and the cover letter all depend only on the enriched job description, and each writes to its own file — nothing about them requires running in order. So they run concurrently on a thread pool now, joining only before the final reorder and compile. That collapsed the slowest phase from the sum of all those calls to roughly the length of the longest one, with the cover letter's compile overlapping the resume's.

Speed didn't fix the other kind of friction, which was that any routine tuning — a length limit, a prompt tweak, which model handles which step — meant editing Python. I moved all of that into YAML: section mappings, length constraints, prompt text, per-step provider and model choice. Then I built a small web admin UI on top of it, with drag-and-drop section ordering, that invalidates the cached pipeline on save. Tuning became a browser task that takes effect on the next run, with no restart and no code touched.

Underneath all of this, the thing I was most careful about was the resume itself. Layering that depends on convention erodes — someone eventually writes to the wrong path — and a bug that wrote to the source resume instead of a copy would corrupt it with no way back. So the architecture is strict one-way layering, pipeline → services/repositories → domain, with LaTeX escaping confined entirely to the write path, and every request works against a copy of the resume tree in its own workspace. Generation never touches the source, the source stays immutable across every run, and each layer is independently testable — which is most of how the project ended up with 73 offline tests.

The last piece was just usability: all of this only ran from a terminal. I added a local FastAPI server around the same composition root the CLI already used, so nothing about the pipeline needed to change to expose it, plus a Chrome extension that reads company, title, and description straight off a job posting page. Applying to a posting is now filling three fields in a browser popup, running through the exact same code path as the CLI.
