---
title: Building a Gateway for LLMs: More Than Just a Proxy
dates: November 2026
published: true
---

As part of building AITOS, a startup I'm working on with two other people, one of the main things we wanted to explore was how we could reduce the amount of context an AI coding agent sends to an LLM. Coding agents can generate a lot of context throughout a session, and not all of it is necessarily useful for the next request. This made us think about whether we could intercept these requests, understand what is being sent, and optimize them before they reach the model.

One of the first things I worked on was the gateway.

The idea was fairly simple: put a small local server between the coding agent and the LLM provider. From the agent's perspective, nothing really changes. It still sends requests to the provider and receives responses. But now we have a place where we can observe the traffic, record it, and eventually decide whether some parts of the request can be optimized.

I wanted to keep the gateway as simple as possible. It shouldn't be responsible for deciding what to optimize or how to optimize it. Its job is to forward requests, stream responses back, and communicate with the component responsible for making those decisions. This separation also makes it easier to support different providers without having to put all their specific logic into the optimization engine.

To make this work across different providers, I introduced a canonical format. The idea is that every request gets translated into a common internal representation before being passed to the coordinator. This way, the coordinator doesn't need to know whether a request originally came from Anthropic or OpenAI.

But things got more interesting when I started working on Codex.

Unlike Claude Code, Codex uses the OpenAI Responses API, and it has some specific requirements around how requests and responses are handled. For example, it uses encrypted reasoning items and custom tool calls. Simply converting its requests into another API format and then rebuilding them would mean losing information that needs to be preserved.

So instead of trying to translate everything, I decided to use a different approach for Codex. The gateway forwards the original request without rebuilding it, while keeping a separate copy in our internal format so the coordinator can still observe what's happening.

This was an important architectural decision. It made me realize that having a common internal representation doesn't necessarily mean that every request needs to be reconstructed from it. Sometimes, preserving the original data is more important than having a unified format.

Of course, observing and modifying requests is only half of the story. The real question is whether these optimizations actually work.

During the experiments, I found that the prompt filter alone reduced request bytes by around 3%. In some cases, when the context contained large files or noisy logs, the savings were much higher.

But one of the most interesting findings wasn't about how much we could save. It was about what could go wrong.

In one experiment, I noticed that the deduplication logic was removing repeated lines from file contents. At first, this might sound reasonable, especially when dealing with logs. But the same logic was also being applied to source code.

In one test, around 20% of the lines across the files were removed. The model was then asked to quote a function from one of those files, and it returned an incomplete version without even warning that some of the code was missing.

This was a good reminder that reducing context doesn't necessarily mean improving it. A smaller prompt is only useful if we preserve the information the model actually needs.

It also made me think more carefully about where these optimizations should be applied. Removing repeated lines from a log might be perfectly fine, but applying the same rule to source code, JSON, or CSV files can have completely different consequences.

There is also another aspect to consider: caching. Even when an optimization reduces the number of input tokens, changing the prompt can affect how many tokens are served from the provider's cache. In our experiments, the first patched request had no cached tokens because the modified prompt was new. So although we were reducing the prompt size, we were also introducing additional uncached tokens.

This means that token reduction alone isn't enough to determine whether an optimization is worthwhile. We also need to consider caching, latency, and, most importantly, whether the model can still do the job correctly.

AITOS is still a prototype, and there is a lot more to explore. But working on the gateway has made one thing particularly clear to me: building an LLM gateway isn't just about intercepting API requests. It's about understanding what happens between the agent and the model, and finding ways to improve that interaction without breaking what already works.
