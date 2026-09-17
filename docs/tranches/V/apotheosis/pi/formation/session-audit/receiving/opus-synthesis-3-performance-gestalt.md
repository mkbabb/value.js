# S3 — PERFORMANCE / GESTALT SYNTHESIS

**Seat:** S3, synthesis adjudicator 3 of 3, V·π receiving audit.
**Axis:** benchmark credit, process economy, progress, risk, convergence.
**Subject:** the unchanged frozen tranche at `receiving/AUDIT-SUBJECT.json` — value.js HEAD
`c654824e0b252cda7f8490b67f182a48c48cc0ed`, branch `tranche-u`, 2,324 files / 354,220,932 bytes,
`trackedFilesInHead: 0`, `entirelyUntracked: true`.
**Standing:** I authored no byte of the subject and no byte of any skeptic report. My only write is
this file. No subject byte was edited.

---

## Model receipt

- **Model identifier I observe myself to be:** `claude-opus-5[1m]`, declared to me by the harness as
  "Opus 5 (1M context)". Effort: high.
- **Qualifier, stated because this tranche's own row A13 demands it of every model label:** that
  identifier is a harness declaration I can read *about* myself. I have no introspection channel
  equivalent to the Codex `turn_context` records the skeptics audited, so I cannot produce a
  served-model receipt. All five skeptics recorded the identical limitation. Five seats reporting
  the same gap is evidence about the *harness*, not about the seats: `AUDIT-BRIEF.md` §2 requires
  "the actual served model identifier" and supplies no mechanism to capture one. That is a defect in
  the brief, and it must be fixed at the spawn layer.
- **Nothing below depends on my identity.** Every number I report is a command with a pasted result,
  re-runnable by anyone on this tree.

---

## 0. What I executed before ruling

The LAW binds me to dispositions supported by the frozen subject and the reports. Where the skeptics
disagreed on a **measurement**, I did not adjudicate by preference and I did not count votes — I
re-measured, and then I measured the measuring instruments.

| # | action | result |
|---|---|---|
| 1 | Recomputed every ratio in `apotheosis/parser-proof/bench-results.json`, two independent ways | gate-ratio route: live/c14 **1.7684** (value-common), **2.3482** (sheet-common); MB/s-peak-median route: **1.7860** / **2.3083**; live/deposed **1.8668** / **1.8472**. `verdict_all_runs` = RED×5; c14 sheet 0.05369129530077819 < 0.1000 |
| 2 | Read `gate.calibration_crosscheck` in that same file | the **deposed calibration subject itself** undershoots both floors on this machine (0.0464 value / 0.0971 sheet); the file ends `"Absolute-bar transfer to this environment: OWNER-CONFIRM."` |
| 3 | `git show 9aedfc50^:src/parsing/utils.ts` vs `g7/authorities/historical-utils.ts` | **0-line diff — BYTE-IDENTICAL.** `9aedfc50` = `perf(O.W6): SOTA hot-path rewrites — byte-loop scanners`; its diff carries `-export const number = regex(/-?…/).map(Number)` / `+export const number = numberFastParser` |
| 4 | Ran the shipped `dist/subpaths/css.js` | `parseCssColor("oklch()"/"rgb()"/"lab()")` **THROW TypeError**; `parseKeyframeSelector("101%")` and `("exit 101%")` return **ok:false** — the recorded `liveOk:true` is false; `("entry")` returns ok:true; `("scroll 50%")` returns ok:false |
| 5 | Read `g16/bench/benchmark.mts:155–181` | confirmed: `h2` returns `state.value` directly; `deposed` pays `source.slice` + `.includes` + `/[eE]/.test` + an object literal **per operation** |
| 6 | **New 5-lane replication** (all lanes constructed in one module) + semantic preflight against G16's frozen corpus, sha **`084d40cceed3cce481e23cbac1ca288c2af2899fad515dc948115c0aed9fd46b`** verified | **64/64 on exact `end`/`sign`/`type`/binary64 bits for all five lanes**, including the null lane |
| 7 | **G16's own declared estimator replicated exactly**: 30 fresh children × 12 paired blocks × 5,000 full-corpus reps, `d_r` = mean of 12 `ln(A/B)`, inference `mean + 1.6991270265·sd/√30` | §2.1 — five pairs, including a **same-vs-same null control that no harness in the subject ever ran** |
| 8 | Re-ran **O5's own harness** (`o5-replay.mts`, recovered intact), pairwise, 6 runs | reproduces O5's published direction exactly |
| 9 | Added a null lane to a **copy** of O5's harness; ran 6× forward and 4× with lane order reversed | §2.2 — the decisive result |
| 10 | Mechanism probe under `tsx`: identical parser bytes **imported** vs **constructed in-module**, my paired estimator, 20 children | §2.3 — the mechanism, quantified |
| 11 | Ledger arithmetic over all 2,324 rows of `audit-subject-ledger.tsv` (my own Python) | §3.1 — reproduces O2 and O5 to the byte |
| 12 | Envelope census over all 3,283 rows of `raw-agent-envelopes/*.jsonl`; structural probe of one ciphertext row and one plaintext row; seat-name/timestamp census | §2.6 — a **correction to O1** |
| 13 | Read `FEATURE-LEDGER.md` §1/§3 and `HANDOFF-2026-07-24.md` §11/§12/§13 | §3.2, §5 |
| 14 | Checked whether `parser-proof/` is inside the frozen subject | **It is not.** `grep -c parser-proof audit-subject-ledger.tsv` → **0**; it lives at `docs/tranches/V/apotheosis/parser-proof/`, a *sibling* of `pi/` |

**Read in full on disk:** all five skeptic reports (5,346 lines); `HANDOFF-2026-07-24.md` §11–§14;
`FEATURE-LEDGER.md` §1–§3; `AUDIT-BRIEF.md`; `AUDIT-SUBJECT.json`; `g16/bench/benchmark.mts`,
`benchmark-manifest.json`, `corpus.json`; `parser-proof/bench-results.json`; `o5-replay.mts`.
**Not read:** `ADDENDA-06` (333,616 B); the 255 MB `denominator/` payloads beyond size and rejection
metadata; the 2,862 root agent messages. Nothing below depends on the unread bytes.

---

## 1. (a) Is there ANY defensible performance claim in this tranche?

### Ruling: YES — exactly one, and it runs *against* the replacement. There is not one defensible POSITIVE performance claim anywhere in V·π.

**DEFENSIBLE — the 2026-07-20 parser-proof *relative* gap.** On identical corpora, under one
harness, with a uniform esbuild build, **value.js's shipping regex parser is 1.77×–2.35× faster than
both combinator engines** (`c14` and the parse-that `deposed` engine). I recomputed it two
independent ways (§0 item 1) and both agree. `GATE-VERDICT.md` F-4's "≈1.8× both combinator engines"
is exact for the value corpus and *understates* the sheet corpus, where the gap is 2.31×–2.35×.

This claim survives every objection I can construct, for one structural reason the rest of the record
lacks: **the effect is 77–135%, and the largest harness-sensitivity floor I measured anywhere in this
audit is 11%** (§2.2). It needs no floor, no peer selection, no adapter, and no null calibration to
survive. It is the only performance number in the picture that is robust by *margin* rather than by
*construction*.

**Three corrections to how that claim has been carried — against O5 and against project memory:**

1. **The absolute-floor verdict is NOT citable; only the relative gap is.**
   `bench-results.json`'s own `gate.calibration_crosscheck` records that on this machine the
   *deposed calibration subject itself* undershoots both floors (0.0464 value / 0.0971 sheet),
   because the bars were calibrated on a Vite-built dist and a slower reference box, and it ends
   `"Absolute-bar transfer to this environment: OWNER-CONFIRM."` A gate whose own calibration
   subject fails it certifies nothing about the assay. O5-F09 presents `0.0537 < 0.1000 → RED` as
   settled and does not surface this. That is a **correction to O5**, not a refutation of its
   arithmetic, which is exact.
2. **The RED is not uniform.** c14 **meets** the value floor (0.06399 ≥ 0.0500) and fails only the
   sheet floor. "RED on all five invocations" is true of the composite verdict and false as a
   statement about both scenarios.
3. **This measurement is outside the frozen subject.** `parser-proof/` is a sibling of `pi/`, not a
   child; it appears **zero times** in the 2,324-row subject ledger. The single defensible
   performance claim in the whole picture was never covered by this audit's own freeze. That is a
   scoping defect no skeptic stated, and `ADDENDA-09` must record it.

**DEFENSIBLE — four *negative* claims, all correctly labelled by the tranche itself:**

- percentage v2: candidate **21.1% slower** than the operation-equivalent live regex kernel,
  `status: FAIL`, retained on disk, reported to the owner verbatim. The single most honest benchmark
  in the tranche — and the one its own successors deleted.
- G14: all four candidates `FAIL_NOT_STRICTLY_FASTER_THAN_ALL_THREE_PEERS`.
- foundation G2/G4: `DIRECTIONAL_ONLY`; every external peer `NON_COMPARABLE`; `peer_win: false`.
- **New, from my own measurement:** the accepted candidate is slower than the byte-loop predecessor
  value.js actually retained — **4.3% on my null-corrected instrument, 7.3–8.8% on O5's after the
  same correction**. Direction corroborated by two independent instruments once both are calibrated.

**NOT DEFENSIBLE:**

| claim | where | why it fails |
|---|---|---|
| `"qualification": "PASS_STRICT_WIN"`, 7.07% | `g16/acceptance.json` | ~8.5 of the ~10 measured points are an adapter charged to the peer lane alone (§2.1); the peer is the wrong revision (§0 item 3); the residual ~3% is inside the sensitivity band of every harness that has measured it |
| "all four are decisively faster than LIVE regex" | G14 | specialized leaf vs `parseCssScalar`, the whole live dispatcher |
| "2.5× the live public parser" | percentage G2 | same substitution; the operation-equivalent lane that lost 21.1% was deleted from v3 and G2 |
| "strictly faster on every genuinely comparable retained peer lane" | `HANDOFF §13` | unsatisfiable at the current architecture; §4, §5 |
| any absolute-floor pass/fail | `CHARTER.md:49`, project memory | non-portable by the gate file's own admission; **OC-1** unruled and absent from every live document (O3-04 confirmed) |

---

## 2. The benchmark reconciliation — where I go beyond all five skeptics

G16 and O5 report **opposite signs** on the decisive comparison. The LAW forbids resolving that by
preference. So I built a third instrument — and then I did the thing neither G16, nor its 44
adversarial seats, nor O5 did: **I measured the instruments themselves against a null.**

### 2.1 My replication — G16's own estimator, all lanes constructed identically

Five lanes defined in one module, imported through one loader, all passing **64/64** of G16's frozen
corpus on exact `end`/`sign`/`type`/binary64 bits. Protocol verbatim from G16's manifest: 30 fresh
sequential children, 12 paired sample blocks (6 per order, seed-shuffled), 5,000 full-corpus
repetitions per lane per block, `d_r` = mean of 12 `ln(A/B)`, inference
`mean + 1.6991270265·sd/√30`. Node v26.0.0, Apple M5 Max.

| pair | geo-mean A/B | 95% upper | children favouring A | reading |
|---|---:|---:|---:|---|
| **`h2` / `h2b` — NULL CONTROL** (byte-identical lanes) | **1.0082** | 1.0158 | 11 / 30 | my instrument's own bias floor: **0.8%** |
| `h2` / `deposedG16` (G16's own pair) | **0.8968** | 0.9036 | 30 / 30 | reproduces and exceeds G16's 0.9293 |
| `h2` / `deposedFair` (same peer regex, symmetric construction) | **0.9681** | 0.9774 | 28 / 30 | h2 **3.2% faster** |
| `h2` / `byteLoop` (the true retained predecessor) | **1.0510** | 1.0738 | 10 / 30 | h2 **5.1% slower** |
| `deposedFair` / `deposedG16` (**the adapter, isolated**) | **0.9153** | 0.9208 | 30 / 30 | the adapter costs the peer **8.5%** |

The last row is the measurement nobody made, and it decomposes G16's result exactly:
`0.9681 × 0.9153 = 0.8861 ≈ 0.8968` measured. **Of the ~10 points G16 measured, ~8.5 are the adapter
and ~3.2 are the grammar.**

### 2.2 The null control that breaks O5's two BLOCKERs

I recovered O5's harness intact and re-ran it. It reproduces O5's published direction cleanly:
`h2/deposedFair` = **1.0563, 1.0439, 1.0207, 1.0508, 1.0440, 1.0452** — 6 of 6 above 1.0, h2 ~4.4%
slower, exactly as O5 reported.

Then I added one lane to a **copy** of that harness: `h2b`, a byte-identical reconstruction of the
promoted H2 bytes. Same regex, same `.map`, same leaf. It should measure 1.000.

```
O5's harness, h2 vs h2b — BYTE-IDENTICAL LANES:
  forward order    1.0503  1.0630  1.0514  1.1148  1.0962  1.0782    (6/6 > 1.0)
  ALL[] reversed   1.0686  1.0692  1.0804  1.0598                    (4/4 > 1.0)
```

**O5's harness reports a parser as 5.0% to 11.5% slower than an exact copy of itself, in 10 of 10
runs, in one direction, and reversing the lane order does not flip it.**

O5's headline — "h2 is 2.7% slower than a fairly built peer, all nine runs > 1.0" — is **smaller than
the null bias of the instrument that produced it.** So is my own re-run of it (4.4%). That finding is
not a measurement of the parsers.

### 2.3 The mechanism, isolated and quantified

The bias is not positional. It follows **module provenance**. O5's harness *imports* `h2` (and
`deposedNumber`) from the pinned `.ts` files through `tsx`, and *constructs* `deposedFair` and
`byteLoop` in-module. I tested that directly — identical parser bytes, imported vs in-module, under
`tsx`, with my paired estimator, 20 children:

```
tsx-IMPORTED / in-module, byte-identical parser:
  geo-mean 1.0556   sd 0.09102   95% upper 1.0934   18 of 20 children slower when imported
```

**A tsx-imported parser runs 5.6% slower than the same bytes constructed inside the harness module.**
That is larger than every effect O5 claimed against a locally-built peer, and it predicts O5's entire
result set:

- `h2` (imported) vs `deposedG16` (imported peer + adapter) → provenance-symmetric; the adapter
  dominates → h2 wins. ✅ real
- `h2` (imported) vs `deposedFair` (**local**) → import penalty → h2 "loses". ❌ artifact
- `h2` (imported) vs `byteLoop` (**local**) → import penalty inflates a real loss. ⚠️ direction real,
  magnitude inflated

G16's own harness imports **both** lanes from `.ts` through `tsx` (`benchmark.mts:10–12`), so it is
provenance-symmetric and its 7.07% is *not* an import artifact. It is an **adapter** artifact.

### 2.4 The reconciled numbers

Divide each measurement by its own instrument's null:

| comparison | mine (null 1.0082) | O5's (null 1.0706) | reconciled |
|---|---:|---:|---|
| `h2` vs fairly-built same-regex peer | 0.9681 → **0.960** | 1.0446 → **0.976** | **h2 is 2.4–4.0% FASTER.** Both instruments agree in sign once calibrated. O5's reversal is refuted. |
| `h2` vs true retained predecessor (`byteLoop`) | 1.0510 → **1.043** | 1.1484 → **1.073** | **h2 is 4.3–7.3% SLOWER.** Both instruments agree in sign. O5-F02's direction survives; its 15% magnitude does not. |
| G16's stated `PASS_STRICT_WIN` | — | — | **real, but ~85% of it is the adapter and the peer is the wrong revision.** |

### 2.5 What this means, stated as a law

**Every leaf-scale performance claim in V·π sits at or below the sensitivity floor of the instrument
that produced it, and not one of those instruments was ever null-calibrated.** Measured floors: 0.8%
(mine — paired, provenance-symmetric, 30 children) and 5–11% (O5's — single process,
provenance-mixed). The claims: 7.07% (G16), 2.7% (O5-F01), 8.4% (percentage G2), 21.1% (percentage
v2, single run). Only the last is comfortably outside a floor, and it points against the replacement.

This is stronger and more useful than "three harnesses, three answers." It is not that benchmarking
is hopeless — it is that **a benchmark without a null control is not evidence**, and 44 adversarial
seats, 1,608 lines of review prose, three adjudicators and one hostile skeptic all failed to run the
twenty-minute control that decides every one of these numbers.

### 2.6 A correction to O1, verified in my lens because it bounds what is auditable

O1-02 states as a BLOCKER that "all 3,283 envelopes are readable plaintext." My census:

```
bbnf-greenfield-coordination.jsonl   1577 rows   1049 with encrypted_content   528 without
value-tranche-v-formation.jsonl       886 rows    581 with encrypted_content   305 without
value-v-pi-refinement.jsonl           820 rows    410 with encrypted_content   410 without
TOTAL                                3283 rows   2040 with encrypted_content  1243 without
```

Structural probe: `MESSAGE` envelopes carry only a 73–97-character routing stub in
`content[0].text` and their payload is ciphertext in `encrypted_content`; `FINAL_ANSWER` envelopes
carry plaintext. **62.1% of the corpus is genuinely opaque**, exactly as the coverage ledger and
O3-16 record. O1's *headline* is wrong; O1's *consequence* — that the handoff's blanket
`ENCRYPTED_UNMATERIALIZED` class over-broadly exempts readable subagent findings from audit —
**stands, at 1,243 rows rather than 3,283, and remains BLOCKER-grade.**

I also ran the seat census the independence claims rest on. Every subagent author name in the V·π
session is **distinct**; `g16_synth_{semantic,architecture,performance}` emit at 22:30–22:31 and the
next feature's seats (`percentage_skeptic_*`) are differently named and emit at 22:52. O2-31's
finding of 760 distinct (session, author) pairs with no name recurrence holds. **Name-level
distinctness is real and is not the same as context independence** — all seats are same-root,
same-provider subagents on root-curated inputs, which is O2-10's own caveat and I affirm it.

---

## 3. (b) The honest progress fraction against a defensible denominator

### 3.1 The numerator, verified by me

```
my own aggregation over all 2,324 ledger rows
total                                     354,220,932 B
denominator/            157 files         255,457,954 B   72.12%   (8 generations, ALL zero-credit)
mirror/node_modules/  1,150 files          79,477,119 B   22.44%   (vendored)
raw session archives     10 files           9,251,900 B    2.61%
mirror/cells/           557 files           5,851,494 B    1.65%
root governance docs    161 files           3,337,253 B    0.94%
mirror/prototypes/      184 files             470,116 B    0.13%
mirror/ other            99 files             369,316 B    0.10%
mirror/apotheosis/ ← ACTIVE ROOT  6 files       5,780 B    0.0016%
  of which the accepted parser    1 file          560 B    0.00016%

occurrence-owner-formation-v2.json  69,589,449 B
occurrence-owner-formation-v3.json  69,590,643 B   ← together 39.29% of the tranche, BOTH REJECTED
total : parser    = 1 : 632,537
authored : parser = 1 : 17,917       (authored = total − node_modules − denominator − archives)
```

The numerator of all progress in V·π is **one 17-line, 560-byte grammar terminal**, sha
`8c3ac689…e95aa`, byte-identical from candidate to promotion, green under strict TypeScript, backed
by the strongest correctness evidence in the tranche (180 sealed cases + 65,024 independent-oracle
transactions, replayed byte-identically by O2).

### 3.2 The denominator — four defensible choices, and the fraction against each

| denominator | authority | accepted | fraction |
|---|---|---:|---:|
| **module families** | the tranche's own `FEATURE-LEDGER.md` §1 — 15 families, **every one RED** | 0 families closed | **0%** |
| **public compatibility ring** | `CHARTER.md:38` G-1 ("all 52 exports TOTAL"); O4-06 measures the real consumer obligation at 63 symbols over 6 doors | the active root has **no public barrel at all** | **0%** |
| **grammar obligations, value/keyframes slice** | O4-07's measurement against the pinned CSSWG tree `c7573530…` (168 sources; every path, blob OID and SHA-256 independently reproduced) — **304** | 1 | **0.33%** |
| **grammar obligations, 76-root seed / full pinned universe** | O4-07 — **883** / **1,333** | 1 | **0.11% / 0.075%** |

**Ruling on (b): the honest progress fraction is 0% on every denominator the tranche itself declares,
and 0.33% on the most generous externally measured one.** The correct headline sentence is: *one
internal grammar terminal accepted; zero of fifteen module families closed; zero of the fifty-two
public exports implemented; roughly three-tenths of one percent of the narrowest measured
grammar-obligation denominator.*

Two honest counterweights the adjudication must carry, because they are real:

- **Integrity is not the problem.** O2 went hunting for fabrication with executable replays and found
  none: every hash verifies, every replay reproduces byte-identically, both G16 quintets including
  two REJECTs are retained append-only, both failed benchmark attempts are on disk, the erratum is
  correct, and every acceptance record carries a correct zero-credit block. I confirm that reading.
  **The pathology is economy and instrumentation, not honesty.**
- **The method is further along than the parser.** The differential-oracle rail found R1 and five
  real live-side defects; O4's 168-source pin verification is exact; the append-only benchmark rail
  reproduces its estimator to the last digit; the BBNF lattice carries a terminal content-addressed
  cross-repo ACK that O3 reproduced to the byte. These are genuine assets — and they are the *only*
  genuine assets. §4 rules on what they are assets *for*.

### 3.3 Convergence

O5's ~2.0-year extrapolation rests on a **measured rate** (19 h 28 min for one accepted operation)
and an **estimated target** (15 families × ~14 operations = 210). I hold the rate as measured and the
target as an estimate, and I sharpen the rate in the tranche's favour: killing the denominator (§5)
removes ~11 h from that window, leaving the consume-number cell's own 12.6 h. Even at that corrected
rate, 209 remaining operations = 2,633 h ≈ 329 working days ≈ **1.3 years — and that excludes the
stylesheet root, the compatibility layer, WPT differentials, hostility, round-trips and integrated
benches (`HANDOFF §13` items 5–8), plus the denominator itself.**

Measured acceptance rates: **1 of 5 attempted features (20%)**; **1 of 34 generations (2.9%)**. On
the speed rail there is no convergence at all: every operation-equivalent measurement in the record,
mine included, moves away from §13's bar.

---

## 4. (c) THE RULING — is the parser replacement program justified at all?

This is the most consequential output of the audit. I will not hedge it.

### 4.1 The strongest case FOR continuing the replacement

Stated at full strength, because it deserves to be:

1. **The shipping parser has a live crash on a user-typed input path.** I reproduced it myself against
   the built artifact: `parseCssColor("oklch()")`, `("rgb()")`, `("lab()")` all throw `TypeError`
   from `dist/subpaths/css.js`. `demo/color-session/picker-color.ts:110` calls
   `parseCssColor(source.trim())` with no try/catch — that is the colour picker's text field. The
   frozen contract promises `ok:false`. `GATE-VERDICT`'s mitigation surveyed `keyframes.js` and
   missed the demo.
2. **The defects are systemic, not incidental.** O4-11 shows four separately-filed `ACCEPTED_FACT`
   rows (E03/E09/E10/E11) are **one mechanism**: `String.replace(/,/g," ")` before component
   splitting, destroying the legacy/modern separator distinction the spec depends on — at
   `grammar.ts:181` (the same byte as R1) and `timeline.ts:23`. A row-by-row repair re-introduces
   them the moment anyone reuses a comma-normalising splitter.
3. **Ownership is genuinely duplicated in the shipping tree.** O4-04: timeline-range names have
   **three mutually inconsistent owners** inside `src/css` (a 4-name regex, a 4-name exported union,
   a 6-name `RangePhase`), so the keyframe door and the animation-range door disagree about the same
   normative production, in production, today. A grammar with one owner per production structurally
   cannot do that.
4. **The evidence apparatus is real and reusable.** The 65,024-transaction independent oracle; the
   AES-GCM sealed corpus with external escrow; the append-only `wx`/fsync/no-retry benchmark rail;
   the verified 168-source spec pin; the content-addressed BBNF module DAG. All survive hostile
   replay.

### 4.2 The strongest case for RETIRING the replacement

1. **The thing being replaced is measured 1.77×–2.35× faster** than both engines proposed to replace
   it, on identical corpora under one harness, with an effect two orders of magnitude above any
   sensitivity floor (§1). This is the tranche's own measurement, and it is the most robust number in
   the record.
2. **The single accepted artifact — the tranche's best work — is slower than the implementation
   value.js already retained.** 4.3–7.3% behind the O.W6 byte-loop, confirmed in two independent
   null-calibrated instruments (§2.4). Owner law 8 names "the retained parse-that predecessors" as
   peers; `g7/lineage.json` excluded the real successor from *candidate ancestry* (correct) and that
   exclusion propagated silently into the *peer set* (not correct). It was never timed. Grep of all
   2,324 files for `scanNumberFast|numberFastParser`: three hits, all provenance metadata; **zero** in
   any review, synthesis, bench, addendum, `FINDINGS.md` or either handoff.
3. **Every correctness defect in §4.1 is a bounded repair, not a rewrite.** R1 is one false `!`.
   E03/E09/E10 are two `.replace(/,/g," ")` calls. E11 is one `?` in a regex. O4-03's three keyframe
   defects are one regex alternation, one bound, and one exported type union. O4 located every one by
   line, with three-engine browser witnesses. That is hours of work. Replacing a parser to fix a
   null-assertion bug is the largest available over-response to the smallest available defect.
4. **The replacement reproduces the very defect class it claims to cure — and this is the decisive
   fact.** After (1)–(3), architecture is the *only* argument left standing, and it is falsified in
   both places where it has actually been examined:
   - **O4-10:** `mirror/grammar/keyframe-selector.ts` reproduces **all three** live keyframe defects
     verbatim — four names, `.opt()` percentage, `0..100` bound — while the P-1 gate that certified it
     GREEN filed **all 22** keyframe-selector rows `OUT_OF_SCOPE`, including the two deliberately
     constructed boundary probes `101%` and `exit 101%`, whose recorded `liveOk:true` values I
     independently executed and found **false**. The premise "in all five, C14 is the spec-correct
     engine" is false on the one door where it was tested.
   - **O4-08 / O4-09:** the BBNF lattice carries **17 duplicated declaration names across 6 module
     pairs** plus an unbooked 12-production shadow token layer; two divergent keyframe grammars, of
     which the *reachable* one has no timeline-range arm and accepts `999%`; and `MODULE-DAG.md`
     contradicts itself three ways on `timeline-range`'s home, mis-assigns the bare keyframe
     percentage one line after forbidding exactly that, and cannot host **≥6 of the 19** frozen
     runtime exports it is gated on.
5. **No external peer exists anywhere in the tranche** (O2-12, confirmed: dependencies are
   `{"@mkbabb/parse-that":"1.0.0"}` alone; no `css-tree`/`postcss`/`csstools`/`parsel`/`cssom`
   anywhere). Every performance and architecture claim is value.js versus value.js. The replacement
   has never been compared to a real alternative implementation.
6. **The delivery rate does not converge** (§3.3), and `HANDOFF §13`'s close condition is
   unsatisfiable — which has been resolved by peer selection rather than by amendment, a structural,
   self-reinforcing incentive to select flattering peers.

### 4.3 THE RULING

> **The V·π program is NOT justified as a parser *replacement*, and must not be continued as one. It
> IS justified — and must continue — as (i) a spec-conformance and repair program against the
> shipping regex parser, and (ii) a single gated architectural pilot that must EARN the right to
> replace by clearing a pre-registered, owner-ratified gate.**
>
> **The replacement framing is retired effective immediately. `HANDOFF §13` is void as written.**

The reasoning in one paragraph. A replacement is justified by exactly one of three things:
correctness, speed, or architecture. **Speed is dead** — the incumbent is 1.8–2.3× faster at engine
scale and the tranche's own best artifact is 4–7% slower than the predecessor value.js already
retired for performance. **Correctness is dead as a *replacement* argument** — every defect is real,
every defect is six lines, and every defect was located by an automated differential that costs
nothing to point at the incumbent instead. **Architecture is the only survivor, and it is the one
claim that has never been tested and is falsified everywhere it has been looked at** — the mirror
reproduced the live keyframe bugs verbatim, the gate that certified it routed its own failure modes
to `OUT_OF_SCOPE`, and the module lattice meant to cure duplicated ownership itself contains
seventeen duplicated declarations and a self-contradiction about who owns `timeline-range`. A program
may not spend years and 354 MB on an architectural thesis that its own two available tests refute.

**The four mandatory components of the ruling:**

**R-1 — Ship the repairs, in the shipping regex parser, now.** R1 (`grammar.ts:181` non-null
assertion); the comma-normalisation law (`grammar.ts:181`, `timeline.ts:23`) as **one** ledger row,
not four; `timeline.ts:16`'s optional unit group; the keyframe four-arm grammar (7 names, mandatory
and *unbounded* named percentage, bounded bare percentage) at `grammar.ts:418` and `types.ts:44`; and
the collapse of the three timeline-range name owners into one. Bounded, hours, already
three-engine-browser-witnessed by O4. This retires **every** correctness argument for replacement,
and it is owed to users regardless of what happens to the pilot. The `KeyframeSelector` public type
change is a producer-contract change and goes to the owner with `keyframes.js` in the room.

**R-2 — Keep the differential oracle and point it at the incumbent, permanently.** The 3-way
differential (pinned spec × shipping engine × browser CSSOM) produced R1 and five real live-side
defects; forty-four G16 adversarial seats produced zero of the three defects that decide their own
acceptance. It is the highest-yield artifact the tranche built and it costs almost nothing to run. It
becomes the standing conformance rail for `src/css`, with **all** classification buckets counted in
the gate and **no author-assignable `OUT_OF_SCOPE`** (O4-10's exact failure mode: 35% of rows routed
out, including both probes that would have failed it).

**R-3 — The replacement continues ONLY as one gated pilot on ONE vertical.** `value-unit` →
`component value` → `declaration`, exactly `HANDOFF §11` item 7's shape, and nothing beyond it. It
must clear a gate written and owner-ratified **before** the work starts:
   - **(a) Architectural yield, demonstrated not asserted** — it fixes ≥1 defect class the *repaired*
     regex parser demonstrably cannot hold, shown by an executable test under a stated maintenance
     scenario, not by prose.
   - **(b) Within a ratified regression budget** of the repaired incumbent, on an
     operation-equivalent, **null-calibrated**, provenance-symmetric harness (§5, P-3). Not "strictly
     faster" — that bar is the cause of the flattering-peer selection and it is unreachable.
   - **(c) Beats at least one EXTERNAL peer** (`css-tree`, `postcss-value-parser`) on something,
     resolved and executed. Until then the unqualified word "peer" is forbidden.

   If the pilot fails the gate, **the program terminates** and the grammar work is retained as a
   *specification asset* — the BBNF grammar, the denominator, the differential corpus, the sealed
   fixtures — which is genuinely valuable and requires shipping nothing.

**R-4 — Owner decisions the ruling forces, which no agent may take.** (1) Amend or void `§13`'s speed
rail into a ratified regression budget with a fixed peer set — `GATE-VERDICT` F-4 argued this on
2026-07-20 and the owner has never ruled. (2) Rule **OC-1** (absolute-bar recalibration): the bars are
non-portable by the gate file's own admission, and OC-1 appears **zero** times in
`HANDOFF-2026-07-24`, `ADDENDA-07`, `ADDENDA-08` and `FEATURE-LEDGER` while `CHARTER.md:49` still
carries them as a live close condition. (3) Rule whether the byte-loop predecessor belongs in the peer
set despite being scanner-shaped (§6, D-2). (4) Rule which denominator ring binds (§6, D-3).

**What survives of the accepted feature.** `SYNTAX-CONSUME-NUMBER` is **retained**. Its 17 lines are
correct, its promotion is byte-exact, its correctness evidence is the strongest artifact in the
tranche, and it is 2.4–4.0% faster than a fairly-built same-regex peer. **Strike
`"qualification": "PASS_STRICT_WIN"` and the unqualified `"peer"` by erratum**, and replace them with
the null-calibrated statement: *~3% faster than an operation-equivalent same-regex peer; ~4–7% slower
than the retained byte-loop predecessor; both figures within 4× of the harness null.* Do **not**
re-open the 3×5×3. O3-01's separate finding — that the acceptance violated `ADDENDA-07 §2`'s own
precondition and was retro-legitimated 43 hours later by an unratified document that never declares a
supersession — is an **authority** defect, is real, and belongs to S2 and the owner; it does not
change the code.

---

## 5. (d) The process instrument the next mega-tranche must use

### 5.1 What V·π used, and its measured yield

`3×5×3` applied at **leaf** granularity, and in practice **per generation** rather than per feature:
34–40 generations; 44 adversarial seats on the one accepted feature against a prescribed 8 (5.5× the
budget); 1,608 lines of review prose; 36,331 authored lines of machinery for 17 lines of parser
(2,137:1); 255 MB of zero-credit analyzer output including a 69.6 MB artifact re-emitted whole eight
minutes later for a 1,194-byte delta; and one entire feature that ran seven full
admission/holdout/benchmark ceremonies across 72 files and never wrote a candidate.

**Measured detection yield of those 44 seats on the three defects that decide their own acceptance:
zero.** They did not find the adapter asymmetry (skeptic-4 named it in prose and measured nothing),
they did not find the wrong-peer selection, and they did not run a null control. I found the adapter
cost in one command and the null in six.

The owner's law is sound — independent adversarial verification is exactly right. The **granularity**
and the **medium** were wrong: applied to the smallest possible unit, and expressed as prose that
restates hashes. `FINDINGS.md` I02 books this and the root said it to the owner unprompted at least
six times. This is not hindsight.

### 5.2 The instrument — eight rules, each traceable to a measured failure

**P-1 · The unit is the VERTICAL, not the leaf.** Three orthogonal candidates per *coherent vertical*
a consumer can call (`value-unit` entire, `color` entire, `selectors` entire) — never
`consume-number`. Keep the H/B/S orthogonality discipline verbatim: it demonstrably produced real
design information. `FINDINGS.md` I04's "smallest coherent independent operation" is still too fine
and is not the owner's word; the owner said "per feature" and never defined it, so **the owner must
ratify "vertical" explicitly** rather than have an agent re-scope it again — which is O1-07's exact
documented failure.

**P-2 · The adversary is a MACHINE.** One sealed 3-way differential per vertical — pinned spec corpus
× shipping engine × browser CSSOM — emitting a machine verdict over **every** row, with **no
author-assignable exclusion bucket**. Rows that cannot be classified fail the gate; they are not
routed out of it. **A review containing no executed command scores zero.** This single rail
out-produced 44 seats by five real defects to zero.

**P-3 · Null-calibrated benchmarking. This is my addition and it is mandatory.** No benchmark result
may be published without, in the same run:
   - a **same-vs-same null pair** (a byte-identical reconstruction of the candidate). The claimed
     effect must exceed the null's one-sided 95% upper bound, or it is reported `UNRESOLVED`;
   - **provenance symmetry** — every lane constructed the same way, through the same loader, at the
     same module boundary. Mixing an imported lane with an in-module lane injects **5.6%** (§2.3);
   - **construction symmetry** — no lane pays an adapter, projection or wrapper another does not; if a
     peer cannot natively produce the observation shape, *every* lane takes the same wrapper;
   - **no oracle fields** into any lane (G16 got this right; G14 violated it);
   - a **fixed, addendum-bound peer set**: (i) the operation-equivalent extraction of the *live
     shipping* implementation, (ii) the **fastest retained predecessor established by `git log -S`
     over the production path** — a candidate-ancestry exclusion never propagates to the peer set,
     (iii) the previous accepted generation, (iv) ≥1 **external** implementation. A peer that has ever
     produced a loss may never be dropped without an addendum naming the loss;
   - **≤2 lanes per process**, and **UTF-8 bytes or no throughput unit at all**;
   - append-only raw retention, `wx`/fsync/no-retry, verbatim from G16 — that part was excellent and
     nearly free.

**P-4 · Mandatory caveat propagation, and reserved words.** Every top-level acceptance record carries
a `caveats[]` array reproducing (i) every non-ACCEPT verdict in any round, (ii) whether the promoted
bytes were authored before or after any holdout reveal, (iii) the peer's exact provenance and shipping
status, (iv) the null-vs-effect margin. `"sealed"` requires ciphertext + external key + a **non-null**
frozen-candidate-set binding + a custodian with no candidate-path access (G16 satisfies one of four).
`"peer"` is forbidden unqualified until an external implementation is executed. This closes the
one-level summary compression O2 documented three separate times.

**P-5 · Clause-granular supersession, and a hard owner/agent line.** Replace document-granular
disposition tables with a clause-granular one. Every row in any list titled "Owner laws" carries the
**verbatim owner quote and its prompt id**, or is explicitly marked `AGENT-AUTHORED`. O1 found that
list inverting one owner instruction, contradicting a second, re-scoping a third on a citation that
does not exist, dropping three the owner repeated three and four times, and mixing in four rules no
owner ever uttered — with no marker separating the two. **No agent-authored document may self-label
`OWNER-RATIFIED`.**

**P-6 · Hard economic caps, enforced as gates.** ≤3 generations per vertical; ≤8 adversarial seats per
vertical (the law's own number); any machine-generated artifact >1 MB emitted as a **diff**, never
re-rendered; **any analyzer that has produced zero accepted rows after two generations is killed** —
the denominator lineage ran nine and produced zero, at 255 MB and ~11 h of a 19.5 h window. Replace it
with one hand-curated TSV (spec URL · section · production · owning module · status), ~100 KB, which
the root itself proposed.

**P-7 · Track the tranche in git.** `trackedFilesInHead: 0` on 354 MB means one `git clean -fdx`
destroys the entire record and no diff review has ever been possible. Operational blocker, not style.

**P-8 · Capture the model receipt at the spawn layer.** Five skeptics and three adjudicators all
declared the same identity and all reported they could not attest it. `AUDIT-BRIEF.md §2` demands a
receipt and supplies no mechanism. Fix the harness or delete the requirement — do not keep a gate that
cannot be evaluated.

**Estimated delta.** V·π: 44 seats + ~4.9 MB per accepted **leaf**. Proposed: 8 seats + two reusable
machine rails per **vertical** of ~14 leaves. Conservatively **10×–20× cheaper with strictly higher
defect yield** — every defect that decided this audit came from an executed command, and none came
from prose.

---

## 6. Settled — what I rule as reconciled

| # | claim | disposition | basis |
|---|---|---|---|
| S-1 | live regex is 1.77×–2.35× faster than both combinator engines on identical corpora | **CONFIRMED — the only defensible performance claim in the picture** | my recomputation of `parser-proof/bench-results.json`, two independent ratio routes; effect is 2 orders of magnitude above every sensitivity floor I measured |
| S-2 | the parser-proof **absolute** floors are non-portable and the RED is not uniform | **CONFIRMED — correction to O5 and to project memory** | `gate.calibration_crosscheck`: the deposed calibration subject scores 0.0464/0.0971 on this machine, `"OWNER-CONFIRM"`; c14 **meets** the value floor 0.06399 ≥ 0.0500 |
| S-3 | `parser-proof/` is **outside** the frozen subject | **CONFIRMED — new; no skeptic stated it** | `grep -c parser-proof audit-subject-ledger.tsv` → 0; path is `apotheosis/parser-proof/`, sibling of `pi/` |
| S-4 | R1 is a live shipping `TypeError` on a user-typed path | **CONFIRMED** | my own execution against `dist/subpaths/css.js`: `oklch()`, `rgb()`, `lab()` all throw |
| S-5 | two `liveOk` receipts in `equivalence-results.json` are affirmatively false | **CONFIRMED** | my own execution: `101%` → ok:false, `exit 101%` → ok:false; both recorded `true` |
| S-6 | G16's peer lane pays a per-operation adapter the candidate does not | **CONFIRMED**; cost isolated at **8.5%** | `benchmark.mts:155–181` read; `deposedFair/deposedG16` = 0.9153, 95% upper 0.9208, 30/30 children |
| S-7 | the timed "deposed" peer is the revision immediately **before** value.js's own perf tranche deposed it; the real successor was never timed | **CONFIRMED** | 0-line diff vs `git show 9aedfc50^:src/parsing/utils.ts`; `9aedfc50` = `perf(O.W6)`; 3 grep hits repo-wide, all provenance metadata |
| S-8 | the accepted candidate is **slower** than the true retained predecessor | **CONFIRMED as to direction; magnitude corrected to 4.3–7.3%** | my null-corrected 1.043; O5's null-corrected 1.073. Two independent instruments agree in sign after calibration |
| S-9 | O5-F01's claim that the win "vanishes and reverses" | **REFUTED as to the reversal** | O5's harness reports 5.0–11.5% between **byte-identical lanes**, 10/10 runs, order-invariant — larger than the 2.7% effect claimed. Mechanism: tsx-import penalty 5.6%, 18/20 children |
| S-10 | `PASS_STRICT_WIN` (7.07%) | **REAL but ~85% adapter, and against the wrong peer** | S-6 + S-7 + §2.4; corrected reading ≈ 3% over a fair peer, 4–7% behind the retained predecessor |
| S-11 | "all four beat LIVE regex" / "2.5× the live public parser" | **REJECTED** | specialized leaf vs the `parseCssScalar` full dispatcher; the operation-equivalent lane that lost 21.1% was deleted from v3 and G2 and appears in neither `FINDINGS.md` F12 nor handoff §7 |
| S-12 | no external peer exists anywhere in V·π | **CONFIRMED** | O2-12; I found none either. Every claim is value.js vs value.js |
| S-13 | process economy: 354,220,932 B; denominator 72.12%; twin pair 39.29%; active root 5,780 B; parser 560 B; 1:632,537 total / 1:17,917 authored | **CONFIRMED to the byte by my own ledger arithmetic** | §3.1 |
| S-14 | progress: 0 of 15 module families closed; 0 of 52 public exports; ~0.33% of the narrowest measured grammar denominator | **CONFIRMED** | `FEATURE-LEDGER.md` §1 read by me; O4-07's pin verification is exact and reproduced |
| S-15 | `HANDOFF §13`'s speed rail is unsatisfiable as written | **CONFIRMED** | S-1 + S-8 + `FINDINGS.md` G07/G08 correctly forbidding the peers that produced the only apparent wins |
| S-16 | the tranche's **integrity** is good; its **economy and instrumentation** are not | **CONFIRMED** | O2's executable replays found no fabrication; both REJECT quintets, both failed benchmark attempts, the erratum and all rejections retained append-only. The failures are one-level summary compression and an uncalibrated instrument |
| S-17 | the architectural thesis is falsified in both places it has been examined | **CONFIRMED — this is what decides §4.3** | O4-10 (mirror reproduces all three live keyframe defects; gate routes 35% of rows, incl. both boundary probes, to `OUT_OF_SCOPE`); O4-08/09 (17 duplicated BBNF declarations, shadow token layer, DAG self-contradiction on `timeline-range`, ≥6 of 19 exports unhomed) |
| S-18 | `3×5×3` at leaf granularity produced zero detection yield on the defects that decide its own acceptance | **CONFIRMED** | 44 seats / 1,608 review lines vs 3 defects found; I found the adapter cost in one command and the null in six |
| S-19 | O1-02's "all 3,283 envelopes are readable plaintext" | **REFUTED as stated; its CONSEQUENCE stands at 1,243 rows** | my census: 2,040 rows carry `encrypted_content` (62.1%), 1,243 do not; `MESSAGE` envelopes carry a routing stub only, `FINAL_ANSWER` envelopes carry plaintext |

---

## 7. Unresolved — disagreements I may not edit away

**D-1 · The magnitude of `h2` vs a fairly built same-regex peer.**
*Position A (O5-F01, on disk, BLOCKER):* h2 is **2.7% slower**, 9 of 9 runs, median 1.0269 — the
7.07% win "vanishes and reverses."
*Position B (mine):* h2 is **3.2% faster**, 28 of 30 children, 95% upper 0.9774; O5's instrument
reports 5.0–11.5% between byte-identical lanes, so its 2.7% is inside its own noise.
*Status:* the **sign is settled** — both instruments agree h2 is not slower once null-corrected
(0.960 and 0.976). The **magnitude is not.**
*What would settle it:* re-run G16's own harness with (i) an added same-vs-same null pair, (ii) all
lanes loaded through one loader at one module boundary, (iii) the predeclared 30-child estimator, and
publish the effect only if it clears the null's upper bound. One afternoon.

**D-2 · Does the byte-loop `scanNumberFast` belong in the peer set?**
*Position A (O5, and I lean here):* yes — as a peer, never as an ancestor. You must beat what you are
replacing; refusing to *time* the fastest retained implementation because its architecture is vetoed
is precisely how a replacement ships slower than what it replaced.
*Position B (implicit in `g7/lineage.json` and the no-scanner law):* it is a scanner-shaped
implementation the owner architecturally vetoed; timing against it sets a bar the permitted
architecture cannot meet by construction, converting an architecture veto into a performance failure.
*What would settle it:* an **owner ruling**. This is a scope question, not an audit finding, and
`ADDENDA-09` must put it to the owner rather than resolve it.

**D-3 · Which denominator ring binds V·π?**
*Position A (O4-07):* grammar obligations at the pinned tree — 304 (value/keyframes slice) / 883
(76-root seed) / 1,333 (full universe), with `css-mixins-1` a byte-level falsification of the seed
because the shipping 52-export surface already parses `@function`.
*Position B (`HANDOFF §3.2` / `ADDENDA-08:213`):* the 52-export surface is "only a compatibility
invariant" — while `CHARTER.md:38` simultaneously uses the same 52 as the G-1 gate **denominator**,
which O4-06 shows is one number in two incompatible roles, and which understates the one real
consumer's obligation (63 symbols over 6 doors).
*What would settle it:* an owner ruling on the obligated ring, plus a **second denominator instrument**
(`@webref/css`) to bound O4's explicitly-stated lower bound.

**D-4 · The convergence extrapolation.**
*Position A (O5-F14):* ~4,069 h ≈ 2.0 years at 8 h/day for the coverage rail.
*Position B (mine):* the **rate** is measured and I accept it; the **target** (210 operations) is an
estimate calibrated on the two simplest families and stated as such; correcting the rate for the
killed denominator gives ~2,633 h ≈ 1.3 years. O2 and O4 decline to extrapolate at all.
*Agreed by all who measured:* whichever number is right, it is years, and the speed rail is not
converging at any rate.
*What would settle it:* execute one complete vertical under P-1..P-8 and measure the real
per-vertical cost. That is the R-3 pilot, and it is also the honest way to price the program.

**D-5 · Does `APOTHEOSIS_ACCEPTED` survive?**
*Position A (O2, and my ruling):* the substance survives — real, reproducible, correctly credited at
`feature:1, full_parser:0`; the **labels** do not.
*Position B (O3-01, BLOCKER):* the acceptance violated `ADDENDA-07 §2`'s explicit precondition, and
the only permission arrives 43 h later in `ADDENDA-08 §2.1(3)` — a document that is not
owner-ratified, was never twice-challenged, has no gestalt adjudication, and nowhere declares that it
supersedes anything — while `HANDOFF-2026-07-24.md:19` instructs readers to "apply 07/08
supersession," an operation 08 never defines.
*Status:* these do not conflict on facts; they conflict on remedy. My axis rules the *performance*
clause struck and the feature retained. The *authority* question belongs to S2 and the owner.
*What would settle it:* an explicit owner ruling carried in `ADDENDA-09` as a clause-granular
supersession row.

**D-6 · Model receipt.** Not a disagreement — a shared, unresolved gap. Eight seats, eight
unverifiable self-declarations, zero harness mechanism. Any "requested-audit credit" conditioned on
served-Opus (`AUDIT-BRIEF §2`) can currently be neither granted nor denied by evidence.

---

## 8. Continuation order this axis authorizes

Strictly ordered. Nothing below grants production, package, consumer or megatranche authority.

1. **Put R-4's four owner decisions to the owner, before any code.** §13 amendment; OC-1; the
   byte-loop peer question (D-2); the denominator ring (D-3). Until §13 is ruled, the tranche has a
   close condition its own 2026-07-20 gate says is unreachable and a structural incentive to select
   flattering peers.
2. **Write `ADDENDA-09`** carrying: this ruling; the clause-granular supersession table (P-5); the
   struck `PASS_STRICT_WIN` and unqualified `"peer"` with their null-calibrated replacement; the
   reserved-word definitions (P-4); the fixed peer set (P-3); the ten missing `§12` prohibitions plus
   my null-calibration and provenance-symmetry rules; the terminal disposition of the
   `SUPERSEDED-BY-CONSUMPTION` letter (O3-06); the consolidated R1–R33 index (O3-15, 21
   spec-correction rows currently carried by nothing); and D-1..D-6 verbatim.
3. **Ship R-1** — the six-line repair set, with O4's browser witnesses as its acceptance evidence, and
   the comma-normalisation defect recorded as **one** law, not four rows.
4. **Stand up R-2** — the differential oracle as a permanent conformance rail against `src/css`, every
   classification bucket counted, no author-assignable exclusion.
5. **Kill the denominator lineage** (P-6): retain the eight `*-rejection.json` receipts and the tools;
   delete the eight payloads and their shards. **255,457,954 bytes recovered, zero dispositioned truth
   lost.** Replace with the ~100 KB curated TSV.
6. **Track the tree in git** (P-7) before anything else is written into it.
7. **Only then** open the R-3 pilot on one vertical, under P-1..P-8, against the pre-registered gate.
8. **Do not** finish G4's five-skeptic close, recut percentage/dimensions, or open the seven-way family
   fan-out of `HANDOFF §11` item 8 until the pilot clears its gate. `HANDOFF §11` items 5–8 presuppose
   the replacement framing this ruling retires.

Items 2–6 require no adversarial ceremony at all. Every one is a document edit, a deletion, a bounded
repair, or an owner sentence.

---

## 9. What the next mega-tranche must own because of this

1. **The repairs are the mega-tranche's, not the pilot's.** R-1 lands in shipping `src/css` and ships
   to consumers. The pilot ships nothing until it clears R-3's gate. The megatranche must not wait on
   a prototype to fix a live crash.
2. **`HANDOFF §13`'s "production swap" is void.** No swap is authorized by anything in this record.
   The megatranche inherits a *repaired incumbent* plus a *gated pilot*, not a replacement in waiting.
   `docs/tranches/V/megatranche/SCOPE.md` M-9 ("the V·π parser program folds INTO this mega-tranche as
   live prototyping work") is compatible with this ruling; `CHARTER.md:8–10` and
   `HANDOFF-2026-07-24.md:415–420` are not, and S2 owns that contest.
3. **The compatibility obligation is 63 symbols over 6 doors, not 52 over 1** (O4-06, measured against
   the real consumer). Any mirror satisfying "52/37" still breaks 26 live `keyframes.js` imports,
   including three `/value` types that are the `/css` parsers' own return types.
4. **Terminally dispose of the `SUPERSEDED-BY-CONSUMPTION` promise** (O3-06). An unretracted letter
   still tells an external fleet to stop building ~20 registry rows plus the entire CSS L4 surface
   against a delivery that is 17 lines — with no delivery evidence, no outbound ledger row past O-6,
   and no counterpart in the recipient tree.
5. **P-3 becomes the megatranche's benchmark law**, not a V·π-local rule. Without null calibration,
   provenance symmetry and a fixed peer set, S-6 and S-7 recur by construction at every feature, at
   larger scale.
6. **Budget the pilot honestly.** The measured rate is 1 accepted operation per 12.6–19.5 h under the
   old instrument, 1 acceptance per 34 generations, 1 accepted feature per 5 attempted. The pilot's
   purpose is as much to **re-price the program under the new instrument** as to prove the
   architecture. Price it before scaling it.
7. **Carry the honest headline.** Not "the first accepted direct feature," which is true and useless.
   **"One 17-line grammar terminal; zero of fifteen families; zero of fifty-two exports; the incumbent
   is 1.8–2.3× faster; the architectural thesis is unproven and falsified where tested."** A tranche
   that can state that sentence out loud can be trusted with the next one.

---

## 10. What I could not verify, and why

1. **My own served model.** Declared `claude-opus-5[1m]`; no introspection channel; must be captured
   at the spawn layer (P-8).
2. **The parser-proof P-3 timings themselves.** I recomputed, cross-checked and corrected the
   published rows and read the calibration crosscheck; I did **not** rebuild the esbuild bundles and
   re-time the three engines. `MACHINE_FACT` for the arithmetic, `RESEARCH_ONLY` for the underlying
   timings. See also S-3: that file is outside the frozen subject.
3. **The 2,040 ciphertext envelope payloads.** Genuinely opaque (§2.6). The **1,243 readable
   `FINAL_ANSWER` payloads** are a live, undischarged coverage obligation for `ADDENDA-09`; I read
   only their author, recipient, type and timestamps, and I infer no finding from their content.
4. **The 180 sealed cases and 65,024 oracle transactions.** O2's lens; replayed byte-identically by
   O2; I did not re-run them.
5. **G4's browser/CSSOM witness.** O4's lens; not re-run by me.
6. **The 255 MB `denominator/` payloads' semantic content.** Read only for size and rejection status.
7. **Whether my `deposedFair` and `byteLoop` constructions are what the historical authors *would*
   have written.** They are the minimal symmetric constructions and both pass 64/64 of G16's own
   frozen corpus on exact bits. Counterfactual intent is unprovable — but this does not weaken S-6 or
   S-9: the point is that the reported effects are not robust to a one-line change in the peer or to
   the module boundary a lane is loaded from, which is the definition of a harness artifact.
8. **The exact V8 mechanism behind the 5.6% tsx-import penalty.** I established it empirically,
   quantified it with a paired 20-child estimator, and showed it is order-invariant and
   provenance-following. I did not isolate the compiler-level cause. The finding does not require it.
9. **`ADDENDA-06`** (333,616 B) and its audits — not read. Outside my axis.

---

## 11. Headline

**There is exactly one defensible performance claim in this tranche and it runs against the
replacement:** the shipping regex parser is **1.77×–2.35× faster** than both combinator engines on
identical corpora — the only number in the record whose effect exceeds its instrument's noise floor by
more than an order of magnitude. Everything below engine scale is instrument artifact: I reproduced
G16's 7.07% "strict win" and then isolated **8.5 of its ~10 points as an adapter charged to the peer
lane alone**; I reproduced O5's refutation of it and then showed **O5's own harness reports a parser as
5–11% slower than a byte-identical copy of itself, in 10 of 10 runs**, because it mixes a tsx-imported
lane with in-module lanes — a penalty I measured at **5.6%**. Once both instruments are null-corrected
they agree: the accepted candidate is ~3% faster than a fairly built peer and **4–7% slower than the
byte-loop predecessor value.js already retired for performance and never timed.** Against that, the
honest progress fraction is **0% of every denominator the tranche declares and 0.33% of the most
generous measured one** — one 17-line terminal, 560 bytes, out of 354,220,932, of which 72.12% is
analyzer output the tranche itself rejects with zero credit.

**So I rule, without hedging: the parser REPLACEMENT is retired.** Speed is dead — the incumbent wins
by 1.8–2.3×. Correctness is dead as a replacement argument — every defect is six lines and was found
by an automated differential that can be pointed at the incumbent for free. Architecture is the only
survivor and it is **falsified in both places it has been examined**: the mirror reproduced all three
live keyframe defects verbatim while its own gate filed the two boundary probes that would have caught
them as `OUT_OF_SCOPE` with liveOk receipts I executed and found false, and the module lattice built to
cure duplicated ownership contains seventeen duplicated declarations and contradicts itself about who
owns `timeline-range`. **Ship the six-line repairs into the live parser today; keep the differential
oracle and aim it at the incumbent forever; let the combinator grammar survive as exactly one gated
pilot on one vertical that must beat an external peer and demonstrate an architectural yield the
repaired regex parser cannot hold — or terminate and be kept as a specification asset.** And never run
another benchmark in this project without a null control: forty-four adversarial seats and 1,608 lines
of review prose reproduced every SHA-256 in the packet and performed none of the three twenty-minute
measurements that decide the acceptance they certified.

---

*S3 · receiving audit synthesis · immutable on write · no subject byte edited.*
