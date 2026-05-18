# Ag — Design-Language Consistency and Typographic/Visual Hierarchy

Tranche A research. Audit scope: `demo/color-picker/` and `demo/@/`, consuming
`@mkbabb/glass-ui` (symlinked at `node_modules/@mkbabb/glass-ui`).

glass-ui ships a complete token system the demo can read without rebuilding:
a golden-ratio (√φ ≈ 1.272) type scale exposed both as `--type-*` variables and
`.text-*` utilities (`text-caption` … `text-display-5`), border-radius tokens with
semantic aliases (`--radius-card/panel/dialog/button/input/badge`), an elevation
shadow ladder (`--shadow-xs` … `--shadow-2xl`, `--shadow-card`, `--shadow-cartoon`),
and φ-spacing rungs. The demo opts out of large parts of this in favour of the raw
Tailwind default scale and a handful of class names that resolve to nothing.

## Summary of method

Counts come from `grep` over `demo/@/components/custom/**/*.vue` plus
`demo/color-picker/App.vue`. Glass-ui token files read: `tokens.css`,
`typography.css`, `theme.css`. Demo override file: `demo/@/styles/style.css`.

---

## Ag-1 — The demo runs on the raw Tailwind type scale, not the glass-ui φ scale

Location: every custom SFC; aggregate counts below.

Problem. The Tailwind default size keywords are used 91 times across custom
components:

```
31 text-sm    29 text-xs    9 text-lg    6 text-base
 6 text-2xl    5 text-4xl   3 text-3xl   1 text-xl    1 text-5xl
```

The glass-ui φ utilities are used 135 times, but the distribution is lopsided:
`text-mono-small` alone is 78 of those, then `text-small` 17, `text-subheading` 16,
`text-micro` 12. `text-caption` appears 4 times, `text-heading` once, and
`text-body` / `text-prose` / `text-title` / any `text-display-*` zero times. The
demo never touches the display tier and barely touches the body/heading rungs.

The two scales are not interchangeable. `text-sm` is Tailwind's 0.875rem with
`line-height: 1.25rem`; glass-ui `text-small` is `--type-small` (0.875rem) with
`line-height: var(--type-leading-small)` (1.4) plus `font-family: var(--font-serif)`.
`text-xs` (0.75rem) has no φ relationship to `text-sm`; the φ scale's neighbouring
rung is `text-caption` (0.75rem) which is italic by design, or `text-micro`
(0.6875rem). Components mixing both scales get inconsistent leading and lose the
serif body cascade.

Fix. Map raw sizes to the φ ladder per role: `text-xs` → `text-caption` or
`text-micro`; `text-sm` → `text-small`; `text-base` → `text-body`; `text-lg` →
`text-prose` or `text-subheading`; `text-2xl`/`text-3xl`/`text-4xl` → `text-heading`
/ `text-title` / `text-display`. Doing this also restores `--font-serif` and the
φ-tuned leading instead of Tailwind's flat 1.25–1.75.

## Ag-2 — `font-mono-code` is an undefined class used in 14+ files

Location: `ColorComponentDisplay.vue:16`, `ColorInput.vue:15` and `:94`,
`ComponentSliders.vue:27` and `:85`, `ColorSpaceSelector.vue:22`, `HeroBlob.vue:12`,
`PaletteCardGrid.vue:6`, `AdminPaletteOps.vue:8`, `AdminAuthGate.vue:11`,
`ActionFeedback.vue:6`, `SearchFilterBar.vue:86`, `MiniColorPicker.vue:44`,
`MixSourceSelector.vue:144` and `:162`, `ExtractControls.vue:49` and `:75`,
`PaletteCard.vue:56`/`:66`.

Problem. `font-mono-code` is declared nowhere — not in `demo/@/styles/style.css`,
not in `demo/@/styles/utils.css`, not in glass-ui's `typography.css`, and there is
no Tailwind config registering it. Tailwind v4 silently drops unknown utilities, so
every one of these elements falls back to the body serif cascade rather than the
mono face the author intended. The closest real class is glass-ui's `fira-code`
(`font-family: var(--font-mono); font-feature-settings: "liga","calt"`), or the
composed `text-mono-small` / `text-mono-caption` utilities.

```vue
<!-- ColorInput.vue:15 — intends mono, gets serif -->
class="color-input w-full block border overflow-hidden ... font-mono-code text-ellipsis ..."
```

Fix. Replace `font-mono-code` with `fira-code` (family only) or with one of the
`text-mono-*` utilities where a size is also wanted. This is a single global
find-and-replace and it is a real visual bug, not just a token-purity issue.

## Ag-3 — `text-2xs` is an undefined class used as the caption rung in 9 sites

Location: `GradientVisualizer.vue:150,168,186`, `MixConfigBar.vue:54,72`,
`MixSourceSelector.vue:144,162`, `GenerateControls.vue:98,120`,
`ExtractControls.vue:49,75`, `MobileMenuDropdown.vue:79`.

Problem. `text-2xs` is not a Tailwind v4 default keyword and is not registered
anywhere. These spans render at the inherited size (usually `text-sm`), defeating
the intended "tiny descriptor" register. The author wants a sub-caption rung;
glass-ui already ships it as `text-micro` (`--type-micro`, 0.6875rem, line-height
1.25) and `text-admin-label` (`--type-admin-label`, 0.625rem, mono, uppercase).

```vue
<!-- GradientVisualizer.vue:150 -->
<span class="text-2xs text-muted-foreground/60">{{ t.description }}</span>
```

Fix. Replace `text-2xs` with `text-micro` for descriptor text. The dropdown
descriptor pattern (`text-2xs italic text-muted-foreground`) recurs in
GenerateControls, MixConfigBar, and GradientVisualizer — see Ag-12.

## Ag-4 — `text-pane-description` is an undefined class on the shared pane header

Location: `PaneHeader.vue:5`.

Problem. `PaneHeader.vue` is the shared header for every pane (About, Palettes,
Browse, Extract, Mix, Admin). Its description paragraph is
`<p class="text-pane-description">`. That class exists nowhere — not in the demo
styles, not in glass-ui (glass-ui ships `.text-pane-title` but not
`-description`). The description text falls back to body serif at `--type-body`,
which is the same size as surrounding content and reads with no caption
de-emphasis. The header title above it correctly uses `text-heading`, so the
title/description pair has a heading then an equal-weight body line under it.

Fix. Define the class, or replace it with `text-caption text-muted-foreground` or
`section-subtitle` (glass-ui-adjacent class already defined in `style.css:200`).
Since this is one shared component, the fix lands once and propagates to all panes.

## Ag-5 — `--shadow-card` overridden with a hardcoded 8px cartoon offset

Location: `demo/@/styles/style.css:37-38` and `:134-135`.

Problem. The demo redefines the glass-ui card shadow:

```css
/* style.css:37 */
--shadow-card: 8px 8px 0px 0px color-mix(in srgb, var(--shadow-color) 80%, transparent);
--shadow-card-hover: 10px 10px 0px 0px color-mix(in srgb, var(--shadow-color) 85%, transparent);
```

glass-ui's canonical `--shadow-card` is `var(--shadow-md)` — a soft 4px-blur drop
plate. glass-ui already ships a cartoon family for the sticker look:
`--shadow-cartoon` (3px/3px, 8% alpha) and the tiered `--shadow-cartoon-sm/md/lg`.
The demo's override is a fourth, ad-hoc cartoon recipe: 8px offset at 80% alpha,
far heavier than any glass-ui rung (the heaviest tiered cartoon, `--shadow-cartoon-lg`,
is 6px at 12% alpha). The comment at `style.css:35` even names the intent ("more
dramatic pop-art feel"), confirming this is a cartoon shadow wearing the `card`
token's name.

Consequence. Anything reading `--shadow-card` (and the glass-ui `shadow-card`
utility) now gets a pop-art offset, while anything reading `shadow-cartoon`
(4 usages, see Ag-7) gets the much subtler glass-ui 3px version. There are two
cartoon languages in the demo at two different intensities, plus the soft glass
ladder, with no single source of truth.

Fix. Pick one. If the pop-art look is the demo's identity, override
`--shadow-cartoon` / `--shadow-cartoon-hover` to the desired intensity and point
`--shadow-card` back at a cartoon token (`--shadow-card: var(--shadow-cartoon)`),
so the card and the explicit `shadow-cartoon` consumers agree. The 8px/10px
literals should become the value of a named token, not an inline recipe.

## Ag-6 — `--glass-opacity-subtle` override targets a token glass-ui retired

Location: `demo/@/styles/style.css:42`.

Problem.

```css
/* style.css:42 */
--glass-opacity-subtle: 0.75;
```

glass-ui v0.8.0 retired the four-tier `subtle | default | medium | elevated`
opacity ladder outright and replaced it with `wash | quiet | resting | floating |
overlay` (`tokens.css:398-419`, comment: "v0.8.0 retires the four-tier ... ladder
outright. No legacy aliases."). `--glass-opacity-subtle` no longer feeds any
glass-ui surface class. The demo's override is dead — panes that should read more
opaque get whatever the current `--glass-opacity-wash` (0.30) resolves to instead.
The comment at `style.css:41` ("Panes need solid-feeling surfaces for readability
over the hero blob") states a real requirement that the override silently fails to
deliver.

Fix. Override the live rung the panes actually want — likely
`--glass-opacity-resting` (default 0.65) lifted toward 0.75, or
`--glass-opacity-floating`. Verify which glass tier the pane surfaces consume and
override that one. Delete the stale `--glass-opacity-subtle` line.

## Ag-7 — Three parallel shadow languages, no single elevation system

Location: shadow audit across `demo/@/components/custom`.

Problem. Card/panel/popover shadows come from at least three unrelated systems:

- glass-ui soft ladder, used twice: `shadow-sm` (×2), `shadow-elevated` (×1),
  `shadow-lg` (×1).
- the demo's overridden cartoon `--shadow-card` (Ag-5), consumed by
  `PaletteCard.vue:4` (`hover:shadow-[var(--shadow-card-hover)]`) and
  `GradientVisualizer.vue`.
- glass-ui `shadow-cartoon`, used 4 times directly — at the glass-ui 3px
  intensity, not the demo's 8px intensity.
- hand-rolled `box-shadow` literals in scoped CSS, each its own recipe:

```css
/* ImageEyedropper.vue:357 */ box-shadow: 0 4px 16px color-mix(... --foreground 15% ...), 0 0 0 1px ...;
/* SpectrumCanvas.vue:260 */  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
/* EditDrawer.vue:82 */       box-shadow: 4px 0 24px -4px color-mix(... --foreground 15% ...);
/* PaletteDialog.vue:611 */   box-shadow: 0 25px 50px -12px color-mix(... --foreground 25% ...), ...;
/* CurrentPaletteEditor.vue:281 */ box-shadow: inset 0 2px 8px color-mix(... --foreground 15% ...);
```

`PaletteDialog.vue:611` reimplements glass-ui's `--shadow-2xl`
(`0 25px 50px -12px color-mix(in srgb, var(--shadow-color) 25%, transparent)`)
literally. `SpectrumCanvas.vue:260` uses raw `rgba(0,0,0,0.3)` which ignores
`--shadow-color` and so does not respond to dark mode.

Fix. Route dialog/popover elevation through `--shadow-modal` / `--shadow-2xl` /
`--shadow-glass-overlay`; route card elevation through one cartoon-or-soft choice
(Ag-5); replace the raw `rgba(0,0,0,...)` literal with a `--shadow-color`-based
`color-mix`. The inset depth in `CurrentPaletteEditor.vue:281` has no glass-ui
token and is a legitimate one-off, but it should still read `--shadow-color`.

## Ag-8 — Border-radius mixes semantic aliases, raw rungs, and `var()` arbitraries

Location: radius audit across `demo/@/components/custom`.

Problem. Four different ways to express the same rounding intent coexist:

```
53 rounded-full          15 rounded-sm        14 rounded-2xl
 6 rounded-[var(--radius-input)]   5 rounded-xl   5 rounded-md   4 rounded-lg
 3 rounded-[var(--radius-md)]      2 rounded-[var(--radius-dialog)]
 2 rounded-[var(--radius-card)]    1 rounded-[var(--radius-sm)]
```

`rounded-2xl` (14 sites) and `rounded-[var(--radius-card)]` (2 sites) resolve to
the same value (`--radius-2xl` = 1rem), but cards are styled both ways — e.g.
`PaletteCard.vue:4` uses `rounded-[var(--radius-card)]` while
`ColorNutritionLabel.vue:3` uses raw `rounded-2xl` on an `Alert` and `:96` uses
`rounded-2xl` on conversion-graph chips. `ColorInput.vue:15` uses raw `rounded-2xl`
on the input field, where the semantic alias is `--radius-input` (= `--radius` =
0.625rem) — so the color input is rounded to card radius, not input radius. Glass-ui
exposes `rounded-[var(--radius-card/panel/dialog/input/button/badge)]` for exactly
this; the arbitrary-`var` form is verbose but at least semantic. Raw `rounded-2xl`
/ `rounded-sm` / `rounded-xl` carry no role information and drift.

Fix. Standardize on the semantic aliases: card surfaces → `--radius-card`, the
modal/dialog → `--radius-dialog`, panels → `--radius-panel`, text inputs →
`--radius-input`, buttons → `--radius-button`, pills/badges → `--radius-badge` (or
keep `rounded-full`). `ColorInput.vue:15` is a concrete bug: an input wearing card
radius. The scoped-CSS uses are already token-based and consistent
(`ExtractControls.vue` uses `--radius-pill` throughout) — leave those.

## Ag-9 — Flat / inverted hierarchy in ColorNutritionLabel

Location: `ColorNutritionLabel.vue:13, 16, 35, 38, 46, 62, 65, 84, 121, 131, 132`.

Problem. Every section heading is identical: `text-2xl mb-2 font-normal` (lines 13,
35, 62, 84, 131). All body content is `text-sm` (lines 16, 38, 65, 132). The
component is a five-section reference card ("Basic Information", "Components",
"Key Properties", "Conversion Graph", "Usage"), and the only hierarchy step is
2xl → sm with `font-normal` on the heading. `font-normal` on a heading flattens it
further — a glass-ui `text-heading` carries `font-weight: 700` by design, here it
is overridden to 400. The component-name labels at line 46 are `text-lg font-normal`,
which is larger than the body but smaller than the section headings, giving a
three-step ad-hoc ladder (2xl / lg / sm) with no φ relationship and uniform weight
throughout.

Fix. Section headings → `text-subheading` (φ rung, weight 600) or `text-heading`;
keep them visually distinct from the body via the φ step plus the built-in weight,
and drop the `font-normal` override. Body → `text-small`. Component-name emphasis
(line 46) → `text-body` or `text-prose`. The result is a real
heading > emphasis > body cascade on the φ scale instead of three arbitrary sizes.

## Ag-10 — Flat hierarchy: `font-normal` applied 27 times, often onto headings

Location: 27 `font-normal` occurrences; concentrated in `ColorNutritionLabel.vue`
(10×, all on `<h2>` or body), `ColorComponentDisplay.vue:3,15,28` (on `CardTitle`),
`ColorSpaceSelector` region.

Problem. `font-normal` is the most-used weight class in the demo (27×), ahead of
`font-bold` (23×) and `font-semibold` (11×). It is repeatedly used to *cancel* the
weight that a heading component or glass-ui heading utility would otherwise carry.
`ColorComponentDisplay.vue:3` is `CardTitle ... text-4xl ... font-normal` — a card
title forced to regular weight at display size. The net effect across the
nutrition label and component display is that size alone carries hierarchy and
weight is uniformly 400, so a glance gives no heading/body contrast beyond raw
point size.

Fix. This is a deliberate aesthetic in places (the large thin numeral in
`ColorComponentDisplay` reads as poster-type), and glass-ui actually supports it:
`text-display-*` and `text-hero` are weight-300/400 display utilities. Where the
thin large look is wanted, use a `text-display-*` utility (which is φ-scaled and
thin by design) rather than `text-4xl font-normal`. Where `font-normal` is merely
cancelling an unwanted bold on a section heading (the nutrition-label case), use
the φ heading utilities and accept their intended weight, or pick `text-subheading`
(600) for a lighter heading register.

## Ag-11 — `@apply` used in exactly one component; styling otherwise copy-pasted

Location: `Markdown.vue:72-311` (the only real `@apply` consumer; the matches in
`PalettesPane.vue:20`, `PaletteDialog.vue:63,82`, `PaletteSavedTab.vue:10` are the
`@apply` Vue *prop*, not the CSS directive).

Problem. `Markdown.vue` uses `@apply` heavily and correctly to style generated HTML.
No other custom component uses `@apply` to encapsulate a repeated cluster, so
repeated styling is pasted inline instead. The worst repeated clusters:

- The slug pill: `text-mono-small font-bold px-2 py-0.5 rounded-full border` with
  `:style` setting `color`/`borderColor`. Appears verbatim in
  `MobileMenuDropdown.vue:42` and `:61`, `AdminUsersPanel.vue:59` and `:123`, plus
  `PaletteSlugBar.vue`. Five+ copies of one pill recipe.
- The dropdown menu item: `text-sm gap-2 cursor-pointer` on every
  `DropdownMenuItem` in `MobileMenuDropdown.vue` (8 copies, lines 46-92) and
  `ProfileSection.vue`.
- The admin toolbar button: `h-7 px-2 cursor-pointer font-display text-xs` repeated
  on every `Button` in `AdminUsersPanel.vue` (lines 70, 80), `AdminNamesPanel.vue`
  (31, 34, 57), `AdminUsersPanel.vue:20,31` (`h-7 px-2.5 ... text-xs gap-1.5`).
- The descriptor span: `text-2xs text-muted-foreground/60` italic (see Ag-3,
  Ag-12).

Fix. Promote the slug pill to one `@apply` class (`.slug-pill`) in `style.css` —
it is already a candidate alongside the existing `.filter-option` /
`.section-subtitle` classes there. The dropdown-item and admin-button clusters
should ideally become a glass-ui variant or a local `@apply` class rather than
eight inline copies (per the project's `feedback_no_god_modules` and
`feedback_glass_ui_first_class` notes — a shared register belongs in glass-ui or
in one `@apply` rule, not pasted).

## Ag-12 — Divergent styling of the same repeated component patterns

Location: cross-component comparison.

Problem. Repeated UI patterns are styled inconsistently between instances:

- Tabs. `PaletteControlsBar.vue:20-46` styles every `TabsTrigger` with
  `text-subheading`. `AdminNamesPanel.vue:4,9` styles its `TabsTrigger` with
  `text-subheading flex-1 gap-1.5` plus a count badge in `text-mono-small
  font-normal`, and wraps the whole `Tabs` in the `underline-tabs` variant
  (`style.css:145`). `PaletteControlsBar` does not use `underline-tabs`. So the
  two tab strips in the same dialog use two different active-state treatments —
  one a filled `TabsList` pill, the other a colored underline.
- Dropdown menu items. `MobileMenuDropdown.vue` items are `text-sm gap-2
  cursor-pointer`; `PaletteCardMenu.vue:7` items are `text-sm`; `ProfileSection.vue`
  items are `text-sm` with varying gap. All three are `DropdownMenuItem` lists but
  diverge on gap and on whether `cursor-pointer` is set.
- Descriptor sub-text. The dropdown-option descriptor is `text-2xs
  text-muted-foreground/60` in `GradientVisualizer`, `MixConfigBar`,
  `GenerateControls`; but `MixSourceSelector.vue:144,162` uses
  `font-mono-code text-2xs text-muted-foreground/50` (different family attempt,
  different opacity, /50 vs /60). The same descriptor role, three opacities.
- Count chips. The numeric count next to a label is `Badge variant="secondary"
  text-mono-small` in `PaletteCard.vue:36` and `AdminUsersPanel.vue:62`, but a bare
  `<span class="text-mono-small font-normal text-muted-foreground">` in
  `AdminPane.vue:5` and `PalettesPane.vue:5`, and `<span class="text-mono-small
  font-normal">({{ n }})</span>` in `AdminNamesPanel.vue:7,12`. Three renderings of
  "a count beside a heading".

Fix. Pick one tab treatment for the dialog (either filled `TabsList` or
`underline-tabs`, applied to both strips). Normalize dropdown-item classes — best
as one `@apply` class (Ag-11). Normalize the descriptor span to `text-micro
text-muted-foreground` (one opacity). Normalize the count indicator to one form —
the `Badge variant="secondary"` is the most semantic; the bare spans should adopt
it.

## Ag-13 — Spreadsheet-style flat row lists

Location: `AdminListItem.vue`, `AdminUsersPanel.vue:44-108`, `PaletteCardGrid.vue`
hosts, `AdminNamesPanel.vue:21-39` / `:47-61`, `VersionHistoryDrawer.vue`,
`AdminFlaggedPanel.vue`.

Problem. Several lists render as undifferentiated rows rather than content-rich
cards:

- `AdminListItem.vue` is the canonical offender — a single
  `flex items-center gap-3 px-3 py-2` row with a swatch, a two-line content slot,
  and an actions slot. `AdminNamesPanel.vue` stacks these (`grid gap-2`) into a
  pending-names list and an approved-names list. Each row is `text-mono-small`
  name over `text-mono-small text-muted-foreground` css value — two equal-size
  mono lines, no hierarchy, no card framing beyond a `rounded-[var(--radius-md)]`
  hairline border. The result reads as a spreadsheet of name/value/action.
- `AdminUsersPanel.vue:44-108` renders each user as a flat header row (slug pill,
  count badge, two delete buttons) inside a `rounded-[var(--radius-md)]` border,
  expandable to a nested palette grid. The user row itself carries no avatar, no
  metadata hierarchy — it is a table row with a disclosure triangle behavior.
- `PaletteCardGrid.vue` is a bare `grid grid-cols-1 gap-3`; its hosts
  (`PaletteSavedTab`, `PaletteBrowseTab`) feed it `PaletteCard`s. `PaletteCard`
  itself is reasonably content-rich (color strip, badges, vote button), so the
  grid is acceptable — the spreadsheet feel is specific to the *admin* list
  components, not the palette grid.
- `VersionHistoryDrawer.vue` (`text-xs` rows, lines 76, 89) and
  `AdminFlaggedPanel.vue` (`text-xs`, line 59) are likewise flat `text-xs` row
  stacks.

Fix. The admin lists want a list-item primitive with real hierarchy: a
`text-small`/`text-body` primary line, a `text-caption text-muted-foreground`
secondary line, and the swatch sized as a leading visual — i.e. the existing
`AdminListItem` slots restyled so primary ≠ secondary in size. This is one shared
component (`AdminListItem.vue`), so the fix is centralized. The `text-xs` rows in
`VersionHistoryDrawer` / `AdminFlaggedPanel` should adopt the same item primitive
or at least the φ scale (`text-small` / `text-caption`).

---

## Prioritized findings

P1 — real bugs (intended styling silently lost):

1. Ag-2 — `font-mono-code` undefined in 14+ files; mono text renders as serif.
   Single global replace with `fira-code`.
2. Ag-6 — `--glass-opacity-subtle` override targets a token glass-ui retired in
   v0.8.0; panes do not get the opacity the comment promises.
3. Ag-3 — `text-2xs` undefined in 9 sites; descriptor text renders at inherited
   size. Replace with `text-micro`.
4. Ag-4 — `text-pane-description` undefined on the shared `PaneHeader`; description
   renders as equal-weight body. Replace with `text-caption text-muted-foreground`.
5. Ag-8 (partial) — `ColorInput.vue:15` input field wears `rounded-2xl` (card
   radius) instead of `--radius-input`.

P2 — design-system divergence:

6. Ag-5 — `--shadow-card` overridden with an ad-hoc 8px/80% cartoon recipe; a
   fourth shadow language. Re-route through `--shadow-cartoon` overrides.
7. Ag-7 — three parallel shadow systems plus raw `rgba(0,0,0,...)` literals; pick
   one elevation language, route dialogs through `--shadow-modal`/`--shadow-2xl`.
8. Ag-1 — 91 raw Tailwind text sizes vs a barely-used φ scale; map per role to
   `text-caption/small/body/prose/heading/title/display`.
9. Ag-8 — radius expressed four ways; standardize on semantic aliases.

P3 — hierarchy and repetition cleanup:

10. Ag-9 — `ColorNutritionLabel` flat hierarchy (uniform 2xl/sm, `font-normal`
    headings); rebuild on the φ heading→body cascade.
11. Ag-12 — divergent tabs / dropdown-item / descriptor / count-chip instances;
    normalize each repeated pattern to one treatment.
12. Ag-13 — admin list components (`AdminListItem`, `AdminUsersPanel`,
    `VersionHistoryDrawer`, `AdminFlaggedPanel`) read as spreadsheets; restyle the
    shared `AdminListItem` primitive with primary/secondary hierarchy.
13. Ag-11 — `@apply` used in one component only; promote the slug-pill,
    dropdown-item, and admin-button clusters to `@apply` classes or glass-ui
    variants.
14. Ag-10 — `font-normal` used 27 times, often to cancel heading weight; where the
    thin-large look is wanted use `text-display-*`, otherwise accept φ heading
    weights.
