# R.W4 — SUFFUSION (cards + shell + panes · the `/easing` consume with zero names dropped · Parse-Lab fused into ColorInput · the fork-death wave)

**Name**: W4 — Suffusion (cards + shell + panes)
**Spec posture**: no single treatment governs this wave; it *suffuses* the R.W3 keystone (fonts, accent axis, depth laws, `--card-edge` mint, card-lock law) across the rest of the demo, and executes two ratified consume packets: the easing model change (`docs/tranches/R/audit/pass2/easing-disposition.md` — the binding record) and the Parse-Lab fuse (`SYNTHESIS-v2.md §2.3`). Where an item is a design beat, the N-era residual docs (`docs/tranches/N/waves/N.W14.md`, `N.W16.md`, `N.W17.md`) are the checklists — consult, don't re-derive.
**Opens after**: R.W3 (consumes its mint + laws + accent axis). Runs parallel to nothing (R.W5 KILLED at the 2026-07-03 ratification; **W4 → W7 directly**). Requires R.W1's 2.0.0 for the `/easing` consume (the `smooth-step-3` preset row — Rider 1, required — and the tightened 15 rows — Rider 2, Q12-ratified — ship there; `easing-disposition.md §2.2`).
**Discipline**: Fable design lane; glass-ui-first-class (variants/primitives live in the producer; the demo consumes); no-backwards-compat (forks die at the consume, no shims).
**Status**: DISPATCHABLE (RATIFIED-2026-07-03 — **Q10 RATIFIED**: Parse-Lab fused into ColorInput; **Q12 RATIFIED**: steps mode allowed (this wave's half; the preset-tightening half lands at R.W1)).

---

## §Charter

One wave carries the keystone's grammar to every surface the picker wave didn't touch — cards gain the depth grammar and shimmer bones, the shell's twelve transition families collapse to three with a per-view accent, the docs pages get the φ-ladder — and kills the two remaining demo forks by consuming what the producers already shipped: the EasingSelector fork dies onto `<EasingPicker>` (24/24 names preserved), the trigger-font override dies onto the producer token, and Parse-Lab lands as an enrichment of ColorInput, not a pane.

## §Goal criterion

R.W4 succeeds when the demo reads as ONE system beyond the picker: every card sits on the codified depth grammar with glassy hairlines and shimmer skeletons; every empty state invites instead of apologizing; motion speaks three families, not twelve; the gradient pane's easing area is the first-class glass-ui picker seeded from value.js's own preset table; and the input field echoes the same gamut verdict the R.W3 overlay draws. Completion is the §Hard gate; a pass with surviving fork LoC or a fourth transition family is not a pass.

---

## §Items

### Lane A — cards (N.W14 residual: producer halves landed — Skeleton `surface="glass"`, WatercolorDot ghost variant; this lane is the consume + design residue)

| # | Item | Anchors | Why |
|---|---|---|---|
| A1 | **Depth-grammar application fleet-wide**: every card onto the R.W3-codified Z-rank laws; `--card-edge` hairlines consumed (NEVER re-minted — R.W3 owns the token); one shadow voice per surface | the pane/card fleet (`demo/@/components/custom/panes/`, `PaletteCard.vue` et al.); laws at `demo/DESIGN.md` §Depth (R.W3) | the N.W14 residue: depth grammar + hairlines |
| A2 | **Shimmer skeletons**: loading bones consume glass-ui `Skeleton surface="glass"` (producer half landed) — no more too-black blocks | skeleton sites across palette/browse/extract panes | U20 (skeletons too BLACK — should be glassy) |
| A3 | **WatercolorDot ghost consume**: the dashed-outline idiom onto the shipped ghost variant; watercolor ghost refinement | ghost/dashed sites; producer variant shipped | U18 (ghost variant abstracted to glass-ui) · U22 ("not a proper watercolor ghost") |
| A4 | **Empty-state CTAs**: every empty pane state gets a designed invitation (specimen-plate register, not a grey apology) | browse/palettes/extract empty states | the N.W14 empty-state half |

### Lane B — shell + motion (N.W17 residual; the picker-adjacent beats already landed in R.W3 Lane E)

| # | Item | Anchors | Why |
|---|---|---|---|
| B1 | **12→3 transition families**: inventory every pane/card/dock transition, collapse onto three named families (enter/exit · morph · celebration), each on system tokens (`--duration-*`, `--spring-*`); standardize the pane/card nomenclature the families key on | `demo/@/styles/animations.css` + pane transition sites | U12 (transitions not smooth; nomenclature) — feeds gate clause (a) |
| B2 | **Per-view accent**: each view keys a hue off the R.W3 `--accent-live` axis so navigation reads chromatically — one resolver path, zero bespoke color math | view schema + shell styles | the N.W17 per-view half |
| B3 | **View-select moment**: the dock's view switch becomes a designed beat (scale/settle on the three-family grammar) — *within the current dock surface*: the dock-morph gate is re-anchored on the BG dock-fission surface, a BOOK, never this wave's scope | dock menu components | the N.W17 view-select half; U16's transition-family half (its dock-*sizing* half rides the U6 BOOK) |

### Lane C — docs φ-ladder

| # | Item | Anchors | Why |
|---|---|---|---|
| C1 | **φ-backed sectional rhythm on the docs pages**: definition↔content spacing, consistent sectional padding + padding around dividers, from the φ ladder | `assets/docs/` page styles + `Markdown.vue` region | U4 (no spacing between definition and content) · U5 (padding inconsistent — GOLDEN-RATIO-backed) |

### Lane D — the `/easing` consume (the ratified model change; `easing-disposition.md` is the binding record — §2.3 the consume shape, §1.4 the substitution record)

| # | Item | Anchors | Why |
|---|---|---|---|
| D1 | **`GradientInterval` evolves** `{easingName, easingFn}` → the picker payload `{css, fn}` (+ optionally `points/steps/term` for re-seeding) | `useGradientModel.ts:30-33` | the model change ratified as Disposition A — no relay ask, no hold, no interim |
| D2 | **The EasingSelector fork dies**: `GradientVisualizer.vue:217-219` swaps the fork (66 LoC + its 30-sample SVG preview) for `<EasingPicker>`/`<EasingConfigurator>` seeded `:preset="linear"`; curve math stays 100% value.js (`CSSCubicBezier`, `steppedEase`) | `GradientVisualizer.vue:217-219`; `EasingSelector.vue` (deleted) | U27 (first-class easing selector/configurator) · U25 (easing area hierarchy) |
| D3 | **`parseGradientCSS`'s linear-reset maps to the `linear` preset seed unchanged** — no persisted artifact anywhere names a transcendental easing (`easing-disposition §1.6`); the blast radius is live-editing only | `useGradientCSS.ts:206-210` | semantics preserved by construction |
| D4 | **`resolveEasing` + `GRADIENT_EASING_NAMES` become deletable — grep at consume time** (delete on zero remaining consumers) | `useGradientModel.ts:56-88` | the fork's private catalogue dies with it |
| D5 | **Zero names drop — 24/24 persist** as presets sourced from value.js's own `bezierPresets` (the picker's catalogue IS that table; `smooth-step-3` ships exact at R.W1). The numeric-substitution record (15/24 analytic → canonical bezier, sub-JND under the ratified Rider 2) is `easing-disposition.md §1.4` — cite it in the wave close, don't restate it | `src/easing.ts:334-373` (2.0.0); glass-ui `useEasingPicker.ts:117` | the "13-of-24 drop" premise is REFUTED on the record (`SYNTHESIS-v2.md §0.3`) |
| D6 | **Steps mode ALLOWED in gradient intervals — Q12 RATIFIED 2026-07-03**: banded gradients are a design tool; the coalescing serializer handles any `(t)=>number` unchanged. Pinnable via the picker's `mode` prop if taste says no | `useGradientCSS.ts:82-89`; `EasingPicker.vue:52-53` | **Q12 RATIFIED** (this wave owns the steps half; the preset-tightening half is R.W1's, same row) |
| D7 | **Book `/easing` into the GAP-3 5.0.0 subpath-rename watch** — the consume adds a 17th glass-ui specifier; it joins the by-name MIGRATION table the relay letter demands | `SYNTHESIS-v2.md §8.3` | a BOOK entry authored here, verified at the 5.0.0 adopt event |

### Lane E — extract + input (N.W16 Lane D residual + the O.W7 Parse-Lab half)

| # | Item | Anchors | Why |
|---|---|---|---|
| E1 | **T19 population/dominance surfacing**: the extract pane threads the quantizer's `population`/dominance end-to-end — dominant hero swatch (max-population from the RETURNED palette, no second worker call), population-proportional strip, the audacious stat | `panes/ExtractPane.vue`; `PaletteColorStrip.vue`; N.W16.md Lane D D3-5 | the quantizer computes a perceptual story the pane discards |
| E2 | **T20 dup-shell collapse**: `ExtractPane`↔`ImagePaletteExtractor` (~90% duplicate) → one workbench with unified capabilities; the pane becomes a thin shell | `ExtractPane.vue` / `ImagePaletteExtractor.vue`; N.W16.md D3-6 | consumption ≠ non-duplication; the god-module cap likes it too |
| E3 | **T21 EditDrawer delete**: the mounted-but-`display:none` dead UI goes | `ColorPicker.vue` (`<EditDrawer>` mount) | dead UI is a lie in the tree |
| E4 | **Parse-Lab fused into ColorInput — Q10 RATIFIED 2026-07-03**: the input gains the AST echo + the **gamut-verdict echo** — the same `deltaEOK`/`gamutMapOKLab`/`DELTA_E_OK_JND` computation the R.W3 overlay draws, so the drawn contour and the typed verdict can never disagree about "visible clipping." **Zero new library exports** (public since O.W2: `src/subpaths/color.ts:120-134`). A detached teaching pane is contrivance until arbitrary-`parseCSSValue` teaching demand is demonstrated | `ColorInput` + `useColorParsing` | **Q10 RATIFIED.** The O.W7 Parse-Lab half; KISS |

### Lane F — the glass-ui §5 self-owed retirements (the fork-death ledger this wave clears)

| # | Item | Anchors | Why |
|---|---|---|---|
| F1 | **EasingSelector fork** — dies at D2 | `EasingSelector.vue` | counted once, gated below |
| F2 | **Trigger-font override** — the `fontFamily: var(--font-display)` style override at `ColorSpaceSelector.vue:16-17` dies onto the producer's font rung (R.W3 consumed the size rung; this wave retires the override) | `ColorSpaceSelector.vue:16-17` | the last font fork |
| F3 | **Skeleton glass** — the demo's bespoke skeleton styling dies onto `surface="glass"` (with A2) | skeleton sites | producer half landed; consume completes it |

---

## §Hard gate (verbatim-faithful to `SYNTHESIS-v2.md §3 R.W4`; measurement forms attached)

- **(a)** **transition families ≤ 3** — the animation inventory on the built demo names every pane/card/dock transition and each maps to one of the three families; a fourth family is a RED.
- **(b)** **both forks deleted (EasingSelector + trigger-font override)** — deletion proof: `EasingSelector.vue` absent from the tree; no `fontFamily` style override at the `ColorSpaceSelector` trigger; grep-zero on both, backed by the running gradient pane using `<EasingPicker>`.
- **(c)** **`demo/` ≤ 400 LoC everywhere** (the god-module cap; shadcn-vue vendored tree excluded, per CLAUDE.md) — the T20 collapse and D2 fork-death land this by construction.
- **(d)** **a11y snapshot parity** — the axe/snapshot pass over the touched views shows no regression against the pre-wave baseline; the easing picker and the fused ColorInput are keyboard-reachable.

Easing-consume completion riders (inside the same gate): all 24 gradient easing names selectable in the picker on the built demo; a `steps(n)` interval renders banded and serializes round-trip; `parseGradientCSS` of a coalesced output still seeds `linear` intervals.

---

## §BOOKS touching this wave (books, NEVER gates)

| Book | Trigger | Bearing on W4 |
|---|---|---|
| **`/easing` in the GAP-3 subpath watch** (authored at D7) | the glass-ui 5.0.0 cut's by-name MIGRATION table | verify the specifier at the adopt event |
| **U6 dock-fission verify** | the BG/BH 5.0.0 dock-fission surfaces | the dock-morph gate re-anchored there; W4's B3 styles the *current* dock only |
| **U16 dock-sizing half** | same event | rides U6; the transition-family half closes here |

## §Hand-off (binding boundaries)

- **Consumes, never re-mints**: `--card-edge`, the depth laws, the card-lock law, `--accent-live` are R.W3-owned; the preset rows are R.W1-owned. Any missing producer surface is a relay-letter item (R.W7 §8), never a demo fork.
- **The easing substitution record is the packet**: `easing-disposition.md §1.4` is the per-name mapping of record; the wave close cites it (preserve-animations honored — moved, recorded, nothing silent).
- **Parse-Lab needs zero new exports** — if implementation discovers otherwise, that is a scope-reveal → triumvirate, not an inline barrel edit (R.W1 owns the export surface).
- No parallel design wave (R.W5 KILLED at the 2026-07-03 ratification — hero-lab deleted, owner order; its scope is absorbed by NO lane here).

## §Evidence packets consumed

`docs/tranches/R/audit/pass2/easing-disposition.md` (the consume packet: fact base, riders, §2.3 shape, §1.4 record) · `SYNTHESIS-v2.md §2.3` (the fuse stance) + `§8.3` (GAP-3 watch) · `docs/tranches/N/waves/N.W14.md`, `N.W16.md`, `N.W17.md` (residual checklists) · `docs/tranches/N/audit/user-audit-2026-06-12/LEDGER.md` (the U/T-row canon).

## §Fold accounting (zero-drop, `SYNTHESIS-v2.md §10` R.W4 row)

U4 (C1) · U5 (C1) · U12 (B1) · U16 (B3, transition half; sizing half → U6 BOOK) · U18 (A3) · U20 (A2/F3) · U22 (A3) · U25 (D2) · **U27-consume via `/easing`** (D1–D6: EasingPicker; 24/24 names; §1.4 substitution record; steps per Q12) · T19 (E1) · T20 (E2) · T21 (E3) · O.W7 Parse-Lab half (E4, Q10) · glass-ui §5 self-owed retirements (F1–F3). Every row exactly once.
