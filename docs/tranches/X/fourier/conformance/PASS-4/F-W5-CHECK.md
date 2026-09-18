# F-W5-CHECK — FRESH ADVERSARIAL SPEC CHECK (L-18/L-20, PASS 4)

**Subject**: `/Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W5.md` (354 lines, 180,702 B, mtime 2026-08-28 19:19:20 — i.e. the post-repair-round-3, post-PURGE-SEAT bytes).
**Corpus**: the 66 `fr-*.md` at `docs/tranches/V/megatranche/registry/adjudicated/` (⟨cmd⟩ `ls fr-*.md | wc -l` → **66**, this seat). Real carries: `X/fourier/carry/F-W1-CARRY.md` + `X/fourier/carry/F-W4-CARRY.md` ONLY (⟨cmd⟩ `ls X/fourier/carry/` → exactly those two).
**Seat**: FRESH. PASS-3's register, `RULINGS-3.md` and `CLOSE-CERT.md` were read for **what was ordered**, never for what was found. Every figure below is this seat's own run. This file is the seat's only writable path; `$F` was never opened.
**Engine disclosure (load-bearing this pass)**: the interactive `grep` on this machine is a shell function routing to `ugrep`. Every receipt below was re-run under **`/usr/bin/grep`** (BSD grep) unless the text says otherwise, because the two engines disagree on one of the spec's own probes (D-10).
**Detector (binding)**: token-bounded `F\.W5(?![0-9])` across all 66 records, BOTH `F.W5-W8` (U+002D) and `F.W5–W8` (U+2013), plus every slash/span form at **either** position (⟨cmd⟩ `grep -rnoE 'F\.W[0-9]+/(F\.)?W5|F\.W[0-9]+[–-]W5' fr-*.md` → **one**, `fr-MobileFloatingToc.md:126` `F.W2/F.W5`), then S-8 walk-back to the enclosing roster row — **table rows ⊕ id-headed bullets ⊕ numbered roster items ⊕ prose routings ⊕ bare-first-cell rows**. Set-difference by BYTES against `F-W5.md`, record-qualified.

**VERDICT: DEFECTIVE.**
**routedTotal = 172 (this seat's floor) · booked = 171 · escaped = 1 · defects = 20 (0 BLOCKER · 8 MAJOR · 12 MINOR).**

Passes 1–3 convicted fabrication, then authority drift, then a spec more disciplined than its own operands. **Every one of pass 3's seven MAJORs is cured at the bytes** — the double-home is gone, the masthead universal is replaced by a per-id membership split, G19's cell puts each id on exactly one side, the `K-n` locks are record-qualified, `nine e2e` is struck from F.W5's own voice, and the §1c halt no longer cites the operand its wave bans. What convicts at pass 4 is narrower and harder: **the census the whole file now rests on was not run.** Its four printed arms are false at two of four by exactly cancelling amounts; the total is reached by adding deltas to the very figure the same paragraph forbids; the two constructions of `170` inside one section disagree on three members; one routed row escapes by id; and the PURGE SEAT's own "unrunnable command" cure rooted two receipts to a variable this file never defines.

---

## 1. ID-KEYED CENSUS — routedTotal 172 (the spec's 170 is understated by ≥2 and does not reproduce)

### 1.1 Detector reproduction (this seat's own run — every figure the spec prints in this class DOES reproduce)

```
grep -rhoE 'F\.W5'        fr-*.md | wc -l  → 245 occurrences
grep -rho  'F\.W5-W8'     fr-*.md | wc -l  → 120   files → 26
grep -rho  'F\.W5–W8'     fr-*.md | wc -l  →  72   files → 24
comm -13 (hyphen-list, en-dash-list)       →  23 en-dash-ONLY
union band                                 → 192 occurrences / 49 records
sole F.W5 (245 − 192)                      →  53
F.W5-bearing LINES                         → 240   across 54 of 66 records
```

The spec's §2 item 3 BAND PROBE and §2c's opening figures reproduce **to the digit** (120/26 · 72/24 · 192/49 · 23 · 245/240/54 · 53). The claim that the same band figures reproduce at `F-W8.md` also holds (`192` present ×5 there). Non-F `W5` tokens in the corpus are `P.W5` ×3 · `A.W5.` ×3 · `C.W5-` ×1 and are correctly outside the roster.

### 1.2 Shape classification — the spec's arms do NOT reproduce (D-1)

| arm | spec §2c states | this seat measures | delta |
|---|---|---|---|
| markdown table rows | **70** | **70** | ✓ |
| id-headed bullets, bulleted | **96** | **96** (bullets whose body opens `**`) | ✓ |
| id-headed bullets, numbered | **4** | **4** | ✓ |
| **bullets with no bold head** | **42** | **2** | **−40** |
| **non-bullet prose** | **28** | **68** | **+40** |
| total | 240 | 240 | ✓ |

⟨cmd⟩ this seat, a single classification pass over the 66 (`|`-leading = table · `- `/`* `-leading = bullet, split on whether the body opens `**` · `^\d+\. ` = numbered · else prose): **70 / 98 (96 bold-headed + 2 not) / 4 / 68**. The two no-bold-head bullets are `fr-AdminUserList:161` and `fr-FrequencyGraph:70` — nameable, and named here, because there are two of them.

**The arms sum to 240 only because the two errors cancel.** A decomposition that balances while two of its four terms are wrong by ±40 is the signature of a total reverse-engineered from a target rather than derived from a run — which is exactly what §1.3 shows.

### 1.3 The two incompatible constructions of `170`, in one section (D-2)

**(i) The arms construction.** `70 table + 96 bulleted + 4 numbered = 170`, with the prose arm contributing nothing. This EXCLUDES `fr-EquationPanel:48` (prose) and `fr-AdminUserList:161` (a no-bold-head bullet, hence inside the "42" bucket).

**(ii) The delta construction.** §2c: *"`167 + 2 + 1 = 170`"* — round 2's 167 ⊕ `fr-EquationPanel:48`'s two routings ⊕ `fr-AdminUserList:161`. This INCLUDES both of the ids (i) excludes.

The file requires both to be members: §2c's delta minute books `:48` at C4/F9 and the D-16 resolution admits `:161` *"one way, stated"*. So the section's own two arithmetics disagree about three members of the roster G19 runs on — the *"two sections asserting opposite things about the same ids"* class, now compressed into one section.

**And (ii) is forbidden by the paragraph that performs it.** The same masthead and §2c rule that *"round 2's 167 is struck … a closure denominator copied from a check file FAILS BY CONSTRUCTION"* and that neither 162 nor 167 *"may be quoted as this wave's operand"*. R3-4.5 directed: *"Re-derived fresh from the 66 → 169 (or 170 …)."* A total obtained as `forbidden-figure + δ` is the forbidden operand with one addition in front of it.

### 1.4 This seat's derivation

Row-shaped `F.W5`-bearing lines: **70 table ⊕ 98 bullets ⊕ 1 numbered ROSTER row** (`fr-PathPreview:56`, `19. **PP-DEADSEAM** (C-12) — **INFO → F.W5-W8**`) = **169**. The other three numbered lines are prose (`fr-AdminFlaggedPanel:25` ruling-5 · `fr-FourierShapeExtractor:149` reader-positions · `fr-MobileFloatingToc:126` ★METHOD) and are not rows — the spec's "4 numbered" arm counts all four as id-headed.

Prose walked back under S-8:
- `fr-EquationPanel:48` — **two** id-headed route-marked routings on one line (`D-10+D-L12+C-22` → F9 · `D-L5+C-1` → C4). **+2.**
- `fr-MobileFloatingToc:97` — the record-level measured negative §2c rules *"lands"*. **+1.**
- `fr-AnimationControls:129` and `fr-CanvasControlsDock:102` — the two named mis-attributions. **Excluded**, correctly, and re-verified: `:127`'s own disposition is *"fold-rider on **fr-BasisCanvas D-9/BC-8**"* and `:100`'s terminal cell is `**NO-WAVE-OWNER**`.
- `fr-AdminFlaggedPanel:17` and `fr-FourierShapeExtractor:16` carry band riders, not id-keyed routings; both riders land (D3 · G16).

**routedTotal = 169 + 2 + 1 = 172**, a **floor**. Excluding `fr-MobileFloatingToc:97` as not-id-keyed gives 171; the spec's 170 requires excluding **both** measured negatives, which is the opposite of what §2c's *"WHAT 170 LAND MEANS"* paragraph rules (D-8).

### 1.5 Set-difference result

Every routed row was tested against `F-W5.md` by bytes, record-qualified where the token collides. **ABSENT: 1. ESCAPED: 1.**

Landings verified across every shape the detector admits (spot receipts): `fr-FourierShapeExtractor` all 18 rows → G1c–G10c/A3 · `fr-AdminFlaggedPanel` all 13 → A2/A4/C2/D3–D8/D17 · `fr-AdminUserList` all 11 ⊕ `:161` → B1/B3/D7/D11–D15 · `fr-GalleryView` all 9 → A6/D1/D6/D8/D10/E5/E6 · `fr-ContourSettings` all 7 → D7/D12/E13/E14/F5 · `fr-EquationView` all 7 → B1/E10/F1–F5 · `fr-SpeedSelect` all 5 incl. the READ leg (*"SS-C-1's READ leg FOLDS to GCM-1/E4 — do not re-book; the WRITE leg books new"*) · `fr-ContourPreview` rows 11/13/28 · `fr-ImageUpload` row 26 · `fr-GallerySearchBar:24`'s `C-2` grade row (D10's WAVE-LOCK) · `fr-MorphShapePreview:110` `C §3 negatives` (B5) · `fr-FrequencyGraph:70`'s bare-head `→ FR-CP-16` (A3) · `fr-App:144` and `fr-MobileFloatingToc:97` (§4's F.W2 zero-cell export) · `fr-PaperSearchDropdown:77` now id-keyed at §4 (pass-3 D-17 **cured**).

---

## 2. ESCAPES — ONE

**`fr-GalleryInfiniteGrid R-7` (`:32`).** A bare-first-cell table row — the shape §2's ROSTER DETECTOR names in terms — whose own cells carry the routing: *"… the param hole is FR-GFC-4 (**F.W5-W8**)."* ⟨cmd⟩ this seat: the string `fr-GalleryInfiniteGrid` occurs **0** times in `F-W5.md`; `GIG` occurs 8; and every `R-7` in the spec is a **different identity** — `lane-crud §R-7` (C3, E18) and `GCM-3 R-7` (E6's repair-test lock). The row's substance lands (`GIG C-4/D-13` at D10, `GIG C-3` at D2), **its identity does not**, and it is not excluded-with-reason anywhere.

Three consequences:
1. It survives an **unqualified** difference (the token `R-7` is present) and fails the **record-qualified** one G19 states — the precise trap §2's anti-rename block exists to close.
2. It is the **`fr-PaperSearchDropdown` class**, which this round cured by ruling that *"an id-keyed set-difference — which is the form G19 states — cannot resolve a component name"*. The same standard convicts here; the cure was applied to one instance of the shape.
3. G19's close text rules *"A row appearing in neither is a **SILENT DROP** — the defect class this program exists to kill."* With this row in the LHS and in neither §2's clause tables nor §5, **G19 cannot green as authored.**

No other landing is record-level-only: `fr-PaperSearchDropdown C:C-23 / C:C-24 / L:§5` is now carried by id at §4 with F.W2 named as the adopting wave (pass-3 D-17 discharged), and `SS-L-07 / SS-C-10` sits at §5 with both ids.

---

## 3. DEFECT REGISTER

### D-1 · MAJOR — the census derivation's printed arms are false at two of four, by exactly cancelling amounts

§2c: *"Shape classification of those 240 lines, this seat's own run: **70 markdown table rows · 100 id-headed bullets (96 bulleted ⊕ 4 numbered) · 42 bullets with no bold head · 28 non-bullet prose**."*

⟨cmd⟩ this seat, one classification pass over the 66: **70 · 96 · 4 · 2 · 68**. There are **two** bullets with no bold head in the entire corpus band (`fr-AdminUserList:161`, `fr-FrequencyGraph:70`), not 42; and **68** non-bullet prose lines, not 28. The two errors are `−40` and `+40`, so the arms still sum to 240 — which is why five prior readings passed them. A balanced decomposition whose middle terms are individually false is not a run; it is a reconstruction. Every downstream figure in this file rests on it (§1's masthead, §1c's halt, §2's heading, §2c, G19, §6 item 1).

### D-2 · MAJOR — the total is built on the operand the same paragraph forbids, and the section holds two constructions of it that disagree on three members

§2c: *"`167 + 2 + 1 = 170`."* The masthead, §2, §2c, G19 and §6 all rule that **167 is superseded and may not be quoted as this wave's operand**, on R3-4's standing law that a denominator copied from a check file FAILS BY CONSTRUCTION. R3-4.5 ordered the total **re-derived fresh from the 66**. `forbidden + δ` is not a fresh derivation; it inherits every membership decision of the struck roster, unexamined.

Independently, the arms of §1.2 give `70 + 96 + 4 = 170` — a construction that **excludes** `fr-EquationPanel:48` (prose) and `fr-AdminUserList:161` (a no-bold-head bullet), the two ids the delta construction **includes** and the file elsewhere requires (C4/F9 bookings; the D-16 resolution). Two arithmetics, one section, same total, incompatible membership. The roster G19 runs on is therefore undetermined at the level of individual rows — which is the only level at which a set-difference means anything.

### D-3 · MAJOR — one routed row ESCAPES by id: `fr-GalleryInfiniteGrid R-7`

See §2. ⟨cmd⟩ `grep -c 'GalleryInfiniteGrid' F-W5.md` → **0**. The row is admitted by the spec's own bare-first-cell shape arm, carries `F.W5-W8` in its own cells, and appears in neither §2's clause tables nor §5 by id, nor in any exclusion receipt. The three `R-7` strings in the spec are two other records' identities. G19's stated set-difference cannot green over a LHS containing it.

### D-4 · MAJOR — the PURGE SEAT's "unrunnable command" cure rooted two receipts to a variable this file never defines

Masthead `:9`: ⟨cmd⟩ `sed -n '81,87p' $R/fr-FourierShapeExtractor.md` and ⟨cmd⟩ `sed -n '87,91p' $R/fr-AdminAuditLog.md`, followed by ⟨**PURGE-SEAT FIX, R3-9.** … *"Rooted to `$R` and re-run: both ranges return exactly the ids listed."*⟩

⟨cmd⟩ this seat: `$V` is defined twice in this file (masthead `:13`, §3 `:278`), `$F` twice — **`$R` is defined ZERO times.** Re-run with `$R` unbound: `sed: /fr-FourierShapeExtractor.md: No such file or directory`. The command is exactly as unrunnable as the bare-operand form it replaced, in the one block *"whose whole point is that its coordinates were re-read at the bytes"*, under R-10.6's law that *"a gate command that cannot execute as written is a phantom witness."* `CLOSE-CERT.md` §3d certifies this site as **fixed**. (The underlying facts hold: from the corpus directory both ranges do return `L-m3 / C-10 · L-m4 / C-12 · L-m5 · M-5 · M-7 · M-8 · M-9` and `AA-44 · AA-45 · AA-46 · AA-47 · AA-48`, verified this seat.)

### D-5 · MAJOR — the ninth-collision receipt is a two-file restricted detector, and the collision is 23 records wide

§2: *"**`M-10` collides too** — ⟨cmd⟩ `grep -c 'M-10' fr-ContourSettings.md fr-BasisSelector.md`."*

⟨cmd⟩ this seat, the portable bounded form this file adopts one paragraph later: `grep -lw 'M-10' fr-*.md` → **23 of the 66 records**. And the file itself carries **four** record-qualified `M-10`s — `fr-ContourSettings M-10` (D12) · `fr-BasisSelector M-10` (D10's WAVE-LOCK) · `fr-CanvasControlsDock M-10` (§2c's second mis-attribution) · `fr-AnimationControls L-11/M-10` (E11's fold) — while the block that rules on the collision names two. *"A gate stating anything narrower is DEFECTIVE at authoring, whatever it returns"* (R3-5) applies to the block's own operand. This is the identical defect the file cures **for `K-13`** in the very next paragraph with a 66-record `grep -lw` — the evenness argument it makes there is not applied here.

### D-6 · MAJOR — the D-20 rendering cure banked a new false figure

§2, cured text: *"→ **`fr-ContourSettings.md` = 2 occurrences · `fr-BasisSelector.md` = 3 occurrences**. ▲ *Rendering note … those are **counts**, and were formerly printed as `fr-ContourSettings.md:2 · fr-BasisSelector.md:3`.* A count is spelled as a count here."*

`grep -c` counts **matching lines**, not occurrences. ⟨cmd⟩ this seat: `grep -o 'M-10' fr-ContourSettings.md | wc -l` → **2**; `grep -o 'M-10' fr-BasisSelector.md | wc -l` → **4** (on 3 lines). The cure for a mis-rendered count re-labelled a line count as an occurrence count and thereby banked a wrong number — in the block whose subject is that a count must be spelled as what it is.

### D-7 · MAJOR — three to four undeclared cwds; §0's own adopted law is broken file-wide

§0's AUDITED cell adopts R-10.5 wave-locally: *"unrooted spellings are forbidden vocabulary."* The file then runs receipts from at least four different bases, none declared:

- bare `fr-*.md` (≈45 receipts) — resolves only from `…/registry/adjudicated/`;
- bare `F-W0.md` · `F-W1.md` · `F-W10.md` (5 receipts) — only from `X/fourier/waves/`;
- bare `F-W4-CARRY.md` (§5's P-9 row) — only from `X/fourier/carry/`;
- `docs/tranches/…` spellings (D9, COHESION, lane-crud, R4-FOURIER) — only from the repo root.

⟨cmd⟩ this seat, from `waves/`: `grep -n -F 'unjoinable in principle' fr-CoefficientsSpectrum.md` → *No such file or directory*. From the corpus dir: `grep -o 'Spec count re-measured at fold: [0-9]*' F-W0.md` → *No such file or directory*. R3-9.5 imposed exactly this cure at F-W9 (*"One line — `$X = docs/tranches/X/fourier/` — declared beside §2.8a's `$R`/`$M`"*); D-11's cure at this end was applied to the two `lane-crud.md` paths **only**. Every other receipt in the file reproduces once the right base is guessed — which is the whole objection.

### D-8 · MAJOR — the corrected census DEFINITION still does not match either construction of the roster

§2c: *"the binding wording is now *'an id-keyed row **whose row carries** an `F.W5` routing token'* … The two classes: **(i) measured NEGATIVES** … **(ii) R6-8 INTAKE FOLD-CARRIES** … Both **land**."*

`fr-MobileFloatingToc:97` is **non-bullet prose** (it opens `**F.W5–W8 gets nothing**` with no list marker), so it falls in the arm the arms-construction contributes nothing from; and `fr-App:144` is not id-keyed under the definition's own words. The spec's 170 is reachable only by **excluding both negatives**, which contradicts the paragraph that admits them, while this seat's floor of 172 admits them. Pass 3's D-15 was the definition disagreeing with the roster; the definition now says the right thing and the arithmetic does not follow it.

### D-9 · MINOR — a `rev | cut | rev` receipt introduced with "reads exactly" pastes under half of what the command returns, twice

§2c and §5 both print ⟨cmd⟩ `sed -n '59p' fr-SpeedSelect.md \| rev \| cut -c1-120 \| rev` → *"the row's terminal cell reads **exactly** …"* followed by a ~55-character span. ⟨cmd⟩ this seat, the full 120-character return: *"L-11+M-10 empty-trigger state unrepresentable at the type level. | **F.W4** (+ its type reaches the F.W5-W8 wire rows) |"*. The narrowing is undisclosed. E16 discloses its two-line wrap explicitly and C4 discloses its deliberate fragment narrowing *because* the broader probe returns two hits — the correct idiom, applied unevenly, which is the same unevenness pass 3 recorded at D-10 and D-14.

### D-10 · MINOR — the engine-dependent receipt does not name its engine

§2 item 2: *"measured this seat, that exact ERE returns **0 for `K-13` as well**."* ⟨cmd⟩ this seat: `/usr/bin/grep -rlE '(^|[^A-Za-z0-9-])K-13([^0-9A-Za-z-]|$)' fr-*.md | wc -l` → **40**; the same command through the machine's `ugrep` shim → **0**. The `0` is true of one binary only. The following clause does say *"a seat whose `grep` is a `ugrep` shim reads a phantom green"*, so the hazard is disclosed — but the receipt itself states an unqualified measurement, and `CLOSE-CERT.md` §1.3(iii) records that the divergence for this idiom *"is noted in place at F-W3 §X.1-v4 item 3"*, not here. (The substantive claim survives whole: `grep -lw` returns **40 / 0 / 1** for `K-13` / `P-9` / `AA-45` under **both** binaries, this seat — the portability argument is correct and its positive control is real.)

### D-11 · MINOR — an unattributed coinage printed in the file's banked-quotation idiom

**B4**: *"v2 needs a predicate for ***"declared on both sides, implemented on NEITHER."***"*. The `***"…"***` form is used 17 other times in this file for corpus bytes carried under a ⟨cmd⟩. This span has no ⟨cmd⟩ and no source; ⟨cmd⟩ this seat: `grep -rc -F 'declared on both sides, implemented on NEITHER.' fr-*.md` → **0** across the 66. It is F.W5's own coinage (and B4's cell says as much — *"Genuinely new to the registry"*), but the rendering is indistinguishable from a banked quotation.

### D-12 · MINOR — a dropped sentence terminator inside the cell whose subject is terminal punctuation

**B3**: *"… `grep -qF` of the span exactly as now printed → hit, this seat Its *"written against a contract document rather than the router"* cell …"*. Two sentences are welded without punctuation, in the cure block for pass-3 D-8 (*"the TERMINAL PERIOD IS REMOVED, because the record does not have one"*). The substance is right and verifies: ⟨cmd⟩ this seat, `grep -c -F` of the span **as now printed** (no terminal period) → **1**; with the period → **0**.

### D-13 · MINOR — G19 asserts the three drain rows "on the RHS side ONLY", which is not this wave's RHS

**G19**: *"**SIX ids are excluded from the LHS … and each asserted on the RHS side ONLY**: the three §5 rows **AA-48 · P-9 · AA-44**, ⊕ the three banked NO-WAVE-OWNER audit-log rows **AA-45 · AA-46 · AA-47**."* G19's RHS is defined two sentences earlier as *"an AUTHORED v2 + register + ruling block"*. `AA-45`/`AA-46`/`AA-47` are asserted on neither side of this gate — their one home is `F-W10.md` §2.5, correctly, per R3-6.1. The exclusion and the citation are right; the sentence that carries them puts three ids on a side they are not on, inside the cell rewritten to make every id sit on exactly one side.

### D-14 · MINOR — the subtraction arm names an exact figure for the small class and leaves the large one unenumerated

§2c: *"excluding the six `Routing law:` boilerplate lines **and the per-record taxonomy tallies**."* ⟨cmd⟩ this seat: exactly **6** lines open `Routing law:` (reproduces) — but the same boilerplate class is spelled `Routes:` ×11, `Dispositions:` ×2, `Routing targets are the census lane taxonomy` ×2, `Routing per the census lane taxonomy` ×1, `Routing:` ×1, plus ~20 closing-verdict lines and ~5 fold/coverage notes. The exclusion is therefore auditable for 6 lines and unauditable for the other ~40 — which is the mechanical reason neither construction of 170 in D-2 can be checked by a reader.

### D-15 · MINOR — token-multiplicity read as routing-multiplicity

§2c: *"admitting the **four lines that carry more than one routing**."* ⟨cmd⟩ this seat, lines carrying more than one `F.W5` **token**: `fr-SpeedSelect:26` (3) · `fr-EquationPanel:48` (2) · `fr-AdminUserList:41` (2) · `fr-AdminAuditLog:60` (2) — exactly four, which is where the count comes from. But only `:48` carries two **routings**; `:26` is one identity (`SS-C-1 booking`) in a reader-split table, `:41` is `FR-AUL-3`, `:60` is `AA-23`. Three of the four "extra routings" are the same row's token appearing twice in its own cells.

### D-16 · MINOR — a record carried under an abbreviation the corpus does not use

⟨cmd⟩ this seat: `fr-GalleryInfiniteGrid` → **0** hits in `F-W5.md`; `GIG` → **8**. `GIG C-3` (D2) and `GIG C-4/D-13` (D10) are the only spellings under which that record's rows land. Record-qualification runs on the (record, id) pair; an ad-hoc abbreviation is resolvable by a reader and not by the difference. This is the mechanism that lets D-3's `R-7` disappear.

### D-17 · MINOR — the declared collider roster is narrower than the one the file actually manages

§2 declares the U-12 eight (`M-13 · L-B1 · L-M3 · C-17 · C-18 · B-1 · B-2 · C-2`) ⊕ `M-10` ninth ⊕ `K-n` as widest. The file's own disambiguation notes manage more: `M-9` (D12 `fr-BasisSelector` vs G9c `fr-FourierShapeExtractor`, disarmed in place) · `C-7` across five records (B1/B2/C1/E9/G7c, all correctly qualified) · `R-7` across three (C3/E6/E18, all qualified — and the fourth, `fr-GalleryInfiniteGrid R-7`, absent: D-3). The management is good; the declared roster under-reports it, so a later seat reading the block alone gets a smaller collision set than the file assumes.

### D-18 · MINOR — the repaired §1c halt inherits the census defect it was repaired to escape

§1c now keys the third-iteration halt on *"a routed `(record, id)` pair of §2c's fresh corpus-derived roster failing to home three times"* — the lawful operand, replacing the banned PASS-1 roster (pass-3 D-7 **cured in form**). But §2c's roster does not reproduce (D-1/D-2) and its membership is undetermined at three ids, so the halt's operand is still not a thing a seat can run. The cure moved the halt from a forbidden operand to an unreproducible one.

### D-19 · MINOR — the collision block's own probe is unbounded, three sentences after the bounded-probe law

§2 item 2 rules the id match *"**token-bounded**, never bare-substring"* and replaces the bracket-class ERE with `grep -w` precisely for portability. The ninth-collision block then measures with ⟨cmd⟩ `grep -c 'M-10' …` — an unbounded substring probe — and the K-13 block one paragraph later correctly uses `grep -lw`. Same file, same round, three spellings of the same test.

### D-20 · MINOR — `doubleHomed = 0` still asserted at D7 with no witness at this end

**D7** carries *"**doubleHomed = 0** at this end"* for `FR-AUL-46`. §2c now discloses that this certification was made *"while breaking that law three times two clauses above"* (AA-45/-46/-47), and R3-6.4 records the id as verified at both ends. The present-tense certification at D7 nonetheless rests on `F-W8.md` §3b's cross-check, which this file names but does not run: no ⟨cmd⟩ accompanies it. Everything else in this file's assertion class now carries its command.

---

## 4. AXES THAT PASSED

**(2) RECEIPT REALITY — 38 receipts re-run by this seat; 36 reproduce exactly, 2 convict (D-4, D-9), 1 is engine-qualified (D-10).** This is the axis pass 3 named as the round's new forgery surface and it is now genuinely strong. Reproduced by command, this seat, under `/usr/bin/grep`: `ls carry/` → the two carries · `ls fr-*.md | wc -l` → 66 · the whole band probe (120/26 · 72/24 · `comm -13` → 23 · union 49) · `grep -lw` P-9/AA-45/K-13 → 0/1/40 · `grep -c 'M-10'` → 2/3 (see D-6 for what the digits mean) · `sed -n '146p' fr-EquationView.md` and `sed -n '129p' fr-ConvergencePlot.md` → the two different records' `K-13` rows, heads exact · `grep -n "D9" DECISIONS.md` → one hit, `:36`, bytes exact · the packet's **two** D9 hits `:55`/`:531`, both printed · `sed -n '61p' model.ts` → the 3-state visibility comment, exact · `sed -n '88p;89p;90p;91p;87p' fr-AdminAuditLog.md` → all five terminal cells exact, incl. AA-46's *"Redundancy records. **NO-WAVE-OWNER**."* · `grep -n "inv-16" lane-crud.md` → **two** hits `:19`/`:350`, both printed (D-14's discipline, applied) · `grep -rn "inv-26" R4-FOURIER.md` → **five** hits `:169 :188 :207 :319 :332`, all printed, `:332`'s span byte-exact · `grep -n -F 'flat BAG' lane-crud.md` → one hit `:240`, and `:240` **does** end at *"the diff is a"* with `:241` reading *"whole-atom replace …; there is no three-way / DAG / merge.""* — the wrap disclosed, pass-3 D-10 **cured** · `grep -n 'atomdiff.py:12-14' lane-crud.md` → **two**, `:240`/`:399`, `:399` verbatim · the merkle/flat-bag sweep over `$V/api/src $V/src` → **exactly one**, `hash.ts:6` *"Identical content always produces the same hash (Merkle property)."* · `ls $V/api/src/lib` → absent · `grep -rn "atomdiff\|atomDiff"` → **one**, `palettes-forks.test.ts:9` · `forks.ts:76` → `visibility: "public",` · `grep -rn "MF-9" …/adjudicated/` → exactly one, `fr-GalleryCardModal.md:56` · `ls contract/` → absent (G19/G21) · `ls coordination/` → one file (G20) · `grep -n -F 'Cross-repo edges are declared FROM BOTH ENDS' COHESION.md` → `:77`, exact · `grep '^### G-1[12]' F-W0.md` → both headings exact · `grep -n 'SUBSTRATE-LEDGER' F-W0.md` → the `create` row at `:85`, elision honest · `grep -o 'Spec count re-measured at fold: [0-9]*' F-W0.md` → **8** · `grep -n "The roster is" F-W1.md` → **one** hit, the TWELVE-limb charter sentence byte-exact including the `:294` pin · `grep -n 'THE GUARDRAIL IS THE INCUMBENT' F-W10.md` → one hit at the `SS-4-PREREQ` row, byte-exact · `grep -n -F 'Zero-cells are EXPORTED from F.W5' F-W4-CARRY.md` → one hit, span byte-exact · `grep -nE 'F\.W5' fr-EquationPanel.md` → one line `:48` · `grep -nE 'F\.W5' fr-AdminUserList.md` → the 14 lines exactly as listed · `grep -o 'F\.W5 ×[0-9]*'` → `F.W5 ×12` · `grep -rn -iF 'join to get wrong' fr-*.md` → **0**.

**Labels: all 18 `***`-fenced spans byte-checked; the 17 attributed ones hit, the 18th is a coinage (D-11).** `grep -c -F` of the full printed span, this seat: `unjoinable in principle` (fr-CoefficientsSpectrum, with the arrow **inside** the bold and the terminal period — pass-3 D-9 **cured**) · `fix the key FIRST or the B-1 repair ships broken.` · `The asymmetry, not an exploit, is the defect (content-addressed store honestly noted).` · `C's scope discipline preserved: soft-delete does de-list from browse` · the fr-EquationPanel `:69` one-controller lock (and its deliberate narrowing: the bare fragment does return `:48` **and** `:69`) · `admit `[]` in the contract, or stop minting it — …` · the E13 superset clause at record case · the ContourPreview `:46` TWO-member ADJUDICATED cell · the M-CK CURE-BOUND span · `The best library-axis find in the corpus (both readers concur; I concur).` · the FR-EQR-4 seam-choice cell · both FSE DO-NOT-REGENERATE spans · the GallerySearchBar WAVE-LOCK · the AFP `:25` ruling (both halves of the elision) · the CanvasControlsDock `:45` two-sided-delta rider. **`FR-AUL-13` now hits without the terminal period and misses with it** — pass-3 D-8 **cured, and cured in the right direction**. `Quote 8 specs, never 9 (K11)` verifies at `F-W9.md` and `F-W10.md`, and both siblings' errata (F-W9 §2.8 E-1, F-W10 §2.8 E-5) do carry the paired 9→8 correction and its `ls web/e2e/*.spec.ts` → **8** re-measurement, exactly as §5 describes.

**(3) M-25 DEPTH — every named lock verified at its banked coordinate.** `FR-NP-32 (≡ fr-PaperSidebar M1)` in canonical cite-both form at X-1, with `fr-NotationPills.md:35`'s BLOCKER disposition verbatim ✓ (R-8/R2-7.5 held). Same-commit riders by BANKED id, all four spans `grep -F`-verified this seat: `PSM-1` `:34` (= D-1 · L-1 · C-1) · `PSM-4` `:37` (*"Must land in the same wave as PSM-1 or the cure ships a WCAG regression"* → 1) · `PSM-13` `:49` (*"MANDATORY rider inside the PSM-1 commit"* → 1) · the record's `:140` verdict naming *"(PSM-4, PSM-13)"* → 1. `PAW-44/LAW-3` ✓ (`fr-PaperArticleWindow.md:220`, *"LAW-3: PAW-44 restoration lands WITH-or-AFTER PAW-1 + PAW-30, never before"* → 1). `MPC-31/MPC-3⊕10⊕13⊕8⊕22` ✓ (all live in `fr-MorphPhaseConfig.md`). `FR-MSP-6` two-channel lock ✓ (`fr-MorphShapePreview.md:98`/`:16`). Anti-cures carried with their kills, and the pass-3 D-6 defect is **cured**: both `K-13`s are now record-qualified at F2 (`fr-EquationView K-13`) and F7 (`fr-ConvergencePlot K-13`) with their heads pasted, and the law *"every `K-n` citation in this file carries its record"* is stated once and the residual shorthand exempted explicitly. Dissents preserved with revival conditions (§2b's nine; the E16/R-4 trie dissent quoted ONCE at the F.W7 edge from `F-W10.md`'s bytes, verified). **Twin law**: `F-W3.md` §X.1-v4 is consumed, not re-derived, at all four seam ids (`BC-20` cited not booked · `fr-CoefficientsSpectrum`'s two disjoint bands · the sole-`F.W5` arm for `fr-ContourEditorCanvas C-2` and the four `fr-BasisCanvas` ids · `fr-VisualizationView L-26` named as F.W3's) — and the receive side checks out: `fr-BasisCanvas BC-20` and the `MM-*`/`BC-*` hand-off sets are held at F-W4, `L-26` is a citation there, so no F.W5 clause contends with the partition.

**(4) GATES — 22, all born-RED, structure sound.** ⟨cmd⟩ `grep -c '^| \*\*G[0-9]' F-W5.md` → **32** = 22 gates (G1–G22) ⊕ 10 §G clause rows (G1c–G10c); §0's *"22 conditions"* and §3's heading agree; exactly **four** ⊙ OWNER-GATED (G4, G7, G10, G11) as declared. Every RHS-existence witness re-run and RED (G19/G21's `ls contract/` → absent · G20's `ls coordination/` → one file · G22's `MF-9` → exactly one, the dangling cite). **G19's operand is now corpus-derived and its detector is stated inline with all four axes** — the check-file pin is struck at all five former sites and appears only inside strike notes (R3-4.5/R2-9 discharged in form). §3's preamble no longer claims *"none reads `$F` at all"* (pass-3 D-13 **cured**). Value-side born-RED witnesses re-measured read-only and all reproduce (G2's hash/versionrepo facts, G4, G5, G7's zero-hit sweep). **What blocks reachable GREEN is not the gate's shape but its operand**: D-1/D-2 (the LHS is not reproducible) and D-3 (one LHS row is in neither of the two RHS-side tables, which G19 itself calls a SILENT DROP).

**(5) POSTURE — clean.** F.W1 cited **whole** at its pinned coordinate with the correct count word, re-quoted by command after F-W1's own R2-5 edit (`grep -n "The roster is"` → one hit, TWELVE; the single surviving `ELEVEN-limb` string is the self-disclosing strike note) ✓. F.W0 pre-gates HARD at X-1 with `FR-NP-32 (≡ M1)` ✓. **W7 zero-row posture** stated from the keystone's end (*"F.W7 CITES; F.W5 STATES … its routing census is a measured ∅"*) ✓. **SS-4 rulings flagged INLINE** — §2a's R1–R9 with honest defaults and costs, re-enumerated at the §4 SS-4 edge ✓. `$F` READ-ONLY declared, no fourier byte written, every fourier figure MEASURE-AT-OPEN under D-19 ✓. `Status: planned` at masthead and §6; `VERIFIED = NO`; **zero VERIFIED stamps** ✓. **R2-2 fully discharged**: ⟨cmd⟩ `grep -oE 'F-W[0-9]+\.md:[0-9]+|CARRY\.md:[0-9]+|COHESION\.md:[0-9]+|lane-crud\.md:[0-9]+' F-W5.md` → **zero hits**, this seat; the X-1 erratum's drifting `sed` receipt is **struck and replaced by the classification it established** (pass-3 D-12 **cured**, and cured in the right direction — the file now refuses to publish a coordinate rather than refreshing one). The R2-7.1 **reciprocal minute** is landed at this end (D12's cell now records the departure a reader of the keystone alone could not previously see; pass-3 D-19 **cured**). Banked alias limbs restored at all three sites pass 3 named — `fr-EditorControlsDock D-12 / C-4 / C-5` · `fr-CanvasControlsDock D-4 / L-1 / C-3` · `fr-GalleryCard D-7 / C·I-2` (pass-3 D-18 **cured**). `nine e2e specs` survives only inside the record's own quoted bytes; both F.W5-voice sites now read **EIGHT** (pass-3 D-5 **cured**). The three NO-WAVE-OWNER drain rows are cited, not booked, with the exclusion receipt AA-48 had and they were denied, and the standing tie-breaker is stated (pass-3 D-1 **cured**). `fr-PaperSearchDropdown`'s three ids are id-keyed with F.W2 named as adopting wave (pass-3 D-17 **cured**).

---

## 5. WHAT PASS 4 CHANGES

Pass 1 convicted **fabrication**. Pass 2 convicted **authority drift**. Pass 3 convicted a **spec more disciplined than its own operands**. All three classes are gone: this seat could not find a quotation naming an authority that does not exist, could not find a line number into a live sibling, and re-ran 38 receipts of which 36 reproduce untouched.

What survives is the last thing left: **the file's central measurement was reconstructed, not run.** The tell is arithmetic, not rhetoric — four printed arms of which two are wrong by exactly `±40`, a total assembled as `forbidden-figure + δ`, and two constructions of that total in one section that cannot both describe the same 170 rows. Everything the file does well now depends on that number: G19's LHS, §1c's halt, §6's checklist, the escape claim itself. And the one row that escapes (`fr-GalleryInfiniteGrid R-7`) escapes for the reason the census cannot see it — it is a bare-first-cell ruling row carried by substance under an abbreviation, in a file that cured exactly that shape once, for a different record, in the same round.

The second surviving class is smaller and sharper: **three of this round's cures re-committed their own defect one level down.** The PURGE SEAT rooted an unrunnable `sed` to an undefined `$R` (D-4). The D-20 rendering cure re-labelled a line count as an occurrence count and got the occurrence count wrong (D-6). The K-13 evenness argument — correct, and correctly executed with a 66-record bounded probe — was not applied to the `M-10` collision it sits beside, which is 23 records wide (D-5). Pass 3's closing observation was that *"a seat that has just authored a rule reads its own compliance as given."* That is still the mechanism, and it is now operating inside the repairs rather than inside the original.

None of the eight MAJORs requires new material. Seven are edits inside `F-W5.md`; D-3 needs one line — `fr-GalleryInfiniteGrid R-7` booked, cited or excluded-with-reason — and the census re-run once, honestly, with its arms printed as measured.

*Read-only everywhere except this file. No spec, carry, record, ruling or sibling was written.*
