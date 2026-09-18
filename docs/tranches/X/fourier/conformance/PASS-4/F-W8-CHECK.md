# F-W8 — FRESH ADVERSARIAL SPEC CHECK (L-18/L-20, PASS 4)

**Seat**: fresh, 2026-08-29. **Roster inherited: NONE.** Every figure below is re-derived from the frozen corpus (`$R = docs/tranches/V/megatranche/registry/adjudicated`, 66 `fr-*.md`) and from the live siblings at their own bytes, this seat, this sitting. `PASS-1`/`PASS-2`/`PASS-3` check files were **not read as operands** — `PASS-3/F-W8-CHECK.md` and `PASS-3/RULINGS-3.md` were read only to learn *what the round directed*, never to inherit a number.

**Target**: `docs/tranches/X/fourier/waves/F-W8.md` (mtime 2026-08-28 19:15:30, 359 lines).

**Detector law applied**: rows in ANY format (markdown table rows ⊕ id-headed bullets ⊕ prose routings walked to the enclosing row id ⊕ bare-first-cell rows), every routing token probed in **both** U+002D and U+2013, **record-qualified** id matching (`re.escape(id) + "(?![0-9A-Za-z])"`), and **slash/range expansion at every position**.

**VERDICT: DEFECTIVE** — 3 MEDIUM · 1 LOW. **routedTotal 125 · booked 84 · named 40 · escaped 1.**

---

## §1 — Census, re-derived

### 1a. Spelling census (A-2), re-run at the bytes

```
⟨cmd⟩ grep -rho  "F\.W5-W8"      $R/fr-*.md | wc -l  → 120     grep -rlo  … | wc -l → 26
⟨cmd⟩ grep -rho  "F\.W5–W8"      $R/fr-*.md | wc -l  →  72     grep -rlo  … | wc -l → 24
⟨cmd⟩ grep -rhoE "F\.W5[-–]W8"   $R/fr-*.md | wc -l  → 192     grep -rloE … | wc -l → 49
⟨cmd⟩ grep -rhoE "F\.W8"         $R/fr-*.md | wc -l  →   0
both-spelling records: fr-ContourPreview (1)  ⇒ en-dash-ONLY = 24 − 1 = 23
```

Every A-2 figure in `F-W8.md` §1/G15 reproduces **exactly**: 120/26 · 72/24 · 192/49 · 23 en-dash-only · 0 direct `F.W8`. The en-dash arm is non-∅, as the gate asserts.

**But the two-dash probe is not the whole band.** An exhaustive enumeration of every wave-range spelling in the corpus, run this seat:

```
⟨cmd⟩ grep -rhoE "F\.W[0-9]+[^a-zA-Z0-9]{0,3}W[0-9]+" $R/fr-*.md | sort | uniq -c | sort -rn
   1010 F.W3/W4      120 F.W5-W8      72 F.W5–W8      54 F.W9/W10
      5 F.W1/W2        2 F.W0/W1       1 F.W5(-W8      1 F.W1→W4      1 F.W1/W3
```

`F.W5(-W8` is a **third band spelling**, invisible to `F\.W5[-–]W8`. It is defect **D-1**.

### 1b. Record partition, re-derived

| stratum | count | verdict |
|---|---|---|
| token-bearing records (two-dash) | **49** | reproduces |
| boilerplate-only (route nothing) | **5** | reproduces, **by name** |
| measured band NEGATIVES | **7** | reproduces, **all 7 quotes byte-exact** |
| positive-routing records | **37** | `49 − 5 − 7 = 37` reproduces |

The 5 boilerplate-only records — `fr-AdminUserList` · `fr-CanvasOverlayButton` · `fr-DarkModeToggle` · `fr-GlassTimeline` · `fr-HarmonicLevelGrid` — each carry their sole band token inside a `Routing law` / `Routes:` / routing-taxonomy line. Confirmed.

The 7 negatives were re-read at the cited line, each under `grep -qF` of the file's own quoted bytes — **7 of 7 MATCH**:

| record | cite | quoted bytes | result |
|---|---|---|---|
| fr-App | `:144` | `Nothing routes → F.W5–W8` | MATCH |
| fr-CollapsibleSection | `:131` | `F.W5–W8 gets nothing — the component is API-inert` | MATCH |
| fr-MobileFloatingToc | `:97` | `**F.W5–W8 gets nothing**` | MATCH |
| fr-MorphShapePreview | `:110` | `preserved so no F.W5-W8 row manufactures overlap` | MATCH |
| fr-PaperSearch | `:90` | `**F.W5-W8 empty** (measured zeros)` | MATCH |
| fr-PaperSearchDropdown | `:77` | `**F.W5-W8 = no rows.**` | MATCH |
| fr-PaperSearchInput | `:125` | `**F.W5-W8 empty** (the banked zeros hold)` | MATCH |

### 1c. Escape hunt — independent, shape-agnostic

**167** non-boilerplate band lines across the 37 positive records were extracted and shape-classified by this seat (**50** table rows · **104** id-headed bullets · **13** record-level prose). Every row-shaped line's head identity was tested for presence in `F-W8.md` under boundary-aware matching. **30 lines flagged; on inspection 30 of 30 are probe artifacts or record-level prose, not escapes:**

- 22 are masthead `Routes:`/`Line anchors` lines or terminal `ADJUDICATED`/`VERDICT` tallies — record-level prose about routings, not routings.
- 8 are id-parse failures on non-ASCII or non-dashed ids, each present in the target: `M-β4` (2 hits) · `R6-8` (12) · `MISSED-E` (1) · `M-CK` (2) · `M-SB` (1) · `M-DV` (1) · `AA-2` (1) · `GAB-1` (4). `fr-AnimationControls:129`'s fold bullet resolves to `fr-BasisCanvas BC-9/C-6/D-20`, booked at §3 **R1**.

**Under the two-dash detector, zero escapes.** The one escape found this pass is recovered by the **third spelling** (§2, D-1), not by shape.

### 1d. Multi-routing lines — reproduces

```
⟨cmd⟩ (per-line count of F\.W5[-–]W8 across the 37 positive records, ≥2 only)
  fr-EquationPanel.md:48  tokens=2      fr-SpeedSelect.md:26  tokens=2
```

**Exactly two**, as §1d asserts. `fr-SpeedSelect:26` is the one `SS-C-1` identity split (read leg → GCM-1 at P3; write leg → R2). `fr-EquationPanel:48`'s two distinct band identities are now **both rowed** — row 19 (`D-10+D-L12+C-22`) and row 20 (`D-L5+C-1`) — which is PASS-3 D-1 **cured**.

### 1e. Measured partition

| figure | spec | this seat |
|---|---|---|
| routedTotal | 124 | **125** — 124 under the stated two-dash detector ⊕ **1** recovered by the third spelling (D-1) |
| bookedCount (§3) | 84 | **84 as stated** — §3 is exactly **28** rows (P1–P8 · J1–J7 · R1–R6 · M1–M5 · D1–D2); but the figure is **never enumerated** (D-3) |
| named at §6a | 40 | **40 rows, all 40 verified band-routed at their cited corpus line** |
| escapedCount | 0 implied | **1** (`fr-ContourPreview L:L-5`, `:46`) |

`125 = 84 booked + 40 named + 1 escaped`.

---

## §2 — Defects

### D-1 · MEDIUM · A third band spelling exists; G15's regex cannot see it, its own expansion rule says it should, and one identity escapes

`fr-ContourPreview.md:137` spells the band `F.W5(-W8)`:

```
⟨cmd⟩ grep -rn "F\.W5(-W8" $R/fr-*.md
  fr-ContourPreview.md:137: … Fifteen of forty-two rows route to F.W4, three to F.W1 …,
  two to F.W2, three to F.W3, two to F.W5(-W8), one to F.W9/W10, four NO-WAVE-OWNER …
```

This falsifies **§1's own load-bearing claim** at `F-W8.md:54` — *"the entire band routes as the atom `F.W5-W8`"* — and it is **not** caught by G15's stated probe. Worse, **G15's cell contradicts itself**: it decrees *"**(expansion)** every slash form expands to its member set … **a span containing 8 routes the band**"*, and `F.W5(-W8` is exactly such a span — but the regex it states one clause earlier, `F\.W5[-–]W8`, cannot match it.

**An identity escapes on it.** The record's own verdict tally declares **two** band routings. Enumerating every `F.W5`-token row in that record:

```
⟨cmd⟩ (all lines matching F\.W5(?![0-9]) in $R/fr-ContourPreview.md, with row head + tokens)
  :30   (masthead prose)                    tokens=[F.W0 F.W1 F.W2 F.W3/W4 F.W5–W8 F.W9/W10]
  :44   row 11 / C:D-2 · L:L-6              tokens=[F.W4 F.W5]   → "ADJUDICATED → **F.W4**
                                              (`?:`; pairs with row 13's F.W5 seam change)"
  :46   row 13 / L:L-5                      tokens=[F.W5]       → "ADJUDICATED → **F.W5**
                                              (readonly/`getPoints` seam; a TWO-member change)"
  :61   row 28 / D:i-3 · L:L-8              tokens=[F.W4 F.W5-W8]
  :137  (verdict tally)                     tokens=[… F.W5(-W8 …]
```

`:44` routes **F.W4** at its terminal cell, so the tally's **two** are `:46` (`L:L-5`) and `:61` (`row 28`). `F-W8.md` names **one** of them:

```
⟨cmd⟩ grep -c 'ContourPreview' waves/F-W8.md  → 1     (§6a row 13 = row 28 / D:i-3 · L:L-8)
⟨cmd⟩ grep -c 'L:L-5'          waves/F-W8.md  → 0
⟨cmd⟩ grep -c 'L:L-5'          waves/F-W5.md  → 1     ⟨cmd⟩ … waves/F-W6.md → 3
```

`L:L-5` has **zero bytes** in the target. It is program-held (F-W5 and F-W6 both carry it), so the lawful landing is a **§6a citation row**, not a booking — but it has no row, and §6a is declared to be *"the per-id operand **G15** runs its set difference against."*

**This is not a novel reading.** `PASS-3/RULINGS-3.md` **R3-5.2** — this round's own law — names `F.W5(-W8` as one of *"FOUR band spellings"* the corpus uses, cites `fr-ContourPreview:137` as its site, names *"whose second span row is `L:L-5` at `:46`"*, and lists `L:L-5` first among **ten escaped identities**. The ruling directed F-W6 to re-cut; F-W8, whose §6a is the band's per-id operand, was not directed and did not re-cut. On the gate's own decree — *"a shape-restricted operand is DEFECTIVE at authoring whatever its result"* — a spelling-restricted one convicts identically.

### D-2 · MEDIUM · The masthead's "verbatim and complete" heading paste no longer reproduces, and the figure it carries is one the keystone has expressly forbidden

`F-W8.md:18` pastes the keystone's section headings under an explicit completeness label:

> ⟨cmd⟩ `grep -n '^## ' waves/F-W5.md`, **verbatim and complete**: *"`## 0. State` · `## 1. Bounds` · `## 2. Carry — the adjudicated band agglomerated (**167** id-keyed routings)` · `## 3. Gates — 22, all born-RED` · …"*

Re-run this seat:

```
⟨cmd⟩ grep -n '^## ' waves/F-W5.md
  19:## 0. State
  43:## 1. Bounds
  86:## 2. Carry — the adjudicated band agglomerated (170 id-keyed routings)
 276:## 3. Gates — 22, all born-RED
 309:## 4. Cross-edges — declared from THIS end (one home, two citations)
 331:## 5. Carried by citation — the excluded-from-clause-tables set (G19's other operand)
 346:## 6. Close (unit e checklist — all `planned`)
```

Six of seven limbs match byte-for-byte. **The second does not**: `167` → `170`. `grep -c '167' waves/F-W8.md` → 2, of which `:195` is a source coordinate (`gallery.ts:167`) and `:18` is this paste; `grep -c '170'` → **0**.

Three things make this consequential rather than cosmetic:

1. **The keystone has ruled the figure unquotable.** `F-W5.md` §2c: *"**The PASS-1 `162` AND the round-2 `167` are superseded figures, and NEITHER may be quoted as this gate's operand (R3-4.5)**"*, and `F-W5.md:249` minutes *"**THE 167 → 170 DELTA, MINUTED PER ID**"*.
2. **It is a banked count of a live sibling** — precisely the class **R3-3.10** forbids. `F-W8.md:7` claims that law *"is applied at **every** site in this file that carried one"*, and the file discharges it correctly at three other sites (the `§6b`/`§6c` probe converted `grep -c` → `grep -o`; the `raw-findings` self-count restated as set-membership; G15's `grep -c "F\.W8" F-W5.md → 0` restated as a dated classification). The count hiding **inside a quoted heading** was not swept.
3. **It is the file's own convicting standard.** `F-W8.md:5`: *"a receipt that cannot be re-run is not a receipt — which is exactly the standard this file applies to its sibling[s]"*, and this very paste was authored to cure a prior truncation *"since a heading is exactly the kind of stable anchor other specs are ordered to cite by."* A heading is a stable **anchor**; its **text** is not, once it carries a census figure.

**Concurrency is a mitigation, not a cure**: `F-W5.md` was rewritten at **19:19:20**, after the target's **19:15:30**, so R3-3.8's *"PURGE SEAT runs LAST"* sequencing did not hold across this pair. The finding stands because the remedy is available without re-reading the sibling — cite `F-W5 §2` by label and drop the parenthetical, exactly as the file already does for `F-W0`'s gates and the carry's `§Rows D`.

### D-3 · MEDIUM · `bookedCount` and `routedTotal` are check-file-descended arithmetic, never enumerated from the corpus

`§6a`'s **40** are genuinely corpus-derived — this seat machine-verified all forty (§3b). The other two figures in the same stamp are not. `F-W8.md:85` states their whole derivation:

```
"PASS-1/F-W8-CHECK.md §1 … its own per-record mark table tallied 87 B / 36 E … round 1
 corrected that split to 87/36. Round 2 supersedes the operand, not just the split:
 87 − 3 false marks = 84, 36 + 4 = 40, 123 + 1 omitted = 124."
```

So `84 = 87 − 3` and `124 = 123 + 1`, where `87` and `123` are **`PASS-1/F-W8-CHECK.md` §1's per-record mark tally**. No per-id enumeration of the 84 exists anywhere in the file — §3's 28 rows carry the ids in prose cells and are never counted out — so the figure cannot be re-derived by a reader, only re-inherited.

**R3-4 makes this FAIL-BY-CONSTRUCTION program-wide**, in the keystone's own words (`F-W5.md` §2): *"a closure/census transcript whose LHS is a count copied from any check file **FAILS BY CONSTRUCTION** — a gate whose operand is a superseded seat's enumeration can only re-find that seat's misses, and this one did exactly that."* F-W5 cured the identical shape this round: it struck `167`, re-derived from the 66 records under its own detector, and landed **170**. The delta it found — **+3** — is the measure of what inheriting had hidden.

Mitigating: G15 is born-RED, the cell declares *"if the closure run returns a different denominator, the closure run governs and this cell is amended, not defended,"* and §6a's 40 are sound. Not mitigating: R3-4's law bites **at authoring**, not at closure, and the file's own §1 header calls 124 *"the operand G15 and §6a run against"* while sourcing it from the check file its masthead says it did not read as an operand.

### D-4 · LOW · The two ends of the F.W5↔F.W8 reciprocal now derive the same roster with different spelling sets

G15 differences F-W8's rows against *"the band's routed registry identities"*; `F-W5` G19 runs the reciprocal over *"the 170-routing roster re-derived from the 66 records under §2's ROSTER DETECTOR."* Those detectors are no longer the same instrument:

```
F-W5 §2 ROSTER DETECTOR (round 3):  spellings = {F.W5, F.W5-W8, F.W5–W8}, both dashes,
     token-bounded F\.W5(?![0-9])  →  245 occurrences / 240 lines / 54 records; routedTotal 170
F-W8 G15 (unchanged):               spellings = {F.W5-W8, F.W5–W8}
     →  192 occurrences / 49 records; routedTotal 124
F-W5 §6 close item 1: "all four shapes ⊕ both dash spellings ⊕ token-bounded matching
     ⊕ record-qualification"
```

Five records the keystone's roster reaches — `fr-ConvergenceLegend` · `fr-ConvergencePlot` · `fr-EquationModeToggle` · `fr-EquationResult` · `fr-NotationPills` — carry **zero** two-dash band tokens (`grep -cE 'F\.W5[-–]W8'` → 0 each) and so lie wholly outside F-W8's denominator. Whether a bare-`F.W5` row is a *band* row is a real question F-W8 may legitimately answer "no" to; what it may not do is leave the question unstated while declaring a reciprocal closure with a wave that answers it "yes". Downgraded to LOW because the substantive escape it produces is the single one already booked at **D-1**, and because the fix is a sentence in G15's operand, not a re-census.

---

## §3 — What was verified CLEAN

### 3a. Receipt reality — 35 of 36 re-run receipts reproduce

The file carries **75** `⟨cmd⟩` markers. This seat re-ran **36 distinct receipts** at the live bytes. **35 reproduce; 1 fails (D-2).**

**Frozen corpus — 14 of 14 MATCH.** All four round-2 escape pastes are byte-exact at the tails they quote (`fr-ContourSettings:70` → *"**→ F.W5–W8** (contour provenance/CRUD union…)"*; `:67` → *"**→ F.W3/W4** … the shared-enum contract itself is an **F.W5–W8 rider**"*; `fr-GalleryCard:64` → *"serializer → F.W5–W8; JSC → SS-13"*; `fr-CanvasControlsDock:102` → *"C-28 into D-4's F.W5–W8 rider"*). `fr-FourierShapeExtractor` returns **exactly** the 22 pasted line numbers `16 41 51 52 53 54 55 56 57 59 71 72 81 83 85 86 87 88 90 91 149 157`, and the 18-rows + 4-record-level-prose split is correct. `fr-AdminUserList:89` tail-120 is the `**F.W5**` cap row and its band count is **1** (boilerplate only). `HLG-23` is at `fr-HarmonicLevelGrid:74` with the row head `**HLG-23 · C:C-12**`. `fr-GalleryInfiniteGrid:50/:51` both MATCH. `fr-EquationPanel:48`'s two `grep -oE` extractions return their quoted spans verbatim. `fr-EditorControlsDock:59` returns `F.W4` then `F.W5–W8`, and `F.W5–W8 rider` is present under `grep -oF`. The 7 negatives: above.

**Live siblings — 21 of 22 MATCH.** `F-W5`: clause **F9** (head, witness cell `D-10 + D-L12 + C-22 (EquationPanel)`, act cell) · **E14** head + the `(NOT fr-CoefficientsSpectrum M-13 …)` parenthetical · **D12**'s witness cell `FR-AUL-21 ⊕ FR-AUL-31 · **fr-ContourSettings M-10** (=L-M6/C-19/D-m9)` · **B1** (`row 26 C:C-12 (ImageUpload)`, `fr-CanvasControlsDock C-28`) · **B5** (`HLG-23 (C:C-12) · C §3 negatives (MorphShapePreview) · P-9 (cited; home F.W4)`) · **D17**/`ONLY the serializer arm` · **G22**/`dangling-cite resolution` · **C2**/`m-15 is CROSS-REFERENCED` · the **NINTH collision** block · §4's `v1 §6` row · `SS-L-07` §5 row · `§6b`/`§6c` → **no output** · `F.W8` token → **8** (non-∅, the reciprocal landed). `F-W0`: `### G-11 — ONE corrected anchor table published; every later wave quotes it` MATCH **as bytes, heading markup included** (PASS-3 D-4 cured); `G-12`/`G-13` present; the `SUBSTRATE-LEDGER.md` create row sits inside `## 2. Bounds`; `FR-NP-32` present. `F-W1`: the TWELVE-limb charter sentence MATCH byte-for-byte at `:276`, which is inside `## §4 Sequencing` (`:270`) and opens `4. **The atomic transaction (ONE change, G6):**` — the coordinate *"F-W1 §4 step 4"* is exact. `F-W3`: the §X.1-v4 criterion `grep -o 'One question of a PATH…the other twin CITES, never books'` returns **1** hit, verbatim. `carry/F-W4-CARRY.md`: `grep -oE '^## §[A-Za-z0-9]+'` returns **exactly** the five anchors `## §0 · ## §Rows · ## §Gates · ## §Bounds · ## §CrossEdges` — PASS-3 D-3 cured by *narrowing the command to the claim* rather than by widening the paste — and `grep -n '^### D · '` returns `172:### D · … (the transport cluster)`; the `SS-L-07/SS-C-10` ⟨SpeedSelect⟩ bullet is at `:234`, unchanged. `COHESION.md` exists and carries its SS-4 rows.

**Value-side amendments A-1/A-3 — every receipt exact.** `find . -name diff.test.ts` (non-node_modules) → **0** · `ls api/src/lib` → *No such file or directory* · `api/dist/lib/crud/` → **4** artifacts (the corpse) · `atomdiff|atomDiff|AtomDiff` across `api/src src` → **1** hit · `api/src/modules/palette/hash.ts:26 computeAtomHash` / `:44 computeAtomSetHash` · `api/src/modules/palette/model.ts:84 export interface PaletteVersion`.

**The two round-3 PURGE-SEAT byte-checks are themselves correct.** Both claim the banked span had *added* bold absent from the record. Verified: `fr-GalleryCard:64` reads `serializer → F.W5–W8;` and `fr-CanvasControlsDock:102` reads `C-28 into D-4's F.W5–W8 rider;` — **no emphasis in either**, exactly as the notes state, and both are re-quoted from the bytes with the emphasis moved outside the quotation marks.

### 3b. §6a integrity — machine-verified, 40 of 40

§6a is **exactly 40 numbered rows** (`grep -cE '^\| [0-9]+ \|'` over the §6a span → 40). Every row was parsed to `(record, identity, cited line)` and checked at the frozen corpus:

```
parsed §6a rows: 40
FAILING rows: 0     — every cited line carries a band token AND the row's identity
                      is literally present at that line (row-number identities
                      "row 28"/"row 26" matched as | 28 | / | 26 |)
```

**PASS-3 D-1/D-2 are CURED, and cured the way R3-7.2 specified.** Row 19 now carries `fr-EquationPanel D-10+D-L12+C-22` homed at **F-W5 clause F9** — the band identity round 2 named in prose and failed to row — with its `sed -n '48p'` extraction reproducing verbatim. The census correction `D-3+C-5` is demoted to that row's **footnote, explicitly outside the 40**, and its non-band status is proved by its own routing cell (`F.W4 + F.W2 rider`), with the twin partition quoted from **F-W3 §X.1-v4** rather than from a rulings file. The closure stamp was **re-derived after the rows moved**: `16 + 17 + 5 = 38` cited (rows 1–16 ⊎ 18–34 ⊎ 36–40), `+1` excluded to F.W4 (row 17), `+1` at F-W5 §5 (row 35) `= 40`; ranges contiguous and arithmetically sound. `84 + 40 = 124` holds internally.

Row 17's round-3 sharpening is correct at the bytes: `fr-EditorControlsDock:59` is a **sole `F.W4`** spelling with a band **rider** whose subject is the *next* row's identity (`C-6 / C-7`, `:60`), booked at §3 P7 — so §X.1-v4's *"sole spellings home at their named wave"* homes it at F.W4, asking nothing of F.W3.

### 3c. M-25 depth — locks by banked id

`FR-NP-32` is stated in **R-8 canonical form** at every site: `grep -c 'PaperSidebar' waves/F-W8.md` → **1**, and all three `FR-NP-32` occurrences (all on `:253`) read `FR-NP-32 (≡ fr-PaperSidebar M1)` or sit inside the quoted F-W0 carry-row cell that itself spells the canonical form. R2-7.5/R3-8 satisfied.

**`PAW-44` · `LAW-3` · `MPC-31` · `FR-MSP-6` are correctly absent — conformance, not omission.** Re-derived at the corpus this seat:

```
PAW-44, LAW-3  → fr-PaperArticleWindow.md   band=0  bare-F.W5=0
MPC-31         → fr-MorphPhaseConfig.md     band=0  bare-F.W5=0
FR-MSP-6       → fr-MorphShapePreview.md    band=1  (the measured NEGATIVE at :110)
```

None of the three records routes a positive band row under **any** spelling, so none owes F.W8 a row.

Locks carried and intact, each present by banked id: `K-1` (6) · `K-3` (3, the anti-cure — *m-7's 422-straddle is refuted from source; the fixtures may not cite it*) · `K9` (4) · `K12` (5) · `FR-GV-24` (5, the anti-cure — *repair tests must not assert a re-open increment*) · `M-2` (7) · `DO-NOT-REGENERATE` (4) · `basisFilter` WAVE-LOCK (3) · `MF-9` (3) · `BC-20` (2, *not re-booked*) · `canonical_digest` (4, SKIPPED) · `UTF8_BYTEWISE_CODEPOINT` (2) · `X-9` (4) · `D-19` (9) · `FR-GIG-5` mirror (9) · `ANTI-RENAME` (3). Dissents preserved with revival conditions (D2's reader-1 BLOCKER positions on `L-B1` / `L-B2/C-2` under the DO-NOT-REGENERATE tripwire; FR-GFC-1's filings at P8).

**Twin law** is applied, not merely cited: §X.1-v4's criterion is quoted whole at row 19's footnote and *used* to home both row 17 and the demoted `D-3+C-5`.

### 3d. Gates and posture

**16 gates, `G1`–`G16`, all born-RED**; `grep -c 'born-RED'` → 6, no seventeenth gate minted, and A-1/A-2 are absorbed as witness corrections per L-19. **No GREEN is claimed**: all 3 `GREEN` occurrences are the split-verdict discipline (*"**F.W8 never claims a GREEN it did not execute**"*) or a named external GREEN owner. **Zero VERIFIED**: the four-verb row reads `| VERIFIED | **NO** | — stamped only at X·F's release close |`; the only other occurrences are `VERIFIED-GAP` value-side classifications and *"zero UNVERIFIED credit"*. `Status: **planned**` with the execution gate ABSOLUTE. Tree **READ-ONLY** with the read-only-measurement carve-out stated and dated. `scripts/dev/dev.sh` named as the never-staged unowned row; pathspec commits only.

**F.W1's transaction is cited whole at its pinned coordinate** — *F-W1 §4 (Sequencing), step 4 "The atomic transaction (ONE change, G6)"* — with the TWELVE-limb extent **re-quoted from F-W1's own cure** rather than re-derived, and the `:294` pin cited by the label *"F-W1 §4's cross-edge 1"* rather than by line. Both coordinates verify (`## §4 Sequencing` at `:270`; step 4 at `:276`; `:294` inside the same span).

**W7 zero-row posture holds**: F.W8 *"rules nothing F.W5's ruling block already owns, and runs no live probe (SS-13)"*, F.W7 owns the compression, and the FR-GIG-5 mirror bars crediting F.W8 with another wave's cure. **SS-4 owner rulings are flagged inline** (5 sites), scoped to only what F.W5's block does not own. The `F.W9/W10` edge declares F.W8 author/emitter and F.W9/W10 runner. The double-home risk is declared rather than hidden, and **`FR-AUL-46` stays cured** per R3-6.4 — band count **1** (boilerplate), one home at F-W5 **D7**, J4 carrying the citation form.

The **anchor idiom held again under live concurrency.** `F-W5.md` (19:19:20), `F-W0.md`, `F-W2.md`, `F-W6.md`, `F-W9.md` and `F-W10.md` were all rewritten *after* the target's 19:15:30 write, and **not one anchor-keyed citation broke** — every clause id, gate id, heading label and bounds-row label still resolves. The single quotation that did break (D-2) is the one place the file pasted a sibling's **text with a figure in it** instead of citing its **label**.

---

## §4 — Ruling compliance (RULINGS-3 row for F-W8: two items)

| ruling | required | this seat |
|---|---|---|
| **R3-7.2** | row 19 re-attached: `D-10+D-L12+C-22` rowed at F9 · `D-3+C-5` demoted · header + stamp re-derived | **APPLIED, and correctly** — the member is rowed with its home verified at the live keystone, the non-member is a footnote explicitly outside the 40, the stamp was restated only after the rows moved, and G15's cell records the HALT condition as **LIFTED, not the gate** |
| **R3-3.9** (purge share) | D-3 carry heading paste completed or elided honestly · D-4 markup-in-verbatim | **APPLIED, and better than the letter** — D-3 was cured by *narrowing the command to the claim* (`grep -oE '^## §[A-Za-z0-9]+'`, whose output IS the five anchors) plus a second command for the nested `### D ·` heading, rather than by widening the paste; D-4 was cured by re-quoting `### G-11 …` **as bytes, heading markup included** |

Program-wide shares also discharged: **R3-3.10** (7 citations; the `§6b`/`§6c` `grep -c` → `grep -o` conversion, the `raw-findings` self-count restated as set-membership, G15's `grep -c "F\.W8"` restated as a dated classification) · **R3-8** (FR-NP-32 canonical, verified by count) · **R3-1a** (§X.1-v4 consumed at rows 17 and 19) · **R3-6.4** (FR-AUL-46 untouched) · **R3-3.7/3.8** (the two purge byte-checks, both correct at the bytes).

**Not discharged**: **R3-3.10** at the one site that carries a live-sibling count inside a quoted heading (**D-2**), and **R3-4**'s standing FAIL-BY-CONSTRUCTION law, which named five denominators and did not name F-W8's — whose `84`/`124` are check-file-descended all the same (**D-3**).

---

## §5 — Assessment

Three repair rounds and a fabrication purge have left this file in the best condition of any in the band. The round-3 work is genuinely good: **R3-7.2 was applied at the root rather than papered** — the band identity is rowed at its verified home, the non-member is demoted with its proof intact, and the stamp follows the operand instead of defending it, exactly as the file's own law requires. All forty §6a rows now survive a machine check at the frozen corpus, thirty-five of thirty-six re-run receipts reproduce, the four escape pastes and the seven negatives are byte-perfect, the value-side git receipts are exact to the line number, and the two purge-seat byte-checks are themselves correct — the file caught two markup drifts inside its own ⟨cmd⟩ spans and cured them honestly. The anchor idiom absorbed six concurrent sibling rewrites without a single broken citation.

The defects that remain are all one shape: **figures that entered the file from somewhere other than the corpus, and a detector narrower than the corpus it reads.** The band has a third spelling the gate cannot see even though the gate's own expansion clause says it should, and exactly one identity — `fr-ContourPreview L:L-5` — falls through it, in a record whose own verdict tally says two route to the band while the file names one. This round's rulings file found that spelling and that identity, at that line, and directed only F-W6 to act on it. The `84` and the `124` were never enumerated from the 66 records; they are `87 − 3` and `123 + 1` over a PASS-1 mark table, which is the precise construction R3-4 made fail-by-construction program-wide and which the keystone cured this round by re-deriving and finding **+3**. And the one quotation that stopped reproducing is the one that pasted a sibling's heading **text** — carrying that sibling's now-superseded census figure — where the file everywhere else cites a **label**.

None of this touches the wave's substance: the seam map, the join law, the round-trip legs and the measurement-integrity rows are sound, born-RED, and honestly scoped. The cures are a re-cut detector, one added §6a citation row, one struck parenthetical, and one re-derivation.

**verdictLocal: DEFECTIVE.**
