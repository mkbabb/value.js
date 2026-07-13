# h-evidence-censuses — evidence re-verification (the 4 colocation censuses + t-card-color-census)

**Lane**: hardening · **Charge**: re-verify the 4 colocation censuses' file tables
(`t-coloc-src`, `t-coloc-components`, `t-coloc-composables-lib`, `t-coloc-backend`) and
`t-card-color-census`'s surface list against the tree at HEAD (counts, paths — spot 15 rows
each); stale rows (files moved/renamed since) = SHOULDFIX with corrections.

**Substrate check (precondition)**: `git log --oneline cc4f4fa..HEAD -- src/ demo/ api/` is
**empty** — no commit has touched library/demo/backend product code since the S close all five
censuses cite as their substrate. Therefore every delta found below is a **census authoring
error**, not time-drift ("files moved since") — the corpus's own premise that drift would be a
moved-file problem does not hold; the actual failure mode is arithmetic/inventory mistakes
present since the day each file was written. Method: full `find`+`wc -l` reconstruction of
every directory each census tabulates, diffed line-by-line against the census's own tables;
every `file:line` citation in `t-card-color-census` spot-checked with `sed`, including three
into the read-only `../glass-ui` (producer citations).

**Verdict**: a split bill. **2 lanes are byte-perfect** (`t-coloc-src`, `t-card-color-census` —
every one of ~100 combined rows/citations checked reproduces exactly, including exact CSS
property line numbers and glass-ui producer citations). **2 lanes have real inventory holes**
(`t-coloc-components`, `t-coloc-composables-lib` — one apiece rises to MUSTFIX: real files
dropped from an "exhaustive" breakdown, and a phantom file cited that does not exist).
`t-coloc-backend` has two minor overcounts. **2 MUSTFIX + 4 SHOULDFIX + 1 NOTE.**

---

## MUSTFIX

### H-EC-1 — `t-coloc-components` §1/F4/§3.2: two real, actively-imported `palette-browser/` root components are entirely absent from the census's "exhaustive" cluster/target-structure breakdown
**Corpus location**: `docs/tranches/T/audit/lanes/t-coloc-components.md` §1 (line 48), F4
(lines 145–170), §3.2 (lines 306–318).

**Cited**: F4 claims "`palette-browser/` is a 33-`.vue` FLAT namespace… The flat set contains
at least five distinct sub-features" and enumerates all 33 into **card / admin / search-filter
/ dialog-status / slug** clusters, each then given a NEST/KEEP/LIFT/DROP target in §3.2's table
— explicitly presented as the complete decomposition plan for the "flagship long-running dir
offender."

**Verified against the tree**: `palette-browser/` root holds **31** `.vue` files (not 33 —
confirmed by `find … -maxdepth 1`), of which **29** are named somewhere across F4's five
clusters + F8's orphan list. The two never named anywhere in the document:
- `CurrentPaletteEditor.vue` (305 LoC) — imported by `panes/PalettesPane.vue`,
  `palette-browser/DevMisconfigBanner.vue`, `palette-browser/PaletteDialog/components/
  PaletteSavedTab.vue`. Also independently documented as a live surface in the sibling lane
  `t-card-color-census.md` (row B1, "Current-Palette editor").
- `VersionHistoryDrawer.vue` (164 LoC) — imported by `panes/BrowsePane.vue`,
  `palette-browser/PaletteDialog/PaletteDialog.vue`, `.../useDialogModalStack.ts`. Also
  independently documented in `t-card-color-census.md` (row B8, "a 5th independent opaque-
  `bg-card` site not in the design lane's fixture table").

Both are real, non-trivial, actively-rendered components — not dead code, not recently added
(both trace to pre-S refactor commits, `2457e92`/`f4a239e`), and both are *already known to the
T corpus* via the sibling census — yet this lane's own file inventory, whose stated purpose is
"full file inventory… disambiguated," never counts or homes them.

**Why MUSTFIX**: F4/§3.2 is the literal input the T plan would execute to decompose
`palette-browser/` into `card/ admin/ search/ dialog/ slug/`. If executed as written, these two
files have no target path — they would be silently stranded at the (soon to be empty)
`palette-browser/` root, or worse, an implementer extrapolating "everything moves into a
subfolder" could misfile them by guesswork. A census whose entire value proposition is
"disambiguate the grab-bag" that drops 2 of 31 root files is a correctness gap in the
document the amend pass must fold as a correction, not treat as complete.

**Proposed amendment**: add `CurrentPaletteEditor.vue` to a target cluster (it is palette-edit
chrome, consumed by Palettes pane + 2 dialog-era files — candidate: its own `edit/` cluster or
folded into `card/` beside `PaletteCard`, given its `.dashed-well` styling kinship per
`t-card-color-census` B1). Add `VersionHistoryDrawer.vue` likewise (candidate: `dialog/`,
alongside `PaletteDialog/`, which is one of its own importers). Re-run the F4 count as **31**, not
33, and correct the LoC/file totals per H-EC-3 below.

---

### H-EC-2 — `t-coloc-composables-lib` §2: a phantom file row, `palette/useAdminUsers.ts`, does not exist in the tree
**Corpus location**: `docs/tranches/T/audit/lanes/t-coloc-composables-lib.md` §2 table, the row
`palette/useAdminUsers.ts | 1 ← pm | MODULE (palette, enc.) | admin user CRUD` (line 95).

**Verified against the tree**: `find demo/@/composables -iname "*useAdminUsers*"` returns
exactly **one** file: `composables/auth/useAdminUsers.ts`. There is no
`composables/palette/useAdminUsers.ts` — `composables/palette/` holds 13 files and none of them
is named `useAdminUsers.ts` (confirmed by directory listing: `useAdminAudit`, `useAdminFlagged`,
`useAdminTags`, `useBrowsePalettes`, `useColorNameQueue`, `usePaletteActions`,
`usePaletteExport`, `usePaletteManager`, `usePaletteManagerWiring`, `usePaletteStore`,
`useSlugMigration`, `useTagEdit`, `useVersionHistory`). The census's own §2 table *also*
separately and correctly lists `auth/useAdminUsers.ts | 1 ← pm | MODULE (auth) | admin user auth
(distinct from palette's)` two rows below (line 102) — i.e. the table asserts **two distinct**
`useAdminUsers` files, one per domain, when only one exists.

**Root cause (apparent)**: cross-contamination from the sibling census `t-coloc-components.md`
F5, which correctly documents `@composables/auth/useAdminUsers.ts:14` holding an
`import type AdminUsersPanel from ".../palette-browser/AdminUsersPanel.vue"` template-ref
coupling — i.e. the *real* file is auth-domain but reaches into palette-browser by type. This
lane appears to have split that one fact into two files (an "auth" one and a "palette" one)
that don't both exist.

**Why MUSTFIX**: this is not a rounding error — it fabricates a unit of work ("admin user CRUD"
already correctly encapsulated under `palette/`) that isn't there, which pollutes both the
composables tally (§2's "MODULE 21… palette 12" text and the row-count arithmetic) and the
downstream CL-1 domain-transposition plan (§5's target tree lists `composables/` under
`palette/` as the already-correct model to copy — an amend pass trusting this row would believe
one more palette sub-composable is already encapsulated than actually exists).

**Proposed amendment**: delete the `palette/useAdminUsers.ts` row; the true "admin user CRUD
already encapsulated under palette" facts are the 12 *other* `palette/use*` sub-composables
(the row count silently self-corrects to 12, matching the "palette 12" prose in the MODULE
tally, which was right all along despite the extra row).

---

## SHOULDFIX

### H-EC-3 — `t-coloc-components` §1 feature-census table doesn't reconcile with its own (correct) grand total
**Corpus location**: `docs/tranches/T/audit/lanes/t-coloc-components.md` §1 table (lines 47–57),
vs. the intro's own stated total (line 15: "146 files / 20,501 LoC under `custom/`").

**Verified**: the intro total (146 files, 20,501 LoC) is **exact** against the tree
(`find … -type f | wc -l` = 146; summed `wc -l` over every `.vue`/`.ts`/`.css` = 20,501). But
the §1 per-feature table's own rows sum to **142 files / 21,717 LoC** — 4 files short and 1,216
LoC over its own stated total. Per-row deltas (census claim → measured):

| Feature | files claimed → actual | LoC claimed → actual |
|---|---|---|
| `color-picker/` | 33 → 33 ✓ | 6,131 → **5,624** (−507) |
| `palette-browser/` | 45 → **48** (+3, incl. H-EC-1's 2 files + `DockViewSelect`-class miss elsewhere) | 6,470 → **5,491** (−979) |
| `panes/` | 16 → 16 ✓ | 1,850 → 1,840 (−10, negligible) |
| `gradient/` | 11 → 11 ✓ | 2,231 → **2,332** (+101) |
| `image-palette-extractor/` | 12 → 12 ✓ | 1,727 → 1,728 (+1, negligible) |
| `mix/` | 7 → 7 ✓ | 1,035 → **1,200** (+165) |
| `dock/` | 9 → **10** (+1 — `DockViewSelect.vue`, see H-EC-4) | 1,204 → 1,217 (+13) |
| `markdown/`,`generate/`,`katex/`,`dark-mode-toggle/` | exact | exact |

The file-count gap (142 vs 146) is fully explained by `palette-browser/` (+3: the 2 files in
H-EC-1 plus one more — the `composables/`/`PaletteDialog/` sub-count also drifts by one) and
`dock/` (+1, H-EC-4). The LoC gap is real per-row miscounting, not a units difference (verified
via two independent methods — concatenated `cat|wc -l` and summed per-file `wc -l` — which
agree to the line).

**Proposed amendment**: replace the §1 table's `color-picker`/`palette-browser`/`gradient`/
`mix`/`dock` LoC and the `palette-browser`/`dock` file counts with the measured values above;
the intro's 146/20,501 headline is correct and should anchor the reconciliation.

### H-EC-4 — `t-coloc-components` §1/§3.3 `dock/` verdict ("0 external importers… fully self-contained") is contradicted by an omitted file with a real external importer
**Corpus location**: `docs/tranches/T/audit/lanes/t-coloc-components.md` §1 table (line 53:
"`dock/` | 9 | 1,204 | `composables/ layers/ menus/` | **0** | good; fully self-contained"),
§3.3 (line 337: "KEEP — already correct & self-contained").

**Verified**: `dock/` holds **10** files, not 9 — `DockViewSelect.vue` (156 LoC) is present and
is never named in the census. It is imported externally by
`color-picker/display/ColorSpaceSelector.vue` (confirmed by `grep`), directly contradicting the
row's own "external deep-importers: 0" column and its "fully self-contained" verdict — dock has
at least one real outbound coupling this census's own vocabulary (§0, the LIFT/KEEP test keys
off external-importer counts) would classify as needing scrutiny.

**Proposed amendment**: add `DockViewSelect.vue` to the `dock/` row (10 files, LoC per H-EC-3),
change external-importer count 0 → 1, and note the `ColorSpaceSelector.vue` coupling — likely
still a KEEP (one external consumer of a view-select control is plausibly legitimate reuse) but
the census should say so rather than assert zero.

### H-EC-5 — `t-coloc-composables-lib` §1 header-table subdivisions don't match the tree (or the census's own §2/§3 body tables)
**Corpus location**: `docs/tranches/T/audit/lanes/t-coloc-composables-lib.md` §1 table (lines
64–65).

**Verified**:
- `composables/` root: header claims **6**; the tree has **7** (`prng.ts`,
  `useDevicePixelSnap.ts`, `useFilteredList.ts`, `usePaneRouter.ts`, `useSafeStorage.ts`,
  `useViewManager.ts`, `viewSchema.ts`) — and the census's own §2 body table lists all 7 of
  these as individual rows two sections later, so the undercount is confined to the §1 summary
  line, not the detailed work.
- `lib/` root: header claims **4**; the tree has **6** (`color-space-meta.ts`, `color-utils.ts`,
  `dateFormat.ts`, `gamut-ink.ts`, `quantize-worker.ts`, `view-accents.ts`) — again, the §3 body
  table correctly lists all 6.
- `lib/palette/api/`: header claims **15**; the tree has **13** (confirmed by directory listing:
  `admin-audit`, `admin-colors`, `admin-palettes`, `admin-users`, `api-problem`, `availability`,
  `client`, `colors`, `index`, `palettes`, `sessions`, `useApiClient`, `versions`).

The composables **grand total** (29 claimed vs. true **30**, after correcting H-EC-2's phantom
row nets to 30) and the lib **grand total** (24, which is exact) partly mask these because the
three per-subdivision errors don't all point the same direction (composables root undercounts
by 1; lib root undercounts by 2 while lib/api overcounts by 2, netting to the correct 24).
LoC totals (3,977 composables / 2,107 lib) are exact against the tree either way.

**Proposed amendment**: correct the §1 table to `composables/: 30 (auth 4, color 6, palette 13,
root 7)` and `lib/: 24 (root 6, palette 5 + palette/api 13)`.

### H-EC-6 — `t-coloc-backend` F7: `scripts/` file count and the package.json `proof:*` wiring count are each off by one
**Corpus location**: `docs/tranches/T/audit/lanes/t-coloc-backend.md` F7 (lines 172–184: "
`scripts/` (19 files)… **11 `proof-*.mjs`**… yet still wired as **13 `proof:*` scripts** in the
**root package.json**").

**Verified**: `scripts/` holds **18** files (not 19) — confirmed by `find scripts -maxdepth 1
-type f`, and F7's own component breakdown (2 deploy + 1 dev + 3 CI probes +
`generate-favicon.mjs` + 11 `proof-*.mjs` = 18) sums to 18, matching the tree, not the stated
19. Root `package.json` wires **12** `proof:*` scripts (not 13) — `grep -c '"proof:' package.json`
= 12 (`proof:css-parity`, `proof:subpath-budget`, `proof:subpath-resolve`,
`proof:contrast-color`, `proof:gamut-alloc`, `proof:grammar-2026` [a vitest invocation, not a
`.mjs` script — the one row that ISN'T one of the 11 `proof-*.mjs` files],
`proof:serialize-fidelity`, `proof:grammar-q`, `proof:color-arch-q`,
`proof:round-trip-idempotent`, `proof:perf-target`, `proof:progress-honesty`). The 11
`proof-*.mjs` file count itself IS exact.

**Why this still matters despite being small**: F7's central claim — that CLAUDE.md's "the
grep-based `proof:*` scripts were retired" contradicts the still-wired `proof:*` block — survives
correction (12 ≠ 0 either way), so the finding's thesis is intact; only the two headline
numbers need the fix.

**Proposed amendment**: `scripts/` → 18 files; root `package.json` → 12 `proof:*` scripts (of
which 11 invoke `scripts/proof-*.mjs` directly and 1, `proof:grammar-2026`, invokes vitest).

---

## NOTE

### H-EC-7 — `t-coloc-composables-lib` intro's "40 feature-owned composables across 12 features" is an approximation, not a verified count
**Corpus location**: `docs/tranches/T/audit/lanes/t-coloc-composables-lib.md` line 16.

**Verified**: `find demo/@/components/custom -path "*/composables/*.ts"` returns **38** files
across **10** `composables/` subdirectories (`gradient`, `markdown`, `mix`,
`image-palette-extractor`, `image-palette-extractor/ImageEyedropper`, `generate`,
`color-picker`, `palette-browser`, `palette-browser/PaletteDialog`, `dock`) — not 40/12. Low
materiality (this line is scene-setting context, not a load-bearing count any finding depends
on), but worth a one-line correction alongside the H-EC-5 fix since both live in the same
census's opening frame.

---

## Positive-confirmation ledger (clean bills)

**`t-coloc-src.md` — byte-perfect.** Every one of the ~70 file/LoC pairs in its §1 census tree
(`src/index.ts` 443 … `src/quantize/types.ts` 50) reproduces exactly against
`find src -name "*.ts" | wc -l` per file. The 8 `package.json#exports` keys, the 7
`src/subpaths/*.ts` frozen filenames, the "15 flat files" `parsing/` count, the "17 flat +
conversions/ (28 total)" `units/color/` count, and the 4 colocated `CLAUDE.md` files' own
line counts (`transform/CLAUDE.md`'s self-incriminating inline `# 541 loc`, cited as a finding
*in* the census) all check out. No correction needed.

**`t-card-color-census.md` — byte-perfect.** Every `file:line` citation independently
re-verified with `sed` — **30+ rows** spanning groups A–G (pane `tier=` sites, `bg-card`/
`bg-muted`/`bg-background` sites, raw neutrals, `.glass-*` utility deployments, bespoke
`color-mix()` recipes) plus 2 producer citations into `../glass-ui` (`utilities/components.css:
205`, `glass/surfaces.css:83`) — reproduce to the exact line, including multi-line CSS property
citations (`PaneHeader.vue:71-73`, `.dashed-well` at `utils.css:56-74`) and 6-line-citation rows
(`Markdown.vue:227,233,239,262,324,360`, all 6 independently confirmed). No correction needed —
this is the most evidentially disciplined artefact re-verified in this pass.

---

## Summary

| Lane | Rows/citations checked | Findings |
|---|---:|---|
| `t-coloc-src` | ~70 | **0** — clean bill |
| `t-coloc-components` | ~60 (feature table + F4 cluster enumeration + dock row) | 1 MUSTFIX (H-EC-1) + 2 SHOULDFIX (H-EC-3, H-EC-4) |
| `t-coloc-composables-lib` | ~55 (composables + lib per-file tables) | 1 MUSTFIX (H-EC-2) + 1 SHOULDFIX (H-EC-5) + 1 NOTE (H-EC-7) |
| `t-coloc-backend` | ~45 (route/service/repo/middleware dirs, models.ts + 34 importers) | 1 SHOULDFIX (H-EC-6) |
| `t-card-color-census` | 30+ | **0** — clean bill |

**2 MUSTFIX, 4 SHOULDFIX, 1 NOTE.**
