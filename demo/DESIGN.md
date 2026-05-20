# Value.js Demo Design Language

> Extends [glass-ui DESIGN.md](../../glass-ui/DESIGN.md). The demo inherits glass-ui's token contract verbatim; this catalog narrates the demo-specific overrides + the idioms a component author needs without grep-archaeology. Cross-references cite `demo/@/styles/style.css` line numbers (post-D.W3 baseline) + glass-ui section names.

## § Token architecture

Tokens live in two places, in this cascade order (style.css:1-4):

1. `@import "tailwindcss"` → `@import "tw-animate-css"` → `@import "@mkbabb/glass-ui/styles"` — glass-ui ships the full contract surface (durations, easings, z-tiers, radii, shadows, glass tiers, type scale, layout/sizing — see glass-ui DESIGN.md §Token Architecture). Consume by name, not by re-declaring.
2. `@import "./animations.css"` — project-specific keyframes + `prefers-reduced-motion` carve-out.
3. `:root` in `style.css` (lines 31-67) — the demo's narrow override surface. Five overrides ship: `--shadow-cartoon` / `--shadow-cartoon-hover` (heavier rung, 44-47), `--shadow-card` routed through cartoon (46-47), `--select-font` / `--dropdown-menu-font` pinned to mono (51-52), seven layout tokens (55-66), the `.dark` re-pin (143-153). Add new project tokens here under a commented rationale; do NOT spin up a parallel `design-idioms.css` (see § Idioms NOT used).

## § Type scale

Three voices, all wired in `@theme` (style.css:6-13):

- `--font-display: "Fraunces", serif` — display headings + dock labels + the dropdown chrome. Glass-ui's variable-font `WONK` / `SOFT` axes apply via `.text-display-*` utilities (glass-ui DESIGN.md §Typography → Semantic typography classes).
- `--font-serif: "Fraunces", serif` — body voice is aliased to Fraunces (the demo collapses serif voice into display Fraunces rather than running glass-ui's Computer Modern Serif).
- `--font-mono: "Fira Code", monospace` — code, admin labels, numeric readouts. The `--select-font` + `--dropdown-menu-font` overrides (style.css:51-52) pin Select + DropdownMenu triggers to mono so numeric values read cleanly.

Use glass-ui's named utilities — `.text-display`, `.text-title`, `.text-heading`, `.text-prose`, `.text-body`, `.text-mono-small`, `.text-mono-caption`, `.section-label` — instead of raw `text-2xl` etc. The φ-ratio scale (glass-ui DESIGN.md §Typography → Size tokens) is the canonical step ladder. Project-specific font aliases (`utils.css:4-11`) expose `.fraunces` + `.fira-code` for one-off opt-in (markdown code, the picker's component readout).

The `.section-subtitle` recipe (utils.css:18-27) is a single-line caption variant of glass-ui's `.section-label` with muted half-opacity + line-clamp — consumed by the gradient / mix / generate control bars.

**Demo-specific exception**: `ColorComponentDisplay.vue` (demo/@/components/custom/color-picker/display/) renders the large component-value readout via `<CardTitle class="text-4xl">` with conditional `.fira-code` on monospace components. This is the one tile that escapes the named-class register because the readout is the visual hero of the picker pane; it stays a literal `text-4xl` per W3 verdict.

## § Surfaces

Glass-ui ships a 5-rung tier ladder (glass-ui DESIGN.md §Glass Surfaces): wash → quiet → resting → floating → overlay. The demo uses three:

- `<Card tier="resting">` — the picker pane shell (`ColorPicker.vue:~30`). The canonical translucent+frosted plate.
- `<Card tier="wash" :shadow="false" :grain="false">` — every browsing/listing pane (BrowsePane, PalettesPane, MixPane, AdminPane, etc.). Shadow + grain are off because these panes scroll and the cartoon rung would compete with their scroll fades.
- `.glass-floating` — direct utility on the swatch edit overlay (CurrentPaletteEditor.vue), the bulk-action toolbar (BulkActionToolbar.vue). For popover-tier chrome that sits over a Card.

`.input-bar` is the one non-tier glass surface in use (PaletteRenameInput.vue). It is glass-ui's input-chrome recipe (glass-ui DESIGN.md §Glass Surfaces → Convenience shorthands), kept verbatim.

Decision rule: a pane shell that scrolls → `tier="wash" :shadow="false" :grain="false"`; a non-scrolling content card → `tier="resting"`; a floating overlay over either → `.glass-floating` direct utility. The cartoon-shadow rung (see § Shadows) is the shared envelope, so all three read as the same material at different elevations.

## § Shadows

One cartoon language. The demo overrides `--shadow-cartoon` to a heavier rung (style.css:44-47):

- Rest: `8px 8px 0 0 color-mix(in srgb, var(--shadow-color) 80%, transparent)` — flat offset, pop-art aesthetic.
- Hover: `10px 10px 0 0 ... 85% ...` — same offset shape, lifted opacity.
- `--shadow-card` + `--shadow-card-hover` are routed through `--shadow-cartoon` + `--shadow-cartoon-hover` (style.css:46-47). One language for `shadow-card`, `shadow-[var(--shadow-card)]`, and `shadow-cartoon` consumers — no fourth ad-hoc recipe.

Dark mode lightens the cartoon rung (style.css:146-147) by dropping the shadow-color mix to 50% / 55% so the offset stays legible against the dark substrate. Glass-ui's `--shadow-cartoon-sm/md/lg` rungs (MiniColorPicker, SearchFilterBar) are consumed unchanged for chip-scale shadows where the heavier 8px rung would dominate.

## § Radii

Role-bearing tokens (glass-ui DESIGN.md §Border Radius):

- `rounded-card` (= `--radius-card` = 16 px) — Card surfaces, palette cards, gradient swatch.
- `rounded-input` (= `--radius-input` = 8 px) — text inputs.
- `rounded-pill` / `rounded-full` — chips, slug pills, dock control.
- `rounded-panel` (= 12 px) — popovers, bulk-action toolbar, eyedropper overlay.

Markdown `<pre>` + `<img>` carry their own radii in `Markdown.vue <style scoped>` for content fidelity (a code block reads as code, an image as an image; the role-bearing token applies to chrome, not content).

Pill radius (`--radius-pill: 9999px`) is the dock control's signature shape (`--radius-dock = var(--radius-pill)` in glass-ui), the slug-pill recipe (style.css:217-219), and the touch-gate outline on slider tracks (style.css:188-190). Avoid hand-rolling `rounded-full` or `rounded-[9999px]` when the role-bearing token applies.

## § Motion

Glass-ui's named durations + easings (DESIGN.md §Duration, §Easing) are the rhythmic vocabulary:

- Durations: `var(--duration-fast)` (200 ms hover/feedback), `var(--duration-normal)` (300 ms standard), `var(--duration-panel)` (550 ms dock expand).
- Easings: `var(--ease-standard)` (decel cubic, default), `var(--ease-decelerate)` / `var(--ease-accelerate)` (entry/exit), `var(--spring-snappy)` / `var(--spring-smooth)` (spring physics for transforms).

Demo-side reduced-motion carve-out (animations.css:32-60, B.W1 Lane B): the global `prefers-reduced-motion` guard neutralises all CSS animation + transition durations; a secondary block re-enables 150 ms opacity fades on `[data-state="open"|"closed"]` so reka-ui Dialog/Sheet/Popover state changes still communicate. WebGL RAF loops (GooBlob, aurora) fence on `prefers-reduced-motion` in their composables (see `useMetaballRenderer`); the global CSS guard does not reach them.

Custom keyframes live in `demo/@/styles/animations.css` (`edit-drawer-in`, with a mobile media-query restate at ≤ 639 px — see comment at animations.css:12-16 for the intentional inheritance break) + colocated `<style scoped>` blocks (per-component animations). Shared keyframes (dialog, floating-panel, card-menu, shimmer) come from `@mkbabb/glass-ui/styles/animations.css`.

Canonical motion recipe — when in doubt, reach for `var(--duration-normal) var(--ease-standard)` on a transition; for entry-from-rest use `--ease-decelerate`, for exit-to-rest use `--ease-accelerate`. Spring curves (`--spring-snappy`, `--spring-smooth`) are reserved for transforms that read physically; PaletteCard.vue's golden-text-shimmer demonstrates the cubic-bezier path, ActionBarLayer.vue the duration-fast path.

## § Z-tier

All z-index reaches route through glass-ui's `--z-*` tokens (DESIGN.md §Z-Index Stack):

- `z-[var(--z-bar)]` (30) — sticky bars (PaletteControlsBar).
- `z-[var(--z-header)]` (35) — pane headers (PaneHeader, Markdown TOC).
- `z-[var(--z-dock)]` (40) — the dock (Dock.vue), EditDrawer.
- `z-[var(--z-popover)]` (70) — popovers, bulk-action toolbar, eyedropper overlay, gradient stop selection ring.
- `z-[var(--z-controls)]` (20) — inline canvas overlays (MixAnimationCanvas).

Zero numeric `z-[NN]` literals in custom components post-D.W4 Lane A (the two `z-[1]` survivors live in `demo/@/components/ui/` — shadcn-vue generated, do not hand-edit). Lane A surfaces these as `z-dock`, `z-popover`, etc. Tailwind utilities; the rendered output is byte-identical.

## § Color

OKLab-driven throughout — the picker, the gradient interpolation, the harmony generator. Glass-ui's color tokens (`--background`, `--foreground`, `--card`, `--primary`, `--muted-foreground`, `--border`, etc.) are the surface contract; the demo adds two accent tokens (style.css:11-12):

- `--color-gold: #D4AF37` — the admin-mode + featured-palette accent. Animated gold-text-shimmer (PaletteCard.vue) uses a 4-stop gradient cycling through `--color-gold` ↔ `--color-gold-light`. The dock's admin-mode toggle (Dock.vue), the featured-badge stroke (PaletteCard), and the profile slug pill (ProfileSection.vue) all reach for the same token.
- `--color-gold-light: #F5E6A3` — shimmer counterpoint, only consumed by the gold-text-shimmer keyframe.

Dark-mode color overrides (style.css:143-153, marked PROJECT OVERRIDE) re-pin `--popover`, `--border`, `--input`, `--shadow` for the color-picker context — glass-ui's dark defaults run cooler / more saturated; the demo's overrides run warmer to keep the cartoon-shadow language legible against the dark substrate.

Harmony patterns ship in `useColorGeneration.ts` (demo/@/components/custom/color-picker/composables/): analogous (±30°), complementary (180°), split-complementary (base + 150° + 210°), tetradic, triadic, monochromatic, golden, random. Hues generated in OKLCh, jittered in L/C, rendered through glass-ui's color contract.

## § Layout

The post-B.W1 flex-fixed dock (Bβ Proposal B, style.css:15-30 doc-comment). The dock is `position: fixed`; `.app-layout` is a flex column whose `padding-top: var(--dock-total)` reserves the dock band; `justify-content: center` vertically centres the pane container. There is no `--dock-pos` formula and no grid clearance row — the dock's pinning and the content's centring are independent CSS layout.

Layout tokens (style.css:55-66, all `:root`):

- `--dock-inset` (1rem mobile, 0.5rem ≥1024 px) — the dock's pin offset.
- `--dock-h` / `--dock-gap` / `--dock-total` — the vertical band the dock occupies.
- `--content-max-h: calc(100dvh - var(--dock-total) - 1rem)` — the cap on the pane container; the `100dvh` keeps the math mobile-safe (URL bar collapse).
- `--desktop-pane-max-w: 30rem` + `--desktop-pane-gap` — the dual-pane grid sizing, consumed at ≥ 1024 px via `lg:max-w-[var(--desktop-pane-max-w)]` (every pane shell).
- `--menu-min-w: 11rem` — shared dropdown/select panel width (collapsed from 5 ad-hoc widths at A.W7).

Consumer sites (post-D.W4 Lane A surfaces these as utilities — `top-dock-inset`, `max-w-pane`, `min-w-menu` etc.):

| Token | Consumed at | Idiom |
|---|---|---|
| `--dock-inset` | `Dock.vue` (the fixed dock pin) | `top-[var(--dock-inset)]` |
| `--desktop-pane-max-w` | every pane shell + ColorPicker.vue | `lg:max-w-[var(--desktop-pane-max-w)]` |
| `--menu-min-w` | every DropdownMenuContent + SelectContent | `min-w-[var(--menu-min-w)]` |
| `--content-max-h` | `.pane-container` (style.css:127) | `max-h-[var(--content-max-h)]` |
| `--dock-total` | `.app-layout` padding (style.css:105) | direct CSS, not a utility |

`hero-lab.css` (demo/hero-lab/) ships its own layout system for the interactive demo viewport (`hero-panel`, `hero-panel__title-row`, `hero-panel__viewport`). It is the exemplary visual-hierarchy reference (B.W2 Lane B claim verified: type-clean + reduced-motion-correct across all 4 RAF render loops).

## § Idioms NOT used (anti-patterns)

Explicit. A change-list reviewer should flag any of these.

- **No `:deep()` for shadcn internals** — use role/label selectors or `data-*` attributes. (`PaletteCard.vue`'s `.featured-badge :deep(svg)` is the post-D.W4 Lane A survivor, scoped to the badge wrapper — no further `:deep()` reaches into reka-ui markup.)
- **No numeric `z-[NN]` literals** in `demo/@/components/custom/` or `demo/color-picker/` — route through `--z-*` tokens via `z-dock`, `z-popover`, etc. Tailwind utilities (post-Lane A) or `z-[var(--z-popover)]` arbitrary reach.
- **No `100vh`** — use `100dvh` for mobile-safe viewports. The dock-band math depends on this; `100vh` would clip on iOS Safari with the URL bar collapsed.
- **No hand-rolled Alert** — consume `Alert` / `AlertTitle` / `AlertDescription` from `@components/ui/alert`, which re-exports glass-ui's primitive (B.W2 idiomatic-gestalt finding N1). The barrel exists for ergonomics; the implementation is upstream.
- **No magic `[var(--…)]` reaches when a Tailwind utility exists** — post-D.W4 Lane A, ~43 sites collapse to first-class utilities (`z-dock` instead of `z-[var(--z-dock)]`, `duration-fast` instead of `duration-[var(--duration-fast)]`, `rounded-input` instead of `rounded-[var(--radius-input)]`). Truly-bespoke residuals (≤ 5) carry an inline rationale.
- **No `button:has(> .lucide-x)` or similar markup-coupled selectors** — use role/label or a stable `data-*` (Lane A fix in `PaletteDialog.vue`).
- **No parallel `design-idioms.css`** — tokens live in `style.css :root` + the glass-ui-published surface; recipes stay colocated in their components' `<style scoped>` blocks. A second CSS file would create a cascade-order split-brain (glass-ui DESIGN.md §Token Architecture → Feature token home rule warns against the same shape; research/Df-styling.md §6 settled the verdict).
- **No new global utility class for one consumer** — colocate to the component's `<style scoped>` (post-D.W4 Lane A: `.pane-scroll-fade`, the touch-gate cluster, `.palette-tab-content`, `.palette-card-grid` moved out of `style.css`). The shared survivors (`.slug-pill`, `.app-layout`, `.pane-container`, `.underline-tabs`) are true cross-feature recipes; each carries a comment justifying its global residence.
