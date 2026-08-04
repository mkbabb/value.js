claude-opus-5[1m]

# CHALLENGE · CubeScene · axis C (CONSUMPTION)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/cube/CubeScene.vue` (287 lines)
**Axis** how this component consumes keyframes.js (the library) and glass-ui (the design system) — subpath choices, shadow components, value.js transitive exposure, props/emits contract quality, integration seams with siblings.
**Mode** static, read-only. No installs, no dev servers, no browser tooling. Livable-only claims are marked **UNPROVEN-NEEDS-LIVE** for the SS-13 visual audit.
**Substrate** keyframes.js `master`, demo tree as-on-disk 2026-08-04; installed glass-ui **7.0.0**, installed value.js **4.0.0**, kf package version **6.0.0**.
**Priors folded** `formation/keyframes/lane-frontend.md` (F-1 phantom dep, F-5 shims, S-1..S-8 shadow census), `formation/keyframes/lane-library.md` (§7.5 parse-seam posture, line 243 R1 surface). Cited where they overlap; contradicted explicitly where the tree disagrees.

**Files read whole (read-only):** `CubeScene.vue`, `CubeTarget.vue`, `CubeTarget.css`, `cubeKeys.ts`, `cubeTransformStore.ts`, `useCubeDemo.ts`, `matrix-editor/MatrixEditor.vue`, `matrix-editor/useTransformState.ts`, `composables/scene-facility/index.ts`, `state/controlOptionsStore.ts`, `state/controlSurfaces.ts` (§ relevant), `app/App.vue`, `app/scene/sceneExposedApi.ts`, `app/scene/useSceneMachineShellBinding.ts`, `app/scene/scenes.ts` (§ registry), `app/dock/MbabbMenu.vue`, `components/instrument/shell/EditorShell.vue` (slots), `components/instrument/transport/controls-pane/{ControlsPaneWrapper,RibbonBar}.vue`, `demo/env.d.ts`, `demo/kf-engine.ts`, `.github/workflows/ci.yml`; plus `node_modules/@mkbabb/glass-ui/dist/components/{button,card,input,popover}/*.d.ts` and `node_modules/@mkbabb/value.js/dist/subpaths/*.js`.

**Posture** the component is presumed DEFECTIVE until the tree proves otherwise. Every claim below carries a falsifier; two hypotheses I formed were tested and **killed by the tree** and are recorded as such (§ *Falsified hypotheses*), because a false defect costs more than a missed one.

---

## 0. Verdict table

| id | severity | claim | anchor |
|---|---|---|---|
| **C-1** | **BLOCKER** | `pp-mode` has NO reachable writer — both candidate writers are dead, one of them by throwing | `CubeScene.vue:19,85-87` · `MbabbMenu.vue:100` |
| **C-2** | MAJOR | `headerLeft` is exposed into a slot the shell never fills — ~47 lines and 3 of 4 glass-ui imports are unreachable | `CubeScene.vue:118-144,252` · `App.vue:45-101` |
| **C-3** | MAJOR | glass-ui `Button` API drift: `variant:"outline"` is not a 7.0.0 prop; the buttons render at DEFAULT emphasis | `CubeScene.vue:187,192` |
| **C-4** | MAJOR | ribbon extras re-implement `RIBBON_BUTTON_CLASS` and diverge on four axes inside the same strip | `CubeScene.vue:188,193` · `RibbonBar.vue:135` |
| **C-5** | MAJOR | `isPlaying` is a write-never ref exposed outside the typed contract; it dead-ends three consumers incl. a documented perf hint | `CubeScene.vue:65,250` |
| **C-6** | MAJOR | matrix-cell bounds contract is inert — `:start`/`:end`/`:step` are not glass-ui `InputProps`; **new shadow S-9** | `MatrixEditor.vue:34-36` |
| **C-7** | MAJOR | every matrix edit spawns an unowned, undisposed `NumericAnimation`; concurrent edits contend over `matrix3dEnd` | `useTransformState.ts:87-93,105-126` |
| **C-8** | MINOR | the `SceneFacet` metadata CubeScene supplies is dead — it re-introduces the duplicate `SURFACE_META` exists to kill | `CubeScene.vue:232-236` |
| **C-9** | MINOR | the shared store under-types the cube's own extension; **no `.vue` in this repo is ever type-checked**, in CI or locally | `controlOptionsStore.ts:26` · `env.d.ts:3` · `ci.yml:41,73` |
| **C-10** | MINOR | the gesture contract is duplicated verbatim across the parent/child seam (2 nested non-passive wheel listeners) | `CubeScene.vue:12-13` · `CubeTarget.vue:4-5` |
| **C-11** | MINOR | `easeInBounce` survives the T.A3 "ONE settle-motion language" edict at the one site the ribbon Reset drives | `useTransformState.ts:1,107` vs `useCubeDemo.ts:124-129` |
| **C-12** | MINOR | `tabsContent` returns `null` against a `() => VNode` contract; MatrixEditor's `resetMatrix` emit is a dead wire | `sceneExposedApi.ts:25` · `MatrixEditor.vue:108-111,136-138` |
| **C-13** | INFO | the persisted transform aliases the live `mat4` (asymmetric copy) | `CubeScene.vue:221-224` |
| **C-14** | INFO | on HOME the component keys its store bucket `"cube"` while the shell keys `"home"` — two buckets, one mount | `CubeScene.vue:60,62` · `scenes.ts:130-136` |
| **L-1** | SUPERLATIVE | the heavy/light engine boundary is honored exactly, and CubeScene is the one scene where it *matters* | `useCubeDemo.ts:50` · `CubeTarget.vue:110` · `App.vue:155` |
| **L-2** | SUPERLATIVE | zero R1 (`parseCssColor`) exposure — provable at the chunk level, not incidental | 6 value.js edges, all grammar-free |
| **L-3** | SUPERLATIVE | the glass boundary is import-clean; exactly ONE bespoke-vs-glass shadow in the whole subtree | `MatrixEditor.vue:97-98` |
| **L-4** | SUPERLATIVE | the T.B2 conditional-surface inversion is genuinely landed — here the prose and the tree AGREE | `CubeScene.vue:228-238` · `controlSurfaces.ts:111-113` |

**Totals — defects 14 · blockers 1 · superlatives 4.**

---

## 1. BLOCKER

### C-1 · `pp-mode` has no reachable writer; one candidate writer throws on click

`CubeScene.vue:19` passes a prop the child branches its ENTIRE face render on:

```
CubeScene.vue:19    :pp-mode="storedControls.ppMode ?? false"
CubeTarget.vue:53       <template v-if="!ppMode">      ← the six crayon faces
CubeTarget.vue:82       <template v-else>              ← the ppmycota-cube / ppmycota-logo-lg faces
```

CubeScene seeds the field (`:63 storedControls.ppMode ??= false`) and therefore OWNS this store extension. There are exactly two writers in the entire demo (probe: `grep -rn "ppMode" demo/` → 6 code sites, listed below). **Both are dead:**

**Writer A — CubeScene's own.** `CubeScene.vue:85-87`:
```js
const setPPMode = () => { storedControls.ppMode = !storedControls.ppMode; };
```
Its only call site is the `PopoverTrigger` `onClick` at `CubeScene.vue:123-125`, inside `headerLeft` — which is never mounted (**C-2**).

**Writer B — the dock menu.** `app/dock/MbabbMenu.vue:98-101`, wired to a live click at `MbabbMenu.vue:29` (`<DropdownMenuItem … @click="togglePpMode">`):
```js
function togglePpMode() {
    const stored = getStoredAnimationGroupControlOptions(props.superKey);
    stored.value.ppMode = !(stored.value.ppMode ?? false);
}
```
`getStoredAnimationGroupControlOptions` returns a **plain object**, not a ref — `state/controlOptionsStore.ts:66-97`, declared `): StoredAnimationGroupControlOptions` and ending `return controls;` where `controls = store.value[superKey] as StoredAnimationGroupControlOptions` (`:86-88`). So `stored.value` is `undefined`, and the assignment throws:

> `TypeError: Cannot set properties of undefined (setting 'ppMode')`

Every other consumer in the tree reads it correctly as a bare object — `CubeScene.vue:62-63`, `MatrixEditor.vue:113`, `AnimationControlsGroup.vue:176`, `App.vue:229`. MbabbMenu is the lone `.value` deref.

**Consequence.** `ppMode` is permanently `false`; `CubeTarget.vue:82-89` is dead render; the `.ppmycota-cube` / `.ppmycota-logo-lg` rules that `styles/brand.css` exists to serve ("`.ppmycota-*` rules … RECUR across three SFCs", `brand.css:2`) have one fewer live consumer than the file claims; and a shipped, click-wired menu item raises an uncaught `TypeError` in the console.

**Severity BLOCKER** — a live user-reachable click path throws. The throw itself is `MbabbMenu.vue:100`; the *contract* defect (a prop with no reachable writer) is CubeScene's, and the two are one finding because CubeScene owns the field and its own writer is the one that was supposed to survive.

**Falsifier.** Any third `ppMode` writer anywhere in the tree, or `getStoredAnimationGroupControlOptions` returning a `Ref`. Probes run: `grep -rn "ppMode" demo/ --include=*.vue --include=*.ts` → `CubeScene.vue:19,63,86`, `CubeTarget.vue:120`, `MbabbMenu.vue:88` (comment), `MbabbMenu.vue:100`. Nothing else. The return type is a plain object at `controlOptionsStore.ts:70`.

---

## 2. MAJOR

### C-2 · `headerLeft` is exposed into a slot the shell never fills

`CubeScene.vue:118-144` builds a 27-line glass-ui `Popover`/`PopoverTrigger`/`PopoverContent` hovercard as a render function and exposes it at `:252`. `sceneExposedApi.ts:27` declares the protocol member (`headerLeft?: () => VNode`). `EditorShell.vue:18` even declares the receiving slot (`<slot name="header-left"></slot>`).

**But App.vue — the only `EditorShell` consumer — never fills it.** `App.vue:45-101` supplies `#backdrop`, `#start-screen`, `#tabs-trigger`, `#tabs-content`, `#ribbon-content`, `#target`. No `#header-left`.

Probe: `grep -rn "headerLeft\|header-left" demo/` → 5 hits total: `CubeScene.vue:118`, `CubeScene.vue:252`, `sceneExposedApi.ts:6` (prose), `sceneExposedApi.ts:27` (type), `EditorShell.vue:18` (the unfilled slot). **Zero mounts.**

**Consumption consequence.** CubeScene imports four symbols from the glass-ui root barrel (`CubeScene.vue:33-38`): `Popover`, `PopoverContent`, `PopoverTrigger`, `Button`. **Three of the four are unreachable.** The component's *live* glass-ui surface is exactly one component (`Button`, in `ribbonContent`). Dead alongside them: `ppmycotaOpen` (`:99`), `autoDismissTimer` (`:100`), `clearAutoDismiss` (`:102-107`), the 4 s auto-dismiss `watch` (`:109-114`), and `setPPMode` (`:85-87`) — ~47 lines.

The same protocol carries a second corpse: `App.vue:53-59` still forwards `#tabs-trigger` to `sceneRef?.tabsTrigger`, a member `SceneExposedApi` does not declare (`sceneExposedApi.ts:16-34`) and no scene exposes — CubeScene's own header comment records its deletion at `:146-156`. So the render-fn slot protocol has a dead *producer* (headerLeft) and a dead *consumer* (tabs-trigger) at the same seam.

**Falsifier.** An `#header-left` template fill anywhere in the app graph — including a lazily-rendered branch — kills the claim. `EditorHeader.vue:8` has a `<slot name="left">`, but `EditorShell.vue:18` is what forwards into it, and App never reaches it.

### C-3 · glass-ui `Button` API drift — `variant:"outline"` is not a 7.0.0 prop

`CubeScene.vue:187` and `:192`:
```js
h(Button, { size: "sm", variant: "outline", class: "…", onClick: … })
```

Installed glass-ui 7.0.0 `ButtonProps` (`node_modules/@mkbabb/glass-ui/dist/components/button/Button.vue.d.ts:6-19`):
```ts
export interface ButtonProps extends PrimitiveProps {
    emphasis?: ButtonEmphasis;   // "primary" | "secondary" | "quiet" | "text"
    tone?: Tone;
    size?: ButtonSize;           // "xs" | "sm" | "md" | "lg"
    iconOnly?: boolean;
    loading?: boolean;
    type?: …; disabled?: …; class?: …;
}
```
No `variant`. `PrimitiveProps` (reka) contributes only `as` / `asChild`. Probe across the whole shipped bundle: `for f in dist/*.js; do grep -c '"outline"' $f; done` → **0 in every chunk**. The string does not exist in the design system.

`size:"sm"` is valid and applies. `variant:"outline"` falls through as a raw DOM attribute (`variant="outline"` on the `<button>`), so the two ribbon buttons render at glass-ui's **default emphasis** — which the compiled defaults block (`Button.vue.d.ts:24-31`) resolves to `emphasis: "primary"`. The author asked for a de-emphasised outline and got the loudest treatment in the system.

This is precisely the drift lane-frontend **F-1** predicted: glass-ui is absent from `package.json` AND `package-lock.json` while 7.0.0 sits in `node_modules`, so there is no floor, no ceiling, and no lock to catch an API rename. It is the same prose-vs-tree gap lane-frontend logged as **S-2**, now with a second instance.

**Systemic scope (measured).** `grep -rn 'variant:' demo/` filtered to `Button` sites → exactly four: `CubeScene.vue:187,192` and `SpringScene.vue:143,166`. Every other Button consumer in the demo — 20+ sites — already uses the correct `emphasis` axis (`RibbonBar.vue:18,26,38,46,74,82,90,98`; `TransportDock.vue:62,194`; `EditorShell.vue:33`; `KeyframeTimeline.vue:15,31,47`; `SharePopover.vue:24,33`; `SequenceTarget.vue:30`; `StartingStyleTarget.vue:41`; `ChannelControls.vue:164`; `TimingFunctionPanel.vue:16`). **The four stragglers are exactly the four render-function (`h()`) call sites** — the idiom that escapes both the SFC template compiler and every reader's eye.

**Falsifier.** A `variant` → `emphasis` compat alias inside glass-ui's Button implementation (via `useAttrs`, a props-normalising wrapper, or a legacy shim). Probe run: zero `"outline"` literals anywhere in `dist/`; `ButtonProps` has no `variant` key; the compiled defaults enumerate `size/as/tone/loading/emphasis/iconOnly` only.

### C-4 · the ribbon extras re-implement `RIBBON_BUTTON_CLASS` and diverge on four axes

`CubeScene.vue:188` and `:193` carry the same 7-utility literal, duplicated verbatim:
```
"h-8 gap-1.5 cursor-pointer text-small font-medium px-3 rounded-lg btn-interactive"
```
The strip they mount into defines its own canonical class — `RibbonBar.vue:135`:
```js
const RIBBON_BUTTON_CLASS = "h-8 gap-1.5 text-body rounded-full btn-interactive";
```

Divergences: **`rounded-lg` vs `rounded-full`** (rounded rectangle vs pill — a different button *shape language*), **`text-small` vs `text-body`** (different type rung), plus `font-medium`, `px-3` and `cursor-pointer` overrides that re-specify geometry `size="sm"` already owns. That is the `feedback_root_styling` law inverted: styling at the instance instead of the root.

**Precision (this is where I narrow my own claim).** `RibbonBar.vue:106-114` puts the `#ribbon-content` slot in a `v-else-if` **sibling** branch to the keyframes/timeline button rows — so the cube's two buttons never sit *literally beside* the eight pills in the same DOM row. They occupy the **same strip position**, inside the same `<Card><CardContent>` and the same `flex items-center justify-center gap-2 flex-wrap` container class, one tab-switch apart. The defect is a within-strip inconsistency **across tab states**, not a same-row mismatch. It is still MAJOR: switching to Matrix Controls swaps the ribbon's entire button language.

`RIBBON_BUTTON_CLASS` is a module-local `const`, never exported — so even a well-intentioned consumer *cannot* reuse it. The seam has no shared token, which is why it drifted.

**Falsifier.** If `rounded-lg` and `rounded-full` resolve to the same computed radius on an `h-8` element under the project's Tailwind config, or if `.btn-interactive` overrides both, the shape half of the claim dies (the type/emphasis halves survive independently). **UNPROVEN-NEEDS-LIVE** for the rendered pixel delta; the class divergence itself is source-certain.

### C-5 · `isPlaying` is a write-never ref, exposed outside the typed contract

`CubeScene.vue:65` `const isPlaying = ref(false)`, exposed at `:250`. **It is never assigned anywhere.** Probe: `grep -rn "isPlaying" demo/scenes/cube/` → the declaration (`CubeScene.vue:65`), three reads (`CubeScene.vue:17,78`; `CubeTarget.vue:14,20,118`). No write, in the cube subtree or outside it.

`SceneExposedApi` (`sceneExposedApi.ts:16-34`) does not declare `isPlaying` at all. The shell's play handler dispatches to the machine and writes **nothing** back to `sceneRef`:
```
useSceneMachineShellBinding.ts:246-259   onPlayStateChange → machine.dispatch({type:"PLAY"|"PAUSE"})
useSceneMachineShellBinding.ts:261-267   onStartStateChange → sceneRef.value.isStarted = started   ← the ONE write-back
```
So `isStarted` is genuinely wired (through Vue's `proxyRefs` set-trap on the exposed proxy); `isPlaying` is not.

**Three consumers dead-end on it:**

1. **A documented perf contract that cannot fire.** `CubeTarget.vue:20` binds `{ playing: isPlaying }`; the class's sole consumer is `CubeTarget.css:58-61`:
   ```css
   .idle-hover.playing .cube,
   .graph:hover .cube { will-change: transform; }
   ```
   The G5 comment above it (`CubeTarget.css:52-57`) states the intent: promote to a compositor layer "ONLY while it is moving — **playing** or hovered". The *playing* half never triggers; only the `:hover` branch survives. The cube animates through matrix/rotation/hover channels with no transient `will-change`.
2. `CubeTarget.vue:14` `:apply-transform-to-container="props.isPlaying || props.isStarted"` degenerates to `isStarted` alone.
3. **A dead parameter feeding it.** `useTransformState(isPlaying, isStarted, …)` — `useTransformState.ts:22` names the first parameter `isGroupPlaying`, and the function body **never references it** (the only gate read is `isGroupStarted.value` at `:200`). A write-never ref passed into an unread parameter.

**Explicit contradiction of in-tree prose (per L-18 / lane law).** `SquareScene.vue:105-107` asserts: *"`isPlaying` is the WRITABLE ref the App toggles (the cube/amiga group-scene contract)"*, and `SquareScene.vue:318-323` documents that entry **inside** `defineExpose` — where the entry itself is absent. `AmigaScene.vue:236-241` exposes only `{ facility, superKey }`. **The "cube/amiga contract" this prose cites does not exist in the tree, in any of the three scenes that cite it.**

**Falsifier.** Any assignment to `isPlaying`, `sceneRef.value.isPlaying`, or a `v-model:is-playing` binding on a scene component. None exist.

### C-6 · the matrix-cell bounds contract is inert — **new shadow S-9**

`MatrixEditor.vue:34-36` binds numeric bounds onto a glass-ui `Input`:
```html
:start="matrixCellMeta[i].sliderOptions.bounds[0]"
:end="matrixCellMeta[i].sliderOptions.bounds[1]"
:step="matrixCellMeta[i].sliderOptions.step"
```
`InputProps` (`dist/components/input/types.d.ts:3-23`) declares 21 members — `autocomplete, class, defaultValue, disabled, enterkeyhint, form, inputmode, invalid, maxlength, minlength, modelValue, name, pattern, placeholder, readonly, required, size, type`. **No `start`, no `end`, no `step`.** Default `type` is `"text"` (`Input.vue.d.ts:11`). Probe on the compiled component: `grep -o "start\|\"end\"\|step" dist/Input-DY7soIPd.js` → **no output**; there is no attrs-based handler either.

So the three bindings fall through as raw attributes on a **text** `<input>`: `step` is meaningless off `type="number"|"range"`, and `start`/`end` are not HTML input attributes at all. The 16 matrix cells accept arbitrary text with **no bounds and no step**, while their governing metadata (`transformMath.getSliderOptionsFromIx`) is computed per-cell and then discarded. Only the sibling `Slider` (`MatrixEditor.vue:75-89`) actually honours `min`/`max`/`step`.

**Shadow registration — S-9 (extends lane-frontend §5's S-1..S-8).** glass-ui 7.0.0 ships `dist/components/number-field/` — a bounded numeric control — and the demo reaches **zero** of it (lane-frontend §3.1 lists `/number-field` among the 52 unconsumed subpaths of 73). MatrixEditor's cell is a bounded numeric field hand-built from a text `Input`. Verdict: **evaluate**, not mechanical swap — the cell doubles as a click-target for `selectedMatrixCell` (`:37-39`) and carries a bespoke display format (`:28-33`), both of which must survive.

**Falsifier.** A glass-ui `Input` implementation that reads `start`/`end`/`step` off `useAttrs()` and applies them (kills the inertness claim), or a demo-side `input[type=text]` polyfill intercepting them. Neither exists — the compiled chunk has zero occurrences.

### C-7 · every matrix edit spawns an unowned, undisposed animation; concurrent edits contend

`useTransformState.ts:87-93` — one animation per emitted value, handle discarded:
```js
void new NumericAnimation([{ value: from }, { value: toNum }], { duration: 300 })
    .play(({ value }) => { matrix3dEnd.value = withMatrixCell(matrix3dEnd.value, ix, value); … });
```
`:105-126` does the same for the 500 ms reset. The module has **no `onScopeDispose`** and retains no handle — nothing can stop either loop.

Two distinct problems:

**(a) Contention (MAJOR).** `updateMatrixCell` is the handler for BOTH the per-cell `Input` (`MatrixEditor.vue:33`) and the `Slider` (`:67-74`). Each emitted value launches a fresh 300 ms interpolation whose `from` is snapshotted at launch (`:80 matrixValues(matrix3dEnd.value)[ix]`). Drag the slider and N overlapping animations write the same `matrix3dEnd` cell every frame, each pulling toward a different target from a different stale origin — last-writer-per-frame wins. Compounding it, the `Input`'s displayed text is *derived from* `matrix3dEnd` (`MatrixEditor.vue:28-33`), so the field a user is typing into is rewritten by the animation their previous keystroke started. `parseFloat("0.")` → `0` (`useTransformState.ts:79`), so an intermediate keystroke actively animates the cell to zero.

**(b) Orphan loops on unmount (MINOR half).** `CubeScene.vue:214-226` stops only `animationGroup.value` (`:216`). The `NumericAnimation` loops survive and keep writing `matrix3dEnd` and — via `transformTargetsStyle({transform: …}, [targetRef.value])` at `useTransformState.ts:122-124` — painting a **detached** element. Same shape for `changeGraphPerspectiveAnim`: constructed at `useCubeDemo.ts:130-152`, played at `:168`, returned at `:188`, and **not destructured by CubeScene** (`:80-83` takes only `animationGroup, setTargets`) — so nothing stops it either. `useSceneVisibilityPause` (`useCubeDemo.ts:177-181`) covers the group only.

The leak window is *bounded* (300 / 500 / 650 ms), which is why (b) is the minor half — I am not claiming an unbounded leak.

**Falsifier.** If `NumericAnimation.play()` internally cancels a prior in-flight animation targeting the same key, or if the engine's rAF self-terminates on target detach, (a) and (b) respectively die. Neither behaviour is visible at the consumption seam — the caller discards the handle, which is the defect regardless.

**UNPROVEN-NEEDS-LIVE:** the exact typing symptom (field text overwritten mid-entry). The mechanism is source-certain; the perceptual severity is not.

---

## 3. MINOR

### C-8 · the `SceneFacet` metadata CubeScene supplies is dead

`CubeScene.vue:228-238`:
```js
channelFacets: { [CUBE_ANIMATION_NAMES.Matrix]: [
    { surface: "matrix-controls", label: "Matrix Controls", icon: "Grid3X3" },
]}
```
`state/controlSurfaces.ts:155-159` already single-sources it:
```js
"matrix-controls": { value: "matrix-controls", label: "Matrix Controls", icon: "Grid3X3" },
```
Byte-identical label and icon.

Only `surface` is ever read. `controlSurfaces.ts:72-73` narrows the channel-facet type to `readonly { surface: ControlSurface }[]`; `:113` does `.map((f) => f.surface)`; every tab's `{label, icon}` resolves through `extraTabsFrom` → `SURFACE_META` (`:190-195`), which the dock consumes at `ChromeDock.vue:292,299,313-314`. Probe: `grep -rnE "f\.(label|icon)|facet\.(label|icon)|facets?\.(label|icon)" demo/` → **no output**. `SceneFacet.label` and `.icon` (`scene-facility/index.ts:52-53`) have zero readers repo-wide.

The registry's own docblock condemns exactly this: *"the surface→{label,icon} map existed **THREE times**"* (`controlSurfaces.ts:123-124`). CubeScene re-introduces copy #2.

**Falsifier.** Any consumer reading a facet's `label` or `icon`, or a future `SceneFacility` renderer that prefers facet-local metadata over `SURFACE_META`.

### C-9 · the store under-types the cube's own extension — and no `.vue` is ever type-checked

`state/controlOptionsStore.ts:26` — the shared contract:
```ts
matrixOptions?: { fixed: boolean };
```
The cube's actual shape has **two** fields. `MatrixEditor.vue:115-120` seeds `{ fixed: true, selectedMatrixCell: 0 }` and reads `.selectedMatrixCell` at `:24, :38, :64, :71, :77, :83, :88` — seven dereferences of an undeclared member off an optional. Under `strict` + `exactOptionalPropertyTypes` + `noUncheckedIndexedAccess` (all on, `tsconfig.json:7-9`) that is a hard error at each site.

Compounding the ownership smell: **CubeScene consumes a field it does not seed.** `CubeScene.vue:194` dereferences without a guard (`storedControls.matrixOptions.fixed = !storedControls.matrixOptions.fixed`) while `:197-198` guard with `?.` — inconsistent within one expression tree — and the seeding lives in a *different component* (`MatrixEditor.vue:120`).

**Why it never errors — the root enabler of C-3 and C-6.**
- `package.json` `check` = `tsc --noEmit`. Plain `tsc` cannot parse `.vue`; `demo/env.d.ts:3-6` types every `*.vue` as `DefineComponent<{}, {}, any>`, so SFC scripts and templates are invisible to it and every `.vue` import is `any`.
- `vue-tsc` is **not** a devDependency (probe: it appears only at `package-lock.json:3733` as a transitive peer range).
- CI never runs even the demo-inclusive `check`: `.github/workflows/ci.yml:41-42` runs `check:lib` (= `tsc -p tsconfig.lib.json`, which includes `src/` only), and the demo job (`:66-77`) runs `npm run gh-pages` (a vite/rolldown build — types stripped, not checked) plus a Playwright roster.

**No glass-ui, keyframes.js, or value.js prop contract inside any `.vue` file in this repo is enforced anywhere.** That is why `variant:"outline"` (C-3) and `:start/:end/:step` (C-6) shipped.

**Falsifier.** A `vue-tsc` invocation in any script, workflow, or pre-commit hook. `grep -rn "vue-tsc" package.json .github/ scripts/` → nothing but the transitive lock entry.

### C-10 · the gesture contract is duplicated verbatim across the parent/child seam

```
CubeScene.vue:10-13    class="grid h-full w-full max-w-full items-center justify-center justify-items-center overflow-visible"
                       style="touch-action: none; overscroll-behavior: contain"  @wheel.prevent
CubeTarget.vue:3-5     class="relative grid h-full w-full max-w-full items-center justify-center justify-items-center overflow-visible"
                       style="touch-action: none; overscroll-behavior: contain"  @wheel.prevent
```
The parent's wrapper is a near-clone of the child's root: identical inline style string, identical `@wheel.prevent`, and an 8-utility class list differing only by `relative`. Two nested non-passive wheel listeners fire per event; the inner already calls `preventDefault()`, so the outer is a guaranteed no-op. The scroll-suppression contract has two owners and one meaning.

The inline `style="…"` string also routes around the project's own token discipline — `styles/style.css:20-24` forbids raw `z-[N]` brackets and single-sources the z-scale from glass-ui precisely to keep geometry out of instance attributes.

**Falsifier.** If CubeScene's wrapper ever hosts a sibling *outside* `CubeTarget` that needs the same guard, the duplication becomes justified. Today it hosts exactly one child (`:15-22`).

### C-11 · `easeInBounce` survives the T.A3 "ONE settle-motion language" edict — at the site the ribbon Reset drives

`useCubeDemo.ts:124-129` is unambiguous, and scene-scoped:

> *"T.A3 — ONE settle-motion language. The former **`easeInBounce`** intro jittered BACKWARDS at the start (a bounce-IN) … **the scene's one settle easing is `ease-out-back`** (~650ms) — the same landing the roll egg wears."*

Two of the three settle motions obey — `useCubeDemo.ts:132` (`timingFunction: "ease-out-back"`) and `CubeTarget.vue:210` (the roll egg, `"ease-out-back"`). The third does not:

```
useTransformState.ts:1     import { easeInBounce } from "@mkbabb/value.js/easing";
useTransformState.ts:105-107   new NumericAnimation(…, { duration: 500, timingFunction: easeInBounce })
useTransformState.ts:177-182   resetMatrix → animateUpdateMatrix(…)
CubeScene.vue:186-190          the ribbon "Reset" Button → onClick: () => resetMatrix()
```

The named-and-condemned easing is the one the user's Reset button plays, driven from CubeScene's own ribbon.

A second-order consumption split rides along: the two compliant sites pass the easing as a **kf registry string** (`"ease-out-back"`, resolved inside the engine); the offender passes a **value.js function reference**, bypassing the registry. Same concept, two consumption idioms, and the function form is the only reason `@mkbabb/value.js/easing` appears in the cube subtree at all.

**Falsifier.** If T.A3's "ONE settle-motion language" is scoped to the graph-perspective intro rather than the scene, this drops to INFO. The comment's own words — *"the scene's one settle easing"* — are scene-scoped, and it explicitly extends the rule to the roll egg in another file.

### C-12 · contract-shape lies at the expose seam, and one dead emit wire

**(a)** `sceneExposedApi.ts:25` types `tabsContent?: () => VNode`. `CubeScene.vue:170-181` returns `VNode | null`. The sibling member is typed correctly — `:26 ribbonContent?: (slotProps) => VNode | null` — so the omission is an oversight, not a convention. Harmless at runtime (`App.vue:62` renders `<component :is>` on a function; a `null` render is legal) but the declared protocol is wrong.

**(b)** `MatrixEditor.vue:108-111` declares `(e: "resetMatrix"): void`; `:136-138` defines the emitter; **nothing in its template calls it** (I read the template whole — `:1-94` has no reset control). CubeScene dutifully wires `onResetMatrix: resetMatrix` (`:178`) for an emit that can never fire. The live Reset is the ribbon button (`CubeScene.vue:186-190`) calling `resetMatrix()` directly. Three artefacts — the emit declaration, the emitter, and the prop wire — exist for a path with no trigger.

**Falsifier.** A `@click="resetMatrix"` (or `$emit('resetMatrix')`) anywhere in `MatrixEditor.vue`, or a parent other than CubeScene mounting it. It has exactly one consumer.

---

## 4. INFO

### C-13 · the persisted transform aliases the live `mat4`

`CubeScene.vue:219-225` persists on unmount:
```js
const t = transformSliderValues.value;
useCubeTransform().value = {
    rotate: { ...t.rotate }, translate: { ...t.translate }, scale: { ...t.scale },
    matrix: t.matrix,                    // ← by reference, while the other three are copied
};
```
The global store then holds the dying instance's `Float32Array`. Benign today because the next mount clones it (`useTransformState.ts:42 mat4.clone(initialTransform.matrix ?? mat4.create())`) and Vue unmounts the old keyed instance before mounting the new one — but the copy is asymmetric for no stated reason, and the seed path at `CubeScene.vue:78` reads `useCubeTransform().value` non-reactively at setup, so the two halves of the round-trip use different disciplines.

**Falsifier.** A remount ordering that mounts-before-unmounts (e.g. a `<Transition mode="out-in">` inserted at the scene host) would make the alias observable. `App.vue:73-101` uses a bare `<Suspense>` with no wrapping `<Transition>` — deliberately, per its own comment (`:75-83`).

### C-14 · on HOME the component keys a store bucket the shell does not use

`CubeScene.vue:60,62` unconditionally key on `SCENE_ID = CUBE_SCENE_ID = "cube"` (`cubeKeys.ts:7`). But App renders the *same component* as the home backdrop (`App.vue:283-296`), where `currentSuperKey` is `HOME_SCENE_ID = "home"` (`scenes.ts:130-136`). So on home:

- CubeScene's `storedControls` (`selectedControl`, `selectedAnimation`, `ppMode`, `matrixOptions`) → the **`cube`** bucket;
- `MbabbMenu :super-key="currentSuperKey"` (`App.vue:22`), `App.vue:229 storedControls`, and the dock projections → the **`home`** bucket.

Two buckets for one mounted component, and the ppMode toggle (C-1) would — if it worked — write the bucket CubeScene is not reading. `bindSceneAdapter` returns early for home (`useSceneMachineShellBinding.ts:74-79`), so nothing reconciles them.

Practically inert today because home shows no controls and `hideLoader` short-circuits the one home-visible read (`CubeScene.vue:20`). Recorded because it is the seam C-1's cure would land on.

**Falsifier.** A shell path that writes the `cube` bucket while on home, or a home-visible control surface.

---

## 5. Superlatives (L-18 runs both ways)

### L-1 · the heavy/light engine boundary is honored exactly — and here it actually matters

CubeScene is **the only scene App.vue imports statically** — `App.vue:155 import CubeScene from "../scenes/cube/CubeScene.vue"`, against `lazyScene(…)` for all six siblings (`scenes.ts:136-183`). Its entire subtree therefore lands in the eager boot chunk. That makes it the single component where a careless heavy import would drag value.js's grammar onto first paint.

It does not happen. The whole subtree reaches the HEAVY surface only through the sanctioned accessors:
- `useCubeDemo.ts:50` — `const { CSSKeyframesAnimation, AnimationGroup, presets } = kfEngine();`
- `useTransformState.ts:31` — `const { transformTargetsStyle } = kfEngine();`
- `CubeTarget.vue:110,198` — `loadAnimationEngine()`, awaited inside the roll handler
- `CubeTarget.vue:109` — `import type { CSSKeyframesAnimation }` (type-only, erased)

The one static kf value import, `NumericAnimation` (`useTransformState.ts:2`), is **on the LIGHT barrel by design** — `src/animation/index.ts:29 export { NumericAnimation } from "./physics/numeric";`, and `:6-7` names it explicitly as light surface. So the component keeps the value.js-bearing chunk behind the dynamic boundary while never threading `async` through the scene-machine reconcile — exactly the dogfood the `@kf-engine` docblock (`demo/kf-engine.ts:1-26`) argues for.

**Falsifier.** Any static `import { CSSKeyframesAnimation | AnimationGroup | presets | transformTargetsStyle } from "@mkbabb/keyframes.js"` under `demo/scenes/cube/`. Probe: the only barrel value imports in the subtree are `NumericAnimation` (light) and `loadAnimationEngine` (the accessor itself).

### L-2 · zero R1 exposure — provable at the chunk level, not incidental

The R1 class is value.js's live `parseCssColor("oklch()")` shipping crash. The cube subtree's **complete** value.js edge set (probe: `grep -rn 'from "@mkbabb/value.js' demo/scenes/cube/ demo/composables/scene-facility/`):

| site | subpath | kind |
|---|---|---|
| `orbital-drag/OrbitalDrag.vue:12` | `/math` (`clamp`) | value |
| `orbital-drag/quaternionEuler.ts:1` | `/math` (`clamp`) | value |
| `useCubeRelit.ts:4` | `/math` (`clamp`) | value |
| `useTransformState.ts:1` | `/easing` (`easeInBounce`) | value |
| `useCubeDemo.ts:8` | `/value` (`CssCall, CssList, CssScalar, CssValue`) | **type-only** |
| `matrix-editor/transformMath.ts:1` | `/value` (`CssCall, CssScalar, CssValue`) | **type-only** |

**Zero `/css`. Zero `/color`.** Those are the two grammar-bearing subpaths, and they are the only ones that can reach `parseCssColor`.

Chunk-level confirmation on the installed 4.0.0 (`node_modules/@mkbabb/value.js/dist/`):
- `subpaths/math.js` — 1 110 B, **zero imports**, zero `oklch`. This is why the kf boundary gate whitelists it by name (`scripts/gates/surface/consume-bundle.mjs:52-56`, "the W97 verified-clean `@mkbabb/value.js/math` subpath").
- `subpaths/easing.js` — 4 779 B, imports **only** `../result-CZJK1CwL.js` (100 B), zero `oklch`.
- By contrast `subpaths/css.js` is 41 619 B and carries 4 `oklch` occurrences; `anchors-*.js` 5; `operations-*.js` 6. None are reachable from the cube's six edges.

**The transitive path through the engine is clean too:** `grep -rn "parseCssColor" /Users/mkbabb/Programming/keyframes.js/src/` → **no output**. keyframes.js's library source never calls it, so the cube's `transform`-only keyframes (`useCubeDemo.ts:57-152`, `CubeTarget.vue:211-216`) cannot reach it by compilation either.

The demo's single R1 surface is a different scene: `demo/scenes/square/useSquareTumble.ts:2` — the exact site lane-library flagged at its line 243 ("*the known R1 crash surface*"). **CubeScene is clean; SquareScene is the one to gate.**

**Falsifier / residual.** kf's compile path *does* import `@mkbabb/value.js/css` (`src/animation/compile/…`, and `/color` at `interp-slot.ts:7`, `emit/entry.ts:38`, `emit/backward-color.ts:32`). I did **not** trace whether value.js's `parseCssValue`/`parseCssScalar` internally dispatch into the colour grammar for a non-colour declaration. If they do, a transitive path re-opens for any scene whose keyframes are compiled from strings — which for the cube is only `presets.hover` (`presets/classic-data.ts:416-425`, `transform: translateY()` only) and the roll's `fromKeyframes` (`CubeTarget.vue:211-216`, rotate only). **Marked UNPROVEN-not-traced**; the direct-edge claim stands unconditionally.

### L-3 · the glass boundary is import-clean; exactly one shadow in the whole subtree

- **Zero direct `reka-ui` imports.** `CubeScene.vue:43` mentions reka, but it is a comment — precisely the finding lane-frontend recorded at §3.4 (which cites this very line). Reka is reached only transitively through glass-ui's `Popover`. Correct topology.
- **Zero local `ui/` copies, zero `cn()`, zero cva** anywhere in the subtree — matching lane-frontend **F-6**, and a genuine contrast with value.js's own ~178-file shadcn vendoring.
- **MatrixEditor is ~100% glass primitives.** `MatrixEditor.vue:97-98` draws `Slider`, `Card`, `CardContent` from the root barrel and `Input` from `/forms`; its only bespoke CSS is four 3-line axis-colour classes (`:141-158`) mapping to `--axis-x/y/z/w` tokens. For a 158-line matrix editor with 16 live cells, that is a low bespoke fraction.
- The **only** bespoke-vs-glass shadow in the subtree is the numeric cell (**C-6 / S-9**) — and even that is a *misused* glass primitive, not a hand-rolled replacement.

**Falsifier.** A `from "reka-ui"` import or a local primitive copy under `demo/scenes/cube/`. Neither exists.

### L-4 · the T.B2 conditional-surface inversion is genuinely landed — prose and tree AGREE

`CubeScene.vue:39-48` and `:146-169` narrate a large migration: the reka `<Tabs>` root died, the scene-injected `<TabsTrigger>`/`<TabsContent>` became orphans, the `matrix-controls` tab now rides `<SegmentedTabs>` **as data**, and the body is a plain gated `[role=tabpanel]`.

The tree bears this out end to end:
- `CubeScene.vue:228-238` supplies `matrix-controls` as a **channel facet**, not a rendered trigger;
- `controlSurfaces.ts:111-113` gates it on *"which channel is selected"* (`selected?.facets ?? []`), so the old `CONDITIONAL_SURFACES` + `activeControlConditionals` threading really is gone — `grep -rn "CONDITIONAL_SURFACES\|activeControlConditionals" demo/` returns nothing;
- `CubeScene.vue:170-181` renders a plain `h("div", { role: "tabpanel", "data-state": "active" })` with no reka import in sight;
- the reka `<Tabs>` import is genuinely deleted — `grep -rn 'from "reka-ui"' demo/` → zero.

This matters because lane-frontend **S-2** found the opposite elsewhere: `ChannelControls.vue:86` and `useTabStripScroll.ts:23` still describe `<SegmentedTabs>` as owning a strip the tree has replaced. **At CubeScene's seam the prose and the tree agree.** Where they diverge (C-5's "cube/amiga contract"), I have said so explicitly.

**Falsifier.** Any surviving reka `Tabs`/`TabsTrigger`/`TabsContent` usage reachable from the cube's control surface, or a second reader of `CONDITIONAL_SURFACES`.

---

## 6. Falsified hypotheses (recorded, not charged)

Two defects I formed from the source and then **killed with the tree**. They are logged so the next auditor does not re-file them.

**H-1 (killed) — "clicking the ribbon Fixed/Free button can throw when `matrixOptions` is undefined."**
`CubeScene.vue:194` dereferences `storedControls.matrixOptions.fixed` with no guard, and `matrixOptions` is seeded in a *different* component (`MatrixEditor.vue:120`). I hypothesised a render-order window where the ribbon mounts without the editor.
**Killed by:** `RibbonBar.vue:106-114` gates the `#ribbon-content` slot on `storedControls.selectedControl !== 'controls'` and passes `:selected-control="storedControls.selectedControl"` — the **raw store value**, the same authority `CubeScene.vue:171`'s `tabsContent` reads, from the same per-superKey bucket. Meanwhile `ControlsPaneWrapper.vue:49` keeps `ChannelControls` (and thus the `#tabs-content` chain) mounted via `v-show`, not `v-if`. The editor is therefore mounted whenever the ribbon extras render, so `matrixOptions` is always seeded first. The **typing** defect (C-9) survives; the **crash** does not.

**H-2 (killed) — "the static `@mkbabb/value.js/easing` import drags grammar into the eager boot chunk."**
CubeScene is statically imported by App (L-1), and the kf boundary gate whitelists only `/math` (`consume-bundle.mjs:52-56`), so `/easing` looked like a leak.
**Killed by:** `dist/subpaths/easing.js` is 4 779 B and imports only the 100-byte `result-CZJK1CwL.js`; zero `oklch`, zero grammar, zero `parse-that`. The gate's whitelist is scoped to the **library's** LIGHT barrel, not the demo, and `/easing` is a clean leaf regardless. The `easeInBounce` finding survives on **motion-language** grounds only (C-11), not bundle grounds.

---

## 7. Recommended order for the repair wave

1. **C-9 first.** Nothing below is *enforceable* until `.vue` is type-checked. Add `vue-tsc` and run it in CI. It statically catches C-3 and C-6 the moment it lands, and would have caught both before they shipped. (Note lane-frontend **F-1**: glass-ui is undeclared and unlocked, so `npm ci` cannot currently reconstruct the tree — F-1 gates this step, exactly as lane-frontend §10 sequenced it.)
2. **C-1** — pick the surviving `ppMode` writer. Fix `MbabbMenu.vue:100` (`stored.value.ppMode` → `stored.ppMode`) and decide C-2's fate; today neither writer works.
3. **C-2** — either fill `#header-left` in `App.vue` or delete `headerLeft` + the three dead glass-ui imports + the auto-dismiss machinery (~47 lines). Sweep the dead `#tabs-trigger` forwarding at `App.vue:53-59` in the same pass.
4. **C-3 + C-4** together — `variant:"outline"` → `emphasis:"secondary"`, and export `RIBBON_BUTTON_CLASS` from `RibbonBar.vue` so the extras cannot drift again. `SpringScene.vue:143,166` carries the identical drift; fix both `h()` sites in one commit.
5. **C-5** — delete `isPlaying` from `CubeScene.vue:65,250`, delete the dead `isGroupPlaying` parameter (`useTransformState.ts:22`), and either wire the `.playing` class off the facility (`facility.isPlaying()`, `scene-facility/index.ts:70`) or drop the dead `will-change` branch. Correct the false "cube/amiga contract" prose in `SquareScene.vue:105-107,318-323`.
6. **C-7** — retain and stop the `NumericAnimation` handles; add `onScopeDispose` to `useTransformState`; destructure and stop `changeGraphPerspectiveAnim`.
7. **C-6 / S-9** — evaluate `/number-field` for the matrix cell. Same wave as lane-frontend's S-3/S-4 timeline work, since both are "the demo hand-rolls a shipped primitive".
8. **C-8, C-11, C-12, C-10** — one cleanup commit each; all are single-hunk.

---

## Provenance note

Every glass-ui claim is sourced from `/Users/mkbabb/Programming/keyframes.js/node_modules/@mkbabb/glass-ui/dist/` (7.0.0, the copy the target already has on disk — no upgrade is required for any repair above). Every value.js claim is sourced from `/Users/mkbabb/Programming/keyframes.js/node_modules/@mkbabb/value.js/dist/` (4.0.0). `/Users/mkbabb/Programming/keyframes.js` was read only. No file in keyframes.js, glass-ui, or value.js was written, mutated, or executed; no install, no build, no dev server, no browser tooling. The sole write of this lane is this file.
