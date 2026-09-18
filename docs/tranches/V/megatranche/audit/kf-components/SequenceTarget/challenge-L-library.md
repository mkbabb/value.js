claude-opus-5[1m]

# CHALLENGE · `SequenceTarget.vue` · axis **L — LIBRARY**

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/sequence/SequenceTarget.vue` (252 lines)
**Mode:** static, read-only. No installs, no dev server, no browser tooling. Every claim is source-derived.
**Read set (whole, as law requires):** the component + `SequenceTarget.css` (259) + `useSequenceDemo.ts` (482) + `useSequenceInstrument.ts` (45) + `useTypedTrigger.ts` (31) + `sequenceKeys.ts` (8) + `SequenceScrubber.vue` (162) + `SequencePlayhead.vue` (87) + `SequenceAxis.vue` (49) + `SequenceScene.vue` (43) + `demo/composables/useDragScrub.ts` + `demo/utils/gestureSelectSuppression.ts` + the engine surfaces it consumes (`src/animation/orchestration/sequence/{sequence,transport,events}.ts`, `src/animation/engine/{animation,play-lifecycle}.ts`) + the resolved third-party surfaces (`@mkbabb/glass-ui` 7.0.0 `metric.d.ts`/`components/metric/types.d.ts`, `@lucide/vue` 1.17.0, `@mkbabb/value.js` 4.0.0 `subpaths/math.d.ts`) + `package.json` / `tsconfig.json` / `vite.config.ts` / `.github/workflows/*.yml`.

**Posture:** the component was assumed DEFECTIVE until the tree proved otherwise. Several plausible defects were **hunted and killed** — they are recorded in §4 (Killed hypotheses) so the next auditor does not re-spend the tokens.

**Tally: 14 defects · 1 BLOCKER · 4 superlatives.**

---

## 0. Headline

| id | severity | claim | anchor |
|---|---|---|---|
| **L-1** | **BLOCKER** | `Sequence.duration` is a cached private field mutated only by `add()`. `reseatRow` re-writes `entry.at` directly, so any row re-timed past **1040 ms** yields a master clock that cannot complete it — `progress === 1` with a lane frozen mid-glide. Reachable by **one keypress** (`End`) on any handle. | `SequenceTarget.vue:239`, `useSequenceDemo.ts:337-346`, `sequence.ts:202,221,278` |
| L-2 | MAJOR | ONE `useDragScrub` instance is wired to FIVE independently-pressable handles. A second concurrent `pointerdown` increments the global select-suppression refcount but can never decrement it → `body.is-dragging` (and `user-select: none` document-wide) is stranded **for the session**. | `SequenceTarget.vue:209,227-230`, `useDragScrub.ts:106-124,130-136`, `gestureSelectSuppression.ts:9-22` |
| L-3 | MAJOR | The render effect subscribes to `demo.progress` (two sites), so the whole 5-row storyboard subtree re-renders at rAF cadence — 10 inline `:ref` closures re-allocated **and re-invoked** per frame. Contradicts the file-family's own load-bearing invariant. | `SequenceTarget.vue:21,70,90,115`, `runtime-core.cjs.js:1814-1815` |
| L-4 | MAJOR | **No gate typechecks this file.** `vue-tsc` is absent from devDependencies, from every npm script, and from all three CI workflows; `npm run check` is bare `tsc`, which never opens a `.vue`. Every cast and `!` in the `<script setup>` is unverified. | `package.json:38,88-129`, `.github/workflows/ci.yml:42`, `release.yml:43` |
| L-5 | MAJOR | The reel egg and the row handles are concurrently live; `applySequenceAt` ignores `managed`, so a drag during the reel puts two writers on the same ball targets. | `SequenceTarget.vue:34,105,249`, `useSequenceDemo.ts:364-392`, `transport.ts:34-37` |
| L-6 | MINOR | The handle and the ball map the SAME `at / STAGGER_MAX` domain through two DIFFERENT pixel geometries (`%`-of-track vs `100cqw − ball-size`). Divergence up to ±12.8 px; exact only at the midpoint. | `SequenceTarget.vue:81,98`, `SequenceTarget.css:120-132,194-199` |
| L-7 | MINOR | `--stagger-max` is write-only — set inline every render, read by no CSS anywhere on disk. | `SequenceTarget.vue:63` |
| L-8 | MINOR | `.seq-root` has no rule in the repository. Dead class. | `SequenceTarget.vue:2` |
| L-9 | MINOR | `ROW_TONES` / `rowEls` / `ballEls` arity is coupled to `ROW_COUNT` with **no** compile-time check; an out-of-range tone degrades to `undefined` silently. | `SequenceTarget.vue:143,161-182` |
| L-10 | MINOR | The view writes the raw engine object directly (`demo.sequence.progress = …`), reaching past the composable's own `scrub` / facility seam. | `SequenceTarget.vue:192` |
| L-11 | MINOR | `playReel` flips `child.managed` to route around the engine's own `play()` guard rail. | `useSequenceDemo.ts:376-381`, `play-lifecycle.ts:364-366` |
| L-12 | INFO | Three "24 px handle" provenance comments contradict the shipped `width: 44px` — and the CSS contradicts itself two lines apart. | `SequenceTarget.vue:113,178`, `SequenceTarget.css:119,128` |
| L-13 | INFO | `btn-interactive` has no definition anywhere on disk (demo, glass-ui dist, glass-ui styles). Inert class. | `SequenceTarget.vue:31` |
| L-14 | INFO | Two import styles for one vendor (root barrel + `/metric` subpath), and the vendor is the **phantom dep** — this file is one of the 31 that cannot resolve after a clean `npm ci`. Folds census **F-1**. | `SequenceTarget.vue:136,138` |

Superlatives (L-18 runs both ways): **S-1** `useTypedTrigger`, **S-2** nil teardown surface, **S-3** the `@property` + `cqw` engine-consumption idiom, **S-4** the J.WZ target relocation. §3.

---

## 1. Defects

### L-1 · **BLOCKER** — row re-timing silently corrupts the master clock

**Claim.** `Sequence` caches its span in a private field that only `add()` ever writes:

```ts
// src/animation/orchestration/sequence/sequence.ts
121:  readonly entries: SequenceEntry<V>[] = [];   // array binding readonly; `at` is a plain mutable number
139:  private cursor = 0;
158:  private _duration = 0;
202:  get duration(): number { return this._duration; }        // getter-only, no setter
221:  set progress(p: number) { this.seek(clamp(p, 0, 1) * this.duration); }
277:      this.cursor = resolved + animation.options.duration;
278:      this._duration = Math.max(this._duration, this.cursor);   // ← the ONLY writer, and it is monotone
```

`SequenceEntry.at` is a bare mutable `number` (`events.ts:36-40`). `reseatRow` exploits that and re-authors position **outside** `add()`:

```ts
// useSequenceDemo.ts:337-346
const entry = sequence.entries.find((e) => e.animation === childAnims[index]);
if (entry) { entry.at = clamped; sequence.entries.sort((a, b) => a.at - b.at); }
sequence.seek(sequence.progress * sequence.duration);
```

`_duration` is never touched — and **cannot** be: `duration` has no setter, `cursor` is `private`, and the `Math.max` at `:278` is monotone so even a hypothetical re-`add` could only grow it.

**Arithmetic (deterministic, no browser needed).** `ROW_DURATION = 900`, defaults `at = 0, 260, 520, 780, 1040` (`useSequenceDemo.ts:62,101-108,148-150`). `resolveSequencePosition` returns a numeric `at` verbatim (`transport.ts:82-83`), so the five `add()` calls set `cursor` to 900 / 1160 / 1420 / 1680 / **1940** → `_duration = 1940` for the life of the object.

`reseatRow` clamps to `STAGGER_MAX = 1600` (`useSequenceDemo.ts:74,328`). Drag any handle to the far right, or press **`End`** once:

```ts
// SequenceTarget.vue:238-242
else if (e.key === "End") next = demo.STAGGER_MAX;   // 1600
…
demo.reseatRow(index, next);
```

That lane now needs the master clock to reach `1600 + 900 = 2500 ms`. `duration` is still `1940`. At `progress = 1`:

```ts
// transport.ts:34-37
const local = clamp(masterClock - at, 0, animation.options.duration);
// = clamp(1940 - 1600, 0, 900) = 340  →  37.8% of the glide
```

**Consequence.** The scene whose entire stated purpose is "the dogfood of the engine's TEMPORAL orchestrator" (`useSequenceDemo.ts:20-21`) and whose headline gesture is billed as "The headline Sequence refinement" (`:316`) produces, on its first exercise, a **master playhead that reads 100 % while a lane sits frozen at 38 % of its rail** — and no reverse, scrub, or replay can ever finish it. The failure boundary is `max_i(at_i) > 1040`, i.e. **anything right of 65 % of the track** — and the axis ruler prints `1600` at the far tick (`SequenceAxis.vue:12` × `STAGGER_MAX`), actively inviting the gesture into the broken region. `reset()` happens to recover only because it restores exactly the delays whose span `_duration` was frozen at (`useSequenceDemo.ts:296-302`).

**Provenance in the target file.** `SequenceTarget.vue:239` (`End` → 1600), `:98`/`:105` (the handle whose drag reaches the right edge), `:220`/`:242` (both `reseatRow` call sites). The mutation lives one file over, but `SequenceTarget` is its **sole** trigger — no other file calls `reseatRow`.

**Falsifier.** Any of: (a) `duration` proves to be a getter derived from `entries` rather than the cached `_duration` at `sequence.ts:202-204`; (b) a public `Sequence` API exists to recompute or set the span (`remove`, `clear`, `invalidate`, a `duration` setter — grep of `sequence.ts` returns none); (c) `applySequenceAt` does NOT clamp local time to `animation.options.duration` (`transport.ts:35` shows it does); (d) `reseatRow`'s clamp ceiling is ≤ 1040 rather than `STAGGER_MAX`. Any one kills the claim.

**Note on root cause.** The engine has no legitimate re-positioning API at all — the demo's direct `entries` mutation is the *only* route available, and the class hands it out by exposing `entries` with a mutable `at`. That is an **engine gap** the demo surfaced; the fix belongs on both sides (`Sequence.reposition(anim, at)` or a derived `duration`), not only in the demo.

---

### L-2 · MAJOR — one drag seam, five press targets: the suppression refcount strands

**Claim.** `SequenceTarget` deliberately shares ONE `useDragScrub` instance across all five handles and latches the pressed index (`:199-201` comment, `:203-230`):

```ts
203: const activeRow = ref<number | null>(null);
209: const { onPointerDown: onRowScrubDown } = useDragScrub({ el: activeRowEl, … });
227: const onRowDown = (index: number, e: PointerEvent) => { activeRow.value = index; onRowScrubDown(e); };
```

`useDragScrub` tracks liveness with a per-instance **boolean**, not a count, while the select-suppression token it drives is a **module-global refcount**:

```ts
// useDragScrub.ts:106-124
const onPointerDown = (e) => { dragging.value = true; acquireSelectSuppression(); … };
// useDragScrub.ts:130-136
useEventListener(window, "pointerup", (e) => { if (!dragging.value) return; endGesture(e); });
// gestureSelectSuppression.ts:9-22
let activeGestureCount = 0;
export function acquireSelectSuppression() { activeGestureCount += 1; document.body.classList.add("is-dragging"); }
export function releaseSelectSuppression() { activeGestureCount = Math.max(0, activeGestureCount - 1); if (activeGestureCount === 0) document.body.classList.remove("is-dragging"); }
```

**Failure scenario.** Two fingers land on two different row handles (`.seq-handle` sets `touch-action: none`, `SequenceTarget.css:134`, and mobile compresses the five rows to a 1.5 rem pitch, `:249-258` — two-thumb contact on a timeline is ordinary). `onRowDown` runs twice → `dragging.value = true` twice (idempotent), `acquireSelectSuppression()` twice (**count = 2**). First `pointerup` → `endGesture` → `releaseSelectSuppression()` once (count = 1) and `dragging.value = false`. Second `pointerup` → `if (!dragging.value) return` → **the second release never happens**. `activeGestureCount` never returns to 0; `body.is-dragging` is never removed; and `design-idioms.css:292-298` then holds `user-select: none` on `html`, `body`, and `body *` for the remainder of the session. Every subsequent drag acquires and releases in balanced pairs around the stranded `1`, so it never self-heals.

Note the asymmetry that makes this SequenceTarget-specific: **two different** `useDragScrub` instances balance (a single `pointerup` runs both instances' `endGesture`, because neither filters on `pointerId`), so only a single instance bound to multiple press targets can strand the count. `SequenceTarget:209` is the only such wiring in the demo — every other consumer binds one `el`.

**Falsifier.** `useDragScrub` proves to track `pointerId` or a count rather than a boolean (`:104` shows `const dragging = ref(false)`); or `acquireSelectSuppression` proves idempotent per-instance (`gestureSelectSuppression.ts:11-13` shows an unconditional `+= 1`); or a second `pointerdown` on a live instance is blocked upstream (nothing in `onRowDown`/`onPointerDown` guards it). Any one kills the claim. *(Whether real-world two-finger contact occurs is a live-session question — the code path is not.)*

---

### L-3 · MAJOR — a per-frame full-subtree re-render, under a banner that denies it

**Claim.** The component's render function reads `demo.progress` (a plain `ref`, `useSequenceDemo.ts:171`) at two sites:

```
:21   :value="(demo.progress.value * 100).toFixed(0)"     (Metric)
:70   <SequencePlayhead :progress="demo.progress.value" />
```

so SequenceTarget's own render effect subscribes to it. `useSweepScene`'s frame writes `progress.value` on every rAF tick while playing (`useSequenceDemo.ts:179-193`), and every `pointermove` during a scrub does the same via `demo.scrub` (`:279-286`). Therefore **the entire template re-renders at animation cadence**, including the five-row `v-for` (`:76-119`) whose inputs (`demo.rows`, `ROW_TONES`, `STAGGER_MAX`) do not change per frame.

Per frame that costs: 5 keyed children diffed; 7 fresh inline style objects (`:63,79-83,98`); `Math.round` ×5 + two template-literal builds ×5; and **10 inline `:ref` arrows re-allocated and re-invoked** — Vue calls a function ref unconditionally on every patch, with no dirty check and no post-queue deferral:

```js
// node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:1814-1815
if (shared.isFunction(ref)) { callWithErrorHandling(ref, owner, 12, [value, refs]); }
```

(String/`Ref` refs take the `doSet` branch below and are queued; function refs do not. `cacheHandlers` covers `on*` props only, so the `(el) => setRowEl(…)` at `:90` and `(el) => setBallEl(…)` at `:115` are new closures each render regardless.)

**Why it is a defect and not merely a cost.** The family asserts the opposite in three places, and the assertion is load-bearing for the whole dogfood argument: *"The ENGINE paints the balls directly … there is no per-frame Vue work for the motion"* (`useSequenceDemo.ts:30-33`); *"Pure CSS over the engine's `progress` — no per-frame JS"* (`SequencePlayhead.vue:8`); *"no per-frame `left` layout"* (`SequenceTarget.css:111-113`). The *motion* claim survives — the balls really are engine-painted. The *component* does per-frame Vue work anyway, purely because the progress readout and the row storyboard share one render scope. The honest fix is colocation: let a leaf own the `progress` read (the `Metric` and `SequencePlayhead` are already children; only the `.value` unwrap in the **parent's** render creates the subscription), or hoist the rows into a sibling component that never reads progress.

**Falsifier.** `demo.progress` proves not to be read in this component's own render scope (it is, `:21`, `:70`); or `progress` proves not to be written per rAF (`useSweepScene` frame at `useSequenceDemo.ts:193` writes it via `syncFromSequence`); or Vue proves to skip a function ref whose identity is unchanged (`runtime-core.cjs.js:1814` is unconditional). A live render-trace showing SequenceTarget rendering only on row mutation during playback would kill it outright — **UNPROVEN-NEEDS-LIVE** for the *magnitude*; the *existence* of the per-frame render is static and proven.

---

### L-4 · MAJOR — no gate typechecks this file

**Claim.** `vue-tsc` appears **nowhere** in `keyframes.js` except as a transitive `peerDependencies` mention inside `package-lock.json:3733`. It is not in `devDependencies` (`package.json:88-129`), not in `node_modules/.bin`, not in any npm script, and not in `ci.yml` / `release.yml` / `deploy-pages.yml`.

```json
"check":     "tsc --noEmit && tsc --noEmit -p tsconfig.test.json",
"check:lib": "tsc --noEmit -p tsconfig.lib.json",
```

CI runs only `check:lib` (`ci.yml:42`, `release.yml:43`) — `-p tsconfig.lib.json`, which narrows to `src/` and never sees `demo/` at all. Even the unused `check` is bare `tsc`, which does not parse SFCs; `demo/env.d.ts:3` declares `*.vue` as an opaque module so the `.ts` files importing them compile without ever opening them.

**Consequence for this file.** Everything inside `<script setup>` and the whole template expression surface is untypechecked by any gate — including the two `el as HTMLElement | null` casts (`:90,115`), the `demo.childAnims[i]!` assertion under `noUncheckedIndexedAccess` (`:187`), the `inject(...)!` non-null (`:150`), the `Metric` prop shapes (`:18-24`), and the `ROW_TONES[row.index]` widening in L-9. The repo's own `LESSONS-LEARNED.md:494` mandates a typing probe for exactly this class of surface; the demo tier is outside it. Prior audits recorded the same gap (`docs/tranches/S/S.md:321`, `SPEC-v2.md:189,777`) — it has not moved.

**Falsifier.** A `vue-tsc` invocation anywhere in the repo's gate battery, or a `check` that includes `.vue` parsing. `grep -rn "vue-tsc" --exclude-dir=node_modules` returns only `package-lock.json` and prose in `docs/`.

*(Verified separately: the props this file passes all happen to be valid — `MetricSize` includes `"xl"`, `MetricValue` is `string | number | null | undefined`, `Clapperboard` is a real `@lucide/vue` 1.17.0 export. The defect is the absence of the check, not a live type error.)*

---

### L-5 · MAJOR — the reel egg and the row handles are concurrently live

**Claim.** `playReel` takes the balls for ~1.3 s, driving each child standalone off the master clock:

```ts
// useSequenceDemo.ts:364-392
if (isReeling.value) return;                     // guards re-entry into the REEL
if (isPlaying.value) pause(); sequence.pause();
isReeling.value = true;
… child.managed = false; child.setTimingFunction(reelOvershoot); void child.play().finally(…)
```

The guard covers only re-triggering the reel. **Nothing gates the row handles.** They remain focusable (`tabindex="0"`, `:104`), pointer-live (`:105`), and key-live (`:106`) throughout. `reseatRow` therefore runs mid-reel and calls `sequence.seek(...)` (`useSequenceDemo.ts:346`) → `applySequenceAt`, which iterates **every** entry unconditionally:

```ts
// transport.ts:34-37
for (const { animation, at } of entries) {
    const local = clamp(masterClock - at, 0, animation.options.duration);
    animation.interpFrames(local, true);        // no `managed` check
}
```

So the reel's own `RAFPlayback` and the master `seek` both write `--ball-p` / `opacity` / `scale` to the same five ball elements for the overlap. Worse, the reel's `finally` restores `child.managed = true` and re-seeks against whatever `at` the drag left behind (`:383-388`), and the settle counter (`settled`) is not reset on interruption.

Both entry points into the reel are in the target file: the Reel button (`:34`) and the hidden typed trigger (`:249`), which fires on `window` keydown and is *not* suppressed while a `role="slider"` handle holds focus (`useTypedTrigger.ts:16-23` skips only `INPUT`/`TEXTAREA`/`SELECT`/`contenteditable`) — so typing `reel` while mid-nudge is a live path.

**Falsifier.** `applySequenceAt` proves to skip unmanaged children (`transport.ts:34-37` shows no check); or the handles prove disabled/`pointer-events: none` while `demo.isReeling` is true (`SequenceTarget.css:120-170` sets no such rule, and `:96-107` binds no `:disabled`/`:class` on `isReeling`); or `reseatRow` proves to early-return on `isReeling` (`useSequenceDemo.ts:325-327` guards only index range and `isPlaying`). Any one kills it.

---

### L-6 · MINOR — two pixel geometries for one domain

**Claim.** The same scalar `row.at / STAGGER_MAX` is mapped to screen twice, differently.

The handle (`:98`) — a percentage of the track, centred by CSS:
```
:style="{ left: `calc(${(row.at / demo.STAGGER_MAX) * 100}%)` }"
/* SequenceTarget.css:120-132 */  width: 44px; margin-left: -22px;   → centre at p·W
```
The ball (`:81` → CSS) — a fraction of the *usable* rail, left-edge anchored:
```
/* SequenceTarget.css:194-199 */
transform: translateX(calc((var(--row-start,0) + var(--ball-p,0)*(1 - var(--row-start,0))) * (100cqw - var(--ball-size))));
/* --ball-size: 1.6rem = 25.6px */                   → centre at p·(W − 25.6) + 12.8
```
Difference = `(0.5 − p) · 25.6` px: **+12.8 px at `p = 0`, 0 at `p = 0.5`, −12.8 px at `p = 1`**. Both share the same container (`.seq-track` is `position: relative` *and* `container-type: inline-size`, `SequenceTarget.css:106-115` + `:91`), so the comparison is exact.

This contradicts the design contract stated in the file itself — *"each traveller RESTING at its at: start gate (C-SEQ-3, --row-start)"* (`:52-53`) and *"it RESTS at its start gate … the traveller rests ON its gate"* (`SequenceTarget.css:183,200`). At the shipped defaults the worst offender is row 0 (12.8 px right of its gate); after an `End` press it is 12.8 px left.

Also note the vestigial `calc()` at `:98` wrapping a single percentage — a no-op wrapper.

**Falsifier.** `--ball-size` proves to be 0, or the handle grip proves anchored to the ball's left edge rather than its own centre (`SequenceTarget.css:139-146` centres `::after` at `left: 50%` of the 44 px box), or the two elements prove to resolve against different containers. Any kills it. Whether ±12.8 px is *visible* is **UNPROVEN-NEEDS-LIVE** (SS-13); the arithmetic is not.

---

### L-7 · MINOR — `--stagger-max` is write-only

`:63` emits `'--stagger-max': demo.STAGGER_MAX` on `.seq-stage` every render. `grep -rn -- "--stagger-max"` across `demo/` and `node_modules/@mkbabb/glass-ui/dist/styles/` returns **exactly one hit — the write itself**. No `var(--stagger-max)` reader exists. Contrast its three siblings, all of which are genuinely consumed: `--scrub-dir` (`SequencePlayhead.vue:78`), `--row-index` (`SequenceTarget.css:226`), `--row-start` (`SequenceTarget.css:196`).

**Falsifier.** Any `var(--stagger-max)` in a stylesheet or a dynamically-injected style. None found.

### L-8 · MINOR — `.seq-root` is a dead class

`:2` carries `class="seq-root …"`. `grep -rn "seq-root"` across the whole repo excluding `node_modules`/`.git` returns two hits: this line, and `docs/tranches/S/audit/pass1/design/sequence.md:133` — a *proposal* ("safe-area padding on `.seq-root`") that was never implemented. No rule, no gate, no `domMarker` reader.

**Falsifier.** A `.seq-root` rule in any stylesheet, or a `proof:*` script grepping the literal. Neither exists (the gate scripts under `scripts/` return zero hits).

### L-9 · MINOR — untyped arity coupling to `ROW_COUNT`

`:143` imports `ROW_COUNT` from the composable; `:161-167` hardcodes exactly five `ROW_TONES`; `:171,179` allocate `Array(ROW_COUNT)`; `:185` iterates `ROW_COUNT` while the template iterates `demo.rows.value` (`:76`). Four expressions of one fact, none checked against another. With `noUncheckedIndexedAccess: true` (`tsconfig.json`), `ROW_TONES[row.index]` is `string | undefined`, and Vue's `CSSProperties` custom-property index signature admits `undefined` — so a sixth row would silently render with **no** `--ball-tone` and fall back to the master red (`SequenceTarget.css:8`), with no error at build or runtime. A fixed-length tuple type keyed to `ROW_COUNT` would make it a compile error — except that L-4 means nothing compiles this file anyway.

**Falsifier.** `ROW_TONES` proves declared as a length-checked tuple, or a runtime assert exists. `:161-167` shows a bare `as const` array; there is no assertion.

### L-10 · MINOR — the view writes the raw engine

`:192` — `demo.sequence.progress = demo.progress.value` — reaches past the composable's published seam. The composable already exposes `scrub()` (`useSequenceDemo.ts:279`) and `facility.channels[0].setProgress` (`:427-431`), both of which do the identical write **and** re-sync the mirror; the raw write does neither. The exposure of `sequence` itself (`:461`) is what makes the shortcut possible.

**Do not simply delete it.** The line is load-bearing: it is the only thing that paints `--ball-p` onto the ball targets attached three lines earlier (`:185-188`), because `setTargets` (`animation.ts:465-472`) binds but does not paint. The correct repair is a composable-side verb (`demo.repaint()` / route through `scrub`), not removal.

**Falsifier.** `sequence.progress = p` proves to early-return when `p` is unchanged (`sequence.ts:221-223` shows an unconditional `seek`), which would make the line inert rather than load-bearing.

### L-11 · MINOR — `managed` toggled to defeat the engine's guard rail

`useSequenceDemo.ts:376-381` sets `child.managed = false` before `child.play()` and restores it in `finally`. The flag exists precisely to make that call illegal:

```ts
// src/animation/engine/play-lifecycle.ts:364-366
if (anim.managed) { warn("Animation.play() called on a managed animation — the AnimationGroup owns the rAF loop. Call group.play() instead."); }
```

Both entry points are in the target file (`:34`, `:249`). The intent is defensible — the `Sequence` is paused for the reel's duration, so no owner is actually contending. But the mechanism is *suppressing a warning by mutating an ownership flag*, and it is exactly the state that L-5's interleaving corrupts. A first-class engine idiom (a detach/reattach verb, or driving the overshoot through the `Sequence` itself with a swapped timing function) would express the same intent without touching an ownership bit.

**Falsifier.** `managed` proves to be a documented public opt-out rather than an ownership marker — `animation.ts:82` calls it "a real field (ownership)" and `playback-state.ts:30` deliberately excludes it from the snapshot; the guard at `play-lifecycle.ts:364` treats it as an error condition.

### L-12 · INFO — the 24 px handle that is 44 px

Three comments assert a 24 px handle: `:113` ("dropping the 24px handle to 16.8px"), `:178` ("the 24px handle holds"), `SequenceTarget.css:119` ("The ELEMENT is the 24×24px tap target lighthouse measures"). The shipped rule, nine lines later, is `width: 44px; margin-left: -22px` (`SequenceTarget.css:128,132`) — deliberately widened by S.G3 S4, whose own comment sits at `:123-127` directly above the contradicted line. The provenance trail now argues both sizes in one file.

**Falsifier.** A second `.seq-handle` rule restoring 24 px later in the cascade — `SequenceTarget.css:249-258` (the only later block) touches `.seq-storyboard`/`.seq-rows`/`.seq-track`, not the handle.

### L-13 · INFO — `btn-interactive` is inert

`:31` applies `btn-interactive`. The class has **no definition anywhere on disk**: not in `demo/styles/*.css` (no rule, no `@utility` — the file defines `icon-xs…lg` and `ppmycota-stroke` that way at `design-idioms.css:96-122`, so the mechanism exists and was not used here), not in `glass-ui.css`, not in any of the 20 files under `glass-ui/dist/styles/`. Six-plus call sites across the demo carry it (`CubeScene.vue:188,193`, `SpringScene.vue:167`, `SpringPhysicsFacet.vue:74,105`, `RibbonBar.vue:135`, …), so this is a demo-wide phantom rather than a SequenceTarget error — recorded here because it is one of this component's classes. Sibling classes all resolve cleanly: `text-mono-caption` → `glass-ui/dist/styles/typography/utilities.css`; `text-admin-label`, `text-display` → `typography/semantic.css` + `theme/bridges.css`; `status-badge`/`reverse-badge`/`tracking-badge`/`settled-badge`/`readout-accent`/`progress-rail`/`progress-ball`/`stage-field-x` → `demo/styles/`; `reel-active` → `SequenceTarget.css:173`.

**Falsifier.** Any `.btn-interactive` rule, `@utility btn-interactive`, or a Tailwind theme variable that would generate it. None found in any `.css` on disk.

### L-14 · INFO — split vendor specifiers on a phantom dependency

`:136` pulls `Button, Card` from the glass-ui **root barrel**; `:138` pulls `Metric` from the `/metric` **subpath**, two lines apart. glass-ui 7.0.0 publishes 70 subpaths including `./button` and `./card`, and the demo's own census is 31 root-barrel imports vs 42 subpath imports — this file is a microcosm of an unsettled convention. Under the rolldown demo build the root barrel is the wider entry graph.

More materially, this folds census **F-1** (`lane-frontend.md` §0): `@mkbabb/glass-ui` is absent from `package.json` **and** `package-lock.json`, yet 7.0.0 is installed. `vite.config.ts` carries no alias for it either, so it resolves purely from the stale `node_modules`. After `npm ci`, `SequenceTarget.vue:136` and `:138` are among the first imports to fail — the sequence scene does not build. I **confirm F-1 against the tree** (`package.json` dependencies = `{"@mkbabb/value.js": "4.0.0"}` only) and add that this component consumes it via **two distinct specifiers**, so a declaration fix must cover both the root and the `./metric` subpath.

*(The other two third-party specifiers are clean: `@lucide/vue` ^1.17.0 is a declared devDependency and does export `Clapperboard` (`lucide-vue.d.ts:5249`); `@mkbabb/value.js` 4.0.0 is a declared runtime dependency and does publish `./math` with `clamp(value, min, max)`.)*

---

## 2. Cross-axis referrals (not counted here)

- The row slider's keyboard posture is thinner than its drag: no `PageUp`/`PageDown`, no shift-step, no `aria-orientation`, and `aria-valuetext` absent so a screen reader announces a bare millisecond count (`:99-106,233-243`). → **A11y axis.**
- The `role="slider"` handle at `:99` and the `role="slider"` scrub rail at `SequenceScrubber.vue:22` are siblings in one card with no grouping label. → **A11y axis.**
- Census **S-4** (`lane-frontend.md`: `SequenceScrubber` → glass-ui `ScrubberTimeline`/`Slider`, 162 lines) applies to the sibling, not this file; but the same argument extends to the five row handles here — five hand-rolled `role="slider"` divs against a shipped `Slider` primitive. → **Design / consolidation axis.**

---

## 3. Superlatives (L-18, the other direction)

### S-1 · `useTypedTrigger` — the textbook composable extraction
31 lines (`useTypedTrigger.ts`), one job, correct on every axis this challenge measures. It replaced an inline ring-buffer egg inside SequenceTarget (`:5` provenance) with: a closed-over `let buffer` (no module state, so two callers cannot cross-talk); `useEventListener` for the window binding, so teardown is scope-bound and there is no `onUnmounted` to forget; an editable-target skip (`:16-23`) so it never steals a keystroke; and an `e.key.length !== 1` filter that keeps modifiers out of the buffer. `slice(-code.length)` makes the buffer self-bounding — it cannot grow. It returns `void` and exposes no state, which is exactly right for a fire-and-forget trigger. **Falsifier:** a module-level `buffer`, a manual `addEventListener`, or an unbounded buffer would kill it — `:14,15,25` show none.

### S-2 · A nil teardown surface in the component itself
SequenceTarget registers **zero** listeners, timers, rAFs, observers, or subscriptions of its own. Its only two long-lived seams both ride scope-bound composables (`useTypedTrigger` at `:249`, `useDragScrub` at `:209`, both on `useEventListener`), its refs are plain arrays cleared by Vue's own unmount `setRef(null)` path, and `setTargets` **replaces** rather than appends (`animation.ts:466`), so a remount cannot accumulate. It correctly has no `onUnmounted` because it correctly has nothing to undo — the composable owns the engine stop (`useSequenceDemo.ts:447-450`, `onScopeDispose`). Verified against the host: `SequenceScene.vue:3` renders it unconditionally and the app uses a keyed `<Suspense>` with **no** `<KeepAlive>` (`App.vue:75`), so component and composable die together. **Falsifier:** any `addEventListener`/`setInterval`/`requestAnimationFrame`/`new *Observer` in `:132-250` — there are none; or a `<KeepAlive>` host that would strand state across deactivation — `grep` finds none.

### S-3 · The `@property` + `cqw` engine-consumption idiom — genuinely SOTA
This is the correct way to consume a CSS-variable-writing animation engine, and it is worth copying:
- `@property --ball-p { syntax: "<number>"; inherits: true; initial-value: 0 }` (`SequenceTarget.css:14-18`) — **registering** the custom property so the browser can interpolate the engine's discrete per-frame writes, and so the `box-shadow` bloom at `:205-208` and `color-mix` at `:208` are legal typed operands rather than string substitution.
- The engine writes **one** custom property per target per frame; every visual consequence (rail position, glow radius, spread, tint) is derived in CSS from that single scalar (`:194-208`).
- Position rides `translateX(<cqw>)` against `container-type: inline-size` on the track (`:106-115,189-199`) — compositor-only, **zero layout per frame**, and rail-relative without JS measuring anything. The playhead (`SequencePlayhead.vue:32-51`) and the scrub ball (`SequenceScrubber.vue:118-122,155-161`) apply the identical idiom.

Result: the motion path really does contain no Vue and no layout — the claim at `useSequenceDemo.ts:30-33` is true *of the motion*, and L-3 is a separate failure of the readout's render scope, not of this idiom. **Falsifier:** a `left`/`top` write in the per-frame path, an unregistered `--ball-p`, or a JS `getBoundingClientRect` in the paint loop. None present.

### S-4 · The J.WZ target relocation — a bug correctly diagnosed at the seam
`:108-117` and `SequenceTarget.css:178-186` document a real prior defect and its correct fix: the child animation's keyframes include `scale: 0.7 → 1.12 → 1` (`useSequenceDemo.ts:134-136`), and while the **track** was the engine target that scale shrank the whole row — dragging the 24 px handle to 16.8 px and breaking the target-size floor. The fix was not to weaken the keyframe or add a compensating transform, but to move the engine's target to the **ball** (`:115`), leaving the track and its handle outside the animated subtree. That is diagnosis at the right layer: an animation that must not affect layout was pointed at a leaf that owns no layout. The rationale is recorded at the call site where the next reader will hit it. **Falsifier:** `scale` proves absent from the child keyframes (`useSequenceDemo.ts:134-136` shows `0.7`/`1.12`/`1`), or `setTargets` proves still pointed at `rowEls` (`:187` reads `ballEls[i]`).

---

## 4. Killed hypotheses (hunted, then falsified — do not re-spend)

| hypothesis | why it died |
|---|---|
| Vue calls the *old* inline `:ref` with `null` before setting the new one, so `rowEls[i]` is transiently null mid-flush and `project` could read null during a drag. | `runtime-core.cjs.js:1799-1813` unsets only **string** and **`Ref`** old-refs; function old-refs are never called with `null`. `:1814` then calls the new function ref with the element, synchronously. No null window exists. |
| `activeRowEl` is a `computed` reading the non-reactive `rowEls` array, so it caches a stale element. | It depends on `activeRow` (a real ref) and `activeRow` changes on exactly the event that must invalidate it (`:227-229`), *before* `onRowScrubDown` reads `el.value`. Correct by construction, if fragile. |
| `onMounted` sets engine targets that outlive the component → detached-node leak. | `SequenceScene.vue:3` renders the target unconditionally in the same scope that owns the composable; no `<KeepAlive>` (`App.vue:75`); `onScopeDispose` stops the sequence (`useSequenceDemo.ts:447-450`); `setTargets` replaces (`animation.ts:466`). Component and engine die together. |
| `text-mono-caption` / `text-admin-label` / `text-display` are phantom classes. | All three resolve inside `@mkbabb/glass-ui/dist/styles/{typography/utilities.css, typography/semantic.css, theme/bridges.css}`. Only `btn-interactive` (L-13) and `.seq-root` (L-8) are genuinely undefined. |
| `Metric` is passed a wrong prop shape (`:value` receives a `string` from `.toFixed(0)`). | `MetricValue = string \| number \| null \| undefined`; `MetricSize` includes `"xl"` (`components/metric/types.d.ts:2-3,6-19`). Valid — though L-4 means nothing checks it. |
| The `reel` typed trigger fires while a row handle has focus and steals its keystrokes. | The handle only consumes arrows / `Home` / `End` (`:236-239`); `r`,`e`,`l` are untouched, and `useTypedTrigger` calls no `preventDefault`. No conflict. |
| `useTypedTrigger` leaks its window listener across scene swaps. | `useEventListener` (`useTypedTrigger.ts:15`) binds to the caller's effect scope; the scene host has no `<KeepAlive>`, so unmount disposes it. |
| Scoped styles in `SequenceTarget.css` cannot reach `.seq-axis` / `.seq-target` / `.reel-active` because those live on child-component roots. | Vue applies the parent's scope id to a child component's **root** node; `SequenceAxis`'s root is `.seq-axis` (`SequenceAxis.vue:6`), `Card`'s root carries `.seq-target`, `Button`'s root carries `.reel-active`. All three resolve. |
| `reset()` leaves the corrupted duration behind (an L-1 aggravator). | `reset` restores exactly `DEFAULT_DELAYS` (`useSequenceDemo.ts:296-302`), whose span is the frozen `_duration = 1940`. Reset is the one path that *does* recover — by coincidence, not design. |

---

## 5. Provenance

Every file:line above was read in this session from the working tree at `/Users/mkbabb/Programming/keyframes.js` (read-only; no product source in any repo was modified). Third-party line numbers refer to the installed `node_modules` trees (`@vue/runtime-core`, `@mkbabb/glass-ui` 7.0.0, `@mkbabb/value.js` 4.0.0, `@lucide/vue` 1.17.0). Census ids folded: **F-1** (confirmed, extended with the two-specifier detail), **S-4** (referred to the Design axis, sibling file). No census finding was contradicted.
