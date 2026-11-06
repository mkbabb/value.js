# F-T5 — SS-13, the probe and denominator sweep (2026-11-06)

**Unit.** `fourier-DESIGN-TAIL.md` §C F-T5: run each carried F.W3 and F.W4 SS-13 probe against fourier master and close each leg GREEN with its receipt; a leg that does not reproduce is homed by a dated addendum to a named unit. The roster is F-W4 §411 (the named deferred probes), F-W3 S-9 (#1–#14), F-W4-ADDENDA-b §5, and every "→ SS-13" flag in F-W3/F-W4 §2.

**Origins.** Prod `https://fourier.babb.dev` (web at master `9b18d3e`; the merge `b0d3d0f` adds only `scripts/deploy-alert*.sh`), and, for the legs that need a saved visualization, a local stack at master (`b0d3d0f`: mongod rs0, the API, vite dev, the e2e global seed). One browser per run, one context per cell, closed in `finally`; runs under `~/.claude/guard/guarded`. `/equation` loads are paced 35 s apart (the API's compute limiter).

**Instruments.** `~/.dev-logs/x-realize-2/fourier/ss13/`: `ss13-probe.mjs` (runs `r2`, `r3`), `ss13b-probe.mjs` (`b1`, `b2`), `ss13-local.spec.ts` (`l1` fixed the M-δ mode locator; `l2` at `--repeat-each=2` gives runs 1 and 2); each run's `legs.json(l)` and frames sit beside it.

## Legs read live

| Leg | Origin | Run 1 | Run 2 | Reading (last) |
|---|---|---|---|---|
| FR-AH-16 · 768×1024 coarse: header controls inside their bar | prod | GREEN | GREEN | `{"bar": 60, "controls": 4, "coarse": true, "worst": {"label": "About Fourier analysis", "top": 8, "bottom": 8, "h": 44}}` |
| FMD-16 · /morph 390 coarse: grid cells contain their content | prod | GREEN | GREEN | `{"cells": 10, "worstOverflowPx": 0}` |
| FMD-16 · /morph 768 coarse: grid cells contain their content | prod | GREEN | GREEN | `{"cells": 10, "worstOverflowPx": 0}` |
| D·D-B1 · /equation 390: no two stage controls overlap | prod | GREEN | GREEN | `{"buttons": 5, "overlaps": 0}` |
| D·D-M1 · /equation 390: the equation stage has a vertical escape | prod | GREEN | GREEN | `{"cardH": 177, "scrollH": 177, "overflowY": "visible"}` |
| FR-EQR-8 · /equation 390: no inline-start overhang outside the scroll region | prod | GREEN | GREEN | `{"xScrollers": 0, "lost": 0}` |
| M-FR · /equation 390 light: the mode toggle's focus ring paints unclipped | prod | GREEN | GREEN | `{"reached": true, "painted": true, "clipper": null}` |
| D·D-B1 · /equation 1440: no two stage controls overlap | prod | GREEN | GREEN | `{"buttons": 5, "overlaps": 0}` |
| D·D-M1 · /equation 1440: the equation stage has a vertical escape | prod | GREEN | GREEN | `{"cardH": 207, "scrollH": 207, "overflowY": "visible"}` |
| FR-EQR-8 · /equation 1440: no inline-start overhang outside the scroll region | prod | GREEN | GREEN | `{"xScrollers": 0, "lost": 0}` |
| M-FR · /equation 1440 dark: the mode toggle's focus ring paints unclipped | prod | GREEN | GREEN | `{"reached": true, "painted": true, "clipper": null}` |
| D·D-B1 · /equation 1280: no two stage controls overlap | prod | GREEN | GREEN | `{"buttons": 5, "overlaps": 0}` |
| D·D-M1 · /equation 1280: the equation stage has a vertical escape | prod | GREEN | GREEN | `{"cardH": 204, "scrollH": 204, "overflowY": "visible"}` |
| FR-EQR-8 · /equation 1280: no inline-start overhang outside the scroll region | prod | GREEN | GREEN | `{"xScrollers": 0, "lost": 0}` |
| fr-CL D-L3 · /equation 1280×800: legend over the plot (recorded; frame read) | prod | GREEN | GREEN | `{"legendCoverPct": 0}` |
| M-FR · /equation 1280 light: the mode toggle's focus ring paints unclipped | prod | GREEN | GREEN | `{"reached": true, "painted": true, "clipper": null}` |
| PSM-1 · /paper 1440: the search modal is styled | prod | GREEN | GREEN | `{"position": "fixed", "bg": "color(srgb 0.20397 0.148263 0.0829736 / 0.18)", "opacity": 1, "inViewport": true, "w": 512}` |
| PAW-44 · /paper 1440: a sticky header holds through a 2500 px scroll | prod | GREEN | GREEN | `{"stickies": 4, "pinned": 2, "scrolled": 2500}` |
| PAW-44 · /paper 390: a sticky header holds through a 2500 px scroll | prod | GREEN | GREEN | `{"stickies": 2, "pinned": 1, "scrolled": 2500}` |
| FR-AH-43 · nav menu label, composited (light) | prod | GREEN | GREEN | `{"ratio": 11.36}` |
| FMD-4 · /morph 640: every rendered Duration track ≥ 80 px | prod | GREEN | GREEN | `{"widths": [582, 582, 582]}` |
| FMD-4 · /morph 700: every rendered Duration track ≥ 80 px | prod | GREEN | GREEN | `{"widths": [642, 642, 642]}` |
| FMD-4 · /morph 768: every rendered Duration track ≥ 80 px | prod | GREEN | GREEN | `{"widths": [710, 710, 710]}` |
| FMD-4 · /morph 960: every rendered Duration track ≥ 80 px | prod | GREEN | GREEN | `{"widths": [886, 886, 886]}` |
| S-9 #8 CU-1 · the drag surface's cursor | prod | GREEN | GREEN | `{"cursor": "grab"}` |
| S-9 #6/#10 · a held scrub pauses the clock; release ends it and the clock resumes | prod | GREEN | GREEN | `{"playingBefore": true, "heldAt": 0.3, "heldStill": true, "scrubbingWhileHeld": "true", "scrubbingAfter": null, "resumed": true, "r0": 0.319, "r1": 0.` |
| PV-★MF-1 · /paper Back: a visible focus indicator (light) | prod | GREEN | GREEN | `{"reached": true, "changedPx": 371, "focusVisible": true, "outline": "solid 2px", "shadow": "rgba(255, 255, 255, 0.1) 0px 1px 0px 0px inset, color(srg` |
| PV-★MF-1 · /paper Back: a visible focus indicator (dark) | prod | GREEN | GREEN | `{"reached": true, "changedPx": 369, "focusVisible": true, "outline": "solid 2px", "shadow": "rgba(255, 255, 255, 0.08) 0px 1px 0px 0px inset, color(sr` |
| HLG-41 · /morph theme flip INP ≤ 200 ms (×4 flips) | prod | GREEN | GREEN | `{"durationsMs": [64, 40, 48, 48]}` |
| EV-D·D-M3 · /equation 390 touch: a tapped coefficient opens its readout (Chromium) | prod | RED | RED | `{"opened": [], "focus": "fading-scroll fading-scroll--x eq-scroll-region"}` |
| SW-1 / AC-D-1 · /v 1440: the expanded transport dock holds a definite face inside the viewport | local @ master | GREEN | GREEN | `{"dockW": 958, "left": 23, "right": 981, "vw": 1440, "faceW": 888}` |
| SW-1 / AC-D-1 · /v 1024: the expanded transport dock holds a definite face inside the viewport | local @ master | GREEN | GREEN | `{"dockW": 614, "left": 23, "right": 637, "vw": 1024, "faceW": 544}` |
| SW-1 / AC-D-1 · /v 768: the expanded transport dock holds a definite face inside the viewport | local @ master | GREEN | GREEN | `{"dockW": 718, "left": 25, "right": 743, "vw": 768, "faceW": 648}` |
| SW-1 / AC-D-1 · /v 390: the expanded transport dock holds a definite face inside the viewport | local @ master | GREEN | GREEN | `{"dockW": 340, "left": 25, "right": 365, "vw": 390, "faceW": 270}` |
| S-9 #7 AX-1 · /v: the caret is aria-hidden and the thumb carries the value | local @ master | GREEN | GREEN | `{"caret": true, "hidden": true, "valuetext": "t = 0.13", "dx": -0.3, "above": 5.7, "inViewport": true}` |
| S-9 #2/#3 · /v: the caret is whole, over the thumb | local @ master | GREEN | GREEN | `{"caret": true, "hidden": true, "valuetext": "t = 0.13", "dx": -0.3, "above": 5.7, "inViewport": true}` |
| M-δ #17 · Export: the first focus is the same control in both states, not a state-dependent switch | local @ master | GREEN | GREEN | `{"withEpicycles": {"tag": "BUTTON", "role": null, "name": "Close", "switch": false}, "without": {"tag": "BUTTON", "role": null, "name": "Close", "swit` |

Instrument notes. The first probe read FMD-4 as one Duration width per cell (its first sitting timed out on the integrated thumb, which has no box); the second probe reads every rendered Duration track (the first ancestor wider than the thumb) at 640/700/768/960, and the table carries the second probe's reading. The caret legs (#2/#3 and AX-1's caret half) are read on `/v`, the only consumer that passes the timeline a `label` (AnimationControls); `/equation`'s ConvergenceTimeline renders no caret by design.

## A leg that reproduces its defect

- **EV-D·D-M3** (touch inspection, F-W4-ADDENDA-b §5): a tapped coefficient opens no readout on Chromium with a coarse pointer, ×2. The row is open at master (F-T7: `F-W4:395`, `useCoeffHover` still requires a MouseEvent). The WebKit arm was not run: the Chromium arm already reproduces, and the row is the cure's home.

## Legs homed (dated addendum, 2026-11-06)

Each remaining flag is a magnitude, readback or witness clause riding a defect row. It is homed to that row's state at master as F-T7 classified it (`fourier-FT7-CARRY-SWEEP.md`). A cured row's leg is confirmatory and closes with the row; an open or held row's leg travels with it. Rows marked *F.W3 row* have no carry ledger (F.W3 authored none, R-3); they rode the F.W3 close.

| Flag | Source | Row (carry:line) | Row at master | Disposition |
|---|---|---|---|---|
| AA-16 breakpoint | F-W4:103 | AA-16 (F-W4:73) | cured (read) | closes with the row (confirmatory) |
| AA-17 magnitude | F-W4:103 | AA-17 (F-W4:74) | cured (read) | closes with the row (confirmatory) |
| AA-21 UA half | F-W4:103 | AA-21 (F-W4:78) | cured (read) | closes with the row (confirmatory) |
| AA-30 runtime corollary | F-W4:103 | AA-30 (F-W4:86) | cured (read) | closes with the row (confirmatory) |
| FR-AFP-5 destination residue | F-W3:802 · F-W4:106 | FR-AFP-5 (F-W4:101) | cured (read) | closes with the row (confirmatory) |
| FR-AFP-43 AT trace | F-W3:816 | FR-AFP-43 (F-W4:126) | cured (read) | closes with the row (confirmatory) |
| FR-AFP-60 flushness | F-W3:817 · F-W4:106 | FR-AFP-60 (F-W4:115) | cured (read) | closes with the row (confirmatory) |
| FR-AFP-63 adversarial text (fixture-gated by FR-AFP-1) | F-W4:106 | FR-AFP-63 (F-W4:130) | homed (producer/ruling) | travels with the row |
| FR-AUL-24 timing | F-W4:109 | FR-AUL-24 (F-W4:148) | cured (read) | closes with the row (confirmatory) |
| FR-AUL-27 magnitude + sort-index note | F-W3:351 | — (—) | F.W3 row | rode its wave's close |
| FR-AUL-32 Presence window | F-W4:109 | FR-AUL-32 (F-W4:153) | cured (id-cited at site) | closes with the row (confirmatory) |
| FR-AUL-17 JSC date acceptance | F-W3:348 | — (—) | F.W3 row | rode its wave's close |
| AC-M-12 two 60 Hz readouts, magnitude | F-W4:85 | AC-M-12 (F-W4:212) | open (read) | travels with the row |
| SS-C-8 re-seed ordering | F-W4:112 | SS-C-8 (F-W4:226) | open (no cure receipt) | travels with the row |
| EP-D/D-20 popup min-content px | F-W4:112 | EP-D/D-20 (F-W4:241) | cured (read) | closes with the row (confirmatory) |
| CCD-M-3 reachability | F-W4:115 | CCD-M-3 (F-W4:265) | cured (read) | closes with the row (confirmatory) |
| ECD-M-2 confirm | F-W4:115 | ECD-M-2 (F-W4:266) | cured (read) | closes with the row (confirmatory) |
| ECD-D-3 readback | F-W4:115 | ECD-D-3+D-13+D-14 (+C-21) (F-W4:278) | homed (producer/ruling) | travels with the row |
| CCD-D-8 readback | F-W4:115 | CCD-D-8 (F-W4:281) | cured (read) | closes with the row (confirmatory) |
| ECD-D-4 morph transient | F-W4:115 | ECD-D-4 (F-W4:286) | cured (read) | closes with the row (confirmatory) |
| CCD L-18 dual-canvas frame cost | F-W4:118 | — (—) | F.W4 spec row, not carried | rode its wave's close |
| CCD-D-5 coarse factor | F-W4:90 | CCD-D-5/L-7/C-7 (+D-13/D-14) ⊕ ECD-D-10/L-4 (F-W4:270) | homed (producer/ruling) | travels with the row |
| FR-AH-1 LCP/TBT trace | F-W4:121 | — (—) | F.W4 spec row, not carried | rode its wave's close |
| FR-AH-15 secondary leg | F-W4:121 | FR-AH-15 (+FR-AH-55) (F-W4:308) | cured (deleted) | closes with the row (confirmatory) |
| FM-1 axe run | F-W4:121 | FM-1 (= FMD-2) (F-W4:310) | cured (id-cited at site) | closes with the row (confirmatory) |
| FR-CP-LM4 magnitude | F-W4:128 | FR-CP-LM4 + C-12 (+M-L3) (F-W4:341) | cured (read) | closes with the row (confirmatory) |
| FR-CP-LM5 RO-loop | F-W4:128 | FR-CP-LM5 + C-10 (+M-L2) (F-W4:342) | cured (read) | closes with the row (confirmatory) |
| FR-CP-D5 axe | F-W4:128 | FR-CP-D5 (F-W4:344) | cured (read) | closes with the row (confirmatory) |
| FR-CL mobile reachability | F-W4:128 | FR-CL-D2 ⊕ M-R2 ⊕ M-R3 ⊕ D-18 (F-W4:345) | open (read) | travels with the row |
| FR-CP-D1 dark axes, composited | F-W4:411 · ADD-b §5 | FR-CP-D1 (F-W4:334) | open (cited lines unchanged) | travels with the row |
| EV-B-1 touch leg, both engines | F-W4:131 | EV-B-1 (= FR-EMT-1) (F-W4:383) | open (no cure receipt) | travels with the row |
| PSM-8..31 engine half (mouseenter) | F-W4:143 | PSM-8 ⊕ PSM-10 ⊕ PSM-11 ⊕ PSM-27 ⊕ PSM-28 ⊕ PSM-31 (F-W4:430) | homed (producer/ruling) | travels with the row |
| PSM dark arm | F-W4:143 | PSM-13 ⊕ PSM-4 ⊕ PSM-12 (F-W4:425) | homed (producer/ruling) | travels with the row |
| PV withOverlay thrash | F-W4:143 | PV-D/B-2 body ⊕ L/D2 ⊕ L/D3 ⊕ L/D5+L/D30 ⊕ L/D6 ⊕ L/D8 ⊕ L/D (F-W4:443) | homed (producer/ruling) | travels with the row |
| PAW-30 post-repair witness | F-W4:143 · :411 | ⊘ PAW-30 (double-latent, lands WITH PAW-1) (F-W4:447) | homed (producer/ruling) | travels with the row |
| PAW-14 print preview | F-W4:153 | — (—) | F.W4 spec row, not carried | rode its wave's close |
| PAW-55 equation clip | F-W4:158 | — (—) | F.W4 spec row, not carried | rode its wave's close |
| PAW-15 AT continuous read | F-W3:843 · F-W4:162 | — (—) | F.W3 row | rode its wave's close |
| GCM-38 rendered witness (a posed design decision) | F-W4:184 | — (—) | F.W4 spec row, not carried | rode its wave's close |
| GCM-30 sliver readback | F-W4:185 | — (—) | F.W4 spec row, not carried | rode its wave's close |
| EquationPanel magnitudes (ORDER at three widths) | F-W4:314 | EQP-D-3/C-5 ⊕ D-2/C-11/M-N4 ⊕ D-4/C-6/D-L16 ⊕ D-5/D-L14/C-11 (F-W4:410) | homed (producer/ruling) | travels with the row |
| HLG-1 phantom-tile pixels | F-W4:425 | — (—) | F.W4 spec row, not carried | rode its wave's close |
| MPC band edges / clip counts | F-W4:426 | MPC-31 (the ONE-CUT law) (F-W1:86) | cured (id-cited at site) | closes with the row (confirmatory) |
| MPC-31 cured scheme at a non-boot state | F-W4:411 | MPC-31 (the ONE-CUT law) (F-W1:86) | cured (id-cited at site) | closes with the row (confirmatory) |
| CoefficientsSpectrum keyboard + overscroll | F-W3:326 | FR-CS-i1 (F-W4:371) | homed (read) | travels with the row |
| FR-TT-7 warn multiplicity | F-W3:317 | — (—) | F.W3 row | rode its wave's close |
| FR-TT denominators / overlap / parser | F-W3:319 | FR-TT-5 / FR-TT-6 / FR-TT-9 / FR-TT-14 / FR-TT-24 (the toolt (F-W1:63) | cured (id-cited at site) | closes with the row (confirmatory) |
| EasingCurvePreview U-5 | F-W3:256 | — (—) | F.W3 row | rode its wave's close |
| EasingCurvePreview U-1/U-3 | F-W3:260 | — (—) | F.W3 row | rode its wave's close |
| EasingPicker live keystroke (demoted, g8) | F-W3:257 · :405 | — (—) | F.W3 row | rode its wave's close |
| EasingPicker painted geometry | F-W3:258 | — (—) | F.W3 row | rode its wave's close |
| PV ★NAV-1 one click | F-W3:281 | — (—) | F.W3 row | rode its wave's close |
| GalleryCard tier-chip dark arm | F-W3:371 | — (—) | F.W3 row | rode its wave's close |
| LC-1/LC-2 keystone corroboration (#13/#14) | F-W3:387 | — (—) | F.W3 row | rode its wave's close |
| D-12 negative probe (#4) | F-W3:439 | AC-D-12/C-20 (F-W4:177) | open (read) | travels with the row |
| GM-M3 focus-scroll drag | F-W4:168 · :411 | GM-1 ⊕ GM-2 ⊕ GM-M3 ⊕ GM-M5 ⊕ GM-M6 ⊕ GM-20 (F-W4:460) | cured (deleted) | closes with the row (confirmatory) |
| MG-ε at-rest frame (fr-App probe 8) | F-W3:338 | — (—) | F.W3 row | rode its wave's close |
| failure-state witness (server arm F.W5) | F-W4:216 | — (—) | F.W4 spec row, not carried | rode its wave's close |

**Struck, retained so no seat re-opens them:** S-9 #5 (WCAG 2.5.8, discharged statically, rK-19); fr-CCD D-20 / CCD-D-20 (explicitly not an SS-13 slot, F-W4 §411/§422); GCM-31's NEEDS-BUILD probe (the row's own build gate, F-W4:180); FMD-16's emission half (decided browserlessly by K-GEOM, F-W4:90).

