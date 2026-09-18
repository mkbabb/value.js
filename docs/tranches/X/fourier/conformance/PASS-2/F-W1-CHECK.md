# F-W1-CHECK — PASS 2 · FRESH ADVERSARIAL SPEC CHECK (L-18/L-20)

**Wave**: F.W1 (X·F) · **Spec under trial**: `docs/tranches/X/fourier/waves/F-W1.md` (post-repair-round-1) · **Date**: 2026-08-28 · **Seat**: fresh adversarial checker, pass 2 — re-derived from the corpus, NOT inherited from PASS-1.
**Corpus authority**: the 66 `fr-*.md` at `docs/tranches/V/megatranche/registry/adjudicated/`. **Carries in tree** (verified by `ls`): `carry/F-W1-CARRY.md` + `carry/F-W4-CARRY.md` — the only two; the spec cites only F-W1-CARRY, by path (R-3 conformant).
**Verdict**: **DEFECTIVE** — 11 id-keyed escapes + 2 MAJOR non-escape defects (drifted F.W0 authority coordinates; the ELEVEN-vs-twelve limb arithmetic on the sub-tranche's most-cited coordinate) + one unflagged owner ruling (30 live sites).

## Method (id-keyed, detector law honoured)

1. **CENSUS DETECTOR LAW.** Probe = `F[.·–-]W1(?![0-9])` — **both U+002D and U+2013** — plus the non-canonical `F.W0/W1` spelling. **Measured**: en-dash forms of the W1 routing token occur **0 times** in the 66 records (`grep -rnoE "[–]W1|W1[–]"` → 0); `F·W1` → 0; the only non-canonical spelling is `F.W0/W1` (**2 lines**: `fr-EquationResult.md:62`, `fr-UserSlugBar.md:62`), which a bare `F.W1` probe misses — both are homed at **F.W0** (`F-W0.md` carries `FR-EQR-24` and `FR-USB-22`), so neither escapes.
2. **681 mention lines / 66 records** (679 `F.W1` + 2 `F.W0/W1`); `M.W1a` (the working-tree branch) and `AN.W1` (a producer comment) excluded as non-routing substrings.
3. Routing classification: a line routes when the F.W1 token sits in a **terminal-disposition position** — after `→`/`ADJUDICATED →`, in a table row's **last cell**, or as a bolted disposition clause (`— **F.W1**`, `· **F.W1**`). Routing-law **preambles** (`Routing law:` / `Routes:` / `Dispositions:`) excluded. Each routed line walked back to its **enclosing row id** (S-8 law) and deduped → the id-keyed denominator.
4. Membership tested **by bytes** against `F-W1.md`, then `F-W1-CARRY.md`, then declared FOLD/kill to an identity the spec carries. Escapes hand-adjudicated against **all eleven** wave specs (one-home law, R-2).

## Arithmetic

| quantity | value |
|---|---|
| F.W1 mention lines, 66 records (both dash forms + `F.W0/W1`) | 681 |
| non-row meta / verdict / scope-note lines (excluded from the denominator) | 22 |
| **ROUTED to F.W1, id-keyed and deduped** | **357** |
| booked — id verbatim in `F-W1.md` | 316 |
| booked — id in `F-W1-CARRY.md` under a spec-carried identity (now named at §6·R1) | 5 |
| booked — declared FOLD / kill / negative to a carried identity | 30 |
| **BOOKED total** | **351** |
| **ESCAPED, inside the routed set** | **6** |
| ESCAPED, recovered by hand off meta/mention-classified lines (as PASS-1 did for AA-11 / FR-COB-28) | **5** — `D-M3`(ExportModal) · `M3` · `FR-NP-30` · `§4` bypass · `GM-19` contingency |
| **ESCAPED total** | **11** |

**PASS-1's 15 escapes are CURED.** All fifteen ids are present by bytes in the repaired spec: `D §3 U-3` `:321` · `C-S3` `:320` · `MPC-29` `:319` · `FR-AFP-33` `:347` (cited; F.W3 adopts per R-2c) · `FR-CP-33` `:330` · `i-2` `:331` · `m-6` `:332` · `M-TL` `:316` · `D·D-M3` `:317` · `RB-1` `:315` · `FR-IC-17` `:318` · `i-1` `:333` · `D-14/D-15/D-17` `:322` · `FR-COB-28` `:324` · `AA-11` `:323`. The three F.W1-sequencing riders (`fr-BasisSelector m-6`, `fr-CollapsibleSection m-7`, `FR-NP-6`) are given F.W1 cells at §2·R1c. The 42 elided carry-fold ids are named at §6·R1 and **all 42 coordinates resolve at the bytes** (this seat re-ran every one: 0 mismatches).

## §1 ESCAPES (named by bytes) — 11

| # | record:line | id (banked) | grade | what escaped | receipt |
|---|---|---|---|---|---|
| 1 | `fr-FunctionInput.md:54` | **N-1** | **MAJOR** | *"MAJOR — **F.W1 (uplift semantics)** + F.W3/W4 + NO-WAVE-OWNER rider"*: `variant="default"` meant `bg-primary` at v3.1.0 and means the neutral glass wash at the pin; the ≥7 landing is `emphasis="primary"`. | `grep -c "N-1" F-W1.md F-W1-CARRY.md` → **0 / 0**; absent from all 11 wave specs except `F-W10.md:209`'s *25 loose candidates* (a class-level NO-WAVE-OWNER line for the DESIGN.md limb, not the uplift limb). AA-2's cure map (`F-W1.md:75`) carries `ghost`/`destructive`/`outline`/`size="icon"` arms and **no `default` arm** — while `grep -rn 'variant="default"' web/src` → **4** live sites (this seat, live tree). |
| 2 | `fr-EasingPicker.md:89` | **MISSED-F (LC)** | MINOR | disposition cell reads **`F.W1` (costing correction)** + F.W4 (hygiene): the named-import block is deletable TODAY; the *"5 sites / 6 symbols"* costing double-counts. | `grep -c "MISSED-F"` → **0 / 0**. **`F-W2.md:353` books it as a citation whose home is F.W1** (`fr-EasingPicker MISSED-F ⟳ … home **F.W1** costing + **F.W4** hygiene`) — a partition hole from F.W1's end (R-2 one-home law). §5 kills the "5 sites / 6 symbols" cell but never by this id. |
| 3 | `fr-ExportModal.md:51` | **D-M3** (fr-ExportModal's) | MINOR | *"the 16×16 `opacity-70` ✕ outside every coarse floor; **free at F.W1** (producer 44×44 verified at `558c3fa3`)"* — an F.W1 free-cure row. | The token `D-M3` occurs 4× in the spec and 3× in the CARRY — **every one is the Button-budget `D-M3` of another record** (WU-C, "87 `<Button variant=…>` · 36 `size=icon`"). The ExportModal row is **homonym-shadowed**, unbooked, and unhomed in F-W3/W4/W9/W10 (`grep "D-M3"` → no ExportModal row). This is exactly the collision §6·R1 claims to guard. |
| 4 | `fr-PaperView.md:70` | **C-06** | MINOR | *"`ComputedRef<any>` … six typed contracts vacuous \| **F.W1 rider** + LATEX-RELAY"*. | `grep -c "C-06"` → **0 / 0**. `F-W10.md:227` homes it and `F-W10.md:307` lists **"C-06's `ComputedRef<any>` rider"** among what F.W1 is **REQUIRED** to carry. NWO-5 carries the mechanism ("`ComputedRef<any>` generic fix") **without the id** — the reciprocal cannot be run id-keyed. |
| 5 | `fr-ContourPreview.md:62` | **row 29** | MINOR | *"ADJUDICATED → **F.W1** (pin before the transaction)"* — producer moved 80 commits while both read `version: 7.0.0`; every §7 uplift row needs a pin to the PUBLISHED artifact. | The spec carries this record's rows **15 · 23 · 27 · 30 · 37** and omits **29**; `grep "row 29"` across `waves/` → only `F-W0.md:252` (an unrelated OG-F1 row 29). Substance lives at WU-A/G1; the id lands nowhere. |
| 6 | `fr-PaperSidebar.md:63` | **M3** | MINOR | *"**F.W1 pre-gate law** + SS-3/SS-4 spec input: the one-command discriminator (`grep -c '<class>' components.css glass-ui.css`; 0/0 ∧ absent from `web/src` ⇒ not painting) **goes into the wave spec**."* | The spec's only `M3` occurrence is the parenthetical attribution *"Prediction (M1/M3)"* at G4 (`:250`); **no gate carries the discriminator command**. `F-W10.md:307` lists "M3's pre-gate discriminator" as REQUIRED from F.W1. G5 applies the law in substance to `.btn-pill` — the id-keyed obligation is still unmet. |
| 7 | `fr-BasisCanvas.md:105` | **D-corpus-C-1** | INFO | *"`cartoon-surface` survives the 4→7 uplift … the shim is a design ask, not a build break. → **F.W1** epistemic carry."* | `grep -c "D-corpus"` → **0 / 0**, and **0 hits across all 11 wave specs** — the only escape in this list that is unhomed program-wide. |
| 8 | `fr-GalleryMarquee.md:192` | **GM-19's F.W1 contingency** | INFO | *"whether the reduced-motion specificity defect gains a painted consequence under the uplift pin — decidable only by re-reading `a11y-overrides.css` at the F.W1 target"*. | `grep -c "GM-19"` → **0 / 0**. GM-19's identity is homed at F.W4; the **F.W1 re-read obligation** appears in no F.W1 gate (G4/G5 do not name it). |
| 9 | `fr-NotationPills.md:74` | **FR-NP-30** (limb c) | INFO | *"fixed `px-3` vs scaled height — **rides M-7/i-4 at F.W1**"*. | `grep -c "FR-NP-30"` → **0 / 0**. M-7 is carried (WU-C) but the rider's id is not named, so the ride is unverifiable id-keyed. |
| 10 | `fr-VisualizationView.md:103` | **§4** (method row + bypass) | INFO | *"Method → NO-WAVE-OWNER (SS-3/SS-4); **bypass → F.W1/F.W4**"* (the producer-materialised loop sites / `responsive` bypass). | The spec carries `L-13/MAJ-3/MAJ-4`, `L-3`, `MAJ-6` from this record; the `responsive` bypass row is carried nowhere (`grep -c "responsive" F-W1.md` → 1, unrelated). Id-less row — named here so absence is not read as oversight. |
| 11 | `fr-ConvergenceTimeline.md:56` | **D·D-5 + C·C-5** | INFO | disposition: F.W4 edit **+ "F.W1 rider — 7.0.0+ `iconOnly`/`data-control-target` is the post-uplift seat"**. | `grep -c "D·D-5"` → **0 / 0**. The mechanism is carried at G8; the id-keyed rider is not. |

**Not escapes (adjudicated, receipts kept)**: `FR-EQR-24` + `FR-USB-22` (the two `F.W0/W1` rows) — homed at F.W0 · `C-m9` (fr-PaperSidebar:60, "F.W0 dep placement + F.W1 rename") — F.W0-homed, rename arm inside WU-N's 35-site identity · `L §X-A` (fr-ExportModal:51 devDeps correction) — **present in the CARRY** under C-3 · `FR-MSP-4`, `L-05`, `HLG-12`, `C-M4`, `C-i2`, `FOLD` (ContourEditorCanvas:67), `SS-C-7`, `D:U-2`, `PSM-36`, `D:I-2`, `PP-REDGATE` — declared folds to identities the spec carries · fr-ImageUpload row 4 — banked *"NOT an F.W1 item (K-12)"*.

## §2 DEFECTS BEYOND THE CENSUS

### D-1 · MAJOR — the F.W0 authority coordinates are DRIFTED in all four places the spec quotes them

The spec's whole G1 posture is *"an INPUT TO / QUOTATION OF F.W0's G-11 anchor table (G-12 denominators) … (`F-W0.md:199` · `:204`; the pin table is G-13, `:209`)"* (`:247`), repeated at §4 step 2 (`:274`), cross-edge 1 (`:294`) and §E-3·R1 (`:400`), plus *"`SUBSTRATE-LEDGER.md` is `create`-marked at `F-W0.md:63`"*.

At the bytes **this session**:

| cited | what is actually there | true home |
|---|---|---|
| `F-W0.md:199` (G-11) | **blank line** | **`F-W0.md:211`** — `### G-11 — ONE corrected anchor table published; every later wave quotes it` |
| `F-W0.md:204` (G-12) | `**Owning rows**: 18, 17, 19.` | **`:216`** — `### G-12 — ONE corrected-denominator table published…` |
| `F-W0.md:209` (G-13) | `**Owning rows**: 3, 4, 26.` | **`:221`** — `### G-13 — The producer pin is re-derived at the ADOPTED commit…` |
| `F-W0.md:63` (ledger `create`) | `\| \`fourier/CLAUDE.md\` \| **create** — measured ABSENT 2026-08-28 \|` | **`:65`** — the `SUBSTRATE-LEDGER.md` **create** row |

R-9's law is that divergence from F.W0's table *is a defect against G-11*; R-1's law is that an authority which cannot be produced at its cited coordinate is re-anchored, never carried. The spec's §2·R1 placement note asserts *"every coordinate below was re-read at the bytes by this seat this session"* — the F.W0 coordinates were not. (Mitigation on the record: `F-W0.md` was itself repaired in the same round, mtime one minute later than `F-W1.md`; the cure is a re-anchor, not a strike — the **content** of G-11/G-12/G-13 is real and the `207bf174` sixth-drift addendum is genuine at `F-W0.md:224`.)

### D-2 · MAJOR — "ELEVEN limbs and stays eleven" enumerates TWELVE

`F-W1.md:276` is the single most-cited coordinate in X·F: nine sibling specs carry the R-4b sentence *"the ELEVEN-limb roster chartered at `F-W1.md:276` … cited whole, never restated here"* (verified present at `F-W2:240/:256`, `F-W4:217`, `F-W5:262`-adjacent, `F-W6:289`, `F-W7:204`, `F-W8:213`, `F-W9:250/:271`, `F-W10:288`). Splitting the roster on its own top-level `+` conjunctions yields **twelve**: producer bump · 162-attribute Button rewrite · `copied`→`status` triple · lucide rename · G10 disclosure deletions · FR-EQC-7 vaul-vue gate · G13 manifest/lock moves · PP-REDGATE ambient · FR-CP-13 gap decision · ExportModal M-γ deletion · GCM-22 `p-0` retirement · pencil-boil floor per G14. (RULINGS R-4 reached "eleven" only by fusing the last two into one limb — a grouping the spec's own text does not mark.) A roster nine specs cite *whole* must be countable; as written the count word and the list disagree, and the G5 landing cell's *"not a twelfth limb"* disclaimer inherits the same off-by-one.

### D-3 · MAJOR — the `outline` design call is an unflagged owner ruling

AA-2 (`:75`) states the cure map and says **`outline`→NO SUCCESSOR, design call**. Live tree: `grep -rn 'variant="outline"' web/src` → **30 sites** (this seat) — the second-largest variant class after `ghost` (49). WU-R's law is *"Owner-ruling escalations (G19 — flagged INLINE, never presumed)"*, and the structurally identical design call (U-2's edgeless trigger) is flagged as **ESC-3**. There is no ESC row, no G19 entry, and no §5 exclusion for the 30 outline sites — the wave's largest undecided design surface is invisible to the gate that exists to catch exactly this.

### D-4 · MINOR — §2·R1a mis-describes this spec's own contents

`:321` reads: *"Also distinct from **WU-C's** `D §3 U-2` (`fr-SvgFilters.md:36`), **which this spec already carries**, and from WU-C's `U-2` (fr-SpeedSelect `D §5 U-2`, `:43`)."* At the bytes: `D §3 U-2` occurs **nowhere** in `F-W1.md` or `F-W1-CARRY.md` except inside this citation (so "already carries" is false by id — what is carried is its FOLD TARGET, fr-App **B-2**), and B-2 (`.paper-texture`) is homed at **WU-D**, not WU-C. The second half is correct (`fr-SpeedSelect.md:43` = `D §5 U-2`, the SelectTrigger row = WU-C's `U-2` — verified verbatim).

### D-5 · MINOR — the transaction's budget figure sits outside G7's reconciliation set

G6 and §4.4 both charter a **"162-attribute"** prop rewrite (figure banked verbatim at `fr-EquationResult.md:37/:38` — **not** fabricated). D-M3's *budget of record* is **87 `variant=` · 36 `size="icon"` · 35 files**, and G7 enumerates the five disagreeing cells to reconcile — `87/36/35 · 37f/38/124 · 9g/7f+36i · 96/77/35 · i38/g12`. **162 is not among them**, yet it is the number the atomic limb names. Either 162 enters G7's set or the limb cites the G7 figure; as written the wave's own "one grep of record or nothing" law does not reach the number in the transaction.

### D-6 · MINOR — census citation form re-imports a ruled-against spelling

Provenance (`:12`) cites `formation/fourier/CENSUS-2026-08-03.md` **§4.2**. The census has no §4.2: its `## §4 — Candidate wave-shape sketch` is a numbered list and the F.W1 item is **§4 item 2** (`:184-186`, verified verbatim). R-1f cured this exact idiom for F.W0 (*"census §4.11/§4.5 re-spelled as §4 items 11 and 5"*); F.W1 repeats it. (`:109` and `:105` both resolve exactly, and `lane-frontend.md:481` resolves and **confirms** L-i3's correction — the cell lists three paths under a "4 sites" label.)

### D-7 · INFO — two quote/coordinate abbreviations

(i) G6 renders `scripts/e2e.sh:102` as `` `npx vite web` ``; the bytes at :102 are `npx --prefix web vite web --port "$WEB_PORT" --strictPort` (coordinate right, quote clipped). (ii) §1 gives the root-font fork as `style.css:40-49`; its media arm closes at **:50**.

## §3 WHAT VERIFIED CLEAN (adversarial checks that failed to convict)

- **AUTHORITY REALITY, registry direction**: all 42 `§6·R1` coordinates resolve **and carry their id at that line** (script-verified, 0 mismatches). All 20 §2·R1a/b/c/d record coordinates resolve and carry their quoted substance (`fr-GlassTimeline:84` RB-1 · `fr-EquationView:107` M-TL · `:65` D·D-M3 · `fr-InfoCard:49` FR-IC-17 · `fr-MorphPhaseConfig:91` MPC-29 · `fr-SvgFilters:64` C-S3 · `:49` D §3 U-3 · `fr-PaperSearch:55` · `fr-AdminAuditLog:48` AA-11 · `:41` AA-4 · `fr-CanvasOverlayButton:87` FR-COB-28 · `fr-CoefficientsPanel:68` · `fr-CollapsibleSection:78/:63/:64` · `fr-GalleryDraftsSection:87` · `fr-BasisSelector:72` · `fr-NotationPills:44` · `fr-AdminFlaggedPanel:87` · `carry/F-W1-CARRY.md:246`).
- **The §E-3·R1 anchor-family errata is TRUE at the bytes**: every one of the 16 sampled `fr-NAME:LINE` anchors exceeds its record's real length, and **every line-count in the errata is exactly right** (spot-verified all 16: PaperSearch 92 · NotationPills 132 · EquationResult 129 · EqCoefficientsPanel 129 · EquationView 301 · ExportModal 104 · FourierMorphSvg 105 · FSE 157 · CoefficientsSpectrum 159 · CollapsibleSection 133 · ContourEditorCanvas 162 · ConvergenceLegend 176 · ConvergenceTimeline 155 · EasingPicker 157 · CanvasOverlayButton 133 · CoefficientsPanel 137), and the five "resolving family" anchors do resolve. G20's re-basing onto row-ids + the PASS-1 registry census is the sound cure.
- **R-10.1 bounds cure verified**: all 8 corrected product paths `ls`-resolve in the READ-ONLY tree, as do every §1 path, the four e2e witnesses, `scripts/e2e.sh`, `ci.yml`, `deploy-pages.yml`. `components/dock/`, `components/gallery/`, `components/animation/` genuinely do not exist.
- **Gate witnesses are real and RED at the bytes** (live measurements by this seat): `--slider-scrub` → **23 declarations / 7 files**, and the seven files are byte-for-byte the spec's re-resolved list (G9 born-RED ✓) · `lucide-vue-next` → **35 / 35** (WU-N ✓) · `text-admin-label` → **7 sites / 4 files**, exactly the four G5 names (✓) · `./metric-badge` importers → **7 files**, exactly the §1 roster (✓) · `.cartoon-card` → 25 occurrences / 15 files raw, of which 4 are the shim itself in `style.css` ⇒ **21 application occurrences / 14 files** — the spec's census of record is *exactly right*, and the shim's own comment still says "14 application sites (13 files)" (✓ the stale-comment row) · `CoefficientsSpectrum.vue:19` = `import { AnimatedDigit } from "@mkbabb/glass-ui/animated-digit"` (G11 ✓) · `InfoCard.vue:4` = metric-badge import (✓) · `easings.ts:58` = the `as EasingFn` cast (G12 ✓) · `GlassTimeline.vue:73` = `@pointerdown="onPointerDown"` (G18 ✓) · `CollapsibleSection.vue:60-65` animation pair + `:66-71` PRM guard + `:2` root-barrel import + `:57-59` the false-specifier comment (G10, FR-CP-33, m-6 ✓) · `ContourSettings.vue:255-265` fork + `:357` twin comment + the `:361-374` twin (✓) · `ci.yml:95` / `deploy-pages.yml:114` = `npx vue-tsc -b --force` (✓) · the four e2e console gates at their cited ranges (✓) · installed producer = **4.0.0**, and `dist/styles/index.css` at :195-221 does carry the fold-block injected at a prose `@source` mention (G2 ✓) · `dist/styles/utilities/a11y-overrides.css:116` = `[data-size="icon"]` (G8 ✓) · `docs/tranches/X/coordination/` holds exactly ONE file (G15 ✓) · `docs/tranches/X/fourier/evidence/` does not exist (✓ create-at-execution).
- **M-25 depth / locks**: MPC-31's ONE-CUT LAW is quoted faithfully against `fr-MorphPhaseConfig.md:17/:82` ✓ · FR-NP-32 (≡ fr-PaperSidebar M1) carried by id at NWO-1's TOP, in G2's premise and at §2·R1d in the canonical R-8 form ✓ · PAW-44/LAW-3 carried (with one paraphrase: banked LAW-3 is *"WITH-**or-AFTER**"*, the spec says *"only WITH"* — substance preserved, ordering slightly tightened) ✓ · FR-MSP-6's two-channel lock and the PaperSearchModal same-commit triple are excluded **with the correct reason** (their rows land F.W3/W4; PSM-36 verified verbatim at `fr-PaperSearchModal.md:79`) ✓ · KILL-6, K-5, C-M7, GAB-29, FMD-21, K-9, K-12 all carried as kills with their receipts ✓.
- **Atomicity + posture**: `Status: planned` ✓ · four-verb table VERIFIED = NO ✓ · no verification verb stamped anywhere (the sole "VERIFIED" tokens are G12's gate name and the errata recording the strike) ✓ · fourier tree untouched by this check and gated at execution ✓ · the four coordinates RULINGS pinned in this file are intact (`:161` WU-K L/B-1 ✓ · `:227` ESC-4 ✓ · `:276` the transaction ✓ · `:294` the vaul-vue-INSIDE pin ✓) — the §2·R1 append-at-the-end discipline worked · commit #3's abort semantics (R-4 sibling i) ✓ · G5's landing cell (R-4 sibling ii) ✓ · G15/G20 restated born-RED against artefacts that do not exist ✓ · SS-4's owner flags left inline at SS-4 (cross-edge 10) ✓.

## §4 Full routed census (id-for-id)

Legend: **BOOKED (spec, by id)** = id verbatim in `F-W1.md` · **BOOKED (carry / §6·R1 roster)** = id in `F-W1-CARRY.md` under a carried identity · **BOOKED (declared fold or kill)** = the row's own disposition folds/kills into an identity the spec carries · **ESCAPED** = §1.

| record:line(s) | row id (as banked) | verdict |
|---|---|---|
| `fr-AdminAuditLog.md:36` | AA-2 · D-B4 | BOOKED (spec, by id) |
| `fr-AdminAuditLog.md:142` | S-8 · Meta (worker-1's, adopted as method law) | BOOKED (declared fold or kill) |
| `fr-AdminFlaggedPanel.md:63` | FR-AFP-16 | BOOKED (spec, by id) |
| `fr-AdminFlaggedPanel.md:64` | FR-AFP-17 | BOOKED (spec, by id) |
| `fr-AdminFlaggedPanel.md:65` | FR-AFP-18 | BOOKED (spec, by id) |
| `fr-AdminFlaggedPanel.md:66` | FR-AFP-19 | BOOKED (spec, by id) |
| `fr-AdminFlaggedPanel.md:45` | FR-AFP-2 | BOOKED (spec, by id) |
| `fr-AdminFlaggedPanel.md:67` | FR-AFP-20 | BOOKED (spec, by id) |
| `fr-AdminFlaggedPanel.md:82` | FR-AFP-27 · D-13 | BOOKED (spec, by id) |
| `fr-AdminFlaggedPanel.md:83` | FR-AFP-28 · D-18 (+α's exact re-measures) | BOOKED (spec, by id) |
| `fr-AdminFlaggedPanel.md:46` | FR-AFP-3 | BOOKED (spec, by id) |
| `fr-AdminFlaggedPanel.md:87` | FR-AFP-33 · D-17 / L-20 / L-22 | BOOKED (spec, by id) |
| `fr-AdminFlaggedPanel.md:91` | FR-AFP-37 · C:D-13 (cure re-spelled at 7.0.0 — carried K3, re-verified | BOOKED (spec, by id) |
| `fr-AdminFlaggedPanel.md:97` | FR-AFP-44 · superseded-draft carry (α′-miss, attributed; `:233` re-sig | BOOKED (spec, by id) |
| `fr-AdminFlaggedPanel.md:99` | FR-AFP-46 · superseded-draft carry (α′-miss) | BOOKED (spec, by id) |
| `fr-AdminFlaggedPanel.md:115` | FR-AFP-55 · superseded-draft carry (peers re-read this session) | BOOKED (spec, by id) |
| `fr-AdminFlaggedPanel.md:101` | FR-AFP-61 · NEW (α-miss-4; exports keyset re-run by this seat; +ruling | BOOKED (spec, by id) |
| `fr-AdminUserList.md:48` | FR-AUL-10 | BOOKED (spec, by id) |
| `fr-AdminUserList.md:88` | FR-AUL-45 | BOOKED (spec, by id) |
| `fr-AdminUserList.md:96` | FR-AUL-53 | BOOKED (spec, by id) |
| `fr-AnimationControls.md:114` | C-1 | BOOKED (spec, by id) |
| `fr-AnimationControls.md:84` | C-13 | BOOKED (spec, by id) |
| `fr-AnimationControls.md:54` | C-2 | BOOKED (spec, by id) |
| `fr-AnimationControls.md:82` | D-11 / L-7 / C-8 / C-26 | BOOKED (spec, by id) |
| `fr-AnimationControls.md:57` | D-12 / C-20 | BOOKED (spec, by id) |
| `fr-AnimationControls.md:147` | K-13 | BOOKED (spec, by id) |
| `fr-AnimationControls.md:148` | K-14 | BOOKED (spec, by id) |
| `fr-AnimationControls.md:125` | L-13 | BOOKED (spec, by id) |
| `fr-AnimationControls.md:69` | M-15 (LC) | BOOKED (spec, by id) |
| `fr-AnimationControls.md:32` | R-10 | BOOKED (spec, by id) |
| `fr-AnimationControls.md:36` | R-14 | BOOKED (spec, by id) |
| `fr-AnimationControls.md:38` | R-16 | BOOKED (spec, by id) |
| `fr-App.md:42` | B-1 / L-1 / C-1 | BOOKED (spec, by id) |
| `fr-App.md:46` | B-2 | BOOKED (spec, by id) |
| `fr-App.md:89` | C-11 | BOOKED (spec, by id) |
| `fr-App.md:47` | C-2 | BOOKED (spec, by id) |
| `fr-App.md:56` | C-4 | BOOKED (spec, by id) |
| `fr-App.md:73` | L-7 | BOOKED (spec, by id) |
| `fr-App.md:75` | L-9 | BOOKED (spec, by id) |
| `fr-App.md:59` | MG-β | BOOKED (spec, by id) |
| `fr-App.md:82` | MG-ι | BOOKED (spec, by id) |
| `fr-App.md:94` | MG-κ | BOOKED (spec, by id) |
| `fr-App.md:28` | R-4 | BOOKED (spec, by id) |
| `fr-App.md:57` | m-8 / L-2 / C-3 | BOOKED (spec, by id) |
| `fr-App.md:71` | m-9 / C-9 | BOOKED (spec, by id) |
| `fr-App.md:139` | → F.W1 (tri-package uplift / palette seam) | BOOKED (spec, by id) |
| `fr-AppHeader.md:68` | C-19 (`cssVarToHex` has no `oklch` arm → four of five `--viz-*` resolv | BOOKED (spec, by id) |
| `fr-AppHeader.md:59` | FR-AH-13 · D-M7 | BOOKED (spec, by id) |
| `fr-AppHeader.md:80` | FR-AH-22 · L-9/C-5 | BOOKED (spec, by id) |
| `fr-AppHeader.md:82` | FR-AH-24 · L-14 | BOOKED (spec, by id) |
| `fr-AppHeader.md:91` | FR-AH-33 · C-14 | BOOKED (spec, by id) |
| `fr-AppHeader.md:53` | FR-AH-7 · C-2 | BOOKED (spec, by id) |
| `fr-AppHeader.md:31` | reader-2's missed row #3 (value.js 0.13.0 outside glass-ui 4.0.0's pee | BOOKED (spec, by id) |
| `fr-AppHeader.md:69` | value.js 0.13.0 outside glass-ui 4.0.0's peer range | BOOKED (spec, by id) |
| `fr-BasisCanvas.md:86` | C-11 | BOOKED (spec, by id) |
| `fr-BasisCanvas.md:44` | C-4 | BOOKED (spec, by id) |
| `fr-BasisCanvas.md:59` | C-8 | BOOKED (spec, by id) |
| `fr-BasisCanvas.md:38` | D-1 / BC-1 / C-1 | BOOKED (spec, by id) |
| `fr-BasisCanvas.md:73` | D-18 / C-13 | BOOKED (spec, by id) |
| `fr-BasisCanvas.md:43` | D-2 / BC-5 / C-3 | BOOKED (spec, by id) |
| `fr-BasisCanvas.md:104` | D-27 | BOOKED (spec, by id) |
| `fr-BasisCanvas.md:105` | D-corpus-C-1 | **ESCAPED** |
| `fr-BasisCanvas.md:74` | M-α5 | BOOKED (spec, by id) |
| `fr-BasisCanvas.md:90` | M-α6 | BOOKED (spec, by id) |
| `fr-BasisCanvas.md:94` | M-β5 | BOOKED (spec, by id) |
| `fr-BasisCanvas.md:107` | M-β6 | BOOKED (spec, by id) |
| `fr-BasisCanvas.md:26` | R-2 | BOOKED (spec, by id) |
| `fr-BasisSelector.md:40` | B-2 = D-B2 / C-1 | BOOKED (spec, by id) |
| `fr-BasisSelector.md:45` | C-2 / L-B1 | BOOKED (spec, by id) |
| `fr-BasisSelector.md:46` | C-4 / L-M6 | BOOKED (spec, by id) |
| `fr-BasisSelector.md:56` | M-7 = D-M10 + DU-missed-1 | BOOKED (spec, by id) |
| `fr-BasisSelector.md:25` | R-1 | BOOKED (spec, by id) |
| `fr-BasisSelector.md:30` | R-6 | BOOKED (spec, by id) |
| `fr-BasisSelector.md:95` | i-4 = DU-missed-8 | BOOKED (spec, by id) |
| `fr-BasisSelector.md:87` | m-21 = LC-missed-4 | BOOKED (spec, by id) |
| `fr-BasisSelector.md:69` | m-3 = D-M8 | BOOKED (spec, by id) |
| `fr-BasisSelector.md:75` | m-9 = C-9 | BOOKED (spec, by id) |
| `fr-CanvasControlsDock.md:61` | C-13 | BOOKED (spec, by id) |
| `fr-CanvasControlsDock.md:95` | C-27 | BOOKED (spec, by id) |
| `fr-CanvasControlsDock.md:56` | D-12 / L-6 / C-4 | BOOKED (spec, by id) |
| `fr-CanvasControlsDock.md:44` | D-2 / C-2 | BOOKED (spec, by id) |
| `fr-CanvasControlsDock.md:53` | D-3 / L-8 / C-8 | BOOKED (spec, by id) |
| `fr-CanvasControlsDock.md:54` | D-6 / L-4 / C-6 | BOOKED (spec, by id) |
| `fr-CanvasControlsDock.md:60` | D-7 | BOOKED (spec, by id) |
| `fr-CanvasControlsDock.md:115` | K-8 | BOOKED (spec, by id) |
| `fr-CanvasControlsDock.md:31` | R-10 | BOOKED (spec, by id) |
| `fr-CanvasOverlayButton.md:59` | FR-COB-10 | BOOKED (spec, by id) |
| `fr-CanvasOverlayButton.md:67` | FR-COB-13 | BOOKED (spec, by id) |
| `fr-CanvasOverlayButton.md:70` | FR-COB-16 | BOOKED (spec, by id) |
| `fr-CanvasOverlayButton.md:73` | FR-COB-19 | BOOKED (spec, by id) |
| `fr-CanvasOverlayButton.md:41` | FR-COB-2 = D-1 / L-2 / C-11 / C-12 | BOOKED (spec, by id) |
| `fr-CanvasOverlayButton.md:75` | FR-COB-21 | BOOKED (spec, by id) |
| `fr-CanvasOverlayButton.md:83` | FR-COB-24 | BOOKED (spec, by id) |
| `fr-CanvasOverlayButton.md:87` | FR-COB-28 | BOOKED (spec, by id) |
| `fr-CanvasOverlayButton.md:55` | FR-COB-6 | BOOKED (spec, by id) |
| `fr-CoefficientsPanel.md:45` | FR-CP-13 = D-23 | BOOKED (spec, by id) |
| `fr-CoefficientsPanel.md:46` | FR-CP-14 = DU-missed-1 | BOOKED (spec, by id) |
| `fr-CoefficientsPanel.md:56` | FR-CP-21 = D-18 + DU-missed-7 | BOOKED (spec, by id) |
| `fr-CoefficientsPanel.md:77` | FR-CP-42 = D-axis §6 lucide row | BOOKED (spec, by id) |
| `fr-CoefficientsPanel.md:37` | FR-CP-5 = D-4 | BOOKED (spec, by id) |
| `fr-CoefficientsSpectrum.md:42` | B-4 = readers' convergent missed find | BOOKED (spec, by id) |
| `fr-CoefficientsSpectrum.md:49` | C-6 (lucide-vue-next from devDependencies; 1 of 35) | BOOKED (spec, by id) |
| `fr-CoefficientsSpectrum.md:46` | C:B-1 (npm ls `invalid` / ELSPROBLEMS; glass-ui peers `^0.10.0 // ^0.1 | BOOKED (spec, by id) |
| `fr-CoefficientsSpectrum.md:47` | D:M-4 / C-26 (`variant="ghost"` deleted at 7.0.0) | BOOKED (spec, by id) |
| `fr-CoefficientsSpectrum.md:48` | D:M-8 (`text-admin-label` deleted at 7.0.0; the tooltip grid at `:110` | BOOKED (spec, by id) |
| `fr-CoefficientsSpectrum.md:68` | M-16 = LC-missed-6, ratified and extended by this seat | BOOKED (spec, by id) |
| `fr-CoefficientsSpectrum.md:29` | R-5 | BOOKED (spec, by id) |
| `fr-CoefficientsSpectrum.md:99` | i-3 = C-20 / D-i5 / L-m5 | BOOKED (spec, by id) |
| `fr-CoefficientsSpectrum.md:91` | m-20 = C-24, as transformed by B-4 | BOOKED (spec, by id) |
| `fr-CoefficientsSpectrum.md:79` | m-8 = D-m8 | BOOKED (spec, by id) |
| `fr-CollapsibleSection.md:38` | B-1 = D/B-1 ∘ DU-missed-1 (the hang) | BOOKED (spec, by id) |
| `fr-CollapsibleSection.md:42` | F-1 = C-1 | BOOKED (spec, by id) |
| `fr-CollapsibleSection.md:43` | F-2 = C-5 | BOOKED (spec, by id) |
| `fr-CollapsibleSection.md:44` | F-3 = D/M-5 | BOOKED (spec, by id) |
| `fr-CollapsibleSection.md:54` | M-7 = missed-find, both readers convergent | BOOKED (spec, by id) |
| `fr-CollapsibleSection.md:25` | R-1 | BOOKED (spec, by id) |
| `fr-CollapsibleSection.md:29` | R-5 | BOOKED (spec, by id) |
| `fr-CollapsibleSection.md:78` | i-2 = D/m-11 | BOOKED (spec, by id) |
| `fr-CollapsibleSection.md:63` | m-6 = C/N-3 | BOOKED (spec, by id) |
| `fr-ContourEditorCanvas.md:66` | C-11 | BOOKED (spec, by id) |
| `fr-ContourEditorCanvas.md:52` | D/B-1 · C-7 · L-15(token arm) | BOOKED (spec, by id) |
| `fr-ContourEditorCanvas.md:97` | MM-11 | BOOKED (spec, by id) |
| `fr-ContourPreview.md:48` | 15 | BOOKED (spec, record-qualified) |
| `fr-ContourPreview.md:56` | 23 | BOOKED (spec, record-qualified) |
| `fr-ContourPreview.md:60` | 27 | BOOKED (spec, record-qualified) |
| `fr-ContourPreview.md:62` | 29 | **ESCAPED** |
| `fr-ContourPreview.md:63` | 30 | BOOKED (spec, record-qualified) |
| `fr-ContourPreview.md:70` | 37 | BOOKED (spec, record-qualified) |
| `fr-ContourPreview.md:37` | 4 | BOOKED (declared fold or kill) |
| `fr-ContourSettings.md:50` | C-11 (`lib/colors.ts` has no `oklch()` arm; 4 of 5 `--viz-*` tokens →  | BOOKED (spec, by id) |
| `fr-ContourSettings.md:51` | C-5 (value.js 0.13.0 invalid vs glass-ui's peer range, ELSPROBLEMS) =  | BOOKED (spec, by id) |
| `fr-ContourSettings.md:49` | D-B1 (five `:color="VIZ_COLORS.amber"` bindings paint nothing) ∘ DU-mi | BOOKED (spec, by id) |
| `fr-ContourSettings.md:61` | M-4 = D-M6-as-corrected (K-3) | BOOKED (spec, by id) |
| `fr-ConvergenceLegend.md:52` | D-1 + C-3 | BOOKED (spec, by id) |
| `fr-ConvergenceTimeline.md:54` | D·D-2 | BOOKED (spec, by id) |
| `fr-ConvergenceTimeline.md:56` | D·D-5 + C·C-5 | **ESCAPED** |
| `fr-ConvergenceTimeline.md:94` | M-6 | BOOKED (spec, by id) |
| `fr-DarkModeToggle.md:110` | I-2 · D-I5/C-16 + SR-2 | BOOKED (spec, by id) |
| `fr-DarkModeToggle.md:56` | L-3 | BOOKED (spec, by id) |
| `fr-DarkModeToggle.md:48` | SR-2 (route sharpening | BOOKED (declared fold or kill) |
| `fr-EasingCurvePreview.md:52` | BREAK-8.0 (reader-DU M-4, banked) | BOOKED (spec, by id) |
| `fr-EasingCurvePreview.md:58` | CENSUS-MC (C-D-5) | BOOKED (spec, by id) |
| `fr-EasingPicker.md:53` | C/B-2 | BOOKED (spec, by id) |
| `fr-EasingPicker.md:117` | C/M-5's remedy leg ("route through the app's own resolver") | BOOKED (carry / §6·R1 roster) |
| `fr-EasingPicker.md:51` | D/D-2 (+ both readers' contrast amendments, folded) | BOOKED (declared fold or kill) |
| `fr-EasingPicker.md:59` | D/D-3 + L/M-2 | BOOKED (declared fold or kill) |
| `fr-EasingPicker.md:52` | L/B-1 + C/B-1 | BOOKED (spec, by id) |
| `fr-EasingPicker.md:69` | MISSED-C (DU) — host break surface, census amendment | BOOKED (carry / §6·R1 roster) |
| `fr-EasingPicker.md:89` | MISSED-F (LC) — duplicate imports / catalogue subset | **ESCAPED** |
| `fr-EditorControlsDock.md:79` | D-23 / C-19 | BOOKED (spec, by id) |
| `fr-EditorControlsDock.md:56` | D-8 / C-12 | BOOKED (spec, by id) |
| `fr-EditorControlsDock.md:57` | D-9 / L-8 (+ D-26; K-4 kills the height row) | BOOKED (spec, by id) |
| `fr-EditorControlsDock.md:43` | FOLD — D-1 · D-11 · D-25 · L-15 | BOOKED (spec, by id) |
| `fr-EditorControlsDock.md:45` | FOLD — L-2 · C-2 | BOOKED (spec, by id) |
| `fr-EditorControlsDock.md:116` | K-9 | BOOKED (spec, by id) |
| `fr-EditorControlsDock.md:61` | L-7 (+ M-10 pin correction) | BOOKED (spec, by id) |
| `fr-EditorControlsDock.md:98` | M-10 (banked missed find, both readers; seat-verified) | BOOKED (spec, by id) |
| `fr-EditorControlsDock.md:26` | R-5 | BOOKED (spec, by id) |
| `fr-EditorControlsDock.md:29` | R-8 | BOOKED (spec, by id) |
| `fr-EqCoefficientsPanel.md:73` | D/M-8 = the census break table (lane-frontend :470-481) + fr-AppHeader | BOOKED (spec, by id) |
| `fr-EqCoefficientsPanel.md:50` | FR-EQC-13 = D/i-4 | BOOKED (spec, by id) |
| `fr-EqCoefficientsPanel.md:53` | FR-EQC-16 = readers' missed-7, re-verified | BOOKED (spec, by id) |
| `fr-EqCoefficientsPanel.md:40` | FR-EQC-3 = D/M-2 + C-5(shim limb) | BOOKED (spec, by id) |
| `fr-EqCoefficientsPanel.md:28` | R-4 | BOOKED (spec, by id) |
| `fr-EquationModeToggle.md:44` | FR-EMT-14 = D-15 / C-15 | BOOKED (spec, by id) |
| `fr-EquationModeToggle.md:52` | FR-EMT-22 = R2 missed-6 | BOOKED (spec, by id) |
| `fr-EquationModeToggle.md:38` | FR-EMT-8 = L-B1 (instance) / D §4 cross-check | BOOKED (spec, by id) |
| `fr-EquationModeToggle.md:25` | L-M4's routing hedge ("4.0.0 PLAUSIBLE → route F.W3 post-uplift") | BOOKED (spec, by id) |
| `fr-EquationPanel.md:48` | M-N16 (reader-2 missed-2 = the killed[15] narrow) | BOOKED (declared fold or kill) |
| `fr-EquationResult.md:36` | FR-EQR-1 = D-3(iii) | BOOKED (spec, by id) |
| `fr-EquationResult.md:37` | FR-EQR-2 = D-3(i)(ii) | BOOKED (spec, by id) |
| `fr-EquationResult.md:62` | FR-EQR-24 = L-m2 / C-4 | BOOKED (spec, by id) |
| `fr-EquationResult.md:38` | FR-EQR-3 = reader-1 missed-1, SHARPENED | BOOKED (spec, by id) |
| `fr-EquationView.md:55` | D·D-B4 = L·M-5 = C·D-07 | BOOKED (spec, by id) |
| `fr-EquationView.md:64` | D·D-M10 | BOOKED (spec, by id) |
| `fr-EquationView.md:85` | D·D-M11 = C·D-18 | BOOKED (spec, by id) |
| `fr-EquationView.md:65` | D·D-M3 *(absolute qualified — K-10)* | BOOKED (spec, by id) |
| `fr-EquationView.md:72,74` | M-RTC *(missed, R-L — seat-ratified NEW; cure re-homing)* | BOOKED (spec, by id) |
| `fr-EquationView.md:107` | M-TL *(missed, R-D — seat-ratified NEW)* | BOOKED (spec, by id) |
| `fr-ExportModal.md:61` | K-16 | BOOKED (declared fold or kill) |
| `fr-ExportModal.md:38` | M-α | BOOKED (spec, by id) |
| `fr-ExportModal.md:39` | M-β | BOOKED (spec, by id) |
| `fr-ExportModal.md:40` | M-γ | BOOKED (spec, by id) |
| `fr-FourierMorphDemo.md:25` | D-3 severity (Button `variant`/`size="default"` gone at destination) | BOOKED (spec, by id) |
| `fr-FourierMorphDemo.md:53` | FMD-11 · D-3 ⊕ the killed §6 slider ledger row | BOOKED (spec, by id) |
| `fr-FourierMorphDemo.md:56` | FMD-14 · D-11 | BOOKED (spec, by id) |
| `fr-FourierMorphDemo.md:63` | FMD-21 · C-§6 | BOOKED (spec, by id) |
| `fr-FourierMorphDemo.md:40` | FMD-3 · D-2 ⊕ C-1 | BOOKED (spec, by id) |
| `fr-FourierMorphDemo.md:51` | FMD-9 · L-06 ⊕ L-11 ⊕ C-11 ⊕ D-10 (engine arm) | BOOKED (spec, by id) |
| `fr-FourierMorphSvg.md:37` | FM-2 · D-2 ⊕ cure-collision | BOOKED (spec, by id) |
| `fr-FourierMorphSvg.md:39` | FM-4..FM-16 | BOOKED (declared fold or kill) |
| `fr-FourierShapeExtractor.md:45` | AA-2 fold | BOOKED (spec, by id) |
| `fr-FourierShapeExtractor.md:89` | C-13 | BOOKED (spec, by id) |
| `fr-FourierShapeExtractor.md:99` | C-16 | BOOKED (spec, by id) |
| `fr-FourierShapeExtractor.md:100` | C-18.2 | BOOKED (spec, by id) |
| `fr-FourierShapeExtractor.md:78` | D-13 | BOOKED (spec, by id) |
| `fr-FourierShapeExtractor.md:29` | D-2 / C-1 severity label | BOOKED (spec, by id) |
| `fr-FourierShapeExtractor.md:98` | L-i3 / C-18.1 | BOOKED (spec, by id) |
| `fr-FourierShapeExtractor.md:157` | Reader-2's severity for the 44.08 arm (MINOR) | BOOKED (declared fold or kill) |
| `fr-FrequencyGraph.md:47` | FR-FG-12 = D:m-9 + m-5 + m-8 + DU-missed-2 | BOOKED (spec, by id) |
| `fr-FrequencyGraph.md:58` | FR-FG-20 = D:i-5 / C-§0-as-strengthened | BOOKED (spec, by id) |
| `fr-FullscreenViewer.md:38` | FB-3 = C-M6 | BOOKED (spec, by id) |
| `fr-FullscreenViewer.md:39` | FB-4 = D-5 / D §5 | BOOKED (spec, by id) |
| `fr-FullscreenViewer.md:97` | K-7 | BOOKED (declared fold or kill) |
| `fr-FunctionInput.md:39` | D-12 → fr-AdminAuditLog AA-2 (ADJUDICATED BLOCKER, census-extension) | BOOKED (spec, by id) |
| `fr-FunctionInput.md:54` | N-1 (reader-1 missed #1, every leg re-proven by this seat) | **ESCAPED** |
| `fr-GalleryAdminBanner.md:23` | D-B3 severity | BOOKED (declared fold or kill) |
| `fr-GalleryAdminBanner.md:50` | GAB-11 · D-M10 | BOOKED (spec, by id) |
| `fr-GalleryAdminBanner.md:41` | GAB-2 · D-B3 | BOOKED (spec, by id) |
| `fr-GalleryCard.md:44` | C-4 | BOOKED (spec, by id) |
| `fr-GalleryCard.md:61` | D-1 / L·B-1 | BOOKED (spec, by id) |
| `fr-GalleryCard.md:80` | D-20 | BOOKED (spec, by id) |
| `fr-GalleryCard.md:81` | D-21 | BOOKED (spec, by id) |
| `fr-GalleryCard.md:45` | D-4 / L·M-1 / C-3 | BOOKED (spec, by id) |
| `fr-GalleryCard.md:48` | D-8 | BOOKED (spec, by id) |
| `fr-GalleryCard.md:84` | G-DU6 | BOOKED (spec, by id) |
| `fr-GalleryCard.md:95` | K-5 · D-4's prescribed cure ("make `color` a getter … either restores  | BOOKED (spec, by id) |
| `fr-GalleryCard.md:82` | L·I-1 / C·I-1 | BOOKED (spec, by id) |
| `fr-GalleryCard.md:30` | R-4 | BOOKED (spec, by id) |
| `fr-GalleryCardModal.md:59` | GCM-13 · D-10 | BOOKED (spec, by id) |
| `fr-GalleryCardModal.md:60` | GCM-14 · D-11(a) | BOOKED (spec, by id) |
| `fr-GalleryCardModal.md:64` | GCM-18 · D-16/U-1 | BOOKED (carry / §6·R1 roster) |
| `fr-GalleryCardModal.md:66` | GCM-20 · L-3/C-4 | BOOKED (spec, by id) |
| `fr-GalleryCardModal.md:67` | GCM-21 · L-4/C-5 | BOOKED (spec, by id) |
| `fr-GalleryCardModal.md:68` | GCM-22 · M-α (DU missed find, admitted) | BOOKED (spec, by id) |
| `fr-GalleryCardModal.md:77` | GCM-26 · D-11(b) | BOOKED (spec, by id) |
| `fr-GalleryCardModal.md:106` | GCM-50 · D-34/U-5 | BOOKED (spec, by id) |
| `fr-GalleryCardModal.md:107` | GCM-51 · C-14 | BOOKED (spec, by id) |
| `fr-GalleryCardModal.md:109` | GCM-53 · C-16 | BOOKED (spec, by id) |
| `fr-GalleryCardModal.md:52` | GCM-6 · D-03 | BOOKED (carry / §6·R1 roster) |
| `fr-GalleryCardModal.md:124` | K-8 | BOOKED (spec, by id) |
| `fr-GalleryDraftsSection.md:46` | F-3 = D-M-5 = fr-CollapsibleSection F-3 (= fr-BasisSelector m-3 + fr-A | BOOKED (spec, by id) |
| `fr-GalleryDraftsSection.md:48` | F-5 = D/m-1 = C-C-11 = FR-EQR-14 / FR-COB-18 (banked glyph-register sw | BOOKED (spec, by id) |
| `fr-GalleryDraftsSection.md:57` | M-5 = D/M-7 | BOOKED (spec, by id) |
| `fr-GalleryDraftsSection.md:58` | M-6 = D/M-4 (+ r1-missed-1 fold; R-7) | BOOKED (spec, by id) |
| `fr-GalleryDraftsSection.md:28` | R-4 | BOOKED (spec, by id) |
| `fr-GalleryDraftsSection.md:87` | i-1 = D/M-6 = L-14 (severity ruled: K-10) | BOOKED (spec, by id) |
| `fr-GalleryDraftsSection.md:67` | m-2 = D/m-2 = C-C-12 | BOOKED (spec, by id) |
| `fr-GalleryFeaturedCarousel.md:44` | FR-GFC-10 = D-4 / L-7 | BOOKED (spec, by id) |
| `fr-GalleryFeaturedCarousel.md:66` | FR-GFC-29 = MISS-CB(LC) ⊕ D·S-1's verified surface | BOOKED (spec, by id) |
| `fr-GalleryInfiniteGrid.md:48` | C-6 | BOOKED (spec, by id) |
| `fr-GalleryMarquee.md:51` | GM-6 = D-11 | BOOKED (spec, by id) |
| `fr-GalleryMarquee.md:35` | GM-F7 = C-8 | BOOKED (spec, by id) |
| `fr-GallerySearchBar.md:31` | FR-GSB-2 = D-B2 / C-3 | BOOKED (spec, by id) |
| `fr-GallerySearchBar.md:32` | FR-GSB-3 = L-3 / C-4b / D-M2b | BOOKED (spec, by id) |
| `fr-GallerySearchBar.md:33` | FR-GSB-4 = L-2 / C-4a / D-M2a | BOOKED (spec, by id) |
| `fr-GallerySearchBar.md:38` | FR-GSB-9 = D §6 BREAK-1 (fact) | BOOKED (spec, by id) |
| `fr-GallerySearchBar.md:79` | K-5 | BOOKED (spec, by id) |
| `fr-GalleryView.md:57` | FR-GV-18 = D-16 / D-S5 | BOOKED (spec, by id) |
| `fr-GalleryView.md:83` | FR-GV-37 = L-20 | BOOKED (spec, by id) |
| `fr-GalleryView.md:25` | R-6 | BOOKED (spec, by id) |
| `fr-GlassTimeline.md:85` | BR-1 *(r1-carried, CROSS-REF added)* | BOOKED (spec, by id) |
| `fr-GlassTimeline.md:81` | C-18 / C-20 *(r1-carried)* | BOOKED (spec, by id) |
| `fr-GlassTimeline.md:121` | PD-1 | BOOKED (spec, by id) |
| `fr-GlassTimeline.md:46` | PD-1 *(NEW — reader-δ missed[1], verified verbatim at the producer byt | BOOKED (spec, by id) |
| `fr-GlassTimeline.md:84` | RB-1 *(r1-carried)* | BOOKED (spec, by id) |
| `fr-GlassTimeline.md:98` | rK-24 | BOOKED (declared fold or kill) |
| `fr-HarmonicLevelGrid.md:58` | HLG-12 · D:D-12 | BOOKED (declared fold or kill) |
| `fr-HarmonicLevelGrid.md:49` | HLG-3 · D:D-3 ⊕ L:D-3 ⊕ C:C-1 | BOOKED (spec, by id) |
| `fr-HarmonicLevelGrid.md:182` | HLG-41 · r2-LC M-1 (SEAT-RESCOPED, K-20) | BOOKED (spec, by id) |
| `fr-HarmonicLevelGrid.md:51` | HLG-5 · D:D-2 ⊕ C:C-8 (Button legs) | BOOKED (spec, by id) |
| `fr-ImageUpload.md:20` | 2 | BOOKED (declared fold or kill) |
| `fr-ImageUpload.md:62` | 28 | BOOKED (declared fold or kill) |
| `fr-ImageUpload.md:38` | 4 | BOOKED (declared fold or kill) |
| `fr-ImageUpload.md:26` | 8 | BOOKED (declared fold or kill) |
| `fr-ImageUpload.md:76` | F8 · D:U-3 residual | BOOKED (declared fold or kill) |
| `fr-ImageUpload.md:97` | K-15 · D:U-2's 7.0.0-absence sentence (R2's strike) | BOOKED (spec, by id) |
| `fr-InfoCard.md:49` | FR-IC-17 · INFO, DISCHARGED-BY-UPLIFT | BOOKED (spec, by id) |
| `fr-InfoCard.md:58` | FR-IC-26 · reader-B miss 3 | BOOKED (spec, by id) |
| `fr-InfoCard.md:43` | FR-IC-7 · MAJOR, RE-KEYED 4→8 | BOOKED (spec, by id) |
| `fr-InfoCard.md:44` | FR-IC-8 · MAJOR | BOOKED (spec, by id) |
| `fr-MobileFloatingToc.md:45` | F-1 = reader-2 missed-6 (the stale-dist evidence base) + D-i2's fresh- | BOOKED (spec, by id) |
| `fr-MobileFloatingToc.md:92` | i-4 = D-i2 | BOOKED (spec, by id) |
| `fr-MorphPhaseConfig.md:59` | MPC-10 · NEW (pass 1), CURE-RIDER | BOOKED (spec, by id) |
| `fr-MorphPhaseConfig.md:67` | MPC-13 · C-5 | BOOKED (spec, by id) |
| `fr-MorphPhaseConfig.md:68` | MPC-14 · C-13 | BOOKED (spec, by id) |
| `fr-MorphPhaseConfig.md:35` | MPC-16 / MPC-21 provenance | BOOKED (spec, by id) |
| `fr-MorphPhaseConfig.md:70` | MPC-16 · D-21 | BOOKED (spec, by id) |
| `fr-MorphPhaseConfig.md:46` | MPC-2 · C-2 ⊕ L-D16 | BOOKED (spec, by id) |
| `fr-MorphPhaseConfig.md:75` | MPC-21 · NEW (pass 1) | BOOKED (spec, by id) |
| `fr-MorphPhaseConfig.md:76` | MPC-22 · NEW (pass 1) | BOOKED (spec, by id) |
| `fr-MorphPhaseConfig.md:91` | MPC-29 · NEW (pass 1) | BOOKED (spec, by id) |
| `fr-MorphPhaseConfig.md:47` | MPC-3 · D-4 ⊕ L-D2 ⊕ C-1 | BOOKED (spec, by id) |
| `fr-MorphPhaseConfig.md:82` | MPC-31 · NEW (reader-1 MISS-1, pass 2 — consequence CORRECTED by this  | BOOKED (spec, by id) |
| `fr-MorphPhaseConfig.md:83` | MPC-32 · NEW (reader-1 MISS-2, pass 2) | BOOKED (spec, by id) |
| `fr-MorphPhaseConfig.md:54` | MPC-5 · C-3 | BOOKED (spec, by id) |
| `fr-MorphShapePreview.md:52` | D-11 ⊕ L-14 ⊕ C-4 | BOOKED (spec, by id) |
| `fr-MorphShapePreview.md:67` | D-20 | BOOKED (spec, by id) |
| `fr-MorphShapePreview.md:71` | D-26 | BOOKED (spec, by id) |
| `fr-MorphShapePreview.md:104` | FR-MSP-12 · r2-missed (library reader) — MINOR — FOLD → FR-COB-26 (new | BOOKED (spec, by id) |
| `fr-MorphShapePreview.md:91` | FR-MSP-4 — the `abbreviation` no-successor — FOLD (carried; SC-1's epo | BOOKED (spec, by id) |
| `fr-MorphShapePreview.md:92` | FR-MSP-5 — FR-COB-13 hop-benefit scope correction — INFO (carried) | BOOKED (spec, by id) |
| `fr-MorphShapePreview.md:57` | L-05 | BOOKED (declared fold or kill) |
| `fr-NotationPills.md:53` | FR-NP-12 · D·M-7 (`.cm-serif` phantom) | BOOKED (spec, by id) |
| `fr-NotationPills.md:54` | FR-NP-13 · L·L-7 ∘ D·m-2 | BOOKED (spec, by id) |
| `fr-NotationPills.md:35` | FR-NP-32 ★NEW · reader-1 M1, reproduced by this seat | BOOKED (spec, by id) |
| `fr-NotationPills.md:43` | FR-NP-5 · C·D-1 | BOOKED (spec, by id) |
| `fr-PaperArticleWindow.md:208` | K-20 | BOOKED (declared fold or kill) |
| `fr-PaperArticleWindow.md:303` | K-24 | BOOKED (declared fold or kill) |
| `fr-PaperArticleWindow.md:42` | PAW-1 · D-B-1/L-1 (family: D-M-1 figcaption ink, D-m-6 proof blocks, D | BOOKED (spec, by id) |
| `fr-PaperArticleWindow.md:89` | PAW-33 · C-i-2 | BOOKED (spec, by id) |
| `fr-PaperArticleWindow.md:93` | PAW-37 · D-S-1/§6 | BOOKED (spec, by id) |
| `fr-PaperArticleWindow.md:99` | PAW-43 · C-i-1 — FOLD → census F.W1 P0 (coverage-gap admission, R-9) | BOOKED (spec, by id) |
| `fr-PaperArticleWindow.md:288` | PAW-51 (LC missed find; PAW-13's class at ~30×; root = PAW-1; kills th | BOOKED (spec, by id) |
| `fr-PaperArticleWindow.md:32` | R-9 | BOOKED (spec, by id) |
| `fr-PaperSearchDropdown.md:23` | 2 | BOOKED (spec, record-qualified) |
| `fr-PaperSearchInput.md:22` | 1 | BOOKED (declared fold or kill) |
| `fr-PaperSearchInput.md:31` | 10 | BOOKED (declared fold or kill) |
| `fr-PaperSearchInput.md:27` | 6 | BOOKED (declared fold or kill) |
| `fr-PaperSearchModal.md:95` | K-6 | BOOKED (spec, by id) |
| `fr-PaperSearchModal.md:63` | PSM-24 = D-14 (LATENT-at-the-adopted-pin, R-3) | BOOKED (spec, by id) |
| `fr-PaperSearchModal.md:76` | PSM-33 = C-13 | BOOKED (spec, by id) |
| `fr-PaperSearchModal.md:79` | PSM-36 = D-17 | BOOKED (spec, by id) |
| `fr-PaperSearchModal.md:20` | R-3 | BOOKED (spec, by id) |
| `fr-PaperSidebar.md:83,116` | C-B1 | BOOKED (carry / §6·R1 roster) |
| `fr-PaperSidebar.md:60` | C-m9 | BOOKED (declared fold or kill) |
| `fr-PaperSidebar.md:33` | L-4 = C-B2 = D-N10 (+M6) | BOOKED (spec, by id) |
| `fr-PaperSidebar.md:34` | L-5(a) = C-M2 = D-B4 | BOOKED (spec, by id) |
| `fr-PaperView.md:69` | C-03 | BOOKED (spec, by id) |
| `fr-PaperView.md:70` | C-06 | **ESCAPED** |
| `fr-PaperView.md:105` | C-13 | BOOKED (spec, by id) |
| `fr-PaperView.md:106` | C-14 | BOOKED (spec, by id) |
| `fr-PaperView.md:107` | C-15 + C-16 | BOOKED (spec, by id) |
| `fr-PaperView.md:125` | C-19 | BOOKED (spec, by id) |
| `fr-PaperView.md:45` | D/B-3 | BOOKED (spec, by id) |
| `fr-PaperView.md:134` | ★MF-12 (LC miss, seat-verified) | BOOKED (spec, by id) |
| `fr-PathPreview.md:55` | PP-COLORSEAM | BOOKED (spec, by id) |
| `fr-PathPreview.md:50` | PP-REDGATE | BOOKED (spec, by id) |
| `fr-SliderControl.md:22` | D §6.3 ("delete SliderControl for LabeledSlider — a 7.0.0 gain dischar | BOOKED (spec, by id) |
| `fr-SliderControl.md:23` | D-1 §0 provenance ("No glass-ui version has ever shipped a `--slider-s | BOOKED (spec, by id) |
| `fr-SliderControl.md:62` | K-1 · D-2 (BLOCKER) | BOOKED (spec, by id) |
| `fr-SliderControl.md:64` | K-3 · D-6/D-8/D-12 uplift clauses | BOOKED (spec, by id) |
| `fr-SliderControl.md:30` | R-1 = D-1/L-§1/C-1 | BOOKED (spec, by id) |
| `fr-SliderControl.md:40` | R-11 = D-12/L-8/C-11 | BOOKED (spec, by id) |
| `fr-SliderControl.md:47` | R-18 = C-10 ∪ D-13/C-6 | BOOKED (spec, by id) |
| `fr-SliderControl.md:113` | Scope-law carry (L-§R → F.W4) | BOOKED (declared fold or kill) |
| `fr-SpeedSelect.md:43` | D §5 U-2 | BOOKED (spec, by id) |
| `fr-SpeedSelect.md:41` | D-03 / D-11 / SS-L-08 / SS-C-4 / SS-C-11 (merged) | BOOKED (spec, by id) |
| `fr-SpeedSelect.md:24` | SS-C-7 identity (speed change re-seeds ping-pong forward) | BOOKED (declared fold or kill) |
| `fr-SpeedSelect.md:74` | The 8.0.0 substrate-drift CLASS (prop breaks behind retained subpaths) | BOOKED (declared fold or kill) |
| `fr-SvgFilters.md:38` | C-M4 (corpus-contradiction half) | BOOKED (declared fold or kill) |
| `fr-SvgFilters.md:64` | C-S3 | BOOKED (spec, by id) |
| `fr-SvgFilters.md:39` | C-i2 | BOOKED (declared fold or kill) |
| `fr-SvgFilters.md:36` | D §3 U-2 | BOOKED (spec, by id) |
| `fr-SvgFilters.md:49` | D §3 U-3 | BOOKED (spec, by id) |
| `fr-SvgFilters.md:43` | L-2 (merged: + reader-1 missed #3 + reader-2 missed #5) | BOOKED (spec, by id) |
| `fr-SvgFilters.md:86` | M-2 | BOOKED (spec, by id) |
| `fr-Tooltip.md:45` | FR-TT-14 = D-13 | BOOKED (spec, by id) |
| `fr-Tooltip.md:33` | FR-TT-5 = D-7 (upgraded) + missed-find 4 | BOOKED (spec, by id) |
| `fr-Tooltip.md:34` | FR-TT-6 = D-8 (a,b,c) | BOOKED (spec, by id) |
| `fr-UserSlugBar.md:62` | FR-USB-22 · L-9 / C-m6 | BOOKED (spec, by id) |
| `fr-UserSlugBar.md:78` | FR-USB-35 · L-15 | BOOKED (spec, by id) |
| `fr-UserSlugBar.md:82` | FR-USB-39 · D §7 (U-1..U-4, 7b, 7c, 7d) ⊕ r2-K4's added row | BOOKED (spec, by id) |
| `fr-VisualizationView.md:111` | D-29 / INF-1 | BOOKED (spec, by id) |
| `fr-VisualizationView.md:57` | L-13 / MAJ-3 / MAJ-4 / D-13(bypass) / D-2 | BOOKED (spec, by id) |
| `fr-VisualizationView.md:60` | MAJ-6 (+ D-3/D-4 folded arms) | BOOKED (spec, by id) |
| `fr-VisualizationView.md:102` | MIN-8 | BOOKED (spec, by id) |

**Machine totals**: 357 routed id-keyed rows — spec 316 · carry 5 · fold/kill 30 · **ESCAPED 6** (+3 recovered by hand off mention/meta lines: `FR-NP-30` `fr-NotationPills:74` · `§4` bypass `fr-VisualizationView:103` · `GM-19` contingency `fr-GalleryMarquee:192`).

---

**Seat verdict: DEFECTIVE** — routed 357 · booked 351 (+5 hand-recovered escapes off meta lines) · **escaped 11** · 2 MAJOR non-census defects (drifted F.W0 quotation coordinates ×4; the ELEVEN-vs-twelve limb count on the roster nine specs cite whole) · 1 MAJOR unflagged owner ruling (`outline`, 30 live sites) · 3 MINOR (self-referential WU-C mis-attribution; the 162 figure outside G7 reconciliation; the §4.2 census spelling R-1f already cured elsewhere) · 2 INFO. PASS-1's 15 escapes are cured; the repair is real and the born-RED witnesses are live-verified. Read-only everywhere except this file.
