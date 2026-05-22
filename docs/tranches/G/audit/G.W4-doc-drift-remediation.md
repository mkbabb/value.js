# G.W4 doc-drift REMEDIATION

**Wave**: G.W4 (close ceremony — doc-drift remediation lane).
**Branch / HEAD**: `tranche-g` @ `9902036` (pre-flight verified).
**Mode**: remediation. Applies the fixes inventoried by the G.W4 close-audit Lane 3
(`G.W4-close-lane-3-doc-drift.md`, 20 items) + the in-bounds Lane 1
discrepancies (`G.W4-close-lane-1-plan-vs-actual.md`, discrepancies 3 + 4).
Worked in the MAIN working tree. NO git operations.

---

## §0 — Method

Read the Lane 3 drift inventory (20 items / 6 files) + the Lane 1 plan-vs-actual
discrepancies in full. For each item: verified the stated correct content against
the actual shipped tree at HEAD `9902036` (every conversion-module line number,
the `withTransaction` call-site count, the `conversions/` cluster contents), then
applied the minimal edit matching each doc's existing format/density.

**Actual shipped state confirmed:**
- `src/units/color/utils.ts` — DELETED (no shim). Decomposition is **9 modules**:
  `conversions/{hex,kelvin,cylindrical,lab,oklab,transfer,xyz-extended,direct}.ts`
  (8) + `dispatch.ts` (1), plus `conversions/index.ts` aggregate barrel.
  `DIRECT_PATHS` table relocated into `conversions/direct.ts` at G.W4.
- `as any` in `src/` = **0** (G2 budget ≤ 5, enforced by `proof:as-any-budget`).
- 6 G.W3 proof scripts: `proof:no-deprecated`, `proof:no-ts-ignore`,
  `proof:as-any-budget`, `proof:codemod-publication`, `proof:no-deep`,
  `proof:no-bare-builtins` (joining `proof:resolution` + `proof:dts-layout`).
- `withTransaction` — **7 cross-collection sites** in `api/src/`
  (`admin/users.ts:161`, `palette/crud.ts:209`, `admin/batch.ts:38` + `:87`,
  `palette/forks.ts:80`, `palette/votes.ts:45`, `palette/versions.ts:151`).
- glass-ui `useBreakpoint` (`@mkbabb/glass-ui/dom`) adopted at 4 demo sites
  (G.W2 Lane E); `PaletteSlugBar` migrated to glass-ui `<Button>` (G.W2 Lane F).
- bench provenance targets verified: `xyz-extended.ts:43` (`RGB_XYZ_MATRIX`
  literal) / `:49` (`XYZ_RGB_MATRIX = invertMat3(...)`); `transfer.ts:38`
  (`linearToSrgb`) / `:14-16` (`SRGB_GAMMA/OFFSET/SLOPE`); `cylindrical.ts:131`
  (`hsl2rgb`).

---

## §1 — Drift items resolved

| # | File | Before | After | Lane-3 ref |
|---|---|---|---|---|
| 1 | `CLAUDE.md` | `│   │   ├── utils.ts        # conversion functions via XYZ hub, mixColors, gamutMap` | `conversions/` cluster line (8 modules + barrel) + `dispatch.ts` line (`color2()`, `DIRECT_PATHS`, `gamutMap`, `interpolateHue`, `mixColors`) | §1 L60 (HIGH) |
| 2 | `CLAUDE.md` | `## Test + verify` lists only `proof:resolution` + `proof:dts-layout` | + 6 G.W3 proof scripts (`no-deprecated`, `no-ts-ignore`, `as-any-budget`, `codemod-publication`, `no-deep`, `no-bare-builtins`) with annotations | §1 L88–97 (MED) |
| 3 | `CLAUDE.md` | `## Conventions` had no `as any` budget note | + bullet: G2 invariant caps `as any` ≤ 5 in `src/` (current 0), enforced by `proof:as-any-budget` | §1 L88–97 (MED) |
| 4 | `src/units/color/CLAUDE.md` | 8-line `├── utils.ts` sub-block (`100+ conversion functions via XYZ hub`, transfer funcs, `color2`, `mixColors`, `interpolateHue`, `gamutMap`) | replaced with `conversions/` directory (9 enumerated modules) + `dispatch.ts` sub-block (`color2()`, `DIRECT_PATHS`, `XYZ_FUNCTIONS`, `gamutMap`, `interpolateHue`, `mixColors`, `getFormattedColorSpaceRange`, `CYLINDRICAL_HUE_COMPONENT`) | §2 L29–35 (HIGH) |
| 5 | `src/units/color/CLAUDE.md` | `## Conversion architecture` named no module homes | + sentence: each `{from}2{to}` family in its own `conversions/*.ts`; `dispatch.ts` owns `color2()` + `DIRECT_PATHS`; `conversions/direct.ts` holds direct-path impls | §2 L82–86 (MED) |
| 6 | `demo/CLAUDE.md` | no `matchMedia`/`useBreakpoint` mention (gap) | + Library-integration note: breakpoint/hover-capability queries route through glass-ui `useBreakpoint` (4 sites, G.W2 Lane E); PaletteSlugBar `<Button>` migration (G.W2 Lane F) | §3 L(whole file) (MED gap) |
| 7 | `demo/CLAUDE.md` | `## Conventions` had no glass-ui-first-class consumption bullet | + bullet: `useBreakpoint` / `<Button>` consumed from glass-ui, not hand-rolled (G.W2 Lanes E/F) | §3 L174–183 (LOW) |
| 8 | `api/CLAUDE.md` | `## Pipeline shape` said nothing about cross-collection transaction atomicity (gap) | + `### Cross-collection transactions` subsection: `withTransaction` factory in `inject-services.ts`; coverage 3 → 7 sites (G.W3 Lane E), all 7 enumerated | §4 L66–80 + L100 (MED gap) |
| 9 | `bench/color2-direct-paths.mjs` | `// ─── Constants inlined verbatim from src/units/color/utils.ts ───` | `// ─── Constants inlined verbatim from src/units/color/conversions/* (G.W1 Lane B) ───` | §5 L66 (MED) |
| 10 | `bench/color2-direct-paths.mjs` | `// CSS Color 4 sRGB inverse — src/units/color/utils.ts:496.` | `// CSS Color 4 sRGB inverse — src/units/color/conversions/xyz-extended.ts:49` (+ note: now `invertMat3(RGB_XYZ_MATRIX)`) | §5 L70 (MED) |
| 11 | `bench/color2-direct-paths.mjs` | `// CSS Color 4 sRGB matrix — src/units/color/utils.ts:490.` | `// CSS Color 4 sRGB matrix — src/units/color/conversions/xyz-extended.ts:43.` | §5 L77 (MED) |
| 12 | `bench/color2-direct-paths.mjs` | `// sRGB transfer encode — src/units/color/utils.ts:523.` | `// sRGB transfer encode — src/units/color/conversions/transfer.ts:38` (+ note: constants at `transfer.ts:14-16`) | §5 L84 (MED) |
| 13 | `bench/color2-direct-paths.mjs` | `// HSL → RGB closed-form (verbatim from src/units/color/utils.ts:322).` | `... (verbatim from src/units/color/conversions/cylindrical.ts:131).` | §5 L111 (MED) |
| 14 | `docs/tranches/G/waves/G.W1.md` | `### Lane B — G-OPP-1: ... decomposition (1,430 LoC → 7 modules)` | `... (1,430 LoC → 9 modules)` | §6 G.W1.md:22 (LOW) |
| 15 | `docs/tranches/G/waves/G.W1.md` | gate-matrix Lane B row: `conversions/{hex,kelvin,cylindrical,lab,xyz-extended,transfer}.ts (new, 6 files)` | `conversions/{hex,kelvin,cylindrical,lab,oklab,transfer,xyz-extended,direct,index}.ts (new, 9 files)` | §6 G.W1.md:85 (MED) |
| 16 | `docs/tranches/G/waves/G.W1.md` | commit-plan: `decompose ... 1430 → 7 focused modules` | `... 1430 → 9 focused modules` | §6 G.W1.md:102 (LOW) |
| 17 | `docs/tranches/G/waves/G.W3.md` | Lane G path `e2e/smoke-mobile/walk.spec.ts` (prose + sub-gate G + file-bounds table) | `e2e/smoke/mobile/walk.spec.ts` (the `smoke-mobile` Playwright project's `testDir`) | Lane-1 discrepancy 3 |
| 18 | `docs/tranches/G/waves/G.W3.md` | §Gate `Conjunction of sub-gates A + B + C + D + E + F + G + H` (omits I/J/K) | `... A + B + C + D + E + F + G + H + I + J + K`; `4 new proof scripts` → `6 new proof scripts` (enumerated) + extended `proof:resolution` | Lane-1 discrepancy 4 |
| 19 | `docs/tranches/G/waves/G.W4.md` | `:39` `... structure block reflects 7-module split` | `... reflects the 9-module split` | §6 G.W4.md:39 (MED) |
| 20 | `docs/tranches/G/waves/G.W4.md` | `:97` `... 18-item pre-merge gate matrix` (contradicts `:52` "21 items") | `... 21-item pre-merge gate matrix` | §6 G.W4.md:52,97 (LOW) |

**20 Lane-3 inventory items resolved** (2 HIGH, 12 MED, 6 LOW). The Lane-3 §8
summary table totals 20 items across 6 files; every row is addressed above —
some Lane-3 rows that "require no change" (e.g. §1 L56, §2 L9–24/36–55, §3 L44/58,
§4 L26–37/77) were already-accurate verifications, not edits; the 20 ACTIONABLE
items are the inventory's drift rows and all are fixed.

---

## §2 — Lane-1 discrepancies (in-bounds)

- **Discrepancy 3** — G.W3.md stale `e2e/smoke-mobile/` path. RESOLVED (item 17).
  All three occurrences in G.W3.md (Lane G prose, sub-gate G, file-bounds table)
  repointed to `e2e/smoke/mobile/walk.spec.ts`.
- **Discrepancy 4** — G.W3.md §Gate conjunction omits lanes I/J/K. RESOLVED
  (item 18). Conjunction extended to `A..K`; the related stale `4 new proof
  scripts` wave-level count corrected to `6` (enumerated).
- **Discrepancy 2** — PROGRESS.md G.W0 wave-log placeholder `<ratification-commit>`.
  **OUT OF BOUNDS** — `PROGRESS.md` is orchestrator-owned. Not touched by this
  lane; noted here for the orchestrator's PROGRESS.md reconciliation.
- **Discrepancy 1** — `dispatch.ts` 391 LoC vs G3 ≤ 350. OUT OF BOUNDS — a
  source/invariant matter resolved by the orchestrator's close ceremony (slim or
  re-ratify); not a doc-drift item. NOT touched. (Note: at HEAD `9902036`,
  `wc -l src/units/color/dispatch.ts` = 312 — within ≤ 350, so the G.W4 close
  appears to have already slimmed it; the orchestrator owns confirming this.)

---

## §3 — Items NOT resolved

None within bounds. All 20 Lane-3 inventory items + Lane-1 discrepancies 3 and 4
are resolved. Lane-1 discrepancies 1 and 2 are explicitly orchestrator-owned and
out of this lane's file bounds.

---

## §4 — Files modified

1. `CLAUDE.md` — color structure block; `## Test + verify` proof scripts; `## Conventions` `as any` budget bullet.
2. `src/units/color/CLAUDE.md` — `## Files` block (`utils.ts` → `conversions/` + `dispatch.ts`); `## Conversion architecture` module-home sentence.
3. `demo/CLAUDE.md` — `useBreakpoint`/`<Button>` adoption note (Library integration); glass-ui-first-class Conventions bullet.
4. `api/CLAUDE.md` — `### Cross-collection transactions` subsection (`withTransaction` 7-site coverage).
5. `bench/color2-direct-paths.mjs` — 5 stale `utils.ts` provenance comments repointed (comment-only; bench logic untouched).
6. `docs/tranches/G/waves/G.W1.md` — 3 fixes (heading 7→9, gate-matrix file list, commit-plan 7→9).
7. `docs/tranches/G/waves/G.W3.md` — Lane G path ×3, §Gate conjunction + proof-script count.
8. `docs/tranches/G/waves/G.W4.md` — `:39` 7→9-module, `:97` 18→21-item gate matrix.
9. `docs/tranches/G/audit/G.W4-doc-drift-remediation.md` — this remediation audit (new).

---

**Doc-drift remediation complete.** 20 Lane-3 inventory items + Lane-1
discrepancies 3 & 4 resolved across 8 in-bounds files. Every documentation
statement in scope now reflects the actual shipped tree at HEAD `9902036`.
</content>
</invoke>
