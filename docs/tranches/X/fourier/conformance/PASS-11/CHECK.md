# X·F PASS 11 — FRESH ADVERSARIAL WHOLE-CORPUS CHECK (L-18/L-20)

**Seat:** PASS-11 CHECK, hostile, verify-only. **Date:** 2026-08-30. **Base:** repo root `/Users/mkbabb/Programming/value.js`, pinned BSD toolchain (`/usr/bin/grep`, `/usr/bin/awk`, `/usr/bin/diff`, `shasum`).
**Operand:** the 11 `waves/F-W*.md` · `conformance/CENSUS-CANONICAL.md` (frozen) · `conformance/PIN-PURGE-CERT.md` · `PASS-10/SEAL.md` · the 66 frozen `fr-*.md` at `docs/tranches/V/megatranche/registry/adjudicated/`.
**ZERO edits made to any spec, the canonical, the certificate or any record.** This file is the only artefact this seat wrote. No product source was opened.

> **VERDICT: NOT CONFORMANT. Two HIGH.** `hashesClean = true` · `rosterEscapes = 0` · `fabricated = 0` · `selfCountLiveMembers = 2`.
>
> The bar required zero BLOCKER/CRITICAL/HIGH. **Two specs assert census magnitudes the frozen canonical does not carry, in current voice, with no chase marker — including `F-W4`'s masthead declaration of its *"SOLE census operand"* and its closure gate.** The canonical's own stamp makes this defective on sight. Separately, the self-count class the round-10 law was minted to close **still has the two live members `PASS-10/SEAL.md` recorded and nothing cured** — no spec byte has moved since that seal.

---

## §1 — FIRST ACT: THE RE-HASH. **CLEAN.**

⟨cmd⟩ `shasum -a 256 docs/tranches/X/fourier/waves/F-W*.md docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md docs/tranches/X/fourier/conformance/PIN-PURGE-CERT.md`

**All thirteen rows are byte-identical to `PASS-10/SEAL.md` §1 and §6.** Not one prefix differs.

| file | SEAL pin | this seat | file | SEAL pin | this seat |
|---|---|---|---|---|---|
| `F-W0` | `c03149fc2f9e` | ✓ | `F-W6` | `e83dcad051f5` | ✓ |
| `F-W1` | `ab2437af09e0` | ✓ | `F-W7` | `16e35d5bb571` | ✓ |
| `F-W2` | `655a21e7a64d` | ✓ | `F-W8` | `16d587cb7d77` | ✓ |
| `F-W3` | `93bc1ebc4a24` | ✓ | `F-W9` | `66030d34992d` | ✓ |
| `F-W4` | `7b427c227275` | ✓ | `F-W10` | `d3fa14c669dd` | ✓ |
| `F-W5` | `40bcad59cd2b` | ✓ | **`CENSUS-CANONICAL.md`** | **`f44362757458`** | ✓ **FROZEN** |
| | | | `PIN-PURGE-CERT.md` | `01c9cd8efcd5` | ✓ |

⊙ **The canonical is FROZEN at `f443627574581ec2a4138e46d927b5fc431a7a6657cae766f7ffafa01e770968` for a third consecutive round.** ⟨cmd⟩ `git status --short docs/tranches/X/fourier/` → the same six modified paths the seal recorded, ⊕ the untracked `PASS-10/SEAL.md`. **Nothing has moved since the seal.** Every landed-wrong item that seal recorded is therefore live at these bytes by construction, and this seat re-derived each one independently rather than inheriting it.

---

## §2 — AXIS 1: THE ROSTER. **CLOSED AT ZERO. `rosterEscapes = 0`.**

### §2.1 Boundary-exact subtraction, run

⟨cmd⟩ over `CENSUS-CANONICAL.md` §3's home table:

| band | members | sum |
|---|---|---|
| **WAVE-DUTY** | F.W0 55 · F.W1 330 · F.W2 23 · F.W3 919 · F.W4 1007 · F.W5 27 · F.W5-W8 89 · F.W9 16 | **2466** ✓ |
| **relay / packets / SS-*** | GLASS-RELAY 22 · NWO 32 · NWO→SS-13 3 · NWO→SS-3 27 · NWO→SS-5 3 · SS-1 5 · SS-13 134 · SS-2 7 · SS-3 9 · SS-4 3 · SS-5 2 · SS-6 1 · SS-7 1 | **249** |
| **TERMINAL (∅)** | | **1220** ✓ |
| **UNROUTED** | | **307** ✓ |
| **TOTAL** | | **4242** ✓ |

**`4242 − 2466 − 1220 − 307 = 249`, and 249 is exactly the relay/packet/SS band enumerated. The subtraction closes at ZERO with no residue and no double-count.**

### §2.2 §1 = §2 = §3, mechanically, three ways

| test | ⟨cmd⟩ | result |
|---|---|---|
| §1 per-record declared headers | `grep -oE '^### fr-[A-Za-z]+ — target .*· \*\*[0-9]+ rows\*\*'` → sum | **66 records / 4242** ✓ |
| §2 per-record enumerations, all 23 homes | `awk '/^## §2/,/^## §3/'` → `^- **fr-X** (n)` → sum | **66 distinct records / 4242** ✓ |
| §2 per-home enumeration vs its own declared header | per-home `awk` join | **23 of 23 agree exactly** ✓ |
| **§1 vs §2 PER RECORD** | `diff` of the two 66-row tables | **ZERO MISMATCHES** ✓ |

⊙ The fourth row is the one that matters and the one a totals-only check cannot make: **not merely the sums but every one of the 66 per-record figures agrees between the two independent halves of the file.**

### §2.3 The canonical-row paste sweep — the specs against the frozen roster

| spec | roster block | canonical | spec | `diff` |
|---|---|---|---|---|
| `F-W1` §6·R4 | `:549–633` | 65 records / **330** | 65 records / **330** | **ZERO MISMATCHES** ✓ |
| `F-W3` §X.1-v5 | `:720–778` | 59 records / **919** | 59 records / **919** | **ZERO MISMATCHES** ✓ |

⊙ `F-W4` does not paste a per-record roster; it books through the (a)/(b)/(c)/(d) crosswalk register, which is measured at §4.1 below instead.

⊙ **Both dash spellings probed** — `F.W5-W8` (U+002D) and `F.W5–W8` (U+2013): canonical 128 / 36, `F-W5` 31 / 13. **No spelling-restricted detector.** The pass-8 HIGH is CURED at the bytes: ⟨cmd⟩ `grep -c '89 rows' F-W5.md` → **4**, `grep -c '90 rows' F-W5.md` → **0**.

### §2.4 Twelve E6-3 dispositions spot-read at BOTH ends (charge: ≥8)

E6-3's ledger — F.W0 −2 · F.W1 −28 · F.W2 −4 · F.W3 −9 · F.W4 −5 · F.W5 −1 = **−49**; TERMINAL +48 · UNROUTED +1 = **+49**; wave-duty 2515 → 2466 — **balances exactly**.

**End 1 — the quote exists at the frozen record** (`grep -c` at `registry/adjudicated/`): `fr-CanvasControlsDock` *"F.W1 must not budget it"* **1** · `fr-ConvergenceTimeline` *"F.W1 must not budget"* **1** · `fr-GalleryCardModal` *"must not be copied into F.W1"* **1** · `fr-SliderControl` *"DOES NOT EXIST"* **1** · `fr-App` *"C/S-2 carries the F.W1 debit"* **1** · `fr-SpeedSelect` *"routed F.W4"* **1** · `fr-PaperArticleWindow` *"Not a row of this roster"* **1** · `fr-GalleryCardModal` *"FOLD → fr-BasisSelector B-3"* **1** · `fr-PathPreview` *"all three die together"* **1** · `fr-PathPreview` `PP-REDGATE` **3**. **10 of 10 present.**

**End 2 — the canonical homes each exactly as E6-3 claims** (extracted from §2's roster, not from the errata prose): `fr-App K-9` · `fr-CanvasControlsDock K-8` · `fr-ContourPreview KILL-6` · `fr-ConvergenceTimeline K-8` · `fr-EasingCurvePreview K-11` · `fr-EquationModeToggle K-7` · `fr-GalleryCardModal K-8` · `fr-PaperArticleWindow K-20` · `fr-PathPreview K7` · `fr-SliderControl K-1` · `fr-SpeedSelect K-11` → **TERMINAL (∅)**; `fr-GalleryCardModal K-2` → **UNROUTED**. **12 of 12 verify at both ends.**

**End 3 — the departures are STRUCK, not booked.** `F-W1` carries **33** `E6-3` disclosures and every departure is struck in place with its reason inline (`~~· \`K-8\`~~ <sub>*re-homed TERMINAL per E6-3 (2026-08-29) — the canonical no longer homes it at F.W1*</sub>`). **No spec books an id the canonical homes elsewhere. `rosterEscapes = 0`; `fabricated = 0`.**

---

## §3 — AXIS 2: THE PASS-10 REGISTER (8 ITEMS), EACH CLOSED AT THE BYTES

| # | item | this seat's ⟨cmd⟩ at the settled bytes | verdict |
|---|---|---|---|
| 1 | `F-W10:338` ExportModal fabrication | `grep -cF 'ExportModal' F-W10.md` → **2** (`:296` `:338`); `awk 'NR!=338' … ` → **1** — `:296` books it live, `:338` withdraws the universal | **CLOSED** |
| 2 | `F-W4:192` showImageOverlay | whole **2** (`:192` `:347`); `awk 'NR!=192'` → **1** | **CLOSED** |
| 3 | `F-W4:347` FM-18 byte-universal | `grep -c` **1** · `awk 'NR!=347'` → **0** · `-oE\|wc -l` → **4**, the disclosed value | **CLOSED** |
| 4 | cert §ERRATA-R9 row 9 undercount | cert `:452` states the correction as **11 mentions / 10 distinct**, `5044` the sole repeat — as an E-3 addendum, row 9 unpatched | **CLOSED** |
| 5 | `F-W8:324` C:C-23 | `grep -n 'C:C-23' F-W8.md` → **11** lines, the identical eleven; substantive claim holds | **CLOSED** *(but see D-7)* |
| 6 | `F-W9:505` pair-universal | `awk 'NR!=505' … \| grep -E 'L-26' \| grep -c 'fr-VisualizationView'` → **0** | **CLOSED** |
| 7 | `F-W10` FR-NP-32 qualification | now at `:446` (displaced +23): two live `FR-NP-32 (≡ fr-PaperSidebar M1)` ⊕ one `` ~~`FR-NP-32 (≡ M1)`~~ `` struck | **CLOSED** *(see D-11)* |
| 8 | `F-W1:725` superseded digest | `a450b8e9f80e` @ byte 497, `f44362757458` @ byte 839 — **distance 342**, well within ±400; dated row unedited | **CLOSED** |

**8 of 8 closed.** The register pass-10 filed is genuinely discharged. **The defects below are NEW or are the seal's own uncured landed-wrong register — not a re-filing of the eight.**

### §3.1 The whole-corpus digest-chase audit — CLEAN

⟨cmd⟩ per-line `awk` over all 11 specs counting `3e0a9acb3381|a450b8e9f80e` against same-line `f44362757458`:

**30 superseded-digest occurrences across 21 lines** (`F-W1` 7 lines · `F-W2` 5 · `F-W9` 2 · `F-W3`/`F-W4`/`F-W5`/`F-W6`/`F-W7`/`F-W8`/`F-W10` 1 each · `F-W0` 0). **All 21 lines carry a same-line chase to the frozen digest. ZERO live superseded digests lack their chase marker.**

---

## §4 — THE DEFECTS

### ⌧ **D-1 — HIGH. `F-W4` declares a SOLE CENSUS OPERAND the frozen canonical does not carry — at four unchased sites, one of them the masthead and one of them the closure gate.**

The canonical homes **F.W4 = 1007 rows** (§3 home table; §2 heading `### F.W4 — **1007 rows**`, re-based at errata round 6 E6-3). `F-W4` carries **five** lines spelling `1014`. ⟨cmd⟩ `awk '/1014/{c=gsub(/chased|re-based|1007/,"&"); print NR, c}' F-W4.md`:

| site | chase markers | text |
|---|---|---|
| **`:7`** MASTHEAD | **0** ⌧ | *"**Census-of-record** … `CENSUS-CANONICAL.md` **§2 → `F.W4` = 1014 rows across 54 records**, hash-pinned at §2.X.2 (R4-8.3). **It is the SOLE census operand of this spec.** Every one of the 1014 is BOOKED here…"* |
| `:297` | 2 | ok — *"For each of the 1007 ⟨read 1014 at repair round 4 and 1012 at errata round 5; re-based at round-7 reconcile…⟩"* |
| **`:349`** ARITHMETIC | **0** ⌧ | *"**(g) THE ARITHMETIC, STATED SO IT CAN BE FALSIFIED.** Canonical **1014**; … **29 + 72 + 913 = 1014.**"* |
| **`:374`** GATE `G-F4-CARRY-CLOSURE` | **0** ⌧ | *"Leg (b)'s roster is `../conformance/CENSUS-CANONICAL.md` **§2 → `F.W4` (1014 rows, 54 records)**, hash-pinned at §2.X.2, and the set-difference is taken against §2.X.2's booking register…"* |
| **`:455`** register | **0** ⌧ | *"\| canonical-roster bookings (R4-10) \| 1014 \| … 29 crosswalked (a), 72 booked (b) \|"* |

⊙ **The file contradicts itself across 367 lines.** §2.X.2's own heading and preamble were re-based and carry their chase notes — `:293` *"**F.W4 = 1007 rows across 54 records** ⟨chased at round-7 reconcile…⟩"*, `:295` *"**1007 rows, 54 records**"*, `:297` as above. **The masthead that names the operand, the arithmetic that closes over it, and the gate that measures escapes against it were all left at the round-4 reading.** ⟨cmd⟩ `grep -c '1007' F-W4.md` → **3**; `grep -c '1014' F-W4.md` → **5**. The stale spelling outnumbers the live one.

⊙ **`:374` is the sharpest instance because it is a GATE and it is self-refuting**: it names *"(1014 rows, 54 records)"* and in the same breath says *"hash-pinned at §2.X.2"* — and §2.X.2 reads **1007**. A seat running `G-F4-CARRY-CLOSURE` to its own text takes a set-difference against a roster that does not exist, on the **largest home in the census**.

⊘ **This is the class the canonical's own stamp convicts on sight**: *"THE CENSUS OF RECORD — supersedes every prior denominator … **a gate that cites another census operand is DEFECTIVE on sight**."* It is also the exact shape of pass-8's HIGH (*"F.W5-band operand stale ×12"*), which `F-W6`/`F-W5` cured properly and which was never swept in `F-W4`. **NOT licensed E-3 history: none of the four sites is dated, struck, or marked at-the-time.**

### ⌧ **D-2 — HIGH. `F-W3` attributes superseded figures to canonical §4.3 BY NAME, in the present tense, at three sites — and the file carries no chase anywhere.**

Canonical §4.3 now reads: *"**The alias law's magnitude is 2780 tokens** … 2780 `·`/slash-joined tokens ride beside **4242** banked ids as aliases … A detector that atomises them into standalone identities mints up to **2779** bookings"*, and it **explicitly records the reading it replaced**: *"(re-summed … this line read **2768 tokens beside 4269 banked ids, up to 2767 bookings**, before the sixteen alias tokens … were restored (E5-4, E5-11) and the six … struck)"*.

`F-W3` publishes the superseded reading as the canonical's current measurement:

- **`:32`** — *"**(6) the alias tier at its true magnitude** — canonical §4.3 **measures 2768** alias tokens riding beside **4269** banked ids, so an atomiser that promotes them mints up to **2767** bookings no record ever made. **Both are rules of the operand now**, not axes of a probe this file maintains."*
- **`:784`** — *"**Canonical §4.3 measures** the full size of the class the atomiser would have promoted: **2768 alias tokens** beside **4269** banked ids."*
- **`:703`** — *"round 4 stops answering the question and **cites the file that already answered it for all 4269 rows at once**."*

⊙ **All three figures are wrong and the verb is present-tense.** ⟨cmd⟩ `grep -c '4242\|2780\|2779' F-W3.md` → **0**. **The file contains not one occurrence of any current magnitude.** There is no chase note, no strike, no date-stamp; `:32`'s closing clause — *"Both are rules of the operand now"* — asserts currency in terms.

⊙ **`F-W3` knows the idiom and used it everywhere else**: `:17`, `:28`, `:707` all chase `926`→`928`→`919` with dated `⟨…⟩` sub-notes, and the §X.1-v5 roster diffs byte-exact against the canonical (§2.3). **The alias-magnitude paragraph is the one operand the round-7 reconcile did not reach**, because the reconcile swept per-home row counts and this is a corpus-wide alias count.

⊘ **Load-bearing to the extent it is cited as authority**: `:32` offers these as the *"blindness axes the canonical closes"* and `:784` as the disposition of the 30 zero-homed prefix-axis ids — the pass-4 P4-1 ruling's own magnitude. The substantive claim (aliases are not identities; the atomiser manufactured bookings) is TRUE and unaffected. **The magnitude quoted against the frozen authority is false by 12 tokens and its denominator by 27 rows.** ⟨cmd⟩ `grep -rn '4269\|2768\|2767' conformance/PIN-PURGE-CERT.md conformance/PASS-*/…` → **no cert or ruling has ever filed these sites.**

### ⌧ **D-3 — MEDIUM. `F-W4:349`'s falsifiable arithmetic is falsified by its own section, 45 lines above it.**

`:349` publishes *"crosswalked-and-already-booked **29** (a); **newly booked here 72 (b)**; … the remaining **913** … **29 + 72 + 913 = 1014**."* But ⟨cmd⟩ `grep -oE '\*\*\(b\) THE ESCAPES, BOOKED BY BANKED ID — [0-9]+ rows on [0-9]+ records\*\* ⟨[^⟩]*⟩' F-W4.md` returns:

> **(b) THE ESCAPES, BOOKED BY BANKED ID — 71 rows on 16 records** ⟨*re-based at round-7 reconcile, 2026-08-29: read 72; `fr-ContourPreview KILL-3` re-homed TERMINAL per E6-3*⟩

**(a) = 29 (unmoved) · (b) = 71 (re-based, chased) · canonical = 1007.** The true statement is `29 + 71 + 907 = 1007`. **All three of `:349`'s terms are stale, and the middle one contradicts a chase note in the same subsection.** The heading promises the arithmetic *"STATED SO IT CAN BE FALSIFIED"*; it falsifies.

### ⌧ **D-4 — MEDIUM. `F-W2:248` — live self-count member, uncured through three conformance passes.** *(independently re-derived; `PASS-10/SEAL.md` LW-S3)*

Published: *"**sixty-seven of the eighty-three distinct commands** carry no absolute path and run from a DECLARED base instead — ⟨cmd⟩ `/usr/bin/grep -oE '⟨cmd⟩ \`[^\`]*\`' F-W2.md | sort -u | /usr/bin/wc -l` → **83**; `… | /usr/bin/grep -c '/Users/'` → **16**."*

| ⟨cmd⟩ | published | this seat | verdict |
|---|---|---|---|
| `… \| sort -u \| wc -l` | **83** | **84** | ⌧ FALSE |
| `… \| grep -c '/Users/'` | **16** | **16** | ✓ |
| derived count-word | **67** | **68** | ⌧ FALSE |
| `awk 'NR!=248' … \| sort -u \| wc -l` | — | **81** | line `:248` contributes **3** of the 84 |

**Class membership is by construction**: its own line matches its own counted pattern, with no declared self-exclusion and no substantive-byte quantification. `F-W2` was not edited at rounds 8, 9 or 10 (`655a21e7a64d`, unmoved). **Round 10's law is right; the sweep that applied it was narrower — its instrument filters on an id-shaped literal core ≥3 chars, and this receipt counts a structural delimiter (`⟨cmd⟩ `).**

### ⌧ **D-5 — MEDIUM. `F-W10:338` — round 10's principal repair published a coordinate its own insertion displaced.** *(seal LW-S1, uncured)*

The re-cut collateral enumerates the nine other `L-16` homes as `:191 :193 :244 :276 :291 :297 :301 :303 :419`. ⟨cmd⟩ `grep -nE '(^|[^A-Za-z0-9])L-16([^A-Za-z0-9]|$)' F-W10.md` → **`191 193 244 276 291 296 297 301 303 338 442`**. Excluding `:296` (the booking) and `:338` (the claiming line), the nine are `191 193 244 276 291 297 301 303` ⊕ **`442`**, not `:419`.

⊙ **The cause is the repair itself**: the cure expanded `:338` from one line to twenty-four, displacing everything below by **+23**; `419 + 23 = 442` exactly. **The eight coordinates above the insertion all verify; the one below it drifted, and the drifting edit is the one that published it.** Independently corroborated: pass-10 register item 7's site also moved `:423 → :446` (§3, row 7) — same +23.

### ⌧ **D-6 — MINOR. `F-W10:467` — live self-count member.** *(seal LW-S4, uncured)*

Published ⟨cmd⟩ `/usr/bin/grep -o "§2.5a-iii's 1[34]" waves/F-W10.md` → `14` · `14` · **`13`**. This seat, settled bytes → **`14` · `14` · `14`** at `:314` `:442` `:467`. **Line `:467` is itself one of the three hits, and the value it publishes as the third is the value its own REST-67 cure changed.** No R3-3.8 before/after pairing, no self-exclusion. **The substance is unaffected** — `23 + 36 + 16 + 14 = 89` re-derived TRUE and the label reads 89; **only the receipt is false.**

### ⌧ **D-7 — MINOR. `F-W8:324` enumerates ten under a label reading nine.**

The spec: *"`:324` is the claiming sentence itself, and **the other nine** are chase notes…"* — then enumerates `:20` · `:25`/`:27` · `:40` · `:78`/`:81` · `:165` · `:246`/`:267` · `:322` = **ten**. ⟨cmd⟩ `grep -n 'C:C-23' F-W8.md` → **11** lines; `11 − 1 = 10`. **`PIN-PURGE-CERT.md` §ERRATA-R10·b row 9 states it correctly as *"the other ten"*** — the certificate is right and the spec is wrong. Non-load-bearing (all eleven coordinates verify; the substantive `UNROUTED` homing at canonical `:5428` holds), but form (ii) of the round's own law requires the enumeration to be complete **and** correctly labelled.

### ⌧ **D-8 — MINOR. `F-W9:289` coordinate drift, filed for this round and still uncured.**

Cited homes `:178` `:282` `:452`; ⟨cmd⟩ `grep -n '9 e2e never enter the audit tab' F-W9.md` → **`185` `289` `461`** — a uniform +7. The *"one distinct span"* half re-runs TRUE (`grep -o … | sort -u` → one line). **Declared: `PIN-PURGE-CERT.md` §ERRATA-R10·c filed it for round 11 and `PASS-10/SEAL.md` confirmed it.** Filed here only to record that it is unmoved.

### ⌧ **D-9 — MINOR. `F-W7:16`'s residue enumeration is now short by TWO, and the shortfall grows once per conformance round.**

Published residue: *"`PASS-5/F-W7-CHECK.md` and `PASS-5/WORK-ORDER.md`, both conformance artefacts of this repair round."* ⟨cmd⟩ `grep -rl "trie ruling stays inline" docs/` → **five** paths: `waves/F-W7.md` · `PASS-5/F-W7-CHECK.md` · `PASS-5/WORK-ORDER.md` · `PASS-5/SEAL.md` · **`PASS-10/SEAL.md`**. The seal recorded four; this seat measures five, **because the seal that recorded it became the fifth**.

⊙ **The load-bearing claim — *"the sole WAVE-SIDE home"* — remains TRUE** (`grep -l` over `waves/` → `F-W7.md` alone). ⊘ **The general shape, stated once so a successor can fix the instrument rather than the number: a residue list scoped to `docs/` is falsified by every future instrument that quotes it, including this file. The correct cure is to scope the receipt to `waves/`, not to re-count the residue.**

### ⌧ **D-10 — MINOR (against an instrument, not the corpus). `PASS-10/SEAL.md` §3.2 states a distribution in one unit and its total in another.**

The seal publishes: *"⟨cmd⟩ `grep -ohE '3e0a9acb3381|a450b8e9f80e' F-W*.md | wc -l` → **30**, distributed `F-W1` 7 · `F-W2` 5 · `F-W9` 2 · seven files 1 each · `F-W0` 0."* **The distribution sums to 21, not 30.** This seat's per-line audit (§3.1) shows why: **the total is per-OCCURRENCE (30) and the distribution is per-LINE (21)** — `F-W1` has 7 lines carrying 8 occurrences, `F-W2` 5 lines carrying 7, and so on. **The corpus figure 30 is correct and the chase audit is clean**; only the seal's sentence mixes units. Recorded because it is the E-13/E-22 count-word shape and the corpus has now convicted four generations of it.

### ⊙ **D-11 — INFO. `FR-NP-32`: the literal probe returns 1, not 0.**

⟨cmd⟩ `grep -cF '(≡ M1' F-W10.md` → **1**; `awk 'NR!=446' … ` → **0**. The single hit is the retired spelling quoted **inside its own strike** at `:446`, beside two live qualified `FR-NP-32 (≡ fr-PaperSidebar M1)`. **The axis-5 requirement (zero unqualified `≡ M1`) is SATISFIED under the round's own self-excluding law.** Recorded only because a gate written to expect a literal zero will fire on lawful bytes.

---

## §5 — AXIS 3: RECEIPT REALITY. **41 ⟨cmd⟩ RECEIPTS RE-RUN. FABRICATION = ZERO.**

### §5.1 Every round-10 re-cut, re-run

All fourteen re-cut receipts named in `PASS-10/SEAL.md` §2 were re-run at these bytes; **14 of 14 reproduce**, with the two disclosed exceptions behaving exactly as disclosed (`FM-18` `-oE` → 4 at settled bytes, quoted at named bytes; `showImageOverlay` whole-file figure quoted at named bytes). Detail in §3's table.

### §5.2 Own-file receipts, run independently

| site | ⟨cmd⟩ | published | this seat | verdict |
|---|---|---|---|---|
| `F-W4:117` | `grep -oE "\bBC-10\b" F-W4.md \| wc -l` | **12** | **12** | ✓ |
| `F-W4:146` | `for t in PAW-6 PAW-18 PAW-26 PAW-29` | **7 · 4 · 4 · 8** | **7 · 4 · 4 · 8** | ✓ |
| `F-W4:177` | ten `GCM-*` tokens | **5 · 3 · 5 · 12 · 3 · 3 · 3 · 3 · 4 · 5** | **identical, all ten** | ✓ |
| `F-W5:269` | `grep -cE '^\| \*\*[A-G][0-9]+c?\*\*' F-W5.md` | **93**, of which **22** gates → **71** clauses | **93 / 22**; §A 6+§B 5+§C 5+§D 16+§E 20+§F 9+§G 10 = **71** ✓ | ✓ |
| `F-W7:18` | `awk '/^## 5\. Carry/,/^## 6\. Gates/' \| … \| sort -u \| wc -l` | **15** | **15** | ✓ |
| `F-W8:36` | `grep -n 'raw-findings'` — *"the sole occurrence is this erratum line itself"* | sole = `:36` | **`36:` only**, `-c` → 1 | ✓ |
| `F-W8:78` | `awk 'NR>=265 && NR<=278 && /^\| /' \| wc -l` | **14** | **14** | ✓ |
| `F-W9:288` | `grep -o '^10\. \*\*D/i-1 COUPLED LOCK\*\*'` | 1 | **1** | ✓ |
| `F-W9:471` | `grep -Ec '^\| \*\*P-[0-9]+\*\* \|.*OUTSTANDING'` | **8** | **8** | ✓ |
| `F-W10:309` | `awk '/^### §2\.5 /,/^#### §2\.5a/' \| grep -c '^\| \*\*'` | **23** | **23** | ✓ |
| `F-W3:885` | `grep -c 'paraphrase — drift noted'` | *live-checkable, banked nowhere* | **21** | ✓ lawful |
| `F-W6:19` | `grep -c '^### F\.W5 — \*\*28 rows\*\*' "$C"` | **0** (declared) | **0**; `27 rows` → **1** | ✓ |
| `F-W6:476` | same, at the roster header | **0** (declared) | **0** | ✓ |

### §5.3 The paired-splice gate (`G-F9-21` / `G-F10-6`, Δ=∅), re-run

| ⟨cmd⟩ | expected | this seat |
|---|---|---|
| `diff <(awk '/^\| record \| identity/,/^\*\*By-mechanism entrants/' F-W9.md) <(… F-W10.md)` | **empty** | **empty** ✓ |
| `diff <(awk '/^\*\*THE F.W1 VISUAL-REGRESSION/,/^\*\*Born-RED witness/' F-W9.md) <(… F-W10.md)` | **empty** | **empty** ✓ |
| `diff <(grep -h '^\*Heading mirrored' F-W9.md) <(… F-W10.md)` | **DIFFER** (declared) | **differs** ✓ |

**The twins' shared bytes are byte-identical in both directions and the seat-local heads differ exactly as declared.**

### §5.4 THIS SEAT'S OWN SELF-COUNT CLASS PROBE, over all 11 specs. **FAILS — TWO LIVE MEMBERS.**

**Instrument, built from `F-W10.md` §R10-LAW's text.** Enumerate every ⟨cmd⟩ receipt whose operand is its **own file**; keep those publishing a bindable integer; run each; a **live member** is one where (i) the published figure does not reproduce, (ii) its own line matches its own counted pattern, and (iii) neither a declared `awk 'NR!=n'` exclusion nor a substantive-byte quantification is present.

⟨cmd⟩ own-file receipt census: `F-W0` 2 · `F-W1` 3 · `F-W2` **6** · `F-W3` 4 · `F-W4` 11 · `F-W5` 2 · `F-W6` 2 · `F-W7` 2 · `F-W8` 8 · `F-W9` 21 · `F-W10` 12 = **73 sites**. Declared self-exclusions corpus-wide: `F-W4` 2 · `F-W9` 1 · `F-W10` 2 = **5 lines**.

**Result: `selfCountLiveMembers = 2` — `F-W2:248` (D-4) and `F-W10:467` (D-6).** Every other bindable own-file receipt either reproduces exactly (§5.2), is struck/converted under R3-3.10 with the conviction in its own citing cell, is declared live-checkable rather than banked, or carries its exclusion inline. **The charge required ZERO.**

⊘ **What this seat adds beyond the seal**: the two members were reached by a *different* instrument — receipt-enumeration-then-execution rather than pattern-core matching — and both fell out. **That is corroboration by independent method, not inheritance.** It also means the class is now measured twice at two instruments and has held its size at two: **the sweep is not merely narrow, it is stationary.**

### §5.5 Fabrication

**ZERO.** Every falsified figure in §4 is **STALE or SUPERSEDED**, traceable to a byte-state at which it was true — `1014` was the round-4 canonical, `2768/4269/2767` the pre-errata-round-5 §4.3, `(b) 72` the pre-round-7 heading, `:419` the pre-insertion coordinate, `14·14·13` the round-4 output, `83/67` the pre-round-8 command set. **No receipt invents a fact the corpus never held, and no spec books an id the canonical does not home there.**

---

## §6 — AXIS 4 & 5: GATES AND POSTURE

| axis | ⟨cmd⟩ / test | result |
|---|---|---|
| **canonical operands only** | per-home operand freshness in each owning spec | `F-W0` 55 ✓ · `F-W1` 330 ✓ · `F-W2` 23 ✓ · `F-W3` 919 ✓ · `F-W5` 27/89 ✓ · `F-W9` 16 ✓ — **`F-W4` 1007 ×3 vs 1014 ×5 ⌧ (D-1)**; corpus alias magnitude **`F-W3` ⌧ (D-2)** |
| **portable commands** | `grep -hoE '⟨cmd⟩ \`[^\`]*\`' F-W*.md \| grep -E 'grep -[a-z]*P \|\(\?[=!]\|\\K'` | **one hit, and it is the prohibition's own detector** (`F-W8:29`, probing FOR the banned forms). **No live PCRE receipt.** ✓ |
| **shell-variable bases** | `⟨cmd⟩` strings containing `$VAR` | every consumer declares its base in-block (`C='docs/…/CENSUS-CANONICAL.md'; …`, `R=…; …`, `FA='…'; …`) or inside a block that declares `$C` with the frozen sha256 (`F-W6:19`). **No phantom witness.** ✓ |
| **no spelling-restricted detectors** | both dash spellings of the band | canonical 128/36 · `F-W5` 31/13 ✓ |
| **count-words match lists** | §2.2, §2.4, §5.2, D-3, D-7, D-9, D-10 | clean except **D-3 / D-7 / D-9 / D-10** |
| **zero `VERIFIED-YES`** | `grep -c 'VERIFIED-YES' F-W*.md` | **0 in all eleven** ✓ |
| **status planned** | `planned` present / `executing`·`ratified`·`closed` absent | **11/11 planned; 0/11 any other status** ✓ |
| **zero-roster postures W6/W7/W10** | canonical `### F.W6\|F.W7\|F.W8\|F.W10` sections | **none exist** — the ∅ posture is the canonical's own; `F-W6`/`F-W7`/`F-W10` declare it (9 sites) ✓ |
| **F.W1 transaction whole** | *"atomic transaction"* clauses | present and coherent — producer bump lockstep (G6), abort clause on cross-edge 3, *"the persistent header cannot be uplifted independently"* ✓ |
| **fourier tree READ-ONLY** | posture clauses | *"READ-ONLY at spec time"*, *"is READ — never written"*, with an explicit **READ-ONLY MEASUREMENT CARVE-OUT** so the absolute is not self-contradicted ✓ |
| **SS-4 flags inline** | `grep -c 'SS-4' F-W10.md` | **46** — flagged inline, never presumed ✓ |
| **E-3 obeyed** | dated rows unedited; corrections as addenda | cert `:452` (row 9 correction stated, **never patched**), `F-W1:725` (append beside the dated row, 1 insertion / 1 deletion) ✓ |
| **no product source opened** | — | **none** ✓ |

### §6.1 Licensed E-3 history — checked and NOT re-filed

`F-W8:40`'s *"28 ⊕ 89 = 117"* movement minute, and quote-time digests inside dated errata rows now carrying a chased sub-note (all 21 lines verified chased at §3.1). **Neither appears in §4.**

---

## §7 — WHAT THIS SEAT CHECKED AND FOUND CLEAN

- All thirteen hashes; the canonical FROZEN for a third round; nothing moved since `PASS-10/SEAL.md`.
- The roster, closed **boundary-exact at ZERO** four ways: §3's band subtraction, §1's 66 headers, §2's 66 enumerations across 23 homes, and the **per-record §1↔§2 `diff`** (zero mismatches).
- The canonical-row paste sweep: `F-W1` 65/330 and `F-W3` 59/919, **both `diff`-clean against the frozen roster**, both dash spellings probed.
- Twelve E6-3 dispositions at **both** ends, plus a third end — the departures are struck in `F-W1`, not booked. **`rosterEscapes = 0`.**
- All **8** pass-10 register items, closed at the bytes.
- **41** ⟨cmd⟩ receipts re-run including every round-10 re-cut; the paired-splice gate Δ=∅ in both directions; **`fabricated = 0`**.
- The whole-corpus digest chase: **30 occurrences / 21 lines / 21 chased — zero live superseded digests lacking their marker.**
- `VERIFIED-YES` zero; status planned 11/11; portable-command law clean; no spelling-restricted detector; `FR-NP-32` canonical form satisfied.

## §8 — THE BAR

| requirement | met? |
|---|---|
| zero BLOCKER/CRITICAL/HIGH | ⌧ **NO — two HIGH (D-1, D-2)** |
| hashes clean | ✓ yes |
| roster closed | ✓ yes — `rosterEscapes = 0` |
| fabrication zero | ✓ yes |
| self-count live members = 0 | ⌧ **NO — two (D-4, D-6)** |
| tail MINOR-or-below with stated mitigations | ⌧ **NO — three MEDIUM (D-3, D-4, D-5)** |

**NOT CONFORMANT.** The loop does not end here.

⊘ **Stated plainly so this is not read as a rout.** The roster is the strongest it has ever been — boundary-exact, per-record cross-verified, and `diff`-clean where the specs paste it. Fabrication is zero. Every pass-10 finding is genuinely discharged. **The two HIGHs are a single shape: the round-7 reconcile re-based per-home row counts and left behind the operands that are not per-home row counts — `F-W4`'s masthead/gate/arithmetic triplet and `F-W3`'s corpus-wide alias magnitude.** Four sites and three sites, all of them mechanically findable by the ⟨cmd⟩s printed above. **A round-11 repair that greps every spec for every superseded canonical magnitude — not just the home counts — closes both, and the self-count sweep needs an instrument that enumerates receipts and executes them rather than one that matches pattern cores.**
