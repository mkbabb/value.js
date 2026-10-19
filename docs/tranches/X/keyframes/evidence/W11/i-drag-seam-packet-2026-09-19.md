SERVED MODEL: claude-opus-5[1m]

# KF.W11.i — the drag-seam packet · EVIDENCE (2026-09-19)

Unit `X.KF.W11.i` (Track B · X·KF · phase 3, group 7). Repo
`/Users/mkbabb/Programming/keyframes.js` @ `master`. **Open sha `d479f394`**
(`.f`'s close; `.d`'s declared open point was `ba12b2ba` and every one of this
unit's files is byte-identical to it — §1 below). Spec `KF-W11.md` §Agent Units
`:267-271` · §Carry P9 `:209-211` · §B.1 row 4 `:84` · §Bounds rows `:110-114` ·
§Gates G-KFW11-9 `:305` · §Sequencing 3/4 `:319-320` · §Commit plan 6 `:381`.

---

## §0 — the KF-AV-28 verdict, STATED before the first byte (§Sequencing 4)

⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js cat-file -t 4c03ceda` → `commit`
(a value.js record commit, 2026-09-18). `execution/B/KF-W7.md` `.a` G1, quoted:
**"six surfaces, six KEEP-BESPOKE, ZERO SWAP"**; the `.f` verdict table's row 4
(`SequenceScrubber`) and row 5 (`AnimationVisualizer`) both read **KEEP-BESPOKE ·
CARRY**. The drag-seam packet is therefore **UN-GATED and every row of it is
live**: this unit inherits work, not a deletion. **The alphabet of
verdict-discharge receipts KF.W7 could have emitted has NO members — it is
empty** — and this unit emits none; the string G-KFW11-10 greps for is never
spelled in this file or in the record (SELF-COUNT: ⟨cmd⟩ a grep of this file for
that receipt string → **0**).

## §1 — crash-recovery and the anchors, at the open sha

⟨cmd⟩ `git -C /Users/mkbabb/Programming/keyframes.js status --porcelain` at open →
**two untracked rows**, both value.js-delivered mail packets
(`docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-24-…`, `…-2026-07-27-…`) —
outside every `.i` path, not this unit's, untouched.
⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain` at open →
`docs/tranches/V/reformation/CARRY-LEDGER.md` (a sibling seat's) and
`scripts/dev/dev.sh` (**unowned, never staged, never touched**).
⟨cmd⟩ `git status --porcelain -- <the five kf product paths> <the test path>
<this evidence path> docs/tranches/X/execution/B/KF-W11.md` → **empty**.
**ZERO inherited hunks on any path this unit may write; nothing to finish,
nothing to rewrite.**

**Anchor drift (KF-AT-28 / D-19).** ⟨cmd⟩ `git diff --stat ba12b2ba..d479f394 --
demo/composables/useDragScrub.ts
demo/components/instrument/transport/composables/useDragCapture.ts
demo/utils/gestureSelectSuppression.ts
demo/components/playback/AnimationVisualizer.vue
demo/scenes/sequence/SequenceScrubber.vue` → **empty**. Every `.i` file is
byte-identical to `.d`'s stated open point, so §B.1 row 4's re-anchor binds
unchanged. Re-resolved at `d479f394`:

| spec anchor | measured at the open sha |
|---|---|
| `useDragScrub.ts` acquire at `:116` | `:116` — ⟨cmd⟩ `grep -n 'acquireSelectSuppression()' demo/composables/useDragScrub.ts` → `116` |
| `useDragScrub.ts` `setPointerCapture(e.pointerId)` at `:120` | `:120` — the file's SOLE `pointerId` occurrence, ⟨cmd⟩ `grep -c 'pointerId' …` → **1** |
| `useDragScrub.ts` "Nesting-safe" docblock at `:32`(spec) | the claim sits at `:37-38` of the 150-line file: *"Nesting-safe: a small reference count guards against two concurrent gestures clearing the token early."* |
| `useDragCapture.ts` `isDragging` gate at `:39`/`:44`, acquire `:56`, release `:47`, docblock `:20` | ALL FOUR HOLD EXACTLY (70-line file) |
| `gestureSelectSuppression.ts` 23 L, one `activeGestureCount` | HOLDS — ⟨cmd⟩ `wc -l` → 23 |
| `AnimationVisualizer.vue` coast emit "`:185-190` → `:119`" (banked) | **DRIFTED, recorded**: the emit is `applyProgress` at `:136-144` (`emit("scrub", t)` at `:143`) and the coast's per-frame call is `coastPlayback.drive(…)` at `:209-214`. The MECHANISM the row describes is unchanged; the cure lands at the true bytes. |

## §2 — LAW A census (RULINGS-3): no delete on a line-count

The only deletions this unit books are `useDragCapture.ts`'s `stops` array and
its `removeListeners()` — both file-local, both superseded by scope-owned
registration. ⟨cmd⟩ `grep -rn 'removeListeners\|stops' demo test | grep -v
'useDragCapture'` → **0 consumers outside the file**. The comments that described
them die with them.

**KF-SCR-5's dead-API census, run before the act** — ⟨cmd⟩ `grep -rn
'releasePolicy\|onRelease' demo test src`:

| symbol | consumers outside `useDragScrub.ts` |
|---|---|
| `releasePolicy` | **ONE**: `demo/scenes/square/SquareScene.vue:425`, `releasePolicy: "persist"` — the DEFAULT — plus two prose citations at `:345` and `:364` |
| `onRelease` | **ZERO** |
| the `"recenter"` branch (`:109`) | **unreachable** |

The census is what makes this a bounds problem rather than a line-count delete:
the deletion is one seam edit **plus one byte in `SquareScene.vue:425`**, which is
`.b`'s §Bounds row. Deleting the option while that literal stands raises a
TS2353 excess-property diagnostic — a RISE the §0u ratchet refuses. **Returned as
KF11-E(i1), not written, not substituted** (§6).

**MotionPath, the prose census** — ⟨cmd⟩ `grep -rln 'MotionPath' demo` → five
files, of which the only demo-scene references are the three paragraphs in
`useDragScrub.ts` itself. The scene is PRUNED: `demo/state/useSceneMachine.ts:255`
verbatim, *"exists in the registry (a PRUNED scene — compose/morph/motion-path per
OD-1)"*. ⟨cmd⟩ `grep -rn 'useDragScrub' demo | grep -v 'useDragScrub.ts:'` → the
four LIVE consumers: `SquareScene.vue` · `SpringTarget.vue` ·
`SequenceScrubber.vue` · `SequenceTarget.vue` (the one shared instance behind five
row handles). `useDragScrub.ts:26-27`'s *"the rail scenes leave them unset"* is
false of `SequenceScrubber.vue`, which sets `onStart` AND `onEnd`.

## §3 — the `tryOnScopeDispose` claim, measured at the installed bytes

`useDragCapture.ts:20-21` promised *"vueuse's `tryOnScopeDispose` cleans up any
listener still live at unmount (the mid-drag-unmount leak the manual remove path
missed)."* Measured:

⟨cmd⟩ `node -e "…@vueuse/core/package.json.version"` → **14.3.0**
⟨cmd⟩ `awk '/^function useEventListener\(/,/^}$/' node_modules/@vueuse/core/dist/index.js`
→ the whole body is a `watchImmediate(…, { flush: "post" })` whose `onCleanup`
removes the listeners. **It calls no `tryOnScopeDispose`.** Its cleanup is the
CURRENT EFFECT SCOPE's — and `useDragCapture` called it from inside a DOM event
handler, where no effect scope is active. The guarantee was false in exactly the
case it named. `useDragScrub`'s own registrations were always at setup time and
were therefore scope-bound; `useDragCapture`'s were not.

## §4 — the gate, BORN RED then GREEN, every figure double-run

⟨cmd⟩ `npx vitest run --project demo test/demo/instrument/drag-scrub-reentrancy.test.ts`

| clock | run 1 | run 2 |
|---|---|---|
| at `d479f394`, before the file existed (seat 0's baseline) | `No test files found, exiting with code 1` | same |
| with the witness written, before any cure (**born RED**) | `Tests 9 failed (9)`, `Errors 6` | `Tests 9 failed (9)`, `Errors 6` |
| after `4ab4c4db` (the guard family alone) | `Tests 2 failed \| 7 passed (9)` | — |
| after `383bcf3b` (the machine-write policy) | `Test Files 1 passed (1)` · `Tests 9 passed (9)` | `Test Files 1 passed (1)` · `Tests 9 passed (9)` |

The two failures surviving `4ab4c4db` were exactly the two machine-write cases —
the born-RED split is clean: the guard family turns seven clauses, the policy
turns two.

**Byte clauses (RECORDED, not acceptance — the runtime clause decides), double-run:**

| clause | spec's banked figure | AFTER (run 1 · run 2) |
|---|---|---|
| `grep -c 'acquireSelectSuppression()' demo/composables/useDragScrub.ts` | 1 · 1 | **1** · **1** |
| `grep -c 'acquireSelectSuppression()' …/useDragCapture.ts` | 1 · 1 | **1** · **1** |
| `grep -c 'pointerId' demo/composables/useDragScrub.ts` | 1 · 1 (*"a mention, NOT the latch"*) | **4** · **4** — the mention plus the latch: its declaration, the admission test, and the latch write |
| `grep -c 'releaseSelectSuppression()'` scrub · capture | — | **2** · **2** each (the gesture path and the scope-disposal path) |
| `grep -c 'onScopeDispose'` scrub · capture | — | **2** · **2** each (import + call) |

**Suite, double-run** — ⟨cmd⟩ `npm run test:demo`: `Test Files 1 failed | 47
passed (48)` · `Tests 1 failed | 414 passed (415)`, both passes. The one failure
is `test/demo/scenes/spring-trace-truth.test.ts > (4b) the floor the heatmap
declares is not below the one the plot pins` — an `.e`/`.f` seam residual on
`SpringHeatmap.vue`'s `DAMPING_MIN` declaration, **reproduced in isolation BEFORE
this unit's first commit** (⟨cmd⟩ `npx vitest run --project demo
test/demo/scenes/spring-trace-truth.test.ts` → `1 failed | 11 passed (12)`), on
two files that are `.e`'s and `.f`'s §Bounds rows and neither of them this
unit's. Not caused here, not cured here, named here.

**Skip/only grep** — ⟨cmd⟩ `git diff d479f394..HEAD -- test | grep -c
'test.skip\|it.skip\|\.only('` → **0** · **0**.
**Whitespace** — ⟨cmd⟩ `git diff --check` at each landing → clean.
**Lint** — ⟨cmd⟩ `npx eslint demo/composables/useDragScrub.ts
demo/components/instrument/transport/composables/useDragCapture.ts
demo/components/playback/AnimationVisualizer.vue
test/demo/instrument/drag-scrub-reentrancy.test.ts` → exit **0**, no output.

**§0u ratchet** — ⟨cmd⟩ `npx vue-tsc --noEmit -p tsconfig.json 2>&1 | grep -c
'error TS'` → **24** at open · **24** after every commit · **24** · **24**
double-run at close. **Never rose.** ⟨cmd⟩ the same output filtered to this
unit's five rows → **0** · **0**. No cast, no `@ts-expect-error`, no
`eslint-disable` was written.

## §5 — the decision, written before the patch

**C·C-1 ≡ KF-AV-16 — ONE throttle-vs-decouple decision: DECOUPLE.**

The machine-bound write is decoupled from the sample stream and bound to the
animation frame that will paint it. A wall-clock throttle was REFUSED for the
defect it is named for — it drops the terminal sample, and the terminal sample is
the one the machine must persist — so the decoupling carries an unconditional
synchronous flush at every gesture boundary. Three consequences, one rule:

1. **The pointer path** — `useDragCapture` holds the latest sample and delivers
   it from one `requestAnimationFrame`; a release flushes the pending sample
   synchronously BEFORE `onEnd` (so the release hook reads the position the user
   let go at); a scope disposal cancels it unsent. At 240 Hz the consumer — and
   the scene machine behind it — sees **one** delivery per frame instead of four,
   and never a value the frame has already superseded.
2. **The coast** — `AnimationVisualizer`'s `coastPlayback.drive` callback reaches
   `applyProgress` once per frame BY CONSTRUCTION, so it already obeyed that half
   of the rule. It did not obey the other half: a decay-to-rest coast pins to its
   target boundary for the last frames of its flight and re-dispatched an
   identical `t` on each, and the machine cannot elide them itself because its
   reducer allocates a fresh context per call (the row's own finding: *"the
   dispatch echo-guard cannot fire"*). The seam therefore does not send them —
   the paint still runs every frame, the machine is written only when the value
   it holds has changed — and the latch re-arms on `onStart`, because the
   ribbon's own Slider can move the clock between gestures.
3. **The sequence consumer** — the identical rule's landing byte is
   `useSequenceDemo.ts`'s `scrub()`, which is `.d`'s §Bounds row. See
   KF11-E(i2), §6.

**Why the policy is NOT in `useDragScrub`.** `.d` landed a RULED gesture spec at
`344c0ba2`/`ba12b2ba` whose witness asserts that every admitted pointer sample
reaches `demo.scrub` synchronously — ⟨cmd⟩
`test/demo/instrument/sequence-scrubber-mount.test.ts:112-122` (*"clamps the
projection at both rail ends"*: `window.dispatchEvent(at(2)); expect(stub.scrub)
.toHaveBeenLastCalledWith(1)`) and `:180-193` (*"a zero-delta sample leaves the
direction untouched"*: `expect(stub.scrub).toHaveBeenCalledTimes(3)`). Coalescing
above `demo.scrub` would weaken a sibling's landed witness, which the standing
law forbids and which §Bounds `:137` forbids in words. Coalescing below it is a
write outside this unit's set. Both arms are closed, so the sequence half is
RETURNED rather than substituted.

**Why the guard does NOT live at the token.** §Bounds `:113` permits a carve of
`gestureSelectSuppression.ts` *"only if the guard belongs at the token"*. It does
not: the token's reference count is correct and symmetric at the bytes
(⟨cmd⟩ `wc -l demo/utils/gestureSelectSuppression.ts` → 23; `activeGestureCount +=
1` on acquire, `Math.max(0, … - 1)` on release). The asymmetry was entirely in the
CALLERS — two acquires against one release. Curing it at the token would mean a
token that second-guesses its callers, which is the wrong seam and would mask the
callers' defect. ⟨cmd⟩ `git diff d479f394..HEAD --stat -- demo/utils/gestureSelectSuppression.ts`
→ **empty**: the conditional carve was not exercised.

## §6 — escalations, two, both bounded, neither a write

**KF11-E(i1) — KF-SCR-5's dead-API deletion (the prose half LANDED).**
`releasePolicy`/`onRelease` is dead API: one consumer, passing the default
(`SquareScene.vue:425`), `onRelease` with zero consumers, the `"recenter"` branch
unreachable (§2's census). The deletion is one seam edit plus the removal of
`SquareScene.vue:425` and the correction of its two prose citations at `:345`/
`:364` — `.b`'s §Bounds row (`KF-W11.md:121`), not this unit's. Landing the seam
half alone leaves an object literal with an excess property: a NEW TS2353
diagnostic, a RISE the §0u ratchet refuses. **Nothing of the deletion landed and
it was not substituted.** The PROSE half of KF-SCR-5 — the three MotionPath
paragraphs and the `:26-27` *"the rail scenes leave them unset"* claim, all of
them in `useDragScrub.ts` — **landed in full at `4ab4c4db`**. Cure shape for
whichever seat holds `SquareScene.vue`: delete `releasePolicy: "persist"` at
`:425` and the two prose citations, then delete `ReleasePolicy`, `releasePolicy`,
`onRelease` and the `if (releasePolicy === "recenter")` branch from
`useDragScrub.ts` in the same sha.

**KF11-E(i2) — C·C-1's sequence half.** `useSequenceDemo.scrub()` dispatches
`{ type: "SCRUB", t }` per admitted sample (⟨cmd⟩ `grep -n 'machine.dispatch({
type: "SCRUB"' demo/scenes/sequence/useSequenceDemo.ts` → `:310` · `:368`), and
each dispatch rebuilds the persisted context and synchronously serialises it. The
decoupling rule of §5 applies unchanged; its landing byte is `.d`'s §Bounds row
(`KF-W11.md:109`) and the path above it is pinned per-sample by `.d`'s landed
witness. **Not written, not substituted.** Cure shape, ready to land in one
commit for whichever seat holds `demo/scenes/sequence/**`: hold the latest `p` in
`scrub()`, run `sequence.progress`/`syncFromSequence()` as now, and coalesce ONLY
the `machine.dispatch` into one `requestAnimationFrame` with a synchronous flush
from `setScrubbing(false)` and from `reseatRow`/`reset` — the engine seek and the
readouts keep their per-sample cadence, so `.d`'s witness is untouched by
construction.

**Adjacent observation, recorded not re-booked.** `SequenceTarget.vue`'s
`onRowDown(index, e)` writes `activeRow.value = index` BEFORE calling the shared
seam's `onPointerDown`, so a second handle pressed during a live row drag still
re-points the FIRST gesture's projector at the new row even though the seam now
rejects the second pointer. The seam-level cure (L·D-1) is complete; the
consumer-side latch is `SequenceTarget.vue`'s, a `.d` §Bounds row. Recorded for
the sequence packet's owner; no id is minted for it here.

## §7 — cross-edge, declared from this end

**To KF.W13.** `useDragCapture`'s **exported surface is unchanged** — the handler
bag `{ onStart?, onMove?, onEnd? }` and the return `{ isDragging, onPointerDown }`
are byte-identical (⟨cmd⟩ a diff of `d479f394..HEAD` filtered to those
declarations → **0** changed lines). Two internal changes KF.W13 re-measures at
its own open: (1) the move/up/cancel listeners are now registered on `window` in
the composable's own scope rather than on the capture target inside the
pointer-down handler — with pointer capture the events are retargeted to the
capture element and bubble, so both forms see the same stream, and the window
form is the one that survives an unmount; (2) `onMove` is delivered once per
animation frame with the terminal sample flushed at release. **`PlaybackRibbon.vue`
passes NO `onMove`** (⟨cmd⟩ `sed -n '148,151p' demo/components/playback/PlaybackRibbon.vue`
→ `useDragCapture({ onStart: () => emit("scrubStart"), onEnd: () => emit("scrubEnd") })`),
so its behaviour is unchanged by (2) at the bytes. `PlaybackRibbon.vue` was not
edited: ⟨cmd⟩ `git diff d479f394..HEAD --stat -- demo/components/playback/PlaybackRibbon.vue`
→ **empty**.

## §8 — E13 mail sweep at this seat's clock

Four paths swept read-only; classification from `INBOX.md`'s Status cell by
position; `INBOX.md` self-excluded.

1. `docs/tranches/V/coordination/` newest → the four 2026-09-18
   `*-inbox-2026-09-18-value-4.1-*` letters, ours and rowed.
2. `../glass-ui/docs/tranches/BK/coordination/` newest →
   `glass-outbound-2026-09-18-valuejs-o26-reply.md` = **I-35, rowed**.
3. `../keyframes.js/docs/tranches/V/coordination/` newest inbound-grammar file →
   `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md` = **O-21, ours**.
4. `../sci-report/atlas/docs/tranches/P/coordination/` newest →
   `valuejs-inbound-2026-07-27-library-band-export-delta.md` = **O-12, ours**.

⟨cmd⟩ `grep -cE '^\| [IO]-[0-9]+[a-z]? \|' INBOX.md` → **79** rows; the positional
Status-cell scan for UNREAD → **0**. **Zero unrowed letters, zero UNREAD.**

## §9 — commits and SELF-COUNT

| # | sha | meaning | files |
|---|---|---|---|
| 1 | `4ab4c4db` | KF-SCR-1 + L·D-1 + KF-AV-15 — ONE guard family, BOTH composables (**MUST NOT SPLIT**), with KF-SCR-5's prose half riding the same seam edit | `useDragScrub.ts` · `useDragCapture.ts` |
| 2 | `383bcf3b` | C·C-1 ≡ KF-AV-16 — one machine-write policy (the seam's frame-coalesced delivery + the coast's carve) | `useDragCapture.ts` · `AnimationVisualizer.vue` |
| 3 | `bf4a9a9c` | G-KFW11-9's born-RED witness, committed last, GREEN against the cures it was born RED against | `test/demo/instrument/drag-scrub-reentrancy.test.ts` |

⟨cmd⟩ `git log --oneline d479f394..HEAD | wc -l` → **3**; three shas listed, three
described. ⟨cmd⟩ `git show --stat` on each → **four distinct paths**, every one of
them a `.i` §Bounds row; **zero** paths outside the writable set. The test file
carries **9** `it(` cases (⟨cmd⟩ `grep -c 'it(' …/drag-scrub-reentrancy.test.ts` →
9) and the gate run reports `Tests 9 passed (9)` — the counts agree.
Files touched: **4** in keyframes.js, **2** in value.js (this evidence file and the
`.i` receipt appended to `execution/B/KF-W11.md`).
