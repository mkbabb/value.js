claude-opus-5[1m]

# Challenge · `TimingFunctionPanel.vue` · axis L (LIBRARY)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/transport/channel-controls/TimingFunctionPanel.vue` (166 lines; ~90 script)
**Posture** DEFECTIVE-until-proven. Every claim carries a falsifier; a false defect is worse than a missed one.
**Method** static, source-derived. No browser tooling. Vendor behaviour read from the installed `dist` (read-only evidence). Two claims were settled by executing the *published* value.js/glass-ui artifacts as data (preset tables, rejection domain) — noted inline.
**Corpus folded** `formation/keyframes/lane-frontend.md` (F-1 phantom dep; shadow census S-1..S-8 — none of S-1..S-8 name this component; row 166 of the frontend inventory does). `lane-library.md` parse seams. Contradictions to in-tree prose recorded at L-17.

**Tally** 17 defects · 1 BLOCKER · 3 superlatives.

---

## The through-line

The panel is ~50 lines of workaround wrapped around a vendor primitive, written against **glass-ui 4.0.1**, running against **glass-ui 7.0.0**. The seam it works around was closed by the vendor two majors ago (L-2). Nothing in the repo pins the vendor's version — it appears in neither `package.json` nor the lockfile (L-3, confirming F-1) — so the drift was undetectable. And the workaround is not merely inert: its remount trigger is wired to the very value it writes, which destroys the primary authoring interaction (L-1).

The component's own sibling — `demo/scenes/easing/EasingSidebar.vue`, the *other* consumer of the *same* vendor primitive, carrying the *same* 4.0.1 rationale comment — gets the seed/echo protocol right on all three points where this copy gets it wrong (L-7). The correct implementation exists in-tree, ten directories away, uncopied.

---

## BLOCKER

### L-1 · BLOCKER · the `:key` remount is self-triggering: it kills the drag and desyncs the canvas from the animation

**Provenance** `TimingFunctionPanel.vue:32-33` (`:key="pickerKey"`), `:101` (`pickerKey` ← `seedPreset`), `:92-99` (`seedPreset` ← `storedAnimationOptions.cubicBezierOptions.controlPoints`), `:143` (`onPickerChange` **writes** `controlPoints`).

The cycle is closed inside one file:

```
onPickerChange (143)  writes  cubicBezierOptions.controlPoints
                                 ↓ (reactive)
                              seedPreset (92-99)   — searches bezierPresets for a match
                                 ↓
                              pickerKey (101)      — `${kind}:${seedPreset ?? "custom"}`
                                 ↓
                              <EasingPicker :key>  — REMOUNT
```

`onPickerChange` fires on **every** emission, and the vendor emits on every `setHandle` — `dist/easing.js`: `k(B, Ue, { immediate: !0 })` where `B` is the `value` computed and `Ue` writes `l.value` (`useModel`). So every pointermove during a drag runs the cycle.

**The remount fires whenever the authored quad crosses the preset↔custom boundary.** That boundary is not exotic — it is the normal entry point:

- `useTimingFunctionEditor.ts:196-207` (`onEasingLabelClick`) converts a named easing to bezier by writing `NAMED_EASING_BEZIER[name]` into `controlPoints`.
- **Measured** (executing the published `@mkbabb/value.js/dist/subpaths/easing.js` against the parsed table at `animationDescriptions.ts:16-49`): **all 29** `NAMED_EASING_BEZIER` entries exist in `bezierPresets` under the same name with quads identical to within 5e-4. Zero exceptions.

So after the edit icon, `seedPreset` is **always** defined and `pickerKey` is `cubic-bezier:<preset>`. The user's first handle drag moves the quad off that preset by ≥1e-3 (the vendor quantizes with `+a.toFixed(3)`), `seedPreset` → `undefined`, `pickerKey` → `cubic-bezier:custom`, **remount on drag frame 1**.

What the remount does:

1. **The drag dies.** The vendor captures on the `<svg>` (`dist/easing.js`, `Je`: `e.currentTarget.setPointerCapture(e.pointerId)`) and gates `pointermove` on the instance-local `Y` (`Ye`: `if (Y.value === null) return`). Unmounting destroys the captured element and `Y`; the fresh instance has `Y === null`. Subsequent moves are swallowed. The user must re-press to continue.
2. **The canvas shows the wrong curve.** The new instance mounts with `:preset="seedPreset"` = `undefined` → `useEasingPicker` falls back: `r = C(t.initialPreset ?? "ease-out-back")`, `i = C([...N[…]])`. The canvas snaps to `ease-out-back` `[0.175, 0.885, 0.32, 1.275]`.
3. **The desync is then silently locked in.** The new instance's `immediate` echo carries the `ease-out-back` quad; `isSeedEcho` (`:120-128`) takes the `if (!seed)` arm and compares against exactly that hard-coded preset → `true` → suppressed, no write. Net state: store + `animation.options.timingFunction` hold the *dragged* quad; the editor canvas renders *ease-out-back*. Meanwhile `activeCurvePath` (`useTimingFunctionEditor.ts:66-81`) reads `controlPoints` — so the small preview and the big editor render **two different curves simultaneously**.
4. Any *further* drag now starts from `ease-out-back`'s handle positions, so the second drag writes a quad unrelated to where the cursor was.

The visual manifestation is UNPROVEN-NEEDS-LIVE (SS-13). **The state divergence is source-proven** and does not depend on rendering.

Secondary, same cycle, lower severity: selecting a preset from the vendor's `Select` (`dist/easing.js`, `"onUpdate:modelValue": … (e) => D(M)(String(e))` → `selectPreset`) writes the preset quad, `seedPreset` becomes defined, key changes, remount — the picker re-seats on the same preset so it looks idempotent, but focus is destroyed off the trigger the user just used.

Contrast that proves the defect is avoidable, not inherent: `EasingSidebar.vue:112-118` — `seedFor` returns `null` for `"cubic-bezier"` with the explicit comment *"a live custom edit — the picker authored it, never remount"* — and `pickerSeed` is a `ref` re-seated only by `watch(() => demo.currentEasingName.value, …)` (`:158-166`), never by the authored points.

**Falsifiers.** Any one kills the claim: (a) `props.storedAnimationOptions` is not reactive — it is: `ChannelOptions.vue:459` `getStoredAnimationOptions(props.animation)` returns a nested slot of a VueUse `useStorage` deep ref (`animationOptionsStore.ts:67-74, 117-122`), and `useTimingFunctionEditor.ts:73` already depends on that same reactivity; (b) Vue does not remount on `:key` change; (c) `seedPreset` reads a source `onPickerChange` does not write — it reads `controlPoints`, written at `:143`; (d) the stored quad never coincides with a `bezierPresets` entry when a drag begins — refuted by the 29/29 measurement above; (e) the emit is asynchronous or coalesced such that the key change lands after the gesture — the emit originates in a pre-flush watcher, so the parent's render job flushes in the same tick.

---

## MAJOR

### L-2 · MAJOR · the entire workaround targets glass-ui 4.0.1; 7.0.0 is installed and closed the seam

**Provenance** `TimingFunctionPanel.vue:25-31` (`"glass-ui 4.0.1's modelValue is emit-only — no external write-through / points-in prop"`), `:89-91`, `:102-105`. Installed: `node_modules/@mkbabb/glass-ui/package.json` → `"version": "7.0.0"`.

7.0.0 ships a full **inbound** model applier. `dist/easing.js`, `EasingPicker` setup:

```js
let l = te(e, "modelValue");            // useModel
…
function We(e) {                        // inbound applier
  if (!e) return;
  if (q(J, e)) { J = void 0; return }   // vendor's OWN echo guard
  v.value = e.mode === "steps" ? "steps" : "bezier",
  Array.isArray(e.points) && e.points.length === 4 && e.points.every(Number.isFinite)
    && e.points.some((e,t) => e !== b.value[t])
    && (N(0, e.points[0], e.points[1]), N(1, e.points[2], e.points[3])),
  Number.isFinite(e.steps) && (P.value = Math.max(1, Math.min(12, Math.round(e.steps)))),
  I.includes(e.term) && (F.value = e.term);
  let t = B.value; q(e, t) || Ue(t);
}
k(l, We, { deep: !0, immediate: !0 }), k(B, Ue, { immediate: !0 });
```

`modelValue` is declared as a model prop (`EasingPicker.vue.d.ts`: `__VLS_ModelProps = { modelValue?: EasingPickerValue }`), `We` writes `mode`/`points`/`steps`/`term` inward via `setHandle`, and `q()`/`J` are the vendor's own structural echo guard. That is precisely the "external write-through / points-in prop" the comment says does not exist, plus a de-duplicator that makes the panel's `isSeedEcho` redundant.

Consequence: `:32` (`:key`), `:84-87` (`quadEq`), `:92-99` (`seedPreset`), `:101` (`pickerKey`), `:106-130` (`isSeedEcho`) — ~50 of 90 script lines — are dead weight against the installed vendor, and that dead weight is what carries L-1. A `v-model` bound to a locally-held `EasingPickerValue` seeded from the store replaces all of it with no remount at all.

**Falsifier.** If `We` were unreachable (e.g. `l` never receiving a value), or if the runtime resolved a glass-ui other than `node_modules/@mkbabb/glass-ui` — the vite alias block (`vite.config.ts:36-60`) aliases `@src`, `@mkbabb/keyframes.js`, `@styles`, `@state`, `@components`, `@utils`, `@kf-engine`, `@composables`, `@app`, `@assets` — no glass-ui entry, so it resolves from `node_modules`. Or: if 7.0.0's `modelValue` were documented as one-way despite the applier (it is not; `EasingPickerValue` is described as *"so a consumer can read back the authored curve"*, and the applier is unconditional).

### L-3 · MAJOR · F-1's blast radius lands exactly here (confirms `lane-frontend.md` F-1, adds the mechanism)

**Provenance** `TimingFunctionPanel.vue:56` (`from "@mkbabb/glass-ui"`), `:57-61` (deep import `@mkbabb/glass-ui/easing`). **Measured**: `grep -rn "glass-ui" package.json package-lock.json` → zero hits, against an installed 7.0.0.

`lane-frontend.md` F-1 records the phantom dependency and rates it RED. This component supplies the mechanism by which it *bites*: it does not merely import an undeclared package, it hard-codes **behavioural assumptions about a specific version of it** (L-2) and an **unexported constant from it** (L-6). With no `package.json` range there is no artifact to review at bump time, no lockfile row to diff, and no CI signal on vendor drift — which is exactly how a 4.0.1-era rationale survived into a 7.0.0 tree with a passing typecheck (the props it passes are all still valid in 7.0.0; only the *reasoning* rotted, and reasoning is not type-checked).

**Falsifier.** Any `@mkbabb/glass-ui` entry in `package.json`, `package-lock.json`, a workspace manifest, or an `overrides`/`resolutions` block. None found.

### L-4 · MAJOR · the engine write at `:144-148` is dead duplication of `setAnimationTimingFunction`, executed once per pointermove

**Provenance** `TimingFunctionPanel.vue:144-153` vs `useTimingFunctionEditor.ts:96-106`, wired at `ChannelOptions.vue:319-321`.

Panel:
```ts
const timingFunction = { fn: cubicBezierEasing(...pts) };
props.animation.options.timingFunction = timingFunction;
props.animation.frames.forEach((frame) => { frame.timingFunction = timingFunction; });
emit("updateTimingFunction", "cubic-bezier");
```
Composable (`setAnimationTimingFunction`, reached synchronously by that very emit via `updateTimingFunctionFromName` at `:135-159`):
```ts
const easing = { fn: timingFunction };
animation.options.timingFunction = easing;
animation.frames.forEach((frame) => { frame.timingFunction = easing; });
```
`updateTimingFunctionFromName("cubic-bezier")` re-derives `cubicBezierEasing(...storedAnimationOptions.cubicBezierOptions.controlPoints)` — the quad the panel wrote one line earlier — and overwrites both `options.timingFunction` and every `frames[].timingFunction` with a **different** `{fn}` object. Per pointermove frame: two `CubicBezier` constructions, two wrapper allocations, two full `frames[]` walks, one of each discarded.

The tell that this is vestigial rather than deliberate: the **steps** branch (`:135-140`) performs no engine write at all and relies entirely on the emit. The asymmetry has no stated rationale.

**Falsifier.** A path where `updateTimingFunction` is not bound to `updateTimingFunctionFromName` (`ChannelOptions.vue:319-321` binds it), or where the emit is deferred/dropped (Vue emits are synchronous), or where `updateTimingFunctionFromName` reads a quad other than the one the panel just wrote (`:153-155` reads `storedAnimationOptions.cubicBezierOptions.controlPoints`, written at panel `:143`).

### L-5 · MAJOR · the vendor hands over `fn` and `css`; the panel discards both and recomputes them downstream

**Provenance** `EasingPickerValue` (`dist/components/easing/composables/useEasingPicker.d.ts`) carries six fields: `mode`, `css`, `fn`, `points`, `steps`, `term`. `TimingFunctionPanel.vue:133-154` reads `mode`, `points`, `steps`, `term` — never `css`, never `fn`.

Both discarded fields are the *validated* forms the panel then re-derives unvalidated:

- **`fn`** is the live value.js callable, already `requireEasing`-checked inside the vendor (`dist/easing.js`: `H("EasingPicker:CubicBezier", M(e,t,r,a))`). The panel throws it away and rebuilds it via `cubicBezierEasing(...pts)` (`:144`).
- **`css`** is the complete re-parseable literal, and the vendor has already round-tripped it through Value's parser (`reparseOk`: `f = d(() => { let e = j(u.value); … })`, `j` = `parseTimingFunction`). The panel discards it; `useTimingFunctionEditor.ts:120-133` then re-derives the same string via `cubicBezierToString(...)`.

The panel is the boundary at which the vendor's contract is delivered, and it drops the two fields the contract exists to provide, in favour of a second, unverified derivation of each.

**Falsifier.** If `fn`/`css` were absent from the payload (they are declared and populated — `p = d(() => ({ mode, css, fn, points, steps, term }))`). Or if the demo required an easing identity distinct from the vendor's for WAAPI dedup — it requires *one shared object across frames* (see S+3), which `v.fn` satisfies identically.

### L-6 · MAJOR · `isSeedEcho` hard-codes an unexported vendor constant and is anchored to the wrong reference

**Provenance** `TimingFunctionPanel.vue:126` (`bezierPresets["ease-out-back" as keyof typeof bezierPresets]`), `:106-130` (whole predicate).

Two problems, the second worse:

1. **Unexported-constant coupling.** `"ease-out-back"` is the vendor's `DEFAULT_BEZIER_PRESET` (`dist/components/easing/constants.d.ts`). It is **not** re-exported from `@mkbabb/glass-ui/easing` — `dist/components/easing/index.d.ts` exports only `EasingPicker`, `EasingConfigurator`, `useEasingPicker` and types. So the literal is *forced*, and it is a silent coupling to a private vendor default that no type or test pins. Given L-3 (no version declared), a vendor default change is undetectable here.
2. **Wrong anchor.** The predicate asks *"does the echo match what is STORED?"* (`:115-117`) rather than *"does the echo match the SEED the picker was mounted with?"* Those coincide only while store and seed agree — which is exactly the condition L-1 breaks. Post-remount the store holds the dragged quad and the picker holds `ease-out-back`; the store-anchored predicate falls through to the hard-coded arm and returns `true`, silently ratifying the desync. `EasingSidebar.vue:143-155` anchors to the seed (`const seed = pickerSeed.value; … quadEq(quad, v.points)`) and does not have the hole.

**Falsifier.** `DEFAULT_BEZIER_PRESET` reachable from any public glass-ui entry (checked `dist/easing.d.ts` → `export * from "./components/easing"` → the index above: not reachable). Or a demonstration that store-anchoring and seed-anchoring are equivalent under all reachable states — refuted by the L-1 trace.

### L-7 · MAJOR · the seed/echo protocol is a copy-paste fork between two consumers, mutated in transit

**Provenance** four parallel pairs:

| concern | this panel | `demo/scenes/easing/EasingSidebar.vue` |
|---|---|---|
| `quadEq` | `:84-87` (`readonly number[]`, length check) | `:167-170` (`readonly [n,n,n,n]`, no length check) |
| `isSeedEcho` | `:106-130` (store-anchored) | `:143-155` (seed-anchored) |
| `:key` seed | `:101` computed off live authored points | `:98-118` `ref` + `watch`, `null` for custom |
| `.easing-editor` container CSS | `:162-165` | `:217-220` (identical two declarations) |

No shared module; both files declare their own. The fork diverged on precisely the three axes that decide correctness — computed-vs-ref seed, presence of a monotonic re-seat counter (`++seedCount`, sidebar `:99, 110, 113` — this panel has none, so an intentional re-seat to an identical key silently does not remount), and echo anchor — and **only this copy is defective on all three**. ~60 lines that want one `useEasingPickerSeed()` colocated beside its two consumers.

**Falsifier.** A shared module both import. There is none — grep for `quadEq` finds two independent declarations.

---

## MINOR

### L-8 · MINOR · `progress` is a dead prop, and the parent maintains a live computed to feed it

`TimingFunctionPanel.vue:69` declares `progress?: number`; it is referenced nowhere in the template or script. `ChannelOptions.vue:506-510` computes `normalizedProgress` (reads `props.animation.options.duration` and `currentT.value`, clamps) and passes it at `:317`. Compounded by `:playback="false"` (`:38`): `EasingPicker` exposes no progress-in seam at all (`EasingPicker.vue.d.ts` props: `mode`, `preset`, `steps`, `term`, `readout`, `playback`, `label`), so the prop is not merely unused — it is unwireable.
**Falsifier.** Any `progress` reference in the SFC. None.

### L-9 · MINOR · `as JumpTerm` (`:37`) and `const jumpTerm: JumpPosition` (`:137`) are both inert, and the cast is the dangerous kind

**Measured** from the published artifacts: `@mkbabb/value.js` `dist/subpaths/easing.d.ts:31,33` — `JumpPosition = "jump-start" | "jump-end" | "jump-none" | "jump-both"` and `jumpTerms: readonly ["jump-start","jump-end","jump-none","jump-both"]`. glass-ui `JumpTerm = (typeof jumpTerms)[number]` (same array). Store `stepOptions.jumpTerm: (typeof jumpTerms)[number]` over a locally re-declared copy of the same four (`animationOptionsStore.ts:13-18, 26`). All three are the identical type.

So `:37`'s `as JumpTerm` asserts nothing, and `:137-138`'s annotated temporary could be `props.…jumpTerm = v.term`. Both signal "there is variance here" where there is none — and the cast will silently swallow the break if the types ever *do* diverge, which is the whole reason a cast is worse than a redundant annotation.
**Falsifier.** Either type carrying a member the other lacks. Measured: identical.

### L-10 · MINOR · `String(cur.jumpTerm)` (`:111`) is a no-op

`jumpTerm` is a string-literal union (L-9). The coercion produces the same value and the same type. Dead.
**Falsifier.** `jumpTerm` typed non-string.

### L-11 · MINOR · the panel is never unmounted, so an `EasingPicker` is live on every channel permanently

`ChannelOptions.vue:303-323` renders `<TimingFunctionPanel>` inside a `panel-row--detail` div hidden by CSS only — `grid-template-rows: 0fr` (`:564-566`), `opacity: 0; pointer-events: none` (`:580-583`) — not `v-if`, not `v-show`. Every channel therefore permanently holds a mounted `useEasingPicker`: a `useReducedMotion` matchMedia subscription, two `immediate` watchers, ~8 computed chains, and a render effect that re-runs on every `controlPoints` write whether visible or not. Teardown itself is correct — the vendor registers `b(() => { D(); T(); })` (`onScopeDispose`, cancelling the watcher and the rAF) — it simply never runs.
**Falsifier.** A `v-if` (or lazy `v-show`) above the panel in the parent. The class-toggle at `:305-310` is the only gate.

### L-12 · MINOR · `container-name: easing-editor` (`:164`) is dead

**Measured**: the only occurrences of `easing-editor` in the tree are the two class applications and the two declarations (`TimingFunctionPanel.vue:12,162-165`; `EasingSidebar.vue:14,217-220`) — no `@container easing-editor (…)` rule exists in `demo/` or in glass-ui's shipped CSS. The vendor sizes with a bare `clamp(200px, 38cqi, 320px)` (`dist/easing.js`, svg `style`), which binds to the nearest `container-type: inline-size` ancestor by proximity, never by name. `container-type` is load-bearing; the name is inert. Duplicated dead line in both files.
**Falsifier.** Any named container query on `easing-editor`.

### L-13 · MINOR · `justify-items-center` on the outer grid (`:2`) is inert

The grid's single child (`:12`) is `w-full`, so it already fills the column track; `justify-items` has nothing left to align. Dead class on a wrapper whose only other job is `w-full grid` — the wrapper itself is arguably removable.
**Falsifier.** A second, non-`w-full` child in that grid.

### L-14 · MINOR · the emit type collapses to `string`

`:74` — `(e: "updateTimingFunction", key: TimingFunctionNames | "cubic-bezier" | string)`. `| string` absorbs the union; `emit("updateTimingFunction", "banana")` typechecks. The receiver then throws a runtime `TypeError` for an unclassifiable value (`useTimingFunctionEditor.ts:141-145`) — the check that the type would have made static was widened away. The panel provably only ever emits `"steps"` (`:139`) and `"cubic-bezier"` (`:153`), both inside the tight union, so `| string` buys nothing. The adjacent seam `timingFunctionLiteralFor` (`useTimingFunctionEditor.ts:120-122`) keeps the tight `TimingFunctionNames | "cubic-bezier"`, so the widening is local and unmotivated.
**Falsifier.** A call site in this component emitting a value outside the tight union. There is none.

### L-15 · MINOR · the stored `steps` default (100) sits outside the vendor's authoring range, with no reconciliation

`animationOptionsStore.ts:52-55` defaults `steps: 100`. The vendor's slider is `min: 1, max: 12` (`dist/easing.js`; `STEP_COUNT_MIN`/`STEP_COUNT_MAX` in `constants.d.ts`) and its inbound applier clamps `Math.max(1, Math.min(12, Math.round(e.steps)))`. The **initial-prop** path does **not** clamp (`let s = C(t.initialSteps ?? 4)`), so `:36`'s `:steps="…steps"` seeds 100 and the echo matches — no clobber, and `isSeedEcho` (`:108-113`) is correct here. But the trip is one-way: the moment the slider is touched the value is unrecoverable through this UI, and the staircase renders 100 treads through a 240-sample path (`STEP_PLOT_SAMPLES`) — under 2.4 samples per tread. The panel forwards an unvalidated store value across a bounded vendor contract and reconciles nothing.
**Falsifier.** `STEP_COUNT_MAX >= 100`, or a clamp on `initialSteps`. Neither holds.

---

## INFO

### L-16 · INFO · `cubicBezierEasing` throws, unguarded, inside a per-pointermove handler — currently unreachable

`timingCurveUtils.ts:14-33` throws a bare `Error` when `CubicBezier` returns not-ok, and `:144` calls it with no guard inside a Vue event handler that runs once per pointermove. **Measured** rejection domain (executing the published value.js easing subpath): `[1.5,0,0.5,1]` → `bezier_x_out_of_range`; `[-0.1,0,1,1]` → `bezier_x_out_of_range`; `[0.5,-5,0.5,5]` → **ok**; `[0,-0.6,1,1.6]` → **ok**. Only x ∉ [0,1] rejects, y is unconstrained. The vendor's `setHandle` clamps x to `[0,1]` (`Math.max(0, Math.min(1, t))`) and every catalogue preset has x ∈ [0,1], so the throw is unreachable today.

Recorded as **posture, not defect**: the panel's sole error handling for a hot-path call is an uncaught throw, and the invariant that keeps it safe lives entirely in the vendor — the same vendor whose version is unpinned (L-3). Using `v.fn` (L-5) removes the exposure outright.
**Falsifier.** Any path feeding `onPickerChange` a quad with x outside [0,1]. None found.

### L-17 · INFO · the cluster's documented premise about catalogue divergence is false against the installed tree

`EasingSidebar.vue:87-89` asserts that the demo's `NAMED_EASING_BEZIER` *"is wider (quart/quint) and differs on some quads (sine)"* than `bezierPresets`, and that assertion is the stated justification for seeding by preset-name only.

**Measured**: all 29 `NAMED_EASING_BEZIER` entries (`animationDescriptions.ts:16-49`) exist in `bezierPresets` under the same name with quads identical to within 5e-4 — every quart, every quint, every sine included. `bezierPresets` is a strict superset (30; the extra is `smooth-step-3`). `NAMED_EASING_BEZIER` is therefore a 34-line verbatim duplicate of a value.js export that both files already import.

This does not overlap any lane finding; it contradicts in-tree prose. It matters to *this* file because the panel's `seedPreset` (`:92-99`) searches `bezierPresets` directly and is therefore *correct* — but the same 29/29 identity is what makes L-1 fire on every named→bezier conversion rather than occasionally.
**Falsifier.** Any name/quad pair differing by ≥5e-4. The probe printed an empty non-matching set.

---

## Superlatives (L-18, running the other way)

### S+1 · the seed-echo-by-VALUE invariant is the correct shape

`:102-105, 106-130`. Recognising a remount's `immediate` emission **by value** rather than by ordering — no flag, no `nextTick`, no emission counter — is the only formulation that cannot be defeated by a dropped, duplicated, or reordered echo. The comment states it as an invariant (*"recognized BY VALUE so opening the panel never clobbers the animation's stored curve"*) and the code implements exactly that. The anchor is wrong (L-6) and the remount it defends should not exist (L-2), but the *principle* survives both and should be carried into the replacement.
**Falsifier.** An ordering-based guard provably as robust under lost/duplicated emissions.

### S+2 · `quadEq`'s 5e-4 tolerance is exactly right, and non-obviously so

`:84-87`. The vendor quantizes every authored coordinate with `+a.toFixed(3)` (`dist/easing.js`, `setHandle`), and every `bezierPresets` value is ≤3 dp (verified across all 30 entries). 5e-4 is precisely the half-width of that quantum: two distinct authored quads differ by ≥1e-3 and can never alias, while an exactly-equal quad survives the float round-trip. Deriving the epsilon from the *producer's* rounding rather than reaching for a round number is the correct derivation, and it is not the obvious one.
**Falsifier — and it is a live one.** A `bezierPresets` entry at >3 dp, or a vendor move to `toFixed(4)`, silently breaks it. Nothing in the tree pins the pairing, and per L-3 nothing pins the vendor either. The tolerance deserves the comment it does not have.

### S+3 · the single-`{fn}`-shared-across-frames discipline is preserved, and it is compensating for a real engine gap

`:144-148`. The panel constructs **one** `{ fn }` and assigns the **same object reference** to `options.timingFunction` and to every frame, rather than a fresh wrapper per frame. That is the right call for two independent reasons the code gets right:

- `interpolate.ts:254` reads `frame.timingFunction.fn(scaled)` — the hot path is **per-frame**, not per-options.
- The engine's own public setter does not reach the frames: `animation.ts:260` `setTimingFunction` → `option-setters.ts:32-37` `applyTimingFunction` writes `anim.options.timingFunction` and **nothing else**. Compiled frames take their `timingFunction` at `parse()` time (`frame-compiler.ts:217-228`, falling back to `this.options.timingFunction`), and `parse()` resets `this._frames = []` (`:340`). So the sanctioned public setter is a **no-op on playback until the next recompile**, and the demo's two-write idiom is the only thing that makes a live curve edit visible without a full re-parse.

This is dogfooding doing its job: the consumer surfaced a gap in the library's own option-setter contract. (Note the caveat that keeps this honest — because `frames` is a compiler-delegated getter over a recompilable array, the per-frame writes are erased by any subsequent `parse()`. The demo gets away with it because nothing recompiles mid-edit.)

**No contradiction with L-4.** S+3 praises the *shape* of the write; L-4 says *this particular copy* of it is redundant, because the emit on the next line drives `setAnimationTimingFunction` to perform the identical write with a different object. The shape belongs in the composable — where it already is.
**Falsifier.** Evidence that `applyTimingFunction` propagates to compiled frames (it does not), or that `interpolate` reads `options.timingFunction` (it reads `frame.timingFunction`).

---

## Provenance index

Read whole, read-only: the target SFC; `demo/components/instrument/transport/channel-controls/ChannelOptions.vue` (call site, `:303-323`, `:459-510`, `:558-585`); `…/composables/useTimingFunctionEditor.ts`; `demo/utils/reference-data/animationDescriptions.ts`; `demo/utils/reference-data/timingCurveUtils.ts`; `demo/state/animationOptionsStore.ts`; `demo/scenes/easing/EasingSidebar.vue`; `src/animation/engine/animation.ts`, `option-setters.ts`, `interpolate.ts`; `src/animation/compile/frame-compiler.ts`; `src/animation/constants/types.ts`; `vite.config.ts`, `tsconfig.json`, `package.json`; `node_modules/@mkbabb/glass-ui/{package.json,dist/easing.js,dist/easing.d.ts,dist/components/easing/*.d.ts}`; `node_modules/@mkbabb/value.js/dist/subpaths/easing.d.ts`.

Executed as data (published artifacts only, no source mutated): `@mkbabb/value.js/dist/subpaths/easing.js` for the `bezierPresets` table, the `jumpTerms` tuple, and the `CubicBezier` rejection domain; the parsed `NAMED_EASING_BEZIER` table for the 29/29 overlap.
