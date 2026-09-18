# JUROR-3 — DESIGN, GESTALT, AND PERFORMANCE

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier this
seat was explicitly spawned with. The declaration is the served tier this session reports; it is
not inherited from a parent seat.

- Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
- Subject `demo/picker/ColorPicker.vue` (414 lines) and its colocated cone.
- Write scope honoured: this report, plus `probe-j3-motion.mjs` and `probe-j3-collision.mjs`, are
  the only artifacts this seat produced. `probe-j3-gestalt.mjs` and `probe-j3-gestalt-2.mjs` were
  already on disk in this directory; I read them, **re-ran them myself**, and adopt them as pinned
  witnesses. No file under `src/`, `demo/`, `api/`, `test/`, `e2e/`, `vnext/`, `scripts/`, or any
  `INBOX.md` was modified.

### Verification receipt

Nothing in this report is inherited. Every probe was re-run by this seat against the live tree
before signing, and the re-runs are reported alongside the originals wherever they differ:

| witness | re-run | outcome |
|---|---|---|
| `probe-j3-gestalt.mjs` | 8 matrices, full | **reproduces exactly** — seam `70.42 / 78.71 / 25.75 / 25.32 / 24.78`; pair `0.9750 / 0.7291 / 0.7861`; `--instrument-title-gap` `""` ×8; `h1` 0 ×8; `contenteditable` 3 ×8; subFloor **7** at 1440 |
| `probe-j3-gestalt-2.mjs` | ARM A · B · C · D | **reproduces exactly** — contraction opens at 720@2 and 360@4 only; seam ratios 7.66 / 8.56 / 2.60; boot `1431ms` vs browse `266ms` (**5.38×**, prior run 3.82×) |
| `probe-j3-motion.mjs` | ×2 further runs | **RED harder** — drag **99/99** and **36/36** frames over 16.7 ms (100%), p50 `66.0` / `65.7 ms`, Σ long-task `3616` / `1013 ms` |
| `probe-j3-collision.mjs` | **new, this seat** | the finding below (J3-16) |
| `STATES.json` RTL rows | re-read | `dir:"rtl"`, `pageErrors:[]`, `spectrum-dot` clipped on **both** RTL matrices and no other — **the harness is repaired; the RTL arm is live evidence, not a void** |
| shots | read as images | `rtl-desktop`, `zoom-200-desktop`, `safari-desktop-light`, `safari-mobile-dark` |

Two corrections to the draft this seat carried in, both applied below: the RTL harness is **no
longer void** (three stale sentences removed), and the seam's lower arm is not merely tight — it is
a **collision** (J3-16).

---

## Verdict

**APOTHEOSIS_REQUIRED.**

Not because the defect count is large — because the defects compose into a single experience
failure that no patch reaches. The flagship route's plate spends its first 163 vertical pixels on
an identity label, a WebGL ornament, and 70.42px of void, then leaves so little air beneath the
specimen that **the spectrum's own thumb is painted on top of the numbers** at every viewport
measured; renders that specimen in the wrong family at 0.975× the label instead of 0.786×; drops
the specimen's own least count into the share URL at twelve decimal places; runs its primary
interaction at a **median 58–67ms per frame, over budget in 96–100% of frames across four runs**;
at the 200% zoom the canon explicitly requires, puts every operable control below the fold of a card
whose header occupies **63.9%** of the visible box while the entire action bar disappears; and under
`dir=rtl` **states a different colour than the one it holds** — `lab(92% 88.8 20)` renders as
`20.0 , 88.8 , %92.0` — while the spectrum thumb is clipped off the plate entirely.

The occlusion is the whole verdict in miniature. Above the numbers: 70.42px of air reserved for a
worst case that never comes. Below them: 9.19px, which is less than the 14.3px overhang of the very
indicator that has to sit there. **The same composition is simultaneously too generous and too mean
about the same object, 80px apart.** No quantity in it was decided against any other.

Each of those is separately measurable. Together they say one thing: **this is not an instrument
that was composed. It is a Card that accumulated.** The producer ships `InstrumentChassis` and
`Slider`; the route consumes neither, so every quantity the chassis would supply — the golden
ratio, the title gap, the paired type clamp, the target seat — is re-minted locally and each local
mint is wrong in a different direction at a different viewport. That is a transposition, not a
repair.

I also **overturn two challenger rulings on measured bytes**, one of which would have caused real
damage if executed:

1. **CHALLENGE-C's C-7 — "`useHeaderCondense` is structurally unreachable; delete it" — is
   REFUTED.** The gate opens and the header contracts by 52% at exactly the two zoom matrices where
   the instrument is otherwise unusable. Deleting it, as jury-2's Stage C currently orders, removes
   the only mechanism that rescues the 200% and 400% arms. **This is my formal dissent.**
2. **CHALLENGE-C's C-1 — "the cell is orphaned permanently and never recovers" — is REFUTED as a
   universal.** The mechanism is real and I uphold it; the permanence is not reproduced.

---

## Evidence base

| source | what it is |
|---|---|
| `probe-j3-gestalt.mjs` | 8 matrices × 40 measures, chromium, pinned route. Run this session. |
| `probe-j3-gestalt-2.mjs` | contraction reachability under real scroll · the vertical argument · boot cost · the write path. Run this session. |
| `probe-j3-motion.mjs` | **written by this seat** — frame budget at idle, under pointer drag, under keyboard run. **Run four times.** |
| `probe-j3-collision.mjs` | **written by this seat** — the specimen/stage occlusion witness (J3-16). |
| `visual/REPORT.{md,json}` | the committed 60-capture WebKit matrix. |
| `visual/STATES.json` + `states.mjs` | the six state matrices (zoom-200, reduced-motion, forced-colors, RTL ×2, keyboard-focus). |
| shots (vision) | `safari-{desktop,mobile}-{light,dark}/picker.png`, `zoom-200-desktop/picker.png`, `forced-colors-desktop/picker.png`, `rtl-desktop/picker.png`, `keyboard-focus-desktop/picker.png` |

**Pinned route** `http://localhost:9000/#/?space=lab&color=lab(92%25+88.8+20+/+82.7%25)` — W48's own
baseline colour.

**Engine note.** The three probes run chromium; the shots are WebKit. Geometry agrees between them
(e.g. seam 70.42 chromium vs the 69.93 CHALLENGE-D measured); the one divergence I record is the
plate shadow alpha — I measure `/ 0.8`, CHALLENGE-D reported `/ 0.5`. Immaterial to every ruling.

---

# PART I — ADJUDICATION

## The four mechanisms

Twenty-eight challenger findings across three seats reduce to **four mechanisms**. Naming them is
the adjudication; everything downstream is consequence.

> **M1 — the fused node.** One DOM element is simultaneously the document heading, the reactive
> projection of the model, and the user's text-entry surface.
>
> **M2 — the local mint.** The producer chassis is never consumed, so every quantity it owns
> (ratio, title gap, paired clamp, target seat, boundary set) is re-derived locally, and each local
> derivation binds on a different arm at a different viewport.
>
> **M3 — the static reserve.** Layout minima are computed from worst cases and from an ornament's
> nominal footprint, independent of whether the worst case or the ornament ever materialises, and
> independent of the viewport that has to absorb them.
>
> **M4 — the unbudgeted frame.** An eager second WebGL2 context and a per-frame model→gradient→
> canvas recompute sit on the interaction path of a 1741-node route, with no frame budget declared
> anywhere.

M1 and M2 are the challengers' territory and I largely uphold them. **M3 and M4 are this seat's,
and they are where the verdict comes from.**

---

## UPHELD

### J3-1 · BLOCKER · the fused node — display, announcement and share identity disagree
**Merges** D-01 · C-1 · D-07 · C-16 · L-8 (editor arm). **Mechanism M1.**
**Status UPHELD_REPRODUCED.**

`ColorComponentDisplay.vue:13` renders the readout as glass-ui `<CardTitle>` (an `<h3>`);
`:21-39` puts `contenteditable="true" role="textbox"` on each figure cell whose `.fig-int` /
`.fig-frac` children Vue owns and patches.

Measured, every one of eight matrices (`probe-j3-gestalt.mjs`):

```
h1                0      (all 8 matrices, 1440 · 720@2 · 390 · 360@4 · 320 · forced-colors · reduced-motion · 390x600)
firstHeading      H3: "92.0 % , 88.8 , 20.0"
contenteditable   3
```

The write path, measured (`probe-j3-gestalt-2.mjs` ARM D, one keystroke into the `l` cell):

```
t0  cells ["50.0","20.0","30.0"]   valuetext "Lightness 50.0%"   title lab(50% 20 30)
t1  cells ["50.05",...]            valuetext "Lightness 50.0%"   title lab(50.05% 20 30)
                                                                  hash  lab(50.05%25+20+30)
```

Three witnesses of one quantity, two values, after **one** keystroke. The cell shows raw un-
normalised user text; the AT announcement shows the formatted model; the share URL shows the
un-formatted model. The node is a projection except while it is being written, when it is an input
— which is precisely the fusion.

Canon: `VISUAL-CONSTITUTION §7` "Title, **read-only** contiguous numeric readout"; `§4` "editing
occurs only in W21's semantic numeric fields"; `§3` line 85 "Each route has one H1 and exactly one
stable main landmark, owned by the shell"; `PROPORTION-AUDIT §5.10`, `§5.11`.

**Disposition BUILD.** Cure is the transposition both challengers reached independently and I
confirm: shell owns the route `<h1>`; the readout becomes `<output>` (non-heading, non-live,
labelled); editing moves whole into the axis composition over the producer `Slider`. One writer,
one formatter, one truth. **But see J3-6 — deleting the writer does not close the divergence.**

---

### J3-2 · BLOCKER · the static reserve, and the inverted seam
**Merges** D-02 · D-09 · D-19 · D-13. **Mechanism M3.**
**Status UPHELD_REPRODUCED, with a new apportionment and a new law.**

`ColorComponentDisplay.vue` reserves `min-height: calc(var(--readout-lines,1) * 1.12em)` and then
`align-content: flex-end`, so a one-line tuple inside a two-line lock paints its unused line as
**void above the numbers**. `seat.css:88-89` adds a Blob-derived `padding-right` and `min-height`.

Measured across matrices:

| matrix | seam label→headline | readout reserved − painted | `.title-row` min-h 73.12px |
|---|---:|---:|---|
| 1440×900 | **70.42** | **+55.41** | rendered 84.97 → **not binding (0px)** |
| 720×450@2 | **78.71** | **+55.41** | rendered 73.11 → **binding** |
| 390×844 | 25.75 | −5.07 | rendered 73.11 → **binding** |
| 390×600 | 25.75 | −5.07 | binding |
| 360×225@4 | 25.32 | −5.08 | binding |
| 320×568 | 24.78 | −5.07 | binding |

`--instrument-title-gap` resolves to `""` in **all eight matrices** — the P122 token is undefined
and unconsumed; the seam is a local `.picker-header` mint (`row-gap` 7.168px at 1440).

**New, and this is the sharper law.** The register measures only the seam *above* the specimen.
Measured on both sides (`probe-j3-gestalt-2.mjs` ARM B, relative to the card box):

| matrix | gap label→headline | gap headline→stage | **ratio** |
|---|---:|---:|---:|
| 1440×900 | 70.42 | 9.19 | **7.66 : 1** |
| 720×450@2 | 78.71 | 9.19 | **8.56 : 1** |
| 390×844 | 25.75 | 9.91 | **2.60 : 1** |

The specimen is not floating in generous air. It is **crushed against the stage below and abandoned
below the label above**, at up to 8.56:1 where the composition's own rhythm constant is φ = 1.618.
That is why the desktop frame reads as broken rather than as spacious: the asymmetry, not the
absolute gap, is what the eye reports. Any cure that only caps the upper gap can satisfy
`I_after ≤ min(φG, I_before − G)` while leaving the specimen still crushed downward. **The gate
must constrain both sides.**

And the lower arm is not merely tight. **9.19px is less than the stage indicator's own overhang, so
the thumb paints over the numbers** — measured at every matrix. See **J3-16**, which is the
decisive arm of this finding and the reason GD-2 asserts non-overlap and not only a ratio.

The source comment refutes itself. `ColorComponentDisplay.vue:157-166`:

> *"The §6.1-measured 61px dead band between the figures and the spectrum rail **DIES** while the
> lock holds bit-for-bit … the card rect never moves"*

The band it claims to have killed measures **70.42px at 1440 — larger than the 61px it names.**
And the card rect does move: CHALLENGE-D measured +8.4px card growth and 8px inner horizontal
overflow mid-keystroke.

`header.css:18-23` claims its token cured a *"6× divergent gap (4.0px@1440 vs 24.6px@390)"*.
Measured after the cure: 70.42@1440 vs 25.75@390 = **2.73×, sign inverted** — the loose arm moved
from phone to desktop. **D-09 UPHELD_BY_BYTES.**

`seat.css` anchors, read at HEAD: `:87 .title-row {` · `:88 padding-right:` · `:89 min-height:` ·
`:90 }`. W48 Work-2's anchor `seat.css:88` names the **horizontal** clearance, not the vertical
minimum at `:89`. **D-19 UPHELD.**

Mobile break: at 390 `readoutBoxW` 327.38 with last-line ink 88.55 → **27.05% filled, 72.95% void**
on a 2+1 break of a three-term tuple. **D-13 UPHELD_REPRODUCED** (fold: the break is a consequence
of the same reserve decision).

**Disposition BUILD.**

---

### J3-3 · BLOCKER · no protagonist — and the companion out-masses it
**Merges** D-04 · D-08 · D-11 · L-12. **Mechanism M2.**
**Status UPHELD_REPRODUCED, and worse than charged.**

```
grid-template-columns   "512px 512px"                     → 50.00% / 50.00%
plates at 1440          512 × 684.77   shadow color(srgb 0.11 0.098 0.09 / 0.8) 8px 8px 0px 0px
                        469.06 × 190.33  shadow none      ← the NESTED Card
                        512 × 774      shadow color(srgb 0.11 0.098 0.09 / 0.8) 8px 8px 0px 0px
--instrument-title-gap  ""    (all 8 matrices)
.space-trigger count    2 at 1440 and forced-colors · 1 at 720@2 and below
```

`VISUAL-CONSTITUTION §3` law 1 binds exactly `61.8033989% / 38.1966011%` or
`66.6666667% / 33.3333333%`, protagonist 61.8–66.7%. Measured **50.00% — 11.8 points below the
floor**. §3 line 42 binds Picker's housing to `InstrumentChassis` with "exact golden inspector
38.1966011%; an absent inspector leaves no filler". §3 line 58: "About is a quiet trailing
destination rather than Picker's companion."

**New.** CHALLENGE-D charged "equal size". Measured, the companion is **774 vs 684.77 = 1.130×
taller**, holding **53.1% of total plate area**. The protagonist is the *minor* plate — out-sized,
out-massed, and carrying a character-identical shadow. There is no reading of the desktop frame in
which the left plate is the subject; I looked at `safari-desktop-light/picker.png` and the eye goes
right, to the taller plate with the larger heading and the denser content.

The producer ships what is needed:

```
$ node -p "Object.keys(require('@mkbabb/glass-ui/package.json').exports).filter(k=>/chassis|slider/.test(k)).join(' ')"
./instrument-chassis ./slider
$ node -p "require('@mkbabb/glass-ui/package.json').version"
7.0.0
```

`PROPORTION-AUDIT §2` ruling 2 opens *"Because Picker no longer nests a Card, BI P122 exposes
`--instrument-title-gap` …"*. Picker nests one (`ComponentSliders.vue:25`, measured 469.06×190.33)
and the token is `""`. **The ruling's premise is false at HEAD and it must be re-premised before it
executes.**

**Disposition BUILD.**

---

### J3-4 · BLOCKER · the zoom cliff — and the contraction that saves it
**NEW — this seat.** **Mechanism M3.** **Status UPHELD_REPRODUCED.**

No challenger measured a zoom matrix, and `VISUAL-CONSTITUTION §3.2` plus W48's own Completion
clause both demand one ("complete-route 1440/390/320/**actual-400%-zoom**").

Measured (`probe-j3-gestalt.mjs` M5/M6, `probe-j3-gestalt-2.mjs` ARM A/B):

| | **200% zoom** (720×450 @2) | **400% zoom** (360×225 @4) |
|---|---:|---:|
| card clientHeight | **336** | **111** |
| card scrollHeight | 559 | 526 |
| **overflow below the fold** | **223** | **415** |
| header height | **214.67** | **183.52** |
| **header as share of visible card** | **63.9%** | **165.3%** |
| rail top (rel. card) | **355.53** — below the 338px card | below |
| seam label→headline | **78.71** — the worst of any matrix | 25.32 |
| picker action-bar labels in `nav` | **absent** | **absent** |

At 200% zoom the first paint of the flagship instrument is: an identity label, a WebGL ornament,
78.71px of void, a number tuple, a clipped spectrum — and **nothing operable**. The four channel
sliders (the only keyboard path, since the spectrum has none) are 223px below the fold. The six
action-bar commands (Reset · Copy · Random · Palettes · Extract · Open color input) are gone
entirely, because 720px crosses into the mobile layout that never captures the picker ref (L-2).
At 400% zoom the header alone is **1.65× the entire visible card**.

Look at `zoom-200-desktop/picker.png`: label, a void larger than the type that bounds it, the
tuple, and a spectrum cut off by the frame edge. That is the product's front door at the zoom level
WCAG 1.4.4 makes normative.

**And here is the finding that overturns a challenger.** The mechanism that rescues this exists and
works:

```
ARM A — useHeaderCondense reachability (real scroll, then settle)
  M3  390×844   overflow    0  requires >108.0   gateOpens false   condensed false
  M11 390×600   overflow   64  requires >108.0   gateOpens false   condensed false
  M10 320×568   overflow   89  requires >107.5   gateOpens false   condensed false
  M5  720×450@2 overflow  223  requires >123.3   gateOpens TRUE    condensed TRUE   header 214.67 → 102.55  (−112.12, −52%)
  M6  360×225@4 overflow  415  requires >107.8   gateOpens TRUE    condensed TRUE   header 183.52 →  86.84  (−96.68,  −53%)
```

**C-7's disposition is refuted.** The composable is not dead; it is the single working accessibility
affordance in this component, and it fires exactly where it is needed. What C-7 measured correctly
is the *phone* band: at 0–89px of overflow the threshold `expandedH*0.5 + 16` ≈ 108px is
unreachable, so real phones never contract. The defect is a **mis-calibrated threshold**, not dead
code — and the residual defect is that even at 200% the contraction arrives only *after* the user
scrolls, i.e. after they have already failed to find the controls.

**Disposition BUILD.**

---

### J3-5 · BLOCKER · the unbudgeted frame — the instrument runs at 15–17 fps under its own primary interaction
**NEW — this seat. This is the performance verdict.** **Mechanism M4.** **Status UPHELD_REPRODUCED.**

`probe-j3-motion.mjs`, 1440×900 chromium, pinned route, **four independent runs** (runs 3 and 4 are
this seat's verification pass):

| arm | frames | >16.7ms | >50ms | **p50** | p95 | worst | long tasks | Σ long-task |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| idle, ornament composited (3s) — run 1 | 81 | 80 | 11 | **33.4** | 50.4 | 58.6 | **0** | **0** |
| idle — run 4 | 62 | **62** | 32 | **57.5** | 66.9 | 107.6 | 2 | 191ms |
| spectrum pointer drag — run 1 | 99 | **98** | 59 | **58.1** | 100.0 | 158.5 | 33 | **2067ms** |
| spectrum pointer drag — run 2 | 90 | 86 | 61 | **66.6** | 109.1 | 133.2 | 53 | **3339ms** |
| spectrum pointer drag — **run 3** | 99 | **99** | 77 | **66.0** | 116.6 | 141.7 | 58 | **3616ms** |
| slider keyboard run ×20 — run 1 | 45 | 42 | 20 | **50.0** | 83.3 | 107.9 | 3 | 157ms |
| slider keyboard run ×20 — run 2 | 39 | 39 | 23 | **58.2** | 108.3 | 108.5 | 4 | 204ms |
| slider keyboard run ×20 — **run 3** | 42 | **42** | 25 | **51.1** | 83.5 | 108.4 | 8 | 437ms |
| slider keyboard run ×20 — **run 4** | 36 | **36** | 32 | **65.7** | 132.9 | 141.6 | 17 | **1013ms** |

**The drag arm has never once come in under 96% over-budget across four runs**, and my two runs are
the worst of the four. The idle arm is the volatile one (p50 33.4 → 57.5, long tasks 0 → 2 between
runs) and I therefore do **not** make it a gate arm — machine load moves it. The drag fraction does
not move: 98/99, 86/90, 99/99, and the keyboard arm 42/45, 39/39, 42/42, 36/36.

Boot cost, picker route vs a non-GL route (`probe-j3-gestalt-2.mjs` ARM C; run 1 → **my re-run**):

```
picker  /#/         LCP 452 → 576ms   longTasks [244,55,724]=1023ms → [277,61,918,75,100]=1431ms
                    canvasContexts ["webgl2","2d","2d","webgl2"]  ·  domNodes 1741  ·  canvases 2
browse  /#/browse   LCP 488 → 500ms   longTasks [268]=268ms → [266]=266ms
                    canvasContexts ["webgl2","2d","2d"]          ·  domNodes  247  ·  canvases 1

                    long-task ratio picker:browse = 3.82×  →  5.38×
```

Three findings, in order of how much they matter:

1. **The primary interaction misses its frame budget essentially always.** 98 of 99 and 86 of 90
   drag frames exceed 16.7ms; 60% exceed 50ms; median frame **58.1–66.6ms ≈ 15–17 fps**. This is
   per-frame work, not build overhead — no dev-server penalty converts 96% over-budget into
   acceptable. Dragging the flagship colour field is visibly, measurably janky.
2. **The picker route adds the second WebGL2 context and 3.8× the boot blocking.** `[webgl2, 2d,
   2d, webgl2]` vs `[webgl2, 2d, 2d]`; 1023ms vs 268ms of long tasks; TBT-equivalent
   (244−50)+(55−50)+(724−50) = **873ms** against Google's 200ms "good" threshold. This is the same
   class as tranche T's **Q14 RULED ESCALATION** (eager-WebGL-blob boot blocker, LCP 5141 / TBT
   5988 → U.W-PERF). It is still live, on the flagship.
3. **At rest the page runs a perpetual render loop.** Idle p50 **33.4ms with zero long tasks** —
   the main thread is idle and the frames are being *paced* by the ornament's own rAF.
   `VISUAL-CONSTITUTION §7` calls the Blob "a noninteractive center-ward specimen"; an inert
   specimen is running a continuous GPU loop on the product's front door. The repaired state
   witness quantifies it: `rafPer1500ms` = **360** (zoom-200) · **357** (rtl-desktop) · **364**
   (keyboard-focus) · **300** (forced-colors) — i.e. several concurrent rAF loops, not one.
   **But see the negative proof below: this is a cost defect, not an accessibility one.**

**Honesty on the numbers.** These are a dev server: unminified, HMR-live. Absolute milliseconds are
inflated. The **ratios** (3.82× long-task, 2 vs 1 webgl2 contexts, 1741 vs 247 nodes) and the
**over-budget frame fraction** are engine-honest and cannot be a build artifact. The gate I author
below is therefore defined on a production build, with the drag-frame fraction as the primary RED
arm precisely because it survives any build correction.

**Disposition BUILD.**

---

### J3-6 · MAJOR · the share identity is not the colour the instrument shows — and deleting the contenteditable does not fix it
**NEW — this seat. Corrects the cure proposed by both D-01 and C-1.** **Status UPHELD_REPRODUCED.**

From the pinned baseline, twenty `ArrowLeft` presses on the **L channel slider** — no
contenteditable touched, no pointer, pure keyboard on a producer control
(`probe-j3-motion.mjs` ARM F):

```
aria-valuetext   "Lightness 13.6%"
location.hash    #/?space=lab&color=lab(13.6%25+31.235817145191+9.621676412624+/+82.7%25)
```

Two defects in one line:

1. **Twelve decimal places in the share identity.** The readout's own least count is one decimal
   (`92.0`, `88.8`, `20.0`). The URL — the thing a user sends to a colleague, the thing the
   document title mirrors — carries `31.235817145191`. The instrument does not agree with itself
   about how precise it is.
2. **`a` and `b` moved from 88.8 and 20 without being operated.** `lab(92% 88.8 20)` is far outside
   sRGB; as L falls the gamut map moves the other channels. That is *correct* colour science and I
   do not fault it. What is faulted: it happens **silently**. A user pressing ArrowLeft on Lightness
   has no indication that two other named axes were rewritten under them.

**Why this corrects the challengers.** D-01 and C-1 both diagnose display↔URL divergence and both
prescribe "delete the writer" (the contenteditable). Measured: the divergence is **reachable with
the writer absent from the interaction entirely**. It lives in the serialiser's missing least count
and in the unannounced gamut map, not only in the fused node. W48 Work-1 as written closes one arm
and leaves this one open, and its Completion evidence would not catch it.

**Disposition BUILD** (as a clause of the one-formatter cure in J3-1, not as a separate wave).

---

### J3-7 · MAJOR · the paired clamp has three binding regimes and is correct in one
**Merges** D-05 · D-06. **Mechanism M2.** **Status UPHELD_REPRODUCED, with a regime the charge missed.**

`1/√φ = 0.7861514`. Measured `label / headline` font-size:

| matrix | label px | headline px | ratio | Δ from 1/√φ |
|---|---:|---:|---:|---:|
| 390×844 | 32.928 | 41.888 | 0.7861 | −0.0001 ✓ |
| 390×600 | 32.928 | 41.888 | 0.7861 | −0.0001 ✓ |
| 360×225@4 | 32.928 | 41.888 | 0.7861 | −0.0001 ✓ |
| 320×568 | 32.928 | 41.888 | 0.7861 | −0.0001 ✓ |
| **720×450@2** | **39.840** | 54.646 | **0.7291** | **−0.0571** |
| **1440×900** | **53.280** | 54.646 | **0.9750** | **+0.1888** |

CHALLENGE-D charged a two-point drift ("right at the phone floor, collapses at 1440"). Measured,
there is a **third regime**: at the 720 pane the label under-shoots. Two independently clamped
sources — `--type-display-2` `clamp(2.058rem, 1.5rem + 2.2vw, 3.33rem)` and the local
`max(11.65cqi, 2.618rem)` mint — with three distinct binding arms cannot hold a constant ratio, and
a gate that samples only 1440/390/320 (as W48 and jury-2's G7 do) **passes over the 720 failure**.

Family, all eight matrices: `Fraunces, "Fraunces Fallback", serif`. `VISUAL-CONSTITUTION §3.2`,
`§4` and `§7` all bind the headline arm to **Fira Code**. **D-06 UPHELD_REPRODUCED.** The near-
parity of D-05 reads as a collision rather than a contrast precisely because the two arms share a
family — the two are one design decision and must land atomically.

**Disposition FOLD into J3-3** — the chassis transposition supplies the one paired clamp; curing
the ratio without curing the chassis re-mints it locally a fourth time.

---

### J3-8 · MAJOR · the target floor is missed seven times, not four
**Merges** D-10 · C-6. **Status UPHELD_REPRODUCED and STRENGTHENED.**

Both challengers counted four. Measured inside `.pane-shell [data-slot=card]` at 1440 (and
identically in the forced-colors and reduced-motion matrices):

```
l channel      23.84 × 24.36     ← rail TAB, missed the inline floor by 0.16px
a channel      23.67 × 24.36     ← missed by 0.33px
b channel      23.64 × 24.36     ← missed by 0.36px
L channel      12.00 × 24.00     ← slider thumb
A channel      12.00 × 24.00
B channel      12.00 × 24.00
ALPHA channel  12.00 × 24.00
                                 = SEVEN sub-24px targets
```

At 390 / 320 / 360@4 / 720@2 the set is the four thumbs only. WCAG 2.2 SC 2.5.8 floors at 24×24.
The three rail tabs miss by fractions of a pixel — invisible to inspection, fatal to the gate, and
missed by both challengers *and* by jury-2's G8, which asserts only "4 × 12×24".

`PROPORTION-AUDIT §5.7` is the governing law: "Visual glyph size, operable target size and layout
reservation are separate quantities." glass-ui 7.0.0 exports `./slider` — the seat belongs in the
producer (edicts 4 and 5), not as a fifth demo override.

**Disposition BUILD.**

---

### J3-9 · MAJOR · forced-colors dissolves the readout's typographic rhythm and un-seats both plates
**Promotes CHALLENGE-D's state-table row from "absent" to measured.** **Status UPHELD_REPRODUCED.**

`probe-j3-gestalt.mjs` M7 (`forcedColors: "active"`, 1440×900):

```
                      normal                              forced-colors
figInt    rgb(28, 25, 23)                                 rgb(0, 0, 0)
figFrac   oklch(0.447121 0.00386159 34.63)                rgb(0, 0, 0)
figUnit   oklch(0.447121 0.00386159 34.63)                rgb(0, 0, 0)
figComma  oklch(0.447121 0.00386159 34.63)                rgb(0, 0, 0)

plate shadows   color(srgb 0.11 0.098 0.09 / 0.8) 8px 8px 0px 0px   →   none  (all three plates)
```

The integer / fraction / unit / comma hierarchy is the entire reason the readout reads as a
calibrated instrument rather than a string of characters. It is expressed **only** in colour, so
under forced-colors it collapses to one undifferentiated ink: `92.0%,88.8,20.0` becomes
`92.0%,88.8,20.0` with no visual grammar at all. Simultaneously every plate shadow goes to `none`,
so the protagonist and the companion become two indistinguishable outlined rectangles — J3-3's
hierarchy failure, with the last remaining differentiator removed.

`grep -rn "forced-colors" demo/picker/ demo/color-session/` → **0 hits**.

**Disposition BUILD.**

---

### J3-10 · MAJOR · the action bar is lost at mobile *and at 200% zoom*
**Merges** L-2 (product arm). **Status UPHELD_REPRODUCED, with a scope the charge missed.**

`navActions` measured, all matrices:

```
1440×900, forced-colors, reduced-motion
  … Back · Reset color · Copy color · Random color · Palettes · Extract palette · Open color input …

390×844 · 390×600 · 320×568 · 360×225@4 · 720×450@2
  Save edit · Cancel edit · Switch to slug · Generate new slug · Cancel · Select view · Toggle action bar · Menu
  (none of the six picker commands)
```

L-2 framed this as a mobile defect. Measured, the loss threshold is the desktop/mobile layout
switch, so it **also strikes the 200% zoom matrix** — which makes it an accessibility regression,
not a small-screen trade-off. It composes with J3-4 into one experience: at 200% zoom the user can
neither see the controls nor reach the commands.

**Disposition FOLD into `MT-W48-PRIME`** — the structural cure (`useActionBarContext` in
`color-session`) is jury-2's Stage B; the **parity obligation is visual and mine**, so I gate it at
three breakpoints rather than two.

---

### J3-11 · BLOCKER · under RTL the instrument reports the wrong colour and loses its thumb
**Promotes CHALLENGE-D's RTL hypothesis to a reproduced BLOCKER.** **Mechanism M2.**
**Status UPHELD_REPRODUCED.**

**Provenance, stated plainly.** When I first read `STATES.json` (15:10) both RTL rows carried
`dir: "ltr"` and a `pageError` — `states.mjs:27`'s `addInitScript` ran before `documentElement`
existed, so the RTL matrix was **void** and I had ruled it so. A sibling seat repaired the harness
at 15:19 (`states.mjs:50`, the flip is now applied post-load with an explicit comment naming the
WebKit cause) and re-captured at 15:21. **The harness defect is cured and I withdraw it as a live
finding.** I re-read the regenerated witness and the repaired frame, and what they show is far worse
than the missing witness was.

Repaired witness, route `#/`, both RTL matrices — and **no other matrix**:

```
rtl-desktop   dir "rtl"  pageErrors []   clipped ["span.spectrum-dot.absolute", "path…", "math…"]
rtl-mobile    dir "rtl"  pageErrors []   clipped ["span.spectrum-dot.absolute", "canvas.goo-blob-canvas"]
zoom-200 · reduced-motion · forced-colors · keyboard-focus   clipped[0] = "path.[object.SVGAnimatedString]"  (no spectrum-dot)
```

And the frame itself (`shots/rtl-desktop/picker.png`, re-captured 15:21). I read it. Two failures:

**1. The specimen is reported in reverse.** The headline renders

```
LTR   92.0 % ,   88.8 ,   20.0        ← lab(92% 88.8 20)
RTL   20.0 ,     88.8 ,   % 92.0      ← the same colour
```

The three channel cells are laid out in **reverse order**, and the `%` unit has detached to the
left of its own number. A reader of the RTL frame sees `L = 20.0`, `b = 92.0%`. **The flagship
readout of a colour tool states a different colour than the one it holds, in an entire writing
direction.** The cause is that the tuple is a `flex-wrap` row of atomic cells with no bidi
isolation anywhere in `ColorComponentDisplay.vue` — the inline direction reorders the flex line, and
a numeric tuple is not a phrase that may be reordered. `VISUAL-CONSTITUTION §6.1` requires LTR
isolation for exactly such values. CHALLENGE-D flagged this and honestly labelled it a hypothesis
with "Reproduction: NONE". **It reproduces.**

**2. The spectrum thumb leaves the plate.** In every LTR frame the pink `WatercolorDot` sits on the
gradient. In the RTL frame the spectrum plate is **empty** — no thumb — and the probe confirms
`span.spectrum-dot.absolute` outside the document client box on both RTL matrices and on none of the
other four. The position is physical: `useSpectrumPlateStyle.ts:60-61` sets
`left: ${100*sClamped}%` / `top: ${100*(1-vClamped)}%` on an element also carrying Tailwind's
`-translate-x-1/2`, inside a plate whose gradient (`:38`, `to right`) is likewise physical. The
picker's only spatial state indicator is unrendered under RTL.

The two compose: under RTL the instrument shows a reversed number tuple over a spectrum with no
position marker. Nothing on screen tells the truth about the current colour.

W48's Completion evidence already contains the clause this violates — *"Pointer ↔ keyboard/Home/End
↔ numeric ↔ AT reach identical color in **LTR/RTL**"*. It is now not merely un-evidenced; it is
measurably false.

**Disposition BUILD.**

---

### J3-12 · MAJOR · dark was inherited, not authored
**Merges** D-18. **Status UPHELD_REPRODUCED (vision, four frames).**

I compared `safari-desktop-light/picker.png` ↔ `safari-desktop-dark/picker.png` and
`safari-mobile-light/picker.png` ↔ `safari-mobile-dark/picker.png`.

- **The ambient field does not change.** The atmosphere gradient behind the plates is the same
  bright magenta→peach in both schemes. Only the plates invert, to a desaturated seed-tinted
  brown-maroon. `VISUAL-CONSTITUTION §2` binds dark chrome to "the restrained neutral pole"; the
  measured plate is a brown.
- **The seat disappears.** The `8px 8px 0 0` cartoon shadow is legible in light and effectively
  invisible in dark — a dark shadow, under a dark plate, on a bright ground, has nothing to
  separate. Compounds J3-9 (where the shadow goes to `none` outright).
- **The ornament becomes the brightest object in the frame.** In `safari-desktop-dark/picker.png`
  the Blob is a near-white pearlescent form at the top-right of the plate, several stops brighter
  than the specimen it sits beside. CHALLENGE-D observed this only on mobile; it is present at
  desktop too. An inert ornament out-shouting the protagonist is a hierarchy inversion, and it
  occurs only in dark — which is the signature of a scheme that was inherited rather than composed.

**Disposition BUILD.**

---

### J3-13 · MAJOR · the ornament reserves space it does not guarantee to paint
**NEW — this seat (reservation arm). Relates C-19 (cause arm).**
**Status UPHELD_REPRODUCED for the reservation; HYPOTHESIS for the GL cause.**

`seat.css:88-89` reserves, unconditionally:

```css
padding-right: calc(0.76 * var(--blob-fp) + 0.5rem);
min-height:    calc(0.76 * var(--blob-fp) - 0.75rem);
```

Measured, that reserve is 112.52px of header width at 1440 and a 73.12px minimum that **binds at
five of eight matrices** (J3-2). It is a static function of `--blob-fp` and is completely
independent of whether the ornament paints.

It does not always paint. `safari-desktop-light/picker.png` — the canonical light-desktop witness of
this audit — has **no blob**, and `REPORT.md` records that exact capture as the sole console error
in sixty: `WebGL: context lost.`, with `settleMs 18905` against a 3.4–4.2s field. I looked at the
frame: the header holds an empty rectangle where the ornament should be, with the full reservation
still in force. Every other matrix I inspected (desktop-dark, mobile ×2, forced-colors, rtl,
keyboard-focus, zoom-200) shows the blob.

**Measured antecedent for the cause, not the cause.** The picker route requests a **second** webgl2
context (`["webgl2","2d","2d","webgl2"]` vs browse's `["webgl2","2d","2d"]`), and panes are held in
`<KeepAlive :max="6">` over seven left panes. Concurrent-context pressure with LRU pane retention is
a plausible mechanism for eviction. **I do not claim the causal link — HYPOTHESIS**, and I refuse to
attribute it before the production re-capture that jury-2's G10 already orders.

What is not a hypothesis: **a layout reserve for a non-deterministic ornament is a design defect
regardless of why the ornament is missing.** The frame must be identical whether or not the GL
surface materialises.

**Disposition BUILD** (reservation); the GL-cause arm **FOLDs into J3-5**'s production re-baseline.

---

### J3-14 · MINOR · motion residue and dead reactive state
**Merges** D-14 · D-15 · C-10 · C-11 · L-8 (dead members). **Status UPHELD_REPRODUCED.**

- `paneShellTransform: "none"` in **all eight matrices** — `ColorPicker.vue:399` transitions
  `transform` on `.pane-shell`, and nothing in the tree ever sets one. Residue of a deleted margin
  morph, per the file's own comment at `:392-398`.
- `isTransitioning` — declared `ref(false)` at `:330`, published on `defineExpose` at `:333`, never
  written, never read anywhere in `demo/ src/ test/ e2e/`.
- `@update` on `ColorComponentDisplay` — declared at `:92-95`, bound live at `ColorPicker.vue:51`,
  never emitted (the component's sole `emit(` is `'input'`).

**Note for the executing session, so edict 6 is not misread.** Owner edict 6 says animations are
never deleted, only moved or tokenized. A `transition` on a property that no rule ever sets is not
an animation — deleting it removes zero motion from the product. I verified this: the computed
`transform` is `none` in every state I sampled. This is residue, and edict 2 governs it.

**Disposition FOLD into J3-1 / J3-3** cleanup.

---

### J3-15 · MINOR · an undiscoverable command with no home
**Merges** D-12 · C-5 (design arm only). **Status UPHELD_BY_BYTES.**

`ColorPicker.vue:247` `useMagicKeys()`; `:263-266` toggles the space popover on
`keys.cmd?.value && keys.k?.value`; `:377` registers it on `window`. Nothing in `demo/picker/` names
the shortcut — no tooltip, no menu item, no hint, no label. On my axis this is
`PROPORTION-AUDIT §5.6` "Subtraction precedes explanation" and the PR-07 unlabeled-control family:
**a command that cannot be discovered is not part of the interaction grammar.** The correctness arms
(held-key re-toggle, KeepAlive listener leak) are jury-1's and jury-2's and I do not re-litigate
them.

**Disposition FOLD into `MT-W48-PRIME`** — either the binding gets a visible, labelled home on the
selector trigger, or it is deleted. No third option.

---

### J3-16 · MAJOR · the stage's own indicator paints over the specimen — at every viewport
**NEW — this seat. The decisive arm of J3-2. No challenger found it.** **Mechanism M3.**
**Status UPHELD_REPRODUCED.**

J3-2 established that the gap below the specimen is 9.19px against 70.42px above it. I then asked
the question the ratio does not answer: *is 9.19px even enough for what sits there?* It is not.

`probe-j3-collision.mjs`, this seat, three matrices:

| matrix | specimen ink bottom | stage top | gap | thumb top | **overlap** |
|---|---:|---:|---:|---:|---:|
| M1 1440×900 | 378.34 | 387.53 | **9.19** | **373.15** | **5.19px over the ink** |
| M5 720×450@2 | 322.48 | 331.67 | **9.19** | **317.34** | **5.14px over the ink** |
| M3 390×844 | 361.03 | 370.94 | **9.91** | 356.65 | **4.38px over the ink** |

```
thumbPaintsOverSpecimen: true      ← all three matrices
dotOverhangAboveStage:   14.38 · 14.33 · 14.29 px   into a 9.19–9.91 px gap
dotClassList: "spectrum-dot absolute -translate-x-1/2 -translate-y-1/2 …"
```

The mechanism is arithmetic. The thumb is a ~28.7px `WatercolorDot` centred on its coordinate with
`-translate-y-1/2`; at the pinned colour `v` is near maximum, so it sits on the plate's top edge and
overhangs it by **14.3px**. The seam below the headline is **9.19px**. 14.3 > 9.19, so the ornamented
thumb is painted **on top of the number tuple** — permanently, in the default state, at the flagship
viewport.

**I read it in the frames before I measured it.** In `safari-desktop-light/picker.png` the pink dot
sits directly on the comma between `88.8` and `20.0`. In `zoom-200-desktop/picker.png` the same
collision is unmistakable at twice the scale. This is not a rare-state overlap: it is what the
product's front door looks like right now, in the committed witness of this very audit.

Why it matters more than its 5px suggests: the two objects that collide are **the instrument's only
two statements of the current colour** — the numeric specimen and the spatial indicator. When the
indicator occludes a digit of the specimen, the instrument is obscuring its own reading with its own
pointer. J3-2's asymmetry is the cause; this is the damage.

It also disposes of a tempting cheap cure: one cannot close GD-2 by *shrinking the upper gap alone*
and leaving 9.19px below, because 9.19px is already too small to seat the stage's indicator. The
lower arm must **grow**, which is only affordable once the reserve above is released. The two arms
are one decision.

**Disposition BUILD** (as an assertion of GD-2, not a separate wave).

---

## DISMISSED — with the bytes that refute them

### ✗ C-7's disposition — "`useHeaderCondense` is structurally unreachable; delete 127 LoC"
**Refuting bytes** (`probe-j3-gestalt-2.mjs` ARM A): at `720×450@2` overflow **223** > required
**123.3** → `gateOpens: true`, and after real scroll `condensed: true` with `headerH 214.67 →
102.55`. At `360×225@4` overflow **415** > required **107.8** → `condensed: true`, `headerH 183.52
→ 86.84`. The composable fires, contracts the header by 52–53%, and is the only mechanism in the
component that rescues the two zoom matrices. C-7's premise ("at every band where the picker is
usable") excluded the zoom bands, which is where the picker is least usable. **Executing this
disposition would regress WCAG 1.4.4.** The narrower defect — the ≈108px threshold is unreachable
in the 0–89px overflow band that real phones produce — I uphold inside J3-4.

### ✗ C-1's universality — "orphaned permanently … never recovers … every later patch no-ops"
**Refuting bytes** (`probe-j3-gestalt-2.mjs` ARM D, t2, after one keystroke followed by six
`ArrowLeft` on the L slider):
`cell0html = "<span class=\"fig-int\">49</span><span class=\"fig-frac\">.4</span>"`, cells
`["49.4","20.0","30.0"]`, valuetext `"Lightness 49.4%"`, title and hash both `lab(49.4% 20 30)`.
Vue re-patched the subtree and all four witnesses agree. The orphaning C-1 reproduced is real and
depends on the edit *shape* (their `Cmd+A` + retype destroys both child spans and yields `<b>45</b>`;
a caret insert mutates a text node and survives). **The mechanism is upheld in full inside J3-1;
the permanence is not reproduced and must not be written into a gate**, or the gate will be
flaky against edit shape.

### ✗ D-02 / D-19's "W48 orders the two cures in the wrong sequence"
**Refuting bytes** — `docs/tranches/V/reformation/waves/W46-W48.md`, W48 Work step 2, one sentence:
*"Delete the Blob-derived `.title-row` reservation (`seat.css:88`) **and** the two-line/bottom-align
reservation (`readoutReservation.ts`)"* — one atomic step, not two ordered ones. And §Current RED
already states *"Removing only Blob height cannot close PR-01."* The register knows the
apportionment qualitatively. **The off-by-one anchor (`:88` is `padding-right`, `:89` is
`min-height`) I uphold**; the sequencing charge is refuted by the spec's own text.

### ✗ D's evidence-gap declaration — "`REPORT.md` and `REPORT.json` … Neither exists"
**Refuting bytes**: `ls -l --time-style=full-iso docs/tranches/V/megatranche/audit/visual/` →
`REPORT.json 92366 2026-07-24 14:21:43` and `REPORT.md 8164 2026-07-24 14:21:43`; the
CHALLENGE-D report's own mtime is `14:25`. Both files were on disk four minutes before that seat
wrote its report. The consequence is not cosmetic: CHALLENGE-D declared *"Every per-route claim in
this report is therefore my own measurement, not a REPORT row"* and consequently never reconciled
against the sixty committed captures — which is how the `WebGL: context lost.` row and the
`smallTapTargets` distribution went unread on the design axis.

### ✗ L-13's harness claim — "all 60 captures rendered this component; the harness used path URLs against a hash router"
**Refuting bytes** — `REPORT.json`, `safari-desktop-dark`:

```
route          url                                       allElements  bodyText  canvas
/#/            …:9000/#/?space=lab&color=lab(9…                 1741       859       2
/#/palettes    …:9000/#/palettes                                 351       237       2
/#/browse      …:9000/#/browse                                   247       280       1
/#/extract     …:9000/#/extract                                  293       299       1
/#/mix         …:9000/#/mix                                      342       186       3
/#/generate    …:9000/#/generate                                 339       310       1
/#/gradient    …:9000/#/gradient                                 508       611       1
/#/atmosphere  …:9000/#/atmosphere                               243       299       1
```

Distinct hash URLs, distinct element counts, distinct text lengths, distinct canvas counts. Had
every capture rendered the picker these would be constant, and L-13 asserts they are
(`allElements: 1744` throughout). They are not. The committed report is route-distinct, and its
`smallTapTargets` distribution (8/8/4/6/8/5/6/7/39/4/4/4/4/4/8) is real signal, not one defect
multiplied. **L-13's discount of the tap-target finding does not stand** — and J3-8 shows the true
picker count is higher than anyone charged.

### ✗ D-04's characterisation "equal size"
Refuted as an **understatement**, not as a claim. Plates measure `512 × 684.77` (picker) and
`512 × 774` (About): the companion is **1.130× taller and holds 53.1% of plate area**. The defect
is upheld and strengthened in J3-3; only the wording is dismissed, because "equal" invites a cure
that equalises rather than one that subordinates.

---

## State coverage — closed out

CHALLENGE-D left four rows unresolved. **This seat closes all four, none of them as hypotheses.**

| state | charge | **ruling** |
|---|---|---|
| forced-colors | "absent" | **UPHELD, measured** — all four readout ink roles → `rgb(0,0,0)`; all plate shadows → `none` (J3-9) |
| 200% / 400% zoom | "unverified — hypothesis" | **UPHELD, measured, promoted to BLOCKER** — header 63.9% / 165.3% of the visible card; rail below the fold; action bar absent (J3-4) |
| RTL | "unverified — hypothesis" | **UPHELD, measured, promoted to BLOCKER** — the tuple reverses to `20.0 , 88.8 , %92.0` and the spectrum thumb is clipped out of the plate on both RTL matrices (J3-11) |
| reduced-motion | "designed — verified sound" | **CONFIRMED SOUND, and more strongly than charged** — see the negative proof below |

### Negative proof — reduced motion is fully honoured

Recorded so no later seat re-litigates it, and so J3-5's cure does not "fix" something that is
already correct. From the repaired state witness, route `#/`:

```
matrix                    animatedCount   rafPer1500ms
zoom-200-desktop                     12            360
forced-colors-desktop                13            300
rtl-desktop                          13            357
keyboard-focus-desktop               14            364
reduced-motion-desktop                3              0     ← total quiescence
```

Under `prefers-reduced-motion: reduce` the ornament's render loop **stops completely** — zero rAF
callbacks in 1.5s, and the declared animation count falls 13→3. This closes π-D8, which I had
booked as unknown. It also sharpens J3-5: the ~30fps idle loop is a **cost** defect (battery, GPU,
thermal) and not an accessibility one. The cure must reduce the loop's cost or make it demand-driven;
it must not add a PRM gate, because the PRM gate already exists and works.

---

## Is W48 still correct against today's tree?

**Directionally correct; materially incomplete; premised on three falsehoods.** Jury-2 already
corrected the three premises and superseded W48 in place as `MT-W48-PRIME`. I adopt that row
identity rather than opening a competing wave. What `MT-W48-PRIME` does **not yet** contain, and
what this seat adds as Stage D:

1. **No zoom arm is gated.** W48's Completion names "actual-400%-zoom" in one clause about the
   `I_after` inequality, but nothing gates *reflow* — whether the instrument's controls are reachable
   at all. Measured RED at both 200% and 400% (J3-4).
2. **No frame budget exists anywhere in the arc.** Median 58–67ms drag frames, 873ms TBT-equivalent,
   two webgl2 contexts, a 30fps idle loop (J3-5). Jury-2's G10 gates settle-time and GL loss, not
   frame cost.
3. **`useHeaderCondense` is ordered deleted** in Stage C. Measured, that removes the only working
   accessibility affordance in the component (my dissent).
4. **The seam is gated on one side only.** `I_after ≤ min(φG, I_before − G)` can pass with the
   specimen still crushed at 9.19px against the stage. The measured asymmetry is 7.66:1 and 8.56:1
   (J3-2).
5. **The pair gate samples 1440/390/320** and passes over the 720 regime where the ratio undershoots
   to 0.7291 (J3-7).
6. **The target-size gate asserts four thumbs**; the true count is seven, including three rail tabs
   that miss by 0.16–0.36px (J3-8).
7. **Forced-colors is ungated** (J3-9).
8. **The RTL clause is asserted but never gated**, and is now measurably false — the tuple reverses
   and the spectrum thumb leaves the plate (J3-11). W48's Completion sentence *"…reach identical
   color in LTR/RTL"* is a claim the wave makes and never tests.
9. **The share-identity least count is ungated**, and is reachable without the contenteditable the
   wave deletes (J3-6).

---

# PART II — THE RE-AUTHORED SPEC

# MT-W48-PRIME · STAGE D — THE GESTALT

**Row identity.** This is `MT-W48-PRIME`, which is W48. Stage D composes with jury-2's Stage A
(library boundary), Stage B (ownership) and Stage C (the instrument). It does not re-book anything
and it opens no new row. Stage D lands **with** Stage C in the same atomic close: the chassis
transposition and the proportion/zoom/motion obligations are one design decision expressed in one
diff, and no intermediate state is mergeable.

**Born RED.** All nine gates below fail against the tree at `c654824e`. Eight were established by
measurement this session (`probe-j3-gestalt.mjs`, `probe-j3-gestalt-2.mjs`, `probe-j3-motion.mjs`,
`STATES.json`); GD-9 is RED by construction and is the only one whose RED rests on reading a static
`calc()` rather than on a run.

**Consumes (design canon, ≤2 per L3):** `VISUAL-CONSTITUTION.md §3.2`, `PROPORTION-AUDIT.md`.

## Scope

Stage D owns the **whole as experienced**: proportion, rhythm, type pair, scheme, state matrices,
target geometry, and the frame budget. Concretely it binds Stage C's transposition to produce:

- `InstrumentChassis` at the exact golden ratio with **no filler companion** — About returns to a
  trailing route per `§3` line 58, and the stage takes the full width rather than being halved by a
  peer document (`§3` line 42: "an absent inspector leaves no filler").
- **One reserve, or none.** `--readout-lines`, `align-content: flex-end` and the static line table
  die; the `.title-row` blob minimum dies; a genuinely wrapped tuple grows *below* into feature-local
  flow, which `§3` line 92 already sanctions and which forbids the persistent reserve outright.
- **The seam is decided as one quantity on both sides**, and the lower arm is sized to seat the
  stage's indicator (≥ its overhang, measured 14.3px today) so the specimen is never occluded. The
  air released above pays for the air owed below; this is one move, not two.
- **One paired clamp** producing label = headline / √φ through floor, fluid **and every intermediate
  regime**, with Fira Code on the headline arm and Fraunces on the identity arm.
- **Contraction retained and re-calibrated** — not deleted. The sufficiency threshold moves from
  `expandedH * 0.5 + 16` to a viewport-relative predicate that opens whenever the header exceeds a
  declared share of the visible card, so it serves the phone band (64–89px overflow) as well as the
  zoom bands it already serves.
- **A declared frame budget** for the instrument, enforced on a production build.
- **Producer-side target seats** (glass-ui `Slider` + the rail tab), relayed to the glass-ui BH
  inbox per the standing fond.

## Gates — every one RED today

| # | gate | command | RED today | what turns it RED |
|---|---|---|---|---|
| **GD-1** | **zoom reflow** — at 200% and 400% the instrument's first paint contains at least one operable channel control, and the header is ≤45% of the card's visible box | `npx playwright test e2e/smoke/oracles/o35-zoom-reflow.spec.ts` | **YES** — measured 720×450@2: header **214.67** of clientH **336** = **63.9%**, rail top 355.53 vs card h 338 (below fold), overflow 223. 360×225@4: header **183.52** vs clientH **111** = **165.3%**, overflow 415 | any viewport-independent header minimum — the blob seat `calc(0.76*--blob-fp …)`, the `--readout-lines` lock, or a display-2 label floor — that does not participate in the zoom reflow. Assert **before any scroll**, on first settled paint |
| **GD-2** | **seam symmetry, and the specimen is never occluded** | `npx playwright test e2e/smoke/oracles/o36-seam-symmetry.spec.ts` then `node …/probe-j3-collision.mjs` | **YES, on both arms** — ratio arm: `gap_label→headline / gap_headline→stage` = **70.42/9.19 = 7.66** (1440), **78.71/9.19 = 8.56** (720@2), **25.75/9.91 = 2.60** (390). Occlusion arm: `thumbPaintsOverSpecimen: true` at **all three** matrices — thumb top `373.15` against specimen ink bottom `378.34` = **5.19px of overlap** at 1440 | any one-sided reserve; any stage indicator whose overhang exceeds the seam that seats it. Asserts (a) the ratio ∈ `[1/φ, φ]` = `[0.618, 1.618]` at 1440 · 720@2 · 390 · 360@4 · 320; (b) `I_after ≤ min(φG, I_before − G) ± 0.5px` with `G = --instrument-title-gap` resolving to a non-empty length; (c) **`.spectrum-dot`'s rect does not intersect the `.readout` painted ink at any channel value, including `v = 1`**. A cure that only caps the upper gap leaves (a) and (c) RED — and (c) cannot be closed by shrinking the upper gap, because 9.19px is already smaller than the thumb's 14.3px overhang |
| **GD-3** | **frame budget** — the primary interaction meets its budget on a production build | `npm run build && npx vite preview --port 9100 & node docs/tranches/V/megatranche/audit/components/picker-colorpicker/probe-j3-motion.mjs --origin http://localhost:9100` | **YES** — measured (dev, ×**4** runs): spectrum drag frames over 16.7ms = **98/99 · 86/90 · 99/99 (99% · 96% · 100%)**, p50 **58.1 / 66.6 / 66.0ms**, Σ long-task **2067 / 3339 / 3616ms**; keyboard arm **42/45 · 39/39 · 42/42 · 36/36**; boot long-task Σ **1023→1431ms** vs browse **268→266ms** (**3.82× → 5.38×**); `canvasContexts` on `/` = `["webgl2","2d","2d","webgl2"]` | any per-frame recompute on the pointer path; any second eager GL context on the LCP route. **Primary arm** (survives any build correction): drag frames over 16.7ms ≤ **20%**. **Secondary arms**, baselined on the prod build at wave open: route TBT ≤ 200ms · webgl2 contexts on `/` ≤ 1 · idle p50 frame ≥ 16.7ms only while a declared animation is running |
| **GD-4** | **forced-colors** — the readout keeps a visual grammar and the plates keep a hierarchy | `node docs/tranches/V/megatranche/audit/components/picker-colorpicker/probe-j3-gestalt.mjs` (M7 arm) | **YES** — measured M7: `figInt = figFrac = figUnit = figComma = rgb(0,0,0)`; all three plate `box-shadow` → `none`; `grep -rn forced-colors demo/picker/` = 0 | any colour-only de-emphasis of the fraction/unit/comma roles; any plate hierarchy carried solely by shadow. Asserts ≥2 distinct computed colours across the four ink roles **and** a non-colour differentiator (border/outline width) between protagonist and any peer plate |
| **GD-5** | **RTL tells the truth** — the numeric tuple keeps its channel order and the spectrum keeps its thumb | `node docs/tranches/V/megatranche/audit/visual/states.mjs && python3 -c "import json;d=json.load(open('docs/tranches/V/megatranche/audit/visual/STATES.json'));r=[x for x in d if x['matrix'].startswith('rtl') and x['route']=='#/'];assert r and all(x['dir']=='rtl' and not x['pageErrors'] for x in r),'HARNESS VOID';bad=[x['matrix'] for x in r if any('spectrum-dot' in c for c in x['clipped'])];assert not bad, 'SPECTRUM DOT CLIPPED: '+str(bad)"` then `npx playwright test e2e/smoke/oracles/o39-rtl-truth.spec.ts` | **YES** — measured on the **repaired** witness: `span.spectrum-dot.absolute` clipped on `rtl-desktop` **and** `rtl-mobile`, on no other matrix; and the frame reads `20.0 , 88.8 , %92.0` for `lab(92% 88.8 20)` — channels reversed, unit detached | any numeric tuple laid out as a bidi-reorderable flex line without isolation; any spatial indicator positioned with physical `left`/`top` inside a container whose inline axis flips. Asserts under `dir=rtl` at 1440 and 390: the `.readout-fig` cells appear in **model order** left-to-right (`L,a,b`), the unit stays bound to its number, and `.spectrum-dot`'s rect is inside the plate's rect. The harness half of this gate is now GREEN and stays in the command as a **guard**, so a future regression of `states.mjs` fails loudly instead of silently voiding the arm |
| **GD-6** | **target floor — all seven** | `npx playwright test e2e/smoke/oracles/o33-target-size.spec.ts` (Stage C's gate, with the assertion widened) | **YES** — measured at 1440: **seven** sub-24px focusables — rail tabs `l/a/b channel` at **23.84 / 23.67 / 23.64 × 24.36** plus four thumbs at **12 × 24** | growing the visible glyph instead of the seat; a demo-local override instead of the producer `Slider`; **asserting only the four thumbs** (the three tabs miss by 0.16–0.36px and pass a four-row assertion). Asserts *every* focusable inside the chassis ≥ 24×24 at 1440 · 390 · 720@2, and the painted thumb glyph still 12 ± 0.5px |
| **GD-7** | **the paired clamp holds through every regime** | `npx playwright test e2e/smoke/oracles/o32-instrument-chassis.spec.ts` (Stage C's gate, with the 720 arm added) | **YES** — measured `label/headline`: **0.9750** (1440, +0.1888) · **0.7291** (720@2, −0.0571) · 0.7861 (390/320/360@4); family `Fraunces, "Fraunces Fallback", serif` at all eight matrices | two independently clamped sources with different binding arms. Asserts `|ratio − 0.7861514| ≤ 0.002` at **five** arms — 1440 · **720@2** · 390 · 360@4 · 320 — and `.readout` computed family contains `Fira Code`. A three-arm gate (1440/390/320) passes over the 720 failure |
| **GD-8** | **the share identity has a least count** | `npx playwright test e2e/smoke/oracles/o37-share-identity.spec.ts` | **YES** — measured: 20 × `ArrowLeft` on the L slider from the pinned baseline yields `#/?space=lab&color=lab(13.6%25+31.235817145191+9.621676412624+/+82.7%25)` — **12 decimals**, with `a` and `b` moved from 88.8 / 20 unoperated | a serialiser with no declared precision; a gamut map that rewrites unoperated axes with no announcement. Asserts every channel in `location.hash` and in `document.title` carries ≤ the space's declared least count (2dp), **reached by the slider path with zero contenteditable in the tree** — so it stays RED after the J3-1 cure if the serialiser is untouched |
| **GD-9** | **the ornament reserves nothing it does not paint** | `npx playwright test e2e/smoke/oracles/o38-ornament-reserve.spec.ts` | **YES — by construction** — `seat.css:88-89` reserves `padding-right: calc(0.76*var(--blob-fp)+0.5rem)` and `min-height: calc(0.76*var(--blob-fp)−0.75rem)` as static functions of a token, independent of paint; the reserve binds at **five of eight** matrices; and `safari-desktop-light/picker.png` is a committed frame with the reserve held and **no blob** (`REPORT.md`: the sole `WebGL: context lost.` of 60, settle 18905ms) | any layout minimum derived from an ornament's nominal footprint. Asserts: with `getContext('webgl2')` forced to return `null` via `addInitScript`, the header height and the label→headline seam are within **±0.5px** of the ornament-present frame at 1440 and 390 |

**On GD-3's honesty.** The measured numbers are a dev server — unminified, HMR-live — and I say so
rather than dressing them up. The primary arm is deliberately the *fraction of drag frames over
16.7ms* (96–99% today) because no plausible build correction moves that to 20%; the TBT and
context-count arms are secondary and are to be **baselined on the production build at wave open**,
with the baseline recorded in the manifest. A gate whose RED depends on the dev penalty would be a
gate I could not defend, and I will not write one.

## π obligations — the pinned witnesses

Every visual claim above is re-capturable by a session that never read this report.

- **π-D1 — the geometry witness.** `node docs/tranches/V/megatranche/audit/components/picker-colorpicker/probe-j3-gestalt.mjs`.
  Chromium. Route `http://localhost:9000/#/?space=lab&color=lab(92%25+88.8+20+/+82.7%25)`.
  Matrices **M1** `1440×900@1` · **M3** `390×844@1` · **M5** `720×450@2` · **M6** `360×225@4` ·
  **M7** `1440×900@1 forcedColors:"active"` · **M8** `1440×900@1 reducedMotion:"reduce"` ·
  **M10** `320×568@1` · **G7** `390×600@1 scrollToEnd`.
  Selectors `.pane-container` · `.pane-shell [data-slot=card]` · `.picker-header` · `.title-row` ·
  `.space-trigger` · `.readout` · `.readout-fig` · `.fig-int` · `.fig-frac` · `.fig-unit` ·
  `.fig-comma` · `.hero-blob-anchor` · `[role=slider]` · `[role=tab]` · `nav button[aria-label]`.
- **π-D2 — the vertical-argument witness.** `probe-j3-gestalt-2.mjs` ARM B, matrices M1 · M3 · M5,
  selectors `.space-trigger` · `.readout` · `.hero-blob-anchor` · `.spectrum-picker` ·
  `.channel-slider`, all measured **relative to the card box top**. Records
  `gap_label_to_headline`, `gap_headline_to_stage`, `blobEntirelyAboveHeadline`.
  **Occlusion arm:** `node docs/tranches/V/megatranche/audit/components/picker-colorpicker/probe-j3-collision.mjs`,
  chromium, same pinned route, matrices M1 `1440×900@1` · M5 `720×450@2` · M3 `390×844@1`,
  selectors `.readout` (painted ink via `Range.getClientRects`) · `.spectrum-picker` ·
  `.spectrum-dot`. Records `readoutInkBottom`, `stageTop`, `gap_ink_to_stage`,
  `dotOverhangAboveStage`, `thumbPaintsOverSpecimen`.
- **π-D3 — the contraction witness.** `probe-j3-gestalt-2.mjs` ARM A, matrices M3 · M5 · M6 · M10 ·
  M11 `390×600`. Records `cardOverflow`, `gateRequiresOverflowGT`, `gateOpens`, and `condensed` /
  `headerH` **after a real scroll to `scrollHeight`**. This is the witness that refutes C-7 and it
  must be re-run before any session touches `useHeaderCondense`.
- **π-D4 — the motion witness.** `probe-j3-motion.mjs`, M1 `1440×900@1`. Three arms: idle 3s ·
  40-step pointer drag across `.spectrum-picker` from 15%→85% of its width with a ±28% sinusoidal
  vertical component at 16ms intervals · 20 × `ArrowLeft` on the first `[role=slider]` at 24ms
  intervals. Records frame-delta histogram (`>16.7`, `>33.4`, `>50`, p50, p95, worst), longtask
  list and sum. **Run twice; report both.**
- **π-D5 — the boot witness.** `probe-j3-gestalt-2.mjs` ARM C, M1, comparing `/#/` against
  `/#/browse`. Records `lcpMs`, `longTasks`, `canvasContexts` (via a `getContext` shim installed in
  `addInitScript`), `domNodes`, `canvases`.
- **π-D6 — the state matrices.** `node docs/tranches/V/megatranche/audit/visual/states.mjs`, WebKit,
  routes `#/` `#/gradient` `#/browse` `#/blob` `#/admin/users`, matrices `zoom-200-desktop`
  `reduced-motion-desktop` `forced-colors-desktop` `rtl-desktop` `rtl-mobile`
  `keyboard-focus-desktop`. **The RTL arms are LIVE** — re-read by this seat: `dir:"rtl"`,
  `pageErrors:[]`, `span.spectrum-dot.absolute` in `clipped` on both RTL matrices and on no other.
  The harness defect that voided this arm earlier in the session is cured; GD-5 keeps the
  `dir=='rtl'` + empty-`pageErrors` assertion as a **guard** so it cannot silently void again.
- **π-D7 — the scheme witness (vision).** `visual/shots/safari-{desktop,mobile}-{light,dark}/picker.png`
  read as images, side by side within each width. The claim under witness is the **ambient field**,
  not the plate: the gradient behind the plates must differ between schemes, and the ornament's
  luminance must not exceed the specimen's.
- **π-D8 — reduced-motion idle pacing. CLOSED, sound.** `states.mjs`'s `rafPer1500ms` probe,
  matrix `reduced-motion-desktop`, route `#/`: **0** callbacks in 1500ms against 300–364 on every
  other matrix, `animatedCount` 3 vs 13. Re-capture with the same probe; the obligation is to
  **preserve** this, not to establish it.

## DELTA obligations — the before/after pairs

Each pair is captured at the same matrix, same route, same selector, and is what proves the change.

1. **Δ-proportion.** `grid-template-columns` and both plate rects at M1.
   Before `"512px 512px"` · picker `512×684.77` · About `512×774` · identical shadows.
   After: the golden split with no filler companion, protagonist ≥ 61.8% of the stage, and the
   protagonist's area strictly greater than any peer plate on the route.
2. **Δ-seam.** π-D2 at M1 · M5 · M3.
   Before `70.42 / 9.19 = 7.66` · `78.71 / 9.19 = 8.56` · `25.75 / 9.91 = 2.60`.
   After: every ratio in `[0.618, 1.618]`, with `--instrument-title-gap` a non-empty length in all
   three (today `""` in all eight).
2b. **Δ-occlusion.** π-D2 occlusion arm (`probe-j3-collision.mjs`) at M1 · M5 · M3.
   Before: `thumbPaintsOverSpecimen: true` at all three — thumb overhang `14.38 / 14.33 / 14.29px`
   into a seam of `9.19 / 9.19 / 9.91px`, overlapping the painted specimen by `5.19 / 5.14 / 4.38px`.
   After: `false` at all three, at `v = 1` as well as at the pinned colour, with the thumb's painted
   glyph unchanged in size — the seam grows, the ornament does not shrink.
3. **Δ-reserve.** `.readout` box height − painted ink extent, and `.title-row` rendered height vs
   its `min-height`, at all eight matrices.
   Before `+55.41` at the 1440-class arms and `−5.07` at the phone-class arms; `min-height 73.12px`
   binding at five of eight.
   After: `≤ 0.5px` everywhere, and `.title-row` carries no ornament-derived minimum at all.
4. **Δ-zoom.** π-D1 M5/M6 plus a first-paint screenshot at each.
   Before: header **63.9%** / **165.3%** of the visible card; zero operable controls in frame;
   six action-bar commands absent.
   After: header ≤45%; ≥1 operable channel control in the first paint; action-bar label set
   identical at 1440 · 720@2 · 390.
5. **Δ-motion.** π-D4 on the **production** build, before and after, two runs each.
   Before (dev baseline, recorded for provenance only): drag p50 58.1 / 66.6ms, over-16.7ms 99% /
   96%, Σ long-task 2067 / 3339ms.
   After: over-16.7ms ≤ 20%, with the prod before-baseline captured at wave open in the same file.
6. **Δ-pair.** π-D1 five arms.
   Before `0.9750 · 0.7291 · 0.7861 · 0.7861 · 0.7861`, family `Fraunces` throughout.
   After: all five within `0.7861514 ± 0.002`, `.readout` family contains `Fira Code`.
7. **Δ-targets.** π-D1 `subFloorTargets` at M1 · M3 · M5.
   Before: **seven** rows at 1440 (`23.84×24.36`, `23.67×24.36`, `23.64×24.36`, and 4 × `12×24`).
   After: zero rows, with the painted thumb glyph still 12 ± 0.5px — optic and seat separated, per
   `PROPORTION-AUDIT §5.7`.
8. **Δ-forced-colors.** π-D1 M7 `ink` map and plate shadows.
   Before: four roles all `rgb(0,0,0)`; three shadows all `none`.
   After: ≥2 distinct ink colours; a non-colour differentiator between protagonist and peer.
9. **Δ-RTL.** π-D6 rtl rows plus the two RTL frames read by eye.
   Before: `clipped` contains `span.spectrum-dot.absolute` on `rtl-desktop` **and** `rtl-mobile`;
   the headline frame reads `20.0 , 88.8 , %92.0` for `lab(92% 88.8 20)`.
   After: `clipped` contains no picker element; the headline reads `92.0 % , 88.8 , 20.0` in both
   directions; the thumb rect is inside the plate rect. (The harness half is already green — keep
   the `dir=='rtl'` and empty-`pageErrors` assertion as a guard so the arm cannot silently void.)
10. **Δ-share-identity.** π-D4 ARM F `location.hash` and `document.title`.
    Before `lab(13.6% 31.235817145191 9.621676412624 / 82.7%)`.
    After: ≤2 decimals per channel, reached by the same slider-only path.
11. **Δ-ornament-reserve.** GD-9's GL-suppressed capture vs the normal capture at M1 and M3.
    Before: not capturable (the reserve is unconditional, so no comparison exists today).
    After: header height and seam within ±0.5px between the two.
12. **Δ-scheme.** π-D7 four frames.
    Before: the ambient gradient is the same bright magenta→peach in light and dark; the ornament is
    the highest-luminance object in both dark frames.
    After: the field darkens with the scheme; ornament luminance ≤ specimen luminance.

## Relay obligation

The `Slider` thumb seat and the rail-tab seat are **producer** changes (glass-ui 7.0.0 ships
`./slider`). Per the standing fond, every component/glass-ui-level change is relayed to the active
glass-ui BH inbox at root. The relay carries GD-6's seven measured rows and the optic-vs-seat
separation from `PROPORTION-AUDIT §5.7`, so the producer receives the requirement, not a patch.

---

# PART III — DISSENT

**I dissent from jury-2's `MT-W48-PRIME` Stage C on one instruction: "`useHeaderCondense` deleted."**

Jury-2 adopted CHALLENGE-C's C-7 verdict that the composable is unreachable dead code. That
verdict was measured only in the phone band. Measured in the zoom band
(`probe-j3-gestalt-2.mjs` ARM A, this session):

```
720×450@2   overflow 223 > required 123.3   → condensed TRUE   header 214.67 → 102.55   (−52%)
360×225@4   overflow 415 > required 107.8   → condensed TRUE   header 183.52 →  86.84   (−53%)
```

The composable is the only mechanism in the component that reclaims header space at the zoom levels
`VISUAL-CONSTITUTION §3.2` and W48's own Completion clause make normative. Deleting it makes GD-1
strictly harder to pass and removes a working accessibility affordance in the name of removing dead
code. **The correct action is re-calibration, not deletion**: replace the sufficiency predicate
`overflow > expandedH * 0.5 + threshold` — which is unreachable in the 0–89px overflow band that
real phones produce (390×844: 0 · 390×600: 64 · 320×568: 89, all against a ≈108px requirement) —
with a viewport-relative predicate keyed to the header's *share of the visible card*, which is the
quantity GD-1 actually gates.

I record two lesser disagreements, neither of which changes any disposition:

- **Jury-2's G7 and G8 sample too few arms.** G7 asserts the pair at 1440/390/320 and passes over
  the 720 regime where it measures 0.7291. G8 asserts four 12×24 thumbs and passes over the three
  rail tabs at 23.6–23.8px. GD-6 and GD-7 above widen both; the widening is additive and does not
  contradict jury-2's rows.
- **Both siblings frame the display↔URL divergence as a consequence of the contenteditable** and
  prescribe deleting the writer. Measured (J3-6), the divergence is reachable by the slider path
  alone. Their cure is necessary and not sufficient; GD-8 keeps the arm RED after their cure lands.

On everything else — the fused node, the ownership inversion, the library boundary, the chassis
transposition, the parse boundary, `APOTHEOSIS_REQUIRED` — **I concur with jurors 1 and 2 without
reservation.**

---

*Written by the JUROR-3 seat, model `claude-opus-5[1m]`. Every number above is a live measurement
made **and independently re-run** this session at HEAD `c654824e`, a byte quoted from the tree, or a
frame read by eye from the committed shots. **Exactly one row is a HYPOTHESIS and is labelled as
one**: the causal attribution of the `WebGL: context lost.` capture in J3-13, which I refuse to
attribute before the production re-capture. The RTL arm is **not** a hypothesis — its harness is
repaired, its witness is live, and I read the frame myself. π-D8 (reduced-motion) is CLOSED SOUND, a
negative proof, and claims nothing. No source file was edited; this formation lands no source
changes.*
