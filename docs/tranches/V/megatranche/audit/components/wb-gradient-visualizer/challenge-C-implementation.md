# CHALLENGE-C · ROUND 4 — `demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue`

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context seat, which
matches the explicit declaration this seat was spawned with. **Declared, not inherited.**

**Verdict: DEFECTIVE** (unchanged), on a **new BLOCKER-class mechanism** that every prior round's
cure leaves open.

---

## Filing note — nothing was destroyed to write this

Three Challenge-C reports already existed at this component. All three are preserved:

| file | written | content |
|---|---|---|
| `challenge-C-implementation.pass-1-2026-07-27.md` | Jul 27 19:06 | round 1 — 17 findings `C-1`…`C-17` |
| `challenge-C-implementation-r2.md` | Jul 28 11:13 | round 2 — `R2-N1`…`R2-N7`, `R2-C1/C2` |
| `challenge-C-implementation.pass-3-2026-07-28.md` | Jul 28 17:32 | round 3 — `R3-1`…`R3-6`; **copied by this seat before the named path was rewritten; `shasum` verified identical** (`fa8e61bd64ab72e5979c1d5f9a7fc827679a4324`) |

This file is **round 4** at the named path, following the convention this tranche already uses. I
audited the whole subtree independently, ran my probes, and only then diffed against the three prior
dockets. **Five findings below are new**, two with pasted live reproductions from the running app;
one prior-round claim is bounded and one observation is explicitly **declined**. I do not restate a
finding I merely agree with — the carried docket is §6.

---

## 1 — Method

* Whole-file read of the subject (279 lines), `GradientPane.vue`, all three sibling editors,
  all four composables, `useSpecimenRows.ts`, `demo/color-session/color-utils.ts` +
  `picker-color.ts` (the render pipeline's real entry), `demo/color-picker/ErrorBoundary.vue`,
  `node_modules/@mkbabb/glass-ui/dist/components/easing/composables/useEasingPicker.d.ts`
  (the authority on `EasingPickerValue`), both gradient vitest files and `.github/workflows/ci.yml`.
* **One new offline probe**, kept and re-runnable:
  `probes/challenge-C-r4-oracle-gap.ts` — every output block in §2 is pasted from my own run.
* **One live drive** of `http://localhost:9000/#/gradient`, Chromium via Playwright, using a **real
  caret edit** (`Range` + `document.execCommand("insertText")`, which fires a genuine `input` event)
  rather than a synthetic value write. Two new screenshots under `evidence/challenge-C-r4-*`.
* Repo `tranche-u`, HEAD **`d19da6d3`** (the branch advanced past the brief's `c654824e` and past
  round 3's `f36f780c`; `git log` shows nothing under `demo/workbenches/gradient/` moved).

```
$ npx vite-node docs/.../probes/challenge-C-r4-oracle-gap.ts
$ npx vitest run test/gradient-parse.test.ts test/gradient-v4-consume.test.ts   → 22 passed
```

---

## 2 — NEW findings

### R4-1 · BLOCKER — the component **accepts** a spec-valid CSS Color 4 stop and is then destroyed by its own render: validation and rendering are two different predicates

`[NEW — a third, independent door to the C-1 catastrophe, and the ONLY one that survives every cure C-1 / R2-N5 propose]`

**The claim.** `gradientParse.ts:92-94` names `parseCssColor` the validity oracle:

```ts
/** Library-oracle color check. */
function isColorToken(token: string): boolean {
    return parseCssColor(token).ok;
}
```

The render pipeline is a **different** predicate, and it *throws* rather than returning a Result:

```ts
useGradientCSS.ts:192-193   const c0 = parseColorIn(s0.cssColor, interpolationSpace);   // → PickerColorError
useGradientCSS.ts:206-208   if (!mixed.ok) throw new Error(`Gradient color mix failed: ${mixed.error.code}`);
```

Any token inside the gap between those two predicates is a stop the component **accepts with
`ok: true`**, applies to the model, and then cannot draw. CSS Color 4 `none` channels are exactly
such tokens. Measured (`probes/challenge-C-r4-oracle-gap.ts`, section A):

```
=== A · the oracle gap: parseCssColor OK, then parseColorIn / mixColors ===
  oklch(none 0.15 145)       oracle=ACCEPTED  render=*** mixColors NOT-OK: color_missing_channel → THROW
  oklch(0.7 none 145)        oracle=ACCEPTED  render=*** mixColors NOT-OK: color_missing_channel → THROW
  oklch(0.7 0.15 none)       oracle=ACCEPTED  render=renders
  rgb(none 0 0)              oracle=ACCEPTED  render=*** THROWS PickerColorError: color_missing_channel
  hsl(none 50% 50%)          oracle=ACCEPTED  render=*** THROWS PickerColorError: color_missing_channel
  lab(none 20 30)            oracle=ACCEPTED  render=*** THROWS PickerColorError: color_missing_channel
  oklch(0.7 0.15 145 / none) oracle=ACCEPTED  render=*** mixColors NOT-OK: color_missing_alpha → THROW
  transparent                oracle=ACCEPTED  render=renders
  rebeccapurple              oracle=ACCEPTED  render=renders
  #ff000080                  oracle=ACCEPTED  render=renders
  color(srgb 1 0 0)          oracle=ACCEPTED  render=renders
  color(xyz 0.5 0.5 0.5)     oracle=ACCEPTED  render=renders
  oklch(99999 99999 99999)   oracle=ACCEPTED  render=renders
  ("oklch(1e400 0.1 90)" / "hsl(NaN 50% 50%)" / "currentColor" → oracle rejected, correctly)
```

Note `oklch(0.7 0.15 none)` **renders** while `oklch(none 0.15 145)` destroys the pane. The gap is
**channel-position-specific**: it cannot be recognised by the shape of the literal, by a lint rule,
or by a reviewer reading the string.

End-to-end, still offline (section B) — the parse returns `ok: true`, so `parseVerdict` is `null`,
and then **every** render product throws:

```
=== B · end-to-end: parseGradientCSS accepts, then the render computed throws ===
  linear-gradient(90deg, oklch(none 0.15 145) 0%, oklch(0.65 0.18 265) 100%)
     parse=OK (verdict null)  coalescedCSS=*** THROWS Error: Gradient color mix failed: color_missing_channel
                              railRampCSS=*** THROWS Error: Gradient color mix failed: color_missing_channel
  linear-gradient(90deg, rgb(none 0 0) 0%, blue 100%)
     parse=OK (verdict null)  coalescedCSS=*** THROWS PickerColorError: color_missing_channel
                              railRampCSS=*** THROWS PickerColorError: color_missing_channel
```

**Live reproduction — pasted, from the shipped default state, by a four-character caret edit.**
The editor's shipped text is `linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.65 0.18 265) 100%)`.
I selected `0.75` and typed `none` (a real `input` event via `execCommand("insertText")`); a third
stop had been added first by clicking the rail, so there was authored work to lose:

```
S1_threeStops:
 {"handles":["Gradient stop at 0%","Gradient stop at 50%","Gradient stop at 100%"],
  "editorText":"linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(70% 0.165 205deg) 50%, oklch(0.65 0.18 265) 100%)",
  "tileBg":"linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.746875 0.150937 148.75) 3.13%, okl"}

afterType:
 {"execCommand":true,
  "editorText":"linear-gradient(90deg, oklch(none 0.15 145) 0%, oklch(70% 0.165 205deg) 50%, oklch(0.65 0.18 265) 100%)"}

S2_afterDebounce (800 ms later):
 {"textbox":false,"editorText":null,"handles":[],"rail":false,"tile":false,"easingHeads":false,
  "verdict":null,
  "mainText":"This panel hit an unexpected error. Gradient color mix failed: color_missing_channel Try again"}
```

Reproduced a second time from the **two-stop default** with no prior setup at all
(`before: {"editorText":"linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.65 0.18 265) 100%)","handles":2}`
→ `typed: "…oklch(none 0.15 145)…"` → `crashed: true`). Screenshot:
`evidence/challenge-C-r4-pane-destroyed-none-channel.png`.

**Why this is not C-1, and why it matters more than C-1.**

| | C-1 / R2-N5 | **R4-1** |
|---|---|---|
| what `parseCssColor` does | **throws** (`Cannot read properties of undefined (reading 'replace')`) | **returns `ok: true`** — it is behaving correctly |
| what `parseGradientCSS` returns | never returns (throw escapes) | `{ ok: true, model }` — a complete, "valid" model |
| where the throw lands | inside the event handler, during `applyCSS` | inside a **render computed**, one tick later |
| the message the user sees | `Cannot read properties of undefined (reading 'replace')` | `Gradient color mix failed: color_missing_channel` |
| does V·π's parser-totality cure close it | **yes** | **no** — the parser is already total for this input |
| does round 3's "hoist the model above the boundary" close it | yes (saves the state) | partially — the state survives, **but the pane still cannot render at all**, so the user is stuck |

C-1 is a *partial function consumed at a total contract*. R4-1 is worse: the contract
`GradientParseResult` is **unsound** — it certifies `ok: true` for a model the component cannot
draw. Making `parseCssColor` total (the whole point of mini-tranche V·π) removes C-1 and leaves
R4-1 exactly as measured. This is the single most important distinction in this report.

**Blast radius — five independent throw sites, all in render position, all reached by one bad stop:**

| # | site | consumer |
|---|---|---|
| 1 | `useGradientCSS.ts:206-208` via `serializeCoalescedGradient` | `coalescedCSS` → the render tile's `--tile-render` (`GradientVisualizer.vue:224`) **and** `copyCSS` (`:128`) |
| 2 | `useGradientCSS.ts:206-208` via `serializeRailRamp` | `railRampCSS` → the rail's `--rail-ramp` (`GradientStopEditor.vue:204`) |
| 3 | `useGradientCSS.ts:192-193` `parseColorIn` | the same two, one layer earlier (the `rgb(none 0 0)` row above) |
| 4 | `useGradientInterpolation.ts:34-37` via `colorAtPosition` (`GradientVisualizer.vue:79-85`) | the child's `ghostColor` **computed** (`GradientStopEditor.vue:71-73`) |
| 5 | `useSpecimenRows.ts:52-59` `interpolateStopColors` | every easing specimen row's ink |

**Reachability, honestly stated.** Typing `none` into an `oklch()` is not adversarial in *this*
surface — `none` is the canonical CSS Color 4 way to write a missing component, and this pane is a
CSS authoring box for exactly that literate audience. It is also the shape produced by pasting
real-world CSS Color 4. What is **CONFIRMED** is the whole chain from a real caret edit to total
pane loss; what is not claimed is a frequency.

**Cure (gestalt).** One predicate, once, at the boundary. `parseGradientCSS` must validate a stop
by *the operation that will be performed on it* — `parseColorIn(token, space)` composed with a
trial `mixColors` — not by a weaker sibling oracle, and it must return the same
`{ ok: false, reason }` the design already owns (`"oklch(none 0.15 145)" has no lightness — a
gradient stop needs every channel`). Structurally: `parseColorIn` / `mixColors` / `serialize*`
should stop throwing and return `Result`, so the *type* of the render path states what the
`GradientParseResult` contract is currently only promising. A `try/catch` at any of the five sites
is a masking fallback and is forbidden by edict 2 — and would still leave four doors open.

---

### R4-2 · MAJOR — the parser's `-1` "unspecified position" sentinel collides with an authored negative percentage, silently relocating a stop by up to 50 points

`[NEW — distinct from R2-N6, which charged the CLAMP of a terminal stop; this is not a clamp]`

`gradientParse.ts:252` encodes "no position was authored" as the in-band value `-1`:

```ts
stops.push({ id: uid(), cssColor: colorToken, position: -1 });
```

and the auto-fill (`:266-279`) recognises the sentinel by **`position < 0`**, so *any* authored
negative percentage is read as "the author omitted this position" and gets interpolated into the
middle of the run — before the clamp at `:281-283` ever runs. Measured
(`probes/challenge-C-r4-oracle-gap.ts`, section C):

```
=== C · the `-1` position sentinel vs. an AUTHORED negative percentage ===
  linear-gradient(90deg, red 0%, green -20%, blue 100%)
     → red@0 green@50 blue@100
  linear-gradient(90deg, red 0%, green -0.0001%, blue 100%)
     → red@0 green@50 blue@100
  linear-gradient(90deg, red 0%, green -20%, lime -40%, blue 100%)
     → red@0 green@33.333333333333336 lime@66.66666666666666 blue@100
  linear-gradient(90deg, red 0%, green 20%, blue 100%)      ← control
     → red@0 green@20 blue@100
  linear-gradient(90deg, red 0%, green -0%, blue 100%)      ← negative zero
     → red@0 green@0 blue@100
```

`green -20%` becomes **`green 50%`** — a 70-point relocation, `ok: true`, no verdict. And the
behaviour is **discontinuous at zero**: `-0%` lands at 0 % (because `-0 < 0` is `false` in
JavaScript), `-0.0001%` lands at 50 %. Two inputs a ten-thousandth of a percent apart are
interpreted 50 points apart.

CSS Images 3 §3.4.1 permits positions outside `[0%, 100%]` and specifies the correction for an
out-of-order stop as *"set its position equal to the largest specified position of any color stop
before it"* — i.e. `green -20%` between `0%` and `100%` is a **hard stop at 0 %**, not a midpoint.
The module's own header states the opposing doctrine in its own words: *"Silent-drop is forbidden
(P2-17) → explicit reject"* (`gradientParse.ts:175-176`). Both the spec behaviour and the module's
stated doctrine are violated by the same three lines.

**Cure.** Take the sentinel out of the value's own domain. `positions: number[]` should carry
`number | null` (or the stop should carry `position?: number`) so "unspecified" is not a member of
the position type; then the negative case falls through to the *documented* clamp/reject path
instead of the auto-fill. One type change, no new module, and it also removes the `-0` cliff.

---

### R4-3 · MINOR — `defineModel("selectedStopId")` publishes a two-way model nothing binds, and the selection is written twice per press

`[NEW]`

```ts
GradientVisualizer.vue:51    const selectedStopId = defineModel<string | null>("selectedStopId", { default: null });
GradientVisualizer.vue:140       v-model:selected-id="selectedStopId"
GradientVisualizer.vue:144       @select="(id) => selectedStopId = id"
```

Those are the **only three occurrences in the repository**:

```
$ grep -rn "selectedStopId\|selected-stop-id" demo/ e2e/ test/
demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue:51
demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue:140
demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue:144
```

The sole parent (`GradientPane.vue:25`) mounts `<GradientVisualizer ref="visualizerRef" />` with no
bindings at all. So `defineModel` here declares a public `selectedStopId` prop + an
`update:selectedStopId` emit that **no caller uses**, in order to hold state that never leaves the
component — the exact "wrapper that doesn't exist yet" shape edict 3 forbids, and it voluntarily
adopts this repo's own recorded `defineModel` async-round-trip hazard (edict 7) for a value with no
round trip to make.

Second half: `GradientStopEditor.onHandlePointerDown` (`:128-130`) writes the selection **twice** —
once through its own `defineModel` (`selectedId.value = id`, which emits `update:selectedId` into
the parent's model) and once through `emit("select", id)`, which the parent handles at `:144` by
assigning the same value again. Two channels for one piece of state (edict 2: no dual paths). The
deselect path (`onHandlePointerUp:151-153`) uses only the first, proving the second is unnecessary.

**Cure.** `const selectedStopId = shallowRef<string | null>(null)`; delete the `select` emit from
`GradientStopEditor`'s `defineEmits` and the `@select` handler here. Net −2 declarations.

---

### R4-4 · MINOR — ~55 lines of CSS-timing→numeric machinery in the easing resolver are reachable only from a test

`[NEW — sharpens round 1's C-17 "unbounded cache" into "unreachable", which changes the cure]`

`easingFnOf` short-circuits on the interval's live callable:

```ts
useGradientCSS.ts:120-133
export function easingFnOf(interval) {
    if (interval.fn) return interval.fn;                       // ← always taken in the app
    const cached = resolvedEasingCache.get(interval.css);      // dead
    …  parseTimingFunction(interval.css)  …                    // dead
}
```

`fn` is **required** on the payload type — `EasingPickerValue.fn: EasingFn`
(`@mkbabb/glass-ui/dist/components/easing/composables/useEasingPicker.d.ts`) — and every producer
in this tree supplies it: `linearInterval()` sets `fn: linear` (`useGradientCSS.ts:53-62`),
`parseGradientCSS` seeds every interval with `linearInterval()` (`:296-298`), and `updateInterval`
copies `fn` through verbatim (`useGradientModel.ts:134-140`). Probe, section D:

```
=== D · easingFnOf's cache + CSS-timing machinery: reachable? ===
  linearInterval().fn is function → easingFnOf returns at line 122 always
```

Dead in the shipped app, therefore: `resolvedEasingCache` (`:69`), the `parseTimingFunction`
fallback (`:126-132`), `timingFunctionValue` (`:106-117`), `easingValue` (`:71-77`) and
`linearStops` (`:79-104`) — the last of which is 26 lines of `linear()` position-resolution
arithmetic. The only caller that reaches any of it is a **test**
(`test/gradient-v4-consume.test.ts:39-53`, which passes `{ css: "…" }` objects with no `fn`). A gate
whose subject is code the product never executes is not coverage.

**Cure.** Either delete the fallback and make `easingFnOf` a field read (`interval.fn`), or —
if CSS-literal-only intervals are a real future state — make that the *only* path and drop `fn`
from the persisted payload, so the literal is genuinely "the persisted TRUTH" the module header
claims. Today it is both, and one half is decoration. (Round 1's C-17 cure, "bound the cache", would
preserve dead code.)

---

### R4-5 · INFO — the vacuous gate, located exactly: the suite tests the parser and the renderer separately and never joins them

`[NEW: precise seam + named mutations, per the brief's test-truth clause]`

The two gradient suites split the pipeline in half at the exact point R4-1 lives:

* `test/gradient-parse.test.ts` — 19 tests. **Every acceptance test stops at `ok: true`** and
  inspects only `type` / `direction` / `stops[].position` / `intervals.length`. `:71-77`
  (*"preserves wide-space literals verbatim"*) deliberately asserts that an exotic literal —
  `color(display-p3 1 0 0)` — is accepted and preserved. `oklch(none 0.15 145)` is that same shape,
  and is accepted the same way; the suite's design guarantees it will never notice the difference.
* `test/gradient-v4-consume.test.ts` — 3 tests. Calls `sampleCoalescedStops` and
  `serializeCoalescedGradient`, i.e. the throwing functions — but on a **hand-written literal
  model** (`:13-23`), never on a model returned by `parseGradientCSS`.

```
$ grep -rn "sampleCoalescedStops\|serializeCoalescedGradient\|serializeRailRamp\|interpolateStopColors" test/ e2e/
test/gradient-v4-consume.test.ts:6,7,9,27,30,33,36        ← all on the literal model at :13-23
```

No test anywhere composes `parseGradientCSS` → any render function. `serializeRailRamp` — the
rail's paint, throw site #2 — is **not referenced by any test at all**.

Named mutations that keep **every gate CI actually runs** green
(`lint`, `vue-tsc ×2`, `build`, `vitest` — `.github/workflows/ci.yml:33-37`; there is no e2e step,
and **no test imports any of the three SFCs** — `grep -rln "GradientVisualizer"` matches
`test/gradient-v4-consume.test.ts` only through its `GradientVisualizer/easing/easingCatalogue`
*module* import, not the component):

1. `GradientVisualizer.vue:107` → `parseVerdict.value = null;` — the rejection surface the whole
   model-or-reject design exists to feed is deleted. 22/22 pass.
2. `useGradientCSS.ts:206-208` → `if (!mixed.ok) continue;` — silently drop unmixable sub-stops
   instead of throwing. 22/22 pass, because no test ever produces a non-ok mix.
3. Delete the range clamp entirely (`gradientParse.ts:281-283`,
   `s.position = Math.min(100, Math.max(0, s.position))`) — out-of-range authored positions flow
   straight into the model and the rail's geometry. 22/22 pass, verified by enumeration: every
   percentage literal in either suite is inside `[0%, 100%]`, so the clamp is never load-bearing for
   any assertion —
   `$ grep -on "[0-9.]*%" test/gradient-parse.test.ts | sort -u` → `0% 10% 20% 30% 50% 80%`, and
   `grep -n "1[0-9][0-9]%\|[2-9][0-9][0-9]%" test/gradient-*.test.ts` → *(none)*.

   *(Two mutations I tried and reject as non-vacuous, for the record: mutating the **first**-stop
   auto-fill `:266` or the **last**-stop auto-fill `:267` both FAIL — `:26-33`, `:56-64` and
   `:66-69` pin `[0, 50]` / `[0, 50, 100]` / `[0, 50, 100]`. Those two lines are genuinely covered.)*

Verified baseline: `npx vitest run test/gradient-parse.test.ts test/gradient-v4-consume.test.ts` →
`Test Files 2 passed (2) · Tests 22 passed (22)`.

---

### R4-6 · MEASUREMENT INTEGRITY (not a product defect) — the live dev server force-reloads the app mid-session, and it has been mis-read as app behaviour

`[NEW — a warning every seat probing localhost:9000 needs]`

During my session the page twice arrived at a route I never set (`#/browse`), and the
ErrorBoundary card twice disappeared within ~1 s of catching, although
`demo/color-picker/ErrorBoundary.vue:63-73` has **no** auto-reset (`caught` is cleared only by the
`reset()` click, and `App.vue:50` passes no `@reset` and no `:key`). The cause is in the captured
console log, not in the app:

```
$ cat .playwright-mcp/console-2026-07-29T14-16-01-102Z.log
[ERROR] Failed to load resource: 404 (Not Found) @ http://localhost:9000/@fs/…/dist/subpaths/color.js?t=1785334597597
[ERROR] Failed to load resource: 404 (Not Found) @ http://localhost:9000/@fs/…/dist/subpaths/css.js?t=1785334597599
[ERROR] Failed to load resource: 404 (Not Found) @ http://localhost:9000/@fs/…/dist/subpaths/math.js?t=1785334597598
```

`?t=` cache-busting on `dist/subpaths/*.js` is Vite invalidating the **library** build while
`build:watch` rewrites `dist/` — a full reload, which resets the boundary and restores a different
route. `evidence/challenge-C-r4-error-card-1512.png` is that reload caught one step later: taken
≈1 s after the same probe reported `crashed: true`, it shows the gradient pane **back**, reseeded to
the two-stop green→blue default — i.e. the reload doubles as an independent visual confirmation of
R4-1's data loss, even though the boundary card it replaced is gone. Round 1's live-driving note ("twice during my session, the app navigated itself to `#/mix`")
has the same cause and should be read as an artifact, not a defect.

**Consequence for this formation:** any probe that reads state in a *later* tool call than the one
that produced it can be reading a freshly booted app. Every claim in §2 was produced inside a
single `page.evaluate` that sets the route, performs the gesture, waits out the debounce, and reads
the result — which is why R4-1's reproduction survived and my first two screenshots did not.

**Declined, therefore.** My first screenshot showed the error card's headline and detail absent
from the pixels while `getComputedStyle` reported them visible
(`color: rgb(28, 25, 23)`, `opacity: 1`, `elementFromPoint` → the `<p>` itself, no covering layer
found). That is consistent with a screenshot landing mid-boot. **I am not filing it**; it is a
labelled **HYPOTHESIS** for the `ErrorBoundary` seat, with the two shots
(`evidence/challenge-C-r4-pane-destroyed-color-missing-channel.png`,
`…-pane-destroyed-none-channel.png`) as the record. A wrong BLOCKER costs this program more than a
missed MINOR.

---

## 3 — Bounding a prior charge

* **Round 3's R3-3 cure list is incomplete, not wrong.** R3-3 proposes "hoist `useGradientModel()`
  above the `ErrorBoundary`" as the shared cure for `C-1`, `C-4` and `R3-3`, on the ground that
  *the model must outlive its view*. Measured against R4-1 that is necessary and **not sufficient**:
  with the model hoisted, the `none` stop is still in it, so the remounted pane throws again on its
  first render — an infinite crash loop instead of a silent reseed. The hoist must therefore be
  paired with R4-1's single-predicate boundary, or the model gains a state it can never render out
  of. Filed as a dependency between cures, not as a defect in R3-3.

## 4 — Negative proofs this round adds

* **The exotic-but-fine set.** `transparent`, `rebeccapurple`, `#ff000080`, `rgb(0 0 0 / 50%)`,
  `color(srgb 1 0 0)`, `color(rec2020 1 0 0)`, `color(xyz 0.5 0.5 0.5)`,
  `oklch(99999 99999 99999)` and `oklch(-0 -0 -0)` all parse **and** render (§2 R4-1 section A). I
  went looking for a wide-gamut or out-of-range failure and there is none — which is precisely what
  makes R4-1 hard to see by inspection.
* **The oracle correctly rejects the non-finite family.** `oklch(1e400 0.1 90)`,
  `oklch(0.5 0.1 1e400)`, `rgb(1e400 0 0)`, `hsl(NaN 50% 50%)`, `currentColor` → `not ok`, so the
  brief's NaN/Infinity boundary class does **not** reach the model through the CSS box.
* **`updateInterval` drops nothing.** `useGradientModel.ts:135` destructures exactly
  `{ mode, css, fn, points, steps, term }`, and `EasingPickerValue` (glass-ui 7 `.d.ts`) declares
  exactly those six members. I checked this because a hand-listed rebuild of a third-party payload
  is a classic silent-loss site; it is currently complete — and it will silently drop any field
  glass-ui adds, which is a coordination note for the BH relay, not a defect today.
* **`-0%` does not hit the sentinel.** `-0 < 0` is `false`, so `green -0%` lands at 0 % (§2 R4-2).
  The `-0` boundary the brief names is handled — accidentally, by JavaScript's comparison rules,
  which is why the neighbouring `-0.0001%` is not.
* **`verbatimModuleSyntax` clean** in the subject (`:22, :25, :26, :28` all `import type`) and in
  all four composables plus `useSpecimenRows.ts` — re-checked at `d19da6d3`.
* **No rAF, no WebGL, no `ValueUnit` wrapping, no `stableHue`/HSV round-trip** in this subtree
  (re-verified by grep; carried from rounds 1–3).
* **Bar-click add works from a synthetic pointer** (`onBarPointerDown` does **not** call
  `setPointerCapture`, unlike the handle path R3-3 charges), which is how I built the three-stop
  state R4-1 destroys:
  `{"handles":["Gradient stop at 0%","Gradient stop at 50%","Gradient stop at 100%"]}`.

## 5 — Ranked summary (round 4 only)

| # | Severity | Finding | Reproduction |
|---|---|---|---|
| **R4-1** | **BLOCKER** | validation (`parseCssColor`) and rendering (`parseColorIn`+`mixColors`) are different predicates → a spec-valid `none`-channel stop is **accepted**, then destroys the whole pane from 5 render sites with `verdict: null`; survives every prior cure | **CONFIRMED** — offline probe + 2 live caret-edit runs, pasted |
| **R4-2** | **MAJOR** | the `-1` unspecified-position sentinel collides with authored negative `%` → `green -20%` silently becomes `green 50%`; discontinuous at `-0%` | **CONFIRMED**, pasted |
| **R4-3** | MINOR | `defineModel("selectedStopId")` publishes a model nothing binds (grep-proved) + selection written twice per press | CONFIRMED by grep + code |
| **R4-4** | MINOR | ~55 lines of easing CSS→numeric machinery + its unbounded cache are reachable only from a test | CONFIRMED (type authority + probe) |
| **R4-5** | INFO | the vacuous seam located: parser suite stops at `ok:true`, render suite uses a hand-written model, nothing joins them; 2 surgical green-keeping mutations named; `serializeRailRamp` untested entirely | CONFIRMED by grep + 22/22 run |
| **R4-6** | INFO | dev-server `build:watch` reloads have been mis-read as app self-navigation / boundary auto-reset; one screenshot observation explicitly **declined** as a HYPOTHESIS | CONFIRMED by console log |

## 6 — Carried dockets (status after this pass)

| Round 1 | status | Round 2 / 3 | status |
|---|---|---|---|
| **C-1** BLOCKER `oklch()` destroys the pane | **STANDS**; R4-1 is a third door that its cure does **not** close | **R2-N1** `pointercancel` commits the add | STANDS |
| **C-5** BLOCKER add/remove re-hosts easing | STANDS | **R2-N2** every parse re-mints all ids | STANDS |
| **C-6** BLOCKER drag drops ordering | STANDS | **R2-N3** 2115 vs 74 bytes + 12-decimal noise | STANDS |
| **C-2 / C-3 / C-4** the three exposed actions | STAND; C-4's "unvalidated colours" is now **generalised** by R4-1 — the CSS box is the same door | **R2-N4** paint stack copy-pasted | STANDS (upgraded by R3-4) |
| **C-7** keyboard / **C-9** dead direction / **C-10** inert hue | STAND | **R2-N5** `calc()` widens C-1 | STANDS; R4-1 shows the cure it names is insufficient |
| **C-8** nameless Copy | retired → MINOR by R2-C1 | **R2-N6** silent clamp / misleading `in oklch` | STANDS; **R4-2 is a different mechanism**, not a duplicate |
| **C-11** vacuous gate | STANDS; **located precisely by R4-5** | **R3-1** blur-inside-debounce destroys WIP + sticky false `aria-invalid` | STANDS |
| **C-12** per-tick cost | STANDS (bounded by R2) | **R3-2** typed Enter welds tokens (`red0%`) | STANDS |
| **C-13..C-16** | STAND as filed | **R3-3** unguarded `setPointerCapture` | STANDS; **cure amended** by §3 |
| **C-17** id counters / casts / uncancelled debounce / unbounded cache | STANDS; the cache half is **sharpened by R4-4** to *unreachable* | **R3-4** tile missing from the WHCM roster · **R3-5** keyboard ordering → focus order · **R3-6** ordering-vacuous e2e | STAND |

## 7 — Strongest defect

**R4-1.** For the component overall it now displaces `C-1` as the governing charge, not because the
outcome is worse — both end in total, unrecoverable loss of every stop, position, easing curve and
setting — but because it is the one door that **no cure yet proposed at this component closes**.
Mini-tranche V·π's parser-totality work removes `C-1` and `R2-N5`. Round 3's model-hoist saves the
user's state from `C-1`, `C-4` and `R3-3`. R4-1 walks straight past both: the parser is total for
`oklch(none 0.15 145)`, returns `ok: true`, and the model that is now safely hoisted above the
boundary is a model the pane can never render — so the hoist converts a silent reseed into a crash
loop unless the boundary predicate is fixed too.

The root defect is one sentence: **the component validates a colour with a predicate that is not
the predicate it will use to draw it**, and it advertises the result as a total contract
(`GradientParseResult` — "a COMPLETE model or an explicit reason. Never a partial"). Until the
validity oracle *is* the render operation, `ok: true` is an opinion.
