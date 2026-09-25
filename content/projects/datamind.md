---
title: DataMind — Conversational BI platform
dates: 2025
featured: true
outcome: Runs end to end against PostgreSQL, MySQL, SQL Server, and Oracle, with the SQL guard's hostile-input corpus enforced as a CI hard gate on every merge.
stack:
  - Python
  - FastAPI
  - React/TypeScript
  - SQL (PostgreSQL, MySQL, SQL Server, Oracle)
  - LLM integration
  - Docker
  - data visualization
keywords:
  - text-to-SQL
  - RAG
  - agentic AI
  - LLM orchestration
  - business intelligence
  - semantic layer
  - SQL injection prevention
  - AST parsing
  - SQLGlot
  - RBAC
  - data governance
  - REST API
  - full-stack development
---

Built a modular-monolith platform letting users ask questions in plain language over relational databases and get back an auditable answer, table, and chart, with an AST-based SQL guard, a configurable disclosure policy, and a semantic layer securing every model-generated query. Solo build spanning a FastAPI backend, React/TypeScript front end, and a multi-database execution layer.

## Problem

A single failed step would sink the whole request. Answering a natural-language question requires routing, schema retrieval, generation, validation, and execution.

## Solution

I designed a ten-node conversational pipeline with a bounded repair loop, persisted and streamed live to the client with replay support for dropped connections.

## Result

Failures self-correct within a fixed retry budget and the session stays recoverable after a network interruption.

## Problem

LLM-generated SQL is untrusted input, and blocklist filtering is trivially bypassed.

## Solution

I built an AST-based SQL guard parsing every proposed statement against an allowlist, failing closed on any unrecognized expression type, validated against a hostile-input corpus enforced as a CI hard gate.

## Result

Unsafe queries blocked by construction rather than pattern matching, with regressions caught before merge.

## Problem

Access restrictions are useless if tightening them needs a re-sync, or if history still leaks the data.

## Solution

I implemented a per-connection disclosure policy (NONE, AGGREGATE, SAMPLE, FULL) applied at render time across query results, schema hints, and conversation history.

## Result

Policy changes take effect immediately with no re-sync and no leakage through the existing transcript.

## Problem

Without business context, generated SQL silently produced wrong numbers, particularly by fanning out rows across joins.

## Solution

I engineered a semantic-layer generator deriving table meaning, metrics, and join fan-out cautions from the schema catalog, validating each generated metric's SQL and preserving human edits on regeneration.

## Result

Generation grounded in verified business definitions, with analyst corrections surviving the next run.

## Problem

Dashboards and reports were separate execution paths that could bypass the chat path's protections.

## Solution

I extended the guarded execution path to dashboards (per-tile connection, refresh, row-cap ceiling) and reports (guarded queries composed into narrated documents with a numeric fact-checker), reusing the same SQL guard across all three entry points.

## Result

Identical safety guarantees everywhere, with no unguarded path to the database.

## Problem

Layering rules erode silently, and stored DB credentials are a breach target.

## Solution

I enforced the dependency rule with an import linter in CI and encrypted stored credentials with AES-256-GCM bound to row identity as authenticated data.

## Result

Architectural violations fail the build, and stolen credential rows are undecryptable outside their original record.
