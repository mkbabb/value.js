# F-W1-CHECK — PASS 1 · FRESH ADVERSARIAL SPEC CHECK (L-18/L-20)
**Wave**: F.W1 (X·F) · **Spec under trial**: `docs/tranches/X/fourier/waves/F-W1.md` · **Date**: 2026-08-28 · **Seat**: fresh adversarial checker, pass 1.
**Corpus authority**: 66 `fr-*.md` @ `docs/tranches/V/megatranche/registry/adjudicated/` + in-tree `carry/F-W1-CARRY.md` (105 rows). No other carry ledger cited by the spec (verified: the spec cites F-W1-CARRY only — no phantom carry).
**Method (X·P terminal, id-keyed)**: precise scan `F[.·]W1\b|F-W1\b` over all 66 records → **679** mentions; restricted to disposition-bearing roster sections → **434** lines; routing-law preambles excluded (**24**); classified ROUTED vs MENTION-ONLY (sequencing/negation/“not an F.W1 row”) → **338 routed** disposition rows after hand-correction (+19 reclassified up, −1 preamble misfire). Membership tested by bytes against F-W1.md, then against F-W1-CARRY.md, then by declared FOLD-to-a-carried-identity.

## Arithmetic
| quantity | value |
|---|---|
| F.W1 mentions, 66 records | 679 |
| disposition-bearing roster lines | 434 |
| routing-law preamble lines (excluded) | 24 |
| MENTION-ONLY (sequencing / negation / routed elsewhere) | 72 |
| **ROUTED to F.W1 (terminal disposition)** | **338** |
| booked — id present verbatim in F-W1.md | 237 |
| booked — id present in F-W1-CARRY.md under a spec-carried identity (spec elides by ellipsis) | 42 |
| booked — declared FOLD to an identity the spec carries | 46 |
| **BOOKED total** | **325** |
| **ESCAPED (routed rows)** | **13 lines / 15 ids** (`fr-PaperSearch:55` carries three: D-14 · D-15 · D-17) |
| ESCAPED off MENTION-classified lines (constraint / relay-identity) | 2 (**AA-11**, **FR-COB-28**) — booked below, not counted in the 13 |

**CARRY closure re-run (G20, both directions)**: the CARRY's 105 `§Rows` bullet ids were extracted and matched by bytes against F-W1.md §2/§5 — **105/105 present**. The spec's own G20 arithmetic holds. The corpus→CARRY direction is where the 15 ids escape: they are absent from **both** files.

## §1 ESCAPES (named by bytes)
| record:line | id | grade | what escaped |
|---|---|---|---|
| `fr-SvgFilters.md:49` | **D §3 U-3** | MAJOR | the twice-rejected feTurbulence/grain register must not ride the uplift forward |
| `fr-SvgFilters.md:64` | **C-S3** | INFO | pencil-boil is the only @mkbabb dep in exact peer-compliance — context for the bump |
| `fr-MorphPhaseConfig.md:91` | **MPC-29** | INFO | /morph’s only automated gate is one screenshot row; catches MPC-5 drift iff baseline regeneration straddles the bump |
| `fr-AdminFlaggedPanel.md:87` | **FR-AFP-33** | MAJOR | client-side flag-list collapse (./expandable-container installed) routed F.W1/W3 |
| `fr-CoefficientsPanel.md:68` | **FR-CP-33** | MINOR | CollapsibleSection.vue:2 root-barrel glass import defeating the ~60-subpath split — import-hygiene arm rides F.W1 |
| `fr-CollapsibleSection.md:78` | **i-2** | INFO | .disclosure-content body register = an F.W1 screenshot row / SS-13 #6 |
| `fr-CollapsibleSection.md:63` | **m-6** | MINOR | the :57-59 comment naming a non-exported specifier dies inside B-1’s deletion |
| `fr-EquationView.md:107` | **M-TL** | MINOR | F.W1 benefit — ≥7 ships useTabRovingFocus |
| `fr-EquationView.md:65` | **D·D-M3** | MINOR | F.W1 benefit — the overlay union’s coarse-pointer tap-toggle |
| `fr-GlassTimeline.md:84` | **RB-1** | INFO | F.W1 charter note — K-14/SR-1 route authorities mis-baselined (v8 facts at a 7.0.0 label) |
| `fr-InfoCard.md:49` | **FR-IC-17** | INFO | DISCHARGED-BY-UPLIFT — no discharge ledger row in the spec |
| `fr-GalleryDraftsSection.md:87` | **i-1** | INFO | budget rider on GAB-2: label-position ×6 / color ×2 have no clean v7 equivalent |
| `fr-PaperSearch.md:55` | **fr-PaperSearch D-14 / D-15 / D-17** | MAJOR | the three token limbs routed “F.W1 re-ink”; the CARRY re-ink cell names only D:B-3 + D-M1 + MISS-A6 |
| `fr-CanvasOverlayButton.md:87` | **FR-COB-28** | MINOR | the seven-item relay-packet identity; in CARRY, dropped from the spec’s NWO-1 roster |
| `fr-AdminAuditLog.md:48` | **AA-11** | CONSTRAINT | “F.W1 must not plan the pagination cure around ‘./pagination’” — absent spec+carry |

## §2 Booked-via-CARRY-only (spec elides the id behind an ellipsis or a “per CARRY cell” pointer)

These 42 ids are routed to F.W1, are named by bytes in `F-W1-CARRY.md`, and are **absent from `F-W1.md`**. Each sits under an identity the spec does carry, so none is an escape — but the spec's own G20 closure cannot be re-run from the spec alone.

- `fr-App.md:75` — **L-9**
- `fr-BasisSelector.md:62` — **M-13**
- `fr-CanvasControlsDock.md:95` — **C-27**
- `fr-CanvasOverlayButton.md:75` — **FR-COB-21**
- `fr-CoefficientsSpectrum.md:57` — **M-5**
- `fr-CoefficientsSpectrum.md:79` — **m-8**
- `fr-CollapsibleSection.md:43` — **F-2**
- `fr-ContourPreview.md:70` — **37**
- `fr-ContourSettings.md:49` — **D-B1**
- `fr-ContourSettings.md:51` — **C-5**
- `fr-ConvergenceTimeline.md:54` — **D·D-2**
- `fr-DarkModeToggle.md:56` — **L-3**
- `fr-DarkModeToggle.md:66` — **r2 missed #5**
- `fr-DarkModeToggle.md:110` — **I-2**
- `fr-EquationModeToggle.md:38` — **FR-EMT-8**
- `fr-EquationModeToggle.md:52` — **FR-EMT-22**
- `fr-EquationResult.md:37` — **FR-EQR-2**
- `fr-FullscreenViewer.md:38` — **FB-3**
- `fr-GalleryAdminBanner.md:50` — **GAB-11**
- `fr-GalleryCard.md:82` — **L·I-1 / C·I-1**
- `fr-GalleryCardModal.md:66` — **GCM-20**
- `fr-GalleryCardModal.md:67` — **GCM-21**
- `fr-GalleryCardModal.md:109` — **GCM-53**
- `fr-GalleryDraftsSection.md:57` — **M-5**
- `fr-GalleryFeaturedCarousel.md:66` — **FR-GFC-29**
- `fr-GalleryFeaturedCarousel.md:71` — **FOLD-2**
- `fr-GalleryMarquee.md:35` — **GM-F7**
- `fr-GallerySearchBar.md:32` — **FR-GSB-3**
- `fr-GallerySearchBar.md:33` — **FR-GSB-4**
- `fr-GallerySearchBar.md:38` — **FR-GSB-9**
- `fr-HarmonicLevelGrid.md:51` — **HLG-5**
- `fr-NotationPills.md:43` — **FR-NP-5**
- `fr-NotationPills.md:53` — **FR-NP-12**
- `fr-PaperSearchDropdown.md:43` — **D:I-2**
- `fr-PaperSearchModal.md:76` — **PSM-33**
- `fr-PaperView.md:45` — **D/B-3**
- `fr-PaperView.md:69` — **C-03**
- `fr-PaperView.md:106` — **C-14**
- `fr-PaperView.md:194` — **Census §1 pins + G33: C-03 is that identity AMENDED**
- `fr-SliderControl.md:40` — **R-11**
- `fr-VisualizationView.md:44` — **L-3**
- `fr-VisualizationView.md:60` — **MAJ-6**

## §3 Full routed census (id-for-id)

Legend: **S** = id verbatim in F-W1.md · **C** = id verbatim in F-W1-CARRY.md · **F** = declared fold to a carried identity · **E** = ESCAPED.

| record:line | id cell | S | C | verdict |
|---|---|---|---|---|
| `fr-AdminAuditLog.md:36` | AA-2 | ✓ | ✓ | BOOKED (spec) |
| `fr-AdminFlaggedPanel.md:45` | FR-AFP-2 | ✓ | ✓ | BOOKED (spec) |
| `fr-AdminFlaggedPanel.md:46` | FR-AFP-3 | ✓ | ✓ | BOOKED (spec) |
| `fr-AdminFlaggedPanel.md:63` | FR-AFP-16 | ✓ | ✓ | BOOKED (spec) |
| `fr-AdminFlaggedPanel.md:64` | FR-AFP-17 | ✓ | ✓ | BOOKED (spec) |
| `fr-AdminFlaggedPanel.md:65` | FR-AFP-18 | ✓ | ✓ | BOOKED (spec) |
| `fr-AdminFlaggedPanel.md:66` | FR-AFP-19 | ✓ | ✓ | BOOKED (spec) |
| `fr-AdminFlaggedPanel.md:67` | FR-AFP-20 | ✓ | ✓ | BOOKED (spec) |
| `fr-AdminFlaggedPanel.md:82` | FR-AFP-27 | ✓ | ✓ | BOOKED (spec) |
| `fr-AdminFlaggedPanel.md:83` | FR-AFP-28 | ✓ | ✓ | BOOKED (spec) |
| `fr-AdminFlaggedPanel.md:87` | FR-AFP-33 | — | — | **ESCAPED** |
| `fr-AdminFlaggedPanel.md:91` | FR-AFP-37 | ✓ | ✓ | BOOKED (spec) |
| `fr-AdminFlaggedPanel.md:97` | FR-AFP-44 | ✓ | ✓ | BOOKED (spec) |
| `fr-AdminFlaggedPanel.md:99` | FR-AFP-46 | ✓ | ✓ | BOOKED (spec) |
| `fr-AdminFlaggedPanel.md:101` | FR-AFP-61 | ✓ | ✓ | BOOKED (spec) |
| `fr-AdminUserList.md:48` | FR-AUL-10 | ✓ | ✓ | BOOKED (spec) |
| `fr-AdminUserList.md:88` | FR-AUL-45 | ✓ | ✓ | BOOKED (spec) |
| `fr-AdminUserList.md:96` | FR-AUL-53 | ✓ | ✓ | BOOKED (spec) |
| `fr-AnimationControls.md:54` | C-2 | ✓ | ✓ | BOOKED (spec) |
| `fr-AnimationControls.md:57` | D-12 / C-20 | ✓ | ✓ | BOOKED (spec) |
| `fr-AnimationControls.md:84` | C-13 | ✓ | ✓ | BOOKED (spec) |
| `fr-AnimationControls.md:114` | C-1 | ✓ | ✓ | BOOKED (spec) |
| `fr-AnimationControls.md:125` | L-13 | ✓ | ✓ | BOOKED (spec) |
| `fr-AnimationControls.md:188` | Census §1 pins + G33: C-1 is that row AMENDED | — | — | BOOKED (declared fold) |
| `fr-AnimationControls.md:190` | Census FE §5 / C-4-census: the 4→7 break table | — | — | BOOKED (declared fold) |
| `fr-App.md:42` | B-1 / L-1 / C-1 | ✓ | ✓ | BOOKED (spec) |
| `fr-App.md:46` | B-2 | ✓ | ✓ | BOOKED (spec) |
| `fr-App.md:47` | C-2 | ✓ | ✓ | BOOKED (spec) |
| `fr-App.md:56` | C-4 | ✓ | ✓ | BOOKED (spec) |
| `fr-App.md:57` | m-8 / L-2 / C-3 | ✓ | ✓ | BOOKED (spec) |
| `fr-App.md:59` | MG-β | ✓ | ✓ | BOOKED (spec) |
| `fr-App.md:71` | m-9 / C-9 | ✓ | ✓ | BOOKED (spec) |
| `fr-App.md:73` | L-7 | ✓ | ✓ | BOOKED (spec) |
| `fr-App.md:75` | L-9 | — | ✓ | BOOKED (carry-fold) |
| `fr-App.md:82` | MG-ι | ✓ | ✓ | BOOKED (spec) |
| `fr-App.md:89` | C-11 | ✓ | ✓ | BOOKED (spec) |
| `fr-App.md:94` | MG-κ | ✓ | ✓ | BOOKED (spec) |
| `fr-App.md:139` | → F.W1 | ✓ | ✓ | BOOKED (spec) |
| `fr-AppHeader.md:53` | FR-AH-7 | ✓ | ✓ | BOOKED (spec) |
| `fr-AppHeader.md:59` | FR-AH-13 | ✓ | ✓ | BOOKED (spec) |
| `fr-AppHeader.md:68` | C-19 | ✓ | ✓ | BOOKED (spec) |
| `fr-AppHeader.md:69` | value.js 0.13.0 outside glass-ui 4.0.0's peer range | — | — | BOOKED (declared fold) |
| `fr-AppHeader.md:80` | FR-AH-22 | ✓ | ✓ | BOOKED (spec) |
| `fr-AppHeader.md:82` | FR-AH-24 | ✓ | ✓ | BOOKED (spec) |
| `fr-AppHeader.md:85` | FR-AH-27 | — | — | BOOKED (declared fold) |
| `fr-BasisCanvas.md:38` | D-1 / BC-1 / C-1 | ✓ | ✓ | BOOKED (spec) |
| `fr-BasisCanvas.md:43` | D-2 / BC-5 / C-3 | ✓ | ✓ | BOOKED (spec) |
| `fr-BasisCanvas.md:44` | C-4 | ✓ | ✓ | BOOKED (spec) |
| `fr-BasisCanvas.md:59` | C-8 | ✓ | ✓ | BOOKED (spec) |
| `fr-BasisCanvas.md:73` | D-18 / C-13 | ✓ | ✓ | BOOKED (spec) |
| `fr-BasisCanvas.md:74` | M-α5 | ✓ | ✓ | BOOKED (spec) |
| `fr-BasisCanvas.md:86` | C-11 | ✓ | ✓ | BOOKED (spec) |
| `fr-BasisCanvas.md:90` | M-α6 | ✓ | ✓ | BOOKED (spec) |
| `fr-BasisCanvas.md:94` | M-β5 | ✓ | ✓ | BOOKED (spec) |
| `fr-BasisCanvas.md:104` | D-27 | ✓ | ✓ | BOOKED (spec) |
| `fr-BasisCanvas.md:105` | D-corpus-C-1 | ✓ | ✓ | BOOKED (spec) |
| `fr-BasisCanvas.md:107` | M-β6 | ✓ | ✓ | BOOKED (spec) |
| `fr-BasisSelector.md:40` | B-2 | ✓ | ✓ | BOOKED (spec) |
| `fr-BasisSelector.md:45` | C-2 / L-B1 | ✓ | ✓ | BOOKED (spec) |
| `fr-BasisSelector.md:46` | C-4 / L-M6 | ✓ | ✓ | BOOKED (spec) |
| `fr-BasisSelector.md:50` | M-1 | ✓ | ✓ | BOOKED (spec) |
| `fr-BasisSelector.md:56` | M-7 | ✓ | ✓ | BOOKED (spec) |
| `fr-BasisSelector.md:62` | M-13 | — | ✓ | BOOKED (carry-fold) |
| `fr-BasisSelector.md:69` | m-3 | ✓ | ✓ | BOOKED (spec) |
| `fr-BasisSelector.md:72` | m-6 | — | — | BOOKED (declared fold) |
| `fr-BasisSelector.md:75` | m-9 | ✓ | ✓ | BOOKED (spec) |
| `fr-BasisSelector.md:87` | m-21 | ✓ | ✓ | BOOKED (spec) |
| `fr-BasisSelector.md:95` | i-4 | ✓ | ✓ | BOOKED (spec) |
| `fr-CanvasControlsDock.md:44` | D-2 / C-2 | ✓ | ✓ | BOOKED (spec) |
| `fr-CanvasControlsDock.md:53` | D-3 / L-8 / C-8 | ✓ | ✓ | BOOKED (spec) |
| `fr-CanvasControlsDock.md:56` | D-12 / L-6 / C-4 | ✓ | ✓ | BOOKED (spec) |
| `fr-CanvasControlsDock.md:60` | D-7 | ✓ | ✓ | BOOKED (spec) |
| `fr-CanvasControlsDock.md:61` | C-13 | ✓ | ✓ | BOOKED (spec) |
| `fr-CanvasControlsDock.md:95` | C-27 | — | ✓ | BOOKED (carry-fold) |
| `fr-CanvasOverlayButton.md:41` | FR-COB-2 | ✓ | ✓ | BOOKED (spec) |
| `fr-CanvasOverlayButton.md:46` | The Button prop-value-axis census amendment | — | — | BOOKED (declared fold) |
| `fr-CanvasOverlayButton.md:55` | FR-COB-6 | ✓ | ✓ | BOOKED (spec) |
| `fr-CanvasOverlayButton.md:59` | FR-COB-10 | ✓ | ✓ | BOOKED (spec) |
| `fr-CanvasOverlayButton.md:67` | FR-COB-13 | ✓ | ✓ | BOOKED (spec) |
| `fr-CanvasOverlayButton.md:70` | FR-COB-16 | ✓ | ✓ | BOOKED (spec) |
| `fr-CanvasOverlayButton.md:73` | FR-COB-19 | ✓ | ✓ | BOOKED (spec) |
| `fr-CanvasOverlayButton.md:75` | FR-COB-21 | — | ✓ | BOOKED (carry-fold) |
| `fr-CanvasOverlayButton.md:83` | FR-COB-24 | ✓ | ✓ | BOOKED (spec) |
| `fr-CoefficientsPanel.md:37` | FR-CP-5 | ✓ | ✓ | BOOKED (spec) |
| `fr-CoefficientsPanel.md:42` | FR-CP-10 | ✓ | ✓ | BOOKED (spec) |
| `fr-CoefficientsPanel.md:45` | FR-CP-13 | ✓ | ✓ | BOOKED (spec) |
| `fr-CoefficientsPanel.md:46` | FR-CP-14 | ✓ | ✓ | BOOKED (spec) |
| `fr-CoefficientsPanel.md:56` | FR-CP-21 | ✓ | ✓ | BOOKED (spec) |
| `fr-CoefficientsPanel.md:68` | FR-CP-33 | — | — | **ESCAPED** |
| `fr-CoefficientsPanel.md:77` | FR-CP-42 | ✓ | ✓ | BOOKED (spec) |
| `fr-CoefficientsSpectrum.md:42` | B-4 | ✓ | ✓ | BOOKED (spec) |
| `fr-CoefficientsSpectrum.md:46` | C:B-1 | ✓ | ✓ | BOOKED (spec) |
| `fr-CoefficientsSpectrum.md:47` | D:M-4 / C-26 | ✓ | ✓ | BOOKED (spec) |
| `fr-CoefficientsSpectrum.md:48` | D:M-8 | ✓ | ✓ | BOOKED (spec) |
| `fr-CoefficientsSpectrum.md:49` | C-6 | ✓ | ✓ | BOOKED (spec) |
| `fr-CoefficientsSpectrum.md:57` | M-5 | — | ✓ | BOOKED (carry-fold) |
| `fr-CoefficientsSpectrum.md:68` | M-16 | ✓ | ✓ | BOOKED (spec) |
| `fr-CoefficientsSpectrum.md:79` | m-8 | — | ✓ | BOOKED (carry-fold) |
| `fr-CoefficientsSpectrum.md:91` | m-20 | ✓ | ✓ | BOOKED (spec) |
| `fr-CoefficientsSpectrum.md:99` | i-3 | ✓ | ✓ | BOOKED (spec) |
| `fr-CollapsibleSection.md:38` | B-1 | ✓ | ✓ | BOOKED (spec) |
| `fr-CollapsibleSection.md:42` | F-1 | ✓ | ✓ | BOOKED (spec) |
| `fr-CollapsibleSection.md:43` | F-2 | — | ✓ | BOOKED (carry-fold) |
| `fr-CollapsibleSection.md:44` | F-3 | ✓ | ✓ | BOOKED (spec) |
| `fr-CollapsibleSection.md:49` | M-2 | ✓ | ✓ | BOOKED (spec) |
| `fr-CollapsibleSection.md:54` | M-7 | ✓ | ✓ | BOOKED (spec) |
| `fr-CollapsibleSection.md:63` | m-6 | — | — | **ESCAPED** |
| `fr-CollapsibleSection.md:78` | i-2 | — | — | **ESCAPED** |
| `fr-ContourEditorCanvas.md:52` | D/B-1 | — | — | BOOKED (declared fold) |
| `fr-ContourEditorCanvas.md:66` | C-11 | ✓ | ✓ | BOOKED (spec) |
| `fr-ContourEditorCanvas.md:67` | FOLD | ✓ | ✓ | BOOKED (spec) |
| `fr-ContourEditorCanvas.md:97` | MM-11 | ✓ | ✓ | BOOKED (spec) |
| `fr-ContourPreview.md:37` | 4 | ✓ | ✓ | BOOKED (spec) |
| `fr-ContourPreview.md:48` | 15 | ✓ | ✓ | BOOKED (spec) |
| `fr-ContourPreview.md:56` | 23 | ✓ | ✓ | BOOKED (spec) |
| `fr-ContourPreview.md:60` | 27 | ✓ | ✓ | BOOKED (spec) |
| `fr-ContourPreview.md:62` | 29 | ✓ | ✓ | BOOKED (spec) |
| `fr-ContourPreview.md:63` | 30 | ✓ | ✓ | BOOKED (spec) |
| `fr-ContourPreview.md:70` | 37 | — | ✓ | BOOKED (carry-fold) |
| `fr-ContourSettings.md:49` | D-B1 | — | ✓ | BOOKED (carry-fold) |
| `fr-ContourSettings.md:50` | C-11 | ✓ | ✓ | BOOKED (spec) |
| `fr-ContourSettings.md:51` | C-5 | — | ✓ | BOOKED (carry-fold) |
| `fr-ConvergenceLegend.md:42` | Line anchors are live-WT at `cd26c65`+dirty; re-resolve before any cur | ✓ | — | BOOKED (spec) |
| `fr-ConvergencePlot.md:70` | MAJOR folded to banked identities | — | — | BOOKED (declared fold) |
| `fr-ConvergenceTimeline.md:54` | D·D-2 | — | ✓ | BOOKED (carry-fold) |
| `fr-ConvergenceTimeline.md:56` | D·D-5 + C·C-5 | — | — | BOOKED (declared fold) |
| `fr-DarkModeToggle.md:44` | Line anchors are live-WT at `cd26c65`+dirty; re-resolve before any cur | ✓ | — | BOOKED (spec) |
| `fr-DarkModeToggle.md:48` | None booked here. The corpus's BLOCKER-weight facts live in banked ide | — | — | BOOKED (declared fold) |
| `fr-DarkModeToggle.md:55` | L-2 / C-2 | ✓ | ✓ | BOOKED (spec) |
| `fr-DarkModeToggle.md:56` | L-3 | — | ✓ | BOOKED (carry-fold) |
| `fr-DarkModeToggle.md:60` | C-3 | — | — | BOOKED (declared fold) |
| `fr-DarkModeToggle.md:66` | r2 missed #5 | — | ✓ | BOOKED (carry-fold) |
| `fr-DarkModeToggle.md:110` | I-2 | — | ✓ | BOOKED (carry-fold) |
| `fr-EasingCurvePreview.md:38` | Line anchors are live-WT at `cd26c65`+dirty; re-resolve before any cur | ✓ | — | BOOKED (spec) |
| `fr-EasingCurvePreview.md:52` | BREAK-8.0 | — | — | BOOKED (declared fold) |
| `fr-EasingCurvePreview.md:58` | CENSUS-MC | — | — | BOOKED (declared fold) |
| `fr-EasingPicker.md:52` | L/B-1 + C/B-1 | ✓ | ✓ | BOOKED (spec) |
| `fr-EasingPicker.md:53` | C/B-2 | ✓ | ✓ | BOOKED (spec) |
| `fr-EasingPicker.md:69` | MISSED-C | — | — | BOOKED (declared fold) |
| `fr-EasingPicker.md:89` | MISSED-F | — | — | BOOKED (declared fold) |
| `fr-EditorControlsDock.md:43` | FOLD | ✓ | ✓ | BOOKED (spec) |
| `fr-EditorControlsDock.md:45` | FOLD | ✓ | ✓ | BOOKED (spec) |
| `fr-EditorControlsDock.md:56` | D-8 / C-12 | ✓ | ✓ | BOOKED (spec) |
| `fr-EditorControlsDock.md:61` | L-7 | ✓ | ✓ | BOOKED (spec) |
| `fr-EditorControlsDock.md:79` | D-23 / C-19 | ✓ | ✓ | BOOKED (spec) |
| `fr-EditorControlsDock.md:98` | M-10 | — | — | BOOKED (declared fold) |
| `fr-EqCoefficientsPanel.md:40` | FR-EQC-3 | ✓ | ✓ | BOOKED (spec) |
| `fr-EqCoefficientsPanel.md:42` | FR-EQC-5 | ✓ | ✓ | BOOKED (spec) |
| `fr-EqCoefficientsPanel.md:44` | FR-EQC-7 | — | — | BOOKED (declared fold) |
| `fr-EqCoefficientsPanel.md:50` | FR-EQC-13 | ✓ | ✓ | BOOKED (spec) |
| `fr-EqCoefficientsPanel.md:53` | FR-EQC-16 | ✓ | ✓ | BOOKED (spec) |
| `fr-EqCoefficientsPanel.md:67` | D/B-2 | ✓ | ✓ | BOOKED (spec) |
| `fr-EquationModeToggle.md:38` | FR-EMT-8 | — | ✓ | BOOKED (carry-fold) |
| `fr-EquationModeToggle.md:44` | FR-EMT-14 | ✓ | ✓ | BOOKED (spec) |
| `fr-EquationModeToggle.md:52` | FR-EMT-22 | — | ✓ | BOOKED (carry-fold) |
| `fr-EquationPanel.md:48` | MAJOR | ✓ | ✓ | BOOKED (spec) |
| `fr-EquationPanel.md:56` | FOLDED identities | — | — | BOOKED (declared fold) |
| `fr-EquationResult.md:36` | FR-EQR-1 | ✓ | ✓ | BOOKED (spec) |
| `fr-EquationResult.md:37` | FR-EQR-2 | — | ✓ | BOOKED (carry-fold) |
| `fr-EquationResult.md:38` | FR-EQR-3 | ✓ | ✓ | BOOKED (spec) |
| `fr-EquationResult.md:74` | FR-EQR-33 | — | — | BOOKED (declared fold) |
| `fr-EquationView.md:55` | D·D-B4 | ✓ | ✓ | BOOKED (spec) |
| `fr-EquationView.md:64` | D·D-M10 | ✓ | ✓ | BOOKED (spec) |
| `fr-EquationView.md:65` | D·D-M3 | — | — | **ESCAPED** |
| `fr-EquationView.md:72` | M-RTC | ✓ | ✓ | BOOKED (spec) |
| `fr-EquationView.md:74` | MAJOR folded to banked identities | — | — | BOOKED (declared fold) |
| `fr-EquationView.md:85` | D·D-M11 | ✓ | ✓ | BOOKED (spec) |
| `fr-EquationView.md:107` | M-TL | — | — | **ESCAPED** |
| `fr-EquationView.md:185` | Button prop-surface break | — | — | BOOKED (declared fold) |
| `fr-EquationView.md:186` | Viz-palette collapse | — | — | BOOKED (declared fold) |
| `fr-ExportModal.md:38` | M-α | ✓ | ✓ | BOOKED (spec) |
| `fr-ExportModal.md:39` | M-β | ✓ | ✓ | BOOKED (spec) |
| `fr-ExportModal.md:51` | MAJOR | ✓ | ✓ | BOOKED (spec) |
| `fr-FourierMorphDemo.md:40` | FMD-3 | ✓ | ✓ | BOOKED (spec) |
| `fr-FourierMorphDemo.md:53` | FMD-11 | ✓ | ✓ | BOOKED (spec) |
| `fr-FourierMorphDemo.md:56` | FMD-14 | ✓ | ✓ | BOOKED (spec) |
| `fr-FourierMorphDemo.md:63` | FMD-21 | — | — | BOOKED (declared fold) |
| `fr-FourierMorphSvg.md:37` | FM-2 | ✓ | ✓ | BOOKED (spec) |
| `fr-FourierMorphSvg.md:58` | Seat additions | — | — | BOOKED (declared fold) |
| `fr-FourierShapeExtractor.md:45` | AA-2 fold | ✓ | ✓ | BOOKED (spec) |
| `fr-FourierShapeExtractor.md:78` | D-13 | ✓ | ✓ | BOOKED (spec) |
| `fr-FourierShapeExtractor.md:89` | C-13 | ✓ | ✓ | BOOKED (spec) |
| `fr-FourierShapeExtractor.md:98` | L-i3 / C-18.1 | ✓ | ✓ | BOOKED (spec) |
| `fr-FourierShapeExtractor.md:99` | C-16 | ✓ | ✓ | BOOKED (spec) |
| `fr-FourierShapeExtractor.md:100` | C-18.2 | ✓ | ✓ | BOOKED (spec) |
| `fr-FrequencyGraph.md:47` | FR-FG-12 | ✓ | ✓ | BOOKED (spec) |
| `fr-FrequencyGraph.md:58` | FR-FG-20 | ✓ | ✓ | BOOKED (spec) |
| `fr-FullscreenViewer.md:38` | FB-3 | — | ✓ | BOOKED (carry-fold) |
| `fr-FullscreenViewer.md:39` | FB-4 | ✓ | ✓ | BOOKED (spec) |
| `fr-FunctionInput.md:39` | D-12 → fr-AdminAuditLog AA-2 | ✓ | ✓ | BOOKED (spec) |
| `fr-FunctionInput.md:86` | L-B1/C-1 → fr-EquationView B-2 | ✓ | ✓ | BOOKED (spec) |
| `fr-GalleryAdminBanner.md:41` | GAB-2 | ✓ | ✓ | BOOKED (spec) |
| `fr-GalleryAdminBanner.md:50` | GAB-11 | — | ✓ | BOOKED (carry-fold) |
| `fr-GalleryCard.md:44` | C-4 | ✓ | ✓ | BOOKED (spec) |
| `fr-GalleryCard.md:45` | D-4 / L·M-1 / C-3 | ✓ | ✓ | BOOKED (spec) |
| `fr-GalleryCard.md:48` | D-8 | ✓ | ✓ | BOOKED (spec) |
| `fr-GalleryCard.md:61` | D-1 / L·B-1 | ✓ | ✓ | BOOKED (spec) |
| `fr-GalleryCard.md:80` | D-20 | ✓ | ✓ | BOOKED (spec) |
| `fr-GalleryCard.md:81` | D-21 | ✓ | ✓ | BOOKED (spec) |
| `fr-GalleryCard.md:82` | L·I-1 / C·I-1 | — | ✓ | BOOKED (carry-fold) |
| `fr-GalleryCard.md:84` | G-DU6 | ✓ | ✓ | BOOKED (spec) |
| `fr-GalleryCardModal.md:66` | GCM-20 | — | ✓ | BOOKED (carry-fold) |
| `fr-GalleryCardModal.md:67` | GCM-21 | — | ✓ | BOOKED (carry-fold) |
| `fr-GalleryCardModal.md:68` | GCM-22 | ✓ | ✓ | BOOKED (spec) |
| `fr-GalleryCardModal.md:106` | GCM-50 | ✓ | ✓ | BOOKED (spec) |
| `fr-GalleryCardModal.md:109` | GCM-53 | — | ✓ | BOOKED (carry-fold) |
| `fr-GalleryDraftsSection.md:46` | F-3 | ✓ | ✓ | BOOKED (spec) |
| `fr-GalleryDraftsSection.md:48` | F-5 | ✓ | ✓ | BOOKED (spec) |
| `fr-GalleryDraftsSection.md:56` | M-4 | ✓ | ✓ | BOOKED (spec) |
| `fr-GalleryDraftsSection.md:57` | M-5 | — | ✓ | BOOKED (carry-fold) |
| `fr-GalleryDraftsSection.md:58` | M-6 | ✓ | ✓ | BOOKED (spec) |
| `fr-GalleryDraftsSection.md:67` | m-2 | ✓ | ✓ | BOOKED (spec) |
| `fr-GalleryDraftsSection.md:87` | i-1 | — | — | **ESCAPED** |
| `fr-GalleryFeaturedCarousel.md:55` | FR-GFC-21 | — | — | BOOKED (declared fold) |
| `fr-GalleryFeaturedCarousel.md:63` | FR-GFC-26 | ✓ | ✓ | BOOKED (spec) |
| `fr-GalleryFeaturedCarousel.md:66` | FR-GFC-29 | — | ✓ | BOOKED (carry-fold) |
| `fr-GalleryFeaturedCarousel.md:71` | FOLD-2 | — | ✓ | BOOKED (carry-fold) |
| `fr-GalleryInfiniteGrid.md:47` | FR-GIG-5 | — | — | BOOKED (declared fold) |
| `fr-GalleryInfiniteGrid.md:48` | C-6 | ✓ | ✓ | BOOKED (spec) |
| `fr-GalleryMarquee.md:35` | GM-F7 | — | ✓ | BOOKED (carry-fold) |
| `fr-GalleryMarquee.md:37` | GM-F9 | — | — | BOOKED (declared fold) |
| `fr-GallerySearchBar.md:31` | FR-GSB-2 | — | — | BOOKED (declared fold) |
| `fr-GallerySearchBar.md:32` | FR-GSB-3 | — | ✓ | BOOKED (carry-fold) |
| `fr-GallerySearchBar.md:33` | FR-GSB-4 | — | ✓ | BOOKED (carry-fold) |
| `fr-GallerySearchBar.md:38` | FR-GSB-9 | — | ✓ | BOOKED (carry-fold) |
| `fr-GalleryView.md:57` | FR-GV-18 | ✓ | ✓ | BOOKED (spec) |
| `fr-GalleryView.md:83` | Each row was verified live by at least one reader and spot-checked by  | — | — | BOOKED (declared fold) |
| `fr-GlassTimeline.md:46` | PD-1 | ✓ | ✓ | BOOKED (spec) |
| `fr-GlassTimeline.md:81` | C-18 / C-20 | ✓ | ✓ | BOOKED (spec) |
| `fr-GlassTimeline.md:84` | RB-1 | — | — | **ESCAPED** |
| `fr-GlassTimeline.md:85` | BR-1 | ✓ | ✓ | BOOKED (spec) |
| `fr-HarmonicLevelGrid.md:49` | HLG-3 | ✓ | ✓ | BOOKED (spec) |
| `fr-HarmonicLevelGrid.md:51` | HLG-5 | — | ✓ | BOOKED (carry-fold) |
| `fr-HarmonicLevelGrid.md:182` | HLG-41 | ✓ | ✓ | BOOKED (spec) |
| `fr-ImageUpload.md:62` | 28 | ✓ | ✓ | BOOKED (spec) |
| `fr-ImageUpload.md:76` | F8 | — | — | BOOKED (declared fold) |
| `fr-InfoCard.md:43` | FR-IC-7 | ✓ | ✓ | BOOKED (spec) |
| `fr-InfoCard.md:44` | FR-IC-8 | ✓ | ✓ | BOOKED (spec) |
| `fr-InfoCard.md:46` | FR-IC-10 | ✓ | ✓ | BOOKED (spec) |
| `fr-InfoCard.md:49` | FR-IC-17 | — | — | **ESCAPED** |
| `fr-InfoCard.md:57` | FR-IC-25 | ✓ | ✓ | BOOKED (spec) |
| `fr-InfoCard.md:58` | FR-IC-26 | ✓ | ✓ | BOOKED (spec) |
| `fr-MobileFloatingToc.md:45` | F-1 | ✓ | ✓ | BOOKED (spec) |
| `fr-MobileFloatingToc.md:92` | i-4 | ✓ | ✓ | BOOKED (spec) |
| `fr-MobileFloatingToc.md:97` | F.W5–W8 gets nothing | — | — | BOOKED (declared fold) |
| `fr-MorphPhaseConfig.md:46` | MPC-2 | ✓ | ✓ | BOOKED (spec) |
| `fr-MorphPhaseConfig.md:47` | MPC-3 | ✓ | ✓ | BOOKED (spec) |
| `fr-MorphPhaseConfig.md:54` | MPC-5 | ✓ | ✓ | BOOKED (spec) |
| `fr-MorphPhaseConfig.md:59` | MPC-10 | ✓ | ✓ | BOOKED (spec) |
| `fr-MorphPhaseConfig.md:67` | MPC-13 | ✓ | ✓ | BOOKED (spec) |
| `fr-MorphPhaseConfig.md:68` | MPC-14 | ✓ | ✓ | BOOKED (spec) |
| `fr-MorphPhaseConfig.md:70` | MPC-16 | ✓ | ✓ | BOOKED (spec) |
| `fr-MorphPhaseConfig.md:75` | MPC-21 | ✓ | ✓ | BOOKED (spec) |
| `fr-MorphPhaseConfig.md:76` | MPC-22 | ✓ | ✓ | BOOKED (spec) |
| `fr-MorphPhaseConfig.md:82` | MPC-31 | ✓ | ✓ | BOOKED (spec) |
| `fr-MorphPhaseConfig.md:83` | MPC-32 | ✓ | ✓ | BOOKED (spec) |
| `fr-MorphPhaseConfig.md:91` | MPC-29 | — | — | **ESCAPED** |
| `fr-MorphShapePreview.md:52` | D-11 | ✓ | ✓ | BOOKED (spec) |
| `fr-MorphShapePreview.md:57` | L-05 | — | — | BOOKED (declared fold) |
| `fr-MorphShapePreview.md:67` | D-20 | ✓ | ✓ | BOOKED (spec) |
| `fr-MorphShapePreview.md:71` | D-26 | ✓ | ✓ | BOOKED (spec) |
| `fr-MorphShapePreview.md:91` | FR-MSP-4 | — | — | BOOKED (declared fold) |
| `fr-MorphShapePreview.md:92` | FR-MSP-5 | ✓ | ✓ | BOOKED (spec) |
| `fr-NotationPills.md:35` | FR-NP-32 ★NEW | — | — | BOOKED (declared fold) |
| `fr-NotationPills.md:43` | FR-NP-5 | — | ✓ | BOOKED (carry-fold) |
| `fr-NotationPills.md:44` | FR-NP-6 | — | — | BOOKED (declared fold) |
| `fr-NotationPills.md:53` | FR-NP-12 | — | ✓ | BOOKED (carry-fold) |
| `fr-NotationPills.md:54` | FR-NP-13 | ✓ | ✓ | BOOKED (spec) |
| `fr-PaperArticleWindow.md:42` | PAW-1 | ✓ | ✓ | BOOKED (spec) |
| `fr-PaperArticleWindow.md:89` | PAW-33 | ✓ | ✓ | BOOKED (spec) |
| `fr-PaperArticleWindow.md:93` | PAW-37 | ✓ | ✓ | BOOKED (spec) |
| `fr-PaperArticleWindow.md:99` | PAW-43 | — | — | BOOKED (declared fold) |
| `fr-PaperArticleWindow.md:288` | PAW-51 | ✓ | ✓ | BOOKED (spec) |
| `fr-PaperSearch.md:55` | Majors | — | — | **ESCAPED** |
| `fr-PaperSearch.md:56` | Minors | — | — | BOOKED (declared fold) |
| `fr-PaperSearchDropdown.md:43` | D:I-2 | — | ✓ | BOOKED (carry-fold) |
| `fr-PaperSearchDropdown.md:49` | D:B-3 | ✓ | ✓ | BOOKED (spec) |
| `fr-PaperSearchInput.md:46` | C-3 | ✓ | ✓ | BOOKED (spec) |
| `fr-PaperSearchInput.md:48` | D-B2 | — | — | BOOKED (declared fold) |
| `fr-PaperSearchInput.md:49` | D-M1 | ✓ | ✓ | BOOKED (spec) |
| `fr-PaperSearchInput.md:51` | D-M3 | ✓ | ✓ | BOOKED (spec) |
| `fr-PaperSearchInput.md:61` | MISS-LC2 | ✓ | ✓ | BOOKED (spec) |
| `fr-PaperSearchInput.md:74` | C-8 | ✓ | ✓ | BOOKED (spec) |
| `fr-PaperSearchInput.md:82` | D-i2 | ✓ | ✓ | BOOKED (spec) |
| `fr-PaperSearchModal.md:63` | PSM-24 | ✓ | ✓ | BOOKED (spec) |
| `fr-PaperSearchModal.md:76` | PSM-33 | — | ✓ | BOOKED (carry-fold) |
| `fr-PaperSearchModal.md:79` | PSM-36 | ✓ | ✓ | BOOKED (spec) |
| `fr-PaperSidebar.md:29` | M1 | ✓ | ✓ | BOOKED (spec) |
| `fr-PaperSidebar.md:33` | L-4 | ✓ | ✓ | BOOKED (spec) |
| `fr-PaperSidebar.md:60` | C-m9 | — | — | BOOKED (declared fold) |
| `fr-PaperSidebar.md:63` | M3 | ✓ | ✓ | BOOKED (spec) |
| `fr-PaperSidebar.md:116` | C-B1 → banked fr-BasisCanvas D-1/BC-1/C-1 | ✓ | ✓ | BOOKED (spec) |
| `fr-PaperView.md:45` | D/B-3 | — | ✓ | BOOKED (carry-fold) |
| `fr-PaperView.md:69` | C-03 | — | ✓ | BOOKED (carry-fold) |
| `fr-PaperView.md:70` | C-06 | — | — | BOOKED (declared fold) |
| `fr-PaperView.md:105` | C-13 | ✓ | ✓ | BOOKED (spec) |
| `fr-PaperView.md:106` | C-14 | — | ✓ | BOOKED (carry-fold) |
| `fr-PaperView.md:107` | C-15 + C-16 | ✓ | ✓ | BOOKED (spec) |
| `fr-PaperView.md:125` | C-19 | ✓ | ✓ | BOOKED (spec) |
| `fr-PaperView.md:134` | ★MF-12 | ✓ | ✓ | BOOKED (spec) |
| `fr-PaperView.md:194` | Census §1 pins + G33: C-03 is that identity AMENDED | — | ✓ | BOOKED (carry-fold) |
| `fr-PathPreview.md:50` | 15. PP-REDGATE | ✓ | ✓ | BOOKED (spec) |
| `fr-PathPreview.md:55` | 18. PP-COLORSEAM | ✓ | ✓ | BOOKED (spec) |
| `fr-PathPreview.md:61` | 22. PP-NOSHADOW | — | — | BOOKED (declared fold) |
| `fr-SliderControl.md:30` | R-1 | ✓ | ✓ | BOOKED (spec) |
| `fr-SliderControl.md:34` | R-5 | ✓ | ✓ | BOOKED (spec) |
| `fr-SliderControl.md:35` | R-6 | ✓ | ✓ | BOOKED (spec) |
| `fr-SliderControl.md:40` | R-11 | — | ✓ | BOOKED (carry-fold) |
| `fr-SliderControl.md:43` | R-14 | — | — | BOOKED (declared fold) |
| `fr-SliderControl.md:47` | R-18 | ✓ | ✓ | BOOKED (spec) |
| `fr-SpeedSelect.md:41` | D-03 / D-11 / SS-L-08 / SS-C-4 / SS-C-11 | ✓ | ✓ | BOOKED (spec) |
| `fr-SpeedSelect.md:43` | D §5 U-2 | ✓ | ✓ | BOOKED (spec) |
| `fr-SvgFilters.md:36` | D §3 U-2 | ✓ | ✓ | BOOKED (spec) |
| `fr-SvgFilters.md:38` | C-M4 | — | — | BOOKED (declared fold) |
| `fr-SvgFilters.md:39` | C-i2 | — | — | BOOKED (declared fold) |
| `fr-SvgFilters.md:43` | L-2 | ✓ | ✓ | BOOKED (spec) |
| `fr-SvgFilters.md:49` | D §3 U-3 | — | — | **ESCAPED** |
| `fr-SvgFilters.md:64` | C-S3 | — | — | **ESCAPED** |
| `fr-SvgFilters.md:85` | M-1 | ✓ | ✓ | BOOKED (spec) |
| `fr-SvgFilters.md:86` | M-2 | ✓ | ✓ | BOOKED (spec) |
| `fr-Tooltip.md:33` | FR-TT-5 | ✓ | ✓ | BOOKED (spec) |
| `fr-Tooltip.md:34` | FR-TT-6 | ✓ | ✓ | BOOKED (spec) |
| `fr-Tooltip.md:37` | FR-TT-9 | ✓ | ✓ | BOOKED (spec) |
| `fr-Tooltip.md:45` | FR-TT-14 | ✓ | ✓ | BOOKED (spec) |
| `fr-Tooltip.md:58` | FR-TT-24 | ✓ | ✓ | BOOKED (spec) |
| `fr-UserSlugBar.md:44` | FR-USB-7 | ✓ | ✓ | BOOKED (spec) |
| `fr-UserSlugBar.md:47` | FR-USB-10 | — | — | BOOKED (declared fold) |
| `fr-UserSlugBar.md:58` | FR-USB-18 | ✓ | ✓ | BOOKED (spec) |
| `fr-UserSlugBar.md:78` | FR-USB-35 | ✓ | ✓ | BOOKED (spec) |
| `fr-UserSlugBar.md:82` | FR-USB-39 | ✓ | ✓ | BOOKED (spec) |
| `fr-VisualizationView.md:44` | L-3 | — | ✓ | BOOKED (carry-fold) |
| `fr-VisualizationView.md:57` | L-13 / MAJ-3 / MAJ-4 / D-13(bypass) / D-2 | ✓ | ✓ | BOOKED (spec) |
| `fr-VisualizationView.md:60` | MAJ-6 | — | ✓ | BOOKED (carry-fold) |
| `fr-VisualizationView.md:69` | D-15 | — | — | BOOKED (declared fold) |
| `fr-VisualizationView.md:73` | D-11 | ✓ | ✓ | BOOKED (spec) |
| `fr-VisualizationView.md:102` | MIN-8 | ✓ | ✓ | BOOKED (spec) |
| `fr-VisualizationView.md:103` | §4 | ✓ | ✓ | BOOKED (spec) |
| `fr-VisualizationView.md:111` | D-29 / INF-1 | ✓ | ✓ | BOOKED (spec) |

---

## §4 ESCAPES off MENTION-classified lines (constraint / identity, not row-routings)

| record:line | id | what escaped |
|---|---|---|
| `fr-AdminAuditLog.md:48` | **AA-11** | binding constraint on this wave — “`./pagination` absent from BOTH export maps; **F.W1 must not plan the pagination cure around it**”. Absent from F-W1.md AND F-W1-CARRY.md. It is the sibling of FR-GIG-5's non-credit lock (G15) and is not carried there. |
| `fr-CanvasOverlayButton.md:87` | **FR-COB-28** | the seven-item relay-packet **identity** (“one relay letter, seven items, sent at F.W0/F.W1 open”). Named twice in the CARRY; the spec's NWO-1 roster reproduces the packet's *members* (FR-COB-7/-8/-6/-23/-26 …) but drops the packet id, so the “Item 7 DOCK-ACTIVE satisfied upstream — do not re-send” instruction has no anchor. |

---

## §5 M-25 DEPTH — anti-rename, cure-shape locks, sequencing riders, dissents

**Anti-rename (no invention)**: PASS. Every one of the spec's §2/§5 cells traces to a banked id; a reverse sweep of §2/§5 turned up **no spec-minted row** — each named id resolves either to a CARRY row or to an fr-* record row. `AA-4`, `KILL-6`, `C-M7`, `K-9`, `K-11`, `K-6`, `K-4`, `K-5`, `K-12`, `K-13`, `K-14`, `R-7`, `R-1`, `R-6`, `M-RTC`, `MG-κ`, `MG-ι`, `PP-#7`, `PP-COLORSEAM`, `PP-IMPORTSHAPE`, `FMD-21`, `GAB-29`, `F8-REACH-01/02`, `MISS-A7`, `SC-1..SC-8` all resolve in-corpus.

**The named locks, at the cells where their rows land:**

| lock | verdict | receipt |
|---|---|---|
| fr-PaperSearchModal same-commit riders (D-1 + D-3 + `outline:none` triple) | **CARRIED** | §5 row “Charter same-commit locks whose rows land elsewhere” — states the rows are *not* in this CARRY (PSM-36 certifies PaperSearchModal's sole F.W1 exposure = the lucide rename) and declares the locks so they are not lost. Exactly the honest shape. |
| FR-MSP-6 two-channel lock | **CARRIED** | same §5 row, same construction. |
| PAW-44 / LAW-3 | **CARRIED** | WU-Q PAW-1 cell: “**PAW-30 lands in the SAME repair; PAW-44 restores the sticky stack only WITH the background cure (LAW-3)**”; G16 blocks name `PAW-30/PAW-44 (LAW-3)`. |
| MPC-31 ONE-CUT law | **CARRIED VERBATIM** | WU-I: “**MPC-3 ⊕ MPC-10 ⊕ MPC-13 ⊕ MPC-8 ⊕ MPC-22 land as ONE CUT**”, + the colour-scheme-witness-at-a-non-boot-state clause, MPC-13's typecheck-flip ordering, MPC-22's `var()` token, D-14's fallbacks, and the boot seat correction (150ms/13.3% extent). Cross-wave seating is consistent: acceptance = G9 (F.W1), execution = F.W3/W4, and MPC-8's own row is F.W4 — so the one cut lands whole in F.W3/W4, not split. |
| FR-NP-32 corrupt-dist sequencing gate | **CARRIED** | G2 + NWO-1 “FR-NP-32 at TOP: the corrupt-dist emitter fix + a producer gate that parses its own `exports["./styles"]`, explicitly NOT a version bump”, and the bank's “F.W1 runs a build anyway” clause is struck — the spec states “**F.W1 opens on a red build**”. |
| FR-MSP-6 / F.W3's four anti-cures / F.W4's derivation-law preamble + NEGATIVE ROSTER | **N/A here** — those rows land in F-W3.md / F-W4.md; F-W1 correctly declines to pre-empt them (cross-edge 2 names the consumers; §5 defers B-2 slider execution, the transport-store direction repair, FR-EQC-10, FR-EQC-2's register join, the D-18 rainbow, FR-AFP focus-visible/row-state). |

**Dissents CARRIED, not merely cited**: PASS on every sampled cell — FMD-11 BLOCKER-at-today and GAB-2's DU revival trigger (AA-2); DU's C-2 BLOCKER (D-1, MG-ι); LC MAJOR + the auto-regrade-on-descope clause (B-1); LC MAJOR on tag-vs-HEAD honesty (B-4); reader-δ's revival condition (MPC-21/BR-1); LC BLOCKER + the ESC-5 regrade price (B-2 `.paper-texture`); FR-GV-18 MINOR-provisional (FR-EQC-3); three preserved BLOCKER dissents (FR-GIG-5); R1-DU MAJOR permanent-blur + the `contain: paint` bank trigger (U-2); the WCAG 2.5.8 spacing-exception note (MPC-32).

**Sequencing riders CARRIED**: HLG-41's ORDERING EDICT, D/M-8's witness-ordering lock, AA-1's toast-cure-first ordering, MM-11's dock-enlargement rider, K-2/A8-17 coupling, fr-FourierMorphSvg ruling 4, FR-EQC-10-after, FR-CP-20 re-tune, M-γ-as-prerequisite, `cure HOST imports FIRST`. **Not carried**: `fr-BasisSelector m-6` and `fr-CollapsibleSection m-7` (both “F.W3/W4 **with the F.W1 sequencing rider**”) and `fr-NotationPills FR-NP-6` (“F.W3 + F.W1 sequencing rider”) — the F.W1 side of three declared riders has no landing cell in this spec.

---

## §6 GATES — born-RED and L-19 (real witness)

**Witnesses verified against the live tree** (read-only; no product source opened for edit):

| gate | witness | verdict |
|---|---|---|
| G2 | installed `web/node_modules/@mkbabb/glass-ui/dist/styles/index.css` **222 lines**; the fold-block IS injected mid-comment at **:195-221** (`/* AN.W1 — SFC scoped component CSS … */ @import "../glass-ui.css"; … @import "./components.css";` spliced into a comment that resumes `@source\` line, Tailwind scanned an empty dir`), and the apostrophes `glass-ui's own` sit inside the orphaned tail. `web/src/style.css:3` = `@import "@mkbabb/glass-ui/styles";`. Installed producer = **4.0.0**. | **REAL, born-RED** |
| G3 | `git -C fourier-analysis status --porcelain` → **28** paths. | **REAL, born-RED** |
| G4 | `web/dist` mtime **Jun 12 18:13**; `npm run build` script exists. | **REAL** |
| G5 | `paper-texture` → 1 site (`web/src/App.vue:24`) ✓ · `text-admin-label` → **7 sites / 4 files** (AdminFlaggedPanel · AdminUserList · FrequencyGraph · CoefficientsSpectrum) ✓ exact · `.btn-pill` → **0 in `web/src`**; it is a *producer-applied* class (`glass-ui/dist/styles/utilities/base.css`, `a11y-overrides.css`, `button-*.js`) that NotationPills' local `:38/:40` shadow — the spec's cell is coherent but the witness carries **no consumer anchor**, unlike its three siblings. | **REAL (3 of 4 anchored)** |
| G6 | `web/e2e/visualization-crud.spec.ts` (662 L, :439-482/:612 resolve) · `workspace-flow.spec.ts` (204 L, :175-202) · `contour-extraction.spec.ts` (167 L, :139-166) · `gallery.spec.ts` (139 L, :118-135) · `scripts/e2e.sh:102` = `npx --prefix web vite web --port …` — **the DEV-server claim is exact**. | **REAL, born-RED** |
| G7 | live greps: `lucide-vue-next` **35/35** ✓ · `--slider-scrub` **23 / 7 files** ✓ · `size="icon"` raw **38 / 21 files** (the spec correctly refuses to average and defers to G7's stripped-comment grep). | **REAL** |
| G9 | token-family grep is the stated acceptance, not a variant-string sweep ✓; MPC-10's contrast leg named in the breaking direction ✓. | **REAL, born-RED** |
| G10 | `CollapsibleSection.vue` 72 L (`:60-65` resolves) · `ContourSettings.vue` 470 L (`:361-374` resolves). | **REAL, born-RED** |
| G11 | `.github/workflows/ci.yml` 197 L (`:95`) · `deploy-pages.yml` 130 L (`:114`). | **REAL, born-RED** |
| G12 | `web/src/lib/easings.ts` 127 L (`:58` resolves). | **REAL, born-RED** |
| G13 | committed manifest at `cd26c65`: glass `^3.1.0` · kf `^2.2.0` · value `^0.10.0` · `lucide-vue-next: "latest"` — **all four exact**; `@lucide/vue` → **0 lock entries, 0 manifest rows, 1.20.0 on disk** (MISS-LC2 verified); `vaul-vue` → **0 lock entries** (FR-EQC-7 verified); cva/clsx/reka-ui/tailwind-merge/lucide all in `devDependencies` (C-3 verified). | **REAL, born-RED** |
| G18 | `GlassTimeline.vue` 127 L (`:73` resolves). | **REAL, born-RED** |
| **G15** | **NOT born-RED.** The gate's own witness cell reads “Born-RED at CARRY authoring; **the footnote now exists at WU-Q·FR-GIG-5** — flips GREEN at this spec's ratification review”. A gate satisfied by the spec's own prose at the moment of authoring is GREEN-at-birth. | **DEFECT** |
| **G20** | **NOT born-RED and stamps a verb.** “Witness = §6 closure roster below; **verified by enumeration at authoring**”. The four-verb table sets VERIFIED = NO; G20's own cell claims verification. | **DEFECT** |

**L-19 (proof-script contrivance)**: PASS. Zero bespoke proof scripts. Every invocation is real repo tooling — `npx vue-tsc -b --force`, `npm run build`, `npm ls`, `npm ci --omit=dev`, `git diff --check`, `git -C … status --porcelain`, literal greps. No `proof:*` target anywhere.

---

## §7 §1 BOUNDS — PHANTOM PRODUCT PATHS (the pass's hardest finding)

The spec's §1 “Product surface (fourier-analysis `web/`, **AT EXECUTION only, reconciled verbatim from CARRY §Bounds**)” names paths that **do not exist** — not in the working tree, and not at `cd26c65` (the commit the whole 66-record corpus audits). `git ls-tree cd26c65 web/src/components/` = `decorative equation layout morph paper shared ui visualization` — there is **no `dock/`, no `gallery/`, no `animation/` directory, and never was**.

| spec §1 path | status | actual |
|---|---|---|
| `src/lib/basis-display.ts` | **PHANTOM** | `web/src/components/visualization/lib/basis-display.ts` |
| `src/env.d.ts` | **PHANTOM** | `web/env.d.ts` (PP-REDGATE's ambient-declaration cure targets a file the bounds mis-locate) |
| `src/components/visualization/CoefficientsSpectrum.vue` | **PHANTOM** | `web/src/components/shared/CoefficientsSpectrum.vue` (also the G11 witness) |
| `src/components/gallery/UserSlugBar.vue` | **PHANTOM** | `web/src/components/visualization/gallery/UserSlugBar.vue` (also the G6 `copied`-triple witness) |
| `src/components/dock/CanvasControlsDock.vue` | **PHANTOM** | `web/src/components/visualization/CanvasControlsDock.vue` |
| `src/components/dock/EditorControlsDock.vue` | **PHANTOM** | `web/src/components/visualization/EditorControlsDock.vue` |
| `src/components/AppHeader.vue` | **PHANTOM** | `web/src/components/layout/AppHeader.vue` |
| `src/components/animation/AnimationControls.vue` | **PHANTOM** | `web/src/components/visualization/AnimationControls.vue` |

Correct at §1: `style.css` (143 L — `:98-112` and `:40-49` both resolve), `lib/colors.ts` (117 L — `:22-53` and `:101-117` resolve exactly), `lib/easings.ts`, `main.ts`, `App.vue`, `composables/useToast.ts`, `composables/useMorphConfig.ts`, `components/ui/CollapsibleSection.vue`, `components/visualization/ContourSettings.vue`, `components/equation/EquationResult.vue`, `components/equation/InfoCard.vue`, `components/paper/**`, all four e2e specs, `scripts/e2e.sh`.

**Why this is load-bearing**: §1 Bounds is the wave's write-authorization surface and the halt condition is “any write outside §1 bounds”. Eight of the ~20 enumerated product paths cannot be written to as spelled, and four of them are *simultaneously named as gate witnesses* (G6, G10's sibling, G11, the metric-badge roster). The defect is **transcribed verbatim** from `F-W1-CARRY.md §Bounds` (identical list, `web/` prefix intact) — which is precisely M-25's “transcription-only is DEFECTIVE”: the spec re-copied a bounds block instead of re-resolving it against the tree it declares READ-ONLY-but-readable.

**Related — the CARRY's provenance anchors do not resolve.** The spec's §2 delegates witness enumeration to “the CARRY cell”. Sampling the CARRY's `fr-NAME:LINE` citations against the records' true line counts: `fr-PaperSearch:671` (file is **92** lines) · `fr-NotationPills:651` (**132**) · `fr-EquationResult:355` (**129**) · `fr-EqCoefficientsPanel:322/:323/:325` (**129**) · `fr-EquationView:363/:367/:369` (**301**) · `fr-ExportModal:380` (**104**) · `fr-FourierMorphSvg:406` (**105**) · `fr-FourierShapeExtractor:422/:423` (**157**) · `fr-CoefficientsSpectrum:187` (**159**) · `fr-CollapsibleSection:204/:207` (**133**) · `fr-ContourEditorCanvas:221` (**162**) · `fr-ConvergenceLegend:255` (**176**) · `fr-ConvergenceTimeline:273` (**155**) · `fr-EasingPicker:295` (**157**) · `fr-CanvasOverlayButton:153/:154/:159` (**133**) · `fr-CoefficientsPanel:170/:172/:174` (**137**). A second anchor family in the same file *does* resolve (`fr-AdminAuditLog:36`, `fr-App:66-75`, `fr-BasisCanvas:100-111`, `fr-BasisSelector:56`, `fr-CanvasControlsDock:139`). The spec inherits both, unremarked, as its G20 witness.

---

## §8 E-3 + STATUS

| requirement | verdict | receipt |
|---|---|---|
| zero VERIFIED stamps | **NEAR-PASS, one breach** | `:8` `**Status**: planned`; `:21` `VERIFIED \| NO \| stamps at X·F sub-tranche close, never here`. The only other uses are a gate *title* (G12 “VERIFIED BY EXECUTION” — a future assertion) and **G20's “verified by enumeration at authoring”**, which asserts a completed verification act inside a `planned` file. |
| status `planned` everywhere | **PASS** | one `Status` field, one value. |
| no execution verbs in current voice | **NEAR-PASS** | the commit plan is explicitly “at execution, post-begin-word”; §4.5 is “Post-transaction witnesses”. Sole slip: **G15's “the footnote now exists … flips GREEN”** — a present-tense state change asserted by the spec about itself. |
| the spec opens no product source | **PASS in letter; the phantom paths are the proof** — the author demonstrably did not open the tree (§7). The execution gate at `:10` is unambiguous. |
| the fourier tree stays READ-ONLY in every witness | **PASS** | every gate witness is a read (`git status --porcelain`, greps, `npm ls`, `vue-tsc -b`, a build, an e2e run) or a to-be-created evidence path under `docs/tranches/X/fourier/evidence/w1/` + `F-W1-LOG.md` (declared, correctly, as create-at-execution). Halt conditions forbid any producer-tree WRITE. |

---

## §9 POSTURE AXES

**(a) ONE atomic land-or-lose transaction.** Substantially **HELD**. G6 is the indivisibility gate with a real four-spec witness; §4.4 enumerates the single change (bump ⊕ 162-attribute rewrite ⊕ `copied`→`status` triple ⊕ lucide rename ⊕ G10 deletions ⊕ **FR-EQC-7 vaul-vue manifest gate INSIDE** ⊕ G13 manifest/lock moves ⊕ PP-REDGATE ambient ⊕ FR-CP-13 gap ⊕ M-γ deletion ⊕ GCM-22 `p-0` ⊕ pencil-boil floor), commit #4 is “**ONE commit**”, and its body carries the adopted hash + the G7 figure + the G5 result + the ESC rulings — so the RE-PIN act is inside the act it authorises. Three residual cracks:
  1. **Commit #3 (`fix(fourier/viz): the --viz-* palette cure at the current pin`) lands product source in a separate commit before the transaction.** Defensible under cross-edge 3 (the `colors.ts` leg is landable at 0.13.0 and `/dom` `resolveTokenColor` is at the CURRENT pin), and WU-E is kept internally atomic (D-1 ⊕ D-2 ⊕ C-4 ⊕ BasisCanvas C-4 ⊕ M-β5 ⊕ HLG-41). But a wave titled “ONE land-or-lose transaction” ships **two** product commits, and the spec never states the failure semantics if #4 aborts after #3 has landed.
  2. **The P0 CSS-class census has no landing cell.** G5 measures and “reconciles AA-15's cure/break collision”, but §4.4's transaction list contains **no** `.paper-texture` / `text-admin-label` / `.btn-pill` consumer cure. `.cartoon-card` is explicitly F.W1-sequenced-F.W3 and `text-admin-label` may go to the BH relay — but if the census returns “consumers re-target `--type-micro`”, that edit has no commit.
  3. **G17's cartoon-card ordering** is required “before either executes”, yet neither AA-4 nor FR-EQC-3 executes in F.W1 — the gate is an ordering ruling with no F.W1 execution to order.

**(b) F.W0's pre-gates precede everything; its anchor re-resolution table is what later waves quote.** **DEFECT.** `F-W0.md:199` establishes **G-11 — “ONE corrected anchor table published; every later wave quotes it”** (with `SUBSTRATE-LEDGER.md` as the durable artefact). F-W1 **does not quote it**: cross-edge 1 names only `G2 · G3 · MISS-LC2 · FR-AH-33 · M-15-as-ERRATA'd`, and F-W1's own G1 re-performs the act (“every producer `file:line` in all 66 records re-resolves at that hash”). Two waves independently own the same re-resolution with no reciprocal. Secondary: §State makes F.W0's close an *opening precondition* while §4's intra-wave order lists “F.W0 discharges G2 + G3” as **step 2**, after G1 — the wave cannot both open-after-F.W0 and contain F.W0's discharge.

**(c) SS-4 waves flag owner rulings INLINE, never presumed.** **HELD from this end.** WU-R/G19 carries ESC-1..ESC-6 with blocked rows named and “Never presumed”; cross-edge 10 states “**SS-4 flags its owner rulings INLINE (trie-vs-KISS et al.) at its own spec; F.W1 carries only the non-edge**”, and declares TA-4 a NON-edge so it is not mis-routed into the transaction. ESC-1's blocked-row list is explicit and “Every routing here survives either answer” is testable and, on inspection of the 7-vs-8 conditional cells (GCM-22, FR-FG-20, K-8/SR-1, FR-TT-5/-9, G14, `./menu`), true.

**(d) F.W10's SPLIT gate stays honestly split.** **N/A to this spec**; F-W1 declares cross-edge 9 (the minted visual-regression checkpoint set → F.W9/F.W10) without presuming F.W10's disposition. No encroachment.

---

## §10 VERDICT — **DEFECTIVE** (pass 1)

The spec is unusually strong on evidence: every gate but two is genuinely born-RED with a witness this seat re-derived from the live tree (G2's corrupt-dist splice, G3's 28 paths, G6's four DEV-server specs at exact anchors, G13's whole substrate claim, the 35/35 lucide and 23/7 slider censuses, the committed `^3.1.0`/`^2.2.0`/`^0.10.0`/`latest` manifest), zero proof-script contrivance, zero invented rows, and the CARRY's 105 ids close 105/105 in both directions. The convictions are:

1. **§1 Bounds names eight phantom product paths** (three directories that have never existed), transcribed verbatim from the CARRY — and four of them double as gate witnesses. *(HIGH)*
2. **15 adjudicated ids routed to F.W1 escape both the spec and the CARRY**, headed by `fr-SvgFilters D §3 U-3` (MAJOR — the twice-rejected register must not ride the uplift), `fr-AdminFlaggedPanel FR-AFP-33` (MAJOR client limb), and `fr-PaperSearch D-14/D-15/D-17` (the three token limbs the re-ink cell omits). Plus `AA-11` and `FR-COB-28` off mention-lines. *(HIGH)*
3. **G15 and G20 are not born-RED**; G20 additionally stamps “verified … at authoring” in a `planned` file. *(MEDIUM)*
4. **The spec's fold cells elide 42 routed ids behind ellipses** (`FR-AFP-2 … fr-EasingCurvePreview`; `fr-App B-1 … fr-GalleryView C·C-1`; `FR-AUL-53 … fr-ImageUpload`; three “Witnesses folded per CARRY cell” pointers), so the id-keyed census cannot be re-run from the spec — and the ledger it delegates to carries **16+ unresolvable `fr-NAME:LINE` anchors**. *(MEDIUM)*
5. **F.W0's G-11 anchor table is not quoted**; F-W1's G1 re-performs the re-resolution, and §State/§4 disagree on whether F.W0 closes before or inside this wave. *(MEDIUM)*
6. **Two product commits under a “ONE land-or-lose transaction” title**, and the P0 CSS-class census's consumer cures have no landing cell. *(LOW-MEDIUM)*
7. **Three declared “F.W1 sequencing rider” obligations have no F.W1 cell** (`fr-BasisSelector m-6`, `fr-CollapsibleSection m-7`, `fr-NotationPills FR-NP-6`). *(LOW)*
