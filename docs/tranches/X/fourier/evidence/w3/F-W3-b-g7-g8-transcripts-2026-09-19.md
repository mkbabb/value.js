SERVED MODEL: claude-opus-5[1m]

# X.F.W3 `.b` — g7 / g8 gate transcripts (RED → GREEN), 2026-09-19

**Unit**: X.F.W3.b, the easing disposition · **Route**: ROUTE 1, the `EasingCurve` re-home
(COHESION §0x S-6a, 2026-09-19) · **Worktree**: `/Users/mkbabb/Programming/fourier-analysis/.worktrees/f3b`,
branch `x-f-w3-b`, from `21e11b0` (§5b) · **Commits**: `da417da` · `b9995b3`.

Every figure below was read from the settled bytes at this seat and **double-run**; both runs
agreed on every line. Zero-rows are dropped where a probe prints per-file counts, and the
elision is stated rather than presented as the whole return.

---

## §1 Substrate

| reading | ⟨cmd⟩ | output |
|---|---|---|
| worktree base | `git rev-parse --short HEAD` (at create) | `21e11b0` |
| worktree porcelain at open | `git status --porcelain` | **0 rows** |
| producer pin | `node -p "require('@mkbabb/glass-ui/package.json').version"` (installed) | **8.0.0** |
| the route ships | `grep -n 'EasingCurve' node_modules/@mkbabb/glass-ui/dist/easing.js` | `:809 export { xe as EasingCurve, Y as EasingPicker, we as useEasingPicker }` |
| the chassis ships | `ls node_modules/@mkbabb/glass-ui/dist/components/menu/` | `DropdownMenuRadioGroup.vue.d.ts` · `DropdownMenuRadioItem.vue.d.ts` · `DropdownMenuLabel.vue.d.ts` (+11) |
| main-checkout porcelain at close | `git status --porcelain` (fourier root) | `?? .worktrees/` — **§5b's own declared residue** (the `.gitignore` row is F.W0's; `.worktrees/` is NOT in F.W3's §1 bounds), and it is the *worktree* arm of §5b's two, not an unsettled tree |

---

## §2 g7 — EASING FORK, one renderer

The gate's probe is the **bare** token `easing-preview`, per repair round 4 / PASS-4 D-8; a check
keyed on `\.easing-preview` is a FAIL of the gate's own statement and appears below only as the
disclosed half it is.

### BEFORE (RED), double-run at `21e11b0`

```
⟨cmd⟩ /usr/bin/grep -rc 'easing-preview' src          (zero-rows dropped)
  src/components/visualization/EasingCurvePreview.vue:2
  src/components/morph/MorphPhaseConfig.vue:2
  => 4 hits across 2 files                             <- the cell's figure, reproduced exactly

⟨cmd⟩ /usr/bin/grep -rn '\.easing-preview' src        (the DISCLOSED dotted half)
  src/components/visualization/EasingCurvePreview.vue:37:.easing-preview {
  src/components/morph/MorphPhaseConfig.vue:264:.easing-preview {
  => 2 scoped selectors; the other 2 are template class attributes carrying no dot

⟨cmd⟩ /usr/bin/grep -rln 'easingCurvePath\|getEasingSVGPath' src/components
  src/components/visualization/EasingCurvePreview.vue
  src/components/morph/MorphPhaseConfig.vue
  => 2 renderers over 2 samplers
```

### AFTER (GREEN), double-run at `b9995b3`

```
⟨cmd⟩ /usr/bin/grep -rho 'easing-preview' src | wc -l       ->   0
⟨cmd⟩ /usr/bin/grep -rn '\.easing-preview' src | wc -l      ->   0
⟨cmd⟩ /usr/bin/grep -rn 'glass-ui/easing' src
  src/components/visualization/EasingPicker.vue:3:import { EasingCurve } from "@mkbabb/glass-ui/easing";
  src/components/morph/MorphPhaseConfig.vue:126:import { EasingCurve } from "@mkbabb/glass-ui/easing";
```

**VERDICT: RED → GREEN.** The gate permits either outcome — *"collapses to one home or returns 0"* —
and this is the 0 arm: the token has no home at all, because the renderer is the producer's.

### The ONE `d`-precision policy (FACET ⊕ SAMPLE ⊕ MPC-33, one decision)

```
⟨cmd⟩ /usr/bin/grep -n '^export function .*Path\|^function cachedCurvePath\|toFixed' src/lib/easings.ts
  283:export function generateCurveSVGPath(fn: EasingFn, n = 32): string {
  288:        pts.push(`${t.toFixed(3)},${(1 - v).toFixed(3)}`);
  295:function cachedCurvePath(key: string, fn: EasingFn): string {
  305:export function getEasingSVGPath(name: AnimationEasingName): string {
  310:export function easingCurvePath(name: string): string {
```

ONE sampler (`generateCurveSVGPath`), ONE quantiser (`toFixed(3)`), ONE space (the producer's
normalized 0–1 plot space, `y = 1 - v`), ONE memo (`cachedCurvePath`, keyed by catalogue + name).
Both public builders are now thin resolvers over it; the baked 40×20 box and MPC-23's 2.25×
anisotropy are deleted rather than parameterised.

### WRONGPAD / the `clipped` excursion contract — MEASURED, not assumed

⟨cmd⟩ this seat, `node --experimental-strip-types` over the real module, all 22 presets × 2001 samples:

```
EXCURSION ease-in-back      -0.096882  1.000000
EXCURSION ease-out-back      0.000000  1.086857
EXCURSION ease-in-out-back  -0.092713  1.092713
CATALOGUE min v = -0.096882   max v = 1.092713
=> y = 1 - v spans -0.092713 .. 1.096882
producer viewBox y range: -0.1 .. 1.1        (viewBox "-0.1 -0.1 1.2 1.2")
presets counted: 22
```

The catalogue's whole excursion is **contained** by the producer's constant square frame, so
`clipped` is never armed and no consumer passes a constant `false`. Confirmed at the rendered
page (§4): the `Back In-Out` option's path measures `y ∈ [-0.093, 1.092]` and its plot's
`data-clipped` attribute is `null`.

---

## §3 g8 — EASING CHIPS keyboard-reachable

### BEFORE (RED), double-run at `21e11b0`

```
⟨cmd⟩ /usr/bin/grep -rn 'data-reka-collection-item' src | wc -l                    ->  0
⟨cmd⟩ /usr/bin/grep -c 'DropdownMenuRadioItem' src/components/visualization/EasingPicker.vue
                                                                                   ->  0
```
Six bare glass `<Button>`s at `EasingPicker.vue:19–36` wearing `role="menuitemradio"` +
`:aria-checked` **by hand** — the ARIA authored correctly, the chassis absent.

### AFTER (GREEN), double-run at `b9995b3`

```
⟨cmd⟩ /usr/bin/grep -c 'DropdownMenuRadioItem' src/components/visualization/EasingPicker.vue
                                                                                   ->  3
⟨cmd⟩ /usr/bin/sed -n '/^<template>/,$p' src/components/visualization/EasingPicker.vue \
        | /usr/bin/grep -c 'menuitemradio\|aria-checked\|is-active'                 ->  0
```

The file's three surviving `menuitemradio`/`aria-checked` tokens are **docblock prose** (`:22`,
`:32`, `:33`) describing the defect; the template carries none. Disclosed rather than counted
as bindings.

---

## §4 The live witness (K-20: derived from the rendered DOM, never from challenge text)

The full-stack e2e harness (`scripts/e2e.sh`) needs a backend and MongoDB; neither `mongod` nor a
container runtime is available at this seat (⟨cmd⟩ `pgrep -x mongod` → no match; `docker ps` →
no daemon), so the visualization route that mounts `AnimationControls` cannot be reached with data.
Two **bounded** sessions (§5.2) were taken instead, both read-only and both against THIS seat's own
bytes: `vite preview` of the built tree for the morph twin, and a scratchpad-only Vite harness
mounting the real `EasingPicker.vue` inside a real `DropdownMenu`/`DropdownMenuContent` for the
picker. **No repo byte was written by either** — the harness lives entirely in the session
scratchpad and the worktree's porcelain is empty after both.

### 4a — the picker (g8's confirmatory keystroke leg)

```
menuitemradio count:                       6
…with data-reka-collection-item:           6      <- the born-RED witness read 0
…with data-slot=menu-radio-item:           6
radio group role:                          group
radio group aria-labelledby resolves to:   "Easing"
aria-checked=true count:                   1      (Sine — the store's default)
producer ItemIndicator dots rendered:      1
producer easing-curve plots:               6      (all 6 aria-hidden, 6 strokes drawn)

ACCESSIBLE NAMES — computed by the ARIA name algorithm, not textContent:
  "Linear" → 1   "Sine" → 1   "Quadratic" → 1   "Cubic" → 1   "Circular" → 1   "Exponential" → 1
  items whose accessible name contains "0" or "1" → 0
  (raw textContent DOES carry the plot's "0"/"1" axis captions; the accname does NOT,
   which is the `aria-hidden` on the plot wrapper doing exactly its job)

KEYBOARD (item read from [data-highlighted]):
  Tab            → trigger "More options" focused
  Enter          → menu opens, 6 items, "Linear" highlighted
  ArrowDown ×1   → Linear
  ArrowDown ×2   → Sine
  End            → Exponential
  Home           → Linear
  ArrowUp        → Linear      (at the first item; reka's loop is off — producer default)
  typeahead 'c'  → Cubic
  typeahead 'e'  → Exponential
  typeahead 'q'  → Quadratic
  typeahead 'l'  → Linear
  Enter on Sine  → menu closes; re-opened, aria-checked = "Sine", exactly 1 indicator dot
  page errors    → none
```

**VERDICT: RED → GREEN.** Arrows, Home/End and typeahead all reach all six, on the
`DropdownMenuRadioItem` chassis, with the producer's own indicator dot carrying selection.

### 4b — the morph twin and the accent chain (g7's render leg ⊕ the TOKEN row)

```
options:                                   22
producer easing-curve plots in options:    22   (all aria-hidden; 22 strokes drawn)
first plot box / svg box:                  20×20 / 20×20     <- square, per the frame contract
viewBox:                                   -0.1 -0.1 1.2 1.2
Back In-Out stroke d: y min/max            -0.093 / 1.092    (inside -0.1 .. 1.1)
data-clipped attribute:                    null              <- never armed
--easing-curve-accent (computed):          light-dark(oklch(53.2% .18 317.5), oklch(73.9% .134 318.1))
resolved stroke colour (light arm):        oklch(0.532 0.18 317.5)
page errors:                               none
```

**BOTH ACCENT ARMS ARE FREE AND MEASURED.** The producer sets
`--easing-curve-accent: var(--motion-accent, var(--viz-legendre))` on the plot wrapper and strokes
`currentColor`; **no in-tree rule declares `--motion-accent`**, so the chain lands on
`--viz-legendre`, which the adopted pin defines with a `light-dark()` pair (`tokens/light-dark.css`
⊕ `tokens/dark-arm.css`). The in-tree `--easing-accent: hsl(248 88% 71%)` — one arm, no `.dark`,
the 9px label under the 1.4.3 floor in BOTH schemes — is deleted with the scoped block that held it.

The token census is published **at the settled bytes, with its residue classified** rather than as
a round zero (⟨cmd⟩ at `b9995b3`, zero-rows dropped):

```
/usr/bin/grep -rn -- '--motion-accent' src
  src/components/visualization/EasingPicker.vue:52: * `<EasingCurve>` sets `--easing-curve-accent: var(--motion-accent,
/usr/bin/grep -rn -- '--easing-accent' src
  src/components/visualization/EasingPicker.vue:48: * carried them. The in-tree `--easing-accent: hsl(248 88% 71%)` had NO scheme
/usr/bin/grep -rn 'hsl(248 88% 71%)' src
  src/components/visualization/EasingPicker.vue:48: * carried them. The in-tree `--easing-accent: hsl(248 88% 71%)` had NO scheme
```

**One occurrence each, all three on docblock lines of the file that killed them** — prose naming
the dead token and the live chain, never a declaration and never a `var()` read. The BEFORE reading
was `--easing-accent` **6 occurrences in one file** (`EasingPicker.vue:33 · :44 · :49 · :85 · :86 ·
:99`, declared bare at `:49`) and the literal `hsl(248 88% 71%)` in **two** files (`EasingPicker.vue:49`
and `EasingCurvePreview.vue:12`, the `color` prop default — the carry-note's "sole in-tree consumer"
falsified at the bytes, as §C.C says it is). Every one of those eight is gone as a declaration or a
read; what a grep still returns is this file explaining why.

### 4c — two regressions this re-home would have shipped, caught by measuring

Measured BEFORE the cure, at the rendered page:

```
trigger texts:              ["01 Linear","01 Linear","01 Linear"]
typeahead 'b' → highlighted: "01 Linear"   (no movement — "Back In" unreachable by letter)
```

Cause, at the producer bytes: `<EasingCurve>` draws its `0`/`1` axis captions as **HTML spans**
inside the plot, and reka's `SelectItemText` publishes an option's **`textContent`** as the
displayed value (`SelectItemText.vue` → `onOptionAdd({ textContent })`). Embedding the plot in a
`SelectItem` therefore poisons both the trigger label and typeahead. Cured at the root in-tree —
`text-value` on the item (reka prefers the prop for typeahead: `SelectItem.js:100`
`textValue.value = ((textValue.value || node?.textContent) ?? "").trim()`) and an explicit trigger
label, because the display never consults that prop. Measured AFTER:

```
trigger texts:              ["Linear","Linear","Linear"]
typeahead 'b' → Back In     typeahead 'e' → Ease In Quad     typeahead 'l' → Linear
Enter          → selects and closes; trigger reads "Linear"
```

The **producer-side** half — captions as `aria-hidden` HTML text rather than SVG `<text>`, or a
caption opt-out — is producer information and rides the SS-6 relay through `.f`; nothing was
patched in `node_modules` and no selector was copied.

---

## §5 §7 cadence

| ⟨cmd⟩ | BEFORE (pristine `21e11b0`) | AFTER (`b9995b3`) |
|---|---|---|
| `npx vue-tsc -b --noEmit` | exit 1 — **1 diagnostic**: `ContourEditorCanvas.vue(42,9) TS6133 'dragging'` | exit 1 — **the same 1 diagnostic, and only it** |
| `npx eslint src` | exit 1 — **2 errors**, both `BasisCanvas.vue:15/:31 no-duplicate-imports` | exit 1 — **the same 2, and only them** |
| `npx vite build` | **exit 0** (cleared side of FR-NP-32) | **exit 0** |
| `npx vitest run` | — | **8 files / 57 tests, all passing** |
| `npx playwright test --project=chromium` | 30 failed · 37 passed · 7 skipped · 13 did not run | **30 failed · 37 passed · 7 skipped · 13 did not run** |
| `git diff --check` | — | clean |

**The two standing REDs are not this unit's and were not touched**: `ContourEditorCanvas.vue` and
`BasisCanvas.vue` are in NO §1 bounds row for `.b`, their bytes are byte-identical to `21e11b0`
(⟨cmd⟩ `git status --porcelain` names neither), and both readings reproduce at the pristine tree.

**The playwright reading is a DELTA, not a pass count.** The 30 failures are environmental — no
backend and no MongoDB at this seat, so every upload/extract/gallery/CRUD path times out on
`page.waitForURL` — and the honest signal is that the failure SET is identical before and after:

```
⟨cmd⟩ diff <before.fails> <after.fails>   ->  no output, exit 0   (30 rows each, byte-identical)
```

The suite was run with `VISUAL_OUT` redirected to a scratch directory, which is the durable fix
§0x note (i) names: ⟨cmd⟩ `git status --porcelain docs/tranches/J` in the worktree → **empty**, so
the 21 tracked J-tranche baseline PNGs are untouched and E-3 holds.

### Bundle reading (`vite build`, BEFORE → AFTER)

```
vendor-ui           280.49 → 282.73 kB   (+2.24)  the reka menu radio primitives
easing (glass-ui)        — →   3.51 kB   (new)    the producer's ./easing chunk, route-lazy
easings (in-tree)     3.33 →   3.27 kB   (−0.06)  the two builders collapse to one
VisualizationView.js 102.47 → 102.01 kB  (−0.46)
VisualizationView.css 25.47 →  23.54 kB  (−1.93)  the 40 scoped lines D/D-4 books
FourierMorphDemo.css  10.47 →  10.40 kB  (−0.07)
index (boot chunk)   489.13 → 489.16 kB  (+0.03)  noise — the boot path is UNMOVED (FR-AH-7 holds)
```

---

## §6 g9 / g11 operands in this unit's files — RECORDED, NEVER SWEPT

Per §5a-v2 and the wave record's cycle resolution: `.e` publishes the vocabulary, `.f` reports the
gates, `.b` records its share.

- **g11** — ⟨cmd⟩ `grep -c '<Tooltip' EasingPicker.vue MorphPhaseConfig.vue` → **0 · 0**. Nothing
  to record; `EasingCurvePreview.vue` no longer exists.
- **g9** — the baseline recorded `EasingPicker.vue` at **1 file / 3 sites** (`:26` the `:class`
  binding, `:84`/`:98` two scoped rules). **All three are gone at `b9995b3`, and NOT by a sweep**:
  the hand-rolled `.is-active` spelling is the very state the `DropdownMenuRadioItem` chassis
  exposes as `data-state="checked"` plus its own indicator dot, so re-declaring it would be the
  double-exposure the Toggle.js:68 lock convicts. No spelling was renamed anywhere, in this file or
  any other. **`.f`'s g9 operand moves, and the move is stated at the bytes rather than predicted** —
  this seat's first draft of this row published *6 files / 19 sites* and the measurement refuted it,
  so the refuted figure is recorded beside the true one rather than quietly replaced. ⟨cmd⟩ at
  `b9995b3`, double-run (`7 / 20 ≡ 7 / 20`):

  ```
  /usr/bin/grep -rc 'is-active' src | grep -v ':0$' | sort
    src/components/equation/EquationModeToggle.vue:4
    src/components/equation/FunctionInput.vue:2
    src/components/layout/AppHeader.vue:3
    src/components/paper/MobileFloatingToc.vue:3
    src/components/paper/PaperSidebar.vue:5
    src/components/visualization/EasingPicker.vue:1      <- DOCBLOCK PROSE, not a class
    src/components/visualization/gallery/GallerySearchBar.vue:2
  files 7   sites 20        (RESUME baseline: 7 files / 22 sites)
  ```

  **`EasingPicker.vue`'s single surviving occurrence is the sentence in its own docblock** naming
  the spelling that died (*"this file mints no `.is-active` spelling at all"*). It is a PROSE row,
  not a binding and not a rule, and it is left standing deliberately: rewriting a comment so a grep
  returns a rounder number is the overfit the house has already convicted once, and the SWEEP-LAW
  rider exists precisely because a bare `is-active` grep cannot tell a class from a contract from a
  sentence. `.f` classifies by position, as it must; this row tells it which of the twenty is which.
  The two class sites (`:84`/`:98`) and the one `:class` binding (`:26`) the baseline recorded are
  **gone**, and no spelling anywhere was renamed.
