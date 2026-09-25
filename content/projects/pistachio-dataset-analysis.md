---
title: Pistachio Dataset Analysis and Modeling
dates: 2024
featured: false
outcome: Cut experiment turnaround by persisting extracted features as reusable artifacts, and surfaced mislabeled samples the supervised pipeline alone could not see.
stack:
  - Python
  - scikit-learn
  - TensorFlow/Keras
  - transfer learning (CNNs)
  - pandas/NumPy
  - dimensionality reduction (PCA, LDA)
  - clustering & anomaly detection
  - data visualization
keywords:
  - machine learning
  - computer vision
  - feature engineering
  - transfer learning
  - CNN
  - SVM
  - Naive Bayes
  - MLP
  - ensemble learning
  - stacking
  - SMOTE
  - PCA
  - LDA
  - clustering
  - KMeans
  - DBSCAN
  - anomaly detection
  - scikit-learn
  - TensorFlow
---

Built an end-to-end machine learning pipeline over pistachio images and handcrafted features covering classification, outlier detection, and clustering, reducing reliance on manual inspection by combining engineered and deep-learned feature representations with automated model evaluation. Solo ML project.

## Problem

Neither handcrafted features nor learned embeddings alone separated the classes reliably.

## Solution

I combined 28 handcrafted morphological, shape, and color features with deep embeddings from a pretrained CNN and three custom architectures, persisting extracted features to disk.

## Result

A richer fused representation, and repeated CNN extraction removed from every experiment.

## Problem

Small, heavily imbalanced dataset made models collapse toward the majority class.

## Solution

I applied synthetic minority oversampling (SMOTE) inside the pipeline with stratified splits, so resampling and scaling were fit only on training folds.

## Result

Improved minority-class recall while preventing the data leakage that inflates scores during hyperparameter search.

## Problem

Concatenating tabular features with CNN embeddings produced a high-dimensional, highly correlated space.

## Solution

I applied correlation filtering, Recursive Feature Elimination, and PCA/LDA reduction.

## Result

Stable classification and clustering on the combined data, with class structure visualizable in 2D and 3D.

## Problem

Model choices were made ad hoc, so results weren't comparable.

## Solution

I implemented a grid-search selection workflow spanning Naive Bayes, SVM, MLP, and stacking ensembles, persisting fitted models and features.

## Result

Repeatable, directly comparable evaluation across all candidates.

## Problem

Unlabeled anomalies and latent groupings were invisible to the supervised pipeline.

## Solution

I architected an unsupervised layer with outlier detection (Local Outlier Factor, Isolation Forest, One-Class SVM) and a clustering evaluator (KMeans, DBSCAN, Gaussian Mixture) scored on three internal indices.

## Result

Surfaced mislabeled and anomalous samples and let cluster counts be chosen on evidence rather than by eye.

## Problem

Preprocessing, extraction, and modeling were entangled, so any change forced a costly full re-run.

## Solution

I reorganized into separate modules with the cleaned dataset and extracted features saved as reusable artifacts.

## Result

Classical ML experiments iterate without re-running CNN feature extraction, reproducible from saved artifacts.
