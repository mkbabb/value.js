claude-opus-5[1m]

# CHALLENGE · `PlaybackRibbon.vue` · axis L (LIBRARY)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/playback/PlaybackRibbon.vue` (244 lines)
**Mode** static, read-only. No installs, no dev server, no browser tooling. Every behavioural claim that
cannot be closed from the tree alone is marked `UNPROVEN-NEEDS-LIVE` for the SS-13 visual audit.
**Prior** kf census lanes at `/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/formation/keyframes/`
(`lane-frontend.md` S-1..S-8 + F-1; `lane-library.md`). Also folded: keyframes.js's own
`docs/tranches/T/audit/lanes/27-ledger-sweep.md` and `28-prompt-recap.md` (read-only evidence).

**Posture** the component was assumed DEFECTIVE until the tree proved otherwise. It is not clean.
The reversal arithmetic and the seam discipline are genuinely excellent (§3). The *cache* around
them, the *skin* under them, and three of the four long rationale comments are not.

---

## 0. Headline

| id | severity | claim |
|---|---|---|
| **L-B1** | **BLOCKER** | `effectiveDuration` caches a **non-reactive** engine field. `animation.setDuration()` — driven from the very panel that mounts this ribbon — mutates `options.duration` in place, the computed never invalidates, and the scrub rail's `:max` diverges from `scrubTo`'s *fresh* read of the same field → out-of-range `sliderUpdate` seeks when `reversed`. |
| **L-M1** | MAJOR | **Double touch gate.** glass-ui **7.0.0**'s `<Slider>` already owns a `useTouchGate` on its own root. The ribbon wraps a *second, independent* instance around it. The in-file comment asserts the opposite as fact. Closes lane-27 rec-2's open conditional. |
| **L-M2** | MAJOR | The entire `source` (progress-scalar) branch is **dead** — 0 of 3 mount sites bind it — and its "at least one is required" invariant is unenforceable by the declared prop type. |
| **L-M3** | MAJOR | `--slider-thumb-bg` (set twice, incl. the whole `:hover` rule) is **inert** under glass-ui 7.0.0's standard variant. The comment's "track + thumb paint the SAME violet" is false. The rationale is measured against glass-ui **4.0.0** — the census F-1 phantom-dep biting exactly here. |
| **L-M4** | MAJOR | `scrubStart`/`scrubEnd` are **unbalanced**: a fling interrupted by a re-grab drops the pending `dragEnd`, so the scene's `wasPlayingBeforeScrub` latch silently loses the resume. |
| **L-M5** | MAJOR | The `<AnimationVisualizer>` twin is **frozen for the whole duration of every slider scrub** — its rAF guard is `isPlaying \|\| isDragging`, both false. The ribbon's wake goes *up* to the parent and never *down* to the child. |
| L-m1..m9 | MINOR | 3 phantom/dead CSS classes, 2 false comment blocks, 2 `any` leaks, a CSS-only "disabled", a duplicated + asymmetrically-guarded duration read. |
| L-i1..i3 | INFO | no accessible name (cross-axis), `scrubbed` honoured by 1 of 3 consumers, comment:code ratio ≈ 3:2. |
| **L-S1..S4** | **SUPERLATIVE** | the pointerType-scoped gate bypass; the engine-inverse reversal math; zero-teardown-code drag seam reuse; the visualizer's flagship engine dogfooding. |

**Contradiction of the hitherto corpus (stated explicitly, per law):** `lane-frontend.md:228` grades
`playback/PlaybackRibbon.vue` **G** (green) in the component table. The tree does not support a green
grade — see L-B1, L-M1, L-M3. The census's own `F-1` is the *cause* of L-M3, and its `S-4` note
(`lane-frontend.md:352`) cites `PlaybackRibbon.vue:92` as an example of correct `Slider` consumption
without noticing that the wrapper around that `Slider` re-implements a primitive the primitive ships.

---

## 1. Consumption map (established first — every claim below rests on it)

Three mount sites, all `grep -rn "PlaybackRibbon" demo/`-confirmed:

| consumer | binding |
|---|---|
| `demo/components/instrument/transport/channel-controls/ChannelOptions.vue:378-401` | `:animation`, `:current-t`, `:is-anim-playing`, `:is-anim-started`, `:user-reversed`; listens `scrub-start/end`, `scrubbed`, `slider-update`, `toggle-play`, `toggle-reverse` |
| `demo/scenes/easing/EasingScene.vue:96-109` | `animation: demo.previewAnim`, `isAnimStarted: true`; **no** `onScrubbed` |
| `demo/scenes/spring/SpringScene.vue:109-129` | `animation: demo.springEditAnim`, `isAnimStarted: true`; **no** `onScrubbed` |

`source` is bound by **none** of them (`grep -rn "source:" demo/scenes demo/components/instrument/transport` → 0 hits).

`currentT` is *effective* time at every site — `useAnimationSync.ts:33` seeds `ref(getAnimation().effectiveT)`;
the scenes compute `progress * options.duration`. This matches `scrubTo`'s parameter name and its inverse
(§3, L-S2). No defect here — I checked for the obvious raw/effective mismatch and it is **absent**.

---

## 2. Defects

### L-B1 — BLOCKER · the cached duration goes stale on a live `setDuration`, and disagrees with the uncached read one function away

`PlaybackRibbon.vue:119-121`

```ts
const effectiveDuration = computed(
    () => animation?.options.duration ?? source?.duration ?? 1,
);
```

`animation` is a **reactive-props-destructure** binding (`:98`, Vue 3.5.35 — confirmed
`node -p "require('./node_modules/vue/package.json').version"` → `3.5.35`), so the computed tracks
`props.animation` — the *identity* of the object. Vue's props object is `shallowReactive`; the
`KeyframesAnimation` instance it holds is a plain class instance, never `reactive()`-wrapped anywhere
in the demo (`grep -rn "reactive(" demo | grep -i anim` → 0 hits). `.options.duration` is therefore
**untracked**.

The engine mutates it in place:

```
src/animation/engine/option-setters.ts:55   const ratio = d / anim.options.duration;
src/animation/engine/option-setters.ts:61   anim.options.duration = d;
```

And the mutation is driven from the *same component that Teleports this ribbon*:

```
demo/components/instrument/transport/channel-controls/ChannelOptions.vue:36-38
    trySetOption(() => animation.setDuration(v));
```

Object identity does not change. Nothing tracked is dirtied. `effectiveDuration` is **never
recomputed** until the channel changes or the ribbon unmounts. Consequences, in order of severity:

1. `:max="effectiveDuration"` (`:15`) holds the OLD duration while `currentT` (polled from
   `effectiveT`, `useAnimationSync.ts:33`) now tops out at the NEW one. Edit 5s → 2s and the thumb
   can never travel past 40 % of a rail it still owns.
2. **The value corruption.** `scrubTo` reads the field **fresh**, uncached, one function below:

   ```ts
   :183-185   const rawT = animation.reversed
                   ? animation.options.duration - effectiveT
                   : effectiveT;
   ```

   So the rail's scale (stale 5000) and the reversal pivot (fresh 2000) **disagree**. With
   `reversed === true` and the thumb dragged to the rail end, `effectiveT = 5000` and
   `rawT = 2000 - 5000 = -3000` — a negative seek emitted through `sliderUpdate` into the
   group/channel seam. The forward case is merely wrong (a 5000 ms seek on a 2000 ms clock); the
   reversed case is *signed* wrong.

Note the mechanism is *created by the cache*: had `scrubTo` used `effectiveDuration.value` (or had
the computed not existed), the two reads would at least agree with each other. The duplication
(L-m9) is what turns a staleness bug into a divergence bug.

**Falsifier.** Any one of these kills the claim: (a) `KeyframesAnimation` instances reach this prop
through a `reactive()`/deep-reactive wrapper — grep says no; (b) `setDuration` returns/installs a
*new* animation object — `option-setters.ts:61` is an in-place assignment, so no; (c) the ribbon
remounts on a duration edit — it sits under `<Teleport v-if="active">` (`ChannelOptions.vue:377`)
and `active` is orthogonal to duration; (d) `props.animation` is re-assigned on every parent render
with a fresh object — the scenes pass a stable `demo.previewAnim` / `demo.springEditAnim`.
(e) `LabeledInput`'s `@update:model-value` never fires — it is the panel's live duration field.

**Cheapest honest cure** (not applied; audit is read-only): delete the computed's cache — make
`effectiveDuration` a plain function, or track the engine clock the same way `currentT` already is.
The *architectural* cure is that the engine should expose a reactive duration channel; the demo
should not be reaching into `anim.options` from a `computed` at all.

---

### L-M1 — MAJOR · the touch gate is implemented twice; the comment that justifies the second one is false against the installed glass-ui

`PlaybackRibbon.vue:134` `const gate = useTouchGate();` plus `:5-18` (wrapper `@pointerdown.capture` /
`@touchmove` / `@touchend`) and `:167-179` (`gatedSliderDown`).

The rationale, verbatim, `:165-166`:

> …the tap-to-activate gate (**which glass-ui's Slider does NOT provide** — it sets
> touch-action:none, hijacking scroll — so the wrapper stays, correctly scoped to touch).

That is **false against the installed artifact**. glass-ui **7.0.0**'s Slider builds its own gate and
binds it natively to the slider root:

```
node_modules/@mkbabb/glass-ui/dist/slider-DDia69Fy.js
    let V = t();                                    // t = useTouchGate
    function H(e){ let t=z(), n=e.touches[0];
        !t || !n || V.handleTouchStart(t, n.clientY) || (e.preventDefault(), e.stopPropagation()); }
    function U(e){ V.handleScrollCheck(e); }
    function W(){ V.handleTouchEnd(); }
    g(() => { let e=z(); e && (e.addEventListener("touchstart", H, {passive:!1}),
        e.addEventListener("touchmove", U, {passive:!0}),
        e.addEventListener("touchend", W, {passive:!0})); });
```

That is the *identical* shape as `gatedSliderDown` — same composable, same first-tap-activates
contract, same `preventDefault()+stopPropagation()` rejection — one DOM level lower, and with proper
`onUnmounted` removal (`h(() => …removeEventListener…)`).

`useTouchGate` is **per-instance, not shared**:
`dist/composables/dom/useTouchGate.d.ts:12` — *"Per-control tap-to-activate guard for mobile touch
controls."* `useTouchGate(deactivateDelayMs?)` returns a fresh `TouchGateReturn` with its own
`isActive: Ref<boolean>`. So the ribbon and the Slider hold **two independent gate state machines
arbitrating one gesture**, each with its own activation, its own deactivate timer, and its own
`isActive` — which the ribbon then paints (`:8`) while the Slider paints its own via
`data-touch-active` (`slider-DDia69Fy.js`, `"data-touch-active": K.value || void 0`). Two sources of
truth for one visual state.

**Statically PROVEN:** the duplication, the false premise, the two independent `isActive` refs, the
two deactivate timers, and ~25 lines of ribbon plumbing that the consumed primitive now ships.
**UNPROVEN-NEEDS-LIVE:** the *user-visible* consequence. My best static reading is that both gates
activate in parallel on the same first tap (pointerdown and touchstart are separate streams;
`preventDefault()` on pointerdown does not suppress the native touchstart listener), so the common
path is probably benign — but the two deactivate timers can desync under a scroll-check that one
gate sees and the other does not, and that is exactly the class of bug the SS-13 pass should probe
on a real touch device.

**Fold.** `docs/tranches/T/audit/lanes/27-ledger-sweep.md:421` already scheduled this *conditionally*:
> "…and **delete the bespoke touch-gate wrapper around this one widget if glass-ui's own `<Slider>`
> already handles touch-vs-drag disambiguation internally** (duplicated gating is itself a DRY defect
> independent of whether it's the root cause)."

**The condition is now met.** `28-prompt-recap.md:43` logs the same item as **LEAKED** under
VERDICT #18 ("why aren't these just glass-ui components?"). This challenge discharges the
conditional with the tree: it does, so delete it. And `lane-frontend.md`'s shadow census
(S-1..S-8) should gain an **S-9**: *`gatedSliderDown` + wrapper gate → glass-ui `Slider`'s built-in
touch gate* — the census enumerated component-level shadows and missed this composable-level one.

**Falsifier.** (a) a glass-ui build flag / prop that disables the internal gate and which the demo is
implicitly relying on — `SliderProps` (`dist/components/slider/types.d.ts`) exposes
`variant/size/marks/invalid/keepDockOpen/motion` and nothing gate-related; (b) the ribbon's gate is
needed for the *wrapper region outside* the slider box — the wrapper is `<div>` + `<Slider class="p-2">`,
i.e. the slider fills it; (c) the installed 7.0.0 is not what ships — which is precisely census F-1's
point, and makes the situation worse, not better.

---

### L-M2 — MAJOR · the whole `source` branch is dead code, and its stated invariant is untypeable as written

`:98-115`

```ts
const { animation, source } = defineProps<{
    // …At least one is required.
    animation?: KeyframesAnimation<any>;
    source?: { progress(): number; setProgress(t: number): void; duration?: number };
    …
}>();
```

Both optional. "At least one is required" is a **comment, not a type** — the compiler accepts a mount
with neither, in which case `effectiveDuration` silently resolves `1` (`:120`) and `scrubTo`
(`:181-200`) falls through both branches and emits only `scrubbed`: a scrub rail that renders,
accepts gestures, and seats nothing. Silent no-op is the wrong error posture for a transport control.

And no consumer supplies `source` at all (§1). So dead, today, in the tree: the `source` prop type
(`:105-110`), the `?? source?.duration` limb (`:120`), and the entire `else if (source)` branch
(`:195-199`). The prose dates it — "T.B1-β **STAGE 1**" (`:99`) — groundwork for a light-channel path
that never landed. `transportSource.ts:24-33` declares the real `TransportChannel` interface with
`name` + `animation?` + `progress()` + `setProgress()`; the ribbon re-declares an anonymous,
*structurally different* subset inline (adds `duration?`, drops `name`) rather than importing it —
so even the dead code has drifted from its own contract file.

Sharper still: `progress(): number` is **required** by the ribbon's inline type and **never called**
anywhere in the file. The contract demands a method the component does not use.

**Falsifier.** A fourth mount site binding `source` (`grep -rn "PlaybackRibbon" demo/` → 3 importers,
enumerated in §1); or a planned wave in the kf tranche docs that this is staged for — in which case
the finding downgrades to "unlanded stage-1 scaffold", but the untyped either-or invariant and the
uncalled `progress()` stand regardless. Standing law `feedback_no_backwards_compat` /
`feedback_kiss_no_contrivance` both cut against keeping it.

---

### L-M3 — MAJOR · `--slider-thumb-bg` is inert under glass-ui 7.0.0; the style comment describes a 4.0.0 that is neither declared nor installed

`:230-243`

```css
.timeline-green            { …  --slider-thumb-bg: var(--color-progress); }        /* :233 */
.timeline-green:hover      {    --slider-thumb-bg: color-mix(… 80% …); }           /* :241-243 */
```

Extracted from `node_modules/@mkbabb/glass-ui/dist/glass-ui.css`, the **only** consumer of
`--slider-thumb-bg` in the entire package:

```css
.glass-slider[data-variant=spectrum] .slider-thumb[data-v-1ba39eb5]{
    width:calc(var(--slider-thumb-size,1rem) * .75);opacity:1;
    background:var(--slider-thumb-bg,transparent); … }
```

`spectrum` only. The ribbon's Slider is `standard` (`Slider` default is
`variant:{default:"standard"}` — `dist/slider-DDia69Fy.js`; the ribbon passes no `variant`, and its
own `:deep` selector at `:238` targets `[data-variant="standard"]`). And under `standard` the thumb
is *not painted at all*:

```css
.slider-thumb[data-v-1ba39eb5]{ width:0; height:var(--slider-track-height,.375rem);
    opacity:0; box-shadow:none; background:0 0; border:none; display:block }
```

`width:0; opacity:0; background:0 0`. Therefore:

* `:233` is **dead**;
* `:241-243` — the *entire* `:hover` rule, its only declaration — is **dead**;
* the comment's central design claim, `:213-215` "so the track + **thumb** paint the SAME violet the
  AnimationVisualizer's ball/dashed-twin draws — ONE motion-color identity", is **false**. Under
  7.0.0 the standard slider's motion colour comes from the *range fill* only, and the ribbon sets
  that (`--slider-range-bg`, `:232`) to a **neutral** `--color-slider-track` blend
  (`style.css:164` → `color-mix(in srgb, var(--foreground) 35%, var(--border))`), not the violet.

The two limbs that **do** land, verified, so the challenge is not overbroad:
`--slider-track-bg` (`:231`) → `.slider-track{background:var(--slider-track-bg,var(--muted-medium))}` ✓ (inherits);
`--slider-range-bg` (`:232`) → `.slider-range{--liquid-fill-tint:var(--slider-range-bg,…)}` ✓;
the `:238-240` track-height cure ✓ — specificity `(0,4,0)` for
`.timeline-green[data-v-x] .glass-slider[data-variant="standard"]` beats `(0,3,0)` for
`.glass-slider[data-size=md][data-v-1ba39eb5]`, and 7.0.0 still declares
`--slider-track-height:1.25rem` on `[data-size=md]` exactly as the comment says. **The cure works.**

**This is the census F-1 phantom dependency biting a specific line of product CSS.** The comment
(`:219`) reasons from *"glass-ui **4.0.0**'s Slider"*. The installed artifact is **7.0.0**
(`lane-frontend.md` §2). glass-ui appears in neither `package.json` nor `package-lock.json`
(`grep -c "glass-ui" package-lock.json` → 0). So this component's most load-bearing CSS rationale is
pinned to a version with **no floor, no ceiling, and no lock** — the one place in this file where
F-1 is not an abstract reproducibility risk but a concrete wrong assertion about the cascade. Any
wave that touches this style block must land F-1 first, exactly as `lane-frontend.md:612` orders.

**Falsifier.** A demo-side or glass-ui-side rule (in `@layer` or otherwise) that gives the *standard*
`.slider-thumb` non-zero width/opacity and reads `--slider-thumb-bg` — I dumped every rule in
`glass-ui.css` whose selector contains `slider` (36 rules) and every demo CSS file; there is none.
Or: the demo passes `variant="spectrum"` — it does not, and its own `:deep` selector proves the
author's intent was `standard`.

---

### L-M4 — MAJOR · `scrubStart` / `scrubEnd` are not balanced; an interrupted fling silently strands playback

The ribbon relays the visualizer's drag lifecycle 1:1 (`:76-77`):

```html
@drag-start="emit('scrubStart')"
@drag-end="emit('scrubEnd')"
```

but `dragEnd` is **not** emitted at drag end. `AnimationVisualizer.vue:219-226` ends a drag by calling
`startCoast()`, which either emits `dragEnd` immediately (no fling, `:174-177`) or defers it into the
spring's settle callback (`:185-190`):

```ts
coastPlayback.drive(coastSpring, () => { … if (coastSpring.settled) emit("dragEnd"); });
```

A new grab **cancels** the coast before it settles (`:206` `coastPlayback.stop()`), and
`RAFPlayback.stop()` does *not* invoke `onFrame` a final time — it bumps `_gen`, cancels the rAF,
cleans up (`src/animation/physics/playback.ts:236-242`). The pending `dragEnd` is **dropped**.

Emitted sequence for *fling → re-grab mid-coast → release*:
`scrubStart`, `scrubStart`, `scrubEnd` — two starts, one end.

The consumers depend on the pairing being balanced. `EasingScene.vue:85-92` (identically
`SpringScene.vue:99-106`):

```ts
const onScrubStart = () => { wasPlayingBeforeScrub = demo.isPlaying.value;
                             if (wasPlayingBeforeScrub) demo.pause(); };
const onScrubEnd   = () => { if (wasPlayingBeforeScrub) demo.play();
                             wasPlayingBeforeScrub = false; };
```

The second `scrubStart` overwrites the latch with `false` (playback was paused by the first). The
lone `scrubEnd` then declines to resume. **A user who was playing, flings the visualizer ball, grabs
it again before it settles, and lets go, ends up paused with no indication why.**

Contract-level reading: the ribbon is the component that publishes `scrubStart`/`scrubEnd` to its
consumers, so the balance guarantee is *its* contract even though the drop happens in the child. It
neither guards it nor documents it.

**Falsifier.** (a) `RAFPlayback.stop()` flushes a final `onFrame` — `playback.ts:236-242` shows it
does not; (b) `useDragCapture.onStart` fires only after a previous `onEnd` — `useDragCapture.ts:52-67`
has no such interlock, `onPointerDown` is unconditional past `e.button !== 0`; (c) the scenes
tolerate imbalance — the latch above shows they do not; (d) a fling cannot be interrupted before
settling — `coastSpring` is `response:0.45, dampingFraction:1` (`AnimationVisualizer.vue:144-148`),
i.e. several hundred ms of interruptible coast. The *visual* end state is
`UNPROVEN-NEEDS-LIVE`; the emit sequence is statically proven.

---

### L-M5 — MAJOR · the visualizer twin is frozen for the entire duration of every slider scrub

`AnimationVisualizer.vue:241-250`

```ts
useRafLoop(() => { … setBallProgress(progress); },
    { guard: computed(() => props.isPlaying || isDragging.value) });
```

`isDragging` is the visualizer's **own** `useDragCapture` instance (`:195`), false during a
*ribbon-slider* scrub (that is a different `useDragCapture`, `PlaybackRibbon.vue:148`). And
`props.isPlaying` ← `:is-playing="isAnimPlaying"` (`PlaybackRibbon.vue:75`) is false too, because the
scenes pause on `scrubStart` (`EasingScene.vue:86-87`). `useDemoTicker` honours the guard per
subscriber — `if (entry.enabled()) entry.tick(time)` (`useDemoTicker.ts:20`) — so the tick is
**skipped**, not merely deprioritised.

Result: during a slider drag the ball does not move; on release the scene resumes and the ball
**jumps** to the new position. The ribbon's own wake mechanism does not help — `emit("scrubbed")`
(`:203`) is documented "Re-arm any idled sync loop" and goes **up** to the parent
(`ChannelOptions.vue:392` `@scrubbed="wake"`); nothing is propagated **down** to the child, whose
guard is the thing that is idled.

Compounding: 2 of the 3 consumers do not bind `scrubbed` at all (§1, L-i2), so on the easing and
spring scenes the wake does not even reach the parent.

**Falsifier.** (a) something else moves the ball during a paused scrub — the only writer is
`setBallProgress`, called from `applyProgress` (visualizer-drag only) and from the guarded rAF tick;
(b) another subscriber keeps the shared ticker alive and thereby ticks this one — no:
`useDemoTicker.ts:20` re-checks *this* entry's `enabled()` inside the shared loop; (c) `isAnimPlaying`
stays true through the scrub — `onScrubStart` calls `demo.pause()` when it was playing, and when it
was already paused it was false to begin with. **Visual severity is `UNPROVEN-NEEDS-LIVE`** (a jump
at release vs. a smooth follow); the code path is proven.

---

### L-m1 — MINOR · `btn-interactive` is a phantom class

`:55` `'btn-playback h-10 w-full rounded-full gap-2 btn-interactive'`.
8 occurrences repo-wide (`CubeScene.vue:188,193`, `SequenceTarget.vue:31`, `SpringScene.vue:167`,
`SpringPhysicsFacet.vue:74,105`, `RibbonBar.vue:135`, `PlaybackRibbon.vue:55`) — **all usages, zero
definitions**. No `.btn-interactive` selector and no `@utility btn-interactive` in any demo CSS
(`grep -rn "@utility" demo --include="*.css"` yields only `icon-xs/sm/md/lg` and `ppmycota-stroke`,
`design-idioms.css:96-122`); `grep -c btn-interactive dist/glass-ui.css` → 0. Dead ink, repeated 8×,
which is worse than dead ink once — it reads as a shared idiom and is not one.
**Falsifier:** a Tailwind plugin or safelist that materialises it; none configured (`@theme` at
`style.css:42-67` declares only `--font-*` and `--color-*` keys).

### L-m2 — MINOR · `duration-fast` emits nothing under Tailwind v4.3

`:65` `'icon-lg transition-transform duration-fast'`. Tailwind **4.3.0** (installed) resolves the
`duration` functional utility against the `--transition-duration-*` namespace and, failing that,
accepts only a bare number:

```js
// node_modules/tailwindcss/dist/lib.mjs
i.functional("duration", C => { … x = e.resolve(C.value…, ["--transition-duration"]);
    x===null && _(C.value.value) && (x = `${C.value.value}ms`); if (x!==null) return […] })
```

`grep -rn "transition-duration-" demo` → 0; the same grep over `dist/*.css` in glass-ui → 0. `"fast"`
is not numeric, so `x` stays `null` and **no declaration is emitted**. The transition silently falls
back to Tailwind's `--default-transition-duration: 150ms` (`theme.css:492`). Cosmetically small; it
is the *idiom* that is broken, and it recurs at `ChannelControls.vue:190`, `SharePopover.vue:7`,
`TimelineTrack.vue:24`. **Falsifier:** a `@theme { --transition-duration-fast: … }` anywhere — absent
in the demo and in glass-ui's shipped CSS. (Note the CSS *variable* `--duration-fast` is real and
used correctly in `playback-idiom.css:33-36`; it is the *utility class* that does not exist.)

### L-m3 — MINOR · `touch-gate-target` / `touch-gate-active` are dead classes

`:7-8`. Four usages repo-wide (`PlaybackRibbon.vue:7,8`, `AnimationVisualizer.vue:21,23`), **zero
definitions** — not in `demo/` (`grep -rn "touch-gate" --exclude-dir=node_modules .` returns only
those 4 usages plus historical tranche docs), not in `dist/glass-ui.css` (count 0), not in glass-ui's
producer source at `/Users/mkbabb/Programming/glass-ui/src` (0). `:8` additionally makes the render
depend reactively on `gate.isActive` to toggle a class that paints nothing. If it survives L-M1 it
should be deleted with it. **Falsifier:** an e2e selector depending on the class — the only non-source
hit is a frozen investigation artifact, `docs/tranches/I/audit/investigate/b11-playback-summary.json:38`,
which *records* the class from a live DOM read; it does not select on it.

### L-m4 — MINOR · the script-header comment describes a `<style>` block that is not in this file

`:85-87`

> Colocated playback-button skin (uncaged from utils.css, D.W2.S2). Non-scoped global rules — the
> `.btn-playback*` classes land on reka-ui's `<Button>` DOM shared across this ribbon and the scene
> play buttons.

There is **no non-scoped style block** in `PlaybackRibbon.vue`; the sole `<style>` is `scoped`
(`:207`) and contains only `.timeline-green`. The `.btn-playback*` rules live in
`demo/styles/playback-idiom.css`, which the ribbon **does not import** — it is pulled globally by
`demo/styles/design-idioms.css:6`. The lie is bidirectional: `playback-idiom.css:10-13` asserts
*"A non-scoped colocated partial **imported by PlaybackRibbon.vue**"* — which it is not. Two files
mutually certify a colocation that no longer exists. (`lane-frontend.md:153-154` quotes both lines as
evidence of the reka-DOM coupling and does not catch the false import claim.)

### L-m5 — MINOR · `any` cast over a genuinely nullable emit payload

`:19` `@update:model-value="(val: any) => scrubTo(val[0])"`.
glass-ui types it precisely: `"update:modelValue": (payload: number[] | undefined) => any`
(`dist/components/slider/Slider.vue.d.ts`). The `any` erases the `| undefined`, so `val[0]` on an
`undefined` payload is an unguarded `TypeError` that the compiler is explicitly told to ignore. Correct
form is `(val: number[] | undefined) => { if (val?.[0] != null) scrubTo(val[0]); }`.
**Falsifier:** proof that reka/glass-ui never emits `undefined` for a single-thumb slider — the shipped
type says it can, and the shipped type is the contract this component consumes.

### L-m6 — MINOR · `KeyframesAnimation<any>` in the public surface, twice

`:104` (prop) and `:129` (`sliderUpdate` payload). The `any` propagates out of the component into
every consumer's handler. The engine's `Vars` generic exists to be carried; `unknown` would at least
force the consumer to narrow. Consistent with the file's other `any` (L-m5) — a small, repeated
type-hygiene leak on the one surface a *library demo* is meant to exemplify.

### L-m7 — MINOR · the style comment contradicts itself within one block

`:215` "red returned to destructive-only (VERDICT #16)" and `:232` sets the range fill from the
**neutral** `--color-slider-track`; yet `:229` closes with "a chunky scrubbable rail **with the red
range fill**". The trailing clause is stale K-era prose surviving the T.D7 re-voice, inside the same
comment that announces the re-voice. Cheap to fix, and it is the kind of residue that made L-M3
plausible in the first place.

### L-m8 — MINOR · "disabled" is CSS-only; the control stays keyboard-operable

`:9` and `:74` apply `is-disabled` when `!isAnimStarted`. The rule is
`demo/styles/style.css:249-252`: `{ opacity: .5; pointer-events: none; }`. `pointer-events:none`
does **not** remove the slider from the tab order and does not stop arrow-key value changes — a
keyboard user can focus a visibly-disabled scrubber and scrub it, emitting `sliderUpdate` into a
transport the UI claims is inert. There is no `aria-disabled` either. The primitive supports the real
thing: `SliderProps extends SliderRootProps` (`dist/components/slider/types.d.ts`), i.e. reka's
`disabled` — and glass-ui already styles `[data-disabled]`
(`.glass-slider[data-disabled] .slider-range{opacity:var(--opacity-disabled)}`). `:disabled="!isAnimStarted"`
is the one-line correct posture. **Falsifier:** a global rule making `.is-disabled` descendants
`tabindex="-1"` — CSS cannot do that; nothing in the demo JS does it either. Reachable only via
`ChannelOptions` (the two scenes hardcode `isAnimStarted: true`).

### L-m9 — MINOR · the duration is read two ways, and only one branch guards zero

`effectiveDuration` (`:119-121`, cached) vs `animation.options.duration` (`:184`, fresh). This is the
mechanism behind L-B1's *divergence*, and it is a defect in its own right: one field, two access
paths, different freshness. Compounding, the error postures are asymmetric — the `source` branch
guards `dur > 0 ? effectiveT / dur : 0` (`:199`) while the `animation` branch performs
`duration - effectiveT` with no zero/negative guard at all, even though the sibling component *does*
guard it (`AnimationVisualizer.vue:114` `if (!anim || anim.options.duration <= 0) return;`). A
duration-0 animation also yields `:min="0" :max="0"` on the Slider. The stricter guard sits on the
dead branch; the live branch is bare.

### L-i1 — INFO (cross-axis) · the scrub Slider has no accessible name

`:5-27`. The `<Tooltip>` supplies a *description*, not a name; no `aria-label` reaches the Slider. The
sighted-only ball is correctly `aria-hidden` (`AnimationVisualizer.vue:2-7`) precisely so that "one AT
slider per scrub value — the `<Slider>` is it" — but that one slider is unnamed. Filed for the A axis;
noted here because the aria-hidden rationale in the sibling file makes it the ribbon's obligation.

### L-i2 — INFO · `scrubbed` is honoured by 1 of 3 consumers

Declared with a strong contract at `:126-128` ("fires on EVERY scrub … so a settled sync loop re-arms
even on a keyboard-arrow nudge") but bound only by `ChannelOptions.vue:392`. `EasingScene` and
`SpringScene` drive their own loops, so this may be intentional — but an emit whose documented purpose
is loop-rearming, ignored by two thirds of its consumers, is either over-specified or under-wired.
See also L-M5, where the wake that *is* delivered goes the wrong direction.

### L-i3 — INFO · Goldilocks: the size is right; the comment:code ratio is where the rot lives

244 lines, of which the executable surface is roughly 60 (template ~80, comments ~90). Not a god
module; the decomposition (ribbon = transport + rail; visualizer = the twin) is sound. But this audit
found **four** long, confident, load-bearing comment blocks that are stale or false —
`:85-87` (L-m4), `:165-166` (L-M1), `:208-229` (L-M3 + L-m7) — versus **zero** wrong lines of layout.
The comments are the least-verified artifact in the file and are cited by downstream audits as fact
(`lane-frontend.md:153-154`). Prose that narrates a *measurement* ("measured: wrapper sets .625rem…",
`:223`) needs a version stamp or a test, or it becomes archaeology asserted as present tense.

---

## 3. Superlatives (L-18 runs both ways)

### L-S1 — the pointerType-scoped gate bypass is genuinely excellent reasoning

`:167-179`. `useTouchGate`'s first-tap-activates contract keys off `"ontouchstart" in window`, which
is **true in desktop Chromium and in Playwright even for a mouse** — so routing a mouse press through
it swallowed `useDragCapture`'s `acquireSelectSuppression()` and a desktop scrub highlighted whatever
chrome it swept. Scoping the gate to `e.pointerType === "touch"` and arming the drag seam directly for
mouse/pen is exactly right: a mouse has no page-scroll ambiguity to disambiguate. The comment
(`:156-166`) names the false positive, the observable symptom, and the failing gate
(`proof:drag-gesture` clause (a)). This is what a rationale comment should look like — and it is the
one long comment in the file that is *still true* about its own subject.

The irony is load-bearing: the correct fix for a gate that should not exist (L-M1). The reasoning
survives; the wrapper should not. **Falsifier for the praise:** if `useTouchGate` had gated on a real
touch-capability probe rather than `ontouchstart`, the bypass would be papering over an upstream bug
instead of a platform quirk — the d.ts ("Desktop pointers pass through immediately") shows the
composable *intends* the behaviour this code restores, so the bypass agrees with the primitive's own
contract rather than fighting it.

### L-S2 — the reversal inverse is *exactly* the engine's own formula, and it reads the right flag

`:183-185`

```ts
const rawT = animation.reversed ? animation.options.duration - effectiveT : effectiveT;
```

The engine defines `effectiveT` as
`anim._playback.reversed ? anim.options.duration - anim._playback.t : anim._playback.t`
(`src/animation/engine/play-lifecycle.ts:449`). The ribbon's expression is that function's exact
involution — not an approximation, not a re-derivation, and it round-trips by construction.

The subtler excellence is *which flag it reads*. The component has a `userReversed` prop right there
(`:114`) and uses it for the button's `aria-pressed`. It would have been the obvious, wrong choice for
the math: under `direction: "alternate"` the engine flips `_playback.reversed` at every iteration
boundary (`option-setters.ts:79`, `shouldReverse(anim.options.direction, anim._playback.iteration)`)
while the user's intent flag stays put. Reading `animation.reversed` keeps the scrub correct through
alternating iterations; reading `userReversed` would invert the seek on every odd pass. Two similarly
named booleans, one correct, correctly chosen — and the file does not even brag about it.

### L-S3 — engine-seam discipline: zero mutation, zero teardown code, zero leak

Two things at once. (a) The ribbon **never** pokes engine state: no `animation.t = …`, no
`interpFrames`, no `play()/pause()` — it emits `sliderUpdate` / `togglePlay` / `toggleReverse` upward
and lets the group/channel seam own the write (`:187-194` documents the deletion of the old SOLO
poke-path). For a leaf presentational component consuming a stateful engine, that is the correct
posture, and it is why L-B1 is a *read* bug and not a *write* bug.

(b) `useDragCapture` (`:148-151`) replaced a raw `useEventListener(window, "pointerup", …)` plus a
`sliderScrubActive` flag (`:141`). The composable owns move/up/cancel and leans on vueuse's
`tryOnScopeDispose` (`useDragCapture.ts:19-21`), which closes the mid-drag-unmount leak the manual
remove path missed. **Verified by absence:** this component contains *no* `onUnmounted`, *no*
`onScopeDispose`, *no* `addEventListener`, *no* timer, *no* observer — and needs none. Every listener
it causes is owned by a composable with scope-tied cleanup. Teardown correctness achieved by having
nothing to tear down is the strongest form of it.

### L-S4 — (imported file) the visualizer's engine dogfooding is the demo's best library advertisement

`AnimationVisualizer.vue:122-191`. Two hand-rolled physics loops were retired onto the engine's own
light trackers, and the mapping is honest rather than decorative:
`SmoothProgress({damping:0.4, clamp:false})` **is** the `v = v·α + instantV·(1-α)` recurrence, so
feeding it raw per-sample velocity makes `.current` the filtered estimate (`:130-136`);
`SpringProgress({response:0.45, dampingFraction:1, respectReducedMotion:true})` seated via
`reset(position, velocity)` with `target` aimed at the fling-direction boundary lets the **analytic
damped-decay solver** carry the release momentum (`:138-148, 182-184`) — and `respectReducedMotion`
means the accessibility case is the *engine's* responsibility, not a demo `if`. `RAFPlayback.drive`
is used as documented ("Idempotent — a call while the loop is already running is a no-op",
`playback.ts:200-203`), and the second raw playback is explicitly disposed:
`onScopeDispose(() => coastPlayback.stop())` (`:252-255`), with the comment naming the exact leak it
prevents ("unmounting mid-fling would otherwise leave it running until the spring settles — a bounded
micro-leak").

Also exemplary and rarely done: `useResizeObserver(containerEl, () => bumpLayoutEpoch())`
(`:70-79`) feeds value.js the genuine container-resize signal its `layoutEpoch` cache eviction cannot
observe from `window.resize` — the demo owns the container, the eviction policy stays once in
value.js. That is cross-library consumption done exactly right.

**Falsifier for the praise:** L-M4 shows this same coast path drops an emit on interruption — the
*engine* consumption is exemplary; the *event contract* around it is one `emit("dragEnd")` short. The
praise is for the former and is not withdrawn by the latter.

---

## 4. Disposition for the repair wave (ordering, not instruction)

1. **F-1 first** (census `lane-frontend.md:612`). Nothing in L-M3 is verifiable, let alone fixable,
   while glass-ui is undeclared and unlocked. Declare `7.0.0`, regenerate the lock.
2. **L-B1** — smallest diff, largest correctness win. Kill the cache or track the clock.
3. **L-M1 + L-m3 + L-M2** land as one deletion: drop the wrapper gate (glass-ui ships it), drop the
   dead classes it paints, drop the unwired `source` branch. Register **S-9** against the census's
   shadow list. This discharges `27-ledger-sweep.md:421` rec-2 and part of VERDICT #18.
4. **L-M4 + L-M5** are one seam: make the drag lifecycle balanced, and give the visualizer a wake it
   can hear. Both are `AnimationVisualizer.vue` edits surfaced through the ribbon's contract.
5. **L-M3, L-m1, L-m2, L-m4, L-m7** are the skin/prose sweep — mechanical, and each independently
   landable.
6. Anything in §3 that a mechanical swap would erase — the `pointerType` insight, the
   `animation.reversed` choice, the `respectReducedMotion` delegation — must be **carried forward in
   the replacement**, not lost to it. L-S1's reasoning outlives the code that carries it.
