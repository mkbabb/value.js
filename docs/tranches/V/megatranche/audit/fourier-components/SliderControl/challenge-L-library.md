claude-opus-5[1m]

# CHALLENGE — `SliderControl.vue` · axis **L (LIBRARY)**

**Subject** `fourier-analysis/web/src/components/ui/SliderControl.vue` (150 LOC, 8 call sites)
**Posture** Assumed DEFECTIVE until the tree proved otherwise. It did not fully prove otherwise.
**Method** Static + source-derived only. No browser. Component read whole; its one import
(`@mkbabb/glass-ui/slider`) read to the compiled SFC, its compiled scoped CSS, its `.d.ts`, and
through to `reka-ui`'s `SliderRoot.js`. All 8 consumer call sites read. Zero writes to any product
tree; this file is the sole write.

**Tally** — 16 defects (2 BLOCKER · 5 MAJOR · 5 MINOR · 4 INFO) · 5 superlatives.

**Coordinate — read this before citing any line number.** All reads are of the fourier
**working tree**, not `HEAD`. `HEAD = cd26c6533adc32dfe1453d74117d3cb73b89ea16` (2026-07-03); the
tree carries **28 uncommitted modifications**, three of which are files this challenge cites:
`web/src/components/ui/SliderControl.vue`, `web/src/components/visualization/BasisSelector.vue`,
`web/src/components/visualization/EquationPanel.vue` (also `web/package.json` +
`web/package-lock.json`, which is where the `glass-ui ^4.0.0` pin lives). The working tree is the
correct subject — it is what `vite dev` serves and what `node_modules` was installed against — but
every `file:line` below must be re-anchored if the tree is committed or reset. I made **zero
writes** to any fourier path; the 28 modifications predate this session (`SliderControl.vue` mtime
2026-06-17).

**Read-only evidence roots**
- `/Users/mkbabb/Programming/fourier-analysis` (product, READ-ONLY)
- `web/node_modules/@mkbabb/glass-ui@4.0.0` (`package.json:3` → `"version": "4.0.0"`; declared
  `web/package.json:14` → `"@mkbabb/glass-ui": "^4.0.0"`; `package-lock.json:325` resolves
  `glass-ui-4.0.0.tgz`)
- `web/node_modules/reka-ui/dist/Slider/SliderRoot.js`

**Hitherto corpus folded (not re-derived)**
- `formation/fourier/lane-frontend.md:181` (SliderControl · 150 LOC · "thin wrapper"),
  `:294` (the import site), `:371` (the KEEP verdict), `:382` (the glass-scrubber prose-only sweep),
  `:70` (reka-ui 0 direct imports — `SliderControl.vue:51` is one of the 6 prose mentions).
- `formation/fourier/CENSUS-2026-08-03.md §3a` (Canvas2D throughout, WebGL/WebGPU ABSENT; three
  independent canvases; the glass 4→7 ∧ keyframes ∧ value 4.0.0 **atomic** RESOLUTION DEADLOCK).
- `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` rows **R5-7** and **R6-5**
  (`NATIVE_TEMPLATE_LOOP`; template-loop evidence keyed to component callsites is blind to native
  element loops) — §R below applies and *bounds* that class for this component.

---

## §0 — Headline

Two independent BLOCKERs, both statically provable, both invisible to every gate fourier currently
runs (`vue-tsc` + 29 Playwright specs; **vitest ABSENT** per CENSUS §3a):

1. **The component's entire theming apparatus is dead.** Every one of its five retint declarations
   names a CSS custom-property namespace — `--slider-scrub-*` — that **does not exist anywhere in
   glass-ui 4.0.0**. The required `color: string` prop therefore has **zero observable effect** at
   all 8 call sites. This is a whole-namespace miss, not a typo.
2. **The numeric input clamps on every keystroke**, which makes documented ranges partially
   unreachable by typing and can leave the field displaying a number the model does not hold, with
   no blur/`change` normalisation to heal it.

Both survive their falsifiers below. The corpus's KEEP verdict on this file
(`lane-frontend.md:371`) is *not wrong about the adapter shape* — it is silent on both, because it
audited **class names** (`glass-scrubber`, `glass-track`, `glass-fill`, `glass-thumb`) and correctly
found them prose-only, but never audited the **custom-property namespace**. §1 extends that row
rather than contradicting it; §1a states the contradiction precisely.

---

## §1 — BLOCKER · The `--slider-scrub-*` namespace does not exist in glass-ui 4.0.0; the required `color` prop is inert

**Severity BLOCKER** · `SliderControl.vue:32` (the prop), `:89` (the only consumer of it),
`:143-149` (the dead block), `:140-142` (the comment that asserts it works).

The component declares `color: string` as a **required** prop (`:32`) and projects it into
`--track-color` via an inline style on the `<Slider>` (`:89`). `--track-color` is then read by
exactly five declarations, all in the scoped block at `:143-149`:

```
.slider-track-host {
    --slider-scrub-track-height: 16px;
    --slider-scrub-range-bg:        color-mix(in srgb, var(--track-color) 25%, transparent);
    --slider-scrub-range-bg-hover:  color-mix(in srgb, var(--track-color) 35%, transparent);
    --slider-scrub-thumb-bg:        var(--track-color);
    --slider-scrub-thumb-bg-hover:  var(--track-color);
}
```

**glass-ui 4.0.0 reads none of these names.** The complete `--slider-*` vocabulary the shipped
stylesheet consumes (`dist/glass-ui.css`, scope `data-v-534634a7`) is:

`--slider-track-height` · `--slider-track-bg` · `--slider-range-bg` · `--slider-range-blur` ·
`--slider-range-shadow` · `--slider-thumb-bg` · `--slider-thumb-border-color` ·
`--slider-thumb-shadow` · `--slider-thumb-size` · `--slider-thumb-spring`

The `scrub` infix appears **nowhere** in the package —
`grep -rn "slider-scrub" web/node_modules/@mkbabb/glass-ui` → **0 hits** across `dist/*.js`,
`dist/glass-ui.css` and all 60+ `dist/styles/**.css`. No app-level bridge exists either:
`grep -rn -- "--slider-range-bg|--slider-track-height|--slider-thumb-bg|--slider-track-bg" web/src`
→ **0 hits**, so nothing in fourier re-exports the legacy names onto the live ones.

**Consequence, exactly.** The range fill is painted by
`.slider-range[data-v-534634a7]{background:color-mix(in oklab, var(--slider-range-bg,var(--primary)) 88%, transparent)}`.
With `--slider-range-bg` never set, the fallback `var(--primary)` wins **at every instance**. So:

| call site | `color` passed | actually painted |
|---|---|---|
| `EquationPanel.vue:101` | `var(--viz-fourier)` | `--primary` |
| `FunctionInput.vue` (Harmonics, Display terms) | `var(--viz-fourier)` | `--primary` |
| `ContourSettings.vue:230/243/269/282/295` | `VIZ_COLORS.amber` | `--primary` |

Eight sliders that the design intends to carry viz identity render one undifferentiated tint. The
same block also intends a **16px** track; the live height comes from
`.glass-slider[data-size=md][data-v-534634a7]{--slider-track-height:1.25rem}` = **20px**, since
`SliderControl` never passes `size` (see L-4) — the chassis is 25% taller than specified.

**Falsifier (run it; the claim dies if any of these produce output):**
```
grep -rn "slider-scrub" web/node_modules/@mkbabb/glass-ui            # expect 0
grep -rn -- "--slider-range-bg" web/src                              # expect 0  (no bridge)
grep -rno -- "--track-color" web/node_modules/@mkbabb/glass-ui/dist  # expect 0  (producer never reads it)
```
All three return empty on the tree as of this read. A fourth falsifier is live-only and I mark it
**UNPROVEN-NEEDS-LIVE (SS-13)**: screenshot two SliderControls with different `color` values; if the
range fills differ, this finding is dead. Static derivation says they will not.

### §1a — Explicit contradiction with the corpus

`lane-frontend.md:382` concludes: *"All 11 `glass-scrubber` and all `glass-track`/`glass-fill`/
`glass-thumb` occurrences are **prose comments only** (verified site-by-site: … `SliderControl.vue:3,16,140` …).
The live tier classes are `glass-wash` (4), `glass-resting` (3), `glass-floating` (3) — the
post-4.0.0 names."*

That row is **true as written and materially incomplete.** The three cited `SliderControl.vue`
line numbers (3, 16, 140) are indeed comments. But the sweep's grep vocabulary was
*class names*; the retired surface here is a *custom-property namespace* whose spelling
(`--slider-scrub-…`) matches none of the four searched tokens. Lines **144–148** are live CSS
declarations, not prose. The epidemic the sweep missed:

| file | dead `--slider-scrub-*` declarations |
|---|---|
| `components/ui/SliderControl.vue` | 5 |
| `components/visualization/BasisSelector.vue` | 4 |
| `components/visualization/EditorControlsDock.vue` | 4 |
| `components/morph/MorphPhaseConfig.vue` | 4 |
| `components/morph/HarmonicLevelGrid.vue` | 4 |
| `components/visualization/GlassTimeline.vue` | 1 |
| `components/equation/convergence/ConvergenceTimeline.vue` | 1 |
| **total** | **23 declarations · 5 distinct dead names · 7 files** |

So the census's own conclusion — *"the live tier classes are the post-4.0.0 names"* — should read:
**the class names completed the 4.0.0 migration; the custom-property names did not.** I propose
that amendment to `lane-frontend.md:382` and to CENSUS §3a's glass-posture bullet
("deepest, cleanest consumer in the constellation") — the depth is real, the cleanliness has a
23-declaration hole.

I also register the timing rider: CENSUS §3a's **RESOLUTION DEADLOCK** makes glass 4→7 an atomic
transaction with keyframes and value.js. A token rename landed *now* against 4.0.0 must be
re-verified against 7.x inside that same transaction, or it will silently re-rot. Schedule the cure
**inside** the deadlock wave, not before it.

---

## §2 — BLOCKER · `onInput` clamps on every keystroke: unreachable values + persistent display/model divergence

**Severity BLOCKER** · `SliderControl.vue:40-42` (`clamp`), `:44-49` (`onInput`), `:74` (`:value`),
`:78` (`@input`).

```ts
function clamp(v, lo, hi) { return Number.isFinite(v) ? Math.max(lo, Math.min(hi, v)) : lo; }
function onInput(e: Event) {
    emit("update:modelValue",
         clamp(parseFloat((e.target as HTMLInputElement).value), props.min, props.max));
}
```

`@input` fires per **character**, and each character is clamped into `[min, max]` — with non-finite
parses collapsing to `lo`. Two distinct failures follow.

**(a) Documented values become unreachable by typing.** `EquationPanel.vue:97-103` mounts
`min=2, max=20`. To type `12`: keystroke `1` → `parseFloat("1")=1` → `clamp(1,2,20)=2` → emit `2` →
parent writes `budget=2` → `displayValue` becomes `"2"` → Vue patches `el.value="2"` (caret to end)
→ keystroke `2` → `"22"` → `clamp(22,2,20)=20`. **Result: 20, not 12.** Every target in **10…19 is
unreachable through the numeric field** at that call site. The class generalises to any call site
whose `min` exceeds the leading digit of the target — `ContourSettings.vue:269` (Display terms,
`min=2`) has it too. The slider can still reach those values; the field cannot, and the field is the
only precise-entry affordance.

**(b) A persistent display/model lie.** When the clamped result **equals** the value the model
already holds, the parent's assignment is a no-op, nothing re-renders, `SliderControl`'s props do
not change, its template is never re-patched, and Vue therefore never rewrites `el.value` — because
the `value` patch only runs when the vnode is re-patched. The DOM keeps the user's text.

Concrete: `EquationPanel` with `budget === 2` (= `min`). Select-all, type `1`. `clamp(1,2,20)=2`;
`budget` was already `2`; no re-render; the field reads **`1`** while the equation renders **2**
terms. It stays that way through blur, through tab-away, until some *other* dependency moves. There
is no `@change`, no `@blur`, no `v-model.number`, and no re-normalisation hook anywhere in the file
(`grep -n "@change\|@blur\|onChange\|onBlur" SliderControl.vue` → 0). The same mechanism blanks the
field at any `min=0` site (`ContourSettings.vue:243/269/282/295`): backspace to empty →
`parseFloat("")=NaN` → `clamp → 0` → already 0 → no patch → the box stays visually empty.

**Falsifier.** The claim dies if (i) the input carried a `change`/`blur` commit path, (ii) `clamp`
deferred to commit rather than running per `input`, or (iii) Vue re-patched `value` on an
unchanged-props render. (i) and (ii) are refuted by reading `:44-49` and `:71-79`; (iii) is refuted
by Vue's own patch model — an unchanged parent produces no child re-render, hence no `patchProp`.
A live keystroke transcript would be the confirmatory artifact and is **UNPROVEN-NEEDS-LIVE
(SS-13)** only for the *pixel* proof; the derivation stands on source.

**Cure shape (one line each):** move the clamp to `@change`, keep `@input` raw-but-guarded; or bind
`:value` through a local `shallowRef` edit-buffer that only re-syncs from the model when the input
is not focused. (The value.js `useColorModel` synchronous-cache idiom is the in-constellation
precedent for exactly this hazard.)

---

## §3 — MAJOR defects

### L-3 · `formatValue` has no inverse; the formatted string *is* the editable value
`SliderControl.vue:33` (prop), `:58-60` (`displayValue`), `:74` (`:value="displayValue"`),
`:44-49` (parse via bare `parseFloat`).

The component formats on the way out and `parseFloat`s on the way in. It never asks the consumer
for the matching `parseValue`. Two live consequences:

- **Non-invertible format ⇒ un-editable field.** `ContourSettings.vue:282-290` passes
  `(v) => v === 0 ? 'All' : String(v)`. At `maxContours === 0` the field shows `All`. Backspace →
  `"Al"` → `parseFloat("Al") = NaN` → `clamp → 0` (=`min`) → already 0 → *no re-render* (§2b) → the
  field now reads `Al` while the model reads 0, and further backspaces keep emitting 0. The field is
  editable only by full select-and-replace.
- **Lossy format ⇒ silent model rounding on the next edit.** Nothing forbids off-step values
  (L-12). Given `blurSigma = 0.37` (reachable only by typing) and
  `format-value="(v) => v.toFixed(1)"` (`ContourSettings.vue:250`), the field displays `0.4`. The
  next keystroke parses **from the rounded string**, so `0.37` is destroyed by an edit the user
  intended as an append.

**Falsifier:** find a `parseValue`/`parse`/`fromDisplay` prop or a `@change`-time re-normalisation
in `SliderControl.vue`. `grep -n "parse" SliderControl.vue` → one hit, the bare `parseFloat` at `:47`.

### L-4 · `inheritAttrs` is left on and the root is a `<div>` — every attr/listener aimed at the slider lands on the wrapper
`SliderControl.vue:25-38` (the whole declared surface), `:65` (root `<div class="slider-control">`).

The declared surface is 8 props + 1 emit. Everything else a consumer writes on `<SliderControl>`
falls through to the **root `div`**, never to `<Slider>`:

- `disabled` — `SliderRootProps.disabled` exists
  (`glass-ui/dist/components/ui/slider/Slider.vue.d.ts` → `SliderRootProps & {...}`), but
  `<SliderControl disabled>` sets a dead attribute on a div. There is no way to freeze these
  controls during `store.computing` (`ContourSettings.vue:105` `store.beginCompute()`), so a drag
  mid-compute enqueues another compute.
- `size` — glass-ui ships `sm | md | lg` (`slider.d.ts` §Sizes: 12/20/28px). Unreachable; hence the
  dead 16px override in §1.
- `orientation`, `inverted`, `name`, `required`, `keepDockOpen` — all likewise unreachable.
- **`valueCommit` is swallowed.** glass-ui declares
  `valueCommit: (payload: number[]) => any` (`Slider.vue.d.ts`) and reka fires it exactly once per
  gesture (`SliderRoot.js` → `handleSlideEnd`, guarded by `hasChanged`). `SliderControl` neither
  re-emits it nor forwards it; `@value-commit` on `<SliderControl>` becomes `onValueCommit` in
  `$attrs` on the div and is never called. **The settle signal exists upstream and is destroyed by
  the adapter** — which is the direct cause of L-5.

**Falsifier:** `grep -n "inheritAttrs\|useAttrs\|valueCommit\|disabled\|size" SliderControl.vue` →
zero hits for all five. The one attr the current fallthrough *does* serve correctly is
`class` (`FunctionInput.vue:180` `class="flex-1"` wants the wrapper), so the cure is not a blanket
`inheritAttrs: false` — it is an explicit `disabled`/`size` passthrough plus a re-emitted
`valueCommit`.

### L-5 · Write-through on every pointermove, with the settle event destroyed — the render-path cost
`SliderControl.vue:53-56` (`sliderModel` setter → `emit` per move); reka
`SliderRoot.js` → `handleSlideMove` → `updateValues` → `modelValue.value = nextValues` (passive
`false`, because `props.modelValue !== undefined`) ⇒ one `update:modelValue` per accepted step.

CENSUS §3a fixes the render architecture this feeds: *"Canvas2D throughout, **WebGL/WebGPU
ABSENT**; three independent canvases (epicycle instrument reactive-redraw off a store rAF clock;
ConvergencePlot with its own ungated rAF; FrequencyGraph watch-driven) + 12 SVG surfaces [FE §6]."*
Because L-4 destroys `valueCommit`, **every consumer must invent its own coalescing**, and the tree
shows three different answers to the same question:

| consumer | coalescing | provenance |
|---|---|---|
| `ContourSettings.vue` | `watchDebounced(..., {debounce: 1000})` | `:140-149` |
| `EquationPanel.vue` | `watchDebounced(..., {debounce: 300})` | `:61-65` |
| `EquationView.vue` | **none** | `:161-172` |

The third is the live cost. `EquationView.vue:161-172` watches
`[expression, domainStart, domainEnd, nHarmonics, budget, notation]` **undebounced** and calls
`saveCachedInputState` → `useEquationCache.ts:32-33` →
`sessionStorage.setItem(STATE_KEY, JSON.stringify(s))` — a **synchronous, main-thread, blocking**
storage write. `FunctionInput.vue:179-186` mounts Harmonics at `min=1, max=100, step=1`, so one
drag across the track issues up to **~100 synchronous `JSON.stringify` + `sessionStorage.setItem`
pairs**, interleaved with the rAF-clocked Canvas2D redraws the same value drives. This is precisely
the INP hazard CENSUS §3a books under *"`scheduler.yield()` INP floor"*.

The defect is `SliderControl`'s, not the consumers': the upstream primitive already distinguishes
*move* from *commit*, and this adapter is the layer that erased the distinction.

**Falsifier:** show a debounce, `requestAnimationFrame` coalescer, or a re-emitted `valueCommit`
anywhere between `SliderRoot.handleSlideMove` and `saveCachedInputState`.
`grep -n "debounce\|rAF\|requestAnimationFrame" SliderControl.vue` → 0; `EquationView.vue:161` is a
plain `watch`. Magnitude on a real drag is **UNPROVEN-NEEDS-LIVE (SS-13)** (a performance trace
would size it); existence is static.

### L-6 · The input's `type` attribute mutates as a function of the value it holds
`SliderControl.vue:61` (`isNumericDisplay`), `:72` (`:type`), `:75-77` (attrs gated on the same flag).

`:type="isNumericDisplay ? 'number' : 'text'"` where
`isNumericDisplay = !Number.isNaN(Number(displayValue))`. With
`ContourSettings.vue:289`'s `(v) => v === 0 ? 'All' : String(v)`, the **same DOM element** flips
`number ⇄ text` whenever `maxContours` crosses 0 — including mid-drag, since the slider's `min` is
0. Per HTML's value-sanitization algorithm, assigning `type="number"` to an input whose value is not
a valid floating-point literal sets the value to the empty string; the component is relying on
Vue's template prop order (`type` at `:72` patched before `value` at `:74`) to keep that from firing.
That is an undocumented ordering dependency in a file that documents everything else. It also
thrashes `min`/`max`/`step` on and off the element (`:75-77` bind `undefined` in text mode) on the
same crossing.

**Falsifier:** the finding dies if any consumer's `formatValue` is proven total over one branch —
i.e. if no format is value-dependent. `ContourSettings.vue:289` is value-dependent by inspection.
The *browser-specific* consequence of the type flip is **UNPROVEN-NEEDS-LIVE (SS-13)**; the flip
itself is static.

### L-7 · The chassis is duplicated byte-for-byte and bypassed by 6 of 7 slider sites
`SliderControl.vue:117-138` vs `BasisSelector.vue:212-233`.

`diff <(sed -n '117,138p' components/ui/SliderControl.vue) <(sed -n '212,233p' components/visualization/BasisSelector.vue)`
→ **IDENTICAL**: a 22-line `.inline-number` block (width, `-moz-appearance: textfield`, the
`::-webkit-*-spin-button` resets, the `color-mix` underline) copied verbatim into a second scoped
stylesheet. `BasisSelector.vue:155-204` further re-implements the whole chassis — label row +
`class="inline-number fira-code"` numeric input + `<Slider variant="standard">` + the dead
`--slider-scrub-*` retint — in a *third* dialect of the clamp bug
(`parseInt(...) || 1` at `:164`, which additionally maps a legitimate `0` to `1`).

Of the **7** files importing `@mkbabb/glass-ui/slider` (`lane-frontend.md:271-324`), only
`SliderControl.vue` is the chassis; the other six (`BasisSelector`, `EditorControlsDock`,
`GlassTimeline`, `ConvergenceTimeline`, `HarmonicLevelGrid`, `MorphPhaseConfig`) go direct and
each re-derives some subset of its behaviour — and all six carry the §1 dead-token block. This is
the colocation failure: the abstraction exists, is correct in shape, and is used by **2 of 8**
slider-bearing components.

**Falsifier:** the `diff` above returning non-empty, or a shared stylesheet/utility that both files
import. `grep -rn "inline-number" web/src` → 12 hits across exactly those 2 files, none in a shared
sheet; `ls web/src/lib/utils.ts` → does not exist (`lane-frontend.md:70`).

---

## §4 — MINOR defects

### L-8 · The obvious cure (rename the tokens) does not fully work — three separate obstructions
`SliderControl.vue:143-149` vs `glass-ui/dist/glass-ui.css`.

Renaming `--slider-scrub-*` → `--slider-*` fixes **one** of the five declarations. The rest are
blocked:

1. **Specificity.** glass-ui sets the height on the *same element* the wrapper targets:
   `.glass-slider[data-size=md][data-v-534634a7]` = specificity **(0,3,0)**. The wrapper's scoped
   rule compiles to `.slider-track-host[data-v-<fourier>]` = **(0,2,0)** and **loses**. A renamed
   `--slider-track-height: 16px` would still be overridden. Working cures: pass `size="sm|lg"` (once
   L-4 is fixed), or move the height into the existing inline `:style` at `:89` (inline wins over
   any stylesheet rule).
2. **Variant scope.** `--slider-thumb-bg` is read **only** under
   `.glass-slider[data-variant=spectrum] .slider-thumb[data-v-534634a7]`. Under
   `variant="standard"` (`:83`) the thumb rule is
   `.slider-thumb[data-v-534634a7]{width:0;opacity:0;background:0 0;border:none}` — a deliberately
   invisible thumb, per glass-ui's own `slider.d.ts` docblock (*"NO VISIBLE THUMB AT ALL … paints
   INVISIBLE: width 0, opacity 0"*). So `--slider-scrub-thumb-bg` and `-thumb-bg-hover` are
   **doubly** dead: wrong name *and* a variant that erases the thing they paint.
3. **No `-hover` arm exists.** glass-ui 4.0.0 has no `--slider-*-bg-hover` token of any kind; hover
   is expressed as `.glass-slider:not([data-variant=spectrum]):hover .slider-range{box-shadow:…}`.
   The hover-tint intent needs a `:deep(.slider-range):hover` rule, not a token.

Net: of five declarations, **one** (`range-bg`) survives a rename; one needs a different mechanism;
three should be deleted. Any cure that stops at `sed s/slider-scrub-/slider-/` is a false green.

### L-9 · The default `<slot>` is dead code, and its only live effect would be a WCAG 2.5.3 divergence
`SliderControl.vue:68` (`<slot>{{ label }}</slot>`) vs `:87` (`:aria-label="label"`).

`grep -rn "</SliderControl>" web/src` → **0**; all 8 call sites are self-closing, so the slot has
never been exercised. Were it used, the visible text would come from slot content while the
slider's accessible name stayed `props.label` — the label-in-name mismatch (WCAG 2.5.3) that breaks
voice control. Either delete the slot or derive `aria-label` from the same source.

### L-10 · The provenance header asserts things the tree contradicts (L-18 runs both ways)
`SliderControl.vue:18-20` and `:140-142`.

- `:18` — *"the **v1.8.x** `<Slider>` acquires the typed `DockContext` token internally"*. The tree
  ships **4.0.0** (`web/package.json:14`, `package-lock.json:325`). The *mechanism* is still true
  (`slider-DQ95MET2.js` → `useDockHold` → `dockContext`), but the version pin in the comment is
  three majors stale, which is exactly the kind of drift that let §1 survive the 4.0.0 hop.
- `:140-142` — *"we project the per-color tint onto the range + thumb"*. **False.** Nothing is
  projected (§1), and the thumb is invisible under this variant (L-8.2). A comment that asserts a
  working mechanism is worse than no comment: it is why the census's site-by-site read at
  `lane-frontend.md:382` stopped at "prose".

### L-11 · The emit payload's declared type admits `undefined`; the setter dereferences it
`SliderControl.vue:55` vs `glass-ui/dist/components/ui/slider/Slider.vue.d.ts`.

The producer declares `"update:modelValue": (payload: number[] | undefined) => any`. The wrapper
writes `set: (arr) => emit(..., clamp(arr[0] ?? props.min, ...))` — `arr[0]` on `undefined` throws
`TypeError`. The `?? props.min` guard covers the empty-**array** case and not the undefined-array
case, which is the one the contract actually declares.

**Falsifier — and it partly succeeds, so I rank this MINOR not MAJOR:** reka never emits
`undefined`. `SliderRoot.js` assigns only `nextValues` from `getNextSortedValues`, which always
returns a non-empty array, and `useVModel` runs with `passive: props.modelValue === void 0` =
`false` here. So this is a **type-contract** defect (the declared union is dereferenced unguarded),
not a live crash. Conversely `?? props.min` is unreachable defensive code for a case reka cannot
produce.

### L-12 · `step` is enforced on the slider and ignored on the input
`SliderControl.vue:47` vs reka `SliderRoot.js` → `updateValues` (`roundValue(Math.round((value-min)/step)*step+min, decimalCount)`).

Dragging snaps to `step`; typing does not. Off-step values are reachable **only** through the field,
and once reached they are the exact inputs that L-3's lossy-format rounding destroys. The `:step`
attribute at `:77` is advisory (it drives spinners and `:invalid` styling, not the parsed value).

---

## §5 — INFO

- **L-13** · `SliderControl.vue:72` — the `text` branch sets no `inputmode`/`pattern`, so the
  numeric control raises a full alphabetic keyboard on touch whenever `formatValue` is
  non-numeric (`ContourSettings.vue:289`). `inputmode="decimal"` is the one-attribute fix.
- **L-14** · `SliderControl.vue:61` — `Number("") === 0`, so a `formatValue` returning `""` reads as
  *numeric* and yields `type="number"` with an empty value. Latent; no consumer does this today.
- **L-15** · `SliderControl.vue:58-60` — `displayValue` depends on `props.formatValue`, and all five
  `ContourSettings` call sites pass a **freshly-allocated inline arrow**
  (`:237, :250, :276, :289, :302`), so the computed's cache is invalidated on every parent render.
  Cost is one `toFixed` — noted for completeness, not for action.
- **L-16** · `SliderControl.vue:25-38` — hand-rolled `defineProps` + `defineEmits` + a writable
  `computed` where Vue 3.5's `defineModel` is the tree's own idiom: its **direct consumer**
  `FunctionInput.vue:25-30` declares six models that way. Idiom drift inside a two-hop import chain.

---

## §R — The R5-7 template-loop-invisibility class: **does not apply here, and here is the boundary**

Adjudicated rows **R5-7** (TRUE / ADOPT-AS-FACT + CARRY→F.W4) and **R6-5** (TRUE, the
`NATIVE_TEMPLATE_LOOP` cure) establish: *template-loop evidence keyed to component callsites is
blind to native HTML element loops*, demonstrated on `PaperSidebar.vue`'s three nested
`<li v-for>` at lines 65 / 87 / 105.

**Direct application: NONE.** `grep -n "v-for" web/src/components/ui/SliderControl.vue` → **0 hits**.
The template (`:64-92`) contains one `v-if` (`:69`) and no iteration of any kind, native or
component. Any instance derivation over this file is complete whether or not it implements R6-5's
`NATIVE_TEMPLATE_LOOP` family. I record that as a null result rather than manufacturing a hit.

**Mirrored extension — worth carrying to F.W4.** The loop that governs this component's rendered
subtree is real, is consumer-data-driven, and lives *outside* `web/src` entirely:

```
// glass-ui/dist/slider-DQ95MET2.js — Slider.vue's compiled render fn
(p(!0), s(i, null, m(t.modelValue, (e, t) => (p(), o(h(b), { key: t, ... }))), 128))
//                 ^^^^^^^^^^^^^^ renderList over props.modelValue → one <SliderThumb> per element
```

`SliderControl` feeds it `[props.modelValue]` (`:54`), so exactly one thumb mounts per instance.
R5-7's failure mode was *a loop the deriver's model could not see*; the mirror here is *a loop the
deriver's **scope** cannot see* — `web/src`-scoped derivation undercounts each SliderControl subtree
by one `role="slider"` node, and by more at the six direct `<Slider>` sites whose array models it
does not bound. This matters concretely for F.W4 because the undercounted node is the **only
keyboard-operable and only screen-reader-visible element of the control**: the `standard` variant's
thumb is deliberately invisible (`slider.d.ts` §standard), so an instance census scoped to
`web/src` reports zero interactive slider nodes for a surface that has 14+.

This is also where X-9's open question bites (`lane-fourier-r3-r6.md` X-9 — *"the formation must
pick and publish one scope law before any per-component census claims a percentage"*): a scope law
of `web/src` makes this component's interactive surface **structurally invisible**, and a scope law
including `node_modules` is unbounded. **Recommendation for F.W4: derive component-boundary loops
from the imported package's `.d.ts` + compiled render function for first-party `@mkbabb/*`
dependencies only** — a closed, versioned set (7 packages) that keeps the denominator finite while
restoring the missing nodes.

---

## §6 — Superlatives (L-18 runs both ways)

**S-1 · The clamp is a genuine safety barrier on the render path — BEST-IN-FILE.**
`:40-42`'s `Number.isFinite` guard means **no non-finite value can ever leave this component**.
`parseFloat` can yield `NaN` (`""`, `"Al"`, `"-"`) and `Infinity` (`"Infinity"`); both are caught,
both collapse to `lo`. Given CENSUS §3a's Canvas2D-throughout architecture, a single `NaN` reaching
a `ctx.arc()` or an epicycle accumulator poisons a whole frame silently. This barrier holds — and it
is the *only* place in the slider family that does: `BasisSelector.vue:164`'s hand-rolled
`parseInt(...) || 1` is the same intent with a `0 → 1` bug. **Falsifier:** exhibit an input string
`s` with `Number.isFinite(parseFloat(s)) === false` that escapes — the guard is total over
`parseFloat`'s codomain. *(Counterweight: the barrier's placement is what causes §2. The right fix
keeps the barrier and moves the commit.)*

**S-2 · Zero teardown surface — provably leak-free.**
`grep -n "addEventListener|setTimeout|setInterval|requestAnimationFrame|Observer|onMounted|onUnmounted|watch" SliderControl.vue`
→ **0 hits**. No listener, timer, observer, or lifecycle hook; all derived state is `computed`.
Unmount is free and cannot leak. Notable because its own child *does* carry an event surface
(`slider-DQ95MET2.js` → `useDockHold` adds `pointerdown`/`touchstart`, plus window
`pointerup`/`pointercancel`) — and correctly tears all of it down in `onBeforeUnmount`. The adapter
adds no risk to a correct primitive.

**S-3 · The scalar↔array adaptation is minimal, localized, and documented at the point of adaptation.**
`:51-56` — one writable `computed`, with the reka rationale written on the two lines above it. This
is what `lane-frontend.md:371` praised, and I confirm it independently: it is the smallest correct
bridge between a scalar public API and reka's array model, and it is the reason 8 call sites read
cleanly. (`lane-frontend.md:70` records that `SliderControl.vue:51` is one of only 6 `reka-ui`
mentions in the tree, all prose — the coupling is documented without being imported.)

**S-4 · Number-only attributes are correctly gated off in text mode.**
`:75-77` bind `min`/`max`/`step` to `undefined` when `isNumericDisplay` is false, so a
`type="text"` input never carries attributes that are invalid for it. Small, and right — most
hand-rolled versions of this pattern leave them on. (Counterweight: it is the *gating flag itself*
that is the L-6 defect; the hygiene is downstream of a bad premise.)

**S-5 · The retirement provenance at `:10-16` is exemplary audit practice — and now partly false.**
The A.W3.b D5 block records *what* was retired (`variant?: "timeline" | "default"`), *why* (the two
branches were cosmetically identical), *the verification command actually run*
(`git grep '<SliderControl' | xargs grep variant`), and *the disposition authority*
(`audit/W3-adoption-ledger.md`). That is a reproducible trail, and it is why this challenge could
reconstruct intent so precisely. **L-18 counterweight:** the same block's `:18` version pin and
`:140-142` mechanism claim are now false (L-10) — the file demonstrates both that provenance
comments are the highest-value thing in it *and* that an unverified provenance comment is how a
whole-namespace defect survives a major-version hop and a census sweep.

---

## §7 — Verdict and cure ordering

**Verdict: DEFECTIVE.** The adapter's *shape* is right — the corpus's KEEP ruling
(`lane-frontend.md:371`) survives — but its *theming layer is entirely dead* (§1) and its *editing
layer is incorrect* (§2). Both are user-visible, both are statically provable, and neither is
reachable by fourier's current gates (`vue-tsc` + 29 Playwright specs; vitest ABSENT).

Suggested ordering, for whoever owns the wave:

1. **§2 first** (self-contained, no cross-repo coupling): move the clamp to commit; add the
   focused-edit buffer. Fixes L-3(a), L-12's blast radius, and the L-6 thrash window.
2. **L-4 next** (unlocks the §1 cure): explicit `disabled`/`size` passthrough + re-emitted
   `valueCommit`. L-5's three-dialect debounce sprawl collapses once consumers can hear the settle.
3. **§1 + L-8 inside the RESOLUTION-DEADLOCK wave** (CENSUS §3a): the token cure must be authored
   against the *target* glass-ui, not 4.0.0, or it re-rots on the 4→7 hop. All **23 declarations
   across 7 files** move together; the cure is a 3-way rewrite (rename `range-bg`, re-express
   hover as `:deep()`, delete the thumb pair, relocate height to `size`/inline), not a rename.
4. **L-7** last: fold `BasisSelector`/`EditorControlsDock` onto the repaired chassis; that is where
   the duplication finally retires and the §1 epidemic loses its remaining hosts.
5. **Gate**: fourier has no unit-test seat (CENSUS §3a, "vitest ABSENT"). §2's failure is a
   3-line component test. Landing the cure without the seat re-opens the same hole.
