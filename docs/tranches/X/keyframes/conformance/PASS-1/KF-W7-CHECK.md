# KF.W7 — FRESH ADVERSARIAL SPEC CHECK (L-18/L-20, PASS 1)

**Spec under trial**: `/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W7.md` (346 lines, 108410 bytes, mtime 2026-08-28 11:52).
**Corpus authority**: the 58 `kf-*.md` records at `docs/tranches/V/megatranche/registry/adjudicated/` (`ls kf-*.md | wc -l` → 58).
**Method (X·P terminal, ID-keyed)**: every line in all 58 records matching `\bW7\b` was extracted (222 hits), reduced to bullet rows carrying a routing (160), and each row's TERMINAL disposition read at the bytes. Each routed id was then grepped against `KF-W7.md`. Gate witnesses were re-executed against `/Users/mkbabb/Programming/keyframes.js` at `origin/master`. Zero writes outside this file.

**Verdict: DEFECTIVE.** Census 148 routed · 145 booked · **3 escaped**. Six further defects, two of them MAJOR.

---

## §1 · ID-KEYED CENSUS (routed → booked / escaped / excluded)

Legend: **B** = booked (spec carries it as a row, a named fold-identity, or a named rider) · **E** = ESCAPED (absent from the spec by bytes) · **X** = booked as an exclusion-with-reason in §Excluded.

### A · kf-KeyframeTimeline.md — 41 routed, 41 booked

| # | banked id | record line | spec locus | state |
|---|---|---|---|---|
| A1 | C-1 | :42 | §Carry P1 | B |
| A2 | C-6 | :43 | P1 | B |
| A3 | L-3 | :44 | P1 | B |
| A4 | L-5 | :45 | P1 | B |
| A5 | D-4/L-4/C-5 | :46 | P7 (locks G10) | B |
| A6 | L-6/C-4 | :47 | P8 (feeds G6) | B |
| A7 | C-7 | :48 | P8 (locks G14) | B |
| A8 | D-3 | :49 | P6 "D-3 (percent readout a11y)" | B |
| A9 | D-10 | :55 | P7 "D-10 (KeyframeTimeline)" | B |
| A10 | D-11 | :56 | P3 | B |
| A11 | D-12 | :57 | P5 "D-12 (dead marker motion)" | B |
| A12 | D-15 | :59 | P8 "D-15 (empty/failure states)" | B |
| A13 | D-17 | :60 | P4 | B |
| A14 | M1 | :61 | P4 | B |
| A15 | M2 ≡ RR-B-7 | :62 | P1 | B |
| A16 | M3 | :63 | P5 (locks G8) | B |
| A17 | M5 ≡ RR-B-3 | :64 | P3 (locks G13) | B |
| A18 | M7 | :65 | P7 | B |
| A19 | N-2 | :66 | P8 | B |
| A20 | L-8/C-9 | :71 | P9 | B |
| A21 | L-11 | :72 | P8 "L-11 (KeyframeTimeline)" | B |
| A22 | L-12/C-8 | :73 | P9 | B |
| A23 | L-13 | :74 | P9 dead-surface pair | B |
| A24 | L-14/C-16 | :75 | P9 dead-surface pair | B |
| A25 | L-16/L-17 | :76 | P9 | B |
| A26 | C-15 | :79 | P0 (locks G1) | B |
| A27 | N-6 | :80 | P6 (locks G5) | B |
| A28 | N-8 | :81 | P8 | B |
| A29 | N-9 | :82 | P8 | B |
| A30 | M9 | :84 | P7 (rung lock) | B |
| A31 | D-13 | :86 | P9 coherence group | B |
| A32 | D-16 | :87 | P9 coherence group | B |
| A33 | D-22 | :91 | P9 coherence group | B |
| A34 | L-18/C-11 | :95 | P9 INFO group | B |
| A35 | L-20 / L-21 | :96 | P9 INFO group | B |
| A36 | C-13 | :97 | P9 INFO group | B |
| A37 | C-17 | :98 | P9 INFO group | B |
| A38 | D-25 / D-26 / D-28 (hygiene group) | :99 | P9 hygiene cells | B |
| A39 | N-10 | :100 | P1 law head (+ LP-1 rider) | B |
| A40 | N-12 | :102 | P9 INFO group (PROHIBITION) | B |
| A41 | kf-ChannelControls L-2/C-2 (cross-ref, "settled before/within KF.W7") | :114 | OP-1 + §Sequencing 1 | B |

*Fold row `D-2/L-2/C-2 ≡ kf-CSSPasteDialog R-3 (MAJOR, → KF.W7)` (:106) is counted once at E1 (R-3), per the identity guard.*

### B · kf-TimelineTrack.md — 31 routed, 31 booked

| # | banked id | record line | spec locus | state |
|---|---|---|---|---|
| B1 | D-1 | :40 | P1 "D-1 (TimelineTrack)" | B |
| B2 | M-3/C-4 | :41 | P1 | B |
| B3 | RR-B missed-1 | :42 | P2 (locks G3) | B |
| B4 | RR-B missed-2 | :43 | P2 (locks G4) | B |
| B5 | D-8 | :45 | P5 "D-8 (state contract, TimelineTrack)" | B |
| B6 | D-10 | :46 | P5 "D-10 (expanded mode, TimelineTrack)" | B |
| B7 | D-4 | :51 | P4 "D-4 (tick pitch, TimelineTrack)" | B |
| B8 | M-7 | :52 | P3 (joint) | B |
| B9 | RR-B missed-4 | :53 | P3 (joint, escalation armed) | B |
| B10 | RR-B missed-3 | :54 | P1 | B |
| B11 | D-12/C-12/i-2 merged | :55 | P4 | B |
| B12 | D-13 net arm | :56 | P7, folded into D-3/L-D6/C-6 | B |
| B13 | D-14/i-1 | :57 | P4 | B |
| B14 | C-10/C-11/D-m6/m-1/D-m5 merged | :59 | P9 contract-hygiene group | B |
| B15 | m-9/m-11/m-12 merged | :60 | P1 | B |
| B16 | L-m-10 | :61 | P3 | B |
| B17 | L-m-14 | :62 | P2 | B |
| B18 | m-7/m-8 merged | :63 | P7 | B |
| B19 | RR-A missed-1 | :64 | P5 (feeds G9) | B |
| B20 | RR-A missed-2 | :65 | P5 | B |
| B21 | RR-A missed-3 | :66 | P5 | B |
| B22 | RR-A missed-4 | :67 | P7, carried as MISSED-1's description arm | B |
| B23 | D-m2 | :68 | P4 | B |
| B24 | m-3 | :73 | P9 INFO group | B |
| B25 | L-m-4 | :74 | P9 INFO group | B |
| B26 | L-m-5 | :75 | P9 INFO group (K-6 magnitude kill carried) | B |
| B27 | RR-B missed-5 | :77 | P4 + P9 INFO group | B |
| B28 | m-6 | :78 | P4 + P9 INFO group | B |
| B29 | i-3 | :79 | P9 INFO group | B |
| B30 | ARB-1 | :80 | P2 (killed-claim lock carried) | B |
| B31 | C-2 (fresh BLOCKER) = banked C-1 | :86 | fold identity, carried at P1 C-1 | B |

### C · kf-TimelineCaret.md — 18 routed, 18 booked

| # | banked id | record line | spec locus | state |
|---|---|---|---|---|
| C1 | L-2/C-3/D·M-4 | :40 | P6 (locks G7) | B |
| C2 | MISS-β1 | :41 | P6 (locks G5) | B |
| C3 | m-5/L-6/C-5 | :50 | P6 | B |
| C4 | L-7 | :51 | P6 "L-7 (TimelineCaret)" | B |
| C5 | L-9/m-8 | :52 | P6 (S-3 protection lock carried) | B |
| C6 | m-1/L-10 | :53 | P6 (promotion trigger armed) | B |
| C7 | L-11 | :54 | P3 "L-11 (TimelineCaret wheel)" | B |
| C8 | m-4 + MISS-α1 | :55 | P6 | B |
| C9 | MISS-α2 | :60 | P6 | B |
| C10 | MISS-α4 | :62 | P6 (KF-CE-41 law) | B |
| C11 | C-10 | :66 | P6 (cure-shape PROHIBITION) | B |
| C12 | C-9 | :67 | P4 "C-9 (TimelineCaret)" | B |
| C13 | L-15 | :68 | P6, ruling delivered at G14 | B |
| C14 | MISS-β4 | :70 | P4 | B |
| C15 | B-1/L-3/C-2 = banked M2 ≡ RR-B-7 | :74 | fold, carried at P1 M2 | B |
| C16 | B-2/L-12/C-11's 4.1.2 arm = banked D-3 + M8 | :75 | fold, carried at P6 D-3 | B |
| C17 | D·M-1/C-8 = banked M1 | :77 | fold, carried at P4 M1 | B |
| C18 | D·M-2 = banked D-17 + D-28 (K-13 corrections) | :78 | fold, carried at P4 D-17 + the D-19 lock | B |

### D · kf-TimelineHoverPreview.md — 23 routed, 23 booked

| # | banked id | record line | spec locus | state |
|---|---|---|---|---|
| D1 | MISSED-1 | :42 | P7 (locks G9) | B |
| D2 | D-7 | :43 | P7 ghost-family head | B |
| D3 | D-2/L-D9 | :49 | P7 | B |
| D4 | D-3/L-D6/C-6 | :50 | P7 | B |
| D5 | C-5 | :51 | P7 "C-5 (THP)" (feeds G6) | B |
| D6 | L-D4/C-4(b) | :52 | P7 | B |
| D7 | L-D8/C-4(a) | :54 | P7 | B |
| D8 | D-12 (THP) | :57 | P7 layout pair | B |
| D9 | D-15 (THP) | :58 | P7 layout pair (+ BH relay) | B |
| D10 | C-9 (THP) coverage | :59 | P7 (locks G11) | B |
| D11 | MISSED-4 | :62 | P7 | B |
| D12 | GHOST-PLATE | :63 | P7 | B |
| D13 | L-D14 | :69 | P7 hygiene group | B |
| D14 | L-D15 | :70 | P7 hygiene group | B |
| D15 | MISSED-6 | :71 | P7 hygiene group | B |
| D16 | P2-DEAD | :73 | P7 hygiene group | B |
| D17 | D-1/C-1 ≡ banked M7 | :77 | fold, carried at P7 M7 | B |
| D18 | D-8/L-D1/C-3 ≡ banked D-4/L-4/C-5 | :80 | fold, carried at P7 | B |
| D19 | L-D5 ≡ banked L-5 | :81 | fold, carried at P1 L-5 (citation corrections carried) | B |
| D20 | D-9/C-2 ≡ banked D-10 | :82 | fold, carried at P7 D-10 (KeyframeTimeline) | B |
| D21 | C-7 (THP) ≡ banked C-15 | :84 | fold, carried at P0 C-15 | B |
| D22 | L-D12/C-10 ≡ banked N-2 + N-9 | :86 | fold, carried at P8 | B |
| D23 | D-13's live-region arm ≡ banked D-22 | :88 | fold, carried at P9 D-22 | B |

*MISSED-3 (:61) routes **KF.W6**, not W7 — the spec nonetheless carries it whole at P7 as a two-wave binding law. Not counted in routedTotal; carried, not invented (the record's own text binds both cures).*

### E · kf-CSSPasteDialog.md — 8 routed, 8 booked

R-3 (:41) → P8 · R-4 (:42) → P8 (+ KAD-9/KAD-10) · R-7 (:45) → P8, locks G15 · R-17 (:59) → P8 MINOR group · R-19 (:61) → P8 MINOR group · R-21 (:63) → P8 · R-22 (:64) → P8 · R-23 (:65) → P8. **All B.**

### F · kf-KeyframesAddDialog.md — 9 routed, 6 booked, **3 ESCAPED**

| # | banked id | record line | terminal disposition (verbatim tail) | spec | state |
|---|---|---|---|---|---|
| F1 | KAD-6 | :50 | `**→ KF.W6/W7**` | P8 | B |
| F2 | KAD-9 | :53 | `**→ KF.W7**` (+ KF.W2 registry) | P8 under R-4 | B |
| F3 | KAD-10 | :54 | `**→ KF.W7**` | P8 under R-4 | B |
| F4 | KAD-13 | :57 | `**→ KF.W7**` | P8 | B |
| F5 | KAD-F3 | :63 | `**FOLD to kf-CSSPasteDialog R-7**` (→ KF.W7) | P8 "R-7 (the twin fold) ≡ KAD-F3" | B |
| **F6** | **KAD-15** | **:68** | **`**→ KF.W6/W7**; the animator fold and RTL referral ride design-idioms.css's owner`** | **absent** | **E** |
| **F7** | **KAD-16** | **:69** | **`**→ KF.W6/W7** (die in the fold/swap)`** | **absent** | **E** |
| **F8** | **KAD-20** | **:73** | **`**→ KF.W6/W7**`** | **absent** | **E** |
| F9 | KAD-21 | :74 | `**→ KF.W7**` | P8 MINOR group | B |

**Escape receipt**: `grep -c "KAD-15\|KAD-16\|KAD-20" docs/tranches/X/keyframes/waves/KF-W7.md` → **0**. None appears in §Carry, §Gates, §Sequencing, or §Excluded. §Excluded's only KAD entry is the `innerHTML` BLOCKER (→ KF.W5); its typography/token family enumerates KT/TT/caret/THP/KF-SCR ids and **no KAD id**. The spec's §Excluded opener — *"No CARRY row is dropped"* — is therefore false against the registry for three W6/W7 dual-homed rows.

Why it matters (not clerical): KAD-16's `grid`-defeats-`DialogFooter`-flex cell and KAD-15's footer-placement cell are the **structural root of the fold direction** the spec pins at R-7 (adopt CSSPasteDialog's a11y composition + the twin's text-hoisting contract). G15's discharge discipline ("the execution seat STATES which rows the KF.W6 swap already discharges BEFORE spending a cure") cannot be executed for rows the spec never names.

### G · kf-SequenceScrubber.md — 1 routed, 1 booked

C·C-4 (:58, `→ **KF.W7** (contract question) + NO-WAVE-OWNER`) → P0 "C·C-4 (SequenceScrubber)", with the K-8 kill lock and SUP-5 carried verbatim. **B.**
(:128/:134 are fold/summary lines resolving to KF-AV-28 — counted at H5. `L·D-12` is NO-WAVE-OWNER; the spec cites it at G11 as the second N-10-class coverage instance — carried, not counted.)

### H · kf-AnimationVisualizer.md — 5 routed, 5 booked

| # | id | line | terminal disposition | spec | state |
|---|---|---|---|---|---|
| H1 | KF-AV-10 · D-5 | :51 | `→ KF.W7` | P0 (bundles SpringTarget m-8) | B |
| H2 | KF-AV-13 | :60 | `NO-WAVE-OWNER (decide press-to-seek with the KF.W7 evaluation)` | P0 rider — decision here, cure NO-WAVE-OWNER (exact) | B |
| H3 | KF-AV-14 | :54 | `NO-WAVE-OWNER (cross-ref KF.W7)` | P0 rider | B |
| H4 | KF-AV-24 | :68 | `→ KF.W8 …, cross-ref KF.W7` | P0 rider; consolidation routed KF.W8 (exact) | B |
| H5 | KF-AV-28 · D-18 = C-13 | :72 | `→ **KF.W7** — this row is the wave's intake` | header rider + P0 (locks G1) | B |

*KF-AV-17 (:61) folds into KF-AV-1's cure (NO-WAVE-OWNER) — not W7-routed; the spec nonetheless carries its K-12 cure-shape lock (`translateX(calc(var(--p) * (100cqw − 100%)))`) verbatim. Carried, not counted.*

### I–P · single/two-row records — 12 routed, 12 booked

| # | record | id | line | spec | state |
|---|---|---|---|---|---|
| I1 | kf-SpringTarget | C-4 | :64 (`**KF.W7 (S-9 evaluate…)**`) | P0 "SpringTarget C-4 ≡ C-4 (SpringTarget)" + route dissent | B |
| I2 | kf-SpringTarget | m-8 ≡ banked KF-AV-10 | :69/:135 | P0, bundled into KF-AV-10 | B |
| J1 | kf-SpringTrace | C-3 | :62/:139 | P0 "SpringTrace C-3 ≡ C-3 (SpringTrace)" + route dissent | B |
| K1 | kf-SequencePlayhead | C-§4 export-surface correction ≡ C-15 | :143/:151 | P0 C-15's fold list, verbatim | B |
| L1 | kf-RibbonBar | RB-7 | :77/:131 | P5 + expanded settlement | B |
| M1 | kf-CSSCodeEditor | KF-CE-2 parent half | :34 | P8 (3 hard locks) + OP-1 + G2 | B |
| N1 | kf-KeyframeCard | KF-KC-11 (undo-trail arm) | :53 | P8 undo-authority ruling; cure NO-WAVE-OWNER/CARD-UNIT (exact) | B |
| N2 | kf-KeyframeCard | KF-KC-52 | :100 | P8, docblock correction inside the ruling | B |
| O1 | kf-DemoGlobalChrome | M-4 → **KF.W7-TOKENS** | :62 | §Excluded, naming-schism reason | X |
| O2 | kf-ControlsPaneWrapper | D-m3 → **KF.W7-TOKENS** | :72 | §Excluded, naming-schism reason | X |
| O3 | kf-AnimationControlsGroup | D-12 → **KF.W7-TOKENS** | :83 | §Excluded, naming-schism reason | X |
| P1 | kf-PlaybackRibbon | the standing §7 counter-evidence caution (spec-named `PR-CAUTION`) | :36 | header lock, verbatim | B |

### Records with ZERO W7-routed rows (verified, not assumed)

`kf-SequenceAxis` (:130 — *"KF.W6/W7: no axis-owned rows"*), `kf-SequenceScene` (:153 — *"KF.W7: none"*), `kf-AmigaScene` (J.W7a/J.W7c = tranche-J taxonomy, not this wave), and the 40 records with zero `W7` hits: kf-TypingDots · kf-TransportDock · kf-StartingStyleTarget · kf-SquareScene · kf-SquareInstrument · kf-SpringScene · kf-SpringPhysicsFacet · kf-SpringHeatmap · kf-SharePopover · kf-SequenceTarget · kf-OrbitalDrag · kf-MbabbMenu · kf-MatrixEditor · kf-LayerConfigPanel · kf-KfPillTabs · kf-KeyframesStringControls · kf-KeyframeCardList · kf-KeyboardShortcutsModal · kf-HeroAurora · kf-EditorStartScreen · kf-EditorShell · kf-EditorHeader · kf-CubeTarget · kf-CubeScene · kf-CubeAxisLines · kf-ChromeDock · kf-ChannelOptions · kf-ChannelControls · kf-App.skeleton · kf-App · kf-AnimatedText (+ kf-TimingFunctionPanel / kf-KeyframesEditor / kf-EasingTarget / kf-EasingSidebar / kf-EasingScene / kf-CopyButton, whose sole `W7` hit is the boilerplate routing-law taxonomy line).

**CENSUS TOTAL: 148 routed · 145 booked (142 B + 3 X) · 3 ESCAPED.**

---

## §2 · NO INVENTION (M-25 transcription-only test)

Every spec row was traced to a banked id. **No fabricated rows.** Cure-shape locks, sequencing riders and dissents are CARRIED, not merely cited — spot-verified at the bytes:

- **Cure-shape locks carried whole**: KF-AV-17's `translateX(calc(var(--p) * (100cqw − 100%)))` (kf-AnimationVisualizer:61 K-12, verbatim) · RR-B missed-1's `grabDx` per `GradientStopEditor C11/G5` (GradientStopEditor.md:198/:249 — "A grab is not a teleport", 10.11px for 1px of input, `no grabDx; :145 emits absolute`) · L-2/C-3/D·M-4's compare-before-commit per `kf-MatrixEditor ME-42` (kf-MatrixEditor.md:28, the lossy display round-trip, net-new at r3) · KF-AV-10's cure caution per `kf-EasingTarget P-2` (kf-EasingTarget.md:109, verbatim "*would drop 28 balls out of their rails*") · MISSED-1's "pass a composed `ariaLabel` at the mount" · M2's MISS-β3 "*the fix REPLACES the inert guards*" · L-16/L-17's `feedback_kiss_no_contrivance` in-file-`v-for` lock · D-10 (TT) "expanded mode earns lanes/curves or dies" · C·C-4's K-8 `{progress}`-prop kill.
- **Kill locks correctly attributed** (each re-read in its own record's killed-claims register): KT K-1 (:118 two manufactured Delete harms) · KT K-4 (:121 L-3's watch cure) · KT K-7 (:124 L-9's fallback) · KT K-8 (:125 L-15 — the kill that PROTECTS live code; the spec's `L-15-PROTECTED`) · TT K-4 (:114 PRM bracket) · TT K-5 (:115 D-m1 inverted) · TT K-6 (:116 ~102-tick) · TT K-7 (:117 M-3 harm sentence) · TT K-8 (:118 m-13 latch) · TT K-9 (:119 D-1 BLOCKER) · caret K-13 (kf-TimelineCaret.md:78, "Contributed corrections (K-13, adopted)" — the ~1px padding-box family; **citation stands**) · caret killed-claims #5/#6/#11/#13/#15 all resolve to kf-TimelineCaret.md:93/94/99/101/103 · THP K-3/K-4/K-8 (:96/:97/:101) · SequenceScrubber K-8 (:87) · AnimationVisualizer K-12 (:61).
- **Dissents carried, not dropped**: RR-A's BLOCKER on C-1 (KT:161) · RR-A's MAJORs on D-4/M-7/D-12/D-13-net (TT:150) · RR-B's inverted M-3/C-4 rung (TT:152) · RR-A's MAJORs on THP D-2/D-3/C-5/D-5 (THP:134) · reader-1's MAJOR on KF-AV-13 · reader-A's INFO on C·C-4 · RR-α's caret dissent · **two route dissents recorded** (SpringTrace C-3 and SpringTarget C-4, both preserving the record's own KF.W7 routing rather than silently re-homing).
- **Cross-corpus packet ids all resolve**: KF-SCR-1, L·D-1, KF-AV-15, TD-1/TD-2/TD-21/TD-38/TD-40/TD-41, kf-ChromeDock M-4 + MbabbMenu MUST-CARRY, KF-AV-32, KF-SCR-2, KF-SKEL-16, KF-CE-16/-41/-12/-18, KF-CO-1/KF-CO-8, MM-29, SUP-5, C-S+1, REGISTER-LAUNDER, TEP-12/MCP-31, EDITOR-UNIT, CARD-UNIT, LP-1, kf-SquareScene MISS-1 (:59/:126 — the same GradientStopEditor class precedent, "books NEW here").

**Two minted ids** (§3 D6): `PR-CAUTION` and `L-15-PROTECTED` exist in **zero** registry files. Both substances trace; the naming is disclosed in the fold-repair footer. Booked as MINOR, not invention.

---

## §3 · DEFECT REGISTER

### D1 — MAJOR · three routed rows escape the census by bytes
KAD-15, KAD-16, KAD-20 each terminate `**→ KF.W6/W7**` (kf-KeyframesAddDialog.md:68/:69/:73) and appear **nowhere** in KF-W7.md.
**Receipt**: `grep -c "KAD-15\|KAD-16\|KAD-20" KF-W7.md` → `0`; `sed -n '68p;69p;73p' kf-KeyframesAddDialog.md | grep -o "KF.W6/W7"` → three hits. §Excluded line 327 asserts *"No CARRY row is dropped"*.

### D2 — MAJOR · the spec's provenance cites an artifact that does not exist
Four separate claims bind the spec to a KF.W7 CARRY ledger: `:13` *"authored against the CARRY ledger whole"* · `:38` *"CARRY boundsFiles reconciled"* · `:327` *"No CARRY row is dropped"* · `:343` *"exact CARRY ids restored to every row header (grep-verifiable against the ledger)"*.
**Receipt**: `find docs/tranches/X -iname "*CARRY*"` → `fourier/carry/F-W1-CARRY.md`, `fourier/carry/F-W4-CARRY.md`, `keyframes/carry/KF-W6-CARRY.md` — **no KF-W7 CARRY**; `grep -rn "boundsFiles" docs/tranches/X/` → hits only in F-W5/F-W8/F-W9/KF-W2. The sibling KF-W2.md:44 names its CARRY's paths and reports six that do not resolve; KF-W7 names none. The spec's own falsifiability claim ("grep-verifiable against the ledger") cannot be run. L-20 receipts defect: the wave's zero-drop assertion rests on an unproduceable source, and D1 is exactly the failure that source would have caught.

### D3 — MINOR · G15 witness #3, as written, refutes its own stated outcome
Gate text: `grep -n "initialText" CSSPasteDialog.vue` → *"declared, never bound (the dead channel R-4 needed)"*.
**Receipt**: `git show origin/master:demo/components/instrument/timeline/CSSPasteDialog.vue | grep -n initialText` → `49: initialText?: string;` · `53: initialText: "",` · `59: const text = ref(props.initialText);` · `67: text.value = props.initialText;` — the prop IS bound, twice, inside the file. The bank's actual claim (R-19) is that no **mount** passes it; verified at `KeyframeTimeline.vue:135-152`, where both mounts pass only `open/title/description/button-label/button-icon/@submit`. A born-RED gate whose named command returns the opposite of its stated reading is not a live witness.

### D4 — MINOR · G15 witness #4 miscounts; the command cannot return the claimed number
Gate text: `grep -rn "\.label" demo/components/instrument/timeline/` → *"two occurrences total (N-2's write-only state)"*.
**Receipt**: the command returns **one** — `KeyframeTimeline.vue:106 v-model="selectedKeyframe.label"`. The bank's second occurrence is `timelineTypes.ts:11 label?: string`, which `\.label` cannot match. An execution seat running the named witness reads 1-of-2 and may grade the row half-cured.

### D5 — MINOR · three incompatible statements of the same runnability precondition
`:230` *"No gate is runnable before G11 lands its mounts and G12 pins the ref"* · `:272` G11 is *"the runnability precondition of G2-G10, G13"* (excludes G1, G14, G15) · `:298` §Sequencing 2 scopes it to commits (*"no cure commit precedes them"*). G1 is a documentary verdict needing no mount and G14/G15 are ruling gates; the preamble over-claims and the three readings cannot all hold.

### D6 — MINOR · two ids minted in a spec that promises banked ids verbatim
`:89` *"Every row lands with its banked id verbatim"*, yet `PR-CAUTION` and `L-15-PROTECTED` are this spec's coinages.
**Receipt**: `grep -rl "PR-CAUTION\|L-15-PROTECTED" registry/adjudicated/` → **0 files**. Substances trace (kf-PlaybackRibbon.md:36 §7 verbatim; kf-KeyframeTimeline.md:125 K-8) and the footer discloses the naming, but any downstream grep keyed to the registry misses both locks.

### D7 — INFO · G1's shipped-but-unexported enumeration is one component short
Gate text lists `ContinuousRail / ContinuousMarkers / ScrubberTimeline / SegmentedTimeline / geometry.d.ts`.
**Receipt**: `ls node_modules/@mkbabb/glass-ui/dist/components/timeline/` also ships `ContinuousTimeline.vue.d.ts` and `types.d.ts`. The load-bearing cells are exact (`wc -l index.d.ts` → **2**; content = `GlassTimeline` + 3 types only), so the verdict is unaffected; the census sentence is not exhaustive.

---

## §4 · AXES THAT HOLD (no defect)

**Gates (L-19).** Fifteen gates, all stamped RED, each with a named live witness; **zero proof-scripts** — no `proof:*` invention anywhere (the one `npm run proof:structure` mention at OP-2 is a *correction* to the banked quotation of the existing `check` script, re-verified: `git show origin/master:package.json` → `"check": "tsc --noEmit && tsc --noEmit -p tsconfig.test.json && npm run proof:structure"`). Witnesses re-executed and **held**:
- `git rev-parse master origin/master` → `8281638c…` / `81a56990…`; `git merge-base` → `a59d3a22…` — G12 exact.
- `wc -l …/glass-ui/dist/components/timeline/index.d.ts` → **2** — G1 exact.
- `grep -n SliderVariant …/slider/types.d.ts` → `"standard" | "spectrum"` — G1 exact.
- `ls node_modules/@vue/` → compiler/reactivity/runtime/shared only; `@vue/test-utils` **absent** from disk and from `origin/master:package.json`; `jsdom ^29.1.1` present; `origin/master:vitest.config.ts` has **no `plugins` key** — OP-4 and G11's cost claim exact, and the two bounds carve-rows (`package.json` devDeps-only, `vitest.config.ts` plugins-only) are the correct consequence.
- G2: `git show origin/master:KeyframeTimeline.vue | grep -n scrub` → **78, 83, 197, 202, 224**, bare `scrub` among none; `useTimeline.ts` returns `scrub` and the destructure takes `scrubT`/`scrubAndCapture` — exact.
- G2/G13: `grep -n "isPrimary\|pointerType"` in TimelineTrack.vue → **0**; `@wheel.prevent` at `:31`; `touch-none` at `:24`; `useZoomPan.ts` delta reads at `:50` and `:59` only, `deltaX` nowhere — the spec's corrected `:59` anchor is right and the banked `:57-61` span was indeed one line long.
- G11's create-path (`test/demo/instrument/**`) is declared with its path, as L-19 requires for a to-be-created fixture.

**§Bounds line counts — all 18 verified exactly** against `git show origin/master:<f> | wc -l`: 312 / 246 / 70 / 38 / 129 / 200 / 88 / 110 / 41 / 8 / **102** / 66 / 33 / 80 / 161 / 162 / 256 / 31. The header's two corrections both hold: KeyframeTimeline is **312** (not the banked 313) and `timelineEngine.ts` is **102** at origin/master (not the dirty-worktree 104). `demo/utils/keyframeSelector.ts` exists at origin/master and `timelineTypes.ts` carries `selector` there — the G12 substrate claim is real.

**E-3 + STATUS.** `grep -n VERIFIED KF-W7.md` → exactly one hit, the verb table's `| VERIFIED | NO |`. Zero VERIFIED stamps, zero GREEN stamps (`grep -o GREEN` → 0). Status is `planned` at `:5` and re-declared at `:345`. No execution verb sits in current voice about product: every act in past tense is a *documentary* act on the spec (measurements, citation corrections, bounds reconciliation, the disclosed fold-repair pass) and every product act is future/conditional. The spec opens no product source: all measurement is `git show` / `ls` / `grep` read-only, and `:5` says so explicitly.

**POSTURE AXES.**
- **KF.W4 = declared sequencing head** — honoured: OP-2 names KF-CE-16 *"the sequencing head of the whole record"*, the cross-edge is **depends-on for VERIFICATION not authoring**, and every typed cure (L-12/C-8, L-7 (caret), L-m-10, the TT contract-hygiene group, L-13 / L-14/C-16) declares its verification block. The wave also pays KF.W4 back (the census-gate design brief, C-S+1 + REGISTER-LAUNDER).
- **KF.W3 GATED via PLAW-BIND, never scheduled** — honoured: the only W3 traffic is an OUT (C-7's §F-2 scope correction + fuzz-entry note); the IN dependency (OP-5, the parse façade) is on **KF.W2**, which is correct — census `CENSUS-2026-08-03.md:186-190` puts the façade at W2 and PLAW-BIND at W3. Nothing in the spec schedules or blocks on W3.
- **KF-AV-28 supersession rider** — carried as the wave's *defining lock* in the header, re-stated at P0, mechanised in §Verdict ("per-surface SWAP ⇒ the bespoke rows DISCHARGE with the component, each discharge named"), and given its counter-evidence (PR-CAUTION) in the same breath. The rider's own binding list from the bank (AnimationVisualizer's NO-WAVE-OWNER roster · SequenceScrubber's shape rows · PlaybackRibbon's transport packet · KF.W13's "resolve KF.W7 first") is reproduced.
- **KF.W6 squaring** — five explicit bindings declared from this end (MISSED-3's same-commit box law both ways; N-2 ruled here first; caret C-7's `.focus-ring` order inversion; L-9/m-8's discharge-with-NumberField; KAD-6 standing alone if the fold is declined). This is the correct direction of declaration; the 424-row KF-W6-CARRY squaring itself is W6's gate, not this file's — **except** that the three escapes at D1 are precisely W6/W7 dual-homed rows, so the squaring is *not* complete from this side either.

---

*Written by the PASS-1 fresh adversarial check seat. Sole write = this file. No product source opened; no registry or spec byte modified.*
