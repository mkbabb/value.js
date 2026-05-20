# D.W4 Lane B — Design-idiom catalog audit

**Sub-gate**: B. Single-file write — `demo/DESIGN.md` expanded from 24 → 133 lines, 10 sections. No source edits, no git mutations.

## §1 Narrative-vs-source-of-truth cross-walk

For each catalog section the verifiable cross-references checked at HEAD (post-D.W3 close, branch `tranche-b`).

| § | Claim | Source-of-truth | Verified |
|---|---|---|---|
| Token architecture | Cascade order `tailwindcss → tw-animate-css → glass-ui/styles → animations.css` | `demo/@/styles/style.css:1-4` | ✓ |
| Token architecture | 5 `:root` overrides + 7 layout tokens | `style.css:31-67` (44-47, 51-52, 55-66, 143-153) | ✓ |
| Type scale | Fraunces display + serif; Fira Code mono; Select/DropdownMenu mono pin | `style.css:7-9, 51-52` | ✓ |
| Type scale | `ColorComponentDisplay` `text-4xl` + `.fira-code` exception | `demo/@/components/custom/color-picker/display/ColorComponentDisplay.vue:1-34` | ✓ |
| Surfaces | ColorPicker = `tier="resting"`; every browse pane = `tier="wash" :shadow="false" :grain="false"`; `.glass-floating` for overlay chrome | `ColorPicker.vue` + `panes/{Palettes,Browse,Mix,Admin,Generate,Extract,Gradient}Pane.vue` + `CurrentPaletteEditor.vue` + `BulkActionToolbar.vue` | ✓ |
| Surfaces | `.input-bar` consumer = PaletteRenameInput | `PaletteRenameInput.vue` | ✓ |
| Shadows | `--shadow-cartoon` overridden to `8px 8px 0 0 ... 80%`, hover `10px/85%`, `--shadow-card` routed through | `style.css:44-47` | ✓ |
| Shadows | Dark-mode lighter rung (50%/55%) | `style.css:146-147` | ✓ |
| Radii | `rounded-card` / `rounded-input` / `rounded-pill` / `rounded-panel` consumers | PaletteCard, CurrentPaletteEditor, dock pill, BulkActionToolbar — grep verified | ✓ |
| Motion | reduced-motion overlay carve-out (B.W1 Lane B) | `animations.css:32-60` | ✓ |
| Motion | Custom keyframe `edit-drawer-in` + mobile media-query restate | `animations.css:5-22` | ✓ |
| Z-tier | All custom-component z-reaches route through `--z-*` tokens; numeric residuals (`z-[1]`) live in `demo/@/components/ui/` (shadcn-generated) | `rg "z-\[[0-9]" demo/` returns 2 matches both under `ui/` | ✓ |
| Color | `--color-gold` + `--color-gold-light` consumers — Dock admin mode, PaletteCard featured badge, ProfileSection slug pill, DockViewSelect | grep verified across `demo/@/components/custom/{dock,palette-browser}/` | ✓ |
| Color | Harmony names (analogous, complementary, split-complementary, tetradic, triadic, monochromatic, golden, random) | `useColorGeneration.ts` `HARMONY_NAMES` | ✓ |
| Layout | flex-fixed dock (Bβ Proposal B); no `--dock-pos` formula | `style.css:15-30` doc-comment + `style.css:97-106` `.app-layout` | ✓ |
| Layout | 7 layout tokens; `--content-max-h` uses `100dvh` | `style.css:55-66` | ✓ |
| Layout consumer table | `--dock-inset` → `top-[var(--dock-inset)]` in Dock.vue; `--desktop-pane-max-w` → `lg:max-w-[...]` in every pane shell + ColorPicker | `Dock.vue:~9`; every `panes/*.vue` + ColorPicker.vue | ✓ |
| Idioms NOT used | Only one `:deep()` survivor: `.featured-badge :deep(svg)` in PaletteCard | `rg ':deep\(' demo/@/components/` returns 1 match | ✓ |
| Idioms NOT used | `ui/alert` is a glass-ui re-export | `demo/@/components/ui/alert/index.ts` | ✓ |
| Idioms NOT used | Zero `100vh` literals in `demo/@/` | `rg "100vh" demo/` returns 0 in custom code (hero-lab.css uses `100dvh`) | ✓ |

**Cross-reference link integrity** — glass-ui DESIGN.md section names cited in the catalog all exist at HEAD: `Token Architecture` (line 19), `Duration` (63), `Easing` (84), `Z-Index Stack` (130), `Border Radius` (155), `Shadows` (176), `Glass Surfaces` (238), `Typography` (348), subsection `Semantic typography classes` (541), `Convenience shorthands` (295), `Size tokens` (413), `Feature token home rule` (31). Zero broken links.

## §2 Sub-gate B verdict

The catalog carries:
- **10 sections** (Token architecture, Type scale, Surfaces, Shadows, Radii, Motion, Z-tier, Color, Layout, Idioms NOT used) — matches the wave spec sketch.
- **133 lines** — within the ~150 ±20 target.
- **Cross-references to actual `style.css :root` tokens** (line citations 1-4, 7-9, 11-12, 31-67, 44-47, 51-52, 55-66, 97-106, 143-153, 188-190, 217-219) + glass-ui DESIGN.md sections (12 distinct section/subsection names).
- **Concrete consumer-site naming** — every claim about "where this is used" names a file path or grep-verifiable file set. A component author reading the catalog can write idiomatic code without grep-archaeology.

Validation results:
- `wc -l demo/DESIGN.md` → 133 (target ~150, tolerance ±20: PASS).
- `npx vue-tsc --noEmit` → 126 errors (no regression from D.W3 baseline 126: PASS).
- `npx vitest run` → 34 files, 1582 tests passed (PASS).
- `npx playwright test --project=smoke` → 3/3 green (PASS).

**Sub-gate B: PASS.**

## §3 Out-of-scope notes

- The catalog assumes Lane A's utility surfacing lands (`z-dock`, `duration-fast`, `rounded-input`, `top-dock-inset`, `max-w-pane`, `min-w-menu`). Where Lane A is still in flight, the catalog cites both the post-A utility name AND the pre-A `[var(--...)]` reach so the document is correct under either state.
- The catalog does NOT enumerate every component or every utility — it documents idioms, not API. Component-level API lives in glass-ui's `## Component Catalog` section + the demo's `demo/CLAUDE.md` table.
- The `.underline-tabs` transitional residual (style.css:160-163) is not in the catalog because it is marked for retirement once glass-ui ships a Tabs `underline` variant (per A.W2 / coordination/Q.md §3). Documenting it as an idiom would crystallise it; the catalog points instead at glass-ui as the right home.
