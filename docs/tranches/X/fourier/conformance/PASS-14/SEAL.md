# PASS-14 · SEAL — X·F round 14, the SEAL SEAT's verify-only return

**Seat**: SEAL, X·F round 14 · **2026-08-30** · base `/Users/mkbabb/Programming/value.js`, pinned BSD toolchain.
**Posture**: **VERIFY-ONLY. ZERO edits to any spec, to `CENSUS-CANONICAL.md`, or to `PIN-PURGE-CERT.md`.** This seat wrote exactly one file — this one.
**Operand**: the eleven `waves/F-W*.md` at the round-14 settled bytes, `conformance/CENSUS-CANONICAL.md` **FROZEN at `f44362757458`**, and `conformance/PIN-PURGE-CERT.md` §ERRATA-R14.

⊘ **THIS FILE DECLARES ITS OWN SELF-EXCLUSION, FIRST AND BEFORE ANY COUNT IN IT.** Every enumeration below was measured over `waves/` and `conformance/` **excluding this file's own bytes**, which are **an operand for no gate**. This is the `F-W0:598` clause, adopted deliberately — it is precisely the clause whose absence at `:707` was the defect §ERRATA-R14·a cures, and a seal that verifies that cure without carrying the clause itself would re-commit the error it certifies closed.

---

## §0. VERDICT

| axis | result |
|---|---|
| **Hash re-verification (13 files vs §ERRATA-R14's twelve-row table)** | **GREEN — byte-identical, 12/12** |
| **Canonical freeze** | **GREEN — `f44362757458`, SIXTH consecutive round** |
| **`F-W3:780` cure (D14-1, the round's blocking MEDIUM)** | **GREEN — cured, re-derived independently** |
| **`F-W7:58` / `:62` cure (D14-2 ⊕ D14-4)** | **GREEN — third-column truth and count-word both hold** |
| **`:707` sweep, §ERRATA-R14·a restated enumeration** | **GREEN — 13, row-for-row** |
| **§ERRATA-R14·b instrument `R14-I2`** | **GREEN — reproduces in both states** |
| **Comparator A ⊕ B across all 11 specs** | **GREEN — ZERO surviving members (measured, not assumed)** |
| **Receipts re-run (52 total, double-run)** | **GREEN — every one byte-exact** |
| **LANDED-WRONG findings** | **ZERO** |

**`comparatorMembers` = 0. This seat MEASURED zero; it did not assume zero.** The instrument surfaced **fifteen** read-whole candidates under this seat's own tightened tuning, and **all fifteen are adjudicated on their face at §6.2** — the count is zero *after* adjudication, and the fifteen are enumerated so a successor can re-adjudicate rather than re-trust.

---

## §1. Hash re-verification — 13 files, byte-identical to §ERRATA-R14

Re-hashed independently as this seat's **first act**, before any other measurement, and re-taken as its **last** (§9). Every one of §ERRATA-R14's twelve rows resolves byte-identical at the first-12 prefix, in both directions.

| # | file | §ERRATA-R14 row | this seat re-measured | ✓ |
|---|---|---|---|---|
| 1 | `waves/F-W0.md` | `3d62e5f4e78b` | `3d62e5f4e78b` | ✓ |
| 2 | `waves/F-W1.md` | `ab2437af09e0` | `ab2437af09e0` | ✓ |
| 3 | `waves/F-W2.md` | `0b967619bb35` | `0b967619bb35` | ✓ |
| 4 | `waves/F-W3.md` | **`025db038cc44`** *(moved)* | `025db038cc44` | ✓ |
| 5 | `waves/F-W4.md` | `2fb6e6d637bb` | `2fb6e6d637bb` | ✓ |
| 6 | `waves/F-W5.md` | `26aebcdc7bac` | `26aebcdc7bac` | ✓ |
| 7 | `waves/F-W6.md` | `e83dcad051f5` | `e83dcad051f5` | ✓ |
| 8 | `waves/F-W7.md` | **`b5247b852f46`** *(moved)* | `b5247b852f46` | ✓ |
| 9 | `waves/F-W8.md` | `d8237cf6b11e` | `d8237cf6b11e` | ✓ |
| 10 | `waves/F-W9.md` | `b265bf677869` | `b265bf677869` | ✓ |
| 11 | `waves/F-W10.md` | `8ae0ad8fa623` | `8ae0ad8fa623` | ✓ |
| 12 | `conformance/CENSUS-CANONICAL.md` | **`f44362757458`** *(FROZEN)* | `f44362757458` | ✓ |

⊙ **The canonical is FROZEN at `f44362757458` for a SIXTH consecutive round of repair**, and the certificate's claim to that effect is TRUE at these bytes. ⊙ **TWO moved, TEN unmoved**, exactly as §ERRATA-R14·e states.

⊘ **No stale pin propagates.** ⟨cmd⟩ `/usr/bin/grep -rn 'be86ae410118\|ba9be3e37613' waves/` → **∅ (exit 1)**. Neither superseded digest is pinned literally in any of the eleven. ⊙ And the live pin is carried by **all eleven**: ⟨cmd⟩ `/usr/bin/grep -c 'f44362757458' waves/F-W*.md` → **5 · 13 · 2 · 6 · 9 · 4 · 5 · 4 · 2 · 6 · 3** (glob order).

▲ **One reconciliation recorded, and it is NOT a defect.** §ERRATA-R12 published this same occurrence vector as *"4 · 13 · 2 · 6 · 9 · 4 · 5 · 4 · 2 · 6 · 3"* — `F-W0` at **4**, where this seat measures **5**. The delta is **one line and it is accounted**: §ERRATA-R13·b row 1 appended the `R11-6` addendum to `F-W0.md` at end-of-file **after** §ERRATA-R12 was written, and that addendum cites the canonical `f44362757458` once. §ERRATA-R12's vector is dated round-12 history under `E-3` and is correct **of its own bytes**; it is not patched and must not be.

---

## §2. `F-W3:780` — the round's blocking cure, re-derived from scratch

The certificate's arithmetic was **not adopted**. This seat re-opened the canonical and re-summed the five criterion-negatives' own §1 headers independently.

⟨cmd⟩ `/usr/bin/awk 'NR==768||NR==1265||NR==2133||NR==2462||NR==2753' conformance/CENSUS-CANONICAL.md`

| canonical line | record | declared §1 magnitude |
|---|---|---|
| `:768` | `fr-BasisCanvas` | **79 rows** |
| `:1265` | `fr-ContourEditorCanvas` | **73 rows** |
| `:2133` | `fr-EquationResult` | **46 rows** |
| `:2462` | `fr-FourierMorphSvg` | **32 rows** *(errata round 6: read 33; 1 phantom row struck at E6-1/E6-4)* |
| `:2753` | `fr-GalleryAdminBanner` | **52 rows** |

⊙ **`79 ⊕ 73 ⊕ 46 ⊕ 32 ⊕ 52 = 282`** ✓ — re-derived by this seat, left-to-right: `79+73=152` · `+46=198` · `+32=230` · `+52=**282**`.
⊙ **The superseded reading likewise re-derives**: `79 ⊕ 73 ⊕ 46 ⊕ 52 ⊕ 33 = **283**` before `E6-1` ✓ — `79+73=152` · `+46=198` · `+52=250` · `+33=**283**`. Both of §ERRATA-R14·e row 4's sums are TRUE.
⊙ **The operand agrees in two independent places**: canonical `:5496` reads `carry **282 rows**`, and erratum `E6-5` at `:182` rules *"§4.2 289 → **282**"* — a six-row overstatement inherited from a pre-errata-round-5 sum.

### 2.1 The cured line, at the bytes

⟨cmd⟩ `/usr/bin/awk 'NR==780' waves/F-W3.md`

| receipt | measured | ✓ |
|---|---|---|
| line reads `carry 282 rows` (**unbolded**, per the recorded anchor drift) | **1 match** | ✓ |
| chase tokens present — `errata` · `chased` · `E6-5` · `282` · `repair round` | **all five** | ✓ |
| stale `'289 rows'` anywhere on the line | **0** | ✓ |

⊙ **The chase is byte-identical to the text §ERRATA-R14·e row 4 publishes**, token for token, and is written in the corpus's own idiom (`F-W5:347` · `F-W3:416` · `F-W3:703`).

⊘ **ANCHOR DRIFT CONFIRMED AS THE CERTIFICATE RECORDED IT.** `PASS-14/CHECK-RETURN.json` and the repair charge both quote the numeral **bolded**; the true bytes carry it **unbolded**, before and after. The cure was applied at the true bytes. **The certificate disclosed this rather than smoothing it, and this seat confirms the disclosure is accurate.**

### 2.2 The chase did not disturb the line's substantive function — re-run whole

The sentence's job is to enumerate the seven records that book nothing at F.W3. Re-derived independently by this seat:

⟨cmd⟩ `/usr/bin/grep -c '^### fr-' conformance/CENSUS-CANONICAL.md` → **66**
⟨cmd⟩ `/usr/bin/awk 'NR>=720 && NR<=778 && /^- \*\*fr-/' waves/F-W3.md | /usr/bin/grep -oE 'fr-[A-Za-z]+' | sort -u | wc -l` → **59**
⟨cmd⟩ `comm -23` (canonical ∖ roster) → **7**, in this order:

`fr-AdminAuditLog` · `fr-AppHeader` · `fr-BasisCanvas` · `fr-ContourEditorCanvas` · `fr-EquationResult` · `fr-FourierMorphSvg` · `fr-GalleryAdminBanner`

**The same seven, in the same order as the line and as §ERRATA-R14·e row 4.** ⊙ **And the containment is proved in the other direction too, which no prior instrument published**: ⟨cmd⟩ `comm -13` (roster ∖ canonical) → **∅**. The F.W3 roster is a strict subset of the census — `66 − 59 = 7` is therefore a real difference and not a coincidence of two equal-sized symmetric differences.

---

## §3. `F-W7:58` and `:62` — third-column truth and the count-word

### 3.1 `:58` — the `../COHESION.md` row

⟨cmd⟩ `shasum -a 256 docs/tranches/X/COHESION.md` → **`956e71a83e321d4f…`**

| receipt | measured | ✓ |
|---|---|---|
| `COHESION.md` has moved off `91c6d974db9b` | → **`956e71a83e32`** | ✓ |
| `:58` third column now reads **YES** with the re-measurement | present | ✓ |
| `:58` digest column left standing at quote-time `91c6d974db9b` | untouched | ✓ |

⊙ **The digest column was correctly NOT cured.** Its own header scopes it to *"sha256-**at-quote-time**"*, which is the licensed `E-3` history class. **The defect was the third column's affirmative present-tense `no`, and that alone moved.** This seat confirms the distinction was drawn correctly.

⊙ **Blast radius re-measured, not assumed.** All three spans `F-W7` quotes from the moved `COHESION.md` reproduce at the moved bytes — one occurrence each, in both files:

| span | in `COHESION.md` | in `F-W7.md` |
|---|---|---|
| `Cross-repo edges are declared FROM BOTH ENDS` | 1 | 1 |
| `the value-side atomdiff restoration` | 1 | 1 |
| `Every census wave-sketch id` | 1 | 1 |

### 3.2 `:62` — the `⌧` minute's count-word

⊘ **ANCHOR DRIFT CONFIRMED, exactly as §ERRATA-R14·e row 8 recorded it.** The register places the minute at `:60`; at the true bytes **`:60` is the canonical's pin row and the minute is at `:62`**. The cure was applied at the true bytes. This seat verified the minute at `:62`.

**The count-word is re-derived against the table's own ten rows** (`:51`–`:60`), not adopted:

| row | file | third column | was `"no"`, now false? |
|---|---|---|---|
| `:51` | `waves/F-W0.md` | yes | — |
| `:52` | `waves/F-W1.md` | yes, twice | — |
| `:53` | `waves/F-W3.md` | YES — *no* **SUPERSEDED by the certificate at round 6** | *(superseded, not a residue — post-dates the minute)* |
| `:54` | `waves/F-W5.md` | yes, three times | — |
| `:55` | `waves/F-W6.md` | yes, three times | — |
| `:56` | `waves/F-W8.md` | yes | — |
| `:57` | `waves/F-W10.md` | yes, three times | — |
| `:58` | `../COHESION.md` | **YES** — cured at round 14 | **①** |
| `:59` | `../keyframes/waves/KF-W1.md` | **YES** — cured at round 5 | **②** |
| `:60` | `conformance/CENSUS-CANONICAL.md` | YES — errata rounds 5 AND 6 | — |

⊙ **TWO, not one.** ✓ The struck-not-rewritten form `~~ONE "no" NOW FALSE~~ → TWO "no"s NOW FALSE` is correct at the settled bytes, and the round-5 reading is preserved rather than overwritten — the right discipline.
⊙ **`KF-W1.md` = `919e484b8a60`** ✓, matching `:59`'s cell.
⊙ **The `§0(C)` table is TEN rows** ✓ and every row resolves to a file in tree.

▲ **ONE OBSERVATION FOR THE NEXT SEAT, recorded so it is not mistaken for a defect later.** The minute also carries *"FIVE STALE"*, which §ERRATA-R14·e row 8 leaves standing as correct. A hostile reader counting **column-2 strikethroughs** finds **SIX** (`F-W0` · `F-W1` · `F-W5` · `F-W6` · `KF-W1` · the census) and may read that as falsifying *"FIVE"*. **It does not.** The minute's own prose partitions the two classes in terms — *"F-W0, F-W1, F-W5, F-W6 and the census had all moved by the pass-5 settle, **and** `KF-W1.md`'s cell asserted "no" …"* — placing `KF-W1` in the `"no"` bucket, not the stale-pin bucket. **The count-word is sound under the minute's own definitions. Recorded, adjudicated LAWFUL, and not filed.**

---

## §4. The `:707` sweep, re-run verbatim

⟨cmd⟩ `/usr/bin/grep -rn '289 rows' waves/ conformance/` — **run exactly as `:707` publishes it**, from the base `docs/tranches/X/fourier`.

⊙ **Raw return: EIGHTEEN lines.** ⊙ **Under §ERRATA-R14's declared-first self-exclusion clause (`:758`), which removes the erratum's own bytes (`PIN-PURGE-CERT.md` `≥:756`): THIRTEEN.**

| # | hit | in §ERRATA-R14·a's table? | scope |
|---|---|---|---|
| 1 | `waves/F-W0.md:598` | ✓ row 1 | counted |
| 2 | `conformance/CENSUS-CANONICAL.md:182` | ✓ row 2 | counted |
| 3 | `conformance/PIN-PURGE-CERT.md:707` | ✓ row 3 | counted |
| — | `PIN-PURGE-CERT.md` `:762` `:764` `:766` `:770` `:827` | — | **EXCLUDED — §ERRATA-R14's own bytes** |
| 4–7 | `conformance/PASS-13/SEAL.md` `:120` `:132` `:134` `:143` | ✓ rows 4–7 | counted |
| 8–10 | `conformance/PASS-14/CHECK-RETURN.json` `:6` `:15` `:16` | ✓ rows 8–10 | counted |
| 11–13 | `conformance/PASS-14/CHECK.md` `:128` `:232` `:382` | ✓ rows 11–13 | counted |

⊙ **THIRTEEN, and §ERRATA-R14·a's restated enumeration matches ROW FOR ROW — every address, every file, in the same grouping.** ✓
⊙ **`waves/F-W3.md:780` IS NOT AMONG THEM.** ✓ The cure removed it from the sweep, exactly as ¶766 claims.
⊙ **`F-W0.md:598` is the ONLY `'289 rows'` left anywhere in `waves/`** ✓ — the pattern has left the corpus of eleven specs but for that one lawful, self-excluded addendum.
⊙ **ZERO of the thirteen is a corpus defect**, as §ERRATA-R14·a rules: one frozen canonical ruling, one lawful self-excluded addendum, eleven self-matches of the quoted pattern inside dated instruments.

▲ **STRUCTURAL NOTE FOR ROUND 15 — not a defect, a property.** This sweep's raw return **grows monotonically with every instrument that quotes it**, because the pattern matches its own publication. Round 13 measured 4, round 14's check measured 8, this seat measures 18 raw / 13 scoped. **The number is only meaningful with a declared scope**, which is why §ERRATA-R14 declares one at `:758` before any count — and why this seal declares one at its head. **A successor that publishes a bare figure here re-creates `:707`'s defect a third time.**

---

## §5. §ERRATA-R14·b's instrument `R14-I2`, re-run in both states

⊙ **The two-state operand was recovered, not assumed.** ⟨cmd⟩ `git show babc83ad^:docs/tranches/X/fourier/waves/F-W5.md` → **`40bcad59cd2beed4…`**, byte-identical to §ERRATA-R13·b row 6's own *"old"* digest. ✓ **Both states of the round-13 cure are measurable, so the invariance claim is testable rather than rhetorical.**

**`R14-I2`, run exactly as published:**

| state | digest | total | distinct | register lines | line count |
|---|---|---|---|---|---|
| pre-cure `F-W5.md` | `40bcad59cd2b` | **172** | **132** | **93** | **433** |
| post-cure `F-W5.md`, settled | `26aebcdc7bac` | **172** | **132** | **93** | **433** |

⊙ **INVARIANT in all four columns — `172 → 172`, `132 → 132`, `93 → 93`, `433 → 433`.** ✓ Every figure §ERRATA-R14·b publishes reproduces exactly at this seat's independent run.

⊙ **AND THE FRAGILITY EXHIBIT REPRODUCES TOO, which is the more important half.** The *unanchored* spelling of the same idea returns **337 → 338** (distinct **289 → 290**) across the identical cure — a `+1` manufactured purely by backtick re-pairing around the two pairs the cure adds. ✓ Exactly the numerals ¶801 publishes. **This is the certificate's own case that `108/101` was never a well-defined count, and it holds: the anchored spelling is invariant, the unanchored one is not.** The certificate was right to publish the command instead of the number.

---

## §6. The comparators, across all eleven specs at settled bytes

Built independently by this seat per §ERRATA-R13·c's method note. **The superseded set was derived MECHANICALLY from the canonical's own `read **N**` / `N → **M**` errata prose** — 36 numerals — and never transcribed from any instrument.

### 6.1 Instrument B — the four-form wave-magnitude comparator

Forms: `F.W<k> (N)` · `F.W<k> …is/of/reads N rows` · `N-row F.W<k>` · `the N F.W<k> rows`, compared against the canonical's own per-wave §2 headings (`F.W0` 55 · `F.W1` 330 · `F.W2` 23 · `F.W3` 919 · `F.W4` 1007 · `F.W5` 27 · `F.W5-W8` 89 · `F.W9` 16, all mechanically extracted).

⊙ **3 pairs captured · 0 chased mismatches · ZERO UNCHASED MISMATCHES.** ✓
**This reproduces §ERRATA-R13·c's instrument (B) figure — *"3 pairs · ZERO unchased mismatches"* — exactly.**

### 6.2 Instrument A — census-attributed context binding

Every `\d{2,}` bound to a census noun (`N rows` / `N records` / `roster of N` / `N-row`) on a line carrying census attribution (`canonical|census|roster|operand|§2|§3|§4.2|§4.3|censused`), across all eleven specs.

| tuning | hits | on-line chased | read whole |
|---|---|---|---|
| loose (runs 1/2 vocabulary, `R\d+-\d` admitted) | 66 | 55 | **11** |
| **tightened** (run 3 vocabulary, `R\d+-\d` dropped) | 66 | 51 | **15** |

⊘ **These tallies are a FOURTH reading, and they differ from all three on record (`48/41/7` · `49/42/7` · `54/39/15`) — which is exactly what §ERRATA-R14·c predicts and reconciles.** This seat's superseded set is broader (36 numerals, including per-record `read N` prose), so it captures more. **§ERRATA-R14·c's thesis — that this comparator's TALLY is tuning-dependent while its ADJUDICATED OUTCOME is not — is confirmed by a fourth independent instrument.** That is a stronger result than agreement on the numbers would have been.

**ALL FIFTEEN read-whole candidates adjudicated on their face. Every one ACQUITS:**

| # | site | numeral | adjudication |
|---|---|---|---|
| 1 | `F-W0:114` | 28 | **ACQUIT** — the 28 dirty tree paths, derived on-line as `27 ` M` + 1 `??``, enumerated item-for-item. Not a census magnitude. |
| 2 | `F-W0:581` | 1014 | **ACQUIT** — the dated `R11-3` minute *convicting* `F-W7:291`. Lawful `E-3` history; it reports the defect, it does not assert the magnitude. |
| 3 | `F-W2:16` | 25 | **ACQUIT** — a live detector receipt (*"68 occurrences / 57 lines / 25 records"*) in `registry/adjudicated/`, not the `NWO→SS-3` magnitude that put 25 in the superseded set. |
| 4 | `F-W2:34` | 25 | **ACQUIT** — this line **is** the chase: *"EVERY CENSUS FIGURE ABOVE THIS PARAGRAPH IS SUPERSEDED…"*. Self-declaring. |
| 5 | `F-W2:346` | 29 | **ACQUIT** — a byte-true record quotation, re-run. Already acquitted at §ERRATA-R13·c. |
| 6 | `F-W2:423` | 307 | **ACQUIT — AND THE DETECTOR IS WRONG, NOT THE SPEC.** See the note below. |
| 7 | `F-W2:436` | 29 | **ACQUIT** — the §8c index, *"no gate weight"*; `7+13+2+4+2+1 = 29` ✓. |
| 8 | `F-W4:331` | 17 | **ACQUIT** — tokenization artifact: *"the two **E5-17** rows"*, an erratum id abutting the noun, not a magnitude. |
| 9 | `F-W5:271` | 54 | **ACQUIT** — a live corpus receipt; re-run by this seat: **245 / 240 / 54**, all three reproducing. ✓ |
| 10 | `F-W5:345` | 307 | **ACQUIT** — same as #6. |
| 11 | `F-W8:38` | 28 | **ACQUIT** — `**28 rows** (P1–P8 · J1–J7 · R1–R6 · M1–M5 · D1–D2, enumerated in place)`; `8+7+6+5+2 = 28` ✓ re-derived. |
| 12 | `F-W8:163` | 28 | **ACQUIT** — the wave's own carry table; `38 − 5 − 5 = 28` ✓. |
| 13 | `F-W8:218` | 17 | **ACQUIT** — the line carries an explicit correction narrative (*"Count corrected (D-5): the prior '17 rows' was arithmetically consistent only by…"*). A chase in substance that the tightened lexicon missed on vocabulary. |
| 14 | `F-W9:173` | 25 | **ACQUIT** — the `F.W9/W10` BLOCKER receipt; re-run: **54 occurrences / 25 records / 0 bare `F.W10`** ✓. |
| 15 | `F-W10:53` | 25 | **ACQUIT** — the same BLOCKER receipt in the sibling spec; identical re-run ✓. |

⊘ **THE `307` FINDING — this seat's detector over-captured, and the specs are RIGHT.** `307` entered the mechanically-derived superseded set because the canonical's `UNROUTED` heading at `:5386` carries the phrase *"errata round 6 … **read 307**; total HELD, composition moved"*. **But that is a HELD total, not a supersession**: the canonical's live heading is `### UNROUTED — **307 rows**`, `:5480` tabulates `UNROUTED | 307`, and `:5502` reads *"**307 rows are UNROUTED**"*. **`307` is LIVE.** `F-W2:423` and `F-W5:345` cite it correctly. **Recorded because it is a trap for the next seat's instrument**: a mechanical superseded-set derivation must distinguish *"read N; total HELD, composition moved"* from *"read N; corrected to M"*, or it will manufacture false positives against three of the canonical's own live magnitudes.

### 6.3 Member count

⊙ **`F-W3:780` DOES NOT APPEAR IN THE READ-WHOLE BUCKET UNDER EITHER TUNING.** Round 14's cure removed it from the instrument that convicted it. ✓

> **SURVIVING MEMBERS OF `D13-1`'s CLASS: ZERO.**
> Instrument B: **0** unchased mismatches. Instrument A: **15** read-whole, **15 acquitted**, **0 convicted**.
> **This seat measured zero. It did not assume zero, and it did not certify zero without enumerating and adjudicating every candidate its own instrument raised.**

⊙ **§ERRATA-R13·c's refusal is now discharged on the merits.** That section declined to certify the class closed because its own instrument falsified the universal. **At round 14's bytes the instrument no longer falsifies it**, and the closure is stated with the enumeration attached rather than as a bare claim.

---

## §7. Receipts re-run — 52, double-run, every one byte-exact

Every receipt below was run **twice**, in separate invocations, and returned identically both times.

### 7.1 `F-W3` — §ERRATA-R14·e row 4's write-then-measure set

| # | receipt | published | measured | ✓ |
|---|---|---|---|---|
| R1 | line count | 912 | **912** | ✓ |
| R2 | `grep -c 'ContourSettings M-16'` | 5 | **5** | ✓ |
| R3 | `grep -c 'paraphrase — drift noted'` | 21 | **21** | ✓ |
| R4 | `awk '/verbatim/ && !/⟨cmd⟩/' \| wc -l` | 30 | **30** | ✓ |
| R5 | `grep -c '4242\|2780\|2779'` | 3 | **3** | ✓ |
| R6 | `:780` reads `carry 282 rows` | — | **1** | ✓ |
| R7 | `:780` chase tokens | — | **5 of 5** | ✓ |
| R8 | `:780` stale `'289 rows'` | — | **0** | ✓ |
| R9 | canonical `### fr-` records | 66 | **66** | ✓ |
| R10 | F.W3 roster records | 59 | **59** | ✓ |
| R11 | `comm -23` seven, in order | 7 | **7** | ✓ |
| R12 | `comm -13` (roster ∖ canonical) | — | **∅** | ✓ |

### 7.2 `F-W7` — §ERRATA-R14·e row 8's write-then-measure set

| # | receipt | published | measured | ✓ |
|---|---|---|---|---|
| R13 | line count | 359 | **359** | ✓ |
| R14 | `grep -c 'Genuinely owed'` | 2 | **2** | ✓ |
| R15 | `§0(C)` table rows | 10 | **10** | ✓ |
| R16 | `:58` carries `956e71a83e32` | — | **1** | ✓ |
| R17 | `:62` reads `TWO "no"s NOW FALSE` | — | **1** | ✓ |
| R18 | `COHESION.md` digest | `956e71a83e32` | **`956e71a83e32`** | ✓ |
| R19 | `KF-W1.md` digest | `919e484b8a60` | **`919e484b8a60`** | ✓ |
| R20–R22 | the three `COHESION.md` quoted spans | reproduce | **1 / 1 / 1** | ✓ |

### 7.3 Corpus-wide

| # | receipt | measured | ✓ |
|---|---|---|---|
| R23 | stale-pin sweep `be86ae410118\|ba9be3e37613` in `waves/` | **∅ (exit 1)** | ✓ |
| R24 | live pin `f44362757458` in all 11 specs | **5·13·2·6·9·4·5·4·2·6·3** | ✓ |
| R25 | `:707` sweep, scoped | **13** | ✓ |
| R26 | `R14-I2` total, post-cure | **172** | ✓ |
| R27 | `R14-I2` distinct, post-cure | **132** | ✓ |
| R28 | `R14-I2` total, pre-cure | **172** | ✓ |
| R29 | `R14-I2` distinct, pre-cure | **132** | ✓ |
| R30 | register lines, both states | **93 → 93** | ✓ |
| R31 | `F-W5` line count, both states | **433 → 433** | ✓ |
| R32 | pre-cure `F-W5` digest | **`40bcad59cd2b`** | ✓ |
| R33 | unanchored fragility exhibit | **337 → 338 / 289 → 290** | ✓ |
| R34 | Instrument B pairs / unchased | **3 / 0** | ✓ |
| R35 | `F.W9/W10` blocker receipt | **54 / 25 / 0** | ✓ |
| R36 | `F-W5:271` band receipt | **245 / 240 / 54** | ✓ |
| R37 | `F-W8:38` enumeration `8+7+6+5+2` | **28** | ✓ |
| R38 | five canonical §1 headers | **79·73·46·32·52** | ✓ |
| R39 | canonical `:5496` | **`carry **282 rows**`** | ✓ |
| R40 | canonical `:182` `E6-5` | **`289 → 282`** | ✓ |
| R41–R52 | the twelve `§ERRATA-R14` hash rows | **12/12 byte-identical** | ✓ |

**52 receipts. 52 byte-exact. Zero drift under a double run.**

---

## §8. LANDED-WRONG FINDINGS

> ## **ZERO.**

This seat found **no** landed-wrong defect in either round-14 cure, in §ERRATA-R14's twelve-row table, in its four sub-sections, or in the eleven specs at the settled bytes. Both cures are correctly applied at the true bytes; both anchor drifts were disclosed by the certificate rather than smoothed; both write-then-measure sets reproduce; the canonical is frozen; no stale pin propagates.

**Three items were examined as candidates and each is adjudicated LAWFUL, recorded here so no successor re-files them as new:**

1. **The `:707` sweep returns 18 raw against §ERRATA-R14·a's stated 13.** **LAWFUL** — reconciled entirely and exactly by the erratum's declared-first self-exclusion clause at `:758`, which removes precisely the five `≥:756` hits. The clause is declared *before* any count in the section, which is the discipline `:707` lacked and this section exists to cure. **Not a defect. See §4's structural note for round 15.**
2. **`F-W7:62`'s *"FIVE STALE"* against six column-2 strikethroughs.** **LAWFUL** — the minute's own prose partitions the stale-pin class from the `"no"` class and places `KF-W1` in the latter. See §3.2.
3. **§ERRATA-R12's pin-occurrence vector reads `F-W0` at 4; this seat measures 5.** **LAWFUL** — accounted to the single line of the `R11-6` addendum, appended to `F-W0.md` at round 13 by §ERRATA-R13·b row 1, *after* §ERRATA-R12 was written. Dated `E-3` history, correct of its own bytes, not to be patched. See §1.

**One instrument caution is filed forward, against no one:** the `307` over-capture at §6.2 — a mechanically-derived superseded set must distinguish *"read N; total HELD"* from *"read N; corrected to M"*, or it will convict three of the canonical's own live magnitudes. This seat's instrument made that error and caught it by adjudication; a seat that reports tallies without adjudicating will not.

---

## §9. CLOSING HASH — the absolute last act of this write

⟨cmd⟩ this seat, 2026-08-30, **base = repo root `/Users/mkbabb/Programming/value.js`**, on the pinned BSD toolchain, taken **after every receipt above closed byte-exact under a double run, and after which NOTHING in this file is written**:

```
shasum -a 256 /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W*.md \
              /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md \
              /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/conformance/PIN-PURGE-CERT.md
```

**Output, pasted whole and verbatim — glob order, `F-W10` sorting after `F-W1` exactly as the shell produced it:**

```
3d62e5f4e78b99d5f3552a8b4d1ed377981854ca47db80b8471b8f4690651645  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W0.md
ab2437af09e0d0646260afdd024541539ad588d492b8de48aee25a8f82adff3e  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W1.md
8ae0ad8fa623de2201a6184ec32dfcb2a6bd25e2443b69ad4377e24746eeddc9  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W10.md
0b967619bb35763b6f1b09529db080fa2f9a37db2fa3e5e1eac70ce2aef7b7a6  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W2.md
025db038cc44e360363ce2a4499c876f4a077cf1b740a0c47e4dff42b1493608  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W3.md
2fb6e6d637bb6d0fad710716fb1dfa103d39fc41f67d8ff0fb856e4c0126cdb6  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W4.md
26aebcdc7bacb6bc85e31b3bf1205097bacb4311855ade0fe1c581784ff2ad85  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W5.md
e83dcad051f560329ade30dbb0877732650ac05071e8b2ee0eab22f56abf7e11  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W6.md
b5247b852f46d9a5b6c3cb468be799cbe6315a387b31e52a0cc8397c8d76c5d2  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W7.md
d8237cf6b11ef248e4080b8d805a2ee7477139b8d4cf9cf3564922096e29bd45  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W8.md
b265bf677869b0ec6f3c02c54b93272f657111e55498cf05bef14578d6c4b53b  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W9.md
f443627574581ec2a4138e46d927b5fc431a7a6657cae766f7ffafa01e770968  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md
6e4059c8599ccf0c475a254a490de4f5c60cf1d461891eb7cca64a61f7f04bc4  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/conformance/PIN-PURGE-CERT.md
```

**THIRTEEN ROWS. The eleven specs at §ERRATA-R14's authority digests, the canonical FROZEN at `f44362757458` for a SIXTH consecutive round, and `PIN-PURGE-CERT.md` itself at `6e4059c8599c` — the state at which every finding in this seal is attested and at which nothing further was written.**
