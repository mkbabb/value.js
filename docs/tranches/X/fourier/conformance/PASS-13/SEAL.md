# X·F ROUND 13 — THE SEAL. VERIFY-ONLY.

**2026-08-30 · seal seat · base = repo root `/Users/mkbabb/Programming/value.js` · pinned BSD toolchain (`/usr/bin/grep`, `/usr/bin/awk`, `/usr/bin/sed`, `/usr/bin/wc`), spelled absolutely at every receipt.** **ZERO edits to any file in the corpus, the canonical, the cert, the waves or the registry.** No product source was opened. The only file this seat wrote is this one, and it is an operand for no gate.

**VERDICT — the round-13 cure is SOUND and the pin table is TRUE at the settled bytes. Twelve of twelve hash rows reproduce byte-identical; the canonical is FROZEN for a fifth consecutive round; `F-W5:347` is cured and returns under neither comparator; ONE member of `D13-1`'s class survives corpus-wide — `F-W3:780`, which the certificate itself RECORDS and deliberately leaves uncured, and which this seat independently reproduces.** Three landed-wrong findings, all figure- or enumeration-only, all against instruments and none against the corpus, are filed at §5. **None blocks.**

---

## §1 — THE RE-HASH AGAINST §ERRATA-R13's TABLE. **12 / 12 BYTE-IDENTICAL.**

The certificate's `§ERRATA-R13` table (`PIN-PURGE-CERT.md:739`–`:752`) was re-derived independently, as this seat's first act, before any other probe:

| # | file | §ERRATA-R13 row | this seat's re-hash | verdict |
|---|---|---|---|---|
| 1 | `waves/F-W0.md` | `3d62e5f4e78b` | `3d62e5f4e78b` | **MATCH** *(moved this round — the R11-6 append)* |
| 2 | `waves/F-W1.md` | `ab2437af09e0` | `ab2437af09e0` | **MATCH** *(unmoved)* |
| 3 | `waves/F-W2.md` | `0b967619bb35` | `0b967619bb35` | **MATCH** *(unmoved)* |
| 4 | `waves/F-W3.md` | `be86ae410118` | `be86ae410118` | **MATCH** *(unmoved)* |
| 5 | `waves/F-W4.md` | `2fb6e6d637bb` | `2fb6e6d637bb` | **MATCH** *(unmoved)* |
| 6 | `waves/F-W5.md` | `26aebcdc7bac` | `26aebcdc7bac` | **MATCH** *(moved this round — the one cure)* |
| 7 | `waves/F-W6.md` | `e83dcad051f5` | `e83dcad051f5` | **MATCH** *(unmoved)* |
| 8 | `waves/F-W7.md` | `ba9be3e37613` | `ba9be3e37613` | **MATCH** *(unmoved)* |
| 9 | `waves/F-W8.md` | `d8237cf6b11e` | `d8237cf6b11e` | **MATCH** *(unmoved)* |
| 10 | `waves/F-W9.md` | `b265bf677869` | `b265bf677869` | **MATCH** *(unmoved)* |
| 11 | `waves/F-W10.md` | `8ae0ad8fa623` | `8ae0ad8fa623` | **MATCH** *(unmoved)* |
| 12 | `conformance/CENSUS-CANONICAL.md` | **`f44362757458`** | **`f44362757458`** | **MATCH — FROZEN, fifth consecutive round** |

⊙ **The canonical pin did not move.** Row 12 stands at `f44362757458`, byte-identical to `§ERRATA-R13`'s, `§ERRATA-R12`'s, `§ERRATA-R11`'s, `§ERRATA-R10`'s, `§ERRATA-R9`'s and `§TABLE-R7`'s row 12.

⊙ **No stale pin propagated.** ⟨cmd⟩ `/usr/bin/grep -n '77854a06b2ee\|75a08eeee03a\|9415e4c93e57' waves/F-W*.md` → **∅ (exit 1)**. Reproduces the cert's `:689` claim exactly.

⊙ **The two moves are exactly the two the cert declares, and no third file moved.** ⟨cmd⟩ `git status --porcelain docs/tranches/X/fourier/` → precisely three rows: `M PIN-PURGE-CERT.md` · `M F-W0.md` · `M F-W5.md`. The canonical is not among them.

---

## §2 — `F-W5:347` AT THE FROZEN CANONICAL. **THE CURE HOLDS.**

### §2.1 The row reads 16, and it carries the chase

⟨cmd⟩ `/usr/bin/awk 'NR==347' waves/F-W5.md` returns, at the settled bytes:

> | **AA-44** | routed at the record to **F.W9/W10**, not to F.W5 — the canonical homes it **F.W9** (leg `F.W9/W10`) and lists it in the F.W9 roster of **16** ⟨*chased at repair round 13, 2026-08-30: read 17; re-based on `CENSUS-CANONICAL.md` §0.5 errata **E5-16** — `R2-7` → TERMINAL*⟩, so its holder is named and it is no debt of this wave | ⟨cmd⟩ `sed -n '87p' fr-AdminAuditLog.md` → … |

### §2.2 The edit is one numeral plus a chase, and NOTHING else moved

⟨cmd⟩ `git diff -U0 -- waves/F-W5.md` → **`@@ -347 +347 @@`. One line changed. One insertion, one deletion, file-wide.** The quoted `⟨cmd⟩` span is character-for-character identical on both sides of the diff — **the cure entered no quoted span**, exactly as `§ERRATA-R13·b` asserts.

### §2.3 The operand, re-derived three independent ways

- ⟨cmd⟩ `/usr/bin/grep -n '^### F.W9' conformance/CENSUS-CANONICAL.md` → `5126:### F.W9 — **16 rows** *(errata round 5, 2026-08-29: read 17; ` `R2-7` ` → TERMINAL at E5-16)*` — **declared heading = 16.**
- ⟨cmd⟩ `/usr/bin/grep -n 'E5-16' conformance/CENSUS-CANONICAL.md` → `:148` (the erratum row, *"F.W9 −1 (17 → 16) · TERMINAL +1"*) and `:3956` (`R2-7`'s TERMINAL row carrying the same sub-note). **The 17 is the errata-round-5 reading, superseded at E5-16, live in no state of the frozen operand.**
- **`17` is now absent from the corpus in this sense**: ⟨cmd⟩ `/usr/bin/grep -rn 'roster of 17' waves/` → **∅ (exit 1)**, against `F-W5.md` alone before the cure.

### §2.4 The three load-bearing clauses, re-verified — the row's function does not move

| clause | operand | re-run at the bytes | verdict |
|---|---|---|---|
| routed at the record to `F.W9/W10` | `fr-AdminAuditLog.md:87` | ⟨cmd⟩ `/usr/bin/sed -n '87p' …/registry/adjudicated/fr-AdminAuditLog.md` → *"- **AA-44 · L-18.** Zero frontend tests; nine e2e specs never exercise the audit tab (4 prose-only `audit` hits, my grep); … → **F.W9/W10**."* | **BYTE-TRUE.** The row's elided quotation reproduces character for character at both head and tail. |
| the canonical homes it **F.W9**, leg `F.W9/W10` | `CENSUS-CANONICAL.md:289` | ⟨cmd⟩ `/usr/bin/awk 'NR==289'` → `` | `AA-44` | — | `F.W9/W10` | **F.W9** <sub>legs: F.W9/W10</sub> | `` | **TRUE** |
| it **is** in the F.W9 roster | `CENSUS-CANONICAL.md:5128` | ⟨cmd⟩ `/usr/bin/awk 'NR==5128'` → `- **fr-AdminAuditLog** (1): `AA-44`` | **TRUE** |

⊙ **The row's function — excluding `AA-44` from this wave's 116 as no debt of F.W5 — is correct and is unchanged by the cure.** Only the decorative magnitude moved.

---

## §3 — BOTH COMPARATOR INSTRUMENTS, RE-BUILT AND RE-RUN BY THIS SEAT

Both instruments were rebuilt from the published descriptions rather than copied, and the superseded set was derived **mechanically** from the canonical's own `read **N**` / `N → N` errata prose, never transcribed.

**Derived SUPERSEDED set** (mechanical, `read`-form ∪ arrow-LHS, minus every LIVE authority value): `17 · 25 · 28 · 29 · 31 · 33 · 50 · 53 · 54 · 56 · 57 · 60 · 61 · 62 · 63 · 69 · 72 · 79 · 90 · 97 · 119 · 135 · 138 · 152 · 252 · 289 · 358 · 362 · 926 · 928 · 1012 · 1014 · 1190 · 2515 · 2768 · 4262 · 4269 · 4278 · 4322`.
**Derived LIVE wave magnitudes** (from the canonical's own §2 headings, read before any spec was opened): `F.W0 55 · F.W1 330 · F.W2 23 · F.W3 919 · F.W4 1007 · F.W5 27 · F.W5-W8 89 · F.W9 16`.

### §3.1 Instrument A — census-attributed row-magnitude binding, all eleven specs

**26 census-attributed superseded row-magnitude hits · 21 carrying an on-line chase · 5 read whole.** Each of the five adjudicated at the bytes:

| site | token | adjudication |
|---|---|---|
| `F-W0:581` | `1014` | **ACQUITS** — the dated R11-3 repair minute, which convicts `F-W7:291` and states in terms that *"at the frozen canonical that command returns **ZERO**"*. Lawful E-3 history. |
| `F-W2:346` | `29` | **ACQUITS** — a byte-true record quotation of `fr-PathPreview.md:114`, re-run whole and reproducing. |
| `F-W8:163` | `28` | **ACQUITS** — the wave's own carry-table heading. Re-counted at the section bounds `:163`–`:221`: **38 pipe-lines − 5 headers − 5 separators = 28** ✓. |
| `F-W10:420` | `69` | **ACQUITS** — the wave's own strict-roster figure over its **165** NO-WAVE-OWNER lines, derived in the same sentence (`31 ⊕ 68 ⊕ 32 ⊕ 1 ⊕ 33 = 165`) and expressly chased to *"**fourteen** after round 4 added the 69th, R4-7.3"*. Not a canonical wave magnitude. |
| **`F-W3:780`** | **`289`** | ▲ **CONVICTS. See §4.** |

The three further sites the certificate names as acquittals fell into this instrument's **chased** bucket rather than its read-whole bucket, and each was re-verified independently: **`F-W0:114`** (the 28 dirty tree paths, enumerated item-for-item; a tree count, no census magnitude) · **`F-W2:436`** (`### 8c. The wave's own §3 row ledger (29 rows — index, no gate weight)`, which declares its own weightlessness) · **`F-W5:271`** (a live corpus receipt — see §3.4).

### §3.2 Instrument B — the four-form wave-magnitude comparator

Built on four **denominated** regular forms (`F.W<k> (N rows)` · `F.W<k> … roster is/of N` · `N-row F.W<k>` · `the N F.W<k> rows`) and compared against the canonical's own per-wave §2 headings:

| site | claim | canonical | verdict |
|---|---|---|---|
| `F-W0:25` | `F.W0` = 55 | 55 | **MATCH** |
| `F-W3:40` | `F.W3` = 919 | 919 | **MATCH** |
| **`F-W5:347`** | **`F.W9` = 16** | **16** | **MATCH — the cure holds** |
| `F-W9:131` | `F.W9` = 16 | 16 | **MATCH** |
| `F-W10:363` | `F.W9` = 16 | 16 | **MATCH** |

**5 pairs captured · 0 chased mismatches · ZERO UNCHASED MISMATCHES.** The certificate's *"3 pairs"* is the `F.W9` roster triple; this seat's denominated forms capture two further pairs, and both also match. **Either reading returns zero unchased mismatches.**

### §3.3 `F-W5:347` returns under NEITHER instrument

Under **A** the line now carries a chase token, so it never reaches the read-whole bucket. Under **B** it captures as `F.W9 = 16` and **matches the canonical exactly**. ⊙ **The cure is confirmed by both instruments independently.**

### §3.4 The false-positive class, re-adjudicated so no successor re-files it

A looser noun-binding (the R11-6 addendum's own stated predicate, `N rows` / `N records` / `roster of N` / `N-row`) admits three further read-whole candidates. All three acquit at the bytes, and all three are **value collisions**, not census magnitudes:

- **`F-W9:173` and `F-W10:53`** — the identical BLOCKER receipt in both specs. Re-run: ⟨cmd⟩ `/usr/bin/grep -o 'F\.W9/W10' fr-*.md | /usr/bin/wc -l` → **54** · `-l … | wc -l` → **25 records** · `ls fr-*.md | wc -l` → **66**. **All reproduce.** The `25` is a live record count, not a superseded census magnitude.
- **`F-W8:218`** — the token is inside *"corrected (D-5)**: the prior \"17 rows\" was arithmetically …"*, a self-declared correction of a prior figure. Chased in substance.

---

## §4 — THE SURVIVING MEMBER, INDEPENDENTLY REPRODUCED

### `F-W3:780` — a superseded canonical magnitude in the present indicative, unchased. **CONFIRMED, and correctly left uncured.**

The line publishes *"the five carry **289** rows between them"*, attributed expressly to **canonical §4.2**.

- **The operand contradicts it.** ⟨cmd⟩ `/usr/bin/awk 'NR==182' conformance/CENSUS-CANONICAL.md` → erratum **E6-5**, which rules in terms: *"§4.2 published … carry **289 rows** between them … Corrected to **282** with both readings disclosed."*
- **Re-summed independently from the five criterion-negatives' own §1 headers**, read fresh from the frozen canonical (`:768` · `:1265` · `:2133` · `:2462` · `:2753`): `79 + 73 + 46 + 32 + 52 = ` **282** ✓.
- **Not one chase token.** ⟨cmd⟩ `/usr/bin/awk 'NR==780' waves/F-W3.md | /usr/bin/grep -oE 'errata|chased|superseded|E6-5|282|repair round|~~'` → **∅ (exit 1)**.

⊘ **The certificate's disposition is correct and this seat endorses it.** `waves/F-W3.md` is not a writable file at this round; the member is **RECORDED and deliberately UNCURED**, and `§ERRATA-R13·c` says so rather than certifying a universal its own instrument falsifies. **That is the right call**, and it is the same discipline `§ERRATA-R12·b` applied and `PASS-12/SEAL.md` §5 taught. A round-14 repair with `F-W3` writable cures it in one numeral plus a chase, in the idiom `F-W5:347`, `F-W10:363` and `F-W9:131` now share three times over.

⊘ **`PASS-13/CHECK.md` §5's mitigation *"a single, isolated member … the class is one row wide"* and §8's *"the next hostile pass should find nothing"* are FALSIFIED at the settled bytes — and the certificate already says so.** Recorded here, not re-filed as new.

---

## §5 — LANDED-WRONG, FILED IN THIS SEAL ONLY. **THREE, ALL AGAINST INSTRUMENTS, NONE AGAINST THE CORPUS. NONE BLOCKS.**

### LW-13-1 — `§ERRATA-R13·c`'s `'289 rows'` sweep claim is falsified by its own bytes. **LOW.**

`PIN-PURGE-CERT.md:707` publishes ⟨cmd⟩ `/usr/bin/grep -rn '289 rows' waves/ conformance/` → **"the line itself and the canonical's E6-5 row, and nothing else."** Re-run at the settled bytes, the sweep returns **FOUR** lines, not two:

```
waves/F-W0.md:598                        ← the round's own R11-6 addendum
waves/F-W3.md:780                        ← the member
conformance/CENSUS-CANONICAL.md:182      ← the E6-5 row
conformance/PIN-PURGE-CERT.md:707        ← the claiming line itself
```

Both unaccounted matches are **self-matches of the receipt's own quoted pattern** — the string `'289 rows'` inside the `⟨cmd⟩` span. **`F-W0:598` is LAWFUL**: the R11-6 addendum carries a declared-first self-exclusion clause (*"THIS ADDENDUM'S OWN BYTES ARE EXCLUDED from every count in it and are an operand for no gate"*), which places it squarely in the round-10 enumerated lawful class. **`:707` carries no such clause**, so the certificate's enumeration is stale against its own publishing act — the exact write-then-measure ordering `§ERRATA-R13·b` discharges for the `F-W5` cure and does not discharge here.

⊘ **Why LOW and why it does not block.** The **substantive** claim is TRUE and unmoved: `F-W3:780` was adjudicated by no pass, check or certificate in thirteen rounds, and the two extra matches are *this round's own act of filing it*. Nothing is denominated against the enumeration; no gate reads it. **Curable by a successor in one clause; must not be read as impeaching the finding it decorates.**

### LW-13-2 — `§ERRATA-R13·b`'s *"command spans → 108 → 108 (distinct 101 → 101)"* publishes no instrument and reproduces under none. **INFO.**

The figures are published without the command that produced them. This seat built five candidate spellings over `F-W5.md` and **none returns 108 or 101**:

| candidate instrument | measured |
|---|---|
| `/usr/bin/grep -o '⟨cmd⟩' F-W5.md \| wc -l` | **126** |
| `/usr/bin/grep -c '⟨cmd⟩' F-W5.md` | **74** |
| `⟨cmd⟩`-followed backticked spans | **94** (distinct **90**) |
| shell-shaped backticked spans | **261** (distinct **223**) |
| `⟨cmd⟩` occurrences, every wave in the corpus | 88 · 168 · 110 · 153 · 85 · 96 · **126** · 152 · 184 · 93 · 161 — **no file returns 108** |

⊘ **The CLAIM the figures carry — invariance across the edit — DOES reproduce, under all five.** Measured on the `HEAD` blob and on the settled bytes, every one of the five returns an identical value (`126 → 126` · `74 → 74` · `94 → 94` · `90 → 90` · `433 → 433`), because the cure adds no command span. **The unreproducible artefact is the absolute figure, not the property it was cited for.** Figure-only; no gate reads it; does not block.

### LW-13-3 — the same instrument-A run is published with two different tallies, and neither instrument states the reconciliation. **INFO.**

`waves/F-W0.md:598` (R11-6) publishes **"48 hits · 41 carrying an on-line chase · 7 read whole"**. `PIN-PURGE-CERT.md:705` (`§ERRATA-R13·c`) publishes **"49 hits · 42 on-line chased · 7 read whole"** for the same instrument in the same round.

⊘ **The `+1 / +1` is reconcilable and this seat reproduced its direction independently**: the certificate's run necessarily post-dates the addendum landing, so the addendum's own line enters the certificate's count as a 49th (chased) hit — precisely the line the addendum's declared-first clause excludes from its own. Re-running the addendum's stated predicate, this seat measures **53 including `F-W0:598` / 52 excluding it — the identical `+1` step**. The absolute totals differ from both published figures because the exact python sweep is published in neither instrument and cannot be reproduced from prose.

⊘ **The ADJUDICATED OUTCOME is identical in all three runs** — the certificate's, the addendum's, and this seat's: **six acquit, ONE convicts, and the one is `F-W3:780`.** Scope-disclosure, not arithmetic; does not block.

---

## §6 — RECEIPT REALITY. **29 RECEIPTS RE-RUN. `fabricated = 0`.**

Every figure below was measured by this seat at the settled bytes. **≥10 across `F-W5`, its self-count receipts included, as ordered.**

### §6.1 `F-W5` self-count receipts — the file counting its own bytes

| # | ⟨cmd⟩ | published | measured | verdict |
|---|---|---|---|---|
| 1 | `/usr/bin/wc -l < F-W5.md` | **433** | **433** | ✓ |
| 2 | `/usr/bin/grep -cE '^\| \*\*[A-G][0-9]+c?\*\*' F-W5.md` *(the `:269` self-count)* | **93** | **93** | ✓ |
| 3 | §3 gate rows `G1`–`G22`, same pattern | **22** | **22** | ✓ |
| 4 | clause rows = 93 − 22 | **71** | **71** | ✓ |
| 5 | the §-decomposition of the 71 | §A 6 · §B 5 · §C 5 · §D 16 · §E 20 · §F 9 · §G 10 | **6 · 5 · 5 · 16 · 20 · 9 · 10** | ✓ **sums to 71; 22 + 71 = 93** |
| 6 | *"no clause is numbered D9"* | D1–D8, D10–D17 = 16 | `D9` absent; **16 D-clauses** | ✓ |
| 7 | `G1c`–`G10c` enumerated | **10** | **10**, contiguous | ✓ |

### §6.2 `F-W5` corpus receipts — the band probe at `:107` / `:271`

| # | ⟨cmd⟩ (base = `registry/adjudicated`) | published | measured | verdict |
|---|---|---|---|---|
| 8 | `/usr/bin/grep -rho 'F\.W5-W8' fr-*.md \| wc -l` / records | **120 / 26** | **120 / 26** | ✓ |
| 9 | `/usr/bin/grep -rho 'F\.W5–W8' fr-*.md \| wc -l` / records | **72 / 24** | **72 / 24** | ✓ |
| 10 | union | **192 / 49 records** | **192 / 49** | ✓ |
| 11 | `comm -13` of the two file lists — en-dash-ONLY | **23** | **23** | ✓ |
| 12 | `/usr/bin/grep -row 'F\.W5' fr-*.md \| wc -l` | **245** | **245** | ✓ |
| 13 | the same with `-rw` (lines) | **240** | **240** | ✓ |
| 14 | the same with `-rlw` (records) | **54** | **54** | ✓ |
| 15 | sole-`F.W5` = 245 − 192 | **53** | **53** | ✓ |

### §6.3 `F-W5` provenance and operand receipts

| # | ⟨cmd⟩ | published | measured | verdict |
|---|---|---|---|---|
| 16 | `ls docs/tranches/X/fourier/carry/` | `F-W1-CARRY.md  F-W4-CARRY.md` | identical, two entries | ✓ |
| 17 | `ls "$R"/fr-*.md \| wc -l` | **66** | **66** | ✓ |
| 18 | `/usr/bin/grep -lw 'P-9' fr-*.md \| wc -l` *(the G19 zero-cell)* | **0** | **0** | ✓ |
| 19 | `/usr/bin/grep -nE '^### F\.W5(-W8)? — ' CENSUS-CANONICAL.md` | `5078` = 27 · `5092` = 89 · **27 + 89 = 116** | identical, **116** | ✓ |
| 20 | `sed -n '87p' fr-AdminAuditLog.md` *(the `:347` quotation)* | the elided head and tail | reproduces **character for character** | ✓ |

### §6.4 Canonical, cert and corpus-wide receipts

| # | ⟨cmd⟩ | published | measured | verdict |
|---|---|---|---|---|
| 21 | `CENSUS-CANONICAL.md:5126` | `### F.W9 — **16 rows**` | identical | ✓ |
| 22 | `CENSUS-CANONICAL.md:148` — erratum **E5-16** | `F.W9 −1 (17 → 16)` | identical | ✓ |
| 23 | `CENSUS-CANONICAL.md:289` / `:5128` | `AA-44` home **F.W9**, leg `F.W9/W10`; roster lists it | both resolve | ✓ |
| 24 | `/usr/bin/grep -rn 'roster of 17' waves/` | **∅** | **∅ (exit 1)** | ✓ |
| 25 | the three-digest stale-pin sweep | **∅** | **∅ (exit 1)** | ✓ |
| 26 | `F-W8:163` carry table, `38 − 5 − 5` | **28** | **38 − 5 − 5 = 28** | ✓ |
| 27 | the five criterion-negatives' §1 headers | **282** | `79 + 73 + 46 + 32 + 52 = ` **282** | ✓ |
| 28 | quoted canonical row headings, all eleven | **24 → 24** | **24** at `HEAD`, **24** at the settled bytes | ✓ **invariant** |
| 29 | `N records` claims, all eleven | **157 → 157** | **157** at `HEAD`, **157** at the settled bytes | ✓ **invariant** |

⊙ **`F-W0`'s append displaced no coordinate, verified structurally rather than asserted.** ⟨cmd⟩ `git diff -U0 -- waves/F-W0.md` → **`@@ -596,0 +597,2 @@`** — a pure end-of-file append, `596 → 598` lines. **R11-5 law 4 satisfied by construction**, exactly as `§ERRATA-R13·b` claims.

**Not one published number in the `F-W5` cure's write-then-measure block failed to reproduce. `fabricated = 0`.** The three figures that do not reproduce are filed at §5 and belong to instruments, not to the corpus.

---

## §7 — WHAT THIS SEAT DID NOT DO

| discipline | verdict |
|---|---|
| **ZERO edits** | ✓ — no file in `waves/`, the canonical, the certificate, `carry/` or the registry was written. `git status --porcelain docs/tranches/X/fourier/` returns the same three rows before and after this seat's work. |
| **no product source opened** | ✓ — this seat read only the eleven specs, the canonical, the certificate, the `PASS-12`/`PASS-13` instruments, and one frozen `fr-*.md` record (`fr-AdminAuditLog.md`, for the `:87` quotation). |
| **landed-wrong in the seal only** | ✓ — the three findings at §5 are recorded here and patched nowhere (E-3). |
| **no write after the hash block** | ✓ — the shasum below was taken as the absolute last measurement, and this file's final byte is its closing fence. |
| **the class is not certified closed** | ✓ — `F-W3:780` survives, is named, and is owed to round 14. This seal certifies the round-13 cure, not a universal. |

---

## §8 — THE CLOSING HASH. **TAKEN AS THE ABSOLUTE LAST ACT OF THIS SEAT.**

⟨cmd⟩ this seat, 2026-08-30, **base = repo root `/Users/mkbabb/Programming/value.js`**, on the pinned BSD toolchain, taken after every probe above had settled and no file remained to be measured:

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
be86ae4101184d8d7278879f5ab5a8abc9102fbcfdfb554d0523affde576bfcf  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W3.md
2fb6e6d637bb6d0fad710716fb1dfa103d39fc41f67d8ff0fb856e4c0126cdb6  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W4.md
26aebcdc7bacb6bc85e31b3bf1205097bacb4311855ade0fe1c581784ff2ad85  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W5.md
e83dcad051f560329ade30dbb0877732650ac05071e8b2ee0eab22f56abf7e11  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W6.md
ba9be3e376139204a17ad7b5ebc858513bc3880e26f63f7340ebce14145547d7  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W7.md
d8237cf6b11ef248e4080b8d805a2ee7477139b8d4cf9cf3564922096e29bd45  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W8.md
b265bf677869b0ec6f3c02c54b93272f657111e55498cf05bef14578d6c4b53b  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W9.md
f443627574581ec2a4138e46d927b5fc431a7a6657cae766f7ffafa01e770968  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md
a3861e158e4983976b6b9910395a507fc85b62c5671dd37e0b0cb97a195d18f8  /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/conformance/PIN-PURGE-CERT.md
```

**THIRTEEN ROWS. The eleven waves and the canonical reproduce `§ERRATA-R13`'s twelve rows byte-identical; the certificate itself is pinned here at `a3861e158e49` as the thirteenth, so a successor can prove whether this seal read the same certificate it verified. The canonical stands at `f44362757458` — FROZEN for a fifth consecutive round of repair.**
