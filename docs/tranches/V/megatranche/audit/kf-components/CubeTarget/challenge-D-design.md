claude-opus-5[1m]

# CHALLENGE · CubeTarget · axis D (DESIGN)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/cube/CubeTarget.vue` (239 L) + its sourced stylesheet `CubeTarget.css` (154 L).
**Read whole, read-only:** `CubeTarget.vue`, `CubeTarget.css`, `CubeAxisLines.vue`, `useCubeRelit.ts`, `orbital-drag/OrbitalDrag.vue`, `orbital-drag/index.ts`, `orbital-drag/composables/useOrbitalPointer.ts`, `composables/useDoubleTap.ts`, `CubeScene.vue`, `useCubeDemo.ts`, `matrix-editor/useTransformState.ts`, `styles/style.css`, `styles/layout.css`, `styles/brand.css`, and the installed `@mkbabb/glass-ui@7.0.0` token/utility sheets.
**Method** static + source-derived only (no browser tooling, per the lane law). Every contrast figure below is computed from shipped token values by WCAG 2.x relative-luminance; every livable-only claim is tagged `UNPROVEN-NEEDS-LIVE`.

**Tally** 24 defects — 2 BLOCKER · 7 MAJOR · 12 MINOR · 3 INFO — and 5 superlatives.

**Standing posture** the component was assumed defective. Four candidate defects were *killed by their own falsifiers* before filing and are recorded in §5 so the next auditor does not re-raise them.

---

## 1 · BLOCKERS

### D-B1 — the re-lit die's shadow model **inverts** in the light theme
**BLOCKER** · `CubeTarget.css:126–141` (`.face-relit`), `styles/style.css` cascade → `@mkbabb/glass-ui/dist/styles/tokens/light-dark.css` (`--neutral-0: light-dark(hsl(40 30% 98%), hsl(24 9% 4%))`), `demo/app/index.html:82–86` (both arms ship, OS-defaulted).

The signature egg — "the light is PINNED in the room; the cube turns under it" (`useCubeRelit.ts:10–12`) — implements *shadow* as a veil of `var(--background)`:

```css
linear-gradient(180deg,
  color-mix(in srgb, var(--background) calc((1 - var(--lit,0.5)) * 46%), transparent) 0%,
  color-mix(in srgb, var(--background) calc((1 - var(--lit,0.5)) * 62%), transparent) 100%)
```

`--background` = `--neutral-0`, which is `hsl(40 30% 98%)` ≈ `rgb(251,250,248)` in the **light** arm. So a face turned *away* from the key light is washed with up to 62 % **near-white**, while a face turned *toward* it gets only the specular. Computed for face 1 (`--face-1: rgba(255,0,0,.8)`, `style.css:148`) over the light background, at the face centre:

| `--lit` | composite | relative luminance |
|---|---|---|
| 1.0 (facing the light) | ≈ `rgb(254,86,86)` | **0.284** |
| 0.0 (turned away) | ≈ `rgb(252,158,157)` | **0.474** |

The face turned **away** from the pinned key light renders **1.67× brighter** than the face turned toward it. The lighting cue does not merely weaken in the light theme — it runs backwards, and with it the depth read the T.A1 comment says the re-light was retained to carry (`CubeTarget.css:148–154`). The dark arm (`hsl(24 9% 4%)`) is correct; the component was evidently only ever looked at there.

**Falsifier** — this dies if (a) `--background` resolves dark in the light arm, (b) the light arm is unreachable in the shipped demo, or (c) a `mix-blend-mode`/blend context makes the veil subtractive. (a) is refuted by `tokens/light-dark.css`; (b) by `index.html:82–86`, which adds `.dark` only when stored-pref or OS says dark; (c) by `.face-relit`, which declares no blend mode.

### D-B2 — the scene's primary interactive subject has **no keyboard path and no accessible name**
**BLOCKER** · `CubeTarget.vue:1–104` (whole template), `CubeAxisLines.vue:10–24`, `OrbitalDrag.vue:1–9, 280–291`.

The cube is a rich control surface: orbit-drag, wheel-zoom, shift/ctrl translate + scale, held-X/Y/Z axis constraint, and a double-tap die-roll. Grepping the entire target tree for `aria-*`, `role=`, `tabindex`, `sr-only`, `:focus` returns exactly **one** hit — `aria-hidden="true"` on the decorative relit span (`CubeTarget.vue:69`). There is no focusable element, no accessible name, no role, no focus-visible treatment, and no textual description of the die's state (which face is up, what the axis lock is doing). The six numerals 1–6 are the only exposed content, and they are unlabelled `<span>`s that read as a bare "123456" string.

The keyboard *does* participate — `X`/`Y`/`Z` latch an axis (`useOrbitalPointer.ts:167–174`) — but only as a **modifier to a pointer drag**; keys alone rotate nothing. WCAG 2.1.1 (Keyboard) and 4.1.2 (Name, Role, Value) both fail on the scene's protagonist.

**Falsifier** — this dies if an equivalent keyboard-operable path to the same function exists. The nearest candidate, the matrix editor (`MatrixEditor.vue` via `CubeScene.vue:170–181`), is refuted twice: it is rendered only while `storedControls.selectedControl === "matrix-controls"`, which itself requires the Matrix *channel* to be selected (`CubeScene.vue:228–238`), and it drives raw `matrix3d` cells, not the orbit. It is not an alternative path to the default state of the scene.

---

## 2 · MAJOR

### D-M1 — the Roll egg ignores `prefers-reduced-motion`, and the stylesheet asserts the opposite
**MAJOR** · `CubeTarget.vue:204–216`; contradicted prose at `CubeTarget.css:35`.

```ts
rollAnim = new CSSKeyframesAnimation({
    duration: 1100, iterationCount: 1, fillMode: "forwards",
    timingFunction: "ease-out-back",
})
```

`respectReducedMotion` is **absent**, and the engine default is `false` (`src/animation/constants/types.ts:201` — "Default false. (consumers opt in)"). The house default is the opposite: `demo/state/animationOptionsStore.ts:49` sets `respectReducedMotion: true` for every stored channel, and the cube's own intro animation hand-rolls a `matchMedia` gate (`useCubeDemo.ts:162–169`). So a 1.1 s, **two-axis, 360–720° whole-die tumble on an overshooting `ease-out-back`** — precisely the vestibular-trigger class WCAG 2.3.3 addresses — plays at full amplitude under an active reduce preference. Worse, `CubeTarget.css:35` states as fact: *"Reduced-motion was already still."* It is not; that sentence was true only of the deleted `idle-bob`.

Folds census `lane-frontend.md §6.5`, which enumerates 13 PRM enforcement sites across 12 files and lists `scenes/cube/useCubeDemo.ts:164` for this scene — `CubeTarget.vue` is correctly **absent** from that list. This finding is the concrete shape of that absence.

**Falsifier** — dies if a global `@media (prefers-reduced-motion: reduce)` kill-switch covers engine-driven inline transforms. Refuted: glass-ui's `accessibility.css` carries only `prefers-contrast` and `forced-colors` blocks, and the only PRM rule in the compiled utility sheet is `.motion-reduce\:transition-none`, which this component does not use.

### D-M2 — three of six die numerals fail WCAG 1.4.3 large-text contrast in the dark theme
**MAJOR** · `CubeTarget.vue:71–78` (`.face-numeral`, no colour class → inherits `text-foreground`), `styles/style.css:148–153` (`--face-1…6`), `glass-ui/tokens/light-dark.css` (`--foreground` dark = `hsl(30 14% 90%)` ≈ `rgb(233,229,226)`).

`.text-display-2` resolves to `clamp(2.058rem, 1.5rem + 2.2vw, 3.33rem)` = 33–53 px, so the 3:1 large-text floor applies. Computed against the dark background `hsl(24 9% 4%)`, given as a range: **base** = face colour alpha-composited on the background only; **modelled** = plus the `.face-lacquer` sheen and the `.face-relit` stack at `--lit = 0.5`.

| face | crayon | base | modelled | 3:1 |
|---|---|---|---|---|
| 1 front | red | 4.61:1 | 6.03:1 | pass |
| **2 right** | **green** | **1.71:1** | **2.63:1** | **FAIL** |
| 3 back | blue | 8.82:1 | 9.43:1 | pass |
| **4 left** | **yellow** | **1.35:1** | **2.12:1** | **FAIL** |
| 5 top | magenta | 3.71:1 | 5.08:1 | pass |
| **6 bottom** | **cyan** | **1.56:1** | **2.43:1** | **FAIL** |

The verdict is robust across the whole modelling range: faces 2/4/6 fail under either reading, faces 1/3/5 pass under either. The cause is structural — the numeral inherits the *global* foreground, so its colour is a function of the theme while the face colour is a function of the die. Nothing in the tree pairs them.

**Falsifier** — dies if `.face-numeral` picks up a colour from somewhere. Refuted: glass-ui's `.text-display-2` sets family/size/leading/tracking/optical-sizing/weight/wrap and **no** `color` (`typography/semantic.css`); the demo's `@layer demo-typography` override (`style.css:270–277`) sets only `font-weight` and `letter-spacing`; there is no colour utility on the span or on any ancestor inside the cube. Also dies if the light arm is the only shipped arm — refuted by `index.html:82–86`.

### D-M3 — the "loader" is an indefinite spinner used to mean *nothing selected*, with no PRM gate and no accessible status
**MAJOR** · `CubeTarget.vue:28–35`; state source `CubeScene.vue:20`.

```
:show-loader="!props.hideLoader && !storedControls.selectedAnimation"
```

This is not a loading state. Nothing is in flight; the condition is "the start screen is down **and** no animation has been picked". It is rendered as `<Loader2 class="… animate-spin">` — a progress indicator that spins forever. Three compounding problems:

1. **Semantic dishonesty.** An indefinite spinner promises work in progress. Here it promises work that will never complete. This is an *empty state*, and the design language for an empty state is not a spinner.
2. **No PRM gate.** `.animate-spin` compiles to `animation: var(--animate-spin)` = `spin 1s linear infinite` (glass-ui `components.css` `:root`), with no reduced-motion variant applied at the call site. Under an active reduce preference the demo's idle screen carries a perpetual rotation.
3. **No status semantics.** No `role="status"`, no `aria-label`, no `aria-live`, no `sr-only` text. Screen-reader users get nothing at all from the state; sighted users get a lie.

**Falsifier** — dies if `showLoader` ever tracks real async work. Refuted at its single call site (`CubeScene.vue:20`): both terms are synchronous store/prop reads. Dies if `animate-spin` is PRM-gated — refuted by the compiled sheet.

### D-M4 — every roll after the first begins with a **snap back to zero**
**MAJOR** · `CubeTarget.vue:205–216`.

`fillMode: "forwards"` leaves `.cube` resting on its rolled attitude — e.g. `rotateX(810deg) rotateY(-450deg)` — and the comment at `:219–221` is explicit that this is intended ("the fillMode:forwards leaves the die resting on its rolled face"). But the keyframes hard-code the origin:

```ts
from: { transform: { rotateX: "0deg", rotateY: "0deg" } },
to:   { transform: { rotateX: `${endX}deg`, rotateY: `${endY}deg` } },
```

At `t = 0` of roll #2 the engine writes the literal `from` frame, discarding the resting attitude and cutting the die back to identity before the tumble starts. The bouncy `ease-out-back` landing that the egg is built around is preceded, from the second roll onward, by an un-eased jump-cut — the exact discontinuity the sibling T.A3 note (`useCubeDemo.ts:124–129`) says the scene's "ONE settle-motion language" exists to prevent.

**Falsifier** — dies if `CSSKeyframesAnimation.fromKeyframes` re-bases an explicitly authored `from` frame off the target's computed transform rather than applying it. The `from` is authored, not omitted, so the engine has an explicit value to honour; verifying the tie-break is a library read (`src/animation/`) outside this axis. Flagged `UNPROVEN-NEEDS-LIVE` for the *rendered* snap; the authored-origin-vs-`forwards`-rest conflict itself is proven from the two cited lines.

### D-M5 — the die's orientation has **two uncoordinated render authorities**, and neither clears the other
**MAJOR** · `CubeTarget.vue:14` (`:apply-transform-to-container="props.isPlaying || props.isStarted"`), `OrbitalDrag.vue:63–76`, `useTransformState.ts:192–211`, `useCubeDemo.ts:154–158`, `CubeTarget.vue:217` (roll).

One visual quantity — where the die is pointing — is written by four sites onto two different elements, switched by `isStarted`:

| when | element | written value | writer |
|---|---|---|---|
| `!isStarted` | `.cube` | `matrix3d(…)` recomposed from Euler `Rx·Ry·Rz` | `useTransformState.ts:199–210` |
| `isPlaying \|\| isStarted` | OrbitalDrag container | `translate3d() rotate3d() scale3d()` off the quaternion's native axis-angle | `OrbitalDrag.vue:63–76` |
| group playing | `.cube` | `rotateX/Y/Z`, `matrix3d` | `useCubeDemo.ts:155–157` (three animations, same target, same property) |
| after a roll | `.cube` | `rotateX/rotateY`, `fillMode: forwards` | `CubeTarget.vue:217` |

Nothing clears `.cube`'s inline transform when `isStarted` flips. The pre-start drag therefore leaves a `matrix3d` on `.cube` encoding an orientation that the container then *also* renders as `rotate3d` — the same rotation composed twice — until the group's first frame overwrites `.cube` with `rotationAnim`'s `from` frame (identity). Two representational conventions for one quantity (Euler recomposition vs. gimbal-free axis-angle), no hand-off, no clear.

**Proven from source:** the four writers, the two targets, the `isStarted` switch, and the absence of any clear. **`UNPROVEN-NEEDS-LIVE`:** the magnitude and visibility of the resulting pop at first Play.

**Falsifier** — dies if any of the four writers resets the others' element, or if `isStarted` is never observed true while `.cube` still holds a drag-authored matrix. Neither is present in the read tree.

### D-M6 — the axis-lock reveal exposes an unguarded global `x`/`y`/`z` key latch
**MAJOR** · `CubeTarget.vue:101, 158–163`, `CubeAxisLines.vue:10–24`, `OrbitalDrag.vue:276–277`, `useOrbitalPointer.ts:167–174`.

```ts
useEventListener(window, "keydown", (e) => pointer.updatePressedKeys(e, true));
…
const key = event.key.toLowerCase();
const slot = key === "control" ? "ctrl" : key;
if (slot in pressedKeys.value) pressedKeys.value[slot] = isPressed;
```

There is no `event.target` guard — no check for `<input>`, `<textarea>`, `contenteditable`, or an open dialog. Typing the letters *x*, *y* or *z* anywhere in the application (an animation-name field, a matrix cell, a share input) latches the constraint and, since P.W5.S3, **lights the corresponding axis line across the whole stage**. The egg is what makes this visible: before the reveal a spurious latch was silent; now every `x` a user types flashes a 1000vw red line and changes what the next drag does.

This is filed against CubeTarget rather than OrbitalDrag because CubeTarget is the component that chose to surface the latch (`onPressedKeys`, `:lock="axisLock"`) without also demanding that the latch be trustworthy.

**Falsifier** — dies if an upstream guard exists (a focus-within check, an `inert` stage, a global hotkey arbiter). Refuted: `updatePressedKeys` is the only writer, it is unconditional, and the listener is on `window` with no capture-phase filter.

### D-M7 — `ppMode` silently deletes the die's material *and* its semantics
**MAJOR** · `CubeTarget.vue:82–89`; `styles/brand.css:14–22`.

```html
<template v-else>
  <div class="ppmycota-cube absolute h-full w-full"></div>
  <div class="ppmycota-logo-lg absolute h-full w-full"></div>
</template>
```

In `ppMode` the face loses, all at once: the numeral (the die stops being a die — there is now no way to read which face is up), the `--face-*` crayon, the `.face-lacquer` glossy read, the `1px` inset rim, and `.face-relit` — so the whole orientation-coupled re-light egg goes dark. `useCubeRelit`'s per-face `--lit` is still computed on every rotation tick and still bound to `.cube-side` (`CubeTarget.vue:51`), now consumed by nobody. Both replacement divs are purely decorative brand marks with no `aria-hidden` and no text alternative, so the face's exposed content goes from "1" to nothing.

Nothing announces the mode change, and the toggle lives in a different component entirely (`CubeScene.vue:85–87, 122–124` — a click on the header logo).

**Falsifier** — dies if a `ppMode` stylesheet restores an equivalent material or an accessible label. Refuted: `brand.css` gives `.ppmycota-cube` exactly `background-color: var(--secondary); opacity: .75` and `.ppmycota-logo-lg` a background image plus a brand-hue `filter`.

---

## 3 · MINOR

**D-m1 — a dead transition on `.cube-side`.** `CubeTarget.vue:43` declares `transition-[background-color,opacity] duration-panel ease-in-out`. `.cube-side` never sets `background-color` (the inline crayon is bound on the `.face-lacquer` child, `:59–61`) and never sets `opacity`, in either the numeral or the `ppMode` branch. The transition list matches nothing. `duration-panel` *is* a valid utility (glass-ui bridges `--transition-duration-panel: var(--duration-panel)` = 0.55 s in `theme/bridges.css`), which makes it the wrong token twice over — a **panel-chrome** duration reached for on a scene subject. **Falsifier:** any writer of those two properties on `.cube-side`; none exists in the SFC, the stylesheet, or the parent.

**D-m2 — `justify-items-center` on two flex containers.** `CubeTarget.vue:12` (`preserve-3d relative flex items-center justify-center justify-items-center`) and `:25` (`.cube … flex items-center justify-center justify-items-center`). `justify-items` has no effect in flex layout; both are no-ops. The same three-way centring incantation is then repeated across four nested boxes (`CubeScene.vue:10`, `CubeTarget.vue:3`, `:9`, `:12`) — centring a single child four times. **Falsifier:** a spec path by which `justify-items` affects a flex container; there is none.

**D-m3 — the stage wrapper is duplicated.** `CubeScene.vue:9–14` and `CubeTarget.vue:2–6` are the *same element*: identical `grid h-full w-full max-w-full items-center justify-center justify-items-center overflow-visible`, identical `style="touch-action: none; overscroll-behavior: contain"`, identical `@wheel.prevent`. CubeTarget's copy adds only `relative`. Two grid boxes, two wheel-swallowing handlers, one child. **Falsifier:** a functional difference between the two; the only one is `position: relative`, obtainable by adding one class upstream.

**D-m4 — the die shrinks 22 % as the stage grows, at a single pixel.** `CubeTarget.css:43` (`--side-size: min(25vh, 25vw, 15rem)`) vs `:63–67` (`@media (max-width: 1023px) { --side-size: min(50vh, 50vw, 18rem) }`). On a 900 px-tall viewport: at 1023 px wide the die is `min(450,511,288)` = **288 px**; at 1024 px it is `min(225,256,240)` = **225 px**. The protagonist loses 22 % of its size at the exact moment the stage gets wider. The desktop cap (15 rem) is also *below* the tablet cap (18 rem), so the largest die the design ever draws is on the smaller screen. **Falsifier:** an intended desktop de-emphasis; the tree says the opposite — `CubeScene.vue:280–285` calls the ≥lg size "the cube scene proper … protagonist size".

**D-m5 — the numeral is not proportionally locked to the face.** `.face-numeral` rides `.text-display-2` = `clamp(2.058rem, 1.5rem + 2.2vw, 3.33rem)` — a **viewport**-driven global ramp — while `--side-size` is a **scene-local** `min()` clamp. The ratio drifts across the shipped range: 390×844 → 32.9/195 = **17 %**; 1023×700 → 46.5/288 = **16 %**; 1024×768 → 46.5/192 = **24 %**; 1920×1080 → 53.3/240 = **22 %**. A 1.5× swing in the single proportion that makes the object read as a die. **Falsifier:** a shared derivation between the two scales; there is none — they share no token.

**D-m6 — the loader box is viewport-derived and non-square, contradicting its own token doc.** `CubeTarget.vue:33` sizes the spinner `h-[var(--target-viewport-h)] w-[var(--target-viewport-w)]` = `30cqb` × `30cqi` (`layout.css:21–22`). `layout.css:18–20` claims these "resolve against the clamped stage column". No ancestor of the loader declares `container-type` — the only size containers in the demo are in `easing/`, `sequence/`, `spring/`, `AnimationControlsGroup.css`, `TimingFunctionPanel.vue` and `AnimationVisualizer.vue`, none on the cube's chain — so both units fall back to the small viewport: `30svb` × `30svi`. On 1440×900 that is a **270 × 432** box around a **225 px** die (spinner circle 20 % larger than the subject); on 390×844 it is **253 × 117** around a **195 px** die (spinner 40 % smaller). The spinner/die size relationship inverts between form factors. **Falsifier:** a `container-type` on any ancestor; refuted by exhaustive grep.

**D-m7 — the component contradicts its own z-doctrine three lines apart.** `CubeTarget.vue:44–48` argues, correctly and at length, that the `z-10` on `.cube-side` is "a bare local rung, NOT a participant in the editor z-contract". Then `CubeTarget.css:143–146` sets `.face-numeral { z-index: var(--z-content) }` — the editor contract's **semantic** rung (`style.css:29`, `--z-content: 10`) — for a rung that is *more* local still: `.cube-side` carries `absolute z-10`, so it is a stacking context, and the numeral's only competitor inside it is the one sibling `.face-relit` span. **Falsifier:** the numeral competing with something outside `.cube-side`'s stacking context; it cannot, by definition.

**D-m8 — flat, maximally-generic globals registered from "scoped" blocks.** `@property --lit { inherits: true }` (`CubeTarget.css:6–10`) and `@property --axis-active` (`CubeAxisLines.vue:37–41`) are declared inside `<style scoped>` but `@property` is a **global** registration — Vue's scoping transform does not touch at-rules. `--lit` is a one-word, inheriting, globally-registered name; the unit's other customs are `--side-size`, `--side-offset`, `--rotationX`, and `--color` (`CubeAxisLines.vue:78`). This confirms and sharpens census `lane-frontend.md §6.3`: *"No `--kf-*` namespace exists … Demo tokens are unprefixed and therefore share a flat global namespace with glass-ui's — a collision surface worth a lane of its own."* `--lit` and `--color` are the sharpest edges of that surface in the whole scene tree. **Falsifier:** Vue scoping rewriting `@property` names, or an existing prefix convention; neither holds.

**D-m9 — the cursor lies for 1.2 s after every roll.** `CubeTarget.css:22–24` sets `.cube--rolling { pointer-events: none }` and `CubeTarget.vue:221` releases the flag on a `setTimeout(…, 1200)`. During that window the cube is unpressable, but hit-testing falls through to the OrbitalDrag container, whose scoped rule is an unconditional `div { cursor: move }` (`OrbitalDrag.vue:347–351`). The pointer advertises "drag me" while input is dead, and there is no state treatment (no dimming, no cursor change, no `aria-busy`) marking the lock. The 1200 ms is also 100 ms of unexplained slack over the 1100 ms animation. **Falsifier:** a cursor or state rule keyed on `.cube--rolling`; the stylesheet has exactly one such rule and it is the `pointer-events` line.

**D-m10 — `1000vw` magic magnitude and an always-on filter at rest.** `CubeAxisLines.vue:44` sets `width: 1000vw` — a bare literal 1000× the viewport, against `layout.css:13–14`'s stated doctrine that each recurring bracket-arbitrary length "routes … to ONE token". `:54–57` then applies `filter: drop-shadow(0 0 calc(var(--axis-active,0) * 6px) …)` **unconditionally**: at rest that evaluates to a zero-blur fully-transparent shadow, but it is still a non-`none` filter on three 1000vw boxes, so each line permanently declares a filter surface. That is precisely the resident-hint anti-pattern the sibling stylesheet condemns and fixes for `will-change` ("drop the hint at rest … a resident `will-change` keeps the layer alive forever, the G5 anti-pattern", `CubeTarget.css:52–61`). Gating the declaration on `.axis-line--locked` — a class the component already computes — costs nothing. **Falsifier (magic number):** none, it is a literal. **Falsifier (filter cost):** a paint profile showing no filter surface allocated for a zero-parameter `drop-shadow` — `UNPROVEN-NEEDS-LIVE`; the doctrine inconsistency is proven regardless.

**D-m11 — no `forced-colors` story at all.** The die's entire identity is `background-color` (`CubeTarget.vue:60`) and the axis reveal's entire identity is `border-color` + `opacity` + `filter` (`CubeAxisLines.vue:46, 53–57`). Under `forced-colors: active` the UA forces `background-color` → `Canvas` and `border-color` → `CanvasText`: the six faces collapse to one blank plane (only the numerals distinguishing them, at whatever `CanvasText` gives), and the R/G/B axis identity — the whole point of `--axis-x/y/z` (`style.css:109–112`) — disappears. There is no `@media (forced-colors: active)` block anywhere in the cube tree; glass-ui's only forced-colors block (`accessibility.css`) covers aria-state borders and nothing here. The locked/unlocked `border-style: dashed → solid` tell (`CubeAxisLines.vue:73–75`) survives and is the one thing that does — good instinct, wrong scope (it disambiguates *state*, not *which axis*). **Falsifier:** a forced-colors rule reaching this subtree; grep finds two in glass-ui, neither matching.

**D-m12 — stale prose and a dead class.** Three, all decidable:
- `CubeTarget.css:57` — "The idle-bob is a 5px translate the compositor handles without the hint" — describes an animation the **same file deletes** thirty lines earlier (`:26–35`, T.G3).
- `.idle-hover` (`CubeTarget.vue:19`) names a behaviour that no longer exists; the class carries no rules of its own and appears only as the left half of the compound `.idle-hover.playing .cube` (`CubeTarget.css:58`), while the actual hover rule keys on `.graph:hover`.
- `font-bold` on `.face-lacquer` (`CubeTarget.vue:56`) is dead three ways: its only text child carries `.text-display-2`, which the demo pins to `font-weight: 400` in `@layer demo-typography` (`style.css:268–277`); `font-synthesis: none` is set at `:root` (`style.css:100`); and Instrument Serif ships a **single** 400 weight (`style.css:47–50`).

A comment that contradicts the code beside it is worse than no comment — it is what let D-M1's "Reduced-motion was already still" survive into the tree.

---

## 4 · INFO

**D-i1 — `contain: style` buys nothing.** `CubeTarget.css:49`. Style containment scopes counters and quotes only; it does not contain layout, paint, or size, and has no effect on `transform-style`, stacking, or invalidation of the properties this component animates. The cube uses no counters or quotes. Inert — reads as a perf token that measures as zero. (It is at least *harmless*: `contain: paint` or `layout` here would have re-triggered the exact 3D-flattening trap T.A1 documents.)

**D-i2 — a pointless wrapper element.** `CubeTarget.vue:28–35` wraps a single icon in `<span class="contents" v-if="showLoader">`. `<template v-if>` does the same with no element. `display: contents` on a wrapper is also the classic accessibility-tree-removal footgun — benign here only because the span carries no semantics to lose.

**D-i3 — the comment-to-code ratio.** `CubeTarget.css` is 154 lines of which roughly 55 % is prose; `CubeTarget.vue` carries five multi-paragraph tranche-ID narratives. Load-bearing where it records a trap that would otherwise be re-set (T.A1's `filter` → used `transform-style: flat`; T.A4's 0 × 450 geometry). Noise where it re-narrates the next line ("Isomorphic — no visual change, just the gesture hand-off"). The failure mode is not verbosity but **drift**: prose this dense goes stale invisibly, which is exactly D-m12 and the false claim inside D-M1.

---

## 5 · CANDIDATES KILLED BY THEIR OWN FALSIFIERS

Recorded so the next auditor does not re-raise them.

1. **"`preserve-3d` is not a Tailwind utility, so the cube renders flat."** Tailwind v4.3's utility for `transform-style: preserve-3d` is `transform-3d`, not `preserve-3d` (verified in `node_modules/tailwindcss/dist/lib.js`). **Killed:** glass-ui ships `.preserve-3d { transform-style: preserve-3d }` in `@layer components` (`dist/styles/utilities/base-misc.css`). The class is a *consumed glass-ui utility* — see S-4.
2. **"Dragging does nothing before the animation starts."** `applyTransformToContainer` is `false` while `!isPlaying && !isStarted`, and `containerStyle` then returns `{}` (`OrbitalDrag.vue:64`). **Killed:** `useTransformState.ts:192–211` watches `transformSliderValues` and, *specifically when `!isGroupStarted`*, rAF-debounces a `transformTargetsStyle({ transform: matrix3dEnd }, [cubeEl])` write. The two paths are complementary by design. (What survives is D-M5 — that they are complementary but uncoordinated.)
3. **"Red X / green Y is a deuteranopia failure (WCAG 1.4.1)."** **Killed:** the three axis lines are also distinguished by orientation — `.x` horizontal, `.y` `rotateZ(90deg)`, `.z` `rotateY(90deg)` (`CubeAxisLines.vue:77–88`). Colour is redundant with geometry, which is what 1.4.1 asks for.
4. **"`filter: drop-shadow` on `.axis-line` re-flattens the 3D scene (the T.A1 trap again)."** **Killed:** a grouping property forces the element's *own* `transform-style` to flat; it does not remove the element from its parent's 3D rendering context, and the axis lines have no 3D children. The lines still receive `.graph`'s `perspective`. (What survives is the resident-surface half, D-m10.)

---

## 6 · SUPERLATIVES (L-18, running the other way)

**S-1 — the `--lit` quantization is the best-reasoned line in the unit.** `useCubeRelit.ts:74–84`. Rounding to `toFixed(2)` so that Vue's `style.setProperty('--lit', …)` re-set becomes a browser no-op during a fine orbit drag, with the perceptual budget stated ("The 1% luminance step is imperceptible") and the mechanism named exactly (a `color-mix` plus two-gradient repaint per face per tick). A real measurement converted into a one-token change. **Falsifier:** a profile showing equal repaint counts at `toFixed(3)` and `toFixed(2)` — `UNPROVEN-NEEDS-LIVE`, but the invalidation mechanism it names is correct as stated.

**S-2 — the T.A1 diagnosis is precise and correctly generalized.** `CubeTarget.css:148–154`. Identifying that `filter` is a CSS *grouping* property, that it therefore forces `.cube`'s **used** `transform-style` to `flat`, and that this is why only face 1 survived — then declining to re-introduce *any* compensating ancestor shadow because "any ancestor in the 3D chain re-flattens" — is the correct rule, not just the correct patch. **Falsifier:** a UA where a filtered element preserves its descendants' 3D context; none exists per css-transforms-2.

**S-3 — transient `will-change`, and six resident layers deleted.** `CubeTarget.css:52–61` and `:80–84`. Promotion gated to `.idle-hover.playing .cube, .graph:hover .cube` and dropped at rest, plus the removal of the per-face `will-change: transform` that had pinned six permanent compositor layers for elements carrying a *static* transform. This is the discipline most codebases get backwards, written down with its reasoning. **Falsifier:** a layer dump showing a resident layer at rest — `UNPROVEN-NEEDS-LIVE`; the declaration-level discipline is proven.

**S-4 — glass-ui conformance where it actually counts.** Two things done right: `.preserve-3d` is **consumed** from glass-ui rather than re-declared locally (see §5.1), and the six crayon facets were hoisted one-for-one out of inline `rgba()` literals into `--face-1…6` at `style.css:145–153`, hue-exact, with the face order pinned to the `cubeSides` class order. Bespoke composition over glass-ui primitives (`.preserve-3d`, `.text-display-2`, `rounded-lg`, `duration-panel`) — not bespoke in isolation. Nothing in glass-ui 7.0.0 shadows a 3D die, so this is S-8-class **justified bespoke**, and the census's `b` mark on this row (`lane-frontend.md:244`) should be read that way. **Falsifier:** a glass-ui 3D-subject primitive, or a local re-declaration of either; neither is present.

**S-5 — `useDoubleTap` gives the Roll touch parity, drag-disjoint, with the reasoning preserved.** `demo/composables/useDoubleTap.ts:1–84`. Rejecting native `dblclick` as a desktop-mouse construct, recognizing two genuine `pointerup`s within a pinned 300 ms window, and *resetting* the pending single when the pointer moves past a 12 px slop — so the orbit drag and the die-roll coexist on one element without arbitration. The `moveTolerance` reset is the subtle half, and it is there. Alongside it: `backface-visibility: hidden` (`CubeTarget.css:76`) and the T.A4 honest side×side box (`:37–50`), which replaced a geometry that "rendered by accident of outer centering". **Falsifier:** a gesture sequence that is both a drag and a double-tap; the `moved` latch forecloses it.

---

## 7 · CENSUS RECONCILIATION

Folded, per the hitherto-corpus rule:

- **`lane-frontend.md §6.5`** (13 PRM sites / 12 files) — `CubeTarget.vue` is correctly absent from the enumeration; **D-M1** is the concrete defect that absence implies, and **D-M3** is a second one in the same file.
- **`lane-frontend.md §6.3`** ("No `--kf-*` namespace exists … a flat global namespace … a collision surface worth a lane of its own") — confirmed and sharpened by **D-m8**: the two `@property` registrations here escape SFC scoping entirely, and `--lit` / `--color` are the most generic names in the scene tree.
- **`lane-frontend.md:244`** (`239 | cube/CubeTarget.vue | b | cube subject plane`) — line count confirmed exactly; the `b` (bespoke) mark is correct but should be qualified: this is bespoke *composition over* glass-ui primitives, and it is justified bespoke (see **S-4**), not an unexamined fork.
- **`lane-frontend.md:415`** (`154 | scenes/cube/CubeTarget.css`) — confirmed exactly.
- **`lane-frontend.md §1 / F-1`** (glass-ui 7.0.0 is a phantom dependency, absent from `package.json` and the lock) — every glass-ui-resolved claim above (`.preserve-3d`, `.text-display-2`, `--transition-duration-panel`, `--foreground`, `--neutral-0`) is therefore contingent on the current `node_modules` state, exactly as F-1 warns. F-1 must land before any remediation of D-B1 / D-M2 is reproducible.

**Contradicted explicitly — the tree disagrees with the census:**

- **`lane-frontend.md:253` and `:442`** record `CubeAxisLines.vue` as carrying a **raw `z-index: -10`**, and name it "One acknowledged exception" to the z-contract. The tree no longer supports this: `CubeAxisLines.vue:64–67` reads `z-index: var(--z-behind);` with a comment stating it "Reconciles the former orphan raw below-plane value to the z-contract documented in style.css". **The exception is closed; both census rows are stale.** The live token-hygiene defect in this component is not the axis line — it is `.face-numeral`'s use of the *semantic* `--z-content` for a purely local rung (**D-m7**), which is the opposite error and which the census does not record.
