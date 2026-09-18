claude-opus-5[1m]

# CHALLENGE C — `AnimationControls.vue` · CONSUMPTION axis

> **Subject** `fourier-analysis/web/src/components/visualization/AnimationControls.vue` (224 lines)
> **Axis** C — how this component consumes value.js `0.13.0`, keyframes.js `4.3.0`, glass-ui `^4.0.0`,
> and the fourier API's 45-operation surface; props/emits contract quality; integration seams.
> **Substrate** fourier `m/w1-bump-migration @ cd26c65` (2026-07-03, 28-path dirty WT) · value.js
> `tranche-u @ c654824e`. Installed: glass-ui 4.0.0 · keyframes.js 4.3.0 · value.js 0.13.0.
> **Method** static + source-derived only. Every producer claim is verified against the **installed**
> `node_modules` `.d.ts`/compiled JS, never against memory or a producer changelog. No browser.
> **Posture** the component is DEFECTIVE until the tree proves otherwise. Each row carries its own
> falsifier; L-18 runs both ways, so §6 books what survived my attempts to break it.

**Read whole (read-only):** the subject; `stores/animation.ts`; `stores/workspace.ts`; `lib/types.ts`;
`lib/easings.ts`; `lib/api.ts` (compute leaves); `lib/bases.ts`; `lib/colors.ts`;
`components/ui/tooltip/{Tooltip.vue,index.ts}`; `visualization/{GlassTimeline,EasingPicker,SpeedSelect,
FullscreenViewer,BasisCanvas,VisualizationView}.vue`; `e2e/visualization-ux.spec.ts`; and inside
`web/node_modules/@mkbabb/`: glass-ui `dock/{index,GlassDock.vue,DockDropdownTrigger.vue,
composables/useDockShellProps}.d.ts`, `timeline/{index,GlassTimeline.vue,types}.d.ts`,
`ui/slider/{index,Slider.vue}.d.ts`, `ui/dropdown-menu/index.d.ts`, `metric-badge/MetricBadge.vue.d.ts`
+ its compiled `MetricBadge-BpC0R_Ec.js`, `icon-tooltip/*.d.ts`, `styles/tokens/scheme-motion.css`,
`styles/typography/utilities.css`, `dist/dock.js`; keyframes `dist/keyframes.d.ts`; value.js
`dist/{index,easing}.d.ts`.

---

## §0 — Ledger

| # | Severity | Row |
|---|---|---|
| **C-1** | **BLOCKER** | `npm ls @mkbabb/value.js` exits `ELSPROBLEMS` — the pinned 0.13.0 is **invalid** against glass-ui 4.0.0's declared peer range |
| **C-2** | **BLOCKER** | The dock's own Speed control **destroys ping-pong direction**: every speed change / scrub-end / visibility-resume restarts the clock forward |
| **C-3** | **BLOCKER** | `FullscreenViewer` binds **four props/emits this component does not declare** — ghost + image-overlay toggles are unreachable in fullscreen, since 2026-03-16 |
| C-4 | MAJOR | Local `GlassTimeline.vue` is a **name-identical fork** of glass-ui's shipped `./timeline` `GlassTimeline` (`variant="scrubber"`) with a 1:1 API |
| C-5 | MAJOR | `--slider-scrub-track-height` **does not exist** in glass-ui 4.0.0 — the timeline's height override is dead CSS |
| C-6 | MAJOR | The fork **quantizes `t` to 1 %** on the slider axis the upstream scrubber takes as a raw float |
| C-7 | MAJOR | `.play-btn` hand-rolls ~48 declarations of glass chassis that `Button variant="glass"` ships — and the sibling `FullscreenViewer` already uses it |
| C-8 | MAJOR | Play/pause glyphs are **raw Font Awesome path data, duplicated 4×**, while `lucide-vue-next` is imported on line 6 and ships `Play`/`Pause` |
| C-9 | MAJOR | `EasingPicker` hand-rolls `role="menuitemradio"` on `<Button>` inside a reka menu; glass-ui exports `DropdownMenuRadioGroup`/`DropdownMenuRadioItem` |
| C-10 | MAJOR | Invented `--animation-dock-max-width` + a consumer `width:` override fight GlassDock's own resize spring; `--dock-max-inline-size` is the sanctioned knob |
| C-11 | MAJOR | The `t → N` derivation is **triplicated with divergent rounding** — this file rounds, `BasisCanvas` floors-and-lerps. The readout can disagree with the render |
| C-12 | MAJOR | `exportFrame` means two different things to its two consumers; the fullscreen path silently drops the whole options surface |
| C-13 | MAJOR | keyframes.js `Animation` was **excised from this transport** while the same tree still drives `useFourierMorph` with it — two animation engines, one repo |
| C-14 | MINOR | `.summary-speed { @apply text-base }` is inert — MetricBadge's amount span carries its own `text-mono-micro` font-size |
| C-15 | MINOR | `.summary-speed { color: … }` bypasses MetricBadge's typed `color` prop |
| C-16 | MINOR | The "More options" `Tooltip` anchors on a non-focusable `<svg>` **inside** the trigger — hover/touch-only, keyboard-invisible |
| C-17 | MINOR | `linear: (t) => t` is hand-rolled where value.js 0.13.0 exports `linear`; a second identity fallback is re-hand-rolled in the store |
| C-18 | MINOR | Zero value.js colour consumption while the component hand-authors a 7-stop `hsl()` ramp + 8 `color-mix()` arms |
| C-19 | MINOR | Reduced-motion asymmetry: the 2.5 s decoration is gated, the 60 fps clock this dock commands is not |
| C-20 | MINOR | `currentLevel` falls back to `1`, so the caret asserts a false `N = 1` during load |
| C-21 | MINOR | `epicycleData.components.length` is read where the payload also carries `n_components` |
| C-22 | MINOR | `activeBases: string[]` is an open string array over a closed vocabulary, consumed as a single bit |
| C-23 | MINOR | `maxWidth: string` is an unvalidated CSS length and its default is duplicated in two places |
| C-24 | MINOR | Split data-flow: `activeBases` by prop, level data by direct 471-line god-store reach-in |
| C-25 | MINOR | Store state written directly from the template ×2; every other transport verb is an action |
| C-26 | MINOR | The play button is duplicated verbatim (2 × 8 lines) with a silent `.stop` divergence |
| C-27 | MINOR | `"fourier-epicycles"` is a magic string at 6 sites across 3 files with no exported constant |
| C-28 | INFO | MetricBadge ships `cursor-pointer` + a focus ring in its base class; used here as a static readout |
| C-29 | INFO | The one e2e keystone covering this component's menu is `test.fixme` — the surface has no running gate |
| C-30 | INFO | Fold of intake **R6-8**: both client leaves this component depends on are structurally non-isolable from their operation leaves |

**30 findings · 3 BLOCKER · 10 MAJOR · 14 MINOR · 3 INFO · 7 superlatives (§6).**

---

## §1 — value.js consumption (0.13.0 pinned)

The component imports value.js **transitively only**: `@/stores/animation` → `@/lib/easings` →
`@mkbabb/value.js`. That transitive edge is the whole of its value.js surface, and it is the substrate
of `anim.easedT`, which drives `currentLevel` (`AnimationControls.vue:44,47`) and, through
`BasisCanvas`, every rendered frame.

### C-1 · BLOCKER — the pinned value.js is **invalid** against glass-ui's peer range

`web/package.json:14` pins `"@mkbabb/value.js": "^0.13.0"`; `node_modules/@mkbabb/value.js/package.json`
resolves 0.13.0. `node_modules/@mkbabb/glass-ui/package.json` declares
`peerDependencies["@mkbabb/value.js"] = "^0.10.0 || ^0.11.0"`. `node_modules/@mkbabb/keyframes.js/package.json`
declares a **hard** `dependencies["@mkbabb/value.js"] = "^0.13.0"`. The two ranges are disjoint: no
single value.js version satisfies both producers. Measured, exit non-zero:

```
$ npm ls @mkbabb/value.js
├─┬ @mkbabb/glass-ui@4.0.0
│ └── @mkbabb/value.js@0.13.0 deduped invalid: "^0.10.0 || ^0.11.0" from node_modules/@mkbabb/glass-ui
├─┬ @mkbabb/keyframes.js@4.3.0
│ └── @mkbabb/value.js@0.13.0 deduped invalid: "^0.10.0 || ^0.11.0" from node_modules/@mkbabb/glass-ui
└── @mkbabb/value.js@0.13.0 invalid: "^0.10.0 || ^0.11.0" from node_modules/@mkbabb/glass-ui
npm error code ELSPROBLEMS
```

This tree only installs because glass-ui marks the peer `optional: true`
(`peerDependenciesMeta["@mkbabb/value.js"].optional`). Optionality means *may be absent* — it is
present, and wrong. Every glass-ui primitive this component mounts (GlassDock, DropdownMenu,
MetricBadge, and — through `GlassTimeline` and `SpeedSelect` — Slider and Select) is running against a
value.js two minors ahead of anything its producer has declared support for.

**Severity BLOCKER** because this is a supply-chain gate, not an aesthetic one, and because the census
already names `npm ls` as the G33 gate carrying fourier evidence
(`CENSUS-2026-08-03.md` §3, "post-window `npm ls`") — the gate is presently RED and the census's §1
agreement row ("Pins: value.js `^0.13.0`/inst 0.13.0 · glass-ui `^4.0.0`/inst 4.0.0 — AGREE") records
the *versions* without recording that they are **mutually unsatisfiable**. This lane adds that.

**Falsifier** — run `npm ls @mkbabb/value.js` in `web/`. If it exits 0, or if glass-ui 4.0.0's
`peerDependencies` names a range containing 0.13.0, this row is dead. It does not and it does not.

### C-17 · MINOR — hand-rolled identity where the pinned dependency exports it

`lib/easings.ts:77` — `linear: { label: "Linear", fn: (t) => t, … }`. value.js 0.13.0 exports `linear`
by name (`dist/index.d.ts:27`, re-exported from `./easing`) and `timingFunctions.linear`
(`dist/easing.d.ts:106`), and `easings.ts:9` *already imports `timingFunctions` from that very module*
four lines earlier. A second identity is re-hand-rolled at `stores/animation.ts:29`
(`?? ((x: number) => x)`). Three identity functions where the dependency ships one.

**Failure scenario** — value.js changes `linear`'s float behaviour at an endpoint (clamping, or an
epsilon guard for `t` slightly outside `[0,1]`): `EASING_PRESETS.linear` (which *does* come from
`timingFunctions`) follows it; `ANIMATION_EASINGS.linear` — the one this component's Easing picker
actually selects — does not. The morph subsystem and the epicycle transport then disagree on the
meaning of "Linear".
**Falsifier** — if `timingFunctions.linear` were absent at 0.13.0 the hand-roll would be forced. It is
present; verified in `dist/easing.d.ts:106`.

### C-18 · MINOR — a colour-heavy component with zero value.js colour consumption

`AnimationControls.vue:159-164` hand-authors a 7-stop `hsl()` rainbow ramp; `:190-191` hand-authors two
`color-mix(in srgb, var(--foreground) N%, transparent)` arms; `:193` a third. value.js 0.13.0's
headline surface is exactly this (colour parsing, mixing, space conversion) and it is already an
installed direct dependency. The repo's parallel hand-roll — `web/src/lib/colors.ts` (117 lines:
`cssVarToHex`, `hslToHex`, `rgbToHex`, a bare-HSL-triplet regex, and no `oklch()` arm) — is the
"hand-rolled colors.ts arms" the mega-tranche books for deletion
(`CENSUS-2026-08-03.md` §3, W.L5 item 2).

**Honest scoping** — `colors.ts` is **not** in this component's import graph (`BasisCanvas` owns it), so
this row is *not* "AnimationControls consumes colors.ts". The claim is narrower and still true: the
tree's most colour-dense transport surface consumes **none** of the colour library it depends on,
which is why the `colors.ts` arm survives elsewhere unchallenged.
**Falsifier** — show a value.js colour import anywhere in this component's transitive graph.
`grep -rn "@mkbabb/value.js" web/src` → 5 statements, 4 files, **easing-only**; none reachable from
here except `lib/easings.ts`. Corroborates `CENSUS-2026-08-03.md` §1 ("5 import statements / 4 files /
6 symbols, easing-only").

### CONTRADICTION (explicit) — the bare-root specifier is *correct today*

`CENSUS-2026-08-03.md` §1 characterises the five value.js sites as "all bare-root specifiers that 4.0.0
no longer exports", and §4 F.W2 schedules "5 bare specifiers → `/easing`". Against the **installed**
tree that reads as a present-tense defect, and it is not one: value.js 0.13.0's `package.json` declares
**exactly one** export condition —

```json
"exports": { ".": { "types": "./dist/index.d.ts", "import": "./dist/value.js", "default": "./dist/value.js" } }
```

There is no `./easing` subpath at 0.13.0. The bare specifier is the *only* legal specifier at the pin,
and `easings.ts:9,16` are therefore **correct as written**. The migration is a consequence of the
version uplift (F.W1), not an independent consumption defect, and must not be scored as one on the
current tree. I confirm the census's own hedge — "latent, not live" — and sharpen it: **latent, and
un-actionable until F.W1 lands.**

---

## §2 — keyframes.js 4.3.0 consumption

### C-2 · BLOCKER — the Speed control destroys ping-pong direction

`AnimationControls.vue:96` and `:117` write `anim.speed = $event` (two `SpeedSelect` instances).
`stores/animation.ts:138-142` watches `speed` and, while playing, calls `stopRAF()` then `startLoop()`.
`startLoop` (`:53-75`) is the whole clock:

```ts
55:  let startTime: number | null = null;
56:  const dur = duration.value / speed.value;
…
63:      if (startTime === null) startTime = now - t.value * dur;
65:      const elapsed = now - startTime;
67:      const cycle = Math.floor(elapsed / dur);
68:      const frac  = (elapsed % dur) / dur;
69:      t.value = cycle % 2 === 0 ? frac : 1 - frac;   // even = forward, odd = reverse
```

Direction is **not state** — it is derived from `cycle`, and `cycle` is derived from a `startTime` that
is re-anchored from scratch on every restart. On the first tick after any restart,
`elapsed = t·dur`, so `cycle = Math.floor(t) = 0` for all `t ∈ [0,1)`, so `cycle % 2 === 0`, so
**playback always resumes forward**.

**Failure scenario (exact)** — play the epicycle animation; let it pass `t = 1` so it is on the reverse
leg with `t` descending, say `t = 0.62`. Open the dock, change Speed 1× → 2× (`:96`). The watcher fires,
the clock restarts, `startTime = now − 0.62·dur`, `cycle = 0`, and `t` immediately begins **ascending**
from 0.62. The traced curve reverses mid-stroke. `BasisCanvas:144` feeds the same `anim.t` into
`trail.update(...)`, so the trail kinks visibly at the flip.

Three further doors reach the same restart, all of them owned or triggered by this dock:
`endScrub()` (`:120-125`, reached from `GlassTimeline`'s `@value-commit` → `onValueCommit` →
`anim.endScrub()`), `setCanvasVisible(true)` (`:107-113`, on scroll-back-into-view), and
`play()` (`:84-88`, the play button at `:82`). **Every** transport verb this component exposes silently
resets direction.

**This is the consumption defect.** keyframes.js 4.3.0 — an installed, live dependency — ships
`DIRECTIONS = ["normal","reverse","alternate","alternate-reverse"]` (`dist/keyframes.d.ts:1411`),
`setDirection()` (`:329`), an "effective time accounting for direction reversal"
(`:531`), and an interruption contract stated verbatim as *"the first post-interruption frames therefore
continue the prior direction and speed within ε — no visible kink — instead of restarting from rest"*
(`:2528-2529`). The store's header comment (`stores/animation.ts:47-51`) records the decision to delete
it: *"The previous incarnation imported `Animation` from `@mkbabb/keyframes.js` … Dead substrate
excised."* The substrate that was excised is the substrate that owns this bug.

**Falsifier** — show any variable outside `startLoop`'s closure that survives `stopRAF()` and carries
direction. `grep -n "direction\|reverse\|cycle" web/src/stores/animation.ts` → the only hit is the
local `const cycle` at `:67`. There is none. Alternatively, show that `Math.floor(t·dur/dur)` can be
odd for `t ∈ [0,1)` — it cannot.
**Severity BLOCKER** — it is a correctness break on this component's own primary control, present since
the store was authored, reachable in one click.

### C-13 · MAJOR — two animation engines in one tree

`web/src/composables/useFourierMorph.ts:14` imports `loadAnimationEngine, type Animation` from
`@mkbabb/keyframes.js` and drives the morph phases through it (its own header: *"All transitions are
driven by keyframes.js Animation instances with easing functions (from value.js) applied to the
interpolation t"*). `stores/animation.ts` drives the epicycle transport through a hand-rolled rAF.
Same repo, same problem class (timed interpolation with easing over `[0,1]`), two engines with
different capabilities, different reduced-motion posture (C-19) and different interruption semantics
(C-2). The declared dependency is used for the *secondary* animation and rejected for the *primary* one.

**Falsifier** — if keyframes 4.3 lacked alternate-direction, a playback-rate knob, or a seek, the
hand-roll would be justified. It has all three: `DIRECTIONS` incl. `"alternate"` (`:1411`),
`setDirection` (`:329`), `play()`/`pause()` (`:514,520` and `:840,861`), plus a documented
velocity-continuous interruption path (`:2520-2536`). The justification does not exist.

### C-19 · MINOR — reduced-motion asymmetry inside one file

`AnimationControls.vue:178-180` gates the 2.5 s decorative rainbow drift under
`@media (prefers-reduced-motion: reduce)`. The 60 fps epicycle clock this same dock's play button
starts is ungated — `grep -n "reducedMotion\|prefers-reduced" web/src/stores/animation.ts` → no match.
keyframes 4.3 ships the honoring flag (`dist/keyframes.d.ts:690`: *"When true, `play()` honors
`prefers-reduced-motion: reduce`"*), unused. **Folds** `lane-frontend.md:624` (which books the gap and
notes WCAG 2.2.2 is arguably satisfied by the visible transport). I do not contest that reading; I add
that the *asymmetry within a single file* — decoration gated, substance not — is the tell that the
gating was applied by CSS habit rather than by contract.

---

## §3 — glass-ui ^4.0.0 consumption

Adoption is real and broad: `GlassDock`, `DockDropdownTrigger`, `DropdownMenu`/`Content`/`Item`,
`MetricBadge` here; `Slider`, `Select`, `Button`, `Tooltip` through the three children. Every subpath
used (`./dock`, `./dropdown-menu`, `./metric-badge`, `./slider`, `./select`, `./button`, `./tooltip`)
exists at 4.0.0 — verified against the package's `exports` map. What follows is where the adoption is
*nominal*.

### C-4 · MAJOR — a name-identical fork of a shipped primitive

`AnimationControls.vue:11` imports `GlassTimeline from "./GlassTimeline.vue"` — 127 local lines.
glass-ui 4.0.0 exports `./timeline` → `dist/components/custom/timeline/index.d.ts:1`
`export { default as GlassTimeline } from "./GlassTimeline.vue";`, alongside `ScrubberTimeline`,
`ContinuousTimeline`, `SegmentedTimeline`. The upstream props (`timeline/GlassTimeline.vue.d.ts:29-34`):

```ts
variant?: "scrubber" | "segmented" | "continuous";  // default "scrubber"
modelValue?: number;   /** 0..1 scrubber position. Required for scrubber variant. */
label?: string;        /** Tooltip caret text (scrubber variant only). */
```

documented as *"single-track normalized 0..1 scrubber with full keyboard a11y (role=slider + arrow-key
step + shift-step)"*. The local fork's entire public surface is `defineProps<{ label: string }>()` over
a `t ∈ [0,1]` model with a caret label. **The API is 1:1** — `modelValue` ← `anim.t`, `label` ←
`caretLabel`. `grep -rn "glass-ui/timeline" web/src` → 0.

**Folds** `lane-frontend.md:401-403` ("Name-identical, zero-import: the strongest shadow signal in the
tree") and `CENSUS-2026-08-03.md` §3 Shadows / §4 F.W3. **This lane adds the API-level proof** the
formation lane stops short of: not merely that a same-named component exists upstream, but that the
upstream `scrubber` variant's declared prop shape is a superset of the fork's, so the migration is a
two-line substitution, not a re-design. The lane's hedge — *"so it is a partial re-fork"* — is
over-cautious; the divergent surface it names (the caret label) **is a first-class upstream prop.**

### C-5 · MAJOR — the timeline's height override is dead CSS

`GlassTimeline.vue:123-125`:

```css
.timeline-slider { --slider-scrub-track-height: 24px; }
```

with the comment *"Retint the glass-scrubber variant tokens…"*. glass-ui 4.0.0 knows no such token.
Measured over the whole installed dist: `grep -ro "slider-scrub-track-height" node_modules/@mkbabb/glass-ui/dist | wc -l`
→ **0**. The complete `--slider-*` token surface is: `--slider-range-{bg,blur,shadow}`,
`--slider-thumb-{bg,border-color,shadow,size,spring}`, `--slider-track-{bg,height}`. The intended knob
is **`--slider-track-height`**.

**Failure scenario** — the timeline track renders at the `size` default `md` = 20 px
(`ui/slider/index.d.ts`: *"sm — 12px · md — 20px (default) · lg — 28px"*), not the 24 px the author
specified, at every viewport, in both docks. Silent: no build error, no lint, no test.
**Falsifier** — `grep -r "slider-scrub-track-height" node_modules/@mkbabb/glass-ui/`. Empty.

### C-6 · MAJOR — the fork *introduces* a 1 % quantization the primitive does not have

`GlassTimeline.vue:37-45`:

```ts
const tArr = computed<number[]>({
    get: () => [Math.round(anim.t * 100)],
    set: (arr) => { anim.seek(Math.max(0, Math.min(1, (arr[0] ?? 0) / 100))); },
});
```
`<Slider :min="0" :max="100" :step="1">`.

Two consequences. (a) **Scrub resolution is floored at 1 %** — with `duration = 20000 ms`
(`animation.ts:23`) one step is 200 ms of animation; a user cannot address a frame between them.
(b) **The caret and the fill desynchronise during playback**: the caret is positioned from the raw
float (`:57` `left: (anim.t * 100) + '%'`) and glides continuously, while the slider range advances in
1 % jumps from the rounded getter. Both are on screen simultaneously, 6 px apart
(`.timeline-caret { bottom: calc(100% + 6px) }`).

The upstream scrubber takes `modelValue?: number` as the raw normalized 0..1 position — no int scale,
no rounding. **The quantization is a cost of the fork, paid for nothing.**
**Falsifier** — if reka's `SliderRoot` refused float `step`, the scaling would be forced. The fork's own
comment asserts that ("reka-ui's SliderRoot uses integers", `:33-35`) but the upstream `GlassTimeline`
composes the same reka slider and exposes a float `modelValue`, which is the counter-example. The
visual desync itself is `UNPROVEN-NEEDS-LIVE` for SS-13; the arithmetic (`Math.round(t·100)` vs `t·100`)
is provable statically and is what I assert.

### C-7 · MAJOR — 48 declarations of hand-rolled glass where the design system ships it

`AnimationControls.vue:138-186` builds the play button by hand: `backdrop-filter: blur(12px)
saturate(1.4)` + `-webkit-` twin (`:151-152`), a rim border at `rgba(255,255,255,0.25)` (`:149`), a
three-part inset/drop shadow stack (`:156`), a `::before` gradient plane at `z-index:-1` (`:158-171`),
a `::after` specular sheen (`:172-178`), hover lift + press scale + a hand-rolled focus ring
(`:184-186`). glass-ui 4.0.0 exports `./button` with `variant="glass"` — and the **sibling component in
the same feature already uses it**: `FullscreenViewer.vue:113`
`<Button variant="glass" size="icon" class="fs-close">`. This is the standing
`feedback_glass_ui_first_class` edict inverted: the design system is the seat, the consumer is not.

**Falsifier** — if `variant="glass"` could not carry the rainbow `::before`, the hand-roll would be
partly justified. It carries it fine as a consumer `::before` over a `<Button variant="glass">`; and
what is *not* justified in any case is re-authoring the chassis (blur, rim, sheen, shadow ladder, focus
ring) that the variant owns. The distinctive part of this button is ~14 lines; the other ~34 are the
system's.

### C-8 · MAJOR — a third icon vocabulary, pasted four times

Line 6 imports `Download, EllipsisVertical` from `lucide-vue-next`. Lines 69-70 and 84-85 inline raw
`<path>` data under `viewBox="0 0 320 512"` and `"0 0 384 512"` — **Font Awesome** geometry, not lucide's
24×24 grid. `lucide-vue-next@1.0.0` ships `icons/play.js` and `icons/pause.js` (verified in
`node_modules`). So: one file, three icon vocabularies (lucide, Font Awesome path data, and the
hand-drawn SVGs in `EasingCurvePreview`), with the FA payload duplicated verbatim across the collapsed
and expanded blocks — 4 copies of 2 glyphs.

**Failure scenario** — a stroke-weight or optical-size change to the icon set lands in lucide and the
transport's two most prominent glyphs do not follow, because they are literal path strings in a
template. There is no seam to change them at.
**Falsifier** — `ls node_modules/lucide-vue-next/dist/esm/icons/ | grep -x "play.js\|pause.js"` → both
present.

### C-9 · MAJOR — a menu radio group hand-rolled inside a menu that ships one

`AnimationControls.vue:119` renders `<EasingPicker />` as a direct child of `DropdownMenuContent`.
`EasingPicker.vue:16-38` emits a `role="group"` wrapper containing `<Button role="menuitemradio"
:aria-checked="…">` chips. glass-ui 4.0.0's `ui/dropdown-menu/index.d.ts` exports
`DropdownMenuRadioGroup` and `DropdownMenuRadioItem` — the exact primitives for a mutually-exclusive
option set inside a menu.

**Failure scenario** — reka's menu manages roving focus and typeahead over items registered in its
internal collection. A raw `<button>` carrying a hand-written `role` is never registered. With the menu
open, ↑/↓ walk the registered items (the Export `DropdownMenuItem` at `:120`) and **skip all six easing
chips**; typeahead cannot reach them either. They remain reachable by Tab, so the surface is not
inert — it is off-pattern in a way an axe scan will not catch (roles and `aria-checked` are correct;
the *collection membership* is what is missing).

**CONTRADICTION (explicit)** — `lane-frontend.md:629` books this exact code as a superlative:
*"ARIA-correct radio-in-menu roles with a written rationale (`EasingPicker.vue:9-15` … `aria-pressed`
would mislabel a radio as a toggle)"*. The **rationale is right and I affirm it** — `menuitemradio` is
the correct role and `aria-pressed` would indeed be wrong. The **seat is wrong**: the tree reasoned its
way to hand-authoring a role that a shipped primitive assigns for free, together with the focus
management the hand-roll cannot reproduce. A correct hand-rolled ARIA attribute on an unregistered
element is not an adoption success; it is the most convincing possible symptom of non-adoption.
**Falsifier** — show `DropdownMenuRadioItem` absent at 4.0.0, or show reka registering arbitrary
`role="menuitemradio"` descendants in its item collection. The export exists; the registration is by
component, not by role.

### C-10 · MAJOR — an invented width contract fighting the dock's own

`:62` `:style="{ '--animation-dock-max-width': maxWidth }"` and `:134-136`:

```css
.animation-dock:where(.expanded) { width: min(var(--animation-dock-max-width, 960px), calc(100dvw - 1rem)); }
```

GlassDock's documented cap knob is `--dock-max-inline-size` (`useDockShellProps.d.ts`, `overflow` docs:
*"when the expanded content exceeds the dock's axis cap (`--dock-max-inline-size` horizontally,
`--dock-max-block-size` vertically)"*), and the dock animates its own width on the
`--dock-motion-resize` spring (`shape` docs: *"the pill↔card swap morphs on the `--dock-motion-resize`
spring"*). The consumer instead sets `width` directly on the primitive's root.

**Failure scenario** — the dock's expand animation interpolates `width`; the consumer rule sets `width`
at the same specificity tier on the same element, keyed off the `.expanded` class the dock toggles at
the *start* of the transition. The consumer value applies as a step function while the spring is
mid-flight. Whether that produces a visible snap is `UNPROVEN-NEEDS-LIVE` (SS-13); what is provable
statically is that two authorities write the same property on the same element, and that the sanctioned
one is unused (`grep -rn "dock-max-inline-size" web/src` → 0).
**Falsifier** — show `--dock-max-inline-size` absent at 4.0.0, or show that GlassDock does not animate
width. Both are contradicted by the installed `DockProps` docs.

### C-14 · MINOR — an inert typography override

`:194` `.summary-speed { @apply text-base; … }`. MetricBadge's compiled render
(`dist/MetricBadge-BpC0R_Ec.js`) puts the digits in
`<span class="metric-badge__amount … text-mono-micro">` for `size="sm"`, and
`styles/typography/utilities.css:50` defines `@utility text-mono-micro { … font-size: var(--type-micro); … }`.
A child that sets its own `font-size` does not inherit the parent's. The `text-base` therefore changes
nothing rendered. Dead CSS masquerading as a size override — and it *reads* as a fight with the
`size="sm"` prop on `:75`, which is the more dangerous reading for a future editor.

### C-15 · MINOR — a CSS override where a typed prop exists

`:195` `color: color-mix(in srgb, var(--foreground) 35%, transparent);`. MetricBadge declares
`color?: string` — *"Color applied to the value when it's non-empty"* — and applies it inline to the
amount span only. The CSS route reaches the amount by inheritance but **not the unit span**, which
carries a hard `text-muted-foreground` class in the compiled output. So the `1` recolours and the `×`
does not. That happens to match what the prop would do, which is why nobody noticed; it is still the
off-contract path, and it will diverge the moment MetricBadge's internal class list changes.

### C-16 · MINOR — a tooltip anchored to a non-focusable node

`:104-108`:

```html
<DockDropdownTrigger aria-label="More options">
    <Tooltip text="More options"><EllipsisVertical class="h-4 w-4" /></Tooltip>
</DockDropdownTrigger>
```

`ui/tooltip/Tooltip.vue` renders `TooltipTrigger as-child` around the slot, so the **`<svg>` becomes the
tooltip trigger**. An `<svg>` is not focusable, so the tooltip fires on hover/touch and is invisible to
keyboard users — for whom the trigger's `aria-label` is the only affordance.

**I decline the naive version of this finding.** `e2e/visualization-ux.spec.ts:176-178` records why the
tooltip is inside: *"the dropdown failed to position (Reka popper never measured) because a `<Tooltip>`
(a nested Reka PopperRoot) wrapped the `DockDropdownTrigger` anchor → moved the tooltip inside the
trigger"*. That is a real constraint and the fix was correct for the bug it cured. The consumption
finding is what was **not** reached for: glass-ui 4.0.0 exports `./icon-tooltip` →
`IconTooltip` with props `{ text: string }` + default slot — the same shape as the local shim, authored
by the producer against its own popper stack. The local `ui/tooltip` adapter is the reason the tree had
to discover the nested-PopperRoot failure itself.
**Folds** intake **R3-7a**, which I confirm against the live tree: this file holds **exactly 4** of the
booked 35 Tooltip callsites (`:66, :81, :94, :105`), matching the intake's per-file count precisely.
Same defect class at `:94-97`, where the trigger is a `<div class="hidden sm:block">`.

### C-28 · INFO — a false affordance from the primitive

MetricBadge's base class list is `"metric-badge cursor-pointer focus-visible:outline-2
focus-visible:outline-ring focus-visible:outline-offset-2"` — unconditionally, with no `interactive`
prop. Used at `:75` as a static speed readout inside the collapsed dock, it renders a pointer cursor
over non-interactive text. A producer-side seam, not the consumer's fault; booked because the consumer
is the one paying for it and because it belongs in the BH/BI relay.

---

## §4 — fourier API consumption (the 45-operation surface)

The component touches the API surface only through `useWorkspaceStore()`, at two leaves:
`store.basesData` ← `api.computeBases` → `POST /api/contours/{hash}/compute/bases`
(`lib/api.ts:345-363`) and `store.epicycleData` ← `api.computeEpicycles` →
`POST /api/contours/{hash}/compute/epicycles` (`lib/api.ts:330-343`).

### C-11 · MAJOR — the same derivation, three times, with divergent rounding

`AnimationControls.vue:39-50`:

```ts
if (basesData && basesData.levels.length > 0) {
    const pos = anim.easedT * (levels.length - 1);
    return levels[Math.round(pos)];                                     // ← rounds
} else if (epicycleData) {
    return Math.max(1, Math.ceil(anim.easedT * epicycleData.components.length));
}
```

`BasisCanvas.vue:229-240`:

```ts
const pos = anim.easedT * (levels.length - 1);
const lo = Math.floor(pos);                                             // ← floors
const hi = Math.min(lo + 1, levels.length - 1);
levelFrac = pos - lo;
level = levels[lo]; levelNext = levels[hi];                             // ← and lerps
…
level = Math.max(1, Math.ceil(anim.easedT * components.length));         // ← copy #3 (also :196)
```

**Failure scenario (exact)** — `levels = [1, 5, 9, …]`, `easedT` such that `pos = 2.6`. The dock's caret
asserts `N = levels[3]`. The canvas draws `levels[2]` blended 60 % toward `levels[3]` — i.e. it has not
yet reached `levels[3]`. The readout leads the render across the whole upper half of every inter-level
interval, and at `pos = k + 0.5` exactly it jumps a full level ahead (`Math.round(0.5) = 1`). On a tool
whose entire claim is *"this is the partial sum at N terms"*, the number and the picture disagree by
construction.

The epicycle arm is worse in a different way: `Math.max(1, Math.ceil(easedT · components.length))` is
byte-identical at three sites (`AnimationControls.vue:47`, `BasisCanvas.vue:196`, `BasisCanvas.vue:239`)
with no shared helper — while `lib/bases.ts` exists precisely to hold shared client-side basis math
(`evaluateBasis`, `fourierPositionsAt`) and holds no level-mapping function.

**Falsifier** — show a shared `levelAt(t)` the two files both call, or show that `Math.round(pos)` and
`Math.floor(pos) + frac` agree. `grep -rn "easedT" web/src` → 5 sites, no shared helper; the arithmetic
disagrees on every non-integer `pos`.

### C-20 · MINOR — `1` used as a loading sentinel

`:49` `return 1;` when both datasets are null. The caret then reads a confident `N = 1` while the
compute round-trip is in flight (`store.computing` is true and is not consulted here). `1` is also a
legitimate value, so the readout is indistinguishable from a real first-harmonic state.
**Falsifier** — show `computing`/`loading` consulted anywhere in this file. `grep -n "computing\|loading"
AnimationControls.vue` → no match.

### C-21 · MINOR — two sources for one count

`:47` reads `epicycleData.components.length`. `lib/types.ts:22-24` declares
`EpicycleData { n_components: number; components: BasisComponent[]; … }` — the server sends the count
explicitly. Reading `.length` instead means the client silently disagrees with the server whenever the
array is truncated, paginated, or reshaped. `grep -rn "n_components" web/src` → the field is **never
read anywhere in the client**; a shipped API field with zero consumers, and its shadow computed by hand.

### C-30 · INFO — fold of intake R6-8

The adjudicated intake (`lane-fourier-r3-r6.md`, row **R6-8**, TRUE + ADOPT-AS-FACT) establishes that
fourier's operation records embed derived client back-references (`"clients": ["client:updateVisualization"]`,
`"clientDisposition": "CLIENT_MATCH_SOURCE_DERIVED"`), so *"the two leaves are structurally
non-isolable by construction"*. Both leaves this component depends on
(`client:computeBases` / `operation:POST:/api/contours/{hash}/compute/bases`, and the epicycles pair)
inherit that property. **Consequence for this audit, stated so the wave inherits it:** a future
conformance fixture that changes `computeBases`' request shape — e.g. moving the `levels` array
construction out of `workspace.ts:322-325`, where it is presently a five-operator expression inlined in
the store — will produce R6-8's ambiguous two-sided failure and cannot attribute it to the client. This
component is a *reader* of those leaves, so it is not the defect site; it is the surface that will
display the ambiguity. No contradiction with the intake; a scoping note.

---

## §5 — props / emits contract + integration seams

### C-3 · BLOCKER — four bindings to a contract that no longer exists

`AnimationControls.vue:28-30` declares **one** emit and `:15-26` **two** props:

```ts
defineProps<{ activeBases?: string[]; maxWidth?: string }>()
defineEmits<{ (e: "exportFrame"): void }>()
```

`FullscreenViewer.vue:131-139` binds **six**:

```html
<AnimationControls
    :active-bases="activeBases"
    :show-ghost="showGhost"                     ← not a prop
    :show-image-overlay="showImageOverlay"      ← not a prop
    max-width="60rem"
    @toggle-ghost="emit('toggleGhost')"         ← not an emit
    @toggle-image-overlay="emit('toggleImageOverlay')"  ← not an emit
    @export-frame="canvasComponent?.exportFrame()"
/>
```

Four of the six land in `$attrs`. GlassDock spreads `$attrs` onto its root `<div>`
(`dist/dock.js`: `j({ ref_key: "dockEl", ref: _ }, t.$attrs, { class: ["glass-dock", … ] })`), so the
DOM receives literal `show-ghost="true"` / `show-image-overlay="false"` attributes and two native
listeners bound to event types (`toggleghost`, `toggleimageoverlay`) that nothing dispatches.

**Failure scenario** — enter fullscreen. `FullscreenViewer` renders only the close button, `BasisCanvas`
and `AnimationControls` (`:110-141`); `CanvasControlsDock` — which owns the ghost and overlay toggles
(`CanvasControlsDock.vue:24,59`) — is **not** in the fullscreen tree. The two toggles are therefore
**unreachable in fullscreen**, and `FullscreenViewer`'s own `toggleGhost`/`toggleImageOverlay` emits
(`:22-23`), wired by `VisualizationView.vue:285`, can never fire. A user who enters fullscreen with the
ghost path on cannot turn it off.

**Provenance (git, decisive)** — the bindings were live and correct at `3a0d407` (2026-03-14).
`2f53d5d` (2026-03-16, *"replace overlay buttons with canvas controls dock"*) moved the toggles out of
`AnimationControls` **and did not touch `FullscreenViewer`**. `ca58321` (2026-05-26, B.W2) then edited
the *very same JSX block* to add `max-width="60rem"` — three lines from the four dead bindings — and
left them. `504844a` (2026-06-01, *"green-means-green — e2e suite green"*) shipped over it. The
regression has been live **~4.5 months** and has survived a same-block edit and a green-gate commit.

The irony is documented in the tree: `AnimationControls.vue:19-22`'s own doc-comment announces that
`maxWidth` *"Replaces the cross-component `--animation-dock-max-width` CSS-var contract (formerly fed by
FullscreenViewer's scoped `.fs-controls`)"* — the author was reasoning carefully about this exact seam,
in this exact commit, and did not see the four dead bindings above the line they added.

**Falsifier / open horn** — I did not run `vue-tsc -b` (read-only law), so I state both horns and both
are defects: **(a)** if `vue-tsc` flags unknown component props, the tree is presently **build-RED** on
its declared build script (`package.json:8` `"build": "vue-tsc -b && vite build"`); **(b)** if it does
not, this is a **silent runtime feature loss**. The commit history above is strong evidence for (b) —
three subsequent commits, one of them a CI-hardening commit, passed over it. To falsify the row
entirely you would have to show either a `showGhost` prop on `AnimationControls` (there is none:
`grep -n "showGhost" AnimationControls.vue` → no match) or a ghost toggle inside the fullscreen tree
(there is none: `FullscreenViewer.vue:110-141` renders three children, and `CanvasControlsDock` is not
among them).

### C-12 · MAJOR — one emit, two incompatible meanings

`VisualizationView.vue:236` → `@export-frame="handleExportFrame"` → `:98`
`function handleExportFrame() { showExport.value = true; }` — opens the export **modal**, which collects
options and calls `canvasComponent.value?.exportFrame(options)` (`:100`).
`FullscreenViewer.vue:138` → `@export-frame="canvasComponent?.exportFrame()"` — calls the canvas
**directly, with no options**.

`BasisCanvas.vue:462` `function exportFrame(options: Record<string, boolean> = {})` destructures
`withGrid`/`withLabels`, both defaulting `true` (`:466-469`).

**Failure scenario** — a user sets "export without labels" in the modal, then enters fullscreen and
exports again from the identical-looking menu item. Labels are back, silently: the fullscreen path
never reaches the options surface. Same affordance (`:120-123`, `<Download/> Export`), same emit, two
behaviours.

Compounding: `Record<string, boolean>` is a stringly-typed bag over a closed two-key vocabulary, so
`{ withLabel: false }` (singular) compiles clean and does nothing. The emit itself carries no payload,
which is why the divergence had to be resolved at each call site.
**Falsifier** — show the fullscreen path reaching `ExportModal`. `grep -n "showExport\|ExportModal"
FullscreenViewer.vue` → no match.

### C-22 · MINOR — an open type over a closed vocabulary, consumed as one bit

`activeBases?: string[]` (`:17`) is used at exactly one place — `:35-37`, to compute the boolean
`isEpicycleOnly`. The vocabulary is closed: `lib/types.ts:10` types the server's basis as
`"fourier" | "chebyshev" | "legendre" | string` (itself widened to death by the trailing `| string`),
plus the client-only pseudo-basis `"fourier-epicycles"`. A `string[]` accepts `["fourrier"]` silently,
and the component then reports `N = …` for a basis that does not exist.
**Falsifier** — show a use of `activeBases` beyond the `isEpicycleOnly` predicate. There is none.

### C-23 · MINOR — an unvalidated CSS length with a duplicated default

`maxWidth?: string` (`:23`) is interpolated straight into a custom property at `:62`. `"60rem"`,
`"960px"`, `"banana"` and `"; color: red"` are all `string`. Its default is written twice —
`maxWidth: "960px"` at `:25` and the CSS fallback `var(--animation-dock-max-width, 960px)` at `:135` —
so a change to one silently diverges from the other. (The prop always renders, so the CSS fallback is
presently unreachable; that is what makes the divergence silent rather than visible.)

### C-24 · MINOR — a data-flow split down the middle

`activeBases` arrives as a prop; the level data it interprets is fetched by reaching directly into the
471-line `useWorkspaceStore` (`:33, :40-41`) — a store that also owns the router, image upload, draft
autosave, ETag/If-Match round-trips and abort plumbing. A transport dock is coupled to the entire
workspace lifecycle to read two `shallowRef`s. The consequence is testability: the component cannot be
mounted without a router-bearing Pinia instance.

### C-25 · MINOR — template writes to store state where actions exist

`:96` and `:117` `@update:model-value="anim.speed = $event"`; `EasingPicker.vue:31`
`@click="anim.easing = key as EasingName"`. Legal in a setup store, but every other transport verb —
`play`, `pause`, `toggle`, `seek`, `startScrub`, `endScrub`, `reset`, `setCanvasVisible` — is an action.
Speed and easing are the two that carry a side effect (`watch(speed, …)` restarts the clock,
`animation.ts:138`), so they are precisely the two that should not be raw writes. C-2 is what that
costs.

### C-26 · MINOR — the play button, twice

`:66-73` and `:81-88` are the same 8 lines: same `aria-label` ternary, same `Transition`, same two
`<svg>` payloads. They diverge in exactly two tokens — the `play-btn--mini` class and `@click.stop` vs
`@click`. Nothing marks the `.stop` as deliberate (it is — see S-7), so a future edit to one block will
not reach the other. This is also the mechanism by which C-8's path data reached 4 copies.

### C-27 · MINOR — `"fourier-epicycles"` at six sites

`AnimationControls.vue:25,36` · `BasisCanvas.vue:39,197` · `VisualizationView.vue:46,122`. Three files,
two of them also *defaulting* to it. `lib/bases.ts` is the natural home and exports no such constant.
A rename of the pseudo-basis is a six-site grep with no type to catch a miss (see C-22).

### C-29 · INFO — the one gate over this surface is disabled

`e2e/visualization-ux.spec.ts:192` — `test.fixme("keystone: AnimationControls dropdown-open is
a11y-clean", …)`. The `fixme` is honest and well-documented (the residual is a vendored glass-ui
`aria-hidden-focus` on collapsed configurator layers, booked in `ADOPTION-ASKS.md`), and I do not
challenge the decision. I book the consequence: **the dropdown surface this component owns — the menu,
the easing radio set (C-9), the nested speed combobox — has no running assertion of any kind.** Every
defect in §3 that lives inside that menu is un-gated in CI by construction.

---

## §6 — Superlatives (L-18, both ways)

Each of the following is something I tried to break against the installed producer and could not.

**S-1 · The dock transport props are exactly right.** `:60-61` passes `:collapse-delay="2000"` and
`:start-collapsed="true"`. Both are real `DockProps` members — `useDockShellProps.d.ts:107`
`collapseDelay?: number`, `:113` `startCollapsed?: boolean`. No invented dock API, no prop that would
have silently fallen through to `$attrs` (which, given C-3, was the first thing I checked).

**S-2 · The one selector reaching into the primitive's internals is correct.** `:134`
`.animation-dock:where(.expanded)` depends on GlassDock emitting a bare `expanded` class on the root
that Vue's scoped-style attribute also lands on. Verified in the compiled dock:
`class: ["glass-dock", …, { expanded: W.value, collapsed: !W.value, pinned: …, "fit-content": … }]`.
Correct at 4.0.0. (What the rule then *does* with that hook is C-10; the hook itself is sound.)

**S-3 · Zero hand-rolled motion constants.** Every motion and layering token used —
`--ease-standard` (`:180, :212, :216` and `EasingPicker.vue:83`), `--ease-out-expo`
(`FullscreenViewer.vue:238`), `--z-popover` (`GlassTimeline.vue:65`) — resolves from glass-ui's token
layer (`styles/tokens/scheme-motion.css:216, 219, 344`; bridged at `styles/theme/bridges.css:325, 328`),
imported at `src/style.css:3` `@import "@mkbabb/glass-ui/styles"`. Not one bezier literal, not one
magic z-index. The `A.W3.d` comments at `:211` and `EasingPicker.vue:82` record the migration that got
it there, and the rule they enforce — named properties, never `transition: all` — holds throughout both
style blocks.

**S-4 · The value.js easing key surface is consumed exactly.** `lib/easings.ts:29-52` builds
`EASING_PRESETS` by indexing `timingFunctions` with 22 authored keys. I checked all 22 against
`value.js/dist/easing.d.ts:105-160` one by one — `linear`, the four `ease-*` CSS names, the three
`*-back` variants, and all 12 `ease-{in,out,in-out}-{quad,cubic,sine,expo,circ}` forms. **Every key is
present.** `EASING_PRESETS` cannot produce an `undefined` `fn`, which is exactly the failure a
`Record<string, …>` cast normally hides. The `as EasingFn` on `:34` is doing no lying.

**S-5 · The one live glass-* selector in the tree is genuinely live.** `GlassTimeline.vue:103`
`.timeline-row:has(.glass-slider[data-held]) .timeline-caret { opacity: 1 }` depends on two internals:
the class `glass-slider` (17 occurrences in the installed dist) and the attribute `data-held`
(15 occurrences), the latter documented on `Slider.vue.d.ts:9-16` as the dock-held reflection. Both
real. `lane-frontend.md:382` reaches the same conclusion by a different route ("All 11 `glass-scrubber`
… occurrences are prose comments only … The one live selector is `GlassTimeline.vue:103`) — I confirm
it against the producer's dist rather than against the consumer's source.

**S-6 · The off-screen rAF gating is real engineering.** `stores/animation.ts:41-53, 95-113` —
reference-counted canvas visibility (`visibleCanvases`), so the clock parks when the last canvas leaves
the viewport and resumes when one returns, with `playing` correctly retained as *user intent* rather
than conflated with the clock. The comment explains why the count is needed (inline + fullscreen
canvases mount simultaneously). This is the substrate every claim in §2 rests on, and it is better than
what most trees do. C-2 is a bug *inside* good architecture, not instead of it.

**S-7 · `@click.stop` on the collapsed play button is deliberate and correct.** `:67` stops the click
from reaching GlassDock's own click-to-expand, so the mini transport toggles playback without expanding
the dock; `:82`'s expanded twin correctly omits it, because there is nothing left to expand. Two lines
apart, opposite modifiers, both right. (C-26 books that nothing *says* so.)

---

## §7 — Corpus reconciliation

| Corpus row | This lane |
|---|---|
| `lane-frontend.md:401-403` — local `GlassTimeline` is "the strongest shadow signal in the tree", but "a *partial* re-fork" | **CONFIRMED + SHARPENED** (C-4). The hedge is unnecessary: upstream `variant="scrubber"` declares `modelValue: number (0..1)` **and** `label: string`, so the fork's sole "divergent surface" is a first-class upstream prop. Migration is a substitution, not a redesign. |
| `lane-frontend.md:629` — `EasingPicker`'s `menuitemradio` roles booked as a superlative | **CONTRADICTED** (C-9). Rationale affirmed, seat rejected: glass-ui 4.0.0 exports `DropdownMenuRadioGroup`/`DropdownMenuRadioItem`. Correct ARIA on an element reka never registers in its item collection is the strongest symptom of non-adoption, not evidence of adoption. |
| `lane-frontend.md:624` — the two ungated rAF clocks, WCAG 2.2.2 "arguably satisfied by the visible play/pause transport (`AnimationControls.vue`)" | **CONFIRMED + ADDED** (C-19). I do not contest the WCAG reading. I add the intra-file asymmetry (`:178` gates the decoration, the clock is ungated) and the unused keyframes flag (`keyframes.d.ts:690`). |
| `lane-frontend.md:382` — the one live `glass-*` selector | **CONFIRMED** against the producer dist (S-5). |
| `lane-frontend.md:90` — "`GlassDock` + `DockDropdownTrigger` transport (play/speed/easing)", 224 lines | **CONFIRMED** (line count exact); the census's transport framing is right. |
| `CENSUS-2026-08-03.md` §1 — value.js surface "5 statements / 4 files / 6 symbols, easing-only"; "bare-root specifiers that 4.0.0 no longer exports" | **CONFIRMED** on the count; **CONTRADICTED** on the present-tense defect reading. value.js 0.13.0 declares a single `"."` export condition — there **is** no `/easing` subpath at the pin, so the bare specifier is correct today and the F.W2 migration is a *consequence* of F.W1, not an independent defect. |
| `CENSUS-2026-08-03.md` §1 — "Pins: value.js `^0.13.0`/inst 0.13.0 · glass-ui `^4.0.0`/inst 4.0.0 · keyframes `^4.3.0`/inst 4.3.0 — AGREE" | **AMENDED** (C-1). The versions agree; the **constraint graph does not close**. glass-ui 4.0.0 peers `^0.10.0 \|\| ^0.11.0`, keyframes 4.3.0 hard-depends `^0.13.0` — disjoint. `npm ls` exits `ELSPROBLEMS`. The G33 gate is RED **now**, before the uplift. |
| `CENSUS-2026-08-03.md` §3 — `colors.ts` is "the exact deletion target of W.L5 item 2" | **CONFIRMED, scoped out** (C-18). Not in this component's import graph; booked instead as the reason the arm survives — the tree's densest colour surface consumes no colour library. |
| intake **R3-7a** (TRUE, CARRY→F.W3) — "AnimationControls 4" of 35 Tooltip callsites | **CONFIRMED exactly** — `:66, :81, :94, :105`. C-16 adds that two of the four anchor on non-focusable nodes and that `glass-ui/icon-tooltip` is the seat the local shim displaced. |
| intake **R6-8** (TRUE, ADOPT-AS-FACT + CARRY→F.W5) — operation↔client leaves structurally non-isolable | **FOLDED, no contradiction** (C-30). Both leaves this component reads inherit the property; the component is a reader, not the defect site, but it is where the ambiguity will surface. |

---

## §8 — What this component actually is

A well-composed glass transport whose composition is one layer thinner than it reads. The glass-ui
*surface* is adopted — 8 primitives across 7 subpaths, all real at 4.0.0, all with correct prop names
(S-1). The glass-ui *substance* is not: the timeline is a fork of a shipped primitive (C-4) carrying a
dead token (C-5) and a self-inflicted quantization (C-6); the play button is 48 lines of re-authored
chassis (C-7) wearing pasted Font Awesome glyphs (C-8) next to an imported icon library; the easing
radio set is hand-rolled inside a menu that ships one (C-9). Underneath, the clock it drives rejected
the installed animation engine and lost ping-pong direction in the process (C-2, C-13). And the
contract it presents to its own consumers has been four bindings out of date since March (C-3), which
is the finding that matters most: not because it is the hardest to fix, but because it survived a
same-block edit and a green-gate commit, which means nothing in this tree is watching this seam.

The three BLOCKERs are independent and separately actionable: **C-1** is a lockfile/uplift gate,
**C-2** is ~40 lines of store, **C-3** is four lines of `FullscreenViewer` plus a decision about where
the ghost toggle lives in fullscreen. None of them needs the mega-tranche's version uplift to land
first, and C-3 needs nothing but a reader.
