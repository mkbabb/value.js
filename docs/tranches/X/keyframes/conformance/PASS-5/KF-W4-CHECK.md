# PASS-5 · KF-W4 — FRESH ADVERSARIAL SPEC CHECK (L-18 / L-20)

**Subject**: `docs/tranches/X/keyframes/waves/KF-W4.md` — 333 lines, 209,984 B, mtime **2026-08-28 16:59:44** (its round-4 final bytes; the RECONCILE seat did not touch it).
**Seat**: FRESH. `PASS-4/KF-W4-CHECK.md`, `PASS-4/RULINGS-4.md` and `PASS-4/CLOSE-CERT.md` were read **only** to learn what the round claims it cured. No denominator, count, anchor or partition was inherited from any of them; §1 below was harvested from the 58 records' bytes before any prior figure was consulted.
**Substrate law**: every keyframes-side witness in this register was re-executed read-only at **`origin/master 81a56990736ced5b5edde0b84c527680ac7689b1`** (`git rev-parse origin/master`, re-resolved this seat) in the sibling checkout `/Users/mkbabb/Programming/keyframes.js`. That checkout's local HEAD is `8281638c` with a **dirty worktree**; every command below names `origin/master` explicitly, so no working-tree byte enters this register. Zero product writes; the sole write of this seat is this file.
**Census law**: §1 is a per-record, id-keyed harvest across all **58** `kf-*.md` at `docs/tranches/V/megatranche/registry/adjudicated/`. Sole carry consulted: `docs/tranches/X/keyframes/carry/KF-W6-CARRY.md`.
**Date**: 2026-08-28.

---

## §0 · HEADLINE

| axis | verdict |
|---|---|
| **1 · id-keyed census, by record** | **HOLDS — 111 routed · 111 booked · 0 escaped.** The first zero-escape reading this wave has produced. One structural defect survives inside carriage (D-4). |
| **2 · receipt reality (the drift class)** | **FAILS.** The class is not dead. Two sibling coordinates are stale-and-off-target at their siblings' FINAL bytes, and one cross-edge misstates a sibling's gate on two counts under an explicit *"verified at both specs' bytes"*. |
| **3 · M-25 depth + LAW-A censuses reproduce** | **HOLDS with two findings.** Twenty-one pasted commands re-run; nineteen reproduce to the digit. |
| **4 · gates born-RED with REACHABLE green** | **FAILS on one of fourteen.** G-KFW4-11's inventory is cured and reproduces exactly; its *command* oracle is not the oracle its falsifier states, and under the command the GREEN is still unreachable in-bounds. |
| **5 · posture** | **HOLDS.** W4 head · W3 gated · O-21 · the R4-8 W11/W12/W13 disposition · W10's §6.D conditioning — all present, coherent, and verified at the other end. |

**VERDICT: DEFECTIVE. 111 routed · 111 booked · 0 escaped · 10 defects (0 CRITICAL · 5 MAJOR · 5 MINOR).**

---

## §1 · AXIS 1 — ID-KEYED CENSUS, BY RECORD

### 1.1 The record-level sweep

`grep -cE 'KF\.W4|KF-W4|\bW4\b'` run per file over all 58 records, this seat:

| class | n |
|---|--:|
| carry ≥1 W4 byte | **45** |
| carry ZERO W4 bytes | **13** — kf-App.skeleton · kf-CSSPasteDialog · kf-CubeTarget · kf-KeyboardShortcutsModal · kf-KeyframesAddDialog · kf-SequenceAxis · kf-SequencePlayhead · kf-SequenceScene · kf-SequenceScrubber · kf-SharePopover · kf-SpringHeatmap · kf-SpringTarget · kf-SquareInstrument |

45 + 13 = **58**. Of the 45 byte-carriers, **40 supply ≥1 W4-routed id** and **five supply none** — kf-CubeAxisLines **3** · kf-DemoGlobalChrome **1** · kf-EditorHeader **1** · kf-KeyframeCard **1** · kf-PlaybackRibbon **2** (each re-measured; all five outputs reproduce the spec's AUDITED cell exactly). Three zero-byte records are nevertheless *carried* by the spec and are counted as routed rows because it books them.

**The AUDITED cell verifies.** Its enumerated roster, extracted and de-duplicated this seat, is **49 distinct records** (the raw list holds 50 tokens; the duplicate is the parenthetical gloss *"plus kf-SequenceScene, the tenth"*, not a second roster entry — the bold ten-name block and its "nine + the tenth" gloss are internally consistent). The composition **40 + 5 + 4 = 49** sums and each of its nine balance members reproduces at the bytes. The round-4 D-3 cure (47 → 49, entering kf-PlaybackRibbon and kf-CSSPasteDialog) is correct: `grep -oF 'PlaybackRibbon' KF-W4.md | wc -l` → **6**, and kf-CSSPasteDialog is cited at the KF.W0 cross-edge.

### 1.2 Per-record routed ids (the denominator)

Convention (this seat's, stated so it is falsifiable): one row per **banked id or explicitly-banked rider** a record routes to `KF.W4` / `KF.W4-PROSE`, including witness-only and rider-only routings; merged groups counted at their member ids.

| # | record | routed ids | n | booked in KF-W4.md |
|--:|---|---|--:|---|
| 1 | kf-AmigaScene | C-19/L-m1 | 1 | row 4 ✓ |
| 2 | kf-AnimationControlsGroup | C-4 | 1 | row 30 ✓ |
| 3 | kf-AnimatedText | KF-AT-4 · KF-AT-7 · KF-AT-10 · KF-AT-12 · KF-AT-24 | 5 | rows 15/18/16/1/17 ✓ |
| 4 | kf-App | KF-APP-4 | 1 | row 1 ✓ |
| 5 | kf-CSSCodeEditor | KF-CE-12 (gate arm) · KF-CE-16 · KF-CE-30 | 3 | rows 21/1/22 ✓ |
| 6 | kf-AnimationVisualizer | KF-AV-8 · KF-AV-9 (W4 arm → KF-AV-18) · KF-AV-18 · KF-AV-28 (rider) | 4 | rows 21/20/20 + §Sequencing ✓ |
| 7 | kf-ChannelControls | C-6 · D-7/L-4 · C-13 · C-15 · L-18 · L-19 · N-7 | 7 | row 29 + R-1 manifest 1–6 ✓ |
| 8 | kf-ChromeDock | C-2/B-2 · `:128` TS2322 · C-8 · m-8 · m-1/C-7 · **m-9** | 6 | row 1 / G-KFW4-1 — **all five riders booked; `grep -oF 'm-9' KF-W4.md` → 3** ✓ |
| 9 | kf-ChannelOptions | KF-CO-7 · KF-CO-33 | 2 | rows 1/29 + §Excluded 21 ✓ (see D-10) |
| 10 | kf-CopyButton | KF-CB-8 · KF-CB-18 · KF-CB-24 · KF-CB-29 | 4 | rows 2/9/10/11 ✓ |
| 11 | kf-CubeScene | L-8/C-9 · L-18/C-12a · L-10/L-11 | 3 | rows 1/25/4 ✓ |
| 12 | kf-ControlsPaneWrapper | N-1/C-5 · M-5/C-9 | 2 | rows 30/1 ✓ |
| 13 | kf-EasingSidebar | KF-ES-3 · KF-ES-34 | 2 | rows 8/2 ✓ (D-5's cure verified: KF-ES-34 is gone from row 1) |
| 14 | kf-EasingScene | KF-ES-14 · KF-ES-16 | 2 | row 8 / rows 1+4+25 — **see D-4** |
| 15 | kf-EasingTarget | KF-ET-6 · KF-ET-11 | 2 | rows 8/2 ✓ (D-5's cure verified) |
| 16 | kf-EditorStartScreen | L-EST-16 · L-EST-17 · KF-EST-1 · KF-EST-6 | 4 | rows 1/17/12/24 ✓ |
| 17 | kf-EditorShell | L-4/C-6 · L-6/C-18 · C-21 · D-19 | 4 | rows 1/3/3/14 ✓ |
| 18 | kf-HeroAurora | KF-HA-4 · KF-HA-5 | 2 | rows 13/1 ✓ |
| 19 | kf-KeyframeCardList | KC-13 · KC-17 · KC-37 | 3 | row 1 + G-KFW4-1 ✓ |
| 20 | kf-KeyframeTimeline | C-12 (depcruise arm) · RR-B missed-1 · L-14 (K3) | 3 | rows 21/1/4 ✓ |
| 21 | kf-KeyframesStringControls | L-BL-4 | 1 | row 1 ✓ |
| 22 | kf-KeyframesEditor | KF-KE-14 | 1 | row 1 ✓ |
| 23 | kf-LayerConfigPanel | LP-7 (+ the `--project demo` CI rider) | 1 | rows 1/3 ✓ (D-8's identity restoration verified — see §3) |
| 24 | kf-KfPillTabs | C:C-1/L:D-3/D:D-10 · D:D-8 · L:D-8 · header mangle | 4 | R-1 manifest 7/8/9 + rows 17/29 ✓ |
| 25 | kf-MbabbMenu | MM-9 · MM-13 · MM-36 | 3 | rows 31/31/1 ✓ |
| 26 | kf-MatrixEditor | ME-5 · ME-32 · ME-29 | 3 | rows 1/3 + G-KFW4-3 ✓ |
| 27 | kf-OrbitalDrag | OD-29 | 1 | row 19 ✓ |
| 28 | kf-RibbonBar | B-1 | 1 | row 1 ✓ |
| 29 | kf-SequenceTarget | L-4 · ST-5 | 2 | row 1 + G-KFW4-1 ✓ |
| 30 | kf-SpringScene | KF-SS-34 | 1 | row 4 ✓ |
| 31 | kf-SpringTrace | L-4/C-8 · L-7/C-6 · L-13/C-7 · D-1 (`:48-49`) | 4 | R-1 manifest 10/11/12 + row 29 ✓ |
| 32 | kf-SpringPhysicsFacet | SPF-26 · SPF-27 | 2 | row 1 + manifest 13 ✓ |
| 33 | kf-SquareScene | L-14/C-13.1 (+C-13.4) · MISS-6 · the closing verdict `:166`/L-19 | 3 | rows 1+4/26/27 ✓ |
| 34 | kf-StartingStyleTarget | KF-SST-37 | 1 | row 2 ✓ |
| 35 | kf-TimelineCaret | L-4 · L-7 (witness only) | 2 | rows 1/4 ✓ |
| 36 | kf-TimelineTrack | C-10 · C-11 · D-m6 · m-1 · D-m5 · M-5/C-5/L-M-5 | 6 | rows 4/1 ✓ (group carried WHOLE) |
| 37 | kf-TimingFunctionPanel | KF-TFP-17 | 1 | row 11 ✓ |
| 38 | kf-TimelineHoverPreview | L-D2 · L-D3 · L-D7 · REGISTER-LAUNDER · C-S+1 | 5 | G-KFW4-1 / row 1 / G-KFW4-10 / row 23 ×2 ✓ |
| 39 | kf-TransportDock | TD-19 (typecheck half) | 1 | rows 1/3 ✓ |
| 40 | kf-TypingDots | KF-EST-1 · KF-EST-6 · L:D-2 · L:D-15 | 4 | rows 12/24/1/2 ✓ |
| — | **subtotal (40 suppliers)** | | **108** | |
| 41 | kf-KeyboardShortcutsModal (0 bytes) | R-9 | 1 | row 1 dissent ✓ |
| 42 | kf-SequenceScene (0 bytes) | D25/L-5/C-7 | 1 | §Bounds + G-KFW4-4 ✓ |
| 43 | kf-SequenceScrubber (0 bytes) | ruling 12 | 1 | row 12 ✓ |

### 1.3 Verdict on axis 1

| figure | value |
|---|--:|
| **routed total (this seat's own by-record denominator)** | **111** |
| **booked** | **111** |
| **escaped** | **0** |

**Method of the booking check, so it is reproducible**: every id above was passed through `grep -oF -- '<id>' KF-W4.md | wc -l`; the loop printed **no** zero. `m-9` — pass 4's sole escape — returns **3**, booked at G-KFW4-1's born-RED column with `kf-ChromeDock.md:41` quoted **entire** and `:90` quoted beside it, exactly as R4-9.2 ordered. Round 3's five (KC-17 · m-8 · L-6/C-18 · m-1 · D-m5) verify booked. **The census axis holds for the first time in five passes**, and it holds on a denominator built by record rather than by partition — which is the ORDER's whole point.

**What did not survive is not carriage but its discipline: see D-4.** One id (`KF-ES-16`) is booked at **three** rows against a file that legislates *"booked once, never re-booked"* four times, and its row-1 booking fails the exact predicate round 4 used to strike two of its neighbours.

---

## §2 · AXIS 2 — RECEIPT REALITY: CROSS-WAVE RECEIPTS AGAINST **FINAL** SIBLING BYTES

**The substrate table this axis judges against** (`stat -f '%Sm %z %N'`, this seat — identical to CLOSE-CERT §1):

`KF-W0` 16:58:59 · `KF-W3` 16:56:52 · `KF-W6` 16:59:25 · **`KF-W4` 16:59:44** · `KF-W2` 17:30:52 · `KF-W1` 17:32:20 · `KF-W9` 17:32:08 · `KF-W5` 17:32:57 · `KF-W7` 17:33:23 · `KF-W8` 17:34:06 · `KF-W10` 17:38:21 · `carry/KF-W6-CARRY.md` 10:49:45.

KF-W4 wrote **fifth** of eleven. W0, W3 and W6 had already reached their final bytes when it wrote; W1, W2, W5 and all four stage-2 waves had not.

### 2.1 What holds

| receipt | verification at the sibling's FINAL bytes | verdict |
|---|---|---|
| `KF-W6-CARRY.md` — **201 rows / 54 records** | `grep -cE '^- \*\*' KF-W6-CARRY.md` → **201**; the header's *"all 54 registry records … carrying a `KF.W6` routing"* at `:7`. File frozen at 10:49:45 as the spec says. | **EXACT** |
| `KF-W0 §Sequencing`, the OUTBOUND row **`the NO-WAVE-OWNER packets — the canonical 17`** | `grep -n 'the NO-WAVE-OWNER packets — the canonical 17' KF-W0.md` → **`:651`**, live, with the 17 members enumerated. The **anchor** (§-heading + row label) resolves. | **ANCHOR HOLDS** (but see D-2) |
| `KF-W6 §W6-C`'s *"R-6 MANIFEST RECEIPT (the KF.W4-PROSE limb intake)"* bullet | `grep -n 'R-6 MANIFEST RECEIPT' KF-W6.md` → **`:226`**, live, and it books the limbs id-for-id with *"the id-anchor stays at W4 (rows 29/30)"* — reciprocal at both ends. | **ANCHOR HOLDS** (but see D-6) |
| `KF-W2 §Excluded`, the sibling-packet row *"The cube · sequence · spring · dock-menu · CARD-UNIT packets"* | `grep -n` → **`:827`**, and `awk` confirms the enclosing heading is **`## §Excluded`**. It routes dock-menu to **KF.W11/W12/W13** per R-15, matching W4's claim. Anchor-only, no line number taken. | **HOLDS** — and this is a *same-stage forward* reference (W2 wrote 7th), handled correctly by anchor alone |
| `KF-W10 §6.D · SUCCESSOR-FORMATION REGISTER` | `grep -n '6\.D' KF-W10.md` → the section exists at **`:543`**, the KF.W12 row at **`:559`**, and `:553` names *"**KF-W4 §Sequencing, the R-15 homing block** — the minting authority"* with `grep -n 'MINTED here, declared' KF-W4.md` pasted at its own end. Cited by W4 with **no line number and no quoted prose**, per LAW C(3). | **EXEMPLARY — the model this axis wants** |
| `KF-W8 §Bounds`, the AnimationVisualizer rows (inside G-KFW4-11's `:79` disposal) | Anchor-only, stage-2 forward reference, correctly declared as such in-cell. Resolves at W8's final bytes (`:90`/`:91` carve rows + the AV rows added at R4-5(a)). | **HOLDS** |

### 2.2 What fails

Three receipts do not survive their siblings' final bytes. They are **D-2**, **D-3** and **D-6** below. Two of the three are about siblings that had **already written** when W4 wrote — the stale-stamp hazard LAW C(1) exists to kill, occurring where the law's letter was available and its purpose was not served. The third is a semantic characterization of a stage-2 sibling's gate, asserted with the words *"verified at both specs' bytes"*.

**Consequence for the round's close.** `PASS-4/CLOSE-CERT.md` §3 credits KF-W4 with *"2 same-round receipts | anchor-only; `MINTED here, declared` confirmed at `:256` | **0** fixed"*, and §9(6) certifies *"43 of 43 line-numbered cross-cites ride a strike marker, **zero are live**"*. The `:256` confirmation is **TRUE** (verified: line 256 is the KF.W13 bullet). But the enumeration is short: W4 carries at least **two further line-numbered sibling coordinates**, both dead at their targets' final bytes, and one of them (`KF-W0.md:588`) resolves **off-target to a different sentence** — the precise hazard the CLOSE-CERT itself found live at W2→W5 (R-2.4) and named as pass 5's residual class. **The reconcile instrument found the class at one seat and certified its absence at another.**

---

## §3 · AXIS 3 — M-25 DEPTH AND THE LAW-A CENSUSES, RE-RUN AT THE FRONTIER

### 3.1 The numeric arm: twenty-one commands re-executed

The §Bounds NUMERIC-ARM scope receipt claims *"every pasted command in this file was RE-RUN at this seat's write time."* This seat re-ran the substantive ones. **Nineteen reproduce to the digit:**

`git grep -n '@src/' origin/master -- demo/` → **9 lines = 7 import specifiers across 6 files + 2 prose** (`kf-engine.ts:5`, `useOrbitalInertia.ts:12`), each specifier at the line and module the gate names — **R4-2's headline cure reproduces exactly** · `_boundTimeline` → **3 hits, 1 file (`:5` docblock · `:54` declaration · `:82` write), none a read** · `git grep -n 'INERTIA_FACTOR' origin/master -- test/` → **9 lines**, declaration `:29` + the eight uses `:52 :58 :76 :99 :106 :123 :132 :138`, all in one file — **D-4's cure reproduces** · `OrbitalDrag.vue:56 … ?? 0.95` exact · `test/demo` **27** · `test/demo/instrument` **9** (roster member-for-member) · `scripts/gates/` **9** incl. `structure/index.mjs` + `agent-surface.mjs` · `types.ts` **4 files** incl. `demo/scenes/cube/orbital-drag/types.ts` · tracked SFCs **58** · `.vue` specifiers **62** in `demo/`, **0** in `test/` · `declare module "*.vue"` **1 declaration + 1 prose**, and `tsconfig.test.json`'s `"include": ["test/", "bench/", "demo/env.d.ts"]` verified with its `:12-15` comment byte-exact — **the shim census earns its keep exactly as the row claims** · `font-roles` **1** hit, `demo/DESIGN.md:28`, prose · `proof:idioms` **×3** at `design-idioms.css:3` · `:43` · **`layout.css:10`** · the eight citation targets **13·5·3·3·3·3·2·1 = 33 lines** and **19 distinct names**, matching R-7's partition **member-for-member** across cells (a) 17 / (b) `brittleness` / (c) `publish` — **the partition is TOTAL at the bytes** · `EditorShell.vue` `proof:` → **0** · whole-tree `proof:` **273 lines / 106 names** · `package.json:50-52` → the three runnable scripts · `TimingFunctionNames` **12 hits / 6 files**, every hit at its stated line including the published `index.ts:160` and the four demo widenings · `LIGHT_BARREL_MODULES` **24 entries** with **exactly five dead** (`physics/spring/duration` · `reseat` · `linear-stops` · `timing-function` · `orchestration/drag/drag-2d`), each with the live twin the row names · `seedFor`/`syncGap` absent from `useEasingDemo.ts` (**0**) and present at `EasingSidebar.vue:99`/`:132`, with `:255-257`'s `[0,0,1,1]` reset byte-exact · `sceneExposedApi.ts:33 isStarted?: boolean` · `load-engine.ts:65` the sole `Stylesheet` hit · R-4's three live sites (`DESIGN.md:251` · `EditorStartScreen.vue:15` · `layout.css:31`) all resolve with their subjects.

**The two exceptions are D-1 and D-9.** Both are figures printed beside a pasted command that the command does not produce — the class R4-10(1) named as the numeric arm's, in a round whose own receipt says the arm was swept over *every* pasted command.

### 3.2 The 9 → 12 supersession (row 29)

The spec supersedes the pass-4 register's reading of the `useKfPillTabs` symbol census from **9** to **12** and prints both. **The 12 reproduces at this seat**: `git grep -n '\buseKfPillTabs\b' origin/master -- demo/ test/ src/ scripts/` returns exactly the twelve lines the row enumerates, and each resolves as stated (definition `:37` · real-module importers `KfPillTabs.vue:43`/`:44` + call `:68` · shim body `composables/useKfPillTabs.ts:2`/`:4` · shim consumer `ChannelControls.vue:230` · spec `KfPillTabs.test.ts:26`/`:28`/`:62` + prose `:12`/`:20`). The consumer set = **{ `ChannelControls.vue:230` }**, one member, type-only, and the *"NOT at the `.vue`"* clause is confirmed by the graph (`:229` already imports the `.vue`, which publishes no `KfPillTabOption`). **The method now reproduces its own conclusion, which is what D-6 asked for.** Its arithmetic summary does not — D-7.

### 3.3 Depth, consumed by mechanism

Sampled hard against the banks and **sound**: row 1 carries kf-KeyboardShortcutsModal's **R-9 dissent against its own founding premise** and answers it rather than dropping it (bank verified at `kf-KeyboardShortcutsModal.md:45`, including the M5 staging carve-out quoted whole); row 1 carries KC-17's honest disclaimer (*"a right type would NOT have caught KC-1"*) and KC-13's ordering dissent; row 3 restores LP-7's rider identity at **all three** legs — verified at the bank, `kf-LayerConfigPanel.md:52` (*"mechanism PRE-BANKED ≡ kf-MatrixEditor K1 + keyframes' own FAM-03/MR4"*) and `:95`/`:126`, so **D-8 is cured and reproduces**; row 4 carries the kf-TimelineTrack merged group at its full five ids (`kf-TimelineTrack.md:59` verified) with both dispositions; row 29 carries kf-SpringTrace's KF.W4-PROSE bucket whole, all four items, D-1's `:48-49` sequencing rider included (`kf-SpringTrace.md:139` verified); row 27 refuses to claim banked `L-19`'s cure and lifts only the closing verdict's LAW; rows 30/31 preserve three KILLED sub-claims by name. The R-1 manifest is id-for-id and **reciprocal at W6's live `:226` bullet**.

**One depth finding: D-4.** A rider's provenance was restored this round (D-8); an identity's provenance was not (KF-ES-16's).

---

## §4 · AXIS 4 — GATES: BORN-RED WITH **REACHABLE** GREEN · LAW A · LAW B

### 4.1 Gate-by-gate

| gate | witness re-derives at `81a56990`? | GREEN reachable in-bounds? |
|---|---|---|
| G-KFW4-1 | ✓ — `vue-tsc` absent; `env.d.ts:3-7` standing; every day-one diagnostic's file/flag verified; **the ChromeDock rider count is now FIVE and the banked sentence is quoted entire** | ✓ — the NO-SILENT-DELETION falsifier has all four before-forms byte-exact, and the `env.d.ts` LAW A census now tells the executing seat which branch (narrow, not delete) the tree admits |
| G-KFW4-2 | ✓ (`ci.yml:53-55`; `vitest.config.ts:48-55`, no `plugins`; 27 tracked specs) | ✓ |
| G-KFW4-3 | ✓ (ME-29's keyless `v-for`; `lint = depcruise src`) | ✓ |
| **G-KFW4-11** | **✓ — the inventory is CURED and reproduces exactly (7 specifiers / 6 files / 2 prose)** | **✗ — see D-5: the command's oracle is not the falsifier's oracle** |
| G-KFW4-12 | ✓ (`monaco-themes` at `:92`; consumer set ∅ — the vendored-sibling trap correctly named) | ✓ |
| G-KFW4-4 | ✓ (every in-bounds K3 site verified by subject; the four `const props` in `…/timeline/` returned with the row's three among them, each at its stated line) | ✓ — L-7's cross-wave exception declared, not swept |
| G-KFW4-5 | ✓ (`registry.ts:36` docstring; `:43` fence; `easing-serialize.ts:69-73`) | ✓ — `test/compile/` is the tree's easing zone |
| G-KFW4-6 | ✓ (`leaves.ts:17-19` one sentence, both halves false; `:28` re-export exact) | ✓ |
| G-KFW4-7 | ✓ (`backward.ts:30/:32/:47`) | ✓ |
| G-KFW4-8 | ✓ (33 lines / 19 names verified; the `brittleness` carve declared by name; `publish` resolves to `package.json:51`) | ✓ — the partition is TOTAL at the bytes and `font-census` repoints at a gate this wave creates |
| G-KFW4-9 | ✓ in mechanism (`usability.mjs:239`; `orchestration-api.test.ts:142-148`; OD-29's two files named) | ✓ — row 68's arithmetic is now correct at **eight** uses |
| G-KFW4-10 | ✓ (`font-roles.json` `:16-26`/`:34-38`/`:68`/`:82`) | ✓ |
| G-KFW4-13 | ✓ (`types.ts:25/:27/:195`; the two prose phantoms path-qualified) | ✓ |
| G-KFW4-14 | ✓ | ✓ — **the round-3 cure HOLDS at the frontier for a second pass**: `seedFor` is declared at `EasingSidebar.vue:99` and reaches `bezierPresets` at `:112`, and exists at **no** coordinate in `useEasingDemo.ts` (`git grep -c` → 0). The falsifier is reachable. |

**13 of 14 re-derive with reachable GREEN. One — G-KFW4-11 — is convicted a second consecutive pass, at a different address inside the same gate.**

### 4.2 LAW A — the twelve-row access-column scope receipt, tested BY SCOPE

R4-10(1) replaced the enumeration source with the §Bounds access column. Tested as ordered — the column was re-read this seat and its delete / symbol-removal / repoint / shim-retirement / move rows enumerated:

| act | census present? | re-run at `81a56990` |
|---|---|---|
| `package.json` `−monaco-themes` | ✓ | **SOUND** — the only live source hits are the vendored sibling directory's two JSON imports; consumer set ∅ |
| `test/internal/leaves-parity.test.ts` delete | ✓ | **SOUND** — zero import specifiers; the phantom-path find (`test/leaves-parity.test.ts` vs the real `test/internal/…`) reproduces |
| `_boundTimeline` decision | ✓ | **SOUND** — 3 hits, one file, none a read; R-9's else-branch is the one the census selects |
| `font-roles.json` fold | ✓ | **SOUND** — one prose hit, no reader to strand |
| §Carry row 29's F-5 repoint | ✓ | **CONCLUSION SOUND; method now reproduces (§3.2); arithmetic short — D-7** |
| **`demo/env.d.ts` shim retirement** (new) | ✓ | **SOUND, and the strongest census in the file** — 62 specifiers / 58 SFCs, plus the `tsconfig.test.json` include that decides delete-vs-narrow *before* the field opens |
| **`.dependency-cruiser.cjs` repoint** (new) | ✓ | **SOUND at the finding (5 dead of 24), SHORT at the transcription — D-8** |
| **`load-engine.ts:65` symbol removal** (new) | ✓ | **SOUND** — one hit, the import itself, zero uses |
| **`easing-serialize.ts:71-73` retirement** (new) | ✓ | **SOUND at the mechanism (replacement, not removal), FALSE at the count — D-1** |
| **`constants/types.ts` union-member removals** (new) | ✓ | **SOUND** — 12 hits / 6 files, published surface named, every demo widening enumerated |
| **the K3 demo sites** (new) | ✓ | **SOUND** — per-site use counts 0/0/0 and the `Teleport` measurement-before-cure |
| the twelfth (`demo/**` type surface) | **deferred by construction, declared** | lawful — the census lands in `import-graph-census.md` before the first file opens, and its absence at that moment is a declared triumvirate trigger |

**Eleven censuses present, the twelfth declared. LAW A passes BY SCOPE** — the first round in which it does. The non-members are named too, which is what makes the enumeration falsifiable.

### 4.3 LAW B — the closure-claim ban

**Executed, without exception.** Every completeness sentence sampled — the AUDITED cell, the SPECIFIED cell, the carry-table preamble, the §Gates head, §Sequencing's eight-record enumeration and 17-packet homing, §Excluded's head, R-7's totality clause, the §Excluded load-bearing consequence, and the two SUBJECT-IDENTITY / carriage scope receipts — cites `PASS-4/KF-W4-CHECK.md` by repo path and date **and states what it found, its defects included**, and each carries the standing re-pointing instruction. **No completeness claim survives in spec voice. Zero LAW B defects.** The one second-order note from pass 4 stands: those citations now describe a superseded reading and should re-point to this register.

---

## §5 · AXIS 5 — POSTURE

| obligation | verdict |
|---|---|
| **W4 = head** | **HOLDS.** All eight enumerated records re-read; each states the sequencing claim (kf-CSSCodeEditor ×2 · kf-ChannelOptions `:150` *"the OPTIONS-UNIT may not open before it"* · kf-KeyframeCardList · kf-KeyframesEditor · kf-CubeAxisLines `:34`/`:53` · kf-LayerConfigPanel `:35` · kf-KeyframeTimeline · kf-TimelineHoverPreview). The kf-AmigaScene strike is correct — its 3 W4 bytes are C-19/K3 prose. |
| **W3 gated** | **HOLDS.** `KF-W3.md:1` = *"# KF.W3 — Parser Consumption (GATED, never scheduled)"*. R-2's terminus is condition-bound, not calendar-dated, and the KF.W3 cross-edge states the gating and names the deleting commit and its wave. |
| **O-21** | **HOLDS.** Named by id at OP-5 and at the KF.W1 cross-edge, consumed as a ROW under the `max+1` MINT LAW. Verified at the other end: `KF-W1.md:88` mints it (*"the measured ledger maximum **O-20** … +1"*), `:199` books it at C-10, `:331`/`:334` gate it at G-KF1-7 with the amended-by-O-21 pointer. The `O-20` corollary sentence is a property-statement, not a self-count. |
| **KF-AV-28** | **HOLDS with a declared split.** Carried as HOMING AUTHORITY, named beside every packet, binding hardest on the three W7-evaluated surfaces; the bank sites (`kf-AnimationVisualizer.md:35`, `kf-PlaybackRibbon.md:36`, `kf-SequenceScrubber.md:36`) all verified. |
| **the W11 / W12 / W13 disposition per RULINGS-4 R4-8** | **PRESENT AND COHERENT.** `KF-W4.md:256` carries arm (a) verbatim in substance: the three are **MINTED-UNAUTHORED**, cargo = the 17-packet partition **9 + 6 + 2** with its travelling locks, terminal disposition = a register row, authoring seat = **the SS-1/SS-2 authoring block — never this wave and never that close**. The register is cited by **stable anchor alone** (`KF-W10 §6.D · SUCCESSOR-FORMATION REGISTER`) with an explicit LAW C(3) declaration. Both ends agree: `KF-W10.md:553` names *"KF-W4 §Sequencing, the R-15 homing block — the minting authority"* and pastes `grep -n 'MINTED here, declared' KF-W4.md`, which resolves at `:256`. |
| **W10's greens conditioned on artifacts that EXIST** | **HOLDS.** §6.D exists (`KF-W10.md:543`) with the KF.W12 row at `:559`; G-2's union is re-cut to *"the union of AUTHORED X·KF wave bounds ∪ §6.D's cargo enumeration"* (`:240`/`:368`), R-A's VERIFIED stamp is scoped to the authored eleven (`:41`), and the R4-1 adoption is received (`:385`). Mechanism F's minted-wave roster sweep is declared at `:120`. **No W10 green rests on an unauthored spec.** |
| **W10 seam / doc-truth addenda** | **HOLDS.** W10 receives doc-truth addenda only; §Excluded 5 + the Do-NOT-touch line forbid the census from scanning `docs/tranches/**`. |
| **W8 plugin-vue reciprocity** | **HOLDS at the ACT, FAILS at the CHARACTERIZATION — D-3.** W8's final bytes independently declare the registration is W4's booked act (`:91`, `:325`, `:328`, `:408`) and that W4 lands first (`:32`), and W8's own round-4 mtime table (`:19`) records the W4 receipt VERIFIED at 16:59:44. The act is two-ended and sound. W4's *description* of W8's gate is not. |
| **AUDITED basis** | **CURED — 49, and it sums.** |

---

## §6 · DEFECT REGISTER (10)

### D-1 · MAJOR — the `easing-serialize.ts` LAW A census prints **16** in-source call sites over its own enumeration of **SEVENTEEN**

**Claim** (§Bounds, the `easing-serialize.ts` row, a census **written this round** under the access-column rule): *"(2) **consumer census of the containing function** … **called at 16 in-source sites** across `emit/densify.ts` `:56`/`:95` · `emit/entry.ts` `:290`/`:402`/`:418` · `emit/format/format.ts` `:93`/`:129`/`:190`/`:250`/`:268`/`:310` · `emit/format/options.ts` `:48`/`:103` · `emit/view-transition.ts` `:142`/`:258`/`:263`/`:270`"*, restated at the row's operative summary: *"**Consumer set = 16 call sites** + 2 published re-exports + 5 asserting specs."*

**Receipt.** The row's own enumeration is **2 + 3 + 6 + 2 + 4 = 17**. `git grep -n '\bserializeEasing\b' origin/master -- src/ demo/ test/ scripts/` returns **49 lines**, of which exactly those seventeen are calls (the remainder: the declaration `easing-serialize.ts:69`, five internal imports, the two published re-exports `emit/index.ts:50` + `compile/index.ts:52`, the test hits, and six prose comments). The seventeenth site is real and consequential — none of the four `view-transition.ts` calls or the six `format.ts` calls is optional.

**Why it matters.** This is D-4's exact class (*"its five uses"* against eight) one round after that cure, in a census this round authored, under a §Bounds scope receipt that asserts *"**every** pasted command in this file was RE-RUN at this seat's write time"* and that names the three figures that did not reproduce. Seventeen is not among them. R4-10(1)'s finding was that a sweep scoped to the rows a ruling named leaves the law green over its own counterexample; here the numeric arm was swept over the rows the ruling named (row 68, row 29) and not over the row this round wrote. **The largest-radius act in the wave is authorized on a consumer count one short of its own list.**

### D-2 · MAJOR — a cross-wave receipt dead **and off-target** at the sibling's final bytes: `KF-W0.md:588`

**Claim** (§Sequencing, the 17-packet homing block): *"⟨coordinate re-pointed at repair round 3 (re-anchor seat) … the artefact's reading `KF-W0.md:447` is dead at KF-W0's current bytes (a bare code fence) after that file's round-3 repair; **the roster line re-resolves at `:588`**, recorded parenthetically and non-load-bearing.⟩"*

**Receipt**, at `KF-W0.md`'s **final round-4 bytes** (16:58:59, 224,173 B — written **45 seconds before** KF-W4):
- `grep -n 'the NO-WAVE-OWNER packets — the canonical 17' KF-W0.md` → **`:651`**.
- `sed -n '588p' KF-W0.md` → *"The four banked-and-fold names, with their sites re-measured at `origin/master` this round, are retained as the fold's own receipts (they are the sweep's worked examples, no longer its denominator):"* — **a different sentence in a different section.**
- `KF-W0.md:69` records the coordinate from its own end as **`:651` at this writing, parenthetical and non-load-bearing** — W0 updated; W4 did not.

**Why it matters.** This is the CLOSE-CERT's own **R-2.4 off-target-resolution hazard** — *"a dead coordinate that still returns **a** row, and a different one … the exact failure mode the stable-anchor idiom exists to kill, found live"* — firing at the one wave the CLOSE-CERT's §3 table clears with *"anchor-only … 0 fixed"* and whose §9(6) certifies *"zero are live."* And it lands in **the very row whose own three retired spellings (`:276` → `:401` → neither) the spec cites four sentences earlier as proof that a line number is not a receipt** — presented this time not as retired but as the **live** re-resolution. The anchor beside it holds, so nothing load-bearing moves; what moved is the credibility of a certification that says the sweep reached here.

### D-3 · MAJOR — the → KF.W8 cross-edge misstates the sibling's gate on two counts, under *"verified at both specs' bytes"*

**Claim** (§Sequencing, the KF.W8 cross-edge): *"**W8's G10 is born RED solely on the absence of a `plugins` array in `vitest.config.ts`** (verified at both specs' bytes and at the frontier …), **with W8's G11/G12 gated on G10** — and this wave lands first by W8's own `Opens after` line."*

**Receipt**, at `KF-W8.md`'s final bytes (17:34:06):
- `KF-W8.md:325` — G10 GREEN has **two** legs: *"(a) W4's commit 2 landed … (b) **this wave's own residual act: `+@vue/test-utils` devDep — the ONE manifest change this wave needs**."*
- `:326` — *"leg (a) is **RED because W4 has not landed** … **Leg (b) is RED on this wave's own act**: `@vitejs/plugin-vue ^6.0.7` **is** already a devDependency … and **`@vue/test-utils` is absent** (`grep -c 'test-utils'` → 0) and is the one devDep this wave adds."* **"Solely" is false, and was false at round 3 when the sentence was written.**
- `grep -n 'gated on G10\|behind G10\|after G10\|G10 first' KF-W8.md` → **zero hits.** G11's RED is *"`groupedShortcuts` is locked inside `KeyboardShortcutsModal.vue:57`"*; G12's is *"`git grep -l "CSSPasteDialog\|KeyframesAddDialog" origin/master -- test` → 0"*. Neither is gated on G10 anywhere in the file.
- What **is** true: `:32` *"Opens after: … KF.W4 … W4 touches `vitest.config.ts`/`package.json` first"* ✓, and the registration boundary is two-ended and exact ✓.

**Why it matters.** LAW C(2) binds a quotation of a sibling spec to name its substrate because siblings move inside a round; LAW D binds a labelled verification to be produced by a command. This cell does neither and asserts both — a **semantic characterization** of a stage-2 sibling's gate topology, carrying the word *verified*, contradicted by that sibling at two independent points. The underlying dependency is sound; the sentence that describes it is a receipt the receipts do not reproduce, and W4's own words for that class are *"a gate that names a witness it cannot reach names no witness."*

### D-4 · MAJOR — D-5's double-booking cure was instance-scoped: `KF-ES-16` is booked at **three** rows, and its row-1 booking fails the cure's own predicate

**Claim.** Row 1's identity chain lists `≡ KF-ES-16 ≡ L-EST-16 ≡ L:D-2 …`, with the round-4 lock cell declaring *"`KF-ET-11` and `KF-ES-34` REMOVED from this chain at round 4 (D-5) — they remain booked at row 2, their banks' sole routing"*, on the reasoning *"Both route to **KF-CB-8**, which is **row 2's** head, not this row's — so listing them here was a second booking of one id under a different identity."*

**Receipt.** `grep -n 'KF-ES-16' KF-W4.md` → **five occurrences, three of them carry-table rows: `:163` (row 1) · `:166` (row 4) · `:187` (row 25).** Its bank, quoted by command — `sed -n '55p' kf-EasingScene.md` → *"**KF-ES-16 · C-7 — FOLD by reference to banked KF-CB-8 / KF-ET-11** (nothing type-checks .vue; CI runs `check:lib` only; `*.vue` declared `DefineComponent<{},{},any>`). Riders booked here: the 10-key `h(PlaybackRibbon, …)` bag is unchecked …; `sceneExposedApi.ts:33` declares `isStarted?: boolean` while the scene exposes a `Ref` …; L-m10's detector gap … → **KF.W4**."*

**KF-ES-16's own bank routes it to KF-CB-8 / KF-ET-11 — row 2's head — by the identical sentence-form the cure used to strike its two neighbours.** Rows 4 and 25 carry riders the bank itself books under KF-ES-16 (L-m10's detector gap; `sceneExposedApi.ts:33`), so those limb bookings are defensible under the split-per-limb idiom; **row 1's is the head identity**, and it is absent from row 2's chain (`KF-CB-8 ≡ KF-ET-11 ≡ KF-ES-34 ≡ KF-SST-37 ≡ L:D-15`) where the bank puts it.

**Why it matters.** R4-10(1) ruled, in this round, that *"a repair that cures the named instance and not the stated scope leaves the law green over its own counterexample"*, and D-5's cure ran over exactly the two ids RULINGS-4 §END named — leaving the third, three positions away in the same chain, sharing the same bank destination and the same *"nothing typechecks .vue"* mechanism. The file's own answer to this is written in the cure cell it stops one id short of: *"**a shared mechanism is not a shared identity**, and the bank's `→ FOLD to <id>` line is the identity authority, never the resemblance."* Carriage is unaffected (D-4 costs no escape); the discipline the file legislates four times is.

### D-5 · MAJOR — G-KFW4-11's **command** oracle is not its **falsifier's** oracle, and under the command the GREEN is still unreachable in-bounds

**Claim.** Command column: *"`npx depcruise --config .dependency-cruiser.cjs src demo` **exits 0** — literal, no placeholder."* Falsifier column: *"the set of `demo/ → @src/…` deep-import specifiers must equal the pinned **SEVEN-specifier / SIX-file** inventory … it fails on an addition **AND** on a silent removal … **This is what makes the gate's GREEN REACHABLE for the first time** … Pinned at seven, the gate **MEASURES**."*

**Receipt.** The inventory cure is real and reproduces exactly (§3.1). But the two columns state two different oracles, and the spec never reconciles them:
1. The seven live specifiers **are** the breach the row extends `depcruise` past `src/` in order to see (*"Config scoped to `src/` ⇒ blind to every `demo/ → @src/…` deep import"*). A rule that detects them at error severity makes `depcruise src demo` exit **non-zero**.
2. Their cure sites are **KF.W8's by this file's own §Excluded 4** (*"The deep-import cure sites and `convertPixelsToCh` — KF.W8. We detect; they decide."*), so no act inside §Bounds can remove them.
3. The only stated mechanism for a green exit over a known violation set is banned by the gate's own last sentence: *"**A `known-violations` file fails this gate by construction** — that is the allowlist decay the five dead LIGHT paths already demonstrate, in this very config."*

*"Satisfiable by DETECTION alone (mandatory)"* is an instruction to the executing seat, not an oracle; the gate never states the rule's severity, its `to`/`from` shape, or the artefact against which the equality is asserted at run time — `depcruise-inventory.json` is a §Artefacts deliverable, not a `depcruise` input.

**Why it matters.** §Gates opens by saying it convicts *"a gate whose GREEN cannot be reached inside its own bounds"*, and names G-KFW4-14 as the two-round instance. R4-2 cured the **denominator** of the second instance and left the **oracle** un-reconciled one column to the left. This is the third consecutive pass in which G-KFW4-11 is the file's convicted gate, at a third address inside itself.

### D-6 · MINOR — a second stale sibling coordinate, asserted as current: KF-W6's manifest receipt is at `:226`, not `:145-146`

**Claim** (R-1, the manifest's label-authority paragraph): *"the receiving row is **KF-W6 §W6-C's 'R-6 MANIFEST RECEIPT (the KF.W4-PROSE limb intake)' bullet** (the heading and the receipt's own title are the anchors; **it sat at `:145-146` at this writing**, non-load-bearing per R2-7)."*

**Receipt**, at `KF-W6.md`'s final bytes (16:59:25 — **19 seconds before** KF-W4's write): `grep -n 'R-6 MANIFEST RECEIPT' KF-W6.md` → **`:226`**. `sed -n '145p' KF-W6.md` → *"**(1) SPECIFIER SET = { `shell/index.ts:2` }** — exactly ONE live import, the barrel re-export …"*, i.e. **R4-1's EditorHeader census**, written this same round.

**Why it matters.** The anchor resolves and the receipt's substance is reciprocal at W6's live `:226`, so nothing load-bearing moves. But *"at this writing"* is a positive assertion about a sibling's bytes at **this seat's own clock**, and at that clock the sibling said something else. Two stale coordinates in one file, both against siblings that had already finished writing, is the LAW C(1) hazard surviving in the stage where its letter was easiest to obey.

### D-7 · MINOR — row 29's twelve-hit resolution summary sums to thirteen under its own parallel construction

**Claim.** *"**Resolution summary: 1 definition · 3 real-module hits + 1 call · 2 shim-body lines · 1 shim consumer · 2 real-module specifier lines + 1 call · 2 prose — twelve, none unresolved.**"*

**Receipt.** The second `X + 1 call` form is unambiguous: `:26` + `:28` specifier lines **plus** `:62`'s call = 3. Read the same way, the first form is `:43` + `:44` + one more hit **plus** `:68`'s call = 4, and the six cells sum to **13**. The row's actual enumeration above it is correct and complete at twelve (`:37` · `:43` · `:44` · `:68` · `:2` · `:4` · `:230` · `:26` · `:28` · `:62` · `:12` · `:20`), verified hit-for-hit at this seat.

**Why it matters.** LAW D(3) requires *"a count asserted over an enumeration … stated AT the enumeration with its counting rule."* The counting rule here is stated twice in one sentence in two incompatible ways, in the summary line whose entire purpose is to prove the census resolved every hit.

### D-8 · MINOR — the `.dependency-cruiser.cjs` "transcription" silently drops a method call from the config's own template literal

**Claim** (§Bounds, the `.dependency-cruiser.cjs` LAW A census): *"(2) **the resolution rule is the config's own**, `sed -n '84,86p'` → `const LIGHT_FROM = "^src/animation/(?:" + LIGHT_BARREL_MODULES.join("\|") + ")\\.ts$"` (**the config's own template literal, transcribed with its alternation escaped for this table**)."*

**Receipt.** `git show origin/master:.dependency-cruiser.cjs | sed -n '84,86p'` returns:
```
const LIGHT_FROM = `^src/animation/(?:${LIGHT_BARREL_MODULES.map((m) =>
    m.replace(/[-]/g, "\\$&"),
).join("|")})\\.ts$`;
```
The per-entry hyphen-escaping `.map((m) => m.replace(/[-]/g, "\\$&"))` is **absent from the transcription and undisclosed**. LAW D(1): *"Anything else is labelled a **paraphrase** with elisions marked by ellipsis and altered words disclosed."* One alteration is disclosed (the alternation escaping); this one is not.

**Why it matters.** The row's conclusion survives — each entry must resolve to an exact `.ts` file, and the finding reproduces exactly (**24 entries, five dead**: `physics/spring/duration` → `solver/duration.ts` · `reseat` → `solver/reseat.ts` · `linear-stops` → `css/linear-stops.ts` · `timing-function` → `css/timing-function.ts` · `orchestration/drag/drag-2d` → `drag/2d.ts`; nineteen live). But the elided `.map()` is precisely the transform that decides how each entry is matched, in a row whose whole argument is *"each entry must resolve to an exact `.ts` file, so a directory of the same name does not satisfy it."* A transcription that drops the matching rule cannot prove the matching rule.

### D-9 · MINOR — a quote coordinate pasted into a grep's output as if the grep produced it, in the row carrying the two-round CRITICAL's cure

**Claim** (§Bounds, the `EasingSidebar.vue` / `useEasingDemo.ts` re-filing row — R3-4.1's cure of the pass-3 CRITICAL): *"Pasted, this seat, at `origin/master 81a56990`: … `git grep -n 'seedFor\|syncGap' origin/master -- demo/` → `EasingSidebar.vue:99 const seedFor = …` · **`:112 if (name in bezierPresets) {`** · `:122` · `:132 const syncGap = …` · `:138` · `:162` · `:163`."*

**Receipt.** The command returns **SIX** lines, not seven: `:99` · `:122` · `:132` · `:138` · `:162` · `:163` (`git grep -n 'seedFor\|syncGap' origin/master -- demo/ | wc -l` → **6**). **`:112` is not in the output** — the line is `if (name in bezierPresets) {`, which contains neither symbol. It is `seedFor`'s `bezierPresets` reach, correctly stated as such at R-6 and at G-KFW4-14's cure-lock, and incorrectly seated inside this command's transcript.

**Why it matters.** This is verbatim the residual class `PASS-4/CLOSE-CERT.md §8(2)` handed forward — *"`:416`, a quote coordinate pasted into a grep's output as if the grep had produced it"* — reappearing at the wave whose row it lands in is the cure of the pass's two-round CRITICAL, inside the §Bounds scope receipt that certifies *"every pasted command in this file was RE-RUN at this seat's write time."* No anchor is wrong and the cure holds (§4.1); the transcript around it does not reproduce.

### D-10 · MINOR — the residue table routes the whole `KF-CO-33` id to KF.W12 while two of its citation limbs are cured here, and the split is declared only inside the gate

**Claim.** §Excluded item 21: *"banked id(s): kf-ChannelOptions **KF-CO-33** … the three `proof:bezier-*` names … **sole site `…/ChannelOptions.vue:168`** … **ROUTED TO: the OPTIONS-UNIT packet at KF.W12**."*

**Receipt.** `kf-ChannelOptions.md:207` banks **three** citation limbs under KF-CO-33: the `proof:bezier-*` trio **and** *"`design-idioms.css:3`'s `proof:idioms` authority claim … and `DESIGN.md:236`'s `proof:style-file-ceiling` behind the R3 rule this 609L file violates."* Both of the latter are **inside** the eight citation targets, **inside** §Bounds, and **inside** G-KFW4-8's own denominator — R-7 cell (a) books `idioms` ×3 (`design-idioms.css:3` · `:43` · `layout.css:10`) and `style-file-ceiling`, and G-KFW4-8's witness column names both, all verified at the frontier this seat.

The split *is* stated — but only in G-KFW4-8's witness column (*"**KF-CO-33's three `proof:bezier-*` LEAVE this column (D-6)**"*), never at the routing row, which routes the id whole.

**Why it matters.** The residue table is a routing authority (*"each line is a routing, not a drop"*), and an id routed whole out of a wave while two of its limbs are cured inside it is the mirror of the truncation class this program has convicted four times. The remedy is one clause at item 21, not a re-routing: the substance is right at both ends and only the routing row's scope is wrong.

---

## §7 · VERDICT

**DEFECTIVE — but the shape of the failure has changed, and the change is the finding.**

**Axis 1 holds outright and for the first time: 111 routed · 111 booked · 0 escaped.** The by-record denominator reproduces the pass-4 harvest exactly, `m-9` is booked with its banked sentence quoted entire, the AUDITED basis sums checkably at 49, and a per-id `grep` loop over all 111 returns no zero. **Axis 5 holds at every obligation**, each verified at the far end — W0's roster line, W6's manifest bullet, W2's §Excluded row, W1's O-21 mint, W8's registration boundary, and W10's §6.D register with the KF.W12 row present and the close's verbs scoped to the authored eleven. **LAW B is executed without exception**, and **LAW A now passes BY SCOPE** — eleven censuses in place against the access column's twelve rows, with the twelfth deferred by construction and declared, and with the column's non-members named so the enumeration can be proved wrong. Ten of the eleven censuses are sound at re-run. **Nineteen of twenty-one pasted commands reproduce to the digit**, including R4-2's headline seven-specifier inventory, which is exact.

**Two axes fail, and the same sentence explains both.**

**Axis 2** carries the pass's centre of gravity. The drift class the two-stage law was built to kill is **not dead at this wave**: `KF-W0.md:588` is stale *and off-target* — it returns a different sentence in a different section, the exact hazard the RECONCILE seat found live at W2→W5 and named as pass 5's residual class — and it sits in the one row whose own three retired coordinates the spec cites as proof that a line number is not a receipt. `KF-W6.md:145-146` is stale against a sibling that finished writing nineteen seconds earlier, under the words *"at this writing."* And the → KF.W8 cross-edge, labelled *"verified at both specs' bytes"*, misstates that sibling's gate on two independent counts a single `grep` at W8 refutes. **`PASS-4/CLOSE-CERT.md` certified this file swept, at two receipts, zero fixed.** The certification is not fraudulent — the anchors beside all three receipts resolve, and nothing load-bearing moved — but it is short, and a reconcile instrument that finds a class at one seat and certifies its absence at another has not yet closed the class it exists to close.

**Axis 4** is convicted for the third consecutive pass at the same gate. R4-2 did real work: the inventory is re-derived, the seven specifiers are exact at the frontier, the three phantom sites are disposed by name, and the artefact is propagated. What it did not reach is that **G-KFW4-11 states two oracles** — a `depcruise` exit code in its command and an equality census in its falsifier — and that under the first, the GREEN is still unreachable inside §Bounds, because the seven specifiers the gate now correctly counts are the seven whose cure sites this file assigns to KF.W8 and whose only lawful workaround it bans in its own last sentence.

**The pattern of this pass, stated as the file itself would state it.** Round 4 replaced the enumeration source of three sweeps with the scope rather than the example list, and it worked: LAW A reached eleven rows where a ruling had named five, and the census escaped nothing. The **numeric arm** was the one sweep whose new scope was declared and not executed — *"every pasted command in this file"* — and it is where three of this pass's ten defects live (**D-1**'s sixteen against seventeen, **D-9**'s seven-line transcript of a six-line command, **D-7**'s twelve that sums to thirteen), two of them inside censuses this round authored and one inside the cure of the pass whose CRITICAL it closed. And the **double-booking** cure (D-5) was executed over the two ids the ruling named and stopped one position short of the third, in the same chain, with the same bank destination — which is R4-10(1)'s own sentence, turned once more on the file that wrote it: *a repair that cures the named instance and not the stated scope leaves the law green over its own counterexample.*

**111 routed · 111 booked · 0 escaped · 10 defects (0 CRITICAL · 5 MAJOR · 5 MINOR).**

---

*PASS-5 KF-W4 check seat, 2026-08-28. Sole write = this file. Frontier of record: `origin/master 81a56990736ced5b5edde0b84c527680ac7689b1`; the sibling checkout's local `8281638c` and its dirty worktree are disqualified as witness substrate and were never read. Value-side siblings were read at the mtimes tabled in §2. No product byte was written, no spec was edited, and nothing here stamps any wave.*
