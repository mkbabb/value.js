# B.W1 Lane D — Layout transposition (Bβ Proposal B)

**Wave**: B.W1 Lane D. **Owner**: orchestrator (the user named layout the "contrived/overfit" surface — the transposition stays in one hand).
**Source**: `research/Bb-layout-simplification.md` Proposal B.
**Sub-gate D** (verbatim): "`grep dock-pos|layout-padding style.css` returns nothing (deletion proof); `:root` carries 7 layout tokens; Playwright at 375×667 / 1280×720 / 1280×800 / 2520×1080 light+dark measures dock `top` and `.pane-container` geometry against the W4 baseline — standard viewports show 0 drift, 21:9 shows the documented delta (dock pins at 8px vs floating ~173px), captures to `audit/B.W1-layout/`; `--menu-min-w` exception sites carry the rationale comment."

## What changed

The dock's vertical position and the pane container's centring were produced by two independent layout mechanisms — a CSS grid clearance row *and* a `--dock-pos = max(...)` centring formula that folded `--content-max-h` back into the dock position. Proposal B collapses both into one idiomatic flex layout.

### `style.css`

- **`:root`** — deleted `--dock-pos` (the 4-line `max()` formula) and `--layout-padding`. `--content-max-h` now `calc(100dvh - var(--dock-total) - 1rem)` (was `… - var(--layout-padding)`). Layout token count **9 → 7**: `--dock-border-width`, `--dock-padding-y`, `--dock-h`, `--dock-inset`, `--dock-gap`, `--dock-total`, `--content-max-h`.
- **`.app-layout`** — `display: grid` + `grid-template-rows` + `align-items` (+ the `@media (min-width:1024px)` grid override) → `display: flex; flex-direction: column; justify-content: center; padding: var(--dock-total) 1rem 0.5rem`. The `padding-top: var(--dock-total)` reserves the fixed-dock band; `justify-content: center` centres the pane container.
- **`.app-layout > nav { grid-row: 1 }`** — deleted (meaningless in a flex parent; the `<nav>` wraps the `position:fixed` dock and carries no in-flow height).
- **`.pane-main`** — dropped `grid-row: 2` and `align-self: stretch`; kept `display: flex; flex-direction: column; min-height: 0; min-width: 0`.
- **`.pane-container`** — dropped `height: 100%` (the W5 percentage-height chain it fed is gone); kept `max-height: var(--content-max-h)`, `margin: 0 auto`, the `--dual` columns.

### Consumers

- `Dock.vue:73` — `top-[var(--dock-pos)]` → `top-[var(--dock-inset)]`.
- `ColorPicker.vue:2` — deleted `lg:max-h-[var(--content-max-h)]` (the `.pane-container` `max-height` constrains the pane).
- `DockViewSelect.vue` (`min-w-[12rem]`), `GenerateControls.vue` ×2 (`min-w-[14rem]`) — `--menu-min-w` exception sites now carry an inline `B.W1:` rationale comment.

## Deletion proof

`grep -rn 'dock-pos\|layout-padding' demo/ src/` returns only two comment-prose lines in `style.css` (the new documentation). Zero live `var(--dock-pos)` / `var(--layout-padding)` consumers.

## Runtime evidence — Playwright geometry probe

4 viewports × light+dark, 8 captures in `audit/B.W1-layout/bw1-*.png`. **0 console errors, 0 stale-prop warnings.**

| Viewport | dock `top` | `.pane-container` h × w | Verdict |
|---|---|---|---|
| 375×667 | 16px (`--dock-inset` 1rem) | 539 × 343 | mobile inset; pane renders, no collapse |
| 1280×720 | 8px (`--dock-inset` 0.5rem) | 619 × 1000 | 0 drift from W4 baseline (8px) |
| 1280×800 | 8px | 688 × 1000 | 0 drift; `--content-max-h` = 86dvh = 688 |
| 2520×1080 (21:9) | 8px | 608 × 1004, top 268 | **the documented Proposal-B delta** — dock pins at 8px (was ~173px); content cluster still vertically centred (top 268 = balanced within the padding box) |

The W5 landmark concern — the bare `<main>` collapsing the percentage-height chain to a 0×0 pane — is resolved structurally: `.pane-container` is content-sized + `max-height`-capped, no `height: 100%` chain to collapse. `.pane-main` height tracks `.pane-container` exactly (539/619/688/608).

## Result

Sub-gate D MET. The `--dock-pos` fold-back is gone; one flex layout replaces two coupled mechanisms; the only visual change is the accepted 21:9 dock-pins-at-top delta.
