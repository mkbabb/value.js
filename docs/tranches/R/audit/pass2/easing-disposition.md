# easing-disposition — the R.W4 site-4 model-change ratification packet

**AMENDED-AT-PASS-3** (2026-07-02, lane L3-doc-sweeps, discharging PASS2-VERDICT §3 M6 / CRIT-easing-disposition.md gaps 1–2): §2.2 gains the bbnf-buddy consumer-sweep paragraph named by the packet's own quoted `easing.ts:329-333` docstring but not, at pass 2, actually swept; Rider 2's "costing no extra semver event" claim gains the one-sentence 1.3.0-branch conditioning. Disposition (A, Rider 1 required, Rider 2 recommended, steps-allow) unchanged.

**Lane**: Pass-2 seed 6 (Fable design-judgment) · **Date**: 2026-07-02 · **Tree**: `tranche-q` @ `e80b359` (value.js 1.2.0), glass-ui `file:../glass-ui` @ 4.2.0
**Charter**: PASS1-VERDICT §5 row 5 + §7 seed 6 — ratify the site-4 easing model change (EasingSelector fork → glass-ui `<EasingPicker>`/`<EasingConfigurator>`) with the precise drop disposition: **(A)** accept author-a-curve with per-name nearest-bezier mappings recorded, vs **(B)** relay-ask glass-ui for a preset-seeding prop and hold the consume.

---

## §0 — Verdict in one line

**Disposition A — accept the author-a-curve upgrade — and it is STRONGER than either the charter or pass 1 believed: the "13-of-24 drop" premise is factually wrong at the name level. 23 of 24 `GRADIENT_EASING_NAMES` already exist verbatim as `EasingPicker` presets, because the picker's preset catalogue IS value.js's own `bezierPresets`; the 24th (`smooth-step-3`) is *exactly* a cubic-bezier and lands as a 1-line value.js preset row. Zero names drop. The residual is a bounded, per-name-quantified numeric substitution (15 of 24 functions swap analytic → canonical bezier), which an optional preset-table tightening drives sub-JND. No relay ask. No hold. No interim.**

---

## §1 — The corrected fact base (overturning the charter premise)

### 1.1 The preset catalogue is a name-superset claim, inverted

The charter (and pass-1 row 4, `proto-glassui-consume.md:27`) framed `EasingPicker`'s preset list as "a different, smaller set" than the gradient catalogue, making 13 names "not representable." Both halves are wrong:

- `EasingPicker`'s preset list is `PRESET_NAMES = Object.keys(bezierPresets)` — glass-ui `src/components/custom/easing/composables/useEasingPicker.ts:117`, fed to the preset `<Select>` via `presetNames` (`:83`, consumed in `EasingPicker.vue:93`).
- `bezierPresets` lives in **value.js itself** — `src/easing.ts:334-373` — and carries **23 named rows**: `linear`, `ease`×4, and the **complete sine/quad/cubic/expo/circ/back families ×3 each**. Its own docstring (`easing.ts:320-333`) declares it the one-source-of-truth bezier table for "every consumer (keyframes.js, bbnf-buddy, future editors)."
- `GRADIENT_EASING_NAMES` (`demo/@/components/custom/gradient/composables/useGradientModel.ts:57-82`) = **24** names = exactly those 23 **plus `smooth-step-3`**. The preset list is a strict subset of the gradient catalogue **missing exactly one name** — not a disjoint smaller set.

So the alleged "13-name drop" (sine/circ/expo/back ×3 + smooth-step-3) collapses: **the 12 family names persist in the picker today, by name, with canonical control points, sourced from value.js itself.** The boundary law annotated at `useEasingPicker.ts:1-15` ("the bezier preset catalogue is value.js `bezierPresets`") means the catalogue was producer-seeded *from this library* all along — the exact thing option B would relay-ask for.

### 1.2 `smooth-step-3` is EXACTLY a cubic-bezier (the 24th name costs one line)

`smoothStep3(t) = t²(3−2t)` (`src/easing.ts:128-130`) is the cubic Hermite `3t²−2t³`. A CSS cubic-bezier with x-handles at 1/3 and 2/3 has `x(t) = t` identically (the Bernstein weights telescope: `t[(1−t)+t]² = t`), so its y-polynomial is consumed directly: matching coefficients gives `y1 = 0`, `y2 = 1`, and the t³ term closes exactly (`3y1 − 3y2 + 1 = −2` ✓). Therefore:

```
smooth-step-3 ≡ cubic-bezier(1/3, 0, 2/3, 1)     — EXACT, not an approximation
```

Verified numerically: maxΔ over 2001 samples = **0.0000** (`scratchpad/easing-delta.mjs`, run 2026-07-02). The disposition therefore includes a **1-line value.js addition**: `"smooth-step-3": [1 / 3, 0, 2 / 3, 1]` in `bezierPresets` (`src/easing.ts:334`). Because glass-ui's `dist/easing.js` imports `@mkbabb/value.js` as an **external** (CRIT-proto-glassui-consume :25 — `dist/easing.js:6`), the new row flows into `Object.keys(bezierPresets)` at consumer build time with **zero glass-ui work and no republish**.

**After that row: 24 of 24 names persist. The name-drop count is 0.**

### 1.3 What actually changes: 15 functions swap analytic → bezier (quantified)

`resolveEasing` (`useGradientModel.ts:84-88`) pulls from `timingFunctions` (`src/easing.ts:427-505`), where the 24 names bind as follows:

| Group | Names | Current binding | Under the consume | Numeric change |
|---|---|---|---|---|
| Already-bezier | `linear`, `ease`×4, `back`×3 (8) | `CSSCubicBezier(bezierPresets[...])` (`easing.ts:495-501`) | same points, same solver | **identical (0)** |
| Exact-new | `smooth-step-3` (1) | analytic Hermite (`easing.ts:128-130`) | `cubic-bezier(1/3,0,2/3,1)` | **identical (0)** — §1.2 |
| Approximated | `quad`×3, `cubic`×3, `sine`×3, `circ`×3, `expo`×3 (15) | analytic Penner (`easing.ts:102-127, 226-264`) | `CSSCubicBezier(bezierPresets[...])` | **bounded, table below** |

Note `back`×3 was mis-filed by pass 1 among the 13 "non-representable": value.js has **no analytic back functions at all** — the gradient's back easings are *already* the preset beziers. 8 of 24 names are numerically untouched before any work happens.

### 1.4 Per-name deviation table (the recorded-drop artifact)

Max |analytic(t) − bezier(t)| over t ∈ [0,1], 2001 samples, Newton+bisection solver matching `solveCubicBezierX` (`easing.ts:136-162`). Two candidate control-point tables (evidence: `scratchpad/easing-delta.mjs`, `easing-delta2.mjs`):

| Name | Current table (ceaser/Penner, `easing.ts:345-367`) | Tightened table (easings.net + exact ⅓-handles) |
|---|---|---|
| `ease-out-circ` | **0.1923** | 0.0018 `(0, 0.55, 0.45, 1)` |
| `ease-in-out-circ` | **0.1634** | 0.0387 `(0.85, 0, 0.15, 1)` |
| `ease-in-out-expo` | **0.1339** | 0.0375 `(0.87, 0, 0.13, 1)` |
| `ease-in-expo` | 0.0693 | 0.0120 `(0.7, 0, 0.84, 0)` |
| `ease-in-circ` | 0.0449 | 0.0018 `(0.55, 0, 1, 0.45)` |
| `ease-in-quad` | 0.0416 | **0.0000 — EXACT** `(⅓, 0, ⅔, ⅓)` |
| `ease-out-expo` | 0.0370 | 0.0120 `(0.16, 1, 0.3, 1)` |
| `ease-in-cubic` | 0.0316 | **0.0000 — EXACT** `(⅓, 0, ⅔, 0)` |
| `ease-out-sine` | 0.0308 | 0.0076 `(0.61, 1, 0.88, 1)` |
| `ease-in-sine` | 0.0304 | 0.0076 `(0.12, 0, 0.39, 0)` |
| `ease-out-quad` | 0.0252 | **0.0000 — EXACT** `(⅓, ⅔, ⅔, 1)` |
| `ease-in-out-cubic` | 0.0247 | 0.0095 `(0.65, 0, 0.35, 1)` |
| `ease-out-cubic` | 0.0222 | **0.0000 — EXACT** `(⅓, 1, ⅔, 1)` |
| `ease-in-out-quad` | 0.0192 | 0.0053 `(0.45, 0, 0.55, 1)` |
| `ease-in-out-sine` | 0.0175 | 0.0020 `(0.37, 0, 0.63, 1)` |

(The pure in/out quad and cubic rows become exact by the same ⅓-handle telescoping as §1.2 — a quadratic/cubic polynomial IS a cubic bezier. Only piecewise in-out variants and transcendentals are approximations.)

### 1.5 Perceptual bound

An easing deviation ε shifts the color-mix parameter by ε, so the worst-case color error on an interval is ε × ΔE_ok(stop pair). For the demo's default stops `oklch(0.75 0.15 145)` → `oklch(0.65 0.18 265)` (`useGradientModel.ts:99-100`), ΔE_ok = 0.3032:

- **Current table**: worst 0.1923 → **0.058 ΔE_ok ≈ 2.9× JND** (`DELTA_E_OK_JND = 0.02`, `src/units/color/gamut.ts:55`) — visible side-by-side on circ/expo intervals.
- **Tightened table**: worst 0.0387 → **0.0117 ΔE_ok ≈ 0.59× JND** — imperceptible on the default gradient.

Honest scaling note: ΔE scales with stop distance. At the maximal separation (black→white, ΔE_ok ≈ 1.0) the tightened worst-case is ≈ 2× JND on `in-out-circ/expo` mid-curve — a slight ramp-shape shift, character preserved; the current table would show ≈ 10× JND there. The tightening is what makes the migration honestly "no visual regression" rather than "regression we recorded."

### 1.6 The stakes are UI-session-only (no persisted artifact re-interprets)

Easing names never survive serialization in either direction:

- `serializeGradient`/`serializeCoalescedGradient` (`useGradientCSS.ts:28-93`) emit only color stops — coalesced output **bakes** the eased sub-stops (`:82-89`); no name is written.
- `parseGradientCSS` **resets every interval to `linear`** (`useGradientCSS.ts:206-210`); `applyCSS` (`useGradientModel.ts:176-186`) inherits that.

So there is no stored gradient, URL, palette, or CSS artifact anywhere that names a transcendental easing and would be silently re-interpreted. The catalogue is a live-editing affordance. This alone caps the blast radius of the model change at "what the user sees while dragging," which §1.5 bounds below JND.

---

## §2 — The disposition argument

### 2.1 Option B (relay-ask a preset-seeding prop + hold) — REJECTED

1. **It asks for what already exists.** The picker's preset catalogue is *producer-seeded from value.js* by the boundary law (`useEasingPicker.ts:9-15`). The correct seeding channel for a value.js-owned name is a `bezierPresets` row — a value.js change, in a value.js tranche, flowing through an externalized import with no glass-ui touch (§1.2). A glass-ui prop would be a second, worse channel to the same place.
2. **An arbitrary-`fn` preset breaks the picker's contract.** `EasingPickerValue.css` is "the complete **re-parseable** CSS literal" (`useEasingPicker.ts:52-64`), enforced by the `reparseOk` round-trip proof (`:182-186`). A transcendental `fn` has **no CSS literal** — seeding one would force a third "opaque function" mode whose readout lies or vanishes, and whose curve the draggable handles cannot represent. That is contrivance in the published primitive to preserve a demo fork's menu — inverted priorities under glass-ui-first-class + KISS.
3. **Holding the consume manufactures the interim.** The fork (`EasingSelector.vue`, 66 LoC + its `GradientVisualizer.vue:217-219` wiring) stays alive pending a producer ship — precisely the N.W13 "interim that dies at W18" pattern pass 1 refuted at 90% convergence (PASS1-VERDICT §2.7, §3). The zero-interims thesis binds.
4. **Even the strongest pro-B precept is better satisfied by A.** Preserve-animations ("never silently dropped, only moved or tokenized") — under A the easings are *moved*: every name persists in the picker, every function either stays identical (9/24) or moves to its canonical bezier twin with the delta recorded in §1.4 (15/24), and the analytic originals remain untouched library surface (`src/easing.ts` — nothing is deleted from value.js). Nothing is silent; this packet is the record.

### 2.2 Option A (accept author-a-curve) — ACCEPTED, with two riders

The model upgrade is real and desirable on its own terms: a fixed 24-item name menu becomes name-presets **plus** draggable control points, a re-parseable `cubic-bezier(…)`/`steps(…)` readout, overshoot handling, and a travel-dot preview — strictly more expressive for gradient interval design, with the curve math still 100% value.js (`CSSCubicBezier`, `steppedEase` — `useEasingPicker.ts:162-168`).

**Rider 1 (required, R.W1): the `smooth-step-3` preset row.** `"smooth-step-3": [1 / 3, 0, 2 / 3, 1]` in `bezierPresets` (`src/easing.ts:334-373`). Exact (§1.2); completes name-preservation at 24/24; one line; flows to the picker with no glass-ui change.

**Rider 2 (recommended, R.W1): tighten the 15 approximated rows** to the §1.4 right-hand table (easings.net constants + the 4 exact ⅓-handle identities). Rationale: (i) it converts the migration's worst case from 2.9× JND to sub-JND on the default gradient (§1.5); (ii) `bezierPresets`' charter is to be the one-source-of-truth answer to "what are this name's control points" (`easing.ts:329-333`) — the table should carry the *best* canonical approximations, and four of the current rows are approximations of curves that are exactly representable; (iii) blast radius is one const table — in-tree consumers are the glass-ui easing subpath (`useEasingPicker.ts:22`, `subpaths/easing.ts`) and value.js's own `timingFunctions`, which reads only the `ease`×4 + `back`×3 rows (`easing.ts:495-501`) that do **not** change. keyframes.js does not import `bezierPresets` (grepped 2026-07-02: no hits under `keyframes.js/src`). It is a behavior-visible change to a published export → it rides the same **2.0.0 cut** the tranche already contemplates for the KF-1 rename (PASS1-VERDICT §5 row 1, §7 seed 3) **if that ratifies at 2.0.0**; if the KF-1 rename ratifies at 1.3.0 instead, Rider 2 (itself a behavior-visible change to published preset values) either defers to the eventual major or is itself major-forcing — the "no extra semver event" claim is conditioned on the 2.0.0 branch of that still-open ratification, not settled independent of it (CRIT-easing-disposition.md gap 2). Disposition A stands even if this rider is declined — the §1.4 left column is then the recorded drop.

**[pass-3] The bbnf-buddy consumer sweep (CRIT-easing-disposition.md gap 1).** `easing.ts:329-333`'s own docstring names bbnf-buddy as a `bezierPresets`/`timingFunctionDescriptions` consumer; §2.2 as written at pass 2 quoted that docstring but swept only keyframes.js. Verified this pass against the live `bbnf-buddy` tree: `bbnf-buddy/src/animation/easingGroups.ts:11` imports `bezierPresets` and `timingFunctionDescriptions` from `@mkbabb/value.js`; the only read is name-membership, `isBezier: name in bezierPresets` (`:32`) — it never dereferences a preset's control-point values, so **Rider 2's table-value changes cannot affect it**. Rider 1 (`smooth-step-3`'s new row) flips that name's `isBezier` from `false` to `true` on upgrade — the *correct* classification (the curve is exactly a cubic-bezier, §1.2), not a behavior regression. bbnf-buddy's dependency is pinned at registry `"@mkbabb/value.js": "^0.10.0"` (`bbnf-buddy/package.json:25`), semver-fenced from consuming either Rider until bbnf-buddy's own `package.json` bumps past `^1.x`/`^2.x` — so neither rider requires any bbnf-buddy-side action at R.W1. Outcome: benign, both riders; no relay ask; no consumer-side coordination needed.

**Steps mode (taste call, R.W4):** `GRADIENT_EASING_NAMES` deliberately excluded stepped easings ("no stepped," `useGradientModel.ts:56`); the picker adds them. In a gradient, `steps(n)` produces crisp color bands — a legitimate design tool, not an error state, and the coalescing serializer (`useGradientCSS.ts:82-89`) handles any `(t)=>number` unchanged. Recommend **allow both modes** (the default); if the pane wants bezier-only, the picker's `mode` prop pins it (`EasingPicker.vue:52-53`) — either way zero producer work.

### 2.3 The consume shape (R.W4 implementation sketch, non-binding)

`GradientInterval` (`useGradientModel.ts:30-33`) evolves `{easingName, easingFn}` → carry the picker payload: `{css, fn}` (+ optionally `points/steps/term` for re-seeding). `GradientVisualizer.vue:217-219` swaps `<EasingSelector :model-value="pair.easingName">` for a per-interval `<EasingPicker>` (or the `<EasingConfigurator>` register — pass 1 identified it as the intended GradientPane shape, `EasingConfigurator.vue:5-6`), seeded via `:preset` (default `"linear"` — the current interval default, `useGradientModel.ts:103`). `parseGradientCSS`'s linear-reset (`useGradientCSS.ts:206-210`) maps to the `linear` preset seed — unchanged semantics. The fork's 66-line SFC + its 30-sample SVG preview die; the picker's plot chassis replaces them. `resolveEasing` + `GRADIENT_EASING_NAMES` (`useGradientModel.ts:56-88`) become deletable once no other consumer names them (grep at consume time).

Sequencing: **R.W1** lands the preset row(s) in `src/easing.ts` (library wave, 2.0.0 cut) → **R.W4** consumes (per SYNTHESIS §9's W3/W4 split; the pass-1 title over-claimed W3, mustFix #20). Book `/easing` into the GAP-3 5.0.0 subpath-rename watch (CRIT #5).

---

## §3 — Pass-1 precision corrections (discharging PASS1-VERDICT §5 rows 5, 13, 15, 16)

1. **Count = 24** (row 13): `GRADIENT_EASING_NAMES`, `useGradientModel.ts:57-82` — 24 entries, re-verified this pass. Pass-1's "23" is wrong.
2. **The drop enumeration** (row 5): the verdict's own "13 of 24 named easings drop (incl. `smooth-step-3`)" framing is **superseded by §1 of this packet** — 12 of those 13 names already persist as `bezierPresets` picker presets; the 13th is exactly representable and lands as a preset row; the true recorded change is *0 names dropped, 15 of 24 functions numerically substituted* with the §1.4 table as the per-name mapping record. `back`×3 was additionally mis-filed: it was never analytic in value.js (`easing.ts:499-501`).
3. **`ColorSpaceSelector.vue` cites** (row 15), against today's tree: `variant="ghost"` sits at **:15** (not :17 as pass 1 wrote, nor :18-19 as the critic wrote — both drifted); it is **already present**, so pass-1's "add `variant="ghost"`" is a no-op restatement. The font override is **:16-17** (`:style` `fontFamily: var(--font-display)` at :16; `text-title sm:text-display` in the class at :17). Net-new producer consume at that site = the `size="display"`/`"audacious"` rung only.
4. **Model notation** (row 16): `EasingPicker.vue:80` is `const model = defineModel<EasingPickerValue>()` — the **default `v-model`, typed `EasingPickerValue`**. Not a named model `v-model:EasingPickerValue` (no such API).

---

## §4 — Ratification asks (the decision list)

| # | Ask | Recommendation | Cost |
|---|---|---|---|
| R-1 | Disposition: **A** (author-a-curve consume) — no relay ask, no hold, no interim | **RATIFY** | — |
| R-2 | `bezierPresets["smooth-step-3"] = [⅓, 0, ⅔, 1]` (exact) — R.W1 | **RATIFY** (required for 24/24 name preservation) | 1 line, `src/easing.ts` |
| R-3 | Tighten the 15 approximated preset rows (§1.4 right column) — R.W1, riding the 2.0.0 cut **(conditioned: if the KF-1 rename instead ratifies at 1.3.0, R-3 either defers to the eventual major or is itself major-forcing — see §2.2 [pass-3])** | **RATIFY** (makes the migration sub-JND; declining leaves a recorded 2.9×-JND worst case) | 1 const table; no in-tree consumer reads the changed rows; bbnf-buddy unaffected regardless (§2.2 [pass-3] sweep — name-membership only, semver-fenced at `^0.10.0`) |
| R-4 | Steps mode in gradient intervals: allow (banded gradients) vs pin `mode="bezier"` | **allow** (net-new capability, zero cost; pinnable via the existing prop if taste says no) | — |

**Evidence artifacts**: `scratchpad/easing-delta.mjs` + `easing-delta2.mjs` (delta computations, reproducible); this packet.
