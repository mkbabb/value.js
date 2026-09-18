claude-opus-5[1m]

# CHALLENGE · `CubeAxisLines.vue` · axis **C — CONSUMPTION**

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/cube/CubeAxisLines.vue` (90 lines)
**Mode:** static, read-only. No browser tooling. keyframes.js + glass-ui touched as evidence only; the single write is this file.
**Corpus folded:** `formation/keyframes/lane-frontend.md` (F-1 phantom dep; S-1..S-8 shadow census; §4 inventory; §6 token survey), `lane-library.md:243` (the R1 crash surface). Cross-repo: T-lane `19-fragile-css.md` F3, T-lane `02-cube.md`, T-verdict `T.A-cube-taste.md`, J-lane `styling-design-system.md` STY-8, J-lane `pane-cube.md` C6 + `pane-home.md` ABSTRACT-INTO-GLASS-UI, D-lane `brittleness-findings.md`, C-lane `plan-findings.txt`.

**Tally: 13 defects · 0 blockers · 4 superlatives · 3 corpus contradictions.**

> **Revision note (binding).** This file supersedes an earlier pass on the same axis. That pass carried one **factual error** that inverted a MAJOR finding: it asserted that "glass-ui's PRM blocks are class-scoped, not universal" and concluded the three transitions "run at full 180 ms under `prefers-reduced-motion: reduce`". They do not — see **D-3** and **§3 · X-3** for the import chain that proves it. The error is recorded rather than quietly dropped, because it is exactly the kind a static audit produces when it greps `demo/` and one glass-ui subtree but not the vendor's `@import` graph.

---

## 0 · What this component actually consumes

Read whole, plus every file it touches transitively at the seam: `CubeTarget.vue`, `CubeTarget.css`, `CubeScene.vue`, `cubeKeys.ts`, `useCubeDemo.ts`, `useCubeRelit.ts`, `orbital-drag/{OrbitalDrag.vue,index.ts,types.ts,composables/useOrbitalPointer.ts}`, `demo/styles/{style.css,layout.css}`, `node_modules/@mkbabb/glass-ui@7.0.0/dist/styles/**`.

| surface | what `CubeAxisLines` takes | provenance |
|---|---|---|
| keyframes.js (the library under test) | **nothing** — zero imports | `CubeAxisLines.vue:27-32` is the entire `<script setup>` |
| glass-ui (the design system) | **no component**; two token reads — `--ease-standard` (`:61-63`), `--z-behind` (`:67`, via the demo's re-declaration) | `glass-ui/dist/styles/tokens/scheme-spring.css`, `.../tokens/scheme-motion.css` |
| glass-ui (**involuntary**) | the universal PRM override rewrites this component's `transition-property` | `glass-ui/dist/styles/utilities/a11y-overrides.css` — see D-3 |
| value.js (transitive) | **nothing** — no JS at all | see §4 |
| demo-owned tokens | `--axis-x/y/z` (`:78,82,86`) | `demo/styles/style.css:109-111` |
| sibling API | the `lock` prop only (`:30`), fed by `CubeTarget.vue:101` from OrbitalDrag's `pressedKeys` **emit** | `orbital-drag/OrbitalDrag.vue:40,315-321` |
| its own contract | 1 required prop, 0 emits, 0 slots, 0 injects, 0 refs, 0 lifecycle, 3 root nodes | `:10-32` |

The CONSUMPTION surface is therefore **CSS-token consumption + one sibling-state seam**, and that is where every defect lands.

**Seam liveness — checked first, discharged.** The reveal's entire correctness rests on `OrbitalDrag.vue:317-321` firing. Its source is a getter returning a ref-wrapped object **mutated in place** (`useOrbitalPointer.ts:58-60`, `:173-175` — `pressedKeys.value[slot] = isPressed`), which without `deep` would compare `Object.is`-identical every time and **never** fire, killing the egg outright. It carries `{ deep: true }` (`OrbitalDrag.vue:321`). Seam live. This was the one BLOCKER candidate and it is **dead** — recorded as a non-finding rather than shipped as a false positive.

---

## 1 · Defects

### D-1 · MAJOR — a resident, always-on `filter` on three `1000vw` elements, when the gate is already computed one rule below

`CubeAxisLines.vue:54-57`:
```css
filter: drop-shadow(0 0 calc(var(--axis-active, 0) * 6px)
        color-mix(in srgb, var(--color) calc(var(--axis-active, 0) * 80%), transparent));
```
At rest `--axis-active` is `0`, so this resolves to `drop-shadow(0 0 0px transparent)` — a **non-`none` computed `filter`, permanently, on every axis line**, whether or not the egg is ever triggered. Each element is `width: 1000vw` (`:44`), ~10 screens wide, and all three sit inside `.graph`, which is `perspective: 1200px` (`CubeTarget.css:15`) + `.preserve-3d` (glass-ui `dist/styles/utilities/base-misc.css`).

This lands on top of two standing verdicts in the *sibling stylesheet of the same component pair*:

- `CubeTarget.css:148-154` (**T.A1**) extirpated `filter` from this exact 3D chain — "`filter` is a CSS grouping property → it forced `.cube`'s USED `transform-style` to `flat` … no compensating ancestor shadow is re-introduced".
- `CubeTarget.css:26-35` (**T.G3**) records the owner verdict "the performance on every single page is god awful" and the resulting rule that the cube holds **no** resident compositor cost at idle; `:52-61` makes even `will-change` transient for the same reason.

The fix costs nothing and the component has already done the hard part: `.axis-line--locked` (`:73-75`) is computed and bound (`:12,17,22`) and currently spends itself on a single `border-style: solid`. Moving the `filter` declaration inside that block leaves `filter: none` at rest.

*Not* a repeat of the T.A1 bug: `.axis-line` has no descendants, so forcing its own used `transform-style` to flat collapses nothing. The claim is **resident cost + precept drift**, not visual collapse — and the precept half is source-certain: nothing in either file records an exemption.

**Falsifier:** a paint/layer profile showing Chromium allocating no additional render surface or filter region for `.axis-line` at rest, or `getComputedStyle(el).filter === "none"`. Magnitude **UNPROVEN-NEEDS-LIVE** (SS-13); the resident non-`none` declaration and the two unexempted verdicts are source-certain.

---

### D-2 · MAJOR — the reveal lights identically for rotate-lock, translate-lock and scale-lock, contradicting its own prose

**Provenance:** `CubeAxisLines.vue:28-31` (contract), `:3-4` and `:50-52` (the claim) · `orbital-drag/types.ts:8-15` (producer type) · `OrbitalDrag.vue:192-212` (the branch) · `useOrbitalPointer.ts:62-66, 171-176` (the setters) · `CubeTarget.vue:158-163` (the projection).

The component documents itself, twice, as a **rotation**-constraint reveal:

> `:3-4` — "OrbitalDrag already CONSTRAINS **rotation** to a single axis while X/Y/Z is held"
> `:50-52` — "so the single-axis constraint OrbitalDrag enforces becomes spatially legible"

The producer disagrees. `updatePressedKeys` (`useOrbitalPointer.ts:171-176`) sets `x` purely from the `x` keydown, **independent of every modifier**; `syncModifiers` (`:62-66`) writes `shift/ctrl/meta` into separate slots. `OrbitalDrag.vue:194-205` then branches *inside* `if (keys.x)`:

```ts
if (keys.x) {
    if (keys.shift) updateTranslation("x", delta);            // ← TRANSLATE
    else if (keys.ctrl || keys.meta) updateScale("x", delta);  // ← SCALE
    else updateAxisRotation(["x"], deltaX, deltaY, isTouch);   // ← rotate
}
```

The prop (`:30`) is `{x,y,z}` — `shift/ctrl/meta` are projected away at `CubeTarget.vue:158-163` before the component sees them. So the x line lifts to full opacity, goes solid-stroke and blooms **identically** in all three modes.

**Failure scenario.** User holds `X` + `Shift` and drags. The die **translates** along x. The red line blooms carrying the affordance the header defines as "this is your rotation axis". Worse under `X` + `Ctrl`: the die **scales** along x while the same light says rotation.

**The counter-argument, stated fairly.** The prop is named `lock`, and one can read it as "which *axis* is constrained", which is exactly true in all three modes; on that reading the narrowing is semantically exact and even a virtue (the earlier pass filed it as a superlative on precisely this ground). I do not think that reading survives the file's own prose — `:3-4` and `:50-52` name *rotation*, not *axis* — but the finding is genuinely two-sided, so it resolves **either** by widening the prop **or** by a two-word prose edit. It is MAJOR because today a user is shown a statement that is false, not because the fix is large.

**Falsifier (either kills it):** show `keys.x` is only true in the rotation branch (it is not — `useOrbitalPointer.ts:173-175` writes the slot unconditionally); **or** show the header prose does not claim rotation specifically (it does, twice, quoted above). This finding dies the moment either is true.

---

### D-3 · MINOR — the PRM comment names a wrapper that has never existed; PRM is in fact handled by an unattributed vendor global that **splits** the reveal

`CubeAxisLines.vue:58-59`:
```
/* Smooth the reveal as the key latches/releases (…).
   PRM-respecting via the wrapper below. */
```
There is no wrapper below. The `<style scoped>` block ends at `:89` with no `@media (prefers-reduced-motion: reduce)` rule; `demo/styles/` (7 files) contains **zero** PRM occurrences; the only PRM reference anywhere in `demo/scenes/cube/` is `useCubeDemo.ts:162-169`, a JS `matchMedia` gate on the *graph intro sweep* that never touches `.axis-line`. And it was never there — `git log -S"prefers-reduced-motion" -- demo/scenes/cube/CubeAxisLines.vue` returns **empty** across both commits that touch the file (`f77322b5` the R.W6 carve, `90eec556` the T.A restage).

**But the behaviour is not unhandled.** glass-ui 7.0.0 ships a **universal** PRM override:

```css
/* node_modules/@mkbabb/glass-ui/dist/styles/utilities/a11y-overrides.css */
@media (prefers-reduced-motion: reduce) {
  *:not([data-allow-motion]) { animation-duration: .01ms !important; animation-iteration-count: 1 !important; }
  *:not([data-allow-motion]) {
    transition-duration: 0.1s !important;
    transition-property: opacity, color, background-color, border-color, box-shadow !important;
  }
}
```

Reachability, verified end to end: `demo/styles/style.css:3` `@import "@mkbabb/glass-ui/styles"` → package `exports["./styles"] = "./dist/styles/index.css"` → `index.css` (38 imports) ends with `@import "./accessibility.css";` **unlayered** → `accessibility.css:1` `@import "./utilities/a11y-overrides.css"`. Author-`!important` beats any author-normal declaration regardless of layer, so `.axis-line`'s unlayered scoped `transition` is overridden.

The consequence is the real finding, and it is a **split reveal**: `transition-property` is *replaced*, so `--axis-active` and `filter` drop out and snap while `opacity` survives at `0.1s`. Under reduced motion the solid-stroke tell and the bloom arrive on frame 0 and the brightening arrives ~100 ms later. Had the component used the scene's driver-only idiom (D-4), the driver would drop out and the whole reveal would snap coherently — the correct reduced-motion read.

So the file gets PRM safety by accident, from a vendor global its comment does not name, and pays for the accident with an incoherent reveal.

**Falsifier:** show `accessibility.css` is unreachable from `@mkbabb/glass-ui/styles` (it is the last import of `index.css`), or that the demo does not import that entry (`style.css:3` is unconditional), or find the local wrapper the comment names. Split-reveal timing **UNPROVEN-NEEDS-LIVE**; the override, its reachability, and the empty `git log -S` are source-certain.

---

### D-4 · MINOR — the driver *and* both derived channels are transitioned, against the `--lit` idiom next door

`:60-63` transitions `opacity`, `--axis-active` **and** `filter`, all 180 ms. But `opacity` (`:53`) and `filter` (`:54-57`) are *computed from* `--axis-active`. A running transition supplies its property's value from the transition cascade origin, which outranks the declared `var()`-derived value — so for the full 180 ms the registered driver's interpolation **feeds nothing**, and the `@property` block (`:37-41`) plus its stated purpose are dead weight against their own comments:

> `:35-36` — "register `--axis-active` (0…1) **so** the … opacity + drop-shadow bloom INTERPOLATE cleanly"
> `:58-59` — "the registered `@property` **lets** both channels interpolate"

Neither is true as written; the channels interpolate because *they* are listed. The correct idiom is in the sibling stylesheet, same feature family, same author: `CubeTarget.css:79` transitions **only** the driver (`transition: --lit 160ms linear`) and lets `--lit`-derived gradients follow for free (`CubeTarget.css:126-141`, deliberately absent from `transition-property`). `SequenceTarget.css` does the same with the engine-written `--ball-p` (`:13-17` registration, `:203-208` derived `box-shadow` untransitioned). Of the demo's four `@property` sites, `CubeAxisLines` is the only one that belts *and* braces.

This is also the mechanism behind D-3's split: it is precisely the redundant `opacity` entry that survives the vendor's `transition-property` replacement.

**Falsifier (one edit, decisive):** delete `:62` and the `@property` block at `:37-41`. If normal-motion rendering changes at all, this finding is dead. Prediction: byte-identical, because `opacity` and `filter` are affine in `--axis-active` on both routes.

---

### D-5 · MINOR — half-consumption of the motion token family: the easing token is taken, the duration ladder is not

`:61-63` reads `var(--ease-standard, ease)` — correct — then hardcodes `180ms` three times. glass-ui ships the whole ladder (`--duration-instant .1s`, `--duration-control .12s`, `--duration-fast .2s`, `--duration-normal .3s`, `--duration-slow .45s`, `--duration-panel .55s`, `--duration-xl 1s`, `--duration-xxl 1.5s`) plus a `--motion-tempo: 1` scalar the spring durations multiply through. `180ms` is **off-ladder** — it matches no rung. The demo consumes the ladder by name in the same register elsewhere:

| site | form |
|---|---|
| `demo/scenes/square/SquareInstrument.vue:153` | `opacity var(--duration-fast, 160ms) var(--ease-standard, ease)` |
| `demo/scenes/square/SquareScene.css:66` | `box-shadow var(--duration-fast, 160ms) var(--ease-standard, ease)` |
| `demo/scenes/spring/SpringHeatmap.vue:328` | `transform var(--duration-fast, 160ms) var(--ease-standard, ease)` |
| **`CubeAxisLines.vue:60-63`** | **`180ms var(--ease-standard, ease)`** |

A global tempo or duration retune reaches every sibling and misses this one.

**Corollary (tree-wide, recorded not claimed):** glass-ui's own motion lever `--motion-weight` (`scheme-motion.css`, zeroed to `0` under PRM) has **zero** consumers anywhere in `demo/`. The design system's reduced-motion multiplier is unused across the whole demo; D-3 is the local instance of that gap.

**Falsifier:** a demo law forbidding duration tokens in scene-target styles, or a rung equal to 180 ms. Neither exists. Weakened slightly by `EasingTarget.css:37-38` also hardcoding (`140ms`) — this is a two-member pattern, not a singleton.

---

### D-6 · MINOR — `z-index: var(--z-behind)` is very likely inert where it is written

`:64-67` carries a six-line rationale ("Reconciles the former orphan raw below-plane value to the z-contract documented in style.css") for one declaration. But `.axis-line` is a child of `.graph`, which is `transform-style: preserve-3d` (`CubeTarget.vue:9` class + glass-ui `base-misc.css`) **and** `perspective: 1200px` (`CubeTarget.css:15`). Children of a preserve-3d parent participate in a 3D rendering context and are composited by **depth sort**, not by CSS painting order; `z-index` survives mainly as a stacking-context trigger. The intended "below the content plane" result is delivered by geometry — the lines sit at local z = 0 (`:79,83,87`), the die's faces at ±`--side-offset` (`CubeTarget.css:86-103`).

So the component pays the design-system-conformance ceremony for a declaration the rendering model largely discards. That the visual is nonetheless right makes this a documentation-and-idiom defect, not a rendering one.

**Falsifier (one edit):** set `.axis-line`'s `z-index` to `999`. If the lines then paint over the die's front face, `z-index` **is** governing and this dies. Complicated by `.axis-line`'s two grouping properties (`opacity: 0.45` at rest, `:53`; the always-on `filter`, D-1), either of which may change how a given engine composites the element — which is exactly why this is MINOR and **UNPROVEN-NEEDS-LIVE**. The rendering outcome is deliberately *not* asserted here; only that the geometry already supplies it.

---

### D-7 · MINOR — the rung it consumes is a duplicate of a vendor token, and T-lane **F3's prescribed fix was never applied — only relocated**

`demo/styles/layout.css:25` declares `--z-behind: -10;` ("the below-plane rung (CubeTarget axis line) … below glass-ui's `--z-content:10`"). glass-ui 7.0.0 already ships `--z-behind: -10` in its own `:root` (`dist/styles/tokens/scheme-motion.css`, beside `--z-background/--z-content/--z-controls/…`) and bridges it to a utility (`dist/styles/theme/bridges.css`: `--z-index-behind: var(--z-behind)`, i.e. a `z-behind` class exists). `style.css:24-25` states the law it breaks: *"There is NO demo-local z-scale; the demo OWNS the ORDER as a documented contract."*

**This is T-lane F3, and it is unfixed.** `keyframes.js/docs/tranches/T/audit/lanes/19-fragile-css.md:168-193` found exactly this and prescribed:

> "**Robust form.** Delete `design-idioms.css:245`'s declaration; `CubeAxisLines.vue:65` already reads `var(--z-behind)`, which resolves the identical value straight from glass-ui's cascade with no demo declaration required."
> Verification: `grep -c -- '--z-behind:' demo/@/styles/*.css   # should drop to 0`

Run today against the post-rename path, `grep -c -- '--z-behind:' demo/styles/*.css` returns **1**, not 0. The declaration migrated `design-idioms.css:245` → `layout.css:25` and survived. F3's drift mechanism is intact: if glass-ui retunes its below-plane rung, this component's rung silently stops matching, and it is the **only** rung on the page that would not follow the vendor automatically.

Secondary drift: three docs (`layout.css:25`, `style.css:27` and `:39`, `demo/DESIGN.md:99`) all describe `--z-behind` as *the cube axis line's* rung, but `demo/scenes/square/SquareScene.css:110` is a second consumer. The token's documented justification is now narrower than its use.

**Falsifier:** glass-ui not shipping `--z-behind` (it does), or shipping a different value (both `-10`), or a cascade-order argument making the re-declaration load-bearing — import order (`style.css:3` glass-ui → layout.css) means layout.css wins, but it wins with an identical value.

---

### D-8 · MINOR — the colour tokens have no dark arm (J-lane STY-8), and this component is the worst-case consumer of that gap

`--axis-x/y/z` are declared exactly once (`demo/styles/style.css:108-111`, light-mode `hsl()` literals) with **no `.dark` override** — repo-wide grep confirms a single declaration site. J-lane already booked it: `docs/tranches/J/audit/styling-design-system.md:128,149` — STY-8, "untested contrast gap".

`CubeAxisLines` is where the gap bites hardest, because T.A2 halved the register underneath it:

> `docs/tranches/T/verdicts/T.A-cube-taste.md:23-25` — "**Was:** `opacity: calc(0.75 + --axis-active·0.25)` … **Now:** `opacity: calc(0.45 + --axis-active·0.55)`" (ratified as landed, `:52`)

So in dark mode the lines render an un-retuned light-mode hue at **45 % alpha** over a dark background. `matrix-editor/MatrixEditor.vue:143-151` consumes the same three tokens at full alpha; this component is the only surface that halves them, and the pairing of the booked gap with the ratified demotion was never re-checked.

**Falsifier:** a `.dark` arm for `--axis-*` anywhere in `demo/styles/` (none), or a measured dark-mode contrast at or above the demo's own legibility floor (`--graph-major-opacity: 11%`, the floor `proof:appearance-suffusion` clause g asserted — `layout.css:33-35`). Contrast outcome **UNPROVEN-NEEDS-LIVE** (SS-13); the token gap and the alpha demotion are both source-proved.

---

### D-9 · MINOR — three purely decorative roots with no `aria-hidden`, against the in-feature precedent

`:10-24` renders three empty presentational `<div>`s and no `aria-hidden="true"`. The same feature's other decorative overlay carries it: `CubeTarget.vue:67-70` — `<span class="face-relit pointer-events-none absolute inset-0" aria-hidden="true">`. The component already declares `pointer-events: none` (`:69`), so this is inconsistency with a sibling that took the same decision, not oversight of the category.

**Falsifier:** an SR/axe pass showing empty `<div>`s contribute no accessible nodes (largely true in practice) — which demotes this to INFO but does not resolve the inconsistency with `CubeTarget.vue:69`.

---

### D-10 · INFO — `@property` registered from a `<style scoped>` block, with dead fallbacks hedging against it in the same file

`:37-41` registers `--axis-active` inside `<style scoped>`. Vue's scoped transform rewrites *selectors*; a selectorless at-rule passes through verbatim, so a leaf sub-component performs a **document-global** registration. Every other registration in the demo lives in a plain stylesheet: `CubeTarget.css:6` (`--lit`), `SequenceTarget.css:14` (`--ball-p`), `design-idioms.css:60` (`--rail-width`). The framing as containment (`:9` "Markup + styles together"; `CubeTarget.css:11-12` "lives in the colocated CubeAxisLines sub-unit") describes an encapsulation the platform does not provide.

The tell that the author hedged: `:53`, `:55`, `:56` all write `var(--axis-active, 0)` — three **dead** fallbacks, because `initial-value: 0` (`:40`) makes `var(--axis-active)` unable to be invalid. Either the registration applies (fallbacks are noise) or it does not (then `transition: --axis-active` at `:62` silently does nothing, since unregistered custom properties do not interpolate). Both readings cannot hold, and the file is written for both.

Mitigating: `CubeTarget.css:11-12` documents the colocation as deliberate, and the name is unique tree-wide (exactly one `@property --axis-active`). INFO, not MINOR.

**Falsifier:** `@vitejs/plugin-vue`'s scoped postcss pass rewriting or dropping `@property` (it does neither — it operates on `Rule` selectors), or a second `@property --axis-active` in the tree (there is one).

---

### D-11 · INFO — a three-root fragment with no attribute contract

`:10-24` gives the component three sibling roots and no `defineOptions({ inheritAttrs: false })` and no explicit `v-bind="$attrs"` target. A multi-root component cannot auto-inherit fallthrough attributes: any consumer writing `<CubeAxisLines class="…">` gets a dev-mode "Extraneous non-props attributes … could not be automatically inherited because component renders fragment or text root nodes" warning, and the class is silently dropped. No consumer does today (`CubeTarget.vue:101` passes `:lock` only), so this is a latent contract gap — but it caps reuse, and the next consumer is already proposed: J-lane C6 (`docs/tranches/J/audit/design/pane-cube.md:27`) wants per-axis `X`/`Y`/`Z` labels on these very elements.

**Falsifier:** the component being explicitly single-use by charter, or a second consumer passing attrs today (grep: `CubeTarget.vue:101` and `:114` are the only references in the tree).

---

### D-12 · INFO — the seam made `OrbitalDrag` publish the same latch twice; one channel has zero consumers

To feed this component, `OrbitalDrag` grew **two** publication paths in the same change (P.W5.S3):

- a scoped-slot prop — `OrbitalDrag.vue:3-7`, `<slot :pressed-keys="pointer.pressedKeys.value">`, whose comment reads "**the axis-lock-reveal egg seam** … **so the cube can light the locked axis line**";
- an emit — `OrbitalDrag.vue:40` (declaration), `:315-321` (the deep-watch emitter).

`CubeAxisLines` is rendered *outside* `<OrbitalDrag>` (`CubeTarget.vue:93` closes it, `:101` renders the lines as its sibling inside `.graph`), so the slot prop is unreachable for the one use case it was added for. Grep across the demo: the slot prop has **zero** consumers; `CubeTarget.vue:15` uses the emit. Dead sibling API surface, authored for this component, still carrying a comment that points at it as the mechanism.

Note the slot prop is also structurally wrong for reactivity — it passes `.value` unwrapped, snapshotting the object into the slot scope.

**Falsifier:** any consumer of `v-slot="{ pressedKeys }"` on `OrbitalDrag`. `grep -rn "pressed-keys\|pressedKeys" demo/` outside `orbital-drag/` returns exactly two lines, both in `CubeTarget.vue` (`:15`, `:156`), both the emit path; `<OrbitalDrag>` has exactly one call site tree-wide.

---

### D-13 · INFO — the canonical axis tuple the sibling exports is ignored; the axis list is unrolled by hand

`orbital-drag/index.ts:6` exports `axes = ["x","y","z"] as const`, consumed by five files (`OrbitalDrag.vue:18`, `useOrbitalInertia.ts:5`, `useOrbitalPointer.ts:5`, `useOrbitalPinch.ts:5`, and their `(typeof axes)[number]` signatures). `CubeAxisLines` — which is *about* those three axes — imports nothing and unrolls them three times in the template (`:10-24`), where one `v-for="axis in axes"` with `:class="['axis-line', axis]"` and `:style="{'--axis-active': lock[axis] ? 1 : 0}"` would do. The three CSS rules (`:77-88`) legitimately stay distinct — each carries a different transform.

Counting the producer's own declaration, the same three-element set is written **four** times across the module. Drift is not hypothetical: `--axis-w` already exists (`style.css:112`) with a live consumer (`MatrixEditor.vue:155`); if a fourth axis ever becomes constrainable, this component renders three lines for four constraints and **`vue-tsc` stays green**, because `{x,y,z}` is a structural subset of any wider latch type.

**Falsifier:** `axes` not exported or not reachable from `demo/scenes/cube/` (it is both), or a gate pinning the marked-up set to `axes` (none — the `proof:*` idiom was retired). Weighted INFO because at three items the unrolled form is arguably more legible; the drift argument, not the duplication, is what keeps it on the list.

---

## 2 · Superlatives (L-18, both directions)

### SUP-1 · Correctly *not* a shadow component, and correctly *not* dogfooding the engine

The demo's law is that its signature animation **is** the library — lane-frontend §S-8 keeps `TypingDots` bespoke precisely because it dogfoods the engine ("the inv-ζ seam"). `CubeAxisLines` imports zero keyframes.js and does the reveal in pure CSS, and that is the *right* call: `CubeTarget.vue:157` states the governing invariant for this egg — "no new rAF, no new gesture machinery (inv ζ): a threshold + a CSS state flip". An engine animation here would add a rAF to satisfy a boolean toggle. On the glass-ui side there is no primitive for 3D axis guides; lane-frontend §5's tally independently files "axis/playhead" under **"Bespoke, no glass counterpart"**. Neither library is under-consumed.

*Extension, not contradiction:* the S-1..S-8 census enumerates shadows of **glass-ui** and has no row-class for a shadow of the **library**. This component is the clean case where that question should be asked and answered *no* — worth a census row precisely because the answer is a defensible no, not an unexamined one. (Also on record and unactioned: J-lane `pane-home.md:47` ABSTRACT-INTO-GLASS-UI proposes moving `--axis-x/y/z/w` + an `.axis-cross` utility *into* glass-ui — so "no counterpart" is a fact about the current vendor build, not about design intent.)

**Falsifier (runs both ways):** a demo law requiring every animated scene surface to drive through `CSSKeyframesAnimation`, or a glass-ui component exposing a 3D-guide primitive. Grepped `glass-ui/dist/components/` — nothing of the kind.

### SUP-2 · The `var()` fallback discipline on foreign tokens is exactly right, and it is F-1-proof

Exactly one token here is foreign — glass-ui's `--ease-standard` (`dist/styles/tokens/scheme-spring.css`, `= var(--motion-ease-standard) = cubic-bezier(.4,0,.2,1)`) — and it is the **only** one written with a fallback: `var(--ease-standard, ease)` ×3 (`:61-63`). The demo-owned tokens — `--axis-x/y/z` (`style.css:109-111`) and `--z-behind` (`layout.css:25`) — are written bare, which is correct for tokens you own.

That distinction is materially valuable under **F-1** (lane-frontend: `@mkbabb/glass-ui` is absent from `package.json` *and* `package-lock.json`, present in `node_modules` by accident of install state). If F-1 ever resolves to a missing glass-ui, this component's reveal degrades to `ease` instead of breaking. Compare files that read the same token **without** a guard: `demo/styles/playback-idiom.css:33-36`, `ControlsPaneWrapper.css:95`.

Caveat, folded from D-10: the *other* three fallbacks in the file (`var(--axis-active, 0)`) are dead. The discipline is right on the foreign token and noise on the owned one.

**Falsifier:** `--ease-standard` turning out to be demo-owned (zero definitions in `demo/`, one in glass-ui), or the demo-owned tokens being undefined (both grep clean).

### SUP-3 · A genuinely zero-coupling contract

1 required prop. 0 emits, 0 slots, 0 `provide`/`inject`, 0 `defineExpose`, 0 template refs, 0 lifecycle hooks, 0 store reads, 0 listeners. The entire `<script setup>` is six lines (`:27-32`), and state ownership stays with `OrbitalDrag` (`useOrbitalPointer.ts:58-60`) — the component is a pure function of a latch someone else holds. `inv ζ` is honoured *literally*, not aspirationally: there is nothing here that could hold a frame loop, and the sub-unit is portable to any scene with an axis latch. This is the correct reading of the "colocated sub-unit" precedent the header cites (`:9`, the SquareInstrument colocation).

That restraint is also why D-2/D-12/D-13 are cheap: widen the prop, consume the already-live slot, `v-for` the tuple, and the whole chain collapses to one binding across three files.

*Scope note:* this superlative is about **coupling count**, not about prop *width* — the width question is contested and lives at D-2. The earlier pass filed the narrow `{x,y,z}` shape itself as the virtue; I have separated the two claims rather than shipping both, because they cannot both be unqualified.

**Falsifier:** any hidden coupling — a global listener, a store import, an injected key, a template ref. There is none; the script block is quoted in full above.

### SUP-4 · The affordance survives motion suppression — a motion-free second tell

`:71-75` gives the locked axis `border-style: solid` against the resting `dashed` (`:46`) — a state change carried by **stroke style, not motion**. Under `prefers-reduced-motion` the vendor override (D-3) strips `filter` and the driver from `transition-property`, so the bloom snaps and the ramp is reduced to a 0.1 s opacity move; the dashed→solid delta arrives on frame 0 regardless and the reveal still reads. That is why D-3 is MINOR rather than a blocker, and it is a deliberate choice the comment names ("a second, motion-free tell"). The registered `@property` (`:37-41`) is likewise the *correct* mechanism for an interpolating custom property — unregistered ones do not transition at all (its redundancy, D-4, is a separate matter from its correctness).

**Falsifier:** the dashed→solid delta being imperceptible at 1 px against the resting 0.45 opacity (`:53`, T.A2's demotion from 0.75). **UNPROVEN-NEEDS-LIVE** for SS-13's visual pass; the mechanism is source-certain.

---

## 3 · Contradictions of the hitherto corpus

### X-1 · `lane-frontend.md` §4 (`:253`) and §6 (`:442`) describe a raw literal the tree does not contain

The census records:
- `:253` — `| 90 | cube/CubeAxisLines.vue | b | axis lines (raw z-index:-10) |`
- `:442` — "One acknowledged exception: `CubeAxisLines.vue`'s raw `z-index:-10`."

The tree at `CubeAxisLines.vue:67` reads `z-index: var(--z-behind);`, with `:64-67` documenting the reconciliation ("Reconciles the former orphan raw below-plane value to the z-contract", W3.S2). **There is no raw `-10` in this component.** The raw literal lived at `cube/CubeTarget.vue:199` in the D era (`docs/tranches/D/audit/brittleness-findings.md:98`, item (c)) and was retired before the R.W6 carve (`f77322b5`). The census appears to have transcribed `demo/styles/style.css:39` — "The one raw `z-index: -10` (CubeTarget axis line) reconciles to `--z-behind` above" — itself stale prose describing a *former* state. Both the census row and the `style.css` sentence should be retired. Suggested replacement row: *"axis lines (`--z-behind` token; duplicate declaration unfixed — T-lane F3)"*.

### X-2 · `lane-frontend.md:442`'s "z-index is single-sourced from glass-ui" over-reads its own data, and this component is the exception

The census states the scale "lives in `glass-ui/dist/styles/tokens.css`; the demo owns only the documented *order*". `demo/styles/layout.css:25` **re-declares a rung value** that glass-ui already ships, contradicting both that sentence and `style.css:24`'s own law. The census's §6 token survey does list `--z-behind` among the demo's singletons, so the data was in hand; the conclusion at `:442` did not act on it. See D-7.

### X-3 · A T-lane finding recorded as prescribed-and-scoped is **unfixed**, and a prior C-axis pass mis-scoped the PRM cascade

Two corrections that a wave planner needs:

1. **T-lane F3 (`19-fragile-css.md:168-193`) is unfixed.** Its prescribed deletion never happened; the declaration relocated `design-idioms.css:245` → `layout.css:25`. Its own verification command still returns 1. Any wave that treats F3 as discharged will skip a live duplicate. (D-7.)
2. **glass-ui's PRM override is universal, not class-scoped.** An earlier pass on this axis concluded these transitions "run at full 180 ms under `prefers-reduced-motion: reduce`" after grepping `demo/styles/`, `dist/styles/transitions.css` and `dist/styles/tokens/scheme-motion.css`. It missed `dist/styles/utilities/a11y-overrides.css`, reachable via `index.css` → `accessibility.css` → `utilities/a11y-overrides.css`, which applies `*:not([data-allow-motion])` with `!important`. The corrected finding is a **split** reveal, not an unsuppressed one. Method note for the lane: glass-ui's style surface is 38 chained `@import`s deep — grepping a subtree is not grepping the cascade. (D-3.)

---

## 4 · value.js transitive exposure — scoped negative, certified

The R1 class (a live `parseCssColor("oklch()")` crash; surface of record `demo/scenes/square/useSquareTumble.ts:22`, `lane-library.md:243`) is **not reachable from this component**. Four independent conditions each close the path:

1. **No imports.** `CubeAxisLines.vue:27-32` is the entire `<script setup>` — no JS executes on its behalf.
2. **Never an animation target.** `useCubeDemo.ts:154-158` binds every engine animation to `cubeEl` / `graphEl`; `CubeTarget.vue:198-217` binds the roll to `cubeEl`. `.axis-line` is never handed to `setTargets`.
3. **No parse call in the scene.** `grep -rn "parseCssColor" demo/scenes/cube/` → empty.
4. **Colour surfaces are UA-evaluated.** `color-mix(in srgb, var(--color) …, transparent)` (`:56`) over `--axis-x/y/z` = space-separated `hsl()` (`style.css:109-111`). Resolved by the browser, never handed to a parser.

Worth recording because the *neighbourhood* is dense with value.js and every edge is a safe subpath: `useCubeRelit.ts:4`, `OrbitalDrag.vue:12`, `quaternionEuler.ts:1` take `clamp` from `@mkbabb/value.js/math`; `useCubeDemo.ts:8` and `matrix-editor/transformMath.ts:1` take types from `/value`; `matrix-editor/useTransformState.ts:1` takes `easeInBounce` from `/easing`. **No `/css` or `/color` import anywhere under `demo/scenes/cube/`.** The cube scene's subpath discipline is exemplary and `CubeAxisLines` sits at the centre of it with no surface at all.

**Falsifier:** any runtime path feeding a computed `--axis-*` value, or an `.axis-line` computed style, into value.js's colour parser.

---

## 5 · Checked and cleared (non-findings, recorded so they are not re-raised)

| candidate | why it is not a defect |
|---|---|
| `width: 1000vw` (`:44`) causing document overflow | `demo/styles/style.css:214-217` sets `html, body { overflow: hidden }` and `EditorShell.vue:3` is `h-dvh max-h-dvh w-dvw overflow-hidden` — two independent clips above the stage. Also resolves the open C-lane worry (`docs/tranches/C/audit/plan-findings.txt:270` records axis-line LR/TB/LT clips in the W0 report with **no AFTER artefact ever produced**): containment is provable statically. Folded into D-1 as a magnitude multiplier only. |
| `filter` collapsing the 3D faces (the T.A1 bug, `CubeTarget.css:148-154`) | `.axis-line` has no descendants; forcing its own used `transform-style` to flat collapses nothing. D-1 is a resident-cost + precept claim, not a collapse claim. |
| `--axis-w` (`style.css:112`) as a phantom token | It has a live consumer — `matrix-editor/MatrixEditor.vue:155`. Not phantom. (It survives only as the drift vector in D-13.) |
| `OrbitalDrag`'s watch never firing → dead egg | `{ deep: true }` at `OrbitalDrag.vue:321`. Seam live. |
| emit-name casing `@pressed-keys` ↔ `emit("pressedKeys")` | Vue normalises kebab↔camel for emits; `CubeTarget.vue:15` binds correctly. |
| emit churn — the deep watch fires on `shift`/`ctrl`/`meta` too (`useOrbitalPointer.ts:62-66`) | `CubeTarget.vue:160-162` writes identical booleans; Vue's `hasChanged` gate means no re-render. Allocation-only. |
| absolute positioning depending on `.graph`'s `perspective` as containing block | `.axis-line` specifies no `top/left/inset`, so only its **static position** is used — the containing block choice is inert here. Claim dropped before filing. |
| `height: 0px` + `border: 1px` rendering a 2 px band (`:45-46`) | Deliberate stroke construction; a taste question for SS-13, not a consumption defect. |
| `--color` as a generic custom-property name (`:46,78,82,86`) | Consistent with the sibling idiom at `MatrixEditor.vue:143-151`. Consistency beats renaming. |
| `transform: rotateX(0deg)` on `.x` (`:79`) being a no-op | Keeps all three lines under the same transformed-element treatment inside the 3D context. Intentional. |
| `calc(var(--axis-active) * 80%)` inside `color-mix()` (`:56`) | Valid — `<number>` × `<percentage>` yields a percentage; registered syntax `"<number>"` (`:38`) guarantees the type. |
| numeric `1`/`0` bound to a custom property (`:13,18,23`) | Vue routes `--`-prefixed names through `style.setProperty` and never appends `px`. Correct. |

---

## 6 · Disposition

**Counts** — defects **13** (0 BLOCKER · 2 MAJOR · 7 MINOR · 4 INFO) · superlatives **4** · corpus contradictions **3**.

Nothing here blocks: the component builds, renders and reads correctly today. Ranked by what a wave should touch first:

1. **D-2** — the only finding where the component tells a user something false. Fix is a prop widening *or* a two-word prose edit; pick one and the contest resolves.
2. **D-1** — the only finding with a standing owner verdict already against it (T.G3 "god awful", T.A1 filter extirpation) and a zero-cost fix already sitting one rule below (`:73-75`).
3. **D-7** — the only finding that is a *regression of a prescribed fix*; cheapest of all (delete one line) and it discharges T-lane F3 for real.
4. **D-3 + D-4** together — one edit (drop `opacity`/`filter` from `transition-property`, keep the driver) fixes the redundancy and makes the reduced-motion reveal coherent, and lets the false comment at `:58-59` be deleted rather than rewritten.
