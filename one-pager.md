# Designing Groww for the GenZ Investor

> **Prathamesh Deshmane · FinTech Product Case Study & Architecture · September 2026**  
> **Prototypes:** [v2 — Groww for GenZ (Final Rebuild)](app/v2-groww-genz.html) · [v1 — first500 (User-Tested Baseline)](app/v1-first500.html)  
> *Every bracketed number `[n]` references the empirical evidence index in [`README.md`](README.md#source-index).*

---

## 1. Executive Problem Diagnosis

Groww has mastered sign-up and KYC. It has not solved what comes next.

* **40% of Indian demat accounts sit dormant** `[1]`.
* **Only ~5.9% of broking app installs ever complete a first trade**; ~86% stall immediately post-onboarding `[2]`.
* In our empirical survey of 24 young adults (mostly ages 21–23), **17 of 24 are stalled pre-activation** `[3]`.

The primary blocker is neither lack of capital nor general risk aversion. **It is decision paralysis.** SEBI reports that complexity blocks **74%** of non-investors, with 27% stating *"I don't know how to start"* `[1]`. Exactly half our sample reported being blocked by this exact wall `[4]`. Participant Prakhar (21) opened a Groww account specifically because he heard its AI would recommend what to buy; once his demat activated, he got overwhelmed, distracted, and never invested a single rupee `[12]`.

> **The Core Thesis:** The account is not the problem. **The first ₹500 is.**  
> Therefore, the metric to optimize is not vanity installs or even the initial deposit, but **the second investment within 30 days ($I_2 \le 30\text{d}$)** — the inflection point where an intentional habit forms.

---

## 2. Product Scoping & Boundaries

### In Scope
The Groww experience immediately **after KYC approval**:
* Guided first investment flow without product jargon.
* Return dashboard anchored around goals.
* Transparent pre-trade cost breakdown displayed in rupees on the exact investment ticket.
* The "First Red Day" psychological guardrail.
* Tappable, plain-language financial explainers backed by primary regulatory sources.

### Out of Scope & Strategic Exclusions
* **KYC & Account Opening:** Groww already excels here (only 7 of 145 recent Play Store reviews cited KYC issues `[10]`).
* **F&O and Intraday Trading:** SEBI data shows 43% of Indian F&O traders are under 30 and **89% lose money**, capturing 53% of all market losses `[8]`. Placing leveraged derivatives in front of a novice is predatory.
* **Personal Loans & High-Cost Credit:** Groww cross-sells loans at 13–48% APR `[9]`. Placing high-interest debt adjacent to a first ₹500 investment destroys trust.
* **IPOs, Tax Advisory, and Social Feeds:** Each re-introduces the cognitive clutter and FOMO this product strips away.
* **Multi-Month Learning AI:** Untestable in an interactive prototype; instead, we engineered the demonstrable half: a seamless return habit loop that remembers context without re-asking.

---

## 3. The Solution Architecture

### Pillar 1: Pots, Not Products
* Users declare **what the money is for** (Emergency Net, Phone, Trip, Long Run) and **when they need it**.
* The algorithm deterministically assigns the asset class (Liquid Fund for $<12$ months, Balanced Advantage for $1–3$ years, Nifty 50 Index for $>3$ years).
* The user is never forced to decipher mutual funds vs. index funds vs. ETFs vs. direct equities — a distinction that **11 of 24 users confirmed nobody had ever explained to them** `[5]`.
* Recommends a specific starting amount rather than prompting an empty text field, addressing the top-cited knowledge gap: **"how much should I invest" (12 of 24)** `[5]`.

### Pillar 2: Pre-Trade Cost Transparency in Rupees
* **17 of 24 users were wrong about transaction charges**, with 15 significantly underestimating them and zero selecting "no idea" `[6]`.
* Buying and selling a ₹500 equity round-trip costs **₹18.22**, of which **₹15.93 is a flat depository fee (CDSL)** `[7]`. This imposes an immediate 3.64% penalty on small tickets.
* While Groww's own advisory tier (MF Prime) shows zero fee visibility across eight onboarding screens `[11]`, our product itemizes every rupee before confirmation.

### Pillar 3: The First Red Day Defense
* Poor initial performance accounts for **87% of demat dormancy** `[1]`.
* When the market dips (-4.2%), the app normalizes the drawdown by charting historical market recoveries (the 2008 crash recovered in 3 years; March 2020 recovered in 9 months).
* Prominently guides users toward **"Do Nothing"** while keeping the **"Sell it all"** action unblocked to preserve user agency. Both interviewed participants held when presented with this screen `[12][13]`.

### Pillar 4: Independent Auditable Trust
* Every financial term is interactive. Tapping a drawer explains the term and provides exact citations (AMFI factsheets, CDSL tariffs, SEBI circulars).
* Both think-aloud participants unprompted asked how to independently verify claims rather than blind trust. Participant Pulin: *"Main apne aap se zyada kisko trust karunga? Kisi ko bhi nahi"* `[13]`.

### Pillar 5: The Incumbent Advantage (Why Groww)
* Competitor platforms like ET Money Genius charge ₹249/month — creating a **4.76% drag on a ₹5,000 monthly SIP and an impossible 50% drag on ₹500** `[14]`.
* Guidance for small tickets must be free. Only an incumbent with multi-product brokerage revenue can subsidize zero-commission onboarding guidance as an acquisition moat.

---

## 4. What User Testing Broke & Key Iterative Pivots

Testing v1 against recorded think-aloud user sessions revealed unexpected cognitive failures:

| v1 Flaw Observed | User Signal | Architectural Pivot in v2 |
|---|---|---|
| **Fee Miscomprehension** | Prakhar interpreted a ₹43 charge ledger as returns he would receive `[12]`. | Redesigned cost ledger with explicit charge labeling and green/neutral outcome separation. |
| **Invalid Benchmarking** | Pulin rejected the cost comparison (*"comparison hi fuddu hai"*), catching that it compared a lump-sum against a 10-year SIP `[13]`. | Re-benchmarked against an identical-tenure SBI Fixed Deposit rate ($5.65\%–6.40\%$). |
| **Mathematical Understatement** | Initial math charged expense ratios on principal alone. | Refactored to a compounding NAV fee drag model; revealed real lifetime drag is **53% higher** than naive models `[18]`. |

---

## 5. Limitations & Future Scope

* **Sample Skew:** $n=24$ survey responses skewed towards college students and early professionals (ages 21–23).
* **Qualitative Sample:** 2 deep think-aloud interviews; future rounds require multi-variant A/B cohort tracking.
* **Return Projections:** Trailing 10-year annualized returns are illustrative historical benchmarks, not future guarantees.

---

*Case study by **Prathamesh Deshmane**. Source code, math test suite, and interactive prototypes available in this repository.*
