---
title: Comparative deep learning analysis — ViT vs. CNNs for outdoor fire detection
role: AI Researcher — University of Isfahan
dates: Sep 2022 – Jul 2023
outcome: Established the transformer as the stronger detector at 95.7% accuracy with 13 false positives, against 30–46 for the CNN baselines, while identifying RegNetX as the better fit for aerial smoke. Diagnostic analysis on every false positive traced 35% of errors to firefighter and red-truck features in the images.
report: /reports/fire-smoke-detection-technical-report.pdf
reportLabel: Technical report (PDF, 19 pages)
stack:
  - Python
  - PyTorch
  - CNNs
  - Vision Transformers
  - transfer learning
  - computer vision
  - NumPy
  - model benchmarking
---

Engineered a computer vision pipeline benchmarking attention-based architectures against convolutional baselines for early fire and smoke detection in unstructured outdoor environments, aimed at reducing disaster-response latency. I designed the benchmark, curated the dataset, and ran the five-architecture comparison.

## The question

Smoke often appears before flames do, and cameras already watch far more open ground than heat or smoke sensors can reach. Outdoor scenes make vision-based detection hard, though: weather and light keep changing, and plenty of things look like fire or smoke without being either.

Fire and smoke also have no fixed shape and can spread across large, irregular parts of an image. That raised the question behind this study. A CNN builds its view of an image from local operations, while a vision transformer's self-attention relates every image patch to every other. Does that global view give the transformer a real advantage here?

## The dataset

I couldn't find a single available dataset that covered the outdoor scenes this needed, so I compiled one: 10,656 images of fire, smoke, and neutral scenes, drawn from web image searches, YouTube video frames, and existing GitHub and Kaggle datasets. The neutral class deliberately includes hard cases, such as fire-coloured objects and clouds that look like smoke.

Training images included indoor, blurred, monochrome, and low-quality examples to help the models generalize. The final evaluation used only outdoor validation images that met a quality threshold, to match the intended use with standard colour cameras.

## The benchmark

I compared five ImageNet-pretrained backbones: ResNet50, ResNet101, RegNetX-1.6GF, RegNetY-800MF, and DeiT, a data-efficient vision transformer. Each feature extractor stayed frozen, and only an identical three-layer classifier head was trained on top, with separate heads for fire and smoke. Freezing kept training cost manageable across five models, and it meant differences between them mainly reflected how well each backbone's pretrained features represented fire and smoke.

Every head was trained with AdamW at a learning rate of 1e-4 with matching weight decay. I scored the models on accuracy, precision, recall, and F1, along with FLOPs and parameter count.

## Results

DeiT scored highest on every classification metric for both tasks, with 95.7% accuracy on fire and 94.8% on smoke. Its lead over the runner-up, RegNetX-1.6GF, was 2.7 points on fire. On smoke it was only 0.7 points, too small for a single run to settle.

More computation didn't buy more accuracy. ResNet101 needs almost twice the FLOPs of ResNet50 and scored slightly lower on both tasks. RegNetY-800MF, the smallest model, reached 92.9% on fire and 92.6% on smoke with about a quarter of DeiT's parameters and a fifth of its FLOPs.

## Where the models failed

Aggregate scores said little about what caused the errors, so I sorted the false positives and false negatives by scene type. Most false fire detections came from red or orange objects and lights, or from images of the sky. DeiT made 13 of these mistakes, against 30 to 46 for the CNNs.

The models turned out to have complementary strengths. DeiT missed only one wildfire image. RegNetX-1.6GF missed 3 aerial smoke images to DeiT's 7, and the ResNets missed 6 and 7 small-scale fires to RegNetY-800MF's 17.

One failure was shared by all five. Up to 35% of false detections were images of firefighters or fire engines with no visible fire or smoke, so the models had learned a cue that merely tends to appear alongside fire. A deployed system could raise a false alarm whenever a crew passed a camera.

## What the study can't claim

Each model was trained once, with no confidence intervals and no separate test set. The validation images also picked each model's best checkpoint, so the numbers are probably optimistic. With only one transformer and frozen backbones, the results describe pretrained features more than the architectures themselves, and DeiT's modern training recipe may explain part of its lead.

Repeating the study today, I would fine-tune the backbones, compare several transformers and modern CNNs, report multiple runs, split the data by source video, and use attention maps to test why DeiT did well. The technical report, written with Mohammad Amin Dehmolaee and Peyman Moallem, has the full tables, training curves, and discussion.
