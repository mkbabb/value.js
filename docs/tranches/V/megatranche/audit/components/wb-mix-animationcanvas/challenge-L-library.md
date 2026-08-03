# CHALLENGE-L — library structure · `demo/workbenches/mix/MixAnimationCanvas/MixAnimationCanvas.vue`

## Model receipt

I observe myself to be **Opus 5 (`claude-opus-5[1m]`, 1M context)** — the tier declared for this
seat. Declared, not inherited.

Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`. Subject:
`demo/workbenches/mix/MixAnimationCanvas/MixAnimationCanvas.vue` (35 lines) plus the two modules it
owns, `MixAnimationCanvas/composables/useMixingAnimation.ts` (190) and
`MixAnimationCanvas/composables/mixStage.ts` (282). 507 lines under this component's name.

---

## Verdict

**DEFECTIVE.** The component's own 35 lines are close to clean — idiomatic Vue 3.5, correct
`import type` discipline, published-subpath imports, no cross-boundary reach. Everything wrong here
is one level down, in the **contract** the component's composable holds with the rest of the
application, and that contract is defective in a way that no type, no lint rule, and no test binds.

The single strongest defect: **the mix convergence targets a DOM attribute that the design system
structurally cannot render.** `MixResultDisplay.vue:69` stamps `data-mix-target` onto a
`<WatercolorDot>`; glass-ui 7.0.0's `WatercolorDot` compiles with `inheritAttrs: false` and forwards
exactly two attrs (`class`, `style`) by hand. So `[data-mix-target]` has never existed in the
shipped DOM, `collectStage` has always fallen through to a hard-coded guess
(`{x: root.clientWidth/2, y: root.scrollHeight*0.7, r: 28}`), and the fallback masks the failure so
completely that four Safari captures, a hard CI typecheck and a hard lint all report green.

| # | Severity | Defect | Mechanism family |
|---|---|---|---|
| L-1 | BLOCKER | `[data-mix-target]` cannot render — the convergence lands on a guess, and a masking fallback hides it | cross-boundary contract via attribute fallthrough |
| L-2 | MAJOR | PRM re-derived via `useBreakpoint` from a second glass-ui subpath, when `motion-core` — already imported — owns it | duplicated ownership / wrong primitive |
| L-3 | MAJOR | "mix two colors or throw" implemented twice; the throwing adapter can strand the ONE-CLOCK phase machine | duplicated ownership / `Result`→exception erasure |
| L-4 | MAJOR | Pigment travels source→canvas as JSON-in-a-DOM-attribute while the typed truth sits one prop away | inverted dependency / dual data path |
| L-5 | MAJOR | Pane crashes are structurally invisible: the boundary swallows without logging (measured: dead pane, 0 console errors) | unobservable failure surface |
| L-6 | MINOR | Canvas backing store sized to the pane's scroll extent and never released (measured 1.33 MB @ dpr 1) | lifecycle mismatch |
| L-7 | MINOR | No KeepAlive deactivation gate; glass-ui's `useIntersectionPause` unused anywhere in demo | under-consumed design system |
| L-8 | MINOR | Dead re-export creates a second import path for three constants | dual path |
| L-9 | MINOR | Motion durations hard-coded outside the design system's tempo/duration tokens | duplicated ownership |
| L-10 | MINOR | Zero tests bind this module; its duplicate twin is tested, via a `test/` → `demo/` inversion | inverted dependency |
| L-11 | MINOR | `mixStage.ts` — a pure model, no Vue — shelved inside `composables/` | mis-shelving |
| L-12 | INFO | No import-boundary rule applies to this file at all (measured: `[]`) | unenforced lattice |
| L-13 | INFO | Published-surface facts: no `.` export, no `require` condition, two named artifacts that do not exist | wrong public surface |

---

## The import graph, traced

```
MixAnimationCanvas.vue
├── vue                                   { useTemplateRef, toRef }
├── @mkbabb/value.js/color                type HueInterpolationMethod   ← published subpath ✓
├── ../../../color-session/picker-color   type PickerSpace              ← demo area, relative ✓
├── ./composables/useMixingAnimation
└── ../composables/useMixingState         type AnimationPhase, MixResult

useMixingAnimation.ts
├── vue                                   { watch, onBeforeUnmount }, type Ref
├── @mkbabb/glass-ui/dom                  { useBreakpoint }             ← L-2: wrong subpath
├── @mkbabb/glass-ui/motion-core          { useRAFLoop }                ✓
├── @mkbabb/value.js/color                type HueInterpolationMethod   ✓
├── ../../../../color-session/picker-color
├── ../../composables/useMixingState      types only
└── ./mixStage                            { collectStage, drawStage, MIX_* } + type Stage

mixStage.ts
├── @mkbabb/value.js/math                 { lerp, clamp }               ✓
├── @mkbabb/value.js/easing               { easeInOutCubic, easeOutCubic, smoothStep3 }  ✓
├── @mkbabb/value.js/color                { mixColors, type HueInterpolationMethod }     ✓
├── ../../../../color-session/color-utils { colorToRgb255, parseColorIn }
└── ../../../../color-session/picker-color
```

Every `@mkbabb/value.js` specifier is a real key in `package.json#exports`
(`./color ./value ./css ./easing ./math ./transform ./quantize`). No `@src/*`, no deep path into
`src/`, no reach into `shell/`, `color-picker/composables/boot/`, or `scenes/`. On the
"could a real consumer write this import?" test, all three library imports pass. That is a genuine
negative and I record it as one.

The defects are not in what is imported. They are in what is *implied*.

---

## L-1 · BLOCKER — the convergence target cannot render; every mix lands on a hard-coded guess

### The claim the module makes about itself

`useMixingAnimation.ts:4-9`:

> Each selected source releases a soft pigment drop from its actual chip position
> (`[data-mix-source]`); the drops arc across the plate toward the result plate's **awaiting well
> (`[data-mix-target]`, the seeded WatercolorDot ghost)** … The convergence **LANDS AT the result
> plate**.

`mixStage.ts:117-121` implements it:

```ts
const targetEl = root.querySelector<HTMLElement>("[data-mix-target]");
const target = targetEl
    ? layoutCenter(targetEl, root)
    : { x: root.clientWidth / 2, y: root.scrollHeight * 0.7, r: 28 };
```

The writer is `MixResultDisplay.vue:62-72`:

```vue
<WatercolorDot
    :color="wellColor"
    variant="ghost"
    tag="div"
    seed="mix-result"
    data-mix-target        ← a fallthrough attribute on a design-system component
    ...
/>
```

### Why the attribute can never land

`@mkbabb/glass-ui@7.0.0` `WatercolorDot` — the *compiled published artifact*,
`node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js`:

```
$ node -e "const s=require('fs').readFileSync('watercolor-dot.js','utf8');
           const i=s.indexOf('inheritAttrs'); console.log(s.slice(i-40,i+60))"
…E = e(c({
	inheritAttrs: !1,
	__name: "WatercolorDot",
	props: { color: {}, variant: { default: "solid" }, …
```

and its render function emits a fixed element with a hand-picked attribute set — there is no
`v-bind="$attrs"` anywhere in it:

```js
return (t, n) => (d(), o("span", {
    "aria-hidden": "true",
    class: l([ c.value, "watercolor-swatch", e.animate && "watercolor-animated" ]),
    "data-testid": "watercolor-swatch",
    "data-variant": e.variant,
    style: u([ f.value, { backgroundColor: …, borderRadius: …, pointerEvents: "none", … } ])
}, [ /* internal <svg> filter host; NO <slot/> */ ], 14, C));
```

`c.value` and `f.value` are `useAttrs().class` and `useAttrs().style` — the component forwards
**exactly two** attributes by hand and drops the rest. `data-mix-target` is in the dropped set.

### Live proof, same fallthrough bucket, same page

`MixSourceSelector.vue:164-176` passes three fallthrough attributes to the same component
(`tag="button"`, `aria-label="Add current color to the mix"`, `:disabled`). Dev server
`http://localhost:9000/#/mix`, Playwright/WebKit:

```json
{
  "found": true,
  "tagName": "SPAN",
  "openTag": "<span data-v-292b9032=\"\" data-v-a3e86846=\"\" aria-hidden=\"true\"
     class=\"add-slot-ghost w-11 h-11 sm:w-12 sm:h-12 shrink-0 cursor-pointer … watercolor-swatch\"
     data-testid=\"watercolor-swatch\" data-variant=\"ghost\"
     style=\"border-radius: 76.83% 21.27% …; pointer-events: none; …\">",
  "hasAriaLabel": false,
  "hasTagAttr": false,
  "pointerEvents": "none",
  "plusGlyphRendered": 0,
  "mixTargets": 0,
  "mixSources": 2
}
```

`aria-label` gone. `tag` gone. The `<Plus>` child gone (the component renders no `<slot/>`).
`pointer-events: none` hard-coded by the design system. The rendered open tag contains *precisely*
the five attributes the render function emits and nothing else. `data-mix-target` sits in exactly
that discarded bucket.

The 07-27 Safari capture agrees:
`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/mix.png` shows the "Selected"
well containing a dashed ghost silhouette with **no plus glyph inside it** — the dropped slot,
photographed.

### Blast radius

1. **The choreography's central claim is false in the shipped app.** Every mix converges on
   `(root.clientWidth/2, root.scrollHeight*0.7)` — the horizontal centre of the Card at 70 % of its
   scroll height — regardless of where the result plate actually is. On a short pane the drops land
   below the plate; on a tall one, above it. `tr` becomes the literal `28`, so the pool's swell,
   ripple radius and halo are all sized off a constant instead of the well.
2. **The fallback is a masking fallback** — an explicit standing-edict violation ("no masking
   fallbacks"). It converts a broken contract into a plausible-looking animation. Had
   `collectStage` returned `null` on a missing target the way it does on missing sources
   (`mixStage.ts:145`), the failure would have surfaced the day glass-ui landed `inheritAttrs`.
3. **A shipped e2e oracle is structurally unsatisfiable.**
   `e2e/smoke/safari/mix-flow.spec.ts:40`:
   `await expect(main.locator("[data-mix-target]")).toBeVisible({…})` — a selector that cannot
   match. `e2e/smoke/views/mix.spec.ts:52` asserts the same. Two specs that can never pass.
4. **Nothing else notices.** `strictTemplates` is off (sibling seat L-15), so an unknown `tag` prop
   is not a type error; no lint rule inspects attribute contracts; the unit suite never mounts this
   tree.

### Cure — architectural

Delete the attribute channel for the *target* and the *sources* alike, and replace it with a typed
anchor registry, which is already the house idiom (`CSS_COLOR_KEY`, `EDIT_TARGET_KEY`,
`LIBRARY_PORT_KEY`, `BLOB_CONFIG_KEY` are all provide/inject ports in this codebase — no new
directory, no wrapper component, no contrivance):

```ts
// demo/workbenches/mix/mixAnchors.ts
export interface MixAnchor { el: HTMLElement; css: string }
export interface MixAnchorPort {
    registerSource(el: HTMLElement, css: string): void;   // idempotent; auto-unregisters on scope dispose
    registerTarget(el: HTMLElement): void;
    readonly sources: readonly MixAnchor[];
    readonly target: HTMLElement | null;
}
export const MIX_ANCHORS_KEY: InjectionKey<MixAnchorPort> = Symbol("mix-anchors");
```

`MixSourceSelector` registers each chip's *wrapper div* (already a plain `<div>` it owns — no
design-system component in the way) with the css string it already holds in typed state.
`MixResultDisplay` registers the well's wrapper `<div>`, not the `WatercolorDot` itself. `mixStage`
takes `MixAnchor[]` and measures geometry off `el` — which is the correct implementation and stays —
while pigment arrives as a typed value, never as a parsed attribute. The registry is a real type, so
a rename is a compile error; the e2e specs assert on the wrapper's own stable `data-testid`, not on
an attribute the design system may or may not forward.

This also discharges L-4 and makes the sibling seat's `mixStageAttrs.ts` proposal unnecessary — that
cure names the vocabulary but leaves it riding a channel glass-ui has closed.

---

## L-2 · MAJOR — prefers-reduced-motion is re-derived through the wrong primitive, from a second glass-ui subpath

`useMixingAnimation.ts:41-42` imports from **two** glass-ui subpaths:

```ts
import { useBreakpoint } from "@mkbabb/glass-ui/dom";
import { useRAFLoop } from "@mkbabb/glass-ui/motion-core";
```

and line 70 hand-writes the media query:

```ts
const { matches: prefersReducedMotion } = useBreakpoint("(prefers-reduced-motion: reduce)");
```

`@mkbabb/glass-ui/motion-core` — the subpath already imported on the next line — **owns this
concept**:

```
$ tail -1 node_modules/@mkbabb/glass-ui/dist/motion-core.js
export { …, t as readReducedMotion, …, j as useRAFLoop, e as useReducedMotion, … };
```

and `useReducedMotion` is a module singleton with one `matchMedia` object, one `change` handler, and
scope-refcounted subscribe/unsubscribe
(`node_modules/@mkbabb/glass-ui/dist/useReducedMotion-vCXA_vyM.js`: `var a = r(!1) … u = new Set()`,
`f()` attaches the listener only while at least one live scope wants it). `useRAFLoop` itself
consumes it internally for its `respectReducedMotion` gate.

`useBreakpoint` is the *generic* query primitive and allocates per call
(`node_modules/@mkbabb/glass-ui/dist/dom.js`):

```js
function g(e) {                                   // useBreakpoint
    let t = f(!1), n = null;
    function i() { … n = window.matchMedia(e); t.value = n.matches; n.addEventListener("change", r); }
    …
}
```

Three consequences:

- **A dependency edge that should not exist.** PRM is the *only* thing this composable takes from
  `@mkbabb/glass-ui/dom`. Import `useReducedMotion` from `motion-core` and the `/dom` edge
  disappears entirely: one subpath instead of two, and the motion concern is sourced wholly from the
  motion module.
- **A fourth parallel home for one concept in `demo/`.** The literal
  `"(prefers-reduced-motion: reduce)"` appears with four different mechanisms behind it:

  | site | mechanism |
  |---|---|
  | `MixAnimationCanvas/composables/useMixingAnimation.ts:70` | glass-ui `useBreakpoint` |
  | `workbenches/extract/ImageEyedropper/composables/useInertiaGesture.ts:37-39` | glass-ui `useBreakpoint` |
  | `workbenches/gradient/GradientVisualizer/easing/EasingSpecimenStrip.vue:47` | `@vueuse/core` `useMediaQuery` |
  | `color-picker/composables/boot/useOverture.ts:96`, `…/useDockArrival.ts:26` | raw `window.matchMedia` |

  Plus the design system's own `useReducedMotion` / `readReducedMotion`, used by nobody in `demo/`
  (`grep -rn "usePrefersReducedMotion\|useReducedMotion" demo/` → 0 hits). Unique semantic ownership
  says one home; there are five candidates and the app picked the one that is not it.
- **A dynamic-correctness gap.** `arm()` reads `prefersReducedMotion.value` once, at arm time, and
  `useRAFLoop` is constructed with `respectReducedMotion: false`. If the user enables reduce
  *during* the 1.2 s narration nothing stops. The docstring's reasoning for `respectReducedMotion:
  false` is sound (a paused loop would strand the phase machine), but the correct expression of it
  is "complete immediately on PRM", not "ignore PRM after arming" — a `watch(prefersReducedMotion,
  v => { if (v && loop.isActive.value) { loop.stop(); settle(); } })` is three lines.

**Cure:** `import { useRAFLoop, useReducedMotion } from "@mkbabb/glass-ui/motion-core";` — delete the
`/dom` import, delete the query literal, add the mid-flight watcher. Then do the same at the other
four demo sites so the concept has one home.

---

## L-3 · MAJOR — "mix two colors or throw" exists twice, and the throwing half can strand the ONE-CLOCK machine

Two modules implement the same three lines.

`demo/palettes/mix.ts:28-37`:

```ts
function mixedOrThrow<S extends PickerSpace>(from, to, progress, space: S, hueMethod) {
    const result = mixColors(from, to, progress, { space, hue: hueMethod });
    if (!result.ok) throw new Error(`Color mix failed: ${result.error.code}`);
    return result.value as unknown as PickerColorIn<S>;
}
```

`MixAnimationCanvas/composables/mixStage.ts:99-111`:

```ts
const result = mixColors(from, to, index / (RAMP_STOPS - 1), { space, hue: hueMethod });
if (!result.ok) throw new Error(`Pigment mix failed: ${result.error.code}`);
return colorToRgb255(result.value as PickerColorIn<typeof space>);
```

Same call, same guard, same cast shape, same throw — two homes, two error strings, one tested
(`test/mix-v4.test.ts` covers `mixColorSequence`) and one not (nothing imports `mixStage`; see
L-10). `demo/color-session/color-utils.ts` is the module that already owns exactly this kind of
adapter (`parseColorIn`, `colorToRgb255`, `colorToCss`), and it is imported by both call sites. That
is the unique home.

### The deeper structural fault: the demo erases value.js's `Result` channel

value.js is a total-function library: `mixColors`, `convertColor`, `parseCssColor`, `toRgba8`,
`serializeCssColor` all return `Result`. The demo's adapter layer converts every one of them back
into an exception:

```
demo/color-session/picker-color.ts:109   export function parsePickerColor(source: string): CssColor {
demo/color-session/picker-color.ts:110       const result = parseCssColor(source.trim());
demo/color-session/picker-color.ts:111       if (result.ok) return result.value;
demo/color-session/picker-color.ts:112       throw new PickerColorError("Invalid CSS color", result.diagnostics);
```

`colorToRgb255` (`color-utils.ts:17-21`) throws. `convertPickerColor`, `serializePickerColor`,
`pickerColorToHex` all route through `valueOrThrow`. The library pays for totality; the demo throws
it away at the first boundary, and every consumer downstream inherits an untyped exception channel
instead of a typed error value.

### Where that bites this component specifically

`collectStage` is a throwing function called from a Vue watcher with no guard:

```
useMixingAnimation.ts:150    stage = collectStage(canvas, poolCss, space.value, hueMethod.value);
useMixingAnimation.ts:170-183  watch(phase, (next) => { if (next === "mixing") arm(); … }, { flush: "post" })
```

`collectStage` → `pigmentRamp` → `parseColorIn` → `parsePickerColor` → **throws** on any css string
the parser rejects. The strings reaching it in palettes mode come from
`JSON.parse(el.dataset.mixColors)` — palette data, i.e. arbitrary persisted/API content, not
compile-time constants. And `pigmentRamp` is called at `mixStage.ts:174` inside the
`picked.map(...)`, **outside** the `try { … } catch { /* unstamped source — skip */ }` at
`mixStage.ts:133-142` that guards only the JSON parse.

If it throws: `arm()` never reaches `loop.start()`, `settledFired` stays `false`, `onSettled()` is
never called. `useMixingState.settleMix` is the machine's **only** forward edge
(`useMixingState.ts:5-15` states this as law), so `animationPhase` stays `"mixing"` forever. The
result plate stays a permanent ghost (`MixPane.vue:113` `:ghost="animationPhase === 'mixing'"`), and
the re-entry guard `useMixingState.ts:87-88` (`if (animationPhase.value === "mixing") return`) makes
the Mix button a no-op for the rest of the session. A parse failure on one palette swatch bricks the
feature.

**Reproduction status: HYPOTHESIS** for the strand (I did not get an unparseable palette color into
the store from a read-only seat). The *throwing adapter* is fact — `picker-color.ts:109-113` — and
the control flow from throw to permanent ghost is fully determined by the four cited lines. The
duplication is fact.

**Cure:** one home for the adapter (`color-utils.ts`), and — the architectural half — stop erasing
`Result` at the demo boundary. `collectStage` should return `Stage | null` for *every* failure mode,
the way it already does for "no measurable sources" (`mixStage.ts:145`), and `arm()` should treat
`null` as "settle honestly" — which it already does, three lines later. The totality contract then
holds by construction instead of by hope.

---

## L-4 · MAJOR — the pigment travels through the DOM as JSON while the typed truth sits one prop away

Geometry must come from the DOM. Pigment must not.

Writer, `MixSourceSelector.vue:252-255`:

```vue
:data-mix-source="isPaletteSelected(palette.slug) ? '' : undefined"
:data-mix-colors="isPaletteSelected(palette.slug)
    ? JSON.stringify(palette.colors.slice(0, 4).map((c) => c.css))
    : undefined"
```

Reader, `mixStage.ts:127-142`:

```ts
const one = el.dataset.mixColor;
if (one) { origins.push({ ...at, css: one }); continue; }
try {
    const many = JSON.parse(el.dataset.mixColors ?? "[]") as string[];
    …
} catch { /* unstamped source — skip */ }
```

The same values already exist as typed reactive state in the module that owns them —
`useMixingState.ts:126-131` returns `selectedColors: Ref<SelectedColor[]>` and
`selectedPalettes: Ref<Palette[]>` — and `MixPane.vue:35` holds both and already passes four props
down to this very component. The choreography serializes typed state to a string, writes it into the
document, and parses it back inside a sibling subtree. Inside one Vue application. That is a second
data path for data that is already reactive, and the direction of dependency is inverted: a leaf
canvas component knows the rendered DOM shape of two sibling components.

The two paths have already drifted, which is the proof that they are two:

- The writer caps a palette at **4** pigments (`slice(0, 4)`).
- The reader caps the stage at **12** drops (`mixStage.ts:29 MAX_DROPS = 12`).
- The mix math itself (`mixPalettes`) uses **all** of them.

Three numbers, three modules, one concept. (The sibling seat's scalability audit reached the same
`slice(0,4)` / `MAX_DROPS` pair from the writer's side —
`docs/tranches/V/megatranche/audit/om-16-palette-scalability/SCALABILITY-AUDIT.md:159` — and read it
as correct-as-is. From the reader's side it is not: the drop budget is enforced twice, in
disagreement, and neither owner can see the other.)

Note what this is *not*: I am not proposing to stop measuring the real DOM. `layoutCenter`
(`mixStage.ts:70-88`) walking the `offsetParent` chain is the right call and the docblock's reasoning
about in-flight transforms is correct. The registry in L-1's cure keeps the elements and drops the
strings.

---

## L-5 · MAJOR — pane crashes are structurally invisible, and the mix route is one bad localStorage value away from dead

`demo/color-picker/ErrorBoundary.vue:60-69`:

```ts
onErrorCaptured((err) => {
    caught.value = true;
    detail.value = err instanceof Error ? err.message : String(err);
    nextTick(() => alertRef.value?.focus());
    // This boundary OWNS the failure — stop the throw propagating to the app root…
    return false;
});
```

`return false` halts propagation to `app.config.errorHandler`. Nothing is logged — no
`console.error`, no `pageerror`, no telemetry. The pane dies silently and the harness sees green.

Measured, live, `http://localhost:9000/?probe=L2#/mix`, full document load, 5 s settle:

```json
{ "crashed": true,
  "mainText": "This panel hit an unexpected error. Cannot read properties of undefined (reading 'replace') Try again",
  "mixCanvas": null, "sources": 0, "addSlot": false }
```

and simultaneously, from the same page:

```
browser_console_messages(level: "error")  →  Total messages: 2 (Errors: 0, Warnings: 0)
```

**Zero console errors while the pane is dead and `MixAnimationCanvas` never mounts.** This is
precisely the value that
`docs/tranches/V/megatranche/audit/visual/REPORT.json` records for `/#/mix` in all four Safari
matrices (`consoleErrors: []`, `pageErrors: []`, `pageErr 0`, `consoleErr 0` in `REPORT.md:123`,
`:138`, `:153`, `:168`). Those zeros are not evidence of health for any route; the boundary eats
everything. The one signal that *does* survive is the text count: `/#/mix` at 186 chars is the
lowest of every non-admin route (`palettes` 237, `browse` 280, `extract` 299, `generate` 310,
`gradient` 611) — but on 07-27 that route was genuinely healthy (I read the screenshot; the pane
renders), so the count is not a reliable crash detector either.

### The reproduction

Three steps, and I ran them both directions:

```
1. localStorage.setItem('palette-admin-token', 'probe-token')   [pre-existing when I arrived]
2. full load http://localhost:9000/#/mix
   → main.innerText = "This panel hit an unexpected error. Cannot read properties of
                        undefined (reading 'replace')"
     mix canvas: absent
3. localStorage.removeItem('palette-admin-token'); full load again
   → crashed: false
     mainText: "Lab 92.0 % , 88.8 , 20.0 … Mix colors and palettes together. Colors Palettes
                 Selected FROM PALETTES 1 COLOR SPACE OKLab HUE METH…"
     mixCanvas: { w: 510, h: 683 }   ← the component mounts
```

A syntactically-invalid admin token in persisted storage takes down the whole Mix pane on mount. The
defect is not in this component — the throwing `.replace` is not in its 507 lines — but it destroys
its route, and the boundary guarantees no one will ever see it in a log.

**Environment note for the orchestrator:** `palette-admin-token: "probe-token"` was planted in the
shared dev browser by another audit seat. I removed it to obtain the negative half of the
reproduction and **left it removed**, because restoring it re-breaks `/#/mix` for every seat sharing
this browser. Any seat that needs an admin token should re-plant a valid one.

**Cure:** the boundary must observe before it owns. `console.error(err)` (or a
`window.reportError(err)`) before `return false` costs one line and makes every pane crash visible
to the console-scraping harness the audit program depends on. Separately: an invalid persisted
credential must be rejected at the storage-read seam, not thrown from a render.

---

## L-6 · MINOR — the canvas backing store is sized to the pane's scroll extent and never released

`arm()` (`useMixingAnimation.ts:135-143`) sizes the backing store to the pane's *full scrollable*
extent:

```ts
const w = parent.clientWidth;
const h = parent.scrollHeight;
canvas.style.height = `${h}px`;
const dpr = Math.min(window.devicePixelRatio || 1, 2);
canvas.width = w * dpr;
canvas.height = h * dpr;
```

`clearCanvas()` (`useMixingAnimation.ts:155-163`) clears `style.height` but **not** `canvas.width` /
`canvas.height`, and it only runs on `phase === "idle"` — which is `reset()`, a user action most
users never take. After any mix the allocation is retained for the life of the KeepAlive-cached pane.

Measured live (headless WebKit, dpr 1, 510×683 CSS pane):

```json
{ "w": 510, "h": 683, "styleH": "683px", "bytesMB": 1.33 }
```

1.33 MB at dpr 1. The clamp allows dpr 2, so a retina viewport at the same size is 5.3 MB, and a
tall pane (scrollHeight 2000 at 1020 CSS px wide) is `1020·2 × 2000·2 × 4 B ≈ 32 MB` held by a
canvas that is drawing nothing.

The lifecycle is also simply wrong-shaped: the element is mounted permanently
(`MixPane.vue:67-73`, no `v-if`) for an animation that exists for 1200 ms.

**Cure:** `v-if="phase !== 'idle'"` on the `<canvas>` in `MixAnimationCanvas.vue`. The watcher is
already `flush: "post"`, so the element exists by the time `arm()` measures, and `useTemplateRef`
handles the mount/unmount. The element — and its backing store — then exist exactly as long as the
narration does, and `clearCanvas()` can be deleted entirely.

---

## L-7 · MINOR — no deactivation gate, and the design system's primitive for it is unused

`demo/shell/PaneSlot.vue:120` wraps every pane in `<KeepAlive :max="max">`. `MixPane` is therefore
cached, not unmounted, on pane switch — `onBeforeUnmount(() => loop.stop())`
(`useMixingAnimation.ts:186`) does not fire.

`useRAFLoop`'s gates are `document.hidden` (`pauseWhenHidden`), PRM (disabled here), and explicit
`stop()`. A KeepAlive-deactivated subtree is detached from the document but the document is not
hidden, so navigating away mid-mix leaves the loop delivering frames into a detached canvas
(`clientWidth === 0`, so `clearRect` no-ops while `drawStage` still builds 12 radial gradients per
frame) until the epilogue stops it. Bounded at ≤ 1.2 s — hence MINOR, not MAJOR — but the *contract*
is absent, not merely unexercised.

The design system already ships the right primitive and nobody uses it:

```
$ tail -1 node_modules/@mkbabb/glass-ui/dist/motion-core.js | tr ',' '\n' | grep -i pause
 M as useIntersectionPause
$ grep -rn "useIntersectionPause" demo/ | wc -l
0
```

Two `onActivated`/`onDeactivated` hooks exist in the entire demo, both in `HeroBlob.vue`
(`:27`, `:246`) — so the app has exactly one component that treats KeepAlive as a lifecycle and
several that do not. That asymmetry is the finding.

**Cure:** `onDeactivated(() => loop.stop())` alongside the existing `onBeforeUnmount`, or — better,
because it is the design system's own answer — hand `useIntersectionPause` the canvas so the loop
gates on real visibility rather than on document-level hidden.

---

## L-8 · MINOR — a dead re-export mints a second import path for three constants

`useMixingAnimation.ts:47`:

```ts
export { MIX_ARRIVE_MS, MIX_CONVERGE_MS, MIX_EPILOGUE_MS } from "./mixStage";
```

```
$ grep -rn "MIX_ARRIVE_MS\|MIX_CONVERGE_MS\|MIX_EPILOGUE_MS" --include=*.ts --include=*.vue demo/ test/ e2e/ \
  | grep -v "^demo/workbenches/mix/MixAnimationCanvas/"
(no matches)
```

Nobody imports them from anywhere. The line is dead surface that also creates a dual path — a future
consumer can reach the same constant through two module identities. Delete it; `mixStage.ts` is the
one home. (`e2e/smoke/views/mix.spec.ts:15` re-types the number `900` in a comment instead of
importing it, which is the same disease from the other end.)

---

## L-9 · MINOR — the motion timeline is a fourth tempo home, outside the design system

`mixStage.ts:22-27` hard-codes the choreography's clock:

```ts
export const MIX_ARRIVE_MS = 700;
export const MIX_CONVERGE_MS = 900;
export const MIX_EPILOGUE_MS = 300;
```

glass-ui owns motion time: `--duration-instant|control|fast|normal|slow|panel|xl|xxl` in
`dist/styles/tokens/scheme-motion.css`, bridged to Tailwind as `--transition-duration-*`, plus
`motionTempo(el)` (`dist/composables/motion/core/motionTempo.d.ts`) — "read the effective
`--motion-tempo` off `el`… read once at spring construction". `scheme-motion.css` also zeroes
`--motion-weight` under `@media (prefers-reduced-motion: reduce)`.

Three consequences: the global reduced-motion CSS guard (`demo/styles/animations.css:184`) cannot
reach these numbers (which is why L-2's arm-time gate had to be hand-written); `--motion-tempo` — the
settings-level tempo knob the whole design system honours — does not scale this animation; and the
mix's tempo cannot be tuned with the rest of the system.

**Cure:** read the durations from the tokens at arm time (`motionTempo(canvas)` × a duration read off
the computed style), or, if the three values are genuinely bespoke choreography, declare them as demo
tokens in `demo/styles/` so they live where every other duration in the app lives. Either way the
numbers stop being a private constant in a TS module.

---

## L-10 · MINOR — zero tests bind this module; its duplicate twin is tested through an inverted dependency

```
$ grep -rn "mixStage\|useMixingAnimation" test/ e2e/ | wc -l
0
```

507 lines of canvas choreography with no unit coverage. Its duplicate (L-3) *is* covered — by a test
that reaches the wrong way:

```
test/mix-v4.test.ts:3   import { parseColorIn } from "../demo/color-session/color-utils";
test/mix-v4.test.ts:4   import { mixColorSequence } from "../demo/palettes/mix";
```

`test/` is the **library's** suite; it imports the **application**. Six such files exist
(`gradient-parse`, `gradient-v4-consume`, `image-sampler-v4`, `mix-v4`, `ink`, …). The pure,
Vue-free, deterministic half of this component — `mixStage.ts`'s `quadBezier`, `layoutCenter`,
`pigmentRamp`, `collectStage` — is exactly the kind of module that should be testable, and would be
trivially so once `collectStage` takes `MixAnchor[]` (L-1's cure) instead of scraping a document.

---

## L-11 · MINOR — a pure model shelved in `composables/`

`mixStage.ts` imports nothing from `vue`, holds no reactivity, and its own docblock says so: *"No
lifecycle, no clock."* It lives in `MixAnimationCanvas/composables/`.

```
$ find demo -type d -name composables | while read d; do for f in "$d"/*; do
    case "$(basename "$f")" in use*) ;; *) echo "NON-USE: $f";; esac; done; done
NON-USE: demo/color-picker/composables/boot
NON-USE: demo/picker/controls/ComponentSliders/composables/sliderAnnouncement.ts
NON-USE: demo/workbenches/gradient/composables/gradientParse.ts
NON-USE: demo/workbenches/mix/MixAnimationCanvas/composables/mixStage.ts
```

Three files repo-wide; the sibling per-component composables dir
(`ImageEyedropper/composables/`) is 3-of-3 `use*`. A `composables/` directory should mean "Vue
reactive units"; a pure model belongs beside the component (`MixAnimationCanvas/mixStage.ts`).
Trivial to fix, and it makes the "this half is pure and testable" boundary legible.

---

## L-12 · INFO — no import-boundary rule applies to this file at all

```
$ npx eslint --print-config demo/workbenches/mix/MixAnimationCanvas/composables/useMixingAnimation.ts \
    | <filter rules matching /restricted-imports|restricted-paths|no-relative|boundaries|import\//>
[]
```

Zero. `eslint.config.js` does declare `no-restricted-imports` blocks (`:206`, `:241`, `:279`) — none
of whose `files` globs select this path. So nothing structurally prevents this component from
importing `../../../../src/units/color/matrix`, from reaching into `demo/color-picker/composables/
boot/`, or from re-introducing an `@src/*` deep path. The demo's "the demo consumes value.js ONLY
through the published subpaths" invariant — asserted at `vite.config.ts:63-70` and
`tsconfig.demo.json:1-25` — is enforced by convention only. Independently confirms the sibling
seat's L-14 from a different file and a different rule set.

---

## L-13 · INFO — published-surface facts (this component's three specifiers are clean; the surface around them is not)

Measured, on my component's exact imports:

```
$ for f in color math easing css value; do
    echo "$f checkout=$(wc -c < dist/subpaths/$f.d.ts) tarball=$(wc -c < node_modules/@mkbabb/value.js/dist/subpaths/$f.d.ts)"; done
color  checkout=4275   tarball=4275
math   checkout=2680   tarball=2680
easing checkout=3835   tarball=3835
css    checkout=12490  tarball=10910     ← 1580-byte divergence
value  checkout=2271   tarball=2271
```

`/color`, `/math`, `/easing` — the three this component names — are byte-identical across the two
resolvers (`tsconfig.demo.json` paths → checkout `dist/`; anything absent from that map →
the `node_modules` tarball dragged in by `@mkbabb/keyframes.js@6.0.0`). The divergence is on `/css`,
which this component reaches transitively via `color-session/picker-color.ts:34`. That is the
sibling seat's L-17 and I confirm it rather than re-claim it.

Three further surface facts I did establish here:

1. **No `"."` export.** `Object.keys(exports)` is the seven subpaths; `has bare root alias: false`.
   Yet `tsconfig.demo.json:44` maps `"@mkbabb/value.js": ["./dist/index.d.ts"]` and
   `vite.config.ts:119-124` states the demo "aliases that specifier to value.js's own published
   `dist/value.js`". Neither file exists:
   ```
   $ ls dist/value.js dist/index.d.ts
   ls: dist/index.d.ts: No such file or directory
   ls: dist/value.js: No such file or directory
   ```
   `dist/` contains three hashed chunks, `gh-pages/`, and `subpaths/`. Two load-bearing comments
   describe an artifact layout that is not on disk.
2. **No `require` and no `default` condition** on any subpath — each is `{types, import}` only. Any
   CJS consumer is locked out of the entire public surface. Observed while trying to run a probe:
   ```
   $ npx tsx scratchpad/probe.ts
   Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: Package subpath './color' is not defined by "exports"
     in /Users/mkbabb/Programming/value.js/package.json
       at packageExportsResolve (node:internal/modules/esm/resolve:601:13)
       at trySelf (node:internal/modules/cjs/loader:649:34)
   ```
   The package is `"type": "module"` and ships no CJS build, so this may be intentional — but then
   the exports map should say so with an explicit `"require": null` rather than by omission, and no
   in-repo tool that loads TS as CJS can touch the library.
3. **`"sideEffects": false`** at `package.json`, applying to the whole repo including `demo/`. I
   confirm the field; the sibling seat's L-13 analyses its consequence for the demo build and I do
   not re-derive it.

None of this breaks *this* component today. All of it is the surface the component sits on, and two
of the three items are documentation asserting a layout that does not exist — which is how the next
consumer gets it wrong.

---

## The greenfield lattice

If I were structuring the mix workbench today, with no legacy:

```
demo/workbenches/mix/
├── mixAnchors.ts            ← NEW. The typed anchor port (MIX_ANCHORS_KEY + MixAnchorPort).
│                              Registration replaces data-mix-* entirely. ~40 lines.
├── mixState.ts              ← useMixingState, unchanged in substance. Owns operands, space,
│                              hue method, result, phase. NO timers (already true).
├── MixPane.vue              ← composition root: holds state, provides the anchor port.
├── MixSourceSelector.vue    ← registers each chip wrapper with its css; no attribute stamping.
├── MixConfigBar.vue
├── MixResultDisplay.vue     ← registers the well wrapper; no attribute stamping.
└── MixAnimationCanvas/
    ├── MixAnimationCanvas.vue   ← <canvas v-if="phase !== 'idle'">, ~30 lines.
    ├── mixStage.ts              ← PURE. collectStage(anchors: MixAnchor[], root, pool) → Stage | null.
    │                              No querySelector, no JSON.parse, no throw. Unit-testable in Node
    │                              with fake rects. Moved OUT of composables/.
    └── useMixingAnimation.ts    ← the clock only: useRAFLoop + useReducedMotion from ONE subpath,
                                   onDeactivated + onBeforeUnmount, durations read from tokens.
```

Three laws the lattice enforces that today's does not:

1. **Geometry from the DOM, pigment from state.** The registry is the seam. Elements cross it;
   strings never do. A rename becomes a compile error instead of a silent animation.
2. **Totality all the way down.** `collectStage` returns `Stage | null`; `pigmentRamp` returns
   `RGB[] | null`; the demo adapter (`color-utils.ts`) stops converting value.js's `Result` into
   exceptions, and the ONE-CLOCK contract's forward edge is unconditional by construction rather
   than by every caller remembering.
3. **One home per concept.** PRM → `@mkbabb/glass-ui/motion-core#useReducedMotion` (all five demo
   sites). Mix-or-fail → `demo/color-session/color-utils.ts` (both call sites). Motion durations →
   the design system's duration/tempo tokens. Drop budget → one constant, in `mixState.ts`,
   consumed by both the writer's slice and the stage's cap.

The component's own file barely changes — 35 lines to ~30, plus a `v-if`. That is the honest
summary of this seat: the leaf is fine, the lattice under it is not.

---

## What I checked and did NOT find defective

- **Published-subpath discipline.** All three `@mkbabb/value.js` specifiers
  (`/color`, `/math`, `/easing`) are real `exports` keys a real consumer could write. No `@src/*`,
  no deep `src/` path, no bare-root import. `tsconfig.demo.json` maps all three to the checkout's
  own `dist/*.d.ts`, matching what Vite serves.
- **Boundary crossings.** The 3-hop closure touches only `color-session/`, `palettes/` and the two
  packages. Nothing reaches `shell/`, `color-picker/composables/boot/`, `scenes/`, `api/`, or
  `demo/ui/`. The component imports no design-system component at all — it renders one `<canvas>`.
- **`verbatimModuleSyntax`.** Every type-only import is `import type` (or an inline `type` modifier
  at `mixStage.ts:17`). Clean in all three files.
- **Vue 3.5 idiom.** `useTemplateRef` + reactive props destructure + `toRef(() => prop)` at
  `MixAnimationCanvas.vue:17-25` is exactly the 3.5 pattern; no `defineModel` round-trip here, so no
  `shallowRef` cache is warranted. (The composable's `Ref<T>` option signature forces the caller to
  re-wrap — `MaybeRefOrGetter` + `toValue` would be the more modern surface — but the caller's side
  is correct as written and I will not manufacture a finding from a style preference.)
- **`z-controls`.** I suspected a dead utility (`demo/DESIGN.md:302` documents the idiom as
  `z-[var(--z-controls)]`, and `ImageEyedropper.vue:268` uses the raw var). It is real: glass-ui
  defines `--z-controls: 20` in `dist/styles/tokens/scheme-motion.css` and bridges
  `--z-index-controls` in `dist/styles/theme/bridges.css`, so Tailwind generates the utility.
  Measured live: `zIndex: "20"`. Not a defect.
- **Animations preserved.** Nothing in this component's history deletes an animation; the
  choreography is additive and the keyframe-bearing CSS is untouched.
- **A11y of the canvas itself.** `aria-hidden="true"` + `pointer-events-none` on a purely decorative
  canvas is correct. `REPORT.json` records no accessible-name or tap-target defect attributable to
  it, and no horizontal overflow on `/#/mix` in any of the four Safari matrices.
- **`pauseWhenHidden` reasoning.** The docstring's claim that `elapsed` excludes paused time is true
  of the shipped `useRAFLoop` (`T += t` only accumulates inside a delivered frame, and `j()` gates
  delivery on `!y.value` where `y` mirrors `document.hidden`). The hand-rolled delta cap it replaced
  was correctly retired.
- **`layoutCenter`'s offsetParent walk.** Correct for this tree: the canvas's parent is the `<Card>`,
  which carries `class="relative …"` (`MixPane.vue:59`) and is therefore in the offsetParent chain,
  so the walk terminates at `root` rather than overshooting to `<body>`.

---

## Evidence index

| Claim | Evidence |
|---|---|
| WatercolorDot drops fallthrough attrs | `node_modules/@mkbabb/glass-ui/dist/watercolor-dot.js` — `inheritAttrs: !1`, render emits 5 fixed attrs, no `v-bind="$attrs"`, no `<slot/>` |
| …confirmed live | Playwright `.add-slot-ghost` openTag: no `aria-label`, no `tag`, 0 lucide glyphs, `pointer-events: none` |
| …confirmed visually | `audit/visual/shots/safari-desktop-light/mix.png` — dashed ghost slot with no plus glyph |
| Target fallback | `mixStage.ts:117-121` |
| Unsatisfiable e2e oracle | `e2e/smoke/safari/mix-flow.spec.ts:40`; `e2e/smoke/views/mix.spec.ts:52` |
| glass-ui owns PRM | `dist/motion-core.js` export list: `readReducedMotion`, `useReducedMotion`; `dist/useReducedMotion-vCXA_vyM.js` singleton |
| `useBreakpoint` allocates per call | `dist/dom.js` `function g(e) { … n = window.matchMedia(e); n.addEventListener("change", r) }` |
| 4 parallel PRM homes | `useMixingAnimation.ts:70`, `useInertiaGesture.ts:37`, `EasingSpecimenStrip.vue:47`, `useOverture.ts:96`, `useDockArrival.ts:26` |
| mix-or-throw duplicated | `demo/palettes/mix.ts:28-37` vs `mixStage.ts:99-111` |
| Adapter erases `Result` | `demo/color-session/picker-color.ts:109-113`; `color-utils.ts:17-21` |
| Strand control flow | `useMixingAnimation.ts:150,170-183`; `useMixingState.ts:87-88,113` |
| DOM-as-data-bus | `MixSourceSelector.vue:131-132,252-255`; `mixStage.ts:127-142`; `useMixingState.ts:126-131` |
| Drop-budget disagreement | `MixSourceSelector.vue:254` `slice(0,4)` vs `mixStage.ts:29` `MAX_DROPS = 12` |
| Boundary swallows silently | `ErrorBoundary.vue:60-69`; live: crashed pane + `Errors: 0` |
| Admin-token crash repro | 3-step localStorage set/remove, both directions pasted in L-5 |
| Canvas retention | `useMixingAnimation.ts:135-143,155-163`; measured `{w:510,h:683,bytesMB:1.33}` |
| KeepAlive | `demo/shell/PaneSlot.vue:120`; `grep useIntersectionPause demo/` → 0 |
| Dead re-export | `useMixingAnimation.ts:47` + repo-wide grep → no importers |
| Motion tokens | `dist/styles/tokens/scheme-motion.css` `--duration-*`; `motionTempo.d.ts` |
| No tests | `grep -rn "mixStage\|useMixingAnimation" test/ e2e/` → 0; `test/mix-v4.test.ts:3-4` inversion |
| Mis-shelved model | `find demo -type d -name composables` non-`use*` sweep → 3 files |
| No import rules | `npx eslint --print-config …/useMixingAnimation.ts` → `[]` |
| Surface facts | `package.json#exports` (7 keys, no `.`, no `require`); `ls dist/value.js dist/index.d.ts` → both missing; `wc -c` d.ts comparison |
