SERVED MODEL: claude-opus-5[1m]

# X.F.W8 — G15 CARRY CLOSURE: the set-difference, both directions, run and committed

**Authored by**: X.F.W8 unit **e**, 2026-09-19 (sitting of record **2026-09-17**, the owner's
begin-word, COHESION **§0j**). **Gate**: `F-W8.md` **§4 G15**, whose clears-when cell names this file
by path: *"Output committed to `F-W8/carry-closure.md`."* **Bar**: **set-difference ∅ in BOTH
directions**, with the standing rule that **no row on either side is a BOOKING**; *"a non-empty
difference after two closure passes HALTS the wave."*

**Result, stated before the evidence so no reader has to hunt for it**: **PASS 1 — direction A ∅ ·
direction B NON-EMPTY (3 rows).** **PASS 2 — ∅ in both directions**, the three rows homed by the §7
annex with their canonical holders and their dispositions. **The HALT condition is NOT met.** Two
further findings are published rather than absorbed: one **classification** residue inside the §6a
table (row 3), and one **instrument** false pair that a second, tighter instrument struck (§3.4).
**F.W8 books no canonical row, and this run found none booked.**

---

## §0 The law this file is written under

1. **The operand is the FROZEN canonical and nothing else** (R4-3 / R4-10): `CENSUS-CANONICAL.md`
   **§2**'s rosters. **Never** a check file (`conformance/PASS-*/…`), **never** a re-cut from the
   corpus, **never** a re-derivation of this seat's own, **never** a regex standing in for a roster.
2. **Ids are differenced as record-qualified `(record, id)` pairs** with boundary-aware matching
   (G15's own clause: `re.escape(id) + "(?![0-9A-Za-z])"`). A bare token is not an identity, so a
   difference keyed on one is not a run of this gate.
3. **The run governs.** G15's cell and §1's strike both say it: *"if that run disagrees with anything
   stated here, the run governs and this cell is amended, not defended"* (R2-7.4, stamp-follows-operand).
   The spec is **frozen** (E-3), so the amendment lands **here, dated, beside it** — never over it.
4. **Quote-by-command.** Every figure below is the pasted output of a command run by this seat this
   sitting, double-run, read from settled bytes (**WRITE-THEN-MEASURE**, **SELF-COUNT**).
5. **Ordering** is `UTF8_BYTEWISE_CODEPOINT` wherever this file lists identities (**X-9**'s sibling
   lock at §3 M5); **no percentage and no coverage ratio is published here** (X-9: one member-scope law
   before any percentage — this file publishes counts and rosters, never a rate).

---

## §1 The operands, pinned and parsed

### 1.1 ROSTER — the frozen census of record

⟨cmd⟩ (base `docs/tranches/X/fourier/conformance`) `shasum -a 256 CENSUS-CANONICAL.md | cut -c1-12` →
**`f44362757458`** — **identical to the pin the spec carries at its masthead and at §6a**, so the
operand this run consumed is byte-for-byte the operand the spec named.

| roster | heading, at the frozen bytes | span | record bullets | pairs parsed |
|---|---|---|---|---|
| **§2 `F.W5`** | `### F.W5 — **27 rows** *(errata round 6, 2026-08-29: read 28; `fr-ConvergencePlot K-13` → TERMINAL at E6-3)*` | `:5079`–`:5090` | **11** | **27** |
| **§2 `F.W5-W8`** | `### F.W5-W8 — **89 rows** *(errata round 5, 2026-08-29: read 90; `C:C-23` → UNROUTED at E5-15)*` | `:5093`–`:5125` | **31** | **89** |

**`27 + 89 = 116`**, the roster extent the spec's G15 cell states.

**PARSE RECEIPT — the operand checked itself before it was used.** Each bullet declares its own count
(`- **fr-Record** (n): …`). The parser compared **n** against the ids it actually extracted for every
one of the 42 bullets: ⟨cmd⟩ `awk -f parse.awk roster-fw5.raw 2>mismatch` and the same for the band →
**zero mismatches, both files** (double-run). A roster whose declared arity disagreed with its own
contents would have poisoned every difference below silently; it does not.

**A second, independent consistency reading of the operand, published as a reading and not as an
authority**: the canonical's **§1 per-record tables** yield **4242** `(record, id)` rows and its **§2
rosters** yield **4242** pairs — a bijection. This file differenced against §2, as instructed; the §1
agreement is stated so a later seat knows the two halves of the census did not disagree under this
run's parser.

### 1.2 CITATION — the spec's own carry and exclusion apparatus

⟨cmd⟩ (base `docs/tranches/X/fourier`) `grep -n '^## 3\. Carry\|^## 4\. Gates\|^## 6\. Excluded\|^### 6a\.' waves/F-W8.md`
→ `163` · `222` · `286` · `320`; ⟨cmd⟩ `wc -l < waves/F-W8.md` → **374**.

| operand | span | what it is |
|---|---|---|
| **§3** | `:163`–`:221` | the 28 carry rows (P1–P8 · J1–J7 · R1–R6 · M1–M5 · D1–D2) |
| **§6** | `:286`–`:319` | excluded **by class** |
| **§6a** | `:320`–`:374` | excluded **by ID** — the 40 numbered citation rows, plus the header's two cited-not-rowed ids and the one **struck** row (`⌧`, unnumbered) |

`CITE` below means the union of those three spans. **`:222`–`:285` (§4 gates, §5 sequencing and
cross-edges) is deliberately OUTSIDE the citation operand** — that is the gate's own scoping, and
direction B's whole content is what it catches there.

### 1.3 What is NOT an operand here

`PASS-1/F-W8-CHECK.md` and every later check file (retired at R2-7.3, struck at R4-3.2) · the A-2
spelling census (demoted to a dated detector reading at round 4) · any re-cut of the band from the 66
records · any figure this file could compute for itself. **The LHS is a roster held by another wave
(F-W5, per R4-10), and that is the point of the design**: a gate whose denominator is its own
arithmetic can only re-find its own misses.

---

## §2 The instrument, published so it can be re-run and falsified

```python
# boundary-aware, per G15's own clause, with the left boundary guarded too
rx(id) = re.compile(r'(?<![0-9A-Za-z])' + re.escape(id) + r'(?![0-9A-Za-z])')

# record-qualification (REST-45's rule, applied unchanged):
#   a pair (record, id) is IDENTIFIED on a line when rx(id) matches AND
#     ( the id is CANONICAL-UNIQUE — exactly one record in the canonical carries it )
#     OR ( the record's own name occurs on that line )
```

**Two disclosures about the instrument, because an unstated instrument is an unfalsifiable claim.**

- **The ambiguity domain is the CANONICAL, not the corpus**, and that choice reproduces the banked
  figure exactly: ⟨cmd⟩ the ambiguity count over the 89 band pairs → **40 of 89 canonical-ambiguous**,
  which is REST-45's published partition (*"40 of the 89 are corpus-AMBIGUOUS"*) at the same number.
  The corpus domain is **stricter** (records cross-cite each other constantly) and returns **54 of 89**;
  it is reported here and used nowhere, because the resolution target is the canonical.
- **Co-occurrence is LINE-scoped, and this file's "lines" are paragraphs.** That is REST-45's rule as
  written, and it is kept as the instrument of record. A second, tighter instrument — the record name
  within **±200 characters** of the id occurrence — is run **only as a cross-check for false pairs**,
  never as the operand: on paragraph-lines it false-**negatives** badly (it loses the whole §3 **D2**
  identity block, whose record name sits at the head of a 6,000-character row). It earned its keep
  once, at §3.4.

---

## §3 DIRECTION B — the canonical rows this file NAMES, differenced against CITE

*(the escape direction: does an identity this file names sit in no carry row and no exclusion row?)*

### 3.1 The band roster (89)

| measure | value |
|---|---|
| band rows **named** in `F-W8.md`, record-qualified | **89 of 89** |
| of those, named **inside CITE** (§3 ⊎ §6 ⊎ §6a) | **87** |
| **named, but in NO §3/§6/§6a row** | **2** |
| named nowhere in the file | **0** |

**The 89-of-89 reading is the cured state of round 4's sweep and REST-45's re-cut, re-measured at this
seat under the record-qualified instrument** — not inherited. The two escapes REST-45 named
(`fr-BasisSelector m-7`, `fr-GalleryDraftsSection m-15`) both qualify at these bytes, at §3 **J4** and
§6a **row 40** respectively.

### 3.2 The F.W5 roster (27)

| measure | value |
|---|---|
| F.W5 rows **named** in `F-W8.md`, record-qualified | **8 of 27** |
| of those, named **inside CITE** | **6** — `fr-AdminAuditLog AA-23` (§6a row 3) · `fr-AdminUserList FR-AUL-21` (§6a row 38's witness quote) · `fr-AdminUserList FR-AUL-31` (same) · `fr-AdminUserList FR-AUL-46` (§3 J4, cited **not** booked, R2-11) · `fr-AnimationControls R6-8` (§3 J1's fold list) · `fr-ContourPreview L:L-5` (§6a's header citation) |
| **named, but in NO §3/§6/§6a row** | **2** (one of which §3.4 strikes as an instrument artifact) |
| named nowhere in the file | **19** |

**The 19 are not a residue.** The LHS is *"the canonical rows this file **names**"*; a keystone row
F.W8 never mentions is not in the LHS and owes this table nothing. Naming that explicitly is the
difference between a closure and a coverage claim, and F.W8 makes no coverage claim over F.W5's roster.

### 3.3 The residue, PASS 1 — three rows, each measured whole

| # | pair | canonical row (frozen `:line`) | canonical routing / holder | where the file names it | why it is here |
|---|---|---|---|---|---|
| **D1-a** | `fr-AdminFlaggedPanel` **FR-AFP-66** | `:357` | `F.W5-W8` → **F.W5-W8** | **`:271`** only — §5c's `F.W9/W10` row, *"Coverage seams emitted: … FR-AFP-66's orphan-flag test exercising only the reporter-keyed path"* | a **band-homed** canonical row, named as an emitted coverage seam, carried by no §3 row and excluded by no §6/§6a row |
| **D1-b** | `fr-AdminFlaggedPanel` **FR-AFP-33** | `:366` | `F.W5-W8` · `F.W1/W3` · `SS-13` → **F.W5-W8** <sub>legs: F.W1/W3, SS-13</sub> | **`:274`** only — §5c's `SS-13` row, *"FR-AFP-33's aggregate cost"* | a **band-homed** canonical row, deferred for **magnitude** to SS-13 and therefore never rowed as a carry or an exclusion |
| **D1-c** | `fr-AdminUserList` **FR-AUL-13** | `:427` | `F.W5` → **F.W5** | **`:271`** only — §5c's `F.W9/W10` row, *"FR-AUL-13's lesson adopted as this wave's own bar: a contract document without a probe REPEATS the defect that row convicts"* | a **keystone-homed** canonical row, named as a **method lesson**; a lesson is not a carry and not an exclusion, so the apparatus has no slot for it |

Each is a single occurrence in the whole file (⟨cmd⟩ per pair, whole-file scan → `[271]`, `[274]`,
`[271]`), each is **canonical-unique** (so the qualification does not rest on line-scoped
co-occurrence), and **not one of them is a booking**: all three are named in an edge-declaration cell,
in the grammar of *"this is emitted / deferred / adopted as a bar"*.

### 3.4 The fourth candidate, and the instrument that killed it

`fr-ConvergencePlot` **R6-8** entered PASS 1's residue at **`:246`** — G15's own gate cell — and is
**STRUCK as a false pair, not annexed**. The cell quotes the canonical probe output
``:5397:- **fr-ContourPreview** (1): `R6-8``` *and*, elsewhere in the same 5,000-character line, the
errata note `fr-ConvergencePlot K-13 → TERMINAL at E6-3`. Line-scoped co-occurrence therefore paired
one record's name with another record's id. ⟨cmd⟩ the ±200-character cross-check → **no hit**
(`whole(line)=[246]`, `whole(±200)=[]`), while all three rows of §3.3 survive the same cross-check
unchanged. **Published rather than silently dropped**, because a closure that quietly deletes its own
inconvenient rows is not a closure — and because the next seat to run this instrument on a
paragraph-line file will hit the same class.

### 3.5 PASS 2

With the **§7 annex** in the citation operand, direction B re-runs to **∅**: the 89-band's two escapes
and the F.W5 roster's one are homed with their canonical holders and their dispositions, and nothing
else in either roster is named outside CITE. **Difference: ∅.**

---

## §4 DIRECTION A — the citations, differenced against the canonical

*(the fabrication direction: does anything this file cites resolve to no canonical row? the `C-28` class)*

### 4.1 §6a's 40 numbered rows — all 40 resolve

Parsed mechanically (⟨cmd⟩ `^\| (\d+) \| (fr-[A-Za-z]+) \*\*(.+?)\*\*` over the §6a span → **40 rows,
numbered 1–40 contiguously, `True`**). A row resolves when at least one member of its composite
identity is a canonical row **at that row's own record**.

| # | resolved canonical pair | canonical holder | band leg | class |
|---|---|---|---|---|
| 1 | `fr-AdminAuditLog` **AA-5** | **F.W5-W8** | — | band-HOMED |
| 2 | `fr-AdminAuditLog` **AA-10** | **F.W4** | F.W5-W8 | band-ROUTED |
| 3 | `fr-AdminAuditLog` **AA-23** | **F.W5** | — | **NOT-BAND** (§4.4) |
| 4 | `fr-AdminFlaggedPanel` **FR-AFP-1** | **F.W5-W8** | — | band-HOMED |
| 5 | `fr-AdminFlaggedPanel` **FR-AFP-7** | **F.W5-W8** | — | band-HOMED |
| 6 | `fr-AdminFlaggedPanel` **FR-AFP-8** | **F.W5-W8** | — | band-HOMED |
| 7 | `fr-AdminFlaggedPanel` **FR-AFP-18** | **F.W5-W8** | — | band-HOMED |
| 8 | `fr-AdminFlaggedPanel` **FR-AFP-32** | **F.W3** | F.W5-W8 | band-ROUTED |
| 9 | `fr-AppHeader` **FR-AH-6** | **F.W4** | F.W5-W8 | band-ROUTED |
| 10 | `fr-BasisCanvas` **C-17** | **F.W5-W8** | — | band-HOMED |
| 11 | `fr-BasisCanvas` **C-18** | **F.W5-W8** | — | band-HOMED |
| 12 | `fr-ContourEditorCanvas` **C-2** | **F.W5-W8** | — | band-HOMED |
| 13 | `fr-ContourPreview` **D:i-3** | **F.W4** | F.W5-W8 | band-ROUTED |
| 14 | `fr-ContourSettings` **M-15** | **F.W3** | F.W5-W8 | band-ROUTED |
| 15 | `fr-ContourSettings` **m-18** | **F.W3** | F.W5-W8 | band-ROUTED |
| 16 | `fr-EasingPicker` **L/M-3** | **F.W4** | F.W5-W8 | band-ROUTED |
| 17 | `fr-EditorControlsDock` **D-12** | **F.W4** | F.W5-W8 | band-ROUTED |
| 18 | `fr-EqCoefficientsPanel` **FR-EQC-8** | **F.W5-W8** | — | band-HOMED |
| 19 | `fr-EquationPanel` **D-10** | **F.W5-W8** | — | band-HOMED |
| 20 | `fr-EquationPanel` **D-L5** | **F.W5-W8** | — | band-HOMED |
| 21 | `fr-EquationView` **B-1** | **F.W5-W8** | — | band-HOMED |
| 22 | `fr-EquationView` **B-2** | **F.W4** | F.W5-W8 | band-ROUTED |
| 23 | `fr-EquationView` **C·D-02** | **F.W4** | F.W5-W8 | band-ROUTED |
| 24 | `fr-EquationView` **M-DV** | **F.W5-W8** | — | band-HOMED |
| 25 | `fr-FunctionInput` **L-B1** | **F.W4** | F.W5-W8 | band-ROUTED |
| 26 | `fr-FunctionInput` **L-M3** | **F.W4** | F.W5-W8 | band-ROUTED |
| 27 | `fr-GalleryCard` **C-1-as-corrected** | **F.W5-W8** | — | band-HOMED |
| 28 | `fr-GalleryCardModal` **GCM-2** | **F.W5-W8** | — | band-HOMED |
| 29 | `fr-GalleryFeaturedCarousel` **FR-GFC-3** | **F.W5-W8** | — | band-HOMED |
| 30 | `fr-GalleryFeaturedCarousel` **FR-GFC-20** | **F.W4** | F.W5-W8 | band-ROUTED |
| 31 | `fr-GalleryMarquee` **GM-M4** | **F.W5-W8** | — | band-HOMED |
| 32 | `fr-GalleryView` **FR-GV-7** | **F.W3** | F.W5-W8 | band-ROUTED |
| 33 | `fr-GalleryView` **FR-GV-34** | **F.W5-W8** | — | band-HOMED |
| 34 | `fr-ImageUpload` **C:C-12** | **F.W5-W8** | — | band-HOMED |
| 35 | `fr-SpeedSelect` **SS-L-07** | **F.W4** | F.W5-W8 | band-ROUTED |
| 36 | `fr-UserSlugBar` **FR-USB-15** | **F.W5-W8** | — | band-HOMED |
| 37 | `fr-ContourSettings` **M-13** | **F.W5-W8** | — | band-HOMED |
| 38 | `fr-ContourSettings` **M-10** | **F.W3** | F.W5-W8 | band-ROUTED |
| 39 | `fr-GalleryCard` **L·M-4** | **F.W3** | F.W5-W8 | band-ROUTED |
| 40 | `fr-GalleryDraftsSection` **m-15** | **F.W5-W8** | — | band-HOMED |

**Tally, derived from the column and not asserted beside it: 22 band-HOMED ⊎ 17 band-ROUTED ⊎ 1
NOT-BAND = 40.** **Zero rows resolve to nothing — direction A is ∅ for §6a at PASS 1.**

### 4.2 The §6a header's two cited-not-rowed ids, and §6's single record-qualified mention

| citation | canonical row | holder | disposition at this run |
|---|---|---|---|
| `fr-ContourPreview` **L:L-5** (§6a header, `:324`) | `:1365` | **F.W5** | resolves; cited to its holder, rowed nowhere, booked nowhere — exactly as the header states |
| `fr-PaperSearchDropdown` **C:C-23** (§6a header, `:324`) | `:4098` | **UNROUTED** <sub>*errata R5 E5-15*</sub> | resolves; the census's own E5-15 disposition stands, and this wave books it not — the posture F-W8 took three times and the census later vindicated |
| `fr-BasisSelector` **m-7** (§6 class row, `:302`) | band roster | **F.W5-W8** | resolves; §6's only record-qualified identity, excluded **by class** with K-3's kill lock as its reason |

⟨cmd⟩ over the §6 span for `fr-[A-Za-z]+` → **one line, `:302`** — §6 excludes by class, as it says it
does, and carries exactly one record-qualified id.

### 4.3 §3's identity cells — every registry identity resolves; the non-registry ids are named

The bold identity tokens of the 28 `banked ids` cells were resolved against the whole canonical (4242
pairs). **Every token that is a registry identity resolves.** The tokens that do **not** are
enumerated here so that "does not resolve" is never read as "fabricated" — each is an operand id from a
named non-registry source, and each is declared as such in its own cell:

| token(s) | source, as the cell itself states it | in the canonical? |
|---|---|---|
| `R-1..R-7` | `formation/fourier/lane-crud.md` §2/§4 (the seam table) | no — lane ids |
| `TA-4` | census §5 risk 3 · lane-crud §0/§2 · INTAKE §3 · F-W5 **G4** | no — a risk/ruling id |
| `C31` | intake `lane-fourier-r3-r6.md:142`; the control is `R4.C31` | no — a control id |
| `R3-7b` · `R3-7c` · `X-3` | INTAKE §3 primary/secondary · `api-gap-remeasure.md` | no — intake/remeasure ids |
| `FN-6` · `FN-5` | `R.W6.md` · `R/PROGRESS.md` · `dispatch-homes.md` (value-side coordination) | no — value-side letter ids |
| `E9` · `E15` · `C1` · `F2` · `D-5` (as a defect id) | **F-W5 CLAUSE** ids and PASS-round defect ids | no — clause/defect ids, never registry rows |
| `REST-41` · `REST-49` · `P5-14` | this sub-tranche's own repair-round minutes | no — conformance ids |

**The distinction is the whole of direction A's content**: a registry identity that resolves to nothing
is a fabrication; a lane, intake, clause or repair id that resolves to nothing is simply not a registry
identity, and the cell that carries it says so.

### 4.4 The one classification residue — §6a row 3, `fr-AdminAuditLog AA-23`

**It resolves** (so direction A stays ∅ as a set difference) **and it is not a band identity**, which
the table it sits in is titled for. Measured whole rather than asserted:

- **Canonical**: ⟨cmd⟩ `sed -n '268p'` → `` | `AA-23` | `worker-2` | `F.W5` | **F.W5** | `` — routing
  `F.W5`, holder **F.W5**, **no band leg**.
- **The identity's own row at the frozen corpus**: ⟨cmd⟩ `sed -n '60p' $R/fr-AdminAuditLog.md` ends
  *"**Binds AA-6's cure set.** **→ F.W5** (the 45/30/13 join must carry this constraint)."* — two
  `F.W5` tokens, no band token.
- **The coordinate §6a row 3 cites (`:142`) is the record's ADJUDICATED verdict paragraph**, and it
  *does* name the band beside this id: ⟨cmd⟩ `sed -n '142p' … | tail -c 420` → *"… **the compound-index
  cure constraint AA-23 that neither axis could see**) to **F.W5–W8**, the F.W2 charter contradiction
  carried, the test seam to **F.W9/W10** …"*.

**So the record says `F.W5` on the identity's row and `F.W5–W8` in its verdict prose, and the canonical
— whose rule 2 takes the routing from the row — homes it at F.W5.** This is the **same class** as
`fr-PaperSearchDropdown C:C-23`, at a different record and in the opposite direction, and it takes the
**same** disposition, for the same reason: **the canonical governs; F.W8 books nothing either way; and
a wave with zero record-side rows may not settle a record-side reading.** The re-grading question, if
there is one, belongs to the census and to F-W5 as the roster's holder. Row 3's *disposition* is
unaffected — the id is **cited** to F-W5 clause **D15** and carried by nothing here — so the annex
records it, and nothing in the §6a table needs to move for this run to close.

### 4.5 `C-28` — the strike holds at these bytes

⟨cmd⟩ `('fr-CanvasControlsDock','C-28') in canonical` → **False**; the canonical's only `C-28` row is
`fr-AnimationControls` at **GLASS-RELAY**. ⟨cmd⟩ numbered §6a rows carrying `C-28` → **none**. The id
lives in §3 **P7** as a **named fold on `D-4`** — exactly as the record carries it in prose — and `D-4`
*is* a canonical row that P7 books as this wave's own assertion row. **REST-41's cure is intact: the
member that direction A's RHS could not contain is no longer on the LHS.**

---

## §5 The R-5 runnability precondition, MEASURED (not asserted)

G15: *"Runnability precondition: every id on both sides is RECORD-QUALIFIED … A set difference over
bare tokens cannot separate booked from escaped and is **not** a run of this gate."* The collision set
the spec names at §5b was re-measured against the canonical at this seat, and every mention of each
token inside CITE sits on a line naming its intended record:

| token | records carrying it in the canonical | qualified at |
|---|---|---|
| `B-1` | 12 | §3 J4 (`fr-ContourSettings`) · §6a 21 (`fr-EquationView`) |
| `B-2` | 11 | §3 P7 (`fr-GalleryDraftsSection`) · §6a 22 (`fr-EquationView`) |
| `C-2` | 11 | §3 D2 (`fr-FourierShapeExtractor`) · §6a 12 (`fr-ContourEditorCanvas`) |
| `C-3` | 8 | §3 P8 (`fr-GalleryInfiniteGrid`) · §3 D2 (`fr-FourierShapeExtractor`) |
| `C-4` | 9 | §3 P8 (`fr-GalleryInfiniteGrid`) · §3 D2 (`fr-FourierShapeExtractor`) |
| `C-17` | 3 | §3 J6 (`fr-CoefficientsPanel`) · §6a 10 (`fr-BasisCanvas`) |
| `C-18` | 5 | §6a 11 (`fr-BasisCanvas`) |
| `D-13` | 9 | §3 P8 (`fr-GalleryInfiniteGrid`) · §6a 39 (`fr-GalleryCard`, full banked spelling) |
| `L-B1` | 3 | §3 D2 (`fr-FourierShapeExtractor`) · §6a 25 (`fr-FunctionInput`) |
| `L-M3` | 5 | §3 D2 (`fr-FourierShapeExtractor`) · §6a 26 (`fr-FunctionInput`) |
| `M-10` | 7 | §3 P8 (`fr-BasisSelector`) · §6a 38 (`fr-ContourSettings`) |
| `M-13` | 5 | §3 J1/J3/R4 (`fr-CoefficientsSpectrum`, `fr-ContourSettings`) · §6a 37 (`fr-ContourSettings`) |
| `m-7` | 7 | §3 J4 (`fr-BasisSelector`) · §6 `:302` (`fr-BasisSelector`) |
| `m-15` | 6 | §3 M4 (`fr-GalleryDraftsSection`) · §6a 40 (`fr-GalleryDraftsSection`) |

**Every one of the fourteen is ≥2 records wide at the canonical** — the collision set is real, it is
wider than the spec's "ninth"/"tenth" narrative had counted at the band alone, and **the precondition
is MET on both sides of this run**. Met is not run; this section is the precondition, §§3–4 are the run.

---

## §6 THE CLOSURE — both passes, stated with their arithmetic visible

| pass | direction A — citations ⟶ canonical | direction B — named canonical rows ⟶ CITE | verdict |
|---|---|---|---|
| **1** | **∅** — 40 of 40 §6a rows, both header citations, §6's one id and every registry identity in §3's cells resolve to a canonical row at their own record | **3 rows** — `FR-AFP-66` · `FR-AFP-33` · `FR-AUL-13`, each named only at §5c (⊕ one instrument false pair, struck at §3.4) | **NON-EMPTY** |
| **2** | **∅** (unchanged; the annex adds citations, never identities) | **∅** — the three are homed at §7 with their canonical holders and dispositions | **∅ IN BOTH DIRECTIONS** |

**The HALT condition — *"a non-empty difference after two closure passes HALTS the wave"* — is NOT
met.** Two passes ran; the second is empty in both directions.

**Why the annex is a cure and not a suppression, stated plainly because the distinction is the only
thing that makes this gate worth running.** An allowlist would say *"ignore these three"*. The annex
says, for each: **this is its canonical row, this is its holder, this is where the file names it, this
is its disposition, and F.W8 books it not** — which is precisely the act §6a performs forty times. The
cure could not land in §6a itself: the spec is a **dated, frozen artifact** (E-3), corrections to it are
**addenda beside**, and G15's own cell instructs that where the run disagrees with the spec *"the run
governs and this cell is amended, not defended"*. This file is that amendment, and it is the only place
the amendment was ever allowed to land.

**No row on either side of either pass is a BOOKING.** F.W8's record-side roster is empty by the
canonical's §4.1, so a booked row here would be a fabrication under R4-10's own word for it; the run
looked for one and found none — including at `C-28`, the one place this file's own history proves the
class can hide.

---

## §7 THE ANNEX — the citations §3/§6/§6a do not carry, homed here

*Dated addendum-beside, 2026-09-19. Each row is a **citation**, never a booking. Each names its
canonical holder, and none asks anything of any wave.*

| # | identity (record-qualified) | canonical holder | where the file names it | STATING / owning home | F.W8's relation |
|---|---|---|---|---|---|
| **A1** | `fr-AdminFlaggedPanel` **FR-AFP-66** | **F.W5-W8** (`:357`) | §5c's `F.W9/W10` row — *"Coverage seams emitted"* | **F.W9/W10** owns the coverage emission; the moderation band's clause is **F-W5/F.W6**'s (the orphan-flag test exercises only the reporter-keyed path) | cited as an **emitted seam**; F.W8 authors no test for it and claims no credit for one (FR-GIG-5) |
| **A2** | `fr-AdminFlaggedPanel` **FR-AFP-33** | **F.W5-W8** (`:366`) <sub>legs: F.W1/W3, SS-13</sub> | §5c's `SS-13` row — *"FR-AFP-33's aggregate cost"* | **SS-13** (magnitude only) | cited as a **magnitude deferral**; *"no F.W8 gate is discharged by an SS-13 probe"*, and none was |
| **A3** | `fr-AdminUserList` **FR-AUL-13** | **F.W5** (`:427`) | §5c's `F.W9/W10` row — *"a contract document without a probe REPEATS the defect that row convicts"* | **F-W5** (the keystone holds the row) | cited as an **adopted method bar**, not as work: it is the standard this wave's artefacts were written to, and the bar is the reason the walk script exists at all rather than a paragraph promising one |
| **A4** | `fr-AdminAuditLog` **AA-23** | **F.W5** (`:268`) — *no band leg* | §6a **row 3** (already rowed; recorded here for the classification, not for the citation) | **F-W5 clause D15** | cited, booked nowhere. **Classification minute**: the record routes `F.W5` on the identity's own row and `F.W5–W8` in its verdict prose; the canonical governs and homes it **F.W5**. Same class as `C:C-23`, same disposition, same refusal to re-grade from a wave with zero record-side rows |

**A5 — the struck candidate, recorded so it is not re-found**: `fr-ConvergencePlot` **R6-8** is **not**
annexed. It entered PASS 1 through line-scoped co-occurrence inside G15's own cell, where the quoted
canonical output carries `fr-ContourPreview`'s `R6-8` and an unrelated errata note carries
`fr-ConvergencePlot`. The ±200-character cross-check returns nothing. **A false pair is struck, not
homed** — homing it would have manufactured a citation the file never made.

---

## §8 Gate reading — **G15**, BEFORE → AFTER

| | |
|---|---|
| **BEFORE** (record §B.2) | **RED** — `F-W8/carry-closure.md` ABSENT; *"the difference is **unrun**"* |
| **AFTER** | **CLOSED FOR F.W8.** The difference is **RUN**, over the frozen canonical's §2 rosters alone, on record-qualified pairs, in **both** directions, across **two** passes; the output is this file and it is committed. **∅ in both directions at PASS 2.** Zero bookings on either side; the `C-28` strike verified intact; the R-5 precondition measured MET; two findings (§3.4's instrument false pair, §4.4's classification residue) published with their receipts rather than absorbed |
| **split verdict** | **GREEN for the act this gate assigns F.W8** — G15's clears-when is *"set-difference ∅ in BOTH directions … Output committed to `F-W8/carry-closure.md`"*, and both limbs are discharged by this seat's own measurement. **It is not a product claim and cannot be**: nothing here asserts a fourier byte, a fixture run, or a canonical re-grading. The two re-grading questions this run touched (`C:C-23`, and now `AA-23`) are routed to the **census** and **F-W5**, which hold the roster |

---

## §9 Self-count — read from the settled bytes, double-run (SELF-COUNT law)

- ⟨cmd⟩ `grep -c '^## §' carry-closure.md` → **11** sections (§0–§10). ▲ Written as **10** in this
  seat's first pass and corrected at the bytes before the commit: the draft counted §0–§9 and forgot
  that §10 is a section too. A self-count that is not re-read from the settled file is a guess wearing
  a receipt's clothes, which is the one thing this whole sub-tranche exists to stop.
- ⟨cmd⟩ `grep -cE '^\| [0-9]+ \| \`fr-' carry-closure.md` → **40** §4.1 resolution rows.
- ⟨cmd⟩ `grep -cE '^\| \*\*D1-[abc]\*\*' carry-closure.md` → **3** PASS-1 residue rows; ⟨cmd⟩
  `grep -cE '^\| \*\*A[1-4]\*\*' carry-closure.md` → **4** annex rows. **Two probes, two claims** — one
  probe over an alternation would print `7` and answer neither question on its own.
- ⟨cmd⟩ `grep -c '[0-9]%' carry-closure.md` → **0** — **X-9**: no percentage and no coverage rate is
  published here, before or after any member-scope law.
- Operand pins re-read at close: canonical `f44362757458` · spec **374** lines · spans `163-221` /
  `286-319` / `320-374`.

## §10 What this file hands on

1. **To the census and F-W5 (the roster's holder)**: `fr-AdminAuditLog` **AA-23** — a second instance of
   the *verdict-prose routes the band / the identity's row routes the wave* divergence that E5-15
   settled for `C:C-23`. **Routed, not settled here.** No figure of the canonical moves on this wave's
   say-so.
2. **To F.W9/W10**: **A1** (`FR-AFP-66`) is an emitted coverage seam with no test; **A3**
   (`FR-AUL-13`)'s bar — *a contract document without a probe repeats the defect it convicts* — is the
   standard the run of `walk/union-walk.mjs` is measured against.
3. **To SS-13**: **A2** (`FR-AFP-33`), magnitude only. No gate of this wave is discharged by it.
4. **To any later seat re-running this gate**: the instrument is at §2, the operands are pinned at §1,
   and both directions re-run from the frozen bytes in one pass of a script. **If a re-run disagrees
   with this file, the re-run governs and this file is amended beside — not defended.**
