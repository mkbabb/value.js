SERVED MODEL: claude-opus-5[1m]

# G28 — the three-leg bar at the 4.1.0 cut, under the restated denominator

Measured 2026-09-19 by `X-W9.f` on `tranche-u`, darwin arm64, node v26.0.0. Every reading below was
taken twice; both runs are shown or stated equal. Published under G28's restated denominator, or it
is not published at all — so the denominator comes first.

## §0 · The denominator, and what may not be cited against it

Authority: COHESION §0j.E (OC-1) and M-22 §4, restated in `W9.md` §6 G28 verbatim.

| quantity | value (µs) | standing |
|---|---|---|
| conservative break-even denominator | **1,636,680** | the frame every budget below restates against |
| strict-3× budget | **545,560** | `OWNER-GATED-PENDING-RATIFICATION` |
| strict-2× budget | **818,340** | `OWNER-GATED-PENDING-RATIFICATION` |
| fixed native floor | **311,883** | measured, not a bar |
| headroom under 3× | **233,677** | 545,560 − 311,883 |
| headroom under 2× | **506,457** | 818,340 − 311,883 |
| `10×` budget | 163,668 | **RETIRED AS LAW** — the native floor alone is **1.906×** over it |
| `1,870,633` and its 311,661 / 623,434 headrooms | — | **UNCITABLE** while `P4-EVIDENCE-REPLAY.json` is unreadable under a TCC grant. Re-measured absent at this seat. |

**OC-1 governs the reading: this table is RECORDED-NOT-GATING.** CC-095 retires here — the old
single published-parser ratio is not published again, and the three-leg bar replaces it *as a
reporting format*, never as an admission bar. Admission is decided on correctness.

## §1 · Leg R1 — the shipped crash class, measured on the PACKED tarball

The only leg of the three whose subject is in this wave. Oracle is the packed artifact, never the
worktree (PT-08): `mkbabb-value.js-4.1.0.tgz`, installed into a scratch consumer outside every
repository.

Corpus, 13 inputs through the R1 entry of record `parseCssColor`: the **9** empty-body colour
functions of G2's battery (`oklch() rgb() hsl() lab() color() rgba() lch() oklab() hwb()`) and the
**4** `Object.prototype` keys (`constructor __proto__ toString valueOf`).

| reading | 4.0.0 (banked) | 4.1.0 (this seat, ×2) |
|---|---|---|
| throws / calls | **13 / 13** | **0 / 13** |
| verdict | RED | **GREEN — zero throws** |

Every one of the 13 returns `{ ok: false }` with a typed diagnostic. Not one returns a value, and
not one throws; the leg's condition is *zero throws*, and it is met by measurement rather than by
a caught exception — `grep -rn 'catch' src/` finds nothing at all in the shipped tree.

## §2 · Legs `accepted` and `reject` — NO SUBJECT IN THIS WAVE, stated rather than faked

The accepted (`≥0.9×` published) and reject (`≥0.6×`) legs measure a **candidate parser** against a
published one. **This wave adopts no parser and ships none** — G31 records that position against
ground truth, `@mkbabb/parse-that` is in neither `dependencies` nor `devDependencies` at this cut,
and COHESION §0i.1 closes the adoption leg `BLOCKED-ON` the parser proof gate with X.P.W4's RC-P
evaluator as its re-trigger.

So the two legs have **no measurable subject here**, and §0j.E's own words bind the choice: *"Plane
A's CC-095 three-leg bar is adopted as a reporting format only, its X·P applicability flagged as an
owner confirmation; **the two planes are never merged**."* Manufacturing a ratio for a parser this
wave does not ship would merge them.

| leg | subject at this cut | reading |
|---|---|---|
| accepted ≥0.9× published | none — no candidate parser on the 4.1 surface | **NO-SUBJECT**, recorded |
| reject ≥0.6× | none — same | **NO-SUBJECT**, recorded |
| R1 zero throws | `parseCssColor`, shipped | **GREEN**, §1 |

## §3 · G24's substrate — the tarball, its hash, and why the substitution is trustworthy

`ESC-W9-G24-SUBSTRATE` (COHESION §0ac). The probe's written oracle,
`../fourier-analysis/web/node_modules/@mkbabb/value.js/dist/value.js`, is **absent** — re-measured
`No such file or directory` at this seat. The registry tarball stands in its place, `npm pack`ed
into a scratch directory outside every repository. `../fourier-analysis` was neither read nor
written by this unit.

| field | value |
|---|---|
| package | `@mkbabb/value.js@0.13.0` |
| file | `mkbabb-value.js-0.13.0.tgz`, 90,832 bytes |
| sha256 (local pack) | `b943f722a9681f698a6925ef26ae0e3638c7a4f62d4d8009bb3851bc5f1b36aa` |
| registry `dist.integrity` | `sha512-o3aSBSAHm+wMz3DsBoW7q/9XxgLpY++Pev9H1dF8lMGD49dRG7MU2w15gv46NtjpYR/ScYppVX27rmU8F1tmxQ==` |
| registry `dist.shasum` | `0a8806331c4e3bf5b96557582b84c4a334da310a` |

**The substitution is validated, not assumed.** Run against the **published `4.0.0` tarball** — not
this worktree — the substitute oracle reproduces the banked drift table exactly, name for name:

```
⟨cmd⟩ node docs/tranches/X/waves/evidence/W9/analytic-arm-drift-0130.2026-09-19.mjs \
        <0.13.0>/package/dist/value.js  <4.0.0>/package/dist/subpaths/easing.js
  ease-out-circ      max|D| = 1.923e-1        ease-in-cubic      max|D| = 3.162e-2
  ease-in-expo       max|D| = 6.930e-2        ease-out-sine      max|D| = 3.082e-2
  ease-in-circ       max|D| = 4.489e-2        ease-in-sine       max|D| = 3.038e-2
  ease-in-quad       max|D| = 4.157e-2        ease-out-quad      max|D| = 2.520e-2
  8 of 22 names drift >= 1e-3; worst overall 1.923e-1 (ease-out-circ)      RED
```

That is the banked table (8/22, max 0.192) reproduced from a different substrate, so the oracle is
the same oracle and the readings below are comparable to the ones the band recorded.

## §4 · G24 at the cut — the eight arms, after

```
⟨cmd⟩ node docs/tranches/X/waves/evidence/W9/analytic-arm-drift-0130.2026-09-19.mjs \
        <0.13.0>/package/dist/value.js  dist/subpaths/easing.js          (×2, identical)
  0 of 22 names drift >= 1e-3; worst overall 4.563e-6 (ease-in-out-back)  GREEN   exit 0
```

| name | 4.0.0 max\|Δ\| | 4.1.0 max\|Δ\| |
|---|---|---|
| `ease-out-circ` | 1.923e-1 | **0.000e+0** |
| `ease-in-expo` | 6.930e-2 | **0.000e+0** |
| `ease-in-circ` | 4.489e-2 | **0.000e+0** |
| `ease-in-quad` | 4.157e-2 | **0.000e+0** |
| `ease-in-cubic` | 3.162e-2 | **0.000e+0** |
| `ease-out-sine` | 3.082e-2 | **0.000e+0** |
| `ease-in-sine` | 3.038e-2 | **0.000e+0** |
| `ease-out-quad` | 2.520e-2 | **0.000e+0** |

The eight restored arms are **bit-exact** against 0.13.0, because both spell the same closed form.
The worst residual anywhere in the 22 is **4.563e-6** on `ease-in-out-back` — a cubic-bezier solver
tolerance on a name this wave did not touch, three orders of magnitude inside the `<1e-3` target.

**Read honestly, one limit disclosed.** Our acceptance target is `<1e-3`; fourier's ESC-4 gate is
`Δ = 0`, which a `1e-3` tolerance cannot certify. For the eight restored names the measurement
happens to be `0.000e+0` and so clears both — but the *gate* is the looser one, and MPC-5's own
sampler across the bump remains the correct instrument at their end. A red there is a value.js
defect, pre-filed, as the O-37 packet already declared.
