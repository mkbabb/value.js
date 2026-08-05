claude-opus-5[1m]

# CHALLENGE · `KeyframeCardList.vue` · axis L (LIBRARY)

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/keyframes/components/KeyframeCardList.vue` (82 lines)
**Tree:** keyframes.js HEAD `8281638c fix(demo-shell): provide tooltip context for the routed control group` (same HEAD the 2026-08-03 census read).
**Mode:** static, read-only. No installs, no dev server, no browser. Every livable-only claim is marked **UNPROVEN-NEEDS-LIVE** for the SS-13 visual audit.
**Prior:** assumed DEFECTIVE until the tree proved otherwise. It is defective — and it is also, in two named respects, exemplary.

**Files read whole (read-only):** the target; `../KeyframeCard.vue`; `../KeyframesEditor.vue`; `../KeyframesAddDialog.vue`; `../composables/{useKeyframesEditor,useKeyframesState,useKeyframesParsing,useKeyframeOps,useHighlightCSS}.ts`; `demo/kf-engine.ts`; `demo/app/main.ts`; `demo/utils/keyframeSelector.ts`; `demo/utils/formatEditorCSS.ts`; `src/animation/constants/types.ts`; `src/animation/compile/{selector.ts,frame-compiler.ts,emit/format.ts}`; `src/animation/{load-engine.ts,index.ts}`; `src/animation/resolve/element-resolve.ts`; `node_modules/@mkbabb/value.js/dist/subpaths/css.{d.ts,js}`; `node_modules/@vue/runtime-core/dist/runtime-core.cjs.js` (3.5.35); `test/demo/instrument/value4-editor-boundary.test.ts`; `package.json`, `tsconfig.json`, `tsconfig.lib.json`, `.github/workflows/ci.yml`.

**Tally:** 13 defects (1 BLOCKER · 3 MAJOR · 6 MINOR · 3 INFO) · 3 superlatives.

---

## 0. Headline

| id | severity | claim |
|---|---|---|
| **L-1** | **BLOCKER** | `:frame-start="frames[i].start.toString()"` (`:11`) renders **`[object Object]`** on every card. `start` is a `KeyframeSelector` POJO, not a scalar. The correct, already-tested serializer (`selectorText`) sits in `@utils/keyframeSelector`. |
| **L-2** | MAJOR | Line 5 guards `frames[i]?` — line 11 does not. `frames` and `frameStrings` are two un-sequenced async projections of the same array; when they desync, `frames[i]` is `undefined` and the render throws. |
| **L-3** | MAJOR | `setCardRef` writes by index into a never-truncated array. Vue 3.5's unmount path calls the removed card's *stale-index* function ref with `null` **after** the survivors were re-seated → the live card at that index is nulled. `getPreElements()` then drops one `<pre>` and duplicates another. |
| **L-4** | MAJOR | Nothing type-checks this file. `vue-tsc` is absent from the toolchain; CI runs `check:lib` (src/ only). The `<template>` where L-1 and L-2 live is gated by zero automation. |
| **L-5** | MINOR | `frames: any[]` (`:35`) defeats the project's own `noUncheckedIndexedAccess: true`. `TemplateAnimationFrame` is exported from the barrel. |
| **L-6** | MINOR | `loadAnimationEngine()` + `shallowRef` null-state (`:44–48`) duplicates the demo's warmed `kfEngine()` accessor; the transient the header comment justifies **cannot occur** — `main.ts` awaits the warm before `app.mount()`. |
| **L-7** | MINOR | `void loadAnimationEngine().then(...)` has no `.catch` — a chunk-load failure is an unhandled rejection. Sibling engine sites route throws deliberately. |
| **L-8** | MINOR | `ref<any[]>` holding component public instances is deep-reactive; it is benign only by accident of `KeyframeCard`'s `defineExpose`. The file already imports `shallowRef`. |
| **L-9** | MINOR | `Separator` from the **root barrel** while its own child imports `Input` from the `/forms` subpath; glass-ui 7.0.0 ships `./separator`. This line is also where census **F-1** (phantom dep) bites. |
| **L-10** | MINOR | `KeyframeCard.vue` lives one directory **above** its sole consumer, this file. |
| **L-11** | INFO | `formattedStrings[i] ?? s` (`:10`) is runtime-unreachable — compile-required only. A tell that two parallel arrays should be one. |
| **L-12** | INFO | The exposed contract mixes shapes: `cardRefs` is a reactive value, `getPreElements` a function. |
| **L-13** | INFO (parent-owned) | `KeyframesEditor`'s Slider reads/writes `frame.start.value` in **0–100** while every parse path normalizes to **0–1** — it corrupts the exact field this component displays. |

| id | superlative |
|---|---|
| **S-A** | The declared child-ref contract (`defineExpose({ preEl })` → `getPreElements()`) is what retired the document-wide `querySelectorAll("pre")` sweep. This component **is** the seam that makes the scoped highlighter possible. |
| **S-B** | The raw/formatted split is a *closed* round-trip: the DOM never carries the authoritative selector, so a contenteditable edit cannot corrupt a stop's offset. |
| **S-C** | Goldilocks. 82 lines, one responsibility, zero dead imports, in a cluster whose siblings run 161–284. |

---

## 1. L-1 — **BLOCKER** — every card's start readout is `[object Object]`

**Provenance.**

```
KeyframeCardList.vue:11    :frame-start="frames[i].start.toString()"
```

`frames` is bound by the sole consumer to the live template array:

```
KeyframesEditor.vue:14/26   :frames="animation.templateFrames"
```

`templateFrames[i].start` is typed `KeyframeSelector`:

```
src/animation/constants/types.ts:64-66
    export interface TemplateAnimationFrame<V extends Vars> {
        id: number;
        start: KeyframeSelector;
```

…and `KeyframeSelector` is a value.js **object literal union**, not a class:

```
node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts:210-217
    export declare type KeyframeSelector = Readonly<{ kind: "percent"; value: number; }>
                                         | Readonly<{ kind: "named"; name: "entry"|"exit"|"cover"|"contain"; offset?: number; }>;
```

Constructed as bare literals at runtime — no prototype, no `toString`:

```
node_modules/@mkbabb/value.js/dist/subpaths/css.js:484-495
    if (n === "from" || n === "to") return b({ kind: "percent", value: n === "from" ? 0 : 1 });
    ...                              return b({ kind: "percent", value: t / 100 });
```

The compiler stores that value verbatim (`src/animation/compile/frame-compiler.ts:145-149`, `start: parsedStart`), and the editor writes the same literal shape back (`KeyframesEditor.vue:206-209`, `frame.start = { kind: "percent", value: scalar.value / 100 }`).

**The repo's own test asserts the shape:**

```
test/demo/instrument/value4-editor-boundary.test.ts:19-22
    expect(requireKeyframeSelector("from")).toEqual({ kind: "percent", value: 0 });
```

Therefore `frames[i].start.toString()` resolves to `Object.prototype.toString` → the literal string **`"[object Object]"`**.

**Where it lands.** `frameStart` is rendered twice per card:

```
KeyframeCard.vue:5    :model-value="frameStart"          ← the offset Input
KeyframeCard.vue:37   >s {{ frameStart }}</Label>        ← the "s <offset>" caption
```

So on the primary keyframe-authoring surface, **every stop's offset reads `[object Object]`** in both the editable field and its caption. The instrument cannot tell you where a stop is.

**The correct call already exists, is used one file away, and is tested.**

```
demo/utils/keyframeSelector.ts:7-12
    export const selectorText = (selector: KeyframeSelector): string =>
        selector.kind === "percent" ? `${selector.value * 100}%`
                                    : `${selector.name}${selector.offset === undefined ? "" : ` ${selector.offset * 100}%`}`;

demo/components/instrument/keyframes/composables/useKeyframeOps.ts:110-111
    const start = animation.templateFrames[frameIx]!.start;
    const wrapped = `${selectorText(start)} { ${keyframeString} }`;

test/demo/instrument/value4-editor-boundary.test.ts:26
    expect(selectorText(named)).toBe("entry 50%");
```

The write-back path (`useKeyframeOps`) uses `selectorText`. The read-out path (this file) uses `.toString()`. One projection, two answers.

**Regression, not an original sin.** `git blame` dates line 11 to `905a8c360` (2026-06-05), when `start` was still a scalar. The value.js-4 `KeyframeSelector` migration converted the field and updated `useKeyframeOps`, `format.ts`, `timelineEngine.ts` and the tests — and missed the one call site no type-checker looks at (see **L-4**).

**Scope widens for named selectors.** `.toString()` is equally wrong for `{kind:"named"}`, and the write path can't recover: `KeyframesEditor.vue:196-203` accepts only `parseCssScalar` results with `unit === "%"` ("Expected a percentage scalar such as 50%"). An `entry`/`exit` animation — a grammar the engine explicitly supports (`src/animation/compile/selector.ts:38-60`) — is both **mis-displayed and un-editable** through this list.

**Fix.** `:frame-start="selectorText(frames[i].start)"`, importing from `@utils/keyframeSelector` — the module this file's sibling composable already imports.

**Falsifier.** (a) Static: exhibit a `toString` on `KeyframeSelector` — a prototype, a class, a `Symbol.toPrimitive`, or a wrapper applied between `parseKeyframeSelector` and `templateFrames[i].start`. I found none across `css.js`, `frame-compiler.ts`, `selector.ts`, and `KeyframesEditor.vue:206`. (b) Live: open the spring scene's keyframes editor and read a card's offset field. If it shows `50%`, the claim is dead. *(The exact rendered pixels are UNPROVEN-NEEDS-LIVE; the string value is proven statically and by the repo's own test.)*

---

## 2. L-2 — **MAJOR** — the unguarded index the line above it guards

```
KeyframeCardList.vue:4-11
    v-for="(s, i) in frameStrings"
    :key="frames[i]?.id ?? i"          ←  guarded
    ...
    :frame-start="frames[i].start.toString()"   ←  NOT guarded
```

Two lines apart, the same expression, two different postures. The `?.` on line 5 is the author's own admission that `frames[i]` can be `undefined`; under `frames: any[]` the compiler required **neither** guard (see **L-5**), so line 5 was a deliberate hand-written defence and line 11 is its omission.

**It is reachable.** `frameStrings` and `frames` are two projections of the same source that update on *different clocks*:

- `frames` = `animation.templateFrames`, mutated **synchronously**:
  ```
  useKeyframeOps.ts:202-204   animation.templateFrames = animation.templateFrames.filter((_, i) => i !== frameIx);
  useKeyframeOps.ts:172-177   for (const [start, vars] of keyframes) animation.addFrame(...)
  ```
- `frameStrings` = `templateFrameStrings`, filled **asynchronously and un-sequenced**:
  ```
  useKeyframesParsing.ts:48-54
      const { CSSKeyframesToStrings } = await loadAnimationEngine();
      templateFrameStrings.value = [];
      const cards = await CSSKeyframesToStrings(animation);           ← snapshots N stops
      templateFrameStrings.value = await Promise.all(cards.map(card => formatEditorCSS(card, getFormatWidth())));
  ```

`formatEditorCSS` is genuinely slow — it dynamically imports **prettier + the postcss plugin** and formats each card (`demo/utils/formatEditorCSS.ts:5-14`). There is **no generation token, no in-flight guard, no cancellation**: concurrent `updateAllStrings()` calls (the Slider fires `updateAllStringsAndAnimation()` un-debounced on every drag tick, `KeyframesEditor.vue:40-47`) can land out of order.

**The failing interleave.** Slider drag starts `updateAllStrings()` at N stops → the user clicks a card's ✕ → `removeKeyframe` awaits the exit animation (`KeyframesEditor.vue:244-247`, hundreds of ms) → `removeKeyframeData` filters to N−1 and starts its own pass → the *earlier* pass resolves last and writes **N** strings while `templateFrames` holds **N−1**. Next render: `i = N−1` → `frames[N−1]` is `undefined` → `undefined.start` → **TypeError inside `render`**. Vue does not recover a throwing render: the editor subtree fails.

**Severity.** MAJOR, not BLOCKER: it needs the race. But the fix costs one character (`?.` + a fallback), and the *inconsistency* needs no race to be a defect.

**Secondary.** In the desync window the key degrades to `?? i`. Frame ids start at `0` and increment (`frame-compiler.ts:166`, `this.frameId += 1`), so an index fallback can collide with a real id and produce duplicate keys — corrupting the very keyed diff **L-3** depends on.

**Falsifier.** Show that `frameStrings.length === frames.length` is an invariant at every render. That requires either (a) sequencing in `updateAllStrings` — there is none — or (b) proof that `props.frames` and `props.frameStrings` can never be observed at different generations. Since `animation` is `markRaw` (`useSpringKeyframesEditor.ts:57`), the *only* thing that triggers a re-render is `templateFrameStrings` changing — which is exactly the stale write. If someone lands a generation guard, the claim dies.

---

## 3. L-3 — **MAJOR** — the ref array that never shrinks, and the unmount that nulls a live card

```
KeyframeCardList.vue:64-72
    const cardInstances = ref<any[]>([]);
    const setCardRef = (i: number, el: any) => { cardInstances.value[i] = el; };
    const cardRefs = computed(() => cardInstances.value.map((c) => c?.$el ?? c));
KeyframeCardList.vue:8
    :ref="(el: any) => setCardRef(i, el)"
```

Index-assignment only. Nothing ever truncates `cardInstances`, and the ref is an **inline arrow closed over the render-time `i`**.

**Vue 3.5.35, verified in `node_modules/@vue/runtime-core/dist/runtime-core.cjs.js`:**

1. Function refs are invoked **synchronously during patch**, not queued:
   ```
   :1814-1815   if (isFunction(ref)) { callWithErrorHandling(ref, owner, 12, [value, refs]); }
   ```
   (string/`Ref` refs get `queuePostRenderEffect` at `:1858-1866` — function refs do not.)
2. A **stale function ref is never unset**. The unset branch handles only `isString(oldRef)` and `isRef(oldRef)`:
   ```
   :1799-1812   if (oldRef != null && oldRef !== ref) { ... isString ... else if isRef ... }   // no function branch
   ```
3. Unmount calls the vnode's own (stale-index) ref with `null`:
   ```
   :6588-6591   if (ref != null) { pauseTracking(); setRef(ref, null, parentSuspense, vnode, true); resetTracking(); }
   ```
4. `patchKeyedChildren` patches survivors **before** it unmounts removals:
   ```
   :6339-6358   sync-from-start  → patch(...)   // seats survivors at NEW indices
   :6359-6379   sync-from-end    → patch(...)   // seats survivors at NEW indices
   :6399-6403   } else if (i > e2) { while (i <= e1) { unmount(c1[i], ...); i++ } }
   ```

**The trace.** Cards `A B C D E` (ids stable — `removeKeyframeData` uses `.filter()`, preserving objects and ids). Remove **C** (index 2):

| step | source | effect on `cardInstances` |
|---|---|---|
| sync-from-start i=0,1 | `:6339` | `[0]=A`, `[1]=B` |
| sync-from-end e=4→3 | `:6359` | `[3]=E` (E's new index), then `[2]=D` (D's new index) |
| unmount loop, old[2]=C | `:6399` | C's ref fn — still bound to **i=2** — fires with `null` → **`[2]=null`** |

Final: `[A, B, null, E, E]`, length **5** for **4** live cards.

**Consequences, both on this component's published contract:**

- `getPreElements()` (`:76-79`) filters `null` → `[preA, preB, preE, preE]`. **`D`'s `<pre>` is missing and `E`'s is duplicated.** `useCodeHighlight` is idempotent per element (`useHighlightCSS.ts:116-126`, the `highlighted` marker), so the duplicate is harmless — but `D`'s card **is never highlighted again**: it renders as unstyled plain text until a full remount. That is a visible, permanent-per-session regression triggered by the most ordinary action in the instrument.
- `cardRefs` (`:70-72`) misaligns with frame indices. The consumer indexes it by frame index and derives its neighbour from the **stale** length:
  ```
  KeyframesEditor.vue:237-240
      const cards = cardList.value?.cardRefs ?? [];
      const el1 = cards[frameIx];
      const el2 = frameIx < cards.length - 1 ? cards[frameIx + 1] : cards[frameIx - 1];
  ```
  After one middle removal, removing the card now at index 2 gives `el1 = null`; `cards.length - 1` reads 4 against 4 live cards, so the neighbour probe is wrong too. `presets.warpLeft().setTargets(null)` reaches `bindTargets` (`src/animation/resolve/element-resolve.ts:135-147`), which is SSR-tolerant of a missing target — so the exit animation most likely **silently animates nothing** rather than throwing. Whether the subsequent `.play()` throws (aborting `AnimationGroup.of(...).play()` and therefore skipping `removeKeyframeData` entirely — a delete button that does nothing) is **UNPROVEN-NEEDS-LIVE**.

**Fix.** Either seat a fresh array each render (`const next: any[] = []` rebuilt in `onBeforeUpdate`, the canonical Vue array-ref idiom) or truncate: `cardInstances.value.length = props.frameStrings.length` after assignment. Both make the exposed contract length-true.

**Falsifier.** (a) Show Vue calls the *new* ref fn after the unmount for that slot — the source ordering at `:6359` vs `:6399` says otherwise, and function refs are synchronous (`:1814`). (b) Show `setRef` unsets stale **function** oldRefs — `:1799-1812` has no such branch. (c) Show the keys are unstable enough that Vue full-remounts the list instead of diffing — but `.filter()` preserves `id`, and `frame-compiler.ts:361`'s in-place `sort` preserves the objects. Kill any of these and the claim dies.

---

## 4. L-4 — **MAJOR** — nothing type-checks this file

```
package.json → "check": "tsc --noEmit && tsc --noEmit -p tsconfig.test.json"
devDependencies: @vitejs/plugin-vue, vue, vue-router, vue-sonner   —  NO vue-tsc, NO vue-language-tools
.github/workflows/ci.yml:41-42   - name: check library types
                                   run: npm run check:lib
tsconfig.lib.json:               "include": ["src/"]
```

Two compounding gaps:

1. **`tsc` cannot read `.vue` files at all.** Without `vue-tsc`, neither the `<template>` nor the `<script setup>` of this component is type-checked by *any* command in the repo — not `check`, not `check:lib`.
2. **CI never even points at the demo.** `tsconfig.lib.json`'s own header names the reason, and it is census **F-1**:
   > *"`check:lib` (the CI gate) runs this so a clean runner type-checks ONLY the publishable surface (`src/`) — never the demo, whose later consumer commit imports registry Glass."*

So the phantom glass-ui dependency is not merely a build hazard — it is the **documented reason the demo's type gate was removed**. The chain is closed: F-1 → CI narrowed to `src/` → demo untyped → `.toString()` on a `KeyframeSelector` ships (**L-1**) and an unguarded index ships beside a guarded one (**L-2**).

**Where it bites this component specifically:** every finding above lives in surface no gate inspects. There is no test for `KeyframeCardList` either — `grep -rln "KeyframeCard" test/ scripts/` returns nothing; the closest, `test/demo/instrument/value4-editor-boundary.test.ts`, tests `selectorText` *in isolation* and never the component that should call it.

**Falsifier.** Produce a command in this repo that type-errors on a deliberate fault inside `KeyframeCardList.vue`'s `<template>`, or a CI step that executes it.

---

## 5. L-5 — MINOR — `frames: any[]` disables the project's own guard

```
KeyframeCardList.vue:33-36    defineProps<{ frameStrings: string[]; frames: any[]; }>();
tsconfig.json                 "strict": true,  "noUncheckedIndexedAccess": true,  "exactOptionalPropertyTypes": true
src/animation/index.ts:165    TemplateAnimationFrame,          ← exported from the barrel this file already imports
```

`noUncheckedIndexedAccess` is exactly the check that would have typed `frames[i]` as `TemplateAnimationFrame<any> | undefined` and forced the guard L-2 is missing. `any[]` collapses it (`any | undefined` = `any`). The honest type is one import away, from the specifier already on line 30.

This is downstream of L-4 (nothing runs the checker over this file today) but it is a *separate* defect: it would still be wrong the day `vue-tsc` lands.

**Falsifier.** Show `TemplateAnimationFrame` is not reachable from `@mkbabb/keyframes.js`, or that a structural mismatch forces `any` here.

---

## 6. L-6 — MINOR — engine-consumption idiom: the transient the comment defends cannot happen

```
KeyframeCardList.vue:38-52
    // ... It resolves within microtasks of mount (well before any card renders),
    // and until then the raw frame string is shown — an honest pre-format frame,
    // never a blank. ...
    const formatFn = shallowRef<((keyframe: string) => string) | null>(null);
    void loadAnimationEngine().then((engine) => { formatFn.value = engine.formatCSSKeyframeString; });
    const formattedStrings = computed(() => props.frameStrings.map((s) => (formatFn.value ? formatFn.value(s) : s)));
```

The demo has **two** engine idioms, and this file picked the one whose transient it then has to paper over:

```
demo/app/main.ts:74-78
    void Promise.all([warmKfEngine().catch(() => undefined), fontsDecoded]).finally(() => { app.mount("#app"); });
demo/kf-engine.ts:49-56
    export const kfEngine = (): AnimationEngine => { if (!resolved) throw ...; return resolved; };
```

The engine is resolved **before `app.mount()`**. This component cannot be created before that. Its own sibling in the same file tree uses the synchronous accessor for exactly this reason (`KeyframesEditor.vue:130`, `const { CSSKeyframesAnimation, AnimationGroup, presets } = kfEngine();`). `kfEngine().formatCSSKeyframeString` is the same symbol off the same dynamic chunk — `proof:boundary` is unaffected — and it deletes the `shallowRef`, the null state, the `?? s` fallback (**L-11**), and the header comment defending a flash that never occurs.

**Not zero-consequence:** the initial render *does* run before the `.then` microtask, so if `frameStrings` were ever non-empty at first paint the raw `50% { … }` (selector and braces included) would flash. It isn't — `templateFrameStrings` starts `[]` (`useKeyframesState.ts:25`) — which is precisely why the defence is unnecessary.

**Falsifier.** Show a mount path that reaches `KeyframeCardList` before `warmKfEngine()` resolves. `main.ts:78` mounts inside `.finally`, so this requires an entry that bypasses `main.ts`. (Note the honest edge: `warmKfEngine().catch(() => undefined)` means a *failed* engine load still mounts, and `kfEngine()` would then throw — a demo-wide posture question, not a reason to prefer the per-site loader here, which would silently render unformatted CSS forever instead.)

---

## 7. L-7 — MINOR — unhandled rejection on the engine load

```
KeyframeCardList.vue:46-48    void loadAnimationEngine().then((engine) => { formatFn.value = engine.formatCSSKeyframeString; });
src/animation/load-engine.ts:123-124   export const loadAnimationEngine = () => (enginePromise ??= import("./public"));
```

A bare `import()` — it rejects on a chunk 404 (stale `index.html` against a redeployed asset hash, the classic gh-pages cache-bust). `void` suppresses the lint, not the rejection: there is no `.catch`, so this becomes an `unhandledrejection`. Every other engine site in this cluster is deliberate about the throw path — `useKeyframeOps.ts:25-40` wraps in `withErrorToastAsync` with a Retry action; `TypingDots.vue:68` documents an explicit unmount guard; `main.ts:74` writes `.catch(() => undefined)`.

There is also **no unmount guard** here: if the component tears down mid-flight, the `.then` writes to a dead `shallowRef`. That specific write is harmless (no timer, no listener, no DOM handle — **not** a leak), which is why this is MINOR and not MAJOR. Adopting L-6 removes the promise entirely and both sub-points with it.

**Falsifier.** Show `loadAnimationEngine()` cannot reject — it is `import("./public")`, so this requires proving the chunk is always resolvable.

---

## 8. L-8 — MINOR — a deep-reactive array of component instances

```
KeyframeCardList.vue:28    import { computed, ref, shallowRef } from "vue";
KeyframeCardList.vue:64    const cardInstances = ref<any[]>([]);
```

`ref([])` is deep — every element read is routed through `toReactive`. It stores `KeyframeCard` public instances. This is safe **only** because `KeyframeCard.vue:80` calls `defineExpose({ preEl })`, so Vue hands back the `markRaw`-flagged expose proxy (`runtime-core.cjs.js`, `getComponentPublicInstance`) and `reactive()` skips it. Delete that `defineExpose` and this line silently begins deep-proxying whole component instances.

The file already imports `shallowRef` (line 28) for `formatFn` — the correct posture is one word away and the author demonstrably knows it. `shallowRef([])` (or `shallowReactive`) makes the safety intrinsic rather than contingent on a child's choice.

**Falsifier.** Show `ref()` never proxies elements of an array of component proxies in 3.5.35 — i.e. that the `__v_skip` short-circuit is unconditional regardless of `defineExpose`.

---

## 9. L-9 — MINOR — glass-ui: root barrel where a subpath exists, on an undeclared dependency

```
KeyframeCardList.vue:29    import { Separator } from "@mkbabb/glass-ui";
KeyframeCard.vue:58        import { Input } from "@mkbabb/glass-ui/forms";      ← its own child, one subpath deep
```

Installed glass-ui 7.0.0 exports **73** subpaths including `./separator` and `./forms` (verified against `node_modules/@mkbabb/glass-ui/package.json`). Two files in the same 2-file component pair, two conventions.

**Census F-1 confirmed against today's tree, not merely folded:**

```
$ node -e '...' package.json → dependencies = { "@mkbabb/value.js": "4.0.0" }     ← no glass-ui
$ grep -c "glass-ui" package-lock.json → 0
$ node_modules/@mkbabb/glass-ui/package.json → "version": "7.0.0"                  ← installed anyway
```

So **line 29 is a load-bearing import of a package that `npm ci` will not install.** On a clean checkout this file is the point of failure. Per lane law I extend rather than contradict lane-frontend's **F-1** — and I add the consequence that lane did not draw: `tsconfig.lib.json`'s header shows F-1 already *cost the demo its type gate* (**L-4**), which is how L-1 shipped. F-1 is not just "the build breaks"; it is the reason the defects are invisible.

Using glass-ui at all here is **correct** (`feedback_glass_ui_first_class`); the finding is the barrel-vs-subpath inconsistency and the undeclared resolution.

**Falsifier.** Show `./separator` is not exported by the installed 7.0.0, or that a lockfile/`package.json` entry for glass-ui exists at this HEAD.

---

## 10. L-10 — MINOR — the child lives above its only parent

```
demo/components/instrument/keyframes/
    KeyframeCard.vue                  ← 81 lines
    components/KeyframeCardList.vue   ← imports "../KeyframeCard.vue" (:31)
```

`grep -rn "KeyframeCard.vue|<KeyframeCard" demo/` returns **only** this file. A component with exactly one consumer sits a directory above it, while the consumer sits in `components/`. The census's own roster prints the pair adjacently (lane-frontend §4, 82 / 81 lines) without noting the inversion. Either both belong in `components/`, or the `components/` sub-tier is not earning itself.

**Falsifier.** Find a second consumer of `KeyframeCard.vue`, or a build/route constraint that pins its location.

---

## 11. L-11 — INFO — a fallback that is compile-required and runtime-dead

```
KeyframeCardList.vue:10    :formatted-c-s-s="formattedStrings[i] ?? s"
```

`formattedStrings` is `props.frameStrings.map(...)` (`:50-52`) — identical length, recomputed synchronously before render. For every `i` the `v-for` produces, `formattedStrings[i]` is a `string`. The `?? s` never fires at runtime.

It is not *pointless*: `formattedStrings` is `string[]`, so `noUncheckedIndexedAccess` types the index as `string | undefined` and the `??` is compile-required (**contrast L-2**, where `frames: any[]` required nothing and the guard was omitted anyway). I record it as INFO rather than a defect because removing it naively would break the type — the real signal is that two index-parallel arrays (`frameStrings` + `frames`) should be one array of `{ id, start, raw, formatted }`, which would dissolve L-2 and L-11 together.

**Falsifier.** Exhibit a render where `formattedStrings.length < frameStrings.length`. That needs `computed` to serve a stale value against the same `props.frameStrings` read the `v-for` uses — impossible within one render pass.

---

## 12. L-12 — INFO — the exposed contract mixes shapes

```
KeyframeCardList.vue:81    defineExpose({ cardRefs, getPreElements });
KeyframesEditor.vue:177    () => cardList.value?.getPreElements() ?? []     ← called
KeyframesEditor.vue:237    const cards = cardList.value?.cardRefs ?? [];    ← read as a value
```

One member is a reactive `ComputedRef` (auto-unwrapped by the expose proxy), the other a plain function. Both work; the asymmetry means a consumer must remember which is which, and `cardRefs` reads *look* imperative while actually being reactive. Make both getters, or both values.

**Falsifier.** Show the consumer requires the reactive form of `cardRefs` (it does not — `:237` reads it once inside an async handler).

---

## 13. L-13 — INFO (parent-owned, cross-referenced) — the offset unit is inconsistent upstream

Not this file's defect, recorded because it corrupts the exact field L-1 concerns:

```
KeyframesEditor.vue:37-51    :model-value="animation.templateFrames.map((frame) => frame.start.value)"
                             (starts) => { frame.start.value = starts![i]; }      :min="-10" :max="110" :step="1"
```

`start.value` is a **fraction in [0,1]** everywhere it is produced — `css.js:494` (`value: t / 100`), `KeyframesEditor.vue:209` (`value: scalar.value / 100`), `selectorText` (`selector.value * 100`). The Slider reads those fractions against a −10…110 domain (every stop pinned at ≈0) and writes back raw integers, after which `selectorText` would emit `5000%`. It also silently reads `undefined` for a `{kind:"named"}` selector.

Filed here as an INFO cross-reference so the L-1 repair is not landed against a field the parent is already corrupting. Belongs to `KeyframesEditor`'s own challenge.

**Falsifier.** Show a normalization between the Slider binding and `start.value` — I found none in `KeyframesEditor.vue` or `useKeyframeOps.ts`.

---

## 14. Superlatives (L-18, the other direction)

### S-A — the declared child-ref contract that killed the document-wide sweep

```
KeyframeCardList.vue:74-79
    /** The list's own <pre> code blocks — collected from the cards' exposed `preEl`
     *  child refs (no querySelectorAll). */
    const getPreElements = (): HTMLElement[] =>
        cardInstances.value.map((c) => c?.preEl).filter((el): el is HTMLElement => el != null);
KeyframeCard.vue:76-80
    // The card's own contenteditable <pre> — surfaced for the parent's scoped
    // highlight collection (a declared child-ref contract, no querySelector).
    defineExpose({ preEl });
```

The composable this feeds names the bug it replaced:

```
useHighlightCSS.ts:74-76
    ... highlights ONLY the elements the caller hands it via `getOwnedElements` — never the whole
    document (D.W3.S1: the global `document.querySelectorAll("pre")` was the bug).
```

`useCodeHighlight(getOwnedElements)` is only *possible* because some component owns and publishes its element set. This one does, explicitly, with the rationale written down at both ends of the contract. That is the correct architecture for a scoped DOM effect in Vue, and it is rare to see it stated as a contract rather than assumed. **The mechanism is exemplary; L-3 is a bug in its bookkeeping, not in its design** — repairing the array leaves this shape intact.

*Falsifier (superlatives run both ways):* find a `querySelector`/`querySelectorAll` reaching into card DOM from this component or its consumer. `grep -rn "querySelector" demo/components/instrument/keyframes/` — none in the card path; the only `document.head.querySelector` calls are the `<style>`-element idiom inside `useHighlightCSS`, which is head-scoped by design.

### S-B — the raw/formatted split is a closed round-trip

```
KeyframeCardList.vue:9-10    :frame-string="s"                        ← raw:  "50% {\n  transform: …;\n}"
                             :formatted-c-s-s="formattedStrings[i]"   ← body: "transform: …;"
KeyframeCard.vue:26          <CopyButton :text="frameString" />        ← copies the complete, valid rule
KeyframeCard.vue:41-50       <pre contenteditable>{{ formattedCSS }}   ← edits the body only
useKeyframeOps.ts:110-111    const start = animation.templateFrames[frameIx]!.start;
                             const wrapped = `${selectorText(start)} { ${keyframeString} }`;
```

The contenteditable surface carries **only** the declaration body. The selector is re-attached on write-back from the authoritative in-memory `start` — it never round-trips through the DOM, so no amount of contenteditable mangling can corrupt a stop's offset. Meanwhile Copy gets the *complete* rule, which is what a user pasting into a stylesheet needs. Two different consumers, two correct projections, from one source. Deliberate and right.

*Falsifier:* show the selector being read back out of the DOM, or Copy yielding a body without its selector. `KeyframeCard.vue:43` emits `innerText` of the body-only `<pre>`, and `useKeyframeOps.ts:111` re-wraps from `templateFrames[frameIx].start` — neither happens.

### S-C — Goldilocks

82 lines. One responsibility (index-align two projections, relay four events, publish two child refs). Zero dead imports — `computed`, `ref`, `shallowRef`, `Separator`, `loadAnimationEngine`, `KeyframeCard` are all used. No god module, no inlined highlight/parse/format logic, and the neighbours it could have absorbed (`KeyframesEditor` 284, `CSSCodeEditor` 229, `KeyframesStringControls` 185, `KeyframesAddDialog` 161) stayed out. Every defect above is a *line*, not a *structure* — the decomposition is sound and the repairs are all local.

*Falsifier:* name a responsibility this file holds that belongs elsewhere, or a caller forced to reach around it. I found neither.

---

## 15. Corpus reconciliation

| corpus id | this challenge |
|---|---|
| lane-frontend **F-1** (glass-ui phantom dep, RED) | **CONFIRMED at HEAD** (`grep -c glass-ui package-lock.json` → 0; deps = value.js only; 7.0.0 installed). **EXTENDED** in L-4/L-9: F-1's second-order cost is that `tsconfig.lib.json` narrowed the CI type gate to `src/` *because of it* — which is why L-1 shipped. |
| lane-frontend §4 roster (`KeyframeCardList` 82 lines, G, "card list — Separator") | Agreed exactly. |
| lane-frontend **S-1..S-8** (bespoke→glass shadow census) | No S-row covers this component; no glass-ui primitive shadows a "keyframe card list". Neither extended nor contradicted. L-9 is a *subpath-hygiene* finding, a different axis from the shadow census. |
| lane-library **A4** (`compile/selector.ts:24` — `parseKeyframeSelector`, "Value's sole grammar authority") | **Directly load-bearing on L-1.** A4 establishes that selector ingestion is a value.js structured type; this file's `.toString()` is the read-out end of that seam failing to honour it. |
| lane-library §254 (`test/demo/instrument/value4-editor-boundary.test.ts` listed as parser-facing) | Read; it proves the `{kind, value}` shape (L-1) and tests `selectorText` in isolation — while no test covers the component that should call it (L-4). |

**No contradictions of the hitherto corpus.** Nothing in this file's tree disagrees with either lane.

---

## 16. Repair order (smallest correct diff first)

1. **L-1** — `:frame-start="selectorText(frames[i]?.start)"` + `import { selectorText } from "@utils/keyframeSelector"`. Folds L-2's missing guard in the same edit. *One line, one import.*
2. **L-3** — truncate or rebuild `cardInstances` so the exposed contract is length-true. *Two lines.*
3. **L-5** — `frames: TemplateAnimationFrame<any>[]` from the barrel already imported on line 30.
4. **L-6 + L-7 + L-11** — swap `loadAnimationEngine()` for `kfEngine().formatCSSKeyframeString`; the `shallowRef`, the promise, the null branch and the `?? s` all disappear together. *Net −8 lines.*
5. **L-8, L-9, L-10, L-12** — hygiene, independently landable.
6. **L-4** — the gate. Add `vue-tsc` and a demo-scoped type-check step; blocked on **F-1** (declare + lock glass-ui 7.0.0) exactly as lane-frontend §10 already ordered it. Without this, every repair above is un-defended against the next migration.

---

## Provenance note

Every line citation above was read in the working tree at `/Users/mkbabb/Programming/keyframes.js` (READ-ONLY evidence per lane law) or in its `node_modules/`. Vue behaviour claims are cited to `node_modules/@vue/runtime-core/dist/runtime-core.cjs.js` at the installed 3.5.35 — not from memory. **No file in keyframes.js was written, mutated, or executed; no installs, no dev server, no browser tooling.** The single write of this task is this file.
