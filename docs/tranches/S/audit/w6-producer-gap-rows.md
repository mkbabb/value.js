# S.W6 — producer-gap rows (the hard-gate-map hedges, fired in-window)

Recorded per the wave's books-never-gates law: an in-window producer miss is a
RECORDED gap row that re-verifies at the S.W8 adopt — never a demo shim
(`S.W6.md §No-workaround prohibitions`). Probe date 2026-07-05, ATMOSPHERE lane.

## GAP-L2 — the aurora lightness-scheme atoms door (W6-2 + the W6-3 formula halves)

**Status: NOT LANDED in-window → gap row FIRED. No demo shim authored.**

Probe (READ-ONLY, `../glass-ui` at tranche/BG `411a6b12`): `AuroraAtoms`
(`src/components/custom/aurora/composables/atoms.ts:102-140`) carries NO
`lightnessScheme`/`lBand` atom and NO `hueSpread`/chroma-variance atoms;
`resolveAtoms` threads `deriveAurora(seed, { harmony, stopCount,
temperatureShift })` ONLY. The internal levers all EXIST and are dead code from
the door, exactly as the wave doc records: `DeriveAuroraOptions.scheme
("light"|"dark")` + `lBand` (`color.ts:168/174`, `DERIVE_L_BAND_DARK`) and
`hueSpread`/`chromaFalloff`/`chromaEasing:"bell"` (`color.ts:129-141`).

Blocked by this gap, re-verify at W8:

- **W6-2 consume half** — `useGlobalDark` → the atoms door threading. The dark
  L band `[0.18, 0.42]` stays unreachable; hard-gate row 2 is L2-hedged (the
  wave closes with this row recorded).
- **W6-3 formula halves** — chroma-adaptive hue spread (24°+40°·(1−C/0.3),
  clamp [24°,64°]), the C bell 0.04 floor, scheme-banded L. These are the L2
  `hueSpread`/chroma atoms (owner-amplified via ADDENDUM A3, dispatched
  2026-07-05 → glass-ui `f2ab4a18`). The demo half landed instead on the
  door's SHIPPED knobs (harmony/colorEnergy/zones — see the W6-3 commit).
- **W6-8 contrast residual** — the re-measured hot zone lands at 3.98:1
  (from 1.90:1 wash-on; the ≥4.2 expectation needs the field itself to go
  dark-band in dark mode — the light-band stops shining through the cured
  glass are THIS gap's signature). See the forensics addendum.

## W6-7 — the aurora pointer door: FOUND (no L19 gap row)

**Status: the engine half EXISTS at the producer — consumed, not gap-rowed.**

Probe: `AuroraAtoms.interactivity.light` (cursor-as-light + idle orbit,
`frameLoop.ts` uLightDir pull, master-tempo PRM-zeroed) + the event-driven
cursor API on `UseAuroraReturn` (`setCursor`/`clearCursor`/
`injectCursorVelocity`, the velocity write-path PRM early-out at
`runtime.ts`). The L19 ask (already dispatched, ADDENDUM A4) remains open only
for any RICHER field-warp doors; the shipped door satisfies W6-7's consume
half (see the W6-7 commit).

## Cross-refs (routed, not chased here)

- Orphan field-floor dark arm / damping → producer F2.R1 (ADDENDUM A1).
- The `alpha` muted-ink rung (~1.5:1 both ways) → producer F2.R1 (ADDENDUM A2).
- Title-ink-vs-plate-luminance → W7-3's accent system.

## GAP-L5 (satellite/bead — mirrored from the `d843ae7` commit body at wave close)

The visible-bead ≥96px gate + the satellite-show half of W6-4 are CONDITIONED on the producer
L5 HERO preset (+ `uSatColor[]`/satellites-at-rest), absent at glass-ui 4.2.0/tranche-BG.
The demo-geometry halves (footprint clamp, corner-break law, Q7 full presence, C-tracking
ramp, mood FSM, PRM static frame) all LANDED; the producer halves re-verify at the S.W8 adopt
walk alongside GAP-L2 above.
