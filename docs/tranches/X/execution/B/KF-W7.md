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

---

### X.KF.W7.e

SERVED MODEL: claude-opus-5[1m] · **2026-09-18** · Phase 3 implementation seat — timeline head · preview ·
build · dialogs. Sections executed: §Carry **P5** (`:171-181`) · **P7** (`:198-219`) · **P8** (`:220-237`) ·
**P9** (`:238-248`) · §Gates **G6** · **G9** · **G10** · **G15** · **G11** (fixtures 3–4) · §Bounds'
`flattenVars` LAW A census (`:55`). **Status: PARTIAL — G6 RED → GREEN · G15 RED → GREEN (byte half) ·
G11 fixtures 3–4 LANDED; G9 and G10 ESCALATED, un-landable by ANY seat of this wave** (evidence:
`evidence/W7/G9-G10-FILE-CROSSING-ESCALATION.md`). Writable set honoured on every commit — **no write outside
it**; the one escalation is a cure this seat could not lawfully reach, not a write it made.

**Substrate at open**: kf `HEAD` = `origin/master` = **`f77b152d`** (`.b`'s seam). Consumed whole before any
byte: `.a`'s G1 (six KEEP-BESPOKE; **SequenceScrubber's shape rows PERSIST**), `.a`'s OP-0/OP-1 settlements,
`.b`'s SEAM-DESIGN (its `.e` residuals R-b1/R-b2/R-b3), `.c`'s G9 · G10 · G14 · G15 rulings. `.d` ran
CONCURRENTLY throughout (its `9f585bee` G8 and `a93bcd37` G13 landed between this unit's commits) — **zero
shared modify paths, and every commit carried its own pathspec.**

**Step 0 (E13, seat-level)**: COHESION §0j re-read to the file end; nothing addressed to KF.W7 beyond standing
law. `INBOX.md`'s three live UNREAD (**I-32 · I-33 · I-34**) reproduce and all three route to X-W0.j, as the
OPEN sweep and KF.W2's CHECK 2 both found; not one names a keyframes timeline byte. **0 new inbound in this
unit's scope · 0 `I-n` minted · no INBOX row added.**

#### Act 0 — the harness, materialized WITHOUT a tracked byte (`.a`'s residual 1)

`.a` left `@vue/test-utils` **in the manifest and not on disk**, owner *"the orchestrator, by one `npm install`
… before `.d`/`.e` dispatch"*. It had not happened, and G11's four fixtures cannot mount without it.
⟨cmd⟩ `npm install --no-save --no-package-lock @vue/test-utils@2.5.1` → installed, **2.5.1**; ⟨cmd⟩
`diff` of `package.json` and `package-lock.json` against copies taken first → **both UNCHANGED**, confirmed
again by `git status --short package.json package-lock.json` → **empty**. This materializes a dependency the
tree already DECLARES (`.a`'s `3a01e362`); it writes no tracked byte, so it widens no bounds and touches no
KF.W0 OWNER'S-HAND row. **Still owed by the orchestrator**: the lockfile entry, via a real `npm install`.

#### Acts, in the order the locks require (one commit per meaning; pathspec ON the commit)

| # | commit | meaning |
|---|---|---|
| 1 | `8cfee94e` | **G11 fixtures 3–4, BEFORE the first cure commit** (the lock). `timeline-hover-preview.test.ts` + `sequence-scrubber-mount.test.ts` — **13 tests, 5 born RED** on the rows they lock, 8 GREEN (the mounts themselves work). |
| 2 | `53abdf29` | **G6 — the round-trip family, ONE commit** (N-8 + C-5 (THP) + R-3). |
| 3 | `f892ce4b` | **L-6/C-4's delegation + C-7's posture + D-15's states** (G14's byte half for the three rows `.c` routed here). |
| 4 | `8ee852b9` | **G15 — THE FOLD, ONE commit** (R-7 ≡ KAD-F3 with KAD-6 · KAD-13 · R-4 · R-17 · R-19 · R-21 · R-22 · R-23 · KAD-21 · L-16/L-17). |
| 5 | `be82defe` | **P9 — the dead surfaces** (L-13 with its dependent delete in the SAME act · L-14/C-16 · L-12/C-8 · L-8/C-9 · N-9's dead-state arm · N-2's control typed). |
| 6 | `43556828` | **C·C-4** — SequenceScrubber's provider guard (`.a`'s narrowing: one line + the asymmetry declared). |
| 7 | `85b3c8fa` | **m-7/m-8's validation half** (AFTER the delegation, as the lock requires) **+ `.b`'s R-b2 hand-off**. |
| 8 | `4dc92768` (vjs) | **The G9/G10 escalation, measured** — `evidence/W7/G9-G10-FILE-CROSSING-ESCALATION.md`. |
| 9 | (this commit, vjs) | these receipts. |

#### The two ESCALATED gates — stated first, because they size everything else

**G9 and G10 are un-landable by ANY seat of this wave, and the reason is a plan seam, not a design defect.**
`.c` DECLARED the file-crossing at `G10-GHOST-CACHE-DESIGN.md` §6 and asked seat 0 to re-home each family
whole; the Unit plan did not. The result is symmetric and total: **G10's ghost/cache family (this seat's THP ·
KeyframeTimeline · useTimelineBuild) requires four carves in `TimelineTrack.vue`, which is `.d`'s; G9's a11y
family (`.d`'s TimelineTrack) requires one carve in `TimelineHoverPreview.vue`, which is this seat's.** Both
families are LOCKED WHOLE by the plan's own Locks, `vue-tsc` is live so neither half typechecks alone, and the
derived-projection workaround that would spare `.d`'s file is exactly the legacy-compat shim house law
forbids. **No reduced cure was improvised and no family was split to manufacture a green.** The measurement
that settles it, run twice five minutes apart: **every `TimelineTrack.vue` coordinate MOVED between the two
runs and not one row changed** — `137→143` the `<TooltipContent …class="p-2 max-w-56">` with **no
`:aria-label` in either run** · `140→146` `:preview-src="previewCache[…]"` · `142→148`
`:ghost-style="getGhostStyle(stop.vars)"` · `177→184` the prop declaration · `232→270` `getGhostStyle`;
`@focus` and `role="group"` absent in both. A sibling seat was writing that file while this seat read it.
**The cure, for seat 0 / `.f`: ratify `.c`'s §6 — re-home each family WHOLE to one seat and serialize.** Two
of G10's obligations are ALREADY discharged and must not be re-spent (the capture re-point and the
parse-boundary validation, both at `85b3c8fa`); what remains is exactly `.c`'s §1, §2 and §3. The four G10
assertions are written out **verbatim in the fixture's own header**, at the mount they belong to —
**STATED, never `test.skip`'d.**

#### G6 — the round-trip, and a banked claim REFUTED at the frontier

**MEASURED CORRECTION (D-19).** N-9's *"`importCSSToTimeline` DROPS per-stop `animation-timing-function`"* is
**FALSE at these bytes**. Probe, double-run: `@keyframes p { … 50% { opacity: 0.5; animation-timing-function:
ease-in; } … }` → the import carries `"animation-timing-function": "ease-in"` in that stop's `vars`, and the
export re-emits `50% { opacity: 0.5; animation-timing-function: ease-in; }` **verbatim**. The per-stop easing
already survives; what is true is the **dead `TimelineKeyframe.easing?` field**, and `timelineTypes.ts` is
`.b`'s serial file, not this seat's → routed. G6's assertion is therefore met clause by clause:

- **per-stop easing survives** — by measurement, above (no cure was needed or spent);
- **named phases render as named** — C-5 (THP): the caption was `Math.round(percent)%` for every keyframe, so
  `entry 100%` and `cover 0%` both read *"25%"*, a percent the author never wrote. It now renders the AUTHORED
  form with the resolution secondary, and a percent selector renders once. Three fixture tests, GREEN;
- **"Add" does what the copy says** — R-3: `mergeCSS` folds pasted stops in by the engine's own selector key,
  later declarations winning (`coalesceKeyframes`' rule), new selectors appended. Probe: import `0%`+`100%`,
  then Add `50% {color:red}` + `100% {transform:scale(2)}` → **3 keyframes**, the `100%` stop carrying BOTH
  `opacity` and `transform`; nothing destroyed. Before the cure the same gesture left **2**;
- **"animate to none" is authorable** — N-8: `captureSnapshot` dropped `none`/`auto` over a set holding
  `transform`/`filter`/`box-shadow`. Measured FIRST that the compile accepts `transform: none` · `filter:
  none` · `box-shadow: none` · `width: auto` (4/4 OK), then widened the filter to skip only genuinely empty
  values. Probe on a bare `<div>`: `{"transform":"none","opacity":"1","filter":"none"}`. P7's K-4 kill stands
  — the surviving set only grew.

**G6: RED → GREEN.** Evidence is by-command (double-run) plus fixture 3's five caption tests. **Residual**: a
durable engine-level round-trip CORPUS file has no owner in this wave's four-fixture allocation → `.f`/KF.W8.

#### G15 — the fold, landed as ONE commit

`.c` RULED it; this seat wrote it. The shell survives and the twin becomes a thin adapter: `CSSPasteDialog.vue`
**80 → 138 L** (template 27 → 50: the `trigger` slot, the error node, the busy/disabled primary),
`KeyframesAddDialog.vue` **161 → 142 L** with its **template 55 → 23** and 161 lines of re-authored shell gone.
**Its mount contract is byte-identical** (`v-model:open` · `v-model:text` · `:format` · `@submit`), so
`KeyframesEditor.vue` — its one live consumer, OUTSIDE §Bounds — needed **no edit, no repoint, no delete**;
LAW A's census is honoured by leaving the import where it is.

**L-4's falsifier, re-read at the settled bytes**: ⟨cmd⟩ `git grep -ln 'useCodeHighlight(' HEAD -- demo/` →
**three files = the two consumers (`KeyframesEditor.vue`, `KeyframesAddDialog.vue`) plus its own definition**,
exactly `.c`'s §0 count. The adapter closes over `shell.value?.textEl`; the `<pre>` identity is held by the
shell and published through the seam R-19 called dead. ⟨cmd⟩ `git grep -n 'initialText' HEAD -- demo/` → **one
hit, inside the shell's own doc comment explaining what replaced it** — the prop is gone.

Folded in the same act because they ARE the shell's contract: KAD-6 (the `<h2><h3/><p/></h2>` dies with KAD's
template) · KAD-13 (`reformat` now EMITS the formatted text instead of secretly writing the parent model) ·
R-4 + KAD-10 (G14 P2: awaitable `submit` — resolve closes, reject keeps the dialog open with the message
beside an **untouched draft**, `void` leaves the close to the consumer, which preserves the adapter's parent
contract by construction; `:loading` while in flight) · R-17 (an empty draft disables the primary) · R-19 ·
R-21 (`cn` merges) · R-22 · R-23 (Mod+Enter) · KAD-21. `importCSS`/`mergeCSS` now **REJECT** rather than
toasting their own parse failure — that internal catch is what made the dialog close on a failure and destroy
the paste. **§Excluded KAD-15 · KAD-16 · KAD-20 are NOT cured here**, by id: the progress bar rides
`footer-extra` unchanged, KAD's footer tokens die with its template (W6's cells for them are MOOT, as `.c`
declared), and the well's empty state stays the S-9 swap's.

**Dated deviation, beside `G15-FOLD-RULING.md` §1's L-16/L-17 row**: the two timeline mounts became the in-file
`v-for` over a descriptor in the FOLD commit rather than the P9 commit — the fold had to rewrite both mounts to
carry `:submit` and `v-model:text`, and writing them twice would have been churn. The cure-shape lock is
honoured: **an in-file `v-for`, no new component** (`feedback_kiss_no_contrivance`).

**G15 byte half: RED → GREEN.**

#### G14's byte half (the three rows `.c` routed to `.e`) and P9

**L-6/C-4 — DELEGATED.** The hand-rolled declaration scanner inside a CSS engine's own demo is gone;
`@mkbabb/value.js/css` parses the block and `serializeCssValue` emits it — **the same pair `timelineEngine`
already used**, so the TYPING ingress and the IMPORT ingress finally agree about what a declaration is. ⟨cmd⟩
`git grep -c 'value.js/css' HEAD -- KeyframeTimeline.vue` → **2** · `split("\n")` → **0**.

**C-7 — the posture, at the seam that convicts it.** The façade **THROWS** (rather than returning a
diagnostic) on `oklch()` at this live untrusted ingress, re-measured here; the crash IDENTITY stays folded to
megatranche R1 and is never re-booked — what books here is that the throw is now SURFACED in place, the draft
survives, and **nothing is assigned**. `rebuild` no longer terminates in `console.error` alone: it publishes
`buildError` and toasts with a Retry (★ S-7's shape, not a new helper). Probe: the legacy `rgba(0, 0, 0, 0)`
form `.b` found refused → `buildError` = *"Invalid CSS value for \"backgroundColor\" at 0-16: expected
scalar."*, and it CLEARS on the next good build.

**D-15 — three rendered states** (G14 P4b): empty (naming both entry gestures), single-frame, and
rebuild-failed with its message and a Retry.

**P9.** L-13's two-part delete landed as **ONE act**: `loadPreset` had zero callers and was the sole consumer
of all 33 lines of `flattenVars.ts`, and its re-export at `useTimeline` went with them — a lone `flattenVars`
delete would have left `loadPreset` uncompilable. **LAW A re-run at the settled bytes**: ⟨cmd⟩
`git grep -n '\bflattenVars\b' HEAD -- demo/ test/ src/ scripts/` → **0** (was 4); `loadPreset` → **0**;
⟨cmd⟩ `git ls-tree` on the utils dir → **`snapshotCapture.ts` · `timelineEngine.ts`**, two files.
L-14/C-16: `captureNonDefaultSnapshot` is **DELETED rather than adopted** — adopting it would silently change
what `snapshot()` captures and no row rules that. L-12/C-8: the published contract is the **SEVEN verbs its
consumers actually call**, measured (`RibbonBar` takes four, `useControlsKeyboardShortcuts` three);
`selectedKeyframeId`, `canUndo`, `canRedo` were published and taken by nobody. L-8/C-9: one removal verb, and
the `!` goes with the divergence. N-9's dead-state arm: `isPlaying` and `clearHistory` gone.
**Timeline-scoped `error TS`: 2 BEFORE → 0 AFTER.**

#### `.b`'s hand-offs and `.a`'s `.e` note

- **R-b2 — TAKEN (`85b3c8fa`).** After the G2 seam the engine paints the detached preview subject, so
  `scrubAndCapture` screenshotting `targets.value[0]` returned the SCENE's untouched pose at every percent —
  the same picture N times. The capture follows the engine's own binding (`animation.value?.targets[0]`), with
  `targets[0]` kept for the pre-build state where nothing has been scrubbed at all.
- **m-7/m-8's validation half — TAKEN (`85b3c8fa`), after the delegation as the lock requires.**
- **R-b1 (the `useTimeline` source/subject split) and R-b3 (the L-5 generation counter) — NOT TAKEN**: both
  need `timelineEngine.ts`'s signature, which is `.b`'s serial file. The G2 invariant already holds
  synchronously at the owner, so nothing is unsafe; the split is a terminal shape → routed.
- **`.a`'s `.e` note — SequenceScrubber's shape rows PERSIST**: C·C-4's narrowed cure landed (`43556828`).

#### Gate readings BEFORE → AFTER (settled bytes, double-run — ⟨`diff run1 run2`⟩ → no output)

| gate | BEFORE (this record's Baseline) | AFTER | witness |
|---|---|---|---|
| **G6** | **RED** — four leaves | **GREEN** | easing survives (measured, the DROP claim refuted) · named phases render as named (`authoredSelector`, 2 hits in THP; 5 fixture tests) · Add merges (probe: 2 → 3 keyframes, the shared stop carrying both declarations) · none/auto authorable (`value !== "none"` → **0** occurrences in `snapshotCapture.ts`) |
| **G15** | **RED** — 80 / 161 L, two shells | **GREEN (byte half)** | one shell; the twin is a 23-line template over it; `useCodeHighlight(` → 2 consumers + 1 definition; `initialText` → 1 hit, a doc comment; mount contract byte-identical, `KeyframesEditor.vue` untouched |
| **G11** | **RED** — leg (i) **0 hits** | **GREEN for fixtures 3–4** (and leg (i) now names **all four**) | ⟨cmd⟩ `git grep -ln "TimelineHoverPreview\|previewCache\|SequenceScrubber" HEAD -- test/` → `sequence-scrubber-mount.test.ts` · `timeline-hover-preview.test.ts` · `timeline-mount-keyboard.test.ts` · `timeline-mount-projection.test.ts` — **four files and only those four**; **none of the twelve tracked files edited** |
| **G9** | **RED** | **RED — ESCALATED** | `<TooltipContent>` still carries `class="p-2 max-w-56"` and **no `:aria-label`**; no `role="group"` on the track container; no `@focus`; no `describeKeyframe` — all `.d`'s bytes, and THP's register carve is this seat's, so **neither seat can land the family** |
| **G10** | **RED** | **RED — ESCALATED** | `previewCache` still a write-once map (`delete previewCache` → **0**); `getGhostStyle` still composes `scale(0.3) …` onto the plate; THP still takes `ghostStyle` — the four cure carves are `.d`'s |

**Typecheck**: ⟨cmd⟩ `npm run check 2>&1 | grep -c 'error TS'` → **56**, of which **0** are in any file this
unit owns (the two that WERE — `KeyframeTimeline.vue`'s `Input` TS2379 and `snapshotCapture.ts`'s TS6133 —
are both cured). The 56 are the frontier's, chiefly `OrbitalDrag.vue` (24) under KF.W6's in-flight dirty
`CubeScene.vue`. **Tests**: ⟨cmd⟩ `npx vitest run --project demo` → **35 files · 233 tests · ALL PASSING**
(including `.d`'s two fixtures and the read-only witnesses `timeline-undo.test.ts` ·
`value4-editor-boundary.test.ts` · `resize-tracks.test.ts`, unedited); ⟨cmd⟩ `--project library` →
**112 passed · 5 skipped · 1256 tests**.

#### Findings routed (measured; owner named; neither cured nor worked around here)

1. **The value.js `/css` grammar does not treat comments as trivia inside a declaration list.** Probed at
   four positions, double-run: `/* hi */ a{…}` and `a{…} /* hi */ b{…}` parse correctly, but
   `a{/* hi */opacity:0.5}` yields a declaration whose **NAME** is `"/* hi */opacity"`, `opacity: /* x */ 0.5`
   yields the VALUE `"* x * / 0.5"`, and inside `@keyframes` the declaration is **dropped entirely**. This is
   the sibling of `.b`'s legacy-`rgba` finding. **Owner: the value.js library band** (→ `.f`'s relay + KF.W10).
   Defended at the boundary meanwhile by m-7/m-8's name validation — surfaced, never silently written.
2. **`@vue/test-utils` is still absent from `package-lock.json`** (`grep -c` → 0). This unit materialized it on
   disk without a tracked byte (Act 0); the lockfile entry is still **the orchestrator's**.
3. **`TimelineKeyframe.easing?` is dead** (never written, never read) — `timelineTypes.ts` is `.b`'s serial
   file. Owner: KF.W8 or a re-homed act.
4. **KF-AV-17's resize-immune playhead form** — the overshooting `translateX(calc(p * 100cqw))` is still live
   at `SequenceScrubber.vue`'s `.scrub-ball` binding. It is a P4 GEOMETRY row under OP-3's re-derivation lock
   and P4 is not this unit's section; **not improvised**. Owner: `.d` / `.f`.
5. **`updateKeyframeProperty` (banked DEAD) and `addKeyframe`** are re-exported by `useTimeline` but defined in
   `useTimelineOps.ts` — `.d`'s file — so their re-export was left rather than orphaning an exported function
   in a file this seat cannot edit. Owner: `.d` / KF.W8.
6. **`be82defe`'s message lost one backticked token** to shell expansion (*"Timeline-scoped  count"* should
   read *"Timeline-scoped `error TS` count"*). Recorded here rather than amended: the figure it states —
   **2 BEFORE → 0 AFTER** — is correct and is re-measured above.

#### Escalations

**ONE, and it is G9 + G10 together** — the `.d`/`.e` file-crossing, stated in full above and in
`evidence/W7/G9-G10-FILE-CROSSING-ESCALATION.md`. Every OTHER specified cure was possible at the bytes and was
implemented as specified. **No write outside the writable set was attempted or made.**

#### Index hygiene

Every commit carried its own pathspec ON the commit; ⟨cmd⟩ `git show --stat --name-only` on all seven kf
commits returns **only files from this unit's writable set** (2 · 5 · 3 · 4 · 5 · 1 · 2 files). No
`git add -A`, no `-u`, no `commit -a`, no reset or unstage of another seat's paths. ⟨cmd⟩
`git log --format=%h 8cfee94e^..HEAD -- scripts/dev/dev.sh | wc -l` → **0**. `.d` committed twice into this
worktree mid-unit and KF.W6's dirty tracked files sat beside mine throughout; **none was ever staged**. The
record was re-read (⟨`wc -l`⟩ → 814, last entry `### X.KF.W7.b`, clean) immediately before this append.

---

### X.KF.W7.d

SERVED MODEL: `claude-opus-5[1m]` · **2026-09-18** · Phase 3 implementation seat — **TRACK · CARET ·
ZOOM/PAN · THE IDIOM**. Sections executed: §Carry **P3** (`:149-156`) · **P4** (`:157-170`) · **P5**
(`:171-181`) · **P6** (`:182-197`) · the P0 **KF-AV-10** row (`:122`) · §Gates **G3 · G4 · G7 · G8 ·
G13 · G11** (fixtures 1–2) · §Bounds' idiom carve rows (`:67-69`). **Status: DONE — G3 · G4 · G7 ·
G8 · G13 RED → GREEN; G11's two fixtures EXIST, MOUNT and RUN.** Writable set honoured: **no write
outside it → no escalation.**

**Consumed before the first byte**: `.a`'s G1 (six KEEP-BESPOKE; **KF-AV-10 LIVE, NOT spent-unused**;
C-10 ruled; both triggers ARMED) and OP-0/OP-1; `.b`'s `SEAM-DESIGN.md` **§4.1–§4.4** (the designs
this seat implements) and its §7 addendum; `.c`'s **G14** ruling (P4(a) binds L-15; P3 binds L-11
(KeyframeTimeline)). COHESION §0j + §0k..§0n re-read — nothing addressed to KF.W7 beyond standing law.

**Step 0 (E13, seat level)**: ⟨cmd⟩ `/usr/bin/find <the four paths> -maxdepth 1 -name '*.md'
-newermt '2026-09-18 01:00'` → **`INBOX.md` alone** (self). The only BK-side delta since `.b`'s sweep
is **our own** `valuejs-outbound-2026-09-18-kfw6-bh-relay.md`, rowed by that seat. **0 new inbound in
KF.W7's scope · 0 `I-n` minted · no INBOX row owed by this unit** (`INBOX.md` is `.f`'s surface).

#### Act 0 — the measurement that unblocked G11, and made two escalations unnecessary

`.a`'s residual 1 (`@vue/test-utils` in the manifest, **not on disk**) and `.b`'s §7.2 (SFC mounts
cannot resolve glass-ui under this repo's `vitest.config.ts`) both predicted G11 unrunnable for this
seat. **Both were re-measured at the bytes rather than inherited, and neither blocks these two
fixtures.**

- ⟨cmd⟩ `ls -d node_modules/@vue/test-utils` → **No such file or directory** — the residual STANDS,
  and is **not needed**: the repo's own interaction-gate idiom is a plain `createApp` host attached
  to `document.body` (`test/demo/instrument/kf-toolbar-keyboard.test.ts`, whose docblock says *"vitest
  has no Vue-SFC plugin, so the composable … is exercised through a representative host"*). **KF.W4's
  commit 2 retired that premise**: with `plugins: [vue()]` registered, `createApp` mounts the REAL
  SFC. No devDependency of this seat's is required, and none was added.
- ⟨cmd⟩ (probe, first version of fixture 1) importing `TimelineTrack.vue` → *"Cannot find package
  '@mkbabb/keyframes.js' imported from …/@mkbabb/glass-ui/dist/useSpring-BCHxLjwv.js"* — **`.b`'s
  §7.2 reproduces exactly.** The cure is neither a `vitest.config.ts` write (STRUCK at §Bounds), nor
  a `vi.mock` of the producer, nor a node_modules patch — each of those is the masking class. It is
  the **import specifier**: ⟨cmd⟩ `node -e` walking `dist/tooltip.js`'s transitive bare imports →
  **`reka-ui`, `vue`** and nothing else, against the root barrel's `useSpring` chunk; and ⟨cmd⟩
  `grep -rn 'from "@mkbabb/glass-ui' demo test | sed 's/.*from //' | sort | uniq -c` → **6** demo
  call sites already import **`@mkbabb/glass-ui/tooltip`**. Narrowing `TimelineTrack.vue`'s tooltip
  import to the published subpath is the house idiom, shrinks the runtime import graph, and lets both
  fixtures mount **the real glass `Tooltip`**, not a stub. **G11's mounts cost this wave nothing.**

#### Acts, in order (one commit per meaning; pathspec on the commit itself)

| # | commit | meaning |
|---|---|---|
| 1 | `69e8ead4` | **G11 — the two fixtures, born RED, before the first cure commit** (§Sequencing 3's commit scope). `timeline-mount-projection.test.ts` (330 L) + `timeline-mount-keyboard.test.ts` (448 L at landing), plus Act 0's one-line import narrowing. **17 assertions RED**, and the two halves already landed by `.b` **GREEN BEFORE CURE** (the pointer policy; the G5 stop partition rendering one marker for two same-key keyframes and dragging it as one). |
| 2 | `7225cdd1` | **G3 — grabDx + L-m-14, ONE family** (`TimelineTrack.vue`). |
| 3 | `98be70f5` | **G4 — the dirty check + the ONE rAF latch** (`useTimelineOps.ts`), with L-m-14's *surface the miss* half. |
| 4 | `e42e0aa3` | **G7 — the caret: compare-before-commit, MODEL precision, the identity/focus contract** (`TimelineCaret.vue` + the track's listener rename). Carries L-2/C-3/D·M-4 · MISS-α4 · m-1/L-10 · MISS-α2 · m-5/L-6/C-5 · m-4/MISS-α1 · L-9/m-8 · **C-10** (G1's ruling) · **L-15 under G14 P4(a)**. |
| 5 | `9f585bee` | **G8 — keyboard parity, non-destructive** (`TimelineTrack.vue` + `useZoomPan.ts`): D-1's rail route, M3's Enter/Space, D-8's `data-state`, D-11's keyboard zoom arm. |
| 6 | `a93bcd37` | **G13 — the wheel policy, FOUR CLAUSES IN ONE COMMIT** (`TimelineTrack.vue` + `useZoomPan.ts` + `TimelineCaret.vue`), with L-m-10 and D-11's reserved mount. |
| 7 | `21267b91` · `22629e0f` | **OP-3 / D-19 — the geometry re-derivation, BEFORE any P4 cure** (value.js evidence + its dated §4 erratum). |
| 8 | `aa3d4092` | **P4 — ONE geometry pass** (RR-B missed-5 · M1 · D-m2 · D-14/i-1 · D-17 · C-9 (TimelineCaret) · D-4). |
| 9 | `8146cc5a` | **P5 — D-12 (KeyframeTimeline) + RR-A missed-2**, one element, one commit. |
| 10 | `72cdc27a` | **KF-AV-10 + m-8 — the idiom family**, VERDICT-ADMITTED by `.a`'s G1 (`AnimationVisualizer.vue` · `SpringTarget.vue` · `SpringPhysicsFacet.vue`). |
| 11 | (this commit) | these receipts. |

#### Gate readings BEFORE → AFTER (settled bytes; measurement script double-run, `diff run1 run2` → **DOUBLE-RUN IDENTICAL**)

| gate | BEFORE (this record's Baseline) | AFTER | witness at the settled bytes |
|---|---|---|---|
| **G3** | **RED** — `onMarkerPointerDown` records no offset; `:174-178` emits the ABSOLUTE pointer percent | **GREEN** | `grep -c 'grabDx' TimelineTrack.vue` → **4**; `grep -c 'sortedKeyframes.some' …` → **1**. **Executed**: grab a 50% marker at **+11px** on a 400px rail ⇒ first `pointermove` at the same `clientX` emits **`["a", 50]`**, not `52.75`; +50px ⇒ **62.5**; a mid-drag delete ⇒ **no further emit** and `hasPointerCapture(1)` → **false** |
| **G4** | **RED** — `moveKeyframe` calls `rebuild()` unconditionally, no early-out on zero clamped delta | **GREEN** | `grep -c 'scheduleRebuild'` → **6**; bare `rebuild();` call sites → **0**; the dirty check → **1**. **Executed**: 60 moves in one frame ⇒ **0** builds during it, **1** rAF latched, **1** build on the frame; a rail-end hold of 60 moves ⇒ **0** scheduled, **0** built, and `JSON.stringify(state.keyframes)` **byte-identical** (hence zero `useRefHistory` entries) |
| **G7** | **RED** — `@blur` alone commits, no compare; `Math.round` at three sites | **GREEN** | live `Math.round` in `TimelineCaret.vue` → **0** (the one hit is the comment naming the cured defect); `raw === openedWith` → **1**; `commitPercent` → **2** in the caret, **1** in the track. **Executed**: display of a 42.4 model reads **"42.4%"**; open+blur ⇒ **0** commits and the display returns unchanged; a typed 43 + Enter ⇒ **exactly one** commit; Escape after typing 77 ⇒ **none** |
| **G8** | **RED** — Enter/Space discarded, `select` only paired with `moveKeyframe`; no keyboard zoom/pan route; keyboard snapshots at 0% | **GREEN** | rail `role="slider"` + `tabindex="0"` + `aria-valuenow`/`aria-valuetext`; `onTrackKeydown` → **2**; `data-state` → **1**. **Executed**: Arrow ⇒ **0.01**, Shift-Arrow ⇒ **0.11**, Home ⇒ **0**, End ⇒ **1**, PageDown ⇒ **0.9**; a handled key is `defaultPrevented`, an unrelated key is not; a marker keystroke emits **0** scrubs; **Enter and Space select with ZERO `moveKeyframe`**; the selected marker carries `data-state="selected"`; argless `snapshot()` at `scrubT = 0.42` lands a keyframe at **42%** |
| **G13** | **RED** — `@wheel.prevent`; neither branch matches a plain wheel; `touch-none`; `deltaY` only; the pan readout inert | **GREEN** | live `@wheel.prevent` → **0**, `onTrackWheel` → **2**, `event.deltaX` in `useZoomPan` → **1**, live `touch-none` → **0** / `touch-pan-y` → **1**, `role="scrollbar"` → **1**, `onEditorWheel` → **2**, live `trackEl.value!` → **0**. **Executed**: a plain wheel is **NOT** `defaultPrevented`; ctrl-wheel **is**, and zooms; shift-wheel pans on **deltaY** and again on **deltaX-only**; ArrowRight on the pan bar moves the thumb; `+` on the rail zooms; a ctrl-wheel over the OPEN caret editor leaves the zoom readout **byte-identical** |
| **G11** (fixtures 1–2) | **RED** — leg (i) `git grep … -- test/` → **0 hits**; no test named the surface | **GREEN for this seat's half** | leg (i) at HEAD → **11 hits**, all inside this seat's two fixtures and `.e`'s two; ⟨cmd⟩ `npx vitest run --project demo <both files>` → **23 tests passed (23)**. **Fixture 3/4 are `.e`'s**; the gate is read whole at `.f` |

**The whole suite, at the settled bytes**: ⟨cmd⟩ `npx vitest run --project demo` → **35 files · 233
tests passed**; ⟨cmd⟩ `npx vitest run --project library` → **112 passed | 5 skipped · 1256 passed |
3 expected fail | 14 skipped**. **The twelve tracked `test/demo/instrument/` files are UNTOUCHED** —
⟨cmd⟩ `git diff --name-only 69e8ead4~1..HEAD -- test/demo/instrument | grep -v timeline-mount | wc -l`
→ **0**: no gate here was greened by editing a witness.

**Typecheck (OP-2 is live)**: ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json` → **56** errors, **0** of
them in this unit's seven files (run twice, identical); ⟨cmd⟩ `npx tsc --noEmit -p tsconfig.test.json`
→ **0** hits for either fixture. `npm run check`'s first leg is RED on the frontier's pre-existing
errors and on sibling seats' in-flight files (`KeyframeTimeline.vue`, `snapshotCapture.ts` — `.e`'s
own rows), so the count is published **scoped**, per LAW D(3), rather than as a green-or-red claim
this seat cannot honestly make about another seat's bytes.

#### Findings (measured; owners named; no cure spent outside bounds)

1. **`.a`'s residual 1 and `.b`'s §7.2 do NOT block this seat's fixtures** (Act 0). The mount needs
   no `@vue/test-utils`, no `vitest.config.ts` byte and no producer mock. **The install residual
   still stands for any fixture that wants `@vue/test-utils` specifically** — owner unchanged (the
   orchestrator) — but **G11 is no longer hostage to it**, and `.e`'s two fixtures can take the same
   route. Recorded loud because the wave had two escalations queued against a premise that measurement
   dissolved.
2. **The D-19 lock's collapsed clearance cell does not reproduce, and the reason is now named**
   (`evidence/W7/D-19-GEOMETRY-REDERIVATION.md` §2 + §4): the padding-box correction shifts the
   diamond's centre and the caret's top by the same 1px and **cancels in their difference**, so the
   banked `2.69` is the UNSELECTED clearance and **verifies at these bytes** (`2.686`), while K-13's
   `≈1.7` is reproduced by no combination of the measured inputs. **The banked expanded vertex
   `84.2132` reproduces EXACTLY.** Nothing in the cure depends on the unreproduced cell — it is
   computed against the selected vertices, which do reproduce.
3. **`--caret-offset: 14px` clears NOTHING when the rail is expanded**: the selected diamond reaches
   `84.21px` against the caret's `77px` — a **7.21px** occlusion, plus a hit-steal (the marker carries
   `z-controls`, the caret carried no stacking). The token lives in `demo/styles/layout.css`, **outside
   §Bounds**; the rail therefore declares a scoped `--timeline-caret-offset` that falls back to it,
   and the global token is **not touched**. Owner of any global re-tuning: the layout-token owner,
   named here rather than pre-empted.

#### Residuals, each with a named owner

1. **RR-A missed-1 (TimelineTrack)** — the rail's accessible container (`role="group"`/`aria-label`)
   and the AT-hidden tick labels are in **this seat's file** but belong to **G9's a11y commit family**
   (MISSED-1 + D-10 (KeyframeTimeline) + M7 + RR-A missed-1), which §Sequencing declares MUST NOT
   SPLIT and which is **`.e`'s gate**. This seat did not split it. **Owner: `.e` / seat 0** — the
   phase-3 file-crossing `.c` raised as its residual 3 is REAL and is now witnessed from the other
   end: `.e` cannot write `TimelineTrack.vue` under this plan's writable sets.
2. **The expanded-timeline settlement** (D-10 (TimelineTrack, expanded mode) + RB-7 + D-16 +
   kf-ChannelControls C-8/D-6 + KT D-7) — one settlement across `RibbonBar.vue` and
   `ChannelControls.vue`, **both outside every KF.W7 writable set**. Not spent. **Owner:
   NO-WAVE-OWNER / the expanded-timeline spec family**, per §Sequencing item 8.
3. **ARB-1's auto-pan** (INFO) — the blind drag zone past the window edge. **Its precondition is now
   met**: a pan WRITER exists (G13's `panBy`/`panTo`), which the row said the cure needed. The cure
   itself is not spent. **Owner: KF.W9/SS-13's probe roster → the successor formation.**
4. **m-8's fourth anchor authoring** (`.preset-ball`, `SpringPhysicsFacet.vue`) — three of four are
   one rule now; the fourth is in another component's scoped block, and sharing it means hoisting the
   x-anchor into `design-idioms.css`, **whose KF.W7 carve is stated not to widen** and whose seven
   consumers would each have to survive the hoist (**kf-EasingTarget P-2**: the idiom leaves
   `transform` — and the x-anchor — unclaimed BY DESIGN; *"one tidy-up would drop 28 balls out of
   their rails"*). **DECLARED in the file** rather than unified silently. **Owner: the idiom's owner
   (KF.W6's `design-idioms.css` surface) / KF.W10's ledger.**
5. **D-3's SC 2.5.8 target-size arm** (the 40×20px caret editor) — deliberately NOT enlarged: the
   caret and diamond spacing circles already intersect (**D-12/C-12/i-2**, RR-A's MAJOR preserved in
   dissent), so growing the editor without the marker-vs-marker spacing decision trades one 2.5.8
   failure for another. **Owner: `.f`'s close residuals / KF.W10**, with the three reopening probes
   (SS-13 residue 1, 2, 6) unchanged.
6. **RR-A missed-3's cure rode commit 6, not a P5 commit** — the rail's `transition-all duration-fast`
   (which eased the 80px `h-12↔h-32` height while every mark SNAPPED) became `transition-colors` in
   the same edit that replaced `touch-none`, because both are one class string. **Disclosed rather
   than re-attributed**: the row is cured, and it is cured one commit away from the family the
   Commit-families list would have put it in.
7. **`@vue/test-utils` remains in the manifest and off the disk** — `.a`'s residual 1, owner
   unchanged (the orchestrator). **No longer a G11 blocker** (finding 1).

#### Escalations

**NONE.** No write outside the writable set was attempted. Every specified cure was possible at the
bytes and was implemented as specified; where a cure's natural home lay outside the carve (the
`--caret-offset` token, the idiom's x-anchor, the expanded settlement, G9's a11y family), the seat
**stopped at the bound and named the owner** rather than widening it.

#### Index hygiene

Every commit carried its own pathspec **on the commit itself**; ⟨cmd⟩ `git show --stat --format= <sha>`
for all nine kf commits shows **only this unit's writable files** (three commits touch a fixture, six
touch product files; none touches a tracked witness). ⟨cmd⟩
`git log --format=%h 69e8ead4^..HEAD -- scripts/dev/dev.sh | wc -l` → **0**. `.e`'s seven commits and
KF.W6.d's four interleaved with mine in this shared index throughout and **not one of their paths was
ever staged by this seat**; no `git add -A`, no `-u`, no `commit -a`, no reset or unstage. The record
was re-read (⟨`wc -l`⟩ → **1038**, last entry `### X.KF.W7.e`, clean) immediately before this append.

---

### X.KF.W7.f

SERVED MODEL: `claude-opus-5[1m]` · **2026-09-18** · Phase 4 — **CLOSE + BH RELAY (serial, last)**.
Sections executed: §Verdict Protocol's **rider mechanics** (`:103`) · §Sequencing's **cross-edges**
(`:349-362`) — → KF.W10 · KF.W11 arm (d) · KF.W13 · **glass-ui BH relay (SS-6)** · KF.W9/SS-13 ·
§Gates **all fifteen, re-run BEFORE → AFTER** · §Excluded (`:369-382`).
**Status: DONE for this unit — every one of the brief's seven items executed, no write outside the
bound.** **The WAVE closes PARTIAL (`complete_with_misses` in shape): twelve gates GREEN · two
ESCALATED RED (G9 · G10) · one GREEN-as-a-ruling with one consumer byte outstanding (G14 / L-11).**
This seat **cured nothing and stamped nothing the units did not earn**; it wrote **zero keyframes.js
bytes** and **zero glass-ui bytes**.

**Ref of record at close**: keyframes.js `master` ≡ `origin/master` ≡ **`3cc7e126`** (pushed by this
seat; see Act 6). The gate re-run below was executed at **`e64103be` → `7b721d10` → `3cc7e126`** and
**every reading is identical across all four runs** — the only lines that moved are the two that print
the ref. **The three commits that landed under this seat mid-run are KF.W6 `.d`'s and touch
`ChromeDock.vue` and `MbabbMenu.vue` alone**: ⟨cmd⟩ `git diff --name-only e64103be..3cc7e126 -- <the
nine KF.W7 bound paths>` → **0**. A sibling writing beside a close seat is the condition §Bounds' own
witness-freshness invariant was written for, and it is discharged by measurement, not by assertion.

#### Step 0 — E13, the four-path close sweep (brief item 5)

Swept read-only at this seat's own clock (**01:36 EDT**), delta against **01:00 EDT** (`.d`'s
seat-level sweep), classification from each row's **status cell**, never from a bare `grep -i unread`;
`INBOX.md` **self-excluded** (SELF-COUNT law). ⟨cmd⟩ `ls -dlt ../glass-ui/docs/tranches/*/ | head -3`
→ **`BK`** (Sep 17 20:15) · `BJ` (Aug 3) · `BI` (Jul 28); ⟨cmd⟩ `ls -d …/tranches/*/ | wc -l` → **45**
— BK is still the live tranche by both name and mtime. ⟨cmd⟩ `/usr/bin/find <each of the five
surfaces> -maxdepth 1 -name '*.md' -newermt '2026-09-18 01:00'` → **`INBOX.md` alone** (self); nothing
on `docs/tranches/V/`, nothing in `../glass-ui/docs/tranches/BK/coordination/`, nothing in
`../keyframes-v-exec/…/coordination/`, nothing in `../keyframes.js/…/coordination/` (READ-ONLY /
NEVER-DELIVER), nothing in `../sci-report/atlas/docs/tranches/P/coordination/`.
**0 unrowed · 0 new `I-n` minted · 0 UNREAD in KF.W7's scope.** The three live UNREAD cells —
**I-32 · I-33 · I-34** — reproduce and **all three route to X-W0.j / the X formation mail seat by their
own Routing cells**; not one names a keyframes timeline byte. **E13 is MET by routing, and this wave
does not close with UNREAD mail in its scope.** One row was ADDED by this seat — **`O-28`** — and the
sweep line is appended at the ledger's foot (append-only: ⟨cmd⟩ `git diff --numstat` for `INBOX.md` →
**3 insertions, 0 deletions**).

#### Act 1 — THE FIFTEEN GATES, RE-RUN AT THIS SEAT'S OWN COMMANDS (brief item 1)

One script, run **four times** across three refs; ⟨cmd⟩ `diff run2 run3` → **no output**, and
`diff run3 run4` modulo the two ref lines → **no output**. **DOUBLE-RUN IDENTICAL.** BEFORE is this
record's own **Baseline** (banked READ-ONLY at `ae83da07`, fifteen RED, 0 GREEN-BEFORE-CURE); AFTER is
read from the settled bytes by this seat, never from a unit's transcript.

| gate | BEFORE (this record's Baseline) | AFTER (this seat) | the witness this seat measured |
|---|---|---|---|
| **G1** verdict table exists | **RED** — *"no table exists and 5 of 6 counterparts are not importable"* | **GREEN** | six surface rows present (⟨cmd⟩ grep of the six §Verdict row heads in this record → **6**); `G1-VERDICT-TABLE.md` **432 L**; the importable surface re-measured here — `index.d.ts` **2 L**, the dir **9** files, `SliderVariant = "standard" \| "spectrum"`, demo `/timeline` imports **0** |
| **G2** seam wired/guarded/single-engine | **RED** — bare `scrub` in none of `:78 :83 :197 :202 :224`; `isPrimary\|pointerType` **0**; a second engine over spread scene targets | **GREEN** | ⟨cmd⟩ `grep -n scrub KeyframeTimeline.vue` → **`:99 @update:scrub-t="scrub"`** (the ENGINE, not a bare ref) and **`:273 scrub,`** in the destructure — the two absences the Baseline convicted, both present; ⟨cmd⟩ `grep -c 'isPrimary\|pointerType' TimelineTrack.vue` → **2**; `createPreviewSubject` → **2** in `KeyframeTimeline.vue` + **2** in `timelineEngine.ts`; `setTargets` → **1** (the sync rebind); the engine's own contract docblock at `timelineEngine.ts:50` — *"KF.W7 G2 / C-6 — THE ENGINE NEVER PAINTS THE SCENE"* |
| **G3** a grab is not a teleport | **RED** — `onMarkerPointerDown` records no offset | **GREEN** | ⟨cmd⟩ `grep -c grabDx TimelineTrack.vue` → **4** |
| **G4** rebuild bounded + dirty-checked | **RED** — `rebuild()` unconditional, no early-out | **GREEN** | ⟨cmd⟩ `grep -c scheduleRebuild useTimelineOps.ts` → **6**; the file's **only** bare `rebuild();` is the one **inside the rAF latch** (`:42`), so the latch is the ops layer's sole route — measured, not assumed |
| **G5** UI and artifact agree on count | **RED** — merge loop `:37-47`, both render loops per keyframe | **GREEN** | ⟨cmd⟩ `git grep -n coalesceKeyframes HEAD -- demo/` → the definition `timelineTypes.ts:48`, the build's ONE partition `timelineEngine.ts:69`, the render's ONE partition `TimelineTrack.vue:201`; ⟨cmd⟩ `grep -c 'Merge vars into keyframe' timelineEngine.ts` → **0** (the old loop is gone, not shadowed); both render `v-for`s are **`stop in stops`** (`:107`, `:155`) |
| **G6** round-trip preserves authorship | **RED** — four leaves | **GREEN** | `authoredSelector` → **2** in THP (named phases render as named); ⟨cmd⟩ `grep -c 'value !== "none"' snapshotCapture.ts` → **0** (the none/auto drop is gone); `mergeCSS` reaches **3** modules (Add merges rather than replaces) |
| **G7** a read gesture writes nothing | **RED** — `@blur` alone commits, no compare | **GREEN** | **live** `Math.round` in `TimelineCaret.vue` → **0** — the single `grep` hit is the **docblock at `:99`** naming the cured defect (*"The MODEL's value, not an integer lie"*), read at the bytes and not counted as code; `openedWith` (the compare) → **3** |
| **G8** keyboard parity, non-destructive | **RED** — Enter/Space discarded; no keyboard zoom/pan | **GREEN** | `role="slider"` → **3**; `onTrackKeydown` → **2**; `data-state` → **1** |
| **G9** the tooltip announces what it shows | **RED** | **RED — ESCALATED, un-landable by any seat of this wave** | ⟨cmd⟩ `grep -n '<TooltipContent' TimelineTrack.vue` → **`:143 <TooltipContent side="top" :side-offset="8" class="p-2 max-w-56">`** — **no `:aria-label`**; ⟨cmd⟩ `git grep -c describeKeyframe HEAD -- demo/` → **0**; `role="group"` on the track → **0**. The three `aria-label` hits in the file are **other rows'** (`:23` the pan bar, `:56` the rail — G8's — and `:122` the marker's `stopLabel`), so the count does not hide the absence |
| **G10** no thumbnail outlives its keyframe | **RED** | **RED — ESCALATED, un-landable by any seat of this wave** | `previewCache` is still the write-once map (`:97` passed · `:323` declared · `:327` read · `:332` written); ⟨cmd⟩ `grep -n '\bdelete\b' KeyframeTimeline.vue` → **one hit, `:355 if (value === "") delete kf.label;`** — **N-2's label control, not a cache eviction**, so the Baseline's *"nothing evicts"* stands at the bytes; `getGhostStyle` still composes **`scale(0.3) ${vars["transform"]}`** onto the plate (`:274`) |
| **G11** the cluster is mounted by a test at all | **RED** — leg (i) **0 hits** | **GREEN** | ⟨cmd⟩ `git grep -ln "TimelineHoverPreview\|previewCache\|SequenceScrubber" HEAD -- test/` → **exactly four files and only those four**: `sequence-scrubber-mount` · `timeline-hover-preview` · `timeline-mount-keyboard` · `timeline-mount-projection`; ⟨cmd⟩ `git ls-tree -r --name-only HEAD -- test/demo/instrument \| wc -l` → **16** = the twelve tracked + this wave's four creates, **zero filename collisions**; **the twelve are UNEDITED** (Act 2); the four fixtures hold **36** tests (7+16+7+6) and ⟨cmd⟩ `grep -n 'test.skip\|it.skip\|\.todo\|\.only'` across all four → **one hit, and it is the PROSE line** *"They are stated, not skipped: no `test.skip` stands in for a cure this seat could not lawfully write"* — **no masking construct exists in this wave's test surface** |
| **G12** the spec names its ref | **RED until stamped** | **GREEN** | `0dc2941a` (the opening commit, no cure commit before it); at close ⟨cmd⟩ `git rev-parse master origin/master` → **`3cc7e126`** twice |
| **G13** the wheel does not eat the page | **RED** — `@wheel.prevent`; `deltaY` only; `touch-none` | **GREEN** | **live** `@wheel.prevent` → **0** (the hit is the `:469` docblock explaining the retirement) and **live** `touch-none` → **0**, replaced by **`touch-pan-y`** in the `:51` class string; `onTrackWheel` → **2**; `deltaX` in `useZoomPan.ts` → **2**; `role="scrollbar"` → **1** |
| **G14** ONE failure posture | **RED (six divergent postures)** | **GREEN as the RULING it is — and honest-RED on ONE consumer byte of five** | **Ruling**: `G14-POSTURE-RULING.md` **152 L** against KF.W2's `POSTURES.md` **342 L**, cross-referenced both ends. **Byte half, re-measured row by row: 4 of 5 LANDED** — the sole non-toasting failure is CURED (`useTimelineBuild.ts` publishes `buildError`, toasts with a **Retry** action, *then* logs); the caret's silent swallow is gone (explicit `Number.isNaN` at `:181`, **0** bare `catch` in the file); D-15's three branches render (`KeyframeTimeline.vue` `:113` empty · `:120` single-frame · `:126` `buildError`); R-4's awaitable submit landed with the fold. **L-11 (KeyframeTimeline) DID NOT LAND** — see the residual below |
| **G15** one dialog shell, or the divergence ruled | **RED** — 80 / 161 L, two shells | **GREEN** | `CSSPasteDialog.vue` **80 → 138 L**, `KeyframesAddDialog.vue` **161 → 142 L** with its template a thin adapter; ⟨cmd⟩ `git grep -n initialText HEAD -- demo/` → **one hit**, inside the shell's own doc comment explaining what replaced it; ⟨cmd⟩ `git grep -ln 'useCodeHighlight(' HEAD -- demo/` → **3** = two consumers + the definition (L-4's falsifier answered at the bytes); N-2 **wired**, not deleted (`.label` reaches **3** sites in `KeyframeTimeline.vue` + **2** in THP) |

**Tally: 12 GREEN · 2 RED-ESCALATED (G9 · G10) · 1 GREEN-as-ruling with one byte outstanding (G14).**
**GREEN-BEFORE-CURE at the Baseline was NONE, and this seat manufactures none retroactively** — every
AFTER above is a cure some unit of this wave landed, at a witness this seat re-measured itself.

**The suites, at the settled bytes, this seat's own runs**: ⟨cmd⟩ `npx vitest run --project demo` →
**35 files · 233 tests · ALL PASSING** (including all four G11 fixtures and the read-only witnesses
`timeline-undo.test.ts` · `resize-tracks.test.ts` · `value4-editor-boundary.test.ts`, unedited).
**Typecheck (OP-2 is live)**: ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json | grep -c 'error TS'` →
**56**, of which ⟨cmd⟩ the same output filtered to every KF.W7 bound path → **0**. The 56 are the
frontier's and the siblings' — chiefly `OrbitalDrag.vue` (**24**) under KF.W6's in-flight work; the two
`KeyframesEditor.vue` errors are the pre-existing `KeyframeSelector`-discriminant pair and that file is
⟨cmd⟩ `git log --oneline ae83da07..HEAD -- …/KeyframesEditor.vue | wc -l` → **0** — **untouched by this
wave**, exactly as `.e`'s fold claimed. **This seat publishes the count SCOPED rather than as a
green-or-red claim about another wave's bytes** (LAW D(3)).

#### Act 2 — THE COMMIT AUDIT (brief item 2): four tracks, one index, zero contamination

**keyframes.js — 19 KF.W7 commits.** ⟨cmd⟩ `git show --stat --format= --name-status <each>` read for
all nineteen, each file compared against **its own unit's** writable set in this record's Unit plan:

| unit | commits | every path inside that unit's writable set? |
|---|---|---|
| `.a` | `3a01e362` | **YES** — `package.json`, **1 file**, and the carve is one line (⟨cmd⟩ `git show --stat 3a01e362` → `1 file changed, 1 insertion(+)`) |
| `.b` | `f9e15f8e` · `f77b152d` | **YES** — the two shared/serial files in the first, and the seam's four (`KeyframeTimeline` · `TimelineTrack` · `timelineTypes` · `timelineEngine`) in the second; `.b`'s grant names all four |
| `.d` | `69e8ead4` · `7225cdd1` · `98be70f5` · `e42e0aa3` · `9f585bee` · `a93bcd37` · `aa3d4092` · `8146cc5a` · `72cdc27a` | **YES** — `TimelineTrack` · `TimelineCaret` · `useZoomPan` · `useTimelineOps` · its two fixtures · and the verdict-admitted idiom carves (`AnimationVisualizer` · `SpringTarget` · `SpringPhysicsFacet`) |
| `.e` | `8cfee94e` · `53abdf29` · `f892ce4b` · `8ee852b9` · `be82defe` · `43556828` · `85b3c8fa` | **YES** — `KeyframeTimeline` · `TimelineHoverPreview` · `useTimelineBuild` · `useTimeline` · `snapshotCapture` · `flattenVars` (the ruled **delete**) · both dialogs · `SequenceScrubber` · its two fixtures |

**The four negative findings, each measured rather than asserted:**
1. **`scripts/dev/dev.sh` appears in ZERO commits, either repo** — ⟨cmd⟩ `git log --format=%h
   ae83da07..HEAD -- scripts/dev/dev.sh | wc -l` → **0** (kf) and ⟨cmd⟩ the same over the value.js
   window → **0**.
2. **`vitest.config.ts` — the row §Bounds STRUCK — has ZERO KF.W7 commits.** The wave consumed KF.W4's
   commit-2 registration and wrote no byte of that file, which is what makes the KF.W4 cross-edge's
   scope sentence true.
3. **`package-lock.json` and `node_modules/` — ZERO tracked bytes.** `.e`'s Act 0 materialized
   `@vue/test-utils` on disk with `--no-save --no-package-lock`; ⟨cmd⟩ `git status --short
   package.json package-lock.json` at close → **empty**. The lockfile entry remains owed (residual 3).
4. **`demo/styles/design-idioms.css` and `demo/scenes/sequence/SequenceTarget.vue` — the two narrowest
   carves — were NEVER WRITTEN.** Both close **SPENT-UNUSED**, which is the lawful outcome of a carve
   stated not to widen; `.d` declared the fourth ball anchor rather than hoisting into the idiom.

**value.js — 20 KF.W7 commits** (`098d2c79` the OPEN, through this seat's three). ⟨cmd⟩ the union of
every file touched by all twenty → **14 distinct paths**, and every one is inside the union of the six
units' writable sets: this record · `LEDGER.md` · **ten** files under `evidence/W7/` · `INBOX.md` ·
the O-28 relay letter. **Not one fourier, X-W, X.P or registry path appears** — the three-contaminated-
commit event measured at X-W0 does not recur here.

**E-3 held.** ⟨cmd⟩ `git log --format=%h 098d2c79^..HEAD -- docs/tranches/X/keyframes/waves/
docs/tranches/V/megatranche/registry/ docs/tranches/X/keyframes/conformance/` → **0**. The spec, the
58-record adjudicated registry and every conformance artifact are untouched by this wave. The one
in-wave correction to an evidence file (`22629e0f`, the D-19 §4 erratum) is a **dated addendum beside**
inside the same unit's own live artifact, which is the form E-3 prescribes.

**Session trailer**: present on **19 of 19** kf commits and **20 of 20** value.js commits (⟨cmd⟩
`git log -1 --format=%B <sha> | grep -q 'Claude-Session: …'`, all thirty-nine).

#### Act 3 — THE PER-SURFACE SWAP VERDICT TABLE, in KF.W10's terminal alphabet (brief item 3)

**The alphabet, byte-checked at W10's bytes by this seat before a word of this table was written**
(the §Sequencing FORWARD-anchor item this file flagged rather than assumed): ⟨cmd⟩
`grep -c 'DISCHARGED by KF.W7 SWAP verdict <surface>, <date>' KF-W10.md` → **3** (`:282` the §3.2
packet-lock · **`:413` the §G-2 Acceptance clause** · `:536`), and §G-2's clause reads
*"every row LANDED / KILLED-with-rationale / **`DISCHARGED by KF.W7 SWAP verdict <surface>, <date>`** /
`ADOPTED-BY-KF.W6 (RULINGS-4 R4-1)` / carried to the next formation boundary's ledger"* — **the form
this wave emits is still the form W10 consumes.** §6.D's SUCCESSOR-FORMATION REGISTER resolves with the
**KF.W11 · Demo Scene Repair** row, the **KF.W12** row and the **KF.W13 · Chrome, Dock & Transport
Repair** row all present, each carrying KF-AV-28's rider. **Four of four forward anchors resolve.**

**THE VERDICT IS SIX KEEP-BESPOKE AND ZERO SWAP** (`.a`'s G1, `4c03ceda`, 2026-09-18). **Therefore
this wave emits ZERO `DISCHARGED by KF.W7 SWAP verdict <surface>, <date>` receipts** — and under
§Verdict Protocol's rider mechanics the *positive* statement is the one W10 needs, because the inverse
error (a downstream wave assuming a swap happened) costs exactly as much as a silent discharge:

| # | surface (the six §Verdict rows, verbatim) | verdict | discharge receipts emitted | what KF.W10's G-2 must do |
|---|---|---|---|---|
| 1 | `KeyframeTimeline / TimelineTrack rail` | **KEEP-BESPOKE** | **NONE** | **CARRY every governed row**, naming this surface. No row under it is DISCHARGED; none may be marked so |
| 2 | `TimelineCaret` | **KEEP-BESPOKE** | **NONE** | **CARRY**; C-10 is RULED-and-LANDED (`.d`, `e42e0aa3`), L-15 is RULED-and-LANDED under G14 P4(a) — both are **LANDED**, not discharged |
| 3 | `TimelineHoverPreview` | **KEEP-BESPOKE** | **NONE** | **CARRY**; its producer seams travel as **O-28** R-4/R-5, not as discharges |
| 4 | `SequenceScrubber` | **KEEP-BESPOKE** | **NONE** | **CARRY** — and the shape rows **PERSIST**: C·C-4's narrowed cure LANDED (`43556828`), D-5/D-6/D-11's *"the primitive already solves it"* arms **do not discharge**, because the primitive does not solve it |
| 5 | `AnimationVisualizer` | **KEEP-BESPOKE** | **NONE** | **CARRY** its whole NO-WAVE-OWNER roster. KF-AV-10 is **LANDED** (`72cdc27a`); KF-AV-13/-14/-24's DECISIONS are taken and their cures stay NO-WAVE-OWNER; **KF-AV-32 is relayed** (O-28 R-6) and stays NO-WAVE-OWNER |
| 6 | `SpringTarget / SpringTrace idiom arms` | **KEEP-BESPOKE** (the **house** idiom ADOPTED) | **NONE** | **CARRY**; C-4 is RULED (**DELETE THE SENTENCE**) and C-3's DECISION is taken (the export is warranted) with its implementation edge at KF.W5/KF.W8 — a decision taken is not a discharge |

**The sentence W10 consumes, stated once and unambiguously: the discharge set is EMPTY; every row
governed by the KF-AV-28 standing supersession rider is STILL-GOVERNED, and KF.W10 carries all of them
naming the surface each sits under.** R3-10.3 is satisfied by construction rather than by receipt —
there is no row this wave discharged without the exact string, because there is no row this wave
discharged at all.

**What the two gated successors read here** (§Sequencing's → KF.W11 arm (d) and → KF.W13 edges,
addressed to `KF-W10.md` §6.D's register rows, since both waves are MINTED-UNAUTHORED and this seat
promises no reciprocation from an unauthored spec):
- **KF.W11 arm (d)** — **the SequenceScrubber shape rows PERSIST**, they do not discharge. The arm's
  spine and its banked packets proceed independently; **SquareScene MISS-1 shares `grabDx`'s class and
  the class is now LANDED here** (`7225cdd1`), so arm (c) inherits a worked precedent rather than a
  design question.
- **KF.W13** — **both packets are un-gated by a swap that did not happen.** The drag-seam packet
  (KF-SCR-1 + L·D-1 + KF-AV-15) inherits this wave's grab-offset arm as landed code; the
  transport/ribbon packet keeps the rider it supplies the counter-evidence for. The locks this end
  re-affirms are unchanged: **TD-1/TD-2's cures BUNDLE**, TD-2+TD-38+TD-40 and TD-21+TD-41 **must not
  split**, and **kf-ChromeDock M-4's cure ships an unopenable menu without the MbabbMenu MUST-CARRY
  rider**.
- **KF.W9 / SS-13** — the residue lists travel whole (KT 13 · TT 12 · caret 12 · THP 11 ·
  SequenceScrubber 12) with forced-colors D-21 and RTL D-24. **Both armed triggers are reported, not
  pre-decided**: (a) shift-wheel `deltaY: 0` ⇒ M-7 + RR-B missed-4 jointly MAJOR — **G13's landed
  policy now pans on `deltaX` as well** (`useZoomPan.ts`, `deltaX` → **2**), so the trigger's predicate
  is answerable by a probe rather than by inference, and this seat does not answer it; (b)
  `document.activeElement` ≠ input after a caret click ⇒ m-1/L-10 MAJOR + MISS-α2 — G7's landed
  identity/focus contract addresses it and **the probe still owes the verdict**. Probe parsimony
  (§5.2): **this seat ran no browser probe**; SS-13's probes are routed, never executed here.

**§Excluded re-read at close (`:369-382`) and re-verified against what the wave spent**: **KAD-15 ·
KAD-16 · KAD-20** were named by id in `.c`'s G15 ruling and **no cure was spent on any of the three**
(`.e`'s fold says so by id and the bytes agree — the progress bar rides `footer-extra` unchanged);
**the R1 crash identity** stays folded to the megatranche row and is **never re-booked** (`.e`'s C-7
receipt says exactly that); the **KAD `innerHTML` BLOCKER** was KF.W5's and this wave neither gated on
it nor waited for it; the **typography/token**, **structure/colocation**, **forced-colors/RTL** and
**C-3 implementation** families are untouched by this wave's commits (Act 2's 14-path union proves it);
and **no killed claim re-entered**: C-1's float story, m-13's latch escalation, C·C-4's
`{progress}`-prop-plus-emits cure and killed-claim #15's re-derivation of C-15 are each cited as locks
in the units' receipts and none is restated as a row.

#### Act 4 — THE BH RELAY (SS-6) (brief item 4)

**One letter, seven rows, written in THIS tree and rowed as `O-28`.**
`docs/tranches/V/coordination/valuejs-outbound-2026-09-18-kfw7-bh-relay.md` (**219 L**, line 1
`SERVED MODEL: claude-opus-5[1m]`, ⟨cmd⟩ `grep -c '^### R-'` → **7**), commit `c13b7ea3`; the ledger row
and the close-sweep line, commit `312a5068`.

**The lock honoured absolutely: ZERO bytes were written into the glass tree.** This unit's Locks make
glass-ui READ-ONLY *always* and say the relay *"rides as an outbound letter from this tree plus its
INBOX row, never a write into the glass tree"* — so the letter is delivered by **path-of-record + row**,
and the mirror copy into `../glass-ui/docs/tranches/BK/coordination/` (which KF.W6's relay seat made for
O-26 under its own wave's grant) is **deliberately not made here**. ⟨cmd⟩ `git -C ../glass-ui status
--short | wc -l` at close → unchanged by this seat; this seat ran only reads there.

**The four commissioned rows, and what each carries** — every mechanism **re-measured at the installed
`7.0.0` dist by this seat and double-run**, never inherited from `.a`'s or `.c`'s transcript:
- **R-1 · C-15's `/timeline` export gaps** — `index.d.ts` **2 L** (one component + three types);
  `dist/timeline.js` **1** runtime export; **73** subpaths with exactly **one** matching `/timeline/i`;
  the package's **only** wildcard is `./fonts/*`. **Six of the nine declaration modules are addressable
  by no specifier, and there is no deep-import escape hatch.** Paired with **R-2** (`geometry.d.ts`'s
  seven weighted-segment functions, **zero** percent↔position map, **zero** zoom, **zero** pan) and
  **R-3** (`SliderVariant` has no `"timeline"` member, with **PR-CAUTION** quoted verbatim beside it).
- **R-5 · TooltipContent's non-consumption of `--reka-tooltip-content-available-height`** — the D-15
  half of the THP layout pair, re-measured at **both** ends: reka publishes it (**1** hit in
  `TooltipContentImpl.js`), glass consumes it (**0** hits across `dist/`), and
  `dist/components/tooltip/` declares `max-height` **0** times. **R-4** rides beside it — reka's
  `props.ariaLabel || textContent` fallback at `:87`, captured once — **with the measurement that makes
  the consumer half OURS**: `TooltipContentProps extends TooltipContentImplProps`
  (`reka-ui/dist/index4.d.ts:10054` → `:10040-10049`), which declares `ariaLabel?`, and glass types its
  props as `TooltipContentProps & {class?; surface?}` — **so passing `:aria-label` is lawful today**,
  and the producer ask shrinks to *document it and consider a dev-warn*.
- **R-6 · KF-AV-32** — the chunk `dist/useTouchGate-B4mzQcHJ.js` (**84 L**) read **whole**: the
  module-level `Set`, the one shared passive `document` `touchstart` handler that deactivates every
  instance whose `controlEl()` does not contain the target, the **3 s** per-instance timer — and **two
  live instances in one ribbon** (`AnimationVisualizer.vue:101` · `PlaybackRibbon.vue:134`).
- **R-7 · KF-SCR-2 — CARRIED, NOT RE-ASKED, and the departure is disclosed rather than taken
  silently.** The spec routes KF-SCR-2 to this relay; **KF.W6's O-26 relayed it hours earlier at its
  row R-12**, ask and all. Filing it again would be a second ask to one counterparty inside one day —
  noise, not two reports. So the row **travels** (the spec's obligation is met), the ask **points at
  R-12**, and this letter adds only what KF.W7 itself measures: `SequenceScrubber.vue:11` is a consumer
  site on a surface this wave ruled KEEP-BESPOKE. The mechanism was re-measured here anyway (glass
  declares `@utility text-caption { … font-style: italic; }`; **0** italic faces ship; glass declares
  `font-synthesis` **0** times; our `style.css:100` forbids synthesis) so the row is not carried on a
  sibling's transcript.
- **The `cn` padding-group seam (TEP-12 / MCP-31) is NOT re-filed** — the spec says so by name and this
  seat obeys; it is recorded in the letter's §2 negative space so the grep trail shows it considered.

#### Act 5 — the four-path re-sweep: **Step 0, above.** Act 6 — THE PUSH (brief item 6)

⟨cmd⟩ `git -C /Users/mkbabb/Programming/keyframes.js push origin HEAD` →
**`ae83da07..3cc7e126  HEAD -> master`**; ⟨cmd⟩ `git rev-parse HEAD origin/master` → **`3cc7e126`
twice**. **All 19 KF.W7 kf commits verify reachable from `origin/master`** (⟨cmd⟩
`git merge-base --is-ancestor <sha> origin/master` for each → **19 of 19**).

**Disclosed, not glossed: the push carries KF.W6's seventeen in-flight commits as well** — ⟨cmd⟩
`git log --oneline ae83da07..HEAD | wc -l` → **36** = **19** KF.W7 + **17** KF.W6. This is not a seat
electing to push a sibling's work: the two waves share **one linear history in one sacred checkout**,
so `origin HEAD` — the exact command COHESION §0j.C **KF-WRITE (b)** prescribes (*"every wave pushing
`origin HEAD` at close"*) — cannot be narrower without rewriting history, which no law here permits.
KF.W6's own close pushes again and finds its work already published; nothing is lost and nothing is
claimed. **§0m.1's *"a sibling never pushes it"* is honoured in its sense**: this seat claims **zero**
of those seventeen commits, names them by count, and stamps none of KF.W6's gates.

#### Act 7 — THE LEDGER (brief item 7)

The Track-B **KF.W7 row** is set by minimal in-place replacement of its own cells (re-read immediately
before the edit; three other tracks write this file concurrently) and **one event line is appended**.
The verb is **PARTIAL — IMPLEMENTED with carried REDs**: the four-verb line moves only as far as this
wave's own bytes earn, **IMPLEMENTED is this wave's ceiling by its own Locks**, and **VERIFIED is
stamped only at sub-tranche close**. **This seat stamps nothing the units did not earn** — the two
ESCALATED gates and G14's one outstanding byte are named in the row, not rounded away.

#### Residuals, each with a named owner

1. **G9 + G10 — the `.d`/`.e` FILE-CROSSING, returned as this wave's ONE escalation.** `.c` declared it
   (`G10-GHOST-CACHE-DESIGN.md` §6) and asked seat 0 to re-home each family whole; the Unit plan did not,
   and `.e` then measured it from the other end (`G9-G10-FILE-CROSSING-ESCALATION.md`, `4dc92768`) with
   `.d` witnessing it from its side (`.d` residual 1). **Re-verified at close by this seat, at the
   bytes**: G9's family needs `TimelineTrack.vue` (`.d`'s) *and* `TimelineHoverPreview.vue:20` (`.e`'s);
   G10's family needs `TimelineHoverPreview` + `KeyframeTimeline` + `useTimelineBuild` (`.e`'s) *and*
   four carves in `TimelineTrack.vue` (`.d`'s). §Sequencing's Commit-families list locks **both families
   WHOLE**, `vue-tsc` is live so neither half typechecks alone, and the derived-projection workaround
   that would spare the other seat's file is the legacy-compat shim house law forbids. **No reduced cure
   was improvised, no family was split to manufacture a green, and the four G10 assertions are written
   VERBATIM in fixture 3's own header at the mount they belong to — stated, never `test.skip`'d**
   (measured in Act 1: the only `skip` token in the wave's test surface is that prose line).
   **The cure, executable as written: ratify `.c`'s §6 — re-home each family WHOLE to ONE seat and
   serialize.** Two of G10's obligations are **already discharged and must not be re-spent** (the
   capture re-point and the parse-boundary validation, both at `85b3c8fa`); what remains is exactly
   `.c`'s §1, §2 and §3 plus G9's whole design. **Owner: seat 0 / the orchestrator** (a one-seat
   re-dispatch inside this wave's existing §Bounds — **no bounds widening is needed, only a different
   partition of them**), else **KF.W10's ledger carries both gates RED with this receipt as the reason.**
2. **G14's L-11 (KeyframeTimeline) — the one consumer byte of five that did not land.** `.c` routed it
   to `.d` with its cure shape stated exactly: *"`rebuild` typed `() => Promise<void>` at
   `useTimelineOps.ts:19` and **awaited**; `snapshot` toasts `Keyframe captured …` AFTER the awaited
   rebuild."* **Measured at the settled bytes by this seat**: `rebuild` **is** `async (): Promise<void>`
   (`useTimelineBuild.ts:43`), but `useTimelineOps` still takes it as **`rebuild: () => void`** (`:19`)
   and `snapshot` toasts at **`:59`** after a **non-awaited** `scheduleRebuild()` (`:56`) — so the
   acknowledgement still precedes the outcome and **P2's *outcome before acknowledgement* clause is
   unmet at exactly one site**. It is not a regression and it is not masked: the keyframe **is** pushed
   before the toast, so the toast is not false; what is missing is the ruling's own ordering.
   **Interaction with G4, stated because the next seat will hit it**: `.d`'s rAF latch is the ops
   layer's only route to `rebuild`, so the cure is *await the latched build*, never *un-latch the
   rebuild* — un-latching would trade G14's row for G4's. **Owner: `.d`'s file (`useTimelineOps.ts`),
   re-dispatched by seat 0, or KF.W10's ledger.**
3. **`@vue/test-utils` is in `package.json` and NOT in `package-lock.json`.** ⟨cmd⟩
   `grep -c '@vue/test-utils' package-lock.json` → **0**, re-measured here. `.e` materialized it on disk
   with `--no-save --no-package-lock` (no tracked byte), and `.d` then measured that **G11 does not need
   it at all** — the fixtures mount through `createApp` over KF.W4's registered `plugins: [vue()]`.
   **So the residual is real but no longer blocks anything**; it is a manifest/lockfile divergence a
   fresh `npm ci` would surface. **Owner: the orchestrator**, by one `npm install` (a `package-lock.json`
   write is a KF.W0 OWNER'S-HAND row and was correctly not taken by any seat).
4. **The toaster BLOCKER (kf-DemoGlobalChrome D-1/L-1/C-1, NO-WAVE-OWNER)** — `.c`'s residual 1, and
   **G14 P3's stated precondition**: the ★ S-7 house toast channel is unpositioned at the bytes, so the
   posture this wave declared depends on a channel that is itself banked-defective. Not cured here (M-1
   forbids the bare stylesheet import as the fix) and **outside every KF.W7 writable set**.
   **Owner: NO-WAVE-OWNER / KF.W10's ledger.**
5. **The W6∥W7 same-file order lock** — `.c`'s residual 2: the runbook has no row for
   `CSSPasteDialog.vue` / `KeyframesAddDialog.vue` / THP / TT / KT / caret, shared by KF.W6 `.f`/`.h`/`.i`
   and KF.W7 `.d`/`.e`. Ruled from this end **FOLD FIRST, SWAP SECOND**, and **the fold has now landed**
   (`8ee852b9`), so W6's writes to those files land on the folded shell. **Owner: ORCHESTRATOR** (a
   runbook row; no runbook byte written by any KF.W7 seat).
6. **The expanded-timeline settlement** (D-10 (TimelineTrack, expanded mode) + RB-7 + D-16 +
   kf-ChannelControls C-8/D-6 + KT D-7) — one settlement across `RibbonBar.vue` and
   `ChannelControls.vue`, **both outside every KF.W7 writable set**; §Sequencing item 8 sequences it
   after OP-0 and OP-1, **both of which this wave SETTLED** (`250f527b`), so its precondition is now met.
   **Owner: NO-WAVE-OWNER / the expanded-timeline spec family.**
7. **Two library-band parse findings, routed and neither cured nor worked around** — `.b`'s (the compile
   refuses the legacy `rgba(r, g, b, a)` form that every browser returns for a transparent computed
   colour, so `snapshot()` on an unstyled background feeds `rebuild` a refused value) and `.e`'s (the
   value.js `/css` grammar does not treat comments as trivia inside a declaration list: `a{/* hi */
   opacity:0.5}` yields a declaration whose NAME is `"/* hi */opacity"`, and inside `@keyframes` the
   declaration is **dropped entirely**). Both are **value.js library-band** rows, defended at the
   boundary meanwhile by m-7/m-8's name validation — surfaced, never silently written.
   **Owner: the value.js library band → KF.W10's ledger + the X·V lane.**
8. **`TimelineKeyframe.easing?` is dead** (never written, never read) and `timelineTypes.ts` is `.b`'s
   serial file. **Owner: KF.W8 or a re-homed act.** Beside it, **N-9's banked *"`importCSSToTimeline`
   DROPS per-stop `animation-timing-function`"* is REFUTED at these bytes** (`.e` measured the import
   carrying it and the export re-emitting it verbatim) — recorded as a **dated measured correction**, an
   addendum-beside and never an edit of the registry.
9. **KF-AV-17's resize-immune playhead form** — the overshooting `translateX(calc(p * 100cqw))` is still
   live at `SequenceScrubber.vue`'s `.scrub-ball` binding. It is a **P4 GEOMETRY row under OP-3's
   re-derivation lock** and P4 belonged to `.d`, whose file set does not include `SequenceScrubber.vue`.
   **Not improvised by any seat. Owner: KF.W11 arm (d) / KF.W10's ledger.**
10. **`updateKeyframeProperty` (banked DEAD) and `addKeyframe`** are re-exported by `useTimeline` but
    defined in `useTimelineOps.ts` — two seats' files — so the re-export was left rather than orphaning
    an exported function in a file the seat could not edit. **Owner: KF.W8.**
11. **The spec's `TimelineHoverPreview` 38 L is 44 L at this ref** (`.a`'s residual 3, routed to this
    seat as *"a dated observation at close"*). **Restated here as the dated observation it is, measured
    at both ends by this seat**: ⟨cmd⟩ `git show ae83da07:…/TimelineHoverPreview.vue | wc -l` → **44**
    (the spec's 38 was already stale at the wave's own ref) and ⟨cmd⟩ `wc -l` at close → **83**, after
    `.e`'s G6 caption cure. A D-19 re-derivation, not a verdict move; **no successor may read 38 as a
    receipt.** **Owner: closed at this line.**
12. **D-3's SC 2.5.8 target-size arm**, **ARB-1's auto-pan** (its precondition now met — G13 landed a pan
    writer), **m-8's fourth anchor authoring** (`.preset-ball`, declared in-file rather than hoisted into
    an idiom whose carve is stated not to widen), and **RR-A missed-3's cure riding commit 6 rather than
    a P5 commit** (disclosed by `.d`, not re-attributed) — all four carried from `.d` unchanged.
    **Owners: KF.W9/SS-13's probe roster · the idiom's owner (KF.W6's `design-idioms.css` surface) ·
    KF.W10's ledger**, exactly as `.d` named them.
13. **A durable engine-level round-trip CORPUS file has no owner** in this wave's four-fixture
    allocation (`.e`'s G6 residual). **Owner: KF.W8.**
14. **Two anchors drifted +4** at `.a`'s D-19 re-resolution (`activeTimelineRef` `:198-201`→`:202`;
    `isTimelineVisible` `:377-379`→`:381`), banked as INTENT-at-true-bytes. **Owner: none — closed.**

#### Escalations

**ONE, and it is the wave's, not this unit's: G9 + G10, the `.d`/`.e` file-crossing** (residual 1),
returned to seat 0 / the orchestrator with its measurement, its already-discharged obligations named so
they are not re-spent, and an executable cure that needs **no bounds widening**. **This unit attempted
and made no write outside its own writable set**; every act its brief specified was possible at the
bytes and was performed as specified, so no §Triumvirate Dispatch trigger fires for `.f` itself.

#### Double-run block (WRITE-THEN-MEASURE)

Two measurement scripts were written to the scratchpad. The fifteen-gate script ran **four times**
across three refs (⟨cmd⟩ `diff run2 run3` → **no output**; `diff run3 run4` modulo the two ref-printing
lines → **no output**); the producer-relay script ran **twice** (⟨cmd⟩ `diff relay1 relay2` → **no
output**). **Every count published above was read from the settled bytes** — 2 L · 9 files · 1 runtime
export · 73 subpaths · 1 timeline subpath · 1 wildcard · 7 geometry functions · 2 `SliderVariant`
members · 0/1 available-height · 0 `max-height` · 84 L of the touch-gate chunk · 4 `grabDx` · 6
`scheduleRebuild` · 0 `Merge vars into keyframe` · 0 live `Math.round` · 0 live `@wheel.prevent` · 0
live `touch-none` · 2 `deltaX` · 0 `describeKeyframe` · 0 `role="group"` · 1 `delete` (and what it is) ·
4 fixture files · 16 tracked instrument files · 36 fixture tests · 233 demo tests · 56 `error TS` and
**0** of them in bounds · 19 + 20 commits · 14 distinct value.js paths · 0 `dev.sh` · 0 spec/registry/
conformance — **never from the spec, the registry, a prior pass or a unit's transcript**, except the
BEFORE column, which is **cited to this record's own Baseline by name**.

#### Commits (4 — all value.js; pathspec on every one)

| # | sha | meaning |
|---|---|---|
| 1 | `c13b7ea3` | **The BH relay letter (SS-6)** — `docs/tranches/V/coordination/valuejs-outbound-2026-09-18-kfw7-bh-relay.md`, seven rows, zero glass-tree bytes |
| 2 | `312a5068` | **E13** — `O-28` rowed + the close-sweep line appended to `INBOX.md` (3 insertions, 0 deletions) |
| 3 | (this commit) | these receipts + the per-surface SWAP verdict table |
| 4 | (next) | the `LEDGER.md` row + event line |

#### Index hygiene

Every commit carried its own pathspec **on the commit itself**; no `git add -A`, no `-u`, no
`commit -a`, no reset or unstage of another seat's paths. ⟨cmd⟩ `git log --format=%h 098d2c79^..HEAD --
scripts/dev/dev.sh | wc -l` → **0**, and the same over the kf window → **0**. Three KF.W6 `.d` commits
landed in the kf index while this seat measured, and the kf tree's dirty `ChromeDock.vue` and its two
untracked `VALUEJS-INBOUND-*.md` survivors sat beside every read — **not one was ever staged, and this
seat made no kf commit at all.** The record was re-read (⟨`wc -l`⟩ → **1197**, last entry
`### X.KF.W7.d`, working tree clean for it) immediately before this append.

**Addendum beside (same seat, same sitting, 2026-09-18) — the two placeholder shas in the commit
table above, RESOLVED at the bytes rather than left as forward references**: row 3 *(these receipts +
the SWAP verdict table)* = **`ab267e2d`**; row 4 *(the `LEDGER.md` row + event line)* = **`917892a3`**.
**Four commits, all value.js, pathspec on every one** — `c13b7ea3` · `312a5068` · `ab267e2d` ·
`917892a3`; ⟨cmd⟩ `git show --stat --format= --name-only` on all four returns **exactly four paths**,
each inside this unit's writable set: the relay letter · `INBOX.md` · this record · `LEDGER.md`.
**The LEDGER edit is the prescribed minimal in-place replacement of THIS wave's own row plus one
appended event line** — ⟨cmd⟩ `git diff --numstat` for that file at this seat → **3 insertions, 1
deletion**, and the single deleted line is ⟨cmd⟩ `git diff | grep '^-[^-]'` → **the KF.W7 row itself**
and nothing else; **no other track's row was touched, and the file was never rewritten.** The two
figures this addendum's parent publishes are re-measured here at the settled bytes: the record is
⟨cmd⟩ `wc -l` → **1,589 L** and the evidence directory holds ⟨cmd⟩ `ls … | wc -l` → **10** files.

---

## Close

**SERVED MODEL: `claude-opus-5[1m]`** · **2026-09-18** · **CLOSE SEAT (VERIFY-ONLY — this seat cured
nothing, wrote zero keyframes.js bytes and zero glass-ui bytes).** Second sitting of the close: the
`.f` receipts above are this wave's phase-4 product and are **re-verified here at this seat's own
commands, not inherited**. **Ref of record at close**: keyframes.js `master` ≡ `HEAD` ≡ **`ac30976f`**,
`origin/master` ≡ **`3cc7e126`**; value.js `HEAD` ≡ **`8cbe0317`** at the read.

**WITNESS-FRESHNESS, discharged by measurement before a gate was read** (§Bounds' own invariant):
⟨cmd⟩ `git diff --name-only 3cc7e126..HEAD` → **`demo/app/dock/ChromeDock.vue` alone**, and ⟨cmd⟩ the
same restricted to every KF.W7 bound path → **0**. The one commit that landed since the first sitting
(`ac30976f`) is **KF.W6 `.d`'s** and touches no byte this wave owns or reads as a witness.

### The four-verb line — where this wave leaves it

| verb | state at close | basis |
|---|---|---|
| AUDITED | **YES** (unchanged) | the 13 named `registry/adjudicated/` records, spec §State |
| SPECIFIED | **YES** (unchanged) | `docs/tranches/X/keyframes/waves/KF-W7.md`, IMMUTABLE (E-3) |
| **IMPLEMENTED** | **YES — with carried REDs (`PARTIAL`)** | 12 of 15 gates GREEN at this seat's own re-run · G9 + G10 RED-**ESCALATED** (a plan seam, not a design defect) · G14 GREEN-as-its-ruling with **one** consumer byte of five outstanding. **IMPLEMENTED is this wave's ceiling by its own §Locks** |
| VERIFIED | **NO** | *"stamped only at sub-tranche close"* — the spec's own words; **no seat of this wave may stamp it and this seat does not** |

### Gate table — BEFORE → AFTER, re-run whole at this seat's own commands

BEFORE is this record's own **Baseline** (banked READ-ONLY at `ae83da07`, fifteen RED, **0
GREEN-BEFORE-CURE**), cited by name. AFTER is read from the settled bytes by **this** seat, from
`git show HEAD:<f>` rather than the worktree (four tracks share this checkout and KF.W6's in-flight
edits sit dirty beside every read). One script, **double-run**: ⟨cmd⟩ `diff run1 run2` → **no output**
— **DOUBLE-RUN IDENTICAL**.

| gate | BEFORE | AFTER (this seat) | the witness this seat measured |
|---|---|---|---|
| **G1** | RED | **GREEN** | six §Verdict row heads in this record → **6**; `G1-VERDICT-TABLE.md` **432 L**; the importable surface re-measured here — `dist/components/timeline/index.d.ts` **2 L**, that dir **9** files, `dist/timeline.js` `^export` → **1**, `SliderVariant = "standard" \| "spectrum"` (no `"timeline"`), demo `/timeline` imports **0** |
| **G2** | RED | **GREEN** | `KeyframeTimeline.vue` **`:99 @update:scrub-t="scrub"`** — the ENGINE, not a bare ref — and **`:273 scrub,`** in the destructure, the two absences the Baseline convicted; `isPrimary\|pointerType` in `TimelineTrack.vue` **0 → 2**; `createPreviewSubject` **2** in KT + **2** in the engine; the engine's contract docblock *"THE ENGINE NEVER PAINTS THE SCENE"* → **1** |
| **G3** | RED | **GREEN** | `grabDx` in `TimelineTrack.vue` → **4** |
| **G4** | RED | **GREEN** | `scheduleRebuild` in `useTimelineOps.ts` → **6**; the file's **only** bare `rebuild();` is `:42`, **inside the rAF latch** — the latch is the ops layer's sole route, measured not assumed |
| **G5** | RED | **GREEN** | `coalesceKeyframes`: defined `timelineTypes.ts:48`, **ONE** build partition `timelineEngine.ts:69`, **ONE** render partition `TimelineTrack.vue:201`; the old `Merge vars into keyframe` loop → **0** (gone, not shadowed); both render `v-for`s over `stops` → **2** |
| **G6** | RED | **GREEN** | `authoredSelector` in THP → **2**; the `value !== "none"` drop filter in `snapshotCapture.ts` → **0**; `mergeCSS` reaches **3** modules |
| **G7** | RED | **GREEN** | **live** `Math.round` in `TimelineCaret.vue` → **0** — the single grep hit is the **docblock at `:99`** (*"The MODEL's value, not an integer lie"*), read at the bytes and not counted as code; `openedWith` (the compare) → **3** |
| **G8** | RED | **GREEN** | `role="slider"` → **3**; `onTrackKeydown` → **2** |
| **G9** | RED | **RED — ESCALATED** | `TimelineTrack.vue:143 <TooltipContent side="top" :side-offset="8" class="p-2 max-w-56">` — **no `:aria-label`**; `describeKeyframe` anywhere in `demo/` → **0**; `role="group"` on the track → **0** |
| **G10** | RED | **RED — ESCALATED** | `previewCache` is still the write-once map (`:97` passed · `:323` declared · `:327` read · `:332` written); the only `delete` in KT is **`:355 if (value === "") delete kf.label;`** — N-2's label control, **not** a cache eviction; and `getGhostStyle` still composes **`scale(0.3) ${vars["transform"]}`** at **`TimelineTrack.vue:274`** — the ghost is not decomposed |
| **G11** | RED (leg (i) **0**) | **GREEN** | leg (i) → **exactly four files and only those four** (the wave's own fixtures); `test/demo/instrument/` tracked → **16** = 12 + this wave's 4, **0** filename collisions; the four fixtures + the two read-only witnesses `timeline-undo` / `resize-tracks` run **42 passed / 42** at this seat's own isolated run; masking-construct sweep over all four fixtures → **1 hit, and it is the PROSE line** *"They are stated, not skipped"* |
| **G12** | RED until stamped | **GREEN** | `0dc2941a`, the opening commit, no cure commit before it (verified in the roster below); ref `ae83da07`, 21 anchors re-resolved 19 EXACT / 2 INTENT-at-true-bytes |
| **G13** | RED | **GREEN** | **live** `@wheel.prevent` → **0** (the one hit is the `:469` docblock explaining the retirement) and **live** `touch-none` → **0**, replaced by **`touch-pan-y`** in the `:51` class string; `onTrackWheel` → **2**; `deltaX` in `useZoomPan.ts` → **2**; `role="scrollbar"` → **1** |
| **G14** | RED (six postures) | **GREEN as the RULING — honest-RED on ONE consumer byte of five** | `G14-POSTURE-RULING.md` **152 L** against KF.W2's `POSTURES.md` **342 L**, cross-referenced **both** ends (⟨cmd⟩ `POSTURES.md` names KF.W7 → **7**; the ruling names POSTURES → **4**). `buildError` reaches **5** sites in `useTimelineBuild.ts` and **3** in KT. **L-11 DID NOT LAND, re-measured here**: `useTimelineOps.ts:19` still types `rebuild: () => void` and `:59` toasts after a **non-awaited** `scheduleRebuild()` at `:56` — acknowledgement still precedes outcome at exactly one site |
| **G15** | RED (80 / 161 L) | **GREEN** | `CSSPasteDialog.vue` **138 L** / `KeyframesAddDialog.vue` **142 L**; `initialText` across `demo/` → **one** hit, inside the shell's own doc comment explaining what replaced it; `useCodeHighlight(` reaches **3** files (L-4's falsifier answered at the bytes); N-2 **wired** (`.label` → **3** sites in KT); `flattenVars.ts` → **DELETED**, with `loadPreset`'s re-exported surface disposed in the same act |

**Tally at this seat: 12 GREEN · 2 RED-ESCALATED (G9 · G10) · 1 GREEN-as-ruling with one byte
outstanding (G14).** **Every one of the fifteen verdicts reproduces the `.f` sitting's exactly** — no
verdict moved, and this seat manufactures no GREEN the units did not earn.

**§Verification Artefacts — stated rather than silently substituted.** ⟨cmd⟩
`grep -ci 'verification artefact\|verification artifact' KF-W7.md` → **0**; `grep -ci 'hard gate'` →
**0**. **The spec carries neither section.** Its verification surface is §Gates' Witness/Assertion
pairs, and this seat re-ran all fifteen of them above; the suite and typecheck legs follow.

**The suites, at this seat's own runs.** ⟨cmd⟩ `npx vitest run --project demo` → **35 files · 233
tests · 230 passed, 3 failed**, and the three are disclosed rather than rounded: **both failing files
are sibling-owned read-only witnesses this wave never edited** — `typing-dots-engine-seam.test.ts`
(KF.W4's create) and `value4-editor-boundary.test.ts` (one of the nine originally-tracked witnesses),
each with ⟨cmd⟩ `git log --oneline ae83da07..HEAD -- <f> | wc -l` → **0** commits in this wave's whole
window. **Every failure is `Error: Test timed out in 5000ms`, never an assertion** — the vitest
5 s-default flake class under a four-track load (import 326 s against 66 s wall). Re-run in isolation,
`value4-editor-boundary` **PASSES**; `typing-dots-engine-seam` returns **1 failed / 3 passed**, then
**3 failed / 1 passed**, then **no tests** across three consecutive runs — non-deterministic by
measurement. **No seat touched either file and this seat does not: raising a sibling's `testTimeout`
to manufacture a green is exactly the masking fallback house law forbids. Owner: KF.W4's fixture
surface / the orchestrator** (residual 15). **KF.W7's own test surface is clean**: the four fixtures
plus the two witnesses the spec names → **42 passed / 42**.

**Typecheck (OP-2 is live).** ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json | grep -c 'error TS'` →
**56**, of which ⟨cmd⟩ the same output filtered to **every** KF.W7 bound path → **0**. The 56 are the
frontier's and the siblings' — `OrbitalDrag.vue` **24** under KF.W6's in-flight work chief among them.
**Published SCOPED, never as a green-or-red claim about another wave's bytes** (LAW D(3)).

### Commit roster — audited, and every path inside its own unit's writable set

**keyframes.js — 19 KF.W7 commits** (⟨cmd⟩ `git log --format='%h|%s' ae83da07..HEAD | grep -i
'X.KF.W7' | wc -l` → **19**), each read at ⟨cmd⟩ `git show --stat --format= --name-only <sha>` by this
seat and compared against **its own unit's** writable set in the Unit plan above:

| unit | commits | verdict |
|---|---|---|
| `.a` | `3a01e362` | **CLEAN** — `package.json`, 1 file, 1 insertion |
| `.b` | `f9e15f8e` · `f77b152d` | **CLEAN** — the two shared/serial files, then the seam's four; `.b`'s grant names all four and the seam is ONE commit family |
| `.d` | `69e8ead4` · `7225cdd1` · `98be70f5` · `e42e0aa3` · `9f585bee` · `a93bcd37` · `aa3d4092` · `8146cc5a` · `72cdc27a` | **CLEAN** — `TimelineTrack` · `TimelineCaret` · `useZoomPan` · `useTimelineOps` · its two fixtures · and the verdict-ADMITTED idiom carves (`AnimationVisualizer` · `SpringTarget` · `SpringPhysicsFacet`) |
| `.e` | `8cfee94e` · `53abdf29` · `f892ce4b` · `8ee852b9` · `be82defe` · `43556828` · `85b3c8fa` | **CLEAN** — `KeyframeTimeline` · `TimelineHoverPreview` · `useTimelineBuild` · `useTimeline` · `snapshotCapture` · `flattenVars` (the ruled **delete**) · both dialogs · `SequenceScrubber` · its two fixtures |

**value.js — 23 KF.W7 commits** at this seat's clock (the `.f` sitting counted 20; the three since are
`ab267e2d` · `917892a3` · `58059e74`, all `.f`'s own). ⟨cmd⟩ the union of every path touched by all
twenty-three → **14 distinct paths**, each inside the union of the six units' writable sets: this
record · `LEDGER.md` · **ten** files under `evidence/W7/` · `INBOX.md` · the O-28 relay letter.
**Not one fourier, X-W, X.P or registry path appears.**

**The negative findings, each measured at this seat:**
1. **`scripts/dev/dev.sh` in ZERO commits, both repos** — ⟨cmd⟩ `git log --format=%h <window> --
   scripts/dev/dev.sh | wc -l` → **0** (kf) and **0** (value.js).
2. **`vitest.config.ts` in ZERO KF.W7 commits** — ⟨cmd⟩ `git log --format=%h ae83da07..HEAD --
   vitest.config.ts | wc -l` → **0**. The wave consumed KF.W4's commit-2 registration and authored no
   byte of that file, which is what makes the KF.W4 cross-edge's scope sentence true.
3. **E-3 HELD** — ⟨cmd⟩ `git show --name-only` over all 23 value.js commits filtered to
   `keyframes/waves/` ∪ `megatranche/registry/` ∪ `keyframes/conformance/` → **0**. The spec, the
   58-record adjudicated registry and every conformance artifact are untouched by this wave.
4. **Session trailer on 42 of 42** — ⟨cmd⟩ `git log -1 --format=%B <sha> | grep -q 'Claude-Session:'`
   → **19 of 19** kf and **23 of 23** value.js.
5. **The `LEDGER.md` edit is the prescribed minimal in-place replacement** — ⟨cmd⟩ `git show --numstat
   --format= 917892a3` → **3 insertions, 1 deletion**, and ⟨cmd⟩ the deleted line → **the KF.W7 row
   itself and nothing else**. No other track's row was touched; the file was never rewritten.
6. **`design-idioms.css` and `SequenceTarget.vue` — the two narrowest carves — were NEVER WRITTEN.**
   Both close **SPENT-UNUSED**, the lawful outcome of a carve stated not to widen.

**LANDED-WRONG: NONE.** Not one commit in either repo wrote outside its own unit's writable set, and
no commit swept in a sibling track's staged paths.

### E13 — the four-path close sweep, re-run at this seat's own clock

Swept read-only at **02:16 EDT**, delta against the `.f` sitting's **01:36 EDT**, classification taken
from each row's **status cell**, never from a bare `grep -i unread`; `INBOX.md` **self-excluded**
(SELF-COUNT law). ⟨cmd⟩ `/usr/bin/find <each surface> -maxdepth 1 -name '*.md' -newermt '2026-09-18
01:36'` → **`INBOX.md` (self) and `valuejs-outbound-2026-09-18-kfw7-bh-relay.md` (this wave's own
O-28) alone**; **0** on `docs/tranches/V/`, **0** in `../glass-ui/docs/tranches/BK/coordination/`,
**0** in `../keyframes.js/…/coordination/`, **0** on the atlas **P** and **Q** lanes. ⟨cmd⟩
`ls -dlt ../glass-ui/docs/tranches/*/ | head -3` → **`BK`** (Sep 17 20:15) · `BJ` · `BI` — BK is still
the live tranche. **0 unrowed · 0 new `I-n` minted · 0 UNREAD in KF.W7's scope.** The three live
UNREAD cells — **I-32 · I-33 · I-34** — reproduce, and each was read at its **Routing** cell by this
seat: all three route to **X-W0.j / the X formation mail seat** (I-34 beside it to X-EXT-1), and not
one names a keyframes timeline byte. **E13 is MET by routing, and this wave does not close with UNREAD
mail in its scope.**

### The push

- **keyframes.js — DISCHARGED, and deliberately NOT re-run.** ⟨cmd⟩ `git merge-base --is-ancestor
  <sha> origin/master` for each of the nineteen → **19 of 19 reachable from `origin/master`**
  (`3cc7e126`, pushed at the `.f` sitting). ⟨cmd⟩ `git log --oneline origin/master..HEAD` → **one
  commit, `ac30976f`, and it is KF.W6 `.d`'s** with **zero** KF.W7 content. The `.f` sitting's push
  disclosure — that `origin HEAD` over one shared linear history cannot be narrower — was true when
  this wave's own commits were unpublished; it is **not** a licence to publish a sibling's in-flight
  commit for no gain. **Every KF.W7 byte is on `origin/master`; this seat pushes no keyframes.js
  byte**, and §0m.1's *"a sibling never pushes it"* is honoured in its sense.
- **value.js — PUSHED by this seat**, because this wave's own close bytes (`ab267e2d` · `917892a3` ·
  `58059e74` · this commit) were unpublished. Disclosed: the same `origin HEAD` carries the sibling
  commits `02497fcf` (X·V W1.a) and `8cbe0317` (X·F W6 CHECK 1) that sit interleaved in the one shared
  history. This seat claims **none** of them and stamps **no** sibling gate.

### Residuals — all fourteen of `.f`'s carried forward unchanged, plus one this sitting measured

`.f`'s residuals **1–14** above are re-affirmed with their owners as written and are not restated
here; the two that this seat re-measured at the bytes are confirmed live: **residual 1** (the G9 + G10
`.d`/`.e` file-crossing — G9's family needs `TimelineTrack.vue:143` *and* THP; G10's needs
`TimelineTrack.vue:274`'s `getGhostStyle` *and* THP + KT + `useTimelineBuild`) and **residual 2**
(G14's L-11 at `useTimelineOps.ts:19`/`:56`/`:59`). One is added:

15. **Two sibling-owned demo fixtures are non-deterministic over the vitest 5 s default** —
    `test/demo/instrument/typing-dots-engine-seam.test.ts` (KF.W4's create) and
    `test/demo/instrument/value4-editor-boundary.test.ts` (an originally-tracked witness). Both are
    **read-only to every KF.W7 seat**, both have **0** commits in this wave's window, and every
    failure is a **timeout, never an assertion**. Not cured here: an explicit `testTimeout` on another
    wave's fixture is a write outside every KF.W7 writable set, and doing it to turn a run green is
    the masking fallback house law forbids. **Owner: KF.W4's fixture surface / the orchestrator**,
    else KF.W10's ledger.

### Escalations

**ONE, unchanged and re-verified at the bytes: G9 + G10, the `.d`/`.e` FILE-CROSSING**, returned to
**seat 0 / the orchestrator**. Both cure families are locked WHOLE by §Sequencing's Commit-families
list, both straddle the `.d`/`.e` file split, `vue-tsc` is live so neither half typechecks alone, and
the derived-projection workaround that would spare the other seat's file is the legacy-compat shim
house law forbids. **No reduced cure was improvised and no family was split to manufacture a green.**
The cure needs **no bounds widening — only a different partition of the SAME §Bounds**: re-home each
family whole to ONE seat and serialize. Two of G10's obligations are **already discharged and must not
be re-spent** (the capture re-point and the parse-boundary validation, both at `85b3c8fa`). Else
**KF.W10's ledger carries both gates RED with this receipt as the reason.**

**This seat attempted and made no write outside its own writable set**; it cured nothing, stamped
nothing the units did not earn, and moved the four-verb line no further than IMPLEMENTED.

**WAVE VERDICT: PARTIAL — IMPLEMENTED with carried REDs.** The timeline instrument is ruled **OURS TO
KEEP on all six surfaces with ZERO SWAP**, the scrub seam is **LIVE at the bytes** in one guarded
single-engine commit, the **discharge set is EMPTY** and stated so in KF.W10's own terminal alphabet,
and the two RED gates are returned **ESCALATED for a plan seam, not a design defect**.

---

## Resume — 2026-09-18 · SEAT 0 RE-PARTITION

**SERVED MODEL: `claude-opus-5[1m]`** · **RESUME MODE, not a re-open of a closed wave.** The LEDGER
row reads **PARTIAL 2026-09-18 — IMPLEMENTED with carried REDs**, not CLOSED, and this record exists —
so this seat resumes rather than opens. **Nothing above this line is rewritten** (E-3 in its sense:
prior evidence is immutable; corrections are dated addenda-beside). The six units `.a`..`.f` are
**DONE and are never re-dispatched** — every one of their **19 keyframes.js + 24 value.js** commits
verified present at this seat: ⟨cmd⟩ `git cat-file -e <sha>^{commit}` over the `## Close` roster →
**19 of 19 OK** (kf) and **24 of 24 OK** (vjs), zero MISSING.

**What this seat is for.** `## Close` returned exactly one escalation to *"seat 0 / the orchestrator"*:
**G9 + G10, the `.d`/`.e` FILE-CROSSING**, with its own cure prescribed — *"no bounds widening — only a
different partition of the SAME §Bounds: re-home each family whole to ONE seat and serialize."* This
seat executes that prescription, and carries **G14's L-11** (the one consumer byte of five that did not
land, owner *"`.d`'s file / seat 0 / KF.W10"*) into the same re-partition, because it is the same class
of miss: a family whose cure site sat in a seat that did not own the family.

### Substrate — it has MOVED again, and the anchors with it

| | at `## Close` (2026-09-18, early) | at this seat |
|---|---|---|
| keyframes.js `HEAD` | `ac30976f` | **`41a7ebb6`** (`origin/master` ≡ `41a7ebb6`, clean) |
| commits since kf `3cc7e126` | 1 | **99** |
| value.js `HEAD` | `8cbe0317` | **`42381e83`** |

**WITNESS-FRESHNESS IS NOT DISCHARGED THIS TIME — it is CONVICTED, and that is a binding input to the
plan.** §Bounds' own invariant: *"no KF.W7 gate may be read against … any tracked file at bytes a
neighbour has since changed … A witness whose bytes moved under a gate is not a witness."* ⟨cmd⟩
`git log --format='%h|%s' 3cc7e126..HEAD -- demo/components/instrument/timeline/ …` → **20 commits**,
every one **KF.W6's** (`kf-w6.f` · `.g` · `.h` · `.j` · `.k` and the W6-C prose rows), and KF.W6 is
**CLOSED 2026-09-17** at the LEDGER, so the movement is finished rather than in flight. The three owed
gates' anchors all moved under it:

| | `## Close` anchor | anchor at `41a7ebb6` |
|---|---|---|
| G9 | `TimelineTrack.vue:143` `<TooltipContent … class="p-2 max-w-56">` | **`:193`** `<TooltipContent side="top" :side-offset="8" class="max-w-56">` — the `p-2` deleted by KF.W6's `8c958a85` (TimelineTrack **m-17**) |
| G10 | `TimelineTrack.vue:274` `getGhostStyle` | **`:320`** declared, **`:324`** the `scale(0.3) ${vars["transform"]}` composition |
| G10 | `KeyframeTimeline.vue` `previewCache` `:97 :323 :327 :332` | **`:187` passed · `:445` declared · `:449` read · `:454` written** |
| G14 L-11 | `useTimelineOps.ts:19 / :56 / :59` | **`:19` `rebuild: () => void` · `:57` `scheduleRebuild()` · `:59` `toast.success`** |

**Every resume unit re-derives its own anchors at the bytes before it writes one (D-19, OP-3's law
applied to this seat's own substrate). The table above is an input, not a substitute.**

### Preconditions, re-verified at the bytes AND in the LEDGER

| condition | receipt |
|---|---|
| **KF.W2 (posture registry)** — the wave's only "Opens after" | ⟨cmd⟩ LEDGER `:48` → **`CLOSED 2026-09-17`**; the named artefact present: `docs/tranches/X/keyframes/registries/POSTURES.md` |
| **G14's ruling already landed** (this seat lands its consumer byte, not a second ruling) | `evidence/W7/G14-POSTURE-RULING.md` **152 L**, cross-referenced both ends at `## Close` |
| **`.c`'s ghost/cache design already published** (`.g` implements, it does not re-design) | `G10-GHOST-CACHE-DESIGN` cited by fixture 3's own header at `:29-31` |
| **KF.W10 has not consumed the RED** | LEDGER `:54` → `planned`; the re-partition is still this wave's to spend |
| **kf worktree clean of product bytes** | ⟨cmd⟩ `git -C ../keyframes.js status --porcelain` → **2 lines, both untracked `docs/tranches/V/coordination/VALUEJS-INBOUND-*.md`** (value.js's own outbound copies) — **0 product paths, 0 inherited partial work on any KF.W7 path**. CRASH-RECOVERY law: nothing to inherit, nothing rewritten |

### E13 Step-0 — the four-path mail sweep, at this seat's own clock

Swept read-only at **2026-09-18 17:54 EDT**, compared against **every row** of `INBOX.md`,
classification taken from each row's **Status cell**, never from a bare `grep -i unread`; `INBOX.md`
**self-excluded** (SELF-COUNT law). ⟨cmd⟩ `/bin/ls -dlt ../glass-ui/docs/tranches/*/ | head -4` →
**`BK/`** (Sep 18 17:53) · `BJ/` · `BI/` · `IOS27-MICRO/` — **BK is still the newest glass tranche
dir**. Counts: `docs/tranches/V/` **10** `.md` · `V/coordination/` **18** · BK coordination **9** ·
`../keyframes.js/docs/tranches/V/coordination/` **13** · atlas `P/coordination/` **28**. ⟨cmd⟩
`/usr/bin/find <the four paths> -maxdepth 1 -type f -name '*.md' -newermt '2026-09-18 17:16'` →
**`INBOX.md` (self)** and **`glass-outbound-2026-09-18-valuejs-o26-reply.md`** — and the second is
**already rowed `I-35`, status `READ + CONSUMED WHOLE`**. **0 unrowed · 0 new `I-n` minted · 0 UNREAD in
KF.W7's scope.**

**One delta is DECLARED rather than swallowed.** I-35's letter has been **revised a third time**:
⟨cmd⟩ `/bin/ls -l` → **43,967 B**, ⟨cmd⟩ `shasum -a 256 | cut -c1-16` → **`fe75887ccb505eee`**,
committed at glass **`6e5a35bc`** ("lane M2 — three rulings re-ruled after lane M's disk facts").
The row was minted at 41,738 B and consumed by KF.W6 `.l` at 42,776 B. **The row is not re-minted — a
revision of an already-rowed, already-read letter is not unrowed mail** — but the byte delta is
**routed to `.j`**, because one clause of §2 lands inside this wave's owed work and cuts against a
convenient reading: *"A-9 is `TooltipContent`'s block ceiling and is NOT cured at 9.0.0 … If you
re-file A-9 under `/timeline` at W7 the row will go missing."* **`.h` is bound by it** (G9's cure is
authored at exactly that `TooltipContent`) and **`.j` re-reads it against O-28**, this wave's already-
sent relay, to decide whether O-28 needs a dated addendum-beside.

## Resume baseline — the three owed gates, re-measured READ-ONLY at `41a7ebb6`

Read with `git show HEAD:<f>` rather than the worktree, one script, **double-run**: ⟨cmd⟩
`diff run1 run2` → **no output — DOUBLE-RUN IDENTICAL**. **All three reproduce RED at the moved
bytes** — the escalation was a plan seam and the plan seam is still open.

| gate | probe (⟨cmd⟩ … → output) | reading |
|---|---|---|
| **G9** | `grep -n 'aria-label'` TimelineTrack → **3 hits, `:32` pan · `:89` playhead · `:164` marker** — and the `:193` `TooltipContent` carries **none** · `git grep -c describeKeyframe HEAD -- demo/` → **0 files** · `grep -c 'role="group"'` → **0** | **RED** — the accessible description is still reka's untracked once-captured `textContent`, and the rail still has no accessible container |
| **G10** | `grep -n 'delete '` KeyframeTimeline, minus the label line → **0** (the only `delete` is `:477 if (value === "") delete kf.label;`, N-2's label control) · `grep -c 'scale(0.3) ${vars'` TimelineTrack → **1** (`:324`) · `grep -c 'previewFailed\|previewAttempts\|captureFailed'` KT → **0** | **RED** — write-once cache, no eviction, no retry ceiling, ghost still composed on the bordered element |
| **G14 · L-11** | `grep -c 'rebuild: () => void'` useTimelineOps → **1** (`:19`) · `sed -n '52,60p' \| grep -c 'await scheduleRebuild'` → **0** · `grep -c 'const rebuild = async (): Promise<void>'` useTimelineBuild → **1** | **RED** — the builder IS async and the ops layer still declares it `void`; acknowledgement precedes outcome at exactly one site |

**Masking check at the baseline, so the resume starts from a measured floor**: ⟨cmd⟩
`git grep -n 'test\.skip\|it\.skip\|describe\.skip' HEAD -- <the four fixtures>` → **ONE hit, and it
is the PROSE line** `timeline-hover-preview.test.ts:38 * They are stated, not skipped: no \`test.skip\`
stands in for a cure this seat`. **G10's four assertions are STATED at the mount and running nowhere —
`.g` converts them to RUNNING; no seat of this resume may convert them to skipped.**

### GREEN-BEFORE-CURE (R.2)

**NONE.** All three owed readings are RED before their cure. The twelve gates `## Close` stamped GREEN
are **not re-opened here** — they are `.j`'s BEFORE→AFTER subject, read once more at the end.

## Resume unit plan — the SAME §Bounds, a different partition

**Four units, `.g` `.h` `.i` `.j`, FULLY SERIAL.** Concurrency **1**, below the spec's own peak of 2
and below the owner's four-workflow cap. **The serialization is the cure, not caution**: the escalation
was manufactured by two concurrent seats owning halves of one commit family, and `.g` and `.h` both
need `TimelineTrack.vue` + `TimelineHoverPreview.vue` + `KeyframeTimeline.vue` + fixture 3. Running
them side by side would rebuild the exact seam `## Close` returned. `.i` is file-disjoint and *could*
run beside `.g`; it does not, because `## Close`'s prescription is *"re-home each family whole to ONE
seat **and serialize**"* and a single-file family is not worth re-opening the question for.

**No bounds widening.** Every path below already sits in this wave's §Bounds or is one of its own four
created fixtures. ⟨cmd⟩ the union of the four units' writable sets minus §Bounds ∪ {the four fixtures}
→ **∅**.

**Model tiering (M-12 TRI-FOLD, runbook §5.1)**: the spec's two design-author seats were phases 2's
`.b`/`.c` and **both have landed their designs**; `.g` and `.h` implement published designs, `.i` is a
single-file cure and `.j` is verify-only — **all four Opus solo**. Receipts every seat: line 1 =
`SERVED MODEL: <id>`.

| group | unit | why here |
|---|---|---|
| 1 | `.g` | the ghost/cache family FIRST — G9's assertion says the description *"re-derives on the ghost→image swap"*, so the swap's shape must exist before the description that reads it |
| 2 | `.h` | the a11y family, over bytes `.g` has settled |
| 3 | `.i` | G14's last consumer byte; file-disjoint, serialized by prescription |
| 4 | `.j` | re-close: all fifteen re-run BEFORE→AFTER, roster audit, I-35 delta, push, LEDGER |

### `.g` — THE GHOST/CACHE FAMILY, RE-HOMED WHOLE (G10)

- **Model**: opus.
- **Sections**: §Carry **P7** (`:198-219`) · §Gates **G10** (`:297-299`), **G11** (`:301-307`, fixture
  3's half) · §Sequencing's commit-families line (`:340`) · §Bounds' witness-freshness paragraph
  (`:82`) and disjointness paragraph (`:84`).
- **Writable** (kf, under `/Users/mkbabb/Programming/keyframes.js/`):
  `demo/components/instrument/timeline/components/TimelineTrack.vue` ·
  `demo/components/instrument/timeline/components/TimelineHoverPreview.vue` ·
  `demo/components/instrument/timeline/KeyframeTimeline.vue` ·
  `demo/components/instrument/timeline/composables/useTimelineBuild.ts` ·
  `demo/components/instrument/timeline/utils/snapshotCapture.ts` ·
  `test/demo/instrument/timeline-hover-preview.test.ts`; (vjs)
  `docs/tranches/X/keyframes/evidence/W7/**` · `docs/tranches/X/execution/B/KF-W7.md`.
- **Gates**: **G10** · **G11** (fixture 3's G10 assertions, STATED → RUNNING).
- **Locks**: the ghost redesign is **ONE commit family** (D-7 + MISSED-4 + GHOST-PLATE + L-D8/C-4(a) +
  L-D4/C-4(b)) and **must not split** — that split is what `## Close` escalated; m-7/m-8's validation
  half stays sequenced **after** L-6/C-4's delegation; **two obligations are ALREADY DISCHARGED at
  `85b3c8fa` and MUST NOT BE RE-SPENT** (the capture re-point and the parse-boundary validation);
  MISSED-3's **same-commit box law** — no register swap without its box resize in the same commit; the
  twelve tracked `test/demo/instrument/` files are **READ-ONLY** and no gate is greened by editing one;
  **no `test.skip`, no try/catch around the defect, no allowlist** — fixture 3's stated assertions
  become real or the gate stays honestly RED.
- **Brief**: (0) re-derive every G10 anchor at `41a7ebb6` — KF.W6 moved all of them (`getGhostStyle`
  `:274`→`:320/:324`; `previewCache` →`:187/:445/:449/:454`) and a witness whose bytes moved is not a
  witness. Then **ONE commit**, the family whole: (1) **evict** — the cached thumbnail is gone or
  regenerated after a keyframe's edit, and no orphan base64 survives remove / clear / import-over;
  (2) a **repeatedly-failing capture stops and says so** (a retry ceiling with a surfaced state, never
  a silent forever-retry); (3) the **ghost renders decomposed** — the scale on a wrapper, never
  `scale(0.3) ${vars["transform"]}` composed onto the bordered element — with a terminal `v-else` and a
  **reserved box**; (4) fixture 3's four stated assertions run at the mount they belong to.
  `npm run check` (vue-tsc is live) before the commit; G10 re-read at the settled bytes, double-run.

### `.h` — THE A11Y FAMILY, RE-HOMED WHOLE (G9) — serial after `.g`

- **Model**: opus.
- **Sections**: §Carry **P5** (`:171-181`) · **P7** (`:198-219`) · §Gates **G9** (`:293-295`), **G11**
  (`:301-307`, fixture 3's half) · §Sequencing's commit-families line (`:340`).
- **Writable** (kf): `…/timeline/components/TimelineTrack.vue` ·
  `…/timeline/components/TimelineHoverPreview.vue` · `…/timeline/KeyframeTimeline.vue` ·
  `test/demo/instrument/timeline-hover-preview.test.ts`; (vjs)
  `docs/tranches/X/keyframes/evidence/W7/**` · `docs/tranches/X/execution/B/KF-W7.md`.
- **Gates**: **G9** · **G11** (fixture 3's G9 assertions).
- **Locks**: the a11y commit is **ONE family** (MISSED-1 + D-10 (KeyframeTimeline) + M7 + RR-A missed-1
  (TimelineTrack)) and must not split; **M7's MM-29/MISSED-3 cure guards and DISSENT-4's
  verbatim-element law** bind the derived text; the reka witness is load-bearing —
  `TooltipContentImpl.js:87` reads `props.ariaLabel || currentElement.value?.textContent`
  **untracked and captured once**, so the description is **PASSED**, never left to `textContent`;
  **no copied producer selector and no local patch of `node_modules`**; **A-9 is `TooltipContent`'s
  block ceiling and is NOT a `/timeline` row** (I-35 §2, verbatim: *"If you re-file A-9 under
  `/timeline` at W7 the row will go missing"*) — this seat files nothing there; tracked fixtures
  READ-ONLY.
- **Brief**: (0) re-derive anchors at the bytes `.g` settled. Then **ONE commit**: (1) pass an explicit
  `:aria-label` at `TimelineTrack.vue`'s `TooltipContent` (`:193` at this reading) carrying the
  **derived alt, punctuated at row boundaries**, **re-derived on the ghost→image swap** `.g` landed,
  and **not force-uppercased** (the `text-admin-label` caps register is the convicted mechanism);
  (2) give the rail an **accessible container** and make the graduations **AT-hidden**; (3) fixture 3's
  G9 assertions run. `npm run check` before the commit; G9 re-read at the settled bytes, double-run.

### `.i` — G14's L-11 CONSUMER BYTE — serial after `.h`

- **Model**: opus.
- **Sections**: §Gates **G14** (`:317-319`) · **G4** (`:273-275`, the row this cure must not trade
  away) · §Sequencing's *"the posture ruling (G14's consumers, one ruling)"* family line (`:340`).
- **Writable** (kf): `…/timeline/composables/useTimelineOps.ts` ·
  `…/timeline/composables/useTimeline.ts` · `test/demo/instrument/timeline-mount-projection.test.ts` ·
  `test/demo/instrument/timeline-mount-keyboard.test.ts`; (vjs)
  `docs/tranches/X/keyframes/evidence/W7/**` · `docs/tranches/X/execution/B/KF-W7.md`.
- **Gates**: **G14** (its fifth and last consumer byte) — and **G4 must stay GREEN**.
- **Locks**: **the cure is AWAIT THE LATCHED BUILD, never UN-LATCH IT** — un-latching trades G14's row
  for G4's, and `## Close` named that trade in advance; **G4's shape is measured, not assumed**:
  `scheduleRebuild` ×**6** and the file's **only** bare `rebuild();` stays **inside the rAF latch**;
  the **posture ruling is already landed** (`G14-POSTURE-RULING.md`, 152 L) — this is its consumer
  byte, **not a second ruling** and not a re-open; `useTimeline.ts` and fixtures 1/2 are touched **only
  if `vue-tsc` demands it** (they are in-bounds, but a wider edit than the typechecker requires is not
  this seat's to make).
- **Brief**: (1) at `useTimelineOps.ts`, type `rebuild` so the builder's `Promise<void>`
  (`useTimelineBuild.ts:43 const rebuild = async (): Promise<void>`) is **visible to the ops layer**
  rather than erased to `void` at `:19`; (2) make `scheduleRebuild` hand back a settlement the caller
  can await — the rAF latch **retained**, the promise resolving when the latched `rebuild()` resolves;
  (3) `await` it in `snapshot` before the `:59` success toast, so the **outcome precedes the
  acknowledgement** — the posture's own third clause; (4) re-point `useTimeline.ts:54`'s wiring and
  fixtures 1/2's `() => {}` rebuild stubs **only if** the typecheck requires it. `npm run check`; both
  **G14 and G4** re-read at the settled bytes, double-run.

### `.j` — RE-CLOSE (serial, last)

- **Model**: opus.
- **Sections**: §Gates all fifteen (BEFORE→AFTER) · §Sequencing's cross-edges (`:349-362`) ·
  §Excluded (`:369-382`).
- **Writable** (vjs only): `docs/tranches/X/execution/B/KF-W7.md` ·
  `docs/tranches/X/execution/LEDGER.md` (**its own row's cells + appended event lines only**) ·
  `docs/tranches/X/keyframes/evidence/W7/**` · `docs/tranches/V/coordination/INBOX.md` ·
  `docs/tranches/V/coordination/<a dated outbound addendum-beside, only if §2 requires one>`.
- **Gates**: all fifteen, re-run at this seat's own double-run commands; stamps nothing the units did
  not earn.
- **Locks**: **glass-ui is READ-ONLY always** — anything owed the producer rides as an outbound letter
  plus its INBOX row, never a write into the glass tree and never a demo-side patch of a producer seam;
  **E-3** — O-28 is SENT and immutable; a correction is a dated **addendum-beside**, never an edit;
  **E13** — the wave does not close with UNREAD mail in scope; **IMPLEMENTED remains the ceiling**
  (*"VERIFIED … stamped only at sub-tranche close"* — no seat of this wave may stamp it); the
  **KF-AV-28 verdict is SETTLED and is not re-opened** — six surfaces, six KEEP-BESPOKE, **zero SWAP**,
  discharge set **EMPTY**, KF.W10 carries every governed row naming the surface.
- **Brief**: (1) re-run **all fifteen** gates and publish BEFORE→AFTER against **both** this record's
  original Baseline **and** §Resume's re-measured RED three; (2) audit every resume commit against its
  own unit's writable set (four tracks share the index — no contaminated commit, `dev.sh` in **zero**
  commits, pathspec on the commit itself); (3) consume **I-35's third-revision delta** (43,967 B ·
  `fe75887c…` · glass `6e5a35bc`) and rule in writing whether **O-28** needs a dated addendum-beside —
  §2's A-9 clause is the live one; (4) re-sweep the four paths and append the dated sweep line;
  (5) push kf `origin HEAD` if this resume's commits are unpublished, disclosing any sibling commits the
  one linear history necessarily carries; (6) **minimal in-place** LEDGER row edit + appended event
  line; (7) restate **every** residual with a named owner, including residual 15 (the two sibling-owned
  non-deterministic fixtures — **owner KF.W4 / the orchestrator**, never cured by raising another
  wave's `testTimeout`).

## Resume unit receipts


### X.KF.W7.g

SERVED MODEL: `claude-opus-5[1m]` · **2026-09-18** · Resume group 1 — **THE GHOST/CACHE FAMILY,
RE-HOMED WHOLE (G10)**. Sections executed: §Carry **P7** (`:198-219`) · §Gates **G10** (`:297-299`),
**G11** (`:301-307`, fixture 3's half) · §Sequencing's commit-families line (`:340`) · §Bounds'
witness-freshness (`:82`) and disjointness (`:84`) paragraphs.
**Status: DONE.** **G10 RED → GREEN · G11 fixture 3's four G10 assertions STATED → RUNNING.**
Evidence: `evidence/W7/G10-GHOST-CACHE-LANDING.md` (opens `SERVED MODEL: claude-opus-5[1m]`).

**Substrate**: kf `master` ≡ `origin/master` ≡ **`41a7ebb6`** at open, clean of product bytes.
**CRASH-RECOVERY**: ⟨cmd⟩ `git -C ../keyframes.js status --porcelain` at open → **2 lines, both the
untracked `docs/tranches/V/coordination/VALUEJS-INBOUND-*.md`** the resume seat already recorded —
**0 paths inside this unit's writable set, nothing inherited, nothing rewritten**. vjs likewise: no
dirty path under `docs/tranches/X/keyframes/evidence/W7/` or `execution/B/KF-W7.md`.

**Step 0 (E13, seat-level)**: COHESION §0j read to the file end through **§0q** — no KF.W7 ruling,
nothing owner-gated away from this unit; the only KF.W7 mention is §0o's runner-dead paragraph and its
erratum (the rate-limit cause), which is chassis, not cargo. ⟨cmd⟩
`/usr/bin/find <the four paths> -maxdepth 1 -type f -name '*.md' -newermt '2026-09-18 17:54'` →
**`INBOX.md` alone (self-excluded)** — nothing new since the resume seat's own sweep. The three live
UNREAD status cells (**I-32 · I-33 · I-34**) reproduce and all three route to **X-W0.j**; **I-35** is
`READ + CONSUMED WHOLE` with its third-revision delta already routed to `.j`. **0 unrowed · 0 `I-n`
minted · 0 UNREAD in this unit's scope. E13 MET by routing.**

#### Act 0 — every G10 anchor re-derived at `41a7ebb6` BEFORE a byte (D-19)

The resume table's four anchors all verify EXACT at the true bytes: `getGhostStyle` declared
**`TimelineTrack.vue:320`**, the composition **`:324`** (`scale(0.3) ${vars["transform"]}`);
`previewCache` passed **`KeyframeTimeline.vue:187`** (`:188` `:preview-loading`), declared **`:445`**,
guarded **`:449`**, written **`:454`**. Three DESIGN coordinates had moved under KF.W6 and are recorded
as **INTENT at the true bytes**, not followed as numbers: design §0's `getGhostStyle` *"`:151-158`"* →
**`:320-327`** (byte-identical function; the file is **730 L**, not 246); design §1.3's
`scrubAndCapture` *"`:89-117`"* with null arms *":93 / :111"* → declared **`:106`**, arms **`:116`**
(no target) and **`:134`** (the swallowing catch) — ⟨cmd⟩
`git show 41a7ebb6:…/useTimelineBuild.ts | grep -n 'const scrubAndCapture\|return null'` →
`106: / 116: / 134:`; THP is **128 L** (spec 38, OPEN seat 44) with every cited construct present —
the `v-else-if="Object.keys(ghostStyle).length > 0"` ghost with **no terminal `v-else`**, `Capturing...`
still undissolved, the required `ghostStyle` prop.

**The two obligations discharged at `85b3c8fa` were re-read and NOT re-spent**: the capture re-point
(`animation.value?.targets[0] ?? targets.value[0]`) survives byte-identical inside this unit's rewrite
of the surrounding function, and m-7/m-8's parse-boundary validation is untouched — no validation is
written at the ghost, which is the same lock from the other side.

#### Act 1 — ONE commit, the family whole: kf `4e2a715f`

Five files, one meaning, **no split** (the split is exactly what `## Close` escalated):
`KeyframeTimeline.vue` · `components/TimelineHoverPreview.vue` · `components/TimelineTrack.vue` ·
`composables/useTimelineBuild.ts` · `test/demo/instrument/timeline-hover-preview.test.ts`.
⟨cmd⟩ `git diff --stat` → **5 files changed, 685 insertions(+), 80 deletions(-)**. Pathspec on the
commit itself; ⟨cmd⟩ `git status --porcelain` after → **only the two pre-existing untracked INBOUND
letters**, `dev.sh` in zero commits, no sibling path touched.

1. **D-4/L-4/C-5 — the cache becomes a cache.** Two write-once maps keyed on a mutation-stable id with
   **no `delete` anywhere** → ONE `Map<id, PreviewEntry>` whose every entry carries `key` = the CONTENT
   it is a preview of. `evictStalePreviews` under one deep `watch` on `state.value.keyframes` covers
   **edit · move · remove · clear · import-over · undo**, and is content-keyed, so an undo restoring the
   exact prior vars **keeps** a capture that is still true.
2. **A failing capture STOPS and SAYS SO.** `scrubAndCapture` REJECTS (`Promise<string>`) — both
   `return null` arms gone, `toDataURL` moved inside the boundary so a tainted-canvas `SecurityError`
   is a failure like any other, the `finally` scrub-restore untouched. `failed` is an entry, so the
   re-entry guard ends the forever-retry; the message is **rendered** (`Preview unavailable — …`), and
   it un-sticks when the keyframe changes. The `// KEEP:` comment rides the cure (KF-CE-41), naming the
   three visible modes and the one that is not (WebGL blank-resolve → SS-13 #1).
3. **The ghost redesign, whole** (D-7 + MISSED-4 + GHOST-PLATE + L-D8/C-4(a) + L-D4/C-4(b)):
   `getGhostStyle` and the `ghostStyle` prop **deleted** (L-D8 verbatim — *derive locally; delete the
   prop*); three boxes — a **fixed plate**, a **wrapper** carrying only the decomposed
   `rotate`/`skewX`/`scale` (value.js `decomposeMatrix2D`/`decomposeMatrix3D`, the demo's first
   `@mkbabb/value.js/transform` consumer), a **swatch** carrying the paint. Translation dropped rather
   than composed inside a clipping scaled frame; `transform` read **only** in the UA-normalised
   `matrix()`/`matrix3d()` form, anything else → no wrapper transform and **no hand-rolled parser**;
   `opacity: "0"` paints an invisible payload on a **visible** plate. **Reserved media box**
   (`w-36 h-24`, M9's rung lock honoured — cured, not re-rung) and a **terminal bare `v-else`**, so no
   keyframe renders an empty slot.
4. **Same-family riders** (G10's own Carries): D-2/L-D9 (`:title` per row) · D-12 + D-15 (one alignment
   rule; the panel bounded by reka's published `--reka-tooltip-content-available-height`) · L-D14 (one
   rounded percent) · L-D15 (`<img @error>` → the owner records `failed`) · MISSED-6 (`overflow-x-clip`
   on the rows scroller). **MISSED-3's box law is NOT engaged — this unit moves no type rung**;
   KF.W6's `text-mono-small` + `max-h-[12.6em]` pair stands untouched. **I-35 §2 honoured: nothing is
   re-filed under `/timeline`** — the height bound is written on THP's own root, the demo half of D-15.
5. **G11 fixture 3 — STATED → RUNNING.** The four assertions X.KF.W7.e could only write out are four
   `describe` blocks: **(a)** eviction on edit / move / remove / clear / import-over, and the undo that
   KEEPS a valid capture; **(b)** ONE `failed` entry, no second attempt (3 hovers → **1** capture call),
   the message rendered, the in-flight state announced once politely, and the un-stick on edit;
   **(c)** the terminal state's own words with the plate still present; **(d)** the plate carries no
   `transform` while the wrapper carries `rotate(1.5707963267948966rad) … scale(1, 1)` with the 300px
   translate **dropped** and no `scale(0.3)` anywhere. **25 tests, 25 green**; ⟨cmd⟩
   `grep -cE '^\s*(test|it|describe)\.skip'` → **0**. **None of the twelve tracked
   `test/demo/instrument/` files was edited.**

#### Gate readings BEFORE → AFTER (settled bytes, double-run — ⟨`diff run1 run2`⟩ → no output)

| gate | BEFORE (§Resume baseline, `41a7ebb6`) | AFTER (`4e2a715f`) | witness |
|---|---|---|---|
| **G10** | **RED** — write-once cache, no eviction, no retry ceiling, ghost composed on the bordered element | **GREEN** | `previews.delete` → **1** (`useTimelineBuild.ts:64`, inside `evictStalePreviews`) · `:preview-cache`/`previewCache[`/`previewLoading[` in `demo/`+`test/` → **0** · `return null` in `useTimelineBuild.ts` (code) → **0**, `} finally {` → **1** · `:ghost-style`/`getGhostStyle(`/`ghostStyle:` → **0** · `scale(0.3) ${vars` in TT → **1 → 0** (the sole survivor is the comment at `:339` that convicts it) · bare `v-else` in THP → **1**, `No previewable properties` → **1** · reserved box `w-36 h-24 grid place-items-center` → **1** · `Preview unavailable` → **1** · `const scrubAndCapture = async (percent: number): Promise<string>` → **1** |
| **G11** (fixture 3's G10 half) | **RED** — the four assertions STATED in the header, running nowhere | **GREEN** | ⟨cmd⟩ `npx vitest run --project demo test/demo/instrument/timeline-hover-preview.test.ts` → **25 passed**, twice · leg (i) still returns **exactly the four W7 fixtures and only those** (⟨cmd⟩ `git grep -lE 'TimelineHoverPreview\|previewCache\|previews\|SequenceScrubber' HEAD -- test/` → 4 files) |

**Typecheck** — ⟨cmd⟩ `npm run check` → **exit 0**; `error TS` → **54**, ⟨cmd⟩ `… | grep -cE
'instrument/timeline'` → **0**. The 54 are the frontier's pre-existing set over 22 files (OrbitalDrag,
EasingSidebar, ChannelControls, three `src/` TS6133s …), **not one of them this unit's**.
**Suite** — ⟨cmd⟩ `npx vitest run` → **147 files passed | 5 skipped · 1507 passed · 3 expected fail ·
0 failed**. Siblings' fixtures 1–2 re-run at the settled bytes → **23 passed**.

#### The one declared deviation, with the measurement that forced it

`.c`'s design §1 places the cache at `KeyframeTimeline.vue:217-218`. **The reactive map, the eviction
watcher and the hover handler are there.** What moved is the three pure RULES — `previewKey`,
`evictStalePreviews`, `capturePreview` — now exported from `composables/useTimelineBuild.ts`, beside the
`scrubAndCapture` they memoize. **The cure's shape is unchanged in every particular.**

The forcing measurement, not a preference: fixture 3 must assert (a) and (b), which are properties of
the cache, and **`KeyframeTimeline.vue` cannot be mounted in this test realm at all** — ⟨cmd⟩ a probe
mount → `Error: Cannot find package '@mkbabb/keyframes.js' imported from
…/node_modules/@mkbabb/glass-ui/dist/useSpring-BCHxLjwv.js`: the glass root barrel (`Button`/`Card`/
`CardContent`/`Separator`) resolves its own peer through node from **inside `node_modules`**, where
vitest's `resolve.alias` does not reach (the `/tooltip` subpath fixture 1 uses is unaffected, which is
why fixture 1 mounts `TimelineTrack` and this one cannot mount its owner). Two alternatives were
measured and rejected: **mocking the glass barrel** (four doubles to reach logic that touches none of
them — contrivance, against probe parsimony), and **exporting the rules from the SFC** (⟨cmd⟩
`tsc --noEmit -p tsconfig.test.json` → `error TS2614: Module '"*.vue"' has no exported member
'PreviewEntry'` — `demo/env.d.ts`'s ambient shim gives leg 2 a default export only, and
`timelineTypes.ts` is `.b`'s serial file, outside this unit's §Bounds). The fixture therefore exercises
**the same functions the component calls**, with the capture — the one thing a test must be able to
make fail — as the only injected seam. It is also `feedback_no_god_modules` read straight.

#### Residuals, each with a named owner

1. **`timeline-mount-projection.test.ts` / `timeline-mount-keyboard.test.ts` still pass
   `previewCache: {}` / `previewLoading: {}`** to `TimelineTrack` — dead props since `4e2a715f`, inert
   (both files: **23 tests green** at the settled bytes) and **outside this unit's writable set**.
   **Owner: `.i`** (both files are its) — one line each, drop the two keys. Not a gate, and not a thing
   this seat may reach.
2. **The ghost's source narrows from the merged `stop.vars` to the head keyframe's `vars`** — the direct
   consequence of L-D8's *"derive locally; delete the prop"* (the prop was *"a pure function of prop
   #1"*). The rows have always rendered `keyframe.vars`, so ghost and text now agree where a
   multi-member stop could previously make them disagree. **Declared, not hidden.** Owner: `.j`, to
   record; no banked row asks for the merged set at the ghost.
3. **`snapshotCapture.ts` is in this unit's writable set and was not written** — N-8's widening landed at
   `.e` (`53abdf29`) and G10 asks nothing further there. No residue.
4. **The 3D branch renders rotation + scale only**; perspective is not represented in a 64px plate
   (design §5, carried verbatim). Stated, not owed.
5. **WebGL blank-resolve** is undetectable at the capture seam — a successful capture of nothing. Stays
   **SS-13 residue #1**; the code comment now says so at the site.
6. **`.h` inherits settled bytes**: `TimelineTrack.vue`'s `TooltipContent` is at **`:193`** with
   `class="max-w-56"` and still **no `:aria-label`**; THP now exposes a `computed` **`altText`** that
   re-derives on the ghost→image swap — the §3 hand-off `.c` designed, ready for `.h`'s `:aria-label`
   to carry the same sentence. G9 is untouched by this unit and stays honestly RED.

#### Escalations

**NONE.** No write outside the writable set; no gate greened by editing a tracked witness; no
`test.skip`, no try/catch around a defect, no allowlist, no producer selector copied, no
`node_modules` patch.

#### Commits (2 — 1 keyframes.js, 1 value.js; pathspec on every one)

| repo | sha | meaning |
|---|---|---|
| keyframes.js | **`4e2a715f`** | `fix(kf/timeline-preview): G10 — the cache is a cache and the ghost tells the truth (KF.W7 .g, ONE family)` — the family whole, five files, unsplit |
| value.js | (this commit) | `evidence/W7/G10-GHOST-CACHE-LANDING.md` + these receipts |

### X.KF.W7.h

SERVED MODEL: `claude-opus-5[1m]` · **2026-09-18** · Resume group 2 — **THE A11Y FAMILY, RE-HOMED
WHOLE (G9)**. Sections executed: §Carry **P5** (`:171-181`) · **P7** (`:198-219`) · §Gates **G9**
(`:293-295`), **G11** (`:301-307`, fixture 3's G9 half) · §Sequencing's commit-families line
(`:340`).
**Status: DONE.** **G9 RED → GREEN · G11 fixture 3's G9 assertions STATED-NOWHERE → RUNNING (11).**
Evidence: `evidence/W7/G9-A11Y-LANDING.md` (opens `SERVED MODEL: claude-opus-5[1m]`).

**Substrate**: kf `master` ≡ `origin/master` ≡ **`4e2a715f`** (`.g`'s landing) at open.
**CRASH-RECOVERY**: ⟨cmd⟩ `git -C ../keyframes.js status --porcelain` at open → **2 lines, both the
untracked `docs/tranches/V/coordination/VALUEJS-INBOUND-*.md`** every prior seat has recorded —
**0 paths inside this unit's writable set, nothing inherited, nothing rewritten**. vjs likewise: no
dirty path under `docs/tranches/X/keyframes/evidence/W7/` or `execution/B/KF-W7.md`.

**Step 0 (E13, seat-level)**: COHESION §0j read to the file end through **§0q** — ⟨cmd⟩
`grep -n 'KF\.W7' COHESION.md` → **one hit, `:1108`**, §0o's runner-dead paragraph (chassis, not
cargo); **no KF.W7 ruling, nothing owner-gated away from this unit**. ⟨cmd⟩
`/usr/bin/find <the four paths> -maxdepth 1 -type f -name '*.md' -newermt '2026-09-18 18:15'` →
**nothing**. `INBOX.md`'s status cells reproduce `.g`'s reading: **I-32 · I-33 · I-34** UNREAD, all
three routed to **X-W0.j**; **I-35** `READ + CONSUMED WHOLE`, its third-revision delta routed to
`.j`. **0 unrowed · 0 `I-n` minted · 0 UNREAD in this unit's scope. E13 MET by routing.**

#### Act 0 — anchors re-derived at the bytes `.g` settled (D-19)

All four EXACT at `4e2a715f`: `TooltipContent` **`TimelineTrack.vue:193`** (`class="max-w-56"`, no
`:aria-label`) · marker `@mouseenter` **`:174`** · the tick band **`:107-120`** · `stopLabel`
**`:307`**; THP's `altText` — `.g`'s §3 hand-off — **`:222`**. The reka witness re-quoted from the
installed package, not inherited: ⟨cmd⟩ `sed -n '87p' reka-ui/dist/Tooltip/TooltipContentImpl.js` →
`const ariaLabel = computed(() => props.ariaLabel || currentElement.value?.textContent);` — and its
render builds `VisuallyHidden { id: contentId, role: "tooltip" }` around `ariaLabel.value`, which is
what makes the end-to-end assertion below possible at all. **The producer forwards the prop**: glass
`TooltipContent` declares `ariaLabel: {}` and hands everything but `class`/`surface` to reka through
`useForwardPropsEmits` ⟨`glass-ui/dist/tooltip-OxciiZm6.js`, the `__name: "TooltipContent"` block⟩ —
so the cure is a prop the producer already supports, and **no relay is owed and none is filed**.

**TWO DRIFTS, recorded as INTENT at the true bytes rather than followed as numbers:**

1. **RR-A missed-1's cure element has taken another role.** The row prescribes `role="group"` +
   `aria-label` on the rail; the rail now carries **`role="slider"`** (G8's scrub cure, `.d`'s), and
   ⟨cmd⟩ `timeline-mount-keyboard.test.ts:183` `expect(t.rail.getAttribute("role")).toBe("slider")`
   pins it from a file **outside this unit's writable set**. One element carries one role, so the
   two attributes land on **the rail's CONTAINER** — which is what G9's assertion asks for in its
   own words (*"the rail has an accessible container"*) and what `.d`'s residual 1 called it.
2. **The description's head cannot be `Keyframe at ${pct}%`.** The design predates **C-5 (THP)**;
   saying `Keyframe at 25%` for an authored `entry 100%` would re-commit C-5 in the AT channel on
   the panel just cured for the eye. The head reads the **authored** selector, resolution secondary:
   `Keyframe at entry 100% (25%).`

#### Act 1 — ONE commit, the family whole: kf `15c95de1`

Three files, one meaning, **no split**: `components/TimelineHoverPreview.vue` ·
`components/TimelineTrack.vue` · `test/demo/instrument/timeline-hover-preview.test.ts`.
⟨cmd⟩ `git diff --stat` → **3 files changed, 448 insertions(+), 43 deletions(-)**. Pathspec on the
commit itself; ⟨cmd⟩ `git status --porcelain` after → **only the two pre-existing untracked INBOUND
letters**, `dev.sh` in zero commits, no sibling path touched.

1. **MISSED-1 — the panel's name is PASSED, never scraped.** `:aria-label="describeStop(stop)"` at
   the `TooltipContent` mount takes reka's FIRST arm, so the untracked once-captured `textContent`
   read is never reached. The string is **derived** from the data that renders the panel,
   **punctuated at every boundary** (`. ` per sentence, `; ` between declaration rows, terminal `.`)
   and **re-derived** by construction — it is a pure function of the keyframe and its preview entry,
   so the ghost→image swap changes the string, which changes the prop, which reka's own `computed`
   re-evaluates.
2. **Its placement is declared, and it is a placement and not a shape.** `describeKeyframe` is a
   named export of **THP's plain `<script>` block**, not of the track. The design's own next
   sentence forbids re-deriving `hasGhost` by hand in TT; after C-5 the description has **two** such
   inputs (the ghost predicate **and** the authored caption) and both live in THP. Placing it there
   collapses a duplication instead of creating one: the caption, the `<img alt>` and the ghost arm
   now read the **same six exported derivations**, so the description and the panel cannot disagree.
   `vue-tsc` resolves the SFC's real type; the `*.vue` ambient shim is scoped to `check`'s second
   leg, which parses no SFC ⟨`demo/env.d.ts`'s own narrowing comment⟩.
3. **D-10 (KeyframeTimeline) — one capture seam, both modalities.** `@focus` beside `@mouseenter` on
   the marker. The tooltip opens on focus (reka wires it straight to `onOpen`), so a keyboard user
   opened the panel and got the ghost branch forever: their keyframe's preview was never requested,
   by anything. The emit NAME is kept — renaming it is not the cure.
4. **RR-A missed-1 — the two-attribute cure, at the container.** `role="group"
   aria-label="Keyframe timeline"` on the rail's container, and `aria-hidden="true"` on the tick
   band (~5-15 bare percent strings that interleaved into the AT tree as **content**, saying nothing
   the marks do not announce through `aria-valuetext`, and changing count with zoom). Reader 3 rides
   the same family: `stopLabel` now **leads with the typed label**, so N sliders are told apart by
   the author's word before the number.
5. **M7 — DISCHARGED BY MEASUREMENT, not re-spent.** DISSENT-4 binds the judgement to the verbatim
   element, so: ⟨cmd⟩ `grep -A1 'text-mono-small' THP` → `class="text-mono-small
   text-muted-foreground max-h-[12.6em] overflow-x-clip overflow-y-auto w-full"
   data-register="code"`; ⟨cmd⟩ `grep -c 'text-admin-label' THP` → **0**. The registers, from the
   installed producer: `text-admin-label {… **text-transform: uppercase**; letter-spacing:
   var(--type-tracking-caps) …}` vs `text-mono-small { font-family; font-size; line-height }` —
   **no transform, no caps tracking**. **KF.W6's D-4 performed the swap under MISSED-3's law**, box
   re-denominated `max-h-[12.6em]` in the same commit. **MM-29's pairing rider has no caps register
   left to pair with**, so `normal-case tracking-normal` is NOT written — it would undo nothing and
   would be inert class noise standing in for a cure a closed wave already landed. **M7's AT half is
   cured here by construction**: a prop is a string and no type register reaches it.
6. **G11 fixture 3 — 11 assertions, RUNNING.** The prop is passed; `; `-separated rows with a
   terminal `.`; label-first; the authored selector, never a fabricated percent; the authored CASE
   (`var(--myVar)` present, `VAR(--MYVAR)` absent); ghost → ready → failed re-derivation across
   `nextTick`; **the end-to-end reading — focus the marker, then assert the `role="tooltip"` node
   reka actually builds equals the string we passed**, so the fallback is proven not to fire rather
   than assumed not to; `@focus` arms the capture and `@mouseenter` still does; the group's name;
   every tick inside an `aria-hidden` ancestor; the marker's own label-led name. **36 tests, 36
   green** (25 of `.g`'s + 11); ⟨cmd⟩ `grep -cE '^\s*(test|it|describe)\.skip'` → **0**. **None of
   the nine tracked `test/demo/instrument/` witnesses was edited.**

#### The one declared contract change, with the measurement that forced it

`TimelineTrack`'s `previews` prop becomes **optional**, as the leaf's own `entry` already is.
`.g` replaced `previewCache`/`previewLoading` with a single **required** `previews` Map and could
not update the two sibling fixtures that mount this component (outside its writable set — its
residual 1, owner `.i`). The only read of that map sat inside `TooltipContent`'s **slot**, which
renders only while the tooltip is open, so the stale mounts never touched it. **This unit's
`:aria-label` is a prop of `TooltipContent` itself**, evaluated on every render of the panel's mount
— which turned the latent break into ⟨cmd⟩ `TypeError: Cannot read properties of undefined (reading
'get')` × **16 failures across fixtures 1 and 2** at the first run.

**The cure is the contract, not a guard**: a cache's absence is a **cold cache**, not an error. Every
mark, gesture and keyboard route works without one, and a cacheless mount renders the ghost branch
throughout — which is exactly what the description then says. The read is **total at both sites**
(`previewFor`), never guarded at one of them; no `?.` is scattered through the template and no empty
Map is fabricated. Nothing of the old two-map API survives, so this is not a compat shim: the dead
`previewCache`/`previewLoading` keys in fixtures 1 and 2 remain `.i`'s one-line-each cleanup,
unchanged. **The alternative — editing those two fixtures — is outside this unit's hard bound and
was not taken.**

#### Gate readings BEFORE → AFTER (settled bytes, double-run — ⟨`diff run1 run2`⟩ → no output)

| gate | BEFORE (§Resume baseline, `41a7ebb6`) | AFTER (`15c95de1`) | witness |
|---|---|---|---|
| **G9** | **RED** — the description is reka's untracked once-captured `textContent`; the rail has no accessible container | **GREEN** | `TooltipContent` at `:252-257` carries **`:aria-label="describeStop(stop)"`** · `describeKeyframe` in `demo/` → **2 files** (was 0) · `role="group"` in TT → **1**, named `aria-label="Keyframe timeline"` (was 0) · tick band `aria-hidden="true"` → **1** · marker `@focus`/`@mouseenter` → **1 / 1** · `text-admin-label` in THP → **0** · `^export const` in THP → **6** · `aria-label` in TT → **6 hits enumerated whole** (`:10` prose · **`:16` group** · `:46` pan · `:114` rail · `:206` marker · **`:256` TooltipContent**) |
| **G11** (fixture 3's G9 half) | **RED** — no assertion named the description, the group or the focus seam | **GREEN** | ⟨cmd⟩ `npx vitest run --project demo test/demo/instrument/timeline-hover-preview.test.ts` → **36 passed**, twice · the four fixtures together → **65 passed**, twice · leg (i) still returns exactly the four W7 fixtures |

**Typecheck** — ⟨cmd⟩ `npm run check` → **exit 2**; `error TS` → **54** over **22 files**; ⟨cmd⟩
`… | grep -cE 'instrument/timeline'` → **0** and `grep -c 'timeline-hover-preview'` → **0**. The 54
are the frontier's pre-existing set, the same 54-over-22 `.g` measured, **not one of them this
unit's**. ⟨**A correction to `.g`'s receipt, recorded rather than smoothed (E-3: addendum-beside)**:
that receipt published this command as *"exit 0"*. Measured directly rather than through a pipe it
is **2**, and it was **2 before this unit wrote a byte** — the pre-existing 54 fail `check`'s first
leg. The COUNT, not the exit, is the reading that separates a unit's work from the frontier's, and
the count is unmoved.⟩
**Suite** — ⟨cmd⟩ `npx vitest run` → **147 files passed | 5 skipped · 1518 passed · 3 expected fail
· 0 failed**. `.g` left **1507**; **+11** is exactly this unit's new assertions.

#### Residuals, each with a named owner

1. **The nested-slider structure the drift leaves behind.** The rail is `role="slider"` (G8's) and
   CONTAINS the N marker sliders and their carets; `slider` is a Children-Presentational role, so a
   strict user agent may prune them. Neither cure is this gate's: moving the playhead role off
   `.timeline-track` breaks `timeline-mount-keyboard.test.ts:183` (outside this unit's bound) and
   G8 with it, and lifting the markers out of the rail moves them out of the element whose scoped
   block declares `--timeline-hit-floor` and `--timeline-caret-offset` **for them** — an ARIA fix
   traded for a geometry regression. **DECLARED in the file**, at the rail, not swallowed.
   **Owner: `.j`'s close residuals / KF.W10**, as a single design question (which element is the
   playhead slider), never as a per-seat patch.
2. **Fixtures 1 and 2 still pass the dead `previewCache: {}` / `previewLoading: {}` keys.** Inert
   since `4e2a715f` and now inert against an optional prop; **23 tests green** at the settled bytes.
   **Owner: `.i`** — unchanged from `.g`'s residual 1, one line each.
3. **The caption's own register is `text-mono-caption`, which IS a caps register** ⟨producer:
   `text-mono-caption { …; letter-spacing: var(--type-tracking-caps); text-transform: uppercase; }`⟩,
   so a named scroll phase renders `ENTRY 100%` to the eye while the AT description says
   `entry 100%`. **Out of M7's scope by its own words** (M7's subject is the declaration dump) and
   the register is **KF.W6's landed role-(c) numeric decision on a CLOSED wave** — re-cutting it
   here would re-open a closed ruling on this seat's taste. **Declared, not cured. Owner: `.j`'s
   close residuals / KF.W10.**
4. **`KeyframeTimeline.vue` is in this unit's writable set and was not written.** D-10's ROW is
   record-qualified to kf-KeyframeTimeline; its BYTES are the marker's, in `TimelineTrack.vue`. The
   owner's handler (`onDiamondHover` → `capturePreview`, `:483-484`) already does the right thing
   for whichever modality asks. **No residue.**
5. **The description says `Preview unavailable: <error>` where the panel renders `Preview
   unavailable — <error>`.** The design's punctuation for the AT channel, the panel's for the eye;
   both derive from the same `entry.kind` and the same `entry.error`, so neither can drift from the
   state. **Stated, not owed.**

#### Escalations

**NONE.** No write outside the writable set; no gate greened by editing a tracked witness; no
`test.skip`, no try/catch around a defect, no allowlist, no producer selector copied, no
`node_modules` patch; nothing filed under `/timeline` (I-35 §2) and no new producer row opened.

#### Commits (2 — 1 keyframes.js, 1 value.js; pathspec on every one)

| repo | sha | meaning |
|---|---|---|
| keyframes.js | **`15c95de1`** | `fix(kf/timeline-a11y): G9 — the tooltip announces what it shows (KF.W7 .h, ONE family)` — the family whole, three files, unsplit |
| value.js | (this commit) | `evidence/W7/G9-A11Y-LANDING.md` + these receipts |

### X.KF.W7.i

SERVED MODEL: `claude-opus-5[1m]` · **2026-09-18** · Resume group 3 — **G14's L-11 CONSUMER BYTE, its
fifth and last**. Sections executed: §Gates **G14** (`:317-319`) · **G4** (`:273-275`, the row this cure
must not trade away) · §Sequencing's *"the posture ruling (G14's consumers, one ruling)"* family line
(`:340`).
**Status: DONE.** **G14 · L-11 RED → GREEN · G4 GREEN → GREEN (unmoved, measured not assumed).**
Evidence: `evidence/W7/G14-L11-CONSUMER-BYTE.md` (opens `SERVED MODEL: claude-opus-5[1m]`).

**Substrate**: kf `master` ≡ `origin/master` ≡ **`15c95de1`** (`.h`'s landing) at open.
**CRASH-RECOVERY**: ⟨cmd⟩ `git -C ../keyframes.js status --porcelain` at open → **2 lines, both the
untracked `docs/tranches/V/coordination/VALUEJS-INBOUND-*.md`** every seat of this wave has recorded —
**0 paths inside this unit's writable set; nothing inherited, nothing rewritten, nothing stashed**. vjs:
the 17 dirty paths are siblings' (api/, demo/palettes, `scripts/dev/dev.sh`) — **none touched**, and no
dirty path under `docs/tranches/X/keyframes/evidence/W7/` or `execution/B/KF-W7.md`.

**Step 0 (E13, seat-level)**: COHESION §0j read to the file end through **§0q** — ⟨cmd⟩
`grep -n 'KF\.W7' COHESION.md` → **one hit, `:1108`** (§0o's runner-dead paragraph — chassis, not cargo);
**no KF.W7 ruling, nothing owner-gated away from this unit**. Four-path sweep at this seat's own clock
(**18:5x EDT**), classification from each `INBOX.md` row's **Status cell**, `INBOX.md` self-excluded:
⟨cmd⟩ `/usr/bin/find <the four paths> -maxdepth 1 -type f -name '*.md' -newermt '2026-09-18 18:37'` →
**no output**; against 17:16 the only hit is `glass-outbound-2026-09-18-valuejs-o26-reply.md`, **already
rowed I-35, `READ + CONSUMED WHOLE`**, its third-revision delta routed to `.j` by seat 0. Counts: `V/` 10
· `V/coordination/` 18 · BK coordination 9 · kf coordination **12 `.md` + `vnext/`** · atlas
`P/coordination/` 28. ⟨**A counting reconciliation, declared rather than swallowed**: prior sweeps record
kf coordination as **13 *entries*** — 12 `.md` files **plus the `vnext/` directory**; ⟨cmd⟩
`/bin/ls -1 …/*.md | wc -l` → **12** and ⟨cmd⟩ `/bin/ls -lt` shows `vnext/` at the head. Same tree, two
units of count; **nothing left or arrived**.⟩ **0 unrowed · 0 new `I-n` · 0 UNREAD in this unit's scope**
(I-35's §2 clause binds `.h`'s `TooltipContent` and `.j`'s O-28 re-read — it names no ops-layer byte).

#### Act 0 — anchors re-derived at the bytes (D-19), and the ONE drift

Three of four EXACT at `15c95de1`: ops `rebuild: () => void` **`:19`** · the latched `rebuild()` **`:42`**
inside the rAF at **`:40`** · `toast.success` **`:59`**. **DRIFTED: the builder's async rebuild.** The
brief's `useTimelineBuild.ts:43` is the pre-`.g` coordinate — `.g`'s preview-cache rules block now stands
above it — and ⟨cmd⟩ `grep -n 'const rebuild = async (): Promise<void>' useTimelineBuild.ts` → **`134`**,
one hit. **INTENT taken at the true bytes** (*the builder's `Promise<void>` must become visible to the ops
layer*); `useTimelineBuild.ts` is **outside this unit's writable set and was not written**.

#### Act 1 — the consumer byte, ONE commit: kf `16f58d54`

`useTimelineOps.ts` + the two fixtures' stubs (the typechecker's own demand, §Act 2). ⟨cmd⟩
`git show --stat` → **3 files changed, 44 insertions(+), 10 deletions(-)**.

1. **The type.** `rebuild: () => void` → **`rebuild: () => Promise<void>`**. The erasure was the defect:
   the builder had been `async (): Promise<void>` all along and this parameter threw it away, so no caller
   of the ops layer could tell a finished build from a started one.
2. **The settlement, latch RETAINED.** `scheduleRebuild` now returns `Promise<void>`: the same
   `rebuildFrame` guard, the same single `requestAnimationFrame`, and inside the callback
   `void rebuild().then(settle, settle)`. **Callers coalesced into one frame receive the SAME promise** —
   the coalescing survives in the settlement as well as in the build. **Nothing is un-latched**, which is
   this unit's governing lock.
3. **The order.** `const snapshot = async (percent?: number): Promise<void>`; `await scheduleRebuild()`
   (`:87`) **precedes** `toast.success` (`:89`). The posture's third clause is now a fact of the control
   flow rather than a comment about it.
4. **`useTimeline.ts:54` NOT re-pointed** — it already passes the builder's `rebuild`, which IS
   `() => Promise<void>`; zero typecheck errors in that file before or after. In-bounds, unwritten: *a
   wider edit than the typechecker requires is not this seat's to make*.

**Why the settlement RESOLVES on settle rather than rejecting** (the one design judgement, stated so it
can be argued with): `rebuild` is **P3-bound at the builder** — its `catch` publishes `buildError`, toasts
with a Retry (★ S-7's shape) and leaves a state the owner renders. Re-throwing here would give
`addKeyframe` · `removeKeyframe` · `moveKeyframe` (at pointer rate) · `updateKeyframeProperty` an
unobserved rejection for a failure that had **already spoken** — a SECOND failure channel, minted at the
one gate whose whole subject is that there be one. The success toast's claim (*a keyframe was captured at
this percent*) is true either way, and a failed build speaks in its own voice at the same moment.

#### Act 2 — the two fixtures, and the authority for each line

- **The stubs: the typechecker's demand, discharged inside this unit.** `npm run check`'s legs are
  `&&`-chained and leg 1 is RED at the frontier, so **`tsc -p tsconfig.test.json` never runs under it**.
  Run directly, the signature change raises exactly two errors — ⟨cmd⟩ `npx tsc --noEmit -p
  tsconfig.test.json` → `timeline-mount-keyboard.test.ts(236,60)` and
  `timeline-mount-projection.test.ts(272,60)`, both TS2345 *"Argument of type `() => void` is not
  assignable to parameter of type `() => Promise<void>`"*. Cured by `async () => {}` / `async () => {
  builds++; }`; the counter still increments **synchronously on entry**, so no assertion's timing moves.
  **25 errors BEFORE → 23 AFTER**, ⟨cmd⟩ `diff` naming those two and nothing else.
- **The dead `previewCache: {}` / `previewLoading: {}` keys — an inherited residual, its OWN commit
  (`1fa98a5d`, 4 deletions, 0 insertions).** Inert fallthrough attributes describing a contract `.g`
  replaced with the optional `previews` Map. **Routed here by name, twice** — `.g`'s residual 1 and `.h`'s
  residual 2 (*"Owner: `.i` — one line each"*). **The tension with this unit's lock is DECLARED**: the lock
  says the fixtures are touched only as the typechecker demands, and this is four lines more than that —
  taken because both preceding seats assigned it to this unit by name, it is inside the hard writable
  bound, it removes bytes rather than adding any, and the alternative was a four-line cleanup carried into
  a verify-only `.j` and out to KF.W10. **A separate commit precisely so the two meanings read apart.**
- **Formatting**: ⟨cmd⟩ `npx prettier --check` → the ops file **clean**; both fixtures carry **pre-existing**
  divergences whose line numbers (f1 `58 · 138 · 177`; f2 `25 · 80 · 83 · 123 · 132-134 · 145-146 · 309 ·
  361 · 394 · 399 · 412 · 433 · 435 · 437 · 440 · 443-445 · 450`) **intersect none of this unit's hunks**
  (f1 `@@ -110,2 +109,0 @@` · `@@ -272 +270,5 @@`; f2 `@@ -97,2 +96,0 @@` · `@@ -236 +234 @@`). Reformatting
  either file whole is the wider edit the lock forbids.

#### Gate readings BEFORE → AFTER (settled bytes, ONE script over `git show <ref>:<path>` so both ends run
the SAME probes; double-run — ⟨cmd⟩ `diff run1 run2` → no output)

| gate | BEFORE (`15c95de1`) | AFTER (`1fa98a5d`) | witness |
|---|---|---|---|
| **G14 · L-11** | **RED** — the builder is async and the ops layer declares it `void`; acknowledgement precedes outcome at exactly one site | **GREEN** | ops param `() => void` **1 → 0**, `() => Promise<void>` **0 → 1** · `const scheduleRebuild = (): Promise<void>` **0 → 1** · `const snapshot = async (` **0 → 1** · `await scheduleRebuild()` / `toast.success` lines **— / 59 → 87 / 89** (the await PRECEDES the toast) · builder decl unwritten at `:134` |
| **G4** | **GREEN** | **GREEN — unmoved** | `scheduleRebuild` CALL SITES **5 → 5** · the only `rebuild(` invocation (excl. the prose line `:27`) **`:42` → `:66`, inside the rAF at `:40` → `:64`** · latch guard `if (rebuildFrame !== null) return` **1 → 1** · dirty check `if (next === kf.percent) return;` **1 → 1** · `clamp(newPercent, 0, 100)` **1 → 1** · fixture 1's two G4 assertions RUNNING |

**Tests** — ⟨cmd⟩ `npx vitest run --project demo` over the four W7 fixtures → **65 passed**, run **twice**,
identical; ⟨cmd⟩ `npx vitest run` → **147 files passed | 5 skipped · 1518 passed · 3 expected fail · 14
skipped** — byte-for-byte `.h`'s figure, **+0**, the right number for a type-seam cure that adds no
assertion. ⟨cmd⟩ `grep -cE '^\s*(test|it|describe)\.skip'` over the four fixtures → **0**.
**Typecheck** — ⟨cmd⟩ `npm run check` → exit **2**; `error TS` → **54** over **22** files; ⟨cmd⟩
`… | grep -c 'instrument/timeline'` → **0**; ⟨cmd⟩ `diff` against the pre-edit run → **ERROR SET
IDENTICAL**. The 54 are the frontier's, the same 54-over-22 `.g` and `.h` measured.

#### Residuals, each with a named owner

1. **G14 has no RUNNING witness for the ordering.** The gate is read at the bytes (the table above) plus
   `.c`'s ruling artifact — exactly as `.e`'s three consumer bytes were read. An executable assertion
   (*the success toast does not fire until the awaited build settles*) needs a new test with a vue-sonner
   double: an addition neither this unit's brief nor its lock authorises. **Declared so `.j` reads the gate
   for what it is. Owner: `.j`'s close residuals / KF.W10.**
2. **P3's channel is still structurally unpainted** (`G14-POSTURE-RULING.md` §0.1: the vue-sonner
   stylesheet is imported nowhere). **Owner: `kf-DemoGlobalChrome` D-1/L-1/C-1, NO-WAVE-OWNER**, glass
   `./toast` at the S-9 swap; M-1 binds any interim. This unit imports nothing and files nothing.
3. **`.g`'s residual 1 / `.h`'s residual 2 — DISCHARGED here** (`1fa98a5d`). Nothing carried forward.

#### Escalations

**NONE.** No write outside the writable set — `useTimelineBuild.ts`, `KeyframeTimeline.vue`,
`TimelineTrack.vue` and all twelve tracked `test/demo/instrument/` witnesses are untouched. No un-latching,
no `test.skip`, no try/catch around a defect, no allowlist, no producer selector copied, no `node_modules`
patch; glass-ui READ-ONLY and no row filed; `scripts/dev/dev.sh` in zero commits; pathspec ON both commits,
each carrying only its own paths; ⟨cmd⟩ `git status --porcelain` after each → only the two pre-existing
untracked INBOUND letters.

#### Commits (3 — 2 keyframes.js, 1 value.js; pathspec on every one)

| repo | sha | meaning |
|---|---|---|
| keyframes.js | **`16f58d54`** | `fix(kf/timeline-ops): G14 L-11 — the acknowledgement waits for the outcome (KF.W7 .i)` — the consumer byte, with the two stub re-points the typechecker demanded |
| keyframes.js | **`1fa98a5d`** | `test(kf/timeline-fixtures): drop the two mounts' dead previewCache/previewLoading keys (KF.W7 .i — .g residual 1 / .h residual 2)` |
| value.js | (this commit) | `evidence/W7/G14-L11-CONSUMER-BYTE.md` + these receipts |

### X.KF.W7.j

SERVED MODEL: `claude-opus-5[1m]` · **2026-09-18** · Resume group 4 — **RE-CLOSE (VERIFY-ONLY: this
seat cured nothing, wrote ZERO keyframes.js bytes and ZERO glass-ui bytes)**. Sections executed:
§Gates **all fifteen**, BEFORE→AFTER (`:255-326`) · §Sequencing's **cross-edges** (`:349-362`) ·
§Excluded (`:369-382`) · §Resume baseline.
**Status: DONE.** **15 GREEN · 0 RED · 0 ESCALATED.** The three owed gates move **RED → GREEN**
against §Resume's baseline; the twelve `## Close` stamped reproduce exactly.
Evidence: `evidence/W7/RECLOSE-GATE-TABLE.md` (opens `SERVED MODEL: claude-opus-5[1m]`).

**Substrate**: kf `master` ≡ `HEAD` ≡ **`1fa98a5d`** (`origin/master` **`41a7ebb6`** at the read —
four unpublished resume commits, pushed by this seat at Act 5); value.js `HEAD` ≡ **`fff145da`**.
**CRASH-RECOVERY**: ⟨cmd⟩ `git -C ../keyframes.js status --porcelain` at open → **2 lines, both the
untracked `docs/tranches/V/coordination/VALUEJS-INBOUND-*.md`** every seat of this wave has recorded;
⟨cmd⟩ vjs `git status --porcelain` → 15 dirty paths, **all siblings'** (`demo/palettes/**`,
`demo/picker/**`, `demo/shell/**`, `V/reformation/CARRY-LEDGER.md`, `scripts/dev/dev.sh`,
`X/waves/evidence/`, two `e2e/smoke/` specs). **ZERO dirty paths inside this unit's writable set —
nothing inherited, nothing rewritten, nothing stashed, and not one sibling path touched.**

**Step 0 (E13, seat-level)**: `COHESION.md` §0j read to the file end through **§0q** (1202 L) —
⟨cmd⟩ `grep -n 'KF\.W7' COHESION.md` → **one hit, `:1108`**, §0o's runner-dead paragraph and its
dated erratum (the cause re-measured as twelve HTTP 429s outrunning the runner's 180 s window, not
the concurrency ceiling) — **chassis, not cargo; no KF.W7 ruling, nothing owner-gated away from this
unit**. The four-path sweep is Act 4.

#### Act 1 — all fifteen gates, BEFORE→AFTER against BOTH baselines

One script over `git show HEAD:<path>` (never the worktree — four tracks share this checkout),
**double-run**: ⟨cmd⟩ `diff run1 run2` → **no output — DOUBLE-RUN IDENTICAL**. The full table with
every witness is at `evidence/W7/RECLOSE-GATE-TABLE.md` §1; the verdicts:

| gate | BEFORE-A (`ae83da07`) | BEFORE-B (§Resume, `41a7ebb6`) | AFTER (`1fa98a5d`) |
|---|---|---|---|
| G1 · G2 · G3 · G5 · G6 · G7 · G8 · G11 · G12 · G13 · G15 | RED | — | **GREEN** (all eleven reproduce `## Close` exactly) |
| **G4** | RED | — | **GREEN — re-measured AFTER `.i`'s G14 cure and UNMOVED** |
| **G9** | RED | **RED** | **GREEN** |
| **G10** | RED | **RED** | **GREEN** |
| **G14** | RED (six postures) | **RED** on its fifth consumer byte | **GREEN — the ruling AND all five bytes** |

**The three that moved, at their witnesses.** **G9**: `:aria-label="describeStop(stop)"` is PASSED at
`TimelineTrack.vue`'s `TooltipContent`, so reka's untracked once-captured `textContent` fallback is
never reached; `describeKeyframe` **0 → 2 files**; `role="group"` **0 → 1** on the rail's CONTAINER
with a name; the tick band `aria-hidden`; `@focus` beside `@mouseenter` (**1 / 1** as code — the
second `@mouseenter` hit at `:185` is prose, read at the bytes and not counted). **G10**:
`previews.delete` → **1** inside `evictStalePreviews`; **live** `previewCache`/`previewLoading` → **0**
(2 surviving hits are the comment that convicts the old shape), **live** `getGhostStyle` → **0** (1
comment at `TimelineTrack.vue:434`), **live** `return null` in the builder → **0** (1 comment at
`:201`), `scale(0.3) ${vars` **as code** → **0**; THP terminal bare `v-else` → **1** (`:68`), reserved
box → **1**, `Preview unavailable` → **2**. **G14·L-11**: `rebuild: () => void` **1 → 0**,
`() => Promise<void>` **0 → 1**, `const scheduleRebuild = (): Promise<void>` → **1**, and
**`await scheduleRebuild()` at `:87` PRECEDES `toast.success` at `:89`**.

**G4 is the gate this seat watched hardest, because `## Close` named the trade in advance.**
`.i`'s lock was *await the latched build, never un-latch it*. Measured at the settled bytes: the file's
**only** `rebuild()` invocation is **`:66` `void rebuild().then(settle, settle)`, INSIDE the rAF
callback**; latch guard **1**; dirty check **1**; `scheduleRebuild` **7** (6 → 7, the settlement's own
return). **Nothing was un-latched and G14's row was not bought with G4's.**

#### The two readings whose DENOMINATOR moved — disclosed, not smoothed

1. **G11's leg (i), under the literal baseline pattern, now returns 2 of 4.** `.i`'s `1fa98a5d`
   deleted the dead `previewCache: {}` / `previewLoading: {}` keys from fixtures 1 and 2 — a residual
   **two prior seats routed to it by name** — so those files no longer carry the token the baseline
   command greps for. Under the SURFACE-naming probe the gate is actually about, ⟨cmd⟩
   `git grep -lE 'TimelineTrack|TimelineHoverPreview|KeyframeTimeline|SequenceScrubber|previewCache|previews' HEAD -- test/`
   → **exactly the four W7 fixtures and only those four**. **Both halves of the Assertion hold**: the
   four mount (the four + the two named read-only witnesses → ⟨cmd⟩ **71 passed / 71**, twice,
   identical) and *"only those files"* is EXACT — **no tracked file names the surface and none was
   edited to pass a gate** (the twelve tracked witnesses are byte-untouched by every seat of this
   wave). A probe for a cache prop that no longer exists shrank; the mount it proxied for is measured
   directly. **Recorded because a GREEN whose witness command changed meaning is exactly the reading a
   successor would otherwise inherit without knowing.**
2. **G15's `useCodeHighlight(` witness moved 3 → 2 files.** Cause named at its commit: KF.W6's
   **`6cebdb33`** (S-9 — the paste well becomes the producer's `Textarea`) retired the highlighter at
   the CSS-paste well. **The fold's own subject is unmoved**: `KeyframesAddDialog.vue` still wraps
   `<CSSPasteDialog>` (`:2`/`:55`, imported `:70`) — **one shell, the twin a thin adapter**. The
   dialogs' line counts likewise moved (`## Close` 138 / 142 → **184 / 289**) under eleven KF.W6
   commits landing **on the folded shell**, which is `.f`'s residual 5 (*FOLD FIRST, SWAP SECOND*)
   **holding by measurement rather than by assertion**.

**Suites and typecheck at this seat**: full kf ⟨cmd⟩ `npx vitest run` → **147 files passed | 5
skipped · 1518 passed · 3 expected fail · 0 FAILED**; ⟨cmd⟩ `npm run check` → exit **2**, `error TS`
**54** over **22** files, the same output filtered to **every** KF.W7 bound path → **0** (byte-identical
to the count `.g`, `.h` and `.i` each measured — the 54 are the frontier's and the siblings', published
SCOPED and never as a claim about another wave's bytes).

#### Act 2 — the commit audit: every resume commit against its OWN unit's writable set

Four tracks share this git index, so each of the eight was read whole (⟨cmd⟩
`git show --stat --format= --name-only <sha>`) and compared against the unit plan's grant for the
unit that authored it. Full table at `evidence/W7/RECLOSE-GATE-TABLE.md` §3.

| repo | sha | unit | verdict |
|---|---|---|---|
| kf | `4e2a715f` | `.g` | **CLEAN** — 5 granted files, the family whole and UNSPLIT (the split is what `## Close` escalated); `snapshotCapture.ts` granted and not written — lawful |
| kf | `15c95de1` | `.h` | **CLEAN** — 3 granted files, ONE family unsplit; `KeyframeTimeline.vue` granted and not written — lawful |
| kf | `16f58d54` | `.i` | **CLEAN** — the ops file + the two fixture stubs the typechecker demanded |
| kf | `1fa98a5d` | `.i` | **CLEAN** — the two fixtures, in a SEPARATE commit so the two meanings read apart |
| vjs | `6ee51051` · `c1e883fc` · `f4e19aed` · `6effd200` | seat 0 · `.g` · `.h` · `.i` | **CLEAN** — **6** distinct paths across all four, every one granted |

**The negative findings, each measured here**: **`scripts/dev/dev.sh` in ZERO commits, both repos**;
**`vitest.config.ts` in ZERO commits across the whole wave window** (`ae83da07..HEAD` — the STRUCK
§Bounds row honoured at both sittings, W4's commit-2 registration consumed as an inbound
dependency-cite and never re-authored); **session trailer 8 of 8**; **E-3 HELD** (no resume commit
touches `keyframes/waves/`, `megatranche/registry/` or `keyframes/conformance/`); **the twelve tracked
`test/demo/instrument/` witnesses UNEDITED**; **not one fourier, X-W, X.P or registry path appears**.
**LANDED-WRONG: NONE** — no commit wrote outside its own unit's set and none swept in a sibling
track's staged paths.

#### Act 3 — I-35's third revision consumed, and O-28 RULED to need an addendum-beside

**The delta verified at the producer's bytes**: ⟨cmd⟩ `/bin/ls -l` → **43,967 B** · ⟨cmd⟩
`shasum -a 256 | cut -c1-16` → **`fe75887ccb505eee`** · glass **`6e5a35bc`**. The row is **not**
re-minted — a revision of an already-rowed, already-read letter is not unrowed mail.

**THE RULING: O-28 needs a dated addendum-beside, on exactly one clause.** I-35 §2, quoted at its
bytes: *"Item 6 is the one mis-read: `/timeline` is A-8 alone. A-9 is TooltipContent's block ceiling
… If you re-file A-9 under "/timeline" at W7 the row will go missing."* Read against O-28's own
bytes, **§2.4 IS that filing**: *"The `/timeline` rows A-8/A-9 from your O-20 disposition — they are
answered by R-1..R-3 rather than re-asked."* R-1..R-3 are `/timeline` subpath rows (the export gap,
the absent percent↔position map, `SliderVariant`); **A-9 is none of them.**

**And the letter contradicted itself about one object, which is what makes this substantive rather
than clerical**: **A-9 ≡ O-28's own `R-5`** (*glass `TooltipContent` consumes none of reka's
`--reka-tooltip-content-available-height`*; banked `kf-TimelineHoverPreview` **D-15**), filed **LIVE
two sections above §2.4**. A producer seat disposing O-28 row by row would have read §2.4 as
*answered* and closed A-9 — **the row going missing exactly as warned, despite the live ask sitting
above it.**

**Sent as `O-31`** — `docs/tranches/V/coordination/valuejs-outbound-2026-09-18-kfw7-bh-relay-ADDENDUM-A9.md`,
rowed in `INBOX.md` in the same act: §2.4's A-9 bundling **STRUCK**; A-9 re-homed to **R-5, which
stands exactly as sent**; I-35's answer **consumed** (the tooltip arm exists only at glass HEAD, is
**not** in 9.0.0, and reaches us at the cut after it, inherited by every `<TooltipContent>` with no
markup change — **answered, not declined**), so R-5's interim stands until that cut; R-4 restated as
small and unaffected; §4's two asks restated where they sit (the registry re-install still ESCALATED
to seat 0 / KF.W0; the CSS-entry question ANSWERED at KF.W6 `.l`). **One clerical ask back: grade A-9
at R-5.** **O-28 is UNEDITED (E-3), no new ask is minted, and ZERO bytes were written into the glass
tree** — ⟨cmd⟩ `git -C ../glass-ui log --since='2026-09-18' --grep='KF.W7' | wc -l` → **0**.

**The interim is measured to have landed on the demo side only**: ⟨cmd⟩
`git -C ../keyframes.js grep -c 'reka-tooltip-content-available-height' 1fa98a5d -- demo/` → **1
file**, `TimelineHoverPreview.vue` — `.g`'s bound on our own preview root. **Nothing was re-filed
under `/timeline`, no producer selector was copied, and no `node_modules` byte was patched.**

#### Act 4 — E13, the four-path close sweep at this seat's own clock

Swept read-only at **19:00 EDT**, delta against `.i`'s **18:37**, classification from each `INBOX.md`
row's **Status cell**, never from a bare `grep -i unread`; `INBOX.md` **self-excluded** (SELF-COUNT).
⟨cmd⟩ `/bin/ls -dlt ../glass-ui/docs/tranches/*/ | head -4` → **`BK/`** (Sep 18 17:53) · `BJ` · `BI` ·
`IOS27-MICRO` — **BK still the live glass tranche**. Counts: `docs/tranches/V/` **10** `.md` ·
`V/coordination/` **19** (18 + this seat's own O-31) · BK coordination **9** · kf coordination **12**
`.md` · atlas `P/coordination/` **28**. ⟨cmd⟩
`/usr/bin/find <the four paths> -maxdepth 1 -type f -name '*.md' -newermt '2026-09-18 18:37'` → **TWO
hits, both classified**: (a) `docs/tranches/V/PALETTE-CONTRACT.md` — **not mail**, Track A's own
contract artifact at **`47ea1029`**, clean in the worktree, and the `docs/tranches/V/` count is
**unmoved at 10**, so nothing arrived; **no `I-n` owed, none minted**; (b) this seat's own **O-31**
(self-count). **0 unrowed · 0 new `I-n` · 0 UNREAD in KF.W7's scope.** The three live UNREAD cells
**I-32 · I-33 · I-34** reproduce and each was re-read at its **Routing** cell: all three route to
**X-W0.j / the X formation mail seat** (I-34 beside it to X-EXT-1; I-33's cell states that seat relays
each sibling's section onward), and not one names a keyframes timeline byte. **E13 MET by routing; the
dated sweep line is appended to `INBOX.md`.**

#### Act 5 — the push

**keyframes.js — PUSHED by this seat**: ⟨cmd⟩ `git push origin HEAD:master` → **`41a7ebb6..1fa98a5d`**;
⟨cmd⟩ `git log --oneline origin/master..HEAD` after → **0**. **The sibling-commit disclosure the brief
asks for is an EMPTY SET at these bytes, and it is stated rather than assumed**: ⟨cmd⟩ the same command
*before* the push returned **exactly four, every one KF.W7's own** (`4e2a715f` · `15c95de1` ·
`16f58d54` · `1fa98a5d`) — KF.W6 closed 2026-09-17 and its last commit `41a7ebb6` was already
published, so this fast-forward carried no in-flight sibling work. **value.js is NOT pushed by this
seat**: `origin` trails a history four tracks are writing concurrently, the brief's push instruction
names keyframes.js, and each track publishes its own close. **This seat claims no sibling commit and
stamps no sibling gate.**

#### Act 6 — the LEDGER, edited minimally in place

Re-read immediately before writing (other seats edit it concurrently). ⟨cmd⟩ `git diff -U0` → **two
hunks and no others**: `@@ -51 +51 @@` (this wave's OWN row, its status and commits cells rewritten
with the prior cell **carried whole as the dated log**, never deleted) and `@@ -253,0 +254 @@` (one
appended event line). **No other track's row was touched and the file was never rewritten.** ⟨cmd⟩
real cell-separators per row (escapes removed) → **6 on line 51, 6 on lines 49/50/52, and 6 on the
row before this edit** — the table shape is preserved, and one pipe this seat introduced inside a
vitest figure was escaped on measurement rather than left to break the grid.

#### Residuals — eighteen, each with a named owner; five DISCHARGED and named as discharged

**DISCHARGED at the resume, named rather than dropped**: **`.f` residual 1** (the G9+G10 `.d`/`.e`
file-crossing escalation — cured by the re-partition, no bounds widened) · **`.f` residual 2** (G14's
L-11, at `16f58d54`) · **`.f` residual 5** (the W6∥W7 same-file order lock — KF.W6 CLOSED and its
writes measurably landed **on the folded shell**) · **`.g` residual 1 ≡ `.h` residual 2** (the dead
fixture keys, at `1fa98a5d`) · **`.f` residuals 11 and 14**, already closed at their own lines.

1. **`@vue/test-utils` is in `package.json` and NOT in `package-lock.json`** — re-measured here: **1**
   / **0**. Real but blocking nothing (the fixtures mount through `createApp` over KF.W4's registered
   `plugins: [vue()]`). A lockfile write is a KF.W0 OWNER'S-HAND row and was correctly not taken by
   any seat. **Owner: the orchestrator**, by one `npm install`.
2. **The toaster BLOCKER (`kf-DemoGlobalChrome` D-1/L-1/C-1)** — G14 P3's stated precondition: the
   ★ S-7 house toast channel is structurally unpainted (the vue-sonner stylesheet is imported
   nowhere), so the posture this wave declared depends on a channel that is itself banked-defective.
   M-1 forbids the bare stylesheet import as the fix. **Owner: NO-WAVE-OWNER / KF.W10's ledger**;
   glass `./toast` at the S-9 swap.
3. **The expanded-timeline settlement** (D-10 (TimelineTrack, expanded) + RB-7 + D-16 +
   kf-ChannelControls C-8/D-6 + KT D-7) — one settlement across `RibbonBar.vue` and
   `ChannelControls.vue`, both outside every KF.W7 writable set; its precondition (OP-0 + OP-1) is
   **met**, both settled at `250f527b`. **Owner: NO-WAVE-OWNER / the expanded-timeline spec family.**
4. **Two library-band parse findings, routed and neither cured nor worked around** — the compile
   refuses the legacy `rgba(r, g, b, a)` form every browser returns for a transparent computed colour;
   and the `/css` grammar does not treat comments as trivia inside a declaration list (`a{/* hi */
   opacity:0.5}` yields a declaration NAMED `"/* hi */opacity"`, and inside `@keyframes` the
   declaration is dropped entirely). Defended at the boundary meanwhile by m-7/m-8's name validation.
   **Owner: the value.js library band → KF.W10's ledger + the X·V lane.**
5. **`TimelineKeyframe.easing?` is dead** (never written, never read) and `timelineTypes.ts` is `.b`'s
   serial file. Beside it, **N-9's banked claim is REFUTED at these bytes** and stands as a dated
   measured correction, an addendum-beside and never a registry edit. **Owner: KF.W8.**
6. **KF-AV-17's resize-immune playhead form** — `translateX(calc(p * 100cqw))` still overshoots at
   `SequenceScrubber.vue`'s `.scrub-ball`; a P4 GEOMETRY row under OP-3's re-derivation lock, in no
   seat's file set. Not improvised by any seat. **Owner: KF.W11 arm (d) / KF.W10's ledger.**
7. **`updateKeyframeProperty` (banked DEAD) and `addKeyframe`** are re-exported by `useTimeline` but
   defined in `useTimelineOps.ts` — two seats' files, so the re-export was left rather than orphaning
   an exported function in a file the seat could not edit. **Owner: KF.W8.**
8. **D-3's SC 2.5.8 target-size arm · ARB-1's auto-pan (precondition now met — G13 landed a pan
   writer) · m-8's fourth anchor authoring · RR-A missed-3's commit attribution** — all four carried
   from `.d` unchanged. **Owners: KF.W9/SS-13's probe roster · the idiom's owner (KF.W6's
   `design-idioms.css` surface) · KF.W10's ledger.**
9. **A durable engine-level round-trip CORPUS file has no owner** in this wave's four-fixture
   allocation. **Owner: KF.W8.**
10. **Residual 15, NARROWED and NOT discharged — and the narrowing is the honest word.** The two
    sibling-owned fixtures `## Close` measured as non-deterministic
    (`typing-dots-engine-seam.test.ts`, KF.W4's create; `value4-editor-boundary.test.ts`, an
    originally-tracked witness) **pass in this seat's full run AND in three consecutive isolated runs**
    (**8 passed** each). **Nothing was done to make that true**: ⟨cmd⟩ **0** commits touch either file
    in the whole wave window and **no `testTimeout` was written anywhere**. Their passing under a
    lighter load corroborates `## Close`'s diagnosis (*"every failure is a timeout, never an
    assertion"*) rather than retiring the row: the fixtures are still unowned and the load-dependence
    is unaddressed. **Owner: KF.W4's fixture surface / the orchestrator**, else KF.W10's ledger.
    **Raising another wave's `testTimeout` to turn a run green remains the masking fallback house law
    forbids, and no seat of this wave did it.**
11. **The nested-slider structure** (`.h` residual 1) — the rail is `role="slider"` (G8's cure) and
    CONTAINS the N marker sliders and their carets; `slider` is a Children-Presentational role, so a
    strict user agent may prune them. Neither available fix belongs to a gate: moving the playhead role
    breaks `timeline-mount-keyboard.test.ts:183` and G8 with it, and lifting the markers out of the
    rail moves them out of the element whose scoped block declares their geometry custom properties —
    an ARIA fix traded for a geometry regression. **DECLARED in the file at the rail. Owner: KF.W10, as
    ONE design question (which element is the playhead slider), never a per-seat patch.**
12. **The caption's own register `text-mono-caption` IS a caps register** (`.h` residual 3), so a named
    scroll phase renders `ENTRY 100%` to the eye while the AT description says `entry 100%`. Out of
    M7's scope by M7's own words, and the register is **KF.W6's landed decision on a CLOSED wave** —
    re-cutting it here would re-open a closed ruling on a seat's taste. **Declared, not cured. Owner:
    KF.W10.**
13. **G14 has no RUNNING witness for the ordering** (`.i` residual 1). The gate is read at the bytes
    plus the ruling artifact, exactly as `.e`'s three consumer bytes were. An executable assertion
    (*the success toast does not fire until the awaited build settles*) needs a vue-sonner double —
    an addition no brief or lock authorised. **Read for what it is. Owner: KF.W10.**
14. **The ghost's source narrows from the merged `stop.vars` to the head keyframe's `vars`** (`.g`
    residual 2, routed to this seat *"to record"* — **recorded here**). The direct consequence of
    L-D8's *derive locally; delete the prop*. The rows have always rendered `keyframe.vars`, so ghost
    and text now agree where a multi-member stop could previously make them disagree. **No banked row
    asks for the merged set at the ghost. Closed at this line.**
15. **Two stated-not-owed design facts, recorded so no successor reads them as misses**: the 3D branch
    renders rotation + scale only (perspective is not representable in a 64px plate, design §5 carried
    verbatim), and the AT channel says `Preview unavailable: <error>` where the panel renders
    `Preview unavailable — <error>` (both derive from the same `entry.kind` / `entry.error`, so neither
    can drift from the state). **Closed at this line.**
16. **WebGL blank-resolve is undetectable at the capture seam** — a successful capture of nothing.
    The code comment now says so at the site. **Stays SS-13 residue #1.**
17. **Two seat-declared shape facts, each with the measurement that forced it.** `.g` placed the three
    pure cache RULES in `composables/useTimelineBuild.ts` rather than the SFC, because
    `KeyframeTimeline.vue` **cannot be mounted in this test realm at all** (the glass root barrel
    resolves its peer from inside `node_modules`, where vitest's `resolve.alias` does not reach) and
    both alternatives were measured and rejected; `.h` made `TimelineTrack`'s `previews` prop
    **optional**, because a cache's absence is a **cold cache**, not an error — the read is total at
    both sites, nothing of the old two-map API survives, so it is a contract and not a compat shim.
    **Recorded as declared design facts, not defects. Closed at this line.**
18. **Two gate-witness denominators moved and are recorded so they are never silently inherited**:
    G11's literal leg-(i) pattern (2 of 4 under a probe for a prop `.i` lawfully deleted; the gate's
    own Assertion holds under the surface-naming probe) and G15's `useCodeHighlight(` (3 → 2 files
    under KF.W6's CLOSED `6cebdb33`, the fold's own subject unmoved). **Dated observations. Closed at
    this line.**

#### Escalations

**NONE.** The wave's single escalation — G9 + G10, the `.d`/`.e` file-crossing — is **DISCHARGED** by
the re-partition it asked for, with no bounds widened (⟨cmd⟩ the union of the four resume units'
writable sets minus §Bounds ∪ the four fixtures → **∅**) and no obligation re-spent. This seat made no
write outside its own writable set, greened no gate by editing a tracked witness, wrote no `test.skip`,
no try/catch around a defect, no allowlist, no copied producer selector and no `node_modules` patch;
glass-ui stayed **READ-ONLY** and everything owed the producer rode as a letter plus its row.

#### The four-verb line — where this wave leaves it

| verb | state at re-close | basis |
|---|---|---|
| AUDITED | **YES** (unchanged) | the 13 named `registry/adjudicated/` records |
| SPECIFIED | **YES** (unchanged) | `docs/tranches/X/keyframes/waves/KF-W7.md`, IMMUTABLE (E-3) |
| **IMPLEMENTED** | **YES — 15 of 15 gates GREEN, 0 carried RED, 0 escalations** | Act 1, re-run whole at this seat's own double-run commands. **IMPLEMENTED is this wave's ceiling by its own §Locks** |
| VERIFIED | **NO** | *"stamped only at sub-tranche close"* — the spec's own words. **No seat of this wave may stamp it and this seat does not**; no CHECK pass has run against KF.W7 |

**The KF-AV-28 verdict is SETTLED and is NOT re-opened here**: six surfaces, **six KEEP-BESPOKE, ZERO
SWAP**, discharge set **EMPTY**, so this wave emits **zero** `DISCHARGED by KF.W7 SWAP verdict
<surface>, <date>` receipts and **KF.W10 carries every governed row naming its pending surface** — a
stated emptiness, never silence.

#### Commits (3 — **0 keyframes.js**, 3 value.js; pathspec ON each commit itself, one commit per meaning)

| repo | sha | meaning |
|---|---|---|
| value.js | (the mail act) | the **O-31** addendum-beside letter + `INBOX.md`'s O-31 row and dated close-sweep line |
| value.js | (this commit) | `evidence/W7/RECLOSE-GATE-TABLE.md` + these receipts |
| value.js | (the ledger) | `LEDGER.md`'s minimal in-place row edit + its appended event line |

**Zero keyframes.js commits by this seat, which is what VERIFY-ONLY means at the bytes** — the only
keyframes.js act was the push of the four commits `.g` and `.i` had already landed.

⟨**Erratum, declared rather than smoothed.** The mail-act commit's SUBJECT carries `$2.4` where it
means **§2.4** — a shell-quoting artifact of this seat's own commit command. **Not amended**: an
`--amend` re-commits whatever is staged at that moment, and on an index four tracks share that is a
way to sweep in a sibling's work to fix a typographic character. The commit's body, the letter, the
`INBOX.md` row and these receipts all spell it `§2.4`, and the subject's referent is unambiguous.⟩

**WAVE VERDICT: IMPLEMENTED — ALL FIFTEEN GATES GREEN, no carried RED, no escalation outstanding.**
The timeline instrument is ruled **OURS TO KEEP on all six surfaces with ZERO SWAP**; the scrub seam is
**LIVE at the bytes** in one guarded single-engine commit; the ghost tells the truth and the cache is a
cache; the tooltip announces what it shows; the acknowledgement waits for the outcome. **VERIFIED
remains unstamped and belongs to the sub-tranche close.**

---

## Close — SECOND VERIFY PASS (2026-09-18, a re-dispatched close seat; VERIFY-ONLY)

SERVED MODEL: `claude-opus-5[1m]` · **2026-09-18, 19:1x EDT** · **VERIFY-ONLY: this seat cured
nothing, wrote ZERO keyframes.js bytes, ZERO glass-ui bytes and ZERO product bytes in either repo.**
A dated addendum-beside to `## Close` and to `.j`'s re-close (E-3) — **neither is edited, and no
verdict below is inherited**: every reading here is this seat's own command at the settled bytes.
The harness re-dispatched the close seat after the 2026-09-18 host restart; this pass is what that
re-dispatch produced, and its ONE unperformed act at open was the **value.js push**, which `.j`
declined by scope and this seat's brief names outright (Act 7).

**Substrate**: kf `master` ≡ `HEAD` ≡ `origin/master` ≡ **`1fa98a5d`** (`.j`'s push landed; nothing
owed); value.js `HEAD` **`058af07c`**, `origin/tranche-u` **four behind** at the read.
**CRASH-RECOVERY, run before any other act**: ⟨cmd⟩ `git -C ../keyframes.js status --porcelain` →
**2 lines**, both the pre-existing untracked `docs/tranches/V/coordination/VALUEJS-INBOUND-*.md`
every seat of this wave has recorded — **0 paths inside this unit's writable set**; ⟨cmd⟩ value.js
`git status --porcelain` → **15 dirty paths, every one a sibling's** (`demo/palettes/**` ·
`demo/picker/**` · `demo/shell/**` · `V/reformation/CARRY-LEDGER.md` · `scripts/dev/dev.sh` ·
`X/waves/evidence/` · two `e2e/smoke/` specs) — **0 inside this unit's writable set**. Nothing
inherited, nothing rewritten, nothing stashed, not one sibling path touched.

### Act 1 — all fifteen gates, re-measured at this seat's own script

ONE script over `git show HEAD:<path>` in the keyframes.js tree (never the worktree — four tracks
share this checkout), **double-run**: ⟨cmd⟩ `diff run1 run2` → **no output — DOUBLE-RUN IDENTICAL**.
Read against §Gates' own GREEN definitions (`:255-326`), not against `.j`'s table.

| gate | this seat's reading | verdict |
|---|---|---|
| **G1** | glass `/timeline` `index.d.ts` **2 L** · that dir **9** files · `dist/timeline.js` `^export` **1** · `SliderVariant = "standard" \| "spectrum"` (no `"timeline"`) · demo imports of glass `/timeline` **0**; `G1-VERDICT-TABLE.md` **432 L**, `KEEP-BESPOKE` ×**21** | **GREEN** |
| **G2** | `@update:scrub-t="scrub"` **1** · destructured bare `scrub,` **1** · `isPrimary\|pointerType` in TT **2** · `createPreviewSubject` **2** KT + **2** engine · `NEVER PAINTS THE SCENE` **1** | **GREEN** |
| **G3** | `grabDx` in TT → **4** | **GREEN** |
| **G4** | `scheduleRebuild` **7**; the file's ONLY `rebuild()` invocation is **`:66` `void rebuild().then(settle, settle)` INSIDE the rAF latch** (the other hit, `:27`, is the docblock); latch guard **1**; dirty check **1** — **nothing un-latched by `.i`'s G14 cure** | **GREEN** |
| **G5** | `coalesceKeyframes` declared in `timelineTypes.ts` **1**, engine **3**, render **2**; `Merge vars into keyframe` **0**; `v-for="stop in stops"` **2** | **GREEN** |
| **G6** | THP `authoredSelector` **4** · `value !== "none"` in `snapshotCapture.ts` **0** · `mergeCSS` reaches **3** modules | **GREEN** |
| **G7** | `Math.round` in `TimelineCaret.vue` → **1 hit and it is the `:165` docblock** (*"The MODEL's value, not an integer lie"*); **live 0**, measured by printing the hit, not by asserting it; `openedWith` **3** | **GREEN** |
| **G8** | `role="slider"` TT **7** + caret **2** = **9**; `onTrackKeydown` **2** | **GREEN** |
| **G9** | `:aria-label="describeStop(stop)"` **1** (`:256`) · `describeKeyframe` **2 files** in `demo/` · `role="group"` **1** (`:16`, on the container, with a name) · `aria-label` in TT **6 lines printed whole** (`:10` prose · `:16` · `:46` · `:114` · `:206` · `:256`) · `aria-hidden="true"` **2** · marker `@mouseenter` **`:216`** and `@focus` **`:217`** — the pair, with the second `@mouseenter` hit at **`:185` read at the bytes and convicted as prose** · `text-admin-label` in THP **0** · THP `^export const` **6** | **GREEN** |
| **G10** | `previews.delete` **1** (in `evictStalePreviews`) · live `previewCache`/`previewLoading` across `demo/`+`test/` **0** (the 2 survivors are `useTimelineBuild.ts:20-21`, the comment that convicts the old shape) · live `return null` in the builder **0** (1 comment, `:201`) · live `getGhostStyle`/`:ghost-style` **0** (1 comment, `TimelineTrack.vue:434`) · `scale(0.3) ${vars` **0** · THP terminal bare `v-else` **at `:68`** (`:44` is prose) · `Preview unavailable` **2** · `w-36 h-24` **1** · `scrubAndCapture` declared `: Promise<string>` at `useTimelineBuild.ts:213` | **GREEN** |
| **G11** | surface-naming probe over `test/` → **exactly the four W7 fixtures and only those four**; tracked `test/demo/instrument/` **16** (the spec's nine + W7's 4 + W4's 2 + W5's 1 — **0 filename collisions**, the four-party declaration holding by enumeration); the four fixtures + the two named read-only witnesses → **71 passed / 71**, run **twice**, identical; `^\s*(test\|it\|describe)\.skip` over the four → **0** | **GREEN** |
| **G12** | `ae83da07` resolves; `demo/utils/keyframeSelector.ts` PRESENT at it; value.js ref-pin commit `0dc2941a` **00:16:02** precedes the wave's first keyframes.js commit `3a01e362` **00:16:28** — measured at the timestamps | **GREEN** |
| **G13** | live `@wheel.prevent` **0** (1 hit, the `:633` docblock) · live `touch-none` **0** (1 hit, `:634`) · `touch-pan-y` **2** · `onTrackWheel` **2** · `deltaX` in `useZoomPan.ts` **2** · `role="scrollbar"` **1 code hit (`:44`)**, 2 prose | **GREEN** |
| **G14** | `G14-POSTURE-RULING.md` **152 L** against `registries/POSTURES.md` **342 L**, cross-referenced BOTH ends (POSTURES names `KF.W7` **7**× · the ruling names POSTURES **4**×); `buildError` **5** sites in the builder + **3** in KT; **L-11 at the bytes**: `rebuild: () => void` **0** · `rebuild: () => Promise<void>` **1** · `const scheduleRebuild = (): Promise<void>` **1** · **`await scheduleRebuild()` `:87` PRECEDES `toast.success` `:89`** | **GREEN** |
| **G15** | `KeyframesAddDialog.vue` still wraps `<CSSPasteDialog>` (`:2` open · `:55` close · `:70` import) — one shell, the twin a thin adapter; `initialText` across `demo/` → **1 file, 1 hit**, and it is the shell's own doc comment; `.label` in KT **4** (N-2 wired); `flattenVars.ts` **DELETED at HEAD** and **0** files reference it | **GREEN** |

**TALLY AT THIS SEAT: 15 GREEN · 0 RED · 0 UNRUNNABLE.** Fifteen of fifteen reproduce `.j`'s
verdicts, each from a command this seat wrote rather than inherited.

**One instrument note, recorded because the next seat will write the same regex.** This seat's first
THP `v-else` pattern (`\sv-else>`) returned **0** — the attribute sits alone on `:68` with the
closing `>` two lines down, so the pattern missed a byte that is there. The defect was in the
instrument, not the file; the printed `grep -n 'v-else'` (`:44` prose · `:68` the terminal bare
attribute) is the reading of record. **A count is only ever as good as the command printed beside
it** — which is the whole reason this program prints them.

**Suites and typecheck, this seat's own runs.** Wave surface → **71 passed / 71**, twice. Full
keyframes.js suite ⟨cmd⟩ `npx vitest run` → **147 files passed | 5 skipped · 1518 passed · 3 expected
fail · 14 skipped · 0 FAILED**. ⟨cmd⟩ `npm run check` → exit **2**, `error TS` **54** over **22**
files, the same output filtered to **every KF.W7 bound path → 0**. Byte-identical to `.g`, `.h`, `.i`
and `.j`; published SCOPED and never as a claim about another wave's bytes. **Residual 15 did not
reproduce here either** — the two sibling-owned fixtures passed in the full run, and no
`testTimeout` exists anywhere in this wave's bytes.

### Act 2 — the commit audit, re-run against §Bounds rather than against the roster

**keyframes.js — 23 commits** (the `.f` sitting's 19 + the resume's 4), each ⟨cmd⟩ `git cat-file -e`
→ **present**, each ⟨cmd⟩ `git merge-base --is-ancestor <sha> origin/master` → **23 of 23 published**,
⟨cmd⟩ session trailer → **23 of 23**. ⟨cmd⟩ the union of `git show --stat --format= --name-only` over
all twenty-three → **23 distinct paths**, and every one is a §Bounds row: the fourteen timeline-cluster
files (including `utils/flattenVars.ts`, the ruled **delete**) · `KeyframesAddDialog.vue` ·
`AnimationVisualizer.vue` · `SequenceScrubber.vue` · `package.json` · the four fixtures ·
`SpringTarget.vue` + `SpringPhysicsFacet.vue` (the PASS-6 D8 verdict-gated idiom carve).
**`index.ts`, `demo/utils/keyframeSelector.ts`, `design-idioms.css` and `SequenceTarget.vue` were
granted and NOT written** — carves that close SPENT-UNUSED, which is the lawful outcome of a carve
stated not to widen.

**value.js — 30 commits** (`.f`'s 23 + the resume's 7), trailer **30 of 30**, union → **19 distinct
paths**: this record · `LEDGER.md` · `INBOX.md` · the **fourteen** `evidence/W7/` artefacts · the two
outbound letters (O-28 + O-31). ⟨cmd⟩ the same union filtered to `keyframes/waves/` ∪
`megatranche/registry/` ∪ `keyframes/conformance/` → **0** (**E-3 HELD**); ⟨cmd⟩ `scripts/dev/dev.sh`
→ **0 commits, both repos**; ⟨cmd⟩ `vitest.config.ts` over `ae83da07..HEAD` → **0**.

**A COMMAND-SHAPE FINDING, recorded so a successor does not read it as a landing.** ⟨cmd⟩ a loose
`git log --format='%h|%s' ae83da07..HEAD | grep -icE 'KF\.W7'` over the keyframes.js window returns
**25**, not 23, and its path union carries **three paths outside every KF.W7 writable set**:
`demo/components/instrument/shell/EditorStartScreen.vue` · `demo/components/instrument/shell/SharePopover.vue`
· `demo/styles/style.css`. **All three are KF.W6's**, from commits whose messages merely *cite* this
wave — chief among them `57ea251f` (*"KF.W7 ruled N-2 WIRE (G15 ruling `fa502444`) and landed it
(`be82defe`)"*) and `f00cd175` (*"KF-AV-28 stated before spending: KF.W7 … six KEEP-BESPOKE, ZERO
SWAP"*). **Not one is a KF.W7 write**: the twenty-three-sha roster is the denominator, and a
subject-line mention is a citation, not an authorship. **LANDED-WRONG: NONE** — no commit in either
repo wrote outside its own unit's writable set, and none swept in a sibling track's staged paths.

### Act 3 — §Verification Artefacts, run as written

⟨cmd⟩ `grep -ci 'verification artefact\|verification artifact' KF-W7.md` → **0**. **This spec
declares no §Verification Artefacts section** — its artefact obligations are discharged at the gates
themselves (G1's verdict table, G14's posture ruling, G15's fold ruling, G12's ref pin, OP-3's D-19
re-derivation), and the act is therefore stated as vacuous rather than silently skipped. What exists
was verified instead: ⟨cmd⟩ `head -1` over `evidence/W7/*.md` → **14 of 14 artefacts open
`SERVED MODEL:`** (9 `claude-opus-5[1m]`, 5 `claude-fable-5-1` — the design seats), and all fourteen
are committed.

### Act 4 — E13, the four-path sweep at this seat's own clock

Swept read-only at **19:16 EDT**, delta against `.j`'s **19:00**; classification from each `INBOX.md`
row's **Status cell**, never from a bare `grep -i unread`; `INBOX.md` **self-excluded**.
⟨cmd⟩ `/bin/ls -dlt ../glass-ui/docs/tranches/*/ | head -4` → **`BK/`** (Sep 18 17:53) · `BJ` · `BI` ·
`IOS27-MICRO` — **BK still live**. ⟨cmd⟩ `/usr/bin/find <the four paths ⊕ the atlas Q lane>
-maxdepth 1 -type f -name '*.md' -newermt '2026-09-18 19:00'` → **TWO hits, both this wave's own**:
`INBOX.md` (self-excluded) and `valuejs-outbound-2026-09-18-kfw7-bh-relay-ADDENDUM-A9.md` (O-31,
minted by `.j` in the same act that rowed it). **0 unrowed · 0 new `I-n` minted · 0 UNREAD in KF.W7's
scope.** The three live UNREAD cells **I-32 · I-33 · I-34** reproduce and each was re-read at its
**Routing** cell: all three route to **X-W0.j / the X formation mail seat** (I-34 beside it to
X-EXT-1), and not one names a keyframes timeline byte. **E13 MET by routing.**

**One counting-rule reconciliation, stated rather than smoothed.** The resume seat-0 recorded
`../keyframes.js/…/V/coordination/` at **13** (17:54) and `.j` at **12** (19:00); this seat reads
**12** `.md`. ⟨cmd⟩ `/bin/ls -la` on that directory → **12 `.md` files + the `vnext/` directory** =
13 entries. **Nothing arrived and nothing left**: the two figures are two counting rules over one
unchanged directory, and the `.md` rule is the one E13 means.

### Act 5 — the four-verb line, unmoved

| verb | state | basis |
|---|---|---|
| AUDITED | **YES** | the 13 named `registry/adjudicated/` records |
| SPECIFIED | **YES** | `keyframes/waves/KF-W7.md`, IMMUTABLE (E-3), untouched by all 30 value.js commits |
| **IMPLEMENTED** | **YES — 15 of 15 GREEN, 0 carried RED, 0 escalations** | Act 1, at this seat's own double-run commands. **IMPLEMENTED is this wave's ceiling by its own §Locks** |
| VERIFIED | **NO** | the spec's own words — *"stamped only at sub-tranche close"*. **This seat does not stamp it**; no CHECK pass has run against KF.W7 |

The **KF-AV-28 verdict is NOT re-opened**: six surfaces, **six KEEP-BESPOKE, ZERO SWAP**, discharge
set **EMPTY** — a stated emptiness that KF.W10's §G-2 consumes.

### Act 6 — residuals and escalations

**The eighteen residuals `.j` published are CARRIED UNCHANGED, each with its named owner** (five
DISCHARGED and named as discharged there). This pass adds **no new residual** and discharges none:
nothing it measured moved a row. Two of them were re-measured here and hold exactly as written —
residual 1 (`@vue/test-utils` in `package.json`, absent from `package-lock.json`; **owner: the
orchestrator**, one `npm install`) and residual 15 (the two unowned load-dependent sibling fixtures;
**owner: KF.W4's fixture surface / the orchestrator**).

**ESCALATIONS: NONE.** The wave's single escalation (G9 + G10's `.d`/`.e` file-crossing) stays
DISCHARGED by the re-partition, with no bounds widened. This seat wrote no `test.skip`, no try/catch
around a defect, no allowlist, no copied producer selector and no `node_modules` patch; glass-ui
stayed READ-ONLY.

### Act 7 — the push, both repos, with the sibling-commit disclosure

- **keyframes.js — NOTHING OWED.** ⟨cmd⟩ `git log --oneline origin/master..HEAD` → **0**; `master` ≡
  `origin/master` ≡ `1fa98a5d`, and all 23 wave commits are reachable from it. `.j`'s push stands.
- **value.js — PUSHED by this seat**, the act `.j` declined by scope and this seat's brief names.
  **The sibling-commit disclosure is NOT an empty set here, and it is READ AT THE ACT rather than at
  the writing — because it moved between the two.** ⟨cmd⟩ `git log --oneline origin/tranche-u..HEAD`
  when this section was drafted → **four commits, three KF.W7's own and ONE Track D's**. ⟨cmd⟩ the
  same command **immediately before the push, ninety seconds later** → **nine**: KF.W7's five
  (`2e6a60ba` O-31 · `fd553933` the `.j` receipt · `058af07c` the re-close ledger row · `1fd1dde9`
  this addendum · `78994614` its ledger line) **and FOUR siblings'** — Track D's `d854c296`
  (X.P.W3 CHECK 1 round 4), Track A's `e9ab3579` (X-W3 CHECK 1), and Track C's `efae39b3` +
  `e805e8f8` (F.W4 `.a` and its ledger row). **Every one is already in the shared local history and
  none is this seat's to hold**; the push is an ordinary non-force fast-forward of a branch four
  tracks write, it **publishes no byte this seat authored outside its set**, and each sibling is
  named here so its own close seat finds its work published rather than missing. **No force, no
  lease, no rewrite.** ⟨**The lesson is the finding**: on an index and a branch four tracks share, a
  disclosure written before the act is a forecast. It is re-read at the act, and the drafted figure
  is corrected in place rather than left standing.⟩

**SECOND-PASS VERDICT: IMPLEMENTED — fifteen of fifteen gates GREEN at an independent seat's own
commands, zero carried RED, zero escalations, zero landed-wrong.** VERIFIED remains unstamped and
belongs to the sub-tranche close.
