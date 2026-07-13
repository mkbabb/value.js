# U.W-LIB — THE LEAD SYNTHESIS DECISION (2026-07-13)

*The design-loop agglomerate act. Inputs: `design-memo.md` (the research/synthesize leg) +
`consumer-truth.md` (the four-surface probe) + the born-RED slate (`test/tranche-u-lib.test.ts`,
commit `3715888`, 18 RED-proven legs). The two evidence legs converged INDEPENDENTLY on both picks;
the lead ratifies them. Owner context: U-F29/U-F30 are owner-ruled AMELIORATE (§13.5); the version
cut stays owner-held.*

## U-F30 — RATIFIED: the composite invariant at Locus P — "parser colors are physical"

- **color-mix locus** (`src/parsing/color/color.ts:358-359`): after `mixColors(...)` returns its
  normalized result, denorm to physical via the **`normalizeColor(color, /*inverse*/ true)` path**
  (`normalize.ts:34-55`, attaching the denorm unit) — **NOT `convertColorSpaceDenorm`** (it
  normalizes-in assuming physical input: feeding it the normalized mix result reproduces the exact
  G5 wrong number one layer earlier). Then `createColorValueUnit`. `mixColors` itself UNCHANGED —
  its premultiplied-alpha + hue-in-turns math is spec-defined on normalized channels.
- **relative-color locus** (`src/parsing/color/relative-color.ts:133-163`): denorm the `converted`
  origin to physical BEFORE building `bindings`, so calc evaluates on physical channels
  (`calc(r + 10)` = `255+10 = 265`, the CSS-true value — LIB-G3b flips GREEN, no booking needed);
  construct the result from those physical channels directly.
- **Never** at the shared `createColorValueUnit` wrapper (the R-2 double-denorm trap; LIB-G4 guards
  it) and **never** inside `mixColors`/`sampleColorRamp`/`color2` (Locus F — breaks glass-ui
  `spectrum-walk` and keyframes `backward-color`, the latter SILENTLY: its ΔE ship-proof is
  relative and cancels a uniform convention shift).
- **Consequences**: LIB-G2/G3a/G3b/G5 flip; LIB-G4 stays green; **LIB-G6 verdict = the invariant
  PRESERVES the raw-channel convention — NO sibling co-migration** (the §28.1 preferred outcome);
  the glass-ui `cssToOklch` surface is a beneficiary (the latent mix-string double-normalize dies).

## U-F29 — RATIFIED: loud-fail + the `parseCSSValues` rename

- `parseCSSValue` requires full-input consumption; unconsumed trailing tokens throw a **typed,
  named error class** (not bare `Error`) so consumer catches are precise. Return type unchanged
  (single `ValueUnit | FunctionValue`). The memoize wrapper must NOT cache a poisoned throw —
  verify or restructure.
- `parseCSSSubValue` → **`parseCSSValues`** (the discoverable full-list name; top-level name free).
  E-3: rename at the root, NO legacy alias; internal call sites migrate now; sibling imports
  co-migrate at the cut (U-F77). README gains the multi-token example steering shorthands to
  `parseCSSValues`.
- Keyframes truth: all 3 `parseCSSValue` sites are try/catch-guarded → loud-fail degrades to
  diagnostic+DROP / return-node; full-value-default would change the return SHAPE at every site
  and silently corrupt 3 unguarded downstreams. Loud-fail is the keyframes-cheaper, E-3-truthful
  shape.

## Riders ratified with the picks

- **U-F34**: `{from}2{to}` rename sweep (29 drift exports per LIB-G12) with the **collision
  disambiguation**: `xyzToICtCp` (scalar tuple helper, `difference.ts:151`) and `xyz2ictcp`
  (`XYZColor→ICtCpColor`, `conversions/ictcp.ts:27`) are DIFFERENT functions — unify or give the
  scalar helper a distinct suffixed name; never a naive collide.
- **U-F74**: options-bag on `color2` (`{gamut: 'raw' | 'map'}`, default `map` — no silent behavior
  change), threaded to `xyz2rgb`'s `correctGamut` incl. the XYZ-hub path.
- **U-F31/F32/F33/F35**: per the design-memo implementation notes verbatim.
- **test:dist mirror**: at flip, the green legs + the LIB-G4 guard mirror into the `proof:*` dist
  slate (new `proof:lib-correctness` or extend `proof:serialize-fidelity`) — the born-RED author's
  DEFERRED row discharges at cure.

## Semver + hand-offs

The cut is **MAJOR** (typed-throw reshape + export renames + parse-output behavior changes) against
BOTH `^3.1.0` floors (glass-ui peer + keyframes runtime `dependencies`). LIB lands the fix and the
publish packet; **the owner takes the cut at U.W-ADOPT (U-F77)** — presented at the terminal report
per `RATIFICATION-2026-07-13.md §3`. The BH-relay addendum (E-2) lands at fix-landing into the
ACTIVE glass-ui tranche-dev inbox with the invariant + no-co-migration verdict + the U-F29 shape.
