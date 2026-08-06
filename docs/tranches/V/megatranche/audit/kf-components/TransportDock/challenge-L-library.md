claude-opus-5[1m]

# CHALLENGE — `TransportDock.vue` · axis L (LIBRARY)

**Subject** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/transport/TransportDock.vue` (403 lines)
**Colocated unit** `TransportDock/usePlayActuation.ts` (88) · `TransportDock/useMenubarMeasure.ts` (28) · `TransportDock/useIconSpin.ts` (29)
**Method** whole-file read + every transitive import read (glass-ui `dist` type + minified impl, reka-ui `dist`, `@lucide/vue` `dist`, `@vue/runtime-core` `dist`, kf `src/animation/**`), plus two offline oracles run in-session: `@vue/compiler-dom` on the `v-for` fragment, and `npx prettier --check`. **No browser.** Every cost/appearance claim is marked `UNPROVEN-NEEDS-LIVE`; every behavioural claim below is derived from the shipped bytes of the code that runs.
**Posture** the component was assumed DEFECTIVE until the tree proved otherwise. Two hypotheses were **killed** by the tree and are recorded in §5 so they are not re-raised.

**Tally** — 14 defects (2 BLOCKER · 2 MAJOR · 6 MINOR · 4 INFO), 4 superlatives.

**Hitherto corpus folded** — `formation/keyframes/lane-frontend.md` **F-1** (phantom dep) is confirmed and *localised* here (§B-3/D-4); its census row `lane-frontend.md:214` (403 lines, grade **G**) is accepted; the shadow census **S-1..S-8** does not cover this file (no replaceable shadow component here — corroborated, not contradicted). `lane-library.md` is cited only for the engine-surface facts it establishes.

---

## 1. BLOCKERS

### B-1 — the reset-icon spin is DEAD CODE at runtime. It has never played. `BLOCKER`

**Provenance**
- `TransportDock.vue:158-162` — `<DockControl … @click="() => { resetIconSpin(); emit('reset', false); }">` wrapping `<RotateCcw ref="resetIconEl" class="icon-lg" />`
- `TransportDock/useIconSpin.ts:4-8` — `resolveElement()`; `:11` — `useTemplateRef<HTMLElement>("resetIconEl")`; `:22-23` — `const element = resolveElement(resetIconEl.value); if (!element) return;`
- `node_modules/@lucide/vue/dist/esm/createLucideIcon.mjs:10` — `const createLucideIcon = (iconName, iconNode) => (props, { slots, attrs }) => h(Icon, …)`
- `node_modules/@lucide/vue/dist/esm/Icon.mjs:15,41` — `Icon` is likewise a bare arrow `(props, {slots}) => …` returning `h("svg", …)`
- `node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:1761` — `const refValue = vnode.shapeFlag & 4 ? getComponentPublicInstance(vnode.component) : vnode.el;`

**The chain.** `RotateCcw` is a *functional* component (a plain function, not `defineComponent`), so its vnode carries `ShapeFlags.FUNCTIONAL_COMPONENT` (2), not `STATEFUL_COMPONENT` (4). Vue's `setRef` therefore assigns **`vnode.el`** — the rendered root DOM node — to the template ref. That root is `<svg>`, i.e. an `SVGSVGElement`. `SVGSVGElement` descends from `SVGElement → Element`; it is **not** an `HTMLElement`. So in `resolveElement`:

- `value instanceof HTMLElement` → `false`
- `value.$el` → `undefined` (a DOM node has no `$el`) → `undefined instanceof HTMLElement` → `false`
- → returns `null` → `resetIconSpin()` returns at `useIconSpin.ts:23` **on every invocation, forever**.

**Blast radius — two entry points, both dead.** (a) the transport's Reset button (`TransportDock.vue:158`); (b) the global **`R`** shortcut, which reaches the same function through `defineExpose({ resetIconSpin })` (`TransportDock.vue:373`) → `AnimationControlsGroup.vue:325` `resetIconSpin: () => transportDockRef.value?.resetIconSpin()` → `useControlsKeyboardShortcuts.ts:52`. The reset still *works*; only its engine-driven motion is absent. A whole dogfood of `CSSKeyframesAnimation` — the demo's own product — is inert.

**The tell that this was never observed working.** `resolveElement` exists *only* to unwrap a component instance's `$el`. It was written for the stateful-component case. If anyone had ever seen the spin run, the `SVGElement` branch would be there. `useIconSpin` is also the one composable of the three with **no test** (`test/demo/instrument/` has `transport-play-actuation.test.ts` and nothing else) — the untested unit is the broken one.

**Falsifier.** Any one of these kills the claim: (i) `@lucide/vue`'s `RotateCcw` is shown to be a *stateful* component in the resolved build (then the ref is a public instance and `$el` is the `<svg>` — but note that is *still* not an `HTMLElement`, so the claim survives that branch anyway); (ii) `SVGSVGElement instanceof HTMLElement` evaluates `true` in a supported target; (iii) a live probe shows the reset icon visibly rotating on click. (iii) is the cheap kill and belongs to the SS-13 visual pass — but the two static legs above are independently sufficient, so I file this at BLOCKER rather than deferring it.

**Repair shape (not applied).** Widen the guard to `Element` (the engine writes `element.style.transform`, which `SVGElement` supports) — or, better, follow the tree's own precedent and put the `ref` on a real host element rather than on a functional icon (see M-2).

---

### B-2 — Space on the focused expanded Play button actuates TWICE; net no-op. Holding Space resurrects the exact auto-repeat defect `usePlayActuation` was written to kill. `BLOCKER`

**Provenance**
- `TransportDock.vue:69-73` — the expanded Play button's handlers, **no `.stop`**: `@keydown="onPlayKeydown($event)" @keyup="onPlayKeyup($event)"`
- `TransportDock.vue:208-209` — the collapsed mirror's handlers, **with `.stop`**: `@keydown.stop=… @keyup.stop=…`
- `usePlayActuation.ts:74-79` — Space `keydown`: `e.preventDefault(); if (!e.repeat) spaceArmed = true;` (no `stopPropagation`)
- `usePlayActuation.ts:81-86` — Space `keyup`: `actuate()`
- `TransportDock.vue:321-327` — `actuatePlay()` → `emit("togglePlay")`
- `AnimationControlsGroup.vue:105` (`@toggle-play="toggleAnimationGroup"`) and `useControlsKeyboardShortcuts.ts:50` (`registerShortcut("Space", () => toggleAnimationGroup(), { preventDefault: true, … })`) — **the same function**
- `node_modules/@mkbabb/glass-ui/dist/keyboard.js:76` — the registry listens on `window`, `"keydown"`, **bubble phase**
- `node_modules/@mkbabb/glass-ui/dist/keyboard.js:51` — the "editable-target skip" is `INPUT | TEXTAREA | SELECT | isContentEditable | .closest(".monaco-editor")` — **`BUTTON` is not skipped**
- `node_modules/@mkbabb/glass-ui/dist/keyboard.js:69` — the dispatch has **no `e.repeat` guard**
- `node_modules/@mkbabb/glass-ui/dist/button-B7c944jy.js` — glass-ui `Button` renders reka `Primitive` with `as: "button"` and declares **no `emits`**, so `@keydown`/`@keyup` fall through as native listeners on a real focusable `<button>`

**The sequence** (focus on the expanded Play button — which is where focus lands the moment you click it with a mouse):

1. `keydown` (Space) → `onPlayKeydown` → `preventDefault()` (kills the native synthesized click), `spaceArmed = true`. **Propagation continues.**
2. the event bubbles to `window` → glass-ui registry → combo `Space` matches, target is `<button>` (not skipped) → `toggleAnimationGroup()` — **toggle #1**.
3. `keyup` (Space) → `onPlayKeyup` → `spaceArmed` → `actuate()` → `emit("togglePlay")` → `toggleAnimationGroup()` — **toggle #2**.

Net effect of one Space press: play → pause (or pause → play) → back. **Observable symptom: the animation runs only for as long as the key is held.** The primary keyboard activation of the primary transport control is a no-op.

**And the F2 regression.** `usePlayActuation.ts:12-18` documents auto-repeat as defect **F2** and cures it locally (`if (!e.repeat) spaceArmed = true`). But the *window* handler has no repeat guard (`keyboard.js:69`), and the keydown was never stopped — so **holding** Space on the focused Play button rapid-toggles playback at the OS key-repeat rate. F2 is alive; it merely moved one listener up the tree.

**The drift the file denies.** `TransportDock.vue:311-312` asserts: *"One handler set governs both the expanded button and the collapsed-summary mirror so the two controls can never drift."* The handler *set* is shared; the **bindings** are not. `.stop` on the collapsed mirror (`:205-209`) severs the bubble and makes it correct; its absence on the expanded control (`:69-73`) makes it wrong. Two controls, one documented invariant, opposite behaviour.

**Why the unit tests did not catch it.** `test/demo/instrument/transport-play-actuation.test.ts` drives `usePlayActuation` in isolation against synthetic event objects. The double-fire is a *composition* fact of (button in the DOM) × (window-level registry). Isolation is exactly what hid it. This is a caveat on S-1, not a retraction of it.

**Falsifier.** Any of: (i) some ancestor between the Play button and `window` calls `stopPropagation` on `keydown` (I read the chain — `TooltipTrigger as-child` → glass-ui `Button` → reka `Primitive`; glass-ui `Button`'s only propagation stop is `onClick`'s `stopImmediatePropagation` **guarded on `disabled`**, `button-B7c944jy.js` `function S(e){ h.value || !m.value || (e.preventDefault(), e.stopImmediatePropagation()) }` — never on keydown); (ii) `toggleAnimationGroup` is idempotent within a press interval (it is not — keydown and keyup are separate tasks tens-to-hundreds of ms apart); (iii) the Play button is not focusable or `registerShortcut` skips `BUTTON` targets (both refuted at `keyboard.js:51`); (iv) a live keyboard probe shows a single toggle. (iv) is the decisive live kill and I would welcome it — but every static leg checks out, so this is filed at BLOCKER.

**Repair shape (not applied).** Add `.stop` to the expanded control's `@keydown`/`@keyup` (matching the mirror, which is already right), **or** give the global Space shortcut a "skip when the event target is itself a play control" predicate. The first is one word and makes the file's own "never drift" claim true.

---

## 2. MAJOR

### M-1 — the `animationProgress` prop churns identity every rAF frame, re-rendering the whole dock for a value read only inside a *closed* popover `MAJOR`

**Provenance**
- `TransportDock.vue:337-343` — `animationProgress: Record<string, number>` in the props contract
- `TransportDock.vue:361-364` — the only read: `dotStyle(name)` → `animationProgress[name] ?? 0`
- `TransportDock.vue:126-132` — `dotStyle` is invoked **only** inside `<SelectContent>` → `<SelectItem>`
- `AnimationControlsGroup/useAnimationProgress.ts:20-40` — `const p: Record<string, number> = {}; … animationProgress.value = p;` — a **new object every frame**, inside `useRafLoop(..., { guard: isPlaying })`
- `AnimationControlsGroup.vue:103` — `:animation-progress="animationProgress"`

**The mechanism.** The parent's render effect reads `animationProgress.value`, so the parent re-renders every frame while playing; the child's `animationProgress` prop is a *fresh object identity* each frame, so `shouldUpdateComponent` returns true and **TransportDock re-renders every frame** — its `GlassDock`, three `Tooltip`s, two `Button`s, two `DockControl`s and the `Select` trigger all get diffed at 60 Hz. Meanwhile the value that justifies the prop is consumed **only** when the animation dropdown is open: `node_modules/reka-ui/dist/Select/SelectContent.js` gates `SelectContentImpl` behind `Presence` with `forceMount` defaulting false, so the slot closure containing `dotStyle` is not invoked while closed.

So the contract is inverted: a whole per-frame-churning map is pushed across the boundary for a value the component reads in a state it is almost never in.

**Severity split (be precise).** The *re-render* is structurally certain from the bytes above. The *cost* is `UNPROVEN-NEEDS-LIVE` — patch flags make much of the subtree cheap, and `GlassDock`'s own per-frame work is not measured here.

**Falsifier.** (i) Show `shouldUpdateComponent` short-circuits on this prop (it cannot — object identity differs each frame and the prop is in the dynamic-props list); (ii) show `useRafLoop`'s guard keeps the loop parked in the common case (it runs whenever `isPlaying`, the demo's default state); (iii) a live profile showing the per-frame diff is below noise — which would demote this to INFO, not kill it.

**Repair shape (not applied).** Narrow the contract to what the component reads: a `(name: string) => number` getter, or a `Ref<number>` for the *selected* animation only. Both leave the per-frame churn on the producing side of the boundary, where it belongs.

### M-2 — `useIconSpin` violates the repo's own established engine-consumption idiom on all three axes: eager engine read that can *throw in setup*, mount-time construction, zero teardown `MAJOR`

**Provenance (the deviation)** — `TransportDock/useIconSpin.ts:12-20`
```ts
const { CSSKeyframesAnimation } = kfEngine();          // :12  eager, at setup
const animation = new CSSKeyframesAnimation({…})       // :13  constructed at mount
    .fromString(/*css*/ `@keyframes twist { … }`);     // :16  parsed at mount
```
…and no `onScopeDispose` / `onBeforeUnmount` anywhere in the file (29 lines, read whole).

**Provenance (the in-tree precedent it departs from)** — `demo/scenes/cube/CubeTarget.vue`
```
:198  const { CSSKeyframesAnimation } = await loadAnimationEngine();   // lazy, at gesture time
:204  rollAnim?.stop();                                               // stop before re-play
:205  rollAnim = new CSSKeyframesAnimation({ … })
:235  onScopeDispose(() => { rollAnim?.stop(); … })                    // teardown
```

**Three distinct problems.**

1. **Hard throw in setup.** `demo/kf-engine.ts:49-56` — `kfEngine()` **throws** (`:51`) if `warmKfEngine()` has not resolved. Calling it at composable-setup makes `TransportDock`'s entire `setup()` throw in any context that has not warmed the engine (unit test, SSR, isolated story, a future route that mounts the dock before `main.ts`'s warm). The app is safe only because `main.ts` awaits the warm before `app.mount()` — a *global ordering* invariant that this local composable silently depends on. `CubeTarget.vue:198` shows the tree already knows the lazy form.
2. **Mount-time parse for a feature that may never fire.** A three-frame `@keyframes` string is parsed through `fromString` on **every** TransportDock mount — i.e. on every scene switch that has ≥1 channel — for a spin the user may never trigger. Given B-1, it is currently parsed for a spin that can *never* trigger.
3. **No teardown.** `KeyframesAnimation` owns a `RAFPlayback` (`src/animation/engine/animation.ts:69`) and `reset()` does **not** stop the loop (`src/animation/engine/play-lifecycle.ts:476-481` — `cancelWAAPI` + `fillBackwards` + `settle`, no `playback.stop()`). Unmounting mid-spin leaves the rAF loop running to completion (≤400 ms) writing `style.transform` onto a detached node. Bounded, but it is a leak, and it is exactly what `CubeTarget.vue:235` guards against. **This is latent today only because B-1 means the loop never starts** — fixing B-1 without adding teardown converts a dead feature into a live leak.

**Falsifier.** (i) Show `warmKfEngine()` is guaranteed resolved before *any* possible TransportDock mount in every context including tests (the throw at `kf-engine.ts:51` is the counter-evidence; the async-component barrel at `transport/index.ts:11` widens the mount surface further); (ii) show `KeyframesAnimation` self-stops on GC or on target detach (`RAFPlayback` holds `_rafId` until `stop()`; nothing else clears it); (iii) show `CubeTarget.vue` is the anomalous idiom and eager-at-setup is the house style — the tree disagrees (`demo/scenes/**` uses `kfEngine()` at composable init where the engine is warm by construction *and* the animation is the scene's whole point; `useIconSpin` is decorative chrome).

---

## 3. MINOR

### m-1 — `<template v-for>` with no `:key` compiles to an UNKEYED fragment `MINOR`
`TransportDock.vue:121-141` — `<template v-for="name in animationNames">` wrapping `<SelectItem … :value="name">`, neither carrying `:key`.
Compiled in-session with `@vue/compiler-dom` on the exact shape: the emitted fragment flag is **`256 /* UNKEYED_FRAGMENT */`**, so Vue patches these `SelectItem`s **by index** (`patchUnkeyedChildren`), reusing component instances across identity changes. reka's `SelectItem` registers into a `useCollection` on mount and carries per-item highlight/`data-state`; index-reuse across a channel-set change (scene switch → `animationNames` shrinks/reorders) patches `value` in place under a retained instance.
Also: the wrapping `<template>` has exactly one child and buys nothing — `v-for` belongs on `<SelectItem>` directly, with `:key="name"`.
**Falsifier.** Show Vue keys `<template v-for>` fragments implicitly (the compiler output above says otherwise), or show reka `SelectItem` re-registers on `value` change such that index-reuse is indistinguishable from keyed reconciliation. A live probe showing correct highlight after a channel-set change would demote this to INFO; it would not make the missing key correct.

### m-2 — `class="p-0 m-0 cursor-pointer"` on `<Select>` is silently discarded `MINOR`
`TransportDock.vue:94`. glass-ui's `Select` declares no `class` prop (`dist/components/select/Select.vue.d.ts` — props are exactly `SelectRootProps`) and renders reka `SelectRoot` (`dist/select-DD6Ly6xg.js`, `__name: "Select"` → `h(SelectRoot, mergeProps({"data-slot":"select"}, forwarded))`). reka's `SelectRoot` sets **`inheritAttrs: false`** (`node_modules/reka-ui/dist/Select/SelectRoot.js`) and renders a fragment. The class never reaches a DOM node and Vue emits no warning. The `cursor-pointer` intent in particular is unrealised. Dead code that reads as live styling.
**Falsifier.** Show a rendered element carrying `p-0 m-0 cursor-pointer` under the select root in a live DOM snapshot.

### m-3 — the `reset` event's `all: boolean` payload is dead; the parent's `clear()` branch is unreachable from here `MINOR`
`TransportDock.vue:346` declares `(e: "reset", all: boolean): void`; the only emit is `TransportDock.vue:158` `emit('reset', false)`. `AnimationControlsGroup.vue:106` handles `(all: boolean) => all ? clear() : reset()` — the `clear()` arm is unreachable. `TransportDock.vue:368-372` is a tombstone comment explaining exactly why (T.C2 moved "Clear all & reload" to the settings menu) — the comment was updated, the event signature was not.
**Falsifier.** Find another emitter of `reset` with `true` reaching this handler (grep across `demo/` finds none).

### m-4 — duplicate import statements from the same specifier, and the file is not prettier-clean `MINOR`
`TransportDock.vue:222-227` and `:249` both import from `@lucide/vue`; `:229-233` and `:251` both import from `@mkbabb/glass-ui/dock`. The repo ships `prettier-plugin-organize-imports` (`package.json` devDeps), which merges exactly this. Verified in-session: `npx prettier --check demo/components/instrument/transport/TransportDock.vue` → **`[warn] … Code style issues found`** (the three colocated `.ts` composables pass clean). The template indentation at `:92-145` is visibly out of band with the rest of the file, consistent with a hand-edit that skipped the formatter.
**Falsifier.** `prettier --check` passing on this path.

### m-5 — the monotonic-peak invariant the file asserts is false across an unmount; `:root` writes are unrefcounted `MINOR`
`TransportDock.vue:286-291` asserts the peak is *"stable by construction — it only ever grows … so the full-bleed frame never moves"*. `TransportDock/useMenubarMeasure.ts:22-26` unmounts by `removeProperty(HEIGHT_PROP)`, `removeProperty(PEAK_PROP)`, **`peak = 0`**. The transport is `v-if`'d on channel cardinality (`AnimationControlsGroup.vue:98` `v-if="transportNames.length > 0"`), so a route to a zero-channel scene *does* unmount it: both custom properties vanish, the high-water mark restarts at 0, and the remounted instance re-publishes only after `onMounted(publish)` (`:21`) — one frame late. The monotonic guarantee is scoped to one instance lifetime; the comment claims page scope.
Separately: the composable writes to `document.documentElement` with no refcount, so a second concurrent TransportDock (the async barrel export at `transport/index.ts:11` makes that reachable) would have the first unmount wipe the survivor's published height.
**Falsifier.** Show TransportDock can never unmount while anything reads `--menubar-measured-h-peak` (the full-bleed stage), or show the reserve's `max()` fallback makes the reset invisible. Magnitude of any resulting shift is `UNPROVEN-NEEDS-LIVE`.

### m-6 — the composables reach into the caller's template-ref namespace by hard-coded string `MINOR`
`useMenubarMeasure.ts:8` `useTemplateRef<HTMLElement>("menubarHostEl")` and `useIconSpin.ts:11` `useTemplateRef<HTMLElement>("resetIconEl")` bind by *string literal* to refs declared in a template they do not own (`TransportDock.vue:3`, `:159`). The returned refs are destructured at `:276` / `:366` but never referenced in script — the coupling is entirely by name. Rename the template attribute and the composable silently yields `null` forever, with no type error, no lint error, and no runtime warning. **B-1 is the proof that this failure mode is not hypothetical here** — it presents identically (a permanently-`null` element, silently swallowed by an early return).
Both generics are also *lies*: `resetIconEl` resolves to an `SVGSVGElement`, not an `HTMLElement`, and `useTemplateRef<HTMLElement>` is an explicit assertion no checker can contradict.
**Falsifier.** Show a checker in the repo that binds template-ref strings to composable arguments (there is none — see i-4), or show a convention doc mandating the string form.

---

## 4. INFO

### i-1 — 143 of 373 non-style lines are historical tranche narration, some of it orphaned from the code it describes `INFO`
Measured: template `:1-217` → 70 comment lines; script `:219-374` → 73. Two blocks specifically:
- `TransportDock.vue:278-291` (the J.WZ peak narration) describes a mechanism that now lives entirely in `useMenubarMeasure.ts:9-19`. No code in this file implements it; the comment sits alone after `:276`.
- `TransportDock.vue:293-319` (R.W6 C.6 / S.B7 S6) restates, at length, the docblock that `usePlayActuation.ts:1-30` already carries. One rationale, two homes, and — per B-2 — the version in *this* file makes a claim ("can never drift") the bindings twelve lines away contradict.
Not a defect in itself; it is why the drift was invisible. **Falsifier.** A repo convention that decisions are recorded at the call site as well as the implementation.

### i-2 — `String(key)` launders a type-permitted nullish into `"null"` / `"undefined"` `INFO`
`TransportDock.vue:96-100` — `@update:model-value="(key) => { emit('selectAnimation', String(key)); }"`. reka types the payload as `AcceptableValue`, which **includes `null`**; the store types the field as `string | null` (`demo/state/controlOptionsStore.ts:15`). The honest form is `key == null ? "" : String(key)` or a `string` narrow. Currently unreachable (no `nullableValue`, no clear affordance), hence INFO.
**Falsifier.** Show reka's single-select `SelectRoot` cannot emit `null` under any configuration reachable here.

### i-3 — `text-ellipsis` on `SelectValue` can never truncate `INFO`
`TransportDock.vue:115` — `class="text-ellipsis"` with no `overflow-hidden`, no `whitespace-nowrap`, no width constraint on that node. `text-overflow` is inert without all three. (Aesthetic consequence belongs to the A axis; the library-axis point is that it is a no-op class.)
**Falsifier.** A live computed-style read showing an ellipsis on a long animation name.

### i-4 — nothing in this file is type-checked by any gate `INFO`
`package.json` has **no `vue-tsc`** anywhere; `check` is `tsc --noEmit && tsc --noEmit -p tsconfig.test.json` (plain `tsc` ignores `.vue`), and CI runs only `check:lib` (`.github/workflows/ci.yml:42`, `release.yml:43`) → `tsconfig.lib.json` whose `include` is `["src/"]`. So neither the template nor the script block of TransportDock, nor the three colocated `.ts` composables, is checked in CI.
**Stated honestly:** this did **not** cause B-1 — `useTemplateRef<HTMLElement>(…)` is an explicit assertion that `vue-tsc` would also have believed. It is context for why m-6 and m-2 survive.
**Falsifier.** A CI step that runs `vue-tsc` over `demo/`.

---

## 5. Hypotheses the tree KILLED (recorded so they are not re-raised)

- **"`setTargets` accumulates targets across calls, so repeated reset clicks leak targets."** FALSE. `src/animation/engine/animation.ts:465-466` — `setTargets(...targets) { this.targets = targets; … }` **replaces**. No accumulation.
- **"`reset()` + `play()` in quick succession stacks two rAF loops."** FALSE. `src/animation/physics/playback.ts` — `loop = (cb) => { this.stop(); this._run(cb); }`, plus the generation guard `_gen`. Re-entry is safe by construction. (The engine is *right* here; see S-4's sibling note.)
- **"`timingFunction: 'easeOutCubic'` is an unregistered name and silently falls back."** FALSE. `src/animation/compile/easing/easing-registry.ts:19` lists `"easeOutCubic"`; `src/animation/easing.ts:58-59` documents both camel and kebab forms as valid.

---

## 6. SUPERLATIVES (L-18, running the other way)

### S-1 — `usePlayActuation` is the best-specified and best-tested unit in the transport `EXEMPLARY`
`TransportDock/usePlayActuation.ts` (88 lines) owns **no** DOM and **no** emit — the SFC injects `actuate` (`TransportDock.vue:321-335`) — and encodes real native-button semantics: press-origin gating by `pointerId` set (`:45,54,61`), `isPrimary` + non-primary-button rejection (`:50-53,56-58`), `pointercancel` clearing the origin (`:64-66`), Enter-on-keydown with `e.repeat` guard, Space-on-keyup (`:67-86`). It is backed by **11 driven test cases** in `test/demo/instrument/transport-play-actuation.test.ts` — including the two negatives that matter (`"a pointerup whose press began elsewhere does NOT actuate"`, `"ignores a non-primary pointer"`). This is the shape a demo composable should have.
**Falsifier (the superlative's own).** B-2 shows the *contract* is right and the *composition* is wrong: isolation-testing a handler set cannot see a window-level listener on the same key. The praise stands for the unit; it does not extend to the mount. Anyone citing S-1 as evidence the play path is sound is misciting it.

### S-2 — the progress ring is a one-custom-property handoff, not per-frame string building `EXEMPLARY`
`TransportDock.vue:361-364` — `dotStyle` returns exactly `{ "--dot-p": String(p) }`; `:126-132` binds it; `:399-402` records that the `.progress-dot` conic-gradient recipe was **promoted out** to `design-idioms.css` beside `.progress-bar` — verified present at `demo/styles/design-idioms.css:146-147` (`/* .progress-dot — the active-playing conic ring + glow, driven by --dot-p (0–1), allocation-free. */`), so the promotion is real, not an orphaned tombstone. The hot path allocates one two-character property; the gradient, ring geometry and shadow are the stylesheet's problem. No inline `conic-gradient(...)` string is rebuilt per frame per item. This is the correct division between JS and CSS for a 60 Hz visual.
**Falsifier.** The "is the recipe orphaned?" leg is already discharged above (it is present). Remaining kills: show `--dot-p` is re-read by JS somewhere, re-coupling the layers; or show `dotStyle` is invoked outside a render where its allocation is unbounded (it is called once per rendered `SelectItem`, only while the popover is mounted — see M-1).

### S-3 — the channel elision drops the node **and** its flanking separator, from one shared count authority `EXEMPLARY`
`TransportDock.vue:88-149` — the entire `<template v-if="channelZoneKind === 'select'">` block wraps `<DockSeparator />` *together with* the `Select`. Zone absent ⇒ no node **and** no orphan separator — the failure mode that produces a dangling divider in almost every dock implementation is structurally impossible here. The cardinality itself comes from `dockCardinality` (`demo/components/instrument/surfaceTabs.ts:25-41`), the same function `ChromeDock` uses (`demo/state/controlSurfaces.ts:217` names the three call sites), so the "≥2 ⇒ select" rule cannot drift between docks. There are zero hand-rolled separator `<div>`s in the file.
**Falsifier.** Find a second, divergent cardinality rule for the same zone elsewhere in `demo/`, or a rendered separator with no inhabited zone beside it.

### S-4 — the menubar measure is genuinely acyclic, and it actually tears down `EXEMPLARY`
`TransportDock/useMenubarMeasure.ts:10-19` publishes the host's measured border-box height to `:root` — and the height is content-driven, never a function of the reserve it feeds (`TransportDock.vue:271-273` states the invariant; the code honours it: `getBoundingClientRect().height` of the host, with the peak a pure ceiling that is never read back). No custom-property cycle can form. And `:22-26` **removes both properties on unmount** — global-CSS-var writers in demo code overwhelmingly do not clean up. `Math.ceil` (`:13`) on the published value is the right call for a reserve (round *up*, never under-reserve).
**Falsifier (the superlative's own).** m-5 is the flaw in the same file — the peak reset breaks the *page-scoped* stability the SFC comment claims. The acyclicity and the teardown are real and worth keeping; the monotonic claim is not.

---

## 7. What a repair wave should touch, in order

1. **B-2** — one word (`.stop` on `TransportDock.vue:72-73`, matching the mirror at `:208-209`). Highest value per byte in the file. Add a composition test that mounts the button *and* registers the global Space shortcut, since the existing isolation suite cannot see this class.
2. **B-1** — widen `resolveElement` to `Element`, or move `ref="resetIconEl"` onto a host element. Then **M-2** immediately: `onScopeDispose(() => animation.stop())`, because fixing B-1 turns the dormant leak live.
3. **M-2** — lazy `loadAnimationEngine()` at first spin, per `CubeTarget.vue:198`; drop the setup-time `kfEngine()` throw.
4. **m-1, m-2, m-3, m-4** — mechanical, independently landable, zero behaviour risk except m-1 which *fixes* behaviour.
5. **M-1** — narrow the prop contract. Wants the parent's agreement, so it is a two-file change.
6. **m-5, m-6, i-1** — the composable-contract cleanup; best done as one pass with the narration reconciled to where the code actually lives.

**F-1 gates all of it.** `lane-frontend.md:15,54-64` — `@mkbabb/glass-ui` is absent from `package.json` and `package-lock.json` while 7.0.0 sits in `node_modules`. This component reaches **four** glass-ui subpaths (`TransportDock.vue:229-233,244-247,251` — root, `/dock`, `/tooltip`, `/status-dot`) and every one of the findings above that cites glass-ui bytes (B-2's keyboard registry, m-2's Select root, M-1's `GlassDock`) is verified against an installed artifact no lockfile can reproduce. Until F-1 lands, the evidence base for this challenge is a `Jul 16 05:17` install, not a reproducible resolution.
