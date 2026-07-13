# T.W1-demo · PR-7 — the pre-move keyframe/animation census (gate 9b)

**Wave**: T.W1 (the colocation grand restructure), lane **W1-demo**.
**Gate**: §Hard gate 9b (M-31 / h-precepts HP-1) — "a pre-move census of every `@keyframes` +
`animation(-name)` identity (scoped + global); each survives at a new home post-codemod; ANY
deletion REDS the wave (O-23's ±2% cannot see a dropped scoped keyframe)." A recurring OWNER
grievance: **animations are never removed, only moved**.
**Substrate**: `tranche-t` @ `879ea36` (the demo-dogfood keystone; the wave head for W1-demo).
**Method**: `grep -rn '@keyframes' demo/` for definitions + `grep -rn 'animation-name:|animation:'
demo/` for the reference sites, disambiguated by hand (two false positives named below).

**This census is the survival contract**: the enumerated 18 identities below MUST re-appear
identically after every W1-demo batch. `git mv` moves whole files (the SFC `<style scoped>` block
travels with its `.vue`), so a scoped keyframe survives a move BY CONSTRUCTION — the gate is a
post-batch re-grep asserting the same 18 identities, catching any accidental drop.

---

## §0 False positives (excluded, with reason)

| grep hit | file:line | why it is NOT a keyframe identity |
|---|---|---|
| `redefinition` | `styles/animations.css:14` | prose in a comment ("a media-query @keyframes **redefinition** is legal CSS") |
| `animation: 150` | `panes/PalettesPane.vue:135` | a Sortable.js (`useSortable`) JS option — grid-reorder duration in ms, not a CSS `animation` shorthand |

`edit-drawer-in` is DEFINED twice (`animations.css:7` + a `≤639px` `@media` restate at `:18`) — this
is ONE identity with an intentional PRM/mobile inheritance break, not two.

---

## §1 The 18 keyframe identities (the survival set)

### Global — `demo/@/styles/` (EXEMPT from the colocation move; safe by construction)

| # | keyframe | definition | consumers | move risk |
|---|---|---|---|---|
| 1 | `edit-drawer-in` | `styles/animations.css:7` (+ `:18` ≤639px restate) | `.edit-drawer` class | NONE — styles/ never moves |
| 2 | `stagger-child-in` | `styles/animations.css:34` | `animations.css:45` (`.stagger-child`) | NONE |
| 3 | `vj-settle` | `styles/animations.css:170` | `dock/Dock.vue:285` (B3 settle beat) | NONE (def) — Dock.vue not moved this wave |

### Scoped — SFC `<style>` (travels with its `.vue` via `git mv`)

| # | keyframe | owning SFC | referenced at | W1-demo batch that moves the owner | post-move home |
|---|---|---|---|---|---|
| 4 | `swatch-pop` | `image-palette-extractor/ImageEyedropper/ImageEyedropper.vue:287` | :284 | — (exemplar; NOT moved) | unchanged |
| 5 | `pane-header-veil` | `panes/PaneHeader.vue:82` | :77 | — (pane kit KEEP) | unchanged |
| 6 | `pane-header-shrink` | `panes/PaneHeader.vue:111` | :51 | — | unchanged |
| 7 | `pane-title-shrink` | `panes/PaneHeader.vue:122` | :92 | — | unchanged |
| 8 | `pane-desc-shrink` | `panes/PaneHeader.vue:131` | :102 | — | unchanged |
| 9 | `plate-land` | `color-picker/ColorPicker.vue:384` | :397 | — (ColorPicker.vue stays root; batch 9 nests only SpectrumCanvas/Sliders/Display) | unchanged |
| 10 | `field-paint-in` | `color-picker/controls/SpectrumCanvas.vue:336` | :347 | **batch 9** (SpectrumCanvas → `controls/SpectrumCanvas/`) | `controls/SpectrumCanvas/SpectrumCanvas.vue` (style travels) |
| 11 | `plate-crossfade-out` | `color-picker/controls/SpectrumCanvas.vue:352` | :357 | **batch 9** | same as #10 |
| 12 | `input-mode-flash` | `color-picker/controls/ColorInput.vue:308` | :305 | — (action controls stay in `controls/`) | unchanged |
| 13 | `crown-appear` | `color-picker/controls/ColorInput.vue:366` | :37 | — | unchanged |
| 14 | `action-pulse` | `color-picker/controls/ActionButton.vue:123` | :117, :120 | — | unchanged |
| 15 | `action-spin` | `color-picker/controls/ActionButton.vue:128` | :121 | — | unchanged |
| 16 | `blink` | `color-picker/visual/PointerDebugOverlay.vue:187` | :179 | — (visual/ KEEP) | unchanged |
| 17 | `offline-dot-pulse` | `palette-browser/ApiOfflineChip.vue:82` | :88 | **batch 6** (→ `palette-browser/status/`) | `palette-browser/status/ApiOfflineChip.vue` (style travels) |
| 18 | `dev-misconfig-pulse` | `palette-browser/DevMisconfigBanner.vue:82` | :87 | **batch 6** (→ `palette-browser/status/`) | `palette-browser/status/DevMisconfigBanner.vue` (style travels) |

## §2 The exposure summary

Of the 18 identities, only **3 owning files** are relocated by any W1-demo batch:
`SpectrumCanvas.vue` (batch 9), `ApiOfflineChip.vue` + `DevMisconfigBanner.vue` (batch 6). All 3
carry their keyframe(s) inside their own SFC `<style>` block, which `git mv` moves atomically with
the component. Zero keyframes live in a standalone `.css`/`.ts` that a move could orphan; the 3
global keyframes live in `styles/` (never moved).

**The gate**: after each batch, re-run `grep -rhn '@keyframes' demo/ | sed -E
's/.*@keyframes[[:space:]]+([A-Za-z0-9_-]+).*/\1/' | sort -u` and confirm the same identity set
(minus the `redefinition` prose hit) — 18 named animations, zero deletions. The lane-close re-grep
is recorded in the MOVE-MAP's close row.
