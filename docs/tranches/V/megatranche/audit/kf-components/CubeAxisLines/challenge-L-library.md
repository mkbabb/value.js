served model id: `claude-opus-5[1m]`

# CHALLENGE — `CubeAxisLines` · axis **L (LIBRARY)**

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/cube/CubeAxisLines.vue` (91 lines)
**Posture:** assumed DEFECTIVE until the tree proved otherwise. Every claim below carries a falsifier;
§6 records the three claims I *formed and then killed* against the tree, so the reader can see the
denominator. No browser tooling was used — visual-only consequences are tagged
**UNPROVEN-NEEDS-LIVE** and are the SS-13 audit's to settle.

**Tally: 16 defects · 0 blockers · 5 superlatives.**
*(3 MAJOR · 10 MINOR · 3 INFO)*

> ### ⚠ SELF-CORRECTION — second pass, 2026-08-04
>
> A second read of this component ran the falsifiers this file wrote for itself. **One of them fired.**
>
> * **D-2 DOWNGRADED MAJOR → MINOR.** The first pass asserted "there is no global kill-switch … glass-ui's
>   PRM blocks are class-scoped … never `*`." **That is false.** `node_modules/@mkbabb/glass-ui/dist/styles/
>   utilities/a11y-overrides.css` ships a document-wide `*:not([data-allow-motion])` PRM rule that *does*
>   reach `.axis-line`. The first pass grepped `transitions.css` and `demo/styles/` and stopped. D-2's own
>   stated falsifier — "produce a `prefers-reduced-motion` rule … that matches `.axis-line`" — is now
>   satisfied, so by this file's own rule the substance dies and only the false-comment half survives.
>   Rewritten in place, moved to §2, and logged as **K-4** in §6.
> * **D-16 ADDED** (MINOR): a dead scoped-slot seam in this component's own supply chain, carrying a second
>   false comment. Missed entirely on the first pass.
> * **D-7 and D-9 strengthened** with evidence the first pass did not cite: the colocated `--lit` counter-example
>   (`CubeTarget.css:79`) and the already-shipped `--axis-w` token.
> * Everything else re-verified against the tree and **stands unchanged**.
>
> No claim was added without a falsifier, and the one claim that failed its own falsifier was demoted, not
> deleted — a false defect is worse than a missed one.

---

## 0. What the unit is

A presentational leaf. Three empty `<div>`s, one required prop, one scoped stylesheet.
**Zero imports** — no `vue` runtime import, no composable, no engine call, no lifecycle hook, no
listener, no timer, no template ref. Its whole behaviour is `boolean → class + custom property`.

Its sole consumer is `CubeTarget.vue:101` (`<CubeAxisLines :lock="axisLock" />`), fed a
`reactive({x,y,z})` (`CubeTarget.vue:158-163`) that mirrors the `pressedKeys` latch OrbitalDrag
emits (`OrbitalDrag.vue:315-321`).

The leak/teardown axis is therefore **vacuously clean** — see §5 L-4. Everything below is
correctness, contract, dead code, duplication, and consumption idiom.

### Read set (read-only, whole)

| File | Why |
|---|---|
| `demo/scenes/cube/CubeAxisLines.vue` | target |
| `demo/scenes/cube/CubeTarget.vue` (239) | sole consumer; the `axisLock` producer |
| `demo/scenes/cube/CubeTarget.css` (155) | the sibling stylesheet + the T.A1 `filter` lesson |
| `demo/scenes/cube/CubeScene.vue` | the stage above it |
| `demo/scenes/cube/orbital-drag/{index.ts,types.ts,OrbitalDrag.vue}` | the `lock` prop's upstream contract |
| `demo/scenes/cube/orbital-drag/composables/useOrbitalPointer.ts` | `updatePressedKeys`, the latch itself |
| `demo/styles/{style.css,layout.css,design-idioms.css}` | `--axis-x/y/z`, `--z-behind`, the z-contract |
| `node_modules/@mkbabb/glass-ui/dist/styles/**` | `.preserve-3d`, `--ease-standard`, `--z-behind` — the F-1 surface |
| `demo/components/instrument/shell/EditorShell.vue` | the clipping ancestor (killed claim K-1) |

**Corpus folded (not re-invented):** `formation/keyframes/lane-frontend.md` **F-1** (glass-ui phantom
dep) — confirmed still live, §4. `lane-frontend.md` S-1..S-8 — **none touch this file**; it imports no
glass-ui component and is not a shadow-implementation candidate. `lane-library.md` §4 (parse seams) —
**not applicable**; this unit never parses. Prior keyframes.js tranche art folded: `T/verdicts/
T.A-cube-taste.md` Delta 1 (the 0.75→0.45 rest demotion), `T/audit/lanes/02-cube.md` ("Axis lines
KEPT"), `T/audit/lanes/19-fragile-css.md` (the `--z-behind` duplicate — **contradicted in file-path,
confirmed in substance**, D-12).

---

## 1. MAJOR

### D-1 · MAJOR — the `lock` prop has no liveness contract; two paths leave an axis line lit that is not locked

**Provenance.** Symptom: `CubeAxisLines.vue:12-13, 17-18, 22-23`. Root:
`OrbitalDrag.vue:276-277` + `useOrbitalPointer.ts:169-176`.

```ts
// OrbitalDrag.vue:276-277
useEventListener(window, "keydown", (e: KeyboardEvent) => pointer.updatePressedKeys(e, true));
useEventListener(window, "keyup",   (e: KeyboardEvent) => pointer.updatePressedKeys(e, false));
```

```ts
// useOrbitalPointer.ts:169-176
const updatePressedKeys = (event: KeyboardEvent, isPressed: boolean) => {
    const key = event.key.toLowerCase();
    const slot = key === "control" ? "ctrl" : key;
    if (slot in pressedKeys.value) {
        pressedKeys.value[slot as keyof PressedKeys] = isPressed;
    }
};
```

The latch is a raw window keydown/keyup pair with **no `blur` reset, no `visibilitychange` reset, and
no event-target guard**. `grep -rn "blur\|visibilitychange" demo/scenes/cube/` returns nothing.
`CubeAxisLines` is the only surface that *renders* this latch, so it is where both failures become
visible — and it has no self-healing of its own (it is stateless by design; correctly so).

**Failure scenario A — the stuck lock (source-provable).** Hold `X` → `keydown` sets
`pressedKeys.x = true` → the emit fires → `axisLock.x = true` → the X line goes opacity 1.0, solid
stroke, red bloom. Now `Cmd-Tab` / click another window **while still holding X**. The `keyup` is
delivered to the newly focused window, never to ours. `pressedKeys.x` stays `true` forever. On
return, the X axis line is permanently lit and every drag is silently constrained to X. Recovery
requires the user to guess that pressing-and-releasing `X` clears it.
macOS variant: Chrome and Safari suppress `keyup` for character keys while `Meta` is held, so
`Cmd`+`X`, release both, is the same trap without ever leaving the window.

**Failure scenario B — spurious activation (source-provable, reachable).** The listener is on
`window` with no `event.target` filter. `SharePopover.vue` carries a text `<Input>` and is reachable
from the editor header while the cube scene is mounted; `MatrixEditor.vue:16` carries `<Input>` cells
inside the cube's own control surface. Type an `x`, `y`, or `z` into either and the matching axis
line lights up mid-keystroke, and the *next* pointer drag is axis-constrained. The user typed a
letter; the 3D stage changed state.

**Falsifier.** Any of: (a) a `blur`/`visibilitychange`/`pointerdown`-outside handler that resets
`pressedKeys` exists somewhere I did not grep; (b) `OrbitalDrag` is unmounted and remounted on window
blur (it is not — `CubeScene`'s only unmount path is scene swap, `CubeScene.vue:225-236`);
(c) the browser delivers `keyup` to a blurred window (it does not — per UI Events, key events target
the focused document). Kill any one and this claim dies.

**Note on attribution.** The fix belongs upstream, not here. Filing it on this component because it
is the *only* rendered symptom, and because the `lock` prop's docstring
(`CubeAxisLines.vue:29`, "The per-axis lock latch OrbitalDrag publishes") asserts a fidelity the
producer does not deliver.

---

### D-3 · MAJOR — `z-index: var(--z-behind)` cannot deliver the "below the content plane" guarantee its own comment and the style.css z-contract claim for it

**Provenance.** `CubeAxisLines.vue:64-67`:

```css
/* Below the content plane — the demo's named below-stack rung (W3.S2).
   Reconciles the former orphan raw below-plane value to the z-contract
   documented in style.css (--z-behind < --z-content). */
z-index: var(--z-behind);
```

Two independent mechanisms defeat it, both source-provable:

**(a) The element sits inside a `preserve-3d` 3D rendering context, which depth-sorts.**
`CubeTarget.vue:9` — `<div ref="graphEl" class="graph preserve-3d grid …">`. That class resolves
(via the glass-ui cascade, `dist/styles/utilities/base-misc.css`) to
`.preserve-3d { transform-style: preserve-3d; }`, and `CubeTarget.css:14-16` adds
`.graph { perspective: 1200px; }`. So `.graph` is the root of a 3D rendering context whose members are
the OrbitalDrag container (`OrbitalDrag.vue:72`, inline `transformStyle: 'preserve-3d'`),
`.idle-hover` (`CubeTarget.vue:19`, `preserve-3d`), `.cube` (`CubeTarget.vue:25`, `preserve-3d`), the
six `.cube-side` faces at ±`--side-offset` translateZ (`CubeTarget.css:86-103`) — **and these three
axis lines**, all at z = 0. Members of a 3D rendering context are composited by **depth sorting**, not
by `z-index` paint order; `z-index` only disambiguates coplanar siblings. A `-10` on a z = 0 plane does
not push it behind faces sitting at z = −90.

**(b) The element carries a grouping property unconditionally.** `CubeAxisLines.vue:54-57` sets
`filter` to a value that is never `none` (see D-5). Per CSS Transforms 2, a non-`none` `filter` is a
grouping property: it forces the used `transform-style` to `flat` and renders the element into a
separate buffer composited as a *plane*. This is the **exact mechanism this directory already
documents**, at `CubeTarget.css:148-154` (T.A1):

> `filter` is a CSS grouping property → it forced `.cube`'s USED `transform-style` to `flat`,
> collapsing the six 3D faces onto one plane (only face 1 survived — verdict #1).

T.A1 removed a resident `filter` from `.cube` for this reason. The identical pattern survives 30 lines
away, on the axis lines, unexamined.

**Failure scenario.** Orbit the die so a face's centre is nearer the camera than z = 0 and drag a
locked axis across it: the axis line paints *through* the die rather than behind it, at angles that
vary with the orbit. The declaration reads as a stacking guarantee and is at best inert, at worst
angle-dependent.

**Falsifier.** (a) dies if `.preserve-3d` does not reach `.graph` in the emitted bundle — it does; I
located the rule. (b) dies if the initial `filter` computes to `none` — it does not; see D-5. The
*visual* consequence (lines painting through the die) is **UNPROVEN-NEEDS-LIVE**: a DevTools layer/3D
inspection showing the axis lines strictly behind all six faces at every orbit angle would kill the
consequence while leaving the "the declaration is inert" core intact. That core alone is the defect —
a load-bearing-looking line of CSS that carries a comment and a contract citation and does nothing.

---

### D-4 · MAJOR — the Z line is geometrically degenerate: it projects onto the perspective origin, so the Z half of the reveal cannot be "spatially legible"

**Provenance.** `CubeAxisLines.vue:85-88` vs. the promise at `:6` and `:51-52`.

```css
&.z {
    --color: var(--axis-z);
    transform: rotateY(90deg);
}
```

**The geometry.** The box is `width: 1000vw; height: 0px` (`:44-45`), absolutely positioned with all
insets auto (`:68`), so it takes the static position inside `.graph` — a grid container with
`items-center justify-center justify-items-center` (`CubeTarget.vue:9`). Its centre therefore lands on
`.graph`'s centre, which is also `perspective-origin`'s default `50% 50%`. `transform-origin` defaults
to the box centre. `rotateY(90deg)` maps the line's length axis onto **z**. Every point of the line is
then at `(x = 0, y = 0, z = t)`. A perspective projection maps `(0, 0, t) → (0, 0)` for all `t`. The
entire 19 200 px line collapses onto a single point; only its 2 px thickness survives, flared by
`d/(d − t)` for the near half, and everything at `t ≥ 1200 px` is behind the camera plane and clipped.

So holding `Z` lights a **vertical flare at the centre of the stage**, not a line. `X` and `Y`
(`:77-84`, `rotateX(0deg)` and `rotateZ(90deg)`) both stay in the screen plane and read correctly.
The reveal works for two axes of three.

**Failure scenario.** A user holds `Z` expecting the "otherwise-hidden single-axis lock" (`:7-8`) to
become legible. The two in-plane lines dim relative to a bloom at the origin. There is no Z stroke to
read, and the solid-stroke tell (`:73-75`) — the motion-free second channel — is likewise
point-sized.

**Falsifier.** A screenshot with `Z` held that shows a distinct, readable third stroke (as opposed to
a centre flare) kills this outright. So does evidence that the axis lines are *not* centred on the
perspective origin — e.g. if Chromium places the static position of an auto-placed abs-pos grid child
at the content-box start rather than honouring `justify-items`/`align-items`, the line would be
off-origin and would project as a proper receding ray. Both are one screenshot away.
**UNPROVEN-NEEDS-LIVE** on appearance; the projection algebra is source-derivable and stands on its
own.

**Prior-art check (folded, honestly).** `T/verdicts/T.A-cube-taste.md` Delta 1 and
`T/audit/lanes/02-cube.md` both reviewed these lines against `shots-02-cube/*.png` and kept them —
but both reviewed the **rest** register (the 0.75 → 0.45 demotion). Neither captured the held-key
state, which is the only state in which the Z line is supposed to say anything. Their silence is not
evidence against this claim.

---

## 2. MINOR

### D-2 · MINOR *(downgraded from MAJOR by this file's own falsifier)* — the PRM comment points at a wrapper that does not exist; the real guard is a universal rule in the undeclared vendor

**Provenance.** `CubeAxisLines.vue:58-59`:

```css
/* Smooth the reveal as the key latches/releases (the registered @property
   lets both channels interpolate). PRM-respecting via the wrapper below. */
```

**What survives: there is no wrapper below.** Lines 60-89 are the `transition` list, `z-index`,
`position`, `pointer-events`, and the four nested selectors. There is no
`@media (prefers-reduced-motion: reduce)` block in this file, in `CubeTarget.css` (read whole), or
anywhere under `demo/scenes/cube/`:

```
$ grep -rn "prefers-reduced-motion" demo/scenes/cube/
demo/scenes/cube/useCubeDemo.ts:164:  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
```

— a **JS gate for the engine animation group** (`useCubeDemo.ts:158-168`, the graph intro sweep), not a
CSS guard for these transitions, and not "below" anything. Every other scene surface *does* carry a
local block: `EasingTarget.css:48`, `SquareInstrument.vue:207`, `SquareScene.css:136`,
`SpringTarget.vue:462`, `SpringHeatmap.vue:333`, `SequenceTarget.css:238`, `StartingStyleTarget.vue:211`
— seven of seven; this is the eighth and the only one without. The prose is wrong about *where* the
guard is, and that wrongness is what will stop the next reviewer from looking.

> #### ✗ RETRACTED — the first pass's central claim was false
>
> The first pass wrote: *"Nor is there a global kill-switch. glass-ui's PRM blocks are class-scoped
> (`transitions.css` targets `.fade-enter-active`, …), never `*`."* It grepped `transitions.css` and
> `demo/styles/` and stopped one directory short. **The rule exists** —
> `node_modules/@mkbabb/glass-ui/dist/styles/utilities/a11y-overrides.css`:
>
> ```css
> @media (prefers-reduced-motion: reduce) {
>   *:not([data-allow-motion]) { animation-duration: .01ms !important;
>                                animation-iteration-count: 1 !important; }
>   *:not([data-allow-motion]) { transition-duration: .1s !important;
>                                transition-property: opacity, color, background-color,
>                                                     border-color, box-shadow !important; }
>   [data-allow-motion]        { animation-duration: .01ms !important;
>                                animation-iteration-count: 1 !important;
>                                transition-duration: .01ms !important; }
> }
> ```
>
> `.axis-line` carries no `data-allow-motion`, so it matches. Reproduce with
> `grep -rl "data-allow-motion" node_modules/@mkbabb/glass-ui/dist/styles/`.

**So what actually happens under PRM — and it is correct.** That rule *replaces* the author's
`transition-property` list. `--axis-active` and `filter` are dropped and **snap**; only `opacity`
transitions, at 0.1 s. `border-style` (L-5) is discrete and was never in the list, so the
dashed→solid tell fires instantly. The reveal degrades exactly as a PRM-aware design should: full
legibility, no easing. **The component behaves correctly today. Only its comment is wrong.**

**What remains, and why it is still a defect.** The correct behaviour is bought entirely from
`@mkbabb/glass-ui` — a package absent from `package.json` **and** `package-lock.json` (§4, F-1). This
is the sharpest bite of the phantom dep on this component: `--ease-standard` degrades gracefully
because line 61-63 supplies a fallback (L-3), but **PRM has no fallback and cannot have one from a
token**. Lift this self-contained 90-line SFC into another app — exactly the thing a self-contained
90-line SFC invites — and it runs three 180 ms eased channels under `prefers-reduced-motion: reduce`,
with a source comment swearing it does not.

**Failure scenario.** A reviewer audits PRM compliance, greps `prefers-reduced-motion`, sees line 59's
claim, and moves on — while the actual guarantee sits in an unlocked `node_modules` directory that
`npm ci` will not reproduce.

**Severity.** MINOR: no user-visible harm on the shipping tree; the residue is a false comment plus an
undeclared, unlocked dependency edge. The fix remains three lines, and L-5 shows the design already
supports the guard losslessly.

**Falsifier.** Show `@mkbabb/glass-ui` declared in a `package.json` or present in `package-lock.json`
in this repo (`grep -c glass-ui package-lock.json` → **0**), or show a demo-owned PRM rule reaching
`.axis-line` (`grep -rn "prefers-reduced-motion" demo/styles/` → **empty**). Either would take this to
INFO — the comment would still be wrong.

### D-16 · MINOR — the latch ships through two parallel seams; the scoped-slot seam is dead, and its comment claims the live one's job

**Provenance.** `OrbitalDrag.vue:3-7`:

```vue
<!-- P.W5.S3 — the axis-lock-reveal egg seam: expose `pressedKeys` (the
     X/Y/Z/modifier latch this component already owns) as a scoped slot
     prop so the cube can light the locked axis line. Reactive, no new
     rAF — the same ref the gesture readers mutate. -->
<slot :pressed-keys="pointer.pressedKeys.value"></slot>
```

**The cube does not use it.** `CubeTarget.vue:11-16` passes a default slot with no slot-prop
destructuring and consumes the *emit* instead (`@pressed-keys="onPressedKeys"`). Census:

```
$ grep -rn "pressedKeys\|pressed-keys" demo/
  OrbitalDrag.vue:7    slot prop  (producer)   ← NO consumer anywhere
  OrbitalDrag.vue:40   emit decl
  OrbitalDrag.vue:317-321  watch → emit
  CubeTarget.vue:15    @pressed-keys           ← the live path
```

So `OrbitalDrag` maintains **two** publication seams for one latch, only one is wired, and the comment
on the dead one asserts it is the one doing the job — the second false comment in this feature (D-2 is
the first, D-10 is the pattern). The live path additionally copies the value twice more
(`OrbitalDrag.vue:319` spreads to a fresh object → `CubeTarget.vue:158-163` mirrors into a third
`reactive`), so one boolean triple is represented four times between owner and pixel.

Bonus cost on the live path: the `{ deep: true }` watch at `:317-321` fires on **`shift`/`ctrl`/`meta`
changes too**, so every modifier press re-emits and re-writes `axisLock.x/y/z` with identical values.
Harmless (Vue bails on same-value writes) but it means the emit is not the "X/Y/Z latch" its own
comment calls it.

**Failure scenario.** A maintainer reads `OrbitalDrag.vue:3-7`, believes the slot prop is load-bearing,
and preserves it through a refactor — or worse, wires a *second* consumer to it and now has two
components reading the same latch through two seams with different copy semantics (live ref vs.
spread snapshot). Deleting the slot prop is a one-line change that the tree proves is safe.

**Falsifier.** Find any `v-slot`/`#default` destructuring of `pressed-keys` in the repo. The grep above
is the whole `demo/` tree; there is none. (The fix is upstream in `OrbitalDrag`, filed here because the
dead seam exists *solely* to serve this component and is documented as such.)

### D-5 · MINOR — `filter` is never `none`: three permanent stacking contexts and three permanent grouping buffers for a rest state that needs neither

`CubeAxisLines.vue:54-57`. At rest `--axis-active` is `0`, so the declaration evaluates to
`drop-shadow(0 0 0px color-mix(in srgb, var(--color) 0%, transparent))` — a *no-op shadow* whose
**computed `filter` is still not `none`**. Consequences, all spec-level:

* each `.axis-line` permanently creates a stacking context and a containing block for
  fixed/absolute descendants;
* each is permanently a grouping element → separate compositing buffer, used `transform-style: flat`
  (this is limb (b) of D-3);
* the buffer is sized to a `1000vw` box (three of them, always).

`.axis-line--locked` **already exists** (`:73-75`) as the state channel. Gating the filter on it —
`filter: none` at rest, the `drop-shadow` under the locked class — is strictly cheaper and removes
half of D-3.

**Falsifier.** Show that `drop-shadow(0 0 0px <fully-transparent>)` computes to `none` (it does not —
`filter` has no such short-circuit in the computed-value stage), or that Chromium elides the buffer
for a provably-transparent filter. The **cost** claim specifically is
**UNPROVEN-NEEDS-LIVE and I expect it to be small**: `EditorShell.vue:3` clips at `w-dvw h-dvh
overflow-hidden`, so the rasterised region is viewport-bounded, not 19 200 px. I am filing the
stacking-context/grouping facts, not a perf claim.

### D-6 · MINOR — one boolean, two parallel state channels

`:12-13`, `:17-18`, `:22-23` each project the *same* `lock.<axis>` through a class binding **and** an
inline custom property:

```html
:class="{ 'axis-line--locked': lock.x }"
:style="{ '--axis-active': lock.x ? 1 : 0 }"
```

The class alone suffices — `&.axis-line--locked { --axis-active: 1; border-style: solid; }` sets the
registered property from the cascade, and registered custom properties transition identically whether
set by a rule or by inline style. That deletes three inline-style bindings, removes the per-render
object allocation, and (with D-5) lets the `filter` gate on the same selector.

**Falsifier.** If a registered custom property set by a class rule does not transition (it does — CSS
Properties & Values §"Animation behavior" makes registered properties animatable regardless of
declaration site), the two channels are not interchangeable and this dies.

### D-7 · MINOR — the three-property transition list is redundant, and probably compounding

`:60-63`:

```css
transition:
    opacity 180ms var(--ease-standard, ease),
    --axis-active 180ms var(--ease-standard, ease),
    filter 180ms var(--ease-standard, ease);
```

`opacity` (`:53`) and `filter` (`:54-57`) are **pure functions of** `--axis-active`. Once
`--axis-active` transitions, both follow for free. Declaring all three is redundant by construction —
and worse, in Chromium a property whose computed value changes every frame because a registered custom
property is animating re-triggers its own transition each frame, producing an exponential chase: a
soft, double-eased settle materially longer than the declared 180 ms.

**The colocated counter-example settles what the house idiom is.** One directory over — same feature
family, same egg program (`L.W11.S2`), same `@property` mechanism — the driver is transitioned
**alone**:

```css
/* CubeTarget.css:77-79 */
transition: --lit 160ms linear;
```

`--lit` drives both of `.face-relit`'s gradients (`CubeTarget.css:126-141`) and **neither gradient
appears in the transition list**. `SequenceTarget.css:14` registers `--ball-p` and likewise does not
double-list. Across the whole demo, `CubeAxisLines.vue:60-63` is the *only* site that transitions a
registered driver together with its own dependents. So this is not merely "redundant in the abstract"
— it is a deviation from an idiom this component's own sibling file establishes 30 lines away.

**The charitable reading, stated plainly:** in an engine without `@property` support the registration
is ignored, `--axis-active` becomes an unanimatable token, and the `opacity`/`filter` transitions are
the only smoothing left — i.e. this *could* be deliberate progressive enhancement. Nothing in the
comment (`:58-59`) says so; it says the opposite ("the registered `@property` lets both channels
interpolate"). Rated MINOR because that reading is live.

**Falsifier.** DevTools showing `opacity` reaching exactly `1.0` at exactly t+180 ms after keydown
kills the compounding half. **UNPROVEN-NEEDS-LIVE.** The redundancy half is source-provable and
stands regardless.

### D-8 · MINOR — four dead `var()` fallbacks

`:53`, `:55`, `:56` — `var(--axis-active, 0)` ×4. `--axis-active` is registered at `:37-41` with
`initial-value: 0` and `inherits: false`. A **registered** custom property is never
guaranteed-invalid: it always has at least its initial value, so the `var()` fallback is
**unreachable**. Dead code that reads as a safety net.

**Falsifier.** A browser in the support matrix that ignores `@property` — there the fallback *is*
reachable. If that is the intent it belongs in a comment (and pairs with D-7's charitable reading);
as written, on a registered property, it is dead.

### D-9 · MINOR — the prop type duplicates `PressedKeys`, and the three divs are hand-unrolled against an existing `axes` tuple with zero tests

`:28-31`:

```ts
defineProps<{
    lock: { x: boolean; y: boolean; z: boolean };
}>();
```

That anonymous inline type re-declares the x/y/z third of `PressedKeys`
(`orbital-drag/types.ts:8-15`) — a type the **parent already imports**
(`CubeTarget.vue:113`, `import type { PressedKeys, TransformState } from "./orbital-drag"`).
`Pick<PressedKeys, "x" | "y" | "z">` is the non-duplicating form and would make the coupling to the
producer explicit and breakage-visible.

Separately, `orbital-drag/index.ts:6` exports `export const axes = ["x", "y", "z"] as const` — the
canonical axis tuple, already imported by `OrbitalDrag.vue:18` and `useOrbitalPointer.ts:5` — yet
`:10-24` hand-unrolls three near-identical five-line blocks. The failure mode is concrete: a
transposed `lock.x` on the `.y` div is a one-character bug that changes nothing structural. There is
**no test that would catch it** — `grep -rl "axis-line\|CubeAxisLines" test/ e2e/` → 0 hits (see D-14).

**The fourth axis is not hypothetical.** `demo/styles/style.css:112` already ships
`--axis-w: var(--foreground)`, and `demo/DESIGN.md:7` already documents the family as *"`--axis-x`,
`--axis-y`, `--axis-z`, `--axis-w` for transform visualization."* The day W lands, this file needs a
fourth hand-edited block with three hand-edited bindings, and — because the prop type is a structural
literal rather than `Pick<PressedKeys, …>` — **no declaration anywhere raises an error** when
`PressedKeys` grows and this component silently keeps rendering three of four. That is the specific
cost of the anonymous type: it converts a compiler-caught migration into a silent one.

I am rating this MINOR, not MAJOR, and noting the counter-argument honestly: `feedback_kiss_no_
contrivance` cuts against a `v-for` over three literals, and the unrolled form is more greppable. The
type duplication has no such defence.

### D-10 · MINOR — one rationale, six copies

The same paragraph ("OrbitalDrag constrains rotation to a single axis while X/Y/Z is held; the
matching line now lights up…") is restated in full **four** times and pointed at twice:

| Site | Form |
|---|---|
| `CubeAxisLines.vue:2-9` | full paragraph (template comment) |
| `CubeAxisLines.vue:47-52` | full paragraph (CSS comment) |
| `CubeAxisLines.vue:29` | one-line JSDoc |
| `CubeTarget.vue:95-100` | full paragraph (template comment) |
| `CubeTarget.vue:151-157` | full paragraph (script comment) |
| `CubeTarget.css:11-12` | pointer |

Fifty-five of this file's ninety-one lines are prose. The comments are genuinely load-bearing — they
carry P.W5.S3 / T.A2 / W3.S2 provenance the repo depends on — which is exactly why six drifting copies
is a defect and not a style quibble. D-2 is a live instance: one of the six copies is already false.

### D-11 · MINOR — `border` on a zero-height box paints two strokes, not one

`:45-46` — `height: 0px; border: 1px dashed var(--color);`. Tailwind preflight sets
`box-sizing: border-box`, so the used content height clamps to 0 and the border box is 2 px: **both**
the top and the bottom border paint, giving a 2 px band where "1px dashed" is declared, plus two 1 px
vertical end-caps at ±500 vw. `border-block-start: 1px dashed var(--color)` is the honest form and
halves the ink.

**Falsifier.** Show that one of the two horizontal borders is suppressed on a zero-height box — it is
not; border painting is independent of content-box collapse for non-table boxes. Cosmetically this is
already ratified (T.A2 tuned the rest register against screenshots of the doubled stroke), so the
defect is declared-intent ≠ rendered-result, not appearance.

### D-12 · MINOR — `var(--z-behind)` is unguarded, and the token it reads is a demo copy shadowing a glass-ui token

`:67` — `z-index: var(--z-behind);` with **no fallback**, unlike `:61-63`'s
`var(--ease-standard, ease)`. If `--z-behind` is missing the declaration is invalid-at-computed-value-
time → `z-index: auto` → the lines, being later in DOM order than `<OrbitalDrag>`
(`CubeTarget.vue:11-101`), paint **over** the die. The failure inverts the intent rather than
degrading it.

**Confirming and correcting `lane-19-fragile-css`.** That lane found `--z-behind` declared in the demo
*and* upstream, and prescribed deleting the demo copy at `design-idioms.css:245`. Against today's
tree: the demo declaration has **moved to `demo/styles/layout.css:25`** (`design-idioms.css` no longer
declares it) — so the lane's file:line is stale, but its substance is intact and unfixed. glass-ui
7.0.0 does declare it:

```
$ grep -rho -- "--z-behind:[^;]*;" node_modules/@mkbabb/glass-ui/dist/   →  --z-behind: -10;
$ grep -rn -- "--z-behind" demo/                                        →  layout.css:25 (decl) + CubeAxisLines.vue:67 (sole consumer)
```

`CubeAxisLines.vue:67` remains **the only consumer of the token in the entire demo** — the lane's
"the ONE element that uses it" still holds. Note the lane's prescribed fix (delete the demo copy, let
the vendor supply it) trades this MINOR for a hard dependency on F-1's undeclared package; sequence
accordingly.

---

## 3. INFO

### D-13 · INFO — identity transform

`:79` — `.x { transform: rotateX(0deg); }` is a no-op matrix. It buys nothing that `filter` (D-5) has
not already bought (stacking context, containing block). Kept, presumably, for visual symmetry with
`.y`/`.z`; it is still dead. **Falsifier:** if the intent is to force `.x` into the 3D rendering
context on an engine where `filter` does not, that is a real reason — undocumented, and the comment
block above it says nothing.

### D-14 · INFO — zero test coverage

```
$ grep -rl "axis-line\|CubeAxisLines" test/ e2e/   →  (no output)
```

The unit's whole contract — `lock.<axis> → .axis-line--locked` + `--axis-active: 1` on the *matching*
div — is three assertions in a mount test and would nail D-9's transposition risk permanently. There
is no engine, no async, no DOM measurement to stub.

### D-15 · INFO — `@property` inside `<style scoped>` registers globally

`:37-41`. Vue's SFC compiler attributes *style rules* with `[data-v-…]`; at-rules with descriptor
blocks pass through verbatim, so `--axis-active` is registered on the **document**, not on the
component. Nothing collides today (`grep -rn "axis-active" demo/` → this file only), but the
"colocated sub-unit … markup + styles together" framing (`:9`, and `CubeTarget.css:11-12`) implies an
encapsulation the registration does not have. A second component registering `--axis-active` with a
different `syntax` would silently win or lose by import order.

---

## 4. The glass-ui phantom-dep (F-1) where it bites *this* component

Folding `lane-frontend.md` **F-1** (glass-ui absent from `package.json` **and**
`package-lock.json`, 7.0.0 installed in `node_modules`). Re-verified against today's tree:

```
$ node -e "console.log(require('./node_modules/@mkbabb/glass-ui/package.json').version)"  →  7.0.0
$ grep -n  "glass-ui" package.json                                                        →  NOT DECLARED
$ grep -c  "glass-ui" package-lock.json                                                   →  0
$ ls package-lock.json pnpm-lock.yaml yarn.lock bun.lock                                  →  package-lock.json only
$ ls node_modules/@mkbabb/                                                                →  glass-ui  parse-that  value.js
```

Not declared, not locked, and there is no second lockfile that could be carrying it. It is installed
by side effect of the current working tree only.

This file has **zero import statements** and reads as perfectly self-contained. It is not. It consumes
**four** things that the undeclared vendor supplies:

| What | Where it resolves from | Guarded here? |
|---|---|---|
| `--ease-standard` (`:61-63`) | `glass-ui/dist/styles/tokens/scheme-spring.css` → `cubic-bezier(.4,0,.2,1)` | **yes** — `, ease` fallback → §5 L-3 |
| **its entire `prefers-reduced-motion` behaviour** | `glass-ui/dist/styles/utilities/a11y-overrides.css`, the universal `*:not([data-allow-motion])` rule | **no, and unguardable from a token** → **D-2** |
| `.preserve-3d` on its ancestors — its own 3D placement | `glass-ui/dist/styles/utilities/base-misc.css` | **unguardable** — an ancestor class, not a token |
| `--z-behind` (`:67`) | glass-ui `--z-behind: -10`, shadowed by `layout.css:25` | **no** → D-12 |

**The second row is this component's sharpest exposure and the first pass missed it entirely.** A
token dependency degrades (L-3 proves the pattern); a *behavioural* dependency on a universal
accessibility rule does not — there is no `var(…, fallback)` for "does this element respect reduced
motion." The component's a11y posture is correct today and correct for a reason that appears nowhere
in its own 90 lines, nowhere in `demo/`, and nowhere in any manifest.

Under F-1 the bite is a **build blocker, not a silent render bug**: `npm ci` on a clean checkout
reconstructs `node_modules` from the lockfile, glass-ui is absent, and
`demo/styles/style.css:3` `@import "@mkbabb/glass-ui/styles"` fails before any of this renders. So
F-1's severity stays where lane-frontend filed it (systemic RED, **not double-counted as a blocker
here**), and what this component contributes is the observation that a zero-import leaf still carries
three unlockable vendor edges — one of them (`.preserve-3d`) invisible from the file itself.

The *demo-local* residue is D-12: the `--z-behind` shadow copy is the only thing standing between this
component and the vendor's cascade, and it is the token whose absence inverts the stacking rather than
degrading it.

---

## 5. Superlatives (L-18 runs both ways)

### L-1 · one animatable scalar, three derived channels

`:35-41` + `:53-57`. A single registered `<number>` drives opacity **and** the drop-shadow blur radius
**and** the `color-mix` percentage. This is textbook `@property` — the alternative (transitioning
`opacity` and `filter` independently, hoping their easings stay in phase) is the common and wrong
form. `inherits: false` is the correct choice for a per-element state scalar, and `initial-value: 0`
correctly makes the rest state the identity.
**Falsifier:** if any of the three channels were driven by a *second* independent variable, the
one-scalar claim collapses. They are not.

### L-2 · engine-consumption restraint, and the seam drawn in the right place

A two-state 180 ms fade is a CSS transition here, not a `CSSKeyframesAnimation` — the comments
(`:8`, and `CubeTarget.vue:157` "no new rAF, no new gesture machinery (inv ζ)") make it an explicit
call, not an accident. Set that against the sibling in the same directory: `CubeTarget.vue:174-236`
*does* reach for the engine, correctly, for the die-roll — a timed 1100 ms two-axis tumble on
`ease-out-back` with `fillMode: "forwards"` — and consequently must carry `rollAnim?.stop()` before
re-arming (`:204`) **and** in `onScopeDispose` (`:234-236`).

The pair is a clean demonstration of where the seam falls: *timeline* → the engine (and pay for
teardown); *two-state* → the platform (and pay nothing). A demo that reached for its own engine to
cross-fade a boolean would be the misuse; this one does not.
**Falsifier:** identify a capability the reveal needs that CSS transitions cannot express (a
non-monotonic curve, a mid-flight retarget, playback control). There is none — it is a boolean fade.

### L-3 · the vendor motion token is consumed with a fallback

`:61-63` — `var(--ease-standard, ease)`. Census:

```
$ grep -rn "var(--ease-standard" demo/ | …
  21  var(--ease-standard)          ← unguarded
  10  var(--ease-standard, ease)    ← guarded
$ grep -rn "var(--ease-standard)" demo/scenes/   →  (no output)
```

**Every** consumption under `demo/scenes/` guards; **none** under `demo/styles/` or
`demo/components/` do (`playback-idiom.css:33-36`, `tab-idiom.css:38-40`, `KfPillTabs.vue:103-105`,
`ChannelOptions.vue:559`, `EditorHeader.vue:96-97`, `TimelineTrack.vue:225-226`, …). This file holds
the scene tier's line perfectly, and it is the one thing standing between it and F-1's undeclared
vendor (§4). I am *not* claiming it is unique — it conforms to a 6-of-6 scene-tier convention, which
is the stronger compliment.

### L-4 · a vacuously perfect leak/teardown profile — by construction, not by discipline

No imports. No `onMounted`/`onUnmounted`/`onScopeDispose`. No `useEventListener`, no `setTimeout`, no
`requestAnimationFrame`, no `useTemplateRef`, no `watch`. Nothing to leak because nothing is acquired.
Ninety-one lines, one prop, three elements — the smallest correct shape for the job, and squarely
Goldilocks. The 55 lines of comment are the only thing padding it, and D-10 is about their
*duplication*, not their existence.
**Falsifier:** any acquired resource I missed. There is none — the `<script setup>` block is four
lines long.

### L-5 · a second, motion-free tell — which makes D-2 a three-line fix

`:71-75` — while locked, `border-style` goes `dashed → solid`. That is a **discrete, non-animated**
state channel carrying the same information as the opacity/bloom. It is exactly what a
reduced-motion-safe design wants: under a PRM block that zeroes the transitions, the reveal stays
fully legible via the stroke flip and the (instant) opacity step. So D-2 costs three lines, not a
redesign — the component was built for the guard it never got.
**Falsifier:** if the solid/dashed distinction is imperceptible at the rendered stroke weight, the
channel is decorative rather than load-bearing. Given D-11 (the stroke is 2 px, not 1 px) it is if
anything *more* perceptible than declared. **UNPROVEN-NEEDS-LIVE** on perceptibility only.

---

## 6. Claims I formed and then killed against the tree

Recorded so the reader can see the denominator, and so no later lane re-files them.

**K-1 — "`width: 1000vw` (×3) causes document overflow / a horizontal scrollbar." KILLED.**
The lines are absolutely positioned against `.graph` (whose `perspective` makes it their containing
block), and `EditorShell.vue:3` clips the whole app at
`class="editor-shell relative grid h-dvh max-h-dvh w-dvw overflow-hidden …"`. Overflow from an
abs-pos descendant propagates to the nearest scroll container, which is clipped. No scrollbar, and the
filter raster region (D-5) is viewport-bounded, not 19 200 px — which is why D-5 files the
stacking-context facts and explicitly declines to file a perf claim.

**K-2 — "the `@property` registration is missing when the component has never mounted." KILLED.**
`CubeAxisLines` is a *static* import of `CubeTarget` (`CubeTarget.vue:114`), and SFC styles are
extracted into the CSS bundle at build time (and injected at module-eval in dev). The registration is
present from first paint on any route that loads the cube scene.

**K-3 — "the three decorative divs pollute the accessibility tree; they lack `aria-hidden`, unlike
the sibling `.face-relit` span (`CubeTarget.vue:69`)." KILLED as a defect, retained as trivia.**
They are empty `<div>`s with no text, no role, and `pointer-events: none`. Empty generic containers
are not exposed as meaningful nodes by any major AT. The inconsistency with the sibling is cosmetic
and adding `aria-hidden` would be cargo-cult.

**K-4 — "there is no global PRM kill-switch reaching `.axis-line`." KILLED — and it was *this file's
own* first-pass claim.** `glass-ui/dist/styles/utilities/a11y-overrides.css` carries a universal
`@media (prefers-reduced-motion: reduce) { *:not([data-allow-motion]) { transition-duration: .1s
!important; transition-property: opacity, color, background-color, border-color, box-shadow
!important; } }`. `.axis-line` matches. The first pass grepped `glass-ui/dist/styles/transitions.css`
and `demo/styles/` and concluded no such rule existed; it never searched `utilities/`. D-2 is
rewritten and downgraded accordingly. **Lesson for the next lane: when a claim is "X does not exist
anywhere," the grep must cover the whole resolved cascade — including `node_modules` — not the two
files where you expected to find it.**

**K-5 — "`@property --axis-active` is rewritten or scoped by the SFC compiler and therefore broken."
KILLED.** `@vue/compiler-sfc`'s scoped plugin walks `rule` nodes and recurses only into at-rules;
`@property`'s children are *declarations*, so the at-rule passes through byte-identical. The
registration works and is global — which is the intent, and is filed as INFO at D-15, not as a bug.

**K-6 — "the always-on `filter` re-flattens the 3D die, the T.A1 failure mode." KILLED as stated.**
T.A1 (`CubeTarget.css:148-154`) concerns **ancestors** in the 3D chain; the axis lines are childless
**leaf siblings** of `<OrbitalDrag>` under `.graph`, so a grouping property on them flattens no
subtree that exists. What survives is narrower and is already filed: the resident stacking
context/grouping buffer (D-5) and the `z-index` inertia (D-3, limb b). The flattening claim itself is
dead — do not re-file it.

---

## 7. Disposition

| id | sev | one line | fix size |
|---|---|---|---|
| D-1 | **MAJOR** | `lock` latch has no blur/target guard → stuck & spurious lit axes | upstream, ~6 lines |
| D-3 | **MAJOR** | `z-index: var(--z-behind)` inert in a depth-sorted 3D context + under a resident `filter` | 1 line + D-5 |
| D-4 | **MAJOR** | `.z` projects onto the perspective origin — the Z reveal is degenerate | design call |
| D-2 | MINOR ↓ | PRM comment names a wrapper that does not exist; the real guard is glass-ui's universal rule (undeclared dep) | 3 lines |
| D-5 | MINOR | `filter` never `none`; gate it on `.axis-line--locked` | 3 lines |
| D-6 | MINOR | one boolean, two parallel state channels | −3 bindings |
| D-7 | MINOR | 3-property transition list deviates from the colocated `--lit` idiom (`CubeTarget.css:79`) | 2 lines |
| D-8 | MINOR | 4 unreachable `var()` fallbacks on a registered property | 4 edits |
| D-9 | MINOR | prop type duplicates `PressedKeys`; 3 divs unrolled against `axes`; `--axis-w` already ships | 1 import |
| D-10 | MINOR | one rationale, six copies (two already false — D-2, D-16) | prune |
| D-11 | MINOR | `border` on `height: 0` paints two strokes | 1 line |
| D-12 | MINOR | unguarded `var(--z-behind)`; demo copy shadows the vendor token | 1 line + layout.css |
| D-16 | MINOR | dead scoped-slot seam (`OrbitalDrag.vue:7`) whose comment claims the live emit's job | 1 deletion |
| D-13 | INFO | `rotateX(0deg)` identity transform | 1 line |
| D-14 | INFO | zero test coverage | 1 spec |
| D-15 | INFO | `@property` in `<style scoped>` registers globally | comment |

**16 defects · 0 blockers · 3 MAJOR · 10 MINOR · 3 INFO.**

**0 blockers.** Nothing here stops a wave: the unit renders, does not leak, has no crash path, and —
per the D-2 correction — degrades correctly under reduced motion today. The MAJORs are a stuck-state
bug whose root is upstream (D-1), an inert declaration (D-3), and a degenerate third axis (D-4):
real, all recoverable, all small.

**The through-line.** Nine of sixteen findings are *prose asserting something the tree does not do* —
D-2 ("the wrapper below"), D-16 ("so the cube can light the locked axis line"), D-3's contract
citation, D-7's "the registered `@property` lets both channels interpolate", D-8's and D-13's
defensive-looking dead code, D-10's six drifting copies. This file is 55 % comment by line, and the
comments are load-bearing provenance the repo genuinely depends on — which is exactly why the drift
is the defect class worth naming here. The **code** is close to right; the **narration** has come
loose from it in six places, and one of those six (D-2) was strong enough to mislead this audit's own
first pass into filing a false MAJOR.

**Needs-live queue for SS-13:** D-3 (do the lines paint through the die?), D-4 (what does holding `Z`
actually draw? — the highest-value single screenshot in this set), D-7 (does the reveal settle at
180 ms or ~360 ms?), D-5 (resting filter-pass cost), L-5 (is the dashed→solid flip perceptible?).
