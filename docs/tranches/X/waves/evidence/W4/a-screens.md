SERVED MODEL: claude-opus-5[1m]

# W4 §8 artefact 8 — before/after screenshot pairs (X.W4.a's three surfaces)

**X.W4.a · 2026-09-18.** Artefact 8 asks for pairs on five surfaces; the Select composition
is **X.W4.b**'s and the Gradient rail is **X.W4.c**'s, so this file carries the three this
unit owns: **the slug cluster, the rail letters, one admin panel** — fine and coarse.

**Matrices.** `fine` = 1280×720 chromium (the `smoke` project's viewport).
`coarse` = Pixel 7 (`smoke-mobile`'s device, `isMobile`+`hasTouch` ⇒ `pointer: coarse`).
Both served from the dev stack on `:8090`; the admin panel under the same `addInitScript`
admin seed + wildcard `**/admin/**` mock the repo's own `e2e/smoke/admin/fixtures/admin-auth.ts`
uses, so no XHR reaches the network.

**The BEFORE pass was taken against HEAD bytes**, by reverting this unit's three touched
files to HEAD, capturing, then restoring the cure from a copy taken beforehand — so the
pair is a true before/after of the same instrument, not a memory of one.

## The measured pairs — the load-bearing evidence

| surface | matrix | BEFORE | AFTER | floor met |
|---|---|---|---|---|
| slug field (`input.slug-input`) | fine | 160 × **22.4** | 160 × **28** | ≥24 ✓ |
| slug field | coarse | 160 × **19.6** | 160 × **44** | `--control-floor` ✓ |
| the three `DockControl compact` seats | fine | **22 × 22** ×3 | **24 × 24** ×3 | ≥24 ✓ |
| the three `DockControl compact` seats | coarse | **23.3 × 23.3** ×3 | **44 × 44** ×3 | `--control-floor` ✓ |
| `.channel-rail-item` letters (l · a · b · α) | fine | **23.8** · **23.7** · **23.6** · 24.5 × 24.4/25.4 | **24** · **24** · **24** · 24.5 × 24.4/25.4 | ≥24 ✓ |
| `.channel-rail-item` letters | coarse | 31.7 × 44 | 31.7 × 44 | unchanged — see note |
| admin refresh `<Button>` (`AdminAuditPanel.vue:30`) | fine | 28 × **36** | 28 × **28** | ≥24 ✓ |
| admin refresh `<Button>` | coarse | 28 × **54** | 28 × **44** | `= --touch-target` ✓ |

**Both rail-letter pairs are byte-identical PNGs, for two different and correct reasons.**

- *Coarse* (`d8b4dce10de4` both): F-5's touch rung already applied at the Pixel-7 width
  (`max-width: 1023px`), so the letters were already 31.7×44. This unit widened the rung's
  CONDITION to `(pointer: coarse)` so a coarse pointer at ≥1024px gets it too; at 412px
  that is a no-op, and an identical pair is the correct evidence for a no-op.
- *Fine* (`bc8025e07fc5` both): the cure adds a 24px **hit-cell** floor to the two narrow
  seats (`a` 23.7 → 24, `b` 23.6 → 24). It does not move a glyph, and it does not move the
  rail: `.channel-rail`'s width is set by its widest child (`α`, 24.5), which is unchanged,
  and the column is `items-center`. So the PAINTED pixels are identical by design — "hit
  areas grow, glyphs do NOT" is the file's own stated law, and a byte-identical pair is
  precisely what honouring it looks like. The change is visible only in the measured
  boxes, which is why the table above, not the PNG, is this row's evidence.

**The admin pair is also the in-situ proof of the `h-7` finding** — 36→28 and 54→44 show
both that `h-7` was inert (the control was never 28px tall) and what moving the rung to
`xs` actually costs. Full derivation in `a-h7-cascade.md`.

## The files

```
slug-cluster-{fine,coarse}-{before,after}.png
rail-letters-{fine,coarse}-{before,after}.png
admin-audit-toolbar-{fine,coarse}-{before,after}.png
```

**Honest note on the slug-cluster PNGs.** The slug-edit `DockLayer` is not the dock's
ACTIVE layer at rest: its controls are laid out and measurable (which is why the census
finds them and why the boxes above are real), but the band's painted pixels belong to the
active layer. The harness's attempt to drive the editor open through the dock's own
`Login` trigger timed out at both matrices (recorded as `step-miss open-slug-edit`), and
rather than force a synthetic click or reach past the UI into app state, the capture was
left as it stands. **The slug-cluster pair's evidence is therefore the MEASURED BOX** —
logged above, and independently reproducible from `reopen-baseline.json` (before) and the
post-cure run (after) — with the PNGs framing the dock band at both phases. The rail and
admin pairs are ordinary element screenshots and show the change directly.
