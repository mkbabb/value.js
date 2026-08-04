claude-opus-5[1m] (served model id)

# CHALLENGE — `EasingPicker` · axis **L (LIBRARY)**

**Subject.** `fourier-analysis/web/src/components/visualization/EasingPicker.vue` (98 lines).
**Posture.** Assumed DEFECTIVE until the tree proved otherwise. Every row below carries
severity + `file:line` provenance + its own falsifier. Superlatives carry falsifiers too (L-18
runs both ways) — three candidate defects died against their falsifiers and are recorded as
superlatives, not silently dropped.

**Method.** Static + source-derived only; no browser tooling. One numeric probe was run
(`node` over the installed `@mkbabb/value.js@0.13.0` easing exports) to falsify the viewBox
row — recorded inline. `fourier-analysis` and `glass-ui` were read READ-ONLY; the only write
this lane made is this file.

**Read whole (the component + its complete import closure):**

| file | lines | why |
|---|---:|---|
| `web/src/components/visualization/EasingPicker.vue` | 98 | subject |
| `web/src/components/visualization/EasingCurvePreview.vue` | 41 | direct import |
| `web/src/stores/animation.ts` | 146 | direct import (`useAnimationStore`, `EASING_OPTIONS`, `EasingName`) |
| `web/src/lib/easings.ts` | 127 | transitive (the store re-exports it) |
| `@mkbabb/glass-ui/button` (installed 4.0.0) | `dist/button-BNDWhAZb.js` | direct import |
| `@mkbabb/glass-ui/styles` cascade | `dist/styles/index.css`, `src/styles/tokens/offsets-sizing.css`, `src/styles/glass/surfaces.css` | the Button's token contract |
| `@mkbabb/value.js` | installed 0.13.0 · source 4.0.0 (this repo) | `lib/easings.ts` peer floor |

**Read for seam/consumer truth (not part of the closure):** `AnimationControls.vue` (the sole
mount, line 119), `BasisCanvas.vue` (the render watcher), `VisualizationView.vue` (the persist
watcher), `composables/useWorkspaceLoader.ts` (the seed path), `MorphPhaseConfig.vue` (the
in-tree twin), `api/models/shared.py` (the persisted domain).

**Corpus folded (not re-invented).** `formation/fourier/CENSUS-2026-08-03.md` §3a; `formation/fourier/lane-frontend.md` §4/§5/§6/§8 (lines 96, 99, 310, 409–413, 480, 490–492, 565, 629, 636–641); `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` rows **R5-7** and **R6-5** (both ADOPT-AS-FACT) and correction row **X-1**. Where the tree disagrees with the corpus I say so explicitly — see **M-4** and **B-1**.

**Tally.** defects **17** (BLOCKER 1 · MAJOR 4 · MINOR 6 · INFO 6) · blockers **1** · superlatives **5**.

---

## §0 — What this component actually is, on the viz render path

Census §3a is the authority: fourier is **Canvas2D throughout, WebGL/WebGPU ABSENT**, with
*three independent canvases* — the epicycle instrument redrawing off a store rAF clock,
`ConvergencePlot` on its own ungated rAF, `FrequencyGraph` watch-driven — **plus 12 SVG
surfaces** (`CENSUS-2026-08-03.md:85-87`, `lane-frontend.md:565` enumerates
`EasingCurvePreview.vue` as one of the twelve).

`EasingPicker` touches that path at exactly two points, and neither is a canvas:

1. **As one of the 12 SVG surfaces** — 6 `EasingCurvePreview` instances per open menu, each a
   33-point `<path>` polyline (`lib/easings.ts:89-97`). No canvas, no WebGL, no rAF.
2. **As the sole UI writer of `anim.easing`** — which feeds the `easedT` computed
   (`stores/animation.ts:27-30`), which the **epicycle canvas's 60 fps render watcher lists
   explicitly** (`BasisCanvas.vue:417-422`, `[() => anim.t, () => anim.easedT, …]`) and which
   `AnimationControls.vue:44,47` reads for its caret label.

So the component is a *write-only* participant in a Canvas2D render path it never draws to.
That framing is what makes **S-2** and **S-3** load-bearing, and what bounds **M-3**'s blast
radius.

---

## §1 — BLOCKER

### B-1 · `BLOCKER` · The whole import closure fails to resolve at value.js 4.0.0 — and half of it has no cure at all

**Provenance.**
`web/src/lib/easings.ts:9` — `import { timingFunctions } from "@mkbabb/value.js";`
`web/src/lib/easings.ts:10-16` — `import { easeInOutSine, easeInOutCubic, easeInOutQuad, easeInOutExpo, easeInOutCirc } from "@mkbabb/value.js";`
Chain: `EasingPicker.vue:3` → `stores/animation.ts:4-7` → `lib/easings.ts:9,16`.

**Primary source (value.js 4.0.0, this repo).** `package.json` `exports` enumerates
`./color ./value ./css ./easing ./math ./transform ./quantize` and **no `"."` key**. A bare-root
specifier is therefore `ERR_PACKAGE_PATH_NOT_EXPORTED` at 4.0.0 — this corroborates
`lane-frontend.md:480` and census C-7 ("latent, not live") from the producer side rather than
the consumer side.

**The part the corpus does not say.** `lane-frontend.md:640` grades this
*"[P1] … the cheapest leg of the deadlock"* (5 sites, `easeInOutSine` + `timingFunctions`).
**That is true for one half of `lib/easings.ts` and false for the other.**

- The `ANIMATION_EASINGS` half — the half `EasingPicker` consumes — re-homes by a *one-line
  specifier swap*: `src/subpaths/easing.ts:8-24` exports all five `easeInOut*` verbatim.
- The `EASING_PRESETS` half — co-resident in the same module, evaluated at module load
  (`lib/easings.ts:55-60`) — depends on **`timingFunctions`, which does not exist anywhere in
  value.js 4.0.0**. `grep -rn "timingFunctions" src/` over the 4.0.0 tree returns **zero
  hits**; it was deleted, not re-homed. The 4.0.0 replacements are
  `easing(name): Result<EasingFunction, EasingIssue>` (`src/easing.ts:166`) and
  `bezierPresets` (`src/easing.ts:67`, control-point tuples) — a **Result-returning resolver
  and a tuple table**, not a `Record<string, EasingFn>`.

So the cure for the module `EasingPicker` imports through is not a specifier rewrite; it is a
rewrite of `EASING_PRESETS`/`getEasingFn`/`easingCurvePath` through a `Result` API, with
`EASING_PRESETS`' declared `Record<string, EasingPreset>` shape (`lib/easings.ts:55`) having to
absorb an error arm it currently has no vocabulary for.

**Severity rationale.** Gated on the tri-package bump — but that bump is the declared program
of record and is **atomic and indivisible** (`lane-frontend.md:490-492`, census §3a "THE
RESOLUTION DEADLOCK"): `glass-ui 4→7 ∧ keyframes 4.3→6 ∧ value.js 0.13→4.0`, none lands alone.
There is no ordering in which `EasingPicker` survives the bump untouched.

**Falsifier.** A `"."` key in value.js 4.0.0's `exports`, **or** a `timingFunctions` symbol
anywhere in its 4.0.0 surface, kills this row. Both checked directly against
`/Users/mkbabb/Programming/value.js/package.json` and `src/**` at 4.0.0 — **both absent**.

---

## §2 — MAJOR

### M-1 · `MAJOR` · `EasingCurvePreview`'s `size` prop is inert inside a glass-ui `<Button>` — the primitive re-sizes every unclassed descendant `<svg>`

**Provenance.** glass-ui 4.0.0 Button CVA base string, `dist/button-BNDWhAZb.js`:

```
"btn-pill tap-squish focus-ring whitespace-nowrap text-[length:var(--control-text)] font-medium
 cursor-pointer … [&_svg:not([class*=size-])]:size-(--ui-glyph) [&_svg]:shrink-0 …"
```

`--ui-glyph: calc(1rem * var(--ui-scale))` (`src/styles/tokens/offsets-sizing.css:177`).
`EasingCurvePreview.vue:23` gives its root `<svg>` `class="easing-preview"` — which does **not**
contain the substring `size-`, so `:not([class*=size-])` matches and the rule applies. The
producer's own comment names this escape hatch explicitly
(`offsets-sizing.css:175-176`: *"KEEPING the `:not([class*=size-])` host-sized-icon escape
intact (an explicit `size-9` still wins)"*) — the escape exists and this call site does not use it.

**Cascade (proven).** `EasingCurvePreview.vue:21-22` sets `width`/`height` as SVG **presentation
attributes**, whose specificity is zero and which lose to any author rule. The component's own
scoped rule `.easing-preview[data-v-…]` (`EasingCurvePreview.vue:37-40`) declares only `display`
and `flex-shrink`, so it does not defend the geometry. Result: the preview paints
`var(--ui-glyph)` **square** — 16 px at desktop, 24 px under the coarse-pointer default
(`--ui-coarse-scale: 1.5`, `offsets-sizing.css:139-143`) — never 28×19.6.
`:size="28"` (`EasingPicker.vue:32`) and `size * 0.7` (`EasingCurvePreview.vue:22`) are both dead.

**Falsifier + honest limit.** The cascade leg is proven from source. The **emission** leg is
`UNPROVEN-NEEDS-BUILD`: the utility must be compiled into the consumer's CSS. glass-ui ships the
backstop that does it — `@source "../*.js"` at `dist/styles/index.css:214`, which in the shipped
context resolves to `dist/*.js` and reaches `button-BNDWhAZb.js` (the file's own comment,
lines 185-213, documents exactly this repair). fourier imports that cascade at
`web/src/style.css:3`. **Counter-evidence considered and rejected:** the checked-in
`web/dist/assets/index-*.css` (Jun 12) contains no `svg:not([class*=size-])` — but that build
also contains no `--control-h-*` and no `--ui-glyph` *at all*, and its `.btn-pill` carries a
literal `font-size:1rem` where the installed 4.0.0 source carries `font-size: var(--control-text)`
(`src/styles/glass/surfaces.css:136`). The dist predates the installed glass-ui and is not
evidence about it. **To kill this row:** `npm run build` in `web/` and
`grep "svg:not(\[class\*=size-\])" dist/assets/*.css`; if absent, M-1 dies.

### M-2 · `MAJOR` · The viewBox is mis-proportioned against the element box — the curve paints in ~19 % of its own surface, and 37.5 % of the viewBox is dead allowance

**Provenance.** `EasingCurvePreview.vue:19-22` — `viewBox="-0.05 -0.3 1.1 1.6"`,
`preserveAspectRatio="xMidYMid meet"`, `:width="size"`, `:height="size * 0.7"`.

**Arithmetic (independent of M-1; it holds even if the `size` attributes survive).**
viewBox aspect = 1.1/1.6 = **0.6875** (portrait). Element aspect = 28/19.6 = **1.4286**
(landscape). With `meet`, the uniform scale is `min(28/1.1, 19.6/1.6) = min(25.45, 12.25)` =
**12.25 px/unit**, i.e. the *vertical* axis binds. The drawn curve spans 1.0×1.0 user units, so
it paints **12.25 × 12.25 px inside a 28 × 19.6 px element** — 19 % of the element area, with
**7.9 px of dead gutter on each side**. The declared `size * 0.7` landscape ratio and the
portrait viewBox are pulling against each other; one of the two is wrong.

**The dead allowance, measured not assumed.** The `-0.3` origin + `1.6` height reserve ±0.3 for
overshoot. I sampled all six `ANIMATION_EASINGS` (`lib/easings.ts:74-81`) at the same 33 points
`generateCurveSVGPath` uses, against the installed `@mkbabb/value.js@0.13.0`:

```
linear  min=0.000000 max=1.000000    circ  min=0.000000 max=1.000000
sine    min=0.000000 max=1.000000    expo  min=0.000000 max=1.000000
quad    min=0.000000 max=1.000000    cubic min=0.000000 max=1.000000
```

Every curve is exactly `[0,1]` — the catalogue is in-out-only by construction
(`lib/easings.ts:5-6`: *"ANIMATION_EASINGS: compact subset used by the animation store (in-out
only)"*) and carries **no back/elastic/bounce family**. Only `stroke-width/2 = 0.075`
(`EasingCurvePreview.vue:29`) is actually needed. `1.6` should be `≈1.15`.

**Falsifier.** Add any overshoot easing to `ANIMATION_EASINGS` and the vertical padding becomes
load-bearing, killing the "dead allowance" half (the aspect-mismatch half survives regardless).
None exists today — verified by reading the catalogue whole and by the numeric probe above.

### M-3 · `MAJOR` · The picker has no unknown-value posture over a store field whose domain is strictly wider than its option set

**The domain widening, end to end:**

| hop | file:line | shape |
|---|---|---|
| server model | `api/models/shared.py:69` | `easing: str = "sine"` — **bare `str`, no `Literal`, no enum** |
| wire type | `web/src/lib/types.ts:48` | `easing: string` |
| seed | `web/src/components/visualization/composables/useWorkspaceLoader.ts:56` | `if (as?.easing) anim.easing = as.easing as EasingName;` — **unchecked assertion, truthiness guard only** |
| store | `web/src/stores/animation.ts:24` | `ref<AnimationEasingName>("sine")` — 6-member union |
| picker | `EasingPicker.vue:26-27` | `:class="{ 'is-active': anim.easing === key }"` / `:aria-checked="anim.easing === key"` |

**Failure.** Any persisted string outside the six keys arrives in `anim.easing` unvalidated.
`EasingPicker` then renders **all six `role="menuitemradio"` chips with `aria-checked="false"`
and no `.is-active`** — a radio set with **zero** checked members, which is exactly the ARIA
invariant the component's own header comment (`EasingPicker.vue:10-15`) is arguing for. Meanwhile
`stores/animation.ts:28` (`ANIMATION_EASINGS[easing.value]?.fn ?? ((x) => x)`) silently degrades
playback to identity/linear. The user sees an unselected picker driving a linear animation, with
no surface anywhere naming the actual value, and no normalize-on-seed in any of the four hops.

**Reachability — stated honestly.** *Not* producible by in-app action: the sole write path
(`VisualizationView.vue:54-62`, the debounced persist watcher) only ever writes a valid
`anim.easing`. Reachable by (a) a direct API write — the Python model accepts it; (b) a legacy
stored document; (c) a rename of any `ANIMATION_EASINGS` key with documents already in flight;
(d) a morph-catalogue name (`"ease-in-out-back"`, `lib/easings.ts:34`) leaking into the field,
which is live-plausible because both catalogues sit in one module. Latent-but-unguarded, at four
consecutive hops, none of which guards.

**Falsifier.** A `Literal`/`Enum` on `api/models/shared.py:69`, a validating narrow at
`useWorkspaceLoader.ts:56`, **or** a fallback/"custom" chip in `EasingPicker.vue` kills this row.
All three checked — **all three absent**.

### M-4 · `MAJOR` · The "fourth fork" is real but mis-costed, and it is the *fifth* surface in-tree

**Corpus.** `lane-frontend.md:409-413` + `:641` (P2): retire `EasingPicker.vue` (98) +
`EasingCurvePreview.vue` (41) = 139 lines onto `glass-ui/easing`, citing the producer README's
*"no fourth fork"*. Census §3a repeats it as a HARD shadow (`CENSUS-2026-08-03.md:93-95`).
**The name collision is confirmed** — `glass-ui/src/components/easing/EasingPicker.vue` exists
and `easing/index.ts:3` exports `EasingPicker`.

**Where the tree disagrees — the swap is not drop-in.** The producer's `EasingPicker` is **518
lines** and is a *curve-authoring editor*, not a preset chip grid. Its `v-model` payload
(`glass-ui/src/components/easing/README.md:20-30`) is

```ts
{ mode: "bezier" | "steps"; css: string; fn: (t:number)=>number;
  points: [number,number,number,number]; steps: number; term: JumpTerm }
```

fourier's picker emits a **6-member string enum** that round-trips through an API field
(`api/models/shared.py:69`) and keys a `Record` lookup (`stores/animation.ts:28`). Re-homing
therefore requires either an `AnimationEasingName ↔ EasingPickerValue` adapter at the store
seam **or** a producer-side preset-chip mode — neither of which is in the 139-line budget.
The producer's own ownership note (`README.md` §"Ownership boundary") makes it worse: it
*deliberately* authors only CSS-reparseable bezier/steps curves and explicitly declines analytic
catalogues — fourier's `sine/quad/cubic/circ/expo` are analytic value.js functions, i.e. exactly
the family the producer declines to own.

**And the fork count is wrong.** Before the producer is counted, fourier already carries **two**
easing-curve SVG renderers over **two** samplers and **two** catalogues in one module:

| surface | file:line | sampler | geometry |
|---|---|---|---|
| chip preview | `EasingCurvePreview.vue:18-33` | `generateCurveSVGPath` (`lib/easings.ts:89-97`, 32 samples) | normalized `0-1`, viewBox `-0.05 -0.3 1.1 1.6` |
| morph select preview | `MorphPhaseConfig.vue:47-54` | `easingCurvePath` (`lib/easings.ts:115-127`, 24 samples) | pixel `40×20`, viewBox `0 0 40 20` |

Both root elements carry the **same class name `.easing-preview`** (`EasingCurvePreview.vue:23`
and `MorphPhaseConfig.vue:47`, styled at `:198`) — two scoped implementations converged on one
name without converging on one component. Budget the retirement as **2 catalogues + 2 samplers +
2 previews + 1 adapter**, not 139 lines.

**Falsifier.** A preset-chip mode or an enum-shaped `v-model` in the producer's `EasingPicker`
kills the "not drop-in" half; a single shared sampler kills the "fifth surface" half. Both
checked against `glass-ui/src/components/easing/{EasingPicker.vue,index.ts,constants.ts,README.md}`
and `lib/easings.ts` — neither holds.

---

## §3 — MINOR

### m-1 · `MINOR` · Three lookups of one catalogue, three different error postures — and the picker feeds the only unguarded one

| call site | guard |
|---|---|
| `lib/easings.ts:65-67` `getEasingFn` | `EASING_PRESETS[name]?.fn ?? EASING_PRESETS.linear.fn` — guarded |
| `stores/animation.ts:28` `easedT` | `ANIMATION_EASINGS[easing.value]?.fn ?? ((x)=>x)` — guarded |
| `lib/easings.ts:102-108` `getEasingSVGPath` | `ANIMATION_EASINGS[name].fn` — **bare index, TypeError on an unknown name** |

`EasingCurvePreview.vue:26` calls the unguarded one, and its argument arrives through the
unchecked assertion at `EasingPicker.vue:31`. Today the assertion is sound (the keys *are* the
union), so this is not live — but it is the same catalogue, in the same module, with the
sibling function three lines away doing it correctly.
**Falsifier.** A `?? linear` arm in `getEasingSVGPath` kills it — absent (`lib/easings.ts:105`).

### m-2 · `MINOR` · Two unverifiable `as EasingName` assertions where one typed source would do

`EasingPicker.vue:28` (`anim.easing = key as EasingName`) and `:31` (`:easing="(key as EasingName)"`).
The casts are **not gratuitous** — Vue's object `renderList` overload types the key as `string`,
not `keyof T` (`node_modules/@vue/runtime-core/dist/runtime-core.d.ts:1706`:
`renderList<T>(source: T, renderItem: <K extends keyof T>(value: T[K], key: string, index: number) …)`),
so the template genuinely cannot recover the union. But two unchecked assertions in a template are
two places TypeScript is switched off; `const keys = Object.keys(EASING_OPTIONS) as EasingName[]`
in `<script setup>` (`EasingPicker.vue:6`) makes it **one** cast, in a reviewable place, with the
loop then iterating an array and both template casts deleted.
**Falsifier.** If `renderList`'s object overload typed `key` as `keyof T`, the casts would be
redundant no-ops (a different, worse finding). Checked against the installed `@vue/runtime-core`
d.ts — it types `string`, so the casts are load-bearing and the row stands as written.

### m-3 · `MINOR` · Store-contract inconsistency: every other mutation is an action; `easing` is a bare ref written inline from a template

`stores/animation.ts:145` returns `{ t, easedT, playing, speed, duration, easing, scrubbing,
anyCanvasVisible, play, pause, toggle, seek, startScrub, endScrub, reset, setCanvasVisible }` —
eight actions guard the clock (`play`, `pause`, `toggle`, `seek`, `startScrub`, `endScrub`,
`reset`, `setCanvasVisible`), and `seek` even clamps (`:141`). `easing` is exposed raw and
mutated from a template expression (`EasingPicker.vue:28`). There is consequently **no seam** at
which M-3's normalization, or any persistence hook, could live — which is precisely why
`VisualizationView.vue:54-62` has to persist it by *watching* the ref from a third file.
**Falsifier.** A `setEasing` action in the store, or any other bare-ref template mutation in the
store's consumers, would weaken it. Neither exists.

### m-4 · `MINOR` · One accent decision, one literal, two files — and the filed upstream carry names a token the producer does not use

`EasingPicker.vue:49` — `--easing-accent: hsl(248 88% 71%)`.
`EasingCurvePreview.vue:12` — `color: "hsl(248 88% 71%)"` (prop default, byte-identical literal).
The carry comment (`EasingPicker.vue:44-47`) says *"Filed upstream as a glass-ui `--viz-easing`
token"* and justifies the local home with *"EasingPicker is the sole in-tree consumer"* — which
is false at the moment it is written, since the duplicate default sits in the sibling file.
**And the producer already solved this axis under a different name**: glass-ui's easing README
§"The single color event" declares the curve strokes `--motion-accent`, folded to
`--easing-curve-accent` with a `--viz-legendre` library-identity fallback; `--viz-legendre` is
live in the installed tokens (`src/styles/tokens/light-dark.css:147`, `dark-arm.css:115`,
`theme/bridges.css:191`). `--viz-easing` is **not** a glass-ui token name. The filed carry will
not land as filed.
**Falsifier.** A `--viz-easing` token anywhere in glass-ui, or a single accent home across the
two files — `grep -rn -- "--viz-easing" glass-ui/src/styles/` returns nothing; the literal is
duplicated verbatim.

### m-5 · `MINOR` · The chip half-adopts the primitive's sizing contract: box + glyph ride `--ui-scale`, the label does not, and the height is never neutralized

`.easing-chip` (`EasingPicker.vue:68-80`) overrides the primitive's `display`, `flex-direction`,
`padding` and `border-radius` — but **not** its `h-(--control-h-sm)`
(`= max(calc(2.25rem * --ui-scale), --control-floor)`, `offsets-sizing.css:150`). At desktop
identity the chip is pinned to 36 px while stacking glyph 16 (M-1) + gap 2
(`EasingPicker.vue:72`) + label ~9 + padding 6+4 (`:73`) ≈ **37 px**.
Worse, `.easing-chip-label { font-size: 0.5625rem }` (`EasingPicker.vue:89`) is a raw 9 px
literal that rides **nothing**, while the box and the glyph both ride `--ui-scale`. glass-ui's
sizing doctrine is explicit that this is the one thing not to do (`offsets-sizing.css:104-112`:
*"ONE unitless knob … grows control HEIGHT + PADDING + GAP + FONT-SIZE + GLYPH in LOCKSTEP,
proportion preserved, no per-component hack"*). Under the coarse-pointer default (1.5×) the box
grows to 54 px and the glyph to 24 px while the label stays 9 px — the chip's internal
proportions come apart on exactly the pointer class that most needs them.
**Falsifier.** A `height`/`min-height` in `.easing-chip`, or a `--control-text-sm`-derived label
size, kills it. Neither present (`EasingPicker.vue:68-94` read whole).

### m-6 · `MINOR` · Hidden arity coupling between a CSS literal and a constant in another module

`grid-template-columns: repeat(3, 1fr)` (`EasingPicker.vue:65`) lays out exactly two clean rows
**only because** `ANIMATION_EASINGS` has exactly six keys (`lib/easings.ts:74-81`) — a constant
two modules away, whose own doc comment (`:5-6`) invites growth ("compact subset"). A seventh
easing leaves a ragged single-item row; nothing in either file records the dependency, and the
`3` is not derived from anything.
**Falsifier.** A comment or a derived column count at either end — neither exists.

---

## §4 — INFO

- **i-1 · `INFO`** · `:size="28"` (`EasingPicker.vue:32`) restates `EasingCurvePreview`'s own
  default (`:11`). Redundant even before M-1 makes it inert.
  *Falsifier:* a default other than 28 — it is 28.
- **i-2 · `INFO`** · `ANIMATION_EASINGS[*].description` (`lib/easings.ts:76-81`, six authored
  strings: *"Gentle ebb and flow"*, *"Dramatic slow-fast-slow"*, …) has **zero consumers
  tree-wide** — `grep -rn "description"` over `web/src` returns no reader. Dead data, while the
  chips carry no `title`/tooltip and a 9 px label (m-5) is the only affordance. The descriptive
  text the UI wants already exists and is thrown away.
  *Falsifier:* any `.description` read — none.
- **i-3 · `INFO`** · `@reference "tailwindcss"` (`EasingPicker.vue:42`) references the **bare**
  Tailwind entry, not the app's `style.css` with its `@theme` overrides (`web/src/style.css:1-15`
  remaps `--font-sans`). It is present for a single `@apply text-sm` (`:57`). `text-sm` is
  unthemed, so the divergence is **latent, not live** — but any themed utility applied in that
  block would silently resolve against default-theme values. Separately, `text-sm` bypasses
  glass-ui's `--control-text` register (`offsets-sizing.css:160-166`), the same register the
  heading's siblings paint through.
  *Falsifier:* `@reference "../style.css"`, or no `@apply` at all — neither.
- **i-4 · `INFO` (upstream — glass BH relay)** · glass-ui's Button passes `{type: props.type,
  disabled: props.disabled}` to reka `Primitive` with `props.type` undefined at this call site
  (`dist/button-BNDWhAZb.js`), so each chip renders `<button>` **with no `type` attribute** —
  implicit `type="submit"`. Not live here (the menu is portaled to `<body>`, no ancestor form),
  but it is a producer-side default worth the standing relay.
  *Falsifier:* a `type: "button"` default in the Button — absent.
- **i-5 · `INFO`** · `getEasingSVGPath(easing)` is invoked from a **template binding**
  (`EasingCurvePreview.vue:26`) and so re-executes on every re-render — and all six previews
  re-render on every selection, because their `color` binding reads `anim.easing`
  (`EasingPicker.vue:33`). It is O(1) only because of a module-level `Map` two modules away
  (`lib/easings.ts:100-108`). The safety contract is invisible at the call site; a local
  `computed` would carry it locally.
  *Falsifier:* a `computed` wrapper, or an absent memo — the memo exists, the wrapper does not.
- **i-6 · `INFO`** · `withDefaults(defineProps<…>(), {…})` (`EasingCurvePreview.vue:4-14`) on a
  tree running **Vue 3.5.38** (`node_modules/vue/package.json`), where reactive props destructure
  with inline defaults is the current idiom and is already the recorded house style.
  *Falsifier:* Vue < 3.5 — it is 3.5.38.

---

## §5 — Superlatives (L-18, with falsifiers)

### S-1 · Zero teardown surface — nothing to leak

Both files read whole: **no** `onMounted`/`onUnmounted`/`onBeforeUnmount`, no
`addEventListener`, no `requestAnimationFrame`, no timer, no observer, no `watch`. `<script
setup>` in `EasingPicker.vue` is five lines (`:1-7`); `EasingCurvePreview.vue`'s is a props
declaration (`:4-14`). In a repo whose census flags an *ungated* rAF in a sibling
(`CENSUS-2026-08-03.md:87`, `ConvergencePlot` "with its own ungated rAF") this is the correct
posture, not an accident of triviality.
**Falsifier.** Any lifecycle hook, listener, or scheduling call in either file — none.

### S-2 · Frame-cost zero inside a 60 fps store — and it is the *only* one of the two menu clients that gets this right

`EasingPicker` reads exactly one store member, `anim.easing`, at three bindings
(`:26`, `:27`, `:33`). It **never** reads `anim.t` or `anim.easedT`. So the rAF clock that
re-renders the epicycle canvas 60×/s (`BasisCanvas.vue:417-422`) does not invalidate this
component at all. Its own parent does not manage it: `AnimationControls.vue:44,47` reads
`anim.easedT` and `:51` reads `anim.t`, so the caret label recomputes every frame while the dock
is expanded.
**Falsifier.** Any `anim.t` / `anim.easedT` reference inside `EasingPicker.vue` or
`EasingCurvePreview.vue` — `grep` over both files: none.

### S-3 · The write actually propagates while paused — the control is not inert

A picker that only mattered during playback would be a real defect, and it is the shape this
architecture invites (a store rAF clock driving a canvas). It does not happen:
`anim.easing` → `easedT` computed (`stores/animation.ts:27-30`) → the canvas render watcher
**lists `() => anim.easedT` explicitly alongside `() => anim.t`** (`BasisCanvas.vue:419`) →
`drawFrame()`. Selecting an easing repaints the epicycle canvas with no playback required.
**Falsifier.** A render watcher listing only `anim.t` would make the control inert while paused —
it lists both. *Honest limit:* at `t = 0` or `t = 1` every easing maps to the same value
(`f(0)=0, f(1)=1` for all six, numerically verified in M-2), so at an endpoint scrub position the
repaint is a no-op. That is inherent to easing, not a defect of this component.

### S-4 · The ARIA reasoning is correct **and** written down — and the rendering honours it

`EasingPicker.vue:10-15` argues that `role="group"` is an allowed `aria-required-children` member
of the parent `role="menu"` and that `menuitemradio` + `aria-checked` — not `aria-pressed` — is
the right child role for a mutually-exclusive set. Verified end to end: the parent really is a
`role="menu"` surface (`AnimationControls.vue:110-116`, glass-ui `DropdownMenuContent`, with the
sibling Speed group given the identical treatment at `:117`); `group` is a permitted child of
`menu`; `menuitemradio` requires `aria-checked` and it is bound at `:27`; and Vue renders
`:aria-checked="false"` as the **string `"false"`** rather than dropping the attribute, because
`aria-checked` is not in Vue's special-boolean-attribute set — so the unchecked members are
explicitly announced. This corroborates `lane-frontend.md:629`, which banks the same merit.
**Falsifier.** `aria-checked` being removed on `false` (it is not — `aria-*` is not a special
boolean attr), or `group` being disallowed under `menu` (it is not) — either would kill it.
*Cross-axis handoff (not scored here):* the six chips are plain `<button>`s, not reka `MenuItem`s,
so arrow-key roving focus will not reach them, and the visible "Easing" heading (`:17`) duplicates
the group's `aria-label` (`:16`) instead of being referenced by `aria-labelledby`. Both belong to
the **A** axis; flagged, not adjudicated.

### S-5 · The module-level cache reads like a leak and provably is not

`const _svgCache = new Map<AnimationEasingName, string>()` (`lib/easings.ts:100`) is module-scoped
and never cleared — the textbook shape of an unbounded memo leak. It is bounded: the key type is
the **closed six-member union** `AnimationEasingName` (`lib/easings.ts:71`), and the only writer
(`:106`) is keyed by that type. Maximum residency six strings, for process lifetime. Recorded as a
**refuted** defect rather than dropped, per L-18.
**Falsifier.** A `string` key type, or a second writer keyed by anything wider, would make it a
real leak — the type is `Map<AnimationEasingName, string>` and there is exactly one writer.

---

## §6 — R5-7 disposition (the template-loop invisibility class)

**Corpus.** `lane-fourier-r3-r6.md` row **R5-7** (ADOPT-AS-FACT, CARRY-TO-WAVE → F.W4):
*"template-loop evidence keyed to **component** callsites is blind to native HTML element
loops"* — `PaperSidebar.vue`'s three nested `<li v-for>` at lines 65/87/105 derive an **empty**
`instance.loop.paper-sidebar` leaf, while the sibling `instance.loop.presets` leaf is populated
and keyed by a *component* callsite. Row **R6-5** records the cure: a `NATIVE_TEMPLATE_LOOP`
family that recovers those 3 rows.

**Verdict for `EasingPicker`: the classic form does NOT apply.** The component's single `v-for`
(`EasingPicker.vue:20`) is rooted on a **component** — `<Button …>` — so a component-callsite-keyed
deriver sees it exactly the way it sees `instance.loop.presets`. There are **zero** native-element
loops in the file (`grep -n "v-for"` → one hit, line 20; no `<li>`, no `<ul>`). Recorded as a clean
negative rather than assumed.

**But two sibling blind spots of the same family apply, and should carry to F.W4:**

1. **Per-iteration native children survive the R6 cure.** The loop body emits a native
   `<span class="easing-chip-label">` on every pass (`EasingPicker.vue:35`) — 6 native element
   instances. R6's `NATIVE_TEMPLATE_LOOP` family counts loop **rows** (baseline
   `PaperSidebar` = 3 rows at 3 source lines), not per-iteration native **children**. A denominator
   built even on the *cured* model still misses these six.
2. **Object-source loops carry no recoverable arity.** R6's recorded evidence is the loop
   *expression* — verified in the intake for `PaperSidebar`: `(section, si) in sections`,
   `sub in section.subsections`, `subsub in sub.subsections`. Here the expression is
   `(opt, key) in EASING_OPTIONS`, whose source is (a) an **object**, not an array, and (b) an
   **imported const re-exported across two module hops** (`EasingPicker.vue:3` → `stores/animation.ts:10`
   → `lib/easings.ts:74`). Multiplicity **6** is recoverable only by cross-module constant
   evaluation; an expression-only record yields arity 1.

   **Net for this component:** derived instance count **2** (the two component callsites, Button
   and EasingCurvePreview) vs runtime **12** (6 + 6), plus **6** uncounted native spans — an
   18-instance surface deriving as 2. The R5-7 class is not cured by R6 for object-sourced loops;
   it is only cured for native-element *rows*.

**Falsifier for the whole section.** A native `v-for` in `EasingPicker.vue` would flip the
verdict to "classic R5-7 applies" (there is none); and a deriver that resolves imported const
arity would kill blind spot 2 (R6's own recorded evidence for `PaperSidebar` is expression-level,
per the intake row, so it does not).

---

## §7 — What I did not claim

- **No leak, no teardown defect** — asserted as a superlative (S-1), not passed over in silence.
- **No per-frame render cost** — hypothesised, then killed by the tree (S-2).
- **No "control is inert while paused" defect** — hypothesised from the store-rAF architecture,
  then killed by `BasisCanvas.vue:419` (S-3).
- **No unbounded-cache leak** — hypothesised from `lib/easings.ts:100`, then killed by the key
  type (S-5).
- **No module-size (Goldilocks) finding** — 98 lines of which 5 are script, 31 template, 58 style;
  `EasingCurvePreview` 41. Both are correctly sized; the split between them is right (the SVG
  primitive is genuinely separable). The only colocation complaint is m-4's split accent home,
  and i-2's dead `description` field.
- **Keyboard/roving-focus and label-duplication** are real but belong to the **A** axis; noted
  under S-4 and handed off, not scored here.
- **Nothing was claimed from a running browser.** The one leg that needs a build to close is
  M-1's emission half, marked `UNPROVEN-NEEDS-BUILD` with the exact command that settles it.
