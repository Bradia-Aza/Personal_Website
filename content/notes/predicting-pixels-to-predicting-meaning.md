---
title: From Predicting Pixels to Predicting Meaning
dates: July 2026
published: true
---

A few months ago, I came across I-JEPA, and it immediately really caught my attention. Instead of reconstructing missing pixels, the model learns to predict representations of unseen parts of an image. That simple shift made me curious about what a model actually learns when it is trained to predict representations rather than the original input.

I started thinking about whether a similar idea could work for language. What if, instead of predicting the next token, a model could learn to predict the representation of something related to its input? I wondered whether the same principle could help language models learn better representations of meaning, rather than relying entirely on reconstructing text.

As I explored this question, I came across LLM-JEPA, which had already taken a step in that direction. The paper introduces a representation-prediction objective alongside the standard next-token prediction objective. Given two related views of a piece of information, the model learns to predict the representation of one from the other, while still retaining its ability to generate text.

One of the things I found particularly interesting was how the authors extended this setup beyond structured text-to-code tasks. They also experimented with question answering. In their NQ-Open experiment, a question is treated as the input view and its answer span as the target view. The model is trained not only to generate the answer but also to predict its representation.

This made me think about the relationship between questions and answers more closely.

A question can have several valid answers. They might express the same information using different words, provide different levels of detail, or even use different representations altogether. A short answer, a paragraph, a piece of code, or a structured representation might all communicate something relevant to the same question.

That led me to another question:

What if a model could learn a representation of the possible answers to a question, rather than being trained to predict the representation of only one selected answer?

I don't know whether this is a useful direction yet, or what a good objective for it would look like. But it seems like an interesting way to think about representation learning in language: not only learning to predict an answer, but exploring what information a question contains about the space of answers it can support.

For now, this is simply a question I want to understand better.
