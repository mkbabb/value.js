# CHALLENGE-D — `wb-mix-animationcanvas` · the design is flawed

## Model receipt

I observe myself to be **Opus 5 (`claude-opus-5[1m]`, 1M context)** — the tier this seat was
explicitly spawned with. Declared, not inherited.

---

## Subject

| | |
|---|---|
| Component | `demo/workbenches/mix/MixAnimationCanvas/MixAnimationCanvas.vue` (36 lines) |
| Clock | `demo/workbenches/mix/MixAnimationCanvas/composables/useMixingAnimation.ts` (190 lines) |
| Stage model | `demo/workbenches/mix/MixAnimationCanvas/composables/mixStage.ts` (283 lines) |
| Host | `demo/workbenches/mix/MixPane.vue` (route `/#/mix`) |
| Base | branch `tranche-u`, HEAD `c654824e` |
| Probe substrate | live dev server `http://localhost:9000`, Playwright/Chromium, DPR 1, 1440×900 |

## Verdict — **DEFECTIVE**

The component's own docstring states its thesis three times:

> "the drops arc across the plate toward the result plate's awaiting well (`[data-mix-target]`…)"
> "The convergence **LANDS AT** the result plate — no jump-cuts, no spinner: the animation IS the
> progress." — `useMixingAnimation.ts:5-14`

**Measured on the running app: the thesis is false.** `[data-mix-target]` does not exist in the
DOM at any moment of the narration. The convergence pools **194 CSS px away** from the well it
claims to land in, in empty space between the Mix button and the result plate. Every mix, every
viewport, since the glass-ui 7 adoption (W44, D58).

That is not a bug hiding behind a good design. The reason it went unnoticed for a whole producer
major is *the design*: the component's real inputs are stringly-typed DOM attributes on sibling
subtrees, none of which appear in its props, its types, or any test — and when the contract broke
it silently substituted a fabricated target instead of failing. Below that sit a decorative
renderer that owns the phase machine's only forward edge (reproduced: the mix hangs forever), an
animation that keeps burning frames after KeepAlive deactivation (measured: 100 frames on a
zero-width canvas), and a whole-pane overlay composition that the ratified canon replaced with a
structural **trough** before this seat convened.

---

## Visual truth first

### Frame π-1 — the narration at t = 715 ms, composited, light/desktop/1440×900

`./mix-frozen-t715.png` — captured by starting a 3-operand mix, busy-waiting to t≈715 ms (just
past the `MIX_ARRIVE_MS = 700` "convergence chord"), then freezing `useRAFLoop` through its
`pauseWhenHidden` seam so the last painted frame persists into a real screenshot.

What the frame shows:

1. Three operand chips (blue / amber / green) in the `Selected` well, top of the pane.
2. The result plate below the Mix button at 0.55 opacity (`.mix-plate--ghost`), its dashed
   `WatercolorDot` ghost well at the plate's **left edge**, viewport ≈ (797, 677).
3. The convergence pool — a soft teal-grey smudge ≈ 60 px across — floating at viewport ≈
   (975, 610): **178 px right and 67 px above the well**, straddling the plate's top boundary,
   attached to nothing. It reads as a rendering artifact, not as pigment arriving anywhere.

### Frame π-2 — the canvas alone at t = 880 ms (pool settled, pre-dissolve)

`./canvas-only-t880.png` — `canvas.toDataURL()` of the 510 × 683 backing store. The entire payload
of a 1.2-second narration is one ~56 px desaturated disc at (255, 478) on an otherwise empty
348 330 px² field. **0.71 % of the stage.**

### Static route captures

`audit/visual/shots/{safari-desktop,safari-mobile}-{light,dark}/mix.png` — all four show the pane
at rest. The canvas is idle and invisible in all of them, so the audit matrix contains **zero**
evidence of this component's only visible state. Nor do the `reduced-motion-desktop`,
`forced-colors-desktop`, `zoom-200-desktop`, `rtl-desktop`, `rtl-mobile` matrices, which cover
only `{adminusers, blob, browse, gradient, picker}` — `/#/mix` is absent from every one. That is
an evidence gap in the audit, recorded here as **D-13**.

The desktop captures do establish the housing: a single-column `Card` roughly 510 × 683, content
occupying the top ~530 px, the lower ~40 % empty. That empty acreage is exactly where the
fabricated fallback target lands.

---

## Evidence log

All measurements from the live app. Vue component state was driven read-only through
`__vueParentComponent.setupState` (no source edits, no persisted mutation; the one page-realm
patch used to freeze the loop was reverted and re-verified — `{hidden:false, restored:true}`).

### E-1 · the target attribute is absent from the DOM

```
// during the mixing window, ghost well present:
plate.querySelector('.watercolor-swatch') attribute list =
["data-v-292b9032","data-v-0f138735","aria-hidden","class","data-testid","data-variant","style"]
```

`data-mix-target` — absent. `title` — absent. `tag` — absent. Only Vue's always-merged
`class`/`style`/scope-ids survive. Cause, from the producer typings
(`node_modules/@mkbabb/glass-ui/dist/components/watercolor-dot/WatercolorDot.vue.d.ts:22-49`):

```ts
type __VLS_Props = { color: string; variant?: "solid"|"ghost"; animate?: boolean;
                     cycleDuration?: number; range?: [number, number]; seed?: string; }
```

No `tag`. No attribute inheritance (`inheritAttrs: false` — proven by observation: `aria-label`
and `title` are dropped while `class` merges). glass-ui 7's P051 abrogated the interactive host;
consumer fallthrough attributes went with it.

### E-2 · the fallback fires, and the miss is 194 px

```
fallback  = {x: 255,  y: 478.1, r: 28}     // mixStage.ts:124  {clientW/2, scrollH*0.7, 28}
real well = {x: 68,   y: 528,   r: 28}     // layoutCenter of the rendered ghost dot
distance  = 194 px                          // 38 % of the 510 px pane width
root.clientWidth = 510   root.scrollHeight = 683
```

### E-3 · the narration runs, PRM is off, the pool never touches the plate

Painted-alpha sampling of the mix canvas across one mix (`prefers-reduced-motion: reduce` →
`false`):

| t (ms) | phase surface | `[data-mix-target]` | painted samples | max α |
|---:|---|---|---:|---:|
| 0 | — | false | 0 | 0 |
| 43 | `.mix-plate--ghost` | **false** | 17 | 54 |
| 120 | ghost | **false** | 39 | 155 |
| 301 | ghost | **false** | 109 | 228 |
| 502 | ghost | **false** | 187 | 234 |
| 702 | ghost | **false** | 193 | 243 |
| 904 | inked (ghost off) | **false** | 193 | 243 |
| 1152 | inked | false | 60 | 21 |
| 1403 | inked | false | 0 | 0 |

The choreography is alive and correct in every respect *except* where it goes.

### E-4 · the phase machine strands when the 2D context is unavailable

```js
HTMLCanvasElement.prototype.getContext = function (...a) { return this === mixCanvas ? null : orig.apply(this,a) }
ss.startMix(); await 1800ms;
→ { ghostStuck: true, plateOpacity: "0.55", hasResultText: false, plateText: "Result" }
```

The mix result was computed synchronously and correctly at `startMix()`. It is never revealed.
The plate sits at 0.55 opacity showing the word "Result" and nothing else — forever. No error, no
timeout, no recovery, no way back except `Reset`, which is itself inside the plate the user cannot
see.

### E-5 · 100 animation frames after KeepAlive deactivation

`CanvasRenderingContext2D.prototype.clearRect` instrumented to count frames on the mix canvas
(the loop clears once per frame, `useMixingAnimation.ts:99`):

```
framesBeforeNav (t=0…250ms, pane visible)   : 30
location.hash = '#/gradient'  → MixPane deactivates (PaneSlot.vue:120 <KeepAlive :max>)
canvas.clientWidth while deactivated        : 0
framesAfterDeactivation (t=250…1250ms)      : 100
```

100 rAF frames of gradient allocation, bézier evaluation and `arc()` fills, painting into a
zero-width box the user cannot see.

### E-6 · the colors path to this component is dead in the shipped build

```
document.querySelector('.add-slot-ghost') →
  tag: "SPAN"  aria-hidden: "true"  aria-label: null  tabIndex: -1  pointer-events: "none"
addSlot.click() ×2, +120ms each → [data-mix-source] count: 0 → 0   (listener not even bound)
```

`MixSourceSelector.vue:164-176` passes `tag="button"`, `aria-label`, `@click` to a glass-ui 7
`WatercolorDot` that has no `tag` prop and no attribute inheritance. There is **no pointer path
and no keyboard path** to add a colour to the mix. The same abrogation kills the
`Add color … from …` palette swatch buttons at `MixSourceSelector.vue:211-221`. I had to drive
`setupState.addColor()` directly to exercise the subject at all.

### E-7 · resolved tokens (for the motion and z findings)

```
--duration-fast .2s | --duration-normal .3s | --duration-slow .45s
--spring-snappy-duration calc(.44s*1) | --spring-smooth-duration calc(.35s*1)
--z-controls 20 | --z-ornament 20      computed z-index of the mix canvas: 20
```

---

## Findings

Severity: **BLOCKER** = the component does not do the thing it exists to do, or bricks a user
flow. **MAJOR** = a named canon law or owner edict is violated with a real consequence.

### D-1 · BLOCKER — the convergence lands 194 px from its target; a masking fallback hides it

**Mechanism.** The choreography's destination is published as a *fallthrough HTML attribute on a
producer component* (`MixResultDisplay.vue:69`, `data-mix-target` on `<WatercolorDot>`) and
consumed by a *string query on the consumer's grandparent subtree*
(`mixStage.ts:121`, `root.querySelector("[data-mix-target]")`). There is no type, no prop, no
emit, no test and no build-time check anywhere on that path. glass-ui 7 stopped forwarding
consumer attributes; the contract evaporated in silence.

The design then *conceals its own failure*: `mixStage.ts:122-124` substitutes

```ts
: { x: root.clientWidth / 2, y: root.scrollHeight * 0.7, r: 28 }
```

— a target derived from the pane's **scroll extent**, a quantity with no relationship whatsoever
to where the result plate is. This is precisely the masking fallback owner edict 2 forbids ("no
masking fallbacks"). Had the code thrown, or drawn nothing, the break would have surfaced in W44's
adoption gate. Instead it drew a confident, wrong animation.

**Evidence.** E-1, E-2, frame π-1, frame π-2.
**Reproduction.** `/#/mix` → two operands → Mix. Observe the pool settle in the void above the
plate. Or: `root.querySelector('[data-mix-target]')` during the mixing window → `null`.
**Cure.** Delete the attribute contract entirely — see the gestalt cure below. A trough that owns
its own box needs no target lookup. If any DOM measurement survives at all, it must be a
*required* input: the destination element passed in as a prop/`useTemplateRef`, typed, with the
absence branch **failing loudly**, never fabricating coordinates.

### D-2 · BLOCKER — a decorative renderer owns the phase machine's only forward edge

**Mechanism.** `useMixingState.ts:5-15` declares the ONE-CLOCK LAW: the state machine owns no
timers and advances `mixing → done` *only* on the canvas's `onSettled`. `MixAnimationCanvas.vue:15`
repeats it: "the phase machine's only forward edge." So a purely decorative Canvas2D narration is
load-bearing for a state transition whose data was computed synchronously 900 ms earlier.

`useMixingAnimation.ts:127-157` guards four abort paths (no canvas, no parent, no pool colour, no
stage) by firing `onSettled` — but the fifth, `canvas.getContext("2d") === null`, is only
half-guarded: `arm()` writes `if (ctx) ctx.setTransform(...)` at line 145 and then continues to
`collectStage` and `loop.start()` regardless. Frame 1 hits `if (!canvas || !ctx || !stage) { loop.stop(); return; }`
at line 92-95 — **`loop.stop()` without `onSettled()`**. The machine strands.

Null `getContext("2d")` is not exotic: iOS Safari drops canvas backing stores under memory
pressure, Firefox `privacy.resistFingerprinting` and several extensions return null, and the
context is requested *after* an unbounded number of other canvases exist on the route (the audit
counts 3 canvases on `/#/mix` desktop).

**Evidence.** E-4 — reproduced, plate stuck at opacity 0.55 with the literal text `Result`.
**Reproduction.** Patch `getContext` to return null for the mix canvas, start a mix, wait.
**Cure.** Invert ownership. `useMixingState` advances to `done` itself — the math is synchronous,
there is nothing to wait for. The narration becomes epiphenomenal: it observes `phase`, may be
absent, interrupted, reduced or broken, and the product still works. Delete `onSettled` as a state
edge. This also deletes D-1's blast radius, PRM's special case, and three of the four existing
"settle honestly" escape hatches.

### D-3 · MAJOR — parked animation keeps animating (KeepAlive blind spot)

**Law.** `VISUAL-CONSTITUTION.md:145` — "Paused, parked and offscreen mean no animation work."

**Mechanism.** The only teardown hook is `onBeforeUnmount` (`useMixingAnimation.ts:187`). MixPane
is `KeepAlive`-cached (`demo/shell/PaneSlot.vue:120`), so route changes **deactivate** rather than
unmount; `onDeactivated` is nowhere in the file. glass-ui's `useRAFLoop` `pauseWhenHidden` binds
`useDocumentVisibility` only (`dist/useRAFLoop-B3YlWK4M.js`, the `if (m) { let e = t(), {hidden:n} = e; … }`
branch) — document visibility, not component activity.

**Evidence.** E-5 — 100 frames drawn after deactivation, `clientWidth === 0`.
**Cure.** Component activity is a producer concern, not a per-consumer patch (edict 4). Relay to
glass-ui BH: `useRAFLoop` should pause on `onDeactivated` and resume on `onActivated` by default,
the same way it already pauses on `document.hidden`. Consumer-side, the loop must not outlive the
pane's visibility under any hook.

### D-4 · MAJOR — the component is designed against a superseded composition

**Law.** `OPTICAL-BENCH-COMPOSITIONS.md:43` — Mix is *"P122 `golden`: N-operand rack/**trough**
61.8033989%; result/method/provenance 38.1966011%"*. `VISUAL-CONSTITUTION.md:48` — outer housing
"its own `InstrumentChassis` composition"; §7 Mix (line 202) — "An ordered N-operand rack … 
**converges through one trough** into one result." `VISUAL-CONSTITUTION.md:38` — "`Card` … is never
the default page primitive."

**Mechanism.** Shipped: one full-height `Card` (`MixPane.vue:62`) in a single column, with the
convergence delivered as a `position:absolute; inset:0` overlay canvas
(`MixAnimationCanvas.vue:32`) whose geometry is derived from `canvas.parentElement.clientWidth`
and `.scrollHeight` (`useMixingAnimation.ts:137-142`). The trough — a *structural* region through
which operands converge — does not exist; an overlay painting across header, tabs, controls and
plate stands in for it.

Two consequences beyond the canon breach: (a) the component's correctness is coupled to an
anonymous `parentElement` — when the housing becomes the mandated `InstrumentChassis`, every
measurement in `mixStage.ts` silently re-bases with no compile error, exactly as the
`data-mix-target` contract silently died; (b) the "cover the pane's full scrollable extent"
arithmetic at `useMixingAnimation.ts:135-142` exists *only* because the destination might be below
the fold — a problem a trough with its own box does not have.

**Evidence.** Quoted canon; `MixPane.vue:61-62`; `useMixingAnimation.ts:137-142`; frame π-1.
**Cure.** Transpose the convergence into the trough. See below.

### D-5 · MAJOR — the narration is optically negligible and costs 900 ms of withheld result

**Law.** `VISUAL-CONSTITUTION.md:139` — "Spatial continuity uses **one producer-owned glass-ui
spring register**." `PROPORTION-AUDIT.md:73` (§5.8) — "Real rendered relation wins over token
intent." §5.5 — a small mark is data, status, labelled action, drag affordance, focus register,
**or removed**.

**Mechanism.** The timeline is three bare module constants — `MIX_ARRIVE_MS = 700`,
`MIX_CONVERGE_MS = 900`, `MIX_EPILOGUE_MS = 300` (`mixStage.ts:22-26`) — and the easing is
`easeInOutCubic` / `easeOutCubic` / `smoothStep3` imported from `@mkbabb/value.js/easing`. None of
it touches the house register (E-7: `--duration-fast .2s`, `--normal .3s`, `--slow .45s`,
`--spring-snappy .44s`, `--spring-smooth .35s`). 1200 ms is **2.7×** the slowest house duration.

And it buys nothing. Terminal pool radius `tr = max(target.r, 14) = 28` → πr² ≈ 2 463 px² on a
510 × 683 = 348 330 px² stage = **0.71 %** of the pane (frame π-2). Two operands produce two
~30 px smudges. The user waits 900 ms for an instantly-available result in exchange for a
translucent dot the size of a favicon, landing (D-1) in the wrong place.

**Evidence.** `mixStage.ts:22-26`; E-7; frame π-2; the measured 0.71 % area share.
**Cure.** Either the convergence becomes proportionate — the trough is a real region and the
operands visibly travel through it at protagonist scale — or it is subtracted (PROPORTION-AUDIT
§5.6: "Subtraction precedes explanation"). What may not survive is a 900 ms blocking narration
carrying 0.7 % of the stage. Whatever survives takes its duration and curve from the glass-ui
spring register, not from three integers in a stage file.

### D-6 · MAJOR — the narration silently under-represents the operands

**Law.** `VISUAL-CONSTITUTION.md:202` — "The rack remains legible at 2, 3 and 12 colors."

**Mechanism.** Two independent truncations, neither surfaced:
* `mixStage.ts:29` `MAX_DROPS = 12`; `mixStage.ts:157` `origins.slice(0, MAX_DROPS)`.
* `MixSourceSelector.vue:254` stamps only `palette.colors.slice(0, 4)` into `data-mix-colors`.

A 2 × 8-colour palette mix narrates 8 of 16 pigments. A 3 × 8 narrates 12 of 24 (both truncations
compounding). The canon's palettes arm is "two or more potentially unequal palettes" — precisely
the case the narration misrepresents. The animation asserts "these are the things being mixed";
for palettes it is wrong by construction.

**Evidence.** `mixStage.ts:29,157`; `MixSourceSelector.vue:254`.
**Reproduction.** NONE executed — the palettes arm needs ≥ 2 saved palettes and the probe fixture
had 1. Labelled a **code-read finding**, not a hypothesis: both slices are unconditional.
**Cure.** The narration derives from the same operand model the mix math consumes, with no local
cap. If 24 pigments cannot be narrated legibly, that is a composition decision for the trough
(bundle per operand, one drop per *operand* not per *colour*) — not a silent `slice`.

### D-7 · MAJOR — the primary path to this component is dead (attribution: `MixSourceSelector`)

Recorded here because it decides this seat's evidence: **the subject component cannot be reached
by any user of the shipped build through the colors path.** `tag="button"` is not a glass-ui 7
prop; the add-slot renders as `<span aria-hidden="true" tabindex="-1" style="pointer-events:none">`
with no click listener bound (E-6). Same for the `Add color … from …` palette swatches.

Design consequence for the subject: the only convergence a real user can currently trigger is the
palettes arm — the one arm whose narration is truncated (D-6) and whose pool "lands on the first
well slot" by the composable's own admission (`useMixingAnimation.ts:79-81`), i.e. narrates one
slot of an N-slot result.

**Evidence.** E-6. **Owner** — `MixSourceSelector.vue` seat; relay to the glass-ui BH inbox with
D-1's cause (same abrogation).

### D-8 · MINOR — geometry is sampled once; resize, zoom and reflow are unhandled states

`arm()` measures `parent.clientWidth` / `parent.scrollHeight`, sizes the bitmap, and never looks
again (`useMixingAnimation.ts:135-147`). No `ResizeObserver`, no `window.resize` handler. A
viewport change, a 200 % zoom step, a font-size change or a late-loading element mid-narration
leaves a stretched bitmap and coordinates measured against a layout that no longer exists. The
`inset-0 w-full` CSS box rescales; the backing store and the drop coordinates do not.

**Reproduction.** NONE executed — labelled a **hypothesis**; the code path is unambiguous.
**Cure.** Falls out of the trough transposition: a region-local canvas observes its own box.

### D-9 · MINOR — `prefers-reduced-motion` is sampled once, at arm

`respectReducedMotion: false` is passed to `useRAFLoop` (`useMixingAnimation.ts:113`), deliberately
disabling the host's live PRM watch, and the consumer branch reads `prefersReducedMotion.value`
only inside `arm()` (line 120). PRM engaged *during* a narration is not honoured; the drops keep
flying. The reasoning in the docstring (a paused loop would strand the machine) is sound — and is
itself an artifact of D-2. Once the phase machine owns its own edge, the loop can respect PRM
natively and simply stop.

### D-10 · MINOR — a decorative narration inherits the colour-DISPLAY forced-colors exemption

`demo/styles/foundation.css:680` grants `forced-color-adjust: none` to the bare `canvas` selector,
under a rationale explicitly about *colour content*: "the surfaces whose whole PURPOSE is to show a
color — the actual content of a color tool" (lines 653-656). The mix narration is not colour
content; it is transient decoration. In WHCM it therefore paints arbitrary pigment across a surface
the user asked to be rendered in the system palette. The roster needs a named class for the mix
canvas on the *chrome* tier, not a blanket leaf rule.

### D-11 · INFO — contrivance: a wrapper that hides coupling instead of encapsulating it

`MixAnimationCanvas.vue` is 36 lines of which the body is one `useTemplateRef` and four
`toRef(() => prop)` forwards. It declares `phase`, `result`, `space`, `hueMethod` — none of which
are its real inputs. Its real inputs are `[data-mix-source]`, `[data-mix-color]`,
`[data-mix-colors]` and `[data-mix-target]` on subtrees it does not own, plus the *identity of its
own `parentElement`*. The component boundary buys nothing and costs the reader the truth about
what the thing depends on. Owner edict 3 (KISS, no contrivance).

### D-12 · INFO — per-frame gradient allocation

`drawDisc` mints a fresh `CanvasGradient` per disc per frame (`mixStage.ts:199`); each in-flight
drop draws 3 discs (2 trail + head) → up to 36 gradient objects/frame at `MAX_DROPS`, plus the
pool's 2. Measured 146 frames for one 1.4 s run — ~5 000 short-lived gradients per mix. Not a
present bottleneck at 2-3 operands; it is the reason the 12-operand arm was never benched.

### D-13 · INFO — the state matrices never captured this route

`audit/visual/shots/{reduced-motion,forced-colors,zoom-200,rtl}-*` cover only
`{adminusers, blob, browse, gradient, picker}`. `/#/mix` appears in the four Safari
light/dark × desktop/mobile matrices only, all at rest with an idle canvas. Every claim about this
component's reduced-motion, forced-colors, 200 %-zoom and RTL behaviour in the mega-tranche record
is currently unwitnessed. This report's π-1/π-2 are the first rendered frames of the narration in
the audit corpus.

---

## State coverage

| State | Designed? | Verdict |
|---|---|---|
| idle | yes | canvas transparent, `pointer-events-none`, `aria-hidden` — sound |
| armed → in flight | yes | runs, but lands 194 px wrong (**D-1**) |
| settled / epilogue | yes | dissolves cleanly by t≈1400 ms (E-3) |
| second and subsequent mix | yes | re-arms correctly; same D-1 miss |
| reset → idle | yes | `clearCanvas`, `stage = null` — sound |
| empty (no operands) | yes | `origins.length === 0` → settle honestly (`mixStage.ts:155`) |
| **no 2D context** | **no** | **strands the mix forever (D-2)** |
| **KeepAlive deactivated** | **no** | **100 frames of offscreen work (D-3)** |
| unmounted mid-mix | yes | `onBeforeUnmount → loop.stop()` — sound |
| tab hidden mid-mix | yes | `pauseWhenHidden`, elapsed excludes paused time — sound |
| reduced motion (from rest) | yes | immediate settle, zero dead time — sound |
| **reduced motion toggled mid-mix** | **no** | ignored (D-9) |
| **resize / zoom mid-mix** | **no** | stale bitmap + stale coordinates (D-8) |
| **> 12 operands / > 4 colours per palette** | **no** | silent truncation (D-6) |
| forced-colors | partially | inherits the colour-surface exemption it does not qualify for (D-10) |
| RTL | yes | `offsetLeft` walk, `clientWidth/2`, `inset-0` are all direction-neutral — sound |
| error / failed mix | n/a here | `startMix` throws upstream on an unparseable operand (`useMixingState.ts:62`) before `phase` ever reaches `mixing` — the canvas never arms. Owner: `useMixingState`. |
| hover / focus / pressed / drag / disabled / truncated | n/a | non-interactive decorative surface, correctly `aria-hidden` + `pointer-events-none` |

---

## Negative proofs — what I attacked and could not break

The premise is that the design is wrong; these are the places it is not, stated with the evidence
that proves the negative.

* **`z-controls` is a real utility.** Suspected dead class (Tailwind v4 has no `z-index` theme
  namespace). Measured: computed `z-index: 20`, resolving through glass-ui's `--z-controls` bridge
  (E-7). Not a finding.
* **No ungated rAF — the PRM-RAF epidemic class does not apply.** The loop is glass-ui
  `useRAFLoop` with `immediate: false`, armed only on `phase → "mixing"`, self-stopping at
  `CONVERGE + EPILOGUE`, `onScopeDispose`-disposed, `pauseWhenHidden` bound to document visibility
  with paused time excluded from `elapsed`. Measured: 146 frames for a 1.4 s window, then 0. The
  single lifecycle hole is deactivation (D-3), not gating.
* **Reduced motion resolves to final geometry.** `VISUAL-CONSTITUTION.md:144` satisfied: `arm()`
  fires `onSettled` immediately under PRM, result inks in with zero dead time. Probe confirmed
  `prm === false` in the capture environment, so the measured narration is the motion arm, not a
  PRM artifact.
* **Idiomatic Vue 3.5.** `useTemplateRef` (not `ref` + name matching), reactive props destructure
  with `toRef(() => x)` re-wrapping for the composable — correct 3.5 form. No `defineModel`, so no
  async-round-trip stale-read hazard; `shallowRef` is not indicated.
* **`verbatimModuleSyntax` clean.** Every type-only import in both files uses `import type`
  (`MixAnimationCanvas.vue:3,4,6`; `useMixingAnimation.ts:40,43,44,45,46`).
* **No god module.** The split is real and well-motivated: `mixStage.ts` = pure geometry/pigment,
  `useMixingAnimation.ts` = clock + lifecycle, `.vue` = mount. This is the one axis on which the
  design is clearly better than the surrounding code.
* **The "one shape" claim holds.** The ghost well and the settled dot both pass `seed="mix-result"`
  and the same `color`; `seed` is a genuine glass-ui 7 prop, so the silhouette is identical. Only
  the *position* claim is false, not the shape claim.
* **Safari-true by construction holds.** No `ctx.filter`, no engine branch, no degraded path — the
  four Safari matrices report 0 page errors, 0 console errors and 0 horizontal overflow on
  `/#/mix` (`audit/visual/REPORT.md:123,138,153,168`).
* **RTL is sound.** The measurement walk is `offsetLeft`/`offsetTop` and the fabricated target is
  `clientWidth/2`; the bow alternates sign symmetrically. Nothing mirrors incorrectly.

---

## The gestalt cure — one transposition, not eleven patches

D-1, D-4, D-8, D-11 and half of D-5 are the *same* defect wearing five faces: **the convergence has
no home of its own, so it must reach across the pane to find one.** The canon already named the
home and this implementation predates it.

**1. Build the trough.** Adopt the ratified P122 `golden` Mix composition
(`OPTICAL-BENCH-COMPOSITIONS.md:43`): the N-operand rack/**trough** at 61.8034 %, result /
method / provenance at 38.1966 %. The trough is a real element with a real box between the rack
and the result. The convergence happens *inside it*.

Everything then dies of natural causes: no `[data-mix-*]` attribute contract (D-1), no
`parentElement` coupling (D-4, D-11), no `scrollHeight` arithmetic or below-the-fold special case,
no full-pane overlay, and geometry becomes one `ResizeObserver` on one owned box (D-8). The
narration also gains the mass it lacks — a trough at 61.8 % of the stage is a protagonist, not a
0.71 % smudge (D-5).

**2. Invert the clock.** `useMixingState` advances `mixing → done` itself; the math is synchronous
and there is nothing to wait on. The narration observes `phase` and never gates it. D-2 dies. So do
the four "settle honestly" escape hatches, the PRM special case (D-9 — the loop may then respect
PRM natively), and the entire class of "the decoration bricked the product".

**3. Take the timeline from the register.** Duration and curve come from the glass-ui spring
register (`--spring-snappy`, `--spring-smooth`, `--duration-*`), not from `MIX_ARRIVE_MS = 700`
in a stage file — `VISUAL-CONSTITUTION.md:139`. If the trough narration cannot be expressive
inside the house register, that is an argument to the producer for a new rung, not a licence for
local constants.

**4. Relay upward, twice.** To glass-ui BH (the standing fond): (a) `useRAFLoop` should pause on
`onDeactivated`/resume on `onActivated`, since "parked means no animation work" is a producer-level
invariant, not a per-consumer patch (D-3); (b) the P051 attribute-inheritance change silently broke
consumer fallthrough on `WatercolorDot` — `data-*` hooks and `title` are load-bearing at several
value.js sites (D-1, D-7). Ask for either attribute inheritance on the face or a named, typed seam.

**5. Then decide whether it lives.** With the trough real and the clock inverted, re-judge the
narration on proportion (PROPORTION-AUDIT §5.5/§5.6). A convergence that carries the mix's meaning
at protagonist scale earns its 900 ms. A 60 px smudge does not, and subtraction precedes
explanation.

---

## Artifacts

* `docs/tranches/V/megatranche/audit/components/wb-mix-animationcanvas/mix-frozen-t715.png` — π-1,
  the composited narration frozen at t ≈ 715 ms (pool vs. well, 1440×900, light).
* `docs/tranches/V/megatranche/audit/components/wb-mix-animationcanvas/canvas-only-t880.png` — π-2,
  the 510 × 683 backing store at pool settle; the entire payload of the narration.
