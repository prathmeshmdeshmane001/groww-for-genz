# Designing Groww for the GenZ Investor

<p align="left">
  <img src="https://img.shields.io/badge/Status-Complete-04b488?style=flat-square" alt="Status" />
  <img src="https://img.shields.io/badge/Math_Tests-23%2F23_Passed-04b488?style=flat-square" alt="Tests" />
  <img src="https://img.shields.io/badge/Survey_Sample-n%3D24-5367ff?style=flat-square" alt="Survey" />
  <img src="https://img.shields.io/badge/Design_Tokens-Groww_Production-21262d?style=flat-square" alt="Design Tokens" />
</p>

> **Prathamesh Deshmane · FinTech Product Case Study & Architecture · September 2026**  
> *A dedicated onboarding engine engineered for first-time investors immediately after KYC clearance — solving the activation drop-off where 86% of users stall.*

---

## 📱 Live Prototypes

| Prototype | Description | Direct Access |
|---|---|---|
| **v2 — Groww for GenZ** *(Final Rebuild)* | Re-engineered in Groww design tokens, featuring goal pots, compounding NAV fee drag, and the First Red Day defense. | [Open v2 App](app/v2-groww-genz.html) |
| **v1 — first500** *(User-Tested Baseline)* | The initial prototype evaluated during recorded think-aloud usability interviews. | [Open v1 App](app/v1-first500.html) |

---

## 📑 Core Case Study Deliverables

| # | Deliverable | Description | Format |
|:---:|---|---|:---:|
| **1** | **[Executive One-Pager](one-pager.html)** | Concise ~700-word strategic synthesis covering the core thesis, scoping boundaries, and iterative pivots. | [HTML Reader](one-pager.html) · [Markdown](one-pager.md) |
| **2** | **[Prompting Steer Log](prompts.html)** | Verbatim prompt evolution, pushbacks accepted vs. overruled, and mathematical steering decisions. | [HTML Reader](prompts.html) · [Markdown](prompts.md) |
| **3** | **[Evaluation Suite (Evals)](evals.html)** | Dual-layer verification: Layer 1 automated arithmetic crawler (23 assertions) + Layer 2 think-aloud usability testing. | [HTML Reader](evals.html) · [Markdown](evals.md) |
| **4** | **[Interactive Prototypes](app/v2-groww-genz.html)** | Zero-dependency client-side single-page applications runnable in any modern browser. | [Run Prototype](app/v2-groww-genz.html) |

---

## 🏛️ System Architecture & Directory Map

```text
submission-groww-main/
├── app/
│   ├── v2-groww-genz.html        # Final rebuild using Groww's proprietary design tokens
│   ├── v1-first500.html          # Baseline prototype tested by Prakhar and Pulin
│   └── cost-model.test.mjs       # Automated test suite (23 mathematical assertions)
│
├── research/
│   ├── problem-dossier.html      # Empirical teardown (SEBI data, 145 Play Store reviews, Reddit)
│   ├── competitive-landscape.html# Teardown of ET Money Genius, Zerodha, and Groww MF Prime
│   ├── survey-questions.md       # Tap-only 12-question survey design rationale
│   ├── survey-responses.csv      # Anonymized raw dataset (n=24)
│   └── survey-analysis.py        # Statistical script reproducing all survey metrics
│
├── interviews/
│   ├── script.html               # Field moderation script and observation rubric
│   ├── 1-prakhar-transcript.md   # Participant 1 transcript (In-ICP, 21, never invested)
│   ├── 1-prakhar-analysis.html   # Qualitative findings and method failure retrospective
│   ├── 2-pulin-transcript.md     # Participant 2 transcript (Out-of-ICP, active trader)
│   └── 2-pulin-analysis.html     # Think-aloud observations and fee cognition analysis
│
├── decisions/
│   ├── decision-log.html         # Evidence-backed decision register (what changed and why)
│   └── prototype-scope.html      # Screen-by-screen UX specifications
│
├── index.html                    # Local PM Companion & iPhone 17 Pro interactive workspace
├── server.js                     # Zero-dependency local Node.js static server
└── package.json                  # Standard npm execution scripts
```

---

## 🔬 Local Verification & Testing

Verify the financial mathematics and survey statistics locally:

```bash
# 1. Run the financial arithmetic test suite (23 assertions)
node app/cost-model.test.mjs

# 2. Run the quantitative survey response analysis (n=24)
python3 research/survey-analysis.py

# 3. Launch the local interactive workspace on port 8085
npm start
```

---

## 📊 Source & Evidence Index

Referenced as `[n]` across the deliverables and case study documentation:

| # | Claim | Evidence Source |
|:---:|---|---|
| `[1]` | 40% Demat dormancy; 74% blocked by complexity; 27% "don't know how to start"; 87% of dormancy driven by initial loss. | SEBI Investor Survey 2025, summarized in [`research/problem-dossier.html`](research/problem-dossier.html). |
| `[2]` | ~5.9% of broking installs reach a first trade; ~86% stall immediately post-onboarding. | Funnel cohort analysis in [`research/problem-dossier.html`](research/problem-dossier.html). |
| `[3]` | $n=24$ survey: 17 pre-activation or stalled; 0 active traders. | [`research/survey-responses.csv`](research/survey-responses.csv) via [`research/survey-analysis.py`](research/survey-analysis.py). |
| `[4]` | Q5: 8 "don't know what to buy" + 4 "too confusing" = 50% of the sample blocked by decision paralysis. | Survey Question 5 in [`research/survey-analysis.py`](research/survey-analysis.py). |
| `[5]` | Q10: "How much should I invest" (12/24); fund type confusion (11/24) top unaddressed topics. | Survey Question 10 in [`research/survey-analysis.py`](research/survey-analysis.py). |
| `[6]` | Q6: 17 of 24 wrong on transaction fees; 15/24 severely underestimated; 0 selected "no idea". | Survey Question 6 design rationale in [`research/survey-questions.md`](research/survey-questions.md). |
| `[7]` | ₹500 equity round-trip costs ₹18.22; ₹15.93 is a flat CDSL depository fee. | Verified in [`app/cost-model.test.mjs`](app/cost-model.test.mjs) (Assertion 1). |
| `[8]` | F&O: 43% under 30, 89% lost money, capturing 53% of all market losses. | SEBI F&O Study FY26 in [`research/problem-dossier.html`](research/problem-dossier.html). |
| `[9]` | Groww cross-sells unsecured personal loans at 13–48% APR. | Google Play Store listing (`com.nextbillion.groww`), September 2026. |
| `[10]` | 145 Play Store reviews: KYC mentioned 7×, aggressive ads/upsell mentioned 29×. | Thematic review coding in [`research/problem-dossier.html`](research/problem-dossier.html). |
| `[11]` | Groww MF Prime asks risk/horizon/age/income, recommends 2 funds, displays zero fee breakdown. | Competitive audit in [`research/competitive-landscape.html`](research/competitive-landscape.html). |
| `[12]` | Prakhar: Opened account and never invested; read ₹43 charges as income; held on first red day. | [`interviews/1-prakhar-analysis.html`](interviews/1-prakhar-analysis.html) · [Transcript](interviews/1-prakhar-transcript.md). |
| `[13]` | Pulin: Fee estimate shifted from ₹5 to ₹40; caught invalid comparison; unprompted held on red day. | [`interviews/2-pulin-analysis.html`](interviews/2-pulin-analysis.html) · [Transcript](interviews/2-pulin-transcript.md). |
| `[14]` | ET Money Genius ₹249/mo creates 4.76% drag on ₹5,000 SIP and 50% drag on ₹500. | Fee modeling in [`research/competitive-landscape.html`](research/competitive-landscape.html). |
| `[15]` | Competing GenZ apps (Millions, Trackk) push F&O as their primary monetization engine. | Teardown in [`research/competitive-landscape.html`](research/competitive-landscape.html). |
| `[16]` | Fund expense ratios, exit loads, and trailing 3/5/10-year returns sourced from Groww.in. | `FUNDS` configuration object in [`app/v2-groww-genz.html`](app/v2-groww-genz.html). |
| `[17]` | Key iterative pivots driven by think-aloud failures. | Documented in [`decisions/decision-log.html`](decisions/decision-log.html). |
| `[18]` | Compounding NAV fee drag vs. static principal calculation (+53% higher). | Mathematical assertions in [`app/cost-model.test.mjs`](app/cost-model.test.mjs). |

---

## 👤 Author & Attribution

**Prathamesh Deshmane**  
*Product Management Case Study & Architecture Portfolio*  
September 2026
