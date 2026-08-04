claude-opus-5[1m]

# CHALLENGE — `ChannelOptions.vue` · axis L (LIBRARY)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/transport/channel-controls/ChannelOptions.vue` (609 L)
**Date** 2026-08-04 · **Posture** assume-defective-until-proven · **Tooling** static/source only (no browser; livable-only claims marked `UNPROVEN-NEEDS-LIVE`)
**Read whole** the target + every file it imports, transitively where the claim needed it:

| read | why |
|---|---|
| `./TimingFunctionPanel.vue`, `./LayerConfigPanel.vue`, `@components/playback/PlaybackRibbon.vue` | child contracts |
| `./composables/{useTimingFunctionEditor,useAnimationSync,usePlaybackToggle}.ts`, `../composables/useDemoTicker.ts` | composable contracts |
| `@state/animationOptionsStore.ts`, `@state/storeUtils.ts` (`getAnimationSuperKey`) | the persisted-store contract |
| `@utils/reference-data/{animationDescriptions,easingGroups,timingCurveUtils}.ts` | data adapters |
| `src/animation/engine/{animation,option-setters,options}.ts`, `internal/{errors,animation-id}.ts`, `compile/easing/easing-option.ts`, `waapi/{eligibility,emission,waapi-options}.ts`, `constants/defaults.ts`, `load-engine.ts`, `demo/kf-engine.ts`, `demo/app/main.ts` | engine-consumption idioms |
| `value.js/src/easing.ts`, `src/value.ts` | the duplication + registry claims |
| `node_modules/@mkbabb/glass-ui@7.0.0` `dist/components/{labeled-field,select,card,dock}/**` + `dist/labeled-field.js` | the ACTUAL installed vendor contract |
| `ControlsPaneWrapper.vue`, `ChannelControls.vue`, `demo/state/controlSurfaces.ts`, `demo/scenes/{easing,cube,square,sequence}/*` | mount/lifecycle reachability |

**Hitherto corpus folded** — `formation/keyframes/lane-frontend.md` **F-1** (glass-ui phantom dep), its census row `| 609 | channel-controls/ChannelOptions.vue | G |` (:212), S-1…S-8 (no shadow-component overlap with this file — see §4); `lane-library.md` §4.6 demo parse-consumer row `animationDescriptions.ts:76 parseTimingFunction(value)` (:246). Contradictions to the lanes: none found; two extensions noted in §4.

**Tally: 20 defects (2 BLOCKER · 7 MAJOR · 8 MINOR · 3 INFO) · 5 superlatives.**

---

## 0. The one-paragraph verdict

The component is a **competently-wired reactivity bridge wrapped around three unsound seams**. The rAF/ticker discipline, the typed-error posture, and the "one persist seam" for the timing-function literal are genuinely exemplary (§3). But (a) the SAME persist discipline is *absent* on duration/delay, and the store it writes is a **constructor input** — so a mistyped duration bricks a scene at next boot (B1); (b) every glass-ui `LabeledInput`/`LabeledSelect` call site passes props the **installed 7.0.0 does not declare** — 5 tooltips, 2 description sets, and the entire select mutex are dead (M1) — invisible because **the demo is typechecked by nothing** (M6); and (c) the timing-function seam hand-rolls `{ fn }` instead of calling the engine's own `setTimingFunction`, stripping the CSS twin that the engine's WAAPI eligibility gate requires (M3) — in a repo whose *own easing scene* uses the correct idiom 12 files away.

---

## 1. BLOCKERS

### B1 — the store records what the engine REJECTED, and that store is a constructor input · BLOCKER

**Provenance** `ChannelOptions.vue:33-41` (duration), `:52-60` (delay), `:80-88` (iterations) — each handler is:

```
trySetOption(() => animation.setDuration(v));
storedAnimationOptions.animationOptions.duration = v;   // ← unconditional
```

`trySetOption` (`:469-476`) swallows `AnimationOptionError`; the store write on the next line runs **regardless**. `storedAnimationOptions` is `getStoredAnimationOptions(props.animation)` (`:459`) → a `useStorage`-backed localStorage bucket (`animationOptionsStore.ts:67-74, 117-122`).

That same bucket is a **constructor argument**:

- `demo/scenes/cube/useCubeDemo.ts:52-63` — `new CSSKeyframesAnimation(matrixAnimationOptions.animationOptions).fromVars(...)`
- ditto `:73-99` (rotation), `:103-111` (`presets.hover(hoverAnimationOptions.animationOptions)`)

Key identity is the same bucket, verified end-to-end: `getStoredAnimationOptions(props.animation)` → `getAnimationSuperKey(undefined, animation)` = `animation.superKey` (`storeUtils.ts`) and `kfEngine().getAnimationId(animation)` = `animation.name` (`src/animation/internal/animation-id.ts:29-33`); cube writes `superKey = SCENE_ID` / `name = CUBE_ANIMATION_NAMES.Matrix` and reads with exactly `(CUBE_ANIMATION_NAMES.Matrix, SCENE_ID)`.

**Failure scenario (concrete).** Select the cube scene → Controls tab → select-all in `duration` and delete (or type `5x`). Per keystroke: `setDuration("")` → `normalizeDuration` (`engine/options.ts:88-104`) — `""` is **not** `null`, so it is *present-but-malformed* → `parseOption` throws `AnimationOptionError` → swallowed → **`stored.duration = ""` is persisted to localStorage**. Reload. `useCubeDemo` setup runs `new CSSKeyframesAnimation({ …, duration: "" })` → ctor `setOptions` → `applyDuration` → throws `AnimationOptionError` **outside any try**. The scene's setup dies. Nothing in the read path sanitizes: `getStoredAnimationOptions` only defaults when the bucket is *missing or empty* (`:108-115`); `checkAndResetExpiredStore`/`gcAndMigrateStoreBuckets` are TTL/keyspace concerns, not value validation. Recovery requires clearing localStorage.

**Why this is the sharpest finding.** The file's own docstring (`:461-468`) *names* the hazard — "User input mid-keystroke is routinely malformed" — and the neighbouring timing-function path was hardened for exactly this class (`useTimingFunctionEditor.ts:108-133`, I.W2.S3: "persist a COMPLETE re-parseable literal … so the value the construction path reads back is re-mountable"). The discipline was applied to one option and not to the other three.

**Falsifier.** (a) Show a validation/quarantine step between the persisted bucket and a constructor — I found none on either side; (b) show `normalizeDuration("")` returning `undefined` (it does not: only `== null` short-circuits, `:91`); (c) show the cube (or any) scene not reading the same bucket the panel writes — the key derivation above is exact. Any one kills this.

**Not claimed.** The `∞` glyph is *not* a poisoning vector — `normalizeIterationCount` explicitly accepts `"∞"` (`engine/options.ts:106-131`). See superlative S5.

### B2 — `@mkbabb/glass-ui` is a phantom dependency; this file has 4 subpath edges to it · BLOCKER (fold of lane-frontend **F-1**)

**Provenance** `ChannelOptions.vue:408-423` — four import sites: root barrel (`Card`, `CardContent`, `Select*`, `Separator`), `/dock` (`DockControl`), `/tooltip` (`Tooltip*`), `/labeled-field` (`LabeledSelect`, `LabeledInput`).

Re-verified against the tree (not re-derived — F-1 owns the finding): `package.json` `dependencies` = `{"@mkbabb/value.js":"4.0.0"}` only; `@mkbabb/glass-ui` appears in neither `dependencies` nor `devDependencies`; `node_modules/@mkbabb/glass-ui/package.json` → `7.0.0`, a real directory. `vite.config.ts:37-59` carries **no** glass-ui alias, so resolution is straight to that unlocked `node_modules` copy.

**Failure scenario.** `npm ci` on a clean runner → this component's four import specifiers are unresolvable → `vite build --mode gh-pages` fails at the first import. The working tree survives only on the residue of an install that predates the declaration's removal.

**Extension beyond F-1 (the version half).** The phantom-ness is not only *presence* but *pin*: this file's own comments cite **3.4.0** (`:143-146`) and **4.0.1** (in `TimingFunctionPanel.vue:25-31`) as the API it was authored against, while **7.0.0** is what resolves. M1 is the measured consequence of that unpinned drift.

**Falsifier.** Produce a lockfile/manifest entry, workspace link, or bundler alias for glass-ui. `grep -n "node_modules/@mkbabb" package-lock.json` → one hit, value.js (F-1's probe, re-run: unchanged).

---

## 2. MAJOR

### M1 — every labeled-field call site passes props glass-ui 7.0.0 does not declare · MAJOR

**Vendor ground truth** (`node_modules/@mkbabb/glass-ui/dist/components/labeled-field/types.d.ts` + the compiled `dist/labeled-field.js` runtime prop tables):

- `LabeledFieldCommonProps` = `label`, `description?`, `requirement?`, `layout?`, `errorLive?`
- `LabeledSelectProps` = the above + `modelValue`, `items`, **`open?`**, `placeholder?`, `invalid?`, `disabled?`, `required?`
- `LabeledInputProps` = `Omit<InputProps,"class">` + the common props
- Runtime greps over `dist/labeled-field.js`: `tooltip` → **0 hits**; `labelClass` → **0 hits**; `descriptions` → **0 hits**; the LabeledSelect prop table reads `open: { type: Boolean }`, no `isOpen`. No `inheritAttrs: false` anywhere in the module → undeclared bindings fall through as **DOM attributes on `div.labeled-field`**.

**The call sites** (all in ChannelOptions unless noted):

| binding | sites | vendor status | consequence |
|---|---|---|---|
| `tooltip="…"` | `:32, :51, :79, :101, :125` (+ `LayerConfigPanel.vue:14,21,31,52,63`) | undeclared | **5 field tooltips never render** (the correct 7.0.0 spelling is `description`) |
| `label-class="…"` | `:31, :50, :78, :100, :124` | undeclared | label typography falls back to the vendor default (`UNPROVEN-NEEDS-LIVE` for the visual delta) |
| `:is-open="isOpen('…')"` | `:96, :120` (+ `LayerConfigPanel.vue:10`) | prop is **`open`** | the select mutex never reaches the vendor |
| `:descriptions="…"` | `:98, :122` | undeclared | `DIRECTION_DESCRIPTIONS`/`FILL_MODE_DESCRIPTIONS` (`:445-449`) are **dead imports**; the per-option help text never renders |

The vendor *does* forward `open` (`labeled-field.js`, LabeledSelect setup: `open: e.open` onto the reka Select root), so the mutex fix is a one-word rename ×3 and `tooltip`→`description` ×10.

**Consequence — the dead mutex.** `openSelect` / `isOpen` / `setOpen` (`:488-493`) plus the two-function prop-drill into `LayerConfigPanel` (`:363-364`, typed `isOpen: (name:string)=>boolean; setOpen: (name:string,open:boolean)=>void` at `LayerConfigPanel.vue:84-85`) is ~15 lines of state machinery + a cross-component contract that provably does nothing. `@update:open` still fires (the emit *is* declared), so the ref updates — and nothing reads it except the dead prop. **Honest severity note:** reka's Select is modal, so the *user-visible* damage here is ~nil; the damage is a dead typed contract and dead prop-drilling. The tooltip/description losses are the user-visible half.

**The internal contradiction that makes this a defect and not a style choice.** 100 lines below, this same file hand-rolls a `Select` specifically to render `name + description` pairs per item (`:240-271`). The author knows option descriptions matter; the two `LabeledSelect`s silently lost theirs to vendor drift.

**Falsifier.** Any of: a `tooltip`/`labelClass`/`descriptions`/`isOpen` prop in the resolved glass-ui (greps above are over the *installed* 7.0.0 runtime, not the `.d.ts` alone); a bundler alias pointing glass-ui elsewhere (`vite.config.ts:37-59` — none); a global directive that reads a `tooltip` attribute (none found in `demo/app/main.ts`).

### M2 — a dead `:progress` prop forces a 60 fps re-render of every channel's detail panel · MAJOR

**Provenance** `ChannelOptions.vue:317` `:progress="normalizedProgress"` → `TimingFunctionPanel.vue:69` declares `progress?: number` and **never reads it** (whole-file read: `props.progress` appears in the `defineProps` and nowhere else; the vendor `EasingPicker` is mounted with `:playback="false"`, `:39`).

`normalizedProgress` (`:506-510`) depends on `currentT`, which the rAF ticker rewrites every frame while playing. A changed component prop forces a child re-render unconditionally in Vue 3 (`updateComponent` → `shouldUpdateComponent`(props changed) → `instance.update()`); usage inside the child is irrelevant.

**Failure scenario.** All channels are mounted simultaneously — `ControlsPaneWrapper.vue:45-49` `v-for … :key="host.animation.id"` with only `v-show` gating — and `isPlaying` is the *group's* flag, handed to every one. Play a multi-channel scene: for each channel, every frame, `currentT` → `normalizedProgress` → `TimingFunctionPanel` patch, including the always-mounted vendor `EasingPicker`. The panel is **never `v-if`'d**: `showDetailPanel` only toggles CSS (`grid-template-rows: 0fr`, `:552-566`), so the picker is instantiated for every channel of every scene and patched at frame rate even while collapsed and off-screen.

**The sharp corollary.** `currentT` / `isAnimPlaying` / `isAnimStarted` are otherwise read **only inside `<Teleport v-if="active">`** (`:377-401`). With `v-if` false that branch never touches them, so an inactive channel's render effect would not track them at all — **the dead `:progress` prop is the sole reason inactive channels re-render every frame.** Deleting one attribute removes the entire per-frame cost for every non-active channel.

**Falsifier.** Show `progress` consumed in `TimingFunctionPanel` (it is not), or show Vue skipping the child update on a changed prop (it does not), or show the panel mounted lazily (it is not — CSS collapse only). Frame-cost magnitude is `UNPROVEN-NEEDS-LIVE`; the *structure* is source-proved.

### M3 — the timing-function seam bypasses the engine setter and strips the CSS twin, killing WAAPI delegation · MAJOR (engine-consumption)

**Provenance** `useTimingFunctionEditor.ts:96-106`:

```
const easing = { fn: timingFunction };          // ← no `.css`
animation.options.timingFunction = easing;
animation.frames.forEach((frame) => { frame.timingFunction = easing; });
```

The engine's own path is `setTimingFunction` → `applyTimingFunction` → `normalizeTimingFunction` → `resolveEasingOption` (`src/animation/compile/easing/easing-option.ts:60-65`), which **attaches the faithful CSS twin**: `const css = cssTwinFor(input); return css ? { fn, css } : { fn };`.

`waapi/eligibility.ts:174-179` refuses delegation when `firstTF.css === undefined` — *"easing has no faithful CSS twin (would run bare linear on the compositor)"*. `useWAAPI` defaults **true** (`constants/defaults.ts:86`) and the demo never overrides it (`grep -rn "useWAAPI" demo/` → 0 hits), so the delegation path is live.

**Failure scenario.** `onMounted` (`:538-542`) runs this seam on **every** channel at mount, even when nothing changed — so a channel constructed with a twin-carrying easing (a keyword / `cubic-bezier()` literal) has it stripped the instant the Controls surface mounts. A multi-keyframe channel with unitless vars — e.g. the sequence rows, `useSequenceDemo.ts:134-136` (`--ball-p`, `opacity`, `scale`, no layout units) — is otherwise eligible (uniform easing ✓, the shared `{fn}` reference even satisfies the *uniformity* check at `eligibility.ts:138-146`) and is demoted to rAF purely by the missing `.css`.

**The internal contradiction.** `demo/scenes/easing/useEasingDemo.ts:305-312` does it correctly, with a comment saying so: `previewAnim.setTimingFunction(v)` — *"`setTimingFunction` normalizes the CSS twin."* Two idioms for one operation in one repo; the panel picked the one that defeats the engine's own fast path.

**Reachability caveat (stated because a false defect is worse than a missed one).** For *some* channels the demotion is inert on other grounds: the easing scene's preview uses `translateX(%)` and `%` is layout-tracking (`value.js/src/value.ts:25-36`), so it is ineligible regardless; the square scene uses a custom `transformFunc`, refused at `eligibility.ts:124-136`. The defect is therefore **perf-degrading, never wrong-pixel** (the rAF path is always correct) — that is why it is MAJOR, not BLOCKER.

**Falsifier.** Show `cssTwinFor` returning `undefined` for the catalogue's inputs (it returns the trimmed literal for CSS keywords and `cubic-bezier()`/`steps()` forms), or show every demo channel independently ineligible (two of five checked are; sequence is not), or produce a reason the panel *must* bypass `setTimingFunction`. **The one legitimate half:** `applyTimingFunction` does **not** propagate to already-compiled `frames[]` (contrast `applyColorSpace`/`applyHueMethod`, which call `renormalizeColors()` — `option-setters.ts:106-129`), so the per-frame write is a real engine gap the demo is papering over. The correct shape is `setTimingFunction(literal)` **plus** the frame propagation — not a hand-rolled `{fn}` instead of the setter. **This is an engine-side handoff candidate: `applyTimingFunction` should honour the live-options contract like its two colour siblings do.**

### M4 — mount-time clobber: the panel overwrites a scene's own easing authority · MAJOR

**Provenance** `ChannelOptions.vue:538-542` — `onMounted` unconditionally re-applies the *store's* timing function onto the live animation.

`ChannelControls.vue:97-115` mounts `ChannelOptions` under `v-if="… selectedControlSurface === 'controls'"`, so this fires on **every switch to the Controls tab**, not once per session.

**Failure scenario.** The easing scene's `previewAnim` owns its easing through `cssValue` (`useEasingDemo.ts:290-312`), and **nothing writes that curve back to the store** — verified: `grep -rn "animationOptions.timingFunction" demo/` returns writes at exactly one site, `useTimingFunctionEditor.ts:166`. The Easing channel carries a painting `animation` (`useEasingDemo.ts:351-354`), and any painting channel earns the built-in triad including `controls` (`demo/state/controlSurfaces.ts:51-55`). So: pick a curve in the easing sidebar → switch to Controls → the preview animation's easing silently reverts to the persisted panel value (default `ease-in-out` on a fresh store). Two authorities over one `animation.options.timingFunction`, no reconciliation.

**Falsifier.** Show the easing scene excluded from the `controls` surface (the derivation says otherwise), or a second writer syncing `cssValue` into the store (grep says none), or `onMounted` guarding on "store value differs from live" (it does not — it applies unconditionally).

### M5 — the pencil silently flattens non-bezier curves to linear, because a hand-copied table diverged from value.js · MAJOR

**Provenance** `ChannelOptions.vue:172-186` (pencil → `onEditIconClick`) → `useTimingFunctionEditor.ts:171-212` (`onEasingLabelClick`) → `NAMED_EASING_BEZIER[currentEasing]` (`animationDescriptions.ts:16-49`); miss → `controlPoints = [0, 0, 1, 1]` (`:203-205`) = **linear**.

`NAMED_EASING_BEZIER` is a hand-maintained duplicate of value.js's `PRESETS`/`bezierPresets` (`value.js/src/easing.ts:34-67`) — 29 rows, all numerically identical to the vendor's, **minus `smooth-step-3`** (vendor: `[0.65, 0, 0.35, 1]`).

**Failure scenario.** `smooth-step-3` is offered in the dropdown (`easingGroups.ts:60`). Select it → click the pencil → `timingFunctionKind("smooth-step-3")` resolves via the registry → not `steps`, not `cubic-bezier` → table miss → control points become `[0,0,1,1]` → `updateTimingFunctionFromName("cubic-bezier")` persists `cubic-bezier(0, 0, 1, 1)`. **The user's curve is now linear.** Same for `ease-in-bounce`, `step-start`, `step-end` (`easingGroups.ts:89, 95-96`).

And there is **no feedback**: `convertedFromName` — the ref whose docstring says *"the name of the easing we auto-converted FROM (for subtitle display)"* (`useTimingFunctionEditor.ts:34-35`) — is destructured at `ChannelOptions.vue:479` and **never referenced in the template** (whole-file read). The conversion notice was designed and then lost.

**The duplication is gratuitous:** the sibling `TimingFunctionPanel.vue:52` already imports `bezierPresets` from `@mkbabb/value.js/easing`. One import away, in a package the file's neighbour already consumes, sits the exact quad.

**Falsifier.** Show `smooth-step-3`/`ease-in-bounce` absent from the dropdown catalogue (they are present), or a `[0,0,1,1]` fallback that is *intended* to mean "no bezier equivalent" **and** surfaced to the user (`convertedFromName` is unrendered), or a numeric divergence between the two tables beyond the missing row (I diffed all 29: identical).

### M6 — nothing typechecks the demo; `vue-tsc` is not installed · MAJOR (repo-level; scoped here as M1's enabling condition)

**Provenance** `package.json` scripts: `check` = `tsc --noEmit && tsc --noEmit -p tsconfig.test.json`; `check:lib` = `tsc --noEmit -p tsconfig.lib.json`. `tsconfig.lib.json` = `{"include": ["src/"]}` — its own comment says *"a clean runner type-checks ONLY the publishable surface (`src/`) — never the demo."* CI (`.github/workflows/ci.yml:42`) and release (`release.yml:43`) run **only `check:lib`**. `ls node_modules/.bin | grep vue-tsc` → **empty**; `grep -rn "vue-tsc" .github/workflows/` → **empty**.

**Failure scenario.** Plain `tsc` cannot see SFC templates at all, and the whole-project `check` is not in CI anyway. So the ten dead vendor bindings of M1 — each of which is a template type error against the installed `.d.ts` — are structurally invisible, and the four `as any` casts (`:104, :106, :128, :130`) are unaudited. This is *why* B2's unpinned drift landed as silent feature loss rather than a red build.

**Falsifier.** Point at any gate that parses `demo/**/*.vue` for types. `demo:correctness` (`scripts/run-demo-roster.mjs`) is a runtime roster, not a typecheck; `test/demo/instrument/value4-editor-boundary.test.ts` exercises `timingFunctionKind` (`:73-86`) but mounts no component.

### M7 — async ceremony whose stated rationale is falsified by the component's own line 459 · MAJOR

**Provenance** `ChannelOptions.vue:531-547`:

```
// … they ride loadAnimationEngine() rather than a deep @src import. The
// select items populate within microtasks of mount … until then the
// dropdowns render empty — an honest pre-load frame.
const directions = ref<readonly AnimationOptions["direction"][]>([]);
const fillModes  = ref<readonly AnimationOptions["fillMode"][]>([]);
onMounted(async () => { … const engine = await loadAnimationEngine(); … });
```

**The falsification.** `demo/app/main.ts:50-52` awaits `warmKfEngine()` **before** `app.mount("#app")`, and `demo/kf-engine.ts` documents exactly this ("`main.ts` WARMS the engine before the app mounts … `kfEngine()` returns it synchronously"). Stronger still — this component **cannot run without the resolved engine**: `:459` `getStoredAnimationOptions(props.animation)` calls `kfEngine()` synchronously (`animationOptionsStore.ts:90`), which *throws* if the warm has not resolved. So by construction, at the moment `setup` reaches line 459 the engine is in hand, and `const { DIRECTIONS, FILL_MODES } = kfEngine()` at setup would populate both lists **before first paint**.

**Consequence.** Two `ref`s, an `async` lifecycle hook, and a guaranteed-empty first render of two dropdowns — all for state that is synchronously available. The "honest pre-load frame" is self-inflicted, and the rationale comment is now misinformation for the next reader.

**Falsifier.** Show a mount path that reaches `ChannelOptions` with `resolved === null` — it would have thrown at `:459` first. (The one real edge: `main.ts:50` swallows a warm rejection with `.catch(() => undefined)` and mounts anyway; in that world `:459` throws in `setup` and the panel dies — an error-posture gap, logged as **i3**, and not a rescue of the async ceremony.)

---

## 3. MINOR / INFO

- **m1 · MINOR — five duplicated inline handler bodies in the template.** `:33-41, :52-60, :80-88` are the identical `trySetOption(setter) ; store[key] = v` shape; `:102-108, :126-132` the identical `setter(v as any) ; store[key] = v as any`. Multi-statement logic inline in the template, repeated. A `bindOption(key, setter)` factory collapses ~40 template lines to 5 call sites and gives B1's fix **one** place to land. *Falsifier:* show the five bodies differing beyond the key + setter — they do not.
- **m2 · MINOR — double tooltip on the pencil.** `:172-186` `DockControl … title="Edit easing curve"` (a native `title`, since `title` is not a `DockControl` prop — `dist/components/dock/DockControl.vue.d.ts` — so it falls through to the `<button>`) nested inside `<Tooltip>` whose `<TooltipContent>` is the same string (`:188`). Two tooltips, one control. The sibling "Back" control (`:337-345`) carries `title` with no wrapper — inconsistent. *Falsifier:* show glass-ui suppressing the native `title` on a tooltip trigger.
- **m3 · MINOR — `useAnimationSync` returns its own input, renamed to imply derived state.** `useAnimationSync.ts:92` returns `isPlaying` — the very `Ref` passed in at `:32`; `ChannelOptions:501` aliases it to `isAnimPlaying` and forwards it to `PlaybackRibbon` as `:is-anim-playing`. The ribbon's play state is the *group's* intent, never the engine's. Also `isReversed` is polled and written every frame (`:50, :55`) and consumed by **no one** (grep: `useAnimationSync` has exactly one consumer, this file, which does not destructure it — the ribbon takes `userReversed` from `usePlaybackToggle` instead). *Falsifier:* find a second consumer, or a place `isAnimPlaying` diverges from `props.isPlaying`.
- **m4 · MINOR — iterations display is inconsistent for the omitted case.** `:63-76`: `'infinite'`/`Infinity` → `'∞'`, but `undefined` → the *string* `'infinite'`. Two spellings of one state in one field. *Falsifier:* show `iterationCount` unable to be `undefined` in the stored bag (`InputAnimationOptions` marks it optional and `??` is used, so the branch is authored-for).
- **m5 · MINOR — three docstring drifts, each now misinformation.** (i) `:461-468` claims *"an empty value is omission (no-op)"* — there is no empty-check; `""` throws inside `normalizeDuration` and is swallowed like any other malformed input (`engine/options.ts:91`). (ii) `useAnimationSync.ts:19` claims *"using vueuse's `useRafFn` pause/resume"* — it uses `useDemoTicker`/`RAFPlayback`. (iii) `useAnimationSync.ts:20-22, 84-91` claims a visibility-driven re-sync — `useDemoTicker` does stop/reconcile on visibility (`useDemoTicker.ts:34-35`), but a loop that has already idled (`tickerActive=false`) is **not** resumed by a visibility change, so the promised "resume once to re-sync" holds only while the loop is still armed. *Falsifier:* find the empty-check / the `useRafFn` call / a visibility watcher that sets `tickerActive = true`.
- **m6 · MINOR — a `<label>` bound to nothing.** `:151-161` renders `<label>easing</label>` with no `for` and no wrapped control (the actual control is the sibling `Select` at `:204`). It is a styling hook wearing form semantics. *(A-axis overlap; recorded here as a wrong-element/dead-semantics defect.)* *Falsifier:* show glass-ui's `SelectTrigger` picking up an ambient `<label>` — it cannot, there is no association.
- **m7 · MINOR — dead exports in the sole-consumer composable.** `useTimingFunctionEditor` has exactly one consumer (grep across `demo/`). Of its 10 returned members: `convertedFromName` destructured-never-rendered (M5), and **`easingItems`** (`:24-26` — a module-load-time `flatMap` over the whole catalogue) and **`activeCurvePath`** (`:66-81`) are consumed **nowhere in the repo**. `onEasingLabelClick` / `setAnimationTimingFunction` are exported but only used internally. *Falsifier:* find any consumer — `grep -rn "easingItems\|activeCurvePath" demo/` returns only the definition file. (Note: the SVG helpers themselves are *not* dead — `getCurvePath`/`generate*SVGPath` are live in `EasingTarget.vue:145,195` and `useEasingDemo.ts:109-113`; only this composable's wrapper is.)
- **m8 · MINOR — dead constants + bottom-of-file imports in a directly-imported module.** `animationDescriptions.ts:108-121`: `COLOR_SPACE_DESCRIPTIONS` and `HUE_METHOD_DESCRIPTIONS` are neither exported nor referenced anywhere (grep: declaration sites only). Same file puts its `import`s at `:128-129`, *after* every declaration — hoisting makes it work, and makes it unreadable. *Falsifier:* find a consumer or an `export` keyword.
- **i1 · INFO — `usePlaybackToggle` is 37 lines for two statements**, of which `toggleAnimation = () => emitTogglePlay()` (`:32-34`) is a pure passthrough the call site could emit directly. 20 of the 37 lines are a docstring about a SOLO path that was deleted.
- **i2 · INFO — an unguarded `String()` on the vendor's `AcceptableValue`.** `:212-217` `(key) => updateTimingFunctionFromName(String(key))`; glass-ui's `Select` re-emits reka's `AcceptableValue` (`dist/components/select/Select.vue.d.ts`). A `null`/`undefined` emission stringifies to `"null"`/`"undefined"` → `timingFunctionKind` → `undefined` → `updateTimingFunctionFromName` **throws a bare `TypeError`** from an event handler (`useTimingFunctionEditor.ts:141-145`). Rated INFO, not MAJOR, because reka's item-select path has no clear/deselect affordance here — I could not construct the emission, so the claim stays unreachable-by-inspection.
- **i3 · INFO — no boundary under a failed engine warm.** `main.ts:50` `warmKfEngine().catch(() => undefined)` mounts the app even when the heavy chunk fails; `ChannelOptions:459` then throws inside `setup` with no `errorCaptured` ancestor found on the path (`ControlsPaneWrapper` → `ChannelControls` → here). Degradation is total rather than partial.

---

## 4. Corpus reconciliation

- **F-1 (lane-frontend)** — **CONFIRMED and extended.** Confirmed on the tree (manifest + lockfile + install shape + no alias). Extended in two directions this component makes concrete: (i) the missing pin, not just the missing declaration, is what bites — the file was authored against 3.4.0/4.0.1 and resolves 7.0.0 (M1); (ii) the drift is silent because no gate typechecks SFCs (M6). Lane-frontend's remediation order ("**F-1 first** … nothing below is reproducible until this lands") is right, and M1 says the landing must be a *version-aware* pass over call sites, not just a manifest line.
- **S-1…S-8 (shadow census)** — **no overlap.** ChannelOptions renders no shadow component: `Card*`, `Select*`, `Separator`, `DockControl`, `Tooltip*`, `LabeledSelect`/`LabeledInput` are all vendor. Its host `ChannelControls.vue:74` renders `KfPillTabs` (**S-1**), so an S-1 landing changes this file's *parent*, not this file. Its `TimingFunctionPanel` already completed the analogous adoption (bespoke `EasingEditor` → vendor `EasingPicker`, `TimingFunctionPanel.vue:3-11`) — evidence the S-row programme works, and (M2) that adopting a vendor component makes lazy mounting *more* important, not less.
- **lane-library §4.6** — the demo parse-consumer row `animationDescriptions.ts:76 parseTimingFunction(value)` is exactly the seam this component gates its whole UI on (`timingFunctionKind` at `:206`, `useTimingFunctionEditor.ts:51-63, 140`). **Extension for the parser wave's blast radius:** a `parseTimingFunction` behaviour change does not merely mis-classify here — via `updateTimingFunctionFromName`'s `kind === undefined → throw TypeError` (`:141-145`) it becomes an **uncaught throw in a mount hook** (M7's `onMounted`) and in a Select handler (i2). The demo-side consequence of that row is a crash surface, not a display glitch. I found no contradiction with lane-library anywhere.

---

## 5. Superlatives (L-18 the other way)

- **S1 — the shared ticker is the best thing in this cluster.** `useDemoTicker.ts` is *one* module-level `RAFPlayback` with a `Set` of subscribers, an `enabled()` predicate per subscriber, `useDocumentVisibility` gating, and `onScopeDispose` removal + reconcile (`:45-48`). Consuming the library's own `RAFPlayback` for the demo's UI loop is the dogfood done right. On top of it, `useAnimationSync` gates on a settle window and — explicitly, in prose and in code — **gates on INPUTS the loop does not own** (`isPlaying`, visibility) precisely to avoid the deadlock of gating on `isStarted`, an output it computes (`:14-26`). That is the correct solution to a genuinely subtle problem, and teardown is leak-free by construction: no listener in `ChannelOptions` is manual, so nothing can be forgotten. *Falsifier:* find a subscriber path that outlives its scope, or a rAF started outside the ticker. Neither exists in this component.
- **S2 — the error posture matches the engine's documented contract exactly.** `trySetOption` (`:469-476`) re-throws anything that is not an `AnimationOptionError` rather than a blanket `catch {}` — and the discrimination is sound: `AnimationOptionError` assigns `this.name` explicitly in its constructor (`src/animation/internal/errors.ts:69`), so it survives minification. The engine's fail-explicit contract (`option-setters.ts:10-14`) is *honoured*, not defeated. (The class is also exported publicly at `index.ts:152`, so `instanceof` would be marginally cleaner — a nit, not a fault.) The defect at B1 is the *persist* on the next line, not this guard.
- **S3 — the "one persist seam" is the discipline the rest of the file needs.** `updateTimingFunctionFromName` (`useTimingFunctionEditor.ts:135-168`) is the **only** writer of the stored timing function (grep-verified across `demo/`), and it persists a *complete, re-parseable CSS literal* rather than the bare `cubic-bezier`/`steps` token, precisely so the construction path round-trips on remount (`:108-133`). Documented, single-seam, and correct. Extend it to duration/delay and B1 dies.
- **S4 — the reactivity boundary is drawn in the right place.** Animations are `markRaw` and the component bridges them through explicitly-polled refs (`:495-504`) instead of making a compiled frame graph deeply reactive. That is the correct Vue/engine boundary; the alternative is catastrophic.
- **S5 — an engine/demo co-design that kills an apparent defect.** The iterations field displays `∞` (`:69`), and a naive audit calls the round-trip poisoned. It is not: `normalizeIterationCount` explicitly accepts `"∞"` alongside `"infinite"`/`"Infinity"`/`Infinity` (`engine/options.ts:106-131`). The demo's display glyph is a *supported input*. Recorded as a superlative because it is the reason B1 is scoped to `duration`/`delay` and not to `iterationCount` — the engine met its consumer halfway.

---

## 6. Remediation order (smallest edit → largest payoff)

1. **B1** — persist only what the setter accepted (move the store write inside the `try`, or quarantine on read). One helper, three call sites. *Un-bricks scenes.*
2. **M2** — delete `:progress` (`:317`) and `progress?: number` (`TimingFunctionPanel.vue:69`); `v-if` the detail panel on `showDetailPanel`. *Two deletions; removes all per-frame work from inactive channels and stops mounting a vendor canvas per channel.*
3. **M1** — `is-open`→`open` ×3, `tooltip`→`description` ×10, delete `label-class` ×5 and `:descriptions` ×2 (or file the glass-ui asks). Follow with **M6** so it cannot recur.
4. **M3 + M4** — route through `setTimingFunction(literal)` + keep the frame propagation; make `onMounted`'s re-apply conditional on a real divergence. Forward the `applyTimingFunction` live-options gap to the engine tranche.
5. **M5** — import `bezierPresets` from `@mkbabb/value.js/easing`, delete `NAMED_EASING_BEZIER`, and render `convertedFromName` (or delete it deliberately).
6. **B2/F-1** — declare + lock glass-ui **7.0.0** and regenerate; nothing above is reproducible on a clean runner until it lands.
7. **M7, m1, m7, m8** — synchronous `kfEngine()` reads; the `bindOption` factory; prune the dead composable exports and the dead constants.
