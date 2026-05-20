# demo/

Vue 3.5 color picker app. Serves as the live demo at [color.babb.dev](https://color.babb.dev).

Design idioms catalog: see `demo/DESIGN.md` (the 133-line authoritative catalog landed at D.W4 Lane B — Token architecture, Type scale, Surfaces, Shadows, Radii, Motion, Z-tier, Color, Layout, Idioms NOT used, with cross-references to glass-ui's DESIGN.md and concrete `style.css` line ranges).

## Structure

```
demo/
├── color-picker/
│   ├── App.vue               # main shell; usePaneRouter source-of-truth (B.W2); URL↔model sync; dark mode
│   ├── index.html            # Vite entry
│   ├── vite.d.ts             # .vue + .md module declarations
│   └── public/CNAME          # GitHub Pages domain
├── DESIGN.md                 # design-idiom catalog (D.W4 Lane B, 133 lines, 10 sections)
├── @/
│   ├── components/
│   │   ├── custom/           # maintained components — see subtrees below
│   │   └── ui/               # shadcn-vue (reka-ui) — DO NOT hand-edit;
│   │                         #   ui/alert is a glass-ui re-export (B.W2); ui/table retired (B.W2)
│   ├── composables/          # composables — auth/, color/, palette/, root utils + viewSchema.ts + usePaneRouter.ts
│   ├── lib/palette/          # palette API client, types, constants (CURRENT_PALETTE_ID — D.W3 Lane A), utils
│   ├── styles/               # style.css (Tailwind v4 @theme tokens + 5 new bridge declarations — D.W4 Lane A)
│   └── utils/                # cn() — clsx + tailwind-merge
```

## Custom components (`@/components/custom/`)

Post-Mar-2026 restructure + B + D consolidations. Each subtree is colocated (component shells + sub-components + composables + constants together).

### color-picker/

Organised into `controls/`, `display/`, `editing/`, `visual/`, `composables/` subdirs (Mar-2026 restructure).

| Subdir | Highlights |
|---|---|
| `ColorPicker.vue` | top-level shell |
| `controls/` | `ColorInput`, `ComponentSliders` (has `pointercancel`/`lostpointercapture` for reka-ui slider pointer-capture leaks), space selector |
| `display/` | `ColorNutritionLabel`, copy actions |
| `editing/` | `EditDrawer`, `ActionToolbar`, `ActionButton` |
| `visual/` | `SpectrumCanvas`, `HeroBlob`, `PointerDebugOverlay` (dev-only, injected via `POINTER_DEBUG_KEY`) |
| `composables/` | `useColorModel`, `useColorParsing`, `useSliderGradients`, `useColorNameResolution`, `useColorUrl`, `useCustomColorNames` (named KEEP: directly imports `@lib/palette/api`), `usePointerDebug`, `useHoverPopover`, `useTouchGate`, etc. |
| `keys.ts` | `CSS_COLOR_KEY`, `EDIT_TARGET_KEY`, `POINTER_DEBUG_KEY` injection keys (provide/inject pattern) |

`cssColorOpaque` is injected via `CSS_COLOR_KEY` (not prop-drilled). `activeEditTarget` via `EDIT_TARGET_KEY`.

### palette-browser/

| Component / Subdir | Purpose |
|---|---|
| `PaletteDialog/` | **13-file colocated dir** (D.W3 Lane A; was 652-LoC god module). Contains `PaletteDialog.vue` (340 LoC shell) + `components/` (6 SFCs: `PaletteAdminTabs`, `PaletteBrowseTab`, `PaletteControlsBar`, `PaletteDialogHeader`, `PaletteSavedTab`, `DeleteAllConfirm`) + `composables/` (5 composables: `usePaletteDialogState` with type-level enforcement assertion, `useDialogBrowseActions`, `useDialogModalStack`, `useDialogOverlayGuards`, `usePaletteExport`) + `constants.ts` |
| `PaletteCard.vue` + `PaletteCardGrid.vue` + `PaletteCardMenu.vue` + `PaletteCardSkeleton.vue` + `PaletteColorStrip.vue` | palette display tiles |
| `CurrentPaletteEditor.vue` | swatch grid, add/save/duplicate |
| `AdminPanel.vue` + `AdminNamesPanel.vue` + `AdminUsersPanel.vue` + `AdminFlaggedPanel.vue` + `AdminTagsPanel.vue` + `AdminAuditPanel.vue` + `AdminColorQueue.vue` + `AdminAuthGate.vue` + `AdminPaletteOps.vue` + `AdminListItem.vue` | admin panel components — consume `pm.audit`/`pm.flagged`/`pm.tags` sub-objects of the palette-manager facade |
| `MigratePalettesDialog.vue`, `FlagReportDialog.vue` | dialogs |
| `PaletteSlugBar.vue`, `PaletteRenameInput.vue` | slug editing |
| `SortFilterMenu.vue`, `UserSortMenu.vue`, `SearchFilterBar.vue`, `SwatchHoverMenu.vue` | filtering UI |
| `TagEditPopover.vue` | consumes `pm.tagEdit` sub-object |
| `VersionHistoryDrawer.vue` | consumes `pm.versions` sub-object |
| `MiniColorPicker.vue`, `EmptyState.vue`, `PaginationBar.vue`, `BulkActionToolbar.vue`, `ActionFeedback.vue` | utility primitives |

### image-palette-extractor/

| File | Purpose |
|---|---|
| `ImagePaletteExtractor.vue` | shell |
| `ImageEyedropper/` | **4-file colocated split** (D.W3 Lane A; was 399-LoC) |
| `ExtractControls.vue`, `ImageDropZone.vue` | controls |
| `composables/` | extraction helpers |

### Other subtrees

| Subtree | Purpose |
|---|---|
| `dock/` | top-dock + dock-menus + layers (Mar-2026 rename from `top-dock/`); `GlassDock.vue` lives here |
| `goo-blob/` | **WebGL2 metaball blob** (Apr-2026); `useMetaballRenderer.ts` (`cssColorToRgb` memoised 256-entry cap, D.W3 Lane C); `useBlobMood`, `useBlobPointer`, `useBlobSatellites`; `BlobConfig` reactive via `BLOB_CONFIG_KEY`; consumes glass-ui pending — extirpation routes to a successor tranche post-glass-ui-ship |
| `gradient/` | gradient editing + `composables/` |
| `mix/` | color mixing + `composables/` |
| `generate/` | palette generation |
| `markdown/` | dynamic .md loader with KaTeX + highlight.js |
| `katex/` | standalone KaTeX renderer |
| `panes/` | pane shell + header (consumes `usePaneRouter` registry) |
| `svg-filters/` | reusable SVG filter defs |
| `watercolor-dot/` | organic blob button — extirpation routes to successor tranche (BlobDot ship pending) |
| `dark-mode-toggle/` | animated sun/moon SVG toggle |

## Composables (`@/composables/`)

Organised by domain (Mar-2026 restructure) plus root utilities + the D.W3 Lane D `viewSchema.ts` canonical source.

### `auth/`

| File | Purpose |
|---|---|
| `useAdminAuth.ts` | admin bearer token |
| `useAdminUsers.ts` | admin user CRUD |
| `useSession.ts` | API session token management |
| `useUserAuth.ts` | user slug + token auth with auto-registration |

### `color/`

| File | Purpose |
|---|---|
| `useAppColorModel.ts` | App-level color state bridge |
| `useContrastSafeColor.ts` | contrast-safe color helpers |

### `palette/`

| File | Purpose |
|---|---|
| `usePaletteManager.ts` | the canonical facade — exposes `pm.audit`/`pm.flagged`/`pm.tags`/`pm.versions`/`pm.tagEdit` sub-objects (D.W3 Lane B) |
| `usePaletteManagerWiring.ts` | wires the facade to backend services |
| `useAdminAudit.ts` | audit-log management — exposed as `pm.audit` |
| `useAdminFlagged.ts` | flagged palette moderation — exposed as `pm.flagged` |
| `useAdminTags.ts` | tag CRUD — exposed as `pm.tags` |
| `useVersionHistory.ts` | palette version history — exposed as `pm.versions` |
| `useTagEdit.ts` | tag-edit popover state — exposed as `pm.tagEdit` |
| `useBrowsePalettes.ts` | remote palette browsing, sorting, voting, renaming |
| `useColorNameQueue.ts` | color-name queue (moved auth/ → palette/ at D.W3 Lane B) |
| `usePaletteActions.ts` | usePaletteManager actions extraction |
| `usePaletteExport.ts` | palette export helpers |
| `usePaletteStore.ts` | localStorage palette CRUD |
| `useSlugMigration.ts` | slug switch/regenerate flows with migration dialog |

### Root composables + utils

| File | Purpose |
|---|---|
| `viewSchema.ts` | **canonical `ViewId`, `LeftPane`, `RightPane`, `PaneConfig`, `VIEW_MAP`, `isViewId` predicate** (D.W3 Lane D) — pure data + types |
| `useViewManager.ts` | view router (237→79 LoC at D.W3 Lane D; re-exports types from viewSchema for source-compat) |
| `usePaneRouter.ts` | the pane source-of-truth (B.W2) — single registry for both desktop + mobile slots |
| `useFilteredList.ts` | filtered-list helpers |
| `useSafeStorage.ts` | safe localStorage/sessionStorage (Safari private mode) |
| `prng.ts` | Mulberry32 PRNG (utility, not a composable) |

## Library integration

The demo imports directly from `@src/` (path alias → `src/`) where library-facing:
- `parseCSSColor()` for input parsing (memoised at D.W3 Lane C L3 with invalidation hook)
- `parseCSSValueUnit()` for dimension parsing (memoised at D.W3 Lane C L8 parity)
- `colorUnit2()` / `normalizeColorUnit()` for space conversion
- `COLOR_SPACE_RANGES`, `COLOR_SPACE_DENORM_UNITS` for metadata
- `Color<T>` own-property channel access (D.W1 L8 — read `color.L` not `color.components.get("L")`)
- `lerp(a, b, t)` canonical arg order (D.W3 Lane C L11); `lerpLegacy(t, a, b)` aliased deprecated

Color state: `shallowRef<ColorModel>` + localStorage + URL hash params (bidirectional).

## Lib palette surface (`@/lib/palette/`)

| File | Purpose |
|---|---|
| `api.ts` | palette API client — direct consumers limited to 2 KEEPs (`ColorInput.vue` proposeColorName, `useCustomColorNames.ts` getApprovedColorNames); everything else routes through `usePaletteManager` facade |
| `types.ts` | TypeScript types |
| `constants.ts` | `CURRENT_PALETTE_ID` (lifted to canonical at D.W3 Lane A) + other shared constants |
| `export.ts` | export-format helpers |
| `mix.ts` | mix helpers |
| `utils.ts` | slugify + utilities |

## Tailwind v4 token-bridge surface (D.W4 Lane A)

51 arbitrary `[var(--…)]` callsites → 0. The fix surface:
- **5 NEW `@theme` bridge declarations** in `style.css`: `max-w-desktop-pane`, `min-w-menu`, `top-dock-inset`, `max-w-tooltip`, `shadow-card-hover`.
- 48 callsites resolved through glass-ui's existing bridges.
- NEW `--app-padding-x: 1rem` token breaks the silent `.app-layout` padding ↔ `.pane-container` max-width coupling.

4 style.css blocks were colocated at D.W4 Lane A:
- `.palette-card-grid` → `PaletteCardGrid.vue` (scoped)
- `.palette-tab-content` → `PaletteDialog.vue` (unscoped)
- `.touch-gate-*` → `ComponentSliders.vue` (unscoped)
- `.pane-scroll-fade` → `PaneHeader.vue` (unscoped)

`style.css` line ranges shrank 230 → 201 lines net after the 5 @theme additions + `--app-padding-x` token + colocation comments.

## Conventions

- shadcn-vue components in `ui/` are generated — don't hand-edit (D.W6 carries the ~126-typecheck cluster as a generator-update successor effort).
- Custom components live in `custom/` subtrees and are maintained manually.
- `--reka-*` CSS variables (migrated from `--radix-*`).
- **Vue 3.5 idioms** — reactive props destructure (D.W3 Lane C codemodded 32 SFCs; final `const props = defineProps<` count: 0); `useTemplateRef` for template refs (8 migrations across 7 SFCs); `withDefaults` + `toRef(() => x)` for hand-conversion sites (`GooBlob.vue`, `ImageEyedropper.vue`).
- **Facade-sub-object** pattern for cross-cutting state: `pm.audit`/`pm.flagged`/`pm.tags`/`pm.versions`/`pm.tagEdit` instead of flat methods on a 50+-member object.
- **Injection-key** pattern over prop-drilling for shared color state (`CSS_COLOR_KEY`, `EDIT_TARGET_KEY`, `POINTER_DEBUG_KEY`, `BLOB_CONFIG_KEY`).
- **viewSchema.ts** is the canonical `ViewId` source — `useViewManager.ts` + `usePaneRouter.ts` + `PaletteDialog/composables/usePaletteDialogState.ts` all consume from it.

## Build modes

- `npm run dev` — dev server with HMR (root: `demo/color-picker/`)
- `npm run gh-pages` — production demo build → `dist/` (manual chunks: katex, prettier, highlight.js)
- `npm run build` — library build only (doesn't build demo)
- `npm run build:watch` — library watch (D.W1 — contract-v2 fleet dev orchestration)
