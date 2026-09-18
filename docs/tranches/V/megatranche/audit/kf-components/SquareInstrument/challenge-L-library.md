claude-opus-5[1m]

# Challenge · `SquareInstrument.vue` · axis **L (LIBRARY)**

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/square/SquareInstrument.vue` (212 lines: 47 template · 39 script · 112 style)
**Mode:** static, read-only. No installs, no dev server, no browser tooling. keyframes.js is READ-ONLY evidence; the only file written by this lane is this one.
**Tree:** keyframes.js working tree as of 2026-08-06. Vue **3.5.35** (`node_modules/vue/package.json`). glass-ui **7.0.0** installed.

**Import graph read whole.** `SquareInstrument.vue` imports exactly one module: `computed` from `vue` (`:60`). It takes no engine handle, no composable, no glass-ui symbol. Its *effective* dependency surface is therefore (a) its props contract with its sole consumer `SquareScene.vue:18–26`, (b) the spring feed behind those props (`useSquareDemo.ts`, `useSquareTumble.ts`, `useSquareKeyboard.ts` read), and (c) the global CSS cascade its 13 utility classes and 6 custom properties resolve against. All three were read.

**Posture:** assumed defective until the tree proved otherwise. Two hypotheses were **killed by evidence** and are recorded as non-findings in §4 so the parent does not re-run them.

| | count |
|---|---|
| defects | **10** (1 BLOCKER · 2 MAJOR · 5 MINOR · 2 INFO) |
| blockers | **1** |
| superlatives | **5** |

---

## 1. BLOCKER

### L-D1 · The tether `<svg>` has **no `viewBox`** — the documented "0..100 user space" does not exist

**Severity: BLOCKER** — the component's raison d'être ("the rubber-band TETHER — spring math made physical", `:4–6`) renders at the wrong origin and ~1/12 the intended scale.

**Provenance.**

```
SquareInstrument.vue:12–17
    <svg
        class="square-tether"
        :class="{ 'square-tether--active': tetherActive }"
        aria-hidden="true"
        preserveAspectRatio="none"
    >
```

No `viewBox` attribute. The script comment asserts one exists:

```
SquareInstrument.vue:78–80
// The SVG user space is 0..100 (preserveAspectRatio="none"); home is the centre (50,50)
// and the box centre deflects by ±TETHER_REACH user units at full travel.
```

and the path is authored entirely in that imagined space (`:84–96`: `hx=50, hy=50`, `bx = 50 + deflX*38`).

**What actually happens.** Per SVG 1.1 §7.7 / SVG2 §8.9, `preserveAspectRatio` *"only applies when a value has been provided for `viewBox` on the same element"* — with no `viewBox` it is an inert attribute. With no `viewBox` the element establishes no new user coordinate system: **one user unit = one CSS px**, origin at the SVG's own top-left. The element is `position:absolute; inset:0; width:100%; height:100%` of `.square-stage` (`:146–151`), so:

- intended home = the stage centre (where `.square-field`'s crosshair is drawn, at `50%/50%` via the `calc(50% ± 0.5px)` gradients, `:110–123`);
- actual home = **`(50px, 50px)` from the stage's top-left corner** — inside, and overlapping, the telemetry strip which sits at `top:1rem; left:1.25rem` (`:172–174`);
- intended full-deflection reach = 38% of stage width. The work area is fluid — `--work-area-max-width: clamp(72rem, 94vw, 160rem)`, `--work-area-max-height: clamp(44rem, 88dvh, 120rem)` (`demo/styles/layout.css:49–51`) — so on a ~1200px-wide stage that is ~456px. **Actual reach = 38px.**

`viewBox` is not settable from CSS in any shipping engine (it is an SVG2 geometry-property proposal, unimplemented), and nothing else in the tree sets it — `grep -rn "viewBox"` over `demo/scenes/` returns only `EasingTarget.vue:97` and `SpringTrace.vue:18`. **The sibling instrument SVG in this same demo does it correctly** (`SpringTrace.vue:18` `viewBox="0 0 100 60"`), which is the house idiom this file departs from. `git log -S 'viewBox' -- demo/scenes/square/SquareInstrument.vue` → **empty**: the attribute was never present, in any revision, since the file was created at `5bf99ca7`.

**Corroborating dead attributes** (both are exactly what a missing `viewBox` predicts): `preserveAspectRatio="none"` (`:16`) is inert, and `vector-effect: non-scaling-stroke` (`:165`) is a no-op because there is no scale to cancel. Note the visual consequence is *misplacement*, not invisibility: `stroke-width: 0.8` (`:162`) plus `non-scaling-stroke` yields a 0.8px hairline **with or without** the `viewBox`, so the line is drawn — just in the corner, 12× too short, on top of the telemetry text.

**Test coverage: none.** `grep -rn "square-tether\|square-telemetry\|square-field"` across every `.ts`/`.spec.ts` outside `demo/scenes/` → zero hits. No gate would have caught this.

**Falsifier.** Any of: (a) a `viewBox` reaching the element by a mechanism not found here — a build/compiler transform, an ancestor `<svg>`, a runtime attribute write; (b) a browser that establishes a 0..100 user space in the absence of `viewBox` (contradicts the spec); (c) a stage authored at exactly 100×100 CSS px, which would make user-units and percent coincide — falsified by `layout.css:49–51` above. **The precise on-screen pixel result is UNPROVEN-NEEDS-LIVE (SS-13)**; the coordinate-system claim itself is spec-derivable and stands without a browser.

**Fix shape (one attribute):** `viewBox="0 0 100 100"` on `:12`. That alone makes `preserveAspectRatio="none"` meaningful and the authored path correct — but see L-D2, which the `viewBox` alone does not cure.

---

## 2. MAJOR

### L-D2 · `TETHER_REACH` is a *relative* constant duplicating an *absolute* one — the tether cannot terminate at the box centre on any real stage

**Severity: MAJOR** (independent of L-D1; survives the `viewBox` fix).

**Provenance.**

```
SquareInstrument.vue:82   const TETHER_REACH = 38;              // user units (→ % of stage, under a 0..100 viewBox)
SquareInstrument.vue:86-87 const bx = 50 + props.deflX * TETHER_REACH;
useSquareDemo.ts:64        const TRAVEL = 110;                   // px — "How far (px) a full [-1,1] spring deflection translates the box"
useSquareDemo.ts:203-204   x: springX.value * TRAVEL,            // the box's actual painted translate
```

The component's contract comment (`:79–80`) promises the path terminates at *"the box centre"*. The box centre moves `deflX × 110 **px**`. The path endpoint moves `deflX × 38 **percent of stage width**`. There is no coupling between the two constants — no shared token, no prop, no CSS var, no comment cross-reference. They coincide only when stage width = `110 / 0.38 ≈ 289px` **and** stage height = 289px.

`preserveAspectRatio="none"` makes this strictly worse once L-D1 is fixed: it stretches the user space independently per axis, so on a non-square stage the x-reach and y-reach scale by *different* factors while the box translates by the same 110px on both — the tether detaches from the box asymmetrically. The stage is fluid and never square (`layout.css:49–51`; `.square-stage` is `grid h-full w-full`, `SquareScene.vue:12`).

This is the classic magic-number-duplication defect: the same physical quantity encoded twice, in two units, in two files, with the drift silent.

**Falsifier.** (a) The stage is in fact pinned to a fixed square ≈289px by a rule not found in `layout.css` / `SquareScene.css` / the Card's own styles; (b) the comment at `:79–80` does not actually claim box-centre termination (it does — quoted verbatim); (c) `38` is deliberately a *decorative* fraction and the "box centre" language is loose — plausible as intent, but then the comment is the defect and the design still wants the two constants coupled.

**Fix shape:** derive the reach from the real quantity — e.g. have `SquareScene` pass `travel` (it already holds it, `SquareScene.vue:132`) and resolve the reach against the measured stage box, or drop `preserveAspectRatio="none"` and express the endpoint in the same px space the box uses.

---

### L-D3 · The props contract models only **one** of the scene's **two** paint authorities — the "Transform" telemetry lies during `playback`

**Severity: MAJOR** — the strip is titled `Transform` (`:22`) and is the scene's only numeric readout.

**Provenance.** The scene is an explicit three-state single-authority FSM (`SquareScene.vue:113–114`): `idle | drag | playback`. Two writers paint the box, never simultaneously (`useSquareDemo.ts:34–39`):

1. the **spring loop** (`useSquareDemo.ts:164–252`), and
2. the **engine's four-corner tour** (`useSquareDemo.ts:343–371`, ±90px diamond) driven by `animationGroup.play()`.

The instrument is fed **only from (1)**. `onTick` is invoked exclusively inside `frame()` (`useSquareDemo.ts:243–247`), and `frame()` is the `useSweepScene` loop that **self-terminates the moment every spring settles** (`useSquareDemo.ts:239, 251` — `return live`). Play does not call `startLoop()`; only `reseat`/`settle`/`tumble` do (`:272–290`, `:158–159`).

Consequence, derived from the control flow:

- Press Play from rest → the group tours the box through ±90px, 360° rotation and a rainbow sweep, while the spring loop is idle → `onTick` never fires → `deflX/deflY` hold `0` (last written by `paintRest`, `useSquareDemo.ts:377–385`) and `settled` holds `true`.
- The visible result: `Transform · x 0.00 · y 0.00 · [settled]` while the box is visibly mid-diamond.
- After a drag that persisted at, say, `(0.80, −0.30)` (`releasePolicy: "persist"`, `SquareScene.vue:258`), pressing Play leaves the strip frozen at `0.80 / −0.30` — a **stale** pose that is now nowhere near the box.

The component's own header comment (`:8–9`) — *"All are DERIVED READS of the spring state SquareScene feeds as props"* — is technically true and is precisely the bug: the props model the *springs*, but the strip is labelled with the *transform*. The scene's headline T.A13 achievement ("Play now drives the box's honest four-corner tour", `:37–39`) is the exact mode in which the instrument goes silent.

**Falsifier.** (a) Some path re-arms the spring loop during playback that this reading missed — falsified by `grep -n "startLoop"` in `useSquareDemo.ts`: called only at `:159` (tumble), `:275` (reseat), `:289` (settle), and by `useSweepScene`'s own transport; `animationGroup.play()` is never routed through it. (b) The telemetry is *specified* to report springs only, and `settled` is *specified* to mean "springs at rest" — then the defect degrades to a labelling defect (the title `Transform` and the bare `x`/`y` captions promise more than the props deliver), still MAJOR-adjacent, not zero. (c) A live run showing the strip tracking the tour would kill it outright — **UNPROVEN-NEEDS-LIVE** on the visual, CONFIRMED on the control flow.

---

## 3. MINOR / INFO

### L-D4 · Dead, duplicated PRM rule in the parent — `SquareScene.css:136–139` can never match (MINOR)

`SquareScene.vue:331` loads `SquareScene.css` as a **scoped** block (`<style scoped src="./SquareScene.css">`), so every selector in it is compiled with `SquareScene`'s `data-v-*` id. It contains:

```
SquareScene.css:136-139
@media (prefers-reduced-motion: reduce) {
    .square-tether { transition: none; }
```

`.square-tether` is rendered by `SquareInstrument`, which is a **4-root fragment component** (`:10`, `:12`, `:21`, `:35` — `div.square-field`, `svg.square-tether`, `div.square-telemetry`, `div.square-legend`). Vue 3.5.35 propagates the parent's scope id to a child's root **only when that root is the single subtree root**:

```
node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:5665-5679
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (subTree.patchFlag > 0 && subTree.patchFlag & 2048) {
        subTree = filterSingleRoot(subTree.children) || subTree;
      }
      if (vnode === subTree || ...) { /* apply parent scopeId */ }
```

With four element roots, `filterSingleRoot` returns `undefined`, `subTree` stays the Fragment, and no child vnode equals it — **no parent scope id is applied to any of the four roots**. The rule is unreachable.

It is also **redundant**: the live copy is colocated correctly at `SquareInstrument.vue:207–211`, identical in effect. This is leftover from the colocation move that `SquareScene.css:8–10` narrates ("The instrument layer … is styled inside the colocated SquareInstrument sub-unit") — the markup and the styles moved; this one rule did not.

**Falsifier.** (a) `SquareInstrument` is actually single-root — falsified by reading `:10–56`; (b) the `src`-loaded block is unscoped — falsified by the literal `scoped` attribute at `SquareScene.vue:331`; (c) a Vue version whose fragment roots do inherit the parent scope id — falsified against the installed 3.5.35 source above.

*(Only one rule in `SquareScene.css` targets the instrument layer; the rest — `.square-stage`, `.sr-only-slider`, `.demo-box*` — all land on `SquareScene`'s own markup and are fine. No further dead rules.)*

---

### L-D5 · Readout and tether display **different quantities** under the same `x` / `y` labels (MINOR)

The telemetry numerals are the spring **target**:

```
SquareScene.vue:266-267 / 279-280   springReadout.x = springX.target.toFixed(2);
```

The tether is the spring **value**:

```
useSquareDemo.ts:244-245   onTick?.({ x: springX.value, y: springY.value, ... })
SquareScene.vue:144-145    deflX.value = x; deflY.value = y;
```

Both are rendered side by side under bare `x` / `y` captions (`SquareInstrument.vue:24–27`) with no commanded-vs-actual distinction. During any chase the numerals snap to the commanded target while the tether and box are still en route — the two halves of one instrument disagree. The `tracking` badge (`:31–32`) partially discloses this, but does not distinguish *which* number is which.

**Falsifier.** A design record stating the readout is deliberately the *commanded* value (the `aria-valuenow` path is consistently target-based — `SquareScene.vue:193–195` — which is weak evidence *for* that intent). If so this is a labelling gap, not a data defect, and drops to INFO.

---

### L-D6 · Per-frame Vue re-render on the paint hot path, against the scene's own established idiom (MINOR)

`deflX`/`deflY` are `ref`s written at loop cadence (`SquareScene.vue:144–145` from `onTick`, ~60 Hz while a spring is live). Each write invalidates `tetherPath` (`:83–97`), which re-runs `Math.hypot`, three `toFixed(2)` allocations and a template literal, then patches the `d` attribute — i.e. a full component re-render every frame the springs move.

The in-repo alternative is not hypothetical: **this exact scene already writes frame-cadence values straight to the element**, bypassing Vue —

```
useSquareDemo.ts:133   el.style.setProperty("--spring-tilt",   `${Math.hypot(skewX, skewY).toFixed(3)}`);
useSquareDemo.ts:136   el.style.setProperty("--spring-squash", `${(Math.abs(sx-1)+Math.abs(sy-1)).toFixed(4)}`);
```

and `SquareScene.vue:185–186` explicitly states the design law the instrument sidesteps: *"no per-frame Vue work on the hot path — read on demand from the markRaw springs"*. That law was applied to `springReadout` and then not applied to the tether. The demo also ships a shared `composables/useThrottledReadout.ts` seam for precisely this class of value, unused here.

**Falsifier.** A measurement showing the per-frame re-render is free relative to the paint budget (plausible — this is a 4-root, ~12-node component), or a ruling that the "no hot-path Vue work" comment scopes only to the aria readout. Either drops this to INFO. It is filed MINOR because the *inconsistency inside one scene* is the defect, not the absolute cost.

---

### L-D7 · Both gesture-discovery hints are inside `aria-hidden="true"` and named nowhere else (MINOR)

All four roots carry `aria-hidden="true"` (`:10, 13, 21, 35`) — correct for the field, tether and telemetry, since `SquareScene`'s two `sr-only` axis sliders (`SquareScene.vue:55–74`) carry the real WCAG 4.1.2 contract and a duplicate announcement would be worse. But the legend also hosts the **only** disclosure of two keyboard/pointer affordances:

```
SquareInstrument.vue:46-48   "double-click to tumble"
SquareInstrument.vue:52-55   "press C to trace the field"
```

The box's `aria-label` (`SquareScene.vue:51`) reads *"Drag the box across two axes — a spring chases each axis"* and names neither. The `C` egg is a pure keyboard interaction (`useSquareKeyboard`, wired at `SquareScene.vue:300`) that a screen-reader user has no path to discover.

**Falsifier.** The hints are surfaced elsewhere for AT — e.g. a global shortcuts modal enumerating `C` (`KeyboardShortcutsModal.vue` exists and consumes `useRegisteredShortcuts`); if the square's `C` is registered there, this drops to INFO. Not verified in this lane — the registration site is outside the target's import graph. Cross-axis: primarily an A-axis concern, filed here because it is a props/contract consequence of the `aria-hidden` choice.

---

### L-D8 · Inconsistent token-fallback discipline inside one 112-line style block (MINOR)

Two custom properties are consumed defensively, six are not, in the same file:

| with fallback | `:153` | `var(--duration-fast, 160ms)`, `var(--ease-standard, ease)` |
| without | `:113, 114, 119, 120, 132, 137` | `var(--border)` |
| | `:161` | `var(--color-progress)` |
| | `:179, 201` | `var(--z-content)` |
| | `:183` | `var(--foreground)` |

Provenance of each: `--color-progress` is demo-owned (`demo/styles/style.css:163`); `--border`, `--foreground`, `--z-content`, `--duration-fast`, `--ease-standard` are **all glass-ui-owned** (`node_modules/@mkbabb/glass-ui/dist/styles/theme/bridges.css`, `.../tokens/scheme-motion.css`). The two that *got* fallbacks are glass-ui's; four other glass-ui tokens did not. `z-index: var(--z-content)` (`:179, :201`) is the sharpest: an unresolved `--z-content` makes the declaration invalid-at-computed-value-time, dropping the telemetry and legend out of their stacking rung rather than degrading gracefully.

**Falsifier.** A project rule that fallbacks are forbidden (would make `:153` the defect instead — still an inconsistency), or a guarantee that the glass cascade is always present (see L-D9: that guarantee is exactly what F-1 voids).

---

### L-D9 · Census refinement — this file is `b`/"no glass-ui" in the import graph and **wholly glass-ui-dependent** in the cascade (INFO)

`lane-frontend.md` §4 lists `212 | scenes/square/SquareInstrument.vue | b | square instrument panel` — i.e. counted among the "21 `.vue` with no glass-ui import" (§3). **True of the import graph, false of the render.** Every typography class the component renders resolves through glass-ui:

| class (site) | glass-ui mechanism |
|---|---|
| `text-display` (`:22`) | `@theme inline { --text-display: var(--type-display-1) }` — `dist/styles/theme/bridges.css` |
| `text-caption` (`:41, 47, 54`) | `@theme inline { --text-caption: var(--type-caption) }` — same file |
| `text-admin-label` (`:30`) | `@theme inline { --text-admin-label: var(--type-admin-label) }` — same file |
| `text-mono-small` (`:24, 25, 26, 27`) | `@utility text-mono-small` — `dist/styles/typography/utilities.css` |
| `text-mono-caption` (`:44`) | `@utility text-mono-caption` — same file |

plus four of its six custom properties (L-D8). Only `.readout-accent` (`design-idioms.css:190`), `.status-badge`/`.settled-badge`/`.tracking-badge` (`design-idioms.css:218, 230, 234`) and `--color-progress` are demo-owned.

**This is the precise site where F-1 bites a component the census scored clean.** Under `npm ci` — which reconstructs `node_modules` from a lockfile containing **zero** glass-ui entries (lane-frontend.md F-1) — `demo/styles/style.css:3` `@import "@mkbabb/glass-ui/styles"` cannot resolve, and this "glass-free" component loses its entire type scale, its hairline colour, its motion tokens and its z-rung. The `G`/`b` binary in the census roster should be read as *import-boundary* only; a cascade-level column would score this file `G`.

**Falsifier.** A `.text-mono-small` / `.text-display` definition in the demo's own CSS — searched and absent (`grep -rn` over `demo/styles/*.css` and every `.vue` `<style>` block; `style.css:263–274` only *overrides* `font-weight`/`letter-spacing` on the display rungs inside `@layer demo-typography`, which presupposes glass-ui defines them). Or a build that vendors glass-ui's CSS — none found.

---

### L-D10 · Duplicated adjacent `v-if` spans (INFO)

`:46–48` and `:52–55` are two spans with the identical guard `v-if="tumbleHintShown"` and the identical class set `text-caption text-muted-foreground square-legend-hint`, differing only in text content. One `<template v-if="tumbleHintShown">` wrapping both removes a duplicated condition and one duplicated class string. Cosmetic; zero behavioural difference.

**Falsifier.** A staged disclosure where the two hints are meant to diverge later — nothing in the tree suggests it; both are gated by the same single ref written once (`SquareScene.vue:149–151`).

---

## 4. Hypotheses **killed by the tree** (do not re-run)

1. **"`text-mono-small` / `text-mono-caption` are no-op classes with no backing definition."** Killed. They are not `--text-*` theme entries (absent from `bridges.css`) but they *are* declared as Tailwind v4 custom utilities: `grep -o "@utility [a-z0-9-]*" dist/styles/typography/utilities.css` → includes `text-mono-small`, `text-mono-caption`, and `dist/styles/index.css` imports `./typography.css`, which reaches them. The classes resolve.
2. **"The component leaks — an unremoved listener/observer/rAF."** Killed. The whole script is `defineProps` + one `computed` (`:60–97`). No `onMounted`, no `watch`, no listener, no timer, no `ResizeObserver`, no rAF, no engine handle, no `markRaw`, nothing requiring teardown. Confirmed by reading the file whole — see superlative S-1.

---

## 5. Superlatives (L-18, running the other way)

### S-1 · Structurally leak-proof by construction — **exemplary**
The entire script block is a props declaration and one pure `computed` (`:59–98`). There is nothing to tear down, so there is no teardown to get wrong. In a demo tree where the sibling composable must hand-roll `onScopeDispose(dispose)` with a four-line justification of why the host cannot be trusted to call it (`useSquareDemo.ts:393–401`), a leaf that *cannot* leak is the right shape.
*Falsifier: any resource acquisition in the file — none exists.*

### S-2 · Correct single-authority discipline — the anti-rAF law honoured exactly
The component opens no second animation loop and holds no writable handle on the springs. It reads spring state only through props fed by the *one* existing loop (`:8–9`; the feed contract at `useSquareDemo.ts:51–55`). Given a scene with two paint authorities already in tension, an instrument layer that adds a third would have been the easy mistake; it does not. (L-D6 is a Vue-reactivity-cost note *within* this correct topology, not a breach of it; L-D3 is a gap in what the one feed covers, not a second writer.)
*Falsifier: any direct DOM write, engine import, or `requestAnimationFrame` in the file — none.*

### S-3 · The degenerate-geometry guard at `:92`
```
const len = Math.hypot(dx, dy) || 1;
```
At rest `dx = dy = 0`, and the perpendicular-bow normalisation at `:94–95` would produce `NaN` coordinates and an invalid `d`. The `|| 1` handles it branchlessly, and the resulting control point collapses onto the (degenerate) midpoint — correct, not merely non-crashing. `bow = Math.min(len * 0.18, 8)` (`:93`) similarly caps the slingshot instead of letting it grow unbounded. Small, deliberate numerical care.
*Falsifier: an input where `len` is `NaN` rather than `0` — impossible, since `deflX/deflY` originate from `SpringProgress.value` and a `NaN` there would have broken the box's transform first.*

### S-4 · Colocation done right — and cited as precedent elsewhere in the tree
Markup and styles for the instrument layer live together in one 212-line SFC; the parent CSS explicitly hands the surface over (`SquareScene.css:8–10`) rather than reaching across. The split is Goldilocks: 47 template / 39 script / 112 style, one job, one consumer (`grep -rn "SquareInstrument"` → the sole render site is `SquareScene.vue:18`). The pattern is load-bearing enough that a later component names it: `CubeAxisLines.vue:9` — *"Markup + styles together (the SquareInstrument colocation precedent)."*
*Falsifier: a second consumer, or instrument styles still living in the parent — the latter is exactly L-D4, which is one stale 4-line rule, not a failed migration.*

### S-5 · Local `prefers-reduced-motion` guard rather than delegated
`:207–211` snaps the tether's fade off in-file, and the geometry is deliberately left untouched (`:81` — *"PRM snaps the FADE off in CSS; the geometry is unchanged"*). This is the correct PRM posture (suppress the decorative transition, preserve the information) and it is owned locally rather than deferred upward — contrast the two files the census flags as PRM-by-prose-only (`TypingDots.vue:121`, `KeyframeTimeline.vue:94`, lane-frontend.md §6.5).
*Falsifier: the guard being unreachable — it is not; the rule sits in the component's own scoped block and matches its own roots. (The parent's copy is the unreachable one — L-D4.)*

---

## 6. Corpus reconciliation

| hitherto id | this lane |
|---|---|
| **F-1** (glass-ui phantom dependency, RED) | **Extended, not repeated.** L-D9 identifies the specific bite radius on a component the census scored as glass-free. |
| **lane-frontend.md §4 roster row** (`212 \| scenes/square/SquareInstrument.vue \| b`) | **Contradicted at the cascade layer.** Line count and import-graph classification are correct; the `b` label understates the coupling (L-D9). |
| **§6.5 PRM census** (lists `scenes/square/SquareInstrument.vue:207` among the 10 CSS guard sites) | **Confirmed and refined.** The guard at `:207` is live; the census does not list `SquareScene.css:136` as a *duplicate* of it, and that duplicate is dead (L-D4). |
| **§5 shadow census S-1..S-8** | **No overlap.** SquareInstrument is not a glass-ui shadow: no glass-ui primitive covers a bespoke SVG spring tether over a coordinate field. It belongs to the "bespoke, no glass counterpart" bucket, correctly. |
| **lane-library.md** (parse seams) | **No overlap.** This component performs no parsing; the `parseCssScalar` seam is one level up in `useSquareDemo.ts:78–90`. |

## 7. Referred out of scope (for the `SquareScene` / `useSquareDemo` challenges — **not counted above**)

- `useSquareDemo.ts:387–391` — `dispose()` calls `springX.dispose()` and `springY.dispose()` but **not** `springSpin.dispose()` (the tumble-egg spring from `useSquareTumble`). Verify whether `useSquareTumble` self-disposes; if not, it is a teardown gap in the composable, not in this component.
- The L-D3 feed gap is fixed in `SquareScene`/`useSquareDemo` (the instrument cannot fix it from the leaf), so it will need a row in that challenge too.

---

*Read-only lane. Files read: `SquareInstrument.vue`, `SquareScene.vue`, `SquareScene.css`, `useSquareDemo.ts`, `demo/styles/style.css`, `demo/styles/layout.css`, `demo/app/scene/scenes.ts`, `node_modules/@mkbabb/glass-ui/dist/styles/{index.css,theme/bridges.css,typography/utilities.css}`, `node_modules/@vue/runtime-core/dist/runtime-core.cjs.js`, plus greps over `demo/` and `node_modules/@mkbabb/glass-ui/dist/`. No file in keyframes.js or glass-ui was written, mutated, installed, or executed. No browser was opened.*
