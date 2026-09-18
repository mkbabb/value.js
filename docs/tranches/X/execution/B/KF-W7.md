SERVED MODEL: claude-opus-5[1m]

# KF.W7 — Timeline Evaluate · EXECUTION RECORD (Track B)

Spec of record: `docs/tranches/X/keyframes/waves/KF-W7.md` (IMMUTABLE, E-3 — this file carries
every correction as a dated entry beside, never an edit of the spec).
Authority: the owner's 2026-09-17 begin-word (COHESION §0j, verbatim there); runbook §1.2 order,
§3.4 locks, §5 seat law. Orchestrator note for this wave: **G14 resolves against KF.W2's posture
registry**; the per-surface SWAP verdicts (KF-AV-28 rider) are recorded in THIS file for KF.W11–13.

---

## Open

**Date**: 2026-09-17 (seat 0, Track B, OPEN act). **Seat**: 0 (OPEN) — plan + baseline only; this
seat writes **no keyframes.js product byte** and stamps **no gate**.

### Substrate of record — RE-DERIVED AT OPEN, and it has MOVED

The spec pins *"keyframes.js `origin/master` `81a56990` **or later**"*. It is later, and the
divergence the spec's G12 witness describes is **gone**:

⟨cmd⟩ `git -C $PROG/keyframes.js rev-parse master origin/master` →
```
ae83da0764a77ebe176d6314b179cfa5b3dd287b
ae83da0764a77ebe176d6314b179cfa5b3dd287b
```
⟨cmd⟩ `git merge-base master origin/master` → `ae83da0764a77ebe176d6314b179cfa5b3dd287b`

**`master` ≡ `origin/master` ≡ `ae83da07`.** The spec's G12 witness recorded `8281638c` / `81a56990`
with merge-base `a59d3a22`; §B-12's reset (COHESION §0j.C **KF-OP1**) and the eight Track-B commits
since have collapsed the triple state. **Consequence carried forward**: the "local HEAD is
DISQUALIFIED as witness substrate" clause is **discharged by the bytes** — there is no second ref to
disqualify. G12's *assertion* is unaffected and still owed: the opening commit states the ref and
every line anchor re-resolves against it (D-19). Working tree at open: two untracked
`docs/tranches/V/coordination/VALUEJS-INBOUND-*` files (the 07-24 / 07-27 value.js letters, six
survivors of the §0m.0 absorption), nothing else — clean for product purposes.

Write authority: COHESION §0j.C **KF-WRITE (b)** — *"after §B-12, the sacred checkout on `master`
(= `origin/master`) is the execution substrate for KF.W2 · W4 · W5 · W6 · **W7** · W8 · W9 · W10"*,
every wave pushing `origin HEAD` at close, every kf commit carrying the session trailer.

### Preconditions

| # | condition | verified how | state at open |
|---|---|---|---|
| **LEDGER `opens after`** | **KF.W2 (posture registry)** | `LEDGER.md` Track-B row: KF.W2 = **CLOSED 2026-09-17** (honest-RED, CHECK 2 CONFORMANT-HONEST-RED). Artefact at the bytes: ⟨cmd⟩ `ls docs/tranches/X/keyframes/registries/` → `INGRESS-CENSUS.md  POSTURES.md` (56,657 B, 2026-09-17 21:57) | **MET** |
| **§Sequencing item 9** | KF.W2 publishes its posture registry **before** this wave decides G14 | KF.W2's own close record states it at `execution/B/KF-W2.md`: *"**KF.W7** (`opens after KF.W2 — posture registry`) — its conjunct is **GREEN**: `POSTURES.md` is published, single-sourced, 20 over 58-of-58 … **KF.W7 is NOT blocked by this wave.**"* | **MET** |
| **OP-0** | kf-AnimationControlsGroup **D-1** portal settlement | UNSETTLED at the bank, and the spec itself homes the **settlement** here (*"is this wave's intake, exactly as OP-1's `:key` row is"*); the **cure** is NO-WAVE-OWNER. COHESION carries **no** KF.W7 ruling — nothing is owner-gated away from this wave, and nothing is presumed. **Not an open-blocker; it is hard-ordering item 1 and belongs to `.a`'s sitting** | **INTAKE (not a blocker)** |
| **OP-1** | kf-ChannelControls **L-2/C-2** `:key` remount BLOCKER | Same shape: the spec resolves the second-order collision itself at KF-CE-2 (parent half), §Carry P8, and §Sequencing item 2 rules **arm-time id capture** the cure. The settlement is `.a`'s sitting; the ChannelControls cure is NO-WAVE-OWNER and out of §Bounds | **INTAKE (not a blocker)** |
| **OP-2** | KF.W4's vue-tsc gate + `noUnusedLocals` | **STATE CHANGE — the spec's `ABSENT` is dated history.** ⟨cmd⟩ `git show origin/master:package.json \| grep -n '"check"'` → `:37 "check": "vue-tsc --noEmit -p tsconfig.json && tsc --noEmit -p tsconfig.test.json && npm run proof:structure"` · `vue-tsc ^3.3.11` at `:118` · ⟨cmd⟩ `git show origin/master:tsconfig.json \| grep -n noUnusedLocals` → `:17 "noUnusedLocals": true,` | **SATISFIED** (was ABSENT) |
| **OP-3** | D-19 geometry re-derivation before any geometry cure | Standing act, owned by the P4 cure seat. The idiom carve is exact at the frontier: ⟨cmd⟩ `git show origin/master:demo/styles/design-idioms.css \| nl -ba \| sed -n '161,187p'` → the `.progress-rail` comment opens at **`:161`**, `.progress-ball` closes at **`:187`** — **carve extent unchanged** | **OPEN (in-wave act)** |
| **OP-4** | mount harness cost | ⟨cmd⟩ `git show origin/master:package.json \| grep -c 'test-utils'` → **0** (this wave's ONE manifest add stands) · `@vitejs/plugin-vue` at `:83` `^6.0.7`, installed (the struck add is still a no-op) · **the REGISTRATION LANDED**: ⟨cmd⟩ `git show origin/master:vitest.config.ts \| grep -n plugins` → `:16 plugins: [vue()],` — **KF.W4's commit 2 is in the tree**, so G11's inbound dependency-cite is DISCHARGED at the bytes and this wave still writes no `vitest.config.ts` byte | **DISCHARGED (inbound) · one add owed** |
| **OP-5** | KF.W2's parse façade as L-6/C-4's delegation target | value.js publishes `"./css"` (`package.json:30`) over `src/css/` (`index.ts`, `stylesheet.ts`, `syntax.ts`, `grammar.ts`, `timeline.ts`, `types.ts`, `named-colors.ts`); the sibling path honours the doctrine — ⟨cmd⟩ `git show origin/master:…/utils/timelineEngine.ts \| grep -n 'parseAnimationCSS\|serializeCssValue'` → `:11` import · `:79` use · `:17` import · `:88` use ⟨**anchor drift, D-19**: the spec cites `:13`/`:90`; the conclusion is unchanged — the doctrine is honoured on the sibling path, which is what makes the SFC's hand-rolled parser a BYPASS⟩ | **MET** |
| **OP-6** | the S-9 verdict sizes the roster | By construction; phases 2–4 dispatch only after phase 1 commits | **BY CONSTRUCTION** |

**No `blocked` condition.** Every "opens after" conjunct is met at the bytes AND in the ledger.

### Bounds re-measured at `ae83da07` — 17 of 18 EXACT, one DRIFTED

⟨cmd⟩ `git show origin/master:<f> | wc -l`, every §Bounds row:

| spec L | measured L | file |
|---|---|---|
| 312 | **312** | `…/timeline/KeyframeTimeline.vue` |
| 246 | **246** | `…/timeline/components/TimelineTrack.vue` |
| 70 | **70** | `…/timeline/TimelineCaret.vue` |
| **38** | **44** | `…/timeline/components/TimelineHoverPreview.vue` — **DRIFT +6** |
| 129 | **129** | `…/timeline/composables/useTimeline.ts` |
| 200 | **200** | `…/timeline/composables/useTimelineBuild.ts` |
| 88 | **88** | `…/timeline/composables/useTimelineOps.ts` |
| 110 | **110** | `…/timeline/composables/useZoomPan.ts` |
| 41 | **41** | `…/timeline/timelineTypes.ts` |
| 8 | **8** | `…/timeline/index.ts` |
| 102 | **102** | `…/timeline/utils/timelineEngine.ts` (the worktree-104 dirty edit is gone with §B-12) |
| 66 | **66** | `…/timeline/utils/snapshotCapture.ts` |
| 33 | **33** | `…/timeline/utils/flattenVars.ts` |
| 80 | **80** | `…/timeline/CSSPasteDialog.vue` |
| 161 | **161** | `…/keyframes/components/KeyframesAddDialog.vue` |
| 162 | **162** | `demo/scenes/sequence/SequenceScrubber.vue` |
| 256 | **256** | `demo/components/playback/AnimationVisualizer.vue` |
| 31 | **31** | `demo/utils/keyframeSelector.ts` |

**LAW A `flattenVars` census re-executed whole and it REPRODUCES** — ⟨cmd⟩
`git grep -n '\bflattenVars\b' origin/master -- demo/ test/ src/ scripts/` → **4 hits**:
`useTimelineBuild.ts:14` (import) · `useTimelineBuild.ts:170` (call, inside `loadPreset`) ·
`flattenVars.ts:10` (declaration) · `flattenVars.ts:26` (own recursion). **CONSUMER SET = exactly
ONE module**; L-13's *"sole consumer"* verifies at this frontier too.

**The shared directory is no longer NINE.** ⟨cmd⟩ `git ls-tree -r --name-only origin/master --
test/demo/instrument` → **TWELVE**: the nine the spec enumerates **plus** `aurora-opacity-ceiling.test.ts`
and `typing-dots-engine-seam.test.ts` (KF.W4's two creates) **plus** `highlight-css-roundtrip.test.ts`
(KF.W5's one create). **The four-party declaration held**: every predicted filename landed, and **none
of this wave's four fixture filenames collides with any of the twelve**. Read-only-witness law widens
with the set — this wave's seats edit **none of the twelve**, `timeline-undo.test.ts` and
`resize-tracks.test.ts` chief among them, and §Bounds' invariant now binds at the edited bytes:
KF.W4 and KF.W5 **have** landed first, so G11's *"exercises the same state WITHOUT the surface"*
contrast is re-executed at `ae83da07` before the gate is read (recorded here as its ref).

### E13 Step-0 — the four-path mail sweep

Swept read-only at this seat's own clock (**23:58 EDT**), compared against **every row** of
`docs/tranches/V/coordination/INBOX.md`, classification taken from each row's **status cell**, never
from a bare `grep -i unread` (X.P.W0 CHECK 1 **D-1**); `INBOX.md` **self-excluded** (SELF-COUNT law).

**BK re-confirmed the newest glass tranche dir** — ⟨cmd⟩ `ls -dlt ../glass-ui/docs/tranches/*/ | head -3`
→ `BK` (Sep 17 20:15) · `BJ` (Aug 3) · `BI` (Jul 28); ⟨cmd⟩ `ls -d …/tranches/*/ | wc -l` → **45**,
`BK` the maximum by both name and mtime.

Delta taken against **23:33 EDT**, the clock of the foot sweep line in `INBOX.md` (X.P.W2 RELAUNCH):
⟨cmd⟩ `/usr/bin/find <each of the four paths> -maxdepth 1 -name '*.md' -newermt '2026-09-17 23:33'`
→ **`value.js/docs/tranches/V/coordination/INBOX.md` alone** (self-excluded); **nothing on the other
four paths**. A full basename-vs-INBOX comparison over all five surfaces was also run; every
unmatched name resolves to the standing classification the KF.W5-open sweep recorded — the
`docs/tranches/V/` root files are **authority documents, not mail**, the four
`value-inbox-2026-07-20-*.md` and the atlas P-lane / kf-inbound files are **not value.js-addressed**
or are already dispositioned.

**Result: 0 unrowed · 0 new `I-n` minted · 0 UNREAD in KF.W7's scope.** The three live UNREAD status
cells — **I-32** (`glass-outbound-2026-09-17-valuejs-o20-disposition.md`), **I-33**
(`…-constellation-o20-relay.md`), **I-34** (`…-bbnf-lang-9.0.0-addendum.md`) — reproduce and **all
three route to X-W0.j**, exactly as KF.W2's CHECK 2 found; not one names a keyframes timeline byte.
**E13 is MET by routing**, not by silence. No sweep line was appended to `INBOX.md`: this sweep added
no row and minted no `I-n`, and the ledger is edited only when it has something to carry.

---

## Baseline — the born-RED gate table, banked READ-ONLY at `ae83da07`

Every command below was run **read-only** by this seat at the settled bytes and **double-run**
(identical output both times). No gate is stamped. Fifteen gates, **fifteen RED**.

| gate | BEFORE verdict | the measured witness |
|---|---|---|
| **G1** verdict table exists | **RED** | `wc -l …/glass-ui/dist/components/timeline/index.d.ts` → **2**; `ls` that dir → **nine** files, one re-exported (`GlassTimeline.vue.d.ts`) against **seven** shipped-but-not-re-exported (`ContinuousMarkers` · `ContinuousRail` · `ContinuousTimeline` · `ScrubberTimeline` · `SegmentedTimeline` · `geometry.d.ts` · `types.d.ts`); `grep -n SliderVariant …/slider/types.d.ts` → `:4 export type SliderVariant = "standard" \| "spectrum";` — **no "timeline" member**; demo imports of `/timeline` → **0**. **No table exists.** |
| **G2** scrub seam wired/guarded/single-engine | **RED** | `git show origin/master:…/KeyframeTimeline.vue \| grep -n scrub` → `:78 :scrub-t="scrubT"` · `:83 @update:scrub-t="(t) => (scrubT = t)"` · `:197 scrubT,` · `:202 scrubAndCapture,` · `:224 await scrubAndCapture(…)` — **the bare `scrub` symbol among NONE of them**; `grep -c "isPrimary\|pointerType" …/TimelineTrack.vue` → **0**; `timelineEngine.ts:49-51` still builds the second engine from spread targets |
| **G3** a grab is not a teleport | **RED** | `TimelineTrack.vue:192-196` — `onMarkerPointerDown` emits `select`, latches the id, captures the pointer, **records no offset**; `:174-178` — first `pointermove` emits `getPercentFromPointer(event)`, the **absolute** pointer percent |
| **G4** rebuild bounded + dirty-checked | **RED** | `useTimelineOps.ts:56-62` — `moveKeyframe` clamps and calls `rebuild()` **unconditionally, no early-out** on zero clamped delta |
| **G5** UI and artifact agree on count | **RED** | `timelineEngine.ts` `nl -ba` → merge loop **`:37-47`**, keying **`:38`** `selectorText(kf.selector)`, merge-admitting comment **`:40`**, property loop `:42`, build `:49-51`, `anim.name` `:52`, export **`:60-70`** inheriting the merge at `:66`. **Every round-3 re-derivation reproduces line-for-line at `ae83da07`** |
| **G6** round-trip preserves authorship | **RED** | all four leaves re-derived path-qualified: `importCSSToTimeline` declared `…/utils/timelineEngine.ts:76`, imported `useTimelineBuild.ts:12`, awaited **`:146`** ⟨spec says `:146` — exact⟩ · `TimelineKeyframe.easing?` declared `timelineTypes.ts:10`, never written/read · `state.value.keyframes = imported` at **`useTimelineBuild.ts:152`** ⟨the PASS-6 D7 path qualification verifies⟩ · `captureSnapshot` declared `…/utils/snapshotCapture.ts:8`, called `useTimelineOps.ts:29` |
| **G7** a read gesture writes nothing | **RED** | `TimelineCaret.vue:22 @blur="commitEdit"` — **the sole commit channel, no compare** |
| **G8** keyboard parity, non-destructive | **RED** | `TimelineTrack.vue:203-214` — `onMarkerKeydown` handles Arrow/Home/End only, emits `select` + `moveKeyframe`; **Enter/Space fall through `if (next === null) return;`**; no keyboard zoom/pan route |
| **G9** the tooltip announces what it shows | **RED** | reka `TooltipContentImpl.js:87 const ariaLabel = computed(() => props.ariaLabel \|\| currentElement.value?.textContent);` — exact; `TimelineTrack.vue:86-90` mounts `<TooltipContent side="top" :side-offset="8" class="p-2 max-w-56">` with **no `:aria-label`**; `data-register` targeting rules in demo styles → **0** CSS rules (5 attribute occurrences, none a selector), glass dist CSS → **0** |
| **G10** no thumbnail outlives its keyframe | **RED** | `previewCache` declared `KeyframeTimeline.vue:217`, passed `:81`, read `:221`, written `:226` — **exact**; `git show origin/master:…/KeyframeTimeline.vue \| grep -c delete` → **0**. Nothing evicts |
| **G11** the cluster is mounted by a test at all | **RED** | **leg (i), the claim** — `git grep -n "TimelineHoverPreview\|previewCache\|SequenceScrubber" origin/master -- test/` → **0 hits**. **leg (ii), enumeration only** → **14 hits, not 13**: the spec's 13 render sites **plus `TimelineHoverPreview.vue:35`**, a comment naming `previewCache` inside the +6 lines the file grew. All fourteen are render/comment sites, expected and lawful. `grep -c test-utils package.json` → **0** |
| **G12** the spec names its ref | **RED until stamped** | `master` ≡ `origin/master` ≡ **`ae83da07`** (above). The opening commit is owed |
| **G13** the wheel does not eat the page | **RED** | `TimelineTrack.vue:31 @wheel.prevent="onWheel"`; `touch-none` in the `:24` class string; `useZoomPan.ts:50` and `:59` read **`deltaY` only** — `grep -n deltaX` → **0 hits** |
| **G14** ONE failure posture | **RED (six divergent postures)** | `useTimelineBuild.ts:47-50` — `catch (e) { console.error(…); animation.value = null; }`, **the sole non-toasting failure**, against toasts at **`:121 :133 :137 :148 :155 :157`** (six lines, exact). Caret L-15 silent swallow stands |
| **G15** one dialog shell, or the divergence ruled | **RED** | `wc -l` → CSSPasteDialog **80** / KeyframesAddDialog **161**; `initialText` → **four** in-file hits (`:49` declared · `:53` defaulted · `:59` `ref(props.initialText)` · `:67` re-read) and **dead AT THE MOUNT**: `KeyframeTimeline.vue:135` and `:145` are both `<CSSPasteDialog>` and **`:initial-text` appears at neither**; N-2's two occurrences take two commands — `grep -rn '\.label' …/timeline/` → **1** (`KeyframeTimeline.vue:106`), `grep -n label …/timelineTypes.ts` → **`:11 label?: string`** |

### GREEN-BEFORE-CURE (R.2)

**NONE.** All fifteen gates are RED at the baseline, each for the reason the spec predicted. The
spec's born-RED claim survives a frontier that moved by eight commits.

### Findings at open — five, each a state change the spec could not have known

1. **OP-2 is SATISFIED, not ABSENT.** KF.W4 landed `vue-tsc --noEmit -p tsconfig.json` in `check`
   and `noUnusedLocals: true` in `tsconfig.json`. **Every typed cure in this wave is now
   VERIFIABLE**, which the spec explicitly said it would not be. The consequence is a *tightening*:
   `.d`/`.e` run `npm run check` and a RED there is theirs, not deferred.
2. **OP-4's inbound act has LANDED.** `vitest.config.ts:16 plugins: [vue()]` — KF.W4's commit 2. G11
   is runnable the moment the one devDep lands. **This wave still writes no `vitest.config.ts` byte.**
3. **The G12 triple state collapsed.** `master` ≡ `origin/master`; the DISQUALIFIED-HEAD clause has
   no referent. G12's assertion (state the ref, re-resolve every anchor) is unchanged and owed.
4. **`TimelineHoverPreview.vue` is 44 L, not 38** (+6), and G11's enumeration leg is **14, not 13**,
   by exactly that file's new comment. Neither moves a verdict; both are D-19 re-derivations and are
   banked here so no seat reads a stale number as a receipt.
5. **`test/demo/instrument/` holds TWELVE tracked files, not nine** — KF.W4's two and KF.W5's one
   landed as the four-party table predicted, with **zero filename collisions** against this wave's
   four fixtures. The read-only-witness set widens to twelve for every seat of this wave.

### Double-run block (WRITE-THEN-MEASURE)

Every count published above was read from the settled bytes and re-run: bounds counts (18 rows),
`flattenVars` census (4), `git ls-tree` instrument (12), G11 legs (0 / 14), toast lines (6),
`initialText` (4), `delete` in KeyframeTimeline (0), `deltaX` in useZoomPan (0), `SliderVariant`
members (2). **Identical on both runs.**

---

## Unit plan

**Six units, the spec's own execution shape** (§State line 19: *"6 seats across 4 sequential phases
— phase 1: 1 serial (the S-9 evaluate seat; its verdict sizes the rest); phase 2: 2 parallel (seam
design ∥ preview/ghost design); phase 3: 2 parallel (implementation, disjoint by file); phase 4: 1
serial (close + BH relay). Peak concurrency 2"*). Ids `X.KF.W7.<x>`. §Disjointness names `.d` and
`.e` by letter and by file, which fixes the alphabet: `.a`=phase 1, `.b`∥`.c`=phase 2,
`.d`∥`.e`=phase 3, `.f`=phase 4. Concurrency **2**, the spec's own peak, inside the owner's
four-workflow cap. **No two concurrent units share a modify path.**

**Model tiering (M-12 TRI-FOLD, runbook §5.1)**: the spec names **design-author seats** at phase 2
(*"seam design"*, *"preview/ghost design"*) — those two are **Fable**. Every other seat is a census /
gate-run / single-file-cure / verify-only seat → **Opus solo**. Receipts every seat: line 1 =
`SERVED MODEL: <id>`.

| group | units | why this grouping |
|---|---|---|
| 1 | `.a` | **OP-6 + §Sequencing 3/4**: G12 pins the ref, the ONE devDep lands, OP-0/OP-1 settle, and **G1's verdict table precedes every verdict-gated row**. Nothing runs beside it — the verdict sizes the rest of the wave |
| 2 | `.b` ∥ `.c` | `.b` writes the shared/serial engine files + the ONE scrub-seam commit family; `.c` writes **value.js docs only, zero keyframes bytes**. Disjoint by repo surface, and `.b` is the §Disjointness *"`timelineEngine.ts` and `timelineTypes.ts` are shared and therefore SERIAL … lands before either seat dispatches"* act |
| 3 | `.d` ∥ `.e` | §Disjointness' own file split, verbatim. `.d` = TimelineTrack + TimelineCaret + useZoomPan + useTimelineOps (+ the verdict-gated idiom/retint family, disjoint from `.e`'s set); `.e` = KeyframeTimeline + TimelineHoverPreview + useTimelineBuild + snapshotCapture + both dialogs. **Zero shared modify paths** |
| 4 | `.f` | Close + the BH relay + the SWAP-discharge receipts in KF.W10's terminal alphabet. Verify-only over the wave's own bytes |

### `.a` — Phase 1, THE S-9 EVALUATE (serial, alone)

- **Model**: opus.
- **Sections**: §0 OP-0 (`:27`) · OP-1 (`:28`) · OP-4 (`:31`) · OP-6 (`:33`) · §Verdict Protocol
  (`:90-103`) · §Carry **P0** (`:118-126`) · §Gates **G1** (`:261-263`), **G12** (`:309-311`) ·
  §Sequencing hard order 1–4 (`:330-333`) · §Excluded (`:369-382`) for the discharge discipline.
- **Writable**: kf `package.json` (**modify-carve — ONE line, `+@vue/test-utils` in
  `devDependencies`; no script, no exports/sideEffects key, no other dependency line**) · vjs
  `docs/tranches/X/keyframes/evidence/W7/**` · vjs `docs/tranches/X/execution/B/KF-W7.md`.
- **Gates**: G12 (stamp at the opening commit) · G1.
- **Locks**: **no CURE COMMIT precedes G12's opening commit** (§Sequencing 3); **G1's verdict table
  precedes every verdict-gated row** (item 4); the `+@vue/test-utils` add is **idempotent and
  single-instance** (KF.W8 is the other claimant — first lander writes, second consumes); **C-15 is
  the evaluation INPUT and is never re-derived** (killed-claim #15); the **PR-CAUTION**
  counter-evidence lock is weighed before any SWAP verdict; every SWAP-discharged row is written in
  KF.W10's terminal alphabet **verbatim** — `` DISCHARGED by KF.W7 SWAP verdict <surface>, <date> ``
  — or it is not discharged at all (R3-10.3).
- **Brief**: (1) commit the G12 ref-pin opening act: state `ae83da07`, mark composable/engine
  anchors origin-side, bank the D-19 re-resolution of every §Bounds anchor (this record's Baseline
  is the input, not a substitute). (2) Land the ONE `package.json` devDep line. (3) Settle **OP-0**
  (portal: keep or replace, carrying cube 3 · amiga 3 · spring 2 under one `superKey`) and **OP-1**
  (`:key` remount — arm-time id capture is the ruled cure, §Sequencing 2) as **design rulings in
  writing**; both cures are NO-WAVE-OWNER and out of §Bounds. (4) Author the **§Verdict table**: all
  six surfaces ruled ADOPT · PARTIAL · KEEP-BESPOKE with named reason **against the importable
  surface only**, weighing PR-CAUTION; name every SWAP-discharged row in W10's alphabet; state the
  D-1/C-1 dissent trigger and the M-3/C-4 inverse trigger. Export gaps → `.f`'s BH relay, never a
  demo-side hack.

### `.b` — Phase 2, THE SEAM (Fable; serial over the shared files)

- **Model**: fable (the spec's *"seam design"* seat).
- **Sections**: §Carry **P1** (`:128-141`) · **P2** (`:142-148`) · **P3** (`:149-156`) · §Gates
  **G2** (`:265-267`), **G3** (`:269-271`), **G4** (`:273-275`), **G5** (`:277-279`), **G13**
  (`:313-315`) · §Bounds' disjointness paragraph (`:84`) · §Sequencing 5 (`:334`).
- **Writable**: kf `demo/components/instrument/timeline/utils/timelineEngine.ts` · kf
  `…/timeline/timelineTypes.ts` · kf `demo/utils/keyframeSelector.ts` · kf
  `…/timeline/KeyframeTimeline.vue` · kf `…/timeline/components/TimelineTrack.vue` (**both only
  inside the ONE seam commit family; `.d`/`.e` do not dispatch until this seat's commits land**) ·
  vjs `docs/tranches/X/keyframes/evidence/W7/**` · vjs `docs/tranches/X/execution/B/KF-W7.md`.
- **Gates**: G2 · G5 (and the design that G3 · G4 · G13 are implemented against by `.d`).
- **Locks**: **N-10 — the scrub seam is ONE design problem and ONE commit family**; any row curing
  one of {C-1, C-6, L-3, L-5, M-3/C-4} in isolation is defective by that law. **The pointer-guard
  commit precedes or ships with the seam commit** (§Sequencing 5). **G2's AnimationControlsGroup arm
  is CONDITIONED on `.a`'s OP-0 settlement** — no cure routed through that component lands before
  the ruling. **LP-1**: no write→render edge. **G5's three are one commit, serial on the shared
  files.** `timelineEngine.ts`/`timelineTypes.ts` are written **here and nowhere else in this wave**.
- **Brief**: design the seam once, then land it once. (1) Rule the scrub seam **LIVE or
  DISPLAY-ONLY** on `.a`'s verdict, in writing. (2) If LIVE: wire it guarded (non-primary pointerdown
  ⇒ no scrub; pinch ⇒ no scrub) and **single-engine** — the driven engine provably not the scene's
  second instance — in ONE commit with the pointer guard. (3) G5's collision decision: the merge at
  `timelineEngine.ts:37-47` and the two render loops cannot disagree — minimum separation OR
  coalesced-and-said-so, written into both shared files in ONE act. (4) Publish the grab-offset
  (`grabDx` + L-m-14), rebuild-economics and wheel-policy designs `.d` implements. **A wave that
  wires `scrub` into the drag and calls it done has failed the goal criterion** (N-10's convicted
  regression).

### `.c` — Phase 2, PREVIEW / GHOST / POSTURE / FOLD DESIGN (Fable; documents only)

- **Model**: fable (the spec's *"preview/ghost design"* seat).
- **Sections**: §Carry **P7** (`:198-219`) · **P8** (`:220-237`) · §Gates **G9** (`:293-295`),
  **G10** (`:297-299`), **G14** (`:317-319`), **G15** (`:321-323`) · §Sequencing 7 (`:336`) ·
  §Excluded's KAD-15/16/20 bullet (`:371`).
- **Writable**: vjs `docs/tranches/X/keyframes/evidence/W7/**` · vjs
  `docs/tranches/X/execution/B/KF-W7.md`. **Zero keyframes.js bytes, zero registry bytes** — this
  seat runs concurrently with `.b` precisely because it writes no product file.
- **Gates**: G14 (the ruling) · G15 (the ruling); the designs G9 · G10 are implemented against.
- **Locks**: **G14 resolves against KF.W2's posture registry** (`docs/tranches/X/keyframes/registries/POSTURES.md`,
  §Sequencing 9 — the registry PRECEDES this ruling, and the ruling does not make the registry wait);
  the posture ruling is **ONE ruling for cluster + dialogs**. **G15's discharge discipline names
  KAD-15 · KAD-16 · KAD-20 by id** before any cure is spent — the fold direction R-7 pins inherits a
  bare footer if KF.W6's swap discharges them, and the seat says which. **N-2 is ruled wire-or-delete
  HERE, before KF.W6 opens D-9.** The ghost redesign is one commit family (D-7 + MISSED-4 +
  GHOST-PLATE + L-D8/C-4(a) + L-D4/C-4(b)), with m-7/m-8's validation half sequenced **after**
  L-6/C-4's delegation. **MISSED-3's same-commit box law** binds any type-rung move.
- **Brief**: author, in the record, the four rulings `.e` executes: (1) the **failure posture** — one
  declared posture across cluster + dialogs, read out of `POSTURES.md` and cross-referenced both ends,
  replacing the six divergent postures the baseline measured. (2) The **dialog fold** — fold onto the
  80-line CSSPasteDialog shell under the pinned constraints, or decline with L-4's falsifier answered
  in writing; every dialog-residue row's disposition stated first; N-2 ruled. (3) The **ghost/cache
  design** — eviction on edit, terminal `v-else`, reserved box, decomposed transform on a wrapper,
  a failing capture that stops and says so. (4) The **a11y description design** — derived alt,
  punctuated at row boundaries, re-derived on the ghost→image swap, not force-uppercased; producer
  seams (TooltipContent) go to `.f`'s relay, never a local patch.

### `.d` — Phase 3, TRACK · CARET · ZOOM/PAN · THE IDIOM (implementation)

- **Model**: opus.
- **Sections**: §Carry **P3** (`:149-156`) · **P4** (`:157-170`) · **P5** (`:171-181`) · **P6**
  (`:182-197`) · the P0 **KF-AV-10** row (`:122`) · §Gates **G3** · **G4** · **G7** · **G8** ·
  **G13** · **G11** (its two fixtures) · §Bounds' idiom carve rows (`:67-69`).
- **Writable**: kf `…/timeline/components/TimelineTrack.vue` · kf `…/timeline/TimelineCaret.vue` ·
  kf `…/timeline/composables/useZoomPan.ts` · kf `…/timeline/composables/useTimelineOps.ts` · kf
  `test/demo/instrument/timeline-mount-projection.test.ts` (**create**) · kf
  `test/demo/instrument/timeline-mount-keyboard.test.ts` (**create**) · kf
  `demo/styles/design-idioms.css` (**`:161-187` only**) · kf `demo/scenes/spring/SpringTarget.vue`
  (`:113` + the `.spring-ball`/`.preset-ball` anchor sites) · kf
  `demo/scenes/spring/SpringPhysicsFacet.vue` (the `.sampler-ball`/`.derby-lane-ball` sites) · kf
  `demo/scenes/sequence/SequenceTarget.vue` (**`:80` only**) · kf
  `demo/components/playback/AnimationVisualizer.vue` · vjs
  `docs/tranches/X/keyframes/evidence/W7/**` · vjs `docs/tranches/X/execution/B/KF-W7.md`.
- **Gates**: G3 · G4 · G7 · G8 · G13 · G11 (fixtures 1 and 2).
- **Locks**: **its two fixtures land BEFORE its first cure commit** (§Sequencing 3's commit scope);
  **the wheel policy is G13's four in ONE commit**; **grabDx + L-m-14 do not split**; **D-19
  geometry re-derivation precedes every P4 cure** (OP-3 — both stale tables, padding-box, one
  correction family with RR-B missed-5 and C-9 (TimelineCaret)); the **KF-AV-10 idiom family is
  VERDICT-GATED** — no byte before `.a`'s G1 ruling, and if G1 rules KEEP-BESPOKE on that surface the
  carves are SPENT-UNUSED and close with the wave; **kf-EasingTarget P-2's cure caution** (the idiom
  leaves `transform` unclaimed BY DESIGN) binds any ball consolidation; the twelve tracked
  `test/demo/instrument/` files are **READ-ONLY** and no gate is greened by editing one.
- **Brief**: implement `.b`'s and `.c`'s published designs on this seat's four cluster files, in this
  order: fixtures first, then (1) **G3** grab offset — first `pointermove` emits the pre-grab percent,
  `useRefHistory` banks zero for the grab alone; (2) **G4** rebuild rate — ≤1 build per animation
  frame across a 60-move drag, **zero** on a zero-clamped-delta hold; (3) **G7** compare-before-commit
  at the caret, display returning at MODEL precision, zero undo entries on a blur-without-typing;
  (4) **G8** a keyboard route for every pointer verb, no inspection keystroke mutating the document,
  keyboard `snapshot()` at the user's position, Enter/Escape exiting without stranding focus on
  `<body>`; (5) **G13** prevent only on consumed events, shift-wheel panning on the delivered axis,
  the pan readout operable, the open caret editor wheel-shielded by an explicit is-editing guard.
  Then, **only if the verdict admits it**, the KF-AV-10 retint/idiom adoption at its named carves.
  Re-run `npm run check` (vue-tsc is live now) before each commit.

### `.e` — Phase 3, TIMELINE HEAD · PREVIEW · BUILD · DIALOGS (implementation)

- **Model**: opus.
- **Sections**: §Carry **P5** (`:171-181`) · **P7** (`:198-219`) · **P8** (`:220-237`) · **P9**
  (`:238-248`) · §Gates **G6** · **G9** · **G10** · **G15** (implementation) · **G11** (its two
  fixtures) · §Bounds' `flattenVars` LAW A census (`:55`).
- **Writable**: kf `…/timeline/KeyframeTimeline.vue` · kf
  `…/timeline/components/TimelineHoverPreview.vue` · kf `…/timeline/composables/useTimelineBuild.ts` ·
  kf `…/timeline/composables/useTimeline.ts` · kf `…/timeline/utils/snapshotCapture.ts` · kf
  `…/timeline/utils/flattenVars.ts` (**delete-candidate**) · kf `…/timeline/index.ts` · kf
  `…/timeline/CSSPasteDialog.vue` · kf
  `demo/components/instrument/keyframes/components/KeyframesAddDialog.vue` · kf
  `demo/scenes/sequence/SequenceScrubber.vue` · kf
  `test/demo/instrument/timeline-hover-preview.test.ts` (**create**) · kf
  `test/demo/instrument/sequence-scrubber-mount.test.ts` (**create**) · vjs
  `docs/tranches/X/keyframes/evidence/W7/**` · vjs `docs/tranches/X/execution/B/KF-W7.md`.
- **Gates**: G6 · G9 · G10 · G15 · G11 (fixtures 3 and 4).
- **Locks**: **its two fixtures land BEFORE its first cure commit**; **the round-trip commit is one
  family** (N-8 + N-9 + C-5 (THP) + R-3 under G6); **the ghost redesign is one family** (D-7 +
  MISSED-4 + GHOST-PLATE + L-D8/C-4(a) + L-D4/C-4(b)), m-7/m-8's validation half **after** L-6/C-4's
  delegation; **the a11y commit is one family** (MISSED-1 + D-10 (KeyframeTimeline) + M7 + RR-A
  missed-1); **MISSED-3's same-commit box law** — no `text-mono-small` swap without the box resize in
  the same commit, no `normal-case` without `tracking-normal`; **L-13's adopt-or-delete disposes
  `loadPreset`'s re-exported surface (`useTimeline.ts:44`/`:121`) in the SAME act** — a lone
  `flattenVars.ts` delete leaves `loadPreset` uncompilable; **L-6/C-4 DELEGATES to the
  `@mkbabb/value.js/css` façade** (OP-5's target exists) — a hand-rolled parser is the bypass this
  row convicts; **SequenceScrubber's shape rows are VERDICT-GATED** and discharge or persist with
  G1; the KAD `innerHTML` BLOCKER is **KF.W5's, front-loaded, not gated here**; the twelve tracked
  `test/demo/instrument/` files are READ-ONLY.
- **Brief**: fixtures first, then (1) **G6** round-trip — per-stop easing survives, named phases
  render as named, "Add" does what the copy says, `animate to none` authorable or its exclusion
  recorded, the paste path delegated to the façade; (2) **G10** cache + ghost — eviction on edit, no
  orphan base64 after remove/clear/import-over, a repeatedly-failing capture that stops and says so,
  decomposed ghost transform with a terminal `v-else` and a reserved box; (3) **G9** accessible
  description as `.c` designed it, plus the accessible rail container and AT-hidden graduations;
  (4) **G15** execute `.c`'s fold ruling — fold onto the 80-line shell, or the two shells stand with
  the falsifier answered; N-2 wired or deleted; (5) **P9** contract and dead-surface hygiene,
  `flattenVars`/`loadPreset` disposed as one act. `npm run check` before each commit.

### `.f` — Phase 4, CLOSE + BH RELAY (serial, last)

- **Model**: opus.
- **Sections**: §Verdict Protocol's rider mechanics (`:103`) · §Sequencing's cross-edges
  (`:349-362`), the → KF.W10 · KF.W11 arm (d) · KF.W13 · glass-ui BH relay (SS-6) · KF.W9/SS-13 rows ·
  §Gates all fifteen (re-run BEFORE→AFTER) · §Excluded (`:369-382`).
- **Writable**: vjs `docs/tranches/X/execution/B/KF-W7.md` · vjs
  `docs/tranches/X/execution/LEDGER.md` (**its own row's cells + appended event lines only**) · vjs
  `docs/tranches/X/keyframes/evidence/W7/**` · vjs `docs/tranches/V/coordination/INBOX.md` · vjs
  `docs/tranches/V/coordination/<the outbound relay letter>`.
- **Gates**: all fifteen, re-run at this seat's own double-run commands; stamps nothing the units
  did not earn.
- **Locks**: **glass-ui is READ-ONLY always** — the BH relay rides as an outbound letter from this
  tree plus its INBOX row, never a write into the glass tree and never a demo-side patch of a
  producer seam; **E13: the wave does not close with UNREAD mail in scope**; the four-verb line
  moves only as far as this wave's own bytes earn (IMPLEMENTED is the ceiling here — VERIFIED is
  stamped only at sub-tranche close); **every SWAP-discharged row must carry
  `` DISCHARGED by KF.W7 SWAP verdict <surface>, <date> `` verbatim** or KF.W10 must carry it.
- **Brief**: (1) re-run all fifteen gates and publish BEFORE→AFTER against this record's Baseline;
  (2) audit every commit against its unit's writable set (four tracks share the index — no
  contaminated commit, `dev.sh` in zero commits); (3) write the **per-surface SWAP verdict table**
  into this record in KF.W10's terminal alphabet, for KF.W11 arm (d) and KF.W13 to consume;
  (4) compose the **BH relay** (SS-6): C-15's `/timeline` export gaps, TooltipContent's
  non-consumption of `--reka-tooltip-content-available-height`, KF-SCR-2, KF-AV-32 — the `cn`
  padding-group seam is already relayed and is not re-filed; row it in `INBOX.md`; (5) re-sweep the
  four paths; (6) push kf `origin HEAD` (KF-WRITE (b)); (7) set the LEDGER row and append the event
  line; state every residual with a named owner.

### Standing law for every unit of this wave

- Line 1 of any file a seat creates = `SERVED MODEL: <its model id>`. Quote-by-command
  (⟨cmd⟩ … → output). WRITE-THEN-MEASURE: every published count read from settled bytes, double-run.
- **Writes are lawful ONLY inside this plan's writable set for that unit.** Any write outside it is
  an ESCALATION: stop and return it. `scripts/dev/dev.sh` is NEVER touched, in either repo.
- **Pathspec commits only, on the commit itself**:
  `git add <exact paths> && git commit --no-verify --quiet -m "<msg>" -m "Claude-Session: https://claude.ai/code/session_01QkbQV4VgkoQgSoUj2oKZim" -- <the same exact paths>`.
  Never `git add -A`/`-u`, never `git commit -a`, never reset or unstage another seat's paths. On
  `index.lock`, sleep 5–20 s and retry up to 5× — never delete the lock.
- **No quick fix, no workaround, no masking fallback**: no try/catch around a defect, no
  `test.skip`, no allowlist, no copied producer selector, no local patch of `node_modules`. Each is
  a HIGH defect. Idiomatic root-cause cures only.
- **E-3**: dated specs, the adjudicated registry, conformance artifacts and prior evidence are
  IMMUTABLE — corrections are dated addenda beside.
- Sibling trees other than keyframes.js are READ-ONLY; **glass-ui is READ-ONLY always** — producer
  rows ride mail (SS-6), never frontend hacks.
- Probe parsimony (runbook §5.2): bounded Playwright/DevTools use; SS-13 residue probes are routed,
  not executed here.

---

## Unit receipts

*(appended by each unit as it lands; nothing below this line at OPEN)*

---

### X.KF.W7.a

**Phase 1 — THE S-9 EVALUATE (serial, alone).** **Model**: `claude-opus-5[1m]`.
**Date**: 2026-09-18. **Ref of record**: keyframes.js `origin/master` **`ae83da07`**.
**Status**: **DONE.** Both owed gates turned: **G12 RED → GREEN · G1 RED → GREEN.**

Evidence authored (all three under `docs/tranches/X/keyframes/evidence/W7/`, each opening
`SERVED MODEL: claude-opus-5[1m]`): `G12-REF-PIN.md` · `OP-0-OP-1-SETTLEMENTS.md` ·
`G1-VERDICT-TABLE.md`.

#### Acts, in the order the locks require

**Act 1 — G12, THE OPENING COMMIT (§Sequencing 3: no cure commit precedes it).** `0dc2941a`.
The ref is named: ⟨cmd⟩ `git -C …/keyframes.js rev-parse master origin/master` → `ae83da07…` twice,
`git merge-base` → the same — **`master` ≡ `origin/master` ≡ `ae83da07`**. The five composable /
engine §Bounds rows are marked **origin-side** with the law that binds every later seat (*an anchor
is read `git show origin/master:<f>` at `ae83da07`, or it is not read*). **The D-19 re-resolution
banks 21 anchor rows** across OP-0 (3) · OP-1 (5) · KF-CE-2 (4) · G1's witness (9), **19 EXACT · 2
DRIFTED**, both **+4** and both recorded as **INTENT at the true bytes**:
`AnimationControlsGroup.vue` `activeTimelineRef` banked `:198-201` → **`:202`**;
`ChannelControls.vue` `isTimelineVisible` banked `:377-379` → **`:381`**. **Neither drift moves a
mechanism and neither moves a verdict** — both BLOCKERs verify at the true bytes. The §Bounds
line-count tier is **consumed from this record's Baseline, not re-run** (LAW D(3)); the DISQUALIFIED-
HEAD clause is recorded as **discharged by the bytes** (no second ref exists to disqualify).

**Act 2 — OP-4's residue (b), the wave's ONE manifest add.** kf `3a01e362`.
⟨cmd⟩ `git diff --stat package.json` → **`1 file changed, 1 insertion(+)`**; the line is
`"@vue/test-utils": "^2.5.1",` at `package.json:84`, placed in `devDependencies` between
`@vitejs/plugin-vue` and `@vueuse/core`. Version read, not guessed: ⟨cmd⟩
`npm view @vue/test-utils version` → **2.5.1**. **Single-instance and idempotent** — ⟨cmd⟩
`grep -c 'test-utils' package.json` → **0 BEFORE, 1 AFTER**; KF.W8, the other claimant, **consumes
and asserts presence** rather than writing a second entry. **Nothing else moved**: ⟨cmd⟩
`git diff --unified=0 package.json | grep -c '"check"\|"lint"\|"test\|exports\|sideEffects'` →
**0** — no script, no `exports`/`sideEffects` key, no other dependency line. JSON re-parsed after the
write (`devDependencies` = **47** keys). The struck `+@vitejs/plugin-vue` half stays struck (present
at `:83`, `^6.0.7`, installed). **No `vitest.config.ts` byte was written by this unit**; KF.W4's
commit-2 registration is consumed as the inbound dependency the OPEN seat already measured live.

**Act 3 — OP-0 and OP-1, SETTLED IN WRITING (§Sequencing 1 and 2).** `250f527b`.
Both cures are **NO-WAVE-OWNER and out of §Bounds; this unit wrote no byte of either.**

- **OP-0 — kf-AnimationControlsGroup D-1 (restored BLOCKER): RULED ***KEEP the portal
  architecture; cure by ARBITRATION AT THE SOURCE.**** The banked scope enumeration is carried whole
  (**cube 3 · amiga 3 · spring 2**, all stamped with the scene `superKey` so ONE bucket flips ALL
  instances) and is load-bearing, not decorative: `isTimelineVisible` (`:381`) is **scene-shared on
  both disjuncts**, so no work at the sink or in that predicate can separate three instances sharing
  one bucket — only a **per-channel** term can. **Cure shape, ruled exactly**: the Teleport's
  `:disabled` becomes *expanded AND this channel is selected*; every other channel's timeline stays
  **mounted and in place**. **`v-if` is REJECTED BY NAME** — gating the source by existence would
  unmount the non-selected timelines and destroy their authored keyframes, curing D-1 by committing
  L-2/C-2 on a second axis. The discriminator already exists in the contract (`active?: boolean`,
  `:257`, bound by every host, forwarded at `:108`) and the in-place panel already demonstrates the
  idiom (`:150`) — the teleported node is gated on neither, which is kf-ChannelControls **L-8** rider
  (iii), carried. **Both alternatives declined with named reasons**: N sinks cure the address, not the
  cause; *AnimationControlsGroup as single owner* (attractive — it already computes
  `activeTimelineRef`) makes collapsed and expanded **two mount sites**, hence two instances, hence
  **state loss on every expand/collapse** against a `state` that opens literal-empty with **0**
  rehydration paths (⟨cmd⟩ `grep -c 'createGlobalState\|useStorage' useTimeline.ts` → **0**).
  **M-9 rides this cure and is NOT mooted by it** (one id, still hand-spelled in two files;
  `transport/injectionKeys.ts` verified present as the established seam).
  **§Sequencing item 1's forward condition is DISCHARGED: G2's AnimationControlsGroup arm is
  UNBLOCKED for `.b`**, under the settlement's three properties (no unmount · no keyed stateful
  subtree · per-channel arbitration).
- **OP-1 — kf-ChannelControls L-2/C-2 (BLOCKER): RULED ***DROP THE KEY.**** `:189`'s
  `:key="storedControls.selectedControl"` is deleted; the entrance effect (`:190`), if wanted, is
  retriggered **without keying the stateful subtree** — **keying any ancestor of `<KeyframeTimeline>`
  is forbidden by this settlement, in this file and in every successor.** The `defer` + `:disabled`
  pair already performs the relocation the key is nominally there for. **KF-CE-2's second-order
  collision resolved as the spec rules it**: the *keyed remount* option is **REJECTED**; **arm-time
  id capture** is the cure shape — verified against the bytes it must be written for
  (`<CSSCodeEditor>` `:123-127` binds **no `:key`**, ⟨cmd⟩ `grep -c ':key='` → **0**; the live-ref
  resolution at `:247-248`; **`kf.vars = newVars;` at `:263` ASSIGNS, not merges**, which is why a
  late emit replaces a whole keyframe's `vars`). **`L-15-PROTECTED` restated and binding**: the
  `if (!kf) return;` guard at **`:249`** is load-bearing against this exact timer and **stays** — no
  dedupe, no tidy-up and no arm-time-capture implementation may remove it.
  **The interlock is stated because the two settlements are one system**: §1 without §2 still
  destroys the selected channel's work on every switch; §2 without §1 preserves the work and still
  stacks three instruments in one clipped box.

**Act 4 — G1, THE §VERDICT TABLE.** `4c03ceda`.
**The importable surface, established by command and double-run, before any row was ruled**:
`dist/components/timeline/index.d.ts` = **2 L**; the directory ships **9** files; **the `./timeline`
subpath exports ONE runtime binding** — ⟨cmd⟩ `grep -c '^export' dist/timeline.js` → **1**,
`export { me as GlassTimeline };` — and there is **no deep-import escape hatch**: **73** export
subpaths, **exactly one** matching `/timeline/i`, and the package's **only** wildcard is
`./fonts/*`. `SliderVariant = "standard" | "spectrum"` (no "timeline" member); demo imports of
`glass-ui/timeline` = **0**; `GlassTimeline` references in the whole kf tree = **0**;
`geometry.d.ts` hits for `percent|zoom|pan(` = **1**, and that hit is **prose** in the `fillFor`
docblock — **zero** exported percent↔position map, **zero** zoom, **zero** pan. glass-ui **7.0.0**.

**THE VERDICT: six surfaces, six KEEP-BESPOKE, ZERO SWAP.**

| surface | L | verdict | the reason in one line |
|---|---|---|---|
| KeyframeTimeline / TimelineTrack rail | 312 / 246 | **KEEP-BESPOKE** | no zoom/pan counterpart (C-15's arm, corroborated) **and** C-15's playhead-swap candidate is DECLINED with its mechanism named: with no percent↔position map to share, it installs a SECOND geometry authority in one box — N-10's class, so PARTIAL here is not smaller, it is incoherent |
| TimelineCaret | 70 | **KEEP-BESPOKE** | `label` is tooltip **text**; there is no caret to adopt. **C-10 RULED**: the `update:percent` emit (`:43`/`:62`) is renamed OFF the `update:*` protocol — a consumer writing `v-model:percent` would bypass the ops layer; owner `.d`. **L-15 PERSISTS, routed to G14 (`.c`)** |
| TimelineHoverPreview | **44** ⟨spec 38, drift +6, named⟩ | **KEEP-BESPOKE** | `popoverContent`'s scope is a weighted `TimelineSegment`; it cannot carry a per-keyframe thumbnail + ghost + cache. Producer seams → `.f`'s BH relay |
| SequenceScrubber (S-3/S-4) | 162 | **KEEP-BESPOKE** | the gesture drives `Sequence.scrub` → each child's `--ball-p` under an explicit **inv ζ single-writer** rule; the primitive would insert a producer spring clock as a second writer. It is the house idiom's **compliant** consumer (`:31`, `:32-35`), and its a11y contract is already met (`:22-29`) |
| AnimationVisualizer | 256 | **KEEP-BESPOKE** | its root is `aria-hidden="true"` under a documented **"one AT slider per scrub value"** disposition — the imported `role="slider"` is dead weight inside it and a second AT slider outside it; and the ball is the **animated subject** of a keyframes.js demo (`SmoothProgress`/`SpringProgress`/`RAFPlayback`), not a scrub handle |
| SpringTarget / SpringTrace idiom arms | — | **KEEP-BESPOKE** (house idiom ADOPTED) | no rail+ball counterpart anywhere in the package. **C-4 RULED: DELETE THE SENTENCE** — `MetricBadge` = **0 files** in glass dist, the `/metric` barrel exports exactly four components, `Metric` has no badge affordance and the `.status-badge` AA mix is load-bearing. **C-3 DECISION: the export is WARRANTED** on C-15's precedent (⟨cmd⟩ `grep -c 'sampleNormalizedSpring\|resolveLinearStops' dist/keyframes.d.ts` → **0**); implementation edge → KF.W5/KF.W8, no `src/**` byte here |

**§3 — THE DISCHARGE SET IS EMPTY, and it is stated in the form W10 consumes.** No surface is ruled
SWAP, so **this unit emits ZERO `DISCHARGED by KF.W7 SWAP verdict <surface>, <date>` receipts** and
**KF.W10 CARRIES EVERY ROW**. R3-10.3 is satisfied by construction. Written as a positive finding,
because the inverse error — a downstream wave assuming a swap happened — costs as much as a silent
discharge. **KF.W11 arm (d) and KF.W13's two packets read §3 as their answer.**

**PR-CAUTION was weighed BEFORE the first row** (quoted verbatim at the evidence file's §0.2), and
its direction is **concordant with every row** — it never had to overturn one, and it is recorded in
full so that discipline is auditable rather than asserted. **C-15 is cited and never re-derived**
(killed-claim #15 intact); everything measured is the IMPORTABLE-surface reading G1's own assertion
demands, and where measurement and C-15 meet, **C-15 governs**.

**Both triggers ARMED** (neither predicate is this unit's; the seam ruling is `.b`'s G2):
**D-1/C-1 dissent** — the instrument is KEPT whole, so a **LIVE** seam ruling fires it and
{C-1, C-6, L-3, L-5, M-3/C-4} inherit BLOCKER weight **as one cluster** (N-10: one design problem,
one commit family). **M-3/C-4 inverse** — a **permanently** display-only ruling drops M-3/C-4 to
MINOR; **a deferral is not a display-only ruling and earns no demotion.**

#### What this verdict does to the wave's roster (OP-6 — the verdict sizes the rest)

- **`.b`** — the seam is **LIVE work, ungated by any swap**; G2's AnimationControlsGroup arm is
  **UNBLOCKED** by the OP-0 settlement, bounded by its three properties. Two locks it inherits from
  this table: **KF-AV-17's resize-immune form** `translateX(calc(var(--p) * (100cqw − 100%)))` binds
  any transform-based playhead (the overshooting `translateX(calc(p*100cqw))` form is live at
  `SequenceScrubber.vue:34`, K-12's own coordinate, re-verified here), and **no cure may key a
  stateful subtree or unmount a mounted timeline.**
- **`.c`** — **L-15 is routed to G14 and not pre-empted here**; the THP ghost/cache and a11y designs
  are LIVE; the tooltip producer seams are `.f`'s relay, never a demo-side patch.
- **`.d`** — **the KF-AV-10 idiom family is LIVE, NOT SPENT-UNUSED**, ruled at length so no
  discretion is left: the registry's *"bespoke-survives ⇒ adopt the idiom; swap ⇒ moot"* has a TRUE
  antecedent (§2.5 keeps the bespoke), and §Bounds' *"if G1 rules KEEP-BESPOKE these carves are
  SPENT-UNUSED"* is consistent with it **when read with §Verdict row 6 as its subject** (the
  ADOPT/KEEP axis there is the **house idiom**, not glass) — the consistent reading governs (M-25).
  All five carve sites are **SPENDABLE**, with **OP-3's padding-box re-derivation first** and
  **kf-EasingTarget P-2 binding the spend**: the idiom leaves `transform` unclaimed BY DESIGN and
  AnimationVisualizer's ball already writes `transform` itself — **the adoption takes the rail
  geometry and the tint tokens, never `transform`.** Plus **C-10's emit rename** at the caret.
- **`.e`** — **SequenceScrubber's shape rows PERSIST** (S-3/S-4; C·C-4 narrowed to *a one-line
  provider guard + declaring the asymmetry*, with the `{progress}`-prop-plus-emits cure **still dead**
  under K-8; D-5/D-6/D-11's *"the primitive already solves it"* arms **persist** — it does not). All
  four G11 fixtures are still owed.
- **`.f`** — the relay cargo is enumerated at the evidence file's §5 (the `/timeline` one-binding
  export gap with its no-wildcard finding · `geometry`'s missing percent↔position map · the
  `SliderVariant` fact · TooltipContent's two seams), with the `cn` padding-group seam **not**
  re-filed.

#### Gate readings

| gate | BEFORE (this record's Baseline) | AFTER | witness |
|---|---|---|---|
| **G12** | **RED until stamped** | **GREEN** | `0dc2941a` states `ae83da07`, marks the composable/engine anchors origin-side, and banks 21 re-resolved anchors (19 EXACT · 2 DRIFTED +4, both INTENT-at-true-bytes) |
| **G1** | **RED** — *"no table exists and 5 of 6 counterparts are not importable"* | **GREEN** | `4c03ceda` — six surfaces ruled with named reasons against the importable surface only; every SWAP-discharged row named (**there are none**, §3); PR-CAUTION weighed; both triggers armed. The Baseline's *"5 of 6 not importable"* is **sharpened, not contradicted**: at the runtime surface it is **6 of 6** — one binding is exported and it is the dispatcher, not a counterpart to any of the six |

#### Residuals, each with a named owner

1. **`@vue/test-utils` is in the MANIFEST but NOT ON DISK.** Measured after the commit:
   `ls node_modules/@vue/test-utils` → **No such file or directory**; ⟨cmd⟩
   `grep -c '@vue/test-utils' package-lock.json` → **0**. **`package-lock.json` and `node_modules/`
   are outside every KF.W7 unit's writable set as this record's Unit plan states them** (the spec's
   §Bounds carve is `package.json`, one line), and `package-lock.json` is a KF.W0 OWNER'S-HAND row
   (COHESION §0j.C). **This unit therefore did not run an install, and did not silently widen its own
   bounds to do so.** **Consequence: G11 is UNRUNNABLE until the install lands** — `.d`'s and `.e`'s
   four fixtures cannot mount. **Owner: the orchestrator**, by one `npm install` in
   `/Users/mkbabb/Programming/keyframes.js` (or a dated E-3 §Bounds widening to `package-lock.json`)
   **before `.d`/`.e` dispatch**. Recorded loud because a seat that discovers this mid-flight will be
   tempted into exactly the masking fallback the standing law forbids.
2. **Two anchors drifted +4** (`activeTimelineRef` `:198-201`→`:202`; `isTimelineVisible`
   `:377-379`→`:381`). Banked as INTENT-at-true-bytes; **no successor re-derives them.** Owner: none
   — closed.
3. **The spec's `TimelineHoverPreview` 38 L is 44 L** at this ref. Consumed from this record's
   Baseline, restated in the verdict table so no seat reads 38 as a receipt. Owner: `.f`, as a dated
   observation at close.
4. **Cures ruled here whose code is NOT this wave's**: the D-1 portal arbitration · the
   `ChannelControls` `:key` deletion · KF-CE-2's arm-time id capture (parent half) and its
   EDITOR-UNIT child half · C-3's library export · C-4's repo-wide prose arm · KF-AV-13's
   press-to-seek decision. **All NO-WAVE-OWNER or another wave's**, each named with its owner in the
   evidence files. **Decisions taken, code not spent.**

#### Escalations

**NONE.** No write outside the writable set was attempted or required; every specified cure was
possible at the bytes and was implemented as specified.

#### Double-run block (WRITE-THEN-MEASURE)

Two measurement scripts were written to the scratchpad and each run **twice** with ⟨cmd⟩
`diff run1 run2` → **no output** both times (**DOUBLE-RUN IDENTICAL**): the 21-row anchor
re-resolution (§Act 1) and the 12-row importable-surface census (§Act 4). Every count published above
— 1 insertion · 47 devDeps · 0/1 test-utils · 2 L · 9 files · 1 runtime export · 73 subpaths · 1
timeline subpath · 1 wildcard · 0 demo imports · 0 GlassTimeline refs · 0 MetricBadge files · 4
metric components · 0 dts hits for the two spring samplers · 0 `:key=` in KeyframeTimeline · 0
rehydration paths — was **read from the settled bytes**, never from the spec, the registry or a
prior pass, except the §Bounds line-count tier which is **cited to this record's Baseline by name**.

#### Commits (5 — 4 in value.js, 1 in keyframes.js; pathspec on every one)

| # | sha | repo | meaning |
|---|---|---|---|
| 1 | `0dc2941a` | value.js | **G12** — the ref pin + the D-19 anchor re-resolution (**the opening commit; no cure commit precedes it**) |
| 2 | `3a01e362` | keyframes.js | **OP-4 residue (b)** — `+@vue/test-utils ^2.5.1`, ONE line |
| 3 | `250f527b` | value.js | **OP-0 / OP-1** — the two settlements (§Sequencing 1 and 2 discharged) |
| 4 | `4c03ceda` | value.js | **G1** — the six-surface verdict table |
| 5 | this commit | value.js | these receipts |

**Index hygiene**: every commit carried its own pathspec on the commit itself; **no `git add -A`, no
`-u`, no `git commit -a`, no reset or unstage of another seat's paths**; `scripts/dev/dev.sh` appears
in **zero** commits of this unit, in either repo. The kf tree's only other content at every commit
was its two untracked `VALUEJS-INBOUND-*.md` survivors, which stayed untracked.

### X.KF.W7.c

SERVED MODEL: claude-fable-5-1 · **2026-09-18** · Fable design seat, **documents only** — zero keyframes.js
bytes, zero registry bytes (both measured at close, below). Sections executed: §Carry P7 (:198-219) · P8
(:220-237) · §Gates G9 · G10 · G14 · G15 · §Sequencing 7 and 9 · §Excluded KAD-15/16/20 (:371). Writable set
honoured: `evidence/W7/**` + this record; **no write outside it → no escalation**.

**Step 0 (E13 mail sweep)**: COHESION §0j + §0k/§0l/§0m/§0n re-read — nothing addressed to KF.W7 beyond
standing law; G1-VERDICT-TABLE (`.a`) read whole — its §2.2 routes L-15 to G14 (this seat), §2.3 THP
KEEP-BESPOKE with producer seams → `.f` relay; `.a`'s residual (`@vue/test-utils` not on disk) is `.a`'s, not
re-claimed.

**Measure before design** (the counts every ruling cites; script `scratchpad/w7c-measure.sh`, run twice,
`diff run1 run2` → **DOUBLE-RUN IDENTICAL**; all read at the G12 pin `ae83da07`, files byte-identical at the
then-HEAD `77d0e0b1` — ⟨`git diff --stat ae83da07 HEAD -- <scope>`⟩ → 0 lines):
- G14: useTimelineBuild toasts `121 133 137 148 155 157` · `console.error` `48` · useTimelineOps toasts `24 34`
  · caret `isNaN` `61` · KT close-before-parse `270 277` · KT template `v-if|v-else` **1** · vue-sonner
  importers **9** · Toaster mount `DemoGlobalChrome.vue:28` · `vue-sonner/style` imports **0** · vue-sonner
  **2.0.9** · `lib/index.js` positioning/injection tokens **0** · `lib/index.css` `position: *fixed` lines
  `21 387` (→ the banked kf-DemoGlobalChrome D-1/L-1/C-1 BLOCKER is REAL at the bytes: the channel is
  unpositioned) · `withErrorToastAsync` `useKeyframeOps.ts:25` · glass forms exports `Textarea` +
  `useUserInvalidAria` · Button `loading?: boolean` d.ts:15 · POSTURES.md floor **20**, KF.W7-owned rows **7**.
- G15: CPD **80** L / KAD **161** L · `defineExpose` `:79` · `initialText` hits `49 53 59 67`, `:initial-text`
  at the mounts **0** · KAD live import `KeyframesEditor.vue:118`, mount `:75` · KAD-1 cured at
  `useHighlightCSS.ts:183` (W5) · `useCodeHighlight(` consumers **2** · N-2 `.label` **1** + timelineTypes **1**
  · KAD-16 footer at `:41` · nested `DialogDescription` **2** in `:24-31` · parent-owned close
  `useKeyframeOps.ts:183`.
- G10/G9: `previewCache` `81 217 221 226`, `delete` **0** · `return null` `93 111` · `getGhostStyle` `91 151` ·
  `<TooltipContent` `:86`, `aria-label` **0** · `diamondHover` `83 133` · track role/aria-label in `:21-35`
  **0** · THP `data-register` `:20`, `normal-case` **0** · reka `ariaLabel` computed `:87` · value.js
  `/transform` exports `decomposeMatrix2D decomposeMatrix3D`, kf demo imports **0**.

**Acts** (one commit per meaning, pathspec on the commit itself; each file line 1 = `SERVED MODEL:
claude-fable-5-1`, ⟨`head -n1`⟩ ×4 → **4**):

| # | commit | file | meaning |
|---|---|---|---|
| 1 | `7fee73f9` | `evidence/W7/G14-POSTURE-RULING.md` (152 L) | **G14 RULED**: ONE posture — *SURFACE, NEVER SWALLOW — IN PLACE WHERE THERE IS A PLACE; OUTCOME BEFORE ACKNOWLEDGEMENT* — four clauses P1..P4 (⟨`grep -c '^- \*\*P[1-4] '`⟩ → **4**) + a named PRECONDITION (the toast channel is dead at the bytes; not cured here; no bare stylesheet import — M-1); consumer table **5** rows over the seven POSTURES.md KF.W7 rows (C-7 · L-15 · L-11 · D-15 · R-4+KAD-9+KAD-10) with executor and cure shape each; cross-referenced both ends (the registry rows already carry `**KF.W7**`; disposition write-back routed to `.f`/KF.W10 — **no registry byte**). |
| 2 | `fa502444` | `evidence/W7/G15-FOLD-RULING.md` (248 L + addendum) | **G15 RULED — FOLD**: shell contract (awaitable `submit`, `defineModel("text")` replacing `initialText`, `trigger` slot, `cn()` class merge, `footer-extra` + `textEl` LIVE), KAD survives as a thin adapter (import/mount at `KeyframesEditor.vue:75/:118` UNCHANGED → no out-of-bounds write); the four deltas preserved; **L-4's falsifier answered YES** with mechanism + its one residual (the R-1 hljs/VDOM class, unchanged, dies at W6's swap); **dispositions FIRST**: 18 table rows / 40 ids, **KAD-15 · KAD-16 · KAD-20 named by id** with their W6 anchor rows and the fold's structural effect on each (KAD-16's footer tokens become MOOT at the fold); **N-2 RULED WIRE** (marker name · THP caption · tooltip description; export OUT with reason); **order lock: FOLD FIRST (`.e`), W6's S-9 swap SECOND**. |
| 3 | `7515ecd2` | `evidence/W7/G10-GHOST-CACHE-DESIGN.md` (176 L) | G10 design (family D-7 + MISSED-4 + GHOST-PLATE + L-D8/C-4(a) + L-D4/C-4(b)): one content-keyed `previews` Map, evicted by a deep watch on keyframes; failed = terminal state that renders its reason; `scrubAndCapture` REJECTS (finally-restore kept); KEEP comment rewritten to true conditions; THP derives its ghost (prop deleted); fixed PLATE → SWATCH → decomposed-transform WRAPPER via `@mkbabb/value.js/transform`; reserved media box (M9); terminal `v-else`; `@error` → failed; D-15 demo half; `max-h-24` untouched (MISSED-3); m-7/m-8 validation AFTER L-6/C-4. Six falsifiers. |
| 4 | `4444e6f8` | `evidence/W7/G9-A11Y-DESCRIPTION-DESIGN.md` (126 L) | G9 design: `describeKeyframe` in TT (derived from the rendering data; `; ` at row boundaries, terminal `.`; media sentence re-derived on ghost→image through reka's props-first `ariaLabel`); three readers (tooltip `:aria-label`, `<img alt>`, marker name); M7 at THP:20 with the verbatim element (DISSENT-4), `normal-case tracking-normal`; RR-A missed-1 group role + `aria-hidden` ticks; D-10 `@focus` beside `@mouseenter`; P2-DEAD; producer seams (reka `textContent` fallback, available-height) → `.f` relay, no local patch. Six falsifiers. |
| 5 | `500e5a0a` | `G15-FOLD-RULING.md` addendum | the §1 count line corrected by dated addendum-beside (E-3): 18 rows / 40 ids, measured. |
| 6 | (below) | this record | these receipts. |

**Gate readings BEFORE → AFTER**:
- **G14**: RED (six postures measured at baseline) → **GREEN as a RULING** (one declared posture, read out of
  KF.W2's `POSTURES.md`, cross-referenced both ends). The BYTE half (C-7 → `.e`; L-15 · L-11 → `.d`; D-15 →
  `.e`; R-4 → `.e`) stays RED until those commits land; `.f` reads it at close.
- **G15**: RED → **GREEN as a RULING** (fold ruled, not declined; falsifier answered; dispositions stated
  first with KAD-15/16/20 by id; N-2 WIRE). The BYTE half (the ONE fold commit) is `.e`'s.
- **G9 · G10**: NOT turned by this unit — designs LIVE (files 3, 4); byte halves `.d`/`.e`.

**Locks measured at close**: ⟨`git -C keyframes.js log --grep='w7.c' --format=%h | wc -l`⟩ → **0** kf commits
by this unit; ⟨`git status --short -- docs/tranches/X/keyframes/registries`⟩ → **0**; ⟨`git log --format=%h
7fee73f9^..HEAD -- scripts/dev/dev.sh | wc -l`⟩ → **0**. Observed, not touched: the kf tree carries **4** dirty
tracked files (`KeyframeTimeline.vue` · `TimelineTrack.vue` · `timelineTypes.ts` · `timelineEngine.ts`) and kf
HEAD has moved `77d0e0b1` → `e1c596a0` — sibling seats' (`.b`/`.d`) in-flight work; this seat ran only
`git show`/`git grep` there.

**Residuals (owner named)**:
1. **Toaster BLOCKER** (kf-DemoGlobalChrome D-1/L-1/C-1, NO-WAVE-OWNER): the ★ S-7 house channel is
   unpositioned at the bytes; G14 P3's precondition. Not cured here (M-1 forbids the bare import as a fix);
   → `.f`'s close residuals + the KF.W10 ledger.
2. **W6∥W7 same-file order lock** (G15 §5): runbook §3.4 has NO row for `CSSPasteDialog.vue` /
   `KeyframesAddDialog.vue` / THP / TT / KT / caret shared by KF.W6 `.f`/`.h`/`.i` and KF.W7 `.d`/`.e`. Ruled
   from this end: **FOLD FIRST, SWAP SECOND**; W6's writes to these files land after W7 `.d`/`.e` close. →
   ORCHESTRATOR (a runbook row; no runbook byte written by this seat).
3. **Phase-3 file-crossing** (G10 §6): the ghost family needs four carves in `.d`'s `TimelineTrack.vue`; the
   a11y family needs one carve at `.e`'s THP:20. Two seats carving each other's file concurrently in one
   worktree is a race the §Disjointness table did not foresee. **Recommendation to seat 0** (not a ruling):
   serialize `.d` → `.e` and re-home each family WHOLE (ghost → `.e` with its TT carves; a11y → `.d` with the
   THP:20 carve).
4. **Registry write-back**: the seven POSTURES.md rows and the dialog/THP/TT/KT records receive their
   disposition cells at `.f`/KF.W10 (E-3; **no registry byte written by this seat**).
5. **KFED-UNIT declarations** (to `KF-W10.md` §6.D → the KF.W12 row): the parent half of KAD-13
   (`useKeyframeOps.ts:149-150`); the KAD mount's `submit` returning its promise so busy/error inherit.
6. `@vue/test-utils` install residual — `.a`'s; unchanged.

**Escalations**: none — no write outside the writable set; no third diagnose→edit→re-measure iteration; no
allowlist pressure.

**Index hygiene**: every commit carried its own pathspec on the commit itself; no `git add -A`, no `-u`, no
`commit -a`, no reset/unstage of another seat's paths; the record was re-read (⟨`wc -l`⟩ → 628, last entry
`### X.KF.W7.a`, working tree clean for it) immediately before this append.

---

### X.KF.W7.b

SERVED MODEL: claude-fable-5-1 · **2026-09-18** · Fable design seat, **serial over the shared files**; the
ONE seam commit family. Sections executed: §Carry P1 (:128-141) · P2 (:142-148) · P3 (:149-156) · §Gates G2
(:265-267) · G3 (:269-271) · G4 (:273-275) · G5 (:277-279) · G13 (:313-315) · §Bounds' disjointness
paragraph (:84) · §Sequencing 5 (:334). **Status: DONE — G2 RED → GREEN · G5 RED → GREEN**; G3 · G4 · G13
DESIGNED (published; `.d` implements). Writable set honoured — **no write outside it → no escalation**.

**Substrate at open**: kf `HEAD` = `origin/master` = **`77d0e0b1`** (the KF.W4∥KF.W6 bundle, after `.a`'s
`3a01e362`); ⟨cmd⟩ `git diff --stat ae83da07 77d0e0b1 -- demo/components/instrument/timeline
demo/utils/keyframeSelector.ts src/animation/engine/animation.ts src/animation/engine/interpolate.ts` →
**empty** — every timeline anchor of the G12 pin resolves unchanged; all re-read at the bytes before any
edit (`timelineEngine.ts` `:37-47` · `:38` · `:40` · `:49-51` · `:66` · `TimelineTrack.vue` `:24` · `:27-34`
· `:62` · `:97-98` · `:160-161` · `:168-172` · `:182` · `:192-196` · `KeyframeTimeline.vue` `:83` · `:194-210`
· `useTimelineBuild.ts` `:46` · `:53-61` · `:112-115` · `useTimelineOps.ts` `:28` · `:56-62` · engine
`animation.ts:155-156` (`_defaultTransform` reads `this.targets` LIVE) · `:485-490` (`setTargets` →
`bindTargets`) — **all EXACT**). Consumed: `.a`'s G1 (six KEEP-BESPOKE; both triggers ARMED) and
OP-0/OP-1 (portal KEPT; G2's AnimationControlsGroup arm UNBLOCKED); `.c`'s receipts read after its append
(its G10 design keeps `scrubAndCapture`'s finally-restore and its G9 `describeKeyframe` becomes the marker's
accessible name — the stop count landed here must survive in it, noted for `.d`/`.e`).

**Step 0 (E13, seat-level)**: ⟨cmd⟩ `/usr/bin/find <the four paths> -maxdepth 1 -name '*.md' -newermt
'2026-09-18 00:31'` (the clock of KF.W6.b's foot sweep) → `../glass-ui/docs/tranches/BK/coordination/
valuejs-outbound-2026-09-18-kfw6-bh-relay.md` (**our own outbound**, rowed by that seat) ·
`../glass-ui/docs/tranches/BK/EXECUTION-PROGRESS.md` (glass's execution ledger, not mail) · `INBOX.md`
(self). **0 new inbound in KF.W7's scope; 0 `I-n` minted; no INBOX row added.**

#### Acts, in order (one commit per meaning; pathspec on the commit itself)

| # | commit | repo | meaning |
|---|---|---|---|
| 1 | `5657f69f` | value.js | **THE RULING, in writing, before any byte** — `evidence/W7/SEAM-DESIGN.md` (line 1 `SERVED MODEL: claude-fable-5-1`): §0 the seam is **LIVE** (the rail's whole affordance is a scrubber; `snapshot()` is keyed on the playhead, `useTimelineOps.ts:28`); **the D-1/C-1 dissent trigger FIRES** — {C-1, C-6, L-3, L-5, M-3/C-4} carry BLOCKER weight as one cluster; **the M-3/C-4 inverse trigger does NOT fire** (MAJOR stands). §1 the single-engine arm = the **detached preview subject** (C-6's first arm; the AnimationControlsGroup arm declined for this landing — its files are outside every seat's §Bounds and its shape is a product change). §2 the pointer policy. §3 **G5 RULED COALESCED-AND-SAID-SO** (minimum separation declined with reasons). §4/§5 the designs `.d`/`.e` implement (grabDx + L-m-14 · rebuild economics · wheel policy · D-1 keyboard route · M2 caret half · the `useTimeline` source/subject split · capture-the-subject · L-5 generation counter). §6 the roster table. |
| 2 | `f9e15f8e` | keyframes.js | **G5 — the collision decision, written into both shared files in ONE act**: `timelineTypes.ts` +53 (`TimelineStop { key; percent; keyframes; vars }` + `coalesceKeyframes` — stable percent sort, group by `selectorText(kf.selector)`, `vars` later-wins, i.e. exactly the order and policy the build had) · `timelineEngine.ts` (the `:37-47` merge loop DELETED; the build iterates `coalesceKeyframes(state.keyframes)` and compiles `stop.vars` under `stop.key` — no second merge exists; the now-unused `selectorText` import removed). **The merge KEY is byte-identical** (MISS-β2's float artefact is KF.W8's; `29` → `28.999999999999996%` measured and left). |
| 3 | `f77b152d` | keyframes.js | **G2 — THE SEAM, ONE commit** (4 files, 258+/59−): `KeyframeTimeline.vue` — `scrub` and `animation` destructured; `@update:scrub-t="scrub"` (the engine, not a bare ref); the **preview stage** (`.timeline-preview-stage`, `aria-hidden`, `h-24`/`h-40`) and the **two watchers**: subject minted per source×stage (`flush: "post"`), and **the invariant** `watch([animation, previewSubject], ([anim, subject]) => anim?.setTargets(...(subject ? [subject] : [])), { immediate: true, flush: "sync" })` — every built animation is rebound to the subject in the same synchronous step that publishes it; with no subject the engine is bound to NOTHING. `timelineEngine.ts` — `createPreviewSubject` (deep clone; `id`/`tabindex` stripped from the subtree; `inert`; `aria-hidden`; `pointer-events: none`; `data-timeline-preview-subject`) + the build's contract docblock. `TimelineTrack.vue` — the pointer policy (explicit `gesture` latch; `acceptsPress = isPrimary && button === 0`; `activePointers` set — a second contact ends the live gesture and suppresses until all lift; capture on the RAIL; `getPercentFromPointer(): number \| null`; the `buttons > 0` proxy, its lying comment and the dead re-test GONE; `@lostpointercapture` wired), and the marker + caret loops re-keyed to **stops** (`:key="stop.keyframes[0].id"`, `aria-label` *"N keyframes at P% (one rule in the animation) — …"*, a `×N` badge, ghost from `stop.vars`, a stop drags/arrow-moves as one, selection keeps the stop's already-selected member). `timelineTypes.ts` — `keyframes: [TimelineKeyframe, ...TimelineKeyframe[]]` (never-empty encoded in the type, no `!`). |
| 4 | (this commit) | value.js | these receipts + `SEAM-DESIGN.md` §7 addendum (capture-on-rail supersedes §2's `currentTarget` row; the two findings below). |

**§Sequencing 5 honoured**: the pointer guard SHIPS WITH the seam (one commit, `f77b152d`). **§Disjointness
honoured**: `timelineEngine.ts`/`timelineTypes.ts` written here and nowhere else; both commits landed
**before `.d`/`.e` dispatch**. **LP-1**: no write→render edge — `scrub` runs from handlers only; the subject
mount is post-flush; the rebind writes no DOM.

#### Gate readings BEFORE → AFTER (settled bytes, run twice — `diff run1 run2` → DOUBLE-RUN IDENTICAL)

| gate | BEFORE (Baseline) | AFTER | witness |
|---|---|---|---|
| **G2** | RED — `scrub` in none of `:78 :83 :197 :202 :224`; `isPrimary\|pointerType` **0**; `:49-51` a second engine over spread scene targets | **GREEN** | ⟨cmd⟩ `grep -n scrub KeyframeTimeline.vue` → `:94 :scrub-t` · **`:99 @update:scrub-t="scrub"`** · `:215 scrubT` · **`:220 scrub,`** · `:221 scrubAndCapture` · `:276`; ⟨cmd⟩ `grep -c 'isPrimary\|pointerType' TimelineTrack.vue` → **2**; the rebind at `KeyframeTimeline.vue:259` (`setTargets`) under `:261 flush: "sync"`; `createPreviewSubject` at `:192`/`:243`. **Assertion, executed** (probe `g2.probe.ts`, mounted `KeyframeTimeline` over a scene `<div>` with `opacity: 0.9`, two snapshots at 0.2/0.9, a primary scrub to 75%): scene `style.opacity` **`0.9` before and after** (never written); the stage's subject `opacity` **in (0.2, 0.9)** (painted); `id` stripped, `aria-hidden="true"`, `data-timeline-preview-subject` present. Right-button press → **0** scrubs, **0** captures; non-primary contact → 0; button-held pointer entering → 0; primary press → `[0.25]` + captured; second contact (pinch) → capture released, both fingers' moves → still `[0.25]`; one lifts, primary re-presses → still `[0.25]`; all lift, fresh press → `[0.25, 0.5]`. |
| **G5** | RED — merge loop `:37-47` keyed `:38`, admitted `:40`; both render loops per keyframe (`:62`, `:97-98`) | **GREEN** | ⟨cmd⟩ `grep -n coalesceKeyframes` → `timelineEngine.ts:69` (the build's ONLY partition), `timelineTypes.ts:48` (the definition), `TimelineTrack.vue:153` (the render's ONLY partition); ⟨cmd⟩ `grep -n v-for TimelineTrack.vue` → `:39 tick` · **`:67 stop in stops`** · **`:111 stop in stops`**. **Assertion, executed** (`g5.probe.ts` + `g2.probe.ts` test 3): three keyframes, two at one key → `coalesceKeyframes` → **2** stops, `vars` later-wins `{opacity: "1", color: "red"}`, key `"42%"`; the build's `templateFrames.length` **== stops.length (2)**, selectors equal per stop; the export contains `42%` **once**; the track renders **2** markers, the merged one labelled *"2 keyframes at 50% (one rule in the animation) — …"* with a `×2` badge, and its drag emits `moveKeyframe` for **both** members (`[["a",75],["b",75]]`). |
| G3 · G4 · G13 | RED | **RED — DESIGNED** (SEAM-DESIGN §4.1–§4.3), `.d` implements | not this seat's to turn; nothing stamped |

**Typecheck (OP-2 is live)**: ⟨cmd⟩ `npm run check 2>&1 \| grep -c 'error TS'` → **34 BEFORE · 34 AFTER**
(the frontier's pre-existing errors, none in this seat's files; the two `timeline`-scoped hits are the
SAME two before and after: `KeyframeTimeline.vue` the `<Input v-model>` TS2379 at `:105`→`:121` — N-2's
`.e` row — and `snapshotCapture.ts:34` TS6133 — `.e`'s). **Tests**: ⟨cmd⟩ `npx vitest run --project demo`
→ **31 files · 195 tests passed** after the seam (the read-only witnesses `timeline-undo.test.ts` and
`value4-editor-boundary.test.ts` among them, unedited: **0** of the twelve tracked files touched).

#### Findings (measured; owners named; no cure spent outside bounds)

1. **The SFC-mount fixtures cannot render glass-ui under the repo's `vitest.config.ts`** (SEAM-DESIGN §7.2):
   glass's `useSpring-*.js` chunk imports `@mkbabb/keyframes.js` bare; externalized under vitest it never
   resolves (nothing inlines it — `grep -c deps vitest.config.ts` → 0); reka `Tooltip` also needs a
   `TooltipProvider` ancestor. This seat's probes used a scratchpad config (`server.deps.inline:
   [/@mkbabb\/glass-ui/]`) and a `TooltipProvider` wrapper. **The `vitest.config.ts` write is STRUCK for
   this wave** → **ORCHESTRATOR**: a dated E-3 widening (one `server.deps.inline` line) or the G11 fixtures
   stay unrunnable for `KeyframeTimeline`/`TimelineTrack` mounts even after `@vue/test-utils` installs.
2. **A snapshot's legacy `rgba(r, g, b, a)` is refused by the compile** (SEAM-DESIGN §7.3): `rgba(0, 0, 0,
   0)` and `rgba(0, 0, 0, 0.5)` → *"Invalid CSS value for "backgroundColor" … expected scalar"*; the slash
   form and `transparent` compile. Browsers return the comma form for every transparent/translucent
   computed color, so `snapshot()` on any unstyled-background target feeds `rebuild` a refused value and the
   failure lands on G14's ONE silent path (`useTimelineBuild.ts:47-50`). Owner: the color-parse seam
   (library band), never a `snapshotCapture` filter → `.f`'s residuals + KF.W10, cross-ref G14.

#### Residuals, each with a named owner (the seam family's `.e`/`.d` members, SEAM-DESIGN §1.5/§4/§5)

1. **R-b1** construction-time targets — `useTimeline` source/subject split (`.e`); the build's third
   argument then carries the subject and the owner rebind retires.
2. **R-b2** `scrubAndCapture` captures `targets.value[0]` (the scene) — until `.e` re-points it to
   `animation.value.targets[0]`, the hover thumbnail shows the scene's pose, not the keyframe's
   (thumbnail-truth regression bounded to G10's surface, stated so it is never read as unexplained).
3. **R-b3** L-5 generation counter (`.e`); **R-b4** canvas subjects clone blank (SS-13 residue #1, routed).
4. `.d`: grabDx + L-m-14 (§4.1; a drag whose stop head changes mid-merge is the case capture-on-rail
   already survives) · G4 dirty check + rAF coalescing (§4.2; a stop drag today emits N `moveKeyframe` → N
   builds until this lands) · G13 wheel policy (§4.3) · M2 caret `@pointerdown.stop` (until then a primary
   press on the caret's display div still bubbles and scrubs) · D-1 keyboard route · C-10 rename · G7.
5. `.e`: THP receives the stop (or a `count`) so the tooltip says what the marker says; L-8/C-9.
6. `@vue/test-utils` install residual — `.a`'s; unchanged.

**Escalations**: none — no write outside the writable set; the specified cure was possible at the bytes
and was landed as specified (the C-6 arm chosen is the spec's first-named arm).

**Index hygiene**: ⟨cmd⟩ `git show --stat --format=%H f9e15f8e` → 2 files (the two shared files);
`f77b152d` → 4 files (`KeyframeTimeline.vue` · `TimelineTrack.vue` · `timelineTypes.ts` ·
`timelineEngine.ts`), nothing else — a sibling seat's dirty `ChannelControls.vue` (` M`, appeared during
this unit; KF.W6's in-flight work) and the two untracked `VALUEJS-INBOUND-*.md` survivors were **never
staged**; `scripts/dev/dev.sh` in **zero** commits, either repo; no `git add -A`/`-u`, no `commit -a`, no
reset/unstage of another seat's paths; kf HEAD moved under this unit (`77d0e0b1` → `252a8248` → mine),
each of my commits made on the then-HEAD with its own pathspec. The record was re-read (⟨`wc -l`⟩ → 713,
last entry `### X.KF.W7.c`, clean) immediately before this append.
