# Tranche N — FINAL (fold-forward)

**Status:** CLOSED as SUPERSEDED. N.W1–W9 landed (0.12.0 published, 2026-06-11). **N.W10–W18 were
ratified 2026-06-11 and never executed** — the block died on the record and its content folds
forward into **Tranche R**.

> Authored lean at R.W0 (2026-07-03). This is a pointer record, not a work log.

## Why the residue never executed

The ratified N.W10–W18 block was overtaken by the constellation before dispatch. In the three
weeks after ratification, glass-ui shipped 4.0.0–4.2.0 (landing every producer fix the block's
interims were scaffolding for), O/P/Q rebuilt the library underneath it (subpaths, grammar-2026,
zero-alloc color math, 1.2.0), and the "BA 4.0.0 pin" consume-event the block gated on ceased to
exist as a concept — the sibling deps are `file:`. Nothing in the block survives as-written.

## The obsolete v1.0.0 framing is dropped

N.W9′ framed the block's terminus as the v1.0.0 close. That version event **already shipped** at
O.W6 (`dd9beb5`, tag `v1.0.0`); the library is at **1.2.0** post O/P/Q. The "phantom
`@mkbabb/keyframes.js` devDep to delete" premise is **REFUTED** — the devDep is KEPT (it provides
glass-ui's `keyframes.js` peer + keyframes is a live `/math` consumer; see R.W0-8 and CLAUDE.md §3.4).

## Where the content went

The wave-by-wave disposition of N.W10–W18 (PRUNE / REWRITE / FOLD / BOOK) is transcribed in full
in **`docs/tranches/R/R.md §1`** ("Why R exists: the N.W10–W18 challenge, wave by wave"). In brief:

- **N.W10** functional truth → FOLD into R.W2 (the boot cure + Tabs drift + the N-era bugs).
- **N.W11/W11′/W11.D** color-SOTA/grammar → PRUNE (landed 0.13.0); the gamut-POLICY lane → FOLD
  into R.W1 (U10).
- **N.W12–W17** frontend consummation → FOLD into R.W3 (the amended `color-picker.md` is the spec)
  + R.W4 (suffusion) + BOOKs (router 4→5, dock-morph on the glass-ui dock-fission surface).
- **N.W18** consume-at-pin → PRUNE the frame; `/easing` consume → R.W4; the pin question → R.md §3.4
  policy + a booked 5.0.0 adopt event.
- **N.W8′** hygiene + master-merge + doc-truth → REWRITE into R.W0 + R.W7.
- **N.W9′** v1.0.0 close → PRUNE the version event (shipped at O.W6); the hygiene tail → R.W0/R.W7.

See `docs/tranches/N/audit/` for the N-era evidence corpus that Tranche R consumes.
