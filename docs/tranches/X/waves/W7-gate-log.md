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
| b | `cb03d571` | #3 `refactor(palettes/export)` — serializers ship; `export.ts` deleted; one slug (G4/G5/G6) |
| b | `48668947` | #4 `fix(palettes/export)` — failure surfaced + 50-row disposition table (G7, N-15) |

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

## G4 — The certified serializers become the shipping path (unit b)

- **RED (HEAD `e24361c6`)**: ⟨cmd⟩ `grep -n 'from "./export"' demo/palettes/usePaletteExport.ts` → `:9 } from "./export";`
  (resolves to the FILE `export.ts`, which shadows the directory); ⟨cmd⟩ `grep -rln 'export/serializers"' demo` →
  **`demo/test/export/byte-exact.test.ts` only** — the certified tree's sole importer was its own test.
- **GREEN (after `cb03d571`)**: ⟨cmd⟩ `test -e demo/palettes/export.ts` → **absent**; ⟨cmd⟩ `grep -rn 'palettes/export"' demo | wc -l` → **0**;
  ⟨cmd⟩ `grep -rln 'export/serializers"' demo` → `demo/palettes/usePaletteExport.ts` (**product consumer**, the composable
  both palette panes call) + `demo/test/export/byte-exact.test.ts`; the composable's one import is `./export/serializers`.
  Double-run identical.
- **Falsifier**: import any serializer module past the barrel (or restore a legacy seat) and the census drops back to the
  test alone.

## G5 — Non-ASCII names survive export (unit b)

- **Ruling (once)**: the one slug is **NFKD transliteration + percent-safe fallback** — combining marks stripped
  (`Café` → `cafe`); a letter/number with no ASCII decomposition becomes the lowercase hex of its UTF-8 bytes (its
  percent-encoding without `%`), keeping the server grammar `^[a-z0-9][a-z0-9-]*$`; separators collapse, none leads/trails.
  Filenames stay `canonical.ts`'s stems (Appendix W51 §2 — display names never enter a filename): a release carries
  its slug, so the name's identity reaches the file through the slug.
- **RED**: legacy `export.ts:9` `slugify("日本 Blue")` → **`"blue"`**; survivor `utils.ts:3` → **`"-blue"`**; byte-exact
  test had **0** `日本` cases.
- **GREEN**: `slugify("日本 Blue")` → **`"e697a5e69cac-blue"`**; release palette `日本 Blue` (slug
  `e697a5e69cac-blue-0a1b2c3d`, r3) → filename **`e697a5e69cac-blue-0a1b2c3d--r3.json`**, `displayName` bytes equal
  `UTF8("日本 Blue")` at their offset. ⟨cmd⟩ `npx vitest run demo/test/export/byte-exact.test.ts` → **`Tests  31 passed (31)`** ×2.
- **Falsifier (run, reverted)**: the fallback replaced by `.replace(/[^a-z0-9]+/g, " ")` → **`Tests  2 failed | 29 passed (31)`**
  (both G5 cases); cured bytes restored → 31 passed.

## G6 — One slug implementation (unit b)

- **RED**: ⟨cmd⟩ `grep -rn "function slugify\|const slugify" demo | grep -v node_modules | wc -l` → **2** (`utils.ts:3`, `export.ts:9`).
- **GREEN**: → **1** ×2 — `demo/palettes/utils.ts:12`. S-6 read: *one, in `utils.ts`*; **0** under `export/`
  (`canonical.ts` is the shipped stem path).

## G7 — Failure is surfaced, not swallowed (unit b) — **table GREEN; visible surface HANDED to d (ESC-W7b-HOST)**

- **RED**: table absent; `usePaletteExport.ts:21-23` wrapped the whole switch in one `try` whose `catch` was
  `console.warn("Export failed:", e)`. ⟨cmd⟩ `git grep -n "console.warn" HEAD -- demo/palettes | wc -l` → **38**;
  real `catch` sites → **49** (both ×2 at `e24361c6`).
- **Table**: `docs/tranches/X/waves/W7-failure-dispositions.md` — **50 rows** (49 catch sites ∪ 1 non-catch warn;
  S-7's failure-path set), self-counted from the settled bytes ×2: SURFACE **46** · LOG-ONLY-BY-RULING **1** · DELETE **3**;
  CURED **3** · SURFACED **6** · KEPT **1** · OWED **40** (d **33**, routed **7**).
- **Runtime**: ⟨cmd⟩ `npx vitest run demo/test/palettes/palette-export.test.ts` → **`Tests  7 passed (7)`** ×2 — a
  `createObjectURL` throw resolves to `{ok:false, message:"Export failed: quota exceeded"}`, lands in the composable's
  `failure` ref, `console.warn` is never called, nothing downloads. **Falsifier (run, reverted)**: the channel stubbed
  (`failure.value = null`) → **`Tests  4 failed | 3 passed (7)`**; cured bytes restored → 7 passed.
- **Why not GREEN whole**: the `failure` ref reaches the user only when the host renders it, and both hosts
  (`BrowsePane.vue:115/324`, `PalettesPane.vue:106/221`) sit in unit **d**'s writable set, not b's (§4a disjointness).
  **ESC-W7b-HOST → d**: bind `onExport`'s `ExportOutcome` (or `failure`) to the card feedback rail
  (`cardRefs[…].showFeedback(message, "error")`, the rail publish/save/delete use) — or to the inspector when d moves
  export there — and add the mounted assertion that the message is rendered.

## N-15 — The export path is injection-safe, total, canonically named (fold §R1.36; unit b) — **GREEN**

- **RED (legacy bytes, `e24361c6`)**: `export.ts:74` interpolated `${palette.name}` raw into `<text>` and `:68`
  `${c.css}` raw into `fill`; a zero-colour palette produced a `width="0"` SVG and a null PNG blob (`:64`, `:93-100`);
  `slugify("!!! ???")` → `""` → the dotfile `.json`; `:130-131` revoked the URL in the click's own tick on a never-appended
  anchor; the `switch` had no default; every failure was `console.warn`-silent.
- **GREEN (after `48668947`)**, same test file: (1) name `</title><script>alert("x")</script>` → SVG carries it once,
  five-substitution escaped, **no `<script`**, exactly one `</title>`, fills in canonical `oklch(…)` spelling only;
  (2) zero colours → every format returns `"This palette has no colors to export."`, **0** blobs, **0** clicks;
  (3) a name that slugifies to empty → `palette-draft--local-7.json` / `k2-9f--r4.tailwind.json` — canonical stems,
  no dotfile, no `--palette--`. Plus: the PNG IHDR is **1200 × 240 at N = 1 and N = 50** (N-invariant).
