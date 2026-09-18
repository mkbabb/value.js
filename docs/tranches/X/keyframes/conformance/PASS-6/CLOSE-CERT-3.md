# X·KF PASS-6 — CLOSE-CERT-3 (the SEAL SEAT's verification instrument, round 6)

**Path**: `docs/tranches/X/keyframes/conformance/PASS-6/CLOSE-CERT-3.md`. **Seat**: SEAL SEAT, X·KF round 6, 2026-08-29. **Mandate**: VERIFY-ONLY, then hash. **This seat made ZERO edits to any spec, to `WORK-ORDER.md`, to `CLOSE-CERT-6.md`, or to any prior-pass artifact.** Its sole write is this file. Every figure below is the output of a command re-run at this seat against the eleven specs' **final bytes**; nothing is inherited from the work order, from the checks, from the union, or from `CLOSE-CERT-6.md`.

**Naming, declared at the head so it cannot be read as an accident.** This instrument's bare name is `CLOSE-CERT-3` — the third in the sequential series `PASS-4/CLOSE-CERT.md` → `PASS-5/CLOSE-CERT-2.md` → `PASS-6/CLOSE-CERT-3.md`, and the name this seat was ordered to write. **`PASS-6/CLOSE-CERT-6.md` §ERRATA E-11(b) rules the opposite** — *"One name per certificate, round-numbered … ending the `CLOSE-CERT-2` / `CLOSE-CERT-5` dual spelling that produced two of this round's census defects (E-4, E-5) by making a single quantity greppable two ways."* **Two round-6 close certificates now exist under two names.** This seat has no authority to resolve a naming rule and does not attempt to; the collision is filed below as **S-3** for the check to adjudicate. What this seat can say is narrow and it says it: **the hash bracket of record for round 6 is §HASH of this file**, because that is where the order put it and there is no §9 anywhere else in the pass (see **S-2**).

---

## §1 — THE HEADLINE

| quantity | figure | method |
|---|--:|---|
| WORK-ORDER edits contracted | **130** | `WORK-ORDER.md` §CLOSE, reproduced by heading enumeration at this seat: BATCH-W6 `W6-01…W6-17` **17** · BATCH-CERT `C-01…C-34` **34** · BATCH-TAIL `T0`×6 `T2`×13 `T3`×4 `T4`×12 `T5`×11 `T7`×15 `T8`×10 `TR`×8 = **79** |
| **VERIFIED LANDED** | **122** | every edit whose target is one of the eleven specs (114) or `PASS-6/CLOSE-CERT-6.md` (8 — `C-01`…`C-11`, three of which are joint) — each confirmed by fixed-string match of its replacement bytes, then hand-adjudicated where the probe was structural (deletes, re-orders, negative probes) |
| **NOT LANDED** | **8** | `TR-01` `TR-02` `TR-03` `TR-04` `TR-05` `TR-06` `TR-07` `TR-08` — **their target file `PASS-6/RULINGS-6.md` DOES NOT EXIST.** Finding **S-1** |
| cross-spec anchor probes re-run | **67** | every `grep -n/-c/-o '<pat>' KF-W<n>.md` written inside a spec and aimed at a **different** spec, extracted mechanically from all eleven and re-executed here |
| **cross-wave anchors BROKEN** | **0** | 58 positive probes resolve ≥1; 9 are negative probes asserting **→ 0** and all nine still return **0**. **Zero cross-wave anchors broke this round.** |
| residual defects found at final bytes | **4** | **S-4** `CLOSE-CERT-6` E-5 census · **S-5** `CLOSE-CERT-6` E-2 offsets · **S-6** `T5-01`'s re-stale coordinates · **S-7** the `KF.W1` vector's W9 cell. None is an execution failure; each is a figure that went stale inside the round. |

**The two hard escapes are DEAD at the bytes**, and this seat measured both rather than accepting either.

- **Hard escape 1 (`OP-4` locus probe, `W0 D-1`, edits `T0-01`/`T0-02`/`T0-03`).** Pre-repair `CLOSE-CERT-6` E-9 records `KF-W0.md` at `OP-4` **0** · `B-16` **0** · `locus` **0** · `parseAnimationCSS` **1**. Re-run this seat at final bytes: **`OP-4` 5 · `B-16` 3 · `locus` 3 · `parseAnimationCSS` 3.** The commissioned act now has a surface at the wave named as its actor.
- **Hard escape 2 (the six NO-WAVE-OWNER `EH-*` ids, `W10 D-1`, edit `C-28`).** Pre-repair `grep -oE 'EH-[0-9]+' KF-W10.md` returned `EH-1`/`EH-4`/`EH-5`/`EH-8` only. Re-run this seat: **14 distinct ids** — and the six ordered (`EH-2` `EH-3` `EH-12` `EH-13` `EH-14` `EH-15`) are booked together, by id and by banked anchor, on a row that reads **"ROW 10 OF MECHANISM D — THE `EH-*` NO-WAVE-OWNER SIX, RECEIVED FROM KF.W0 AND BOOKED AT REPAIR ROUND 6"**. The four beyond the order (`EH-6` `EH-7` `EH-11` `EH-16`) are **not** booked as terminus rows — they are named inside the row's own partition receipt, which is the correct disposition for leg (e). `EH-9`/`EH-10` are correctly absent (discharged-by-twin at KF.W6).

---

## §2 — METHOD, so the verdict is falsifiable

**(a) The landing sweep.** `WORK-ORDER.md` was parsed at this seat into its 130 numbered edits by heading. For each edit the target file was resolved from its batch/file heading; the **replacement** code fence was identified as the last fenced block preceded by a replacement marker (`Exact replacement bytes` · `Insert, verbatim` · `Insert as a new line` · `Insert as §Bounds rows` · `→`), never a `Current bytes` block; three distinctive slices of ~70 characters were taken from that block's longest lines and matched **as fixed strings** against the target's final bytes. **102 edits matched on all three probes with no human judgement applied.** The remaining 28 were adjudicated one at a time, by hand, at the file:

- **16** were probe artefacts of the mechanical extractor and are **LANDED** — verified individually below (§3): `C-20` `C-27` `T4-01` `T4-02` `T4-04` `T4-05` `T5-06` `T5-08` `T7-04` `T7-06` `T7-11` `T7-12` `T8-01` `T8-05` `T8-06` `T8-09`.
- **2** are pure deletes/re-orders with no replacement fence and are **LANDED**: `T2-05` (three command corrections), `T4-11` (provenance re-ordered 1→2→3→4→5, with the ordering note landed).
- **2** matched partially because their replacement is a multi-row insert and are **LANDED** whole: `T7-08` (three §Bounds rows + the `C-4` out-of-bounds declaration), `T7-14` (both `:75` and `:76` conversions).
- **8** are `TR-01`…`TR-08`, whose target file was never created. **NOT LANDED.**

**(b) The cross-wave anchor sweep.** Every `grep` command written **inside** a spec and pointed at a **different** spec was extracted (67 distinct source→target→pattern triples) and re-executed against that sibling's final bytes, with the source spec's own asserted answer read from the surrounding prose. **This is the form test, not the token test** — a probe whose spec asserts *"→ 0"* is verified by returning 0, not by returning something.

**(c) What this seat did NOT verify, declared so no reader infers coverage that was not bought.** `CLOSE-CERT-6` §ERRATA **E-1**'s eleven per-wave round-5 clocks are journal-derived and were not re-derived here — this seat opened no authoring journal. **E-3**'s opening/closing hash columns could not be checked because **there is no §9** (finding **S-2**). The *substance* of any ruling, routing, grant, gate, dissent or posture was not re-adjudicated; this is a landing-and-anchor instrument only.

---

## §3 — THE SPOT-VERIFY RECEIPTS (36 edits, commands and outputs pasted whole)

Run from `docs/tranches/X/keyframes/waves/`. **Each row is one command and its entire output.** Rows marked **↓0** are strikes and deletes, where the correct output is zero; rows marked **form** verify by the pattern the law itself names.

```
edit    command                                                          output
W6-01   grep -c 'MISS-7' KF-W6.md                                        2
W6-02   grep -c '**TRAIL REBUILT BY COMMAND OVER THE 58 RECORDS — EIGHT' KF-W6.md   0   ↓0
W6-03   grep -o '..across all fifteen gates..' KF-W6.md | sort | uniq -c  1 ~~across all fifteen gates~~
                                                                          1 ~"across all fifteen gates"~
                                                                          2 *"across all fifteen gates"*
                                                                          2  "across all fifteen gates"
                                                                          1  'across all fifteen gates'
W6-08   grep -noE 'SHADOW \(LAW F\(1\)' KF-W6.md | wc -l                  6   form
W6-08   grep -c 'SIX acts carry a LAW F(1) verb in this file' KF-W6.md    1
W6-17   grep -c 'G7-FACTS RECIPROCAL, LANDED AT REPAIR ROUND 6' KF-W6.md  1
C-12    grep -c '2 occurrences / 2 lines' KF-W1.md                        1
C-19    grep -c 'col B DELETED at repair round 6' KF-W9.md                1
C-20    grep -c "after KF.W10's round-5 seat had already written once" KF-W9.md   0   ↓0
C-27    grep -c 'D-2-RESCOPED' KF-W9.md                                   1
C-27    grep -c 'residue item #8' KF-W9.md                                1
C-28    grep -oE 'EH-[0-9]+' KF-W10.md | sort -u | wc -l                  14
C-33    grep -c 'STRUCK AS A LIVE CLAIM AT REPAIR ROUND 6' KF-W10.md      1
C-33    grep -c 'EVERY ROW BELOW IS FALSE AT FINAL BYTES' KF-W10.md       1
C-33    grep -c "quoted by command at both sources' bytes" KF-W10.md      1
T0-01   grep -c 'OP-4' KF-W0.md                                           5
T0-02   grep -c 'B-16' KF-W0.md                                           3
T0-03   grep -c 'parseAnimationCSS' KF-W0.md                              3
T2-05   grep -c 'printf "%d| %s' KF-W2.md                                 3
T2-05   grep -c 'demo/components/instrument/timeline/composables/useKeyframeOps.ts' KF-W2.md   1
T2-12   grep -c 'converted at repair round 6' KF-W2.md                    3
T3-01   grep -c 'PASS-6' KF-W3.md                                         4
T4-01   grep -c 'depcruise-inventory.json' KF-W4.md                       4
T4-01   grep -c 'ONE PATH, ONE WRITER, ONE CONTENT' KF-W4.md              1
T4-02   grep -c '110 booked' KF-W4.md                                     0   ↓0
T4-02   grep -oh 'PASS-[0-9]/KF-W4-CHECK\.md' KF-W4.md | sort | uniq -c   1 PASS-1/… 1 PASS-2/… 1 PASS-3/…
                                                                          9 PASS-4/… 2 PASS-5/… 7 PASS-6/…
T4-03   grep -c 'SEVEN figures did NOT reproduce' KF-W4.md                1
T4-04   grep -c 'widened at repair round 6, PASS-6 D-4' KF-W4.md          1
T4-05   grep -c '5 asserting specs' KF-W4.md                              0   ↓0
T4-05   grep -c 're-counted at repair round 6, PASS-6 D-5' KF-W4.md       1
T4-11   sed -n '7,11p' KF-W4.md   → round 1 · round 2 · "a third time" · "a fourth time" · "a fifth time"   ordered
T5-02   grep -c 'this file alone' KF-W5.md                                1   (inside the strike)
T5-03   grep -c "only. clocks this file now prints" KF-W5.md              0   ↓0
T5-06   grep -c 'TWO are dependency-blocked and are named' KF-W5.md       1
T5-08   grep -c '8 count-or-set oracles' KF-W5.md                         0   ↓0
T5-08   grep -c 're-partitioned at repair round 6, PASS-6 D-7' KF-W5.md   1
T7-04   grep -c ':782' KF-W7.md                                           2
T7-06   grep -c 'every one of them now passing the four-part test above' KF-W7.md   0   ↓0
T7-06   grep -c 'no count is restated, at repair round 6, PASS-6 D6' KF-W7.md       1
T7-08   grep -c 'Added at repair round 6, PASS-6 D8' KF-W7.md             3
T7-08   grep -c "C-4's repo-wide prose arm lands NO-WAVE-OWNER" KF-W7.md  1
T7-11   grep -c 'the round-4 ellipsis is corrected at repair round 6' KF-W7.md      1
T7-12   grep -c 'all 8 non-roster identities' KF-W7.md                    0   ↓0
T7-14   grep -c 'converted at repair round 6, PASS-6 D14' KF-W7.md        2
T7-15   grep -c 'the cardinality question is DISCHARGED at that end' KF-W7.md       1
T8-01   grep -c ':101-110' KF-W8.md                                       2   (grant + subject receipt)
T8-02   grep -c 'The template is now applied whole, three ways' KF-W8.md  0   ↓0
T8-02   grep -c 'The template is applied at THREE PLACES' KF-W8.md        2
T8-05   grep -c 'round-6 3 rows / 3 paths' KF-W8.md                       1
T8-06   grep -c 'KF.W10 added at repair round 6, PASS-6 D-6' KF-W8.md     1
T8-08   grep -o '.{60}Swept whole.{60}' KF-W8.md   → the sole hit is inside ~~"Swept whole"~~, struck under LAW G
T8-09   grep -c 're-cut at repair round 6, PASS-6 D-9' KF-W8.md           1
T8-10   grep -c 'five deaths across five rounds' KF-W8.md                 1
```

**Two executions differed from the work order's literal bytes and BOTH are correct.** Recorded, because a seal that reports only agreement has not looked.

1. **`T4-01`** — the `jq` filter's pipes land escaped as `\|` (`select(.source \| startswith("demo/"))`). The cell is a markdown table cell; an unescaped `|` would terminate it. The command reads identically once the table is rendered, and the edit's whole payload (`depcruise-inventory.json` ×4, `ONE PATH, ONE WRITER, ONE CONTENT`) is present. **Adaptation, not drift.**
2. **`C-28`** — the executing seat **caught an arithmetic error in the work order itself and corrected it in flight**, at both `KF-W10.md` and `CLOSE-CERT-6` E-6: the order printed the `EH-*` partition as `3 + 2 + 6 + 4 = 16`, which sums to **fifteen** and drops `EH-1`'s leg. The landed partition is `1 + 3 + 2 + 6 + 4 = 16` over `EH-1 … EH-16`, and the correction is stated as a dated note rather than applied silently. **This is the round's best single act and it is recorded as such.**

---

## §4 — THE CROSS-WAVE ANCHOR SWEEP: 67 probes, 0 broken

**The nine probes that return zero are the nine that are SUPPOSED to.** Each is a negative assertion its own spec makes and stakes a finding on; each still holds.

| source → target | pattern | asserted | measured | verdict |
|---|---|--:|--:|---|
| KF-W1 → KF-W7 | `O-11` | 0 | **0** | HOLDS — W7's hits are `KF-CO-8` substrings; the non-consumer property stands |
| KF-W1 → KF-W2 | `O-11` | 0 | **0** | HOLDS |
| KF-W10 → KF-W4 | `dead-sweep\|consume transaction` (‑E) | 0 | **0** | HOLDS — the §B-8 phantom-fold strike survives |
| KF-W8 → KF-W7 | `devDependencies only` | 0 | **0** | HOLDS — the DH-2 phantom, confirmed a third round |
| KF-W8 → KF-W5 | `do not split mid-cure` | 0 | **0** | HOLDS |
| KF-W8 → KF-W5 | `One rename programme` | 0 | **0** | HOLDS |

The three remaining zero-returns under my first pass were **flag artefacts of the extractor** — alternation and ERE patterns run without `-E`. Re-run with the flags their specs actually paste: `grep -cE 'KF\.W1([^0-9A-Za-z-]|$)' KF-W9.md` → **2**; `grep -cE 'dock contract|Glass §4' KF-W6.md` → **2**; `grep -cE 'CH2-02|BG-5|GU-1|GU-2|subject-legible' KF-W9.md` → **6**. All resolve.

**The two seams this round touched at both ends, verified from both ends.**

- **W6 ↔ W8, the R5-6(3) reciprocal (`W6-17` + `T8-02`).** Before: `grep -n 'R5-6' KF-W6.md` → empty; `grep -nE 'lands first|execution order' KF-W6.md` → empty. After, this seat: `grep -c 'R5-6' KF-W6.md` → **1**; `grep -cE 'lands FIRST|G7 MEASURES THE RESULT AFTERWARD|EXECUTION ORDER OF THE WAVES' KF-W6.md` → **2**; `grep -c 'G7-FACTS RECIPROCAL, LANDED AT REPAIR ROUND 6' KF-W6.md` → **1**. At the W8 end the certifying clause is replaced (`The template is now applied whole, three ways` → **0**; `The template is applied at THREE PLACES` → **2**). **The seam is two-ended and agreeing for the first time.** Its comparator holds too: `grep -c 'DECLARED FROM THIS END, the reciprocal of KF.W8' KF-W4.md` → **1**.
- **W10 ↔ W6/W9, the §B-3 seam.** `grep -coE 'CH2-02|BG-5|GU-1|GU-2|subject-legible' KF-W6.md KF-W9.md` → **W6 21 · W9 24**; `grep -cE 'dock contract|Glass §4' KF-W6.md KF-W9.md` → **W6 2 · W9 3**. The row's last printed reading was W6 16 · W9 28 and W6 2 · W9 4. **All four are non-zero, which is the whole of what the restated verdict claims** — *"the far end NOW CARRIES THE SUBJECT AT BOTH ENDS"* — and the cell already declares its figures dated readings of their own clock. **Verdict HOLDS; figures superseded, as the cell says they will be.**

**The six S-10 anchors (`C-19`, `C-20`), re-run whole at KF-W10's final bytes.** `col B` is gone and `C-20`'s sibling-write-history clause is gone; the anchors are the receipt, and all six resolve:

```
(A1) grep -n 'X.KF.W9' KF-W10.md                  → 22
(A2) grep -n 'OP-4' KF-W10.md                     → 68 232 530 537 541
(A3) grep -n 'PACKET-FIRST' KF-W10.md             → 68 84 519 537
(A4) grep -n 'D. → KF.W9 (Safari Visual Audit)'   → 553
(A5) grep -n 'surface verify' KF-W10.md           → 212
(A6) grep -n 'CH2-02' KF-W10.md                   → 203 214 232 537
```

**6 of 6 resolve. 0 broken.** Their offsets are finding **S-5**.

---

## §5 — FINDINGS FOR THE CHECK TO ADJUDICATE

This seat fixed nothing. Seven findings, ranked.

### **S-1 · BLOCKER — `PASS-6/RULINGS-6.md` was never created; eight edits did not land, and LAW G has no instrument of record**

`ls docs/tranches/X/keyframes/conformance/PASS-6/` returns eleven `KF-W*-CHECK.md`, `UNION.md`, `WORK-ORDER.md`, `CLOSE-CERT-6.md` — **and no `RULINGS-6.md`.** `find docs -name 'RULINGS-6*'` → nothing. `grep -rl 'LAW G (the false-universal ban)' docs/tranches/X/` → **`WORK-ORDER.md` alone.**

Consequence, measured: **LAW G is cited in current voice by 12 landed cells across 8 of the eleven specs** — KF-W5 2 · KF-W6 2 · KF-W7 2 · KF-W9 2 · KF-W2 1 · KF-W4 1 · KF-W8 1 · KF-W10 1 — every one of them a strike whose stated authority is a law that exists nowhere. `grep -c 'RULINGS-6' KF-W*.md` → **0 in all eleven**, so not one of the twelve even names the missing file: they cite *"LAW G"* bare. The work order's own §0 names `TR-04` as the landing site for the rule's verbatim text; `TR-01`/`TR-02`/`TR-03` land the U6-C, U6-D and U6-E instruments the round's three largest class cures rest on; `TR-05` is the R5-6(3) commissioning; `TR-06` the R5-12(2) sweep; `TR-07` the LAW E(5) actor re-cut that closes hard escape 1's mechanism; `TR-08` LAW F(1)/(2)'s enforcement clause. **Eight of the round's eight standing instruments are unwritten.** The per-spec repairs those instruments generalise all landed correctly — the specs are not wrong; they are unbacked.

### **S-2 · MAJOR — `CLOSE-CERT-6.md` has no §9, and 34 landed citations point at it**

`CLOSE-CERT-6.md` contains exactly two headings: its title and `## §ERRATA`. Its own head declares the §9 hash bracket *"the RECONCILE seat's act at round-6 close and is not written by this seat."* Measured at the eleven specs' final bytes:

```
grep -oh 'CLOSE-CERT-6\.md` §9' waves/KF-W*.md | wc -l   → 34
per file:  KF-W8 27 · KF-W2 4 · KF-W10 2 · KF-W9 2 · KF-W5 1   (36 CLOSE-CERT-6 mentions in all; 34 carry §9)
```

These are not decorative. **§9 is the stamp authority of record that the entire U6-C cure re-points to** — `C-33` (KF-W10's ten-row substrate table, the class's largest instance), `T8-04` (KF-W8's twenty per-seat stamps), `T7-03`, `T5-03`, `T2-12`, `C-34`. Every one of those edits landed; every one now cites a section that does not exist. **This seat's §HASH below is the only hash bracket in PASS-6.** Whether the 34 citations are re-pointed here, or a §9 is added to `CLOSE-CERT-6.md`, is the check's ruling, not this seat's — but until one of the two happens the round's LAW E(4) retirement rests on a dangling pointer, which is D6-3's shape at the instrument the cure was built to make unfalsifiable.

### **S-3 · MAJOR — two round-6 close certificates, two names**

`PASS-6/CLOSE-CERT-6.md` (16,060 B, 16:55) and this file. `CLOSE-CERT-6` §ERRATA **E-11(b)** rules one name per certificate, round-numbered, *"ending the `CLOSE-CERT-2` / `CLOSE-CERT-5` dual spelling that produced two of this round's census defects (E-4, E-5) by making a single quantity greppable two ways."* This seat was ordered by name and by path to write `CLOSE-CERT-3.md`, and did. **The two files are not duplicates and neither is redundant** — `CLOSE-CERT-6.md` carries §ERRATA (the eleven corrections owed forward to PASS-5), this carries the round's verification receipts and its hash bracket. The defect is that *"the round-6 certificate"* is now a phrase with two referents, in the round whose own erratum bans exactly that.

### **S-4 · MAJOR — `CLOSE-CERT-6` §ERRATA E-5's corrected census does not reproduce at final bytes**

E-5 corrects the round-5 reading *"63 sites"* to **"64 occurrences on 37 lines"** and states the counting rule. Re-run at this seat over the eleven specs' final bytes, the identical commands:

```
grep -oh 'CLOSE-CERT-5' waves/KF-W*.md | wc -l           → 63
grep -c  'CLOSE-CERT-5' waves/KF-W*.md | (sum per file)  → 36
```

**63 occurrences on 36 lines — not 64 on 37.** The corrected figure is off by one in the same direction the original was, and the struck figure (63) is the true occurrence count at the round's end. Cause is mechanical and visible in the clocks: E-5 was written at **16:55**; `KF-W5.md` closed **17:01**, `KF-W7.md` **17:04**, `KF-W8.md` **17:07**. **Nothing rides it** — E-5 itself says so, and the bare name resolves for every reader regardless of cardinality — but this is a census figure, restated *with its counting rule*, at the instrument whose whole authority is that its figures reproduce, and it does not reproduce.

### **S-5 · MAJOR — `CLOSE-CERT-6` §ERRATA E-2's "final bytes" offsets are stale at four of six**

E-2 strikes `KF-W9`'s col B and re-grounds the LAW E(4) demonstration on col A ↔ col C, certifying that **col C *"is correct and reproduces exactly at final bytes (`:22 :68 :513 :547 :206 :197`)"***. Re-run at this seat against `KF-W10.md`'s true final bytes (17:00:22):

| anchor | E-2 "final bytes" | measured here | Δ |
|---|--:|--:|--:|
| A1 `X.KF.W9` | `:22` | **`:22`** | 0 ✓ |
| A2 `OP-4` | `:68` | **`:68`** (of 5 lines: 68 232 530 537 541) | 0 ✓ |
| A3 `PACKET-FIRST` | `:513` | **`:519`** | **+6** |
| A4 `→ KF.W9` cross-edge | `:547` | **`:553`** | **+6** |
| A5 §B-1 `surface verify` | `:206` | **`:212`** | **+6** |
| A6 §B-3 `CH2-02` | `:197` | **`:203`** | **+6** |

Same mechanism as S-4: the certificate closed at 16:55, `KF-W10.md`'s last write landed at 17:00, and `C-28`/`C-29`/`C-33`/`C-34` inserted six lines above four of the six anchors. **The anchors are intact and E-2's argument survives untouched** — six of six resolve, the six quoted passages are byte-exact, and *"SIX of six offsets moved"* is now demonstrable across three clocks instead of two, which strengthens it. What is false is the word **"exactly"** applied to a numeral captured before the file it describes stopped moving. That is the class E-2 exists to convict, committed by E-2.

### **S-6 · MAJOR — `T5-01`'s cured coordinates went stale again inside the same round, under a live "run this seat" label**

`T5-01` executed exactly as ordered: `KF-W5.md`'s two sibling coordinates corrected `:98` → **`:99`** and `:123` → **`:124`**, at both of their sites, with the ⟨RECONCILE SEAT⟩ block and the §0 R-1.4 cell agreeing. Re-run at this seat against `KF-W4.md`'s final bytes (16:59:17):

```
grep -n 'The ten rulings this spec owes' waves/KF-W4.md   → 100:### The ten rulings this spec owes (adjudicati…
grep -n 'Census S-2' waves/KF-W4.md                       → 125:The **phantom-AUTHORITY** arm is **taken here**…
```

**`:99` is now `:100` and `:124` is now `:125`** — off by one, in the same direction, because `T4-*` inserted a line above both. The cells carry the label **"Command, run this seat"**, which is a present-tense claim about a command's current output. **The sentences both resolve and both are byte-exact**, and the cell's own rule (*"the citation form stays the stable anchor and the coordinate stays non-load-bearing"*) disarms the consequence — but `E-10` convicted precisely this pair for being off by one, the cure landed, and the pair is off by one again at close. **A numeral corrected mid-round, in a round that rewrites its own operands, is a numeral that must be re-run at close or dropped.**

### **S-7 · MEDIUM — the bare-`KF.W1` vector's W9 cell was falsified by this round's own `C-26`**

`C-13`/`C-14`/`C-15` struck *"0 in FOUR"* at all three sites and landed the reconcile vector **`KF-W2 7 · KF-W5 0 · KF-W6 0 · KF-W8 0 · KF-W7 1 · KF-W9 1`**. Re-run at this seat with the pasted command:

```
grep -oE 'KF\.W1([^0-9A-Za-z-]|$)' <sibling>.md | wc -l
KF-W2 7 · KF-W5 0 · KF-W6 0 · KF-W8 0 · KF-W7 1 · KF-W9 2
```

The new W9 hit is at `KF-W9.md:640`, inside the text **`C-26` itself landed** — *"no mint is imported, no KF.W1 coordinate rides here… Entered at repair round 6 (PASS-6 D6-8)"*. **The load-bearing property is untouched and is in fact reinforced**: the new hit is another explicitly *declared non-edge*, which is what the six-non-consumer claim turns on. Only the printed per-sibling numeral is stale, at one of six, and it was staled by a sibling edit in the same batch.

### Two observations, filed without a severity

- **`T8-09` cured one site of a class of eight.** The order named the §Bounds row and the seat landed it exactly (`:25-28` → `:25-27`, with the reason). At final bytes `grep -c ':25-28' KF-W8.md` → **7** — the same docblock extent survives at R-1, S-2, the A-5 non-import-context receipt and four further citing cells, three of which call `:25-28` *"docblock prose"*, which is the exact predicate `D-9` falsified. **Out of the edit's stated scope; in scope for the class.**
- **`T8-02`'s `→ KF.W6` cross-edge companion keeps its deferred voice.** The §State assertion was fully re-written (`The template is now applied whole:` → **0**), but the cross-edge still reads *"KF.W6's own G7-facts row, **that seat's to state (R5-6(3))**"*. That row now exists (`W6-17`), so the sentence's claim — *"It is now declared at three places"* — is **TRUE**; only the tense is a leftover.

---

## §6 — VERDICT

**The wave layer's round-6 repair LANDED.** 122 of 130 edits verified at the bytes; both hard escapes dead and measured; every LAW G strike present in its enumerated form, including the one law (`W6-08`) that names its own verification pattern and passes it at **6 of 6**; both re-worked seams two-ended and agreeing; **zero cross-wave anchors broken across 67 re-run probes.** The executing seats did their work faithfully and, at `C-28`, better than the contract they were handed.

**The round is NOT SEALED, and this seat does not seal it.** Its standing-instrument layer is missing entire (**S-1**), its certificate's declared hash section does not exist while 34 landed cells cite it (**S-2**), and it now has two close certificates under two names (**S-3**). Those three are structural and belong to the check. **S-4**–**S-7** are four stale figures, none load-bearing, all products of one mechanism the round already knows by name: *a numeral captured before the bytes it describes stopped moving*. Six seats measured; the seventh moved the file.

*SEAL SEAT, PASS 6. Verification only. This file is the seat's sole write. No spec, no check, no union, no work order and no prior-pass artifact was edited, and no figure above was inherited.*

---

## §HASH — the round-6 closing bracket, sha256 over the eleven specs

**This block is the last act of this seat.** Command pasted with its **whole** output, per LAW D(3). Abbreviations, where any reader needs one, are produced by `cut -c1-8` and `rev | cut -c1-4 | rev` over these values and never transcribed by hand (`CLOSE-CERT-6` §ERRATA E-11(a)).

**Substrate, stamped at capture:** `KF-W0.md` 257,985 B 16:49:20 · `KF-W1.md` 253,510 B 16:56:26 · `KF-W2.md` 360,896 B 16:54:19 · `KF-W3.md` 190,569 B 16:55:18 · `KF-W4.md` 244,262 B 16:59:17 · `KF-W5.md` 302,497 B 17:01:41 · `KF-W6.md` 306,972 B 16:51:21 · `KF-W7.md` 259,042 B 17:04:44 · `KF-W8.md` 264,219 B 17:07:18 · `KF-W9.md` 274,478 B 16:58:16 · `KF-W10.md` 261,141 B 17:00:22 — all 2026-08-29.

```
$ shasum -a 256 /Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W*.md

79f2388886cbab1a1ae7af753767890caf89f40f1392e53cd3f26280d9fa9ad7  /Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W0.md
ee33bf25cb2a77daba206ae2a16e05cb78ada702dd40cebb211300a822b97aa7  /Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W1.md
c3ae7794fa1542cd854078f7d15d332e74c45a659dfffd82fe472b1c2962e296  /Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W10.md
902f12924a681f042cfa7123890faf766761595df639c6f2f8e1d6dedb392d2c  /Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W2.md
c2d648ad05850c113b13a2ffffe1ecf37c8ed6593ba13c753b38c9df43e8db00  /Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W3.md
bd8bc495e07810a04d7bde26c233718b61101a418c6e6670d61912b8bca63521  /Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W4.md
61b9183ff1765806c79df0d9a11423177898a6cb307e410a87ae1076dcea296c  /Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W5.md
6019f5bf907bdb947e54f092eaed864e958d819221719f9f0cf127b1a45effdc  /Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W6.md
c9fb9a565097bb071e54734a6b911c4d14b2fa2c6de5255a9130af50b148f52a  /Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W7.md
706f37cfdf095897df1f205e815bb67d1a4b8f624e24c415bcc59a16e33cc8fe  /Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W8.md
917da19189dc62f32b3afb1826000065aa84a1e973caaea02b0e1131bce6d618  /Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W9.md
```

**Eleven of eleven. Nothing follows this block.**

