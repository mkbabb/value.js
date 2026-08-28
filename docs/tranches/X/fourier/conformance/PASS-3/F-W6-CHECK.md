# X·F PASS-3 — F-W6 FRESH ADVERSARIAL SPEC CHECK (L-18/L-20, round 3)

**Seat**: fresh, 2026-08-28. **Roster inherited: NONE.** Every figure below was re-derived at the bytes by this seat this session; every quotation was re-grepped, not carried forward from `PASS-1/F-W6-CHECK.md`, `PASS-2/F-W6-CHECK.md`, `PASS-1/RULINGS.md` or `PASS-2/RULINGS-2.md`. Those four files were read to learn what was *ruled*, never to inherit what was *measured*.

**Subject**: `docs/tranches/X/fourier/waves/F-W6.md` — 356 lines, working tree (`git status --porcelain` → ` M`; HEAD copy is `aa8c2d34`).
**Corpus**: the 66 `fr-*.md` at `docs/tranches/V/megatranche/registry/adjudicated/` (`ls | grep -c '^fr-'` → **66**).
**Real carries** (`ls docs/tranches/X/fourier/carry/`): `F-W1-CARRY.md`, `F-W4-CARRY.md` — the only two. F-W6 states this correctly and cites no `F-W6-CARRY.md`.

**DETECTOR LAW applied**: rows in ANY format count — table rows, id-headed bullets, prose routings walked back to the enclosing row id (S-8) — hyphen **and** en-dash, **and every other spelling the corpus actually uses**. This last clause is where the wave fails.

**Local verdict: DEFECTIVE** — 9 defects, 2 of them at MAJOR weight against M-25 and the census, 1 against the round-2 cure that was supposed to make the wave's derivation runnable, and 5 quotation defects of the exact classes this file's own round-2b sweep declares swept.

---

## §1 — AXIS 1 · ID-KEYED CENSUS, RE-DERIVED

### 1.1 The span measurement reproduces

| probe (this seat) | result | F-W6's figure | verdict |
|---|---|---|---|
| `grep -rhoE 'F\.W6' fr-*.md \| wc -l` | **0** | 0 | ✔ |
| `grep -rhoE 'F\.W5-W8' fr-*.md \| wc -l` / `grep -rlE … \| wc -l` | **120 / 26** | 120 / 26 | ✔ |
| `grep -rhoE 'F\.W5–W8' fr-*.md \| wc -l` / records | **72 / 24** | 72 / 24 | ✔ |
| union occurrences / records | **192 / 49** | 192 / 49 | ✔ |
| en-dash-ONLY records (`comm -13`) | **23** | 23 | ✔ |
| `grep -rnE 'F\.W5[-–]W8' fr-*.md \| grep -c 'tri-package uplift'` | **23** | 23 | ✔ |
| boilerplate-ONLY records (`comm -13` over the two lists) | **fr-AdminUserList · fr-CanvasOverlayButton · fr-DarkModeToggle · fr-GlassTimeline · fr-HarmonicLevelGrid** | same five | ✔ |
| non-boilerplate span lines | **167 across 44 records** | (not stated) | — |

The header arithmetic, the P2-9 boilerplate re-measure (3 → 23) and the five boilerplate-only records all reproduce exactly. **Nothing in §2.0's corrected census is re-litigated by this seat.**

### 1.2 Identity roster, re-derived independently

Walking all 167 non-boilerplate span lines back to their enclosing row ids (S-8) yields **121 distinct span-routed identities** — consistent with F-W6's **122** within the ordinary adjudication slack of fold-vs-row counting (e.g. whether `FR-AFP-40`/`FR-AFP-69` are counted inside `FR-AFP-32`). **The 122 is not contested.** Mechanical presence check of 38 sampled span identities against `F-W6.md` (`grep -c`) returned a hit for **every one** — `C-15 · L-B3 · L-m5 · L-m3 · M-11 · M-8 · M-7 · C-14 · L-M1 · L-M2 · GM-M4 · FR-FG-21 · FR-EQC-8 · D-L5 · GAB-12 · m-18 · FR-AFP-18 · FR-AFP-71 · FR-AFP-32/-40/-69 · GCM-52 · GCM-55 · m-15 · F-4 · C-30 · BLK-1 · FR-USB-24 · FR-GFC-20 · i-7 · M-14 · C-28 · MISSED-E · RESOLVER · N-4 · VV-R2-B`. **Within its own detector, F-W6's coverage is genuinely complete.**

### 1.3 THE ESCAPES — outside the detector, by bytes

The detector is the failure. FW6-G17 declares its operand "spelling-agnostic, every token probed in BOTH U+002D and U+2013, every slash form expanded to its member set." The corpus routes to the same CRUD/provenance union in **two further spellings the gate never probes**:

**(a) The parenthesised span.** ⟨cmd⟩ `grep -rhoE 'F\.W5[^ ]{0,6}W8' fr-*.md | sort | uniq -c` →

```
   1 F.W5(-W8
 120 F.W5-W8
  72 F.W5–W8
```

The single hit is `fr-ContourPreview.md:137`, the record's own closing verdict: *"…three to F.W3, **two to F.W5(-W8)**, one to F.W9/W10…"*. The canonical detector sees **one** ContourPreview span row (row 28, `:61`). The record says **two**. The second is `fr-ContourPreview` **row 13 (`L:L-5`)** — ⟨cmd⟩ `sed -n '46p' fr-ContourPreview.md` → terminal cell *"ADJUDICATED → **F.W5** (readonly/`getPoints` seam; a TWO-member change — `points` AND `magnetRadius`)"*. ⟨cmd⟩ `grep -c 'L:L-5' F-W6.md` → **0**.

**(b) The bare-`F.W5`-as-union-name routing header.** Two records spell the routing taxonomy differently — ⟨cmd⟩ `sed -n '42p' fr-ConvergencePlot.md` → *"Routes: **F.W0** substrate · **F.W1** tri-package uplift · **F.W2** value.js migration · **F.W3** shadow retirement · **F.W4** frontend audit · **F.W5** CRUD/provenance union · …"*. In these records `F.W5` **is the name of the union**, and their rows route to it. ⟨cmd⟩ `comm -13 <(grep -rlE 'F\.W5[-–(]W8' fr-*.md | sort) <(grep -rlE 'F\.W5' fr-*.md | sort)` → **fr-ConvergenceLegend · fr-ConvergencePlot · fr-EquationModeToggle · fr-EquationResult · fr-NotationPills** — five records that route to the union and sit **outside FW6-G17's 49-record denominator entirely**.

**The ten escaped identities, id-keyed, each `grep -c` in `F-W6.md` → 0:**

| # | banked id | record : line | routing at the bytes | F-W6 hits |
|---|---|---|---|---|
| E-1 | **row 13 = `L:L-5`** | fr-ContourPreview:46 | `ADJUDICATED → **F.W5**` (readonly/`getPoints` seam) | 0 |
| E-2 | **FR-EMT-1 = L-B2 / C-1 / D-9** ‡ | fr-EquationModeToggle:31 | *"**→ F.W5** (envelope: `SimplifyResponse.latex_sigma`, or explicit invalidation — filed beside intake R6-8…)"* — **BLOCKER (seam-attributed)** | 0 |
| E-3 | **FR-EMT-20** | fr-EquationModeToggle:50 | *"**→ F.W5** (pairs with FR-EMT-1 in the partial-projection cohort beside R6-8)"* — MAJOR, dead wire fields | 0 |
| E-4 | **FR-EQR-4** | fr-EquationResult:39 | *"**→ F.W4** … **or F.W5** (the hooks as a separate wire field — filed beside R6-8; the forming spec chooses the seam)"* | 0 |
| E-5 | **FR-EQR-32** | fr-EquationResult:73 | *"**→ F.W5** (rides R6-8 as the second seam instance)"* | 0 |
| E-6 | **FR-NP-30b** | fr-NotationPills:130 | *"**F.W5** (FR-NP-30b via R6-8)"* | 0 |
| E-7 | **D-L4 / C-7** | fr-ConvergenceLegend:72 | *"the R6-8-echo arm CARRIES → **F.W5** (child identity derived from parent iteration order…)"* | 0 |
| E-8 | **L-M7 + C-8** | fr-ConvergencePlot:64 | *"**F.W5** rider — `sp.latex(expr)` field on ComputeEquationResponse + C §6's field-level-gap counting rule"* | 0 |
| E-9 | **C-7** | fr-ConvergencePlot:65 | *"**F.W5** — the intake **R6-8 mirror rider**…"* | 0 |
| E-10 | **L-m13** | fr-ConvergencePlot:85 | *"**F.W4** naming + **F.W5** contract note"* | 0 |

`grep -c 'ConvergenceLegend\|ConvergencePlot\|EquationModeToggle\|EquationResult\|NotationPills' F-W6.md` → **0 for every one**.

**Re-denominated: routedTotal = 132 · booked = 24 · escaped = 10 (7.6 %).**

Every escape is a **server/persistence or envelope act** — `sp.latex(expr)` on `ComputeEquationResponse`, `SimplifyResponse.latex_sigma`, dead wire fields, a boundary-cardinality/readonly seam — i.e. squarely F.W6's declared mechanism subset under §2.11b branch 1, not client arms that branch 1 would route away.

**R2-9 is recited, not executed.** FW6-G17 states the shape decree inline (correctly, and this seat confirms bullet rows and prose routings are inside its stated operand) but leaves the *spelling* half restricted to one token in two dashes. R2-9's LAW — *"a gate that states a shape- or spelling-restricted operand is DEFECTIVE at authoring, whatever its result"* — convicts it on its own terms.

### 1.4 The unenumerated half of the operand

FW6-G17's falsifier (a) requires that "every one of the **122** span identities appears in §2.1–§2.10 (booked), §2.11 (cited/folded) or §5 (excluded-with-reason)". §2.11 enumerates rows **1–56 plus 56a**. The next sentence disposes of the remainder without naming it:

> **Rows 57–122** are the 66 identities already booked in §2.1–§2.10 and §5 … **They are not restated here**; FW6-G17's set-difference reads §2.1–§2.11 and §5 as one operand.

§2.1–§2.10 books **24** identities; §5's seventeen rows are largely *classes* ("Every client/display arm listed in the F.W3/F.W4 cross-edge", "the killed-cure register"), not id enumerations. **54 % of the gate's UPPER operand is therefore asserted rather than listed**, and the two-direction set-difference the gate's own GREEN condition specifies cannot be executed from this file. This is the same unrunnable-gate shape the round-2 repair cured at §2.11b, surviving one section above it.

---

## §2 — AXIS 2 · QUOTE REALITY (every receipt re-run by this seat)

⟨cmd⟩ `grep -o '⟨cmd⟩' waves/F-W6.md | wc -l` → **107** live; ⟨cmd⟩ `git show HEAD:…/F-W6.md | grep -o '⟨cmd⟩' | wc -l` → **80**, exactly the pinned figure. The pin reproduces.

### 2.1 Receipts that REPRODUCE (spot-checked; all byte-exact)

`grep -c '§6c' F-W5` → 0 · `grep -c '§12' F-W5` → 0 · `grep -rn "burn-down needs" waves/` → F-W6 only (3 hits, all errata) · E2 ▲ *"F.W5 owns the CLAUSE; F.W6 owns the burn-down — do NOT double-book."* → 1 · G3 *"F.W5 owns the CLAUSE only — no double-booking"* → 1 · the `F.W5 → F.W6` edge row (F-W5:302) · the `F.W5 → value.js API row` edge row (F-W5:309, and it does **not** itemize V-α — the correction of record holds) · `sed -n '161p' lane-crud.md` → *"**value.js defect V-α — revert writes no version row but still increments the counter.**"*, under **§2 → R-2 · Git-like chains** (headings at :110/:130) ✔ · `sed -n '71,72p'` census → the two-line dissent with the `/` wrap ✔ and `grep -c '\*\*on their side\*\*'` → **0** ✔ · `sed -n '200,202p'` census → §4 item 7 (§4 heading at :179) ✔ · COHESION *"neither side's edits gate the other's"* at `:69` under `## §2` (`:64`) ✔ · `grep -n 'Reusable as-is (value.js is ahead)'` → `:394`, under `## §7 — Raw-material summary` (`:385`) ✔ · *"ship the 46th operation **or** delete the affordance — **NO THIRD OPTION SHIPS**"* ✔ · *"editor-saved contour is a first-class compute input; extraction cannot overwrite a `source="editor"` asset"* ✔ · *"fix the key FIRST or the B-1 repair ships broken."* ✔ · *"F.W5's own binding**: the server arm SEQUENCES AFTER the join split."* ✔ · *"The abort-key fix and FR-AUL-59's pipeline fix **compose; neither alone closes the window**."* ✔ · *"▲ **The race discipline is a recorded superlative (S-6): do NOT cure the waste by removing the guard**"* ✔ · *"the admin-auth seam owns WHICH predicate is canonical (F.W5)"* ✔ · `FR-IC-6 (→L·m-7)` ✔ · *"fr-FunctionInput L-B1 FOLDS and is not re-booked"* ✔ · *"fr-FunctionInput C-8 rides the same constant"* ✔ · **G10c** cell ✔ · D17's FULL banked `fr-GalleryCard L·M-4 / D-13 / C-8(a) + L·D-2 / C-12` spelling ✔ · the fr-GalleryCard fold row incl. its `serializer → F.W5–W8` tail ✔ · `FR-GFC-20 = C-9` whole, incl. *"**→ F.W4** + **F.W5-W8 rider**."* ✔ · the `WAVE-LOCK` on *"any F.W5-W8 wiring of `basisFilter`"* ✔ · `R-16 = C-3` ✔ · `m-7 = C-6-as-rescoped — MINOR` ✔ · `props/reconciliation contract → **F.W3/W4**; server-side dedupe/idempotency … → **F.W5-W8**` ✔ · `FR-GV-13 = MISS-LC-2` incl. the `owner == "me"` tail ✔ · `Server half (Literal/enum … shared.py:69): **F.W5-W8**` ✔ · `FR-GFC-1's share at F.W5 is the RIDER ONLY` ✔ · `F.W4** (one predicate, one home) + **F.W5-W8 rider** (…which predicate is canonical)` ✔ · E10's *"**v2 states ONE disposition for produced-and-unconsumed fields, not three ad-hoc deletions.**…"* ✔ · the E6 repair-test lock ✔ · `F-W9 §5`'s *"The 14 boilerplate routing-law lines, the 12 verdict-prose mentions, and the 7 boilerplate-only records"* ✔ · `## §Rows` / `### D · … (the transport cluster)` / `:234`'s *"Its type reaches the F.W5–W8 wire rows."* ✔ · **the whole §2.11a negative-roster loop, run verbatim — all seven reproduce** ✔ · F-W1 §4 step 4's *"The roster is **TWELVE** limbs and stays twelve…"* ✔ (line 276, §4 opens at 270) · F-W0's `### G-11 —` / `### G-12 —` headings ✔ (:264/:269) · `find … -name 'lane-fourier-r3-r6.md'` → exactly one path ✔ · *"located at `audit/codex-provenance/intakes/`"* ✔ · `wc -l J-diff-shape.md` → **271** ✔ · `git diff --stat -- api/src src` → **empty** ✔ · `ls waves/` → **11** files ✔.

**This is a genuinely well-receipted document.** The failures below are narrow and specific — but they are all of classes the file itself declares closed.

### 2.2 Receipts that DO NOT reproduce

**Q-1 · §2.1 · `X-8 verbatim` — no ⟨cmd⟩, and emphasis invented.**
F-W6: *"X-8 verbatim: *"strengthens the census routing, **no new work**"*"*. ⟨cmd⟩ `grep -rn "strengthens the census routing" docs/` → `audit/codex-provenance/INTAKE-ADJUDICATION-2026-08-03.md:197: booking); strengthens the census routing, no new work.` — **plain**. ⟨cmd⟩ `grep -c 'strengthens the census routing, \*\*no new work\*\*' INTAKE-ADJUDICATION-2026-08-03.md` → **0**. Bold added inside quotation marks; the label "verbatim" carries no receipt (R2-1-LAW clause 2 = defect per se); and the attribution "X-8" names an intake row, not the file the words live in.

**Q-2 · §2.5 · the AA-10 cure sentence — no ⟨cmd⟩, three drifts.**
F-W6: *"Verbatim: **"an audit row's actor is a field, not a repurposed `ip_hash`."**"*. The bank, ⟨cmd⟩ `sed -n '183p' waves/F-W5.md` (clause **E18**): *"**An audit row's actor is a FIELD, not a repurposed `ip_hash`**"* — capital **An**, **FIELD** in caps, **no trailing period inside the emphasis**. ⟨cmd⟩ `grep -rn "actor is a field, not a repurposed" docs/` → **F-W6 only**. This is precisely the drift the file convicts at §2.11 row 49 ("down-cased the clause's opening *'The'* and dropped the bold"), recommitted at a cell wearing the word *Verbatim*.

**Q-3 · §2.1 · the G3 close — no ⟨cmd⟩, bold stripped.**
F-W6: *"F.W5 G3's close verbatim: *"v2 states deepen-or-retire for the depth/parent/root quadruple"*"*. ⟨cmd⟩ `grep -c 'v2 states deepen-or-retire for the depth/parent/root quadruple' waves/F-W5.md` → **0**; ⟨cmd⟩ `grep -c 'v2 states \*\*deepen-or-retire\*\* for the depth/parent/root quadruple' waves/F-W5.md` → **1**.

**Q-4 · §2.6 · the M-10 innerPoly trap — receipted, and the receipt does not produce it.**
F-W6 pastes: *"its geometry pipeline routes to **F.W5-W8** (provenance union, with the DO-NOT-REGENERATE rider **and the M-10 innerPoly trap attached**)"*. ⟨cmd⟩ `grep -o "its geometry pipeline routes to.\{0,120\}" fr-FourierShapeExtractor.md` → *"its geometry pipeline routes to F.W5-W8 (provenance union, with the DO-NOT-REGENERATE rider and the M-10 innerPoly trap attached)"* — **no bold anywhere**. ⟨cmd⟩ `grep -c 'routes to \*\*F.W5-W8\*\* (provenance union' fr-FourierShapeExtractor.md` → **0**; `grep -c 'and the M-10 innerPoly trap attached\*\*'` → **0**; plain form → **1**. Emphasis added inside quotation marks over a **frozen, immutable** record.

**Q-5 · §2.11 row 9 · the D7 rider — the pasted string is not the command's output.**
F-W6 pastes *"the typed range-checked descriptor table for all six fields rides an F.W5–W8 rider — the contract seam owes client-derivable bounds"*. ⟨cmd⟩ `grep -c '…rides an F.W5–W8 rider' waves/F-W5.md` → **0**; ⟨cmd⟩ `grep -c '…rides an \*\*F.W5–W8 rider\*\*' waves/F-W5.md` → **1**. Two faults: the bank's bold on `**F.W5–W8 rider**` is stripped, and the leading `the ` is prepended to a `grep -o` output that begins at `typed`. The cell's own parenthetical convicts round 1 for *"emphasis the bank does not carry"* at this very string.

**Q-6 · §4 F.W0 edge · an erratum whose own coordinate claim is stale.**
F-W6: *"round 1 addressed the two tables as `F-W0.md:199` / `:204`, and F-W0's own repair moved them — `:199` now sits inside G-8's body and `:204` is G-9's *"Owning rows"* cell."* ⟨cmd⟩ `sed -n '199p;204p' waves/F-W0.md` → `:199` is **blank**; `:204` is `### G-1 — The 28-path M.W1a tree is SETTLED, per path, minuted`. ⟨cmd⟩ `grep -n '^### G-8 —\|^### G-9 —' waves/F-W0.md` → **248 / 253**. The *law* the erratum teaches is right and the gate-id anchors it prescribes do resolve; the *fact* it states about a live sibling no longer does — a fourth-generation instance of the drift class, inside the cure for it.

**Q-7 · §2.11a · "byte-for-byte" is loose at one cell.**
The section asserts all seven negatives *"reproduce, in order, byte-for-byte with the cells below"*. `fr-CollapsibleSection:131` continues past the cell's stopping point — actual: *"…and that negative is recorded**;** the c…"* — truncated with no elision mark, the same fault the round-2b sweep books at row 46.

---

## §3 — AXIS 3 · M-25 DEPTH (locks · riders · dissents)

### 3.1 Present and correct

- **Same-commit / one-cut laws** — F-β ⊕ SS-C-1 ONE PATCH-model change · F-γ ⊕ FR-AFP-4 one privacy limb · FR-AFP-66 ⊕ FR-AFP-33 · G2/G3/G4 same commit. All carried at both the row and §4 lock 3. ✔
- **Anti-cures / killed cures, all carried and all still killed**: AA-23 regex-action · β's 428-escalation · K9's five `?? item.slug` fallbacks · SE-05's *"just delete it"* · **m-7's 422-straddle scenario only** (with the explicit scope correction that a killed sub-claim never kills its host row) · D-1's skeleton cure · K12 static closure · FR-GV-24's no-re-open-increment · K-1's 45/30/13 · K-6/S-8 enumeration. ✔
- **The M-10 innerPoly ANTI-CURE RIDER** is carried where its rows land (§2.6), with the prohibition stated correctly — *only its quotation marks are wrong* (Q-4). ✔ substance
- **The DO-NOT-REGENERATE TRIPWIRE** with its BLOCKER-revival clause, at §2.6, FW6-G15, §4 lock 7, §5. ✔
- **fr-GallerySearchBar C-2 WAVE-LOCK** — the corpus's only lock binding *"any F.W5-W8 wiring"* by name — restored at §2.11 row 50 and repeated at §4 lock 9, cited once with one receipt. ✔
- **PAW-44/LAW-3 · MPC-31/MPC-3⊕10⊕13⊕8⊕22 · FR-MSP-6 two-channel lock · fr-PaperSearchModal D-1+D-3+outline:none** — all four named in §5's paper-register row as riders that *travel with their rows, which do not land here*. ✔ (correct disposition: none of these routes to F.W6)
- **Dissents preserved**: retire-vs-deepen (F-α, with the census C-6 bytes and fourier's own M.W10 DELETE booking) · FR-AFP-7 β/L-axis-only · FR-AFP-10/-70 β-only · reader-1's BLOCKER positions on L-B1 and L-B2/C-2 vs the seat's MAJOR demotion · GIG C-3's refused re-grade (R-7 identity guard) · FR-GFC-1's two BLOCKER filings · the L-1/L-2 dual-BLOCKER resolution at FR-AFP-1. ✔
- **Owner-ruling roster R1–R9** — verified line-by-line against `F-W5.md` §2a (heading at `:216`): R1 TA-4/G4-E3 · R2 trie-vs-KISS/G7-E16 · R3 producer-or-retire/G11-D3 · R4 like verb/G10-D2 · R5 off-state `[]`/M-9-D12 · R6 hard-delete arm/FR-AFP-9-D6 · R7 codegen/FR-AFP-71-A4 · R8 remix-vs-fork+born-visibility/E4 · R9 dead session subsystem/FR-USB-23-C3. **Exact match**, including R9's ⊙ travelling with FR-USB-23 across the F.W8 routing row. ✔
- **R-1e clause re-keys** re-verified: `grep -c '\*\*D9\*\*' F-W5` → **0** (no D9; the actor clause is E18) · D5 = *which identifier a human surface may render* · D6 = *lifecycle/cascade* · D8 = *a blanket write is not a transition* · D12 = *closed domains* · D17 = *date serialization, serializer arm only* · `## 3. Gates — 22, all born-RED` at `:259` · `G1c`–`G10c` all ten present. ✔

### 3.2 Defective

- **FR-NP-32 erosion.** ⟨cmd⟩ `grep -c 'FR-NP-32' waves/F-W6.md` → **1**. The corrupt-dist fact is stated **twice**: at §4's F.W0 cross-edge (*"**FR-NP-32 ≡ fr-PaperSidebar M1** — one fact, two banked witnesses; cite both, never substitute"*) and at **FW6-G19's born-RED witness**, where it reads *"glass-ui 4.0.0 ships a syntactically corrupt `dist/styles/index.css` (**fr-PaperSidebar M1**)"* — **M1 alone**. R-8's LAW is *"canonical citation form **everywhere the gate is stated**"*, restated by R2-7.5 as *"the LAW's scope clause is 'everywhere the gate is stated'; absence from a directive index lifts nothing."* The gate's own witness cell is the one site that drops the id. The canonical parenthesised form `FR-NP-32 (≡ fr-PaperSidebar M1)` appears **nowhere** in the file.
- **The FR-EMT-20 drop** — see §4.2 below; it is simultaneously a census escape and an M-25 violation at the clause this wave executes.

---

## §4 — AXIS 4 · GATES

### 4.1 Born-RED, witnesses real

19 gates (FW6-G1…G19), every one born RED with a named failing witness, and the split-verdict discipline stated at §3's head. Witnesses re-run against the live fourier tree by this seat:

| gate | witness re-run | result |
|---|---|---|
| FW6-G1 | `grep -rn "_write_root_version" $F/api` | def `visualizations.py:110` + `:220` + `:592` — **the only writer** ✔ |
| FW6-G6 | `grep -rn "viewed_ips" $F/api` / `liked_ips` | **0 / 7** ✔ |
| FW6-G12 | `grep -nE 'response_model' $F/api/routers/admin.py` | **exactly one** — `:110 "/stats", response_model=AdminStatsResponse…` ✔ |
| FW6-G12 | `grep -cE '^@[a-z_]*router\.(get\|post\|put\|patch\|delete)' admin.py` | **13** ✔ — the re-measured "1 of 13" holds |
| FR-AFP-33 counterweight | `grep -n "if not flagged" admin.py` | `550:    if not flagged:` ✔ |
| FW6-G15 | `grep -rn "def order_contours" $F \| wc -l` | **0** ✔ |
| FW6-G16 | `git diff --stat -- api/src src` | **empty** ✔ |
| FW6-G19 | `wc -l J-diff-shape.md` (bounds r7) | **271** ✔ |

**No gate is argued RED over a witness that does not reproduce.** The round-2 cure of FW6-G12 (0 → 1-of-13) is correct and sharper, exactly as claimed.

### 4.2 Closure operands — row-shape-tolerant, but not spelling-tolerant

FW6-G17 states the shape decree **inline**, as R2-9 requires, and this seat confirms the stated operand admits table rows, id-headed bullets and S-8 prose walk-backs. **The shape half is discharged.** The spelling half is not: the operand is the single token `F\.W5[-–]W8`, and §1.3 above shows two live spellings outside it carrying ten identities. The gate cannot fail on what its operand cannot see — which is the definition R2-9 gives of a defective gate.

The lower operand (§2.11a's 7 negative records) reproduces exactly and is correctly excluded from every denominator (B5). ✔

### 4.3 §2.11b — the re-authored derivation law is STILL unrunnable

The round-2 repair diagnosed the round-1 procedure ("branch 2 captured all 24 and routed them to CITATION") and re-authored it around a new discriminator:

> **3.** Does an `F-W5.md` clause STATE it, **and does that clause's GREEN-owner cell name F.W6 or the fourier API row as the executing seat?** — **YES to both** → F.W6 BOOKS … **GREEN owner is anyone else** → **CITE the clause; do not book.**
> … **Every one of the 122 exits through exactly one branch, and the branch it took is legible from its landing cell.**

Run against the file's own clause-ownership lists (§4, the F.W5 cross-edge), the procedure contradicts the file's landings in **both** directions:

- ⟨cmd⟩ `grep -o 'Clauses whose GREEN owner is F.W6[^.]\{0,220\}' F-W6.md` → *"**C1, C2, C5, D5, D6, D8, D10, D11, D12, D16, D17, E2, E5, E6, E7, E13, E14, E17, E18, B4/E10, §G G1c–G10c**, and D2/D3 conditionally"*.
- ⟨cmd⟩ `grep -o 'Clauses whose rows this wave CITES but does not own[^.]\{0,200\}' F-W6.md` → *"**E4, E8, E9, E11, E12, E15, D7, A3, A4, A5, A6, C3, C4, F1–F6, G3c/G4c/G8c/G9c**"*.

**(a) A booked row whose branch says CITE.** §2.11b's own mapping list reads `FR-AFP-33→D7`. **D7 is in the CITES-not-owned list.** Branch 3 therefore routes FR-AFP-33 to CITATION — yet it is booked as a §2.4 row.

**(b) Seven cited rows whose branch says BOOK.** These §2.11 landings are CITATIONS on clauses the same file lists as F.W6-owned:

| §2.11 row | identity | stating clause | in the F.W6-OWNED list? | landing |
|---|---|---|---|---|
| 7 | fr-BasisSelector M-9 ⊙ | **D12** | yes | CITED |
| 11 | fr-ContourSettings M-10 | **D12** | yes | CITED |
| 21 | fr-EditorControlsDock D-12/C-4/C-5 | **E5** + **C1** | yes (both) | CITED |
| 22 | fr-EditorControlsDock C-6/C-7 | **C1** | yes | CITED |
| 45 | fr-GalleryCardModal GCM-10 | A3 + **D17** | yes (D17) | CITED |
| 46 | fr-GalleryFeaturedCarousel FR-GFC-1 | **D10** | yes | CITED |
| 56a | fr-GalleryView FR-GV-13 (server arm) | **D10** | yes | CITED |

Branch 4 does not rescue row 7: it explicitly says ⊙ *"does not re-route it — the row keeps whatever landing branches 1–3 gave it"*, and branch 3 gave it BOOK.

Either the discriminator is wrong or eight landings are. **The claim that all 122 exit through exactly one branch is false at the file's own bytes**, and §2.11b's closing sentence — *"a procedure whose branches cannot be run in order is itself that failure, disguised as a rule"* — is self-describing for the second consecutive round.

---

## §5 — AXIS 5 · POSTURE

| item | measured | verdict |
|---|---|---|
| F.W1 transaction cited whole, correct limb count, stable anchor | §4 lock 5 cites **F-W1 §4 step 4** and quotes *"The roster is **TWELVE** limbs and stays twelve…"* by ⟨cmd⟩; the sentence is at `F-W1.md:276`, inside `## §4 Sequencing` (`:270`), step 4. **TWELVE**, no limb named, no re-derivation | ✔ |
| F.W0 pre-gates honored | §4 lock 1 (*"F.W0 substrate pre-gates FIRST … failing to re-ground HALTS this wave"*), FW6-G19, D-19 MEASURE-AT-OPEN on every anchor, G-11/G-12 cited by **gate id** (headings resolve at `:264`/`:269`) | ✔ (one stale erratum fact — Q-6) |
| W7's ruled posture | F-W6 books nothing to F.W7 and confines its F.W7 edge and §5 row to the ⊙ trie/compression design (E16/G7) with the documented no-trie default — exactly R2-8's ruled shape; nothing is minted into F.W7's empty column | ✔ |
| F.W9/W10 splice direction (R-2b) | F-W6 emits coverage obligations only (AA-44, FR-AFP-49, G2/G5 tests); it makes no claim about the checkpoint-set splice and cannot invert it | ✔ n/a |
| SS-4 flags inline | §4's SS-4 edge flags **all nine** rulings by ruling id with honest defaults, plus OG-F1/OG-F2; FW6-G18 carries the same roster; §5 repeats it | ✔ |
| tree READ-ONLY | §1's NOT-in-bounds row, standing law 1, the §4 fourier edge, and the r7 read-not-write reconciliation; **zero fourier bytes**; `git diff --stat -- api/src src` → empty | ✔ |
| status `planned`, zero VERIFIED | masthead `status: planned`; Four-verb IMPLEMENTED **NO** / VERIFIED **NO**; *"EXECUTION IS NOT AUTHORIZED BY THIS FILE"* | ✔ |
| RULINGS-2 applied | R2-1a ✔ (both halves struck, quarantined) · R2-1b ✔ (two real homes, V-α non-membership stated as correction of record) · R2-1-LAW **partial** (Q-1…Q-5) · R2-2 ✔ (stable anchors; only the four declared quarantined line-cites survive — `grep -oE 'F-W[0-9]+\.md:[0-9]+'` → `F-W0.md:199` ×3, `F-W1.md:276` ×3, all inside errata) · R2-5 ✔ · R2-9 **partial** (§4.2) · P2-9 cluster ✔ | mixed |

---

## §6 — DEFECT REGISTER

| # | sev | defect | receipt |
|---|---|---|---|
| **D-1** | **MAJOR** | **10 union-routed identities in 6 records escape both FW6-G17 operands** — the detector probes only `F\.W5[-–]W8` while the corpus also routes under `F.W5(-W8)` and under bare `**F.W5** CRUD/provenance union` | `grep -rhoE 'F\.W5[^ ]{0,6}W8'` → `1 F.W5(-W8`; `comm -13` → 5 off-roster records; each escaped id `grep -c` in F-W6.md → **0** (§1.3 table) |
| **D-2** | **MAJOR** | **M-25 drop at the clause this wave executes** — `fr-EquationModeToggle FR-EMT-20` (MAJOR, dead wire fields) is named in F-W5 clause **E10**'s carried-rows cell, and §2.7 books PP-DEADSEAM against E10/B4 while omitting it | `grep -o '\*\*E10\*\*.{0,200}' F-W5` → *"M-β4 · **fr-EquationView L·m-6** (=C·D-14) · **FR-EMT-20** (cited F1)"*; `grep -c 'FR-EMT-20' F-W6.md` → **0** |
| **D-3** | **MAJOR** | **§2.11b's re-authored derivation law is still unrunnable** — branch 3 routes booked `FR-AFP-33` (D7, in the CITES list) to CITATION, and routes 7 CITED rows (D12/E5/C1/D17/D10) to BOOK | §4.3 table; both clause lists quoted by `grep -o` from F-W6.md |
| **D-4** | **MAJOR** | **Three "verbatim"-labelled quotations carry no ⟨cmd⟩ and all three misquote** (R2-1-LAW clause 2 = defect per se) | Q-1 `grep -c '…\*\*no new work\*\*'` → 0 · Q-2 `grep -rn "actor is a field, not a repurposed" docs/` → F-W6 only · Q-3 unbolded form → 0, bolded → 1 |
| **D-5** | MEDIUM | **Receipted quotations their own commands do not produce** — emphasis added over a frozen record (M-10 innerPoly trap) and emphasis stripped from F-W5 (row 9's D7 rider, plus a prepended `the `) | Q-4 `grep -c 'routes to \*\*F.W5-W8\*\* (provenance union'` → 0, plain → 1 · Q-5 as-pasted → 0, bolded → 1 |
| **D-6** | MEDIUM | **FR-NP-32 erosion** — the corrupt-dist gate is stated twice and carries the banked id once; FW6-G19's own witness reads `fr-PaperSidebar M1` alone (R-8 / R2-7.5) | `grep -c 'FR-NP-32' F-W6.md` → **1** |
| **D-7** | MEDIUM | **FW6-G17's UPPER operand is 54 % unenumerated** — §2.11 lists 56(+56a); "rows 57–122 … are not restated here" while §2.1–§2.10 books 24 and §5 is class-level, so falsifier (a)'s set-difference cannot be run | §2.11 closing paragraph; §2.1–§2.10 row count |
| **D-8** | LOW | **An erratum's own coordinate claim is stale** — §4's F.W0 edge asserts `:199` is inside G-8 and `:204` is G-9's *"Owning rows"* cell | `sed -n '199p;204p' F-W0.md` → blank / `### G-1 —`; `grep -n '^### G-8 —\|^### G-9 —'` → 248 / 253 |
| **D-9** | LOW | **§2.11a's "byte-for-byte" claim is loose at one cell** — `fr-CollapsibleSection:131` truncated at *"recorded"* with no elision mark | `sed -n '131p' fr-CollapsibleSection.md` → *"…and that negative is recorded**;** the c…"* |

---

## §7 — WHAT THIS PASS DOES **NOT** RE-LITIGATE

Per RULINGS-2 and the evidence above, and stated so no fourth pass re-opens them: the **192/49 span arithmetic** and the 23-boilerplate/5-boilerplate-only split (re-derived, exact) · the **R-1e clause re-keys** and the retirement of the invented `D9` (re-verified against F-W5's live register) · the **R1–R9 owner roster** (exact match to F-W5 §2a) · the **born-RED witness set** (every sampled witness re-run against the live fourier tree) · **FW6-G12's 1-of-13 re-measure** · the **DO-NOT-REGENERATE tripwire**, the **killed-cure register**, the **one-cut laws** and the **read-only / E-3 / `planned` discipline** · the **TWELVE-limb citation** at its stable anchor · the **negative roster** · and **F.W7's ∅ posture**, which F-W6 honours without touching.

**The wave's substance is sound. Its census boundary, its derivation rule, and five of its quotations are not.**

*Read-only everywhere except this file.*
