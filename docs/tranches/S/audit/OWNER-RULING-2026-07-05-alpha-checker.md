# OWNER RULING — alpha-slider checkerboard (2026-07-05)

## §0 Verbatim owner text (wins)

> Further, the alpha slider should have a checkerboard effect with tiling to display those
> values--subtle and idiomatic.

## §1 Encoding

The idiomatic transparency checker: a small tiled checkerboard UNDER every alpha-carrying
track, so the gradient's transparent end actually reveals transparency instead of a flat
opaque wash. Bar: **subtle** (muted two-tone in the house neutrals, small tile ~8px, both
schemes — the checker is an instrument ground, not a pattern feature) and **idiomatic** (the
convention every serious color tool uses; ONE recipe, one home — no per-instance copies).

Surfaces: the picker's alpha `ComponentSliders` row (the primary site, per the owner's
screenshot lineage) + every other alpha-rendering ramp (gradient stop editor alpha, any
alpha swatch wells) — sweep and name them. The track gradient paints ABOVE the checker
(layered backgrounds), and the alpha gradient must actually ramp to transparent (verify the
current gradient string does — if it ramps to an opaque color, that is the second half of
the same defect).

Producer boundary: if glass-ui's slider/track already ships a checker seam, consume it; if
not, a layered `background` on the demo's track consumption is idiomatic consumer work (NOT
a slider fork); if the RIGHT home is the producer track, note it as an L6 rider for the W8
`/slider` consume — but land the demo recipe now (the ruling is immediate).

## §2 Implementation record

(appended by the implementing lane)
