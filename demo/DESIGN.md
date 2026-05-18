# Value.js Demo Design Language

> Extends [glass-ui DESIGN.md](../../glass-ui/DESIGN.md)

## Token Overrides

Fraunces (display) / Fira Code (mono). Cartoon shadow: `--shadow-cartoon` is overridden to an `8px` offset at `80%` opacity (`10px`/`85%` on hover) for a heavier illustrative feel, and `--shadow-card` is routed through it — one cartoon shadow language for both `shadow-card` and `shadow-cartoon` consumers. Custom select/dropdown-menu fonts forced to monospace for numeric value display. Hero-lab layout math tokens (`--hero-cols`, `--hero-gap`, `--viewport-aspect`).

## Local Utilities

- `underline-tabs` — tab group with animated underline indicator, dynamic color via `--active-tab-color` custom property
- `palette-tab-content` — crossfade transition for palette switching
- `hero-lab.css` — rich layout system for the interactive demo:
  - `hero-panel` — main container with responsive grid
  - `hero-panel__title-row` — sticky header with controls
  - `hero-panel__viewport` — aspect-ratio-locked preview area
  - Serves as an exemplary visual hierarchy reference

## Migration Tasks

Minimal—already tightly integrated with glass-ui.

- [ ] Add visual grouping (section separators or category headers) to BrowsePane palette grid
- [ ] Document `hero-lab.css` as exemplary visual hierarchy reference
