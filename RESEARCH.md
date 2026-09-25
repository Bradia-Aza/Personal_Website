# Personal Website — Structure & Implementation Research

> Research document. No code, no build decisions committed. Written 2026-09-11.
> Companion file: `REPORT.md` (non-technical version of the same conclusions).
>
> Source of truth for all background claims: `BACKGROUND.md`.

---

## 0. The brief, restated

The site has to serve **two audiences at once**, and they read a page differently:

| | **Audience A — Hiring** | **Audience B — Graduate admissions** |
|---|---|---|
| Who | Recruiter, then ML hiring manager | Faculty (potential supervisor), admissions committee |
| Time on site | 20–90 seconds, often on a phone, often from a LinkedIn tab | 3–10 minutes, on a desktop, deliberately, after reading your SOP |
| Looking for | Can he ship? Does the stack match? Is he legally/practically hireable here? | Can he read and produce research? Does his interest overlap *mine*? Is he worth supervising? |
| Decisive evidence | Shipped systems, measurable outcomes, code they can open | Depth of thought, a specific research direction, evidence of independent reading |
| Failure mode | "Too academic / no production work" | "Just an engineer, no research taste" |

These two audiences are not in conflict — but they are **not served by the same page**, and the most common mistake is building one blended page that half-satisfies both. The structural question is therefore not "what sections" but **"what does each audience hit first, and can each reach its evidence in one click."**

---

## 1. Verdict on your proposed structure

Your proposal:

```
Home — who you are + main interests
Portfolio — projects, GitHub, demos, engineering work
Research — thesis, computer vision work, papers/research projects
Notes / Ideas — foundation models, world models, JEPA, multimodal learning
CV — downloadable résumé/CV
```

**Verdict: this is a good structure. It is above average for a personal site and it is correct on the one decision most people get wrong — separating Portfolio from Research rather than dumping everything into one "Projects" grid.** That separation is exactly what lets Audience A and Audience B self-route. Keep it.

There are five refinements worth making, in descending order of impact.

### 1.1 The "Notes / Ideas" section is your highest-leverage asset — and the most likely to fail

This is the single most important part of the site for graduate applications and the least important for most hiring managers. Worth being blunt about why.

Your CV, as it stands in `BACKGROUND.md`, reads as a **strong applied ML engineer**. Reading it as a faculty member: CT reconstruction with a differentiable Sobel layer and a hybrid perceptual/pixel loss, a five-backbone ViT-vs-CNN benchmark with real error analysis, three serious LLM systems. That is a good applied profile. What it does **not** yet show is the thing admissions committees actually select on: **evidence that you can identify a question worth asking, not just execute a specification well.**

The Notes section is the only place on the site where you can demonstrate that directly. It is your substitute for the publication list you don't have yet. Handled well it is worth more than any project page. Handled badly — three stale posts summarizing papers everyone has read — it is actively negative, because it advertises shallow engagement with the exact topics you claim to care about.

Concrete implications:

- **Volume is not the goal. 4–6 pieces of real thinking beats 20 paper summaries.** An empty-looking section with three excellent essays reads as selective. A busy section of summaries reads as a reading log.
- **Never post a pure summary.** Every piece must contain a claim of yours: a disagreement, a connection between two papers nobody drew, a limitation you think is underrated, a small experiment you ran. "Here is what JEPA does" is worthless — the reader can read the paper. "Here is why I think JEPA's collapse-avoidance story doesn't transfer to *X*, and here's a toy run suggesting it" is a writing sample.
- **Dates are a liability.** A section whose newest post is 14 months old actively damages you. If you cannot sustain a cadence, consider suppressing visible dates and framing them as evergreen essays rather than a blog. Design this decision in from the start.
- **Rename it.** "Notes / Ideas" undersells it and signals low-stakes scratch writing. Better: **"Writing"**, **"Research Notes"**, or **"Essays"**. For an admissions reader, "Writing" implies a writing sample; "Notes" implies a scratchpad. Same content, materially different framing.
- **This is the section that connects to your stated interests.** Foundation models, world models, JEPA, multimodal learning — none of these appear anywhere in your CV. Your CV is CV/medical imaging → LLM systems. The Notes section is the *bridge* that makes "I want to do research in world models" credible rather than aspirational. Treat it as load-bearing.

### 1.2 Home has one job and it is not "about me"

Given 20–90 seconds for Audience A and a supervisor-match question for Audience B, Home must do four things above the fold and nothing else:

1. **Name + one-line identity.** You have a good one in `BACKGROUND.md` §1 — "ML engineer, hardware → medical imaging → vision transformers → LLM systems." The breadth *is* the differentiator; lead with it.
2. **A forward-looking interest statement.** One or two sentences on what you want to work on next (world models, multimodal, JEPA-style self-supervised learning) — explicitly framed as direction, not claimed experience. This is what a supervisor scans for.
3. **Two or three "best of" cards** that cut across the split — e.g. one research-flavored (the ViT/CNN benchmark), one systems-flavored (DataMind's AST SQL guard), one writing piece. These let a fast reader leave having seen your best work without navigating.
4. **Explicit routing.** "Hiring? → Portfolio + CV. Research? → Research + Writing." Sounds crude; it works, and it demonstrates you understand your own audiences.

What does *not* belong above the fold: a long bio, a photo carousel, a skills cloud, an animated hero, a terminal-typing effect.

### 1.3 Add a real About page — do not merge it into Home

Home is a router and must stay short. But both audiences eventually want the narrative, and yours is genuinely unusual: **PCB layout and bare-metal C → low-dose CT reconstruction → ViT benchmarking → RAG and text-to-SQL.** Very few applicants can write that arc honestly.

Almost nobody with LLM-systems experience can also discuss signal integrity and Poisson noise modeling. That breadth is a differentiator for both audiences — an engineering org hears "can talk to hardware, ML, and application teams"; a supervisor hears "unusual prior, will notice things my other students won't." `BACKGROUND.md` §8 already has this written. It needs a page, and it should not be crammed into the Home hero.

### 1.4 The CV link is a navigation item, not a page

Don't spend a route on it. Make it a persistent button in the header (`CV ↓`) that serves a PDF directly. Two practical notes:

- **Version the file, not the URL.** Serve a stable path like `/cv.pdf` so links you have already sent out never break, but keep the underlying file dated so you know what someone received.
- **Consider an HTML version too.** A web CV is indexable by Google, readable on a phone without a PDF viewer, and survives being linked in a Slack message. Serve both: HTML for reading, PDF for downloading. This is low-cost and rarely done.

### 1.5 Contact deserves a footer, not a page

Email, GitHub, LinkedIn, Google Scholar (when you have one) in a persistent footer. A contact *form* on a personal site is friction for no benefit — faculty email from their own client, recruiters use LinkedIn. Skip the form.

### 1.6 Recommended structure

```
Home            → identity, interests, routing, 2–3 featured items
Research        → thesis, ViT/CNN benchmark, CT reconstruction, future direction
Portfolio       → CareerFlow, DataMind, RAG, ETL, ROS 2, Pistachio, Dallas
Writing         → 4–6 essays with a claim of your own  (was "Notes / Ideas")
About           → the hardware → ML → LLM arc + cross-cutting themes
CV ↓            → header button, HTML + PDF
Footer          → email, GitHub, LinkedIn, Scholar
```

Same five ideas you proposed, with Notes reframed as a writing sample, About given room, and CV demoted to a button.

### 1.7 Ordering note

Put **Research before Portfolio** in the navigation. Nav order is read as a priority claim. Your hiring audience will find Portfolio regardless — they came looking for it. Your admissions audience is the one you need to signal to, and leading with Research says "I consider myself research-oriented" for free. This costs nothing and is easy to reverse.

### 1.8 One structural risk to watch

Seven projects in `BACKGROUND.md` §5 is more than a Portfolio page should show at full weight. The research consensus is consistent here: **3–6 well-explained projects beat a long list.** Recommendation: feature three at full depth (CareerFlow, DataMind, WW2 RAG — these are your strongest systems work), and list the remaining four compactly with links. A grid of seven equal cards flattens your best work down to the level of your coursework.

### 1.9 On project pages: keep the problem → solution → result format

`BACKGROUND.md` already uses this structure, and it is the right one — it is exactly how a paper's contributions section reads, and exactly what a hiring manager scans for. Do not flatten these into feature lists when they reach the site. The numbered problem/solution/result blocks are the most valuable content you have; they show reasoning, not just output. Carry them over close to verbatim.

---

## 2. Implementation options — high-level comparison

Five viable paths. All can produce the structure above; they differ in build cost, ceiling, and what the *site itself* signals about you.

### 2.1 The signalling dimension (often ignored, and it matters here)

For a portfolio specifically, the site is itself a work sample. Not decisively — nobody is hired or admitted on their site's stack — but a **hand-built site with its source public on GitHub is a second, silent artifact**, while a recognizable no-code template is a small negative for an ML engineering candidate. Conversely, an academic-standard theme like al-folio is a *neutral-to-positive* signal in academia, where the convention is explicit and everyone uses it.

The signalling optimum differs by audience, which is worth being explicit about:

- **Audience B (admissions)** rewards convention. al-folio is instantly legible as "academic site" and costs nothing in credibility.
- **Audience A (hiring)** mildly rewards evidence of building. A clean custom site is a small plus; a Wix site is a small minus.

This is one of the few genuine tensions in the whole project, and it is minor. Content dominates in both directions.

### 2.2 Option 1 — Academic theme (al-folio / Jekyll, or Academic Pages)

**What it is.** A mature, maintained Jekyll theme built for academics. Fork, edit Markdown and YAML, push to GitHub Pages. al-folio and Academic Pages are the two most widely recommended and actively maintained options as of 2026.

**Built-in and directly relevant to you:** BibTeX-driven publication lists, MathJax for equations, Mermaid/TikZ diagrams, code syntax highlighting, dark mode, CV generation, project collections, sensible SEO defaults.

- **Time to live:** 1–2 days
- **Ongoing cost:** very low — new content is a Markdown file
- **Ceiling:** medium. Layout changes mean fighting Liquid templates and Jekyll's plugin model
- **Signal:** strongly positive for admissions, neutral for hiring
- **Risk:** Ruby toolchain friction on macOS; recognizable to anyone who reads academic sites (upside in academia, mildly generic outside it)

**Best when:** graduate applications are the priority and you want to spend your effort on writing rather than on the site. The MathJax and BibTeX support is not cosmetic — you will want equations in the Writing section, and a publication list later.

### 2.3 Option 2 — Modern static site generator (Astro, or Next.js static export)

**What it is.** Component-based SSG. Content in Markdown/MDX, layout in components, output is static files. Astro is the strongest current fit for content-heavy sites: it ships zero JavaScript by default and lets you drop in React only where you need interactivity.

- **Time to live:** 4–8 days for something polished
- **Ongoing cost:** low — content stays Markdown
- **Ceiling:** high. Any layout, any interaction, MDX for interactive explanations inside essays
- **Signal:** positive for hiring — the repo is itself a work sample
- **Risk:** design is now your problem; a bad custom design is worse than a good template. Scope creep is the real danger — the site becomes a project that competes with the work it exists to advertise

**Notable upside for your Writing section specifically:** MDX lets an essay embed a live widget — an interactive diagram of a JEPA-style architecture, a small latent-space visualization, a toggle comparing predictions. For someone writing about world models and multimodal learning, that is a genuinely differentiating capability no PDF or plain blog offers. It is the strongest argument for this option.

**Best when:** you want the site to double as evidence of engineering ability, and you can cap the time you spend on it.

### 2.4 Option 3 — Plain HTML/CSS (+ a little JS)

**What it is.** Hand-written pages. No build step, no dependencies, no framework.

- **Time to live:** 2–4 days for five pages
- **Ongoing cost:** **rises with content** — this is the trap. Adding essay #7 means hand-editing an index page, a nav, and a meta block
- **Ceiling:** high for design, low for maintenance
- **Signal:** neutral. Nobody inspects your HTML
- **Risk:** the Writing section decays because posting is manual work. Given that the Writing section is your highest-leverage asset (§1.1), friction there is the worst place to accept it

**Best when:** the site is deliberately tiny and near-static. Given that you want an actively updated Writing section, **this is the weakest fit of the five**, and its apparent simplicity is misleading.

### 2.5 Option 4 — No-code builder (Wix, Squarespace, Framer, Webflow)

**What it is.** Visual editor, hosted, template-driven.

- **Time to live:** hours
- **Ongoing cost:** low, but content lives in their database, not in files you own
- **Ceiling:** medium — good-looking, bounded by the template system
- **Signal:** **mildly negative for an ML engineer.** Recruiters recognize these templates
- **Risk:** ~$16–25/month indefinitely; migration is a manual re-entry job; no Git history, no version control, poor fit for equations and code blocks

**Best when:** you need something live this week and will rebuild later. Rarely the right answer for this profile — code blocks and math are exactly what these tools handle worst.

### 2.6 Option 5 — Hybrid (academic theme now, custom later)

Ship al-folio in a weekend, spend the following months writing, and rebuild in Astro later *if* the site turns out to matter. Since content is Markdown in both cases, migration is mostly re-theming, not rewriting.

**This is the highest expected-value path given your constraints**, for three reasons:

1. It front-loads the thing that actually decides outcomes (the writing) and defers the thing that doesn't (the framework).
2. It gets a URL onto applications *now*. A live decent site beats a perfect site that ships after the deadline. Application cycles do not wait for a redesign.
3. The rebuild is optional and evidence-driven — you'll know by then whether anyone reads it.

**The one caveat:** rebuilds rarely happen. Assume there is a real chance you stay on al-folio forever, and choose it only if you're content with that. Given that the content is what matters, being stuck on a clean academic theme is a mild outcome.

### 2.7 Comparison table

| | **Academic theme** | **Astro / Next** | **Plain HTML** | **No-code** | **Hybrid** |
|---|---|---|---|---|---|
| Time to live | 1–2 days | 4–8 days | 2–4 days | Hours | 1–2 days, then optional |
| Cost of adding an essay | Trivial | Trivial | Manual, grows | Easy | Trivial |
| Design ceiling | Medium | High | High | Medium | Medium → High |
| Math / code / BibTeX | Built in | Needs setup | Manual | Poor | Built in |
| Interactive essays (MDX) | No | **Yes** | Awkward | No | Later |
| Signal — admissions | **Strong** | Neutral+ | Neutral | Weak | Strong |
| Signal — hiring | Neutral | **Positive** | Neutral | Slight negative | Neutral → Positive |
| Lock-in | None (Markdown) | None (Markdown) | None | **High** | None |
| Recurring cost | $0 | $0 | $0 | $16–25/mo | $0 |
| Main risk | Generic outside academia | Scope creep | Content decay | Migration pain | Rebuild never happens |

### 2.8 Hosting — a separate decision, and a smaller one

Hosting is genuinely lower-stakes than it appears; every option below is free at your scale, and all are static-file hosts with a CDN.

| | Notes |
|---|---|
| **GitHub Pages** | Purely static — no serverless functions, no forms, no built-in analytics. Simplest option; native if you're on Jekyll. Sufficient for everything in §1.6 |
| **Cloudflare Pages** | Best raw value in 2026 — generous free tier, unlimited bandwidth. Framework-agnostic |
| **Netlify** | Most feature-rich free tier — forms, identity, split testing. Free build minutes are capped |
| **Vercel** | Best-in-class for Next.js. Free Hobby tier is **restricted to non-commercial personal use**; a personal portfolio used for a job search qualifies, but a portfolio operating as part of a paid freelance/consulting business does not |

**Recommendation:** GitHub Pages if you go Jekyll (zero extra moving parts), Cloudflare Pages otherwise. Either is a reversible decision — it's a DNS change.

### 2.9 Domain — the one thing worth paying for

Buy `bardiaazami.com` (or `.ca` / `.dev`) for roughly $12–20/year. This is the only spend the project genuinely warrants, and the reasoning is practical rather than aesthetic:

- It goes on your CV, your email signature, and every application. `bardiaazami.com` is recallable; `bradia-aza.github.io` is not.
- It is **portable**. Everything above is a DNS change away from any other host — you never have to break a URL you've already sent to a hiring manager or a professor.

Buy the domain before you write a line of the site. Everything else is reversible; a URL you have already handed out is not.

---

## 3. Recommendation

**Structure:** yours, with the five refinements in §1 — most importantly reframing "Notes / Ideas" as **Writing** and treating it as your primary research signal, not a side section.

**Implementation:** **the hybrid path (§2.6)** — an academic theme now, an optional Astro rebuild later. Rationale: the binding constraint on your outcomes is not the framework, it is whether the Writing section contains four to six pieces of genuine thinking about world models, JEPA, and multimodal learning by the time someone reads it. Every day spent on CSS is a day not spent on the thing that decides whether the site works.

**If you'd rather build it yourself** — a defensible choice given that hiring is one of your two goals, and the MDX capability in §2.3 is a real advantage for your subject matter — then go Astro, but **timebox it to two weeks and ship with three essays already written.** The failure mode is a beautiful site with an empty Writing section, which is worse than a plain site with four good essays.

**Either way, three things are true:**

1. Buy the domain first.
2. Write the essays before polishing the design.
3. Ship something live before the next application deadline, not after.

---

## 4. Open questions worth deciding before any build

1. **Is there a thesis?** §1.6 lists one under Research, but `BACKGROUND.md` doesn't mention a thesis — the closest is the ViT/CNN benchmark from the Isfahan researcher role. If there's no thesis, Research holds the ViT/CNN benchmark, the CT reconstruction work, and a forward-looking statement of direction. That's enough, but it changes the page's shape.
2. **Is there anything publishable?** The five-architecture fire/smoke benchmark with real error analysis (35% of false positives traced to firefighter and red-truck features) is a workshop-paper-shaped result. Even an arXiv preprint would change what the Research page can claim, and would justify the BibTeX machinery in §2.2.
3. **What cadence can you actually sustain on Writing?** This determines whether posts carry visible dates (§1.1). Decide before launch — retrofitting is awkward.
4. **Which programs / which labs?** If the graduate target is a short list, the Research page and the Home interest statement should be written toward those specific groups' language. Generic "I'm interested in foundation models" reads as noise; "I'm interested in whether JEPA-style objectives transfer to *X*" reads as a candidate.
5. **Public repo or not?** If the site is Astro and public, it becomes a work sample and the commit history is visible. Usually positive; worth a deliberate decision rather than a default.

---

## Sources

- [Student Portfolio Website: A Step-by-Step Guide (2026)](https://own.page/blog/student-portfolio-website)
- [Student Portfolio Examples 2026 — Extern](https://www.extern.com/post/student-portfolio-examples-guide)
- [Every Grad Student Should Have a Portfolio — Queen's University](https://www.queensu.ca/grad-postdoc/graduate-studies/gradifying-blog/every-grad-student-should-have-portfolio)
- [al-folio — Jekyll theme for academics](https://github.com/alshedivat/al-folio)
- [GitHub Pages templates for AI researchers](https://grokipedia.com/page/GitHub_Pages_templates_for_AI_researchers)
- [Top 5 Static Site Hosting and Jamstack Platforms of 2026](https://guptadeepak.com/tools/top-5-static-site-hosting-jamstack-platforms-2026/)
- [Vercel Hobby Plan — official docs](https://vercel.com/docs/plans/hobby)
- [Vercel Fair Use Guidelines](https://vercel.com/docs/limits/fair-use-guidelines)
