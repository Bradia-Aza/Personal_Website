---
title: AITOS — Context optimization for AI coding agents
dates: 2026
featured: true
outcome: Captures and optimizes every Claude Code and Codex session on the machine, from the terminal or VS Code, with no change to the developer's workflow, backed by ~690 gateway tests that run without any provider credentials.
stack:
  - Python
  - FastAPI
  - asyncio
  - LiteLLM
  - SSE streaming
  - Anthropic Messages API
  - OpenAI Chat Completions & Responses APIs
  - SQLite
  - pytest
  - GitHub Actions
keywords:
  - LLM gateway
  - API proxy
  - context optimization
  - prompt compression
  - token cost reduction
  - AI coding agents
  - agentic AI
  - LLM orchestration
  - LLM observability
  - streaming
  - fail-open design
  - hexagonal architecture
  - contract testing
---
AI coding agents are expensive to run, and much of what they send to the model doesn't need to be there. Every turn resends the whole conversation, including long tool outputs, repeated command results, and verbose instructions. The model reads all of it, and you pay for all of it.

AITOS is built around a simple question: how much of that context can be removed safely, without the agent noticing and without breaking the developer's session?

It is a local runtime that sits between AI coding agents (Claude Code, Codex CLI, and their VS Code extensions) and the LLM provider. It intercepts each provider-bound request, removes redundant context, and records every exchange before and after, so each saving can be checked rather than taken on trust.

AITOS is a commercial product built by a team of three, so the code is not open source. I owned the LLM gateway, the provider-side interception layer that every request passes through, and contributed to the optimization pipeline.

## Problem

Agents speak different wire formats, and provider-specific logic tends to leak into every part of a system.

## Solution

I designed the gateway around a provider-neutral canonical model for requests, responses, and streams. Adapters translate the Anthropic and OpenAI formats at the edges, and a single module calls providers through LiteLLM, with cross-routing so either input format can reach either provider. Architecture rules (LiteLLM confined to one module, no provider branching outside routing, capture isolated from the coordinator) are enforced as tests.

## Result

The optimizer works on one format only, and adding a provider or input format touches only the edges of the system.

## Problem

An optimizer sitting in the request path must never be the reason an agent fails.

## Solution

I built the review hand-off with the runtime coordinator (allow, replace, or deny). The gateway validates only the shape of each answer and fails open on timeouts, connection errors, or malformed replies, recording the reason each time.

## Result

Optimization runs on every request, yet a coordinator outage degrades to plain passthrough instead of a broken session.

## Problem

Savings claims mean little without evidence of what was actually sent.

## Solution

I built a capture pipeline that writes one record per request: the request as it arrived, the request as it was sent, telemetry, and redacted raw traffic at four hops. Records are written through a bounded off-path queue so the response never waits on disk, and each record gets exactly one outcome (completed, denied, provider error, client disconnect, broken stream, or coordinator unavailable).

## Result

Every optimization can be measured from its before and after payloads, and translation loss can be measured hop by hop.

## Problem

Streaming and credentials are where proxies quietly go wrong.

## Solution

I implemented event-by-event SSE forwarding with no buffering, mapped provider errors into a closed set of caller-format errors that keep raw provider text out of responses, and propagated client cancellations upstream so the provider stops generating billable tokens. The caller's own credential (OAuth login or API key) is passed through to keep their billing identity, but it never reaches the coordinator, capture files, or error messages.

## Result

The gateway is transparent to the agent, and credentials and partial streams are handled safely.

## Problem

Codex's Responses API can't be rebuilt from a neutral model, because it carries reasoning items, item IDs, and encrypted content.

## Solution

I added a dedicated passthrough route to the ChatGPT backend with a one-way canonical reader. Optimizer changes are applied as text-only patches on Codex's original request body, and anything that can't be patched safely falls back to the original bytes.

## Result

Codex traffic is optimized too. Because the patches are deterministic, the same history produces the same bytes on every turn, so the provider's prompt cache keeps working.

## Problem

Wrapping a single terminal session misses most real usage, since developers run agents from many terminals and from their IDE.

## Solution

I built machine-wide attach and detach for Claude Code (settings.json) and Codex (config.toml). The original files are restored on stop, and Claude sessions still attached after a detach get a clear error instead of retrying silently. I also correlated traffic by session and client (CLI, VS Code, SDK) using each agent's metadata, so side requests like Codex thread titles are grouped with the conversation they belong to.

## Result

A single `aitos serve` captures every agent session on the machine, grouped into coherent per-session timelines for the dashboard.
