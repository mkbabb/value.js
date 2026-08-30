# X·F CONFORMANCE PASS 6 — FRESH ADVERSARIAL WHOLE-CORPUS CHECK (L-18 / L-20)

**Seat**: PASS-6 CHECK SEAT, X·F round 6, 2026-08-29. **VERIFY-ONLY. This file is the seat's only write.** Zero edits to any wave spec, to `CENSUS-CANONICAL.md`, to the frozen corpus, to the round-5 instruments, or to product source in either tree. Findings are recorded here and cured nowhere.
**Toolchain**: `PATH=/usr/bin:/bin:/usr/sbin:/sbin`, BSD `/usr/bin/grep` · `sed` · `awk` · `shasum` · `/bin/ls` · `/bin/cat` · `/bin/cp`. Never the interactive `grep` (a shell function wrapping `ugrep`). Locale stated at every receipt that depends on it (see D-8).
**Operands**: the eleven `waves/F-W*.md` · `conformance/CENSUS-CANONICAL.md` (errata-cured) · the round-5 instruments `PASS-5/WORK-ORDER.md` and `PASS-5/SEAL.md` · the frozen 66 `fr-*.md` at `docs/tranches/V/megatranche/registry/adjudicated` (`35fc8ebf`, immutable, read-only, `git status --porcelain` clean, 66 files) · carries `F-W1-CARRY` and `F-W4-CARRY` only.
**Standing**: this seat authored no wave spec, no check, no union, no work order and no seal in this programme. Every figure below was re-derived by this seat; nothing is inherited from `SEAL.md` except as a claim under test.

---

## §0 THE VERDICT IN ONE PARAGRAPH

**NOT CONFORMANT — and the reason is not the corpus.** The four axes the bar is actually about all close, and they close cleanly: **the hash gate passes 12 of 12**; **the roster closes at ZERO escapes** by this seat's own boundary-exact subtraction over all eight wave-duty rosters (2515 rows) *and* the 65-row drain; **fabrication falls 11 → 1**, the survivor disclosed in its own spec's voice; and **every one of the fifteen round-5 re-cut receipts this seat re-ran reproduces to the byte**. The canonical's internal arithmetic is exact in three independent directions — **§1 = §2 = §3 = 4262**, with all 66 per-record declared counts matching their own tables. What fails is what failed last round and was never cured: **the pin regime.** Because the bytes have not moved since `PASS-5/SEAL.md` (this seat's re-hash is byte-identical to the seal's §6 table), **all six of the seal's uncured LW findings are still live by construction** — and this seat confirms each one independently rather than inheriting it. Three are HIGH: the R4-8.3 sibling pins are stale program-wide, the R4-8.2 purge certificate LAW E has owed for **six** rounds is owed still, and MID-21's self-referential count is false at the settle for the second consecutive round. Against that, this seat contributes two findings **no prior pass filed**, both against the canonical and both real: **a band/standalone double-bank that puts 17 phantom rows and 24 duplicate ids into §3's published totals**, and **an E5-10 cure that landed at one of six band rows**. **The mechanism is sound and converging; the instrument that measures it is still the thing that lies.**

---

## §1 FIRST ACT — THE HASH GATE: **PASSED, 12 of 12**

⟨cmd⟩ `shasum -a 256 waves/F-W*.md conformance/CENSUS-CANONICAL.md`, this seat, first act, compared line-for-line to `PASS-5/SEAL.md` §6:

```
34e03162e793…  F-W0.md      8e885bc9ae7a…  F-W6.md
4ea7748eaf89…  F-W1.md      52b171f02e8a…  F-W7.md
4822558a9e1c…  F-W10.md     4dec882ad56e…  F-W8.md
fe6fe8970f71…  F-W2.md      5fe907a44bb3…  F-W9.md
d524036ef161…  F-W3.md      3e0a9acb3381…  CENSUS-CANONICAL.md
571afa710bdb…  F-W4.md
8e633764d220…  F-W5.md
```

**All twelve byte-identical to the seal.** `hashesClean = true`.

**The consequence, stated so it is not read as a formality.** The seal cured nothing and the bytes have not moved since. **Therefore LW-1…LW-6 are live at pass 6 by construction, not by inference.** This seat re-measured all six anyway — §4 — because a finding inherited is a finding unverified, and R4-4's two-key rule is the whole reason this seat exists.

---

## §2 AXIS 1 — THE ROSTER: **CLOSED. ZERO ESCAPES.**

### §2.1 The extraction, and the arithmetic that validates it

⟨cmd⟩ `awk` over `CENSUS-CANONICAL.md` §2, splitting each `- **fr-…** (n): …` line on backticks, emitting `⟨block, record, id⟩`:

| block | rows | block | rows | block | rows |
|---|---|---|---|---|---|
| F.W0 | 57 | F.W9 | 16 | SS-1 | 5 |
| F.W1 | 358 | GLASS-RELAY | 22 | SS-13 | 135 |
| F.W2 | 27 | NWO (packet) | 32 | SS-2 | 7 |
| F.W3 | 928 | NWO→SS-13 | 3 | SS-3 | 9 |
| F.W4 | 1012 | NWO→SS-3 | 27 | SS-4 | 3 |
| F.W5 | 28 | NWO→SS-5 | 3 | SS-5 · SS-6 · SS-7 | 2 · 1 · 1 |
| F.W5-W8 | 89 | | | TERMINAL (∅) · UNROUTED | 1190 · 307 |

**TOTAL 4262 — every block matching §3's home table exactly, cell for cell.** Independently, ⟨cmd⟩ `awk` counting `^| \`` rows inside each of the 66 §1 record tables and comparing to each header's own `**N rows**`: **66 OK, 0 mismatches, sum 4262**. And §3's band-expansion figure re-derives: the six band rows contribute `(13−1)+(3−1)+(16−1)+(17−1)+(8−1)+(9−1) = 60` extra ids, `4262 + 60 = 4322`, which is §3's published **4322**. **§1 = §2 = §3 = 4262 by machine, in three directions.**

### §2.2 The subtraction — the escape count is roster subtraction and nothing else

For each wave-duty block, every canonical id was tested **boundary-exact** (an `awk` scan requiring the characters flanking each occurrence to be outside `[A-Za-z0-9_-]`) against its home spec: `F.W0→F-W0.md` … `F.W5-W8→F-W5..F-W8` concatenated, `F.W9→F-W9.md`. 1949 distinct ⟨wave,id⟩ pairs.

| block | rows | strict misses | disposition |
|---|---|---|---|
| F.W0 · F.W1 · F.W2 · F.W3 · F.W5 · F.W5-W8 · F.W9 | 1503 | **0** | closed at first pass |
| F.W4 | 1012 | 68 | **all 68 resolved** — see below |
| **drain** (NWO ⊕ NWO→SS-13 ⊕ NWO→SS-3 ⊕ NWO→SS-5) | **65** | **0** | closed at first pass |

**Seven of the eight wave-duty rosters close boundary-exactly with zero misses on the first pass, and so does the 65-row drain.** F.W4's 68 misses are entirely an artefact of two idioms the spec **declares** and this seat expanded by hand:

1. **Suffix-elision chains** (`F-W4.md:338`, declared under R4-7.3 with *"Ranges (`-39..-43`) expand inclusively"*). `FR-AH-19 · -23 · -25 · -26 · -28 · -32 · -34 · -35 · -36 · -39..-43 · -46 · -48 · -49 · -51 · -52 · -54` covers all 15 `FR-AH` misses; `FR-USB-17..-20 ⊕ -28 ⊕ -29 ⊕ -30 ⊕ -31` covers the 4 `FR-USB` misses; `FR-GFC-12 ⊕ -13 ⊕ -15 ⊕ -16 ⊕ -17 ⊕ -18 ⊕ -19 ⊕ -22 ⊕ -25 ⊕ -27 ⊕ -28` covers the 6 `FR-GFC` misses; `EV-L·m-1 ⊕ m-2 ⊕ m-3 ⊕ m-5 ⊕ m-7 ⊕ m-10 ⊕ m-11 ⊕ m-12 ⊕ m-13` (`:125`) covers all 9 `L·m` misses. **The two chains that carry a count word are both TRUE**: `FR-USB…` says *"books eight"* and expands to exactly 8; `FR-GFC…` says *"books eleven"* and expands to exactly 11; the `FR-AH` chain carries `⟨no count word: the expansion IS the statement⟩`, which is the correct form.
2. **Record-prefix compounds** — `EP-` · `EV-` · `SS-` · `PS-` · `GIG-` · `IU-` · `FR-CL-` · `AC-` (e.g. `EP-C/M-4`, `EV-D·D-B2`, `FR-CL-M-R1`). The strict test blocks a preceding `-`; every remaining miss resolves here.

**`rosterEscapes = 0`.** ⊕ **Positive worth recording**: `FR-AH-27`, which P5-2 #5 convicted as a fabrication hiding *inside* the `FR-AH` chain, is **visibly dropped from that chain** at `:338` with a ⚠ marker naming the cure, and cited as a leg at `(d)` — the elision idiom was repaired without abandoning it.

### §2.3 The zero-roster postures — TRUE at the canonical, by enumeration

⟨cmd⟩ over the extraction: **no `F.W6`, `F.W7` or `F.W10` block exists in §2 at all.** The three ∅ postures are not assertions; they are the absence of a roster. Each of the three specs declares it in its own voice — F-W6 *"…ZERO)"*, F-W7 *"**0** — ∅ posture TRUE at the corpus"*, F-W10 *"record-side roster is stamped ZERO"*.

### §2.4 ONE HOME PER ID

⟨cmd⟩ `awk` emitting ⟨record, banked id⟩ for all 4262 §1 rows, `sort | uniq -d` → **0 literal duplicates.** ⊘ **This clean bill is partly an artefact of band spelling, and the artefact is a real defect — filed at D-4.** The true duplicate count, once bands are expanded, is **24**.

### §2.5 Spot audit — five canonical records against the corpus bytes

| # | record | canonical claim | at the bytes | |
|---|---|---|---|---|
| 1 | `fr-CanvasOverlayButton` | E5-3: `C-3`/`L-9` are alias tokens, not rows; 54 → 52 | `:52` `FR-COB-3 \| D-3 / L-3 / C-3`; `:69` `FR-COB-15 \| L-9 / C-10 / D-8 / L-8`; ⟨cmd⟩ standalone-head probe → **0** | ✔ |
| 2 | `fr-PathPreview` | E5-1: `PP-GATE` homes F.W0 on a sole token | `:49` `**PP-GATE** (D-1 gate half · C-10 · L-3) — **MINOR · FOLD → F.W0**`; ⟨cmd⟩ F.W-token set on that line = **{F.W0}**, singleton | ✔ |
| 3 | `fr-ConvergencePlot` | E5-7: `D-2` claimed first by `RD-5`; `D-1`'s alias manufactured | `:26` heads `**RD-5 · D-2/C-14(b) severity**`; `:48` heads a bare `**D-1**` | ✔ |
| 4 | `fr-Tooltip` | E5-13: `FR-TT-22`'s sole arrow is `NO-WAVE-OWNER` | `:56` ends `…a negative budget statement. **NO-WAVE-OWNER.**`; the `F.W2` token sits inside *"A zero-cost row on the F.W2 ledger"* | ✔ |
| 5 | `fr-EquationView` | E5-6: `vue-tsc` minted from a prose head | `:179` `9. **\`vue-tsc -b\` fallthrough admission of \`variant="glass"\` at the uplift**` | ✔ |

**Five of five confirm the canonical's round-5 readings at the frozen bytes.** The errata round did what it said it did.

---

## §3 AXIS 2 — THE PASS-5 REGISTER, P5-1…P5-18, AT THE BYTES

| # | pass-5 finding | state at pass 6 | evidence |
|---|---|---|---|
| **P5-1** | roster not closed, 28 escapes | **CLOSED** | §2.2, this seat's own subtraction: **0**. §6·R5 books 23 and disposes the 24th; `awk` over the block returns header ⊕ separator ⊕ **23 booked** ⊕ **1 disposal** (`vue-tsc`, *"∅ — NO ROW EXISTS"*) |
| **P5-2** | fabrication 11 | **10 of 11 CLOSED; 1 LIVE** | cures re-run individually: #1 `FR-IC-17` → *"CITED, NOT BOOKED"* + struck at `:422`; #2–4 `D-14/D-15/D-17` → one converted cell at `:322`, record-qualified against the MPC homonym; #5 `FR-AH-27` → chain-dropped + leg row; #6–8 `FR-EMT-20`/`AA-10`/`B-2` → *"cited to their canonical holders"* at F-W6 `:69`/`:208`; #9 `C-28` → **⌧ STRUCK** at F-W8 `:328`/`:372`; #11 `PAW-50` → divergence disclosed at F-W10 `:33`. **#10 `FR-TT-1` NOT cured — D-9** |
| **P5-3** | F-W4 §Y false at both founding receipts | **half CLOSED, half LIVE** | MID-20's `git show fffb9685` re-point stands. **MID-21's own receipt is false — D-3** |
| **P5-4** | portable commands unrunnable at five waves | **CLOSED with one residue** | 15 of 15 re-cuts reproduce (§5); in-block base declarations landed; **new residue at D-8** |
| **P5-5** | dead/false receipts in gate cells | **CLOSED at every site re-run** | RC-2 · RC-5 · RC-14 · RC-16 · RC-19 · RC-20 all reproduce |
| **P5-6** | pin regime stale, no R4-8.2 certificate | **NOT CLOSED — D-1, D-2** | §4.1, §4.2 |
| **P5-7** | legs booked as rows | **largely CLOSED; F-W5's per-clause half LIVE** | F-W1's nine conversions landed at their existing cells; **D-6** |
| **P5-8** | count-words against their lists | **largely CLOSED; F-W6 `:470` LIVE** | F-W7's *"four negatives"* now survives **only** inside its own strike note (`:291` *"The cell read "four""*) and its retirement clause (`:355`) — correct practice; F-W5's *"FOUR identities, not three"* likewise disclosed as struck. **D-5** |
| **P5-9** | canonical carries ≥14 filed defects | **18 CLOSED (E5-1…E5-18, 5/5 spot-verified); 3 residues disclosed; 2 NEW — D-4, D-7** | §2.5, §4.4 |
| **P5-10** | verbatim/emphasis/truncation drift | **one residue** | **D-10** |
| **P5-11** | homonym rosters under-declared | **CLOSED** | `L-16`'s six-record guard present at F-W10; the drain's 65 rows close at 0; F-W1 §6·R1 enumerates the whole `R-n` field |
| **P5-12** | F-W0 cluster (check file as operand) | **CLOSED** | the 7 `PASS-1/F-W0-CHECK.md` mentions are framed by R3-4's *"a prior run and never an operand"*, none as an LHS |
| **P5-13** | claim surfaces pointed away | **F-W6 half LIVE** | **D-5** |
| **P5-14** | landing/keying errors | **F-W5 half LIVE** | **D-6** |
| **P5-15** | M-25 lock-depth gaps | not re-measured this seat — **declared, not asserted** | — |
| **P5-16** | dead self-regexes | **CLOSED** | ⟨cmd⟩ `grep -c "grep -E '\|'" F-W2.md` → **0** |
| **P5-17** | short residual-address enumerations | **CLOSED** | F-W4 `:458` carries the §Y.3 residual-string declaration in terms |
| **P5-18** | disclosed history/legibility residue | **CLOSED** | F-W3's sole lookaround sits at `:416` inside `⟨*Python-regex form; the detector was `python3`, never the pinned shell*⟩` — the one parenthetical P5-18 asked for |

---

## §4 THE FINDINGS

### §4.1 · **D-1 · HIGH — the R4-8.3 pin regime is stale program-wide; the purge seat still has not run last**

This seat measured it without reading the seal's table first. ⟨cmd⟩ (base `waves/`) `grep -lF` for each of the eleven **live** 12-hex digests, then for each **superseded** digest:

- **Of the eleven live wave digests, only FOUR appear anywhere in any spec** — `F-W0 34e03162e793`, `F-W2 fe6fe8970f71`, `F-W3 d524036ef161`, `F-W4 571afa710bdb` — **and all four are inside `F-W1.md` alone.**
- **Seven live digests appear in no spec at all**: F-W1, F-W5, F-W6, F-W7, F-W8, F-W9, F-W10.
- **Ten superseded digests are still pinned across nine specs**: `a89c3386f3f8` (7 specs) · `a1302689aaa3` (5) · `282f0c120cd4` (4) · `39e1a60b3fc9` (3) · `132c03192176` (3) · `bb58dc400cff` (3) · `e9a9c3016f4c` · `c8c6d1d7f136` · `5cc3346db23e` · `1e3698adf4ff` (1 each).

⊘ **Mitigation, and it is a real one, stated in the round's favour**: **not one quotation pinned to a stale row failed to reproduce at this seat** — fifteen re-runs, §5, all exact. The pins are wrong; the quotations they guard are right. **The cure remains what §F item 2 ordered and no round has executed: one purge pass over the five tables after every wave's final byte, run by a seat that edits no wave.** F-W1's block is still the only one stamped at a true settle, and it still lost the race to F-W10 by twelve minutes.

### §4.2 · **D-2 · HIGH — the R4-8.2 purge certificate is owed for a sixth consecutive round**

⟨cmd⟩ (base `fourier/`) `grep -rl 'R4-8.2' waves/ conformance/PASS-5/` → **five wave specs** (F-W1 · F-W2 · F-W6 · F-W7 · F-W10) **and five conformance artefacts** (F-W6-CHECK · F-W7-CHECK · UNION · WORK-ORDER · SEAL) — **and no certificate among them.** A second probe for any issued-certificate spelling returns nothing. F-W6 `:57` still reads *"**The R4-8.2 certificate that does not exist is still owed**"*. ⊘ **Six rounds have written LAW E and none has executed it.** That the owing file now says so in its own voice is an advance over four rounds of silence, and it is still not the certificate.

### §4.3 · **D-3 · HIGH — MID-21's receipt is false at the settle, for the second consecutive round**

⟨cmd⟩ (base `waves/`) `for t in PAW-6 PAW-18 PAW-26 PAW-29; do grep -oE "\b$t\b" F-W4.md | wc -l; done` → **8 · 4 · 4 · 8**. F-W4 publishes **`7 · 3 · 3 · 7`** at **two** sites (⟨cmd⟩ `grep -c '7 · 3 · 3 · 7' F-W4.md` → **2**). The mechanism is exact: MID-21's own corrective sentence names each of the four tokens once more, so every count rose by one the instant the cure landed. ⊘ **This is R3-3.10 / P5-8's self-referential-count class re-committed inside the repair written to end it — in §Y, the section R4-9.1 created to make the sweep auditable.** The *finding* is untouched: the first member was never 4. What is wrong is the transcript a successor re-runs, which under R4-4's two-key rule is the entire purpose of the transcript. **A count of a file taken over that same file is not a receipt but a fixed-point equation, and it has no solution while the sentence stating it lives inside the file.** The lawful forms already exist in this programme — counts of the frozen corpus, of the read-only product tree, of a producer at a tag.

### §4.4 · **D-4 · MEDIUM — NEW, filed against the canonical: band/standalone double-bank puts 17 phantom rows and 24 duplicate ids into §3**

Two records bank a band row **and** the band's own members as standalone rows.

**`fr-NotationPills`** — §1 carries `` `K-1..K-17` `` `<sub>band = 17 ids</sub>` **and** standalone rows `K-2` … `K-17`. At the bytes, ⟨cmd⟩ `grep -n '\*\*K-'` returns **five** lines (`79 83 84 85 86`), and ⟨cmd⟩ over `:79` alone returns **all seventeen** `**K-n**` tokens: `:79` is a *single banked-head line* reading `K-1..K-17 carried verbatim from the first pass … — headline stubs: **K-1** … **K-17**`. **The sixteen standalone rows are re-bookings of stubs that live inside the band's own head line** — precisely the E5-3 mechanism, applied to a construction E5-3 did not reach.

**`fr-MorphShapePreview`** — §1 carries `` `K-1..K-8` `` `<sub>band = 8 ids</sub>` **and** standalone `K-1` … `K-8`. At the bytes, `:116` is **prose** (`K-1..K-8 are r1's, re-ratified under the second hostile re-read…`), while the eight real banked heads are table rows `:120`–`:127` (`| **K-1** | … |` … `| **K-8** |`). **The band row was minted from a narrative sentence** — the PROSE-TOKEN CAPTURE class E5-17 made §0.1's arrow clause operative to kill.

**Arithmetic.** 16 phantom rows (NP) ⊕ 1 phantom row (MSP) = **ROWS and TERMINAL (∅) each overstated by 17** (4262 → 4245; 1190 → 1173). Band expansion double-counts **24** ids (16 + 8), so **4322 → 4298**. The positive control holds and is worth stating: `fr-FourierMorphSvg` carries `K-1..K-16` with standalone `K-17`…`K-20` and **no overlap** — that record is correct, which is why the class is a defect and not the idiom.

⊘ **Mitigation.** **Every affected row is TERMINAL (∅).** No wave roster, no booking duty, no escape count and no fabrication figure moves — §2.2's zero survives this finding intact. What moves is three of §3's published totals, and §2.4's clean ONE-HOME-PER-ID bill, which this defect is the reason to distrust. This is canonical residue #2's *"full re-sweep of alias-orphaned re-bookings across all 66 records is **owed**"*, now concrete and quantified.

### §4.5 · **D-5 · MEDIUM — F-W6 `:470` survives one section away from both its own cures**

⟨cmd⟩ `grep -noE 'R-5 qualifies exactly \*\*[a-z]+\*\*' F-W6.md` → `470:…**eight**`, against a roster REST-20 raised to **ten** at `:65` (*"**At least TEN** banked tokens collide … `M-10` · `M-9` added at repair round 5"*). The same paragraph still publishes the **struck** four-spelling detector as a live co-equal falsifier (⟨cmd⟩ `grep -noE 'four-spelling'` → `248 · 470 · 526 · 526`, where `:526` is REST-19's strike face and `:470` is not). ⊘ **Both halves of `:470` are the exact classes the two edits cure — P5-8's count-word-against-its-list and R4-10's derived operand — in the one paragraph whose stated job is to tell a successor how to run the gate.** Contrast with the correct handling one file over: F-W7's *"four negatives"* now appears **only** inside its strike note and its retirement clause, and is not a live claim anywhere.

### §4.6 · **D-6 · MEDIUM — MID-42's per-clause marks landed at roughly eight of twenty**

The universal and the enumeration are both correct: `F-W5.md:275` reads *"**TWENTY sites in this file carried a leg in a booking voice, not four**"* and names all seventeen clauses with their canonical homes inline. The order's operative half — *"each takes one at its own clause"* — did not follow. ⟨cmd⟩ over the whole file returns **eight** holder marks of any spelling (`LEG CITED, HELD AT F.W3` ×3 · `LEG — held at F-W4` ×2 · `held at F-W3 §X.1-v5's` ×2 · one `held at F-W4 §2.A`). The five named clauses each appear at their own site **and** at `:275` — `FR-IC-6` (`:143`), `HLG-23` (`:156`), `FR-GSB-1` (`:182`), `GAB-17` (`:183`), `VV-R2-B` (`:186`) — carrying the id bare at the clause. ⊘ **P5-8's half is discharged; R4-6's half is not.** A reader at §2c's ▲ block now knows twenty ids sit on two waves' operand lists; a reader at clause B5 still does not.

### §4.7 · **D-7 · MEDIUM — NEW, filed against the canonical: E5-10's cure landed at one band row of six**

E5-10 re-spelled `` `FM-17..FM-19 (3 ids)` `` as `` `FM-17..FM-19` `` `<sub>band = 3 ids</sub>`, *"as §1 already does"*. ⟨cmd⟩ `awk '/^## §2/,/^## §3/' CENSUS-CANONICAL.md | grep -ohE '\`[^\`]+\.\.[^\`]+\`' | sort -u` returns **six** band spans, of which **five still carry the multiplicity inside the backtick span**: `` `FM-4..FM-16 (13 ids)` `` (F.W1, `:4865`) · `` `K-1..K-16 (16 ids)` `` · `` `K-1..K-17 (17 ids)` `` · `` `K-1..K-8 (8 ids)` `` · `` `S-1..S-9 (9 ids)` ``. §1 spells all six correctly (`:2412` `` `FM-4..FM-16` `` `<sub>band = 13 ids</sub>`), so **§1 and §2 disagree on five rows** — the precise defect E5-10 named, in the file that declared it cured. **The specs inherited the malformed spelling**: ⟨cmd⟩ `grep -c 'FM-4..FM-16 (13 ids)' F-W1.md` → **3**. ⊘ Mitigation: the only wave-duty row among the five is `FM-4..FM-16` at F.W1, and F-W1 books it — §2.2's zero is unaffected. The cost is that every mechanical differ must still special-case five rows.

### §4.8 · **D-8 · MEDIUM — NEW: REST-65's receipt is locale-dependent and no spec declares a locale**

The published command splits a corpus line on `·`, a two-byte UTF-8 character, with BSD `tr`. Its output depends on `LC_ALL`, which the receipt does not state:

⟨cmd⟩ `sed -n '49p' fr-ExportModal.md | tr '·' '\n' | grep -n 'L-16'`
- under `LC_ALL=C` → `19: L-16 → fr-BasisCanvas :106, NO-WAVE-OWNER`
- under `LC_ALL=en_US.UTF-8` → `10: L-16 → …`

**The line number itself flips, 10 ↔ 19**, because byte-mode `tr` emits two newlines per separator. The spec publishes `10:`, reproducible only under a UTF-8 locale; the programme's pinned-toolchain blocks pin `PATH` and the binaries and say nothing about locale. ⊘ **Mitigation, and it is why this is MEDIUM and not higher**: ⟨cmd⟩ `grep -lh "tr '·'" F-W*.md` → **F-W10.md only** — one site in eleven specs, and the finding, the fold and the home it supports are all correct under either locale.

### §4.9 · **D-9 · MEDIUM — the surviving fabrication: `FR-TT-1` is disclosed and uncured**

The canonical homes `fr-Tooltip FR-TT-1` at **F.W4** (⟨cmd⟩ over the extraction). F-W10 §2.2's re-cut table still cuts it to **F.W10**, and §2.5b names the conflict against its own interest — *"the fabrication test in the other direction, which convicts §2.2's `FR-TT-1 → F.W10` cut against the canonical's F.W4 home and files it as a **PENDING PAIRED EDIT** beside AA-44 `9`→`8`"*. ⊘ **This is the whole of `fabricated = 1`, down from eleven, and it is disclosed in the spec's own voice rather than found by this seat** — which is the difference between a residue and a defect of candour. It is still a real id booked at a wave the canonical does not home it, and zero is the bar. Its sibling #11 (`PAW-50`) **is** discharged: the three §2.2 divergences are enumerated at `:33` (`PAW-49→F.W0 · PAW-50→F.W4 · FR-TT-1→F.W10`).

### §4.10 · **D-10 · LOW — REST-65's paste carries a byte its command does not print**

F-W10 publishes `` `10:  L-16 → …` `` with **two** spaces after the colon; the command prints **one** under either locale (`od -c` confirms a single `0x20`). The two-space form is the work order's own spelling, so the paste was inherited rather than re-run. ⊘ One byte; the P5-10 class inside the cure for a P5-1 BLOCKER. Recorded at LOW because nothing depends on it and at all because R4-7.1 admits no threshold.

### §4.11 · **D-11 · LOW — filed against `PASS-5/SEAL.md`, a round-5 instrument under check: §2.2's line count is off by one**

The seal publishes *"§6·R5 extracted at `F-W1.md:642-673`: **25 table lines** = header ⊕ separator ⊕ **23 booked rows**"*. ⟨cmd⟩ `awk 'NR>=642 && NR<=673 && /^\|/' F-W1.md | wc -l` → **26**. The block is header (`:646`) ⊕ separator (`:647`) ⊕ 23 booked rows (`:648`–`:670`) ⊕ **the `vue-tsc` disposal row** (`:671`), which is a table line and was not counted. ⊘ **The seal's prose is right where its arithmetic is not** — it describes the twenty-fourth escape as *"disposed **not** as a booking"* two sentences later. The spec's own claim of **23 booked** is TRUE, and §2.2 of this file closes the roster independently of either figure.

### §4.12 · **D-12 · LOW — F-W4 carries no `VERIFIED` declaration**

⟨cmd⟩ `grep -on 'VERIFIED' F-W4.md` → **∅**. The other ten specs each carry an explicit `VERIFIED … NO` (`VERIFIED | **NO**` ×7 · `VERIFIED **NO**` ×3 · plus F-W1's `VERIFIED = NO`). ⊘ The **posture** is satisfied — no spec anywhere asserts `VERIFIED YES`, so *zero VERIFIED* holds program-wide — but ten of eleven declare it and one does not.

### §4.13 · **D-13 · LOW — three canonical residues remain open, disclosed and unmoved**

§0.4's own closing block names them and this seat confirms each stands: (1) the arrow-clause class is **not proven confined to five rows** — the corpus-wide re-derivation under the newly operative clause is owed and is a canonical act; (2) the **alias-orphan sweep is partial** — `fr-PathPreview` still carries a standalone `C-10` UNROUTED row although ⟨cmd⟩ shows `C-10`'s only id-shaped occurrences in that record are PP-GATE's alias parenthetical (`:49`), K9's head (`:82`, a mention) and prose (`:110`); **D-4 is the same sweep, now with two more instances and a number**; (3) `fr-PathPreview K7` is **flagged, not moved**. ⊘ All three are disclosed against interest in the canonical's own voice, which is why they are LOW and not findings against a wave.

---

## §5 RECEIPT REALITY — 15 round-5 re-cuts re-run, **15 reproduce**, fabrication ZERO

Every command below was re-run by this seat on the pinned BSD toolchain and compared to the figure its spec or the seal publishes. **These are re-runs of round-5 re-cut edits (`REST-*` / `MID-*`), not of inherited round-4 figures.**

| # | edit | command (from its declared base) | published | this seat | |
|---|---|---|---|---|---|
| RC-1 | REST-01 | `sed -n '49p' $R/fr-PathPreview.md` | the `PP-GATE` banked line | `14. **PP-GATE** (D-1 gat…` byte-identical | ✔ |
| RC-2 | REST-35 | `grep -c 'criterion negative → F.W4' $C` | **5** | **5** | ✔ |
| RC-3 | MID-41 | `grep -cw 'P-9' $C` | **0** | **0** | ✔ |
| RC-4 | MID-47 | `grep -row/-rw/-rlw 'F\.W5' fr-*.md \| wc -l` | **245 · 240 · 54** | **245 · 240 · 54** | ✔ |
| RC-5 | MID-32 | `grep -o 'FR-CP-' fr-CoefficientsPanel.md` vs `fr-ConvergencePlot.md` | **92** vs **3** | **92** vs **3** | ✔ |
| RC-6 | REST-44 | (base `$X`) `grep -n 'SS-4' COHESION.md` | `36 57 69 135 146 147 165` | identical, seven lines | ✔ |
| RC-7 | REST-25 | (base `$X`) `shasum -a 256 COHESION.md` | `956e71a83e32` | `956e71a83e32` | ✔ |
| RC-8 | REST-69 | ``grep -c '^\| `L-16` \|' $C`` ⊕ `grep -l 'L-16' fr-*.md \| wc -l` | **6** ⊕ **25** | **6** ⊕ **25** | ✔ |
| RC-9 | REST-67 | `grep -o "§2.5a-iii's 1[34]" F-W10.md` | `14 · 14 · 14` | `14 · 14 · 14` | ✔ |
| RC-10 | REST-55 | `grep -Ec '^\| \*\*P-[0-9]+\*\* \|.*OUTSTANDING' F-W9.md` | **8** | **8** | ✔ |
| RC-11 | MID-33 | `grep -ohE 'F\.W4 = 101[24] rows across 54 records'` | `1012` | `1012`, single form | ✔ |
| RC-12 | MID-08 | `grep -n '^### G-1[123] — ' F-W0.md` | `364 · 369 · 374` | identical, exactly three | ✔ |
| RC-13 | MID-07 | `grep -c 'additionally owns' F-W0.md` | **0** | **0** | ✔ |
| RC-14 | MID-27 | `grep -oE 'FR-CP-L[A-Z][0-9]+' F-W4.md \| sort -u` | **nine** | **nine**: `LB2 LB3 LM1 LM2 LM3 LM4 LM5 LM7 LM8` | ✔ |
| RC-15 | MID-21 | `for t in PAW-6 PAW-18 PAW-26 PAW-29; …` | `7 · 3 · 3 · 7` | **`8 · 4 · 4 · 8`** | ✘ **D-3** |

Plus this seat's own structural receipts, all reproducing: the 12-file hash gate (§1) · §2 block totals vs §3 (23 blocks) · 66 per-record row counts vs their headers · the 4322 band-expansion re-derivation · the boundary-exact subtraction over 1949 ⟨wave,id⟩ pairs and the 65-row drain · the ONE-HOME-PER-ID `uniq -d` · five corpus spot audits (§2.5) · the live/stale digest sweep (§4.1) · the R4-8.2 certificate probe (§4.2) · the GNU-ism sweep (§6) · the locale pair (§4.8).

**Fabrication among the re-run receipts: ZERO.** Every figure published at a re-cut site is the figure the command returns, with the single exception of RC-15, which is a **self-count**, not a fabrication — the number was true when written and the writing falsified it.

---

## §6 AXIS 4 — GATES: canonical operands, portable commands, no false universals

**Canonical operand, program-wide — CLEAN.** ⟨cmd⟩ `grep -lF '3e0a9acb3381' F-W*.md` → **all eleven**. ⟨cmd⟩ for the superseded `a450b8e9` → 10 specs, **and every occurrence sits inside an explicit strike note** (*"the superseded pin `a450b8e9f80e` and its 31-row reading survive only inside this note"* · *"re-run at repair round 5 against the cured census `3e0a9acb3381`, never inherited from `a450b8e9f80e`"*). **This seat opened the probe expecting D-1's disease and found the opposite: the census pin is the one pin the programme keeps correctly, in all eleven files, with its history marked rather than deleted.** That is the model D-1's cure should copy.

**Portable-command law — HELD, with the D-8 residue.** ⟨cmd⟩ sweep over all eleven for `grep -*P`, `\K`, lookaround and `.{n,m}`: every hit resolves to a **declared strike or re-cut narration**, never a live command. F-W4's six `-P` strings all sit inside R4-2 re-cut cells and are covered by §Y.3's residual-string declaration — *"so a mechanical pass does not re-file a cured defect"*, which is exactly what stopped this seat from filing one. F-W7's three `.{0,262}` strings are all inside the narration of the receipt struck **as unexecutable** and replaced by three exact-string probes.

**False universals — TESTED, NONE FOUND.** Two bound declarations were checked against their own files rather than taken on trust: F-W6 `:24` claims *"no `.{n,m}` with m > 255 … the widest bound standing in this file is `.{0,190}`"* — ⟨cmd⟩ over F-W6 returns a maximum of exactly `.{0,190}`, **TRUE**; F-W7 claims the same bound rule and its only over-255 strings are the struck ones above, **TRUE**. (This seat independently hit `grep: maximum repetition exceeds 255` on BSD while working, which is what prompted the test.)

**Count-words against their lists — one live failure (D-5).** The two F.W4 elision chains that carry count words both expand to exactly their stated figure (§2.2). F-W7's and F-W5's convicted count-words are quoted-as-struck, not asserted.

**Reachable GREEN / born-RED — HELD.** ⟨cmd⟩ across all eleven: `VERIFIED` resolves to **NO** at every one of its 15 occurrences; no gate anywhere claims GREEN. Ten specs declare it; F-W4 declares nothing (**D-12**).

---

## §7 AXIS 5 — POSTURE

| posture | state | receipt |
|---|---|---|
| `status: planned`, all eleven | **HELD** | present in every spec; spelling varies (`**Status**: \`planned\`` · `**Status: planned**` · `Status stays \`planned\``), which is stylistic and not a defect at this bar. F-W4: *"**Status: planned** (every unit below stays `planned`)"* |
| zero `VERIFIED` | **HELD** | 15 occurrences, all `NO`; zero `YES` (⊕ **D-12**) |
| F.W1 transaction whole, 12 limbs | **HELD** | *"The roster is TWELVE limbs and stays twelve — the eleven chartered plus the FR-EQC-7 vaul-vue manifest gate returned INSIDE at repair round 5"* |
| F.W6 / F.W7 / F.W10 zero-roster postures declared | **HELD, and TRUE at the canonical by enumeration** | §2.3 — the three blocks do not exist in §2 at all; each spec declares its own ∅ |
| `FR-NP-32` canonical form | **HELD** | carried everywhere as `**FR-NP-32** (≡ `fr-PaperSidebar M1`)` with R-8's two-witness rule stated: *"**cite both, never substitute**"* |
| SS-4 flags inline | **HELD** | present inline across the specs (F-W0 25 · F-W1 31 · F-W4 23 · F-W6 14); COHESION §0/§1 SS-4 cited as authority at the mastheads |
| fourier tree READ-ONLY | **HELD** | declared in-file (F-W5 31 sites · F-W10 17 · F-W0 7) and true in fact — this seat wrote nothing outside `PASS-6/` |
| E-3 (dated evidence never rewritten) | **HELD, and load-bearing** | corrections travel as `§2·R5` / `§6·R5` / `§E-3·R*` rows throughout; **D-7's five malformed spans and D-1's stale pins are both visible *because* nothing was silently rewritten** |
| corpus READ-ONLY at `35fc8ebf` | **HELD** | `git status --porcelain` over `registry/adjudicated/` → clean; 66 files |
| carries limited to `F-W1-CARRY` · `F-W4-CARRY` | **HELD** | F-W10 `:3` states it in terms and no third carry exists |

---

## §8 THE BAR, APPLIED

| bar clause | required | measured | |
|---|---|---|---|
| BLOCKER / CRITICAL | zero | **zero** | ✔ |
| HIGH | zero | **three** (D-1 · D-2 · D-3) | ✘ |
| hashes clean | yes | **12 of 12** | ✔ |
| roster closed | yes | **0 escapes** over 2515 wave-duty rows ⊕ 65 drain rows | ✔ |
| fabrication | zero | **1** (D-9, disclosed in-spec) | ✘ |
| tail | MINOR-or-below with stated mitigations | six MEDIUM ⊕ four LOW, each with its mitigation stated | ✘ |

# **NOT CONFORMANT.**

**Three HIGH, one live fabrication, and a MEDIUM tail. The bar is not met and this seat does not say it is.**

**What the round actually earned, said plainly, because a verdict that only reports failure is as useless as one that only reports success.** The roster closed — **28 escapes to 0**, and this seat proved it by its own subtraction, not by reading the claim. Fabrication fell **11 → 1**, and the survivor is named by the spec that carries it. The canonical's errata round was real: five of five spot audits confirm its readings at the frozen bytes, and its three internal totals agree to the row in three directions. Fifteen of fifteen re-cut receipts reproduce. The census pin is correct in all eleven files with its history marked rather than erased. **Every failure above is in the instrument, not the corpus** — stale fingerprints, an uncertified purge, a count that falsified itself by being written, a cure that reached one band row of six.

**The one act that closes this round is the one every round has ordered and none has performed: a purge seat that edits nothing, runs after the last wave byte, re-pins the five R4-8.3 tables at the true settle, and issues the R4-8.2 certificate — and then a successor that re-runs its claims.** D-3 needs one thing more, and it is a form and not a figure: **strike the self-count and cite the classification instead.** D-4 and D-7 are canonical acts (R4-3), never a wave's, and D-4 should be folded into the alias-orphan re-sweep §0.4 already declares owed.

---

## §9 WHAT THIS SEAT DID NOT DO

1. **No edit to anything but this file.** Not to a wave spec, not to `CENSUS-CANONICAL.md`, not to the frozen corpus, not to any PASS-5 artefact, not to product source, not to `scripts/dev/dev.sh`. All thirteen findings are **uncured**; each names its site and its instrument.
2. **No re-cut of any roster, denominator or detector.** The canonical was read, never derived from. Every roster figure is an extraction of §2's own bytes.
3. **No inheritance.** LW-1…LW-6 were re-measured, not carried; D-1's figures are this seat's, and they differ from the seal's because the seat measured a different and wider thing. D-11 files against the seal itself.
4. **No adjudication.** D-1…D-13 are measurements. The canonical residues at §4.13 are canonical acts and were not touched, cured, or counted against any wave.
5. **No claim about gates.** No born-RED state, witness, cure text, sequencing lock, dissent or severity grade was read as changed. `status: planned` and `VERIFIED **NO**` stand wherever they stood.
