# F-W8 — FRESH ADVERSARIAL SPEC CHECK (L-18/L-20 · PASS 2)

**Subject**: `/Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W8.md` (310 lines, 100,943 B)
**Corpus authority**: the 66 `fr-*.md` records in `docs/tranches/V/megatranche/registry/adjudicated/`
**In-tree carries** (the ONLY two): `docs/tranches/X/fourier/carry/F-W1-CARRY.md`, `.../F-W4-CARRY.md`
**Seat**: FRESH adversarial checker, 2026-08-28. Every figure below is this seat's own re-run against the bytes. PASS-1's register and RULINGS.md were read to know what was *ordered*, never to inherit a *measurement*.
**Detector law honored**: every routing probe runs BOTH `F.W5-W8` (U+002D) and `F.W5–W8` (U+2013).

**Verdict**: **DEFECTIVE** — 4 MAJOR · 7 MINOR · 2 INFO. The repair discharged its ruled directives (R-1f, R-3, R-4b, R-5's reciprocal, R-9.1) and its witnesses reproduce byte-for-byte; it fails on the one axis it was repaired to fix — **the id-keyed census still leaks, because the census operand was matched on BARE tokens while the file's own R-5 law demands record-qualified matching.**

---

## §0 — Method

1. Band extraction, spelling-agnostic: `grep -rnE "F\.W5[-–]W8" fr-*.md` → **190 lines / 49 records**. Boilerplate routing-taxonomy lines removed (`Routing law` · `Routing targets` · `census lane taxonomy` · `Routes: **F.W…` · `Routing per…`) → **170 lines / 44 records**.
2. Five of the 49 carry the token ONLY in boilerplate and route nothing: **fr-AdminUserList · fr-CanvasOverlayButton · fr-DarkModeToggle · fr-GlassTimeline · fr-HarmonicLevelGrid**.
3. Seven declare measured band NEGATIVES (evidence, never work — P-9): fr-App `:144` · fr-CollapsibleSection `:131` · fr-MobileFloatingToc `:97` · fr-MorphShapePreview `:110` · fr-PaperSearch `:90` · fr-PaperSearchDropdown `:77` · fr-PaperSearchInput `:125`.
4. Presence test against `F-W8.md` with boundary-aware matching (`re.escape(id) + "(?![0-9A-Za-z])"`) **and then a record-qualification pass** on every token the corpus reuses — the step PASS-1 and the repair both omitted.

**A-2's spelling census reproduces EXACTLY on this seat's independent re-run:**

```
grep -rho "F\.W5-W8"  fr-*.md | wc -l    → 120     records → 26
grep -rho "F\.W5–W8"  fr-*.md | wc -l    →  72     records → 24
grep -rhoE "F\.W5[-–]W8" fr-*.md | wc -l → 192     records → 49
en-dash-ONLY records                     →  23
grep -rho "F\.W8" fr-*.md | wc -l        →   0     (no row pre-assigns this wave)
```

§1's *"ZERO registry rows, measured"* and G15's amended figures are **TRUE**.

---

## §1 — ID-KEYED CENSUS

| figure | this seat | F-W8's claim |
|---|---|---|
| **routedTotal** | **124** | 123 |
| **bookedCount** (§3 rows genuinely disposing a band identity) | **84** | 87 |
| **excluded-with-reason** (§6a, one row per id) | **36** | 36 |
| **escapedCount** (band-routed, NO disposition anywhere in the file) | **4** | 0 |

**Reconciliation.** The spec's operand of 123 carries **three homonym false positives** (identities marked *booked* because a BARE token matched a different record's row) and **omits one** band-routed identity outright. 124 − 84 booked − 36 named = **4 escapes**.

### The 4 escapes, named by bytes

| # | identity (record-qualified) | routed at | registry routing, verbatim tail | status in F-W8 |
|---|---|---|---|---|
| 1 | **fr-ContourSettings M-13** (= LC-missed-2) | `fr-ContourSettings.md:70` | *"**→ F.W5–W8** (contour provenance/CRUD union: an editor-saved contour must be a first-class input to compute, and extraction must not silently overwrite `source="editor"` assets)"* — a **PRIMARY** band booking, MAJOR | **ABSENT.** All 8 `M-13` occurrences in `F-W8.md` are `fr-CoefficientsSpectrum M-13` (J1 fold list `:131`, J3 `:133`, G4 `:182`) or bare-token collision rosters (`:112`, `:193`, `:206`, `:215`, `:290`). Not booked, not folded, not excluded, not in §6a |
| 2 | **fr-ContourSettings M-10** (= L-M6 / C-19 / D-m9) | `fr-ContourSettings.md:67` | *"**→ F.W3/W4** (one typed vocabulary; the shared-enum contract itself is an **F.W5–W8 rider**)"* | **ABSENT.** The only `M-10` in `F-W8.md` is `fr-BasisSelector M-10` (`:125` WAVE-LOCK, `:206` §5b) — a different record, itself routed F.W3/W4 at `fr-BasisSelector.md:59`. Aliases `L-M6` / `C-19`: **0 bytes** |
| 3 | **fr-GalleryCard L·M-4 / D-13 / C-8(a) + L·D-2 / C-12** | `fr-GalleryCard.md:64` | *"…serializer → **F.W5–W8**; JSC → SS-13…"* | **ABSENT.** `L·M-4` → **0 bytes**; `L·D-2` → **0 bytes**. The only `D-13` occurrences (`:125` ×2) are fr-GalleryInfiniteGrid's P8 fold |
| 4 | **fr-CanvasControlsDock C-28** | `fr-CanvasControlsDock.md:102` | *"…C-28 into D-4's **F.W5–W8** rider…"* | **ABSENT — 0 bytes.** Also absent from the PASS-1 operand, so it is an escape the repair could not have caught by re-reading its register |

Escapes 1–3 sit inside the 123 as false **B** marks inherited from `PASS-1/F-W8-CHECK.md` §1; escape 4 is outside it. `M-13` is **named in F-W8's own U-12 collision roster** (`:206` — *"`M-13` are each ≥2 distinct banked rows, so a bare token is not an identity"*) and still receives no disposition: the file diagnoses the trap and then falls into it.

### The 36 excluded-by-ID rows (§6a) — verified

- **All 36 `routed at` anchors carry a band token** at the cited line (this seat's per-line re-read; 36/36).
- **All F-W5 clause ids cited by §6a exist** in `F-W5.md`'s §2 register (A1–A6 · B1–B5 · C1–C5 · D1–D8, D10–D17 · E1–E20 · F1–F9 · G1c–G10c · R1–R9).
- **35 of 36 claimed clause homes hit at the bytes** by boundary-aware match inside the named clause row. The single non-literal (row 34, C2) is substantively correct: `F-W5.md:114` C2 carries *"ImageUpload row 26 security half (cited)"*.
- Row 17 (fr-EditorControlsDock **D-12/C-4/C-5** → F.W3/W4) verified: no F-W5 clause books it; C1 (`:113`) and E5 (`:150`) book only that record's `C-6`/`C-7`.
- Row 19's census correction verified TRUE: `fr-EquationPanel.md:48` routes `D-3+C-5` *"— F.W4 + F.W2 rider"*, while `D-10+D-L12+C-22` and `D-L5+C-1` are that line's real band rows.
- Row 35 verified: `carry/F-W4-CARRY.md:234` = *"**SS-L-07/SS-C-10** ⟨SpeedSelect⟩ MINOR…"*, and `F-W5.md` §5 (`:277`–`:289`) carries the row keyed `SS-L-07 / SS-C-10` with the F.W4-body / F.W5-type-reach split.

---

## §2 — DEFECTS

### D-1 · MAJOR · A band-routed PRIMARY row escapes with no disposition — `fr-ContourSettings M-13`

`fr-ContourSettings.md:70` books **M-13 = LC-missed-2, RATIFIED + SHARPENED — MAJOR** and routes it **→ F.W5–W8**, naming the union by name: *"contour provenance/CRUD union: an editor-saved contour must be a first-class input to compute, and extraction must not silently overwrite `source="editor"` assets."* This is F.W8's own derive-and-history subject matter (it sits beside `B-4`/`i-7`, which F.W8 **does** book at R4).

```
sed -n '70p' fr-ContourSettings.md | tail -c 250
  → … **→ F.W5–W8** (contour provenance/CRUD union: an editor-saved contour must be
    a first-class input to compute, and extraction must not silently overwrite
    `source="editor"` assets).
grep M-13 F-W8.md → :112 :131 :133 :182 :193 :206 :215 :290
  every one = `fr-CoefficientsSpectrum M-13` or a collision roster; ZERO name ContourSettings
```

§6's promise — *"Nothing below is a silent drop"* — and §6a's *"36 identities, 36 dispositions … no residue"* are both falsified by this row.

### D-2 · MAJOR · Second escape of the same class — `fr-ContourSettings M-10`

`:67` routes the shared-enum contract as an explicit **`F.W5–W8` rider**. F-W8's only `M-10` is `fr-BasisSelector M-10` — a *different* banked row, routed **F.W3/W4** at `fr-BasisSelector.md:59`, carried by F.W8 solely as the basisFilter normaliser lock. The ContourSettings identity and both its aliases (`L-M6`, `C-19`) have zero bytes in the spec.

### D-3 · MAJOR · Third escape — `fr-GalleryCard L·M-4 / D-13 / C-8(a) + L·D-2 / C-12` (`:64`)

Routed *"serializer → **F.W5–W8**"*. `L·M-4` and `L·D-2` return **0** in `F-W8.md`; `D-13` resolves only to fr-GalleryInfiniteGrid's P8 fold. Marked **B** in the PASS-1 operand purely by the bare `D-13` token. (A fourth, `fr-CanvasControlsDock C-28` at `:102` — *"C-28 into D-4's F.W5–W8 rider"* — is likewise 0 bytes and was never in the operand at all.)

### D-4 · MAJOR · The partition claim is false as written

§6a's closure statement asserts: *"**87 booked + 36 named = 123 = routedTotal**, so §3 ⊎ §6 ⊎ §6a partitions the band's routed identities with no residue."* Measured, the residue is **non-empty**: ≥4 band-routed identities carry no disposition of any kind. Consequences that bind:

- **G15's own HALT condition is already met at authoring time**: *"A non-empty difference after two closure passes HALTS the wave."* The gate's declared operand (*"the 123 of §1 … cross-read against `conformance/PASS-1/F-W8-CHECK.md` §1"*) is the very artefact carrying the false positives, so unit **e** would run the difference against a corrupted LHS and return ∅ falsely.
- **G15's stated runnability precondition is unmet in the operand**: the gate requires *"every id on both sides is RECORD-QUALIFIED"*, yet the LHS it names (PASS-1 §1) is a bare-token roster.

### D-5 · MINOR · The record denominator does not reconcile

§1: *"routedTotal = 123 distinct banked identities across **43 of 66** records, plus **7 records** declaring measured band NEGATIVES"* — that is **50** records touched by the band token.

```
grep -rloE "F\.W5[-–]W8" fr-*.md | wc -l          → 49      (not 50)
records whose ONLY band line is boilerplate       →  5      (AdminUserList · CanvasOverlayButton
                                                             · DarkModeToggle · GlassTimeline
                                                             · HarmonicLevelGrid)
49 − 5 boilerplate-only − 7 negatives             → 37      positive-routing records (not 43)
```

The figure is inherited verbatim from `PASS-1/F-W8-CHECK.md` §1 despite §1's *"(re-measured 2026-08-28)"* stamp.

### D-6 · MINOR · A homonym mis-attribution inside the cure table itself

§6a row 34 states fr-ImageUpload row 26 / C:C-12 is *"cited again at clause **B1** (§B) and **B5** (§B)."*

```
F-W5.md:100  B1  → "… row 26 C:C-12 (ImageUpload) …"            ✓ correct
F-W5.md:107  B5  → "HLG-23 (C:C-12) · C §3 negatives (MorphShapePreview) · P-9 …"
fr-HarmonicLevelGrid.md:74 → "| **HLG-23 · C:C-12** | `/morph` reaches zero of the 45 …"
```

B5's `C:C-12` belongs to **fr-HarmonicLevelGrid**, not fr-ImageUpload — the exact D-4 collision class this table was authored to cure.

### D-7 · MINOR · R-5's record-qualification law is not applied inside §3

§5b declares the law binding: *"every short id is written with its record wherever it is booked, cited or excluded."* P8 (`:125`) books **"C-4/D-13 FOLD, R-7 sustained"** and **"C-3/C-4/D-13 FOLD by reference"** unqualified. `C-3` is ≥3 distinct banked band rows (fr-GalleryInfiniteGrid `:50` · fr-CanvasControlsDock `:45` inside `D-4/L-1/C-3` · fr-FourierShapeExtractor `:54`) and `C-4` ≥2 (fr-GalleryInfiniteGrid `:51` · fr-FourierShapeExtractor `:55`). This is the mechanism that renders D-1..D-3 invisible.

### D-8 · MINOR · R-8's canonical citation form not applied

RULINGS R-8 LAW: *"Canonical citation form **everywhere the gate is stated**: `FR-NP-32 (≡ fr-PaperSidebar M1)`."* `grep -c "FR-NP-32" F-W8.md` → **0**; §5c states the gate as *"glass-ui 4.0.0's syntactically corrupt `dist/styles/index.css` (**fr-PaperSidebar M1**)"*. The pair form is live one file away at `F-W0.md:105` (*"FR-NP-32 ≡ fr-PaperSidebar M1"*). Graded MINOR because F.W8 is absent from R-8's per-wave directive index — the breach is against the LAW's scope clause, not a named directive.

### D-9 · MINOR · R-9.1's quotation coordinates have drifted and are load-bearing as written

§5c cites **G-11 at `F-W0.md:199`**, **G-12 at `:204`**, and the SUBSTRATE-LEDGER path at **`:63`**. Live:

```
F-W0.md:211  ### G-11 — ONE corrected anchor table published; every later wave quotes it
F-W0.md:216  ### G-12 — ONE corrected-denominator table published; superseded figures FORBIDDEN downstream
F-W0.md:65   | `fourier/docs/tranches/F/SUBSTRATE-LEDGER.md` | **create** — … the G-11 anchor table …
F-W0.md:199  (blank)     F-W0.md:204  "**Owning rows**: 18, 17, 19."     F-W0.md:63  fourier/CLAUDE.md row
```

The **quoted text is verbatim-exact** at the true coordinates, so the substance holds and R-9.1 is discharged. But F-W8's §0 addressing carve-out is scoped explicitly to *"EVERY `F-W5.md` CITATION IN THIS FILE"* — it does not reach F-W0, which is under concurrent repair in the same round. Three line figures are therefore asserted, not addressed.

### D-10 · MINOR · A quotation carries an interpolated word

§5c's F.W9/W10 row quotes `F-W5.md` §4 as *"v1 §6's close-gate … re-authored by v2 and executed there"*. The bytes at `F-W5.md:268` read **"v1 §6 re-authored by v2 and executed there"** — `'s close-gate` appears nowhere in the source row. The routing claim is TRUE; the quotation is not verbatim, which R-1's LAW (*"replaced with the banked text VERBATIM"*) forbids. An ellipsis marks elision, never addition.

### D-11 · MINOR · An out-of-band identity is booked in a §3 banked-ids cell

J4 (`:134`) books **`fr-AdminUserList FR-AUL-46`** among its riders. At the bytes:

```
fr-AdminUserList.md:89 tail → "| **F.W5** — surface the cap in the shared contract;
                                client-side chunk or block |"
grep -cE "F\.W5[-–]W8" fr-AdminUserList.md → 1   (its boilerplate routing-law line, :28, only)
```

The row routes to **F.W5**, not to the band. Booking it sits against F-W8's own *"no §3 row re-books an F.W5 clause"* and against R-5's one-home rule; J4's act cell (*"F.W8 consumes the bound, does not author it"*) mitigates but does not remove it from the banked-ids column.

### D-12 · INFO · A declared census impurity, carried forward honestly

§6a row 19 keeps `fr-EquationPanel D-3+C-5` inside the 36 while proving (correctly) that `:48` routes it *"— F.W4 + F.W2 rider"*, and names the real band row `D-10+D-L12+C-22` only inside the cell rather than as a table row. Count-neutral, self-declared, reproducible — recorded, not convicted.

### D-13 · INFO · The "64 shared ids" figure is unreproducible as stated

§5c asserts *"**64** of the ids booked in §3 also occur in `F-W5.md`"*. This seat's extraction of §3's banked-ids column yields 91 tokens, **90** of which occur in `F-W5.md` by bare match (only `S-7` absent); a record-qualified count would yield fewer. 64 is carried from PASS-1 D-8 with no stated method. Not a conviction — an unfalsifiable figure.

---

## §3 — AXES THAT HOLD (recorded, so the verdict is not read as a rout)

**Axis 2 — AUTHORITY REALITY. Every load-bearing quotation this seat could resolve resolves, most byte-for-byte.**

- **G3's C31 witness is real and verbatim** at `docs/tranches/V/megatranche/audit/codex-provenance/intakes/lane-fourier-r3-r6.md:142` — the decoded stdout `{"code":"control.wrong-reason","errors":["client.method.visualization-update","operation.method.visualization-update"],"controlId":"R4.C31","verdict":"REJECT"}`, **exit 43**, the `clients`/`clientDisposition` back-reference root cause, and both endpoints *"`web/src/lib/api.ts:420` … `api/routers/visualizations.py:350`"* — all present in one row.
- **`FOURIER-AUXILIARY-EIGHT-HOUR-SOURCE-DELTA-2026-08-03.md:131`** carries `30/37` and *"32/38 if C31 is lawfully replaced by C31A/C31B; later denominator must be owner-frozen"* **verbatim**; `:65-73` carries `F8-CLIENT-01..09` with exactly the nine operations F-W8 enumerates.
- **The four live fourier anchors resolve exactly** (read-only): `web/src/lib/api.ts:420` = `export async function updateVisualization(` · `api/routers/visualizations.py:350` = `@router.patch("/{slug}")` · `:827` = `on_chain = {head_hash} | ({fork_of_hash} if fork_of_hash else set())` · `:612` = `return await idempotency.replay_or_record(request, _store(), f"user:{owner_slug}", _handler)`.
- **G16 is data-dead as claimed**: `loadVisualization` defined `workspace.ts:197`, referenced only at `:238` (internal alias) and `:447/:448` (exports) — **zero external call sites**; `setVisibility` `:373`, exported `:461`, **zero callers repo-wide**; `GalleryView.vue:396` = `router.push(\`/w/${slug}\`)`.
- **F-W5 anchors**: **G22** at `F-W5.md:251` (dangling-cite resolution, MF-9) ✓ · clause **C2** at `:114` with the *"m-15 is CROSS-REFERENCED, NOT MERGED with F-4"* lock verbatim ✓ · §4 at `:255` ✓. The R-1f cure landed: **`F-W5.md` has no §6b and no §6c**, and F-W8 no longer claims either.
- **MF-9 reproduces**: `grep -rn "MF-9" registry/adjudicated/` → **exactly one hit**, the dangling citation inside `fr-GalleryCardModal.md:56`.
- **F-W1 atomicity**: `F-W1.md:276` charters **ELEVEN limbs in ONE change** including the FR-EQC-7 vaul-vue manifest gate; `:294` pins it INSIDE. F-W8 applies R-4b's cure text **verbatim** at `:213` and restates nothing (D-7 of PASS-1 cured).
- **J-diff-shape.md**: 271 lines ✓, lives only at `/Users/mkbabb/Programming/fourier-analysis/docs/tranches/J/design/J-diff-shape.md` ✓, and `§2.5` at line **75** does mandate `lib/crud/atomdiff.ts` ✓.
- **F-W0 §5c blockers all resolve**: F8-REACH-01 (`:74`, `:108`, `:206-207`) · F8-REACH-02 (`:107`, *"HOLD is RED"*) · GAB-13 (`:106`, 28 dirty rows) · fr-PaperSidebar M1 (`:105`).

**Axis 2b — the value-side amendments reproduce BYTE-FOR-BYTE on this seat's own re-run.**

```
grep -rn "atomdiff|atomDiff|AtomDiff" api/src src
  → api/src/modules/palette/__tests__/palettes-forks.test.ts:9        (1 hit, the T.W1 comment)
ls api/src/lib                          → No such file or directory
ls api/dist/lib/crud/                   → atomdiff.{js,d.ts,js.map,d.ts.map}   (4, untracked)
git log --oneline --all -- api/test/conformance/diff.test.ts
  → a8ff7792 · 7351297f · 17b61488 · 59aab42c
git show --name-status a8ff7792         → D api/src/lib/crud/atomdiff.ts
                                          D api/test/conformance/diff.test.ts
git show 7351297f:api/test/conformance/diff.test.ts | wc -l          → 371
git log --oneline -1 8a2a617e           → merge(R · W6): twin-tie lane — 5 wire-envelope shape rows
grep -n "PaletteVersion" api/src/modules/palette/model.ts            → 84       (A-3 exact)
grep -n "computeAtomHash|computeAtomSetHash" api/src/modules/palette/hash.ts → 26 · 44
```

**A-1's reading — "0 extant · 1 landed-then-excised · 0 reciprocated" — is exactly right**, and its third-limb correction to TA-4's restoration scope is proven, not asserted.

**Axis 3 — GATES born-RED with real witnesses.** 16 gates (G1..G16), all born-RED, **4 OWNER-GATED** (G1 ⊙, G3 ⊙, G7 ⊙, G12 ⊙) matching §1's count. No gate rests on a proof-script: `walk/union-walk.mjs` is *authored here, EXECUTED at F.W9/W10*, discharges nothing, and M3 explicitly declines to mint a gate on L-19 grounds. §5d's tripwire commands are runnable (`typecheck` · `lint` · `test` all exist in `package.json`). §2a's nine bounds rows are each `create` or the append-only INBOX (`docs/tranches/V/coordination/INBOX.md` — exists, 56,702 B), and the two additions beyond census §4.9's seven are justified in the open against unfalsifiable prose.

**Axis 3b — R-5's reciprocal HAS LANDED and F-W8 reciprocates correctly.** `F-W5.md:267` carries the ordered row verbatim — *"F.W5 STATES the clauses; F.W8 ASSERTS them (fixture/e2e direction). ONE home (F.W5), two citations … Reciprocal: `F-W8.md` §5c"* — plus the U-12 set-difference precondition. F-W8 §5c quotes it accurately and dates BOTH readings without overwriting the first (E-3 addenda-not-patch, correctly executed).

**Axis 3c — R-3 fully discharged.** *"the CARRY"* survives only twice, both times as its own retirement (`:7`, `:193`). **No `F-W8-CARRY.md` was minted** (`ls carry/` → the two real carries only). Every carry citation is by path: `carry/F-W1-CARRY.md`, `carry/F-W4-CARRY.md` (`:206`), `carry/F-W4-CARRY.md:234` (`:307`).

**Axis 3d — D2's FSE block is fixed as ruled.** 18 rows, `L-M5 / C-5` treated as ONE identity, `C-3` admitted into the block *and* retained as a standing lock. The record's own band-routed line count reconciles exactly: `fr-FourierShapeExtractor.md` `:51 :52 :53 :54 :55 :56 :57 :59 :71 :72 :81 :83 :85 :86 :87 :88 :90 :91` = **18**.

**Axis 3e — the read-only-measurement carve-out cures PASS-1 D-6 cleanly.** §0's ▲ block separates *inspection* (permitted, dated, attributed, authorization-free) from *mutation* (begin-word). §3 R3's `:184/:279` → `:186/:280` divergence is recorded as a D-19 re-resolve obligation and adopted as **neither** anchor — exactly the shape the discipline requires.

**Axis 4 — NO INVENTION / M-25 depth, and the locks that correctly DO NOT bind.**

- Carried where their rows land: **K-1** (13/44, never zero) · **K-3** (m-7's 422-straddle refuted from source) · **K9** (`?? item.slug` not deleted) · **K12** · **FR-GV-24** (no re-open-increment assertion) · **fr-FourierShapeExtractor C-3** (no closure heuristic) · **M-2** (5 of 7 assets) · **DO-NOT-REGENERATE on `master`** with its BLOCKER revival condition · **M-CK-class** · **basisFilter WAVE-LOCK** — verified verbatim at `fr-GallerySearchBar.md:24`, whose fold target genuinely IS *"fr-BasisSelector M-10"* · **MF-9** · **BC-20** · **`canonical_digest` SKIPPED-SANCTIONED** · **`UTF8_BYTEWISE_CODEPOINT`** · **X-9** · **D9** · **D-19** · **FR-GIG-5 mirror**.
- **Correctly absent, verified by measurement**: the **fr-PaperSearchModal same-commit riders**, **PAW-44/LAW-3**, **MPC-31**, **FR-MSP-6** — every home record carries **zero** band routings (`grep -coE "F\.W5[-–]W8"` → 0 for fr-PaperSearchModal · fr-PaperArticleWindow · fr-MorphPhaseConfig · fr-NotationPills · fr-PaperSidebar). **F.W3's four named anti-cures** (`F-W3.md:240`, §C.J) are *"cross-cited into **F.W4's** edit budget"* per F-W3's own §S-3 — not F.W8's. Their absence is correct, not a drop.
- **F.W4's NEGATIVE ROSTER carried** at §5c's F.W2 row as denominators-not-work (P-9): App API-inert · MobileFloatingToc · CollapsibleSection · the PaperSearch trio · MorphShapePreview structurally unreachable · **UserSlugBar FR-USB-38 DO-NOT-BOOK**, re-stated at §6a row 36.
- **Dissents carried with their revival conditions**: FR-GFC-1's two BLOCKER filings (P8) · FSE reader-1's L-B1 / L-B2·C-2 BLOCKER positions with the regeneration tripwire (D2) · R.W6 §11-Q9 *"recorded, not re-litigated"* (D1).

**Axis 5 — ATOMICITY + POSTURE.** `**Status**: **planned**` (`:15`) · four-verb table stamps **VERIFIED: NO** (`:37`); the only other `VERIFIED` strings are carried (`VERIFIED-GAP` for X-1/X-2/X-3/X-6; *"zero UNVERIFIED credit"*) — **zero stamps on this wave**. F.W1 cited whole, never restated (R-4b verbatim). F.W0 declared **DEPENDS — HARD** with an explicit HALT and the G-11/G-12 quotation clause (R-9.1). SS-4 owner flags **inline**: §1b states G1's unruled branch and its honest default out loud; G7 — *"Unruled = RED; F.W8 may not author on a guessed branch"*; G12 routes to the owner; G3's denominator freeze owner-reserved; §5c's SS-4 row surfaces **only** the two rulings F.W5's block does not own. **The fourier tree is READ-ONLY in every verb** — zero fourier bytes written, the FN-6 ask travels as a letter, the reader strategy stays fourier-owned, and the walk's data mutation is scoped to F.W9's environment and declared/subtracted at G9. The F.W1↔F.W5 producer-or-retire **cycle is DECLARED for spine adjudication** rather than silently resolved.

---

## §4 — VERDICT

**DEFECTIVE (local).** Measured against PASS-1, this is a substantial repair: the phantom carry is gone (R-3), the fabricated `§6b`/`§6c` anchors are re-keyed to real clause ids (R-1f), the reciprocal landed at both ends (R-5), the eleven-limb citation is verbatim (R-4b), the G-11/G-12 quotation clause is present (R-9.1), the FSE block reconciles to 18, the read-only contradiction is cured by a carve-out that is honest rather than convenient, and **every witness this seat could resolve resolved — most byte-for-byte, including the C31 stdout, the exit code, the four live fourier anchors, and all seven value-side git facts.**

It fails on the single axis the repair existed to close. The §6a table converts a deferred closure into a performed one for **36** identities — but the operand it performs against is `PASS-1/F-W8-CHECK.md` §1, a **bare-token** roster, while the file's own R-5 law declares that *"a bare token is not an identity."* Three of that roster's **B** marks are homonym false positives, a fourth band identity was never in the roster at all, and so the closure statement — *"87 booked + 36 named = 123 = routedTotal … no residue"* — is false, and **G15's stated HALT condition is met before unit `e` ever runs**.

**Repairs, minimal and in order:**

1. **Re-derive the operand record-qualified, not bare.** Re-run the census as `(record, id)` pairs — never a bare token — and re-state routedTotal / bookedCount from that run. This seat's figures: **124 / 84 / 36 named / 4 escaped**.
2. **Add four §6a rows** (or §3 bookings where the mechanism belongs): `fr-ContourSettings M-13` (`:70`, a **primary** band routing — candidate home: F-W5 clause **E14** *Contour provenance*, or booked at R4 beside `B-4 ⊕ i-7`), `fr-ContourSettings M-10` (`:67`, rider — clause **A5**/**E13** family), `fr-GalleryCard L·M-4 / D-13 / C-8(a) + L·D-2 / C-12` (`:64`, serializer — clause **D17**), `fr-CanvasControlsDock C-28` (`:102`, D-4's rider).
3. **Re-point G15's LHS** away from `PASS-1/F-W8-CHECK.md` §1 to the registry itself under record-qualified extraction; a gate whose operand carries the defect class it exists to catch cannot discharge.
4. **Record-qualify P8's `C-3` / `C-4` / `D-13`** and re-key §6a row 34's `B5` citation to `B1` alone (B5's `C:C-12` is **HLG-23**, fr-HarmonicLevelGrid).
5. **Correct §1's record denominator** to the measured 37 positive-routing records (49 token-bearing − 5 boilerplate-only − 7 negatives), and re-anchor the three F-W0 line figures (G-11 `:211`, G-12 `:216`, ledger path `:65`) or extend §0's addressing carve-out to cover concurrently-repaired siblings generally.
6. **Conform the F-W5 §4 quotation** to its bytes (*"v1 §6 re-authored by v2 and executed there"*), adopt R-8's canonical `FR-NP-32 (≡ fr-PaperSidebar M1)` form at §5c, and either qualify or drop `fr-AdminUserList FR-AUL-46` from J4's banked-ids cell (it routes **F.W5**, not the band).
