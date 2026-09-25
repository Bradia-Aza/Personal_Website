---
title: Dallas Police Incident Analysis
dates: 2024
featured: false
outcome: Turned an unusable 86-column extract into modeling-ready data and established a reproducible scoring baseline comparing KNN, Decision Tree, and Random Forest on fixed splits.
stack:
  - Python
  - pandas/NumPy
  - scikit-learn
  - classification (KNN, Decision Tree, Random Forest)
  - hyperparameter tuning
  - data visualization
  - Jupyter/Colab
  - Git
keywords:
  - machine learning
  - supervised learning
  - classification
  - Random Forest
  - Decision Tree
  - KNN
  - scikit-learn
  - pandas
  - feature engineering
  - categorical encoding
  - class imbalance
  - stratified sampling
  - hyperparameter tuning
  - grid search
  - model evaluation
  - confusion matrix
---

Built a reproducible cleaning, feature-reduction, and supervised classification pipeline turning the City of Dallas police-incident dataset of 86 raw columns into modeled predictions of offense status, enabling pattern discovery across location and demographics. Solo data science project.

## Problem

High-cardinality categoricals with severe imbalance exploded into thousands of one-hot columns.

## Solution

I engineered mappings collapsing compound and ambiguous category values, dropped categories below a 0.1% frequency threshold, and removed attributes missing more than 50% of values.

## Result

A tractable encoded feature space and reduced label noise, giving more stable precision and recall on tree-based models.

## Problem

The raw 86-column extract blocked any modeling — sparse columns, text-typed dates, incomplete rows.

## Solution

I automated a cleaning pipeline dropping majority-missing columns, converting date fields to datetime, removing incomplete rows, and emitting two cleaned datasets with and without rare categories.

## Result

Modeling-ready data, and rare-category pruning measurable as a controlled comparison.

## Problem

Ad hoc splits made scores incomparable between runs.

## Solution

I implemented stratified sampling across both imbalanced and balanced distributions and exported fixed train/test splits to disk.

## Result

Every model evaluated against identical data, so score differences reflected the model rather than the split.

## Problem

No baseline existed for which classifier suited this categorical-heavy dataset.

## Solution

I evaluated KNN, Decision Tree, and Random Forest, tuning via grid search and selecting K empirically at 18 for KNN.

## Result

Identified the best-performing configuration and improved accuracy over untuned baselines.

## Problem

Accuracy alone hid minority-class failures.

## Solution

I standardized evaluation on accuracy, full precision/recall/F1 reports, and confusion matrices in tabular and graphical form.

## Result

Exposed per-class performance and established a reproducible scoring baseline.

## Problem

Inline preprocessing couldn't be reused.

## Solution

I implemented modular functions for sampling, binning, encoding, column filtering, and visualization.

## Result

The pipeline is reusable on other categorical-heavy datasets without rewriting preprocessing.
