claude-opus-5[1m]

# CHALLENGE C · CONSUMPTION — `ConvergenceTimeline.vue`

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/equation/convergence/ConvergenceTimeline.vue` (146 LOC)
**Axis** consumption of value.js 0.13 · keyframes 4.3 · glass-ui ^4.0.0 · the fourier API — plus props/emits contract quality and the integration seams.
**Posture** DEFECTIVE-until-proven. Every row carries severity + `file:line` + its own falsifier. Superlatives run the same gauntlet (L-18).
**Method** static + source-derived only. `fourier-analysis` read exclusively. Two live-only residuals are marked `UNPROVEN-NEEDS-LIVE` for SS-13.
**Bytes audited** the **working tree**, not `HEAD`. `git diff` on the target shows a pre-existing, not-authored-here 2-line drift — `variant="glass-scrubber"` → `variant="standard"` at `:6` and `:71` — i.e. someone has already repaired the variant name against glass-ui 4.0.0, whose slider ships exactly two recipes (`standard` | `spectrum`, `dist/components/ui/slider/index.d.ts`). Line numbering is unaffected (2 insertions / 2 deletions, same count). Had this challenge run against `HEAD` there would be a third BLOCKER: `variant="glass-scrubber"` matches no CVA key, so `sliderVariants` would fall through to `defaultVariants.variant = "standard"` while `data-variant="glass-scrubber"` defeated every `[data-variant=…]` selector in `glass-ui.css`. **That defect is already cured in the tree and is therefore NOT counted below.**

**Tally — 15 defects (2 BLOCKER · 5 MAJOR · 6 MINOR · 2 INFO) · 6 superlatives.**

---

## §0 — The consumption surface, measured

Every dependency edge this file actually has:

| Package | Import sites in this file | Evidence |
|---|---|---|
| `@mkbabb/glass-ui` `^4.0.0` | **2** — `:19` `/button`, `:20` `/slider` | `grep -n "glass-ui" ConvergenceTimeline.vue` → 19, 20 |
| `@mkbabb/value.js` `^0.13.0` | **0** | `grep -n "value.js" ConvergenceTimeline.vue` → *(empty)* |
| `@mkbabb/keyframes.js` `^4.3.0` | **0** | same grep → *(empty)* |
| fourier API (45 ops) | **0** — no `lib/api`, no pinia store, no `fetch` | same grep → *(empty)* |
| `vue` | `:18` `computed, ref` | — |

So the CONSUMPTION axis for this component is **entirely a glass-ui axis**, plus the props/emits seam to `ConvergencePlot.vue`. That narrowness is itself partly a virtue (§3 S-1, S-2) and partly the reason the glass-ui seam defects below are the whole story.

Resolution of the two specifiers is real, not assumed: `node_modules/@mkbabb/glass-ui/package.json` carries an 80-key `exports` map containing `./button` and `./slider`, and matching `typesVersions["*"]` entries.

The parent seam, for reference throughout:

```
ConvergencePlot.vue:366-375   <ConvergenceTimeline :t :playing :active-count :total-harmonics
                               @toggle-play @scrub-start @scrub-move @scrub-end />
ConvergencePlot.vue:282-291   onScrubStart(){ stopLoop() }
                              onScrubMove(newT){ t.value = newT; draw() }
                              onScrubEnd(){ if (playing.value) startLoop() }
ConvergencePlot.vue:324       onMounted → nextTick(() => { draw(); t.value = 0; playing.value = true; startLoop() })
```

---

## §1 — BLOCKERS

### C-1 · BLOCKER — the scrub lifecycle does not close: an ordinary click on the playhead permanently freezes playback while the transport still reads "playing"

`ConvergenceTimeline.vue:46-56` builds a two-event state machine from **two event sources that are not duals**:

```
:46  function onPointerDown()  { if (scrubbing.value) return; scrubbing.value = true;  emit("scrub-start"); }
:52  function onValueCommit()  { if (!scrubbing.value) return; scrubbing.value = false; emit("scrub-end");  }
:80  @pointerdown="onPointerDown"      ← a RAW native event, fires unconditionally
:81  @value-commit="onValueCommit"     ← reka's valueCommit, fires CONDITIONALLY
```

reka's commit is gated on a value delta. `node_modules/reka-ui/src/Slider/SliderRoot.vue`:

```
handleSlideEnd() {
  const prevValue = valuesBeforeSlideStartRef.value[valueIndexToChangeRef.value]
  const nextValue = currentModelValue.value[valueIndexToChangeRef.value]
  const hasChanged = nextValue !== prevValue
  if (hasChanged) emits('valueCommit', toRaw(currentModelValue.value))   ← the gate
}
```

and `valuesBeforeSlideStartRef` is snapshotted on the same `pointerdown` (`SliderRoot.vue`, `@pointerdown="() => { if (!disabled) valuesBeforeSlideStartRef = currentModelValue }"`).

**Failure scenario (fully source-derived, no browser needed).** The plot autoplays from mount (`ConvergencePlot.vue:324` sets `playing.value = true`). The user presses on the track at the current playhead — the single most natural gesture for "grab the scrubber" — and releases without moving:

1. `pointerdown` → `onPointerDown()` → `scrubbing = true`, `emit("scrub-start")` → parent `stopLoop()`. **`t` is now frozen.**
2. reka: `slideStart` → `updateValues(value, idx)`. The snapped value equals the current one, so `hasChanged` is false and `modelValue` is untouched.
3. `pointerup` → `slideEnd` → `handleSlideEnd()`: `prevValue === nextValue` → **`valueCommit` is never emitted.**
4. `onValueCommit()` never runs. `scrubbing` stays `true` forever. `scrub-end` is never emitted. `ConvergencePlot.onScrubEnd()` — the sole caller of `startLoop()` outside `togglePlay` — never runs.

Result: the animation is dead, `playing.value` is still `true`, and the button still paints the **pause** glyph (`:63` `v-if="playing"`). The transport lies about its own state. Recovery costs the user two clicks on play/pause (first sets `playing=false` + `stopLoop`, second restarts), because `togglePlay` is the only other `startLoop()` caller.

The same no-commit path is reached by **drag-out-and-return** (release at the value you started from — `prevValue === nextValue` by construction) and by any press whose snapped position equals the current step (step = 1 of 0..100, i.e. ±0.5 % of track width — about ±2 px on a 400 px track).

Worse, the stuck `scrubbing = true` then poisons the *next* gesture: `:47` `if (scrubbing.value) return` suppresses the following `scrub-start`, so the next drag moves `t` while the parent believes no scrub is in progress.

**Provenance** `ConvergenceTimeline.vue:46-56,80-81` · `ConvergencePlot.vue:282-291,324` · `reka-ui/src/Slider/SliderRoot.vue` `handleSlideEnd`.
**Falsifier** Show a code path that emits `scrub-end` without `valueCommit`, or show that reka emits `valueCommit` unconditionally on `pointerup`. Neither exists: `onValueCommit` at `:52` is the only `scrub-end` emitter in the file, and the `if (hasChanged)` gate is the only `valueCommit` site on the pointer path. **The claim dies if `hasChanged` is ever true for a press-release with no motion — it cannot be, `prevValue` and `nextValue` read the same array index of the same unmutated array.**
**Consumption reading** the file's own header (`:5-6`) says it "migrated from the 166 LOC shadow recipe (manual pointer-state-machine ...)". It deleted the paint and kept **half** of the pointer state machine — and the retained half is now driven by an event pair that does not close. Its sibling from the very same wave, `ui/SliderControl.vue` (header: same "P.W5 Lane B.4" migration), keeps **no** pointer state at all — pure `v-model` (`SliderControl.vue:54-57,81-89`). ConvergenceTimeline is the only site in the fleet that bolted the state machine back on.

---

### C-2 · BLOCKER — the play/pause transport is an icon-only glass-ui `Button` with no accessible name and no pressed state, on a route with zero axe coverage

`:61-66`:

```html
<Button variant="glass" size="icon" class="play-btn" :class="{ 'is-playing': playing }" @click="emit('toggle-play')">
  <Transition name="icon-swap" mode="out-in">
    <svg v-if="playing"  class="size-3" viewBox="0 0 320 512" …>   ← no <title>, no aria-*
    <svg v-else          class="size-3" viewBox="0 0 384 512" …>
  </Transition>
</Button>
```

No `aria-label`, no `title`, no `sr-only` text, no `<title>` in either SVG, no `aria-pressed`. glass-ui's `Button` renders reka's `Primitive` with `as: "button"` default (`dist/button-BNDWhAZb.js`) and synthesizes no name of its own. The computed accessible name is therefore **empty** → WCAG 4.1.2 failure, axe `button-name` (impact: *critical*).

Two things make this a consumption defect rather than a generic a11y miss:

1. **glass-ui ships the toggle affordance and the consumer declined it.** The `glass` variant string in `dist/button-BNDWhAZb.js` is
   `"glass-wash btn-glass text-foreground hover:bg-(--glass-bg-resting) … aria-pressed:bg-[color-mix(in_srgb,var(--foreground)_10%,var(--glass-bg-resting))]"` —
   it carries a first-class `aria-pressed:` paint for exactly this case. The consumer instead invented `.is-playing` (`:124-128`) and left `aria-pressed` unset, so the design system's own toggle styling is unreachable *and* the state is invisible to AT.
2. **The sibling does it correctly.** `visualization/AnimationControls.vue:67` and `:82` — the other play button in the same app — both carry `:aria-label="anim.playing ? 'Pause animation' : 'Play animation'"` *and* a `<Tooltip>` wrapper. So this is a regression against the tree's own established convention, not a fleet-wide blind spot.

**Falsifier** Find an accessible name for this button. `sed -n '59,67p'` on the file: the `<Button>` opening tag carries exactly `variant`, `size`, `class`, `:class`, `@click`; its only children are the two `<svg>` elements, which contain a single `<path>` each and no text node. Claim dies if glass-ui's `Button` injects a name — it does not (`dist/button-BNDWhAZb.js` sets only `data-slot`, `data-variant`, `data-size`, `type`, `disabled`, `class`).
**Why it survived** `/equation` (the only route mounting `EquationView` → `ConvergencePlot` → this component; `web/src/router/index.ts:94`) is visited by exactly one spec — `e2e/visual-baseline.spec.ts:34` `{ slug: "equation", path: "/equation" }` — which takes **screenshots only**. Both axe keystones (`visualization-ux.spec.ts:47`, `visualization-crud.spec.ts:120,165,525`) run against `/visualize` and `/v/{slug}` and never reach `/equation`. See C-15.

---

## §2 — MAJOR

### C-3 · MAJOR — the ARIA value triple is applied to the wrong element and is contradicted by the real one

`:75-78` puts `aria-valuenow` / `aria-valuemin` / `aria-valuemax` / `aria-label` on `<Slider>`. Trace where they land:

- glass-ui `Slider` does **not** set `inheritAttrs: false` (`dist/slider-DQ95MET2.js`), so the four attrs fall through onto its root vnode, `<SliderRoot>`.
- reka `SliderRoot` **does** (`SliderRoot.vue` `defineOptions({ inheritAttrs: false })`) and re-spreads them: `v-bind="$attrs"` onto `SliderHorizontal`.
- `SliderHorizontal` → `SliderImpl` → `Primitive` with `as: 'span'` and **no `role`** (`SliderImpl.vue:20-23`, `withDefaults(defineProps<SliderImplProps>(), { as: 'span' })`).

So `aria-valuenow=activeCount`, `aria-valuemin="0"`, `aria-valuemax=totalHarmonics` and a second copy of `aria-label` are attached to a **role-less `<span data-slider-impl>`**. `aria-value*` is only valid on `slider`/`spinbutton`/`progressbar`/`scrollbar`/`meter` roles, and `aria-label` is prohibited on a generic element — axe `aria-allowed-attr` / `aria-prohibited-attr`.

The authoritative element is elsewhere and disagrees. `reka-ui/src/Slider/SliderThumbImpl.vue`:

```
role="slider"
:aria-valuenow="value"                       ← the 0..100 percent, not activeCount
:aria-valuemin="rootContext.min.value"       ← 0
:aria-valuemax="rootContext.max.value"       ← 100, not totalHarmonics
```

A screen reader therefore announces **"Harmonics timeline, slider, 37"** — the raw percent — and never the harmonic count. The component's entire semantic intent (`N={{activeCount}}/{{totalHarmonics}}`, rendered visually at `:85`) is dropped for AT users. The three attributes are pure noise plus two axe violations.

**Falsifier** Show `role` on the impl span, or show reka forwarding `aria-value*` to the thumb. `SliderImpl.vue` sets only `data-slider-impl` + `v-bind="props"`; the only attr glass-ui explicitly relays to the thumb is `aria-label` (`dist/slider-DQ95MET2.js`: `"aria-label": n.$attrs["aria-label"] ?? void 0`). Claim dies if either is found.
**Correct consumption** the count belongs in `aria-valuetext` on the thumb (which reka would need to accept) or, cheaply and correctly today, as `aria-live="polite"` on the `:85` count span plus a single `aria-label` and nothing else.

### C-4 · MAJOR — keyboard operation of the scrubber is inert in the component's own default state

reka's thumb is `tabindex="0"` (`SliderThumbImpl.vue`) and glass-ui's `standard` variant explicitly designs for keyboard use — `dist/glass-ui.css`: `.glass-slider:not([data-variant=spectrum]):focus-within .slider-track{box-shadow:var(--focus-ring-shadow)}`. The thumb paints `width:0;opacity:0` but is neither `display:none` nor `visibility:hidden`, so it remains focusable.

Arrow / PageUp / Home / End go through `SliderRoot.updateValues(..., { commit: true })` → `modelValue` changes → this component's `tArr` setter (`:40-43`) fires → `emit("scrub-move", next)`. **`scrub-start` is never emitted** (no pointer event occurred), so the parent never calls `stopLoop()`. `ConvergencePlot.startLoop`'s `tick` then reassigns `t.value` on the very next frame (`ConvergencePlot.vue:57-70`), discarding the keystroke.

Because `playing` is `true` from mount (`ConvergencePlot.vue:324`), **the default state of the control is one where keyboard operation does nothing visible.** WCAG 2.1.1.

**Falsifier** Show that `scrub-move` alone stops the loop. `onScrubMove` (`ConvergencePlot.vue:285-288`) is `t.value = newT; draw()` — it does not touch `rafId`. Claim dies if `startLoop`'s `tick` were gated on something other than `playing.value` — `:60` is exactly `if (!playing.value) return`.
**Note** the mirror case is benign: keyboard `valueCommit` *does* fire, and `onValueCommit` (`:53`) early-returns because `scrubbing` is false. The asymmetry is one-directional.

### C-5 · MAJOR — `size="icon"` is requested and then hard-overridden with a literal, discarding the comfort axis and the WCAG-2.5.5 coarse-pointer clamp

`:61` asks for `size="icon"`; `:108-109` then sets `width: 1.75rem; height: 1.75rem`.

glass-ui's `icon` rung is `"h-(--control-h-md) w-(--control-h-md) p-0"` (`dist/button-BNDWhAZb.js`), and the token is *not* a constant:

```
tokens/offsets-sizing.css:136  --ui-scale: 1;
tokens/offsets-sizing.css:142  --ui-coarse-scale: 1.5;
tokens/offsets-sizing.css:148  --control-floor: 0px;
tokens/offsets-sizing.css:151  --control-h-md: max(calc(2.5rem * var(--ui-scale)), var(--control-floor));
tokens/light-dark.css:17-20    @media (pointer: coarse) { :root {
                                 --ui-scale: var(--ui-coarse-scale, 1.5);
                                 --control-floor: var(--touch-target, 2.75rem);   /* 44px, AQ.W3 §7 */ } }
```

The literal defeats both knobs. Vue's scoped-CSS attribute lifts `.play-btn[data-v-…]` to (0,2,0) over the Tailwind utility's (0,1,0), so the override wins deterministically.

Arithmetic with fourier's own responsive root (`web/src/style.css:40-50`: `html{font-size:1.125rem}`, dropping to `1rem` at ≥768 px):

| Context | glass-ui `size="icon"` | This component | Design-system floor |
|---|---|---|---|
| desktop (root 16px) | 40 px | **28 px** | — (`--control-floor: 0`) |
| coarse pointer / phone (root 18px) | `max(2.5rem×1.5, 2.75rem)` = **67.5 px** | **31.5 px** | `--touch-target` = 2.75rem = **49.5 px** |

So on touch the primary transport control of the convergence plot is a **31.5 px** target where glass-ui guarantees ≥ 49.5 px. glass-ui even names this consumer class in the token comment: *"canonical WCAG 2.5.5 (44px) touch-target floor for the NON-dock coarse-pointer surfaces (`Button size="icon"`, …), retiring the per-consumer one-liner `min-h-[44px]` patches"* (`offsets-sizing.css:454-458`). The one-liner patch came back as a hardcoded shrink.

Note the intended size already exists as a named rung: `--control-h-xs` is *exactly* `1.75rem` (`offsets-sizing.css:149`), i.e. `size="icon-sm"`. The author reached for the right number and the wrong mechanism.

**Falsifier** Show the literal losing the cascade, or `--control-floor` not lifting. Specificity is (0,2,0) vs (0,1,0) — it wins; the coarse block is quoted verbatim above. Claim dies if fourier resets `--control-floor`/`--ui-scale` somewhere: `grep -rn "control-floor\|ui-scale" web/src/` → *(no hits)*.
**Residual** `UNPROVEN-NEEDS-LIVE (SS-13)` — the *rendered* px at a real coarse-pointer viewport. The token algebra above is exact; only the media-query match is environmental.

### C-6 · MAJOR — `variant="glass"` is requested and then repainted by hand, discarding the glass material tokens

`:61` asks for `variant="glass"` — `"glass-wash btn-glass text-foreground hover:bg-(--glass-bg-resting) hover:border-(--glass-border-resting) active:bg-(--glass-bg-floating) …"`. `:106-128` then overrides every visual channel that variant owns:

| Channel | glass-ui `variant="glass"` | `:106-128` override |
|---|---|---|
| background | `glass-wash` + `hover:bg-(--glass-bg-resting)` / `active:bg-(--glass-bg-floating)` | `color-mix(in srgb, var(--background) 60%/85%, transparent)` |
| border | `btn-glass` + `hover:border-(--glass-border-resting)` | `1.5px solid color-mix(in srgb, var(--foreground) 10%, transparent)` |
| blur | `--glass-blur-*` family (cf. `.slider-range` using `var(--glass-blur-quiet)`) | hardcoded `blur(8px)` |
| radius | `btn-pill` | `@apply rounded-full` |
| pressed state | `aria-pressed:bg-[color-mix(…)]` | `.is-playing` class + hand-written paint |

Scoped-CSS specificity means the hover/active variants lose too: `.play-btn:hover[data-v-…]` is (0,3,0) against Tailwind's `.hover\:bg-x:hover` (0,2,0). What actually survives from glass-ui is only `tap-squish`, `focus-ring` and `active:scale-(--scale-press-btn)`.

The component therefore imports, resolves, instantiates and mounts a design-system Button in order to use ~3 of its ~15 declared classes. Either the variant is right and the 23-line repaint should go, or the paint is genuinely consumer-owned and `variant="glass"` is a false signal. The header comment at `:7-9` argues the play button is "consumer-owned (chassis-level concerns)" — but geometry and glass material are *not* chassis concerns; they are precisely what the design system owns. This is the same violation class as value.js's `feedback_glass_ui_first_class.md` / `feedback_root_styling.md`.

**Falsifier** Point at one glass-material declaration from `variant="glass"` that reaches the painted pixel. Every channel in the table is shadowed by a higher-specificity scoped rule; the surviving three are motion/focus utilities, not material.

### C-7 · MAJOR — the `[0..1] → 0..100 step 1` adaptation under-resolves the harmonic axis; at the app's own maximum ~half the `N` values are unreachable

`:38-44` scales the continuous `t` onto reka's integer model with `min=0 max=100 step=1` (`:72-74`) — 101 addressable positions. But the quantity the control *labels* (`:85` `N={{activeCount}}/{{totalHarmonics}}`) changes at thresholds set by `equation/lib/harmonics.ts:60-76`:

```
sliceW  = max(0.25, 1/total);  availableRange = 1 - sliceW
start_i = i * availableRange/(total-1);   activeCount counts progress > 0.5
easedT  = easeInOutSine(t)                (ConvergencePlot.vue:37)
```

Converting each threshold back through `t = acos(1-2e)/π` and measuring adjacent gaps against the 0.01 step:

| `totalHarmonics` | min Δt between adjacent N-thresholds | adjacent pairs inside one step |
|---|---|---|
| 8 | 0.06834 | 0 / 7 |
| 20 (app default, `FunctionInput.vue:28`) | 0.02514 | 0 / 19 |
| 48 | 0.01016 | 0 / 47 |
| **49** | 0.00995 | **6 / 48** |
| 60 | 0.00809 | 47 / 59 |
| **100** (the UI max, `FunctionInput.vue:184` `:max="100"`) | 0.00482 | **99 / 99** |

`totalHarmonics = groupTrigHarmonics(coefficients, nHarmonics).length ≤ nHarmonics` (`ConvergencePlot.vue:35`), and `nHarmonics` is user-set on a `1..100` slider. So from `total ≥ 49` upward the scrubber can no longer stop on every harmonic count, and at the maximum a single step (or a single arrow key) skips ≈2 harmonics — the control cannot address roughly half of its own labelled range.

**Falsifier** Reproduce the table. Thresholds are pure functions of `total` (`harmonics.ts:60-76`) and `easeInOutSine` (`@mkbabb/value.js`, applied at `ConvergencePlot.vue:37`); nothing environmental enters. Claim dies if `step` were fractional or `max` scaled with `totalHarmonics` — `:73-74` are the literals `100` and `1`.
**Correct consumption** `:max="1000"` (or `:step="0.01"` with `max=1`) costs nothing — reka handles decimals via `getDecimalCount(step)` (`SliderRoot.vue`) — and restores the continuous axis the parent actually models.

---

## §3 — MINOR

### C-8 · MINOR — `--slider-scrub-track-height` is a dead token: the file's only attempt to configure the design-system primitive is a no-op

`:135-137` sets `--slider-scrub-track-height: 20px` on `.convergence-slider`.

```
grep -roh -- "--slider-scrub-track-height" node_modules/@mkbabb/glass-ui/dist/  →  0
grep -roh -- "--slider-track-height"       node_modules/@mkbabb/glass-ui/dist/  →  7
grep -roh -- "--slider-thumb-size"         node_modules/@mkbabb/glass-ui/dist/  →  7
```

The live names are `--slider-track-height` / `--slider-thumb-size` (`dist/components/ui/slider/index.d.ts` documents them; `dist/glass-ui.css` reads `height:var(--slider-track-height,.375rem)` on `.slider-track`). The name here is a survivor of the pre-migration `glass-track`/`glass-fill`/`glass-thumb` shadow recipe the header at `:5-6` says was retired.

For *this* file the effect is nil twice over: `[data-size=md]` already sets `--slider-track-height: 1.25rem`, which is 20 px at the desktop root. But fourier's root is `1.125rem` below 768 px (`style.css:40-42`), so the author's fixed-px intent and the token's rem value diverge to 22.5 px on mobile — the declaration reads as a deliberate mobile-specific choice and delivers nothing.

**Fleet corroboration** the same dead token appears at `visualization/GlassTimeline.vue:125` (`24px`) and `ui/SliderControl.vue:144` (`16px`) — and at *those* two sites it is not a coincidental match to the default, so two sliders in the app are silently not getting the heights their source claims. Grep: `grep -rn "slider-scrub-track-height" web/src/` → exactly those 3 lines.
**Falsifier** Find one consumer of `--slider-scrub-track-height` in glass-ui 4.0.0. Zero occurrences across `dist/` (JS + CSS + d.ts).
**Repair caveat** the rename is not free: `--slider-track-height` is *set* by glass-ui at `.glass-slider[data-size=md][data-v-534634a7]` (0,2,0 + attr) and a consumer setting it on `.convergence-slider[data-v-…]` (0,2,0) on the same element ties on specificity — resolution falls to source order. `size="sm|md|lg"` is the intended knob.

### C-9 · MINOR — the emitted sequence `start → move* → end` is not guaranteed; a track click can emit `scrub-move` before `scrub-start`

`@pointerdown` (`:80`) is a fallthrough attr threading four components (glass-ui `Slider` → reka `SliderRoot` → `SliderHorizontal` → `SliderImpl` → the `<span>`). reka's own `@pointerdown` is declared in `SliderImpl.vue`'s template and emits `slideStart` **synchronously** → `updateValues` → `modelValue` → this file's `tArr` setter (`:40`) → `emit("scrub-move", …)`. Whether that precedes `onPointerDown` depends purely on Vue's listener-merge order for template-declared vs fallthrough handlers on the same element — an implementation detail of four upstream packages, asserted nowhere.

The consequence is currently benign (the parent's `onScrubMove` sets `t` + `draw()`, `onScrubStart` then `stopLoop()`s), but the contract the file's docstring implies (`:15-17` "toggle-play + scrub-start + scrub-move + scrub-end") is not the contract it enforces.
**Falsifier** Point at the ordering guarantee. There is none in the file, in glass-ui's `Slider`, or in reka's `SliderRoot`/`SliderImpl`. The *specific* observed order is `UNPROVEN-NEEDS-LIVE (SS-13)`; the *absence of a guarantee* is confirmed by construction.
**Correct consumption** derive `scrub-start` from the same source as `scrub-end` — e.g. the first `update:modelValue` of a gesture, or reka's `data-held` — rather than mixing a raw DOM event with a component emit.

### C-10 · MINOR — durations are hardcoded while easings are tokenized, and the icon-swap block contradicts the file's own A.W3.d comment 24 lines above

`:114-118` carries the comment *"A.W3.d — named properties + canonical token, no `transition: all`"* and then writes `color 0.15s var(--ease-standard)` ×3. The canonical duration token exists and is numerically identical: glass-ui `styles/icon-chip.css:62` uses `var(--duration-fast, 150ms)`, and glass-ui's own slider CSS pairs them (`transition:background var(--duration-fast) var(--ease-standard)`). Half the token contract is adopted.

`:140-143` then drops both: `transition: opacity 0.1s ease, transform 0.1s ease` — a bare CSS `ease` keyword in a file that had just declared `--ease-standard` canonical. And this file contains **zero** `@media (prefers-reduced-motion: reduce)` blocks, while its own parent (`ConvergencePlot.vue:405`) and its sibling transport (`AnimationControls.vue:177`) both carry one; lane-frontend §"CSS `reduce`" enumerates 8 such blocks fleet-wide and this file is not among them.

**Falsifier** Show `--duration-fast ≠ 150ms` or absent. `icon-chip.css:62` carries the `150ms` fallback and `styles/tokens/` defines the family. Claim dies if the file has a reduced-motion block — `grep -c "prefers-reduced-motion" ConvergenceTimeline.vue` → 0.
**keyframes.js note** this is the whole of the file's motion surface, and none of it consumes `@mkbabb/keyframes.js@^4.3.0` — reasonable for a 0.1 s opacity swap, but worth recording that the timeline component of a *convergence animation* holds zero keyframes.js coupling.

### C-11 · MINOR — two FontAwesome glyphs are inlined as raw path data against a fleet that imports `lucide-vue-next` at 35 files

`:63-64` embed `viewBox="0 0 320 512"` and `viewBox="0 0 384 512"` FontAwesome path strings. `grep -rl "lucide-vue-next" web/src/ | wc -l` → **35**. The icon register differs (FA solid, 512-unit box, filled) from lucide's 24-unit stroke box, so the play glyph is visually off-system from every other icon in the same dock row and every icon in the sibling controls.
**Falsifier** Show lucide lacking a play/pause glyph, or the fleet not standardising on lucide. 35 files import it; `Play`/`Pause` are stock lucide exports.
**Adjacent** `lucide-vue-next` sits in `devDependencies` (`web/package.json`) while being imported from `src/` at 35 sites — a packaging misclassification, out of scope for this component but noted for F.W2.

### C-12 · MINOR — no empty/disabled state: the control is live and mislabelled before coefficients exist

`totalHarmonics` is `trigHarmonics.length` (`ConvergencePlot.vue:369`), which is 0 until a computation lands. The component then renders a fully interactive slider labelled `N=0/0` (`:85`) with `:aria-valuemax="0"` (`:77`). glass-ui's `Slider` forwards reka's `disabled` prop (`dist/slider-DQ95MET2.js` props list) and paints a `[data-disabled]` state (`glass-ui.css`: `.glass-slider[data-disabled] .slider-range{opacity:var(--opacity-disabled)}`) — the affordance is available and unused.
**Falsifier** Show `totalHarmonics` cannot be 0. `groupTrigHarmonics` (`harmonics.ts:22-46`) returns `[]` for empty/DC-only coefficient sets, and `ConvergencePlot` mounts before any result arrives.

### C-13 · MINOR — the props/emits contract under-specifies its own units

`:22-27` declares `t: number` with no documented domain; `[0..1]` lives only in a prose comment at `:16-17`, and the clamp that enforces it exists only on the *inbound* path (`:41`). A parent passing `t` in percent, or in seconds, produces a silently wrong `Math.round(props.t * 100)` at `:39` with no diagnostic. Nothing is optional and nothing has a default, so `withDefaults` is correctly absent — the gap is purely the missing domain contract on the one prop whose units are non-obvious. `activeCount`/`totalHarmonics` are display-only and correctly typed.
**Falsifier** Show a runtime or type-level constraint on `t`'s range. `defineProps<{ t: number }>()` admits any float; `:39` does not clamp on read.

---

## §4 — INFO

### C-14 · INFO — the `v-model` type is narrower than the emit it binds

`:38` declares `computed<number[]>`, but glass-ui's `Slider` declares `"update:modelValue": (payload: number[] | undefined) => any` (`dist/components/ui/slider/Slider.vue.d.ts`, forwarding reka's `SliderRootEmits`). The setter guards the *element* (`arr[0] ?? 0`, `:41`) but not the *array*. In practice reka only ever emits arrays (`updateValues` assigns `nextValues`, always an array), so this is a type-width mismatch rather than a live crash — and the identical idiom is used by the sibling `ui/SliderControl.vue:54-57`, so it is a fleet convention, not this file's invention.
**Falsifier** `npx vue-tsc --noEmit` and look for an error at `ConvergenceTimeline.vue:70`. Not run — the repo is read-only evidence and `vue-tsc -b` writes build info. `UNPROVEN-NEEDS-LIVE (SS-13)`; the *type-width mismatch itself* is confirmed from the two `.d.ts` files.

### C-15 · INFO — `/equation` receives pixel baselines and zero axe coverage, which is why C-2/C-3 are structurally un-catchable today

Every `page.goto` across `web/e2e/*.spec.ts`: `/`, `/paper`, `/gallery`, `/equation`, `/morph`, `/demo/shape-extractor`, `/w`, `/visualize`, `/v/{slug}`. The two `checkA11y` helpers (`visualization-ux.spec.ts:26-43`, `visualization-crud.spec.ts:83-97`, both `AxeBuilder().withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa"])`) are invoked only after `/visualize` and `/v/{slug}`. `/equation` appears once, in `visual-baseline.spec.ts:34`, a screenshot loop.

Note also that even with coverage, C-5 would escape: axe's `target-size` implements WCAG **2.5.8 (24×24 AA)**, which 28 px passes; the 44 px floor glass-ui enforces is **2.5.5 AAA** and outside the selected tag set.
**Falsifier** Find a `checkA11y` call reachable from `/equation`. `grep -n "checkA11y\|goto(" e2e/*.spec.ts` — the two sets do not intersect.

---

## §5 — SUPERLATIVES (L-18, same evidentiary standard)

### S-1 · Zero value.js coupling — this file is on the safe side of the 0.13 → 4.0.0 cut by construction

The F.W2 migration surface is *"5 import statements / 4 files / 6 symbols, easing-only … all bare-root specifiers that 4.0.0 no longer exports"* (CENSUS-2026-08-03 §row "value.js live import surface"; lane-frontend §480). This component holds **none** of them — even though it is surrounded by them: its own parent carries `ConvergencePlot.vue:5 import { easeInOutSine } from "@mkbabb/value.js"`, and the math module it transitively depends on carries `equation/lib/harmonics.ts:5` of the same. The timeline consumes the *result* (`t`, `activeCount`) rather than re-importing the easing, so the value.js peer-floor bump touches it not at all.
**Falsifier** `grep -n "value.js" ConvergenceTimeline.vue` → *(empty)*. Claim dies on a single hit.

### S-2 · Zero API / store coupling — R6-8's operation↔client entanglement is structurally unreachable here

No `@/lib/api` import, no pinia store, no `fetch`. Every datum arrives through four typed props and leaves through four typed emits. The intake lane's substantive R6-8 finding — *"an API-operation model that embeds derived client back-references cannot attribute a defect to one side of the seam"* (`lane-fourier-r3-r6.md` R6-8, adjudicated TRUE, CARRY → F.W5) — has no purchase on this component precisely because the client edge does not exist here. This is the leaf shape the F.W5 shared-provenance contract wants: presentation with no operation identity embedded in it.
**Falsifier** Any network or store edge. `grep -n "api\|store\|fetch\|axios" ConvergenceTimeline.vue` → *(empty)*.

### S-3 · Subpath-correct glass-ui imports

`:19-20` use `@mkbabb/glass-ui/button` and `@mkbabb/glass-ui/slider` — both present in the 80-key `exports` map and in `typesVersions["*"]` of the installed 4.0.0. No barrel import (which would pull the whole library), no deep `dist/` reach (which would break on any repackaging). This is the granularity the exports map was built for, and it is the one dependency dimension where the file is exemplary.
**Falsifier** A missing export key or a deep path. Both keys verified present in `node_modules/@mkbabb/glass-ui/package.json`.

### S-4 · The dock-context comment is true and load-bearing

`:9-12` claims the `standard` variant's internal `useOptionalDockContext()` resolves to `null` here and the keep-open behaviour is a no-op. Verified in `dist/slider-DQ95MET2.js`: `useDockHold` opens with `let n = r()` (the optional dock context) and every mutation guards it — `!i() || a || !n || (n.keepOpen(), a = !0)` and `!a || !n || (n.release(), a = !1)`. A null context is a total no-op, exactly as documented, and `keepDockOpen` (default `true`) costs nothing. Accurate, checkable provenance comments are rare in this tree; this one survives its own audit.
**Falsifier** Show `useDockHold` throwing or side-effecting on a null context. Both call sites are null-guarded in the shipped bundle.

### S-5 · `class="size-3"` is honored — a suspected defect the tree refuted

The obvious hazard — a consumer `size-*` on an `<svg>` losing to a design-system descendant rule — does **not** occur. glass-ui's Button base CVA is `"… [&_svg:not([class*=size-])]:size-(--ui-glyph) [&_svg]:shrink-0 [&_svg]:pointer-events-none"` (`dist/button-BNDWhAZb.js`): the `:not([class*=size-])` guard means glass-ui deliberately yields to any explicit size class. The consumer's `size-3` at `:63-64` wins by design, not by accident. Recording the refutation per L-18 — this was hunted as a defect and the design system proved correct.
**Falsifier** Remove the `:not()` guard from the CVA string and the claim inverts. It is present verbatim.

### S-6 · The `t` ↔ slider adaptation is provably loop-free

`get: [Math.round(props.t * 100)]` (`:39`) and `set: clamp(arr[0] / 100)` (`:41`) are exact inverses on the integer lattice: a user step emits `n/100`, the parent writes it to `t`, the getter recomputes `Math.round((n/100)*100) = n`, and the computed's cache short-circuits. No feedback oscillation is possible between the rAF writer and the user writer. This is the failure mode value.js's own `MEMORY.md` records for `defineModel` round-trips (*"reads after writes return stale data"*) — avoided here by using a plain `computed` over a prop rather than a model with an async parent hop.
**Falsifier** Find a value of `t ∈ [0,1]` where the round-trip is not idempotent. `Math.round` composed with `/100` then `×100` is idempotent on all 101 reachable integers; the only non-idempotent inputs are `t` outside `[0,1]`, which the clamp at `:41` excludes on the inbound path.

---

## §6 — Corpus reconciliation

| Corpus row | This challenge |
|---|---|
| lane-frontend §270-271 (this file's two glass-ui imports) | **EXTENDS** — the imports resolve (S-3); the *consumption* of what they import is where the defects are. |
| lane-frontend §382 ("`ConvergenceTimeline.vue:6` … prose comments only" for the retired `glass-track`/`glass-fill`/`glass-thumb` paints) | **AGREE on the class names, CONTRADICT on the conclusion.** The retired *paints* are indeed prose-only, but the retired *token name* is live code at `:136` and dead upstream (C-8). The shadow recipe left a residue the class-name sweep did not see. |
| lane-frontend §480 (value.js peer floor, 5 sites) | **AGREE + narrow** — this file is not one of the 5 (S-1). |
| lane-frontend §619/§624 (reduced-motion coverage; `ConvergencePlot.vue:405` listed) | **EXTENDS** — the child has no `reduce` block at all (C-10), and the parent's is CSS-only against an ungated rAF, exactly as §624 books. |
| lane-frontend §565 (this file listed among SVG surfaces) | **AGREE + sharpen** — the SVG is two inlined FontAwesome paths against a 35-file lucide fleet (C-11). |
| CENSUS-2026-08-03 §38 (value.js surface = 5 statements / 4 files / 6 symbols) | **AGREE** — S-1 uses it as the denominator. |
| `lane-fourier-r3-r6.md` R6-8 (operation↔client leaf non-isolable, TRUE, CARRY → F.W5) | **AGREE, not reachable here** — cited as the reason S-2 is a superlative rather than an absence. |
| `lane-fourier-r3-r6.md` X-3 (45 ops / 30 public / 13 admin) | **N/A by measurement** — this component touches 0 of the 45 (§0). |
| `lane-fourier-r3-r6.md` R3-7a (35 Tooltip callsites / 9 consumers → F.W3) | **CONTRADICTS by omission** — this file is *not* among the 9 consumers, and C-2 is partly why: its sibling transport gets its accessible name from a `<Tooltip>` wrapper (`AnimationControls.vue:66,81`) while this one has neither tooltip nor label. The F.W3 tooltip budget should gain this site. |

---

## §7 — Repair order (for the wave that consumes this)

1. **C-1** — derive `scrub-start`/`scrub-end` from one source. Cheapest correct form: drop `@pointerdown` + the `scrubbing` ref entirely and drive the parent from `update:modelValue` with a trailing idle, or gate on reka's `data-held`. Do **not** paper over it by also listening for `pointerup`/`pointercancel` — that reconstructs the state machine the migration deleted.
2. **C-2** — `:aria-label="playing ? 'Pause convergence animation' : 'Play convergence animation'"` + `:aria-pressed="playing"`; then delete `.is-playing` (`:124-128`) in favour of the variant's `aria-pressed:` paint.
3. **C-3** — delete `:75-77` outright; move the harmonic count to an `aria-live="polite"` region on `:85`.
4. **C-5/C-6** — `size="icon-sm"` and delete `:108-109`; then decide whether `variant="glass"` or the hand paint survives — not both.
5. **C-7** — `:max="1000"` (or `max=1`/`step=0.01`).
6. **C-4** — falls out of C-1 once start/end derive from value changes rather than pointer events.
7. **C-8** — `size="sm|md|lg"`, delete `:135-137`; sweep the other two fleet sites.
8. **C-15** — add `/equation` to an axe keystone; without it, 2–4 regress silently.
