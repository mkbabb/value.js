# Bβ — Layout simplification

**Lane Bβ — `style.css` layout chain audit.** Read-only, 2026-05-18.
**The user's charge**: "These items, like for the dock sizing, layout, seem contrived, overfit, and over-engineered."

## §1 — Current token graph

```
--size-icon-btn  --dock-padding-y  --dock-border-width
           \         |             /
            \--- --dock-h (calc)
                    |
--dock-inset  --dock-gap
       \      |      /
        --dock-total (calc) ──────────→ .app-layout grid row 1
              |
        --content-max-h
              │  (mobile: calc from 100dvh; desktop+21:9: independent clamp)
              ├──→ .pane-container max-height
              ├──→ ColorPicker.vue max-h
              ↓  ← THE FOLD-BACK EDGE
        --dock-pos = max(--dock-inset, (100dvh - --content-max-h)/2 - --dock-h - --dock-gap)
              ↓
        Dock.vue top
```

**Active tokens**: 9. **Surviving magic literals**: 3 (`--content-max-h` clamp constants `34rem,52rem,86dvh`, `30rem,38rem,62dvh`, and the `+ 0.5rem` mobile clearance). **Media-query overrides on `--content-max-h`**: 2 (desktop `≥1024px`, ultra-wide `21:9`). **Fold-back dependency**: 1 (`--content-max-h → --dock-pos`).

## §2 — Numerical behaviour

| Viewport | `--dock-total` | `--content-max-h` | `--dock-pos` | `.pane-container` top |
|---|---|---|---|---|
| 1280×800 (desktop) | ≈71px | `clamp(34rem,86dvh,52rem)` = 688px | max(8, -7) = **8px** | 71px |
| 2520×1080 (21:9) | ≈71px | `clamp(30rem,62dvh,38rem)` = 608px | max(8, 173) = **173px** | 71px |
| 375×667 (mobile) | ≈87px | `100dvh - --dock-total - 32px` = 548px | max(16, -12.5) = **16px** | ~91px |

The 21:9 dock floats at 173px **inside** the pane-container's vertical span (71–679px). The visual non-overlap arises only because the pane-wrapper uses `justify-center` on its flex column — content centres at ≈375px, dock at 173px sits in the empty upper half. If `justify-center` were removed, the dock would collide with content. The current geometry is correct by coincidence between two independent layout mechanisms.

## §3 — The dock-pos centring: bug or design?

The W2 PROGRESS deviation entry calls it "a deliberate ultra-wide layout." The 21:9 screenshot `audit/W2-playwright/baseline-old-21x9.png` shows the dock pill above the centred content cluster — visually intentional. **The centring is a real design choice.** What is contrived is the implementation: two independent layout mechanisms (grid clearance row vs `dock-pos` centring formula) accidentally producing the right visual result. Either mechanism alone would work; both together create the fold-back.

## §4 — Two proposals

### Proposal A — preserve centring, break the fold-back

Keep dock visually following the centred content cluster at 21:9. Replace the `--dock-pos = max(...)` derivation with CSS layout (`align-self: center` on `.pane-container`). The dock pins at `--dock-inset`; the content centres in the `1fr` row; the dock visually aligns with the top of centred content because the centred content's top is approximately `--dock-inset + --dock-h + --dock-gap` away from the viewport top at ultra-wide aspects.

```css
:root {
    /* dock geometry — pure footprint, no content dependency */
    --dock-h: calc(var(--size-icon-btn) + var(--dock-padding-y) + var(--dock-border-width));
    --dock-total: calc(var(--dock-inset) + var(--dock-h) + var(--dock-gap));
    --dock-pos: var(--dock-inset);

    /* content sizing — leaf, no dock dependency feedback */
    --content-max-h: calc(100dvh - var(--dock-total) - 1rem);
}
@media (min-width: 1024px) { --content-max-h: clamp(34rem, 86dvh, 52rem); --dock-inset: 0.5rem; --dock-gap: 0.5rem; }
@media (min-aspect-ratio: 21/9) { --content-max-h: clamp(30rem, 62dvh, 38rem); }

.app-layout {
    display: grid;
    grid-template-rows: var(--dock-total) 1fr;
    height: 100dvh; overflow: hidden;
    padding: 0 1rem 0.5rem;
}
.pane-container {
    grid-row: 2;
    align-self: center;            /* the centring is now here, idiomatic */
    max-height: var(--content-max-h);
    /* … rest unchanged */
}
```

**Deletions**: the `max()` wrapper, the 7-token centring formula, the fold-back edge, the `--layout-padding` token, the `+ 0.5rem` mobile magic. **Visual delta**: 21:9 dock pins at `--dock-inset` (8px) instead of 173px; content cluster still vertically centred via `align-self: center` (no longer aligned with the dock).

### Proposal B — flex + fixed, delete `--dock-pos` entirely (maximum deletion)

The dock is `position: fixed`. The two-row grid exists only to push content below it. A flex parent with `padding-top: var(--dock-total)` and `justify-content: center` achieves the same visual centring with less state.

```css
.app-layout {
    display: flex; flex-direction: column;
    justify-content: center;
    height: 100dvh; overflow: hidden;
    padding: var(--dock-total) 1rem 0.5rem;
}
.pane-container {
    max-height: var(--content-max-h);
    margin: 0 auto;
}
```

Dock.vue: `top-[var(--dock-pos)]` → `top-[var(--dock-inset)]` (or just `top-2`).

**Deletions**:
- `--dock-pos` token entirely
- `grid-template-rows` declarations (both)
- `.app-layout align-items: stretch/start` overrides
- `grid-row: 2` and `height: 100%` on `.pane-container`
- `--layout-padding` token
- ColorPicker.vue `max-h-[var(--content-max-h)]` line (the pane-container constrains)
- The mobile `+ 0.5rem` magic literal

≈15 CSS lines, 1 active token deleted.

## §5 — `.pane-wrapper--ghost` question

The comment says "preserve scroll-timeline state." The actual reason is **KeepAlive scroll-position preservation** — the right pane stays mounted (even when invisible) so its scroll position survives view switches. `--pane-scroll` itself doesn't need a hidden element to "preserve state"; it's a named timeline scoped to its declaring element.

Recommendation: keep the `.pane-wrapper--ghost` pattern (the implementation is correct), but **fix the comment**: "preserve KeepAlive scroll position across single-pane views." Not legacy code — just a wrong-rationale comment.

## §6 — Recommendation

**Adopt Proposal B** if the 21:9 design accepts a top-pinned dock. Otherwise Proposal A. The user's directive ("contrived/overfit/over-engineered") and the precept ("architectural transposition wins") both favour Proposal B.

| | Current | Proposal A | Proposal B |
|---|---|---|---|
| Active tokens | 9 | 8 | 7 |
| Magic literals | 3 | 1 | 1 |
| Fold-back edges | 1 | 0 | 0 |
| 21:9 dock position | 173px | 8px | 8px |
| Visual delta @ 1280×800 | baseline | 0 | 0 |
| Lines deleted | — | ≈8 | ≈15 |

The visual delta at 21:9 is the only cost. If retaining the dock-follows-content design at 21:9 is a hard requirement, Proposal A delivers it idiomatically (via CSS layout, not a token derivation). If the dock can pin at the top across all viewports, Proposal B is the cleanest.

**B.W2 wave-spec authority**: Proposal B by default; record-and-confirm with the user at wave open before executing.

## §7 — Evidence

- `style.css:58-91` — token block
- `style.css:105-133` — `.app-layout` + `.pane-container`
- `style.css:213-216` — `.pane-scroll-fade scroll-timeline`
- `Dock.vue:73` — `top-[var(--dock-pos)]`
- `ColorPicker.vue:2` — `max-h-[var(--content-max-h)]`
- `App.vue:56-69` (template), `:250-257` (style) — ghost pane
- `PaneHeader.vue:23,29,39` — `animation-timeline: --pane-scroll`
- `PROGRESS.md:125` — W2 deviation entry with measured 173 vs 8
- `audit/W2-playwright/baseline-old-21x9.png` — visual evidence at 21:9
