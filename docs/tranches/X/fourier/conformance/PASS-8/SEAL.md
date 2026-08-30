# X·F — PASS-8 SEAL

**Seat**: X·F round-8 seal seat, 2026-08-29. **Mandate**: VERIFY-ONLY. Re-run the round-8 spelling-agnostic sweep independently; re-run the two re-cut `F-W6` receipts and a sample of other round-8-touched receipts against the published bytes; adjudicate `F-W4`'s singles arithmetic, `F-W1` `§2·R3b`'s strike, and `F-W5:265`'s restated confinement claim; confirm the canonical is still FROZEN; write this file.

**This seat edited nothing but this file.** No wave, no `CENSUS-CANONICAL.md`, no `PIN-PURGE-CERT.md`, no prior pass instrument. Every figure below is a command re-run or a list summed by hand, and every command is published so a successor can falsify it rather than trust it. Landed-wrong findings are filed here and nowhere else (E-3).

---

## §0. VERDICT

| axis | verdict |
|---|---|
| Canonical FROZEN at `f44362757458` | ✔ **HELD** — unmoved, gate cleared, certification proceeds |
| **Band operand — zero live stale figures** | ✔ **GREEN** — the pass-8 **HIGH** is CURED at the bytes |
| `F-W5:265` restated confinement claim | ✔ **GREEN** — the pass-8 **MEDIUM** is CURED; every sub-figure re-measured exact |
| `F-W4` singles arithmetic (rows) | ✔ **GREEN** — the pass-8 **MINOR** is CURED; `63 + 8 = 71` re-summed by hand |
| `F-W1 §2·R3b` strike parallel to `R3a` | ✔ **GREEN** — **LW-R7-a DISCHARGED** |
| Receipts re-run | **15 of 17 GREEN · 2 RED** |
| `F-W4` header **record** denominator | ✗ **RED** — `17 records` stale, is **16** |
| `F-W8:246` receipt coordinates | ✗ **RED** — publishes `5044/5091/5358`, reproduces `5084/5131/5397` |
| `F-W8:328` receipt | ✗ **RED** — **falsified by round 8's own edits**, self-falsifying at write |

⊘ **The band axis this round was convened to close IS CLOSED.** The HIGH, the MEDIUM and both MINORs are cured, and the sweep this seat ran independently — spelling-agnostic, depth-counted, unmasked cross-check — returns **ZERO live stale band figures across all eleven specs**. The round found and cured **four sites the pass-8 check never named**, and disclosed each as such.

⌧ **NOT CERTIFIED WHOLE. Three defects stand at final bytes, and two of them are round 8's own.** One is a denominator the round reconciled *against* while half of it was stale; two are receipts — one whose coordinates never reproduced, one that round 8 **falsified by editing the very file it counts, in the very note that publishes the count**. The class is not new: it is the `false-at-write receipt` class PASS-4 convicted twelve times, and `F-W6:634`'s own struck cell already states the lesson — *"a denominator that cannot be re-derived is not evidence."* **VERDICT: NOT CONFORMANT — band axis GREEN, instrument axis RED.**

---

## §1. THE FROZEN CANONICAL — the gate, cleared first

⟨cmd⟩ base `conformance/`: `shasum -a 256 CENSUS-CANONICAL.md`

```
f443627574581ec2a4138e46d927b5fc431a7a6657cae766f7ffafa01e770968  CENSUS-CANONICAL.md
```

**`f44362757458` — the FROZEN prefix, unmoved.** Identical to `PASS-7/SEAL.md` row 12 and to `PASS-8/CHECK.md`'s row 12. No LANDED-WRONG on this axis; the seat proceeds to certify.

⊕ **The certificate is unmoved too**: `4fc65bbd1d9b…` = `PASS-7/SEAL.md:322` row 13, byte-identical.

⊕ **Exactly the five repaired waves moved, and the six untouched held.** Against `PASS-7/SEAL.md` §TABLE-R7:

| held (untouched) | moved (repaired at round 8) |
|---|---|
| `F-W0` `c03149fc2f9e` · `F-W2` `655a21e7a64d` · `F-W3` `bfa4278c5599` · `F-W7` `16e35d5bb571` · `F-W9` `4972f6a41832` · `F-W10` `d97a0123bf99` | `F-W1` `d03e07468c74`→`0b638dc6386b` · `F-W4` `0932ced1a4c0`→`2f18c3d385f2` · `F-W5` `2990f5b51056`→`40bcad59cd2b` · `F-W6` `f16b290bcf62`→`f32f8ec4eca5` · `F-W8` `0d464a4a7d3a`→`73ddc4d0bf0e` |

**Six of six held; five of five moved; nothing moved that should not have.**

---

## §2. THE SPELLING-AGNOSTIC SWEEP, RE-RUN BY THIS SEAT

### §2.1 The instrument, stated before its result (R2-9)

R2-9 decrees that *a gate that states a shape- or spelling-restricted operand is DEFECTIVE at authoring, whatever its result.* This seat therefore ran **three** probes, the wider two unrestricted by phrasing, and publishes all three.

1. **Bare numeric probe** — `(?<![0-9.])(28|90|118)(?![0-9])` over all eleven `F-W*.md`, no phrase restriction whatsoever.
2. **Band-context narrowing** — the same hits, date-excluded, retained only where a ±160-char window carries `F.W5|band|roster|census|record-side|rows|Operand|CANONICAL`.
3. **Shape-targeted UNMASKED probe** — eight dangerous assertion forms, *with no liveness masking at all*, so that a masker bug cannot hide a survivor.

**Liveness rule** (the program's own, as the pass-8 check states it): a figure is DEAD inside `~~…~~`, `<sub>…</sub>` or a `⟨…⟩` chase note; LIVE otherwise. ▲ **The angle masker MUST be depth-counted.** A flat `⟨[^⟨⟩]*⟩` regex under-masks, because round-8 chase notes contain nested `⟨cmd⟩` receipts — this seat reproduced exactly **two** false-live hits (`F-W5:101`, `F-W5:381`) with the flat form, which is precisely the count `F-W5:265` predicts of it. **The note's disclosure of its own instrument is exact.**

### §2.2 The result

| probe | hits | outcome |
|---|---|---|
| 1. bare numeric | `28` **620** · `90` **82** · `118` **34** = **736** | dominated by dates, ids, line anchors |
| 2. band-context | **226** candidates — **144 LIVE** / 82 DEAD | every one adjudicated, §2.4 |
| 3. shape-targeted, unmasked | **93** across 8 shapes | every one adjudicated, §2.4 |

### §2.3 The twelve named sites, re-read at FINAL bytes — all twelve CURED

| site | current voice at final bytes | superseded figure |
|---|---|---|
| `F-W5:95` | `` `F.W5` (27) ⊕ `F.W5-W8` (89) `` | in `⟨*re-based … round 8*⟩` |
| `F-W5:99` | heading carries no band figure | — |
| `F-W5:101` | `` roster (27) ⊕ roster (89) `` (the §2 **declared Operand**) | in chase note |
| `F-W5:381` | `= 116 record-qualified rows` (G19 gate cell) | in chase note |
| `F-W5:427` | `` `F.W5` 27 ⊕ `F.W5-W8` 89 = 116 rows `` (G19 run instruction) | in chase note |
| `F-W6:19` | both receipts **re-cut**, `27 rows` / `89 rows` | in chase note |
| `F-W6:476` | `` `### F.W5 — **27 rows**` `` | in chase note |
| `F-W6:526` | `**F.W5 = 27 rows · F.W5-W8 = 89 rows**` (gate FW6-G17) | in chase note |
| `F-W8:78` | `§2 F.W5 (27 rows)` beside `F.W5-W8 (89 rows)` | in chase note |
| `F-W8:246` | `§2 F.W5 (27 rows)` beside `F.W5-W8 (89 rows)` | in chase note |

⊘ **`F-W5:9` and `F-W5:116` also read re-based** (`27 + 89 = 116`; `27 ⊕ 89 = 116`), the first chased at round 7, the second at round 8.

### §2.4 The four sites the pass-8 check DID NOT name — found by this sweep's class, cured, and disclosed as such

| site | it read | it now reads |
|---|---|---|
| `F-W6:163` | `28 + 90` — **bare and un-parenthesised** | `the canonical's 27 + 89` |
| `F-W6:601` | `F.W5 = 28 · F.W5-W8 = 90` — **bare** | `F.W5 = 27 · F.W5-W8 = 89` |
| `F-W8:40` | `28 ⊕ 89` — **internally split**, band arm re-based, F.W5 arm not | `27 ⊕ 89` |
| `F-W8:328` | `117` — **a number no prior probe searched** | `116` |

▲ **This is the vindication of the spelling-agnostic mandate, and the repair seat published it against itself.** Each of the four carries, in its own chase note, the words *"Found by the round-8 spelling-agnostic sweep, not by the pass-8 check's twelve-site list."* Two spell the figures bare; one splits a single claim across a re-based and a stale arm; one spells the sum `117`, an intermediate that existed only between E5-15 and E6-3. **No phrase-restricted probe could have reached any of them** — which is the whole of R2-9's point, restated by measurement rather than by decree.

### §2.5 Residue adjudication — every live hit resolved to a non-band referent

Of the 93 unmasked shape hits, hand-adjudication returns:

| referent | what it is |
|---|---|
| **dates** `2026-08-28` | the largest class; `28` is the day |
| **line/anchor refs** | `:90` · `sed -n '90p'` · `types.ts:110-118` · `style.css:113-118` · `sed -n '115,118p'` · `gallery.spec.ts:118-135` |
| **id tokens** | `C-28` · `FR-GSB-28` · `FR-AFP-28` · `FR-GFC-28` · `FR-EQR-28` · `PAW-28` · `GCM-28` · `HLG-28` · `AA-28` · `FR-COB-28` · `FR-GV-28` · `rK-24` |
| **F.W0 substrate** | `28` dirty rows / `28` paths (GAB-13) — `F-W0:114` · `F-W3:129/384/415/536` · `F-W6:528/542` · `F-W7:225` · `F-W9:503` |
| **F.W8 §3 carry rows** | `28` — re-summed by this seat: P1–P8 (8) + J1–J7 (7) + R1–R6 (6) + M1–M5 (5) + D1–D2 (2) = **28** ✔ |
| **the demoted draft lineage** | `C-01..C-90` / *"two drafts / 90 rows"* — `F-W3:38/416/636/901`, marked **NO GATE WEIGHT** at R-3 |
| **the `p90` percentile** | `F-W5:378` · `F-W6:524` — a geometry tripwire, not a roster |
| **`F-W5:265` itself** | the disposing note; licensed by construction, §4.3 |

⊘ **ZERO live stale band figures survive, across all eleven specs.** The band operand is conformant at the bytes.

⊕ **One residual, carried not graded** — `F-W7:101`'s `⟨*REST-37: …*⟩` chase note reads *"R4-5 makes F.W5 (28) and F.W5-W8 (89) two distinct canonical denominators"*: a stale `28` beside a re-based `89`, internally split in the same clause. It is **DEAD voice** (inside a chase note) and so is **not** a live band figure; `F-W7` was untouched at round 8 and E-3 bars re-writing a dated note in place. **Named here so the next round does not re-find it**, and because it is the same internally-split shape as `F-W8:40`, which *was* cured.

---

## §3. RECEIPTS RE-RUN AGAINST THE PUBLISHED BYTES

Base `conformance/` unless stated; `$C = CENSUS-CANONICAL.md`; `$R = docs/tranches/V/megatranche/registry/adjudicated`; BSD `/usr/bin/grep`.

### §3.1 The two re-cut `F-W6` receipts — the round's central claim

| # | command | published | re-run | |
|---|---|---|---|---|
| 1 | `grep -o '^### F\.W5 — \*\*27 rows\*\*' "$C"` | *"### F.W5 — **27 rows**"* | `### F.W5 — **27 rows**` | ✔ |
| 2 | `grep -o '^### F\.W5-W8 — \*\*89 rows\*\*' "$C"` | *"### F.W5-W8 — **89 rows**"* | `### F.W5-W8 — **89 rows**` | ✔ |

⊕ **Both re-cuts reproduce byte-identically.** And the note's negative claims hold too:

| # | command | published | re-run | |
|---|---|---|---|---|
| 3 | `grep -c '^### F\.W5 — \*\*28 rows\*\*' "$C"` | **0** | `0` | ✔ |
| 4 | `grep -c '^### F\.W5-W8 — \*\*90 rows\*\*' "$C"` | **0** | `0` | ✔ |

**The two receipts the round-8 check found EMPTY are empty; the two it re-cut return their published strings.** The claim is true in both directions.

### §3.2 Thirteen further round-8-touched receipts

| # | site | command | published | re-run | |
|---|---|---|---|---|---|
| 5 | `F-W6:476` | `grep -c '^### F\.W5 — \*\*28 rows\*\*' "$C"` | **0** | `0` | ✔ |
| 6 | `F-W6:476` | `grep -o '^### F\.W5 — \*\*27 rows\*\*' "$C"` | *"### F.W5 — **27 rows**"* | verbatim | ✔ |
| 7 | `F-W5:381` | `grep -nE '^### F\.W5(-W8)? — ' CENSUS-CANONICAL.md` | `5078:` **27 rows** · `5092:` **89 rows** | `5078` / `5092` | ✔ |
| 8 | `F-W5:269` | `grep -cE '^\| \*\*[A-G][0-9]+c?\*\*' F-W5.md` | **93** | `93` | ✔ |
| 9 | `F-W5:275` | `grep -n 'C-28' "$R"/fr-CanvasControlsDock.md` | THREE hits `:45` `:102` `:150` | `45` `102` `150` | ✔ |
| 10 | `F-W5:381` | `grep -lw 'P-9' fr-*.md \| wc -l` | **0** | `0` | ✔ |
| 11 | `F-W6:476` | `grep -o '\*\*fr-AdminUserList\*\* (11): …'` | 11 ids, `FR-AUL-3`…`FR-AUL-59` | verbatim, 11 ids | ✔ |
| 12 | `F-W6:476` | `grep -o '\*\*fr-AdminAuditLog\*\* (4): …'` | `AA-6 · AA-23 · AA-31 · AA-32` | verbatim | ✔ |
| 13 | `F-W6:476` | `grep -o '\*\*fr-GalleryAdminBanner\*\* (2): …'` | `GAB-15 · GAB-16` | verbatim | ✔ |
| 14 | `F-W8:40` | `grep -o '§6b\|§6c' waves/F-W5.md` | **no output** | no output, exit 1 | ✔ |
| 15 | `F-W8:78` | `awk 'NR>=265 && NR<=278 && /^\| /' waves/F-W8.md \| wc -l` | **14** | `14` | ✔ |
| 16 | `F-W8:246` | `grep -nF 'fr-ContourPreview** (1): ' "$C"` | `5044` · `5091` · `5358` | **`5084` · `5131` · `5397`** | ✗ |
| 17 | `F-W8:328` | `grep -n 'ConvergencePlot' waves/F-W8.md` | **one hit, `:20`** | **six lines** | ✗ |

**15 of 17 reproduce exactly. Two do not, and both are filed at §5.**

---

## §4. THE THREE ADJUDICATIONS

### §4.1 `F-W4` — the singles arithmetic, summed by this seat from the live list

The pass-8 MINOR is **CURED**. The sentence now reads *"The **eight** sum with the eight record-groups above to `20+17+7+7+4+3+3+2+8 = 71`"*. This seat did not read the sentence — it re-summed the block.

⟨cmd⟩ this seat, base `waves/`, `python3`, enumerating `^- \*\*` bullets at `F-W4.md:307`–`:315` and parsing each head's `(n)`:

| line | record-group | rows |
|---|---|---|
| `:307` | `fr-MorphShapePreview` | 20 |
| `:308` | `fr-VisualizationView` | 17 |
| `:309` | `fr-DarkModeToggle` | 7 |
| `:310` | `fr-ConvergenceTimeline` | 7 |
| `:311` | `fr-ContourEditorCanvas` | 4 |
| `:312` | `fr-ImageUpload` | 3 |
| `:313` | `fr-EquationView` | 3 |
| `:314` | `fr-EquationPanel` | 2 |
| | **sum** | **63** |

And the singles bullet at `:315`, enumerated member by member with strike-liveness applied:

> 1 `fr-BasisCanvas M-doc` · 2 `fr-CoefficientsSpectrum i-1` · **3 `fr-ContourPreview KILL-3` — STRUCK** · 4 `fr-FourierMorphSvg FM-17..FM-19` · 5 `fr-HarmonicLevelGrid R5-7-immune` · 6 `fr-PaperView R-6` · 7 `fr-SliderControl Scope-law` · 8 `fr-SpeedSelect D-03-as-demoted` · 9 `fr-EquationResult FR-EQR-14`

**Nine enumerated · one struck · eight live.** `63 + 8 = 71` — **the header's row figure. The rows close.** ✔

⌧ **BUT THE SAME HEADER'S RECORD DENOMINATOR DOES NOT — see §5, LW-R8-a.**

### §4.2 `F-W1 §2·R3b` — the strike, parallel to `R3a`. **LW-R7-a DISCHARGED**

The two headings now read alike, and the parallel is structural, not approximate:

| | `§2·R3a` (`:402`) | `§2·R3b` (`:408`) |
|---|---|---|
| strike | `~~`fr-PaperArticleWindow K-20` BOOKED~~` | `~~`fr-PaperArticleWindow K-24`'s F.W1 LEG ANSWERED~~` |
| disposition | `— **DISPOSED, NOT BOOKED**` | `— **DISPOSED, NOT BOOKED**` |
| provenance | `<sub>*re-homed TERMINAL per E6-3 (2026-08-29)…*</sub>` | `<sub>*re-homed TERMINAL per E6-3 (2026-08-29)…*</sub>` |
| ruling tail | `(ruling R3-2.2 item 2; PASS-3 escape #1, MAJOR)` | `(ruling R3-2.2 item 2, second half; PASS-3 escape #4, INFO)` |

⊕ **The register corroborates, and its count is correct post-strike.** `F-W1:602` reads `- **fr-PaperArticleWindow** (6): `R-9` · `PAW-1` · `PAW-33` · `PAW-37` · `PAW-43` ~~· `K-20`~~ · `PAW-51` ~~· `K-24`~~` — **both ids struck**, six live ids, and the declared `(6)` matches the six survivors exactly. ✔

### §4.3 `F-W5:265` — the restated confinement claim, re-measured at final bytes

The pass-8 MEDIUM is **CURED**, and cured in the right shape: the bare universal is **gone**, replaced by an enumeration with its instrument beside it. This seat re-ran the claim's own probe independently, with a depth-counted masker.

⟨cmd⟩ this seat, base `waves/`, `python3`, masking `~~…~~` · `<sub>…</sub>` · **depth-counted** `⟨…⟩`:

| the claim | this seat's measurement | |
|---|---|---|
| `118` at **FOURTEEN** occurrences on **SIX** lines | `{101:1, 265:8, 269:1, 275:2, 381:1, 427:1}` = **14 on 6** | ✔ |
| **(i) SIX** on the five other lines, every one confined in a chase note | `1+1+2+1+1` = **6** | ✔ |
| the five lines are `:101` `:269` `:275`(×2) `:381` `:427` | identical, address for address | ✔ |
| **(ii) EIGHT** on this line | **8** | ✔ |
| `LIVE OUTSIDE :265 = 0` | **`LIVE OUTSIDE :265 = 0`** | ✔ |
| a flat non-nesting regex reports **TWO** false live hits | **2** — at `:101` and `:381` | ✔ |

▲ **Six of six exact, including the note's disclosure of its own instrument's failure mode.** The clause predicts the precise number of false positives a naive masker will produce and names the cause; this seat reproduced both the number and the two addresses without having read the prediction first. **A claim that tells you how to break it, and is right about how, is the strongest form available here.**

⊕ **The replaced universal was genuinely false when written**, and this seat verified that against the certified bytes rather than adopting it — see §ERRATA-OF-INSTRUMENTS.

---

## §5. LANDED-WRONG — three, filed here and nowhere else

### LW-R8-a — `F-W4:305`'s **record** denominator is stale; the block still does not close

**`F-W4:305` reads `**(b) THE ESCAPES, BOOKED BY BANKED ID — 71 rows on 17 records**`.** The rows are right. **The records are not: there are 16.**

⟨cmd⟩ this seat, base `waves/`, `python3` — distinct `fr-*` records in the block:

- **group records (8)**: `fr-MorphShapePreview` · `fr-VisualizationView` · `fr-DarkModeToggle` · `fr-ConvergenceTimeline` · `fr-ContourEditorCanvas` · `fr-ImageUpload` · `fr-EquationView` · `fr-EquationPanel`
- **single records (8, live)**: `fr-BasisCanvas` · `fr-CoefficientsSpectrum` · `fr-FourierMorphSvg` · `fr-HarmonicLevelGrid` · `fr-PaperView` · `fr-SliderControl` · `fr-SpeedSelect` · `fr-EquationResult`
- **overlap: none. TOTAL DISTINCT: 16.**

**The seventeenth record was `fr-ContourPreview`** — contributed solely by the struck `KILL-3`, and named nowhere else in the block. E6-3 removed a row **and its record**; round 7 re-based the row figure `72 → 71` and left the record figure; round 8 re-based the summing sentence to agree with the header's row figure and declared *"The three figures now agree."*

▲ **They do — and that is the defect.** The round reconciled three figures **against a header whose other half was stale**, and the pre-E6-3 pair `(72, 17)` was self-consistent in exactly the way `(71, 17)` is not. `71 = 63 + 8` needs **8** single-records; `17` needs **9**. **Grade: MINOR.** It books nothing, the list is enumerable in place, and the correct figure is derivable from the block as written — but it is a live denominator that is wrong at the bytes, on the one line this round re-added against.

### LW-R8-b — `F-W8:246`'s receipt coordinates have never reproduced

**Published**: ⟨cmd⟩ `` /usr/bin/grep -nF 'fr-ContourPreview** (1): ' "$C" `` → **three lines** — `` `5044:… `L:L-5`` `` · `` `5091:… `C:D-11`` `` · `` `5358:… `R6-8`` ``.

**Re-run by this seat, verbatim, at the frozen canonical:**

```
5084:- **fr-ContourPreview** (1): `L:L-5`
5131:- **fr-ContourPreview** (1): `C:D-11`
5397:- **fr-ContourPreview** (1): `R6-8`
```

**Content, order, ids and the `three lines, residue disclosed` classification are all correct. The coordinates are stale by `+40 / +40 / +39`.**

▲ **The sibling receipt on the same file was re-based for exactly this shift, and this one was missed.** `F-W8:20`'s chase note minutes *"the round-5 paste read `5038:### F.W5 — **28 rows**` / `5052:` and both coordinates and the F.W5 figure moved, REST-51"* — `5038 → 5078` and `5052 → 5092`, **the same `+40`**. Round 7 chased the shift into `:20` and not into `:246`; round 8 edited `:246` and did not re-run it. **Grade: MINOR** — the identity claim it supports (`L:L-5` is homed at `F.W5`, not the band) is TRUE and re-verified by this seat at `5084`; only the addresses are dead.

### LW-R8-c — `F-W8:328`'s receipt is **falsified by round 8's own edits**, in the note that publishes it

**Published** (inside the round-8 chase note): *"`fr-ConvergencePlot` is named nowhere in this file's §6a citation rows (⟨cmd⟩ `/usr/bin/grep -n 'ConvergencePlot' waves/F-W8.md` → **one hit, `:20`**, the canonical-heading quotation)"*.

| | `grep -n 'ConvergencePlot' waves/F-W8.md` |
|---|---|
| **at HEAD** (pre-round-8) | `20:` — **one hit. The receipt was TRUE when cut.** |
| **at final bytes** | `20:` `40:` `78:` `165:` `246:` `328:` — **six lines** |

▲ **The five new occurrences are on exactly the five lines round 8 edited** — `40`, `78`, `165`, `246`, `328` — because every round-8 chase note in this file names `fr-ConvergencePlot K-13` as the id E6-3 moved. **One of them is line 328 itself**: the receipt is falsified by the sentence that contains it, at the moment of writing.

⌧ **This is the `false-at-write receipt` class, and the program has already ruled on it twice.** PASS-4 convicted twelve instances. `F-W6:634` struck a receipt for counting a moving reference and drew the lesson — *"The receipt is STRUCK, not re-pasted — re-pasting would bank a second count of a moving reference"* — and `R3-3.10` retires the shape outright: **no banked `⟨cmd⟩` whose output is a count of a live sibling may stand in a spec.** Here the "live sibling" is the file itself. **Grade: MEDIUM.** The *substantive* claim survives — `fr-ConvergencePlot` is genuinely absent from `F-W8`'s §6a citation rows, and this seat confirms all five new hits are chase-note prose, none a citation row — but the receipt as published is false at the bytes, and a successor re-running it gets six.

⊘ **Cure shape, for the next round, stated once**: the receipt must be scoped to what it actually asserts (`§6a` rows) or struck to a classification, as `F-W6:634` was. **It must not be re-pasted with `six` in place of `one`** — that banks a second count of a target the next edit moves again.

---

## §ERRATA-OF-INSTRUMENTS — 2026-08-29

**Standing purpose.** E-3 bars editing a sealed instrument. When a prior pass's seal is found false at the bytes, the correction lives **here**, in the current seal, naming the falsified cell by address and the governing decree by name. This section is that record for pass 8.

### E8-I-1 — `PASS-7/SEAL.md` §2.2, row 6 (`F-W5.md`) is **FALSIFIED AT THE BYTES**

**The cell, verbatim at `PASS-7/SEAL.md:108`:**

> `| `F-W5.md` | **28** at `:9` `:265` `:279` | **27 rows** ⊕ `27+89 = 116` | `28` inside the chase notes only | ✔ |`

**The certification — *"`28` inside the chase notes only"*, ticked — is false.** At the bytes that seal certified (`HEAD`, the round-7 close), `F-W5` carried the superseded band figure **live, in current voice, at five sites**.

⟨cmd⟩ this seat, `git show HEAD:…/F-W5.md`, depth-counted masking, spelling-agnostic:

| | at the certified bytes |
|---|---|
| `:95` | `` §2's `F.W5` (28) ⊕ `F.W5-W8` (90) rosters, verbatim, record-qualified `` |
| `:99` | `` ## 2. Carry — … (the canonical F.W5 band: 28 ⊕ 90 = 118 record-side rows) `` |
| `:101` | `` the `F.W5` roster (28) ⊕ the `F.W5-W8` roster (90), adopted verbatim `` |
| `:381` | `` §2's `F.W5` roster (28) ⊕ `F.W5-W8` roster (90) = 118 record-qualified rows `` |
| `:427` | `` §2: `F.W5` 28 ⊕ `F.W5-W8` 90 = 118 rows), verbatim — that roster ALONE `` |

**None is inside a chase note. All five are the wave's declared operand, its section heading, and its G19 gate cell and run instruction.**

**Why the tick was earned and still wrong.** The seal's probe searched the spelling `**28 rows**`. This seat re-ran that exact probe at the same bytes: ⟨cmd⟩ `grep -c '\*\*28 rows\*\*'` → **0**. The probe was correct; **its operand was a spelling.** Every survivor spells the figure `(28)` or `28 ⊕ 90` — parenthesised or bare, never as the canonical's heading form.

**The class, named.** This is precisely the defect `F-W6:526`'s own **R2-9** decree describes:

> *a gate that states a shape- or spelling-restricted operand is **DEFECTIVE at authoring, whatever its result***

▲ **"Whatever its result" is the operative clause.** The pass-7 cell was defective **when written**, not when falsified — the `✔` it returned is not evidence that the probe was sound, and a successor reading only the tick would have concluded the round-7 re-base was total. It is the same failure the round-7 reconcile itself committed on the wave duties: as `PASS-8/CHECK.md` puts it, round 7 *"never swept the band denominator, because every surviving site spells it `(28)` / `28 + 90` rather than the `**28 rows**` form the reconcile and the seal both probed for."* **The reconcile and its seal shared one instrument, so the seal could not catch the reconcile.**

**Scope — ONE cell, not a method-wide failure.** This seat re-verified the other five denominator rows of the same table against the canonical:

⟨cmd⟩ base `conformance/`: `/usr/bin/grep -nE '^### F\.W[0-9-]+ — ' CENSUS-CANONICAL.md`

| row | seal said | canonical reads | |
|---|---|---|---|
| `F-W0.md` | **55** | `:4841` **55 rows** | ✔ |
| `F-W1.md` | **330** | `:4873` **330 rows** | ✔ |
| `F-W2.md` | **23** | `:4941` **23 rows** | ✔ |
| `F-W3.md` | **919** | `:4959` **919 rows** | ✔ |
| `F-W4.md` | **1007** | `:5021` **1007 rows** | ✔ |
| `F-W5.md` | *"28 in chase notes only"* | **FALSIFIED — 5 live sites** | ✗ |

**Five of six re-verify. The method held; one cell's probe was spelling-bound and the figure it guarded was the one that moved twice** (`90 → 89` at **E5-15**, then `28 → 27` at **E6-3**), so the survivors were split across two spellings and two errata rounds.

**Disposition.** `PASS-7/SEAL.md` is **NOT EDITED** — E-3 forbids it, and the seal's own §1 records that it edited nothing, which remains true and should stay true. **Row 6 of its §2.2 is superseded by this section.** A successor consulting that table must read this erratum beside it. The other twelve rows of `PASS-7/SEAL.md` §TABLE-R7, and its §2.3 subtraction, are **unaffected and re-verified** at §1 above.

**The standing lesson, stated once.** *A denominator probe must be spelling-agnostic or it is not a probe — and a seal that shares its instrument with the round it certifies cannot falsify that round.* Round 8 is the first pass in this program to run the sweep bare-numeric, and it found four sites beyond its own check's list (§2.4). **The instrument, not the diligence, was the variable.**

---

## §TABLE-R8 — sha256, the last act of this seal

⟨cmd⟩ base `docs/tranches/X/fourier/`, run as the final act of this seat, after every verification above and after the last byte of this file's body:

`shasum -a 256 waves/F-W*.md conformance/CENSUS-CANONICAL.md conformance/PIN-PURGE-CERT.md`

```
c03149fc2f9e2bec601fe4e00982705203f4b0b3fac78afdd1bde097aa7d4af1  waves/F-W0.md
0b638dc6386b8a966659f8445852c3c9105669c0f1b36257e23751983eca764c  waves/F-W1.md
d97a0123bf99ceba2f9c97a4a484ba03e482188f478b0e4d0910e32e80910fa9  waves/F-W10.md
655a21e7a64dd59c4bb954383ebf69bec829f295f7c6797a7c5cdf88e5d2ca65  waves/F-W2.md
bfa4278c5599b7866e87865f74b0380b91b27c2af77400f979d610e017f56cad  waves/F-W3.md
2f18c3d385f2c33c6e83d91df5f013c1f6b44b90eb176c878189c03bb07492d8  waves/F-W4.md
40bcad59cd2beed4e3e8453011b605bdcc9eab67082c9dc64bde131caea124ef  waves/F-W5.md
f32f8ec4eca5002933ff8456ed2c9a7ece00c218efa4277aff5e2ebc439317a1  waves/F-W6.md
16e35d5bb571708046033b10d20f9d0dc71e59c2d89fd52b7d824a877b74caaa  waves/F-W7.md
73ddc4d0bf0e1aa47ddd9123fe356d1d0ac0396fb838cb90506f706361074174  waves/F-W8.md
4972f6a418322629c73cd8e1ffac331d4ec4ecdab897bbed5bf1a79ceacf9602  waves/F-W9.md
f443627574581ec2a4138e46d927b5fc431a7a6657cae766f7ffafa01e770968  conformance/CENSUS-CANONICAL.md
4fc65bbd1d9b548fb01d18550194349c3a00274adf598dddc19012b04d5537b6  conformance/PIN-PURGE-CERT.md
```

**THIRTEEN ROWS.** Row 12 is the canonical at its **FROZEN** `f44362757458` — the gate of §1, unmoved. Row 13 is the certificate, byte-identical to `PASS-7/SEAL.md:322`. Rows 1, 3, 4, 5, 9, 11 (`F-W0` · `F-W10` · `F-W2` · `F-W3` · `F-W7` · `F-W9`) are byte-identical to `PASS-7/SEAL.md` §TABLE-R7. Rows 2, 6, 7, 8, 10 (`F-W1` · `F-W4` · `F-W5` · `F-W6` · `F-W8`) are the five waves round 8 repaired, and **only those five moved.**

**Nothing is written after this block.**
