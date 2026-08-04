claude-opus-5[1m]

# CHALLENGE · CubeScene · axis L (LIBRARY)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/cube/CubeScene.vue` (287 lines; template 1–24, script 26–256, style 258–287).
**Substrate** keyframes.js `master` HEAD `8281638c fix(demo-shell): provide tooltip context for the routed control group` (`git log --oneline -3`). Same HEAD the formation census lanes measured (2026-08-03), so lane ids are directly comparable.
**Mode** static, read-only. No installs, no dev server, no browser tooling. Every livable-only consequence is marked **UNPROVEN-NEEDS-LIVE** and reserved for the SS-13 visual audit. No file in keyframes.js (or any product repo) was written or executed; this file is the sole write.

**Posture** the component was assumed DEFECTIVE until the tree proved otherwise. It did not. Twenty-five findings survive their own falsifiers; seven superlatives are entered on the same evidentiary standard (L-18 runs both ways). Several *plausible* accusations were killed by the tree and are recorded in §7.2 so the next reader does not re-litigate them.

---

## 0. Headline

| id | finding | sev |
|---|---|---|
| **L-1** | CubeScene's four glass-ui imports land in the **entry chunk** (App.vue imports it statically) from a package that is in **neither `package.json` nor `package-lock.json`**. `npm ci` cannot build the demo. | **BLOCKER** |
| L-2 | `isPlaying` (`:65`) is a ref **nobody ever writes** — threaded to three consumers; one CSS rule (`.idle-hover.playing .cube`) is therefore permanently dead. | MAJOR |
| L-3 | `syncTransformations(reset=true)` writes `Math.acos(m00)` into `rotate.x` — **NaN** whenever any scale > 1, and **radians into a degrees field**. Reached by the Reset button CubeScene itself renders (`:189`). | MAJOR |
| L-4 | The drag watcher rebuilds `matrix3dEnd` from T·R·S only — **silently destroying every hand-edited off-diagonal cell** (shear/perspective) the matrix editor exists to author. | MAJOR |
| L-5 | Matrix cells are **free-text** glass-ui `Input`s (`:start`/`:end`/`:step` are not `InputProps`); `parseFloat("-")` → NaN → `withMatrixCell` **throws per rAF frame** for 300 ms. | MAJOR |
| L-6 | `tabsContent` is instantiated **once per transport channel** — three `MatrixEditor`s (48 `Input`s) mount whenever the matrix surface is active; two are `display:none`. | MAJOR |
| L-7 | The unmount-persisted transform is restored into the model but **never painted at mount** — the carry-over is invisible until the first interaction, which then snaps. | MAJOR |
| L-8 | **No `.vue` file in this repo is ever type-checked** (`check` = bare `tsc`; CI runs `check:lib` only). CubeScene's 231-line script and MatrixEditor's template are outside every gate — and the store type omits `selectedMatrixCell`, which MatrixEditor reads and writes. | MAJOR |
| L-9 | `matrix3dStart`/`matrix3dEnd` are **deep** `ref()`s replaced wholesale ~60×/s, each replacement re-proxying 17 nested objects **and** re-constructing + re-compiling a whole `CSSKeyframesAnimation`. The same tree uses `shallowRef(markRaw())` correctly four lines away. | MAJOR |
| L-10…L-20 | dead exports, dead imports, false prose, an unstopped animation, un-stoppable tweens, a keyboard-unreachable control, a stale expose comment, a double-registered scene, expose-type drift, asymmetric persistence, asymmetric optional chaining | MINOR ×11 |
| L-21…L-25 | comment archaeology (26 % of the script), home-bucket keying, a constant `computed`, pointer-class asymmetry, an unnamed `role=group` | INFO ×5 |
| L-26…L-30 | *(round 2, §9)* a dead emit wire, a duplicated wrapper element, dead facet metadata, a prop name that lies, an auto-dismiss that closes under the pointer | MINOR ×5 |
| L-31 | *(round 2, §9)* the panel gates on the **raw** store where the parent gates on the **projected** surface | INFO |
| **P-1…P-7** | superlatives — `adoptCompiled` (the demo *drove* an engine verb), the visibility-pause contract, the PRM gate, `markRaw`+`shallowRef` discipline, a correctly-torn-down timer, `transformMath.ts`'s total boundary validation, facets-as-data | **exemplary** |
| **P-8, P-9** | *(round 2, §9)* the LIGHT/HEAVY engine-import boundary observed in both directions; a measured repaint elision + the unit's colocation | **exemplary** |

**Tally — defects 31 (blockers 1, majors 8, minors 16, infos 6) · superlatives 9.**
*(Round 1 = L-1…L-25 / P-1…P-7, §§2–8. Round 2 = L-26…L-31 / P-8…P-9, §9 — an independent second pass over the same closure; §9.0 records which round-1 findings it re-derived, which it could not fault, and where it declines to re-open a round-1 kill.)*

---

## 1. The import closure actually read

Direct imports of `CubeScene.vue` (all read whole):

```
vue                                     (framework)
@mkbabb/glass-ui  → Popover, PopoverContent, PopoverTrigger, Button      :33–38
@lucide/vue       → Lock, LockOpen, RotateCcw                            :49
./matrix-editor/MatrixEditor.vue                                         :51   (158 L)
./CubeTarget.vue                                                         :52   (239 L)
@state            → getStoredAnimationGroupControlOptions                :54   (state/index.ts + controlOptionsStore.ts)
@composables/scene-facility → facilityFromGroup                          :55   (127 L)
./matrix-editor/useTransformState                                        :56   (227 L)
./useCubeDemo     → useCubeDemo, SCENE_ID, CUBE_ANIMATION_NAMES          :57   (191 L)
./cubeTransformStore → useCubeTransform                                  :58   (20 L)
```

Second order, read because the data flow crosses them: `matrix-editor/transformMath.ts`, `cubeKeys.ts`, `orbital-drag/{index,types}.ts`, `orbital-drag/OrbitalDrag.vue`, `useCubeRelit.ts`, `CubeTarget.css`. Consumers read to establish the contract: `app/App.vue`, `app/scene/{scenes,sceneExposedApi,useSceneMachineShellBinding}.ts`, `components/instrument/shell/EditorShell.vue`, `transport/AnimationControlsGroup.vue`, `transport/controls-pane/{ControlsPaneWrapper,RibbonBar}.vue`, `transport/channel-controls/ChannelControls.vue`. Producer evidence read from the **installed** copy only: `node_modules/@mkbabb/glass-ui/dist/**`, `node_modules/reka-ui/dist/HoverCard/HoverCardTrigger.js`. Engine evidence: `src/animation/{physics/numeric.ts,engine/compile-bridge.ts,engine/animation.ts}`.

---

## 2. BLOCKER

### L-1 · The phantom glass-ui dependency bites CubeScene *in the entry chunk*

**Claim.** `CubeScene.vue:33–38` imports `Popover`, `PopoverContent`, `PopoverTrigger`, `Button` from `@mkbabb/glass-ui`. That package is declared **nowhere**:

```
$ grep -n "glass-ui" package.json package-lock.json     → (no output, both files)
$ node -e "console.log(require('./node_modules/@mkbabb/glass-ui/package.json').version)"  → 7.0.0
$ grep -n "glass" vite.config.ts   → 4 hits, ALL prose in the alias docblock; NO resolve.alias entry
```

This is lane-frontend **F-1**, confirmed unchanged at the current HEAD. What lane-frontend did not resolve is *where it lands*: `App.vue:155` imports `CubeScene` **statically** (`import CubeScene from "../scenes/cube/CubeScene.vue"`), because home renders the cube as its hero backdrop (`App.vue:283–286`). So CubeScene — and through it the glass-ui root barrel — is in the **entry** chunk, not a lazy scene chunk. The failure is not "the cube scene is broken"; it is "the app does not build".

**Severity BLOCKER.** `npm ci` reconstructs `node_modules` strictly from the lockfile; with zero glass-ui entries the very first resolution of `@mkbabb/glass-ui` fails, and it is reached from the entry module graph. The working tree survives only on the `Jul 16 05:17` install that predates whatever removed the declaration (`ls -ld node_modules/@mkbabb/glass-ui`). Note the aggravating pair: `.npmrc` is `legacy-peer-deps=true`, and `vite.config.ts:28–36` documents that glass-ui's own bare `@mkbabb/keyframes.js` import is only satisfied by the demo's **self-alias** — i.e. the resolution graph is held together by two undeclared edges at once.

**Falsifier.** Any of: (a) a `@mkbabb/glass-ui` entry in `package.json` **or** `package-lock.json`; (b) a `resolve.alias` / `optimizeDeps` mapping for the specifier in `vite.config.ts`; (c) evidence that the demo build is never run from a clean checkout (it is — `.github/workflows/ci.yml:53–75`, job `demo-correctness`, runs `npm ci` (`:66`) → `npm run gh-pages` (`:72`) nightly, and `deploy-pages.yml` builds the published demo). Any one of these kills the claim.

---

## 3. MAJOR

### L-2 · `isPlaying` is a write-nobody ref threaded to three consumers

**Claim.** `CubeScene.vue:65` `const isPlaying = ref(false)` is never assigned in CubeScene, and never assigned from outside:

* the exposed API type has no such member — `sceneExposedApi.ts:16–34` declares `facility/tabsContent/ribbonContent/headerLeft/superKey/autoPlays/isStarted`, **no `isPlaying`**;
* the only external writer into the scene proxy is `useSceneMachineShellBinding.ts:261–267`, and it writes `isStarted` only;
* `grep -rn "isPlaying =" demo --include=*.vue --include=*.ts` yields three hits, all prose in *other* scenes' docblocks.

Three consumers therefore read a constant `false`:

1. `CubeScene.vue:18` → `CubeTarget` prop `is-playing`;
2. `CubeTarget.vue:20` → `{ playing: isPlaying }` on `.idle-hover`, so the class **never applies**, so `CubeTarget.css:58` `.idle-hover.playing .cube { will-change: transform }` is **dead CSS**. The G5 "transient compositor promotion while moving" contract documented at `CubeTarget.css:52–57` survives only through its `.graph:hover` sibling — the *playing* half, the one that matters for the group spin, never fires;
3. `CubeScene.vue:78` → `useTransformState`'s first parameter `isGroupPlaying` (`useTransformState.ts:22`), which the 227-line body **never reads** (`grep -c isGroupPlaying` → 1, the declaration).

Incidentally `CubeTarget.vue:14` computes `props.isPlaying || props.isStarted`, so the OR's left operand is a constant too.

**Severity MAJOR** — a dead reactive input with a real behavioural consequence (a lost compositor hint on the exact path the T.G3/G5 perf work was written for), plus a dead composable parameter that misrepresents the contract.

**Falsifier.** Any write to `isPlaying` — a `sceneRef.value.isPlaying = …`, a `v-model` on the exposed member, an `Object.assign` over the expose proxy — or a `.idle-hover.playing` selector reachable by some other class writer. I found none in 184 demo `.ts`/`.vue` files.

---

### L-3 · `syncTransformations(reset)` writes NaN — and radians into a degrees field

**Claim.** `useTransformState.ts:69–75`:

```ts
transformSliderValues.value.rotate.x = Math.acos(values[0]);   // :69
transformSliderValues.value.rotate.y = Math.acos(values[5]);
transformSliderValues.value.rotate.z = Math.acos(values[10]);
transformSliderValues.value.scale.x  = values[0];              // :73  ← same datum, second meaning
```

Two independent defects in four lines.

**(a) NaN.** `values[0]` is `m00`, which carries the **scale** factor. `resetMatrix()` (`:177–182`) tweens the live matrix to identity over 500 ms with `reset=true`, and the frame callback calls `syncTransformations(true)` **every frame** (`:119`). If the user has scaled up — the pinch/ctrl-drag path in `OrbitalDrag` (`:189–191`), whose bound is `[0.4, 3]` (`transformMath.ts:19`) — the intermediate `m00` exceeds 1 and `Math.acos(>1)` is **NaN**. The NaN is written into `transformSliderValues`, which is the *shared* `v-model:transform` (`CubeScene.vue:21`) feeding (i) `OrbitalDrag`'s Euler→quaternion re-seed watch (`OrbitalDrag.vue:305–312` → `eulerDegreesToQuaternion(NaN)`) and (ii) `useCubeRelit`'s per-face `--lit` computed (`useCubeRelit.ts:47–60`, `r.x * DEG`). The terminal frame restores 0 (`acos(1)`), so the corruption is transient — but it is a NaN in the scene's rotation source of truth for ~0.5 s, and any unmount inside that window persists it (`CubeScene.vue:219–225` copies `rotate` **by value**).

**(b) Units.** `rotate` is degrees **everywhere else**: `updateTransformations` multiplies by `Math.PI/180` (`:145,149,153`), `useCubeRelit.litFor` multiplies by `DEG` (`useCubeRelit.ts:48–50`), the slider bound is `[-360, 360]` (`transformMath.ts:14`). `Math.acos` returns **radians** ∈ [0, π]. The assignment is dimensionally wrong by 57.3×; it is only invisible because `resetMatrix` always targets identity, where the answer happens to be 0.

**Severity MAJOR** — reached by a first-class UI affordance CubeScene itself renders (`CubeScene.vue:186–190`, the ribbon **Reset** button → `resetMatrix()`).

**Falsifier.** (a) dies if scale can never exceed 1 in `matrix3dEnd` — but `updateTransformations` composes `mat4.fromScaling` from `transformSliderValues.scale` (`:137–141`) whose upper bound is 3, and `updateMatrixCell` can set cell 0 directly to 3 (`transformMath.ts:19`). (b) dies if some consumer interprets `rotate` as radians — none does; both consumers convert *from* degrees.

---

### L-4 · A drag silently destroys every hand-edited matrix cell

**Claim.** The rAF-debounced drag watcher (`useTransformState.ts:197–215`) calls `updateTransformations()`, which **recomposes** the matrix from translate × rotate × scale alone (`:129–175`) and writes it to **both** endpoints:

```ts
matrix3dEnd.value   = createMatrix(transformationMatrix);   // :171
matrix3dStart.value = createMatrix(transformationMatrix);   // :172
```

`updateTransformations` has no shear and no perspective term. But the matrix editor deliberately exposes those cells — `getTransformFromIx` labels indices 3/7/11 as **P**erspective (`transformMath.ts:167`) and the remaining off-diagonals are editable too (`MatrixEditor.vue:11` iterates all 16 `args`). Worse, `syncTransformations(false)` — the path taken after **every** cell edit (`:91`) — copies back translate only (`:63–65`), leaving `rotate`/`scale` stale relative to the matrix the user just edited. So the very next drag reconstructs the matrix from *stale* R and S and *no* shear, and the user's edits are gone with no undo, no warning, and no dirty flag.

**Severity MAJOR** — silent data loss in the surface the whole `matrix-controls` facet exists to provide.

**Falsifier.** The watcher early-returns when `isGroupStarted` (`:200`), so the claim requires the matrix editor to be reachable *before* the group starts. It is: the facet is gated on the **Matrix channel being selected** (`CubeScene.vue:228–238` → `facilityFromGroup` `channelFacets` → `surfacesFor`), which is orthogonal to playback — `useSceneMachineShellBinding.ts:105–112` seats a default channel selection at bind time, before any PLAY. If a live probe shows the matrix panel is unreachable pre-start, the claim dies.

---

### L-5 · Matrix cells are free text; a lone `-` throws once per frame

**Claim.** `MatrixEditor.vue:16–40` renders glass-ui's `Input` with

```
:model-value="(Math.round(value.payload.value*100)/100).toFixed(2).replace(/\.0*$/,'')"
@update:model-value="(v) => updateMatrixCell(v, i)"
:start=… :end=… :step=…
```

`InputProps` (`node_modules/@mkbabb/glass-ui/dist/components/input/types.d.ts`) declares **no `start`, no `end`, no `step`**, and `type` defaults to `"text"` with a union that excludes `"number"`. So:

* the three bound "bounds" fall through as **fallthrough HTML attributes** — `step` is inert on a text input and `start`/`end` are not `<input>` attributes at all (invalid markup);
* nothing constrains the string; nothing sets `inputmode`, so mobile gets an alphabetic keyboard for a numeric matrix cell.

Then `useTransformState.ts:78–93`:

```ts
const toNum = typeof to === "string" ? parseFloat(to) : to;   // no NaN guard
…
void new NumericAnimation([{ value: from }, { value: toNum }], { duration: 300 })
    .play(({ value }) => { matrix3dEnd.value = withMatrixCell(matrix3dEnd.value, ix, value); … });
```

`parseFloat("-")`, `parseFloat("")`, `parseFloat("1e")` are all NaN; `NumericAnimation` lerps to NaN faithfully; `withMatrixCell` then hits its own guard and **throws** `TypeError: Matrix cell N must be a finite number` (`transformMath.ts:143–145`) — inside the engine's rAF frame callback (`numeric.ts:236–249`), once per frame for the full 300 ms. Typing the minus sign of a negative number is enough.

**Severity MAJOR** — a first-keystroke error posture. The validation exists (and is excellent, see **P-6**); the consumer simply never checks before entering the tween.

**Falsifier.** If glass-ui's `Input` sanitises its emission — it does not: the declared emit is `(value: string | number) => any` (`Input.vue.d.ts:4`) with no numeric coercion in the props contract — or if `RAFPlayback` swallows callback throws (unchecked; the throw site is a plain `onFrame?.(values)` call at `numeric.ts:247` with no try/catch in the visible frame). The *visible consequence* (console spam vs. a dead loop) is **UNPROVEN-NEEDS-LIVE**; the throw itself is source-provable.

---

### L-6 · `tabsContent` mounts once per channel — three MatrixEditors

**Claim.** `CubeScene.vue:170–181` returns a `MatrixEditor` whenever `storedControls.selectedControl === "matrix-controls"`. That render-fn is projected into the `tabs-content` slot, and the slot is instantiated **inside the per-channel `v-for`**:

```
ControlsPaneWrapper.vue:46–49   v-for="host in controlHosts" … <div v-show="selectedAnimation == host.name">
ControlsPaneWrapper.vue:77–84     <template #tabs-content><slot name="tabs-content" …/></template>
ChannelControls.vue:180           <slot name="tabs-content"></slot>          ← UNGATED
```

`ChannelControls`' slot carries no surface gate and no `active` gate (the comment at `:175–179` says so explicitly: "the scene gates its own body on the active surface"), and the wrapper's hosts are `v-show`-hidden (`ControlsPaneWrapper.vue:49`), not `v-if`-unmounted. The cube's facility has **three** channels (`useCubeDemo.ts:114–122` — Rotations, Matrix, Hover → `facilityFromGroup` maps `Object.entries(group.animations)`), so the matrix panel mounts **three times**: 48 `Input` components, 3 `Slider`s, 3 copies of the `storedControls.matrixOptions ??=` initialiser (`MatrixEditor.vue:120`), all bound to one shared store. Two thirds of it is `display:none`.

The scene *cannot* self-correct with the data it is given: `ControlsPaneWrapper` re-exposes `:selected-animation` on the slot (`:79–82`), but `App.vue:62` drops the slot props entirely (`<component :is="sceneRef?.tabsContent" v-if="sceneRef?.tabsContent" />` — no `v-bind`). CubeScene's own comment (`:166–169`) reasons only about the *surface*, never about the *host multiplicity*.

**Severity MAJOR** — a 3× mount of an editable 16-cell grid, and a latent correctness hazard the moment any per-instance state enters MatrixEditor.

**Falsifier.** Any of: `controlHosts` filtering to the selected channel (it does not — `ControlsPaneWrapper.vue:207–228` maps every channel with an `animation`); the else-branch slot sitting inside an `active`/surface `v-if` (it does not, `ChannelControls.vue:180`); or the cube exposing one channel (it exposes three). A live DOM probe counting `.matrix-grid` nodes settles it in one query.

---

### L-7 · The persisted transform is restored but never painted

**Claim.** `CubeScene.vue:214–226` persists the live transform on unmount, and `:78` seeds the next mount from it (`useTransformState.ts:36–50`, deep-copied + `mat4.clone`). Nothing paints it.

The scene has exactly **two** paint sites (`grep -rn transformTargetsStyle demo` → `useTransformState.ts:122` and `:208`, both inside callbacks): the reset-tween frame callback, and the drag watcher's rAF. Neither runs at mount — the watcher fires only on a *change* to `transformSliderValues` (`:197`), and mount is not a change. The third possible painter, `OrbitalDrag`'s container style, is **gated off**: `containerStyle` returns `{}` unless `applyTransformToContainer` (`OrbitalDrag.vue:63–64`), and `CubeTarget.vue:14` binds that to `props.isPlaying || props.isStarted` — both `false` on a fresh mount (and `isPlaying` is *always* false, **L-2**). The mount-time engine call, `setTargets`, only plays the graph-perspective intro on `graphEl` (`useCubeDemo.ts:154–170`); the group's three cube animations are seated but not played.

So the restored orientation lives in the model, invisible, until the first drag delta — at which point `updateTransformations()` composes restored-plus-delta and paints it in one step.

**Severity MAJOR** — the onBeforeUnmount persistence (the stated point of `cubeTransformStore.ts:6–8`, "persists across home ↔ cube") is inert on the pre-start path, which is exactly the home-hero path: drag M. Cubert on the landing, navigate to the cube, and the die is back at rest.

**Falsifier.** A mount-time paint I missed (a `style.transform` write, an `OrbitalDrag` path that renders the transform ungated, a CSS custom-property binding of `rotate`), or evidence that `isStarted` is restored `true` before first paint on the home→cube crossing (`useSceneMachineShellBinding.ts:157–211` defers SCENE_READY to the post-remount group, so the first paint precedes any start-state write — but a live trace would settle it). The *visual* snap is **UNPROVEN-NEEDS-LIVE**; the absence of a mount-time paint is source-provable.

---

### L-8 · No `.vue` file is type-checked anywhere — and the store type is wrong

**Claim, part 1 (the hole).** `package.json` scripts: `check` = `tsc --noEmit && tsc --noEmit -p tsconfig.test.json`; `check:lib` = `tsc --noEmit -p tsconfig.lib.json`. **Plain `tsc`, never `vue-tsc`** — and `vue-tsc` is not in `devDependencies` at all (`node -e` over the dep keys returns `@iconify/vue @lucide/vue @vitejs/plugin-vue @vueuse/core vue vue-router vue-sonner`). `tsc` does not parse `.vue`, so `<script setup>` bodies and templates are invisible to it even though `tsconfig.json` includes `demo/`. And CI never runs even the `.ts` half of the demo: `.github/workflows/ci.yml:41–42` runs `check:lib` (which is `tsconfig.lib.json` → `src/` only).

Net: CubeScene's 231-line script, its template, MatrixEditor's template, and every other SFC in the demo are **outside every automated type gate**, under a `tsconfig` that is otherwise strict to the point of `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes`.

**Claim, part 2 (what the hole hides).** `controlOptionsStore.ts:26` declares

```ts
matrixOptions?: { fixed: boolean };
```

with **no `selectedMatrixCell`** — yet MatrixEditor reads and writes it at `:24`, `:38`, `:64`, `:71`, `:77`, `:83`, `:88`. Under the repo's own compiler settings this is a hard error twice over (`Property 'selectedMatrixCell' does not exist` and `possibly undefined`), and `matrixCellMeta[i]` under `noUncheckedIndexedAccess` is a third. The initialiser `MatrixEditor.vue:115–120` slips through only because `defaultMatrixOptions` is a widened variable rather than a fresh object literal, so excess-property checking never fires — an accident, not a design.

**Severity MAJOR** — the contract between the scene, the editor, and the persisted store is *documented in a type* that does not describe the data, and nothing will ever tell anyone.

**Falsifier.** A `vue-tsc` invocation in a Makefile / gate script / pre-commit hook (`grep -rn vue-tsc package.json .github/workflows Makefile` → no output), or a second `matrixOptions` declaration that adds the member (there is none; `grep -rn "selectedMatrixCell" demo` hits only MatrixEditor).

---

### L-9 · Deep refs and a per-frame recompile on the hot path

**Claim.** `useTransformState.ts:33–34` uses **deep** `ref()`:

```ts
const matrix3dStart = ref(createMatrix());
const matrix3dEnd   = ref(createMatrix());
```

Both values are **always replaced, never mutated** — `createMatrix` and `withMatrixCell` return fresh frozen-shaped objects (`transformMath.ts:69–89`, `:132–148`). Every replacement therefore mints a new deep reactive proxy over a 17-object tree (the call + 16 scalar payloads), 60×/s for the duration of every 300 ms cell tween and every 500 ms reset tween. `shallowRef` is exactly the right primitive here, and the file two doors down already knows it: `useCubeDemo.ts:65, 78, 108, 114` all use `shallowRef(markRaw(…))` (see **P-4**).

Compounding it, every one of those replacements fires `useCubeDemo.ts:69–71`:

```ts
watch([matrix3dStart, matrix3dEnd], () => {
    matrixAnim.value.adoptCompiled(compileMatrixAnimation());
});
```

`compileMatrixAnimation` (`:57–63`) **constructs a fresh `CSSKeyframesAnimation` and re-runs `fromVars`** — a full parse+compile — once per flush, i.e. once per animation frame for the length of the tween (~18 compiles per cell edit, ~30 per reset). Dragging the cell slider (`MatrixEditor.vue:61–91`) spawns a *new* 300 ms `NumericAnimation` per emitted tick, so the tweens overlap and the compiles continue for as long as the drag plus 300 ms.

**Severity MAJOR** (efficiency + engine-consumption idiom). Note this is *not* an `adoptCompiled` complaint — that verb is the right one and its use here is exemplary (**P-1**); the defect is the trigger rate feeding it.

**Falsifier.** If Vue's reactivity is not deep for `ref(object)` (it is), or if `adoptCompiled`/`fromVars` were free (they are not — `compile-bridge.ts:89–127` transplants a compiler and recomputes `_stableKeys` + composition flags, after `fromVars` has already parsed). A bench (not run here — no execution permitted) would quantify it; the call-count claim stands on source alone.

---

## 4. MINOR

### L-10 · Dead exports plus prose that asserts they are called
`useTransformState.ts:224–225` returns `syncTransformations` and `updateTransformations`. **Neither has an external caller** (`grep -rn` over the whole demo: every hit is inside the defining file). The comment at `:194–195` states "matrix editor sliders still call `updateTransformations()` explicitly for their own path" — **false**; the sliders call `updateMatrixCell` (`MatrixEditor.vue:33, 67–73`), and `updateTransformations` runs only from the internal watcher. *Falsifier:* any external `updateTransformations(` call site.

### L-11 · Dead imports and a dead type re-export
`useTransformState.ts:9–10` imports `MATRIX_AXES` and `transformSliderOptions`; the 227-line body references neither (both are consumed *inside* `transformMath.ts` at `:162` and `:179`). `:19` re-exports `MatrixCellMeta`, and its only consumer imports it from `transformMath` directly (`MatrixEditor.vue:99`). Invisible because `noUnusedLocals` is unset **and** L-8. *Falsifier:* a reference to either symbol in the file body.

### L-12 · Composable returns 3× what its sole consumer uses
`useCubeDemo` returns six members (`:183–190`); `CubeScene.vue:80–83` destructures **two** (`animationGroup`, `setTargets`). `matrixAnim`, `rotationAnim`, `hoverAnim`, `changeGraphPerspectiveAnim` have no other consumer (`useCubeDemo` is imported exactly once). *Falsifier:* a second consumer of the composable.

### L-13 · `changeGraphPerspectiveAnim` is never stopped
`useCubeDemo.ts:130–152` builds a standalone 650 ms `CSSKeyframesAnimation` and plays it at `:168`. It is **not** a group member (the group is constructed from three animations, `:114–122`), so `CubeScene.vue:216`'s `animationGroup.value.stop()` does not reach it. Unmount inside 650 ms (home → cube → elsewhere) leaves it ticking against a detached `graphEl`. *Falsifier:* an engine-side auto-stop on target detach, or a group registration I missed.

### L-14 · Tween handles are discarded, so nothing can cancel them
`useTransformState.ts:87` and `:105` both do `void new NumericAnimation(...).play(...)`. The engine ships `stop()` (`numeric.ts:254`) and the instance is thrown away, so: (a) an unmount mid-tween leaves up to 500 ms of rAF writing `matrix3dEnd.value` and painting a detached element (`:122`, `:208`); (b) a slider drag stacks N concurrent tweens over the same cell, each with its own stale `from`, so the last-scheduled frame wins per tick. `useTransformState` has **no teardown at all** — no `onScopeDispose`, and the pending `requestAnimationFrame` at `:203` is likewise uncancelled. Contrast `CubeTarget.vue:234–236`, which *does* `rollAnim?.stop()` on scope dispose. *Falsifier:* `RAFPlayback` self-cancelling on detach.

### L-15 · The ppmycota control is keyboard-unreachable
`CubeScene.vue:121–126` renders `h(PopoverTrigger, null, { default: () => h("div", { onClick: setPPMode, class: "… cursor-pointer …" }) })`. No `as`/`as-child` is passed, so glass-ui forwards to reka's `HoverCardTrigger` whose default element is **`as: "a"`** (`node_modules/reka-ui/dist/HoverCard/HoverCardTrigger.js`, props block) — an `<a>` with no `href`, hence not focusable. The click handler sits on a bare `<div>` with no `role`, no `tabindex`, no key handler and no accessible name. The ppMode toggle is therefore pointer-only. *Falsifier:* a global delegated key handler for `.ppmycota-logo-sm`, or a glass-ui `PopoverTrigger` default that overrides `as` (it forwards `t.as`, which is `undefined` here).

### L-16 · The expose comment describes a member that is not exposed
`CubeScene.vue:241–243`: "the legacy `animationGroup` stays for the shell binding's panel group". `defineExpose` (`:240–255`) exposes `facility, superKey, isPlaying, isStarted, headerLeft, tabsContent, ribbonContent` — **no `animationGroup`**. The shell reads `facility.group` (`useSceneMachineShellBinding.ts:67, 92`). Related stale seam on the consumer side: `App.vue:53–59` still renders a `#tabs-trigger` slot bound to `sceneRef?.tabsTrigger`, which CubeScene deleted (`:146–156`) and no scene exposes. *Falsifier:* a scene that still exposes `tabsTrigger` (none does).

### L-17 · The cube scene is registered twice; one registration is dead
`scenes.ts:136–144` registers `cube` through `lazyScene("cube", () => import(".../CubeScene.vue"))`, but `App.vue:283–286` short-circuits **both** `home` and `cube` to the statically-imported component, so `currentScene.component` is never read for the cube id and `warmScene("cube")` (`scenes.ts:118–123`) prefetches a module already in the entry chunk. The static import is *correct* (home needs the cube as its hero backdrop); the lazy half is dead weight that reads as a code-split which does not exist. *Falsifier:* a consumer of `sceneMap.get("cube").component`.

### L-18 · The exposed render-fns do not match their declared types
`sceneExposedApi.ts:25–26` declares `tabsContent?: () => VNode` and `ribbonContent?: (slotProps) => VNode | null`. CubeScene returns `VNode | null` from `tabsContent` (`:170–181`) and `VNode[] | null` from `ribbonContent` (`:183–202`). Both are *runtime*-fine (Vue accepts null and arrays from a functional component) and both are **type**-wrong; invisible because of L-8. *Falsifier:* a `vue-tsc` run that passes.

### L-19 · Asymmetric persistence, over a field nothing writes
`CubeScene.vue:219–225` deep-copies `rotate`/`translate`/`scale` but aliases `matrix: t.matrix` by reference. Harmless today only because the reader clones (`useTransformState.ts:42`, `mat4.clone`). The deeper point: `TransformState.matrix` (`orbital-drag/index.ts:24`) is **dead data** — `OrbitalDrag` never writes it (`grep -n matrix OrbitalDrag.vue` → one prose hit), `useTransformState` never reads it after seeding, `useCubeRelit` never touches it. It is cloned every mount and persisted every unmount as a permanent identity matrix. *Falsifier:* any `\.matrix\s*=` write on a `TransformState`.

### L-20 · The same expression is guarded on one line and not the next
`CubeScene.vue:194` `storedControls.matrixOptions.fixed = !storedControls.matrixOptions.fixed` (unguarded) sits four lines above `:197–198` `storedControls.matrixOptions?.fixed` (guarded), on the same object, in the same render function. One of the two is wrong. `matrixOptions` is initialised **only** by MatrixEditor (`:120`) — CubeScene initialises `ppMode` (`:63`) but not `matrixOptions` — so the optional chaining is the honest reading and `:194` is a latent `TypeError`. It is presently unreachable in the App host (ribbon and panel co-mount inside the same pane body, `ControlsPaneWrapper.vue:41–103`, and MatrixEditor's setup runs before the click), which is why this is MINOR and not MAJOR. *Falsifier:* a host that renders `ribbon-content` without the `tabs-content` subtree — the standalone playground `EditorShell` is the candidate to check.

---

## 5. INFO

**L-21 · Comment archaeology.** 54 of 205 non-blank script lines are `//` comments (**26 %**), and ~30 of them (`:39–48`, `:89–96`, `:146–169`, `:241–247`) narrate migrations *away* from components this file no longer imports (reka `Tabs`, `CONDITIONAL_SURFACES`, `activeControlConditionals`). This is the same prose/tree divergence lane-frontend flagged as **S-2** at `ChannelControls.vue:86` / `useTabStripScroll.ts:23`; CubeScene is the third and largest instance. Load-bearing rationale (why the panel is a plain `[role=tabpanel]`) is worth keeping; the four-paragraph history of a deleted import is not.

**L-22 · Store keyed `"cube"` while mounted as the home backdrop.** `CubeScene.vue:60–62` keys the control store by `SCENE_ID = "cube"` unconditionally, while the shell keys the *same* store by `currentSuperKey` = `"home"` on the landing (`App.vue:229`, `scenes.ts:128–134`). Two buckets, one component. Benign today (home derives `[]` surfaces, `App.vue:248–255`) and arguably intentional — one cube identity across both routes — but it is undocumented, and the `ppMode` toggle rendered on the home hero writes the cube bucket.

**L-23 · A `computed` with no reactive dependencies.** `useTransformState.ts:52–58` wraps `Array.from({length:16}, …)` over three pure index functions in a `computed`. Nothing it reads is reactive; it is a module constant wearing a reactive wrapper, re-allocated per composable instance.

**L-24 · Pointer-class asymmetry on the ppmycota trigger. (UNPROVEN-NEEDS-LIVE)** glass-ui's `Popover` picks `HoverCardRoot` only when `trigger === "hover" && !matchMedia("(pointer: coarse)")` (`dist/popover-BPBtXakf.js`, the `usesHoverRoot` computed). On a coarse pointer it renders `PopoverRoot`, whose trigger opens on **click** — so one tap both toggles `ppMode` and opens the card, while on a fine pointer the same click only toggles `ppMode`. Two different meanings for one gesture, decided by the input device.

**L-25 · An unnamed `role="group"`.** `CubeScene.vue:127` passes `role: "card"`, which glass-ui maps to DOM `role="group"` (`dist/popover-BPBtXakf.js`, the `v` computed) — correct usage of a real prop, *and* the default for the hover branch, so the explicit pass is redundant. The producer surfaces `ariaLabel` specifically to name that group (`PopoverContent.vue.d.ts:11`); CubeScene passes none, leaving the region unnamed.

---

## 6. SUPERLATIVES (L-18 runs both ways)

**P-1 · `adoptCompiled` — the demo drove a first-class engine verb.** `useCubeDemo.ts:70` calls `matrixAnim.value.adoptCompiled(compileMatrixAnimation())`. The engine's own docblock credits this exact site: *"This is the invariant the demo formerly held by a comment + three ordered field writes; here it is the method's contract, enforced by `proof:adopt-compiled`"* (`src/animation/engine/compile-bridge.ts:77–79`). Dogfooding that ends with the engine growing a verb — and the consumer deleting its hand-rolled triad — is the ideal outcome of a demo-as-proving-ground. (The *rate* at which it is called is L-9; the call itself is exemplary.) *Falsifier:* if `adoptCompiled` dropped targets, the usage would be a bug — it does not (`:100–108` rebinds interp slots to `anim.targets[0]`).

**P-2 · The visibility-pause contract is honest.** `useCubeDemo.ts:172–181` wires `useSceneVisibilityPause` with a *predicate* plus pause/resume thunks, and the comment states the invariant that makes it correct: only what the hide auto-paused is resumed, so a user-paused cube stays paused, and `pause()`/`resume()` re-base `startTime` so `effectiveT` never jumps. No second rAF, no shadow "was playing" boolean in the scene.

**P-3 · The PRM gate snaps to the terminal attitude, it does not skip.** `useCubeDemo.ts:159–169`: under `prefers-reduced-motion` the graph is written straight to `rotate3d(-1,1,0,30deg)` — the animation's *end* state — instead of being silently dropped. Reduced motion means less motion, not less scene. Contrast the demo's own inconsistency noted in lane-frontend §6.5 (three different PRM mechanisms across scenes); this site picks the right *semantics* regardless.

**P-4 · `markRaw` + `shallowRef` on every engine object.** `useCubeDemo.ts:65, 78, 108, 114`. Engine instances are large, self-mutating, and rAF-driven; wrapping them in deep reactivity is the classic Vue-meets-imperative-library disaster. This file gets it right four times in a row — which is precisely why L-9's deep `ref()` on the matrix values reads as an oversight rather than a house style.

**P-5 · A timer that is actually torn down.** `CubeScene.vue:100–114` + `:215`: `clearAutoDismiss()` runs on *every* transition of `ppmycotaOpen` **and** on `onBeforeUnmount`, with the handle nulled after clear. Compare `CubeTarget.vue:221`, where the roll's 1.2 s `setTimeout` is left dangling. The disciplined case is here.

**P-6 · `transformMath.ts` validates totally at the boundary.** Arity checks (`:72–76`, `:107–111`), per-argument finiteness and unit checks (`:91–104`), integer/range checks on the index (`:138–142`), each with a precise `RangeError`/`TypeError` message naming the offending index; `withMatrixCell` is pure and returns a fresh value. 180 lines with zero mutation and zero silent coercion. That every one of those guards is *reachable as an uncaught throw* (L-5) is the caller's failure, not this module's — the module is a model of fail-explicit design.

**P-7 · Conditional facets as data, not injection.** `CubeScene.vue:228–238` declares `channelFacets: { Matrix: [{ surface: "matrix-controls", label, icon }] }` and lets `facilityFromGroup` (`scene-facility/index.ts:82–127`) project it. This is what killed the reka-`TabsTrigger` orphan the file's own comments describe: a scene-specific tab now *is* a row of data on a channel, so selection-gating collapses into "which channel is selected" and the cross-component `activeControlConditionals` thread disappeared. The lazily-read `getGroup()` in the same builder (`:92`, `:114–125`) is the right shape too — a relit rebuild re-reads the live group, and the adapter never captures a `markRaw` object.

---

## 7. Corpus reconciliation

### 7.1 Where this challenge folds the census lanes

| lane id | relation |
|---|---|
| lane-frontend **F-1** (glass-ui phantom dep, RED) | **Extended → L-1.** The lane established absence-from-lockfile; this challenge localises the bite to the *entry* chunk via `App.vue:155`'s static import of CubeScene, which raises it from "the cube scene breaks" to "the build breaks". |
| lane-frontend **S-2** (type-only `/tabs`, prose/tree divergence) | **Third instance → L-21.** The lane named `ChannelControls.vue:86` and `useTabStripScroll.ts:23`; `CubeScene.vue:39–48, 146–169` is the largest single block of the same stale `<SegmentedTabs>`/reka-Tabs archaeology. |
| lane-frontend **§3.4** (zero direct reka imports) | **Confirmed for this component.** CubeScene reaches reka only transitively through glass-ui — but the *behavioural* contract it depends on is reka's (`HoverCardTrigger`'s `as: "a"` default, L-15), which is a soft coupling of the same family the lane flagged for `tab-idiom.css` / `playback-idiom.css`. |
| lane-frontend **§4 roster** (`cube/CubeScene.vue`, 287 L, "G — Popover*, Button") | **Confirmed exactly.** |
| lane-frontend **§6.5** (13 PRM sites, inconsistent mechanism) | **Confirmed + credited.** `useCubeDemo.ts:164` is one of the three raw `window.matchMedia?.()` JS sites; the mechanism is inconsistent with `EasingTarget.vue:234`'s `useMediaQuery`, but the *semantics* here are the best of the three (**P-3**). |
| lane-library **§0** (`demo files 184`, HEAD `8281638c`) | **Same substrate**; no drift observed. |

### 7.2 Where the tree contradicts the corpus

**C-1 (citation drift, lane-frontend §3.4).** The lane quotes `scenes/cube/CubeScene.vue:43:// (re-sourced from reka-ui here) are now ORPHANS — this throws "Injection`. The tree reads, at **line 44**: `// (re-sourced from reka-ui here) are now ORPHANS — they throw "Injection`. Line 43 is the preceding line (`// \`TabsRootContext\`. The former scene-injected reka …`). Off by one line and one word ("this" → "they"). The lane's *conclusion* (comment, not import) is correct and unaffected; the citation should be corrected to `:44` before anyone greps for it.

**C-2 (an inference the lanes did not draw).** lane-frontend §2 records the demo's typecheck posture nowhere, and §8 treats `npm ci` breakage as the only reproducibility gap. The larger gate hole is L-8: **no `.vue` is type-checked by any script or CI job in this repo**, so every SFC-level type claim in either lane (and in this challenge) is unenforced by construction. Recommend the megatranche treat "add `vue-tsc` to `check` and to `ci.yml`" as a prerequisite of any replacement wave, alongside F-1.

### 7.3 Claims I tried to make and the tree killed

Recorded so they are not re-raised:

* **"The controlled `open` binding breaks the hover cadence."** glass-ui's `Popover` docblock warns that a defaulted `open` forces the controlled path (`Popover.vue.d.ts:20–31`), and `CubeScene.vue:119` does pass a defined `open: false`. But the implementation forwards `open: r.value` **plus** `onUpdate:open` to `HoverCardRoot` (`dist/popover-BPBtXakf.js`), and CubeScene supplies both halves of the controlled loop — this is the sanctioned pattern, not a defect.
* **"`role: \"card\"` emits an invalid ARIA role."** It does not: `role` is a declared prop mapped to `role="group"` (`PopoverContent.vue.d.ts:9–11`). Only the missing `ariaLabel` survives, as L-25.
* **"`adoptCompiled` rebinding `anim.options` discards panel edits."** It re-seeds options off the throwaway compiler (`compile-bridge.ts:98`), and the constructor allocates a fresh options object (`animation.ts:179`) — so a panel that wrote into `animation.options` would indeed lose edits. It does not: `ChannelOptions.vue` writes the **store** (`:38, 57, 85, 105, 129, 540`), which is what `compileMatrixAnimation` re-reads. Coherent.
* **"A drag collapses the Matrix animation's start onto its end, flat-lining the channel."** `useTransformState.ts:171–172` does exactly that, but rebasing the animation's start to the current pose is a defensible design; only the *destruction of cell edits* is indefensible, and that is L-4.
* **"`onMounted`'s one-shot target attachment can silently no-op."** `CubeScene.vue:204–212` guards on both elements and retries never. Both are unconditionally rendered in `CubeTarget`'s template (`:8`, `:24`), and child refs are bound before the parent's `onMounted`, so the guard cannot fail today. It is a fragility (a future `v-if` on the `OrbitalDrag` slot kills the scene silently, with no warn) — noted, not charged.

---

## 8. Falsifier index

Cheapest observations that would kill the most:

| kills | observation |
|---|---|
| L-1 | `grep -n "glass-ui" package.json package-lock.json` returning anything |
| L-2 | any assignment to the exposed `isPlaying`, anywhere |
| L-3a | proof that `m00` cannot exceed 1 in `matrix3dEnd` |
| L-4 | a live probe showing `matrix-controls` unreachable before the group starts |
| L-5 | glass-ui `Input` coercing its emission to a finite number |
| L-6 | a live DOM count of `.matrix-grid` nodes === 1 while the matrix tab is active |
| L-7 | any mount-time write of a transform onto `.cube` or the OrbitalDrag container |
| L-8 | a `vue-tsc` invocation in any script, hook, or workflow |
| L-9 | evidence that `ref(obj)` is not deep, or that `fromVars` is free |
| P-1…P-7 | a counter-reading of the cited engine/producer source (each superlative names its file:line) |

---

## 9. ROUND 2 — independent second pass (L-26…L-31, P-8…P-9)

Same substrate, same law, same read-only mode; a fresh walk of the identical import closure (target + all 10 direct imports + the slot chain + the engine barrel + the installed glass-ui `.d.ts`).

### 9.0 Reconciliation with round 1

**Independently re-derived** (same evidence, same verdict — these are *corroborations*, not new findings, and are **not** re-counted in the tally): L-1 (the phantom dep in the entry chunk, via `App.vue:155` + `:284`), L-2 (the write-nobody `isPlaying` → dead `.idle-hover.playing` rule → dead `isGroupPlaying` parameter), L-6 (the per-channel slot multiplication, `ControlsPaneWrapper.vue:45-49` `v-show` + three cube channels), L-8 (no `vue-tsc` anywhere; CI runs `check:lib` only; the `declare module "*.vue"` shim at `demo/env.d.ts:3-7` types every SFC import as `DefineComponent<{},{},any>` — an aggravator round 1 did not cite), the units half of L-3, the recompile-rate half of L-9, L-11, L-12, L-13, L-14, L-19, L-20.

**Could not fault** (checked, found sound): L-4's mechanism (I traced a narrower variant — that `syncTransformations()`'s translate write-back is itself what *arms* the deep watch after a cell edit, `useTransformState.ts:63-65` → `:197-215` — which strengthens L-4 rather than competing with it: the destroyer can be triggered by the editor itself, not only by a drag), L-5, L-7, L-15, L-17.

**Declined to re-open.** Round 2 independently reached the "controlled `open` forces reka's non-passive path" accusation from `Popover.vue.d.ts:19-28`, then found §7.3 had already killed it on **implementation** evidence (`dist/popover-BPBtXakf.js` forwards `open` *and* `onUpdate:open`; CubeScene supplies both halves at `:119`). The kill stands and is not re-litigated. What survives is a strictly different claim about the *timer*, entered below as L-30.

**One round-1 claim qualified:** P-7 celebrates conditional-facets-as-data, correctly — but two of the three fields in that data are never read. See L-28, which narrows P-7 without overturning it.

### 9.1 L-26 · A dead emit wire: listener, emit declaration, and emitter, none of them connected — MINOR

`CubeScene.vue:178` passes `onResetMatrix: resetMatrix` into `h(MatrixEditor, …)`. `MatrixEditor.vue:110` declares the matching emit `(e: "resetMatrix"): void`, and `:136-138` defines the emitter `const resetMatrix = () => { emit("resetMatrix"); }`. **Nothing calls it** — `grep -n "resetMatrix" MatrixEditor.vue` returns exactly `110, 136, 137`, and the template (`:1-94`) contains no reference. Reset actually reaches `useTransformState` by a different route entirely: the ribbon button CubeScene renders itself (`CubeScene.vue:186-190` → `onClick: () => resetMatrix()`).

So three coupled artefacts are dead at once: the child's emit declaration, the child's emitter, and the parent's listener. The listener is the expensive part — it advertises a child→parent reset channel that does not exist, and it is unverifiable because of L-8 (a `h()` prop object against an `any`-typed `.vue` import).

**Failure scenario** a maintainer adds a Reset affordance *inside* the editor, wires it to the existing `resetMatrix()`, and it works — masking that the parent's ribbon button was the real path; or removes the ribbon button believing the child still emits. Either way the two paths are already indistinguishable from the outside.
**Falsifier** a call site for `resetMatrix()` inside `MatrixEditor.vue`, or a second parent that relies on the emit.

### 9.2 L-27 · The same wrapper element, twice, nested — MINOR

`CubeScene.vue:9-14` and `CubeTarget.vue:2-6` are the same node:

| | CubeScene `:9-14` | CubeTarget `:2-6` |
|---|---|---|
| class | `grid h-full w-full max-w-full items-center justify-center justify-items-center overflow-visible` | `relative grid h-full w-full max-w-full items-center justify-center justify-items-center overflow-visible` |
| style | `touch-action: none; overscroll-behavior: contain` | identical |
| handler | `@wheel.prevent` | identical |

The parent adds only the conditional recede class (`:11`), which is the one thing that genuinely needs an outer box. Everything else is duplicated: two centering grids stacked one inside the other, and **two non-passive `wheel` listeners** on the same pointer path (Vue registers `.prevent` handlers non-passive), the inner of which can never see an event the outer has not already cancelled.

**Failure scenario** a scroll-behaviour change must be made twice or it is made once and half-applies; the doubled grid makes the cube's centring depend on two boxes agreeing.
**Falsifier** show the outer element needs the touch-action/overscroll/wheel triple independently of the inner one — e.g. a sibling rendered into the outer box that must also block wheel. There is none: `CubeTarget` is the outer div's only child (`:15-22`).

### 9.3 L-28 · Two-thirds of the facet descriptor is dead data duplicating the single registry — MINOR *(qualifies P-7)*

`CubeScene.vue:230-236` declares the Matrix channel's facet as `{ surface: "matrix-controls", label: "Matrix Controls", icon: "Grid3X3" }`. Only `surface` is ever read:

* `controlSurfaces.ts:113` — `(selected?.facets ?? []).map((f) => f.surface)`;
* `controlSurfaces.ts:116` — `facets.map((f) => f.surface)` for the facility-wide half;
* tab metadata is resolved from the **registry**, not the facet: `extraTabsFrom` (`controlSurfaces.ts:189-195`) maps each surface through `SURFACE_META`, whose `"matrix-controls"` entry (`:155-159`) is `{ value: "matrix-controls", label: "Matrix Controls", icon: "Grid3X3" }` — byte-identical to the scene's copy.
* `grep -rn "f\.label|f\.icon|facet\.label|facet\.icon" demo/` → no output. `SceneFacet.label`/`.icon` (`scene-facility/index.ts:50-54`) have **zero readers** repo-wide.

`SURFACE_META`'s own header states the reason it exists: *"Formerly the surface→{label,icon} map existed THREE times … three hand-synced copies of one fact. This is the SINGLE source"* (`controlSurfaces.ts:122-129`). CubeScene has quietly re-created a fourth copy — inert today, and a divergence waiting to happen (rename the tab in the registry and the scene's copy silently disagrees with nothing, which is worse than disagreeing with something: a maintainer will update the copy and see no effect).

**Failure scenario** the facet label is changed in `CubeScene.vue:233` to fix the tab's wording; nothing changes, because the dock reads `SURFACE_META`.
**Falsifier** any consumer reading `SceneFacet.label` or `SceneFacet.icon` — a dock, a select, a probe. None exists. (P-7 is untouched: projecting the facet's *surface* as data is exactly right; only the metadata copy is dead.)

### 9.4 L-29 · The prop name states the opposite of the prop's meaning — MINOR

`CubeScene.vue:29-31` declares `hideLoader?: boolean`. Its sole caller passes `{ hideLoader: isHome.value }` (`App.vue:291-294`), and the component spends it on two things:

* `:11` — `:class="{ 'cube-stage--hero-recede': props.hideLoader }"`, a **mobile layout band**, nothing to do with a loader;
* `:20` — `:show-loader="!props.hideLoader && !storedControls.selectedAnimation"`, where it is only one of two terms.

The file's own opening comment concedes the real meaning (`:2-3`: "on the HOME landing (`hideLoader` === the start screen is up)"). A boolean named for one of its two effects, passed a value named for neither, is a contract that must be read through three files to use. `isHome` / `isBackdrop` is the honest name; `showLoader` on `CubeTarget` (`:117-122`) is the honest *shape* — the child got it right.

**Failure scenario** a second caller (a storybook host, a test harness, the standalone playground shell) passes `hideLoader: true` meaning "no spinner please" and silently gets the mobile hero-recede padding and a shrunken cube (`:283-285`, `--side-size: min(40vh,40vw,16rem)`).
**Falsifier** a caller that passes `hideLoader` for genuine loader suppression, or a rename already staged.

### 9.5 L-30 · The auto-dismiss closes the card under a stationary pointer — MINOR *(strictly narrower than the §7.3 kill)*

`CubeScene.vue:109-114` arms a 4 s timer whenever `ppmycotaOpen` goes true and then writes `ppmycotaOpen.value = false` unconditionally. Because the popover is on the **controlled** path (round 1 §7.3 established this is sanctioned — `open` + `onUpdate:open` both supplied), that write closes the card *authoritatively*, regardless of pointer state.

The re-open edge is the problem. The hover branch opens on `pointerenter` on the trigger. A pointer that never left the trigger emits no new `pointerenter`, so after the 4 s auto-dismiss the card cannot return until the user moves off and back on. The timer is also armed only on the `false → true` transition of the watch (`:109`), so no subsequent hover activity re-arms or cancels it.

This is not the claim §7.3 killed (that one was about reka's `passive` evaluation swallowing the *cadence*; refuted). This one is about a scene-owned timer overriding a live hover state.

**Failure scenario** rest the pointer on the ppmycota mark and read the card: at 4 s it disappears while the pointer is still on the trigger, and stays gone until the pointer leaves and returns.
**Falsifier** show reka's `HoverCardRoot` re-opens a controlled card on a still-hovering trigger without a fresh enter event (e.g. an internal hover-state watcher that re-emits `update:open`), or show `closeDelay: 150` interacts with the controlled write to restore it. **The visual half is UNPROVEN-NEEDS-LIVE** (SS-13); the unconditional close and the single-arm watch are source-provable (`:109-114`).

### 9.6 L-31 · The panel gates on the raw store where the parent gates on the projection — INFO

`CubeScene.vue:170-171` gates the matrix body on `storedControls.selectedControl` — the **raw stored pick**. The comment at `:160-169` claims this "mirrors AnimationControls' own built-in panels". It does not, quite: the parent's panels gate on `selectedControlSurface`, the **DFA projection** (`ChannelControls.vue:98` and `:150`, from `useSelectedControlSurface.ts:80-86`). The two are reconciled by a `watch` that writes the projection back into the store (`useSelectedControlSurface.ts:89-102`) — but that writer is gated on `isActiveSceneHost`, whose whole purpose (`:70-78`) is to *stop* writing during the NAVIGATE → SCENE_READY window. In that window the raw store can hold the leaving scene's pick while the projection holds the destination's.

The ribbon half is fine and worth recording, because it contradicts an intuition: `CubeScene.vue:184`'s `slotProps.selectedControl` is *also* the raw store (`RibbonBar.vue:112-113` passes `storedControls.selectedControl`), so panel and ribbon agree with each other. It is the *parent* that both of them disagree with.

**Why INFO, not MAJOR** the divergence window is a transition, the scene is unmounted-or-arriving through most of it, and the observable would be at most a frame of a matrix panel rendered beside built-in panels that have already switched. No failure scenario survived construction — recorded so the next reader does not mistake the `:160-169` comment for a proof.
**Falsifier** show the raw pick and the projection are equal by construction in every window including a non-active host — or produce a frame where they are not, which upgrades this.

### 9.7 P-8 · SUPERLATIVE — the LIGHT/HEAVY engine boundary is observed in *both* directions

`src/animation/index.ts:1-25` splits the published barrel: LIGHT (the physics/interpolation engines — static, value.js-free) versus HEAVY (the CSS-keyframe engine — reachable **only** through `loadAnimationEngine()`, so value.js never lands in a light consumer's static graph). The cube unit honours it at every site, and gets the *hard* direction right:

* `useTransformState.ts:2` static-imports `NumericAnimation` — and that is **correct**, because `NumericAnimation` is a declared LIGHT export (`index.ts:28`, named in the header at `:6-12`). No dynamic ceremony where none is owed.
* `useTransformState.ts:6, 31` and `useCubeDemo.ts:9, 50` take the HEAVY surface (`CSSKeyframesAnimation`, `AnimationGroup`, `presets`, `transformTargetsStyle`) through `kfEngine()`, the boot-warmed synchronous accessor (`demo/kf-engine.ts:28-54`) whose read-before-warm path **throws with the fix in the message** (`:46-54`) rather than returning undefined.
* `CubeTarget.vue:109` imports `CSSKeyframesAnimation` as `import type` — erased under `verbatimModuleSyntax` (`tsconfig.json:12`), so the type is available with no runtime edge — and reaches the *value* through a per-site `await loadAnimationEngine()` at `:198`, which is precisely the idiom `kf-engine.ts:12-16` describes for a click handler.

Round 2 opened this thread intending to charge the static `NumericAnimation` import as a boundary breach that defeats the lazy split. **The barrel refuted the accusation**, and the refutation is the finding: a four-site consumer that keeps a two-tier import contract straight, including a type-only import and a deliberate non-use of the dynamic path, is doing something most consumers of such a split get wrong.
**Falsifier** show `./physics/numeric` transitively reaches the heavy graph or value.js's parser/color modules (`index.ts:6-12` states it shares only the rootless `/math` leaf), or find a cube-unit site that static-imports a HEAVY symbol.

### 9.8 P-9 · SUPERLATIVE — a measured repaint elision, and a unit that is genuinely colocated

**The elision.** `useCubeRelit.ts:82-84` computes six per-face `--lit` values as a plain `computed` off the live rotation and rounds each to `toFixed(2)`. The rationale is stated and is *correct at the platform level* (`:73-81`): setting a CSS custom property to its current value does not invalidate, so rounding collapses the high-frequency ticks of a real orbit drag onto the same string and the browser skips the repaint — with the perceptual cost bounded and argued (1 % luminance). It is also the right *shape*: a `computed`, not a second rAF (`:70-72`), so the re-light rides the existing rotation cadence instead of competing with the engine's loop. An optimisation that names its mechanism, bounds its cost, and picks the reactive primitive over a timer is rare.

**The colocation.** `demo/scenes/cube/` is a model unit: the scene, its target, the target's CSS (`CubeTarget.css`, bound via `<style scoped src>` — `CubeTarget.vue:239`), its key module (`cubeKeys.ts`, 7 L, the single keyspace source), its cross-route store (`cubeTransformStore.ts`, 20 L), its engine composable, its re-light composable, and **two self-contained sub-units** (`matrix-editor/`, `orbital-drag/`), each of which has its pure math extracted into a Vue-free module (`transformMath.ts`, `quaternionEuler.ts`) that could be unit-tested without a DOM. Nothing in the unit reaches sideways into another scene; the only upward imports are `@state`, `@composables`, `@kf-engine` — the three declared peers.
**Falsifier** for the elision: show a browser that invalidates on an unchanged `setProperty` (then the rounding buys nothing), or show `toFixed(2)` banding is visible (**UNPROVEN-NEEDS-LIVE**). For the colocation: find a cross-scene import in `demo/scenes/cube/`.

### 9.9 Round-2 falsifier index

| kills | observation |
|---|---|
| L-26 | a `resetMatrix()` call site inside `MatrixEditor.vue` |
| L-27 | a second child of CubeScene's outer div that needs the wheel/touch-action triple |
| L-28 | any reader of `SceneFacet.label` or `SceneFacet.icon` |
| L-29 | a caller passing `hideLoader` for genuine loader suppression |
| L-30 | reka re-opening a controlled hover card without a fresh `pointerenter` |
| L-31 | a constructed proof that the raw pick equals the projection in every window |
| P-8 | a heavy-graph edge reachable from `./physics/numeric`, or a HEAVY static import in the cube unit |
| P-9 | an unchanged-`setProperty` invalidation, or a cross-scene import under `demo/scenes/cube/` |

---

*No file in keyframes.js, glass-ui, or any other repo was written, mutated, or executed — in either round. No installs, no dev servers, no browser tooling. This document is the single write.*
