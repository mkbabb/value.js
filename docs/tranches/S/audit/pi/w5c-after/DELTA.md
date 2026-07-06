# S.W5 Lane C — π CLOSE archive DELTA notes (w5c-before → w5c-after)

Captured by the Lane C completion session, 2026-07-06, on the worktree branch
`worktree-wf_fa07ead0-7af-4` (base `58a6feb`, close HEAD `3ed6c75` + this π commit) —
the same harness (`../pi-w5c.mjs`), states, viewports, dpr 2, and serve convention as
the baseline (the `npm run gh-pages` bundle on a disposable static **:4188**, never the
owner's :9000). 20 shots, 3 viewports × light/dark + the interaction `.webm`. PNGs
self-ignore under `.gitignore *.png` (the R/S standing convention); this manifest +
these notes + the harness are the committed record; frames reproduce on demand.

Session note: the prior Lane C session died on a session limit MID-W5-8 (the gamut-ink
one-home lift half-done, uncommitted). This session audited the partials against the
wave rows, finished them properly, and captured this close archive at the true close
state (two intermediate after-captures were superseded in place — the P1-7 uppercase
verdict and the half-res field staircase were both caught BY this archive's review and
root-fixed before this final capture).

## Per-state deltas

- **gradient-top (3 viewports × L/D)** — the W5-8 plate replaces the duplicated hero
  preview. BEFORE: an `aria-hidden` swatch of the same gradient the stop bar renders
  4 px below it (P2-16 duplication). AFTER: the perceived-space plate — the OKLCH L×C
  slice at the running hue (`oklch · H 205°` chip, top-right), the sRGB tongue painted
  true-color, the out-of-gamut region under the registered 45° hatch, the boundary
  contour + analytical cusp tick stroked in the token ink, the coalesced ramp inked as
  a trajectory with both stop beads ON the path (selected bead double-ringed). The
  editing rail below now carries the **iso-ΔE_OK rung row** — evenly-spread rungs for
  the default linear oklch ramp (the perceptual-pacing baseline; a steps() interval
  bunches them at the risers). Both schemes: the hatch/edge inks flip with
  `--foreground` by construction (one probe home, `@lib/gamut-ink`).
- **gradient-top W5-7 rows** — BEFORE: the three truncating select subtitles under
  Type/Space/Hue ("Left-to-righ…", "Perceptual,…"); the stop-bar instruction line
  ("Double-click to add · Right-click to remove · Drag to reposition") in 40%-alpha
  ink. AFTER: both EXCISED — the descriptions live only in the dropdown items; the
  gestures are affordance-evident (hover ghost previews the add; the remove chip rides
  the selected handle).
- **gradient-stop-sel (390 + 1440 × L/D)** — the W5-11 stop-editor rework: end handles
  sit fully INSIDE the bar (the inset track — no more semicircles colliding with the
  rounded corners); the selected handle ring is z-10 (the z-popover violation dead);
  the remove chip floats below the selected handle (touch-true remove — a SIBLING of
  the bar: its glass-wash `contain: paint` clips any out-of-box child, probed live).
- **gradient-editor-bad (1440 × L/D)** — the W5-11 explicit-failure surface, BEFORE =
  the silent state (no error affordance anywhere; the model partially corrupted
  underneath). AFTER: the editor keeps the garbage text verbatim
  (`linear-gradient(90deg, notacolor, ???)`), the border flips destructive, and the
  one-line Fira verdict reads `unparseable color "notacolor"` — lowercase mono-small
  (the first after-capture caught it wearing the UPPERCASE eyebrow token — the P1-7
  label-costume trap — and the interval-head literal with it; both root-fixed to
  `text-mono-small` at `70c6772` before this capture). Easing section still standing,
  handles unchanged (the atomic no-partial-apply witness).
- **gradient-radial-bad (1440 × L/D)** — BEFORE: `circle at 30% 30%` silently DROPPED
  (P2-17 data loss; the round-trip re-serialized without it). AFTER: the model rejects
  with `radial geometry ("circle at 30% 30%") isn't modeled — use
  radial-gradient(<color>, <color>, …)`; model untouched.
- **gradient-easing (1024/1440 × L/D)** — the W5-9 demo half: the open row now leads
  with the interval's own live ramp strip (its curve applied to ITS two colors over
  the alpha-checker, sampled by the ONE law the gradient renders with); the interval
  head literal reads `cubic-bezier(0, 0, 1, 1)` in case-true mono (BEFORE:
  `CUBIC-BEZIER(0, 0, 1, 1)`). The travel-dot/play-blob inside the picker remains the
  producer's L7 letter item (visible in both archives, unchanged here); the missing
  `defineExpose(playTravel)` seam is recorded as an L7 producer-gap — the demo's
  auto-trace drives the public play affordance by accessible text, PRM-gated.
- **picker-corner (1440 × L/D, 8× device-pixel crop)** — the W5-10 forensics rider.
  The quantitative record is the manifest's `cardGeometry`: BEFORE laptop-1024 card
  `y = 85.265625` (fractional DEVICE pixels at dpr 2); AFTER `y = 85.5` — every
  viewport/scheme row now sits on integer device pixels (`y × 2 ∈ ℤ`). The crops at
  dpr 2 read equivalent (wide-1440 was already device-integral); the fractional-y cure
  is the laptop row + the general mechanism (`useDevicePixelSnap`, paint-only relative
  nudge — deliberately NOT a transform). **The optional `--shadow-card` stamp feather
  is NOT applied** — the rider orders snap first, and no post-snap evidence at dpr 2
  demands it; re-evaluate at the owner's display / W9 sweep before touching the
  identity shadow.
- **gradient-interactions.webm** — stop drag (handle capture, rail + plate + rungs
  updating live), easing row toggle, editor typing → the settle. The motion record of
  the truce: no caret steal, no warp-on-pointerdown.

## Gate rows carried

- Hard-gate 4 (gradient atomic + explicit failure + round-trip e2e): the §6.1
  interaction spec is 7/7 green (`e2e/smoke/views/gradient.spec.ts` — add/drag/remove,
  round-trip with literals preserved, loud garbage failure, radial reject, easing
  ramp + steps literal, at-rest no-compositing-transform audit).
- W5-10 verify half: the at-rest transform audit is now a STANDING spec row, not a
  one-off probe.
- ZERO new demo math (W5-8 prohibition): slice contour/cusp = `sampleOKLChSliceBoundary
  (Into)`; pixel color = `oklabToLinearSRGBInto` + `linearToSrgb`; membership =
  `isInSRGBGamut`; pacing = `deltaEOK`; projections = `color2`. The wide-space second
  net marks sRGB-excess ON the trajectory (paper-under-dashed-ink pair) — the honest
  reading of "the sRGB-vs-wide excess band" with the library data that exists (no
  wide-gamut slice sampler is exported; noted, NOT improvised around).
