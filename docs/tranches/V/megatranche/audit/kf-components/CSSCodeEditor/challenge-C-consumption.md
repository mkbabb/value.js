claude-opus-5[1m]

# CHALLENGE · `CSSCodeEditor.vue` · axis **C — CONSUMPTION**

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/keyframes/CSSCodeEditor.vue` (229 L)
**Tree** keyframes.js `master` HEAD `8281638c` (same substrate as the formation lanes). READ-ONLY; no installs, no dev server, no browser.
**Axis** how this component consumes **keyframes.js** (the library) and **glass-ui** (the design system): subpath choices, shadow components (S-1..S-8), value.js transitive exposure (the R1 parser-crash class where reachable), props/emits contract quality, integration seams with siblings.
**Posture** the component is presumed DEFECTIVE until the tree proves otherwise; but a false defect is worse than a missed one, so every claim below carries its own falsifier and dies to it.

**Tally — 19 defects (2 BLOCKER · 7 MAJOR · 8 MINOR · 2 INFO) · 7 superlatives.**

**Read whole:** the component + all 9 of its import edges (`monaco-editor` ×4 specifiers, `./monaco-themes/{Dracula,GitHub}.json`, `@mkbabb/glass-ui/dark`, `@components/instrument/utils/iosTextEntry`, `@src/animation/resolve/browser`, `@utils/formatEditorCSS`, `@src/animation/internal/helpers`, `vue-sonner`, `@vueuse/core`), both consumers (`KeyframesStringControls.vue`, `KeyframeTimeline.vue`), the writeback chain (`useKeyframesParsing.ts` → `useKeyframeOps.ts` → `parseAnimationCSS.ts`), and the installed producer copies (`node_modules/monaco-editor@0.55.1`, `node_modules/@mkbabb/glass-ui@7.0.0`, `node_modules/vue@3.5.35`).

---

## 0. Headline

| # | severity | claim | anchor |
|---|---|---|---|
| **C-1** | **BLOCKER** | The `editor.api` import ships an editor with **no CSS tokenizer** — the CSS editor has zero syntax highlighting and both vendored themes' 100 token rules are inert. Introduced by `5fe2e4cb`, whose message asserts the opposite. | `:54`, `:72` |
| **C-2** | MAJOR | Consequence of C-1: the `css.worker?worker` dynamic import is **dead payload** and the `label === "css"` branch of `getWorker` is **unreachable code**. | `:58`, `:64-66` |
| **C-3** | MAJOR | `import type * as Monaco from "monaco-editor"` types the boot **7 top-level members wider than the runtime** — a type/runtime realm split that typechecks a guaranteed `TypeError`. | `:31`, `:52` |
| **C-4** | **BLOCKER** | Every parent writeback calls `editor.setValue()`, which Monaco documents in-source as *"Destroy my edit history"* — in-editor undo/redo and all decorations are wiped on the normal editing cycle, which both consumers guarantee. | `:171` |
| **C-5** | MAJOR | `formatCSSContent` has **no error boundary**; prettier throws on transiently-invalid CSS → unhandled rejection → the sibling's `isFormatting` latch sticks `true` for the session. | `:178-187` |
| **C-6** | MAJOR | A rejected `bootMonaco()` is **cached forever** in `monacoBoot`; `initEditor` is fire-and-forget with no catch → permanently dead editor, no error UI, no retry. | `:53`, `:122`, `:202`, `:213` |
| **C-7** | MAJOR | `@src/animation/resolve/browser` deep-import drags **3 value.js subpaths + a global `window` resize listener** onto the editor chunk, past the `loadAnimationEngine()` firewall, for one line of arithmetic. | `:40` |
| **C-8** | MAJOR | `debounce(fn, 200, false)` passes a **third argument to a two-parameter function**. Invisible to every gate in the repo — nothing typechecks `.vue`. | `:114-120` |
| **C-9** | MAJOR | The 200 ms debounce carries a **stale snapshot**, so a concurrent parent write inside the window is silently overwritten (lost update). | `:114-120`, `:151-154` |
| **C-10** | MINOR | glass-ui `/dark` consumed at its narrowest surface: `onFlipSettled` — the producer's purpose-built re-theme **batching hook** — is ignored in favour of a raw `watch`. | `:98`, `:163` |
| **C-11** | MINOR | 3 of 4 `defineExpose` members are **dead**; `setValue` is additionally a silent model-desync escape hatch. | `:223-228` |
| **C-12** | MINOR | 3 of 5 props (`fontSize`, `lineNumbers`, `padding`) are **create-time-only** — a half-reactive props contract. | `:78-93`, `:132-149` |
| **C-13** | MINOR | `fontFamily: "Fira Code"` hardcodes glass-ui's `--font-mono` payload **with no fallback stack**. | `:138` |
| **C-14** | MAJOR | `accessibilitySupport: "off"` **hard-disables screen-reader support** on a text-editing surface, undocumented, not a prop. | `:144` |
| **C-15** | MINOR | `getFormatWidth()` measures the **container** (gutter + padding included) through a `ch ≈ 0.5em` approximation, and duplicates `useKeyframesState.getFormatWidth`. | `:107-112` |
| **C-16** | MINOR | Lane **F-1** lands here: `:38` imports an **undeclared, unlocked** package. | `:38` |
| **C-17** | MINOR | `as any` on both `defineTheme` calls suppresses the one check that would catch theme-shape drift. | `:70-71` |
| **C-18** | INFO | The 16-line design header is **stale** against the code it describes; `5fe2e4cb`'s message contradicts its own diff. | `:15-30` vs `:54` |
| **C-19** | INFO | **Zero test coverage**: no file under `test/` mentions `CSSCodeEditor` or `monaco`. | — |

---

## 1. The Monaco consumption seam (C-1 · C-2 · C-3)

### C-1 — **BLOCKER** · the CSS editor has no CSS tokenizer

`CSSCodeEditor.vue:54`

```ts
import("monaco-editor/esm/vs/editor/editor.api"),
```

`CSSCodeEditor.vue:72`

```ts
m.languages.register({ id: "css" });
```

`monaco.languages.register({ id })` **reserves an identifier**. It does not attach a tokenizer, a Monarch grammar, or a language service. Those live in modules this file never imports:

```
node_modules/monaco-editor/esm/vs/basic-languages/css/css.contribution.js:3-9
  registerLanguage({ id: "css", extensions: [".css"], …, loader: () => import('./css.js') })
node_modules/monaco-editor/esm/vs/language/css/monaco.contribution.js   (the worker-backed service)
```

Neither is reachable from `editor.api`. That module is two lines:

```
node_modules/monaco-editor/esm/vs/editor/editor.api.js:1-2
  import './internal/initialize.js';
  export { …, editor, languages } from './editor.api2.js';
```

and `initialize.js` (whole file, 10 lines) only assigns `globalThis.monaco` when `MonacoEnvironment.globalAPI` is set — **zero language registration**.

The root specifier is what carries them. `node_modules/monaco-editor/package.json` → `exports["."].import = "./esm/vs/editor/editor.main.js"`, and `editor.main.js:1-4,16` imports `../language/css/monaco.contribution.js` and `../basic-languages/css/css.contribution.js` among ~90 others.

**Git provenance — this is a regression with a date.** `git log --follow` on the file returns three commits; the middle one changed exactly one line:

```
5fe2e4cb  perf(U.D5): load Monaco editor API without unused language workers
-        import("monaco-editor"),
+        import("monaco-editor/esm/vs/editor/editor.api"),
```

message: *"Import the editor.api surface **while retaining the on-demand core/CSS worker boot**; the gh-pages build now emits only editor and CSS workers and shrinks vendor-monaco from 4.18MB to 2.53MB. check, demo-smoke, and easing-editor-live pass."*

`git show 5fe2e4cb^:…CSSCodeEditor.vue` confirms `m.languages.register({ id: "css" })` was already at `:72` **before** the switch — where it was a harmless no-op re-registration over `css.contribution`'s real one. After the switch it became the sole, empty registration. The 1.65 MB the commit saved is, in material part, the CSS language itself.

**Blast radius on the two vendored themes.** They are correctly shaped `IStandaloneThemeData` — `Dracula.json` `{base:"vs-dark", inherit:true, rules:46, colors:8}`, `GitHub.json` `{base:"vs", inherit:true, rules:54, colors:6}` — and their rules key TextMate scopes (`comment`, `string`, `constant.numeric`, …) that only the Monarch CSS tokenizer emits. With no tokenizer every line resolves to the default `{"token":""}` rule. **100 of the 100 token rules across both themes are inert**; only the two default foregrounds and the 14 workbench `colors` still apply. The `defineTheme` calls at `:70-71`, the local vendoring rationale at `:32-35`, and the `watch(isDark, setCodeTheme)` at `:163` are all machinery in service of a highlighting feature that no longer exists.

**Falsifier.** Any of: (a) another demo module imports a CSS language contribution — ruled out, `grep -rn "monaco" demo/` returns exactly one runtime importer, this file, plus CSS class names and prose; (b) `editor.api2.js` transitively registers `basic-languages` — ruled out, `initialize.js` is reproduced in full above; (c) Monaco lazily resolves a built-in tokenizer for a bare `languages.register` — no such mechanism exists in `_.contribution.js`'s registry, which is keyed on the `loader` a `registerLanguage` call supplies. Produce any one and C-1 dies. *(Visual confirmation of "no colors on screen" is UNPROVEN-NEEDS-LIVE and reserved for SS-13; the static chain above does not need it.)*

### C-2 — MAJOR · dead worker payload, unreachable branch

`:58` `import("monaco-editor/esm/vs/language/css/css.worker?worker")` and `:64-66`:

```ts
if (label === "css" || label === "scss" || label === "less") {
    return new CSSWorker();
}
```

Monaco requests a labelled worker only from a language client, and the CSS client is instantiated by `vs/language/css/monaco.contribution.js` (never imported — C-1). With no client, the only label ever requested is `editorWorkerService`, which falls through to `new EditorWorker()`. So `CSSWorker` is constructed **never**, and the `css.worker` chunk is fetched-and-discarded on the exact critical path the file's 16-line header (`:15-30`) exists to protect. The commit message's *"the gh-pages build now emits only editor and CSS workers"* is measuring an artifact nothing loads.

**Falsifier.** Show any call path that reaches `monaco.editor.createWebWorker({ label: "css" | "scss" | "less" })` in this tree. Restoring C-1 also resurrects this branch and makes the import load-bearing — so C-2 is a consequence, not an independent bug, but it is a distinct fix (delete vs. restore) and must be decided explicitly.

### C-3 — MAJOR · the type surface is 7 members wider than the runtime

`:31` `import type * as Monaco from "monaco-editor";` resolves through the package's `exports["."].types` → `esm/vs/editor/editor.main.d.ts`. `:52` declares `bootMonaco(): Promise<typeof Monaco>` but resolves the **`editor.api` namespace**.

```
esm/vs/editor/editor.main.d.ts:1421
  export { …, createWebWorker, monaco_contribution$3 as css, editor,
           monaco_contribution$1 as html, monaco_contribution$2 as json,
           index_d as lsp, monaco_contribution as typescript };
esm/vs/editor/editor.api.d.ts:8681
  export { CancellationTokenSource, Emitter, KeyCode, KeyMod, MarkerSeverity,
           MarkerTag, Position, Range, Selection, SelectionDirection, Token,
           Uri, editor, languages, worker };
```

`css`, `html`, `json`, `typescript`, `lsp`, `createWebWorker`, `IWebWorkerOptions` exist in the **types** and not in the **values**. `(await bootMonaco()).css.cssDefaults.setOptions({…})` — the obvious way anyone would later configure CSS validation — compiles clean and throws `TypeError: Cannot read properties of undefined` at runtime. The right shape is `typeof import("monaco-editor/esm/vs/editor/editor.api")`, which pins types and values to one realm.

**Falsifier.** Show `editor.main.d.ts` and `editor.api.d.ts` export the same top-level set. The two `export` lines above are the whole disagreement.

---

## 2. The v-model contract (C-4 · C-9 · C-11 · C-12)

Both consumers bind the **controlled pair**, not `v-model`:

```
KeyframesStringControls.vue:4-12   :model-value="cssKeyframesString"     @update:model-value="onEditorChange"
KeyframeTimeline.vue:123-127       :model-value="selectedKeyframeCSS"    @update:model-value="onKeyframeCSSChange"
```

Under Vue 3.5's `useModel`, supplying both prop and `onUpdate:` listener puts the child in fully-controlled mode: `modelValue.value = v` at `:116` emits but does not mutate the local ref. So the child's `watch(modelValue, …)` (`:165-176`) fires **only** on a genuine parent writeback. Both parents guarantee one, and both normalize:

- `KeyframesStringControls` → `updateFromString` → `useKeyframesParsing.ts:41` `formatEditorCSS(raw, …)` → `:43` `cssKeyframesString.value = keyframesString` — the prop returns **prettier-reformatted**.
- `KeyframeTimeline.vue:246-265` `onKeyframeCSSChange` parses to `kf.vars`, and `:239-244` `selectedKeyframeCSS` re-serializes `` `${prop}: ${value};` `` — the prop returns **canonically respaced**.

So `editor.getValue() !== newVal` at `:168` is **true by construction on the normal editing cycle**, and `:171` runs.

### C-4 — **BLOCKER** · `setValue` destroys the undo stack and all decorations

Monaco's own source, no ambiguity:

```
node_modules/monaco-editor/esm/vs/editor/common/model/textModel.js:277  setValue(value, …) { … this._setValueFromTextBuffer(…) }
                                                              :303  _setValueFromTextBuffer(…) {
                                                              :312      // Destroy all my decorations
                                                              :313      this._decorations = Object.create(null);
                                                              :314      this._decorationsTree = new DecorationsTrees();
                                                              :316      // Destroy my edit history and settings
                                                              :317      this._commandManager.clear();
```

Concrete failure: the user types in the keyframes editor → 200 ms later the string reaches `updateFromString` → the animation recompiles → the reformatted CSS returns as the prop → `:171` `editor.setValue(newVal)` → `_commandManager.clear()`. **⌘Z inside the editor is dead**, permanently, on every edit cycle of the demo's flagship instrument. `editor.setPosition(pos)` at `:172` restores a `(line, column)` pair against a buffer whose columns just moved, so the caret lands off-by-the-normalization-delta as well.

The Monaco-idiomatic write that preserves history and decorations is `editor.executeEdits(source, [{ range: model.getFullModelRange(), text: newVal }])` — the same three call sites (`:171`, `:183`, `:192`) with the same guard.

**Falsifier.** Show that `_commandManager.clear()` does not clear the undo stack, or that some path other than `setValue` reaches `_setValueFromTextBuffer`, or that neither consumer ever writes back a string differing from what the editor holds. All three are contradicted above; the third is contradicted twice, independently.

*(Not a defect, checked and cleared: the `isSettingValue` re-entrancy guard at `:101`/`:153`/`:170`/`:173` is correct. `_setValueFromTextBuffer:319` calls `_emitContentChangedEvent` with no surrounding `_beginDeferredEmit`, so `onDidChangeModelContent` fires synchronously inside `setValue` and the flag is still `true`. The guard holds.)*

### C-9 — MAJOR · the debounce carries a stale snapshot

`:151-154` captures `editor.getValue()` at fire time and hands it to a 200 ms debounce (`:114-120`), which then replays that **snapshot**. Interleaving:

```
t=0     keystroke      → debouncedEmit("abc") scheduled for t=200
t=100   parent writes "xyz"  (e.g. useKeyframesParsing.ts:96-103 templateFrames watch
                              → debouncedUpdateAllStrings, itself 100 ms — :62)
        → watch(modelValue) → setValue("xyz")   [isSettingValue guards; no reschedule]
t=200   the pending timer fires with "abc" → emits → onEditorChange("abc")
        → the parent's "xyz" is gone
```

The fix is one character of intent: have the debounced body call `editor.getValue()` itself rather than close over the argument.

**Falsifier.** Show the parent can never write within 200 ms of a keystroke. `useKeyframesParsing.ts:96-103` (a `flush:"post"` watch on `animation.templateFrames` → a 100 ms debounce) is an existence proof that it can.

### C-11 — MINOR · 3 of 4 exposed members dead; one is a desync hatch

`:223-228` exposes `formatCSS`, `setValue`, `getValue`, `editor: () => editor`.

```
$ grep -rn "editorRef\.\|\.formatCSS()\|\.setValue(\|\.getValue()" demo/ --include=*.vue --include=*.ts
  … CSSCodeEditor.vue (internal uses only) …
  KeyframesStringControls.vue:84  if (!editorRef.value) return;
  KeyframesStringControls.vue:86  await editorRef.value.formatCSS();
```

`setValue`, `getValue`, and the raw-`IStandaloneCodeEditor` escape hatch have **zero consumers**. `setValue` (`:189-195`) is worse than dead: it writes the buffer *without emitting `update:modelValue`*, so the first caller silently desynchronizes the model from the editor — a second write path with different semantics from the one the component advertises.

**Falsifier.** Any consumer outside this file calling `.setValue(` / `.getValue()` / `.editor()` on a `CSSCodeEditor` ref. The grep above is exhaustive over `demo/`; `test/` has none (C-19).

### C-12 — MINOR · half-reactive props contract

`:78-93` declares five props. `height` and `border` are template-bound (`:6`, `:8`) and react. `fontSize` (`:137`), `lineNumbers` (`:143`), and `padding` (`:145-148`) are read **once**, inside `editor.create(...)`, and never re-applied — Monaco requires `editor.updateOptions(...)` for those. Three of five props silently freeze after mount, with nothing in the type or the docs saying so.

**Falsifier — and it partly lands.** Both consumers pass literals (`:font-size="14"`, `:line-numbers="true"`, `:border="true"`, or the defaults), so **no live breakage exists today**. This is a latent contract defect, correctly rated MINOR; it becomes real the first time a caller binds a ref.

---

## 3. Library consumption — the value.js firewall (C-7 · C-8 · C-15)

### C-7 — MAJOR · a deep `@src` import pulls value.js past the firewall

`:40` `import { convertPixelsToCh } from "@src/animation/resolve/browser";`

`@src` is a raw source alias (`vite.config.ts:38`, `tsconfig.json paths`), not a published entry. keyframes.js publishes exactly two (`lane-library.md §1`): `.` (the LIGHT, value.js-free barrel) and `./engine`. `resolve/browser.ts` is neither, and its first four lines are:

```
src/animation/resolve/browser.ts:1  import { isLayoutTrackingUnit } from "@mkbabb/value.js/value";
                              :2  import type { CssValue }        from "@mkbabb/value.js/value";
                              :3  import { parseCssScalar }       from "@mkbabb/value.js/css";
                              :4  import { serializeCssValue }    from "../compile/emit/css-text";
```

So one static edge from a demo SFC pulls **`@mkbabb/value.js/value` + `@mkbabb/value.js/css`** — plus `compile/emit/css-text.ts`, the tree's most-imported module (in-degree 12, `lane-library.md §3.4`), which itself reaches value.js `serializeCssColor`. This is precisely what `lane-library.md §3.3` names the firewall: *"`load-engine.ts:124` is the value.js firewall: everything value.js-bearing is reachable only behind it."* This import goes around it, statically, onto the graph of the chunk whose eager-loading the file's own header spends 16 lines preventing.

**And it has a module-evaluation side effect:**

```
src/animation/resolve/browser.ts:22-24
  if (typeof window !== "undefined") {
      window.addEventListener("resize", bumpLayoutEpoch, { passive: true });
  }
```

Importing the module installs a permanent, never-removed global resize listener. `package.json` declares `sideEffects: false` (`lane-library.md §1`) — a **false declaration** for this module, which licenses a bundler to elide it and simultaneously means the demo pays a global listener to obtain one line of arithmetic.

What is actually wanted, `browser.ts:137-138`:

```ts
export const convertPixelsToCh = (pixels: number, element: HTMLElement): number =>
    pixels / convertToPixels(1, "ch", element);
```

Nothing value.js-bearing. **The demo's own gate cannot see this**: `package.json` `lint` is `depcruise src` and the `leaf-no-engine-no-valuejs` rule (`.dependency-cruiser.cjs:160`) never scans `demo/`.

**On the R1 crash class (axis-mandated):** R1 (`parseCssColor("oklch()")`) is **not directly reachable from this file** — no color parse occurs here, and the value.js surface `browser.ts` reaches is `parseCssScalar`/`isLayoutTrackingUnit`. It is reachable *through* the component, one hop out: arbitrary user CSS → `:116` emit → `onEditorChange` → `updateFromString` → `parseAnimationCSS.ts:31` `resolveKeyframes(input)` → `lane-library.md` A2/A1 → value.js `parseStylesheet`, and `collectStyleRules`/`collectAnimationOptions` from `@mkbabb/value.js/css` at `parseAnimationCSS.ts:1-4`. **This component is the demo's single largest untrusted-CSS ingress into the value.js parser.** The seam is guarded on the `KeyframesStringControls` side (`:99-111` try/catch → toast) and needs no guard on the `KeyframeTimeline` side (`:246-265` is pure string splitting, no parse). I record no defect here — I checked for one and the tree is clean — but the parser wave should treat `:116` as the fuzz entry point of record.

**Falsifier.** Show `convertPixelsToCh` reachable from a *published* entry (`grep` over `src/animation/index.ts` and `public.ts` returns nothing), or show `browser.ts` free of static value.js imports, or show the resize listener guarded. Note the sibling `useKeyframesState.ts:1` commits the identical breach — that widens the finding, it does not excuse it.

### C-8 — MAJOR · a three-argument call to a two-parameter function

`CSSCodeEditor.vue:114-120`

```ts
const debouncedEmit = debounce(
    (value: string) => { modelValue.value = value; },
    200,
    false,          // ← third argument
);
```

`src/animation/internal/helpers.ts:15-24`

```ts
export function debounce<Args extends unknown[]>(
    fn: (...args: Args) => void,
    milliseconds: number,
): (...args: Args) => void { … }
```

Two parameters. No overloads (`grep -rn "export .*debounce" src/` → one hit). `git log` on `helpers.ts` shows no signature history — it was never 3-ary. The `false` is inert at runtime, but it encodes an author belief in a lodash-style `immediate`/`leading` flag that does not exist, and it is the *only* 3-arg call in the repo: every sibling passes two (`useKeyframesParsing.ts:62`, `useKeyframeOps.ts:87,108`).

**Why no gate caught it — the more serious half.** `TS2554` would fire, if anything looked:

- `package.json` `check` = `tsc --noEmit && tsc --noEmit -p tsconfig.test.json`. Plain `tsc` **does not parse `.vue` SFCs**.
- `vue-tsc` is **absent from the repo entirely** — `grep -rn "vue-tsc" package.json .github/ scripts/` → no output.
- CI (`ci.yml:42`, `release.yml:43`) runs only `check:lib` = `tsc --noEmit -p tsconfig.lib.json`, whose `include` is `["src/"]` — **`demo/` is not typechecked in CI at all**.

So this component's 229 lines, and the other 57 `.vue` files, are outside every type gate in the repository. C-8 is the artifact; the hole is the finding.

**Falsifier.** Produce a second `debounce` in scope at `:42`, or a `vue-tsc`/`vite-plugin-checker` invocation anywhere. Both greps are reproduced above.

### C-15 — MINOR · `getFormatWidth()` over-measures, and is duplicated

`:107-112` measures `containerEl.offsetWidth` — the outer `<div>` — and converts to `ch`. That element contains Monaco's **line-number gutter** (which this same component turns on at `:143`), the decorations gutter, the vertical scrollbar, and the 16 px top/bottom padding. None are text columns. The conversion then rides `browser.ts:126`'s `case "ex": case "ch": return value * fontSize * 0.5;` — `ch` **approximated as half the em**, against a container whose computed font-size is the page font, not Monaco's `fontSize: 14`. The `printWidth` handed to prettier (`:180`, default 80 at `formatEditorCSS.ts:3` when `undefined`) is therefore systematically larger than the true wrappable column count, so "formatted" output soft-wraps in the editor it was formatted for.

The gutter/padding half of this is fully static and provable. The magnitude of the `0.5em` error against Fira Code's real advance is **UNPROVEN-NEEDS-LIVE** (SS-13).

Also: `useKeyframesState.ts:31-39` is a second, near-identical `getFormatWidth` over the same helper — two copies, two deep imports, one measurement.

**Falsifier.** Show `offsetWidth` on `containerEl` excludes the gutter (it cannot — Monaco renders the gutter inside the container it is given at `:132`), or that `convertToPixels(1,"ch",…)` measures a real glyph advance (`browser.ts:126` is reproduced above).

---

## 4. glass-ui consumption (C-10 · C-13 · C-16 · S-G)

The whole design-system surface of this component is **one named import** and **one class string**:

```
:38  import { useGlobalDark } from "@mkbabb/glass-ui/dark";
:6   border ? 'cartoon-surface' : '',
```

### C-10 — MINOR · `/dark` consumed at its narrowest point; `onFlipSettled` ignored

`:98` destructures `{ isDark }` alone. The installed producer publishes four more members, one of which was **built for exactly this consumer** (`node_modules/@mkbabb/glass-ui/dist/dark.d.ts`):

> `onFlipSettled` — *"the post-flip SETTLE hook. Register a callback that runs in ONE coalesced task AFTER each dark↔light flip's instant chrome paint, so consumers BATCH N expensive re-theme operations … into a single beat instead of N watchers firing in N sequential storms on the critical frame."*

`:163` `watch(isDark, setCodeTheme)` is precisely the "watcher firing on the critical frame" the hook exists to displace, and `monaco.editor.setTheme` (`:160`) is a global re-tokenize-and-repaint — the canonical expensive re-theme.

**Honest sizing, and the falsifier.** Live cost today is small, and I will not inflate it: at most two editors mount at once (`KeyframesStringControls` + `KeyframeTimeline`'s selected-keyframe pane), and — because of **C-1** — there is nothing to re-tokenize, so the repaint is currently cheap. **C-1 masks C-10.** Fixing C-1 makes this bite. Rated MINOR on live impact, flagged on-axis because ignoring a hook the producer documented in fifteen lines is exactly a consumption defect. Kill it by showing `setTheme` is already rAF-batched inside Monaco, or that glass-ui's flip does not run watchers on the paint frame.

### C-13 — MINOR · the mono face is hardcoded, and has no fallback

`:138` `fontFamily: "Fira Code"`. The design system owns that face and the demo names it once, canonically:

```
demo/styles/style.css:56   --font-mono: "Fira Code", monospace;
demo/styles/style.css:4-8  /* The OFL woff2 corpus … is DELIBERATELY excluded from glass-ui's
                              styles index … "Fira Code" silently renders the SF Mono/Menlo
                              fallback. This is the AUTHORITATIVE Fira Code payload. */
```

The token carries `, monospace`. Monaco is handed a **bare family name with no fallback**, so if the OFL payload ever fails to load the editor falls back to the UA default rather than to *a monospace* — column alignment gone, in a code editor, and `fontLigatures: true` (`:134`) becomes meaningless. The consumption fix is to read `--font-mono` rather than restate its first entry.

**Falsifier — partial.** `style.css:9` does import `@mkbabb/glass-ui/styles/fonts`, so the face loads today; the defect is latent, hence MINOR. It stops being latent the moment glass-ui re-cuts its mono face and the demo's token follows while this literal does not.

### C-16 — MINOR · lane **F-1** lands on line 38

Reconfirmed against the current tree, not inherited:

```
$ node -e "…{...deps,...devDeps}['@mkbabb/glass-ui']"   → ABSENT
$ grep -c "glass-ui" package-lock.json                  → 0
$ node -e "…node_modules/@mkbabb/glass-ui/package.json.version"  → 7.0.0
```

`:38` is one of the 42 files that a clean `npm ci` cannot resolve. Nothing about this component causes it; it is F-1's footprint here, cited so the repair wave's blast radius is complete.

---

## 5. Error posture (C-5 · C-6 · C-14)

### C-5 — MAJOR · `formatCSS` has no boundary, and latches the sibling

`:178-187` awaits `formatEditorCSS`, which is `prettier.format(css, { parser: "scss", … })` (`demo/utils/formatEditorCSS.ts:10-14`). Prettier **throws** on unbalanced CSS — the ordinary state of a buffer mid-edit. There is no `try`. Downstream:

```
KeyframesStringControls.vue:83-88   const formatEditor = async () => {
                                        if (!editorRef.value) return;
                                        isFormatting.value = true;
                                        await editorRef.value.formatCSS();   // ← throws
                                        startFormattingReset();              // ← never runs
                                    };
KeyframesStringControls.vue:90-96   onKeyDown → formatEditor()               // fire-and-forget
KeyframesStringControls.vue:101     if (!isFormatting.value) toast.success("Keyframes parsed 🎉");
```

One format attempt on transiently-invalid CSS ⇒ unhandled rejection, **no error surfaced**, and `isFormatting` latches `true` for the component's lifetime, silently suppressing the sibling's success feedback thereafter.

The repo has the idiom this declines to use — `useKeyframeOps.ts:25-39` `withErrorToastAsync(fn, message, retry)`, toast + Retry action, used at three sites in the same directory. The same directory also owns `utils/toastGuard.ts`; this file reaches past both to a bare `toast.success` at `:186`.

**Falsifier.** Show `prettier.format` cannot throw for CSS the Monaco buffer can hold (an unclosed `{` suffices), or find a `catch` on this path. `useMonacoCancellationGuard.ts:20-24` does **not** cover it — it matches only `name === "Canceled" || message === "Canceled"`, and its docblock is explicit that "every real error class … is left to surface untouched."

### C-6 — MAJOR · a rejected boot is cached for the session

`:53` `return (monacoBoot ??= Promise.all([…]).then(…))`. `??=` caches on first call. If the 2.53 MB `vendor-monaco` fetch fails — offline, CDN blip, a stale hashed asset after a deploy — the **rejected** promise is what every later mount awaits. `initEditor` (`:122`) has no `try`, and both call sites are fire-and-forget (`:202` inside `onMounted`, `:213` inside the ResizeObserver callback). Result: unhandled rejection, an empty bordered box, no message, no retry, for the rest of the session — including editors in other panes that never touched the failure.

The fix is the standard one for a cached-promise boot: `.catch(e => { monacoBoot = undefined; throw e; })`, plus a rendered fallback.

**Falsifier.** Show Vite's `vite:preloadError` is handled — `grep -rn "vite:preloadError\|unhandledrejection" demo/` returns exactly one hit, `useMonacoCancellationGuard.ts:27`, whose filter is quoted above and does not match a module-fetch `TypeError`.

### C-14 — MAJOR · `accessibilitySupport: "off"`

`:144`. Monaco's default is `"auto"`, which detects an assistive-technology client and switches to the accessible textarea-backed rendering path. `"off"` hard-disables that detection — a screen reader gets Monaco's virtualized canvas-ish DOM instead of the accessible buffer, on the demo's primary text-*entry* surface. There is no comment, no prop, and no recorded decision; every other option on the block (`:133-148`) is a legible presentation choice.

This is out of character for the tree, which is otherwise conscientious: `AnimatedText.vue:7-8` hand-rolls an sr-only mirror, `KfPillTabs` was forked *over an ARIA defect* (S-1), and 13 `prefers-reduced-motion` sites are enforced (lane-frontend §6.5). One line here undoes more than any of those add.

**Falsifier.** Show `"off"` is required to avoid a concrete bug (Monaco's `"auto"` has a known cost only when a screen reader is actually present), or find the ADR. Neither exists in this tree. The graded fix is `"auto"`; the cheap one is a prop with an `"auto"` default.

---

## 6. Documentation & coverage (C-17 · C-18 · C-19)

**C-17 (MINOR)** — `:70-71` `defineTheme("dark-theme", DarkTheme as any)`. The JSONs are correctly shaped (§1, C-1); `as any` is needed at most for `base`'s widening to `string` under `resolveJsonModule`, and it suppresses exactly the structural check that would flag a theme-shape drift. `as DarkTheme satisfies Monaco.editor.IStandaloneThemeData`-style narrowing costs nothing. *Falsifier:* show a non-`any` spelling that fails to compile.

**C-18 (INFO)** — the 16-line header is stale against its own code: `:21` still narrates *"the namespace `import(\"monaco-editor\")`"* while `:54` imports `editor.api`; `:15` still sizes Monaco at *"~4 MB"* against the commit's own 2.53 MB. Combined with `5fe2e4cb`'s *"retaining the on-demand core/CSS worker boot"* (C-1/C-2), the prose actively misdirects a reader away from the blocker. *Falsifier:* read `:21` against `:54`.

**C-19 (INFO)** — `grep -rln "CSSCodeEditor\|monaco\|Monaco" test/` → **no output**. The nearest test, `test/demo/instrument/value4-editor-boundary.test.ts`, covers `parseAnimationCSS`, `keyframeSelector`, and `timelineEngine` — the pure adapters *downstream* of this component, never the component. Every claim in §1–§5 is a claim no test would have caught, which is why C-1 shipped behind a green `check`, `demo-smoke`, and `easing-editor-live`. *Falsifier:* one test file naming the component.

---

## 7. Superlatives (L-18 runs both ways — 7)

**S-A · the `?worker` re-eagerization insight is correct and non-obvious.** `:22-26`: *"a STATIC `?worker` import still emits a tiny worker-proxy edge INTO `vendor-monaco`, so a static worker import re-eagerizes the chunk it is meant to defer."* That is a true and easily-missed property of Vite's `?worker` virtual module, diagnosed from a real measurement (the spring-mobile LCP outlier, E.W4 S1) and fixed by moving both worker entries inside the same dynamic boot. Most codebases defer the namespace and leave the workers static. *Falsifier: show a static `?worker` import that does not emit an edge into the parent chunk.*

**S-B · the module-scoped idempotent boot is the right shape.** `:49-53` `monacoBoot ??= Promise.all([...])` with the namespace parked in a module-level `monaco`. One fetch, one `defineTheme` pair, one `MonacoEnvironment` assignment, N editors — no double-register, no second 2.5 MB fetch, no per-instance state. (C-6 is a missing `.catch` on this, not a fault in the shape.)

**S-C · the unmount-during-chunk-load race is handled precisely.** `:105` `disposed`, `:126` the pre-await container check, `:130` the post-await re-check of *both* `disposed` and `containerEl.value`, `:218-221` the unmount setter. Creating a Monaco editor over a detached node is the classic leak for a dynamically-loaded editor; this is the correct three-point guard, and the comments at `:102-104` and `:128-129` name the exact hazard.

**S-D · the deferred-init claim is subtle and verified true.** `:205-215` boots via `useResizeObserver(...).stop()` and asserts it "auto-cleans on scope dispose if we unmount before the size resolves" — from **inside `onMounted`**, where one might reasonably expect no active effect scope. It holds: `node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:8013-8016` shows `setCurrentInstance` calling `instance.scope.on()`, and lifecycle hooks run inside it, so vueuse's `tryOnScopeDispose` binds. Correct against the installed `vue@3.5.35`.

**S-E · the type-side erasure reasoning is right.** `:29-30`: *"The TYPE side stays static (`import type`) — erased under `verbatimModuleSyntax`, no runtime edge."* `tsconfig.json` sets `verbatimModuleSyntax: true`; the claim is exact. (C-3 is about *which* types, not about whether they are erased.)

**S-F · the vendored-theme rationale is correctly diagnosed and correctly resolved.** `:32-35` records that `monaco-themes@0.4.x` exports only `.` and `./dist/monaco-themes.js`, so `monaco-themes/themes/*` is unresolvable under the strict bundler — then vendors the two files locally rather than reaching past an exports map or pinning a resolution hack. That is the right call, and the diagnosis is specific enough to re-verify.

**S-G · the one styling reach is a genuine published design-system utility.** `:6` `cartoon-surface` is not a hand-rolled border and not a private internal: it is a Tailwind v4 `@utility` published by glass-ui (`node_modules/@mkbabb/glass-ui/dist/components/card/styles.css` — `@utility cartoon-surface { position: relative; border-width: 2px; box-shadow: var(--shadow-cartoon-md); }`) and reachable from the styles index the demo imports (`dist/styles/index.css` → `@import "../components/card/styles.css"`, and `demo/styles/style.css:3`). I opened this expecting a boundary breach and the tree cleared it. The component takes its surface treatment from the design system, not from itself.

---

## 8. Relation to the hitherto corpus

| corpus id | this component | verdict |
|---|---|---|
| **F-1** (phantom glass-ui dep) | `:38` is one of the 42 breaking imports | **CONFIRMED**, re-probed on the live tree (C-16) |
| **F-6** (glass boundary otherwise clean — no local `ui/`, no direct reka) | holds here: zero reka, zero cva/clsx, one glass import, one published glass utility | **CONFIRMED** and strengthened (S-G) |
| **S-1..S-8** (shadow census) | **no shadow.** glass-ui 7.0.0 ships no code-editor primitive (73 subpaths; nothing editor-shaped) | census correctly omits this component — **no contradiction** |
| **lane-frontend §3.1** ("21 of 73 subpaths, 29%") | this file reaches `/dark` only | consistent |
| **lane-frontend §4** (roster: "229 L · G · Monaco host; `useGlobalDark` for theme sync") | accurate as far as it goes | the roster is a census, not an audit; C-1 is below its resolution — **no contradiction** |
| **lane-library §3.3** (`load-engine.ts:124` is *the* value.js firewall) | **C-7 shows the firewall is bypassable from `demo/`** via `@src`, and `depcruise src` cannot see it | **EXTENDS** the lane: the firewall is real inside `src/`, unenforced across the demo boundary |
| **lane-library §4.6** (demo parse consumers; R1 crash surface) | this component is the **untrusted-CSS ingress** upstream of `parseAnimationCSS` → A2/A1; the list should carry `CSSCodeEditor.vue:116` as the entry point | **EXTENDS** — additive, not contradictory |
| **lane-library §1** (`sideEffects: false`) | `resolve/browser.ts:22-24` installs a global listener at module scope | **CONTRADICTS** the manifest, not the lane; recorded in C-7 |

No corpus claim is contradicted by the tree. Two are extended.

---

## 9. Repair order (dependency-respecting)

1. **C-1** — restore CSS tokenization. Cheapest correct form: add `import("monaco-editor/esm/vs/basic-languages/css/css.contribution")` (highlighting) and, if the language service is wanted, `import("monaco-editor/esm/vs/language/css/monaco.contribution")` (which also makes C-2's worker live) to the `Promise.all` at `:53-58`; delete the now-redundant `:72`. Decide C-2 in the same breath: service → keep the worker import; highlighting-only → delete it and the `label === "css"` branch. **Then re-measure `vendor-monaco`** — U.D5's 4.18→2.53 MB number is invalid as a like-for-like.
2. **C-4** — replace all three `editor.setValue()` (`:171`, `:183`, `:192`) with `executeEdits` over the full model range.
3. **C-8 + C-19 (the gate hole)** — add `vue-tsc --noEmit` to `check` and put `demo/` into CI. This is what let C-1, C-3, C-8 and C-12 coexist with a green pipeline; land it before anything else in this list is trusted.
4. **C-5, C-6, C-14** — error boundaries (adopt `withErrorToastAsync`) + `monacoBoot` reset-on-reject + `accessibilitySupport: "auto"`.
5. **C-7** — lift `convertPixelsToCh` (a two-line pure function) to a demo util or a LIGHT published entry; drop both demo deep imports (`CSSCodeEditor.vue:40`, `useKeyframesState.ts:1`); extend `depcruise` to `demo/`.
6. **C-3, C-9, C-10..C-13, C-15, C-17** — contract and consumption hygiene, each independently landable.
7. **C-16 / F-1** — declare `@mkbabb/glass-ui: 7.0.0` and regenerate the lock. Per lane-frontend §10 this precedes any wave that must reproduce a build; it is listed last only because nothing above depends on it *logically*, and first in wall-clock because nothing above is **verifiable** until `npm ci` works.

---

## Provenance

Every quoted line was read from the live tree at `/Users/mkbabb/Programming/keyframes.js` (HEAD `8281638c`) or from its installed `node_modules` (`monaco-editor@0.55.1`, `@mkbabb/glass-ui@7.0.0`, `vue@3.5.35`). Git evidence via `git log --oneline --follow`, `git show 5fe2e4cb`, `git show 5fe2e4cb^:<path>` — read-only. No file in keyframes.js was written, mutated, or executed; no install, no dev server, no browser tooling was run. Runtime-visual consequences are marked **UNPROVEN-NEEDS-LIVE** and deferred to SS-13 (two sites: C-1's on-screen absence of color, C-15's true glyph advance); every other claim is static and reproducible from the anchors given.
