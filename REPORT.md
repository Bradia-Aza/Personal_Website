# Your Personal Website — Plain-Language Report

**Prepared 11 September 2026.** This is the non-technical version of `RESEARCH.md`.
No jargon, no code. It answers three questions: *Is the plan good? What are the
ways to build it? Which should you pick?*

---

## In one paragraph

Your section plan is good — better than most, and right about the one thing people
usually get wrong. Five changes would make it noticeably stronger, and one of them
matters far more than the rest: the section you're currently calling "Notes / Ideas"
is the most valuable page on the entire site for graduate applications, and it's
also the one most likely to be done badly. On the building side you have five
realistic options. The honest finding is that **this decision matters much less than
you'd expect.** What you write will determine whether the site works. How you build
it will not. So the recommendation is to pick the fastest respectable option, get it
live, and spend the saved time writing.

---

## Part 1 — Is the structure good?

### Yes. And it gets the hardest decision right.

Your site has to satisfy two very different readers at the same time:

**The hiring reader.** A recruiter or engineering manager. Gives you somewhere
between twenty and ninety seconds, often on a phone, usually arriving from LinkedIn.
They want to know: has he built real things, does his experience match the job, can
I see the code?

**The academic reader.** A professor you might work with, or an admissions committee.
Gives you several minutes, deliberately, at a desk. They want to know something
completely different: can he think? Does he have a real question he's chasing, or is
he just good at executing other people's instructions?

Most personal sites fail by building one page that tries to please both and fully
satisfies neither. **You avoided that** — by splitting "Portfolio" from "Research"
you've given each reader their own door. That's the correct instinct and it's worth
keeping exactly as is.

### The five changes

**1. Rename "Notes / Ideas" to "Writing" — and treat it as the most important page on the site.**

This is the big one, so it's worth being direct about why.

Your CV is strong. It reads as a capable applied engineer: medical imaging work,
a serious comparison of vision models, three substantial AI systems. A professor
reading it sees someone who can build well.

What it doesn't yet show is the thing graduate admissions actually select for:
**evidence that you can find a question worth asking, not just carry out a task
well.** Right now, nothing on your CV demonstrates that — and your stated interests
(foundation models, world models, JEPA, multimodal learning) don't appear anywhere
in your work history at all. Your actual path runs through medical imaging and
language-model systems.

The writing section is the only place you can close that gap. It's your stand-in
for the published papers you don't have yet. Done well, it's worth more than any
project page on the site. Done badly, it hurts you — because a handful of thin
summaries of famous papers is *proof* of shallow engagement with the exact topics
you're claiming to care about.

So, practically:

- **Four to six genuinely good pieces beats twenty short ones.** A sparse page with
  three excellent essays reads as selective. A busy page of summaries reads as a
  reading list.
- **Never write a pure summary.** Every piece needs something of yours in it — a
  disagreement, a connection nobody else drew, a limitation you think is
  underrated, a small experiment you ran. "Here's what this paper says" is worth
  nothing; the reader can read the paper. "Here's why I think this approach won't
  work for X, and here's a small test suggesting it" is a writing sample.
- **Old dates hurt.** A page whose newest piece is fourteen months old is worse than
  no page. If you can't post regularly, present these as standalone essays rather
  than a dated blog — but decide that at the start, not later.
- **The name matters.** "Notes" sounds like a scratchpad. "Writing" sounds like a
  writing sample. Same content; a professor reads them differently.

**2. Your homepage is a signpost, not a biography.**

With twenty seconds to work with, the top of the page needs exactly four things:
your name and a one-line description of who you are; one or two sentences on what
you want to work on *next*; two or three links to your best work; and a clear
split — "here for hiring, go this way / here for research, go that way."

That last one sounds blunt. It works, and it quietly shows you understand who's
reading.

What doesn't belong at the top: a long biography, a photo carousel, animations, or
a list of every technology you've touched.

**3. Add a proper "About" page — don't squeeze it onto the homepage.**

Your background is genuinely unusual and it's currently buried. You went from
designing circuit boards and writing low-level hardware code, to reconstructing
medical scans, to comparing vision models, to building AI language systems. Almost
nobody can tell that story honestly.

Both audiences value it, for different reasons. A company hears "he can talk to the
hardware team, the research team, and the product team in their own language." A
professor hears "he'll notice things my other students won't, because he came from
somewhere else." That deserves its own page with room to breathe.

**4. The CV should be a button, not a page.**

Put a download button in the top bar of every page. Two small suggestions: keep the
web address of the file permanent, so links you've already emailed never break; and
publish a web version alongside the PDF, since a web page can be found by Google
and read on a phone without downloading anything. Very few people do this.

**5. Contact belongs in the footer.**

Email, GitHub, LinkedIn at the bottom of every page. Skip the contact form —
professors email from their own accounts and recruiters use LinkedIn. A form just
adds a step.

### One more thing: you have too many projects to show equally

You have seven. The consistent advice — and it matches how people actually read — is
that **three to six well-explained projects beat a long list.** Feature your three
strongest in full depth, and list the rest briefly underneath with links.

A grid of seven identical cards does something you don't want: it flattens your best
work down to the same visual weight as your coursework, and leaves the reader to
figure out which is which. They won't. They'll skim and leave.

### The suggested structure

```
Home        →  who you are, what you want to work on, where to go next
Research    →  your research work and the direction you want to take
Portfolio   →  three projects in depth, the rest listed
Writing     →  4–6 real essays          (this was "Notes / Ideas")
About       →  the hardware → medical imaging → AI story
CV ↓        →  a download button in the top bar
```

Same five ideas you started with. One renamed and promoted, one given proper space,
one demoted to a button.

**One small tip:** put Research *before* Portfolio in the menu. People read menu
order as a statement of priority. Hiring readers will find your portfolio anyway —
they came looking for it. Academic readers are the ones who need convincing, and
leading with Research tells them "I think of myself as research-oriented" for free.

---

## Part 2 — How could you build it?

Five realistic options. The honest summary first: **this choice matters less than it
feels like it should.** Nobody has ever been hired or admitted because of what a
personal site was built with. All five can produce the structure above.

One thing that *is* worth knowing: the site is itself a small work sample. A site
you clearly built yourself is a mild plus with employers. A site built on an obvious
drag-and-drop template is a mild minus for an AI engineer. But in academia the
opposite holds — there's a standard, well-known template that academics use, and
using it reads as normal and professional, not lazy.

### Option 1 — The academic template

There's a well-established free template built specifically for academics and
researchers. You copy it, replace the text, and publish. It arrives already knowing
how to display mathematical equations, code, diagrams, and a publications list — all
things you'll need and all things that are fiddly to add yourself.

- **Time to launch:** a day or two
- **Adding an essay later:** trivial
- **Cost:** free
- **Best at:** looking immediately credible to professors
- **Downside:** the design is somebody else's, and changing it is awkward

### Option 2 — Build it yourself with a modern web toolkit

Modern tools let you build a fast, fully custom site while still writing your actual
content in a simple text format. Full control over how everything looks.

- **Time to launch:** one to two weeks for something polished
- **Adding an essay later:** trivial
- **Cost:** free
- **Best at:** a site that doubles as proof you can build things
- **Downside:** the design becomes your problem, and this is the option most likely
  to quietly turn into a project of its own — one that competes for time with the
  work it's supposed to be advertising

**One real advantage worth flagging:** this approach lets you put *interactive
pieces inside your essays* — a diagram a reader can click through, a small
visualization they can adjust. For someone writing about how AI systems perceive
and model the world, that's a genuine differentiator. No PDF and no ordinary blog
can do it. It's the strongest argument for this option.

### Option 3 — Write the pages by hand

No tools, no templates — just write each page directly.

- **Time to launch:** two to four days
- **Adding an essay later:** **this is the catch.** Every new piece means hand-editing
  several other pages to link it in
- **Cost:** free
- **Downside:** because posting is a chore, the writing section quietly dies. Given
  that the writing section is the most valuable part of your site, that's the worst
  possible place to put friction

This one looks simplest and isn't. It's the weakest fit for what you want.

### Option 4 — A website builder (Wix, Squarespace, Framer)

Drag-and-drop. Live today.

- **Time to launch:** an afternoon
- **Cost:** roughly $16–25 every month, forever
- **Downside:** recruiters recognize these templates; your content lives in their
  system rather than in files you own, so moving later means retyping everything;
  and they handle code and equations poorly — which is most of what you'll be
  publishing

Fast, but a poor fit for your subject matter.

### Option 5 — Start with the template, rebuild later if it's worth it

Launch on the academic template this month. Spend the next several months writing.
If the site turns out to matter, rebuild it properly later — your writing carries
over, because it's stored as plain text either way.

### At a glance

| | Time to launch | Adding essays | Cost | Looks good to professors | Looks good to employers |
|---|---|---|---|---|---|
| Academic template | 1–2 days | Easy | Free | **Very** | Fine |
| Build it yourself | 1–2 weeks | Easy | Free | Fine | **Very** |
| By hand | 2–4 days | **Hard** | Free | Fine | Fine |
| Website builder | Hours | Easy | **$16–25/mo** | Weak | Slight negative |
| Template now, rebuild later | 1–2 days | Easy | Free | **Very** | Fine → Very |

### Two smaller decisions

**Where it lives.** Several companies host sites like this free, forever, with no
meaningful difference between them at your size. Not worth deliberating — and it's
a decision you can reverse in ten minutes.

**Your web address.** This one *is* worth money. Buy `bardiaazami.com` for about
$15 a year. It goes on your CV, in your email signature, and on every application,
and people can actually remember it. More importantly it's **yours** — you can move
the site anywhere later without breaking a link you already gave to a professor or
a hiring manager. **Buy this before you build anything.** Everything else can be
changed later; a web address you've already handed out can't.

---

## Part 3 — What I'd recommend

**On structure:** keep yours, with the five changes above. The one that matters most
by a wide margin is treating the writing section as your main evidence of research
ability rather than as a side page.

**On building it:** start with the academic template, and rebuild later only if it
proves worth it.

The reasoning is simple. Whether this site works won't come down to how it was
built. It'll come down to whether a professor opens your writing section and finds
four or five pieces of real thinking about the problems you say you want to work on.
Every day spent adjusting layouts is a day not spent on that.

**If you'd rather build it yourself** — a fair choice, given that half your goal is
employment and the interactive-essay capability genuinely suits your subject — then
do it, but set a two-week limit and don't launch until three essays are already
written. The failure mode to avoid is a beautiful site with an empty writing section.
That's worse than a plain site with four good essays.

**Three things hold either way:**

1. Buy the web address first.
2. Write the essays before polishing the design.
3. Get it online before the next application deadline, not after.

---

## Part 4 — Questions to answer before building

1. **Do you have a thesis?** Your background file doesn't mention one. If there isn't
   one, the Research page is built around your vision-model comparison, your medical
   imaging work, and a clear statement of where you want to go next. That's enough —
   but it changes how the page is shaped.

2. **Could any of your research be published?** Your comparison of five vision models
   for fire and smoke detection — particularly the finding that a third of the false
   alarms traced back to firefighters and red trucks in the images — is the kind of
   result that a small academic paper is made of. Even an informal public preprint
   would meaningfully strengthen the Research page.

3. **How often can you realistically write?** This decides whether your essays show
   dates. Worth settling before launch rather than after.

4. **Which programs or professors are you targeting?** If you have a shortlist, your
   homepage and Research page should speak to their specific interests. "I'm
   interested in foundation models" reads as filler. A specific question you want to
   answer reads as a candidate.

5. **Should the site's source code be public?** If you build it yourself, making it
   public turns it into an extra work sample. Usually a good thing — just make it a
   deliberate choice.

---

*Full technical version with sources: `RESEARCH.md`*
