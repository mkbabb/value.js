SERVED MODEL: claude-opus-5[1m]

# X.P.W4.g — THE FOUR FIXTURE RUNS, VERBATIM (2026-09-19)

COHESION **§0ab** bullet 1 (E-w4f-1) requires that, after `seam-contract-check.mjs` learns the
post-adjudication vocabulary, **the negative controls still fire**: *"a `PENDING` head with no
adjudication row; an unretired subject binding against an `identical` row; a disposition id not in
the ledger."* This file is the evidence that they do — four runs of the CURED checker over the
synthetic fixtures beside it, pasted with their exit codes, nothing summarised.

The fixtures are NOT measurements and NOT rulings. Each of the three negative-control contracts is
`negctl-w4g-contract-base-2026-09-19.md` with **exactly one cell changed**, so a RED verdict names
that change and nothing else. The base contract is the POSITIVE control: same checker, same
universe, same ledger, no defect — it must read GREEN, or a RED below would prove only that the
fixtures are malformed.

**The checker under test**: `docs/tranches/X/parse-that/scripts/seam-contract-check.mjs` at the bytes
this unit committed. **The fourth argument** (the adjudication path) is OPTIONAL and defaults to
`ADJUDICATION-W4.md` beside the contract, so `W4.md` §6 G-1's three-argument command is unchanged; a
fixture names its own, which is the only reason the argument exists.

---

## Run 0 — POSITIVE CONTROL (the base fixture): must read GREEN

⟨cmd⟩ `node scripts/seam-contract-check.mjs evidence/W4/negctl-w4g-contract-base-2026-09-19.md evidence/W4/negctl-w4g-universe-2026-09-19.json evidence/W4/negctl-w4g-ledger-2026-09-19.md evidence/W4/negctl-w4g-adjudication-2026-09-19.md`

```
X.P.W4.a — SEAM-CONTRACT cross-check (G-1)
==============================================================================
contract   evidence/W4/negctl-w4g-contract-base-2026-09-19.md
universe   evidence/W4/negctl-w4g-universe-2026-09-19.json
ledger     evidence/W4/negctl-w4g-ledger-2026-09-19.md
adjudic.   evidence/W4/negctl-w4g-adjudication-2026-09-19.md

rows: contract 3 · universe 3 · ledger rows 2
universe tally: {"TOTAL":2,"PARTIAL":1,"ABSENT":0}

SET DIFFERENCES (G-1: both must be empty)
  contract ∖ universe-52 : ∅
  universe-52 ∖ contract : ∅

DISPOSITION CENSUS
  declared-divergence    2
  identical              1
  (COHESION §0v carried: 1 cells over 1 rows)

POST-ADJUDICATION VOCABULARY (COHESION §0ab, E-w4f-1)
  DIVERGENCE-LEDGER §10 RETIRED rows: NC-DEAD
  bindings those retirements release: 1
        beta: NC-DEAD (§10, RETIRED)
  ADJUDICATION-W4.md §2 subsections: 1
        alpha                  §2.1               publishes "declared-divergence"

ADVISORY — `identical` rows a ledger row MENTIONS outside a subject field (tier 2, not fatal)
  (none)

SURFACE-WIDE ledger rows (no export named in any field): (none)

VERDICT: GREEN — both set-differences ∅, no disposition contradicts a LIVE ledger row,
         every carried cell is terminally ruled in ADJUDICATION-W4.md, no field is blank.
```

**EXIT=0** — GREEN, as the positive control must.

---

## Control A — a `PENDING` head with NO adjudication row: must read RED

The change from the base: row 1 `alpha` publishes `PENDING-ADJUDICATION` instead of its ruled `declared-divergence`, and the checker is pointed at the EMPTY adjudication fixture, so nothing rules it. This is §0ab's first named control.

⟨cmd⟩ `node scripts/seam-contract-check.mjs evidence/W4/negctl-w4g-contract-A-pending-unruled-2026-09-19.md evidence/W4/negctl-w4g-universe-2026-09-19.json evidence/W4/negctl-w4g-ledger-2026-09-19.md evidence/W4/negctl-w4g-adjudication-empty-2026-09-19.md`

```
X.P.W4.a — SEAM-CONTRACT cross-check (G-1)
==============================================================================
contract   evidence/W4/negctl-w4g-contract-A-pending-unruled-2026-09-19.md
universe   evidence/W4/negctl-w4g-universe-2026-09-19.json
ledger     evidence/W4/negctl-w4g-ledger-2026-09-19.md
adjudic.   evidence/W4/negctl-w4g-adjudication-empty-2026-09-19.md

rows: contract 3 · universe 3 · ledger rows 2
universe tally: {"TOTAL":2,"PARTIAL":1,"ABSENT":0}

SET DIFFERENCES (G-1: both must be empty)
  contract ∖ universe-52 : ∅
  universe-52 ∖ contract : ∅

DISPOSITION CENSUS
  PENDING-ADJUDICATION   1
  declared-divergence    1
  identical              1
  (COHESION §0v carried: 1 cells over 1 rows)

POST-ADJUDICATION VOCABULARY (COHESION §0ab, E-w4f-1)
  DIVERGENCE-LEDGER §10 RETIRED rows: NC-DEAD
  bindings those retirements release: 1
        beta: NC-DEAD (§10, RETIRED)
  ADJUDICATION-W4.md §2 subsections: 0
        alpha                  UNRULED            publishes "PENDING-ADJUDICATION"

ADVISORY — `identical` rows a ledger row MENTIONS outside a subject field (tier 2, not fatal)
  (none)

SURFACE-WIDE ledger rows (no export named in any field): (none)

VERDICT: RED — 1 check(s) failed.

  [G] a carried cell that is not TERMINALLY RULED in ADJUDICATION-W4.md (COHESION §0ab) — 1
        alpha: carries GROUND-C×1, publishes PENDING-ADJUDICATION, and NO ADJUDICATION-W4.md §2.x rules it
```

**EXIT=1** — RED. Check **[G]**, one row, named.

---

## Control B — an UNRETIRED subject binding against an `identical` row: must read RED

The change from the base: row 3 `gamma` publishes `identical` while the fixture ledger's `NC-LIVE` row — which is NOT retired in §10 — names `gamma` as its subject. Check [E]'s teeth are unchanged for every LIVE row; only the RETIRED binding died.

⟨cmd⟩ `node scripts/seam-contract-check.mjs evidence/W4/negctl-w4g-contract-B-live-binding-2026-09-19.md evidence/W4/negctl-w4g-universe-2026-09-19.json evidence/W4/negctl-w4g-ledger-2026-09-19.md evidence/W4/negctl-w4g-adjudication-2026-09-19.md`

```
X.P.W4.a — SEAM-CONTRACT cross-check (G-1)
==============================================================================
contract   evidence/W4/negctl-w4g-contract-B-live-binding-2026-09-19.md
universe   evidence/W4/negctl-w4g-universe-2026-09-19.json
ledger     evidence/W4/negctl-w4g-ledger-2026-09-19.md
adjudic.   evidence/W4/negctl-w4g-adjudication-2026-09-19.md

rows: contract 3 · universe 3 · ledger rows 2
universe tally: {"TOTAL":2,"PARTIAL":1,"ABSENT":0}

SET DIFFERENCES (G-1: both must be empty)
  contract ∖ universe-52 : ∅
  universe-52 ∖ contract : ∅

DISPOSITION CENSUS
  declared-divergence    1
  identical              2
  (COHESION §0v carried: 1 cells over 1 rows)

POST-ADJUDICATION VOCABULARY (COHESION §0ab, E-w4f-1)
  DIVERGENCE-LEDGER §10 RETIRED rows: NC-DEAD
  bindings those retirements release: 1
        beta: NC-DEAD (§10, RETIRED)
  ADJUDICATION-W4.md §2 subsections: 1
        alpha                  §2.1               publishes "declared-divergence"

ADVISORY — `identical` rows a ledger row MENTIONS outside a subject field (tier 2, not fatal)
  (none)

SURFACE-WIDE ledger rows (no export named in any field): (none)

VERDICT: RED — 1 check(s) failed.

  [E] a row whose disposition contradicts a LIVE DIVERGENCE-LEDGER.md row — 1
        gamma: disposition "identical" vs DIVERGENCE-LEDGER rows NC-LIVE
```

**EXIT=1** — RED. Check **[E]**, one row, named. Note row 2 `beta` publishes `identical` beside the RETIRED `NC-DEAD` in the SAME run and is NOT reported: that is the ruling (§0ab) and the control together, in one reading.

---

## Control C — a disposition id ABSENT from the ledger: must read RED

The change from the base: row 3 `gamma`'s disposition names `NC-GHOST` — an id that is neither a fixture-ledger row nor a COHESION §0w ruled class. This is §0ab's third named control.

⟨cmd⟩ `node scripts/seam-contract-check.mjs evidence/W4/negctl-w4g-contract-C-ghost-id-2026-09-19.md evidence/W4/negctl-w4g-universe-2026-09-19.json evidence/W4/negctl-w4g-ledger-2026-09-19.md evidence/W4/negctl-w4g-adjudication-2026-09-19.md`

```
X.P.W4.a — SEAM-CONTRACT cross-check (G-1)
==============================================================================
contract   evidence/W4/negctl-w4g-contract-C-ghost-id-2026-09-19.md
universe   evidence/W4/negctl-w4g-universe-2026-09-19.json
ledger     evidence/W4/negctl-w4g-ledger-2026-09-19.md
adjudic.   evidence/W4/negctl-w4g-adjudication-2026-09-19.md

rows: contract 3 · universe 3 · ledger rows 2
universe tally: {"TOTAL":2,"PARTIAL":1,"ABSENT":0}

SET DIFFERENCES (G-1: both must be empty)
  contract ∖ universe-52 : ∅
  universe-52 ∖ contract : ∅

DISPOSITION CENSUS
  declared-divergence    2
  identical              1
  (COHESION §0v carried: 1 cells over 1 rows)

POST-ADJUDICATION VOCABULARY (COHESION §0ab, E-w4f-1)
  DIVERGENCE-LEDGER §10 RETIRED rows: NC-DEAD
  bindings those retirements release: 1
        beta: NC-DEAD (§10, RETIRED)
  ADJUDICATION-W4.md §2 subsections: 1
        alpha                  §2.1               publishes "declared-divergence"

ADVISORY — `identical` rows a ledger row MENTIONS outside a subject field (tier 2, not fatal)
  (none)

SURFACE-WIDE ledger rows (no export named in any field): (none)

VERDICT: RED — 2 check(s) failed.

  [F] a disposition naming an id that is neither a ledger row nor a ruled class — 1
        gamma: unknown id `NC-GHOST`

  [I] a ledger row bound to an export that the contract's row does not name — 1
        gamma: ledger row NC-LIVE is not named in its disposition
```

**EXIT=1** — RED. Check **[F]** fires on the ghost id, and **[I]** fires beside it because the one cell that named `NC-GHOST` no longer names the live `NC-LIVE` row it is bound to. One changed cell, two true readings; neither is a false positive.

---

## The reading, in one table

| run | fixture | the one changed cell | verdict | exit | check |
|---|---|---|---|---|---|
| 0 | base | (none — the positive control) | **GREEN** | 0 | — |
| A | contract-A | row 1 publishes `PENDING-ADJUDICATION`, nothing rules it | **RED** | 1 | **[G]** |
| B | contract-B | row 3 publishes `identical` beside the LIVE `NC-LIVE` | **RED** | 1 | **[E]** |
| C | contract-C | row 3 names the ghost id `NC-GHOST` | **RED** | 1 | **[F]** (+ [I]) |

**All three §0ab controls fire.** The cure removed two FALSE readings — a binding against a ledger row whose premise the producer falsified (§10 RETIRED), and §0v's pre-adjudication rider applied to cells `ADJUDICATION-W4.md` has terminally ruled — and removed no TRUE one. That is the whole of E-w4f-1.
