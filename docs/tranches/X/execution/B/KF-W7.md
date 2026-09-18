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
