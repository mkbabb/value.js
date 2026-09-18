claude-opus-5[1m]

# CHALLENGE · SquareScene · axis D (DESIGN)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/square/SquareScene.vue` (331 L)
**Read whole (read-only), plus every import:**

- `demo/scenes/square/SquareScene.css` (159 L) · `demo/scenes/square/SquareInstrument.vue` (212 L)
- `demo/scenes/square/useSquareDemo.ts` (404 L) · `useSquareTumble.ts` (50 L) · `useSquareKeyboard.ts` (103 L) · `squareKeys.ts` (5 L)
- `demo/composables/useDragScrub.ts` (150 L) · `demo/composables/useDoubleTap.ts` (84 L) · `demo/composables/scene-facility/index.ts`
- `demo/styles/style.css` (294 L) · `demo/styles/design-idioms.css` (300 L) · `demo/styles/layout.css` (210 L)
- `node_modules/@mkbabb/glass-ui/dist/{components/card/Card.vue.d.ts, components/surface/Surface.vue.d.ts, Surface-DOHf5u2R.js, styles/typography/{semantic,utilities,scale}.css, styles/tokens/{color-radius,dark-arm,scale-paper}.css, styles/components.css}` (glass-ui **7.0.0**, vue **3.5.35**)
- `demo/components/instrument/transport/AnimationControlsGroup.css` (the `.stage-cell` geometry the plate inherits)

**Method** static + token-derived only. No browser tooling. Every contrast ratio below was computed by hand from the literal token values (sRGB relative luminance, WCAG 2.x formula); the arithmetic is shown where it is load-bearing. Claims that cannot be settled from the tree are marked **UNPROVEN-NEEDS-LIVE** and are *not* counted as defects.

**Hitherto corpus folded** (`docs/tranches/V/megatranche/formation/keyframes/lane-frontend.md`): §6.3 (flat unprefixed token namespace, "a collision surface worth a lane of its own"), §6.5 (the 13 PRM enforcement sites; SquareScene.css:136 + SquareInstrument.vue:207 are listed, the square is absent from the 3 JS-guard sites), F-1 (glass-ui is a phantom dependency, unpinned in `package.json`/lock). S-1..S-8 concern the instrument/timeline/tabs trees and do not touch this scene; no contradiction with the shadow census arises.

**Tally — defects 27 (BLOCKER 2 · MAJOR 7 · MINOR 13 · INFO 5) · superlatives 5.**

---

## BLOCKERS

### D-1 · BLOCKER — the tether SVG has no `viewBox`; the scene's signature instrument is drawn in an 88 px square at the plate's top-left, detached from the subject

`SquareInstrument.vue:12-19`

```
<svg class="square-tether" :class="…" aria-hidden="true" preserveAspectRatio="none">
    <path class="square-tether-line" :d="tetherPath" />
</svg>
```

`SquareInstrument.vue:78-82` asserts the coordinate system:

> "The SVG user space is 0..100 (`preserveAspectRatio="none"`); home is the centre (50,50) and the box centre deflects by ±TETHER_REACH user units at full travel."

**There is no `viewBox` attribute.** Per SVG 1.1/2 §7.7, `preserveAspectRatio` "only applies when a value has been provided for `viewBox`"; with no `viewBox` the element establishes a viewport whose user coordinate system is **1 user unit = 1 CSS px, origin at the SVG's own top-left corner**. The stylesheet sizes that viewport to the whole plate (`SquareInstrument.vue:147-150`: `position:absolute; inset:0; width:100%; height:100%`).

So `tetherPath` (`SquareInstrument.vue:83-97`), which emits `M 50 50 Q … {50 ± 38} {50 ± 38}`, renders as a hairline confined to the rectangle **x∈[12,88], y∈[12,88] px** measured from the plate's top-left corner. It is:

1. never at the plate's geometric centre (the `.square-field` crosshair is at `calc(50% ± 0.5px)`, `SquareInstrument.vue:109-123` — a *percentage*, i.e. the true centre; the tether "home" is at px (50,50));
2. never attached to the box (which is centred by `grid place-items-center` on the Card, `SquareScene.vue:12`, and translated ±110 px by `TRAVEL`, `useSquareDemo.ts:64`) — the tether tip's maximum reach is 38 px while the subject's is 110 px;
3. drawn *directly underneath the telemetry strip*, which occupies `top:1rem; left:1.25rem` (`SquareInstrument.vue:172-180`) at the `text-display` rung (26–42 px, see D-9) — same `--z-content` rung, telemetry later in DOM, so telemetry paints over it. The user-visible artefact is a stray violet hairline poking out from under the word "Transform".

Corroborating evidence that the `viewBox` was lost rather than never intended: `stroke-width: 0.8` + `vector-effect: non-scaling-stroke` (`SquareInstrument.vue:162-165`). `non-scaling-stroke` is a **no-op** when user units already equal px — it only does work under a `viewBox` + non-uniform `preserveAspectRatio`, exactly the configuration the comment describes. Two orphaned declarations for one absent attribute.

**Severity rationale.** This is the scene's thesis — "the rubber-band TETHER (spring math made physical)" (`SquareInstrument.vue:5-7`, `142-145`); L.W11 S4 exists to ship it. It is the only element that visually couples the instrument layer to the subject, and it does not couple.

**Note — the *intended* reading is also defective.** Restoring `viewBox="0 0 100 100" preserveAspectRatio="none"` maps ±38 user units to ±38 % of the plate **width** on x and ±38 % of the plate **height** on y, while the box moves an isotropic ±110 px on both. The `.stage-cell` is never square (desktop: work-area `clamp(72rem,94vw,160rem)` minus rail `clamp(25rem,33svi,32rem)`, `layout.css:47,49`; mobile: full-bleed viewport minus `--dock-band-reserve`, `AnimationControlsGroup.css:90-93,133+`), so the tip would still detach on one axis. The fix is a px-space path, not a `viewBox` patch.

**Falsifier.** A `viewBox` reaching the element by any route (a build transform, a runtime `setAttribute`, an inherited SVG default) — grep over the whole tree returns only the two `square-tether` sites already read, neither of which sets one. Or: a rendered plate that is exactly 100 × 100 px. Or: the tether measured at the plate centre and tracking the box in a live DOM.

---

### D-2 · BLOCKER — in forced-colors mode the box loses its only focus indicator (WCAG 2.4.7 AA)

`SquareScene.vue:46` (`class="… focus-ring"`) → `design-idioms.css:76-79`

```css
.focus-ring:focus-visible {
    box-shadow: var(--focus-ring-shadow);
    outline: none;
}
```

`--focus-ring-shadow` (`glass-ui/dist/styles/tokens/scale-paper.css:1`) is **two box-shadows and nothing else**:
`0 0 0 var(--focus-ring-width) color-mix(…30%…), 0 0 8px color-mix(…15%…)`.

CSS Color Adjustment §3 (forced colors) forces `box-shadow` to `none`. It does **not** force `outline-style`, so the `outline: none` survives. The box (`SquareScene.vue:44-54`) is the scene's **sole** keyboard target (`tabindex="0"`; the two `role="slider"` spans carry no tabindex by design, `SquareScene.css:12-15`). Net: a keyboard user in Windows High Contrast / forced-colors gets **no focus indicator at all** on the only focusable element in the scene.

Confirmed absent everywhere in the stack:
- `grep -rn "forced-colors" demo/` → **0 hits**.
- glass-ui 7.0.0 `dist/styles/accessibility.css` → **no `@media (forced-colors: active)` block**.
- The single forced-colors rule in the whole consumed CSS is Tailwind's own `.outline-hidden` fallback (`glass-ui/dist/styles/components.css`), which this element does not use.

Everything else the scene uses to signal state also vanishes under forced colors: `background-image` gradients are forced to `none` (`.demo-box` two-tone fill `SquareScene.css:52-56`; the whole `.square-field` crosshair + tick frame, `SquareInstrument.vue:109-139`), and all four `box-shadow` layers go (`SquareScene.css:58-60, 71-75, 83-94, 104-116, 130-134`). The scene degrades to a system-Canvas rectangle labelled "drag me" with no focus ring, no coordinate field and no grab affordance.

**Root ownership.** The defect *originates* in `design-idioms.css:76-79`, a corpus-wide idiom — this is a lane-level escalation, not a square-local patch. It is booked here as a BLOCKER because it is an AA failure that lands on this component's only control and is fully decidable from source.

**Falsifier.** A forced-colors block anywhere in the served cascade that restores an `outline` (or `forced-color-adjust: none` plus a system-colour ring) on `.focus-ring:focus-visible`; or a UA that does not force `box-shadow` to `none` in forced-colors mode.

---

## MAJOR

### D-3 · MAJOR — `prefers-reduced-motion` is asserted in prose and unimplemented in fact; every real motion in the scene is unguarded JS

`SquareScene.css:136-159` is the scene's entire PRM surface. It suppresses four *CSS transitions* and one decorative bloom. Its own comments claim the compliance:

- `SquareScene.css:128-129` — "PRM collapses it to no bloom (**the box still tumbles + sweeps colour**; only the decorative halo is dropped)."
- `SquareScene.css:146-148` — "the box **still banks + captures**, only the expanding pulse is suppressed."
- `SquareInstrument.vue:81` — "PRM snaps the FADE off in CSS; **the geometry is unchanged**."

But the scene paints **no CSS animation at all**. 100 % of its motion is the rAF loop in `useSquareDemo.ts:164-252`, and none of it reads the media query:

| motion | site | amplitude under PRM |
|---|---|---|
| 360° barrel-roll ("tumble" egg) | `useSquareTumble.ts:42-46` (`target += 360`) + `useSquareDemo.ts:169,205` | full |
| four-corner Play tour, `iterationCount: Infinity` | `useSquareDemo.ts:343-371` (±90 px diamond, 0→360° rotation, `d` 100→108 %, rainbow BG sweep) | full |
| envelope-tour egg (`c`) — 5 legs across [-1,1]² on 520 ms timers | `useSquareKeyboard.ts:24-69` | full |
| spring overshoot + velocity skew (±9°) + squash (±0.1) | `useSquareDemo.ts:183-212` | full |

`grep -rn "prefers-reduced-motion\|matchMedia\|useReducedMotion" demo/scenes/square/` returns exactly one hit — the CSS block at `SquareInstrument.vue:207`.

This **sharpens** lane-frontend §6.5, which lists both square CSS blocks among the 13 enforcement sites and calls coverage "conscientious but inconsistent in mechanism". For the square the mechanism is not merely inconsistent, it is *misaddressed*: the guard is applied to the one layer that carries no motion. Two structurally identical sibling scenes prove the idiom is available and expected here — `useCubeDemo.ts:164` and `useSequenceInstrument.ts:31` both gate on `window.matchMedia?.("(prefers-reduced-motion: reduce)").matches`, and `EasingTarget.vue:234` uses VueUse. The square is the only rAF-driven scene without one.

WCAG 2.3.3 (Animation from Interactions, AAA) is squarely implicated by the double-tap barrel-roll and the `c` fling; the *dishonesty* — a comment asserting the guard holds — is the design-axis failure.

**Falsifier.** A PRM guard reached by delegation (e.g. `SpringProgress` internally snapping to terminal under PRM). Checked: `src/animation/index.ts:50` exports `reducedMotionScale`, but neither `useSquareDemo.ts`, `useSquareTumble.ts` nor `useSweepScene` imports it — the square's springs are constructed raw (`useSquareDemo.ts:60-61`, `useSquareTumble.ts:8`). A live trace showing the spin snapping under PRM would kill this claim.

### D-4 · MAJOR — the two `role="slider"` children are non-focusable, so their live values are never announced; the "COMPLETE WCAG 4.1.2 contract" comment is an overclaim

`SquareScene.vue:55-74` + `SquareScene.css:12-26`

The comment at `SquareScene.vue:36-43` claims each hidden span carries "a COMPLETE WCAG 4.1.2 contract". They do carry a complete *value* contract (`aria-valuemin/max/now/text`, `aria-orientation`). They do not carry an *operability* contract: neither span has `tabindex`, and `SquareScene.css:13-15` states this deliberately ("focusable-exempt — they carry no tabindex; the box is the single keyboard target").

ARIA 1.2 requires `role="slider"` to be focusable and keyboard-operable; more concretely for the user, a change to `aria-valuenow` on an element that is neither focused nor inside a live region generates **no announcement**. Focus lives on the `role="group"` box, whose accessible name (`SquareScene.vue:50`) is a static string. So the entire per-axis telemetry pipeline — `syncAxisNow()` (`SquareScene.vue:192-195`), wired into `onScrub`/`onEnd`/`onTarget` at `:268, :281, :307` — is written to the DOM and read by no one.

Compounding: the *visible* readout is `aria-hidden="true"` (`SquareInstrument.vue:21`), so there is no alternative channel. An AT user arrowing the box gets silence.

**Falsifier.** A screen reader (NVDA/JAWS/VoiceOver) announcing the x/y value on arrow-key press with the current markup — i.e. an AT that polls `aria-valuenow` on unfocused descendants of a focused group. **UNPROVEN-NEEDS-LIVE** as to *which* ATs; the ARIA-conformance half is decidable and stands regardless.

### D-5 · MAJOR — the keyboard egg's discoverability hint is gated behind a pointer drag, so a keyboard-only user can never see it

`SquareScene.vue:129-130, 149-151, 230` + `SquareInstrument.vue:50-55`

`tumbleHintShown` is the gate for both legend hints, including **"press C to trace the field"** — a *keyboard* affordance. It flips only when `hasDragged && isSettled` (`SquareScene.vue:149-151`). `hasDragged` is set in exactly one place: `captureFrame()` (`SquareScene.vue:230`), which is `useDragScrub`'s `onStart` (`SquareScene.vue:259`) — a `pointerdown` handler.

Keyboard interaction routes through `useSquareKeyboard.onKeydown` → `reseat` → `startLoop`, which reaches `onTick` with `isSettled === true` but leaves `hasDragged === false` forever. A user who only ever presses arrows/Home/`c` will never see either hint, and the `c` egg's whisper is therefore unreachable by precisely the input modality it serves.

**Falsifier.** Any other assignment to `hasDragged` — `grep -n hasDragged SquareScene.vue` returns lines 130 (decl), 149 (read), 230 (write). None.

### D-6 · MAJOR — the `c` egg hijacks `Ctrl+C` / `Cmd+C`

`useSquareKeyboard.ts:72-77`

```ts
const onKeydown = (e: KeyboardEvent) => {
    if (e.key === "c" || e.key === "C") {
        e.preventDefault();
        tourEnvelope();
        return;
    }
```

There is no `e.ctrlKey || e.metaKey || e.altKey` guard. With focus on the box, `Cmd+C`/`Ctrl+C` (a) fires the five-leg envelope tour, and (b) `preventDefault()`s the keydown, which suppresses the browser's copy command. Same class of hazard for `Ctrl+Shift+C` (devtools) on platforms that route it through keydown. The arrow/Home branch (`:81-90`) has the identical omission — `Cmd+←` (back/line-start) and `Cmd+↑` are likewise swallowed.

Note the demo's own `CopyButton` component exists precisely because copy is a first-class verb in this UI.

**Falsifier.** A browser that does not honour `preventDefault()` on keydown for the copy shortcut, or an ancestor handler that stops the event before it reaches the box. Neither is present (`SquareScene.vue:53` binds `@keydown` directly, no `.self`/capture ancestor found).

### D-7 · MAJOR — the accessible name instructs a pointer-only gesture; every keyboard affordance is undeclared and every hint is `aria-hidden`

`SquareScene.vue:50` — `aria-label="Drag the box across two axes — a spring chases each axis"`.

That is the whole of what AT is told. Meanwhile:

- the box supports Arrow ×4, Home, End and `c` (`useSquareKeyboard.ts:72-96`) — none advertised, no `aria-keyshortcuts`;
- the double-tap tumble (`SquareScene.vue:287-292`) — not advertised;
- `.square-telemetry` (`SquareInstrument.vue:21`), `.square-legend` (`:35`) and `.square-field` (`:10`) are all `aria-hidden="true"`, so the three lines of on-screen instruction ("drag the box, or press Play to tour it", "double-click to tumble", "press C to trace the field") are invisible to AT;
- `role="group"` conveys grouping, not operability, so nothing in the exposed tree says the element does anything.

The result is an element that announces a mouse instruction to the population least able to follow it, while withholding the keyboard contract it actually implements. `.square-field`'s `aria-hidden` is correct (decorative); the telemetry and legend are *not* decorative — they are the scene's only instruction surface.

**Falsifier.** An `aria-describedby`/`aria-keyshortcuts`/visually-hidden instruction node elsewhere in the subtree. There is none: the only non-`aria-hidden` descendants of the Card are the two sr-only sliders and the "drag me" text node.

### D-8 · MAJOR — a fixed 12 rem subject inside an `overflow: hidden` plate: the box is amputated by its own stage at phone widths, during its own headline animation

`SquareScene.css:1-6` (`overflow: hidden` on `.square-stage`) + `SquareScene.css:34` (`--size: 12rem`, no clamp, no container query) + `useSquareDemo.ts:64` (`TRAVEL = 110`) + `useSquareDemo.ts:349-368` (the ±90 px four-corner tour, `d` to 108 %).

Arithmetic at a 16 px root:

| state | half-extent from plate centre |
|---|---|
| rest | 96 px |
| Play tour corner (±90 px, scale 1.08) | 90 + 103.7 = **193.7 px** |
| full drag (±110 px, deflection scale 1.12) | 110 + 107.5 = **217.5 px** |
| + the `0 0 0 0.5rem` separator ring (`SquareScene.css:60`) | + 8 px |
| + the tumble bloom `0 0 1.5rem 0.25rem` (`SquareScene.css:133`) | + up to 28 px |

On mobile the stage is the full-bleed viewport (`AnimationControlsGroup.css:133+`: `.stage-cell { position: fixed; inset: 0 }`; the dock reserve is `padding-**block**` only, so inline width is the raw viewport). Half-width is therefore 187.5 px at 375 px and 195 px at 390 px — *before* the Card's own default padding. The Play tour (193.7 px) clips on a 375 px viewport; every full-travel drag (217.5 px) clips on both. What gets cut is the subject's corner plus its entire separator ring — the exact frame that carries the D-1 "physical chip" reading.

`--size` is the one geometry in the scene with no responsive term; contrast the demo's own `--work-area-*` and `--rail-width` clamps (`layout.css:47-51`).

**Falsifier.** A container query or media rule reducing `--size` below `lg` — `grep -rn -- "--size" demo/styles demo/scenes` returns exactly two owners (`style.css:243` `.icon`, `SquareScene.css:34`), neither responsive. Or: the Card applying an inline padding large enough that the *plate* is the constraint and the arena is intentionally smaller than the travel — which would make the clipping deliberate and worse, not better.

### D-9 · MAJOR — the chrome's title and the protagonist's label sit at the identical type rung: no hierarchy on the stage

`SquareInstrument.vue:22` — `<span class="text-display square-telemetry-title leading-none">Transform</span>`
`SquareScene.vue:46` — the box carries `text-display`.

Both resolve to glass-ui's `--type-display-1` = `clamp(1.618rem, 1.2rem + 1.6vw, 2.618rem)` → **25.9 – 41.9 px**, Instrument Serif at weight 400 (`style.css:263-274` neutralises the baked 600). So a 26–42 px serif word sits in the top-left corner at exactly the same optical weight as the 26–42 px serif word inside the 192 px subject. `SquareScene.vue:28-32` states the design intent — "'drag me' is the scene's typography moment … the ONE audacious word on the bold subject" — and the instrument strip contradicts it in the same stage.

The strip's internal proportion compounds it: `text-display` (26–42 px) → `text-mono-small` (`--type-small`, 14–20 px) → `text-admin-label` (`--type-admin-label`, a fixed 10 px) stacked on a flat `gap: 0.25rem` (`SquareInstrument.vue:176-179`). A ~4× step between adjacent lines with a constant 4 px gutter is not a ladder; and it is exactly the region the D-1 tether is buried under.

**Falsifier.** A rule shrinking `.square-telemetry-title` — `SquareInstrument.vue:181-184` sets only `color` and `opacity: 0.92`, nothing typographic. Or an argument that the strip is meant to read as a co-equal title, which the `SquareScene.vue:28-32` comment forecloses.

---

## MINOR

### D-10 · MINOR — the axis legend renders **uppercase**, contradicting the lowercase axes it labels
`SquareInstrument.vue:44` uses `text-mono-caption`, which is `text-transform: uppercase` + `--type-tracking-caps` (`glass-ui/dist/styles/typography/utilities.css:1`). The line therefore paints **"X · Y ∈ [-1, 1]"**, while the telemetry two lines above paints lowercase `x` / `y` (`SquareInstrument.vue:24,26`, `text-mono-small`, no transform) and `aria-valuetext` says `x …` / `y …` (`SquareScene.vue:63,73`). Three spellings of two axis names in one 200 px column.
*Falsifier:* a later rule resetting `text-transform` on `.square-legend` — none exists in either scoped block.

### D-11 · MINOR — `.square-legend-hint { opacity: 0.8 }` drops the hints below AA in the light arm
`SquareInstrument.vue:203-205` on `text-muted-foreground` (`--muted-foreground` → `--neutral-5` → `hsl(30 22% 40%)`, `glass-ui/tokens/color-radius.css`). Against `--background` (`--neutral-0` = `hsl(40 30% 98%)`):

- ungated: L_text 0.1440, L_bg 0.9602 → **5.21:1** ✓
- composited at α 0.8: sRGB (0.5876, 0.5164, 0.4444), L 0.2408 → **3.47:1** ✗ (AA needs 4.5 for `--type-caption`, 12–16 px = not large text)

Dark arm survives: 0.8-composited L 0.2283 over L_bg 0.0031 → **5.24:1** ✓. So the failure is light-theme-only.
*Falsifier:* the true backdrop is the glass plate, not raw `--background`. A plate darker than L≈0.62 in the light arm would restore AA — but the demo's own reclaim (`style.css:192-208`) exists specifically to keep light content tiers *translucent and pale*, so the backdrop is expected near `--background`. A measured composite is the kill shot. **UNPROVEN-NEEDS-LIVE** on the exact backdrop; the ≈3.5:1 figure holds for any plate within ~5 % of `--background`.

### D-12 · MINOR — "double-click to tumble" tells touch users to perform a mouse-only action
`SquareInstrument.vue:48`. The recognizer is `useDoubleTap` (`SquareScene.vue:287-292`), whose entire reason for existing is the opposite: `useDoubleTap.ts:11-19` — "the native `@dblclick` … is a DESKTOP-mouse construct … on touch the delight was simply UNREACHABLE. This recognizer is POINTER-based." The engineering achieved touch parity; the copy retracted it. ("double-tap", or "double-tap / double-click", is the honest string.)
*Falsifier:* a media-query or platform-conditional copy swap — there is none; the string is a static text node.

### D-13 · MINOR — `palette-sweep-host` is a class with no definition anywhere
`SquareScene.vue:46`. `grep -rn "palette-sweep-host" --exclude-dir=node_modules .` → **one hit, the call site**. Also absent from glass-ui 7.0.0's built CSS. Dead markup masquerading as an idiom hook; the actual sweep signal is the `data-palette-sweep` attribute (`useSquareDemo.ts:227-228`, consumed at `SquareScene.css:130,152`), which works.
*Falsifier:* a Tailwind `@utility`/`@apply` producing `.palette-sweep-host` at build time — none in `demo/styles/*.css`.

### D-14 · MINOR — `data-square-mode` is written every FSM transition and read by nothing
`SquareScene.vue:48`. `grep -rn "data-square-mode\|square-mode" --exclude-dir=node_modules .` → one hit, the binding itself. No CSS selector, no test selector, no probe. The `{idle,drag,playback}` FSM (`SquareScene.vue:113-114, 138, 166-167, 242, 278`) is thereby unobservable — a design decision with no surface.
*Falsifier:* an external gate/manifest outside this repo reading the attribute.

### D-15 · MINOR — SquareScene.css keeps a `.square-tether` rule that duplicates the child's and cannot match it
`SquareScene.css:136-139` declares `.square-tether { transition: none }` inside its PRM block. That element is owned wholly by `SquareInstrument.vue`, which already declares the byte-identical rule at `:207-211`. Worse, `SquareScene.css:8-10` states the boundary the rule violates: "The instrument layer … is styled inside the colocated SquareInstrument sub-unit. **This scene keeps only the subject (the box)**".

It is also very likely *dead*: `SquareScene.css` is `<style scoped>` (`SquareScene.vue:331`), so the selector compiles to `.square-tether[data-v-⟨scene⟩]`. Vue 3.5 propagates a parent's scope id onto a child component's root only when that root is a single element (`setScopeId`'s `vnode === parentComponent.subTree` test; `filterSingleRoot` returns undefined for multi-element fragments). `SquareInstrument`'s template has **four** sibling roots (`:10, :12, :21, :35`), so the scene's scope id never reaches the `<svg>`. Contrast the Card at `SquareScene.vue:10`, a single-root child — which is why `.square-stage` *does* land.
*Falsifier:* inspect the rendered `<svg class="square-tether">` in a built demo. If it carries SquareScene's `data-v-*`, the rule is live and merely redundant (still a boundary violation); if not, it is dead. **UNPROVEN-NEEDS-LIVE** on the scope-id half only.

### D-16 · MINOR — a 160 ms transition sits on top of a 60 Hz-driven property, damping the very immediacy it was built for
`SquareScene.css:66` puts `transition: box-shadow var(--duration-fast, 160ms)` on `.demo-box`; `SquareScene.css:83-94` then drives that same `box-shadow` from `--spring-tilt`, which `useSquareDemo.ts:132-134` rewrites **every frame** via `el.style.setProperty`. Each frame's new computed `box-shadow` restarts a 160 ms transition from the currently-interpolated value, so the ring is a ~10-frame lagging low-pass of the velocity, not the velocity. `SquareScene.css:78-81` asserts the opposite: "a fast pull READS as kinetic energy at the edge (the spring's velocity surfaced as light)". A per-frame-driven visual wants no transition; a transitioned visual wants an event-driven value.
*Falsifier:* a live paint trace showing the glow reaching its target within one frame. **UNPROVEN-NEEDS-LIVE** on the perceptual magnitude; the retargeting is decidable from the two declarations.

### D-17 · MINOR — `select-none` on the Card is a second select-suppression authority, contradicting the seam that claims to be the only one
`SquareScene.vue:12`. `useDragScrub.ts:29-38` states the contract: "This composable is the ONLY thing in the demo that knows 'a drag is live,' so it owns the global select-suppression token … Every drag surface that routes through this seam **INHERITS select-suppression for free**." The square routes through the seam (`SquareScene.vue:256`), so the `select-none` is redundant *during* gestures and over-broad *outside* them: it permanently prevents selecting the telemetry readouts, the axis legend and "drag me". The seam's version is scoped to the gesture (`design-idioms.css:289-300`, released on `pointerup`/`pointercancel`).
*Falsifier:* a requirement that the stage be permanently unselectable that the seam cannot express — none stated anywhere in the scene or the seam docs.

### D-18 · MINOR — off-scale spacing literals in the instrument chrome
`SquareInstrument.vue:188` (`gap: 0.15rem 0.45rem`) and `:199` (`gap: 0.15rem`). glass-ui's `--spacing` is `0.25rem` (`components.css:1`), so 0.15 rem = 2.4 px is off-grid and sub-pixel-rounds inconsistently; 0.45 rem is likewise not on the scale. The insets `top:1rem/left:1.25rem` (`:173-174`) and `bottom:1rem/right:1.25rem` (`:194-195`) are internally consistent (a deliberate 1 rem block / 1.25 rem inline optical inset — see L-3) but are raw literals in a demo that maintains a documented geometry-token layer (`layout.css`, §6.3 of the census counts 98 demo-owned properties).
*Falsifier:* a stated exemption for sub-token optical gaps.

### D-19 · MINOR — `End` recenters instead of going to maximum; the step ladder has no fine grain
`useSquareKeyboard.ts:85-90` maps **both** `Home` and `End` to `reseat(0,0)`. ARIA APG's slider pattern (which `SquareScene.vue:36-43` invokes by adopting `role="slider"`, and `useSquareKeyboard.ts:71` names — "slider posture parity") assigns Home → minimum, End → maximum. `PageUp`/`PageDown` are unbound. The step is a fixed `0.25` (`:78`), giving 9 reachable positions per axis and no `Shift`-modified fine step, while the pointer path is continuous — a keyboard user cannot reach most of the coordinate space the `.square-field` draws.
*Falsifier:* an explicit ruling that `End`→home is preferred over APG for a 2-D group; `useDragScrub.ts:44` documents the recenter as deliberate, but only for the *release policy*, not for the `End` key binding.

### D-20 · MINOR — the instrument chrome is pinned with physical properties; nothing mirrors under RTL
`SquareInstrument.vue:173-174` (`top`/`left`) and `:194-195` (`bottom`/`right`) rather than `inset-block-start`/`inset-inline-start`/`-end`; `:197` uses `align-items: flex-end` rather than `end`. Under `dir="rtl"` the telemetry stays top-left and the legend bottom-right — the reading order inverts but the chrome does not follow it. (The *coordinate* semantics correctly stay physical; only the chrome placement should mirror.)
*Falsifier:* the demo declaring itself LTR-only. `grep -rn "dir=" demo/` finds no `dir` handling anywhere, so this is corpus-wide rather than square-specific — booked MINOR, not MAJOR, on that basis.

### D-21 · MINOR — the subject occludes the corner chrome at high deflection
`.demo-box` is `position: relative; z-index: var(--z-content)` (`SquareScene.css:32-33`); `.square-telemetry` and `.square-legend` are `position: absolute; z-index: var(--z-content)` (`SquareInstrument.vue:179, 201`). Equal z rungs → paint order is DOM order, and the box is rendered *after* `<SquareInstrument>` (`SquareScene.vue:18` then `:44`). The box is opaque. At ±110 px travel with scale 1.12 its corner reaches 217 px from centre, so on any plate under ~440 px in a dimension it will slide over the readouts the user is trying to read *while dragging*. The chrome carries `pointer-events: none` (`:178, :200`), so the gesture is unaffected — only the legibility.
*Falsifier:* a plate large enough in both dimensions on every supported viewport (contradicted by the D-8 arithmetic), or a raised z rung on the chrome.

### D-22 · MINOR — the legend stacks three type registers in a four-line corner block
`SquareInstrument.vue:41-55`: `text-caption` (italic Plus Jakarta, `--type-caption`) → `text-mono-caption` (upright Fira Code, uppercase, tracked) → `text-caption` italic → `text-caption` italic. `text-caption` carries `font-style: italic` from glass-ui (`typography/semantic.css:1`), so three of four lines are italic sans and the fourth is uppercase tracked mono, all within ~48 px of column height at the plate's bottom-right. Italic is doing no semantic work here (these are instructions, not asides).
*Falsifier:* a demo-wide convention that scene captions are italic — `text-caption`'s italic is a glass-ui default the demo does not override, so it is inherited rather than chosen; that weakens but does not kill the register-mixing point.

---

## INFO

### D-23 · INFO — `--size` is a live instance of the census's flat-namespace hazard
`SquareScene.css:34` sets `--size: 12rem` on `.demo-box`; `style.css:242-247` defines the global `.icon` utility around a `--size: 1rem`. Both own the bare, maximally generic, **inherited** name. Currently latent: `.icon` re-declares `--size` locally, so a nested icon would self-heal, and `.demo-box` has no icon descendants. This is exactly what lane-frontend §6.3 flags — "Demo tokens are unprefixed and therefore share a flat global namespace with glass-ui's — a collision surface worth a lane of its own" — with a concrete pair of owners.
*Falsifier:* any `--size` consumer that does *not* re-declare it being rendered inside `.demo-box`.

### D-24 · INFO — the Card's declared surface reaches the DOM only through an unpinned producer default
`SquareScene.vue:2-9` documents the plate as `<Card surface="glass" tier="resting" :shadow="false">`; the markup at `:10-13` passes only `:shadow="false"`. The rendered result *is* correct today: `Surface`'s `surface` defaults to `"glass"`, and `tier` (no default) falls through `v = m.tier ?? g[m.material]` with `material` defaulting to `"elevated"` → `g.elevated === "resting"` (`Surface-DOHf5u2R.js`). So `data-tier="resting"` is emitted and the demo's translucency reclaim (`style.css:203-208`, which selects `[data-tier="resting"]`) does apply. **No defect in the render** — but the scene's stated design contract depends on a two-hop default map inside a dependency that lane-frontend F-1 records as a *phantom* (absent from `package.json` and the lock). A producer change to `Surface`'s material→tier map silently re-tiers this plate with nothing to catch it. `:shadow="false"` is likewise redundant (`shadow` already defaults to `false`).
*Falsifier:* glass-ui pinning the map as contract, or the props being passed explicitly.

### D-25 · INFO — the plate title duplicates `anim.name` across the component boundary
`SquareInstrument.vue:22` hardcodes the string `"Transform"`; `SquareScene.vue:154` independently sets `anim.name = "Transform"`, which the bottom-bar transport reads. Two sources, one identity. Separately: "Transform" names a CSS property, not the scene's subject — the plate title is jargon where "drag me" is voice.
*Falsifier:* a deliberate decision that the strip labels the *animation*, not the scene — in which case it should be bound to `anim.name`, not retyped.

### D-26 · INFO — `.readout-accent` clears AA by ~6 % in the light arm
`SquareInstrument.vue:25,27` → `design-idioms.css:190-192` → `--color-progress` → `--accent-kf` = `oklch(0.56 0.17 295)` in light ≈ `rgb(0.498 0.351 0.799)`, L 0.1609. Against `--background` L 0.9602 → **4.79:1** (AA floor 4.5). Dark arm `oklch(0.74 0.13 305)` → L 0.3849 → **8.19:1**. Fine as shipped; noted because any future darkening of the plate or lightening of the accent crosses the line, and this is the only live numeral in the scene.

### D-27 · INFO — three `throw` sites inside the rAF frame with no degraded state
`useSquareDemo.ts:84, 89` (`num()`), `useSquareTumble.ts:23, 36, 39` (`asColor` / `colorAt`). All execute inside `frame()` (`useSquareDemo.ts:164-252`) or its `transformFunc`. A throw propagates out of the rAF callback: the paint loop dies, the box freezes mid-transform, the badge is stuck on "tracking", and there is no error state, empty state or recovery affordance anywhere in the scene. The inputs are currently safe — the tumble stops resolve `--rainbow-violet|cyan|green`, all plain `hsl()` (`design-idioms.css:18,20,21`), and the four-corner keyframes are hex literals (`useSquareDemo.ts:349-368`) — so this is latent, and its shape is worth recording alongside the V-tranche parser finding **R1** (`parseCssColor` crashing on a live CSS value): `useSquareTumble.ts:12-19` feeds `getComputedStyle` output straight into `parseCssColor`, and the *only* reason it is safe is that these particular tokens are unregistered `hsl()` strings rather than `light-dark(oklch(…))` — which is exactly what `--color-progress` resolves to two lines away.
*Falsifier:* an error boundary or `try` in the loop's call chain — `useSweepScene`'s `frame` invocation was read; there is none.

---

## SUPERLATIVES (L-18, the other direction)

### L-1 · the box ink is genuinely AAA and genuinely theme-invariant — the comment's strongest claim is *understated*
`SquareScene.css:51-57`. Fill `--subject-teal` = `#52e898` (L 0.6177); ink `color-mix(in oklab, var(--subject-teal) 25%, black)` → linear-sRGB (0.00132, 0.01261, 0.00491), L 0.00965. **Contrast 11.19:1** — AAA with room, against the *base* stop; against the lighter top gradient stop (`92 % teal + 8 % white`) it is higher still. Both operands are literals with no `.dark` arm (`design-idioms.css:54`), so the ratio is identical in both themes. `SquareScene.css:41-44` claims only "holds AA on its fill in BOTH themes"; the derivation delivers more than it promises, and it does so by *deriving* the ink from the fill token rather than picking a second literal — the drift-proof construction.

### L-2 · the status-badge AA-by-construction mix survives independent computation
`design-idioms.css:213-237` declares its contrast a load-bearing invariant ("the text pushes it toward `--foreground` at `--badge-text-mix` (50%) so it reads ≥4.5:1 against the tint in both themes"). Computed from the tokens, light arm:
- `.settled-badge` — text `color-mix(srgb, accent-kf 50%, foreground)` L 0.0575 on tint `color-mix(srgb, accent-kf 14%, transparent)` over the plate L 0.7934 → **7.84:1**
- `.tracking-badge` — `--muted-foreground` L 0.1440 on `--muted` at 60 % over the plate L 0.9234 → **5.02:1**

Both clear AA at the 10 px `--type-admin-label` rung. A parameterised colour recipe whose stated invariant actually holds is rarer than it should be.

### L-3 · one paint authority, held under real pressure
Four independent writers want the box's `transform` — the drag springs, the tumble spin, the engine's four-corner tour, and the velocity bank/squash. All four compose into a **single** transform string at `useSquareDemo.ts:125-128`, through **one** rAF (`useSweepScene`), which self-terminates when every spring settles (`:239`) and re-arms on `reseat`/`tumble`. The `{idle,drag,playback}` FSM (`SquareScene.vue:113-114, 165-168, 237-242`) makes the two *painting* writers mutually exclusive, and the takeover is pose-captured off `DOMMatrixReadOnly` (`useSquareDemo.ts:303-320`) so `playback → drag` is jump-free. The instrument layer is fed as derived-read props, never a second writer or a second loop (`SquareScene.vue:143-152`). Velocity is mirrored to `--spring-tilt`/`--spring-squash` as *element inline* properties (`useSquareDemo.ts:133,136`) — element-scoped, so despite the flat namespace (D-23) these two cannot collide with anything. Teardown is doubly safe: `onScopeDispose(dispose)` inside the composable (`:401`) *and* the host's `onBeforeUnmount` (`SquareScene.vue:204-207`), documented as idempotent.

### L-4 · the touch contract is right where it is easy to get wrong
The drag target is 192 × 192 px against WCAG 2.5.5's 44 px floor — a 4.4× margin, and the largest interactive surface in the demo. `touch-action: none` (`SquareScene.css:64`) is on the element that needs it, `cursor: grab` → `grabbing` carries the posture (`:63, :84`), and `setPointerCapture` is wrapped in a `try` with an honest KEEP comment for the iOS/synthetic-pointer throw (`useDragScrub.ts:119-123`) with window listeners as the fallback path. `pointercancel` shares the end path (`useDragScrub.ts:141-147`) specifically so an OS gesture takeover cannot strand `body.is-dragging` and freeze selection document-wide — a failure mode most drag seams ship with.

### L-5 · progressive disclosure of the eggs is the right instinct, correctly staged
`SquareScene.vue:128-129, 149-151` reveal the hints only after the first drag *settles* — not on mount, not on hover, not on a timer. The stage is clean for the first-run user, and the hint arrives at the moment the user has demonstrated they understand the primary affordance. That D-5 breaks it for keyboard users is a gate bug, not a design error; the design instinct is correct and worth preserving through the fix.

---

## Provenance

Every line reference is to the tree at `/Users/mkbabb/Programming/keyframes.js` as read this session (glass-ui 7.0.0 in `node_modules`, vue 3.5.35). No file in that repo was modified; the sole write is this document. Contrast figures are hand-computed WCAG 2.x relative-luminance ratios from the literal token values cited at each site — no browser, no DevTools, no screenshot. Claims requiring a live DOM are labelled **UNPROVEN-NEEDS-LIVE** and are held for the SS-13 visual audit: D-4 (which ATs announce), D-11 (the true composited backdrop), D-15 (the fragment-root scope-id half), D-16 (the perceptual lag magnitude). None of the two BLOCKERs or the seven MAJORs depends on a live observation.
