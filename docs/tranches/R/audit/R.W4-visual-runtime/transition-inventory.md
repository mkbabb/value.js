# R.W4 Lane B / B1 — the transition inventory (gate (a) artifact)

**Captured**: 2026-07-04, on the running demo (dev, branch `tranche-q`), BEFORE the
collapse; the AFTER column records the family every site now keys. The three
families are minted in `demo/@/styles/animations.css` (`vj-enter` · `vj-morph` ·
`vj-celebrate`), each exclusively on system tokens (`--duration-*`, `--ease-*`,
`--spring-*-duration` + `--spring-*`). A consuming site may parameterise only
GEOMETRY via `--vj-*` custom properties (or, for the pane slots, a direct-child
from-state override — geometry only, never curve/duration).

## §1 The BEFORE state — 17 distinct transition grammars on the built demo

| # | Name (pre-collapse) | Site(s) | Was | Family now |
|---|---|---|---|---|
| 1 | `pane-left` | App.vue → PaneSlot (desktop-left + mobile) | slide −110% + rotate −2°, spring-snappy/ease-out | **enter/exit** (`vj-enter`, direct-child geometry override on `.pane-wrapper--left`) |
| 2 | `pane-right` | App.vue → PaneSlot (desktop-right) | slide +110% + rotate 2° | **enter/exit** (`.pane-wrapper--right` override) |
| 3 | `pane-slide` | App.vue CSS only — **DEAD** (no consumer passed the name) | var-direction slide | deleted |
| 4 | `fade` (glass-ui set) | ImageDropZone (placeholder↔preview), AdminUsersPanel (prune result) | 200ms opacity | **morph** (dropzone) · **celebration** (prune beat) |
| 5 | `fade-slide` (glass-ui set) | ImagePaletteExtractor ×2 (viewfinder, result), ExtractPane (card↔bones) | opacity+translateY, spring-smooth | **enter/exit** (reveals) · **morph** (ExtractPane out-in swap) |
| 6 | `pop` (glass-ui set) | MixResultDisplay (result swap), MixPane (result reveal) | scale 0.9 spring-bouncy | **morph** (out-in content swaps) |
| 7 | `eyedropper-fade` | ImageEyedropper overlay | opacity-only 300/200ms | **enter/exit** (`--vj-enter-y: 0`) |
| 8 | `error-pop` | ColorInput parse-error badge | scale 0.85 @ translateY(−50%) | **celebration** (vars on `.error-badge`) |
| 9 | `detent-fade` | SpectrumDetentLabel | opacity-only fast | **enter/exit** (vars pinned to the rest transform → pure fade) |
| 10 | `edit-drawer` | EditDrawer — **DELETED at Lane E (T21/E3, 65ba2c6)**; the row is historical | media-split slide/scale keyframe pair | (site gone — deletion, not a family) |
| 11 | `slug-bar-swap` | PaletteSlugBar | ±4px + scale 0.97 | **morph** (family defaults) |
| 12 | `feedback-slide` | ActionFeedback (saved!/error chip) | opacity + max-height unfurl | **celebration** (collapse/expanded vars) |
| 13 | `swatch-item` (TransitionGroup) | CurrentPaletteEditor, MixSourceSelector, MixResultDisplay | scale 0↔1 + move + absolute-leave | **enter/exit** (the shared `.swatch-row` recipe, utils.css; `vj-enter-move`) |
| 14 | `edit-overlay` | CurrentPaletteEditor edit overlay | scale 0.5 from top-left | **enter/exit** (vars on `.edit-overlay`, overriding the inherited row geometry) |
| 15 | `rename-slide` | PaletteCard inline rename | −0.5rem + max-height unfurl | **morph** (`.rename-morph` vars incl. height morph) |
| 16 | `toggle-icon` | ActionBarLayer mode icon | scale 0.7 out-in | **morph** (`.toggle-btn` vars) |
| 17 | (anonymous utility classes) | BulkActionToolbar | tw utility enter/leave chain | **enter/exit** (family defaults) |

**AFTER: every Vue `<Transition>`/`<TransitionGroup>` in `demo/` keys exactly one
of `vj-enter` / `vj-morph` / `vj-celebrate`** (plus the empty-string suppression
PaneSlot uses pre-`viewManager.ready`, which renders no transition at all).
Verification grep (0 hits outside `demo/@/components/ui/` vendored tree):
`grep -rn '<Transition' demo/@ demo/color-picker --include='*.vue' | grep -v 'vj-\|components/ui/'`.

## §2 The family definitions (the nomenclature U12 asked for)

| Family | Meaning | Enter | Exit |
|---|---|---|---|
| `vj-enter` | a surface ARRIVES/DEPARTS (panes, overlays, drawers, toolbars, list items) | `--spring-smooth-duration`/`--spring-smooth` transform + `--duration-normal`/`--ease-decelerate` opacity | `--duration-fast`/`--ease-accelerate` |
| `vj-morph` | ONE surface, NEW content (in-place swaps; optional height morph) | `--spring-snappy-duration`/`--spring-snappy` | `--duration-fast`/`--ease-accelerate` |
| `vj-celebrate` | a ONE-SHOT feedback beat | `--spring-bouncy-duration`/`--spring-bouncy` | `--duration-fast`/`--ease-accelerate` |

The B3 view-select beat (`vj-settle` keyframe + `.dock-settle`, Dock.vue) and the
pane-swap cross-slide both speak these grammars: settle = morph-family
scale-settle; pane swap = enter/exit with slot geometry.

## §3 Non-`<Transition>` motion, mapped (not re-authored)

| Motion | Site | Family reading | Disposition |
|---|---|---|---|
| `stagger-child-in` | animations.css `.stagger-children` (slider rows) | enter/exit (one-shot entrance cascade, `--duration-normal`/`--ease-standard`) | KEEP (R.W3 Lane E three-beat member) |
| `useHeightTransition` (350/250ms JS) | PaletteCard expand/collapse | morph (height morph, JS-driven) | KEEP — bespoke literal per DESIGN.md §Bespoke literals (preserve-animations) |
| `.action-bar-toggle-slot` 0fr↔1fr | Dock.vue | morph (width morph, tokens already) | KEEP |
| `golden-text-shimmer` 4s, `gold-shimmer` | PaletteCard / admin gold | ambient celebration accent | KEEP (DESIGN.md bespoke row) |
| `swatch-pop 0.65s`, `action-pulse/spin 0.4s`, `crown-appear`, `input-mode-flash`, sparkle | eyedropper/action button/ColorInput | celebration one-shots | KEEP (DESIGN.md bespoke rows) |
| `edit-drawer-in` keyframe | animations.css (consumer `display:none` — dead UI) | — | dies with the T21/E3 EditDrawer delete (Lane E) |
| reka `data-state` choreography (Dialog/Popover/Select/Toast), GlassDock expand/collapse, aurora/goo-blob RAF | producer surfaces | producer-owned | out of demo scope by design (glass-ui owns its choreography; the toast exemption is documented in glass-ui transitions.css) |

## §4 PRM

All three families ride plain transitions → the global `prefers-reduced-motion`
guard (animations.css) neutralises them; the `[data-state]` opacity carve-out is
unchanged; `vj-settle`/`@property --view-hue-shift` sweep are likewise guarded.
