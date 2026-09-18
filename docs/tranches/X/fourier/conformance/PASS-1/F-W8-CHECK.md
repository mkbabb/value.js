# F-W8 — FRESH ADVERSARIAL SPEC CHECK (L-18/L-20 · PASS 1)

**Subject**: `/Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W8.md` (253 lines, 75,469 B)
**Corpus authority**: the 66 `fr-*.md` records in `docs/tranches/V/megatranche/registry/adjudicated/`
**In-tree carries** (the ONLY two): `docs/tranches/X/fourier/carry/F-W1-CARRY.md`, `.../F-W4-CARRY.md`
**Seat**: fresh adversarial checker, 2026-08-28. Every figure below is this seat's own re-run; nothing inherited.
**Verdict**: **DEFECTIVE** — 4 MAJOR · 3 MINOR · 1 INFO. No corpus-level silent drop; the convictions are citation-integrity and census-deferral.

---

## §0 — Method

1. Band extraction: `grep -rnE "F\.W5[-–]W8" fr-*.md` (spelling-agnostic), boilerplate routing-taxonomy lines removed (`Routing law` / `Routing targets` / `census lane taxonomy` / `Routes: **F.W0`), leaving **168 routing lines across 43 records**.
2. Row-identity resolution: each routing line's leading banked id resolved from its bullet/table head; folds, riders and "gets nothing" negatives classified separately.
3. Presence test against F-W8.md with **boundary-aware** matching (`re.escape(id) + r"(?![0-9A-Za-z])"`) — a bare `grep -c` is unsound here (`FR-AFP-1` matches `FR-AFP-10`/`-71`; `FR-AFP-7` matches `FR-AFP-70`/`-71`; `GCM-2` matches `GCM-25`).
4. Every escape re-tested against the sibling band specs `F-W5.md` / `F-W6.md` / `F-W7.md` to separate *"not F.W8's row"* from *"dropped by the band"*.

**The spec's own A-2 census reproduces EXACTLY on this seat's independent re-run:**

```
grep -rho "F\.W5-W8"  fr-*.md | wc -l   → 120     records → 26
grep -rho "F\.W5–W8"  fr-*.md | wc -l   →  72     records → 24
grep -rhoE "F\.W5[-–]W8" fr-*.md | wc -l → 192    records → 49
en-dash-only records                     →  23
grep -rho "F\.W8" fr-*.md | wc -l        →   0    (no row pre-assigns this wave)
grep -rnoE "F[-·.]?W8" fr-*.md           →   0
```

§1's "**ZERO registry rows, measured**" and G15's amended figures are TRUE. The band routes as the atom `F.W5-W8` only.

---

## §1 — ID-KEYED CENSUS (id-for-id)

**routedTotal = 123** distinct banked row identities whose terminal disposition routes to the `F.W5-W8` band, across **43 of 66** records — plus **7 records declaring measured band NEGATIVES** (zero-cells, evidence not work): fr-App (`:144` *"Nothing routes → F.W5–W8"*), fr-CollapsibleSection (`:131`), fr-MobileFloatingToc (`:97` *"F.W5–W8 gets nothing"*), fr-MorphShapePreview (`:110`), fr-PaperSearch (`:90` *"F.W5-W8 empty"*), fr-PaperSearchDropdown (`:77` *"F.W5-W8 = no rows"*), fr-PaperSearchInput (`:125`).

**bookedCount = 86** · **escapedCount = 37**.

Legend: **B** booked in F-W8 (§3 row / named fold-identity / §5b lock / §6 exclusion naming the id) · **E** escaped (absent by byte) · **N** measured negative.

| record | routed ids | F-W8 |
|---|---|---|
| fr-AdminAuditLog | AA-5 (`:42`) · AA-10 (`:47`) · AA-23 (`:142`) | **E E E** |
| fr-AdminFlaggedPanel | FR-AFP-1 (`:44`) · **-4** (`:47`) · -7 (`:55`) · -8 (`:56`) · **-9** (`:57`) · **-10** (`:58`) · -18 (`:65`) · **-66** (`:73`) · -32 (`:86`) · **-33** (`:87`) · **-36** (`:90`) · **-70** (`:104`) · **-71** (`:118`) | E **B** E E **B B** E **B** E **B B B B** |
| fr-AnimationControls | C-30 (`:123`, fold of R6-8) | **B** (J1 fold list) |
| fr-App | — | **N** |
| fr-AppHeader | FR-AH-6 (`:52`) | **E** |
| fr-BasisCanvas | BC-9/C-6/D-20 (`:55`) · C-5 (`:57`) · C-7 (`:58`) · M-β4 (`:93`) · C-17 (`:102`) · C-18 (`:103`) | **B B B B** E E |
| fr-BasisSelector | M-9 (`:58`) · M-14 (`:63`) · m-7 (`:73`) | **B B B** |
| fr-CanvasControlsDock | D-4/L-1/C-3 (`:45`) | **B** (P7) |
| fr-CoefficientsPanel | FR-CP-16 (`:48`) | **B** (J6) |
| fr-CoefficientsSpectrum | M-13 (`:65`) | **B** (J3) |
| fr-CollapsibleSection | — | **N** |
| fr-ContourEditorCanvas | C-2 (`:48`) | **E** |
| fr-ContourPreview | row 28 / D:i-3·L:L-8 (`:61`) | **E** |
| fr-ContourSettings | B-1 (`:40`) · B-4 (`:43`) · M-10 (`:67`) · M-13 (`:70`) · M-15 (`:72`) · m-18 (`:94`) · i-7 (`:104`) | **B B B B** E E **B** |
| fr-EasingCurvePreview | RESOLVER (`:59`) | **B** (J1 fold list) |
| fr-EasingPicker | L/M-3 (`:65`) · MISSED-E (`:88`) | E **B** |
| fr-EditorControlsDock | D-12/C-4/C-5 (`:59`) · C-6/C-7 (`:60`) | E **B** |
| fr-EqCoefficientsPanel | FR-EQC-8 (`:45`) | **E** |
| fr-EquationPanel | D-3+C-5 (`:48`) · D-L5+C-1 (`:48`) | **E E** |
| fr-EquationView | B-1 (`:47`) · B-2 (`:48`) · C·D-02 (`:56`) · M-CK (`:71`) · L·m-6 (`:100`) · M-SB (`:112`) · M-DV (`:113`) | E E E **B B B** E |
| fr-FourierShapeExtractor | L-B1 · L-B2/C-2 · L-M1 · C-3 · C-4 · L-M3/C-6 · L-M5/C-5 · C-7 · L-B3 · L-M2 · L-m3/C-10 · L-m5 · M-7 · M-8 · M-9 · M-11 · C-14 · C-15 (18) | **all B** (D2 block + C-3 lock) |
| fr-FrequencyGraph | FR-FG-13 (`:48`) · FR-FG-21 (`:59`) | **B B** |
| fr-FunctionInput | L-B1/C-1 (`:38`) · L-M3 (`:53`) · C-8 (`:69`) · N-4 (`:73`) | E E **B B** |
| fr-GalleryAdminBanner | GAB-12 (`:51`) | **B** (J7) |
| fr-GalleryCard | C-1-as-corrected (`:50`) · D-7 (`:52`) · L·M-4/D-13 fold (`:64`) | E **B B** |
| fr-GalleryCardModal | GCM-1 (`:42`) · GCM-2 (`:43`) · GCM-10 (`:56`) · GCM-52 (`:108`) · GCM-55 (`:111`) | **B** E **B B B** |
| fr-GalleryDraftsSection | B-2 (`:40`) · F-4 (`:47`) · m-15 (`:80`) | **B B B** |
| fr-GalleryFeaturedCarousel | FR-GFC-1 (`:32`) · FR-GFC-3 (`:34`) · FR-GFC-4 (`:35`) · FR-GFC-20 (`:54`) | **B** E **B** E |
| fr-GalleryInfiniteGrid | R-7 (`:32`) · C-3 (`:50`) · C-4/D-13 (`:51`) | **B B B** (P8 folds) |
| fr-GalleryMarquee | GM-M4 (`:70`) | **E** |
| fr-GallerySearchBar | C-2 WAVE-LOCK (`:24`) · FR-GSB-1 (`:30`) · FR-GSB-28 (`:68`) | **B B B** |
| fr-GalleryView | FR-GV-1 (`:34`) · -7 (`:43`) · **-8** (`:44`) · **-9** (`:45`) · **-12** (`:48`) · **-13** (`:49`) · **-24** (`:63`) · **-27** (`:66`) · -34 (`:73`) | **B** E **B B B B B B** E |
| fr-ImageUpload | row 26 / C:C-12 (`:60`) | **E** |
| fr-InfoCard | FR-IC-6 (`:42`) | **B** (J2) |
| fr-MobileFloatingToc | — | **N** |
| fr-MorphShapePreview | — | **N** |
| fr-PaperSearch / -Dropdown / -Input | — | **N N N** |
| fr-PathPreview | PP-DEADSEAM (`:56`) | **B** (R6) |
| fr-SliderControl | R-16 (`:45`) | **B** (J4) |
| fr-SpeedSelect | SS-C-1 write (`:44`) · SS-C-2 (`:45`) · SS-L-07/SS-C-10 (`:59`) | **B B** E |
| fr-UserSlugBar | FR-USB-15 (`:52`) · FR-USB-23 (`:63`) · FR-USB-24 (`:64`) | E **B B** |
| fr-VisualizationView | BLK-1 (`:45`) · VV-R2-A (`:71`) · VV-R2-B (`:72`) | **B B B** |

### The 37 escapes, named by bytes

`AA-5` · `AA-10` · `AA-23` · `FR-AFP-1` · `FR-AFP-7` · `FR-AFP-8` · `FR-AFP-18` · `FR-AFP-32` · `FR-AH-6` · `C-17` (BasisCanvas) · `C-18` (BasisCanvas) · `C-2` (ContourEditorCanvas) · `row 28` (ContourPreview) · `M-15` (ContourSettings) · `m-18` (ContourSettings) · `L/M-3` (EasingPicker) · `D-12` (EditorControlsDock) · `FR-EQC-8` · `D-3+C-5` (EquationPanel) · `D-L5+C-1` (EquationPanel) · `B-1` (EquationView) · `B-2` (EquationView) · `C·D-02` · `M-DV` · `L-B1/C-1` (FunctionInput) · `L-M3` (FunctionInput) · `C-1-as-corrected` (GalleryCard) · `GCM-2` · `FR-GFC-3` · `FR-GFC-20` · `GM-M4` · `FR-GV-7` · `FR-GV-34` · `C:C-12` (ImageUpload row 26) · `SS-L-07/SS-C-10` · `FR-USB-15`.

### The escapes are NOT corpus-level drops — measured

Every one of the 37 is homed in the keystone `F-W5.md` (several also at `F-W6.md`). Verified anchors:

| escaped id | F-W5 home |
|---|---|
| B-1 (EquationView) | §F clause **F1** (`F-W5.md:163`) |
| B-2 (EquationView) ⊕ L-B1/C-1 (FunctionInput) ⊕ C-8 | §F clause **F2** |
| M-DV | §F clause **F4** |
| C·D-02 ⊕ M-15 (ContourSettings) | §F clause **F5** — *"one server identity, two witnesses"* |
| L-M3 (FunctionInput) | §F clause **F6** |
| D-10/D-L12/C-22 (EquationPanel) | §F clause **F9** |
| C-7 (BasisCanvas) | §E clause **E9** (`:146`) |
| C-17 + C-18 (BasisCanvas transport) · row 26 C:C-12 (ImageUpload) | §E clause **E15** (`:152`) |
| C-2 (ContourEditorCanvas) | §E clause **E17** (`:154`) + gate **G15** (`:234`) |
| FR-AFP-4 · m-15 · GCM-52 · F-4 · ImageUpload row 26 | §C clause **C2** (`:106`) |
| AA-5 · AA-10 · AA-23 · FR-AFP-1 · -7 · -8 · -18 · -32 · FR-AH-6 · FR-EQC-8 · FR-GFC-3 · -20 · GM-M4 · FR-GV-7 · -34 · FR-USB-15 · GCM-2 · C-1-as-corrected · L/M-3 · D-12 · m-18 | present in `F-W5.md` (and/or `F-W6.md`) by boundary-aware match |

**Conclusion on axis 1: the band loses nothing.** F-W8 is one of four band waves and the 37 non-carried ids belong to F.W5/F.W6. The conviction is narrower and is recorded at D-3 below: F-W8's §6, which promises *"Nothing below is a silent drop; each is named so a later reader cannot mistake absence for oversight"*, names **none** of the 37, and the id-keyed closure is deferred wholesale to G15's execution unit **e**.

---

## §2 — DEFECTS

### D-1 · MAJOR · The CARRY authority is a phantom

F-W8 cites *"the CARRY"* as its governing intake at **8 sites** — `:5` (*"verified row-for-row against the CARRY authority (29 rows delivered … 29 of 29 carried, zero silent drops)"*), `:20` (*"all carried from the CARRY verbatim in id — none added"*), `:31`, `:41` (*"The CARRY's G14 cell reads …"*), `:76` (*"Reconciliation against the CARRY `boundsFiles`. All seven adopted verbatim"*), `:97`, `:180` (×2, *"The CARRY's figure reproduces exactly"*, *"between the CARRY row ids and the §3 rows"*) — and **never gives a path**.

```
ls docs/tranches/X/fourier/carry/        → F-W1-CARRY.md  F-W4-CARRY.md      (only two)
grep -noE "carry/[A-Za-z0-9_.-]+" F-W8.md → (no matches)
grep -c "F\.W8"     F-W4-CARRY.md         → 0
grep -c "boundsFiles" F-W1-CARRY.md F-W4-CARRY.md → 0 · 0
```

Per the standing rule (W1 and W4 are the only in-tree carries), an F.W8 CARRY citing a `boundsFiles` field, a "G14 cell" and a "29-row" receipt **cites a document that is not in the tree**. Consequences: the "29 of 29, zero silent drops" receipt is unauditable; "16 gates carried verbatim in id — none added" is unauditable; "all seven boundsFiles adopted verbatim" is unauditable; and **G15's own set-difference operand ("the CARRY row ids") is undefined**, which is fatal to the gate that exists to prove nothing was dropped.

### D-2 · MAJOR · Phantom section anchors on the keystone (`F-W5 §6c` / `§6b`)

F-W8 cites `F-W5.md §6c` at `:5`, `:122` and `:202`, and `F-W5 §6b` at `:144`.

```
grep -n "^#\{2,4\} " F-W5.md
  → 245: ## 4. Cross-edges — declared from THIS end (one home, two citations)
  → 277: ## 6. Close (unit e checklist — all `planned`)     ← there is no §6b, no §6c
grep -n "MF-9"  F-W5.md  → :241  (gate G22)          not §6c
grep -n "m-15"  F-W5.md  → :106  (clause C2)         not §6b
```

The **facts** are true — `grep -c "F\.W8" F-W5.md` → **0**, `grep -c "F\.W7" F-W5.md` → **0**, and F-W5 §4's edge rows enumerate exactly F.W0/F.W1/F.W2/F.W3-W4/F.W6/F.W9-W10/SS-4/SS-6/SS-13/value.js-API-row/FORBIDDEN, matching F-W8's list. But `:5`'s attestation — *"F-W5.md's §6c edge list was **re-read**"* by this fold seat on 2026-08-28 — attests to a re-read of a section that does not exist. A defect declared on a fabricated anchor is a defect declared on nothing, even when the claim happens to hold.

### D-3 · MAJOR · §6 over-claims: 37 band ids absent with no exclusion naming them

§6's header promises *"Nothing below is a silent drop; each is named so a later reader cannot mistake absence for oversight"*, and §1 asserts the homing obligation is *"performed, never inherited"*. Measured: **37 band-routed ids appear nowhere in the file** (§1 above), and §6's 24 exclusion rows name **zero** of them — they are covered, at best, by class-level prose (*"Tier↔flag SEMANTICS; the moderation band's rulings — F.W5/F.W6's"*). Material examples the classes do not reach:

- **`L/M-3`** (fr-EasingPicker `:65`) — routed verbatim as *"Server half (Literal/enum on `AnimationSettings.easing`, `shared.py:69`): **F.W5-W8** — **new booking**, the CRUD/provenance union owns the model."* An explicitly-new band booking, absent. F-W8's R1 asserts *"only easing/speed/active_bases round-trip"* while the easing **domain** row is unbooked.
- **`FR-EQC-8`** (fr-EqCoefficientsPanel `:45`/`:127`) — *"F.W5–W8 owns the tuple seam"*, *"one adapter, both directions; rides the R6-8 contract lesson"*. Squarely the §J fixture-direction mechanism, absent.
- **`GM-M4`** (fr-GalleryMarquee `:70`) — the whole record's only band row; a live dead CRUD surface (`softDelete` :165-176, ETag capture, contract prose documenting a round trip no user can trigger) → *"F.W5-W8 (CRUD/provenance union)"*. Directly R6's liveness predicate and P4's adoption surface. Absent.
- **`FR-GV-7`** (fr-GalleryView `:43`) — an admin bearer token accepted from the URL query → *"F.W5-W8 rider (token-transport contract)"*. Absent from M2/M4, which are precisely the authority/auth-honesty rows.
- **`FR-USB-15`** (fr-UserSlugBar `:52`) — the MAJOR of the cluster whose two MINORs (FR-USB-23/-24) **are** booked at M2; the session-truth cure (401 handling + `getMe` revalidation at the store/api seam) is absent while the row that rides it is carried.
- **`C:C-12`** (fr-ImageUpload row 26) — *"the incomplete **R6-8 join** — FOLD to the intake row, this instance recorded → F.W5-W8"*. The wave's own governing seam, absent.

### D-4 · MAJOR · Homonym id collisions unguarded (anti-rename hazard)

F-W8 books several short ids **without their record qualifier**, and each token is a *different* banked band row elsewhere in the corpus. A closure keyed on bare ids therefore cannot separate booked from escaped — the exact failure G15 exists to catch.

| token in F-W8 | resolves to | the other band row it masks |
|---|---|---|
| `C-17` (`:123`, *"FR-CP-16 (= C-17 / L·A-3)"*) | fr-CoefficientsPanel | **fr-BasisCanvas C-17** (`:102`, overlay double-fetch rider) |
| `B-1` (`:121`, *"fr-ContourSettings **B-1**"*) | fr-ContourSettings | **fr-EquationView B-1** (`:47`, `latex_sigma` joins `SimplifyResponse`) |
| `B-2` (`:111`, `:175`) | fr-GalleryDraftsSection | **fr-EquationView B-2** (`:48`, `budget` walks past `le=50`) |
| `C-2` (only ever as `L-B2/C-2`) | fr-FourierShapeExtractor | **fr-ContourEditorCanvas C-2** (`:48`, POST never derives bounds) |
| `L-B1`, `L-M3` | fr-FourierShapeExtractor | **fr-FunctionInput L-B1/C-1** (`:38`) and **L-M3** (`:53`) |
| `FR-AFP-7` (absent) | — | masked from a naive `grep -c` by `FR-AFP-70`/`-71` |

### D-5 · MINOR · D2's FSE identity block double-books one identity and drops another

§3 D2 enumerates *"L-B1 · L-B2/C-2 · C-4 · C-5 · C-7 · C-14 · C-15 · L-M1 · L-M3 · L-M5 · L-B3 · L-M2 · L-m3 · L-m5 · M-7 · M-8 · M-9 · M-11 (**17 rows**, one identity block)"* — **18 tokens**. `fr-FourierShapeExtractor.md:57` books that row as **`L-M5 / C-5`**: one identity, listed twice, in a block whose stated law is dedupe-by-identity (M-25). Separately, the record's 18th band row **`C-3`** (`:54`, *"F.W5-W8 (one change with L-M1)"*) is **not in the block**; it survives only as the standalone `▲ C-3 lock` at `:152`/`:193`/§6. The count "17" is arithmetically consistent only by the accident that the duplicate cancels the omission.

### D-6 · MINOR · The spec opens product source, contradicting its own absolute

`:11` and `:212` both state: *"Nothing **opens**, writes, builds, or runs product source in either repo until the owner's begin-word."* Yet amendments A-1/A-3 and gate G1 required opening value-side product source, and §3 R3 records a fourier source re-read (*"corpus cites `:184/:279`, the seat re-read gives `:186/:280`"*) that §4's *"this file re-asserts none"* forbids.

**Every measurement reproduces exactly** — this seat's own re-runs:

```
grep -rn "atomdiff|atomDiff|AtomDiff" api/src src
  → api/src/modules/palette/__tests__/palettes-forks.test.ts:9      (1 hit, the T.W1 comment)
ls api/src/lib                → No such file or directory
ls api/dist/lib/crud/         → atomdiff.{d.ts,d.ts.map,js,js.map}  (4 untracked)
git log --all -- api/test/conformance/diff.test.ts
  → 7351297f (landed) … a8ff7792 (last);  merge 8a2a617e confirmed
git show --name-status a8ff7792
  → D api/src/lib/crud/atomdiff.ts     D api/test/conformance/diff.test.ts
git show 7351297f:api/test/conformance/diff.test.ts | wc -l        → 371
grep -n "PaletteVersion" api/src/modules/palette/model.ts          → 84   (A-3 exact)
grep -n "computeAtomHash|computeAtomSetHash" .../hash.ts           → 26 · 44
fourier api/models/visualization.py                                → :186 / :280  min_length=1  (R3 exact)
fourier: git status --porcelain | wc -l → 28    git rev-parse 14d83356 → fatal   (§5c exact)
```

The arithmetic is impeccable; the contradiction is with the spec's own words. Recorded as MINOR because the reads are read-only, declared, dated, and are the file's strongest evidence — **and no fourier byte is written anywhere in the spec.**

### D-7 · MINOR · The F.W1 atomicity restatement is partial

§5c's F.W1 edge names three limbs (*"producer bump + 162-site prop rewrite + copied→status triple **in ONE change**"*) and omits three limbs `F-W1.md` carries inside the same transaction: the **vaul-vue manifest gate** (4 hits in F-W1.md, **0** in F-W8), the **RE-PIN act at the adopted commit hash** (5 hits, **0**), and the **P0 CSS-class census** (3 hits, **0**). F-W8 authorises no separate landing and claims no F.W1 credit, so the transaction is not broken — but a reader of F-W8 alone would size the transaction at three limbs.

### D-8 · INFO · A double-booking surface the spec asserts but cannot discharge

**64** of the ids F-W8 books also occur in `F-W5.md` — including FR-GSB-28, M-CK, C-5(BasisCanvas) and R6-8 inside F-W5's single clause **B1** (`:95`), plus GCM-10/GCM-55, FR-AFP-4/-9/-10/-33/-66/-70/-71, FR-GV-8/-9/-12/-13/-24/-27, BC-9, SS-C-1/SS-C-2, M-β4, L·m-6, PP-DEADSEAM, B-4, i-7, MISSED-E, TA-4. F-W8 governs this with *"one home, two citations"* (F.W5 **states**, F.W8 **asserts**), which is a coherent split — but **`grep -c "F\.W8" F-W5.md` → 0**: the keystone never names its consumer, so the split is asserted unilaterally and G15's *"every band row homed at exactly one of F.W5/W6/W7/W8 — no double-booking"* cannot be discharged from the keystone's end. **F-W8 declares this honestly** at §5c (*"the reciprocal is MISSING … the keystone's consumer is undeclared from the keystone's own end"*), which is why this is INFO and not a conviction.

---

## §3 — AXES THAT HOLD (recorded, so the verdict is not read as a rout)

**Axis 3 — gates born-RED with REAL witnesses.** All 16 gates (G1..G16) present, all born-RED, four ⊙ OWNER-GATED (G1, G3's denominator, G7, G12) matching §1's count. Every witness resolves:

- G1/G14: verified byte-for-byte above (the excision commit, the 371-line fixture, the 4-file dist corpse, the `model.ts:84` anchor).
- G15: the spelling-agnostic census reproduces exactly (120/26 · 72/24 · 192/49 · 23 · 0).
- G3: `30/37` and `32/38 if C31 is lawfully replaced by C31A/C31B; later denominator must be owner-frozen` are verbatim at `FOURIER-AUXILIARY-EIGHT-HOUR-SOURCE-DELTA-2026-08-03.md:131`; `F8-CLIENT-01..09` verbatim at `:65-73`; `web/src/lib/api.ts:420` = `updateVisualization`, `api/routers/visualizations.py:350` = `@router.patch("/{slug}")` — both confirmed in the read-only tree.
- G16: `loadVisualization` (`workspace.ts:197`) and `loadSnapshot` have **zero** call sites outside the store; `setVisibility` (`:373`, exported `:461`) has **zero** callers repo-wide; `GalleryView.vue:396` is the `router.push(\`/w/${slug}\`)`. Data-dead as claimed.
- §5c's F.W0 blockers resolve in `F-W0.md`: F8-REACH-01/-02 with *"HOLD is RED"* (`:105`, `:194-195`), GAB-13 (`:104`), FR-NP-32 ≡ fr-PaperSidebar M1 (`:103`).
- **L-19**: no gate rests on a proof-script. `walk/union-walk.mjs` is *authored here, EXECUTED at F.W9/W10*, discharges no gate, and its execution environment is explicitly F.W9's. M3 declines to mint a gate precisely on L-19 grounds (*"a gate here would name no witness the walk does not already carry"*).
- Both file additions beyond the (phantom) boundsFiles are justified against unfalsifiable-prose, and §2a's 9 rows reconcile to "seven + two".

**Axis 4 — E-3 + STATUS.** `**Status**: **planned**` (`:9`); four-verb table stamps **VERIFIED: NO** (`:29`); the only two `VERIFIED` strings in the file are a carried quote (*"zero UNVERIFIED credit"*, census ADDENDUM §6.7) and the carried `VERIFIED-GAP` disposition of X-1/X-2/X-3/X-6 from `api-gap-remeasure.md` — neither is a stamp on this wave. No execution verb in current voice. `J-diff-shape.md` v1 declared IMMUTABLE, v2 supersedes **by reference** (E-3: addenda, not patches). **The fourier tree is READ-ONLY in every witness** — the spec writes zero fourier bytes, routes the FN-6 ask as a letter, and scopes the read-only law correctly to bytes-not-data at `:93`. Sole caveat = D-6.

**Axis 5 — posture.** F.W1 affirmed atomic ("in ONE change"), no limb permitted to land separately (caveat D-7). F.W0 declared **DEPENDS — HARD** with an explicit HALT (*"If F.W0 fails to re-ground, F.W8 HALTS; it does not proceed on stale bytes"*) and the re-grounding receipt cited-not-copied at §5d. SS-4 owner rulings **flagged INLINE, never presumed**: §1b states the unruled G1 branch and its honest default out loud; G7 says *"Unruled = RED; F.W8 may not author on a guessed branch"*; G12 routes to the owner; G3's denominator freeze is owner-reserved. F.W9/W10's split is kept honestly split (*"F.W8 LANDS … F.W9/W10 RUN … one home, two citations"*, DOUBLE-HOME RISK DECLARED).

**Axis 2 — named locks, where their rows land.** Carried verbatim in §5b/§3: **K-1** (13/44, never zero) · **K-3** (m-7's 422-straddle refuted from source; fixtures may not cite it) · **K9** (do not delete `?? item.slug`) · **K12** (B-2 closes statically) · **FR-GV-24** (no re-open-increment assertion) · **C-3** (no closure heuristic; flag carried, never inferred) · **M-2** (5 of 7 assets) · **DO-NOT-REGENERATE on `master`** with the revival condition · **M-CK-class** (abort key first) · **basisFilter WAVE-LOCK** (only with the banked M-10 normaliser) · **MF-9** (resolve or strike before quoting GCM-10's cure) · **BC-20** (not re-booked) · **`canonical_digest` SKIPPED-SANCTIONED** · **`UTF8_BYTEWISE_CODEPOINT`** · **X-9** (member-scope law before any percentage) · **D9** · **D-19** · **FR-GIG-5 mirror**. **F.W4's NEGATIVE ROSTER** carried at §5c/§6 (App API-inert · MobileFloatingToc · CollapsibleSection · the PaperSearch trio · MorphShapePreview structurally unreachable · **UserSlugBar FR-USB-38 do-not-book**), correctly as denominators-not-work (P-9). **Dissents CARRIED, not merely cited**: FR-GFC-1's two BLOCKER filings (P8), FSE reader-1's L-B1/L-B2-C-2 BLOCKER positions **with their revival condition** (D2), R.W6 §11-Q9 *"recorded, not re-litigated"* (D1). **FN-6/FN-5 sequencing rider** (*"BEFORE or WITH fourier M.W10"*) and the test-isolation-by-TRANSCRIPTION law carried (D1).

The remaining named locks — the **fr-PaperSearchModal same-commit riders**, **PAW-44/LAW-3**, the **MPC-31 one-cut law**, the **FR-MSP-6 two-channel lock** — **do not bind this wave**: `grep -coE "F\.W5[-–]W8"` → **0** in fr-PaperSearchModal, fr-PaperArticleWindow, fr-MorphPhaseConfig; fr-MorphShapePreview's single hit is the measured negative F-W8 already carries. Their absence is correct, not a drop. The **FR-NP-32 corrupt-dist sequencing gate** lands at F.W0 and is cited correctly at §5c.

---

## §4 — VERDICT

**DEFECTIVE (local).** The wave's substance is strong: real witnesses that reproduce on independent re-run, an honest owner-ruling posture, locks and dissents carried rather than cited, a read-only fourier tree, and — measured against all 66 records — **no band row lost anywhere**. It fails this pass on **provenance integrity**: the intake it certifies itself against is not in the tree (D-1), the keystone sections it quotes do not exist (D-2), its "no silent drop" exclusion list names none of the 37 ids it does not carry (D-3), and its id keys collide across records in a way that makes its own closure gate unrunnable as written (D-4).

**Repairs, minimal and in order:**
1. Bank the F.W8 CARRY in `docs/tranches/X/fourier/carry/F-W8-CARRY.md` and cite it by path everywhere `"the CARRY"` appears; re-derive the 29-row and `boundsFiles` receipts against it.
2. Re-anchor `F-W5 §6c` → `F-W5.md §4` and `F-W5 §6b` → `F-W5.md` clause **C2** (`:106`); re-anchor the MF-9 lock to **G22** (`:241`). Restate `:5`'s attestation to the section actually read.
3. Add one §6 row per escaped id (or one table of 37 with its F-W5/F-W6 home), converting a deferred closure into a performed one — and qualify **every** short id with its record (`fr-BasisCanvas C-17`, `fr-EquationView B-2`, …) so G15's set difference can run at all.
4. Fix D2's block: strike the duplicate `C-5`/`L-M5` listing, admit `C-3` into the block or state its separate carriage, and restate the count.
5. Reconcile `:11`/`:212`'s *"Nothing opens … product source"* with the dated read-only measurements the file depends on (a one-clause carve-out for read-only measurement, already implied at `:160`).
