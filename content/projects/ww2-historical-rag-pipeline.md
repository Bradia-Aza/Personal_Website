---
title: WW2 Historical RAG Pipeline
dates: 2024
featured: false
outcome: Deployed a web interface non-technical evaluators could use, with every answer traceable to its source passage and an explicit fallback when confidence was too low.
stack:
  - Python
  - PyTorch
  - Hugging Face Transformers
  - sentence embeddings / semantic search
  - RAG
  - web scraping
  - Gradio
keywords:
  - NLP
  - RAG
  - semantic search
  - vector search
  - sentence embeddings
  - sentence-transformers
  - extractive QA
  - RoBERTa
  - Hugging Face
  - PyTorch
  - chunking strategy
  - hallucination mitigation
  - Gradio
---

Engineered an end-to-end retrieval-augmented generation system aggregating unstructured historical content from the web and answering questions extractively, with source attribution and an explicit confidence floor. Solo NLP project — scraping/ETL layer, semantic chunking, two-stage retrieval, and the Gradio front end.

## Problem

Fixed-size chunking split sentences mid-thought and swept in navigation and cookie-notice boilerplate, polluting the vector index.

## Solution

I designed a semantic chunking algorithm respecting sentence boundaries and filtering boilerplate before embedding, targeting ~300-word context windows.

## Result

Coherent, self-contained chunks and no junk text in retrieval results.

## Problem

Semantic search returns roughly relevant passages, not answers.

## Solution

I implemented a two-stage pipeline pairing dense vector retrieval over sentence embeddings with an extractive QA model pinpointing the answer span inside retrieved text.

## Result

Precise answers grounded in source passages rather than whole paragraphs.

## Problem

The QA model returned confident one-word fragments that were technically extractive but useless.

## Solution

I engineered a ranking heuristic scoring candidates on model confidence weighted by answer length, penalizing degenerate short spans.

## Result

Low-context answers filtered out and substantive ones surfaced instead.

## Problem

Sources were inconsistently structured and bot-protected, littered with non-ASCII artifacts.

## Solution

I built a resilient scraping and ETL module with header rotation, error handling, and text normalization.

## Result

A clean, uniform corpus from heterogeneous sources with no manual intervention.

## Problem

Index building was the slowest setup stage.

## Solution

I optimized throughput with batched inference during the index build.

## Result

Substantially cut index construction time versus per-document embedding.

## Problem

When no relevant passage existed, the system still answered, presenting fabrications as historical fact.

## Solution

I implemented a calibrated confidence threshold triggering an explicit "not confident enough" fallback.

## Result

Reduced false-positive answers and made uncertainty visible rather than hidden.

## Problem

The pipeline was reachable only from a notebook.

## Solution

I developed a web interface with real-time inference, source-attribution display, and pre-cached example queries.

## Result

Usable by non-technical evaluators, every answer traceable to its source.
