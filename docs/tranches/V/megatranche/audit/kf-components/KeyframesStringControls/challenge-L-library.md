claude-opus-5[1m]

# CHALLENGE · `KeyframesStringControls.vue` · axis **L (LIBRARY)**

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/keyframes/KeyframesStringControls.vue` (185 lines, `wc -l`).
**Mode** static + read-only. Two **executed probes** against already-built artifacts (`dist/engine/index.js`, `node_modules/@mkbabb/value.js`, `node_modules/prettier`) — no product source touched, no installs, no dev server, no browser. Probe scripts live in the session scratchpad only.
**Posture** the component was assumed DEFECTIVE until the tree proved otherwise. Two candidate blockers I drafted were **killed by their own falsifiers** and are recorded as such in §5 — a false defect is worse than a missed one.

**Import closure read whole (12 files):**
`./CSSCodeEditor.vue` · `./composables/useKeyframesEditor.ts` → `useKeyframesState.ts` → `useKeyframesParsing.ts` → `useKeyframeOps.ts` · `./composables/useKeyframeBrushApply.ts` → `useApplyCSS.ts` → `useHighlightCSS.ts` · `./utils/parseAnimationCSS.ts` · `@kf-engine` (`demo/kf-engine.ts`) · `@utils/clipboard.ts` · `@utils/formatEditorCSS.ts` · `./index.ts`.
**Consumers read for contract:** `transport/channel-controls/ChannelControls.vue`, `transport/controls-pane/ControlsPaneWrapper.vue`, `transport/controls-pane/RibbonBar.vue`, sibling `KeyframesEditor.vue`.
**Engine sources read as evidence:** `src/animation/engine/animation.ts`, `engine/play-lifecycle.ts`, `engine/compile-bridge.ts`, `presets/catalog.ts`, `compile/emit/format.ts`, `format-options.ts`, `backward.ts`, `backward-walk.ts`, `refusal-probes.ts`, `internal/animation-id.ts`, `internal/helpers.ts`, `internal/transport/core.ts`.

---

## 0. Tally

| severity | n |
|---|--:|
| **BLOCKER** | **4** |
| MAJOR | 11 |
| MINOR | 6 |
| INFO | 3 |
| **defects total** | **24** |
| **superlatives** | **4** |

Headline: **the component's flagship affordance (Apply CSS) cannot work — the class it adds to the target and the selector the engine emits are two different strings, always.** Proven by running the real serializer (§1 BL-1).

---

## 1. BLOCKERS

### BL-1 · "Apply CSS" adds a class no emitted rule matches. The affordance is inert on **every** animation.

**Provenance.**
- `KeyframesStringControls.vue:114-119` → `useKeyframeBrushApply({ animation, styleId: keyframesStyleId, getCSSString: () => cssKeyframesString.value, templateRef: "brushEl" })`.
- `composables/useKeyframeBrushApply.ts:29-34` hardcodes `getClassName: () => options.styleId`.
- `composables/useApplyCSS.ts:46-49` — `setContent(getCSSString()); animation.targets.forEach(t => t.classList.add(className))`.
- `composables/useKeyframesState.ts:16` — `keyframesStyleId = \`keyframes-style-${animationUUID}\``.
- `composables/useKeyframesState.ts:41-43` — `getTmpAnimationName = () => keyframesStyleId.replace("keyframes-style-", "").toLowerCase()`.
- `composables/useKeyframesParsing.ts:37-40` — the injected text is `CSSKeyframesToString(animation, getTmpAnimationName())`.

**Executed probe** (`dist/engine/index.js`, real `CSSKeyframesToString`):

```
styleId  = "keyframes-style-square-Transform"     ← the class added to the target
tmpName  = "square-transform"                     ← styleId.replace(…).toLowerCase()
emitted  = ".square-transform {\n  animation-name: square-transform; … }\n\n@keyframes square-transform { … }"
```

The rule selector is `.square-transform`; the token pushed into `classList` is `keyframes-style-square-Transform`. They differ by the stripped `keyframes-style-` prefix **and** by case. Class matching is exact and case-sensitive. The two strings are *constructed* so as never to be equal — `getTmpAnimationName()` exists precisely to remove the prefix that `getClassName()` keeps.

**Consequence.** Clicking the ribbon's rainbow "Apply CSS" (`RibbonBar.vue:44-64` → `activeKeyframesRef?.applyCSSStyles?.()`) executes `useApplyCSS.ts:44-45` — `prevPaused = animation.paused; animation.paused = animation.started` — **stops the JS animation** — injects a `<style>` whose only rule matches nothing, and adds a class that binds nothing. The subject freezes with no CSS replacement. The button's entire promise ("hand the animation over to the browser") fails; the JS/CSS parity claim the editor is built to demonstrate is unobservable.

**Falsifier (what would kill this claim).** Any of: (a) a rule elsewhere in the cascade binding `@keyframes <uuid>` to `.keyframes-style-<uuid>` — `grep -rln "keyframes-style" demo/ test/` returns only the three composables that *construct* the id, and `grep -rn "useApplyCSS" demo/` returns exactly the one call site above; (b) `animation.targets` already carrying the `.<tmpName>` class from scene markup; (c) `getClassName` being overridden at some call site — it is not, `useKeyframeBrushApply` is the only caller and both its consumers (`KeyframesStringControls.vue:114`, `KeyframesEditor.vue:260`) pass `styleId` only. A live check would confirm the freeze; the string mismatch itself needs no live check.

**Fix shape (one line).** `getClassName: () => options.styleId` → the tmp-animation-name derivation, or emit the rule under `.${styleId}`. Whichever wins, the two derivations must be single-sourced — today the same fact is computed twice, in two files, differently.

---

### BL-2 · Animation names containing whitespace emit invalid CSS idents into the editor buffer and make `classList.add` **throw**.

**Provenance.**
- `src/animation/internal/animation-id.ts:29-34` — `getAnimationId = a => a.name ?? String(a.id)` (the **name**, verbatim).
- `demo/state/animationOptionsStore.ts:124-132` — `createAnimationUUId` returns `` `${superKey}-${animationId}` ``.
- Live animation names with spaces: `demo/scenes/amiga/useAmigaDemo.ts:144` `bouncingX.name = "Bouncing X"`, `:146` `"Bouncing Y"`; `demo/scenes/spring/useSpringKeyframesEditor.ts:65` `springEditAnim.name = "Spring Keyframes"`.
- These channels **do** get a keyframes pane: `demo/state/controlSurfaces.ts:105-110` — "a channel carrying an `animation` earns `{controls,keyframes,timeline}`" (`selected?.animation ? [...BUILT_IN_SURFACES]`), gated at `ChannelControls.vue:130 v-if="hasSurface('keyframes') && keyframesWarmed"`.

**Executed probe** (real serializer, real derivation):

```
styleId = "keyframes-style-amiga-Bouncing X"
tmpName = "amiga-bouncing x"
emitted head:   .amiga-bouncing x {
                  animation-name: amiga-bouncing x;
emitted at-rule: @keyframes amiga-bouncing x {
```

**Three consequences, all on the primary path.**
1. `cssKeyframesString` — the string **bound straight into Monaco** (`KeyframesStringControls.vue:6`) and seeded at `:124` — is invalid CSS from first paint. The user is shown a broken document as the editor's initial content.
2. Any subsequent edit routes that text through `updateFromString` → `parseAnimationCSS` (`utils/parseAnimationCSS.ts:26-34`), which throws `TypeError("Invalid animation CSS: …")` on a `PARSE_ERROR` diagnostic → the component's `catch` (`:102-111`) fires the red "Failed to parse keyframes 🔧" toast. The editor is unusable for these channels.
3. `useApplyCSS.ts:47-49` calls `t.classList.add("keyframes-style-amiga-Bouncing X")`. `DOMTokenList.add()` throws `InvalidCharacterError` for any token containing ASCII whitespace (DOM Standard, "validate token"). The throw lands **after** `setContent(...)` and **before** `isApplied.value = true` (`:50`) — so the `<style>` is injected, the class is not added, and `isApplied` stays `false`: the button never lights, and every subsequent click re-injects. The throw propagates out of the bare `@click` at `RibbonBar.vue:53`.

**Falsifier.** Show that no keyframes-surface channel carries a whitespace name (contradicted by `useAmigaDemo.ts:144/146` + `controlSurfaces.ts:105`); or that `DOMTokenList.add` tolerates whitespace tokens (it does not); or that `getAnimationId` sanitises (it returns `a.name` verbatim — `animation-id.ts:33`). The `classList` throw is the only clause here that would benefit from a live confirmation; the emitted-ident half is probe-proven.

**Note on locus.** BL-1 and BL-2 both live in the *shared* `useKeyframeBrushApply`/`useApplyCSS`/`useKeyframesState` triad, so `KeyframesEditor.vue` inherits both. They are reported here because this component is the one that ships them to the ribbon's primary button, and because the audit brief scopes "every file it imports".

---

### BL-3 · `formatEditor` has no error posture: a prettier rejection fails silently **and** permanently sticks `isFormatting`.

**Provenance.** `KeyframesStringControls.vue:83-88`:

```ts
const formatEditor = async () => {
    if (!editorRef.value) return;
    isFormatting.value = true;
    await editorRef.value.formatCSS();   // ← can reject
    startFormattingReset();              // ← never reached on reject
};
```

Path: `CSSCodeEditor.vue:178-187 formatCSSContent` → `@utils/formatEditorCSS.ts:10-14` → `prettier.format(css, { parser: "scss", plugins: [postcss] })` over `editor.getValue()` — **raw user text**.

**Executed probe** (installed `prettier` 3.x + `plugins/postcss`, the exact call):

```
PRETTIER THREW <= "@keyframes x { 0% { opacity: 0; }"  => SyntaxError: CssSyntaxError: Unclosed block (1:1)
PRETTIER THREW <= "0% { color: ; }}}"                  => SyntaxError: CssSyntaxError: Unexpected } (1:16)
PRETTIER THREW <= ".a { b"                             => SyntaxError: CssSyntaxError: Unknown word b (1:6)
```

An in-progress edit in a CSS editor is *routinely* unbalanced. Three consequences:

1. **`isFormatting` never resets.** `useTimeoutFn`'s `start()` (`:75-88`) is only called after the await. Once stuck `true`, `:101 if (!isFormatting.value) toast.success(...)` suppresses the parse-success toast for the rest of the component's life — a silent, permanent state corruption from a routine user action.
2. **Unhandled rejection, no feedback, at both call sites.** `:92 formatEditor()` inside the *synchronous* `onKeyDown` — not awaited, not `void`ed, no `.catch`. And `defineExpose.formatCSS` (`:172`) is invoked bare from `RibbonBar.vue:28 @click="activeKeyframesRef?.formatCSS?.()"`. Pressing Format on invalid CSS does nothing visible and logs an unhandled rejection.
3. `CSSCodeEditor.vue:186 toast.success("CSS formatted")` sits *after* the throw point, so the success toast correctly does not fire — but nothing fires in its place.

**The house idiom exists and is not used here.** `composables/useKeyframeOps.ts:25-40 withErrorToastAsync` wraps exactly this shape (toast + description + a **Retry** action) and is applied to all five mutation ops (`:97`, `:113`, `:159`). `exportCompiledCSS` in this very file catches (`:161-167`). Format is the outlier.

**Falsifier.** Show `prettier.format` with `parser:"scss"` resolving for lexically-broken input (probe above says otherwise), or a `catch` anywhere on `formatEditor → formatCSS → formatEditorCSS` (there is none — `formatCSSContent` has no try, `formatEditor` has no try).

---

### BL-4 · The component's own script block is typechecked by **nothing**. A live `TS2554` in its closest dependency proves the gap is not theoretical.

**Provenance.**
- `package.json:37` — `"check": "tsc --noEmit && tsc --noEmit -p tsconfig.test.json"`. Plain `tsc` cannot read `.vue`; `tsconfig.json`'s `include: ["src/","demo/"]` therefore matches zero SFC script blocks.
- `grep -rn "vue-tsc" package.json .github/workflows/` → **0 hits**. No `vue-tsc`, no `@vue/language-tools`, in dependencies or in any workflow.
- `.github/workflows/ci.yml:41-42` runs only `npm run check:lib` (`tsconfig.lib.json`, `src/` only). `release.yml:42-43` the same. `deploy-pages.yml` runs `npm ci` + build, no typecheck.

**The live proof.** `CSSCodeEditor.vue:114-120`:

```ts
const debouncedEmit = debounce(
    (value: string) => { modelValue.value = value; },
    200,
    false,          // ← third argument
);
```

The only `debounce` in the repo — `src/animation/internal/helpers.ts:15-24` — takes **exactly two** parameters (`fn`, `milliseconds`); there is no overload (`grep -rn "export function debounce\|export const debounce" src/ demo/` → one hit). This is `TS2554: Expected 2 arguments, but got 3`. The argument is silently discarded: the author's evident intent (leading/trailing selection) is a no-op, and the 200 ms debounce that governs the editor's write-back loop (M-1) is trailing-only regardless of what a reader concludes from `false`.

**Scope of the exposure on this file.** 185 unchecked lines carrying `KeyframesAnimation<any>` props (`:50`, `:56`), `(e as Error).message` casts (`:106`, `:163`), `editorRef` typed via `InstanceType<typeof CSSCodeEditor>` (`:70`), and — through its imports — `useTemplateRef<HTMLElement>` over an SVG root (D-5). None of it is enforced.

**Falsifier.** A passing `npx vue-tsc --noEmit` over `demo/`, or any workflow step that typechecks `.vue`. Neither exists in the tree at the audited HEAD.

---

## 2. MAJOR

### M-1 · The editor↔projector echo loop rewrites the Monaco buffer ~300 ms after every typing pause, resetting the undo stack.

The loop is created **by this component's wiring**, `:6` + `:11`:

```
type → CSSCodeEditor.vue:151-154 onDidChangeModelContent
     → :114 debouncedEmit (200 ms) → modelValue.value = text → emits update:model-value
     → KeyframesStringControls.vue:98 onEditorChange
     → useKeyframeOps.ts:59-85 updateFromString  (parse + yieldToMain + compile + adoptCompiled)
     → :84 sync.debouncedUpdateAllStrings()      (100 ms — useKeyframesParsing.ts:62)
     → useKeyframesParsing.ts:48-60 updateAllStrings
     → :31-46 updateCSSAnimationKeyframesStringFromAnimation
     → cssKeyframesString.value = <prettier-formatted library re-serialization>
     → CSSCodeEditor.vue:165-176 watch(modelValue) → editor.setValue(newVal)
```

The guard at `CSSCodeEditor.vue:168` (`editor.getValue() !== newVal`) does not save it: the round trip is a re-serialization at a *different* print width (M-2), so byte-equality with the user's buffer is effectively impossible. `IStandaloneCodeEditor.setValue` delegates to `ITextModel.setValue`, which **resets the undo/redo stack** — Ctrl+Z is destroyed on every typing pause. The caret is restored by `(line, column)` (`:169`, `:184`) into reflowed text.

`CSSCodeEditor` exposes `setValue`/`getValue` (`:223-228`) precisely so a host can push imperatively *without* the reactive loop. This component holds `editorRef` (`:70`) and uses neither.

**Falsifier.** Prove `updateAllStrings()`'s output is byte-identical to the user's buffer for ordinary edits, or prove Monaco's `setValue` preserves the undo stack. The `setValue` call itself is statically provable; the *feel* of the caret jump is **UNPROVEN-NEEDS-LIVE** (SS-13).

### M-2 · Two different print widths format the same buffer; `getFormatWidth()` in the shared composable is dead code that always returns `undefined`.

`useKeyframesState.ts:31-39`:

```ts
const getFormatWidth = (el?: HTMLElement) => {
    el ??= tabsListEl.value!;                          // :32 — the `!` is a lie
    if (el == null || el.offsetWidth == null) return undefined;
    return convertPixelsToCh(el.offsetWidth, el);
};
```

`tabsListEl` (`:27`) is **never assigned anywhere in the tree**: `grep -rn "tabsListEl" demo/` returns 4 hits — the declaration, the `??=` read, the return, and the barrel re-export at `useKeyframesEditor.ts:32`. No `ref="tabsListEl"` template binding, no `.value =`. So `el` is always `null`, the guard fires, and **all three** composable-side format calls (`useKeyframesParsing.ts:41`, `:53`, `useKeyframeOps.ts:147`) run at prettier's default `printWidth = 80` (`formatEditorCSS.ts:4`).

Meanwhile `CSSCodeEditor`'s **own** `getFormatWidth` (`:107-112`) is real — container `offsetWidth → ch` — and feeds `formatCSSContent` (`:180`).

**Net:** press Format → text reflows to container width; type one character → ~300 ms later the echo loop (M-1) reflows it back to 80 columns. `isFormatting` (`:71-88`) is a 300 ms band-aid over exactly this collision. Also dead: `el.offsetWidth == null` can never be true (`offsetWidth` is always a number, `0` when hidden).

**Falsifier.** Find any assignment to `tabsListEl`.

### M-3 · The parse-error shake animates nothing: `presets.shake()` is constructed target-less and never receives targets.

`:121 const parseErrorShake = presets.shake();` → `src/animation/presets/catalog.ts:309-315 definePreset` returns `new CSSKeyframesAnimation({...spec.options}).fromString(spec.css)` — **no targets**. `setTargets` is never called on it (`grep -c setTargets` in the component → 0).

`:103 parseErrorShake.play()` therefore runs an 820 ms rAF loop (`catalog.ts:50-53`, `duration: 820`) painting to an empty target list: `play-lifecycle.ts:268-274 playRAF` schedules the loop unconditionally; `dispatchAnimationEvent` (`:63-73`) iterates `anim.targets` — empty, no throw. **The only non-toast error affordance in the component is inert.**

Additionally the promise is floated bare inside a `catch` (`:103`), while the sibling brush call **in the same import closure** is explicitly `void`ed (`useKeyframeBrushApply.ts:38`) — a posture inconsistency that becomes a live unhandled rejection the moment `play()` rejects (`play-lifecycle.ts:377 anim.assertNoUnresolvedNamedSelector()` throws inside the async body).

**Falsifier.** Show a `setTargets` binding for `parseErrorShake`, or show `CSSKeyframesAnimation.fromString` auto-binding document-level targets (it does not — `fromString` parses keyframes text; `catalog.ts:309-315` passes no target varargs).

### M-4 · The brush feedback animates a `display:none` element — forever.

`:14-18` renders `<Paintbrush ref="brushEl" class="hidden" />`. `.hidden{display:none}` is in the cascade the demo imports (`node_modules/@mkbabb/glass-ui/dist/styles/components.css`, verified by grep; also Tailwind core) and is not overridden anywhere in `demo/styles/`. `useKeyframeBrushApply.ts:42` binds that element as the **sole target** of an `iterationCount: "infinite"`, 700 ms rotate animation (`:18-27`), started at `:38` whenever Apply CSS toggles on.

The *visible* brush lives in `RibbonBar.vue:55-62`; this component has none. So the composable's entire feedback half is dead here — an invisible perpetual rAF that stops only on unapply (`:39`) or unmount (`:43`) — and the pane is **force-mounted** and never unmounted while the surface is valid (`ChannelControls.vue:117-136`: "FORCE-MOUNT the Monaco-heavy keyframes pane and cache it via content-visibility:hidden when inactive").

The composable **contract** is the real defect: `useKeyframeBrushApply` fuses apply-CSS *state* with brush *feedback*, so a consumer needing only the state must fabricate a phantom element to satisfy `templateRef`. Contrast `KeyframesEditor.vue:87-95`, where the same composable's brush sits inside a real, visible, `aria-pressed` button — that is the intended shape.

**Falsifier.** A rule making `.hidden` non-`display:none` in this subtree, or evidence that a `display:none` target yields user-visible feedback.

### M-5 · The "structural projector" watch is provably inert, and the 10-line invariant comment above it is false.

`useKeyframesParsing.ts:86-103` — a long comment asserting *"the `flush: 'post'` + `nextTick` ordering (D.W3.S4) keeps the derived strings from reprojecting off a half-applied array"* — over:

```ts
watch(animation.templateFrames, async () => { await nextTick(); debouncedUpdateAllStrings(); }, { flush: "post" });
```

**Killed twice, independently:**

1. **The source is a plain array.** `src/animation/engine/animation.ts:208-213` — `templateFrames` is a *getter* returning `compilerFor(this).templateFrames`, a library array, never a Vue proxy; and every demo animation is additionally `markRaw`'d (`useSpringKeyframesEditor.ts:57`, `useCubeDemo.ts:65`, `SquareScene.vue:174`, `useSequenceDemo.ts:139`, …). Vue's `doWatch` tests `isRef → isReactive → isArray`; a plain array falls into the **multi-source** arm — one source per element — and each element is a plain `TemplateAnimationFrame`, so the mapped getter yields `undefined` per slot (and `warnInvalidSource` per slot in dev). The callback cannot fire.
2. **The array identity is replaced on every edit.** `useKeyframeOps.ts:70` calls `animation.adoptCompiled(compiled)` → `engine/compile-bridge.ts:89-93` — `setCompilerFor(anim, compiler)`, *transplanting the whole compiler*. `animation.templateFrames` is a different array object after each editor edit, while the watch holds the one captured at setup.

**Consequence for this component:** no functional regression on its own paths (every structural change here is also followed by an explicit `debouncedUpdateAllStrings()`), but it is dead machinery, a dev-console `warnInvalidSource` per keyframe per editor mount, and a documented invariant that is not true — which is how the next wave gets misled.

**Falsifier.** Show `animation.templateFrames` returning a reactive proxy, or the callback firing on a frame add/remove.

### M-6 · The component takes a **fatal**, unnecessary synchronous dependency on the engine warm; a failed warm renders the pane blank.

`:44-45 const { CSSKeyframesAnimation, presets, compileToCSS } = kfEngine();` runs in the setup body; `kfEngine()` **throws** if `warmKfEngine()` has not resolved (`demo/kf-engine.ts:49-56`). Worse, `useKeyframeBrushApply.ts:6` calls it at **module scope**, so the throw happens during the dynamic import of the component's chunk.

`demo/app/main.ts:50` mounts with `warmKfEngine().catch(() => undefined)` — a failed warm (a 404 on a stale deploy, an offline first paint) is swallowed and the app mounts anyway. The keyframes pane is a `defineAsyncComponent` (`ChannelControls.vue:252`, `keyframes/index.ts:8-10`) with **no `errorComponent`** → the loader rejects, Vue logs, and the tabpanel renders **empty** with zero user-facing signal.

**And the dependency is not needed.** Of the three bindings: `CSSKeyframesAnimation` is dead (D-1); `presets.shake()` is inert (M-3); `compileToCSS` is used only inside an `async` click handler (`:133-168`) where `await loadAnimationEngine()` — the idiom **every composable in this same directory uses** (`useKeyframesParsing.ts:34`, `:49`; `useKeyframeOps.ts:63`, `:115`) — would have been non-fatal and, post-warm, equally instant. One file, two engine-consumption idioms, and the fatal one carries the three least load-bearing bindings.

**Falsifier.** Prove `warmKfEngine()` cannot reject, or point at an `errorComponent`/error boundary over the keyframes pane.

### M-7 · `copyCSS` has no error posture at all; the ribbon Copy button silently no-ops on any clipboard rejection.

`:173-177`:

```ts
copyCSS: async () => { if (cssKeyframesString.value) await copyText(cssKeyframesString.value, "CSS copied to clipboard"); },
```

`@utils/clipboard.ts:3-8` awaits `navigator.clipboard.writeText` with no `try`. Invoked from `RibbonBar.vue:20` as `activeKeyframesRef?.copyCSS?.()` — no `.catch`. Rejects on permission denial, an unfocused document (Safari's `NotAllowedError`), or a non-secure origin (where `navigator.clipboard` is `undefined` → `TypeError` on property access). Result: unhandled rejection, button appears dead.

Thirty lines earlier, in the **same `defineExpose` block**, `exportCompiledCSS` wraps the *identical* `copyText` in try/catch + `toast.error` (`:161-167`). Two clipboard verbs, one export surface, opposite postures. Also: `copyCSS` silently returns when `cssKeyframesString` is empty — no "nothing to copy" signal.

**Falsifier.** Prove the demo is only ever served over a secure, focused context and that `copyText` cannot reject.

### M-8 · A success toast per typing pause, with no dedupe id.

`:101 if (!isFormatting.value) toast.success("Keyframes parsed 🎉");` fires on **every** `update:model-value` — i.e. every 200 ms-debounced typing burst (`CSSCodeEditor.vue:114-120`). Continuous authoring produces one success toast per pause, stacked, because no `id` is passed.

The exemplary posture is one file away: `KeyframesEditor.vue:189-205` passes `id: startDiagnosticId(index)` and calls `toast.dismiss(...)` on recovery — a replaceable, self-clearing diagnostic. The error path in *this* file is closer to right (`:105-108`, 10 s duration) but also un-`id`'d, so repeated parse failures stack red toasts too.

**Falsifier.** Show vue-sonner de-duplicating identical messages by default, or `onEditorChange` firing only on blur/commit.

### M-9 · The glass-ui phantom dependency (lane-frontend **F-1**) bites this component on two transitive edges the census scored it clean on.

`lane-frontend.md:180` files `KeyframesStringControls.vue` as **`b`** ("no glass-ui import"), and §5's tally places it under *"Bespoke, no glass counterpart"*. **Direct-import-wise that is correct; transitively it is wrong, and both edges are on this component's critical path:**

| edge | file:line | what it gates |
|---|---|---|
| 1 | `./CSSCodeEditor.vue:38` → `@mkbabb/glass-ui/dark` | the editor host — this component's **entire render** |
| 2 | `./composables/useKeyframeBrushApply` → `useApplyCSS.ts:4` → `useHighlightCSS.ts:2` → `@mkbabb/glass-ui/dark` | the Apply-CSS `<style>` driver |

**F-1 re-verified on this tree at this HEAD:** `grep -n "glass-ui" package.json` → 0 hits; `grep -c "glass-ui" package-lock.json` → **0**; `node_modules/@mkbabb/glass-ui/package.json` → `7.0.0`. `ci.yml:39` and `deploy-pages.yml` both run `npm ci`, which reconstructs `node_modules` strictly from the lock.

This is a **refinement of F-1, not a contradiction**: F-1's RED stands, and the roster's per-file `G/b` column is a *direct*-import census that under-reports exposure. Two of the five most load-bearing files in this component's closure are glass-ui-bearing; on a lockfile-faithful install its import graph does not resolve.

**Falsifier.** A green `npm ci && npm run gh-pages` from a clean checkout.

### M-10 · Every typing pause runs **N+1** prettier formats; N are computed for a ref this component never renders.

`useKeyframesParsing.ts:48-60 updateAllStrings` unconditionally does:

```ts
templateFrameStrings.value = [];
const cards = await CSSKeyframesToStrings(animation);
templateFrameStrings.value = await Promise.all(cards.map(card => formatEditorCSS(card, getFormatWidth())));
const keyframesString = await updateCSSAnimationKeyframesStringFromAnimation();  // the 1 this component wants
```

`templateFrameStrings` is the per-keyframe **card** projection, rendered only by `KeyframesEditor.vue:14/26` (`<KeyframeCardList :frame-strings=…>`). `KeyframesStringControls` neither destructures nor renders it — yet the echo loop (M-1) drives `updateAllStrings` on every typing pause via `useKeyframeOps.ts:84`. For an N-stop animation that is N wasted `CSSKeyframesToStrings` serializations plus N wasted `prettier.format` calls per pause, all discarded.

**Falsifier.** Show `templateFrameStrings` rendered by this component, or `updateAllStrings` short-circuiting when it has no card consumer (it does not).

### M-11 · Module cohesion: `useHighlightCSS.ts` fuses two unrelated composables, and this component pays for the half it does not use.

`useApplyCSS.ts:4` imports `useHighlightCSS` — a 38-line `<style>`-element lifecycle with zero glass-ui and zero highlight.js need (`useHighlightCSS.ts:27-64`) — from a module whose **other** export `useCodeHighlight` owns the highlight.js boot (`:4-25`) and the `@mkbabb/glass-ui/dark` import (`:2`). Two reasons to change, one module; and the M-9 edge #2 enters through a composable that has no business needing it.

**Bundle bloat is explicitly NOT claimed** — rolldown should shake the unused half. The cohesion defect is structural and needs no falsifier; any bundle claim would need a `--mode gh-pages` chunk report and is therefore **UNPROVEN-NEEDS-LIVE**.

---

## 3. MINOR

**D-1 · Dead destructures.** `CSSKeyframesAnimation` (`:44`) and `getTmpAnimationName` (`:65`) each appear **exactly once** in the file — at their own declaration (`grep -n` confirms). The former is actively misleading: a reader concludes the component constructs animations; it does not. It is also one third of the fatal `kfEngine()` coupling (M-6).

**D-2 · Three of four props restate `CSSCodeEditor`'s own defaults.** `:8 :font-size="14"`, `:9 :line-numbers="true"`, `:10 :border="true"` vs `CSSCodeEditor.vue:87-92` `{ fontSize: 14, lineNumbers: true, border: true }`. Only `height="450px"` carries information. Restated defaults drift silently when the default changes.

**D-3 · The `Ï` shortcut is a magic literal, unregistered, undiscoverable, and duplicated with divergent behavior.** `:91 if (e.key === "Ï")` — no modifier test, layout-specific, and it `preventDefault()`s the key so a user whose layout emits `Ï` as a printable character cannot type it into the CSS buffer. It is **not** registered with the app's shortcut registry (`registerShortcut` from `@mkbabb/glass-ui/keyboard`, used at `EditorShell.vue:122` and enumerated by `KeyboardShortcutsModal.vue:48-51`), so it never appears in the shortcuts modal. `KeyframesEditor.vue:219-222` tests the **same** literal and does nothing but `preventDefault()` — one magic key, two files, two behaviors.

**D-4 · The "partial compile" arm (10 lines) is unreachable at this call site.** `:141-150`. `compileToCSS([animation])` → `backward-walk.ts:118-135 walkList` always yields **exactly one** child; `backward.ts:227-231` pushes a chunk only when non-null, and `compileChild` returns `null` **only** after pushing a refusal (`:192-195`, `:214-216`, `:234-238`, `:264-272`). For one child, `css` non-empty ⟺ `refusals` empty ⟺ `eligible`, so only the first and third arms are reachable. The comment "some children compiled, some refused" describes a state a single animation cannot produce. (The symmetric hole — `eligible === true` with `css === ""`, which the `else` would swallow in silence — is unreachable for the same reason.) **Falsifier / fix:** pass the `AnimationGroup` instead of `[animation]`, which is arguably what the CC-4 comment at `:127-132` ("compile the orchestration graph") already claims — then both arms become live and the reported artifact matches the prose.

**D-5 · `useTemplateRef<HTMLElement>` over an SVG root.** `useKeyframeBrushApply.ts:17` declares the brush `HTMLElement`. `Paintbrush` is a lucide **functional** component (`node_modules/@lucide/vue/dist/esm/createLucideIcon.mjs` — `(props, { slots, attrs }) => h(Icon, …)`), so Vue's `setRef` assigns `vnode.el`: the rendered `<svg>`, an `SVGElement`, which is **not** an `HTMLElement`. It is then fed to `setTargets(...targets: HTMLElement[])` (`engine/animation.ts:465`). Harmless at runtime (`.style` exists), but the declared type is false — and unchecked, per **BL-4**.

**D-6 · `useKeyframesEditor` is a 20-member monolith; this component uses 4.** `useKeyframesEditor.ts:27-56` returns 20 members. `KeyframesStringControls.vue:62-68` destructures 5 and uses 4 (`cssKeyframesString`, `keyframesStyleId`, `updateFromString`, `updateCSSAnimationKeyframesStringFromAnimation`). Not merely aesthetic: instantiating it also instantiates `useKeyframeOps` (7 unused mutation ops) and the inert `templateFrames` watch (M-5), and drives the wasted N-format work (M-10). The composable's own doc (`:11-13`) says the shape is preserved *"so the `KeyframesEditor.vue` callsite keeps resolving"* — i.e. it is shaped for the other consumer and inherited wholesale by this one.

---

## 4. INFO

**I-1 · `document.head.querySelector(\`#${styleId}\`)`** (`useHighlightCSS.ts:31`) interpolates an untrusted-shape id into a selector. With today's ids (`keyframes-style-<sceneId>-<name>`) no `SyntaxError` occurs, but under BL-2's whitespace names the selector silently re-parses as a descendant combinator (`#keyframes-style-amiga-Bouncing Keyframes`), so the reuse branch never matches and each mount appends a fresh `<style>`. `document.getElementById(styleId)` is the correct call and has no selector-grammar failure mode. Recorded as INFO because it is currently benign for the non-whitespace channels.

**I-2 · `(e as Error).message`** at `:106` and `:163` yields `undefined` in the toast description for a thrown non-`Error`. The house idiom (`useKeyframeOps.ts:34`) does the same, so this is consistency, not novelty.

**I-3 · `KeyframesAnimation<any>`** at `:50`/`:56`. Endemic (`ChannelControls.vue:258`, `KeyframesEditor.vue:133`, every composable in the directory). The control-surface boundary genuinely cannot know `Vars`; `KeyframesAnimation<Vars>` would be the honest bound. Not pushed — it is a repo-wide convention, and **BL-4** means no bound would be enforced anyway.

---

## 5. Claims I drafted and then **killed** (falsifier discipline)

Recorded so the next reader does not re-derive them.

**KILLED-1 · "The serializer emits no selector, so the injected CSS is naked declarations."** I read `format-options.ts:37-58` (`animationOptionsToString`, which returns bare `  animation-name: …;` lines) and `format.ts:331-340` and concluded no `.class {` wrapper is emitted — which would have made Apply CSS inject a sheet the browser drops entirely. **Executing the real `CSSKeyframesToString` from `dist/engine/index.js` refuted it**: the output opens `.square-transform {\n  animation-name: …\n}` and then `@keyframes …`. The wrapper is emitted. (What *is* true is BL-1: the wrapper's selector and the applied class disagree.)

**KILLED-2 · "The editor's dialect does not round-trip: `parseAnimationCSS` finds no top-level style rule, so options reset to defaults on every edit."** A probe against the installed `@mkbabb/value.js` `/css` subpath confirmed that the *real* emitted shape parses cleanly (`parseStylesheet(...).ok === true`) and that `collectStyleRules` returns exactly one `path.length === 1` row carrying the `animation-*` declarations — which is precisely what `utils/parseAnimationCSS.ts:36-41` selects. The options round-trip is **sound**. (My earlier hand-built input — the wrapper-less shape from KILLED-1 — was rejected by value.js with `css_syntax / expected "style body"`; that diagnostic belongs to a string the tree never produces.)

**KILLED-3 · "The `animation` prop capture at `:115` is stale."** `useKeyframeBrushApply({ animation, … })` snapshots the reactive-destructured prop at setup, and `useKeyframesEditor(() => animation, …)` passes a getter that `useKeyframesEditor.ts:22` immediately calls once — so the getter is decorative. **But `ControlsPaneWrapper.vue:45-48` keys the `v-for` on `host.animation.id`** with the explicit comment "an ChannelControls instance is BORN with its animation (and dies with it)". Every instance is fresh per animation; there is no live staleness. What survives is a **posture inconsistency only** (a thunk at `:68`, a raw value at `:115`, for the same prop, three lines apart) — noted here, not counted as a defect.

---

## 6. SUPERLATIVES (L-18 runs both ways)

**SUP-1 · The mount path calls the NARROW projector — correctly.** `:123-125` awaits `updateCSSAnimationKeyframesStringFromAnimation()` (string-only) rather than `updateAllStrings()`, because this component renders no per-keyframe cards. `KeyframesEditor.vue:280` correctly calls the wide one. Two consumers, one composable, two right choices. *Falsifier applied:* if this component rendered `templateFrameStrings` the narrow call would be a bug — it does not (grep: 0 template references). *Caveat:* undercut in practice by M-10, since the echo loop then calls the wide projector anyway; the **mount-path choice itself** stands as exemplary.

**SUP-2 · The CC-3 refusal report is surfaced VERBATIM — the best engine-consumption idiom in the file.** `:151-159` prints `refusal.reason` (the typed `CompileRefusalReason` union, `refusal-probes.ts:4-8`) in the title and `refusal.message` in the description, at 10 s, with **no softening** — and the comment at `:127-132` states why ("the named refusal IS the product value"). The library's honest-refusal contract (`probeChildRefusal`, `refusal-probes.ts:16-56`) is passed straight to the user instead of collapsing into "export failed". *Falsifier:* if the library's messages were internal jargon this would be a defect, not a superlative — they are not; each names the kf axis that exceeds CSS and states the remedy ("attach an `Easing.css` twin or use a registry name / `cubic-bezier()` / `linear()`").

**SUP-3 · `useTimeoutFn` instead of a hand-rolled timer handle.** `:73-81` — `{ immediate: false }`, with a comment naming both the ownership ("useTimeoutFn owns the handle + auto-cleans on unmount") and the restart semantics ("re-calling `start()` restarts it"). VueUse ties the handle to the effect scope, so the 300 ms reset cannot fire past unmount. This is the one **correct teardown** in the file — set against `useKeyframeBrushApply.ts:43` (`pause()` on unmount but the target-less `parseErrorShake` has none) and `useHighlightCSS.ts:58-61` (unconditional `.remove()` of a possibly-shared node). *Falsifier:* a leak across unmount would kill it; the scope binding forecloses one. (It is a band-aid over M-2 — but the mechanism chosen is right.)

**SUP-4 · The lazy-load discipline around this component is genuinely careful — which is what makes M-6 the odd one out.** The Monaco-bearing chunk is reachable **only** through `defineAsyncComponent` (`keyframes/index.ts:5-11` with a comment explaining exactly why; `ChannelControls.vue:252`); the pane is gated on `keyframesWarmed` with a documented pointerenter/focusin warm (`ChannelControls.vue:79-80`, `:130`); and `CSSCodeEditor` boots Monaco behind a module-scoped idempotent promise (`:49-76`) with **both** `?worker` entry-points made dynamic for a stated eager-edge reason, plus a `disposed` race guard (`:100-105`, `:126-130`, `:218-221`) so a chunk that resolves after unmount cannot leak an editor over a detached node. That is a higher standard of async hygiene than most of the tree — and it is precisely why the synchronous, throw-on-cold `kfEngine()` at `:44` (and at `useKeyframeBrushApply.ts:6`, module scope) reads as an unforced regression rather than an oversight.

---

## 7. Corpus reconciliation

| corpus id | this challenge |
|---|---|
| **lane-frontend F-1** (glass-ui phantom dep, RED) | **Re-verified at this HEAD** (0 hits in `package.json`, 0 in the lock, 7.0.0 installed) and **localised** to this component: two transitive edges, both critical-path — see **M-9**. |
| **lane-frontend §4 roster line 180** (`KeyframesStringControls.vue \| 185 \| b`) | **Refined, not contradicted.** Line count exact (185). The `b` (no glass-ui) is right for *direct* imports and misleading for exposure: the `G/b` column is a direct-import census. **M-9**. |
| **lane-frontend §5 shadow tally** ("Bespoke, no glass counterpart" — includes KeyframesStringControls) | **Agreed.** A Monaco host has no glass-ui counterpart; this component adds nothing to S-1..S-8. No shadow finding raised. |
| **lane-frontend S-8** (TypingDots — justified bespoke, dogfood the engine) | **Same principle, opposite verdict here.** The dogfood animation in *this* component (`presets.shake()`, `presets`-driven brush) does not exercise the engine at all — target-less (**M-3**) or `display:none` (**M-4**). Dogfood that paints nothing is not coverage. |
| **lane-library §4.1 A13** (`fromString` — the public string entry) / **A3** (`parseCssValues` throws) | Consumed at `useKeyframeOps.ts:66-69` via `parseAnimationCSS` → `resolveKeyframes`; the demo-side `PARSE_ERROR` remap (`parseAnimationCSS.ts:29-34`) is the seam this component's `catch` (`:102-111`) sits on. **BL-2**'s clause 2 rides exactly that seam. |
| **lane-library §4.1 A1/A2** ("failure yields `ast: []` + diagnostics, never a throw"; the anonymous re-wrap) | Confirmed relevant: it is why a whitespace-bearing `@keyframes amiga-bouncing x` degrades into a diagnostic rather than a crash, i.e. why **BL-2** presents as a red toast on every edit rather than a hard failure. |
| **lane-library §4.3 Tier C** (`presets/catalog.ts:16` — regex-strips the `@keyframes` wrapper) | This is the exact `bare()` that feeds `definePreset` (`catalog.ts:309-315`), the factory whose target-less output **M-3** rests on. Tier C's "candidate for deletion" verdict is orthogonal; the defect here is the *consumer's*, not the regex's. |
| **lane-library §0** (`npm run check` shape) | **Extended.** The census records the library's `check:lib` gate; this challenge establishes that no gate of any kind covers `.vue` script blocks — no `vue-tsc` in `package.json` or any workflow — with a live `TS2554` as proof. **BL-4**. |

---

## 8. Probe provenance

Two scripts, both read-only, both against already-built artifacts, both run from the session scratchpad; nothing in `keyframes.js`, `glass-ui`, or `value.js` was written, mutated, installed, or served.

1. `dist/engine/index.js` → `new CSSKeyframesAnimation(...).fromString(...)` + `CSSKeyframesToString(a, tmpName)` for `tmpName ∈ {"square-transform", "amiga-bouncing x"}` — established the emitted selector/at-rule idents behind **BL-1** and **BL-2**, and refuted **KILLED-1**.
2. `node_modules/@mkbabb/value.js/dist/subpaths/css.js` → `parseStylesheet` + `collectStyleRules` + `collectAnimationOptions` over the real emitted shape (refuted **KILLED-2**), and `node_modules/prettier` + `plugins/postcss` → `format(bad, { parser: "scss" })` over three malformed inputs — established the rejection behind **BL-3**.

No browser tooling was used. Every claim marked **UNPROVEN-NEEDS-LIVE** (M-1's caret feel, M-11's bundle half, BL-2's `classList` throw as *observed* rather than *specified*) is deferred to the SS-13 visual audit.
