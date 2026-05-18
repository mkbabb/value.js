# B.W1 — W5 corrections + floating-panel-item + Markdown residuals

**Opens after**: B.W0 close (A is officially closed).
**Agents**: 3 lanes (A — W5 a11y corrections; B — reduced-motion overlay carve-out; C — floating-panel-item + Markdown radius residuals). Disjoint files; shared tree.
**Hard gate**: SpectrumCanvas + SwatchHoverMenu ARIA corrected; overlay opacity carve-out present in `animations.css`; `.floating-panel-item` either has a CSS definition or is stripped from every consumer; Markdown.vue residual `rounded-2xl` resolved; Playwright re-probe clean; `vue-tsc` not regressed beyond the documented baseline; smoke suite (if up) green.
**Status**: planned.

## Scope

`research/Bd-w5-audit.md §1, §2` and `research/Bz-legacy-cruft.md §3`.

### Lane A — W5 a11y corrections

1. **SpectrumCanvas.vue:5-6** — the `role="slider"` is invalid (missing `aria-valuenow`/`aria-valuemin`/`aria-valuemax`); the widget is a 2D saturation×lightness picker, not a linear slider. Fix: replace `role="slider"` with `role="img"` and add a reactive `:aria-label` interpolating the current saturation and lightness in percent ("Color spectrum, saturation N%, lightness M%"). Or: `role="application"` with a `<div role="status" class="sr-only" aria-live="polite">` reporting the current value. Pick the simpler path (`role="img"`).
2. **SwatchHoverMenu.vue:42-43** — the `role="toolbar"` sits on the hover-triggered teleport panel, which is keyboard-inaccessible. Add `aria-hidden="true"` to the hover-path panel; the reka-ui Popover touch path is the accessible route. Remove the `role="toolbar"` + `aria-label` from the hover panel.
3. **PaletteCardGrid.vue** — the parent of PaletteCard's `role="article"` is currently a plain `<div>`. Add `role="list"` to the grid container (and the children get implicit `role="listitem"` via `role="article"` inside `role="list"`; verify a11y inspector confirms).
4. **GradientVisualizer.vue** SelectTrigger `aria-label`s — verify each `aria-label` supplements (does not override) the visible label. If the SelectValue shows the category name, the `aria-label` is redundant — remove. If the SelectValue shows the selected value only, the `aria-label` correctly names the category — keep.

**Sub-gate A**: snapshot diff shows SpectrumCanvas no longer has `role="slider"`; SwatchHoverMenu hover panel has `aria-hidden="true"`; PaletteCardGrid container has `role="list"` (or equivalent); Playwright a11y tree snapshot confirms no invalid ARIA. vue-tsc count not raised.

### Lane B — reduced-motion overlay opacity carve-out

The W5 reduced-motion block neutralises every transition globally. Reka-ui Dialog/Sheet/Popover use `[data-state="open"]`/`[data-state="closed"]` to drive transitions — those should keep an opacity fade so AT users can perceive the state change. Per Bδ §2:

```css
@media (prefers-reduced-motion: reduce) {
    /* keep state-change opacity fades on overlay primitives — the fade
     * communicates state without inducing vestibular stress. */
    [data-state="open"],
    [data-state="closed"],
    [data-state="open"]::before,
    [data-state="closed"]::after {
        transition-duration: 150ms !important;
        transition-property: opacity !important;
    }
}
```

Add to `animations.css` after the existing global block.

**Sub-gate B**: `animations.css` carries the carve-out block; Playwright probe with `--emulate-media reduce-motion` opens a Dialog and a Popover and observes an opacity fade (not instantaneous on/off). vue-tsc unchanged.

### Lane C — floating-panel-item + Markdown radius

1. **`floating-panel-item` decision**. Bζ §3 found the class is applied at 7 sites (`PaletteCard.vue` `:181-190`, `CurrentPaletteEditor.vue` `:44-50`) with zero CSS rule anywhere. Choices:
   - **Define locally** — add a `.floating-panel-item` rule in `style.css` (or a new shared utilities file) wiring `:hover` / `:active` / `:focus-visible` / `:disabled` states. Then formally file the glass-ui gap in B's `coordination/Q.md §3` (already filed — note in `audit/B.W1-floating-panel-item.md`). When glass-ui ships, retire the local rule.
   - **Strip the class** from all consumers. The buttons already carry inline Tailwind utilities implementing the four-state contract (W4-states-b.md confirmed). The class adds nothing today.
   
   **Default: strip the class.** The local-define path adds policy (a CSS rule) before its consumers need it (they already work without one); the strip path satisfies precept §4 ("abrogate before patch"). If the orchestrator's review at the wave's start prefers the local-define path for forward-compatibility with glass-ui's eventual ship, the wave switches. The default is strip.

2. **Markdown.vue residual `rounded-2xl`** — 2 sites: a `pre code` block (`@apply ... rounded-2xl ...`) and an `img` (`@apply ... rounded-2xl ...`). Code blocks and images are not role-bearing card/panel/dialog/input surfaces; `rounded-2xl` is acceptable per the W3 conventions doc's "leave on non-surface elements." However, the conventions doc also encourages semantic aliases where applicable. Decision: leave both — code-block and image radii are content-element radii, not surface radii. Update the W3-conventions doc to document the exception explicitly.

**Sub-gate C**: `floating-panel-item` resolved (either defined OR removed from all 7 sites with a grep proof of zero remaining); Markdown residuals documented; W3-conventions doc updated; vue-tsc unchanged.

## File bounds

| Lane | Files |
|---|---|
| A | `SpectrumCanvas.vue`, `SwatchHoverMenu.vue`, `PaletteCardGrid.vue`, `GradientVisualizer.vue` |
| B | `animations.css` |
| C | `PaletteCard.vue`, `CurrentPaletteEditor.vue` (if strip path); OR `style.css` (if define path); `docs/tranches/A/audit/W3-conventions.md` (Markdown exception note) |

Disjoint per file. Lane B and C both touch `animations.css`/`style.css` only if Lane C takes the define path — orchestrator sequences if so.

## Hard gate

1. Playwright probe ×3 viewports, light + dark — no console errors; a11y tree confirms SpectrumCanvas + SwatchHoverMenu + PaletteCardGrid correctness; overlay opacity fades present under `prefers-reduced-motion: reduce`.
2. `grep -rn 'floating-panel-item' demo/` returns zero OR `grep -n '.floating-panel-item' demo/@/styles/` returns the defining rule.
3. `grep -n 'rounded-2xl' demo/@/components/custom/markdown/Markdown.vue` returns the 2 documented residuals only, with an inline comment naming them as exceptions.
4. `vue-tsc` count not raised; `npm test` 1409+ green; smoke suite (if up) green.

## Format and lint cadence

Lint per lane; gate before close.

## Verification artefacts

`audit/B.W1-states-corrections.md` (Lane A — before/after a11y tree), `audit/B.W1-reduced-motion.md` (Lane B), `audit/B.W1-floating-panel-item.md` (Lane C), `audit/B.W1-playwright/` (3-viewport captures).

## Commit plan

3 commits, one per lane, `fix(tranche-b/w1): …`. Plus a docs commit if W3-conventions updated.

## Dependencies

- Depends on: B.W0.
- Blocks: B.W2.
