SERVED MODEL: claude-fable-5-1

# KF.W7 · THE SCRUB SEAM — RULED LIVE, DESIGNED ONCE, LANDED ONCE

**Unit**: X.KF.W7.b (phase 2, the seam-design seat; serial over the shared files). **Date**: 2026-09-18.
**Ref of record**: keyframes.js `origin/master` **`ae83da07`** (G12, `G12-REF-PIN.md`); the kf tree at this
seat's open is `77d0e0b1` = `origin/master` (the KF.W4∥KF.W6 atomic bundle landed after `.a`; ⟨cmd⟩
`git diff --stat ae83da07 77d0e0b1 -- demo/components/instrument/timeline demo/utils/keyframeSelector.ts
src/animation/engine/animation.ts src/animation/engine/interpolate.ts` → **empty** — the whole timeline
cluster, the selector module and the two engine files cited below are **byte-identical** at the two refs,
so every `ae83da07` anchor in this file resolves unchanged at `77d0e0b1`; the bundle's `2 files changed`
are elsewhere). **Inputs consumed**: `.a`'s G1
verdict (`G1-VERDICT-TABLE.md` — six KEEP-BESPOKE, zero SWAP; both triggers ARMED) and `.a`'s OP-0/OP-1
settlements (`OP-0-OP-1-SETTLEMENTS.md` — the portal KEPT, G2's AnimationControlsGroup arm UNBLOCKED under
three properties).

**E-3**: the spec (`waves/KF-W7.md`) and the registry are IMMUTABLE; this file is a dated design record
beside them. Every anchor is quoted by command at the bytes this seat measured.

---

## §0 · THE RULING — the seam is **LIVE**

**Question (spec §Goal criterion)**: *"is the timeline instrument ours to keep, and if we keep it, what is
the one seam that makes scrubbing real?"* `.a` answered the first half: **all six surfaces KEEP-BESPOKE**.
This seat answers the second.

**RULED: LIVE.** The rail's whole affordance is a scrubber — `cursor-pointer` (`TimelineTrack.vue:24`),
six pointer/touch handlers + `@wheel` (`:27-34`), a playhead (`:52-55`), 10× zoom/pan — and the
instrument's only authoring verb, `snapshot()`, is **keyed on the playhead** (`useTimelineOps.ts:28`
`const p = percent ?? scrubT.value * 100`). A display-only playhead would make the instrument's capture
position a number the user can point at but cannot *see the animation at*. Scene-scrubbing **is** the
instrument's core promise; ruling it display-only would be a deferral wearing a ruling's clothes, and
`.a`'s table already said what that earns (*"a deferral is not a display-only ruling and earns no
demotion"*).

**Consequences, both armed triggers fired as `.a` armed them**:

- **D-1/C-1 DISSENT TRIGGER — FIRES.** {C-1, C-6, L-3, L-5, M-3/C-4} inherit **BLOCKER weight as one
  cluster** (N-10: one design problem, one commit family). Nothing in this set is cured in isolation.
- **M-3/C-4 INVERSE TRIGGER — DOES NOT FIRE.** M-3/C-4 stays **MAJOR**; the multi-touch guard is a
  PRECONDITION of the wire and ships in the same commit (§Sequencing 5).

**What LIVE does NOT mean (N-10, the convicted regression)**: it does not mean *"destructure `scrub` and
bind it to `@update:scrub-t`"*. That wire alone converts C-6's transient hover stomp (the marker-hover
capture's `finally { scrub(prevT) }`, `useTimelineBuild.ts:112-115`) into a **continuous** stomp of the
scene's DOM at pointer rate. The remedy is upstream of both C-1 and C-6: **the engine must paint something
the scene does not own** (§1), and only then is the wire lawful.

---

## §1 · SINGLE ENGINE — the timeline paints a SUBJECT it owns, never the scene

### §1.1 The mechanism, at the bytes (`77d0e0b1`)

⟨cmd⟩ `sed -n '49,51p' demo/components/instrument/timeline/utils/timelineEngine.ts` →
```
    const anim = new CSSKeyframesAnimation(options, ...targets).fromKeyframes(
        keyframesMap as Record<string, Record<string, string>>,
    );
```
`targets` is `useTimelineBuild`'s `targets.value` = `useTimeline`'s `targets` = `KeyframeTimeline`'s
`props.targets` = `ChannelControls.vue:194 :targets="animation.targets"` — **the scene's elements, by
reference**. `scrub()` (`useTimelineBuild.ts:53-61`) → `interpFrames(t, true)` → the engine's default
transform ⟨cmd⟩ `sed -n '155,156p' src/animation/engine/animation.ts` → `protected readonly
_defaultTransform … = (vars) => transformTargetsStyle(vars, this.targets);` → `target.style.setProperty`
on the scene's nodes, which the scene's own engine (the group's rAF loop) also writes. **Two writers, one
DOM** — C-6.

**The engine is target-LIVE at every write**: `_defaultTransform` reads `this.targets` at call time;
`processFrame` binds computed slots to `anim.targets[0]` at interpolate time
(`interpolate.ts` `bindInterpSlotTarget(slot, target)`); `setTargets(...)` is the engine's own public
rebind (`animation.ts:485-490` → `bindTargets`, `element-resolve.ts:135`). **So whatever
`anim.targets` holds when a frame is applied is what gets painted, and nothing else.** That is the
lever.

### §1.2 The arm chosen — the **detached preview subject** (C-6's first arm); the second arm declined here

- **Chosen: "own detached/cloned preview target."** The timeline mints a **preview subject** — a deep,
  inert clone of the instrumented scene element — mounted in a **preview stage** inside the timeline card,
  and **rebinds the engine to it synchronously on every build**, before any frame can be applied. The
  scene's element is read (for `snapshot()`'s computed pose) and **never written** by the timeline.
- **Declined for this landing: "drive the scene's single engine through AnimationControlsGroup."** OP-0's
  settlement UNBLOCKED it, but its files (`AnimationControlsGroup.vue`, `ChannelControls.vue`) are outside
  every KF.W7 seat's §Bounds (*"Not touched by any seat"*), and its shape would make the timeline an
  *editor that overwrites the channel's animation* — a product change no row in this wave authorizes. It
  stays the bank's recorded alternative; it is not this wave's cure.

### §1.3 The cure, as landed (the seam commit)

1. **`timelineEngine.ts` — `createPreviewSubject(source)`**: `cloneNode(true)`; every `id` and
   `tabindex` stripped from the clone and its subtree (a duplicate `id` would hijack `Teleport
   to="#…"`, `<label for>`, `aria-*` references); `inert = true` + `aria-hidden="true"` (out of the tab
   order and the AT tree); `pointer-events: none`; stamped `data-timeline-preview-subject`. The build's
   docblock states the contract: **the build compiles; the OWNER binds what the engine paints.**
2. **`KeyframeTimeline.vue` — the preview stage + the two watchers**:
   - `watch([() => props.targets[0], previewStage], …, { immediate: true, flush: "post" })` — mints the
     subject for the current source and mounts it into the stage (re-minted only when the SOURCE or the
     STAGE changes, never per build — the DOM node is stable across rebuilds).
   - `watch([animation, previewSubject], ([anim, subject]) => anim?.setTargets(...(subject ? [subject]
     : [])), { immediate: true, flush: "sync" })` — **the invariant**. `flush: "sync"` fires inside
     `animation.value = markRaw(anim)` (`useTimelineBuild.ts:46`), i.e. in the same synchronous step as
     the build's publication. With no subject yet, `setTargets()` binds **nothing** — the engine paints
     nowhere rather than the scene.
   - `@update:scrub-t="scrub"` — the wire, lawful now: `scrub()` paints the subject.
3. **`TimelineTrack.vue` — the pointer policy** (§2) in the same commit.

### §1.4 The proof obligation (G2's assertion, *"provably NOT the scene's instance"*)

The only writer is `interpFrames(t, true)`; its only reachers are `scrub()` and `scrubAndCapture()`; both
read `animation.value`, which is assigned in the same synchronous step that rebinds `targets` to the
subject. Hence **every frame the timeline's engine ever applies is applied to `[subject]` (or to nothing)
— never to a scene element.** Construction (`new CSSKeyframesAnimation(options, ...targets)`) performs
**no DOM write** (`fromKeyframes` → `addFrame` → `parse` → `compileValuePair(target)` — reads only;
`bindTargets` runs only from `setTargets`). **Fixture obligation → `.d`'s
`timeline-mount-projection.test.ts` (G2 clause)**: mount `KeyframeTimeline` with a scene target carrying
a sentinel inline style; drive a primary-pointer scrub across the rail; assert the scene target's
`style` is byte-identical before and after, the stage's subject's `style` changed, and
`animation.value.targets[0] === stage.firstElementChild`.

### §1.5 The residuals this arm leaves, each with its owner — the family's `.e` members

- **R-b1 · construction-time targets (`.e`, `useTimeline.ts` + `useTimelineBuild.ts`)**. The build is
  still *constructed* over the caller's elements because the caller (`useTimelineBuild.ts:41-45`,
  `:126-130`) passes `targets.value`, and that file is `.e`'s. **Terminal shape, published**:
  `useTimeline` splits the two roles its one `targets` ref conflates — **`source`** (the scene element
  `snapshot()` reads, `useTimelineOps.ts:22`) and **`subject`** (the element the engine paints);
  `useTimelineBuild` builds over `[subject]` and the owner's `setTargets` rebind becomes redundant and is
  deleted in the same act. The signature of `buildAnimationFromTimeline` is unchanged by this seat (a
  third-argument change would break `.e`'s call in this commit); `.e` re-points the call.
- **R-b2 · the thumbnail capture target (`.e`, `useTimelineBuild.ts:92`, G10)**. `scrubAndCapture`
  captures `targets.value[0]` — the SCENE — after scrubbing the SUBJECT, so until `.e` lands, the hover
  thumbnail renders the scene's current pose rather than the keyframe's. **One-line cure, published**:
  capture `animation.value.targets[0]` (the subject the engine painted). This is a *thumbnail-truth*
  regression inside the wave, bounded to `.e`'s G10 surface, and it is stated here so no seat reads it as
  unexplained.
- **R-b3 · L-5, the crossed scrub/restore pairs (`.e`, `useTimelineBuild.ts:89-117`)** — in the G2
  cluster by N-10; its FILE is `.e`'s. **Design, published**: a module-level `captureGeneration`
  counter; `scrubAndCapture` reads `prevT` ONCE per generation (the first caller in a burst owns the
  restore; later concurrent callers inherit it and do not re-read `scrubT`), and the `finally` restores
  only when `generation === captureGeneration` at exit — the same discipline `nextFrame()` (`:63-87`)
  already applies one layer down. With the subject arm, the visible harm is bounded to the stage; the
  thumbnail-at-wrong-t harm remains until this lands.
- **R-b4 · canvas/WebGL subjects (SS-13 residue #1, routed)**. `cloneNode` of a `<canvas>` is blank; a
  canvas-drawn scene previews as an empty box. Recorded, not cured here (probe parsimony).

### §1.6 LP-1 — no write→render edge

`scrub()` is reached only from pointer/keyboard handlers. The subject mount is a `flush: "post"`
watcher (DOM work after render). The rebind is a `flush: "sync"` watcher on `animation`, whose source
assignment happens in an `async` `rebuild` after an `await` — never inside a render or computed. No
inline style is written during render.

---

## §2 · THE POINTER POLICY — one gesture, one policy, over the whole handler set

Carries M-3/C-4 · RR-B missed-3 · m-9/m-11/m-12 (merged) · M2 ≡ RR-B-7's capture mechanism.

| clause | before (`TimelineTrack.vue` at `77d0e0b1`) | after |
|---|---|---|
| **explicit gesture state** (RR-B missed-3) | `:182` `event.buttons > 0` — a proxy the comment above it miscalls *"pointer is captured"*; no `isScrubbing` | one `gesture` latch: `{ pointerId, kind: "scrub" } \| { pointerId, kind: "drag", ids }`; a pointermove that is not the gesture's pointer does nothing; a button-held pointer *entering* the band does nothing |
| **primary press only** (m-9/m-11/m-12 (c)) | `:168-172` no `button`/`isPrimary` test — right/middle press scrubs and captures before the context menu | `acceptsPress(e) = e.isPrimary && e.button === 0`, shared by the track and the marker handlers; a non-primary press neither scrubs nor captures |
| **pinch ⇒ NO scrub** (M-3/C-4) | pointer + touch pipelines on one element, no contact count | an `activePointers` set; a second contact **ends** the live gesture (capture released) and **suppresses** every gesture until all contacts lift — the pinch belongs to `useZoomPan`'s touch handlers alone |
| **capture on the handler's element** (M2 ≡ RR-B-7) | `setPointerCapture` on `event.target` — a node the caret's `startEdit` immediately unmounts | `event.currentTarget` at both sites |
| **out-of-band failure** (m-9 (a)) | `:160-161` `if (!trackEl.value) return 0` — a failure scrubs to START | `getPercentFromPointer(): number \| null`; `null` ⇒ no emit |
| **dead re-test** (m-11 (b)) | `:182` `&& !draggingKeyframeId.value` after the `:178` return | gone with the proxy |
| **the lying comment** (KF-CE-41) | *"Only scrub if pointer is captured (button held)"* | replaced by the policy's own words |

**Not in this commit, published to `.d`**: **M2's caret half** — the caret's `@click.stop` guards are
inert (`kf-TimelineCaret.md:74`, quoted at spec P1: *"the fix REPLACES the inert guards with
`@pointerdown.stop`, it does not stack a third modifier"*) — lands in `TimelineCaret.vue` (`.d`'s file);
until it lands, a primary press on the caret's display div still bubbles to the track and scrubs.
**D-1 (TimelineTrack) — the keyboard route** (G8, `.d`): the rail gains `role="slider"` for the playhead
(`aria-valuenow` = `Math.round(scrubT*100)`, `aria-valuetext` `"<n>%"`), `tabindex="0"`, and a `keydown`
handler that emits `update:scrubT` on Arrow (±1, Shift ±10) / Home / End / PageUp/PageDown (±10) — the
same emit the pointer uses, so the wire is ONE (`KeyframeTimeline` → `scrub`). Then `snapshot()` argless
captures at the keyboard user's position, which is D-1's adopted harm.

---

## §3 · G5 — UI AND ARTIFACT CANNOT DISAGREE: **COALESCED-AND-SAID-SO**

Carries N-6 · MISS-β1 · L-2/C-3/D·M-4's rounding.

### §3.1 The disagreement, at the bytes

⟨cmd⟩ `sed -n '37,47p' …/utils/timelineEngine.ts` — the merge loop keyed at `:38`
`const key = selectorText(kf.selector);`, admitted at `:40` `// Merge vars into keyframe (multiple
keyframes at same percent get merged)`, consumed by `fromKeyframes` (`:49-51`) and inherited by
`exportTimelineToCSS` (`:66`). Both render loops paint **per keyframe**: `TimelineTrack.vue:62`
`<Tooltip v-for="kf in sortedKeyframes"` and `:97-98` `<TimelineCaret v-for="kf in sortedKeyframes"`.
Two keyframes whose selectors serialize to one text are ONE rule in the animation and the export, and
TWO diamonds and TWO carets on the track. MISS-β1 names the strongest manufacturer: the caret's
`Math.round` commit makes 42.2 and 42.4 both `42` on a **read gesture** (open, blur).

### §3.2 The decision — coalesce at the READ side, once, for both consumers

**Minimum separation is DECLINED.** It would have to be enforced at every WRITER — `moveKeyframe`,
`addKeyframe`, `snapshot`, `importCSS`, `loadPreset`, the caret commit, undo's state re-seat — across
`.d`'s and `.e`'s files, and it invents a constraint CSS does not have: two `50%` blocks are a
well-defined `@keyframes` (later declarations win). A drag across a neighbour would snap or jump.

**COALESCED-AND-SAID-SO is RULED.** ONE derivation partitions the keyframes into **stops** by the merge
key the engine already uses; the build compiles one rule per stop; the track paints one marker and one
caret per stop and **says how many keyframes the stop holds**. Whatever the writers do, the artifact and
the UI read the same partition — agreement is structural, not policed.

**Written into both shared files in ONE act (the G5 commit)**:

- **`timelineTypes.ts`** — `interface TimelineStop { key; percent; keyframes; vars }` and
  `coalesceKeyframes(keyframes): TimelineStop[]`: stable sort by percent (equal percents keep state
  order), group by `selectorText(kf.selector)`, `vars` merged with later members winning — exactly the
  order and policy the build had. The partition lives beside `createKeyframeId` in the model file so a
  render component imports the model, not the engine.
- **`timelineEngine.ts`** — the `:37-47` loop is REPLACED: `buildAnimationFromTimeline` iterates
  `coalesceKeyframes(state.keyframes)` and compiles `stop.vars` under `stop.key`. There is no second
  merge; the engine has no partition of its own to disagree with.

**The UI half rides the seam commit** — `TimelineTrack.vue` is writable to this seat only inside that
family, and its marker/caret loops are re-keyed to stops in the same act that re-keys its gesture latch
(the drag latch becomes *the stop's ids*, which is the pointer policy's own state). One marker per stop;
`aria-label` *"2 keyframes at 50% (one rule in the animation) — drag or arrow to move"*; a `×n` badge on
a multi-member stop; the ghost is styled from `stop.vars` (the merged declaration set — what the
animation actually shows); a stop drag moves every member; selection resolves to the stop's already
selected member or its first.

### §3.3 The rounding row and the key — what this decision does and does NOT touch

- **L-2/C-3/D·M-4 (the caret's rounding well + commit-without-compare)** is cured at the caret by
  **`.d`** (G7: compare-before-commit, display at MODEL precision). Under this partition its
  collision-manufacturing arm (MISS-β1) is **disarmed in effect**: a rounding that merges two keyframes
  now merges them *visibly*, as one said-so stop — the artifact drops nothing the UI still shows.
- **The merge KEY stays `selectorText(kf.selector)` byte-for-byte.** Its float artefact
  (⟨cmd⟩ `node -e '…'` → `29` → `28.999999999999996%`, `57` → `56.99999999999999%`) is **MISS-β2's locus,
  KF.W8's** (*"C-1's float story never re-derived (locus = MISS-β2, KF.W8)"*, spec G7's kill lock). This
  seat does not canonicalize the key; when W8 cures the serializer, the cure flows through the ONE
  derivation.

---

## §4 · PUBLISHED DESIGNS `.d` IMPLEMENTS (TimelineTrack · TimelineCaret · useZoomPan · useTimelineOps)

### §4.1 G3 — a grab is not a teleport (`grabDx` + L-m-14, one family)

- On marker pointerdown record **`grabDx = pointerPercent − stop.percent`** (in model percent, via
  `getPercentFromPointer`), stored on the drag gesture (`kind: "drag", ids, grabDx`). On pointermove emit
  `clamp(pointerPercent − grabDx, 0, 100)`. First move at zero pointer delta emits the pre-grab percent
  exactly → `useRefHistory` banks nothing for the grab alone (GradientStopEditor C11/G5 is the severity
  precedent, not the identity).
- **L-m-14** — before each move, `ids = ids.filter(id => props.sortedKeyframes.some(kf => kf.id === id))`;
  if the set empties (mid-drag delete/undo), **end the gesture and release capture** — the sink's silent
  `find → no-op` (`useTimelineOps.ts:57`) is never reached with a dangling id. Same identity policy as
  L-8/C-9 (KeyframeTimeline).

### §4.2 G4 — rebuild economics (`useTimelineOps.ts` `moveKeyframe`, `:56-62`)

- **Dirty check**: `const next = clamp(newPercent, 0, 100); if (next === kf.percent) return;` — a
  rail-end hold rebuilds **zero** times.
- **rAF coalescing**: `rebuild` is invoked through one `scheduleRebuild()` that collapses N calls in a
  frame to ONE build (`useRafFn`-style latch; the engine constructor is HEAVY by its own docblock). A
  synthesized 60-move drag ⇒ ≤ 1 `buildAnimationFromTimeline` per animation frame. Held arrow
  auto-repeat rides the same path.

### §4.3 G13 — ONE wheel policy: *prevent only on consumed events*

- `@wheel.prevent` (`:31`) → `@wheel="onWheel"`; `useZoomPan.onWheel` returns whether it consumed the
  event and the track calls `event.preventDefault()` **only then**. A plain wheel scrolls the ancestor.
- Shift-pan reads **`event.deltaX || event.deltaY`** (`:59`) — whichever axis the engine delivers.
- The pan readout (`:4-18`) becomes **operable**: `role="scrollbar"`/slider semantics, `tabindex="0"`,
  Arrow keys pan, drag-to-pan on the thumb — the pan writer ARB-1's auto-pan can then exist.
- **L-11 (TimelineCaret)**: an explicit **is-editing guard** in the caret's own wheel handling (`.stop`
  while editing) inside the same policy — no reliance on the ancestor's `.prevent`.
- **D-11**: the zoom bar row reserves its height (or transitions its mount) and the zoom gains a
  keyboard route (`+`/`-` with the rail focused) — the `(panOffset/100)*100` clause folds to D-26.
- `useZoomPan(trackEl)` **guards, not asserts** (`L-m-10`, `:46` `trackEl.value!`).

### §4.4 Also `.d`'s, from this seat's rulings

- **M2 caret half** — `@pointerdown.stop` REPLACES the inert `@click.stop` at `TimelineCaret.vue:12`/`:25`.
- **D-1 keyboard route** — §2's last paragraph.
- **C-10** (from G1) — the caret's `update:percent` emit is renamed OFF the `update:*` protocol.
- **G7** — compare-before-commit at the caret; `useTimelineOps.moveKeyframe` returns early on equal
  percent (the same dirty check as G4) so a read gesture writes nothing.

---

## §5 · PUBLISHED DESIGNS `.e` IMPLEMENTS (KeyframeTimeline · THP · useTimelineBuild · useTimeline)

- **R-b1 · the source/subject split** in `useTimeline`/`useTimelineBuild` (§1.5) — retires the
  construction-time spread and the owner's rebind in one act.
- **R-b2 · capture the SUBJECT** — `scrubAndCapture` html2canvas's `animation.value.targets[0]`.
- **R-b3 · L-5 generation counter** (§1.5).
- **THP "said so"** — `TimelineHoverPreview` gains a `count` (or receives the stop) so the tooltip lists
  a multi-member stop's members; until then the badge + `aria-label` on the marker carry the signal.
- **L-8/C-9** — `@click="removeSelectedKeyframe()"` at the ✕ (deleting the `!`), one identity policy with
  L-m-14.
- **L-3** — the OWNERSHIP finding (K-4 kill lock: a `watch` on a non-reactive class instance changes
  nothing): the animation is re-derived only by explicit `rebuild()` calls, and the seam keeps it so —
  every state writer calls `rebuild` (or `.d`'s `scheduleRebuild`); the live `animOptions` object is the
  channel's own and is read at build time. No watcher is added; the cure is that the write path stays
  IMPERATIVE and SINGLE (`scheduleRebuild`), which is the honest form of the row.

---

## §6 · What this file rules, in one table

| id | rung after this ruling | disposition | lands in |
|---|---|---|---|
| C-1 | BLOCKER (cluster) | wired — `@update:scrub-t="scrub"`, engine-driven | seam commit (`.b`) |
| C-6 | BLOCKER (cluster) | detached preview subject + sync rebind; scene never written | seam commit (`.b`); R-b1 terminal shape → `.e` |
| L-3 | BLOCKER (cluster) | ownership stays imperative + single; no inert watcher | `.d` (`scheduleRebuild`) |
| L-5 | BLOCKER (cluster) | generation counter design | `.e` (R-b3) |
| M-3/C-4 | MAJOR (inverse trigger did NOT fire) | pinch ⇒ no scrub; primary-only | seam commit (`.b`) |
| RR-B missed-3 | MINOR | explicit gesture latch | seam commit (`.b`) |
| m-9/m-11/m-12 | MINOR | one policy; null projection; dead test gone | seam commit (`.b`) |
| M2 ≡ RR-B-7 | MAJOR | capture on `currentTarget` (track half) · `@pointerdown.stop` (caret half) | `.b` · `.d` |
| D-1 (TimelineTrack) | MAJOR | keyboard route design | `.d` (G8) |
| N-6 · MISS-β1 | MAJOR | COALESCED-AND-SAID-SO — one partition | G5 commit (`.b`) + seam commit (UI half) |
| L-2/C-3/D·M-4 | MAJOR | rounding disarmed as a collision manufacturer; caret compare-before-commit | `.d` (G7) |
| RR-B missed-1 + L-m-14 | MAJOR/MINOR | `grabDx` + live-collection reconciliation | `.d` (G3) |
| RR-B missed-2 | MAJOR | dirty check + rAF coalescing | `.d` (G4) |
| M5 ≡ RR-B-3 · M-7+missed-4 · D-11 · L-11 (caret) · L-m-10 | as banked | one wheel policy | `.d` (G13) |
| ARB-1 | INFO | needs the pan writer | `.d` (with G13) |
