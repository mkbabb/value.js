# F-W8 — FRESH ADVERSARIAL SPEC CHECK (L-18/L-20, PASS 3)

**Seat**: fresh, 2026-08-28. **Roster inherited: NONE.** Every figure below is re-derived from the frozen corpus (`$R = docs/tranches/V/megatranche/registry/adjudicated`, 66 `fr-*.md`) and from the live siblings at their own bytes, this seat, this sitting. `PASS-1/F-W8-CHECK.md` and `PASS-2/F-W8-CHECK.md` were **not read as operands** — they are named only where the target file itself cites them.

**Target**: `docs/tranches/X/fourier/waves/F-W8.md` (mtime 2026-08-28 16:39:38).

**Detector law applied**: rows in ANY format — markdown table rows ⊕ id-headed bullets ⊕ prose routings walked to the enclosing row id — with every routing token probed in **both** U+002D and U+2013 (`F\.W5[-–]W8`), boundary-aware id matching, slash forms expanded.

**VERDICT: DEFECTIVE** — 1 MEDIUM (operand integrity, meets G15's own stated HALT condition) · 3 LOW (quotation form). **routedTotal 124 · booked 84 · escaped 1.**

---

## §1 — Census, re-derived

### 1a. Spelling census (A-2), re-run at the bytes

```
grep -rho "F\.W5-W8"       $R/fr-*.md | wc -l   → 120      grep -rlo … | wc -l → 26
grep -rho "F\.W5–W8"       $R/fr-*.md | wc -l   →  72      grep -rlo … | wc -l → 24
grep -rhoE "F\.W5[-–]W8"   $R/fr-*.md | wc -l   → 192      grep -rloE … | wc -l → 49
grep -rho "F\.W8"          $R/fr-*.md | wc -l   →   0
both-spelling records: fr-ContourPreview.md (1)  ⇒ en-dash-ONLY = 24 − 1 = 23
```

**Every A-2 figure in `F-W8.md` §1/G15 reproduces exactly**: 120/26 · 72/24 · 192/49 · 23 en-dash-only · 0 direct `F.W8`. The en-dash arm is **non-∅**, as the gate asserts.

### 1b. Record partition, re-derived

| stratum | count | verdict |
|---|---|---|
| token-bearing records | **49** | reproduces |
| boilerplate-only (route nothing) | **5** | reproduces, **by name** |
| measured band NEGATIVES | **7** | reproduces, **all 7 quotes byte-exact** |
| positive-routing records | **37** | `49 − 5 − 7 = 37` reproduces |

The 5 boilerplate-only records — `fr-AdminUserList` · `fr-CanvasOverlayButton` · `fr-DarkModeToggle` · `fr-GlassTimeline` · `fr-HarmonicLevelGrid` — were each opened: the sole band token in every one sits inside a `Routing law` / `Routes:` / `Routing per the census lane taxonomy` line. Confirmed.

The 7 negatives were re-read at the cited line and every quotation matched under `grep -oF`:

| record | cite | quoted bytes | result |
|---|---|---|---|
| fr-App | `:144` | `Nothing routes → F.W5–W8` | MATCH |
| fr-CollapsibleSection | `:131` | `F.W5–W8 gets nothing — the component is API-inert` | MATCH |
| fr-MobileFloatingToc | `:97` | `**F.W5–W8 gets nothing**` | MATCH |
| fr-MorphShapePreview | `:110` | `preserved so no F.W5-W8 row manufactures overlap` | MATCH |
| fr-PaperSearch | `:90` | `**F.W5-W8 empty** (measured zeros)` | MATCH |
| fr-PaperSearchDropdown | `:77` | `**F.W5-W8 = no rows.**` | MATCH |
| fr-PaperSearchInput | `:125` | `**F.W5-W8 empty** (the banked zeros hold)` | MATCH |

Secondary band mentions inside the negative records (fr-App `:156`, fr-CollapsibleSection `:131`, fr-MobileFloatingToc `:153`, fr-PaperSearchDropdown `:118`) were each opened and are **also negatives** — no positive routing hides in a negative record.

### 1c. Escape hunt — independent, shape-agnostic

157 non-boilerplate band lines across the 37 positive records were extracted (127 row-shaped, 30 record-level prose/VERDICT). Every row-shaped line's head identity was tested for presence in `F-W8.md` under boundary-aware matching. **Three lines flagged; all three are probe artifacts, not escapes:**

- `fr-BasisCanvas:93` `M-β4` — booked at §3 **R6** and G13 (regex lost the `β`).
- `fr-EasingCurvePreview:135` `R6-8` — booked at §3 **J1** (regex required an alphabetic prefix).
- `fr-FourierShapeExtractor:157` — the record's terminal VERDICT tally, which **D2 itself names** as one of its 4 record-level prose lines, not a row.

**No silent drop was found by bytes.** The one identity lacking a disposition row is found below (§2, D-1) and is *named* in the file, so it is not a silent drop either — but it is not in the operand.

### 1d. Multi-routing lines — the one defect class that bit

Exactly **two** corpus lines in positive records carry ≥2 band tokens:

- `fr-SpeedSelect:26` — both tokens belong to the **one** `SS-C-1` identity split (read leg → `F.W4 + F.W5-W8 rider`, folds to GCM-1 at P3; write leg → `F.W5-W8`, booked at R2). **Correctly handled.**
- `fr-EquationPanel:48` — two **distinct** band identities. **This is defect D-1.**

### 1e. Measured partition

| figure | spec | this seat |
|---|---|---|
| routedTotal | 124 | **124** — not falsifiable at the bytes; no escape found |
| bookedCount (§3) | 84 | **84** — §3 is exactly 28 rows (P1–P8 · J1–J7 · R1–R6 · M1–M5 · D1–D2) |
| named at §6a | 40 | **40 rows** — but **39 band + 1 non-band** (row 19), with **1 band identity unrowed** |
| escapedCount | 0 implied | **1** (`fr-EquationPanel D-10+D-L12+C-22`) |

---

## §2 — Defects

### D-1 · MEDIUM · §6a's operand contains a non-member and omits a member — G15's HALT condition is met at authoring

`fr-EquationPanel.md:48` is a 15-identity MAJOR line carrying **exactly two** band routings:

```
⟨cmd⟩ sed -n '48p' $R/fr-EquationPanel.md | grep -oE ".{0,150}F\.W5-W8"
  … · D-10+D-L12+C-22 (Terms names a quantity it stops governing; `budget` never
      forwarded — re-verified at latex_rendering.py:281 this session) — F.W5-W8
  … · D-L5+C-1 (full-payload re-upload vs the 5/60s compute limiter;
      two-slot hardening) — F.W5-W8
```

`D-L5+C-1` gets §6a **row 20** (home F-W5 clause C4). `D-10+D-L12+C-22` gets **no row at all**. Its home is real and the file knows it —

```
⟨cmd⟩ grep -n '\*\*F9\*\* A parameter that does not govern' waves/F-W5.md
  199:| **F9** A parameter that does not govern | D-10 + D-L12 + C-22 (EquationPanel) | …
⟨cmd⟩ grep -c 'D-10+D-L12+C-22' waves/F-W8.md            → 1   (row 19's prose only)
⟨cmd⟩ sed -n '/^## 3\. Carry/,/^## 4\. Gates/p' waves/F-W8.md | grep -c 'D-L12'  → 0
```

Meanwhile **row 19's slot is occupied by `fr-EquationPanel D-3+C-5`, which the row's own cell proves is NOT band-routed**:

```
⟨cmd⟩ sed -n '48p' $R/fr-EquationPanel.md | grep -oE ".{0,60}F\.W4 \+ F\.W2 rider.{0,20}"
  … regression surface; 6-literal budget per M-N1 unchanged) — F.W4 + F.W2 rider · D-2+C-11+M-N4 (co
```

**Why this is consequential, not cosmetic.** §6a's own closing sentence declares: *"This table is the per-id operand **G15** runs its set difference against."* An operand that contains one non-member (`D-3+C-5`) and omits one member (`D-10+D-L12+C-22`) yields a **non-empty difference in both directions** — precisely the condition G15 states as *"A non-empty difference after two closure passes HALTS the wave."* This is the same operand-integrity class R2-7.1/R2-7.4 convicted at round 2 (a bare-token roster reporting non-members as members), surviving into round 3 in a new shape: not a homonym collision this time, but a **row-identity mis-attachment on a multi-identity line** — the very error row 19 was written to *record*, left half-cured.

**The cure is symmetric and small**: give `D-10+D-L12+C-22` its own §6a row citing F-W5 clause **F9** (§F), and demote row 19's `D-3+C-5` to a footnote of that row (or keep it as a numbered census correction explicitly **excluded from the 40**). Nothing else moves; `bookedCount` is untouched.

### D-2 · LOW · The §6a header and closure stamp count a self-declared non-band row among "the 40 band identities"

§6a is titled *"the **40** band identities F.W8 does not carry"* and the closure statement stamps *"**40** identities, 40 dispositions, zero bookings … **84 booked + 40 named = 124 = routedTotal**, so §3 ⊎ §6 ⊎ §6a partitions the band's routed identities with no residue."* Row 19's own cell reads **"▲ NOT A BAND ROW"**. A table of band identities cannot contain a row its own bytes prove is not one, and a partition of *the band's routed identities* cannot claim "no residue" while `D-10+D-L12+C-22` sits outside it. The file states the governing law correctly (R2-7.4, *"the stamp follows the operand, never the reverse"*) and then does not apply it to this row. Numerically the total survives by cancellation — one non-member in, one member out — which is exactly the accident §1's own round-2 minute warns against (*"the prior '17 rows' was arithmetically consistent only by accident"*).

### D-3 · LOW · The `F-W4-CARRY` heading-tree paste is elided without ellipsis, under a ⟨cmd⟩ whose output it does not reproduce

§6a row 35 states: ⟨cmd⟩ `grep -n '^#\{1,4\} ' carry/F-W4-CARRY.md` → *"the tree is `## §0` · `## §Rows` · `## §Gates` · `## §Bounds` · `## §CrossEdges`"*. Re-run this sitting, that command also emits the level-1 title and a level-3 heading the rendering drops, and the level-2 headings carry trailing text that is silently truncated:

```
1:# F.W4 — CARRY TABLE (intake for the X·F wave spec)
8:## §0 Derivation-law preamble (the spec MUST open with this)
22:### §0a NEGATIVE ROSTER — components a sweep must NOT grow a leaf on
52:## §Rows
513:## §Gates
533:## §Bounds — files this wave owns
546:## §CrossEdges — declared from this end
```

This is the **same class the masthead convicts itself for** one screen earlier (*"the masthead's own truncated heading list for `F-W5.md`, quoted as bytes without ellipsis or ⟨cmd⟩, now pasted complete"*) — cured at the F-W5 site, uncured at the carry site. The **substantive claim is correct**: `§Rows D` is the right anchor, it does exist, and the `SS-L-07/SS-C-10` bullet is at `:234` byte-identical to the quotation. Only the paste's completeness fails.

### D-4 · LOW · The F-W0 G-11/G-12 "verbatim" quotations substitute bold markup for heading markup

§5c states ⟨cmd⟩ `grep -n "^### G-1[123]" waves/F-W0.md` and then renders the results as *"**G-11** — ONE corrected anchor table published; every later wave quotes it"*. The command's actual output lines begin `### G-11 — …`. Everything after the id is byte-identical (verified under `grep -qF`); the `###` → `**…**` substitution is a markup edit inside a span labelled *verbatim*, against R-1's law that an ellipsis marks elision and nothing is added. Trivial in substance, named because this file's own R2-1-LAW makes quotation form a defect class per se.

---

## §3 — What was verified CLEAN (the file is, on every other axis, sound)

### 3a. Quote reality — every cross-spec and corpus quotation re-run by this seat

**F-W5 (live sibling, mtime 16:43:21 — later than the target's 16:39:38, i.e. rewritten again since the target attested to it).** All quotations nonetheless still hold at the current bytes, verified under `grep -qF`: clause **C2** (`m-15 is CROSS-REFERENCED, NOT MERGED with F-4…`) · **E14** head + witness cell (incl. the parenthetical `(NOT fr-CoefficientsSpectrum M-13 — the A5 homonym; U-12 qualification)`) · **E15** · **D12** head + full witness cell · **D17** witness fragment + `ONLY the serializer arm` · gate **G22** (`dangling-cite resolution` + the whole MF-9 sentence) · the **NINTH collision** block · **B1** (`The join relation`, witness `**fr-CanvasControlsDock C-28**`) · **B5** (`Negative controls`, witness `HLG-23 (C:C-12) · C §3 negatives (MorphShapePreview) · P-9 (cited; home F.W4)`) · **D7**/`FR-AUL-46` · §5's `SS-L-07` row (`carry/F-W4-CARRY.md **§Rows D — the transport cluster — its `SS-L-07/SS-C-10` bullet** (stable anchor, never by line)`, `The **body is F.W4's**…`, `**F.W5's share is the type-reach only**`) · §4's `F.W5 → F.W8` reciprocal act cell · §4's `F.W5 → F.W9/W10` row (`v1 §6 re-authored by v2 and **executed there**, each side's probe asserting against the DOC, never the sibling (inv-26)`). **17 of 17 MATCH.** The masthead's §0 heading paste of `F-W5.md`'s seven `## ` headings reproduces **complete and in order**; `grep -c '§6b\|§6c'` → **0**, as claimed.

**F-W0 (mtime 16:58:39 — rewritten twice since the target).** `G-11`/`G-12` text MATCH (see D-4 for the markup) · the `SUBSTRATE-LEDGER.md` bounds row, path cell and access-cell head MATCH · **carry row 1's full FR-NP-32 disposition sentence** MATCH, including the canonical form `FR-NP-32 (≡ fr-PaperSidebar M1)` demanded by R2-7.5. **The anchor idiom worked exactly as designed**: G-11 has drifted from the round-1 `:199` to `:264` and the ledger row from `:63` to `:77`, and every citation still resolved because the target cites **gate id and bounds-row label**, never line.

**F-W1.** The full TWELVE-limb charter sentence MATCH, byte-for-byte including the `:294` pin clause. `TWELVE` is corroborated independently at F-W1's own `:454` amendment ledger row.

**COHESION.md.** Both SS-4 rows (§1 register row, §2 co-signature row) MATCH in full.

**`carry/F-W4-CARRY.md`.** The `SS-L-07/SS-C-10` ⟨SpeedSelect⟩ bullet MATCH at `:234` — the round-1 address the file struck, whose bytes it attested unchanged, still unchanged.

**Frozen corpus.** All four round-2 escape pastes MATCH byte-for-byte (`fr-ContourSettings:70` and `:67`, `fr-GalleryCard:64`, `fr-CanvasControlsDock:102`), and each row-head confirms the identity. P8's two `fr-GalleryInfiniteGrid` quotes (`:50`, `:51`) MATCH. J3 (`fr-CoefficientsSpectrum:65` `M-13 = C-7`), J6 (`fr-BasisCanvas:102` `C-17 — INFO`), P7 (`fr-GalleryDraftsSection:40` `B-2 = C-C-1 ∘ L-3`, `fr-EquationView:48` `B-2` budget/`le=50`) all MATCH.

**D2's reconciliation is exact.** `grep -nE "F\.W5[-–]W8" $R/fr-FourierShapeExtractor.md | cut -d: -f1` → `16 41 51 52 53 54 55 56 57 59 71 72 81 83 85 86 87 88 90 91 149 157` — **22 lines**, identical to the pasted list, and the 18-rows + 4-record-level-prose split is correct.

### 3b. §6a integrity (apart from D-1/D-2)

`§6a` is **exactly 40 numbered rows**. Machine-checked: **every one of the 40 cited corpus lines carries a band token**, and **every identity is literally present at its cited line** (the two apparent misses — rows 13 and 34 — are row-number identities `row 28`/`row 26` matching `| 28 |`/`| 26 |`; both correct).

Two round-2 cures were re-derived independently and are **right**:

- **Row 34's `B5` → `B1` re-key.** F-W5 clause B5's `C:C-12` is `fr-HarmonicLevelGrid HLG-23` (`:74`, row head `**HLG-23 · C:C-12**`), not `fr-ImageUpload` row 26. B1's witness genuinely carries `row 26 C:C-12 (ImageUpload)`. The cross-check that the strike is not itself a drop also holds: `fr-HarmonicLevelGrid`'s only band token is the routing-taxonomy boilerplate, so it is outside `routedTotal` by measurement and owes no row.
- **J4's `FR-AUL-46` dissolution (R2-11).** `grep -cE "F\.W5[-–]W8" $R/fr-AdminUserList.md` → **1**, the boilerplate line only; `sed -n '89p' … | tail -c 120` → `| **F.W5** — surface the cap in the shared contract; client-side chunk or block |`. The row is **not band-routed**, its one home is F-W5 **D7**, and `doubleHomed = 0` is correct.

### 3c. M-25 depth — locks, riders, dissents

`FR-NP-32` is stated **once**, in R-8 canonical form, satisfying R2-7.5's "everywhere the gate is stated" (`grep -c 'PaperSidebar' waves/F-W8.md` → **1**; the only other `M1` in the file is §M's row label). **`PAW-44` · `LAW-3` · `MPC-31` · `FR-MSP-6` are correctly absent**: re-derived at the corpus, none is band-routed — they live at `fr-PaperArticleWindow`, `fr-MorphPhaseConfig` and `fr-MorphShapePreview` (the last a measured negative), and none of those records routes a positive band row. Their absence is **conformance, not omission**. Locks carried and intact: K-1 · K-3 · K9 · K12 · FR-GV-24 · FSE `C-3` · M-2 · DO-NOT-REGENERATE · M-CK-class · `basisFilter` WAVE-LOCK · MF-9 · BC-20 · `canonical_digest` · `UTF8_BYTEWISE_CODEPOINT` · X-9 · D9 · D-19 · FR-GIG-5 mirror · R-5 · R-3 · ANTI-RENAME. Dissents preserved with revival conditions (D2's reader-1 BLOCKER positions on `L-B1`/`L-B2/C-2`; FR-GFC-1's two BLOCKER filings at P8; R.W6 §11-Q9 recorded, not re-litigated).

### 3d. Gates, witnesses, closure operand

**16 gates, all born-RED** (`| **G1** … | **G16** |` counted). **No GREEN is claimed anywhere** — every `GREEN` occurrence is either the column label, the split-verdict discipline (*"F.W8 never claims a GREEN it did not execute"*), or a named external GREEN owner. G15's detector is **stated inline** with shapes ⊕ both spellings ⊕ slash expansion ⊕ record-qualification, satisfying R2-9; the en-dash arm is measured non-∅. The witnesses are real: `lane-crud.md`, `INTAKE-ADJUDICATION-2026-08-03.md`, `api-gap-remeasure.md`, `FOURIER-AUXILIARY-…-2026-08-03.md`, `lane-fourier-r3-r6.md`, `dispatch-homes.md`, `R.W6.md` all exist at the paths implied.

**The value-side amendments A-1/A-2/A-3 re-measured — every receipt exact:**

```
git log --oneline --all -- api/test/conformance/diff.test.ts → 7351297f … a8ff7792
7351297f  test(R · W6): the 5 wire-envelope shape-fixture rows in diff.test.ts
8a2a617e  merge(R · W6): twin-tie lane — 5 wire-envelope shape rows inline …
a8ff7792  refactor(T.W1 · api · TA-4): excise the write-only atom-diff apparatus (the /remix+/diff fold)
  → D api/src/lib/crud/atomdiff.ts   AND   D api/test/conformance/diff.test.ts   (371 lines, confirmed)
find . -name diff.test.ts (non-node_modules)          → (nothing)          [0 extant — confirmed]
grep -rn "atomdiff|atomDiff|AtomDiff" api/src src     → 1 hit, palettes-forks.test.ts:9  [confirmed]
ls api/src/lib                                        → No such file or directory        [confirmed]
ls api/dist/lib/crud/                                 → 4 artifacts (the corpse)         [confirmed]
api/src/modules/palette/hash.ts:26 computeAtomHash · :44 computeAtomSetHash               [confirmed]
A-3: api/src/modules/palette/model.ts:84 `export interface PaletteVersion`;
     models.ts does not exist; atomDiff absent from the module                            [confirmed]
```

`J-diff-shape.md` is **271 lines** as claimed, `§2.5` heads at `:67`, and `:75` does mandate `lib/crud/atomdiff.ts` as *"the canonical path"* the tree no longer holds — P2's and G1's reading is sound. `R.W6.md:65` is the FN-6 row and `:122` the FN-6 reader bullet; dispatch-homes A.1's *"value.js neither dictates it nor reads from fourier's tree"* is quoted correctly (it appears at `R.W6.md:68`).

### 3e. Posture

`Status: **planned**` · **zero VERIFIED** (the four-verb row reads `VERIFIED | NO`; the only other occurrences are `VERIFIED-GAP` value-side classifications and *"zero UNVERIFIED credit"*) · tree READ-ONLY with the read-only-measurement carve-out stated and its reads dated · F.W1's transaction cited **whole** at **F-W1 §4 (Sequencing) step 4** with the **correct TWELVE-limb count** re-quoted from the charter rather than re-derived · F.W0's pre-gates honored as HARD with the HALT-on-failure clause · SS-4 owner rulings flagged inline with the scope limited to what F.W5's block does not own · the `F.W9/W10` edge declares F.W8 as author/emitter and F.W9/W10 as runner, consistent with R-2b (which governs the W9↔W10 internal splice, untouched here) · the double-home risk is declared rather than hidden · `scripts/dev/dev.sh` correctly named as the never-staged unowned row.

**Self-referential ⟨cmd⟩ claims re-run and reproducing** — the class the file convicted itself on at round 2: `grep -c 'raw-findings' waves/F-W8.md` → **1** (the erratum sentence itself, exactly as minuted) · `grep -c 'PaperSidebar'` → **1** · the live-sibling line-figure sweep returns hits only at lines 3, 24 and 251, every one inside a struck-address minute or a pasted ⟨cmd⟩ output, **never as a citation** — the Re-anchor seat's F-W8 share is confirmed **∅**.

---

## §4 — Ruling compliance (RULINGS-2 row for F-W8: seven items)

| ruling | required | this seat |
|---|---|---|
| **R2-7.1** | §6a gains four residue rows | **APPLIED** — rows 37–40 present, each proved at the frozen corpus, each naming one home |
| **R2-7.2** | P8 record-qualified; B5→B1 | **APPLIED** — homonyms named at P8; B5→B1 re-key independently confirmed correct |
| **R2-11** | FR-AUL-46 out of J4 → cite F-W5 D7 | **APPLIED** — and the underlying measurement (band count 1 = boilerplate) is correct |
| **R2-7.5** | R-8 canonical form everywhere stated | **APPLIED** — one statement, canonical form, verified by count |
| **R2-9** | G15 on qualified operands, detector inline | **APPLIED in form** — detector inline and both-dash; **but see D-1**: the operand it runs against is not yet clean |
| **R2-7.6** | quote conformed · `raw-findings` path · count words | **APPLIED** — the `v1 §6` interpolation struck and the true bytes quoted; the 64-ids figure struck with the time-dependence measured rather than averaged; the 43→37 denominator re-derived |
| **R2-5** | re-quote TWELVE | **APPLIED** — quoted from F-W1's cure, not re-derived |

**R2-7.1's coordinate correction is legitimate.** The ruling proposed *"the E13/A5 family"* as `fr-ContourSettings M-10`'s home; the measured home is **D12**, and the file corrects the coordinate while applying the ruling's LAW unchanged, minuting it at §0 ERRATUM 1. This is exactly R2-1-LAW.3's instruction (*"a rulings file is a cure-shape, never quotable authority over the bank"*) and is **correct at the bytes**: F-W5 `:155` clause **D12** *Closed domains at the boundary* carries `**fr-ContourSettings M-10** (=L-M6/C-19/D-m9)` in its witness cell.

---

## §5 — Assessment

Two full repair rounds have left this file in unusually good condition. Its distinguishing virtue this pass is that **the anchor idiom actually worked under live concurrency**: `F-W0.md` and `F-W5.md` were both rewritten *after* the target's last write — F-W0 twice, moving G-11 from `:199` to `:264` — and **not one citation broke**, because every one resolves by gate id, clause id or row label. The self-referential ⟨cmd⟩ receipts, the class this file convicted itself on at round 2, all re-run and return what they print. The A-1/A-3 git receipts are exact to the line count. The 192/49 spelling census, the 5-and-7 record strata, all four escape pastes, and all seventeen F-W5 quotations are byte-perfect.

The one defect that matters is narrow and mechanical: on a single 15-identity corpus line, the wrong id was carried into the §6a operand and the right one was left in prose. It is the **same error round 2 diagnosed and half-cured** — row 19 exists precisely to record that a band token had been attached to the wrong id, and the record stops one step short of putting the correct id in the table. Because §6a is declared to be the operand G15 differences against, that omission is not bookkeeping: it is the wave's own stated HALT condition, met at authoring. The fix is one row added and one row demoted; `bookedCount` does not move, and on the file's own stamp-follows-operand law the closure statement should be re-derived after it, not defended.

**verdictLocal: DEFECTIVE.**
