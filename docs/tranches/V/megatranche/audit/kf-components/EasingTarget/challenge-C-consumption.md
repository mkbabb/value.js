claude-opus-5[1m]

# Challenge · `EasingTarget.vue` · axis C — CONSUMPTION

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/easing/EasingTarget.vue` (335 L) + `EasingTarget.css` (194 L)
**Substrate** keyframes.js working tree as read **2026-08-04**. `EasingTarget.vue`, `EasingSidebar.vue`, `useEasingDemo.ts` are ` M` dirty against HEAD — every citation is against the **working tree**, not HEAD.
**Mode** static + read-only. No writes to any product tree; no installs; no dev servers; no browser tooling. Runtime probes are `node -e` evaluations of the **installed** `node_modules/@mkbabb/value.js@4.0.0` and `@mkbabb/glass-ui@7.0.0` dist bundles — reads only.
**Corpus folded** `formation/keyframes/lane-frontend.md` (F-1 phantom dep; S-1..S-8 shadow census; §3.1 subpath utilisation; §6.5 PRM sites) and `lane-library.md` (§1 value.js rootlessness; §3.3 LIGHT/HEAVY firewall; §4.1 A5/A6 `parseTimingFunction`; §4.6 the R1 blast radius). Census ids are cited where they overlap and **CONTRADICTS** is marked, with its probe, where the tree disagrees with prose — the corpus's or the component's own.

**Provenance of this document.** This is a **two-pass** challenge. Pass 1 established C-1..C-14 and L-1..L-6. Pass 2 was run **independently** against the same tree and (a) re-verified pass 1's load-bearing probes from scratch, (b) **escalated C-2 to BLOCKER** on new evidence, and (c) added C-15..C-22 and L-7..L-8. Where pass 2 reached a *stronger* claim than pass 1 could support, pass 1's more careful wording was kept — see C-4, where pass 2's ARIA-conformance claim was **killed** by pass 1's probe of reka's actual roles. Nothing from pass 1 was dropped.

**Posture** the component was assumed defective until the tree proved otherwise. It proved otherwise on eight counts (§3). It failed on twenty-two (§2). Two are BLOCKERs, and both are measurable rather than aesthetic: **the literal this component prints and hands to the clipboard is neither the curve it animates (C-1) nor precise enough for its own scene to read back (C-2).**

---

## 0. Headline

| # | finding | sev |
|---|---|---|
| **C-1** | The header literal is **not the curve on screen** for 7 of 28 specimens — drift up to **0.163** (16.3% of range). The CopyButton hands the wrong literal to the clipboard. | **BLOCKER** |
| **C-2** | `cubicBezierToString` is **2-dp lossy**; 16 of 23 bezier literals truncate, and **15/15 of the lossy ones exceed the sibling's own `quadEq` 0.0005 re-match tolerance** — the scene cannot read back its own output. Three comments in this scene claim "never truncated". | **BLOCKER** ↑ |
| C-3 | `literal` re-derives `demo.cssValue` — which the composable exports and the preview animation consumes — and diverges from it by construction. | MAJOR |
| C-4 | The 28-tile grid hand-rolls single-select over independent `Chip`s while `ToggleGroup type="single"` is used **30 lines above in the same file**. 28 tab stops vs 1 + arrows. | MAJOR |
| C-5 | `NAMED_EASING_BEZIER` is a **29/29 byte-exact shadow** of value.js's public `bezierPresets`. The sibling comment defending the shadow is **measurably false**. | MAJOR |
| C-6 | value.js's `Result` API is consumed through a **throwing** adapter at three render-path sites with **zero** guard; `namedEasing("")` is proven to throw. The composable guards its adjacent seam; this component does not. | MAJOR |
| **C-15** | Overshoot balls are **clipped out of existence** by the tile's own `content-visibility: auto` paint containment. `ease-in-bounce` peaks at `+0.1827` → ≈ 0.1 px of a 14 px ball survives. The sparkline was sized for overshoot; the rail was not. | MAJOR |
| **C-16** | **Nothing type-checks this file.** CI runs `check:lib` (`src/` only); the local `check` is plain `tsc`, which cannot parse `.vue`; `vue-tsc` is not a dependency. Every glass-ui prop/emit contract here is unverified. | MAJOR |
| **C-17** | Both `FadingScroll` mounts are **unconditional `tabindex="0"` with no `ariaLabel`** → two nameless, role-less keyboard tab stops. | MAJOR |
| C-7 | `SpecimenCurve.fn` is dead payload — 28 easing closures allocated per filter change and never read. | MINOR |
| C-8 | `tileSnapshot[0]` is a **positional** read from an array this same file declares unordered (`:283`); under `content-visibility: auto` it can measure 0 and park every ball at the origin. | MINOR |
| C-9 | `rootMargin: "25% 0px"` **cannot** pre-warm the drawer — `root: null` pads the viewport, not the intermediate clipper. `FadingScroll` exposes no scroll port. | MINOR |
| C-10 | `BALL_SIZE = 14` duplicates `--ball-size: 14px` across the JS/CSS boundary; the shared idiom's fallback is 36px. | MINOR |
| C-11 | The `steps` tile is decoupled from `demo.stepOptions` and its path is memoised at n=4 forever, while the literal directly above it reads the live value. | MINOR |
| **C-18** | `ToggleValue` (`:164`) is a hand-rolled mirror of reka's `AcceptableValue` that has **already drifted** — adds `boolean`, omits `bigint`. glass-ui leaks the type in a public emit signature without re-exporting it. | MINOR |
| **C-19** | `design-idioms.css:162–163` documents `--ball-size` as "**the seam EasingTarget reads via `getComputedStyle`**". This component never calls `getComputedStyle`. The shared idiom sheet carries a false contract naming this exact file. | MINOR |
| **C-20** | `@mkbabb/value.js/css` — 41.6 KB, the module that exports **`parseCssColor`** (the R1 crash surface) — enters the gallery's static graph for **two frozen data tables**. | MINOR |
| **C-21** | `EasingTarget.css:169` credits "**ToggleChip**", which glass-ui 7.0.0 does not export (census **S-2** class); `Chip`'s first-class `tone` prop is unused in favour of reaching into the vendor's `[data-state]` subtree. | MINOR |
| C-12 | The component's **only** keyframes.js import is an erased type, and it is the wrong library's type. Zero runtime engine symbols in the demo's easing showcase. | INFO |
| C-13 | Undeclared, unguarded injection contract (`inject(...)!`), asymmetric with the sibling's declared prop. | INFO |
| **C-22** | A sidebar drag flips the name to `"cubic-bezier"`, which the gallery filters out by construction → all 28 tiles unpress at once, with no cue. | INFO |
| C-14 | Inherits **F-1**: 4 of this file's 6 imports resolve only by accident of the current `node_modules`. | AMBER |
| **L-1..L-8** | eight superlatives — §3 | — |

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

Transitive value.js reach, one hop through `@utils/reference-data/timingCurveUtils`: `CubicBezier`, `easing`, `steppedEase`, `EasingFunction`, `JumpPosition` from `@mkbabb/value.js/easing` (`timingCurveUtils.ts:1–7`). A **second** hop, through `@utils/reference-data/easingGroups` → `animationDescriptions.ts:128`, reaches `@mkbabb/value.js/css` (C-20). So the specimen drawer's every curve, sparkline and ball is a **value.js** artefact, reached through a demo-owned throw-adapter (C-6), and the parser subpath rides along for two constants.

One note on the root-barrel asymmetry at `:136`: glass-ui 7.0.0 **does** publish `./card` (`dist/card.js`, 217 B, one chunk edge) versus the root entry's 23,938 B and 44 static chunk edges. Four imports, two conventions, one line apart. The bundler may prune the difference (`sideEffects: ["*.css"]`, and no `.css` specifier survives in the built chunks), so this is recorded inside L-2 as the one blemish on an otherwise clean boundary rather than as a defect — the worst case is bounded and unmeasured here.

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

`isBezierEditable` (`useEasingDemo.ts:73–76`) is `n === "cubic-bezier" || n in NAMED_EASING_BEZIER`. **23 of the 28 specimen names are in `NAMED_EASING_BEZIER`**, so branch `:216` — not the `return name` at `:219` — renders for the overwhelming majority of tiles. The comment at `:216–219` ("An engine-named curve … the name IS the literal") describes a branch that is **unreachable for 23 of 28 specimens**, and its own first worked example, `ease-in-out-sine`, is one of the 23 (`animationDescriptions.ts:26`). The author's model of the code has diverged from the code — which is why this reads as a defect, not a design choice.

The ball, meanwhile, is driven by `fnForCurve` → `namedEasing(name)` → **`easing(name)` from value.js** (`:175–178`, `:288`; `timingCurveUtils.ts:42–46`). value.js's `easing()` does **not** resolve those names through `bezierPresets` — it consults an **analytic registry first** (`dist/subpaths/easing.js:205–224`, then `:255–259`: `if (Object.hasOwn(_, n)) return e(_[n]);` *before* the bezier `PRESETS` table), for exactly the names it also exports as standalone consts (`easeInOutCirc`, `easeInOutExpo`, `easeOutCubic`, `easeInOutCubic`, `easeInOutQuad`, `easeInOutSine`, `easeOutExpo`, `smoothStep3`, `easeInBounce`).

**Probe** (`node`, installed value.js 4.0.0; `max |easing(name)(t) − CubicBezier(NAMED_EASING_BEZIER[name])(t)|`, t ∈ [0,1]). Pass 1 sampled at 201 points, pass 2 re-ran at 1001 — same ranking, same magnitudes:

| specimen | max drift | at t | literal printed | curve drawn |
|---|--:|--:|---|---|
| `ease-in-out-circ` | **0.1635** | 0.487 | `cubic-bezier(0.79, 0.14, 0.15, 0.86)` | analytic circ |
| `ease-in-out-expo` | **0.1339** | 0.511 | `cubic-bezier(1.00, 0.00, 0.00, 1.00)` | analytic expo |
| `ease-out-expo` | 0.0370 | 0.051 | `cubic-bezier(0.19, 1.00, 0.22, 1.00)` | analytic expo |
| `ease-in-out-cubic` | 0.0247 | 0.253 | `cubic-bezier(0.65, 0.04, 0.35, 1.00)` | analytic cubic |
| `ease-out-cubic` | 0.0222 | 0.256 | `cubic-bezier(0.21, 0.61, 0.35, 1.00)` | analytic cubic |
| `ease-in-out-quad` | 0.0192 | 0.448 | `cubic-bezier(0.46, 0.03, 0.52, 0.95)` | analytic quad |
| `ease-in-out-sine` | 0.0175 | 0.657 | `cubic-bezier(0.45, 0.05, 0.55, 0.95)` | analytic sine |
| the other 16 | 0.0000 | — | — | — |

At the grid's 150 px column floor (`EasingTarget.css:94`), `maxX ≈ 120 px`, so for `ease-in-out-circ` the advertised literal places the ball **≈ 19.6 px** from the specimen the user is watching, at mid-sweep — in a scene whose stated thesis is "the comparative read IS the pedagogy" (`:9–10`).

The library itself already ruled on this. `keyframes.js/src/animation/easing.ts:41–47` (verified present, pass 2):

> The faithful CSS easing string for an easing NAME / literal, or `undefined` when the name has no faithful CSS twin (value.js bespoke curves — `easeOutCubic`, `bounceInEase` — do **NOT** map to a CSS keyword).

`cssTwinFor` (`:50`) returns `undefined` for exactly these names, and `constants/types.ts` documents the `Easing { fn, css? }` pair as the cure for precisely this drift. **This component re-invents that pairing by hand and re-introduces the drift the type exists to prevent.**

`demo.cssValue` (`useEasingDemo.ts:93–104`) already returns the bare **name** for every non-`cubic-bezier`/non-`steps` curve — the correct answer by the library's own doctrine, and the one the preview animation actually consumes (`:308–315`). Three representations of one selection therefore coexist: the tile fn (analytic), the engine's timing function (name → analytic), and the header literal (bezier approximation). Only the header disagrees.

**Cure** delete `literal`; bind `demo.cssValue`.
**Falsifier** show `easing(name)` and `CubicBezier(NAMED_EASING_BEZIER[name])` agreeing to within display precision for all 23 names — a max drift below ~0.002 everywhere. Executed twice at two sample densities: 0.1635 worst. Also killed if `demo.bezierControlPoints` held something other than `NAMED_EASING_BEZIER[name]` under a named selection — but `selectEasing` (`useEasingDemo.ts:246–259`) seeds it from exactly that table.

---

### C-2 · **BLOCKER** (escalated in pass 2) — `cubicBezierToString` truncates; three comments say it does not; and the scene cannot read its own output back

`cubicBezierToString` is imported at `:140` from `@mkbabb/value.js/math` and is, verbatim (`value.js/dist/subpaths/math.js`):

```js
function c(e, t, n, r) { let i = (e) => e.toFixed(2); return `cubic-bezier(${i(e)}, ${i(t)}, ${i(n)}, ${i(r)})`; }
```

Two decimals, zero-padded, unconditional, on all four components. Across the 23 named specimens **16 literals are lossy**, with curve-output drift up to **0.0101** (`ease-in-out-back`) purely from rounding — *on top of* C-1's registry drift.

Three sites in this scene assert the opposite:

- `EasingTarget.vue:208` — "The header literal — **COMPLETE and re-parseable, never truncated**"
- `EasingTarget.css:55–56` — "The complete re-parseable literal: Fira Code, wraps (**never truncates**)"
- `EasingSidebar.vue:8` — "the COMPLETE re-parseable readout literal with copy — **the F7 truncation class is dead by construction**"

The CSS comment is defensible (it is about visual wrapping); `:208` and the sidebar's are claims about the **string**, and the string is truncated numerically by the value.js formatter this component chose. `.literal-text { overflow-wrap: anywhere }` (`css:64–67`) cures visual truncation and is mistaken here for curing the numeric kind.

**Pass 2's escalation — the scene cannot re-identify its own output.** `EasingSidebar.vue:172` defines the demo's re-match tolerance:

```ts
const quadEq = (a, b) => a.every((v, i) => Math.abs(v - b[i]!) < 0.0005);
```

Probe over `NAMED_EASING_BEZIER`: **15 of 23 quads round, and all 15 round by more than 0.0005** — e.g. `0.445 → 0.45` (Δ 0.005, 10× tolerance), `0.075 → 0.07`, `0.735 → 0.73`. So paste the header's own copied literal back into the same scene's picker and `nameForQuad` (`EasingSidebar.vue:176–181`) fails to recognise it, routing an `ease-out-back` round-trip into `demo.updateBezierPoints` (`:210`) as an **authored custom curve**. The demo's two halves cannot round-trip a string the demo itself produced and offered for copying. That is what moves C-2 from MAJOR to BLOCKER: it is no longer a documentation defect, it is a functional one with a reproducible failure inside a single scene.

**And the same scene shows two literals for the same curve at two precisions.** glass-ui's `EasingPicker` — mounted at `EasingSidebar.vue:29–38` — builds its own readout at **3** decimals (probe, `glass-ui/dist/easing.js`, `toFixed(3)` confirmed):

```js
let [e, t, r, a] = i.value.map((e) => +e.toFixed(3));
return `cubic-bezier(${e}, ${t}, ${r}, ${a})`;
```

For `ease-in-out-sine` the sidebar reads `cubic-bezier(0.445, 0.05, 0.55, 0.95)` (exact) while the header two panels away reads `cubic-bezier(0.45, 0.05, 0.55, 0.95)` (lossy). **Both surfaces are copyable. They disagree.**

Root cause on the consumption axis: value.js 4.0.0 ships `parseTimingFunction` (`dist/subpaths/css.d.ts:252`) but **no lossless timing-function serializer** — `serializeCssColor` and `serializeTimelineOptions` exist, `serializeTimingFunction` does not. The consumer papered the asymmetry over with a *math* helper whose `toFixed(2)` is a formatting convenience, not a serialization contract, and documented the result as lossless.

**Falsifier** show `cubicBezierToString` emitting ≥3 significant decimals in the version resolved at build time, or show the picker and the header never co-render. Neither holds: the lockfile pins `@mkbabb/value.js: 4.0.0` exact, the probe is against that exact installed copy, and `EasingScene.vue:3`/`:57` mount both surfaces.

---

### C-3 · MAJOR — `literal` is a redundant, divergent re-derivation of `demo.cssValue`

`useEasingDemo.ts:93–104` already exports `cssValue`, computed with the **same three branches** but a **different** middle condition — `name === "cubic-bezier"` where the component uses `demo.isBezierEditable.value`. That single substitution is the whole of C-1's mechanism.

`cssValue` is not decorative: it is what `previewAnim.setTimingFunction(v)` consumes (`useEasingDemo.ts:308–315`), i.e. **the value the engine actually animates with**, and it is exported on the context (`:384`). The component chose to import `cubicBezierToString` from `@mkbabb/value.js/math` (`:140`) — the composable's own line-2 import — solely to compute a competing answer to a question its scene composable had already answered correctly.

This is the integration-seam defect underneath C-1 and C-2: the component reaches **past** its scene composable into a value.js formatting subpath to re-derive state the composable owns.

**Falsifier** find a consumer requirement `demo.cssValue` cannot serve — e.g. a ruling demanding the bezier literal for named curves. If such a ruling exists, C-3 dissolves and C-1 becomes documentation-only; C-2 survives regardless, because the copy affordance would still hand out a string the scene cannot read back.

---

### C-4 · MAJOR — 28 independent toggles where `ToggleGroup type="single"` is used 30 lines above

`:50–64` — the family filter, done right:

```html
<ToggleGroup type="single" :model-value="familyFilter" …>
  <ToggleGroupItem v-for="f in FAMILY_FILTERS" :key="f" :value="f" size="sm">
```

`:83–118` — the specimen grid, done by hand, plus the hand-rolled single-select invariant at `:201–206` (`if (on) demo.selectEasing(name)`), duplicating the state machine `ToggleGroup type="single"` provides.

**Consequence, measured from the tree:** `EASING_GROUPS` minus `Custom` yields **28** specimen names under "All" (`easingGroups.ts:27–103`). Each `Chip mode="selectable"` renders a reka `Toggle` — a focusable `<button>` (`glass-ui/dist/chip-6ysLmScu.js`). So the drawer is **28 tab stops**, inside a `FadingScroll` root that is itself `tabindex="0"` (C-17). The filter beside it, ten items, is **one** stop with arrow-key traversal.

**The glass look survives the fix.** `ToggleGroupItem` forwards `asChild` to reka (`glass-ui/dist/toggle-group-BWHkiLdP.js` — `useForwardProps` over `{ value, disabled, asChild, as, class, variant, size }`; re-verified pass 2), so `<ToggleGroupItem :value="curve.name" as-child><Chip shape="cell">…</Chip></ToggleGroupItem>` composes today on the installed 7.0.0, with no upgrade. Mirrors lane-frontend **S-1**'s shape (a bespoke pattern beside an available primitive) — with the difference that S-1's blocker was a *stale* rationale, whereas here there is **no stated rationale at all**.

**Honest counter, kept from pass 1 because it killed a pass-2 overclaim.** Pass 2 asserted that AT would announce 28 unrelated toggles rather than one selection set — **false**, and pass 1's probe is why: reka's `ToggleGroupRoot` renders `role="group"` (`reka-ui/dist/ToggleGroup/ToggleGroupRoot.js`, no `aria-checked` anywhere in the family) and its items are `Toggle`s carrying `aria-pressed` — exactly what the 28 loose Chips already produce. **This is not an ARIA-conformance defect.** The defect is the 28-vs-1 keyboard burden and the duplicated selection machine.

**Falsifier** show `ToggleGroupItem as-child` failing to render a `Chip` cell (a reka `asChild` single-root violation, or a class-merge collision between `toggle-group__item tap-squish focus-ring` and `glass-chip--cell`), or produce a ruling that 28 sequential tab stops is the intended traversal. Either kills the MAJOR; the duplicated `if (on)` machine remains MINOR.

---

### C-5 · MAJOR — `NAMED_EASING_BEZIER` is a byte-exact shadow of value.js's `bezierPresets`, and the comment defending it is false

Reached from this component through `demo.isBezierEditable` (`useEasingDemo.ts:75` — `n in NAMED_EASING_BEZIER`), which is the switch that selects C-1's wrong branch. The table lives at `animationDescriptions.ts:16–49`, 29 entries.

value.js **publicly exports** the same table (`dist/subpaths/easing.d.ts`: `bezierPresets: Readonly<Record<BezierPresetName, readonly [number,number,number,number]>>`); keyframes.js's own registry builds from it (`src/animation/compile/easing/easing-registry.ts:30–34`); `EasingSidebar.vue:77` already imports it directly.

**Probe** (re-run in pass 2, identical result):

```
bezierPresets n= 30    NAMED_EASING_BEZIER n= 29
in presets NOT in table:  [ 'smooth-step-3' ]
in table NOT in presets:  []
VALUE DIFFERENCES:        NONE — every shared key is numerically identical
```

**CONTRADICTS the tree's own prose.** `EasingSidebar.vue:86–89`:

> glass-ui's bezier catalogue is value.js `bezierPresets`; the demo's named map (NAMED_EASING_BEZIER) is **wider** (quart/quint) and **differs on some quads (sine)** — seed by PRESET only when the picker's own catalogue knows the name.

Both halves are false. `bezierPresets` is a strict **superset** (it adds `smooth-step-3`; quart and quint are in **both**), and all 29 shared keys are numerically **identical**. The sibling narrowed its seeding to defend against a divergence that does not exist, and the comment will mislead the next reader into preserving the shadow.

**S-9, value.js axis** (the analogue of lane-frontend's glass-ui S-1..S-8): a 34-line hand-maintained duplicate of a first-class published export, justified by a measurably false comment.

**Not a mechanical swap.** Repointing `isBezierEditable` at `bezierPresets` flips `smooth-step-3` into the bezier-editable set — a behaviour change, and one that would (correctly) make its literal a bezier. Wants a ruling, not a rename.

**Falsifier** a value.js version resolved at build time whose `bezierPresets` differs from the installed 4.0.0. The lockfile pins `4.0.0` exact.

---

### C-6 · MAJOR — value.js's `Result` API reaches three render-path sites through a throwing adapter, unguarded

`timingCurveUtils.ts:13–23` flattens value.js's `Result<EasingFunction, EasingIssue>` into a throw:

```ts
const requireEasing = (result: EasingResult, source: string): EasingFunction => {
    if (!result.ok) throw new Error(`Invalid easing ${JSON.stringify(source)}: ${result.error.code}`);
    return result.value;
};
```

Three call sites here, all on a render or wiring path, none guarded:

| site | call | context |
|---|---|---|
| `:195` | `fnForCurve(item.name)` | inside the `visibleCurves` **computed** |
| `:196` | `getCurvePath(item.name)` | same computed → `namedEasing` (`timingCurveUtils.ts:85`) |
| `:288` | `fnForCurve(el.dataset.curve ?? "")` | inside `wirePainter`, an **async** fn whose promise is discarded at `:313`, `:319–320` |

**Proven throw.** `easing("")` returns `{ ok:false, code:"easing_name_unknown" }` (`dist/subpaths/easing.js:255–259`; `"" in d` false, `Object.hasOwn(_, "")` false), so `namedEasing("")` throws. The `?? ""` at `:288` is a **fail-open default that converts "attribute missing" into a thrown exception** — and because `wirePainter` has already run `unregisterPainter?.(); unregisterPainter = null; io?.disconnect();` at `:279–281` **before** reaching `:288`, a throw there leaves the grid with **no painter and no observer**: every ball freezes, silently, as an unhandled rejection. Contrast the sibling's posture at the equivalent seam (`useEasingDemo.ts:308–315`, `try/catch` with a documented fail-soft) — one scene, two postures toward the same library's failure modes.

**The live crash is latent, and pass 2 proved it so** (see N2): `easing()` resolves all 25 non-step specimen names — including `ease-in-bounce` and `smooth-step-3`, which are absent from the bezier `PRESETS` table but present in the analytic registry — and `steps`/`step-start`/`step-end` are special-cased before the registry (`:176`; `timingCurveUtils.ts:43–44`, `:78–83`). What is live is the **coupling**: any name added to `easingGroups.ts` that value.js's registry does not know white-screens the scene at render, with no fallback tile and no boundary. This is lane-library §4.6's R1 class in its *registry* form — a value.js `Result` flattened to a throw and walked onto a Vue render path.

**Falsifier** demonstrate `dataset.curve` can never be absent **and** that `easingGroups.ts` is gated against unknown names (a test asserting every `EASING_GROUPS` entry resolves). Neither gate exists; `grep` finds no such test under `test/demo/reference-data/`.

---

### C-15 · MAJOR — overshoot balls are clipped out of existence by the tile's own paint containment

`EasingTarget.css:105` sets `content-visibility: auto` on `.specimen-tile`. Per CSS Contain L2 §4, `content-visibility: auto` **turns on layout, style and paint containment unconditionally** — the skipping is the *additional* behaviour when off-screen. Paint containment clips the subtree to the element's padding box.

The tile is a glass-ui `Chip shape="cell"`, whose geometry is `px-2 py-2.5` (`glass-ui/dist/components/chip/chipVariants.d.ts`, `SHAPE.cell`) → **8 px** horizontal padding.

`tileBallXAt` (`:249–252`) does not clamp: `fn(phase) * maxX`. Measured range over the specimen set (`node`, 201 samples):

```
ease-in-back      min -0.0969
ease-out-back                    max 1.0869
ease-in-out-back  min -0.0927 /  max 1.0927
ease-in-bounce                   max 1.1827
```

At the 150 px column floor (content ≈ 134 px, `maxX = 120`): `ease-in-bounce` peaks at `translateX = 141.9 px`, so the 14 px ball spans `[141.9, 155.9]` while the padding box ends at `142` — **≈ 0.1 px of the ball remains visible**. The ball effectively vanishes at the exact instant its curve is most distinctive. `ease-in-back` loses ≈ 3.6 px on the left at the floor, and proportionally more on wider columns.

The asymmetry is the tell, and it is what makes this a defect rather than a trade-off: the **sparkline** was deliberately sized for overshoot and sized *correctly* (`css:120–126`, 18% inset + `overflow: visible` — see **L-7**, where the number is shown exact), while the **ball rail** got no equivalent allowance, and the perf choice at `:105` silently supplies the clip. Note the pairing with C-8: the same declaration produces two distinct failures — clipping here, measurement-zeroing there.

**Falsifier** show `content-visibility: auto` applying paint containment only while skipped, or an `overflow-clip-margin` on `.specimen-tile`/`.tile-stage`. Neither is in the tree. *Pixel extent is `UNPROVEN-NEEDS-LIVE` (SS-13); the containment relation is spec-derived and the overshoot magnitudes are `node`-measured.*

---

### C-16 · MAJOR — nothing type-checks this file

- CI runs **only** `npm run check:lib` (`.github/workflows/ci.yml:41–42`) = `tsc --noEmit -p tsconfig.lib.json`, whose `include` is **`["src/"]`**. `demo/` is never type-checked on a merge path. (The config says so deliberately — "a clean runner type-checks ONLY the publishable surface" — which is coherent given F-1, and is exactly why the demo surface is now unguarded.)
- The whole-project `check` (`package.json` → `tsc --noEmit`, include `["src/","demo/"]`) is **plain `tsc`**, which cannot parse `.vue`; `demo/env.d.ts`'s `declare module "*.vue"` makes every SFC an opaque `any`.
- **`vue-tsc` is not a dependency** — absent from `dependencies` and `devDependencies`.

Net: this file's `<script setup>` *and* template — `:shadow="false"` on `Card`, `type="single"`/`:model-value` on `ToggleGroup`, `mode`/`shape`/`:model-value`/`@update:model-value` across 28 `Chip`s, `axis` on two `FadingScroll`s, `:text`/`label` on `CopyButton`, and the `TimingFunction` laundering of C-12 — are checked against glass-ui 7.0.0's real `.d.ts` files by **nothing**. C-18 is a live instance: a type mismatch that exists in the source today and that no gate can see. F-1 makes the graph unreproducible; this makes it unverified.

**Falsifier** find a `vue-tsc` invocation in any script or workflow, or a `.vue`-aware transform in the tsc program. Neither exists.

---

### C-17 · MAJOR — two nameless, role-less keyboard tab stops from the `FadingScroll` mounts

`FadingScroll`'s public contract exposes `ariaLabel` — *"Name the scroll port and expose it as a region"* — and `ariaLabelledby` (`glass-ui/dist/components/fading-scroll/FadingScroll.vue.d.ts`). `EasingTarget` passes neither, at `:42` (the family strip) or `:76` (the specimen drawer). The compiled render function (`glass-ui/dist/fading-scroll-DKsoe_vh.js`):

```js
role: o.value ? "region" : void 0,     // o = computed(() => !!(ariaLabel || ariaLabelledby))
"aria-label": e.ariaLabel,
"aria-labelledby": e.ariaLabelledby,
tabindex: "0"                          // UNCONDITIONAL
```

Both mounts are therefore focusable with **no accessible name and no role**: a keyboard user tabbing the scene hits two anonymous stops before reaching the 28 of C-4. The `aria-label="Easing curve specimens"` the component *does* supply sits on the inner grid (`:81`), which is not the focusable element — so the label exists and lands on the wrong node.

The vendor's design is defensible (name it and it becomes a `region`; don't and it stays a plain scroller) — the consumption defect is that this file took the focusability without the naming, twice, while having the name already written one element away.

**Falsifier** show `tabindex` conditional on measured overflow, or the inner `role="group"` label being exposed on the scroll port. The literal `tabindex: "0"` is unconditional in the render function; the label is on a different element.

---

### C-7 · MINOR — `SpecimenCurve.fn` is dead payload

`:180–198` builds `{ name, fn, path }` per visible tile. The template reads `curve.name` (`:85`, `:89`, `:110`, `:116`) and `curve.path` (`:101`). **`curve.fn` is never read** — `wirePainter` independently recomputes it from the DOM at `:288`. So one name→function mapping has two derivation paths, and the unused one is rebuilt on every filter change.

Cost: `getCurvePath` is memoised (`timingCurveUtils.ts:69–89`, module `Map`); `namedEasing` is **not**. Every filter change allocates 28 fresh value.js easing closures (each a `CubicBezier` bisection solver) into a field nothing reads, then `wirePainter` allocates 28 more. The fix is to delete the field — **not** the dataset keying, which is correct (**L-3**).

**Falsifier** find a `.fn` read on a `visibleCurves` element. `grep -n "visibleCurves"` → `:84`, `:319` only; neither destructures `fn`; `grep '\.fn'` over the file returns nothing.

---

### C-8 · MINOR — `tileSnapshot[0]` is positional, in a file that declares the array unordered

`:283–284` states the doctrine and acts on it:

> Snapshot keyed by `data-curve` (**NOT v-for index — ref arrays carry no order guarantee**), stage = the ball's positioning parent.

Then `:270` and `:302` violate it for the one measurement every ball depends on:

```ts
const stage = tileSnapshot[0]?.stage;
if (stage) railWidth.value = stage.clientWidth;
```

`railWidth` feeds `tileBallXAt` (`:249–252`) for **all 28 balls**; at `railWidth = 0` the guard `maxX > 0` returns `0` and every ball parks at the origin. The mitigation at `:331` ("The grid is uniform-width tiles; one measure serves every rail") is true for width and false for **whether the sampled tile is laid out at all**: `.specimen-tile { content-visibility: auto; contain-intrinsic-size: auto 104px; }` (`css:104–108`) skips off-screen subtrees, and `useResizeObserver(gridEl, measureRailWidth)` (`:332`) fires on **any** grid resize — including a window resize while the drawer is scrolled down, when `tileSnapshot[0]` (top of grid) is far above the port.

**Falsifier — UNPROVEN-NEEDS-LIVE on the browser half.** Two independent kills: (a) `clientWidth` on a descendant of a skipped `content-visibility: auto` subtree returning the pre-skip value rather than 0 in the target engines; or (b) Vue guaranteeing v-for ref arrays in DOM order *and* entry 0 always being laid out. (a) is the SS-13 probe. The doctrine violation at `:270`/`:302` is CONFIRMED static regardless.

---

### C-9 · MINOR — `rootMargin: "25% 0px"` cannot pre-warm the drawer; `FadingScroll` exposes no scroll port

`:290–300` constructs the paint gate with the **default root** (`root: null` = viewport) and a 25% margin. `:243–245` states the intent ("off-screen tiles (**the drawer scrolls**) take no transform writes").

The clipping half works — the IO algorithm intersects the target rect against every intermediate clipper, so a tile scrolled out of `.specimen-drawer` reports `isIntersecting: false`. The **pre-warm** half does not: `rootMargin` pads the *root* intersection rectangle only, and the drawer is an intermediate clipper, not the root. Tiles pre-warm 25% early relative to the **viewport** and 0% early relative to the **drawer** — the surface that actually scrolls. The comment at `:245` already concedes the residue ("a tile scrolling back in snaps to the live phase on the next observer tick"); the `rootMargin` was meant to buy that back and cannot.

The fix requires the scroll port, and **glass-ui does not hand it over.** `FadingScroll` **is** the scroller (`dist/fading-scroll-DKsoe_vh.js`: its root `<div class="fading-scroll fading-scroll--y" tabindex="0">` is what the composable attaches `scroll` to), and the compiled component has **no `defineExpose`** — the `.d.ts` expose slot is `{}`. The consumer's only route is `$el` on a component ref: a private-DOM reach.

**Letter owed to glass-ui** (standing BH/BI relay law) — see §5.

**Falsifier** show `rootMargin` propagating to intermediate clip rects (contradicts the IO spec), or `.specimen-drawer` never overflowing (it is `flex-1 min-h-0` over an `auto-fill minmax(150px,1fr)` grid of 28 tiles).

---

### C-10 · MINOR — the ball size is stated twice, across the JS/CSS boundary (three times, counting the ticks)

`:228` `const BALL_SIZE = 14;` vs `EasingTarget.css:163` `--ball-size: 14px;`. `tileBallXAt` (`:250`) subtracts the JS constant; the rendered ball takes the CSS one. They are not linked. A third, derived copy sits at `css:153,156` (`left/right: 6.5px` = half-ball − half-tick; see **L-8**, where it is shown exact).

The shared idiom this scene consumes defaults to **36 px** — `design-idioms.css:180–181`, `width: var(--ball-size, 36px)`. So any path where the scoped `--ball-size` fails to land yields a 36 px ball travelling a rail computed for a 14 px one: a 22 px overrun past the terminus tick. Edit any one of the three and the other two lie silently. See C-19 for the compounding problem: the shared idiom sheet *documents* a link that does not exist.

**Falsifier** show the two structurally linked (a shared token module, or a `getComputedStyle` read). Neither exists.

---

### C-11 · MINOR — the `steps` tile and the `steps` literal are two different curves

`:175–178` gives `steps` a hard-coded static portrait (`steppedEasing(4, "jump-end")`), and `getCurvePath("steps")` memoises `generateStepSVGPath(4)` into a module-level cache **permanently** (`timingCurveUtils.ts:69–89`). Meanwhile `:212` renders the literal from the **live** `demo.stepOptions.value`, which `EasingSidebar`'s `EasingPicker` writes in steps mode (`EasingSidebar.vue:100–110`, `186–193`).

Set the step count to 8: the header reads `steps(8, jump-end)` while the pressed tile immediately below draws and races a 4-step staircase.

`:172–174` concedes the design ("Parameterized entries get honest static defaults … the selected curve's live parameters ride the header literal + the sidebar editor, not the tile"), so this is a **known** seam. What the concession does not cover is the *pressed* tile: for the 26 non-parameterized specimens the pressed tile IS the literal, and for these two it is not — a rule the surface gives the viewer no way to learn.

**Falsifier** show `stepOptions` not user-writable while a `steps` tile is pressed. `EasingSidebar.vue:29–38` mounts the picker with `:steps`/`:term` and `@update:model-value` in exactly that state.

---

### C-18 · MINOR — `ToggleValue` is a hand-rolled mirror of `AcceptableValue` that has already drifted

`:163–164`:

```ts
// … typed structurally so the demo never reaches for the headless reka basis (G.W12.S4).
type ToggleValue = string | number | boolean | Record<string, unknown> | null;
```

reka-ui's actual type (`node_modules/reka-ui/dist/index3.d.ts:231`):

```ts
type AcceptableValue = string | number | bigint | Record<string, any> | null;
```

The mirror **adds `boolean`** and **omits `bigint`**. glass-ui's `ToggleGroup` emit signature is `(payload: AcceptableValue | AcceptableValue[]) => any` (`components/toggle-group/ToggleGroup.vue.d.ts`), so under `strictFunctionTypes` the handler at `:165` is contravariantly incompatible on `bigint` — and nothing checks it (C-16). The **intent** is right and worth preserving (G.W12.S4: don't reach for your vendor's vendor); the **mechanism** is a copy that silently rots. The underlying gap is glass-ui's: it leaks `AcceptableValue` in a public emit type **without re-exporting it** (`grep AcceptableValue dist/index.d.ts` → 0 hits), so a consumer honouring G.W12.S4 has no supported way to name the payload.

**Falsifier** find `AcceptableValue` (or a glass-ui alias) exported from `@mkbabb/glass-ui` or any subpath, which would make the mirror unnecessary rather than merely wrong. Zero hits.

---

### C-19 · MINOR — the shared idiom sheet documents a seam this component abandoned

`demo/styles/design-idioms.css:162–163`, in the contract block for the idiom five scenes consume:

> `--ball-size` **is the seam EasingTarget reads via `getComputedStyle`**

`EasingTarget.vue` never calls `getComputedStyle`. (`grep -rn getComputedStyle demo/scenes/` returns `square`, `spring`, `amiga` — never `easing`.) So the demo's own design-system layer carries a **false statement naming this exact file**, and the next consumer will go looking for a seam that does not exist — or, worse, will "restore" symmetry by editing `--ball-size` and silently desync `BALL_SIZE` (C-10).

This is the C-10 duplication's cause rather than a restatement of it: the link was specified, and then not built, and the specification was left standing.

**Falsifier** find a `getComputedStyle` read of `--ball-size` anywhere in the easing scene, or a build-time link between `BALL_SIZE` and the custom property. Neither exists.

---

### C-20 · MINOR — the R1-bearing value.js parser module enters the graph for two frozen tables

`:149` → `easingGroups.ts:1–4` → `animationDescriptions.ts:128`:

```ts
import { parseTimingFunction, type ParseIssue } from "@mkbabb/value.js/css";
```

`@mkbabb/value.js/css` is **41,619 bytes** and its export list includes **`parseCssColor`** — the module that carries the R1 crash class (lane-library §4.6). `EasingTarget` needs exactly two frozen data objects out of that file (`NAMED_EASING_BEZIER`, `DETAIL_TIMING_FUNCTIONS`), neither of which needs a parser: a pure data table and a 41 KB grammar share one module, so the gallery's static graph reaches the parser surface for constants. It is a *link*, not a *call* — see **N1** for the R1 negative.

**Falsifier** a build analysis showing `parseTimingFunction` and the `/css` subpath tree-shaken out of the easing chunk. That kills the weight half; the source-graph coupling (a data-only consumer with a module-level edge to the parser) survives either way.

---

### C-21 · MINOR — stale vendor prose + an unused first-class theming prop (census **S-2** class)

`EasingTarget.css:169` attributes the selected wash to *"ToggleChip's `data-state="on"`"*. glass-ui 7.0.0 exports **no `ToggleChip`** (`grep ToggleChip dist/index.d.ts` → 0); the component is `Chip` with `mode="selectable"`. Same defect class as census **S-2** (stale `<SegmentedTabs>` prose in `ChannelControls.vue` / `useTabStripScroll.ts`) — a **new instance**, in a file S-2 did not cover.

Related: `ChipProps` exposes a first-class `tone?: string` (`dist/components/chip/types.d.ts`) — the design system's supported per-chip tone seam. `EasingTarget` uses none of it, setting `--ball-tone` on a distant ancestor (`css:7`) and reaching **into** the vendor's rendered `[data-state="on"]` subtree with descendant selectors (`css:173–180`). That is a styling coupling to glass-ui's internal state attribute rather than to its API — which will survive a vendor refactor only by luck.

**Falsifier** find `ToggleChip` in glass-ui 7.0.0's surface, or a documented reason `tone` cannot carry a violet wash. Zero hits for the former; `tone` is `string`-open, so nothing blocks it.

---

### C-12 · INFO — the only keyframes.js import is an erased type, and it is mis-sourced

`:141` `import type { TimingFunction } from "@mkbabb/keyframes.js"` — used at `:175`, `:182`, `:239`, `:249`. `import type` is erased, so **`EasingTarget.vue` links zero runtime keyframes.js symbols.** Every moving thing in the demo's easing showcase is a value.js easing closure driven by a hand-written rAF painter.

The type is also the wrong library's. keyframes declares `TimingFunction = (t: number) => number` (`src/animation/constants/types.ts:45`); value.js declares `EasingFunction = (progress: number) => number`. Structurally identical — so this is type-**safe**, and a **provenance** error, not a correctness one: the annotated values are value.js `EasingFunction`s produced by `timingCurveUtils`, which already imports that exact type (`timingCurveUtils.ts:5`). The fiction is unguarded by C-16, so the day keyframes.js widens `TimingFunction` (a `ctx` parameter, a brand, an `Easing` object), this file keeps compiling and starts lying about what it demonstrates.

**The honest counter, stated in full.** Per-ball engine animations were *measured* and rejected: `useEasingDemo.ts:144–157` records 21.6 ms/frame and ~46 fps from reactive per-frame writes, and the painter registry is the documented cure. The engine-free tile painter is **defensible**. What is not defensible is that keyframes.js publishes `resolveEasing(name) → Promise<Easing { fn, css? }>` (`src/animation/index.ts:151`, verified present) — a fail-explicit resolver returning the callable **and its faithful CSS twin together**, behind the LIGHT/HEAVY firewall (lane-library §3.3) — and the demo hand-rolls `namedEasing` + `cubicBezierToString` instead, which is exactly how C-1 and C-2 happen.

The obstacle is real and must be named: `resolveEasing` is `async` and cannot sit inside a synchronous `computed`. But `wirePainter` (`:277`) is **already async** and already awaits — the pre-resolve has a home.

Contrast lane-frontend **S-8**: `TypingDots` is kept bespoke precisely *because* it dogfoods the engine ("the demo's signature animation IS the library"). The easing scene's target does the opposite. Note the scene as a whole is honest — `useEasingDemo` really does drive `NumericAnimation` (`:138–140`) and `CSSKeyframesAnimation` (`:288–301`); it is the component the owner ruled to *be the scene* (`:2–10`) that demonstrates value.js.

**Falsifier** find a runtime keyframes.js symbol in this file (`grep -n "keyframes.js"` → line 141 only, `import type`), or a ruling that the specimen drawer is deliberately engine-free.

---

### C-13 · INFO — undeclared, unguarded injection contract; asymmetric with the sibling

`:152` `const demo = inject(EASING_DEMO_KEY)!;` — zero props, zero emits, zero `defineExpose`. The component's **entire** contract is an undeclared injection with a non-null assertion; it reads 6 members of a ~20-member context and narrows nothing. Mounted outside `EasingScene`, `demo` is `undefined` and the first template access (`:28`) throws.

The sibling takes the identical object as a **declared prop**: `EasingSidebar.vue:82`. `EasingScene.vue` does **both** — `provide(EASING_DEMO_KEY, demo)` at `:21` and `h(EasingSidebar, { demo })` at `:57`.

**The asymmetry is justified and I will not call it a defect:** `tabsContent` renders the sidebar into the routed controls pane, i.e. under a *different* parent chain, where `inject` would resolve against the wrong tree — the exact hazard `CubeScene.vue:43` documents. The prop is the correct mechanism there. (Pass 2 initially filed the asymmetry itself as a MINOR; pass 1's provider-chain probe killed it.)

What remains is the **posture**: the `!` carries no guard, no dev-mode message, no typed error, one scene away from a comment describing that exact failure. Cost of the fix is one line.

**Falsifier** show `EasingTarget` unconditionally inside `EasingScene`'s own subtree (it is, `EasingScene.vue:3`) **and** that a guard adds no diagnostic value. The first is true; the second is a judgement call, which is why this is INFO.

---

### C-22 · INFO — a sidebar drag empties the gallery's selection with no cue

`EasingSidebar.onPickerChange` → `demo.updateBezierPoints` (`:210`) → `currentEasingName = "cubic-bezier"` (`useEasingDemo.ts:265–271`). `SPECIMEN_GROUPS` filters the `Custom` family out by construction (`EasingTarget.vue:158`), so no tile matches and **all 28 chips unpress at once**, while the header keeps rendering a name and a literal.

The division of labour is deliberate and documented on both sides (`EasingTarget.vue:155–157`; `EasingSidebar.vue:38–49` even renders a caption for the adjacent catalogue-gap case), so this is filed as a seam observation, not a defect of intent. The gap is narrow and real: the **gallery** half of the seam renders no state for "the selection has left the gallery".

**Falsifier** find a `Custom`/`cubic-bezier` affordance or empty-selection cue in the drawer. Neither exists in the template.

---

### C-14 · AMBER — inherited F-1

Four of this file's six imports (`:136–139`) resolve against a package **declared nowhere**: lane-frontend **F-1** measured `@mkbabb/glass-ui` absent from both `package.json` and `package-lock.json` while 7.0.0 sits in `node_modules`. Re-confirmed twice on this tree — the parsed manifest's sole runtime dependency is `@mkbabb/value.js: 4.0.0`, and `grep -c "glass-ui" package-lock.json → 0`.

`npm ci` reconstructs strictly from the lockfile, so a clean checkout has no `Card`, no `FadingScroll`, no `Chip`, no `ToggleGroup` — and this component is one of the 37 `.vue` files that will not compile. This component is among F-1's densest single-file exposures. Recorded to bind the dependency: **every glass-ui recommendation here (notably C-4) is blocked on F-1 landing first** (lane-frontend §10 step 1). Note the interaction with C-16: F-1 makes the graph unreproducible, and C-16 means no gate would notice.

**Falsifier** a `@mkbabb/glass-ui` entry appearing in `package-lock.json`.

---

## 3. Superlatives (L-18 both ways)

**L-1 · The painter seam is correct by construction, not by synchronisation.** `:222–259` + `useEasingDemo.ts:144–167`. One clock, one `livePhaseValue`, one imperative walk writing `style.transform` and nothing else, on a `will-change: transform` element with a **static** glow (`css:159–167` — the box-shadow is never rewritten per frame). The scene's central claim — "all balls depart together, arrive per their curve" (`:8–9`) — is not maintained by keeping 28 animations in sync; it is **impossible to violate**, because every ball reads the same scalar in the same pass. Most demos of this shape hold 28 clocks and drift. **Falsifier:** find a second phase source feeding any tile, or a non-transform / reactive / per-frame custom-property write in the painter. `repaintDots` is the sole entry (`usePainterRegistry(() => [livePhaseValue])`), and there are none.

**L-2 · The import boundary is clean at every layer.** Four glass-ui **subpaths** deep-imported; **zero** `reka-ui` imports; **zero** local `ui/` vendoring; value.js reached only through subpaths — which is forced, since value.js 4.0.0 publishes **no root export** (lane-library §1, "a rootless capability package"), so a lazy `from "@mkbabb/value.js"` would not even resolve. Corroborates lane-frontend **F-6**. One blemish, recorded rather than charged: `Card` comes from the root barrel (`:136`) though `./card` exists (217 B / 1 chunk edge vs 23,938 B / 44) — four imports, two conventions, one line apart, with a bundler-dependent and unmeasured cost. **Falsifier:** a `reka-ui` or bare-`value.js` specifier in this file or its first-hop imports — none present.

**L-3 · The `data-curve` keying is right, and for the right reason.** `:283–289` refuses to trust v-for ref-array order and re-derives identity from the DOM. That is a genuine, documented Vue non-guarantee, correctly diagnosed and defended with a DOM-carried key plus a stage-parent lookup in the same pass. (C-8 is not a contradiction of L-3 — it is the file failing to apply its own correct doctrine 18 lines later; C-7's fix must preserve L-3, not undo it.)

**L-4 · The controlled-toggle invariant is correct against reka's actual semantics.** `:89–92` binds `:model-value` to a value that is **always** boolean, never `undefined` — so reka's `useVModel` `passive` flag resolves `false` and the `Toggle` is fully controlled. The ignored `false` emit at `:203–205` therefore cannot desync the pressed state; the prop reasserts it. A bound-only-sometimes model would have made this a stateful bug. **Falsifier:** a path where `demo.currentEasingName` is `undefined` at first render (`useEasingDemo.ts:36` seeds `"ease"`).

**L-5 · Reduced motion is answered at the paint layer, and answered completely.** Pass 2 re-audited this and found **no hole**. Every one of the four paint entry points is gated: the resize measure (`:272–273`), the IntersectionObserver tick (`:297`), the selection watch (`:327`), and registration itself (`:304–307`, which early-returns *before* `registerDotPainter`, so no painter is ever registered under PRM and `unregisterPainter` is correctly null for `onScopeDispose` at `:314–317`). `watch(reducedMotion)` (`:320`) re-wires in **both** directions, and the CSS suppresses its own transitions (`css:48–53`). Per lane-frontend §6.5 this is the demo's sole `useMediaQuery` site out of 13 PRM enforcement points — and the only one with a paint-layer answer rather than a CSS-only one. Partial PRM handling is the norm; this one leaks nothing. **Falsifier:** find a rAF path still writing transforms under PRM, or a leaked registration. All four gated; none leaked.

**L-6 · Off-screen work is gated in layers, at the right layers.** IO gates the **paint walk** (`:255–258`), `content-visibility: auto` gates **style/layout** (`css:104–108`), and `contain-intrinsic-size: auto 104px` keeps the scrollbar honest. The `css:101–103` comment states exactly that division. Three mechanisms, no overlap, each on the cost it actually owns. (C-8 and C-15 are *consequences* of L-6 being aggressive, not reasons it was wrong.)

**L-7 · The 18% sparkline headroom is provably, exactly the right number.** `css:120–126` insets the portrait `18% 0` at `height: 64%` with `overflow: visible`, claiming it covers overshoot. Measured maximum overshoot across the specimen set is `ease-in-bounce` at `1.1827` → `0.1827 × 64% = 11.7%` of stage height above the sparkline's top edge, against 18% available. The tightest undershoot, `ease-in-out-back` at `−0.0927`, needs `5.9%` below, against 18%. Not a round guess: a sized allowance with ~35% margin. **Falsifier:** a specimen whose overshoot exceeds `0.18/0.64 = 0.281`. None does (max 0.1827). *(This is also what makes C-15 a defect and not a trade-off: the author sized one half of the tile for overshoot and not the other.)*

**L-8 · The tick offsets land exactly on the ball centres at both endpoints.** With `left: 0` (`css:165`), a 14 px ball, `maxX = railWidth − 14` (`:250`) and 1 px ticks: at phase 0 the ball spans `[0,14]`, centre 7, and the departure tick `left: 6.5px` spans `[6.5,7.5]`, centre **7**. At `fn = 1` the ball spans `[W−14, W]`, centre `W−7`, and the terminus tick `right: 6.5px` spans `[W−7.5, W−6.5]`, centre **W−7**. Half-ball minus half-tick, correct at both ends — the "the departure is LEGIBLE" claim (`css:136–137`) is geometrically earned, and it is the reason C-10's third copy is *derived* rather than merely duplicated. **Falsifier:** any tick/ball centre mismatch at either endpoint. Exact at both.

---

## 4. Negative findings — hypotheses killed by their own falsifiers

**N1 · The R1 parser crash class is NOT reachable from this component.** Hypothesis: the gallery reaches value.js's colour parser. **Dead.** No colour parsing occurs anywhere in `EasingTarget`'s graph — the only colour work is native CSS `color-mix()` (`css:129,150,174`) and the `--ball-tone`/`--color-progress` token chain (`design-idioms.css:174–185`). `parseCssColor` is *linked* (C-20) but never *called*; colour never crosses the JS boundary here. Recorded so the megatranche's R1 map can mark this component **clean**, not merely unexamined. (C-6 documents the *registry-form* analogue of the R1 class, which is a different mechanism and is live as coupling.)

**N2 · `namedEasing` does not throw on any current specimen name.** Hypothesis: `EASING_GROUPS` contains a name value.js cannot resolve — `ease-in-bounce` and `smooth-step-3` are both absent from the bezier `PRESETS` table — which would throw through `requireEasing` inside the `visibleCurves` computed and kill the render: a second BLOCKER. **Dead.** Both live in the analytic registry `_` (`dist/subpaths/easing.js:206–224`). Executed `easing(name)` over all 25 non-step specimen names: `unresolvable: []`. Not claimed; C-6 is filed as latent coupling, exactly and only.

**N3 · The specimen grid is not an ARIA-conformance defect.** Pass 2's hypothesis that 28 loose Chips degrade the AT semantics relative to `ToggleGroup` was killed by pass 1's reka probe — `ToggleGroupRoot` also renders `role="group"` with `aria-pressed` items. Folded into C-4's honest counter; the keyboard-burden claim survives, the conformance claim does not.

---

## 5. Census reconciliation · letters owed

| id | this component |
|---|---|
| **F-1** (glass-ui phantom dep) | **CONFIRMED**, four specifiers (`:136–139`) — C-14. One of the densest single-file exposures in the demo. |
| **S-1** (`KfPillTabs` → `SegmentedTabs`) | not consumed — but C-4 is S-1's *shape* with a sharper variant: S-1's blocker was a **stale** rationale; C-4 has **none**. |
| **S-2** (stale glass-ui prose) | **EXTENDED** — a new instance at `EasingTarget.css:169` (`ToggleChip`, absent from 7.0.0). C-21. |
| **S-7** (`CopyButton` → `Button` + `Tooltip`) | **CONFIRMED consumed** (`:35–39`), and the mount needs a CSS prosthesis (`css:68–75`: *"CopyButton's icons are absolutely-positioned at 100% — the button needs an intrinsic box here"*). Direct evidence for S-7's AMBER: the shadow has no intrinsic sizing contract, so every consumer re-invents one. |
| **S-8** (`TypingDots`, justified bespoke) | **CONTRASTS** — S-8 is kept bespoke *because* it dogfoods the engine; this component is bespoke and dogfoods nothing (C-12). |
| **S-3..S-6** | not consumed here. |
| **S-9 (new, value.js axis)** | `NAMED_EASING_BEZIER` — a 34-line byte-exact duplicate of a published export, defended by a false comment (C-5). Proposes the census's first non-glass-ui shadow arm. |
| **census gap (new)** | lane-frontend's census enumerated Vue **components** only. This component consumes a demo-local **CSS** design layer — `.progress-rail` / `.progress-ball`, `design-idioms.css:161–190`, shared across the easing, sequence, spring and scrubber scenes. It is a legitimately-owned parameterized idiom, and C-19 shows its contract has **already rotted against this consumer**. Recommend an **S-10** census arm over `demo/styles/design-idioms.css` for glass-ui overlap and contract truth — not a defect claim in itself. |
| **lane-library** | no contradiction. Two data points added: (i) value.js 4.0.0 has `parseTimingFunction` **in** and no lossless timing-function serializer **out** — the asymmetry that produced C-2; (ii) `easing()`'s analytic-registry-first resolution order is the mechanism behind C-1 and is not documented in the subpath's `.d.ts`. |

**Repair order.** C-3 is the single edit that discharges C-1 *and* C-2 for this surface (bind `demo.cssValue`; delete `literal` and the `:140` import). C-16 should land before anything structural — it would have caught C-18 outright and permanently guards C-12. C-15 is a clamp or an overshoot allowance; L-7 shows how the sparkline already solved it. C-10 + C-19 are one motion: pick one home for 14 px, delete the other, and fix the idiom sheet that currently misdirects the next reader. C-5 wants an owner ruling before the swap (`smooth-step-3` changes class). C-6 is one guard plus one test over `EASING_GROUPS`. C-4 is blocked on **F-1** (C-14).

**Cross-repo letters owed** (standing BH/BI relay law):
1. **glass-ui** — `FadingScroll` exposes no scroll port; consumers cannot root an `IntersectionObserver` on the surface that actually scrolls without reaching for `$el` (C-9). Pairs with lane-frontend's BG-12 on the same component.
2. **glass-ui** — `FadingScroll` is unconditionally `tabindex="0"` while `role="region"` is label-gated, so the default mount is a nameless tab stop (C-17). Either gate the focusability on the naming, or document the pairing as required.
3. **glass-ui** — a selectable **chip group**: `ToggleGroup type="single"` + `Chip shape="cell"` compose today only via `as-child`; a first-class pairing would retire the hand-rolled grid (C-4).
4. **glass-ui** — re-export reka's `AcceptableValue` (or a glass-ui alias) from the `toggle-group` subpath; it appears in a public emit signature with no supported way for a consumer to name it (C-18).
5. **value.js** — `cubicBezierToString` fixes at 2 decimals with no precision parameter, while glass-ui's own picker uses 3 (C-2). A demo that must print a *re-parseable* literal cannot use the published formatter; and `/css` has `parseTimingFunction` with no serializer twin. Ties directly to the V·π parser-proof gate's round-trip fidelity concern.
6. **value.js** — document `easing()`'s **analytic-registry-first** resolution order in `easing.d.ts`. Nine names resolve to functions that are *not* their `bezierPresets` entry, with drift up to 0.163; nothing in the published types says so, and C-1 is the direct consequence (C-1, C-5).

---

## 6. Tally

| | count |
|---|--:|
| defects | **22** (C-1 … C-22) |
| BLOCKER | **2** (C-1, C-2 — C-2 escalated in pass 2) |
| MAJOR | 7 (C-3, C-4, C-5, C-6, C-15, C-16, C-17) |
| MINOR | 9 (C-7 … C-11, C-18 … C-21) |
| INFO | 3 (C-12, C-13, C-22) · AMBER 1 (C-14) |
| superlatives | **8** (L-1 … L-8) |
| negative findings (hypotheses killed) | 3 (N1, N2, N3) |
| claims marked UNPROVEN-NEEDS-LIVE | 2 (C-8 browser half; C-15 pixel extent) |

**Provenance.** Every glass-ui and value.js claim is sourced from the copies **installed in the census target** (`keyframes.js/node_modules/@mkbabb/{glass-ui@7.0.0, value.js@4.0.0}`), so every cure is available without an upgrade. Numeric probes were `node -e` reads of those dist bundles, re-run independently in pass 2. No file in keyframes.js, glass-ui or value.js was written, mutated or executed as a product; no installs and no dev servers were run; no browser tooling was used. The only write performed by this challenge is this file.
