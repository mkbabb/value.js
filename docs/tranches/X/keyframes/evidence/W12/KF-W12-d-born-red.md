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

## 5. `vendor-monaco` re-measured AFTER the arm (appended at the arm commit)

*(appended below by the same seat after the arm commit)*
