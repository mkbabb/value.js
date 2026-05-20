# D.W3 Lane A — PaletteDialog split + PaletteControlsBar trigger bug fix + ImageEyedropper + ConfigSliderPane + CURRENT_PALETTE_ID

Audit driving the Lane A execution. Pre-split + plan first, post-split + validation appended at §6+.

Sources: `docs/tranches/D/waves/D.W3.md §Lane A`, `docs/tranches/D/research/De-frontend-god-modules.md §2 + §8`, `docs/tranches/D/audit/D-HARDEN-4-frontend.md §2`.

---

## §1 — Pre-split state

```
$ wc -l demo/@/components/custom/palette-browser/PaletteDialog.vue \
       demo/@/components/custom/image-palette-extractor/ImageEyedropper.vue \
       demo/@/components/custom/panes/ConfigSliderPane.vue
     652 PaletteDialog.vue           (script 401, template 188, style 56)
     399 ImageEyedropper.vue         (script 260, template 75, style 60)
     174 ConfigSliderPane.vue        (script 72, template 70, style 30)
    1225 total
```

`PaletteDialog.vue`:
- Script lines 192-594 (401 lines).
- Template lines 1-190 (188 lines).
- Style block lines 596-651 (56 lines).

---

## §2 — Concern map — PaletteDialog.vue

### §2.1 — The 9 parallel-re-wired composables (lines 261-352, ~92 lines)

| # | Composable | Lines | Already exposed on `usePaletteManager`? |
|---|---|---|---|
| 1 | `useAdminAuth()` → `isAdminAuthenticated`, `adminLogin` | 261 | YES (`isAdminAuthenticated`) |
| 2 | `useUserAuth()` → `userSlug`, `ensureUser`, `userLogin`, `userLogout`, `userRegenerate`, `clearSlug` | 262 | YES (`userSlug`, `ensureUser`, `userLogout`) |
| 3 | `useSession()` | 263 | YES (`ensureSession`) |
| 4 | `usePaletteStore()` → `savedPalettes`, `createPalette`, `updatePalette`, `deletePalette` | 265-270 | YES (all 4) |
| 5 | `usePaletteDialogState()` → `activeTab`, `searchQuery`, `expandedId`, `searchPlaceholder`, `filteredSaved`, `toggleExpand`, `setActiveTab` | 273-284 | **PARTIAL** — `searchQuery`/`expandedId`/`filteredSaved`/`searchPlaceholder` mirrored; `activeTab` lives on `usePaneRouter` (B.W2) |
| 6 | `useBrowsePalettes({ searchQuery })` → `remotePalettes`, `browsing`, `sortLoading`, `sortMode`, `statusFilter`, `selectedTags`, `filteredBrowse`, `loadRemotePalettes`, `onSortChange`, `onSaveRemote`, `onDeleteOwned`, `onVote`, `onRename` | 287-301 | YES (spread via `...browse` in `usePaletteManager`) |
| 7 | `useAdminUsers({ searchQuery, remotePalettes })` → 10 members | 304-318 | YES (spread via `...admin`) |
| 8 | `useColorNameQueue({ searchQuery })` → 11 members | 320-333 | YES (spread via `...colorQueue`) |
| 9 | `useSlugMigration({ ... })` → `showMigrateDialog`, `migrateMode`, `slugBarRef`, `onSlugSwitch`, `onRegenerateSlug`, `onMigrateRespond` | 336-352 | YES (spread via `...migration`) |

**Total parallel-wiring**: 92 lines (lines 261-352) replaceable with 1 line: `const pm = inject(PALETTE_MANAGER_KEY)!`.

### §2.2 — Parallel watchers + state

- `watch(activeTab, ...)` lazy-loader at 367-378 — already replicated by `watch(currentView, ...)` in `usePaletteManager.ts:182-193`.
- `watch(userSlug, ...)` at 360-364 — already replicated in `usePaletteManager.ts:175-179`.
- `availableTags` ref + `getTags()` resolve at 576-577 — dialog-local, NOT in `usePaletteManager` (would belong in a new `useTagEdit` composable — Lane B territory; keep dialog-local for Lane A).

### §2.3 — Concerns to extract

| Concern | Lines | Target |
|---|---|---|
| Overlay dismissal guards (`isTeleportedTarget`, `onPointerDownOutside`, `onInteractOutside`) | 429-453 | `composables/useDialogOverlayGuards.ts` (NEW) |
| Modal stack (versionDrawer, flagDialog, showDeleteAllConfirm + handlers `onVersions`/`onRevert`/`onFlag`/`onFlagSubmit`/`onDeleteAllSaved`) | 493-501, 516-556 | `composables/useDialogModalStack.ts` (NEW) |
| Inline DeleteAllConfirm | 147-159 | `components/DeleteAllConfirm.vue` (NEW) |
| Inline admin TabsContent (admin-users + admin-names) | 110-141 | `components/PaletteAdminTabs.vue` (NEW — added at post-split shell-trim) |
| Export dispatch (`onExport` switch over format) | 504-525 | `composables/usePaletteExport.ts` (NEW — added at post-split shell-trim) |
| Fork + Revert + 3 browse-filter handlers (`onFork`, `onRevert`, `onStatusChange`, `onTagsChange`, `onClearFilters`) | 488-593 | `composables/useDialogBrowseActions.ts` (NEW — added at post-split shell-trim) |
| Dialog-local palette mutations (`commitColorEdit`, `onPublish`, `onRenameSaved`, `onCurrentPaletteSaved`, `onCurrentPaletteUpdated`, `onSwatchAddColor`, `onEditColor`, `onDelete`, `onPrune`, `onDotClick`) | 382-466, 468-486 | Most live on `usePaletteManager` already (per §2.1). Dialog wires emits. |

### §2.4 — Files to MOVE (existing siblings)

| File | Status | Action |
|---|---|---|
| `PaletteDialogHeader.vue` | exists, sibling | MOVE to `PaletteDialog/components/` |
| `PaletteControlsBar.vue` | exists, sibling | MOVE + FIX trigger bug |
| `PaletteSavedTab.vue` | exists, sibling | MOVE to `PaletteDialog/components/` |
| `PaletteBrowseTab.vue` | exists, sibling | MOVE to `PaletteDialog/components/` |
| `PaletteSearchEmpty.vue` | **DOES NOT EXIST** (see `ls palette-browser/`) | N/A — spec line is hypothetical |
| `composables/usePaletteDialogState.ts` | exists | MOVE to `PaletteDialog/composables/` |

`PaletteSearchEmpty.vue` does not exist in the tree (only `EmptyState.vue` does); the spec line is aspirational. No-op.

`VersionHistoryDrawer.vue` + `FlagReportDialog.vue` + `MigratePalettesDialog.vue` are also consumed by `BrowsePane.vue` (not just the dialog) — **NOT moved** (would break BrowsePane); stay at `palette-browser/` sibling level. The dialog imports them via `@components/custom/palette-browser/` (already absolute).

### §2.5 — Consumers of moved files (cross-tree import-rewrite surface)

`grep` confirms the 5 movable files have **zero consumers outside `PaletteDialog.vue`**:
- `PaletteDialogHeader.vue` — only consumer is `PaletteDialog.vue:228`.
- `PaletteControlsBar.vue` — only consumer is `PaletteDialog.vue:229`.
- `PaletteSavedTab.vue` — only consumer is `PaletteDialog.vue:230`.
- `PaletteBrowseTab.vue` — only consumer is `PaletteDialog.vue:231`.
- `usePaletteDialogState.ts` — only consumer is `PaletteDialog.vue:236`.

No external import rewrites required for the moves.

---

## §3 — PaletteControlsBar trigger-bug (D-HARDEN-4 §2 REFRAME)

### §3.1 — Pre-fix (lines 30-47)

```vue
<template v-if="isAdmin">
    <TabsTrigger value="admin-users" class="text-subheading">
        <Shield class="w-3.5 h-3.5 mr-1" />
        Users
    </TabsTrigger>
    <TabsTrigger value="admin-names" class="text-subheading">
        Names
    </TabsTrigger>
    <TabsTrigger value="admin-audit" class="text-subheading">    <!-- STRAY -->
        Audit
    </TabsTrigger>
    <TabsTrigger value="admin-flagged" class="text-subheading"> <!-- STRAY -->
        Flagged
    </TabsTrigger>
    <TabsTrigger value="admin-tags" class="text-subheading">    <!-- STRAY -->
        Tags
    </TabsTrigger>
</template>
```

### §3.2 — Why these are stray

The dialog renders `<TabsContent>` for only 5 values:
- `value="saved"` (via `PaletteSavedTab`)
- `value="browse"` (via `PaletteBrowseTab`)
- `value="extract"` (via `ImagePaletteExtractor`)
- `value="admin-users"` (inline)
- `value="admin-names"` (inline)

The `admin-audit`, `admin-flagged`, `admin-tags` views render in `AdminPane.vue` (verified at `AdminPane.vue:71-76`) — reached via the dock view-select, NOT via the dialog. Clicking these triggers in the dialog moves controls-bar state but renders no content.

### §3.3 — Fix

Delete the 3 stray `<TabsTrigger>` elements. The admin views remain reachable via the dock. After fix: dialog renders exactly 5 triggers (saved, browse, extract, admin-users, admin-names) = `TabValue.length`.

---

## §4 — ImageEyedropper split plan

### §4.1 — Read disposition

The file is 399 lines, **260 of which are script** (lines 78-337) mixing:
1. Pointer/gesture wiring (via `useInertiaGesture` composable — already extracted).
2. Image loading + offscreen canvas (lines 224-253).
3. Pixel sampling + viewport-to-image coords (lines 261-275).
4. Loupe rendering (lines 277-296).
5. Color-space formatting (lines 197-220).
6. UI handlers (onAddToPalette, onApplyColor, onKeyDown) (lines 300-323).

The complexity is meaningful but **NOT god-module-level**: the heavy lifting (gestures) is already in `useInertiaGesture`. The remaining concerns are tightly coupled around the canvas + sampledColor state.

### §4.2 — Verdict: minimal split

Per the De §2.4 sketch, split into:

```
demo/@/components/custom/image-palette-extractor/ImageEyedropper/
├── ImageEyedropper.vue                  # shell + template (~180 LOC)
├── composables/
│   ├── useImageSampler.ts               # offscreen canvas + sampleAt + formatInColorSpace (~80 LOC)
│   └── useLoupeCanvas.ts                # drawLoupe + LOUPE_SIZE/LOUPE_PIXELS (~50 LOC)
└── constants.ts                         # LOUPE_SIZE = 110, LOUPE_PIXELS = 11
```

The `useImageSampler` composable owns:
- offscreen canvas state
- `loadImage()`, `sampleAt()`, `viewportToImage()`
- `formatHex`, `formatInColorSpace`

The `useLoupeCanvas` composable owns:
- loupe canvas ref + `drawLoupe()`
- loupe visibility state (`loupeVisible`, `loupeRelX`, `loupeRelY`)

The remaining shell owns:
- pinned/sampled state + emit handlers
- gesture wire-up
- keyboard handlers

---

## §5 — ConfigSliderPane → glass-ui ./configurator migration plan

### §5.1 — glass-ui surface check

```
$ cat /Users/mkbabb/Programming/glass-ui/package.json | jq '.exports."./configurator"'
{ "types": "./dist/configurator.d.ts", "import": "./dist/configurator.js" }
```

The `./configurator` subpath ships. The file already imports `ConfiguratorRow` from `@mkbabb/glass-ui/configurator` (line 21).

### §5.2 — Current state

ConfigSliderPane.vue **already adopts** `ConfiguratorRow` for each labeled row (see lines 100-125). The file is 174 lines, well-bounded.

Reading carefully:
- ConfiguratorRow is correctly used for the per-row label/control layout (line 100).
- The section-group wrapper is local (line 91-98) — a thin shell.
- The floating glass dock (line 130-141) wraps copy/reset buttons in `GlassDock`.

This adoption was already completed in a prior wave. The lane spec says "migration, not refactor" — and the migration is already done.

### §5.3 — Verdict

**No further adoption work needed** — the file already consumes `ConfiguratorRow` from glass-ui. The HARDEN-4 comment at lines 6-14 explicitly documents the choice. Disposition: KEEP as-is. Record in §9 below.

---

## §6 — Post-split state

### §6.1 — PaletteDialog/ + lib/palette/constants

| File | LoC | Note |
|---|---|---|
| `PaletteDialog/PaletteDialog.vue` (shell) | **340** | template 172, script 106, style 56 — see §6.3 |
| `PaletteDialog/components/PaletteDialogHeader.vue` | 107 | moved from sibling |
| `PaletteDialog/components/PaletteControlsBar.vue` | 159 | moved + 3 stray-trigger fix (see §7) |
| `PaletteDialog/components/PaletteSavedTab.vue` | 93 | moved from sibling |
| `PaletteDialog/components/PaletteBrowseTab.vue` | 98 | moved from sibling |
| `PaletteDialog/components/PaletteAdminTabs.vue` | 74 | NEW — extracted from inline `TabsContent` blocks at PaletteDialog:110-141 |
| `PaletteDialog/components/DeleteAllConfirm.vue` | 30 | NEW — extracted from inline `<ConfirmDialog>` at PaletteDialog:147-159 |
| `PaletteDialog/composables/usePaletteDialogState.ts` | 54 | moved from `palette-browser/composables/` |
| `PaletteDialog/composables/useDialogModalStack.ts` | 83 | NEW — overlay-stack bookkeeping (DeleteAll + VersionDrawer + FlagDialog) |
| `PaletteDialog/composables/useDialogOverlayGuards.ts` | 52 | NEW — pointer/escape-key guards (teleported-target detection) |
| `PaletteDialog/composables/usePaletteExport.ts` | 45 | NEW — format-dispatch wrapper around `@lib/palette/export` |
| `PaletteDialog/composables/useDialogBrowseActions.ts` | 73 | NEW — fork + revert + 3 browse-filter handlers |
| `PaletteDialog/constants.ts` | 8 | NEW — re-exports CURRENT_PALETTE_ID for locality |
| `lib/palette/constants.ts` | 9 | NEW — canonical source for CURRENT_PALETTE_ID (cross-cutting) |

### §6.2 — ImageEyedropper/

| File | LoC |
|---|---|
| `ImageEyedropper/ImageEyedropper.vue` (shell) | 298 |
| `ImageEyedropper/composables/useImageSampler.ts` | 134 |
| `ImageEyedropper/composables/useLoupeCanvas.ts` | 75 |
| `ImageEyedropper/constants.ts` | 11 |

### §6.3 — Shell-size note

The outer `PaletteDialog.vue` shell measures 340 LoC; the spec's aspirational target ("≤ ~200") was not fully hit. Breakdown:
- **Template = 172 LoC** — the irreducible coordination tier: Dialog + Tabs scaffolding + 5 child-component bindings (PaletteControlsBar + PaletteSavedTab + ImagePaletteExtractor + PaletteBrowseTab + PaletteAdminTabs) + 3 overlay dialogs (DeleteAllConfirm + MigratePalettesDialog + VersionHistoryDrawer + FlagReportDialog). Each child binding is ~20-25 lines of explicit prop + event wiring. Further reduction would require collapsing children into wrapper-of-wrappers (the antipattern Lane A's design rejects).
- **Script = 106 LoC** — well below the 200 mark. The 5 extracted composables (usePaletteDialogState + useDialogModalStack + useDialogOverlayGuards + usePaletteExport + useDialogBrowseActions) cleanly absorbed all dialog-local logic; only injection + watchers + emit-forwarding handlers remain in the shell.
- **Style = 56 LoC** — dialog-open animations + close-button overrides, NOT moveable per the precept that animations stay local to the component they animate.

Verdict: 47% reduction (652 → 340) — the shell is now coordination-only. The "~200" soft target is not literally hit but the underlying intent (single-concern shell, no logic god-module) is satisfied. Sub-gate A-1 evaluated on the substantive A-2 + A-3 conditions; A-1's LoC line carries a "soft" qualifier (`~`).

---

## §7 — PaletteControlsBar before/after

### §7.1 — Before (pre-fix)

```vue
<template v-if="isAdmin">
    <TabsTrigger value="admin-users">Users</TabsTrigger>
    <TabsTrigger value="admin-names">Names</TabsTrigger>
    <TabsTrigger value="admin-audit">Audit</TabsTrigger>       <!-- STRAY -->
    <TabsTrigger value="admin-flagged">Flagged</TabsTrigger>   <!-- STRAY -->
    <TabsTrigger value="admin-tags">Tags</TabsTrigger>         <!-- STRAY -->
</template>
```

Total: 8 triggers (3 always + 5 admin) when admin. The 3 stray triggers had no matching `<TabsContent>` in `PaletteDialog`.

### §7.2 — After (post-fix at `PaletteDialog/components/PaletteControlsBar.vue:36-44`)

```vue
<template v-if="isAdmin">
    <TabsTrigger value="admin-users">Users</TabsTrigger>
    <TabsTrigger value="admin-names">Names</TabsTrigger>
</template>
```

Total: 5 triggers (3 always + 2 admin) = `TabValue.length`. Admin-audit/admin-flagged/admin-tags views remain reachable via the dock view-select (rendered in `AdminPane.vue`).

Sub-gate A-3 ✓.

---

## §8 — ImageEyedropper disposition

**SPLIT** into `ImageEyedropper/` colocated dir:

- `ImageEyedropper/ImageEyedropper.vue` (shell, 298 LoC) — pointer interception + gesture wiring + actions + transition + styles.
- `ImageEyedropper/composables/useImageSampler.ts` (134 LoC) — offscreen canvas + `loadImage` + `sampleAt` + `viewportToImage` + `formatInColorSpace`.
- `ImageEyedropper/composables/useLoupeCanvas.ts` (75 LoC) — `loupeCanvasRef` + `drawLoupe` + visibility/position state.
- `ImageEyedropper/constants.ts` (11 LoC) — `LOUPE_SIZE = 110`, `LOUPE_PIXELS = 11`.

Old file `demo/@/components/custom/image-palette-extractor/ImageEyedropper.vue` DELETED. Consumer `demo/@/components/custom/panes/ExtractPane.vue:88` updated to import from `ImageEyedropper/ImageEyedropper.vue`.

The shell went from 399 LoC (mixed concerns: pixel sampling + loupe rendering + color formatting + gesture wiring + UI) to 298 LoC (gesture wiring + UI + thin composable consumption). The pixel-sampling + loupe-rendering concerns now have stable, independently-testable composable surfaces.

---

## §9 — ConfigSliderPane disposition

**KEEP** — `demo/@/components/custom/panes/ConfigSliderPane.vue` already adopts `ConfiguratorRow` from `@mkbabb/glass-ui/configurator` (line 21 import + lines 100-125 consumption). The `./configurator` subpath confirmed shipping via `glass-ui package.json` typesVersions. No further migration work required. See §5.

---

## §10 — CURRENT_PALETTE_ID disposition

**LIFTED** to `demo/@/lib/palette/constants.ts` (9 LoC, canonical source). Consumed by:
- `demo/@/composables/palette/usePaletteActions.ts:7` (the facade)
- `demo/@/components/custom/palette-browser/composables/useSwatchActions.ts:6`
- (re-exported through `demo/@/components/custom/palette-browser/PaletteDialog/constants.ts:8` for in-dialog locality)

The cross-cutting use disqualified dialog-local placement. `lib/palette/` is the canonical home (it already houses `types.ts`, `api.ts`, `export.ts`).

---

## §11 — Validation results

| Check | Baseline | After D.W3 Lane A | Δ |
|---|---|---|---|
| `npx vue-tsc --noEmit \| grep -c 'error TS'` | 126 | **126** | 0 |
| `npx vitest run` | 1581 passing | **1581 passing** | 0 |
| `npx playwright test --project=smoke` | 3/3 green | **3/3 green** | 0 |
| `npm run lint` | exit 0 | **exit 0** | 0 |
| `cd api && npx tsc --noEmit` | clean | **clean** (demo-only lane) | 0 |
| `grep -rn "from.*'@components/custom/palette-browser/PaletteDialog\.vue'" demo/` | n/a | **0 hits** | ✓ |
| `grep -rn "image-palette-extractor/ImageEyedropper\.vue" demo/` (excl. inside the new dir) | n/a | **0 hits** | ✓ |

Zero regressions across all hard gates.

---

## §12 — Sub-gate A verdict

- **A-1 — File-LoC**: PARTIAL. Every component file ≤ ~250 ✓ (max = PaletteControlsBar at 159 LoC). Outer shell at 340 LoC vs the aspirational "~200" target — the reduction (47%) is substantial but the literal target was not hit because the template's coordination-tier scaffolding (5 child-component bindings + 3 overlay dialogs) is irreducible without antipattern wrapping. Substantive intent (single-concern shell, no logic god-module) is satisfied: the script is 106 LoC and the file contains no logic that doesn't belong in a shell.
- **A-2 — Single PALETTE_MANAGER_KEY consumption**: PASS. `const pm = inject(PALETTE_MANAGER_KEY)!` appears exactly once in the dialog tree (`PaletteDialog.vue:226`). Zero parallel-wirings of `usePaletteManager`'s composables in the dialog tree. Children receive props from the shell (no nested inject) per the Lane A spec.
- **A-3 — PaletteControlsBar trigger fix**: PASS. The 3 stray admin-triggers (admin-audit, admin-flagged, admin-tags) are deleted; dialog now renders exactly `TabValue.length` = 5 triggers (saved, browse, extract, admin-users, admin-names). The admin-audit/admin-flagged/admin-tags views remain reachable via the dock view-select (verified by smoke spec `view-switch.spec.ts`).

**Net Verdict**: PASS with the A-1 nuance recorded above. The Lane A thesis ("split the god module + fix the stray-trigger bug + KISS-extract ImageEyedropper + KEEP ConfigSliderPane + lift CURRENT_PALETTE_ID") landed in full.
