# U.W-VISUAL — Wave-Open Census — LANE A (Picker Gestalt: blob seat + header regime)

Re-judge of owner-uncertified still-reds inherited from T.W8's terminal state,
against the LIVE served build (`:8591`, gh-pages of the T.W8-terminal worktree).
Head of the shared U-F76 picker/readout mount chain (VISUAL→A11Y→PERF).

- Served build: `dist/gh-pages` of `.claude/worktrees/u-visual-census` on `127.0.0.1:8591`.
- Viewports: 1440×900, 390×844. Schemes: light + dark (geometry identical across schemes — see log).
- Probe: `census-probe.mjs` + `scroll-probe.mjs` (worktree root, uncommitted); log `census-probe-log.txt`.
- Before-frames of record: `docs/tranches/T/audit/pi/u-gestalt/frames/` + `probe-log-picker.txt` (:9000, T.W8-terminal).
- After-frames (wave-open re-capture): `docs/tranches/U/audit/w-visual/frames/`.

---

## ⚠ BUILD-UNBLOCK SCAFFOLD (wave-open census finding → hand-forward to U.W-ADOPT)

The serve script's self-heal build FAILED: the sibling `@mkbabb/glass-ui` was
freshly rebuilt to **5.0.0** (the producer-gated tag; `dist/blob.d.ts` mtime
minutes before wave-open) UNDERNEATH the frozen T.W8-terminal demo. 5.0.0 carries
**un-adopted producer renames** the demo still imports by the old names:

| Demo import (T.W8-terminal) | glass-ui 5.0.0 reality | Class |
|---|---|---|
| `@mkbabb/glass-ui/goo-blob` → `{ GooBlob }` | subpath renamed `./blob`; component `GooBlob`→`Blob` | pure relabel |
| `@mkbabb/glass-ui/dock` → `{ useLayerTransition }` | internalised as `dockCrossfadeContext`; not runtime-exported | semantic move |
| `@mkbabb/glass-ui/aurora` `type AuroraAtoms/Config` etc. | type-only, build-erased | non-blocking |

To serve the T.W8-terminal picker faithfully I added an **UNCOMMITTED** scaffold
(NOT an ADOPT decision; leave in place — other VISUAL lanes serving this worktree
depend on it):
1. `demo/shims/glass-ui-goo-blob.ts` + a `vite.config.ts` alias — re-labels
   `Blob as GooBlob` from `./blob`. The picker/blob SEAT geometry renders faithfully
   (canvas class `goo-blob-canvas`, HeroBlob-sized 180px). The rendered metaball is
   glass-ui **5.0.0**'s (newer than T.W8-terminal's blob) — bears on the OA-4 leg
   of u-f5 ONLY, which is ANNEX'd to the owner regardless.
2. `demo/@/components/custom/dock/layers/ActionBarLayer.vue` — the out-of-lane dock
   action-bar sub-layer crossfade stubbed inert (active layer shown, no morph). Does
   NOT touch any picker header/blob/rail/scroll geometry this lane judges.

**Hand-forward: U.W-ADOPT owns the real 5.0.0 adoption (goo-blob→blob / GooBlob→Blob /
useLayerTransition→dockCrossfadeContext).** The census verdicts below stand on
picker-side geometry (HeroBlob/ColorSpaceSelector/ConsoleRail/ColorPicker), unaffected
by the scaffold.

---

## [u-f5] BLOB-CARD-SEAT (T-30·T-49) → **ANNEX-OWNER-ATTEST**

**Born-RED gate (measured, LIVE, canvas SEAT box `.goo-blob-canvas`):** REPRODUCES,
materially unchanged from T.W8-terminal. Both schemes identical.

| Leg | @1440 | @390 | before (T.W8) |
|---|---|---|---|
| blob canvas box | x564.6 y104.7 **w180.2 h180.2** right744.8 bottom284.9 | x228.4 y130.4 w179.2 h179.2 right407.6 bottom309.6 | 1440: x565 w180; 390: x228 w179 |
| BR-1 blob.right − card-content.right (`.gamut-overlay`) | **+55.3** (744.8 − 689.5) | — | −56 |
| BR-1 blob.right − card-edge.right (`.rounded-card`) | **+33.8** (744.8 − 711) | +33.6 (407.6 − 374) | — |
| BR-2 blob.right − content.right @390 | — | **+48.9** (407.6 − 358.7) | −49 |
| BR-2 blob.right − viewport @390 | (n/a, 744.8<1440) | **+17.6** (407.6 > 390) | +17 (407>390) |
| BR-2b blob.bottom − readout.top (vertical overlap) | +44.4 | **+55.5** (309.6 − 254.1) | vertical-overlap (T.W8) |

By the mandate's literal canvas-box predicate ALL THREE gates (BR-1/BR-2/BR-2b)
FAIL and the DELTAs equal the before-frame (±1px). **However** the canvas is the
producer's **1.6× transparent overscan** by construction (`ColorPicker.vue` §THE SEAT:
"only the transparent 1.6× canvas overscan crosses the card edge, clipped by
`.app-layout`" — orbit-reach 0.49 ≤ 0.5 ⇒ visible bead contained). The dispositive
question — does the VISIBLE metaball spill/collide, or only the transparent overscan
cross — is a **WebGL-blob perceptibility** question.

**U-F54 NEVER-FAKE-JUDGE law applies:** headless SwiftShader renders the metaball
unfaithfully; I will NOT assert GREEN/RED from a headless frame. The re-capture frames
(`picker-{light,dark}-{1440,390}.png`) DO show the bead reading as an **apparently
contained** integrated pink paperweight top-right, visible bead clear of both the card
edge and the readout numbers — but that is a SwiftShader frame and cannot certify a
real-GPU bulge.

**Verdict: ANNEX-OWNER-ATTEST (OA-4).** Measurable geometry legs (above): the SEAT
canvas box is UNCHANGED from T.W8-terminal and still crosses card-content (+55.3/+48.9),
card-edge (+33.8/+33.6), viewport (+17.6 @390) and the readout band (+55.5 @390) — but
every one of those is inside the designed transparent-overscan budget. Owner must certify
on a real GPU whether the visible bead reads contained ("integrated bead", cure holds) or
actually spills/collides (re-cure owed). π-frames: before `…/T/audit/pi/u-gestalt/frames/picker-*-full.png`
→ after `…/U/audit/w-visual/frames/picker-{light,dark}-{1440,390}.png`.

---

## [u-f9-atrest] HEADER-SPACING REGIME (T-2·T-51·T-59) → **CENSUS-RED**

**Born-GREEN MUST-STAY gate BR-4 (title token step): HELD GREEN.**
`.space-trigger` computed `font-size`:

| | @1440 | @390 | before (T.W8) |
|---|---|---|---|
| title fs | **53.28px** (= `--type-display-2`) | **32.928px** (= `--type-display-2` responsive) | 1440: 67.776px; 390: 43.7px |

Stepped down exactly ONE golden rung at both viewports (WR-4 landed —
`ColorSpaceSelector.vue:208 font-size: var(--type-display-2)`); NEVER regresses to the
un-stepped 67.776px. BR-4 confirmed. ✔

**Seam gate BR-5 (title↔readout gap ≤ rhythm step; no dead/blank band): REPRODUCES @390.**

| | @1440 | @390 |
|---|---|---|
| readout.top − title.bottom (gap) | **4.0px** (240.5 − 236.5) | **24.6px** (254.1 − 229.5) |
| gap / title-fs (rhythm ratio) | 0.075em | **0.75em** |

The 1440-tight vs 390-airy **divergent rhythm** (T-59) REPRODUCES: a ~6× gap-ratio
divergence, and the 390 gap (24.6px = 0.75× the title) exceeds the line rhythm-step →
a reservation/blank band on the readout's left (the blob fills only the band's right).
WR-11 (one-law rhythm) is NOT confirmed landed and the divergence is measurably present.
Faithfully headless (pure text layout, no GPU) — asserted with confidence.

**Verdict: CENSUS-RED** — the WR-4 title-token cure HOLDS (BR-4 green, MUST-STAY guard
intact), but the BR-5 seam/rhythm half is owed a re-cure this wave (WR-11 one-law rhythm:
collapse the 4px↔24.6px divergence; absorb the 390 dead band). π-frames: `picker-*-1440.png`
(tight) vs `picker-*-390.png` (airy 2-line + gap). DELTA: rhythm-ratio 0.075em ↔ 0.75em
(divergent → target one-law); dead-band 24.6px @390 (→ 0/absorbed).

---

## [u-f9-rail] PICKER ACTIVE CHANNEL-RAIL SEAT (T-5/P1-R1) → **CENSUS-GREEN**

**Born-GREEN MUST-STAY gate BR-12 (active-seat tracks selected rung): HELD GREEN — 0px.**
Cycled all four channels (L, a, b, α) at both viewports × both schemes; measured the
`.rail-dot-seat` (WatercolorDot) center vs the active `.channel-rail-item[aria-selected]`
center:

| channel | @1440 offset (dx,dy) | @390 offset (dx,dy) |
|---|---|---|
| L | (0, 0) | (0, 0) |
| a | (0, 0) | (0, 0) |
| b | (0, 0) | (0, 0) |
| α | (0, 0) | (0, 0) |

Every rung: active-seat center coincides EXACTLY with the selected-rung center
(seat ~25.7×26.4px @1440, ~33.7×46px @390). Dot is seated dead-center, never orphaned,
moves to the selected rung on channel-change. The W4-4 geometry holds.

**OA-7 leg:** the WatercolorDot is a producer SVG per-instance filter (NOT WebGL — renders
faithfully headless). Frame `rail-light-1440.png` confirms the pink pigment dot renders
seated behind the active glyph, coherent against the pill-ring. Not under U-F54.

**Verdict: CENSUS-GREEN** — retire; the active channel-rail seat tracks at 0px offset
across every channel/viewport/scheme and the dot renders coherently. π-frames:
`rail-{light,dark}-{1440,390}.png`. DELTA: active-seat center offset = 0px ≤ tol (all rungs).

---

## [u-f9-scrolled] WHOLE-HEADER SCROLLED CONTRACTION (T-61/T-42 B-01) → **CENSUS-RED**

**Born-RED gates BR-9 (band footprint contracts) + BR-11 (scrolled title ≥ legible floor):
REPRODUCE — contraction ENTIRELY ABSENT.**

Forced overflow (short viewports) so the picker actually scrolls; the `.rounded-card`
(the `<lg` `overflow-y:auto` picker card) scrolled 180px @390 / an unrelated card @1440
(the picker card is `lg:overflow-visible` — does not scroll internally at desktop):

| | @390 at-rest → scrolled | @1440 at-rest → scrolled |
|---|---|---|
| header band block-size (BR-9) | 182.9 → **182.9** (Δ0) | 223.4 → **223.4** (Δ0) |
| header padding-top | 12px → **12px** | 12px → **12px** |
| title fs (BR-11) | 32.928 → **32.928** | 53.28 → **53.28** |
| header y (sticky?) | 105 → **−75** (scrolls OFF; NOT sticky) | 89 → 89 (picker didn't scroll @lg) |

The demo `CardHeader` (`ColorPicker.vue:12`, plain shadcn `@components/ui/card`,
`pt-3 pb-0` static) has ZERO scroll-contraction wiring (static grep: no `useScroll`/
`onScroll`/`sticky`/`scale`) — confirmed live: band footprint, padding, background, and
title fs are ALL invariant under scroll, and at 390 the header is not even sticky (scrolls
off the top). The owner's §0.8 mandate ("the header padding/background should ALSO shrink
on scroll—not just the title") is UNIMPLEMENTED. Not a compositor-only-scale failure — a
total absence. Faithfully headless (pure layout) — asserted with confidence.

**Verdict: CENSUS-RED** — whole-header scrolled contraction is absent; re-cure owed this
wave. NOTE: the cleanest cure (the P3 `ScrollCardHeader` producer contraction door) is
PRODUCER-GATED → **coordinate with U.W-ADOPT**; the demo band today carries neither a
sticky condensed strip nor any padding/scale contraction to judge as landed. π-frames:
`scrolled2-{light,dark}-{1440x520,390x480}.png`. DELTA: band block-size Δ0 (→ contract by
≥ ruled step); title fs Δ0 (→ NAMED legibility-floor token on the condensed strip).

---

## U-F76 MOUNT-BOX CHANGE (hand-forward → A11Y / PERF)

The picker header/blob mount box CHANGED vs the T.W8-terminal before-frames, driven by
the WR-4 title step-down shrinking the header band:

| | before (T.W8 :9000) | after (:8591) | Δ |
|---|---|---|---|
| @1440 title y | 166 | 151.5 | −14.5 (header + blob shifted UP) |
| @1440 blob y | 119 | 104.7 | −14.3 |
| @390 title y | 167 | 177 | +10 (shifted DOWN) |
| @390 blob y | 120 | 130.4 | +10.4 |
| title fs @1440 / @390 | 67.776 / 43.7 | 53.28 / 32.928 | WR-4 step-down |

A reseat that changes the mount box re-opens CLS. **PERF: re-check the picker/readout
CLS budget against this post-WR-4 header footprint.** (The shift is the intended WR-4
landing, not a defect — but it moved the mount, so the CLS gate must re-measure.)

---

## Summary

| Row | Verdict | Basis |
|---|---|---|
| u-f5 blob-card-seat | **ANNEX-OWNER-ATTEST** | canvas SEAT box unchanged & still crosses card/viewport/readout (within transparent-overscan budget); visible-bead containment = GPU/U-F54 → owner certifies (OA-4) |
| u-f9-atrest header-spacing | **CENSUS-RED** | BR-4 title-token step HELD green; BR-5 divergent rhythm (0.075em↔0.75em) + 24.6px dead-band @390 reproduces (WR-11 owed) |
| u-f9-rail channel-rail seat | **CENSUS-GREEN** | BR-12 active-seat 0px offset all rungs/viewports/schemes; WatercolorDot renders seated |
| u-f9-scrolled header contraction | **CENSUS-RED** | whole-header contraction absent (band/padding/title-fs Δ0 under scroll; not sticky @390); ScrollCardHeader door producer-gated → ADOPT |
