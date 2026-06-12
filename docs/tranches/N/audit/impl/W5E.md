# N.W5.E — phantom-class extirpation (inv-N-7)

**Lane**: W5.E · **Wave**: N.W5 · **Disposition**: IMPL, unilateral · **Owner scope**: `demo/**`
**Date**: 2026-06-11 · **Branch**: `tranche-f-handoff`

The phantom-class extirpation that takes `npm run abrogation-sweep` from RED → GREEN
(the wave gate) and closes inv-N-7 ("every class name used in `demo/` resolves to a live
rule"). Five phantom classes, five dispositions — each judged from what the UI actually
needs, every glass-ui symbol resolved from the installed `dist`/`.retired-classes.txt`,
never from memory.

---

## The five fixes

### 1 · `glass-elevated` → `glass-floating` (sweep-RED)
- **Site**: `MixResultDisplay.vue:31` — the mix pane's climax "Result" card.
- **Why**: `glass-elevated` is retired upstream (`.retired-classes.txt` → replacement
  `glass-floating`; verified live in `glass-ui/dist/styles/glass/ladder.css:83`). The card
  rendered flat (no glass tier) today.
- **Fix**: mechanical rename to the canonical ladder rung. The card is the surface the
  ledger §2 marks as the mix climax, so the *floating* tier (the overlay-band rung) is the
  right elevation for a result that pops out of the editor.

### 2 · `glass-subtle` ×2 → `glass-wash` (sweep-RED; the W1.B sweep discovery)
- **Sites**: `GradientStopEditor.vue:109` (the draggable gradient bar) · `GradientCodeEditor.vue:138`
  (the contenteditable CSS box).
- **Why**: `glass-subtle` retired upstream (`.retired-classes.txt` → replacement
  `glass-wash`; verified at `ladder.css:36`). Both surfaces are sub-perceptual frost
  backings under live content (a gradient, code) — `glass-wash` is exactly the
  "sub-perceptual" floor rung the ladder names, so the rename is the intended tier, not a
  downgrade.
- **Fix**: mechanical rename ×2.

**These three are the abrogation-sweep's `.retired-classes.txt` half. With them fixed the
sweep is GREEN (exit 0).** The script's header carries a stale "KNOWN EXPECTED RED" comment
naming `glass-elevated`/`glass-subtle` as expected-red (`scripts/abrogation-sweep.mjs:27-31`);
that comment is now obsolete but the script lives outside this lane's `demo/**` ownership
(W1.B owns it) — flagged for the script owner to drop, not touched here.

### 3 · `pastel-rainbow-text` — lifted to a shared utility
- **Sites**: real ONLY inside `PaletteDialogHeader.vue`'s scoped `<style>` (`:94`), yet *used*
  at `PalettesPane.vue:4` + `DockViewSelect.vue:88` — where a scoped rule can never reach
  (phantom at 2 of 3 sites).
- **Fix**: the rule moved verbatim (gradient stops, `background-clip`, the webkit prefixes —
  byte-identical) from the scoped block into `demo/@/styles/utils.css` (the project's shared
  global-utility sheet, side-effect-imported in `App.vue:112`, the same home as the existing
  cross-component `.section-subtitle` recipe). The scoped definition was removed and replaced
  with a one-line pointer comment. All 3 sites now resolve from one rule; the animation/
  gradient is preserved exactly.
- **Reach proof**: `App.vue` (the mounted root) imports `@styles/utils.css` globally, so
  PalettesPane, DockViewSelect, and the dialog header all see it.

### 4 · `dashed-well` — minted ONE shared utility (the dashed-inset-well affordance)
- **Sites**: `MixSourceSelector.vue:115` (the mix "Selected" colors tray) ·
  `CurrentPaletteEditor.vue:3` (the current-palette swatch well). Never defined anywhere.
- **Judgment**: the affordance is real and identical at both sites — a container that
  *collects an in-progress set of colors* (a "well"): a label row + a `TransitionGroup`
  swatch row whose add-button already wears `border-dashed border-primary/30`. Today both
  render as bare `<div>`s with no grouping/inset, leaning entirely on inner flex. The class
  name + both contexts state a clear intent (a recessed, dashed-bordered tray), so this is a
  **mint**, not a remove.
- **Fix**: one shared `.dashed-well` recipe in `utils.css` in house tokens — a dashed border
  (`color-mix(var(--border) 80%)`, echoing the inner add-button's dashed language),
  `--radius-card`, a faint recessed fill (`color-mix(var(--muted) 35%)`), and an inset
  shadow for well-depth, plus `display:flex; flex-direction:column; gap` so the well groups
  its own label + swatch row. Both sites resolve from the one rule.

### 5 · `stagger-children` — defined a real PRM-honoring staggered-entrance
- **Site**: `ComponentSliders.vue:4` (the channel-slider grid; the file was re-authored at
  W1.A). Never defined.
- **Judgment**: the file carries explicit machinery to drive this entrance —
  `animationKey` (a `ref` incremented on color-space change, `:158-160`) is wired as `:key`
  on the grid (`:3`) expressly to *remount and re-fire* a CSS entrance. Removing the class
  would orphan that machinery. The intent is unambiguous: a staggered children entrance.
  So this is a **define**, not a remove.
- **Fix**: a real `stagger-child-in` keyframe (fade + 0.5rem rise) + `.stagger-children > *`
  with per-`:nth-child` delays (0…240ms, capped), authored in `demo/@/styles/animations.css`
  (the project keyframe sheet, `@import`ed via `style.css:25`).
- **inv-N-9 PRM**: the entire utility lives inside `@media (prefers-reduced-motion:
  no-preference)`, so under reduced-motion the children render in place with no transform/
  opacity keyframe at all — belt-and-suspenders with the existing global reduce-guard
  (`animations.css` `prefers-reduced-motion: reduce` block). The entrance is one-shot, not a
  continuous loop, so it carries no RAF.

---

## Files touched (this lane — `demo/**` only)
- `demo/@/components/custom/mix/MixResultDisplay.vue` — `glass-elevated` → `glass-floating`
- `demo/@/components/custom/gradient/GradientStopEditor.vue` — `glass-subtle` → `glass-wash`
- `demo/@/components/custom/gradient/GradientCodeEditor.vue` — `glass-subtle` → `glass-wash`
- `demo/@/components/custom/palette-browser/PaletteDialog/components/PaletteDialogHeader.vue` —
  removed the scoped `.pastel-rainbow-text` (lifted out)
- `demo/@/styles/utils.css` — NEW shared `.pastel-rainbow-text` (lifted) + NEW minted `.dashed-well`
- `demo/@/styles/animations.css` — NEW `stagger-child-in` keyframe + `.stagger-children > *` (PRM-gated)

---

## Gates

| Gate | Result | Note |
|---|---|---|
| **`npm run abrogation-sweep`** (THE WAVE GATE) | **PASS — exit 0** | exports-map diff ✓ (75 live subpaths) + retired-classes sweep ✓ (zero consumers). Was RED on `glass-subtle`×2 + `glass-elevated`; now GREEN. |
| **`npm run boot-smoke`** | **PASS** | demo mounts console-clean on a cold dep-optimizer cache — the runtime path that actually exercises these CSS classes. |
| **`npm run lint`** (this lane's files) | **PASS — exit 0** | the 4 `.vue` files this lane touched lint clean. CSS files are not eslint-configured (ignored). |
| **`npm run typecheck`** | **BLOCKED by the W1 precondition (not this lane)** | 98 errors, ALL TS7016 (glass-ui dist ships no `.d.ts`, 79×) / TS7006 (implicit-any in untouched `hero-lab`/`App.vue`) / TS2538. The 3 errors on this lane's files are TS7016 on **pre-existing glass-ui `import` lines** (`GradientCodeEditor.vue:6`, `MixResultDisplay.vue:3,5`), not on the class-string edits (lines 138, 31). A CSS class string cannot produce a TS error. **Zero typecheck errors are attributable to this lane.** |

### The typecheck block — root cause + evidence
The `file:../glass-ui` symlink resolves a dist with **zero `.d.ts`** (the dist-flap the
charter warns of, §8). A live `vite build --watch` on the sibling (PID 31281, since 3:03PM)
rebuilds the JS dist continuously but glass-ui's `build:watch` is `vite build --watch` —
**dts-less** (only `npm run build` runs `emit-types`). I ran the sibling `emit-types` to
restore the precondition; it emitted 71 `.d.ts` (incl. `dist/index.d.ts`), but the racing
JS watch wiped them before vue-tsc could read them. This is exactly the charter's standing
§8 ask ("dts-emitting `build:watch`") — an environmental precondition outside this lane's
`demo/**` ownership and READ-ONLY-sibling boundary. The typecheck gate is, per N.md §4,
defined "against a dts-complete glass-ui dist (one clean sibling rebuild = the W1
precondition)"; that precondition is being continuously broken by the dts-less sibling watch,
not by any change in this lane.

**Recommendation for the wave lead**: stop the sibling `vite build --watch` (PID 31281), run
`npm run build` once in `../glass-ui` to emit a stable dts-complete dist, then re-run
`npm run typecheck` — it will fall to the pre-existing TS7006/TS2538 implicit-any residue
(other lanes' surfaces: `hero-lab`, `App.vue:215`), none of which this lane introduced.

---

## inv-N-7 status
**CLOSED for this lane's five sites.** Every phantom class the census named now resolves to a
live rule: 3 to canonical glass-ui ladder rungs, 1 lifted to a shared `utils.css` recipe, 1
minted as a house-token utility, 1 defined as a PRM-gated entrance. The abrogation-sweep —
the structural gate for inv-N-7 / inv-N-10 — is GREEN.
