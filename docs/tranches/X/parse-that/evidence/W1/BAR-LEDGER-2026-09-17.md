SERVED MODEL: claude-opus-5[1m]

# BAR LEDGER — 2026-09-17 — the two planes, the restated budgets, and the bar that is not set here

**Authored by** X.P.W1 unit `.e` under `docs/tranches/X/parse-that/waves/W1.md` §5.e (L306–345),
gates **G-6** (L500–513) and **G-7** (L515–527), with **G-8** (L529–542) re-run and pasted below.
**Dated and append-never-rewrite (M-22 ¶5 / E-3).** Every correction to this file is a dated addendum
beside; nothing above a dated block is edited.

**What this file is.** A published ledger of measured ratios and restated arithmetic, handed to the
owner as the _input_ to a ruling. **What it is not.** A ruling. No bar is set by this file. No cell of
Plane B carries a pass/fail mark, no table here prints a ✓/✗ column, and no sentence here says of
Plane B that anything "passes" or "fails".

**L-16 labelling.** Every measurement below carries its evidence mode — **SOURCE** (read from bytes on
disk), **API-TEST** (a probe that imports and calls), or **BENCH-PROCESS** (a timing cell in its own
process). None is labelled a proof of a product.

**Machine record for every timing figure cited** (unit `.d`'s run, this seat's clock):
node **v26.0.0** · **Darwin arm64** · **Apple M5 Max** · macOS **26.4.1** · V8
**14.6.202.33-node.19**. **N = 1**: one machine, one build, one clock.

---

## 0. THE SEPARATION RULE — read this before either plane

There are **two** planes in this program and they measure different things against different
denominators. They are **never** merged in a table, in a summary, or in a close sentence (G-7).

|                     | **Plane A**                                                                       | **Plane B**                                            |
| ------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------ |
| subject             | the CSS parser **as a drop-in** for published `@mkbabb/value.js@4.0.0`            | **parse-that runtime uplift** (the M2 law families)    |
| unit of measure     | a **ratio** between two engines on one corpus, per leg                            | a **budget in µs** against a fixed native floor        |
| denominator         | the published 4.0.0 engine's own median, per leg                                  | the conservative reconstruction **1,636,680 µs**       |
| ruled bar           | **CC-095's** three-leg bar — ruled, **home X-W9**, applicability here unconfirmed | **none ratified**                                      |
| what this wave does | records the format, flags the applicability question                              | publishes the arithmetic, marks every cell owner-gated |

**A number from one plane is never a verdict on the other.** A Plane-A ratio of `0.26×` says nothing
about a Plane-B budget in microseconds, and a Plane-B headroom of `233,677 µs` says nothing about
whether a parser is an acceptable drop-in.

---

## 1. PLANE A — value-side drop-in (the CSS parser vs published `@mkbabb/value.js@4.0.0`)

### 1.1 The bar, attributed

**CC-095 retired OC-1 with a ruled successor.** The successor is **G7's interleaved three-leg bar**,
published as a table, with no speed claim beyond it:

| leg      | CC-095's ruled condition |
| -------- | ------------------------ |
| accepted | **≥ 0.9×** published     |
| reject   | **≥ 0.6×** published     |
| R1       | **zero throws**          |

**Attribution, at the bytes** — _SOURCE_:

⟨cmd⟩ `grep -n "CC-095" docs/tranches/X/waves/W9.md`

```
402:| CC-095 | OC-1 (bench-bar recalibration) | RETIRE | superseded by G28's three-leg bar; the old single published-parser ratio is not published again |
```

⟨cmd⟩ `grep -n "G28 | Bench table" docs/tranches/X/waves/W9.md` → `W9.md:370`, whose cell reads
_"G7-successor interleaved three-leg bar, published as a table … Legs: accepted ≥0.9× published ·
reject ≥0.6× · R1 **zero throws**"_.

### 1.2 Its home is X-W9, and its applicability to X·P is an OWNER CONFIRMATION, not an assumption

**The ledger routes this bar to a different wave.** `W9.md:370` is X-W9's **G28** — value's
parser/library wave — and `W1.md` §10 declares the edge in its own words: X-W9 _"consumes CC-095's
ruled three-leg bar … This wave's ledger is an input to that wave's gate contract; neither blocks the
other."_

**This lane therefore adopts CC-095 as a REPORTING FORMAT only.** The three legs are the shape unit
`.d`'s bench prints — shared-accepted · reject-non-throwing · r1-throw-class — because keeping them
separate is the method's own argument (DEBT-2: averaging the legs hides the only axis on which the
incumbent regex engine genuinely wins).

> **OWNER CONFIRMATION SOUGHT (A-1).** _Does CC-095's ruled three-leg bar — accepted ≥ 0.9× · reject
> ≥ 0.6× · R1 zero throws — bind the X·P lane, or only X-W9?_ It is **not assumed to bind here** and
> is **not applied to any figure in this file**. The ledger records the question with the ratios
> beside it so the answer can be given on evidence.

### 1.3 The three legs, measured — recorded, not adjudicated

_BENCH-PROCESS._ Unit `.d`'s run, `<p2>/harness/bench/bench.ts`, 40 rounds, first 10 discarded, median
of the scored rounds, cells interleaved, one fresh process per cell with `PACKRAT_ARMED` read from the
installed dist and asserted false at entry **and** exit. `×published` is the leg's own ratio against
published 4.0.0.

| leg                 | engine          | ns/call | spread% | `×published` |
| ------------------- | --------------- | ------: | ------: | -----------: |
| shared-accepted     | published-4.0.0 |  2085.1 |    11.9 |  1.000 (ref) |
| shared-accepted     | c14             |  8010.7 |    37.6 |        0.260 |
| shared-accepted     | deposed         |  2251.7 |     8.4 |        0.926 |
| reject-non-throwing | published-4.0.0 |   146.8 |    12.6 |  1.000 (ref) |
| reject-non-throwing | c14             |   801.5 |    26.7 |        0.183 |
| r1-throw-class      | published-4.0.0 | 18960.8 |     6.9 |  1.000 (ref) |
| r1-throw-class      | c14             |    63.8 |     5.3 |      297.366 |

**The r1 row's `×297` is two different behaviours timed, not one behaviour compared.** Published
4.0.0's `parseCssColor` **throws** on 102 of the 172 degenerate items; c14 returns a refusal on all 172. The harness prints that disposition line beneath the figure, and this ledger repeats it here
rather than letting the ratio travel alone.

**No verdict is issued on these rows**, because A-1 above is unanswered and because §3a's _"any
pressure to set the bar"_ trigger is armed against exactly that move.

### 1.4 The R1 leg's third condition, measured — _see §4 (G-8)_

CC-095's third leg is **R1 zero throws**. Measured at this seat's clock: **324 throws / 1,548 calls**,
exit **1**. That condition is **not met today**, which is the state G-8 exists to record.

---

## 2. PLANE B — parse-that runtime uplift (the M2 law families)

### 2.1 Corpus state of the bar — zero ratified bars bind this lane

| family         | state                       | source       |
| -------------- | --------------------------- | ------------ |
| **≥ 10×**      | **RETIRED AS LAW**          | handoff §3.1 |
| **strict 3×**  | **`0/5` OPEN — UNRATIFIED** | handoff §3.1 |
| **strict 2×**  | **`0/5` OPEN — UNRATIFIED** | handoff §3.1 |
| **break-even** | **`0/5` OPEN — UNRATIFIED** | handoff §3.1 |

The parser band's own G7 line reads _"Bar (pending OC-1 recalibration)"_ — the adjudication itself
declined to close it.

### 2.2 COHESION §0j.E OC-1 — the owner's word of 2026-09-17, quoted, and what it does NOT do

> **OC-1 (OP-3) — ADMISSION IS DECIDED ON CORRECTNESS; the bench table is RECORDED-NOT-GATING**, with
> the LIVE regex numbers held as the _recorded ceiling_ the GATE-VERDICT proposal names — never a
> floor, never a veto, never an invented standard. RC-P conjunct 5 evaluates TRUE on this word once
> the three-leg table is recorded at X.P.W3.

**Read exactly.** OC-1 decouples **admission** from the bench. It **ratifies no bar.** It does not
close strict-3×, strict-2× or break-even; it does not convert a measured ratio into a verdict; and it
is not a licence for this ledger to mark any cell anything but owner-gated. Consequence, stated so no
successor misreads it: **every Plane-B pass/fail cell below reads `OWNER-GATED-PENDING-RATIFICATION`,
and §3a's bar trigger stays armed.**

### 2.3 The denominator: `1,870,633 µs` is UNPROVEN; `1,636,680 µs` is what every budget restates against

_SOURCE._ **M-22 ¶4** requires every 3×/2× budget to restate against the conservative reconstruction
**1,636,680 µs** until `P4-EVIDENCE-REPLAY.json` is readable. **CC-097** records that the claimed
`1,870,633 µs` has **no primary receipt**, does not reproduce under the rule that reproduces its three
sibling profiles, and that its derived headroom figures are **UNCITABLE until restated**.

Measured relation between the two denominators — ⟨cmd⟩ `node -e` over the two figures:

```
(1,870,633 − 1,636,680) ÷ 1,636,680 = 0.142944  →  the published denominator is +14.3% overstated
```

reproducing provenance finding **F-1**'s stated overstatement to the digit.

### 2.4 THE FOUR BUDGETS, RESTATED — against `1,636,680 µs` and the fixed native floor `311,883 µs`

Arithmetic shown in full. `budget = 1,636,680 ÷ k`; `headroom = budget − 311,883`.

| family              |   k | budget = 1,636,680 ÷ k | native matching + required products |                                   remaining headroom | bar                                  |
| ------------------- | --: | ---------------------: | ----------------------------------: | ---------------------------------------------------: | :----------------------------------- |
| historical `10×`    |  10 |         **163,668 µs** |                          311,883 µs | **−148,215 µs** (the floor is **1.906×** the budget) | **RETIRED AS LAW**                   |
| candidate `3×`      |   3 |         **545,560 µs** |                          311,883 µs |                                       **233,677 µs** | **OWNER-GATED-PENDING-RATIFICATION** |
| candidate `2×`      |   2 |         **818,340 µs** |                          311,883 µs |                                       **506,457 µs** | **OWNER-GATED-PENDING-RATIFICATION** |
| measured break-even |   1 |       **1,636,680 µs** |                          311,883 µs |                                     **1,324,797 µs** | **OWNER-GATED-PENDING-RATIFICATION** |

**There is no ✓/✗ column in this table, and there will not be one.** A pass/fail column _is_ the claim,
whatever a footnote says (G-7's falsifier). Nothing in this file states that Plane B passes or fails.

Each row re-derived independently — ⟨cmd⟩ `node -e` (_SOURCE_, double-run byte-identical):

```
R/10 = 163,668    headroom -148,215   floor/budget 1.9056x
R/3  = 545,560    headroom  233,677   floor/budget 0.5717x
R/2  = 818,340    headroom  506,457   floor/budget 0.3811x
R/1  = 1,636,680  headroom 1,324,797  floor/budget 0.1906x
```

### 2.5 CONSISTENCY NOTE (i) — the 10× conclusion STRENGTHENS under the reconstruction

This is what makes the restatement trustworthy rather than merely conservative: losing the premise
does not cost the conclusion, it sharpens it.

```
under the PUBLISHED denominator:       311,883 ÷ (1,870,633 ÷ 10) = 311,883 ÷ 187,063 = 1.66726  →  1.667×
under the RECONSTRUCTION:              311,883 ÷ (1,636,680 ÷ 10) = 311,883 ÷ 163,668 = 1.90558  →  1.906×
```

The 10× floor was **already impossible** at **1.667×** the budget on the figure that had no receipt;
on the reconstruction it is impossible at **1.906×**. **The conclusion strengthens**, exactly as
M-22 ¶4 states. `10×` is retired as law and this arithmetic is why retiring it costs nothing.

### 2.6 CONSISTENCY NOTE (ii) — the restated headrooms land 25.0% / 18.8% below the published pair, reproducing F-1 to the digit

The published headroom pair is **derived from the UNPROVEN denominator** and is reproduced here for
**one purpose only** — as the superseded basis against which the restatement is checked. It is
**UNCITABLE as a budget** (CC-097) and is **not this lane's budget**; §3 below states that reading
with its measurement.

```
derivation of the superseded pair (UNCITABLE AS A BUDGET — shown only as the check's basis):
    (1,870,633 ÷ 3) − 311,883 = 623,544 − 311,883 = 311,661 µs
    (1,870,633 ÷ 2) − 311,883 = 935,317 − 311,883 = 623,434 µs

the independent arithmetic check:
    3×:  (311,661 − 233,677) ÷ 311,661 = 0.250221  →  25.0% below
    2×:  (623,434 − 506,457) ÷ 623,434 = 0.187633  →  18.8% below
```

**25.0% and 18.8%** are exactly the overstatement percentages provenance finding **F-1** states for
the published 3×/2× headrooms. The reconstruction and F-1 were derived independently and they agree
**to the digit** — which is the check, not a coincidence to be admired.

**The arithmetic error this check exists to catch** is restating the budgets while silently keeping
the published headrooms. Done that way the 3× row would read `545,560 / 311,661` — internally
inconsistent, and caught here by construction.

---

## 3. Q-2 — the OPERATIVE READING of G-6's falsifier, with its measurement

**G-6's falsifier, verbatim**: _"cite `623,544` or `935,317` as this lane's budget anywhere and the
gate goes red; CC-097's word is that those figures are **UNCITABLE until restated**."_

**Read with no qualification at all, the falsifier is tripped by the immutable specs themselves.**
Measured at this seat's clock — _SOURCE_, ⟨cmd⟩ `grep -rln` over `docs/tranches/X/`:

| figure      | files carrying the string, 2026-09-17                                                                     |
| ----------- | --------------------------------------------------------------------------------------------------------- |
| `623,544`   | `parse-that/waves/W1.md` · `execution/D/X-P-W1.md` · `execution/LEDGER.md`                                |
| `935,317`   | `parse-that/waves/W1.md` · `execution/D/X-P-W1.md` · `execution/LEDGER.md`                                |
| `187,063`   | `parse-that/waves/W1.md` · `W2-fable-author.md` · `W2-opus-author.md` · `W3.md` · `execution/D/X-P-W1.md` |
| `1,870,633` | `parse-that/waves/W1.md` · `W3.md` · `waves/W9.md` · `execution/D/X-P-W1.md` · `execution/LEDGER.md`      |

**In every one of those occurrences the figure is cited in order to FORBID it.** `W1.md` §2c names
`1,870,633 µs` as UNPROVEN; `W9.md:370` names the `311,661 / 623,434` headrooms UNCITABLE; the
execution record and the ledger quote the same prohibition. These are **dated specs and dated
records, immutable under E-3** — deleting the strings would be editing a pinned authority, which the
epoch rule prohibits, and is refused in advance rather than negotiated.

> **THE OPERATIVE READING, stated rather than silently narrowed.** G-6's falsifier binds the phrase
> **_"as this lane's budget"_**. It is tripped by a **lane artifact that publishes a
> `1,870,633`-derived figure as its own budget or its own headroom**. It is **not** tripped by a
> document that quotes the figure in order to mark it unproven, nor by this file's §2.6, which
> reproduces the superseded pair **labelled as superseded, inside the check that supersedes it**.

**Measured against that reading**: **zero** lane artifacts publish a `1,870,633`-derived headroom as
their own figure. This file's own budgets and headrooms are, in every row, `1,636,680`-derived.

---

## 4. G-8 — R1 TOTALITY, RE-RUN AND PASTED AT THIS SEAT'S CLOCK

_API-TEST._ The probe is **unmodified**; it `npm pack`s **this repository** into an OS `mkdtemp`
directory and `rmSync`s it, writing **no repository byte**. Run **unpiped**, stdout and stderr to
separate files, so `$?` is the probe's own (**L-2**).

⟨cmd⟩ `node docs/tranches/V/megatranche/audit/probes/r1-published-totality.mjs`

```
RED  parseCssColor             102/172 throw
RED  parseCssScalar            102/172 throw
RED  parseCssValue              60/172 throw
RED  parseCssValues             60/172 throw
ok   parseKeyframeSelector       0/172 throw
ok   parseStylesheet             0/172 throw
ok   parseTimingFunction         0/172 throw
ok   parseAnimationTimeline      0/172 throw
ok   parseAnimationRange         0/172 throw

TOTAL 324 throws / 1548 calls
DISTINCT FAILURE MODES: 1
  324x  TypeError: Cannot read properties of undefined (reading 'replace')

RED — 324 totality violations. A ParseResult-returning parser must not throw.
```

**`EXIT=1`** · stderr **190 B**, entirely node's own `[DEP0205] module.register() is deprecated`
deprecation warning, not probe output. **Double-run**: `EXIT=1`, stdout ⟨`diff`⟩ **IDENTICAL**.
**Gate 27** ⟨`git status --porcelain -- src api demo test e2e`⟩ → **0 lines** after both runs — the
probe wrote nothing.

**Nine parsers targeted; four RED, five ok.** `parseCssColor` at **102/172** reproduces the parser-band
adjudication's re-confirmed reading to the digit, and the header's `324 / 1,548` reproduces at today's
HEAD — a fresh reading, never a pasted count from another HEAD (**L-3**).

**G-8's own state, stated honestly.** The gate is titled **_"R1 TOTALITY, RED TODAY"_** and its GREEN
condition is _"zero throws, exit 0"_. That condition is **NOT met**, and it **cannot** be met inside
this wave: `W1.md` §3 (L109) reads _"No grammar is written, no candidate is implemented"_, and the
gate's own falsifier says it _"stays wired until the whole surface is total"_, a colour-only cure
leaving it red **by intent**. **This wave's obligation under G-8 is its MEASURE-AT-OPEN clause —
re-run and paste — and that obligation is DISCHARGED above.** The probe's verdict stands **RED**, as
the gate's title says it should, and the gap is returned to the wave's close rather than dressed as a
green.

**R1 is also Plane A's third leg** (§1.4) and the third leg of unit `.d`'s bench. Its price is
measured there: published 4.0.0's throwing path costs **18,960.8 ns/call** against c14's returning
refusal at **63.8** — and the bench's independent count of published 4.0.0's throws on the same
degenerate cross-product is **102/172**, the probe's own figure reproduced by a second instrument.

---

## 5. GATE READINGS — BEFORE → AFTER

### G-6 — EVERY BUDGET RESTATED

**BEFORE (RED).** The wave's open measured it: the restatement lived in **dated specs only**, never in
a lane artifact, and ⟨`ls docs/tranches/X/parse-that/evidence/W1/`⟩ returned
`No such file or directory`.

**The RED baseline's own arithmetic has drifted since 2026-08-03, and the drift is restated here**
(the wave's open banked this as **F-2**). The spec's baseline reads _"`grep -rn "1,636,680"
docs/tranches/X/` returns **nothing**"_. Measured at this seat's clock, _SOURCE_, double-run:

```
⟨cmd⟩ grep -rn "1,636,680" docs/tranches/X/ | wc -l     →  38   (double-run 38)
```

across **nine** files: `CONFORMANCE-2026-08-03.md` 2 · `parse-that/waves/W1.md` 10 ·
`W2-fable-author.md` 5 · `W2-opus-author.md` 6 · `W2.md` 5 · `W3.md` 4 · `W4.md` 1 · `waves/W9.md` 2 ·
`execution/D/X-P-W1.md` 3. The wave's open read **35 / 8 files**; the delta is the execution record
itself, written between the two clocks. **Every one of the nine is a dated spec or a dated execution
record. Not one was a lane artifact** — which is why the gate was RED on its GREEN condition and not
merely on its baseline.

**AFTER (GREEN).** This file is the lane artifact. §2.4 publishes all four rows with the arithmetic
shown; §2.5 and §2.6 carry **both** consistency notes and both independent checks (1.667× → 1.906×;
25.0% / 18.8% reproducing F-1 to the digit); §3 states the operative reading of the falsifier with
its measurement; and **no budget or headroom in this file is `1,870,633`-derived**.

### G-7 — THE BAR IS OWNER-GATED, AND SAYS SO

**BEFORE (RED).** No bar ledger existed in this lane; zero ratified bars bound it.

**AFTER (GREEN)**, clause by clause — measured against this file's own settled bytes:

| G-7 clause                                                                                     | reading AFTER                                                                                                                          | how it is checked                                                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _"every pass/fail cell on Plane B reads `OWNER-GATED-PENDING-RATIFICATION`"_                   | §2.4's three open families each carry that mark in their `bar` cell; the fourth reads `RETIRED AS LAW`                                 | ⟨`grep -c '^\| candidate .*OWNER-GATED-PENDING-RATIFICATION\|^\| measured break-even.*OWNER-GATED-PENDING-RATIFICATION'`⟩ → **3**. Every other occurrence of the string in this file is prose _stating_ the mark — §2.2, this row, §6's B-1 — never a judgement cell                                                                                                 |
| _"Plane A's bar is attributed to CC-095 with its applicability to this lane flagged"_          | §1.1 attributes it at the bytes; §1.2 raises **A-1** as an owner confirmation                                                          | the attribution is a pasted `grep`, not a citation from memory                                                                                                                                                                                                                                                                                                       |
| _"the two planes are never merged in a table, a summary, or a close sentence"_                 | §0 states the rule; §1 and §2 are disjoint sections with disjoint units of measure; **no table in this file contains a row from both** | every table is inside one plane's section, or is §0's explicit contrast of the two                                                                                                                                                                                                                                                                                   |
| _falsifier_: any sentence of the form _"the bench passes"_ / _"the bench fails"_ about Plane B | **none exists as a claim**                                                                                                             | ⟨`grep -c 'the bench passes'`⟩ → **1** and ⟨`grep -c 'the bench fails'`⟩ → **1**; **both hits are this row**, quoting the forbidden forms in order to forbid them — the same reading §3 takes of G-6's falsifier. Stated rather than hidden behind a narrower regex                                                                                                  |
| _falsifier_: a ✓/✗ column for Plane B                                                          | **no column and no data cell carries one**                                                                                             | ⟨`grep -c '✓\|✗'`⟩ → **3 lines**, and all three are named: this row, §2.4's _"there is no ✓/✗ column"_ sentence, and the preamble's _"no table here prints a ✓/✗ column"_. **Zero** are a column header or a data cell — the `bar` column of §2.4 is the only judgement column in this file and its four cells are the three owner-gated marks plus `RETIRED AS LAW` |
| _converse falsifier_: refusing to publish ratios for want of a bar                             | **ratios published** — §1.3's seven rows, §2.4's four budgets                                                                          | measurement is owed; adjudication is not                                                                                                                                                                                                                                                                                                                             |

**Consumer named (L-19)**: the **owner**, who is handed the inputs to a ruling — not a ruling wearing
his signature.

---

## 6. WHAT THIS LEDGER OWES THE OWNER — the open confirmations, collected

Neither is resolved here; both are recorded with their measurement so the answer can be given on
evidence.

| id      | question                                                                                                                                         | state                                                                                                   |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| **A-1** | Does CC-095's ruled three-leg bar (accepted ≥ 0.9× · reject ≥ 0.6× · R1 zero throws) bind **X·P**, or only its ruled home **X-W9**?              | **OPEN.** Adopted here as a reporting format only; applied to no figure                                 |
| **B-1** | Plane B's **strict-3× / strict-2× / break-even** are each `0/5` OPEN and UNRATIFIED. Does any of them become law, and against which denominator? | **OPEN.** §0j.E OC-1 ratifies none of them; §2.4's cells stay `OWNER-GATED-PENDING-RATIFICATION`        |
| **B-2** | `P4-EVIDENCE-REPLAY.json` would settle F-1 and let the denominator question close on a primary receipt.                                          | **NOT READ BY THIS WAVE.** M-22 ¶4's restatement exists precisely so the budgets are citable without it |

---

## 7. WHAT THIS LEDGER DOES NOT PROVE

It sets **no bar** and issues **no verdict**. It makes **no speed claim outside the printed tables**.
Its Plane-A ratios are **N = 1**, one machine, one build, one clock, a same-process hot loop within
each cell; absolute ns/parse is **not portable across runs** — the wave's open measured the same
unarmed subject at **56.4** then **58.0** ns/parse against **55.6** in the spec and **93.9** in O-15,
which is why ratios between interleaved cells of one process-set are what is published. It measures
**engines, not grammars**: no grammar is written by this wave and no candidate is implemented. And it
does **not** advance the X·P release condition — it builds the instrument by which that condition
will later be judged.
