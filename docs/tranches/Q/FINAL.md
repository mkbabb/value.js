# Tranche Q — FINAL

**Status:** CLOSED. **Versions:** 1.1.1 + 1.2.0. **Commits:** `fd3c7ce` (1.1.1) + `e80b359`
(1.2.0), both 2026-06-23. **Tags:** `v1.1.1`, `v1.2.0`.

> Authored lean at R.W0 (2026-07-03) — Q shipped its versions and tags but never carried a close
> record. Derived from the `fd3c7ce` + `e80b359` commits and the R charter (`docs/tranches/R/R.md §1`).

## What Q was

The value.js response to the keyframes.js Tranche Q dispatch (`KF-TO-VALUEJS-Q.md`, VJ-Q1..Q9).
Two releases: a PATCH closing the one platform-parity gap (1.1.1) and a BC-additive perf +
grammar + provenance MINOR (1.2.0). Every item carried a born-RED gate verified to bite the
unfixed tree.

## 1.1.1 (`fd3c7ce`) — the library-LEADS catch-up

- **VJ-Q1 — `contrast-color()`** (CSS Color L7, Baseline April 2026): the first CSS feature
  value.js trailed the platform on, inverting the library-LEADS precept. WCAG 2.x leaf in
  `units/color/contrast.ts` (`wcagRelativeLuminance`, `wcagContrastRatio`, `contrastColor`),
  distinct from the OKLab-L `computeSafeAccent` metric. The `contrast-color()` parse arm resolves
  EAGERLY to one concrete `Color` (mirroring `color-mix()`).
- **parse-that re-pinned `^0.12.0` → `^0.13.0`** (transparent — the deleted `thenMap`/`fuse` had
  zero value.js consumers).
- **NO-LEGACY**: the dead CSS Color L6 `color-contrast(… vs …)` grammar stub retired from
  `css-color.bbnf`, replaced by the L7 `contrastColor` rule.

## 1.2.0 (`e80b359`) — the perf + grammar + provenance minor

- **PERF** — VJ-Q2 egress out-param family (`xyz2rgbFamilyInto` + per-space `*Into`):
  `gamutMap(display-p3 OOG)` 37 → 9 allocs/call (measured, bit-identical), the dropped VJ-P1 second
  half. VJ-Q3 `mixColorsInto` + `sampleColorRampAt` + a `for…in` structural `clone()`.
- **GRAMMAR** — VJ-Q6 dashed-call arm (`--ident(args)` → `FunctionValue`) + the `<syntax>` validator
  (`parsing/syntax.ts`). VJ-Q7 `if()` multibranch: the full ordered N-branch clause list, not the
  lossy 2-branch collapse (2-branch form byte-identical).
- **PROVENANCE + LAYOUT** — VJ-Q4 `flatLeaf .fnName` (a clone-stable 7th `ValueUnit` ctor field,
  retiring the keyframes S8 WeakMap). VJ-Q8 `ColorChannelPlan` SoA (`color-soa.ts`; ~5× fold-win,
  bit-exact).
- **SERIALIZE** — VJ-Q9 none-channel + `color()`-wrapper round-trip fidelity.
- **CONTRACT** — VJ-Q5: `/math` stays parse-that-free (resolves `lerp`/`clamp`/`scale`, one
  math chunk, zero grammar) — the load-bearing externalization leaf keyframes consumes.

## Close state

1.1.1: 1912 tests green. 1.2.0: 1934 tests green (51 files); typecheck + build clean. Merged to
master and tagged `v1.1.1` + `v1.2.0` at the R.W0 master-merge.
