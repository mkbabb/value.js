# X·F CONFORMANCE PASS 5 — F-W3 CHECK (L-18/L-20 adversarial spec check, FRESH SEAT)

**Wave**: `F-W3` · **Spec**: `docs/tranches/X/fourier/waves/F-W3.md` (908 lines, 300 716 bytes)
**Seat**: fresh pass-5 adversarial seat, 2026-08-29. Authored none of the round-4 cures it tests (UNION §5 / R4-4's standing falsifier, honoured).
**Operands** — canonical only: `../CENSUS-CANONICAL.md` (sole census operand, R4-3/R4-10) · `../PASS-4/RULINGS-4.md` · `../PASS-4/CLOSE-CERT-2.md` · the 66 frozen `fr-*.md` at `docs/tranches/V/megatranche/registry/adjudicated/` · the read-only product tree at `/Users/mkbabb/Programming/fourier-analysis`.
**Toolchain, pinned (R4-2.1/.2)**: `PATH=/usr/bin:/bin:/usr/sbin:/sbin` — BSD `grep` · `sed` · `awk` · `cut` · `comm` · `diff` · `find` · `shasum`. Never ugrep.
**Writable set**: this file only. The tree was READ ONLY — no wave spec, carry, census, ruling or certificate byte was written by this seat.

**VERDICT: DEFECTIVE** — 1 HIGH · 1 MEDIUM · 2 LOW. The census axis is **CLEAN and closed by construction**; the two convictions are receipt-reality defects, one of them **false at write** and both missed by the round-4 purge sweep, which certified this wave `0 convictions · CLEAN`.

---

## §0 — THE CERTIFICATE HELD, SO NOTHING BELOW IS AN ARTEFACT OF A LATER WRITE

`CLOSE-CERT-2 §8` binds twelve files. Re-hashed first, before any other measurement, because every finding below depends on the settle being the certified one:

```
⟨cmd⟩ shasum -a 256 docs/tranches/X/fourier/waves/F-W*.md docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md
  -> all twelve digests match §8's table exactly (F-W3 a89c3386f3f8…, canonical a450b8e9f80e…)
```

**No seat wrote after the cert.** The two convictions at §3 are therefore defects of the certified bytes, not of a subsequent edit — and they falsify `CLOSE-CERT-2 §4`'s F-W3 row (*"84 · 0 convictions · CLEAN"*) on its own terms, exactly as that certificate's §5 falsified its predecessor. Its closing clause governs: *"no certificate is inherited — pass 5 re-runs these claims or it has none."*

---

## §1 — AXIS 1 · ROSTER BOOKED/CITED COMPLETE — **CLEAN**

The census axis is now mechanical. Duty, quoted from the ruling that assigns it:

```
⟨cmd⟩ R=/Users/mkbabb/Programming/value.js/docs/tranches/X/fourier
      /usr/bin/grep -F '| F-W3 |' "$R"/conformance/PASS-4/RULINGS-4.md
  -> | F-W3 | F.W3 → **926** | book/cite all 926 (the twin's F.W3 arm, 85 criterion + 841 dual-resolved); g19 re-cut per R4-9.6 |
```

**The canonical roster, enumerated independently by this seat** (not inherited from the spec's own receipt):

```
⟨cmd⟩ awk '/^### F\.W3 —/{f=1;next} /^### F\.W4 —/{f=0} f&&/^- \*\*fr-/{r++; match($0,/\([0-9]+\)/); d+=substr($0,RSTART+1,RLENGTH-2); e+=split($0,A," · ")} END{print "records",r,"declared",d,"enumerated",e}' "$C"
  -> records 59 declared 926 enumerated 926
```

Per-record declarations equal per-record enumerations at **every one of the 59 records** (no MISMATCH line emitted), the sum is the canonical §3 TOTAL, and the extracted `(record, id)` pairs number **926** over **665 distinct id tokens** — a record-qualified roster, as canonical §0.1 requires.

### 1.1 · The booking, tested as a byte-comparison and nothing else

`§X.1-v5` item 4 claims the register **is** the transcription of the canonical §2 `F.W3` roster. Tested, not read:

```
⟨cmd⟩ awk 'NR>=4872 && NR<=4932 && /^- \*\*fr-/' conformance/CENSUS-CANONICAL.md > canon.txt   # 59 lines
      awk 'NR>=708  && NR<=775  && /^- \*\*fr-/' waves/F-W3.md                > register.txt  # 59 lines
      diff canon.txt register.txt
  -> (no output; exit 0)
```

**BYTE-IDENTICAL, all 59 lines.** Not a summary, not a re-spelling, not a subset. Run in the gate's own declared form:

```
⟨cmd⟩ comm -3 <(sort canon.txt) <(sort register.txt) | wc -l
  -> 0        # both columns EMPTY = g19's round-4 GREEN is REACHABLE at the current bytes
```

| discharge | count |
|---|---|
| **BOOKED by name** in `§X.1-v5` item 4 | **926** |
| **CITED** to a canonical holder (roster ids not booked) | **0** |
| **ESCAPED** (in neither booking nor citation) | **0** |
| **FABRICATED** (booked but not homed at F.W3 by the canonical) | **0** |

### 1.2 · The zero-row records — the claim a partition cannot make

`4a` names seven records that book nothing. Re-derived from the canonical, not from the spec:

```
⟨cmd⟩ comm -23 <all 66 §1 record names> <the 59 register names>
  -> fr-AdminAuditLog · fr-AppHeader · fr-BasisCanvas · fr-ContourEditorCanvas
     fr-EquationResult · fr-FourierMorphSvg · fr-GalleryAdminBanner
```

**Exactly the seven named, in the order named.** 59 + 7 = 66. The cure for PASS-4 D-2 holds: `fr-EasingPicker` (12), `fr-CanvasControlsDock` (1 · `R3-7a`) and `fr-PaperSidebar` (1 · `L-8`) are in the register; `fr-AppHeader` is on the zero-list and was never an F-W3 debt.

### 1.3 · The §2 heads that fall outside the register — probed, and every one lawful

The g19 (←) NO-FABRICATION direction requires each §2 cure row to trace to a canonical row of the record it names **or be marked a citation**. Extracting all 90 §2 head pairs and differencing against the roster leaves nine substantive heads outside it. **Every one resolves to a canonical row homed elsewhere with an explicit F.W3 LEG, or to TERMINAL:**

| §2 head | canonical row | reading |
|---|---|---|
| `fr-AdminFlaggedPanel FR-AFP-61` | `` `F.W1` <sub>legs: F.W3</sub> `` | leg cure carried here, identity at F.W1 |
| `fr-CanvasOverlayButton FR-COB-3` / `FR-COB-15` | `` `F.W0` <sub>legs: F.W3/W4</sub> `` | identity at F.W0 |
| `fr-FourierMorphDemo FMD-12` | `` `F.W1` <sub>legs: F.W3</sub> `` | row names F.W1's grep explicitly |
| `fr-GalleryInfiniteGrid FR-GIG-5` | `` `F.W1` <sub>legs: SS-1</sub> `` | row is an explicit **credit lock** naming F.W1 |
| `fr-GalleryFeaturedCarousel FR-GFC-7` | `` `F.W0` <sub>legs: F.W3/W4</sub> `` | identity at F.W0 |
| `fr-GalleryAdminBanner GAB-13` | `` `F.W1` <sub>legs: F.W3, F.W0</sub> `` | the g18 substrate witness |
| `fr-GlassTimeline PD-1` | `` `F.W1` <sub>legs: F.W3, GLASS-RELAY</sub> `` | row states *"F.W3 consumes its verdict"* |
| `fr-PathPreview PP-DEAD` | **TERMINAL (∅)** | census fact, not a wave debt |

`PP-CLOSE` and `PP-STROKE`, the two remaining compound-head members, exist in the canonical **and** in `fr-PathPreview.md`'s bytes (3 and 4 occurrences). **Zero fabrications.** The one spelling hazard this probe surfaced is filed at §3 D-3.

### 1.4 · Canonical spot-audit — 5 records against the adjudicated bytes (a canonical error is filed against the canonical)

Per the census law, the canonical is audited, not assumed:

| record | §1 declared | §1 table rows | F.W3-homed in §1 | §2 roster count | verdict |
|---|---|---|---|---|---|
| `fr-CanvasControlsDock` | 65 | **65** | 1 | 1 | **OK** |
| `fr-ConvergenceTimeline` | 53 | **53** | 13 | 13 | **OK** |
| `fr-EqCoefficientsPanel` | 51 | **51** | 10 | 10 | **OK** |
| `fr-SpeedSelect` | 49 | **49** | 1 | 1 | **OK** |
| `fr-FourierMorphDemo` | 54 | **54** | 1 | 1 | **OK** |

Every F.W3-homed id in all five records is present in its record's bytes (**26 of 26 checked, 0 missing**). Three derivations were then walked to the byte and the §0.1 rules re-applied by hand:

- `` | `SS-C-9` | `SS-L-11` | `F.W3` | **F.W3** | `` ⟷ `fr-SpeedSelect.md:71` `| SS-C-9 / SS-L-11 (div tooltip anchor) | … | F.W3 |` — **left-token rule correctly applied**, `/`-joined alias not promoted.
- `` | `R3-7a` | — | `F.W3` | **F.W3** | `` ⟷ `fr-CanvasControlsDock.md:149` `- **R3-7a** (intake, CARRY→F.W3)`. The id also books at `fr-AnimationControls` (canonical `:482`) — **two records, two rows, one home each**, exactly as §0.1's ONE-HOME-PER-ID clause requires.
- `` | `FMD-32` | `C-12` · `i-5` · `L-24` | `F.W3` | **F.W3** | `` ⟷ `fr-FourierMorphDemo.md:79` `| **FMD-32 · C-12 ⊕ i-5 ⊕ L-24** | …` — banked head + three aliases, transcribed exactly.

**No defect is filed against `CENSUS-CANONICAL.md`.** On this sample it is self-consistent (§1 ⟷ §2 ⟷ §3) and true to the frozen bytes.

---

## §2 — AXIS 2 · RECEIPT REALITY — **31 samples re-run across 24 sites; 2 CONVICTED**

**Portability, scanned first (R4-2.5, convict on sight):**

```
⟨cmd⟩ grep -noE 'grep [^`|]*-[a-zA-Z]*P[a-zA-Z]*[ `]|\\K|\(\?[=!<]' waves/F-W3.md   -> 412:(?<  412:(?!   [see D-4]
⟨cmd⟩ grep -noE '\.\{[0-9]+,[0-9]{3,}\}' waves/F-W3.md                              -> ∅, exit 1
```

**ZERO `-P` flags. ZERO `\K`. ZERO bounded wildcards above the BSD 255 limit in any shell ⟨cmd⟩.** Every declared variable (`R`, `V`, `C`, `S`) resolves to an in-block assignment (R4-2.3 satisfied). The two lookaround hits are a Python detector's regex inside the ⌧ struck-history region — filed LOW at D-4, not convicted under R4-2.1.

### 2.1 · The 29 that reproduced

| # | site | command (abridged) | published | re-run |
|---|---|---|---|---|
| S1 | `:15` | `grep -F '\| F-W3 \|' PASS-4/RULINGS-4.md` | the duty row | **exact** |
| S1b | `:15` | `shasum` RULINGS-4 | `c899cdc2baad` | **`c899cdc2baad`** ✓ |
| S2 | `:19`/`:707`/`:412` | the canonical self-check `awk` | `records 59 declared 926 enumerated 926` | **exact** |
| S3 | `:36` | `ls …/carry/` | `F-W1-CARRY.md` `F-W4-CARRY.md` | **exact** |
| S4a–d | `:78` | 4 alias-idiom greps over the frozen corpus | `71:` · `42:` · `82:` · 5 lines `10·62·90·106·137` | **all exact**, incl. the disclosed elision |
| S5 | `:91` | `grep -n 'D-m10' fr-DarkModeToggle.md` | `96:\| **N-10 · D-m9/D-m10** \| …` | **exact** |
| S6 | `:142`/`:148` | `grep -n 'live at' fr-NotationPills.md`; `sed -n '23p'` | two lines `9:` `124:`; the row | **exact**, TWO-line disclosure true |
| S7 | `:229` | `grep -n 'v7.0.0:Slider.vue' fr-GlassTimeline.md` | 3 matches `:11 :46 :106` | **exact**, elision disclosed |
| S8 | `:355` | `grep -c 'structurally cannot honour' fr-ContourSettings.md` | `1` | **1** |
| S9 | `:412` | `grep -nE '^\| \`D/D-(11\|17)\`' canonical` | `1761:` / `1764:` rows | **exact**, both `<sub>legs: F.W4</sub>` |
| S10 | `:412` | `grep -rhoE 'F\.W[0-9]+[–-]W[0-9]+' \| sort \| uniq -c` | `120 F.W5-W8` · `72 F.W5–W8` | **exact** |
| S11 | `:412` | `grep -lE '^- [*]{2}M-2[^0-9A-Za-z-]' fr-*.md` | NINE records | **nine, same nine** |
| S12 | `:412` | `sed -n '49p' fr-App.md` | the `M-2` row | **exact** |
| S13 | `:410` | 4 lane-frontend figures + `sed -n '446p'` | `0` · `0` · `1` · `0`; the aggregate line | **all exact** |
| S14 | `:379` | `grep -n '^\| \`PP-NOSHADOW\`' canonical` | the row | **`4343:` … `**F.W3**` legs: F.W1** ✓ |
| **S15** | `:412` | the **R4-1.3 cure**: `grep -noE '[A-Za-z]+ (D:)?M-2[^0-9]' \| awk \| sort -n` | *"exactly FIVE distinct lines"* | **exactly five — 244 · 265 · 309 · 327 · 412**, and the per-row hit pattern (2 · 1 · 2 · 1) matches §C.B/§C.D/§C.G/§C.H's *"twice on its row"* wording precisely. **R4-1.3 DISCHARGED.** |
| S16 | `:794` | `for r in …; do grep -c "^\| \`$r "; done` | `17 · 15 · 24` | **17 · 15 · 24** |
| S17 | `:632`/`:673` | `m-19` set, plain and `-E` boundary-exact | 4 files | **same 4 under both engines** |
| S18 | `:671` | `for t in BC-20 M-β1 M-β3; do grep -c; done` | `4 · 6 · 4` | **4 · 6 · 4** |
| S19 | `:673` | `grep -ho 'shared/CoefficientsSpectrum.vue' \| sort -u` | word-output | **exact** |
| S20 | `:399`/`:419`/`:427` | `grep -h '^### G-1[123] ' F-W0.md`; `grep -h '^## '` | G-11/G-12/G-13; the `## ` list | **exact** |
| **S21** | `:618` | the **R4-1.4 cure**: `grep -rlF 'L-26' waves/ carry/ \| sort` | *"SEVEN files"* + the list | **seven, the same seven, same order.** Control **struck**, not re-pasted. **R4-1.4 / R4-2's F-W3 row DISCHARGED.** |
| S23 | `:559` | `sed -n '35p' fr-NotationPills.md` | the `FR-NP-32` row | **exact**, elision disclosed |
| S24 | `:881` | `grep -c 'paraphrase — drift noted'`; `awk … \| wc -l` | **explicitly not banked** | runs (`21`, `30`); no banked figure to falsify — **R3-3.10 obeyed** |
| S25 | `:402`/`:489` | `grep -rl 'is-active' web/src` | 11 files | **11** |
| S26 | `:404`/`:505` | `grep -rl '<Tooltip' web/src` | 11 files | **11** |
| S27 | `:400` | the **PASS-4 D-8 re-cut** `easing-preview` probes | 2 files ×2; `:37` · `:198` | **exact both arms** |
| S28 | `:528` | `sed -n '344p' PaperView.vue` | `:is-active="isActive"` w/ leading run | **byte-exact incl. indentation** |
| S29 | `:660` | `find` the four/five criterion negatives | the paths | **all five resolve; none in any `.a`–`.e` list** |
| S30 | `:100` | `grep -ho 'The roster is TWELVE limbs[^*]*' F-W1.md` | the charter sentence | **exact** — F.W1 transaction quoted, never re-derived |
| S31 | `:302`/`:308` | `sed -n '93p'`; `grep -ic 'policy' W3-button-ledger.md` | the ledger row; `0` | **exact**; **0** |

Live-tree posture confirmed in the same sweep: `git -C fourier-analysis status --porcelain | wc -l` → **28**, matching g18's GAB-13 witness exactly — the substrate dirt is F.W0's, and **no F.W3 byte touched the product tree**.

### 2.2 · The two that did not — see §3 D-1 and D-2.

---

## §3 — DEFECTS

### D-1 · **HIGH** — `§X.1-v5` item 5's sibling-hash pin for `waves/F-W4.md` is FALSE at the certified settle; R4-8.3's rider fired and its cure never landed

Published at `§X.1-v5` item 5:

> **F.W4's 1014 rows are held at `waves/F-W4.md` + `carry/F-W4-CARRY.md`** (sha256-at-quote-time **`9a6cf2b11fc6`** and `bf1da6fe1e7e`)

Re-run by this seat on the pinned toolchain, at the bytes `CLOSE-CERT-2 §8` certifies:

```
⟨cmd⟩ shasum -a 256 waves/F-W4.md carry/F-W4-CARRY.md | awk '{print substr($1,1,12), $2}'
  -> 39e1a60b3fc9  waves/F-W4.md          <- PUBLISHED 9a6cf2b11fc6.  FALSE.
     bf1da6fe1e7e  carry/F-W4-CARRY.md    <- holds
```

`39e1a60b3fc9…` is also §8's own line for `F-W4.md`, so the two certified artefacts contradict each other inside one round. The cause is mechanical and dated: **`F-W3.md` last written 16:49, `F-W4.md` last written 18:07** — the sibling was re-written 78 minutes *after* F-W3 fingerprinted it. This is precisely the failure LAW E was minted to end and precisely the one `CLOSE-CERT-2 §3` item 1 caught and cured in **F-W0** (*"the rider worked … all six sites are re-pinned"*) — **the identical rider fired in F-W3 and no seat re-pinned it.** F-W3's other three pins are true (`a450b8e9f80e` ×5 for the canonical, `c899cdc2baad` for RULINGS-4, `bf1da6fe1e7e` for the carry), which is why the miss is a miss and not a policy.

**Consequence, stated at its true strength**: the underlying claim — that F.W4's 1014 rows are held at those two files — is *sound* (`F-W4.md` §2.X.2 books `F.W4 = 1014 rows across 54 records` from the same canonical). What is false is the **fingerprint**, and a false fingerprint is worse than an absent one: a downstream seat verifying F-W4 against `9a6cf2b11fc6` concludes the file was tampered with. g19's own FAIL clause makes hash discipline gate-critical (*"FAIL also if the transcript quotes a canonical figure without the sha256-at-quote-time prefix … the F-W8 `167` class reborn"*).

**Receipt of the certificate's error**: `CLOSE-CERT-2 §4` records F-W3 as *"82…84 ⟨cmd⟩ operands re-run · **0** convictions · **CLEAN**"*. It is false by two (this defect and D-2). Per E-3 the cert body is not edited; this row is the correction of record.

**Cure**: re-pin to `39e1a60b3fc9` **after** the round-5 purge seat's final byte, or — better, because F-W4 will move again — replace the fingerprint with the R4-8.3-compliant alternative the same file already uses successfully elsewhere: a **word-output anchor probe** (`grep -c '^### §2.X.2' waves/F-W4.md` → `1`), which survives the next edit of the file it describes. This wave struck its own `L-26` control at `:618` for exactly this reason and wrote the finding down — *"no receipt form survives when the operand is a live sibling"* — then left this one standing four sections earlier.

---

### D-2 · **MEDIUM** — §7's set-receipt is FALSE AT WRITE: the command returns THREE files, the paste names TWO and asserts "NOTHING ELSE"

Published at `:559`:

> ⟨cmd⟩ this seat, 2026-08-28: `grep -rl 'RED BY CONSTRUCTION at the installed' ../conformance/ ../../../V/megatranche/registry/adjudicated/` → `conformance/PASS-3/F-W3-CHECK.md` · `conformance/PASS-1/RULINGS.md` — **a check file and a rulings file, and NOTHING ELSE; the sentence is absent from all 66 corpus records**

Re-run verbatim from the base the receipt states (`waves/`):

```
⟨cmd⟩ grep -rl 'RED BY CONSTRUCTION at the installed' ../conformance/ ../../../V/megatranche/registry/adjudicated/
  -> ../conformance/PASS-3/F-W3-CHECK.md
     ../conformance/PASS-4/F-W3-CHECK.md      <- NOT IN THE PASTE
     ../conformance/PASS-1/RULINGS.md
```

**Not merely stale — false when it was written.** `PASS-4/F-W3-CHECK.md` was created **15:21** on 2026-08-29; `F-W3.md` was last written **16:49**, 88 minutes later. The round-4 seat edited this file with the third member already on disk and re-published a two-member universal.

This is the **R4-1.9 class verbatim** — the ruling that struck F-W7 §0 item 7's universal and made the law: *"An attestation-of-sweep must list its residue or not exist."* A `-rl` over `conformance/` is a sweep of a directory that grows by one check file per wave per round; **"NOTHING ELSE" is unwarrantable there by construction**, and the F-W3 seat's own §Y states the governing rule three sections later: receipts over live trees state *classifications, set-membership, or `grep -o` word-output*.

**What survives**: the load-bearing half. All three members are still a check file or a rulings file, so the reading the cell actually needs — *"both homes are non-quotable authority by name"* — is unaffected, and the corpus-absence half (`the sentence is absent from all 66 corpus records`) reproduces exactly. **Secondary drift in the same paste**: the printed members drop the `../` prefix the stated base produces, and are reordered (`grep` returns PASS-3 · PASS-4 · PASS-1).

**Cure**: strike the enumeration and the universal; restate as the class claim the cell needs — *"every home of this sentence is a check file or a rulings file, both non-quotable by name (R2-1-LAW 3 / R3-4); the sentence is absent from all 66 corpus records"* — with the corpus-absence arm alone carrying a ⟨cmd⟩, since that operand is FROZEN.

---

### D-3 · **LOW** — §2's compound cure heads spell `/` as a ROW separator, colliding with the operand's ALIAS semantics in the one file that declares that operand supreme

`:378` heads a cure row `- **fr-PathPreview PP-DEAD / PP-SHAPE / PP-CLOSE / PP-STROKE / PP-LEN / PP-A11Y / PP-NOSHADOW**`. Read through canonical §0.1's ALIAS clause — *"`=` `/` `·` `⊕` `∘` `+` `,` standing between two already id-shaped tokens: the left one is the banked id, the rest are aliases"* — that head banks `PP-DEAD` with six aliases. **Four of the six (`PP-SHAPE` · `PP-LEN` · `PP-A11Y` · `PP-NOSHADOW`) are standalone F.W3 identities in this file's own register**, and `PP-DEAD` is TERMINAL (∅).

**No booking error** — `§X.1-v5` item 5 makes the register the sole identity roster and every §2 spelling a citation, and this seat verified all seven ids exist in the canonical and in `fr-PathPreview.md`'s bytes. The defect is **legibility under the operand's own rule**: `§0` declares the canonical's derivation rules binding on this file, then §2 uses one of its separators with the opposite meaning. A pass-6 seat atomising §2 with §0.1 in hand gets the wrong answer, which is the exact confusion the QUALIFIER/ALIAS ruling was minted to end.

**Cure**: one clause at §2's head declaring the compound-head `/` a ROW separator in cure-cluster heads (canonical §0.1 already licenses a third reading — *"ROW-SEPARATOR — ` · ` at the TOP level of a class-label list line separates rows, not aliases"* — so this is an adoption, not a new rule), or re-spell the compound heads with the ` · ` form §0.1 already reserves.

---

### D-4 · **LOW** — PCRE lookaround survives in the g19 cell, inside the region a pass-6 sight-scan will hit

`:412` carries `boundary-exact `(?<![A-Za-z0-9-])ID(?![A-Za-z0-9-])` thereafter`. **Not convicted under R4-2.1**: it sits inside the `⌧ EVERYTHING FROM HERE TO THE END OF THIS CELL IS ROUND-1→3 HISTORY` region with no gate weight, and it describes the boundary test of a **Python** detector (`census.py` / `x1v4.py`), not a shell ⟨cmd⟩ — the pinned toolchain never sees it.

Filed anyway because **R4-2.5 is written to be applied without charity** (*"convicts it ON SIGHT as unrunnable machinery — no charitable reading, no 'intent was clear'"*), and the next seat scanning for `(?<` hits this and must re-derive the exemption from scratch, as this seat did.

**Cure**: one parenthetical at the phrase — `(Python-regex form; the detector was python3, never the pinned shell)` — which costs nothing and closes the axis permanently.

---

## §4 — AXIS 3 · M-25 DEPTH — **CLEAN**

M-25 requires agglomeration with cure-shape locks and sequencing edicts carried, routed by mechanism; **transcription-only is DEFECTIVE**.

- **§2 carries 90 mechanism-clustered cure rows** across §C.A–§C.K, every head keyed on a **banked id qualified by its record** (`fr-<Record> <ID>`), never on an alias and never on a local re-number.
- **42 of the 90 heads carry `⊕`-joined co-routed ids beside the head** — the alias-beside-head idiom read forward, exactly as §0's ALIAS AXIS block derives it from the corpus (`**<banked id> = <reading-axis alias> — GRADE.**`, receipts S4a–S4d).
- **16 explicit locks** (Cure lock · Channel lock · Order lock · ADOPTION-ROUTE LOCK · WAVE-LOCK · CREDIT LOCK), **24 anti-cure statements**, **26 preserved DISSENTs**, **11 GLASS-RELAY items**. Worked example at `:228`: `fr-AnimationControls L-1 (⊕ L-6)` carries three stacked locks and names the value.js precedent as *pattern, NEVER re-booked* — the anti-rename law applied to a cross-repo borrow.
- **The register is not the spec.** `§X.1-v5` item 7 refuses to transcribe 926 cure rows into §2 and says why — *"a register of identities is not a register of cures"* — landing the cure shape at the unit's own row, at the unit's open, from the record's own routing cell. **That is the correct reading of M-25**, not a dodge: the 926 is an identity roster (booking), the 90 are mechanisms (agglomeration), and the file carries both.
- **Aliases beside heads, never promoted**: verified at the operand in §1.4 (`SS-C-9`/`SS-L-11`, `FMD-32`/`C-12 ⊕ i-5 ⊕ L-24`) and at the spec in §1.3 (the `D/D-12` · `D/D-13` · `D/D-18` family carried beside `D/D-11` and `D/D-17`, receipt S9).

---

## §5 — AXIS 4 · GATES — **CLEAN**

- **Canonical operands only.** `CENSUS-CANONICAL.md` is named at 13 sites and is the roster/denominator operand at every one. Three check-file names appear (`PASS-1/RULINGS.md`, `PASS-1/F-W3-CHECK.md`, `PASS-2/F-W3-CHECK.md`, `PASS-3/F-W3-CHECK.md`) — **each at a strike, a demotion, or a non-quotable-authority disclosure**, none as an operand: `:51`/`:76`/`:897` name `691` as the struck check-file figure; `:563` names PASS-1 §3 as *"the format-blind roster PASS-2 D-1 convicted, and a check file is a measurement, never a quotable operand"*; `:559`/`:888` strike the PASS-1/RULINGS quotation. **R4-3 holds. No denominator anywhere descends from a check file.**
- **§0's CENSUS FREEZE strikes every locally-derived figure AT ITS OWN SITE** — the `317/681/764/903/151`, `317/742/1059/885/174` and `321/6/830/42/1199/1032/167` blocks, the `1,008` FLOOR, the `299→229` / `39→32` spreads and the `59 · 103 · 172/30 · 229/32 · 288 · 427/48 · 844 · 691/62` partition counts, each marked ⌧ where it stands. **This is the cure for PASS-4 D-7's third disposition** and it is applied at the site, not remotely.
- **Reachable GREEN.** g19's round-4 green is a `comm -3` between two enumerations; run by this seat it returns **0 rows in both columns** (§1.1). The gate is not merely stated-reachable — it is **green at the current bytes**, the first time in five passes this wave's closure gate has had a runnable, satisfied form. Its FAIL clause is closed, not rhetorical (any derived/sampled/re-cut LHS fails on sight).
- **Portable commands.** No `-P`, no `\K`, no over-255 bound, every variable in-block (§2's scan). g7's probe was re-cut at round 4 to the token that returns the count (PASS-4 D-8) and both arms reproduce (S27). g12's OR is closed to two measured outcomes with the **R4-6.1 `./easing` cross-package-homonym qualification** landed on its face.
- The one hash-pinned gate operand that is false is D-1, filed above; it is a receipt defect, not an operand-class defect — the operand named is correct.

---

## §6 — AXIS 5 · POSTURE — **CLEAN**

| requirement | state | receipt |
|---|---|---|
| **F.W1 transaction whole** | **HELD** | `:100` quotes F-W1 §4's charter verbatim — *"The roster is TWELVE limbs and stays twelve…"* (S30, exact) — and states *"F.W3 adds nothing to it and subtracts nothing from it … no F.W3 cell may count the limbs for itself (R-4b)."* The extent is cited, never re-derived. |
| **W7 ∅ closed** | **HELD** | `F.W7` occurs 4× in 2 lines, both **declared-not-carried edges** (S-6: *"F.W7's anti-tree KISS guardrail stays inline in F.W7"*, and the same row in the excluded table). **Nothing routes to F.W7**, matching canonical §4.1's corpus-verified ∅. |
| **SS-4 flags** | **HELD** | S-4 cross-edge (`:430`) hands over serializer unification, GCM-10 tier default, like-verb, `ml_threshold`, `ContourStrategy`, with the `basisFilter` **WAVE-LOCK**; `:572` Blocks names `F.W5–W8/SS-4`; `:587` carries SS-4's own owner rulings. SS-13 flagged at 19 sites, SS-6 letter authored by `.f` under g20. |
| **Tree READ-ONLY** | **HELD** | Header: *"`/Users/mkbabb/Programming/fourier-analysis` is READ-ONLY until then."* Verified: `git status --porcelain \| wc -l` → **28**, identical to g18's GAB-13 baseline — F.W0's substrate dirt, untouched by this wave. All product-tree receipts (S25–S29) are reads. |
| **Status `planned`** | **HELD** | `:107` `**Status**: \`planned\`` · `:899` `**Status**: \`planned\``. Both instances, no third. |
| **Zero VERIFIED** | **HELD** | The token occurs 3× — `:116` twice (the four-verb row **VERIFIED / NO / *"stamped only at the sub-tranche release close; no wave stamps VERIFIED at its own close"***) and `:899` (`AUDITED YES · SPECIFIED YES · IMPLEMENTED NO · **VERIFIED NO**`). **No VERIFIED claim anywhere.** |
| **Execution unauthorized** | **HELD** | `begin-word` at 6 sites; OP-1 a standing gate with no begin-word; OP-5 the `FR-NP-32` (≡ `fr-PaperSidebar M1`) corrupt-dist sequencing gate RED, both ids cited and neither substituted (R-8). |

**RULINGS-4 application, directive by directive:**

| directive | disposition |
|---|---|
| **R4-1.3** (g19 *"exactly three places"* → the measured five) | **APPLIED AND TRUE.** S15 returns exactly five distinct lines; the corrected classification is stated by stable anchor (§C.B · §C.D · §C.G · §C.H · this cell), the debut classification re-written from the corrected count, and no per-line count banked. |
| **R4-1.4 / R4-2's F-W3 row** (the L-26 control, dead three generations) | **APPLIED AND TRUE.** The control is **STRUCK** — the disposition the ruling names first — with a live re-run published beside the strike: `grep -rlF 'L-26' waves/ carry/ \| sort` → **seven files, enumerated**; S21 reproduces all seven, same order. The reasoning is generalised into the finding that no receipt form survives a live-sibling operand. |
| **R4-3** (canonical-only operands) | **APPLIED.** §5 above. |
| **R4-6.1** (PP-NOSHADOW's F.W1 rider at its holder F-W3 + the `./easing` qualification on g12) | **APPLIED.** The rider is `:379`, *"BOOKED AS ONE EXPLICIT ROW AT THE HOLDER … a leg is never a new identity"*; the qualification is on g12's face at `:405`, naming the live cross-package homonym and excluding it from the gate's three subpaths. |
| **R4-8.3** (cross-file quotes carry sha256) | **APPLIED, 3 of 4 TRUE.** Canonical `a450b8e9f80e` ×5 ✓ · RULINGS-4 `c899cdc2baad` ✓ · F-W4-CARRY `bf1da6fe1e7e` ✓ · **F-W4.md `9a6cf2b11fc6` FALSE → D-1.** |
| **R4-9.6** (g19 re-cut against §0.1 verbatim; no private separator table) | **APPLIED.** The axis-(iii) separator table is struck as gate machinery by name; the QUALIFIER clause is quoted verbatim (*"exactly as `·` already is"*) and the worked `D/D-11`/`D/D-17` case banked with a reproducing receipt (S9). |
| **R4-10** (book/cite all 926) | **APPLIED AND COMPLETE.** §1 — 926 booked, 0 cited, 0 escaped, 0 fabricated, byte-identical to the operand. |

---

## §7 — WHAT THIS SEAT DID NOT DO, DECLARED

No cure was applied — this file is a check, and the writable set was this path alone. No carry, wave spec, census, ruling or certificate byte was written; the twelve `CLOSE-CERT-2 §8` hashes are unchanged by this seat's work and were re-verified at §0 before and after the sweep. `PASS-4/F-W3-CHECK.md`, `PASS-3/F-W3-CHECK.md` and the PASS-1/2 checks were **read for provenance only and are operands of nothing here** (R3-4 / R4-3); every figure above descends from `CENSUS-CANONICAL.md`, the frozen corpus, or a command this seat ran.

**Sampling disclosed**: 31 receipt re-runs across 24 of the file's 54 ⟨cmd⟩ sites, chosen to cover every round-4 cure site plus the census, corpus, sibling-spec, live-tree and self-referential classes. **The residue is 30 sites, unexamined** — a later seat may find more. Five canonical records of 66 were spot-audited, as the census law directs; **61 are unexamined by this seat**.

---

**VERDICT: DEFECTIVE** — roster **926/926 booked**, 0 cited, **0 escaped**, 0 fabricated; g19 GREEN reachable and green at the bytes; M-25, gates and posture CLEAN; **2 non-reproducing receipts (1 HIGH, 1 MEDIUM) + 2 LOW**. Both convictions are stale-or-false receipts over live siblings, the class this wave itself diagnosed at `:618` and then left standing at `§X.1-v5` item 5 and `§7`. Neither touches the census axis, and neither is repairable by any figure — only by re-running the two commands and pasting what they print.

*— pass-5 F-W3 adversarial seat, X·F, 2026-08-29. Every figure above was produced by a command this seat ran on the pinned toolchain; nothing is inherited from PASS-4.*
