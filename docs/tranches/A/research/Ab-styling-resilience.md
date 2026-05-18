# Tranche A — Styling Quality and Resilience Audit (value.js demo)

Scope: `demo/color-picker/` and `demo/@/` (the Vue app). The library under `src/` is out of scope.
Glass-ui is symlinked at `node_modules/@mkbabb/glass-ui` → `/Users/mkbabb/Programming/glass-ui`; its tokens come from `src/styles/tokens.css`.

Glass-ui token surface confirmed in this audit (file:line in `node_modules/@mkbabb/glass-ui/src/styles/tokens.css`):
radii `--radius-xs|sm|md|lg|xl|2xl|pill` plus aliases `--radius-card|panel|dialog|input|button|badge|dock|tooltip` (172–191); shadows `--shadow-xs|sm|md|lg|xl`, `--shadow-cartoon-sm|md|lg`, `--shadow-card`, `--shadow-dock`, `--shadow-modal`, `--shadow-elevated` (319–392); z-index tiers `--z-behind`…`--z-debug` (150–167); durations `--duration-*` and easings `--ease-*` (51–95); `--size-icon-btn: 2.5rem` (646). Glass surface ladder `.glass-wash|quiet|resting|floating|overlay` plus `.glass-card|btn|pill|cartoon` lives in `glass.css`. Card recipes `.cartoon-card`, `.elevated-card`, `.paper-texture` in `cards.css`.

A note on method: every finding cites a real line and quotes the offending code. Patterns that recur are reported once, against the worst example, with a count of the other sites.

---

## Category 1 — Non-idiomatic Tailwind v4 / glass-ui usage

### Ab-1 — Glass surface ladder is never used; surfaces are rebuilt by hand
Location: `demo/@/components/custom/color-picker/editing/EditDrawer.vue:76-83`, `demo/@/components/custom/palette-browser/CurrentPaletteEditor.vue:286-298`.

EditDrawer reconstructs a glass surface from raw tokens:

```css
.edit-drawer {
    background: var(--glass-bg-subtle);
    backdrop-filter: var(--glass-blur-default);
    -webkit-backdrop-filter: var(--glass-blur-default);
    border: 1px solid var(--border);
    box-shadow: 4px 0 24px -4px color-mix(in srgb, var(--foreground) 15%, transparent);
```

CurrentPaletteEditor's `.edit-overlay` does the same with `--glass-bg-elevated` + `--glass-blur-elevated` + a hand-mixed border. Glass-ui ships `.glass-quiet` / `.glass-floating` exactly for this — background, blur, border and the matching shadow rung in one class. Reaching past the surface class to the private `--glass-bg-*` / `--glass-blur-*` primitives means a future glass-ui surface-recipe change (tint, blur radius, border treatment) silently does not reach these two panels.

Fix: apply `.glass-floating` to `.edit-overlay` and `.glass-quiet` (or `.glass-resting`) to `.edit-drawer`, then delete the `background` / `backdrop-filter` / `border` / `box-shadow` declarations. Keep only the layout and animation properties in the component block.

### Ab-2 — `box-shadow` rebuilt instead of using a shadow token
Location: `demo/@/components/custom/palette-browser/PaletteDialog.vue:611-612` (worst); also `:618-619` (duplicate of the same value for `:focus`).

```css
box-shadow: 0 25px 50px -12px color-mix(in srgb, var(--foreground) 25%, transparent),
            0 0 0 1px var(--border);
```

The `0 25px 50px -12px` ramp is a hand-tuned magic shadow that exists nowhere else and does not track dark mode the way the tokenized shadows do. Glass-ui provides `--shadow-modal` for exactly the modal-dialog case (`tokens.css:323`, with a dark-mode override at `tokens.css:971`).

Fix: `box-shadow: var(--shadow-modal), 0 0 0 1px var(--border);` and reuse it for the `:focus` rule rather than repeating the literal.

### Ab-3 — Inline-styled gradient with hardcoded hex instead of CSS color tokens
Location: `demo/@/components/custom/palette-browser/MiniColorPicker.vue:11`.

```js
:style="{ background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${hue}, 100%, 50%))` }"
```

`#000` and `#fff` are baked into a template-literal style binding. The picker reads identically in light and dark mode, and an inline `:style` defeats the cascade — no theme, media query, or `.dark` rule can reach it. The hue half is genuinely dynamic and fine; the black/white stops are not.

Fix: move the static `linear-gradient(to top, …)` overlay into the component's `<style scoped>` block as a class, leave only the hue-driven layer in `:style`. If the black/white stops must theme, use `var(--foreground)` / `var(--background)`.

### Ab-4 — Gold accent hardcoded as `rgb` triples instead of `--color-gold`
Location: `demo/@/components/custom/dock/Dock.vue:401` (worst); also `demo/@/components/custom/palette-browser/PaletteCard.vue:380`, `demo/@/components/custom/color-picker/controls/ColorInput.vue:363` and `:365`, `demo/@/components/custom/palette-browser/PaletteDialogHeader.vue:16` (`'#D4AF37'` string prop). 4 other sites.

```css
/* Dock.vue:400-402 */
.gold-shimmer-icon {
    color: var(--color-gold);
    filter: drop-shadow(0 0 2px rgba(212, 175, 55, 0.3));
}
```

The same component sets `color: var(--color-gold)` on the line above, then writes the identical color as a raw `rgba(212, 175, 55, …)` triple in the `drop-shadow`. `--color-gold` is `#D4AF37` (`demo/@/styles/style.css:11`); `212,175,55` is its decimal form and `255,215,0` (ColorInput) is a different gold drifted away from the token. Editing `--color-gold` updates only one of the two.

Fix: `drop-shadow(0 0 2px color-mix(in srgb, var(--color-gold) 30%, transparent))`. Pass `var(--color-gold)` (not the literal `'#D4AF37'`) from PaletteDialogHeader. Pick one gold for ColorInput's glow and route it through the token.

### Ab-5 — Per-instance utility soup that the dock already classes
Location: `demo/@/components/custom/palette-browser/PaletteRenameInput.vue:4`.

```html
class="flex items-center gap-2 rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl px-3 h-9 max-w-sm w-full transition-[box-shadow,border-color] focus-within:ring-2 focus-within:ring-ring/40 focus-within:border-border"
```

This is an input-bar surface assembled from twelve utilities including `backdrop-blur-xl` and a `transition-[box-shadow,border-color]` arbitrary property. Glass-ui ships `.input-bar` / `.input-bar-field` (`utilities.css`) and `.input-pill` (`glass.css`) for the bordered-blurred input case. `BulkActionToolbar.vue:12` repeats the same shape (`rounded-xl border border-border bg-card/95 … shadow-lg backdrop-blur-sm`).

Fix: replace the surface utilities with `.input-bar` and keep only the layout utilities (`flex items-center gap-2 px-3`). For BulkActionToolbar use `.glass-floating` plus layout utilities.

### Ab-6 — `transition-[…]` / `duration-[var(--…)]` / `ease-[var(--…)]` arbitrary properties where a utility or scoped rule fits
Location: `demo/@/components/custom/color-picker/ColorPicker.vue:2`.

```html
class="… transition-[margin,transform] duration-[var(--duration-normal)] ease-[var(--ease-standard)]"
```

Wrapping CSS variables in Tailwind arbitrary-value brackets (`duration-[var(--duration-normal)]`) is a workaround, not idiomatic v4 — the v4 way is to register the duration/easing in `@theme` so `duration-normal` and `ease-standard` resolve as plain utilities, or to put the three-property transition in the component's `<style scoped>`. The current form also pins three different concerns (margin, transform, the chain) into one unreadable class.

Fix: add a `.pane-shell` rule to `style.css` (or the component's scoped block) with `transition: margin var(--duration-normal) var(--ease-standard), transform var(--duration-normal) var(--ease-standard);` and drop the three arbitrary utilities.

### Ab-7 — Arbitrary `rem` widths on Select/Dropdown content instead of a shared token
Location: `demo/@/components/custom/dock/menus/ProfileSection.vue:49` and `:102` (`min-w-[11rem]`); same `min-w-[11rem]` at `SortFilterMenu.vue:8`, `MobileMenuDropdown.vue:37`, plus `min-w-[12rem]` (Dock.vue:251), `min-w-[14rem]` (GenerateControls.vue:90, :112), `min-w-[9rem]`/`min-w-[10rem]`/`max-h-[16rem]` (EasingSelector.vue:40, :43). 8+ sites, four different widths.

Every dropdown/select panel picks its own arbitrary minimum width. There is no shared value, so the menus do not line up and a width tweak is an eight-file edit.

Fix: define one project token (e.g. `--menu-min-w: 11rem` in `style.css :root`) and use `min-w-[var(--menu-min-w)]`, or register it in `@theme` as a `--width-menu` so `min-w-menu` becomes a real utility. Collapse the four variants to one unless a panel genuinely needs a wider body.

---

## Category 2 — Monolithic / global stylesheet patterns

### Ab-8 — Six "custom" components ship plain (unscoped) `<style>` blocks that leak globally
Location: unscoped `<style>` (no `scoped`) in `WatercolorDot.vue:61`, `Markdown.vue:68`, `EditDrawer.vue:73`, `PaletteDialog.vue:594`, `PaletteDialogHeader.vue:66`, `CurrentPaletteEditor.vue:245`.

CurrentPaletteEditor's block carries the comment `unscoped for Vue Transition classes`, which justifies the *transition* classes only — but the same block also defines `.swatch-editing`, `.swatch-cutout` and `.edit-overlay` (`:268-300`), all of which are ordinary component selectors now living in the global namespace. `PaletteDialogHeader` puts `.admin-golden-text`, `.admin-golden`, `.pastel-rainbow-text` into global scope with no portal reason. Generic names like `.edit-overlay`, `.swatch-cutout`, `.admin-golden` in a global sheet are a collision risk and make the component non-portable.

Fix: split each file into two blocks — keep one unscoped `<style>` for the Vue `*-enter-active` / `*-leave-to` transition classes and the `:has(> .palette-dialog)` portal selector (those must be global), and move every plain component selector into a second `<style scoped>` block.

### Ab-9 — `style.css` mixes app shell layout, reka-ui overrides, and one-off component utilities in one global file
Location: `demo/@/styles/style.css:200-231`.

`.section-subtitle`, `.filter-section`, `.filter-section > .section-label`, `.filter-option`, `.filter-option:hover` are component-specific recipes (a filter popover and a subtitle) sitting in the global app stylesheet. `.filter-option` even hardcodes its own padding, gap, fonts and radius. These belong with the component that renders them.

Fix: move the filter-popover block to the filter component's `<style scoped>`, and `.section-subtitle` to wherever the subtitle renders. Keep `style.css` to the genuinely global concerns: `@theme`, the layout-token `:root`, `.app-layout`, `.pane-container`, the `@layer base` reset.

### Ab-10 — `underline-tabs` / `palette-tab-content` reka-ui overrides reach into portal internals from the global sheet
Location: `demo/@/styles/style.css:145-165`.

```css
.underline-tabs button[role="tab"][data-state="active"] {
    border-bottom: 2px solid var(--active-tab-color, var(--primary));
```

This styles reka-ui's internal `button[role="tab"]` by attribute selector from a global file. It is fragile against a reka-ui DOM change and is invisible to anyone reading the Tabs component. Per the project's own `feedback_glass_ui_first_class.md`, an underline-tab look should be a glass-ui Tabs *variant*, not a demo-side attribute override.

Fix: request an `underline` variant on the glass-ui Tabs component (it already exposes `UnderlineTabs` per `dist/UnderlineTabs-*.js`) and consume that, removing the global override.

---

## Category 3 — Deprecated / archaic CSS

### Ab-11 — `-webkit-box` line-clamp instead of the standard `line-clamp`
Location: `demo/@/styles/style.css:204-208`.

```css
.section-subtitle {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
```

The `display:-webkit-box` + `-webkit-box-orient` + `-webkit-line-clamp` triad is the pre-standard clamp hack. The standard `line-clamp` property and Tailwind's `line-clamp-1` utility are supported across the project's browser targets.

Fix: replace the three declarations with `line-clamp: 1;` (or apply the `line-clamp-1` utility on the element and delete the rule).

### Ab-12 — Standalone `-webkit-` prefixes with no standard partner
Location: `demo/@/components/custom/color-picker/visual/PointerDebugOverlay.vue:318` (`-webkit-overflow-scrolling: touch;`), `demo/@/components/custom/palette-browser/PaletteControlsBar.vue:161` (`&::-webkit-scrollbar { display: none; }`).

`-webkit-overflow-scrolling: touch` is an obsolete iOS property (no-op since iOS 13) and is dead code. The `::-webkit-scrollbar { display: none }` hack has the standard `scrollbar-width: none` equivalent now supported in the project's targets; glass-ui already ships `.scrollbar-hidden` (`utilities.css`).

Fix: delete the `-webkit-overflow-scrolling` line. Replace the `::-webkit-scrollbar` rule with the `.scrollbar-hidden` class, or add `scrollbar-width: none`.

Note — out of scope but adjacent: the `-webkit-mask-image` / `-webkit-background-clip` / `-webkit-text-fill-color` / `-webkit-backdrop-filter` prefixes (ColorInput.vue:279, PaletteDialogHeader.vue:71-72, EditDrawer.vue:80, etc.) are still required by Safari for those properties and are correct as written; they are not findings.

### Ab-13 — `ExtractControls` reimplements a slider with `-webkit-`/`-moz-` pseudo-elements instead of the project slider
Location: `demo/@/components/custom/image-palette-extractor/ExtractControls.vue:152-225`.

Two native `<input type=range>` sliders are styled with the full `::-webkit-slider-runnable-track` / `::-webkit-slider-thumb` / `::-moz-range-track` / `::-moz-range-thumb` matrix — eight pseudo-element rules duplicated across `--k` and `--kc` variants, with the thumb geometry and border color hand-coded four times. The rest of the demo uses the reka-ui slider with `.slider-track` / `.slider-thumb` and the `.touch-gate-target` system; this component is the only place native range styling survives, and native range pseudo-elements cannot be transitioned consistently across engines.

Fix: replace the two native `<input type=range>` controls with the reka-ui Slider used elsewhere (`ComponentSliders.vue` is the reference), which removes all eight vendor-pseudo rules and inherits touch-gate behavior for free.

---

## Category 4 — Fragile rules

### Ab-14 — The 4-deep dependent `calc()` dock-layout chain (known issue, characterized)
Location: `demo/@/styles/style.css:50-76`, consumed at `:99`, `:104`, `:118`, and in `Dock.vue:172` / `ColorPicker.vue:2`.

The chain, with exact lines:

1. `style.css:52` — `--dock-h: calc(var(--size-icon-btn) + 0.75rem + var(--dock-border-width))`. Depends on glass-ui's `--size-icon-btn` (2.5rem) plus a `0.75rem` magic padding and the local `--dock-border-width: 3px` (`:50`).
2. `style.css:55` — `--dock-total: calc(var(--dock-inset) + var(--dock-h) + var(--dock-gap))`. Adds `--dock-inset` and `--dock-gap` (`:53-54`).
3. `style.css:56` — `--content-max-h: calc(100dvh - var(--dock-total) - var(--layout-padding))`. Subtracts the dock total and `--layout-padding: 2rem` from the dynamic viewport.
4. `style.css:59` — `--dock-pos: max(var(--dock-inset), calc((100dvh - var(--content-max-h)) / 2 - var(--dock-h) - var(--dock-gap)))`. Re-expands `--content-max-h` (so the chain folds back on itself: `--dock-pos` transitively contains `--dock-total`, `--dock-h`, `100dvh`, all of step 1-3).

The fragility:

- **Override desync.** At `style.css:67` the desktop media query *replaces* `--content-max-h` with `clamp(34rem, 86dvh, 52rem)` — an independent formula that no longer derives from `--dock-total`. The 21/9 query (`:73`) replaces it again with `clamp(30rem, 62dvh, 38rem)`. But `--dock-pos` (`:59`, defined once, never overridden) still computes `(100dvh - var(--content-max-h)) / 2 - …`. So at ≥1024px and at 21/9, `--dock-pos` is fed a `--content-max-h` that came from a `clamp()` while `--dock-total` (its sibling input) keeps its calc value. The dock's vertical position and the pane's max-height are derived from two now-disagreeing definitions of the same quantity. Any change to the desktop `clamp()` bounds shifts the dock without any obvious cause, because the coupling is implicit.
- **`100dvh` trap.** Steps 3 and 4 and `.app-layout` (`:95 height: 100dvh`) all read `100dvh`. `dvh` recomputes as mobile browser chrome shows/hides, so `--content-max-h` and `--dock-pos` re-resolve mid-scroll on iOS Safari; the dock can jump because `--dock-pos` is a `max()` whose second arm is dvh-driven.
- **Magic numbers inside the chain.** `0.75rem` (`:52`), `--layout-padding: 2rem` (`:51`), and the `+ 0.5rem` literal in `.app-layout` padding (`:99`) are all uncommented constants that must stay numerically consistent with `--dock-h` for the dock not to clip the first pane.
- **Self-documenting comment admits it.** `style.css:91` carries the comment `App layout — grid replaces manual calc chain`, yet `--dock-pos` at `:59` is still the manual calc chain; the migration to grid was only partial.

Failure mode in one sentence: editing the desktop `--content-max-h` clamp (`:67`) silently moves the dock, because `--dock-pos` (`:59`) still back-derives the dock position from `--content-max-h` while `--dock-total` does not — two definitions of the dock's footprint drift apart.

Fix: break the fold-back. Compute `--dock-pos` purely from `--dock-inset` + `--dock-h` + `--dock-gap` (the dock's own footprint — it never needs `--content-max-h`). Then `--content-max-h` becomes a leaf that nothing else consumes, and the desktop/21:9 `clamp()` overrides stop poisoning the dock position. Replace the `0.75rem` and `2rem` literals with named tokens (`--dock-padding-y`, `--layout-padding` already exists). Finish the grid migration noted at `:91` so `.app-layout` derives row sizing from `grid-template-rows` instead of a `calc()` padding.

### Ab-15 — `z-index: 2` / `z-[1]` magic integers outside the glass-ui z-tier scale
Location: `demo/@/components/custom/panes/PaneHeader.vue:2` (`z-[1]`), `demo/@/components/custom/panes/AuroraPane.vue:225` (`z-index: 2`), `demo/@/components/custom/panes/BlobPane.vue:179` (`z-index: 2`), `demo/@/components/custom/goo-blob/GooBlob.vue:72` (`z-index: 10`).

Glass-ui defines a full z-tier scale `--z-behind`…`--z-debug` (`tokens.css:150-167`); `--z-content` is `10`, `--z-background` is `0`. The panes instead use bare `1` and `2`, which sit *below* `--z-content` and have no defined relationship to the dock (`--z-dock: 40`) or popovers. A sticky `PaneHeader` at `z-[1]` is one stacking-context change away from being painted under sibling content. Elsewhere the demo does it right — `ImageEyedropper.vue:3` uses `z-[var(--z-popover)]`, `BulkActionToolbar.vue:12` uses `z-[var(--z-popover)]` — so the pane files are the inconsistent minority.

Fix: PaneHeader sticky bar → `z-[var(--z-bar)]` or a new `--z-content` rung; the WebGL/aurora background layers → `z-[var(--z-background)]` or `--z-behind`. Pick from the tier scale so the panes participate in the documented stacking order.

### Ab-16 — `PointerDebugOverlay` hardcodes a private color and surface scheme
Location: `demo/@/components/custom/color-picker/visual/PointerDebugOverlay.vue:212-339`.

The overlay hardcodes `background: rgba(0,0,0,0.92)`, `color:#e0e0e0`, `border:1px solid rgba(255,255,255,0.15)`, `backdrop-filter: blur(8px)`, and status colors `#ff4444` / `#4caf50` / `#888` across ~20 declarations. It correctly uses `--z-debug` and `--radius-xl`, so the author knows the token surface — the colors were simply left raw.

This is a dev-only debug panel, so the impact is contained and the priority is low. Still, the fixed black background ignores dark mode and the literal status hexes duplicate semantics that `--destructive` / a success token already carry.

Fix (P2): swap the status hexes for `--destructive` and a green token, and the panel background for `var(--glass-bg-elevated)` + `var(--glass-blur-elevated)` so it matches the rest of the app. Acceptable to defer given it never ships to users.

### Ab-17 — `--radius-lg, 1rem` fallback contradicts the real token value
Location: `demo/@/components/custom/palette-browser/CurrentPaletteEditor.vue:299`.

```css
border-radius: var(--radius-lg, 1rem);
```

The inline fallback claims `--radius-lg` is `1rem` if missing. The actual glass-ui value is `--radius: 0.625rem` and `--radius-lg: var(--radius)` (`tokens.css:172,176`) — i.e. `0.625rem`. If glass-ui's stylesheet ever fails to load, this element jumps to `1rem` while every other radius collapses to its own (different) fallback or `0`. The fallback is both wrong and unnecessary, since `tokens.css` is a hard `@import` dependency.

Fix: drop the fallback — `border-radius: var(--radius-lg);`.

### Ab-18 — `max-h-[calc(100dvh-160px)]` magic-pixel viewport subtraction
Location: `demo/@/components/custom/palette-browser/VersionHistoryDrawer.vue:12`; related dvh literals at `ImagePaletteExtractor.vue:9` (`max-h-[min(400px,50dvh)]`), `ExtractPane.vue:9` (`max-h-[min(320px,40dvh)]`).

```html
class="… overflow-y-auto max-h-[calc(100dvh-160px)]"
```

`160px` is an undocumented guess at the drawer's header + footer + padding. If any of those change the scroll area is wrong, and `100dvh` makes the value oscillate on mobile as browser chrome animates. The `min(400px,50dvh)` forms share the dvh-oscillation trap.

Fix: let the drawer be a flex column — header/footer at natural height, the scroll body `flex-1 min-h-0 overflow-y-auto`. That removes the `160px` guess and the `100dvh` dependency entirely. The pattern already exists in the codebase (`PointerDebugOverlay` `.debug-scroll` uses `flex:1; min-height:0; overflow-y:auto`).

### Ab-19 — `SpectrumCanvas` shadow uses a raw `rgba` instead of a token
Location: `demo/@/components/custom/color-picker/controls/SpectrumCanvas.vue:260`.

```css
.spectrum-dot {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
```

A fixed black drop shadow that does not respond to dark mode and is the only place this exact value appears. Glass-ui has `--shadow-sm` (`0 2px 8px color-mix(…6%…)`, `tokens.css:336`) for small elevation.

Fix: `box-shadow: var(--shadow-sm);` or `color-mix(in srgb, var(--shadow-color) 30%, transparent)` if the heavier dot shadow is intentional.

---

## Prioritized list

### P0 — fragile now, fix first
- **Ab-14** — the dock `calc()` chain folds back on itself; the desktop `--content-max-h` clamp desyncs from `--dock-pos`. Editing one moves the dock with no visible cause. Highest-impact resilience bug.
- **Ab-8** — six components leak plain component selectors (`.edit-overlay`, `.swatch-cutout`, `.admin-golden`) into the global namespace via unscoped `<style>`. Real collision risk; trivial to split.
- **Ab-15** — pane `z-index: 1`/`2` sit below `--z-content`; one stacking-context change paints the sticky header under content.

### P1 — non-idiomatic / drift risk
- **Ab-1** — glass surface ladder unused; EditDrawer + CurrentPaletteEditor rebuild surfaces from private `--glass-bg-*` primitives.
- **Ab-4** — gold accent hardcoded as `rgb(212,175,55)` / `#D4AF37` / `rgb(255,215,0)` across 5 sites; only one tracks `--color-gold`.
- **Ab-13** — `ExtractControls` reimplements a range slider with 8 vendor-pseudo rules instead of the reka-ui slider used everywhere else.
- **Ab-2** — `PaletteDialog` shadow hand-tuned instead of `--shadow-modal`.
- **Ab-9 / Ab-10** — component recipes and reka-ui attribute overrides living in the global `style.css`.
- **Ab-7** — eight dropdown/select panels each pick their own arbitrary min-width.
- **Ab-3 / Ab-6** — inline-style hex stops; arbitrary `var()`-wrapped Tailwind utilities.
- **Ab-18** — `max-h-[calc(100dvh-160px)]` magic-pixel viewport subtraction.

### P2 — cleanup, low impact
- **Ab-11** — `-webkit-box` line-clamp hack → standard `line-clamp`.
- **Ab-12** — dead `-webkit-overflow-scrolling`; `::-webkit-scrollbar` → `.scrollbar-hidden`.
- **Ab-17** — wrong `var(--radius-lg, 1rem)` fallback (`1rem` vs real `0.625rem`).
- **Ab-19** — `SpectrumCanvas` raw `rgba` shadow → `--shadow-sm`.
- **Ab-16** — dev-only `PointerDebugOverlay` hardcodes colors; defer (never user-facing).
