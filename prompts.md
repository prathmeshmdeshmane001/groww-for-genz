# The prompts

**Deliverable 2 · Groww Product Intern case study**

This is not a transcript dump. It is the set of instructions that actually changed the product, in the
order they were given, with the outcome of each. Long bug-fixing exchanges are collapsed into the one
instruction that mattered. **My words are quoted verbatim, typos and all** — the value here is in what was
asked for and what was rejected, not in tidy phrasing.

The tool used was Claude Code. The research, the survey design, the app, the test suite and the analysis
documents were all produced through it. What follows is where I steered it, and the several places where
it was wrong and I caught it.

---

## Phase 0 — Setting the ground rules

Before any building, I put standing instructions into a `CLAUDE.md` that loads on every session, so I never
had to re-litigate them. The three that did the most work:

> **Don't fix a bug whose cause is still a guess.** A confirmed symptom is not a confirmed cause. Before
> writing a fix, say plainly which it is: proven from code/logs, provable in seconds (then prove it), or a
> hypothesis. Hypotheses stay open.

> **Research workflow — always pull all real-signal sources.** Never silently skip a source; if one is
> down, say so plainly in the deliverable.

> **Language — plain, simple words.** Swap complex words for everyday ones. Keep all technical depth.
> Simplify the wording, not the content.

These mattered later. The first one is why the app has a test suite instead of guesses. The second is why
the research documents list what could *not* be reached (Xiaohongshu, Twitter) instead of quietly omitting it.

---

## Phase 1 — Research and survey

**Prompt:** *build me a problem-space dossier on why Gen Z in India opens a demat account and then never
invests — SEBI data, Play Store reviews, Reddit, and mark clearly where a source is weak.*

Produced the problem dossier. **What I rejected:** the first draft quoted the Play Store rating split as
evidence Groww was poorly rated. I made it re-check, and the pull had been sorted newest-first, which
oversamples angry users. Groww's actual rating is 4.8. The star split was removed and the theme counts kept.

**Prompt:** *design a 12-question survey, tap-only, no required typing, that measures spread rather than
correctness.*

**The steer that mattered:** the first draft used free-text questions. I cut them — free text gets skipped
and can't be counted. Everything became multiple choice or checkboxes, with the one optional text box placed
last, after people have mentally finished. That single change is why 24 of 24 completed it and why every
number in the write-up is countable.

**Prompt (later, mid-build):** *the final survey response has 24 responses now, first update that, then read
through everything then scope out the prototype screens.*

Four extra responses changed a product decision: "how much should I be investing" moved from fourth to
**first** on the "nobody ever explained this" question. The amount screen changed from asking to recommending
because of those four rows.

---

## Phase 2 — The first prototype, and correcting it

**Prompt:** *build the app.* Then, immediately, a list of corrections as I checked the output:

> **"first we should fix the app now: 1. less verbose, each explanation should be in plain simple language
> as short and to the point as possible. 2. clearly mentioning actual costs incured on exit (not exiting on
> the next week that is counter intuitive) ... 4. you can research and create an exhastive databse of actual
> values"** — followed by **"any pushbacks?"**

Asking for pushback is the most useful thing I did in this project. It produced four disagreements, and I
accepted two and overruled two:

| Its pushback | My call |
|---|---|
| Don't delete the "sell next week" case — it's the only number that disproves "charges are a % of my gains" | **Accepted.** Demoted rather than deleted. |
| Say "past returns" not "expected gains" — a projection is a forward claim | **Accepted.** The app shows trailing returns only. |
| Don't build an "exhaustive database" — the costs are formulas, a lookup table goes stale | **Accepted.** It became a tested cost function instead. |
| Don't name a "best fund" per category — that's security selection, not guidance | **Overruled in part.** I wanted a real comparison, not a strawman. We compared against the biggest funds people actually hold. |

**Prompt:** *lets discuss 4-5 again.* — I made it re-argue the returns and comparison decisions rather than
accept the first answer. That exchange is where the "show our own pick losing" idea came from.

---

## Phase 3 — Field research

**Prompt:** *analyse the transcript, do not change the content, only change hindi or urdu to latin script
and label the transcript with speakers, no need to re listen the whole audio file.*

A deliberate constraint. The raw output of the transcription tool was 658 turns of mixed Devanagari, Urdu,
Gujarati and Gurmukhi script with speaker IDs but no names. I wanted it readable **without** anything being
cleaned up, corrected or paraphrased, so the quotes stay checkable. Mis-transcriptions are marked `[sic]`
rather than fixed.

The two interview analyses came out of this. The most valuable instruction was implicit: I asked it to
report what the interviews found, including **where my own interviewing was bad**. It flagged that I had
answered my own question before the participant could — destroying the pre/post measurement in interview 1.
I fixed the script before interview 2, which is why interview 2 has a clean result.

---

## Phase 4 — The decision I nearly got wrong

**Prompt:** *the app is trash as is we need a complete revamp ... 1. in the current groww app we introduce
an invest first feature 2. we create a standalone app with a proper pre investing flow with a recursive
learning ai ... what do you think we should scope out for this task*

It pushed back, and it was right to:

- On "the app is trash" — one in-ICP user had invested in 7½ minutes and handled the red day correctly.
  The criticism came from the *out-of-ICP* interviewee. I was over-weighting the second interview.
- On the standalone option — it contradicts my own research. ET Money Genius proves paid guidance cannot
  survive a ₹500 ticket, so guidance must be free, so it must sit inside an incumbent.
- On the "recursive learning AI" — it cannot be demonstrated in a click-through, so it cannot be tested.

**Then I overruled its scoping:**

> **"we have time, its okay, do not worry about that, look at what the task is asking us?"**

It had scoped to a *feature*. Re-reading the brief — *"create a Groww App suited for GenZ users"* — settled
it: an app, not a feature and not a startup. It corrected its own recommendation. That one instruction
changed the whole shape of v2.

---

## Phase 5 — Grounding the design in reality

**Prompt:** *i added a lot of screenshots for you to get the exact frontend of groww, also similar to what
we are building, groww already has it — see the screenshots inside the groww ss folder, the mf prime ss*

This was the highest-value prompt in the project and it contained no instructions at all. Thirty-three
screenshots of the live Groww app did four things:

1. **Killed a claim.** Groww's MF Prime already collects risk appetite, horizon, age and income and returns
   a two-fund recommendation with reasons. "Nobody guides the decision" had to be retracted.
2. **Killed my invented risk UI.** I had built a rupee-splitting "wobble" control. Groww already uses a
   four-level risk selector with volatility sparklines. We adopted the pattern people already know.
3. **Killed my fixed amount buttons.** Prime takes any typed amount on a keypad. My four preset chips were
   worse than the incumbent's.
4. **Gave the design its tokens.** I then had it pull Groww's production CSS directly rather than eyeball
   the colours — `#04b488` green, `#5367ff` purple, `#ed5533` for negatives, and Noto Sans, which is Groww's
   own declared fallback for its proprietary GrowwSans.

**Six corrections I gave on the first rebuild**, each of which changed the product:

> **"whats this money for — how is this helpful in choosing the stock? if not, how is this helpful in our
> product if the investments are not grouped by goals"**

Correct. The goal question was decorative — the code only read the timeline. It became goal *pots* with a
target and a date, and the home screen now groups holdings under them.

> **"we'd start you at rs. 500 — what if i want to invest a random amount ... no ctr button to go ahead of
> this screen, its not intuitive"**

Correct, and Groww's own screenshot proved it. Free numeric entry with a keypad and an explicit CTA.

> **"icici pru balanced manager — 1.04% a year is nothing for growth any random mutual fund gives >10%"**

I had misread the **fee** as the **return**. The fund returned +10.5% over three years; 1.04% is its annual
charge. But the reason I misread it is that the app had put a fee in the slot where every fund list in the
market puts a return. **If I misread it, a 22-year-old will.** The fee was moved out of that slot and its
explainer now opens with "This is a cost, not a return."

> **"the cost page ... does not really give the full clear picture, if my fund grows then after 2 years the
> charges would be incurred on the growth amount and not on the principal"**

Correct, and it was a real bug. The model charged the fee on the starting amount. A fund's fee comes off the
value every day, so it compounds. The true figure was 53% higher than what the app was showing.

> **"skip 3 weeks, how is it useful in the final submission prototype? we added that for some research right?"**

Half correct. The *button* was a research device; the *screen* is the product. It became a state of the home
screen, with the jump demoted to an explicitly labelled prototype control.

> **"not here feels ai generated, stick to what we found in research"** and **"use very simple
> straightforward language in everything"**

The "what we left out" screen was rewritten to carry only researched facts with their sources printed
underneath. Plain language became a global rule: "pot" not "bucket", "the fund's fee" not "expense ratio",
"bouncing" not "volatility".

---

## Phase 6 — Testing, and the bug I found by hand

**Prompt:** *can you for me run an extensive test clicking on each button, on each screen after landing from
all previous screens, look at all the various permutations and combinations — for example one bug that i
found was that just repeating the 500 on the pot did not affect it*

The bug I found by clicking was real: the "add the same amount again" button only rewrote its own label and
never moved any money. Behind it was a crash I had not seen — the same line destroyed a `<span>` inside the
button, so the screen broke permanently afterwards.

That prompt turned into an automated crawler: every button on every screen reached from its real path, 120
goal × timeline × risk combinations, the slider from 0 to 100%, amount edge cases, and back-navigation from
every screen. **It found five more bugs I had not seen**, listed in [`evals.md`](evals.md).

**One more I found by clicking:**

> **"one bug i found clicking on the 3 weeks later displays the warning but no deduction on portfolio amount
> happens inside the existing pots"**

The pot's price move was being derived from its *core* fund only, so a pot whose core was a bond fund never
fell — even though the risky slice inside it is a share fund and must. Two more bugs were sitting behind that
one.

---

## Phase 7 — Submission

**Prompt:** *lets start arranging stuff neatly in a folder which we will push to a remote repo ... the one
pager should be properly source backed where the source could be a direct link to our artefact or an index
value so that the evaluator can open my repo and reach there*

This produced the repository structure and the numbered source index. It also surfaced three things I had
not thought about: 16 of 24 survey rows contained names or phone numbers and had to be stripped, the
interview audio should never be committed, and the two confidential competitor decks in the parent folder
needed a `.gitignore` that could not accidentally include them.

**Prompt:** *do a sanity check on sources now.*

Worth doing. It found one citation pointing at a file that did not contain the claim, and one arithmetic
error in my own write-up: I had written that my fee maths "understated the real cost by 53%" when 53% is how
much *higher* the true figure is — the understatement was 34.5%. Both fixed.

---

## What I would tell someone doing this next

**Ask for pushback explicitly, then sometimes overrule it.** Four of the strongest decisions in this project
came from "any pushbacks?" — and two of the best came from rejecting the answer.

**Give it evidence, not adjectives.** Thirty-three screenshots changed more than any amount of describing.

**Check the arithmetic yourself.** Two of the most embarrassing errors — the fee model and the 53% — were
confidently produced and survived several readings. Both died the moment something ran and printed a number.

**Make it tell you where it is weak.** The interview analyses name my own bad interviewing; the research
documents name the sources that failed. Those are more useful than the findings.
