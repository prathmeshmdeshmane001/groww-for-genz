# Hyperframes Composition Brief: Groww GenZ Activation Engine

## Objective
Create a short, polished, shareable launch video for the Groww GenZ Post-KYC Activation Engine case study and interactive prototype by Prathamesh Deshmane.

## Output
- Composition directory: `brag-output/composition/`
- Rendered video: `brag-output/brag.mp4`
- Format: landscape — 1920x1080
- Duration: 20 seconds (30 fps, 600 frames)

## Source Material
- Project root: `/Users/prathameshdeshmane/submission-groww-main`
- Primary files read: `index.html`, `app/v2-groww-genz.html`, `app/v1-first500.html`, `one-pager.html`, `README.md`
- Product name: Groww GenZ: Post-KYC Activation Engine
- Tagline / strongest claim: "74% of GenZ drop off after KYC. We replaced 5,000 mutual funds with intent pots, proved fee drag compounding, and built the First Red Day defense."
- Key UI or visual moment to recreate:
  - Exact iPhone 17 Pro titanium chassis holding the working Groww GenZ screens.
  - The 4 Intent Pots: "Safety Net (Emergency)", "Goa Trip", "New Phone", "The Long Run".
  - The Compounding Cost Breakdown: "₹514.51 from ₹500 today · ₹0.51 total expense".
  - Return habit loop: "Welcome back. We are not asking you everything again."
- Copy that must appear verbatim:
  - "74% of first-time GenZ investors drop off immediately after KYC"
  - "Pots, Not Products"
  - "₹500 today → ₹514.51 in 6 months"
  - "The First Red Day Defense: Normalizing drawdowns before panic sets in"
  - "23 / 23 Math Assertions Verified"
  - "Groww GenZ · Product Strategy & Architecture by Prathamesh Deshmane"
  - "groww-for-genz.vercel.app"

## Creative Direction
- Tone preset: `polished`
- Creative direction: "FinTech Product Masterclass Launch"
- Interpretation: Professional, authoritative, beautifully paced, showcasing real PM strategy, quantitative rigor, and mobile UI excellence.
- Angle: A compelling narrative that takes the viewer from the industry-wide post-KYC drop-off puzzle to an elegant 3-part product solution.
- Hook: 0-4.5s bold statement on the 74% drop-off statistic with an animated counter.
- Outro / punchline: 15-20s executive portfolio title card with author credits and live URL.
- Avoid:
  - Generic SaaS hype ("Take your investing to the moon")
  - Abstract 3D geometric balls or filler shapes
  - Fake or ungrounded statistics

## Visual Identity
- Background: `#060809` (deep dark canvas) with radial glow `#161f2e`
- Text: `#f8f8f8` (primary), `#b8b8b8` (secondary), `#64748b` (muted)
- Accent: `#04b488` (Groww emerald green), `#5367ff` (Groww purple), `#ff5e3b` (alert red)
- Display font: `Noto Sans`, system-ui, -apple-system, sans-serif
- Body font: `Noto Sans`, monospace for tabular numbers
- Visual references from the project: iPhone 17 Pro chassis with titanium rim, dynamic island, metric cards, and verified checkmarks.

## Storyboard
1. **The Problem** (0.0s - 4.5s) — 74% Post-KYC Dormancy stat, why 5,000-fund catalogs paralyze first-time investors.
2. **Pots, Not Products** (4.5s - 9.5s) — iPhone 17 Pro reveal with 4 sequential intent buckets and ₹500 entry ticket.
3. **The Math & Defense Engine** (9.5s - 15.0s) — Real compounding cost breakdown (₹514.51 / ₹0.51 charges) vs ₹18 stock fee drag, plus the First Red Day psychological guardrail.
4. **Habit Loop & Outro** (15.0s - 20.0s) — 30-day habit re-engagement ("Welcome back") leading to author title card & live Vercel URL.

## Audio
- Audio role: Steady, clean, modern tech bed
- Music: `happy-beats-business-moves-vol-12-by-ende-dot-app.mp3`
- Music treatment: Plays 0.0s to 20.0s, initial volume 0.32, smooth 1.5s fade-out at end.
- Music cue guidance: 109.96 BPM. Strong cue locks at 8.74s, 13.11s, 17.47s.
- Audio-reactive treatment: Subtle; device frame and key metric cards gain subtle presence on bass swells.
- SFX files:
  - `drop_001.ogg` (UI pot card drops at 5.2s, 6.0s, 6.8s)
  - `impactBell_heavy_000.ogg` (Investment confirmation chime at 12.0s)
  - `impactSoft_medium_000.ogg` (Logo reveal at 16.5s)
- Audio files: Copied into `brag-output/composition/assets/`

## Hyperframes Instructions
- Use pure standards-compliant HTML/CSS/JS with `data-start`, `data-duration`, `data-track-index` per Hyperframes specifications.
- Use local assets for all audio.
- Ensure all text has strong WCAG AA contrast (white/high-contrast green on dark background).
- Run `hyperframes check` before rendering.
