served model id: `claude-opus-5[1m]`

# CHALLENGE — `EasingSidebar.vue` · axis **L (LIBRARY)**

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/easing/EasingSidebar.vue` (234 L)
**Date** 2026-08-04 · **Posture** assume-defective-until-proven · static, source-derived only (no browser; livable-only claims marked `UNPROVEN-NEEDS-LIVE`)
**Verdict** **2 BLOCKER · 5 MAJOR · 5 MINOR · 3 INFO · 5 SUPERLATIVE** — the component is *architecturally* the right shape (one vendor primitive, one authoring seam, leak-clean) and *behaviourally* wrong at three reachable seams. Its three load-bearing prose rationales are each falsified by the installed tree.

## Read-set (every import, read whole, read-only)

| file | why |
|---|---|
| `demo/scenes/easing/EasingSidebar.vue` | target |
| `demo/scenes/easing/easingKeys.ts` | `EasingDemoContext`, `EASING_SCENE_ID`, `EASING_DEMO_KEY` |
| `demo/scenes/easing/useEasingDemo.ts` (410 L) | the context type the sidebar mutates |
| `demo/scenes/easing/EasingScene.vue` (133 L) | the mount site (`h(EasingSidebar, { demo })`, `:57`) |
| `demo/scenes/easing/EasingTarget.vue` | the sibling reader (`literal`, `:209-220`) |
| `demo/utils/reference-data/animationDescriptions.ts` | `NAMED_EASING_BEZIER` (29 keys, `:16-49`) |
| `demo/utils/reference-data/timingCurveUtils.ts` | `namedEasing`/`steppedEasing`/`requireEasing` (`:13-46`) |
| `demo/utils/reference-data/easingGroups.ts` | `EASING_GROUPS` — proves tile reachability |
| `node_modules/@mkbabb/value.js/dist/subpaths/easing.d.ts` + runtime | `bezierPresets` (30 keys) |
| `node_modules/@mkbabb/glass-ui/dist/components/easing/*.d.ts` + `dist/easing.js` | `EasingPicker` props/emits/`useEasingPicker` **7.0.0** |
| `node_modules/@mkbabb/glass-ui/dist/components/labeled-field/types.d.ts` + `dist/labeled-field.js` | `LabeledSliderProps` |
| `demo/components/instrument/transport/channel-controls/TimingFunctionPanel.vue` | the second `EasingPicker` seat (duplication peer) |

**Hitherto corpus folded** — `formation/keyframes/lane-frontend.md`: **F-1** (glass-ui phantom dep) is the root enabler of L-M1/L-M2 below; row `| 234 | easing/EasingSidebar.vue | G |` (`:245`) is the census entry; **S-1** ("RED, 217 lines, **stale rationale**") is the exact defect *class* L-M2 belongs to — a `glass-ui 4.0.1` justification frozen into product source and falsified by the installed 7.0.0. `lane-library.md:57` (value.js 4.0.0 pinned EXACT, 7 subpaths) is the counter-case: the *declared* dep is reproducible, the phantom one is not.

---

## BLOCKERS

### L-B1 · `isSeedEcho` compares against the **seed**, not against live state — a real edit is permanently swallowed and the editor desyncs from the scene

**Severity BLOCKER** · `EasingSidebar.vue:144-157` (guard), `:185` (application), `:163-165` (why the seed goes stale)

`isSeedEcho` asks *"does this emission equal the value I seeded the picker with?"* (`:154-156`: `quad = bezierPresets[seed.preset]; return !!quad && quadEq(quad, v.points)`). The seed is only replaced when `seedFor` returns non-null (`:164` `if (seed) pickerSeed.value = seed;`) and `seedFor` returns `null` for `"cubic-bezier"` (`:115-118`). So after any custom drag the seed is **stale but still armed**, and the seed quad becomes an absorbing value the component can never accept again.

Reachable, deterministic sequence (every step verified in source):

1. Tile `ease` → `selectEasing("ease")` sets `currentEasingName="ease"`, `bezierControlPoints=[0.25,0.1,0.25,1]` (`useEasingDemo.ts:246-258`). Watch (`:159-166`) → `pickerSeed = {mode:"bezier", preset:"ease", key:"bezier:ease:N"}` → remount.
2. Drag a handle → emission ≠ ease. `:199-204` no-op guard fails → `nameForQuad` misses → `:210 updateBezierPoints(points)` → `currentEasingName` flips to `"cubic-bezier"` (`useEasingDemo.ts:265-271`). Watch fires; `seedFor("cubic-bezier")` → `null` → **`pickerSeed` still says `preset:"ease"`**.
3. Open the picker's own **Preset** dropdown (rendered in bezier mode — `glass-ui/dist/easing.js` @14911, `"Preset"` + `Select` → `selectPreset`) and pick `ease`. The vendor emits: `selectPreset` writes `points` → `value` recomputes → `Ue` → `q(l.value,e)` false (points differ) → `l.value = e` → `update:modelValue` fires (`easing.js` @6100-6300).
4. `onPickerChange` → `isSeedEcho` → `quadEq(bezierPresets["ease"], v.points)` → **`true`** → `return` at `:185`.

**Terminal state:** the picker canvas + its copyable readout show `cubic-bezier(0.25, 0.1, 0.25, 1)`; `demo.currentEasingName` is still `"cubic-bezier"` and `demo.bezierControlPoints` still holds the dragged quad; the ball on stage, the header literal (`EasingTarget.vue:215`) and `previewAnim.timingFunction` all animate the *other* curve. No further interaction repairs it except leaving and re-entering that preset via the scene's tile gallery.

The component's own comment (`:140-143`) claims the value-based recognition means "a lost/duplicated echo can **never swallow a real edit**." The principle is sound (see **S-3**); the *predicate* is wrong — it must be "equals the **live demo state**", not "equals the seed". Note the component already contains the correct predicate at `:199-204` (`quadEq(demo.bezierControlPoints.value, v.points)`), which by itself catches the mount echo for every `NAMED_EASING_BEZIER` name; `isSeedEcho`'s bezier arm is load-bearing **only** for the catalogue-split names of **L-M3** and is otherwise pure liability.

**Falsifier** — this claim dies if any of: (a) `EasingPicker` does *not* emit `update:modelValue` when a preset is re-selected while its internal points differ; (b) `pickerSeed` is refreshed on the `"cubic-bezier"` transition; (c) `quadEq`'s `0.0005` tolerance (`:172`) excludes the exact preset quad from itself. (a) is falsified at `easing.js` @6100 (`Ue` emits whenever `q()` fails, and `q` requires `e.fn === t.fn` — function identity across a recompute, so it essentially always fails); (b) at `:163-165` + `:115-118`; (c) trivially — `|x−x| = 0 < 0.0005`.

---

### L-B2 · With `step-start` / `step-end` selected, every step edit is dropped on stage **and** silently corrupts the `steps` curve's stored config

**Severity BLOCKER** · `EasingSidebar.vue:186-193` · `useEasingDemo.ts:68-71, 84-91, 93-104`

`onPickerChange`'s steps arm writes `demo.stepOptions` unconditionally (`:189-191`) and then re-selects the curve **only if** `!demo.isSteps.value` (`:192`). But `isSteps` is true for all three names:

```ts
// useEasingDemo.ts:68-71
const isSteps = computed(() => {
    const n = currentEasingName.value;
    return n === "steps" || n === "step-start" || n === "step-end";
});
```

so with `step-start` selected the re-select never fires, and *nothing downstream reads `stepOptions`* for that name:

- `currentEasingFn` (`useEasingDemo.ts:78-91`) falls to `namedEasing("step-start")` → `steppedEasing(1, "jump-start")` (`timingCurveUtils.ts:43`) — **hard-coded 1 step**, `stepOptions` ignored.
- `cssValue` (`:93-104`) returns the bare name `"step-start"` — unchanged, so `watch(cssValue, …)` (`:308`) does not even fire and `previewAnim` keeps its old timing function.
- `svgPath` (`:111`) and `EasingTarget`'s `getCurvePath` both return `generateStepSVGPath(1)`.

Reachability is proven: `easingGroups.ts` ships `item("step-start", …)` and `item("step-end", …)` in the `Steps` family, and `EasingTarget.vue:158` renders `EASING_GROUPS.filter(g => g.family !== "Custom")` — both tiles are on stage. The vendor's step count slider is `min: 1, max: 12` (`easing.js` @15486) and renders whenever `mode === "steps"`; `:playback="false"` does not hide it.

**Second-order damage (the worse half):** the dropped write is not inert. `demo.stepOptions.value = { steps: 6, jumpTerm: "jump-start" }` persists, and `seedFor("steps")` reads exactly that (`:103-106`). So editing `step-start` silently rewrites what the **`steps`** tile will open with next time — a cross-curve state leak with no user-visible cause.

**Falsifier** — dies if `isSteps` excluded the two singular names, or if `namedEasing`/`cssValue`/`svgPath` consulted `stepOptions` for them, or if the picker suppressed its step rows under `playback:false`. All four checked and false at the cited lines.

---

## MAJORS

### L-M1 · `tooltip` and `label-class` on `<LabeledSlider>` are **dead bindings** — glass-ui 7.0.0 declares neither prop

**Severity MAJOR** · `EasingSidebar.vue:57` (`label-class=…`), `:58` (`tooltip="Sweep duration (ms)"`)

```
$ grep -c "tooltip\|labelClass\|label-class\|Tooltip" node_modules/@mkbabb/glass-ui/dist/labeled-field.js
0   0   0   0
```

The compiled `LabeledSlider` prop table (`labeled-field.js`, `name:"LabeledSlider"`) is exactly `variant size marks invalid keepDockOpen motion defaultValue disabled orientation dir inverted min max step minStepsBetweenThumbs thumbAlignment asChild as name required label description requirement layout errorLive modelValue` — no `tooltip`, no `labelClass`. The type surface agrees: `LabeledSliderProps = Omit<SliderProps,"class"|"modelValue"> & LabeledFieldCommonProps & { modelValue: number }`, and `LabeledFieldCommonProps` is `{ label, description, requirement, layout, errorLive }` (`components/labeled-field/types.d.ts`), `SliderProps extends SliderRootProps` with `{ class, variant, size, marks, invalid, keepDockOpen, motion }` (`components/slider/types.d.ts`).

Both therefore land in `$attrs` and, with default `inheritAttrs`, are stamped onto the root element as inert DOM attributes `tooltip="…"` / `label-class="…"`. **The duration slider has no tooltip and the label carries none of `text-small font-medium text-muted-foreground`.** The setup even proves the props cannot leak through to the inner Slider: it peels the declared props off and forwards only the rest of `props` (not `$attrs`) — `let { label, description, requirement, layout, errorLive, modelValue, ...s } = n; return s;`.

This is **F-1 biting exactly where lane-frontend predicted**: `@mkbabb/glass-ui` is absent from `package.json` (deps = `{"@mkbabb/value.js":"4.0.0"}` only) *and* from the lock, so the 4.0.1→7.0.0 drift that retired these props produced no install error, no lock diff, and no review signal. Same dead idiom at `scenes/spring/SpringPhysicsFacet.vue:29-30, 40-41` and `channel-controls/LayerConfigPanel.vue:51` — 3 files, 4 sliders.

**Falsifier** — dies if `LabeledField` (the wrapper `P`) consumed `$attrs.tooltip`/`$attrs["label-class"]`, or if the demo augments `ComponentCustomProps`. The former: `grep tooltip` over the whole `labeled-field.js` returns 0. The latter: no `ComponentCustomProps` augmentation exists anywhere in `demo/` or `src/`. Also dies if `npm run check` (`tsc --noEmit`) currently errors on these — but `check` is plain `tsc`, not `vue-tsc`, so **SFC templates are never type-checked at all** in this repo. That is itself the gate gap that lets L-M1 live.

---

### L-M2 · The load-bearing vendor rationale is stale: glass-ui 7.0.0's `modelValue` **does** write through

**Severity MAJOR** · `EasingSidebar.vue:17-22` (and the byte-identical claim at `TimingFunctionPanel.vue:25-31`)

> "glass-ui 4.0.1's modelValue is EMIT-ONLY (no external write-through / points-in prop), so a remount is the only blessed re-seat seam"

Against the installed **7.0.0** (`node_modules/@mkbabb/glass-ui/package.json`), the picker watches its model and seats mode / points / steps / term from it:

```js
// dist/easing.js — EasingPicker setup
function We(e) {
  if (!e) return;
  if (q(J, e)) { J = void 0; return; }
  v.value = e.mode === "steps" ? "steps" : "bezier",
  Array.isArray(e.points) && e.points.length === 4 && e.points.every(Number.isFinite)
    && e.points.some((e,t) => e !== b.value[t]) && (N(0, e.points[0], e.points[1]), N(1, e.points[2], e.points[3])),
  Number.isFinite(e.steps) && (P.value = Math.max(1, Math.min(12, Math.round(e.steps)))),
  I.includes(e.term) && (F.value = e.term);
  let t = B.value; q(e, t) || Ue(t);
}
k(l, We, { deep: !0, immediate: !0 });      // ← external write-through
k(() => c.mode, e => { v.value = e; });     // ← `mode` is reactive too, not initial-only
```

`We` reads only `mode`/`points`/`steps`/`term` — the two heavy fields (`css`, `fn`) are never consulted on the way in. So "the only blessed re-seat seam" is false: `v-model` re-seating is available and would eliminate the remount entirely. This is the **S-1 defect class verbatim** (a `glass-ui 4.0.1` justification outliving three majors of vendor drift) and lane-frontend's remedy applies unchanged: the rationale must be re-derived against 7.0.0 before the seam is defended.

I am **not** claiming the switch is free — `EasingPickerValue` requires all six fields, so a write-through parent must either synthesise `css` + `fn` or cast. The defect is that the source asserts an impossibility that the installed tree contradicts, and that assertion is the sole justification for the remount idiom.

**Falsifier** — dies if the resolved `EasingPicker` at build time is not the 7.0.0 in `node_modules` (e.g. a vite alias to a different copy). `vite.config.ts:29-33` aliases *keyframes* onto itself for glass-ui's peer, not glass-ui itself; `node_modules/@mkbabb/glass-ui` is a real directory, not a symlink (lane-frontend F-1 table). Also dies if `k`/`te` are not `watch`/`useModel` — both are named in the file's own import map (`watch as k`, `useModel as te`).

---

### L-M3 · The catalogue comment is **inverted**, and it makes the component print a false statement about `smooth-step-3`

**Severity MAJOR** · `EasingSidebar.vue:86-89` (the claim), `:42-49` (the caption), `:112` (the seed gate), `useEasingDemo.ts:73-76` (`isBezierEditable`)

The comment asserts:

> "the demo's named map (`NAMED_EASING_BEZIER`) is **wider** (quart/quint) and **differs on some quads** (sine)"

Measured — both directions, exact:

```
demo NAMED_EASING_BEZIER  n = 29
value.js bezierPresets    n = 30
in demo NOT in value: []                 ← the demo map is a strict SUBSET
in value NOT in demo: [ 'smooth-step-3' ]
value mismatches:     []                 ← every shared quad is bit-identical, sine included
```

`ease-in-sine` is `[0.47,0,0.745,0.715]` in both; quart and quint are present in both (`animationDescriptions.ts:33-38` vs `easing.d.ts` PRESETS). Every clause of the sentence is false, and it is the stated justification for `:112`'s `if (name in bezierPresets)` gate.

The single real difference is the one the comment doesn't mention, and it is user-visible. `smooth-step-3` is a **live gallery tile** (`easingGroups.ts`, Cubic family; rendered via `EasingTarget.vue:158`). Selecting it:

- `seedFor` → `"smooth-step-3" in bezierPresets` → **true** → the picker is seeded `mode:"bezier", preset:"smooth-step-3"` and renders the exact curve `cubic-bezier(0.65, 0, 0.35, 1)`;
- `isBezierEditable` → `"smooth-step-3" in NAMED_EASING_BEZIER` → **false** → `catalogueGap` (`:132-137`) → **true** → the caption renders:

> **"smooth-step-3 is engine-native — editing here authors a custom cubic-bezier"**

Both halves are false while the picker sits directly beneath, displaying it as a bezier preset. Worse, `selectEasing` took the `else` arm and reset `demo.bezierControlPoints` to `[0,0,1,1]` ("linear approximation", `useEasingDemo.ts:256-257`) — so the demo's stored quad and the editor's displayed quad disagree from the moment of selection, and the `:199-204` reconciliation guard is skipped (it is gated on `isBezierEditable`).

One catalogue would kill L-M3 *and* the residual need for `isSeedEcho`'s bezier arm (see L-B1).

**Falsifier** — dies if `smooth-step-3` is unreachable in the gallery (it is in `EASING_GROUPS` and survives the `family !== "Custom"` filter), or if `easing("smooth-step-3")` were not a real value.js registry name (probe: `{ok:true}`), or if the two maps did differ as described (probe above says they do not).

---

### L-M4 · The vendor's re-parse-verified literal (`v.css`) is discarded, so the screen shows two different literals for one curve — neither of which is the animated curve

**Severity MAJOR** · `EasingSidebar.vue:210` · `EasingTarget.vue:215` · `useEasingDemo.ts:93-104`

`EasingPickerValue` carries six fields; the sidebar consumes four (`mode, points, steps, term`) and drops `css` and `fn` (`:183-211`). `css` is not a convenience — it is the field the vendor pairs with `reparseOk`, computed by round-tripping through Value's own parser (`easing.js`: `f = d(() => { let e = j(u.value); if (!e.ok) return !1; … })`, `j = parseTimingFunction` from `@mkbabb/value.js/css`). Discarding it discards the proof.

The re-derivation downstream is **lossier**. The vendor stores handles at 3 dp (`s[e*2] = +a.toFixed(3)`) and prints 3 dp (`i.value.map(e => +e.toFixed(3))`); the demo prints via `cubicBezierToString`, which is 2 dp:

```
cubicBezierToString(0.123456, 0.2, 0.3, 0.4)  →  "cubic-bezier(0.12, 0.20, 0.30, 0.40)"
```

So after one drag to `x1 = 0.123`, one screen carries three inconsistent representations of a single curve:

| surface | value |
|---|---|
| picker readout (copyable, `reparseOk`-verified) | `cubic-bezier(0.123, …)` |
| header literal — `EasingTarget.vue:215` `cubicBezierToString(...demo.bezierControlPoints.value)` | `cubic-bezier(0.12, …)` |
| what actually animates — `previewAnim.setTimingFunction(cssValue)` and `cubicBezierEasing(...points)` | the 2 dp literal on the CSS twin, the **raw** `0.123` on the callable |

For a demo whose entire subject is authoring CSS easing, the copyable literal disagreeing with the rendered motion is a correctness claim, not a cosmetic one. Note the header comment at `:8` — "the F7 truncation class is dead by construction" — is true of the picker's own readout and false of the path this component routes into.

**Falsifier** — dies if `cubicBezierToString` preserved ≥3 dp (probe above: it does not), or if `EasingTarget`'s literal did not use it (`EasingTarget.vue:215` does), or if the vendor stored ≤2 dp (`toFixed(3)`).

---

### L-M5 · Two hand-maintained `EasingPicker` seats, no shared composable — divergent `isSeedEcho` semantics, duplicated `quadEq`, duplicated scoped CSS, duplicated stale comment

**Severity MAJOR** · `EasingSidebar.vue:27-36, 84-87, 106-130, 144-157, 214-220` ⟷ `TimingFunctionPanel.vue:32-41, 84-87, 101, 106-130, 157-165`

Both sites independently implement the same four-part protocol against the same vendor primitive:

| concern | `EasingSidebar` | `TimingFunctionPanel` |
|---|---|---|
| the seat block | `:key/:mode/:preset/:steps/:term/:playback="false"/label="Easing curve editor"` (`:27-36`) | identical seven bindings (`:32-41`) |
| `quadEq` | `readonly [n,n,n,n]` tuples, ε `0.0005` (`:169-172`) | `readonly number[]` + length check, ε `0.0005` (`:84-87`) |
| remount key | `ref` + monotonic `seedCount` (`:98, 110, 113`) | `computed` `${kind}:${seedPreset ?? "custom"}` (`:101`) |
| `isSeedEcho` | vs. the **seed** (`:144-157`) — the L-B1 bug | vs. the **stored state** (`:106-130`) — plus a hard-coded vendor default `"ease-out-back"` (`:126`) |
| scoped CSS | `.easing-editor { container-type: inline-size; container-name: easing-editor; }` (`:217-220`) | byte-identical rule (`:162-165`) |
| the 4.0.1 rationale | `:17-22` | `:25-31` |

The divergence is the tell: the two `isSeedEcho`s encode *different* invariants for the same vendor behaviour, and exactly one of them (the panel's) is right. A single `useEasingPickerSeat(...)` composable — seed derivation, key, echo predicate, container CSS — collapses ~55 duplicated lines, fixes L-B1 by construction, and gives the F-1 remediation one place to re-derive L-M2's rationale instead of two.

**Falsifier** — dies if the two seats have materially different requirements that resist a shared predicate. They do not: both seed by preset-name lookup into `bezierPresets`, both must suppress the same `immediate:true` mount emission, both must survive a custom quad with no matching preset. What differs is only *where the truth lives* (a demo ref vs. a stored options object) — a single parameter.

---

## MINORS

**L-m1 · `catalogueGap` is a hand-synced `ref` where `computed` is the idiom, and its first clause is dead** — `:131-138`. `syncGap` reads `demo.isBezierEditable.value` / `demo.isSteps.value` (live computeds derived from `currentEasingName`) but takes `name` as a parameter and uses it only for `name !== "cubic-bezier"` — a clause already implied by `!isBezierEditable`, since `isBezierEditable` is true for `"cubic-bezier"` by its first disjunct (`useEasingDemo.ts:74-75`). The whole block is one `computed(() => !demo.isBezierEditable.value && !demo.isSteps.value)`. *Falsifier:* dies if `isBezierEditable` could be false while the name is `"cubic-bezier"` — impossible at `useEasingDemo.ts:73-76`. No live staleness today (both computeds share the one source), so this is idiom + dead-condition, not a behaviour bug.

**L-m2 · Two no-op type assertions that suppress nothing** — `:105` (`demo.stepOptions.value.jumpTerm as JumpTerm`) and `:187` (`v.term as typeof demo.stepOptions.value.jumpTerm`). glass-ui's `JumpTerm = (typeof jumpTerms)[number]` is imported *from* `@mkbabb/value.js/easing` (`useEasingPicker.d.ts:2`), the same union as the demo's `JumpPosition` (`easing.d.ts`). Structurally identical → the casts are inert and, worse, would silently absorb a genuine future divergence in the one place a real check belongs. *Falsifier:* dies if the two resolve to different value.js instances with different member sets — one installed copy, one union, checked.

**L-m3 · The duration write bypasses any rebase seam, so a live duration change jumps the sweep phase** — `:62` `demo.duration.value = v`. The rAF loop computes `phase = ((now - startTime) / (duration.value * 2)) % 1` (`useEasingDemo.ts:185`) and `startTime` is rebased only in `onArm` (`:208-210`). `watch(duration, d => previewAnim.setDuration(d))` (`:316-318`) updates the CSS twin but not the clock anchor. Dragging duration 1500→3000 mid-play instantaneously halves `phase` — the ball teleports backward. The sidebar is the **only** surface that mutates `duration`, and it does so by raw cross-boundary ref write rather than through a composable method that could rebase. *Falsifier:* dies if any watcher rebases `startTime` on duration change — none exists in the file. `UNPROVEN-NEEDS-LIVE` for the perceptual magnitude only; the arithmetic is not in doubt.

**L-m4 · Four exports of the consumed `EasingDemoContext` have zero consumers** — `svgPath`, `currentEasingFn`, `comparisonCurves`, `currentFamily` (`useEasingDemo.ts:78-131, 386-389`). Repo-wide probe over `demo/**/*.{vue,ts}` excluding the defining file: **0 hits each**. ~40 lines of derived state plus their upstream imports (`generateCurveSVGPath`, `getFamilyForCurve`, `getFamilyCurves`) are dead. The sidebar imports the whole return type as its prop contract, so it carries the dead surface into its own signature. *Falsifier:* dies on any consumer outside `useEasingDemo.ts` — grep found none, including template usage in `EasingTarget.vue`, which builds its own `literal` (`:209-220`) and its own step string (`:212`) instead. **Side effect worth recording:** because `currentEasingFn` is never read, the Vue computed never evaluates, which *defuses* the otherwise-real `requireEasing` throw path (see L-i2).

**L-m5 · Prop-vs-inject inconsistency inside one scene** — `easingKeys.ts:9` defines `EASING_DEMO_KEY`, `EasingScene.vue:21` provides it, `EasingTarget.vue:152` injects it — and `EasingSidebar` alone takes the same object as a prop (`EasingScene.vue:57` `h(EasingSidebar, { demo })`; `EasingSidebar.vue:82-83`). Two delivery mechanisms for one context in one scene. *Falsifier:* dies if `EasingSidebar` is rendered outside the provider's instance chain — it is returned from `tabsContent`, invoked by the controls host below `EasingScene` in the tree, so inject should resolve; but the render is indirect enough that I mark the *remedy* `UNPROVEN-NEEDS-LIVE` while the *inconsistency* stands as observed.

---

## INFO

**L-i1 · `quadEq` is referenced before its `const` declaration** — used at `:156` (inside `isSeedEcho`), declared at `:169-172`. No live TDZ: the earliest possible call is the child's `immediate:true` emission during the child's setup, which runs after the parent's `<script setup>` body completes. Fragile only if a future edit invokes `isSeedEcho` during parent setup. *Falsifier:* dies if any parent-setup-time path reaches `isSeedEcho` — `:121-127` (`seedFor`) and `:138` (`syncGap`) are the only setup-time calls and neither touches `quadEq`.

**L-i2 · `steps(1, jump-none)` is authorable and throws — inside the vendor, with no `onErrorCaptured` here** — `steppedEase(1,"jump-none")` returns `{ok:false, code:"step_count_invalid"}` (probed), and glass-ui's `easingFn` throws on it (`easing.js`: `H("EasingPicker:steppedEase", F(s.value, c.value))` with `H(e,t){ if(!t.ok) throw Error(...) }`). The picker's own slider allows `n=1` and its term `Select` offers all four `jumpTerms`, so the combination is reachable in two clicks. The throw occurs in the vendor's `value` computed *before* `onPickerChange` is ever called, so the authored curve simply never reaches the demo, and this component installs no error boundary. Attribution is **vendor-first**; the sidebar's exposure is derived. `UNPROVEN-NEEDS-LIVE` for what the user actually sees. *Falsifier:* dies if the vendor clamps `jump-none` to `n ≥ 2` — it does not (`P.value = Math.max(1, Math.min(12, …))`, term unvalidated against count).

**L-i3 · `const demo = props.demo` snapshots the prop object at setup** — `:83`. Correct today (one `useEasingDemo()` per scene mount, `EasingScene.vue:20`), and the captured value is a bag of refs so reactivity survives; but a future re-render with a different `demo` would be ignored. Recorded, not charged. *Falsifier:* dies if `tabsContent` ever produced a second context — it closes over the single `demo` const.

---

## SUPERLATIVES (L-18 the other way)

**S-1 · `:playback="false"` is a correctly-reasoned refusal of a second uncoordinated clock** — `:33`, rationale `:22-26`. Verified: the picker owns a private travel loop (`requestAnimationFrame` ×2 / `cancelAnimationFrame` in `dist/easing.js`, `playTravel`/`cancelTravel`/`stopTravel`), while the scene already runs one machine-gated rAF sweep (`useSweepScene`, `useEasingDemo.ts:203-226`). Admitting the picker's clock would have contradicted the scene's own "zero rAF ticks at rest" guarantee (`EasingScene.vue:119-125`). This is disciplined engine-consumption, and the reasoning in the comment is *correct* — unusually, given L-M2/L-M3 sit ten lines away. *Falsifier:* dies if `playback:false` did not gate the travel loop, or if the scene had no independent clock. Both checked.

**S-2 · The scoped `container-type: inline-size` is load-bearing, not cargo** — `:214-220`. The vendor genuinely sizes its canvas in container units: `clamp(200px, 38cqi, 320px)` appears verbatim in `dist/easing.js`. Without a container on an ancestor, `cqi` resolves against the viewport and the canvas mis-sizes in the narrow rail. The comment names the exact value and the exact reason, and both check out. (Contrast L-M2, where the same file's vendor claim does not.) *Falsifier:* dies if `cqi` were absent from glass-ui 7 — probed present.

**S-3 · Value-based echo recognition is the right *principle*** — `:140-143`. The vendor emits on mount via `k(B, Ue, { immediate: !0 })` and its internal `q()` de-dupe compares `e.fn === t.fn` (function identity), which fails across recomputes — so emissions are neither singular nor reliably ordered. An order-based ("skip the first emission") guard would be genuinely unsafe here. The component reasoned correctly about vendor behaviour it could not see documented; only the *predicate* is wrong (L-B1). Credit where the analysis was right.

**S-4 · The seed gate defers to the vendor's catalogue and never hard-codes its default** — `:112` `if (name in bezierPresets)`. glass-ui falls back silently when handed an unknown preset (`i = C([...N[r.value in N ? r.value : le]])`, `le = "ease-out-back"`), so an ungated seed would land on a curve nobody chose. This component gates on the vendor's own key set and always supplies an explicit preset (including the `:123-126` fallback), so the vendor default is unreachable. Its sibling does not: `TimingFunctionPanel.vue:126` hard-codes the literal string `"ease-out-back"` into consumer code to compensate. This site is strictly the better citizen.

**S-5 · Two small type/keying choices beat the sibling implementation** — (a) `quadEq` is typed to the exact `readonly [number,number,number,number]` (`:169-172`) rather than `readonly number[]` + a runtime length check (`TimingFunctionPanel.vue:84-87`), moving arity from runtime to the compiler; (b) the remount key carries a monotonic counter (`:98, 110, 113`), so returning to a previously-seeded name **does** re-seat — `TimingFunctionPanel.vue:101`'s `${kind}:${seedPreset}` key is value-stable and cannot re-seat onto a repeat. The counter is doing real work, not churn.

---

## Explicitly retracted suspicions (checked, not charged)

- **No teardown leak from the remount idiom.** Remounting `EasingPicker` on every seedable selection was the obvious leak vector. The vendor bundle carries `onScopeDispose` ×1, `onUnmounted` ×1 and `cancelAnimationFrame` ×1, and registers no `addEventListener`/`matchMedia` at module or setup scope (`grep` over `dist/easing.js`: `addEventListener 0`, `matchMedia 0`). The sidebar itself owns exactly one `watch` inside `setup` (auto-disposed), no timers, no listeners, no rAF, no manual registry entry. **Leak-clean.**
- **Module size is Goldilocks.** 234 L = 66 template / 145 script / 21 style, one exported concern (the picker seat + the duration field), no god-module pressure. The correct decomposition pressure is L-M5 (share with the sibling), not "split this file".
- **The `:deep()` CSS hooks are live, not stale.** `.slider-track` and `data-slot="slider"` both exist in glass-ui 7 (`dist/slider-DDia69Fy.js`), and `labeled-field` is the real root class — so `:224-233` bites. Unlike `tooltip`/`label-class` (L-M1), these survived the version drift.

---

## Tally

| severity | ids | n |
|---|---|---|
| BLOCKER | L-B1, L-B2 | **2** |
| MAJOR | L-M1 … L-M5 | **5** |
| MINOR | L-m1 … L-m5 | **5** |
| INFO | L-i1 … L-i3 | **3** |
| **defects total** | | **15** |
| SUPERLATIVE | S-1 … S-5 | **5** |

**Ordering for any repair wave:** F-1 first (lane-frontend `:612` — nothing here is reproducible until glass-ui is declared and locked), then L-M1 + L-M2 fall out of the same version reconciliation; then one catalogue kills L-M3 and defuses L-B1's residual need; then the shared seat composable (L-M5) lands L-B1 + L-B2's predicate in one place.
