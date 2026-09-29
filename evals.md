# The evals

**Deliverable 3 · Groww Product Intern case study**

Two different questions, so two different kinds of eval:

| | Question | Method |
|---|---|---|
| **Layer 1** | Does it do the arithmetic right, and does every path work? | An automated suite anyone can re-run |
| **Layer 2** | Does it change what someone knows, and what they then do? | Recorded think-aloud sessions against a measured baseline |

Layer 1 is the easy one and it still found nine bugs. Layer 2 is the one that matters, and its most useful
result is a **failure**.

---

# Layer 1 — Automated

## 1a. The money maths

The whole product rests on one claim: *we will tell you what this costs before you buy it.* If those numbers
are wrong, nothing else matters. So they are asserted, not eyeballed.

```bash
node app/cost-model.test.mjs
```

**23 assertions.** The suite reads the functions straight out of the shipped HTML rather than a copy, so it
cannot drift from what users actually see. What it protects:

| Group | Asserts |
|---|---|
| **The anchor** | A ₹500 share round trip costs exactly **₹18.22**; ₹100 costs ₹16.39 (16.4% — the flat-fee point) |
| **The fee bug** | The fund fee compounds on a growing balance, so it must exceed the naive principal-only figure. Checked on four funds. This test exists because the first model was wrong. |
| **Exit charges** | The balanced fund's 1% bites inside a year and vanishes after; index and short-term are nil; liquid is nil from day 7 |
| **FD baseline** | SBI rates match the published slabs at every tenure: 1yr 6.25%, 2yr 6.40%, 3yr 6.30%, 5yr 6.05%, 6mo 5.65% |
| **Sanity grid** | Every fund × six amounts (₹100 to ₹1,00,000) × six horizons: no NaN, no negative cost, no ending value below principal |
| **Monotonicity** | Cost rises with holding time |
| **The split** | Steady + risky always equals the amount exactly, at 0/5/10/20/50/100% |

One assertion I wrote **failed**, and the code was right: I had assumed a liquid fund would lose to a
six-month FD. It wins — by **₹6.08 on ₹5,000**. I corrected the test rather than the code, and that margin
is now itself an assertion, because "barely beats an FD, but isn't locked" is the honest reason to prefer it.

## 1b. The interaction crawler

Run in a real browser against the live page. Not a script replaying one happy path — it reaches each screen
by its actual route and then exercises everything on it.

| Sweep | Coverage |
|---|---|
| **Every button, every screen** | Each screen re-entered from its real path, then each button clicked in turn, snapshotting screen + text + `aria` state + sheet + slider before and after. Flags anything that throws or changes nothing. |
| **120 combinations** | 5 goals × 6 timelines × 4 risk levels. Asserts the right fund every time, a positive outcome, a non-negative cost, a gap note, an FD row, and that confirm reaches the done screen. |
| **60 combinations** | 5 goals × 4 risk levels × 0/25/100% risky slice, asserting four things agree: the pot header equals the sum of its rows, the warning strip equals the actual drop, the red-day figure reconciles with "worth X of Y", and the red-day value matches home. |
| **Edge cases** | Slider at 0/5/25/50/75/95/100; amounts of empty, 0, 1, 99, 100, 1,00,00,000; back-navigation from all six flow screens. |

## What the automated layer found

Nine defects, six of them in the final sweep:

1. **"Add the same amount again" moved no money.** The primary action on the top-up screen only rewrote its
   own label. *(Found by hand, by clicking.)*
2. **A crash behind it.** That same line replaced the button's contents, destroying a `<span>` inside it, so
   the next render threw `Cannot set properties of null` and the screen stayed broken for the session.
3. **At a 100% risky slice, the recommendation card headlined a fund holding ₹0**, describing an index fund
   the user had put nothing into.
4. **The done screen read "₹0 goes into UTI Nifty 50 Index Fund."**
5. **The FD comparison named both funds** when only one held money.
6. **The red day computed the loss on the steady slice only** — so a 100%-risky pot would have shown **−₹0**
   on a crash, and a bond-only pot claimed to be down when it cannot be.
7. **A risky slice inside a bond pot never fell.** The price move was derived from the pot's *core* fund, so
   a safety-net pot sat unchanged through a market drop even though its risky slice is a share fund.
   *(Found by hand.)*
8. **The headline loss summed only the falls while home showed the net**, so a bond-core pot would have read
   "−₹7.35 … worth ₹494.23 of ₹500" — which does not add up.
9. **The explainer sheet survived navigation.**

**What this layer cannot tell you:** whether any of it is worth building. Every test above passed on v1 too,
and v1 was the version that confused both participants.

---

# Layer 2 — Does it change anything?

## The baseline

The survey (n=24) is deliberately a **pre-test**, not just background. It establishes what this group
believes *before* seeing anything, so the interviews have something to move against.

| Measure | Baseline |
|---|---|
| Charges on a ₹500 round trip | **17 of 24 wrong. 15 badly under. Nobody picked "no idea"** — confident and wrong |
| "Nobody ever explained how much I should invest" | 12 of 24 |
| "Nobody ever explained mutual fund vs index vs ETF vs stock" | 11 of 24 |
| Blocked by the decision itself | 12 of 24 — exactly half |

## The sessions

Two recorded think-aloud sessions, each ~35 minutes, screen-shared or handed over, against **v1**.

| | **Prakhar, 21** | **Pulin** |
|---|---|---|
| Profile | Groww account open, never invested. **In ICP.** | Invests on Zerodha Coin + Kite, checks daily. **Out of ICP.** |
| Charges, before | "paanch rupaye ke andar" (under ₹5) | "one percent at max" (₹5) |
| Charges, after | **Measurement void** — I answered before he could | **"forty something… chaalees"** — correct magnitude, clean |
| Decision change | not measured | **None.** *"But this forty is unavoidable, right?"* |
| Time to first investment | 453s (contaminated — see below) | not timed |
| Red day | **Held.** Read the 2008 and March 2020 recovery figures aloud, chose do-nothing unprompted | **Held.** *"Of course do nothing… waiting is the best thing ever"* |
| Cost screen comprehension | **Failed.** Read ₹43 of charges as money he would *receive* | **Failed.** Read "DP charge", guessed "Direct plan" |
| Comparison screen | Confusing | **Correctly identified as invalid** — *"comparison hi fuddu hai"*. A product defect, not a user failure. |
| Would pay ₹100/month | Yes | No |

## The result that matters

Pulin's charges measurement is clean: asked, silence, then his own answer. **₹5 → ₹40.** The number moved.

Thirty seconds later:

> *"But this forty is unavoidable, right? Kyunki platform to kuch charge nahi kar raha hai, saare bigger
> players hi hain jo charge kar rahe hain… ye waali cheezein to unavoidable hain na."*

He learned the figure and concluded it was nobody's fault, so nothing needed to change. He is half right —
STT and stamp duty really are third-party — but the point of the screen is that the **flat** ₹15.93 is what
makes ₹500 in a single share a bad idea, and that did not land.

**A knowledge test is not a behaviour test, and here they came apart in one person, thirty seconds apart.**

That single finding drove three changes in v2: the cost screen now answers the objection directly
("you're right that it's unavoidable on a share — that's why we didn't start you there, funds don't have
it"), "DP charge" became "depository fee" with a tappable explainer, and every explainer ends with where to
verify it independently.

## Where my own method failed

Worth recording, because it is the difference between a measurement and an anecdote.

| Failure | Fix |
|---|---|
| **Interview 1's post-test is void.** I asked the charges question again, then answered it myself before he could — *"paanch rupaye nahi hoga bhai… chaalees rupaye hoga"*. His only contribution was echoing "chaalees". | Ask, stay silent, write the number down, *then* reveal. Applied in interview 2, which is why it produced a result. |
| **The post-test used a different amount.** Pulin answered ₹40 — the ₹5,000 figure — to a question about ₹500. So he recalled rather than re-derived. | Say the amount out loud both times. |
| **453 seconds is not a task time.** It includes think-aloud, my questions and two live bugs. | Read the app's own timer aloud so the product time is on tape. |
| **"Would you pay ₹100?" is leading.** | "What would you pay?" |
| **Both participants are friends, and one is out of ICP.** | Recruit from the 16 survey respondents who left contact details; 7 of 24 match the target profile exactly. |

---

# What is not tested

**v2 has had no user testing at all.** Prakhar saw v1; Pulin saw v1 plus an intermediate build. Everything
from the pots onward — goal pots, the risk screen, free amount entry, the FD comparison, the rebuilt cost
screen, the explainers — is supported by evidence about what *broke*, but has not itself been watched.

Both apps are linked in the README precisely so this is inspectable rather than asserted.

# What I would run next

A 20-minute protocol against v2, with both original participants plus one fresh in-ICP recruit:

1. **Charges pre/post on the same amount.** Ask, stay silent, record. Show the screen. Ask again. Then
   — the part I missed — **"so what would you do differently?"** That is where the learning broke last time.
2. **Time from open to invested**, read off the app's own counter.
3. **Comprehension, unprompted:** "what did you just buy, and when do you get it back?" If the pot framing
   works, this should be answerable without scrolling.
4. **The red day**, hold or sell, and why.
5. **Jargon check:** tap "depository fee", close it, then ask them to explain it back.
6. **The metric itself:** offer the second investment and see whether they take it. Nothing else in this
   study measures the thing the product is actually optimising for.

| Success criterion | Target |
|---|---|
| Charges estimate after | Within ₹5 of ₹18.22, on the amount asked |
| Behaviour change | States a different action, not just a different number |
| Comprehension | Names the fund and the timeline unprompted |
| Red day | Holds |
| Second investment | Accepted |
