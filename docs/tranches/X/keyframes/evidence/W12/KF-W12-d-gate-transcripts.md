SERVED MODEL: claude-fable-5-1

# KF.W12.d — G-KFW12-4 readings at the unit head, double-run

Unit **KF.W12.d (EDITOR-UNIT)** · base `2cd314af` → head **`ec49bbef`** · 2026-09-19 · all commands from `/Users/mkbabb/Programming/keyframes.js`.

## Runtime clause — ⟨cmd⟩ `npx vitest run --project demo test/demo/instrument/css-code-editor-seam.test.ts`

| clock | reading |
|---|---|
| base `2cd314af`, before the file existed | `No test files found, exiting with code 1` (the record's baseline) |
| base `2cd314af`, the file written first | **`4 failed (4)`** — (1) `expected true to be false` · (2) `expected 0 to be >= 2` · (3) `expected ['a { color: red; }x'] to not include …` · (4) `Error: CssSyntaxError: Unexpected }` (see `KF-W12-d-born-red.md` §1) |
| after `7cda421c` (KF-CE-3) | `3 failed \| 1 passed (4)` — (1) GREEN |
| after `850b62a9` (the seam) | `2 failed \| 2 passed (4)` — (1)(3) GREEN |
| after `b6914c36` (the boundary) | `1 failed \| 3 passed (4)` — (1)(3)(4) GREEN |
| with the arm (b) hunk in the tree (built, measured, then taken back out — E-d1) | (2) GREEN: `tag.css · delimiter.bracket.css · attribute.name.css · attribute.value.css` |
| **head `ec49bbef`, run 1** | `× (2) KF-CE-1 … 29ms` · **`Tests 1 failed \| 3 passed (4)`** |
| **head `ec49bbef`, run 2** | `× (2) KF-CE-1 … 27ms` · **`Tests 1 failed \| 3 passed (4)`** |

The one RED is the tokenizer clause, whose cure is the escalated arm; its assertion `expected 0 to be greater than or equal to 2` is the defect's own reading and was not weakened.

## Byte clauses — double-run at `ec49bbef`

| clause | base | head (run 1 · run 2) | note |
|---|---|---|---|
| `grep -c 'tabFocusMode' …/CSSCodeEditor.vue` | 0 · 0 | **2 · 2** | must read ≥ 1 — GREEN |
| `grep -c 'isFormatting' …/KeyframesStringControls.vue` | 4 · 4 | **6 · 6** | recorded; the acceptance is the runtime clause (case (4)) |
| `grep -c 'accessibilitySupport' …/CSSCodeEditor.vue` | 1 · 1 | 1 · 1 | the OPTION is gone (KF-CE-5); the one hit is the comment that names it |
| `grep -c 'setValue' …/CSSCodeEditor.vue` | 3 (calls) | 2 · 2 | both hits are comments; zero calls (KF-CE-6 / KF-CE-31) |
| `grep -c 'Ï' …/KeyframesStringControls.vue` | 1 (the literal) | 2 · 2 | both hits are the KF-CE-35 comment; the literal is gone |
| `grep -c 'css.worker' …/CSSCodeEditor.vue` | 1 | 1 · 1 | UNMOVED — the import lives in the escalated arm hunk (KF-CE-15) |

## §0u ratchet — ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json 2>&1 | grep -c 'error TS'`

| clock | total | inside this unit's rows |
|---|---|---|
| open (`2cd314af`) | **16 · 16** | 2 — `KeyframesStringControls.vue(54,9)` · `(75,5)`, both `.e`'s |
| with the arm hunk in the tree | 17 (the TS7016 at the `css.js` import) — **NOT landed** | +1 → the hunk was taken out |
| head (`ec49bbef`) | **15 · 15** (the total moved under `.c`'s concurrent work in the same checkout) | 2 — the same two, now at `(55,9)` · `(76,5)` (shifted by this unit's docblock; untouched; `.e`'s) |

No `as`, `@ts-expect-error` or `eslint-disable` written as a cure: ⟨cmd⟩ `git diff 2cd314af..HEAD -- <the four product files> | grep -c '@ts-expect-error\|eslint-disable\|as any'` → **0**. ⟨cmd⟩ `npx tsc --noEmit -p tsconfig.test.json 2>&1 | grep -c css-code-editor-seam` → **0** (after `ec49bbef`).

## Suite, lint, skip census

⟨cmd⟩ `npm run test:demo` → `Test Files 2 failed | 50 passed (52)` · `Tests 2 failed | 436 passed (438)`, **twice**. The two failures: `spring-trace-truth.test.ts (4b)` — KF.W11's inherited honest-RED (KF11-E(j1)), unmoved, not this unit's; and this unit's case (2) — the escalated arm. The denominator grew by exactly this unit's one file (51 → 52 counting `.c`'s concurrent file).
⟨cmd⟩ `git diff 2cd314af..HEAD -- test | grep -c 'test.skip\|it.skip\|\.only('` → **0** (a docblock had spelled the literal; reworded at `ec49bbef` before it could read as a false hit). `value4-editor-boundary.test.ts` not touched, timeout NOT widened.
⟨cmd⟩ `npx eslint` over the unit's four product files and its test → clean. ⟨cmd⟩ `git diff --check` per commit → clean.

## Bounds audit — ⟨cmd⟩ `git show --stat` over the seven `X.KF.W12.d` commits

`demo/components/instrument/keyframes/CSSCodeEditor.vue` · `demo/utils/helpers.ts` · `demo/components/instrument/keyframes/KeyframesStringControls.vue` · `demo/components/instrument/transport/controls-pane/RibbonBar.vue` · `test/demo/instrument/css-code-editor-seam.test.ts` — **every path inside the writable set; zero `src/**`, zero `node_modules`, zero glass-ui, zero theme JSON (arm (b) — the conditional row was not opened), `scripts/dev/dev.sh` never staged.** `.c`'s dirty rows (`KeyframesEditor.vue`, `useHighlightCSS.ts`, `useKeyframeBrushApply.ts`, its untracked test) were present throughout and never staged by any pathspec of this unit.
