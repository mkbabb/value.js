claude-opus-5[1m] (served model id)

# CHALLENGE — `SliderControl.vue` · axis **L (LIBRARY)**

**Subject.** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/ui/SliderControl.vue`
(150 lines; census row `formation/fourier/lane-frontend.md:181` — *"Labeled slider chassis — **thin
wrapper over glass-ui `Slider`**"*).

**Law observed.** `fourier-analysis` read-only; `glass-ui` read-only; the only write in this lane is
this file. No browser tooling — every claim below is static or source-derived; the two claims whose
*pixel/keystroke* manifestation cannot be settled from source are tagged
**UNPROVEN-NEEDS-LIVE (SS-13)** and their *code-level* half is proven separately.

**Posture.** Assumed DEFECTIVE until the tree proved otherwise. Sixteen defects survived their
falsifiers (2 BLOCKER · 6 MAJOR · 6 MINOR · 2 INFO); **two** candidate claims did **not** survive and
are recorded as rejected, uncounted, in §5; five superlatives survived (L-18 runs both ways) in §4.

**Read whole.** Component (150 lines) + every import: `vue` (`computed`),
`@mkbabb/glass-ui/slider` → `dist/slider.d.ts` → `dist/components/ui/slider/{index,Slider.vue}.d.ts`
→ the shipped bundle `dist/slider-DQ95MET2.js` (4 656 B, read entire) → its imports
`cn-DJXf4yaB.js`, `useTouchGate-28Tk2-t2.js`, `dockContext-Bu1Avy-a.js`, and `reka-ui`'s
`dist/Slider/SliderRoot.js`. Installed producer version **4.0.0**
(`web/node_modules/@mkbabb/glass-ui/package.json:"version": "4.0.0"`), declared `^4.0.0`
(`web/package.json:14`). All eight consumer callsites read whole.

**Callsite census** (`grep -rn "<SliderControl" web/src` → 9 hits, 1 of which is the doc comment at
`SliderControl.vue:13`; **8 real callsites**):

| file | lines | control |
|---|---|---|
| `visualization/ContourSettings.vue` | 230, 243, 269, 282, 295 | ML Threshold · Blur Sigma · Min Area % · Max Contours · Smoothing |
| `visualization/EquationPanel.vue` | 97 | Terms |
| `equation/FunctionInput.vue` | 179, 213 | Harmonics · Display terms |

---

## §1 — BLOCKERS

### L-1 · BLOCKER · The entire `.slider-track-host` retint is dead CSS; the **required** `color` prop is provably inert

**Claim.** `SliderControl.vue:143-149` sets five custom properties — `--slider-scrub-track-height`,
`--slider-scrub-range-bg`, `--slider-scrub-range-bg-hover`, `--slider-scrub-thumb-bg`,
`--slider-scrub-thumb-bg-hover`. **None of these tokens is read by any shipped byte of glass-ui
4.0.0.** The component's `color: string` prop (`:32`, non-optional) therefore has zero visual effect
at all eight callsites; every SliderControl in the app paints the producer default `--primary`.

**Provenance.**
- Declaration site: `SliderControl.vue:143-149`; feeder `:89` `:style="{ '--track-color': color }"`.
- Producer token surface (whole `dist/`, including `glass-ui.css`):
  `grep -rho -- "--slider-[a-z-]*" web/node_modules/@mkbabb/glass-ui/dist | sort -u` →
  `--slider-range-bg · --slider-range-blur · --slider-range-shadow · --slider-thumb-bg ·
  --slider-thumb-border-color · --slider-thumb-shadow · --slider-thumb-size · --slider-thumb-spring ·
  --slider-track-bg · --slider-track-height`. **`--slider-scrub-*` returns zero hits.**
- What the producer *actually* reads, verbatim from `dist/glass-ui.css`:
  `.slider-range[data-v-534634a7]{…background:color-mix(in oklab, var(--slider-range-bg,var(--primary)) 88%, transparent)…}`
  — i.e. the fallback `--primary` is what renders.
- Upstream retirement is datable: `glass-ui` `git log -S "slider-scrub-range-bg" -- src` →
  introduced `df0e7e7e` (2026-05-16, "GlassScrubber … slotted-chassis"), **removed `99a11083`
  (2026-06-06, "W11 slider-unification")**. fourier's wrapper was written against the pre-`99a11083`
  token surface and never re-pointed. This is consistent with the version-drift row
  `lane-frontend.md:57` (`glass-ui` HEAD `^3.1.0` / WT `^4.0.0` / installed 4.0.0 / producer 7.0.0 —
  **3 majors**).
- Blast radius (same dead idiom, verbatim, outside the subject): `BasisSelector.vue:319-322`,
  `EditorControlsDock.vue:225-228`, `HarmonicLevelGrid.vue:210-213`, `MorphPhaseConfig.vue:207-210`,
  `GlassTimeline.vue:125`, `ConvergenceTimeline.vue:136` — **7 files, ~24 dead declarations.**

**Falsifier (run, survived).** *"Some other stylesheet or a producer fallback chain aliases
`--slider-scrub-*` to a live token."* — Grepped the **entire** producer `dist/` (JS + the single
`glass-ui.css`) and the **entire** `web/src/`: the only occurrences of `slider-scrub` anywhere are
the seven fourier consumer declarations. No alias, no `@property`, no fallback chain. Second
falsifier: *"the wrapper's class never lands on the producer root, so this is moot anyway."* —
Refuted: `dist/slider-DQ95MET2.js` merges `C.class` into the SliderRoot class via `h(e)(h(E)({…}), C.class)`,
and scoped-CSS child-root attribution applies `data-v-*` to that same element. The class *does*
land; the tokens are simply unread. **The defect is the token names, not the plumbing.**

**Consequence, specific.** `ContourSettings` passes `VIZ_COLORS.amber` (= `#b37a2d`,
`lib/colors.ts:81` — the WCAG-darkened amber the census books as a held upstream carry,
`CENSUS-2026-08-03.md §3a [FE §3, §8]`) to all five of its sliders; `FunctionInput`/`EquationPanel`
pass `"var(--viz-fourier)"`. The whole semantic colour-coding scheme (amber = contour extraction,
fourier-red = harmonic terms) is discarded at the CSS boundary. A design carry the constellation is
actively relaying to the glass BH inbox is being *dropped on the floor by the consumer* before it
can matter.

---

### L-2 · BLOCKER · Invalid or transient numeric input silently **rewrites the model to `min`** — value destruction on a live viz parameter

**Claim.** `onInput` (`:44-49`) parses the raw DOM value with `parseFloat` and hands the result to
`clamp` (`:40-42`), whose `Number.isFinite(v) ? … : lo` branch maps **NaN → `props.min`**. Every
non-parsing intermediate state of the field therefore *commits* `min` to the model instead of being
ignored. Clearing the field, typing a leading `-`, typing `.`, or typing `1e` all destroy the user's
current setting.

**Provenance.** `:41` (`: lo`), `:47` (`parseFloat(...)` unguarded), `:78` (`@input`, i.e. per
keystroke, not `@change`). Reachability at every callsite: `ContourSettings.vue:233,246,272,285,298`
(`:min` = 0.1, 0, 0, 0, 0), `EquationPanel.vue:100` (`:min="2"`), `FunctionInput.vue:184,217`
(`:min="1"`, `:min="2"`).

**The mechanism is worse under `type="number"`, which is the mode 7 of 8 callsites sit in.** Per
HTML's value-sanitization algorithm for `input[type=number]`, the `value` IDL attribute returns the
**empty string** whenever the field content is not a valid floating-point number. So a mid-typing
`-` or `1e` yields `e.target.value === ""` → `parseFloat("") === NaN` → `clamp` → `min` → the model
changes → `displayValue` changes → Vue patches `:value` back into the field the user is typing in.

**Falsifier (run, survived).** *"This is the house posture for numeric entry in this tree, so it is a
convention, not a defect."* — **Refuted by the tree itself, three times over.** The same repo
contains three sibling implementations of the identical idiom and none of them coerces invalid input
to `min`:
- `FunctionInput.vue:44-60` — `parseDomainValue` (`:44-56`) returns `null` on unparseable input and
  `onDomainInput` (`:57-60`) does `if (val !== null) setter(val)` (`:59`): **invalid input is ignored**. This is the
  correct posture, written by the same author, in a file that *also* consumes SliderControl.
- `HarmonicLevelGrid.vue:9-16, 32-38, 109-117` — `@change` (commit on blur/Enter, not per keystroke),
  so transient states never reach the model at all.
- `MorphPhaseConfig.vue:11-18` — `@change`, same.

Second falsifier: *"`parseFloat` tolerates trailing garbage, so partial input still parses."* — True
for `type="text"` mode only, and that mode has its own failure (L-3). Under `type="number"` the
browser has already blanked the value before `parseFloat` sees it, so tolerance is irrelevant.

**Live-manifestation caveat.** The exact caret/selection behaviour after Vue re-patches `:value`
mid-typing is **UNPROVEN-NEEDS-LIVE (SS-13)**. The code-level defect — *NaN is committed as `min`
rather than rejected* — is proven from `:41` alone and needs no browser.

---

## §2 — MAJOR

### L-3 · MAJOR · An unchanged emit produces no re-render, so the input keeps displaying a value the model does not hold — permanently

**Claim.** When `onInput` clamps to a value **equal to the current `modelValue`**, `props.modelValue`
does not change → `displayValue` (`:58-60`) does not re-evaluate → Vue never patches `:value`
(`:74`) → the DOM retains the garbage the user typed. There is no `@change`/`@blur` reconciliation
handler anywhere in the component. The field then lies indefinitely, across unrelated interactions,
until some *other* state change happens to move `modelValue`.

**Provenance.** `:44-49` (emit path), `:58-60` (computed display), `:74` (one-way bind), and the
absence of any blur/change listener in `:71-79`. Vue's patch loop only invokes `patchProp` when the
vnode prop's value differs between renders — an identical `displayValue` produces no DOM write.

**Concrete instance.** `ContourSettings.vue:282-290`, "Max Contours", `:min="0"`,
`:format-value="(v) => v === 0 ? 'All' : String(v)"`. At `v === 0` the field is `type="text"`
showing `All`. Append `5` → `parseFloat("All5")` → `NaN` → `clamp` → `0` → emit `0` → **already 0** →
no render → the field now reads `All5` while the model reads `0` and the extractor keeps running with
`max_contours: null` (`ContourSettings.vue:87, 118`). Same shape at `Blur Sigma` (`:min="0"`, default
value `0` reachable): type `abc`, field shows `abc`, model is `0`, forever.

**Falsifier (run, survived).** *"Vue's `v-model`-style value patching force-syncs the DOM on every
render regardless of change."* — Refuted: `:value` here is a plain one-way `:bind`, not `v-model`
(which would install a `vModelText` directive with its own `el.value` reconciliation on `update`).
The component deliberately avoids `v-model` on the input because it needs the format hook — and
thereby loses the only mechanism that would have papered over this.

---

### L-4 · MAJOR · The **formatted** string is used as the **editable buffer**, so a non-injective `formatValue` silently quantizes the model

**Claim.** `:74` binds `displayValue` (the *formatted* text) as the input's value, and `:47` parses
`e.target.value` (that same formatted text, plus the user's edit) back into the model. The chassis
therefore requires `formatValue` to be injective and round-trip-lossless. **Not one of the five
supplied formatters is.**

**Provenance.**
- `ContourSettings.vue:237,250,276,302` → `v.toFixed(2)` / `v.toFixed(1)` / `v.toFixed(1)` /
  `v.toFixed(2)`; `:289` → `v === 0 ? 'All' : String(v)`.
- Stored defaults that the formatters cannot represent: `lib/defaults.ts:11`
  `min_contour_area: 0.001`, seeded into the ref at `ContourSettings.vue:35` and rendered by
  `v.toFixed(1)` as **`"0.0"`**.
- Round trip: the user touches the "Min Area %" field at all (a keystroke and a backspace suffice) →
  `parseFloat("0.0")` → `0` → emit → `min_contour_area` goes `0.001 → 0`, a 1000× change to a contour
  parameter, with **no visible change on screen** (`"0.0"` before, `"0.0"` after) and no way to
  restore the default through this control.

**Falsifier (run, survived).** *"The slider path re-normalises the value, so the quantization is
transient."* — Refuted: the slider path (`:53-56`) writes through the same scalar emit and never
consults `formatValue`; nothing in the component ever re-derives the model from the display. Second
falsifier: *"`toFixed` is lossless for values on the declared `step` grid."* — True, and irrelevant:
`0.001` is not on the `:step="0.5"` grid (`ContourSettings.vue:274`) yet is the shipped default, so
the lossy case is the **initial** case, not an edge case.

---

### L-5 · MAJOR · `clamp` is applied on the write path only — an out-of-range `modelValue` renders and never self-corrects, and a reachable state degenerates the slider to `min === max`

**Claim.** `props.modelValue` is passed straight through to both the display (`:59`) and the reka
model (`:54` `get: () => [props.modelValue]`) with no clamping. `clamp` guards only the two write
paths (`:47`, `:55`). The component is therefore asymmetric: it refuses to *emit* out-of-range values
but happily *renders* them, and has no correcting `watch`.

**Provenance + reachability.** `FunctionInput.vue:213-220`, the "Display terms" slider:

```
:model-value="Math.min(budget, vizHarmonics ?? nHarmonics)"
:min="2" :max="Math.max(2, vizHarmonics ?? nHarmonics)" :step="1"
```

`vizHarmonics` is `EquationView.vue:54` = `autoHarmonics ? Math.min(effectiveN, nHarmonics) : nHarmonics`,
and `nHarmonics` is driven by the sibling SliderControl at `FunctionInput.vue:179-187` whose **`:min` is `1`**
(`:184`). Set Harmonics to 1 → `vizHarmonics === 1` → `max = Math.max(2, 1) = 2`,
`modelValue = Math.min(budget, 1) = 1`. Result: **`modelValue (1) < min (2)`**, and **`min === max === 2`**.
The number input renders `value="1" min="2"` (`:constraint-invalid`), and reka receives a degenerate
range whose percentage projection divides by `max - min === 0`. `EquationView.vue:151-159` clamps
`budget` to `Math.max(2, v)` but the callsite re-applies `Math.min(…, vizHarmonics)` *after* that, so
the guard does not reach the prop.

**Falsifier (run, survived).** *"Harmonics can't actually reach 1 — the API floor is higher."* —
Refuted at the source: the control's own `:min="1"` (`FunctionInput.vue:184`) and the chassis's own
`clamp(…, props.min, …)` make `1` the emitted floor; `EquationView.vue:28` seeds `nHarmonics` from a
`sessionStorage` cache (`useEquationCache.ts:32-34`) with no floor re-validation, so `1` also
survives reload. Second falsifier: *"a wrapper should trust its props."* — Rejected on this axis: the
component already declares itself the clamping authority for the write path (`:40-42`); enforcing an
invariant in one direction only is precisely the contract defect.

---

### L-6 · MAJOR · The producer's `valueCommit` channel is discarded, so the chassis has no commit semantics — and the uncoalesced stream reaches synchronous `sessionStorage` on the viz path

**Claim.** glass-ui's `Slider` declares **two** emits —
`"update:modelValue": (payload: number[] | undefined) => any` **and**
`valueCommit: (payload: number[]) => any`
(`dist/components/ui/slider/Slider.vue.d.ts:19-20`; runtime `emits: ["update:modelValue","valueCommit"]`
in `dist/slider-DQ95MET2.js`; reka raises it at `dist/Slider/SliderRoot.js:118,128`). SliderControl
declares exactly one emit (`:36-38`) and forwards only the continuous one. Consumers are given **no
way to distinguish "dragging" from "released"**, so each must re-invent coalescing or do without.

**Provenance of the consequence — the viz path.** Census rows: `CENSUS-2026-08-03.md §3a [FE §6]` —
*"Canvas2D throughout, **WebGL/WebGPU ABSENT**; three independent canvases (epicycle instrument
reactive-redraw off a store rAF clock; ConvergencePlot with its own ungated rAF; FrequencyGraph
watch-driven)"*; `lane-frontend.md:26,28,30` (4 Canvas2D contexts / 3 `<canvas>` / **20 rAF sites
across 8 files**); `lane-frontend.md:83` (`BasisCanvas.vue` 547 LOC, *"the primary Fourier
renderer"*) + `:123` (`canvas-drawing/*` 764 LOC).

Of the two consumer families, only one coalesces:
- **Coalesced:** `ContourSettings.vue:139-149` — `watchDebounced(…, { debounce: 1000 })` guarding
  `extractContour` + `computeEpicycles` + `computeBases`. Correct, and it is doing the chassis's job
  for it.
- **Uncoalesced:** `EquationView.vue:161-171` — a plain `watch` on `[…, nHarmonics, budget, …]`
  calling `saveCachedInputState`, which is
  `sessionStorage.setItem(STATE_KEY, JSON.stringify(s))` (`useEquationCache.ts:32-34`), i.e. a
  **synchronous main-thread storage write with a JSON serialise, once per emitted value**. Dragging
  the Harmonics slider (`FunctionInput.vue:179-187`, range 1..100) emits per pointermove; each emit
  also runs `watch(vizHarmonics, …)` (`EquationView.vue:151-159`) which mutates `budget`, which
  re-enters the same watcher. On a Canvas2D-only render path with 20 rAF sites, a per-pointermove
  sync storage write is exactly the wrong shape.

**Falsifier (run, survived).** *"reka already throttles the emit to committed values."* — Refuted at
the source: `SliderRoot.js:127-131` emits `valueCommit` only when `commit` is set, and assigns
`modelValue.value = nextValues` on **every** pointer update — the two channels are deliberately
distinct, which is the whole reason `valueCommit` exists. Second falsifier: *"the debounce belongs in
the consumer, not the chassis."* — Defensible as a design opinion, but it is not what the tree does:
one of two consumer families forgot, and the chassis had a first-class producer channel available to
make forgetting impossible.

---

### L-7 · MAJOR · The input's `type` is a function of the *value*, so the numeric constraint surface disappears exactly when the value hits its formatter's special case

**Claim.** `:72,75,76,77` make `type`, `min`, `max` and `step` all depend on `isNumericDisplay`
(`:61`), which depends on `formatValue(modelValue)`. When the formatter emits a non-numeric string,
the element mutates from `type="number"` to `type="text"` **and drops `min`/`max`/`step` entirely** —
the browser's own validation, spinners, and numeric keyboard all vanish, at runtime, as a side effect
of the model's value.

**Provenance.** `SliderControl.vue:61,72,75-77`; the triggering formatter
`ContourSettings.vue:289` (`v === 0 ? 'All' : String(v)`). Mutating a live input's `type` also
discards the element's selection state per the HTML spec's value-mode transition, so the mutation
lands mid-interaction.

**Falsifier (run, survived).** *"Only one callsite has a non-numeric formatter, so this is
theoretical."* — One callsite is enough, it is reachable at the value `0` which is the field's own
`:min`, and it is the same callsite that carries L-3's permanent divergence. Second falsifier:
*"`Number("")` is `0`, so an empty format string keeps the numeric branch."* — Correct, and it makes
the predicate *more* surprising, not less: `isNumericDisplay` is true for `""` and `" "` and
`"Infinity"`, false for `"All"`. The predicate is `!Number.isNaN(Number(x))`, not "is a number".

---

### L-8 · MAJOR · The chassis is bypassed by six files that re-implement it, with four mutually inconsistent invalid-input postures and three duplicate CSS blocks

**Claim.** SliderControl exists to be *the* labeled-slider chassis (`:1-2`, and census
`lane-frontend.md:181` classifies it as an intentional thin adapter to keep). It is adopted at 8
callsites. Against that: **8 raw `<Slider>` element callsites across 6 other files** —
`BasisSelector.vue:168,195` · `HarmonicLevelGrid.vue:17,40` · `GlassTimeline.vue:65` ·
`ConvergenceTimeline.vue:69` · `MorphPhaseConfig.vue:21` · `EditorControlsDock.vue:115`
(`grep -rn "<Slider$\|<Slider " web/src` → 14 hits, of which 3 are prose comments
(`GlassTimeline.vue:7`, `BasisSelector.vue:25`, `ConvergenceTimeline.vue:7`) and 3 are the chassis's
own — net 8) and **5 hand-rolled
`<input type="number">` twins** (`BasisSelector.vue:158,185`, `HarmonicLevelGrid.vue:9,32`,
`MorphPhaseConfig.vue:11`).

The four postures for the same problem — "user typed something into a numeric field":

| site | posture | failure |
|---|---|---|
| `SliderControl.vue:41,47` | `NaN → min`, `@input` | destroys the value (L-2) |
| `FunctionInput.vue:44-60` | `null → ignore`, `@input` | none — **the correct one** |
| `BasisSelector.vue:165,192` | `parseInt(v) \|\| 1` / `\|\| 128`, `@input` | `\|\|` swallows a legitimate `0` |
| `HarmonicLevelGrid.vue:110,115` · `MorphPhaseConfig.vue:13` | `Number(v) \|\| 1`, `@change` | same `\|\|` hazard, but commit-on-change is right |

And the same ~18-line inline-number stylesheet is copy-pasted under three different class names:
`.inline-number` (`SliderControl.vue:117-137` **and** `BasisSelector.vue:212-232`), `.level-input`
(`HarmonicLevelGrid.vue`), `.num-input` (`MorphPhaseConfig.vue:17`).

**Falsifier (run, survived).** *"The raw-`<Slider>` sites are legitimately different — timelines and
docks are not labeled sliders."* — Partly true and conceded for `GlassTimeline` /
`ConvergenceTimeline` / `EditorControlsDock` (scrub surfaces, not labeled parameter rows). It is
**false** for `BasisSelector.vue:154-207` and `HarmonicLevelGrid.vue:5-52`: both render exactly
*label + inline numeric input + `<Slider variant="standard">` + `--track-color` retint* — the
SliderControl shape, character for character, right down to the same dead `--slider-scrub-*` block
(L-1). Those two are unambiguous non-adoption of an existing in-tree chassis.

---

## §3 — MINOR

### L-9 · MINOR · `step` is declared but never enforced on the numeric path
`clamp` (`:40-42`) bounds but does not quantize. The slider path is stepped by reka; the keyboard
path is not. Typing `2.37` into a `:step="1"` field (`FunctionInput.vue:184,217`,
`EquationPanel.vue:100`) commits `2.37` to the model. **Falsifier:** *"the browser enforces `step` on
`type=number`."* — It enforces it for spinner/validation purposes only; `input.value` still reports
the typed text and the `input` event still fires, so the emit happens regardless. `:77` binds `step`
purely as a native hint.

### L-10 · MINOR · The only automated exercise of this component cannot see L-2/L-3, and its fallback branch is dead
`e2e/contour-extraction.spec.ts:68-77` reaches the Blur Sigma SliderControl via
`page.locator("text=Blur Sigma").first().locator("..")` then `blurInput.fill("3")`.
`fill()` sets the value atomically and dispatches one `input` — structurally incapable of producing
the transient invalid states that L-2 and L-3 turn on. Its `else` branch selects
`input[type="range"]`, which **reka never renders**: `SliderRoot.js:179` mounts a
`VisuallyHiddenInput` only under `isFormControl && _ctx.name`, and SliderControl passes no `name`
(`:81-90`) — so there is no native range element in the tree at all. Dead branch, and it would fail
if the guard above it ever flipped. **Falsifier:** *"glass-ui might render a native range for form
participation."* — Grepped the producer bundle and reka's whole `Slider/` directory for
`type: "range"` / `'range'`: zero hits.

### L-11 · MINOR · The default slot is dead API and would desynchronise the accessible name if used
`:68` `<slot>{{ label }}</slot>` — zero of the 8 callsites pass slot content (all pass `label=`).
Meanwhile `:87` derives the slider's `aria-label` from the `label` **prop**, not the slot, so any
future slot user gets a visible name and an accessible name that disagree. **Falsifier:** *"the slot
is deliberate extension surface."* — Then it is undocumented (the 23-line header comment `:1-23`
never mentions it) and untested; either way it is an unexercised branch on the LIBRARY axis.

### L-12 · MINOR · `subtitle` joins the label but not the slider's accessible name
`:69` renders `— {{ subtitle }}` inside the `<label>` that implicitly labels the number input, while
`:87` gives the slider `label` alone. At `FunctionInput.vue:179-187` the two controls for one
parameter end up named *"Harmonics — terms in the Fourier sum"* and *"Harmonics"*. **Falsifier:**
*"the subtitle is decorative, so excluding it is correct."* — Then it should be excluded from **both**
names (e.g. `aria-hidden` on the subtitle span); the defect is the asymmetry, not the choice.

### L-13 · MINOR · The header comment documents a producer version three majors behind the resolved dependency
`:19-23` reasons about *"the v1.8.x `<Slider>`"* and its `DockContext` acquisition. The declared
dependency is `^4.0.0` (`web/package.json:14`), resolved 4.0.0, and the producer is at 7.0.0
(`lane-frontend.md:57` — *"3 majors"*). The *mechanism* claim happens to still hold (I verified
`useDockHold` + the `dockContext` inject survive in `dist/slider-DQ95MET2.js`), which is what makes
the stale citation dangerous: it reads as verified when it was verified against a tree that no longer
exists — the exact class of error that produced L-1. **Falsifier:** *"it's a historical note about
when the change happened."* — The sentence is present tense (*"acquires … so we no longer inject"*),
i.e. a live claim about the current dependency.

### L-14 · MINOR · Manual `modelValue`/`update:modelValue` pair where the tree's idiom is `defineModel`
`:25-38` hand-rolls the v-model contract; its own direct consumer uses `defineModel` six times
(`FunctionInput.vue:25-30`). The manual form is what forces the `computed` adapter's setter to
re-declare `clamp` and is what leaves the emit signature (`v: number`) unable to express the
producer's `number[] | undefined` payload (see §5). **Falsifier:** *"`defineModel` can't express the
scalar↔array adaptation."* — It can: `const model = defineModel<number>()` plus a single `computed`
for the array view, which is strictly less code than `:25-38` + `:53-56`.

---

## §3b — INFO

### L-15 · INFO · `arr[0] ?? props.min` (`:55`) is an unreachable branch
reka assigns `modelValue.value = nextValues` with a fully-populated array
(`SliderRoot.js:127-131`), and `web/tsconfig.json` does not enable `noUncheckedIndexedAccess`, so
`arr[0]` is typed `number` and is never `undefined` at runtime for a one-thumb slider. Harmless dead
defence; noted because it reads as a guard and isn't one. **Falsifier:** *"an empty array is
possible if `modelValue` is `[]`."* — `:54` always produces a length-1 array, and the producer's
thumb `renderList` (`slider-DQ95MET2.js`) iterates that same prop.

### L-16 · INFO · `color: string` is untyped and supplied through two different idioms
`:32` accepts any string. `ContourSettings.vue:236` etc. pass a **reactive JS hex** (`VIZ_COLORS` is
a `reactive({...})`, `lib/colors.ts:77-87`, repainted by `resolveVizColors()` on theme toggle),
whereas `FunctionInput.vue:185` / `EquationPanel.vue:101` pass the **CSS var reference**
`"var(--viz-fourier)"`. Two different reactivity models behind one prop; an invalid string makes
`color-mix` invalid-at-computed-value-time and silently drops the declaration. Currently masked
entirely by L-1. **Falsifier:** *"a `string` prop for a CSS colour is normal."* — Normal, yes;
the *defect* is that the two idioms differ in dark-mode behaviour (one re-resolves through JS, the
other through the cascade) with nothing in the type telling a caller which is expected.

---

## §3c — The R5-7 template-loop invisibility class, applied honestly

**Direct application: NEGATIVE, stated so explicitly.** SliderControl's template (`:64-92`) contains
**zero** `v-for` — neither component nor native. The R5-7 failure (intake row
`lane-fourier-r3-r6.md:125`: *"template-loop evidence keyed to **component** callsites is blind to
native HTML element loops"*, re-derived there against `DERIVED-REGISTRIES.json` where
`instance.loop.paper-sidebar` = `[]`) therefore cannot fire **inside** this component. I record the
negative rather than manufacturing an application.

**Adjacent application: POSITIVE, and it survives R6's cure.** R6 cured R5-7 with a new
`NATIVE_TEMPLATE_LOOP` family (`lane-fourier-r3-r6.md:140`, row R6-6: `nativeTemplateLoops: 16`,
`nativeTemplateLoopDiagnostics: 17`). That cure is scoped to **loops**. The residue that survives it
is **non-loop native controls**, and SliderControl is the exact place it bites: any "slider chassis
adoption" figure derived from component callsites sees 8 `<SliderControl>` + 8 raw `<Slider>` =
**16** component callsites and reports the numeric-entry surface as
fully chassis-owned — while **5 native `<input type="number">` twins** (`BasisSelector.vue:158,185`, `HarmonicLevelGrid.vue:9,32`,
`MorphPhaseConfig.vue:11`, enumerated in L-8) register nowhere, because native elements are not
callsites. The measured adoption denominator is 22; the true numeric-entry denominator is 8 chassis +
5 native = 13 parameter-entry surfaces of which **5 (38%) are invisible** to a component-keyed
derivation. This is R5-7's model defect one level out from loops, and F.W4's per-component D/L/C
audit (the carry booked at `lane-fourier-r3-r6.md:125`) will inherit it unless native *controls*, not
just native *loops*, are counted.

**Falsifier (run, survived).** *"The native inputs are counted anyway because their parent components
are counted."* — That is precisely the conflation: `BasisSelector` is one component row
(`lane-frontend.md:87`) carrying two independent numeric-entry surfaces with their own divergent
validation postures (L-8). A per-component denominator cannot see them; only an element-level pass
can.

---

## §4 — SUPERLATIVES (L-18 both ways; each with its falsifier)

**S-1 · Zero teardown surface, and the one lifecycle-bearing dependency is balanced 1:1.**
SliderControl registers no listener, timer, observer, rAF, or watcher — its entire reactive surface
is two `computed`s (`:53`, `:58`) and one derived predicate (`:61`). On a frontend the census records
as carrying *20 rAF sites across 8 files* including *"ConvergencePlot with its own **ungated** rAF"*
(`CENSUS §3a [FE §6]`, `lane-frontend.md:30,131`), a component with literally nothing to leak is
worth naming. **Falsifier (run):** I enumerated the producer's listener ledger in
`dist/slider-DQ95MET2.js` — `useDockHold` adds `pointerdown`+`touchstart` on the root in `onMounted`
and removes both in `onBeforeUnmount`; its window-level `pointerup`+`pointercancel` pair is removed
both by the handler itself and again in `onBeforeUnmount`; the dock token is `release()`d on unmount;
the touch-gate adds `touchstart`/`touchmove`/`touchend` in `onMounted` and removes all three in
`onBeforeUnmount`. **Balanced — no orphan.** The claim survives.

**S-2 · The `variant` retirement (`:9-17`) is an exemplary dead-API disposal record.** It names the
disposition (b), cites the adjudicating ledger (`audit/W3-adoption-ledger.md`), states the *falsifier
it ran* (`git grep '<SliderControl' | xargs grep variant`), and names the flag it discharges (H1).
**Falsifier (run):** re-ran the check today across all 8 callsites — **zero** pass `variant`. The
retirement was correct then and is still correct now. Most dead-API removals in a tree this size
leave a shim (cf. the repo-wide `@utility cartoon-card` *resurrection* shim, 25 sites,
`CENSUS §3a [FE §3]`); this one took the clean break and wrote down why.

**S-3 · The `aria-label` forwarding is a non-obvious producer integration that the wrapper gets right
for free.** `:87` passes `aria-label` as a fallthrough attr; the producer picks it up from
`$attrs["aria-label"]` and puts it on the **thumb** (`renderList(t.modelValue, … "aria-label": n.$attrs["aria-label"]`
in `dist/slider-DQ95MET2.js`) — the element that actually carries `role="slider"`. Every one of the 8
callsites gets a correctly-named slider from a prop they already had to pass. **Falsifier (run):**
*"the raw-`<Slider>` sites do this too, so it isn't the wrapper's merit."* — They do
(`BasisSelector.vue:174,201`, `HarmonicLevelGrid.vue:23,46`), **by hand, at every site**, which is
the point: the wrapper makes it unforgettable. Qualified but standing.

**S-4 · Goldilocks, exactly.** 150 lines total — a 23-line header comment (`:1-23`), ≈38 of script
(`:24-62`), 29 of template (`:64-92`), 57 of scoped CSS (`:94-150`). One responsibility, one root, no god-module drift, and it matches its census row
(`lane-frontend.md:181` — 150) precisely. Contrast the neighbours it is competing with:
`BasisCanvas.vue` 547 (`:83`), `HarmonicLevelGrid.vue` 286 (`:172`), `BasisSelector.vue` 324
(`:87`). **Falsifier (run):** *"it's small because it's under-featured — the missing commit channel
(L-6) and reconciliation (L-3) are the price."* — Partly conceded, and that is why L-3/L-6 are filed
as MAJOR. But both fixes are ~6 lines; the size is not the cause of the defects, and the file is not
carrying anything that doesn't belong to it.

**S-5 · `Number.isFinite` is the only invalid-input *predicate* in the tree that admits a legitimate
`0`.** `:41`. The three siblings all use `||`-fallback coercion (`parseInt(v) || 1` /
`parseInt(v) || 128` at `BasisSelector.vue:165,191`; `Number(raw) || 1` at
`HarmonicLevelGrid.vue:110,115` and `MorphPhaseConfig.vue:13`), which swallows a valid `0` as
falsy. **Four** of SliderControl's own eight callsites have `:min="0"`
(`ContourSettings.vue:246,272,285,298`), so this is load-bearing, not academic. **Falsifier (run):**
*"the siblings' minimums are all ≥1, so `||` never corrupts anything there."* — True today
(`BasisSelector` min 1/128; `HarmonicLevelGrid` min 1; `MorphPhaseConfig` min 50), so the sibling
bug is latent rather than live. The superlative therefore stands on the *predicate*, not on realised
harm — **best predicate, worst posture** (L-2 spends the correct predicate on a destructive
fallback). Recorded with that qualification.

---

## §5 — Claims that did NOT survive their falsifier (recorded, not counted)

**R-1 · "The `computed<number[]>` setter can receive `undefined` and crash on `arr[0]`."**
The producer's declared payload is `number[] | undefined`
(`dist/components/ui/slider/Slider.vue.d.ts:19`), and `:55` types `arr` as `number[]` — a genuine
type-surface mismatch. **But the runtime claim is false:** reka's `SliderRoot` only ever assigns
`modelValue.value = nextValues` where `nextValues` is a constructed array
(`dist/Slider/SliderRoot.js:127-131`); the `| undefined` in the type comes from `useVModel`'s generic
signature (`:100-103`), not from any reachable emit. `arr` cannot be `undefined`, `arr[0]` cannot
throw. **Downgraded to the type-laxity note folded into L-14; not counted as a defect.** Recording it
because the mismatch is real and a future producer change could make the crash reachable — the guard
that *would* catch it (`?? props.min`, L-15) guards the wrong position.

**R-2 · "Per-pointermove emits force a full Canvas2D redraw of `BasisCanvas`."**
Attractive, and **not supported by the tree**: the five `ContourSettings` sliders reach the canvas
only through `watchDebounced(…, {debounce: 1000})` (`ContourSettings.vue:139-149`) and an explicit
`nextKey === lastComputedKey` guard (`:145`), and `BasisCanvas` is fed from store data, not from the
slider props. The real uncoalesced consequence is the `sessionStorage` write on the *equation* route,
which is what L-6 actually claims. Over-claiming the canvas here would not have survived.

---

## §6 — Tally

| severity | ids | n |
|---|---|---:|
| BLOCKER | L-1, L-2 | **2** |
| MAJOR | L-3 … L-8 | **6** |
| MINOR | L-9 … L-14 | **6** |
| INFO | L-15, L-16 | **2** |
| **defects total** | | **16** |
| superlatives | S-1 … S-5 | **5** |
| rejected (not counted) | R-1, R-2 | 2 |

**Corpus disposition.** Overlaps with `intakes/lane-fourier-r3-r6.md` row **R5-7** (and its cure row
**R6-5**/**R6-6**) — extended, not re-invented, in §3c: the native-element blindness survives R6's
loop-scoped cure for non-loop native controls, and SliderControl's 5 uncounted `<input type="number">`
twins are the instance. Folds `CENSUS-2026-08-03.md §3a [FE §3, §6, §8]` (Canvas2D-only render path,
rAF census, the `--viz-amber` carry) and `lane-frontend.md:26,28,30,57,70,83,87,123,131,172,181`.
**No contradiction of the corpus was found.** One extension: `lane-frontend.md:181` classifies
SliderControl as a *"documented thin adapter, keep"* — the classification is right, but the row
should carry the L-1 rider, because as shipped the adapter's per-instance colour hook is inert
against the very producer version the census pins.
