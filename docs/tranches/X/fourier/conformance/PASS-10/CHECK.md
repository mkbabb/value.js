# X·F — PASS-10 CHECK (L-18/L-20, fresh adversarial whole-corpus)

**Seat**: X·F pass-10 hostile check, 2026-08-29/30. **Mandate**: VERIFY-ONLY, adversarial. Re-hash first; close five axes at the bytes with commands a successor can re-run to falsify me. **This seat wrote exactly one file: this one.** No wave, no `CENSUS-CANONICAL.md`, no `PIN-PURGE-CERT.md`, no prior pass instrument, no product source. Landed-wrong findings are filed here and nowhere else (E-3).

**Toolchain**: BSD `/usr/bin/grep`, `/usr/bin/sed`, `/usr/bin/awk`, `shasum`, `git`, `python3` where a depth-counted masker or a whole-file re-derivation is needed. Bases declared at each command.

---

## §0. VERDICT

| axis | verdict |
|---|---|
| **Hashes vs `PASS-9/SEAL.md §5`** | ✔ **CLEAN — 13 of 13 byte-identical** (`diff` clean) |
| **Canonical FROZEN at `f44362757458`** | ✔ **HELD** — full digest `f443627574581ec2a4138e46d927b5fc431a7a6657cae766f7ffafa01e770968` |
| **`PIN-PURGE-CERT.md §ERRATA-R9` pasted block** | ✔ **`diff` CLEAN — 12 of 12** against a fresh `shasum` |
| **Roster — boundary-exact subtraction at the frozen totals** | ✔ **ZERO**; `4242 − 2466 − 1220 − 307 = 249`, and the thirteen non-wave classes sum to **249** independently |
| **Roster — mechanical re-derivation** | ✔ **`§1 = §2 = §3 = 4242`**, and **23 of 23 classes agree** across §1-homes / §2-headers / §2-bullets |
| **Roster — id-set identity, both directions** | ✔ **527 canonical bullets · ZERO divergent ids · ZERO count divergences** |
| **Roster — spec side** | ✔ **124 spec roster bullets · ZERO divergent** |
| **E6-3 — 49 dispositions** | ✔ **49 · 48→TERMINAL · 1→UNROUTED**; six of six per-wave source deltas exact; **14 spot-read at both ends** (floor 8) |
| **Canonical-row paste sweep, BOTH spellings** | ✔ **ZERO live mismatches** — 38 pastes by one instrument, 36 by a second; the only two divergent pastes (`F-W1:650` `K1`, `F-W4:319` `K-10`) are **STRUCK**, the lawful shape. **The pass-9 method found exactly one; it now finds zero.** |
| **pass-9 register (10 items)** | ✔ **ALL TEN CLOSED at the bytes** (§3) |
| **pass-8 HIGH (band operand), re-probed independently** | ✔ **ZERO live stale band figures** — 282 raw bare-numeric hits, 194 live after a depth-counted mask, 31 in band context, all adjudicated to non-band referents or correct supersessions |
| **Live superseded census digests** | ✗ **ONE** (`F-W1:725`, MINOR — §5.8) |
| **Dead canonical coordinates** | ✔ **ZERO live** — 10 live canonical `:NNNN` citations re-run and correct (floor 8); the four superseded coordinates are each **disclosed DEAD in terms** |
| **Postures** (F.W1 whole · W6/W7/W8/W10 zero-roster · FR-NP-32 · SS-4 · READ-ONLY · E-3 · `VERIFIED-YES` 0 · status `planned` · no product source) | ✔ **HELD** — one MINOR spelling exception (§5.7) |
| **Receipts** — 60+ re-run on the BSD toolchain, **every round-9 re-cut among them** | **58 GREEN · 2 RED** |
| **Fabrication** | ✗ **TWO** — `F-W10:338` (**new; nine passes missed it**) and `F-W4:192` (seal LW-1, uncured) |
| **The three seal-filed landed-wrongs (LW-1/2/3)** | ✗ **ALL THREE STAND** — hashes prove no repair followed the seal |

⌧ **NOT CONFORMANT. Two MEDIUM stand at final bytes and fabrication is TWO, not zero.** The bar requires a tail of MINOR-or-below and fabrication at zero.

⊘ **The census axis is finished and this pass says so with two instruments the prior passes did not use.** The roster closes at ZERO by boundary-exact subtraction, by a mechanical `§1 = §2 = §3` re-derivation that agrees **class by class**, and — new this pass — by a full **id-set** identity over all 527 canonical bullets in both directions. The canonical-row paste sweep that convicted exactly one cell at pass 9 now convicts none. **Every failure below is on the receipt axis, and one of them is a site no prior pass has ever named.**

▲ **The one finding that justifies a tenth pass**: `F-W10:338` publishes ⟨cmd⟩ `` /usr/bin/grep -cF 'ExportModal' waves/F-W10.md `` → **0** in a sentence that spells `ExportModal` three times — and the same repair round that banked it landed `fr-ExportModal L-16` as a fold at `:296`, which the same note lists among its **"13 not [present]"**. **A file that both books a row and lists it as an escape, warranted by a receipt no byte-state can produce.** Attributed to commit `23d3e1dd` (`0 → 2`) and live through four repair rounds and four checks.

---

## §1. FIRST ACT — THE RE-HASH

⟨cmd⟩ this seat, **base = repo root `/Users/mkbabb/Programming/value.js`**, BSD toolchain:

```
shasum -a 256 docs/tranches/X/fourier/waves/F-W*.md \
              docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md \
              docs/tranches/X/fourier/conformance/PIN-PURGE-CERT.md
```

⟨cmd⟩ the output was written to a file and `diff`ed against `PASS-9/SEAL.md §5`'s pasted block, extracted by `sed -n '/^c03149fc2f9e2bec/,/^c5964d0e3d72e100/p'`.

| # | file | this seat | `PASS-9/SEAL.md §5` | |
|---|---|---|---|---|
| 1 | `waves/F-W0.md` | `c03149fc2f9e` | `c03149fc2f9e` | ✔ |
| 2 | `waves/F-W1.md` | `176280bebc23` | `176280bebc23` | ✔ |
| 3 | `waves/F-W10.md` | `d97a0123bf99` | `d97a0123bf99` | ✔ |
| 4 | `waves/F-W2.md` | `655a21e7a64d` | `655a21e7a64d` | ✔ |
| 5 | `waves/F-W3.md` | `93bc1ebc4a24` | `93bc1ebc4a24` | ✔ |
| 6 | `waves/F-W4.md` | `052731a56a12` | `052731a56a12` | ✔ |
| 7 | `waves/F-W5.md` | `40bcad59cd2b` | `40bcad59cd2b` | ✔ |
| 8 | `waves/F-W6.md` | `e83dcad051f5` | `e83dcad051f5` | ✔ |
| 9 | `waves/F-W7.md` | `16e35d5bb571` | `16e35d5bb571` | ✔ |
| 10 | `waves/F-W8.md` | `355d8c97c383` | `355d8c97c383` | ✔ |
| 11 | `waves/F-W9.md` | `4972f6a41832` | `4972f6a41832` | ✔ |
| 12 | `conformance/CENSUS-CANONICAL.md` | **`f44362757458`** | `f44362757458` | ✔ **FROZEN, unmoved** |
| 13 | `conformance/PIN-PURGE-CERT.md` | `c5964d0e3d72` | `c5964d0e3d72` | ✔ |

**`diff` CLEAN. THIRTEEN OF THIRTEEN. Nothing convicts.**

⟨cmd⟩ second hash gate, base repo root: `sed -n '407,418p' …/PIN-PURGE-CERT.md` `diff`ed against a fresh twelve-file `shasum` → **CLEAN 12/12.** **The certificate's §ERRATA-R9 table is the operand it claims to be**, and the round-8 debt it was appended to discharge is discharged.

▲ **Consequence the seal could not state about itself: NOTHING MOVED AFTER `PASS-9/SEAL.md`.** ⟨cmd⟩ `git status --porcelain docs/tranches/X/` returns exactly `M` on `PIN-PURGE-CERT.md`, `F-W1`, `F-W3`, `F-W4`, `F-W6`, `F-W8` (the round-9 write) and `??` on `PASS-9/SEAL.md`. **All three seal-filed landed-wrongs are therefore live at these bytes, and this seat re-verified each independently rather than inheriting the seal's word** (§5.2–§5.4).

---

## §2. THE ROSTER — closed at ZERO by four independent derivations

### §2.1 Boundary-exact subtraction, at the frozen totals

⟨cmd⟩ this seat, `python3`, parsing `CENSUS-CANONICAL.md` §1's 66 per-record tables (home = column 4, `<sub>` stripped **before** the cell split — the round-9 seat's own trap, since three `F.W0` rows carry a `|` inside their errata `<sub>`):

| class | rows |
|---|---|
| **WAVE-DUTY** `F.W0 55` ⊕ `F.W1 330` ⊕ `F.W2 23` ⊕ `F.W3 919` ⊕ `F.W4 1007` ⊕ `F.W5 27` ⊕ `F.W5-W8 89` ⊕ `F.W9 16` | **2466** |
| **TERMINAL (∅)** | **1220** |
| **UNROUTED** | **307** |
| the thirteen routed non-wave classes — `GLASS-RELAY 22` · `NWO (packet) 32` · `NWO→SS-13 3` · `NWO→SS-3 27` · `NWO→SS-5 3` · `SS-1 5` · `SS-13 134` · `SS-2 7` · `SS-3 9` · `SS-4 3` · `SS-5 2` · `SS-6 1` · `SS-7 1` | **249** |
| **TOTAL** | **4242** |

`4242 − 2466 − 1220 − 307 = 249`; the thirteen enumerated classes sum to **249** independently. **The subtraction closes at ZERO with no residue and no unnamed class**, at exactly the four frozen totals the mandate names.

### §2.2 The mechanical re-derivation — §1 against §2 against §3

| quantity | measured |
|---|---|
| §1 rows across 66 records | **4242** |
| §1 per-record header vs table-row count | **66 of 66 agree — zero mismatches** |
| §2 header sum | **4242** |
| §2 bullet-declared sum | **4242** |
| §3 TOTAL | **4242** |
| per-class agreement §1 / §2-header / §2-bullets | **23 of 23 exact** |

### §2.3 NEW THIS PASS — the id-set identity, both directions

⊘ **Pass 9 closed the roster on COUNTS. Counts cancel; sets do not.** ⟨cmd⟩ this seat, `python3`: for every canonical §2 bullet, the declared `(n)`, the id set, and the record set were compared against the §1 rows that home there — strikes and `<sub>` notes removed from both sides.

**527 bullets compared · 23 classes · ZERO record-set divergences · ZERO id-set divergences · ZERO count divergences.**

▲ **This is strictly stronger than any prior pass's roster closure**, and it forecloses the one failure mode the count-based derivations could not see: two compensating errors inside a class.

### §2.4 The spec side — 124 roster bullets against the canonical

⟨cmd⟩ this seat, `python3`, base `waves/`: every `- **fr-X** (n): …` bullet in `F-W0`/`F-W1`/`F-W2`/`F-W3`/`F-W4`/`F-W5`, struck ids removed, compared id-set against the canonical §2 roster for that wave.

**124 bullets · ZERO divergent · ZERO extra · ZERO missing.**

⊘ **`rosterEscapes = 0`, measured from both ends and by four instruments.**

### §2.5 E6-3 — 49 enumerated, fourteen spot-read at both ends

⟨cmd⟩ this seat, `python3`, extracting every §1 row carrying an `E6-3` errata note:

| measure | this seat | E6-3's own delta cell |
|---|---|---|
| rows moved | **49** | 49 |
| → `TERMINAL (∅)` | **48** | 48 |
| → `UNROUTED` | **1** (`fr-GalleryCardModal K-2`) | 1 |
| source waves | `F.W1 28` · `F.W3 9` · `F.W4 5` · `F.W2 4` · `F.W0 2` · `F.W5 1` | **−28 · −9 · −5 · −4 · −2 · −1** |

**Six of six per-wave deltas exact.** The destination/source halves are proven for **all 49 mechanically** by §2.3 (a §1 home *is* §2 membership, and the id sets are identical). Fourteen spot-read at the **citing spec** as well — `F-W1:551` `K1` · `:553` `K-13`/`K-14` · `:554` `K-9` · `:556` `K-1` · `:572` `K-9` · `:574` `K-1` · `:578` `K-16` · `:582` `K-1` · `:590` `K-1`/`K-3`/`K-12` · `:596` `K-12`/`K-15` · `F-W0:248` `K7` · `:255` `K7` · `F-W3:750` `K-2` · `:773` `K-7` · `F-W5:226`+`:288` `K-13` — **every one struck with matching E6-3 `<sub>` provenance, and every surviving register count `(n)` matching its live survivors.**

⊙ **Two live tokens that look like escapes and are not**, checked because a bare-token sweep would trip on them: `F-W1:562` `fr-CollapsibleSection K-1` and `F-W1:565` `fr-ContourSettings K-11` are live `F.W1` bookings — and the canonical homes **both** at `F.W1`. The E6-3 rows are `fr-BasisCanvas K-1` / `fr-EquationModeToggle K-1` / `fr-FrequencyGraph K-1` / `fr-GalleryInfiniteGrid K-1` / `fr-SliderControl K-1` and `fr-ConvergencePlot K-11` — **different records, same token.** R-5's record-qualification is doing exactly the work it was written for.

### §2.6 The canonical-row paste sweep — the pass-9 method, run to zero

⟨cmd⟩ this seat, `python3`, base `waves/`, **two independent extractors**: (i) escaped-pipe form `` \| `id` \| … \| **HOME** \| ``; (ii) plain-pipe/double-backtick form. Each paste's home cell was resolved against the canonical §1 row for that id at the frozen bytes; strike-liveness by pipe-parity on the prefix.

| instrument | pastes found | mismatches | **LIVE** mismatches |
|---|---|---|---|
| strict two-spelling extractor | **38** (`F-W1` 24 · `F-W4` 4 · `F-W5` 3 · `F-W6` 2 · `F-W7` 1 · `F-W8` 4) | 2 | **0** |
| broadened row-fragment extractor | **36** | 2 | **0** |

The two mismatches are `F-W1:650` (`K1` → `F.W1`) and `F-W4:319` (`K-10` → `F.W4`), and **both are inside `~~…~~` with a `<sub>` restating the canonical's current home** — the lawful E-3 shape. ⟨cmd⟩ `sed -n '393p' "$C"` reads `` | `K1` | — | `F.W1` | **TERMINAL (∅)** <sub>*errata R6 E6-3…*</sub> | `` and `F-W1:650`'s sub-note quotes it cell for cell.

▲ **The axis pass 9 opened is closed. One live mismatch became zero, and the sweep that found it was re-run in both spellings by two extractors rather than inherited.**

---

## §3. THE PASS-9 REGISTER (10 ITEMS), CLOSED INDIVIDUALLY AT THE BYTES

| # | pass-9 item | grade | closed at the bytes |
|---|---|---|---|
| 1 | **LW-R9-a** — `F-W4:305` record denominator `17` | MINOR | ✔ **CURED.** Header reads `**71 rows on 16 records**`. Re-derived by this seat from the bullets, **not from the header**: 8 group heads (`MorphShapePreview 20` · `VisualizationView 17` · `DarkModeToggle 7` · `ConvergenceTimeline 7` · `ContourEditorCanvas 4` · `ImageUpload 3` · `EquationView 3` · `EquationPanel 2` = **63**) ⊕ 8 live singles (`:315` declares *"eight rows on eight records (8)"*, `fr-ContourPreview KILL-3` struck). **`63 + 8 = 71`, distinct records `8 + 8 = 16`, overlap ∅.** |
| 2 | **LW-R9-b** — `F-W8:328` `ConvergencePlot` receipt | MEDIUM | ✔ **CURED, and the re-cut is sound.** ⟨cmd⟩ `` /usr/bin/grep -nE '^\| [0-9]+ \| fr-[A-Za-z]+ \*\*' waves/F-W8.md \| /usr/bin/grep -o 'ConvergencePlot' `` → **NO OUTPUT (exit 1)** ✔ · same filter `\| wc -l` → **40** ✔ · row numbers `1…40` contiguous ✔ · the convicted whole-file probe → **six lines `20 40 78 165 246 328`** ✔, all five non-`:20` hits chase-note prose. **A chase note cannot enter the filter by construction.** |
| 3 | **LW-R9-c** — `F-W4:347` `FM-18` fabrication | MEDIUM | ✔ **CURED as arithmetic** (`grep -c` → `0` before · `1` after; measured **1**), ✗ **and it re-created a smaller defect one level up** — §5.3, and the sibling it certifies is §5.2. |
| 4 | **LW-R9-d** — `F-W1:650` stale `K1` paste | MEDIUM | ✔ **CURED.** Struck + sub-noted; §2.6's corpus-wide re-sweep finds **zero** live mismatches. |
| 5 | **LW-R9-e** — `F-W1 §6·R5` count-word + universal | MINOR | ✔ **CURED.** Header reads `23 … — **22 BOOKED · 1 DISPOSED per E6-3**`; the universal is struck and restated enumerated. **Re-measured by this seat**: 24 rows at `:648`–`:671`, of which **22 BOOKED · 1 DISPOSED (`K1`) · 1 `∅ — NO ROW EXISTS` (`vue-tsc`)**. `22 + 1 = 23` ✔ |
| 6 | **LW-R9-f** — eleven dead canonical coordinates | MINOR | ✔ **CURED at every site.** All twelve re-based coordinates verified (§4.2 R-11…R-18); **`F-W8:81`'s classification half cured too** — `C:C-23` at `:5428` inside `### UNROUTED` (`:5386`), not the band. |
| 7 | **LW-R9-g** — `F-W6:131` range receipt + its defence | MINOR | ✔ **CURED.** Struck range `4990,5038p` re-runs to **3** (as the strike discloses); re-cut range `5078,5091p` → **0** ✔; the *"stamped operand"* defence struck. |
| 8 | **LW-R9-h** — `F-W8:81`/`:324` splice artifacts | MINOR | ✔ **CURED.** Both orphaned tails struck with distinct, correct reasons; both sentences read whole. The literal `"The band roster is **89**, not 90. in the band."` is gone. |
| 9 | **INFO** — `§TABLE-R7` stale in five rows, append owed | INFO | ✔ **DISCHARGED.** `§ERRATA-R9` appended (never patched — `§TABLE` and `§TABLE-R7` both survive above it); its twelve-row block `diff`s CLEAN against a fresh `shasum` (§1). |
| 10 | **residual** — `F-W7:101`'s `⟨*REST-37*⟩` dead-voice note | carried | ✔ **UNCHANGED and correctly carried.** `F-W7` was untouched at round 9; E-3 bars rewriting a dated note in place. |

⊕ **`F-W8:40`'s `28 ⊕ 89 = 117` was NOT re-filed.** It is licensed E-3 history, declared non-re-basable in its own note, and it does not enter this pass's live band set: the depth-counted masker removes it because it sits inside a `⟨…⟩` movement minute (§4.4).

---

## §4. RECEIPTS — 60+ re-run on the BSD toolchain

Bases: `$C = conformance/CENSUS-CANONICAL.md`, `$R = docs/tranches/V/megatranche/registry/adjudicated`, `$W = docs/tranches/X/fourier/waves`, `$F = /Users/mkbabb/Programming/fourier-analysis`.

### §4.1 EVERY round-9 re-cut, re-run — 18 of 18 sites, 2 RED

| # | site | command | published | re-run | |
|---|---|---|---|---|---|
| R-1 | `F-W3:383` | `` /usr/bin/grep -n '^\| `PP-NOSHADOW`' "$C" `` | `4433:` + the full row | **`4433:| \`PP-NOSHADOW\` | — | \`F.W3/W4\` · \`F.W1\` | **F.W3** <sub>file-criterion → §5.d</sub> <sub>legs: F.W1</sub> |`** — every cell, both legs | ✔ |
| R-2 | `F-W3:383` | superseded `4393` | declared DEAD | **DEAD** — now `` \| `Contract-v2` \| — \| `F.W1` \| **F.W1** \| `` | ✔ |
| R-3 | `F-W3:416` | `` /usr/bin/grep -nE '^\| `D/D-(11\|17)`' "$C" `` | `1875:` · `1878:` **with `<sub>legs: F.W4</sub>` restored** | **both lines byte-identical, both legs present** | ✔ |
| R-4 | `F-W3:416` | superseded `1761`/`1764` | declared DEAD | **DEAD** — now `N-1` / `N-4` | ✔ |
| R-5 | `F-W6:131` | `` sed -n '5078,5091p' "$C" \| grep -c '…' `` | **0** | **0** | ✔ |
| R-6 | `F-W6:131` | struck `4990,5038p`, verbatim | **3** (disclosed) | **3** | ✔ |
| R-7 | `F-W8:15` | `sed -n '5488,5491p' "$C"` | four §4.1 lines | **byte-identical** | ✔ |
| R-8 | `F-W8:15` | superseded `5393,5396p` | declared DEAD | **DEAD** — four §2 UNROUTED bullets | ✔ |
| R-9 | `F-W8:20` | `` grep -nE '^### F\.W5(-W8)? — ' "$C" `` | `5078` · `5092` | **`5078` · `5092`** | ✔ |
| R-10 | `F-W8:81` | `grep -nF 'fr-PaperSearchDropdown' "$C"` | `5428:` inside `### UNROUTED` | **`:5428`; `### UNROUTED` at `:5386`; `### F.W5-W8` heading is `:5092`** — classification confirmed | ✔ |
| R-11 | `F-W8:81` | superseded `5034` | declared DEAD | **DEAD** — now `fr-ContourSettings (1): i-8` | ✔ |
| R-12 | `F-W8:246`(A) | `grep -nF 'fr-ContourPreview** (1): ' "$C"` | `5084`/`5131`/`5397` | **exact, and all three routings hold** (`:5084` ⊂ `### F.W5`, `:5131` ⊂ `### F.W9`, `:5397` ⊂ `### UNROUTED`) | ✔ |
| R-13 | `F-W8:246`(A) | the filter `\| grep -c 'L:L-5'` | **1** | **1** | ✔ |
| R-14 | `F-W8:246`(B) | `/usr/bin/grep -nF 'L:L-5' "$C"` | `5008`/`5084` ⊕ `1365`/`4078` | **four lines exact**; `:1365` = `` \| `L:L-5` \| — \| `F.W5` \| **F.W5** \| `` · `:4078` = `` … **F.W3** <sub>file-criterion → §5.c</sub> `` | ✔ |
| R-15 | `F-W8:328` | the §6a-row discriminator (3 forms) | NO OUTPUT · 40 · rows 1–40 | **NO OUTPUT (exit 1) · 40 · `1 2 … 40` contiguous** | ✔ |
| R-16 | `F-W1:642/644` | table shape | 24 rows · 22 BOOKED · 1 DISPOSED · 1 ∅ | **24 · 22 · 1 · 1** | ✔ |
| R-17 | `F-W1:650` | `sed -n '393p' "$C"` | `**TERMINAL (∅)**` | **exact, cell for cell** | ✔ |
| R-18 | `F-W4:305/315` | `71 rows on 16 records` · `eight … (8)` | 63 ⊕ 8 = 71 · 16 distinct | **63 ⊕ 8 = 71 · 16 distinct, overlap ∅** | ✔ |
| **RED** | `F-W4:192` | `grep -c 'showImageOverlay' F-W4.md` | `0` → **`1`** | **2** | ✗ §5.2 |
| **RED** | `F-W4:347` | byte-universal (not the `grep -c`) | *"sole occurrence … at any byte"* | `grep -o … \| wc -l` → **2** | ✗ §5.3 |

⊙ `F-W4:347`'s **arithmetic** is GREEN (`grep -c` → **1**, `0` before / `1` after re-runs exact), and `F-W4:117`'s `` grep -oE "\bBC-10\b" F-W4.md \| wc -l `` → **12** ✔ — the `\b`-escaped form is immune to being quoted, which is the demonstrated argument for the idiom.

### §4.2 Forty-two further receipts — 40 GREEN, 2 filed

| # | site | command (base) | published | re-run | |
|---|---|---|---|---|---|
| 19 | `F-W6:476` | `grep -o '^### F\.W5 — \*\*27 rows\*\*' "$C"` | verbatim | verbatim | ✔ |
| 20 | `F-W6:476` | `grep -o '^### F\.W5-W8 — \*\*89 rows\*\*' "$C"` | verbatim | verbatim | ✔ |
| 21 | — | `grep -c '^### F\.W5 — \*\*28 rows\*\*' "$C"` | **0** | `0` | ✔ |
| 22 | — | `grep -c '^### F\.W5-W8 — \*\*90 rows\*\*' "$C"` | **0** | `0` | ✔ |
| 23 | `F-W1:266/548` | `awk` over §2's `F.W1` roster | **330** | `330` | ✔ |
| 24 | `F-W1` §6 | `F.W1` roster records | **65** | `65` | ✔ |
| 25 | `F-W3` g19 | `F.W3` roster records | **59** | `59` | ✔ |
| 26 | `F-W5:269` | `grep -cE '^\| \*\*[A-G][0-9]+c?\*\*' F-W5.md` | **93** | `93` | ✔ |
| 27 | `F-W8:78` | §4 gate rows `G1`–`G16` | **16** | `16` | ✔ |
| 28 | `F-W8:78` | §6a numbered citation rows | **40** | `40` | ✔ |
| 29 | `F-W6:175/525/543` | `grep -c '§6c' waves/F-W5.md` | 0 / no output | `0` | ✔ |
| 30 | `F-W6:175/558` | `grep -c '§12' waves/F-W5.md` | 0 / no output | `0` | ✔ |
| 31 | `F-W8:40` | `grep -o '§6b\|§6c' waves/F-W5.md` | no output | no output | ✔ |
| 32 | `F-W4:374` | `grep -oh 'F\.W4' fr-*.md \| wc -l` | **1128** | `1128` | ✔ |
| 33 | `F-W4:374` | `grep -oh 'F\.W3/W4' fr-*.md \| wc -l` | **1010** | `1010` | ✔ |
| 34 | `F-W4:374` | `grep -oh 'F\.W3–W4' fr-*.md \| wc -l` | **0** | `0` (exit 1) | ✔ |
| 35 | `F-W5:107` | `grep -rho 'F\.W5-W8' fr-*.md \| wc -l` | **120** | `120` | ✔ |
| 36 | `F-W5:107` | `grep -rho 'F\.W5–W8' fr-*.md \| wc -l` | **72** | `72` | ✔ |
| 37 | `F-W5:271` | `grep -row 'F\.W5' fr-*.md \| wc -l` | **245** | `245` | ✔ |
| 38 | `F-W5:106/118` | `grep -lw 'K-13' fr-*.md \| wc -l` | **40 of 66** | `40` | ✔ |
| 39 | `F-W5:111` | `grep -lw 'M-10' fr-*.md \| wc -l` | **23** | `23` | ✔ |
| 40 | `F-W5:116` | `grep -lw 'C-7' fr-*.md \| wc -l` | **46** | `46` | ✔ |
| 41 | `F-W5:381/419` | `grep -lw 'P-9' fr-*.md \| wc -l` | **0** | `0` | ✔ |
| 42 | `F-W5:106` | `grep -rl 'P-9' fr-*.md \| wc -l` | **6** | `6` | ✔ |
| 43 | `F-W5:346` | `grep -cw 'P-9' "$C"` | **0** | `0` | ✔ |
| 44 | `F-W5:106` | `grep -lw 'AA-45' fr-*.md \| wc -l` | **1** | `1` | ✔ |
| 45 | `F-W5:112` | `grep -ow 'M-10' fr-ContourSettings.md \| wc -l` | **2** | `2` | ✔ |
| 46 | `F-W5:112` | `grep -ow 'M-10' fr-BasisSelector.md \| wc -l` | **4** | `4` | ✔ |
| 47 | `F-W5:180` | `grep -cE 'F\.W5[-–]W8' fr-AdminUserList.md` | **1** | `1` | ✔ |
| 48 | `F-W4:343` | `grep -o 'FR-CP-' fr-CoefficientsPanel.md \| wc -l` | **92** | `92` | ✔ |
| 49 | `F-W6:3/127/587` | `grep -rnE "F\.W5[-–]W8" fr-*.md \| grep -c "tri-package uplift"` | **23** | `23` | ✔ |
| 50 | `F-W5:275` | `grep -n 'C-28' fr-CanvasControlsDock.md` | THREE, disclosed | `45` `102` `150` | ✔ |
| 51 | `F-W5:145` | `grep -n 'FR-NP-30' fr-NotationPills.md` | THREE, disclosed | `45` `74` `130` | ✔ |
| 52 | `F-W3:359` | `grep -c 'structurally cannot honour' fr-ContourSettings.md` | **1** | `1` | ✔ |
| 53 | `F-W3:144` | `grep -n 'live at' fr-NotationPills.md` | `9:` + `124:`, elision disclosed | `9` `124` | ✔ |
| 54 | `F-W0:194` | `grep -n 'already elected to treat the working tree' fr-GalleryAdminBanner.md` | `130:` | `130` | ✔ |
| 55 | `F-W0:200` | `grep -n 'favors \*\*freeze-with-adoption\*\*' INTAKE-ADJUDICATION-2026-08-03.md` | `233:` | `233` | ✔ |
| 56 | `F-W2:109` | `/usr/bin/grep -n '^### G-1[123] — ' F-W0.md` | `364` · `369` · `374`, prefixes + markers retained | **exact, all three** | ✔ |
| 57 | `F-W8:366` | `grep -n '^### D · ' carry/F-W4-CARRY.md` | `172:` | `172` | ✔ |
| 58 | `F-W8:366` | `grep -oE '^## §[A-Za-z0-9]+' carry/F-W4-CARRY.md` | five anchors in order | `§0 · §Rows · §Gates · §Bounds · §CrossEdges` | ✔ |
| 59 | `F-W6:528`/`F-W7:225` | `git -C $F status --porcelain \| wc -l` | **28** | `28` | ✔ |
| 60 | `F-W6:528`/`F-W7:225` | `git -C $F rev-parse --short=8 HEAD` | `cd26c653` | `cd26c653` | ✔ |
| **RED** | `F-W10:338` | `/usr/bin/grep -cF 'ExportModal' waves/F-W10.md` | **0** | **2** (`:296`, `:338`) | ✗ §5.1 |
| **RED** | `F-W10:338` | the 65-id record-qualified escape probe | **52 present · 13 not** | **does not reproduce** | ✗ §5.1 |

**58 of 60 reproduce exactly.** Two receipts quoted only as **retired-by-law** history are excluded from the tally and named so a successor does not re-file them: `F-W0:21`'s four self-counts (*"This retires, by law rather than by correction, the four receipts this file was proudest of: the three `Genuinely owed` counts, and the masthead's own `grep -c 'F-W1.md:276' F-W0.md` → 2"*) and `F-W4:143`'s `EV-D·D-M4` count (*"the figure was false the instant it was written down"*, converted at R3-10.5). **Both carry their own conviction in the citing cell — that is the lawful shape, and re-running them is not a test of anything live.** The same applies to `F-W8:7/40/246/268`'s quotations of the retired `grep -c "F\.W8" F-W5.md` form.

### §4.3 Canonical coordinates — ten live, verified; four dead, all disclosed

⟨cmd⟩ this seat, `python3`: every `NNN(N):` in the eleven specs whose payload is canonical-shaped, resolved against `CENSUS-CANONICAL.md` at the frozen bytes.

**LIVE and correct (10, against a floor of 8)**: `4433` (`PP-NOSHADOW`) · `1875`/`1878` (`D/D-11`, `D/D-17`) · `5078`/`5092` (the two band headings, cited from `F-W5:381` **and** `F-W8:20`) · `5428` (`C:C-23`) · `5084`/`5131`/`5397` (`fr-ContourPreview`) · `5489` (§4.1's `KF.W7` sentence). **Every payload reproduces at its address.**

**DEAD, and each disclosed as dead in the citing cell** (4): `4393` · `1761`/`1764` · `5393,5396p`/`5394` · `5034` · `5038`/`5052`. ⊘ **Zero live dead coordinates.**

⊙ Coordinates into **non-canonical** files (`F-W0`, `fr-*.md`, `carry/`, `INTAKE-ADJUDICATION`) were separated and spot-verified at rows 53–58 above; none is a canonical citation and none is stale.

### §4.4 The pass-8 HIGH axis, re-probed with a third instrument

⟨cmd⟩ this seat, `python3`, base `waves/`, over all eleven specs: regex `(?<![0-9.\-])(28|90|117|118)(?![0-9])`, **no phrase restriction**; liveness by a masker removing `~~…~~`, `<sub>…</sub>` and **depth-counted** `⟨…⟩`.

| stage | count |
|---|---|
| raw bare-numeric hits | **282** |
| live after mask | **194** |
| live **with band context** | **31 — every one adjudicated by hand** |
| **live STALE band figures** | ⊘ **ZERO** |

The 31 resolve to: F.W0's 28 dirty paths (`F-W0:122/306/486` · `F-W6:528` · `F-W7:225` · `F-W10:193`) · line anchors (`sed -n '90p'`, `sed -n '114,117p'`, `fr-FourierShapeExtractor:90`, `fr-PaperSearch:90`, `fr-App.md:90`) · `F-W8`'s **28 carry rows** (`:38/:163/:165`) · the `C-01..C-90` demoted draft lineage (`F-W3:416/901`) · correct supersession statements (`F-W5:295`, `F-W8:20/81/324`) · `F-W6`'s roster row numbers 28/38 · and `F-W5:265` itself, licensed by construction. **The pass-8 HIGH stays CURED, confirmed now by three different instruments across three passes.**

---

## §5. LANDED-WRONG — eight, filed here and nowhere else

### LW-R10-a — `F-W10:338`'s `ExportModal` receipt is FABRICATED, its universal is false at a live booking, and its count-word is contradicted by the same file. **MEDIUM.** ⚑ NEW — nine passes missed it.

**Published, live and unstruck**, inside `⌧ THE ROUND-4 RESULT WAS AN ARTEFACT OF THE PROBE (re-cut at repair round 5, REST-65; P5-1, HIGH)`:

> It published *"the 60 ids … each tested `grep -qF` … **60 present · 0 missing**"* — and ⟨cmd⟩ `/usr/bin/grep -cF 'ExportModal' waves/F-W10.md` → **0**: **that record is named nowhere in this file.**

⟨cmd⟩ this seat, base `$W`, verbatim: **`2`.** ⟨cmd⟩ `-n`: **`:296`** and **`:338`**.

**Three distinct faults, and the first is the fatal one:**

1. **The receipt is IMPOSSIBLE, not stale.** The command string contains the literal `ExportModal`; the same sentence spells `fr-ExportModal L-16` twice more. **There is no byte-state of `F-W10.md` containing that line at which the published `0` is producible.** This is `LW-R9-c`'s class exactly — the self-refuting receipt — at a *second* site, carrying **neither** the R3-3.8 before/after pairing **nor** a disclosure, which is the same reason `:347` survived four passes.
2. **The universal is false at a LIVE BOOKING.** `:296` reads *"▲ **`fr-ExportModal L-16` FOLDS HERE — landed at repair round 5 (REST-65)**"* — the same REST id, the same round. **The file books the row at `:296` and lists it as an escape at `:338`.** ⟨cmd⟩ this seat, the note's own record-qualified boundary-anchored probe, run over `F-W10.md` **with `:338` excluded**: `fr-ExportModal L-16` → **1 qualified line** (`:296`); the other twelve → **0**. So the honest current figure is **53 present · 12 not**, not `52 · 13`.
3. **Re-run verbatim (line `:338` included) the probe returns `65 present · 0 not`**, because the note names all thirteen `(record, id)` pairs on one line. **A membership test over the file that states it cannot survive its own statement** — R3-3.10, at the widest site in the corpus.

⊘ **Attribution, proved rather than inferred.** ⟨cmd⟩ this seat, over committed history:

| bytes | `grep -cF 'ExportModal' waves/F-W10.md` |
|---|---|
| `50052945` (pre-round-5) | **0** ✔ — the figure was true of *those* bytes |
| `23d3e1dd` (**round-5 banked**) | **2** ✗ |
| `3c12ec3d` · `4d13029c` · `c3bbb168` · worktree | **2** ✗ |

**The repair that banked the receipt is the repair that falsified it, in one commit**, and it has stood through rounds 6, 7, 8, 9 and passes 6, 7, 8, 9.

▲ **Nothing routes off it and no pin moves**: `F-W10` has **zero** canonical record-side rows (§6's zero-roster posture, re-verified — the canonical homes `F.W10` at **0**), so no roster escape flows from this cell, and §2.3's id-set identity is untouched. **The defect is confined to the cell's own arithmetic and to a count-word that contradicts a booking eight sentences away.** **Cure**: pair it (`0` before REST-65 · `2` after) or strike it to a classification as `F-W6:634` and `F-W4:319` already do, re-derive `52 · 13` → `53 · 12` **after** the fold is counted, and delete the universal. **Round 11's operand; this seat wrote nothing into `F-W10.md`.**

### LW-R10-b — `F-W4:192`'s `showImageOverlay` receipt is falsified by the round-9 block that cites it as GREEN (**seal LW-1, UNCURED**). **MEDIUM.**

**Published at `:192`**, live: ⟨cmd⟩ `grep -c 'showImageOverlay' F-W4.md` → **`0`** before this block; **re-run by the purge seat over the settled bytes → `1`** — *"(R3-3.8 pairing — one occurrence each, **both inside this row**, which is the booking proved)"*.

⟨cmd⟩ this seat, verbatim: **`2`** — `:192` and **`:347`**. One of the two is **not** inside that row.

| bytes | count |
|---|---|
| `c3bbb168` (round-8) | **1** ✔ — true when written |
| worktree (round-9 settled, `052731a56a12`) | **2** ✗ |

⊘ **The round-9 block at `:347` spells the token in full inside the very sentence certifying it**: *"its two siblings at `:117` … and `:192` (`grep -c 'showImageOverlay' …` → `0` → `1`) both carry the pairing and **both re-run GREEN**."* At the bytes that sentence settled into, one of the two does not. ⊙ Its companion `grep -c 'shape only' F-W4.md` → **1** re-runs GREEN (sole hit `:192`), and `D:m-6`'s booking is untouched — **only the arithmetic is wrong, and it is wrong in a cell that claims to have checked it.**

### LW-R10-c — `F-W4:347`'s byte-level universal is falsified by the sentence that states it (**seal LW-2, UNCURED**). **MINOR.**

**Published**: *"the single hit IS this line: **the sole occurrence of `FM-18` at any byte of this spec is the command string quoted immediately above**."*

⟨cmd⟩ this seat: `grep -c` → **1** ✔ (line count). `grep -oE 'FM-18' F-W4.md \| wc -l` → **2** — the command string **and the prose clause making the claim**. At `c3bbb168` the byte-occurrence count was **1**; the round-9 restatement added the second.

**Mitigation**: the honest form sits two clauses later on the same line — *"the band's middle member appears at no **substantive** byte of this spec"* — which is TRUE and unaffected. **The receipt is GREEN and the sentence around it is not.**

### LW-R10-d — `PIN-PURGE-CERT.md §ERRATA-R9` row 9 undercounts the re-based coordinates: **"eight" should be eleven** (**seal LW-3, UNCURED**). **MINOR.**

**Published** (cert `:391`): *"eight dead canonical coordinates re-based **(three of them found by this seat's own sweep, at the masthead)**"*.

⟨cmd⟩ this seat, enumerating every round-9 re-base site in `F-W8` from the spec's own notes:

| site | dead coordinates re-based | in `PASS-9/CHECK.md`'s drift table? |
|---|---|---|
| `F-W8:15` (masthead) | `5394` · `5393` · `5396` | **NO** — `F-W8.md:15` says so in terms: *"Found by this seat's own round-9 sweep … **not by the pass-9 check's list**"* |
| `F-W8:81` | `5034` | yes |
| `F-W8:246`(A) | `5044` · `5091` · `5358` | yes |
| `F-W8:246`(B) | `4968` · `5044` · `1305` · `4037` | yes |
| | **11 mentions / 10 distinct** | check-listed subtotal **8** |

The cert adopted the check's `3 + 4 + 1 = 8` and then appended a parenthetical claiming three of *those eight* were the masthead's. **They are additional. "Three of them" should read "three more," and "eight" should read "eleven."** Non-load-bearing — every one of the eleven verifies at §4.1 R-1…R-14 — and worth naming because it lands in the **certificate's own summary of the repair round**, the one document the next seat reads. ⊘ Per E-3 this is an **append's** business; this seat wrote nothing into the certificate.

### LW-R10-e — `F-W8:324`'s *"zero bytes anywhere else in this file"* is false at the bytes. **MINOR.**

**Published, live**: *"`fr-PaperSearchDropdown` **`C:C-23`** — the sole canonical `F.W5-W8` row with **zero bytes anywhere else in this file**, found by this seat by testing all **89** canonical band rows against these bytes"*.

⟨cmd⟩ this seat, base `$W`: `grep -n 'C:C-23' F-W8.md` → **eleven lines** — `20 25 27 40 78 81 165 246 267 322 324`. ⟨cmd⟩ over committed history: **11 at `23d3e1dd`, `3c12ec3d`, `4d13029c`, `c3bbb168` and the worktree** — so the E5-15 chase notes carried it to eleven and it has been false since round 5 at the latest.

**Mitigation**: every one of the other ten occurrences is a chase note, a disclosure, or the masthead's own E5-15 minute **about this same non-booking** — the substance (`C:C-23` is **cited** to F-W5, homed `UNROUTED`, booked nowhere at F.W8) is TRUE and independently re-verified at §4.1 R-10. **Cure**: scope the clause to `§3`/`§6a` rows, or strike it to the classification.

### LW-R10-f — `F-W9:505`'s pair-universal is falsified by the clause that states it. **MINOR.**

**Published, live**: *"**`(fr-VisualizationView, L-26)` — the PAIR v4 rules — appears nowhere in this spec**"*.

⟨cmd⟩ this seat, base `$W`: `grep -c 'fr-VisualizationView, L-26' F-W9.md` → **1** — its own sentence. ⟨cmd⟩ the boundary-anchored id probe: `L-26` at `:119`, `:304`, `:505`, of which **exactly one** co-occurs with `fr-VisualizationView` — `:505`.

**Mitigation**: the substantive claim — no **booking** of that pair exists in `F-W9` — is TRUE (the id-set identity at §2.3 confirms it), and the next sentence states the record-qualified warrant correctly. This is `LW-R10-c`'s class in a second file: **a universal quantified over bytes, refuted by its own bytes.** Same cure.

### LW-R10-g — `F-W10:423` drops the record qualification on `M1`, on the line that names the cite-both law. **MINOR.**

⟨cmd⟩ this seat, base `$W`: `` grep -ohE 'FR-NP-32[^≡]{0,6}≡[^A-Za-z0-9]{0,3}(\*\*|`)?[A-Za-z0-9-]+' waves/F-W*.md \| sort \| uniq -c `` → **53 equivalence spellings, 52 of them `FR-NP-32 … ≡ … fr-PaperSidebar (M1)`** and **one** — `F-W10:423` — reading **`FR-NP-32 (≡ M1)`**.

The same line's gate cell carries the full canonical form four sentences earlier and names the law in terms: *"**FR-NP-32 (≡ fr-PaperSidebar M1)**, BLOCKER, **cite-both-never-substitute**"*. **The disposition cell then drops the record.** `M1` is a live cross-record short token, and R-5 is explicit that an unqualified short token is not an identity.

**Mitigation**: fully-qualified on the same line, in the same table row, under the law's own name; the parenthetical is an equivalence gloss, not a booking; nothing routes off it. Pass 9's *"every qualified spelling is `FR-NP-32 (≡ fr-PaperSidebar M1)`"* is falsified by exactly this one site.

### LW-R10-h — one live superseded census digest survives the ZERO claim. **MINOR (INFO-adjacent).**

⟨cmd⟩ this seat, `python3`, base `waves/`: every occurrence of the two superseded census digests (`a450b8e9f80e`, `3e0a9acb3381`) — **30 occurrences** — tested for (i) strike-liveness by pipe-parity and (ii) the presence of `f44362757458` within ±400 characters.

**Twenty-nine satisfy one or both.** One does not: **`F-W1:725`**, inside the `### §E-3·R4 — dated errata, repair round 4` table, reading *"The LHS is **now** `CENSUS-CANONICAL.md` §2's F.W1 roster, **verbatim and entire**, hash-pinned at quote time (`a450b8e9f80e`)"* — unstruck, present-tense *"now"*, and `f44362757458` appears **nowhere on the line**.

**Mitigation, and why this is MINOR and not MEDIUM**: the cell sits in a table whose first column reads `2026-08-29` and whose heading declares it dated round-4 errata, which E-3 expressly bars rewriting in place; the same file states the current digest at `:9`, `:12`, `:266`, `:473` and `:548`; and **`PIN-PURGE-CERT.md` is the sole pin authority** by the star topology, so no inline digest is load-bearing. **The finding is that pass 9's universal — *"Every occurrence … stands inside an explicit strike or movement minute naming `f44362757458` beside it"* — is false of exactly one cell.** ⊘ Per E-3 the cure is an append beside the row, never an edit of it.

---

## §6. GATES AND POSTURES

| gate | measure | |
|---|---|---|
| canonical operands only | ⟨cmd⟩ every live `THE OPERAND` declaration in the eleven specs names `CENSUS-CANONICAL.md` §2 or §1; **no gate cites a non-canonical census operand**; `F-W5:381` and `F-W6:526` read `27`/`89` at the frozen pin | ✔ |
| portable commands, declared bases | `/usr/bin/` absolute spellings throughout the round-8/9 cures; bases declared per §; **every re-run in §4 executed unmodified on BSD**; the seven `grep -P`/`-coP` strings that survive are **declared as residual strings at `F-W4:464` §Y.3** expressly so a mechanical pass does not re-file a cured defect, and `F-W4:447` records all seven exiting 2 on the pinned binary | ✔ |
| locale where sensitive | `LC_ALL=C` used where a `sed`/`tr`/`grep` pipeline is order-sensitive (`F-W10:296`); the remaining `sort -u` uses are set-membership over ASCII id tokens, whose results this seat reproduced on the default locale | ✔ |
| no false universals in current voice | **four found** — `F-W10:338` (LW-R10-a) · `F-W4:347` (LW-R10-c) · `F-W8:324` (LW-R10-e) · `F-W9:505` (LW-R10-f). `F-W1:644`'s (pass-9's one) is CURED. Nine further self-referential universals tested and TRUE: `F-W4:266` (past-tense, honest) · `F-W4:115/399/423` · `F-W2:265` · `F-W7:16` · `F-W8:118/328` · `F-W10:397` | ✗ 4 |
| count-words match their lists | **two found** — `F-W10:338`'s `52 · 13` (LW-R10-a) and the certificate's `eight` (LW-R10-d). All others verified: `F-W4:305` `71/16` · `F-W4:315` `(8)` · `F-W1:642` `23 = 22 + 1` · `F-W8` `16`/`40`/`28`/`89`/`sixteen at sixteen rows` · `F-W3` `919`/`59` · `F-W1` `330`/`65` · `F-W5` `93` · `F-W6` `27`/`89` | ✗ 2 |
| no spelling-restricted detector certified as a sweep | this seat's band probe was **bare-numeric** (§4.4) and independent of round 8's and pass 9's; **no surviving gate declares a spelling as its operand** — every one declares a roster; the R2-9 law is stated at four sites | ✔ |
| arithmetic assertions | ⟨cmd⟩ `python3`, every live `a + b + … = c` and `a − b − … = c` in the eleven specs, liveness-masked: **36 additive + 4 subtractive, ALL CORRECT.** (One apparent miss, `F-W5:243`'s `42·100+42 = 4242`, is a **quotation of a product provenance comment** the row is convicting — and the arithmetic quoted is itself true; the row's charge is that the formula it cites exists in neither repo. **No finding.**) | ✔ |
| **F.W1 transaction whole** | `330 = 362 − 4 − 28` re-derived; `awk` over the canonical returns **330**; **65** records; §6·R5's register `(n)` heads match live survivors at all 14 spot-read bullets | ✔ |
| **W7 / W6 / W10 zero-roster postures** | ⟨cmd⟩ `python3` over §1's 66 tables: rows homed **`F.W6` = 0 · `F.W7` = 0 · `F.W8` = 0 · `F.W10` = 0**. ⟨cmd⟩ over the 66 records: `F.W7` occurs **twice**, and `KF.W7` occurs **twice** — i.e. **both `F.W7` substrings are inside `KF.W7`**, reproducing canonical §4.1 `:5488–5491` exactly. `F-W8:78` states `NO RECORD-SIDE DENOMINATOR` | ✔ |
| **FR-NP-32 canonical form** | 53 equivalence spellings; **52 carry `fr-PaperSidebar M1` with *"cite both, NEVER substitute"*** — one exception at LW-R10-g | ✗ 1 (MINOR) |
| **SS-4 flags inline** | **379** `SS-4` occurrences across all eleven specs (`F-W0 25` · `F-W1 31` · `F-W2 28` · `F-W3 18` · `F-W4 22` · `F-W5 30` · `F-W6 14` · `F-W7 33` · `F-W8 16` · `F-W9 25` · `F-W10 46`), flagged at their rows; the rulings are named-not-presumed at every site sampled | ✔ |
| **fourier tree READ-ONLY** | `git -C $F status --porcelain \| wc -l` → **28** · `rev-parse --short=8 HEAD` → **`cd26c653`** — unchanged, reproducing `F-W7:225` / `F-W9:305` / `F-W6:528`. This seat ran only `status` and `rev-parse` against `$F` | ✔ |
| **E-3** | round 9's writes are strike-with-restatement or dated `⟨…⟩` appends at all thirteen edited sites; `PIN-PURGE-CERT.md` was **appended** (`§TABLE` and `§TABLE-R7` both survive above `§ERRATA-R9`), never patched; ⟨cmd⟩ `git status --porcelain conformance/` shows **no PASS-1…PASS-8 instrument modified**; this seat edited none | ✔ |
| **zero `VERIFIED-YES`** | `grep -c 'VERIFIED-YES' F-W*.md` → **0** in all eleven | ✔ |
| **status `planned`** | three masthead declarations (`F-W6:3`, `F-W9:3`, `F-W10:3`), all `**status: planned**`; **no `done`, no `landed`** anywhere | ✔ |
| **no product source opened** | this seat read only `docs/tranches/X/fourier/**`, `docs/tranches/V/megatranche/registry/adjudicated/*.md` and one intake adjudication file named by a receipt; `$F` touched by `git status`/`rev-parse` only. **Receipts whose operands are `web/src`, `dist` or `node_modules` were deliberately NOT re-run** and are excluded from the tally | ✔ |
| **write scope** | this file alone; `PASS-10/` created by `mkdir -p` | ✔ |

---

## §7. THE BAR, ANSWERED

| bar clause | required | measured |
|---|---|---|
| zero BLOCKER / CRITICAL / HIGH | yes | ✔ **zero** |
| hashes clean | yes | ✔ **13 of 13**, `diff` clean; cert block **12 of 12** |
| roster closed | yes | ✔ **ZERO escapes**, four independent derivations, id-set exact |
| fabrication zero | yes | ✗ **TWO** (LW-R10-a, LW-R10-b) |
| tail MINOR-or-below with stated mitigations | yes | ✗ **two MEDIUM** ⊕ six MINOR |

**VERDICT: NOT CONFORMANT.**

⊘ **What this pass settles, so round 11 does not re-litigate it.** The census axis is **finished**: the roster closes at ZERO by boundary-exact subtraction, by `§1 = §2 = §3` class by class, by a full **id-set** identity over 527 canonical bullets in both directions, and by 124 spec-side bullets matching exactly. E6-3's 49 dispositions are whole at both ends. The band operand is CLOSED under a third independent instrument. The canonical-row paste sweep — the method that convicted one cell at pass 9 — now convicts **none**, in both spellings, under two extractors. **Ten of ten pass-9 register items are cured at the bytes, and the certificate's owed append is discharged and hash-clean.**

⊘ **The observation this seat will offer, because it is measurable rather than editorial.** Of the eight findings, **five belong to one class**: a receipt or a universal whose subject is *the file it lives in*. The programme has convicted that class at every pass since PASS-4, has written the law against it three times (R3-3.10, R3-3.7, R2-9), and has demonstrated the cure in-corpus four ways — the `\b`-escaped literal at `F-W4:117`, the shape-discriminating filter at `F-W8:328`, the R3-3.8 before/after pairing, and the strike-to-a-classification at `F-W6:634`. **The remaining defects are not places where the instrument is missing. They are places where the corpus stated the law and then wrote the sentence anyway** — and `F-W10:338` is the demonstration, because it is the only site where the file **books a row at one line and lists it as an escape at another**, warranted by a count no reading of any bytes containing it could ever have returned. ⊙ Nine passes read past it. A sweep for *self-referential universals* — not for stale numbers — is what found it, and that is the instrument round 11 owes the corpus.

---

## §TABLE-R10 — sha256, the last act of this check

⟨cmd⟩ this seat, **base = repo root `/Users/mkbabb/Programming/value.js`**, BSD toolchain, run after every verification above and after the last byte of this file's body:

```
shasum -a 256 docs/tranches/X/fourier/waves/F-W*.md \
              docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md \
              docs/tranches/X/fourier/conformance/PIN-PURGE-CERT.md
```

**Thirteen rows, byte-identical to `PASS-9/SEAL.md §5`, `diff`-verified at §1 and unchanged by this write** — this seat wrote only `PASS-10/CHECK.md`, which appears in no row of that table and stales nothing.

⊘ **The expiry, restated.** A hash proves bytes. It does not prove coordinates, and it does not prove that a paste was produced by its command — **`LW-R10-a` is this round's demonstration of the second half, found *after* a hash table that was, and remains, clean.**

**Nothing is written after this block.**
