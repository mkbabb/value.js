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
| c | `8e023125` | N-13 `fix(palettes/card)` — reduced-motion disclosure completes |
| c | `94e06196` | N-5 `fix(palettes/card)` — swatch keys are identities |
| c | `e7b4d894` | N-11 `fix(palettes/card)` — every card copy verb reaches its verdict |
| c | `9250dd19` | #5 `feat(palettes/specimen)` — PaletteSpecimen; priority-collapse meta; +N chip; strip (G8 · G9 · G12) |
| c | `877710a2` | #7 `fix(palettes/card)` — cast follows silhouette; hover at root (G11 root half) |
| c | `76a4d1cf` | #6 `test(palettes/n-fixtures)` — the arbitrary-N battery (G8 · G9 · G10 · N-13) |
| d | `e3f3d781` | S-5 docs act — `W7-bounds-addendum-2026-09-23.md` (PaletteCard.vue gains `delete`; B-1..B-6 homing) |
| d | `c1304cb6` | #8 `refactor(palettes/inspector)` — one owner, one verdict; DAG rows 1/3/6; N-2 · N-3 · N-4 · N-16; pre-flight; MMD-2 |
| d | `eb2fae61` | N-8 `fix(palettes/types)` — client DTOs mirror the server formatters |
| d | `f5b13794` | #8 (cont.) — one call site for the admin palette delete and the publish (G13) |
| d | `5110332c` | G13 table + `w7-mutation-visibility` oracle + pre-flight battery |
| d | `52117566` | N-7 store half — `movePalette` |
| d | `1d4d375b` | G7 host row (ESC-W7b-HOST) + the measured early-return count |
| e | `73fd8ccf` | `test(palettes/reorder)` — N-7 fixtures satisfy `Palette` (demo-leg TS2352 ×2 → 0) |
| e | `4cb3d486` | #9 `fix(palettes/admin)` — deliberate dismissal ×5 seats; N-6 take-before-run; S-14(b); G15 · S-15 naming |
| e | `4060ce38` | G14 · N-6 · S-14 browser oracle `w7-destructive-seats` + G13 rows re-ruled onto the confirms |

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

## G9 — Meta row does not overflow inside the legal bound (unit c) — **GREEN**

⟨cmd⟩ `npx vitest run demo/test/palettes/palette-card-layout.test.ts` (Playwright Chromium, 390×844)

**Instrument** (unit c; the pre-cure capture ran on it before any cure byte was committed):
`demo/test/palettes/n-fixtures/harness/` serves every fixture case as a real `PaletteCard`, all inside ONE
shipped `PaletteCardGrid`, through the repo's own `vite.config.ts` (dev mode: the demo's PostCSS/Tailwind
pipeline and the three shipped sheets). jsdom has no layout (`scrollWidth` reads 0), so a jsdom G9 is vacuous.

**Sharpening recorded (R.2)**: the grid is `grid-cols-1` = `minmax(auto, 1fr)`; a card that cannot shrink can
WIDEN its column, where `card.scrollWidth <= card.clientWidth` passes vacuously. The gate asserts all four:
card `scrollWidth <= clientWidth`, card width `<=` its grid column, `documentElement.scrollWidth <=` viewport,
name rendered width `> 0`.

- **RED — pre-cure (HEAD `8bd15c1b` card bytes, fixture `g9`: 3 tags × 30 chars + featured + fork +
  4–5-digit counts — a legal payload)**, double-run identical (`PRE {…}` × 2):
  `card clientWidth 354 · scrollWidth 941 · grid 358 · name width 0` → **overflow 941 − 354 = 587 px**; the
  name collapses to zero. Heights across 7 fixture cases: **{100, 125}** (the height law also broken).
- **GREEN (2026-09-23, after `9250dd19` + `877710a2`)**: `g9` → scrollWidth 354 = clientWidth 354, card 358 ≤
  grid 358, doc 390 ≤ 390, name width **93 px** (> 0); suite double-run 6/6 · 6/6.
- **Falsifier (run, reverted)**: strip the specimen head's clip + yield rules and set the name `flex: 0 0 auto`
  → G9 and G10 RED: `expected 522 to be less than or equal to 354`.
- Note (S-9(b)): the chips no longer carry `shrink-0` inside an unclipped row; the compaction G17 adds (unit f)
  lands on this same surface.
  Height law (14 cases, double-run): **{95}** — one height.

## G8 — Tag truth (unit c) — **GREEN**

⟨cmd⟩ `npx vitest run demo/test/palettes/n-fixtures/` (the tag block asserts at N_tags ∈ {0,1,2,3,10,11}, which
covers the spec's 4-and-10 cells by the ledger's own boundaries)

- **RED (open)**: `PaletteCardMeta.vue:37` `v-for="tag in (palette.tags ?? []).slice(0, 3)"` — tags 4–10 rendered
  nowhere (no `+N`, no tooltip).
- **GREEN (after `9250dd19`)**: at every N_tags the chips render the leading tags in order with full titles, one
  `+N` label per declared band (`+n−min(k,n)`), and the `+N` chip's popover reveals the **whole** set (reachable
  set == fixture set). ⟨cmd⟩ `grep -rn "slice(0, *[35])" demo/palettes` → 1 line, `AdminFlaggedPanel.vue:54`
  (colours, the sibling instance — outside unit c's bounds; handed to d/e).
- **Falsifier**: reintroduce a bare slice → the popover's revealed set loses a named tag → the equality fails.

## G10 — The N-fixture battery (unit c) — **GREEN**

⟨cmd⟩ `npx vitest run demo/test/palettes/n-fixtures/` → **21/21** (double-run 21 · 21); layout half in
`palette-card-layout.test.ts` → 6/6 (double-run).

- **RED (open)**: dir ABSENT; census: tags drop at N ≥ 4; colours clip at N > 200 (`Math.max(100/n, 0.5)`,
  201 × 0.5% = 100.5%); weight floor renormalised away (PCS-1).
- **GREEN**: displayed colour count == N at 0,1,2,5,50,200,201; one band per colour below N = 100 (flex share,
  no % width), a summary gradient carrying all N colours at N ≥ 100; 8% floor a real min size; every tag reachable;
  PNG 1200×240 at N = 1..50, loud refusal (`snapshot_empty` / `snapshot_over_cap`) outside; no fixture overflows;
  one card height across the set.

## G11 — Shadow silhouette and hover register (unit c) — **root half GREEN · golden half ESCALATED (F-3)**

- **Measured at open**: `.cartoon-cast` and `.cartoon-surface` match **no served rule** — glass-ui 7 ships
  `.cartoon-cast` only in `dist/styles/glass/glass-atom.css`, reached by neither the `./styles` entry
  (`dist/styles/index.css` → `glass.css` import list) nor the exports map; `--card-press-t` had no reader.
- **Cure (`877710a2`)**: the root takes the producer's `.shadow-cartoon-md` stamp (box-shadow follows
  border-radius); the dead span dies; the strip takes the inner radius; hover = translate 0 −2px +
  `--shadow-cartoon-lg`, hover-capable pointers only, PRM drops the travel.
- **Root half** ⟨cmd⟩ `palette-card-layout.test.ts` G11 case → GREEN (root box-shadow ≠ none, radius > 0,
  0 `.cartoon-cast` children, hover changes shadow and translate).
- **Golden half**: `e2e/visual/` has no PaletteCard rest/hover cell (F-3) and is Do-NOT-touch → **ESC-W7c-G11**.

## G12 — Specimen purity (unit c) — **GREEN**

⟨cmd⟩ `npx vitest run demo/test/palettes/palette-specimen.test.ts` → 4/4 (double-run).

- **RED (open)**: component ABSENT.
- **GREEN (after `9250dd19`)**: transitive import closure excludes ports/actions/store/export/transport;
  0 interactive descendants at the richest fixture; no emits; the card renders through it.
- **Falsifiers (run, reverted)**: a `<button>` in the name row → "mounts with zero interactive descendants" RED;
  a `usePalettePorts` import → "imports no port…" RED.

## N-5 — Identity keys, the `useSwatchActions` site (unit c) — **GREEN at unit c's site**

⟨cmd⟩ `grep -rn '::\${i}\|:key="[^"]*index' demo/ --include='*.vue' --include='*.ts' | wc -l`

- **RED (open)**: **7** (useSwatchActions 2 · MixSourceSelector 2 · ColorNutritionLabel 2 · GradientEasingEditor 1).
- **After `94e06196`**: **5** — unit c's 2 cured; `MixSourceSelector` is X.W7.f's (the fold's two-site lock);
  the other two sit outside W7's bounds.
- **Removal test** ⟨cmd⟩ `npx vitest run demo/test/palettes/swatch-identity-keys.test.ts` → 3/3; on the prior
  bytes 3/3 RED (survivor nodes replaced).

## N-7 — Drag order integrity — **RED, handed to X.W7.d (ESC-W7c-N7)**

The cure seat is `PalettesPane.vue:193-206` (`useSortable(sortableEl, pm.filteredSaved.value, …)` + `onEnd`
index splice over the FILTERED list) and `usePaletteStore.ts:153-167` (`reorderPalettes` appends unlisted
palettes en bloc) — both X.W7.d's writable set, not unit c's. No born-RED test was committed (a red suite would
break the §7 cadence); the gate and its named-addition rider travel with the cure to d.

## N-11 — No fallible copy discards its `CopyResult`, card sites (unit c) — **GREEN at the card sites**

⟨cmd⟩ `grep -rn "void writeClipboard" demo/palettes/browser/card | wc -l` → **0** (open: 3 + 1 bare call).
⟨cmd⟩ `npx vitest run demo/test/palettes/copy-verdict.test.ts` → 5/5 (census + rejected/accepted verdicts).
Repo-wide residue (outside unit c): ⟨cmd⟩ `grep -rn "void writeClipboard" demo/ | wc -l` → **7**.

## N-13 — The reduced-motion transition completes (unit c) — **GREEN**

⟨cmd⟩ `palette-card-layout.test.ts` N-13 cases (PRM emulated in Chromium).
- **RED on the prior bytes** (run before `8e023125` landed): expand OK, collapse never completes —
  `expected 1 to be +0` after 2 s.
- **GREEN**: PRM collapse removes the swatch subtree; the animated collapse still completes.

---

## X.W7.d — gate sections (seat `claude-opus-5-5[1m]`, 2026-09-23, opened at HEAD `23e7fcb0`)

### G13 — One owner per mutation, one visible result — **GREEN over the 11 rows it can reach; 3 OWED-ORACLE · 6 ROUTED named**

- **RED (open)**: `W7-mutation-ownership.md` ABSENT; no `w7-*` oracle. Call-site census ⟨cmd⟩
  `grep -rln "\bdeletePaletteAdmin(" demo | grep -v palettes/api/` → `useAdminFlagged.ts` · `useAdminUsers.ts` (**2**);
  `createAndSavePalette(` → `usePaletteActions.ts` · `useSlugMigration.ts` (**2**). DAG rows 1/3/6 live (feature error
  `console.warn`-only; the expanded list lived in the panel and no refresh reached it; admin cards rendered the full
  `PaletteCardMenu`).
- **GREEN**: the table — **20 rows**, one call site each (both doubles → **1** at `f5b13794`), self-counted ×2:
  GREEN **11** · OWED-ORACLE **3** · ROUTED **6**. Unit rows ⟨cmd⟩ `npx vitest run demo/test/palettes/admin-crud.test.ts`
  → **`Tests  12 passed (12)`** ×2. Browser rows ⟨cmd⟩ `npx playwright test --project=smoke
  e2e/smoke/oracles/w7-mutation-visibility.spec.ts` → **13 passed** ×2 (12 at `5110332c`, +1 G7-host row).
- **Falsifiers (run, reverted, bytes `cmp`-restored)**: verdict silenced (`useAdminNotice.settle` returns early) →
  oracle **7 failed** (every admin row); the refresh re-read deleted → unit `row 3` **fails**.
- **Not claimed**: DAG row 2 (server-side `$lookup` with no `deletedAt` predicate — `api/**`, ESCALATED); the
  selected-entity inspector (ESC-W7d-INSPECTOR, record).

### G7 — host half (ESC-W7b-HOST, from unit b) — **GREEN**

Both hosts render the composable's `ExportOutcome` on the card feedback rail (`BrowsePane.vue` / `PalettesPane.vue`
`onExport`). Browser row ⟨oracle `library rows › export failure`⟩: a 0-colour palette's JSON export shows
"This palette has no colors to export." in a `role="status"` → **1 passed**. Falsifier: the host's `showFeedback`
skipped → **1 failed**; restored → passed.

### N-2 — Auth ≠ empty across all five admin panels — **GREEN (the pane-side half of S-6's seam)**

- **RED**: ⟨cmd⟩ `git show 23e7fcb0:demo/palettes/<f>.ts | grep -c "if (!token"` over the five composables → users 10 ·
  names 5 · flagged 3 · tags 3 · audit 1 = **22** (X-W3's record says 21; the 22nd is `createTagAction`'s compound
  guard) — every one before any state write; after: **0** outside `adminCall`'s own guard. The triple
  `(false, null, [])` painted each panel's TRUE-EMPTY plate. S-6: X-W3's route guard (`router/guards.ts`) closes
  NAVIGATION only; this is the pane half — neither wave reports the identity closed alone.
- **GREEN**: one seam (`api/admin-call.ts`: `adminCall` · `useAdminAccess`); five panels render
  `[data-admin-access="signed-out"]`, no empty-species fact, **0** operable controls, **0** requests; a server 401 on a
  held token lands in the same register (not "unreachable"). ⟨cmd⟩ `admin-crud.test.ts -t N-2` → **6 passed**. Reader
  census ⟨cmd⟩ `grep -rn "meta.admin" demo/color-picker/router/guards.ts` → 1 reader (X-W3's).
- **Falsifier**: the access register ignores the token (`computed(() => denial.value)`) → **all 6 N-2 cases fail**
  (the failure also cascades through the file's later cases — recorded, not hidden).

### N-3 — Prune scope — **GREEN**

`emptyUserCount` reads the UNFILTERED roster; the confirm names the server-global scope ("every user with 0
palettes on the server … not only the users shown here. 2 of the 3 loaded users are empty"). ⟨cmd⟩ `-t N-3` → passed
×2. Falsifier: count over `filteredAdminUsers` → **1 failed**.

### N-4 — One `searchQuery` per domain, reset on route change — **GREEN**

- **RED**: ⟨cmd⟩ `grep -rn "searchQuery" demo/palettes/ | grep -c '= ""'` → **0**; one ref aliased into four ports.
- **GREEN**: four refs (`librarySearch` · `browseSearch` · `adminUsersSearch` · `adminNamesSearch`), distinct-ref
  census **4**, typing in one filters no other, a `currentView` change resets all four. ⟨cmd⟩ `-t N-4` → passed ×2;
  ⟨cmd⟩ `grep -c '\.value = ""' demo/palettes/usePalettePorts.ts` → **4**.

### N-7 — Drag order integrity — **store half GREEN · first-drag browser row OWED** (from unit c, ESC-W7c-N7)

`usePaletteStore.movePalette` permutes only the visible slots (PG-2, the named-addition rider); `PalettesPane`'s one
`onUpdate` replaces the library default that double-applied the first drag (PG-1). ⟨cmd⟩ `npx vitest run
demo/test/palettes/palette-reorder.test.ts` → **4 passed**; falsifier (the retired hoist-and-append) → **3 failed**.
A real-pointer drag row (Sortable in Chromium) is not authored at this seat — named, not claimed.

### N-8 — The provenance field exists on both sides — **GREEN for the admin DTOs in bounds · ADJ-1 ROUTED**

`dto-parity.test.ts` is a type-level key census the demo program compiles: `AuditEntry` ↔ `AuditEntryDTO`, `User` ↔
`UserListEntry`, `FlaggedPalette`/`Flag` ↔ `flag.ts`, feature toggle ↔ `FeatureToggleResult`. ⟨cmd⟩ `npx vue-tsc -p
tsconfig.demo.json --noEmit` → EXIT 0. Falsifier: drop `actorSlug` → `dto-parity.test.ts(28,7): error TS2322`, EXIT 2.
`ProposedColorName.proposerSlug` (ADJ-1, D-7's precondition) is typed in `demo/color-session/color-names.ts` —
outside X.W7.d's set; routed.

### N-14 — The rejection arm — **GREEN (arm) · the preserve arm is `api/**`**

A weighted palette's publish is refused before any request with "This palette carries color weights, which
publishing would discard…" (`api/preflight.ts`), rendered on the card rail by the same path the N = 51 oracle row
proves. ⟨cmd⟩ `npx vitest run demo/test/palettes/palette-preflight.test.ts` → **18 passed** (0 requests in every
refusal). Carrying `weight` on the wire is `api/src/modules/palette/schema.ts` — not this unit's.

### N-16 — A paged read cannot be overwritten by an older one — **GREEN**

`latestRequest()` tickets on audit, flagged, tags, the name queue and the roster (last-ISSUED wins; `loading`
clears only for the current ticket). ⟨cmd⟩ `-t N-16` (page 3 issued first and settling LAST, page 2 second) → the
rendered page is page 2, the pager agrees, `loading` false. Falsifier: every ticket current → **1 failed**.

---

## X.W7.e — gate sections (seat `claude-opus-5-5[1m]`, 2026-09-23, opened at HEAD `8ea888dc`)

### G14 — Deliberate dismissal at destructive seats — **network half GREEN (5 seats + reject) · grep clause ESCALATED (ESC-W7e-DISMISS-AXIS)**

⟨cmd⟩ `grep -rn 'window.confirm\|<ConfirmDialog\|dismiss="deliberate"' demo/ | grep -v node_modules | wc -l`
- **RED (open)**: **0**. At the bytes: `AdminTagsPanel.vue:138` `@click="tagsApi.deleteTag(tag.name)"`; `AdminFlaggedPanel.vue:126`
  `@click="flagged.deletePalette(…)"`; `AdminNamesPanel.vue:133` `@click="emit('delete', item)"` (and `:87` reject);
  `AdminUsersPanel.vue:190` `@click="pm.onAdminDeletePalette(palette)"` (unit d's disclosure seat, unconfirmed). Delete-all
  (`:134`) was already behind the panel's confirm.
- **The spelling is impossible at the installed producer.** ⟨cmd⟩ `grep -n "dismiss" node_modules/@mkbabb/glass-ui/dist/components/dialog/DialogContent.vue.d.ts`
  → **0** (7.0.0 carries `showClose?: boolean`); ⟨cmd⟩ `git -C ../glass-ui grep -n "DialogDismiss" v7.0.0 -- src/components/dialog` → **0**;
  `v8.0.0:src/components/dialog/DialogContent.vue:30` `export type DialogDismiss = "free" | "deliberate" | "locked";` landed at
  `b155ca4c` (2026-08-05, BK #38 W-DIALOG). The producer's own docstring: *"The old boolean close knob folds into it"* —
  `deliberate` ≡ Esc · outside, no ✕ ≡ glass 7's `:show-close="false"`, the house pattern already at `AdminUsersPanel.vue:203`.
  Writing `dismiss="deliberate"` on glass 7 would be an undeclared fall-through attribute (a decorative grep-pass, the exact
  shape G14's falsifier names) — **not written**. The rung is composed in its glass-7 spelling at all four dialogs
  (⟨cmd⟩ `grep -c '<DialogContent surface="glass" :show-close="false">' Admin{Names,Tags,Flagged,Users}Panel.vue` → 1·1·1·1)
  with `<Button tone="destructive">` commits (Names `:159` · Tags `:170` · Flagged `:191` · Users `:230` `:tone`).
- **AFTER grep**: **0** (double-run 0 · 0) — **RED by the producer pin, ESC-W7e-DISMISS-AXIS**; re-spells at the 8.0.0 repin
  (X-W0 census / X-W4.g receiving surface), exactly as fourier's F-W1 M-α re-spelled `showClose`.
- **Network (the gate proper)** ⟨cmd⟩ `VJS_E2E_PORT=8190 npx playwright test --project=smoke e2e/smoke/oracles/w7-destructive-seats.spec.ts`
  → **6 passed** (in the pair run with G13: **19 passed ×2**). Unit half ⟨cmd⟩ `npx vitest run demo/test/palettes/admin-destructive.test.ts`
  → **10 passed ×2** (7 seats incl. delete-user, + dismissal-releases-act, + 2 naming).
- **Falsifiers (run, reverted, `cmp`-restored)**: tag seat back to direct fire → vitest `requests before acceptance: ['DELETE /admin/tags/moody', …]`;
  flagged seat direct fire → e2e dialog never visible (red); both RED for the named reason.
- **Anchor drift (INTENT at the true bytes)**: spec/brief anchors `AdminNamesPanel:111` · `AdminTagsPanel:101` · `AdminUsersPanel:120/317`
  read `:133` · `:138` · `:134` (control) / `:342` (confirm opts) at `8ea888dc`.

### N-6 — Exactly one request per destructive commit — **GREEN**

- **RED (open)**: no instrument (ABSENT). At the bytes `AdminUsersPanel.vue` `onConfirm` ran `confirmAction.value?.()` then closed;
  the closure was never cleared and the footer commit had no `:disabled` (fold W7.92 · Δ-3).
- **Cure**: every confirm TAKES its act before running it (`const act = …; if (!act) return; … = null; open = false; act()`), a
  `flush: "sync"` watcher releases the act on any dismissal (Esc · outside · Cancel), and the commit is `:disabled` while empty.
- **GREEN**: e2e — accept `dblclick()` (second press inside the 159–271 ms window), then 300 ms past it → ledger **exactly
  `[expected]`** at all 6 seats, ×2. Unit — two synchronous `.click()`s on the accept → **1** request at all 7 seats, ×2; Cancel then
  accept → **0**.
- **Falsifier**: `AdminUsersPanel` reverted to the born-RED `onConfirm` (no take, no release, no `:disabled`) → vitest **3 failed**
  (`expected [ …(2) ] to have a length of 1 but got 2`: delete-all · disclosure delete · delete user) and e2e **2 failed**
  (delete-all · disclosure delete: `requests after a double acceptance`). Restored, `cmp` clean.

### G15 — Destructive naming — **GREEN** (+ S-15)

⟨cmd⟩ accessible-name assertion (`admin-destructive.test.ts` G15 · `w7-destructive-seats.spec.ts` delete-all row)
- **RED (open)**: visible text **`Palettes`**, no `aria-label` → accessible name `Palettes`; meaning disclosed only by the confirm title.
- **GREEN**: visible **`Delete all palettes`**; accessible name **`Delete all palettes of azure-fox-01`** (the visible words lead it —
  label-in-name); `byName("Palettes")` → none. ×2 (unit), ×2 (e2e).
- **S-15**: Flagged `Dismiss` ×N → `aria-label` **`Dismiss reports on Sunset Riot`** / **`… Shady Spam`** (asserted list-equal);
  delete-user glyph `UserX` vs delete-all `Trash2` (asserted unequal `svg` class).
- **Falsifier**: visible text reverted to `Palettes` and the label removed → **2 failed** (G15 · S-15). Restored, `cmp` clean.

### S-14 — the three sharpenings

- **(a)** exactly one request — N-6 above (the e2e asserts `toEqual([expected])`, never "none before").
- **(b)** tag seat visible at rest — `opacity-0 … group-hover:opacity-100 … focus-visible:opacity-100` deleted; e2e asserts
  `toHaveCSS("opacity", "1")` with the pointer parked at (0,0) and no focus. Falsifier: the three classes restored → **failed**
  (`Expected "1" · Received "0"`). ATP-46 rider (property list scoped to `background-color, transform`) and ATP-31 (`ml-0.5`) ride the same line.
- **(c)** the fifth seat — `PaletteCard` survived unit d (ESC-W7d-INSPECTOR), so AP-6's seat lives on: the browse-wall admin
  delete reaches `pm.onAdminDeletePalette` from `BrowsePane.vue:342` via `PaletteCardMenu.vue` — **neither path is in unit e's
  writable set** → **ESC-W7e-AP6** (routed; not claimed). VHD-2 (VersionHistoryDrawer revert) is X-W4's file — not touched.

### Cadence (§7) at unit e

⟨cmd⟩ `npx vitest run` ×2 → **2 failed / 744 passed (746)** both runs — the same two pre-existing fails (C-5 `spectrum-luma`,
NG-6 case 2 / F-4). ⟨cmd⟩ `npx vue-tsc -p tsconfig.demo.json --noEmit` → EXIT **0** (was EXIT 2 at open of e: TS2352 ×2 in
`palette-reorder.test.ts`, cured `73fd8ccf`). ⟨cmd⟩ `npx tsc -p tsconfig.e2e.json --noEmit` → EXIT 0. ⟨cmd⟩ `npx eslint
demo/palettes/browser/admin demo/test/palettes/{admin-destructive,palette-reorder}.test.ts e2e/smoke/oracles/w7-*.spec.ts
--max-warnings=0` → EXIT 0. `git diff --check` clean. G18 ⟨cmd⟩ `git diff --numstat 8ea888dc..HEAD -- src/ api/ | wc -l` → **0**.
Strict-probe (F-1 instrument, scratch tsconfig) on the four panels: every diagnostic is F-1's producer-typing class (TS2353
`onClick`/`aria-label`/`variant` on glass `Button`, 2 pre-existing TS2322 on the tag `Input`s); no new class.
- **smoke-admin** ⟨cmd⟩ `npx playwright test --project=smoke-admin` → **5 failed / 16 passed**. Baseline with the four panels
  at `8ea888dc` bytes (same run shape) → the 3 `a11y-authed-admin` battery rows fail identically (`controlsChecked` 0 —
  PRE-EXISTING, not unit e's); `flows/color-reject.spec.ts` and `flows/tag-delete.spec.ts` **passed at baseline and fail
  after** — both assert the single-click, unconfirmed fire that G14 cures (born-RED witnesses whose premise inverts). They sit
  outside unit e's writable set → **ESC-W7e-FLOW-INVERSION** (re-rule: accept the confirm, then assert the one request).
- **Not run at this seat (named, not claimed)**: X-W1's `e2e/visual/admin-*.visual.spec.ts` goldens — the tag seat is now
  inked at rest and the delete-all control reads `Delete all palettes`, so those cells are expected to diff; `e2e/visual/**` is
  X-W1-owned (Do-NOT-touch) → re-baseline rides ESC-W7e-FLOW-INVERSION's routing to its owner.

## X.W7.f — gate sections (seat `claude-opus-5-5[1m]`, 2026-09-23, opened at HEAD `fe009763`)

Commits: `ae9a3a48` (N-5, MixSourceSelector site) · `b970fe96` (#10, the facility + compact counts).

### G16 — The formatting facility owns display precision — **GREEN inside X.W7.f's bounds · 26 of 29 sites + 3 dead APIs ESCALATED (ESC-W7f-SITES)**

- ⟨cmd⟩ `npx vitest run demo/test/color-session/format-color.test.ts` → BEFORE (facility absent at open; census half
  on the prior consumer bytes): **5 RED** (4 import-census + 1 raw-interpolation) · AFTER **42/42 GREEN** (double-run 42 · 42).
- Exact strings per register per channel class (10 classes × compact/caption/interchange + `exact` identity with
  `canonicalColor`); table totality over every `PICKER_CHANNELS` channel; the lch C compact cell is the
  `LCH_C_COMPACT_RULING` OWNER-RULING marker (shipped 0).
- Falsifier ⟨cmd⟩ `oklch.c: 3 → 4` in `CHANNEL_DECIMALS` → **3 RED** (oklch compact · kelvin compact · formatChannel); reverted.
- `caption` = X-W6 `formatSpecimen` RE-EXPORTED (CE-1, one digit policy); ⟨cmd⟩ `node docs/tranches/X/gates/gate-specimen-grammar.mjs` → exit **0** after the reroute.
- Census at post-W6 bytes (OM-14 §2.A/§2.B/§5; 29 = 17 text + 11 ARIA + 1 write-back): routed here **3** — A1
  `ColorSpaceSelector.vue:180` (already W6-cured; now imports the facility) · A16 `MixSourceSelector.vue:181` · B11 `:249`
  (+ the uncensused `:248` title). **26 outside X.W7.f's writable set** → ESC-W7f-SITES (not written).
- Dead precision APIs (OM-14 §3.14): `color-model.ts:63 toCSSColorString(_digits)` · `useColorPipeline.ts:28 DIGITS` ·
  `useSliderGradients.ts:14 DIGITS` — **all three outside W7 bounds** → ESC-W7f-DEADAPI (not deleted).

### G17 — Compact counts — **GREEN**

- ⟨cmd⟩ `npx vitest run demo/test/palettes/compact-counts.test.ts` → BEFORE **3 RED** (mounted, prior bytes) · AFTER **11/11 GREEN**.
- Fixture `g9Palette()` (`voteCount = 12345`): vote count text `12.3k`, `title="12345"`; specimen forks `12.3k` /
  `title="12345 remixes"`, versions `4.3k` / `title="4321 versions"`. No `shrink-0` added (G9 ≡ G17 one cure surface).

### G18 — `src/` containment — **GREEN**

- ⟨cmd⟩ `git diff --stat e24361c6..HEAD -- src/ | wc -l` → **0** (double-run 0 · 0); working tree `git diff --stat -- src/` → 0.

### N-5 — No index in keys — **GREEN at the two-site lock · 3 repo residue outside W7 · MSS-16 ESCALATED**

- ⟨cmd⟩ `grep -rn '::\${i}\|:key="[^"]*index' demo/ --include='*.vue' --include='*.ts' | wc -l` → BEFORE (post-c) **5** · AFTER **3**
  (double-run 3 · 3): `GradientEasingEditor.vue:121`, `ColorNutritionLabel.vue:57,107` — outside W7.
- Removal falsifier on the REAL SFC (`swatch-identity-keys.test.ts`, 2 new cases): prior bytes **2 RED** → **2 GREEN**.
- MSS-16 (`.swatch-row > .vj-enter-leave-active { position: absolute }`, `demo/styles/utils.css:177-179`): fold lock
  "fix the recipe ONCE — never per consumer"; `utils.css` is outside X.W7.f's writable set → **ESC-W7f-MSS16**.
  MR-35's pre-cure teleport measurement was NOT taken (no live browser probe at this seat; Playwright/DevTools MCP
  failed to connect) — the pre-cure bytes remain measurable at `fe009763`.

### Cadence (§7) at unit f

- `npx vitest run` → **2 failed / 799 passed (801)**, 53 files, double-run identical; the 2 = the baseline C-5 and NG-6 (F-4).
- `eslint --max-warnings=0` on the 8 touched files → exit 0; `git diff --check` → clean.
- `vue-tsc -p tsconfig.demo.json` → 2 × TS18048 in `admin-destructive.test.ts:261,262` (unit e's file, not touched here);
  strict-probe: 0 new TS2353/TS2322 in f's files (the one new `data-count` attribute was withdrawn before commit).
