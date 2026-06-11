# N — glass-ui abrogation / re-alias ledger (+ the standing refactoring path)

Every glass-ui surface the demo consumes that has been **re-aliased** (renamed/moved) or
**abrogated** (retired/stripped) upstream, with its migration disposition — and the standing
protocol that makes the *next* rename non-silent. Census tree-verified 2026-06-11 at HEAD
`fa1a934` (sources: V1/V5/V4, C1/C3/C7, E1, C10 in `lanes/`).

## §1 — Re-aliased imports (break typecheck/boot TODAY)

| Old (demo uses) | New (glass-ui ships) | Demo sites | Disposition |
|---|---|---|---|
| `@mkbabb/glass-ui/glass-carousel` → `{GlassCarousel, GlassCarouselItem}` | `./carousel` → `{Carousel, CarouselItem}` — the old subpath **never existed in any published version** | `ComponentSliders.vue:7,16,23,31,117` (eager via `ColorPicker.vue` → boot-fatal) | **N.W1.A — gestalt, not rename**: the label rail is a static 3–5 item column → `role="tablist"` flex column; the carousel primitive exits the consumer entirely (C1) |
| `BouncyTabs` from `./tabs` | `SegmentedTabs` (same `./tabs`; `variant="pill"` + props unchanged → pure rename, C3) | `MixSourceSelector.vue:4,100` · `PaneSegmentedControl.vue:6,18` | **N.W1.A** — mechanical rename |

## §2 — Abrogated classes + tokens (silent no-ops — the P9 failure mode)

| Class | Status upstream | Demo sites | Disposition |
|---|---|---|---|
| `glass-elevated` | **retired** (`glass-ui/.retired-classes.txt:28`, gone from dist) | `MixResultDisplay.vue:31` — the mix pane's climax card renders flat | **N.W5.E** → `glass-floating` |
| `dashed-well` | never defined anywhere (demo, glass-ui src, dist) | `MixSourceSelector.vue:111`, `CurrentPaletteEditor.vue:3` | **N.W5.E** — mint one shared utility or remove |
| `pastel-rainbow-text` | real only inside `PaletteDialogHeader.vue:94` scoped style | 3 use sites; phantom at `PalettesPane.vue:4`, `DockViewSelect.vue:88` | **N.W5.E** — lift to a shared utility |
| `stagger-children` | never defined | `ComponentSliders.vue:4` | **N.W5.E** — define or remove |
| (`gold-shimmer`) | **NOT abrogated** — live at glass-ui `base.css:335` (V5 refuted the claim) | dock admin pill | no action |

## §3 — Whole-component / seam abrogations (the W5 consume set)

| Surface | Upstream state | Demo state | Disposition |
|---|---|---|---|
| goo-blob fork (1,270 LoC, flat-HSV) | `./goo-blob` ships the OKLCh superset | 12 bespoke blob/watercolor import sites | **N.W5.A** — delete fork + `webgl-utils.ts`, consume |
| `BlobConfig` flat 30-key shape | **3 keys abrogated** (`orbitSpeedScale`/`wobbleScale`/`mergeRate` → MoodParams-only); 8-atom nested config | `BlobPane.vue:73-75` + flat slider model | **N.W5.A** — BlobPane is a **re-author**, not a re-point (V4) |
| `ColorResolver` DI seam | **STRIPPED** at W-BLOB3 (`consumer-evidence/goo-blob.md:40-72`) | the C8-era seam framing is stale | **N.W5.A** — color via `:color` prop + `config.color.paletteStops` |
| watercolor-dot fork | `./watercolor-dot` superset (per-instance filter, PRM-gated) | SVG fork + global `#watercolor-filter` | **N.W5.C** |
| `useLayerTransition` "Local fork" | `/dock` ships the SpringProgress version; **`layerProps()` helper absent upstream**; mechanism delta CSS-width → spring ODE | `ActionBarLayer.vue:9` (1 importer, ~108 LoC fork) | **N.W5.D** — adopt + ~12-LoC `layerProps` adapter at the consumer; behavior delta documented |
| `dock-separator` raw divs | `DockSeparator` component shipped (CSS still defined → soft debt, not a break) | 13 refs | **N.W5.D** |
| `DEFAULT_AURORA_CONFIG`-only aurora | `deriveAurora` shipped (3.2.0+, published 3.12.0) | `App.vue:212` static; `AuroraPane.vue` stub | **N.W5.B** |
| `development` export condition (the mechanism-A era) | abrogated constellation-wide | deleted at 0.11.1 ✓; band-aids remain | **N.W1.C** (remainder) |
| reka-ui `^2.0.0` declaration | glass-ui peers `^2.9.7` | lockfile pins 2.9.9; declaration stale | **N.W1.C** |
| 3.12.0+ transitive peers | `pencil-boil ^0.4.1`, `perfect-freehand ^1.2.3` added | absent from value.js | **N.W9.A** (at the `^3.13.0` pin) |

## §4 — Why these went silent (the mechanism), and the standing protocol

**Mechanism**: the `file:../glass-ui` symlink resolves a mid-tranche dist that ships **no
`.d.ts`** → TS7016 types everything `any` → renames produce no TS2305; the vite dep-optimizer
warm cache masks the runtime break (warm server renders, clean server dies); retired *classes*
never error at all. Three independent silencers — typecheck, runtime, CSS — all defeated.

**The standing abrogation sweep** (run on EVERY glass-ui pin/dist move; this is the refactoring
path, structural per inv-N-10):

1. **Exports-map diff** — diff old vs new `package.json#exports` (+ top-level export names from
   the d.ts barrel); any removed/renamed subpath or symbol → a migration row in this ledger
   *before* the bump lands.
2. **Retired-classes sweep** — grep glass-ui's `.retired-classes.txt` (the upstream abrogation
   manifest, 35 entries) against `demo/` class usage → 0 hits required.
3. **Typecheck against the fresh d.ts** — blocking; meaningful only with a dts-complete dist
   (the W1 precondition; 74 of the 91 HEAD errors are its absence).
4. **CI boot-smoke** — headless mount + console-clean on a **cold** dep-optimizer cache
   (`--force`), so the warm-cache mask can't hide a dead import.
5. **e2e baseline** — the existing 5-project suite.

Steps 3–5 are the inv-N-1 gates; steps 1–2 are the sweep N.W1.B adds beside the boot-smoke
(a small script or checklist run at pin-bump — judgment + grep, no proof-script idiom).
**glass-ui-owned ask (§8)**: keep `.retired-classes.txt` current at every cut and note
subpath/symbol renames in the cut's changelog — the manifest is the contract this sweep reads.

## §5 — Disposition summary

Every known re-alias/abrogation is dispositioned: **W1.A** (the 2 boot/typecheck breaks, one
gestalt), **W1.C** (mechanism remainder + reka), **W5.A–E** (the consume set + phantom classes),
**W9.A** (pin + transitive peers). The *future* path is the §4 sweep, gated by inv-N-1 and
inv-N-10. Zero un-dispositioned rows.
