SERVED MODEL: claude-opus-5[1m]

# FRONTEND-DENOMINATOR — the v3 source census, re-verified at wave HEAD

**Unit**: X-W0.h · **Wave**: X-W0 · **Track**: A (X·V) · **Date**: 2026-09-17
**Gates**: HG-15 (this file) · HG-14 + G-E (`GRAPH-V3/`, same commit)
**Rows discharged**: CC-024 (M11 v3 source census / K-24) · CC-001's graph half (with HG-14)
**Produced by**: `docs/tranches/V/megatranche/workflows/graph-v3.mjs` — every figure below is a
field of `GRAPH-V3/census.json`, not a hand count.

---

## 0. What this file is, and what it forbids

HG-15's words: *"every later frontend wave cites it rather than re-deriving."* This is the tracked
frontend denominator. A later wave that needs "how many SFCs", "which routes", "what is in scope"
**cites this file by path**; it does not run its own `find`. The reason is recorded in the gate's own
falsifier — *"a per-file SHA that no longer matches live bytes marks the census stale rather than
letting a stale denominator gate a later wave."* The SHAs in §3 are what make staleness detectable
instead of silent.

Equally, **L-19**: this is X-W8's INPUT, not a proof farm. X-W8 binds CC-078's file bounds and
CC-079's four SCC owners from `GRAPH-V3/sccs.json` and from §3 here. Nothing in this file asserts
anything about product behaviour.

**Re-derivation, one command:**

⟨`node docs/tranches/V/megatranche/workflows/graph-v3.mjs --verify`⟩

It rebuilds the graph twice in-process, compares both runs' digests against each other **and**
against the committed `GRAPH-V3/digests.json`, then checks G-E's closure and HG-14's four names.
Exit 0 is the whole gate.

---

## 1. The predicate, stated

A figure without a predicate cannot be re-derived, and the inherited `310` had none — that is the
defect this section cures. The tool's own words, from `census.json.predicate`:

> source member = a git-TRACKED file in one of the three DENOMINATOR bands — `demo/` (band demo),
> `src/` (band library), `test/` (band test) — whose extension is one of `.vue` `.ts` `.js` `.mjs`
> `.css` `.glsl` `.html`. Out of the denominator but IN the graph: `e2e/` (a separate Playwright
> harness), `assets/**` (import targets only), and the seven build/config files that mint the
> resolver aliases.

The out-of-denominator bands are **in the graph on purpose**: an edge must be able to leave the
denominator, or the boundary domain has nothing to type. They are not source members.

| band | in denominator | files |
|---|---|---|
| `demo` | ✅ | **261** |
| `library` (`src/`) | ✅ | **26** |
| `test` | ✅ | **23** |
| **denominator total** | | **310** |
| `e2e` | ❌ separate Playwright harness | 84 |
| `asset` (`assets/**`) | ❌ import targets only | 11 |
| `build` | ❌ alias minters | 7 |
| **graph total** | | **412** |

---

## 2. The census — the six HG-15 figures, measured

Every row double-run from settled bytes (WRITE-THEN-MEASURE). The two runs produced identical
digests; §5 pastes them.

| figure | HG-15 requires | **measured at wave HEAD** | verdict |
|---|---|---|---|
| SFC | 88 | **88** | EXACT |
| source members | 310 | **310** | EXACT |
| routes + wildcard | 14 + wildcard | **14 + 1 wildcard** (`/:pathMatch(.*)*`, unnamed) | EXACT |
| dynamic `:is` sites | 13 | **13** | EXACT |
| Teleports | 2 | **2** | EXACT |
| harnesses | 2 | **2** — `PaletteSlugBar.vue` · `Katex.vue` | EXACT |
| per-file SHAs | required | **88 rows, §3** | PRESENT |

**On the two figures that had to be earned, not just counted.**

*310* is not the graph's node count and is not "every file under `demo/`". It is the three
denominator bands summed, and it reproduces the inherited figure to the unit — 261 + 26 + 23 = 310.
The inherited figure carried no predicate (see the reading-note in `census.json`); §1 now states one,
and the two agree.

*2 harnesses* is derived, not asserted. The tool calls an SFC **mounted** when it is the target of a
`render.tag`, `render.dynamic`, `render.mount` or `route.pane` edge, and a **harness** otherwise.
Getting there required three mechanisms the naive predicate misses, each of which reported a mounted
component as a harness:

1. **barrel forwarding** — `<PaletteCard>` binds to `./PaletteCard`, a barrel, and the SFC sits one
   `export { default as … }` behind it. The `render.mount` edge kind resolves that hop. Without it,
   25 of 88 SFCs read as unmounted.
2. **in-component lazy binding** — `HeroBlob` exists only as
   `defineAsyncComponent(() => import("./visual/HeroBlob.vue"))` at `ColorPicker.vue:157`. Async
   bindings are now read in every file, not only in the pane router.
3. **the pane registry's prefix arm** — `usePaneRouter.ts:93`,
   `if (name.startsWith("admin-")) return AdminPane;`, is `AdminPane.vue`'s **only** mount. A reader
   that sees only the `name === "…"` arms reports a live pane as dead.

The result, `PaletteSlugBar` + `Katex`, is exactly the pair the V3 source closure named
independently: `coordination/VALUE-NATIVE-OWNER-INPUT-READINESS-AUDIT-2026-08-02.md:90` — *"`PaletteSlugBar`
and `Katex` remain honest unmounted harnesses"* — and
`formation/codex-worktree-7e28/formation/VALUE-MOBILE-SAFARI-SOURCE-CLOSURE-V3-OWNER-INTAKE-2026-08-01.md:110`
— *"88 SFC workflows, with 86 mounted and two exported-unmounted harnesses"*. Two censuses built
from different mechanisms landing on the same two files is the corroboration; neither was copied.

---

## 3. Per-file SHAs — the 88 SFCs

`sha256` of the file's bytes as tracked at wave HEAD, first 16 hex digits (full digests in
`GRAPH-V3/census.json`, field `sfc[].sha256`). A row whose SHA no longer matches live bytes marks
this census **stale**; it does not silently gate a later wave.

| # | path | bytes | sha256[0:16] |
|---|---|---|---|
| 1 | `demo/color-picker/App.vue` | 21424 | `dbac47fae6b86bec` |
| 2 | `demo/color-picker/ErrorBoundary.vue` | 3627 | `45e5d83b83610225` |
| 3 | `demo/color-session/ColorSpaceSelector.vue` | 14677 | `b87191d0076648a2` |
| 4 | `demo/color-session/color-chips/PreviewRamp.vue` | 1763 | `9574ce9923d229bc` |
| 5 | `demo/color-session/color-chips/PreviewStrip.vue` | 2615 | `570051e191c25a95` |
| 6 | `demo/palettes/BrowsePane.vue` | 14606 | `c840ec6fca15a4fd` |
| 7 | `demo/palettes/PalettesPane.vue` | 10044 | `6521426680895595` |
| 8 | `demo/palettes/admin/AdminPane.vue` | 5402 | `cad0113d2be118a4` |
| 9 | `demo/palettes/browser/admin/AdminAuditPanel.vue` | 4989 | `f28b96cb9a9f8482` |
| 10 | `demo/palettes/browser/admin/AdminFlaggedPanel.vue` | 6946 | `907d7ee340c684fc` |
| 11 | `demo/palettes/browser/admin/AdminListItem.vue` | 1253 | `a15213314633bee7` |
| 12 | `demo/palettes/browser/admin/AdminListSkeleton.vue` | 1164 | `be2b810a2edbdc8e` |
| 13 | `demo/palettes/browser/admin/AdminNamesPanel.vue` | 7547 | `7cd3ddee4fd4eebb` |
| 14 | `demo/palettes/browser/admin/AdminTagsPanel.vue` | 5433 | `fcd07904d64a4a7a` |
| 15 | `demo/palettes/browser/admin/AdminUsersPanel.vue` | 16510 | `05b9b49a074deca5` |
| 16 | `demo/palettes/browser/admin/PaginationBar.vue` | 1211 | `3006c9b99288b591` |
| 17 | `demo/palettes/browser/card/CurrentPaletteEditor.vue` | 13778 | `abc92623296c36a6` |
| 18 | `demo/palettes/browser/card/PaletteCard/ActionFeedback.vue` | 1713 | `9b5cbe86976967d3` |
| 19 | `demo/palettes/browser/card/PaletteCard/PaletteCard.vue` | 15569 | `94d218f385b563d5` |
| 20 | `demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue` | 9210 | `c0af63cb880f24f8` |
| 21 | `demo/palettes/browser/card/PaletteCard/PaletteCardMeta.vue` | 2421 | `95dd9725de21b2c0` |
| 22 | `demo/palettes/browser/card/PaletteCard/PaletteCardSwatches.vue` | 4396 | `f07d8ead460991ea` |
| 23 | `demo/palettes/browser/card/PaletteCard/PaletteRenameInput.vue` | 2209 | `97483747a1c97e35` |
| 24 | `demo/palettes/browser/card/PaletteCardGrid.vue` | 1890 | `e4ee08d80c1a2c23` |
| 25 | `demo/palettes/browser/card/PaletteCardSkeleton.vue` | 5902 | `00bfb73fc578db2c` |
| 26 | `demo/palettes/browser/card/PaletteColorStrip.vue` | 2358 | `d714167b537e87d3` |
| 27 | `demo/palettes/browser/card/ShadowPalette.vue` | 5801 | `46d86c5bb070cad6` |
| 28 | `demo/palettes/browser/card/SwatchHoverMenu.vue` | 3218 | `a9399beec7aa99a7` |
| 29 | `demo/palettes/browser/dialog/FlagReportDialog.vue` | 3488 | `4e90c7911dedb7a8` |
| 30 | `demo/palettes/browser/dialog/MigratePalettesDialog.vue` | 3160 | `8e9e8f264a963496` |
| 31 | `demo/palettes/browser/dialog/VersionHistoryDrawer.vue` | 6373 | `2b55ec282f702e03` |
| 32 | `demo/palettes/browser/search/MiniColorPicker.vue` | 6049 | `f9f59e5846026065` |
| 33 | `demo/palettes/browser/search/SearchFilterBar.vue` | 10658 | `c7e1ce515e78c069` |
| 34 | `demo/palettes/browser/search/TagEditPopover.vue` | 3404 | `961debf279365c91` |
| 35 | `demo/palettes/browser/search/UserSortMenu.vue` | 2111 | `de6cc257db85223f` |
| 36 | `demo/palettes/browser/slug/PaletteSlugBar.vue` | 9981 | `18eba009fac4a924` |
| 37 | `demo/palettes/browser/status/ApiOfflineChip.vue` | 3097 | `d8000f7c42d0d026` |
| 38 | `demo/picker/ColorPicker.vue` | 17694 | `b207f7f7184e3081` |
| 39 | `demo/picker/controls/ComponentSliders/ComponentSliders.vue` | 18598 | `a61b5ed39703af20` |
| 40 | `demo/picker/controls/ComponentSliders/ConsoleRail.vue` | 15071 | `a37d644bfda32077` |
| 41 | `demo/picker/controls/SpectrumCanvas/SpectrumCanvas.vue` | 8779 | `c4af2158e042c15a` |
| 42 | `demo/picker/display/ColorComponentDisplay/ColorComponentDisplay.vue` | 9118 | `4e14149252a20e6c` |
| 43 | `demo/picker/visual/DebugEventLog.vue` | 3145 | `61b8aaee894e344d` |
| 44 | `demo/picker/visual/HeroBlob.vue` | 16407 | `2fe3ca189808df54` |
| 45 | `demo/picker/visual/PointerDebugOverlay.vue` | 7590 | `5529d0384c46234b` |
| 46 | `demo/scenes/ConfigSliderPane.vue` | 10709 | `e4ae64e6a5b1e300` |
| 47 | `demo/scenes/about/AboutPane.vue` | 4814 | `77a101f76bf986b9` |
| 48 | `demo/scenes/about/ColorNutritionLabel.vue` | 10283 | `80642a673162d26f` |
| 49 | `demo/scenes/about/katex/Katex.vue` | 2203 | `38199249172b351e` |
| 50 | `demo/scenes/about/markdown/Markdown.vue` | 12555 | `f5a9183e6645dd81` |
| 51 | `demo/scenes/atmosphere/AuroraPane.vue` | 8330 | `41331877c182eb03` |
| 52 | `demo/scenes/blob/BlobPane.vue` | 5680 | `9d5f72dc17cdad1d` |
| 53 | `demo/shared/ui/EmptyState.vue` | 5304 | `08018dde4f74fdb3` |
| 54 | `demo/shared/ui/PaneHeader.vue` | 10347 | `40fdb6efe9be40e4` |
| 55 | `demo/shell/PaneSegmentedControl.vue` | 1750 | `6c20370d0596e2c6` |
| 56 | `demo/shell/PaneSlot.vue` | 5261 | `096d68de2693f635` |
| 57 | `demo/shell/dock/ActionBarToggle.vue` | 6523 | `6dee5ed09bdb4350` |
| 58 | `demo/shell/dock/ActionButton.vue` | 4398 | `792c465f9424cec4` |
| 59 | `demo/shell/dock/ActionToolbar.vue` | 2791 | `bb73802a79a4b578` |
| 60 | `demo/shell/dock/ColorInput.vue` | 14257 | `e800a80e5e75b9e8` |
| 61 | `demo/shell/dock/Dock.vue` | 20603 | `232219b3bc8a622a` |
| 62 | `demo/shell/dock/DockStatusLamp.vue` | 4229 | `9ef91add55fd912b` |
| 63 | `demo/shell/dock/DockViewSelect.vue` | 7805 | `24517d3e495bdbac` |
| 64 | `demo/shell/dock/ParseEchoReadout.vue` | 1871 | `416468fdccb96ab6` |
| 65 | `demo/shell/dock/layers/ActionBarLayer.vue` | 6094 | `33a67c06df15225f` |
| 66 | `demo/shell/dock/layers/GenericActionBar.vue` | 947 | `3f7a43b76dd1a14d` |
| 67 | `demo/shell/dock/layers/SlugEditLayer.vue` | 3947 | `997ba1e641e4b7fd` |
| 68 | `demo/shell/dock/menus/MobileMenuDropdown.vue` | 6672 | `cf98e476f2d2a63d` |
| 69 | `demo/shell/dock/menus/ProfileSection.vue` | 9898 | `94875900d32cae41` |
| 70 | `demo/workbenches/extract/ExtractControls.vue` | 6559 | `71aa0a65873c367a` |
| 71 | `demo/workbenches/extract/ExtractPane.vue` | 1352 | `4a1dc96e50692c85` |
| 72 | `demo/workbenches/extract/ExtractWorkbench.vue` | 12704 | `d718ae30ab051246` |
| 73 | `demo/workbenches/extract/ImageDropZone.vue` | 4388 | `4547827a9375078c` |
| 74 | `demo/workbenches/extract/ImageEyedropper/ImageEyedropper.vue` | 9932 | `67b7df00c8ed1771` |
| 75 | `demo/workbenches/generate/GenerateControls.vue` | 14486 | `4f95c57c7a6c46fa` |
| 76 | `demo/workbenches/generate/GeneratePane.vue` | 1476 | `009c71a208ae2c4e` |
| 77 | `demo/workbenches/gradient/GradientPane.vue` | 1142 | `193b938edb082f1c` |
| 78 | `demo/workbenches/gradient/GradientVisualizer/GradientCodeEditor.vue` | 4256 | `9919c631fc54784b` |
| 79 | `demo/workbenches/gradient/GradientVisualizer/GradientEasingEditor.vue` | 12449 | `59a3c2db2179192f` |
| 80 | `demo/workbenches/gradient/GradientVisualizer/GradientStopEditor.vue` | 17314 | `e229987aa4babb53` |
| 81 | `demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue` | 11464 | `7684f93f1dc68406` |
| 82 | `demo/workbenches/gradient/GradientVisualizer/easing/EasingAuthoringStage.vue` | 4472 | `a5aba0bc9f523cfb` |
| 83 | `demo/workbenches/gradient/GradientVisualizer/easing/EasingSpecimenStrip.vue` | 8003 | `1d8bbcca41301907` |
| 84 | `demo/workbenches/mix/MixAnimationCanvas/MixAnimationCanvas.vue` | 1189 | `c35286dfe7ab77a7` |
| 85 | `demo/workbenches/mix/MixConfigBar.vue` | 7418 | `cceda8035c5f0da6` |
| 86 | `demo/workbenches/mix/MixPane.vue` | 4774 | `e59d74fef292472a` |
| 87 | `demo/workbenches/mix/MixResultDisplay.vue` | 6243 | `ca014bb6234da614` |
| 88 | `demo/workbenches/mix/MixSourceSelector.vue` | 13469 | `4506ac0f8e17406f` |

---

## 4. The rest of the census

### 4.1 Routes — 14 named + 1 wildcard

Minted at `demo/shell/router/index.ts`. Every record mounts the same `Stub`; the route→pane binding
is carried by `usePaneRouter`'s registry, which is why `route.pane` is its own edge kind.

| path | name |
|---|---|
| `/` | `picker` |
| `/admin/audit` | `admin-audit` |
| `/admin/flagged` | `admin-flagged` |
| `/admin/names` | `admin-names` |
| `/admin/tags` | `admin-tags` |
| `/admin/users` | `admin-users` |
| `/atmosphere` | `atmosphere` |
| `/blob` | `blob` |
| `/browse` | `browse` |
| `/extract` | `extract` |
| `/generate` | `generate` |
| `/gradient` | `gradient` |
| `/mix` | `mix` |
| `/palettes` | `palettes` |
| `/:pathMatch(.*)*` | *(wildcard, unnamed)* |

### 4.2 The alias-barrel class (G-E) — 19 barrels, 279 edges

G-E requires the class **typed**, not counted. Measured: **19** barrels under `demo/ui/`, carrying
**279** inbound edges — consistent with the record's "19 barrels / 90+ edges", the `90+` being a
floor. The 19:

`alert` · `avatar` · `badge` · `button` · `card` · `checkbox` · `collapsible` · `dialog` ·
`dropdown-menu` · `input` · `label` · `popover` · `radio-group` · `select` · `separator` ·
`skeleton` · `slider` · `switch` · `tooltip` — each `demo/ui/<name>/index.ts`.

The class matters because it is **what hides mounts**: every one of the 25 SFCs that read as
unmounted before §2's mechanism 1 was hidden behind exactly this forwarding. The graph types the
forwarding (`render.mount`, `viaBarrel`) rather than flattening it, so X-W8 can subtract against the
barrel and the component separately.

### 4.3 Resolver aliases — 8, read from `package.json#exports`

`@src` (minted by `vite.config.ts`) plus the seven value.js self-subpaths: `/color` `/css` `/easing`
`/math` `/quantize` `/transform` `/value`. The table is **read from the exports map**, never
hard-coded, because `vite.config.ts` derives it from the same source — so the graph's alias set
cannot drift from the config's.

Edge counts: `alias.self` **57** · `alias.src` **6**.

### 4.4 Injection keys — 15, and the DI cone

| key | owner module |
|---|---|
| `OVERTURE_KEY` | `demo/color-picker/composables/boot/useOverture.ts` |
| `COLOR_MODEL_KEY` · `CSS_COLOR_KEY` · `EDIT_TARGET_KEY` · `INK_AMBIENT_KEY` · `SAFE_ACCENT_KEY` | `demo/color-session/keys.ts` |
| `ADMIN_PORT_KEY` · `BROWSE_PORT_KEY` · `COLOR_TARGET_PORT_KEY` · `LIBRARY_PORT_KEY` · `SESSION_PORT_KEY` | `demo/palettes/usePalettePorts.ts` |
| `POINTER_DEBUG_KEY` | `demo/picker/composables/usePointerDebug.ts` |
| `API_CLIENT_KEY` | `demo/platform/transport/useApiClient.ts` |
| `AURORA_ATOMS_KEY` | `demo/scenes/atmosphere/aurora-atoms.ts` |
| `VIEW_MANAGER_KEY` | `demo/shell/useViewManager.ts` |

`di.provide` **17** · `di.inject` **59**. Two of the five ownership pairs in §5.2 are carried by
these edges alone.

### 4.5 Module-scope reactive state — 3 modules

`demo/color-session/useContrastSafeColor.ts` (`probeEpoch`) ·
`demo/color-session/useCustomColorNames.ts` (`loaded`, `loading`) ·
`demo/palettes/usePaletteStore.ts` (`publishedPalettes`, `savedPalettes`). 16 `state.module` edges
land on them.

### 4.6 Worker / asset

One worker site, and it is a **query suffix**, not a constructor: `?worker` at
`demo/workbenches/extract/composables/useImageQuantize.ts`. There is no `new Worker(` call anywhere
in the tree — a graph looking only for the constructor would report zero.

Teleports **2** · dynamic `:is` sites **13** · `asset.url` edges **11** (the About reference pages).

---

## 5. Edge and SCC totals

### 5.1 Edges — 2,996 across eleven domains

| domain | edges | kinds |
|---|---|---|
| module | 1,477 | `import.value` 1,087 · `import.type` 238 · `reexport.value` 92 · `import.dynamic` 36 · `reexport.type` 15 · `import.sideeffect` 9 |
| render | 715 | `render.tag` 485 · `render.mount` 222 · `render.dynamic` 8 |
| boundary | 570 | `boundary.package` 521 · `boundary.test` 48 · `boundary.build` 1 |
| di | 76 | `di.inject` 59 · `di.provide` 17 |
| alias | 63 | `alias.self` 57 · `alias.src` 6 |
| route | 39 | `route.pane` 24 · `route.record` 15 |
| api | 20 | `api.transport` 19 · `api.endpoint` 1 |
| state | 16 | `state.module` 16 |
| asset | 11 | `asset.url` 11 |
| css | 8 | `css.import` 8 |
| worker | 1 | `worker.spawn` 1 |

Nodes **487**.

### 5.2 SCCs — 11, every one disposed (G-E closure)

`6 owned + 5 reasoned-no-owner + 0 unnamed`. The count is machine-checked by `--verify`; an
`UNNAMED` row fails the gate.

| class | SCC | size | owner / reason |
|---|---|---|---|
| load | **Admin/provider** | 7 | **X.W8.c** — CC-079's fourth |
| load | **Gradient** | 3 | **X.W8.c** — CC-079's third |
| load | **Markdown** | 2 | **X.W8.c** — CC-079's second |
| load | **Dock** | 2 | **X.W8.c** — CC-079's first |
| runtime | **Dock** | 2 | **X.W8.c** — the only runtime cycle in the tree |
| ownership.pair | **CPE L-24 · palettes ↔ shell** | 2 | **X-W8 (SCC subtraction)** — adjudicated CONFIRMED |
| ownership.pair | **AuroraPane AP-19 · atmosphere ↔ boot** | 2 | **NO-WAVE-OWNER**, adjudicated — reason recorded |
| ownership.pair | About reference-page lattice · assets ↔ scenes | 2 | no owner — reason recorded |
| ownership.pair | Picker DI inversion · color-picker ↔ picker | 2 | no owner — reason recorded |
| ownership.pair | Pane DI inversion · picker ↔ shell | 2 | no owner — reason recorded |
| ownership | demo feature lattice (coarse component) | 8 | no owner — reason recorded (it is the pairs' transitive closure) |

**CC-079's four, named with an owner each — HG-14's requirement, met:**

- **Dock** — `demo/shell/dock/Dock.vue` ↔ `demo/shell/dock/index.ts`. The only cycle present in
  **both** the runtime and the load class: `Dock.vue` imports the dock kit from `"./"`, the barrel
  that re-exports `Dock.vue` itself.
- **Markdown** — `scenes/about/markdown/Markdown.vue` ↔ `…/index.ts`. Load class only: type-only.
- **Gradient** — `gradientParse.ts` ↔ `useGradientCSS.ts` ↔ `useGradientModel.ts`. Load class only.
- **Admin/provider** — the seven-node cluster: `AdminAuditPanel` · `AdminFlaggedPanel` ·
  `AdminTagsPanel` · `AdminUsersPanel` · `browser/admin/index.ts` · `useAdminUsers.ts` ·
  `usePalettePorts.ts`. Load class only.

**The two adjudicated cycles OUTSIDE the four, which G-E exists to make visible** — both reproduce
here at the exact bytes their records cite:

- **CPE L-24** (`registry/adjudicated/CurrentPaletteEditor.md`): *"palettes ↔ shell mutual dependency
  (type-import up at usePalettePorts.ts:19, five SESSION_PORT_KEY value-imports down — verified);
  lattice cycle, not load-time."* Measured here as an **ownership pair with 17 witness edges**, and
  absent from both the runtime and the load class — which is precisely what "lattice, not load-time"
  predicts. Owner **X-W8**.
- **AP-19** (`registry/adjudicated/AuroraPane.md:83`, MAJOR, NO-WAVE-OWNER): *"`useAtmosphere.ts`
  (color-picker/boot) statically imports `scenes/atmosphere/aurora-atoms` while
  `aurora-harmony-stops.ts` (scenes) imports `color-picker/boot/atmosphere-calibration` — a
  bidirectional area edge, both edges aurora's."* Both edges measured;
  `aurora-harmony-stops.ts:23` is the back-edge. **No owner**, and the record's reason is carried
  verbatim in `sccs.json`. This graph is the register that hands it to the next formation boundary
  unforgotten; it does not re-home it.

**Why the ownership class is emitted at two granularities.** Area-level Tarjan collapses any
two-way-coupled lattice into one component — here an 8-area blob in which *both* adjudicated cycles
would be invisible. G-E's falsifier names that exact failure: *"X-W8 binds CC-079's four SCC owners
from a graph that cannot see two adjudicated cycles — the subtraction then proves only what the
graph was shaped to show."* The `ownership.pair` class is the refinement that answers it: the mutual
pairs are emitted individually, so L-24 and AP-19 each appear as their own row with their own
witnesses. Both classes are emitted; neither is a substitute for the other.

---

## 6. Residuals — stated, not hidden

1. **One false-positive unbound render tag.** `census.renderTagsUnboundToAnImport` = **1**:
   `demo/palettes/browser/card/PaletteCard/PaletteCard.vue`, tag `Card`. The byte is at **`:12`**,
   inside a JavaScript line-comment nested in a template `:class="[…]"` binding expression
   (*"… is retired. NOT `<Card` / surface=cartoon>"*). HTML comments in templates are blanked before
   tag extraction — which is what removed the other two (`<EasingPicker>` in the two gradient
   visualizers) — but a JS comment inside an attribute expression would need a template-expression
   parser, and building one for a single benign site is contrivance. **Recorded, bounded, and
   re-measurable**: the figure is 1, the file and line are named, and any change to it is visible in
   the census digest.
2. **Two genuinely unresolved specifiers, both real.** `e2e/smoke/admin/fixtures/admin-populated.ts`
   and `e2e/smoke/fixtures/browse-palettes.ts` both import `demo/@/lib/palette/types`, a tree that
   no longer exists. They are in the `e2e` band, outside the denominator, so they do not move any
   §2 figure — but they are dangling imports in tracked test fixtures and are recorded here for the
   wave that owns `e2e/`.
3. **Off-roster ≠ unresolved.** Specifiers that resolve to files outside the five subject roots
   (vite's own plugin modules at the repo root) are typed `outside:` and are **not** counted as
   unresolved. Conflating the two is what made the naive count read 5; the honest count is 2.

---

## 7. Round-trip and falsifier evidence (HG-14)

**Round trip, ⟨`node docs/tranches/V/megatranche/workflows/graph-v3.mjs --verify`⟩ → exit 0:**

```
graph-v3 --verify · round-trip over two independent in-process builds
  run1 vs run2  nodes   MATCH  0e75a1c9cc1a5c6c90494a186fc010bc934a18a0f1f288554152740072a55000
  run1 vs run2  edges   MATCH  4f1fb14fda15c0a80cd769cdae579e32948bd820aeba9057c9c888a7873a30c6
  run1 vs run2  sccs    MATCH  bf9c9a20cb4c4ca2c0dc28c7349851a0aec5709a2bd375caa615ad80412c82a3
  run1 vs run2  census  MATCH  e3a09112213701e05e9f6ba163b7f97cde7ed15608a09a08bf7b19cca359d54a
  run1 vs run2  graph   MATCH  b3a387c9afd00ca07639812bfc0598593fdf84d1829eb37ca09be3a906782bee
  committed     nodes   MATCH  0e75a1c9cc1a5c6c90494a186fc010bc934a18a0f1f288554152740072a55000
  committed     edges   MATCH  4f1fb14fda15c0a80cd769cdae579e32948bd820aeba9057c9c888a7873a30c6
  committed     sccs    MATCH  bf9c9a20cb4c4ca2c0dc28c7349851a0aec5709a2bd375caa615ad80412c82a3
  committed     census  MATCH  e3a09112213701e05e9f6ba163b7f97cde7ed15608a09a08bf7b19cca359d54a
  committed     graph   MATCH  b3a387c9afd00ca07639812bfc0598593fdf84d1829eb37ca09be3a906782bee
  G-E closure   GREEN  11 SCCs = 6 owned + 5 reasoned-no-owner + 0 unnamed
  HG-14 four    GREEN
ROUND-TRIP GREEN
```

Determinism is structural, not lucky: the roster comes from `git ls-files` (never filesystem
iteration order), every array is sorted by a total key before hashing, and every object is
serialized through a recursive key-sorting canonicalizer. **Non-determinism across two runs is a
tool defect and a triumvirate trigger, never an edit to the output** (W0.md §Triumvirate Dispatch,
bullet 2).

**The falsifier, executed.** HG-14: *"remove one resolver-alias edge and either a named SCC
disappears or the round-trip digest changes."* Run against a mutated copy of the tool with a
re-hashed byte-exact restore (tool sha256 `98e4d3a7…` before **and** after):

| arm | mutation | result |
|---|---|---|
| A | the `@src` alias removed from the alias table | `nodes`, `edges`, `graph` all **DIFFER** from committed — `graph` → `801021ba…`. 3 mismatches, exit 1. |
| B | the typed alias edge suppressed (the `alias` domain emitted nothing) | `edges`, `graph` **DIFFER** — `graph` → `086cb8ed…`. 2 mismatches, exit 1. |

Both mutants stayed internally deterministic (run1 = run2 in each), so the gate distinguishes *"the
graph changed"* from *"the tool is flaky"* — which is the distinction the triumvirate trigger turns
on. The precedent HG-14 names — *"the alias-aware rerun that moved keyframes demo edges 245 → 399"* —
is the kind of movement arm A reproduces.

---

## 8. Artifacts

| path | content |
|---|---|
| `docs/tranches/X/W0/GRAPH-V3/nodes.json` | 487 nodes, typed and banded, with per-file sha256 |
| `docs/tranches/X/W0/GRAPH-V3/edges.json` | 2,996 typed edges + domain and kind histograms |
| `docs/tranches/X/W0/GRAPH-V3/sccs.json` | 11 SCCs, four classes, every one with an owner or a written reason, with witness edges |
| `docs/tranches/X/W0/GRAPH-V3/census.json` | this census, machine-readable, with the full 64-hex SFC digests |
| `docs/tranches/X/W0/GRAPH-V3/digests.json` | the five digests + counts + the alias table |
| `docs/tranches/V/megatranche/workflows/graph-v3.mjs` | the tool |
