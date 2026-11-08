---
title: Deep-learning edge-preserving CT reconstruction
role: AI Engineer — Behyar Sanaat Sepahan
dates: Jun 2021 – Jun 2022
outcome: Delivered a reconstruction model that preserved diagnostic edge detail where pixel-loss-only training blurred it — trained without access to paired clinical scans, using a hybrid perceptual/pixel loss and a differentiable Sobel edge layer.
stack:
  - Python
  - TensorFlow/Keras
  - CNNs
  - autoencoders
  - transfer learning
  - computer vision
  - NumPy
  - medical imaging
---

Engineered a deep learning pipeline to reconstruct diagnostic-quality medical images from low-dose CT scans, easing the trade-off between patient radiation exposure and diagnostic clarity. I owned the model architecture, loss design, and the synthetic training-data pipeline.

## The problem

Lowering the dose of a CT scan reduces the radiation a patient receives, but the image comes out noisier. Denoising autoencoders can clean up that noise, but they tend to smooth away the organ boundaries a radiologist needs to read. Training on pixel-wise error makes this worse, because blurry averages score well numerically.

So the goal was a model that removed noise while keeping those edges. There was a second constraint as well: paired low-dose and full-dose clinical scans are scarce.

## Building the training data

Without paired clinical data, I generated the pairs myself. Applying Poisson noise modeling to standard CT scans simulated realistic low-dose artifacts, and this produced over 10,000 paired images, enough to train the network. The low-dose inputs it learned from were therefore simulated, with the original scans serving as the targets.

## The model

Seeing a whole organ normally costs either spatial detail or compute. I built a dilated residual network with varying dilation rates, so the receptive field grows exponentially with depth. This captured global anatomical context while preserving spatial resolution, with no pooling and no added parameters.

To keep the boundaries sharp, I implemented a differentiable Sobel edge-detection layer inside the network's computation graph. Because edge detection was part of the graph itself, training had to prioritize structural recovery over texture.

## The loss

Pixel error alone pulls a network toward blurry averages, so I designed a hybrid loss: 70% distance in a pretrained network's perceptual feature space and 30% pixel-space error. The perceptual term enforced semantic similarity to the target, and the reconstructions came out visibly sharper at comparable pixel-level fidelity.

## Making it train

The combined loss has a non-convex surface, and default optimizer settings oscillated on it. I tuned the learning rate and momentum specifically for this loss, which stabilized convergence. I also added a custom PSNR metric so that reconstruction quality could be tracked live during training.
