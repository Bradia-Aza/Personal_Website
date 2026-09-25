# Bardia Azami — Full Background

> Working context file: everything about my education, work experience, and
> projects in one place, unranked. Intended to be pasted (or loaded) as the
> background context for an AI answering job-application questions, drafting
> referral messages, or writing cover letters.
>
> **Ground every claim in this file. Do not invent employers, projects,
> metrics, or skills that are not written here.**

---

## 1. Identity & contact

| Field | Value |
|---|---|
| Name | Bardia Azami |
| Phone | (613) 323-1095 |
| Email | bard.azami@gmail.com |
| GitHub | https://github.com/Bradia-Aza |
| LinkedIn | https://www.linkedin.com/in/bardia-azami-a24579258/ |
| Location | Ottawa, Canada |

### Positioning statement

Machine Learning Engineer with experience building and deploying end-to-end AI
solutions. I specialize in creating production-ready pipelines for both
generative-AI agents and predictive models, and I focus on translating complex
business needs into clean, scalable code that drives data-driven decisions and
delivers measurable impact.

### The short version of my story

I trained as an electrical engineer and started in hardware — designing PCBs and
writing bare-metal firmware for embedded vision devices. From there I moved up
the stack: deep learning for medical imaging, then academic research
benchmarking vision transformers, then a graduate certificate in AI and software
development in Canada. My recent work is LLM systems engineering — RAG
pipelines, agentic tooling, and text-to-SQL — where the interesting problems
are less about model choice and more about making untrusted model output safe,
bounded, and testable.

The thread through all of it: I like the part where a system meets reality —
field trials, hostile inputs, malformed model output, page budgets — and I build
the guardrails that make it hold up.

---

## 2. Education

**Graduate Certificate in Artificial Intelligence & Software Development**
Algonquin College — Ottawa, Canada — completed May 2025 — CGPA 3.82

**B.Sc. in Electrical Engineering**
University of Isfahan — Isfahan, Iran — completed July 2022

---

## 3. Technical skills

- **Languages & Databases:** Python, C++, MATLAB, SQL, Bash, PostgreSQL, MongoDB, Snowflake/BigQuery
- **ML & Deep Learning:** PyTorch, TensorFlow, scikit-learn, Hugging Face Transformers, XGBoost, LightGBM, OpenCV, spaCy, NLTK
- **LLM & RAG:** LangChain, LlamaIndex, FAISS, Pinecone/ChromaDB, vLLM, OpenAI/Anthropic APIs, Pydantic
- **Data Analysis & Data Engineering:** pandas, NumPy, SciPy, statsmodels, Matplotlib, Seaborn, Plotly, Tableau, PySpark, Airflow, dbt, Kafka
- **Cloud & MLOps:** AWS (SageMaker, S3, EC2, Lambda, Glue, Redshift), Docker, Kubernetes, Git, GitHub Actions, MLflow, Weights & Biases, FastAPI, Streamlit, pytest, Linux
- **Embedded / Hardware:** Embedded C, Altium Designer, Proteus, AVR microcontrollers, UART/SPI/I2C, circuit simulation, PCB design

---

## 4. Work experience

### 4.1 AI Researcher — University of Isfahan (Sep 2022 – Jul 2023)

**Project: Comparative deep learning analysis — ViT vs. CNNs for outdoor fire detection**

Engineered a computer vision pipeline benchmarking attention-based architectures
against convolutional baselines for early fire and smoke detection in
unstructured outdoor environments, aimed at reducing disaster-response latency.
I designed the benchmark, curated the dataset, and ran the five-architecture
comparison.

*Stack:* Python, PyTorch, CNNs, Vision Transformers, transfer learning, computer vision, NumPy, model benchmarking

**Headline outcome:** established the transformer as the stronger detector at
95.7% accuracy with 13 false positives, against 30–46 for the CNN baselines,
while identifying RegNetX as the better fit for aerial smoke.

**What I actually did (problem → solution → result):**

1. **Dataset too small and too clean.** Public fire/smoke datasets wouldn't generalize to unstructured outdoor scenes. I curated a proprietary dataset of 10,656 images across fire, smoke, and neutral classes from scraped web data and extracted video frames, split 70/30 train/validation. Result: a dataset large and varied enough to train and fairly compare five architectures on realistic outdoor imagery.
2. **No like-for-like comparison existed.** It was unclear whether attention actually beat convolution here. I designed a modular evaluation framework running five backbones (ResNet50/101, RegNetX/Y, and a data-efficient vision transformer) behind an identical custom classifier head. Result: direct cross-architecture benchmarking, with the transformer reaching 95.7% accuracy on fire and 94.8% on smoke — roughly 2.7% above the CNN baselines.
3. **Unstable convergence when fine-tuning.** Standard adaptive optimization wobbled on the fire domain. I adopted AdamW at a 1e-4 learning rate with matched weight decay to decouple regularization from the gradient update. Result: convergence instability resolved and comparable training behavior across all five backbones.
4. **False alarms are the dominant failure mode.** Aggregate accuracy said nothing about what triggered them, so I ran diagnostic analysis on every false positive. Result: traced 35% of errors to firefighter and red-truck features, and showed the transformer's semantic filtering held false positives to 13 versus 30–46 for the CNNs.
5. **Full fine-tuning was computationally prohibitive** across five models. I applied a frozen-feature-extractor transfer-learning strategy, training only the classifier head. Result: substantially cut per-model training cost while holding precision on noisy and blurry validation samples.
6. **Accuracy alone hid the hardest operational case.** I benchmarked on F1, precision, recall, and FLOPs rather than accuracy alone. Result: identified RegNetX as the best subsystem for aerial smoke detection, missing only 8% of aerial cases despite the transformer's overall lead.

*Keywords:* Vision Transformers, ViT, DeiT, self-attention, CNN, ResNet, RegNet, transfer learning, image classification, model benchmarking, PyTorch, dataset curation, error analysis, FLOPs, computer vision

---

### 4.2 AI Engineer — Behyar Sanaat Sepahan (Jun 2021 – Jun 2022)

**Project: Deep-learning edge-preserving CT reconstruction**

Engineered a deep learning pipeline to reconstruct diagnostic-quality medical
images from low-dose CT scans, easing the trade-off between patient radiation
exposure and diagnostic clarity. I owned the model architecture, loss design,
and the synthetic training-data pipeline.

*Stack:* Python, TensorFlow/Keras, CNNs, autoencoders, transfer learning, computer vision, NumPy, medical imaging

**Headline outcome:** delivered a reconstruction model that preserved diagnostic
edge detail where pixel-loss-only training blurred it — trained without access
to paired clinical scans.

**What I actually did (problem → solution → result):**

1. **Denoising autoencoders smooth away the diagnostic signal.** Low-dose CT denoising blurs exactly the organ boundaries a radiologist reads. I implemented a custom differentiable edge-detection (Sobel) layer inside the network's computation graph, forcing it to prioritize structural recovery over texture. Result: sharp anatomical boundaries preserved and the smoothing artifact resolved.
2. **Pixel-wise error drives toward blurry averages** that score well numerically. I designed a hybrid loss weighted 70/30 between a pretrained network's perceptual feature-space distance and pixel-space error. Result: enforced semantic similarity rather than pixel averaging, producing visibly sharper reconstructions at comparable pixel-level fidelity.
3. **Whole-organ context normally costs spatial detail or compute.** I constructed a dilated residual network with varying dilation rates to expand the receptive field exponentially with depth. Result: captured global anatomical context while preserving spatial resolution, with no added parameter or pooling cost.
4. **Paired low-dose/full-dose clinical scans are scarce.** I procedurally generated over 10,000 paired images by applying Poisson noise modeling to standard CT scans to simulate realistic low-dose artifacts. Result: a training set large enough to train the network without paired clinical data.
5. **Perceptual loss creates a non-convex surface** where default optimizer settings oscillate. I tuned learning rate and momentum specifically for the combined perceptual/pixel landscape and tracked fidelity in-training with a custom PSNR metric. Result: stabilized convergence and made reconstruction quality measurable live during training.

*Keywords:* deep learning, computer vision, medical imaging, image reconstruction, denoising, autoencoders, CNN, perceptual loss, transfer learning, TensorFlow, Keras, data augmentation, model optimization, PSNR

---

### 4.3 Electronic Engineer — Noavarihaye Tak (Dec 2020 – May 2021)

**Project: Smart-surveillance embedded vision hardware**

Took proprietary embedded vision hardware for smart surveillance from schematic
to field-deployable prototype, validating the design against real-world
conditions to establish mass-production feasibility. I worked in a
cross-functional team, owning PCB design, bare-metal firmware, and field-test
tooling.

*Stack:* Embedded C, Python, PCB design (Altium Designer), circuit simulation, microcontrollers, UART/SPI/I2C

**Headline outcome:** a field-validated prototype with a cost-optimized BOM that
established mass-production feasibility for the product line.

**What I actually did (problem → solution → result):**

1. **Board revisions were expensive and slow**, with signal-integrity faults found only after fabrication. I executed full-cycle mixed-signal PCB design in Altium, simulating the circuit to pre-validate signal integrity before committing to a build. Result: caught interference and layout faults pre-fabrication, cutting the number of board spins needed to reach a working prototype.
2. **Strict timing with no OS or scheduler.** I developed bare-metal C firmware driving hardware peripherals and sensor loops directly over UART/SPI/I2C, managing timing by hand. Result: deterministic sensor control that met the timing budget on constrained hardware.
3. **Faults couldn't be isolated to a subsystem.** I engineered a modular testing protocol exercising each hardware subsystem independently before integration. Result: reduced hardware debug time by an estimated 25–30% and localized faults to a single subsystem instead of the whole board.
4. **BOM had to hit a unit-cost target** without losing thermal headroom or adding noise. I ran component-selection analysis trading off thermal performance, noise, and cost. Result: a cost-optimized BOM holding thermal and noise performance within spec.
5. **Lab-calibrated hardware degraded in the field.** I ran field trials with Python scripts automating data logging, then iterated on the schematic to resolve the interference sources found. Result: closed the gap between bench and field behavior, producing a prototype validated under real deployment conditions.

*Keywords:* embedded systems, firmware development, bare-metal programming, PCB design, Altium Designer, Proteus, AVR microcontrollers, signal integrity, mixed-signal design, hardware debugging, serial protocols, sensor integration, hardware validation, BOM optimization

---

## 5. Projects

### 5.1 CareerFlow AI — LLM resume-tailoring pipeline (Dec 2025 – Present)

Built an AI system that tailors a LaTeX resume and cover letter to any job
description end to end: a two-pass LLM extraction step mines job requirements,
ranks experience by relevance, and regenerates every section under hard length
constraints so the result always compiles to a fixed page budget. Solo project,
designed and built end to end — architecture, LLM prompt engineering, LaTeX
generation, local API server, and Chrome extension.

*Stack:* Python, LLM APIs (Anthropic, OpenAI, Google Gemini), Pydantic, FastAPI, ThreadPoolExecutor concurrency, LaTeX, Chrome Extension (MV3), pytest

**Headline outcome:** cut tailoring a resume and cover letter for a new posting
from roughly an hour of manual editing to a single command, with 73 offline
tests covering the pipeline and no LLM calls in CI.

**What I actually did (problem → solution → result):**

1. **Overflowing content silently breaks a page budget**, and compile-and-retry loops are slow, non-deterministic, and can still fail after several round trips. I built a constraint engine that validates every generated section against configured character, line, and item limits, retries once with a stricter prompt, then deterministically truncates by dropping whole bullets, then sentences, then words — never cutting mid-word. Result: page length became a guarantee rather than an outcome, with a bounded worst case of two LLM calls per section and no garbled text.
2. **A single LLM pass returns generic keywords** — the core failure mode of naive resume tailoring. I designed a two-pass Miner→Judge extraction step that over-extracts candidates then filters them for genuine relevance, merging survivors into the job description every downstream service consumes. Result: ranking, bullets, skills, and the cover letter are grounded in the same vetted requirements, so sections reinforce rather than contradict each other.
3. **Structured LLM output can't be trusted to be internally consistent** — the ranking step returned section keys that were hallucinated, duplicated, or silently dropped, which would have deleted real experience from the resume. I added a reconciliation step validating model output against known section keys at the call boundary, preserving the model's ordering while re-appending anything omitted. Result: structurally impossible for a model error to remove a section, while still honoring a sound ranking.
4. **Provider APIs disagree on structured output** — Gemini rejects schemas with open-ended dict keys, Claude has no native structured-output mode — so provider choice was leaking into generation logic. I defined a single provider interface taking a Pydantic schema and implemented it per vendor (native structured output, parsed completions, and a forced tool call for Claude), reshaping schemas where a provider couldn't express them. Result: the model behind any step became a config change rather than a code change, and the whole test suite runs against a fake provider with no network calls.
5. **A dozen sequential LLM round trips made each run slow** enough to discourage iterating. I identified that ranking, bullets, profile, skills, and the cover letter depend only on the enriched job description and each write a distinct file, then ran them concurrently on a thread pool, joining before the reorder and compile. Result: collapsed the slowest phase from the sum of its LLM calls to roughly the longest one, with the cover-letter compile overlapping the resume's.
6. **Routine tuning required editing Python.** I moved section mappings, length constraints, prompt text, and per-step provider/model choice into YAML, and built a web admin UI to edit all three files with drag-and-drop section ordering, invalidating the cached pipeline on save. Result: prompt and layout tuning became a browser task taking effect on the next run, with no restart and no code edit.
7. **Layering by convention erodes**, and a bug writing to the source resume instead of a copy would corrupt the originals irrecoverably. I enforced strict one-way layering (pipeline → services/repositories → domain) with LaTeX escaping confined to the write path, and copied the resume tree into a per-request workspace so generation never touches the source. Result: source resume immutable across every run, each layer independently testable, covered by 73 offline tests.
8. **The pipeline still had to be driven from a terminal.** I added a local FastAPI server around the same composition root the CLI uses, plus a Chrome extension capturing company, title, and description from the posting page. Result: applying to a posting became filling three fields in a browser popup, sharing one code path with the CLI.

*Keywords:* LLM application development, prompt engineering, structured output, multi-provider abstraction, layered architecture, dependency injection, test-driven development, concurrency, REST API, configuration-driven design

---

### 5.2 DataMind — Conversational BI platform (2025)

Built a modular-monolith platform letting users ask questions in plain language
over relational databases and get back an auditable answer, table, and chart,
with an AST-based SQL guard, a configurable disclosure policy, and a semantic
layer securing every model-generated query. Solo build spanning a FastAPI
backend, React/TypeScript front end, and a multi-database execution layer.

*Stack:* Python, FastAPI, React/TypeScript, SQL (PostgreSQL, MySQL, SQL Server, Oracle), LLM integration, Docker, data visualization

**Headline outcome:** runs end to end against PostgreSQL, MySQL, SQL Server, and
Oracle, with the SQL guard's hostile-input corpus enforced as a CI hard gate on
every merge.

**What I actually did (problem → solution → result):**

1. **A single failed step would sink the whole request.** Answering a natural-language question requires routing, schema retrieval, generation, validation, and execution. I designed a ten-node conversational pipeline with a bounded repair loop, persisted and streamed live to the client with replay support for dropped connections. Result: failures self-correct within a fixed retry budget and the session stays recoverable after a network interruption.
2. **LLM-generated SQL is untrusted input**, and blocklist filtering is trivially bypassed. I built an AST-based SQL guard parsing every proposed statement against an allowlist, failing closed on any unrecognized expression type, validated against a hostile-input corpus enforced as a CI hard gate. Result: unsafe queries blocked by construction rather than pattern matching, with regressions caught before merge.
3. **Access restrictions are useless if tightening them needs a re-sync** or if history still leaks the data. I implemented a per-connection disclosure policy (NONE, AGGREGATE, SAMPLE, FULL) applied at render time across query results, schema hints, and conversation history. Result: policy changes take effect immediately with no re-sync and no leakage through the existing transcript.
4. **Without business context, generated SQL silently produced wrong numbers**, particularly by fanning out rows across joins. I engineered a semantic-layer generator deriving table meaning, metrics, and join fan-out cautions from the schema catalog, validating each generated metric's SQL and preserving human edits on regeneration. Result: generation grounded in verified business definitions, with analyst corrections surviving the next run.
5. **Dashboards and reports were separate execution paths** that could bypass the chat path's protections. I extended the guarded execution path to dashboards (per-tile connection, refresh, row-cap ceiling) and reports (guarded queries composed into narrated documents with a numeric fact-checker), reusing the same SQL guard across all three entry points. Result: identical safety guarantees everywhere, with no unguarded path to the database.
6. **Layering rules erode silently, and stored DB credentials are a breach target.** I enforced the dependency rule with an import linter in CI and encrypted stored credentials with AES-256-GCM bound to row identity as authenticated data. Result: architectural violations fail the build, and stolen credential rows are undecryptable outside their original record.

*Keywords:* text-to-SQL, RAG, agentic AI, LLM orchestration, business intelligence, semantic layer, SQL injection prevention, AST parsing, SQLGlot, RBAC, data governance, REST API, full-stack development

---

### 5.3 WW2 Historical RAG Pipeline (2024)

Engineered an end-to-end retrieval-augmented generation system aggregating
unstructured historical content from the web and answering questions
extractively, with source attribution and an explicit confidence floor. Solo
NLP project — scraping/ETL layer, semantic chunking, two-stage retrieval, and
the Gradio front end.

*Stack:* Python, PyTorch, Hugging Face Transformers, sentence embeddings / semantic search, RAG, web scraping, Gradio

**Headline outcome:** deployed a web interface non-technical evaluators could
use, with every answer traceable to its source passage and an explicit fallback
when confidence was too low.

**What I actually did (problem → solution → result):**

1. **Fixed-size chunking split sentences mid-thought** and swept in navigation and cookie-notice boilerplate, polluting the vector index. I designed a semantic chunking algorithm respecting sentence boundaries and filtering boilerplate before embedding, targeting ~300-word context windows. Result: coherent, self-contained chunks and no junk text in retrieval results.
2. **Semantic search returns roughly relevant passages, not answers.** I implemented a two-stage pipeline pairing dense vector retrieval over sentence embeddings with an extractive QA model pinpointing the answer span inside retrieved text. Result: precise answers grounded in source passages rather than whole paragraphs.
3. **The QA model returned confident one-word fragments** that were technically extractive but useless. I engineered a ranking heuristic scoring candidates on model confidence weighted by answer length, penalizing degenerate short spans. Result: low-context answers filtered out and substantive ones surfaced instead.
4. **Sources were inconsistently structured and bot-protected**, littered with non-ASCII artifacts. I built a resilient scraping and ETL module with header rotation, error handling, and text normalization. Result: a clean, uniform corpus from heterogeneous sources with no manual intervention.
5. **Index building was the slowest setup stage.** I optimized throughput with batched inference during the index build. Result: substantially cut index construction time versus per-document embedding.
6. **When no relevant passage existed, the system still answered**, presenting fabrications as historical fact. I implemented a calibrated confidence threshold triggering an explicit "not confident enough" fallback. Result: reduced false-positive answers and made uncertainty visible rather than hidden.
7. **The pipeline was reachable only from a notebook.** I developed a web interface with real-time inference, source-attribution display, and pre-cached example queries. Result: usable by non-technical evaluators, every answer traceable to its source.

*Keywords:* NLP, RAG, semantic search, vector search, sentence embeddings, sentence-transformers, extractive QA, RoBERTa, Hugging Face, PyTorch, chunking strategy, hallucination mitigation, Gradio

---

### 5.4 Ottawa Rental Market ETL & Analytics Pipeline (2024)

Engineered an end-to-end data pipeline to scrape, normalize, and analyze
real-time rental listings, turning unstructured web content into longitudinal
market insight on listing duration and regional density. A data project with the
**City of Ottawa via Algonquin College**; I built the scraper, entity-resolution
logic, and analysis layer.

*Stack:* Python, pandas/NumPy, web scraping (Playwright), ETL pipeline design, regex/data parsing, data visualization, Node.js

**Headline outcome:** produced Days-on-Market metrics the source data never
contained, from a daily collection feed against a site static scraping could not
read at all.

**What I actually did (problem → solution → result):**

1. **Listings rendered client-side behind anti-bot protection**, so conventional scraping returned empty or blocked pages. I engineered a browser-driven scraping engine with rotating user agents, randomized viewports, and heuristic delays. Result: a reliable daily collection feed from a source static scraping could not read at all.
2. **Daily snapshots carried no stable listing identifier**, so the same unit reappeared as a new record. I implemented stable SHA-256 hashing over normalized address strings to generate persistent unique IDs. Result: collision-free merging across snapshots and listings traceable across their entire lifecycle.
3. **The source published no creation or removal dates**, making time-on-market impossible to measure directly. I developed a state-tracking algorithm inferring creation and removal timestamps by diffing each daily snapshot against a persistent ID registry. Result: derived accurate Days-on-Market metrics from data that never contained them — the project's core longitudinal analysis.
4. **Addresses arrived with noisy prefixes and unit identifiers**, and coordinates were absent from the visible page. I wrote targeted regex patterns separating street numbers from surrounding noise and extracted embedded structured metadata to recover latitude and longitude. Result: clean addresses and precise geolocation, enabling the regional density analysis.
5. **Deduplication kept the newest row**, which sometimes had fields earlier snapshots had recorded. I designed a historical backfill step repairing missing values by querying prior valid instances of the same listing ID. Result: recovered field values deduplication would otherwise have discarded.

*Keywords:* ETL, data engineering, web scraping, Playwright, browser automation, data pipeline, entity resolution, deduplication, data cleaning, regex, pandas, geospatial analysis, time-series analysis, data visualization

---

### 5.5 Pistachio Dataset Analysis and Modeling (2024)

Built an end-to-end machine learning pipeline over pistachio images and
handcrafted features covering classification, outlier detection, and clustering,
reducing reliance on manual inspection by combining engineered and deep-learned
feature representations with automated model evaluation. Solo ML project.

*Stack:* Python, scikit-learn, TensorFlow/Keras, transfer learning (CNNs), pandas/NumPy, dimensionality reduction (PCA, LDA), clustering & anomaly detection, data visualization

**Headline outcome:** cut experiment turnaround by persisting extracted features
as reusable artifacts, and surfaced mislabeled samples the supervised pipeline
alone could not see.

**What I actually did (problem → solution → result):**

1. **Neither handcrafted features nor learned embeddings alone separated the classes reliably.** I combined 28 handcrafted morphological, shape, and color features with deep embeddings from a pretrained CNN and three custom architectures, persisting extracted features to disk. Result: a richer fused representation, and repeated CNN extraction removed from every experiment.
2. **Small, heavily imbalanced dataset** made models collapse toward the majority class. I applied synthetic minority oversampling (SMOTE) inside the pipeline with stratified splits, so resampling and scaling were fit only on training folds. Result: improved minority-class recall while preventing the data leakage that inflates scores during hyperparameter search.
3. **Concatenating tabular features with CNN embeddings** produced a high-dimensional, highly correlated space. I applied correlation filtering, Recursive Feature Elimination, and PCA/LDA reduction. Result: stable classification and clustering on the combined data, with class structure visualizable in 2D and 3D.
4. **Model choices were made ad hoc**, so results weren't comparable. I implemented a grid-search selection workflow spanning Naive Bayes, SVM, MLP, and stacking ensembles, persisting fitted models and features. Result: repeatable, directly comparable evaluation across all candidates.
5. **Unlabeled anomalies and latent groupings were invisible** to the supervised pipeline. I architected an unsupervised layer with outlier detection (Local Outlier Factor, Isolation Forest, One-Class SVM) and a clustering evaluator (KMeans, DBSCAN, Gaussian Mixture) scored on three internal indices. Result: surfaced mislabeled and anomalous samples and let cluster counts be chosen on evidence rather than by eye.
6. **Preprocessing, extraction, and modeling were entangled**, so any change forced a costly full re-run. I reorganized into separate modules with the cleaned dataset and extracted features saved as reusable artifacts. Result: classical ML experiments iterate without re-running CNN feature extraction, reproducible from saved artifacts.

*Keywords:* machine learning, computer vision, feature engineering, transfer learning, CNN, SVM, Naive Bayes, MLP, ensemble learning, stacking, SMOTE, PCA, LDA, clustering, KMeans, DBSCAN, anomaly detection, scikit-learn, TensorFlow

---

### 5.6 Dallas Police Incident Analysis (2024)

Built a reproducible cleaning, feature-reduction, and supervised classification
pipeline turning the City of Dallas police-incident dataset of 86 raw columns
into modeled predictions of offense status, enabling pattern discovery across
location and demographics. Solo data science project.

*Stack:* Python, pandas/NumPy, scikit-learn, classification (KNN, Decision Tree, Random Forest), hyperparameter tuning, data visualization, Jupyter/Colab, Git

**Headline outcome:** turned an unusable 86-column extract into modeling-ready
data and established a reproducible scoring baseline comparing KNN, Decision
Tree, and Random Forest on fixed splits.

**What I actually did (problem → solution → result):**

1. **High-cardinality categoricals with severe imbalance** exploded into thousands of one-hot columns. I engineered mappings collapsing compound and ambiguous category values, dropped categories below a 0.1% frequency threshold, and removed attributes missing more than 50% of values. Result: a tractable encoded feature space and reduced label noise, giving more stable precision and recall on tree-based models.
2. **The raw 86-column extract blocked any modeling** — sparse columns, text-typed dates, incomplete rows. I automated a cleaning pipeline dropping majority-missing columns, converting date fields to datetime, removing incomplete rows, and emitting two cleaned datasets with and without rare categories. Result: modeling-ready data, and rare-category pruning measurable as a controlled comparison.
3. **Ad hoc splits made scores incomparable between runs.** I implemented stratified sampling across both imbalanced and balanced distributions and exported fixed train/test splits to disk. Result: every model evaluated against identical data, so score differences reflected the model rather than the split.
4. **No baseline existed** for which classifier suited this categorical-heavy dataset. I evaluated KNN, Decision Tree, and Random Forest, tuning via grid search and selecting K empirically at 18 for KNN. Result: identified the best-performing configuration and improved accuracy over untuned baselines.
5. **Accuracy alone hid minority-class failures.** I standardized evaluation on accuracy, full precision/recall/F1 reports, and confusion matrices in tabular and graphical form. Result: exposed per-class performance and established a reproducible scoring baseline.
6. **Inline preprocessing couldn't be reused.** I implemented modular functions for sampling, binning, encoding, column filtering, and visualization. Result: the pipeline is reusable on other categorical-heavy datasets without rewriting preprocessing.

*Keywords:* machine learning, supervised learning, classification, Random Forest, Decision Tree, KNN, scikit-learn, pandas, feature engineering, categorical encoding, class imbalance, stratified sampling, hyperparameter tuning, grid search, model evaluation, confusion matrix

---

### 5.7 Gesture-Based Multimodal Robotic Control (ROS 2) (2024)

Rapid-prototyped a ROS 2 multimodal robot interaction stack fusing webcam
vision, gesture-derived motion commands, and speech output, enabling a mobile
robot to be teleoperated by hand gestures and respond with spoken feedback. Four
ROS 2 packages, developed with a robotics team.

*Stack:* Python, ROS 2, OpenCV, computer vision, text-to-speech, robotics middleware

**Headline outcome:** demonstrated end-to-end teleoperation with vision, motion,
and speech running concurrently without the stack freezing during audio
playback.

**What I actually did (problem → solution → result):**

1. **No live feed for downstream nodes**, and an uncapped capture loop would saturate the message bus. I built a real-time camera-to-ROS pipeline capturing webcam frames, bridging them into ROS image messages, and publishing at a fixed 5 Hz. Result: a steady, bandwidth-bounded video stream from a single shared capture source.
2. **Raw hand-tracking coordinates are continuous and noisy**, with no direct mapping to velocity commands. I built a gesture-to-motion translator mapping fingertip positions to linear and angular velocities, capped at 0.5 m/s and 0.1 rad/s, publishing only when a subscriber was listening. Result: freehand gestures became safe bounded robot motion, with no wasted bus traffic when no consumer was attached.
3. **Speech had to be requested on demand without blocking callers.** I designed a service-based text-to-speech node synthesizing speech into an in-memory audio stream, paired with a client issuing asynchronous service calls. Result: any node could trigger spoken feedback without stalling its own control loop.
4. **Capture loops, timers, async futures, and blocking audio competed for the same executor**, making nodes stop responding mid-operation. I resolved the concurrency conflicts by separating blocking work from callback execution so the ROS spin loop stayed responsive. Result: vision, motion, and speech ran together without freezing during playback or long calls.
5. **Freeform data between nodes invited silent runtime mismatches.** I split the system into four focused ROS packages communicating through strongly typed custom message and service definitions. Result: interface errors surfaced at build time instead of mid-run, and each subsystem was independently testable.

*Keywords:* ROS 2, robotics, robotics middleware, computer vision, OpenCV, gesture recognition, hand tracking, real-time systems, concurrency, publisher-subscriber, service architecture, text-to-speech, teleoperation, sensor fusion

---

## 6. Certifications

- **Ultimate AWS Certified Solutions Architect Associate** (Aug 2026) — foundational expertise designing scalable, highly available, and secure applications on AWS.
- **Claude Code: A Highly Agentic Coding Assistant** (Mar 2026) — [certificate](https://learn.deeplearning.ai/accomplishments/670d96d6-a0bd-4180-97e5-a916f8bdfdab) — built and used agentic coding workflows for autonomous problem solving and code generation.
- **Agentic AI** (Mar 2026) — [certificate](https://learn.deeplearning.ai/certificates/39bae9f9-9847-46a6-bcc6-cad395ebfe38) — designed AI agents capable of planning, reasoning, and executing multi-step tasks.
- **Supervised Machine Learning: Regression and Classification** (Dec 2022) — [certificate](https://www.coursera.org/account/accomplishments/certificate/SM68EZA5RPCS) — implemented regression and classification models with NumPy and scikit-learn.

---

## 7. Volunteering & mentorship

**Mentor — University of Isfahan, Isfahan, IR (Sep 2021 – Jun 2022)**
Conducted an in-person, hands-on image processing workshop for more than 50
students.

**Volunteer — KASA, Isfahan, IR (Jul 2020 – Sep 2022)**
Volunteered at KASA, an NGO supporting children with cancer, providing them a
happy and safe space.

---

## 8. Cross-cutting themes (useful for behavioral questions)

These are patterns that recur across the work above — handy when a question asks
for a general strength rather than a specific project.

- **Treating model output as untrusted input.** DataMind's AST SQL guard fails closed against an allowlist; CareerFlow's reconciliation step validates ranking output against known section keys so a hallucination can't delete real experience; the WW2 RAG system has a confidence floor that says "not confident enough" instead of fabricating. Same instinct in three systems.
- **Making guarantees deterministic rather than hopeful.** CareerFlow's constraint engine turns page length into a guarantee with a bounded worst case, instead of a compile-and-retry loop. The Dallas project exports fixed train/test splits so score differences reflect the model, not the split.
- **Building the harness so iteration is cheap.** Persisted feature artifacts in the pistachio project; a fake LLM provider so 73 tests run offline with no network; modular hardware test protocols at Noavarihaye Tak that cut debug time 25–30%.
- **Config over code.** CareerFlow moved section order, length limits, prompt text, and per-step model choice into YAML with an admin UI, so tuning is a browser task, not a redeployment.
- **Closing the gap between bench and reality.** Field trials that surfaced interference lab testing missed; a curated 10,656-image dataset because public fire data was too clean to generalize; a browser-driven scraper because the target site was unreadable to static scraping.
- **Diagnosing failure modes rather than reporting aggregates.** Analyzing every false positive to trace 35% of errors to firefighter and red-truck features; per-class precision/recall/F1 and confusion matrices where accuracy alone would have hidden minority-class failure.
- **Breadth from hardware to LLMs.** PCB layout and bare-metal C, through medical imaging and vision-transformer research, to RAG and text-to-SQL systems — I've worked at most levels of the stack and can talk to hardware, ML, and application teams in their own terms.

---

## 9. Notes for whoever uses this file

- Dates and numbers here are the authoritative versions — prefer them over anything inferred.
- Metrics stated as estimates in the source material are marked as such ("an estimated 25–30%"); keep that hedge when quoting them.
- The three entries in §4 are paid roles; everything in §5 is a personal, academic, or client project. Don't present a §5 project as employment. The Ottawa Rental Market pipeline (§5.4) was done with the City of Ottawa via Algonquin College, which is the closest to client work.
- CareerFlow AI (§5.1) is ongoing; everything else is complete.
