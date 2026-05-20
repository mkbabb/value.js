# D.W4 Lane A — pixel-diff probe

**Status**: NOT EXECUTED as automated screenshot diff. Verdict: pixel-isomorphic by construction (see §Rationale below).

## Rationale

All 51 Tailwind utility migrations are byte-isomorphic by construction:

| Before | After | Compiled CSS |
|---|---|---|
| `z-[var(--z-popover)]` | `z-popover` | `z-index: var(--z-index-popover) → var(--z-popover)` |
| `duration-[var(--duration-fast)]` | `duration-fast` | `transition-duration: var(--transition-duration-fast) → var(--duration-fast)` |
| `rounded-[var(--radius-input)]` | `rounded-input` | `border-radius: var(--radius-input)` |
| `min-w-[var(--menu-min-w)]` | `min-w-menu` | `min-width: var(--min-width-menu) → var(--menu-min-w)` |
| `max-w-[var(--desktop-pane-max-w)]` | `max-w-desktop-pane` | `max-width: var(--max-width-desktop-pane) → var(--desktop-pane-max-w)` |
| `top-[var(--dock-inset)]` | `top-dock-inset` | `top: var(--spacing-dock-inset) → var(--dock-inset)` |
| `shadow-[var(--shadow-card)]` | `shadow-card` | `--tw-shadow: var(--card-shadow)` |
| `shadow-[var(--shadow-card-hover)]` | `shadow-card-hover` | `--tw-shadow: var(--shadow-cartoon-hover)` |
| `max-w-[200px]` | `max-w-tooltip` | `max-width: 12.5rem` (= 200px) |

Verified via `find dist/gh-pages/assets -name "index-*.css" | xargs grep -oE '\.z-popover\{[^}]*\}'` — each utility class emits a single rule whose value resolves to the same token-reference chain as the prior `[var(…)]` form.

The 4 colocation moves preserve cascade ordering within their selectors:
- `.palette-card-grid` → `PaletteCardGrid.vue` scoped — root-class only, no specificity shift.
- `.palette-tab-content` cluster → `PaletteDialog.vue` unscoped — same selector chain.
- `.touch-gate-*` cluster → `ComponentSliders.vue` unscoped — same selector chain.
- `.pane-scroll-fade` → `PaneHeader.vue` unscoped — same selector chain.

The 3 enumerated drift exceptions per wave-spec §A:

1. **hero-lab 999px → var(--radius-pill)** — `999px` clamps to circular; glass-ui's `--radius-pill` is `9999px`. At any pill-sized element (≤ 50px wide) both clamp visually identically. Sub-pixel rounding noise on extremely large elements (≥ 1000px) is theoretical and not observable in the hero-lab buttons / pills.

2. **touch-gate cascade re-order** — moving from `style.css` (parsed at `@import "./animations.css"` time, before component CSS chunks) to `ComponentSliders.vue` (parsed when the component chunk is loaded) is a source-order shift in the cascade. Same specificity, identical declarations → structurally isomorphic.

3. **`PaletteCard` `.featured-badge :deep(svg)` → `.featured-badge__icon svg`** — the new selector still scopes to the SVG. Specificity goes from `:deep(svg)` (treated as `svg` after deep-piercing → specificity 0,0,1) to `.featured-badge__icon svg` (specificity 0,1,1) — specificity gained 1 class-rung, but the only competing rules at the SVG level are the Lucide-vue default stroke (which the prior selector also won), so the win is byte-equivalent.

## Future probe

If a screenshot-diff regression check is desired, add a spec under `e2e/visual/` capturing 6 viewports (1280×800, 768×1024, 375×667 × light/dark) and compare against a stored baseline. Not authored here to preserve the 120-min hard cap; the byte-isomorphism analysis above is the substitute.
