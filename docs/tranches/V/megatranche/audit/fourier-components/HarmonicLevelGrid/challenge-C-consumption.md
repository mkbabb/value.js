claude-opus-5[1m] (served model id)

# CHALLENGE · `HarmonicLevelGrid.vue` · AXIS C — CONSUMPTION

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/morph/HarmonicLevelGrid.vue` (286 lines)
**Axis** how this component consumes value.js `0.13.0` · keyframes.js `4.3.0` · glass-ui `^4.0.0` (installed 4.0.0) · the 45-operation fourier API · props/emits contract · integration seams.
**Mode** static + source-derived, read-only. No browser tooling. One `node` probe against the *installed* `@mkbabb/value.js@0.13.0` bundle (library invocation, not a browser).
**Substrate** fourier HEAD `cd26c653` / tree `9a66411d` — the coordinate adjudicated at `lane-fourier-r3-r6.md` R4-9 ("nothing here is STALE-AT-HEAD"). Re-confirmed: `web/package.json` on disk is the in-flight [WT] bump (`glass-ui ^4.0.0`, `keyframes.js ^4.3.0`, `value.js ^0.13.0`), matching `lane-frontend.md §1`.

**Posture.** Assumed DEFECTIVE until the tree proved otherwise. It is. Every one of the component's three *reactive* producer couplings — the palette module, the Slider retint, and the Button recipe — is wired into something that does not exist or does not resolve. The import graph is immaculate and the value flowing through it is inert.

**Tally.** 14 defects (2 BLOCKER · 6 MAJOR · 4 MINOR · 2 INFO) · 5 superlatives.

**Files read whole (read-only):** the subject; `web/src/lib/colors.ts` (117); `web/src/lib/svg-fourier.ts` (154); `web/src/components/morph/FourierMorphDemo.vue` (parent, usage block + script); `web/src/composables/useMorphConfig.ts`; `web/src/components/ui/SliderControl.vue`; `web/src/style.css` (head + shim blocks); `web/src/assets/fourier-paths/{sun,moon}.json`; installed `@mkbabb/glass-ui@4.0.0` (`dist/glass-ui.css`, `dist/styles/*`, `dist/components/ui/slider/index.d.ts`, `dist/components/ui/button/index.d.ts`, `dist/button-BNDWhAZb.js`); producer `glass-ui@7.0.0` (`src/components/slider/types.ts`, `src/components/button/Button.vue`, `src/components/button/index.ts`); installed `@mkbabb/value.js@0.13.0`.

---

## §0 — THE HEADLINE

The component's **only reactive consumption of a producer token** is
`:style="{ '--track-color': VIZ_COLORS.chebyshev }"` (`:25`, `:48`) projected onto four custom
properties at `:210-213`. That path is **broken twice, independently**:

1. **The four target properties do not exist** in the pinned glass-ui 4.0.0 Slider. (C-1, BLOCKER)
2. **`VIZ_COLORS.chebyshev` resolves to `#888888`** at runtime, because the hand-rolled parser in
   `lib/colors.ts` cannot read the `oklch()` token glass-ui 4.0.0 actually ships. (C-2, BLOCKER)

Fixing either alone yields nothing: correct the token names and you get a grey slider; correct the
parser and you still feed dead properties. They compose, which is why both are BLOCKER.

This is the **F.W2 value.js migration surface in miniature**: the "hand-rolled colors.ts arms" named
in the charter are not merely redundant with value.js — they are **strictly weaker than a dependency
already installed and already imported at five sites in this tree**. Probed directly:

```
$ node -e 'import("@mkbabb/value.js").then(m=>console.log(String(m.parseCSSColor("oklch(0.484 0.163 265.5)"))))'
oklch(0.484 0.163 265.5)            # value.js 0.13.0 parses it
$ # lib/colors.ts cssVarToHex on the same string → "#888888"
```

---

## §1 — DEFECTS

### C-1 · BLOCKER · the `--slider-scrub-*` retint is DEAD at the pinned version

**Claim.** `HarmonicLevelGrid.vue:210-213` sets four custom properties that glass-ui 4.0.0's Slider
never reads. Both sliders therefore paint the untinted default, and the `VIZ_COLORS` binding at
`:25`/`:48` is a no-op.

**Provenance.**
```
HarmonicLevelGrid.vue:207  /* A.W2.c — glass-scrubber per-instance retint hook + flex stretch. */
HarmonicLevelGrid.vue:208  .level-slider-track {
HarmonicLevelGrid.vue:210      --slider-scrub-range-bg:        color-mix(in srgb, var(--track-color) 30%, transparent);
HarmonicLevelGrid.vue:211      --slider-scrub-range-bg-hover:  color-mix(in srgb, var(--track-color) 45%, transparent);
HarmonicLevelGrid.vue:212      --slider-scrub-thumb-bg:        var(--track-color);
HarmonicLevelGrid.vue:213      --slider-scrub-thumb-bg-hover:  var(--track-color);
```

The complete token surface glass-ui 4.0.0's Slider consumes (`node_modules/@mkbabb/glass-ui/dist/glass-ui.css`, scope `[data-v-534634a7]`):

```
--slider-range-bg   --slider-range-blur   --slider-range-shadow
--slider-thumb-bg   --slider-thumb-border-color   --slider-thumb-shadow
--slider-thumb-size --slider-thumb-spring
--slider-track-bg   --slider-track-height
```

Ten tokens. **No `scrub` arm. No `-hover` arm at all** (`grep -o -- "--slider-[a-z0-9-]*hover[a-z0-9-]*"` over the whole dist → empty). The correct names are `--slider-range-bg` / `--slider-track-bg` / `--slider-thumb-bg`; hover is handled by producer-internal `:hover .slider-range` box-shadow rules, not by a consumer token.

**Doubly dead.** `--slider-scrub-thumb-bg` could not work even under the corrected name, because
`variant="standard"` (`:19`, `:42`) paints the thumb invisible by design:

```
.slider-thumb[data-v-534634a7]{width:0; …; opacity:0; box-shadow:none; background:0 0; border:none;…}
```
`--slider-thumb-bg` is read **only** under `[data-variant=spectrum]`. The documented contract
(`dist/components/ui/slider/index.d.ts`) says `standard` is "the CONTINUOUS GLASS CYLINDER with NO
VISIBLE THUMB AT ALL … the reka `<SliderThumb>` STAYS MOUNTED … but paints INVISIBLE."

**Root cause, dated.** `lane-frontend.md §5 "Prior-art"` measures the in-flight 3.1.0→4.0.0 hop as a
pure rename sweep: `9 × variant="glass-scrubber" → variant="standard"`. The sweep renamed the
**variant** and left the 3.1.0-era **token** names behind. The `A.W2.c` comment at `:207` still says
"glass-scrubber per-instance retint hook" — the comment is the fossil that dates the break.

**Blast radius (not unique to this component, but this component is inside it).** The identical dead
quad appears at `BasisSelector.vue:319-322`, `EditorControlsDock.vue:225-228`,
`MorphPhaseConfig.vue:207-210`, `SliderControl.vue:145-148`; plus a dead
`--slider-scrub-track-height` at `ConvergenceTimeline.vue:136`, `SliderControl.vue:144`,
`GlassTimeline.vue:125`. **20 dead declarations across 7 files.** Every `--track-color` projection in
the tree — including the four `VIZ_COLORS.fourier` ones — is inert.

**Falsifier.** Any hit for `--slider-scrub` in `node_modules/@mkbabb/glass-ui/dist/` kills this.
`grep -rho -- "--slider-scrub[a-z-]*" node_modules/@mkbabb/glass-ui/dist/` → **empty**.
Also killed if fourier's own CSS bridged the names (e.g. `--slider-range-bg: var(--slider-scrub-range-bg)`);
`grep -rn "slider-scrub" src/` returns **only** the 20 setter lines, no bridge.

---

### C-2 · BLOCKER · `VIZ_COLORS.chebyshev` resolves to `#888888` — the hand-rolled parser cannot read glass-ui's `oklch()` tokens

**Claim.** After `App.vue:11` runs `resolveVizColors()` on mount, `VIZ_COLORS.chebyshev` is
`#888888`, not the seeded `#3d72b8`. The component's `--track-color` (`:25`, `:48`) is mid-grey.

**Provenance — the parser.** `web/src/lib/colors.ts:26-58` `cssVarToHex` recognises exactly four
forms and one fallback:
- `colors.ts:31` — starts with `#`
- `colors.ts:34-40` — `hsl(h s% l%)` / `hsl(h, s%, l%)`
- `colors.ts:43-46` — bare Tailwind triplet `"6 72% 49%"`
- `colors.ts:49-54` — `rgb(r, g, b)` (comma-separated only)
- `colors.ts:56` — `return "#888888";`

**Provenance — the token.** The pinned glass-ui 4.0.0 ships `--viz-chebyshev` in three arms, **all
oklch**:
```
dist/styles/tokens/light-dark.css   :root  --viz-chebyshev: light-dark(oklch(0.484 0.163 265.5), oklch(0.718 0.107 268.4))
dist/styles/tokens/color-radius.css        --viz-chebyshev: oklch(0.484 0.163 265.5)
dist/styles/tokens/dark-arm.css            --viz-chebyshev: oklch(0.718 0.107 268.4)
```
`--viz-*` is **not** `@property`-registered (`grep "@property" dist/styles/*.css dist/glass-ui.css | grep -i viz` → empty), so `getComputedStyle(root).getPropertyValue("--viz-chebyshev")` returns the substituted *token text* — `light-dark(oklch(…), oklch(…))` or `oklch(…)` — never a resolved sRGB triple. Every branch of `cssVarToHex` misses. Fallback fires.

**Corroborating asymmetry (the tell).** `--viz-amber` is the **one** viz token that survives the
parser — and it survives only because fourier hand-overrides it locally in `hsl()`:
`style.css:120` `--viz-amber: hsl(35 76% 35%);` / `:125` `--viz-amber: hsl(37 73% 67%);`.
The other four (`fourier`, `chebyshev`, `legendre`, `green`) have no local override and fall to grey.
Worse, the `D.W4.d` comment at `style.css:113-114` asserts *"glass-ui ships light `--viz-amber` at
`hsl(35 70% 42%)`"* — but the **installed 4.0.0 ships `--viz-amber: var(--section-color-5)`**. The
justification comment is stale at the pin it was bumped to.

**The value.js arm (F.W2 surface).** `@mkbabb/value.js@0.13.0` is already a dependency, already
imported at five sites (`easings.ts:9,16`, `ConvergencePlot.vue:5`, `useCurveTransition.ts:8`,
`harmonics.ts:5`), and its 239-symbol export surface already carries
`parseCSSColor · Color · OKLCHColor · RGBColor · normalizeColor · mixColors · safeAccentColor ·
getOklchLightness · srgbToOKLab · oklabToRgb255 · gamutMapSRGB`. Probed against the installed bundle:

| input | `value.js@0.13 parseCSSColor` | `colors.ts cssVarToHex` |
|---|---|---|
| `oklch(0.484 0.163 265.5)` | parses → `oklch(0.484 0.163 265.5)` | `#888888` |
| `light-dark(oklch(…), oklch(…))` | parses (non-`isColorUnit` container) | `#888888` |
| `hsl(35 76% 35%)` | parses | ok |
| `#3d72b8` | parses → `rgb(61 114 184)` | ok |

So `lib/colors.ts` is not "a small local convenience" — it is a **56-line reimplementation that is
strictly less capable than an installed dependency**, and the capability gap is exactly the gap that
breaks this component. `hslToHex` (`:60-73`), `rgbToHex` (`:75-79`), `hexToRgba` (`:104-109`) and
`hexToRgb` (`:114-117`) are all likewise covered by value.js's `Color`/`normalizeColor` surface.

**Explicit refinement of the corpus (not a contradiction).** `lane-frontend.md §3` calls fourier
"the cleanest glass-ui consumer posture in the constellation." That verdict is **TRUE at the
import-graph level** — 21 subpaths, zero reka-ui, zero shadcn copies — and I re-derived it. It is
**silent on the token level**, where this component's consumption is broken in two independent ways.
The census measured *which* modules are imported, never *whether the imported values resolve*. C-1
and C-2 are the value-level complement to that import-level finding, and both live below the
census's instrument.

**Falsifier.** Killed if `--viz-chebyshev` reached `getComputedStyle` in `hsl()`/`rgb()`/hex form, or
if `@property` registration made the browser return a resolved color. Neither holds: three oklch
definitions, zero `@property` registrations, no fourier-local override for `chebyshev`
(`grep -n "viz-chebyshev" src/style.css` → no match). Also killed if `resolveVizColors()` never ran —
it runs at `App.vue:11` on mount and again on every dark-mode flip (`App.vue:13`).

**Live-behaviour caveat.** The exact serialization `getComputedStyle` returns for an unregistered
custom property is spec-fixed (the substituted token sequence), but the *rendered* consequence —
"the slider is grey" — is masked by C-1 and is therefore **UNPROVEN-NEEDS-LIVE for SS-13** as a
pixel claim. The **string-level** claim (`cssVarToHex` returns `#888888` for every oklch input) is
proven by inspection of `colors.ts:26-56` against the three token definitions.

---

### C-3 · MAJOR · the `levels` and `shape` props are permitted to disagree — and always do

**Claim.** The parent unconditionally supplies preview levels the shape data cannot represent. Three
of the twelve grid cells render **byte-identical** paths, and the top half of the High control's
range is inert.

**Provenance.** `useMorphConfig.ts:27-39`:
```ts
const candidates = [1, 2, 3, 5, 8, 12, 18, 25, 35, 50, 75, 100];
for (const c of candidates) levels.add(c);          // 75 and 100 ALWAYS present
```
Both shipped shapes top out at 50:
```
$ node -e 'console.log(require("./src/assets/fourier-paths/sun.json").levels)'   → [1,2,3,5,8,12,18,25,35,50]
$ node -e 'console.log(require("./src/assets/fourier-paths/moon.json").levels)'  → [1,2,3,5,8,12,18,25,35,50]
```
`svg-fourier.ts:129-131` clamps: `clamped = Math.max(levels[0], Math.min(maxLevel, harmonicLevel))`.
For `harmonicLevel ∈ {50, 75, 100}` → `clamped = 50` → bracket `lo=35, hi=50` → `t = 1` →
`lerpPoints(lo, hi, 1)` returns exactly `hiPoints`. Therefore
**`getPath(50) === getPath(75) === getPath(100)`**, character for character.

The component takes `shape: FourierShape` (`:96`) and `levels: number[]` (`:97`) as **independent**
props and never reconciles them — `getPath` (`:129-132`) simply forwards. And it hardcodes
`max="100"` on the High input (`:36`) and `:max="100"` on the High Slider (`:44`) rather than
deriving from `shape.data.levels[shape.data.levels.length - 1]`, exposing a 50→100 range that
resolves to a single fixed point.

**Failure scenario.** User drags High from 50 to 100. Nothing in the preview grid changes; the morph
target does not change; the two extra grid cells (n=75, n=100) show the n=50 silhouette. No warning,
no dev-mode assertion.

**Falsifier.** Killed if either shipped JSON carried levels above 50, or if `getPath` intersected
against `props.shape.data.levels`, or if `computePreviewLevels` took the shape as an argument.
Verified: neither JSON exceeds 50; `getPath` has no intersection; `computePreviewLevels(lowLevel,
highLevel)` has no shape parameter.

---

### C-4 · MAJOR · `getPath()` is an unmemoized template call rebuilding ~684 KB of path text per render

**Claim.** `getPath(level)` (`:70`, defined `:129-132`) is a plain function invoked inside `v-for`
(`:55`), so Vue re-invokes it for **every** cell on **every** re-render. Measured cost, sun.json
level 50:

```
segments: 512      d-string: 57,029 chars      × 12 cells ≈ 684,348 chars (~684 KB)
sample:  M130.36287442745794,24.890741653122753 C125.8632236096262,23.029467608434086 …
```

`pointsToSvgPath` (`svg-fourier.ts:47-73`) emits **full float64 precision** — no rounding, no
precision parameter. Rendered target: `.grid-svg { width: 48px }` / 64px ≥640px (`:261-270`) with
`viewBox="0 0 200 200"` — i.e. **512 samples across ~48 CSS pixels, ~10.7 samples per pixel**, at
~17 significant figures each.

**Re-render trigger.** `previewLevels` (`useMorphConfig.ts:51-53`) is a `computed` returning a **new
array identity** on every `lowLevel`/`highLevel` change. A slider drag mutates `lowLevel` per tick →
new `levels` array → component re-renders → 12 × `getPath` → 12 × 512-segment string build, per
frame.

**Failure scenario.** Dragging the Low slider from 1 to 40 on a mid-range device: each pointer frame
rebuilds ~684 KB of `d` attribute text and patches 12 `<path>` nodes. Off-grid levels additionally
allocate a fresh 512-element array-of-pairs through `lerpPoints` (`svg-fourier.ts:96-104`).

**Falsifier.** Killed if `getPath` were a `computed` keyed on `(shape, levels)` — it is a bare
`function` (`:129`). Killed if `pointsToSvgPath` rounded — it does not (`svg-fourier.ts:71`).
Killed if `levels` were a stable reference — it is a fresh `Array.from(...).sort(...)` per compute
(`useMorphConfig.ts:38`). Frame-rate impact is **UNPROVEN-NEEDS-LIVE for SS-13**; the byte counts and
the invocation model are static facts.

---

### C-5 · MAJOR · controlled-input fixpoint desync — the number inputs keep rejected text

**Claim.** `:value="lowLevel"` + `@change` + clamp (`:10-11`, `:33-34`, `:109-117`) desynchronises
whenever the clamped result equals the current prop, because Vue patches the DOM `value` only when
the bound expression changes.

**Failure scenario (exact).** `lowLevel = 4`, `highLevel = 5`. User types `99` into Low and blurs.
`emitLow("99")` → `Math.max(1, Math.min(5 - 1, 99)) = 4` → `emit("update:lowLevel", 4)` → parent
assigns `4` to a value already `4` → no reactive change → no re-render → **the input still displays
`99`** while the model holds `4`. Every subsequent read of that field lies.

**Same class, Slider half.** `lowModel` (`:120-123`) is a `computed` whose getter is cached on
`props.lowLevel`. A drag that clamps to the current value never invalidates the getter, so the
Slider is never told to snap back. Whether reka's `SliderRoot` retains its internal drag position in
that window is **UNPROVEN-NEEDS-LIVE for SS-13**; the `<input>` half is proven from Vue's patch
semantics alone.

**Falsifier.** Killed by `@input` with a forced re-read, a `:key` on the input, or a `watch` that
writes the DOM value back. None present. Killed if the clamp could never be a fixpoint on
out-of-range input — it always is, by construction of `Math.max`/`Math.min`.

---

### C-6 · MAJOR · re-forks the tree's own designated labeled-slider chassis

**Claim.** `web/src/components/ui/SliderControl.vue` (150 LOC) is the tree's labeled-slider adapter,
and this component reimplements it inline instead of consuming it — duplicating the fork *and* the
C-1 defect.

**Provenance — the overlap is near-total:**

| concern | `SliderControl.vue` | `HarmonicLevelGrid.vue` |
|---|---|---|
| label + inline numeric input + `<Slider variant="standard">` | `:1-20` (doc), template | `:6-27`, `:29-50` (twice) |
| scalar ↔ array `computed` adapter | `:56-59` `sliderModel` | `:120-127` `lowModel`/`highModel` |
| `--track-color` projection | `:89` `:style="{'--track-color': color}"` | `:25`, `:48` |
| the dead `--slider-scrub-*` quad | `:145-148` | `:210-213` |
| clamp on numeric input | `:41-43` `Number.isFinite` gate | `:110`, `:115` `\|\| 1` (weaker — see C-11) |

`SliderControl`'s `min`/`max`/`step`/`color`/`label` are all plain props, so both rows here are
expressible: Low → `:max="highLevel - 1"`, High → `:max="100"`.

**Consequence.** The C-1 dead-token fix, if centralised in `SliderControl`, is one edit. As written
it is five (`SliderControl`, `HarmonicLevelGrid`, `BasisSelector`, `EditorControlsDock`,
`MorphPhaseConfig`).

**Corpus cross-ref.** `lane-frontend.md §3 "Bespoke vs shadcn-local vs glass-ui"` rules the three
`components/ui/` wrappers *"thin API-shape adapters, not shadows … the correct posture — keep."* I
concur. This finding is that **the tree's own ratified posture is defected from at this callsite** —
the adapter exists, is correct, and is bypassed.

**Falsifier.** Killed if `SliderControl` could not express a prop-dependent `max`, a custom
`aria-label`, or the flex-stretch layout. Its `max` is a plain `number` prop (`:32`); the flex
stretch is one class. It carries no `aria-label` prop — a genuine (small) gap, curable by one prop
addition, not by a 2× inline fork.

---

### C-7 · MAJOR · `variant="outline"` is purchased and then overridden away; `aria-pressed` is available and unused

**Claim.** The grid cells pay the full cost of a glass-ui `Button` and then unlayered scoped CSS
strips most of its recipe, leaving an uncoordinated hybrid — and the selection state is expressed as
a class rather than the ARIA attribute the producer already styles.

**Provenance — what 4.0.0's `outline` actually is** (`dist/button-BNDWhAZb.js`):
```
base:    btn-pill tap-squish focus-ring whitespace-nowrap text-[length:var(--control-text)]
         font-medium cursor-pointer active:scale-(--scale-press-btn) …
outline: border border-input bg-background hover:bg-accent hover:text-accent-foreground
         active:bg-accent/80 aria-pressed:bg-accent aria-pressed:text-accent-foreground
```

**What the component overrides** (`:228-249`) — Vue `<style scoped>` is emitted **unlayered**, and
unlayered declarations beat anything in Tailwind v4's `@layer utilities`, regardless of specificity:
- `border: 1.5px solid …` (`:234`) kills `border border-input`
- `border-radius: 0.5rem` (`:235`) kills `btn-pill`
- `background: var(--card)` (`:236`) kills `bg-background`
- `.grid-cell:active { transform: scale(0.96) }` (`:247-249`) kills `active:scale-(--scale-press-btn)` and `tap-squish`

**What survives, uncoordinated.** `hover:bg-accent hover:text-accent-foreground` still fires (nothing
in `.grid-cell:hover` sets `background` or `color`) — so hovering a cell flips its background to
`--accent` from glass-ui *and* its border to `--accent-red` + `scale(1.04)` from the local rule
(`:242-245`). Two independently authored hover treatments on one element.

**The a11y half.** The active cell is marked with `:class="{ active: … }"` (`:61`) and painted by
`border-color: var(--accent-red)` (`:251-254`) — **color only**. glass-ui's `outline` recipe already
ships `aria-pressed:bg-accent aria-pressed:text-accent-foreground`; binding
`:aria-pressed="level === activeLevel"` would deliver both the producer's paint and a real
`toggle`-button semantic to assistive tech. It is not bound. Nor is `aria-label` — cf. the two
Sliders, which are labelled correctly (S-4). The `is-bound` state (`:62`) is likewise color-only.

**Falsifier.** Killed if Vue scoped CSS were emitted inside `@layer` (it is not — SFC styles are
plain injected stylesheets), or if glass-ui's utilities were unlayered and higher-specificity. They
arrive through fourier's own `@import "tailwindcss"` build (reached via glass-ui's
`dist/styles/index.css:222 @source "../*.js"`), hence `@layer utilities`. Also killed if
`aria-pressed` were bound anywhere in the file — `grep -n "aria-" HarmonicLevelGrid.vue` returns only
`:23` and `:46`, both on Sliders.

---

### C-8 · MAJOR · every glass-ui prop this component passes breaks at 7.0.0

**Claim.** The 4→7 uplift — which `lane-frontend.md §5` proves is **atomic** with the value.js
`0.13→4.0` and keyframes `4.3→6` bumps (the RESOLUTION DEADLOCK) — invalidates 4 of the 4 producer
props on this component's 3 producer callsites.

| callsite | passes | 7.0.0 reality | receipt |
|---|---|---|---|
| `Slider` `:19`, `:42` | `variant="standard"` | `SliderVariant = "scrubber" \| "spectrum"` — **`"standard"` is gone** | `glass-ui/src/components/slider/types.ts:10` |
| `Button` `:57` | `variant="outline"` | **`Button` has no `variant` prop**; it is `emphasis?: ButtonEmphasis` where `ButtonEmphasis = "primary" \| "secondary" \| "quiet" \| "text"` — no `outline` | `glass-ui/src/components/button/Button.vue:15,20` |
| `Button` `:58` | `size="default"` | `ButtonSize = "xs" \| "sm" \| "md" \| "lg"` — **`"default"` is gone** | `glass-ui/src/components/button/Button.vue:16,23` |
| `.level-slider-track` `:210-213` | `--slider-scrub-*` | 7.0.0 token set narrows to `--slider-range-bg · --slider-range-origin · --slider-target-floor · --slider-thumb-size · --slider-touch-target · --slider-track-height` — **`--slider-track-bg` and `--slider-thumb-bg` also disappear** | `grep -rho -- "--slider-[a-z-]*" glass-ui/src/components/` |

The Slider variant name has now moved **three times**: `glass-scrubber` (3.1.0) → `standard` (4.0.0)
→ `scrubber` (7.0.0). The in-flight WT sweep performed hop 2 and left the tokens behind (C-1); hop 3
must do both at once or repeat the same class of miss.

**Also relocated:** the Slider module moved `src/components/ui/slider/` (4.0.0) → `src/components/slider/`
(7.0.0). The subpath specifier `@mkbabb/glass-ui/slider` is unchanged, so this component's *imports*
survive (see S-3) — only its *props* break. That asymmetry is the migration's shape here.

**Falsifier.** Killed if 7.0.0 kept a `variant` alias on `Button` or a `standard` alias on `Slider`.
`glass-ui/src/components/button/index.ts` (6 lines) exports only `Button`, `ButtonProps`,
`ButtonEmphasis`, `ButtonSize` — no `buttonVariants`, no compat alias; `slider/types.ts:10` is a
closed union of two.

---

### C-9 · MINOR · hardcoded `#60a5fa` duplicates a token from the palette module it already imports

**Provenance.** `:203-204` (`.level-input:focus`) and `:256-258` (`.grid-cell.is-bound`):
```css
border-color: #60a5fa;
box-shadow: 0 0 0 2px  rgba(96, 165, 250, 0.15);   /* :204 */
box-shadow: 0 0 0 1.5px rgba(96, 165, 250, 0.2);   /* :258 */
```
`#60a5fa` is **byte-identical** to `STATIC.rainbow[3]` in `lib/colors.ts:16` — the module imported at
`:91`. Every other color in the component is a `light-dark()` oklch token (`--accent-red`, `--card`,
`--foreground`, `--muted-foreground`, `--background`); this one is a fixed light-blue that does not
respond to the dark arm, used for the two states (focus, boundary) that most need to remain legible
against `--background` in both.

**Falsifier.** Killed if `#60a5fa` were a deliberate mode-invariant accent with a comment saying so —
there is none — or if it met contrast in both arms. It is a single fixed hex against a `light-dark()`
background, so by construction it cannot hold constant contrast across both. Exact contrast ratios
are **UNPROVEN-NEEDS-LIVE for SS-13**.

---

### C-10 · MINOR · no `prefers-reduced-motion` guard, against a tree-wide convention

**Provenance.** Six motion declarations, zero guards: `:190` (`transition: border-color .15s`),
`:239` (`border-color, box-shadow, transform`), `:244` (`transform: scale(1.04)`), `:248`
(`transform: scale(0.96)`), `:277` (`transition: color .15s`).
`grep -rln "prefers-reduced-motion" src/` → 10 files including `style.css`, `ConvergencePlot.vue`,
`DarkModeToggle.vue`, `GalleryMarquee.vue`, `CollapsibleSection.vue`, `AnimationControls.vue` —
**`HarmonicLevelGrid.vue` is not among them**. The producer honours it too (glass-ui `dist/glass-ui.css`
carries `@media (prefers-reduced-motion:reduce)` arms on aurora/card-header/etc.).

**Compounding.** Because C-7 shows the local `:active` rule *wins* over glass-ui's `tap-squish` /
`active:scale-(--scale-press-btn)`, the component also **discards** the producer's guarded press
motion in favour of an unguarded local one — a net regression, not merely an omission.

**Falsifier.** Killed by any `@media (prefers-reduced-motion` in the file, or by a global
`* { transition: none }` reduced-motion reset in `style.css`. `grep -n "prefers-reduced-motion" -A 6 src/style.css`
shows scoped arms, not a global transition kill.

---

### C-11 · MINOR · `Number(raw) || 1` silently coerces every invalid entry

**Provenance.** `:110` `Math.max(1, Math.min(props.highLevel - 1, Number(raw) || 1))` and
`:115` `Math.max(props.lowLevel + 1, Math.min(100, Number(raw) || 1))`.

`Number("") === 0` (falsy) → `1`. `Number("abc") === NaN` (falsy) → `1`. `Number("0") === 0` → `1`.
`Number("-5") === -5` (truthy) → survives to the clamp. So: clearing the High field with
`lowLevel = 8` emits **9**, not a rejection; typing `-5` in High emits **9**; typing `0` in Low emits
**1**. There is no `Number.isFinite` gate and no integer gate despite `step="1"` — `Number("7.5")`
passes straight through to `interpolateAtHarmonicLevel`, which happily lerps a fractional level.

The tree's own chassis does this correctly: `SliderControl.vue:41-43`
`Number.isFinite(v) ? Math.max(lo, Math.min(hi, v)) : lo` — another instance of the C-6 fork costing
correctness.

**Falsifier.** Killed if the `<input type="number">` prevented non-numeric text from reaching
`@change` — it does not; a cleared field fires `change` with `value === ""`, and browsers accept
`-` / `.` in the buffer.

---

### C-12 · MINOR · the `/morph` route bypasses the 45-operation API, and the bypass is `as any`-cast

**Claim (two halves, opposite signs).** This component consumes **zero** fourier API operations and
**zero** keyframes.js — its data arrives as build-time JSON. That is architecturally *good* (see
below) but the seam is untyped, and the untyped seam is precisely where C-3's invariant lives.

**Provenance.** `FourierMorphDemo.vue:95-96` static-imports `sun.json` / `moon.json`, then
`:99-100`:
```ts
const sunShape  = prepareFourierShape(sunData  as any);
const moonShape = prepareFourierShape(moonData as any);
```
`as any` voids `FourierPathData` (`svg-fourier.ts:15-27`) — the interface whose `levels: number[]` /
`partial_sums: Record<string, …>` correspondence is exactly the invariant C-3 violates. A typed
import (or a runtime `levels ⊆ keys(partial_sums)` assert) would have surfaced C-3 at build time.

**The good half — and its bearing on R6-8.** `lane-fourier-r3-r6.md` R6-8 (ADOPT-AS-FACT + CARRY →
F.W5) establishes that fourier's operation records embed derived client back-references
(`operation:PATCH:/api/visualizations/{slug}` carrying `"clients": ["client:updateVisualization"]`),
making the two leaves structurally non-isolable. **This component sits on the one product surface in
the tree with zero operation↔client coupling** — no `lib/api.ts` import, no store, no fetch. For
F.W5's shared-provenance contract that makes `/morph` the natural **clean-seam control case**: a
route whose client leaf can be mutated without touching any operation leaf. I flag the `as any` as
the defect and the isolation as evidence, not as a defect.

**keyframes.js.** `useFourierMorph.ts:14` imports `loadAnimationEngine` behind a dynamic boundary
(`:148`) — the correct 4.3 posture. This component imports none of it and animates via six CSS
transitions instead (C-10). No defect in the *choice*; the defect is the missing reduced-motion arm.

**Falsifier.** Killed if `lib/api.ts` or a store were imported here — `:87-93` shows five imports,
none of them API or Pinia. Killed if the JSON imports were typed —
`grep -n "as any" FourierMorphDemo.vue` → `:99`, `:100`.

---

### C-13 · INFO · mixed emit idiom

`:63` uses `@click="$emit('select', level)"` while `:111`/`:116` use the typed `emit()` bound at
`:103-107`. Both typecheck under `defineEmits` (Vue narrows `$emit` from the same declaration), so
this is stylistic, not functional. Noted because it makes the emit surface non-greppable from one
symbol. **Falsifier:** killed if `$emit` were untyped here — it is not, `defineEmits` is present.

### C-14 · INFO · two mechanisms for one typographic concern

`:15`/`:38` apply the glass-ui typography **utility** `class="… fira-code"`
(`dist/styles/typography.css:13`); `:275` uses the glass-ui **token**
`font-family: var(--font-mono)` (`--font-mono: var(--font-stack-mono)`). Both resolve correctly at
4.0.0 — this is a consistency note, not a break. **Falsifier:** killed if either were locally
defined; `grep -rn "fira-code" src/` shows 10 consumer sites and zero definitions — both come from
the producer.

---

## §2 — SUPERLATIVES (L-18 runs both ways)

### S-1 · `stroke="var(--accent-red)"` is the correct pattern — and it is the *only* color path in the file that survives C-2

`:73` passes the token straight to CSS rather than round-tripping through JS. glass-ui 4.0.0 ships
`--accent-red: light-dark(oklch(0.574 0.216 27.5), oklch(0.644 0.165 22.9))` (plus resolved
light/dark arms), and the browser resolves `oklch()` natively in a CSS property. **This path is
immune to the hand-rolled-parser blind spot precisely because it never enters JavaScript.** The same
component demonstrates both the failure (C-2, hex via `getComputedStyle`) and its cure (this line),
side by side.

**Bearing on F.W2.** The remedy hierarchy this file evidences, in order: (1) pass CSS vars through to
CSS untouched — S-1; (2) where JS *must* see a color, use value.js's `parseCSSColor`, which already
handles the oklch tokens the producer ships. Retiring `lib/colors.ts` in favour of value.js is
necessary for the four JS-side consumers (`BasisCanvas`, `epicycles.ts`, `basis-display.ts`,
`GalleryCardModal`); for *this* component the stronger fix is to stop going through JS at all.

**Falsifier.** Killed if `--accent-red` were undefined at the pin (stroke would fall to `none`) —
it is defined in three arms of glass-ui 4.0.0's token layer.

### S-2 · the scalar↔array adapter is modelled correctly

`:120-127` uses a **writable `computed`** rather than a `ref` + `watch` mirror, which is the right
Vue 3.5 idiom for adapting reka's array `SliderRoot` model to a scalar prop: no duplicated state, no
watcher-ordering hazard, no stale-write window. The `A.W2.c` comment at `:119` names the reason. It
is structurally identical to `SliderControl.vue:56-59`, i.e. the tree converged on the right shape
independently at two sites. **The idea is right; only the location (C-6) and the token names (C-1)
are wrong.** **Falsifier:** killed if a `watch` mirror were present — there is none.

### S-3 · the import graph is exemplary, and that is exactly why C-8 stays cheap

`:88-93` — five imports, and every producer symbol arrives through a **narrow subpath specifier**:
`@mkbabb/glass-ui/button`, `@mkbabb/glass-ui/slider`. Zero root-barrel pulls, zero deep `dist/`
paths, zero `reka-ui`, zero local shadcn copies, zero direct `value.js`/`keyframes.js` imports. It
also correctly splits the type import (`import type { FourierShape }`, `:92`) from the value import
(`:93`) — `verbatimModuleSyntax`-safe.

Consequence, measured: the 4→7 uplift for this file is a **prop rename only** (C-8), not an import
rewrite — because `./button` and `./slider` both survive 4.0.0 → 7.0.0 even though the Slider module
*moved* inside the producer (`components/ui/slider/` → `components/slider/`). This corroborates
`lane-frontend.md §3`'s "cleanest glass-ui consumer posture in the constellation" at the level where
that verdict is true, and quantifies its payoff.

**Falsifier.** Killed by a single `from "@mkbabb/glass-ui"` root import or any `node_modules/` path.
Neither appears; and note this file avoids the root barrel that `CollapsibleSection.vue:2`,
`AdminUserList.vue:4`, `GalleryCard.vue:5`, `UserSlugBar.vue:5`, `useMorphConfig.ts:9` and
`router/index.ts:2` all use.

### S-4 · both Sliders carry `aria-label`

`:23` `aria-label="Low harmonic level"`, `:46` `aria-label="High harmonic level"`. reka's
`SliderRoot` provides no implicit accessible name and the adjacent `<label>` elements (`:7`, `:30`)
are unassociated (no `for`/`id` pair) — so without these two attributes both sliders would be
anonymous to assistive tech. The author recognised the gap and closed it at the producer's own
boundary. **This is the discipline the grid Buttons fail** (C-7), which sharpens rather than softens
that finding. **Falsifier:** killed if the `<label>`s were `for`-associated, making the attributes
redundant — they are not (`grep -n "for=" HarmonicLevelGrid.vue` → no match).

### S-5 · the consumed module's allocation fast-path is real and deliberate

`svg-fourier.ts:146` `if (lo === hi) return loPoints;` returns the **cached** array from
`shape.pointsByLevel` with zero allocation. Ten of the twelve preview levels are on-grid
(`[1,2,3,5,8,12,18,25,35,50]`), so ten of twelve `getPath` calls skip the 512-element `lerpPoints`
allocation entirely. `prepareFourierShape` (`svg-fourier.ts:76-89`) likewise pre-converts every level
once into a `Map`, and the parent hoists both shapes to **module scope**
(`FourierMorphDemo.vue:99-100`) so the conversion happens once per page, not per mount.

This is a genuinely well-built consumed module. It is worth stating plainly that **C-4 is not
`svg-fourier.ts`'s fault** — the lerp is cheap and cached; the cost is the 57 KB *string* build,
which the module offers no memo for and the component does not add. The fix belongs at the callsite
(`computed`), plus an optional precision parameter on `pointsToSvgPath`.

**Falsifier.** Killed if `pointsByLevel` were rebuilt per call — `prepareFourierShape` is invoked
exactly twice, at module scope.

---

## §3 — CORPUS RECONCILIATION (fold, don't re-invent)

| # | corpus row | this challenge | resolution |
|---|---|---|---|
| K-1 | `lane-frontend.md §3` — "the cleanest glass-ui consumer posture in the constellation"; 51/66 SFCs, 21 subpaths, 0 reka-ui, 0 shadcn copies | **AGREE at the import level** (re-derived; S-3) — **and the census is silent at the token level**, where C-1 finds 20 dead custom-property declarations across 7 files and C-2 finds the palette resolving to grey | **REFINEMENT, not contradiction.** The census measured *which modules are imported*; it never measured *whether the imported values resolve*. Both instruments are needed. **CARRY → F.W3** |
| K-2 | `lane-frontend.md §3` glass-class census — "all 11 `glass-scrubber` … occurrences are **prose comments only** … `HarmonicLevelGrid.vue:119,207`" | **AGREE and extend.** The census correctly found the *comments* are prose. It did not check the **CSS the comments describe**: `:210-213` are live declarations targeting a variant that no longer exists | **EXTENSION.** The comments are the fossil; the four declarations beneath them are the defect (C-1). The census's own probe was one line short of it. **CARRY → F.W3** |
| K-3 | `lane-frontend.md §5` "Prior-art" — the 3.1→4.0 hop was `24 files, 46 insertions, 46 deletions … a pure rename sweep, no logic`, incl. `9 × variant="glass-scrubber" → variant="standard"` | **AGREE — and this is the receipt for C-1.** The sweep was *purely* a rename, which is exactly why the token names beneath the renamed variants were never revisited | **ADOPT.** "Pure rename sweep, no logic" is a precise description of both what was done and what was thereby missed. **CARRY → F.W3** |
| K-4 | `lane-frontend.md §5` "🔴 THE RESOLUTION DEADLOCK" — glass-ui 4→7 ∧ keyframes 4.3→6 ∧ value.js 0.13→4.0 are **one atomic transaction** | **AGREE, and C-8 prices this component's share:** 2 Slider `variant` sites + 2 Button props (`variant` gone entirely, `size="default"` gone) + a second token narrowing | **ADOPT.** Note the asymmetry this file evidences: *imports* survive the hop (S-3), *props* do not (C-8) |
| K-5 | `lane-frontend.md §5` "`value.js` peer floor — 5 sites … all `easeInOutSine`/`timingFunctions`" | **AGREE on the count** (`grep -rn "@mkbabb/value.js" src/` → 5 value-import sites) — **and the census under-states the surface.** The *unused* value.js capability matters more than the used one: `lib/colors.ts`'s 5 hand-rolled functions duplicate `parseCSSColor`/`Color`/`normalizeColor`, and the duplicate is *strictly weaker* (C-2) | **EXTENSION → the F.W2 charter item.** The migration surface is not 5 easing imports; it is 5 easing imports **plus a 117-line color module that value.js 0.13 already subsumes**. **CARRY → F.W2** |
| K-6 | `lane-frontend.md §3` — "`cartoon-card` is a local resurrection shim … **25 application sites** … an outstanding upstream carry" | **AGREE on the carry; refine the number.** Live: `grep -rn "cartoon-card" src/ \| grep -v style.css` → **21 occurrences / 14 files**. The census's 25 = 21 consumer sites + 4 lines inside `style.css` (the `@utility` block + its comment). The in-tree comment at `style.css:101` says "14 application sites (13 files)" — **also wrong**, and internally inconsistent with its own "one uses it 5 times" | **REFINEMENT.** Adopt **21 sites / 14 files**; both prior figures are superseded. This component's root element (`:2`) is one of the 21. The shim resolves at 4.0.0 (`cartoon-surface` present, `dist/styles/cards.css:33`) |
| K-7 | `lane-fourier-r3-r6.md` **R6-8** (ADOPT-AS-FACT + CARRY → F.W5) — operation records embed derived client back-references; the two leaves are non-isolable | **NO OVERLAP — and that is the finding.** This component reaches **zero** of the 45 operations; `/morph` is fed by static JSON (C-12). It is the tree's **clean-seam control case** for the F.W5 shared-provenance contract | **NEW EVIDENCE → F.W5.** A route with zero operation↔client coupling is what R6-8's contract should be validated *against* |
| K-8 | `lane-fourier-r3-r6.md` **R5-7** (ADOPT-AS-FACT + CARRY → F.W4) — loop evidence keyed to *component* callsites is blind to **native** element loops | **CONFIRMED ON THIS COMPONENT.** `:55` `v-for="level in levels"` is on a `<Button>` — a **registered component** callsite, so it *is* visible to the deriver. But `:8` / `:31` `<input>`, `:7` / `:30` `<label>`, `:66` `<svg>` / `:67` `<path>`, `:76` `<span>` are native and carry no loop. The blind spot does not bite here — **but the inverse does**: an instance denominator built on component callsites counts this file's single `v-for` and **misses that it fans out to 12 × (1 svg + 1 path + 1 span) = 36 native nodes** | **CORROBORATION + EXTENSION → F.W4.** R5-7's cure (`NATIVE_TEMPLATE_LOOP`, R6-5) catches native *loops*; it does not catch native *fan-out under a component loop*. Budget both |
| K-9 | `lane-fourier-r3-r6.md` **R4-9 / X-4** — HEAD `cd26c653`, tree `9a66411d`, audited scope byte-identical to live | **AGREE.** Every path in this challenge was read at that coordinate; `web/package.json` on disk is the in-flight [WT] bump the corpus describes | **ADOPT** |

---

## §4 — ROUTING

| finding | severity | wave |
|---|---|---|
| C-1 dead `--slider-scrub-*` (20 declarations / 7 files) | BLOCKER | **F.W3** (glass-ui adoption) |
| C-2 `cssVarToHex` blind to oklch → `#888888` | BLOCKER | **F.W2** (value.js migration) — retire `lib/colors.ts` onto `parseCSSColor` |
| C-3 `levels` ⊄ `shape.data.levels` | MAJOR | F.W4 (per-component contract) |
| C-4 unmemoized 684 KB path rebuild | MAJOR | F.W4 |
| C-5 controlled-input fixpoint desync | MAJOR | F.W4 |
| C-6 re-forks `SliderControl.vue` | MAJOR | F.W3 |
| C-7 `variant="outline"` overridden away; `aria-pressed` unused | MAJOR | F.W3 |
| C-8 4→7 prop break surface (4 props / 3 callsites) | MAJOR | F.W3 (inside the K-4 atomic transaction) |
| C-9 hardcoded `#60a5fa` | MINOR | F.W2 |
| C-10 no `prefers-reduced-motion` | MINOR | F.W3 |
| C-11 `Number(raw) \|\| 1` | MINOR | F.W4 |
| C-12 `as any` at the JSON seam | MINOR | F.W4 |
| C-13 mixed emit idiom | INFO | F.W4 |
| C-14 mixed mono idiom | INFO | F.W3 |

**Owner-facing consequence.** C-1 + C-2 together mean this component — and the four sibling
`--track-color` consumers — have been shipping an **unstyled** control surface since the 3.1→4.0
bump, with the intent preserved only in comments. The intent is recoverable in two edits
(`--slider-scrub-range-bg` → `--slider-range-bg`; `cssVarToHex` → `parseCSSColor`), and the second
edit is the F.W2 charter item, already justified by a dependency the tree has installed.

---

## §5 — METHOD AND LIMITS

- **Read-only** throughout. `/Users/mkbabb/Programming/fourier-analysis` and
  `/Users/mkbabb/Programming/glass-ui` were treated as evidence; **nothing in any repo was
  written**. The single write is this file.
- **No browser tooling.** Evidence: `grep` · `find` · `wc` · `sed` · `node -e` over installed
  package bytes and shipped JSON. The one library invocation
  (`import("@mkbabb/value.js").parseCSSColor`) executed the *installed* 0.13.0 bundle in node, not a
  page.
- **UNPROVEN-NEEDS-LIVE for SS-13** (claims that need a rendered page to close): the *pixel*
  consequence of C-2 (masked by C-1); the Slider half of C-5 (reka's internal drag-state retention
  on a clamp-fixpoint); the frame-rate impact of C-4 (byte counts and invocation model are static
  facts); the exact contrast ratios in C-9. Every other claim is closed by inspection.
- **Producer version basis.** "4.0.0" claims are read from `web/node_modules/@mkbabb/glass-ui`
  (`package.json.version` → `4.0.0`), i.e. the tree that actually builds. "7.0.0" claims are read
  from `/Users/mkbabb/Programming/glass-ui` source at `package.json.version` → `7.0.0`. Where the
  two disagree, both are quoted.
- **Cascade reasoning in C-7** rests on two spec facts stated rather than executed: Vue SFC
  `<style scoped>` is emitted unlayered, and unlayered declarations win over `@layer` regardless of
  specificity. Both are stable CSS-Cascade-Layers semantics; if a build step were to wrap SFC styles
  in a layer, C-7's override analysis inverts (and the 48/64px `.grid-svg` sizing would then lose to
  glass-ui's `[&_svg:not([class*=size-])]:size-(--ui-glyph)` base rule — a strictly worse outcome,
  and the reason the layering was checked at all).
