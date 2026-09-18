# F-W5-CHECK — FRESH ADVERSARIAL SPEC CHECK (L-18/L-20, PASS 2)

**Subject**: `/Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W5.md` (299 lines, 112,663 bytes, mtime 2026-08-28 13:40)
**Corpus authority**: the 66 `fr-*.md` at `/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/registry/adjudicated/` (`ls fr-*.md | wc -l` → **66**, re-counted by this seat) + the ONLY two in-tree carries `X/fourier/carry/F-W1-CARRY.md` (F.W1) and `X/fourier/carry/F-W4-CARRY.md` (F.W4) (`ls X/fourier/carry/` → exactly those two).
**Seat**: FRESH — the PASS-1 register and `PASS-1/RULINGS.md` were read for *what was ordered*, never for *what was found*. Every number below is this seat's own measurement. This file is the seat's only writable path; nothing else was written and `$F` was never opened.
**Detector (CENSUS DETECTOR LAW, R-6)**: `F\.W5(?![0-9])` over all 66 records, matching **BOTH** `F.W5-W8` (U+002D) and `F.W5–W8` (U+2013), then S-8 walk-back to the enclosing roster row (bullet `- **ID …**`, bold table row `| **ID** |`, or bare-first-cell table row), then set-difference by BYTES against `F-W5.md`.

**VERDICT: DEFECTIVE** — narrowly, and on a different axis than pass 1.
**routedTotal = 167 · booked = 167 · escaped = 0 · defects = 6 (0 BLOCKER · 3 MAJOR · 3 MINOR)**

---

## 0. Headline

**The census axis is CLEAN and the invention axis is CLEAN.** I re-derived the roster from the records rather than inheriting PASS-1's, and every id-keyed routing lands: **zero escapes, zero silent drops, zero invented ids.** Both of pass 1's disqualifying defects are cured at the bytes (the `P-8` quotation is gone; every "128 CARRY" reference is gone and G19 is re-based on an operand that exists). All seven of pass 1's surgical defects are cured too.

What convicts at pass 2 is **authority reality** — axis (2) — and specifically the block that *polices* authority reality:

1. The ▲ **G-11/G-12 QUOTATION** block at `:261` carries **three coordinates that do not resolve**. It copied R-9.1's line numbers into a repaired `F-W0.md` without re-measuring, which `RULINGS.md`'s own binding-force clause forbids.
2. A negative-existence claim at `:54` is contradicted by the file asserting it.
3. The wave's most binding cross-cutting constraint — **"no clause may contradict ruling D9"**, invoked five times — carries **no coordinate anywhere in the file**, inside a spec whose §0 adopts R-10.5's "unrooted spellings are forbidden vocabulary" wave-locally.

None of the three is a fabrication. All three are drift, and the pass-2 standard as set is that a drifted citation convicts.

---

## 1. ID-KEYED CENSUS — routedTotal = 167, booked = 167, escaped = 0

### 1.1 Detector reproduction (R-6 band probe, this seat's own run)

```
grep -rho 'F\.W5-W8' fr-*.md | wc -l   → 120      grep -rl 'F\.W5-W8' fr-*.md | wc -l   → 26
grep -rho 'F\.W5–W8' fr-*.md | wc -l   →  72      grep -rl 'F\.W5–W8' fr-*.md | wc -l   → 24
union records → 49        en-dash-ONLY records → 23
```

**The spec's BAND-PROBE LAW block (`:82`) reproduces to the digit: 192 occurrences / 49 records / 23 en-dash-only.** A hyphen-only census would have been blind to 23 records; this seat ran both spellings and confirms the spec's figure is measured, not inherited.

### 1.2 Roster derivation

The full-file walk returns **240 `F.W5`-bearing lines** in **216 enclosing contexts**. Of those:

| class | n | disposition |
|---|---|---|
| lane-taxonomy / masthead / closing-verdict prose (no enclosing roster row) | 47 | not rows — excluded |
| enclosing roster rows carrying an `F.W5` token in their own cell | 169 | candidate routings |
| — of which **mis-attributions** (the `F.W5` token belongs to an adjacent fold-note, not the row) | **2** | excluded, named below |
| **ROUTED TOTAL** | **167** | |

**The two excluded mis-attributions** (named so the difference from PASS-1's 162 is auditable, not asserted):

- `fr-AnimationControls.md:127` **M-13 (LC)** — the row's own disposition is *"fold-rider on **fr-BasisCanvas D-9/BC-8** … → F.W3/W4 with that row."* The `F.W5–W8` token two lines down (`:129`) belongs to the *reader-misses-folded* paragraph (`BC-9/C-6/D-20 … already banked MAJOR → F.W5–W8`), whose id **is** booked at E8. Not a routing of M-13.
- `fr-CanvasControlsDock.md:100` **M-10 (banked; reader-LC)** — disposition **NO-WAVE-OWNER**. The token at `:102` belongs to the *Full-coverage note* (`C-28 into D-4's F.W5–W8 rider`), whose C-28 fold **is** booked at E5.

### 1.3 Set-difference result

Every one of the 167 was tested against `F-W5.md` **by bytes**, in the record-qualified form where the token collides (U-12's eight: `M-13 · L-B1 · L-M3 · C-17 · C-18 · B-1 · B-2 · C-2`).

**ABSENT: 0.** **ESCAPED: 0.** **§2 of this file is empty by measurement, not by charity.**

Per-record landing (record → count routed → all booked):

| record | n | lands |
|---|---|---|
| AdminAuditLog | 7 | AA-5 D16 · AA-6 D15 · AA-10 E18 · AA-21 D15 · AA-23 D15 · AA-31 B1 · AA-32 D15 |
| AdminFlaggedPanel | 13 | FR-AFP-1 D3 · -4 C2 · -7 D4 · -8 D5 · -9 D6 · -10 D8 · -18 A2 · -32 D17 · -33 D7 · -36 A4 · -66 D6 · -70 D8 · -71 A4⊙ |
| AdminUserList | 11 | FR-AUL-3 B1 · -11/-12/-13 B3 · -14 D13 · -20/-25 D11 · -21/-31 D12 · -46 D7 · -59 D15 |
| AnimationControls | 2 | C-30 B1 (`:123` verbatim) · R6-8 CARRY B1 |
| App | 1 | `:144` **"Nothing routes → F.W5–W8"** — carried as a zero-cell in §4's F.W2 export ("App API-inert") |
| AppHeader | 1 | FR-AH-6 C3 |
| BasisCanvas | 6 | BC-9 E8 · C-5 B1 · C-7 E9 · M-β4 E10 · C-17/C-18 E15 |
| BasisSelector | 3 | M-9 ⊙ D12 · M-14 E14 · m-7 D7 (K-3 KILL LOCK carried) |
| CanvasControlsDock | 2 | D-4 E5 (verbatim) · R6-8 CARRY E5 |
| CoefficientsPanel | 1 | FR-CP-16 A3 |
| CoefficientsSpectrum | 1 | M-13 A5 (qualified) |
| ContourEditorCanvas | 1 | C-2 E17 (qualified) |
| ContourPreview | 3 | row 11 §4 · row 13 E20 · row 28 A3 |
| ContourSettings | 7 | B-1 D7 · B-4 E13 · M-10 D12 · M-13 E14 · M-15 F5 · m-18 E13 · i-7 E13 |
| ConvergenceLegend | 3 | D-L4 ×2 B1 · R5-7 `:161` keeps its **F.W4** carry (correctly not F.W5-booked) |
| ConvergencePlot | 5 | L-M7 F7 · C-7 B2 · L-m13 F6 · K-13 F2/F7 · R6-8 B2 |
| EasingCurvePreview | 3 | RESOLVER E11 · AC L-11/M-10 fold E11 · R6-8 E11 |
| EasingPicker | 2 | L/M-3 E11 · MISSED-E E12 |
| EditorControlsDock | 3 | D-12 C1 · C-6/C-7 C1 · C-6→R3-7b C1 |
| EqCoefficientsPanel | 1 | FR-EQC-8 A5 |
| EquationModeToggle | 2 | FR-EMT-1 F1 · FR-EMT-20 E10 |
| EquationResult | 2 | FR-EQR-4 F8 · FR-EQR-32 B1/F8 |
| EquationView | 7 | B-1 F1 · B-2 F2 · C·D-02 F5 · M-CK B1/F1 · L·m-6 E10 · M-SB F3 · M-DV F4 — **all record-qualified per R-2a/A-β** |
| FourierShapeExtractor | 18 | L-B1 G1c · L-B2/C-2 G2c · L-M1 G3c · C-3 G3c · C-4 G4c · L-M3/C-6 G5c · L-M5/C-5 G6c · C-7 G7c · L-B3 G2c · L-M2 G8c · L-m3 G10c · L-m5 G10c · M-7 G9c · M-8 G3c · M-9 G9c · M-11 G8c · C-14 G4c · C-15 A3/G6c |
| FrequencyGraph | 3 | FR-FG-13 A3 · FR-FG-21 D7 · `:70` C-8/L-m4 → FR-CP-16 (A3) |
| FunctionInput | 4 | L-B1 F2 · L-M3 F6 · C-8 F2 · N-4 F3 — all record-qualified |
| GalleryAdminBanner | 4 | GAB-12 §4/D11 · GAB-15/-16/-17 D11 |
| GalleryCard | 3 | C-1-as-corrected D2 · D-7 E4 · L·M-4 D17 |
| GalleryCardModal | 5 | GCM-1 E4 · GCM-2 D2 · GCM-10 A3 · GCM-52 C1/C2 · GCM-55 A3 |
| GalleryDraftsSection | 4 | B-2 E5 · F-4 C1/C2 · **F-6 D1 (pass-1 escape, now booked)** · m-15 C2 |
| GalleryFeaturedCarousel | 4 | FR-GFC-1 D10 · -3 D2 · -4 D10 · -20 D8 |
| GalleryInfiniteGrid | 3 | R-7 (ruling row; substance = FR-GFC-1/-4, both booked) · C-3 D2 ("GIG C-3") · C-4/D-13 D10 ("GIG C-4/D-13") |
| GalleryMarquee | 1 | GM-M4 B4 |
| GallerySearchBar | 3 | C-2 WAVE-LOCK D10 (verbatim) · FR-GSB-1 D10 · FR-GSB-28 B1 |
| GalleryView | 9 | FR-GV-1 E5 · -7 A6/C3 · -8 D1 · -9 D8 · -12 E6 · -13 D10 · -24 E6 · -27 D1/E6 · -34 D6 |
| HarmonicLevelGrid | 1 | HLG-23 B5 |
| ImageUpload | 1 | row 26 → split B1 / C2 / E15 |
| InfoCard | 1 | FR-IC-6 A3 |
| MobileFloatingToc | 1 | `:97` **"F.W5–W8 gets nothing"** — carried in §4's F.W2 negative roster |
| MorphShapePreview | 1 | C §3 negatives B5 (verbatim, incl. *"no F.W5-W8 row manufactures overlap"*) |
| NotationPills | 1 | FR-NP-30 residual band → **FR-NP-30b** A5/D12 (routing block `:130` reads *"**F.W5** (FR-NP-30b via R6-8)"* — a real limb id, not an invention) |
| PaperSearchDropdown | 1 | `:77` FOLDS → banked fr-PaperSearch C-Z1/C-Z2; carried in §4's negative roster |
| PathPreview | 1 | PP-DEADSEAM B4 |
| SliderControl | 1 | R-16 D7 ("R-16 FOLDS") |
| SpeedSelect | 5 | SS-C-1 booking-ruling E7 · SS-C-1 write leg E7 · SS-C-2 E8 · **SS-L-07/SS-C-10 §5 (pass-1 escapes ×2, now booked)** · SS-C-1 read leg E7 (folds to GCM-1) |
| UserSlugBar | 3 | FR-USB-15 C3 · FR-USB-23 ⊙ C3 · FR-USB-24 C4 |
| VisualizationView | 4 | BLK-1 E4 · VV-R2-A E6 · VV-R2-B D14 · D-14/MIN-cluster E19 |
| **TOTAL** | **167** | **167 booked · 0 escaped** |

**Records contributing ZERO routings (19 of 66)** — correctly absent, no clause claims a row from any of them: CanvasOverlayButton · CollapsibleSection · ConvergenceTimeline · DarkModeToggle · EquationPanel · ExportModal · FourierMorphDemo · FourierMorphSvg · FullscreenViewer · GlassTimeline · MorphPhaseConfig · PaperArticleWindow · PaperSearch · PaperSearchInput · PaperSearchModal · PaperSidebar · PaperView · SvgFilters · Tooltip. (Several of these *are* cited by F-W5 for their **locks** — PSM/PAW/MPC/FR-MSP at `:264` — which is a lock carry, not a row claim, and is correct.)

---

## 2. ESCAPES

**NONE.** The set-difference `{167 routed ids} \ {F-W5.md bytes}` is **∅**.

Pass 1's three escapes are all closed at the bytes:
- **`F-6`** (`fr-GalleryDraftsSection.md:49`) — now at **D1**, quoted verbatim (*"the template-`src`-binding operation edge is structurally invisible to a function-keyed operation↔client model (the R5-7 dual)"*), beside COUNTING LOCK K-1, with the record's INFO/NO-WAVE-OWNER severity preserved and no repair credited. R-2a discharged.
- **`SS-L-07` / `SS-C-10`** (`fr-SpeedSelect.md:59`) — now at **§5** with both ids named, the routing cell quoted verbatim (record's last cell reads exactly `**F.W4** (+ its type reaches the F.W5-W8 wire rows)` — this seat printed the cell), home F.W4, F.W5's share narrowed to the type-reach under D12/E11, FR-GIG-5 bar honoured. R-2a discharged.

---

## 3. DEFECT REGISTER

### D-1 · MAJOR — the anchor-discipline block is itself mis-anchored (three coordinates that do not resolve)

`F-W5.md:261` (§4, edge **X-1 · F.W0 → F.W5**):

> ▲ **G-11/G-12 QUOTATION (R-9.1)**: this spec's anchor and denominator cells are **input to / quotation of F.W0's G-11 anchor table (`F-W0.md:199`) and G-12 denominator table (`F-W0.md:204`), published in `SUBSTRATE-LEDGER.md` (`F-W0.md:63`)**

**Receipts (this seat's reads of the live `F-W0.md`):**

| cited | actual bytes at that line | true home |
|---|---|---|
| `F-W0.md:199` — "G-11 anchor table" | **empty line** | `F-W0.md:211` — `### G-11 — ONE corrected anchor table published; every later wave quotes it` |
| `F-W0.md:204` — "G-12 denominator table" | `**Owning rows**: 18, 17, 19.` | `F-W0.md:216` — `### G-12 — ONE corrected-denominator table published; superseded figures FORBIDDEN downstream` |
| `F-W0.md:63` — `SUBSTRATE-LEDGER.md` | <code>&#124; `fourier/CLAUDE.md` &#124; **create** — measured ABSENT 2026-08-28 &#124;</code> | `F-W0.md:65` — the `fourier/docs/tranches/F/SUBSTRATE-LEDGER.md` bounds row |

The numbers are R-9.1's, copied unmeasured into a repaired `F-W0.md`. `PASS-1/RULINGS.md`'s binding-force clause is explicit: *"a repair seat that finds a ruling's coordinate stale re-measures and applies the ruling's LAW to the live bytes."* Three coordinates in one ▲ block were not re-measured — and the block's whole subject is that divergence from F.W0's tables *"is a defect against G-11."*

**Aggravating**: F-W5 demonstrably *knows* how to do this right. Twenty lines later, `:266` re-measures F.W7's stale pointer, discloses the drift in the open (*"`F-W7.md:120` anchors E16 at `F-W5.md:153` and G7 at `:226`; **this repair moved both** — cite E16 and G7 by clause and gate id, never by line"*), and this seat confirms the disclosure is exactly right (live E16 = `:161`, live G7 = `:236`). The same seat, in the same section, applied the discipline in one direction and not the other.

**Cure shape**: re-anchor to `F-W0.md:211` / `:216` / `:65`, or — better, consistent with `:266` — cite **by gate id and by path**, never by line.

### D-2 · MAJOR — a negative-existence claim contradicted by the file that asserts it

`F-W5.md:54` (§1a reconciliation note):

> **None of the five exists yet** (`ls $V/docs/tranches/X/fourier/contract/` → *No such file or directory*, re-measured 2026-08-28)

§1a's five content paths are: `waves/F-W5.md` · `contract/J-diff-shape-v2.md` · `contract/operation-register.md` · `contract/OWNER-RULINGS-F.W5.md` · `coordination/value-to-fourier-cosign-J-diff-shape-v2.md`.

**Receipts**:
- `wc -l docs/tranches/X/fourier/waves/F-W5.md` → **298** lines, 112,663 bytes, mtime 2026-08-28 13:40. **It exists — it is the file making the claim**, and §1a marks it `create`.
- The offered `ls` covers **three of the five**. The fifth (the relay letter) is not under `contract/` at all; its real receipt is G20's `ls $V/docs/tranches/X/coordination/` → one file, `ATLAS-TO-VALUE-2026-08-03-RULINGS.md` (verified by this seat).

So one witness is asked to carry a claim it cannot reach, over a set whose first member falsifies the claim outright. The *substance* — the three contract artifacts and the letter do not exist, so sibling cites are prospective — is TRUE and G19/G20/G21 are honestly born-RED on it. The defect is the blanket quantifier and the under-scoped receipt.

**Cure shape**: narrow to "none of the four **to-be-created** artifacts exists yet", and pair the two receipts (`ls contract/` + `ls coordination/`) with the paths each actually covers.

### D-3 · MAJOR — `ruling D9` is binding, invoked five times, and pathless

`D9` is the spec's hardest cross-cutting constraint. It appears at:

- `:86` — *"`D9` is reserved throughout for the **ruled owner decision** (visibility `private|public`; lifecycle `active|trashed`; moderation `clear|withdrawn`), which **no clause may contradict**"*
- `:149` (E4) — *"▲ **No clause may contradict ruling D9**"*
- `:207` (R8) — *"must not contradict **ruling D9**"*
- `:234` (G5) — *"one co-signed born-visibility rule that does not contradict **ruling D9**"*
- `:272` (value.js API row) — *"**D9 reconciliation**: value.js persists 3-state visibility …"*

**Receipt**: `grep -rn 'ruling D9\|D9 ruling' docs/tranches` → the five `F-W5.md` hits and nothing else. **`F-W5.md` contains no path for D9 anywhere.** The content is real — this seat located it at `docs/tranches/V/megatranche/formation/codex-worktree-7e28/VALUE-FORMATION-PACKET-2026-07-29.md:55-58`: *"Product authority: `DECISIONS.md` D9 is binding. Value visibility is `private | public`; lifecycle is `active | trashed`; moderation is `clear | withdrawn`."* — byte-exact against the spec's parenthetical.

This convicts under the spec's **own** adopted law. `F-W5.md:26` (§0 AUDITED cell): *"all four `ls`-resolve; **unrooted spellings are forbidden vocabulary** (R-10.5's law, adopted wave-locally)."* R-3.3 states the same principle in the general: *"'The CARRY' with no path is forbidden vocabulary from this ruling forward."* A wave that roots four authorities and then binds every clause in the file to a fifth with no coordinate has applied its own law unevenly — and D9's home is a **Codex-worktree formation packet**, exactly the provenance class this program has been re-rooting all round.

**Same class, lesser weight**: `inv-16`/`inv-26` at A4 (*"the standing law v1 §1 asserts"*) and at the F.W9/W10 edge (*"never the sibling (inv-26)"*) are also pathless. `inv-16` resolves in `formation/fourier/lane-crud.md:19`; **`inv-26` resolves in NO megatranche file** — its only in-repo homes are `docs/tranches/R/audit/pass1/R4-FOURIER.md:169/:207/:319` and the read-only fourier invariant ledger. Cite `lane-crud` for inv-16 and give inv-26 its real coordinate or drop the id.

### D-4 · MINOR — §2c's closure tally is not reproducible; §2c and §5 contradict each other

`:216` (§2c): *"**162 of 162 land** — 158 homed in §2's clause tables … and **4 carried by citation** …: AA-48 · P-9 · AA-44 · SS-L-07 / SS-C-10."*

**Receipts**:
- **`P-9` is not in the 162.** §5's own row concedes it: *"**A carry-ledger id, not a registry id** — it occurs in none of the 66 records, which is why its denominator is stated separately from the 162-row census (§2c) rather than folded into it."* §2c folds it in anyway. The two sections say opposite things about the same id.
- **`AA-44` is not routed to F.W5.** `fr-AdminAuditLog.md:87` ends *"→ **F.W9/W10**."* — this seat's read. Its correct place is §5 (which is where it sits) and §4's F.W9/W10 edge (where it also sits) — but not inside a 162-denominator of F.W5 routings.
- **`SS-L-07 / SS-C-10` is one row and two ids** under a denominator the spec itself calls *"162 **id-keyed** routings"*.

So `158 + 4` reaches 162 only by mixing row-counts and id-counts and admitting two non-routed ids. Held at MINOR because the spec pre-emptively de-weights it — `:218` *"This tally is an AUTHORING SELF-REPORT, not the gate"* and G19 (`:248`) *"§2c's 162/162 is an authoring self-report, never the gate"* — and because **the real closure is CLEAN** (this seat's independent 167/167/0).

### D-5 · MINOR — the masthead's count word contradicts its own enumeration

`:7`: *"**Two tail rows** rest on paths that exist and were re-read at the bytes: `…/fr-FourierShapeExtractor.md:81-87` · `…/fr-AdminAuditLog.md:87-91` · `…/carry/F-W4-CARRY.md:18` (P-9) and `:234` (SS-L-07 / SS-C-10)."*

**Receipts**: four coordinates are enumerated, not two — and **all four resolve** (this seat read each): `FSE:81-87` = L-m3 / L-m5 / M-7 / M-8 / M-9, every one of which is homed in a §G *clause* row (G10c/G9c/G3c), not a "tail row"; `AdminAuditLog:87-91` = AA-44/45/46/47/48; `F-W4-CARRY.md:18` does contain *"Zero-cells are EXPORTED from F.W5 (P-9), copied into F.W2's and F.W4's denominators, one home two citations"*; `F-W4-CARRY.md:234` does contain *"Its type reaches the F.W5–W8 wire rows."* Facts good, count word and label wrong.

### D-6 · MINOR — "verbatim" quotations are up-cased against the record bytes

Five ▲ locks present emphasis-capitalised text inside verbatim markers where the source is lower-case (this seat diffed each at its cited line):

| clause | spec renders | record bytes |
|---|---|---|
| D7 | *"the contract seam owes **CLIENT-DERIVABLE BOUNDS**"* | `fr-ContourSettings.md:40` — "the contract seam owes client-derivable bounds" |
| E5 | *"register a **TWO-SIDED DELTA** until that join is split"* | `fr-CanvasControlsDock.md:45` — "register a two-sided delta until that join is split" |
| E13 | *"must be a **SUPERSET** of the request fields the operation consumes"* | `fr-ContourSettings.md:43` — "must be a superset of the request fields the operation consumes" |
| D15 | *"converts an indexed equality into a **COLLECTION SCAN**"* | `fr-AdminAuditLog.md:60` — "converts an indexed equality into a collection scan" |
| D2 | *"**NO THIRD OPTION SHIPS** (C §7.1, verbatim)"* | `fr-GalleryFeaturedCarousel.md:34` — "no third option ships" |

Word-for-word identical modulo case, and the up-casing idiom is corpus-wide. Recorded, not disqualifying — but a lock marked *verbatim* should survive a `grep -F` of its own sentence, and these do not.

---

## 4. WHAT PASSES — recorded at the bytes so the repair does not over-cut

### 4.1 Pass-1's two disqualifiers: BOTH CURED

- **P-8 (R-1c)** — `grep -nE '(^|[^A-Za-z0-9-])P-8([^0-9A-Za-z-]|$)' F-W5.md` → **0 hits**. `grep -rn 'identity-less envelope' docs/tranches/` → three hits, all inside `PASS-1/F-W5-CHECK.md` and `PASS-1/RULINGS.md` (the conviction and the cure); **zero in `F-W5.md`**. A1 now stands on AA-45 (`fr-AdminAuditLog.md:88` — read: *"The positional `:key` is forced by the contract … Latent contract gap. **NO-WAVE-OWNER**"*) and AA-48 (`:91`), both real.
- **The phantom carry (R-3)** — `grep -n '128' F-W5.md` → zero "128 CARRY" references survive. `:7` states the negative in the open (*"there is no `F-W5-CARRY.md`, and none is authored here"*), `:9` demotes the old self-reports to a historical note with no gate weight, and G19 (`:248`) re-bases on an operand that exists: the PASS-1 census §1 (path-cited) ⊕ the registry ⊕ two real `F-W4-CARRY.md` rows. `:218` and `:292` both restate R-3.2 (*"No `F-W5-CARRY.md` is authored"*). `ls X/fourier/carry/` → exactly `F-W1-CARRY.md`, `F-W4-CARRY.md`.

### 4.2 Pass-1's seven surgical defects: ALL CURED

D-3 (gate self-contradiction) → `:11` narrows to *"writes, builds, or runs"* and `:226` states the reads-are-how-a-born-RED-witness-exists reasoning explicitly · D-4 (F-6) → D1 · D-5 (FR-NP-32) → `:261` in canonical cite-both form *"`FR-NP-32` (≡ `fr-PaperSidebar M1`)"*, verified against `fr-NotationPills.md:35` (BLOCKER, *"F.W1 SEQUENCING GATE"*, reproduced with the app's own toolchain) · D-6 (F.W1 atomicity) → `:262` carries R-4b's **exact** replacement text and restates nothing · D-7 (axis ids) → `:264` now names **PSM-1** (`:34`), **PSM-4** (`:37`), **PSM-13** (`:49`) with the record's own `:140` verdict cited; all four coordinates read true · D-8 (SS-L-07/SS-C-10) → §5 · D-9 (P-9 denominator) → §5 states the separation (though §2c still contradicts it — see D-4).

### 4.3 Axis (3) — NO INVENTION / M-25 depth: CLEAN

- **Automated sweep**: 131 distinct prefixed ids extracted from `F-W5.md` (`FR-*`, `AA-*`, `GAB-*`, `GCM-*`, `GM-*`, `HLG-*`, `PP-*`, `VV-*`, `BLK-*`, `SS-*`, `PSM-*`, `PAW-*`, `MPC-*`, `BC-*`, `MISS-*`, `CP-*`, `FM*`, `IU-*`, `RB-*`, `LF-*`, `INFO-*`) differenced against the 66 records ⊕ both carries ⊕ `lane-crud.md` ⊕ `INTAKE-ADJUDICATION-2026-08-03.md` ⊕ `api-gap-remeasure.md` ⊕ `X/COHESION.md`. **Not resolving: 0.**
- **Intake/lane symbols** each resolve: `F-α`/`F-β`/`F-γ`/`V-β`/`V-γ`/`R-4`/`R-5`/`R-6`/`R-7`/`TA-4`/`inv-16` in `lane-crud.md`; `R3-7b`/`R3-7c`/`X-2`/`X-3`/`X-8` in `INTAKE-ADJUDICATION-2026-08-03.md`; G20's *"cross-repo edges are declared FROM BOTH ENDS in the spec files"* in `X/COHESION.md`. (`inv-26` and `D9` are the two exceptions — D-3.)
- **Locks carried where their rows land**, each verified at its coordinate: **FR-NP-32 by id** (`:261`, with M1 beside it) · **PAW-44/LAW-3** (`fr-PaperArticleWindow.md:220` — *"LAW-3: PAW-44 restoration lands WITH-or-AFTER PAW-1 + PAW-30, never before"*) · **MPC-31** (`fr-MorphPhaseConfig.md:17`, "one cut") · **FR-MSP-6** two-channel (`fr-MorphShapePreview.md:16`) · **PSM-1 ⊕ PSM-4 ⊕ PSM-13** same-commit riders (`:34/:37/:49/:140`) · **M-CK** *"fix the key FIRST or the B-1 repair ships broken"* — `grep -F` at `fr-EquationView.md:71` returns **TRUE at the line**, byte-exact · **fr-BasisSelector M-9** *"admit `[]` in the contract, or stop minting it"* — byte-exact at `:58` · **DO-NOT-REGENERATE tripwire** at `fr-FourierShapeExtractor.md:51` · **K-3 KILL LOCK** (D7) · **AA-23 CURE LOCK** with the three cures in the record's stated order (D15) · **S-8 METHOD LAW** (D16) · **K12 PROBE-SUPPRESSION** (E5, with the matching *"SS-13 spends NO probe on E5"* at `:271`) · **ONE-CONTROLLER LOCK** (C4) · **K-13 CURE BIND** (F2/F7) · **U-12 homonym qualification applied at every collision site** (E14/E17/F2/F6/G9c each name the NOT-record explicitly).
- **F.W3's anti-cures / F.W4's negative roster**: correctly NOT re-booked here — `F-W3.md:240` (§C.J, the four named anti-cures) and `F-W4.md:28` / `F-W4-CARRY.md:22` (§0a NEGATIVE ROSTER) own them; F-W5's own negative export at `:263` is the **P-9 zero-cell roster**, whose content matches `F-W4-CARRY.md:18` item-for-item (App · MobileFloatingToc · CollapsibleSection · PaperSearch/Input/Dropdown · MorphShapePreview · CanvasControlsDock/AnimationControls), correctly labelled *"evidence never a denominator."*

### 4.4 Axis (4) — GATES born-RED with real witnesses: CLEAN

22 gate rows (`grep -cE '^\| \*\*G[0-9]+\*\*'` → **22**, `G1`…`G22` contiguous), matching the "22" claimed at `:22` and `:222`. Four ⊙ (G4/G7/G10/G11), matching the claim. **Every value-side witness re-run by this seat; all TRUE:**

| gate | command | this seat's result |
|---|---|---|
| **G2** (V-β) | `grep -n computeContentHash api/src/modules/palette/hash.ts` | `:8 export function computeContentHash(name: string, colors: PaletteColor[]): string` — folds `{name, colors}` only ✓ |
| **G2** | `grep -n 'findByHash\|insertIfAbsent' …/repository/paletteVersion.ts` | `:13 findByHash(hash: string, session?…)` — no slug scope · `:39 async insertIfAbsent(` ✓ |
| **G4 ⊙** (TA-4) | `ls api/src/lib` | *No such file or directory* ✓ |
| **G4 ⊙** | `grep -rn "atomdiff\|atomDiff" api/src src` | exactly **ONE** hit — `__tests__/palettes-forks.test.ts:9`, naming TA-4 as the excision ✓ |
| **G5** | `sed -n 76p …/service/forks.ts` | `        visibility: "public",` ✓ |
| **D9 recon** | `sed -n 61p …/palette/model.ts` | `/** I.W1 canonical visibility (3-state): \`public\`/\`unlisted\`/\`private\`. */` ✓ |
| **G11 / D3** | value.js "HAS the verb" | `api/src/modules/palette/routes/flags.ts:4` — `POST /:slug/flag`, registered at `routes/index.ts:38` ✓ |
| **G19 / G21** | `ls docs/tranches/X/fourier/contract/` | *No such file or directory* ✓ — born-RED because the **RHS** is empty, as the gate itself states |
| **G20** | `ls docs/tranches/X/coordination/` | exactly one file, `ATLAS-TO-VALUE-2026-08-03-RULINGS.md` ✓ |
| **G22** | `grep -rn "MF-9" registry/adjudicated/` | exactly **ONE** hit — `fr-GalleryCardModal.md:56`, the dangling citation itself ✓ |
| **G7 ⊙** | the R-4 six-term probe | result is **banked**, not re-measured: `lane-crud.md:226-230` carries the command and *"Zero true hits on either side"* ✓ — consistent with `:226`'s claim that this file never opens `$F` |

Fourier-side gates (G1/G3/G6/G8–G18) are each declared **MEASURE-AT-OPEN under D-19** at `:226` and `:261` — honest, not a phantom-witness dodge. `$F` resolves (`ls -d /Users/mkbabb/Programming/fourier-analysis` → present) and is named READ-ONLY at `:11`, `:58`, `:224`. **No command anywhere in the file mutates a byte in either tree** (all `ls`/`grep`/`sed`).

**L-19 (proof-script contrivance)** — CLEAN. §1a owns five `.md` files plus one append-only INBOX row. No script, no `proof:` target, no generated oracle. G21's cure is a document.

### 4.5 Axis (5) — ATOMICITY + POSTURE: CLEAN

- **F.W1's 11-limb transaction cited, never restated** — `:262` carries R-4b's exact sentence: *"the ELEVEN-limb roster chartered at `F-W1.md:276`, incl. the FR-EQC-7 vaul-vue manifest gate INSIDE per `:294` — cited whole, never restated here."* Verified: `F-W1.md:276` charters the transaction and closes *"The roster is ELEVEN limbs and stays eleven — it is the extent every sibling spec cites (R-4b)"*; `F-W1.md:294` pins *"FR-EQC-7's vaul-vue gate lands INSIDE the F.W1 transaction, not before."* Both true at the bytes. The pass-1 three-limb recital is gone.
- **F.W0 pre-gates honored** — `:20` opens-after F.W0; `:261` X-1 HARD; every fourier anchor MEASURE-AT-OPEN pending F.W0's re-grounding (D-19), with GAB-13's uncommitted-bytes caveat carried.
- **SS-4 owner flags INLINE** — §2a tables **R1–R9** with an honest default and the cost of the other branch for each; R1 and R3 and R4 and R5 correctly record *"none may be assumed"*. §4's SS-4 edge names the TA-4 value-side restoration as PREREQUISITE-or-explicit-re-scope (charter law). §2b preserves nine dissents including both revival-conditioned BLOCKER demotions with the DO-NOT-REGENERATE tripwire attached.
- **fourier tree READ-ONLY** — §1b `$F/**` whole-tree bar; v1 `J-diff-shape.md` marked IMMUTABLE with E-3 (addenda-not-patches); the four evidence authorities marked immutable-beside-the-spec; `scripts/dev/dev.sh` named never-staged.
- **status planned / zero VERIFIED** — `grep -n VERIFIED` → **one** hit, `:29`, reading `| VERIFIED | **NO** |`. `Status: planned` at `:13` and `:298`; §6 headed *"all `planned`"*. No execution verb in the current voice anywhere.
- **Rulings addressed to F-W5 (R-1c · R-2a · R-3 · R-4b · R-5 · R-8 · R-9.1)** — spot-checked all seven. Six discharged faithfully. **R-9.1 is the one that failed** (D-1): the quotation was added, its coordinates were not re-measured.
- **R-5 reciprocal**: `:267` carries the F.W8 edge in R-5's exact prescribed shape (*"F.W5 STATES … F.W8 ASSERTS … ONE home (F.W5), two citations … Reciprocal: `F-W8.md` §5c"*) plus the record-qualification precondition naming the U-12 eight; `:266` carries the F.W7 edge, correctly framed *"F.W7 CITES; F.W5 STATES"* against R-11's ruled `routedTotal = 0`, and re-measures the dissent to `F-W10.md:116` — which this seat confirms **does** carry it (*"the commission's trie-compression collides head-on with the standing anti-tree KISS guardrail in BOTH trees (`atomdiff.py:12-14`) — THE GUARDRAIL IS THE INCUMBENT"*), so the ruling's `:114` is indeed stale by two lines and the re-measurement claim is TRUE.

---

## 5. LOCAL VERDICT

**DEFECTIVE** — on D-1, D-2 and D-3, all three on axis (2) AUTHORITY REALITY, none on the census.

This is a materially different failure from pass 1. The wave's substance is sound and its hardest obligations are met: **167 of 167 routed rows land with zero escapes**, zero invented ids across 131 checked, every cure-shape lock carried at its true coordinate, every value-side gate witness reproducible to the byte, the both-dash band probe reproducing to the digit, and the atomicity/posture/SS-4 axes clean. Three citations point at bytes that are not there, one receipt does not reach the claim it carries, and the file's single most binding constraint has no address.

**Pass-3 entry conditions** (all surgical; none touches a clause):
1. Re-anchor `:261` to `F-W0.md:211` (G-11) / `:216` (G-12) / `:65` (SUBSTRATE-LEDGER), or cite by gate id + path as `:266` already does.
2. Narrow `:54` to the four to-be-created artifacts and pair each receipt with the paths it covers.
3. Give `ruling D9` its coordinate (`formation/codex-worktree-7e28/VALUE-FORMATION-PACKET-2026-07-29.md:55-58` → `DECISIONS.md` D9) at first use; root `inv-16` at `lane-crud.md:19` and give `inv-26` a real coordinate or drop the id.
4. Reconcile §2c with §5 on P-9 and AA-44, or re-denominate §2c to this seat's 167/167/0.
5. Fix `:7`'s count word and drop the "tail rows" label from the two registry ranges.
6. Down-case the five ▲ locks to their record bytes, or drop the word *verbatim* from them.

*Nothing in this file stamps a wave. Read-only throughout; `$F` was never opened; this file is the seat's only write.*
