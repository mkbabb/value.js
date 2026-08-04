claude-opus-5[1m]

# CHALLENGE · `CubeAxisLines.vue` · axis **C — CONSUMPTION**

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/cube/CubeAxisLines.vue` (90 lines)
**Mode:** static, read-only. No browser tooling. keyframes.js + glass-ui touched as evidence only; the single write is this file.
**Corpus folded:** `formation/keyframes/lane-frontend.md` (F-1 phantom dep; S-1..S-8 shadow census; the CSS/token survey §6). `lane-library.md` + `CENSUS-2026-08-03.md` carry **zero** hits for `CubeAxisLines` / `axis-line` / `--z-behind` / `--ease-standard` — nothing to fold from either.

**Tally: 11 defects · 0 blockers · 4 superlatives · 2 corpus contradictions.**

---

## 0. What this component actually consumes

Read whole, plus every file it touches transitively at the seam:

| surface | what `CubeAxisLines` takes | provenance |
|---|---|---|
| keyframes.js (the library under test) | **nothing** — zero imports | `CubeAxisLines.vue:27-32` is the entire `<script setup>` |
| glass-ui (the design system) | **no component**; two token reads — `--ease-standard` (`:61-63`), `--z-behind` (`:67`, via the demo's layout.css re-declaration) | `node_modules/@mkbabb/glass-ui/dist/styles/tokens/scheme-spring.css:1`, `.../scheme-motion.css:1` |
| value.js (transitive) | **nothing** — no JS at all | see §4 |
| demo-owned tokens | `--axis-x/y/z` (`:78,82,86`) | `demo/styles/style.css:109-111` |
| sibling API | the `lock` prop only (`:30`), fed by `CubeTarget.vue:101` from OrbitalDrag's `pressedKeys` emit | `orbital-drag/OrbitalDrag.vue:40,315-321` |
| its own contract | 1 required prop, 0 emits, 0 slots, 0 injects, 0 refs, 3 root nodes | `:10-32` |

So the CONSUMPTION surface is small and almost entirely **CSS-token consumption + one sibling-state seam**. That is where the defects are.

**Seam liveness — checked first, discharged.** The reveal's entire correctness rests on `OrbitalDrag.vue:318-321` firing. Its source is a *getter returning a ref-wrapped object mutated in place* (`useOrbitalPointer.ts:58-60,174` — `pressedKeys.value[slot] = isPressed`), which without `deep` would compare `Object.is`-identical every time and **never** fire, killing the egg outright. It carries `{ deep: true }` (`OrbitalDrag.vue:321`). The seam is live. This was the one BLOCKER candidate and it is **dead** — reported as a non-finding rather than shipped as a false positive.

---

## 1. Defects

### D-1 · MAJOR — a resident, always-on `filter` on three 1000vw elements, when the gate is already computed one rule below

`CubeAxisLines.vue:54-57`:
```
filter: drop-shadow(0 0 calc(var(--axis-active, 0) * 6px)
        color-mix(in srgb, var(--color) calc(var(--axis-active, 0) * 80%), transparent));
```
At rest `--axis-active` is `0`, so this resolves to `drop-shadow(0 0 0px transparent)` — a **non-`none` computed `filter`, permanently, on every axis line**, whether or not the egg is ever triggered. The elements are `width: 1000vw` (`:44`), so each is ~10 screens wide, and all three sit inside `.graph`, which is `perspective: 1200px` (`CubeTarget.css:15`) + `.preserve-3d` (glass-ui `dist/styles/utilities/base-misc.css:1`).

This lands squarely on top of two standing verdicts in the *sibling stylesheet of the same component pair*:
- `CubeTarget.css:148-154` (T.A1) extirpated `filter` from this exact 3D chain — "`filter` is a CSS grouping property … no compensating ancestor shadow is re-introduced".
- `CubeTarget.css:26-35` (T.G3) records the owner verdict "the performance on every single page is god awful" and the resulting rule that the cube holds **no** resident compositor cost at idle; `:52-61` makes even `will-change` transient for the same reason.

The fix costs nothing and the component has already done the hard part: `.axis-line--locked` (`:73-75`) is computed and bound (`:12,17,22`) and currently spends itself on a single `border-style: solid`. Moving the `filter` declaration inside that block leaves `filter: none` at rest.

*Not* a repeat of the T.A1 bug: `.axis-line` has no descendants, so forcing its used `transform-style` to flat collapses nothing. The claim is resident cost, not visual collapse.

**Falsifier:** a paint/layer profile showing Chromium allocating no additional render surface or filter region for `.axis-line` at rest, or `getComputedStyle(el).filter === "none"`. Magnitude is **UNPROVEN-NEEDS-LIVE** (SS-13); the resident non-`none` declaration is source-certain.

### D-2 · MAJOR — the PRM comment describes a wrapper that does not exist, in-file or globally

`CubeAxisLines.vue:58-59`:
```
/* Smooth the reveal as the key latches/releases (…).
   PRM-respecting via the wrapper below. */
```
There is no wrapper below. The `<style scoped>` block ends at `:89` with no `@media (prefers-reduced-motion: reduce)` rule, and nothing outside covers it:
- `demo/styles/` (7 files) contains **zero** `prefers-reduced-motion` occurrences.
- glass-ui's PRM blocks are class-scoped, not universal: `dist/styles/transitions.css` brackets only its own named transition classes (`.fade-enter-active`, `.pane-swap-*`, …); `dist/styles/tokens/scheme-motion.css:1` zeroes `--motion-weight` and re-points `--ease-cartoon-punch`, neither of which this file reads.
- The demo's own convention is a **per-file** bracket, present in eight siblings: `SquareScene.css:136`, `SquareInstrument.vue:207`, `EasingTarget.css:48`, `SequenceTarget.css:238`, `SpringTarget.vue:462`, `SpringHeatmap.vue:333`, `StartingStyleTarget.vue:211`, `App.skeleton.vue:95`. `CubeAxisLines` is the file that *claims* the convention and omits it.

Three transitions (`:60-63`) therefore run at full 180 ms under `prefers-reduced-motion: reduce`. MAJOR and not BLOCKER because the affordance itself survives motion suppression — see **SUP-4**.

**Falsifier:** any global `@media (prefers-reduced-motion: reduce)` rule reaching `.axis-line` (a `*`/`:where(*)` transition-duration reset in the demo cascade or in glass-ui). Grepped both; none exists.

### D-3 · MINOR — the driver *and* both derived channels are transitioned, against the `--lit` idiom next door

`:60-63` transitions `opacity`, `--axis-active`, and `filter` — all 180 ms. But `opacity` (`:53`) and `filter` (`:54-57`) are *computed from* `--axis-active`. Transitioning the registered custom property already animates both derived channels; declaring separate transitions on them stacks a second easing on a target that is itself moving every frame.

The correct idiom is in the sibling stylesheet, same feature family, same author: `CubeTarget.css:79` transitions **only** the driver — `transition: --lit 160ms linear` — and lets the `--lit`-derived gradients of `.face-relit` (`CubeTarget.css:126-141`) follow for free.

**Falsifier:** a computed-style timeline showing `opacity` reaching `1.0` at exactly 180 ms with the declared `--ease-standard` shape (i.e. the browser does **not** re-arm the dependent transitions). Behavioural magnitude **UNPROVEN-NEEDS-LIVE**; the redundant triple declaration against an in-repo counter-example is source-certain either way.

### D-4 · MINOR — half-consumption of the motion token family: the easing token is taken, the duration ladder is not

`:61-63` reads `var(--ease-standard, ease)` — correct — then hardcodes `180ms` three times. glass-ui ships the whole duration ladder (`scheme-motion.css:1`: `--duration-instant .1s / --duration-control .12s / --duration-fast .2s / --duration-normal .3s / …`), and the demo consumes it by name in the same register elsewhere: `SquareScene.css:66`, `SquareInstrument.vue:153`, `SpringHeatmap.vue:328` all write `var(--duration-fast, 160ms)`. `180ms` is also **off-ladder** — it matches no rung.

Corollary: glass-ui's actual PRM lever is `--motion-weight` (`scheme-motion.css:1`, zeroed under `prefers-reduced-motion`). Grep of the whole demo returns **zero** consumers of `--motion-weight`, so the design system's own reduced-motion multiplier is unused tree-wide; D-2 is the local instance of that gap.

**Falsifier:** a demo law that forbids the duration tokens in scene-target styles, or a rung equal to 180 ms. Neither exists.

### D-5 · MINOR — `z-index: var(--z-behind)` is very likely inert where it is written

`:64-67` carries a six-line rationale ("Reconciles the former orphan raw below-plane value to the z-contract documented in style.css") for `z-index: var(--z-behind)`. But `.axis-line` is a child of `.graph`, which is `transform-style: preserve-3d` (`CubeTarget.vue:9` class + glass-ui `base-misc.css:1`) **and** `perspective: 1200px` (`CubeTarget.css:15`). Children of a preserve-3d parent form a 3D rendering context and are painted by **depth sort**, not by `z-index`. The intended "below the content plane" result is delivered by geometry (the lines sit at local z = 0, the cube's faces at ±`--side-offset`, `CubeTarget.css:87-103`), not by the token.

So the component pays the design-system-conformance ceremony for a declaration the rendering model discards. That the visual is nonetheless right makes this a documentation-and-idiom defect, not a rendering one.

**Falsifier:** deleting `z-index: var(--z-behind)` changes the axis lines' paint order relative to the cube, or DevTools shows the stacking-context sort honouring −10 here. Complicated by `.axis-line`'s two grouping properties (`opacity: 0.45` at rest, `:53`; the always-on `filter`, D-1), either of which may pull the element out of the 3D context in a given engine — which is exactly why the claim is MINOR and flagged **UNPROVEN-NEEDS-LIVE**.

### D-6 · MINOR — the rung it consumes is a *shadow token*: glass-ui already ships `--z-behind`

`demo/styles/layout.css:25` declares `--z-behind: -10;` with the comment "the below-plane rung (CubeTarget axis line) … below glass-ui's --z-content:10". But glass-ui 7.0.0 already ships `--z-behind: -10` in its own `:root` (`dist/styles/tokens/scheme-motion.css:1`, immediately before `--z-background/--z-content/--z-controls/…`), and bridges it to a Tailwind utility (`dist/styles/theme/bridges.css:1`: `--z-index-behind: var(--z-behind)`, i.e. a `z-behind` class exists).

`style.css:24-25` states the law: *"There is NO demo-local z-scale; the demo OWNS the ORDER as a documented contract."* `layout.css:25` is a demo-local z-scale entry. Values coincide today (−10 = −10), so nothing is visually wrong; the defect is a duplicated definition that can drift, and `CubeAxisLines.vue:67` is the sole consumer both comments name — this component is what anchors the duplicate in place. This is the shadow-component pathology of lane-frontend §5 (S-1..S-8) expressed at the **token** tier, which that census did not scan.

**Falsifier:** glass-ui not shipping `--z-behind`, or shipping a different value, or a cascade-order argument by which the demo's re-declaration is load-bearing. Import order (`style.css:3` glass-ui → `:15` layout.css) means layout.css wins, but it wins with an identical value.

### D-7 · MINOR — three purely decorative roots with no `aria-hidden`, against the in-feature precedent

`:10-24` renders three empty presentational `<div>`s and no `aria-hidden="true"`. The same feature's other decorative overlay does carry it: `CubeTarget.vue:67-70` — `<span class="face-relit pointer-events-none absolute inset-0" aria-hidden="true">`. The component already declares `pointer-events: none` (`:69`), so the omission is inconsistency rather than oversight of the category.

**Falsifier:** an SR/axe pass showing empty `<div>`s contribute no accessible nodes (largely true in practice) — which would demote this to INFO, not kill the inconsistency with the sibling.

### D-8 · INFO — `@property` registered from a `<style scoped>` block, and the author hedged against it in the same file

`:37-41` registers `--axis-active` inside `<style scoped>`. Vue's scoped transform rewrites *selectors*; a selectorless at-rule passes through verbatim, so a leaf sub-component performs a **document-global** custom-property registration. Every other registration in the demo lives in a plain stylesheet: `CubeTarget.css:6` (`--lit`), `SequenceTarget.css:14` (`--ball-p`), `design-idioms.css:60` (`--rail-width`).

The tell that the author was unsure: `:53`, `:55`, `:56` all write `var(--axis-active, 0)` — three fallbacks that are **dead**, because `@property … initial-value: 0` (`:40`) makes `var(--axis-active)` unable to be invalid. Either the registration applies (fallbacks are noise) or it does not (the `transition: --axis-active` at `:62` silently does nothing, since unregistered custom properties do not interpolate). Both readings cannot be true, and the file is written for both.

Mitigating: `CubeTarget.css:11-12` explicitly documents the colocation as deliberate. INFO, not MINOR.

**Falsifier:** `@vitejs/plugin-vue`'s scoped postcss pass rewriting or dropping `@property` (it does neither — it operates on `Rule` selectors), or another `@property --axis-active` elsewhere in the tree (there is exactly one).

### D-9 · INFO — a three-root fragment with no attribute contract

`:10-24` gives the component three sibling roots and no `defineOptions({ inheritAttrs: false })` / no explicit `v-bind="$attrs"` target. A multi-root component cannot auto-inherit fallthrough attributes: any consumer writing `<CubeAxisLines class="…">` gets a dev-mode "Extraneous non-props attributes" warning and the class is silently dropped. No consumer does today (`CubeTarget.vue:101` passes `:lock` only), so this is a latent contract gap, not a live bug — and it caps reuse, since a second scene could not position or restyle the lines without forking.

**Falsifier:** the component being explicitly single-use by charter, or Vue changing fragment fallthrough semantics.

### D-10 · INFO — the seam made OrbitalDrag publish the same latch twice; one channel has zero consumers

To feed this component, `OrbitalDrag` grew **two** publication paths in the same change (P.W5.S3):
- a scoped-slot prop — `OrbitalDrag.vue:3-7`, `<slot :pressed-keys="pointer.pressedKeys.value">`
- an emit — `OrbitalDrag.vue:40` declaration, `:315-321` the deep-watch emitter

`CubeAxisLines` is rendered *outside* `<OrbitalDrag>` (`CubeTarget.vue:93` closes the component, `:101` renders the lines as its sibling inside `.graph`), so the slot prop is unreachable for the one use case it was added for. Grep across the demo: the slot prop has **zero** consumers; `CubeTarget.vue:15` uses the emit. Dead sibling API surface, authored for this component.

Note the slot prop is also structurally wrong for reactivity — it passes `.value` unwrapped, snapshotting the object into the slot scope.

**Falsifier:** any consumer of `v-slot="{ pressedKeys }"` on `OrbitalDrag`. `grep -rn "pressed-keys\|pressedKeys" demo/` outside `orbital-drag/` returns exactly two lines, both in `CubeTarget.vue` (`:15`, `:156`), both the emit path.

### D-11 · INFO — the canonical axis tuple the sibling exports is ignored; the axis list is unrolled by hand

`orbital-drag/index.ts:6` exports `axes = ["x","y","z"] as const`, consumed by five files (`OrbitalDrag.vue:18`, `useOrbitalInertia.ts:5`, `useOrbitalPointer.ts:5`, `useOrbitalPinch.ts:5`, and their signatures). `CubeAxisLines` — which is *about* those three axes — imports nothing and unrolls them three times in the template (`:10-24`), collapsing to one `v-for="axis in axes"` node with `:class="['axis-line', axis]"` and `:style="{'--axis-active': lock[axis] ? 1 : 0}"`. The three CSS rules (`:77-88`) legitimately stay distinct — each carries a different transform.

**Falsifier:** `axes` not being exported or not reachable from `demo/scenes/cube/` (it is both). Weighted INFO because the unrolled form is arguably more legible at three items — this is a consumption-of-sibling-API observation, not a correctness one.

---

## 2. Superlatives (L-18, both directions)

### SUP-1 · Correctly *not* a shadow component, and correctly *not* dogfooding the engine

The demo's law is that its signature animation **is** the library — lane-frontend S-8 keeps `TypingDots` bespoke precisely because it dogfoods the engine ("the inv-ζ seam"). `CubeAxisLines` imports zero keyframes.js and does the reveal in pure CSS, and that is the *right* call: `CubeTarget.vue:157` states the governing invariant for this egg — "no new rAF, no new gesture machinery (inv ζ): a threshold + a CSS state flip". An engine animation here would add a rAF to satisfy a state toggle. On the glass-ui side there is no primitive for 3D axis guides; lane-frontend §5's tally independently files "axis/playhead" under **"Bespoke, no glass counterpart"** (lane-frontend.md:398). Neither library is under-consumed.

**Falsifier (runs both ways):** a demo law requiring every animated scene surface to drive through `CSSKeyframesAnimation`, or a glass-ui component exposing a 3D-guide primitive. Grepped glass-ui `dist/components/` — nothing of the kind.

### SUP-2 · The `var()` fallback discipline is exactly right, and it is F-1-proof

Exactly one token here is foreign (glass-ui's `--ease-standard`, defined at `dist/styles/tokens/scheme-spring.css:1` as `var(--motion-ease-standard)` = `cubic-bezier(.4,0,.2,1)`), and it is the **only** one written with a fallback: `var(--ease-standard, ease)` ×3 (`:61-63`). The demo-owned tokens — `--axis-x/y/z` (`style.css:109-111`) and `--z-behind` (`layout.css:25`) — are written bare, which is correct for tokens you own.

That is materially valuable under **F-1** (lane-frontend: glass-ui is absent from `package.json` *and* `package-lock.json`, present in `node_modules` by accident of install state). If F-1 ever resolves to a missing glass-ui, this component's reveal degrades to `ease` instead of breaking. Compare the files that read the same token **without** a guard: `playback-idiom.css:33-36`, `ControlsPaneWrapper.css:95`.

**Falsifier:** `--ease-standard` turning out to be demo-owned (it is not — zero definitions in `demo/`, one in glass-ui), or the demo-owned tokens being undefined (both grep clean).

### SUP-3 · A least-privilege prop, and a genuinely zero-coupling contract

`:28-31` declares `lock: { x: boolean; y: boolean; z: boolean }` rather than importing `PressedKeys` (`orbital-drag/types.ts:8-15`), which carries six fields — `shift`, `ctrl`, `meta` included. The component takes the three booleans it renders and nothing else; `CubeTarget.vue:158-163` is the narrowing adapter. The whole contract is 1 required prop, 0 emits, 0 slots, 0 `inject`, 0 template refs, 0 lifecycle — the sub-unit is portable to any scene with an x/y/z latch and cannot desync anything upstream. This is the correct reading of the "colocated sub-unit" precedent the header cites (`:9`, the SquareInstrument colocation).

**Falsifier:** a demo law mandating shared nominal types across the orbital-drag seam, or a case where the wider `PressedKeys` fields are needed for the reveal (`shift`/`ctrl`/`meta` change *which transform* the axis drives, not *which axis is locked` — `OrbitalDrag.vue:194-205` — so the narrowing is semantically exact).

### SUP-4 · The affordance survives motion suppression — a motion-free second tell

`:71-75` gives the locked axis `border-style: solid` against the resting `dashed` (`:46`) — a state change carried by **stroke style, not motion**. So even with every transition neutered (which, per D-2, is what a reduced-motion user actually gets), the axis-lock reveal still reads. That is the reason D-2 is MAJOR rather than BLOCKER, and it is a deliberate design choice the comment names ("a second, motion-free tell"). The registered `@property` (`:37-41`) is likewise the *correct* mechanism for the interpolating channel — unregistered custom properties do not transition at all.

**Falsifier:** the dashed→solid delta being imperceptible at 1 px on the resting 0.45 opacity (`:53`, T.A2's demotion from 0.75 — `T.A-cube-taste.md:23`). **UNPROVEN-NEEDS-LIVE** for SS-13's visual pass; the mechanism is source-certain.

---

## 3. Contradictions of the hitherto corpus

### C-1 · lane-frontend.md:253 and :442 describe a raw literal the tree does not contain

The census records:
- `:253` — `| 90 | cube/CubeAxisLines.vue | b | axis lines (raw z-index:-10) |`
- `:442` — "One acknowledged exception: `CubeAxisLines.vue`'s raw `z-index:-10`."

The tree at `CubeAxisLines.vue:67` reads `z-index: var(--z-behind);`, with `:64-67` documenting the reconciliation ("Reconciles the former orphan raw below-plane value to the z-contract", W3.S2). **There is no raw `-10` in this component.** The census appears to have transcribed `demo/styles/style.css:39` — "The one raw `z-index: -10` (CubeTarget axis line) reconciles to `--z-behind` above" — which is itself stale prose describing a *former* state. Both the census row and the style.css sentence should be retired.

### C-2 · lane-frontend.md:442's "z-index is single-sourced from glass-ui" is not quite true, and this component is the exception

The census states the scale "lives in `node_modules/@mkbabb/glass-ui/dist/styles/tokens.css`; the demo owns only the documented *order*". `demo/styles/layout.css:25` **re-declares a rung value** (`--z-behind: -10`) that glass-ui already ships (`dist/styles/tokens/scheme-motion.css:1`) — a demo-local z-scale entry, contradicting both the census sentence and `style.css:24`'s own law. See D-6. The census's `:440` token survey does list `--z-behind` among the demo's singletons, so the data was in hand; the conclusion at `:442` over-reads it.

---

## 4. value.js transitive exposure — scoped negative, certified

The R1 class (a live `parseCssColor("oklch()")` crash) is **not reachable from this component**. Provenance:

- `CubeAxisLines.vue` has no `<script>` imports at all (`:27-32`) — no JS executes on its behalf.
- Its only color surface is CSS: `color-mix(in srgb, var(--color) …, transparent)` (`:56`) over `--axis-x/y/z` = space-separated `hsl()` (`style.css:109-111`). Resolved by the UA, never handed to a parser.
- The cube scene's value.js consumption is math/value only — `useCubeRelit.ts:4` and `orbital-drag/OrbitalDrag.vue:12` / `quaternionEuler.ts:1` take `clamp` from `@mkbabb/value.js/math`; `useCubeDemo.ts:8` and `matrix-editor/transformMath.ts:1` take value/type surfaces from `@mkbabb/value.js/value`; `matrix-editor/useTransformState.ts:1` takes `easeInBounce` from `/easing`. **No `@mkbabb/value.js/css` or `/color` import anywhere under `demo/scenes/cube/`.**
- The demo's actual `parseCssColor` call sites are in the **square** scene (`useSquareTumble.ts:2-3`) and `useSquareDemo.ts:4` (`parseCssScalar`). That is where the R1 class lives; the cube is off that path.

**Falsifier:** any runtime path feeding a computed `--axis-*` value into value.js's color parser. Grepped `demo/` for `@mkbabb/value.js` (20 sites, all enumerated above by scene) — none in cube touches `/css` or `/color`.

---

## 5. Checked and cleared (non-findings, recorded so they are not re-raised)

| candidate | why it is not a defect |
|---|---|
| `width: 1000vw` (`:44`) causing document overflow | `EditorShell.vue:3` is `h-dvh max-h-dvh w-dvw overflow-hidden` — the shell clips. Folded into D-1 as the magnitude multiplier only. |
| `filter` collapsing the 3D faces (the T.A1 bug, `CubeTarget.css:148-154`) | `.axis-line` has no descendants; forcing its used `transform-style` to flat collapses nothing. D-1 is a resident-cost claim, not a collapse claim. |
| `OrbitalDrag`'s watch never firing → dead egg | `{ deep: true }` at `OrbitalDrag.vue:321`. Seam live. |
| emit-name casing `@pressed-keys` ↔ `emit("pressedKeys")` | Vue normalises kebab↔camel for emits; `CubeTarget.vue:15` binds correctly. |
| emit churn — the deep watch fires on `shift`/`ctrl`/`meta` too (`useOrbitalPointer.ts:63-65`), i.e. on every window keystroke | `CubeTarget.vue:160-162` writes identical booleans; Vue's `hasChanged` gate means no re-render. Allocation-only. |
| `height: 0px` + `border: 1px` rendering a 2 px double-dashed band (`:45-46`) | Deliberate stroke construction; a taste question for the SS-13 visual pass, not a consumption defect. |
| `--color` as a generic custom-property name (`:46,78,82,86`) | Consistent with the sibling idiom at `MatrixEditor.vue:143-151`. Consistency beats renaming. |
| `transform: rotateX(0deg)` on `.x` (`:79`) being a no-op | It keeps all three lines in the same transformed-element treatment inside the 3D context. Intentional. |
| `calc(var(--axis-active) * 80%)` inside `color-mix()` (`:56`) | Valid — `<number>` × `<percentage>` yields a percentage; registered syntax `"<number>"` (`:38`) guarantees the type. |
