# Keyframes root Browser audit

**Date:** 2026-07-29  
**Mode:** independent internal-Browser audit; tranche development only  
**Target:** `http://127.0.0.1:41740` from the active Keyframes audit server  
**Product-source edits:** none

## Terminal intake

The new Keyframes route captures are evidence, not authority. A root-controlled
Browser pass independently reproduced a live mobile scene/chrome composition
defect that must fold into the existing W mobile, hierarchy, and keyboard
owners. It does not warrant a new component, framework, or process-only gate.

## Exact observations

At a `375 × 812` viewport on `#/easing`, the document reports
`documentElement.scrollWidth === 375`, but several shell controls extend beyond
the clipped viewport:

| control | x | width | right edge | disposition |
|---|---:|---:|---:|---|
| Controls tab | 291.016 | 101.031 | 392.047 | partially clipped |
| Open controls | 421.047 | 40 | 461.047 | wholly outside |
| `@mbabb` menu | 469.047 | 67.016 | 536.063 | wholly outside |
| theme switch | 398 | 32 | 430 | wholly outside |
| keyboard shortcuts | 390 | 0 | 390 | collapsed and outside |
| Share | 358 | 24 | 382 | partially clipped |

The same Easing state exposes no `h1`. Its inspected heading set is a visible
`h2` named `ease` and a `1 × 1` `h2` named `Animation controls` near
`y = 714.56`. Root also directly observed no heading on Sequence. The lane's
subsequent 66-capture manifest records empty desktop-rest heading arrays for
Cube, Amiga, Square, Spring, and Sequence and only `ease` for Easing. A source
census finds no `h1` or `role="heading"` under `demo/scenes/**` and only the
Easing `h2`. Home is therefore the sole scene with an `h1`; the born-RED
hierarchy denominator is all six non-Home routes, not Easing alone.

The `#/` Home state at the same viewport settles at `scrollWidth === 375`,
retains its `h1`, and does not reproduce the chrome escape. Desktop Home and
Sequence render without console warnings or errors in the inspected state.
The mobile falsifier is therefore scene/chrome composition evidence, not merely
a global viewport-control failure.

## Required fold

- Bind the coordinate evidence to the existing mobile single-page and shell
  ownership rows.
- Make the existing π manifest fail on every control whose bounding box escapes
  the viewport or collapses to zero area.
- Bind all six non-Home routes' missing `h1` to the existing
  one-scene/one-heading hierarchy owner.
- Bind the unreachable chrome to the existing keyboard-reachability workflow.
- Do not create a bespoke runner, registry, compatibility layer, or Easing-only
  shell.

The Keyframes lane received this batch as `K-VIS-01`. Product execution remains
unauthorized; the observation is formation input only.
