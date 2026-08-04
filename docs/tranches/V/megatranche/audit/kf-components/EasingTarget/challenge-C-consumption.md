claude-opus-5[1m]

# Challenge · `EasingTarget.vue` · axis C — CONSUMPTION

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/easing/EasingTarget.vue` (335 L)
**Substrate** keyframes.js `master` HEAD `8281638c`. **Working tree, not HEAD** — `EasingTarget.vue`, `EasingSidebar.vue`, `useEasingDemo.ts` are all ` M` dirty. Every line citation below is against the **working tree** as read on 2026-08-04.
**Mode** static + read-only. No writes to any product tree. No browser tooling. Runtime probes were `node -e` evaluations of the **installed** `node_modules/@mkbabb/value.js@4.0.0` and `node_modules/@mkbabb/glass-ui@7.0.0` dist bundles — reads only, no installs, no servers.
**Corpus folded** `formation/keyframes/lane-frontend.md` (F-1 phantom dep, S-1..S-8 shadow census, §3.1 subpath utilisation, §6.5 PRM sites) and `lane-library.md` (§3.3 LIGHT/HEAVY firewall, §4.1 A5/A6 `parseTimingFunction`, §4.6 the R1 blast radius, §1 value.js rootlessness). Contradictions to the corpus and to the tree's own prose are marked **CONTRADICTS** and carry their probe.

**Posture** the component was assumed defective until the tree proved otherwise. It proved otherwise on six counts (§3). It failed on fourteen (§2). One is a BLOCKER: **the literal this component prints and hands to the clipboard is not the curve it animates**, and that is measurable, not aesthetic.

---

## 0. Headline

| # | finding | sev |
|---|---|---|
| **C-1** | The header literal is **not the curve on screen** for 7 of 28 specimens — drift up to **0.163** (16.3% of range). The CopyButton hands the wrong literal to the clipboard. | **BLOCKER** |
| C-2 | `cubicBezierToString` is **2-dp lossy**; 16 of 23 bezier literals are truncated. Three separate comments in this scene claim "never truncated" / "the F7 truncation class is dead by construction". | MAJOR |
| C-3 | `literal` re-derives `demo.cssValue` — which the composable already exports and the preview animation already consumes — and diverges from it by construction. | MAJOR |
| C-4 | The 28-tile grid hand-rolls single-select over independent `Chip`s while `ToggleGroup type="single"` is used **30 lines above in the same file**. 28 tab stops vs 1 + arrows. | MAJOR |
| C-5 | `NAMED_EASING_BEZIER` is a **29/29 byte-exact shadow** of value.js's public `bezierPresets`. The sibling comment defending the shadow is **measurably false**. | MAJOR |
| C-6 | value.js's Result API is consumed through a **throwing** adapter at three render-path sites with **zero** guard; `namedEasing("")` is proven to throw. The composable guards its adjacent seam; this component does not. | MAJOR |
| C-7 | `SpecimenCurve.fn` is dead payload — 28 easing closures allocated per filter change and never read. | MINOR |
| C-8 | `tileSnapshot[0]` is a **positional** read from an array this same file declares unordered (`:283`); under `content-visibility: auto` it can measure 0 and park every ball at the origin. | MINOR |
| C-9 | `rootMargin: "25% 0px"` **cannot** pre-warm the drawer — `root: null` pads the viewport, not the intermediate clipper. `FadingScroll` exposes no scroll port. | MINOR |
| C-10 | `BALL_SIZE = 14` duplicates `--ball-size: 14px` across the JS/CSS boundary; the shared idiom's fallback is 36px. | MINOR |
| C-11 | The `steps` tile is decoupled from `demo.stepOptions` and its path is memoised at n=4 forever, while the literal directly above it reads the live value. | MINOR |
| C-12 | The component's **only** keyframes.js import is an erased type, and it is the wrong library's type. Zero runtime engine symbols in the demo's easing showcase. | INFO |
| C-13 | Undeclared, unguarded injection contract (`inject(...)!`), asymmetric with the sibling's declared prop, at a site whose failure mode is documented one scene away. | INFO |
| C-14 | Inherits **F-1**: 4 of this file's 6 imports resolve only by accident of the current `node_modules`. | AMBER |
| **L-1..L-6** | six superlatives — §3 | — |

---

## 1. What this component consumes

Six import edges (`:135–150`), of which four cross a package boundary:

| line | specifier | shape |
|--:|---|---|
| 135 | `@vueuse/core` | `useMediaQuery`, `useResizeObserver` |
| 136 | `@mkbabb/glass-ui` (root barrel) | `Card` |
| 137 | `@mkbabb/glass-ui/fading-scroll` | `FadingScroll` |
| 138 | `@mkbabb/glass-ui/chip` | `Chip` |
| 139 | `@mkbabb/glass-ui/toggle-group` | `ToggleGroup`, `ToggleGroupItem` |
| 140 | `@mkbabb/value.js/math` | `cubicBezierToString` |
| 141 | `@mkbabb/keyframes.js` | **`import type`** `TimingFunction` — erased |

Four distinct glass-ui subpaths, one value.js subpath, and — the fact that organises this whole challenge — **zero runtime symbols from the library the demo exists to demonstrate** (C-12).

Transitive value.js reach, one hop through `@utils/reference-data/timingCurveUtils`: `CubicBezier`, `easing`, `steppedEase`, `EasingFunction`, `JumpPosition` from `@mkbabb/value.js/easing` (`timingCurveUtils.ts:1–7`). So the specimen drawer's every curve, every sparkline and every ball is a **value.js** artefact, reached through a demo-owned throw-adapter (C-6).

---

## 2. Defects

### C-1 · **BLOCKER** — the header literal is not the curve on screen

`:209–220` computes the promoted literal:

```ts
const literal = computed<string>(() => {
    const name = demo.currentEasingName.value;
    if (name === "steps") { … }
    if (demo.isBezierEditable.value) {
        return cubicBezierToString(...demo.bezierControlPoints.value);
    }
    return name;                                     // :219
});
```

`isBezierEditable` (`useEasingDemo.ts:73–76`) is `n === "cubic-bezier" || n in NAMED_EASING_BEZIER`. **23 of the 28 specimen names are in `NAMED_EASING_BEZIER`**, so branch `:216` — not the `return name` at `:219` — is what renders for the overwhelming majority of tiles. The comment at `:216–219` ("An engine-named curve … the name IS the literal") describes a branch that is **unreachable for 23 of 28 specimens**.

The ball, meanwhile, is driven by `fnForCurve` → `namedEasing(name)` → **`easing(name)` from value.js** (`:175–178`, `:288`; `timingCurveUtils.ts:42–46`). And value.js's `easing()` does **not** resolve those names through `bezierPresets` — it prefers its own **analytic** implementations for exactly the nine names it also exports as standalone consts (`easeInOutCirc`, `easeInOutExpo`, `easeOutCubic`, `easeInOutCubic`, `easeInOutQuad`, `easeInOutSine`, `easeOutExpo`, `smoothStep3`, `easeInBounce` — see `value.js/dist/subpaths/easing.d.ts`).

**Probe** (`node`, installed value.js 4.0.0, `max |easing(name)(t) − CubicBezier(NAMED_EASING_BEZIER[name])(t)|` over t ∈ [0,1] at 201 samples):

| specimen | max drift | literal printed | curve drawn |
|---|--:|---|---|
| `ease-in-out-circ` | **0.1629** | `cubic-bezier(0.79, 0.14, 0.15, 0.86)` | analytic circ |
| `ease-in-out-expo` | **0.1339** | `cubic-bezier(1.00, 0.00, 0.00, 1.00)` | analytic expo |
| `ease-out-expo` | 0.0370 | `cubic-bezier(0.19, 1.00, 0.22, 1.00)` | analytic expo |
| `ease-in-out-cubic` | 0.0247 | `cubic-bezier(0.65, 0.04, 0.35, 1.00)` | analytic cubic |
| `ease-out-cubic` | 0.0222 | `cubic-bezier(0.21, 0.61, 0.35, 1.00)` | analytic cubic |
| `ease-in-out-quad` | 0.0192 | `cubic-bezier(0.46, 0.03, 0.52, 0.95)` | analytic quad |
| `ease-in-out-sine` | 0.0175 | `cubic-bezier(0.45, 0.05, 0.55, 0.95)` | analytic sine |
| the other 16 | 0.0000 | — | — |

The scene's whole pedagogical claim is the comparative read (`:2–10`: "the comparative read IS the pedagogy"). A user watching `ease-in-out-circ` race, reading its literal, and pressing the CopyButton at `:35–39` receives a string that reproduces a **visibly different** curve — 16% of the animation range apart at its worst.

The library itself already ruled on this. `keyframes.js/src/animation/easing.ts:41–47`:

> The faithful CSS easing string for an easing NAME / literal, or `undefined` when the name has no faithful CSS twin (value.js bespoke curves — `easeOutCubic`, `bounceInEase` — do **NOT** map to a CSS keyword).

`cssTwinFor` returns `undefined` for exactly these names, and `constants/types.ts` documents the `Easing { fn, css? }` pair as the cure for precisely this drift ("Replaces the former Symbol-on-a-closure side channel: the 'this closure has a CSS twin' fact now flows through the type system, so wrapping or binding the callable can no longer silently drop it"). **This component re-invents that pairing by hand and re-introduces the drift the type exists to prevent.**

`demo.cssValue` (`useEasingDemo.ts:93–104`) already returns the bare **name** for every non-`cubic-bezier`/non-`steps` curve — the correct answer by the library's own doctrine, and the one the preview animation actually consumes (`useEasingDemo.ts:308–315`).

**Cure** delete `literal`; bind `demo.cssValue`.
**Falsifier** show that `easing(name)` and `CubicBezier(NAMED_EASING_BEZIER[name])` agree to within display precision for all 23 names — i.e. re-run the probe and get a max drift below ~0.002 everywhere. That kills this claim outright. (Also killed if `demo.bezierControlPoints` is shown to hold something other than `NAMED_EASING_BEZIER[name]` while a named curve is selected — but `selectEasing`, `useEasingDemo.ts:246–259`, seeds it from exactly that table.)

---

### C-2 · MAJOR — `cubicBezierToString` truncates; three comments say it does not

**Probe** against installed value.js 4.0.0 `/math`:

```
cubicBezierToString(0.445, 0.05,  0.55,  0.95 )  →  "cubic-bezier(0.45, 0.05, 0.55, 0.95)"   0.445 → 0.45
cubicBezierToString(0.6,  -0.28,  0.735, 0.045)  →  "cubic-bezier(0.60, -0.28, 0.73, 0.04)"  0.735 → 0.73, 0.045 → 0.04
```

Two decimals, zero-padded. Across the 23 named specimens, **16 literals are lossy**, with curve-output drift up to **0.0101** (`ease-in-out-back`) purely from the rounding — on top of C-1's registry drift.

Three sites in this scene assert the opposite:

- `EasingTarget.vue:208` — "The header literal — **COMPLETE and re-parseable, never truncated**"
- `EasingTarget.css:55–56` — "The complete re-parseable literal: Fira Code, wraps (**never truncates**)"
- `EasingSidebar.vue:8` — "the COMPLETE re-parseable readout literal with copy — **the F7 truncation class is dead by construction**"

The CSS comment is defensible (it is about visual wrapping). The other two are claims about the string, and the string is truncated at the numeric level by the value.js formatter this component chose.

**Worse: the same scene shows two literals for the same curve at two precisions.** glass-ui's `EasingPicker` — mounted in `EasingSidebar.vue:29–38` — builds its own readout at **3** decimals (probe, `glass-ui/dist/easing.js`):

```js
if (n.value === "steps") return `steps(${s.value}, ${c.value})`;
let [e, t, r, a] = i.value.map((e) => +e.toFixed(3));
return `cubic-bezier(${e}, ${t}, ${r}, ${a})`;
```

So for `ease-in-out-sine` the sidebar reads `cubic-bezier(0.445, 0.05, 0.55, 0.95)` (exact) while the header two panels away reads `cubic-bezier(0.45, 0.05, 0.55, 0.95)` (lossy). **Both surfaces are copyable. They disagree.**

**Falsifier** show `cubicBezierToString` emitting ≥3 significant decimals in the version actually resolved at build time (a different installed value.js), or show that the demo never renders the picker and the header simultaneously. Neither holds on this tree: `EasingScene.vue:3` mounts `EasingTarget`, `:57` mounts `EasingSidebar`.

---

### C-3 · MAJOR — `literal` is a redundant, divergent re-derivation of `demo.cssValue`

`useEasingDemo.ts:93–104` already exports `cssValue`, computed with the **same three branches** but a **different** middle condition — `name === "cubic-bezier"` where the component uses `demo.isBezierEditable.value`. That single substitution is the whole of C-1's mechanism.

`cssValue` is not decorative: it is what `previewAnim.setTimingFunction(v)` consumes (`useEasingDemo.ts:308–315`), i.e. **the value the engine actually animates with**. The component chose to import `cubicBezierToString` from `@mkbabb/value.js/math` (`:140`) — the composable's own line 2 import — solely to compute a competing answer to a question its scene composable had already answered correctly.

This is the integration-seam defect underneath C-1: the component reaches **past** its scene composable into a value.js formatting subpath to re-derive state the composable owns.

**Falsifier** find a consumer requirement `demo.cssValue` cannot serve — e.g. a spec demanding the bezier literal for named curves. If such a ruling exists, C-3 dissolves and C-1 becomes a documentation defect only (the copy affordance would still be handing out a non-reproducing string, so C-2 survives regardless).

---

### C-4 · MAJOR — 28 independent toggles where `ToggleGroup type="single"` is used 30 lines above

`:50–64` — the family filter, done right:

```html
<ToggleGroup type="single" :model-value="familyFilter" …>
  <ToggleGroupItem v-for="f in FAMILY_FILTERS" :key="f" :value="f" size="sm">
```

`:83–118` — the specimen grid, done by hand:

```html
<div ref="gridEl" class="specimen-grid" role="group" aria-label="Easing curve specimens">
  <Chip v-for="curve in visibleCurves" mode="selectable"
        :model-value="curve.name === demo.currentEasingName.value"
        @update:model-value="(on: boolean) => onTileToggle(curve.name, on)">
```

plus the hand-rolled single-select invariant at `:201–206` (`if (on) demo.selectEasing(name)`), duplicating the state machine `ToggleGroup type="single"` provides.

**Consequence, measured from the tree:** `EASING_GROUPS` minus `Custom` yields **28** specimen names under the "All" filter (`easingGroups.ts:27–103`: 5+3+3+4+3+3+3+1+3). Each `Chip mode="selectable"` renders a reka `Toggle` — a focusable `<button>` (`glass-ui/dist/chip-6ysLmScu.js`). So the drawer is **28 tab stops**, inside a `FadingScroll` root that is itself `tabindex="0"` (`glass-ui/dist/fading-scroll-DKsoe_vh.js`). The filter beside it, ten items, is **one** stop with arrow-key traversal (reka `ToggleGroupRoot` wraps its items in a roving-focus group).

**The glass look survives the fix.** `ToggleGroupItem` forwards `asChild` to reka (`glass-ui/dist/toggle-group-BWHkiLdP.js` — `props: { value, disabled, asChild, as, class, variant, size }`, spread through `useForwardProps`), so `<ToggleGroupItem :value="curve.name" as-child><Chip shape="cell">…</Chip></ToggleGroupItem>` composes today, on the installed 7.0.0, with no upgrade. This mirrors lane-frontend **S-1**'s finding shape (a bespoke pattern beside an available primitive) — but note the difference: S-1's blocker was a *stale* rationale; here there is **no stated rationale at all**.

**Honest counter, stated so this claim is not inflated:** the ARIA *roles* are identical either way. reka's `ToggleGroupRoot` renders `role="group"` (probe: `reka-ui/dist/ToggleGroup/ToggleGroupRoot.js` → `role: "group"`, no `aria-checked` anywhere in the family), and its items are `Toggle`s carrying `aria-pressed` — exactly what the 28 loose Chips already produce. **This is not an ARIA-conformance defect.** The defect is the 28-vs-1 keyboard burden and the duplicated selection machine.

**Falsifier** show `ToggleGroupItem as-child` failing to render a `Chip` cell (a reka `asChild` single-root violation, or a class-merge collision between `toggle-group__item tap-squish focus-ring` and `glass-chip--cell`), or produce a ruling that 28 sequential tab stops is the intended traversal. Either kills the MAJOR; the duplicated `if (on)` machine would remain a MINOR.

---

### C-5 · MAJOR — `NAMED_EASING_BEZIER` is a byte-exact shadow of value.js's `bezierPresets`, and the comment defending it is false

Reached from this component through `demo.isBezierEditable` (`useEasingDemo.ts:75` — `n in NAMED_EASING_BEZIER`), which is the switch that selects C-1's wrong branch. `NAMED_EASING_BEZIER` lives at `animationDescriptions.ts:16–49`, 29 entries.

value.js **publicly exports** the same table: `export declare const bezierPresets: Readonly<Record<BezierPresetName, readonly [number,number,number,number]>>` (`value.js/dist/subpaths/easing.d.ts`). keyframes.js's own registry builds from it (`src/animation/compile/easing/easing-registry.ts:30–34`). `EasingSidebar.vue:77` already imports it directly.

**Probe** — `bezierPresets` vs `NAMED_EASING_BEZIER`:

```
bezierPresets n= 30    NAMED_EASING_BEZIER n= 29
in presets NOT in table:  [ 'smooth-step-3' ]
in table NOT in presets:  []
VALUE DIFFERENCES:        NONE — every shared key is numerically identical
```

**CONTRADICTS the tree's own prose.** `EasingSidebar.vue:86–89` states:

> glass-ui's bezier catalogue is value.js `bezierPresets`; the demo's named map (NAMED_EASING_BEZIER) is **wider** (quart/quint) and **differs on some quads (sine)** — seed by PRESET only when the picker's own catalogue knows the name (the honest vendor seam; the wider-coverage ask is BG-8).

Both halves are false. `bezierPresets` is a strict **superset** (it adds `smooth-step-3`; quart and quint are in **both**), and all 29 shared keys are numerically **identical**. The sibling narrowed its seeding to defend against a divergence that does not exist, and the comment will mislead the next reader into preserving the shadow.

**S-9, value.js axis** (the analogue of lane-frontend's glass-ui S-1..S-8): a 34-line hand-maintained duplicate of a first-class published export, justified by a measurably false comment.

**Not a mechanical swap.** Repointing `isBezierEditable` at `bezierPresets` flips `smooth-step-3` into the bezier-editable set — a behaviour change, and one that would (correctly) make its literal a bezier. Wants a ruling, not a rename.

**Falsifier** a value.js version resolved at build time whose `bezierPresets` differs from the installed 4.0.0. The lockfile pins `"@mkbabb/value.js": "4.0.0"` exact (keyframes `package.json`, corroborated by lane-library §1), so this is not open.

---

### C-6 · MAJOR — value.js's Result API reaches three render-path sites through a throwing adapter, unguarded

`timingCurveUtils.ts:13–23` converts value.js's `Result<EasingFunction, EasingIssue>` into a throw:

```ts
const requireEasing = (result: EasingResult, source: string): EasingFunction => {
    if (!result.ok) throw new Error(`Invalid easing ${JSON.stringify(source)}: ${result.error.code}`);
    return result.value;
};
```

This component calls into it at three places, all on a render or wiring path, none guarded:

| site | call | context |
|---|---|---|
| `:195` | `fnForCurve(item.name)` | inside the `visibleCurves` **computed** |
| `:196` | `getCurvePath(item.name)` | same computed → `namedEasing` (`timingCurveUtils.ts:85`) |
| `:288` | `fnForCurve(el.dataset.curve ?? "")` | inside `wirePainter`, an **async** fn whose promise is discarded at `:313` and `:319–320` |

**Proven throw.** `easing("")` returns `{ ok:false, code:"easing_name_unknown" }` (probe against installed value.js 4.0.0), so `namedEasing("")` throws. The `?? ""` at `:288` is therefore a **fail-open default that converts "attribute missing" into a thrown exception** — and because `wirePainter` has already executed `unregisterPainter?.(); unregisterPainter = null; io?.disconnect();` at `:279–281` **before** reaching `:288`, a throw there leaves the grid with **no painter and no observer**: every ball in the drawer freezes, silently, as an unhandled rejection.

The same probe confirms the current 28 names are safe — `easing()` resolves all 25 non-step names including `ease-in-bounce`, and `steps`/`step-start`/`step-end` are special-cased before the registry (`:176`, `timingCurveUtils.ts:43–44`, `:78–83`). So the *live* crash is latent, not firing. What is live is the **coupling**: any name added to `easingGroups.ts` that value.js's registry does not know white-screens the scene at render, with no fallback tile and no boundary.

**The composable disagrees with the component about this.** `useEasingDemo.ts:308–315` wraps its adjacent value.js-facing call:

```ts
watch(cssValue, (v) => { try { previewAnim.setTimingFunction(v); } catch { /* fail-soft on the live edit path */ } });
```

One file, two postures toward the same library's failure modes. This is lane-library §4.6's R1 class (`useSquareTumble.ts:22 parseCssColor` — "the known R1 crash surface") in its registry form: a value.js `Result` flattened to a throw and then walked onto a Vue render path.

**Falsifier** demonstrate that `dataset.curve` can never be absent **and** that `easingGroups.ts` is gated against unknown names (a test asserting every `EASING_GROUPS` entry resolves). The first would demote `:288` to INFO; the second would demote `:195–196`. Neither gate exists in the tree — `grep` finds no such test under `test/demo/reference-data/`.

---

### C-7 · MINOR — `SpecimenCurve.fn` is dead payload

`:180–198` builds, for every visible tile, `{ name, fn, path }`. The template reads `curve.name` (`:85`, `:89`, `:110`, `:116`) and `curve.path` (`:101`). **`curve.fn` is never read** — `wirePainter` independently recomputes it from the DOM at `:288`.

Cost: `getCurvePath` is memoised (`timingCurveUtils.ts:69–89`, module `Map`); `namedEasing` is **not**. So every filter change allocates 28 fresh value.js easing closures into a field nothing reads, then `wirePainter` allocates 28 more.

**Falsifier** find a `.fn` read on a `visibleCurves` element (`grep -n "visibleCurves" EasingTarget.vue` → `:84`, `:319` only; neither destructures `fn`).

---

### C-8 · MINOR — `tileSnapshot[0]` is positional, in a file that declares the array unordered

`:283–284` states the doctrine and acts on it:

> Snapshot keyed by `data-curve` (**NOT v-for index — ref arrays carry no order guarantee**), stage = the ball's positioning parent.

Then `:270` and `:302` violate it for the one measurement every ball depends on:

```ts
const stage = tileSnapshot[0]?.stage;
if (stage) railWidth.value = stage.clientWidth;
```

`railWidth` feeds `tileBallXAt` (`:249–252`) for **all 28 balls**; at `railWidth = 0` the guard `maxX > 0` returns `0` and every ball parks at the origin. The mitigation at `:331` ("The grid is uniform-width tiles; one measure serves every rail") is true for width, and false for **whether the sampled tile is laid out at all**.

`.specimen-tile { content-visibility: auto; contain-intrinsic-size: auto 104px; }` (`EasingTarget.css:104–108`) applies size/layout containment to an off-screen tile, so a descendant `.tile-stage` inside a skipped subtree has no laid-out box. `useResizeObserver(gridEl, measureRailWidth)` (`:332`) fires on **any** grid resize — including a window resize while the drawer is scrolled down, at which point `tileSnapshot[0]` (top of grid, far above the port) is skipped.

**Falsifier — UNPROVEN-NEEDS-LIVE on the browser half.** Two independent kills: (a) show `clientWidth` on a descendant of a `content-visibility: auto` skipped subtree returning the pre-skip value rather than 0 in the target engines; or (b) show that Vue guarantees v-for ref arrays in DOM order *and* that entry 0 is always laid out. (a) is the SS-13 visual-audit probe. The doctrine violation at `:270`/`:302` is CONFIRMED static regardless of (a).

---

### C-9 · MINOR — `rootMargin: "25% 0px"` cannot pre-warm the drawer; `FadingScroll` exposes no scroll port

`:290–300` constructs the paint gate with the **default root** (`root: null` = viewport) and a 25% margin. `:243–245` states the intent:

> IntersectionObserver gates the paint walk: off-screen tiles (**the drawer scrolls**) take no transform writes.

The clipping half of that works — the IO algorithm intersects the target rect against every intermediate clipper, so a tile scrolled out of `.specimen-drawer` reports `isIntersecting: false`. The **pre-warm** half does not: `rootMargin` pads the *root* intersection rectangle only, and the drawer is an intermediate clipper, not the root. So tiles pre-warm 25% early relative to the **viewport** and 0% early relative to the **drawer** — the surface that actually scrolls. The comment at `:245` already concedes the residue ("a tile scrolling back in snaps to the live phase on the next observer tick"); the `rootMargin` was meant to buy that back and cannot.

The fix requires the scroll port, and **glass-ui does not hand it over**. `FadingScroll` **is** the scroller (probe, `dist/fading-scroll-DKsoe_vh.js`: its root `<div class="fading-scroll fading-scroll--y" tabindex="0">` is what the composable attaches `scroll` to and reads `scrollTop`/`scrollHeight` from), and its compiled component returns a render function with **no `defineExpose`** — the `.d.ts` expose slot is `{}`. The consumer's only route is `$el` on a component ref: a private-DOM reach.

**Letter owed to glass-ui** (standing BH/BI relay law): `FadingScroll` should expose its scroll port (`defineExpose({ scrollPort })` or an `IntersectionObserver`-root accessor), so consumers can gate paint work against the surface that actually scrolls. Filed alongside lane-frontend's BG-12 strip-posture letter, which already concerns this same component's root.

**Falsifier** show `rootMargin` propagating to intermediate clip rects (contradicts the IO spec), or show `.specimen-drawer` never overflowing (it is `flex-1 min-h-0` over a `auto-fill minmax(150px,1fr)` grid of 28 tiles — it overflows).

---

### C-10 · MINOR — the ball size is stated twice, across the JS/CSS boundary

`:228` `const BALL_SIZE = 14;` vs `EasingTarget.css:163` `--ball-size: 14px;`. `tileBallXAt` (`:250`) subtracts the JS constant; the rendered ball takes the CSS one. They are not linked.

The shared idiom this scene consumes defaults to **36px** — `demo/styles/design-idioms.css:180–181`, `width: var(--ball-size, 36px)`. So any path where the scoped `--ball-size` fails to land (a selector-specificity change, a scoped-CSS boundary shift) yields a 36px ball travelling a rail computed for a 14px one: a 22px overrun past the terminus tick that `EasingTarget.css:155–157` draws.

**Falsifier** show the two are structurally linked (a shared token module, or a `getComputedStyle` read). Neither exists.

---

### C-11 · MINOR — the `steps` tile and the `steps` literal are two different curves

`:175–178` gives `steps` a hard-coded static portrait (`steppedEasing(4, "jump-end")`), and `getCurvePath("steps")` memoises `generateStepSVGPath(4)` into a module-level cache **permanently** (`timingCurveUtils.ts:69–89`). Meanwhile `:212` renders the literal from the **live** `demo.stepOptions.value`, which `EasingSidebar`'s `EasingPicker` writes in steps mode (`EasingSidebar.vue:100–110`).

Set the step count to 8: the header reads `steps(8, jump-end)` while the pressed tile immediately below it draws and races a 4-step staircase. The header names the *selected* specimen, so the two disagree about the same curve on the same screen.

`:172–174` concedes the design ("Parameterized entries get honest static defaults … the selected curve's live parameters ride the header literal + the sidebar editor, not the tile"), so this is a **known** seam. What the concession does not cover is the *pressed* tile: for the 26 non-parameterized specimens the pressed tile IS the literal, and for these two it is not — a rule the surface gives the viewer no way to learn.

**Falsifier** show `stepOptions` is not user-writable while a `steps` tile is pressed. `EasingSidebar.vue:29–38` mounts the picker with `:steps`/`:term` and `@update:model-value="onPickerChange"` in exactly that state.

---

### C-12 · INFO — the only keyframes.js import is an erased type, and it is mis-sourced

`:141` `import type { TimingFunction } from "@mkbabb/keyframes.js"` — used at `:175`, `:182`, `:239`, `:249`. `import type` is erased, so **`EasingTarget.vue` links zero runtime keyframes.js symbols.** Every moving thing in the demo's easing showcase is a value.js easing closure driven by a hand-written rAF painter.

The type is also the wrong library's. keyframes declares `TimingFunction = (t: number) => number` (`src/animation/constants/types.ts:45`); value.js declares `EasingFunction = (progress: number) => number`. Structurally identical — so this is type-safe, and a **provenance** error, not a correctness one: the values annotated are value.js `EasingFunction`s produced by `timingCurveUtils`, which already imports that exact type (`timingCurveUtils.ts:5`).

**The honest counter, stated in full.** Per-ball engine animations were *measured* and rejected: `useEasingDemo.ts:144–157` records 21.6 ms/frame and ~46 fps from reactive per-frame writes, and the painter registry is the documented cure. The engine-free tile painter is **defensible**. What is not defensible is that keyframes.js publishes `resolveEasing(name) → Promise<Easing { fn, css? }>` (`src/animation/index.ts:151`) — a fail-explicit name resolver that returns the callable **and its faithful CSS twin together**, behind the LIGHT/HEAVY firewall (lane-library §3.3) — and the demo hand-rolls `namedEasing` + `cubicBezierToString` instead, which is exactly how C-1 happens.

The obstacle is real and must be named: `resolveEasing` is `async` (it awaits the dynamic registry chunk), so it cannot sit inside a synchronous `computed`. But `wirePainter` (`:277`) is **already async** and already awaits — the pre-resolve has a home.

Contrast lane-frontend **S-8**: `TypingDots` is kept bespoke precisely *because* it dogfoods the engine ("the demo's signature animation IS the library"). The easing scene's target does the opposite.

**Falsifier** find a runtime keyframes.js symbol in this file (`grep -n "keyframes.js" EasingTarget.vue` → line 141 only, `import type`), or a ruling that the specimen drawer is deliberately engine-free.

---

### C-13 · INFO — undeclared, unguarded injection contract; asymmetric with the sibling

`:152` `const demo = inject(EASING_DEMO_KEY)!;` — zero props, zero emits, zero defineExpose. The component's **entire** contract is an undeclared injection with a non-null assertion. Mounted outside `EasingScene`, `demo` is `undefined` and the first template access (`:28`) throws.

The sibling takes the identical object as a **declared prop**: `EasingSidebar.vue:82` `const props = defineProps<{ demo: EasingDemoContext }>()`. `EasingScene.vue` does **both** — `provide(EASING_DEMO_KEY, demo)` at `:21` and `h(EasingSidebar, { demo })` at `:57`.

**The asymmetry is justified and I will not call it a defect:** `tabsContent` renders the sidebar into the routed controls pane, i.e. under a *different* parent chain, where `inject` would resolve against the wrong tree — the exact hazard `CubeScene.vue:43` documents ("(re-sourced from reka-ui here) are now ORPHANS — this throws 'Injection…'"). The prop is the correct mechanism there.

What remains is the **posture**: the `!` carries no guard, no dev-mode message, and no typed error, one scene away from a comment describing that failure. Cost of the fix is one line.

**Falsifier** show `EasingTarget` is unconditionally rendered inside `EasingScene`'s own subtree (it is, `EasingScene.vue:3`) **and** that a guard adds no diagnostic value. The first is true; the second is a judgement call, which is why this is INFO and not MINOR.

---

### C-14 · AMBER — inherited F-1

Four of this file's six imports (`:136–139`) resolve against a package that is **declared nowhere**: lane-frontend **F-1** measured `@mkbabb/glass-ui` absent from both `package.json` and `package-lock.json` while 7.0.0 sits in `node_modules`. Re-confirmed on this tree: `grep -c "glass-ui" package-lock.json → 0`.

`npm ci` reconstructs strictly from the lockfile, so a clean checkout has no `Card`, no `FadingScroll`, no `Chip`, no `ToggleGroup` — and this component is one of the 37 `.vue` files that will not compile. Recorded here only to bind the dependency: **every glass-ui recommendation in this challenge (notably C-4) is blocked on F-1 landing first** (lane-frontend §10 step 1).

**Falsifier** a `@mkbabb/glass-ui` entry appearing in `package-lock.json`.

---

## 3. Superlatives (L-18 both ways)

**L-1 · The painter seam is correct by construction, not by synchronisation.** `:222–259` + `useEasingDemo.ts:144–167`. One clock, one `livePhaseValue`, one imperative walk writing `style.transform` and nothing else. The scene's central claim — "all balls depart together, arrive per their curve" (`:8–9`) — is not maintained by keeping 28 animations in sync; it is **impossible to violate**, because every ball reads the same scalar in the same pass. Most demos of this shape hold 28 clocks and drift. **Falsifier:** find a second phase source feeding any tile (`repaintDots` is the sole entry, `usePainterRegistry(() => [livePhaseValue])`).

**L-2 · The import boundary is clean at every layer.** Four glass-ui **subpaths** deep-imported, only `Card` from the root barrel; **zero** `reka-ui` imports; **zero** local `ui/` vendoring; and value.js reached only through subpaths — which is forced, since value.js 4.0.0 publishes **no root export** (lane-library §1, "a rootless capability package"), so a lazy `from "@mkbabb/value.js"` would not even resolve. Corroborates lane-frontend **F-6**. **Falsifier:** a `reka-ui` or bare-`value.js` specifier in this file or its first-hop imports — none present.

**L-3 · The `data-curve` keying is right, and for the right reason.** `:283–289` refuses to trust v-for ref-array order and re-derives identity from the DOM. That is a genuine Vue hazard, correctly diagnosed. (C-8 is not a contradiction of L-3 — it is the file failing to apply its own correct doctrine 18 lines later.)

**L-4 · The controlled-toggle invariant is correct against reka's actual semantics.** `:89–92` binds `:model-value` to a value that is **always** a boolean, never `undefined` — so reka's `useVModel` `passive` flag resolves `false` and the `Toggle` is fully controlled. The ignored `false` emit at `:203–205` therefore cannot desync the pressed state; the prop reasserts it. A bound-only-sometimes model would have made this a stateful bug. **Falsifier:** a path where `demo.currentEasingName` is `undefined` at first render (`useEasingDemo.ts:36` seeds `"ease"`).

**L-5 · Reduced motion is answered at the paint layer, not just the cascade.** Three coordinated sites: CSS transition suppression (`EasingTarget.css:48–53`), a JS rest-state paint that puts every ball at `fn(1)` so the sparklines carry the pedagogy (`:263–267`), and a **re-wire on change** (`:320`) so a mid-session preference flip is honoured. Per lane-frontend §6.5 this is the demo's sole `useMediaQuery` site out of 13 PRM enforcement points — and the only one with a paint-layer answer rather than a CSS-only one. **Falsifier:** a rAF path still writing transforms under PRM (`:304–307` returns before `registerDotPainter`).

**L-6 · Off-screen work is gated in layers, at the right layers.** IO gates the **paint walk** (`:255–258`), `content-visibility: auto` gates **style/layout** (`.css:104–108`), and `contain-intrinsic-size: auto 104px` keeps the scrollbar honest. The `.css:101–103` comment states exactly that division. Three mechanisms, no overlap, each on the cost it actually owns. (C-8's measurement hazard is a *consequence* of L-6 being aggressive, not a reason it was wrong.)

---

## 4. Tally · dependencies · letters

| | count |
|---|--:|
| defects | **14** (C-1 … C-14) |
| of which BLOCKER | **1** (C-1) |
| MAJOR | 5 (C-2, C-3, C-4, C-5, C-6) |
| MINOR | 5 (C-7 … C-11) |
| INFO | 2 (C-12, C-13) · AMBER 1 (C-14) |
| superlatives | **6** (L-1 … L-6) |
| claims marked UNPROVEN-NEEDS-LIVE | 1 (C-8, browser half only) |

**Repair order.** C-3 is the single edit that discharges C-1 *and* C-2 for this surface (bind `demo.cssValue`, delete `literal` and the `:140` value.js/math import). C-5 wants an owner ruling before the swap (`smooth-step-3` changes class). C-6 is one guard plus one test over `EASING_GROUPS`. C-4 is blocked on **F-1** (C-14).

**Cross-repo letters owed** (standing BH/BI relay law):
1. **glass-ui** — `FadingScroll` exposes no scroll port; consumers cannot root an `IntersectionObserver` on the surface that actually scrolls without reaching for `$el` (C-9). Pairs with lane-frontend's BG-12 on the same component.
2. **glass-ui** — a selectable **chip group**: `ToggleGroup type="single"` + `Chip shape="cell"` compose today only via `as-child`; a first-class pairing would retire the hand-rolled grid (C-4).
3. **value.js** — `cubicBezierToString` fixes at 2 decimals with no precision parameter, while glass-ui's own picker uses 3 (C-2). A demo that must print a *re-parseable* literal cannot use the published formatter. Ties to the V·π parser-proof gate's round-trip fidelity concern.

**Provenance.** Every glass-ui and value.js claim is sourced from the copies **installed in the census target** (`keyframes.js/node_modules/@mkbabb/{glass-ui@7.0.0, value.js@4.0.0}`) — so every cure is available without an upgrade. Numeric probes were `node -e` reads of those dist bundles. No file in keyframes.js, glass-ui, or value.js was written, mutated, or executed as a product; no installs and no dev servers were run; no browser tooling was used.
