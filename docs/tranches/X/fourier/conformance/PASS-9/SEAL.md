# X·F ROUND 9 — THE SEAL. VERIFY-ONLY, ZERO EDITS.

**Seat**: round-9 seal seat, 2026-08-29. **Base** = repo root `/Users/mkbabb/Programming/value.js`, BSD toolchain, `/usr/bin/grep` and `/usr/bin/sed` where the receipt spells them.

**Mandate**: re-hash and diff against `PIN-PURGE-CERT.md` §ERRATA-R9's fresh table; re-run every round-9 re-cut receipt against published bytes; verify the K1 paste cure, the F-W4:305 derivation, the F-W1 §6·R5 restatement and both F-W8 splice repairs; write this seal. **This seat edited nothing.** It read, it ran commands, and it wrote this one file. No spec, no census, no certificate was touched — E-3 holds, and a verify seat that repairs what it audits has destroyed the evidence it was sent for.

⊘ **No certificate issues its own conformance, and no seal issues its own either.** What follows is thirty re-run receipts and three landed-wrong findings. The findings are **recorded here and nowhere else**; two of them are defects the round-9 repair *introduced*, and naming them is the whole reason this seat runs after the write rather than during it.

---

## §1 — VERDICT

| axis | result |
|---|---|
| **Hash table (§ERRATA-R9 lines 407–418)** | **BYTE-IDENTICAL, 12 of 12.** `diff` clean against a fresh `shasum` |
| **Canonical pin** | **`f44362757458`-prefixed** ✔ — full digest `f443627574581ec2a4138e46d927b5fc431a7a6657cae766f7ffafa01e770968`, **FROZEN**, byte-identical to §TABLE-R7 row 12 |
| **Round-9 re-cut receipts** | **30 GREEN** (§2), **2 RED** (LW-1, LW-2) |
| **Re-based canonical coordinates** | **12 verified** against a floor of 8 — every one addresses exactly what its citing text claims; every superseded coordinate confirmed DEAD |
| **K1 paste cure** | **EXACT** against `CENSUS-CANONICAL.md:393` |
| **F-W4:305 derivation** | **16 distinct records, re-counted by this seat from the bullets, not from the header** ✔ |
| **F-W1 §6·R5 restatement** | **RE-MEASURED GREEN** — 24 rows · 22 BOOKED · 1 DISPOSED · 1 ∅ |
| **F-W8 splice repairs** | **BOTH read as complete sentences with the strikes removed** ✔ |
| **Landed wrong** | **3** — LW-1 (MEDIUM), LW-2 (MINOR), LW-3 (MINOR, in the certificate's own prose) |

▲ **The pins are sound and the substance of every round-9 repair holds.** No finding below moves a digest, voids a coordinate, or falsifies a cure. Two findings are the *repair's own footprint*: the round-9 block that cured a self-refuting receipt broke a neighbouring receipt and re-created its own defect one level up.

---

## §2 — THE RECEIPTS, RE-RUN

### §2.1 Hashes (R-1 … R-4)

| # | receipt | result |
|---|---|---|
| **R-1** | `shasum -a 256 waves/F-W*.md conformance/CENSUS-CANONICAL.md`, diffed against §ERRATA-R9's pasted block (cert lines 407–418) | **`diff` CLEAN — 12/12 byte-identical**, glob order preserved, `F-W10` sorting after `F-W1` exactly as published |
| **R-2** | canonical prefix | **`f44362757458`** ✔ |
| **R-3** | row 12 vs §TABLE-R7 row 12 | **unmoved — FROZEN** ✔; the census was frozen for the whole round and every repair was cut against it |
| **R-4** | the six-changed / six-unchanged partition | ✔ — rows **2 · 4 · 5 · 6 · 7 · 9** moved; rows **1 · 3 · 8 · 10 · 11 · 12** carry `*(unmoved)*` and re-hash unmoved. `6 + 6 = 12`, and the enumeration at cert line 393 names exactly the six unmoved |

### §2.2 The F-W8:328 discriminator (R-5 … R-8)

The round-9 re-cut of LW-R8-c. Run from `docs/tranches/X/fourier`.

| # | receipt | published | measured |
|---|---|---|---|
| **R-5** | `` /usr/bin/grep -nE '^\| [0-9]+ \| fr-[A-Za-z]+ \*\*' waves/F-W8.md \| /usr/bin/grep -o 'ConvergencePlot' `` | **NO OUTPUT** | **NO OUTPUT** (exit 1) ✔ |
| **R-6** | the same filter `| wc -l` | **40** | **40** ✔ |
| **R-7** | the row numbers the filter emits | rows `1`–`40` | **`1 2 3 … 39 40`, contiguous, no gap, no repeat** ✔ |
| **R-8** | `/usr/bin/grep -n 'ConvergencePlot' waves/F-W8.md` (the round-8 probe the re-cut convicts) | **SIX** — `:20` + `:40 :78 :165 :246 :328` | **SIX, at exactly those six lines** ✔ |

▲ **The discriminator is sound and the diagnosis is exact.** `:20` is the canonical-heading quotation; the other five are round-8 chase-note prose, `:328` among them — the line that states the claim. **Not one is a §6a citation row**, and a chase note cannot enter the filter by construction, because the filter anchors on `^| N | fr-Name **`. The re-cut takes the `grep -o` word-output form rather than a hit-count, so a later edit cannot silently falsify it the way round 8's was falsified by the very edits that banked it.

### §2.3 The FM-18 restatement and its two siblings (R-9 … R-11, and LW-1/LW-2)

Run from `docs/tranches/X/fourier/waves`, the base the receipt declares.

| # | receipt | published | measured |
|---|---|---|---|
| **R-9** | `/usr/bin/grep -c 'FM-18' F-W4.md` | **`0` before this block · `1` after it** | **1** ✔ — the R3-3.8 pairing's "after" arm re-runs exact |
| **R-10** | sibling `:117` — `/usr/bin/grep -oE "\bBC-10\b" F-W4.md | wc -l` | `0` → **12** | **12** ✔ |
| **R-11** | sibling `:192` — `/usr/bin/grep -c 'shape only' F-W4.md` | `0` → **1** | **1** ✔ (sole hit `:192`) |
| — | sibling `:192` — `/usr/bin/grep -c 'showImageOverlay' F-W4.md` | `0` → **1** | **2** ✗ — **LW-1** |

⊙ **R-10 is worth a sentence, because it is the counter-example that proves the class.** The round-9 block quotes the literal string `\bBC-10\b` in its own prose, yet the count did **not** move: `\b` before `B` cannot match, because the preceding byte is the `b` of the escape and both are word characters. **The word-boundary form immunised the receipt against the edit that cites it** — which is precisely the R3-3.10-compliant shape this corpus has been arguing for, here demonstrated rather than asserted. Its unanchored sibling was not so lucky (LW-1).

### §2.4 The F-W6:131 range re-cut (R-12 … R-14)

| # | receipt | published | measured |
|---|---|---|---|
| **R-12** | `` sed -n '5078,5091p' "$C" | grep -c 'fr-CanvasOverlayButton\|fr-DarkModeToggle\|fr-GlassTimeline\|fr-HarmonicLevelGrid' `` | **0** | **0** ✔ |
| **R-13** | the struck range `4990,5038p`, re-run verbatim | **3** | **3** ✔ — and the three are exactly `fr-GlassTimeline` · `fr-HarmonicLevelGrid` · `fr-DarkModeToggle`, as the strike names them |
| **R-14** | `` grep -nE '^### F\.W5(-W8)? — ' "$C" `` | `### F.W5` at `:5078`, roster `:5078`–`:5091` | ✔ — heading at **`:5078`**, next heading `### F.W5-W8` at **`:5092`**, so the roster closes at `:5091` exactly as claimed |

▲ **The struck defence was rightly struck, not repaired.** A stamp on a file's *bytes* is not a stamp on its *line numbers*; the old range now addresses the `### F.W3` roster. ⊘ Cross-check this seat ran unbidden: the F.W5 roster's eleven bullets sum `4+11+1+1+1+2+2+1+2+1+1 = 27`, matching its own `**27 rows**` heading and the `28 → 27` E6-3 re-base. The roster is internally consistent.

### §2.5 The re-based canonical coordinates — 12 verified against a floor of 8 (R-15 … R-24)

Every round-9 re-base site in the corpus, enumerated by this seat rather than taken from the certificate's summary.

| # | site | published → measured | verified |
|---|---|---|---|
| **R-15** | `F-W3:383` | `4393` → **`4433`** | ✔ `4433` = `` \| `PP-NOSHADOW` \| — \| `F.W3/W4` · `F.W1` \| **F.W3** <sub>file-criterion → §5.d</sub> <sub>legs: F.W1</sub> `` — every cell and both `<sub>` legs reproduce |
| **R-16** | `F-W3:416` | `1761`/`1764` → **`1875`/`1878`** | ✔ the receipt's own `` /usr/bin/grep -nE '^\| `D/D-(11\|17)`' `` re-runs and returns **both lines byte-identically**, including the `<sub>legs: F.W4</sub>` the round-9 repair restored |
| **R-17** | `F-W3` superseded coordinates | `4393` · `1761` · `1764` | ✔ **all three DEAD** — they now address `Contract-v2`, `N-1`, `N-4` respectively |
| **R-18** | `F-W8:15` | `5393,5396p` → **`5488,5491p`** | ✔ `diff` clean: the four pasted lines (`F-W8:16–19`) are **byte-identical** to `sed -n '5488,5491p'` |
| **R-19** | `F-W8:15` superseded range | `5393,5396p` | ✔ **DEAD** — returns four §2 UNROUTED per-record bullets, exactly as the note discloses |
| **R-20** | `F-W8:20` | `grep -nE '^### F\.W5(-W8)? — '` | ✔ **byte-identical** — `5078:### F.W5 — **27 rows** …` · `5092:### F.W5-W8 — **89 rows** …` |
| **R-21** | `F-W8:81` | `5034` → **`5428`** | ✔ `:5428` = `- **fr-PaperSearchDropdown** (1): `C:C-23``, enclosing heading `### UNROUTED` at `:5386` — **the classification half re-verifies too**. Old `:5034` now reads `fr-ContourSettings (1): i-8` — DEAD. Canonical row at `:4098` reads **UNROUTED**; record `:77` ends **`F.W5-W8 = no rows.`** — both halves confirmed at source |
| **R-22** | `F-W8:246` (A) | `5044`/`5091`/`5358` → **`5084`/`5131`/`5397`** | ✔ three lines verbatim, **and all three classifications hold**: `:5084` ⊂ `### F.W5` (`:5078`–`:5091`) · `:5131` ⊂ `### F.W9` (`:5126`) · `:5397` ⊂ `### UNROUTED` (`:5386`) |
| **R-23** | `F-W8:246` (A) | filter `| /usr/bin/grep -c 'L:L-5'` | **1** ✔ — the fixed-string filter does exclude the second `L:L-5` by construction, as claimed |
| **R-24** | `F-W8:246` (B) | `4968`/`5044` ⊕ `1305`/`4037` → **`5008`/`5084`** ⊕ **`1365`/`4078`** | ✔ four lines, **and every routing reproduces**: `:5008` ⊂ `### F.W3` · `:5084` ⊂ `### F.W5` · `:1365` = `` \| `L:L-5` \| — \| `F.W5` \| **F.W5** \| `` · `:4078` = `` \| `L:L-5` \| — \| `F.W3/W4` \| **F.W3** <sub>file-criterion → §5.c</sub> \| `` |

⊙ **Twelve distinct re-based coordinates verified — 3 in F-W3, 9 in F-W8 — against a mandate floor of eight.** The class is genuinely cured at every site this seat could find. **The certificate's count of it is not: see LW-3.**

### §2.6 The K1 paste cure (R-25)

| # | claim | verification |
|---|---|---|
| **R-25** | `F-W1:650`'s cure sub-notes that the canonical "now reads `` \| `K1` \| — \| `F.W1` \| **TERMINAL (∅)** \| ``" | ✔ **EXACT.** `CENSUS-CANONICAL.md:393` reads `` \| `K1` \| — \| `F.W1` \| **TERMINAL (∅)** <sub>*errata R6 E6-3 …*</sub> \| `` — cell for cell. The pre-E6-3 paste asserting home `**F.W1**` is **struck**, and the struck half is what the §6·R5 header's `f44362757458` warrant made false |

▲ **The row is no longer self-contradictory.** Its landing cell disposes the id *because* E6-3 re-homed it, and the canonical paste beside it now says the same thing. The cure took the shape the round already used at `F-W4:319`, which is the right kind of consistency: a repair that matches its sibling repair.

### §2.7 The F-W4:305 derivation — re-counted from the bullets (R-26, R-27)

⊘ **This seat counted the distinct names itself, from the bullets, and did not read the header's arithmetic back to itself.** R4-7.3 makes the list authoritative over any count-word; a verify seat that checks a header against its own restatement has verified nothing.

**Group records, 8** — `fr-MorphShapePreview` (20) · `fr-VisualizationView` (17) · `fr-DarkModeToggle` (7) · `fr-ConvergenceTimeline` (7) · `fr-ContourEditorCanvas` (4) · `fr-ImageUpload` (3) · `fr-EquationView` (3) · `fr-EquationPanel` (2). **Sum = `20+17+7+7+4+3+3+2` = 63.** ✔

**Live single records, 8** — `fr-BasisCanvas` · `fr-CoefficientsSpectrum` · `fr-EquationResult` · `fr-FourierMorphSvg` · `fr-HarmonicLevelGrid` · `fr-PaperView` · `fr-SliderControl` · `fr-SpeedSelect`. **Sum = 8.** ✔

| # | check | result |
|---|---|---|
| **R-26** | overlap between the two lists; total distinct; row re-sum | **overlap ∅** (`fr-ContourEditorCanvas` ≠ `fr-ContourPreview`; `fr-EquationView` ≠ `fr-EquationResult` ≠ `fr-EquationPanel` — the near-collisions are distinct records). **TOTAL DISTINCT = 16** ✔ and **`63 + 8 = 71`** re-sums GREEN against the row half |
| **R-27** | the ninth singles name | ✔ `fr-ContourPreview` appears in the singles bullet **inside `~~…~~`**, carried solely by `KILL-3`; canonical `:1386` homes `KILL-3` **TERMINAL (∅)** under the `### TERMINAL (∅)` roster. **So it is not a live single, and `17` was true before E6-3 and false after it** — exactly as the re-derivation says |

⊙ Cross-check: canonical `:5333` lists `KILL-3` among `fr-ContourPreview`'s 15 rows, but that bullet sits under `### TERMINAL (∅)` (`:5317`), so it is the *correct* home, not a stale survival. **No finding.**

### §2.8 The F-W1 §6·R5 restatement — re-measured (R-28, R-29)

| # | check | published | measured |
|---|---|---|---|
| **R-28** | the table's rows and their dispositions | 24 named · 1 struck at E5-6 · **22 BOOKED + 1 DISPOSED** | ✔ **24 rows** at `:648`–`:671`; `fr-EquationView vue-tsc` = `∅ — NO ROW EXISTS` (the E5-6 amendment); of the remaining 23, **22 carry a live `BOOKED`** and `fr-AdminFlaggedPanel K1` carries `~~**BOOKED …**~~ **DISPOSED**`. `22 + 1 = 23` ✔ |
| **R-29** | the K1 record-qualification | `K1` in **fourteen** corpus records | ✔ **14**, re-run at the frozen corpus — and the fourteen names match the published list **exactly, in order** |

▲ **Both restatements are honest and both re-measure.** The struck universal ("nothing mints a row the canonical does not home at F.W1") was falsified by E6-3 of exactly one row, and striking it for the enumeration was the right call: a universal that must except the case its own table already discloses is doing no work.

### §2.9 The two F-W8 splice repairs (R-30)

| # | site | struck fragment | reads as a complete sentence? |
|---|---|---|---|
| **R-30a** | `F-W8:81` | `~~— a wave with zero record-side rows may not settle a record-side reading, and this one does not try.~~` | ✔ **"… The band roster is 89, not 90. The id is cited to its holder at §6a's header."** Clean. Struck rather than re-attached **because the inserted block already quotes the identical clause verbatim two sentences above** — re-attaching would publish it twice |
| **R-30b** | `F-W8:324` | `~~in the band.~~` | ✔ **"… The band roster is 89, not 90. The canonical governs; the divergence is F-W5's and the census's to settle, never this wave's, and citing it here is the difference between a disagreement that is recorded and one that is hidden by silence."** Clean. Struck **because E5-15 made it false** — the canonical no longer homes `C:C-23` in the band at all |

⊙ **Two artifacts, two different reasons, both correct and both distinct.** The literal `"The band roster is **89**, not 90. in the band."` the check quoted is gone. Neither repair rewrites surrounding prose, which is what makes them auditable.

---

## §3 — LANDED WRONG

**Three.** None moves a pin. **Two were introduced by the round-9 repair itself** — the seat that cured a self-refuting receipt left two new ones behind, in the same shape.

### LW-1 — `F-W4:192`'s `showImageOverlay` receipt is falsified by the round-9 block that cites it as GREEN. **MEDIUM.**

**Published at `:192`** ⟨cmd⟩ `grep -c 'showImageOverlay' F-W4.md` → **`0`** before the block, **`1`** after — *"one occurrence each, both inside this row, which is the booking proved"*.

⟨cmd⟩ **this seat, verbatim → `2`.** Hits at **`:192`** (the receipt) and **`:347`** (the round-9 FM-18 restatement).

**Attribution is exact, and this seat proved it rather than inferring it:**

| bytes | `grep -c 'showImageOverlay'` |
|---|---|
| round-8 commit `c3bbb168` | **1** ✔ — the published figure was TRUE when written |
| round-9 settled (`052731a56a12`) | **2** ✗ |

⊘ **The round-9 block at `:347` spells the token in full inside the very sentence that certifies it**: *"its two siblings at `:117` … and `:192` (`grep -c 'showImageOverlay' …` → `0` → `1`) both carry the pairing and **both re-run GREEN**."* At the bytes that sentence settled into, one of the two does not. **This is LW-R8-c's class exactly — a receipt falsified by the edits that banked it — reproduced by the repair sent to cure it**, and it is the sharper instance, because round 8 falsified a probe about *another* file's table while round 9 falsified a *neighbour's live receipt* while quoting it as evidence. **The substance survives**: both occurrences are the token in a probe or a citation of a probe, and `D:m-6`'s booking is untouched. Only the arithmetic is now wrong, and it is wrong in a cell that claims to have checked it.

▲ **The cure is the one R-10 already demonstrates in this same block**: anchor the probe (`grep -c '\bshowImageOverlay\b'` does not help here — the token is its own word at both sites), or re-cut to the shape `:117` uses, whose `\b`-escaped literal is immune to being quoted. **Round 10's operand, not this seat's to write.**

### LW-2 — `F-W4:347`'s byte-level universal is falsified by the sentence that states it. **MINOR.**

**Published**: *"the single hit IS this line: **the sole occurrence of `FM-18` at any byte of this spec is the command string quoted immediately above**."*

⟨cmd⟩ this seat: `grep -c` → **1** ✔ (R-9, GREEN — `grep -c` counts *lines*). But `grep -oE 'FM-18' | wc -l` → **2**: the command string, **and the prose clause making the claim**.

| bytes | `FM-18` byte-occurrences |
|---|---|
| round-8 commit `c3bbb168` | **1** — the universal was TRUE |
| round-9 settled | **2** — the restatement added the second |

⊘ **The repair narrowed the defect without escaping it.** Round 8's `→ 0` was *impossible* — no bytes containing the line could return it. Round 9 replaced it with a count that is *correct as a line-count* but attached to a universal quantified over **bytes** (*"at any byte"*), which its own clause refutes. **The receipt is GREEN and the sentence around it is not.** The substantive claim — *"the band's middle member appears at no **substantive** byte of this spec"* — is **TRUE and unaffected**, and the block states it two clauses later, which is why this is MINOR and not a fabrication: the honest form is already on the page, sitting beside a stronger one that is false.

### LW-3 — `PIN-PURGE-CERT.md` §ERRATA-R9 row 9 undercounts the re-based coordinates: **"eight" should be eleven.** **MINOR (count-word; certificate prose).**

**Published** (cert `:391`): *"eight dead canonical coordinates re-based **(three of them found by this seat's own sweep, at the masthead)**"*.

**Measured by this seat — every round-9 re-base site in `F-W8`:**

| site | dead coordinates re-based | in `PASS-9/CHECK.md`'s table? |
|---|---|---|
| `F-W8:15` (masthead) | `5394` · `5393` · `5396` → the `5488,5491p` range | **NO** — the spec itself says *"Found by this seat's own round-9 sweep … **not by the pass-9 check's list**"* |
| `F-W8:81` | `5034` | yes |
| `F-W8:246` (A) | `5044` · `5091` · `5358` | yes |
| `F-W8:246` (B) | `4968` · `5044` · `1305` · `4037` | yes |
| | **total 11 mentions / 10 distinct** | check-listed subtotal = **8** |

⊘ **The arithmetic that produced "eight" is visible**: `PASS-9/CHECK.md`'s drift table lists exactly eight `F-W8` coordinates (`3 + 4 + 1`), and the cert adopted that subtotal — then appended a parenthetical claiming three of *those eight* came from the seat's own masthead sweep. **They did not: the masthead three are additional, and `F-W8.md:15` says so in terms.** The true figure is **eleven** (ten distinct, `5044` appearing in both `:246` receipts). **"Three of them" should read "three more."**

▲ **Non-load-bearing and worth naming anyway.** No coordinate is wrong, no pin moves, and every one of the eleven verifies at R-15…R-24. But this is the R4-7.3 count-word class landing in the **certificate's own summary of the repair round** — the one document the next seat reads to learn what moved — and it undercounts the round's best work by three. ⊘ Per E-3 it is **an append's business, never a patch**, and this seat wrote nothing into the certificate.

### Observation, filed as a non-finding

`F-W3:383`'s paste is warranted *"verbatim and complete"* and drops the canonical row's **terminal `|`** (the leading `|` is present). **Not counted as landed-wrong**: the note's own gloss scopes the claim to *"every cell, both `<sub>` legs"*, and both are complete. Recorded so round 10 does not spend a probe re-finding it.

---

## §4 — WHAT THIS SEAT DID NOT DO

1. **It edited nothing.** No spec, no census, no certificate, no check file. LW-1 and LW-2 are live in `F-W4.md` at the hashes below; LW-3 is live in `PIN-PURGE-CERT.md` at the hash below. **A verify seat that repairs what it audits destroys the evidence it was sent for**, and the hash table is only meaningful because nothing moved between the receipts and it.
2. **It did not re-adjudicate.** The round-9 rulings, strikes and dispositions are the write seat's; this seat re-ran their receipts and re-counted their enumerations.
3. **It did not issue conformance.** The mandate was verification of the round-9 re-cuts, not a pass over the eleven specs. **Round 9 leaves two live receipt defects in `F-W4.md` and one count-word defect in the certificate** — that is a round-10 operand, and this seat states it rather than rounding it to GREEN.
4. **It did not sweep for new coordinate drift beyond the round-9 sites.** The canonical was frozen all round; if round 10 writes a spec, the class re-opens and the sweep is owed again.

⊘ **The expiry, restated.** The table below is true of the bytes this seat found and of no later state. **A hash proves bytes, never coordinates, and never that a paste was produced by its command** — LW-1 and LW-2 are this round's own demonstration of the second half, found *after* a hash table that was, and remains, clean.

---

## §5 — SHA256, THE ABSOLUTE LAST ACT

⟨cmd⟩ this seat, 2026-08-29, **base = repo root `/Users/mkbabb/Programming/value.js`**, BSD toolchain, taken **after every receipt above had been run and this file settled**. Nothing is written after this block.

```
shasum -a 256 docs/tranches/X/fourier/waves/F-W*.md \
              docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md \
              docs/tranches/X/fourier/conformance/PIN-PURGE-CERT.md
```

**Output, pasted whole and verbatim — glob order, `F-W10` sorting after `F-W1` exactly as the shell produced it:**

```
c03149fc2f9e2bec601fe4e00982705203f4b0b3fac78afdd1bde097aa7d4af1  docs/tranches/X/fourier/waves/F-W0.md
176280bebc230da62efa5dbd9fda3469fd7b5773ad7db8f535fda64f7a578093  docs/tranches/X/fourier/waves/F-W1.md
d97a0123bf99ceba2f9c97a4a484ba03e482188f478b0e4d0910e32e80910fa9  docs/tranches/X/fourier/waves/F-W10.md
655a21e7a64dd59c4bb954383ebf69bec829f295f7c6797a7c5cdf88e5d2ca65  docs/tranches/X/fourier/waves/F-W2.md
93bc1ebc4a24d33bc9dc062a308eed0d42169665199a8875f2f7920d31443622  docs/tranches/X/fourier/waves/F-W3.md
052731a56a1257e0d886841db1cf7f056716c526b22fd2bdd902321b42b2aff4  docs/tranches/X/fourier/waves/F-W4.md
40bcad59cd2beed4e3e8453011b605bdcc9eab67082c9dc64bde131caea124ef  docs/tranches/X/fourier/waves/F-W5.md
e83dcad051f560329ade30dbb0877732650ac05071e8b2ee0eab22f56abf7e11  docs/tranches/X/fourier/waves/F-W6.md
16e35d5bb571708046033b10d20f9d0dc71e59c2d89fd52b7d824a877b74caaa  docs/tranches/X/fourier/waves/F-W7.md
355d8c97c383438094b40eceeea4744cc93b3333362f733688a55aade7d4305f  docs/tranches/X/fourier/waves/F-W8.md
4972f6a418322629c73cd8e1ffac331d4ec4ecdab897bbed5bf1a79ceacf9602  docs/tranches/X/fourier/waves/F-W9.md
f443627574581ec2a4138e46d927b5fc431a7a6657cae766f7ffafa01e770968  docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md
c5964d0e3d72e100e51620f2b6a62de886bbc54940cd6cd0961fe2b3696e8adc  docs/tranches/X/fourier/conformance/PIN-PURGE-CERT.md
```
