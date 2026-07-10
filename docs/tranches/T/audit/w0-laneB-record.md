# T.W0 lane B — W0-3 legacy excisions · W0-4 doc-truth residual · W0-6 · PP-8 (record)

**Lane**: T.W0 remainder lane B (parallel to lane A's W0-2/W0-CI/W0-X). **Exclusive
surface**: `demo/@/**` (the named legacy set + ColorInput one-liner), `src/**/CLAUDE.md`,
`demo/DESIGN.md`, `docs/tranches/T/audit/`. **Substrate**: tranche-t on top of lane A's
committed W0-2 (`8bbf069`) + W0-6/W0-4-ci residuals (`55f2991`). Commits:
`9599319` (W0-3) · `970ad6a` (W0-6) · `8345ea9` (W0-4 doc-truth) · this record.

---

## W0-3 — legacy excisions (t-legacy-sweep LEG-1..8 + CC-6), all VERIFY-DEAD-FIRST

| Finding | Action | Verify |
|---------|--------|--------|
| F2 BulkActionToolbar.vue · SortFilterMenu.vue | DELETED (zero code importers) | code grep-zero |
| F2 admin-palettes.ts BulkActionToolbar comment | de-referenced | grep-zero |
| F3 dark-mode-toggle/ (2-line re-export folder) | DISSOLVED — 4 consumers (App.vue, useMarkdownColors.ts, MobileMenuDropdown.vue, ProfileSection.vue) repointed at `@mkbabb/glass-ui/{controls,dark}`; folder deleted | grep-zero |
| F1 constants.ts:340-344 orphan type trio | EXCISED (ColorSpaceRanges/ColorSpaceDenormUnits/ColorComponent — dead both directions); ColorSpaceBound kept | grep-zero |
| CC-6 PaletteDialog orphan | EXCISED — shell + 6 components + 3 dialog-only composables + constants.ts + barrel re-export. `useDialogBrowseActions.ts` KEPT (live: BrowsePane.vue) | typecheck 0 |
| F4 savedPalettes dead param | subsumed (declaration `usePaletteDialogState.ts` + caller `PaletteDialog.vue:233` both excised) | — |
| §8 PaletteSlugBar iconOnly migration | stale TODO excised; both icon buttons → shipped `<Button iconOnly size="xs">` | see FLAG below |

### The CC-6 cascade (grep-confirmed, forced consequence of the named excision)

`grep all imports` on PaletteDialog surfaced ONE cascade child + one shared style:

- **ImagePaletteExtractor.vue** — a PaletteDialog-ONLY render child (dialog-era twin
  superseded by the pane-based ExtractPane per R.W4 T20; its only real consumer was
  `PaletteDialog.vue:81/194`; the `useExtractSession.ts` hit is PROSE). Dead-by-cascade
  → DELETED + its now-empty `image-palette-extractor/index.ts` barrel. Its child
  `ExtractWorkbench` stays LIVE via `ExtractPane` (verified). Leaving it would have
  created a fresh dangling orphan referencing a deleted class — the only coherent
  excision includes it.
- **`.palette-tab-content`** — its CSS rules lived in PaletteDialog.vue's unscoped
  `<style>` (the style.css entries were breadcrumb comments only). Consumers were the
  deleted PaletteDialog tabs + ImagePaletteExtractor.vue → fully dead after the excision.
  Died with PaletteDialog.vue; the two style.css D.W4 breadcrumb comments re-cut to drop
  the dead colocation reference.
- The 11 OTHER palette-browser components PaletteDialog imported (AdminNamesPanel,
  AdminUsersPanel, CurrentPaletteEditor, FlagReportDialog, MigratePalettesDialog,
  PaletteCard(+Grid/Skeleton), PaletteSlugBar, SearchFilterBar, UserSortMenu,
  VersionHistoryDrawer) are all pane-live — KEPT.

### Files deleted (16)
BulkActionToolbar.vue · SortFilterMenu.vue · dark-mode-toggle/index.ts ·
PaletteDialog/{PaletteDialog.vue, components/×6, composables/{usePaletteDialogState,
useDialogModalStack, useDialogOverlayGuards}.ts, constants.ts} ·
image-palette-extractor/{ImagePaletteExtractor.vue, index.ts}.

### FLAG for the design waves — PaletteSlugBar geometry delta
The migration off the hand-sized `h-6 w-6` (24px fixed) onto `<Button iconOnly size="xs">`
adopts the design-system geometry: `--control-h-xs` = **~28px desktop** / **WCAG-44px on
coarse pointers** (the `--control-floor` clamp). This is glass-ui's intended icon-button
geometry (a WCAG touch-target improvement), NOT a bug — but it IS a visible size change
inside the tight SlugBar search field on touch. Recorded for W3/W4/W4.5 eyeball.

### Remaining grep hits — all HISTORICAL provenance prose (kept, accurate as history)
`viewSchema.ts:9`, `useVersionHistory.ts:9`, `useAdminFlagged.ts:9` (`History:` /
`Migration source:` records of past extractions naming now-deleted files),
`useExtractSession.ts:4` (the R.W4 T20 collapse narrative). Not stale current-state
claims; erasing them would destroy provenance.

### DEFERRED (out of lane-B exclusive scope) — demo/CLAUDE.md legacy rows
`demo/CLAUDE.md` is NOT in this lane's writable set and is W9 FULL-rewrite territory
(E-1 orphans it as a document). Its now-stale rows are RECORDED here for the gate/W9,
per the task's out-of-scope-CLAUDE.md treatment:
- the `SortFilterMenu.vue` cell (filtering-UI row) + `BulkActionToolbar.vue` cell
  (utility-primitives row);
- the `PaletteDialog/` colocated-dir description (shell + 6 SFCs + 5 composables);
- the `dark-mode-toggle/` "animated sun/moon SVG toggle" subtree row (already stale
  pre-T — it was a 2-line glass-ui re-export, not an SVG toggle);
- the `image-palette-extractor/` `ImagePaletteExtractor.vue` "thin shell" row.
The W0-3 **code** grep-zero gate (the sweep's own `--include=*.vue,*.ts`, markdown-
excluded methodology) is MET; markdown prose in a W9-rewrite doc is not the code gate.

---

## W0-6 — the --ring fallback-first pre-migration (P9-J4)
`ColorInput.vue:338` (moved editing/ → controls/): `var(--ring)` →
`var(--focus-ring-color, var(--ring))`. Makes W7's `--ring` roster verify a no-op; no
visual change today (fallback resolves to the shipped `--ring`).

---

## W0-4 — doc-truth residual (each row verified vs the live tree)
- `src/subpaths/CLAUDE.md` AUTHORED — the frozen-entry law (7 barrels + src/index.ts =
  build-frozen chunk names → package.json exports) + the parse-that-free budget invariant.
- `src/transform/CLAUDE.md` — path.ts added (Files + Algorithms + Point/PathSample);
  hardcoded "541 loc" stripped.
- `src/units/color/CLAUDE.md` — space table 15 → 17 (ICtCp + Jzazbz rows, verified full
  Color subclasses in the tree); conversions/ 8 → 10; the "15" count mentions cured.
- `demo/DESIGN.md` — `@lib/gamut-ink` netting facility + `--alpha-checker` ground added
  to §Color (the pane-clamp 32/25rem was already cured at `18bf9f8`).

tool-artefact grep (`</?(content|invoke|parameter|antml)`) over all touched docs: CLEAN.

---

## PP-8 — repo-wide sweep (recomputed at close)

**Caps** — PASS:
- `demo/` (excl. vendored `components/ui/`): max = **400** LoC (ColorPicker.vue, exactly
  at the ≤400 cap); next App.vue 399, PaletteCard.vue 398. Zero files > 400.
- `api/src`: zero files > 350 LoC.

**as-any / as-unknown-as ledger** (regenerated — the LoC-precept pattern, count is the
source of truth, not a hardcoded budget):
- `src/`: `as unknown as` = **8** (matches the documented count — the one accepted
  Color<T> generic-erasure + DOM-string-index class); real `as any` = **0** (the single
  textual hit `src/parsing/index.ts:509` is a comment *saying* no `as any` is needed).
- `api/src`: `as unknown as` = **1** · `as any` = **0** (unchanged — the documented
  `@hono/node-server` handle).
- lane B touched no cast site; the constants.ts excision removed type *aliases* only.

**Legacy code grep-zero** (`--include=*.vue,*.ts`) — ALL ZERO: BulkActionToolbar ·
SortFilterMenu · dark-mode-toggle · ColorSpaceRanges · ColorSpaceDenormUnits ·
ColorComponent · PaletteDialog(shell import) · ImagePaletteExtractor(import) ·
palette-tab-content.

---

## Verification gate (whole integrated tree, incl. lane A's committed W0-2)
- `npm run lint` → **0** (exit 0)
- `npm run typecheck` → **0** (exit 0)
- `npm test` → **2158 passed** / 68 files (exit 0)
- `npx playwright test --project=smoke --project=smoke-admin` → **48 passed, 3 skipped**
  (exit 0) — all admin surfaces (users / names-moderation / flagged / walk / color
  approve+reject / palette-feature / tag create+delete / user-status) intact post-excision.
