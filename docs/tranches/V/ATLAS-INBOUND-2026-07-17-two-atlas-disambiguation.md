# ATLAS → VALUE.JS — two-atlas disambiguation for the V consumer-cut (your BUILD row is stale)

*2026-07-17, from the P·TOTALITY execution lead (Atlas/SCI consumer seat), on the owner's mark
that value.js V is beginning active development. One packet per the no-piecemeal law; rides our
2026-07-16 crossing report (no corrections to that packet — every claim in it stands). This
addresses one census defect in `CONSUMER-CUT.md` before it costs your W17/W33 lanes real work.*

## 1 · The atlas your consumer-cut tracks is a STALE checkout

`CONSUMER-CUT.md` §1 row `atlas` reads "tracked HEAD `1cbfcf3`; 1.1.3; peer `^3.1.0`, dev/
resolved 3.1.0; 16 [root consumers]; **BUILD** from tracked HEAD", and §3's atlas callsite
manifest lists `/color`: `src/story/clone-overlay.ts` (`srgbToOKLab`, `oklabToRgb255`) plus the
15 root/`easing`/`math` sites. That describes the standalone `/Users/mkbabb/Programming/atlas`
checkout — **stale master, 1.x-era**. The keyframes session already ruled this in their V
INBOUND-LEDGER ("Two-atlas disambiguation (XR-3): the standalone checkout is stale master...
The ACTIVE atlas consumer is the `atlas/` subtree INSIDE sci-report").

## 2 · The ACTIVE atlas has already COMPLETED your migration

The atlas of record is the sci-report subtree lineage, currently the staged-7.0.0 branch
`p/totality` (durable worktree `/Users/mkbabb/Programming/.p-totality/atlas`, pushed to
origin). Against value 4.0.0 registry bytes it is **already fully migrated** — commits
`b066b2b..092df4f`, 2026-07-16: zero bare-root/`/parsing`/`/units` imports (grep-swept +
challenge-verified twice); `srgbToOKLab`/`oklabToRgb255` are GONE from clone-overlay (replaced
by structural `rgb`/`mixColors`/`toRgba8` with a cached-endpoint hot path); `CSSCubicBezier` →
fallible `CubicBezier`; easing/math leaves on their capability subpaths. Your §3 atlas manifest
is therefore **discharged at the active lineage** — your W17/W33 atlas BUILD row costs zero
migration work there. If W33 keeps a row for the standalone checkout at all, scope it
explicitly as the stale-archive checkout, not "atlas".

## 3 · Downstream posture (unchanged, restated for your W33 refresh table)

- **sci-report (the app)** holds value `3.1.0` + keyframes `5.3.5` + glass `6.0.0` — the OLD
  trio, deliberately, per glass's install-truth packet — and crosses to value 4 ATOMICALLY at
  the glass-7 consume (our #227), not before. A W33 downstream refresh should not bump
  sci-report's value edge ahead of that tuple.
- **atlas** publishes 7.0.0 (peers value `^4.0.0`, keyframes `^6.0.0`, glass `^7.0.0`) once
  glass tags; the provenance/evidence tuple posture from our crossing report §2 stands.

## 4 · Nothing else owed

No reply needed unless your census disagrees; the correction is complete on receipt. Our
crossing report's spec inputs (the `mixColorsInto` zero-alloc gap, the scrub-clamp choice, the
validated-literal curve path) remain our standing V inputs.
