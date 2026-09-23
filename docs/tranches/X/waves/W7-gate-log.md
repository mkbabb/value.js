SERVED MODEL: claude-opus-5-5[1m]

# X-W7 — Gate log (W7.md §8)

One entry per gate: command, RED output, GREEN output, timestamp. Dated 2026-09-23 (seat wall clock;
sitting of record 2026-09-17). Baselines are the open seat's (`execution/A/X-W7.md` §Baseline, HEAD
`e24361c6`), re-read at each unit before its cure. Units append their own gate sections below.

## Integration commit hashes

| unit | commit | meaning |
|---|---|---|
| a | `8360760b` | #1 `fix(palettes/checkbox)` — modelValue contract at both sites + G2 test |
| a | `3084e1fa` | #2 `build(demo/types)` — typed checkbox re-export + search-band inert `variant` cured; **strictTemplates WITHHELD** (ESC-W7a-G3) |
| a | `0e298ec5` | N-10 `fix(palettes/search)` — MiniColorPicker guarded capture + total release |

---

## G1 — Checkbox binding, zero occurrences (unit a)

⟨cmd⟩ `grep -rn "update:checked\|:checked=" demo/ --include='*.vue' | grep -v node_modules | wc -l`

- **RED (open, HEAD `e24361c6`)**: **4 lines / 2 files** — `SearchFilterBar.vue:52,53` · `TagEditPopover.vue:28,29`.
- **GREEN (2026-09-23, after `8360760b`)**: **0** (double-run: 0 · 0).
- **Falsifier**: re-introducing `:checked=` at `TagEditPopover.vue:28` makes the count 1 (exercised
  inside G3's falsifier below; reverted).

## G2 — Checkbox behaviour, real emit (unit a)

⟨cmd⟩ `npx vitest run demo/test/palettes/checkbox-contract.test.ts`

- **RED (open)**: file absent. Behavioural RED demonstrated by the falsifier: with the HEAD bindings
  restored into both SFCs → **`Tests  6 failed (6)`** (both initial-state cases and all four emit-ledger
  cases).
- **GREEN (after `8360760b`)**: **`Tests  6 passed (6)`**, double-run. Assertions: SearchFilterBar — prop
  `selectedTags=["warm"]` renders `warm` `data-state=checked` / `cool` `unchecked`; one click ⇒
  `update:selectedTags` ledger `[[["warm","cool"]]]` (tick) and `[[["cool"]]]` (untick). TagEditPopover —
  prop `currentTags=["warm"]` renders `aria-checked` `true`/`false`; one click ⇒ one `update:tags` and
  `saveTags` called **exactly once** with `("p-1", ["warm","cool"], undefined)` / `("p-1", ["cool"], undefined)`.
- Mount law: real SFCs against installed glass-ui **7.0.0**; `BROWSE_PORT_KEY` supplied (the two members
  the leaf reads), never a parent wrapper (fold R53).

## G3 — Template strictness (unit a) — **RED; ESC-W7a-G3 (W7.md §3a trigger)**

⟨cmd⟩ `grep -n "vueCompilerOptions\|strictTemplates" tsconfig*.json` → **no matches** (open and now: the
flag is NOT flipped over a red program — record F-1). Instrument: a scratch strict-probe
`{ "extends": "<repo>/tsconfig.demo.json", "vueCompilerOptions": { "strictTemplates": true } }`
(scratchpad, never committed) run as `npx vue-tsc -p <probe> --noEmit`.

| reading | EXIT | diagnostics / files | TS2353 | TS2322 | inside W7 bounds | outside |
|---|---|---|---|---|---|---|
| open seat (HEAD `e24361c6`) | 2 | 296 / 61 | 288 | 8 | 216 / 36 | 80 / 25 |
| after `8360760b` (#1) | 2 | 292 / 60 | 284 | 8 | — | — |
| after `3084e1fa` (#2) and `0e298ec5` (settled; double-run 290 · 290) | 2 | **290 / 60** | 282 | 8 | **210 / 35** | **80 / 25** |

Residual classes (TS2353 by unknown key, settled probe): `onClick` **100** · `aria-*` **56** · `variant` **37** ·
`data-*` **35** · `title` **14** · `tag` **13** · `surface` **12** · rest < 10 each. The dominant mass
(onClick / aria-* / data-* / title ≈ 205) is **attribute/listener fallthrough onto glass-ui components
whose `.d.ts` declares no fallthrough surface** — legitimate at runtime, rejected by strictTemplates'
unknown-prop/event checks, and not curable consumer-side without masking (a cast, a wrapper, or a
laundering `String(v)`); glass-ui is READ-ONLY. The inert-prop class G3 exists for (`variant` 37,
`tag` 13, `surface` 12, …) is the minority.

**Search band (unit a's writable set)**: 8 → **6** in-file (+1 `UserSortMenu.vue:8`, S-4-locked, NOT written):
- cured: `variant="ghost"` `SearchFilterBar.vue:5`, `:112`; `variant="outline"` `MiniColorPicker.vue:48` —
  deleted (no stylesheet keys on `[variant]`: demo 0, `glass-ui.css` 0 ⇒ null pixel delta; register intent →
  X-W10 per §0k.3 S-4's shape). `TagEditPopover.vue`: 2 → **0** (by `8360760b`).
- residual, producer-shaped: `SearchFilterBar.vue:5` `aria-label` on Button (surfaced once `variant` left —
  vue-tsc reports the first unknown key per element), `:89` TS2322 `v-model` on Input (glass-ui 7 `Input`
  emits `update:modelValue: string | number` for every `type`), `:93` `aria-label` / `:95` `onKeydown` on
  Input, `:114` `onClick` on Button; `MiniColorPicker.vue:50` `onClick` on Button.

**Mandatory falsifier (W7.md G3)** — `TagEditPopover.vue:28` mis-bound `:model-value` → `:checked`:
⟨cmd⟩ strict-probe → **EXIT 2**,
`demo/palettes/browser/search/TagEditPopover.vue(28,30): error TS2353: Object literal may only specify
known properties, and 'checked' does not exist in type '{ readonly modelValue?: CheckedState | null; …`;
⟨cmd⟩ `npx vue-tsc -p tsconfig.demo.json --noEmit` (flag off) → **EXIT 0** — the shipped gate is blind to the
same byte. Reverted (`git diff --stat` on the file → empty). The flag closes the class *when on*; it cannot
be turned on from inside W7's bounds.

**Disposition**: ESC-W7a-G3 returned to the orchestrator (§3a triumvirate: a producer-typed fallthrough
surface at glass 8 via relay, a narrower checker setting by ruling, or a wave that owns the 80 out-of-bounds
diagnostics — never decided at this seat).

## N-10 — Pointer capture guarded and always released (fold §R1.36; unit a)

⟨cmd⟩ `grep -c setPointerCapture` vs `grep -c "pointercancel\|lostpointercapture"` on `MiniColorPicker.vue`

- **RED (open)**: **2 vs 0** — two unguarded `(e.target).setPointerCapture` calls after the flag latched;
  no cancel/lost/dispose release.
- **GREEN (after `0e298ec5`)**: **1** capture call, inside `beginDrag`'s guard (the drag record is written only
  after it succeeds); **4** cancel/lost bindings (2 surfaces × 2) + pointerup; `endDrag` releases via
  `hasPointerCapture` → `releasePointerCapture`; `watch(open → false)` and `onScopeDispose` both end the drag.
- ⟨cmd⟩ `npx vitest run demo/test/palettes/mini-color-picker-capture.test.ts` → **`Tests  6 passed (6)`**,
  double-run. **Falsifier**: HEAD bytes restored → **`Tests  6 failed (6)`**; cured bytes restored → 6 passed.
