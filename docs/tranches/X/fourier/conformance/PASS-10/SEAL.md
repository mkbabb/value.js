# X·F ROUND 10 — SEAL

**Seat:** SEAL SEAT, verify-only. **Date:** 2026-08-30. **Base:** repo root `/Users/mkbabb/Programming/value.js`, pinned BSD toolchain (`/usr/bin/grep`, `/usr/bin/awk`, `shasum`).
**Charge:** re-hash · re-run every round-10 re-cut receipt · run the self-count class probe INDEPENDENTLY · verify the four named reconciliations · seal.
**ZERO edits made to any spec, the canonical, or the certificate.** This file is the only artefact this seat wrote. Landed-wrong findings are recorded here and nowhere else.

**VERDICT: 4 of 5 charges HOLD. Charge (3) FAILS — the self-count class has TWO live members at the settled bytes, and one of them is round 10's own principal repair. `verified = 4` · `landedWrong = 4` · `selfCountLiveMembers = 2`.**

---

## §1 — CHARGE 1: THE RE-HASH. **HOLD.**

⟨cmd⟩ this seat, base repo root:

```
shasum -a 256 docs/tranches/X/fourier/waves/F-W*.md \
              docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md
```

**All twelve rows are byte-identical to `PIN-PURGE-CERT.md` §ERRATA-R10's table.** Not one prefix differs. The full output is reproduced in §6 as this seat's last act.

| # | file | §ERRATA-R10 pin | this seat | verdict |
|---|---|---|---|---|
| 1 | `waves/F-W0.md` | `c03149fc2f9e` | `c03149fc2f9e` | ✓ |
| 2 | `waves/F-W1.md` | `ab2437af09e0` | `ab2437af09e0` | ✓ |
| 3 | `waves/F-W2.md` | `655a21e7a64d` | `655a21e7a64d` | ✓ |
| 4 | `waves/F-W3.md` | `93bc1ebc4a24` | `93bc1ebc4a24` | ✓ |
| 5 | `waves/F-W4.md` | `7b427c227275` | `7b427c227275` | ✓ |
| 6 | `waves/F-W5.md` | `40bcad59cd2b` | `40bcad59cd2b` | ✓ |
| 7 | `waves/F-W6.md` | `e83dcad051f5` | `e83dcad051f5` | ✓ |
| 8 | `waves/F-W7.md` | `16e35d5bb571` | `16e35d5bb571` | ✓ |
| 9 | `waves/F-W8.md` | `16d587cb7d77` | `16d587cb7d77` | ✓ |
| 10 | `waves/F-W9.md` | `66030d34992d` | `66030d34992d` | ✓ |
| 11 | `waves/F-W10.md` | `d3fa14c669dd` | `d3fa14c669dd` | ✓ |
| 12 | `conformance/CENSUS-CANONICAL.md` | **`f44362757458`** | **`f44362757458`** | ✓ **FROZEN** |

⊙ **The canonical is unmoved for the second consecutive round**, exactly as §ERRATA-R10 claims. `f443627574581ec2a4138e46d927b5fc431a7a6657cae766f7ffafa01e770968`.

⊙ **INDEPENDENT CORROBORATION OF THE old→new COLUMN, which the certificate does not itself supply.** §ERRATA-R10·b asserts five rows moved and seven were carried forward exact. This seat tested the assertion against the git object store rather than taking it on the certificate's word — `HEAD` = `6e645781` is the round-9 bank:

⟨cmd⟩ `for f in F-W1 F-W4 F-W8 F-W9 F-W10; do git show HEAD:docs/tranches/X/fourier/waves/$f.md | shasum -a 256; done`

| file | git HEAD (round 9) | §ERRATA-R10's "superseded R9 row" | verdict |
|---|---|---|---|
| `F-W1.md` | `176280bebc23` | `176280bebc23` | ✓ |
| `F-W4.md` | `052731a56a12` | `052731a56a12` | ✓ |
| `F-W8.md` | `355d8c97c383` | `355d8c97c383` | ✓ |
| `F-W9.md` | `4972f6a41832` | `4972f6a41832` | ✓ |
| `F-W10.md` | `d97a0123bf99` | `d97a0123bf99` | ✓ |

⟨cmd⟩ `git status --short docs/tranches/X/fourier/` → exactly six modified paths: the five specs above ⊕ `conformance/PIN-PURGE-CERT.md`. **No sixth spec moved.** The "seven unchanged and carried forward exact" claim is confirmed from the other end: `F-W0`, `F-W2`, `F-W3`, `F-W5`, `F-W6`, `F-W7` and the canonical are absent from the dirty set.

---

## §2 — CHARGE 2: EVERY ROUND-10 RE-CUT RECEIPT, RE-RUN VERBATIM. **HOLD — 14 of 14 reproduce.**

Every self-excluding form was run **verbatim**, exclusion included. Every figure quoted at *named bytes* was run against **those bytes**, recovered from git, not against the settled ones.

### §2.1 `F-W4:192` — the `showImageOverlay` cure (`LW-R10-b`, MEDIUM; seal `LW-1`)

| # | ⟨cmd⟩ | published | this seat | verdict |
|---|---|---|---|---|
| R-1 | `/usr/bin/grep -c 'shape only' F-W4.md` | **1**, sole hit `:192` | **1**, `-n` → `192:` | ✓ |
| R-2 | `/usr/bin/awk 'NR!=192' F-W4.md \| /usr/bin/grep -c 'showImageOverlay'` | **1** | **1** | ✓ |
| R-3 | `/usr/bin/grep -c 'showImageOverlay' F-W4.md` **at `052731a56a12`** | **2** | **2** *(run against `git show HEAD:…`)* | ✓ |
| R-4 | same, `-n`, at settled bytes | `:192` + `:347` | `192:` `347:` | ✓ |

⊙ The row's discipline holds: the whole-file figure is quoted at named bytes and **not** banked as current. This seat confirms the named-bytes figure is real and was not back-filled.

### §2.2 `F-W4:347` — the `FM-18` byte-universal (`LW-R10-c`, MINOR; seal `LW-2`)

| # | ⟨cmd⟩ | published | this seat | verdict |
|---|---|---|---|---|
| R-5 | `/usr/bin/awk 'NR!=347' F-W4.md \| /usr/bin/grep -c 'FM-18'` | **0** | **0** | ✓ |
| R-6 | `/usr/bin/grep -c 'FM-18' F-W4.md` | **1** | **1**, `-n` → `347:` only | ✓ |
| R-7 | `/usr/bin/grep -oE 'FM-18' F-W4.md \| /usr/bin/wc -l` **at `052731a56a12`** | **2** | **2** *(git)* | ✓ |

⊙ **The `-oE` figure reads 4 at the settled bytes, and that is CORRECT AND DISCLOSED, not a defect.** The cure's own restatement spells the token twice more; the line says so in terms — *"the whole-file `-oE` figure is quoted at named bytes and NOT banked as current, because this note adds occurrences to `:347` and would falsify a banked one."* This seat ran the disclosure to destruction and it holds: **2 at the named bytes, 4 at the settled bytes, 0 self-excluding.** The banked figure is the only one that does not move.

### §2.3 `F-W8:324` — `fr-PaperSearchDropdown C:C-23` (`LW-R10-e`, MINOR)

| # | ⟨cmd⟩ | published | this seat | verdict |
|---|---|---|---|---|
| R-8 | `/usr/bin/grep -n 'C:C-23' F-W8.md` | **11** lines: `:20` `:25` `:27` `:40` `:78` `:81` `:165` `:246` `:267` `:322` `:324` | **11**, the identical eleven, in order | ✓ |
| R-9 | `/usr/bin/grep -nF 'fr-PaperSearchDropdown' "$C"` | `:5428` | `:5428` *(⊕ `:147` `:4065` `:4098` `:4866` `:4929` `:5008` `:5182` `:5373`)* | ✓ |
| R-10 | `### UNROUTED` heading in the canonical | `:5386` | `:5386` | ✓ |

⊙ `:5428 > :5386` and the next `###` is below it — **`C:C-23` is homed `UNROUTED`, as claimed.** The substantive re-verification stands. **But the prose enumerating the eleven miscounts itself — see `LW-S2`.**

### §2.4 `F-W9:505` — the `(fr-VisualizationView, L-26)` pair-universal (`LW-R10-f`, MINOR)

| # | ⟨cmd⟩ | published | this seat | verdict |
|---|---|---|---|---|
| R-11 | `/usr/bin/awk 'NR!=505' F-W9.md \| /usr/bin/grep -E '(^\|[^A-Za-z0-9])L-26([^A-Za-z0-9]\|$)' \| /usr/bin/grep -c 'fr-VisualizationView'` | **0** | **0** | ✓ |
| R-12 | boundary-anchored bare `L-26` homes | `:119` `:304` `:505` | `:119` `:304` `:505` | ✓ |
| R-13 | exactly one co-occurs with the record | **1**, `:505` | **1** | ✓ |

### §2.5 `F-W10:338` — the `ExportModal` re-cut (`LW-R10-a`, MEDIUM; the round's principal repair)

| # | ⟨cmd⟩ | published | this seat | verdict |
|---|---|---|---|---|
| R-14 | `/usr/bin/grep -cF 'ExportModal' F-W10.md` | **2**, at `:296` and `:338` | **2**, `-n` → `296:` `338:` | ✓ |
| R-15 | `/usr/bin/awk 'NR!=338' F-W10.md \| /usr/bin/grep -cF 'ExportModal'` | **1** | **1** | ✓ |
| R-16 | per-pair self-excluding probe over the thirteen | `fr-ExportModal L-16` = **1** · the other twelve = **0** | **identical, all thirteen run** | ✓ |
| R-17 | the corrected count-word | **53 · 12** | **53 · 12** *(65 − 12 absent)* | ✓ |
| R-18 | `/usr/bin/awk 'NR!=338' F-W10.md \| /usr/bin/grep -cE '(^\|[^A-Za-z0-9])L-16([^A-Za-z0-9]\|$)'` | **10** (11 counting this line) | **10**; whole-file `-n` → 11 lines | ✓ |

⊙ **R-16 is the one this seat re-derived from scratch rather than checking**, because it is the repair the count-word rests on. All thirteen `(record, id)` pairs were run individually through the published probe with `:338` excluded:

```
fr-CanvasOverlayButton FR-COB-8  -> 0      fr-GalleryDraftsSection m-18   -> 0
fr-CanvasOverlayButton FR-COB-23 -> 0      fr-PaperArticleWindow  PAW-42  -> 0
fr-CanvasOverlayButton FR-COB-26 -> 0      fr-PaperArticleWindow  PAW-45  -> 0
fr-CoefficientsPanel   FR-CP-44  -> 0      fr-PaperArticleWindow  PAW-46  -> 0
fr-CoefficientsPanel   FR-CP-45  -> 0      fr-CanvasControlsDock  M-10    -> 0
fr-EqCoefficientsPanel D/m-12    -> 0      fr-CollapsibleSection  i-7     -> 0
fr-ExportModal         L-16      -> 1
```

**Twelve absent, one present. `53 · 12` is the correct count-word and `52 · 13` was wrong.** The re-cut is sound.

### §2.6 `§ERRATA-R10·a` — the certificate's correction to its own row 9

The certificate corrects *"eight (three of them found by this seat's own sweep)"* to **eleven mentions / ten distinct**. This seat enumerated it independently from `F-W8`'s own notes:

| site | coordinates recovered | n |
|---|---|---|
| `F-W8:15` (masthead) | `5394` `5393` `5396` | 3 |
| `F-W8:81` | `5034` | 1 |
| `F-W8:246` (A) | `5044` `5091` `5358` | 3 |
| `F-W8:246` (B) | `4968` `5044` `1305` `4037` | 4 |

**11 mentions**; distinct set = `{5394, 5393, 5396, 5034, 5044, 5091, 5358, 4968, 1305, 4037}` = **10**, with `5044` the sole repeat across the two `:246` receipts. ✓ **The correction's arithmetic is exact, and the masthead three are indeed additional rather than a subset.**

---

## §3 — CHARGE 4: THE FOUR NAMED RECONCILIATIONS. **3 HOLD, 1 HOLDS WITH A QUALIFICATION.**

### §3.1 The `F-W10` `:296`/`:338` reconciliation — **HOLD.**

**The file no longer both books and denies `fr-ExportModal L-16`.** Verified at the bytes, both ends:

- `:296` **BOOKS** it: *"`fr-ExportModal L-16` FOLDS HERE — landed at repair round 5 (REST-65), same anchor `fr-BasisCanvas:106`"* — live, unstruck.
- `:338` **NO LONGER DENIES** it. Three separate withdrawals are present on that line and this seat read each: **(i)** the escape-list entry is struck — `~~**fr-ExportModal L-16**~~` — with the reason inline (*"this id is PRESENT, booked at `:296` as a fold"*); **(ii)** the unproducible `grep -cF … → 0` receipt is struck and labelled *"THE RECEIPT WAS UNPRODUCIBLE, NOT STALE"*; **(iii)** the universal is stated **WITHDRAWN** in terms — *"The universal is WITHDRAWN: the record is named at `:296` of this file."*
- The collateral is re-cut too: *"9 hits, every one another record's"* → **10**, with `:296` named as `fr-ExportModal`'s own. Re-run → **10**. ✓

**The contradiction nine passes read past is closed.**

### §3.2 The `F-W1:725` append — **HOLD.**

The requirement is that the superseded digest now carries `f44362757458` within ±400 characters. Measured on the line's raw bytes:

| token | character offset in `F-W1.md:725` |
|---|---|
| `a450b8e9f80e` (superseded, dated round-4 errata row) | **491** |
| `f44362757458` (current, in the appended `<sub>`) | **829** |
| **distance** | **338** — within ±400 ✓ |

⊙ **E-3 is obeyed:** the dated row is unedited; the current digest arrives in an appended `<sub>` beside it. ⟨cmd⟩ `git diff --numstat` → `F-W1.md` = **1 insertion / 1 deletion**, a single-line append, no row rewritten.

⊙ **The universal the append was cut to satisfy is now TRUE at all 30 sites.** ⟨cmd⟩ `/usr/bin/grep -ohE '3e0a9acb3381|a450b8e9f80e' F-W*.md | /usr/bin/wc -l` → **30**, distributed `F-W1` 7 · `F-W2` 5 · `F-W9` 2 · `F-W10`/`F-W3`/`F-W4`/`F-W5`/`F-W6`/`F-W7`/`F-W8` 1 each · `F-W0` 0. **The denominator the certificate claims is the denominator that exists.**

### §3.3 The `FR-NP-32` qualification — **HOLDS, with the literal figure corrected. See `LW-S6`.**

The charge was to grep the unqualified `(≡ M1` form and find **zero hits**. **This seat finds ONE**, and reports the figure rather than the expectation.

⟨cmd⟩ `/usr/bin/grep -cF '(≡ M1' F-W10.md` → **1**.

⊙ **The qualification did land.** `:446` carries three `FR-NP-32 (≡ …)` spellings: **two live and qualified** — `FR-NP-32 (≡ fr-PaperSidebar M1)` — and **one unqualified, `~~`FR-NP-32 (≡ M1)`~~`, inside its own strike**, quoted with the exclusion declared inline: *"quoted here inside its own strike, as retired-by-law history — a successor must not re-file it."* No live cell carries the bare form; R-5 is satisfied.

⊘ **The distinction matters for the next seat and is why this is filed rather than waved through:** a bare `grep -F '(≡ M1'` will return `1`, not `0`, at every future byte-state of this file, because the retirement quotes what it retires. **A round-11 gate written to expect zero will fire on lawful bytes.** The correct probe is the self-excluding one the round's own law prescribes — ⟨cmd⟩ `/usr/bin/awk 'NR!=446' F-W10.md | /usr/bin/grep -cF '(≡ M1'` → **0**.

---

## §4 — CHARGE 3: THE SELF-COUNT CLASS PROBE, RUN INDEPENDENTLY. **FAILS. TWO LIVE MEMBERS.**

**Method — built from the law's text at `F-W10.md` §R10-LAW, not from the certificate's site list, and run over all eleven specs.** A **live member** = a receipt that counts or denies a token inside its own file, **whose own line matches its own counted pattern**, with **no declared self-exclusion** (`awk 'NR!=<n>'`) and **no substantive-byte quantification with the self- and chase-note occurrences enumerated**.

⊘ **A naive reading of that test convicts the whole corpus and is therefore wrong.** Every own-file receipt's line contains its own pattern — the command string *is* an occurrence. This seat's first instrument returned **51 "members"** and was discarded as useless. **The test that discriminates is whether the self-occurrence is UNACCOUNTED: does the published figure still reproduce, and is the sentence wrapped around it still true?** That is the instrument used below, and it is the one the law's corollary describes.

**Instrument A — own-file counting receipts, executed.** 62 distinct own-file receipt sites enumerated corpus-wide; 28 carry a bindable published integer; **all 28 were RUN and compared**. 20 disagreed with their published figure; **all 20 hand-adjudicated**, including the shell-loop and `sort -u` forms an automated pass cannot execute (`F-W3:798`, `F-W4:462`, `F-W2:248`). A widened second pass over `wc -l` pipelines and alternate figure forms returned **0 further mismatches** — the sweep is closed.

**Instrument B — own-file absence universals.** 24 sites over the phrase set `appears nowhere` · `named nowhere` · `nowhere in this file/spec` · `no byte of this file/spec` · `any byte of this file/spec` · `zero bytes anywhere` · `anywhere else in this file/spec` · `the sole occurrence` · `sole site` · `occurs nowhere` · `absent from this file/spec`. **All 24 hand-adjudicated. ZERO live members.**

### §4.1 Instrument B — all 24 adjudicated, none live

| disposition | sites |
|---|---|
| **cured this round, verified in §2** | `F-W4:347` · `F-W8:324` · `F-W9:505` · `F-W10:338` |
| **subject is another file, doc, module or product tree** (non-member) | `F-W0:290` (`fr-PathPreview.md:30`) · `F-W2:118`, `F-W2:256` (the authoring register) · `F-W3:339` (`aria-current` in the product tree) · `F-W8:118` (the api module) · `F-W10:420` (the other waves) |
| **substantively scoped or shape-discriminating** (form (ii)) | `F-W1:452` (*"by bytes that CARRY WORK"*) · `F-W4:189` (*resolved* nowhere, + *"Named here, never re-booked"*) · `F-W4:399` (*"as F.W4 work"*) · `F-W8:328` (scoped to the 40 §6a rows by a filter a chase note cannot enter) |
| **past-tense, cure disclosed in the same breath** | `F-W2:182` · `F-W4:115` (*"Cited here, booked there"*) · `F-W4:266` (*"and is booked immediately below"*) · `F-W4:423` |
| **self-enumerated / retired-by-law, convicted in the citing cell** | `F-W7:16` · `F-W8:36` (*"the sole occurrence is this erratum line itself"* — **re-run, `-n` → `36:` only, TRUE**) · `F-W9:304` (quotes the retired bare-token claim inside its own conviction) |
| **the law and its own methodology, not receipts** | `F-W10:344` · `F-W10:348` · `F-W10:359` |

### §4.2 Instrument A — the 14 undisclosed mismatches, adjudicated

Twelve are receipts **prior rounds already struck, retired or converted under R3-3.10** — the earlier law that banned banked self-counts — and each is convicted in its own citing cell: `F-W0:21`, `F-W0:37`, `F-W0:457`, `F-W2:24`, `F-W2:270`, `F-W2:271`, `F-W3:359`, `F-W4:143`, `F-W7:359`, `F-W8:36`, plus `F-W3:798` and `F-W4:462`, which are **live and reproduce exactly**:

| site | ⟨cmd⟩ | published | this seat | verdict |
|---|---|---|---|---|
| `F-W3:798` | `for r in fr-AdminFlaggedPanel fr-GalleryCardModal fr-PaperArticleWindow; do grep -c "^\| \`$r " "$R"/waves/F-W3.md; done` | **17 · 15 · 24** | **17 · 15 · 24** | ✓ |
| `F-W4:462` | `for t in PAW-6 PAW-18 PAW-26 PAW-29; do grep -oE "\b$t\b" F-W4.md \| wc -l; done` | **7 · 4 · 4 · 8** | **7 · 4 · 4 · 8** | ✓ |
| `F-W10:287` | `35 callsites / 9 consumers`, self-enumerated *"2 sites"* | **2** | **2**, `:287` `:477` | ✓ |
| `F-W8:36` | `grep -n 'raw-findings' waves/F-W8.md` → *"the sole occurrence is this erratum line itself"* | sole = `:36` | **`36:` only** | ✓ |

**Two do not survive.**

### §4.3 ⌧ **LIVE MEMBER 1 — `F-W2:248`.** Uncured, and the certificate's sweep did not reach it.

The receipt warrants the narrowed universal about declared bases:

> *"sixty-seven of the eighty-three distinct commands carry no absolute path and run from a DECLARED base instead — ⟨cmd⟩ `/usr/bin/grep -oE '⟨cmd⟩ \`[^\`]*\`' F-W2.md | sort -u | /usr/bin/wc -l` → **83**; `… | /usr/bin/grep -c '/Users/'` → **16**."*

| ⟨cmd⟩ | published | this seat, settled bytes | verdict |
|---|---|---|---|
| `… \| sort -u \| wc -l` | **83** | **84** | ⌧ **FALSE** |
| `… \| grep -c '/Users/'` | **16** | **16** | ✓ |
| the derived count-word | **67** | **68** (`84 − 16`) | ⌧ **FALSE** |
| the shell-variable probe `grep -oE '⟨cmd⟩ \`[^\`]*\$[^\`]*\`'` | *no output* | *no output* (exit 1) | ✓ |

⊙ **It is a member of the class by construction.** ⟨cmd⟩ `/usr/bin/awk 'NR!=248' F-W2.md | /usr/bin/grep -oE '⟨cmd⟩ \`[^\`]*\`' | sort -u | /usr/bin/wc -l` → **81**. **Line `:248` contributes 3 of the 84 distinct commands it counts** — its own line matches its own counted pattern, with no declared self-exclusion and no substantive-byte quantification. This is exactly form (i)'s subject, and the law is not applied to it.

⊙ **`F-W2` was NOT edited this round** (`655a21e7a64d`, unmoved since `HEAD~2`). ⟨cmd⟩ against the object store: the count reads **84** at `HEAD`, `HEAD~2` and `HEAD~3`, and **82** at `HEAD~5`. **The receipt has been false since the round-8 bank at the latest, and has now survived three conformance passes** — passes 8, 9 and 10 — **including the pass convened to sweep precisely this class.**

⊘ **Why the sweep missed it, stated so round 11 can fix the instrument and not just the site.** Instrument (A) tests *"the receipt's own line matches its own pattern (regex metacharacters stripped to the literal core, **core ≥ 3 chars**)"*. The pattern here is `⟨cmd⟩ \`[^\`]*\``, whose literal core after stripping is `⟨cmd⟩ ` — **a delimiter, not an identifier**. The site is a self-count over a *structural* token rather than an *id*, and the instrument's core-length-and-literalness filter is blind to it. **The class is wider than the id-shaped sweep that measured it, which is what "INSTRUMENT-RELATIVE" was warning about — this seat is the demonstration.**

### §4.4 ⌧ **LIVE MEMBER 2 — `F-W10:467`.** Uncured, in the round's own file.

> *"⟨cmd⟩ `/usr/bin/grep -o "§2.5a-iii's 1[34]" waves/F-W10.md` → `14` · `14` · `13`"*

| bytes | output | verdict |
|---|---|---|
| **published** | `14` · `14` · `13` | — |
| **settled (`d3fa14c669dd`)** | `14` · `14` · **`14`** — at `:314` `:442` `:467` | ⌧ **FALSE** |
| round-9 (`d97a0123bf99`) | `14` · `14` · `14` — at `:314` `:419` `:444` | ⌧ false there too |
| round-4 (`HEAD~5`) | `14` · `14` · `13` | ✓ true **only here** |

⊙ **Traced to its origin:** the published output was true at the round-4 bytes and was falsified by **REST-67, the very cure this note announces** — the `13`→`14` character-fix the cell is about. The prose discloses the cure in past tense (*"The cell read `13`"*), but the ⟨cmd⟩ output beneath it is published bare, with **no R3-3.8 before/after pairing and no self-exclusion**, and line `:467` is itself one of the three hits. **A reader who runs it is handed `14 · 14 · 14` against a published `14 · 14 · 13` and no way to tell which half is stale** — verbatim the failure mode `F-W3:359`'s own strike note describes.

⊘ **The substance is unaffected**: `23 + 36 + 16 + 14 = 89` is arithmetically confirmed by this seat and the label reads 89. **Only the receipt is false.**

### §4.5 The tally

**`selfCountLiveMembers = 2`** — `F-W2:248` (MEDIUM) and `F-W10:467` (MINOR). **The charge required ZERO. It is not met.**

⊙ **What the round DID achieve, stated plainly so the failure is not read as a rout:** all five sites §ERRATA-R10·b claims to have cured **are** cured and **do** re-run exactly; instrument B is **clean at all 24 sites**; and 30-plus already-lawful receipts re-run green. **The law is right and the five cures are right. The sweep that applied the law was narrower than the law.**

---

## §5 — LANDED-WRONG REGISTER

Recorded here and nowhere else. **This seat made ZERO edits.**

### ⌧ `LW-S1` — **MEDIUM.** `F-W10:338`: the principal repair published a coordinate its own insertion displaced.

The re-cut collateral enumerates the nine other `L-16` homes as `:191` `:193` `:244` `:276` `:291` `:297` `:301` `:303` **`:419`**. At the settled bytes the ninth stands at **`:442`**.

⊙ **The cause is the repair itself.** ⟨cmd⟩ `git diff -U0 -- F-W10.md` → `@@ -338 +338,24 @@` — **the cure expanded `:338` from one line to twenty-four, displacing everything below it by +23.** `419 + 23 = 442`, exactly. The eight coordinates below `:338` are unaffected and all eight verify; the one above it drifted, and the drifting edit is the one that published it.

⊘ **This is the same class §ERRATA-R10·c files against `F-W9:289` for round 11** — *"lawful as a count but its coordinates have drifted"* — which this seat independently confirms (`:178` `:282` `:452` cited; **`:185` `:289` `:461`** actual; the *"one distinct span"* half re-runs TRUE). **The certificate found that instance in a file it did not move, and missed this one in the file it did.** A seat that re-cuts a receipt inside a multi-line insertion must re-derive its own coordinates **after** the insertion settles, not before.

### ⌧ `LW-S2` — **MINOR.** `F-W8:324`: the enumeration undercounts itself by one, and the certificate's summary and the spec disagree.

The spec reads: *"`:324` is the claiming sentence itself, and **the other nine** are chase notes, disclosures and E5-15/REST-51 minutes."* **Eleven lines minus the claiming line is TEN**, and the passage then enumerates **ten** — `:20` · `:25`/`:27` · `:40` · `:78`/`:81` · `:165` · `:246`/`:267` · `:322`. Counted: `1 + 2 + 1 + 2 + 1 + 2 + 1 = 10`.

⊙ `PIN-PURGE-CERT.md` §ERRATA-R10·b row 9 states it **correctly** — *"each of the other **ten** identified as a chase note"*. **The certificate is right and the spec is wrong**, so the defect is one word in the corpus, not in the pin authority. **Non-load-bearing** — all eleven coordinates verify and the substantive claim (`C:C-23` booked nowhere at F.W8, homed `UNROUTED` at canonical `:5428`) is confirmed. But form (ii) of the round's own law **requires the enumeration to be complete and correct**, and a cure that enumerates ten under a label reading nine is the E-13/E-22 count-word shape the programme has now convicted four generations of.

### ⌧ `LW-S3` — **MEDIUM.** `F-W2:248`: live self-count member, three passes old. Full detail at §4.3.

Published **83** distinct commands and **67** without an absolute path; the settled bytes return **84** and **68**. Its own line contributes 3 of the 84. **Uncured, unfiled, and outside the reach of the instrument that swept for it.**

### ⌧ `LW-S4` — **MINOR.** `F-W10:467`: live self-count member. Full detail at §4.4.

Published `14 · 14 · 13`; the settled bytes return `14 · 14 · 14`. True only at the round-4 bytes; falsified by the REST-67 cure the note itself announces.

### ⊙ `LW-S5` — **MINOR, pre-existing; `F-W7` unmoved this round.** `F-W7:16`: the residue enumeration is short by one.

The receipt discloses residue as *"`PASS-5/F-W7-CHECK.md` and `PASS-5/WORK-ORDER.md`, both conformance artefacts of this repair round and neither a wave spec."* ⟨cmd⟩ `/usr/bin/grep -rl "trie ruling stays inline" docs/` → **four** paths: `waves/F-W7.md` · `PASS-5/F-W7-CHECK.md` · `PASS-5/WORK-ORDER.md` · **`PASS-5/SEAL.md`**.

⊙ **The claim it warrants — *"the sole WAVE-SIDE home"* — remains TRUE**, and both `F-W3` corroborating probes return their published spans verbatim. Only the parenthetical residue list is stale: **`PASS-5/SEAL.md` was written after the receipt, by the seat that quoted the check.** ⊘ **The general shape, worth one line for round 11: a receipt scoped to `docs/` accretes new residue every time a conformance instrument quotes it — the seal that certifies a round is itself a future occurrence.** Filed, not cured.

### ⊙ `LW-S6` — **INFO.** `FR-NP-32`: the literal probe returns 1, not 0. Full detail at §3.3.

The qualification landed and no live cell carries the bare form; the single `(≡ M1` hit is the retired spelling quoted inside its own strike. **Recorded because a round-11 gate written to expect zero will fire on lawful bytes**; the self-excluding form returns **0**.

### §5.1 What this seat checked and found CLEAN

- All twelve hashes, and the five old→new transitions corroborated against git.
- All 14 round-10 re-cut receipts, including every self-excluding form run verbatim and every named-bytes figure run against those bytes recovered from the object store.
- The `:296`/`:338` reconciliation — book-and-deny closed, three withdrawals verified.
- The `F-W1:725` append — 338 characters, E-3 obeyed, single-line diff, and the 30-occurrence universal true at all 30.
- §ERRATA-R10·a's correction — 11 mentions / 10 distinct, `5044` the sole repeat.
- The `53 · 12` count-word, re-derived from scratch over all thirteen pairs.
- Instrument B, all 24 sites.
- `F-W3:798`, `F-W4:462`, `F-W10:287`, `F-W8:36` — live self-counts that reproduce exactly.
- `rosterEscapes` untouched at **ZERO**; the canonical FROZEN at `f44362757458` for a second round.

---

## §6 — THE HASH TABLE

⟨cmd⟩ this seat, 2026-08-30, base = repo root `/Users/mkbabb/Programming/value.js`, pinned BSD toolchain, **taken as the absolute last act of this seal, after every word above was settled and with ZERO edits made to any hashed file**:

```
shasum -a 256 docs/tranches/X/fourier/waves/F-W*.md \
              docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md \
              docs/tranches/X/fourier/conformance/PIN-PURGE-CERT.md
```

**Output, pasted whole and verbatim — glob order, `F-W10` sorting after `F-W1` exactly as the shell produced it:**

```
c03149fc2f9e2bec601fe4e00982705203f4b0b3fac78afdd1bde097aa7d4af1  docs/tranches/X/fourier/waves/F-W0.md
ab2437af09e0d0646260afdd024541539ad588d492b8de48aee25a8f82adff3e  docs/tranches/X/fourier/waves/F-W1.md
d3fa14c669dd2a60419ad217b42ffdb374f8f4ea76b7e3b5458b24cef2a494d0  docs/tranches/X/fourier/waves/F-W10.md
655a21e7a64dd59c4bb954383ebf69bec829f295f7c6797a7c5cdf88e5d2ca65  docs/tranches/X/fourier/waves/F-W2.md
93bc1ebc4a24d33bc9dc062a308eed0d42169665199a8875f2f7920d31443622  docs/tranches/X/fourier/waves/F-W3.md
7b427c227275ce7c6c3463e8bafbab1c17fdb3d05caea7fa80510d6e4df0d1e3  docs/tranches/X/fourier/waves/F-W4.md
40bcad59cd2beed4e3e8453011b605bdcc9eab67082c9dc64bde131caea124ef  docs/tranches/X/fourier/waves/F-W5.md
e83dcad051f560329ade30dbb0877732650ac05071e8b2ee0eab22f56abf7e11  docs/tranches/X/fourier/waves/F-W6.md
16e35d5bb571708046033b10d20f9d0dc71e59c2d89fd52b7d824a877b74caaa  docs/tranches/X/fourier/waves/F-W7.md
16d587cb7d77c60195622d89623b9e94c9a0861ac0543c08d4e36bc8b278e762  docs/tranches/X/fourier/waves/F-W8.md
66030d34992db570b47d9e6496b56350b6c71c91897c7bd7320ba65e1d5f3f13  docs/tranches/X/fourier/waves/F-W9.md
f443627574581ec2a4138e46d927b5fc431a7a6657cae766f7ffafa01e770968  docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md
01c9cd8efcd5abcf9cd271d621c9b8693c91fb4655278749751163311701ae96  docs/tranches/X/fourier/conformance/PIN-PURGE-CERT.md
```

**Nothing is written after this block.**
