# OM-16 — Palette-item scalability under arbitrary N

**Mark:** OM-16 (`docs/tranches/V/megatranche/audit/visual/owner-marked/OM-16-palette-item-arbitrary-n.png`)
**Owner edict (verbatim):** *"we should plan to handle an arbitrary number of palette colors, tags, etc, deftly within these palette items."*
**Seat:** Opus 5 census seat, mega-tranche audit. **Method:** source-only (no browser). **Evidence law:** file:line on every claim.
**Scope constraint honored:** no source edits; this document is the only artifact written.

---

## §0 — Verdict in one paragraph

The palette-item family is **N-naive at the meta row and N-aware only in the strip**. Three distinct failure classes exist:

1. **Silent data loss** — tags past index 2 vanish with no "+N" affordance (`PaletteCardMeta.vue:37`); flagged-panel colors past index 4 vanish likewise (`AdminFlaggedPanel.vue:54`). The codebase already ships the correct idiom twice (`VersionHistoryDrawer.vue:59-63`, `PreviewStrip.vue:25/73-75`) — the card simply didn't adopt it.
2. **Horizontal overflow of the title row** — every meta chip is `shrink-0` inside a row with no `flex-wrap` and no `overflow-hidden`, and the card itself deliberately carries no clip (`PaletteCard.vue:18-19`). Three 30-char tags (a *legal* server payload) overflow the card's right edge at 390px. **This is the worst break and it occurs inside the current data-layer bound, not beyond it.**
3. **Sliver collapse then clipped loss in the band strip** — `Math.max(100 / n, 0.5)` on `shrink-0` segments (`PaletteColorStrip.vue:70`) degrades to 1.8px bands at N=200 and starts *clipping colors entirely* at N>200.

The data-layer bound is **not absent**: the server hard-caps colors at 50 and tags at 10 (`api/src/modules/palette/schema.ts:33,35`). The **client-local store has no cap at all** (`demo/palettes/usePaletteStore.ts:66-95`), so N is unbounded on the local path and a >50 local palette fails publish with a raw zod string (`usePaletteActions.ts:54-57`).

---

## §1 — Surface inventory

Every surface that renders a palette's colors, tags, or counts at variable N. `†` = reuses a shared sub-component (behavior inherited).

| # | Surface | File:line | Renders at variable N |
|---|---|---|---|
| S1 | **PaletteColorStrip** (the band row) | `demo/palettes/browser/card/PaletteColorStrip.vue:13-23` | colors → % -width flex segments |
| S1a | ↳ host: PaletteCard top/aside strip | `demo/palettes/browser/card/PaletteCard/PaletteCard.vue:33-37` | † S1 |
| S1b | ↳ host: Mix palette-dropdown header | `demo/workbenches/mix/MixSourceSelector.vue:203` | † S1 |
| S1c | ↳ host: Generate preview plate | `demo/workbenches/generate/GenerateControls.vue:135` (source `:55`) | † S1 |
| S2 | **PaletteCard title/meta row** | `PaletteCard.vue:43-79` | name, count badge, featured badge, † S3, menu |
| S3 | **PaletteCardMeta** (chip cluster) | `demo/palettes/browser/card/PaletteCard/PaletteCardMeta.vue:6-54` | fork icon, fork count, version count, **tags**, vote count |
| S4 | **PaletteCardSwatches** (expanded panel) | `demo/palettes/browser/card/PaletteCard/PaletteCardSwatches.vue:21-65` | colors → wrapping 36/40px dots + slug chip |
| S5 | **PaletteCardMenu** | `demo/palettes/browser/card/PaletteCard/PaletteCardMenu.vue:15-130` | **fixed arity** (13 items + 5-item export submenu) — no N-variance |
| S6 | **PaletteCardGrid** (browse/saved host) | `demo/palettes/browser/card/PaletteCardGrid.vue:2-6` | N cards, `grid-cols-1` always |
| S6a | ↳ host: BrowsePane | `demo/palettes/BrowsePane.vue:80-118` | page of 50 (`useBrowsePalettes.ts:18`) |
| S6b | ↳ host: PalettesPane (drag-sortable) | `demo/palettes/PalettesPane.vue:75-98` | unbounded local list |
| S7 | **CurrentPaletteEditor** (working-palette strip) | `demo/palettes/browser/card/CurrentPaletteEditor.vue:24-113` | colors → wrapping 44/48px dots |
| S8 | **VersionHistoryDrawer** rows | `demo/palettes/browser/dialog/VersionHistoryDrawer.vue:51-64` | colors → capped 8 **+ "+N" chip** |
| S9 | **TagEditPopover** | `demo/palettes/browser/search/TagEditPopover.vue:21-35` | all-tags catalog, scrolling |
| S10 | **SearchFilterBar** tag filter + count badge | `demo/palettes/browser/search/SearchFilterBar.vue:47-59`, badge `:7-12` | catalog list; active-filter count |
| S11 | **AdminFlaggedPanel** row swatches | `demo/palettes/browser/admin/AdminFlaggedPanel.vue:52-59` | colors → capped 5, **no "+N"** |
| S12 | **AdminUsersPanel** expanded user palettes | `demo/palettes/browser/admin/AdminUsersPanel.vue:139-152` | † S2/S3/S4 (full PaletteCard) |
| S13 | **AdminTagsPanel** taxonomy chips | `demo/palettes/browser/admin/AdminTagsPanel.vue:86-107` | all tags, grouped, `flex-wrap` |
| S14 | **MixSourceSelector** palette dropdown dots | `demo/workbenches/mix/MixSourceSelector.vue:209-222` | **all** colors, uncapped, per palette |
| S14a | ↳ palettes-mode cards | `MixSourceSelector.vue:264-267` | † S2/S3 (PaletteCard, no expand) |
| S15 | **MixResultDisplay** result dots + gradient | `demo/workbenches/mix/MixResultDisplay.vue:97-116` | all result colors |
| S16 | **ShadowPalette** / **PaletteCardSkeleton** ghosts | `ShadowPalette.vue:51-80`; `PaletteCardSkeleton.vue:39-79` | `count`-driven segments + swatches |
| S16a | ↳ host: Extract instrument face (live k) | `demo/workbenches/extract/ExtractWorkbench.vue:159` | k ∈ [1,16] (`ExtractControls.vue:28-29`) |
| S17 | **PreviewStrip** (reference implementation) | `demo/color-session/color-chips/PreviewStrip.vue:25,32-35,72-75` | capped 7 + mask-fade "continues" |
| S18 | **Export SVG/PNG** (N-scaled raster) | `demo/palettes/export.ts:61-75, 93-96` | canvas width = N × 120px |

**Surfaces confirmed clean of palette-N rendering:** `PaletteSlugBar.vue`, `ApiOfflineChip.vue`, `MiniColorPicker.vue`, `UserSortMenu.vue`, `AdminAuditPanel.vue`, `AdminNamesPanel.vue`, `AdminListItem.vue` (slot-only, `AdminListItem.vue:13-15`), `FlagReportDialog.vue`, `MigratePalettesDialog.vue`. Sweep basis: `grep -rn "\.colors" demo/ --include="*.vue"` and `grep -rn "tags" demo/ --include="*.vue"` — all hits homed above.

---

## §2 — Per-surface N-behavior

### §2.1 S1 — PaletteColorStrip (the band row) — **the OM-16 screenshot's 3 bands**

Layout: container `flex h-10 w-full` + `overflow-hidden` (`PaletteColorStrip.vue:8-11`); each segment is **`shrink-0`** with an inline percentage width (`:14-22`).

Width law (`PaletteColorStrip.vue:70`):
```
return colors.map(() => Math.max(100 / n, 0.5));
```

| N | segment width | on a 360px card | state |
|---|---|---|---|
| 1 | 100% | 360px | fine |
| 2 | 50% | 180px | fine |
| 8 | 12.5% | 45px | fine |
| 20 | 5% | 18px | fine |
| 50 (**server max**) | 2% | 7.2px | legible band, no label affordance |
| 100 | 1% | 3.6px | **sliver** — hue reads, identity does not |
| 200 | 0.5% | 1.8px | **sub-2px**; sum = exactly 100% |
| **>200** | 0.5% floor | 1.8px | **COLORS DISAPPEAR** — Σ = 0.5·n% > 100%, and `shrink-0` (`:16`) forbids compression, so the tail overflows and is eaten by `overflow-hidden` (`:8`). At N=400 half the palette is invisible with zero indication. |

**Second defect — the weight floor is not a floor.** `WEIGHT_FLOOR = 0.08` (`:48`) is applied then *renormalized* (`:63-68`):
```
const floored = effective.map(w => Math.max(Math.max(w,0)/total, WEIGHT_FLOOR));
const flooredTotal = floored.reduce(...);
return floored.map(x => (x / flooredTotal) * 100);
```
At n ≥ 13 every segment can be at the floor, `flooredTotal = 0.08n`, and each output collapses back to `100/n` — i.e. **the proportional population story that extracted palettes carry (`demo/palettes/types.ts:5-11`) is silently flattened to equal-width for any palette above 12 colors**, and no segment is ever actually guaranteed 8%.

Keys are index-based (`:15` `:key="i"`) — no collision, but reorders repaint rather than move. Height is `h-10` fixed → **strip height is N-invariant** (good).

### §2.2 S2/S3 — the title + meta row — **THE WORST FAILURE**

Row: `PaletteCard.vue:43` `flex items-center justify-between gap-2 min-w-0`; left group `:44` `flex items-center gap-2 min-w-0`. **No `flex-wrap`. No `overflow-hidden`.** The card explicitly refuses a clip by design (`PaletteCard.vue:18-19` — "NO overflow-hidden (S.W5-10 / S-15-A)").

Every chip in that row is `shrink-0`:

| chip | file:line | width behavior |
|---|---|---|
| featured badge | `PaletteCard.vue:64` `shrink-0` | ~72px constant |
| color-count badge | `PaletteCard.vue:72-74` `shrink-0` | 2 digits max (N≤50) → ~28px |
| fork indicator | `PaletteCardMeta.vue:8-13` `shrink-0` | ~18px |
| fork **count** | `PaletteCardMeta.vue:16-23` `shrink-0` | grows with digits, **no compaction** |
| version **count** | `PaletteCardMeta.vue:26-33` `shrink-0` | idem |
| **tag chips ×3** | `PaletteCardMeta.vue:36-40` `shrink-0`, **no `truncate`, no `max-w`** | grows with tag length, unbounded |
| vote button | `PaletteCardMeta.vue:43-54` `shrink-0` | ~52px |
| menu button | `PaletteCard.vue:96-104` `shrink-0` | 32px |

**Tags at arbitrary N (`PaletteCardMeta.vue:37`):**
```
v-for="tag in (palette.tags ?? []).slice(0, 3)"
```
- **Hard cap 3, silent.** Tags 4-10 (all legal — `api/.../schema.ts:35` allows 10) render *nowhere on the card*. There is no "+N" chip, no tooltip listing, no scroll. A user who tags a palette `warm / test / alpha / autumn / client-a` sees three and has no signal the other two exist. **This is the literal content of OM-16's three visible tags.**
- **No wrap, no truncate.** Because the row cannot wrap and chips cannot shrink, tag *length* is the overflow driver, not tag count. Server allows 30 chars/tag (`schema.ts:35`). Three 30-char tags at `text-micro` ≈ 3 × ~150px = **~450px of unshrinkable chips**, plus badge + counts + vote + menu, inside a 390px-viewport card. The row **overflows the card's right edge** (nothing clips it) and the name is squeezed to a zero-width ellipsis first. **Break point: N_tags = 3 with long names — well inside the data bound.**
- `:key="tag"` (`:38`) is the tag string. `tagsArraySchema` (`schema.ts:35`) carries **no uniqueness refinement** and `crud.ts:184` writes `$set.tags = body.tags` verbatim, so a duplicate tag injected via the API is a **duplicate Vue key** (dev warning + patch ambiguity). The shipped UI cannot produce it (`TagEditPopover.vue:64-66` toggles from an `includes` check), so this is API-reachable only.

**Counts at large values (`PaletteCardMeta.vue:22, 32, 53`):** rendered raw — `{{ palette.forkCount }}`, `{{ palette.versionCount }}`, `{{ palette.voteCount ?? 0 }}`. There is **no number compaction anywhere in demo/** — `grep -rn "toLocaleString\|Intl.NumberFormat" demo/` returns zero hits. fork=4,096 renders `4096` (~34px); history=10,000 renders `10000` (~42px). Chips are not fixed-width, so they don't clip — they *push*, adding ~80px of unshrinkable width to an already-overflowing row. Related: `SearchFilterBar.vue:7-12` puts the active-filter count in a **fixed `h-4 w-4` circle** — at ≥10 selected tags the digits overflow the badge geometry.

**Name at arbitrary length (`PaletteCard.vue:55`):** `line-clamp-2 sm:line-clamp-1` + `:title="palette.name"` (`:57`). Server caps names at 100 chars (`schema.ts:25`). `line-clamp` implies `overflow:hidden`, which resolves the flex item's `min-width:auto` to 0 — so the name **is** the only shrinkable thing in the row and absorbs all pressure, collapsing to nothing before any chip yields. On mobile it may take 2 lines → **+1 line of card-height variance** (the only intrinsic height variance in the collapsed card).

### §2.3 S4 — PaletteCardSwatches (expanded panel)

`px-3 pb-3 flex flex-wrap gap-2` (`PaletteCardSwatches.vue:22`), children `w-9 h-9 sm:w-10 sm:h-10` `shrink-0` (`PaletteCard.vue:197` default). Wraps correctly — **no overflow, no data loss, no cap**. Cost is height and DOM:

| N | rows @360px (≈8/row) | added height | mounted `SwatchHoverMenu` (WatercolorDot + Popover each, `SwatchHoverMenu.vue:8-51`) |
|---|---|---|---|
| 8 | 1 | ~48px | 8 |
| 20 | 3 | ~144px | 20 |
| 50 (server max) | 7 | ~336px | 50 |
| 200 (local, uncapped) | 25 | ~1200px | 200 popover instances |

`useHeightTransition` uses a **fixed 350ms expand regardless of height** (`useHeightTransition.ts:7,30`) and calls `scrollIntoView({block:"nearest"})` on completion (`:48`) — for a panel taller than the viewport this yanks the scroll position. Keys are `${color.css}-${i}` (`PaletteCardSwatches.vue:28`) — **index-disambiguated, so duplicate colors are safe** (contrast with `PaletteColorStrip`'s bare index).

Slug chip: `truncate max-w-tooltip` (`:9`) — correctly bounded.

### §2.4 S7 — CurrentPaletteEditor (working strip)

`flex items-center gap-2.5 flex-wrap` (`:27`), dots `w-11 h-11 sm:w-12 sm:h-12`. Wraps; no cap; the add-slot is a keyed sibling (`:87`). Header shows `{{ savedColorStrings.length }} color{{ ... }}` (`:21`) — correct singular/plural, raw number, no compaction needed at these magnitudes. **No break, only unbounded growth**; a 200-color working palette makes the editor ~1400px tall inside the pane scroller.

### §2.5 S8 — VersionHistoryDrawer — **the good precedent**

```
v-for="(c, ci) in version.colors.slice(0, 8)"        (:53)
<span v-if="version.colors.length > 8"> +{{ version.colors.length - 8 }} </span>   (:59-63)
```
Cap **with** honest overflow signal, `-space-x-0.5` overlap (`:51`) so the 8 dots are compact. Rows are keyed by `version.hash` (`:26`), name is `truncate` (`:46`), the list is `overflow-y-auto` (`:15`) and pages at 20 with an explicit "Load older versions" (`:88-97`, `:140`). **This surface is already deft.** It is the pattern the card should adopt.

### §2.6 S11 — AdminFlaggedPanel

`(item.palette?.colors ?? []).slice(0, 5)` (`:54`) with `-space-x-1` overlap and `:key="i"` — **cap without a "+N"**. Same silent-loss class as the tags, at N_colors > 5. Lower severity (admin-only surface, colors are identity-lite here).

### §2.7 S13/S9/S10 — tag surfaces

- **AdminTagsPanel** (`:90-105`): `flex flex-wrap gap-1.5`, grouped by category, chips have no `max-w` — a 30-char tag chip is ~180px but the container wraps, so it grows in height only. **No break**, but the whole taxonomy renders at once with no virtualization (`:86`).
- **TagEditPopover** (`:21`): `max-h-40 overflow-y-auto scrollbar-thin`, each row `truncate` (`:32`). **Correctly bounded.** But there is **no max-selected policy** — `onToggle` (`:64-66`) will happily push an 11th tag, which the server then rejects with a 400 (`schema.ts:35` `.max(10)`); `saveTags` (`:77`) has no visible failure path back to the user in this component.
- **SearchFilterBar** (`:49`): `max-h-28 overflow-y-auto`. **Correctly bounded.** Badge geometry defect noted in §2.2.

### §2.8 S14/S15 — Mix workbench

- `MixSourceSelector.vue:209-222`: `flex flex-wrap gap-1.5` over **every** color of **every** saved palette in an open collapsible — `w-8 h-8 shrink-0` WatercolorDots, one seeded instance per color (`:219`). M palettes × N colors mounted simultaneously; at 20 saved palettes × 50 colors that is **1000 seeded dot instances** in one collapsible. Wraps (no overflow), but this is the heaviest N-multiplied surface in the tree.
- `MixSourceSelector.vue:254`: `palette.colors.slice(0, 4)` — a *data* cap on the convergence-animation payload, not a display cap. Correct as-is (animation drop budget is `MAX_DROPS = 12`, `mixStage.ts:29`).
- `MixResultDisplay.vue:97-106`: all result colors, `flex flex-wrap gap-2`. Result length = `min` or `max` of input palette lengths (`demo/palettes/mix.ts:121-124`), so it inherits the input bound.

### §2.9 S16 — the ghost/skeleton species

`ShadowPalette.vue:51-57` strip cells are `flex-1 min-w-0` — **correctly shrinkable**, unlike the real strip. Swatch ghosts are `shrink-0` and wrap (`:71-79`). The defect is the **stagger clock**: swatch delay = `count*0.12 + 0.34 + (i-1)*0.1` (`:77`), so at count = 16 (the live-k max, `ExtractControls.vue:29`) the last ghost swatch begins pulsing at **3.76s**. `PaletteCardSkeleton.vue:48` uses `width: ${100/count}%` with the same shape. Bounded today by k ≤ 16; would degenerate badly if `count` were ever fed a real palette length.

### §2.10 S6 — the card grid / card height law

`PaletteCardGrid.vue:4`: `grid grid-cols-1 gap-3` — **always single-column** in both hosts (`BrowsePane.vue:80-91` passes only opacity classes as `gridClass`; `PalettesPane.vue:75-81` passes none). `grep -rn "grid-cols" demo/palettes` confirms no multi-column variant exists.

⇒ **There is no masonry/row-alignment failure mode today**, because there are no sibling columns to misalign. Height variance is therefore benign *at present* but is the latent risk the moment a `sm:grid-cols-2` is introduced. Sources of variance, ranked:

1. expanded swatch panel — unbounded, ~48px per 8 colors (§2.3);
2. name wrapping to 2 lines below `sm` (`PaletteCard.vue:55`);
3. slug row present/absent (`PaletteCardSwatches.vue:4-20`).

The strip (`h-10`) and the meta row (single-line, no wrap) contribute **zero** N-variance — the row trades height stability for horizontal overflow.

Secondary: `PalettesPane` drag-sorts the grid via `$el` (`PaletteCardGrid.vue:7-11`, `PalettesPane.vue:180`); tall expanded cards make drag targets span multiple screens.

### §2.11 S18 — export raster (out-of-viewport N failure)

`export.ts:61-65`: `width = palette.colors.length * 60`, then PNG rasterizes at 2× (`:93-95`) ⇒ **canvas width = N × 120px**.

| N | PNG canvas width | state |
|---|---|---|
| 50 (server max) | 6,000px | ok |
| **≈136** | **16,320px** | at the ~16,384px browser dimension ceiling |
| 200 (local) | 24,000px | **`toBlob` returns null / blank image — silent export failure** |

Note `demo/palettes/export/svg.ts:15` (the canonical byte-exact exporter, `viewBox="0 0 ${n} 1"` at fixed 1200×240) is **N-invariant and correct** — but `usePaletteExport.ts:9` imports from `./export`, resolving to `demo/palettes/export.ts` (there is no `export/index.ts`), so **the N-scaled path is the live one**.

---

## §3 — Data-layer bounds

**Correction to the inherited anchor ("no obvious data-layer maximum exists"): a server maximum does exist and is enforced.**

| bound | value | file:line |
|---|---|---|
| colors per palette (create/update) | **min 1, max 50** | `api/src/modules/palette/schema.ts:33` — `z.array(colorEntrySchema).min(1).max(50)` |
| CSS string per color | ≤ 200 chars | `api/src/modules/palette/schema.ts:28` |
| color name per color | ≤ 64 chars | `api/src/modules/palette/schema.ts:29` |
| tags per palette | **max 10** | `api/src/modules/palette/schema.ts:35` — `z.array(z.string().min(1).max(30)).max(10)` |
| tag string length | ≤ 30 chars | `api/src/modules/palette/schema.ts:35` |
| tag uniqueness | **NONE** — no `.refine`; `crud.ts:184` writes verbatim | `schema.ts:35`, `service/crud.ts:184` |
| palette name | ≤ 100 chars | `api/src/modules/palette/schema.ts:25` |
| slug | ≤ 120 chars | `api/src/modules/palette/schema.ts:19-23` |
| admin import colors | same 50 cap (reuses `colorsArraySchema`) | `api/src/modules/admin/schema.ts:9,57` |
| browse page size | 50 | `demo/palettes/useBrowsePalettes.ts:18`; server `limit ≤ 100` `schema.ts:80` |
| version page size | 20 | `VersionHistoryDrawer.vue:140` |
| `forkCount` / `versionCount` / `voteCount` | **unbounded `number`** | `api/src/modules/palette/model.ts:59,76,77` |

**Client-side caps — where the "arbitrary" actually lives:**

| path | cap | evidence |
|---|---|---|
| local palette store (`createPalette` / `updatePalette`) | **NONE** | `demo/palettes/usePaletteStore.ts:66-95, 97-107` — no length check on `colors` |
| Extract quantizer k | 1–16 | `demo/workbenches/extract/ExtractControls.vue:28-29`; default 5 `useExtractSession.ts:44` |
| Generate count | 1–12 | `demo/workbenches/generate/GenerateControls.vue:301-302` |
| Mix selected colors | 12 (`MAX_COLORS`) | `demo/workbenches/mix/MixSourceSelector.vue:38,40` |
| Mix palette result length | min/max of inputs | `demo/palettes/mix.ts:121-124` |
| CurrentPaletteEditor add | **NONE** — one-at-a-time, unbounded | `CurrentPaletteEditor.vue:95-105` |
| TagEditPopover selection | **NONE** (server rejects the 11th) | `TagEditPopover.vue:64-66` vs `schema.ts:35` |

**The gap:** a local palette can reach arbitrary N by repeated adds, then **fails publish** with the raw server message surfaced verbatim to the card feedback rail: `` `Failed to publish: ${msg}` `` (`demo/palettes/usePaletteActions.ts:54-57`). There is no pre-flight check, no cap indicator, and no truncate-or-split offer.

**Design target grounded:** design for **N_colors ∈ [0, 50] rendering perfectly and [51, ∞) degrading honestly**, and **N_tags ∈ [0, 10] rendering perfectly**. (N=0 colors is a real reachable state — `PaletteCard.vue:220-223` names `EMPTY_PALETTE_SWATCH`; `PaletteColorStrip.vue:52` returns `[]` and paints an empty 40px band.) The `min(1)` on the server means **N=0 is local-only**.

---

## §4 — Deft-handling disposition (direction only — feeds a wave spec)

House idioms already ratified in this tree, to be reused rather than re-invented:
- **cap + "+N" chip** — `VersionHistoryDrawer.vue:53-63`
- **cap + mask-fade "continues"** — `PreviewStrip.vue:25, 32-35, 72-75` (explicitly a *named taste knob* so no writer re-mints it)
- **scroll with `max-h-*` + `scrollbar-thin`** — `TagEditPopover.vue:21`, `SearchFilterBar.vue:49`
- **`truncate` + `max-w-*` on user strings** — `PaletteCardSwatches.vue:9`, `PaletteCardMenu.vue:9`

| Surface | Disposition | Ownership |
|---|---|---|
| **S3 tags** (`PaletteCardMeta.vue:36-40`) | Replace the bare `.slice(0,3)` with **visible-until-fits + `+N` overflow chip**, the `+N` chip opening the full tag list (popover or the existing TagEditPopover in read mode). Add `truncate max-w-[9ch]` to each chip so a 30-char tag cannot drive the row. | **GLASS-FORWARD** — the `+N` overflow chip is a generic primitive (`OverflowChip` / `ChipGroup max-visible`); belongs in glass-ui per the glass-first law. Demo owns only the tag→chip mapping. |
| **S2 meta row** (`PaletteCard.vue:43-44`) | The row must stop being an unclipped no-wrap flex of `shrink-0` atoms. Two candidate laws: (a) `min-w-0 overflow-hidden` on the left group + priority-order collapse into the `+N` chip; (b) allow the chip cluster to wrap to a second line under a fixed 2-line budget. (a) preserves the N-invariant card height and is preferred. | **GLASS-FORWARD** — a priority-collapse row ("MetaRow" / `ChipGroup`) is design-system furniture; demo owns the chip inventory + priority order. |
| **S1 strip** (`PaletteColorStrip.vue:70`) | Kill the `Math.max(…, 0.5)` clip-inducing floor: use `flex-1 min-w-0` + a `flex-basis` proportional to weight so segments always sum to the container (the ShadowPalette idiom, `ShadowPalette.vue:55`, already does this correctly). Above a **band-legibility threshold** (~N > 24 at card width) switch to a *summarizing* strip — either a continuous `linear-gradient` (the MixResultDisplay idiom, `MixResultDisplay.vue:109-116`) or first-K bands + mask-fade tail (`PreviewStrip.vue:73-75`) — so the strip never becomes a sliver comb. Separately: rework the weight floor so it is a genuine floor (clamp the *excess* redistribution) or delete it above n=12 and say so. | **Demo-owned** (palette-specific weighting semantics), with the fade-tail token/mask borrowed from `PreviewStrip`. |
| **S3 counts** (`PaletteCardMeta.vue:22,32,53`) | Introduce **one** compact-number formatter (`1.2k`, `4.1k`, `10k`) and apply at every count site. None exists today (zero `toLocaleString`/`Intl.NumberFormat` hits in demo/). Keep the full number in the existing `:title` (`:19,:30`). | **GLASS-FORWARD** if it lands as a formatting util/`<Count>` atom; otherwise a single demo util in `demo/shared/utils.ts`. Prefer glass-ui — the dock and admin panels will want it. |
| **S10 filter badge** (`SearchFilterBar.vue:7-12`) | `h-4 w-4` → `min-w-4 h-4 px-1` so 2-digit counts fit; or cap at `9+`. | **GLASS-FORWARD** (Badge/count-dot variant). |
| **S4 expanded swatches** (`PaletteCardSwatches.vue:21-65`) | Above ~24 colors, cap the *mounted* `SwatchHoverMenu` instances (render plain dots past the cap, hydrate the hover menu on demand) and give the panel a `max-h` + inner scroll so a 200-color local palette doesn't produce a 1200px card. Feed the real height to `useHeightTransition` so the 350ms constant scales (`useHeightTransition.ts:7,30`) and reconsider the unconditional `scrollIntoView` (`:48`) for tall panels. | **Demo-owned**; the on-demand-hover-menu pattern may generalize later. |
| **S11 flagged swatches** (`AdminFlaggedPanel.vue:52-59`) | Adopt the S8 idiom verbatim: `slice(0,5)` **+ `+N`**. One-line parity fix. | **Demo-owned** (or free once the glass `+N` chip exists). |
| **S9 tag selection** (`TagEditPopover.vue:64-66`) | Enforce the server's 10-tag cap client-side: disable unchecked boxes at 10 selected and say why. Surface `saveTags` failures. | **Demo-owned.** |
| **S7 current editor** (`CurrentPaletteEditor.vue:24-113`) | Show the publish bound *before* publish: a `N/50` readout on the existing count line (`:21`) once N > 40, and a pre-flight guard in `onPublish` (`usePaletteActions.ts:40-58`) that offers truncate-or-split instead of relaying a raw zod string. | **Demo-owned.** |
| **S14 mix dropdown** (`MixSourceSelector.vue:209-222`) | Cap the dots per palette (reuse `+N`) or render the collapsed palette as a strip only, expanding dots on selection. Removes the M×N seeded-instance multiplication. | **Demo-owned.** |
| **S18 export** (`export.ts:61-65,93-96`) | Either point `usePaletteExport` at the N-invariant canonical exporter (`export/svg.ts:15`) or clamp the raster to a fixed output width with proportional swatches. Today N ≈ 136 silently produces a blank PNG. | **Demo-owned.** |
| **S6 grid** (`PaletteCardGrid.vue:4`) | No change required while single-column. If a multi-column variant is ever specced, the card-height law from §2.10 must be fixed first (`align-items: start` + a collapsed-height invariant). | **Demo-owned.** |
| **S16 ghosts** (`ShadowPalette.vue:77`) | Clamp the stagger total (e.g. distribute a fixed 1.2s wave across `count`) so the animation does not lengthen linearly with N. | **Demo-owned.** |

**BJ relay (glass-first law, `feedback-glassui-bhbi-relay.md`):** four GLASS-FORWARD items — **(1) overflow `+N` chip / `ChipGroup max-visible`, (2) priority-collapse meta row, (3) compact-number formatting atom, (4) count-badge min-width variant.** These are generic; minting them in `demo/` would violate the glass-first precept.

---

## §5 — Counts + severity ranking

**Counts.** 18 surfaces inventoried (S1–S18) across 5 hosts; 20 files carry N-variable palette rendering. **3** surfaces silently drop data (S3 tags, S11 colors, S1 at N>200). **2** surfaces already implement the correct idiom (S8, S17). **1** surface overflows its container inside the legal data bound (S2/S3). **0** number-compaction helpers exist. **0** client-side caps on local palette colors or on tag selection. Server bounds: colors ≤ 50, tags ≤ 10.

| # | Severity | Surface | Failure | Triggers at | Evidence |
|---|---|---|---|---|---|
| 1 | **P0** | S2/S3 meta row | Unshrinkable, unwrappable, unclipped chip row overflows the card edge; name collapses to nothing | **N_tags = 3 with ~30-char names** (legal payload) at 390px | `PaletteCard.vue:43-44,18-19`; `PaletteCardMeta.vue:39` (`shrink-0`, no `truncate`) |
| 2 | **P0** | S3 tags | Tags 4–10 render nowhere; no "+N", no tooltip, no scroll — silent data loss | **N_tags = 4** | `PaletteCardMeta.vue:37` |
| 3 | **P1** | S1 strip | Colors past the 200th are clipped away entirely (`shrink-0` + Σ > 100% + `overflow-hidden`) | **N_colors > 200** (local only) | `PaletteColorStrip.vue:8,16,70` |
| 4 | **P1** | S1 strip | Bands become illegible slivers; weight floor silently flattens to equal-width | slivers **N ≥ 100**; floor defeated **n ≥ 13** | `PaletteColorStrip.vue:70`; `:48,63-68` |
| 5 | **P1** | S18 export | PNG canvas exceeds the browser dimension ceiling → blank/null blob, silent failure | **N ≈ 136** | `export.ts:64,93-95` |
| 6 | **P2** | S7 → publish | Local palette exceeds the server's 50 with no UI signal; failure is a raw zod string | **N_colors = 51** on publish | `usePaletteStore.ts:66-95`; `usePaletteActions.ts:54-57`; `schema.ts:33` |
| 7 | **P2** | S4 expanded panel | Unbounded card height + one Popover/WatercolorDot per color; fixed 350ms expand; `scrollIntoView` yank | noticeable **N ≥ 50**, severe **N ≥ 150** | `PaletteCardSwatches.vue:22`; `SwatchHoverMenu.vue:8-51`; `useHeightTransition.ts:7,30,48` |
| 8 | **P2** | S3 counts | No compaction anywhere; 4–5 digit counts add ~80px of unshrinkable width to the P0 row | **fork/version ≥ 1,000** | `PaletteCardMeta.vue:22,32`; zero `toLocaleString` hits repo-wide |
| 9 | **P2** | S14 mix dropdown | M palettes × N colors seeded dot instances mounted at once | **20 × 50 = 1000 instances** | `MixSourceSelector.vue:209-222` |
| 10 | **P3** | S11 flagged | `slice(0,5)` with no "+N" — silent loss on an admin surface | **N_colors > 5** | `AdminFlaggedPanel.vue:54` |
| 11 | **P3** | S10 filter badge | Fixed `h-4 w-4` circle can't hold 2 digits | **≥ 10 filters selected** | `SearchFilterBar.vue:7-12` |
| 12 | **P3** | S9 tag popover | No client cap; the 11th tag round-trips to a 400 with no visible failure path | **N_tags = 11** | `TagEditPopover.vue:64-66,77` vs `schema.ts:35` |
| 13 | **P3** | S16 ghosts | Stagger grows linearly with `count` (last swatch at 3.76s @ k=16) | **count ≥ 12** | `ShadowPalette.vue:77`; k-bound `ExtractControls.vue:29` |
| 14 | **P4** | S3 tag keys | Duplicate tag string ⇒ duplicate Vue key (API-reachable only; no uniqueness refinement server-side) | duplicate tag via API | `PaletteCardMeta.vue:38`; `schema.ts:35`; `crud.ts:184` |
| 15 | **P4** | S6 grid | Card-height variance is latent, harmless while `grid-cols-1`; becomes a row-alignment break the day a multi-column variant lands | on introducing `sm:grid-cols-2` | `PaletteCardGrid.vue:4`; `PaletteCard.vue:55` |

**The one-line answer to OM-16:** the card is deft about *color count* in its strip and its expanded panel, and completely naive about *tag count* and *chip width* in its meta row — where the owner's screenshot is pointing. The fix is a priority-collapsing chip row plus the `+N` overflow chip the codebase already proved out in the version drawer, minted in glass-ui rather than in `demo/`.
