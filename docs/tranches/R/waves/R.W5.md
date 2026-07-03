# R.W5 — OBSERVATORY (hero-lab · the amended treatment IS the spec · the interpolation-PATH signature, never the gamut half · slippable to S per Q1)

**Name**: W5 — Observatory (hero-lab)
**Spec of record**: `docs/frontend-design/hero-lab.md` (committed at R.W0 item W0-1), **as amended by one binding clause** (`SYNTHESIS-v2.md §2.2`): **the picker owns the gamut BOUNDARY; hero-lab owns the interpolation PATH** — the sRGB grey-death vs the oklch arc, the flip-toggle where you watch the grey die. Complementary halves of one thesis; two pages must not both claim the perceptual-truth reveal. The treatment carries the design mass (Perceptual Observatory direction, audit §1–§8, refinements, the proof-toggle moment, verdict reconciliation, implementation plan 1–7). **This wave doc ORCHESTRATES — sequencing, gate, boundaries — it does not re-author design prose.**
**Opens after**: R.W3 (parallel with R.W4; `SYNTHESIS-v2.md §3.2`). Build-substrate dependency on R.W2: `npm run build:hero-lab` reaches `✓ built` only after the Tabs→SegmentedTabs migration (the 4.2.0 drift killed both demo builds at LINK phase — `boot-blast-radius.md §4`).
**Placement — Q1, speced at the recommended default: in-R as the slippable W5.** Nothing depends on it (R.W7 requires W4 + W6, *+ W5 only if not slipped*); it slips to S free at any point with no dependency break. **Q1 — ratify or flip.**
**Discipline**: Fable design lane under the frontend-design skill; dark-only instrument register per the treatment.
**Status**: SPECED (tranche development).

---

## §Charter

One wave lifts hero-lab from competent doc-site furniture to the fleet's second thesis page: the fonts actually load (the single highest-leverage fix in the treatment), the grey-on-grey wash becomes a breathing oklch mesh over the kept graphite base, the PAPER graticule goes structural, the crayon primaries earn their one calibration home, and the `sRGB ↔ oklch` proof-toggle — the interpolation-path half of the perceptual-truth thesis — becomes the page's unforgettable moment.

## §Goal criterion

R.W5 succeeds when hero-lab is the Perceptual Observatory the treatment specifies: a night instrument whose own chrome dogfoods the engine — and when flipping the interpolation toggle makes the field visibly lose its blood in under a second, proving the library's thesis with zero copy. Completion is the §Hard gate; a wave that lands the mesh but still ships system-font Times has failed its keystone and cannot close green.

---

## §Sequencing (priority order = the treatment's implementation plan; font-load FIRST is load-bearing)

```
1 font-load fix  →  2 mesh + paper + grain background system  →  3 copy/structure + toggle + crayon datum
                                                               →  4 layout + type push
                                                               →  5 entrance orchestration
                                                               →  6 micro-interactions
                                                               →  7 (optional) perceptual swatch math
```

Item 1 precedes everything — every type decision is invisible while the page ships Times/Courier (the R.W3 Lane-A lesson, replayed on the sub-app). Items 3–6 are file-separable after 2.

---

## §Items (each row = the treatment's implementation-plan step; the treatment section is the binding text)

| # | Item | Anchors | Treatment § |
|---|---|---|---|
| 1 | **Font-load fix FIRST**: add the non-render-blocking font `<link>`s (Fraunces with opsz/SOFT/WONK axes + Fira Code) to the sub-app's head — today the file loads NO font link and `--font-display`/`--font-mono` resolve to bare `serif`/`monospace` | `demo/hero-lab/index.html` (23 lines, no `<link>`); the sibling pattern at `demo/color-picker/index.html:12-18` | TYPOGRAPHY-1; audit §2 — *highest leverage, ~5 lines* |
| 2 | **Grey wash → oklch mesh — a promotion, not a demolition**: the graphite/`--muted` base KEPT as the deep substrate; the two timid grey radials re-authored as the 3-blob `oklch()` mesh on an animated `@property --mesh-hue`; both `--mesh-srgb-*`/`--mesh-oklch-*` token sets authored (the toggle's two honest inputs); grain + vignette; PRM/no-`@property` fallback = a static oklch mesh, **never the grey wash** | `demo/hero-lab/hero-lab.css:4-8` (the sRGB grey-on-grey wash — audit §1's cardinal sin); local `:root` tokens per the treatment | COLOR-1; BACKGROUND; audit §1 |
| 3 | **PAPER graticule kept structural**: the two-tier graph-paper ruling drawn *over* the mesh (ink-on-lit-paper), major lines aligned to the layout gutters — the PAPER pillar co-equal in the layer stack, not buried | layer order per treatment BACKGROUND (base → mesh → ruling → ticks → grain → glass) | SPATIAL-4; verdict: PAPER amplified |
| 4 | **Crayon-datum calibration ticks**: the literal crayon primaries at `0°/120°/240°` on the hue-dial degree scale — the fixed sRGB ruler the perceptually-spaced mesh is measured against; sourced from the fleet's `--rainbow-*`/`--accent-red` tokens; the one place pure sRGB belongs on the page | kicker/control rail; the ticks ride item 3's ruling | COLOR "The crayon datum"; verdict: crayons KEPT + proportioned |
| 5 | **THE SIGNATURE — the `sRGB ↔ oklch` proof-toggle**: cross-fades the page's entire color field between the two authored mesh sets via a `[data-interp]` root attribute; default rests composed in oklch; the sag is *discovered*, not lived-in. **This is the interpolation-PATH half — the wave draws NO gamut boundary, NO ΔE contour, NO clipping margin anywhere on this page** (that signature is R.W3's, binding) | `App.vue` root + control cluster; implementation note in the treatment's §one-unforgettable-moment | § The one unforgettable moment |
| 6 | **Copy + structure**: hero copy rewritten to the thesis (kicker `OKLCH · PERCEPTUAL · LIVE`; H1 *"The color field, computed in oklch."*); the two filler note-cards fold — load-bearing sentence into the deck, remainder into a collapsed `.glass-floating` lab-notes drawer (folded, never discarded); pin `.dark` | `App.vue:6-10` (the commit-message hero), `:20-38` (the note-cards) | TYPOGRAPHY-2; SPATIAL-1; audit §3/§4 |
| 7 | **Layout + type push**: asymmetric hero band (`1.6fr 1fr`, shared optical baseline); offset racked panels (`1.08fr 0.92fr`); H1 at max optical size; kicker as instrument label; tabular readouts | `hero-lab.css:18-23` (header), `:124-128` (grid), `:38-43` (title), `:29-36` (kicker) | SPATIAL-2/3; TYPOGRAPHY; audit §5 |
| 8 | **Entrance orchestration**: the `lab-rise` staggered cascade (kicker → title → deck → toggle → panel-A → panel-B, ~70ms offsets), `--ease-decelerate`, PRM-gated | shell children; mirroring `animations.css:39-50` | MOTION-1; audit §6 |
| 9 | **Micro-interactions**: panel hover = lens focus (sibling dims); glass films tinted oklab instead of literal white; the fps badge as a perceptual meter; slider tracks tint to the mesh hue; the gold live-dot on the mesh phase | `HeroPanel.vue:57-59`; `HeroControls.vue`; `hero-lab.css:141-149,243-267` (the white-film sRGB glass — audit §7) | MICRO; MOTION-3 |
| 10 | *(Optional, deeper)* **Perceptual swatch math**: replace the `mixHex`/`sampleGradient` raw-sRGB byte-lerp with oklab mixing so even the palette previews compute perceptually | `demo/hero-lab/lib/helpers.ts:35-53`; `lib/palettes.ts` | audit §8; plan item 7 |

---

## §Hard gate (verbatim-faithful to `SYNTHESIS-v2.md §3 R.W5`; measurement forms attached)

- **(a)** **fonts load** — on the built hero-lab, `document.fonts.check` resolves a REAL Fraunces face and a real Fira Code face (never a `font-family` string match); the pre-wave RED is the empty `index.html` head.
- **(b)** **page gradients interpolate in oklch** — the computed background of `.hero-lab-page` carries the `oklch()`-authored mesh (not the `color-mix(in srgb, …)` wash); the PRM/fallback path still resolves an oklch mesh, never grey.
- **(c)** **the toggle demonstrably kills the grey** — flipping `[data-interp]` to sRGB measurably desaturates the field's mid-transition band (sampled pixel/computed-color delta between the two states exceeds a visible threshold at the blob seams); flipping back restores it. Both mesh sets are real authored inputs — the comparison is honest, not faked.

Boundary rider (inside the same gate): **zero gamut-boundary vocabulary on this page** — no contour, no hatch, no `--gamut-*` token consumed; the assignment binding (`SYNTHESIS-v2.md §2.2`) is verified by inspection at close.

---

## §BOOKS touching this wave (books, NEVER gates)

None owed. If **Q1 flips to slip**, this entire wave re-letters to Tranche S verbatim — the spec, items, and gate carry unmodified; R.W7 closes on W4 + W6 without it. Slippage is a scheduling act, not a scope change; record it in `PROGRESS.md` and the R/FINAL.md handoff, never as a silent drop.

## §Hand-off (binding boundaries)

- **The path/boundary assignment is BINDING both ways**: R.W3 owns the gamut-boundary reveal (the picker's plate); R.W5 owns the interpolation-path reveal (the grey-death toggle). Neither page may claim the other's half.
- **A standalone sub-app**: new tokens land in `hero-lab.css`'s own `:root` (correct per the treatment — no `style.css` pollution); glass tiers/`--type-*`/`--ease-*`/`--color-gold` are consumed from the extant contract, never re-declared.
- **The crayon primaries are KEPT fleet-wide** (the standing verdict): this wave *sources* the ticks from the existing `--rainbow-*`/`--accent-red` tokens; it mints no parallel primaries.
- **Modern-web discipline** per the treatment's browser-support notes: `@property`+`oklch()`+`color-mix` are Baseline; static-mesh fallback declared before the `@property`-driven layer; all motion under `prefers-reduced-motion: no-preference` + the `animations.css:60` guard; no scroll-driven timeline.
- No shared write surfaces with R.W4 (parallel-safe).

## §Evidence packets consumed

`docs/frontend-design/hero-lab.md` (the spec of record) · `SYNTHESIS-v2.md §2.2` (the AMEND+ADOPT verdict and the binding path/boundary clause) · `boot-blast-radius.md §4` (the build dependency on R.W2's Tabs migration) · `docs/tranches/N/audit/user-audit-2026-06-12/LEDGER.md` (register context only — no U-row folds here).

## §Fold accounting (zero-drop, `SYNTHESIS-v2.md §10` R.W5 row)

The R.W5 ledger row is a single entry — **hero-lab treatment (full; boundary/path assignment binding)** — and it lands whole in this wave: items 1–10 are the treatment's own implementation plan, the binding amend is item 5's boundary clause + the gate rider, and Q1 governs placement only. Nothing else folds here; nothing here folds elsewhere.
