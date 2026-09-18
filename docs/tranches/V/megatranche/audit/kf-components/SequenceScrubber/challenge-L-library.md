served model id: `claude-opus-5[1m]`

# CHALLENGE · `SequenceScrubber.vue` · axis **L (LIBRARY)**

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/sequence/SequenceScrubber.vue` (162 lines)
**Posture** assumed DEFECTIVE until the tree proved otherwise. Two claims were investigated and **downgraded** (D-5) or **de-fanged** (D-11) rather than shipped at their first-draft severity — a false defect costs more than a missed one.
**Tooling law** no browser. Every claim below is source-derived; the two that need a live surface are stamped `UNPROVEN-NEEDS-LIVE`.

## Read set (whole, read-only)

| File | Why |
|---|---|
| `demo/scenes/sequence/SequenceScrubber.vue` | target |
| `demo/scenes/sequence/sequenceKeys.ts` | the injected key |
| `demo/scenes/sequence/useSequenceDemo.ts` (482L) | the injected contract |
| `demo/scenes/sequence/useSequenceInstrument.ts` | `setScrubbing` / `setScrubDir` |
| `demo/composables/useDragScrub.ts` | the consumed drag seam |
| `demo/composables/scene-runtime/useSweepScene.ts` | the rAF mirror that ticks `progress` |
| `demo/scenes/sequence/SequenceTarget.vue` + `.css` | the parent + the sibling drag host |
| `demo/scenes/sequence/SequenceScene.vue` | the provider |
| `demo/styles/design-idioms.css` (300L) | `.progress-rail` / `.progress-ball` / `readout-accent` |
| `demo/styles/style.css` | cascade order, `@theme`, global `touch-action` |
| `node_modules/@mkbabb/glass-ui/dist/styles/theme/bridges.css`, `…/typography/utilities.css`, `…/components/timeline/ScrubberTimeline.vue.d.ts` | phantom-dep + S-4 evidence |
| `package.json`, `node_modules/@mkbabb/value.js/package.json` | dependency declarations |
| `test/demo/scenes/sequence-scene.test.ts` | coverage |

## Tally

| | count |
|---|---|
| BLOCKER | 0 |
| MAJOR | 2 |
| MINOR | 7 |
| INFO | 3 |
| **defects** | **12** |
| **superlatives** | **5** |

---

# DEFECTS

## D-1 · MAJOR · multi-pointer cross-talk: any second pointer scrubs the master playhead

**Provenance** `SequenceScrubber.vue:75-93` (the consumer) · `demo/composables/useDragScrub.ts:98,131-147` (the seam) · `SequenceTarget.vue:209-230` (the sibling consumer).

The shared seam latches `dragging = ref(false)` and nothing else — **no `pointerId` is recorded anywhere in the file**:

```ts
useEventListener(window, "pointermove", (e: PointerEvent) => {
    if (!dragging.value) return;
    onScrub(project(e));            // useDragScrub.ts:131-134
});
useEventListener(window, "pointerup", (e: PointerEvent) => {
    if (!dragging.value) return;
    endGesture(e);                  // useDragScrub.ts:136-139
});
```

`setPointerCapture` (`useDragScrub.ts:120`) captures **only the captured pointerId**; every *other* live pointer hits its own target and bubbles to `window`, where this handler runs unconditionally. `SequenceScrubber`'s `project` (`:77-82`) reads `e.clientX` against the rail rect for *whatever pointer arrived*.

Concretely: finger A holds the master rail (drag armed) → finger B touches anywhere (a row handle, the card, a palm) → B's `pointermove` is projected onto the master rail and `demo.scrub(p)` fires (`:72`), so **the master playhead teleports to finger B's x**; B's `pointerup` then runs `endGesture` (`useDragScrub.ts:100-110`), silently killing A's gesture while A is still down (`scrubbing.value=false`, `demo.setScrubbing(false)` — the cascade heat drops mid-drag).

This scene is the corpus's **highest-exposure consumer of the seam**: one master rail (`SequenceScrubber.vue:19`) plus five row handles (`SequenceTarget.vue:105`) = six concurrent drag hosts in one viewport, all on the same unfiltered window listeners. No other scene stacks six.

**Falsifier** Show a `pointerId` latch or an `e.isPrimary` / `e.pointerId === latched` guard on the move/up path — in `useDragScrub.ts` or in this component's handlers. `grep -n "pointerId" demo/composables/useDragScrub.ts` returns exactly one line (`:120`, the capture call), so no such guard exists. Alternatively, prove the browser suppresses non-captured pointer events at `window` during an active capture — it does not; capture is per-pointerId by spec.

**Severity rationale** MAJOR not BLOCKER: single-pointer (mouse/pen, single-touch) use is unaffected, which is the overwhelming path. But the failure is *silent and visibly wrong* (playhead jump + dead drag), and the seam is shared, so the fix is one line in one file for all consumers.

---

## D-2 · MAJOR · the glass-ui phantom dep (F-1) bites this file through CSS — with **zero import surface**

**Provenance** `SequenceScrubber.vue:11,16` · `package.json:68-70` · `node_modules/@mkbabb/glass-ui/dist/styles/theme/bridges.css:1` · `node_modules/@mkbabb/glass-ui/dist/styles/typography/utilities.css:1` · `demo/styles/style.css:3`.

**Folds** lane-frontend `F-1` (RED — `@mkbabb/glass-ui` absent from `package.json` *and* `package-lock.json`, 7.0.0 present in `node_modules`). **Extends it, and contradicts its scoping.** F-1 measures the exposure as "42 demo files import from `@mkbabb/glass-ui`" plus the one `@import` line. `SequenceScrubber.vue` imports **nothing** from glass-ui (its three imports are `vue`, `@mkbabb/value.js/math`, `@composables/useDragScrub` — `:41-45`), so an import-graph audit scores it clean. It is not.

Its two chrome lines are styled entirely by glass-ui-owned utility namespaces:

| class | line | owner | evidence |
|---|---|---|---|
| `text-caption` | `:11` | glass-ui `@theme inline` → Tailwind `text-*` namespace | `bridges.css:1` `--text-caption: var(--type-caption)`; **no `--text-caption` anywhere in `demo/`** |
| `text-muted-foreground` | `:11` | glass-ui `@theme inline` | `bridges.css:1` `--color-muted-foreground: var(--muted-foreground)`; **no `--color-muted-foreground` in `demo/styles/`** |
| `text-mono-caption` | `:16` | glass-ui `@utility` | `typography/utilities.css:1` `@utility text-mono-caption { font-family: var(--font-mono); font-size: var(--type-caption); letter-spacing: var(--type-tracking-caps); text-transform: uppercase; }` |
| `border-border` | `:7` | glass-ui `@theme inline` | `bridges.css:1` `--color-border: var(--border)` |

The demo's own `@theme` block (`style.css:42-…`) declares `--font-display`, `--font-mono`, `--color-accent-red`, … and **not** these. Only `readout-accent` (`:16`) is demo-owned (`design-idioms.css:189-192`); `tabular-nums` is stock Tailwind.

**Consequence** post-`npm ci` under F-1, this file still parses, still typechecks, still mounts, still emits `<span class="seq-eyebrow text-caption font-medium text-muted-foreground">` — and the "instrument panel" register (the `L.W11 S7` micro-cap eyebrow + the phosphor timecode) silently collapses to inherited font-size/colour. Class strings degrade **without a build error**. That is a different, worse failure mode than the 42 import sites, which fail loudly at resolve time.

**Falsifier** Any of: (a) `--text-caption` / `--color-muted-foreground` defined in a demo-owned sheet — `grep -rn -- "--text-caption\|--color-muted-foreground" demo/` returns nothing; (b) a `@utility text-mono-caption` in `demo/styles/` — `grep -rn "text-mono-caption" demo/styles/` returns nothing; (c) `@mkbabb/glass-ui` present in any dependency field — `grep -n "mkbabb" package.json` returns only `@mkbabb/value.js: 4.0.0` at `:69`.

**Severity rationale** MAJOR, not BLOCKER: the tree currently resolves (the stale `node_modules` install), so nothing is broken *today*, and the root cause (F-1) is already RED at the census. What this file adds is that **F-1's remediation checklist is incomplete if it enumerates import sites** — silent CSS-only consumers must be swept too.

---

## D-3 · MINOR · one boolean, three homes — the seam's own `dragging` is discarded and re-derived

**Provenance** `SequenceScrubber.vue:62,75,84-92` · `useDragScrub.ts:87-89,98,100-101,112-113`.

`useDragScrub` returns `{ dragging, onPointerDown }` and documents `dragging` as *"True while a drag gesture is in flight (drives the `--dragging` affordance)"* (`useDragScrub.ts:87`). The component destructures only `onPointerDown` (`:75`), then hand-rolls the identical boolean:

```ts
const scrubbing = ref(false);                       // :62
onStart: () => { scrubbing.value = true;  demo.setScrubbing(true);  }   // :84-88
onEnd:   () => { scrubbing.value = false; demo.setScrubbing(false); }   // :89-92
```

The timings are provably identical: the seam sets `dragging.value = true` at `:113` *before* `onStart?.(e)` at `:124`, and `dragging.value = false` at `:101` *before* `onEnd?.(e)` at `:107` — both synchronous, same tick. So `scrubbing` is a byte-exact shadow of `dragging`, and `demo.isScrubbing` (`useSequenceInstrument.ts:19`) is a third copy of the same edge. Local `scrubbing` drives one class (`:21`); `demo.isScrubbing` drives the stage class (`SequenceTarget.vue:62`). Either could serve both.

This is precisely the duplication the seam was extracted to end — its own docstring names *"THREE hand-rolled copies of the SAME dance"* (`useDragScrub.ts:15-21`).

**Falsifier** Show a tick where `dragging` and `scrubbing` disagree. The only candidate is a mid-`onStart` throw, which would abort both paths identically. Or: show a second writer of `scrubbing` — there is none (`grep -n "scrubbing" SequenceScrubber.vue` → `:21,62,85,90` only).

---

## D-4 · MINOR · the keyboard path is a second, divergent scrub — the headline affordance is pointer-only

**Provenance** `SequenceScrubber.vue:69-73` (the pointer path) vs `:97-111` (the keyboard path) · `useSequenceInstrument.ts:10-13` · `SequenceTarget.css:27-31,215-218`.

The pointer path reports the **gesture**: `setScrubDir` → `demo.scrub` (`:70-72`), bracketed by `onStart`/`onEnd` that raise `is-scrubbing`. The keyboard path calls `demo.scrub(...)` **bare** — no `setScrubDir`, no `setScrubbing`, no `lastP` update:

```ts
if (e.key === "ArrowRight" || e.key === "ArrowUp") {
    demo.scrub(demo.progress.value + 0.05);   // :98-100
```

So the scene's headline `L.W11 S7` affordance — the ignition cascade, `--seq-glow` lifting the whole storyboard well (`SequenceTarget.css:28-31`) and `--scrub-dir` flipping the diagonal detonation (`:24`) — **never fires for a keyboard user**. The element is `tabindex="0"` `role="slider"` (`:26-27`), i.e. keyboard operation is a first-class declared path, not a fallback. A keyboard user gets a moving playhead on a cold board.

Two paths that must stay in lockstep, written twice, with no shared helper: the natural repair is one `applyScrub(p, {gesture})` both call.

**Falsifier** Show `--seq-glow` or `--scrub-dir` lifting on a path other than `demo.setScrubbing`/`setScrubDir` — `grep -rn "setScrubbing\|setScrubDir" demo/` yields `useSequenceInstrument.ts` (definition), `useSequenceDemo.ts:175,460` (re-export) and `SequenceScrubber.vue:70,87,91` **only**. Or show the cascade running without `.is-scrubbing` — `SequenceTarget.css:28` gates `--seq-glow: 1` on exactly that class.

*(Note the sibling row handle has the same shape at `SequenceTarget.vue:233-243` — but there the keyboard path and the drag path both bottom out in the single verb `demo.reseatRow`, so they cannot diverge. The scrubber is the one that split.)*

---

## D-5 · MINOR · the one drag host in the corpus with no touch-gesture posture — **investigated and DOWNGRADED**

**Provenance** `SequenceScrubber.vue:20,115-122` (no `touch-action`) · `SequenceTarget.css:134` · `demo/scenes/square/SquareScene.css:64` · `demo/scenes/cube/orbital-drag/OrbitalDrag.vue:350` · `demo/scenes/amiga/AmigaScene.vue:254` · `demo/scenes/cube/CubeScene.vue:12`, `CubeTarget.vue:4` · `demo/styles/style.css:219` · `demo/components/playback/PlaybackRibbon.vue:134,153-179`.

Every other pointer-capture host in the demo declares its touch posture. The sibling row handle **in this very file's parent stylesheet** does: `.seq-handle { … touch-action: none; }` (`SequenceTarget.css:128-135`). The chrome scrubber goes further and routes touch through glass-ui's `useTouchGate` first-tap-activates gate (`PlaybackRibbon.vue:134,167-176`). `.seq-scrub` declares **neither** — it inherits the global `touch-action: manipulation` (`style.css:219`), which suppresses double-tap zoom but **still permits panning**.

**Downgrade.** I first drafted this MAJOR ("touch drag is stolen by scroll"). The tree refuses that: `html, body { overflow: hidden; overscroll-behavior: none }` (`style.css:212-214`), `.seq-root` and the `Card` are both `overflow-hidden` (`SequenceTarget.vue:2,8`), and a repo-wide sweep for scroll containers (`grep -rn "overflow-y-auto\|overflow: auto\|overflow-y: auto\|overflow: scroll" demo/`) finds **none above the stage** — only the controls sheet, the channel panes and two code blocks, all siblings. With no pannable ancestor the browser has nothing to steal the gesture for, so the omission is very likely **inert on Chromium/Android**.

What survives at MINOR: (a) a proven internal-consistency gap — six drag hosts in one scene, five declare `touch-action: none`, the sixth does not; (b) the omission is load-bearing only by accident of the current ancestor overflow, so any future scroll container over the stage converts it into a live bug with no local signal.

**`UNPROVEN-NEEDS-LIVE`** the iOS Safari case: iOS still rubber-bands a document with `overflow:hidden` in some configurations, and a rubber-band fires `pointercancel` → `endGesture` (`useDragScrub.ts:144-147`) mid-drag. Route to the SS-13 visual/live audit.

**Falsifier** Any `touch-action` reaching `.seq-scrub` — `grep -rn "touch-action" demo/` returns 13 lines, none of which selects `.seq-scrub` or an ancestor other than `html, body`. To kill the MINOR entirely: show that a scroll container exists above the stage (then this re-escalates), or show the corpus deliberately treats stage rails differently from chrome rails (`SequenceTarget.css:134` — a *stage* rail with `touch-action: none` — says otherwise).

---

## D-6 · MINOR · the ζ boast has an asterisk: this component re-renders on every animation frame, and churns `aria-valuenow` with it

**Provenance** `SequenceScrubber.vue:16,24,34` · `useSequenceDemo.ts:179-204` · `useSweepScene.ts:44-51,78-…` · `SequenceScrubber.vue:153` (the scoped comment that concedes it).

`progress` is written **per rAF** while playing: `useSweepScene({ frame: () => { syncFromSequence(); … } })` (`useSequenceDemo.ts:188-195`) runs inside the engine's `RAFPlayback` loop (`useSweepScene.ts:78`), and `syncFromSequence` assigns `progress.value` (`useSequenceDemo.ts:179-181`). The template reads it three times:

- `:16` `demo.progress.value.toFixed(3)` — a **string allocation per frame**, plus a text-node patch;
- `:24` `:aria-valuenow="Math.round(demo.progress.value * 100)"` — an **attribute write per frame on a focusable `role="slider"`**;
- `:34` the interpolated `transform` string — an inline-style patch per frame.

So during autoplay the whole SFC re-renders at 60–120 Hz to move one ball, in a scene whose own documentation says *"there is no per-frame Vue work for the motion"* (`useSequenceDemo.ts:32-34`) and whose five lane balls are painted by the engine straight into `--ball-p`. `:153` concedes the exception honestly ("the one ball the engine does not paint") — but the *readout and the aria attribute* are not the ball, and the row travellers demonstrate the cheaper idiom in the same scene: one custom property written by the engine, CSS does the rest (`SequenceTarget.css:187-199`).

**`UNPROVEN-NEEDS-LIVE`** the sharpest edge — several assistive technologies announce `aria-valuenow` changes on a focused slider; at 60 Hz that is an announcement storm whenever the sequence autoplays with the scrubber focused. Needs a live AT pass; the per-frame attribute *write* is source-proven regardless.

**Falsifier** Show `progress` updating only on scrub, not during playback — `useSequenceDemo.ts:190` calls `syncFromSequence()` inside `frame`, and `frame` is the rAF body. Or show Vue skipping the patch — the `toFixed(3)` result changes almost every frame, so the text node genuinely differs.

---

## D-7 · MINOR · stale provenance: the comment cites a line past EOF

**Provenance** `SequenceScrubber.vue:147` vs `demo/styles/design-idioms.css` (300 lines total).

```
   .progress-ball idiom's --ball-glow parameter (design-idioms.css:584) rather
```

`design-idioms.css` is **300 lines** (`wc -l`). Line 584 does not exist. The cited idiom is at `:177-187`, and `--ball-glow` specifically at `:185`. The pointer is not merely off — it is unresolvable, so a reader following it learns nothing and a future `--ball-glow` rename has no back-reference to this consumer.

This matters more than a typo here because the surrounding comment (`:144-150`) is an *architectural* instruction ("CONSUME the promoted idiom … rather than re-authoring its box-shadow"), i.e. it is doing real governance work with a dead citation.

**Falsifier** `wc -l demo/styles/design-idioms.css` ≥ 584, or a second `design-idioms.css` reachable from the demo cascade. `find . -name design-idioms.css -not -path "*/node_modules/*"` returns **17** paths — but exactly one in the tree (`./demo/styles/design-idioms.css`, 300 lines); the other 16 are stale agent worktree copies under `.claude/worktrees/wf_*/demo/@/styles/` (a *different* repo layout — `demo/@/` is value.js's shape, not keyframes.js's), reachable from no build. Checked, because "one file" was my first draft of this falsifier and it was wrong.

---

## D-8 · INFO · identity wrapper: `onScrubDown` forwards and does nothing else

**Provenance** `SequenceScrubber.vue:95` · `SequenceTarget.vue:227-230`.

```ts
const onScrubDown = (e: PointerEvent) => onScrubDownRaw(e);
```

A pure pass-through: the template could bind the destructured handler directly (`onPointerDown: onScrubDown` in the destructure at `:75`), deleting the alias and the extra closure allocated per instance. The sibling `onRowDown` (`SequenceTarget.vue:227-230`) has the identical *shape* but earns it — it latches `activeRow.value = index` before forwarding. The form was copied here without the reason that justified it.

**Falsifier** Show a side effect, guard or arity change in the wrapper — there is none; the body is a single forwarding call with the same parameter.

---

## D-9 · INFO · the `project` null-ref fallback is unreachable defensive code that would *pause playback* if reached

**Provenance** `SequenceScrubber.vue:77-82` · `useSequenceDemo.ts:279-286`.

```ts
project: (e) => {
    const el = scrubEl.value;
    if (!el) return demo.progress.value;   // :79
```

The handler is bound to the very element `scrubEl` names (`:19,28`), so if the event fires the ref is populated — the branch is dead. If it *were* reached it would not no-op: `onScrub` still runs `demo.setScrubDir(...)` and `demo.scrub(p)` (`:70-72`), and `demo.scrub` **pauses a playing sequence** and dispatches a machine `SCRUB` (`useSequenceDemo.ts:280,285`). A defensive branch whose failure mode is "stop the animation" is worse than an early return; the honest posture is `if (!el) return null` with `onScrub` guarding, or deleting the branch.

**Falsifier** Show a path where `@pointerdown` fires with `scrubEl.value === null` (a manual `dispatchEvent` on a detached node, or a `v-if` teardown race). None exists in the tree: the element has no `v-if`/`v-show` and the handler is inline on it.

---

## D-10 · MINOR · the same value gets two different treatments in one element, and AT never hears the real readout

**Provenance** `SequenceScrubber.vue:24` vs `:34` · `useSequenceDemo.ts:180`.

`:24` `:aria-valuenow="Math.round(demo.progress.value * 100)"` — **unclamped**.
`:34` `translateX(calc(${clamp(demo.progress.value, 0, 1) * 100}cqw))` — **clamped**.

Both are inert today because `progress` is clamped at source (`useSequenceDemo.ts:180` `progress.value = clamp(sequence.progress, 0, 1)`), so this is not a live bug — it is two authors disagreeing about who owns the clamp inside one 20-line template, which is how a real out-of-range `aria-valuenow` gets shipped the day the source clamp moves.

Coupled a11y gap: there is **no `aria-valuetext`**. The visible readout is a three-decimal timecode (`:16`, `0.000`) deliberately made *"the brightest number on the page"* (`:12-15`), while a screen reader hears a bare integer `37` with no unit. `aria-valuetext="0.372"` would close it in one attribute.

**Falsifier** Show `aria-valuetext` present (it is not — `grep -n "aria-" SequenceScrubber.vue` → `:23,24,25,26` only), or show `progress` can exceed `[0,1]` (it cannot, per `:180`) — which would *escalate* this, not kill it.

---

## D-11 · INFO · master-ball geometry overhangs its own gutter — recorded, **not** charged as an invention

**Provenance** `SequenceScrubber.vue:7,20,34,155-161` · `design-idioms.css:177-187` · `SequenceTarget.vue:8` · `demo/scenes/spring/SpringTarget.vue:335,344`.

Nothing in this scene sets `--ball-size` for `.scrub-ball`, so the idiom default resolves: `36px` (`design-idioms.css:180-182`). The rail is `h-9` = 36px (`:20`), the ball is centre-anchored by `margin-left: calc(var(--ball-size, 36px) / -2)` = `-18px` (`:159`), and the rail sits inside `px-4` = 16px (`:7`). At `p=0` and `p=1` the ball therefore overhangs the padding gutter by **2px** on each side. Contrast the row travellers in the same scene, which are inset by construction — `(100cqw - var(--ball-size))` (`SequenceTarget.css:194-199`) — so master and lane balls encode the same normalized value at different pixel anchors.

**Why this is INFO and not a defect against this file:** the centre-anchored master ball at the idiom default is a *deliberate cross-scene posture* — `SpringTarget.vue:335,344` uses the byte-identical recipe and documents it as "the idiom-default `--ball-size` (36px)". This file inherited the corpus idiom; it did not invent a deviation.

**`UNPROVEN-NEEDS-LIVE`** whether the 2px is visibly clipped depends on whether glass-ui's `Card` (`SequenceTarget.vue:8`, `overflow-hidden`) contributes internal padding; I could not resolve `Card`'s computed padding from the compiled `dist/card.js`. Route to SS-13.

**Falsifier** Any ancestor setting `--ball-size` for `.scrub-ball` — `grep -rn -- "--ball-size" demo/` shows the setters are `EasingTarget.css:163`, `SequenceTarget.css:188` (`.seq-ball`, a sibling not an ancestor) and three in `spring/`; none reaches `.scrub-ball`. Or a `Card` with ≥18px inline padding, which would make the overhang invisible.

---

## D-12 · MINOR · zero automated coverage of this component

**Provenance** `test/demo/scenes/sequence-scene.test.ts` (65 lines) · `vitest.config.ts:42,51`.

The demo has a real vitest project (`name: "demo"`, `vitest.config.ts:51`) and the sequence scene has a test file — which covers **`useSequenceInstrument`'s refs** (`:20-49`) and **`useSequenceDemo` construction** (`:51-…`) and nothing else. A repo-wide sweep for this component's markers finds it only in the source and in tranche docs:

```
$ grep -rln "seq-scrub" . --exclude-dir=node_modules --exclude-dir=.git
demo/scenes/sequence/SequenceScrubber.vue
docs/tranches/… (7 prose files)
```

So the direction latch (`:63,69-73`), the keyboard branch (`:97-111`) and the rect projection (`:77-82`) are untested. Note the *sibling* row-handle drag has a static proof clause guarding its class contract (`SequenceTarget.css:160-162`, "the `class="seq-handle"` source contract the `proof:sequence-rows-draggable` static clause reads"); the master scrubber has no equivalent. D-4's divergence is exactly the class of defect a mount test would catch on the first run.

**Falsifier** Any spec mounting `SequenceScrubber`, or a proof gate naming it — `grep -rn "SequenceScrubber" test/ scripts/` returns nothing.

---

# SUPERLATIVES (L-18, the other direction)

## SUP-1 · exemplary · consumes the promoted idiom's **parameter**, refuses to re-author its shape

**Provenance** `SequenceScrubber.vue:144-150` · `design-idioms.css:161-187`.

```css
.seq-scrub.is-scrubbing .scrub-ball {
    --ball-glow: 60%;
}
```

Three lines. The idiom owns `box-shadow: 0 2px 10px color-mix(… var(--ball-glow, 35%) …)` (`design-idioms.css:185`); the scene lifts **only the strength** under an active drag. The obvious wrong answer — restating the whole `box-shadow` with a hotter mix — is the one that produces the "authored four ways" drift the idiom block was promoted to end (`design-idioms.css:161-162`). The comment even states the discipline as a rule for the next author. This is the single cleanest instance of parameterized-idiom consumption I read in the dependency set.

**Falsifier (runs both ways)** Show the scoped style re-declaring any property the idiom already owns — `:148-161` declares `--ball-glow`, `left`, `margin-left`, `will-change`. `left`/`margin-left` are *anchoring*, which the idiom deliberately leaves to the consumer (it sets `top`/`margin-top` only, `design-idioms.css:178-182`). No overlap. Claim holds.

## SUP-2 · exemplary · **leak-free by construction** — there is nothing to tear down, and nothing pretends to

**Provenance** `SequenceScrubber.vue` (whole) · `useDragScrub.ts:128-147` · `useSweepScene.ts:34-37`.

The component owns **zero** disposable resources: no `addEventListener`, no `setTimeout`/`setInterval`, no `requestAnimationFrame`, no `watch`, no engine handle, no `onMounted`/`onUnmounted`/`onScopeDispose`. `grep -c "addEventListener\|setTimeout\|requestAnimationFrame\|watch(" SequenceScrubber.vue` → 0. The three global `window` listeners it depends on live in the seam under `useEventListener`, which auto-detaches on scope dispose (`useDragScrub.ts:128-130`), and the rAF loop lives in `useSweepScene`, which owns its own `onScopeDispose(stopLoop)` (`useSweepScene.ts:34-37`). The teardown obligation was pushed to the layer that can actually discharge it, and the leaf carries none — the correct end state for a leaf view, and rarer than it should be.

**Falsifier** Any resource acquired in this file's `<script setup>` without a matching release. The full acquisition set is `inject` (`:47`), `ref` (`:62`), `useTemplateRef` (`:52`), `useDragScrub` (`:75`) and four arrow functions. None is disposable.

## SUP-3 · exemplary · compositor-only positioning via container queries

**Provenance** `SequenceScrubber.vue:34,118-122,155-160` · mirrored at `SequenceTarget.css:111-115,189-199`.

`container-type: inline-size` on the rail (`:121`) + `translateX(calc(<n>cqw))` on the ball (`:34`) means the playhead position is **rail-relative with no per-frame layout** — the naive `left: <n>%` would invalidate layout on every one of the frames D-6 counts. The T.G4 rationale is stated inline at `:118-120` and `:156-157`, and `will-change: transform` (`:160`) is *earned* here (the element genuinely transforms every frame), not cargo-culted.

Bonus correctness the comment doesn't claim: `container-type: inline-size` implies `contain: layout`, which makes `.seq-scrub` the containing block for the absolutely-positioned `.progress-rail` and `.scrub-ball` — so the anchoring is well-defined even though the utility `relative` (`:20`) is belt-and-braces.

**Falsifier** Show `cqw` resolving against the wrong container — the nearest `container-type` ancestor of `.scrub-ball` is `.seq-scrub` itself (`:121`); the parent chain adds no other (`SequenceTarget.css`'s `container-type` is on `.seq-track`, a different subtree).

## SUP-4 · exemplary · reports the **gesture**, never the motion — inv ζ honoured at the leaf

**Provenance** `SequenceScrubber.vue:54-73` · `useSequenceDemo.ts:36-45` · `SequenceTarget.css:202-209`.

A 162-line file drives a five-lane cascading detonation and contains **no clock**. `onScrub` (`:69-73`) does exactly two things: record the drag direction, and hand the master clock a scalar. Everything visible after that is the engine fanning `--ball-p` out to five child animations, with the bloom computed by one CSS `calc()` (`SequenceTarget.css:205-208`). The comment at `:54-61` states the invariant *and* the temptation it refuses ("no new rAF, no second writer"). Given how easy a second `requestAnimationFrame` would have been here — a chase animation on the ball, an eased catch-up on the timecode — the restraint is the finding.

**Falsifier** Any timing primitive in the file. `grep -nE "raf|rAF|requestAnimationFrame|setTimeout|setInterval|Date\.now|performance\.now" SequenceScrubber.vue` returns exactly **one** line — `:59`, inside the comment that names the invariant ("no new rAF, no second writer — inv ζ"). Zero hits in executable code. (My first draft of this falsifier said "→ nothing"; the comment hit is reported rather than silently excluded.)

## SUP-5 · exemplary · an honest split seam — colocated, injection-only, no manufactured prop drill

**Provenance** `SequenceScrubber.vue:2-6,47` · `SequenceTarget.vue:124-127,146` · `sequenceKeys.ts:7-8`.

Splitting a component to satisfy a line ceiling usually produces a prop-drilled fragment that cannot be reasoned about alone. This one takes **no props at all** — it injects `SEQUENCE_DEMO_KEY` (`:47`) and touches nothing Target-private, which the header comment states as the split's contract (`:5-6`) and the parent restates at its call site (`SequenceTarget.vue:124-127`). The seam is real (a master scrubber *is* a separable unit), the key is typed (`sequenceKeys.ts:7-8`), and the file reads standalone. At 162 lines with three concerns (markup / drag wiring / scoped style) it sits in the Goldilocks band.

**Falsifier (runs both ways)** Show the child reaching into parent-private state, or the parent passing anything. `SequenceTarget.vue:127` is `<SequenceScrubber />` — bare. The child's only external reads are `demo.*` (the provided contract) and `clamp`.

---

# CORPUS FOLD

| id | source | this challenge |
|---|---|---|
| **F-1** (RED, phantom `@mkbabb/glass-ui`) | `lane-frontend.md:15,54-71` | **Folded and extended** at D-2. **Contradicted on scoping:** F-1 counts the exposure as 42 *import* sites + one `@import`. This file has **zero glass-ui imports** and is nonetheless glass-ui-dependent through four utility classes. F-1's remediation sweep must enumerate CSS-only consumers or it will under-count. |
| **S-4** (AMBER, `SequenceScrubber` → `ScrubberTimeline`/`Slider`, 162 lines) | `lane-frontend.md:350-352` | **Folded; the evaluation sharpened both ways.** S-4 reasons "a rail-with-ball is the `Slider` primitive's exact shape". The tree says `Slider` is the *wrong* target and `ScrubberTimeline` is the right one: `PlaybackRibbon.vue:163-166` records that glass-ui's `Slider` provides no scrub gate and sets `touch-action:none`, hijacking scroll. `ScrubberTimeline.vue.d.ts` however emits **`scrubStart` / `scrubEnd`** and ships "pointer-capture drag, keyboard a11y (role=slider + arrow-key step + shift-step)" plus a 44px invisible touch halo and a transform-driven head — i.e. it supplies, as primitive behaviour, D-1's capture discipline, D-4's keyboard/gesture unification and D-5's touch posture. **Not supplied:** per-sample direction (`scrubDir`), which the consumer would derive from the `update:modelValue` delta — a 2-line loss against a ~60-line gain. **Sequencing caveat:** adopting it deepens the F-1 exposure, so F-1 must land first (agreeing with `lane-frontend.md:612`). |
| lane-library parse seams | `lane-library.md` | **No overlap.** That lane audits engine parse surfaces; this component touches no parser. Recorded so the absence is not mistaken for an omission. |

# ADJACENT (observed, out of scope, not counted)

`useSequenceDemo.ts:400-413` builds a second `createRafAdapter` even though `useSweepScene` already constructs and returns one (`useSweepScene.ts:73,…`), and the returned `scenePlayback` is discarded at the destructure (`useSequenceDemo.ts:188-192` takes only `playback`/`startLoop`/`stopLoop`). Two adapters over one loop. Belongs to a `useSequenceDemo` challenge, not this one; flagged so it is not lost.
