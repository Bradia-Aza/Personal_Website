---
title: From Predicting Pixels to Predicting Meaning
dates: July 2026
published: true
---

How can a model learn a representation of the possible answers to a question?

This question has been on my mind for quite a while, so I wanted to write about the journey that led me to it.

A few months ago, I came across I-JEPA, and it immediately caught my attention. What interested me most was how the model learns to predict representations of unseen parts of an image rather than reconstructing missing pixels. This shift made me think about how models could learn to understand images in a way that is closer to how we perceive them. It also got me thinking about what a model actually learns when it is trained to predict representations rather than the original input.

LLMs have surpassed human-level performance on many benchmarks, yet humans remain remarkably capable of handling complex problems. I started wondering whether understanding how humans approach problems and using those insights to inform our architectures could lead to another breakthrough. This is where the idea of learning representations closer to how we perceive things becomes particularly interesting. But extending this beyond vision, how do we actually approach problems in our daily lives?

One thing that comes to mind is our hierarchical approach to problem-solving, something that multi-agent systems try to mimic through orchestration, yet still fall short of. A common argument is that this has something to do with the next-token prediction objective these models are trained with.

Let me give you an example. As someone whose first language isn't English, I often find myself deleting a sentence and rewriting it from scratch, using different words or a different structure while keeping the same meaning. That's because I already have a representation of what I want to express in my mind, so the exact sequence of words doesn't necessarily matter. All of this got me thinking: could we apply a similar idea to language models?

What if, instead of predicting the next token, a model could learn to predict the representation of something related to its input? I wondered whether the same principle could help language models learn better representations of meaning, rather than relying entirely on reconstructing text.

As I explored this question, I came across LLM-JEPA, which had already taken a step in that direction. The paper introduces a representation-prediction objective alongside the standard next-token prediction objective. Given two related views of a piece of information, the model learns to predict the representation of one from the other, while still retaining its ability to generate text.

One of the things I found particularly interesting was how the authors extended this setup beyond structured text-to-code tasks. They also experimented with question answering. In their NQ-Open experiment, a question is treated as the input view and its answer span as the target view. The model is trained not only to generate the answer but also to predict its representation.
This made me think about the relationship between questions and answers more closely.

A question can have several valid answers. They might express the same information using different words, provide different levels of detail, or even use different representations altogether. A short answer, a paragraph, a piece of code, or a structured representation might all communicate something relevant to the same question.

So, getting back to the original question:
What if a model could learn a representation of the possible answers to a question, rather than being trained to predict the representation of only one selected answer?

I don't know whether this is a useful direction yet, or what a good objective for it would look like. But it seems like an interesting way to think about representation learning in language: not only learning to predict an answer, but exploring what information a question contains about the space of answers it can support.

For now, this is simply a question I want to understand better.


