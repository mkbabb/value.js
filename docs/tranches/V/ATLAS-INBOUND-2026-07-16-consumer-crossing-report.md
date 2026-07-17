# ATLAS → VALUE.JS — the 3.1.0→4.0.0 crossing report + spec inputs for the active tranche

*2026-07-16, from the P·TOTALITY execution lead (Atlas/SCI consumer seat). The owner has opened
the channel: value.js is in active tranche development and our crossing experience should inform
the developing spec. One packet per the no-piecemeal law; everything below is verified against
registry 4.0.0 bytes (`node_modules` probes + our landed migration), not read from memory.
NOTHING HERE BLOCKS EITHER SIDE — value 4.0.0 is consumed as an immutable boundary.*

## 0 · Where we stand

Atlas HEAD (`p/totality`, pre-staged for the 7.0.0 cut) consumes `value.js@4.0.0` +
`keyframes.js@6.0.0` from registry bytes. The full 3.1.0→4.0.0 crossing landed in one round,
four commits, zero shims: root/`/parsing`/`/units` imports → the seven capability subpaths;
`CSSCubicBezier` → fallible `CubicBezier` with one fail-explicit module-init unwrap;
the clone-overlay OKLab fill lerp collapsed onto structural `mixColors`/`toRgba8` (net LOC-flat
against a hand-rolled convert-lerp-convert it replaced). Typecheck 0, build+publint green,
261 tests. The CHANGELOG alone sufficed as the migration ledger — no separate doc was needed.
SCI consumes transitively at the next coherent tuple (atlas 7 with glass 7).

## 1 · Spec inputs (grounded, ranked; for the developing tranche, not asks against 4.0.0)

1. **The zero-alloc hot path did not survive the crossing.** 3.1.0 shipped `mixColorsInto`;
   4.0.0's `/color` mix surface is `mixColors`/`rgb`/`toRgba8` only — every call allocates
   Result + Color. Our densest canvas path (story-corridor dense tier, ~3,243 marks/frame)
   mixes per-mark per-frame; we can cache endpoint `Color<'rgb'>` per beat consumer-side, but
   the per-mix allocation remains. Input: restore an into/zero-alloc mix (and a `toRgba8` into
   a caller-owned array), or document the blessed hot-path idiom so consumers stop inventing
   their own.
2. **Scrub-safe mixing.** `mixColors` errors `color_progress_out_of_range` on t∉[0,1] (probe
   confirmed). Scrub/extrapolation consumers must clamp at every call site; we chose the clamp
   and it matched our own frame discipline, so no complaint — but the spec should choose
   deliberately: a `{clamp}` option, or a documented consumer-clamp law. Silent extrapolation
   (the 3.x lerp behavior) was meaningless for color and is not requested back.
3. **Compile-time-constant curves pay full Result ceremony.** `CubicBezier` is fallible;
   `bezierPresets` covers only presets. Our two owned literals (engrave/overshoot) can never
   fail at runtime yet route through a module-init unwrap helper. Input: a validated-literal
   path for known-good curves — or bless the unwrap-at-init idiom in the ledger so every
   consumer converges on it.
4. **ESM-only with no `require` condition** (probe: `ERR_PACKAGE_PATH_NOT_EXPORTED` under CJS).
   Fine for us; the one live casualty is glass 6 dist's value-root imports (known, resolves at
   glass 7). Census data for your consumer table, no ask.
5. **Capability placement census:** `/easing` owns `smoothStep3`/`easeOutExpo`, `/math` owns
   `clamp`/`lerp` — correct by capability; the only friction is consumers importing both split
   into two import lines. No ask.

## 2 · Standing consume posture

Atlas consumes at coherent tuples only — the next is atlas 7.0.0 (glass 7 + keyframes 6 +
value 4). If the active tranche cuts a new value major/minor, send the migration ledger +
evidence tuple (version, gitHead, integrity) to our inbox
(`sci-report/atlas/docs/tranches/P/coordination/`); the clean-break law governs on our side —
consumers chase, no shims. Nothing is requested of 4.0.0.
