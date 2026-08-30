# X·F CONFORMANCE PASS 5 — SEAL (round 5 repair, verify-only)

**Seat**: SEAL SEAT, X·F round 5, 2026-08-29. **VERIFY-ONLY. This file is the seat's only write, and it is the seat's only act of any kind.** Zero edits to any wave spec, to the canonical, to the corpus, or to product source. Landed-wrong findings are recorded here and cured nowhere.
**Toolchain**: `PATH=/usr/bin:/bin:/usr/sbin:/sbin`, BSD `/usr/bin/grep` · `sed` · `awk` · `find` · `shasum` · `/bin/ls`. Never the interactive `grep` (a shell function wrapping `ugrep`).
**Operands**: `PASS-5/WORK-ORDER.md` (175 edits, read whole) · the eleven `waves/F-W*.md` at the bytes tabled at §5 · `conformance/CENSUS-CANONICAL.md` at `3e0a9acb3381` · the frozen corpus at `docs/tranches/V/megatranche/registry/adjudicated` (`35fc8ebf`, immutable, read-only).
**Two-key standing**: this seat authored no wave spec, no check, no union, and no work order in this programme. In particular it did not author **F-W4 §Y**, so its re-run of MID-20 · MID-21 discharges R4-4's two-key rule.

---

## §0 THE VERDICT IN ONE PARAGRAPH

**The repair landed.** All 175 work-order edits carry a landing signature at the settled bytes; **169 landed correct and six landed wrong or partial**, none of them a booking, a grade, a rename or a canonical re-cut. The two structural claims the round rests on are verified independently and by machine: **F-W1's §6·R4 roster paste and F-W3's §X.1-v5 register are byte-identical to the cured canonical** (`diff` exit 0, 65 records / 358 ids and 59 records / 928 ids respectively), and **twenty-eight of the re-cut portable commands re-run to exactly the figures their specs publish**. The six defects are concentrated in one class and it is the class §F item 2 named in advance: **the purge seat did not run last.** Fifteen of the sixteen sibling rows across the five R4-8.3 pin tables are false at the settle, and the R4-8.2 certificate LAW E has owed for five rounds is owed still. Every stale row is a hash of a file that moved *after* the row was written; no quotation pinned to a stale row failed to reproduce at this seat. **The mechanism worked; the instrument is again the thing that lies.**

---

## §1 LANDING CENSUS — 175 of 175, by batch

| batch | file | edits ordered | landing signature confirmed | landed wrong / partial |
|---|---|---|---|---|
| BATCH-W1 | `waves/F-W1.md` | 52 | **52** | 1 ⟨W1-46⟩ |
| BATCH-MID | `waves/F-W2.md` | 19 | **19** | 1 ⟨MID-09⟩ |
| BATCH-MID | `waves/F-W4.md` | 16 | **16** | 1 ⟨MID-21⟩ |
| BATCH-MID | `waves/F-W5.md` | 16 | **16** | 1 ⟨MID-42⟩ |
| BATCH-REST | `waves/F-W0.md` | 8 | **8** | 0 |
| BATCH-REST | `waves/F-W3.md` | 6 | **6** | 0 |
| BATCH-REST | `waves/F-W6.md` | 17 | **17** | 2 ⟨REST-25; REST-19/REST-20 residue⟩ |
| BATCH-REST | `waves/F-W7.md` | 9 | **9** | 1 ⟨REST-38⟩ |
| BATCH-REST | `waves/F-W8.md` | 11 | **11** | 0 |
| BATCH-REST | `waves/F-W9.md` | 13 | **13** | 1 ⟨REST-64⟩ |
| BATCH-REST | `waves/F-W10.md` | 8 | **8** | 1 ⟨REST-65⟩ |
| | | **175** | **175** | **6 defects over 8 edits** |

*(Six distinct defects. Four of them — W1-46 · MID-09 · REST-25 · REST-38 · REST-64 — are one class with five instances and are booked once at LW-1; REST-25 carries a second, separate defect at LW-2.)*

**Method.** Each edit was probed with a fixed-string marker drawn from the work order's own *Replacement* text or from the settled bytes it produces, by `/usr/bin/grep -cF` over the named file. Structural edits were verified structurally rather than by marker: **W1-31** and **REST-14** by `diff` against an `awk`-extracted canonical roster; **W1-02…W1-24** by extracting §6·R5's table and counting its rows and records; **REST-08** by proving the ids the errata struck are absent from F-W0's citation table.

---

## §2 SPOT-VERIFICATION RECEIPTS — the load-bearing ones

### §2.1 · The two roster pastes, by machine (W1-31 · REST-14)

⟨cmd⟩ (cwd `docs/tranches/X/fourier`)
```
awk '/^### F\.W1 —/,/^### F\.W2 —/' conformance/CENSUS-CANONICAL.md | grep '^- \*\*fr-'  > canon-w1.txt
awk -v s=544 -v e=642 'NR>s && NR<e && /^- \*\*fr-/' waves/F-W1.md                       > spec-w1.txt
diff canon-w1.txt spec-w1.txt
```
→ **exit 0, BYTE-IDENTICAL**. 65 records; backtick-pair count 716 ⇒ **358 ids**. The canonical's own header reads `### F.W1 — **358 rows**`.

⟨cmd⟩ same base
```
awk '/^### F\.W3 —/,/^### F\.W4 —/' conformance/CENSUS-CANONICAL.md | grep '^- \*\*fr-'  > canon-w3.txt
grep -E '^- \*\*fr-[A-Za-z]+\*\* \([0-9]+\): ' waves/F-W3.md                              > spec-w3.txt
diff canon-w3.txt spec-w3.txt
```
→ **exit 0, BYTE-IDENTICAL**. 59 records / **928 ids**, contiguous at `F-W3.md:720-778`. F-W3's own self-check `awk` publishes `records 59 declared 928 enumerated 928` and it reproduces.

**Consequence.** G20 leg (b)'s LHS and g19's `comm -3` operand are both the cured canonical verbatim. The two edits the whole round's arithmetic hangs on are the two this seat could falsify by machine, and neither falsified.

### §2.2 · P5-1, the BLOCKER — the roster closes

⟨cmd⟩ §6·R5 extracted at `F-W1.md:642-673`: **25 table lines** = header ⊕ separator ⊕ **23 booked rows**, each carrying its canonical §1 row verbatim and the record's banked head line by `sed -n 'Np'`. All twenty-one distinct records named in the order are present in the block. The twenty-fourth escape is disposed **not** as a booking at `W1-25`: *"NOT AN IDENTITY — STRUCK FROM THE CENSUS"* (E5-6). **F.W4's three** (MID-23 `fr-EquationResult K-10` · MID-24 `fr-FrequencyGraph R-7` · MID-25 `fr-GalleryView R-5`) and **F-W8's `m-15`** (REST-46, `CITED, not booked`) and **F-W10's `L-16`** (REST-65) all land. Escapes **27 → 0**.

### §2.3 · P5-3, the F-W4 §Y BLOCKER — re-run under R4-4's two key

⟨cmd⟩ (repo root, this seat, which authored no part of §Y)
```
git show fffb9685:docs/tranches/X/fourier/waves/F-W4.md > /tmp/fw4-r3.md
grep -ci 'errata' /tmp/fw4-r3.md ; grep -c 'receipts run' /tmp/fw4-r3.md ; grep -c 'PURGE-SEAT' /tmp/fw4-r3.md
```
→ **1 · 0 · 3**. Control at the round-3 settle `ce2622d1` → **1 · 0 · 0**. **MID-20's diagnosis is confirmed exactly**: the published `3` was `fffb9685`'s figure pasted beside a `ce2622d1` command, the operand is re-pointed, and the re-pointed operand is the one that carries three. **MID-21's diagnosis is likewise confirmed and its own receipt is not** — see LW-3.

### §2.4 · The eleven roster figures, re-derived from the canonical, not from any wave

⟨cmd⟩ `grep -nE '^### F\.W[0-9]' conformance/CENSUS-CANONICAL.md` →
`F.W0 **57**` · `F.W1 **358**` · `F.W2 **27**` · `F.W3 **928**` · `F.W4 **1012**` · `F.W5 **28**` · `F.W5-W8 **89**` · `F.W9 **16**`, each with its dated errata `*(errata round 5, 2026-08-29: read …)*` note. Every consuming spec now states its own figure at that value: F-W0 `### F.W0 — **57 rows**` ⊕ `The roster lands WHOLE: 57 booked`; F-W1 `**358 rows**`; F-W2 `### F.W2 — **27 rows**` ⊕ `rosterSize 27 · booked 27 · cited 31`; F-W4 `F.W4 = 1012 rows across 54 records`; F-W5 `(**89 rows**)` ⊕ `**117** record-side rows` ⊕ `booked 114 · cited 3 · escaped 0`; F-W8 `**89 rows**`; F-W9 `### F.W9 — **16 rows**`; F-W10 `60 → 65`. F-W3's §X.1-v5 carries the sibling roster re-based whole: `` `F.W0`'s **57** `` · `` `F.W1`'s **358** `` · `` `F.W2`'s **27** `` · `` band's **89** `` · `` `F.W9`'s **16** ``.

### §2.5 · A CORRECT DEVIATION FROM THE ORDER, recorded so it is not read as drift

**W1-29 landed `358 rows, 65 records`; the work order specified `64 records`. The spec is right and the order was wrong.** The four departures (`L-9` · `vue-tsc` · `D:M-3` · `D-i2`) each leave a record that still holds other rows, so no record drops out of the roster. ⟨cmd⟩ over the canonical returns **65 record lines / 716 backticks = 358 ids**, and W1-31's paste is byte-identical at 65 lines. **R4-3 governs: the wave followed the census, not the instruction, which is the order of precedence this whole round exists to install.** Recorded as a landing, not as a defect.

---

## §3 PORTABLE-COMMAND RE-RUNS — 28 run, 27 reproduce

Every command below was re-run by this seat on the pinned toolchain and compared to the figure its spec publishes.

| # | edit | command (as the repaired spec publishes it) | published | re-run | |
|---|---|---|---|---|---|
| RC-1 | REST-01 | `sed -n '49p' $R/fr-PathPreview.md` | the `PP-GATE` banked line | byte-identical | ✔ |
| RC-2 | REST-35 | `grep -c 'criterion negative → F.W4' $C` | **5** | **5**; members `fr-BasisCanvas · fr-ContourEditorCanvas · fr-EquationResult · fr-FourierMorphSvg · fr-GalleryAdminBanner` | ✔ |
| RC-3 | MID-41 | `grep -cw 'P-9' <abs>/CENSUS-CANONICAL.md` | **0** | **0** | ✔ |
| RC-4 | MID-47 | `grep -row 'F\.W5' fr-*.md \| wc -l` · `-rw` · `-rlw` | **245 · 240 · 54** | **245 · 240 · 54** | ✔ |
| RC-5 | MID-32 | `grep -o 'FR-CP-' fr-CoefficientsPanel.md \| wc -l` vs `fr-ConvergencePlot.md` | **92** vs **3** | **92** vs **3** | ✔ |
| RC-6 | MID-37 | `/bin/ls <abs>/X/fourier/contract/` | *No such file or directory* | identical | ✔ |
| RC-7 | MID-38 | `/bin/ls <abs>/X/coordination/` | exactly one file, `ATLAS-TO-VALUE-2026-08-03-RULINGS.md` | identical | ✔ |
| RC-8 | MID-39 | `sed -n '61p' <abs>/api/src/modules/palette/model.ts` | the 3-state visibility comment | byte-identical | ✔ |
| RC-9 | MID-20 | `git show fffb9685:…F-W4.md` ⊕ three greps | **1 · 0 · 3** | **1 · 0 · 3** (control `ce2622d1` → **1 · 0 · 0**) | ✔ |
| RC-10 | MID-21 | `for t in PAW-6 PAW-18 PAW-26 PAW-29; do grep -oE "\b$t\b" F-W4.md \| wc -l; done` | **7 · 3 · 3 · 7** | **8 · 4 · 4 · 8** | ✘ **LW-3** |
| RC-11 | REST-44 | (base `docs/tranches/X`) `grep -n 'SS-4' COHESION.md` | seven lines `36 57 69 135 146 147 165` | identical | ✔ |
| RC-12 | REST-42 | `grep -nF 'fr-ContourPreview** (1): ' $C` ⊕ `\| grep -c 'L:L-5'` ⊕ `grep -nF 'L:L-5' $C` | `5044 5091 5358` · **1** · `4968` `5044` + `1305` `4037` | `5044 5091 5358` · **1** · `1305 4037 4968 5044` | ✔ |
| RC-13 | REST-65 | `sed -n '49p' fr-ExportModal.md \| tr '·' '\n' \| grep -n 'L-16'` | `10:··L-16 → fr-BasisCanvas :106, NO-WAVE-OWNER` | `10:·L-16 → …` (one space) | ✘ **LW-6** |
| RC-14 | REST-69 | ``grep -n '^| `L-16` |' $C`` ⊕ `grep -l 'L-16' fr-*.md \| wc -l` | **6** ⊕ **25** | **6** ⊕ **25** | ✔ |
| RC-15 | REST-67 | `grep -o "§2.5a-iii's 1[34]" F-W10.md` | `14 · 14 · 14` | `14 · 14 · 14` | ✔ |
| RC-16 | REST-55 | `grep -Ec '^\| \*\*P-[0-9]+\*\* \|.*OUTSTANDING' F-W9.md` | **8** | **8** | ✔ |
| RC-17 | REST-58 | `awk '/^\| record \| identity/,/^\*\*By-mechanism entrants/' \| grep -c '^\| fr-'` | **22** | **22** | ✔ |
| RC-18 | REST-59 | `awk '/^\| # \| labelled span/,/^\*\*Three failures/' \| grep -oE '^\| [0-9]+.? \|' \| wc -l` | **13** | **13** | ✔ |
| RC-19 | MID-08 | `grep -n '^### G-1[123] — ' F-W0.md` | `364:` · `369:` · `374:`, prefixes and `### ` retained | identical, exactly three | ✔ |
| RC-20 | MID-07 | `grep -c 'additionally owns' F-W0.md` ⊕ the `-oF` true span | **0** ⊕ the live sentence | **0** ⊕ identical | ✔ |
| RC-21 | MID-12 | `ls <abs>/fourier-analysis/web/src/components/equation/convergence/` | `ConvergenceLegend.vue` · `ConvergenceTimeline.vue` | identical, two SFCs | ✔ |
| RC-22 | MID-27 | `grep -oE 'FR-CP-L[A-Z][0-9]+' F-W4.md \| sort -u` | **nine** | **nine**, `LB2 LB3 LM1 LM2 LM3 LM4 LM5 LM7 LM8` | ✔ |
| RC-23 | REST-34 | (base `$V`) `grep -rl "trie ruling stays inline" docs/` | this file, **plus the two PASS-5 conformance artefacts, disclosed as residue** | `F-W7.md` · `PASS-5/F-W7-CHECK.md` · `PASS-5/WORK-ORDER.md` | ✔ |
| RC-24 | REST-36 | (base `$X`) `find . -type d \| grep 'contract\|design'` | no output, exit 1 | no output, exit 1 | ✔ |
| RC-25 | REST-43 | `awk 'NR>=265 && NR<=278 && /^\| /' waves/F-W8.md \| wc -l` | **14** | **14**, at the *settled* bytes | ✔ |
| RC-26 | MID-40 | `grep -rniE "merkle\|flat bag" <abs>/api/src <abs>/src` ⊕ `ls <abs>/api/src/lib` | one hit `palette/hash.ts:6` ⊕ absent | identical | ✔ |
| RC-27 | MID-33 | `grep -oE 'F\.W4 = 101[24] rows across 54 records'` | `1012` | `1012` | ✔ |
| RC-28 | REST-25 | `shasum -a 256 ../COHESION.md` | `956e71a83e32` | `956e71a83e32` | ✔ |

**27 of 28 reproduce.** The two failures are RC-10 and RC-13 and both are booked below. **RC-25 is the sharpest positive**: REST-43's `awk` takes a hard line range over a file the same round rewrote, and it still returns 14 — the range was re-derived after the edits, not inherited.

---

## §4 LANDED WRONG — six findings, no cures

> **This section is a record. This seat changed nothing and proposes its repairs to a successor, not to itself.**

### LW-1 · HIGH — **the purge seat did not run last; 15 of 16 sibling pin rows are false at the settle**
§F item 2 of the order is explicit: *"the purge seat runs LAST, touches every file after every other seat's final byte, re-pins every R4-8.3 table at the true settle."* Four of the five tables carry the **pass-5** settle, not the repair-round settle.

| table | edit | pinned | live at this seal | |
|---|---|---|---|---|
| F-W2 §8d | MID-09 | F-W0 `282f0c120cd4` · F-W1 `a1302689aaa3` · F-W4 `39e1a60b3fc9` · F-W5 `132c03192176` | `34e03162e793` · `4ea7748eaf89` · `571afa710bdb` · `8e633764d220` | **4 stale** |
| F-W6 §0.3 | REST-25 | F-W5 `132c03192176` · F-W0 `282f0c120cd4` · F-W1 `a1302689aaa3` · F-W3 `a89c3386f3f8` · F-W9 `e9a9c3016f4c` | `8e633764d220` · `34e03162e793` · `4ea7748eaf89` · `d524036ef161` · `5fe907a44bb3` | **5 stale** |
| F-W7 §0(C) | REST-38 | F-W0 `282f0c120cd4` · F-W1 `a1302689aaa3` · F-W5 `132c03192176` · F-W6 `c8c6d1d7f136` | `34e03162e793` · `4ea7748eaf89` · `8e633764d220` · `8e885bc9ae7a` | **4 stale** |
| F-W9 PIN TABLE | REST-64 | F-W0 `282f0c120cd4` · F-W1 `a1302689aaa3` · F-W4 `39e1a60b3fc9` | `34e03162e793` · `4ea7748eaf89` · `571afa710bdb` | **3 stale** |
| **F-W1 §pin block** | **W1-46** | F-W0 `34e03162e793` · F-W2 `fe6fe8970f71` · F-W3 `d524036ef161` · F-W4 `571afa710bdb` — **all MATCH** · F-W10 `bb58dc400cff` | F-W10 live `4822558a9e1c` | **1 stale of 5** |

**W1-46 is the only table stamped at the true settle, and even it lost the race by one file**: F-W1 was last written 19:51, F-W10 at 20:03, so the row F-W1 added *because* the round-4 list had omitted it is the one row of the five that is now false. **The stale rows are not a mistake in any edit; they are the ordering failure LAW E was written to prevent, and every one of the five tables was re-stamped exactly as ordered.** ⊘ **Mitigation, against interest and in the round's own favour**: F-W6's cells disclose the fault in terms at authoring — *"⟨moved; **moves again in repair round 5** — REST-01..REST-08⟩"* — and **not one quotation pinned to a stale row failed to reproduce at this seat.** The mechanism detected movement; only the numbers lie. **The cure is one purge pass over five tables after every wave's final byte, and it cannot be run by any seat that also edits a wave.**

### LW-2 · HIGH — **REST-25's second half converted an owed act into a restatement that it is owed**
The order required F-W6 to *"issue the R4-8.2 certificate that does not exist"*. What landed at `F-W6.md:57` is: *"⊕ **The R4-8.2 certificate that does not exist is still owed**: no purge-seat sha256 cert has ever been written for this wave, so LAW E's authoritative stamp remains undischarged."* ⟨cmd⟩ `grep -rl 'R4-8.2' waves/ conformance/PASS-5/` returns five wave specs and four conformance artefacts, **and no certificate among them.** ⊘ **Five rounds have now written LAW E and none has executed it** — and this is the first round in which the file that owes it says so in its own voice, which is a real advance over four rounds of silence and is still not the certificate.

### LW-3 · HIGH — **MID-21's own receipt is false at the settle, by the arithmetic of its own landing**
F-W4 publishes `7 · 3 · 3 · 7` at **two** sites — `:140` (the §2.I re-run pairing) and `:456` (§Y.2 item 3's cure, *"the FIRST member is 7, not 4"*). ⟨cmd⟩ re-run by this seat over the settled bytes: **`8 · 4 · 4 · 8`**. The cause is exact and mechanical: **MID-21's own corrective sentence names each of the four tokens once more**, so every count rose by one the instant the cure landed. ⊘ **This is the self-referential-count class (R3-3.10 / P5-8) re-committed inside the repair written to end it, for the second consecutive round, in the section R4-9.1 created to make the sweep auditable.** The *finding* is untouched — the first member was never 4 — and only the transcript a successor re-runs is wrong, which under R4-4's two-key rule is the whole of what the transcript is for. **A count of a file over that same file is not a receipt; it is a fixed-point equation, and it has no solution while the sentence stating it is inside the file.**

### LW-4 · MEDIUM — **F-W6 `:470` was swept by neither REST-19 nor REST-20**
REST-19 landed at the gate face (`:526`): *"**UPPER = `CENSUS-CANONICAL.md` §2's rosters, and nothing else.**"* ⊕ *"The four-spelling corpus detector is retained as dated round-3 provenance and **STRUCK AS AN OPERAND** at repair round 5 (REST-19…)"*. REST-20 landed at `:65`: *"**At least TEN** banked tokens collide … `M-10` · `M-9` added at repair round 5."* **Neither reached `:470`**, the §2.11 paragraph headed *"HOW THE GATE RUNS OVER THIS"*, which still (a) publishes the struck detector as a live co-equal falsifier — *"Forward direction: walk every span line in the 66 frozen records — under the **four-spelling** detector of §2.0 … **Two directions, both executable**"* — and (b) states *"R-5 qualifies exactly **eight** colliding tokens"* against a roster that now names ten. ⟨cmd⟩ `grep -noE 'R-5 qualifies exactly \*\*[a-z]+\*\*' F-W6.md` → `470:…**eight**`. ⊘ **Both halves of `:470` are the exact classes the two edits cure, surviving one section away from their own cure** — P5-8's count-word-against-its-list and R4-10's derived operand, in a paragraph whose job is to tell a successor how to run the gate.

### LW-5 · MEDIUM — **MID-42's per-clause marks landed at roughly three of seventeen**
The universal is correctly restated and the enumeration is complete: `F-W5.md:275` reads *"**TWENTY sites in this file carried a leg in a booking voice, not four**"* and names all seventeen clauses with their canonical homes inline (`A3 fr-InfoCard FR-IC-6 ⟨F.W4⟩ · B5 fr-HarmonicLevelGrid HLG-23 ⟨F.W4⟩ · …`). The order's operative half — *"**each takes one at its own clause**"*, which the landed sentence itself repeats — did not follow it. ⟨cmd⟩ over the whole file returns **six** holder marks of any spelling (`LEG CITED, HELD AT F.W3` ×3 · `LEG — held at F-W4` ×2 · one `held at F-W4 §2.A`); the clauses for `FR-IC-6` (`:143`), `HLG-23` (`:156`), `FR-GSB-1` (`:182`), `GAB-17` (`:183`) and `VV-R2-B` (`:186`) carry the id bare in the rows-folded column with no mark. ⊘ **The P5-8 half of the defect is discharged and the R4-6 half is not**: a reader at §2c's ▲ block now knows twenty ids sit on two waves' operand lists, and a reader at clause B5 still does not.

### LW-6 · LOW — **REST-65's verbatim paste carries a byte the command does not print**
F-W10 publishes `` `10:  L-16 → fr-BasisCanvas :106, NO-WAVE-OWNER` `` with **two** spaces after the colon; `od -c` on the live output shows `1 0 : <sp> L - 1 6` — **one**. The two-space form is the work order's own spelling, so the paste was inherited rather than re-run. ⊘ One byte, and it is the P5-10 class (*"the paste is not the command's output"*) inside the cure for a P5-1 BLOCKER. **The finding, the fold and the home are all correct; only the transcription is not.** Recorded at LOW because nothing depends on it and at all because R4-7.1 admits no threshold.

---

## §5 WHAT THIS SEAT DID NOT DO

1. **No edit to anything.** Not to a wave spec, not to `CENSUS-CANONICAL.md`, not to the frozen corpus, not to `PASS-5/WORK-ORDER.md`, not to product source in either tree, not to `scripts/dev/dev.sh`. The six findings above are recorded and **uncured**; each names its site and its instrument so a successor re-derives nothing.
2. **No re-cut of any roster, denominator or detector.** The canonical was read, never derived from. Both roster verifications are `diff`s against `awk` extractions of the canonical's own §2 — the only operand R4-3 admits.
3. **No adjudication.** LW-1…LW-6 are measurements. The §F item 4 canonical residues — the arrow-clause class not proven confined to five rows, the partial alias-orphan sweep, `fr-PathPreview K7` — are **canonical acts and were not touched, examined for cure, or counted against any wave.**
4. **No claim about gates.** No born-RED state, witness, cure text, sequencing lock, dissent or severity grade was read as changed, and none is asserted here. `status: planned` and `VERIFIED **NO**` stand wherever they stood.
5. **Nothing written after §6.** The hash table below is this seat's final act; the file ends with it.

---

## §6 SETTLED-TREE SHA256 — the seal, and this seat's last act

⟨cmd⟩ `shasum -a 256 /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W*.md /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md`, run after every verification above, full output:

```
34e03162e793b12081b50ade7472b8021c2a2f3ff0ffb3b916bf9e1ee5cfd45f  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W0.md
4ea7748eaf89f14d26d459cd6154c26fdef8944b470c1d41f81997a2256f271e  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W1.md
4822558a9e1c1fc88fc849d25207c9fc4cb66456fb9af753a1a407483ae80600  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W10.md
fe6fe8970f7126e15ce04426326964ae234e37f77936166ac5a8a6cb657940c4  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W2.md
d524036ef1613ee253d18496128515f8864998413b05b64e07bf5ad52e9071a8  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W3.md
571afa710bdb31d6c1c5f42971dfa357a5aad5c1e58474ea545862e79f544bb7  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W4.md
8e633764d2201c437549c572afdf078d60b2e966ad418a3e6e0e47966e487e5e  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W5.md
8e885bc9ae7ac31a5166825be4429724fc9e49bc09c3c139633197e0c937e672  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W6.md
52b171f02e8a32a9a467f712237411e41cf5b51768bed8ea3edf89d69b460b38  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W7.md
4dec882ad56e3c316d4c5c7ff39575374876e4fa4195abe5736b1a80927b7fd5  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W8.md
5fe907a44bb3bb00a6a48877c831e292660bf2e7203846af8d56b718ee40ceca  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W9.md
3e0a9acb338131b35ead50d4b2599f52064c3f35b88d0baac8180ba69e82185e  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md
```
