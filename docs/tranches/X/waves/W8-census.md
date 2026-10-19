SERVED MODEL: claude-opus-5-5

# X-W8 — the C-16 residue census (X.W8.a)

Spec: `docs/tranches/X/waves/W8.md` §Agent Units X.W8.a `:146-155` · §Hard Gate G-1 `:208-225` ·
§Archaeology `:478-489`. Date 2026-10-17. Seat `claude-opus-5-5`.

**SHA of record.** Census run at the wave-open record commit **`f79a79e14`** (HEAD; "X-W8 OPEN —
baseline banked") over a clean product tree. The baseline SHA **`d17dece5a`** carries identical
product bytes: ⟨`git diff --stat d17dece5a f79a79e14 -- demo src package.json`⟩ → empty (0 files);
⟨`git status --porcelain -- demo src`⟩ → only `?? demo/app/.vite-critic-9216/` (an untracked Vite
cache; it holds no `.vue`/`.ts` hit — ⟨`grep -c vite-critic hits`⟩ → `0`). Every figure below
therefore reads the same at both SHAs. Installed producer: `@mkbabb/glass-ui` **10.1.0**, 68-key
exports map (COHESION §0de — the spec's "7.0.0 / 74-key" owner set reads as the installed 10.1.0).

**This census, not W8.md and not any ledger, is the authority for X.W8.b–e's bounds** (§Archaeology
"New guardrail").

## The four commands, verbatim, with outputs (double-run)

Run 1 and run 2 were separate shell invocations at `f79a79e14`; outputs identical.

```sh
$ find demo/ui -name index.ts | wc -l
bfs: error: demo/ui: No such file or directory.
       0                                                        # run 1: 0 · run 2: 0

$ grep -rEn "from ['\"][^'\"]*ui/(alert|avatar|badge|button|card|checkbox|collapsible|dialog|\
dropdown-menu|input|label|popover|radio-group|select|separator|skeleton|slider|switch|tooltip)['\"]" \
  demo src --include='*.vue' --include='*.ts' | grep -v '^demo/ui/' | wc -l
      96                                                        # run 1: 96 · run 2: 96

$ … | cut -d: -f1 | sort -u | wc -l
      53                                                        # run 1: 53 · run 2: 53

$ grep -rn "\bcn(" demo src --include='*.vue' --include='*.ts' | grep -v shared/utils.ts | wc -l
       0                                                        # run 1: 0 · run 2: 0
```

| command | spec @ `41450f02` | census @ `f79a79e14` |
|---|---|---|
| barrels (`demo/ui/**/index.ts`) | 19 | **0** |
| G-1 grep, statements | 92 | **96** |
| G-1 grep, files | 48 | **53** |
| `cn(` call sites | 0 | **0** |

## Reading the numbers honestly

- **0 barrels.** `demo/ui/` does not exist. It was deleted at X-W12U.k **`2ae7344d2`**
  (⟨`git log --oneline -1 2ae7344d2`⟩ → "refactor(X.W12U.k): A2-VA-L1-8 · L1-19 · L1-23 — one glass
  import grammar (the 19 demo/ui shims deleted, 96 imports re-pointed to subpaths)"). `demo/shared/ui/`
  holds real `.vue` components, not re-export barrels.
- **96 / 53 is not barrel residue.** The regex `[^'"]*ui/(button|…)` also matches the producer's own
  subpaths (`glass-ui/button`). Every one of the 96 hits is an `@mkbabb/glass-ui/<subpath>` specifier:
  ⟨`… | grep -vc "@mkbabb/glass-ui/"`⟩ → **0**. **Filtered local-barrel import count = 0.**
  The figure is 96 because X-W12U.k re-pointed exactly 96 statements (its subject line above).
- **`cn` = 0** call sites; the definition survives only in `demo/shared/utils.ts` (`:4-6`, with 0
  consumers) beside the demo's one `debounce`.
- **Bounds expansion trigger (§Triumvirate Dispatch)**: not tripped — 53 ≤ 55 and every file is
  under `demo/**`; and no barrel exists to be impure. The 53 files are already producer-direct, so
  they are *not* a rewrite set for X.W8.b; the residual narrowness set is the 9 clipboard statements
  below.

### The 96 statements by producer subpath

⟨`… | grep -oE "@mkbabb/glass-ui/[a-z-]+" | sort | uniq -c`⟩ (sum 96):

| subpath | n | subpath | n |
|---|---|---|---|
| `/button` | 29 | `/popover` | 7 |
| `/card` | 9 | `/select` | 7 |
| `/dialog` | 9 | `/input` | 6 |
| `/label` | 7 | `/slider` | 5 |
| `/badge` | 4 | `/collapsible` | 4 |
| `/separator` | 4 | `/tooltip` | 3 |
| `/checkbox` | 1 | `/radio-group` | 1 |

At 10.1.0 the map has no `./forms` (Input ships at `./input`) and no `./dropdown-menu` (`./menu`);
`alert`, `avatar`, `skeleton` match 0 statements as subpaths (no such keys).

### The enumerated file list (53; the spec's "48" superseded)

⟨`… | cut -d: -f1 | sort | uniq -c`⟩ — path (statements). By group ⟨`cut -d/ -f2 | uniq -c`⟩:
palettes 20 · workbenches 8 · shell 7 · shared 6 · picker 5 · scenes 5 · app 1 · test 1 = 53.

- `demo/app/ErrorBoundary.vue` (2)
- `demo/palettes/BrowsePane.vue` (2)
- `demo/palettes/PalettesPane.vue` (2)
- `demo/palettes/admin/UserSortMenu.vue` (1)
- `demo/palettes/admin/panels/AdminAuditPanel.vue` (3)
- `demo/palettes/admin/panels/AdminFlaggedPanel.vue` (3)
- `demo/palettes/admin/panels/AdminNamesPanel.vue` (2)
- `demo/palettes/admin/panels/AdminTagsPanel.vue` (4)
- `demo/palettes/admin/panels/AdminUsersPanel.vue` (3)
- `demo/palettes/admin/panels/PaginationBar.vue` (1)
- `demo/palettes/browser/card/CurrentPaletteEditor.vue` (3)
- `demo/palettes/browser/card/SwatchHoverMenu.vue` (1)
- `demo/palettes/browser/dialog/FlagReportDialog.vue` (3)
- `demo/palettes/browser/dialog/MigratePalettesDialog.vue` (2)
- `demo/palettes/browser/dialog/VersionHistoryDrawer.vue` (2)
- `demo/palettes/browser/search/MiniColorPicker.vue` (2)
- `demo/palettes/browser/search/SearchFilterBar.vue` (4)
- `demo/palettes/browser/search/TagEditPopover.vue` (3)
- `demo/palettes/inspector/PaletteCardMeta.vue` (1)
- `demo/palettes/inspector/PaletteCardSwatches.vue` (1)
- `demo/palettes/inspector/PaletteInspector.vue` (2)
- `demo/picker/ColorPicker.vue` (1)
- `demo/picker/controls/ComponentSliders/ComponentSliders.vue` (2)
- `demo/picker/controls/ComponentSliders/ConsoleRail.vue` (1)
- `demo/picker/debug/PointerDebugOverlay.vue` (1)
- `demo/picker/display/ColorComponentDisplay/ColorComponentDisplay.vue` (1)
- `demo/scenes/ConfigSliderPane.vue` (2)
- `demo/scenes/about/AboutPane.vue` (2)
- `demo/scenes/about/ColorNutritionLabel.vue` (1)
- `demo/scenes/atmosphere/AuroraPane.vue` (2)
- `demo/scenes/notfound/NotFoundPane.vue` (1)
- `demo/shared/ui/ColorSpaceSelector.vue` (1)
- `demo/shared/ui/InterpolationFields.vue` (1)
- `demo/shared/ui/PaletteNameInput.vue` (2)
- `demo/shared/ui/PaletteSpecimen.vue` (1)
- `demo/shared/ui/PaneHeader.vue` (1)
- `demo/shared/ui/SwatchButton.vue` (1)
- `demo/shell/PaneErrorPlate.vue` (2)
- `demo/shell/PaneLoadingPlate.vue` (1)
- `demo/shell/PaneShell.vue` (1)
- `demo/shell/dock/ActionButton.vue` (1)
- `demo/shell/dock/ColorInput.vue` (3)
- `demo/shell/dock/DockViewSelect.vue` (1)
- `demo/shell/dock/layers/SlugEditLayer.vue` (1)
- `demo/test/shell/reka-binding-idiom.test.ts` (1)
- `demo/workbenches/extract/ExtractControls.vue` (2)
- `demo/workbenches/extract/ExtractWorkbench.vue` (1)
- `demo/workbenches/extract/ImageDropZone.vue` (1)
- `demo/workbenches/generate/GenerateControls.vue` (4)
- `demo/workbenches/gradient/GradientVisualizer/GradientStopInspector.vue` (1)
- `demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue` (4)
- `demo/workbenches/mix/MixConfigBar.vue` (2)
- `demo/workbenches/mix/MixSourceSelector.vue` (2)

## The `debounce` importers (11; the spec's "7" superseded)

⟨`grep -rln "shared/utils" demo src test --include='*.vue' --include='*.ts' | sort`⟩ → 11, every
one `import { debounce } from "…/shared/utils"` (no file imports `cn`):

1. `demo/app/composables/boot/useAtmosphere.ts:33`
2. `demo/app/composables/usePaletteWiring.ts:24`
3. `demo/color-session/useColorNameResolution.ts:2`
4. `demo/color-session/useColorParsing.ts:2`
5. `demo/color-session/useColorPersistence.ts:3`
6. `demo/color-session/useColorPipeline.ts:2`
7. `demo/color-session/useColorUrl.ts:8`
8. `demo/palettes/admin/composables/useAdminUsers.ts:16`
9. `demo/palettes/admin/panels/AdminAuditPanel.vue:169`
10. `demo/workbenches/extract/composables/useExtractSession.ts:36`
11. `demo/workbenches/gradient/GradientVisualizer/GradientCodeEditor.vue:3`

These eleven are X.W8.b's "debounce importers" row (re-home to `demo/shared/debounce.ts`).

## Root-barrel clipboard statements (9) — narrower owner `./dom` at 10.1.0

`useClipboard`/`writeClipboard` ship at `@mkbabb/glass-ui/dom` (⟨`node -p "…exports['./dom']"`⟩ →
`{"types":"./dist/dom.d.ts","import":"./dist/dom.js"}`; `dist/dom.js:238` exports `o as useClipboard`,
`a as writeClipboard`). ⟨`grep -rnE "(useClipboard|writeClipboard)" demo | grep import`⟩ → 12
statements; 3 already at `/dom` (`App.vue:220`, `ColorPicker.vue:154`, `SlugEditLayer.vue:6`);
**9 at the root barrel `"@mkbabb/glass-ui"`**:

1. `demo/workbenches/gradient/GradientVisualizer/GradientEasingEditor.vue:30` — `useClipboard`
2. `demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue:12` — `useClipboard`
3. `demo/workbenches/mix/MixPane.vue:12` — `writeClipboard`
4. `demo/workbenches/mix/MixResultDisplay.vue:5` — `useClipboard`
5. `demo/workbenches/generate/GenerateControls.vue:14` — `useClipboard, writeClipboard`
6. `demo/scenes/ConfigSliderPane.vue:21` — `useClipboard`
7. `demo/shell/dock/ColorInput.vue:121` — `writeClipboard`
8. `demo/palettes/inspector/PaletteInspector.vue:175` — `writeClipboard`
9. `demo/palettes/browser/card/composables/useSwatchActions.ts:5` — `writeClipboard`

### Root-barrel statements that are already narrowest (recorded, not cut)

⟨`grep -rnE "from ['\"]@mkbabb/glass-ui['\"]" demo | wc -l`⟩ → 16 = the 9 above + 7 root-only:
`Accordion*` (`GradientEasingEditor.vue:29`) · `Alert*` (`Markdown.vue:35`) · `Skeleton`
(`Markdown.vue:36`, `shared/ui/PaletteCardSkeleton.vue:113`, `palettes/admin/panels/AdminTagsPanel.vue:212`,
`palettes/admin/panels/AdminListSkeleton.vue:22`, `palettes/browser/dialog/VersionHistoryDrawer.vue:129`).
⟨`Object.keys(exports).filter(/alert|skeleton|accordion|avatar|forms|dom/)`⟩ → `./dom` only: no
subpath exists for these at 10.1.0 (producer relay "alert-skeleton-subpaths" 2026-10-13, already in BK).

## Moved and deleted paths (bounds drift since `41450f02`)

| spec path | at `f79a79e14` | receipt |
|---|---|---|
| `demo/palettes/browser/admin/**` (index.ts · 4 panels · `useAdminUsers.ts`) | `demo/palettes/admin/**` — `panels/{AdminAudit,AdminFlagged,AdminTags,AdminUsers,AdminNames,AdminListSkeleton,AdminListItem,PaginationBar}*.vue`, `panels/index.ts`, `composables/useAdmin{Users,Tags,Flagged,Audit}.ts`, `UserSortMenu.vue`, `AdminPane.vue` | ⟨`ls -d demo/palettes/browser/admin`⟩ → No such file; ⟨`find demo/palettes/admin -type f`⟩ → 15 files |
| `demo/palettes/useAdminUsers.ts` | `demo/palettes/admin/composables/useAdminUsers.ts` | find |
| `demo/palettes/usePalettePorts.ts` | unmoved | ⟨`find demo -name usePalettePorts.ts`⟩ → `demo/palettes/usePalettePorts.ts` |
| `demo/picker/visual/PointerDebugOverlay.vue` | `demo/picker/debug/PointerDebugOverlay.vue` | ⟨`ls demo/picker/debug/`⟩ → `DebugEventLog.vue PointerDebugOverlay.vue usePointerDebug.ts` |
| `demo/shell/dock/ActionToolbar.vue` | **deleted** at `c00004924` (X-W12U.k, "the retired ActionToolbar.vue is deleted") | ⟨`git show --stat c00004924 \| grep ActionToolbar`⟩ → `demo/shell/dock/ActionToolbar.vue \| 121 --------` |
| `demo/ui/**` (19 `index.ts`) | **deleted** at `2ae7344d2` | above |

## `tw-animate-css` retention receipt (G-4's measured clause)

```sh
$ grep -n '"tw-animate-css"' package.json            → package.json:113: "tw-animate-css": "^1.4.0"
$ grep -n tw-animate-css demo/styles/*.css           → demo/styles/foundation.css:2: @import "tw-animate-css";
$ node -p "require('./node_modules/tw-animate-css/package.json').version"   → 1.4.0
$ grep -oE "sheet-animate\{@apply[^;]*;" node_modules/@mkbabb/glass-ui/dist/styles/utilities/btn.css
  → @utility sheet-animate{@apply data-[state=open]:animate-in data-[state=closed]:animate-out
    data-[state=open]:fade-in data-[state=closed]:fade-out data-[state=open]:duration-[…] …;}
$ node -p "require('./node_modules/@mkbabb/glass-ui/package.json').peerDependencies['tw-animate-css']"
  → ^1.2.5
$ grep -rl sheet-animate node_modules/@mkbabb/glass-ui/dist --include='*.js'   → motion-BvV1_24p.js
$ grep -rnoE "\b(animate-in|animate-out|fade-in|fade-out|zoom-in|slide-in-from)[a-z0-9-]*" demo \
    --include='*.vue' --include='*.ts' --include='*.css' | grep -v vite-critic | wc -l   → 0
```

Reading: the demo authors **0** tw-animate classes; the producer's `sheet-animate` utility `@apply`s
`animate-in` / `animate-out` / `fade-in` / `fade-out` (tw-animate-css classes), its JS emits the
`sheet-animate` class, and glass-ui 10.1.0 declares `tw-animate-css` as a **peerDependency** (`^1.2.5`)
— the consumer's declaration plus `foundation.css:2`'s import is what satisfies it. Deleting the
dependency would leave the producer's `@apply` unresolvable at the consumer's Tailwind build.
**Retained, measured.** (`foundation.css` itself is out of every W8 unit's bounds — §File Bounds.)

## Configuration / dependency residue at the census SHA (input to X.W8.b)

- ⟨`ls components.json`⟩ → present.
- ⟨`git show f79a79e14:package.json | grep -n '"clsx"\|"tailwind-merge"\|"tw-animate-css"'`⟩ →
  `:102 "clsx": "^2.1.1"` · `:111 "tailwind-merge": "^3.6.0"` · `:113 "tw-animate-css": "^1.4.0"`.
- `demo/shared/utils.ts` present: `:1-6` import `clsx`/`twMerge` and define `cn` (0 consumers);
  `:8-` the demo's one `debounce` (11 importers, above).
- ⟨`grep -c 'demo/@' eslint.config.js`⟩ → **8** (re-measured here; matches the record's Baseline G-4 row).

## Prior figures — UNREPRODUCED (L-9)

| figure | source | status |
|---|---|---|
| **90 / 48** ("90 imports across 48 files") | V·MT6 (MECHANISM-CUT-FORMATION-MAP §V·MT6, CANDIDATE) and V·C5 (CONVERGENCE-RESUME §V·C5, NOT-STARTED) | **UNREPRODUCED** — no command was ever recorded (L-9); `PROV C-16`/`K-29` rule it UNPROVEN in both directions |
| **107 / 49** | a later audit lane | **UNREPRODUCED** — measured by an equally unrecorded method (L-9) |
| 92 / 48 | W8.md G-1 @ `41450f02` | recorded command, superseded by the bytes: X-W12U.k `2ae7344d2` deleted the barrels between that SHA and this one |

Both unrecorded figures are **superseded** by this census: at `f79a79e14` the recorded commands read
**0 barrels · 96 statements / 53 files (all producer subpaths; 0 local-barrel) · 0 `cn`**.

## Falsifier (G-1)

Re-run the four commands above at `f79a79e14` (or `d17dece5a`, product-identical). Any number other
than 0 / 96 / 53 / 0 falsifies this census, and the bounds of X.W8.b–e with it.
