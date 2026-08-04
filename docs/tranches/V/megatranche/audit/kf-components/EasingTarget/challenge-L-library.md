claude-opus-5[1m]

# Challenge · `EasingTarget.vue` · axis **L (LIBRARY)**

**Subject** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/easing/EasingTarget.vue` (335 L) + `EasingTarget.css` (193 L)
**Mode** static, read-only. No browser tooling. Node was used only to *execute the shipped `@mkbabb/value.js@4.0.0` easing/css/math dist* as read-only evidence (every numeric claim below) — no product source was touched in any repo; this file is the single write.
**Date** 2026-08-04 (rev 2). **Substrate** keyframes.js `master` at the 2026-08-03 census tree (`8281638c`); glass-ui **7.0.0 installed / undeclared**.
**Posture** the component was assumed DEFECTIVE until the tree proved otherwise. Every claim carries its own falsifier; §7 lists hypotheses that were *killed*, so a reader can see which did not survive.

> **Revision note.** This document supersedes rev 1 at the same path and is a **superset** of it: rev 1's `D-1..D-15` / `P-1..P-6` are carried forward with their ids intact so the corpus stays citable. Six findings are new (`D-16..D-21`, `P-7..P-9`); three inherited entries are **re-graded on new evidence** (D-2 ↑, D-3 ↓, D-12 extended); two inherited claims are **corrected** (P-1's register-paint clause, P-3's uniqueness claim); one rev-1 arithmetic slip is fixed (D-2's "25 of 28" → **23**); and rev 1's two self-declared *unchecked* falsifier arms (CI out-of-band install; a global rejection handler) are now **closed** with probes. Every change is marked ▲.

---

## 0. Verdict

| | count |
|---|---|
| BLOCKER | **2** |
| MAJOR | 4 |
| MINOR | 11 |
| INFO | 4 |
| **defects total** | **21** |
| **superlatives** | **9** |
| hypotheses killed | 11 |

**Headline.** The hot path is *exemplary* — the shared-clock / snapshot-painter / IO-gate architecture (P-1, P-2) is the best direct-DOM discipline in the demo tree and should be the reference other scenes are held to. The defects are almost entirely in the **derived-data layer** and in the **vendor seam**:

1. the header literal — the thing a `CopyButton` hands the user — is a re-implementation of `useEasingDemo.cssValue` whose **pasted result reproduces a different curve than the tile paints and the engine plays, for 18 of 28 specimens, by up to 0.158 of the value range** (D-2, ▲ re-graded to BLOCKER on new end-to-end evidence);
2. the whole scene rests on an **undeclared, unlocked** `@mkbabb/glass-ui`, exposed here on four import specifiers (D-1) — and the installed 7.0.0 ships `glass-chip.css` **orphaned from its own style graph**, so the selected-state wash this component's CSS documents *does not exist in the artifact* (D-16, ▲ new);
3. the component's own selection invariant — *"a curve is always selected"* — is **false** on the sidebar's primary authoring path (D-17, ▲ new);
4. and **nothing tests any of it** (D-18, ▲ new): easing is the only scene with tested siblings and no scene test, and D-2 dies to a five-line assertion.

---

## 1. What the component actually is

A specimen gallery. `EASING_GROUPS` minus the `Custom` family → **28 tiles** (Standard 5 · Sine 3 · Quad 3 · Cubic 4 · Expo 3 · Circ 3 · Back 3 · Bounce 1 · Steps 3). Each tile = a cached static SVG sparkline + a hairline rail + a 14 px ball driven by **one shared phase** through `demo.registerDotPainter`. A header promotes the selected curve's name + its "COMPLETE re-parseable literal" with a copy affordance. A `ToggleGroup` filters by family.

Import surface, read in full:

```
vue · @vueuse/core{useMediaQuery,useResizeObserver}
@mkbabb/glass-ui{Card} · /fading-scroll{FadingScroll} · /chip{Chip} · /toggle-group{ToggleGroup,ToggleGroupItem}
@mkbabb/value.js/math{cubicBezierToString}
@mkbabb/keyframes.js{type TimingFunction}                     → src/animation/constants/types.ts:45
@components/CopyButton.vue
@utils/reference-data/timingCurveUtils{getCurvePath,namedEasing,steppedEasing}
@utils/reference-data/easingGroups{EASING_GROUPS}             → animationDescriptions{NAMED_EASING_BEZIER,DETAIL_TIMING_FUNCTIONS}
./easingKeys{EASING_DEMO_KEY}                                 → ./useEasingDemo (the injected context)
./EasingTarget.css                                            → demo/styles/design-idioms.css{.progress-rail,.progress-ball}
```

---

## 2. BLOCKER

### D-1 · `@mkbabb/glass-ui` is a phantom dependency and this file is its widest exposure — **BLOCKER**

`EasingTarget.vue:136-139` imports **four** specifiers across the glass-ui root plus three subpaths:

```ts
import { Card } from "@mkbabb/glass-ui";                                      // :136
import { FadingScroll } from "@mkbabb/glass-ui/fading-scroll";                // :137
import { Chip } from "@mkbabb/glass-ui/chip";                                 // :138
import { ToggleGroup, ToggleGroupItem } from "@mkbabb/glass-ui/toggle-group"; // :139
```

Measured, this tree, today:

```
$ grep -c '"@mkbabb/value.js"' package-lock.json   → 3      (declared: package.json dependencies, "4.0.0")
$ grep -c 'glass-ui'          package-lock.json    → 0
$ grep -c 'glass-ui'          package.json         → 0      (neither dependencies nor devDependencies)
$ node -p "require('./node_modules/@mkbabb/glass-ui/package.json').version"  → 7.0.0
```

`vite.config.ts:36-59` aliases exactly ten specifiers (`@src`, `@mkbabb/keyframes.js`, `@styles`, `@state`, `@components`, `@utils`, `@kf-engine`, `@composables`, `@app`, `@assets`) — **glass-ui is not among them** — and `vite.config.ts:29` states the expectation explicitly: *"glass-ui consumed from the registry (not a workspace link)"*. There is no registry record of it. A clean `npm ci` therefore produces a tree in which `npm run gh-pages` cannot resolve line 136, and the easing scene is the first thing to fail.

This component is also the **sole demo consumer** of two of the 21 reached subpaths — `/fading-scroll` and `/toggle-group` (census §3.1, 1 hit each) — so the exposure is not merely wide, it is exclusive.

**Folds census F-1** (`lane-frontend.md` §0, RED) and confirms it by lockfile *count* rather than by absence-of-mention; the census recorded the fact repo-wide, this fixes the blast radius on the component: 4 specifiers here, 3 more through the sibling sidebar (`EasingSidebar.vue:70,71,76`).

**Falsifier.** Any of: a `@mkbabb/glass-ui` entry in `package.json`/`package-lock.json`; a `resolve.alias`/`optimizeDeps`/`external` entry; a workspace protocol; or a CI step installing it out-of-band. ▲ **Rev 1 named the `.github/` arm UNCHECKED — it is now closed:**

```
$ grep -rn "glass" .github/       → 2 hits, both the prose "break-glass path"
                                    (ci.yml:52, deploy-pages.yml:5). No install step.
$ ls .github/workflows/           → ci.yml  deploy-pages.yml  release.yml
```

No out-of-band install exists. **D-1 stands at BLOCKER.**

**Attribution note.** The *cause* is repo-level (a manifest omission); the *component* is the exposure surface, not the author of the defect. It is filed here because axis L asks where the phantom-dep exposure bites this file, and D-16 is the second, deeper bite.

---

### D-2 · The header literal is a divergent fork of `cssValue`; **18 of 28** tiles copy a curve that is not the one on screen — ▲ **re-graded MAJOR → BLOCKER**

Two computations of "the literal" exist in the same scene, and they are not the same function.

`useEasingDemo.ts:93-104` — the **engine-facing** twin, fed to `previewAnim.setTimingFunction` (`:308-315`):

```ts
const cssValue = computed(() => {
    const name = currentEasingName.value;
    if (name === "cubic-bezier") return cubicBezierToString(...bezierControlPoints.value);
    if (name === "steps")        return `steps(${…}, ${…})`;
    return name;                              // ← a named curve → THE NAME
});
```

`EasingTarget.vue:209-220` — the **human-facing** twin, rendered at `:32-34` and handed verbatim to `CopyButton :text` at `:37`:

```ts
const literal = computed<string>(() => {
    const name = demo.currentEasingName.value;
    if (name === "steps") return `steps(${…}, ${…})`;
    if (demo.isBezierEditable.value)                       // ← the divergent branch
        return cubicBezierToString(...demo.bezierControlPoints.value);
    // An engine-named curve (ease-in-out-sine, ease-in-bounce, step-start …):
    // the name IS the literal — value.js round-trips it by registry lookup.
    return name;
});
```

`isBezierEditable` (`useEasingDemo.ts:73-76`) is `name === "cubic-bezier" || name in NAMED_EASING_BEZIER`, and `NAMED_EASING_BEZIER` (`animationDescriptions.ts:16-49`) contains **23 of the 28 tile names** ▲ *(rev 1 said 25; the five absentees are `smooth-step-3`, `ease-in-bounce`, `steps`, `step-start`, `step-end` — 23 + 5 = 28)*. So the `return name` line is reachable for four curves only, and **the comment's own first example, `ease-in-out-sine`, can never reach the line it annotates.**

Two independent mechanisms then corrupt the output:

**(a) value.js resolves 7 of those names to a closed-form function, not to the table's bezier.** `easing()` consults its frozen function map **first** (`dist/subpaths/easing.js`: `function x(n){ if(Object.hasOwn(_,n)) return e(_[n]); if(!(n in d)) …; }`), and `_` holds `ease-out-cubic`, `ease-in-out-sine`, `ease-in-out-cubic`, `ease-in-out-quad`, `ease-in-out-expo`, `ease-in-out-circ`, `ease-out-expo`, `smooth-step-3`, `ease-in-bounce`, `linear`. The tile's ball (`:175-178` → `namedEasing` → `easing(name)`), the sparkline (`timingCurveUtils.ts:85`) **and the engine** all run those closed forms — the engine because `previewAnim.setTimingFunction(cssValue)` → kf `resolveTimingFunction` → `parseTimingFunction("ease-in-out-circ")` **fails** (probed) → registry hit → `easing("ease-in-out-circ")` → the same closed form (`compile/easing/easing-registry.ts:38-47,118-131`). **Only the printed literal dissents.**

**(b) `cubicBezierToString` rounds to 2 decimals** — `toFixed(2)`, the single occurrence in `dist/subpaths/math.js`; template `cubic-bezier(${i(e)}, ${i(t)}, ${i(n)}, ${i(r)})`. This corrupts 15 tiles independently of (a) — see D-15, which rev 1 filed separately and which is now shown to *compound*.

▲ **New measurement — end-to-end, the user's actual round trip.** Rev 1 measured *true fn vs. table quad* (7 divergent). The honest question is *true fn vs. the literal the button copies, re-parsed*: printed literal → `parseTimingFunction` → `CubicBezier` → sample against the painted fn, 2001 samples over t ∈ [0,1]:

| tile | printed literal | max Δ painted↔pasted | cause |
|---|---|--:|---|
| `ease-in-out-circ` | `cubic-bezier(0.79, 0.14, 0.15, 0.86)` | **0.1576** | (a)+(b) |
| `ease-in-out-expo` | `cubic-bezier(1.00, 0.00, 0.00, 1.00)` | **0.1339** | (a) |
| `ease-out-expo` | `cubic-bezier(0.19, 1.00, 0.22, 1.00)` | 0.0370 | (a) |
| `ease-out-cubic` | `cubic-bezier(0.21, 0.61, 0.35, 1.00)` | 0.0282 | (a)+(b) |
| `ease-in-out-cubic` | `cubic-bezier(0.65, 0.04, 0.35, 1.00)` | 0.0220 | (a)+(b) |
| `ease-in-out-sine` | `cubic-bezier(0.45, 0.05, 0.55, 0.95)` | 0.0161 | (a)+(b) |
| `ease-in-out-quad` | `cubic-bezier(0.46, 0.03, 0.52, 0.95)` | 0.0110 | (a)+(b) |
| `ease-in-out-back` | `cubic-bezier(0.68, -0.55, 0.27, 1.55)` | 0.0101 | (b) only |
| `ease-out-circ` · `ease-in-expo` · `ease-in-back` · `ease-in-cubic` · `ease-in-quad` · `ease-in-circ` · `ease-in-sine` · `ease-out-sine` · `ease-out-back` · `ease-in-out-back` | … | 0.0012 – 0.0092 | (b) only |
| **totals** | | **18 / 28 tiles Δ > 0** · 15 of them 2dp-rounded | |
| exact | `linear` `ease` `ease-in` `ease-out` `ease-in-out` `ease-out-quad` | 0.0000 | — |
| honest (prints the NAME) | `smooth-step-3` `ease-in-bounce` `steps` `step-start` `step-end` | n/a | — |

**Failure, concretely.** Select the `ease-in-out-circ` tile. The header reads `ease-in-out-circ` on line one and `cubic-bezier(0.79, 0.14, 0.15, 0.86)` on line two. Press the button labelled *"Copy easing literal"*. Paste into CSS. You now hold a curve **0.158 of the travel wrong at the midpoint** relative to the ball you were watching — on a 300 px rail, ≈ 47 px — and it is not what the engine ran either (`cssValue` sent the *name*). Tile and engine agree; only the copyable text does not.

**Why BLOCKER and not MAJOR** ▲: rev 1 graded on mechanism (a) alone, 7 of 28. With (b) folded in it is 18 of 28 — the majority of the gallery — and the artefact is not decoration but the component's **only data export**, wired to the clipboard (`:35-39`). The scene's prose asserts the opposite in three places: `EasingTarget.vue:17-18` (*"its COMPLETE re-parseable literal"*), `EasingSidebar.vue:38-41` (*"the tile + header literal carry the selection"*), and `EasingSidebar.vue:85-89`, which **already knows this exact hazard** — *"the demo's named map (`NAMED_EASING_BEZIER`) is wider (quart/quint) and **differs on some quads (sine)** — seed by PRESET only when the picker's own catalogue knows the name"*. The sidebar has the guard; the target does not. This is precisely the dishonesty class `useEasingDemo.ts:279-287` (T.B1) claims to have killed, reintroduced in the view layer.

**Counter-consideration (stated so the finding survives it).** `:172-174` documents a deliberate header≠tile divergence for `steps` (fixed 4-step tile, live `stepOptions` literal). One could argue the bezier case is the same accepted trade. It is not: the `steps` divergence is a parameter the user set and can see, and the literal is exact for the parameters shown (see D-5's sibling, filed as part of D-17's family); the bezier case is a silent substitution of a different curve family's approximation that no user requested and no UI discloses.

**Cheapest correct fix.** Delete `literal`; render `demo.cssValue.value`. Removes a 12-line duplicate, restores name-fidelity for 23 curves, and makes the copied text identical to what the engine was handed. `cssValue`'s `steps` branch is already byte-identical.

**Falsifier.** (a) If `easing("ease-in-out-circ")` returned `CubicBezier(0.785,0.135,0.15,0.86)`, the literal would be faithful — measured 0.1634 raw / 0.1576 end-to-end, so it does not. (b) If the tile painted `cubicBezierEasing(...NAMED_EASING_BEZIER[name])`, header and tile would agree — `:175-178` and `:288` both route through `fnForCurve` → `namedEasing`. (c) If the header were specified as "the editor's current control points" this would be a labelling defect only — `:17-18` and `EasingSidebar.vue:38-41` specify the *curve's*. (d) If `cubicBezierToString` preserved precision, 10 of the 18 would fall out — it is `toFixed(2)`.

---

## 3. MAJOR

### D-12 · `railWidth` is sourced from `tileSnapshot[0]` alone — an index the file itself declares unordered — and a bad measure parks **every** ball at the origin, permanently ▲ *extended*

`:302-303` and `:270-272` both measure `tileSnapshot[0]?.stage.clientWidth`.

▲ **The ordering half (new).** The file **already knows the array has no order guarantee** — it is why the fn mapping was rebuilt off `data-curve`:

> `:283-284` — *"Snapshot keyed by `data-curve` (NOT v-for index — ref arrays carry no order guarantee)"*

Twenty lines later it trusts index 0 of that same array for the one measurement the entire painter depends on. `tileSnapshot[0]` is an *arbitrary* tile, not the first one. That is a self-contradiction inside one function, benign today only because the grid is uniform-width (`EasingTarget.css:92-94`, `repeat(auto-fill, minmax(150px, 1fr))`) — i.e. it is protected by a CSS property, not by the code.

**The freeze half (rev 1).** `.specimen-tile` carries `content-visibility: auto` (`EasingTarget.css:104`). An element inside a skipped subtree has no layout box, so `clientWidth` reports `0`; `tileBallXAt` (`:249-252`) then returns `0` for **every** tile (`maxX > 0` false), and the only recovery path — `useResizeObserver(gridEl, …)` at `:332` — re-reads the *same* tile, so it cannot self-heal while that tile stays skipped. `railWidth` is written at exactly two sites, never from the RO entry, never on scroll, never on the IO tick: **a zero measure is sticky.**

The `maxX > 0 ? … : 0` fallback proves the author anticipated a bad measure and chose silence over deferral — a wrong error posture in its own right (D-8's family).

Reachability of the zero is genuinely narrow and the magnitude is **UNPROVEN-NEEDS-LIVE**; the ordering half needs no live probe at all. Both die to the same one-line change: take the width from the RO entry's `contentRect` on `gridEl` (already observed), from `gridEl.firstElementChild`, or from the ball's *own* stage — each strictly more robust at no cost.

**Falsifier.** Ordering half: show Vue guarantees v-for ref-array order — `:283-284` is the contrary authority, and if it is wrong then *that comment* is the defect. Freeze half: show `clientWidth` on a `content-visibility: auto`-skipped descendant returns the last-known size rather than 0 (per CSS Containment L2 the subtree is not laid out and the box is absent, but this is exactly the class of claim the SS-13 live pass must settle), **or** show tile 0 can never be off-screen at measure time — 28 tiles at a 150 px floor scroll on any phone, and a filter change does not reset `scrollTop`.

---

### D-16 · ▲ **NEW** — glass-ui 7.0.0 ships `glass-chip.css` **orphaned from its own style graph**; the `data-state="on"` wash this component documents does not exist in the artifact — **MAJOR**

`EasingTarget.css:169-171` documents a vendor affordance it builds on:

> *"ToggleChip's `data-state="on"` carries the glass wash (primary 15% = the violet authority). The specimen adds: the portrait inks up, the name takes the tone."*

The rule that would carry it exists in the installed dist:

```
node_modules/@mkbabb/glass-ui/dist/styles/glass/glass-chip.css
  .glass-chip[data-mode="selectable"][data-state="on"] {
      --chip-flood-t: 1; background-color: var(--accent-band);
      border-color: var(--accent-edge); color: var(--accent-ink); }
```

**and is imported by nothing.** Probes over the whole installed package:

```
$ grep -rn "glass-chip" dist --include="*.css"     → 1 hit: glass-chip.css itself
$ grep -rln "glass-chip.css" dist/                 → (no output)      # no @import, no JS import
$ # dist/styles/index.css   (the ./styles export) @imports 18 files
$ # dist/styles/glass.css   @imports 18 glass/*  → glass-capsule.css YES · glass-chip.css ABSENT
$ node -p 'require("@mkbabb/glass-ui/package.json").exports["./styles"]'  → ./dist/styles/index.css
```

The class **is** emitted at runtime — `dist/chip-6ysLmScu.js`: `g = "glass-chip glass-capsule accent-tone inline-flex …"` — so every tile carries `.glass-chip` with no `.glass-chip` stylesheet behind it. The demo reaches the cascade through `styles/style.css:3 @import "@mkbabb/glass-ui/styles"` and imports no deeper path (`style.css:1-16`).

What is lost for this component, all from the orphaned file:

- the selected-state wash `background-color: var(--accent-band)` + `border-color` + `color` — **the exact rule `EasingTarget.css:169-171` names**;
- `--chip-flood-t` → the `::after` radial flood and the `scale(1 + 0.12·t·--motion-weight)` press affordance;
- `.glass-chip--cell { border-radius: var(--radius-card) }` — the tile falls back to `.glass-capsule`'s `border-radius: var(--radius-pill)` (verified: `glass-capsule.css` carries no `[data-state]` rule and sets `--radius-pill`), so a 150 × 104 cell renders pill-rounded;
- `@media (pointer: coarse) { min-inline-size / min-block-size: 2.75rem }` — **moot here**, the cells already exceed it; stated so the claim is not inflated.

Selection stays *legible* because the demo's own two rules land (`EasingTarget.css:173-180`: sparkline inks to 65 % `--ball-tone`, name takes the tone at weight 600) — which is why this is MAJOR and not BLOCKER. But the component styles around a vendor contract that is not in the artifact, and per D-1 there is **no declared version against which a fix could even be pinned**. This is the second, deeper bite of the phantom-dep exposure, and it is invisible to the census's version table (which compares declared/installed/producer versions, not stylesheet reachability).

**Falsifier.** Any `@import` or JS-side import of `glass-chip.css` anywhere in the installed dist — both greps are empty and cover every `.css` and every module in the package. Or a duplicate `.glass-chip` ruleset in `components.css` — the first grep covers it. Or the demo importing a deeper style path — `style.css:1-16` imports only `/styles` and `/styles/fonts`. Or `.glass-capsule` supplying an on-state — read, it does not.

**Recommended routing:** the standing glass-ui BH/BI relay (owner edict 2026-07-12) — this is a producer packaging defect, not a consumer one, and it will silently degrade every `Chip` consumer in every repo, not just this tile.

---

### D-17 · ▲ **NEW** — `"cubic-bezier"` has no tile, so *"a curve is always selected"* is false on the sidebar's primary authoring path — **MAJOR**

`:158` — `const SPECIMEN_GROUPS = EASING_GROUPS.filter((g) => g.family !== "Custom");` — removes the sole `"cubic-bezier"` entry (`easingGroups.ts:99-102`) from both the tile set and `FAMILY_FILTERS`. But the sidebar's **primary authoring gesture** produces exactly that name:

```
EasingSidebar.vue:210      demo.updateBezierPoints(v.points)          // the EasingPicker drag fall-through
useEasingDemo.ts:268-270   if (currentEasingName.value !== "cubic-bezier") currentEasingName.value = "cubic-bezier";
```

After one handle drag, `demo.currentEasingName.value === "cubic-bezier"` matches no `curve.name` in `visibleCurves`, so **every** `Chip`'s `:model-value` evaluates `false` (`:89`) and the drawer shows zero pressed tiles. That contradicts two source claims directly:

> `:202-206` — *"pressing the already-selected tile is a no-op (the controlled `:model-value` keeps it pressed — **a curve is always selected**)"*
> `EasingTarget.css:169-171` — *"the pressed tile **IS** the selected curve"*

A second instance of the same class: the family filter never follows the selection, so choosing `ease` and then filtering to `Bounce` also yields zero pressed tiles, with no scroll-into-view of the selection. And a third, milder one (rev 1 killed this as "documented", correctly, but it belongs to the family): the `steps` tile is pinned to a 4-step portrait (`:176`, `timingCurveUtils.ts:78-79`) while the header tracks live `stepOptions` (`:211-213`), so after any steps edit the **pressed** tile is no longer the selected curve either.

Nothing is *silent* — the header `<h2>` keeps naming the curve — but the drawer's selection semantics are simply absent for a reachable state that the file asserts cannot occur.

**Falsifier.** Show `updateBezierPoints` unreachable from the shipped sidebar — `EasingSidebar.vue:183-211` is the picker's `@update:model-value` handler and `:210` is its fall-through, i.e. every non-preset, non-echo drag. Or show a "Custom" tile exists — `:158` deletes the family by name. Or show the header alone satisfies the invariant — the invariant as written is about the *pressed tile*.

---

### D-18 · ▲ **NEW** — zero test coverage for this component — **MAJOR (test-coverage)**

```
$ ls test/demo/scenes/
amiga-sphere-spin · cube-scene · orbital-inertia-parity · orbital-rotate3d
scene-contract-identity · scene-facility · scene-raf-leak · scene-visibility-pause
sequence-scene · square-scene                       ← no easing-scene.test.ts

$ grep -rln "EasingTarget|specimen|visibleCurves|EASING_GROUPS" test/
  → test/demo/reference-data/easing-catalog.test.ts   (the catalogue data only)
```

`test/demo/` holds 26 files and an established **per-scene test idiom** — cube, square, sequence and amiga each have one. Easing appears only through *cross-cutting* contract tests (`scene-entries`, `scene-contract-identity`, `scene-raf-leak`, `control-surface-dfa`), every one of which exercises `useEasingDemo`'s machine/adapter seams and none of which touches this file. Nothing covers `literal`, `visibleCurves`, `fnForCurve`, `wirePainter`, the IO gate, or `railWidth`.

The cost is concrete: **D-2 is a pure function** of `demo.currentEasingName` and `demo.bezierControlPoints`, and dies to a five-line assertion (`literal === demo.cssValue` across the catalogue) in a test file that *already imports `EASING_GROUPS`*. D-17 dies to one more. Both have shipped instead.

**Falsifier.** Any test mounting `EasingTarget.vue` or asserting on `literal`/the specimen set — the grep covers all 131 test files. Or a policy that demo view components are out of test scope — `cube-scene.test.ts` / `square-scene.test.ts` / `sequence-scene.test.ts` are the counter-evidence.

---

## 4. MINOR

### D-3 · The specimen set is built by an unguarded throwing registry lookup on the render path — ▲ **re-graded MAJOR → MINOR**

`timingCurveUtils.ts:13-23` `requireEasing` **throws** on an unresolved name. Three call sites reach it from this component with a *string* argument and no guard: `:196` `getCurvePath(item.name)` and `:177` `namedEasing(name)`, both inside the `visibleCurves` computed (**during render**), and `:288` `fnForCurve(el.dataset.curve ?? "")` inside async `wirePainter`.

`grep -rn "onErrorCaptured\|errorHandler" demo/` → **no matches**; there is no boundary anywhere in the tree, so a throw in `visibleCurves` propagates out of render and takes the scene down.

I executed the shipped registry against all 25 non-step names in `EASING_GROUPS`: **25/25 `{ok:true}`.** Not a live bug, and rev 1 graded it MAJOR on the argument that reachability is one line away (`easingGroups.ts:87-90` declares a family literally named `Bounce` with exactly one member; `EasingSidebar.vue:12-13` anticipates growth there in prose).

▲ **Correction: that edit is already gated by a test.** `test/demo/reference-data/easing-catalog.test.ts:24-37` asserts *"contains only Value-resolvable named curves"* over **every** `EASING_GROUPS` item, skipping only the four editor entries. Adding `ease-out-bounce` REDs that test before it can red a browser. The posture is still wrong — a data-table typo should degrade to `linear` or skip the item, not detonate a render — but the "one line from a dead scene" framing does not survive the test's existence. **MINOR.**

**Falsifier.** If any catalogue name fails `easing(name)` this is live, not latent — 25/25 pass. If `easing-catalog.test.ts` did not enumerate `EASING_GROUPS` the re-grade collapses — it does (`:9-10`, `catalogueItems = EASING_GROUPS.flatMap(g => g.items)`). If an `onErrorCaptured` exists above the scene the blast radius shrinks — none does, and `<Suspense>` fallbacks do not catch render throws from a resolved subtree.

### D-4 · `SpecimenCurve.fn` is computed for every tile on every filter change and **never read**; the painter then re-derives it out of a DOM string

`:180-198` declares `interface SpecimenCurve { name; fn; path }` and populates `fn: fnForCurve(item.name)` (`:194`). `grep -rn "curve\.fn" demo/scenes/easing/` → **no matches**; the template reads `curve.name` (`:85,89,110,116`) and `curve.path` (`:101`) only.

Meanwhile `wirePainter` (`:285-289`) rebuilds the identical functions from `el.dataset.curve` — a value → string → DOM-attribute → string → value round trip past a typed object sitting in scope. Cost per filter change: 28 discarded `EasingFunction` closures plus 28 re-derivations. Note the caching is asymmetric: `getCurvePath` **is** memoised (`timingCurveUtils.ts:69`, P-9), `namedEasing` is not.

The stated reason is sound (`:283-284`, see P-5) but the remedy pays twice and re-introduces the stringly-typed lookup D-3 throws from. A `Map<string, TimingFunction>` built from `visibleCurves` and keyed by `dataset.curve` keeps order-independence, makes `fn` live, and removes the second derivation.

**Falsifier.** Any read of `.fn` in the SFC, a slot consumer, or `defineExpose` — there is no `defineExpose`, and grep finds no reader.

### D-5 · The `currentEasingName` watch (`:324-329`) is a provable no-op

```ts
watch(() => demo.currentEasingName.value, () => { if (!reducedMotion.value) demo.repaintDots(); });
```

`repaintDots` (`usePainterRegistry.ts:15-18`) calls each painter with `currentArgs()` = `[livePhaseValue]`. On a selection change: `livePhaseValue` unchanged; `railWidth` unchanged; `tileSnapshot` unchanged (`visibleCurves` does not depend on the selection, so `wirePainter` does not re-run); tile `fn`s static by design (`:321`). `paintTileDots` writes byte-identical `transform` strings. `grep -rn "registerDotPainter" demo/` shows exactly **one** registrant — this component — so no other painter can be affected either.

The 3-line comment above it describes a hazard that cannot occur, and could not be cured here if it did: the watch defaults to `flush: 'pre'`, so it runs *before* the pressed-state DOM exists.

**Falsifier.** A second `registerDotPainter` consumer whose output depends on the selection, or a selection-induced `railWidth` change. Only `stroke-width` (1.25→1.5) and `font-weight` change on selection; neither alters the `1fr` track.

### D-6 · `BALL_SIZE` is triplicated across two languages, and `design-idioms.css` documents a `getComputedStyle` seam this component does not use

Three independent encodings of one 14 px quantity:

- `EasingTarget.vue:228` — `const BALL_SIZE = 14;` (consumed at `:250`, `maxX = railWidth - BALL_SIZE`)
- `EasingTarget.css:163` — `--ball-size: 14px;`
- `EasingTarget.css:153,156` — `left: 6.5px` / `right: 6.5px`, the origin/terminus ticks, i.e. hand-computed `BALL_SIZE/2 − 0.5`

They agree today (P-8 shows the arithmetic is exactly right, which is why nobody has noticed). They are held in agreement by nothing. Worse, `design-idioms.css:162-163` states the contract in the opposite direction:

> `--ball-size` **is the seam EasingTarget reads via `getComputedStyle`**

```
$ grep -rn "getComputedStyle" demo --include="*.vue" --include="*.ts"
  → 8 hits: useSquareTumble.ts:13 · useSquareDemo.ts:306 · amiga/utils.ts:19
            SpringHeatmap.vue:115,123 · snapshotCapture.ts:13,39,47
  → scenes/easing: ZERO
```

The promoted idiom names a consumer that abandoned the seam: the doc is a lie about live code — the same species as lane-library **DEFECT L-2** (a documented dependency-cruiser baseline that was never wired). EasingTarget is also the **only** ball in the demo doing its horizontal positioning arithmetic in JS; `SequenceScrubber.vue:159`, `SpringTarget.vue:344,352,443`, `SpringPhysicsFacet.vue:196` all centre via `calc(var(--ball-size, 36px) / -2)` in CSS.

*(Graded MINOR, as rev 1 had it. I initially graded this MAJOR on the strength of the doc contradiction and stand corrected: the constants agree, nothing is broken, and the defect is maintainability + a false record.)*

**Falsifier.** A `getComputedStyle` read of `--ball-size` in this component (none), or a build-time token generating both encodings (no codegen exists — `vite.config.ts:37-60` declares 9 aliases and no generator).

### D-7 · The reduced-motion branch builds and wires a 28-element `IntersectionObserver` whose callback body is entirely dead

`wirePainter` `:290-301` constructs the observer and observes every stage **unconditionally**, then `:304-307` returns early under reduced motion. The callback (`:291-298`) maintains `visibleStages` and calls `demo.repaintDots()` gated on `!reducedMotion.value` — but on that branch the painter is never registered (`:310` unreachable) and `paintRestState` (`:263-267`) ignores `visibleStages` entirely, walking the full snapshot. So a reduced-motion user pays an observer allocation, 28 observations, and a callback on every drawer scroll, to mutate a `Set` nobody reads. Move the construction below the early return.

**Falsifier.** Any read of `visibleStages` outside `paintTileDots` (`:256`) — there is none.

### D-8 · `wirePainter` is `async`, every call site drops the promise, and one guard in it is a decoy ▲ *extended*

Call sites — `:313` `onMounted(() => wirePainter())`, `:319` `watch(visibleCurves, …)`, `:320` `watch(reducedMotion, …)` — none `await`s or `.catch()`es. The body's ordering makes a mid-flight throw maximally confusing:

```ts
unregisterPainter?.();      // :279  old painter retired
unregisterPainter = null;   // :280
io?.disconnect();           // :281  old observer disconnected — but `io` is NOT nulled
visibleStages.clear();      // :282
tileSnapshot = (…).map(…)   // :285  ← a throw here leaves the assignment incomplete
```

Post-throw: no painter registered (every ball frozen at its last transform, permanently), `tileSnapshot` still holding the **previous** filter's detached elements, `io` non-null but disconnected, and the user staring at a dead gallery.

▲ **New — the decoy guard.** `:288` `fnForCurve(el.dataset.curve ?? "")`. The `?? ""` *reads* as a guard but **guarantees** the throw it appears to prevent: `namedEasing("")` → `easing("")` → `{code:"easing_name_unknown"}` → `requireEasing` throws (`timingCurveUtils.ts:13-23`). Unreachable in practice (`:109` always binds `data-curve`), but the posture is inverted — a missing attribute should skip the entry, not detonate the rebuild. Together with `maxX > 0 ? … : 0` (D-12) the component's uniform failure mode is **silent freeze**, the hardest thing to notice in a scene whose subject is motion.

▲ **Rev 1's "no global handler" arm is now closed — with a nuance.** `demo/app/lifecycle/useMonacoCancellationGuard.ts:27-32` *does* register `window` `unhandledrejection` + `error` listeners, but they `preventDefault()` **only** for Monaco's exact `"Canceled"` signature and the docblock (`:12-15`) states that every real error class is *"left to surface untouched"*. So a `wirePainter` rejection is **not** swallowed: it reaches the console and would trip the `*-live` proof gates' zero-pageerror budget (`:8-11`). That is a genuine safety net for CI — and it makes the *silent* half of this finding weaker and the *torn-state* half unchanged.

**Falsifier.** A `.catch` at any call site (none). Or `fnForCurve` unable to throw (D-3's falsifier) — then only the style point remains. Or a handler that suppresses the rejection — probed above, it does not.

### D-9 · One file, two observer mechanisms: VueUse for resize, hand-rolled for intersection

`:135` imports `useResizeObserver` from `@vueuse/core` (auto-teardown, used at `:332`) while `:247/:290/:317` hand-roll a raw `IntersectionObserver` with manual `disconnect()`. VueUse's `useIntersectionObserver` is the house idiom one directory over — verified `AmigaScene.vue:22,212`, whose own comment credits it for auto-release on scope dispose.

Same *mechanism-inconsistency* class the census flagged for `prefers-reduced-motion` (§6.5); there it runs in EasingTarget's favour (P-3), here against it.

**Honest caveat:** the element set here is dynamic and non-reactive (`tileSnapshot` is a plain `let`), so the VueUse form is awkward without making the snapshot reactive — which works against the file's whole off-the-render-graph thesis. MINOR for that reason; the manual teardown *is* present and correct.

### D-10 · `railWidth` is a `ref` that no reactive consumer reads

`:232` `const railWidth = ref(0)`. Readers: `tileBallXAt` (`:250`) only, itself called from `paintTileDots` (`:257`) and `paintRestState` (`:265`) — rAF, watch and observer callbacks, none of which track. Writers: `:271`, `:303`, each followed by an explicit imperative repaint.

Nothing tracks it; nothing needs to. In *this* file the wrong container is more than cosmetic: the whole 100-line section is documented (`:222-227`, `useEasingDemo.ts:144-157`) as the surface that must stay **off** the Vue render graph, and a `ref` advertises reactivity the design deliberately refuses. It is a live trap — the moment `tileBallXAt` is called from a `computed` or `watchEffect` it silently becomes a tracked dependency.

**Falsifier.** Any template interpolation, `computed`, or `watch*` reading `railWidth` — none exists.

### D-11 · (INHERITED, `CopyButton.vue`) `isCopied` never resets, so the copy button's accessible name is permanently wrong after the first press

`CopyButton.vue:32` `const isCopied = ref(false)`; `:53` sets it `true` in `handleClick`; **nothing ever sets it back**. Its only consumer is `:4`:

```html
:aria-label="isCopied ? 'Copied to clipboard' : label"
```

EasingTarget mounts exactly one instance (`:35-39`) with `label="Copy easing literal"`. After the first copy the button's accessible name is `"Copied to clipboard"` **forever** — for every subsequent curve, for the rest of the session. Visual feedback is correct (the icon swap is engine-driven, `:62`); only the AT surface latches. Note the component *does* correctly re-arm the polite live region (`:56-60`, cleared then re-set on the next frame) — the author understood the re-arm problem and applied it to one of the two surfaces.

Attributed to `CopyButton.vue`, recorded here because EasingTarget is a consumer and the axis covers component contracts. **Complements census S-7** (AMBER), which flagged this file for the glass `Button` shell and the runtime-`@keyframes`-string injection but not for this.

**Falsifier.** A `watch`/timer resetting `isCopied`, or a second consumer making the latch meaningful — one write, one read, in 113 lines.

### D-19 · ▲ **NEW** — `rootMargin: "25% 0px"` is inert: the tiles are clipped by the drawer before the root margin applies

`:290-300` builds the observer with the **default root** (the viewport) plus a 25 % margin, documented as the pre-arm:

> `:243-245` — *"off-screen tiles (the drawer scrolls) take no transform writes; a tile scrolling back in snaps to the live phase on the next observer tick."*

But an intermediate scroller clips the tiles: `FadingScroll axis="y"` (`:76`) resolves to `.fading-scroll--y { overflow-y: auto; mask-image: … }` (verified in `dist/styles/utilities/base-misc.css`). `IntersectionObserver` intersects the target box with each ancestor clip rect **before** intersecting with the root rect + `rootMargin`; the margin expands only the root. So the margin cannot see past `.specimen-drawer` and **no tile is ever pre-armed**. `content-visibility: auto` (`EasingTarget.css:104`) gates render on the same boundary, doubly foreclosing it.

The behaviour is therefore exactly the "snap on the next observer tick" the comment frames as the *fallback* — on every tile, always. Cure: pass the scroller as `root` — which `FadingScroll`'s `.d.ts` exposes no ref for, making this a **letter to glass-ui** (cf. census §3.4's soft-coupling note) — or drop the margin and own the snap honestly.

**Falsifier.** Show `rootMargin` expanding ancestor clip rects (it does not, per the IO intersection algorithm), or show `.specimen-drawer` is not a scroll container — the vendor rule sets `overflow-y: auto` unconditionally on `.fading-scroll--y`.

### D-20 · ▲ **NEW** — the documented "paints once on register" writes **nothing**; the first real paint waits a frame ▲ *corrects P-1*

`usePainterRegistry.registerPainter` does call the painter immediately (`usePainterRegistry.ts:10`), and the component leans on that:

> `:308-309` — *"registerDotPainter paints once on register — a paused scene shows the correct rest position immediately."*

But `wirePainter` clears `visibleStages` at `:283` and never refills it synchronously — `IntersectionObserver` **queues** its initial records as a task, it does not deliver them from `observe()`. So at `:310` the set is empty and the immediate paint skips **every** entry:

```ts
:255-258   for (const {el, stage, fn} of tileSnapshot) {
               if (stage && !visibleStages.has(stage)) continue;   // ← skips all 28
```

The first real paint arrives from the IO callback's `demo.repaintDots()` (`:297`), one frame later. And the easing scene **rests on entry** (`EasingScene.vue:119-126`, VERDICT #19 — `autoPlays: false`), so this is exactly the paused case the comment claims is covered: every ball sits at `translateX(0)` for that frame before snapping to the live phase. Cure: seed `visibleStages` optimistically, or paint unconditionally on the register pass — the gate exists for the 60 Hz walk, not for a one-shot.

▲ This **corrects rev 1's P-1**, which praised the register-paint as making "a paused scene correct on its first frame with no special-case initialisation". The registry's contract is fine; this component's IO gate silently voids it.

**Falsifier.** Show `IntersectionObserver` delivering initial records synchronously from `observe()` — the spec queues an intersection-observation task. Or show `visibleStages` non-empty at `:310` — `:283` clears it and only `:293` refills it, from the async callback.

---

## 5. INFO

### D-13 · `will-change: transform` on 28 balls, never released — INFO

`EasingTarget.css:166`. A standing compositor hint; nothing removes it when the sweep is idle, and the scene rests on entry (`EasingScene.vue:126`), so at first paint it is live for every ball while nothing moves. INFO rather than MINOR because `content-visibility: auto` on the parent tile plausibly suppresses promotion for skipped tiles, bounding exposure to the visible set (~6-9 tiles). **Magnitude UNPROVEN-NEEDS-LIVE** (layer count / GPU memory is a DevTools observation).

### D-14 · `EasingTarget.css:136` says "33 rails"; the specimen set is 28 — INFO

The comment justifies the 1 px rail delta by *"33 rails at 2px read as a grid of rules"*. Counting `EASING_GROUPS` minus `Custom` (`easingGroups.ts:27-103`): 5+3+3+4+3+3+3+1+3 = **28**. Harmless drift, but the kind of stale count that makes a reader distrust the surrounding rationale — which here is correct.

### D-15 · `cubicBezierToString` rounds to 2 decimals, so the "never truncated" literal is not an exact round trip — INFO ▲ *now shown to compound D-2*

Executed against the shipped value.js: `cubicBezierToString(0.785, 0.135, 0.15, 0.86)` → `"cubic-bezier(0.79, 0.14, 0.15, 0.86)"` (`toFixed(2)`, the sole occurrence in `dist/subpaths/math.js`). Rounding-only curve error: `ease-in-out-back` 0.0101, `ease-out-circ` 0.0092, `ease-in-expo` 0.0080, `ease-in-cubic` 0.0035, a representative authored drag `(0.123,0.456,0.789,0.012)` 0.0020.

Small on its own — hence INFO — but ▲ it is now measured as the mechanism behind **10 of D-2's 18** divergent tiles and the *only* mechanism for 10 of them, and it bites a case D-2's mechanism (a) does not: a user-authored `cubic-bezier` drag is **stored at full precision** (`useEasingDemo.ts:265-271`) and **copied at 2 dp**. The header's own claim (`:17-18`, *"COMPLETE … never truncated"*) is about width, not precision; a reader will hear both. Independently a **value.js serializer** finding: `cubicBezierToString` is lossy and has no round-trip oracle, unlike `roundTripScrollCSS` (lane-library §4.4) — worth a row in the parser/serializer wave.

### D-21 · ▲ **NEW** — the only keyframes.js *runtime* this component touches is a type import — INFO (engine-consumption idiom)

```ts
import type { TimingFunction } from "@mkbabb/keyframes.js";   // :141 — the entire kf surface
```

Every easing in the gallery comes from **value.js** (`easing()`, `steppedEase()`, `CubicBezier()` via `timingCurveUtils`). `fnForCurve` is annotated with kf's `TimingFunction` (`constants/types.ts:45`, `(t:number)=>number`) while returning value.js's `EasingFunction` (`dist/subpaths/easing.d.ts:25`, `(progress:number)=>number`) — structurally identical, so the annotation is *correct*, merely a nominal fiction.

The consequence is a **coverage hole, not a bug**: the demo's flagship *easing* scene exercises none of keyframes.js's easing surface (`compile/easing/easing-registry.ts` — `timingFunctionEntries`, `resolveTimingFunction`), so a regression in kf's registry composition (`registryNames` / `DIRECT_NAMES`, `:18-34`) would be invisible in the gallery. I verified the two paths currently **agree** (kf's registry is *built from* `easing()`, `:38-47`), which is why this is INFO.

It is also **not the component's fault**: kf publishes no synchronous name→fn surface. The light barrel exports only `resolveEasing` (`src/animation/index.ts:151`), which is `async` behind `import("./compile/easing/easing-registry")` (`easing.ts:77-84`), and `resolveTimingFunction` is on no published barrel (probed). A synchronous per-frame painter cannot use it. So this is a **letter to the library**: expose the registry synchronously off `loadAnimationEngine()`'s surface — which `kf-engine.ts:38-56` already warms before `app.mount()` and reads synchronously — and the demo can dogfood its own easing. Until then the "inv-ζ seam" (*the demo's signature animation IS the library*, `TypingDots.vue:1-9`) is broken at exactly the scene named after the feature.

**Falsifier.** Any `resolveTimingFunction`/`timingFunctionEntries` export from `public.ts` or `index.ts` — grep returns only `resolveEasing`. Or a numeric divergence between kf's and value.js's resolution for a catalogue name — probed, none.

---

## 6. Superlatives (L-18 runs both ways)

### P-1 · The shared-clock / snapshot-painter / IO-gate hot path is the reference implementation in this tree ▲ *one clause corrected*

`:254-259` is the whole per-frame cost for 28 animated balls:

```ts
const paintTileDots = (phase: number) => {
    for (const { el, stage, fn } of tileSnapshot) {
        if (stage && !visibleStages.has(stage)) continue;
        el.style.transform = `translateX(${tileBallXAt(fn, phase)}px)`;
    }
};
```

Every property is deliberate and correct: **one** phase for all 28, so *"all balls depart together"* (`:8-10`) is true **by construction**, not by synchronisation — the pedagogical claim is structurally guaranteed; a pre-built snapshot, so no DOM query per frame; an IO gate, so off-screen tiles cost nothing; `transform` **only**, so no per-frame layout or paint invalidation; `railWidth` cached from a ResizeObserver, so no forced reflow enters the loop; the glow static in CSS (`:159-161`) *"never written per frame"*. Three gates (IO, `content-visibility`, `will-change`) stack on one axis. Against the b16 regression this replaced (21.6 ms/frame, 36 dropped, ~46 fps) the discipline is the strongest in the scene tree.

▲ **Correction.** Rev 1 extended the superlative to the registry seam — *"`registerPainter` paints once on registration, so a paused scene is correct on its first frame"*. The registry's contract is sound (`usePainterRegistry.ts:8-12`), but **this consumer voids it**: the IO gate is empty at register time, so that paint writes nothing (D-20). The hot-path superlative stands; the initialisation clause does not.

**Falsifier (superlatives get one too).** A per-frame layout read, a non-`transform` style write, a reactive write, or a DOM query inside the painter would kill it. There is none — `tileBallXAt` reads a cached ref, and `repaintDots`'s only other hot-path caller (`useEasingDemo.ts:188`) is likewise write-only.

### P-2 · The `.progress-ball` idiom deliberately leaves `transform` unclaimed, so this painter is non-clobbering **by construction**

`design-idioms.css:177-187` centres the ball vertically with `margin-top: calc(var(--ball-size, 36px) / -2)` — **not** `translateY(-50%)` — while the sibling `.progress-rail` (`:166-176`) *does* use `transform: translateY(-50%)` because nothing paints it. That asymmetry is not an accident: it is what makes `el.style.transform = translateX(…)` a total, safe write. A single `translateY(-50%)` in the shared idiom would have silently dropped 28 balls out of their rails the moment the painter ran. A genuinely good CSS/JS contract that deserves to be written down before someone "tidies" it.

**Falsifier.** Any `transform` in the base `.progress-ball` rule or in `.tile-ball` (`EasingTarget.css:162-167` sets `--ball-size`, `--ball-glow`, `left`, `will-change` only). Neither exists.

### P-3 · Reduced motion is a real behavioural gate here — and the only one that re-wires its paint path ▲ *claim narrowed*

Under PRM the painter is **never registered** (`:304-307` returns before `:310`), so the rAF loop's `repaintDots()` walks an empty set: zero writes, not merely `transition: none`. The balls rest at `fn(1)` and the sparklines carry the pedagogy (`:261-267`), and `:320` `watch(reducedMotion, () => wirePainter())` **re-wires the whole paint path** when the OS setting flips mid-session — painter retired, `paintRestState()` applied, symmetrically restored on the way back. It also pairs the JS gate with a CSS block (`EasingTarget.css:48-53`).

▲ **Correction, and a census contradiction.** Rev 1 claimed this is *"the only reactive PRM site"*. It is not: `AmigaScene.vue:58` uses VueUse `usePreferredReducedMotion()` and reads `prm.value` live inside its per-frame loop (`:107`), so it observes a mid-session toggle too. **Census §6.5's enumeration is also incomplete** — it lists three JS sites (`useCubeDemo.ts:164`, `useSequenceInstrument.ts:31`, `EasingTarget.vue:234`) and misses `AmigaScene.vue:58` entirely; there are **four** JS mechanisms, two of them reactive. The surviving superlative is narrower and still true: EasingTarget is the only site that *re-wires a paint path* on the flip, and the only one pairing a reactive JS gate with a CSS block and a defined rest state. The two `window.matchMedia?.().matches` sites read **once**, inside one-shot handlers, so an OS toggle is invisible to them.

**Falsifier.** If `useMediaQuery` did not auto-dispose its listener the trade would be worse — VueUse registers `tryOnScopeDispose` and this is a component scope. If another site also re-wired on flip, the superlative reduces to "one of N".

### P-4 · `wirePainter`'s teardown-before-rebuild ordering makes concurrent invocations leak-free

Two watches (`:319`, `:320`) can fire in one tick. Because the entire body after the **single** `await nextTick()` (`:278`) is synchronous, two interleaved calls resolve strictly in order, and each begins by retiring its predecessor's painter and observer (`:279-282`) before building its own. There is no window in which two painters or two observers are simultaneously live. Analysed specifically hunting the classic async-rewire double-registration leak; it is not there.

**Falsifier.** A second `await` anywhere in the body would open the interleave window. There is exactly one.

### P-5 · The snapshot refuses to trust `v-for` ref-array order

`:283-284` — *"Snapshot keyed by `data-curve` (NOT v-for index — ref arrays carry no order guarantee)"*. Correct (Vue documents exactly that caveat), and it is the sort of thing that produces an unreproducible *"sometimes one ball races the wrong curve"* bug. The instinct is right; the implementation costs more than it should (D-4) and — ▲ — is contradicted twenty lines later by the file's own `tileSnapshot[0]` measurement (D-12).

### P-6 · The `ToggleGroup` emit is typed **structurally**, keeping the demo off the vendor's headless basis

`:163-169`:

```ts
type ToggleValue = string | number | boolean | Record<string, unknown> | null;
const onFamilyChange = (v: ToggleValue | ToggleValue[]) => {
    if (typeof v === "string" && v.length) familyFilter.value = v;
};
```

No `reka-ui` import, no `any`, and the narrowing doubles as the deselect guard (`:166-167`) so *"a filter is always in force"* is genuinely true — unlike the tile invariant, which is not (D-17). This is the discipline that produces census **F-6 GREEN** (*"zero direct `reka-ui` imports"*), and it contrasts sharply with `CopyButton.vue:49`'s `AnimationGroup<any>` one directory over.

### P-7 · ▲ **NEW** — the sparkline is dimensionless by construction

`:95-104`. `viewBox="0 0 1 1"` + `preserveAspectRatio="none"` means the path data **is** the normalized curve — `generateCurveSVGPath` emits `t,1-v` in [0,1] (`timingCurveUtils.ts:48-56`) with no scaling arithmetic anywhere in the component — and `vector-effect="non-scaling-stroke"` keeps the 1.25 px hairline honest under the anisotropic stretch that `preserveAspectRatio="none"` induces. Both halves are necessary and both are present; drop either and the portraits distort or the stroke smears. The CSS completes it with 18 % headroom and `overflow: visible` (`EasingTarget.css:119-126`) so `back`/`bounce` overshoot is not clipped.

**Falsifier.** A scale factor applied to the path data, or a non-unit `viewBox` — neither exists; and a fixed `stroke-width` without `vector-effect` would visibly thicken horizontally at wide tile widths.

### P-8 · ▲ **NEW** — the rail ticks land exactly on the ball's phase-0 and phase-1 centres

`EasingTarget.css:142-157` vs `:249-252`. Ball 14 px at `left: 0`, so its centre at phase 0 is 7 px and at `maxX = W − 14` is `W − 7`. `::before { left: 6.5px; width: 1px }` centres at 7; `::after { right: 6.5px; width: 1px }` centres at `W − 7`. The departure and terminus marks agree with the painter's travel to the half-pixel, across 28 tiles under one shared clock — this is the geometry that makes *"the comparative read IS the pedagogy"* legible rather than approximate. *(It is also D-6's hostage: the exactness is maintained by three uncoupled literals.)*

**Falsifier.** Recompute: `BALL_SIZE/2 = 7`; `6.5 + 1/2 = 7`; `maxX + 7 = W − 7`. Any of the three constants moving alone breaks it, which is precisely D-6.

### P-9 · ▲ **NEW** — the portraits are memoised at module scope

`timingCurveUtils.ts:69-90`. `getCurvePath` caches by name in a module-level `Map`, so 28 portraits × 33 samples are computed **once per session** in a cache that survives scene remount and swap — the right altitude for data that is constant for the life of the page, and the reason a family-filter flip is not a 924-sample recomputation. *(The asymmetry with the uncached `namedEasing` is D-4, not a defect in this.)*

---

## 7. Hypotheses killed (recorded so they are not re-raised)

| hypothesis | why it died |
|---|---|
| **In-flight-unmount leak** — the scope disposes during `wirePainter`'s `await`, and the continuation registers a painter into the parent registry after teardown | Not reachable. `nextTick()` inside a watcher resolves at the end of the *same* flush, so the unmount would have to be queued in that flush; `EasingScene.vue:2-4` mounts `<EasingTarget/>` unconditionally, so the child can only unmount with the scene, and `useSweepScene`'s `onScopeDispose(stopLoop)` kills the loop, leaving any orphan registration unreachable garbage. **Latent hardening gap only** (a `disposed` flag after the `await` closes it); NOT filed. |
| **Double-registration of `paintTileDots`** | `usePainterRegistry` uses a `Set` (`:6`) and the painter identity is stable — re-registration is idempotent even if the unregister were skipped. |
| **A specimen name value.js cannot resolve** | Executed all 25 non-step names against the shipped registry: 25/25 `{ok:true}`, including `smooth-step-3` and `ease-in-bounce`. Only the *posture* survives, at MINOR (D-3). |
| ▲ **`step-start`/`step-end` throwing through kf's `resolveTimingFunction`** — predicted `{kind:"keyword"}` → `easing("step-start")` → `easing_name_unknown` → `TypeError`, swallowed by the fail-soft `catch` at `useEasingDemo.ts:311-314`, silently stranding the engine on the previous curve | **Probed and false.** value.js returns `{"kind":"steps","count":1,"position":"jump-start"}`; `fromCssTimingFunction` takes the `steps` arm cleanly. |
| ▲ **The tile's ball and the engine channel run different curves** | They **agree** — both funnel to value.js `easing()` (tile via `namedEasing`; engine via kf `resolveTimingFunction` → registry → `easing()`), verified name by name. This kill is what sharpens D-2: painted curve, sparkline and engine are mutually consistent, and *only* the printed/copied literal dissents. |
| **`inject(EASING_DEMO_KEY)!` is an EasingTarget defect** | It is the **house idiom** — `SequenceTarget.vue:150`, `SequenceScrubber.vue:47`, `SpringTarget.vue:169`, `StartingStyleTarget.vue:96` are identical, and the sole mount site sits one line below the `provide` (`EasingScene.vue:20-21`, `:3`). A repo-wide `injectStrict` helper is a fair recommendation; singling out this file is not. |
| **The `steps` literal contradicting the fixed 4-step tile** | Documented and deliberate at `:172-174`. Retained as D-2's counter-consideration and as D-17's third instance; not filed on its own. |
| **`watch(visibleCurves, …)` firing on every recompute** | `visibleCurves` depends only on `familyFilter`, and `familyFilter.value = v` with an equal string does not trigger (`Object.is`). No spurious rewires. |
| **ResizeObserver racing `wirePainter`'s snapshot** | `nextTick()` resolves in the microtask checkpoint, strictly before the frame's post-layout RO delivery, so the snapshot is always rebuilt first. The RO's *initial* delivery against an empty snapshot is a harmless no-op (`:270-274` is fully `?.`-guarded). |
| **Module-size / Goldilocks violation** | Contested and resolved against filing. 335 lines with ~90 of comment; the script is ~150 lines of code across a coherent set of concerns. The painter/IO/measure cluster (`:226-332`, 110 L) *is* extractable as `useRailPainter` **and** would carry D-7/D-8/D-12/D-20 into a testable unit — but `grep` finds exactly one `IntersectionObserver` and one `registerDotPainter` site, so extraction today is speculative generality under `feedback_kiss_no_contrivance`. ▲ I initially filed this as MINOR and withdraw it; the argument against is stronger. Note it becomes correct the moment D-18 is discharged, since a composable is the testable seam. |
| ▲ **A global handler swallowing `wirePainter`'s rejection** | `useMonacoCancellationGuard.ts:20-32` `preventDefault()`s **only** the exact Monaco `"Canceled"` signature and explicitly leaves every real error class to surface (`:12-15`). D-8's rejection is visible — and would trip the `*-live` gates' zero-pageerror budget. |

---

## 8. Census crosswalk

| census id | this challenge |
|---|---|
| `lane-frontend.md` **F-1** (phantom glass-ui, RED) | **D-1** — confirmed by lockfile *count* (`grep -c glass-ui package-lock.json` → 0), localised (4 specifiers here, 3 in the sibling sidebar; sole consumer of `/fading-scroll` + `/toggle-group`), and ▲ the `.github/` arm the census did not reach is now closed: no out-of-band install. |
| `lane-frontend.md` §2 (installed vs declared vs producer) | ▲ **EXTENDED by D-16.** The census compared *versions*; it did not check *stylesheet reachability*. Installed 7.0.0 ships `glass-chip.css` imported by nothing, so a subpath the demo does consume ships without its stylesheet. Route to the glass-ui BH relay. |
| `lane-frontend.md` **F-6** (clean glass boundary, GREEN) | **P-6** — corroborated and given its mechanism (structural emit typing, `:163-169`). |
| `lane-frontend.md` **S-7** (`CopyButton`, AMBER) | **D-11** — a defect S-7 did not record (`isCopied` never resets → latched `aria-label`), in the file S-7 already marks for partial replacement. |
| `lane-frontend.md` §3.4 (soft coupling: demo CSS styling reka's generated DOM) | **Both halves confirmed.** `:163-169` is the good half (P-6); `EasingTarget.css:173-179` styling `[data-state="on"]` is the soft-coupling half — and D-16 is what happens when the vendor's own layer for that attribute goes missing. |
| `lane-frontend.md` §6.5 (PRM: 13 sites, 3 JS) | ▲ **CONTRADICTED.** The JS enumeration is incomplete: `AmigaScene.vue:58` `usePreferredReducedMotion()` is a fourth mechanism, read live at `:107`. There are **4** JS sites, **2** reactive. P-3 is narrowed accordingly. |
| `lane-frontend.md` §4 roster row `335 easing/EasingTarget.vue G` | Line count and glass-ui consumer list confirmed exactly. |
| `lane-frontend.md` §7.2 (colocation idiom) | Noted, not filed: `scenes/easing/` carries 1 colocated composable where the mechanism count arguably says 2 — withdrawn under KISS (§7). |
| `lane-library.md` §4 (CSS/keyframes parse seam) | Mostly no overlap; ▲ two additions. (i) §4.6's demo parse-consumer list omits this scene — it reaches value.js `/easing` transitively via `timingCurveUtils` and `/math` directly (`:140`). (ii) **D-15 is a serializer finding for that lane**: `cubicBezierToString` is `toFixed(2)`-lossy with no round-trip oracle, unlike `roundTripScrollCSS` (§4.4). |
| `lane-library.md` **DEFECT L-2** (a documented baseline that was never wired) | **D-6** is the same species one repo layer up: `design-idioms.css:162` documents a `getComputedStyle` seam this component does not use. |
| `lane-library.md` §3.3 (the LIGHT/HEAVY dynamic boundary) | **D-21** — the boundary is *why* the gallery cannot dogfood kf's easing: the only published name→fn surface (`resolveEasing`, `index.ts:151`) is async behind `import("./compile/easing/easing-registry")`. Filed as a letter to the library, not a component defect. |

**No census finding is contradicted by the tree as read, except §6.5's JS-site enumeration (above), which is incomplete rather than wrong.**

---

## 9. Live-audit handoff (SS-13)

Source-derived only; each marked **UNPROVEN-NEEDS-LIVE**:

1. **D-12's freeze half** — does `clientWidth` of a `.tile-stage` inside a `content-visibility: auto`-skipped `.specimen-tile` return 0? If yes, scroll the drawer down, resize, and every ball should park at the origin permanently.
2. **D-16's rendered consequence** — do the cells read pill-rounded with no selected wash and no press flood?
3. **Overshoot clipping** — `ease-in-back` dips to ≈ −0.1 and `ease-out-back` peaks at ≈ +1.09, so the ball leaves `[0, maxX]`. `.tile-stage` sets no `overflow`, and the CSS grants headroom to the **sparkline** only (`EasingTarget.css:119-126`), never to the ball. Does the Chip root clip it?
4. **D-20's one-frame origin flash** on a paused entry and on every filter change.
5. **D-13's magnitude** — composited layer count with 28 `will-change: transform` balls at rest.
6. **D-2's visible signature** — put `ease-in-out-circ`'s painted ball and its pasted literal on the same rail; the divergence should read as ≈ 47 px at the midpoint on a 300 px rail.
