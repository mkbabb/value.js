# KF.W7 — FRESH ADVERSARIAL SPEC CHECK (L-18/L-20, PASS 2)

**Spec under trial**: `/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W7.md` (353 lines, 117 760 bytes, mtime 2026-08-28 12:39).
**Corpus authority**: the 58 `kf-*.md` records at `docs/tranches/V/megatranche/registry/adjudicated/` (`ls kf-*.md | wc -l` → 58). Sole in-tree X·KF carry: `docs/tranches/X/keyframes/carry/KF-W6-CARRY.md` (`grep -c "^- \*\*"` → **201**).
**Seat posture**: FRESH. The PASS-1 register and RULINGS were read for *rulings-applied* checking only; the census below is re-derived from the 58 records at the bytes. Where this seat's derivation differs from PASS-1's, this file's number governs.
**Method**: `grep -n "W7"` over all 58 records → **222** hits; reduced to items carrying a terminal routing or a wave-ordering obligation → **150**; each read at the bytes and then grepped against `KF-W7.md`. Gate witnesses re-executed against `/Users/mkbabb/Programming/keyframes.js` at `origin/master` `81a56990`. Zero writes outside this file.

**Verdict: DEFECTIVE.** Census **150 routed · 149 accounted (143 carried + 6 excluded-with-named-owner) · 1 ESCAPED**. Nine defects, two MAJOR. The three PASS-1 escapes (KAD-15/16/20) are CURED; a different escape — of higher rung — survives, and a phantom script survives untouched.

---

## §1 · ID-KEYED CENSUS

Legend: **B** = carried (row, named fold-identity, or named rider) · **X** = exclusion-with-named-owner in §Excluded · **E** = ESCAPED (absent by bytes).

### A · kf-KeyframeTimeline.md — 41 routed, 41 B

Rows `:42–:102` each terminating `**→ KF.W7**`, plus the `:114` cross-ref. All present in `KF-W7.md`:

C-1 (P1) · C-6 (P1) · L-3 (P1) · L-5 (P1) · D-4/L-4/C-5 (P7, locks G10) · L-6/C-4 (P8, feeds G6) · C-7 (P8, locks G14) · D-3 (P6 "D-3 (percent readout a11y)") · D-10 (P7 "D-10 (KeyframeTimeline)") · D-11 (P3) · D-12 (P5 "D-12 (dead marker motion)") · D-15 (P8 "D-15 (empty/failure states)") · D-17 (P4) · M1 (P4) · M2 ≡ RR-B-7 (P1) · M3 (P5, locks G8) · M5 ≡ RR-B-3 (P3, locks G13) · M7 (P7) · N-2 (P8) · L-8/C-9 (P9) · L-11 (P8 "L-11 (KeyframeTimeline)") · L-12/C-8 (P9) · L-13 (P9) · L-14/C-16 (P9) · L-16/L-17 (P9) · C-15 (P0, locks G1) · N-6 (P6, locks G5) · N-8 (P8) · N-9 (P8) · M9 (P7) · D-13 (P9) · D-16 (P9) · D-22 (P9) · L-18/C-11 (P9) · L-20 / L-21 (P9) · C-13 (P9) · C-17 (P9) · D-25/D-26/D-28 (P9) · N-10 (P1 law head + LP-1 rider) · N-12 (P9 PROHIBITION) · kf-ChannelControls L-2/C-2 cross-ref `:114` (OP-1 + §Sequencing 1).

*`:106`'s fold row `D-2/L-2/C-2 ≡ kf-CSSPasteDialog R-3` counted once at §E (R-3), per the identity guard.*

### B · kf-TimelineTrack.md — 31 routed, 31 B

D-1 (P1) · M-3/C-4 (P1) · RR-B missed-1 (P2, G3) · RR-B missed-2 (P2, G4) · D-8 (P5) · D-10 (P5 "expanded mode") · D-4 (P4 "tick pitch") · M-7 (P3 joint) · RR-B missed-4 (P3 joint) · RR-B missed-3 (P1) · D-12/C-12/i-2 (P4) · D-13 net arm (P7, folded into D-3/L-D6/C-6) · D-14/i-1 (P4) · C-10/C-11/D-m6/m-1/D-m5 (P9) · m-9/m-11/m-12 (P1) · L-m-10 (P3) · L-m-14 (P2) · m-7/m-8 (P7) · RR-A missed-1 (P5, G9) · RR-A missed-2 (P5) · RR-A missed-3 (P5) · RR-A missed-4 (P7, as MISSED-1's description arm) · D-m2 (P4) · m-3 (P9) · L-m-4 (P9) · L-m-5 (P9, K-6 kill carried) · RR-B missed-5 (P4 + P9) · m-6 (P4 + P9) · i-3 (P9) · ARB-1 (P2) · `:86` C-2 fold ≡ banked C-1 (P1). **All B.**

### C · kf-TimelineCaret.md — 18 routed, 18 B

L-2/C-3/D·M-4 (P6, G7) · MISS-β1 (P6, G5) · m-5/L-6/C-5 (P6) · L-7 (P6) · L-9/m-8 (P6) · m-1/L-10 (P6) · L-11 (P3 "TimelineCaret wheel") · m-4 + MISS-α1 (P6) · MISS-α2 (P6) · MISS-α4 (P6) · C-10 (P6 PROHIBITION) · C-9 (P4) · L-15 (P6 → G14) · MISS-β4 (P4) · folds `:74` B-1/L-3/C-2 ≡ M2 · `:75` B-2/L-12/C-11 ≡ D-3 · `:77` D·M-1/C-8 ≡ M1 · `:78` D·M-2 ≡ D-17+D-28. **All B.**

### D · kf-TimelineHoverPreview.md — 24 routed, 24 B

MISSED-1 (P7, G9) · D-7 (P7) · D-2/L-D9 (P7) · D-3/L-D6/C-6 (P7) · C-5 (P7 "C-5 (THP)") · L-D4/C-4(b) (P7) · L-D8/C-4(a) (P7) · D-12 (THP) (P7) · D-15 (THP) (P7 + BH relay) · C-9 (THP) (P7, G11) · MISSED-4 (P7) · GHOST-PLATE (P7) · L-D14 · L-D15 · MISSED-6 · P2-DEAD (P7 hygiene group) · folds `:77` D-1/C-1 ≡ M7 · `:80` D-8/L-D1/C-3 ≡ D-4/L-4/C-5 · `:81` L-D5 ≡ L-5 · `:82` D-9/C-2 ≡ D-10 · `:84` C-7 ≡ C-15 (carried at P0's fold list, "THP C-7 fold, export status corrected") · `:86` L-D12/C-10 ≡ N-2 + N-9 · `:88` D-13 live-region arm ≡ D-22.

**+ MISSED-3** (`:61`, terminal `**→ KF.W6/W7 spec input**`) — **B**, carried whole at P7's head (`:175`) as the two-wave box-resize law. **Counted here** (see D9: the spec's own denominator drops it while counting the identically-shaped KAD `→ KF.W6/W7` rows).

### E · kf-CSSPasteDialog.md — 8 routed, 8 B

R-3 (`:41`) · R-4 (`:42`) · R-7 (`:45`, locks G15) · R-17 (`:59`) · R-19 (`:61`) · R-21 (`:63`) · R-22 (`:64`) · R-23 (`:65`) — all at P8. **All B.**

### F · kf-KeyframesAddDialog.md — 9 routed, 6 B + 3 X — **PASS-1's THREE ESCAPES ARE CURED**

| id | record line | terminal tail | PASS-2 state |
|---|---|---|---|
| KAD-6 | :50 | `→ KF.W6/W7` | B (P8) |
| KAD-9 | :53 | `→ KF.W7` | B (P8, under R-4) |
| KAD-10 | :54 | `→ KF.W7` | B (P8, under R-4) |
| KAD-13 | :57 | `→ KF.W7` | B (P8) |
| KAD-F3 | :63 | FOLD → R-7 | B (P8 "R-7 (the twin fold) ≡ KAD-F3") |
| **KAD-15** | :68 | `→ KF.W6/W7` | **X** — §Excluded `:333`, owner KF.W6 |
| **KAD-16** | :69 | `→ KF.W6/W7` | **X** — §Excluded `:333`, owner KF.W6 |
| **KAD-20** | :73 | `→ KF.W6/W7` | **X** — §Excluded `:333`, owner KF.W6 |
| KAD-21 | :74 | `→ KF.W7` | B (P8 MINOR group) |

**Cure receipt**: `grep -c "KAD-15\|KAD-16\|KAD-20" KF-W7.md` → **3 lines each** (§Excluded `:333`, G15's discharge discipline `:294`, repair footer `:352`). RULINGS **R-12**'s second directive is executed, with the mechanism reason stated per id and the R-7 fold-direction binding declared. G15's discharge discipline now names all three by id, so the "STATE which rows the W6 swap discharges" obligation is executable. **The PASS-1 D1 MAJOR is discharged.** (One residue: the W6-side line anchors have drifted — see D4.)

### G · kf-SequenceScrubber.md — 1 routed, 1 B

C·C-4 (`:58`) → P0 "C·C-4 (SequenceScrubber)" with the K-8 `{progress}`-prop kill and SUP-5 carried. **B.**
(`:128/:134` resolve to KF-AV-28, counted at §H. `L·D-12` is NO-WAVE-OWNER; cited at G11 as the second N-10-class coverage instance — carried, not counted.)

### H · kf-AnimationVisualizer.md — 5 routed, 5 B

KF-AV-10 · D-5 (`:51`) → P0 (bundles SpringTarget m-8) · KF-AV-13 (`:60`, NWO + "decide with the KF.W7 evaluation") → P0 rider, decision here / cure NWO (exact) · KF-AV-14 (`:54`, NWO cross-ref W7) → P0 rider · KF-AV-24 (`:68`, → KF.W8 cross-ref W7) → P0 rider, consolidation left at W8 (exact) · KF-AV-28 · D-18 = C-13 (`:72`) → header rider + P0, locks G1. **All B.**
*KF-AV-17 (`:61`) folds into KF-AV-1's NWO cure — not W7-routed; the spec nonetheless carries its **K-12** cure-shape lock (`:105`, `translateX(calc(var(--p) * (100cqw − 100%)))`) verbatim. Carried, not counted. The spec's attribution to K-12 is correct at the bytes.*

### I–P · single/two-row records — 12 routed, 9 B + 3 X

| record | id | line | state |
|---|---|---|---|
| kf-SpringTarget | C-4 | :64 | B (P0 + route dissent) |
| kf-SpringTarget | m-8 ≡ KF-AV-10 | :69/:135 | B (P0, bundled) |
| kf-SpringTrace | C-3 | :62/:139 | B (P0 + route dissent) |
| kf-SequencePlayhead | C-§4 ≡ C-15 | :143/:151 | B (P0 fold list) |
| kf-RibbonBar | RB-7 | :77/:131 | B (P5 + expanded settlement) |
| kf-CSSCodeEditor | KF-CE-2 parent half | :34 | B (P8, three hard locks; OP-1; G2) |
| kf-KeyframeCard | KF-KC-11 undo-trail arm | :53 | B (P8 undo-authority ruling) |
| kf-KeyframeCard | KF-KC-52 | :100 | B (P8, inside the ruling) |
| kf-PlaybackRibbon | the standing §7 counter-evidence caution | :36 | B (header, verbatim; `PR-CAUTION`) |
| kf-DemoGlobalChrome | M-4 → **KF.W7-TOKENS** | :62 | **X** (`:334`, naming-schism) |
| kf-ControlsPaneWrapper | D-m3 → **KF.W7-TOKENS** | :72 | **X** (`:334`, naming-schism) |
| kf-AnimationControlsGroup | D-12 → **KF.W7-TOKENS** | :83 | **X** (`:334`, naming-schism) |

### Q · kf-AnimationControlsGroup.md — 1 further routed, **1 ESCAPED**

| id | record line | terminal disposition (verbatim) | spec | state |
|---|---|---|---|---|
| **D-1** | **:42** | **"Terminal disposition: **NO-WAVE-OWNER**, must be settled **before** KF.W6-TIMELINE (any timeline-cluster swap inherits the portal architecture)."** | **absent** | **E** |

See **D1** below. This is the wave's only escape and it is an ADJUDICATED **BLOCKER**.

### Records with ZERO W7-routed rows (verified, not assumed)

`kf-SequenceAxis` (`:130` — *"KF.W6/W7: no axis-owned rows"*) · `kf-SequenceScene` (`:153` — the W7 slot is empty) · `kf-AmigaScene` (J.W7a/J.W7c = tranche-J taxonomy) · `kf-CopyButton`/`kf-EasingTarget`/`kf-EasingSidebar`/`kf-EasingScene`/`kf-KeyframesEditor`/`kf-TimingFunctionPanel` (sole hit = the boilerplate routing-law taxonomy line) · and the 31 records with zero `W7` hits (`grep -c W7` → 0), which include `kf-ChannelControls` — whose two W7-relevant rows (L-2/C-2, C-8/D-6) reach this wave **only** through the KF.W6-TIMELINE reconciliation, and both are booked. That is the same mechanism that should have caught D-1.

**CENSUS TOTAL: 150 routed · 143 carried (B) · 6 excluded-with-named-owner (X) · 1 ESCAPED (E).**

---

## §2 · NO INVENTION / M-25 DEPTH

**No fabricated rows.** Every §Carry row header traces to a banked id; every cross-corpus id resolves in the registry — verified by `grep -rl` over `registry/adjudicated/` for: KF-CE-41 · KF-CE-16 · KF-CE-12 · LP-1 · SUP-5 · MM-29 · ME-42 · KF-SKEL-16 · KF-SCR-1 · KF-SCR-2 · KF-AV-15 · KF-AV-32 · TD-1/-2/-21/-38/-40/-41 · C-S+1 · REGISTER-LAUNDER · TEP-12 · MCP-31 · MISS-β2 · MISS-β3 · L-19/C-14 · KF-CO-1 · KF-CO-8 · D-23 · GradientStopEditor (C11/G5) · MbabbMenu MUST-CARRY · EDITOR-UNIT · CARD-UNIT · KF-KC-52 — **all hit ≥1 file**.

**The two minted labels are now lawful.** `PR-CAUTION` and `L-15-PROTECTED` still return **0 files** from `grep -rl` over the registry, but `:91` now discloses them as **SPEC-LOCAL LABELS**, binds each to its banked coordinate, and forbids their use as routing ids while instructing downstream sweeps to sweep the coordinates. Both bindings verified at the bytes:
- `kf-PlaybackRibbon.md:36` — *"this ribbon is the NON-bespoke case (it consumes the real `Slider`) and carries BLOCKERs anyway, so 'swap onto the primitive' is never sufficient as a cure"* — carried verbatim in the header.
- `kf-KeyframeTimeline.md:125` — *"**K-8 · L-15 … A kill that protects live code**"*, about the `:248-249` guard — carried at P8's KF-CE-2 hard lock 3. **PASS-1 D6 is discharged.**

**Cure-shape locks, kill locks, dissents carried (spot-verified at the bytes)**: KF-AV-17's K-12 form (`kf-AnimationVisualizer.md:105`) · RR-B missed-1's `grabDx` per GradientStopEditor C11/G5 · L-2/C-3/D·M-4's compare-before-commit per `kf-MatrixEditor ME-42` · KF-AV-10's `kf-EasingTarget P-2` caution ("drops 28 balls out of their rails") · C·C-4's K-8 `{progress}` kill + SUP-5 · M2's MISS-β3 "the fix REPLACES the inert guards" · D-10 (TT) "expanded mode earns lanes/curves or dies" · L-16/L-17's `feedback_kiss_no_contrivance` in-file-`v-for` lock · N-12's PROHIBITION · the two route dissents (SpringTrace C-3, SpringTarget C-4) preserving the records' own KF.W7 routing rather than silently re-homing · RR-A's BLOCKER on C-1 · RR-B's inverted M-3/C-4 rung · reader-1's MAJOR on KF-AV-13 · reader-A's INFO on C·C-4.

**Registry untouched (E-3)**: `git status --porcelain docs/tranches/V/megatranche/registry/adjudicated/` → **empty**.

---

## §3 · GATES — BORN-RED, WITNESSES RE-EXECUTED

Fifteen gates (`grep -o "^\*\*G[0-9]*"` → G1…G15), every one stamped **RED**, zero GREEN (`grep -c GREEN` → **0**), zero `proof:*` inventions. Witnesses re-run against `origin/master`:

| gate | witness | result |
|---|---|---|
| G12 | `git rev-parse master origin/master` · `merge-base` | `8281638c` / `81a56990` / `a59d3a22` — **exact**; `git cat-file -e 8281638c:demo/utils/keyframeSelector.ts` → fails; `timelineTypes.ts` has no `selector` at HEAD — **exact** |
| G1 | `wc -l …/glass-ui/dist/components/timeline/index.d.ts` | **2**; content = `GlassTimeline` + `TimelineSegment/…Gradient/…State` only |
| G1 | `ls …/timeline/` | **nine** files; **seven** shipped-but-not-re-exported (ContinuousMarkers · ContinuousRail · **ContinuousTimeline** · ScrubberTimeline · SegmentedTimeline · geometry · **types**) — the repair's D7 completion is **exact** |
| G1 | `SliderVariant` | `"standard" \| "spectrum"` — exact; demo imports of glass `/timeline` = **0** |
| G2 | `git show origin/master:KeyframeTimeline.vue \| grep -n scrub` | **78 · 83 · 197 · 202 · 224**, bare `scrub` among none; `useTimeline.ts:117` returns it — **exact** |
| G2/G13 | `grep -n "isPrimary\|pointerType"` in TimelineTrack.vue | **0**; `@wheel.prevent` at `:31`; `touch-none` at `:24`; `useZoomPan.ts` delta reads at **`:50`/`:59`** only, `deltaX` nowhere — the corrected `:59` anchor holds |
| G3 | TT `:174-178` / `:192-196` | absolute-percent emit; `onMarkerPointerDown` records no offset, captures on `event.target` — **exact** |
| G5 | `timelineEngine.ts:40-48` | the `:42` merge comment verbatim ("multiple keyframes at same percent get merged") — **exact** |
| G7 | caret `:22` `@blur="commitEdit"`; `:58-65` | no compare against incoming; `useTimelineOps.ts:60` fresh `percentSelector(...)` per call — **exact** |
| G8 | TT `:203-214` | `if (next === null) return` discards Enter/Space; `select` emitted only with `moveKeyframe`; `useTimelineOps.ts:28` `percent ?? scrubT.value * 100` — **exact** |
| G9 | reka `TooltipContentImpl.js:87` | `computed(() => props.ariaLabel \|\| currentElement.value?.textContent)` — **exact**; TT`:86` `<TooltipContent side="top" :side-offset="8" class="p-2 max-w-56">`, no `ariaLabel` — **exact** (and P2-DEAD's dead `p-2` confirmed at the same byte) |
| G14 | `useTimelineBuild.ts:47-50` vs toasts | sole non-toasting `console.error` + `animation.value = null`; toasts at **:121/:133/:137/:148/:155/:157** — **exact, all six** |
| G15 (w3) | `initialText` | four in-file hits `:49/:53/:59/:67`; both `<CSSPasteDialog>` mounts at `KeyframeTimeline.vue:135-152` pass only `open/title/description/button-label/button-icon/@submit` — **`:initial-text` at neither**. The re-founded MOUNT reading is **exact**; **PASS-1 D3 discharged** |
| G15 (w4) | `git grep "\.label" -- …/timeline/` | **one** hit (`KeyframeTimeline.vue:106`); `timelineTypes.ts:11 label?: string` needs the second command — the two-command re-founding is **exact**; **PASS-1 D4 discharged** |
| OP-2 | `git show origin/master:package.json` | `"check": "tsc --noEmit && tsc --noEmit -p tsconfig.test.json && npm run proof:structure"` — the contributed citation correction is **exact**; `demo/env.d.ts:3-7` `*.vue` → `DefineComponent<{},{},any>` — exact |
| OP-4 | `ls node_modules/@vue/` | compiler-*/reactivity/runtime-*/server-renderer/shared — **`@vue/test-utils` absent**, `grep -c test-utils origin/master:package.json` → **0**, `jsdom ^29.1.1` present at `:90`, `vitest.config.ts` has **no `plugins` key** — the cost claim and the two carve-rows are **exact** |
| G11 | *(see D5, D6)* | the *claim* holds (`grep … test/` → 0 mounts; the nine existing tests never name the surfaces) but the **named command** and the **bounds glob** are defective |
| — | `build:gh-pages` | **PHANTOM — see D2** |

**§Bounds line counts — all 18 re-measured, all exact** (`git show origin/master:<f> | wc -l`): 312 · 246 · 70 · 38 · 129 · 200 · 88 · 110 · 41 · 8 · **102** · 66 · 33 · 80 · 161 · 162 · 256 · 31. Both header corrections hold: KeyframeTimeline is **312** (the bank's "313 L" at `kf-KeyframeTimeline.md:9`), and `timelineEngine.ts` is **102** at origin/master. `demo/utils/keyframeSelector.ts` exists at origin/master (31 L) and `timelineTypes.ts` carries `selector` there — the G12 substrate claim is real.

**Other cited paths verified to exist**: `demo/styles/design-idioms.css` (`:161-187` is the `.progress-rail`/`.progress-ball` promotion block) · `demo/styles/font-roles.json` · `demo/DESIGN.md` · `demo/utils/helpers.ts` · `node_modules/@mkbabb/glass-ui/dist/components/tooltip/**` · `docs/precepts/` · `docs/tranches/X/keyframes/carry/KF-W6-CARRY.md` (201 rows).

---

## §4 · E-3 + STATUS

- `grep -n VERIFIED KF-W7.md` → **exactly one** hit: the verb table's `| VERIFIED | NO | stamped only at sub-tranche close |`. `grep -c GREEN` → **0**. `IMPLEMENTED | NO`.
- Status `planned` at `:5` and re-declared at `:350` and `:352`. `:5` states explicitly that authoring opened no product source for writing.
- Every product act is future/conditional; every past-tense act is documentary and read-only (`git show`, `ls`, `wc -l`, `grep`) — re-executable, and re-executed above.
- **E-3 holds**: registry `git status` clean; the repair footer (`:352`) declares sole write = the spec file, status unstamped, banked ids preserved.

---

## §5 · POSTURE

- **KF.W4 head honoured.** OP-2 names KF-CE-16 *"the sequencing head of the whole record"*; the cross-edge (`:314`) is **depends-on for VERIFICATION, not authoring**; every typed cure (L-12/C-8 · L-7 (caret) · L-m-10 · the TT contract-hygiene group · L-13 / L-14/C-16) declares its verification block on OP-2. The wave pays W4 back (the census-gate design brief, C-S+1 + REGISTER-LAUNDER). **RULINGS R-3 directs "KF-W7: no change" and none was made** — L-7 remains booked at P6, correct per `kf-TimelineCaret.md:51`.
- **KF.W3 gated, never scheduled.** The only W3 traffic is an OUT (`:316`: C-7's §F-2 scope correction + the fuzz-entry note); the IN dependency (OP-5, the parse façade) is on **KF.W2**, which is right. Nothing schedules or blocks on W3.
- **KF-AV-28 rider present wherever governed rows are cured.** Carried as the *defining lock* in the header (verbatim from `kf-PlaybackRibbon.md:36`'s companion at `kf-AnimationVisualizer.md:35`), re-stated at P0, mechanised in §Verdict ("per-surface SWAP ⇒ the bespoke rows DISCHARGE with the component, **each discharge named**"), and enumerated in G1's carries. `grep -c KF-AV-28` → **7 lines**, matching RULINGS R-10's "×7, unchanged". Its counter-evidence (`PR-CAUTION`) is given in the same breath. **R-10 directs "KF-W7: no change"; none was made.**
- **RULINGS R-12 applied, and over-applied correctly.** All four ruled CARRY bindings struck — plus a **fifth** the repair seat found at the closing footer — and provenance restated over the 58-record registry (`:13`, `:38`, `:331`, `:348`, `:350`). The falsifiability claim now names a greppable source. §Excluded's opener is the true sentence ("No registry-routed row is unaccounted") rather than the false one.
- **PASS-1 defects D1–D7: all seven cured** (D1 by the three §Excluded bookings; D2/D3/D4 by re-founded provenance and re-founded G15 witnesses; D5 by the one runnability reading at `:234` — G12 pins for all · G11 gates the ten behavioural gates G2–G10 + G13 · G1/G14/G15 documentary, with §Sequencing 2 re-scoped to COMMITS; D6 by the spec-local-label disclosure; D7 by the seven-item enumeration).

---

## §6 · DEFECT REGISTER

### D1 — MAJOR · an ADJUDICATED BLOCKER routed at this wave escapes the census by bytes

`kf-AnimationControlsGroup.md:41-42` books **D-1** — *"ADJUDICATED BLOCKER (restored) · one document-singleton portal sink, N Teleport sources — expanding the timeline stacks every painting channel's KeyframeTimeline into one clipped box"* — with terminal disposition: *"**NO-WAVE-OWNER**, must be settled **before** KF.W6-TIMELINE (any timeline-cluster swap inherits the portal architecture)."*

The spec's **own** taxonomy reconciliation (`KF-W7.md:325`) rules: *"Conversely, 'KF.W6-TIMELINE' references … **ARE this wave** and are carried above as hard-ordering locks."* It then applies that rule to `kf-ChannelControls` (booked at OP-1 and §Sequencing 1) — and names `kf-AnimationControlsGroup` in the very same sentence, but only for its `:17` taxonomy line, never for `:42`.

**Receipts**:
- `grep -rn "before KF.W6-TIMELINE\|before \*\*KF.W6-TIMELINE\*\*" registry/adjudicated/*.md` → **exactly two** rows: `kf-ChannelControls.md:40` (booked at OP-1) and `kf-AnimationControlsGroup.md:42` (**absent**).
- `grep -n "AnimationControlsGroup D-1" KF-W7.md` → **one** hit, `:334`, and it is **D-12** (the naming-schism exclusion). D-1 appears nowhere.
- `§0` has no OP row for it; §Sequencing's **"Hard ordering (blocking, in order)"** list opens with OP-1 and never mentions the portal sink.

**Why it is not clerical**: (a) it is the record's *restored BLOCKER*, one rung above OP-1's peers in the §0 table; (b) the spec routes **C-6's cure through that exact component** — *"own detached/cloned preview target, OR drive the scene's single engine through **AnimationControlsGroup**"* (`:108`, restated in G2's assertion at `:242`) — i.e. the wave's headline seam cure is designed through an architecture an unbooked BLOCKER says must settle first; (c) D-1's own scope enumeration (cube 3 · amiga 3 · spring 2, one shared `superKey` bucket flipping all instances) is the same "expanded timeline" surface the spec settles at D-10 (TT) + RB-7 without it.

### D2 — MAJOR · the wave's witness-refresh obligation names a script that exists at no coordinate

`KF-W7.md:323` (§Sequencing → KF.W9/SS-13): *"**Witness-refresh obligation: re-run `build:gh-pages` before trusting any byte-offset receipt** (the Jul-16 CSS witness may predate glass-7)."*

**Receipt**: `git show origin/master:package.json` → the scripts block contains `"gh-pages": "vite build --mode gh-pages"` and **no** `build:gh-pages`; `git grep -n "build:gh-pages" origin/master` → **0 hits**. A seat executing the obligation gets `npm ERR! Missing script: "build:gh-pages"`.

This is the phantom RULINGS **R-11** already convicted — *"the real script is `package.json:43` → `"gh-pages": …`; the real invocation is **`npm run gh-pages`**"* — but R-11 enumerated ten correction sites (KF-W0 ×7, KF-W9 ×3) and **did not enumerate KF-W7's**, so repair round 1 left it standing. It is load-bearing here: it is the precondition the spec attaches to *every* byte-offset receipt in the wave, and the four records whose byte-offset trust hangs on the refresh (per R-11) include three of this wave's four core records (kf-KeyframeTimeline · kf-TimelineCaret · kf-TimelineTrack) plus kf-CSSPasteDialog.

### D3 — MINOR · the census arithmetic does not close against the spec's own §Excluded

Asserted at three sites — `:13`, `:331`, `:352` — as *"148 routed · 148 accounted (**145 carried + 3 excluded-with-named-owner**)"*.

**Receipt**: §Excluded books **six** exclusions-with-named-owner, not three: KAD-15 · KAD-16 · KAD-20 → KF.W6 (`:333`) **and** kf-DemoGlobalChrome M-4 · kf-AnimationControlsGroup D-12 · kf-ControlsPaneWrapper D-m3 → the KF.W6 token-namespace audit (`:334`). The true split of the spec's own denominator is **142 carried + 6 excluded**. The total is unaffected; the composition is false against the file two lines below it, and the three-vs-six confusion is the same shape as the failure R-12 was written to end.

### D4 — MINOR · §Excluded's "re-verified at the bytes" W6 anchors no longer resolve

`:333` claims: *"re-verified at the bytes: KAD-15 at `KF-W6.md:250` (S-10 · KF-KE-21 +KAD-15) … KAD-16 and KAD-20 at `KF-W6.md:320`."*

**Receipt**: `sed -n '250p;320p' KF-W6.md` → `**KAD-18 + KF-KE-24 + KF-KE-32**` and `**ChromeDock D-22 + RR-1 MISSED #1**`. The true coordinates are **`:265`** (`- **S-10 · KF-KE-21 (+KAD-15)**`) and **`:335`** (`- **KAD-3 + KAD-7 + KAD-19 + KAD-20 + KAD-25 + KAD-16 + …**`). The CARRY halves DO resolve (`KF-W6-CARRY.md:178` carries KAD-15; `:248` carries KAD-16 and KAD-20).

The **claim holds** — all three are booked at W6 — and the drift is a sibling-repair artifact (mtimes: `KF-W7.md` 12:39, `KF-W6.md` 13:12, +15 lines). But a receipt that returns a different row is not a receipt, and this is the exact class L-20 exists to catch.

### D5 — MINOR · G11's named witness command returns the opposite of its stated reading

`:277`: `grep -rn "TimelineHoverPreview\|previewCache\|SequenceScrubber" test/ demo/` → **"no mount"**.

**Receipt**: the command as written returns **13 hits**, all render sites — `TimelineTrack.vue:87/:89/:117/:125`, `KeyframeTimeline.vue:81/:217/:221/:226`, `SequenceTarget.vue:125/:127/:146/:205`, `useSequenceInstrument.ts:5`. The `test/` leg alone returns **0**, and that leg is what carries the claim; the `demo/` leg can only ever return hits. Identical in kind to PASS-1's D3/D4 (a born-RED gate whose named command does not return what its stated reading says) — the repair re-founded G15's two and left G11's.

### D6 — MINOR · §Bounds grants an unenumerated shared-prefix glob over a populated, sibling-claimed test directory

`:62`: `| test/demo/instrument/** | — | create | G11's mount tests |`.

**Receipts**: (a) `git ls-tree -r --name-only origin/master -- test/demo/instrument` → **nine** tracked files already there, including **`timeline-undo.test.ts`**, which this same spec cites as a G11 witness (`:277`) — a `**` create-glob reads as authority over a file the wave uses as a witness; (b) `KF-W5.md:138`, as re-cut by RULINGS **R-9b item 4**, declares the same directory as its `.a` seat's created fixture path under the law *"Paths are **enumerated, never globbed by shared prefix** (the X.P.W3 §4a lesson)"* and narrows its own former `test/**` for exactly this reason; (c) KF-W7 names **no** fixture file (contrast `KF-W5.md:229`'s pathed `test/demo/instrument/highlight-css-roundtrip.test.ts`), and its §Disjointness paragraph (`:64`) splits only SFCs and composables — the test path appears in neither the seat split nor the "not touched by any seat" list, and §Sequencing's KF.W5 cross-edge (`:317`) is silent on the collision.

### D7 — MINOR · §Sequencing 1 presents a paraphrase as "the bank's own words"

`:301`: *"the bank's own words: **"the `:key` data-loss row MUST be settled BEFORE KF.W7"**"*.

**Receipt**: `grep -rn "MUST be settled" registry/adjudicated/` → `kf-ChannelControls.md:40` reads *"it MUST be settled before **KF.W6-TIMELINE**"*; `kf-KeyframeTimeline.md:114` reads *"must be settled **before/within** KF.W7"*. Neither is the quoted string, and the quotation silently hardens "before/within" into "BEFORE". (OP-1's *other* quotation — *"any timeline-cluster swap that inherits the `:key` inherits the data loss"* — **is** verbatim at CC`:40`; the header's PR-CAUTION quotation is likewise verbatim at PR`:36`. So the file can quote correctly; this one site does not.) The direction of the error is conservative, so the ordering is not weakened — but under M-25 a quoted lock is either verbatim or it is a paraphrase, said so.

### D8 — INFO · "the only in-tree carry" is true only inside X·KF

`:13`. **Receipt**: `find docs/tranches/X -iname "*CARRY*"` → `fourier/carry/F-W1-CARRY.md` · `fourier/carry/F-W4-CARRY.md` · `keyframes/carry/KF-W6-CARRY.md`. RULINGS R-12 scopes the claim to X·KF; the spec drops the scope word. (The row count it cites, 201, is exact: `grep -c "^- \*\*" KF-W6-CARRY.md` → 201.)

### D9 — INFO · the routed denominator drops one dual-homed row while counting its twins

`kf-TimelineHoverPreview.md:61` terminates **MISSED-3** as `**→ KF.W6/W7 spec input**` — the same dual-routing shape as KAD-15/16/20's `**→ KF.W6/W7**`, which the spec counts and books as exclusions. MISSED-3 is *carried whole* (P7 head, `:175`, with the MM-29 pairing and the same-commit box law) yet excluded from the denominator. By the spec's own counting rule the registry's routed count is **149**, not 148. Accounting-only; nothing escapes.

---

## §7 · WHAT HOLDS (no defect)

The evaluate posture (KF-AV-28 as the defining lock, with PR-CAUTION weighed in the same breath, and SWAP-discharge required to be *named*); the N-10 one-design-problem law over {C-1, C-6, L-3, L-5, M-3/C-4} with the LP-1 no-write→render-edge rider; the D-19 padding-box re-derive lock binding both stale tables; the killed-claims register (17 locks, each traced to its own record's kill entry); the identity discipline over colliding ids (D-3/D-10/D-12/D-15/C-5/C-9/C-10/L-11/L-7/D-1/D-8 each parenthetically disambiguated by source file); the six-precondition §0 table (OP-2's and OP-4's measurements re-executed exact); the disjointness split by FILE with `timelineEngine.ts`/`timelineTypes.ts` serialised; the fifteen born-RED gates with named live witnesses and zero `proof:*` inventions.

---

*Written by the PASS-2 fresh adversarial check seat. Sole write = this file. No product source opened; no registry, carry, or spec byte modified.*
