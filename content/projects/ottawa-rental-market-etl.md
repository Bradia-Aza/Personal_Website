---
title: Ottawa Rental Market ETL & Analytics Pipeline
dates: 2024
featured: false
outcome: Produced Days-on-Market metrics the source data never contained, from a daily collection feed against a site static scraping could not read at all.
stack:
  - Python
  - pandas/NumPy
  - web scraping (Playwright)
  - ETL pipeline design
  - regex/data parsing
  - data visualization
  - Node.js
keywords:
  - ETL
  - data engineering
  - web scraping
  - Playwright
  - browser automation
  - data pipeline
  - entity resolution
  - deduplication
  - data cleaning
  - regex
  - pandas
  - geospatial analysis
  - time-series analysis
  - data visualization
---

Engineered an end-to-end data pipeline to scrape, normalize, and analyze real-time rental listings, turning unstructured web content into longitudinal market insight on listing duration and regional density. A data project with the City of Ottawa via Algonquin College; I built the scraper, entity-resolution logic, and analysis layer.

## Problem

Listings rendered client-side behind anti-bot protection, so conventional scraping returned empty or blocked pages.

## Solution

I engineered a browser-driven scraping engine with rotating user agents, randomized viewports, and heuristic delays.

## Result

A reliable daily collection feed from a source static scraping could not read at all.

## Problem

Daily snapshots carried no stable listing identifier, so the same unit reappeared as a new record.

## Solution

I implemented stable SHA-256 hashing over normalized address strings to generate persistent unique IDs.

## Result

Collision-free merging across snapshots and listings traceable across their entire lifecycle.

## Problem

The source published no creation or removal dates, making time-on-market impossible to measure directly.

## Solution

I developed a state-tracking algorithm inferring creation and removal timestamps by diffing each daily snapshot against a persistent ID registry.

## Result

Derived accurate Days-on-Market metrics from data that never contained them — the project's core longitudinal analysis.

## Problem

Addresses arrived with noisy prefixes and unit identifiers, and coordinates were absent from the visible page.

## Solution

I wrote targeted regex patterns separating street numbers from surrounding noise and extracted embedded structured metadata to recover latitude and longitude.

## Result

Clean addresses and precise geolocation, enabling the regional density analysis.

## Problem

Deduplication kept the newest row, which sometimes had fields earlier snapshots had recorded.

## Solution

I designed a historical backfill step repairing missing values by querying prior valid instances of the same listing ID.

## Result

Recovered field values deduplication would otherwise have discarded.
