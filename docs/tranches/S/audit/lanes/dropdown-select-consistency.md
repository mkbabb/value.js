# Dropdown / Select Consistency Census (S-1 / S-14 / S-17 mechanics)

Audit-only. Repo `value.js @ c5aa091` (`tranche-q`). Live probes against `http://localhost:9000`
via Playwright MCP (not killed). All base primitives (`demo/@/components/ui/select`,
`demo/@/components/ui/dropdown-menu`) are **pure re-export shims of `@mkbabb/glass-ui`** —
confirmed at `demo/@/components/ui/select/index.ts` and `demo/@/components/ui/dropdown-menu/index.ts`
(zero local logic). There is **no native `<select>`** anywhere in `demo/@/components/custom`
(`grep -rn "<select\b"` → 0 hits). So the root-producer question is already answered for the
primitives themselves; every divergence found below lives in the **consumption layer**
(demo call-sites), not in a missing glass-ui capability — except where noted.

## 1. Full census

| # | Component (file) | Root primitive | Trigger source | Variant/size | Font | a11y name | Wrapper chrome |
|---|---|---|---|---|---|---|---|
| 1a | Picker color-space (`color-picker/display/ColorSpaceSelector.vue`, used from `ColorPicker.vue:30`) | glass-ui `Select`/`SelectTrigger` | local `SelectTrigger` | `variant="ghost" size="audacious"` | **Fraunces italic 41.9px** (ambient, inherited from `CardHeader.font-display`, `ColorPicker.vue:29`) | `aria-label="Select color space"` | `.space-capsule` div: `veil-surface` pill, `border-radius:9999px`, bg `oklab(0.86 …/0.54)`, blur(8px) — measured live |
| 1b | About color-space (**same file**, used from `AboutPane.vue:10`) | glass-ui `Select`/`SelectTrigger` | **same** local `SelectTrigger` | **same** `variant="ghost" size="audacious"` | **"Plus Jakarta Sans" italic 41.9px** (ambient, `PaneHeader.vue:3` `<h3 class="pane-header-title text-heading">` has no `font-display`) | same `aria-label="Select color space"` | **same** `.space-capsule` pill — measured byte-identical to 1a |
| 2 | Dock view-select (`dock/DockViewSelect.vue:52`) | glass-ui `Select` + glass-ui **`DockSelectTrigger`** (dock-scoped producer) | glass-ui producer | dock-family geometry | `font-display` set **directly on the trigger's own class list** (`class="text-small font-display font-normal …"`) — self-contained, does NOT rely on ambient cascade | `aria-label="Select view"` | none (dock-trigger recipe, no extra wrapper) |
| 3 | Mobile hamburger menu (`dock/menus/MobileMenuDropdown.vue:34`) | glass-ui `DropdownMenu` + glass-ui **`DockDropdownTrigger`** | glass-ui producer | dock-family | inherits dock context | `aria-label="Menu"` | none |
| 4 | Profile dropdown (`dock/menus/ProfileSection.vue:37`) | glass-ui `DropdownMenu` | **hand-rolled `<button>`**, `DropdownMenuTrigger as-child` | bespoke pill: `rounded-full border`, manual hover/press/focus classes | `text-mono-small font-bold` | visible text "Profile" (fine) | bespoke `border` pill, not glass-ui `Button` |
| 5 | `@mbabb` dropdown (`ProfileSection.vue:78`, desktop) | glass-ui `DropdownMenu` | **hand-rolled `<button>`** | bespoke | `text-mono-caption` — **includes `text-transform: uppercase`** (glass-ui `typography/utilities.css:42-47`) | visible text "@mbabb" | none |
| 6 | Sort-menu (browse, `palette-browser/SortFilterMenu.vue:4`) | glass-ui `DropdownMenu` | **hand-rolled `<button>`**, icon-only | `p-0.5 rounded-sm hover:bg-accent/50 …` | n/a (icon) | **NONE** — no `aria-label`, no visible text; `EllipsisVertical` icon alone | none |
| 7 | Sort-menu (users admin, `palette-browser/UserSortMenu.vue:4`) | glass-ui `DropdownMenu` | **hand-rolled `<button>`**, icon-only, near-duplicate of #6 | `p-0.5 rounded-sm hover:bg-accent/50 …` (byte-near-identical recipe) | n/a | **NONE** | none |
| 8 | Palette-card menu (`palette-browser/PaletteCardMenu.vue`, trigger slot filled by `PaletteCard.vue:114`) | glass-ui `DropdownMenu` | **hand-rolled `<button>`**, icon-only, 3rd near-duplicate recipe (`p-1` not `p-0.5`, `hover:bg-accent` not `/50`) | bespoke | n/a | `aria-label="Palette menu"` (this one has it) | none |
| 9 | Generate preset / harmony (`generate/GenerateControls.vue:88,111`) | glass-ui `Select` | local `SelectTrigger` | **no `variant`/`size` prop** — bare `class="h-9"` | default (`text-dropdown`) | `aria-label="Generation preset"` / `"Color harmony"` | none |
| 10 | Mix color-space / hue / leftover (`mix/MixConfigBar.vue:53,71,90`) | glass-ui `Select` | local `SelectTrigger` | bare `class="h-9"` | default | `aria-label="Color space"` / `"Hue method"` / `"Size mismatch strategy"` | none |
| 11 | Aurora harmony/arrangement/medium/motion (`panes/AuroraPane.vue:116,130,144,158`) | glass-ui `Select` | local `SelectTrigger` | bare `class="h-9 text-caption min-w-menu"` | `text-caption` explicit | `aria-label="Palette harmony"` / `"Zone arrangement"` / `"Painterly medium"` / `"Motion register"` | none |
| 12 | Gradient type/space/hue (`gradient/GradientVisualizer.vue:192,210,228`) | glass-ui `Select` | local `SelectTrigger` | bare `class="h-9"` | default | none of the 3 triggers carry an `aria-label` (grep: 0 hits in this file) | none |
| 13 | Easing curve editor (`GradientVisualizer.vue:13`, `EasingPicker` from `@mkbabb/glass-ui/easing`) | glass-ui `EasingPicker` (not a Select/Dropdown) | n/a | n/a | n/a | n/a | **out of this census's scope** — S-13's "easing pane" is this accordion inside the gradient view, not a dropdown; no dedicated `EasingPane` file exists |

Native `<select>` count: **0**. Admin panels (`AdminUsersPanel`, `AdminTagsPanel`, `AdminAuditPanel`, …) use no Select/Dropdown at all (checkboxes/buttons only) — not part of this census.

## 2. Root cause of S-1 (measured, not inferred)

`ColorSpaceSelector.vue` is **literally the same component instance-type** at both call
sites (`ColorPicker.vue:30` and `AboutPane.vue:10`) — there is no second component to
unify; S-1's "two dropdowns" are one component rendered in two different ambient
contexts. Live `getComputedStyle` probe (both triggers on screen simultaneously in the
two-pane desktop layout, `aria-label="Select color space"`):

```
picker trigger : fontFamily = "Fraunces, serif"                                    fontSize = 41.888px
about  trigger : fontFamily = "\"Plus Jakarta Sans\", ... system-ui, sans-serif"    fontSize = 41.888px
```

Font **size** is identical (the glass-ui `SelectTrigger` `size="audacious"` prop — added at
R.W4 per the file's own code comments — already root-fixed the historical 1.59× trigger/item
desync by writing `--dropdown-text`/`--text-dropdown` on the trigger's own scope). Font
**family** is NOT written by the prop (by design — `--type-display-1`/`--type-heading` are
pure size rungs, not family tokens) — it is left to CSS inheritance. reka-ui's
`SelectValue` (`node_modules/reka-ui/dist/Select/SelectValue.js:37-55`) only clones
**`textContent`**, never DOM/classes, so the rendered `<span>` in the trigger has zero font
class of its own; it purely inherits `font-family` from whatever ancestor happens to set it.

- `ColorPicker.vue:29` wraps the selector in `<CardHeader class="font-display …">` → Fraunces.
- `AboutPane.vue:8-16` places the selector inside `PaneHeader.vue`'s `<h3 class="pane-header-title text-heading">` slot (`PaneHeader.vue:3`) — that `<h3>` never sets `font-display` → falls back to `--font-text` (Plus Jakarta Sans).

**This is the textbook counter-example to the correct pattern already shipped 30 lines away**:
`DockViewSelect.vue:54` puts `font-display` **directly on its own trigger's class list**
(`class="text-small font-display font-normal …"`) — self-contained, survives being dropped
into any ambient context. `ColorSpaceSelector.vue`'s trigger does not.

### S-1's second ask — kill the pill
Both instances of `.space-capsule` (`ColorSpaceSelector.vue` `<style scoped>` block) measured
live, byte-identical: `background: oklab(0.8617 … / 0.54)`, `backdrop-filter: blur(8px) saturate(1.4) brightness(1.02)`,
`border-radius: 9999px`, `border: 1px solid oklab(0.216 … / 0.12)`. This is the `veil-surface`
utility + the component's own `border-radius: var(--radius-pill)` (`ColorSpaceSelector.vue`
`.space-capsule` rule) — exactly the "rounded pill bg" S-1 wants removed. The `SelectTrigger`
itself is already `variant="ghost"` (transparent, no chrome) — the pill comes entirely from the
**wrapping `.space-capsule` div**, not from the glass-ui producer.

### S-14 — the "— 06 / 16" counter
`ColorSpaceSelector.vue`'s `.space-eyebrow` span renders
`color space — {{ pad(activeIndex + 1) }} / {{ pad(spaceEntries.length) }}` — confirmed live
in both instances via accessibility snapshot: `"color space — 06 / 16"` appears twice
(picker + About), verbatim. Single fix site kills both.

## 3. Findings (ranked, root-routed)

**P0 — S-1 font-family divergence.** `ColorSpaceSelector.vue`'s `SelectTrigger` relies on
ambient `font-display` inheritance instead of setting it on itself; the two host contexts
(`CardHeader.font-display` vs `PaneHeader`'s plain `<h3>`) disagree, so the About instance
renders in the wrong typeface. **Root: value.js demo consume fix** —
`demo/@/components/custom/color-picker/display/ColorSpaceSelector.vue` (add `font-display`
directly to `.space-trigger`'s class list, matching the `DockViewSelect.vue:54` pattern).
Zero glass-ui change needed; the producer's `size="audacious"` mechanism is already correct
and should not be touched.

**P0 — S-1/S-14 capsule restyle.** The `.space-capsule` wrapper (pill bg + veil-surface +
eyebrow counter) is the opposite of the requested "pure component of the title" grammar.
**Root: value.js demo consume fix** — same file; drop the wrapping div's pill styling, delete
the `.space-eyebrow` counter markup entirely (both S-1 and S-14 are satisfied by editing this
one component once, since both call sites share it).

**P1 — Icon-only dropdown triggers with no accessible name.**
`palette-browser/SortFilterMenu.vue:4` and `palette-browser/UserSortMenu.vue:4` render a bare
`<button>` containing only a `EllipsisVertical` icon (no `aria-label`, no visible text, no
`sr-only` span) inside `DropdownMenuTrigger as-child`. Screen readers get an unnamed
button. Contrast with `PaletteCardMenu`'s consumer (`PaletteCard.vue:114-120`, has
`aria-label="Palette menu"`) and `MobileMenuDropdown.vue:34` (glass-ui `DockDropdownTrigger
aria-label="Menu"`) which both do it right. **Root: value.js demo consume fix** — add
`aria-label` to both triggers (e.g. `"Sort palettes"` / `"Sort users"`).

**P1 — Triplicated bespoke icon-trigger button recipe (DRY + S-17 "spawn from glass-ui").**
The near-identical hand-rolled recipe
`"p-{0.5|1} rounded-sm hover:bg-accent{/50|} active:scale-95 active:bg-accent/70 transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"`
is duplicated at `SortFilterMenu.vue:4`, `UserSortMenu.vue:4`, and `PaletteCard.vue:114`,
each with small unexplained drift (`p-0.5` vs `p-1`; `hover:bg-accent/50` vs
`hover:bg-accent`). glass-ui already ships the sanctioned primitive for this
(`Button.vue:16` — `<Button iconOnly variant="ghost">` "replaces the retired `size=\"icon\"`").
**Root: value.js demo consume fix** — replace all three hand-rolled buttons with
`<Button iconOnly variant="ghost" as-child>` (mirrors the G.W2 Lane F `PaletteSlugBar.vue`
precedent already recorded in project memory). No glass-ui change needed.

**P1 — `ProfileSection.vue`'s `@mbabb` trigger and `Profile`/`Login` triggers are also
hand-rolled `<button>`s**, not glass-ui `Button`/`DockDropdownTrigger` — same S-17 violation
class as above, plus it is the carrier of a separate, unrelated bug:

**P1 — S-5 `@mbabb` renders as `@MBABB`.** `ProfileSection.vue:78`'s trigger button has
`class="text-mono-caption …"`; glass-ui's `text-mono-caption` utility
(`../glass-ui/src/styles/typography/utilities.css:42-47`) is the documented mono-caption
**eyebrow** vocabulary and bakes `text-transform: uppercase` by design (for small-caps
eyebrows, not for a proper-noun handle). The DOM text is already lowercase `@mbabb`; only the
CSS visually upper-cases it. `MobileMenuDropdown.vue`'s equivalent mobile "@mbabb" link uses
`text-mono-small` (no transform) and renders correctly lowercase — proving the desktop
instance picked the wrong utility, not that glass-ui needs a fix. **Root: value.js demo
consume fix** — swap `text-mono-caption` → `text-mono-small` (or add `normal-case`) on
`ProfileSection.vue`'s `@mbabb` button, matching the mobile instance.

**P2 — Inconsistent height/size mechanism across "form-select" grammar.**
`GenerateControls.vue`, `MixConfigBar.vue`, `AuroraPane.vue`, `GradientVisualizer.vue` (11
`SelectTrigger`s total) all hardcode `class="h-9"` rather than the documented `size="sm"` prop
that the glass-ui `SelectTrigger` already ships (`../glass-ui/src/components/ui/select/SelectTrigger.vue`
— `size: 'sm' | 'default' | 'display' | 'audacious'`, `sm` → `h-(--control-h-sm)`).
`--control-h-sm` currently resolves to `2.25rem` (`../glass-ui/src/styles/tokens/sizing.css:65`)
— numerically identical to Tailwind's `h-9` today, but the four consumers reach the same pixel
value via a magic Tailwind class instead of the token lever, so a future `--control-h-sm` retune
silently desyncs these 11 triggers from the rest of the control cohort. **Root: value.js demo
consume fix** — replace `class="h-9"` with `size="sm"` at all 11 call sites (list above, #9-12).

**P2 — Inconsistent `variant`/`size` prop usage on the color-space vs. form-select grammars is
intentional** (title-selector vs. control-selector are legitimately different registers) —
no action; noted only so a future pass does not "fix" this as if it were drift.

**P2 — a11y-name phrasing inconsistency across the census.** Accessible names mix two
conventions: verb-first ("Select color space", "Select view", "Menu") vs. bare-noun
("Generation preset", "Color harmony", "Palette harmony", "Zone arrangement", "Painterly
medium", "Motion register", "Size mismatch strategy"). Not a WCAG failure (all have *some*
non-empty name) but a grammar inconsistency across ~14 triggers. **Root: value.js demo
consume fix** (rename to one convention, e.g. drop the redundant "Select" prefix since the
`role="combobox"` already announces it — matches the bare-noun majority) — low priority,
bundle with whichever wave touches these files for another reason.

**P2 — `GradientVisualizer.vue`'s 3 `SelectTrigger`s (type/interpolation-space/hue-method,
lines 192/210/228) have no `aria-label` at all** (grep for `aria-label` in that file: 0 hits
on any of the three). Each trigger relies solely on an adjacent `<label>` element that is not
programmatically associated (`for`/`id` not present in the excerpt read). **Root: value.js
demo consume fix** — add `aria-label`s consistent with the sibling `MixConfigBar.vue`
equivalents (which already label the identical semantic selects: "Color space"/"Hue method").

## 4. Unification table — ONE grammar per dropdown class

| Class | Canonical grammar | Members | Status |
|---|---|---|---|
| **A. Title-selector** (selector reads as part of a heading, no chrome) | `Select` + glass-ui `SelectTrigger variant="ghost" size="audacious"`, font-family set **on the trigger itself**, no wrapper pill, no counter | `ColorSpaceSelector.vue` (picker + About — 1 component, 2 call sites) | **BROKEN** — needs the P0 fixes above (self-contained `font-display`; kill `.space-capsule` pill + eyebrow counter). After the fix, both call sites are automatically unified (same file). |
| **B. Nav/dock-selector** (lives inside `GlassDock`) | glass-ui `DockSelectTrigger` / `DockDropdownTrigger` — dock-scoped producer, font set on itself, no wrapper | `DockViewSelect.vue`, `MobileMenuDropdown.vue` | **GOOD** — reference exemplar; no change. |
| **C. Form-control select** (labeled control in a settings/config surface) | `Select` + glass-ui `SelectTrigger size="sm"` (NOT a hardcoded `h-9`), `aria-label` on every trigger, bare-noun name | `GenerateControls.vue` (2), `MixConfigBar.vue` (3), `AuroraPane.vue` (4), `GradientVisualizer.vue` (3) | **CONSUME FIX** — swap `class="h-9"` → `size="sm"` (11 sites); add missing `aria-label`s on the 3 `GradientVisualizer.vue` triggers; normalize name phrasing. |
| **D. Icon-only overflow menu** (ellipsis / kebab trigger on a card or panel) | glass-ui `<Button iconOnly variant="ghost" as-child>` wrapping `DropdownMenuTrigger`, always `aria-label` | `SortFilterMenu.vue`, `UserSortMenu.vue`, `PaletteCard.vue`'s `PaletteCardMenu` trigger slot | **CONSUME FIX** — replace 3 hand-rolled `<button>`s with the shared `Button` primitive; add the 2 missing `aria-label`s. |
| **E. Profile/account menu trigger** (visible-text trigger, desktop dock) | glass-ui `<Button variant="ghost"|"outline" as-child>` (or `DockDropdownTrigger` if it can be relaxed to accept text content) | `ProfileSection.vue` (Profile pill, Login pill, `@mbabb` link) | **CONSUME FIX** — migrate off hand-rolled `<button>`; separately fix the `text-mono-caption`→`text-mono-small` S-5 bug. |
| **F. Easing curve editor** | not a Select/Dropdown — glass-ui `EasingPicker` consume | `GradientVisualizer.vue`'s embedded accordion | **OUT OF SCOPE** for this census; S-13 is a separate (non-dropdown) functional/animation ask. |

## 5. Candidate wave items

1. `ColorSpaceSelector.vue` — self-contained `font-display` on `.space-trigger`; delete
   `.space-capsule` pill styling + `.space-eyebrow` counter markup. (Fixes S-1 + S-14 in one
   edit, one file, both call sites.)
2. `ProfileSection.vue` — `text-mono-caption` → `text-mono-small` on the `@mbabb` trigger
   (S-5); migrate all 3 hand-rolled triggers (`Profile`, `Login`, `@mbabb`) to glass-ui
   `Button`.
3. `SortFilterMenu.vue` + `UserSortMenu.vue` + `PaletteCard.vue` — collapse the triplicated
   icon-button recipe onto `<Button iconOnly variant="ghost">`; add the 2 missing
   `aria-label`s.
4. `GenerateControls.vue` / `MixConfigBar.vue` / `AuroraPane.vue` / `GradientVisualizer.vue` —
   11× `class="h-9"` → `size="sm"`; add 3 missing `aria-label`s in `GradientVisualizer.vue`;
   normalize accessible-name phrasing across the ~14-trigger form-select cohort.
5. (Tracked, not actioned here) `DockViewSelect.vue`'s `[&>span]:line-clamp-none` marker
   (line 49-51) documents a known glass-ui `DockSelectTrigger` gap — no `clampLabel` prop yet
   — already filed at `coordination/Q.md §3` per its own comment; this is the likely S-7
   "Palettes pill caret cropped" root, on the **glass-ui producer** side, already tracked
   upstream. No new filing needed; surfaced here for wave sequencing awareness.

## 6. What's already correct (do not re-litigate)

- `demo/@/components/ui/select` and `.../dropdown-menu` are pure glass-ui re-exports — the
  primitive layer is already at-the-root.
- Zero native `<select>` elements anywhere in the demo.
- glass-ui's `SelectTrigger` `size="audacious"` prop already root-fixed the historical
  trigger/item font-**size** desync (R.W4) via the `--dropdown-text`/`--text-dropdown`
  double-write — this mechanism should not be touched; only the family (S-1) is unfixed.
  `DockViewSelect.vue`'s explicit-on-self `font-display` is the pattern to copy.
  `PaletteCardMenu`'s trigger slot (via `PaletteCard.vue:114-120`) already has a correct
  `aria-label`.
