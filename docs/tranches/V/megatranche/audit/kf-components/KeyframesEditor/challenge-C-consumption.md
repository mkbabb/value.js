claude-opus-5[1m]

# CHALLENGE — `KeyframesEditor.vue` · axis C (CONSUMPTION)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/keyframes/KeyframesEditor.vue` (284 lines)
**Axis** how this component consumes **keyframes.js** (the library) and **glass-ui** (the design system) — subpath
choices, shadow components, value.js transitive exposure, props/emits contract quality, and the integration seams
with its siblings.
**Posture** assumed DEFECTIVE until the tree proved otherwise. Five candidate defects were **KILLED by their own
falsifier** and are recorded in §5 so no later lane re-files them — including the R1 parser-crash class, which I
went looking for and could **not** reach from this component.
**Method** whole-file read + the complete import closure (read-only), plus the *consumer* tree the editor shares its
identity with, plus **four empirical probes** run against the installed `node_modules` (§4). No browser tooling;
livable-only claims are marked `UNPROVEN-NEEDS-LIVE` for SS-13.

**Tally — 17 defects (2 BLOCKER · 8 MAJOR · 7 MINOR) · 5 superlatives.**

## Closure actually read

Component closure: `composables/{useKeyframesEditor,useKeyframesState,useKeyframesParsing,useKeyframeOps,
useKeyframeBrushApply,useApplyCSS,useHighlightCSS,useToolbarKeyboard}.ts` · `components/{KeyframeCardList,
KeyframesAddDialog}.vue` · `KeyframeCard.vue` · `utils/{contenteditable,parseAnimationCSS}.ts` ·
`demo/utils/{keyframeSelector,formatEditorCSS}.ts` · `demo/kf-engine.ts` · `demo/app/main.ts` ·
`components/instrument/keyframes/index.ts`.

Consumption evidence beyond the closure (required by the axis — the seams): `KeyframesStringControls.vue` ·
`ChannelControls.vue` · `ControlsPaneWrapper.vue` · `composables/useKeyframesPaneReveal.ts` ·
`demo/state/{controlOptionsStore,animationOptionsStore,storeUtils,controlSurfaces}.ts` ·
`scenes/spring/{SpringScene.vue,SpringPhysicsFacet.vue,useSpringDemo.ts,useSpringKeyframesEditor.ts}`.

Library/design-system evidence: `keyframes.js/src/animation/{constants/types.ts, compile/frame-compiler.ts,
compile/selector.ts, compile/adapter.ts, compile/emit/format.ts, engine/css/css-animation.ts}` ·
`keyframes.js/package.json` · `scripts/gates/surface/boundary.mjs` · `value.js/src/css/{types.ts,grammar.ts}` ·
`node_modules/@mkbabb/value.js@4.0.0/dist/subpaths/css.js` · `node_modules/@mkbabb/glass-ui@7.0.0/package.json`
+ `dist/components/{slider,card,toast,progress}/*.d.ts`.

---

## §1 — BLOCKERS

### C-B1 · BLOCKER · The start-offset field is validated with the **wrong value.js entry point** — it admits offsets value.js's own keyframe grammar rejects, and the divergence resurfaces a second later as an unrelated error from a different subsystem

`KeyframesEditor.vue:123` (the import) · `:186-210` (the handler) · `demo/utils/keyframeSelector.ts:14-22`
(the correct entry point, already in the closure)

```ts
import { parseCssScalar } from "@mkbabb/value.js/css";          // :123

const parsed = parseCssScalar(val);                              // :186
if (!parsed.ok) { …toast… return; }
const scalar = parsed.value.payload;                             // :196
if (scalar.type !== "number" || scalar.unit !== "%") { …toast… return; }   // :197
frame.start = { kind: "percent", value: scalar.value / 100 };    // :206-209
updateAllStringsAndAnimation();                                  // :210
```

value.js publishes **two** parsers on the same subpath, and they are not interchangeable for this job:

| entry point | domain | `500%` | `-20%` | `from` |
|---|---|---|---|---|
| `parseCssScalar` (chosen) | any CSS scalar | **accepts**, `value: 500` | **accepts**, `value: -20` | accepts as `keyword` |
| `parseKeyframeSelector` (the keyframe grammar) | `0%..100%` + `from`/`to` + named ranges | **rejects** | **rejects** | accepts → `{kind:"percent",value:0}` |

Both rows are **probe-proven** (§4 · P1), and the range check is explicit in the grammar:
`value.js/src/css/grammar.ts:414` — `value >= 0 && value <= 100 ? success(...) : failure(..., ["0%..100%"])`.

**The failure chain, end to end, all source- or probe-proven.** Type `500%` into a card's start `Input`
(`KeyframeCard.vue:5-7` → `updateStart`):

1. `:186` `parseCssScalar("500%")` → `ok`, `{type:"number", value:500, unit:"%"}` — **P1**. The `:197` guard passes:
   it checks *type* and *unit*, never *domain*.
2. `:206-209` writes `frame.start = {kind:"percent", value:5}` into the live `TemplateAnimationFrame`
   (`keyframes.js/src/animation/constants/types.ts:64-66`).
3. `:210 updateAllStringsAndAnimation()` → `useKeyframesParsing.ts:64-67` → `updateAllStrings()` →
   `CSSKeyframesToString(s)`, whose selector emitter multiplies the fraction back out
   (`src/animation/compile/emit/format.ts:20-25`, `compile/adapter.ts:182-183`: `` `${sel.value * 100}%` ``) →
   the projection contains `500% { … }`. The card list happily renders it.
4. The same function then feeds that string straight back in: `ops.updateAnimationFromKeyframesString(...)`
   (`useKeyframesParsing.ts:66`) → `useKeyframeOps.ts:64 parseAnimationCSS(...)` →
   `utils/parseAnimationCSS.ts:34 resolveKeyframes(input)` → value.js `parseStylesheet`.
5. `parseStylesheet("@keyframes t { 0% {…} 500% {…} }")` → **`ok: false`**,
   `{code:"keyframe_selector_invalid", expected:["0%..100%"], actual:"500%"}` — **P2**.
6. `parseAnimationCSS.ts:38-41` throws `TypeError("Invalid animation CSS: …")` → `useKeyframeOps.ts:97-103`
   `withErrorToastAsync` → the user sees **"Could not update keyframes"** ~1 s after a *start-field* edit, naming
   neither the field nor the stop, while the card list still shows the accepted `500%`.

So the component accepts a value, renders it, and then a *different* toast from a *different* op reports a
*different* failure — and the animation's compiled state and its template state have diverged.

**The correct entry point is already imported inside this component's own closure.** `demo/utils/keyframeSelector.ts:14-22`
`requireKeyframeSelector()` wraps `parseKeyframeSelector` and is imported at `useKeyframeOps.ts:9`, used at `:174`
for the *add-keyframes* path. That path enforces `0%..100%` and accepts `from`/`to`. The start field — the other
half of the same authoring surface — uses a generic scalar parser instead.

**Falsifier.** The claim dies if any of: (a) `parseCssScalar` range-checks percentages — P1 shows it returns
`{value:500}` and `{value:-20}` with `ok:true`; (b) something between `:209` and the reprojection clamps
`frame.start` — grep over the closure finds no clamp, and `frame-compiler.ts` stores selectors verbatim (`:146,150`);
(c) `resolveKeyframes` tolerates out-of-range selectors — P2 shows `parseStylesheet` fails the **whole** parse.
Kill it live by typing `500%` into a start field and observing no error at all.

### C-B2 · BLOCKER · Two live consumers share one `keyframesStyleId` on `/spring` — one `<style>` node, one target class, one persisted bucket, two independent shadow states

`useKeyframesState.ts:15-19` (the identity) · `useHighlightCSS.ts:29-61` · `useApplyCSS.ts:29-66` ·
`KeyframesEditor.vue:260-265` · `KeyframesStringControls.vue:62-68, 114`

The editor's identity is derived **per animation**, not per component instance:

```ts
const animationUUID = createAnimationUUId(animation, animation.superKey);   // useKeyframesState.ts:15
const keyframesStyleId = `keyframes-style-${animationUUID}`;                // :16
const storedControls = getStoredAnimationGroupControlOptions(animation);    // :18
```

`createAnimationUUId` is `` `${superKey}-${animationId}` `` (`state/animationOptionsStore.ts:124-131`) and
`getStoredAnimationGroupControlOptions` buckets by `superKey` alone (`controlOptionsStore.ts:66-97` via
`storeUtils.ts:23-33`). Both are pure functions of the *animation*. Two components holding the same animation get
byte-identical ids.

**Two components hold it, simultaneously, on `/spring` — chain proven from source:**

| step | evidence |
|---|---|
| the spring facility's first channel carries `animation: springEditAnim` | `scenes/spring/useSpringDemo.ts:406-409` |
| a channel carrying an `animation` earns the full `{controls,keyframes,timeline}` triad | `state/controlSurfaces.ts:106-109` |
| `ControlsPaneWrapper` renders `<ChannelControls :animation="host.animation">` | `ControlsPaneWrapper.vue:50,62` |
| `ChannelControls` mounts `<KeyframesStringControls :animation="animation">` once warmed, and the pane is **force-mounted, never torn down** | `ChannelControls.vue:130,138,145` |
| the warm is **automatic** — a `requestIdleCallback` after LCP, no user action | `composables/useKeyframesPaneReveal.ts:31-33, 69+` |
| `KeyframesStringControls` calls the same composables with the same animation | `KeyframesStringControls.vue:62-68` (`useKeyframesEditor`), `:114` (`useKeyframeBrushApply`) |
| `KeyframesEditor` is mounted with the same object | `SpringPhysicsFacet.vue:119` ← `SpringScene.vue:67` |

Three shared resources, each with per-instance shadow state:

1. **One `<style>` node, two owners.** `useHighlightCSS.ts:30-33` — `ensureStyleElement()` does
   `document.head.querySelector('#' + styleId)` and **adopts an existing node**. The second mounter therefore holds
   the first's element. `onUnmounted` (`:58-61`) then does `keyframesStyle.value?.remove()` **unconditionally, with
   no refcount** — whichever unmounts first detaches the node out from under the survivor, whose subsequent
   `setContent()` writes into a document fragment. The composable's *theme* twin has exactly this defect recorded as
   latent (D-36); here it is realised on a **per-animation** id with two concurrent, independently-mounted owners.
2. **One class name on the same targets.** `useApplyCSS.ts:34, 47-49` uses `getClassName()` — wired to the *same*
   `keyframesStyleId` (`useKeyframeBrushApply.ts:33`) — as the class added to `animation.targets`. Instance A's
   apply and instance B's un-apply operate on the same DOM class over the same elements.
3. **One `animation.paused`, two `prevPaused` snapshots.** `useApplyCSS.ts:44-45` snapshots `prevPaused` per
   instance. Apply in the editor (`paused = started`), then toggle apply **on then off** in the string controls:
   B's `prevPaused` was captured *after* A paused, so B's un-apply restores `paused = true` — permanently, with A's
   `aria-pressed="true"` (`KeyframesEditor.vue:90`) still asserting the CSS is applied while the injected rules were
   just cleared by B.
4. **One persisted control bucket.** `kfControls` is the same object in both (`useKeyframesState.ts:19`), so
   `dialogOpen` / `addKeyframes` / `keyframes` are cross-component cells (see C-M2, C-m4).

**Falsifier.** Dies if the two components ever hold **different** animations, since the whole finding rests on id
equality. Three independent ways to kill it: (a) show `ControlsPaneWrapper`'s `host.animation` on `/spring` is not
`springEditAnim` — `useSpringDemo.ts:409` says it is; (b) show `surfacesFor` omits `keyframes` for a channel with an
animation — `controlSurfaces.ts:106-109` grants the whole triad; (c) show `keyframesWarmed` never flips without user
intent — `useKeyframesPaneReveal.ts:31-33` documents the idle warm explicitly. Or add a refcount to
`useHighlightCSS` and re-run. *(The **ordering** of the two unmounts on route-leave is `UNPROVEN-NEEDS-LIVE`; the
id equality, the node adoption, the unconditional `remove()`, and the shared class are all source-proven.)*

---

## §2 — MAJORS

### C-M1 · MAJOR · The reactive-prop **getter** contract is defeated one line into the composable

`KeyframesEditor.vue:164` passes the correct shape — `useKeyframesEditor(() => animation, emit)`, a lazy getter over
a Vue 3.5 destructured prop. `useKeyframesEditor.ts:22` immediately collapses it:

```ts
const animation = getAnimation();          // :22 — the getter is called ONCE, at setup
const state = useKeyframesState(animation);      // :24  ← snapshot
const parsing = useKeyframesParsing(animation, state, emit);   // :25  ← snapshot
```

Every downstream holder is a snapshot: `useKeyframesState` captures it for the id + store bucket (`:15-18`),
`useKeyframeOps` closes over it for **every** mutation (`useKeyframeOps.ts:61-83, 110-134, 168-179, 202-205`), and
the component itself passes the destructured value **eagerly into a plain object** at `KeyframesEditor.vue:261`
(`useKeyframeBrushApply({ animation, … })`) — where the interface already models the correct shape for its *other*
dependencies (`getCSSString: () => string`, `getAnimation: () => …`). If the `animation` prop is ever re-bound, the
entire editor keeps editing the previous animation while the template's `animation.templateFrames` reads the new
one, and the ids/bucket stay keyed to the old.

**Reachability, stated honestly.** The sole callsite binds `demo.springEditAnim`, a `markRaw` const created once
(`useSpringKeyframesEditor.ts:57-63`) and never reassigned — `seedKeyframes()` calls `fromString` on the *same*
object (`:73-76`). So today this is **latent**, and there is no `:key` on the callsite to force a remount if it ever
stopped being latent. It is filed MAJOR because it is a *contract* defect: the callsite pays the cost of the correct
getter idiom and gets none of its benefit, and nothing in the type system records that the composable is
snapshot-semantics.

**Falsifier.** Show `getAnimation` re-invoked anywhere after `:22` (`grep -n getAnimation` over the closure: one
declaration, one call), or a `:key` / `v-if` remount on the callsite (`SpringPhysicsFacet.vue:119` has neither).

### C-M2 · MAJOR · A **transient modal's** open state is routed into `localStorage`

`KeyframesEditor.vue:76` — `v-model:open="kfControls.dialogOpen"`.

`kfControls` is `storedControls.keyframeControls` (`useKeyframesState.ts:18-19`), and `storedControls` comes from
`getStoredAnimationGroupControlOptions` → `useAnimationGroupsControlOptionsStore` →
**`useStorage("animation-groups-control-options-store", …)`** (`state/controlOptionsStore.ts:48-57`) — `@vueuse/core`
`useStorage`, i.e. a `localStorage`-backed reactive object with a 7-day TTL (`storeUtils.ts:4, 11-21`). `dialogOpen`
is a declared member of the persisted schema (`controlOptionsStore.ts:21`, default `false` at `:40`).

So opening the Add-Keyframes dialog writes `dialogOpen: true` to `localStorage`. A reload — or any later session
inside the TTL — re-mounts the editor with the modal **already open**, with no user action and no explanation. The
only reset is `addKeyframesStringToAnimation`'s success path (`useKeyframeOps.ts:183`); a user who opens the dialog
and closes it via the overlay/Escape leaves `true` persisted (reka's `update:open(false)` does write it back, so the
close path is covered — the *crash/navigate-away-while-open* path is not, and neither is the deliberate
"leave it open" state, which is not a preference anyone expressed).

Everything else in that bucket is a genuine preference (`selectedControl`, `isControlsPanelOpen`,
`isTimelineExpanded`, the draft `addKeyframes` text). `dialogOpen` is the one member that is not.

**Falsifier.** Show `useStorage` is memory-only here (it is not — `controlOptionsStore.ts:49-52` passes a string key
and no `{ storage: … }` override, so the `@vueuse/core` default is `localStorage`), or show a boot path that clears
`dialogOpen` — `checkAndResetExpiredStore` only resets on TTL expiry, and `getStoredAnimationGroupControlOptions`
seeds defaults **only** for a missing bucket (`:76-84`).

### C-M3 · MAJOR · The Slider's `-10 … 110` domain is **out of contract with value.js's keyframe grammar** — every position outside `0..100` is a state the library declares invalid

`KeyframesEditor.vue:48-50` — `:min="-10" :max="110" :step="1"`.

This **sharpens** D-2 and L-B1, which established the fraction/percent inversion and the frozen-write. Neither
recorded what the out-of-range *domain* means against the producer. It means: even after both of those are fixed,
the control's declared range still offers the user 20 percentage points of positions that value.js **rejects at
parse**, proven in §4 · P1/P2 (`parseKeyframeSelector("-20%")` → `keyframe_selector_invalid`,
`parseStylesheet` with a `-20%` stop → whole-parse failure). The failure mode is exactly C-B1's chain, entered from
the slider instead of the Input.

The producer's own range is not a secret: `value.js/src/css/grammar.ts:414` and the diagnostic's
`expected: ["0%..100%"]`. glass-ui's `Slider` even ships the affordance for communicating a legal domain —
`marks?: readonly number[]`, *"Decorative checkpoints in the numeric domain"*
(`glass-ui/dist/components/slider/types.d.ts:12`) — unused here.

**Falsifier.** Show a keyframe offset outside `0..100` that value.js accepts (P1/P2 disprove `-20%` and `500%`), or
show the `-10/110` domain is deliberate slack that is clamped before it reaches `frame.start` — `:41-46` writes
`starts![i]` through unclamped.

### C-M4 · MAJOR · The `selectedKeyframesControl` watch has **zero writers** — both of the parsing composable's watches are dead, so the mutation-site calls are the *sole* projector

`useKeyframesParsing.ts:79-84`:

```ts
watch(() => kfControls.selectedKeyframesControl, () => { updateAllStrings(); });
```

```
$ grep -rn "selectedKeyframesControl" demo/
demo/state/controlOptionsStore.ts:20          (the type member)
demo/state/controlOptionsStore.ts:39          (the default "keyframes")
demo/components/.../useKeyframesParsing.ts:80 (this watch)
```

Three hits: a type, a default, and the reader. **Nothing ever writes the cell**, so the watch can never fire. It is
a consumption seam into the demo state layer that reads a cell no producer produces.

**This contradicts L-M1's premise.** That finding (correctly) proved the `animation.templateFrames` watch dead, and
then wrote: *"The editor's only other reprojection triggers are `watch(() => kfControls.selectedKeyframesControl)`
… and the mutation-site calls."* That watch is dead too. The consequence L-M1 drew is therefore **stronger** than it
claimed: after `SpringPhysicsFacet.vue:105`'s re-sample there is no fallback projector of any kind — the explicit
mutation-site calls are not *a* source of truth, they are the *only* one, and the composable's 10-line comment
(`:86-95`) describing a two-projector data flow describes a one-projector data flow.

**Falsifier.** Find a writer of `selectedKeyframesControl` anywhere (including `applySharedControlState`
(`controlOptionsStore.ts:59-64`), which `Object.assign`s whole buckets from a share-link patch — that *could* write
it, but only if a share link carried the member; the demo never emits one, and a bucket-level assign replaces the
`kfControls` object identity the composable captured at `:19`, so the watch's source getter would still not fire).

### C-M5 · MAJOR · `vue-sonner` shadows glass-ui's shipped `./toast` family — NEW shadow-census row (proposed **S-9**)

`KeyframesEditor.vue:124` — `import { toast } from "vue-sonner";` (again at `useKeyframeOps.ts:5` inside the same
closure; 8 demo files total).

glass-ui 7.0.0 exports a complete toast family at a first-class subpath:

```
package.json exports: "./toast"
dist/components/toast/index.d.ts:
  Toast, ToastAction, ToastClose, ToastDescription, ToastTitle, Toaster, toast, useToast
```

The demo instead depends on `vue-sonner ^2.0.9` (`package.json` devDependencies), mounts its `<Toaster>`
(`DemoGlobalChrome.vue:28,48`), ships `lib/index.js` at **45.7 KB**, *and* maintains a bespoke module to work around
the vendor's private DOM contract — `components/instrument/utils/toastGuard.ts:2-16`, whose own header concedes:
*"vue-sonner private DOM contract … If vue-sonner ships a public 'is inside toast' predicate, adopt it here."* That
guard is consumed by this component's own child (`KeyframesAddDialog.vue:19,72`).

This is the S-7 pattern (a design-system primitive installed, reachable, and bypassed) at the largest scale in the
family: an entire notification subsystem, a private-DOM-contract shim, and 46 KB, all shadowing a subpath that is
one import away. The census's shadow inventory (S-1..S-8) does not contain it.

I record the counterweight honestly: `vue-sonner`'s `toast.error(msg, {id, description, duration, action})` API is
used with all five options here and at `useKeyframeOps.ts:34-38`. Whether glass-ui's `toast` parameterises stable
ids, `dismiss`, and action buttons is **not decidable from `index.d.ts` alone** — so this is **evaluate**, not
mechanical-swap, and it is a demo-wide item, not a `KeyframesEditor`-local fix.

**Falsifier.** Read `dist/components/toast/use-toast.d.ts`; if `toast` has no id/dismiss/action surface, the fork is
justified and this drops to INFO. Or show `@mkbabb/glass-ui/toast` unresolvable — the exports map lists it.

### C-M6 · MAJOR · The progress bar shadows glass-ui `./progress`, and is a bare `<div>` with no progress semantics — NEW shadow-census row (proposed **S-10**)

`KeyframesEditor.vue:98-101`:

```html
<div ref="progressBarKeyframesEl" class="progress-bar sticky bottom mt-2"></div>
```

driven by `:254-258` — a fresh `CSSKeyframesAnimation` sweeping `width: 0% → 100%` over 1000 ms. glass-ui 7.0.0
exports `./progress` → `Progress` with `ProgressOrientation | ProgressProps | ProgressStatus | ProgressVariant`
(`dist/components/progress/index.d.ts`). The twin at `KeyframesAddDialog.vue:49-52` is the same bespoke `<div>`.

Two consumption costs, on top of the shadow:

* **No semantics.** No `role="progressbar"`, no `aria-valuenow`/`valuemin`/`valuemax`, no `aria-label`. To AT the
  element does not exist; the visual feedback that an edit was accepted is sighted-only. `Progress` supplies the
  role contract by construction.
* **The bar is a lie.** It is not bound to any real progress — it is a fixed 1 s sweep fired *after* the work is
  queued (`:213-216`), while the actual op is debounced 1000 ms (`useKeyframeOps.ts:108,144`). The bar therefore
  completes at approximately the moment the work *starts*. A `Progress` with `ProgressStatus` would make that
  mismatch expressible; a bespoke `<div>` makes it invisible.

**Falsifier.** Show glass-ui's `Progress` cannot render an indeterminate/decorative sweep (read
`dist/components/progress/types.d.ts` — `ProgressStatus`/`ProgressVariant` suggest it can), or show a
`role="progressbar"` reaching this element (`grep -rn "progressbar" demo/` → none; `.progress-bar` is a CSS class
defined at `design-idioms.css:132-144`, not an ARIA role).

### C-M7 · MAJOR · The child prop `frames: any[]` erases the library's type at the **one seam this component owns** — it is the hole FE-3 / L-B2 / D-1 shipped through

`KeyframesEditor.vue:15` and `:29` pass `:frames="animation.templateFrames"` — typed
`TemplateAnimationFrame<V>[]` where `start: KeyframeSelector`
(`keyframes.js/src/animation/constants/types.ts:64-66` ← `value.js/src/css/types.ts:42-44`). The receiving contract
throws it away:

```ts
const props = defineProps<{ frameStrings: string[]; frames: any[] }>();   // KeyframeCardList.vue:33-36
```

`KeyframeCardList` has exactly one consumer — this component (`grep -rn "KeyframeCardList" demo/` → the definition
plus `KeyframesEditor.vue:12,24`). So the editor **owns** this prop contract outright, and it chose `any[]`.

That is the type hole the family's headline defect went through. `KeyframeCardList.vue:11`
`:frame-start="frames[i].start.toString()"` — the `[object Object]` bug booked as **FE-3** in
`value.js/docs/tranches/V/DISPOSITIONS.md:68` and `audit/FA-1-born-red-truth.md:97-99`, re-derived independently as
**L-B2** and **D-1** — is *unrepresentable* under the real type: `KeyframeSelector` has no `toString`, and a typed
prop would have made `frames[i].start` a narrowable union. Under `any[]` it is silently legal.

I fold FE-3/L-B2/D-1 and do **not** re-file the symptom. The consumption-axis finding is the **cause**: the editor
declares its child's contract as `any[]` while holding the fully-typed value, and the same file also declares
`animation: KeyframesAnimation<any>` (`:133`) — two `any`s at the two seams where the library's types were the whole
point. L-M5's finding that the SFC layer is `tsc`-invisible (no `vue-tsc`) compounds this but does not cause it:
even under `vue-tsc`, `frames: any[]` type-checks.

**Falsifier.** Show a second `KeyframeCardList` consumer whose frame shape differs (there is none), or show
`TemplateAnimationFrame` is not exported for the demo to name — it is, via `@mkbabb/keyframes.js`'s type surface,
and `useKeyframesEditor.ts:1` already imports from it.

### C-M8 · MAJOR · The component **mutates its own prop's object graph** across three composables, and its emit surface cannot report it

`animation` is a prop (`:132-139`). The component and its closure write through it:

* `KeyframesEditor.vue:43` — `frame.start.value = starts![i]`
* `KeyframesEditor.vue:206-209` — `frame.start = {…}`
* `useKeyframeOps.ts:70` — `animation.adoptCompiled(compiled)`; `:127-132` — `Object.assign(animation.options, …)`,
  `Object.assign(animation.templateFrames[frameIx]!.vars, …)`; `:170` `setOptions`; `:174` `addFrame`;
  `:202-205` — `animation.templateFrames = animation.templateFrames.filter(…)` then `animation.parse()`.

Vue props are a one-way contract; a component that owns write access to a parent-held object must publish the
mutation. This one declares an emit surface that cannot: `keyframesUpdate` fires from exactly one of the eight
mutation sites (`useKeyframeOps.ts:83`, inside `updateFromString` only — **not** from add, remove, per-keyframe edit,
start edit, or the slider), and `sliderUpdate` is never emitted at all (D-35 / L-m1, folded). The sole callsite
binds neither (`SpringPhysicsFacet.vue:119`).

The consequence is not hypothetical — it is L-M1's re-sample desync read from the other end: the parent
(`useSpringDemo`) owns `springEditAnim`, mutates it via `seedKeyframes()`, and the child mutates the same object
via seven unannounced paths. Two writers, one object, **no** contract in either direction.

**Falsifier.** Show `keyframesUpdate` emitted from the add/remove/start paths (grep the closure: one `emit(` call,
at `useKeyframeOps.ts:83`), or show a listener that would observe it (`SpringPhysicsFacet.vue:119` binds none).

---

## §3 — MINORS

### C-m1 · MINOR · Root-barrel glass-ui import where per-component subpaths exist — inconsistent inside its own closure

`KeyframesEditor.vue:109` — `import { Card, CardContent, Slider } from "@mkbabb/glass-ui";`

glass-ui 7.0.0's exports map ships `./card` and `./slider` as first-class subpaths (verified in `package.json`;
`dist/card.js` 217 B and `dist/slider.js` 71 B are re-export shims into shared chunks). The **same closure** already
uses subpaths where a subpath is the only route: `KeyframeCard.vue:58` (`/forms`), `useHighlightCSS.ts:2` (`/dark`).
So the file mixes both idioms for no stated reason, and `KeyframesAddDialog.vue:60-69` pulls **8 more symbols** off
the root barrel that have `./dialog`, `./button`, `./card` homes.

**I state the cost honestly, against my own instinct to inflate it.** glass-ui declares `sideEffects: ["*.css"]`, so
the root barrel (`dist/glass-ui.js`, 23.9 KB of re-exports) **is** tree-shakable in a production rollup build. The
real costs are: (a) dev-server pre-bundle breadth, (b) the F-1 blast radius — three of the closure's four glass-ui
sites are subpath imports into an **undeclared, unlocked** package (L-M7, folded), so an exports-map move breaks
resolution with nothing to pin against; (c) legibility — a reader cannot tell which surface the file depends on.
This is a consistency finding, not a bundle-size one.

**Falsifier.** Show `sideEffects` absent or `false`-negating (it is `["*.css"]`), which would make the barrel
non-shakable and promote this; or show `./card`/`./slider` unresolvable (the exports map lists both).

### C-m2 · MINOR · Three static `@mkbabb/value.js` edges inside the closure falsify `kf-engine.ts`'s graph claim **as written**, and the gate that sentence cites does not scope the demo

`demo/kf-engine.ts:6-10` states: *"the HEAVY surface … is value.js-bearing and is reached ONLY through the barrel's
`loadAnimationEngine()` dynamic accessor — **the one place value.js enters the graph**"*, and
`demo/app/main.ts:20-27` repeats it with *"(proof:boundary stays green)"*. `KeyframesEditor.vue:128-130` cites the
same doctrine.

Inside this component's closure alone, value.js enters **statically**, three times:

| site | specifier |
|---|---|
| `KeyframesEditor.vue:123` | `parseCssScalar` ← `@mkbabb/value.js/css` |
| `demo/utils/keyframeSelector.ts:1-4` | `parseKeyframeSelector`, `KeyframeSelector` ← `@mkbabb/value.js/css` |
| `demo/components/.../utils/parseAnimationCSS.ts:1-5` | `collectAnimationOptions`, `collectStyleRules`, `CSSAnimationOptions` ← `@mkbabb/value.js/css` |

(`grep -rn "@mkbabb/value.js" demo/` gives 20+ across the demo.) `@mkbabb/value.js@4.0.0` **is** a declared
`dependencies` entry (`keyframes.js/package.json`) and `dist/subpaths/css.js` is 41.6 KB — so this is a legitimate,
resolvable dependency, **not** an F-1-class phantom. What is wrong is the written invariant.

And the gate the doctrine invokes cannot catch it: `proof:publish` → `scripts/gates/surface/boundary.mjs:1-55`
scopes the **library's light entry points** parsed from `src/animation/index.ts` and greps `src/animation/**`. The
demo is outside its universe by construction.

Read charitably the sentence means *"value.js never lands on keyframes.js's LIGHT static barrel"* — which is true
and is what the gate proves. Read as written it is a claim about the demo's graph, and it is false. Filed MINOR as
a **documentation-accuracy** defect on a comment three files repeat, not as a boundary violation.

**Falsifier.** Show `boundary.mjs` scoping `demo/` (it does not — the entry set is parsed from the barrel's
`export … from` statements, `:24-27`), or show the three imports are type-only (they are not: `parseCssScalar`,
`parseKeyframeSelector`, `collectAnimationOptions`, `collectStyleRules` are all runtime values).

### C-m3 · MINOR · The start field **rejects** `from`/`to`, which the sibling add path **accepts** — a contract divergence inside one component

`parseCssScalar("from")` → `ok`, `{type:"keyword", value:"from"}` (**P1**). `KeyframesEditor.vue:197`'s guard is
`scalar.type !== "number"` → rejected with *"Expected a percentage scalar such as 50%."*

But `from`/`to` are valid CSS keyframe selectors, and the same component's add-keyframes path accepts them:
`useKeyframeOps.ts:174 requireKeyframeSelector(start)` → value.js `parseKeyframeSelector("from")` →
`{kind:"percent", value:0}` (**P1**). The engine's `addFrame` accepts them too
(`frame-compiler.ts:145-146` → `compile/selector.ts:23-25`).

So a user can *add* a `from { … }` stop through the dialog and then be told, by the field editing that same stop,
that `from` is not a valid offset. Same component, two grammars. (Same root cause as C-B1: the wrong entry point.)

**Falsifier.** Show `from` rejected by `parseKeyframeSelector` (P1 disproves), or show the add dialog rejecting it
before `requireKeyframeSelector` (`useKeyframeOps.ts:160-177` has no pre-filter).

### C-m4 · MINOR · `kfControls.keyframes` is written by the sibling and **never read** here — a dead cell in a shared bucket

`useKeyframeOps.ts:60` — `kfControls.keyframes = keyframesString;` — the first statement of `updateFromString`.
Within `KeyframesEditor`, `updateFromString` is **unreachable**: the editor destructures 11 members at `:152-164`
and `updateFromString` is not among them (it is consumed by `KeyframesStringControls.vue:66`).

So on `/spring` the two instances of the composable (C-B2) both hold the same `kfControls`; the string-controls
instance persists the full keyframes text into `localStorage` on every Monaco commit, and the editor instance —
sharing the cell — never reads it. `useKeyframesState.ts:24` seeds `addKeyframesString` from
`kfControls.addKeyframes`, so the *draft* cell is genuinely restored; `keyframes` is write-only.

**Falsifier.** Find a reader of `kfControls.keyframes` (`grep -rn "kfControls.keyframes\|keyframeControls.keyframes"
demo/` → the type member, the default, and the one write).

### C-m5 · MINOR · A bidirectional **callback prop** where the sibling event on the same element uses an emit

`KeyframesEditor.vue:75-80`:

```html
<KeyframesAddDialog
    v-model:open="kfControls.dialogOpen"
    v-model:text="addKeyframesString"
    :format="updateAddKeyframesString"     ← a function prop
    @submit="addKeyframesStringToAnimation" ← an emit
/>
```

`format` is typed `(raw: string) => Promise<string>` (`KeyframesAddDialog.vue:74-77`) and is bound to
`updateAddKeyframesString`, which is **not pure**: `useKeyframeOps.ts:146-153` writes `kfControls.addKeyframes`
*and* `addKeyframesString.value` before returning. So the child's `reformat()` (`:100-107`) triggers a parent state
mutation *and* consumes the return value to re-highlight — a two-way channel disguised as a prop, sitting beside a
one-way emit on the same element.

Compounding: three writers keep the same two cells in sync — `KeyframesEditor.vue:168-170`'s
`watch(addKeyframesString, v => kfControls.addKeyframes = v)`, `useKeyframeOps.ts:149-150`, and
`useKeyframeOps.ts:156-157, 185-186`. The mirror is maintained by hand in three places.

**Falsifier.** Show `updateAddKeyframesString` side-effect-free (`useKeyframeOps.ts:149-150` mutates two cells), or
show the child could not obtain the formatted string via `v-model:text` + an emit (it could — that is exactly what
`:submit` does for the other direction).

### C-m6 · MINOR · `@update-c-s-s` — an event name that survives only Vue's hyphenation accident

`KeyframesEditor.vue:17,29` bind `@update-c-s-s`; the child emits `updateCSS`
(`KeyframeCardList.vue:56`), which Vue hyphenates to `update-c-s-s`. It resolves — and reads as a typo at every
callsite. The family's other events are single-cased and unambiguous (`updateStart`, `remove`, `keydown`), and the
Vue-idiomatic spelling for a value-update event is `update:css`. `KeyframeCard.vue:70` declares the same name, so
the mangling repeats one level down.

**Falsifier.** Show `@update-c-s-s` does not resolve (it does — Vue's emit lookup tries the hyphenated form), which
would make this a defect rather than a smell; or show a house rule mandating this spelling (none in
`demo/CLAUDE.md` or the closure's comments).

### C-m7 · MINOR · Three async engine calls escape the error contract the component's **own** closure defines

`useKeyframeOps.ts:25-40` defines `withErrorToastAsync` and wraps **every** op it owns (`:97, 113, 159`). The
component then calls into the same engine surface three times without it:

* `KeyframesEditor.vue:280` — `updateAllStrings()` inside a non-async `onMounted` → a floating promise;
* `:45` — `updateAllStringsAndAnimation()` inside the Slider handler;
* `:210` — `updateAllStringsAndAnimation()` at the end of `onUpdateStart`.

All three await `loadAnimationEngine()`, then `CSSKeyframesToStrings`/`CSSKeyframesToString`, then
`formatEditorCSS` → `prettier.format(css, {parser:"scss"})` (`demo/utils/formatEditorCSS.ts:6-14`) — a formatter
that throws on unparseable input. `demo/app/main.ts` (read whole) installs no `app.config.errorHandler`, so a
rejection here is a console-only `unhandledrejection` with no user-facing signal, while the identical work reached
through `useKeyframeOps` produces a toast with a Retry action.

**Reachability: `UNPROVEN`.** The strings these three format are engine-generated and therefore well-formed by
construction; I found no input that makes them throw. The defect filed is the **asymmetry** — the closure defines
an error contract and the component opts three call sites out of it — not a proven crash. MINOR for that reason.

**Falsifier.** Show `formatEditorCSS`/`CSSKeyframesToStrings` total (prettier is not — it throws `SyntaxError`), or
show an `errorHandler`/`onErrorCaptured` covering the component (`main.ts` has neither, and floating rejections do
not route through `onErrorCaptured` anyway).

---

## §4 — Empirical probes (reproducible, read-only)

Run from `/Users/mkbabb/Programming/keyframes.js`, against the **installed** `node_modules` — no writes.

**P1 — value.js 4.0.0 parser contracts** (`node --input-type=module` over `dist/subpaths/css.js`):

```
parseCssScalar('50%')          {"ok":true,"value":{"kind":"scalar","payload":{"type":"number","value":50,"unit":"%"}}}
parseCssScalar('500%')         {"ok":true,…"value":500,"unit":"%"}          ← accepted
parseCssScalar('-20%')         {"ok":true,…"value":-20,"unit":"%"}          ← accepted
parseCssScalar('from')         {"ok":true,…{"type":"keyword","value":"from"}}
parseKeyframeSelector('500%')  {"ok":false,…"code":"keyframe_selector_invalid","expected":["0%..100%"]}
parseKeyframeSelector('-20%')  {"ok":false,…"expected":["0%..100%"]}
parseKeyframeSelector('from')  {"ok":true,"value":{"kind":"percent","value":0}}
```
→ establishes **C-B1**, **C-M3**, **C-m3**.

**P2 — the round-trip actually breaks** (same module):

```
parseStylesheet('@keyframes t { 0% {…} 500% {…} }')  → ok:false
   diagnostics: [{code:"keyframe_selector_invalid", expected:["0%..100%"], actual:"500%"}]
parseStylesheet('… -20% {…} …')                      → ok:false, actual:"-20%"
```
→ establishes step 5 of **C-B1**'s chain and **C-M3**'s consequence.

**P3 — R1 is live in the installed value.js, and is NOT reachable from here** (see §5 · K-1):

```
parseCssColor('oklch()')  THREW TypeError: Cannot read properties of undefined (reading 'replace')
parseCssColor('rgb()')    THREW TypeError: …
grep -rn "parseCssColor" keyframes.js/src/   → 0 hits
```

**P4 — glass-ui 7.0.0 surface** (`node_modules/@mkbabb/glass-ui/package.json` + `dist/**/*.d.ts`):

```
exports: "./card" "./slider" "./progress" "./toast" "./button" "./label" "./separator" "./tabs" … (73 keys)
sideEffects: ["*.css"]
dist/components/toast/index.d.ts     → Toast, Toaster, toast, useToast, ToastAction, …
dist/components/progress/index.d.ts  → Progress + ProgressProps/Status/Variant/Orientation
dist/components/slider/types.d.ts    → SliderProps extends reka SliderRootProps; marks?: readonly number[]
dist/components/slider/Slider.vue.d.ts → emits "update:modelValue" AND "valueCommit"
dist/components/card/Card.vue.d.ts   → CardProps: cartoon?, grid?, size?, variant?, metal?, … (extends SurfaceProps)
node_modules/vue-sonner/lib/index.js → 45 715 bytes
```
→ establishes **C-M5**, **C-M6**, **C-m1**; and confirms `cartoon`/`tier` at `KeyframesEditor.vue:10` are real
props (see §5 · K-4).

---

## §5 — Candidates KILLED by their own falsifier (do not re-file)

**K-1 · The R1 parser-crash class is NOT reachable from this component.** The axis asks for R1 *"where reachable"*.
I looked. `parseCssColor("oklch()")` **does** throw in the installed `@mkbabb/value.js@4.0.0`
(`TypeError: Cannot read properties of undefined (reading 'replace')` — P3), matching the megatranche's R1 row. But
`grep -rn "parseCssColor" keyframes.js/src/` returns **zero hits** — the engine never calls it, so no path from a
card's contenteditable (`→ parseAnimationCSS → resolveKeyframes → parseStylesheet`), from `animation.parse()`, or
from the CSS-string projections reaches it. The demo *does* reach `parseCssColor`, at
`demo/scenes/square/useSquareTumble.ts:2` — the **square** scene, not this one. **R1 is out of scope for
`KeyframesEditor`.** Falsifier for my negative: find a `parseCssColor` call inside `src/animation/**` or inside this
component's closure; neither grep hits.

**K-2 · `Card cartoon tier="quiet"` passing dead props to glass-ui 7.0.0.** `CardProps` declares
`cartoon?: boolean` (*"Static Memphis edge treatment"*) and extends `SurfaceProps`, which carries `tier`
(`CardTier = SurfaceTier`) — `dist/components/card/Card.vue.d.ts:1-19`. Both are live 7.0.0 props. Correct
consumption. *(The `framed=true` branch that renders them is unreachable — D-19, folded, not re-filed.)*

**K-3 · `:min`/`:max`/`:step` falling through as attributes instead of props.** `SliderProps extends SliderRootProps`
from reka-ui (`dist/components/slider/types.d.ts:6`), which declares all three. They bind as real props. *(The
domain is still wrong — C-M3 — but for a semantic reason, not a plumbing one.)*

**K-4 · `toast.error(...)` silently no-oping for want of a mounted viewport.** A `<Toaster>` **is** mounted —
`DemoGlobalChrome.vue:28,48` — so the error posture at `:189-203` does reach the user. Killed as a defect; the
*shadow* concern survives separately as C-M5.

**K-5 · `document.head.querySelector('#' + styleId)` throwing on an invalid selector**
(`useHighlightCSS.ts:30`, `:100`). `styleId` is `` `keyframes-style-${superKey}-${animationId}` `` — always
letter-initial, so never a `SyntaxError`. Safe as constructed. *(The **sharing** of the resulting node is the real
defect — C-B2.)*

---

## §6 — Where I fold, sharpen, and contradict

**Folded without re-filing** (cited, not re-derived):

| id | source | disposition here |
|---|---|---|
| **F-1** glass-ui phantom dependency | `lane-frontend.md:15,54,569,612`; sharpened at **L-M7** | CONFIRMED against the tree; feeds C-m1's blast-radius clause. Not re-filed. |
| **FE-3** `[object Object]` start labels | `V/DISPOSITIONS.md:68`, `V/audit/FA-1-born-red-truth.md:97-99`, `R3-01-fresh-eyes.md:33-54`; re-derived as **L-B2** / **D-1** | Still live at HEAD (`KeyframeCardList.vue:11` unchanged). I file its **cause** on my axis — C-M7, the `any[]` prop — not the symptom. |
| **L-B1 / D-2** frozen selector + fraction/percent inversion | KeyframesEditor L and D seats | Not re-filed. C-M3 adds the third, independent layer: the *domain* is out of contract with the producer's grammar, probe-proven. |
| **D-14 / D-15** naked buttons + `useToolbarKeyboard` shadowing `useTabRovingFocus` | D seat §2 | Endorsed. C-M5 and C-M6 add two **further** shadow rows in the same closure. |
| **D-19 / D-35 / L-m1** unreachable `framed` branch, dead emits | D + L seats | Not re-filed. C-M8 uses the dead emit surface as evidence for a different claim (prop-mutation without an observable contract). |
| **L-M6** five deep `@src/animation/**` reaches | L seat | Endorsed; C-S2 records the one place in the same closure that gets it right, which is what makes L-M6 a choice rather than a constraint. |

**Sharpened / contradicted:**

1. **I contradict L-M1's premise.** L-M1 proved the `templateFrames` watch dead and then named
   `watch(() => kfControls.selectedKeyframesControl)` as one of the editor's surviving reprojection triggers.
   **C-M4** shows that cell has zero writers repo-wide, so that watch is dead too. L-M1's *conclusion* gets
   stronger, not weaker: the mutation-site calls are the **only** projector, and the composable's comment
   (`useKeyframesParsing.ts:86-95`) describing a two-projector data flow is describing one.

2. **I extend the shadow census with two new rows and confirm D's third.** `lane-frontend.md`'s S-1..S-8 tally
   ("replace-now" 217 lines, "evaluate" 1 168) omits: **S-9** `vue-sonner` → glass-ui `./toast` (46 KB + a
   private-DOM-contract shim, `toastGuard.ts`), **S-10** `.progress-bar` `<div>` → glass-ui `./progress` (2 sites in
   this family alone). Together with D-15's `useToolbarKeyboard` (111 lines), the census undercounts the shadow
   surface by an entire notification subsystem and a primitive.

3. **I sharpen `lane-library.md:247`** (`KeyframesEditor.vue:186 parseCssScalar(val)`), which inventoried the call
   as a value.js parse seam. **C-B1** shows it is the **wrong seam**: `parseKeyframeSelector` is the entry point
   this callsite needs, it is one directory away, and the component's own `useKeyframeOps.ts:9` already imports it.

4. **I contradict `kf-engine.ts:8-10` / `main.ts:20-27` as written** (C-m2): value.js enters the demo's static graph
   in three places inside this closure alone, and the gate those comments invoke scopes `src/` only. I explicitly do
   **not** call this a boundary violation — the library-side invariant the gate proves is intact and `@mkbabb/value.js`
   is a declared dependency; the defect is the written claim.

I found **no** contradiction of F-1, S-8, or the census's "zero direct reka imports" finding. This component's
glass-ui consumption is entirely through the public barrel and subpaths.

---

## §7 — Superlatives (L-18, run the other way)

**C-S1 · The heavy/light engine split is consumed correctly at every site in this file.** `KeyframesEditor.vue:106`
imports only the **type** `KeyframesAnimation` from the barrel; `:107,130` reads the heavy surface through
`kfEngine()` at **setup** scope, after `main.ts:47`'s warm; every other engine touch in the closure goes through
`await loadAnimationEngine()` (`useKeyframesParsing.ts:34,49`, `useKeyframeOps.ts:62`,
`KeyframeCardList.vue:46`, `KeyframesAddDialog.vue:125`). Verified against `src/animation/index.ts`: the component
never static-imports `CSSKeyframesAnimation`, `AnimationGroup`, or `presets`. The dogfood the comments claim is,
**for the keyframes.js engine specifically**, real.
*Falsifier:* a static import of a heavy symbol in the closure — grep finds none.

**C-S2 · `KeyframeCardList` reaches `formatCSSKeyframeString` through the published accessor, not a deep `@src` path
— the one place in the closure that honours the ED-3 doctrine, with the reasoning written down.**
`KeyframeCardList.vue:38-52`: a `shallowRef` formatter seeded `null`, resolved from `loadAnimationEngine()`, with a
`computed` fallback to the raw string, and a 6-line comment explaining why it is not a deep import. Against
L-M6's five deep `@src/animation/**` reaches in the same closure — one of them from a directory literally named
`internal/` — this file proves the correct route was available for all of them.
*Falsifier:* `formatCSSKeyframeString` absent from the `AnimationEngine` surface — it is on `load-engine.ts`.

**C-S3 · The child-ref contract is a real declared interface, not a DOM reach.**
`KeyframeCard.vue:78-80 defineExpose({ preEl })` → `KeyframeCardList.vue:76-81 getPreElements()` →
`KeyframesEditor.vue:176-178 useCodeHighlight(() => cardList.value?.getPreElements() ?? [])`. Three components,
one declared contract, **zero** `querySelectorAll`, and a lazy getter so the scope tracks the live card set without
a subscription. `useHighlightCSS.ts:74-76` records what it replaced: *"never the whole document (D.W3.S1: the global
`document.querySelectorAll("pre")` was the bug)."* This is the model for the component-to-component seams that
C-M7 and C-B2 get wrong — in the same file.
*Falsifier:* a `querySelector` in the highlight path. There is none.

**C-S4 · The library migration was done at the root, with its provenance recorded — no shim.**
`KeyframesEditor.vue:242-247` uses `AnimationGroup.of(presets.warpLeft().setTargets(el1),
presets.jumpUp().setTargets(el2))` and the comment names what it replaced: *"`AnimationGroup.of(...)` replaces the
excised `KeyframesAnimation.group(...)` convenience (genuine ownership; a06 F1/F2)"*. The standing
`feedback_no_backwards_compat` law honoured at exactly the site where a compat shim would have been cheapest — and
the motion itself is library-owned (`presets`), not hand-rolled keyframes.
*Falsifier:* a re-introduced `KeyframesAnimation.group` shim anywhere. Grep finds none.

**C-S5 · The producer's typed diagnostic is consumed verbatim — the single best piece of library-contract reading in
the file.** `KeyframesEditor.vue:189-193` surfaces `${issue.code} at ${issue.start}-${issue.end}: expected
${issue.expected.join(" or ")}` rather than flattening value.js's `ParseIssue` to a string; the tuple indexing at
`:190` is **sound**, because `ParseResult`'s failure arm is typed `readonly [ParseIssue, ...ParseIssue[]]`
(`value.js/src/css/types.ts:25-27`) — a non-empty tuple — and `expected` is a required `readonly string[]` (`:22`).
The toast is keyed by a stable per-index id (`:180, 189`) so re-typing replaces rather than stacks, and success
explicitly `toast.dismiss`es (`:205`).
The irony is exact and worth stating: this is a **model** consumption of value.js's `ParseResult` contract, asking
the **wrong** value.js function (C-B1). Fix the entry point and this error posture is already right.
*Falsifier:* `diagnostics` typed as a plain array (it is a non-empty tuple), or `expected` optional (it is required).

---

## §8 — Standing to a live audit

Every claim above is source- or probe-derived and falsifiable by reading the tree or re-running §4. Two are marked
for SS-13:

* **UNPROVEN-NEEDS-LIVE (a)** — **C-B2**'s *unmount ordering* on route-leave (which of the two owners removes the
  shared `<style>` first). The id equality, the node adoption at `useHighlightCSS.ts:30-33`, the unconditional
  `remove()` at `:58-61`, the shared class name, and the shared bucket are all source-proven; only the ordering is
  runtime-dependent.
* **UNPROVEN-NEEDS-LIVE (b)** — **C-m7**'s reachability. The contract asymmetry is decidable from source; whether
  any input makes those three unguarded calls actually reject is not, and I did not find one.
