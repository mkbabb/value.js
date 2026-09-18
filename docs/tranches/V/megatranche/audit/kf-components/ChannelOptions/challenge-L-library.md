claude-opus-5[1m]

# CHALLENGE — `ChannelOptions.vue` · axis L (LIBRARY)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/transport/channel-controls/ChannelOptions.vue` (609 L)
**Tree** keyframes.js HEAD `8281638c fix(demo-shell): provide tooltip context for the routed control group` — the same HEAD the census lanes read, so every count is directly comparable to `lane-frontend.md`.
**Mode** static / source-derived. No browser, no dev server, no installs. Two read-only `node` probes were run against already-installed packages (`@mkbabb/value.js/{css,easing}`) to settle parse and identity questions source reading could not close; both are transcribed inline with their exact output. Livable-only claims are marked `UNPROVEN-NEEDS-LIVE`.
**Posture** assume-defective-until-proven, but a false defect is worse than a missed one: every claim carries its falsifier, and **seven** candidate defects that died to their own falsifier are recorded in §5 so the next lane does not re-file them.

**This is a merged pass.** A first pass (**R1**) already wrote to this path; its findings were re-derived against the tree rather than trusted, and all survive. R1's own numbering is cited on every row it originated so its work stays attributable. **R2** contributes one blocker escalation, three new majors, seven new minors, the killed-candidate table, and probe evidence that changes R1's M3 from a perf finding into a correctness one.

**R3** (§9) is a third independent read of the same set. It re-derived every prior row from the tree; **30 of 31 survive unchanged, one sub-claim of M-5 is FALSIFIED by probe (§9.0)**, and R3 adds one blocker, two majors, two minors, one info and two superlatives — all in the *store-vs-animation* direction the first two passes did not walk (the prior passes audited what the panel WRITES; R3 audits what it READS BACK). One R3 candidate was filed MAJOR and **self-downgraded to MINOR** when its reachability probe failed (§9.4); the failed half is shown rather than deleted.

**Tally — 37 defects (4 BLOCKER · 10 MAJOR · 17 MINOR · 6 INFO) · 9 superlatives · 7 killed candidates · 1 falsified sub-claim · 1 self-downgrade.**

---

## 0. The one-paragraph verdict

The component is a **competently-wired reactivity bridge wrapped around four unsound seams**. The rAF/ticker discipline, the typed-error posture, the markRaw boundary and the "one persist seam" for the timing-function literal are genuinely exemplary (§6). But: (a) that same persist discipline is **absent** on duration/delay/iterations, and the store it writes is a *constructor input*, so a mistyped duration bricks a scene at next boot (**B-1**); (b) the timing-function seam hand-rolls `{ fn }` instead of calling the engine's own `setTimingFunction`, stripping the CSS twin **and** minting closures the engine's serializer cannot recognise — which demotes every touched animation off WAAPI *and* arms a throw in the demo's own Export-CSS button (**B-2**); (c) twenty bindings across two files are passed to a vendor that does not declare them, so five tooltips, two description sets and the entire select mutex are dead (**M-1**) — invisible because **nothing typechecks the demo** (**M-2**); and (d) the panel asserts itself as the timing-function authority at mount over scenes that own their own (**M-4**). The correct idiom for (b) exists in this repo, twelve files away, with a comment that says exactly why.

---

## 1. The read set

Every file the component imports, read whole; transitively where a claim required it.

| read | why |
|---|---|
| `channel-controls/ChannelOptions.vue` (609 L) | the target |
| `./composables/useTimingFunctionEditor.ts` (237 L) · `useAnimationSync.ts` (93 L) · `usePlaybackToggle.ts` (37 L) · `../composables/useDemoTicker.ts` (50 L) | composable contracts |
| `./TimingFunctionPanel.vue` (166 L) · `./LayerConfigPanel.vue` (92 L) · `@components/playback/PlaybackRibbon.vue` (244 L) | child + teleport contracts |
| `@state/{animationOptionsStore,storeUtils,hashSharing}.ts` | the persisted-store contract |
| `@utils/reference-data/{animationDescriptions,easingGroups,timingCurveUtils}.ts` | the catalogue + classifiers |
| `@mkbabb/value.js/{math,easing,css}` | `clamp`, `cubicBezierToString`, the easing registry, the scalar parser |
| glass-ui 7.0.0 **installed** `dist/components/{labeled-field,input,select,dock}/**` + `dist/labeled-field.js` + `dist/easing.js` + `dist/tabs.js` | the ACTUAL vendor contract, not the producer's |
| engine (READ-ONLY evidence): `src/animation/engine/{animation,option-setters,options}.ts` · `internal/errors.ts` · `compile/easing/{easing-option,easing-registry}.ts` · `compile/emit/{easing-serialize,densify}.ts` · `compile/frame-compiler.ts` · `waapi/eligibility.ts` · `constants/{types,defaults}.ts` · `easing.ts` · `load-engine.ts` | engine-consumption idioms |
| `ChannelControls.vue` · `ControlsPaneWrapper.vue` · `RibbonBar.vue` · `demo/kf-engine.ts` · `demo/app/main.ts` · `scenes/cube/useCubeDemo.ts` · `scenes/easing/useEasingDemo.ts` · `keyframes/composables/useKeyframeOps.ts` | mount/lifecycle reachability |
| `package.json` · `tsconfig{,.lib}.json` · `demo/env.d.ts` · `.github/workflows/{ci,release}.yml` · `test/demo/**` | the gate surface |

---

## 2. BLOCKERS

### B-1 — the store records what the engine REJECTED, and that store is a constructor input
*(origin R1 B1; R2 adds the parser probe and the second reach vector)*

**Provenance** `ChannelOptions.vue:33-41` (duration), `:52-60` (delay), `:80-88` (iterations); guard at `:469-476`.

```vue
trySetOption(() => animation.setDuration(v));   // swallows AnimationOptionError
storedAnimationOptions.animationOptions.duration = v;   // ← persists ANYWAY, outside the guard
```

`storedAnimationOptions` is `getStoredAnimationOptions(props.animation)` (`:459`) → a `useStorage`-backed localStorage bucket (`animationOptionsStore.ts:67-74, 117-122`). That same bucket is a **constructor argument**: `useCubeDemo.ts:52-63` (`new CSSKeyframesAnimation(matrixAnimationOptions.animationOptions).fromVars(…)`), `:73-99`, `:103-110`. Key identity verified end-to-end — `getAnimationSuperKey(undefined, animation)` = `animation.superKey`, `kfEngine().getAnimationId(animation)` = `animation.name`; the cube writes `(SCENE_ID, CUBE_ANIMATION_NAMES.Matrix)` and reads back with exactly that pair.

glass-ui's `Input` is a bare `v-model` on a native `<input>` (producer `src/components/input/Input.vue`, no debounce), so `update:modelValue` fires **per keystroke**, not on blur.

**What the engine does with the intermediates** — read-only probe against the installed value.js:

```
$ node --input-type=module -e "import {parseCssScalar} from '@mkbabb/value.js/css'; …"
""     -> FAIL                                    → normalizeDuration THROWS
"5"    -> {"type":"number","value":5,"unit":""}   unit ∉ {s,ms} → THROWS
"500m" -> keyword payload                          → THROWS
"abc"  -> {"type":"keyword","value":"abc"}        payload.type ≠ number → THROWS
"5s"   -> {"type":"number","value":5,"unit":"s"}  ok
```

against `engine/options.ts:29-38, 85-101` (`tryParseTime` → `normalizeDuration` → `parseOption` → throw). `""` is **not** `null`, so the "genuine omission" escape at `:88` never applies; `normalizeDelay` (`:104-119`) and `normalizeIterationCount` (`:50-78`) are identically fail-explicit.

**Failure scenario (concrete).** Cube scene → Controls → type `500ms` into `duration`. The store receives, in order, `5`, `50`, `500`, `500m`, `500ms`. Stop anywhere short of the last — blur, switch tabs, close the pane, or simply select-all-and-delete and walk away — and localStorage holds a value the engine refuses. Reload: `useCubeDemo` setup runs `new CSSKeyframesAnimation({…, duration: "500m"})` → ctor `setOptions` → `applyOptions` (`option-setters.ts:145-160`) → `applyDuration` → **throws outside any try**, synchronously, inside `setup()`. `grep -rn "onErrorCaptured\|errorHandler" demo/app/` → **no output**: there is no boundary. Nothing heals it — `getStoredAnimationOptions` defaults only when the bucket is *missing or empty* (`:108-115`), and a poisoned bucket has keys. The store TTL is **7 days** (`storeUtils.ts:4`). Recovery requires clearing site data.

**Second, independent reach vector (R2).** `hashSharing.ts:28-44` `isValidState` checks only that `options` is a non-null object; `applySharedAnimationState` (`animationOptionsStore.ts:76-81`) then `Object.assign`s arbitrary decoded values into the store. A shared or corrupted `#state=` link poisons the same fields with zero field validation.

**Why this is the sharpest finding.** The file's own docstring (`:461-468`) *names* the hazard — "User input mid-keystroke is routinely malformed" — and the neighbouring timing-function path was hardened for exactly this class (`useTimingFunctionEditor.ts:108-133`, I.W2.S3: *"persist a COMPLETE re-parseable literal … so the value the construction path reads back is re-mountable"*). The discipline was applied to one option and withheld from three. The asymmetry, not the ignorance, is the defect.

**Falsifier.** Any one kills it: (a) a validation/quarantine step between the bucket and a constructor — none exists on either side; (b) `normalizeDuration("")` returning `undefined` — only `== null` short-circuits (`:88`); (c) any scene reading a different bucket than the panel writes — the key derivation above is exact; (d) `useStorage` not flushing mid-keystroke mutations — no `flush` override is set (`:68-71`); (e) an error boundary — none.

**Not claimed.** The `∞` glyph is *not* a poisoning vector: `normalizeIterationCount` explicitly accepts `"∞"` (`options.ts:56-62`). See superlative S-5.

---

### B-2 — the timing-function seam strips the CSS twin **and** mints registry-foreign closures, killing both WAAPI delegation and the demo's own CSS export
*(R1 filed the WAAPI half as M3/MAJOR; R2's identity probe escalates it — the second consequence is a throw, not a slowdown)*

**Provenance** `useTimingFunctionEditor.ts:96-106`, driven unconditionally from `ChannelOptions.vue:538-542`.

```ts
const easing = { fn: timingFunction };          // ← no `.css`
animation.options.timingFunction = easing;      // ← direct field write; setTimingFunction bypassed
animation.frames.forEach((frame) => { frame.timingFunction = easing; });
```

The engine's `Easing` is `{ fn, css? }` (`constants/types.ts:57-62`) and the optional twin is load-bearing in **two** places.

**(i) WAAPI eligibility.** `waapi/eligibility.ts:174-179` refuses delegation when `firstTF.css === undefined` — *"easing has no faithful CSS twin (would run bare linear on the compositor)"*. `useWAAPI` defaults **true** (`constants/defaults.ts:86`) and the demo never overrides it (`grep -rn "useWAAPI" demo/` → 0 hits).

**(ii) CSS emit.** `compile/emit/easing-serialize.ts:69-79`: with no `.css`, `serializeEasing` falls back to a registry reverse-lookup **by function identity** — `timingFunctionEntries.find(([_n, func]) => func === easing.fn)` — and a miss **THROWS** `AnimationOptionError`. `compile/emit/densify.ts:95` calls `serializeEasing(animation.options.timingFunction)` on the `compileToCSS` path the demo's own Export-CSS ribbon button drives (`RibbonBar.vue` → `KeyframesStringControls.vue:135`).

**The boot path gets this right, and this component destroys it.** `useCubeDemo.ts:52-63` constructs with `timingFunction: "ease-in-out"` — a **string** — which routes through `resolveEasingOption` and picks up the twin (`easing-option.ts:60-65`: `const css = cssTwinFor(input); return css ? { fn, css } : { fn }`). `frame-compiler.ts:155-158` then propagates that same twinned object into every compiled frame. A freshly booted animation is WAAPI-eligible and CSS-serializable; `onMounted` overwrites `options.timingFunction` **and every frame's** with a bare `{ fn }`.

Note `easing-option.ts:27-31`: `resolveEasingOption` returns an **object** input verbatim, attaching nothing. Routing this `{fn}` through `setTimingFunction` would not have saved it either — only the string forms carry a twin.

**The identity fallback cannot rescue it (R2's escalation).** Read-only probe:

```
$ node --input-type=module -e "import {easing,CubicBezier,steppedEase} from '@mkbabb/value.js/easing'; …"
stable identity: false            # easing('ease-in-out') !== easing('ease-in-out')
bezier fresh closure each call: true
steps  fresh closure each call: true
```

`timingCurveUtils.ts:42-46` `namedEasing(name)` calls `easing(name)` **directly**, minting a fresh closure outside the engine's memoized registry. The engine only ever hands out `timingFunctionRegistry.get(name)` — the one instance (`easing-registry.ts:37-50, 124-136`) — which is precisely what `easing-registry.ts:36` means by *"Stable identities let the serializer distinguish named curves from closures."* The demo bypasses that registry, so `serializeEasing`'s identity lookup misses for **every** curve: named, bezier and steps alike.

**Net.** Mounting the Controls surface for any channel silently (a) demotes that animation from the compositor to the rAF path, and (b) arms an `AnimationOptionError` throw in the demo's own Export-CSS button. R1 rated the WAAPI half MAJOR on the honest ground that "the rAF path is always correct — perf-degrading, never wrong-pixel". That reasoning is sound and I keep it; the probe adds a *second* consequence that is not perf at all, and a throwing export button on a CSS-animation IDE is a blocker.

**The internal contradiction that settles intent.** `useEasingDemo.ts:307-312` does it correctly, with a comment saying why:

```ts
// … `setTimingFunction` normalizes the CSS twin.
watch(cssValue, (v) => { try { previewAnim.setTimingFunction(v); } catch { /* fail-soft */ } });
```

Two idioms for one operation in one repo; the panel picked the one that defeats the engine's own fast path — and the fix is already computed two statements later, at `useTimingFunctionEditor.ts:166-167` (`timingFunctionLiteralFor(key)`).

**Falsifier.** Dies if: `firstTF.css === undefined` is not the branch reached at play time; `frames[0].timingFunction` is re-derived after the write (it is not — no recompile follows); `easing(name)` is identity-stable (probe says no); the demo sets `useWAAPI:false` (it does not); `onMounted`'s re-apply is conditional (`:539` is unguarded); or `compileToCSS` never reaches `serializeEasing` (`densify.ts:95`).

**Legitimate half, preserved from R1 and forwarded.** `applyTimingFunction` (`option-setters.ts:32-37`) does **not** propagate to already-compiled `frames[]`, unlike its colour siblings which call `renormalizeColors()` (`:106-129`). So the per-frame write is papering over a real engine gap. The correct shape is `setTimingFunction(literal)` **plus** frame propagation carrying the same twinned object — not a hand-rolled `{fn}` instead of the setter. **Engine-side handoff candidate: `applyTimingFunction` should honour the live-options contract like `applyColorSpace`/`applyHueMethod` do.**

---

### B-3 — `@mkbabb/glass-ui` is a phantom dependency; this file carries four subpath edges to it
*(fold of `lane-frontend.md` **F-1**; origin R1 B2; R2 adds the `/dock` back-edge)*

**Provenance** `ChannelOptions.vue:408-423` — root barrel (`Card`, `CardContent`, `Select*`, `Separator`), `/dock` (`DockControl`), `/tooltip` (`Tooltip*`), `/labeled-field` (`LabeledSelect`, `LabeledInput`).

Re-verified, not re-derived (F-1 owns the finding): `package.json` dependencies = `{"@mkbabb/value.js":"4.0.0"}` only; glass-ui in neither `dependencies` nor `devDependencies`; `grep -n "node_modules/@mkbabb" package-lock.json` → one hit, value.js; `node_modules/@mkbabb/glass-ui/package.json` → `7.0.0`, a real directory; `vite.config.ts:37-59` carries **no** glass-ui alias.

**Failure scenario.** `npm ci` on a clean runner → these four specifiers are unresolvable → `vite build --mode gh-pages` fails at the first import. The tree survives only on the residue of an install predating the declaration's removal.

**Extension beyond F-1 — the version half (R1).** The phantom-ness is not only *presence* but *pin*: this file's comments cite **3.4.0** (`:143-146`) and **4.0.1** (`TimingFunctionPanel.vue:25-31`) as the API it was authored against, while **7.0.0** resolves. M-1 is the measured consequence of that unpinned drift.

**Extension — the back-edge (R2).** `grep -rlo "@mkbabb/keyframes.js" node_modules/@mkbabb/glass-ui/dist/*.js` → seven hits including **`dock.js`**. So `import { DockControl } from "@mkbabb/glass-ui/dock"` (`:421`) is exactly the edge `lane-frontend.md §8` describes the vite self-alias existing to close. This component sits on the undeclared side of a deliberate dependency cycle.

**Falsifier.** Produce a lockfile entry, workspace link, or bundler alias. All three greps above return empty.

---

## 3. MAJOR

### M-1 — twenty bindings across two files are passed to a vendor that does not declare them
*(origin R1 M1; R2 independently re-verified the vendor contract and corrected five line numbers)*

**Vendor ground truth**, from the **installed** 7.0.0:

```
dist/components/labeled-field/types.d.ts
  LabeledFieldCommonProps = { label, description?, requirement?, layout?, errorLive? }
  LabeledSelectProps      = common + { modelValue, items, open?, placeholder?, invalid?, disabled?, required? }
  LabeledInputProps       = Omit<InputProps,"class"> & common
dist/components/input/types.d.ts
  InputProps = { autocomplete? class? defaultValue? disabled? enterkeyhint? form? inputmode?
                 invalid? maxlength? minlength? modelValue? name? pattern? placeholder?
                 readonly? required? size? type? }        ← no `tooltip`
dist/labeled-field.js  (compiled runtime prop tables)
  grep -c tooltip → 0 · labelClass → 0 · descriptions → 0
  LabeledSelect props: { modelValue:{}, items:{}, open:{type:Boolean}, placeholder:{},
                         invalid:{type:Boolean}, disabled:{type:Boolean}, … }   ← no `isOpen`
  … and it forwards `open: e.open` onto the inner Select.
```

No `inheritAttrs:false` in the module, so undeclared bindings fall through as DOM attributes on `div.labeled-field`.

**The call sites** (line numbers re-enumerated by grep at this HEAD; R1's LayerConfigPanel rows were off by one to five and are corrected here):

| binding | sites | vendor status | consequence |
|---|---|---|---|
| `tooltip="…"` | `ChannelOptions :32, :51, :79, :101, :125` · `LayerConfigPanel :15, :22, :36, :52, :63` | undeclared everywhere (Input/Field/Select/Slider/Switch) | **10 field tooltips never render.** 7.0.0's spelling is `description` |
| `label-class="…"` | `:31, :50, :78, :100, :124` | undeclared | label typography falls back to the vendor default (`UNPROVEN-NEEDS-LIVE` for the visual delta) |
| `:is-open="…"` | `:96, :120` · `LayerConfigPanel :11` | the prop is **`open`** | the select mutex never reaches the vendor |
| `:descriptions="…"` | `:98, :122` | undeclared | `DIRECTION_DESCRIPTIONS` / `FILL_MODE_DESCRIPTIONS` (`:445-449`) are **dead imports**; per-option help never renders |

**The dead mutex.** `openSelect` / `isOpen` / `setOpen` (`:488-493`) plus the two-function prop-drill into `LayerConfigPanel` (`:363-364`, typed at `LayerConfigPanel.vue:84-85`) is ~15 lines of state plus a cross-component contract that provably does nothing. `@update:open` **is** a declared emit (`LabeledSelect.vue.d.ts`), so the ref updates faithfully — and is then read only by the dead prop. The mutex tracks and never enforces. **Honest severity note (R1, kept):** reka's Select is modal, so user-visible damage here is ~nil; the damage is a dead typed contract and dead prop-drilling. The tooltip/description losses are the user-visible half.

**The internal contradiction that makes this a defect, not a style choice.** A hundred lines below, this same file hand-rolls a `Select` specifically to render name + description pairs per item (`:240-271`). The author knows option descriptions matter; the two `LabeledSelect`s silently lost theirs to vendor drift.

**Falsifier.** A `tooltip`/`labelClass`/`descriptions`/`isOpen` prop anywhere in the resolved glass-ui (greps are over the installed **runtime**, not the `.d.ts` alone); a bundler alias pointing glass-ui elsewhere (`vite.config.ts:37-59` — none); a global directive reading a `tooltip` attribute (none in `demo/app/main.ts`).

### M-2 — nothing typechecks the demo; `vue-tsc` is not installed
*(origin R1 M6; R2 adds the SFC shim and the CI narrowing)*

`package.json`: `check` = `tsc --noEmit && tsc --noEmit -p tsconfig.test.json`; `check:lib` = `tsc --noEmit -p tsconfig.lib.json`. `tsconfig.json:47` includes `["src/","demo/"]`, but plain `tsc` **cannot open `.vue` files at all**, and `demo/env.d.ts:3-7` shims every SFC import to `DefineComponent<{}, {}, any>`, so even `.ts`→`.vue` bindings are unchecked. `grep -n "vue-tsc\|@vue/language" package.json` → empty; `ls node_modules/.bin | grep vue-tsc` → empty. And the whole-project `check` **is not in CI**: `.github/workflows/ci.yml:42` and `release.yml:43` both run only `check:lib`, which `tsconfig.json:27` documents as *"only includes `src/`"*.

So 403 of this file's 609 lines carry zero static verification. This is the structural cause of M-1 (twenty template type errors against the installed `.d.ts`), of the four `as any` casts (N-16), and of the contravariant handler annotation at `:81`.

**Falsifier.** Point at any gate that parses `demo/**/*.vue` for types. `demo:correctness` (`scripts/run-demo-roster.mjs`) is a runtime roster; `test/demo/instrument/value4-editor-boundary.test.ts` exercises `timingFunctionKind` (`:73-86`) but mounts no component.

### M-3 — a dead `:progress` prop forces a 60 fps re-render of every channel's detail panel
*(origin R1 M2; R2 confirms the always-mounted picker independently)*

`ChannelOptions.vue:317` `:progress="normalizedProgress"` → `TimingFunctionPanel.vue:69` declares `progress?: number` and **never reads it** (`grep -n progress TimingFunctionPanel.vue` → one hit, the declaration). `normalizedProgress` (`:506-510`) depends on `currentT`, which the ticker rewrites every frame while playing; a changed prop forces a child update in Vue 3 regardless of whether the child reads it. `clamp` (`:426`) exists solely to feed it.

Three multipliers compound it. **(a)** The detail row is CSS-collapsed, never `v-if`'d — `:303-324` toggles `grid-template-rows` only (`:552-566`) — so `TimingFunctionPanel` **and the vendor `EasingPicker`** are instantiated for every channel of every scene and patched at frame rate while collapsed and off-screen. **(b)** All channels mount simultaneously: `ControlsPaneWrapper.vue:44-46` is `v-for … :key="host.animation.id"` gated only by `v-show`. **(c)** `:is-playing` is the *group's* flag handed to every host alike (`:61`).

**The sharp corollary (R1).** `currentT` / `isAnimPlaying` / `isAnimStarted` are otherwise read **only inside `<Teleport v-if="active">`** (`:377-401`). With `v-if` false that branch never touches them, so an inactive channel's render effect would not track them at all — **the dead `:progress` prop is the sole reason inactive channels re-render every frame.** Deleting one attribute removes the entire per-frame cost for every non-active channel.

**Falsifier.** Show `progress` consumed in the child (it is not — 166 lines read whole, no `useAttrs`, no style binding); show Vue skipping a child update on a changed prop (it does not); show the panel mounted lazily (CSS collapse only). Frame-cost magnitude is `UNPROVEN-NEEDS-LIVE`; the structure is source-proved.

### M-4 — mount-time clobber: the panel overwrites a scene's own easing authority
*(origin R1 M4; R2 re-verified the single-writer grep)*

`ChannelOptions.vue:538-542` — `onMounted` unconditionally re-applies the **store's** timing function onto the live animation. `ChannelControls.vue:97-115` mounts `ChannelOptions` under `v-if="… selectedControlSurface === 'controls'"`, so this fires on **every switch to the Controls tab**, not once per session.

The easing scene's `previewAnim` owns its easing through `cssValue` (`useEasingDemo.ts:290-312`) and **nothing writes that curve back to the store** — verified: `grep -rn "animationOptions.timingFunction" demo/` yields writes at exactly one site, `useTimingFunctionEditor.ts:166`. The Easing channel carries a painting `animation` (`useEasingDemo.ts:351-354`), and any painting channel earns the built-in triad including `controls` (`demo/state/controlSurfaces.ts:51-55`). So: pick a curve in the easing sidebar → switch to Controls → the preview's easing silently reverts to the persisted panel value (`ease-in-out` on a fresh store). Two authorities over one `animation.options.timingFunction`, no reconciliation.

**Falsifier.** Show the easing scene excluded from the `controls` surface; show a second writer syncing `cssValue` into the store (grep says none); show `onMounted` guarding on real divergence (`:539` is unguarded).

### M-5 — the pencil silently flattens four catalogue curves to linear, and the disclosure it computes is unrendered
*(origin R1 M5; R2 re-diffed the table and re-counted the catalogue)*

`ChannelOptions.vue:172-186` (pencil) → `useTimingFunctionEditor.ts:171-212` → `NAMED_EASING_BEZIER[currentEasing]` (`animationDescriptions.ts:16-49`); miss → `controlPoints = [0,0,1,1]` (`:203-205`) = **linear** → `updateTimingFunctionFromName("cubic-bezier")` **persists it** (`:210`).

`NAMED_EASING_BEZIER` is a hand-maintained duplicate of value.js's `bezierPresets` (`value.js/src/easing.ts:34-67`) — 29 rows, numerically identical to the vendor's, **minus `smooth-step-3`**. The catalogue (`easingGroups.ts:27-103`, 29 unique items, count asserted by `test/demo/reference-data/easing-catalog.test.ts:16`) offers four curves with no table row: `smooth-step-3` (`:60`), `ease-in-bounce` (`:89`), `step-start` / `step-end` (`:95-96`). ~~`timingFunctionKind("step-start")` resolves to the keyword `"step-start"`, **not** `"steps"`, so it takes the named branch too.~~ — **FALSIFIED by R3 probe, see §9.0.** `parseTimingFunction("step-start")` returns kind `"steps"`, so `step-start`/`step-end` take the **steps** branch and never reach the `[0,0,1,1]` fallback. M-5 stands for **two** curves (`smooth-step-3`, `ease-in-bounce`), not four; the other two are a different and worse defect, filed as **M-10**.

Select `ease-in-bounce`, click the pencil to *inspect* it, and the bounce is gone — replaced by `cubic-bezier(0, 0, 1, 1)`, persisted. And there is **no feedback**: `convertedFromName`, whose docstring reads *"the name of the easing we auto-converted FROM (for subtitle display)"* (`useTimingFunctionEditor.ts:34-35`), is destructured at `ChannelOptions.vue:479` and appears **nowhere in the 403-line template**. The conversion notice was designed and then lost.

Note the conversion is lossy for the other 25 too — a named `ease-in-out-quint` becomes a bezier approximation the instant the pencil is clicked, before any edit. For `ease`/`ease-in`/`ease-out`/`ease-in-out` the bezier *is* the CSS definition and the conversion is exact; for the rest it is an approximation the (unrendered) subtitle was meant to disclose.

**The duplication is gratuitous:** the sibling `TimingFunctionPanel.vue:52` already imports `bezierPresets` from `@mkbabb/value.js/easing`. One import away, in a package the neighbour already consumes, sits the exact quad.

**Falsifier.** Show those four absent from the dropdown (present); show a `[0,0,1,1]` fallback that is *intended* to mean "no bezier equivalent" **and** surfaced (it is not); show a numeric divergence beyond the missing row (all 29 diffed: identical).

### M-6 — async ceremony whose stated rationale is falsified by the component's own line 459 — and a throw sequenced ahead of it
*(R1 M7 = the ceremony; R2 adds the ordering hazard, which is the live consequence)*

**The ceremony (R1).** `ChannelOptions.vue:531-547` declares two empty refs and an `async onMounted` because *"they ride `loadAnimationEngine()` … until then the dropdowns render empty — an honest pre-load frame."* But `demo/app/main.ts:50-53` awaits `warmKfEngine()` **before** `app.mount("#app")`, and `demo/kf-engine.ts:46-58` documents exactly this ("`main.ts` WARMS the engine before the app mounts … `kfEngine()` returns it synchronously") and **throws** if read early. Stronger: this component cannot run without the resolved engine — `:459` `getStoredAnimationOptions(props.animation)` calls `kfEngine()` synchronously (`animationOptionsStore.ts:90`). So by construction the engine is in hand at `:459`, and `const { DIRECTIONS, FILL_MODES } = kfEngine()` at setup would populate both lists **before first paint**. Two refs, an async hook and a guaranteed-empty first render, for state that is synchronously available; the rationale comment is now misinformation for the next reader.

**The ordering hazard (R2).** As written, the ceremony is not merely wasteful — it is fragile:

```ts
onMounted(async () => {
    updateTimingFunctionFromName(stored.animationOptions.timingFunction as TimingFunctionNames);  // can throw
    const engine = await loadAnimationEngine();
    directions.value = engine.DIRECTIONS;
    fillModes.value  = engine.FILL_MODES;
});
```

`updateTimingFunctionFromName` throws `TypeError` whenever `timingFunctionKind` returns `undefined` (`useTimingFunctionEditor.ts:140-145`) — which `animationDescriptions.ts:91-101` returns for any value that neither parses as a CSS timing function nor resolves in the registry, and which the repo's own test pins (`value4-editor-boundary.test.ts:86`). When it throws, the two lines below never run and `directions`/`fillModes` stay `[]` **forever**: the `direction` and `fill mode` selects are permanently empty for that channel. Reachable through the same unvalidated `#state=` restore as B-1. Two unrelated concerns share one failure fate purely because of statement order — and the synchronous read R1 prescribes dissolves both.

**Falsifier.** Show a mount path reaching `ChannelOptions` with `resolved === null` — it would have thrown at `:459` first. (The one real edge: `main.ts:50` swallows a warm rejection with `.catch(() => undefined)` and mounts anyway; in that world `:459` throws in `setup` — logged as **I-3**, not a rescue of the ceremony.)

### M-7 — the markRaw bridge omits `options.duration`, so the scrub rail's `:max` goes permanently stale after a duration edit *(R2, new)*

`useAnimationSync` exists precisely because "animation is markRaw, so Vue can't track property changes" (`ChannelOptions.vue:495-497`). It polls exactly three fields — `effectiveT`, `started`, `reversed` (`useAnimationSync.ts:42-45`). `options.duration` is not among them, yet `ChannelOptions.vue:35` mutates it (`animation.setDuration(v)`) and the teleported ribbon reads it inside a `computed`:

```ts
// PlaybackRibbon.vue:119-121
const effectiveDuration = computed(() => animation?.options.duration ?? source?.duration ?? 1);
```

consumed as the scrub `Slider`'s `:max` (`:19`). A `computed` invalidates only on a *tracked* dependency; `animation` is a stable identity and its `options` are `markRaw` (`useCubeDemo.ts:65`), so nothing ever invalidates it. Edit `5s` → `10s` and the rail still maxes at 5000 — half the timeline unreachable — until the panel remounts, which it does not (`ControlsPaneWrapper.vue:44-46` keys by `host.animation.id` and hides with `v-show`).

**Falsifier.** Show `animation.options` reactive (it is `markRaw`); show another invalidating dependency of `effectiveDuration` (it reads two props and nothing else); show a parent re-render invalidating a computed (it does not).

### M-8 — collapsed panels keep their controls in the tab order, contradicting the sibling file's own documented idiom *(R2, new)*

The three-row panel stack collapses with `grid-template-rows: 0fr` + `overflow: hidden` and dims with `opacity: 0; pointer-events: none` (`:552-583`). **None of those removes a descendant from sequential focus navigation.** The inactive rows contain a real `<button>` (the pencil, `:172-186`) and a `tabindex="0"` `role="button"` (the advanced nav, `:281-286`). A keyboard user can Tab into a zero-height, fully transparent control and activate it.

That also opens a state the CSS is silently assumed to prevent: `advancedOpen` and `showDetailPanel` are independent booleans with no exclusivity invariant (`:11-14`, `:306`, `:330`). Reaching the pencil by keyboard while the advanced pane is open sets both true; `exitDetailPanel` then lands the user on the *advanced* pane, because nothing resets `advancedOpen`. Pointer users cannot reach it — which is exactly why the state model was never hardened (see K-6).

The remedy is in-repo precedent one directory over. `ChannelControls.vue:123` documents it and `:136` applies it: *"`inert` (not bare aria-hidden, which leaves focusable Monaco descendants in the tab order — the aria-hidden-focus a11y defect)"* → `:inert="!keyframesActive"`. This file's own panel stack never adopted it; `grep -n "inert" ChannelOptions.vue` → no output.

**Falsifier.** Show that `opacity:0` / `pointer-events:none` / `overflow:hidden` remove elements from the tab order (they do not; only `display:none`, `visibility:hidden`, `inert`, `tabindex="-1"` do). The *visual* consequence of focusing an off-screen control is `UNPROVEN-NEEDS-LIVE` and belongs to the SS-13 visual audit; the tab-order claim is static.

---

## 4. MINOR / INFO

- **N-1 · five duplicated inline handler bodies in the template.** `:33-41, :52-60, :80-88` are the identical `trySetOption(setter); store[key] = v` shape; `:102-108, :126-132` the identical `setter(v as any); store[key] = v as any`. A `bindOption(key, setter)` factory collapses ~40 template lines to five call sites and gives **B-1's fix one place to land** — the persist currently sits textually outside the guard at all five sites, which is *how* B-1 shipped. The same rows also repeat the literal `label-class="text-small font-medium text-muted-foreground"` five times (`:31, 50, 78, 100, 124`). *(R1 m1 + R2)* *Falsifier:* show the five bodies differing beyond key + setter — they do not.
- **N-2 · double tooltip on the pencil.** `:172-186` `DockControl … title="Edit easing curve"` (a native `title` — `title` is not a `DockControl` prop per `dist/components/dock/DockControl.vue.d.ts`, so it falls through to the `<button>`) nested inside a `<Tooltip>` whose `<TooltipContent>` is the same string (`:188`). Two tooltips, one control; the sibling "Back" control (`:337-345`) carries `title` with no wrapper. *(R1 m2)* *Falsifier:* show glass-ui suppressing the native `title` on a tooltip trigger.
- **N-3 · `useAnimationSync` returns its own input, renamed to imply derived state.** `:92` returns `isPlaying` — the very `Ref` passed in at `:32`; `ChannelOptions:501` aliases it to `isAnimPlaying` and forwards it as `:is-anim-playing`. The ribbon's play state is the *group's* intent, never the engine's, while its sibling `isAnimStarted` **is** engine-polled — a mixture documented at `:497` but not carried by the naming. Also `isReversed` is polled and written every frame (`:44, :55`) and consumed by **no one** (one consumer, this file, which does not destructure it; the ribbon takes `userReversed` from `usePlaybackToggle`). *(R1 m3 + R2)* *Falsifier:* a second consumer, or a case where `isAnimPlaying` diverges from `props.isPlaying`.
- **N-4 · the iterations field spells one state two ways, and tests for an unstorable value.** `:63-76`: `'infinite'`/`Infinity` → `'∞'`, but `undefined` → the *string* `'infinite'`. Separately, the `=== Infinity` arm is unreachable: the store round-trips through `JSON.stringify` (where `Infinity` → `null`) and nothing writes the number — this file writes the raw input string, `useKeyframeOps.ts:74-76` writes `isFinite(x) ? x : "infinite"`. *(R1 m4 + R2)*
- **N-5 · three docstring drifts, each now misinformation.** (i) `:461-468` claims *"an empty value is omission (no-op)"* — there is no empty check; `""` throws inside `normalizeDuration` and is swallowed like any other malformed input. (ii) `useAnimationSync.ts:16` claims *"using vueuse's `useRafFn` pause/resume"* — it uses `useDemoTicker`/`RAFPlayback` (`:3, :41`). (iii) `useAnimationSync.ts:20-22, 84-91` promises a visibility-driven re-sync; `useDemoTicker` does stop/reconcile on visibility (`:34-35`), but a loop that has already idled (`tickerActive=false`) is **not** resumed by a visibility change, so the promise holds only while the loop is still armed. *(R1 m5 + R2)* *Falsifier:* find the empty check / the `useRafFn` call / a visibility watcher setting `tickerActive = true`.
- **N-6 · a `<label>` bound to nothing.** `:151-161` renders `<label>easing</label>` with no `for` and no wrapped control — the actual control is the sibling `Select` at `:204`. Form semantics worn as a styling hook. *(R1 m6; A-axis overlap, recorded here as dead semantics)* *Falsifier:* show `SelectTrigger` picking up an ambient `<label>` — there is no association to pick up.
- **N-7 · dead exports in a sole-consumer composable.** `useTimingFunctionEditor` has exactly one consumer. Of its ten returned members, `easingItems` (`:24-26`, a module-load-time `flatMap` over the whole catalogue) and `activeCurvePath` (`:66-81`) are consumed **nowhere in the repo**; `onEasingLabelClick` / `setAnimationTimingFunction` are exported but used only internally; `convertedFromName` is destructured-never-rendered (M-5). *(R1 m7)* *Care:* the SVG helpers themselves are **not** dead — `getCurvePath`/`generate*SVGPath` are live at `EasingTarget.vue:145,195` and `useEasingDemo.ts:109-113`; only this composable's wrapper is.
- **N-8 · dead constants and bottom-of-file imports in a directly-imported module.** `animationDescriptions.ts:108-121`: `COLOR_SPACE_DESCRIPTIONS` and `HUE_METHOD_DESCRIPTIONS` are neither exported nor referenced. The same file places its `import`s at `:128-129`, after every declaration — hoisting makes it work and makes it unreadable. *(R1 m8)*
- **N-9 · `advancedOpen` is in the wrong composable, under a docstring describing a different ref.** `useTimingFunctionEditor.ts:37-38` reads *"Whether the detail panel (cubic-bezier / steps) is open"* — that is `showDetailPanel`'s contract (`:58-63`). `advancedOpen` is a bare `ref(false)` never touched inside the composable, used solely for the advanced **sub-pane** navigation (`ChannelOptions.vue:282, 330, 342`). A timing-function editor owning a panel-navigation flag is a colocation error; the wrong docstring is how it survived. *(R2)*
- **N-10 · `TimingFunctionPanel` re-implements the persist seam, so the frame loop runs twice per drag event.** `TimingFunctionPanel.vue:142-153` writes `options.timingFunction` and iterates every frame inline, then emits `updateTimingFunction` (`:153`), which drives the parent's `updateTimingFunctionFromName` → `setAnimationTimingFunction` → the *same* assignment and *same* full-frames loop with a second, distinct object. The first pass is entirely overwritten. On a bezier drag this is per-`pointermove`, over `animation.frames.length`. *(R2)*
- **N-11 · `.panel-stack` is styled nowhere.** `ChannelOptions.vue:6`. `grep -rn "panel-stack" demo/ test/` → the single authoring site. Not a Tailwind utility, not in `demo/styles/`, not in glass-ui's `dist/styles/`. *(R2)*
- **N-12 · `.easing-edit-btn` is declared a "NAMED BEHAVIORAL SEAM" with zero consumers, citing a retired mechanism.** `:167-171` names it *"the pencil hook `proof:bezier-{no-scroll,single-card,grown}`"*. `grep -rn "easing-edit-btn" demo/ test/` returns only the comment (`:167`), the class (`:176`) and the tombstone (`:605`) — no test, no CSS rule. The `proof:*` grep-idiom it invokes was deleted by owner verdict (memory: *feedback-proof-idiom-retired*), so the prose points at a mechanism that no longer exists in any repo. *(R2)*
- **N-13 · the same emit is guarded two different ways in the same directory.** `ChannelOptions.vue:109-112` writes `(v: boolean | undefined) => setOpen('direction', v ?? false)`; `LayerConfigPanel.vue:17` writes `(v) => setOpen('blend', v)`. The declared emit is `(value: boolean) => any`, so the `| undefined` annotation and the `?? false` are defensive dead code — and the inconsistency is the tell that neither was checked (M-2). *(R2)*
- **N-14 · zero test coverage for the component and all three colocated composables.** `grep -rln "ChannelOptions\|useTimingFunctionEditor\|useAnimationSync\|usePlaybackToggle" test/` → **no output**, against 22 files in `test/demo/{app,instrument,reference-data,scenes,state}`. The specific untested invariants are the two blockers: nothing round-trips a persisted option bag back through `new CSSKeyframesAnimation` (B-1), and nothing asserts that a curve set through the panel keeps a `.css` twin (B-2). `easing-catalog.test.ts` guards the catalogue's shape but never pairs it against `NAMED_EASING_BEZIER` (M-5). *(R2)*
- **N-15 · four `as any` casts on the enum handlers, unguarded.** `:104, :106, :128, :130`. `setDirection`/`setFillMode` are as fail-explicit as their five siblings (`options.ts:122-149`) yet these calls carry no `trySetOption`. Practically safe because the items come from the engine's own tuples — but that safety rests on `directions`/`fillModes` being engine-sourced, which the `as any` is precisely what discards. Unreviewable, per M-2. *(R2)*
- **I-1 · `usePlaybackToggle` is 37 lines for two statements**, of which `toggleAnimation = () => emitTogglePlay()` (`:32-34`) is a pure passthrough the call site could emit directly. Twenty of the 37 lines are a docstring about a SOLO path that was deleted. *(R1 i1)*
- **I-2 · an unguarded `String()` on the vendor's `AcceptableValue`.** `:212-217` `(key) => updateTimingFunctionFromName(String(key))`. A `null`/`undefined` emission stringifies to `"null"`/`"undefined"` → `timingFunctionKind` → `undefined` → a bare `TypeError` thrown from an event handler (`useTimingFunctionEditor.ts:141-145`). Rated INFO, not MAJOR, because reka's item-select path has no clear/deselect affordance here — the emission could not be constructed by inspection. *(R1 i2 + R2)*
- **I-3 · no boundary under a failed engine warm.** `main.ts:50` `warmKfEngine().catch(() => undefined)` mounts the app even when the heavy chunk fails; `:459` then throws inside `setup` with no `errorCaptured` ancestor on the path (`ControlsPaneWrapper` → `ChannelControls` → here). Degradation is total rather than partial. *(R1 i3)*
- **I-4 · `wake()` fires twice per scrub tick.** `:392-397` calls it on `@slider-update`, but `PlaybackRibbon.scrubTo` (`:200-203`) always emits `scrubbed` alongside `sliderUpdate` and `:391` already binds `@scrubbed="wake"`. Idempotent, so harmless; the `@scrub-start` wake at `:385` is *not* redundant — it precedes the first value emit. *(R2)*
- **I-5 · module size.** 609 lines: 403 template, 143 script, 60 style. The script is well-proportioned; the template is not, carrying six multi-statement inline arrow bodies (`:33-41, 52-60, 80-88, 102-108, 126-132, 383-397`). N-1's helper plus extracting the three panel rows brings it under the ceiling without inventing an abstraction. *(R2)*

---

## 5. Candidate defects KILLED by their own falsifier

Recorded so the next lane does not re-file them. *(K-1…K-6 R2; K-7 R1's "not claimed")*

| # | the hypothesis | what killed it |
|---|---|---|
| K-1 | The easing `Select`'s `:model-value` is a *kind* (`"cubic-bezier"`, `"steps"`) matching no `SelectItem`, so the trigger shows the placeholder. | `easingGroups.ts:92-102` — the catalogue carries a `Steps` family and a `Custom → cubic-bezier` item. Both kinds resolve. |
| K-2 | `@scrubbed="wake"` (`:391`) is a dead listener, so a settled ticker never re-arms on scrub — the exact hazard `useAnimationSync.ts:86-91` names. | `PlaybackRibbon.vue:126-127` declares the emit and `:202` fires it on every scrub path. The seam is complete. |
| K-3 | `storedAnimationOptions` is captured once at setup (`:459`) while every composable takes a reactive `() => props.animation` getter — a prop swap edits the wrong animation's store. | `ControlsPaneWrapper.vue:44-46` keys the `v-for` by `host.animation.id`; the instance is born with its animation and dies with it. The asymmetry stays a latent contract mismatch, not a live defect. |
| K-4 | `<Teleport v-if="active" to="#controls-ribbon-target">` (`:377`) can stack N ribbons in one target. | `ControlsPaneWrapper.vue:64` sets `:active="storedControls.selectedAnimation == host.name"` — at most one host matches. |
| K-5 | N always-mounted `EasingPicker` instances each burn a rAF loop. | `dist/easing.js`'s two `requestAnimationFrame` sites are inside the preset-preview playback, gated by the `playback` prop, and `TimingFunctionPanel.vue:38` passes `:playback="false"`. The *mount* cost stands (M-3); the rAF cost does not. |
| K-6 | `exitDetailPanel` strands a user on the advanced pane because `advancedOpen` is never reset. | Unreachable by pointer — `pointer-events:none` (`:582`) blocks the pencil while the advanced row is active. Survives only as the **keyboard** path; refiled under M-8. |
| K-7 | The `∞` glyph poisons the iteration round-trip. | `options.ts:56-62` explicitly accepts `"∞"` alongside `"infinite"`/`"Infinity"`/`Infinity`. Refiled as superlative S-5. |

---

## 6. SUPERLATIVES (L-18, running the other way)

- **S-1 — the shared ticker is the best thing in this cluster.** `useDemoTicker.ts` is *one* module-level `RAFPlayback` with a `Set` of subscribers, a per-subscriber `enabled()` predicate, `useDocumentVisibility` gating, a self-terminating loop return (`:22`), and `onScopeDispose` removal + reconcile (`:45-48`). Consuming **the library's own `RAFPlayback`** for the demo's UI loop is the dogfood done right — and the file that consumes it still *says* `useRafFn` in its docstring (N-5). On top of it, `useAnimationSync` gates on a settle window and — explicitly, in prose and in code — **resumes on INPUTS the loop does not own** (`isPlaying`, visibility) precisely to avoid the deadlock of gating on `isStarted`, an output it computes (`:12-27, 57-83`). The falling-edge reasoning (`:78-83`) shows the post-stop frame was thought about too. Correct, and correct for a stated reason; teardown is leak-free by construction since no listener in `ChannelOptions` is manual. *Falsifier:* a subscriber path outliving its scope, or a rAF started outside the ticker. Neither exists here.
- **S-2 — the error posture matches the engine's documented contract exactly.** `trySetOption` (`:469-476`) re-throws anything that is not an `AnimationOptionError` rather than a blanket `catch {}`, and the discrimination is sound: the class assigns `this.name` explicitly in its constructor (`internal/errors.ts:69`), so it survives minification. The engine's fail-explicit contract (`option-setters.ts:10-14`) is *honoured*, not defeated. (`AnimationOptionError` is also publicly exported at `index.ts:152`, so `instanceof` would be marginally cleaner — a nit.) B-1 is the *persist* on the next line, not this guard.
- **S-3 — the "one persist seam" is the discipline the rest of the file needs.** `updateTimingFunctionFromName` (`useTimingFunctionEditor.ts:135-168`) is the **only** writer of the stored timing function (grep-verified across `demo/`), and it persists a *complete, re-parseable CSS literal* rather than the bare `cubic-bezier`/`steps` token, precisely so the construction path round-trips on remount (`:108-133`). Documented, single-seam, correct. Extend it to duration/delay/iterations and B-1 dies; hand it to `setTimingFunction` and B-2 dies.
- **S-4 — the reactivity boundary is drawn in the right place.** Animations are `markRaw` and the component bridges them through explicitly-polled refs (`:495-504`) instead of making a compiled frame graph deeply reactive. That is the correct Vue/engine boundary; the alternative is catastrophic. (M-7 is a *gap* in the bridge, not an argument against it.)
- **S-5 — an engine/demo co-design that kills an apparent defect.** The iterations field displays `∞` (`:69`) and a naive audit calls the round-trip poisoned. It is not: `normalizeIterationCount` explicitly accepts `"∞"` alongside `"infinite"`/`"Infinity"`/`Infinity` (`options.ts:56-62`). The demo's display glyph is a *supported input*. Recorded as a superlative because it is the reason B-1 is scoped to the parse-backed options and not to `iterationCount`'s sentinel — the engine met its consumer halfway.
- **S-6 — `TimingFunctionPanel.isSeedEcho` defends the stored curve against a write-only vendor v-model, and forwards the gap instead of patching it.** `TimingFunctionPanel.vue:25-31, 106-130`. The vendor `EasingPicker` emits on mount with no write-through prop, so a naive binding would clobber the stored curve every time the panel opened. The panel recognises the echo **by value** — including the awkward case where no preset matches the stored quad and the picker mounts on its catalogue default (`:120-128`) — and the missing `initialPoints` prop is booked into `KF-TO-GLASSUI-BG.md §FORWARDING` rather than worked around locally. Correct handling of a vendor contract gap, plus correct escalation.
- **S-7 — the store binding is keyed to the animation's identity at both ends.** `animationOptionsStore.ts:83-122` keys by `(superKey, animationId)`; `ControlsPaneWrapper.vue:46` keys the render by `host.animation.id`, and `:41-43` states the invariant ("an instance is BORN with its animation and dies with it"). That pairing is what kills K-3, and the T.B9 one-keyspace migration + orphan GC (`storeUtils.ts:35-77`) is the same discipline applied to the persisted layer.

---

## 7. Corpus reconciliation

- **`lane-frontend.md` F-1 (glass-ui phantom dep, RED)** — **CONFIRMED and extended twice.** Confirmed on the tree (manifest + lockfile + install shape + no alias). Extended: (i) the missing **pin**, not just the missing declaration, is what bites — the file was authored against 3.4.0/4.0.1 and resolves 7.0.0, and M-1 is the measured consequence; (ii) `dock.js` carries the `@mkbabb/keyframes.js` back-edge, so `:421` sits on the undeclared side of the deliberate cycle `§8` describes. Lane-frontend's ordering ("**F-1 first** … nothing below is reproducible until this lands") is right, and M-1 says the landing must be a *version-aware* pass over call sites, not just a manifest line.
- **`lane-frontend.md` S-1…S-8 (shadow census)** — **no overlap.** `ChannelOptions` renders no shadow component: `Card*`, `Select*`, `Separator`, `DockControl`, `Tooltip*`, `LabeledSelect`/`LabeledInput` are all vendor. Its host `ChannelControls.vue:74` renders `KfPillTabs` (**S-1**), so an S-1 landing changes this file's *parent*, not this file. Its `TimingFunctionPanel` already completed the analogous adoption (bespoke `EasingEditor` → vendor `EasingPicker`, `:3-11`) — evidence the S-row programme works, and (M-3) that adopting a vendor component makes lazy mounting *more* important, not less.
- **`lane-frontend.md` §4 roster row** `| 609 | channel-controls/ChannelOptions.vue | G |` — line count and glass-ui inventory match exactly at the same HEAD.
- **`lane-frontend.md` §7.2 (colocation mirrors value.js)** — **contradicted in this cluster.** N-9: `advancedOpen`, a panel-navigation flag, lives in the timing-function editor under a docstring describing a different ref. Colocation is right at the directory level and wrong at the module level here.
- **`lane-library.md` §4.6** (demo parse-consumer row `animationDescriptions.ts:76 parseTimingFunction(value)`) — this is the seam the whole UI gates on (`:206`, `useTimingFunctionEditor.ts:51-63, 140`). **Extension for the parser wave's blast radius:** a `parseTimingFunction` behaviour change does not merely mis-classify here — via `kind === undefined → throw TypeError` it becomes an **uncaught throw in a mount hook** (M-6) and in a Select handler (I-2), and per M-6 it *permanently* empties two dropdowns. The demo-side consequence of that row is a crash surface, not a display glitch. B-1's probe strengthens the same row from the other side: `parseCssScalar("")` and `parseCssScalar("5")` are the two intermediate keystroke states the demo persists unvalidated. No contradiction with lane-library found anywhere.

---

## 8. Remediation order (smallest edit → largest payoff)

1. **B-1** — persist only what the setter accepted (move the store write inside the guard, via N-1's factory so it lands once). *Un-bricks scenes.*
2. **B-2** — route through `setTimingFunction(literal)` **and** propagate the same twinned `Easing` to `frames[]`. Restores WAAPI eligibility and unbreaks Export CSS. Forward the `applyTimingFunction` live-options gap to the engine tranche.
3. **M-3** — delete `:progress` (`:317`) and `progress?: number` (`TimingFunctionPanel.vue:69`); `v-if` the detail panel on `showDetailPanel`. *Two deletions; removes all per-frame work from inactive channels and stops mounting a vendor picker per channel.*
4. **M-1** — `is-open`→`open` ×3, `tooltip`→`description` ×10, drop `label-class` ×5 and `:descriptions` ×2 (or file the glass-ui asks). Follow immediately with **M-2** so it cannot recur — that pass also closes N-13 and N-15.
5. **M-6** — read `kfEngine()` synchronously at setup; the async hook, both empty refs, and the throw-ordering hazard all dissolve together. **M-4** — make the re-apply conditional on real divergence.
6. **M-7** (add `duration` to the sync bridge), **M-8** (`:inert` on inactive rows, per `ChannelControls.vue:136`) — independently landable.
7. **M-5** — import `bezierPresets` from `@mkbabb/value.js/easing`, delete `NAMED_EASING_BEZIER`, render `convertedFromName` (or delete it deliberately). A test pairing `EASING_GROUPS` against the preset table pins it (N-14).
8. **B-3 / F-1** — declare + lock glass-ui **7.0.0** and regenerate; nothing above is reproducible on a clean runner until it lands.
9. **N-7, N-8, N-9, N-11, N-12** — dead-surface sweep.

---

## 9. R3 — third independent pass

*Read set identical to §1, re-read whole; additionally `state/controlSurfaces.ts`, `scenes/amiga/{useAmigaDemo.ts,AmigaScene.vue}`, `scenes/square/useSquareDemo.ts`, `keyframes/utils/parseAnimationCSS.ts`, `compile/adapter.ts`, `compile/emit/format.ts`, `presets/{catalog,classic-data}.ts`, `engine/play-lifecycle.ts`, `test/demo/**`. Three read-only `node` probes against installed artifacts only; transcripts inline.*

**Orientation.** R1 and R2 both audited the panel as a **writer** — what it pushes into the engine and the store. R3 audited it as a **reader**: what it renders, and what it re-derives on mount from state it did not write. That axis produced one falsification and four defects the write-side audit structurally could not see.

### 9.0 — CONTRADICTION · M-5's `step-start` sub-claim is false, and the truth is worse

R2's M-5 asserts (line 222) that `timingFunctionKind("step-start")` resolves to the keyword `"step-start"`. Probe against the **installed** value.js 4.0.0, replicating `timingFunctionState`'s exact branch order (`animationDescriptions.ts:68-96` — `parseTimingFunction` first, registry second):

```
$ node --input-type=module -e "import {parseTimingFunction} from '.../value.js/dist/subpaths/css.js';
                               import {easing} from '.../value.js/dist/subpaths/easing.js'; …"
name                          parse-kind    registry
step-start                    steps         FAIL
step-end                      steps         FAIL
steps                         FAIL          FAIL     (→ draft branch, animationDescriptions.ts:69-71)
cubic-bezier                  FAIL          FAIL     (→ draft branch)
steps(4, jump-end)            steps         FAIL
cubic-bezier(0.2,0.65,0.6,1)  cubic-bezier  FAIL
ease-in-sine                  FAIL          ok       (→ registry branch, kind = the name)
smooth-step-3                 FAIL          ok
ease-in-bounce                FAIL          ok
linear / ease / ease-in / ease-out / ease-in-out   parse-kind = the keyword
```

value.js parses `step-start`/`step-end` as members of the **`steps` family** (they are CSS shorthands for `steps(1, jump-start|jump-end)`), so `parsed.value.kind === "steps"` and `timingFunctionKind` returns `"steps"`. M-5's four-curve set is therefore two: `smooth-step-3` and `ease-in-bounce` (both registry-resolvable, both absent from `NAMED_EASING_BEZIER`, both flattened to `[0,0,1,1]` — M-5 confirmed for those). `step-start`/`step-end` never reach that branch. What they reach instead is M-10.

*Falsifier for the falsification:* a value.js build where `parseTimingFunction("step-start").value.kind !== "steps"`. The probe was run against `node_modules/@mkbabb/value.js@4.0.0` — the version the demo actually resolves — not against source.

### 9.1 — **B-4 · BLOCKER** · a curve authored in the keyframes pane is silently rewritten to a different curve on the next tab switch

*Distinct from M-4 (which is scene-vs-panel authority) and from B-2 (which is twin-stripping): this is the destruction of **typed user input** by re-derivation from stale sibling state.*

The chain, four files:

```
1. useKeyframeOps.ts:81-82     if (options?.timingFunction) stored.timingFunction = options.timingFunction;
                               ← the serialized literal, e.g. "cubic-bezier(0.36, 0, 0.66, 1)"
                                 (parseAnimationCSS.ts:42-49, serializeTimingFunction)
                               ← and NOTHING in this path writes cubicBezierOptions.controlPoints / stepOptions
2. ChannelControls.vue:97-102  <ChannelOptions v-if="… selectedControlSurface === 'controls'">
                               ← Keyframes→Controls is a FRESH MOUNT (contrast :129-137, where the
                                 Monaco pane is deliberately force-mounted precisely to avoid remount cost)
3. ChannelOptions.vue:538-542  onMounted → updateTimingFunctionFromName(stored.timingFunction)
4. useTimingFunctionEditor.ts:152-155   kind === "cubic-bezier" → cubicBezierEasing(...stored.cubicBezierOptions.controlPoints)
                              :166-167   → persists timingFunctionLiteralFor("cubic-bezier") = the RE-DERIVED literal
```

The literal is used **only** to compute the kind; the numbers are then thrown away and rebuilt from `cubicBezierOptions.controlPoints`, which the keyframes pane never touched and which still holds the store default `[0.2, 0.65, 0.6, 1]` (`animationOptionsStore.ts:57-59`).

**Failure scenario.** In the Keyframes tab type `animation-timing-function: cubic-bezier(0.36, 0, 0.66, 1)` (the amiga bounce, copied from `useAmigaDemo.ts:130`). It compiles, it runs, the store records the literal. Switch to Controls. Both the engine and the store now hold `cubic-bezier(0.2, 0.65, 0.6, 1)`. Switch back to Keyframes: the CSS the editor re-serializes is the *new* curve. The authored value is gone from every surface, with no diagnostic and no undo. Identical for steps: `steps(4, jump-end)` → `steps(100, jump-start)` (`:149-151` reads `stepOptions`, default `{100, "jump-start"}` at `animationOptionsStore.ts:52-55`).

This is the exact inverse of the discipline S-3 praises. I.W2.S3 made the store hold a *complete re-parseable literal* so the construction path round-trips — and then the reader discards the literal's payload and reconstitutes it from a second, unsynchronised copy of the same fact. **Two representations of one curve** (`animationOptions.timingFunction` and `cubicBezierOptions.controlPoints`/`stepOptions`) with a writer for each and a reconciler for neither.

**Falsifier.** (a) `useKeyframeOps` also syncing the quad — read `:72-82` whole; it writes six fields, none of them the quad. (b) The literal's numbers being honoured — `:152-155` takes no argument from the literal; `timingFunctionLiteralFor` (`:120-133`) likewise reads only the stored quad. (c) The controls pane not remounting on tab switch — `ChannelControls.vue:98` is `v-if`. (d) A reconciler parsing the literal back into the quad — `grep -rn "controlPoints" demo/` gives writers at `useTimingFunctionEditor.ts:198,203` and `TimingFunctionPanel.vue:143` only, all inside the panel itself. **Would kill it:** any of (a)–(d).

### 9.2 — **M-9 · MAJOR** · the five fields render the store, never the animation — so on four of six scenes they render fiction

Every field binds the persisted bucket (`:26-29`, `:45-48`, `:64-76`, `:92-95`, `:116-119`), and `getStoredAnimationOptions` seeds a fresh bucket from `defaultStoredAnimationOptions` — it never reads `animation.options` (`animationOptionsStore.ts:83-122`, verified whole). The panel is truthful only where the store is *also* the constructor input, i.e. the cube scene (`useCubeDemo.ts:52-60, 73-79, 103-109`). Everywhere else the scenes hard-code their options:

| scene | animation's real options | what the panel shows |
|---|---|---|
| amiga spin / X | `duration: X_PERIOD_MS = 8000`, `timingFunction: "linear"` (`useAmigaDemo.ts:38, 93-96, 110-113`) | `5s`, `ease-in-out` |
| amiga Y | `duration: Y_PERIOD_MS = 1600`, `cubic-bezier(0.36, 0, 0.66, 1)` (`:39, 127-130`) | `5s`, `ease-in-out` |
| square | `duration: 2000`, `fillMode: "forwards"` (`useSquareDemo.ts:343-346`) | `5s` |
| all non-cube | engine default `direction` | `alternate` (`animationOptionsStore.ts:47`) |

The panel becomes accurate only once the user edits a field — i.e. only after it has overwritten the value it was misreporting. And the misreport is not inert: it is the *input* to M-4/B-4's mount-time re-apply, which is how a display default becomes an engine mutation.

The seam to fix it exists and is already used by the sibling writer: `reverseCSSTime(animation.options.duration)` (`useKeyframeOps.ts:73-75`) converts engine-ms back to a CSS literal. Seeding the bucket from `animation.options` at creation closes M-9, M-4 and the amiga half of §9.3 in one edit.

**Falsifier.** A seed step from `animation.options` into a fresh bucket. Searched `getStoredAnimationOptions`, `storeUtils.ts`, `ControlsPaneWrapper.vue`, and all six scene modules: the only writer of `animationOptions.duration/delay/iterationCount/direction/fillMode` outside this panel is `useKeyframeOps.ts:73-79`, and it runs only on a keyframes-string edit. **Would kill it:** finding that seed.

### 9.3 — **M-10 · MAJOR** · picking `step-start` or `step-end` yields `steps(100, jump-start)` — both of them

Follows directly from §9.0. `EASING_GROUPS` offers both as selectable items (`easingGroups.ts:94-96`); the Select emits the name into `updateTimingFunctionFromName` (`ChannelOptions.vue:212-217`); `timingFunctionKind` returns `"steps"`; the steps branch ignores the picked name entirely and builds from the stored step options (`useTimingFunctionEditor.ts:149-151`), persisting `steps(100, jump-start)` (`:166-167`).

So `step-start` and `step-end` — CSS's two *single-step* keywords — both produce a **100-step, jump-start** curve, and produce the *same* one. The Select's `:model-value` then re-derives `"steps"` (`:205-211`), so the highlighted row visibly jumps off the item the user clicked onto a different one.

The demo's own helper knows the right answer and can no longer be reached:

```ts
// timingCurveUtils.ts:42-46 — dead code, and it documents the regression
export const namedEasing = (name: string): EasingFunction => {
    if (name === "step-start") return steppedEasing(1, "jump-start");
    if (name === "step-end")   return steppedEasing(1, "jump-end");
```

Those two lines are unreachable for their own keywords: the kind gate rewrites `step-start` to `steps` before `namedEasing` is called. The catalogue test knows the pair is special — `easing-catalog.test.ts:24-29` exempts them from the registry check as `editorEntries` — but `timingFunctionState` grants draft status only to `cubic-bezier` and `steps` (`animationDescriptions.ts:69-71`), so the exemption is asserted in the test and absent from the classifier. No test covers `timingFunctionKind("step-start")` (the only kind assertions in `test/` are `steps(4, jump-end)`, `cubic-bezier(…)`, `steps(` and `ease-out-expo`, `value4-editor-boundary.test.ts:73-90`).

**Falsifier.** `parseTimingFunction("step-start")` returning anything but kind `steps` (probed, §9.0); a draft-branch entry for the two keywords (absent); a `kind === "steps" && the source was a keyword` special case (absent). **Would kill it:** adding either.

### 9.4 — **N-17 · MINOR (self-downgraded)** · the mount-time write flattens per-keyframe easing — a first-class engine capability, currently unreachable in the demo for a *second* reason

*Filed at MAJOR on first derivation and downgraded here after the reachability probe failed. Recorded at the lower severity with the failed half shown, because a false MAJOR is worse than a missed one.*

B-2 reads the `frames.forEach` write as *papering over an engine gap* (`applyTimingFunction` not propagating to compiled frames) and forwards that gap — correct, and I keep it. The other half is that the write is **destructive whenever the frames do not agree**, and the engine goes to real trouble to let them disagree:

```
compile/adapter.ts:96          timingFunctions: Map<string, string>   "per-keyframe `animation-timing-function`, keyed by percent string"
compile/emit/format.ts:75      "CSS Animations L1: `animation-timing-function` at a stop applies to the interval…"
compile/emit/format.ts:96,271  decls.push(`  animation-timing-function: ${frameEasing};`)
engine/animation.ts:227-236    addFrame(start, vars, transform, timingFunction, composition)   ← per-stop easing is a public parameter
presets/classic-data.ts:67-87  the `flip` preset alternates ease-out / ease-out / ease-in / ease-in / ease-in per stop
```

`useTimingFunctionEditor.ts:103-105` overwrites **every** frame with one animation-level object, unconditionally, at mount. So the capability is erased for any animation that has it.

**Why it is MINOR and not MAJOR: no shipped demo animation currently has it, for two independent reasons.**
1. No mounted scene authors per-stop easing. `grep -rn "animation-timing-function" demo/` → three hits, none in a scene animation (`useEasingDemo.ts:285` is prose; `AnimatedText.vue:106,110` is a CSS `@keyframes` block, not an engine animation). The presets the demo mounts (`hover`, `shake`, `warpLeft`, `jumpUp`) carry no per-stop `animation-timing-function`; the one preset that does (`flip`) is not mounted.
2. **The demo's own Monaco ingest drops it before construction.** `parseAnimationCSS.ts:57` returns `{ keyframes: resolved.keyframes, options, values }` — `resolved.timingFunctions`, the adapter's per-percent map (`compile/adapter.ts:96`), is **discarded**, and `useKeyframeOps.ts:66-69` then calls `.fromKeyframes(keyframes)` with the vars map alone. A user who types per-stop `animation-timing-function` into the keyframes pane never gets it into the frames in the first place.

I asserted the opposite on first derivation ("*which `parseAnimationCSS` ingests via the adapter*"). It does not. Reason 2 is a **separate defect of a different file** — a fidelity hole in the demo's CSS→engine round-trip, on the seam `lane-library.md §4.6` tracks — and is forwarded, not filed here.

What remains, and why it is still a defect: the write is unconditional and pre-emptive (it fires at mount, before any user intent), so it is a live tripwire under both plausible near-term changes — closing the `parseAnimationCSS` hole above, or mounting any preset with per-stop easing. The correct shape is the one §9.7 prescribes: propagate to `frames[]` only when the frames were already uniform.

Note the interaction with WAAPI: per-frame divergence is exactly what `waapi/eligibility.ts:139-150` checks (`frames[i].timingFunction.fn !== firstTF.fn` → ineligible). Flattening would make a multi-easing animation *look* uniform to the eligibility gate while B-2 simultaneously makes it ineligible for want of a twin — two wrongs cancelling into "nothing delegates", which is part of why neither has been noticed.

**Falsifier (the one that fired).** "Show a demo path producing divergent per-frame easing" — searched all six scenes, the preset call sites, and the Monaco ingest; none produces one, and the ingest actively prevents it. The engine-side capability claim survives (`frames[i].timingFunction` is read at interp and at emit); the demo-side reachability claim did not.

### 9.5 — additions to the minor/info tail

- **N-16 · `Teleport` is imported from `vue` and the import is inert.** `:437`. `<Teleport>` is a compiler built-in resolved by tag name (like `<Transition>`/`<Suspense>`); the named import neither enables nor affects it. Same pattern at `ChannelControls.vue:236`. Harmless, and a reliable signal that the import block is not being read as code. *(R3)*
- **I-6 · one version-drift comment re-verifies TRUE, which narrows B-3's indictment.** `:142-146` claims *"glass-ui 3.4.0 `<LabeledField>` exposes only default+error slots (no label-action slot, VERIFIED LabeledField.vue.d.ts)"* — and against the **installed 7.0.0** that is still exactly right: `dist/components/labeled-field/LabeledField.vue.d.ts` declares `__VLS_Slots = { default(props: LabeledFieldSlotProps): unknown; error?(): unknown }`. So the wrapper fallback at `:147-190` is warranted *today*, three majors after the version it cites. Recorded as fair comment: B-3/M-1's charge is that the citations are unpinned, not that every one of them is now wrong — and a repair wave should re-verify rather than assume-stale. The booked glass-ui ask (a `label-action` slot) remains open and correctly booked. *(R3)*

### 9.6 — two superlatives the write-side passes did not reach

- **S-8 — `<Teleport … defer>` is the right idiom used for its actual purpose.** `:377`. `#controls-ribbon-target` is rendered by `RibbonBar` *later in the same parent* (`ControlsPaneWrapper.vue:90-104`), which is precisely the case Vue 3.5's `defer` exists for; without it the target-missing warning is a mount-order lottery. Combined with the `v-if="active"` gate (K-4's single-ribbon invariant) and with provide/inject following the component tree rather than the DOM — so the teleported ribbon still resolves the `TooltipProvider` at `ChannelControls.vue:2` despite landing elsewhere in the document — three separate subtleties are handled in one attribute. *Falsifier:* a Vue version below 3.5 (`vue: ^3.5.35`), or a target rendered before this component.
- **S-9 — the collapse CSS pays for its own side effects instead of dropping them.** `:552-583`. `grid-template-rows: 0fr ↔ 1fr` is the standard height animation; what is not standard is noticing that the `overflow:hidden` it *requires* clips focus rings and compensating exactly — `padding: 2px; margin: -2px` with the arithmetic written down (`ring-2 + ring-offset-2 = 4px`). Add `max-height: min(50dvh, 480px)` with `dvh` chosen for a stated reason (mobile URL-bar over-reservation, `:585-588`) and this is the one region where the commentary earns its length. **Held in tension with M-8:** the same block leaves collapsed controls in the tab order. Careful about the ring, silent about `inert` — the two are compatible findings and both should land.

### 9.7 — R3 remediation delta (folds into §8)

- **B-4 lands with §8 step 2**, and only if the fix is `setTimingFunction(storedLiteral)` — i.e. *pass the stored literal through*, not re-derive it. Re-deriving is the bug; a fix that keeps the re-derivation and merely adds the twin fixes B-2 and leaves B-4 shipping.
- **M-9 lands before §8 step 5's M-4.** Seeding the bucket from `animation.options` at creation makes M-4's "conditional on real divergence" trivially satisfiable (there is no divergence at t=0) and removes the display fiction in the same edit. Do it first; M-4 becomes a two-line guard instead of a reconciliation design.
- **M-10** is one branch: treat a `steps`-kind classification whose source was the bare keyword `step-start`/`step-end` as `steppedEasing(1, …)` — i.e. let `namedEasing`'s existing two lines be reachable. Pin it with the test `easing-catalog.test.ts` already implies (`editorEntries` should assert a *resolution*, not an exemption).
- **N-17** rides step 2: propagate one twinned `Easing` to `frames[]` **only when the frames were already uniform**; a divergent set is authored data, not stale state. Cheap now, load-bearing the moment the `parseAnimationCSS` per-stop drop (§9.4, forwarded) is closed.
- **N-16, I-6** — sweep with N-7/N-8/N-11/N-12 at step 9.
- **Forwarded, not filed here:** `parseAnimationCSS.ts:57` discards `resolved.timingFunctions`, so the demo's CSS→engine round-trip silently loses per-stop `animation-timing-function`. Belongs to the keyframes-pane lane, on `lane-library.md §4.6`'s seam.

---

*Everything above describes defects; nothing was changed. No file in `keyframes.js`, `glass-ui` or `value.js` was written, mutated or executed; the five `node` invocations across R2 and R3 were pure reads of installed library functions (`@mkbabb/value.js/{css,easing}`, `keyframes.js/dist`, `@mkbabb/glass-ui/dist`). The only write performed by this lane is this document: R3 supersedes the R1+R2 pass at the same path with every prior finding preserved and attributed, one sub-claim explicitly falsified in place (§9.0) rather than silently corrected.*
