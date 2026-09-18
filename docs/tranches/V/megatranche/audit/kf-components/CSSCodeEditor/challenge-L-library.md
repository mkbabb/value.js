claude-opus-5[1m]

# Challenge · `CSSCodeEditor.vue` · axis **L (LIBRARY)**

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/keyframes/CSSCodeEditor.vue` (229 lines)
**Mode** static, read-only. No browser tooling, no installs, no dev servers, no writes to any product tree. The single write is this file.
**Substrate** keyframes.js `master`, working tree as of 2026-08-04. Provenance commits cited inline (`git show`/`git log -S`, read-only).
**Corpus folded** `formation/keyframes/lane-frontend.md` (F-1 phantom dep; shadow census S-1..S-8), `formation/keyframes/lane-library.md` (package surface, barrel shape). Overlaps cited by id; one explicit contradiction of a *code comment* is recorded at L-i1.

Every claim below carries **severity + file:line + falsifier**. Superlatives carry falsifiers too (L-18 runs both ways). The component was assumed defective until the tree spoke; three candidate defects were **investigated and dropped** as false — they are listed at §5 so the next auditor does not re-walk them.

---

## 0. Verdict

| | count |
|---|--:|
| BLOCKER | **2** |
| MAJOR | **6** |
| MINOR | **10** |
| INFO | **4** |
| **defects total** | **22** |
| **superlatives** | **6** |

The headline: **this is a genuinely well-engineered async-boot shell wrapped around an editor that no longer highlights CSS and a v-model contract that corrupts data.** The lazy-Monaco machinery (§4, six superlatives) is the best-reasoned code in the demo's instrument tree. The two BLOCKERs are both *silent* — no console error, no failing gate, no type error — and both were introduced by changes whose commit messages measured the thing they optimised and never measured the thing they broke.

---

## 1. BLOCKERS

### L-B1 — `editor.api` registers **no CSS tokenizer and no CSS language service**; the CSS editor renders monochrome, and the CSS worker it fetches can never be instantiated · **BLOCKER**

**Site** `CSSCodeEditor.vue:54` (`import("monaco-editor/esm/vs/editor/editor.api")`), `:58` (`css.worker?worker`), `:72` (`m.languages.register({ id: "css" })`), `:36-37`+`:70-71` (theme JSONs).

The boot resolves the **bare** editor API. Its whole module body is two lines:

```
node_modules/monaco-editor/esm/vs/editor/editor.api.js:1-2
  import './internal/initialize.js';
  export { …, editor, languages } from './editor.api2.js';
```

`editor.api2.js` contains **zero** language registrations — measured:

```
$ grep -c "registerLanguage" node_modules/monaco-editor/esm/vs/editor/editor.api2.js   → 0
```

The full entry is where the CSS language lives:

```
node_modules/monaco-editor/esm/vs/editor/editor.main.js:1   import '../language/css/monaco.contribution.js';        ← the CSS *language service* (worker, diagnostics, completions)
node_modules/monaco-editor/esm/vs/editor/editor.main.js:16  import '../basic-languages/css/css.contribution.js';    ← the Monarch *tokenizer*
```

and `basic-languages/css/css.contribution.js:3-9` is what actually attaches a tokenizer:

```js
registerLanguage({ id: "css", extensions: [".css"], …, loader: () => import('./css.js') });
```

`CSSCodeEditor.vue:72`'s `m.languages.register({ id: "css" })` registers the **id only** — a language with no tokens provider and no language configuration. Consequences, each a direct deduction from the above:

1. **No syntax highlighting.** Every character tokenizes as the null token `""`.
2. **Both vendored themes are ~93% inert.** Measured rule counts: Dracula 46 rules, GitHub 54 rules, all keyed on TextMate scopes (`comment`, `string`, `constant.numeric`, `keyword`, `storage`, `variable.other.readwrite.instance`, …). With only the `""` token emitted, exactly one rule per theme can match; the remaining **45 / 53** never fire. The 8 / 6 `colors` keys still apply, so the editor is a correctly-coloured *background* with uncoloured text — which is precisely why this reads as "styled" at a glance and hides.
3. **No CSS diagnostics, completions, hovers, or colour decorators** — `language/css/monaco.contribution.js` is the only thing that calls `languages.onLanguage("css", …)` (`:180`) to spin up the CSS worker.
4. **`css.worker?worker` at `:58` is a fetched, parsed, never-instantiable chunk.** `MonacoEnvironment.getWorker` (`:63-68`) only ever sees `label === "css"` if the CSS language service requests it. It is never registered, so the `label === "css" | "scss" | "less"` arm at `:64-65` is **dead** and every worker request falls through to `new EditorWorker()` at `:67`. The boot pays a worker-chunk fetch on the critical editor-mount path for capability that cannot exist.
5. **No CSS editor affordances**: no auto-closing braces, no `Ctrl+/` comment toggle, no bracket-pair colourisation for `{}` — all carried by the language *configuration* that ships with the contribution.

**Provenance — this is a regression, and the commit says so.**

```
$ git log -S "editor/editor.api" --oneline -- demo/components/instrument/keyframes/CSSCodeEditor.vue
5fe2e4cb perf(U.D5): load Monaco editor API without unused language workers

$ git show 5fe2e4cb -- …/CSSCodeEditor.vue
-        import("monaco-editor"),
+        import("monaco-editor/esm/vs/editor/editor.api"),
```

One line. The message reads: *"the gh-pages build now emits only editor and CSS workers and shrinks vendor-monaco from 4.18MB to 2.53MB. check, demo-smoke, and easing-editor-live pass."* Every one of those claims is true and **none of them can observe tokenization**:

- `check` → `tsc --noEmit`, and the tsc program contains **0 `.vue` files** (proved at L-M4).
- `demo-smoke` asserts chunk-graph shape and a zero-console-error mount (`scripts/observe/demo/smoke.mjs:19-33, 82-87`) — nothing about token colours.
- The 1.65 MB that "shrank" *is the language contributions* — i.e. the measurement and the defect are the same delta, read with opposite signs.

Before `5fe2e4cb`, `import("monaco-editor")` resolved through the package exports map (`"." → ./esm/vs/editor/editor.main.js`) and registered CSS by side effect, which is why `:72`'s explicit `register` was a harmless no-op then and is load-bearing-but-insufficient now.

**Falsifier.** A live screenshot, a proof-gate golden, or a DOM probe showing more than one distinct `color` among the `.mtk*` spans inside `.monaco-editor .view-line` while CSS is in the buffer. Equally fatal: any other module in the demo statically importing `monaco-editor` (root) or a `css.contribution` — which would register the language globally by side effect. I probed for exactly that:

```
$ grep -rn "monaco" demo src --include="*.ts" --include="*.vue" | grep "import\|from \""
→ CSSCodeEditor.vue only (lines 31, 54, 57, 58, plus the two local theme JSONs)
```

No other importer exists. **UNPROVEN-NEEDS-LIVE** only in the weak sense that the visual confirmation belongs to SS-13; the structural claim is closed on source.

---

### L-B2 — a stale in-flight debounced emit lands on the **wrong keyframe** after the selection changes · **BLOCKER** (silent data loss)

**Sites** `CSSCodeEditor.vue:114-120` (200 ms debounce), `:151-154` (the `isSettingValue` early-return), `:165-176` (the external-sync watch), witness `KeyframeTimeline.vue:123-127, 239-265`.

The two guards are each individually correct and jointly wrong.

- `:152` — `if (isSettingValue) return;` exists so a programmatic `setValue` does not echo back as a user edit.
- `:169-174` — the external-sync watch sets that flag around `editor.setValue(newVal)`.
- `helpers.ts:15-24` — `debounce` exposes **no `cancel`**; the pending timer is unreachable.

So a `setValue` neither *fires* an emit nor *cancels* the one already armed. Trace, with the timeline witness:

```
t=0    keyframe A selected. User types `opacity: 0.5`.
       :151 → not setting → debouncedEmit("opacity: 0.5") armed for t=200.
t=100  User clicks keyframe B's diamond.
       KeyframeTimeline.vue:85  `@select="(id) => (selectedKeyframeId = id)"`
       :239 `selectedKeyframeCSS` recomputes to B's vars → the prop changes.
       CSSCodeEditor :168 → getValue() !== newVal → :171 setValue(B's css) under the guard.
       → NO emit (correct), AND the t=200 timer is untouched (the defect).
t=200  The stale timer fires with **A's** text.
       :116 modelValue.value = "opacity: 0.5" → `update:model-value`
       KeyframeTimeline.vue:246 onKeyframeCSSChange resolves its target AT EMIT TIME:
         :247  if (!selectedKeyframeId.value) return;      ← now B
         :248  const kf = …find(k => k.id === selectedKeyframeId.value)   ← B
         :263  kf.vars = newVars;                          ← FULL REPLACE, not merge
         :264  rebuild();
```

**Keyframe B's entire declaration block is overwritten with keyframe A's text.** Not merged — `:263` assigns. Then `selectedKeyframeCSS` recomputes to A's content under B's label, so the UI shows a plausible result and the user's only tell is that B's real vars are gone. No console error; `rebuild()` succeeds because the CSS is valid — just for the wrong frame.

The window is 200 ms after the *last* keystroke, and the trigger (type → click the next diamond) is the instrument's primary interaction loop.

The same shape, less lethal, in the second consumer: `KeyframesStringControls.vue:6` binds `:model-value="cssKeyframesString"`, which `updateCSSAnimationKeyframesStringFromAnimation()` rewrites whenever the animation changes from elsewhere (a slider in `KeyframesEditor`). There the stale emit *reverts* the external update rather than misrouting it.

**Ownership.** The parent's emit-time target resolution is half of it, but the child owns the contract: a debounced-emit editor that also accepts unsolicited external writes **must** cancel or re-key its pending emit on every external write. It does neither, and `helpers.ts`'s `debounce` gives it no handle to do so.

**Falsifier.** Any of: (a) `debounce` in `src/animation/internal/helpers.ts` growing a `cancel` that `:165-176` calls before `setValue` — it has none (`:15-24`, no returned handle, `timer` is closure-private); (b) Monaco firing `onDidChangeModelContent` *asynchronously*, so the guarded `setValue` re-arms the timer with B's text — disproved at L-M1 below (`textModel.js` `_deferredCnt === 0` → synchronous `fire`); (c) `KeyframeTimeline` capturing the target id at emit-*arm* time rather than emit-*fire* time — `:247-248` reads the live ref. All three are closed against the tree.

---

## 2. MAJORS

### L-M1 — `formatCSS()` **never reaches the model**; formatting is editor-local and is reverted by the next external sync · **MAJOR**

**Sites** `CSSCodeEditor.vue:178-187`; witness `KeyframesStringControls.vue:71-101`.

```
:181  isSettingValue = true;
:183  editor.setValue(formatted);
:185  isSettingValue = false;
:186  toast.success("CSS formatted");
```

No `modelValue.value = formatted`. The guard at `:152` suppresses the only path that would have carried it out. So after a successful format the editor buffer and the parent's model **diverge**, and the toast asserts a persistence that did not happen.

Monaco's emit is synchronous inside `setValue`, so the guard genuinely closes:

```
node_modules/monaco-editor/esm/vs/editor/common/model/textModel.js
  :277-283   setValue(value) → _setValueFromTextBuffer(...)
  :320       _emitContentChangedEvent(...)          ← no beginDeferredEmit around it
  :2016-2027 fire(e) { if (this._deferredCnt > 0) {…} _fastEmitter.fire(e); _slowEmitter.fire(e); }
```

`setValue` never calls `beginDeferredEmit`, so `_deferredCnt === 0` and both emitters fire **in the same tick**, inside the `isSettingValue` window. Confirmed: format is swallowed.

The parent already carries a monument to this. `KeyframesStringControls.vue:71` `const isFormatting = ref(false)`, set at `:85`, cleared 300 ms later at `:75-81`, read at `:101` — `if (!isFormatting.value) toast.success("Keyframes parsed 🎉")`. It exists to suppress a parse-toast for the format's own emit. **That emit does not exist.** The flag is a compensator for a defect on the other side of a contract, and its only live effect is to accidentally mask a *pending user* emit that lands during the 300 ms window.

Next external sync (`:165-176`) rewrites the buffer from the unformatted model, and the formatting is gone.

**Falsifier.** Monaco deferring the content-change event out of the synchronous `setValue` call — refuted at `textModel.js:2016-2027` above. Or a consumer reading `getValue()` after `formatCSS()` and persisting it: censused — **no consumer calls `getValue()`** (L-m4).

---

### L-M2 — `editor.setValue()` **destroys the undo/redo stack** on every reconciliation; the caret "restore" is a half-measure · **MAJOR**

**Sites** `CSSCodeEditor.vue:171, 183, 192` (three `setValue` call sites), `:170+172`, `:182+184` (the position dance).

```
node_modules/monaco-editor/esm/vs/editor/common/model/textModel.js:303-320  _setValueFromTextBuffer
  :311  this._buffer = textBuffer;
  :314  this._decorations = Object.create(null);        ← all decorations destroyed
  :317  this._commandManager.clear();                   ← "Destroy my edit history and settings"
  :320  _emitContentChangedEvent(… new ModelRawFlush() …)
```

Every external sync, every format, and every `setValue()` call **wipes the user's entire undo history** and all model decorations. Monaco's own primitive for programmatic replacement that preserves undo is `model.pushEditOperations` / `editor.executeEdits` with a full-range edit — neither is used.

`editor.setPosition(pos)` (`:172`, `:184`) restores a `(lineNumber, column)` pair only: not the selection, not the scroll offset, not the multi-cursor set, and it is silently clamped when the new text is shorter. Combined with L-M3, this fires while the user is typing.

**Falsifier.** A monaco version where `_setValueFromTextBuffer` does not clear `_commandManager` — the installed `monaco-editor@0.55.1` does, at `:317`, with a source comment naming the intent.

---

### L-M3 — the external-sync watch rewrites the buffer **under the user's cursor** whenever the parent's round-trip is lossy · **MAJOR**

**Sites** `CSSCodeEditor.vue:165-176`; witness `KeyframeTimeline.vue:239-265`.

The watch fires on *any* prop change with an unconditional `getValue() !== newVal` → `setValue`. It does not check editor focus, does not check whether an emit is in flight, and does not distinguish "the parent echoed my own edit back, normalised" from "the parent has genuinely new content".

The timeline parent normalises destructively — `:251-261` drops blank lines and `/*` comments, trims, strips a trailing `;`, then `:241-243` re-serialises as `` `${prop}: ${value};` `` joined by `\n`. So the round-trip is **not** the identity for text a human is mid-way through typing:

| user's buffer at t=200 | comes back as | outcome |
|---|---|---|
| `transform: translateX(` | `transform: translateX(;` | a `;` is inserted mid-token |
| `  opacity : 0.5` | `opacity: 0.5;` | whitespace collapsed, caret jumps |
| `opacity: 0.5\n\n/* wip */` | `opacity: 0.5;` | the comment and blank line are deleted |

Each of those is a `setValue` → **undo stack cleared** (L-M2) → caret clamped. Every 200 ms of typing pause. `defineModel`'s controlled path makes this unavoidable: with both `:model-value` and `@update:model-value` present (both consumers bind both), Vue's `useModel` does **not** optimistically hold the local value — the emitted string round-trips through the parent and returns as the prop. The child is therefore obligated to be defensive about the return leg, and is not.

**Falsifier.** A `document.activeElement` / `editor.hasTextFocus()` guard, or a version-stamp/echo-suppression comparison in the watch — neither exists at `:165-176`. Or a parent whose transform is the identity — `KeyframeTimeline.vue:241-261` is provably not.

---

### L-M4 — `debounce(fn, 200, false)` passes a third argument to a two-parameter function — and **no `.vue` file is typechecked anywhere in this repo** · **MAJOR**

**Sites** `CSSCodeEditor.vue:114-120`; contract `src/animation/internal/helpers.ts:15-24`.

```ts
// helpers.ts:15-18 — the whole signature
export function debounce<Args extends unknown[]>(
    fn: (...args: Args) => void,
    milliseconds: number,
): (...args: Args) => void
```

```ts
// CSSCodeEditor.vue:114-120
const debouncedEmit = debounce(
    (value: string) => { modelValue.value = value; },
    200,
    false,          // ← TS2554: Expected 2 arguments, but got 3
);
```

There is exactly one `debounce` in the repo (`grep -rn "function debounce\|const debounce" src demo` → one hit, `helpers.ts:15`), no overloads, no ambient shadow. The other three call sites are correct 2-arg calls (`useKeyframeOps.ts:87,108`; `useKeyframesParsing.ts:62`) — this component is the sole offender. At runtime the extra arg is discarded, so the **behaviour** is the intended trailing-edge debounce; the defect is the type error plus the false signal that a leading-edge option exists.

The reason it survives is the larger finding:

```
$ npx tsc -p tsconfig.json --listFilesOnly | grep -c "\.vue$"      → 0
$ grep -rn "vue-tsc" package.json .github/workflows/ scripts/      → (no output)
$ grep -n "run: npm run check" .github/workflows/ci.yml            → check:lib   (tsconfig.lib.json = src/ only)
```

`tsconfig.json` includes `demo/`, but `.vue` is not a TypeScript input extension and `allowArbitraryExtensions` is unset, so the program is empty of SFCs. `npm run check` cannot see this file. CI runs only `check:lib`, which is narrower still. **Every SFC in the demo — 58 files, 11 984 lines (lane-frontend §9) — is entirely untypechecked**, and this line is the proof-of-existence.

**Falsifier.** A `vue-tsc` invocation anywhere in the toolchain, or a `debounce` overload/`.d.ts` augmentation admitting a third parameter. Both probed above; neither exists.

---

### L-M5 — **no error posture on the Monaco boot**: a rejected boot is cached forever, the rejection floats, and the editor is a permanently blank sized `<div>` · **MAJOR**

**Sites** `CSSCodeEditor.vue:52-76` (`monacoBoot ??=`), `:202` and `:213` (unhandled `initEditor()`), `:122-155`.

```ts
:53  return (monacoBoot ??= Promise.all([ … ]).then(…));
```

`??=` caches the promise **including a rejected one**. A chunk-load failure (network blip, a stale `index.html` against a redeployed hash — the standard SPA failure that `vite:preloadError` exists for) poisons the module for the page's lifetime: every later editor mount, in every scene, awaits the same settled rejection. There is no retry, no reset-to-`undefined` on failure.

`initEditor` is `async` and is called bare at `:202` and `:213` — floating. The rejection reaches `window.unhandledrejection`, where the app's only handler is:

```ts
demo/app/lifecycle/useMonacoCancellationGuard.ts:20-29
  const isMonacoCanceled = (r) => r.name === "Canceled" || r.message === "Canceled";
  useEventListener(window, "unhandledrejection", (e) => { if (isMonacoCanceled(e.reason)) e.preventDefault(); });
```

Deliberately narrow — a chunk-load error is **not** `"Canceled"`, so it is correctly left to surface. But nothing surfaces it *to the user*: the outcome is a console error and a `300px`-tall empty bordered box with no message, no spinner, no retry.

This is doubly a defect because the **sibling composable in the same directory already has the idiom**: `useKeyframeOps.ts:25` `withErrorToastAsync(fn, message, retry)` — `:97-104` passes a retry closure so the user can re-fire a failed op. `CSSCodeEditor` is the one async surface in the feature that opted out.

**Falsifier.** A `vite:preloadError` listener that reloads the page, a `<Suspense>`/`defineAsyncComponent` `errorComponent` wrapping this SFC (`index.ts:11` uses the bare one-arg `defineAsyncComponent(() => import(...))` — no `errorComponent`, no `onError`), or a `.catch` at `:202`/`:213`. None present.

---

### L-M6 — post-unmount `update:modelValue` emit · **MAJOR** *(mechanism-shared with L-B2, distinct trigger)*

**Sites** `CSSCodeEditor.vue:114-120`, `:218-221`.

`onUnmounted` sets `disposed` and disposes the editor but does not (cannot — L-B2) cancel the pending 200 ms emit. A user who types and immediately unmounts the editor (`KeyframeTimeline.vue:97` `v-if="selectedKeyframe"`, or a scene swap, or the `ControlsPaneWrapper` drawer closing) has an `update:modelValue` fire from a torn-down instance up to 200 ms later. Vue's bound `emit` still delivers, so the parent handler runs against whatever state now exists.

For the timeline's deselect-to-null path this is *benign by luck*: `KeyframeTimeline.vue:247` `if (!selectedKeyframeId.value) return;`. That luck is the parent's, not the child's.

**Falsifier.** Vue dropping emits from unmounted instances (it does not — `emit` closes over the instance, and the component is not `null`ed), or a cancel handle on the debounce (none).

---

## 3. MINORS

### L-m1 — the `ch != null` guard is provably dead; the real hazard is unguarded · **MINOR**
`CSSCodeEditor.vue:107-112`. `convertPixelsToCh` is declared `=> number` (`src/animation/resolve/browser.ts:137-138`) — never `null`/`undefined`, so `:111`'s `ch != null` is a statically unreachable false branch. Nor can it produce `Infinity`: the divisor is `convertToPixels(1,"ch",el)` → `browser.ts:123` `const fontSize = Number.parseFloat(style.fontSize) || 16` → `:127` `value * fontSize * 0.5`, and `|| 16` makes zero unreachable. The guard defends against the one thing that cannot happen while §L-m3's real error goes unchecked.
*Falsifier:* a `convertPixelsToCh` overload returning `number | undefined`, or a path where `convertToPixels` can return `0` for `"ch"` — neither exists in `browser.ts:118-138`.

### L-m2 — `getFormatWidth` is duplicated, and its twin is permanently inert · **MINOR**
`CSSCodeEditor.vue:107-112` vs `demo/components/instrument/keyframes/composables/useKeyframesState.ts:31-38` — same name, same `convertPixelsToCh(el.offsetWidth, el)` body, in the **same feature directory**, differing only in guard shape and a missing `Math.floor`. The composable's copy is fed by `tabsListEl` (`useKeyframesState.ts:27`), and `grep -rn "tabsListEl" demo` finds **no template binding anywhere** — it is declared, returned through `useKeyframesEditor.ts:32`, and never assigned. So `state.getFormatWidth()` always returns `undefined` and the three parse-path formats (`useKeyframeOps.ts:147`, `useKeyframesParsing.ts:41,53`) silently take prettier's default `printWidth: 80`, while the component's copy uses a measured width. **The same CSS therefore formats at two different print widths depending on which path ran** — visible as a reflow when the user presses format on freshly-parsed text.
*Falsifier:* any `ref="tabsListEl"` binding in a `.vue`, or a caller passing an explicit `el`.

### L-m3 — the print width is measured on the wrong font and the wrong box · **MINOR**
`CSSCodeEditor.vue:110`. `convertPixelsToCh(el.offsetWidth, el)` measures **`containerEl`**, which carries only `w-full rounded-lg overflow-hidden cartoon-surface` — no `font-family`, no `font-size` — so it inherits the app body font, not the `"Fira Code"` at `props.fontSize` that Monaco renders in (`:137-138`). Worse, the engine approximates `ch` as `fontSize * 0.5` (`browser.ts:127`), not the real advance width. And `offsetWidth` is the full container including Monaco's line-number gutter and its own horizontal padding, so the derived column overshoots. Net: prettier's `printWidth` bears no reliable relation to where Monaco actually wraps (`wordWrap: "on"`, `:140`).
*Falsifier:* container CSS elsewhere setting a mono font/size on `.cartoon-surface`, or a `ch` implementation in `browser.ts` measuring a real glyph.

### L-m4 — 3 of 4 `defineExpose` members are dead, and one of them is unsafe by construction · **MINOR**
`CSSCodeEditor.vue:223-228`. Census: `grep -rn "editorRef\." demo` → **two hits, both `formatCSS`** (`KeyframesStringControls.vue:84,86`). `setValue`, `getValue`, and `editor` have zero consumers. Each is independently hazardous if adopted: `setValue` (`:189-195`) writes under `isSettingValue` and therefore **desyncs the v-model by design**; `getValue` (`:197`) returns `""` — not `modelValue.value` — before the async boot completes or when the container never gains size (`:209-215`), so a caller silently reads empty content as real content; `editor: () => editor` leaks the raw `IStandaloneCodeEditor` through the component boundary, inviting exactly the `setValue` misuse of L-M2.
*Falsifier:* a consumer outside `demo/` (there is none — the demo is the only tree) or a test calling them (`grep -rln "CSSCodeEditor" test` → no output).

### L-m5 — `as any` ×2 where a named type exists · **MINOR**
`CSSCodeEditor.vue:70-71` — `DarkTheme as any`, `LightTheme as any`. The needed cast is `Monaco.editor.IStandaloneThemeData` (the `Monaco` namespace is already imported at `:31`); `as any` is required only because `resolveJsonModule` widens `base: "vs-dark"` to `string`. As written it also silences every real shape error in the vendored JSON.
*Falsifier:* `IStandaloneThemeData` not being assignable from these JSONs even with the narrow cast — they are `{base, inherit, rules[], colors{}}`, exactly its shape.

### L-m6 — the dark-flip uses a raw `watch` where glass-ui publishes a batching hook expressly for this · **MINOR**
`CSSCodeEditor.vue:98, 157-163`. `useGlobalDark()` returns `onFlipSettled` whose own contract documents the intent (`node_modules/@mkbabb/glass-ui/dist/composables/dark/useGlobalDark.d.ts`): *"consumers BATCH N expensive re-theme operations … into a single beat instead of N watchers firing in N sequential storms on the critical frame."* `monaco.editor.setTheme` is a **global** re-tokenise + full repaint of every mounted editor. With two editors live (`KeyframesStringControls` + `KeyframeTimeline` can both be mounted), N per-instance watchers each fire the same global call, on the flip's critical frame, instead of once on the settle beat.
*Falsifier:* `onFlipSettled` being absent from the installed 7.0.0 (it is exported), or `setTheme` being cheap (it invalidates tokenization state for all models).

### L-m7 — prop changes after mount are ignored · **MINOR**
`CSSCodeEditor.vue:78-93, 132-149`. `fontSize`, `lineNumbers`, and `padding` are read **once** at create time; there is no `watch` → `editor.updateOptions(...)`. Only `height` stays reactive, because it is bound in the template (`:8`). Both current consumers pass constants, so this is latent — but the props are declared as a reactive surface and do not behave as one.
*Falsifier:* an `updateOptions` call anywhere in the file (there is none).

### L-m8 — `monaco-themes` is now a dead devDependency · **MINOR**
`package.json:90` `"monaco-themes": "^0.4.8"`. `grep -rn "monaco-themes" demo src scripts test` (excluding the local `./monaco-themes/` directory) hits only the **comment** at `CSSCodeEditor.vue:32-33` explaining why the package is unusable. The comment is correct about the exports map; the follow-through — dropping the dependency once its themes were vendored to `./monaco-themes/*.json` — was not done.
*Falsifier:* a build script or config consuming the package (probed across `demo src scripts test`; none).

### L-m9 — the save-position / `setValue` / restore-position block is written three times · **MINOR**
`CSSCodeEditor.vue:169-174`, `:181-185`, `:190-194`. Three near-copies of the same five-line ritual, and they already disagree: `:189-195` omits the position save/restore entirely. One private `replaceContent(next: string)` helper would carry the guard, the position, and (per L-M2) the correct `pushEditOperations` in one place — and would be the single seam where L-B2's cancel belongs.
*Falsifier:* a semantic difference between the three that forbids extraction — there is none; `:189-195` is a strict subset.

### L-m10 — `watch(modelValue, …)` is a trailing-comma multi-line call with no options object · **MINOR**
`CSSCodeEditor.vue:165-176`. Cosmetic on its own, but it reads as though options were intended and dropped — and `{ flush: "post" }` or a focus guard is exactly what L-M3 needs. Recording it so the shape is not mistaken for deliberate.
*Falsifier:* n/a (style claim, no behavioural assertion).

---

## 4. INFO

### L-i1 — the header comment describes code that was replaced three weeks ago · **INFO** *(explicit contradiction of in-tree prose)*
`CSSCodeEditor.vue:21` still narrates *"the namespace `import("monaco-editor")`"* as the thing being deferred. `5fe2e4cb` (2026-07-12) changed that line to `editor.api` and left the 16-line comment block (`:15-30`) untouched. The comment is otherwise the best in the file (see L-S2) — which is exactly why the stale sentence is dangerous: a reader who trusts `:21` will not suspect L-B1. This is the one place I contradict in-tree prose rather than a census id.

### L-i2 — deep `@src/animation/internal/**` imports bypass the dogfood barrel · **INFO**
`CSSCodeEditor.vue:40` (`@src/animation/resolve/browser`) and `:42` (`@src/animation/internal/helpers`). Neither `convertPixelsToCh` nor `debounce` is exported from `src/animation/index.ts` (`grep` → no hits among its 71 export lines), so both reach past the published surface — one of them into a directory literally named `internal`. This is repo-wide (11 `@src/` deep-import sites in `demo/`, of which these are 2), and it sits in tension with the **L.W8 S1 ED-3 DOGFOOD INVERSION** that `tsconfig.json` documents at length: the demo was flipped onto the barrel specifier `@mkbabb/keyframes.js` precisely so consumer and library share one type realm. Not this component's invention, so INFO — but this file is where the sharpest instance lives, and `debounce` is a 9-line utility that would be better owned by `demo/utils/` than deep-imported from a library's internals. (Cross-ref lane-library §1: the package exports exactly two subpaths, `.` and `./engine`; nothing here is reachable from either.)

### L-i3 — `formatEditorCSS` parses CSS with prettier's **scss** parser · **INFO**
`demo/utils/formatEditorCSS.ts:11` — `parser: "scss"` on content that is plain CSS, with `plugins: [postcss]`. It works (SCSS is a CSS superset), but it silently accepts `//` line comments that are invalid in the CSS the editor round-trips into the engine, and nesting/`@`-rule handling can differ. `parser: "css"` is the exact fit. Attributed to the imported util, not the component.

### L-i4 — the glass-ui phantom dependency bites here at one line · **INFO** *(= lane-frontend **F-1**)*
`CSSCodeEditor.vue:38` `import { useGlobalDark } from "@mkbabb/glass-ui/dark"` is one of the 42 files depending on a package that is in **neither `package.json` nor `package-lock.json`** while 7.0.0 sits installed (F-1, RED). Confirmed independently: `grep -n "glass-ui" package.json` → no output; `node_modules/@mkbabb/glass-ui` present. On a clean `npm ci` this file does not resolve. Two component-specific notes lane-frontend could not make from its altitude: (a) the dependency here is a *single composable* used for *one* purpose — theme-string selection at `:136` and `:160` — so this component is the cheapest place in the demo to be glass-independent, though F-1 must be fixed at the root regardless; (b) `defineAsyncComponent` (`index.ts:11`) does **not** soften F-1 — Vite resolves the specifier at build time, so the failure is a build error, not a lazy runtime one.

---

## 5. Investigated and DROPPED — do not re-walk

Recording these so the next auditor's budget goes elsewhere. Each was a plausible defect that the tree refuted.

1. **`self.MonacoEnvironment` is untyped.** *False.* `monaco-editor/esm/vs/editor/editor.api.d.ts:8` carries `declare global { var MonacoEnvironment: Environment | undefined }`, and the dynamic `import("…/editor.api")` at `:54` pulls that `.d.ts` into the program, so `self.MonacoEnvironment` (`:62`) resolves through `Window & typeof globalThis`. No cast needed, none used. Correct as written.
2. **`useResizeObserver` created inside `onMounted` leaks (no active effect scope).** *False, and the comment at `:207-208` is right.* Vue's lifecycle-hook wrapper calls `setCurrentInstance(target)` (`@vue/runtime-core/dist/runtime-core.esm-bundler.js:3070`), and `setCurrentInstance` calls `instance.scope.on()` (`:8078`). The scope is active, `tryOnScopeDispose` registers, the observer auto-stops on unmount. See L-S4.
3. **`getFormatWidth` can produce `Infinity`/`NaN` and poison prettier.** *False.* `browser.ts:123`'s `|| 16` fallback makes the divisor unreachable-zero. Downgraded to the *dead-guard* claim at L-m1 rather than a crash claim.

---

## 6. SUPERLATIVES — L-18 runs both ways

These are not politeness. Each is a specific, verified piece of engineering that the fixes above must **preserve**, and each carries its own falsifier.

### L-S1 — the module-scoped idempotent boot singleton
`CSSCodeEditor.vue:49-76`. `monaco` + `monacoBoot` live at *module* scope in a `<script setup>` SFC — shared across every instance, which is exactly right for a 2.5 MB namespace, a `MonacoEnvironment` install, and two `defineTheme` registrations that must happen once. `??=` makes the first mount the boot and every later mount await the same settled promise: no double-register, no second fetch, no lock needed. The comment at `:45-48` states the invariant precisely. This is textbook and rare.
*Falsifier:* two mounts producing two `defineTheme` calls (impossible — `??=` is evaluated once per module), or per-instance state accidentally hoisted into module scope (`editor`, `isSettingValue`, `disposed` are all correctly instance-scoped at `:100-105`).

### L-S2 — the dynamic-`?worker` insight
`CSSCodeEditor.vue:22-26, 55-58`. *"a STATIC `?worker` import still emits a tiny worker-proxy edge INTO `vendor-monaco`, so a static worker import re-eagerizes the chunk it is meant to defer."* This is a genuinely non-obvious bundler fact — the kind that is normally discovered only by staring at a chunk graph — it is correctly acted on, correctly documented, and **structurally enforced downstream**: `scripts/observe/demo/smoke.mjs:82-87` fails the build if the entry statically imports `vendor-monaco`. A correct insight, a correct fix, and a gate that keeps it true.
*Falsifier:* a chunk-graph dump showing `vendor-monaco` on the entry's static graph, which is precisely what the smoke gate asserts against.

### L-S3 — the unmount-during-chunk-load race is genuinely closed
`CSSCodeEditor.vue:102-105, 122-130, 218-221`. `disposed` is set in `onUnmounted`, and `initEditor` re-checks **both** `disposed` and `containerEl.value` *after* the `await` (`:130`) in addition to the pre-await check (`:126`). Almost every hand-rolled lazy-editor wrapper gets this wrong and creates an editor over a detached node. This one names the hazard in prose and closes it on both legs.
*Falsifier:* a path reaching `m.editor.create(el, …)` (`:132`) with a detached `el` — requires `containerEl.value` to be truthy while the node is detached, which Vue's template-ref nulling on unmount prevents.

### L-S4 — the one-shot deferred init, and its cleanup claim is **true**
`CSSCodeEditor.vue:199-216`. A zero-size container (collapsed drawer, `v-show`n pane) would produce a broken Monaco layout; the code waits for non-zero `contentRect`, calls `stop()` **before** `initEditor()` so it cannot double-init, and relies on scope-dispose if the size never resolves. I verified the scope claim rather than trusting the comment: `runtime-core.esm-bundler.js:3070` → `setCurrentInstance` → `:8078` `instance.scope.on()`. The observer is scope-owned. The `entries[0]` access is also correctly guarded for `noUncheckedIndexedAccess` (`:210-211`).
*Falsifier:* a Vue version whose lifecycle-hook wrapper does not activate the instance scope — refuted at the two line numbers above for the installed version.

### L-S5 — the boot race on content is closed at create time
`CSSCodeEditor.vue:133`. `value: modelValue.value` is read at `create` time, *after* the await, so a model change that lands while the 2.5 MB chunk is in flight is not lost — even though the `watch` at `:165` cannot help (it early-returns on `!editor`). The two halves compose correctly, and this is the one place in the file where the pre-boot/post-boot seam is handled exactly right.
*Falsifier:* `create` being passed a value captured before the await — `:133` reads the ref inside the post-await block.

### L-S6 — the iOS no-zoom floor, routed through one shared util
`CSSCodeEditor.vue:39, 137` → `iosTextEntry.ts:10-11` `clampIOSNoZoomFontSize = fs => isIOSLikePlatform() ? Math.max(fs, 16) : fs`. Sub-16px text entry triggers Safari's involuntary zoom on focus; applying the floor to Monaco's `fontSize` (default `14`) is a real device-class fix that most editor embeds ship broken. It is a *shared* util with a `CSS.supports("(-webkit-touch-callout: none)")` fallback for iPadOS desktop-mode UA spoofing (`:6`), not an inline sniff — the correct altitude.
*Falsifier:* the clamp being applied where it does not matter (it is applied to the editor's own `fontSize`, the exact input Safari reads) or duplicated inline elsewhere (`grep` → one definition, imported).

---

## 7. Remediation order (dependency-respecting)

1. **L-B1** — restore `import("monaco-editor")`, or import `basic-languages/css/css.contribution` + `language/css/monaco.contribution` explicitly alongside `editor.api` to keep most of the 1.65 MB saving. Delete the `css.worker` import if the language service is not restored. **Add a gate that can see it** — the reason this shipped is that no gate could.
2. **L-M4 / the SFC typecheck hole** — add `vue-tsc` to `check` and to CI. Every fix below is unverifiable until a `.vue` file can fail a build.
3. **L-B2 + L-M6** — give `debounce` a `cancel` handle (or use `@vueuse/core`'s `useDebounceFn`, already a dependency and scope-cleaned) and call it from the external-sync watch and from `onUnmounted`.
4. **L-M1 + L-M2 + L-M3 + L-m9** — one private `replaceContent()` seam: `pushEditOperations` instead of `setValue` (preserves undo), a focus/echo guard, and — for the format path only — an explicit `modelValue.value = formatted`. Then delete `KeyframesStringControls`'s `isFormatting` compensator.
5. **L-M5** — reset `monacoBoot = undefined` on rejection; `void initEditor().catch(...)` with a user-visible failure and a retry, matching `useKeyframeOps.withErrorToastAsync`.
6. **L-i4 / F-1** — declare `@mkbabb/glass-ui@7.0.0` and regenerate the lock. Per lane-frontend §10 this precedes any glass-ui work; it does not block 1–5.
7. Minors, cheapest first: L-m8 (drop the dep), L-m5 (narrow the cast), L-m4 (delete the dead expose), L-m2 (collapse the duplicate + kill the inert twin), L-m1, L-m7, L-m6, L-i1 (fix the stale comment **with** step 1), L-i3.

---

## Provenance

Every quoted line was read from the working tree at `/Users/mkbabb/Programming/keyframes.js` or from its `node_modules/` (monaco-editor 0.55.1, @vue/runtime-core, @mkbabb/glass-ui 7.0.0) — all read-only. Commands used: `Read`, `grep`, `sed`, `wc`, `ls`, `node -e` (JSON introspection of two local theme files), `git log`/`git show` (read-only), and one `npx tsc --listFilesOnly` (no emit, no writes). No file in keyframes.js, glass-ui, or value.js was written, mutated, installed, or served. No browser tooling was used; the single claim whose *visual* confirmation belongs to SS-13 is L-B1's rendered token colour, and it is marked there — its structural half is closed on source.
