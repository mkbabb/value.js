# PASS-4 · KF-W4 — FRESH ADVERSARIAL SPEC CHECK (L-18 / L-20)

**Subject**: `docs/tranches/X/keyframes/waves/KF-W4.md` (327 lines) at its round-3 bytes.
**Seat**: FRESH. No prior pass register, ruling, CARRY or partition was consulted as a source of measurement. `PASS-3/KF-W4-CHECK.md` and `PASS-3/RULINGS-3.md` were read **only** to learn what the spec claims was cured — never to inherit a denominator, a count or an anchor.
**Substrate law**: every witness in this register was re-executed read-only at keyframes.js **`origin/master 81a56990736ced5b5edde0b84c527680ac7689b1`** (`git rev-parse origin/master`, re-resolved this seat) in the sibling checkout `/Users/mkbabb/Programming/keyframes.js`. Local `8281638c` appears here only as declared historical context. Zero product writes; the sole write of this seat is this file.
**Census law (the retirement, executed)**: the inherited nine-block partition is **RETIRED**. §1 below is a per-record, id-keyed harvest from the bytes of all **58** `kf-*.md` records at `docs/tranches/V/megatranche/registry/adjudicated/`. It was built **before** any prior pass figure was read, and no prior figure was used to close it.
**Date**: 2026-08-28.

---

## §1 · AXIS 1 — ID-KEYED CENSUS, BY RECORD

### 1.1 The record-level sweep

`grep -cE 'KF\.W4|KF-W4|\bW4\b'` over all 58 records:

| class | n | records |
|---|--:|---|
| carry ≥1 W4 byte | **45** | (the 40 suppliers of §1.2 plus the 5 non-supplying carriers named below) |
| carry ZERO W4 bytes | **13** | kf-SquareInstrument · kf-SpringTarget · kf-SpringHeatmap · kf-SharePopover · kf-SequenceScrubber · kf-SequenceScene · kf-SequencePlayhead · kf-SequenceAxis · kf-KeyframesAddDialog · kf-KeyboardShortcutsModal · kf-CubeTarget · kf-CSSPasteDialog · kf-App.skeleton |

45 + 13 = **58**, the whole corpus. Of the 45 byte-carriers, **40 supply ≥1 W4-routed id** and **5 supply none** (kf-CubeAxisLines 3 bytes · kf-DemoGlobalChrome 1 · kf-EditorHeader 1 · kf-KeyframeCard 1 · **kf-PlaybackRibbon 2**). Three zero-byte records are nevertheless *carried* by the spec (kf-KeyboardShortcutsModal R-9 · kf-SequenceScene D25/L-5/C-7 · kf-SequenceScrubber ruling 12) and are counted as routed rows because the spec books them.

**The spec's own AUDITED cell states 47 consulted · 40 supplying · balance SEVEN, composed as four byte-carriers + three zero-byte carriers.** The 40 reproduces exactly at this seat and the four named byte-carriers' counts reproduce exactly (3/1/1/1). **The balance is five, not four**, because **kf-PlaybackRibbon** carries 2 W4 bytes, routes no W4 id, and is cited twice by path in the spec — and is absent from the AUDITED basis of 47 (D-3 below).

### 1.2 Per-record routed ids (the denominator)

Convention: one row per **banked id or explicitly-banked rider** that a record routes to `KF.W4` / `KF.W4-PROSE`, including witness-only and rider-only routings. Merged groups are counted at their member ids (the record's own count-integrity discipline).

| # | record | routed ids | n | booked in KF-W4.md |
|--:|---|---|--:|---|
| 1 | kf-AmigaScene | C-19/L-m1 | 1 | row 4 ✓ |
| 2 | kf-AnimationControlsGroup | C-4 | 1 | row 30 ✓ |
| 3 | kf-AnimatedText | KF-AT-4 · KF-AT-7(cascade) · KF-AT-10 · KF-AT-12 · KF-AT-24 | 5 | rows 15/18/16/1/17 ✓ |
| 4 | kf-App | KF-APP-4 | 1 | row 1 ✓ |
| 5 | kf-CSSCodeEditor | KF-CE-12(gate arm) · KF-CE-16 · KF-CE-30 | 3 | rows 21/1/22 ✓ |
| 6 | kf-AnimationVisualizer | KF-AV-8(gate arm) · KF-AV-9(W4 arm, folds to AV-18) · KF-AV-18 · KF-AV-28(rider) | 4 | rows 21/20/20 + §Sequencing ✓ |
| 7 | kf-ChannelControls | C-6 · D-7/L-4 · C-13 · C-15 · L-18 · L-19 · N-7 | 7 | row 29 + R-1 manifest 1–6 ✓ |
| 8 | kf-ChromeDock | C-2/B-2 · `:128` TS2322 · C-8 · m-8 · m-1/C-7 · **m-9** | 6 | rows 1 + G-KFW4-1 — **m-9 ESCAPED** |
| 9 | kf-ChannelOptions | KF-CO-7 · KF-CO-33 | 2 | rows 1/29 + §Excluded 21 ✓ |
| 10 | kf-CopyButton | KF-CB-8 · KF-CB-18 · KF-CB-24 · KF-CB-29 | 4 | rows 2/9/10/11 ✓ |
| 11 | kf-CubeScene | L-8/C-9 · L-18/C-12a · L-10/L-11 | 3 | rows 1/25/4 ✓ |
| 12 | kf-ControlsPaneWrapper | N-1/C-5 · M-5/C-9 (+riders C-10, C-11, the four `any` props) | 2 | rows 30/1 ✓ |
| 13 | kf-EasingSidebar | KF-ES-3 · KF-ES-34 | 2 | rows 8/2 ✓ (see D-5) |
| 14 | kf-EasingScene | KF-ES-14 · KF-ES-16 (+L-m10) | 2 | rows 8/1 + row 4 ✓ |
| 15 | kf-EasingTarget | KF-ET-6 · KF-ET-11 | 2 | rows 8/2 ✓ (see D-5) |
| 16 | kf-EditorStartScreen | L-EST-16 · L-EST-17 · KF-EST-1 · KF-EST-6 | 4 | rows 1/17/12/24 ✓ |
| 17 | kf-EditorShell | L-4/C-6 · L-6/C-18 · C-21 · D-19 | 4 | rows 1/3/3/14 ✓ |
| 18 | kf-HeroAurora | KF-HA-4 · KF-HA-5 | 2 | rows 13/1 ✓ |
| 19 | kf-KeyframeCardList | KC-13 · KC-17 · KC-37 | 3 | row 1 + G-KFW4-1 ✓ |
| 20 | kf-KeyframeTimeline | C-12(depcruise arm) · RR-B missed-1 · L-14(K3) | 3 | rows 21/1/4 ✓ |
| 21 | kf-KeyframesStringControls | L-BL-4 | 1 | row 1 ✓ |
| 22 | kf-KeyframesEditor | KF-KE-14 | 1 | row 1 ✓ |
| 23 | kf-LayerConfigPanel | LP-7 (+the `--project demo` CI rider) | 1 | rows 1/3 ✓ (identity short — D-8) |
| 24 | kf-KfPillTabs | C:C-1/L:D-3/D:D-10 · D:D-8 · L:D-8 · header mangle | 4 | R-1 manifest 7/8/9 + row 17/29 ✓ |
| 25 | kf-MbabbMenu | MM-9 · MM-13 · MM-36 | 3 | rows 31/31/1 ✓ |
| 26 | kf-MatrixEditor | ME-5 · ME-32 · ME-29 | 3 | rows 1/3 + G-KFW4-3 ✓ |
| 27 | kf-OrbitalDrag | OD-29 | 1 | row 19 ✓ |
| 28 | kf-RibbonBar | B-1 | 1 | row 1 ✓ |
| 29 | kf-SequenceTarget | L-4 · ST-5 | 2 | row 1 + G-KFW4-1 ✓ |
| 30 | kf-SpringScene | KF-SS-34 | 1 | row 4 ✓ |
| 31 | kf-SpringTrace | L-4/C-8 · L-7/C-6 · L-13/C-7 · D-1(`:48-49`) | 4 | R-1 manifest 10/11/12 + row 29 ✓ |
| 32 | kf-SpringPhysicsFacet | SPF-26 · SPF-27 | 2 | row 1 + manifest 13 ✓ |
| 33 | kf-SquareScene | L-14/C-13.1 (+C-13.4) · MISS-6 · closing verdict `:166`/L-19 | 3 | rows 1+4/26/27 ✓ |
| 34 | kf-StartingStyleTarget | KF-SST-37 | 1 | row 2 ✓ |
| 35 | kf-TimelineCaret | L-4 · L-7 (witness) | 2 | rows 1/4 ✓ |
| 36 | kf-TimelineTrack | C-10 · C-11 · D-m6 · m-1 · D-m5 · M-5/C-5/L-M-5 | 6 | rows 4/1 ✓ (group carried WHOLE) |
| 37 | kf-TimingFunctionPanel | KF-TFP-17 | 1 | row 11 ✓ |
| 38 | kf-TimelineHoverPreview | L-D2 · L-D3 · L-D7(rider) · REGISTER-LAUNDER · C-S+1 | 5 | G-KFW4-1 / row 1 / G-KFW4-10 / row 23 ×2 ✓ |
| 39 | kf-TransportDock | TD-19 (typecheck half) | 1 | row 1 ✓ |
| 40 | kf-TypingDots | KF-EST-1 · KF-EST-6 · L:D-2 · L:D-15 | 4 | rows 12/24/1/2 ✓ |
| — | **subtotal (40 suppliers)** | | **108** | |
| 41 | kf-KeyboardShortcutsModal (0 bytes) | R-9 | 1 | row 1 dissent ✓ |
| 42 | kf-SequenceScene (0 bytes) | D25/L-5/C-7 | 1 | §Bounds + G-KFW4-4 ✓ |
| 43 | kf-SequenceScrubber (0 bytes) | ruling 12 | 1 | row 12 ✓ |

### 1.3 Verdict on axis 1

| figure | value |
|---|--:|
| **routed total (this seat's own denominator, by record)** | **111** |
| **booked** | **110** |
| **escaped** | **1** |

**The one escape: kf-ChromeDock `m-9`.**
`grep -oF 'm-9' KF-W4.md | wc -l` → **0**.
Banked at `kf-ChromeDock.md:41`, inside the exact sentence G-KFW4-1's born-RED column quotes — *"m-1/C-7 (**+m-9**, unadjudicated by either reader, ratified by this seat's `:292` read)"* — and booked again in its own row at `kf-ChromeDock.md:90`: *"**m-1 / C-7 + m-9** — MINOR · booked as the KF-APP-4 rider above (**listed here for count integrity**: the unguarded trigger lookup **+ the inline `find`**; one repair)."*
Round 3's R3-5.2 cure booked `m-8` on the reading that *"the banked sentence at `kf-ChromeDock.md:41` lists **four** riders … and round 2 booked three."* The sentence lists **five**. The round that existed to end sentence-mate truncation re-truncated the same sentence.

**Diff against the retired nine-block partition (reported, per the ORDER, only after the above was closed):** the partition's PASS-3 reading was 109 routed / 104 booked / 5 escaped. This seat's by-record denominator is 111 — the delta of two is granularity (kf-AnimationVisualizer's KF-AV-28 rider and kf-ChromeDock's `m-9` are counted here as rows). All five PASS-3 escapes (KC-17 · ChromeDock m-8 · EditorShell L-6/C-18 · TimelineTrack m-1 and D-m5) verify as **booked** at the current bytes. The partition never contained `m-9`; a by-record harvest does.

---

## §2 · AXIS 2 — ANCHOR RESOLUTION **AND** SUBJECT-IDENTITY

Every symbol-bearing §Bounds row and every gate witness was passed through `git grep -n '<symbol>' origin/master -- '<the row's own file>'`. **Round 3's five repaired members all hold**; the sweep found three new members and one recurring class.

### 2.1 Round-3 repairs — RE-VERIFIED GREEN

| row | check | result |
|---|---|---|
| 78 `seedFor`/`syncGap` | `git grep -n 'seedFor\|syncGap' origin/master -- demo/scenes/easing/EasingSidebar.vue` | `:99 const seedFor` · `:112 if (name in bezierPresets)` · `:122` · `:132 const syncGap` · `:138` · `:162` · `:163` — **the row's stated lines exactly**, and the `:132-137` body verified (`catalogueGap.value = …` closing `:137`). The caption at `:42-49` and the comment at `:86-89` verified verbatim. **CURED.** |
| 78 `useEasingDemo.ts:255-257` | `git show origin/master:demo/scenes/easing/useEasingDemo.ts` | `} else {` / `// Non-bezier curve: reset to linear approximation` / `bezierControlPoints.value = [0, 0, 1, 1];` — exact. |
| 80 `sceneExposedApi.ts:33` | `git grep -n 'isStarted' origin/master -- demo/app/scene/sceneExposedApi.ts` | `:33: isStarted?: boolean;` — exact. |
| 79 `useSquareDemo.ts` `Vars` | `git grep -n '\bVars\b' origin/master -- demo/scenes/square/useSquareDemo.ts` | `:3 import type { Vars }` · `:100 (vars: Vars)` — exact. |
| 62 `backward.ts` three sites | `git grep -n 'sampleColorRamp\|deltaEOK' origin/master -- …/backward/backward.ts` | `:30` · `:32` · `:47` — the widened carve is correct. |
| 64 the four `types.ts` | `git ls-tree -r --name-only origin/master \| grep -E '(^\|/)types\.ts$'` | `demo/scenes/cube/orbital-drag/types.ts` · `src/animation/constants/types.ts` · `src/animation/group/types.ts` · `src/animation/physics/spring/types.ts` — round 3's corrected roster is exact. |

### 2.2 The rest of §Bounds and §Gates — RE-DERIVED

All of the following returned the row's stated bytes: `package.json` `:36-38 :44-46 :50-52 :70 :77 :81 :92` (the four before-forms quoted at D-11 are byte-exact); `tsconfig.json` `:8 :9 :47` (`include: ["src/", "demo/"]` — the C-19 strike is correct); `vitest.config.ts` `:38-56` with `library` `:43-44` / `demo` `:48-55` / include glob `:52` and **no `plugins` key**; `demo/env.d.ts:3-7` `DefineComponent<{}, {}, any>`; `.github/workflows/ci.yml` `:41-42` and `:50-55`; `.dependency-cruiser.cjs` present at the literal path; `src/animation/internal/leaves.ts:17-19` (both false halves in one sentence, the phantom `test/leaves-parity.test.ts` cite confirmed) and `:28`; `test/internal/leaves-parity.test.ts` present; `src/animation/load-engine.ts:65`; `src/animation/engine/css/animation.ts` `_boundTimeline` **exactly three hits** `:5 :54 :82`, **none a read** — R-9's else-branch is the one the census selects, as stated; `registry.ts:30-34 :36 :43`; `easing-serialize.ts:71-73`; `src/animation/constants/types.ts:25 :27 :195`; `src/animation/easing.ts:44` and `waapi/eligibility.ts:169`; `orchestration-api.test.ts:142-148` incl. `:147`; `test/demo` = **27** tracked specs; `test/demo/instrument` = **9** tracked files (the round-3 correction from "ten" is right); `scripts/gates/` = **9** scripts incl. `structure/index.mjs` + `agent-surface.mjs`; `scripts/observe/demo/usability.mjs` `:9` (the header, off-by-one cure correct) `:164 :172 :188 :239 :259 :278-285`; `demo/styles/font-roles.json` `:17`/`:23` inside `:16-26`, `:36`, `:68`, `:82`; `proof:idioms` ×3 at `design-idioms.css:3`, `design-idioms.css:43`, **`layout.css:10`** (round 3's D-6 cure verified); `INERTIA_FACTOR = 0.92` at `orbital-inertia-parity.test.ts:29` vs `OrbitalDrag.vue:56 … ?? 0.95`.

**The K3 demo cure sites all verify by subject**: `AmigaScene.vue:21` (dead `computed` in the import list) · `useSquareTumble.ts:37` (`as CssColor`, exact) · `SequenceScene.vue` **43 lines**, `:8` imports `computed`, `grep -c 'computed('` → **0** · `SpringScene.vue` `:17` `computed` / `:29` `SCENE_ID` → `:185` / `:55` `isPlaying` / `:56` `isStarted` → `:186` · `ChannelOptions.vue:437` `import { Teleport, computed, … }` · and the *"two of three cluster SFCs"* count **reproduces exactly**: `props.` reads = **0** in `TimelineTrack.vue`, **0** in `TimelineCaret.vue`, **9** in `KeyframeTimeline.vue`.

**The eight citation targets reproduce to the digit**: per-file `proof:` line counts 13 · 5 · 3 · 3 · 3 · 3 · 2 · 1 = **33 lines**, and `grep -oE 'proof:[A-Za-z0-9_-]+' | sort -u` returns exactly **19** names, matching R-7's roster **member-for-member** across cells (a) 17 / (b) `brittleness` / (c) `publish`. The partition is TOTAL at the bytes. `EditorShell.vue` carries **0** `proof:` bytes — the strike is correct.

### 2.3 New subject-identity findings

1. **A pinned inventory that resolves to something else — see D-1 (CRITICAL).** G-KFW4-11's "three live deep-import sites" do not exist at the coordinates named, and the true set is seven.
2. **A printed figure the printed command does not produce — see D-4 (MAJOR).** Row 68's "five uses" against eight.
3. **Three bare leaves surviving the sweep — see D-7 (MINOR).** `easing.ts:44`, `TimelineCaret.vue:35`, `KeyframeTimeline.vue:179` — all resolve uniquely, so the anchors are TRUE; the sweep that retired bare `types.ts` and elided `demo/…/useSquareDemo.ts` simply did not reach them. (Note the trap avoided by luck: `TimelineTrack.vue` lives at `…/timeline/components/`, `TimelineCaret.vue` at `…/timeline/` — the row's own two path shapes differ.)

---

## §3 · AXIS 3 — M-25 DEPTH

**Consumed by mechanism, not transcribed.** Sampled hard against the banks: row 1 carries kf-KeyboardShortcutsModal's **R-9 dissent against its own founding premise** and answers it rather than dropping it; row 1 carries kf-KeyframeCardList's KC-13 **ordering dissent** and KC-17's **honest disclaimer** (*"a right type would NOT have caught KC-1"*); row 4 carries the kf-TimelineTrack merged group at its full five ids with both dispositions (cure → W7, enforcement here); row 29 carries kf-SpringTrace's KF.W4-PROSE bucket **whole, all four items**, including D-1's `:48-49` sequencing rider (*"rides the fix"*); row 27 correctly refuses to claim banked `L-19`'s own cure and lifts only the closing verdict's LAW, naming its count of eight; rows 30/31 preserve three KILLED sub-claims by name (`_withCtx` lazy closure · the modality hazard · the "12 fields" clobber) so they cannot be re-imported; §Excluded 15 kills two false framings at the frontier. **The R-1 manifest is id-for-id and reciprocal**, and `KF-W6-CARRY.md` books the receiving end.

**Depth findings**: two.
- **D-5** — KF-ET-11 and KF-ES-34 are booked in **both** row 1 and row 2 against banks that route each to KF-CB-8 alone. A double-booking is the mirror image of a drop, and this file legislates "booked once, never re-booked" four times.
- **D-8** — the kf-LayerConfigPanel CI-project rider arrives at row 3 stripped of its banked identity (`≡ kf-MatrixEditor K1 + FAM-03/MR4`), carried as "= V.md's MR4" alone. M-25: a rider's provenance is part of the rider.

Everything else at this axis is **sound**. This is the strongest of the five axes.

---

## §4 · AXIS 4 — GATES: BORN-RED WITH **REACHABLE** GREEN · LAW A · LAW B

### 4.1 Gate-by-gate

| gate | witness re-derives at `81a56990`? | GREEN reachable in-bounds? |
|---|---|---|
| G-KFW4-1 | ✓ (`vue-tsc` absent from manifest; `env.d.ts:3-7` standing; every day-one diagnostic's file/flag verified) | ✓ — and the NO-SILENT-DELETION falsifier now has all four before-forms quoted byte-exact, so it is executable on all four scripts |
| G-KFW4-2 | ✓ (`ci.yml:50-55`; `vitest.config.ts:48-55`, no `plugins`; 27 tracked specs) | ✓ |
| G-KFW4-3 | ✓ (ME-29's keyless `v-for`; `lint = depcruise src`) | ✓ |
| **G-KFW4-11** | **✗ — the pinned inventory is false at the frontier** | **✗ — see D-1** |
| G-KFW4-12 | ✓ (`monaco-themes` at `:92`; consumer set ∅) | ✓ |
| G-KFW4-4 | ✓ (all in-bounds sites verified by subject; `_boundTimeline` census reproduces) | ✓ — L-7's cross-wave exception is declared, not swept |
| G-KFW4-5 | ✓ (`registry.ts:36` docstring false; `:43` fence; `easing-serialize.ts:71-73`) | ✓ — `test/compile/` is the tree's easing zone |
| G-KFW4-6 | ✓ (`leaves.ts:19` + `:18`; `:28` re-export) | ✓ |
| G-KFW4-7 | ✓ (`backward.ts:30/:32/:47`) | ✓ |
| G-KFW4-8 | ✓ (33 lines / 19 names verified; carve declared) | ✓ — the partition is TOTAL at the bytes |
| **G-KFW4-9** | ✓ in mechanism; **the row-68 arithmetic misstates its own printed output** | ✓ — but see D-4 |
| G-KFW4-10 | ✓ (`font-roles.json` `:16-26`/`:34-38`/`:68`/`:82`) | ✓ |
| G-KFW4-13 | ✓ (`types.ts:25/:27/:195`; the two prose phantoms) | ✓ |
| **G-KFW4-14** | ✓ | ✓ — **the round-3 cure HOLDS**: `seedFor` is now inside §Bounds at its true file, so *"fails if the caption is corrected while `seedFor` still reaches `bezierPresets`"* is reachable for the first time. The PASS-3 CRITICAL is closed. |

**13 of 14 re-derive; 1 — G-KFW4-11 — is born-RED with UNREACHABLE GREEN.**

### 4.2 LAW A — the five import-graph censuses, RE-RUN

| act | this seat's re-run | verdict |
|---|---|---|
| `test/internal/leaves-parity.test.ts` delete | `git grep -nF 'leaves-parity' origin/master -- src/ demo/ test/ scripts/` → exactly two prose hits (`leaves.ts:18`, `computed-resolution.test.ts:26`), zero import specifiers | **SOUND** — and the phantom-path find (`test/leaves-parity.test.ts` vs the real `test/internal/…`) reproduces |
| `−monaco-themes` | `git grep -nF 'monaco-themes' origin/master -- src/ demo/ test/ scripts/` → `CSSCodeEditor.vue:32/:33` (prose) + `:36/:37` importing `./monaco-themes/*.json`, the **vendored sibling directory** | **SOUND** — consumer set ∅ confirmed |
| `_boundTimeline` decision | `git grep -n '_boundTimeline' origin/master -- src/ demo/ test/ scripts/` → three hits, one file, **no read** | **SOUND** — the else-branch is correctly selected |
| `font-roles.json` fold | `git grep -nF 'font-roles' origin/master -- demo/ src/ test/ scripts/` → **one** hit, `demo/DESIGN.md:28`, prose | **SOUND** — no reader to strand |
| the carried F-5 shim repoint | `git grep -nF 'composables/useKfPillTabs' …` → **one** live import, `ChannelControls.vue:230`, type-only ✓. Symbol census returns **nine** hits; the row resolves **three** | **CONCLUSION SOUND, METHOD SHORT — D-6** |

### 4.3 LAW B — the closure-claim ban

**Executed.** Every completeness sentence sampled (AUDITED cell · SPECIFIED cell · carry-table preamble · §Gates head · §Sequencing's eight-record enumeration and 17-packet homing · §Excluded head · the R-7 totality clause · the §Excluded load-bearing consequence) cites `PASS-3/KF-W4-CHECK.md` by repo path and date and states what it found **including its defects**. No such claim survives in spec voice. The re-pointing instruction is stated and was actually exercised (the `KF-W0.md:447 → :588` re-anchor). **No LAW B defect found.** One second-order note: this file now inherits PASS-3's figures, which this pass supersedes — the citations should re-point to this register.

---

## §5 · AXIS 5 — POSTURE

| obligation | verdict |
|---|---|
| **W4 = head** | **HOLDS.** All eight enumerated records were re-read and each states the sequencing claim (kf-CSSCodeEditor ×2 · kf-ChannelOptions · kf-KeyframeCardList · kf-KeyframesEditor · kf-CubeAxisLines ×3 · kf-LayerConfigPanel · kf-KeyframeTimeline · kf-TimelineHoverPreview). The kf-AmigaScene strike is correct — its 3 W4 bytes are C-19/K3 prose and carry no sequencing claim. |
| **W3 gated** | **HOLDS.** R-2's terminus is condition-bound, not calendar-dated, and the KF.W3 cross-edge states the gating explicitly. |
| **KF-AV-28** | **HOLDS with a declared split.** KF-W4 carries the supersession core and names all three bank sites; `KF-W0.md:588` reciprocally declares that it carries the §7-caution / NON-bespoke limb, *"so the two ends now agree and neither drops a half."* Both ends state the split. |
| **O-21** | **HOLDS.** Named by id, consumed as a ROW under KF.W1's `max+1` MINT LAW; the `O-20` corollary sentence is a property-statement, not a self-count. |
| **the W10-seam five-edge table** | **HOLDS.** W10 receives doc-truth addenda only (`home.json:9`, the two stale kf-AnimatedText authorities, the `345/12/57 @ 8281638c` citation boundary), and §Excluded 5 + the Do-NOT-touch line forbid the census from scanning `docs/tranches/**`. Fulfilled at source waves, not deferred. |
| **17-packet homing** | **HOLDS, verified at the other end.** `KF-W0.md:588`'s canonical roster matches KF-W4's list **member-for-member** (9 + 6 + 2) and reciprocally states *"Homing is discharged by KF.W4's lists, not by this wave."* |
| **W8 plugin-vue reciprocity (R3-8.2)** | **HOLDS at both ends.** `KF-W8.md:71`/`:72`/`:187` independently declare that the `plugins` registration is KF.W4's booked act in W4's commit 2, that W8 performs no `vitest.config.ts` edit, and that W4 lands first. |
| **KF-W6-CARRY citation** | **EXACT.** `grep -cE '^- \*\*'` → **201** rows; the header declares **54** records. The spec's "201 rows / 54 records" verifies, and R-12 is honoured — no per-wave carry is claimed as this file's provenance. |
| **AUDITED basis** | **DEFECTIVE — D-3.** |

---

## §6 · DEFECT REGISTER (8)

### D-1 · CRITICAL — G-KFW4-11's pinned inventory is false at the frontier; the gate is born-RED with UNREACHABLE GREEN

**Claim.** §Gates unit `.b`, G-KFW4-11, born-RED column: *"config scoped to `src/` ⇒ blind to **three live deep-import sites** — `CSSCodeEditor` + `useKeyframesState.ts:1` (`@src/animation/resolve/browser` …), `AnimationVisualizer:79`, `timelineEngine:4`/`:19`"*; falsifier: *"The rule is an **equality census, never an allowlist**: the set of `demo/→@src/…` deep imports **must equal the pinned three-site inventory**, re-read and re-hashed at use; **it fails on an addition** and on a silent removal."*

**Receipt** (`git grep -n '@src/' origin/master -- demo/`, this seat):

```
demo/components/instrument/keyframes/composables/useKeyframeOps.ts:1   @src/animation/compile/emit/css-text
demo/components/instrument/keyframes/utils/parseAnimationCSS.ts:7      @src/animation/compile/emit/css-text
demo/components/instrument/timeline/utils/timelineEngine.ts:1          @src/animation/internal/helpers
demo/components/instrument/timeline/utils/timelineEngine.ts:17         @src/animation/compile/emit/css-text
demo/components/playback/AnimationVisualizer.vue:45                    @src/animation/resolve/browser
demo/utils/helpers.ts:9                                                @src/animation/resolve/browser
demo/utils/keyframeSelector.ts:5                                       @src/animation/compile/selector
      (+ two prose-only mentions: demo/kf-engine.ts:5, useOrbitalInertia.ts:12)
```

**Seven import specifiers across six files, not three** — and not one of the three named sites resolves as written:

- **`CSSCodeEditor`** carries **no `@src/` import at all.** `git show origin/master:demo/components/instrument/keyframes/CSSCodeEditor.vue | grep -n 'import'` → `:40 import { convertPixelsToCh } from "@utils/helpers";`
- **`useKeyframesState.ts:1`** is `import { convertPixelsToCh } from "@utils/helpers";` — **also not a deep import.** The deep hop moved one file away: `demo/utils/helpers.ts:9` imports `convertToPixels` from `@src/animation/resolve/browser`.
- **`AnimationVisualizer:79`** — the site is `demo/components/playback/AnimationVisualizer.vue:**45**`.
- **`timelineEngine:4`/`:19`** — the sites are `:1`/`:17`.
- **`useKeyframeOps.ts:1`, `parseAnimationCSS.ts:7`, `keyframeSelector.ts:5`** are live deep imports the inventory never names.

**Why this is CRITICAL and not clerical.** The gate's oracle is an **equality** against the pinned set, and the falsifier says it **fails on an addition**. Pinned at three, the gate reds against a tree that holds seven and can never be brought GREEN inside §Bounds — G-KFW4-11's cure sites are KF.W8's by this file's own §Excluded 4. That is precisely the *"born-RED with unreachable GREEN"* class §Gates opens by saying it convicts, and it is the same class G-KFW4-14 was convicted of for two rounds. The anchors were inherited from `kf-CSSCodeEditor.md:46`, measured at the **disqualified** worktree — `git grep -n '@src/' 8281638c -- demo/components/instrument/keyframes/ demo/components/playback/ demo/components/instrument/timeline/utils/` returns nothing at those paths either, so the bank's reading is stale at both coordinates. R2-5's law (*a ruling/bank orders a cure; it is never a source of measurements*) was applied to nine anchors in round 2 and five in round 3 and never to this one. The row also propagates: `depcruise-inventory.json` (§Artefacts) is specified as *"the pinned three sites, hashed."*

**Cure shape (for the ruling seat, not spent here):** re-derive the inventory by the printed command, write all seven specifier lines with their file paths at the born-RED column and at `depcruise-inventory.json`, and restate `KF-CE-12`/`KF-AV-8`/`C-12`'s witness set at the frontier's coordinates. The equality rule survives; only its denominator was wrong.

### D-2 · MAJOR — pass-4 census escape: kf-ChromeDock `m-9`

**Claim.** Carry row 1 / G-KFW4-1's born-RED column books four ChromeDock riders (`:128` TS2322 · C-8 · m-1/C-7 · m-8) on the round-3 reading that the banked sentence *"lists **four** riders."*
**Receipt.** `kf-ChromeDock.md:41` lists **five**; `kf-ChromeDock.md:90` books the fifth in its own row: *"**m-1 / C-7 + m-9** — MINOR · booked as the KF-APP-4 rider above (**listed here for count integrity**: the unguarded trigger lookup **+ the inline `find`**; one repair)."* `grep -oF 'm-9' KF-W4.md | wc -l` → **0**.
**Why it matters.** Same record, same sentence, same fault class as R3-5.2 — one round after the cure. The record itself flags the id as existing *for count integrity*, which is the strongest possible signal against dropping it.

### D-3 · MAJOR — the AUDITED basis omits two records this file consults by path

**Claim.** *"`registry/adjudicated/`, **47 distinct records consulted**"*, with the balance *"composed exactly"* as four byte-carriers + three zero-byte carriers.
**Receipt.** `grep -oF 'PlaybackRibbon' KF-W4.md | wc -l` → **6**. The file cites `kf-PlaybackRibbon.md:36` twice as a load-bearing source — at §Sequencing (*"the KF-AV-28 rider … binds hardest on … the **transport/ribbon** packet (`PlaybackRibbon.vue`)"*) and at KF.W13's homing (*"**transport/ribbon** (`kf-PlaybackRibbon.md:36` — **HOMED for the first time**; carries the KF-AV-28 rider …)"*). The record carries **2** W4 bytes and routes no W4 id, so it is a fifth member of the balance. It appears nowhere in the 47. `kf-CSSPasteDialog` is the second instance: cited at the KF.W0 cross-edge (*"kf-CSSPasteDialog's 'version STRINGS not ARTIFACTS' registry repair"*), absent from the 47.
**Why it matters.** The AUDITED cell's own standard, stated at round 2 when it added kf-SequenceScene: *"the basis could not honestly omit the record it comes from."* The arithmetic 40 + 7 = 47 closes only because the two consulted records were never counted.

### D-4 · MAJOR — a printed figure the printed command does not produce, in the row round 3 repaired for that class

**Claim.** §Bounds row 68: *"Pasted: `git grep -n 'INERTIA_FACTOR' origin/master -- test/` → `…/orbital-inertia-parity.test.ts:29:const INERTIA_FACTOR = 0.92; …` (**with its five uses at `:52`/`:76`/`:99`/`:123`/`:132`**)."*
**Receipt.** The command returns **nine** lines — the declaration at `:29` plus **eight** uses: `:52 :58 :76 :99 :106 :123 :132 :138`. Three uses (`:58`, `:106`, `:138` — the constant passed as an argument) are unnamed.
**Why it matters.** R2-5's binding form is *"every anchor is re-executed at write time **and its command printed beside the figure**"*, and round 3's D-10 struck an entire §Excluded item for printing a command that does not produce its figure. This is the same fault in the row that carries G-KFW4-9's central rule-(c)/(d) witness — the very row round 3 repaired (D-5) for naming one file where two were needed.

### D-5 · MINOR — two ids booked twice, against the file's own "booked once, never re-booked"

**Claim.** Carry row 1 (the KF-APP-4 identity) lists *"≡ **KF-ET-11** ≡ KF-ES-16 ≡ **KF-ES-34**"*; carry row 2 (the KF-CB-8 identity) lists *"KF-CB-8 ≡ **KF-ET-11** ≡ **KF-ES-34** ≡ KF-SST-37 (rider) ≡ L:D-15."*
**Receipt.** `kf-EasingTarget.md:50` — *"KF-ET-11 · C-16 … **ONE identity with the banked KF-CB-8** … → **FOLD by reference to KF-CB-8 → KF.W4**."* `kf-EasingSidebar.md:78` — *"KF-ES-34 … = **KF-CB-8 identity** (banked) — FOLD-EXTENDED … → **fold to KF-CB-8 → KF.W4** (gate topology)."* Both banks route to KF-CB-8 **alone**; row 1's listing is a second booking of the same id under a different identity.
**Why it matters.** The file legislates the discipline four times (row 1's *"booked once for the program"*, row 17's *"BOOKED ONCE … never double-booked"*, row 31's *"booked once, never re-booked"*, §Excluded 6). A denominator inflated by double-booking is as unreliable as one deflated by a drop.

### D-6 · MINOR — LAW A's symbol census resolves 3 of 9 hits while claiming it resolves each

**Claim.** Row 29's F-5 census: *"(2) **symbol census** `git grep -n '\buseKfPillTabs\b' origin/master -- demo/ test/ src/ scripts/`, **each hit resolved to its own specifier**: `KfPillTabs.vue:43`/`:44` and `test/demo/instrument/KfPillTabs.test.ts:26-28` import the REAL module."*
**Receipt.** The command returns **nine** lines. Unnamed: `KfPillTabs.vue:68` (the call), `KfPillTabs/useKfPillTabs.ts:37` (the real definition), `composables/useKfPillTabs.ts:2`/`:4` (the shim's own body), `KfPillTabs.test.ts:12`/`:20`/`:62` (prose + a second call).
**Why it matters.** The **conclusion is correct** — consumer set = { `ChannelControls.vue:230` }, verified independently here, type-only, and the *"NOT at the `.vue`"* clause holds (`ChannelControls.vue:229` already imports the `.vue`, which publishes no `KfPillTabOption`). But LAW A's stated method is *"symbol census with **each hit resolved to its own specifier**"*, and a census that resolves a third of its output while declaring the method is a claim its receipts do not reproduce — the LAW B corollary applied to LAW A.

### D-7 · MINOR — three bare leaves survive the SUBJECT-IDENTITY sweep

**Claim.** §Bounds row 65: `` `easing.ts:44` · `src/animation/waapi/eligibility.ts:169` `` — one pathless, one pathed, in one cell. §Bounds row 63 names `` `TimelineCaret.vue:35` `` and `` `KeyframeTimeline.vue:179` `` pathless beside six leaves it path-qualifies in full at the same round.
**Receipt.** All three resolve **uniquely** at the frontier — `src/animation/easing.ts:44`, `demo/components/instrument/timeline/TimelineCaret.vue:35`, `demo/components/instrument/timeline/KeyframeTimeline.vue:179` — and all three carry the stated content (`git grep -n 'const props' origin/master -- demo/components/instrument/timeline/` returns `KeyframeTimeline.vue:179` and `TimelineCaret.vue:35`, plus `CSSPasteDialog.vue:43` and `components/TimelineTrack.vue:120`).
**Why it matters.** No anchor is wrong. But the row that struck bare `types.ts` (*"a pathless leaf resolves to nothing checkable"*) and retired `demo/…/useSquareDemo.ts` (*"an ellipsis is a pathless anchor wearing a path"*) left three bare leaves standing two rows away — and the near-miss is real: `TimelineTrack.vue` sits under `…/timeline/components/` while `TimelineCaret.vue` sits under `…/timeline/`, so the two path shapes in this one row are not interchangeable.

### D-8 · MINOR — a rider arrives stripped of its banked identity

**Claim.** Carry row 3: *"LP-7's rider is load-bearing: a `--project demo` CI step (**= V.md's MR4**) is a prerequisite of the cure, not an optional extra."*
**Receipt.** `kf-LayerConfigPanel.md:52` banks it as *"Rider ADMITTED (RR-2 miss #3, **mechanism PRE-BANKED ≡ kf-MatrixEditor K1 + keyframes' own FAM-03/MR4**)"*, and `:95`/`:126` repeat the identity twice more (*"CI-project rider ≡ kf-MatrixEditor K1 + FAM-03/MR4"*).
**Why it matters.** M-25 depth: the rider's provenance is what makes it a fold rather than a fresh assertion, and `kf-MatrixEditor K1` is a thrice-fired killed-claim whose survival is exactly why the rider is load-bearing (`kf-MatrixEditor.md:32`, ruling 8). Naming one of three identities loses the fold.

---

## §7 · VERDICT

**DEFECTIVE.**

Three of five axes **HOLD** outright — **axis 3 (M-25 depth)** with two minor findings and no drops of substance, **axis 5 (posture)** with every cross-edge verified reciprocally at the other end and every count (17 packets · 201/54 CARRY · 8 sequencing witnesses · the W8 plugin-vue boundary) reproducing exactly, and **LAW B**, which is executed without exception. Round 3's headline repairs all hold at the tree: row 78's re-filing is correct, G-KFW4-14's falsifier is reachable for the first time, and four of the five LAW A censuses re-run sound.

Two axes fail.

**Axis 4** carries the pass's only CRITICAL. **G-KFW4-11 is born-RED with unreachable GREEN**: its equality oracle is pinned to a three-site inventory that the frontier contradicts seven ways, and not one of the three named sites resolves — `CSSCodeEditor` and `useKeyframesState.ts:1` import `@utils/helpers`, not `@src/…` at all. This is the *same class of failure at a different address* as the two the spec has already been convicted of: an anchor set inherited from a bank measured at the **disqualified** worktree, never re-derived, in a gate whose falsifier fails on addition. R2-5's re-derivation law reached nine anchors in round 2 and five in round 3 and has never reached this row.

**Axis 1** yields one fresh escape — **`m-9`** — and it is the more instructive failure, because it is the round-3 cure's own sentence, re-truncated one round later while booking the id beside it. Together with **D-3** (an AUDITED basis of 47 that omits two records the file cites by path) and **D-4** (five uses printed where the printed command returns eight), the pattern of this pass is not carelessness but **scope**: each guardrail this program installs is executed exactly over the surface the prior ruling named, and stops one row short of the surface it governs. R3's own words — *"a falsifier's scope is the only thing that makes it executable"* — are the finding, turned on the file that wrote them.

**111 routed · 110 booked · 1 escaped · 8 defects (1 CRITICAL · 3 MAJOR · 4 MINOR).**
