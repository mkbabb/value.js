# F-W6 — FRESH ADVERSARIAL SPEC CHECK (L-18/L-20 pass 1)

**Subject**: `/Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W6.md` (217 lines, 66 135 bytes, mtime 2026-08-28 12:20)
**Corpus authority**: the 66 `fr-*.md` adjudicated records at `docs/tranches/V/megatranche/registry/adjudicated/`
**In-tree carries admitted by the trial**: `docs/tranches/X/fourier/carry/F-W1-CARRY.md`, `F-W4-CARRY.md` — **and nothing else**
**Seat**: fresh adversarial reader, static instruments only (greps, whole-file reads, `ls`, `git`), zero browser probes
**Verdict**: **DEFECTIVE**

---

## §0 Method

1. Enumerated every routing token in the 66-record corpus: `grep -oE 'F\.W[0-9]+(\s*[-–—/]\s*(F\.)?W?[0-9]+)?'` → 25 distinct forms.
2. Confirmed the spec's own premise: bare `F.W6` → **0** occurrences corpus-wide. Routing to this wave therefore travels **only** through the `F.W5–W8` span.
3. Enumerated the span in **both dash forms** (the spec measured only one — see D-1).
4. For each span mention, walked back to the enclosing adjudicated row id (bullet head or table row-1 cell).
5. Probed `F-W6.md` for every id, disambiguating short generic ids (`C-3`, `C-5`, `C-7`, `B-1`, `B-2`, `M-9`, `M-10`, `M-13`, `M-15`) by reading the surrounding cell rather than trusting substring hits.
6. Verified every cited authority path, every fourier line anchor sampled, and F.W5's actual clause/gate/ruling registers.

---

## §1 THE ROUTING SURFACE — the spec's census method is structurally blind

| measurement | spec's figure (line 3, line 45, FW6-G17) | this seat's measurement | status |
|---|---|---|---|
| bare `F.W6` in the 66 records | 0 | **0** | CONFIRMED |
| `F.W5-W8` (ASCII hyphen) | 120 occurrences / 26 records | **120 / 26** | CONFIRMED |
| `F.W5–W8` (**U+2013 en-dash**) | *not measured* | **72 occurrences / 24 records** | **MISSED** |
| union of both forms | — | **192 occurrences / 49 records** | — |
| records reachable ONLY through the en-dash form | — | **23** | **MISSED WHOLE** |

The 23 records the spec's grep cannot see:

```
fr-AdminAuditLog     fr-AdminUserList      fr-AnimationControls  fr-App
fr-BasisCanvas       fr-BasisSelector      fr-CanvasControlsDock fr-CanvasOverlayButton
fr-CoefficientsSpectrum fr-CollapsibleSection fr-ContourEditorCanvas fr-ContourSettings
fr-EasingCurvePreview fr-EditorControlsDock fr-EqCoefficientsPanel fr-GalleryAdminBanner
fr-GalleryCard       fr-GlassTimeline      fr-HarmonicLevelGrid  fr-InfoCard
fr-MobileFloatingToc fr-SliderControl      fr-VisualizationView
```

The spec then declares (line 3, verbatim) *"measured at the fold, `grep -o 'F\.W6' … | wc -l` → 0, while `F.W5-W8` → 120 occurrences / 26 records over the 66-record corpus"* and builds its carry **from census §4.7 + the lane-crud SEAM TABLE + intake X-8** in place of the roster. The roster it declined to enumerate is 49 records, not 26 — and `fr-BasisCanvas`, `fr-ContourSettings`, `fr-EditorControlsDock`, `fr-VisualizationView`, `fr-CoefficientsSpectrum`, `fr-SliderControl` and `fr-EasingCurvePreview` all carry server/persistence-contract rows that are exactly this wave's declared mechanism subset.

This is the **K-6 method failure the spec itself quotes** (`§2.5`, verbatim: *"`grep "log_audit("` is structurally BLIND to an inlined second writer — enumerate with the S-8 method law, not the killed one"*). The spec prescribes S-8 enumeration for the subject tree and then uses a single-literal grep on its own corpus.

---

## §2 ID-KEYED CENSUS — 122 routed identities

Legend — **B** = booked (a §2 row, a named ⊕/∘ fold-identity, or a §5 exclusion-with-reason) · **E** = escaped (routed to the span, carried nowhere in `F-W6.md`) · **B\*** = booked only in part, defect noted.

### 2.1 BOOKED — 66

| # | id | record | where booked in F-W6 |
|---|---|---|---|
| 1 | AA-5 | fr-AdminAuditLog | §2.5 (⊕ AA-5 server arm) |
| 2 | AA-10 | fr-AdminAuditLog | §2.5 row |
| 3 | AA-23 | fr-AdminAuditLog | §2.5 ▲ lock + §5 killed-cure list |
| 4 | FR-AFP-1 | fr-AdminFlaggedPanel | §2.4 row (= D3, admission gate) |
| 5 | FR-AFP-4 | fr-AdminFlaggedPanel | §2.2 row |
| 6 | FR-AFP-7 | fr-AdminFlaggedPanel | §2.4 row |
| 7 | FR-AFP-8 | fr-AdminFlaggedPanel | §2.4 (⊕ identity arm) |
| 8 | FR-AFP-9 | fr-AdminFlaggedPanel | §2.4 (⊕ FR-AFP-66) |
| 9 | FR-AFP-10 | fr-AdminFlaggedPanel | §2.4 (⊕ FR-GV-9) |
| 10 | FR-AFP-18 | fr-AdminFlaggedPanel | §2.4 cited + §5 fold |
| 11 | FR-AFP-32 | fr-AdminFlaggedPanel | §2.4 D10 serializer cluster |
| 12 | FR-AFP-33 | fr-AdminFlaggedPanel | §2.4 row |
| 13 | FR-AFP-36 | fr-AdminFlaggedPanel | §2.4 row |
| 14 | FR-AFP-40 / -69 | fr-AdminFlaggedPanel | §5 fold-by-reference |
| 15 | FR-AFP-66 | fr-AdminFlaggedPanel | §2.4 row |
| 16 | FR-AFP-70 | fr-AdminFlaggedPanel | §2.4 (⊕ FR-GV-9) |
| 17 | FR-AFP-71 | fr-AdminFlaggedPanel | §2.4 ⊙ + §5 owner-gated exclusion |
| 18 | M-β4 | fr-BasisCanvas | §2.7 (⊕ PP-DEADSEAM) |
| 19 | M-14 | fr-BasisSelector | §2.6 (⊕ M-13) |
| 20 | D-4 / L-1 / C-3 (+C-28) | fr-CanvasControlsDock | §2.3 B-2 row |
| 21 | C-2 | fr-ContourEditorCanvas | §2.6 M-13 mechanism (overlay-dies clause) |
| 22 | row 28 | fr-ContourPreview | §2.6 header + §5 fold |
| 23 | B-4 = C-1 | fr-ContourSettings | §2.6 row |
| 24 | M-13 | fr-ContourSettings | §2.6 row |
| 25 | m-18 | fr-ContourSettings | §2.6 ▲ rider |
| 26 | i-7 = C-25/R6-8 | fr-ContourSettings | §2.6 fold + §5 |
| 27 | R6-8 (intake, carried via i-7) | fr-ContourSettings/others | §2.6 |
| 28 | L·m-6 = C·D-14 | fr-EquationView | §2.7 (⊕ PP-DEADSEAM) |
| 29 | L-B1 | fr-FourierShapeExtractor | §2.6 G16 row |
| 30 | L-B2 / C-2 | fr-FourierShapeExtractor | §2.6 (⊕) |
| 31 | L-B3 | fr-FourierShapeExtractor | §2.6 (⊕) |
| 32 | L-M3 / C-6 | fr-FourierShapeExtractor | §2.6 cited |
| 33 | L-M5 / C-5 | fr-FourierShapeExtractor | §2.6 cited |
| 34 | C-7 | fr-FourierShapeExtractor | §2.6 cited |
| 35 | C-15 | fr-FourierShapeExtractor | §2.6 cited (C-5+C-15) |
| 36 | L-m3 / C-10 | fr-FourierShapeExtractor | §2.6 cited |
| 37 | L-m5 | fr-FourierShapeExtractor | §2.6 cited |
| 38 | C-1-as-corrected | fr-GalleryCard | §2.9 (⊕ FR-GFC-3) |
| 39 | L·M-4 / D-13 / C-8(a) | fr-GalleryCard | folds to FR-AFP-32 + FR-AUL-17, both named |
| 40 | GCM-1 | fr-GalleryCardModal | §2.8 cited + §5 exclusion |
| 41 | GCM-2 | fr-GalleryCardModal | §2.9 (⊕) + §5 |
| 42 | GCM-52 | fr-GalleryCardModal | §2.2 (⊕) + §5 |
| 43 | GCM-55 | fr-GalleryCardModal | §2.4 cited + §5 |
| 44 | B-2 | fr-GalleryDraftsSection | §2.3 row |
| 45 | F-4 | fr-GalleryDraftsSection | §2.2 (⊕) |
| 46 | m-15 | fr-GalleryDraftsSection | §2.2 (⊕) |
| 47 | FR-GFC-3 | fr-GalleryFeaturedCarousel | §2.9 row |
| 48 | FR-GFC-4 | fr-GalleryFeaturedCarousel | §5 → F.W8 |
| 49 | FR-GFC-20 | fr-GalleryFeaturedCarousel | §2.4 cited (stale-slug row → F.W4) |
| 50 | C-3 (GIG) | fr-GalleryInfiniteGrid | §2.9 FOLD + §5 |
| 51 | GM-M4 | fr-GalleryMarquee | §2.7 (⊕) |
| 52 | FR-GV-1 | fr-GalleryView | §2.3 FOLD + §5 |
| 53 | FR-GV-8 | fr-GalleryView | §5 → F.W8 |
| 54 | FR-GV-9 | fr-GalleryView | §2.4 row |
| 55 | FR-GV-12 | fr-GalleryView | §2.3 row |
| 56 | FR-GV-13 | fr-GalleryView | §4/§5 client arm (`?owner=me`) — **B\***, server arm dropped |
| 57 | FR-GV-24 | fr-GalleryView | §2.3 ▲ cure lock |
| 58 | FR-GV-27 | fr-GalleryView | §5 → F.W8 |
| 59 | FR-GV-34 | fr-GalleryView | §2.4 (⊕ FR-AFP-66) |
| 60 | row 26 | fr-ImageUpload | §2.2 cited + §5 |
| 61 | PP-DEADSEAM | fr-PathPreview | §2.7 row |
| 62 | SS-C-1 (write leg) | fr-SpeedSelect | §2.1 row |
| 63 | SS-C-1 (read leg) | fr-SpeedSelect | §5 exclusion → GCM-1/F.W4 |
| 64 | FR-USB-15 | fr-UserSlugBar | §5 → F.W8 |
| 65 | FR-USB-23 | fr-UserSlugBar | §5 → F.W8 |
| 66 | FR-USB-24 | fr-UserSlugBar | §5 → F.W8 |
| — | VV-R2-A | fr-VisualizationView | §2.3 cited (client arm to F.W4) |
| — | VV-R2-B | fr-VisualizationView | §2.7 + §4 + §5 |

(VV-R2-A / VV-R2-B counted inside the 66; table numbering elides them for width.)

### 2.2 ESCAPED — 56, named by bytes

Every row below carries a **terminal disposition into the `F.W5–W8` span** in an adjudicated record, and appears **nowhere** in `F-W6.md` — not as a row, not as a ⊕/∘ fold, not as a §5 exclusion. Probe used: `grep -c -- '<id>' F-W6.md` → 0, with generic-token hits hand-disambiguated.

| # | id | record | routed cure (registry, verbatim-abridged) | why the escape convicts |
|---|---|---|---|---|
| 1 | **BC-9 / C-6 / D-20** | fr-BasisCanvas:55 | *"ADJUDICATED → F.W5–W8 (settings round-trip is a persistence-contract row)"* | F.W5's clause **E8** names it explicitly; F-W6 lists E8 in its own §4 "GREEN owner is F.W6" set and carries no AnimationSettings row |
| 2 | **SS-C-2** | fr-SpeedSelect:45 | *"→ F.W5-W8"* — atom 4 semantically empty (`fps`/`max_circles`/`duration` zero cross-wire readers) | F.W5 **E8** dedupes SS-C-2 and BC-9 as ONE identity; F-W6 books SS-C-1 from the same record and drops its sibling |
| 3 | **C-7** | fr-BasisCanvas:58 | *"Entity `animation_data` is written/read by nobody. ADJUDICATED → F.W5–W8"* | F.W5 clause **E9** ("One shape, one name"); pure server contract |
| 4 | **C-5** | fr-BasisCanvas:57 | *"→ F.W5–W8 with that row"* (R6-8 census fold) | F.W5 clause **B1** |
| 5 | **C-17** | fr-BasisCanvas:102 | *"→ F.W5–W8 rider"* (unconditional overlay fetch then refusal) | F.W5 clause **E15** (ONE transport clause) |
| 6 | **C-18** | fr-BasisCanvas:103 | *"→ F.W5–W8 rider"* (`/api/api/…` under Dockerfile default) | F.W5 clause **E15** |
| 7 | **M-9** | fr-BasisSelector:58 | *"admit it in the contract, or stop minting it … → F.W5–W8 (R6-8 seam, cardinality axis)"* | ⊙ **owner ruling R5** in F.W5 §2a — F-W6's FW6-G18 ruling roster omits it entirely |
| 8 | **m-7** | fr-BasisSelector:73 | *"Constructive cure: generate client bounds from the operation models. → F.W5–W8"* | F-W6 §5 carries only m-7's **killed** 422-straddle arm; the live MINOR row and its cure are dropped |
| 9 | **B-1** | fr-ContourSettings:40 | *"the typed range-checked descriptor table for all six fields rides an F.W5–W8 rider"* | F.W5 clause **D7**; BLOCKER at its register |
| 10 | **R-16 = C-3** | fr-SliderControl:45 | folds to ContourSettings, *"already banked there as the F.W5–W8 rider"* | BLOCKER-as-banked; its carrier (#9) also escaped |
| 11 | **M-10** | fr-ContourSettings:67 | *"the shared-enum contract itself is an F.W5–W8 rider"* | F.W5 clause **D12** |
| 12 | **M-15** | fr-ContourSettings:72 | *"+ F.W5–W8 rider (server: a problem+json handler for HTTPException)"* | server-side error envelope — F-W6's declared mechanism subset |
| 13 | **M-13 = C-7** | fr-CoefficientsSpectrum:65 | *"→ F.W5–W8 (an operation's response model must be stated)"* | **id collision**: F-W6's `M-13` is the ContourSettings row; the Spectrum `M-13` is a distinct banked identity and is unrepresented |
| 14 | **FR-CP-16 = C-17 / L/A-3** | fr-CoefficientsPanel:48 | *"→ F.W5-W8 (the enforcement point — validate-at-boundary for the epicycle payload)"* | F.W5 gate **G17** (boundary-validation evenness) |
| 15 | **FR-FG-13 = C-9** | fr-FrequencyGraph:48 | *"→ F.W5-W8 (validate/brand the ordering at the boundary)"* | same clause family |
| 16 | **FR-FG-21** | fr-FrequencyGraph:59 | *"→ F.W5-W8 (bound the model with its siblings)"* | F.W5 clause **D7** |
| 17 | **FR-EQC-8 = C-11** | fr-EqCoefficientsPanel:45 | *"→ F.W5–W8 (one adapter, both directions)"* | wire-contract row |
| 18 | **RESOLVER (D-10·L-4·C-D-4)** | fr-EasingCurvePreview:59 | *"+ F.W5–W8 (hoist the union to the operation record as `Literal[…]`)"* | F.W5 clause **E11** — F-W6 mis-uses the label E11 for contour provenance and never carries E11's actual rows |
| 19 | **L/M-3** | fr-EasingPicker:65 | *"Server half (Literal/enum on `AnimationSettings.easing`, shared.py:69): F.W5-W8 — new booking, the CRUD/provenance union owns the model"* | explicitly a **new server-model booking**; the union's own words |
| 20 | **MISSED-E (save-race)** | fr-EasingPicker:88 | *"F.W5-W8 (persistence semantics)"* | F.W5 clause **E12** — F-W6 mis-uses E12 for cache identity |
| 21 | **D-12 / C-4 / C-5** | fr-EditorControlsDock:59 | *"F.W5–W8 rider: C-7's idempotency channel at the same seam"* | F.W5 clause **E5**, the same clause F-W6 burns as B-2 |
| 22 | **C-6 / C-7** | fr-EditorControlsDock:60 | *"F.W5–W8 — instantiates intake R3-7b (security 0-of-45) at this operation"* | F.W5 clause **C1**; F-W6 quotes "0 of 45" while dropping the row that instantiates it |
| 23 | **D-L5 + C-1** | fr-EquationPanel:48 | *"full-payload re-upload vs the 5/60s compute limiter; two-slot hardening — F.W5-W8"* | F.W5 clause **C4** |
| 24 | **B-1** | fr-EquationView:47 | *"F.W5-W8 — `latex_sigma` joins `SimplifyResponse` on both models"* | contract row |
| 25 | **B-2** | fr-EquationView:48 | *"+ F.W5-W8 — one shared bound constant across the seam"* | contract row |
| 26 | **C·D-02** | fr-EquationView:56 | *"+ F.W5-W8 — the problem+json envelope on `/api/equations/*`"* | server envelope |
| 27 | **M-CK** | fr-EquationView:71 | *"+ F.W5-W8 note (the key IS the client's statement of the operation's identity)"* | F.W5 clause **B1** |
| 28 | **M-SB** | fr-EquationView:112 | *"F.W5-W8 — one `max_length`"* | one-line server model change |
| 29 | **M-DV** | fr-EquationView:113 | *"F.W5-W8 — pydantic `model_validator`"* | one-line server model change |
| 30 | **L-M1 (+44.08 arm)** | fr-FourierShapeExtractor:53 | *"F.W5-W8 — closure flag + wrap at extraction (one cure with C-3)"* | inside the geometry pipeline F-W6's §2.6 claims whole |
| 31 | **C-3** | fr-FourierShapeExtractor:54 | *"F.W5-W8 (one change with L-M1)"* | same |
| 32 | **C-4** | fr-FourierShapeExtractor:55 | *"F.W5-W8 — contract doc or uniform post-pass"* | same |
| 33 | **L-M2** | fr-FourierShapeExtractor:72 | *"→ F.W5-W8"* | same |
| 34 | **M-7** | fr-FourierShapeExtractor:85 | *"Correct guard: `!(totalLen >= 1)`. → F.W5-W8"* | same |
| 35 | **M-8** | fr-FourierShapeExtractor:86 | *"→ F.W5-W8 (same cure)"* | same |
| 36 | **M-9** | fr-FourierShapeExtractor:87 | *"→ F.W5-W8"* | same |
| 37 | **M-11** | fr-FourierShapeExtractor:88 | *"→ F.W5-W8"* | same |
| 38 | **C-14** | fr-FourierShapeExtractor:90 | *"→ F.W5-W8"* | same |
| 39 | **L-B1** | fr-FunctionInput:38 | *"+ F.W5-W8 (one shared bound constant)"* | distinct from FSE's L-B1 — **second id collision** |
| 40 | **L-M3** | fr-FunctionInput:53 | *"MAJOR — F.W4 (copy) + F.W5-W8 (seam)"* | F.W5 clause **F6**; distinct from FSE's L-M3 — **third id collision** |
| 41 | **C-8** | fr-FunctionInput:69 | *"MINOR — F.W5-W8"* (Harmonics `:max="100"` forfeits half the operation range) | server-domain row |
| 42 | **N-4** | fr-FunctionInput:73 | *"MINOR — F.W5-W8 + AMENDMENT RELAY"* | carries a relay obligation F-W6 does not emit |
| 43 | **GAB-12 · C-7** | fr-GalleryAdminBanner:51 | *"→ F.W5–W8 (generated client / runtime boundary), test seam with AA-44"* | F-W6 quotes GAB-**13** as substrate and drops GAB-**12** |
| 44 | **D-7 / C·I-2** | fr-GalleryCard:52 | *"ADJUDICATED → F.W5–W8 (CRUD-union seam)"* | F.W5 clause **E4** names D-7 in the born-visibility identity; F-W6's §2.8 R-5/G5 row omits it |
| 45 | **GCM-10 · D-07/L-5/C-3** | fr-GalleryCardModal:56 | *"+ F.W5-W8 (a `tier` field with a default on the model — the serialization-bypass family)"* | F-W6 names GCM-10 **only** to strike its dangling "MF-9" cite; the routed server cure is dropped, and GCM-55 (booked) is explicitly *"with GCM-10's model fix"* |
| 46 | **FR-GFC-1 = D-1/C-3 ⊕ MISS-1(DU)** | fr-GalleryFeaturedCarousel:32 | *"+ F.W5-W8 rider (the list contract owns whether search/tier/basis become real)"* | blocker-weight; F.W5 clause **D10** |
| 47 | **C-4 / D-13** | fr-GalleryInfiniteGrid:51 | folds to FR-GFC-1 + FR-GFC-4; the FR-GFC-1 leg is unhomed | carrier escaped |
| 48 | **FR-GSB-1** | fr-GallerySearchBar:30 | *"FOLD → FR-GFC-1 (F.W4) + FR-GFC-4 (list contract → F.W5-W8)"* | carrier partially escaped |
| 49 | **FR-GSB-28** | fr-GallerySearchBar:68 | *"MINOR → F.W5-W8"* (shared abort key) | F.W5 clause **B1** |
| 50 | **C-2 grade WAVE-LOCK** | fr-GallerySearchBar:24 | *"carried as a **WAVE-LOCK** on any F.W5-W8 wiring of `basisFilter` — wire it without the banked normaliser and the mismatch ships"* | a **cure-integrity lock binding the span** — M-25 requires locks CARRIED, not dropped |
| 51 | **FR-GV-7 = M-9/C·M-9** | fr-GalleryView:43 | *"→ F.W3/W4 + F.W5-W8 rider (token-transport contract)"* | F.W5 clause **C3** |
| 52 | **FR-AH-6 · C-6** | fr-AppHeader:52 | *"+ F.W5-W8 rider (the admin-auth seam owns which predicate is canonical)"* | F.W5 clause **C3** |
| 53 | **FR-IC-6** | fr-InfoCard:42 | *"→ F.W4 + F.W5–W8"* | unhomed |
| 54 | **BLK-1** | fr-VisualizationView:45 | *"→ F.W4 + F.W5–W8 rider"* | F-W6 §2.3 names BLK-**2** as folded and never BLK-1 |
| 55 | **SS-L-07 / SS-C-10** | fr-SpeedSelect:59 | *"F.W4 (+ its type reaches the F.W5-W8 wire rows)"* | rider to the wire rows F-W6 owns |
| 56 | **C-30** | fr-AnimationControls:123 | *"fold by reference — identity stays with R6-8's F.W5–W8 carry"* | R6-8's carry is booked only through i-7's cache-identity leg; C-30's join-ambiguity leg is unhomed |

**Escape density**: 56 of 122 = **46 %**. Of the 56, **51** originate in the 23 records the spec's single-form grep could not reach (§1), and **5** (GCM-10, FR-GFC-1, FR-GSB-1, D-7, BLK-1) sit in records the spec *did* read and still dropped.

### 2.3 NEGATIVE ROSTER — routed, and not carried either

Six records declare an explicit **zero** to the span. They are the only operand that can bound a set-difference from below, and `F-W6.md` cites none of them:

| record | declaration (verbatim) |
|---|---|
| fr-App:144 | *"**Nothing routes → F.W5–W8**: App's coupling budget is spent entirely on the CSS-token↔parser seam"* |
| fr-CollapsibleSection:131 | *"F.W5–W8 gets nothing — the component is API-inert, and that negative is recorded"* |
| fr-MobileFloatingToc:97 | *"**F.W5–W8 gets nothing**"* |
| fr-PaperSearch:90 | *"**F.W5-W8 empty** (measured zeros)"* |
| fr-PaperSearchDropdown:77 | *"**F.W5-W8 = no rows.**"* |
| fr-PaperSearchInput:125 | *"**F.W5-W8 empty** (the banked zeros hold)"* |
| fr-MorphShapePreview:110 | *"preserved so no F.W5-W8 row manufactures overlap"* |

Without them **FW6-G17's "set-difference runs both directions" is unrunnable** — the gate has no negative control and no roster, only the spec's own §2+§5 as both operands.

---

## §3 NO INVENTION / M-25 DEPTH — the anti-rename axis fails

### D-A. The **F.W6 CARRY does not exist** — the spec's whole provenance claim is over a phantom

Line 3, verbatim: *"Opus-drafted, **fresh-Fable FOLD-VERIFIED** (M-23) 2026-08-28 — verified row-for-row against the **F.W6 CARRY**, consumed **whole**: 24 rows · 19 gates · 13 cross-edges · zero silent drops"*. Line 31: *"**Bounds reconciliation vs the CARRY `boundsFiles`**: all five adopted verbatim, zero additions"*.

```
$ ls docs/tranches/X/fourier/carry/
F-W1-CARRY.md
F-W4-CARRY.md
$ find docs -iname '*W6*CARRY*' -o -iname '*CARRY*W6*'
docs/tranches/X/keyframes/carry/KF-W6-CARRY.md      # keyframes corpus, not fourier
```

There is **no F.W6 CARRY**. Every "consumed whole / zero silent drops / row-for-row" claim, the bounds reconciliation, and **FW6-G17's entire GREEN operand** (*"every CARRY id lands in §2 or §5"*) rest on a ledger that is not in the tree. The counts (24/19/13) are internally consistent with the file itself and with nothing else.

### D-B. F.W5 clause ids are systematically mis-cited — six wrong, one phantom

Measured against `F-W5.md` §2 clause tables:

| F-W6 says | F-W6 uses it for | F.W5's actual clause | F.W5's actual id |
|---|---|---|---|
| "clause **E8**" (×4: §2.1 F-β, §2.1 SS-C-1, FW6-G2, §4) | PATCH atom coverage + `set_hash` recompute | `E7` PATCH atom coverage + `set_hash` recompute — **F-β ⊕ SS-C-1 write leg** | **E7** |
| — | — | F.W5's real **E8** = *AnimationSettings — the three-way reconciliation* (**BC-9/C-6/D-20 ⊕ SS-C-2**) | carried **nowhere** in F-W6 |
| "F.W5 **E12** states the superset clause" (§2.6 B-4) | cache identity ⊇ consumed fields | `E13` Cache identity ⊇ consumed fields — B-4 ∘ C-25/R6-8 ⊕ i-7 ⊕ m-18 | **E13** |
| — | — | F.W5's real **E12** = *Debounced mirror vs synchronous save* (MISSED-E) | escaped (§2.2 #20) |
| "F.W5 **E11**/G14/G15 state" (§2.6 M-13) | contour provenance + bounds on write | `E14` contour provenance ‡ · `E17` image bounds on write ‡ | **E14 + E17** |
| — | — | F.W5's real **E11** = *Easing domain hoisted to the operation* (RESOLVER ⊕ L/M-3) | escaped (§2.2 #18, #19) |
| "F.W5 **D12** states which identifier a human-facing surface may render" (§2.4 FR-AFP-7) | identifier rendering | `D5` Which identifier a human-facing surface may render (FR-AFP-8) | **D5** |
| — | — | F.W5's real **D12** = *Closed domains at the boundary* (M-10 · M-9) | escaped (§2.2 #7, #11) |
| "**D10** serializer" (§2.4) + FW6-G12 | one serializer / one checked shape | `D17` Date serialization — serializer arm only (FR-AFP-32/-40/-69) | **D17** |
| — | — | F.W5's real **D10** = *The list contract — filters and windows* (FR-GFC-4 · FR-GV-13 · FR-GFC-1) | partially escaped |
| "the hard-delete-arm caller decision sits in F.W5's owner block (**E7**)" (§2.4 FR-AFP-66) | lifecycle / cascade | `D6` Lifecycle truth and cascade — owner ruling **R6** | **D6 / R6** |
| "**F.W5 D9**/D4 state; F.W6 burns" (§2.5 AA-10) · "composes with F.W5 **D9**" (§2.10 V-γ) · §4 cross-edge list | the audit actor | `grep -n '\*\*D9\*\*' F-W5.md` → **no output. F.W5 has no D9 clause** (the table runs D1–D8, D10–D17). The actor clause is **E18** *Attribution — the actor is a FIELD* (AA-10 + lane-crud R-7 / V-γ) | **E18**; "D9" in F.W5 is an *owner-ruling* label inside R8, not a clause |

M-25's anti-rename law — *every carried row traces to a banked id* — fails at the clause layer: the spec re-labels six of F.W5's clauses and invents a seventh, and in four of the six cases the **real** clause's rows are precisely the ones that escaped.

### D-C. The "declared gate gap" is stated against the wrong register

F-W6 (§2.1 F-β sequencing cell, FW6-G2 witness, §4 F.W5 edge): *"F.W5's **G1–G20** carries NO gate for clause **E8**"*.
`F-W5.md:212` — *"## 3. Gates — **22**, all born-RED"*; ids run **G1…G22** plus §G's `G1c…G10c`.
The gap itself is real (no F.W5 gate covers `E7`), but it is asserted over a mis-counted range and a mis-labelled clause. A gate-gap claim that mis-names both the gate range and the clause cannot be checked by the reader it is written for.

### D-D. Two owner rulings are dropped from FW6-G18's roster

`F-W5.md` §2a books **nine** rulings owed, R1–R9. FW6-G18 books **seven** — *"G4 · G7 · G10 · G11 · G5 · E7 · FR-AFP-71 — plus intake OG-F1 / OG-F2"* (and labels two of them by the wrong ids: born-visibility is **R8/E4**, the hard-delete arm is **R6/D6**). Missing entirely:

- **R5** — *off-state `[]` admission* (M-9, D12): *"admit it in the contract or stop minting it — the silent rewrite must not survive either branch."* Its row (§2.2 #7) also escaped.
- **R9** — *delete-or-wire the dead session subsystem* (FR-USB-23, C3). F-W6 routes FR-USB-23 to F.W8 in §5 **without carrying its ⊙ owner-gate**, so a wave that reads only F-W6 will wire or delete an unruled subsystem.

Posture axis 5 requires SS-4 waves to *flag owner rulings INLINE, never presume them*. Two are neither flagged nor presumed — they are absent.

### D-E. Cure-shape locks: three carried well, two lost

**Carried correctly and verbatim** (credit where due): the paper register's same-commit riders — *"fr-PaperSearchModal D-1+D-3+outline:none · PAW-44/LAW-3 restore-only-with-background-cure · MPC-31/MPC-3⊕10⊕13⊕8⊕22 one-cut law · FR-MSP-6 two-channel lock"* (§5, line 210), travelling with rows that do not land here; the F-β ⊕ SS-C-1 **ONE-CUT LAW**; the F-γ ⊕ FR-AFP-4 privacy one-cut; the FR-AFP-66 ⊕ FR-AFP-33 compose-lock; the FR-GV-24 no-re-open-increment lock; K9 / K12 / K-1 / K-6 / AA-23 / SE-05 / β-428 killed-cure register; the DO-NOT-REGENERATE TRIPWIRE.

**Lost**:
- The **fr-GallerySearchBar C-2 WAVE-LOCK** (§2.2 #50) — the only lock in the corpus that binds *"any F.W5-W8 wiring"* by name. Its absence lets a burn seat wire `basisFilter` without the banked normaliser, which is the exact failure the lock exists to stop.
- **m-7's live arm** — F-W6 §5 carries the *killed* 422-straddle and drops the *surviving* MINOR row plus its constructive cure ("generate client bounds from the operation models"). A killed sub-claim is carried; the row it was killed inside is not.

### D-F. F.W4's derivation-law preamble + NEGATIVE ROSTER: absent

`F-W4-CARRY.md` and the F.W4 idiom carry a derivation-law preamble and an explicit NEGATIVE ROSTER. F-W6 has neither: no derivation law stating how a span row becomes an F.W6 row (§2.0's "mechanism subset" is a sentence, not a rule with a decision procedure), and no negative roster (§2.3 above). FW6-G17 is the gate that needs both and has neither.

---

## §4 GATES — 19, born-RED, witnesses mostly REAL

Verified against the live trees (read-only; zero writes):

| check | result |
|---|---|
| `/Users/mkbabb/Programming/fourier-analysis` exists | **YES** |
| `git -C $F rev-parse --short=8 HEAD` | **`cd26c653`** — matches FW6-G19 exactly |
| `git -C $F status --porcelain \| wc -l` | **28** — matches FW6-G19 exactly |
| `visualizations.py:138-141` = `parent_hash=None / forked_from_hash / root_hash=set_hash_value / depth=0` | **CONFIRMED verbatim** |
| `visualizations.py:220` = `await _write_root_version(` | **CONFIRMED** |
| `visualizations.py:381-383` = `updates = {… if v is not None}` + bare `$set` | **CONFIRMED verbatim** |
| `visualizations.py:744` `_readable_or_none` (entry) vs `:784` bare `find_one` (ancestor walk) | **CONFIRMED both** |
| `janitor.py:56` `_JANITOR_ACTOR = "system:janitor"` · `:95` `"ip_hash": _JANITOR_ACTOR` | **CONFIRMED verbatim** |
| `grep -rn "def order_contours" $F` → 0 (FW6-G15) | **CONFIRMED — 0** |
| `$F/.gitignore:53` = `scripts/*` (FW6-G15) | **CONFIRMED verbatim** |
| `ls $V/api/src/lib` → No such file (FW6/TA-4) | **CONFIRMED** |
| `grep -rln "atomdiff\|atomDiff" $V/api/src $V/src` → 1 test-comment hit | **CONFIRMED** (`api/src/modules/palette/__tests__/palettes-forks.test.ts`) |
| `git diff --stat -- api/src src` → empty (FW6-G16) | **CONFIRMED empty** |
| `OWNER-RULINGS-F.W5.md` does not exist (FW6-G18) | **CONFIRMED — no `waves/F-W5/` dir at all** |
| bounds #2 / #3 / #4 are to-be-created **with paths** | **CONFORMANT** — L-19 satisfied on shape |
| no proof-farm scripts, no `proof:*` idiom, no descriptive invocation | **CONFORMANT** |

**This axis largely HOLDS.** The witnesses are real, the anchors resolve, born-RED is honest, and FW6-G15 is correctly declared *"stays RED by design"*. Three defects remain:

- **FW6-G17 cites a phantom operand** (the F.W6 CARRY, §3 D-A). The gate as written cannot detect the 56 escapes because both its operands are the spec's own §2 and §5.
- **§1's read-only bounds mix path roots.** `formation/fourier/{CENSUS-2026-08-03.md, lane-crud.md}`, `audit/codex-provenance/{…}` and `intakes/lane-fourier-r3-r6.md` are written unprefixed; they resolve only under `docs/tranches/V/megatranche/` (verified present there). More seriously, `docs/tranches/J/design/J-diff-shape.md` is written **fully qualified** and does not exist in value.js (`git log --all --` → empty); it exists at `/Users/mkbabb/Programming/fourier-analysis/docs/tranches/J/design/J-diff-shape.md` — i.e. inside the tree §1 declares "**Explicitly NOT in bounds** … whole tree, read-only law". The spec's named IMMUTABLE authority sits in the tree it forbids itself, under a value.js-shaped path.
- **§1's bounds reconciliation is now a stale witness.** *"Measured at the fold (2026-08-28): `docs/tranches/X/fourier/waves/` holds `F-W2.md F-W3.md F-W4.md F-W5.md F-W8.md F-W9.md F-W10.md`"* — the directory today holds **eleven** files including `F-W0.md`, `F-W1.md`, `F-W6.md`, `F-W7.md`. A bounds reconciliation whose enumeration is falsified by `ls` is not a reconciliation.

---

## §5 E-3 + STATUS — HOLDS, with one contamination

| requirement | finding |
|---|---|
| zero VERIFIED stamps | **HOLDS in the four-verb block** — line 9: *"IMPLEMENTED **NO** · VERIFIED **NO** … no wave stamps VERIFIED at its own close"* |
| status planned everywhere | **HOLDS** — line 3 `status: planned`; line 9 *"status stays `planned`"*; §5 *"Any … status advance beyond `planned`"* excluded |
| no execution verbs in current voice | **HOLDS** — §1 *"Owned (writes happen only at execution, post begin-word)"*; §4 *"Nothing in this wave opens product source in either repo"* |
| the spec opens no product source | **HOLDS** — all product-source anchors are quoted from the registry under MEASURE-AT-OPEN; §3 declares *"this file re-asserts none of them"* |
| the fourier tree stays READ-ONLY in every witness | **HOLDS** — Binding law 1, §1 NOT-in-bounds, the fourier cross-edge row, and §5 *"Every fourier-tree write → COMMISSION §2"*. This seat's own probes were read-only and confirm zero fourier bytes moved |
| E-3 addenda-not-patch | **HOLDS** — J-diff-shape v1 is declared IMMUTABLE and superseded by reference (though the path is wrong, §4) |
| **contamination** | line 3 stamps *"**fresh-Fable FOLD-VERIFIED** (M-23) … **verified** row-for-row against the F.W6 CARRY, consumed **whole** … **zero silent drops**"*. This is a verification claim, in current voice, over a nonexistent artefact, asserting the exact property (§2.2) that fails at 46 %. It is not a `VERIFIED` status stamp, but it is a false verification receipt in the header where a reader looks for provenance |

---

## §6 POSTURE AXES

| axis | finding |
|---|---|
| **F.W1 ONE atomic land-or-lose** | **PARTIAL — MAJOR.** §4 lock 5 states *"F.W1 stays ATOMIC land-or-lose — producer bump + 162-site prop rewrite + copied→status triple in ONE change, else four zero-console-error e2e gates go red (FR-EQR-3)"*, and the reciprocal FR-GIG-5 non-credit law both directions. But the transaction's other three limbs — **the vaul-vue manifest gate INSIDE the transaction**, **the RE-PIN act at the adopted commit hash**, and **the P0 CSS-class census** — are named nowhere in F-W6. A downstream seat quoting F-W6's restatement of the lock could land the manifest gate or the re-pin separately and believe itself conformant |
| **F.W0 pre-gates precede everything; its anchor table is what later waves quote** | **HOLDS.** §4 lock 1; FW6-G19; the F.W0 cross-edge (**DEPENDS — HARD**); *"F.W0 failing to re-ground HALTS this wave — it does not proceed on stale bytes"*; every §2 anchor marked MEASURE-AT-OPEN under D-19 |
| **SS-4 flags owner rulings INLINE, never presumes** | **PARTIAL — MAJOR.** ⊙ marks are used inline and consistently; FW6-G18 exists and forbids burning a conditioned row unruled; §5 excludes *"Owner rulings themselves"*. **But** the roster is 7-of-9 (D-D above), two labels are wrong, and FR-USB-23's ⊙ is stripped when the row is routed to F.W8. Presumption is avoided; **completeness is not achieved** |
| **F.W10's SPLIT gate stays honestly split** | **NOT BOUND HERE** — F-W6 makes no claim on F.W10 beyond emitting coverage obligations (AA-44, FR-AFP-49, G2's absent history test, G5's create-visibility tests). No encroachment found |
| **F.W5 STATES / F.W6 BURNS, no double-booking** | **HOLDS in direction A, UNPROVEN in direction B.** No row this seat found is credited to both F.W6 and another wave. The reverse direction — every span row lands somewhere — fails at 56 rows (§2.2) |

---

## §7 DEFECT REGISTER — ranked

| # | severity | claim | receipt |
|---|---|---|---|
| 1 | **BLOCKER** | The census is built on a single-literal grep that is blind to the U+2013 span form; 23 of the 49 routing records are unreachable by the spec's own method | spec line 3 *"`F.W5-W8` → 120 occurrences / 26 records"*; measured `F.W5–W8` → **72 / 24**, union **192 / 49**; 23 records en-dash-only |
| 2 | **BLOCKER** | 56 of 122 span-routed identities (46 %) are carried nowhere — not a row, not a fold, not an exclusion. The spec's own §2.0 law: *"a span row cut nowhere is a silent drop"* | §2.2 table, id-for-id, each with its registry line and verbatim routing |
| 3 | **BLOCKER** | The provenance ledger the spec claims to have consumed **whole** does not exist; FW6-G17's GREEN operand is a phantom | line 3 *"verified row-for-row against the F.W6 CARRY, consumed whole"*; `ls carry/` → `F-W1-CARRY.md F-W4-CARRY.md` only |
| 4 | **BLOCKER** | F.W5 clause ids are systematically re-labelled — E7→"E8", E13→"E12", E14/E17→"E11", D5→"D12", D17→"D10", D6→"E7" — and **D9 is invented** (F.W5 has no D9; the actor clause is E18) | `grep -n '^\| \*\*E[0-9]' F-W5.md` lines 138-157; `grep -n '\*\*D9\*\*' F-W5.md` → no output |
| 5 | **BLOCKER** | F.W5's real **E8** (AnimationSettings three-way reconciliation, **BC-9/C-6/D-20 ⊕ SS-C-2**, *"the union owns the reconciliation including the unit fork, with server-side units stated"*) is listed in F-W6's own §4 as a clause whose GREEN owner is F.W6 — and no §2 row carries it | `F-W5.md:145`; F-W6 line 179 clause list; F-W6 `grep -c 'BC-9'` → 0, `grep -c 'SS-C-2'` → 0 |
| 6 | **MAJOR** | Two owner rulings dropped from FW6-G18: **R5** (off-state `[]` admission, M-9/D12) and **R9** (dead session subsystem, FR-USB-23/C3); two more are labelled by the wrong ids | `F-W5.md` §2a R1–R9 vs F-W6 line 150's seven |
| 7 | **MAJOR** | Nine fr-FourierShapeExtractor rows routed to the span (L-M1, C-3, C-4, L-M2, M-7, M-8, M-9, M-11, C-14) escape while §2.6 claims the geometry pipeline whole under the TRIPWIRE | fr-FourierShapeExtractor:53,54,55,72,85,86,87,88,90; F-W6 `grep -c 'L-M1\|L-M2\|C-14\|M-11'` → 0 |
| 8 | **MAJOR** | The fr-GallerySearchBar **C-2 WAVE-LOCK** — the corpus's only lock binding *"any F.W5-W8 wiring"* by name — is not carried; M-25 requires locks carried, not cited | fr-GallerySearchBar:24 verbatim; F-W6 `grep -c 'WAVE-LOCK'` → 0 |
| 9 | **MAJOR** | Three id collisions unguarded: `M-13` (ContourSettings booked / CoefficientsSpectrum escaped), `L-B1` (FSE booked / FunctionInput escaped), `L-M3` (FSE booked / FunctionInput escaped). The spec's "every banked id keeps its identity for life" alias law has no record-qualifier | F-W6 line 5 alias law; fr-CoefficientsSpectrum:65, fr-FunctionInput:38, fr-FunctionInput:53 |
| 10 | **MAJOR** | GCM-10 is named **only** to strike its dangling "MF-9" cite; its routed server cure (*"a `tier` field with a default on the model"*) is dropped — while booked GCM-55's cure is explicitly *"with GCM-10's model fix"* | fr-GalleryCardModal:56, :111; F-W6 line 186 |
| 11 | **MAJOR** | The NEGATIVE ROSTER (7 records declaring an explicit zero to the span) is not carried, so FW6-G17's *"set-difference runs both directions"* has no lower-bound operand | fr-App:144, fr-CollapsibleSection:131, fr-MobileFloatingToc:97, fr-PaperSearch:90, fr-PaperSearchDropdown:77, fr-PaperSearchInput:125, fr-MorphShapePreview:110 |
| 12 | **MAJOR** | F.W1's atomic transaction is restated with three limbs missing: the vaul-vue manifest gate inside the transaction, the RE-PIN at the adopted commit hash, the P0 CSS-class census | F-W6 §4 lock 5 |
| 13 | **MAJOR** | The "declared gate gap" is asserted over the wrong register: *"F.W5's G1–G20"* — F.W5 books **22** gates (G1–G22 + G1c–G10c) — and against clause "E8" when the ungated clause is **E7** | `F-W5.md:212` *"## 3. Gates — 22, all born-RED"* |
| 14 | **MAJOR** | §1's named IMMUTABLE authority `docs/tranches/J/design/J-diff-shape.md` (271 lines) does not exist in value.js; the file lives inside the fourier tree that §1 declares explicitly NOT in bounds | `find . -name 'J-diff-shape*'` → none in value.js; present at `$F/docs/tranches/J/design/J-diff-shape.md` |
| 15 | **MINOR** | §1's bounds reconciliation enumerates a 7-file `waves/` directory that today holds 11, including `F-W0.md`, `F-W1.md`, `F-W7.md` | `ls docs/tranches/X/fourier/waves/` |
| 16 | **MINOR** | Three read-only bounds paths are written unprefixed and resolve only under `docs/tranches/V/megatranche/` | `find . -name 'lane-crud.md'` → `docs/tranches/V/megatranche/formation/fourier/lane-crud.md` |
| 17 | **MINOR** | m-7's **killed** 422-straddle arm is carried; m-7's surviving MINOR row and its constructive cure are dropped | fr-BasisSelector:73; F-W6 lines 170, 205 |
| 18 | **MINOR** | FR-USB-23 is routed to F.W8 in §5 with its ⊙ owner-gate (R9) stripped | F-W6 line 200 vs `F-W5.md` §2a R9 |
| 19 | **MINOR** | Line 3's *"fresh-Fable FOLD-VERIFIED … verified row-for-row … zero silent drops"* is a verification receipt in current voice over a nonexistent artefact | F-W6 line 3 |
| 20 | **INFO** | Credit where due: gate witnesses are REAL and reproduce (HEAD `cd26c653`, 28 dirty, four line-anchor samples verbatim, `def order_contours` → 0, `.gitignore:53`, `ls api/src/lib` absent, value diff empty). L-19 HOLDS; born-RED is honest; the paper register's four same-commit riders are carried verbatim | §4 table |

---

## §8 TALLY

```
routed identities (both dash forms, 49 records) ......... 122
  booked (row / named fold / exclusion-with-reason) ....  66   (54 %)
  escaped (carried nowhere) ............................  56   (46 %)
negative-roster records dropped .........................   7
F.W5 clauses mis-labelled ...............................   6
F.W5 clauses invented ...................................   1  (D9)
owner rulings dropped from the G18 roster ...............   2  (R5, R9)
phantom authorities cited ...............................   2  (F.W6 CARRY, J-diff-shape.md@value.js)
gate witnesses verified real ............................  13 of 13 sampled
```

**verdictLocal: DEFECTIVE.**

Bases met, in the spec's own words at line 216 (*"the bases that apply here"*): *"a set-difference declared empty without running both directions"* — met at 56 rows and 7 negatives; and the M-25 anti-rename law — met at six re-labelled clauses, one invented clause, and a phantom carry ledger.

What survives intact and should be preserved in any re-cut: the born-RED gate construction and its real witnesses; the F-β ⊕ SS-C-1 one-cut law; the F-γ ⊕ FR-AFP-4 privacy one-cut; the FR-AFP-66 ⊕ FR-AFP-33 compose-lock; the DO-NOT-REGENERATE TRIPWIRE and its BLOCKER-revival clause; the killed-cure register (K9 · K12 · K-1 · K-6 · AA-23 · SE-05 · β-428); the paper register's four same-commit riders carried verbatim; the read-only fourier posture, honoured without exception; and the E-3 / status discipline.
