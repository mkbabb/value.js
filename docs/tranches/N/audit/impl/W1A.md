# N.W1.A — The 3 re-aliased glass-ui import fixes (GESTALT)

**Lane:** W1.A · **Branch:** tranche-f-handoff · **Date:** 2026-06-11
**Ownership (3 files only):**
- `demo/@/components/custom/color-picker/controls/ComponentSliders.vue`
- `demo/@/components/custom/mix/MixSourceSelector.vue`
- `demo/@/components/custom/panes/PaneSegmentedControl.vue`

The three cohort-skew imports that boot-fatal / typecheck-red the demo (`abrogation-ledger.md §1`).
Two are mechanical renames; one is the chartered gestalt re-think (the carousel exits the
consumer). All three are now typecheck-clean and lint-clean.

---

## Precondition verified first

The local `file:../glass-ui` dist is **dts-complete** — `find dist -name '*.d.ts' | wc -l` = **551**
(71 at the top level). This is the W1 precondition the §1 thesis names (74 of the HEAD-91
typecheck errors were the *absence* of this dist). My fix is measured against this real dist.

Real APIs resolved from the d.ts (not memory):
- `node_modules/@mkbabb/glass-ui/dist/carousel.d.ts` exports `Carousel`/`CarouselItem` (and 7
  siblings) — **`./glass-carousel` subpath and `GlassCarousel`/`GlassCarouselItem` symbols do not
  exist** in the exports map (`package.json#exports['./glass-carousel']` === `undefined`).
- `node_modules/@mkbabb/glass-ui/dist/components/custom/tabs/SegmentedTabs.vue.d.ts`:
  `SegmentedTabsProps` = `{ options: SegmentedTabOption[]; variant?: "segmented"|"pill"|"underline";
  multiSelect?; overflow?; responsive?; class? }`, model `modelValue: string | string[]`, emit
  `"update:modelValue": (value: string | string[]) => any`. The `./tabs` subpath re-exports
  `SegmentedTabs` (the upstream rename of `BouncyTabs`). `variant="pill"` is honored.

## Baseline (before)

`npm run typecheck` grep for the 3 files:
```
ComponentSliders.vue(117,50): error TS2307: Cannot find module '@mkbabb/glass-ui/glass-carousel' …
MixSourceSelector.vue(4,10):   error TS2305: Module '"@mkbabb/glass-ui/tabs"' has no exported member 'BouncyTabs'.
PaneSegmentedControl.vue(18,10): error TS2305: Module '"@mkbabb/glass-ui/tabs"' has no exported member 'BouncyTabs'.
```

---

## What I did

### 1. `ComponentSliders.vue` — the boot-fatal carousel → gestalt `role="tablist"` rail

`GlassCarousel`/`GlassCarouselItem` from `@mkbabb/glass-ui/glass-carousel` **never existed in any
published glass-ui** (V1/C1). The label rail it rendered is the picker's primary navigational
affordance — a *static 3–5 item vertical column* of per-channel letters (L/A/B/…). Per the C1
audit (P0-2, P1-1), the carousel was a **category error**: an embla horizontal-swipe carousel has
no vertical letter-rail-with-active-item semantics. The chartered fix is **gestalt, not a rename**:
the carousel primitive exits the consumer; the rail becomes a semantic tablist.

Implementation:
- Container `<div role="tablist" aria-orientation="vertical" aria-label="Color channels">`, a flex
  column (`flex flex-col items-center justify-around`), keeping the original
  `gridRow: 1 / N+1` / `gridColumn: 1` placement and `self-stretch` so the visual layout is
  unchanged.
- Each item is a native `<button role="tab">` with `:aria-selected="activeComponent === component"`
  and a **roving tabindex** (`railTabIndex()` — the selected channel, or the first when none is
  selected, is the single tab-stop; the rest are `-1`). This is the WAI-ARIA tablist idiom.
- **Arrow-key navigation** (`onRailKeydown`): ArrowUp/Down (and Left/Right) move along the vertical
  rail with wrap; Home/End jump to the ends. Selection follows focus — it calls the existing
  `scrollToSlider()` (which sets `activeComponent` + smooth-scrolls the slider into view) and moves
  DOM focus to the next item. Item refs are collected into `railItemEls` for `.focus()`.
- **Visual language preserved**: the same `font-display text-subheading italic` letters, the same
  `labelColor(component)` live-channel color via `:style`, the same Tooltip wrapping (description +
  range). The previously-dead `:active` prop (a no-op since the symbols never resolved) is now a
  *real* highlight via `[aria-selected="true"]`.
- **New rail CSS** in the existing unscoped `<style>` (cohesive with the touch-gate cluster),
  fully **tokenized** — `--radius-pill`, `--duration-normal`/`--duration-fast`, `--ease-standard`
  (all verified defined in glass-ui's `styles/tokens/scheme-motion.css` + `theme/radius.css` and
  already imported). Hover lift (`scale(1.08)` + opacity), active-channel highlight
  (`color-mix(foreground 8%)` chip + full opacity), and a `:focus-visible` outline ring. No CSS
  animation was deleted — the rail gains a tokenized transition (`feedback_preserve_animations`).
- Removed the dead import line (`import { GlassCarousel, GlassCarouselItem } …`).

**Not touched (explicitly out of my lane):** the `stagger-children` phantom class on the wrapper
(`:4`) and its `animationKey` re-trigger apparatus are the disposition of **N.W5.E**
(`abrogation-ledger.md §2`), not W1.A — left verbatim.

### 2 + 3. `MixSourceSelector.vue` + `PaneSegmentedControl.vue` — `BouncyTabs` → `SegmentedTabs`

Per the C3 audit and verified against `SegmentedTabs.vue.d.ts`, the props are unchanged with
`variant="pill"` — `:options`, `:model-value`, `@update:model-value` all match. Both sites: import
renamed `BouncyTabs` → `SegmentedTabs`, template element renamed.

One **idiomatic adaptation** the d.ts forced (and the brief anticipated — "adapt idiomatically if
the API moved further"): `SegmentedTabs` emits `update:modelValue` as `string | string[]` (it
subsumes the multi-select ToggleGroup surface). The two consumers are single-select:
- `MixSourceSelector.onTabChange` was `(value: string)` — widened to `(value: string | string[])`,
  guards `Array.isArray`, then narrows by literal check `next === "colors" || next === "palettes"`
  before emitting. This **also retired an `as` cast** (`value as "colors" | "palettes"`) — the
  literal-narrowing satisfies the emit param type cleanly.
- `PaneSegmentedControl` inline handler dropped its `(v: string)` annotation so `v` infers as the
  emit's `string | string[]`; `Number(v)` already coerces the single-select string. No cast added
  beyond the pre-existing `as 0 | 1` (unchanged).

No `as any`, no `as unknown as`, no legacy shim, no workaround. Idiomatic gestalt.

---

## Files touched

| File | Change |
|---|---|
| `demo/@/components/custom/color-picker/controls/ComponentSliders.vue` | carousel → `role="tablist"` rail (template + roving-tabindex/arrow-key script + tokenized rail CSS); dead import removed |
| `demo/@/components/custom/mix/MixSourceSelector.vue` | `BouncyTabs`→`SegmentedTabs` (import + element); `onTabChange` widened to the union + literal-narrow (retired an `as` cast) |
| `demo/@/components/custom/panes/PaneSegmentedControl.vue` | `BouncyTabs`→`SegmentedTabs` (import + element); inline handler param inference for the union |

---

## Gates run + observed output

**`npm run typecheck`** — grep for the 3 files after the fix: **empty** (0 errors in all three).
Full run total:
```
✓ value.js typecheck: 0 errors (lib + demo).
```
`npm run typecheck 2>&1 | grep -cE 'error TS'` → **0** (down from the audit's 91; the boot-fatal
import chain cleared + the dts-complete dist resolves the TS7016 cohort).

**`npm run lint`** (`eslint . --max-warnings=0`):
```
> @mkbabb/value.js@0.11.2 lint
> eslint . --max-warnings=0
```
**exit 0.**

---

## Notes for the lead / downstream W1 lanes

- I did **not** run the full e2e suite (that is W1.D's green-baseline gate, and it needs the
  W1.B/W1.C boot-smoke + mechanism-C remainder to be a meaningful run). My change is the JS-layer
  half of the C1-named double-fatal; the CSS-layer fatal C1 also notes (`segmented-tabs.css`
  ENOENT in some dist vintages) is a glass-ui *packaging* concern — **not present in this
  551-d.ts dist** (typecheck + the import resolution are clean against it). If a cold-cache
  boot-smoke (W1.B) surfaces a CSS `@import` ENOENT, it is upstream/dist-flap, not this lane.
- The `stagger-children` + `dashed-well` phantom classes visible in my owned files are **W5.E**;
  left untouched by charter.
- No git commit/push performed (the lead integrates).
