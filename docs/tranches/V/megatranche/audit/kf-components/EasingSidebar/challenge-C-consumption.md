claude-opus-5[1m]

# CHALLENGE · `EasingSidebar.vue` · axis **C — CONSUMPTION**

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/easing/EasingSidebar.vue` (234 lines; 145 script/template, 21 style)
**Mode:** static, read-only. No installs, no dev server, no browser. Every vendor claim is sourced from the copy **already on disk** at `/Users/mkbabb/Programming/keyframes.js/node_modules/@mkbabb/glass-ui@7.0.0` and `…/@mkbabb/value.js@4.0.0`.
**Prior corpus folded:** `formation/keyframes/lane-frontend.md` (F-1 phantom dep, F-2/S-1 stale-rationale fork class, §3.1 subpath census, §5 shadow census S-1..S-8), `lane-library.md`.
**Verdict:** **12 defects · 2 BLOCKER · 4 superlatives · 10 candidate claims tested and KILLED.**

The component's headline consumption posture is a **fork-by-remount over a vendor defect that the installed vendor has already fixed** — the same class lane-frontend names F-2/S-1 for `KfPillTabs`. Everything downstream of that (the seed record, the value-based echo filter, the two divergence blockers) is consequential complexity, and two of its consequences are live state-divergence bugs.

---

## 0. What it consumes

| import | subpath | line | note |
|---|---|---|---|
| `Card`, `CardContent` | `@mkbabb/glass-ui` (root) | :70 | `cartoon` + `tier="quiet"` — both real (`dist/components/card/Card.vue.d.ts:11`; `dist/components/_shared/axes.d.ts:5` `SURFACE_TIERS = ["wash","quiet","resting","floating","overlay"]`) |
| `LabeledSlider` | `/labeled-field` | :71 | 2 of its 6 bound attributes are **not props** — C-5 |
| `EasingPicker`, `EasingPickerValue`, `JumpTerm` | `/easing` | :72–76 | the whole authoring surface; consumed **emit-only** — C-3 |
| `bezierPresets` | `@mkbabb/value.js/easing` | :77 | direct (not transitive) value.js coupling |
| `NAMED_EASING_BEZIER` | demo `@utils/reference-data` | :79 | a 29-entry duplicate of the line-77 import — C-6 |

3 glass-ui subpaths of the 21 the demo reaches (lane-frontend §3.1); no local `ui/` copy, no `reka-ui` import — the boundary shape is clean. The defects are all *inside* the boundary.

---

## C-1 · **BLOCKER** — step-count and jump-term edits are silently discarded whenever `step-start` / `step-end` is the selection

`EasingSidebar.vue:186–193` gates the write on `demo.isSteps`:

```ts
if (v.mode === "steps") {
    const jumpTerm = v.term as typeof demo.stepOptions.value.jumpTerm;
    const cur = demo.stepOptions.value;
    if (cur.steps !== v.steps || cur.jumpTerm !== jumpTerm) {
        demo.stepOptions.value = { steps: v.steps, jumpTerm };   // :190
    }
    if (!demo.isSteps.value) demo.selectEasing("steps");          // :192
    return;
}
```

`isSteps` is a **three-name** predicate (`useEasingDemo.ts:68–71`):

```ts
return n === "steps" || n === "step-start" || n === "step-end";
```

but **every consumer of `stepOptions` tests for the single literal `"steps"`**:

- `useEasingDemo.ts:84–89` — `currentEasingFn`: `if (name === "steps") return steppedEasing(stepOptions…)`; `step-start`/`step-end` fall through to `namedEasing(name)`.
- `useEasingDemo.ts:98–100` — `cssValue`: `steps(N, term)` only for `"steps"`. This string is what re-seats the preview animation's `timingFunction` (`useEasingDemo.ts:308–315`).
- `useEasingDemo.ts:108–112` — `svgPath`: `step-start` is hardcoded `generateStepSVGPath(1)`, `step-end` is a literal path string.

**Failure scenario (fully determined by the tree):** click the `step-start` specimen tile (a real tile — `easingGroups.ts:95`). `seedFor` (`:108`) mounts the picker at `steps: 1, term: "jump-start"`. Drag the picker's step-count control to 5. `isSeedEcho` is false (5 ≠ 1), so `:190` writes `demo.stepOptions = { steps: 5, jumpTerm: "jump-start" }`. `:192` does **not** fire because `isSteps` is already true. The name stays `"step-start"` ⇒ the easing function, the CSS twin, the sparkline path and the preview animation are all **unchanged**. The picker canvas now draws a 5-riser staircase that nothing in the scene animates. The term select has the same shape.

**Falsifier:** find any read of `stepOptions` that is reached when `currentEasingName === "step-start"`, or show that `step-start`/`step-end` cannot be selected. Neither exists: `grep -n "stepOptions" useEasingDemo.ts` yields exactly `:85–87`, `:99` (both `name === "steps"`-gated) plus the declaration at `:40`; and `easingGroups.ts:94–96` registers all three as non-detail specimens.

---

## C-2 · **BLOCKER** — the value-based seed-echo filter swallows any legitimate edit that returns the picker to its seed value

`EasingSidebar.vue:144–157` recognises the mount-time emission **by value**, and `:184` drops it:

```ts
const isSeedEcho = (v: EasingPickerValue): boolean => {
    const seed = pickerSeed.value;
    …
    if (seed.mode === "steps") {
        return v.steps === (seed.steps ?? 4) && v.term === seedTerm;
    }
    const quad = bezierPresets[(seed.preset ?? "") as keyof typeof bezierPresets];
    return !!quad && quadEq(quad, v.points);
};
```

The seed is **not consumed on first match** — `pickerSeed` changes only inside `watch(() => demo.currentEasingName.value)` (`:159–166`), and only when `seedFor` returns non-null. So the predicate is a *standing* filter: for the whole life of one seed, **any** emission equal to the seed value is discarded.

**Failure scenario A (steps, no name change at all).** Selection `"steps"`, `stepOptions = {4, "jump-end"}` (the `useEasingDemo.ts:40–43` defaults) ⇒ seed `{mode:"steps", steps:4, term:"jump-end"}`. Drag count 4 → 7: applied, `demo.stepOptions = {7, jump-end}`. The name never changes, so the watch never fires and the seed stays at 4. Drag back 7 → 4: `isSeedEcho` is **true** ⇒ `return` at `:184`. The picker renders 4 risers; the demo animates 7. Divergence persists until the selection name changes.

**Failure scenario B (bezier, via the picker's own catalogue).** Selection `"ease"` ⇒ seed `{mode:"bezier", preset:"ease"}`. Drag a handle ⇒ `updateBezierPoints` ⇒ name becomes `"cubic-bezier"` (`useEasingDemo.ts:268–270`); the watch fires but `seedFor("cubic-bezier")` returns `null` (`:116–118`) so the seed **remains** `preset:"ease"`. Now pick `ease` from the picker's own preset `<Select>` (`dist/easing.js:493` → `selectPreset`): the emitted quad is exactly `bezierPresets["ease"]` ⇒ `isSeedEcho` true ⇒ dropped. The picker's dropdown reads "ease"; `demo.currentEasingName` stays `"cubic-bezier"` with the authored quad still driving the animation.

Note the docstring at `:141–143` claims the by-value recognition means "a lost/duplicated echo can never swallow a real edit". The tree shows the converse: by-value recognition is precisely what makes a *real* edit indistinguishable from an echo.

**Falsifier:** show that `pickerSeed` is invalidated after its first matching emission, or that the picker cannot re-emit a seed-equal value. `dist/easing.js:207` (`k(B, Ue, { immediate: !0 })`) emits on every change of the value computed, unconditionally; nothing in `EasingSidebar.vue` clears the seed.

---

## C-3 · **MAJOR** — the "modelValue is EMIT-ONLY" rationale is stale against the **installed** glass-ui 7.0.0; the entire `:key`-remount apparatus rests on it

`EasingSidebar.vue:17–22`:

> "glass-ui 4.0.1's modelValue is EMIT-ONLY (no external write-through / points-in prop), so a remount is the only blessed re-seat seam"

The installed package is **7.0.0** (`node_modules/@mkbabb/glass-ui/package.json`), and 7.0.0's picker is a **two-way** model. `dist/easing.js:181, 199–210`:

```js
let c = e, l = te(e, "modelValue"), { … } = me({ initialMode: c.mode, … });
k(() => c.mode, (e) => { v.value = e; });                       // :187  ← mode prop IS reactive
function We(e) {                                                 // :199  applyIncoming
  …
  v.value = e.mode === "steps" ? "steps" : "bezier",
  … (N(0, e.points[0], e.points[1]), N(1, e.points[2], e.points[3])),
  Number.isFinite(e.steps) && (P.value = …), I.includes(e.term) && (F.value = e.term);
}
k(l, We, { deep: !0, immediate: !0 }), k(B, Ue, { immediate: !0 });   // :207
```

`k(l, We, …)` is a watch on the **model** that writes mode, both control points, the step count and the term into the picker's own state. That is external write-through. `mode` additionally has its own prop watch at `:187`. Only `preset` / `steps` / `term` remain initial-only (`dist/components/easing/EasingPicker.vue.d.ts` documents them as "The initial …"), and each is fully covered by the model path.

The component binds `@update:model-value` (`:35`) and **never binds `:model-value`** — it consumes the emit half of a two-way contract and reconstructs the missing half by remounting. Cost in this file: `PickerSeed` + `seedFor` + `seedCount` + `pickerSeed` + `isSeedEcho` + the name watch = **`:90–166`, 55 of 145 non-template lines**, plus C-1's and C-2's failure surface.

This is lane-frontend's **F-2 / S-1 class verbatim** — a local mechanism justified by a version-stamped vendor defect that the installed vendor has fixed (there `SegmentedTabs`'s unconditional `aria-orientation`, fixed at `dist/tabs.js:232`; here `modelValue` write-through, present at `dist/easing.js:207`). Add it to that census as **S-9**.

**Falsifier:** show that `EasingPickerValue`'s required `css`/`fn` fields make an outbound model write impractical. They do not for this consumer — `dist/easing.js:199–207` never reads `css` or `fn` in `We`, and the file already imports the two builders it would need (`bezierPresets` at `:77`; `cubicBezierToString` is used one module over at `useEasingDemo.ts:2`). The honest residue: the *type* demands both fields, so a write-through consumer must fabricate them — a real ergonomic gap worth relaying to glass-ui as a `points`-in prop or a `Partial<EasingPickerValue>` model, **not** a justification for remounting.

---

## C-4 · **MAJOR** — the picker remounts *itself* when the user picks a preset from its own dropdown

Trace, all in-file: picker `<Select>` → `selectPreset` (`dist/easing.js:493`) → new points → `Ue` emits → `onPickerChange` (`:183`). `isSeedEcho` false (different preset), the `:199–204` no-op guard false (the live quad differs), `nameForQuad` (`:176–181`) **matches** — because `NAMED_EASING_BEZIER` and `bezierPresets` are quad-identical (C-6) every picker preset except one resolves to a demo name — so `:207` calls `demo.selectEasing(named)`; the name watch fires; `seedFor(named)` returns a seed with a fresh `key` (`:113`, `++seedCount`); `:key` changes ⇒ **Vue unmounts and remounts the picker** while the user's interaction with its `<Select>` is still unwinding.

Structural consequences (certain): the picker's component state is discarded and rebuilt, and the reka `<Select>` the user just closed is torn out from under its focus-restore. Focus falls to `<body>`.

**Falsifier:** show that `:key` mutation does not remount (it does, by Vue's diff contract), or that `nameForQuad` returns `undefined` for picker presets (it does not — see C-6's measured set equality), or that focus is restored on mount (nothing in `EasingPicker.vue.d.ts` or `dist/easing.js` calls `focus()` on mount; `grep -c "\.focus()" dist/easing.js` → 0).
The *visual* severity of the focus drop is **UNPROVEN-NEEDS-LIVE** (SS-13); the remount itself is proven by construction.

---

## C-5 · **MAJOR** — `tooltip` and `label-class` are phantom props on `LabeledSlider`; the duration affordance renders nothing

`EasingSidebar.vue:54–63` passes:

```
label-class="text-small font-medium text-muted-foreground"    :57
tooltip="Sweep duration (ms)"                                 :58
```

Neither is in the contract. `dist/components/labeled-field/types.d.ts`:

```ts
export interface LabeledFieldCommonProps { label; description?; requirement?; layout?; errorLive?; }
export type LabeledSliderProps = Omit<SliderProps,"class"|"modelValue"> & LabeledFieldCommonProps & { modelValue: number };
```

and `dist/components/slider/types.d.ts` `SliderProps` = `SliderRootProps` + `class | variant | size | marks | invalid | keepDockOpen | motion`. No `tooltip`, no `labelClass`. `inheritAttrs` is not disabled anywhere in `dist/labeled-field.js` (`grep -c inheritAttrs` → 0), so both land as literal DOM attributes on the `.labeled-field` root (`dist/labeled-field.js:34–39`). There is **no** `[tooltip]` or `[label-class]` CSS hook in the demo or in glass-ui (`grep -rn "\[tooltip\]\|attr(tooltip" --include=*.css --include=*.vue demo/` → empty). The tooltip text is unreachable; the label typography never applies.

glass-ui ships the intended seam: `description?: string` renders into `.labeled-field-description` (`dist/labeled-field.js:44–48`), and the root barrel already exports the full `Tooltip*` family the demo uses in 6 other files.

**Scope, honestly stated:** this is a **repo-wide idiom**, not a local slip — the same two phantom attributes appear at `SpringPhysicsFacet.vue:30–31,40–41`, `ChannelOptions.vue:31–32,50–51,78–79,100–101,124…`, `LayerConfigPanel.vue:15,22,36,52,63`. Five files. The fix is either a repo sweep onto `description` or a glass-ui addition — but the defect is real at this call site.

**Falsifier:** produce a `tooltip` or `labelClass` declaration in the installed `labeled-field`/`slider`/`label` types, or a CSS/JS consumer of the emitted attributes. I found none in either tree.

---

## C-6 · **MAJOR** — `NAMED_EASING_BEZIER` is a 29-entry duplicate of the `bezierPresets` imported on the adjacent line, and the comment asserting they diverge is false

`EasingSidebar.vue:86–89`:

> "glass-ui's bezier catalogue is value.js `bezierPresets`; the demo's named map (`NAMED_EASING_BEZIER`) is **wider (quart/quint)** and **differs on some quads (sine)** — seed by PRESET only when the picker's own catalogue knows the name"

Measured against the installed `@mkbabb/value.js@4.0.0` (`dist/subpaths/easing.d.ts` `PRESETS`) and `animationDescriptions.ts:16–47`:

```
bezierPresets keys: 30 | NAMED keys: 29
in NAMED not in presets: []                      ← NAMED is a strict SUBSET
in presets not in NAMED: ['smooth-step-3']
QUAD DIFFS (exact):                    NONE      ← incl. all three sine curves
QUAD DIFFS (>= quadEq tol 5e-4):       NONE
NAMED intra-collisions at 5e-4:        NONE
```

Both stated grounds are false: `ease-in/out/in-out-quart` and `-quint` are **present** in `bezierPresets`; the sine quads are **byte-identical** (`[0.47,0,0.745,0.715]`, `[0.39,0.575,0.565,1]`, `[0.445,0.05,0.55,0.95]` on both sides). Consequences:

1. The guard `if (name in bezierPresets)` (`:112`) never excludes anything the demo can name — the "honest vendor seam" is a no-op wrapper around a subset test.
2. `NAMED_EASING_BEZIER` is a hand-maintained shadow of a published library constant the file **already imports one line above**. Same class as the shadow census S-1..S-7, but at the *data* layer: a duplicated table rather than a duplicated component.
3. `nameForQuad` (`:176–181`) exists to invert a mapping the vendor already reports — the picker's own `preset` ref is the name, and 7.0.0's `EasingPickerValue` could carry it.

**Falsifier:** any key or quad on which the two maps disagree beyond `quadEq`'s 5e-4. The probe above enumerates all 29 shared keys and finds zero.

---

## C-7 · **MAJOR** — `smooth-step-3` makes the panel contradict itself: it seeds the bezier editor **and** captions the curve "engine-native, not bezier-expressible"

The one key by which the two catalogues differ (C-6) is a **selectable specimen tile** (`easingGroups.ts:60` `item("smooth-step-3", "Hermite interpolation")`). The component routes it through two different catalogues:

| line | test | catalogue | result for `smooth-step-3` |
|---|---|---|---|
| `:112` `seedFor` | `name in bezierPresets` | value.js (30 keys) | **true** ⇒ picker mounts `mode:"bezier", preset:"smooth-step-3"` |
| `:132–137` `syncGap` | `!demo.isBezierEditable` | `NAMED_EASING_BEZIER` (29 keys, `useEasingDemo.ts:73–76`) | `isBezierEditable` **false** ⇒ `catalogueGap = true` |

So selecting that tile renders the caption at `:42–49` — *"smooth-step-3 is engine-native — editing here authors a custom cubic-bezier"* — directly above a picker that is displaying `smooth-step-3`'s exact cubic-bezier from the vendor catalogue. The claim and the widget disagree on the same screen.

Second-order: `selectEasing("smooth-step-3")` also falls into `useEasingDemo.ts:255–258`'s else-branch and resets `bezierControlPoints` to the **linear** `[0,0,1,1]`, so the `:200–201` no-op guard is comparing the picker's real quad against linear.

**Falsifier:** show `smooth-step-3` is unreachable as a selection (it is a non-detail specimen at `easingGroups.ts:60`), or that `isBezierEditable` consults `bezierPresets` (it consults `NAMED_EASING_BEZIER`, `useEasingDemo.ts:75`).

---

## C-8 · **MINOR** — the scoped `:deep()` block re-asserts the vendor's own default layout, swapping its grid for flex and its gap token for a literal

`EasingSidebar.vue:224–233` reaches through the boundary:

```css
.panel-content :deep(.labeled-field.duration-field) {
    display: flex; flex-direction: column; align-items: stretch; gap: 0.25rem;
}
.panel-content :deep(.duration-field [data-slot="slider"]),
.panel-content :deep(.duration-field .slider-track) { width: 100%; }
```

The installed default (`dist/glass-ui.css`) already is:

```css
.labeled-field{min-inline-size:0;display:grid}
.labeled-field{gap:calc(var(--spacing) * 2);inline-size:100%}
```

— a single-column grid at 100% inline size with the label row first (`dist/labeled-field.js:34–48`), i.e. **exactly the "J3 posture"** the comment at `:51–52` and `:222–223` says it is establishing. The override's only net effects are (a) replacing `grid` with `flex`, which breaks the vendor's `[data-layout=horizontal]` `grid-template-columns` should that prop ever be set, and (b) replacing the `--spacing`-derived gap with a hard `0.25rem` literal — a token bypass in a repo whose own §6.3 census flags unprefixed/untokenised surfaces. The `width:100%` pair is redundant against `inline-size:100%` + `.labeled-field-control{display:grid}`.

**Falsifier:** show the vendor default is not full-width/column — the two rules above are the complete `.labeled-field` base ruleset in `dist/glass-ui.css`. (Note this claim survived the obvious counter: **both** hooks the rule targets are real — `data-slot="slider"` exists on the slider root and `.slider-track` is a real class, `dist/slider-DDia69Fy.js`. The rule is redundant, not dead.)

---

## C-9 · **MINOR** — the two cross-vendor casts suppress the one signal the seam exists to catch

`:107` `demo.stepOptions.value.jumpTerm as JumpTerm` and `:187` `v.term as typeof demo.stepOptions.value.jumpTerm` cast in both directions across the glass-ui ↔ value.js boundary. Today they are **sound and unnecessary**: value.js's `JumpPosition = "jump-start"|"jump-end"|"jump-none"|"jump-both"` and glass-ui's `JumpTerm = (typeof jumpTerms)[number]` derive from the same `@mkbabb/value.js/easing` export (`dist/components/easing/composables/useEasingPicker.d.ts:2`), and glass-ui declares value.js an **optional peer** (`package.json` `peerDependenciesMeta`) with no nested copy — one instance, identical unions, mutually assignable without a cast.

That is exactly why the casts are a defect: they are the load-bearing check that would fire the day glass-ui vendors its own jump-term list or value.js widens `JumpPosition`, and they are pre-silenced. Compounded by `.npmrc` `legacy-peer-deps=true` (lane-frontend §2), which already absorbs peer drift silently.

**Falsifier:** show the casts are required to typecheck. Remove either and the assignment is a plain identical-union assignment; nothing in the two `.d.ts` files introduces a member on one side only.

---

## C-10 · **MINOR** — a sentence of UI prose is laundered through the `data-register="code"` mono-as-data contract

`:42–49` renders explanatory prose — *"{name} is engine-native — editing here authors a custom cubic-bezier"* — as `class="text-mono-caption" data-register="code"`.

`demo/DESIGN.md:26–29` states the contract:

> **Mono-as-data.** Fira Code is reserved for literals, tabular-number readouts, code/keyboard content, and explicitly marked identifiers (`data-register="code"`). **It is never a general UI voice.** The complete selector contract and ceiling live in `demo/styles/font-roles.json`; `proof:font-census` is its witness.

`demo/styles/font-roles.json:72` registers `[data-register='code']` in `monoAllowedSelectors`, so this element **passes** the census — which is the problem: the attribute is the census's escape hatch, applied here to a full English sentence containing one identifier, and the file's own manifest note records the mono ceiling being re-derived 70→90 for this very scene. The sibling usages are correct by contrast: `EasingTarget.vue:31` wraps a CSS literal, `:112–114` a bare curve identifier.

**Falsifier:** a DESIGN.md or `font-roles.json` clause sanctioning prose-with-embedded-identifier under the code register. §1's sentence is unqualified.

---

## C-11 · **MINOR** — asymmetric write seams contradict the file's own "ONE authoring seam" claim

`:168` announces "Picker emissions → the demo's ONE authoring seam", but the component writes the context three different ways:

- `:210` `demo.updateBezierPoints(v.points)` — a **method** (which also owns the `→ "cubic-bezier"` flip, `useEasingDemo.ts:265–271`);
- `:192` `demo.selectEasing("steps")` — a **method**;
- `:190` `demo.stepOptions.value = { steps, jumpTerm }` — a **raw ref write**, bypassing any seam (and it is precisely this bypass that makes C-1 possible: a `setStepOptions(…)` method on the composable would own the `name === "steps"` reconciliation the sidebar cannot see);
- `:62` `demo.duration.value = v` — a raw ref write from a child, through a prop object.

The component declares no `emits` at all (`:82` is the whole contract surface: `defineProps<{ demo: EasingDemoContext }>()`), so **the entire 20-member composable return is a mutable prop**. That is a legitimate demo idiom, but "ONE seam" is not what the tree shows.

**Falsifier:** show `stepOptions`/`duration` have method setters on `EasingDemoContext`. `useEasingDemo.ts:366–409` exports them as bare refs; the only methods are `selectEasing`, `updateBezierPoints`, `play`, `pause`, `togglePlay`, `reset`.

---

## C-12 · **INFO (inherited)** — three glass-ui subpath imports against an undeclared, unlocked dependency

`:70`, `:71`, `:72` import from `@mkbabb/glass-ui`, which lane-frontend **F-1** measured as absent from both `package.json` and `package-lock.json` while 7.0.0 sits in `node_modules`. This component is unbuildable from a clean `npm ci` for the same reason the other 41 glass-consuming files are. No new evidence; recorded so the per-component ledger is not silently green. **F-1 gates any remediation of C-3/C-5** — pinning the version is what makes "the installed vendor already fixed it" a durable statement rather than an accident of `Jul 16 05:17`.

---

## Superlatives (L-18, running the other way)

**SUP-1 · The `demo` prop is correct and non-obvious — `inject` would have failed silently.**
`easingKeys.ts:9` defines `EASING_DEMO_KEY`, `EasingScene.vue:21` provides it, and the sibling `EasingTarget.vue:152` injects it. This component takes the same context as a **prop** (`:82`) instead — and that is the only thing that works: the sidebar is handed to the shell as a render function (`EasingScene.vue:57` `const tabsContent = () => h(EasingSidebar, { demo })`) and is mounted at `app/App.vue:62` (`<component :is="sceneRef?.tabsContent" />`) inside the `#tabs-content` slot, i.e. under `ChannelControls`, **outside `EasingScene`'s provide subtree**. Vue resolves `inject` through the mounted parent chain, not the lexical creation site, so `inject(EASING_DEMO_KEY)!` here would have produced `undefined` and a non-null-asserted crash. The two siblings use two different channels because they sit in two different subtrees, and each picked the right one.
*Falsifier: show `EasingScene` is an ancestor of `ChannelControls`. `App.vue:53–70` renders both from sibling slots of the shell.*

**SUP-2 · `container-type: inline-size` is load-bearing, and the stated reason is exactly right.**
`:217–220` establishes the container "so the picker's `38cqi` canvas sizing resolves off the CONTAINER inline size, not the viewport". Verified in the installed vendor — `dist/easing.js` sizes the picker's SVG canvas `"block-size": "clamp(200px, 38cqi, 320px)"`. Without an inline-size container ancestor `cqi` resolves against the small viewport, and the editor canvas collapses to its 200px floor inside a narrow rail. This is the rare comment in the file whose vendor claim survives verification against 7.0.0 **and** whose number matches to the digit.

**SUP-3 · The catalogue guard is tested against the vendor's own object, not a transcribed list.**
`:112` `if (name in bezierPresets)` and `:155` `bezierPresets[…]` interrogate the identical module instance the picker itself imports (`dist/easing.js:9` `import { … bezierPresets as N … } from "@mkbabb/value.js/easing"`), deduped because glass-ui declares value.js an optional peer with no nested install (`ls node_modules/@mkbabb/glass-ui/node_modules/@mkbabb/value.js` → absent). The seed decision therefore cannot drift from the picker's real catalogue. (The *other* map, C-6, is the transcribed one — and it is the one that drifted.)

**SUP-4 · `:playback="false"` — refusing a second, uncoordinated clock.**
`:33` disables the picker's travel dot; `dist/components/easing/EasingPicker.vue.d.ts` shows `playback` defaults to `true`, and `dist/easing.js` implements it as a private one-shot rAF (`TRAVEL_DURATION_MS = 1200`, `dist/components/easing/constants.d.ts`) with its own `progress`/`playing` refs. The scene already owns a single sweep clock whose hot path is deliberately off the Vue render graph (`useEasingDemo.ts:144–195`) and gated on the machine status. Mounting the vendor's independent clock in the same panel would have put a second, machine-invisible rAF loop on stage — the exact class T.G3/VERDICT #19 (`EasingScene.vue:119–125`) exists to prevent. The prop is off, and the comment at `:23–26` names the reason correctly.

---

## Claims tested and KILLED (a false defect is worse than a missed one)

| # | candidate defect | why it is FALSE |
|---|---|---|
| K-1 | `v.points` aliases the picker's internal array ⇒ silent mutation of `demo.bezierControlPoints` | `dist/easing.js:44` — the value computed emits `points: [...i.value]`, a fresh copy each time. |
| K-2 | `:deep(… [data-slot="slider"])` and `.slider-track` are dead selectors | Both exist: `dist/slider-DDia69Fy.js` emits `"data-slot": "slider"` and the classes `slider-track`/`slider-range`/`slider-thumb`. C-8 is redundancy, **not** a dead rule. |
| K-3 | `text-small` (`:57`) is an undefined utility | `@utility text-small { … }` is declared in `dist/styles/typography/utilities.css`. (`:57` still fails — for the C-5 reason, not this one.) |
| K-4 | `data-register="code"` is an orphan attribute with no consumer | It is a real contract: `demo/styles/font-roles.json:72` lists `[data-register='code']` in `monoAllowedSelectors`, witnessed by `proof:font-census`. C-10 is about *misapplying* it, not its existence. |
| K-5 | two value.js instances — the sidebar's `bezierPresets` ≠ the picker's | Optional peer, deduped, no nested copy. One instance. (Grounds SUP-3.) |
| K-6 | `JumpPosition → JumpTerm` cast at `:107` is unsound | Identical 4-member unions from the same source export. Downgraded to C-9 (redundant, and therefore silencing). |
| K-7 | `quadEq`'s 5e-4 tolerance breaks against the picker's `+x.toFixed(3)` quantization (`dist/easing.js:21`) | Every `bezierPresets` quad is already ≤3 dp, and `selectPreset` copies the preset verbatim (`dist/easing.js:19`), so preset comparisons are exact; drag comparisons compare quantized against quantized. |
| K-8 | `cubicBezierEasing` (`timingCurveUtils.ts:25–34`, `requireEasing(CubicBezier(…))`) can throw on a picker-authored quad | `setHandle` clamps x to `[0,1]` (`dist/easing.js:21`); value.js only errors `bezier_x_out_of_range` / non-finite. y-overshoot (±0.6) is legal. |
| K-9 | switching the picker to steps mode mid-edit destroys an authored bezier via remount | The picker exposes **no** mode control — `v.value` is written only by the `mode` prop watch (`:187`) and `We` (`:203`); `:417/:464/:491` are render branches. Mode changes only via the sidebar's own seed. |
| K-10 | the value.js **R1** parser crash class (`parseCssColor("oklch()")`) is reachable here | No color parse on any path from this component. The value.js surface actually reached is `/easing` (`bezierPresets`, direct, `:77`) and — transitively through the picker — `/css` `parseTimingFunction` (`dist/easing.js:8`), used only for `reparseOk`, a boolean. *Falsifier: show `parseTimingFunction` delegates to the colour parser for any timing-function token, or that a glass-ui surface in this subtree parses a user-supplied colour string. Neither appears in `dist/easing.js`.* |

---

## Ledger

| id | severity | one line |
|---|---|---|
| C-1 | **BLOCKER** | step count/term edits silently discarded for `step-start` / `step-end` (`isSteps` ⊃ the `"steps"`-only consumers) |
| C-2 | **BLOCKER** | the standing by-value seed-echo filter swallows any edit that returns to the seed value |
| C-3 | MAJOR | `modelValue` write-through **exists** in the installed 7.0.0; the remount idiom + 55 lines rest on a stale 4.0.1 premise (lane-frontend F-2/S-1 class ⇒ file as **S-9**) |
| C-4 | MAJOR | the picker remounts itself when the user picks a preset in its own dropdown |
| C-5 | MAJOR | `tooltip` / `label-class` are phantom props on `LabeledSlider`; the affordance never renders (repo-wide, 5 files) |
| C-6 | MAJOR | `NAMED_EASING_BEZIER` duplicates `bezierPresets` (strict subset, identical quads); the divergence comment at `:86–89` is false |
| C-7 | MAJOR | `smooth-step-3` seeds the bezier editor **and** gets the "engine-native" caption — two catalogues, one key apart |
| C-8 | MINOR | `:deep()` re-asserts the vendor default layout; grid→flex and gap token→literal |
| C-9 | MINOR | redundant cross-vendor jump-term casts pre-silence the divergence signal |
| C-10 | MINOR | UI prose rendered under the mono-as-data `data-register="code"` contract |
| C-11 | MINOR | asymmetric write seams (raw ref writes beside methods) contradict the "ONE seam" claim |
| C-12 | INFO | inherits F-1: 3 glass-ui subpath imports against an undeclared, unlocked dependency |

**12 defects · 2 BLOCKER · 4 superlatives · 10 candidates killed.**

### Provenance
Every vendor claim above cites `/Users/mkbabb/Programming/keyframes.js/node_modules/@mkbabb/glass-ui@7.0.0` or `…/@mkbabb/value.js@4.0.0` — the copies already installed in the audited tree, so no upgrade is presupposed by any remediation. Producer repos were not read. No file in keyframes.js was written, mutated, or executed; no installs, no dev server, no browser. The single write of this lane is this file.
