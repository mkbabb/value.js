# B.W2 — Layout simplification (Bβ Proposal B)

**Opens after**: B.W1 close.
**Agents**: 1 lane (the orchestrator owns this — `style.css` + 2 consumers; small and surgical, like A.W0). The user explicitly named this the "contrived, overfit, over-engineered" surface — the orchestrator owns the transposition to ensure idiomatic intent is preserved.
**Hard gate**: `--dock-pos` token absent from `style.css` (deletion proof); Playwright at 4 viewports (375×667 / 1280×720 / 1280×800 / 2520×1080), light + dark — at standard viewports the dock and content positions are unchanged from W4 baseline; at 2520×1080 the documented visual delta is captured; 0 console errors; `vue-tsc` + `npm test` + smoke green.
**Status**: planned.

## Scope

`research/Bb-layout-simplification.md` — Proposal B: delete `--dock-pos`, flex+fixed layout.

### Pre-execution decision

At wave open, the orchestrator confirms the design intent with the user:
> Tranche B's W2 wave is about to delete the `--dock-pos` centring formula (currently 9 active layout tokens, 1 fold-back dependency edge, 173px dock at 2520×1080). Proposal B replaces it with a flex+fixed layout: dock pins at `--dock-inset` (8px) across all viewports; the content cluster vertically centres via `justify-content: center` on `.app-layout`. Visual delta only at 21:9. Confirm Proposal B, or prefer Proposal A (keep dock-follows-content at 21:9 via `align-self: center` on `.pane-container`; slightly less deletion but preserves the 21:9 dock-following-content visual)?

If user picks A, this wave executes Proposal A instead. Both are documented in `research/Bb`. The hard gate adapts accordingly.

### Lane A — layout transposition (Proposal B default)

1. `style.css` `:root`:
   - DELETE `--dock-pos` (the entire `max(...)` formula).
   - DELETE `--layout-padding` (folds into the `.app-layout` `padding` shorthand).
   - Verify `--dock-h`, `--dock-total`, `--content-max-h`, `--dock-padding-y`, `--dock-border-width`, `--dock-inset`, `--dock-gap` remain. (Token count: 9 → 7.)
   - The `--content-max-h` media-query clamps remain (they govern the pane container's height cap; they no longer feed back into the dock).
2. `style.css` `.app-layout`:
   - DELETE `grid-template-rows`, `grid-row` participation, `align-items`.
   - REPLACE with `display: flex; flex-direction: column; justify-content: center; height: 100dvh; overflow: hidden; padding: var(--dock-total) 1rem 0.5rem;`.
3. `style.css` `.pane-container`:
   - DELETE `grid-row: 2`.
   - DELETE `height: 100%`.
   - KEEP `max-height: var(--content-max-h)`, `margin: 0 auto`, the responsive `pane-container--dual` grid-template-columns.
4. `Dock.vue:73` — change `top-[var(--dock-pos)]` to `top-[var(--dock-inset)]`.
5. `ColorPicker.vue:2` — DELETE the `lg:max-h-[var(--content-max-h)]` portion; the pane-container now constrains height.

### Lane A.2 — Visual probe + measurement

Run Playwright at 4 viewports light+dark with the dev server. Measure dock `top` and `.pane-container` `top`/`bottom`/`height`. Capture screenshots. Confirm:

| Viewport | Expected dock top | Expected pane-container top | Delta from W4 baseline |
|---|---|---|---|
| 1280×800 | 8px | ~71px | 0px |
| 1280×720 | 8px | ~71px | 0px (or W4 baseline) |
| 375×667 | 16px | ~91px | 0px |
| 2520×1080 (21:9) | 8px | ~236px (centred via `justify-content`) | dock −165px, pane top +165px (documented delta) |

Document the 21:9 delta in `audit/B.W2-playwright/` with side-by-side before/after captures.

### Lane A.3 — `--menu-min-w` inline rationale (folded in from Bα §46)

Two menus deliberately stay wider than `--menu-min-w`: `Dock.vue` view-select SelectContent at `min-w-[12rem]` (content: "Atmosphere", "Audit Log" + icons + dots); `GenerateControls.vue` SelectContent at `min-w-[14rem]` (content: "Split Complementary" etc.). Add an inline comment at each site:

```vue
<!-- B.W2: kept wider than --menu-min-w because long option labels need the space -->
<SelectContent class="min-w-[12rem]">
```

## File bounds

`demo/@/styles/style.css`, `demo/@/components/custom/dock/Dock.vue`, `demo/@/components/custom/color-picker/ColorPicker.vue`, `demo/@/components/custom/dock/DockViewSelect.vue` (or Dock.vue if min-w lives there), `demo/@/components/custom/generate/GenerateControls.vue`.

## Hard gate

1. `grep -n 'dock-pos' demo/@/styles/style.css` returns nothing (deletion proof).
2. `grep -n 'layout-padding' demo/@/styles/style.css` returns nothing.
3. Token count = 7 in `style.css :root` (active layout tokens).
4. Playwright at 4 viewports (375×667 / 1280×720 / 1280×800 / 2520×1080), light + dark — dock + pane positions measured against the W4 baseline; standard viewports show 0 drift; 21:9 shows the documented visual delta. Captures to `audit/B.W2-playwright/`.
5. 0 console errors at every viewport.
6. `vue-tsc` count not raised; `npm test` 1409+ green; smoke suite green.
7. `--menu-min-w` exception sites carry inline rationale comments.

## Format and lint cadence

Lint after the lane; gate before close.

## Verification artefacts

`audit/B.W2-layout-transposition.md` (the before/after CSS diff + the token graph after; the 21:9 visual delta captures); `audit/B.W2-playwright/` (4-viewport captures, light + dark).

## Commit plan

1 commit: `refactor(tranche-b/w2): delete --dock-pos centring formula, flex+fixed layout (Bβ Proposal B)`. Plus a small docs note in `demo/DESIGN.md` if the change affects the design-language documentation.

## Dependencies

- Depends on: B.W1.
- Blocks: B.W3.

## Open decision

User confirmation at wave open: Proposal B (default) vs Proposal A. Default is Proposal B per the user's "contrived/overfit/over-engineered" diagnostic and the precept "abrogate before patch."
