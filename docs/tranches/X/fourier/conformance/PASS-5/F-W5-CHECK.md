# X·F CONFORMANCE PASS 5 — F-W5 CHECK (fresh adversarial seat, L-18/L-20)

**Seat**: FRESH pass-5 checker, 2026-08-29. Read no prior F-W5 check before measuring; RULINGS-4 and CENSUS-CANONICAL read first, F-W5.md measured against them.
**Subject**: `docs/tranches/X/fourier/waves/F-W5.md` (429 lines).
**Census operand (sole)**: `docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md` §2 — `F.W5` (28) ⊕ `F.W5-W8` (90) = **118 record-side rows**.
**Toolchain**: `bash` + BSD `/usr/bin/grep` / `sed` / `comm` / `cut` / `rev` on the recorded host. Every ⟨cmd⟩ below was run by THIS seat (non-author), from a stated base.

**LOCAL VERDICT: DEFECTIVE** — 3 axes HOLD (census, M-25 depth, posture), 2 axes carry defects (receipt reality, gates/booking-law). 9 defects, 2 HIGH.

---

## Axis 1 — ROSTER BOOKED/CITED COMPLETE: **HOLD**

Roster arithmetic re-derived from the canonical, not from the spec:

```
cd docs/tranches/X/fourier/conformance
/usr/bin/sed -n '4990,5038p' CENSUS-CANONICAL.md | /usr/bin/grep -oE '\([0-9]+\)' | tr -d '()' | /usr/bin/awk '{s+=$1} END {print s}'
→ 118
```

§2c's per-record landing table was diffed id-by-id against the canonical's two rosters: **all 118 canonical (record, id) pairs are present in §2c, and no §2c row names an id the canonical does not home at F.W5/F.W5-W8.** The two FSE 18-sets, the AFP 12-set and the AUL 11-set match as sets (ordering differs only).

Every landing was then verified to be REAL rather than asserted: for each of the 115 distinct (id → register) pairs, the named register row was extracted by `^\| \*\*[A-G][0-9]+c?\*\*` and the id matched under a strict left/right boundary (no digit may follow, no alnum/`-` may precede). **Strict misses: 0. No register named by the landing table is absent from the file.**

- **booked = 117 · cited = 1 · escaped = 0.**
- The one CITED row is `fr-PaperSearchDropdown C:C-23`, cited to §4's F.W5→F.W2 edge with F.W2 named as the adopting wave (line 391 carries the record's own `:77` bytes and the naming). That is R4-10's lawful citation form.

*Defects 2, 4 and 5 below are the CONVERSE direction (fabrication / unmarked-leg / mis-key), not roster escapes. The 118 are covered.*

### Canonical spot-audit — 5 records against `registry/adjudicated/` bytes

| record | canonical claim | bytes | verdict |
|---|---|---|---|
| `fr-ContourPreview` | `L:L-5` → **F.W5** sole | `:46` terminal cell → *"ADJUDICATED → **F.W5** (readonly/`getPoints` seam; a TWO-member change …)"* | CONFIRMED |
| `fr-EquationModeToggle` | `FR-EMT-20` → F.W5; `FR-EMT-1` → F.W5 (leg F.W4) | `grep -now 'F\.W5'` → `:31` (FR-EMT-1 row) · `:50` (FR-EMT-20 row) · `:98` | CONFIRMED |
| `fr-GalleryAdminBanner` | GAB-12 → F.W5-W8 · GAB-15 → F.W5 (leg F.W4) · GAB-16 → F.W5 · GAB-17 → F.W4 (leg F.W5) | per-id routing-token extraction returns exactly those sets | CONFIRMED |
| `fr-EquationResult` | `FR-EQR-32` → F.W5; `FR-EQR-4` → F.W4 (leg F.W5) | both rows carry the stated pair | CONFIRMED |
| `fr-EditorControlsDock` | `C-6` (alias `C-7`) → F.W5-W8 | `:156` → *"**C-6 → intake R3-7b** (instantiated at `POST /api/contours`); **C-7** rides the same F.W5–W8 …"* | CONFIRMED |

**No canonical error found.** Nothing is filed against `CENSUS-CANONICAL.md` this pass.

---

## Axis 2 — RECEIPT REALITY: **DEFECTIVE** (23 of 29 re-run reproduce to the digit; 6 are unrunnable)

106 backticked ⟨cmd⟩ forms were extracted. **No `-P`, no `\K`, no lookaround, no `.{n,m}` with m > 255** anywhere in the file (the single `-P` string at line 376 is the law being restated, not used). R4-2 items 1, 2 and 4 HOLD.

**Twenty-three re-run by this seat, all reproducing exactly** (bases: `R=docs/tranches/V/megatranche/registry/adjudicated`, `$X/waves`, repo root):

| # | ⟨cmd⟩ | published | re-run |
|---|---|---|---|
| 1 | `ls docs/tranches/X/fourier/carry/` | `F-W1-CARRY.md  F-W4-CARRY.md` | same |
| 2 | `R=…; ls "$R"/fr-*.md \| wc -l` | 66 | 66 |
| 3 | `sed -n '81,87p' "$R"/fr-FourierShapeExtractor.md` | `L-m3 / C-10 · L-m4 / C-12 · L-m5 · M-5 · M-7 · M-8 · M-9` | exactly those, at the record's own spacing |
| 4 | `sed -n '87,91p' "$R"/fr-AdminAuditLog.md` | `AA-44 … AA-48` | same |
| 6 | `grep -n '^### ' fr-FourierShapeExtractor.md` | last band ≤ `:81` = `69:### MINOR (21)` | `43/47/69/93` — confirms |
| 7 | `grep -n '^### ' fr-AdminAuditLog.md` | last band ≤ `:87` = `85:### INFO` | `33/39/62/85` — confirms |
| 10/11 | `grep -rl 'P-9'` / `grep -lw 'P-9'` | 6 / 0 | 6 / 0 |
| 12/13 | `grep -lw 'AA-45'` / `grep -lw 'K-13'` | 1 / 40 | 1 / 40 |
| 14/15 | band occurrence probes | 120 hyphen / 72 en-dash | 120 / 72 |
| — | band record widths + `comm -13` | 26 / 24 / union 49 / en-dash-only 23 | 26 / 24 / 49 / 23 |
| 18–21 | `M-10` width, occurrences, lines | 23 records; 2 & 4 occ; 2 & 3 lines | identical |
| 22 | collider widths `C-7 · C-3 · R-7 · M-9 · R6-8` | 46 · 53 · 32 · 18 · 37 | identical |
| — | K-13 bracket-class ERE under `/usr/bin/grep` | 40 | 40 |
| 84 | `grep -cE '^\| \*\*[A-G][0-9]+c?\*\*' F-W5.md` | 93 (71 clause + 22 gate) | 93 — and the split is 71/22 exactly, §A 6 · §B 5 · §C 5 · §D 16 · §E 20 · §F 9 · §G 10 |
| 86 | `grep -n 'C-28' "$R"/fr-CanvasControlsDock.md` | THREE hits `:45 :102 :150` | same three |
| 92/93 | `P-9` against the canonical / the 66 | 0 / 0 | 0 / 0 |
| 95 | `sed -n '59p' fr-SpeedSelect.md \| rev \| cut -c1-120 \| rev` | the 120-char span, in full | byte-identical |
| 98/99/106 | F-W0 `G-1[12]` headings · `SUBSTRATE-LEDGER` · fold spec count | two headings · present · `8` | identical |
| 100 | `grep -n "The roster is" F-W1.md` | ONE hit, the TWELVE-limb span | 1 hit; `grep -cF` of the quoted span → 1 |
| 102 | `grep -n 'THE GUARDRAIL IS THE INCUMBENT' F-W10.md` | one hit, the Dissent-RECORDED span | 1 hit; `grep -cF` of the full quoted span → 1 |
| 103 | `grep -n -F 'Zero-cells are EXPORTED from F.W5' F-W4-CARRY.md` | one hit | `:18` |
| 97/65 | COHESION.md both-ends law · SS-4 prerequisite | one hit each | `:77` · `:70` |
| 34/36/37/39/40/42/45/46/48/49/50/52/53/54/58/59/60/62/63/67/68/74/75/78/79/81/83 | the banked-quotation `grep -n -F` set | hits at the cited lines | **all 27 hit**; `grep -c -F 'declared on both sides, implemented on NEITHER.'` → **0**, i.e. R4-1 item 6's strike of the B4 triple-star coinage is correctly landed |

**The six that are NOT runnable are D-1 below.**

---

## Axis 3 — M-25 DEPTH (locks by banked id; aliases beside heads): **HOLD**

Checked against the canonical's §1 alias column, which is the only place a head/alias pair is authoritative:

| site | spec | canonical §1 | verdict |
|---|---|---|---|
| E19 | `D-14 / MIN-4 / MIN-5 / MIN-10 / MIN-11` | `fr-VisualizationView D-14`, aliases `MIN-4 · MIN-5 · MIN-10 · MIN-11`, home **F.W5** | head + all four aliases beside it — exact |
| F9 | `D-10 + D-L12 + C-22 (EquationPanel)` | `fr-EquationPanel D-10`, aliases `D-L12 · C-22`, home **F.W5-W8** | exact |
| C1 | `C-6/C-7 (EditorControlsDock)` | `C-6` alias `C-7`, home **F.W5-W8** | exact |
| G2c | `L-B2 / C-2 (one identity)` | `fr-FourierShapeExtractor L-B2` alias `C-2` | exact — and E17's *"nor fr-FourierShapeExtractor C-2 at G2c"* is TRUE, not a fabricated homonym |
| D10 identity minute | the WAVE-LOCK `C-2` is `fr-GallerySearchBar FR-GSB-6`'s alias, home F.W3 | `FR-GSB-6`, aliases `C-2 · L-9 · C-14`, home **F.W3** | exact — E17's *"NOT fr-GallerySearchBar C-2 at D10"* also survives |
| A5 | `FR-NP-30` restored as the banked head, `FR-NP-30b` beside it | canonical homes `FR-NP-30` at **F.W5** | R4-4/anti-rename cure correctly landed |
| E14 / G9c / E17 / F2 / F6 | homonym disarms `(NOT fr-CoefficientsSpectrum M-13 …)`, `(NOT fr-BasisSelector M-9 at D12)`, `(NOT fr-FourierShapeExtractor L-B1 at G1c)`, `(NOT fr-FourierShapeExtractor L-M3 at G5c)` | all four resolve at the canonical | record-qualification is real, not decorative |
| B1 | R6-8 booked as FOUR record-qualified rows | canonical homes `R6-8` at fr-AnimationControls, fr-CanvasControlsDock, fr-ConvergencePlot (F.W5) ⊕ fr-EasingCurvePreview (F.W5-W8) | exact — and `fr-AdminUserList:161`'s R6-8 is correctly read as a citation-inside-another-row, booking nothing |
| §2c | R4-6.4's `AA-23` HOST row | booked at **D15**, present in D15's rows-folded cell, with the cure lock in F.W5's own voice | R4-6.4 discharged |

The M-25 bar (*a spec ignoring adjudicated rows is DEFECTIVE; transcription-only is DEFECTIVE*) is met: clauses agglomerate by identity, cure-shape locks are carried in the record's bytes with a re-runnable ⟨cmd⟩, and the routing is by mechanism. **The one under-declaration is D-6 below, and it is about the collider ROSTER, not about any individual lock.**

---

## Axis 4 — GATES: canonical operands only ✓ · reachable GREEN ✓ · portable commands ✗

- **Canonical operands only — HOLD.** G19's LHS is *"the CANONICAL F.W5 band … and nothing else"*; `162`, `167`, `170` are all struck by name; §1c's third-iteration halt is re-keyed to the same canonical rosters; §6 item 1 re-bases identically and demotes the two carry anchors to RHS corroboration. No gate cites a check file, a pass index or this file's own arithmetic. R4-3/R4-5/R4-10 discharged.
- **Reachable GREEN — HOLD.** All 22 gates carry a named green owner and a close condition; the four ⊙ owner-gated (G4, G7, G10, G11) name the owner and are not authored ruled; G19/G20/G21/G22 close on F.W5's own units (a/e), which §1a charters. G16's DO-NOT-REGENERATE tripwire and G13's single-quotation rule are stated once each.
- **Portable commands — DEFECTIVE.** D-1.

---

## Axis 5 — POSTURE: **HOLD**

| requirement | site | verdict |
|---|---|---|
| F.W1 transaction whole | §4 line 390 — *"F.W1 is ONE atomic land-or-lose transaction — the TWELVE-limb roster chartered at `F-W1.md` §4 step 4 — cited whole, never restated here"* | HOLD; re-verified at F-W1's bytes (`grep -cF 'The roster is TWELVE limbs and stays twelve'` → 1). The former ELEVEN spelling is struck |
| W7 ∅ closed | §4 line 394 — F.W7 *"CITES; F.W5 STATES … books no registry row of its own (its routing census is a measured ∅, R-11)"* | HOLD; agrees with canonical §4.1 and R4-10's table (F-W7 → 0) |
| SS-4 flags | §4 line 397 + §2a; the nine owner rulings enumerated inline, TA-4 named as prerequisite-or-explicit-rescope | HOLD |
| tree READ-ONLY | masthead line 21 · §1b line 74–75 · §3 line 352–354 | HOLD. Every ⟨cmd⟩ in the file is `ls`/`grep`/`sed`/`comm`/`cut`/`rev` — non-mutating without exception. The round-3 strike of *"none reads `$F` at all"* is correctly landed: `$F` is READ and never written |
| status planned | line 23 · line 428 | HOLD |
| zero VERIFIED | §0 verb table — `VERIFIED \| NO` | HOLD; no `VERIFIED … YES` anywhere |
| RULINGS-4 applied | R4-1.6 (B4 triple-star struck, `grep -c -F` → 0) ✓ · R4-4.5/R4-2.3 (`$R` assigned at line 14) **partial** ✗ · R4-5 (170 struck, canonical adopted) ✓ · R4-6.4 (AA-23 host at D15) ✓ · R4-7.1 (the `rev\|cut` half-paste cured at §2c and §5, both printing the full 120 chars) ✓ · R4-7.3 (occurrences-vs-lines spelled at line 107) **partial** ✗ (see D-3) · R4-10 (roster) ✓ booking / ✗ fabrication arm | MIXED |

---

## DEFECT REGISTER

### D-1 · HIGH — six ⟨cmd⟩ receipts consume `$V`/`$X`; neither variable is ever assigned in shell-runnable form. R4-2.3 + R4-2.5 convict on sight; the ruled cure was applied to `$R` alone.

`R=docs/tranches/V/megatranche/registry/adjudicated` is a real assignment (line 14) — the R4-4.5 cure, correctly landed. **`$V` and `$X` are not.** They appear only as prose (line 21 / line 352: `` `$V` = `/Users/mkbabb/Programming/value.js` ``; line 36: a table cell naming three bases), and `$V = /Users/…` is not a bash assignment at all.

```
/usr/bin/grep -nE '(^|[^A-Za-z0-9_])V=' F-W5.md   → (no output)
/usr/bin/grep -nE '(^|[^A-Za-z0-9_])X=' F-W5.md   → :36 and :175, both inside prose, neither an executable assignment
```

Six consumers, re-run by this seat with the variable unset:

| line | ⟨cmd⟩ | published | run as written |
|---|---|---|---|
| 66 | `ls $V/docs/tranches/X/fourier/contract/` | *No such file or directory* | `ls: /docs/tranches/X/fourier/contract/: No such file or directory` |
| 67 | `ls $V/docs/tranches/X/coordination/` | *exactly one file, `ATLAS-TO-VALUE-2026-08-03-RULINGS.md`* | `ls: /docs/tranches/X/coordination/: No such file or directory` |
| 128 | `sed -n '61p' $V/api/src/modules/palette/model.ts` | the 3-state visibility comment | `sed: /api/src/modules/palette/model.ts: No such file or directory` |
| 205 | `grep -rniE "merkle\|flat bag\|…" $V/api/src $V/src` | a measured negative | fails on both operands |
| 205 | `ls $V/api/src/lib` | *No such file or directory* | `ls: /api/src/lib: No such file or directory` |
| 341 | `grep -cw 'P-9' "$X"/conformance/CENSUS-CANONICAL.md` | **0** | `grep: /conformance/CENSUS-CANONICAL.md: No such file or directory` |

Two aggravations. **(i)** Line 66 is a **phantom witness in the exact sense R4-2.3 names**: with `$V` empty it prints a message textually indistinguishable from its published paste, so the receipt reproduces for the wrong reason — and **G21's born-RED witness rests on it** (*"no `operation-register.md` exists (`ls $V/docs/tranches/X/fourier/contract/` → No such file or directory)"*). **(ii)** Line 67 is **G20's born-RED witness** and does *not* reproduce as written; the file's own §1a calls it *"this is G20's own witness"*. R4-1.E-3 count (iv) convicted precisely this shape for `$R` (*"3 uses, 0 definitions"*) and R4-2's re-cut table prescribes the cure verbatim: `V='<value>'` declared in-block. It was applied to one of three variables.

**Receipt**: the table above, this seat, 2026-08-29, `( unset V; … )` / `( unset X; … )` from `/Users/mkbabb/Programming/value.js`.

### D-2 · HIGH — §2c's *"Four sites in this file carried a leg in a booking voice, and each is re-marked at its clause"* is FALSE. At least **17 further clause sites book 20 canonically-elsewhere-held ids in the rows-folded (operand) column with no LEG-CITED / HELD-AT mark**; two of them the canonical does not route to F.W5 at all.

The four re-marked sites (D7 `fr-ContourSettings B-1`, D12 `M-10`, F5 `M-15`, D10 `fr-GalleryInfiniteGrid C-4/D-13`) are correctly marked. The universal *"each is re-marked"* is what fails. Homes read from `CENSUS-CANONICAL.md` §1's HOME column:

| clause | id (record-qualified) | canonical HOME | marked? |
|---|---|---|---|
| A3 | `fr-InfoCard FR-IC-6` | **F.W4** (leg F.W5-W8) | no |
| A6 | `fr-UserSlugBar FR-USB-37` | **NWO (packet)** — routes `NO-WAVE-OWNER` only, **no F.W5 route at all** | no |
| A6 ⊕ C3 | `fr-GalleryView FR-GV-7` | **F.W3** (file-criterion §5.d; leg F.W5-W8) | circular only — see D-4 |
| B5 | `fr-HarmonicLevelGrid HLG-23` | **F.W4** (leg F.W5) | no |
| C3 | `fr-AppHeader FR-AH-6` | **F.W4** (leg F.W5-W8) | no |
| D1 | `fr-GalleryDraftsSection F-6` (bold) | **NWO→SS-3** (legs SS-4, F.W5) | no |
| D10 | `fr-GallerySearchBar FR-GSB-1` — *"fold here"* | **F.W4** (leg F.W5-W8) | no |
| D11 | `fr-GalleryAdminBanner GAB-17` | **F.W4** (leg F.W5) | no |
| D14 | `fr-VisualizationView VV-R2-B` (the clause's primary operand) | **F.W4** (leg F.W5-W8) | no |
| D16 | `fr-AdminAuditLog AA-24` | **F.W4** — routes `F.W4` only, **no F.W5 route at all** | no |
| D17 | `fr-AdminFlaggedPanel FR-AFP-32` (the clause's primary operand) | **F.W3** (legs F.W5-W8, SS-13) | no |
| E5 | `fr-CanvasControlsDock D-4` · `fr-GalleryDraftsSection B-2` | **F.W4** (leg F.W5-W8) · **F.W3** | no |
| E6 | `fr-VisualizationView VV-R2-A` | **F.W4** (legs F.W5-W8, SS-13) | no — and D14 simultaneously claims to *"own the joint identity"* of it |
| E13 | `fr-ContourSettings m-18` | **F.W3** (file-criterion §5.d) | no |
| E18 | `fr-AdminAuditLog AA-10` | **F.W4** (leg F.W5-W8) | no |
| F2 | `fr-EquationView B-2` · `fr-FunctionInput L-B1` | **F.W4** (leg F.W5-W8) ×2 | no |
| F6 | `fr-FunctionInput L-M3` | **F.W4** (leg F.W5-W8) | no |
| F7 | `fr-ConvergencePlot L-M7 / C-8` | **F.W4** (leg F.W5) | no |

`fr-AdminAuditLog AA-24` (D16) and `fr-UserSlugBar FR-USB-37` (A6) are the sharper class — **R4-10's fabrication clause exactly**: *"an id booked that the canonical does not home there is that wave's fabrication."* Neither carries an F.W5 or F.W5-W8 routing token anywhere in the census of record.

This does not create a roster escape (axis 1 still HOLDs at 118/118) — it creates the mirror hazard R4-6 was written to kill: **twenty ids sitting on two waves' operand lists at once**, with F-W5's own §2c certifying that exactly four such sites exist and are all marked.

**Receipt**: canonical §1 HOME cells, e.g. `` `AA-24` | `C·D-8` | `F.W4` | **F.W4** ``; `` `FR-USB-37` | `C-i2` | `NO-WAVE-OWNER` | **NWO (packet)** ``; `` `FR-AFP-32` | `D-16` · `L-13` · `C:D-15` | `F.W3` · `F.W5-W8` · `SS-13` | **F.W3** <sub>legs: F.W5-W8, SS-13</sub> ``.

### D-3 · MEDIUM — count-word contradicts its own enumeration at §2's collider block: *"`R-7` (**FOUR** identities, not three: …)"* names **THREE**.

Line 111, verbatim: *"⊕ **`R-7`** (FOUR identities, not three: `lane-crud §R-7` at C3/E18 · `GCM-3 R-7` at E6's repair-test lock · **`fr-GalleryInfiniteGrid R-7`**, now booked at D10 — pass-4 D-3's escape …)"*. The list holds three members. R4-7.3 is explicit — *"where the prose and the list disagree, the LIST is authoritative and the prose is corrected"* — and the emphatic *"not three"* makes it a deliberate assertion rather than a slip. The same file contradicts it at line 177: *"the token `R-7` is present three times in this file, as `lane-crud §R-7` at C3/E18 and `GCM-3 R-7` at E6"*. This is the P4-11 / R4-7.3 class re-committed **inside the round-4 repair text that cures it elsewhere** (the M-10 occurrences-vs-lines cure two paragraphs above is correct).

**Receipt**: `python3` extraction of line 111's `R-7` parenthetical, printed above; the three `·`-separated members are the whole list.

### D-4 · MEDIUM — `fr-GalleryView FR-GV-7` is cited in a closed two-clause loop; neither end names its canonical holder.

A6's cell: `FR-GV-7 (=M-9/C·M-9; cited at C3)`. C3's cell: `FR-GV-7 (cited A6)`. The canonical homes it at **F.W3** (file-criterion §5.d, leg F.W5-W8). R4-10's citation form requires the holder BY NAME (*"held at F-W3 §…"*); a citation whose referent is the other clause of the same spec resolves to nothing outside the file and is unfalsifiable by an id-keyed differ — the same shape as pass-4's D-3 escape, one level up.

**Receipt**: `A6 :: FR-USB-37 (C-i2) · FR-GV-7 (=M-9/C·M-9; cited at C3)` ⊕ `C3 :: … · FR-GV-7 (cited A6)`; canonical `` `FR-GV-7` | `M-9` · `C·M-9` | `F.W3/W4` · `F.W5-W8` | **F.W3** ``.

### D-5 · MEDIUM — §2c's landing table mis-keys two canonical rows to registers that do not book them.

- **`fr-ContourSettings i-7` → B1.** B1's rows-folded column does not carry `i-7`; the token appears only inside B1's LOCK cell, in the fold-by-reference list *"(fr-AnimationControls C-30, CanvasControlsDock C-28, EasingCurvePreview RESOLVER, **fr-ContourSettings i-7**, fr-BasisCanvas C-5)"*. Its actual booking is at **E13** (*"fr-ContourSettings B-4 = C-1 ∘ C-25 / R6-8 ⊕ **i-7** ⊕ m-18"*).
- **`fr-ConvergencePlot K-13` → F7.** F7's rows-folded column books `L-M7 + C-8 (ConvergencePlot)` — a canonically **F.W4**-held row (D-2) — while `K-13`, the record's one canonical F.W5 row that F7 is supposed to carry, appears only in F7's lock cell as a cure-binding quotation.

§2c calls itself *"the answer sheet"* to G19's *"question"*. An answer sheet that points at a cell which does not book is not answerable by the set-difference G19 states; both rows survive only under a whole-line read, which is exactly the charitable reading R4-2.5 forbids for machinery.

**Receipt**: rows-folded cells printed above — `B1 :: … · fr-BasisCanvas C-5 · row 26 C:C-12 (ImageUpload) · D-L4+C-7 (ConvergenceLegend) · FR-EQR-32 (C-§0.4) · AA-31 (C·D-12) · fr-FourierShapeExtractor C-7 (cited G7c)` (no `i-7`); `F7 :: L-M7 + C-8 (ConvergencePlot)` (no `K-13`).

### D-6 · MEDIUM — the declared collider roster under-declares again, by the mechanism the block itself names.

Line 111 widens the roster to `M-13 · L-B1 · L-M3 · C-17 · C-18 · B-1 · B-2 · C-2` ⊕ `M-10` ⊕ `M-9` ⊕ `C-7` ⊕ `C-3` ⊕ `R-7` ⊕ `R6-8` ⊕ record-local `K-n`, on the stated ground that *"it escaped **because** this roster under-declared."* At least five more tokens collide across records **inside this wave's own 118**, and none is declared:

| token | colliding identities (canonical §1/§2) |
|---|---|
| `i-7` | `fr-ContourSettings i-7` (**F.W5-W8**, booked E13) vs `fr-CollapsibleSection i-7` (NWO→SS-3) |
| `C:C-12` | `fr-ImageUpload C:C-12` (**F.W5-W8** banked head, booked B1) vs `fr-HarmonicLevelGrid HLG-23`'s alias `C:C-12` (F.W4) — and **B5 prints exactly the fused form `HLG-23 (C:C-12)`** |
| `C-6` | `fr-EditorControlsDock C-6` (**F.W5-W8** head) vs `fr-FourierShapeExtractor L-M3`'s alias vs `fr-AppHeader FR-AH-6`'s alias vs `fr-BasisCanvas BC-9`'s companion |
| `C-5` | `fr-BasisCanvas C-5` (**F.W5-W8** head) vs `fr-FourierShapeExtractor L-M5`'s alias vs `fr-EditorControlsDock D-12`'s alias |
| `L-B2` | `fr-FourierShapeExtractor L-B2` (**F.W5-W8** head) vs `fr-EquationModeToggle FR-EMT-1`'s alias |

**Receipt**: canonical §1 alias cells — `` `L-M3` | `C-6` ``, `` `L-M5` | `C-5` ``, `` `FR-AH-6` | `C-6` ``, `` `D-12` | `C-4` · `C-5` ``, `` `FR-EMT-1` | `L-B2` · `C-1` · `D-9` ``, `` `HLG-23` | `C:C-12` ``; canonical §2 `fr-CollapsibleSection (3): i-1 · m-14 · i-7`.

### D-7 · LOW — a receipt published with no ⟨cmd⟩, in the one paragraph whose siblings all carry theirs.

Line 266: *"token-bounded `F.W5` = **245 occurrences on 240 lines across 54 records** (sole-`F.W5` = 245 − 192 = **53**)."* The two band figures in the same sentence each publish a ⟨cmd⟩; this triple publishes none. R4-1's opening law: *"a receipt may only be published beside the command that produced it."* The figure is TRUE — this seat reconstructed the instrument and got it exactly — so the defect is form, not fact.

**Receipt**: `/usr/bin/grep -row 'F\.W5' fr-*.md | wc -l` → **245** · `-rw` → **240** · `-rlw` → **54**, this seat, `$R` base.

### D-8 · LOW — §0's AUDITED cell mis-cites the ruling that licenses D-1.

Line 36: *"**THE THREE RECEIPT BASES ARE DECLARED HERE, FILE-WIDE (repair round 4, R4-2.4 …)**"*. R4-2 item 4 is *"One command, one base: a receipt may not splice two commands over one undisclosed base."* The item about variables is **R4-2.3**, and it says the opposite of file-wide: *"Every shell variable a ⟨cmd⟩ consumes is DEFINED in the same published block (`R=…` on the line above its first use)."* The masthead at line 11 cites R4-2.3 correctly for the `$R` cure; §0 then invents a file-wide licence under a ruling number that does not carry it, and D-1 is what follows.

### D-9 · LOW — §2c's RHS definition includes a register its own §5 declares empty of the LHS.

Line 260: *"**RHS = this file's registers**: the §A–§G clause tables ⊕ §4's cross-edge citations ⊕ **§5's carried-by-citation table**."* Line 409: *"**ALL FOUR rows below are now OUTSIDE the LHS**"* (`AA-48` UNROUTED · `P-9` in zero records · `AA-44` F.W9 · `SS-L-07/SS-C-10` F.W4). A register with no LHS member contributes nothing to covering the 118; naming it as an RHS operand re-introduces, in miniature, the both-sides shape R3-4.5 killed.

---

## SUMMARY

| axis | verdict |
|---|---|
| 1 · roster booked/cited complete | **HOLD** — 118/118; booked 117 · cited 1 · escaped 0; canonical spot-audit 5/5 CONFIRMED |
| 2 · receipt reality | **DEFECTIVE** — 23/23 re-run reproduce to the digit; 6 further ⟨cmd⟩s unrunnable as written (D-1) |
| 3 · M-25 depth | **HOLD** — heads/aliases exact at every checked site; homonym disarms all resolve |
| 4 · gates | **MIXED** — canonical-only operands HOLD, reachable GREEN HOLD, portable commands FAIL (D-1) |
| 5 · posture | **HOLD** — F.W1 whole · W7 ∅ · SS-4 inline · READ-ONLY · planned · zero VERIFIED; RULINGS-4 mixed |

**VERDICT: DEFECTIVE.** Nine defects — 2 HIGH (D-1 unrunnable `$V`/`$X` receipts incl. G20's and G21's born-RED witnesses; D-2 twenty unmarked leg/fabrication bookings under a false "four sites" universal), 4 MEDIUM, 3 LOW. The census axis is the strongest it has been in five passes: the canonical operand is adopted without residue, the landing table is complete and every landing is real. The failures are in the two places round 4 declared cured — the portable-command law applied to one variable of three, and the leg/host law certified exhaustive at four sites when the operand columns hold twenty.

*— end of F-W5-CHECK, pass 5. Every figure above was produced by a command this seat ran; no figure is inherited from any prior check file, and no prior pass's F-W5 check was read before measuring.*
