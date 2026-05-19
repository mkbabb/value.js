# B.W1 — W5 corrections + layout simplification

**Opens after**: B.W0 close (A is officially closed).
**Lanes**: 4 — A (W5 a11y corrections), B (reduced-motion overlay carve-out), C (floating-panel-item + Markdown residuals), D (layout transposition — Bβ Proposal B). Files are disjoint except `style.css`, which Lane C (define-path only) and Lane D both touch — the orchestrator sequences C→D if so. The orchestrator owns Lane D directly: the user named layout the "contrived/overfit" surface, so the transposition stays in one hand.
**Status**: planned.

> **Hardening note (2026-05-19).** The former standalone layout wave (old B.W2) was a single-lane, orchestrator-owned, 1-commit refactor — wave-inflation, per the hardening audit (`PROGRESS.md`). It is folded here as Lane D. Six waves → five.

## Scope

`research/Bd-w5-audit.md §1-2`, `research/Bz-legacy-cruft.md §3` (Lanes A/B/C); `research/Bb-layout-simplification.md` (Lane D).

### Lane A — W5 a11y corrections

1. **SpectrumCanvas.vue:5-6** — the `role="slider"` is invalid (missing `aria-valuenow`/`aria-valuemin`/`aria-valuemax`); the widget is a 2D saturation×lightness picker, not a linear slider. Fix: replace `role="slider"` with `role="img"` and a reactive `:aria-label` interpolating current saturation and lightness in percent ("Color spectrum, saturation N%, lightness M%").
2. **SwatchHoverMenu.vue:42-43** — the `role="toolbar"` sits on the hover-triggered teleport panel, which is keyboard-inaccessible. Add `aria-hidden="true"` to the hover-path panel; remove `role="toolbar"` + `aria-label`. The reka-ui Popover touch path is the accessible route.
3. **PaletteCardGrid.vue** — add `role="list"` to the grid container so PaletteCard's `role="article"` children sit in a list landmark.
4. **GradientVisualizer.vue** SelectTrigger `aria-label`s — verify each supplements (does not override) the visible label; remove the redundant ones.

**Sub-gate A**: snapshot diff shows SpectrumCanvas no longer `role="slider"`; SwatchHoverMenu hover panel `aria-hidden="true"`; PaletteCardGrid container `role="list"`; a11y tree snapshot confirms no invalid ARIA; vue-tsc not raised.

### Lane B — reduced-motion overlay opacity carve-out

The W5 reduced-motion block neutralises every transition globally. Reka-ui Dialog/Sheet/Popover drive transitions off `[data-state]` — those should keep an opacity fade so AT users perceive the state change. Add to `animations.css` after the global block:

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

**Sub-gate B**: `animations.css` carries the carve-out; Playwright probe with `--emulate-media reduce-motion` opens a Dialog + Popover and observes an opacity fade; vue-tsc unchanged.

### Lane C — floating-panel-item + Markdown radius

1. **`floating-panel-item` — strip (default).** Bζ §3 found the class applied at 7 sites (`PaletteCard.vue:181-190`, `CurrentPaletteEditor.vue:44-50`) with zero CSS rule anywhere. The buttons already carry Tailwind utilities implementing the four-state contract — the class adds nothing. Strip it from all consumers (precept §4, abrogate before patch).

   **Invariant 32 + 33 (precepts `3c32fae`).** Before stripping: a corpus grep for `floating-panel-item` across `demo/`, `src/`, `glass-ui/src/` proves the only references are the 7 callsites and zero CSS rule exists (invariant 33). After stripping: record the retired class name in `audit/B.W1-floating-panel-item.md` — value.js has no `.retired-classes.txt`; the audit doc is the registry-equivalent (invariant 32). The post-strip grep returning zero is the deletion proof.

2. **Markdown.vue residual `rounded-2xl`** — 2 sites (a `pre code` block, an `img`). Code blocks and images are content elements, not surface elements; `rounded-2xl` is acceptable. Leave both; add an inline comment naming them as exceptions; update the W3-conventions doc.

**Sub-gate C**: `floating-panel-item` stripped from all 7 sites (grep proof of zero); the retired class recorded in the audit doc; Markdown residuals documented inline; vue-tsc unchanged.

### Lane D — layout transposition (Bβ Proposal B)

`research/Bb-layout-simplification.md` Proposal B: delete the `--dock-pos` centring formula; flex+fixed layout. The user excluded layout from the hardening overfit set — Proposal B's *content* stands; only its wave home changed.

**Pre-execution decision.** At wave open the orchestrator confirms with the user: Proposal B (default — dock pins at `--dock-inset` across all viewports; content cluster centres via `justify-content: center`; visual delta only at 21:9) vs Proposal A (keep dock-follows-content at 21:9 via `align-self: center`; less deletion). Default Proposal B per the "contrived/overfit" diagnostic + precept "abrogate before patch".

1. `style.css :root` — DELETE `--dock-pos` (the `max(...)` formula) and `--layout-padding` (folds into `.app-layout` `padding`). Keep `--dock-h`, `--dock-total`, `--content-max-h`, `--dock-padding-y`, `--dock-border-width`, `--dock-inset`, `--dock-gap`. Token count 9 → 7. The `--content-max-h` media clamps remain (they cap pane height; they no longer feed back into the dock).
2. `style.css .app-layout` — DELETE `grid-template-rows`, `grid-row`, `align-items`; REPLACE with `display: flex; flex-direction: column; justify-content: center; height: 100dvh; overflow: hidden; padding: var(--dock-total) 1rem 0.5rem;`.
3. `style.css .pane-container` — DELETE `grid-row: 2` and `height: 100%`; KEEP `max-height: var(--content-max-h)`, `margin: 0 auto`, the `pane-container--dual` columns.
4. `Dock.vue:73` — `top-[var(--dock-pos)]` → `top-[var(--dock-inset)]`.
5. `ColorPicker.vue:2` — DELETE `lg:max-h-[var(--content-max-h)]`; the pane-container now constrains height.
6. **`--menu-min-w` inline rationale** (folded from Bα §46, and de-duplicated — this task was double-listed in old W2 and old W3). Two menus deliberately stay wider than `--menu-min-w`: `Dock.vue` view-select `SelectContent min-w-[12rem]`, `GenerateControls.vue` `SelectContent min-w-[14rem]`. Add one inline comment at each: `<!-- B.W1: kept wider than --menu-min-w — long option labels need the space -->`.

**Sub-gate D**: `grep dock-pos|layout-padding style.css` returns nothing (deletion proof); `:root` carries 7 layout tokens; Playwright at 375×667 / 1280×720 / 1280×800 / 2520×1080 light+dark measures dock `top` and `.pane-container` geometry against the W4 baseline — standard viewports show 0 drift, 21:9 shows the documented delta (dock pins at 8px vs floating ~173px), captures to `audit/B.W1-layout/`; `--menu-min-w` exception sites carry the rationale comment.

## File bounds

| Lane | Files |
|---|---|
| A | `SpectrumCanvas.vue`, `SwatchHoverMenu.vue`, `PaletteCardGrid.vue`, `GradientVisualizer.vue` |
| B | `animations.css` |
| C | `PaletteCard.vue`, `CurrentPaletteEditor.vue`, `docs/tranches/A/audit/W3-conventions.md` |
| D | `style.css`, `Dock.vue`, `ColorPicker.vue`, `GenerateControls.vue` |

## Gate

Per the hardened 3-tier model (`B.md §6`): the wave closes on the **conjunction of the four sub-gates A–D plus one Playwright probe**. The probe is the layout-class wave probe — 4 viewports (375×667 / 1280×720 / 1280×800 / 2520×1080) light+dark, 0 console errors, a11y tree clean, layout geometry measured. `vue-tsc` not raised; `npm test` 1409+; smoke suite green (if up). No separately enumerated hard-gate list — the sub-gates are the gate.

## Verification artefacts

`audit/B.W1-a11y.md` (Lane A before/after a11y tree), `audit/B.W1-reduced-motion.md` (Lane B), `audit/B.W1-floating-panel-item.md` (Lane C — retired-class record), `audit/B.W1-layout/` (Lane D — 4-viewport captures + before/after CSS diff + token graph).

## Commit plan

- `fix(tranche-b/w1): W5 a11y corrections — SpectrumCanvas, SwatchHoverMenu, PaletteCardGrid` (Lane A)
- `fix(tranche-b/w1): reduced-motion overlay opacity carve-out` (Lane B)
- `refactor(tranche-b/w1): strip phantom floating-panel-item class` (Lane C) + a docs note if W3-conventions updated
- `refactor(tranche-b/w1): delete --dock-pos centring formula, flex+fixed layout (Bβ Proposal B)` (Lane D)

## Dependencies

- Depends on: B.W0.
- Blocks: B.W2.
