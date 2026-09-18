# F-W5-CHECK — FRESH ADVERSARIAL SPEC CHECK (L-18/L-20, PASS 1)

**Subject**: `/Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W5.md` (286 lines, 100,989 bytes, mtime 2026-08-28 12:25)
**Corpus authority**: the 66 `fr-*.md` records in `/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/registry/adjudicated/` (count verified: `ls fr-*.md | wc -l` → **66**) + the two in-tree carries `X/fourier/carry/F-W1-CARRY.md` (W1) and `X/fourier/carry/F-W4-CARRY.md` (W4).
**Seat**: adversarial checker, read-only against the registry and both repos; this file is the seat's ONLY writable path.
**Method**: ID-keyed census (the X·P terminal method) — every `fr-*.md` parsed into rows (bullet rosters `- **ID · …**` and table rosters `| **ID** | … |`), every row whose terminal disposition names `F.W5` / `F.W5-W8` / `F.W5–W8` extracted with its routing fragment, then set-differenced by BYTES against the spec.

**VERDICT: DEFECTIVE.**
**routedTotal = 162 · booked = 159 · escaped = 3 · defects = 9 (2 BLOCKER · 3 MAJOR · 4 MINOR)**

---

## 0. Headline

The agglomeration is, on the merits, **very strong**: 159 of 162 id-keyed routings land, the cure-shape locks are carried verbatim rather than paraphrased, the owner rulings are flagged INLINE as SS-4 requires, the dissent register survives, and every value-side gate witness I re-measured myself is TRUE to the byte. It fails pass 1 on two things that no amount of clause quality repairs:

1. **The CARRY authority it is verified against does not exist.** There is no `F-W5-CARRY.md` anywhere in the tree. The whole §2 provenance — and gate **G19**, the wave's own carry-closure gate — is stated against a phantom operand.
2. **One clause quotes a verbatim disposition from an id that exists nowhere in the corpus** (`P-8`, clause A1). That is the exact invention M-25 forbids, and it is dressed as a quotation.

---

## 1. ID-KEYED CENSUS (booked / escaped / excluded)

Legend: **B** = booked (id appears in F-W5 by bytes) · **E** = ESCAPED · clause = where it lands in F-W5 §2/§4/§5.

### fr-AdminAuditLog (7 routed)
| id | routing in record | F-W5 | clause |
|---|---|---|---|
| AA-5 | `→ F.W5–W8` (cross-tier taxonomy) :42 | **B** | D16 |
| AA-6 | `→ F.W5` (contract co-sign) :43 | **B** | D15 |
| AA-10 | actor-field contract `→ F.W5–W8` :47 | **B** | E18 |
| AA-21 | placeholder co-sign rides AA-6's F.W5 line :58 | **B** | D15 |
| AA-23 | `→ F.W5` (45/30/13 join) :60 | **B** | D15 (CURE LOCK verbatim) |
| AA-31 | `→ F.W5` (45/30/13 join) :71 | **B** | B1 |
| AA-32 | `→ F.W5` (same join row as AA-23) :72 | **B** | D15 |
*Carried-but-not-routed (legitimate SS-4 uptake of NO-WAVE-OWNER rows): AA-45/-46/-47 (`NO-WAVE-OWNER`, :88-90) at A1/A2/A3; AA-48 (:91) and AA-44 (`→ F.W9/W10`, :87) at §5.*

### fr-AdminFlaggedPanel (13 routed) — all **B**
FR-AFP-1 (D3, THE ADMISSION GATE) · FR-AFP-4 (C2) · FR-AFP-7 (D4) · FR-AFP-8 (D5) · FR-AFP-9 (D6) · FR-AFP-10 (D8) · FR-AFP-18 (A2) · FR-AFP-66 (D6) · FR-AFP-32 (D17) · FR-AFP-33 (D7) · FR-AFP-36 (A4) · FR-AFP-70 (D8) · FR-AFP-71 (A4 ⊙).

### fr-AdminUserList (11 routed) — all **B**
FR-AUL-3 (B1) · -11 (B3) · -12 (B3) · -13 (B3, verbatim lock) · -14 (D13) · -20 (D11) · -21 (D12) · -25 (D11) · -31 (D12) · -46 (D7) · -59 (D15).

### fr-AnimationControls (2) — **B**
C-30 (fold-by-reference, "identity stays with R6-8's F.W5–W8 carry" :123) at B1 · R6-8 CARRY→F.W5 (:187) at B1.

### fr-App (0 routed) — **excluded, correctly**
`- **Nothing routes → F.W5–W8**` (:144). F-W5 carries App only as a zero-cell in the §4 F.W2 negative roster. Correct.

### fr-AppHeader (1) — **B** · FR-AH-6 (F.W5-W8 rider, :52) at C3.

### fr-BasisCanvas (6) — all **B** · BC-9/C-6/D-20 (E8) · C-5 (B1) · C-7 (E9) · M-β4 (E10) · C-17 (E15) · C-18 (E15).

### fr-BasisSelector (3) — all **B** · M-9 ⊙ (D12, verbatim) · M-14 (E14) · m-7 (D7, with the K-3 KILL LOCK carried).

### fr-CanvasControlsDock (2) — **B** · D-4 F.W5–W8 rider (E5, verbatim) · R6-8 CARRY→F.W5 with C-28 fold (E5).

### fr-CoefficientsPanel (1) — **B** · FR-CP-16 (A3, the denominator).
### fr-CoefficientsSpectrum (1) — **B** · M-13 (A5, verbatim).
### fr-ContourEditorCanvas (1) — **B** · C-2 (E17).
### fr-ContourPreview (3) — all **B** · row 11 (§4 F.W3/W4, "NOT presuming row 13's seam shape") · row 13 (E20) · row 28 (A3).
### fr-ContourSettings (7) — all **B** · B-1 (D7) · B-4 (E13) · M-10 (D12) · M-13 (E14) · M-15 (F5) · m-18 (E13) · i-7 (E13, FOLDS).
### fr-ConvergenceLegend (1) — **B** · D-L4+C-7 F.W5 carry (:72) at B1, with the MINOR dissent preserved.
### fr-ConvergencePlot (4) — all **B** · L-M7+C-8 (F7) · C-7 mirror rider (B2) · L-m13 (F6) · K-13 (F2/F7 cure bind).
### fr-EasingCurvePreview (2) — **B** · RESOLVER (E11) · the AnimationControls L-11/M-10 fold (E11).
### fr-EasingPicker (2) — **B** · L/M-3 (E11, merged, both ids preserved) · MISSED-E (E12).
### fr-EditorControlsDock (3) — all **B** · D-12 rider (C1) · C-6 / C-7 (C1, "the asymmetry, not an exploit" verbatim).
### fr-EqCoefficientsPanel (1) — **B** · FR-EQC-8 (A5).
### fr-EquationModeToggle (2) — **B** · FR-EMT-1 (F1) · FR-EMT-20 (E10).
### fr-EquationResult (2) — **B** · FR-EQR-4 (F8, THE SEAM CHOICE) · FR-EQR-32 (B1/F8).
### fr-EquationView (7) — all **B** · B-1 (F1) · B-2 (F2) · C·D-02 (F5) · M-CK (B1 SEQUENCING LOCK verbatim) · L·m-6 (E10) · M-SB (F3) · M-DV (F4).
### fr-FourierShapeExtractor (18) — all **B**
L-B1 (G1c TRIPWIRE) · L-B2/C-2 (G2c) · L-M1 (G3c) · C-3 (G3c) · C-4 (G4c) · L-M3/C-6 (G5c) · L-M5/C-5 (G6c) · C-7 (G7c) · L-B3 (G2c) · L-M2 (G8c) · L-m3/C-10 (G10c) · L-m5 (G10c) · M-7 (G9c) · M-8 (G3c) · M-9 (G9c) · M-11 (G8c) · C-14 (G4c) · C-15 (A3).
### fr-FrequencyGraph (2) — **B** · FR-FG-13 (A3) · FR-FG-21 (D7).
### fr-FunctionInput (4) — all **B** · L-B1 (F2, FOLDS) · L-M3 (F6) · C-8 (F2) · N-4 (F3, AMENDMENT RELAY verbatim).
### fr-GalleryAdminBanner (4) — all **B** · GAB-12 (§4 X-1 + D11 seam) · GAB-15 (D11) · GAB-16 (D11) · GAB-17 (D11, SEQUENCED).
### fr-GalleryCard (3) — all **B** · C-1-as-corrected (D2) · D-7 (E4) · L·M-4/D-13/C-8(a) fold (D17).
### fr-GalleryCardModal (5) — all **B** · GCM-1 (E4) · GCM-2 (D2) · GCM-10 (A3) · GCM-52 (C1/C2) · GCM-55 (A3).
### fr-GalleryDraftsSection (4) — 3 **B**, 1 **E**
B-2 (E5) **B** · F-4 (C1/C2) **B** · m-15 (C2, CROSS-REFERENCED NOT MERGED) **B** · **F-6 — ESCAPED** (see §2).
### fr-GalleryFeaturedCarousel (4) — all **B** · FR-GFC-1 (D10, RIDER ONLY) · FR-GFC-3 (D2) · FR-GFC-4 (D10) · FR-GFC-20 (D8).
### fr-GalleryInfiniteGrid (1) — **B** · R-7 (D10 fold routing).
### fr-GalleryMarquee (1) — **B** · GM-M4 (B4, "the fact that KILLS L-15's scenario").
### fr-GallerySearchBar (2 + 1 lock) — all **B** · FR-GSB-1 (D10 fold) · FR-GSB-28 (B1) · the C-2 **WAVE-LOCK** carried verbatim at D10.
### fr-GalleryView (9) — all **B** · FR-GV-1 (E5) · -7 (A6/C3) · -8 (D1) · -9 (D8) · -12 (E6) · -13 (D10) · -24 (E6) · -27 (D1/E6) · -34 (D6, MEMBER-SITE RIDER).
### fr-HarmonicLevelGrid (1) — **B** · HLG-23 (B5, "F.W5 evidence" — correctly NOT a denominator).
### fr-ImageUpload (1) — **B** · row 26 (split B1 security / C2 / E15 transport).
### fr-InfoCard (1) — **B** · FR-IC-6 (A3).
### fr-MorphShapePreview (1) — **B** · C §3 negatives (B5, "so no F.W5-W8 row manufactures overlap" carried verbatim).
### fr-NotationPills (1) — **B** · FR-NP-30b (A5/D12). *Id verified real: the record's routing block reads "**F.W5** (FR-NP-30b via R6-8)" (:130) — NOT an invented sub-id.*
### fr-PaperSearchDropdown (0) — **excluded, correctly** ("**F.W5-W8 = no rows**", :77).
### fr-PathPreview (1) — **B** · PP-DEADSEAM (B4, the LIVENESS predicate).
### fr-SliderControl (1) — **B** · R-16 (D7, "R-16 FOLDS — SliderControl books nothing new").
### fr-SpeedSelect (4) — 2 **B**, 2 **E** · SS-C-1 write leg (E7) **B** · SS-C-2 (E8) **B** · **SS-L-07 / SS-C-10 — ESCAPED** (see §2).
### fr-UserSlugBar (3) — all **B** · FR-USB-15 (C3) · FR-USB-23 ⊙ (C3) · FR-USB-24 (C4).
### fr-VisualizationView (8) — all **B** · BLK-1 (E4, FOLDS) · VV-R2-A (E6) · VV-R2-B (D14, the acceptance surface) · D-14/MIN-4/-5/-10/-11 (E19, noun+positional arm only).

**Records contributing ZERO routed rows (44 of 66)** — correctly absent, and two of them state the negative explicitly (fr-App :144, fr-PaperSearchDropdown :77): AdminAuditPanel-class value.js records are out of corpus; within the fourier 66 the silent zero-contributors are the pure-frontend leaves (CanvasOverlayButton, CollapsibleSection, DarkModeToggle, ExportModal, FourierMorphDemo, FourierMorphSvg, FullscreenViewer, GlassTimeline, MobileFloatingToc, MorphPhaseConfig, PaperArticleWindow, PaperSearch, PaperSearchInput, PaperSearchModal, PaperSidebar, PaperView, SvgFilters, Tooltip, EquationPanel, EquationView-adjacent leaves already counted, …). No spec clause claims a row from any of them, so there is no over-claim from the zero band.

---

## 2. ESCAPES (named by bytes)

| # | id | record + line | disposition text (verbatim) | why it matters |
|---|---|---|---|---|
| **E-1** | **`F-6`** (= `C-C-9` = `L-15`) | `fr-GalleryDraftsSection.md:49` | "**F-6 = C-C-9 = L-15 — INFO; → NO-WAVE-OWNER (SS-3/SS-4 census methodology; F.W5 provenance-contract input)** — the template-`src`-binding operation edge is structurally invisible to a function-keyed operation↔client model (the R5-7 dual)" | `grep -c "F-6" F-W5.md` → **0**; `grep -c "C-C-9\|L-15" F-W5.md` → 0. This row names F.W5 as its consumer AND states a census-blindness class **exactly parallel to COUNTING LOCK K-1**, which the spec DOES carry at D1. The register (unit a, G21, "45 = 30+13+1+1, one row per operation") is function-keyed; a template-`src`-bound edge is invisible to it by construction. Booking K-1 and dropping F-6 leaves the register blind on the other axis. |
| **E-2** | **`SS-L-07`** | `fr-SpeedSelect.md:59` | "**F.W4** (+ its type reaches the F.W5-W8 wire rows)" | `grep -c "SS-L-07" F-W5.md` → **0**. Home is F.W4; the type-reach into the wire rows is F.W5's. Content is arguably subsumed by D12/E11's banked L-11/M-10 identity — but the id is unnamed, so G19's id-keyed set-difference reports it as a drop. |
| **E-3** | **`SS-C-10`** | `fr-SpeedSelect.md:59` (same row) | as above | `grep -c "SS-C-10" F-W5.md` → **0**. Same disposition, same reason. |

*Non-escapes confirmed by re-check*: `C-2` (GallerySearchBar) is carried as the D10 WAVE-LOCK verbatim; `R5-7` (ConvergenceLegend :161) keeps its **F.W4** carry and is correctly absent; `FR-NP-30b` is a real banked id.

---

## 3. DEFECT REGISTER

### D-1 · BLOCKER — the CARRY authority is a PHANTOM; G19 is born-VOID, not born-RED
The spec's provenance rests five times on a "CARRY" document it never paths:
- `:5` "verified row-for-row against the **128-row CARRY authority**"
- `:39` "**1a. Files owned (CARRY `boundsFiles` reconciled …)**" and `:50` "the CARRY's five content paths"
- `:74` "**## 2. Carry — 128 CARRY rows agglomerated**"
- `:208` "**128 CARRY rows.** 125 homed … 3 carried by citation"
- `:238` G19: "the **128 banked row ids** have not been set-differenced …"
- `:279` close step 1: "run the set-difference both directions (**128 CARRY ids** ↔ §2 …)"

**Receipt**: `find /Users/mkbabb/Programming/value.js/docs/tranches/X -iname "*CARRY*"` → exactly three files: `fourier/carry/F-W1-CARRY.md`, `fourier/carry/F-W4-CARRY.md`, `keyframes/carry/KF-W6-CARRY.md`. **No `F-W5-CARRY.md` exists.** Per the standing rule (a spec citing any carry other than F-W1-CARRY for W1 / F-W4-CARRY for W4 cites a phantom), F-W5's authority is unreachable.

Consequence: **G19 cannot be born-RED because its left operand does not exist.** A gate whose set-difference has no LHS is not a red gate, it is an unrunnable one — and G19 is the gate the spec itself calls "the defect class this program exists to kill". §2c's "128/125/3" tally is an unverifiable self-report; the spec even concedes at `:238` that "This spec's authoring-fold receipt (128/128, §2c) is **not the gate**" — correct, but it leaves the gate with nothing to run against.

*Note*: the fold-provenance line at `:5` does correctly path `fourier/carry/F-W4-CARRY.md:18` for one tail row (P-9), and that citation checks out (`F-W4-CARRY.md:18` does read "Zero-cells are EXPORTED from F.W5 (P-9)"). That single real citation makes the absence of the W5 ledger sharper, not softer: the spec knows how to path a carry when one exists.

**Cure shape**: either author `X/fourier/carry/F-W5-CARRY.md` as the enumerated 128-row operand before G19 can be stated, or re-base §2/§2c/G19/§6.1 on the 66-record registry itself (the census this file just ran, routedTotal = 162 id-instances) and delete every "128 CARRY" reference.

### D-2 · BLOCKER — invented id + fabricated verbatim quotation (M-25 no-invention)
`F-W5.md:84`, clause **A1**, lock cell:
> **P-8 disposition verbatim**: *"leaving them NO-WAVE-OWNER guarantees the new contract reproduces the same identity-less envelope that forced the positional key."*

**Receipts**:
- `grep -rnE "(^|[^A-Za-z0-9-])P-8([^0-9]|$)" registry/adjudicated/fr-*.md` → **ZERO hits across all 66 records.**
- `grep -nE "(^|[^A-Za-z0-9-])P-8([^0-9]|$)" X/fourier/carry/*.md` → **ZERO hits in both carry ledgers.**
- `grep -rn "identity-less envelope" docs/tranches/` → **exactly ONE hit: `X/fourier/waves/F-W5.md:84` itself.** The "verbatim" quotation has no source.
- The only real `P-8`s in the constellation are in a **different corpus**: `X/keyframes/waves/KF-W9.md:205/:215` and `X/keyframes/conformance/PASS-1/KF-W5-CHECK.md:45` (kf-EditorStartScreen's group-rewrite viability test), plus pre-adjudication challenge-axis falsifier ids in `audit/fourier-components/{PaperSearch,PathPreview}/challenge-L-library.md` — neither is an adjudicated fourier row, and neither says anything resembling the quoted sentence.

This is the precise failure M-25 names: a clause whose lock is an invented id wearing quotation marks. The *substance* of A1 is sound and is independently supported by the real rows it also cites (AA-45 `NO-WAVE-OWNER` at `fr-AdminAuditLog.md:88`; AA-48 at `:91`) — so the cure is a deletion, not a re-argument: strike the P-8 attribution and let A1 stand on AA-45/AA-48 and the spec's own reasoning.

### D-3 · MAJOR — the file's own execution gate is falsified by its own witnesses
`:7` — "**EXECUTION IS NOT AUTHORIZED BY THIS FILE.** … nothing **opens**, writes, builds, or runs **product source in either repo** until the owner's begin-word."
`:216` — "Value-side witnesses (G2, G4, and G5's value leg) were **re-measured read-only 2026-08-28** and are pasted with their commands", and clauses E1/E3/E4 + gates G2/G4/G5 paste readings of `$V/api/src/modules/palette/hash.ts`, `repository/paletteVersion.ts`, `service/forks.ts:76`, `model.ts:61`, `__tests__/palettes-forks.test.ts:9`.

I re-ran all of them; **every measurement is TRUE**:
- `ls api/src/lib` → `No such file or directory` ✓
- `grep -rn "atomdiff\|atomDiff" api/src src` → exactly ONE hit, `api/src/modules/palette/__tests__/palettes-forks.test.ts:9`, whose text names TA-4 as the excision ✓
- `api/src/modules/palette/service/forks.ts:76` is exactly `        visibility: "public",` ✓
- `api/src/modules/palette/model.ts:61` is exactly the 3-state visibility docline ✓
- `hash.ts:8` `export function computeContentHash(name: string, colors: PaletteColor[])` ✓ · `paletteVersion.ts:13` `findByHash(hash: string, …)` ✓ · `:39` `async insertIfAbsent(` ✓

So the facts are good and the gates are genuinely born-RED — but they were obtained by **opening product source**, which the file's own §0 forbids in *either* repo. Two honest cures: narrow the gate sentence to "writes, builds, or runs" (reads are how a born-RED witness is even possible), or demote the value-side witnesses to MEASURE-AT-OPEN like the fourier side. Leaving both sentences standing means the spec convicts itself on the first read of its own §0.

### D-4 · MAJOR — escaped row `F-6` breaks the operation register's other blindness axis
See §2 E-1. `fr-GalleryDraftsSection.md:49` routes F-6 as "**F.W5 provenance-contract input**" and states the mechanism: "the template-`src`-binding operation edge is structurally invisible to a function-keyed operation↔client model (the R5-7 dual)". F-W5 carries **zero** bytes of it. D1 already carries the symmetric blindness lock (**COUNTING LOCK K-1**: "a `@router.` grep is BLIND to prefixed routers"). Booking one and dropping the other means unit a's 45-row register is armed against server-side under-count and unarmed against client-side under-count — on a wave whose whole product is that register.

### D-5 · MAJOR — the FR-NP-32 corrupt-dist sequencing gate is not carried into the X-1 edge
`F-W5.md:251` (§4, edge **X-1 · F.W0 → F.W5**) grounds the corrupt-stylesheet pre-gate on one witness only: "glass-ui 4.0.0 ships a syntactically corrupt `dist/styles/index.css` (**fr-PaperSidebar M1**)".
**Receipt**: `grep -c "FR-NP-32" F-W5.md` → **0**. But `fr-NotationPills.md:130` routes: "**F.W1** (FR-NP-5, FR-NP-13, FR-NP-12 parity; **SEQUENCING GATED on FR-NP-32**)" and `:15` books FR-NP-32 as blocker-weight — "the adopted 4.0.0 dist stylesheet is a CSS parse error; `vite dev`/`vite build` RED at the pin, reproduced by this seat with the app's own toolchain".
F-W5's own F.W1 edge (`:252`) declares a *sizing* dependency ("G11's ruling PRECEDES F.W1's sizing"). Declaring one upstream sizing gate while omitting the one the corpus explicitly labels **SEQUENCING GATED** is a carry gap on the exact axis this edge exists to hold. fr-PaperSidebar M1 and FR-NP-32 are two independent reproductions of one fact; the spec carries the weaker (a parse census) and drops the stronger (a RED build reproduced with the app's own toolchain).

### D-6 · MINOR — the F.W1 atomicity recital is partial (posture axis 5)
`F-W5.md:252`: "▲ F.W1 is **ATOMIC land-or-lose** — producer bump + 162-site prop rewrite + copied→status triple in ONE change, else four zero-console-error e2e gates go red (fr-EquationResult FR-EQR-3)."
That is 3 limbs. F-W1 itself puts at least three more inside the same transaction:
- `F-W1.md:60` — "**WU-A · RE-PIN (first obligation — nothing below sizes before it)**"
- `F-W1.md:67` — "**WU-B · Substrate land-or-lose** (F.W0 hard predecessor; carried here because F.W1's premises die without it)"
- `F-W1.md:172` — FR-EQC-7: "The regenerated lock DROPPED `vaul-vue` … Cure: **a manifest gate INSIDE the F.W1 transaction**"

**Receipt**: `grep -in "vaul\|RE-PIN\|manifest gate\|CSS-class census" F-W5.md` → **0 hits**. F-W5 does not size F.W1, so this is not a licence to split the transaction — but a reader taking F-W5's emission as the atomicity statement gets three of six limbs, and F-W5 is the wave that gates F.W1's sizing. State the transaction whole or cite F-W1's WU-A/WU-B/FR-EQC-7 by id.

### D-7 · MINOR — axis ids used where banked ids exist (anti-rename)
`F-W5.md:254`: "F.W4-side same-commit riders named so emission does not strip them: **fr-PaperSearchModal D-1+D-3+`outline:none`**".
The record's banked ids are **PSM-1** (`= D-1 · L-1 · C-1`, `:34`), **PSM-4** (`= D-3`, `:37`, "Must land in the same wave as PSM-1 or the cure ships a WCAG regression") and **PSM-13** (`:49`, the `outline:none` 2.4.7 rider, "**MANDATORY rider inside the PSM-1 commit**"); the record's own verdict (`:140`) names the pair as "(PSM-4, PSM-13)". The substance is faithful — but bare `D-1`/`D-3` are pre-adjudication axis ids that collide across dozens of records and do not survive an id-keyed set-difference. G19 will not find them.
*The other three named locks in the same sentence are clean*: **PAW-44/LAW-3** matches `fr-PaperArticleWindow.md:220` ("LAW-3: PAW-44 restoration lands WITH-or-AFTER PAW-1 + PAW-30, never before") and `:254` ("restore only WITH the background cure"); **MPC-31/MPC-3⊕10⊕13⊕8⊕22 one-cut law** matches `fr-MorphPhaseConfig.md:17` ("land as **one cut**"); **FR-MSP-6 two-channel lock** matches `fr-MorphShapePreview.md:16` ("A two-channel lock is minted so no F.W4 ticket can ship the regression under a green-looking edit").

### D-8 · MINOR — escaped instance ids `SS-L-07` / `SS-C-10`
See §2 E-2/E-3. `fr-SpeedSelect.md:59` routes "**F.W4** (+ its type reaches the F.W5-W8 wire rows)". Zero bytes in F-W5. Probably subsumed by D12/E11's banked `L-11/M-10` identity — but unnamed, so G19 reports two drops on a wave whose own §2c asserts "Zero silent drops".

### D-9 · MINOR — `P-9`'s denominator is mixed
§5 and §2c book **P-9** among the "128 CARRY rows", but `P-9` occurs nowhere in the 66 registry records — only in `F-W4-CARRY.md:18` and `:552`. The spec's fold-provenance paths it correctly, so this is traceable, not invented. It is booked here because it shows §2c is counting registry ids and carry-ledger ids under one denominator with **no W5 carry file to reconcile them** — the concrete way D-1 bites.

---

## 4. WHAT PASSES (recorded so the repair does not over-cut)

**Gates (§3, 22 gates, all born-RED with a named witness) — every value-side witness re-run by this seat and TRUE:**
- **G2** (V-β) ✓ `hash.ts:8` folds `{name, colors}` only; `paletteVersion.ts:13` `findByHash(hash)` with no slug scope; `:39` `insertIfAbsent`.
- **G4 ⊙** (TA-4) ✓ `ls $V/api/src/lib` → *No such file or directory*; `grep -rn "atomdiff\|atomDiff" $V/api/src $V/src` → exactly **1** hit, `__tests__/palettes-forks.test.ts:9`, naming TA-4.
- **G5** (born visibility) ✓ `forks.ts:76` is exactly `visibility: "public",`.
- **G19/G21** ✓ `ls $V/docs/tranches/X/fourier/contract/` → *No such file or directory*.
- **G20** ✓ `ls $V/docs/tranches/X/coordination/` → exactly **one** file, `ATLAS-TO-VALUE-2026-08-03-RULINGS.md` (the atlas rulings relay) — the spec's cell is exact.
- **G22** ✓ `grep -rn "MF-9" registry/adjudicated/` → **exactly ONE hit**, `fr-GalleryCardModal.md:56`, the dangling citation itself. The spec's dangling-cite claim is byte-true.
- **D9 reconciliation** ✓ `model.ts:61` is exactly the 3-state visibility docline the spec quotes.
- Fourier-side gates (G1/G3/G6/G7/G8/G9/G10/G11/G12/G13/G14/G15/G16/G17) are each declared **MEASURE-AT-OPEN under D-19** at `:216` and `:251` — honest, not a phantom-witness dodge. `$F` exists at `/Users/mkbabb/Programming/fourier-analysis` and is named READ-ONLY at `:7`, `:54`, `:214`; **no witness anywhere writes a fourier byte**.

**L-19 (proof-scripts presumed contrivance)** — CLEAN. §1a owns five `.md` files plus an append-only INBOX row; there is no script, no `proof:` target, no generated oracle anywhere in the file. G21's cure is a *document*, greppable, not a program.

**E-3 + STATUS** — CLEAN. `grep -n "VERIFIED" F-W5.md` → **one** hit, `:25`, and it reads `| VERIFIED | **NO** |`. `Status: planned` at `:9` and `:285`; §6 headed "all `planned`". §1b marks v1 `J-diff-shape.md` IMMUTABLE and the four evidence files E-1/E-3 immutable-beside-the-spec. No execution verb in current voice.

**SS-4 posture** — CLEAN. §2a flags **R1–R9** INLINE with honest defaults and the cost of the other branch, never presuming a ruling; the four ⊙ gates (G4/G7/G10/G11) are marked unauthorable-unruled at `:18`; §2b preserves nine dissents including the two revival-conditioned BLOCKER demotions (L-B1, L-B2/C-2) with the DO-NOT-REGENERATE tripwire attached.

**M-25 depth (cure-shape locks carried, not cited)** — STRONG. Verbatim and faithful at their landing rows: **M-CK** ("fix the key FIRST or the B-1 repair ships broken") at B1 and again binding F1's alternative cure · **K-3 KILL LOCK** (m-7's straddle-a-422 REFUTED FROM SOURCE) at D7 · **AA-23 CURE LOCK** (case-insensitive `$regex` cannot use `[("action",1),("timestamp",-1)]`) at D15, with the three sound cures in the record's stated order · **S-8 METHOD LAW** ("an absence-proof must ENUMERATE the surface") at D16 · **K12 PROBE-SUPPRESSION LOCK** at E5 with the matching SS-13 line at `:259` · **ONE-CONTROLLER LOCK** at C4 · **GAB-17 SEQUENCED after GAB-16** and the **PRUNE SEQUENCE** at D11 · **ruling-5 sequencing** (producer-or-retire PRECEDES F.W1 sizing) at D3, `:230` and `:252` — three consistent statements · **the D-4 F.W5-W8 rider verbatim** at E5 · **PAW-44/LAW-3, MPC-31 one-cut, FR-MSP-6 two-channel** at `:254` (ids checked against their records).

---

## 5. LOCAL VERDICT

**DEFECTIVE** — on D-1 and D-2, either of which alone is disqualifying at pass 1.

The wave is close. Nine defects, of which seven are surgical (name two escaped ids, add F-6's blindness class to D1, cite FR-NP-32 in X-1, complete the F.W1 recital, swap three axis ids for their PSM equivalents, reconcile the P-9 denominator). The two that are not surgical are the two that matter most: a carry authority that does not exist, and a quotation that was never said.

**Pass-2 entry conditions**: (1) author `F-W5-CARRY.md` or re-base §2/§2c/G19/§6.1 on the registry; (2) strike the P-8 attribution from A1; (3) reconcile `:7` with `:216`; (4) book F-6, SS-L-07, SS-C-10.

*Nothing in this file stamps a wave. Read-only throughout; the fourier tree was not opened.*
