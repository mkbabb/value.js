SERVED MODEL: claude-fable-5-1

# KF.W12.d — G-KFW12-4 born-RED transcript + the Monaco contribution census + the `vendor-monaco` re-measurement

Unit **KF.W12.d (EDITOR-UNIT)** · keyframes.js base **`2cd314af`** (= `origin/master` at open) · 2026-09-19.

## 1. The gate's runtime clause at the base bytes — RED 4 of 4, each for its own defect's reason

The test file `test/demo/instrument/css-code-editor-seam.test.ts` was written BEFORE any cure and run against the base bytes (the file itself is this unit's create row; its stubs are the lane's module-seam idiom and its jsdom shims are symbols only — see the file's docblock).

⟨cmd⟩ `npx vitest run --project demo test/demo/instrument/css-code-editor-seam.test.ts` at `2cd314af` →

```
 ❯ |demo| test/demo/instrument/css-code-editor-seam.test.ts (4 tests | 4 failed) 577ms
     × (1) KF-CE-3: a Tab keydown on the focused input area is not swallowed 133ms
     × (2) KF-CE-1: the tokenizer the boot registered classifies `a { color: red }` 37ms
     × (3) KF-CE-2 child half: an external write cancels the pending debounced emit 378ms
     × (4) KF-CE-9 + KF-CE-37 + KF-CE-7: a rejected format is surfaced, the latch releases, a good format reaches the model 29ms

 FAIL … > (1) … AssertionError: expected true to be false   (tab.defaultPrevented — the editor swallowed Tab to indent)
 FAIL … > (2) … AssertionError: expected 0 to be greater than or equal to 2   (zero non-empty token classes — no tokenizer)
 FAIL … > (3) … AssertionError: expected [ 'a { color: red; }x' ] to not include 'a { color: red; }x'   (the stale emit landed after the external write)
 FAIL … > (4) … Error: CssSyntaxError: Unexpected }   (the rejection floated out of formatCSS; no boundary)

 Test Files  1 failed (1)
      Tests  4 failed (4)
```

Before the file existed the gate read `No test files found, exiting with code 1` (the record's baseline, double-run). Both readings are RED; the second is the one that names the defects.

The run also surfaced `TypeError: canvasCtx.beginPath is not a function` from monaco's overview ruler under the first (narrow) canvas shim — a HARNESS gap, not a subject; the shim was widened to a no-op Proxy context before commit 1's re-run. No assertion was touched.

## 2. After commit 1 (`7cda421c`, KF-CE-3)

⟨cmd⟩ same → `Tests 3 failed | 1 passed (4)` — **(1) GREEN**, (2)(3)(4) still RED. Byte clause ⟨cmd⟩ `grep -c 'tabFocusMode' demo/components/instrument/keyframes/CSSCodeEditor.vue` → **2 · 2** (was 0 · 0).

## 3. The Monaco contribution census at the installed 0.55.1 (read-only, `node_modules` never patched)

- `esm/vs/editor/editor.api.js` (227 B) = `import './internal/initialize.js'` + a re-export of `editor.api2.js`, which builds the API from `editorBaseApi` + `standaloneEditor` + `standaloneLanguages` + `contrib/format/browser/format.js` — **no `contrib/*` beyond format, no `basic-languages/*`, no `language/*` service**.
- `esm/vs/basic-languages/css/css.contribution.js` = `registerLanguage({ id: "css", … loader: () => import('./css.js') })` through `_.contribution.js`, whose first 55 lines import `coreCommands`, `codeEditorWidget`, `diffEditor.contribution`, and the contrib set (`anchorSelect · bracketMatching · caretOperations · clipboard · codeAction · codelens · colorPicker · comment · contextmenu · cursorUndo · dnd · dropOrPasteInto · find · folding · fontZoom …`). **That is the killed-register #3 path**: the cheap `css.contribution` import drags the contribution set back — the saving does not survive.
- `esm/vs/basic-languages/css/css.js` (6,100 B): ⟨cmd⟩ `grep -n '^import\|^export' …/css.js` → **`184:export { conf, language };` only — ZERO imports.** It is pure data: the language configuration (`comments`, `brackets`, `autoClosingPairs`, `surroundingPairs`, `folding.markers`) and the Monarch `language` definition (`tokenPostfix: ".css"`, states `selector · selectorbody · rulevalue · term · numbers · units · strings · comments …`, token classes `tag · attribute.name · attribute.value · attribute.value.number · attribute.value.unit · attribute.value.hex · keyword · delimiter · delimiter.bracket · comment · string`).
- `esm/vs/editor/standalone/browser/standaloneLanguages.js`: ⟨cmd⟩ `grep -n 'function setMonarchTokensProvider\|function setLanguageConfiguration\|function register('` → `:24 register` · `:81 setLanguageConfiguration` · `:290 setMonarchTokensProvider`, all exported through `createMonacoLanguagesAPI` (`:533`, `:540`) — **already inside the `editor.api` closure**, with the Monarch compiler they import.
- The two `?worker` entries: `css.worker` (1,054,628 B emitted) serves the css language SERVICE, which the `editor.api` boot never registers — under arm (b) the `label === "css"` arm is dead by construction (KF-CE-15) and the worker is deletable.

## 4. `vendor-monaco` re-measured at the base bytes (never re-cited from U.D5)

⟨cmd⟩ `npm run gh-pages` at `2cd314af` (exit 0) → ⟨cmd⟩ `stat -f %z dist/gh-pages/assets/vendor-monaco-*.js` →

| asset (base `2cd314af`) | bytes |
|---|---|
| `vendor-monaco-KpxjghV2.js` | **2,525,021** (gzip 639,962) |
| `vendor-monaco-C5uazxST.css` | 74,442 |
| `css.worker-CvXBzhp8.js` | **1,054,628** |
| `editor.worker-Cn2oRESe.js` | 279,948 |

(U.D5's "4.18 → 2.53 MB" was a different build, a different rolldown, a different chunk policy; this table is the like-for-like BEFORE. The AFTER is appended below once the arm's byte lands.)

## 5. `vendor-monaco` re-measured AFTER the arm — the bytes were in the tree, built, measured, then TAKEN BACK OUT (see §6)

⟨cmd⟩ `npm run gh-pages` with the arm (b) hunk applied over `7cda421c` (exit 0) → ⟨cmd⟩ `stat -f %z …` →

| asset | BEFORE (`2cd314af`) | AFTER (arm b) | delta |
|---|---|---|---|
| `vendor-monaco-*.js` | 2,525,021 (gzip 639,962) | **2,529,276** (gzip 641,405) | **+4,255 B** (+1,443 gzip) — the Monarch css grammar |
| `css.worker-*.js` | 1,054,628 | **— (not emitted)** | **−1,054,628 B** — the css language service worker, dead under (b), deleted with its `label === "css"` arm |
| `editor.worker-*.js` | 279,948 | 279,948 | 0 |
| js assets | 43 | 42 | −1 |

U.D6 clause re-run over the AFTER build: entry `index-CtnlLTaV.js` → `grep -c vendor-monaco` **0**; forbidden `html|json|ts` workers **0**. (The `proof:publish` family barrel itself fails EARLIER, in `published-surface.mjs`, on rows unrelated to this unit — README/agent-surface — so the U.D6 clause was executed by hand with the barrel's own two predicates.)

**Net: the editor chunk grows by 4 KB and the lazily fetched worker bytes fall by 1 MB.** Arm (a) was not built (not chosen); its cost is the contribution set the census in §3 names, and it is not re-cited from U.D5.

## 6. The arm's byte could not LAND under §0u — ESCALATION E-d1, with the exact hunk preserved

With the hunk in the tree ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json 2>&1 | grep 'error TS'` gains exactly one row:

```
demo/components/instrument/keyframes/CSSCodeEditor.vue(94,16): error TS7016: Could not find a declaration file for module 'monaco-editor/esm/vs/basic-languages/css/css.js'. '…/node_modules/monaco-editor/esm/vs/basic-languages/css/css.js' implicitly has an 'any' type.
```

(wave total 16 → **17**). Cause, at the installed bytes: ⟨cmd⟩ `ls node_modules/monaco-editor/esm/vs/basic-languages/css/` → `css.contribution.d.ts · css.contribution.js · css.js` — monaco ships **no `css.d.ts`** beside the grammar (its `css.contribution.d.ts` is `export {}`), and the package's `exports` wildcard `"./*": "./*"` carries no types condition, so TypeScript has nothing to resolve the specifier to. Runtime is unaffected (G-KFW12-4 case (2) read GREEN with the hunk in place — 4 non-empty token classes for `a { color: red }`: `tag.css · delimiter.bracket.css · attribute.name.css · attribute.value.css`).

The lawful cures and why none is inside this unit's set: the ambient declaration
```ts
declare module "monaco-editor/esm/vs/basic-languages/css/css.js" {
    import type { languages } from "monaco-editor/esm/vs/editor/editor.api.js";
    export const conf: languages.LanguageConfiguration;
    export const language: languages.IMonarchLanguage;
}
```
belongs in **`demo/env.d.ts`** (the demo's ambient-shim home — it already declares `*.vue` and `*.svg?component`), which is NOT a §B.2 row of this wave; `tsconfig.json` (`allowJs`) is likewise out of bounds; a `.d.ts` created beside the SFC is a new file outside the set; `@ts-expect-error`, an `as` widening of the import, or a non-literal specifier that hides the module from TypeScript are each REFUSED as cures by §0u's own words (and the last would also break Rolldown's chunking). Arm (a) does not escape it either — the `css.contribution.js` route drags the contribution set (killed #3) and its `.d.ts` declares nothing.

**Disposition**: the hunk is NOT committed; the working tree was returned to `7cda421c`'s bytes for this file (this seat's own uncommitted edit, no sibling's — `git checkout -- <path>`, receipted) so the shared checkout never reads 17; the unit proceeds with every row that does not need the tokenizer; **E-d1 is returned for a one-line grant** (the five-line declaration in `demo/env.d.ts`, or the orchestrator's KF-WRITE), after which the hunk below lands verbatim as `feat(kf/editor · X.KF.W12.d · KF-CE-1/4 arm (b) …)` and case (2) turns GREEN. The hunk, byte-exact (`git diff` over `7cda421c`):

```diff

diff --git a/demo/components/instrument/keyframes/CSSCodeEditor.vue b/demo/components/instrument/keyframes/CSSCodeEditor.vue
index f8c3f518..0504387b 100644
--- a/demo/components/instrument/keyframes/CSSCodeEditor.vue
+++ b/demo/components/instrument/keyframes/CSSCodeEditor.vue
@@ -29,27 +29,33 @@
 <script setup lang="ts">
 import { onMounted, onUnmounted, useTemplateRef, watch } from "vue";
 import { useResizeObserver } from "@vueuse/core";
-// Monaco (the ~4 MB editor namespace) is the demo's single largest module. A
-// static `import * as monaco` here pulled it onto the eager graph of EVERY scene
+// Monaco is the demo's single largest module (`vendor-monaco`, ~2.5 MB
+// minified at the `editor.api` surface this boot loads). A static
+// `import * as monaco` here pulled it onto the eager graph of EVERY scene
 // chunk that reaches CSSCodeEditor (the Spring sidebar imports it statically),
 // so a scene's first paint paid Monaco's bytes before any editor mounted — the
 // spring-mobile LCP outlier (E.W4 S1). Everything that statically links the
-// `vendor-monaco` chunk is now DYNAMIC, resolved once at first editor mount:
-//   • the namespace `import("monaco-editor")`, AND
-//   • the two `?worker` entry-points — a STATIC `?worker` import still emits a
-//     tiny worker-proxy edge INTO `vendor-monaco`, so a static worker import
-//     re-eagerizes the chunk it is meant to defer. Importing the `?worker`
-//     modules dynamically (inside the same boot) keeps that edge off every
-//     scene's initial graph.
+// `vendor-monaco` chunk is DYNAMIC, resolved once at first editor mount:
+//   • the API namespace and the language definition, in `bootMonaco`, AND
+//   • the `?worker` entry-point, inside `getWorker` — a STATIC `?worker`
+//     import still emits a tiny worker-proxy edge INTO `vendor-monaco`, so a
+//     static worker import re-eagerizes the chunk it is meant to defer, and
+//     an import AWAITED in the boot serializes a fetch monaco does not need
+//     at `create` ahead of first mount (KF-CE-39). `getWorker` may return a
+//     `Promise<Worker>`, so the worker's chunk is fetched the first time
+//     monaco asks for one, and never before.
 // Vite splits each behind the editor-mount boundary, so a non-editor scene never
-// loads `vendor-monaco`. The editor is byte-identical once mounted — only the
-// eager load of a not-yet-visible editor disappears. The TYPE side stays static
-// (`import type`) — erased under `verbatimModuleSyntax`, no runtime edge.
+// loads `vendor-monaco`. The TYPE side stays static (`import type`) — erased
+// under `verbatimModuleSyntax`, no runtime edge; this ROOT type import is also
+// what types `self.MonacoEnvironment`, so it is not deletable.
 import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api.js";
 // Theme JSONs are vendored locally: monaco-themes@0.4.x only exports `.` and
 // `./dist/monaco-themes.js` in its `exports` field, so `monaco-themes/themes/*`
 // is not resolvable under the strict bundler (Vite 8 / Rolldown). These two
-// small theme definitions live alongside this editor instead.
+// small theme definitions live alongside this editor instead. Their `base` is
+// a JSON string where monaco wants the `BuiltinTheme` literal union; the
+// narrow cast at `defineTheme` is exactly that widening and nothing else
+// (KF-CE-29 — with the specifier resolving, the cast is load-bearing).
 import DarkTheme from "./monaco-themes/Dracula.json";
 import LightTheme from "./monaco-themes/GitHub.json";
 import { Card } from "@mkbabb/glass-ui/card";
@@ -63,31 +69,53 @@ import { toast } from "vue-sonner";
 // The resolved Monaco namespace + a single in-flight boot promise. The boot is
 // idempotent and module-scoped: the FIRST editor to mount loads + configures
 // Monaco once (worker env, themes, the `css` language), every later editor
-// awaits the same settled promise — no double-register, no second 4 MB fetch.
+// awaits the same settled promise — no double-register, no second fetch.
+//
+// THE LANGUAGE (KF-CE-1 / KF-CE-4, arm (b) — decided in the wave record before
+// this byte): `editor.api` registers NO language, NO tokenizer and NONE of the
+// editor contributions (find, context menu, comment toggle, folding, bracket
+// matching, multicursor, hover — the ~110-module set `_.contribution.js`
+// would drag back along with the css language SERVICE and its 1 MB worker).
+// This boot hand-registers monaco's OWN css grammar — `basic-languages/css/
+// css.js`, a zero-import data module: the Monarch tokenizer that colours the
+// buffer through the vendored themes' token rules, and the language
+// configuration (comments, brackets, auto-closing and surrounding pairs) the
+// core editor reads. The contributions stay ABSENT, by decision: this is a
+// short-snippet keyframes editor, the keyboard trap is cured by option
+// (`tabFocusMode`), and the bytes those affordances cost were measured and
+// declined. No css language service runs, so no css worker is ever
+// requested; the one worker monaco does ask for is the base editor worker.
 let monaco: typeof Monaco | undefined;
 let monacoBoot: Promise<typeof Monaco> | undefined;
 
 function bootMonaco(): Promise<typeof Monaco> {
     return (monacoBoot ??= Promise.all([
         import("monaco-editor/esm/vs/editor/editor.api.js"),
-        // Each `?worker` virtual module default-exports a Worker constructor; a
-        // dynamic import keeps its monaco-proxy edge off the eager scene graph.
-        import("monaco-editor/esm/vs/editor/editor.worker?worker"),
-        import("monaco-editor/esm/vs/language/css/css.worker?worker"),
-    ]).then(([m, editorWorker, cssWorker]) => {
-        const EditorWorker = editorWorker.default;
-        const CSSWorker = cssWorker.default;
+        import("monaco-editor/esm/vs/basic-languages/css/css.js"),
+    ]).then(([m, css]) => {
         self.MonacoEnvironment = {
-            getWorker(_workerId: string, label: string) {
-                if (label === "css" || label === "scss" || label === "less") {
-                    return new CSSWorker();
-                }
+            async getWorker() {
+                // Each `?worker` virtual module default-exports a Worker
+                // constructor; imported here, on first request, its
+                // monaco-proxy edge stays off every scene's initial graph AND
+                // off the boot's critical path.
+                const { default: EditorWorker } = await import(
+                    "monaco-editor/esm/vs/editor/editor.worker?worker"
+                );
                 return new EditorWorker();
             },
         };
-        m.editor.defineTheme("dark-theme", DarkTheme as any);
-        m.editor.defineTheme("light-theme", LightTheme as any);
+        m.editor.defineTheme(
+            "dark-theme",
+            DarkTheme as Monaco.editor.IStandaloneThemeData,
+        );
+        m.editor.defineTheme(
+            "light-theme",
+            LightTheme as Monaco.editor.IStandaloneThemeData,
+        );
         m.languages.register({ id: "css" });
+        m.languages.setLanguageConfiguration("css", css.conf);
+        m.languages.setMonarchTokensProvider("css", css.language);
         monaco = m;
         return m;
     }));
```
