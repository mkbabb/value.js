# D.W4 — Styling + design-idiom catalog

**Opens after**: D.W3 close.
**Lanes**: 2 — A (Tailwind utility surfacing + style.css colocation + small drift reconciliations), B (`demo/DESIGN.md` catalog expansion). Disjoint and run in parallel.
**Status**: planned.

Source: `research/Df-styling.md`. **Binding constraint**: changes must be "perfectly isomorphic" to rendered output unless HIGHLY befitting otherwise (per the D-opening directive). This is non-destructive token surfacing + a catalog expansion, not a redesign.

## Scope

### Lane A — Tailwind utility surfacing + style.css colocation + drift reconciliations

1. **Surface ~43 arbitrary `[var(--…)]` reaches as Tailwind utilities** (`research/Df-styling.md §1` lists 10 z-tier + 14 duration + 8 radius + 11 layout). Add them to `tailwind.config.*` (theme extension) or via `@utility` in `style.css`/`utils.css` — whichever is idiomatic for the v4 setup. After: writing `z-dock` is equivalent to `z-[var(--z-dock)]` etc. Replace the 43 callsites mechanically. The rendered output is byte-identical (the utilities compile to the same `var(--…)` reference).
2. **De-duplicate magic-literal brackets** — `research/Df-styling.md §1` lists `min-h-[120px]` ×3, `max-w-[200px]` ×2, `max-h-[300px]` etc. Each: either point at an existing token (if one exists at the same value) or introduce a small token (if multiple callsites share it). Stop ad-hoc duplicates.
3. **style.css colocation** — `research/Df-styling.md §7` named 4 candidates for component-scoped colocation: `.pane-scroll-fade`, the touch-gate cluster, `.palette-tab-content`, `.palette-card-grid`. Move each into its component's `<style scoped>` (or a colocated `.css`). After: `style.css` line count drops ~40.
4. **Fragile coupling** — `research/Df-styling.md §2` names the `.pane-container` max-width ↔ `.app-layout` 1rem horizontal padding silent coupling. Either name it explicitly in a comment (recording it) or break it with a token.
5. **Minor cohesion drift** — `research/Df-styling.md §8`: 3 mono stacks (consolidate to one `--font-mono` reference), hero-lab literal `999px` (route through a token), the redundant `, monospace` fallback (drop).
6. **Brittle selectors** — `research/Df-styling.md §5`: replace `:deep(svg)` (`PaletteCard.vue`) and `button:has(> .lucide-x)` (`PaletteDialog.vue`) with role/label or `data-*` selectors.

**Sub-gate A**: `grep -rn '\[var(--' demo/@/components demo/color-picker | wc -l` ≤ 5 (the truly-bespoke residuals, each with an inline rationale); `wc -l demo/@/styles/style.css` shows ≈ -40 lines vs the post-W3 baseline; the 4 colocation candidates live in their components; `grep -rn ':deep(svg)\|:has(>' demo/@/components` returns zero; Playwright visual probe at 3 viewports light+dark — pixel-drift ≤ 1% (or every drift is documented and accepted).

### Lane B — `demo/DESIGN.md` catalog expansion

The user's directive: "Ensure that we're using idiomatic tailwind applies for style, animations, colors: we should have a localized area that defines all of our design idioms — but still leverages proper colocation."

`research/Df-styling.md §6` settled the verdict: **expand `demo/DESIGN.md` to a ~150-LOC catalog**, do NOT add a new `design-idioms.css` (a parallel CSS file would create the cascade-order split-brain glass-ui's §Token Architecture warns against). Tokens stay in `style.css :root` and the glass-ui-published tokens; recipes stay colocated in components; the catalog is the MISSING DOCUMENT — a narrative + reference map of "the design idioms" the project actually uses.

The catalog (sketch — finalize at wave open):

- **§ Token architecture**: where tokens live (glass-ui-published vs `style.css :root` overrides), the override rationale (the cartoon shadow rung; the mono Select font; etc.).
- **§ Type scale**: φ-based (Fraunces display / Inter body / Fira mono); link to the glass-ui type utilities; document the W3 exception (the `ColorComponentDisplay` large numeric readout).
- **§ Surfaces**: the Card tier API (resting / wash / cartoon); the glass surfaces (`.glass-floating`, `.input-bar`); when to use which.
- **§ Shadows**: one cartoon language (`--shadow-cartoon`, `--shadow-cartoon-hover`); how dark mode lightens it; the pop-art aesthetic.
- **§ Radii**: role-bearing (`--radius-card`, `--radius-input`); content-element exception (Markdown `pre`/`img`).
- **§ Motion**: glass-ui's named easings (`--ease-standard`, `--spring-snappy`); the reduced-motion overlay carve-out (B.W1).
- **§ Z-tier**: glass-ui's tokens (`--z-dock`, `--z-popover`, `--z-bar`); zero numeric hard-codes survive.
- **§ Color**: OKLab-driven; the harmony patterns; the `--color-gold` accent rationale.
- **§ Layout**: the post-B.W1 flex-fixed dock (Bβ Proposal B); the `--dock-inset` pin; the `--content-max-h` cap.
- **§ Idioms NOT used**: explicit anti-patterns — no `:deep()` for shadcn internals, no numeric `z-[NN]` literals, no `100vh` (use `100dvh`), no hand-rolled Alert (use glass-ui's via the `ui/alert` re-export).

**Sub-gate B**: `demo/DESIGN.md` carries the catalog (~150 lines, the 10 sections above); the catalog cross-references the actual `style.css :root` tokens + glass-ui's published surface; consumers (component authors) can read the catalog and write idiomatic code without grep-archaeology.

## File bounds

| Lane | Files |
|---|---|
| A | `tailwind.config.*` (or `style.css`/`utils.css` `@utility`), the 43 callsite SFCs across `demo/@/components/custom/**` and `demo/color-picker/**`, `style.css` (the 4 colocation candidates' removal), the 4 receiving components' `<style scoped>` blocks, `PaletteCard.vue` (brittle selector), `PaletteDialog.vue` (or its split — brittle selector), 3 mono-stack consolidation sites, hero-lab's `999px` site |
| B | `demo/DESIGN.md` |

## Gate

The conjunction of sub-gates A + B + a 3-viewport-light Playwright probe with a pixel-diff against the post-D.W3 baseline. `vue-tsc` 126 (CSS edits don't move types); `vitest` 1409; smoke 3/3.

## Verification artefacts

`audit/D.W4-utility-surfacing.md` (Lane A — the 43 callsite migration, the colocation moves, the brittle-selector fixes, the pixel-diff report), `audit/D.W4-design-idioms.md` (Lane B — the catalog's narrative-vs-source-of-truth cross-walk).

## Commit plan

- `refactor(demo/w4): surface 43 arbitrary token-reaches as Tailwind utilities; colocate 4 style.css blocks; fix brittle selectors` — Lane A.
- `docs(demo/w4): expand DESIGN.md into the design-idiom catalog` — Lane B.

## Dependencies

- Depends on: D.W3 (the PaletteDialog split changed CSS scope; surfacing happens after).
- Blocks: D.W5 (no hard block; e2e probe is independent).
