# T.W4.5 · CRITIQUE PASS B — the material ladder + neutrals + ink (W3's landed surface) + THE T-31 RE-JUDGE

**Pass**: W4.5 pass B (Fable + frontend-design; LIGHT — one round; coherence PRE-FILTER only,
never certification). **Surface**: `ladder-neutrals-ink` — W3's landed set (rungs · C3/Q18
neutral family · certified ink · header veil · ShadowPalette species · search seat) + the
owner-ordered **T-31 re-judge** (`MANDATE §0.5`, [OWNER-2026-07-10]).
**Head probed**: `06b793c` (= the W4 close head; branch `tranche-t`). **Drive**: live vite on
lane port **9470** (`VITE_API_URL=http://localhost:9470`, the e2e harness's own seam; the
owner's :9000 untouched), Playwright chromium probes + frames at
`scratchpad/w45-frames/` (session-local), plus an independent re-run of the four W3 census
oracles on lane ports 9470/9471.
**Law consumed**: `RATIFICATION-2026-07-09.md §0` (Q4 "The well." · Q18 "Keep." · Q9
effect-bracket · Q5 two-site ramp) → `MANDATE-2026-07-06.md §0` + §0.5 → `SYNTHESIS §2`
D1/D5/D6/D9 → `waves/T.W4.5.md`. **Baseline frames**: `audit/w3-close-artefacts.md` +
`w3-core-lane-record.md` + `w3-ink-lane-record.md`. **Anchors re-derived** via
`audit/w1-move-map.md` (PP-11): ink at `@composables/color/ink.ts`, ShadowPalette at
`palette-browser/card/`, search at `palette-browser/search/`, boot chain at
`demo/color-picker/composables/boot/`.

---

## §1 The mechanical floor (independently re-driven at THIS head, not the lane's word)

`VJS_E2E_PORT=9470 VJS_E2E_PERF_PORT=9471 npx playwright test --project=smoke` over the four
census oracles: **31 passed / 0 failed / 0 skipped (2.3m)** — O-7 card census (light + dark +
768 + 390), O-9 shadow-palette 6/6 (incl. error ≠ empty), O-11 header gates 6/6, O-18
contrast census **22/22 both schemes including the 3 formerly born-RED W4 rows** (readout
fracs · channel letters · ConfigSliderPane — flipped live at `f991554`, corroborated by
`w4-close-artefacts.md §1` row 4). The W3 gate state survives W4's landing intact.

## §2 The eye-judgment (D1–D10 + the owner's verbatim lines; both schemes; 1280 + 390)

- **The rung system LIVED** — all 7 user-view panes wear rung-1 plate (one cartoon register,
  stamp + grain) in both schemes; wells (dashed-well, PaletteCard/Skeleton ghosts, mix plate,
  perceived-space plate, stop chips) read as ONE tone-step of the plate, no blur; the dock is
  the only floating chrome in-frame. At 390×844 the membership holds over the aurora's
  brightest band (t-mobile F-8 frame — clean). Admin/ConfigSlider (session-gated) and the
  Extract camera STAGE pair rest on the O-7 identity stamp + source greps (census A7
  discipline), not live-driven here — no camera in the probe context; honest bound.
- **C3 / Q18 by eye** — the warm cream/stone-ink family is UNBROKEN in both schemes: light =
  warm cream plates over the pink field; dark = warm chocolate/stone (no cold gray anywhere,
  no raw #fff/#000 read). Color appears ONLY as data: palette chips, Generate swatches,
  gradient ramps, the view-dot previews in the dropdown, the WatercolorDot. The Browse error
  plate's red bang is the sanctioned error register (R7, untouched). The view dropdown speaks
  ink + data-dots; the Q5 two-site letterform ramp is W6's T-10 implementation (un-landed —
  not judged, per the W5/W6-surface exclusion).
- **Certified ink** — menus/profile-trigger/captions/readouts all read comfortably clear on
  their actual tiers in both schemes (O-18's 22 rows are the measured census; the eye agrees —
  the `--ink-muted` captions are quiet-but-legible, the readout fracs step down without
  fading into the plate). The muted/emphasis two-rung readout voice reads as designed.
- **The header veil at rest/stuck** — probed live on Home + Gradient: rest `::before` opacity
  **0.52** (the Q9 landed floor), feather mask present, warm-cream fill; after in-card scroll
  the veil swells to **1.0** with the feather intact — no band, no double-exposure. Visually
  the T-23 "shaded when NOT scrolled" is honored at rest without muddying the plate.
- **ShadowPalette species + search seat in-frame** — My Palettes: 3 in-grid STILL ghosts at
  artifact scale + the dashed "Start a new palette" well; Extract: the undeveloped-plate
  ghost with its mono caption ("UNDEVELOPED PLATE — FEED IT AN IMAGE" — the caption captions,
  never substitutes); Browse error: NO ghost (error ≠ empty lived). The search seats
  (Palettes/Browse) sit ON the paper — well fill, hairline edge, column width, content voice —
  judged beside the dashed-well + cards in ONE frame: cohesive, no dock-styled stray.

**Coherence verdict: PASS (pre-filter)** — W3's surface lives coherently at the W4.5 head;
zero regressions found; no taste certified (that is W8's).

## §3 THE T-31 RE-JUDGE (the owner's 2026-07-10 line, against the landed round-2/3 tree)

> "The dock is occluded by the cards--our core layout should have the dock atop, with the
> card/scene area on the bottom below that." — the structural dock-atop LAW is **W6's to
> land**; this is the honest mid-read.

**How bad is it NOW: not reproducible.** `document.elementFromPoint` sampled over the dock
band (200-point grid) across **17 states** — 7 views × light @1280×720, 3 views dark, short
viewports 1280×620 / 1180×560 / 1280×480 / 1100×430, and 390×844 ×2 views: **zero
card-over-dock hits** (the only non-dock hits are the dock's own rounded-corner wrapper).
Geometric overlap is impossible from viewport pressure alone: `.app-layout`'s
`padding-top: var(--dock-total)` pins the card top edge exactly at the dock band's bottom
(measured: card top = 71px = dock bottom, even forced to 430px height). Paint order today:
the dock wrapper computes **z-index 40** (`z-dock`, Dock.vue:125) vs `.pane-wrapper--left`
z 1 / right auto — the dock wins every overlap.

**What changed since `c63f9aa`**: demo-side, NOTHING in the dock/z/layout mechanics
(Dock.vue untouched; the layout tokens byte-identical — verified by diff). The only landed
deltas near the band: **W4-5's `--z-ornament: 20`** retired the BLOB's half of the band
collision (T-30's shot shows the bead overlapping "the About panel edge + nav" at `c63f9aa`;
the bead now sits flush IN the card, below chrome), and W2's overture changed arrival
choreography only. The paint inversion in the owner's shot (`t-31-dock-occluded-by-card.png`:
the About card's glass compositing OVER Login/@mbabb) is reproducible from this tree only if
the **producer token chain breaks**: `z-dock` → `--z-index-dock` → `--z-dock` (glass-ui
`src/styles/theme/bridges.css:254`). A silent chain break computes `z-index: auto` on the
band wrapper, and `.pane-wrapper--left { z-index: 1 }` then paints cards over the dock
DETERMINISTICALLY — the P9 phantom-utility grievance class, exactly. The sibling was
mid-BG/BH flight at the owner's audit (its `--glass-blur-dock`-chain retirement era); its
token state at that moment is unverifiable post-hoc. The chain resolves today (probed: 40).

**The class is ALIVE structurally** (why the owner's LAW still bites):

1. The "dock atop" is SIMULATED — a fixed overlay + `--dock-total` padding arithmetic, not a
   band the layout owns. The card/scene area is not structurally BELOW the dock.
2. Worst-case clearance is **0–1px** (≤560px heights: the About card's top edge presses flush
   against the pill — see `overlap-1100x430.png` / `shorter-Home.png`; flush, not composed).
3. The entire paint priority is a SINGLE POINT OF FAILURE on one producer variable chain — the
   only mechanism that reproduces the owner's shot, already burned once by the P9 class.

**The sharpest possible row for W6's lane** (the ruled structural cure, sharpened): land the
dock-atop as REAL layout — `.app-layout` becomes a two-band grid (`grid-template-rows: auto
1fr`); the `<nav>` band goes in-flow/static (the `fixed` overlay at Dock.vue:125, the
`--dock-total` padding reservation, and the load-bearing `z-dock` all retire together); the
scene band sits below behind a DESIGNED gap token (the current 0–1px arithmetic clearance
dies); portaled menus keep chrome z. Occlusion of the dock by any card dies BY CONSTRUCTION,
and the paint order stops depending on the producer token chain entirely — the structural
kill the owner named ("never by z-index patching"). Ultra-wide pin-at-top behavior (the
Proposal-B delta) should be re-confirmed in-band at the W6 landing.

## §4 Rows (every row landed-or-booked; zero silent drops)

| # | Finding | Disposition | Rationale |
|---|---|---|---|
| B-1 | T-31 mid-read: occlusion NOT reproducible at the W4.5 head (17 probed states, 0 hits; card top pinned at dock bottom; dock z 40); the class survives structurally (overlay+padding simulation · 0–1px worst-case clearance · paint priority single-pointed on the producer `z-dock → --z-index-dock → --z-dock` chain); sharpest W6 spec in §3 | **BOOK-WAVE (T.W6)** | The dock-atop band is W6's ruled surface (MANDATE §0.5 T-31); this pass hands W6 the honest baseline + the sharpened structural spec — no re-litigation, no z-patch filed |

No LAND-NOW rows: the W3 surface returned zero in-bounds defects at this pass's bar; all
mechanical gates independently green at this head.

## §5 Notes (flagged, not ruled — the LIGHT law)

- **Dark-scheme field/chrome split**: in dark scheme the aurora field stays bright (seed-lit)
  so the dock chrome reads light over it while rungs 1/2 read dark — coherent under D1's
  physics (chrome earns its material from what is beneath); the dark `lBand` (D4, the L2
  producer atom) is the already-booked cure riding W5/W7 surfaces. FLAGGED for the W8 eye,
  filed nowhere (un-landed surface).
- **STAGE rung**: camera-gated; certified by identity stamp + greps (A7), not live-driven —
  the honest probe bound of a headless pass.
- **T-30 (not this pass's row)**: incidentally observed at 1280/390 — the bead now sits
  crisp and flush IN the picker card corner (W4-5's landing); the full T-30 re-judge belongs
  to the picker-recomposition pass.
- **Q5 letterform ramp**: un-landed (W6's T-10) — the all-ink + data-dot menu observed here
  is the correct pre-W6 state, not a defect.
- The 2-line readout wrap at 390 (`92.0%, 88.8,` / `20.0`) is Q11b's ruled lever-3 honest
  lock for lab-class — observed working as ruled.

## §6 Verification artefacts

- Oracle re-run: 31/31 (§1; lane ports 9470/9471, head `06b793c`).
- Probe script + JSON + frames: `scratchpad/w45-passB-probe.mjs` · `w45-overlap-probe.mjs` ·
  `w45-frames/probe-results.json` + 16 frames (session-local scratchpad; the elementFromPoint
  grids, veil reads, and geometry tables are reproduced in §2/§3 above).
- Owner shot re-read: `audit/owner-screenshots/t-31-dock-occluded-by-card.png` (on-disk).
- Forensic reads (read-only): glass-ui `src/styles/theme/bridges.css:254` (the z chain);
  `git diff c63f9aa..HEAD` over `demo/@/styles/style.css` / `App.vue` / `dock/` (no layout
  mechanics deltas).
