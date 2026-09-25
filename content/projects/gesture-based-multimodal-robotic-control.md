---
title: Gesture-Based Multimodal Robotic Control (ROS 2)
dates: 2024
featured: false
outcome: Demonstrated end-to-end teleoperation with vision, motion, and speech running concurrently without the stack freezing during audio playback.
stack:
  - Python
  - ROS 2
  - OpenCV
  - computer vision
  - text-to-speech
  - robotics middleware
keywords:
  - ROS 2
  - robotics
  - robotics middleware
  - computer vision
  - OpenCV
  - gesture recognition
  - hand tracking
  - real-time systems
  - concurrency
  - publisher-subscriber
  - service architecture
  - text-to-speech
  - teleoperation
  - sensor fusion
---

Rapid-prototyped a ROS 2 multimodal robot interaction stack fusing webcam vision, gesture-derived motion commands, and speech output, enabling a mobile robot to be teleoperated by hand gestures and respond with spoken feedback. Four ROS 2 packages, developed with a robotics team.

## Problem

No live feed for downstream nodes, and an uncapped capture loop would saturate the message bus.

## Solution

I built a real-time camera-to-ROS pipeline capturing webcam frames, bridging them into ROS image messages, and publishing at a fixed 5 Hz.

## Result

A steady, bandwidth-bounded video stream from a single shared capture source.

## Problem

Raw hand-tracking coordinates are continuous and noisy, with no direct mapping to velocity commands.

## Solution

I built a gesture-to-motion translator mapping fingertip positions to linear and angular velocities, capped at 0.5 m/s and 0.1 rad/s, publishing only when a subscriber was listening.

## Result

Freehand gestures became safe bounded robot motion, with no wasted bus traffic when no consumer was attached.

## Problem

Speech had to be requested on demand without blocking callers.

## Solution

I designed a service-based text-to-speech node synthesizing speech into an in-memory audio stream, paired with a client issuing asynchronous service calls.

## Result

Any node could trigger spoken feedback without stalling its own control loop.

## Problem

Capture loops, timers, async futures, and blocking audio competed for the same executor, making nodes stop responding mid-operation.

## Solution

I resolved the concurrency conflicts by separating blocking work from callback execution so the ROS spin loop stayed responsive.

## Result

Vision, motion, and speech ran together without freezing during playback or long calls.

## Problem

Freeform data between nodes invited silent runtime mismatches.

## Solution

I split the system into four focused ROS packages communicating through strongly typed custom message and service definitions.

## Result

Interface errors surfaced at build time instead of mid-run, and each subsystem was independently testable.
