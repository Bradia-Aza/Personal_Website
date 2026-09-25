---
title: CareerFlow AI — LLM resume-tailoring pipeline
dates: Dec 2025 – Present
featured: true
outcome: Cut tailoring a resume and cover letter for a new posting from roughly an hour of manual editing to a single command, with 73 offline tests covering the pipeline and no LLM calls in CI.
stack:
  - Python
  - LLM APIs (Anthropic, OpenAI, Google Gemini)
  - Pydantic
  - FastAPI
  - ThreadPoolExecutor concurrency
  - LaTeX
  - Chrome Extension (MV3)
  - pytest
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

Built an AI system that tailors a LaTeX resume and cover letter to any job description end to end: a two-pass LLM extraction step mines job requirements, ranks experience by relevance, and regenerates every section under hard length constraints so the result always compiles to a fixed page budget. Solo project, designed and built end to end — architecture, LLM prompt engineering, LaTeX generation, local API server, and Chrome extension.

## Problem

Overflowing content silently breaks a page budget, and compile-and-retry loops are slow, non-deterministic, and can still fail after several round trips.

## Solution

I built a constraint engine that validates every generated section against configured character, line, and item limits, retries once with a stricter prompt, then deterministically truncates by dropping whole bullets, then sentences, then words — never cutting mid-word.

## Result

Page length became a guarantee rather than an outcome, with a bounded worst case of two LLM calls per section and no garbled text.

## Problem

A single LLM pass returns generic keywords — the core failure mode of naive resume tailoring.

## Solution

I designed a two-pass Miner→Judge extraction step that over-extracts candidates then filters them for genuine relevance, merging survivors into the job description every downstream service consumes.

## Result

Ranking, bullets, skills, and the cover letter are grounded in the same vetted requirements, so sections reinforce rather than contradict each other.

## Problem

Structured LLM output can't be trusted to be internally consistent — the ranking step returned section keys that were hallucinated, duplicated, or silently dropped, which would have deleted real experience from the resume.

## Solution

I added a reconciliation step validating model output against known section keys at the call boundary, preserving the model's ordering while re-appending anything omitted.

## Result

Structurally impossible for a model error to remove a section, while still honoring a sound ranking.

## Problem

Provider APIs disagree on structured output — Gemini rejects schemas with open-ended dict keys, Claude has no native structured-output mode — so provider choice was leaking into generation logic.

## Solution

I defined a single provider interface taking a Pydantic schema and implemented it per vendor (native structured output, parsed completions, and a forced tool call for Claude), reshaping schemas where a provider couldn't express them.

## Result

The model behind any step became a config change rather than a code change, and the whole test suite runs against a fake provider with no network calls.

## Problem

A dozen sequential LLM round trips made each run slow enough to discourage iterating.

## Solution

I identified that ranking, bullets, profile, skills, and the cover letter depend only on the enriched job description and each write a distinct file, then ran them concurrently on a thread pool, joining before the reorder and compile.

## Result

Collapsed the slowest phase from the sum of its LLM calls to roughly the longest one, with the cover-letter compile overlapping the resume's.

## Problem

Routine tuning required editing Python.

## Solution

I moved section mappings, length constraints, prompt text, and per-step provider/model choice into YAML, and built a web admin UI to edit all three files with drag-and-drop section ordering, invalidating the cached pipeline on save.

## Result

Prompt and layout tuning became a browser task taking effect on the next run, with no restart and no code edit.

## Problem

Layering by convention erodes, and a bug writing to the source resume instead of a copy would corrupt the originals irrecoverably.

## Solution

I enforced strict one-way layering (pipeline → services/repositories → domain) with LaTeX escaping confined to the write path, and copied the resume tree into a per-request workspace so generation never touches the source.

## Result

Source resume immutable across every run, each layer independently testable, covered by 73 offline tests.

## Problem

The pipeline still had to be driven from a terminal.

## Solution

I added a local FastAPI server around the same composition root the CLI uses, plus a Chrome extension capturing company, title, and description from the posting page.

## Result

Applying to a posting became filling three fields in a browser popup, sharing one code path with the CLI.
