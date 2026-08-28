# KF-W6 — FRESH ADVERSARIAL SPEC CHECK, PASS 1 (L-18/L-20)
**Subject**: `docs/tranches/X/keyframes/waves/KF-W6.md` (417 L, status `planned`)
**Bank**: `docs/tranches/X/keyframes/carry/KF-W6-CARRY.md` (366 L, **201 rows**)
**Authority**: the 58 `kf-*.md` records under `docs/tranches/V/megatranche/registry/adjudicated/`
**Seat**: fresh adversarial check seat · no product source opened for writing · read-only git/dist instruments only

---
## §0 · Method
Block-level parse of all 58 records; every bullet / table row / routing-manifest line whose text carries a
KF.W6 routing token was collected. Routing tokens counted as **routing INTO this wave**, per the spec's own
binding taxonomy (KF-W6 §Taxonomy L10, CARRY §TAXONOMY RECONCILIATION):

- `KF.W6` (new numbering) — **but NOT** `KF.W6-TIMELINE` (that is KF.W7 under the old numbering)
- `KF.W2-TABS` · `KF.W3-SHIM` · `KF.W5-PARTIALS` · `KF.W7-TOKENS` — all COLLAPSE INTO this wave
- `KF.W4-PROSE` — collapses **except** the phantom-AUTHORITY `proof:*` limb (KF.W4 G-KFW4-8)

Census unit = the **(record, banked-id) pair**. Ids are record-scoped: `D-5` at kf-ChromeDock and `D-5` at
kf-TimelineTrack are different rows and are checked separately, against the spec's per-record qualifier
(`CC-`, `KPT `, `KSM `, `CPD `, `THP `, `ChromeDock `, `KeyframeTimeline `, …).

---
## §1 · Corpus totals

| measure | value |
|---|---|
| records carrying a KF.W6 routing token | **56** of 58 |
| records routing **explicit zero** rows | 2 — `kf-SequenceAxis` ("KF.W6/W7: no axis-owned rows", L130) · `kf-SpringTarget` ("KF.W6: no axis-owned material-register rows", L145) |
| **contributing records** | **54** — squares with the spec/CARRY's "54 records" |
| records with zero KF.W6 token | 2 — `kf-OrbitalDrag`, `kf-TimingFunctionPanel` |
| W6-routed row-blocks | 435 |
| **routed census units (record, id)** | **390** |
| literal `KF.W6` token occurrences across the 58 records | **424** |

> **Correction to the check order's framing.** The CARRY is **not** a "424-row" file. 424 is the count of
> literal `KF.W6` tokens across the registry (`grep -ohE 'KF[.-]W[0-9]+[A-Za-z-]*' kf-*.md | sort | uniq -c`
> → `424 KF.W6`). The CARRY is 366 lines carrying **201 rows** — which is exactly what it and the spec both
> claim ("201 rows / 54 records", KF-W6 L7 and L416; `grep -c '^- \*\*'` → 201). The 54-record figure is
> **CORRECT** by this census. The CARRY's *prose* gloss is not: "the **50** assigned slugs plus
> [5 named]" = 55, not 54 (CARRY L7).

---
## §2 · ID-KEYED CENSUS — id for id

`BOOKED` = carried by the spec as a row, a named fold-identity, a §Bounds carve-row, a homed packet arm, a
gate witness, or an §Excluded line with its home named. `ESCAPED` = present in no such position.
`EXCLUDED-OK` = the registry's terminal disposition is **not** this wave and the spec says so.

### kf-AmigaScene — 12 routed ids

- **BOOKED (11)**: `C-6` · `C-7` · `D-10` · `D-12` · `D-4` · `D-5` · `D-9` · `L-i5` · `MISSED-B` · `MISSED-D` · `MISSED-H`
- **ESCAPED (1)**: **`L-m7`**

### kf-AnimatedText — 19 routed ids

- **BOOKED (19)**: `KF-AT-1` · `KF-AT-10` · `KF-AT-11` · `KF-AT-13` · `KF-AT-14` · `KF-AT-15` · `KF-AT-16` · `KF-AT-17` · `KF-AT-18` · `KF-AT-19` · `KF-AT-2` · `KF-AT-20` · `KF-AT-22` · `KF-AT-25` · `KF-AT-26` · `KF-AT-3` · `KF-AT-5` · `KF-AT-6` · `KF-AT-8`

### kf-AnimationControlsGroup — 5 routed ids

- **BOOKED (5)**: `C-2` · `C-4` · `D-12` · `L-5` · `M-1`

### kf-AnimationVisualizer — 2 routed ids

- **BOOKED (2)**: `KF-AV-11` · `KF-AV-27`

### kf-App — 10 routed ids

- **BOOKED (10)**: `KF-APP-15` · `KF-APP-16` · `KF-APP-21` · `KF-APP-25` · `KF-APP-26` · `KF-APP-40` · `KF-APP-48` · `KF-APP-49` · `KF-APP-5` · `KF-APP-6`

### kf-App.skeleton — 15 routed ids

- **BOOKED (15)**: `KF-SKEL-1` · `KF-SKEL-10` · `KF-SKEL-11` · `KF-SKEL-12` · `KF-SKEL-13` · `KF-SKEL-14` · `KF-SKEL-17` · `KF-SKEL-18` · `KF-SKEL-2` · `KF-SKEL-22` · `KF-SKEL-3` · `KF-SKEL-4` · `KF-SKEL-6` · `KF-SKEL-7` · `KF-SKEL-8`

### kf-CSSCodeEditor — 6 routed ids

- **BOOKED (5)**: `KF-CE-17` · `KF-CE-20` · `KF-CE-22` · `KF-CE-23` · `KF-CE-46`
- **EXCLUDED-OK**: `KF-CE-32` — routed "KF.W6-adjacent" only; terminal = FOLD → census F-1 → KF.W0; spec §Excluded row 5 names it

### kf-CSSPasteDialog — 19 routed ids

- **BOOKED (19)**: `R-1` · `R-10` · `R-11` · `R-12` · `R-13` · `R-14` · `R-15` · `R-16` · `R-18` · `R-2` · `R-20` · `R-24` · `R-25` · `R-26` · `R-27` · `R-5` · `R-6` · `R-8` · `R-9`

### kf-ChannelControls — 26 routed ids

- **BOOKED (24)**: `C-1` · `C-10` · `C-11` · `C-13` · `C-15` · `C-3` · `C-6` · `D-10` · `D-11` · `D-2` · `D-3` · `D-8` · `D-9` · `L-17` · `L-18` · `L-19` · `L-5` · `L-6` · `N-1` · `N-2` · `N-3` · `N-7` · `SUP-4` · `§0`
- **ESCAPED (2)**: **`D-7`** · **`L-4`**

### kf-ChannelOptions — 7 routed ids

- **BOOKED (7)**: `KF-CO-18` · `KF-CO-19` · `KF-CO-20` · `KF-CO-24` · `KF-CO-25` · `KF-CO-30` · `KF.W6`

### kf-ChromeDock — 8 routed ids

- **BOOKED (8)**: `C-5` · `C-9` · `D-1` · `D-10` · `D-22` · `D-23` · `D-24` · `D-5`

### kf-ControlsPaneWrapper — 3 routed ids

- **BOOKED (3)**: `C-5` · `D-m3` · `N-1`

### kf-CopyButton — 7 routed ids

- **BOOKED (7)**: `KF-CB-12` · `KF-CB-13` · `KF-CB-14` · `KF-CB-25` · `KF-CB-27` · `KF-CB-5` · `KF-CB-7`

### kf-CubeAxisLines — 6 routed ids

- **BOOKED (6)**: `KF-AX-11` · `KF-AX-12` · `KF-AX-15` · `KF-AX-25` · `KF-AX-3` · `KF-AX-31`

### kf-CubeScene — 5 routed ids

- **BOOKED (4)**: `D-11` · `D-7` · `KF.W6` · `MISS-3`
- **ESCAPED (1)**: **`D-20`**

### kf-CubeTarget — 5 routed ids

- **BOOKED (2)**: `#58` · `#60`
- **ESCAPED (3)**: **`#21`** · **`#30`** · **`#39`**

### kf-DemoGlobalChrome — 2 routed ids

- **BOOKED (2)**: `M-4` · `M-L3`

### kf-EasingScene — 2 routed ids

- **BOOKED (2)**: `KF-ES-28` · `KF-ES-45`

### kf-EasingSidebar — 1 routed ids

- **BOOKED (1)**: `KF-ES-21`

### kf-EasingTarget — 3 routed ids

- **BOOKED (3)**: `KF-ET-10` · `KF-ET-17` · `KF-ET-21`

### kf-EditorHeader — 7 routed ids

- **BOOKED (7)**: `EH-10` · `EH-4` · `EH-5` · `EH-8` · `EH-9` · `F3` · `F4`

### kf-EditorShell — 5 routed ids

- **BOOKED (5)**: `C-1` · `C-9` · `D-1` · `L-1` · `L-15`

### kf-EditorStartScreen — 28 routed ids

- **BOOKED (26)**: `D-C1` · `D-C2` · `KF-EST-1` · `KF-EST-10` · `KF-EST-12` · `KF-EST-13` · `KF-EST-14` · `KF-EST-15` · `KF-EST-16` · `KF-EST-17` · `KF-EST-18` · `KF-EST-19` · `KF-EST-2` · `KF-EST-20` · `KF-EST-21` · `KF-EST-22` · `KF-EST-3` · `KF-EST-4` · `KF-EST-5` · `KF-EST-8` · `KF-EST-9` · `L-EST-12` · `L-EST-2` · `L-EST-6` · `ND-1` · `ND-7`
- **ESCAPED (2)**: **`D-C6`** · **`ND-10`**

### kf-HeroAurora — 20 routed ids

- **BOOKED (20)**: `KF-APP-15` · `KF-APP-16` · `KF-APP-48` · `KF-HA-1` · `KF-HA-10` · `KF-HA-11` · `KF-HA-12` · `KF-HA-13` · `KF-HA-15` · `KF-HA-16` · `KF-HA-17` · `KF-HA-18` · `KF-HA-2` · `KF-HA-20` · `KF-HA-3` · `KF-HA-4` · `KF-HA-7` · `KF-HA-8` · `KF-HA-9` · `P-7`

### kf-KeyboardShortcutsModal — 23 routed ids

- **BOOKED (23)**: `C-7` · `C-9` · `M7` · `R-1` · `R-11` · `R-12` · `R-13` · `R-14` · `R-15` · `R-16` · `R-17` · `R-18` · `R-19` · `R-2` · `R-20` · `R-21` · `R-22` · `R-3` · `R-4` · `R-5` · `R-6` · `R-7` · `R-8`

### kf-KeyframeCard — 5 routed ids

- **BOOKED (5)**: `KF-KC-10` · `KF-KC-13` · `KF-KC-33` · `KF-KC-37` · `KF-KC-4`

### kf-KeyframeCardList — 5 routed ids

- **BOOKED (5)**: `KC-12` · `KC-21` · `KC-23` · `KC-26` · `KC-5`

### kf-KeyframeTimeline — 15 routed ids

- **BOOKED (14)**: `C-3` · `D-1` · `D-14` · `D-18` · `D-20` · `D-5` · `D-6` · `D-7` · `D-8` · `D-9` · `L-1` · `M10` · `M6` · `M8`
- **EXCLUDED-OK**: `M7` — terminal → KF.W7 (register misuse); W6 named only as cross-ref

### kf-KeyframesAddDialog — 20 routed ids

- **BOOKED (20)**: `KAD-1` · `KAD-11` · `KAD-12` · `KAD-15` · `KAD-16` · `KAD-18` · `KAD-19` · `KAD-20` · `KAD-22` · `KAD-23` · `KAD-25` · `KAD-3` · `KAD-4` · `KAD-6` · `KAD-7` · `KAD-8` · `KAD-F1` · `KAD-F2` · `KAD-F4` · `KAD-F5`

### kf-KeyframesEditor — 13 routed ids

- **BOOKED (13)**: `KF-KE-21` · `KF-KE-23` · `KF-KE-24` · `KF-KE-30` · `KF-KE-31` · `KF-KE-32` · `KF-KE-36` · `KF-KE-39` · `KF-KE-40` · `KF-KE-42` · `KF-KE-45` · `KF-KE-53` · `KF-KE-59`

### kf-KeyframesStringControls — 2 routed ids

- **BOOKED (2)**: `D-20` · `N-9`

### kf-KfPillTabs — 1 routed ids

- **BOOKED (1)**: `N-KPT-2`

### kf-LayerConfigPanel — 2 routed ids

- **BOOKED (1)**: `LP-8`
- **EXCLUDED-OK**: `LP-2` — ≡ KF-CO-1; spec §Excluded row "KF-CO-1 / KF-CO-8" with the LP-1 sequencing lock

### kf-MatrixEditor — 2 routed ids

- **BOOKED (2)**: `ME-13` · `ME-18`

### kf-MbabbMenu — 2 routed ids

- **BOOKED (2)**: `MM-4` · `MM-44`

### kf-OrbitalDrag — 0 routed ids (no W6-routed ids)

### kf-PlaybackRibbon — 3 routed ids

- **BOOKED (3)**: `C-10` · `D-14` · `L-m1`

### kf-RibbonBar — 7 routed ids

- **BOOKED (7)**: `C-2` · `C-9` · `D-3` · `D-7` · `D-8` · `RB-2` · `RB-5`

### kf-SequenceAxis — 0 routed ids (explicit-zero routing)

### kf-SequencePlayhead — 4 routed ids

- **BOOKED (2)**: `C-11` · `D-9`
- **ESCAPED (1)**: **`flat-namespace datum`**
- **EXCLUDED-OK**: `K-28` — BOOKING-KILL, not a routed row; spec §Killed carries "SequencePlayhead R.F8's authority"

### kf-SequenceScene — 1 routed ids

- **BOOKED (1)**: `D4`

### kf-SequenceScrubber — 0 routed ids (no W6-routed ids)

### kf-SequenceTarget — 3 routed ids

- **BOOKED (3)**: `C-6` · `D-16` · `L-13`

### kf-SharePopover — 13 routed ids

- **BOOKED (13)**: `SP-1` · `SP-10` · `SP-11` · `SP-18` · `SP-19` · `SP-20` · `SP-21` · `SP-4` · `SP-5` · `SP-6` · `SP-7` · `SP-8` · `SP-9`

### kf-SpringHeatmap — 5 routed ids

- **BOOKED (4)**: `C-M-1` · `D-M2` · `D-M3` · `K-9`
- **ESCAPED (1)**: **`L-M-3`**

### kf-SpringPhysicsFacet — 4 routed ids

- **BOOKED (4)**: `SPF-10` · `SPF-27` · `SPF-32` · `SPF-6`

### kf-SpringScene — 1 routed ids

- **BOOKED (1)**: `KF-SS-9`

### kf-SpringTarget — 0 routed ids (explicit-zero routing)

### kf-SpringTrace — 1 routed ids

- **BOOKED (1)**: `L-4`

### kf-SquareInstrument — 2 routed ids

- **BOOKED (1)**: `K-6`
- **ESCAPED (1)**: **`D-20`**

### kf-SquareScene — 3 routed ids

- **BOOKED (3)**: `D-18` · `D-23` · `KF.W6`

### kf-StartingStyleTarget — 2 routed ids

- **BOOKED (2)**: `KF-SST-28` · `KF-SST-30`

### kf-TimelineCaret — 10 routed ids

- **BOOKED (10)**: `C-4` · `C-7` · `D·M-3` · `D·M-5` · `D·M-7` · `D·M-9` · `L-13` · `L-5` · `MISS-α3` · `MISS-α6`

### kf-TimelineHoverPreview — 8 routed ids

- **BOOKED (8)**: `D-11` · `D-14` · `D-17` · `D-4` · `D-5` · `L-D7` · `MISSED-2` · `MISSED-3`

### kf-TimelineTrack — 2 routed ids

- **BOOKED (2)**: `D-3` · `D-5`

### kf-TimingFunctionPanel — 0 routed ids (no W6-routed ids)

### kf-TransportDock — 3 routed ids

- **BOOKED (3)**: `TD-13` · `TD-24` · `TD-36`

### kf-TypingDots — 5 routed ids

- **BOOKED (5)**: `KF-TD-3` · `KF-TD-4` · `KF-TD-6` · `KF-TD-7` · `KF-TD-9`

---

## §3 · THE ESCAPES — named by bytes

**8 hard escapes + 5 alias drops = 13 of 390 routed units (3.3%).**

### E-1 · `kf-CubeTarget` `#21` · `#30` · `#39` — MAJOR

The record's terminal routing manifest, the most explicit markup form in the corpus:

> `kf-CubeTarget.md:100` — `- **KF.W6**: r1 set (#8 · #9 · #21 · #30 · #39) **+ #58** (axis-token contrast) **+ #60** (duration-token rider).`

and the r2 record carries the r1 bodies by reference:

> `kf-CubeTarget.md:38` — *"**Carried whole from r1 (re-anchored, unrestated):** rows **#1–#52** stand as ADJUDICATED with their r1 severities, proofs, and routings, EXCEPT as corrected below"*

The spec carries `#58` (L223), `#60` (L221/L270), and names `#8`/`#9` in passing (L223, *"theme-aware axis tokens with the #8/#9 packet"*). `#21`, `#30`, `#39` appear **nowhere** in KF-W6.md or KF-W6-CARRY.md — not as rows, not as folds, not as §Excluded lines. The §Sequencing packet homing (L368) enumerates only *"CubeTarget #58/#60"*, so the cube packet does not absorb them either.

Receipt: `grep -oE '#(8|9|21|30|39|58|60)\b' waves/KF-W6.md` → `#58 #60 #60 #58 #8 #9 #60 #58 #60` — no `#21`, no `#30`, no `#39`.

### E-2 · `kf-ChannelControls` `D-7 / L-4` — MAJOR

> `kf-ChannelControls.md:54` — `**D-7 / L-4 — MAJOR · isSingleSurfaceScene is unreachable under the live T.B2 derivation and its 20-line rationale names its own counterexamples…** Disposition: **NO-WAVE-OWNER** (delete the branch); the counterfactual rationale block rides **KF.W4-PROSE**.`

The spec's own binding taxonomy claims exactly this limb:

> KF-W6 L10 — *"KF.W4-PROSE splits by mechanism (phantom-AUTHORITY `proof:*` limb → KF.W4's G-KFW4-8; every other limb — phantom consumers, **false invariant names**, stale vendor premises, impossible type claims, **broken text** — is this wave's)"*

A 20-line rationale block that names its own counterexamples is a false-invariant/broken-text limb, not a `proof:*` cite. It is absent from KF-W6.md **and** from KF-W6-CARRY.md (`grep 'D-7 / L-4\|isSingleSurfaceScene\|single-surface'` over both files → 0 hits). §Bounds L29 puts `ChannelControls.vue` in scope and W6-C books CC-L-19/-L-18/-N-7/-C-13 prose from the same file — this MAJOR row's prose limb is the one that fell out.

### E-3 · `kf-SquareInstrument` `D-20` — MINOR

> `kf-SquareInstrument.md:144` — `— **KF.W6**: the flat-namespace/--rainbow-* datum (with the execution attachment) · **the D-20 producer-truth correction rides the standing glass-ui BH relay note (the BG-6 ask re-derived against the tokenized producer)**.`
> `kf-SquareInstrument.md:82` — `**D-20** … glass-ui 7.0.0 DOES ship --font-display-weight (scale.css, verified) + --type-weight-display; the demo's :255-262 comment ("no token to swap it") is false and the eight-selector block could be token re-points…`

The spec touches `SquareInstrument.vue` (§Bounds L75) and books only `D-23`/`D-18`; `(+SquareInstrument K-6 residue)` at L149 is the parser attachment, not this row. Neither the eight-selector re-point nor the BG-6 relay ask appears in G-W6-14's relay inventory (L349) or the §Sequencing relay list (L381). The sibling fact is booked *for AnimatedText/EST* at L201 (`KF-AT-22 ≡ L-EST-2/D-C1`), which is a different file's comments — so the row is not folded, it is dropped.

### E-4 · `kf-CubeScene` `D-20` — MINOR

> `kf-CubeScene.md:176` — `- **KF.W6** — D-7 (face palette dark arm) · D-11 + MISS-3's .tap-floor (the phantom-utility audit, KF-APP-6's re-cut) · **D-20 rides**.`
> `kf-CubeScene.md:96` — `**D-20 — CONFIRMED (sharpened at the frontier).** Both provenance headers stamp "glass-ui 4.0.0"; at the frontier the pin AND the installed copy are 7.0.0… **NO-WAVE-OWNER (rides any touching wave).**`

This wave *is* a touching wave (`CubeScene.vue` at §Bounds L72) and owns the prose-with-code family (W6-C, under KF-CE-41's "the cure commit carries the comment"). The spec books CubeScene `D-7`, `D-11`, `MISS-3` and never `D-20`; W6-C's stale-vendor-premise class is exactly its home.

### E-5 · `kf-SequencePlayhead` — the flat-namespace datum — MINOR

> `kf-SequencePlayhead.md:151` — `— **KF.W6**: C-3 + the D-7 residue (the --specular/--shade material register; cross-repo relay if producer-owned) · the R.F8 annotation rider · **the flat-namespace datum**.`

Three W6 items routed; the spec books two (the material register at L165, the R.F8 annotation rider at L166). The flat-namespace datum has no row, no fold, no §Excluded line. `KF-AX-25`'s flat-namespace pair (L163) is CubeAxisLines', a different record.

### E-6 · alias drops (INFO ×5)

Co-ids on rows the spec otherwise carries, dropped without an alias line — M-25 dedupes by identity but the id-keyed trail breaks:

| dropped co-id | banked row | carried in spec as |
|---|---|---|
| `L-m7` (kf-AmigaScene) | `C-7 / L-m7` — `kf-AmigaScene.md:62`, *"**KF.W6** (token hygiene rider)"* | `C-7` only (L219) |
| `L-M-3`, `C-B-1` (kf-SpringHeatmap) | `D-M3 / L-M-3 / C-B-1` — `kf-SpringHeatmap.md:40` | `D-M3` only (L220) |
| `D-C6`, `ND-10` (kf-EditorStartScreen) | `L-EST-6 / D-C6 / ND-10` ≡ `KF-AT-1` — `kf-EditorStartScreen.md:46` | the `KF-AT-1` identity (L243) |

---

## §4 · NO INVENTION (M-25)

Sweep: 237 distinct id-shaped tokens in the spec checked against the concatenated 58-record corpus. **One untraceable.**

### D-INV-1 · `KF-SP-3` is a minted id — MAJOR

> KF-W6 L165 — `- **KF-SP-3 + D-7 residue** (MIN) — --specular exists nowhere; define --specular/--shade as light-dark() pairs and repoint :63-64; ONE cure; cross-repo relay if producer-owned.`

`grep -c 'KF-SP-3' docs/tranches/V/megatranche/registry/adjudicated/kf-*.md` → **0**. The banked id is `kf-SequencePlayhead` **`C-3`** (`kf-SequencePlayhead.md:50`, routed at `:151`). The CARRY discloses the mapping — `KF-W6-CARRY.md:97`, `**KF-SP-3 (SequencePlayhead C-3) + the D-7 residue**` — and the spec **drops the disclosing parenthetical**, leaving the row unresolvable by id against the registry. Worse, the same document carries the row under **both** names: §Bounds L74 says *"C-3 material register + F8 annotation"* while §Carry L165 says `KF-SP-3`. This violates the CARRY's own stated law, §Rows preamble: *"Ids keep their banked names for life."*

### D-INV-2 · `W6-AUTH-1` — an unbanked net-new that re-shapes four adjudicated rows — MINOR

Disclosed in place (L8, L92) and honestly labelled `(SPEC, net-new)`. **Its factual claim is TRUE — this seat re-verified it independently at the installed dist**, so this is a provenance/process finding, not a falsity finding:

- `node_modules/@mkbabb/glass-ui/package.json` → `version 7.0.0`, **73** exports subpaths, sole wildcard `./fonts/*` ✔
- `./tabs` → `dist/tabs.d.ts` = `export * from "./components/tabs"` → `dist/components/tabs/index.d.ts` exports **exactly** `SegmentedTabs` + 7 types ✔
- `dist/tabs.js` tail → `export { W as SegmentedTabs };` — one runtime symbol ✔
- root barrel `dist/index.d.ts` → `grep -c useTabRovingFocus` = **0**; `dist/glass-ui.js` export list → 0 roving hits ✔
- `dist/motion-core.js` export list carries `useSelectionGroup`/`useSelectionIndicator`, **no** `useTabRovingFocus` ✔
- the composable exists only as `dist/useTabRovingFocus-Dh4yBGxq.js` (hashed private chunk) + `dist/components/tabs/composables/useTabRovingFocus.d.ts` (unpublished path) ✔

The finding: it re-shapes **four** adjudicated cure-shapes — `CC-C-6`'s successor formula, `KPT-SUP-4`'s migration target, `G-W6-2`'s gate, and the relay — without a registry round-trip. `kf-ChannelControls.md:50` still banks the cure as *"`SegmentedTabs semantics="tabs" variant="pill"` + `useTabRovingFocus`"*, and the arbiter's own rider asserts *"that condition is MET by installed 7.0.0 (`semantics="tabs"` + `variant="pill"` + `useTabRovingFocus`)"* — a banked cell this spec now knows to be **half false**. The registry says the condition is met; the dist says one of the three terms is unreachable. That correction belongs at the bank, not only in the consuming spec.

### Otherwise: transcription-only NOT found (M-25 satisfied)

Cure-shape locks, sequencing riders and dissents are **carried**, not merely cited. Sampled and confirmed verbatim-bearing: `CC-§0` LOCK (a)/(b) (L93) · `CC-D-10`'s KILL LOCK (L101) · `KPT-SUP-4`'s five-item migration carry (i)–(v) (L115) · `KF-SKEL-6`'s CURE INVERSION + `KF-SKEL-4` CONSTRAINT with the intended-vs-shipped radius pin (L244) · `KF-AT-6`'s FIVE-CONSTRAINT SET (L242) · `KSM R-1`'s LIFO/FIFO asymmetry (L317) · `KF-HA-2`'s producer/consumer split (L285) · `KF-APP-48`'s ARITHMETIC LOCK (L289). §Killed (L410, 30+ locks) and §Dissents (L412, 8 preserved) are both present and populated.

---

## §5 · GATES (L-19)

14 gates, all stamped RED, none run. **Witness quality is high and mostly re-executable — this seat re-ran three of them.**

| gate | witness class | this seat's re-execution |
|---|---|---|
| G-W6-1 | executed grep | ✔ `git grep -- '--dock-margin:' origin/master -- demo/` → **0 defs**; `var(--dock-margin` → **10** sites. Matches "9 live + 1 prose" exactly. |
| G-W6-2 | executed grep + dist read | ✔ `git grep -l KfPillTabs origin/master -- demo/ test/` → **11 files**. `git show origin/master:demo/app/App.vue \| sed -n 176p` → `provide(TABS_EXTERNALLY_MANAGED_KEY, true);` — the anchor correction holds. W6-AUTH-1's dist half verified (§4). |
| G-W6-3 | file-presence + line counts | ✔ named files, named line counts, re-resolvable |
| G-W6-4, -5, -6, -7, -9, -10, -11, -12 | "RED, banked-executed" | acceptable under L-19's *"carried verbatim from a bank that executed it"*; each names concrete measured artefacts (8 sites/6 files; 0 rules in the 571 KB artifact; zero mounts per subpath; byte offsets 2531–18827) |
| G-W6-13 | "RED, banked" — census §6.3, 98 unprefixed / 0 `--kf-*` | names a document location, no command |
| **G-W6-8** | **"RED by construction"** | **DEFECT (see D-G1)** |
| **G-W6-14** | **"RED, no relay sent"** | **DEFECT (see D-G2)** |

### D-G1 · G-W6-8's witness is a derivation, not a witness — MINOR

> KF-W6 L343 — `| **G-W6-8** typography-cure collision guard | … | **RED by construction**: THP D-4's cure makes rows 19.6→28px, scroller ~9→3.4 rows (arithmetic re-derived at the bank); MM-29's tracking survival confirmed at SP-7/MM-31 | …`

L-19 as the spec itself states it (L6): *"no gate without a **named live witness**; gates/proof-scripts presumed contrivance otherwise."* "RED by construction" names no command and no fixture path. Every sibling gate names either an executed grep or a banked execution against measured artefacts. The gate's *assertion* ("no `text-mono-small` swap without its box resize in the SAME COMMIT") is also commit-shaped, so its only real witness is a diff-review discipline — which is exactly the shape L-19 presumes contrived unless a named instrument exists.

### D-G2 · G-W6-14 has no artifact path — MINOR

> KF-W6 L349 — `| **G-W6-14** producer relay dispatch | every GLASS-OWNED row dispatched to the BH relay in ONE communiqué… | **RED, no relay sent**: MM-4, KF-KC-10, KF-SKEL-4 … |`

The gate's deliverable is a communiqué whose **path is named nowhere in the spec** — not in §Gates, not in §Sequencing item 7, not in the `→ glass-ui BH relay` cross-edge (L381). L-19 admits a witness *"explicitly to-be-created with its path"*; this one has no path, so "the relay was sent" is unfalsifiable at gate time. §Sequencing item 7 makes the dispatch a hard blocker on every interim mitigation, which raises the cost of the ambiguity.

### L-19 posture — CLEAN elsewhere

No proof-script is minted. The spec states the house law three times (L6, L332, L345) and turns it into an anti-contrivance bound: G-W6-4 *"fails if `proof-phantom-classes.mjs` is re-minted as a grep gate"* (L339). Every gate carries an anti-contrivance bound column, and several bounds are genuinely adversarial (G-W6-1 *"fails if 'fixed' by per-site fallback — the masking KF-APP-6 convicts"*; G-W6-2 *"fails on a private-dist deep import"*; G-W6-9 *"fails if the S-6 cure delegates to the bare Skeleton"*).

---

## §6 · E-3 + STATUS — CLEAN

| axis | result |
|---|---|
| VERIFIED stamps | **zero**. 5 hits of the string, all lowercase past-tense witness language on read-only instruments (`verified twice at the installed dist` L8/L92, `verified sound` L252, `re-verified in the INSTALLED dist` L326) plus one gate *assertion* (`gate GREEN against the seam` L337, whose witness column reads RED). No row and no gate is stamped VERIFIED. |
| status planned everywhere | ✔ L3 `**status: `planned`**`; L4 *"every status field stays `planned`"*; L332 *"Status at authoring: **ALL RED**"*; L416 *"Status: **planned**."* |
| execution verbs in current voice | ✔ none. Cure language is imperative-future (`Cure: DELETE the branch whole`), sequencing is conditional (`resolves BEFORE`, `must not split`). L416 states *"no gate has run; no product source was opened for writing. Execution awaits the owner's begin-word."* |
| opens no product source | ✔ the spec's own instruments are `git show origin/master:<f>` line counts and installed-dist reads (§Bounds preamble L16, read-only witness list L80). `scripts/dev/dev.sh` is explicitly ring-fenced *"unowned, either repo, **NEVER touch**"* (L80). |
| E-3 addenda-not-patch | ✔ observed at the two places it binds: `KF-SST-30` corrections are *"**annotated, not rewritten — E-3**"* (L152); `KF-KE-30` is *"Booked as a census §6.3 E-3 addendum (class space), **never a rewrite**"* (L161). |

---

## §7 · POSTURE AXES

| axis | verdict | receipt |
|---|---|---|
| **KF.W4 is the DECLARED SEQUENCING HEAD** | ✔ HOLDS | L374 `- **→ KF.W4 (the SEQUENCING HEAD)**:` with six enumerated bindings, incl. two ATOMIC BUNDLEs (KF-AT-4∥KF-AT-3; KF-AT-10) and the non-concurrency lock on `scripts/observe/demo/usability.mjs`. |
| **KF.W3 is GATED via PLAW-BIND (never scheduled)** | ✔ HOLDS | `grep -n 'KF\.W3\|PLAW' waves/KF-W6.md` → **0 hits**. The one W3-shaped token is the *superseded lane name* `W3-SHIM` in the taxonomy line (L10), never `KF.W3`. The spec schedules no KF.W3 work and claims no PLAW-BIND product. |
| **KF.W7 carries the KF-AV-28 supersession rider** | ✗ **NOT SQUARED** — see D-P1 | `grep -rn 'KF-AV-28' docs/tranches/X/keyframes/` → hits only in `KF-W7.md` (×7) and `KF-W8.md` (×1). **Zero in KF-W6.md.** |
| **KF-W6 squares with its CARRY** | ✔ on records/rows; ✗ on two internal seams | 54 contributing records confirmed by this census; 201 rows confirmed by `grep -c '^- \*\*'`. Seams: D-INV-1 (`KF-SP-3` propagated without the CARRY's disclosure) and D-B1 below. |

### D-P1 · the KF-AV-28 supersession rider is not declared at this end — MINOR

`KF-W7.md:7` makes it that wave's **defining lock**:

> *"**Standing supersession rider (KF-AV-28), the wave's defining lock**: this wave's S-9 evaluation may supersede any behavioral cure — a per-surface SWAP verdict discharges the bespoke rows banked under that surface."*

and `KF-W7.md:79-80` names **SequenceScrubber** and **AnimationVisualizer** as the intake surfaces. KF-W6 spends cures on all three exposed surfaces — `AnimationVisualizer.vue` (KF-AV-11 slider-var wiring, §Bounds L61), `PlaybackRibbon.vue` (the `--color-progress` half, L62), `SequenceScrubber.vue` (KF-SCR-2, L74) — and its five declared W7 bindings (L376) never mention KF-AV-28. The spec proves it knows this idiom: it guards the *identical* exposure one row over — *"**Sequencing: KF.W7 rules N-2's wire-or-delete BEFORE this MAJOR is spent on an inert control**"* (L193) — and again for KAD-6 (L259, *"STANDS ALONE HERE if declined"*). The asymmetry is the defect: three surfaces spend token/register cures with no supersession guard while a fourth gets one.

### D-B1 · §Bounds contradicts §Carry on `KeyframesEditor.vue` — MAJOR

> §Bounds L54 — `| demo/components/instrument/keyframes/KeyframesEditor.vue | — | modify-carve | KF-KE-21/-23/-30/-31/-36/-39/-40/-42/-45/-53/-59 **only**; six blockers are KFED-UNIT's |`
> §Carry L235 — `- **KAD-18 + KF-KE-24 + KF-KE-32** (MIN/MAJ) — the unlayered runtime hljs plate; layer/re-tokenize is EDITOR/KFED-UNIT's pipeline; **the TOKEN decision is this wave's rider.**`

`KF-KE-24` and `KF-KE-32` are both `KeyframesEditor.vue` rows and both registry-routed to this wave:

- `kf-KeyframesEditor.md:66` — `KF-KE-24 · D-9 … → **KFED-UNIT** … with a **KF.W6** rider.`
- `kf-KeyframesEditor.md:74` — `KF-KE-32 · D-18 — bg-background painted over the --card surface … → **KF.W6**.`

The word `only` in §Bounds forecloses two rows §Carry books. A seat executing §Bounds literally cannot land them; a seat executing §Carry breaches §Bounds. One of the two must move.

---

## §8 · VERDICT — **DEFECTIVE**

Not marginally. This is a **strong spec with a small number of load-bearing seams**, and the census is worth stating in both directions.

**What holds.** 377 of 390 routed census units booked (96.7%). The three gates I could re-execute reproduce **exactly** — 0 `--dock-margin` definitions, 10 `var()` sites, 11 KfPillTabs files, `App.vue:176` the unconditional provide. `W6-AUTH-1`, the spec's riskiest single claim, is **independently TRUE at the installed dist** on all five sub-claims. M-25 is satisfied on substance: cure-shape locks, sequencing riders, kill-locks and dissents are carried verbatim, not cited — this is not transcription. E-3 and the status posture are clean on every axis. The KF.W4-head and KF.W3-never-scheduled postures both hold. The 54-record figure squares with an independent enumeration.

**What fails.** Two MAJOR escapes with explicit registry markup (`kf-CubeTarget` `#21/#30/#39` from a bolded terminal routing manifest; `kf-ChannelControls` `D-7/L-4`'s prose limb, which the spec's own taxonomy line claims and then does not carry). One MAJOR id-invention (`KF-SP-3`) that breaks the id-keyed trail and violates the CARRY's own "ids keep their banked names for life". One MAJOR internal contradiction (§Bounds' `only` vs §Carry on `KeyframesEditor.vue`). Then three MINOR escapes, two MINOR gate-witness weaknesses, one MINOR unsquared posture axis (KF-AV-28), and five INFO alias drops.

**Pass-1 disposition**: 4 MAJOR · 6 MINOR · 3 INFO. Every one is a curable authoring seam — none impugns the wave's substrate, its taxonomy ruling, or its witness discipline.

*Written by the fresh adversarial spec-check seat, pass 1 of L-18/L-20. No product source opened for writing; no gate run; sole write = this file.*
