# demo/

Vue 3.5 color picker app. Serves as the live demo at [color.babb.dev](https://color.babb.dev).

Design idioms catalog: see `demo/DESIGN.md` (the authoritative catalog landed at D.W4 Lane B — Token architecture, Type scale, Surfaces, Shadows, Radii, Motion, Z-tier, Color, Layout, Idioms NOT used, with cross-references to glass-ui's DESIGN.md and concrete `style.css` line ranges).

## Structure

```
demo/
├── color-picker/
│   ├── App.vue               # main shell; usePaneRouter source-of-truth (B.W2); URL↔model sync; dark mode
│   ├── index.html            # Vite entry
│   ├── vite.d.ts             # .vue + .md module declarations
│   └── public/CNAME          # GitHub Pages domain
├── DESIGN.md                 # design-idiom catalog (D.W4 Lane B; 10 sections)
├── @/
│   ├── components/
│   │   ├── custom/           # maintained components — see subtrees below
│   │   └── ui/               # shadcn-vue (reka-ui) — DO NOT hand-edit;
│   │                         #   ui/alert is a glass-ui re-export (B.W2); ui/table retired (B.W2);
│   │                         #   F.W1 Lane C swept 29 zero-consumer subdirs (-588 KiB) — see docs/tranches/F/audit/F.W1-lane-c-vendor-sweep.md
│   ├── composables/          # composables — auth/, color/, palette/, root utils + viewSchema.ts + usePaneRouter.ts
│   ├── lib/palette/          # palette API client, types, constants (CURRENT_PALETTE_ID — D.W3 Lane A), utils
│   ├── styles/               # style.css (Tailwind v4 @theme tokens + 5 new bridge declarations — D.W4 Lane A)
│   └── utils/                # cn() — clsx + tailwind-merge
```

## Custom components (`@/components/custom/`)

Post-Mar-2026 restructure + B + D consolidations. Each subtree is colocated (component shells + sub-components + composables + constants together).

### color-picker/

Organised into `controls/`, `display/`, `visual/`, `composables/` subdirs (Mar-2026 restructure; the `editing/` subdir died at R.W4 — T21 deleted the dead `EditDrawer`, `ActionToolbar` moved to `controls/`). Top-level helpers: `spectrumLuma.ts` (the ONE luma ink-regime function), `gamutOverlayPaint.ts`, `readoutReservation.ts`, `colorSpaceInfo.ts` (R.W3).

| Subdir | Highlights |
|---|---|
| `ColorPicker.vue` | top-level shell |
| `controls/` | `ColorInput`, `ComponentSliders` (has `pointercancel`/`lostpointercapture` for reka-ui slider pointer-capture leaks), space selector |
| `display/` | `ColorNutritionLabel`, copy actions |
| `controls/` (cont.) | `ActionToolbar` (ex-`editing/`; `EditDrawer` deleted at R.W4 T21 — dead UI) |
| `visual/` | `SpectrumCanvas`, `HeroBlob`, `PointerDebugOverlay` (dev-only, injected via `POINTER_DEBUG_KEY`) |
| `composables/` | `useColorParsing`, `useSliderGradients`, `useColorNameResolution`, `useColorUrl`, `useCustomColorNames` (named KEEP: directly imports `@lib/palette/api`), `usePointerDebug`, `useHoverPopover`, `useTouchGate`, etc. (the color spine itself is the App-owned `useColorPipeline` — `composables/color/`, S.W2 — injected into the picker, which no longer owns a second copy) |
| `keys.ts` | `CSS_COLOR_KEY`, `EDIT_TARGET_KEY`, `POINTER_DEBUG_KEY` injection keys (provide/inject pattern) |

`cssColorOpaque` is injected via `CSS_COLOR_KEY` (not prop-drilled). `activeEditTarget` via `EDIT_TARGET_KEY`.

### palette-browser/

| Component / Subdir | Purpose |
|---|---|
| `PaletteDialog/` | **Colocated dir** (D.W3 Lane A; was a single ~650-LoC god module pre-split). Contains `PaletteDialog.vue` shell + `components/` (6 SFCs: `PaletteAdminTabs`, `PaletteBrowseTab`, `PaletteControlsBar`, `PaletteDialogHeader`, `PaletteSavedTab`, `DeleteAllConfirm`) + `composables/` (5 composables: `usePaletteDialogState` with type-level enforcement assertion, `useDialogBrowseActions`, `useDialogModalStack`, `useDialogOverlayGuards`, `usePaletteExport`) + `constants.ts` |
| `PaletteCard.vue` + `PaletteCardGrid.vue` + `PaletteCardMenu.vue` + `PaletteCardSkeleton.vue` + `PaletteColorStrip.vue` | palette display tiles |
| `CurrentPaletteEditor.vue` | swatch grid, add/save/duplicate |
| `AdminNamesPanel.vue` + `AdminUsersPanel.vue` + `AdminFlaggedPanel.vue` + `AdminTagsPanel.vue` + `AdminAuditPanel.vue` + `AdminListItem.vue` | admin panel components (pane-era) — consume `pm.audit`/`pm.flagged`/`pm.tags` sub-objects of the palette-manager facade. The dialog-era `AdminPanel` + `AdminAuthGate` + `AdminColorQueue` + `AdminPaletteOps` quartet (zero importers; one a DRY twin of the pending-names list) was excised S.W0 W0-6 |
| `MigratePalettesDialog.vue`, `FlagReportDialog.vue` | dialogs |
| `PaletteSlugBar.vue`, `PaletteRenameInput.vue` | slug editing |
| `SortFilterMenu.vue`, `UserSortMenu.vue`, `SearchFilterBar.vue`, `SwatchHoverMenu.vue` | filtering UI |
| `TagEditPopover.vue` | consumes `pm.tagEdit` sub-object |
| `VersionHistoryDrawer.vue` | consumes `pm.versions` sub-object |
| `MiniColorPicker.vue`, `EmptyState.vue`, `PaginationBar.vue`, `BulkActionToolbar.vue`, `ActionFeedback.vue` | utility primitives |

### image-palette-extractor/

| File | Purpose |
|---|---|
| `ExtractWorkbench.vue` + `useExtractSession.ts` | **the ONE workbench** (R.W4 T20 collapsed the ~90%-duplicate `ExtractPane`↔`ImagePaletteExtractor` dup-shell; the pane is a thin shell) |
| `ImagePaletteExtractor.vue` | thin shell over the workbench |
| `ImageEyedropper/` | **Colocated split** (D.W3 Lane A; was a single ~400-LoC component pre-split) |
| `ExtractControls.vue`, `ImageDropZone.vue` | controls |
| `composables/`, `useImageQuantize.ts`, `useInertiaGesture.ts` | extraction helpers (quantize threads `chromaWeight` — R.W2 kC; inertia rAF is PRM-gated) |

### Other subtrees

| Subtree | Purpose |
|---|---|
| `dock/` | top-dock + dock-menus + layers (Mar-2026 rename from `top-dock/`); `GlassDock.vue` lives here |
| ~~`goo-blob/`~~ | **DELETED (N.W5.A)** — the 1270-LoC flat-HSV fork is extirpated; the hero blob now consumes `@mkbabb/glass-ui/goo-blob` (the OKLCh lit-glass superset). `GooBlob`/`BLOB_CONFIG_KEY`/`BLOB_CONFIG_DEFAULTS` import from glass-ui; the live picker palette flows `deriveBlobPalette → config.color.paletteStops` ("the palette made flesh", App.vue). BlobPane re-authored against the 8-atom nested config |
| `gradient/` | gradient editing + `composables/` |
| `mix/` | color mixing + `composables/` |
| `generate/` | palette generation |
| `markdown/` | dynamic .md loader with KaTeX + highlight.js |
| `katex/` | standalone KaTeX renderer |
| `panes/` | pane shell + header (consumes `usePaneRouter` registry) |
| ~~`svg-filters/`~~ | **DELETED (N.W5.C)** — its sole content was the global `<filter id="watercolor-filter">`; the watercolor-dot fork was its only structural consumer and the consumed glass-ui dot internalises a per-instance filter, so the global def + its `App.vue` mount are gone (the global-filter risk dies with the fork, inv-N-9) |
| ~~`watercolor-dot/`~~ | **DELETED (N.W5.C)** — the SVG/CSS fork is extirpated; all 9 consumers import `{ WatercolorDot }` from `@mkbabb/glass-ui/watercolor-dot` (the superset: per-instance internalised filter, PRM-gated, identical prop shape). The fork's dormant un-gated RAF morph dies with it |
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
| `useColorPipeline.ts` | the ONE color-state spine (S.W2 · W2-1) — merges the former `useAppColorModel` + `useColorModel` graph onto one App-owned composable; injected by the picker |
| `useContrastSafeColor.ts` | contrast-safe color helpers |

### `palette/`

| File | Purpose |
|---|---|
| `usePaletteManager.ts` | the canonical facade — exposes `pm.audit`/`pm.flagged`/`pm.tags`/`pm.versions`/`pm.tagEdit` sub-objects (D.W3 Lane B); `PaletteManager` type is `ReturnType<typeof usePaletteManager>` (E.W2 Lane D — no hand-maintained interface mirror) |
| `usePaletteManagerWiring.ts` | App.vue → facade bridge: adapts color-picker / view-manager handles into `usePaletteManager` deps + owns the 4 cross-module orchestration watchers (auth ↔ view-router ↔ browse ↔ admin ↔ colorQueue) lifted at E.W2 Lane D / AUD-5.14 |
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
| `useViewManager.ts` | view router (slimmed at D.W3 Lane D; re-exports types from viewSchema for source-compat) |
| `usePaneRouter.ts` | the pane source-of-truth (B.W2) — single registry for both desktop + mobile slots |
| `useFilteredList.ts` | filtered-list helpers |
| `useSafeStorage.ts` | safe localStorage/sessionStorage (Safari private mode) |
| `prng.ts` | Mulberry32 PRNG (utility, not a composable) |

## Library integration

The demo consumes value.js through its PUBLISHED subpaths — `@mkbabb/value.js` +
`@mkbabb/value.js/{color,parsing,math,easing,units,quantize}` (the T.W1 demo-dogfood
keystone; the pre-keystone `@src/` deep-path alias was retired so the demo dogfoods
the 8 public `exports` keys, never `src/` internals) — where library-facing:
- `parseCSSColor()` for input parsing (memoised at D.W3 Lane C L3 with invalidation hook)
- `parseCSSValueUnit()` for dimension parsing (memoised at D.W3 Lane C L8 parity)
- `colorUnit2()` / `normalizeColorUnit()` for space conversion
- `COLOR_SPACE_RANGES`, `COLOR_SPACE_DENORM_UNITS` for metadata
- `Color<T>` own-property channel access (D.W1 L8 — read `color.L` not `color.components.get("L")`)
- `lerp(a, b, t)` canonical arg order (D.W3 Lane C L11). **`lerpLegacy` retired in v0.8.0 (F.W3 Lane A — F2 invariant)**; consumers must migrate to `(a, b, t)`.

Color state: `shallowRef<ColorModel>` + localStorage + URL hash params (bidirectional).

Breakpoint / hover-capability queries route through glass-ui's `useBreakpoint` (`@mkbabb/glass-ui/dom`) — G.W2 Lane E retired ad-hoc `matchMedia` in `ImagePaletteExtractor.vue`, `ExtractPane.vue`, `useHoverPopover.ts`, `useCardMenu.ts` (4 sites) in favour of it. G.W2 Lane F migrated `PaletteSlugBar.vue`'s hand-rolled `<button>` markup to the glass-ui `<Button>` primitive.

## Lib palette surface (`@/lib/palette/`)

H.W3 Lane A decomposed the prior 484-LoC `api.ts` into 9 cohesion-honest modules under `api/` (each ≤ 350 LoC; max 110). The original `api.ts` is DELETED (no shim — `@/lib/palette/api` resolves to `api/index.ts` via TypeScript directory-as-module). 14 importers auto-resolved through the barrel; zero explicit consumer rewrites needed.

| File | Purpose |
|---|---|
| `api/client.ts` | HTTP transport infra (request + adminRequest + setSessionToken + BASE_URL) — extracted at H.W3 Lane A |
| `api/sessions.ts` | session lifecycle (create / login / delete / me) |
| `api/palettes.ts` | user palette CRUD + vote + flag |
| `api/versions.ts` | versions + forks + provenance (palette history) |
| `api/colors.ts` | public colour-name + tag listing |
| `api/admin-palettes.ts` | admin palette moderation + batch + flagged triage |
| `api/admin-users.ts` | admin user CRUD + lifecycle + batch |
| `api/admin-colors.ts` | admin colour-proposal queue + admin tag CRUD |
| `api/admin-audit.ts` | admin audit log |
| `api/index.ts` | pure barrel re-exporting every public symbol (zero logic) |
| `types.ts` | TypeScript types |
| `constants.ts` | `CURRENT_PALETTE_ID` (lifted to canonical at D.W3 Lane A) + other shared constants |
| `export.ts` | export-format helpers |
| `mix.ts` | mix helpers |
| `utils.ts` | slugify + utilities |

Direct-import KEEPs remain 2 (`ColorInput.vue` proposeColorName, `useCustomColorNames.ts` getApprovedColorNames); everything else routes through `usePaletteManager` facade.

## H.W3 Lane B + C sub-component lifts

H.W3 retired 3 god modules / data-bloated files via cohesion-honest sub-component or data-file lifts (all ≤ 400 LoC post-fix):

| File | Pre LoC | Post LoC | Sub-component / data file lifted |
|---|---|---|---|
| `custom/color-picker/visual/PointerDebugOverlay.vue` | 449 | 286 | `visual/DebugEventLog.vue` (NEW, 136) — event-log block + `eventClass` helper + log-specific styles |
| `custom/palette-browser/PaletteCard.vue` | 435 | 388 | `palette-browser/PaletteCardSwatches.vue` (NEW, 96) — expandable-swatches detail block + 8 swatch re-emit events |
| `custom/color-picker/index.ts` | 376 | 99 | `custom/color-picker/colorSpaceInfo.ts` (NEW, 291) — color space metadata; pure-data; barrel re-exports it transparently |

## Tailwind v4 token-bridge surface (D.W4 Lane A)

Arbitrary `[var(--…)]` callsites → 0. The fix surface:
- **5 NEW `@theme` bridge declarations** in `style.css`: `max-w-desktop-pane`, `min-w-menu`, `top-dock-inset`, `max-w-tooltip`, `shadow-card-hover`.
- Remaining callsites resolved through glass-ui's existing bridges.
- NEW `--app-padding-x: 1rem` token breaks the silent `.app-layout` padding ↔ `.pane-container` max-width coupling.

4 style.css blocks were colocated at D.W4 Lane A:
- `.palette-card-grid` → `PaletteCardGrid.vue` (scoped)
- `.palette-tab-content` → `PaletteDialog.vue` (unscoped)
- `.touch-gate-*` → `ComponentSliders.vue` (unscoped)
- `.pane-scroll-fade` → `PaneHeader.vue` (unscoped)

## Conventions

- shadcn-vue components in `ui/` are generated — don't hand-edit (D.W6 carries the typecheck cluster as a generator-update successor effort).
- Custom components live in `custom/` subtrees and are maintained manually.
- `--reka-*` CSS variables (migrated from `--radix-*`).
- **Vue 3.5 idioms** — reactive props destructure (D.W3 Lane C codemodded the SFC tree; final `const props = defineProps<` count: 0); `useTemplateRef` for template refs (migrated across the custom tree); `withDefaults` + `toRef(() => x)` for hand-conversion sites (`GooBlob.vue`, `ImageEyedropper.vue`).
- **Facade-sub-object** pattern for cross-cutting state: `pm.audit`/`pm.flagged`/`pm.tags`/`pm.versions`/`pm.tagEdit` instead of flat methods on a 50+-member object.
- **Injection-key** pattern over prop-drilling for shared color state (`CSS_COLOR_KEY`, `EDIT_TARGET_KEY`, `POINTER_DEBUG_KEY`, `BLOB_CONFIG_KEY`).
- **viewSchema.ts** is the canonical `ViewId` source — `useViewManager.ts` + `usePaneRouter.ts` + `PaletteDialog/composables/usePaletteDialogState.ts` all consume from it.
- **Glass-ui-first-class consumption** — primitives like `useBreakpoint` (`@mkbabb/glass-ui/dom`) and the `<Button>` component are consumed from glass-ui, not hand-rolled (G.W2 Lanes E/F; per `feedback_glass_ui_first_class.md`).

## Build modes

- `npm run dev` — **HONEST full local stack** (S.W0 W0-1): delegates to `scripts/dev.sh up` (local api + mongo rs0 + `VITE_API_URL` wired + dev CORS). Palette/API features round-trip out of the box. HMR (root: `demo/color-picker/`).
- `npm run dev:web-only` — frontend ONLY (bare vite `:9000`, no backend). Palette/API features CORS-die against prod; the demo surfaces an explicit `misconfigured` state instead of silently pointing at prod.
- `npm run gh-pages` — production demo build → `dist/` (manual chunks: katex, prettier, highlight.js)
- `npm run build` — library build only (doesn't build demo)
- `npm run build:watch` — library watch (D.W1 — contract-v2 fleet dev orchestration)

### The dev-backend honesty contract (S.W0 W0-1 · S-11)

`@/lib/palette/api/availability.ts` owns the origin-honest failure path. At client
init (`client.ts` module load, `initApiEnvironment(BASE_URL)`) it resolves the
dev-config truth ONCE, before any fetch:

- If `VITE_API_URL` is UNSET **and** the page is a loopback origin **and** the
  resolved `BASE_URL` is cross-origin (the silent prod-target footgun), it enters
  the designed `apiAvailability = "misconfigured"` state, logs a loud actionable
  `console.error`, and every transport call throws `DevMisconfigError` (a distinct
  loud error, never the `ApiUnavailableError` "working locally" degradation).
- It **never fires in production** (prod runs on `color.babb.dev`, not loopback)
  and **never fires when `VITE_API_URL` is set** (the operator owns that endpoint).

`ApiOfflineChip.vue` renders the `misconfigured` register distinctly (a filled
warning lamp + `dev misconfigured — run \`npm run dev\``) from the honest
`unavailable` "backend offline — saved locally" state.
