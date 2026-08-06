claude-opus-5[1m]

# CHALLENGE · PlaybackRibbon · axis C (CONSUMPTION)

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/components/playback/PlaybackRibbon.vue` (244 lines)
**Axis:** how this component consumes keyframes.js (the library) and glass-ui (the design system) — subpath choices, shadow components, value.js transitive exposure, props/emits contract quality, sibling integration seams.
**Mode:** static, read-only. No installs, no dev servers, no browser tooling. Every claim carries file:line provenance and its own falsifier.
**Prior:** all keyframes.js / glass-ui / reka-ui / value.js facts are read from the tree at `/Users/mkbabb/Programming/keyframes.js` and its installed `node_modules` — the same copy the demo boots against.

---

## 0. Read set (whole, read-only)

| file | why |
|---|---|
| `demo/components/playback/PlaybackRibbon.vue` | target (244 L) |
| `demo/components/playback/AnimationVisualizer.vue` | imported at `:96`, the ribbon's only child component (256 L) |
| `demo/components/instrument/transport/composables/useDragCapture.ts` | imported at `:93` (70 L) |
| `demo/components/instrument/transport/composables/useRafLoop.ts` | reached via the child |
| `node_modules/@mkbabb/glass-ui/dist/**` (7.0.0) | `Button`, `Slider`, `useTouchGate`, `Tooltip*` — declared contracts + shipped CSS |
| `node_modules/reka-ui/dist/Slider/**` (2.9.x) | the primitive glass-ui's Slider forwards to |
| `src/animation/engine/{animation,play-lifecycle,option-setters}.ts` | `effectiveT` / `reversed` / `setDuration` semantics |
| the 3 mount sites (below) | props/emits contract in practice |

**Mount census — every consumer of this component (3 sites, exhaustive):**

```
$ grep -rn "PlaybackRibbon" --include="*.vue" --include="*.ts" demo/ | grep -v "^demo/components/playback/PlaybackRibbon.vue"
demo/scenes/easing/EasingScene.vue:96                      h(PlaybackRibbon, {…})
demo/scenes/spring/SpringScene.vue:109                     h(PlaybackRibbon, {…})
demo/components/…/channel-controls/ChannelOptions.vue:378  <PlaybackRibbon …/>  (inside <Teleport>)
```

---

## 1. Headline

| # | severity | finding |
|---|---|---|
| **C-1** | **BLOCKER** | `effectiveDuration` is a `computed` over a `markRaw` animation → it **never recomputes**. The Slider's `:max` freezes at the first-observed duration; every duration edit desyncs the scrub rail. Reproducible at all 3 mounts. |
| **C-2** | **BLOCKER** | `currentT` declares no time-space. `scrubTo` assumes **effective** time; 2 of 3 mounts feed **raw** `t`. Under Reverse the ribbon's own two children paint mirrored positions and a scrub mirror-jumps. |
| **C-3** | MAJOR | The `scrubStart`/`scrubEnd` seam is pointer-only. glass-ui's `Slider` ships `valueCommit` (fires for keyboard too); the ribbon ignores it and hand-rolls the gesture instead. A keyboard scrub during playback is overwritten within one frame. |
| **C-4** | MAJOR | No `:step`. reka's default is `1`, so the **only AT-exposed scrub control** in this component moves 1 ms per arrow press; the documented normalized `[0,1]` `source` rail degenerates to a 2-position toggle. |
| **C-5** | MAJOR | The touch gate on the Slider is a placebo: glass-ui's own scoped CSS puts `touch-action:none` on `.glass-slider`, so the gate's "defer to page scroll" branch cannot restore scrolling. |
| **C-6** | MAJOR | `.touch-gate-target` / `.touch-gate-active` resolve to **zero CSS rules** anywhere — the gate's armed state has no visual affordance at all. |
| C-7 | MINOR | `(val: any)` at `:21` erases glass-ui's declared `number[] \| undefined` payload. |
| C-8 | MINOR | Both `--slider-thumb-bg` declarations (incl. the entire `:hover` rule) are inert against the standard variant; the style block's central claim is false in both halves. |
| C-9 | MINOR | `ref="sliderRef"` is a dead template ref (1 occurrence in the file). |
| C-10 | MINOR | `.btn-interactive` (`:55`) is an undefined class. |
| C-11 | MINOR | One import block mixes root-barrel and subpath conventions while `./button`, `./slider`, `./dom` all exist. |
| C-12 | MINOR | The `source` half of the props contract is unenforced by the type AND unconsumed by every mount — dead API surface, and broken as specified (see C-4). |
| C-13 | MINOR | The ribbon's only child reaches `@src/animation/resolve/browser` — a module the public barrel does not export — and wires a container `ResizeObserver` to a **global** cache eviction. |
| C-14 | INFO | Both glass-ui import lines resolve against an undeclared dependency (lane-frontend **F-1**). |
| C-15 | INFO | `isAnimStarted` is faked `true` at 2 of 3 mounts; `userReversed` (visual) and `animation.reversed` (math) are a dual authority. |
| **L-1** | superlative | The `pointerType === "touch"` discrimination at `:167–179` is a genuinely correct, correctly-scoped fix — verified against `useTouchGate`'s shipped implementation. |
| **L-2** | superlative | The gesture/value split (`useDragCapture` owns the gesture, reka owns the value projection) is the right seam and closes the mid-drag-unmount listener leak. |
| **L-3** | superlative | Zero direct `reka-ui` imports, zero local `ui/` copies, and the visualizer is correctly `aria-hidden` so exactly ONE AT slider exists per scrub value — corroborates lane-frontend **F-6**. (Undercut by C-4; L-18 runs both ways.) |

Tally: **15 defects** (2 BLOCKER · 4 MAJOR · 7 MINOR · 2 INFO) · **3 superlatives**.

---

## 2. BLOCKERS

### C-1 · `effectiveDuration` is frozen — the scrub rail's `:max` never tracks a duration edit — **BLOCKER**

```vue
PlaybackRibbon.vue:19    :max="effectiveDuration"
PlaybackRibbon.vue:98    const { animation, source } = defineProps<{…}>();
PlaybackRibbon.vue:119   const effectiveDuration = computed(
PlaybackRibbon.vue:120       () => animation?.options.duration ?? source?.duration ?? 1,
PlaybackRibbon.vue:121   );
```

The chain, each link proven from the tree:

1. **The animation prop is always `markRaw`.** All three mounts pass a `markRaw`'d instance:
   ```
   demo/scenes/easing/useEasingDemo.ts:289        const previewAnim = markRaw(new CSSKeyframesAnimation…)
   demo/scenes/spring/useSpringKeyframesEditor.ts:57  const springEditAnim = markRaw(
   demo/components/…/ChannelOptions.vue:495-497   // "animation is markRaw, so Vue can't track property
                                                  //  changes. We sync reactive refs every frame…"
   ```
2. **`props` is `shallowReactive`.** Reading `__props.animation` (what `animation` compiles to under Vue 3.5 reactive-props destructure) tracks the `animation` **key**; `.options.duration` on the raw instance is untracked. The computed's entire dep set is `{props.animation, props.source}`.
3. **Neither dep ever changes identity.** `applyDuration` mutates in place — it does not replace the instance:
   ```
   src/animation/engine/option-setters.ts:46-62
       export function applyDuration<V extends Vars>(anim, duration): void {
           …
           anim.options.duration = d;      // ← in-place mutation, same object
       }
   ```
   and `KeyframesAnimation.setDuration` is a thin delegate (`src/animation/engine/animation.ts:270-273`).
4. **Therefore the computed evaluates once and caches forever.** Re-renders do not re-run a `computed`; only dep invalidation does.

**Duration is live-editable at two of the three mounts.**

```
demo/components/…/ChannelOptions.vue:25-42   <LabeledInput label="duration" … @update:model-value=
                                              (v) => trySetOption(() => animation.setDuration(v))
demo/scenes/easing/EasingSidebar.vue:54-62   label="duration"  →  demo.duration.value = v
demo/scenes/easing/useEasingDemo.ts:316-318  watch(duration, (d) => { previewAnim.setDuration(d); });   // :317 is the call
```

**Failure scenario (channel mount, the demo's primary instrument).** Boot with the default `'5s'`; the ribbon caches `effectiveDuration = 5000`. Type `10s` into the duration field (`ChannelOptions.vue:33-41`). `animation.options.duration` becomes 10000; `useAnimationSync` (`ChannelOptions.vue:504`) keeps feeding `currentT = animation.effectiveT ∈ [0,10000]`; the Slider's `:max` is still 5000. The thumb saturates at the rail's right edge for the entire second half of every cycle, and a pointer scrub can only address `t ∈ [0, 5000]` — the back half of the animation is unreachable from the transport.

The ribbon's own code is the witness that the author knew `.options.duration` is a live read: `scrubTo` bypasses the computed and reads it directly —

```
PlaybackRibbon.vue:183-185
    const rawT = animation.reversed
        ? animation.options.duration - effectiveT   // ← LIVE duration
        : effectiveT;
```

— so the inversion math uses the current duration while the rail it inverts against uses the frozen one. Two durations, one component.

**Falsifier.** This claim dies if any of: (a) some mount passes a non-`markRaw`, reactive animation (all three are quoted above — none does); (b) `setDuration` replaces the instance rather than mutating it (`option-setters.ts:46-62` says otherwise); (c) Vue's `props` object is deep-reactive (it is `shallowReactive`, and `markRaw` survives `reactive()` regardless); (d) the ribbon is remounted on every duration edit — it is not: `h(PlaybackRibbon, …)` at `EasingScene.vue:96` / `SpringScene.vue:109` is keyless and same-position, so it patches.

**The fix shape** (not a patch — the shape): read the duration through the same rAF bridge the mount already built for `currentT` (`useAnimationSync`), or accept the scale as an explicit prop. The library exposes no reactive duration channel; the demo's own idiom for that is `useAnimationSync`, and the ribbon simply did not consume it.

---

### C-2 · `currentT` has no declared time-space; two of three mounts feed the wrong one — **BLOCKER**

The prop block documents `animation` and `source` in eleven lines of prose and leaves the *time* prop bare:

```vue
PlaybackRibbon.vue:99-115
    // T.B1-β STAGE 1 — the ribbon is CHANNEL-capable: …  (11 lines about `animation`/`source`)
    animation?: KeyframesAnimation<any>;
    source?: {…};
    currentT: number;          // ← no doc, no unit, no space
    isAnimPlaying: boolean;
    isAnimStarted: boolean;
    userReversed: boolean;
```

But the component silently establishes a convention. `scrubTo` treats the Slider's value as **effective** time and inverts it to raw:

```
PlaybackRibbon.vue:181-194
    const scrubTo = (effectiveT: number) => {
        if (animation) {
            const rawT = animation.reversed
                ? animation.options.duration - effectiveT
                : effectiveT;
            emit("sliderUpdate", { t: rawT, animation });
```

against the engine's definition:

```
src/animation/engine/play-lifecycle.ts:448-450
    export function effectiveT<V extends Vars>(anim) {
        return anim._playback.reversed ? anim.options.duration - anim._playback.t : anim._playback.t;
    }
```

**What each mount actually feeds:**

| mount | `currentT` expression | space |
|---|---|---|
| `ChannelOptions.vue:380` | `currentT` from `useAnimationSync` → `animation.effectiveT` (`useAnimationSync.ts:31,45`) | **effective** ✓ |
| `EasingScene.vue:100` | `demo.progress.value * demo.previewAnim.options.duration`, where `useEasingDemo.ts:328` does `previewAnim.t = p * duration` | **raw `t`** ✗ |
| `SpringScene.vue:119-120` | `demo.scrubberPhase.value * duration`, where `useSpringDemo.ts:240` / `:288` do `springEditAnim.t = phase * duration` | **raw `t`** ✗ |

Both scene mounts also flip the flag by direct assignment, which — unlike the engine's `reverse()` — does **not** shift the clock to keep `effectiveT` continuous:

```
demo/scenes/easing/EasingScene.vue:81    demo.previewAnim.reversed = userReversed.value;
demo/scenes/spring/SpringScene.vue:95    demo.springEditAnim.reversed = userReversed.value;
vs. src/animation/engine/play-lifecycle.ts:89-101  (reverse(): flips AND clock-shifts so effectiveT is continuous)
```

**Failure scenario A — the ribbon contradicts itself on screen.** Easing scene, duration 5000 ms, playhead at `t = 1000`. Press **Reverse**. The Slider (`:model-value="[currentT]"`, `:20`) reads `1000` → thumb at 20 %. `AnimationVisualizer`, mounted by this same ribbon three lines later (`:72-80`), reads `anim.effectiveT / duration` (`AnimationVisualizer.vue:246`) `= (5000 − 1000)/5000` → ball at 80 %. **The rail and the ball beneath it point at opposite ends of the same clock.** The visualizer's own header calls itself "a decorative VISUAL twin of the real reka `<Slider>` … same scrub value, same range" (`AnimationVisualizer.vue:2-4`) — the twin is mirrored.

**Failure scenario B — the scrub mirror-jumps.** Same state, Reverse engaged. Drag the thumb to 20 % (`effectiveT = 1000`). `scrubTo` emits `rawT = 5000 − 1000 = 4000`. `EasingScene.vue:72-75` seats `demo.progress = 4000/5000 = 0.8` (`:74`). `currentT` recomputes to `0.8 × 5000 = 4000`. The thumb snaps to 80 % — the mirror of where it was released. Every scrub position except the exact midpoint reflects.

**Why this is the ribbon's defect, not the scenes'.** The ribbon is the only party that knows `scrubTo` inverts; it publishes that requirement nowhere; and it accepts a bare `number`. A `currentT` that must be effective-space is expressible in the type system (a branded alias) or, minimally, in one line of the same doc block that got eleven lines for `source`. Three independent authors read the same untyped `number` and two got it wrong — that is a contract defect by the majority rule.

**Falsifier.** Dies if (a) `progress`/`scrubberPhase` are effective-space after all — refuted by `useEasingDemo.ts:331` and `useSpringDemo.ts:240,288`, both of which write the **raw** `.t` setter; (b) direct `reversed =` assignment clock-shifts — refuted by `animation.ts:95-96` (`set reversed(v) { this._playback.reversed = v; }`, no shift); (c) the visualizer reads `currentT` rather than `effectiveT` — refuted by `AnimationVisualizer.vue:246`, which reads the animation object directly and receives no time prop at all (`:55-58`).

**Secondary consequence, worth naming.** The visualizer takes **no** time prop; it reaches into `props.animation.effectiveT` every frame. So the ribbon has two independent time sources for one rail — a prop for the Slider and a library-object read for the ball. Even absent Reverse, they can only agree by coincidence of the parent's bookkeeping.

---

## 3. MAJORS

### C-3 · The scrub-gesture seam is pointer-only; `valueCommit` — the primitive's own commit event — is ignored — MAJOR

```
PlaybackRibbon.vue:148-151   const { onPointerDown: onScrubPointerDown } = useDragCapture({
                                 onStart: () => emit("scrubStart"),
                                 onEnd:   () => emit("scrubEnd"),
                             });
PlaybackRibbon.vue:11        @pointerdown.capture="gatedSliderDown"
```

`scrubStart`/`scrubEnd` fire **only** from `useDragCapture`, i.e. only from `pointerdown` → `pointerup`/`pointercancel` (`useDragCapture.ts:43-67`). Every mount uses those two emits to pause and resume playback around the gesture:

```
demo/scenes/easing/EasingScene.vue:85-92     onScrubStart → demo.pause();  onScrubEnd → demo.play()
demo/scenes/spring/SpringScene.vue:99-106    identical
demo/components/…/ChannelOptions.vue:384-390 wake() + emit('scrubStart') / emit('scrubEnd')
```

reka's Slider is fully keyboard-operable and commits on key:

```
node_modules/reka-ui/dist/Slider/SliderImpl.js:35-44   Home/End/Page*/Arrow* → emits stepKeyDown…
node_modules/reka-ui/dist/Slider/SliderRoot.js:174-175 updateValues(value + stepInDirection, atIndex, { commit: true })
node_modules/reka-ui/dist/Slider/SliderRoot.js:118,128 emits("valueCommit", …)
```

and glass-ui re-declares that event on its own public surface:

```
node_modules/@mkbabb/glass-ui/dist/components/slider/Slider.vue.d.ts:3-4
    "update:modelValue": (payload: number[] | undefined) => any;
    valueCommit: (payload: number[]) => any;
```

The ribbon binds `@update:model-value` (`:21`) and nothing else. **`valueCommit` is exactly the "the user finished setting a value" signal the ribbon hand-rolled `useDragCapture` to synthesize — and it covers keyboard, pointer, and any future input mode the primitive adds.**

**Failure scenario.** Channel mount, animation playing. Focus the slider thumb (Tab) and press `→`. reka emits `update:modelValue` → `scrubTo` → `sliderUpdate` seats the child time, and `scrubbed` → `wake()`. No `scrubStart` was emitted, so the parent never paused. The group's rAF loop recomputes from `startTime` on the very next frame and overwrites the seat. Net effect of the keypress: nothing, plus one wasted engine seat. The `scrubbed` emit's own docstring proves the keyboard path was known —

```
PlaybackRibbon.vue:126-128
    // Wake-only: fires on EVERY scrub (pointer, keyboard, or visualizer) so a
    // settled sync loop re-arms even on a keyboard-arrow nudge.
```

— the author routed the *wake* through the keyboard-inclusive path and left the *pause/resume* on the pointer-only one.

**Falsifier.** Dies if (a) any mount's `onScrubStart` does not pause — all three are quoted above and all three do; (b) reka fires pointer events for keyboard interaction (`SliderImpl.js:35-44` is a `keydown` handler); (c) the running loop does not overwrite a seat — the pause-on-scrub bookkeeping in all three mounts exists precisely because it does.

---

### C-4 · No `:step` — the sole AT-exposed scrub control moves 1 ms per press; the `source` rail degenerates to a toggle — MAJOR

```
PlaybackRibbon.vue:15-22
    <Slider ref="sliderRef" class="p-2" :min="0" :max="effectiveDuration"
            :model-value="[currentT]" @update:model-value="(val: any) => scrubTo(val[0])" />
```

No `:step`. glass-ui does not default it — `SliderProps extends SliderRootProps` (`dist/components/slider/types.d.ts:6`) and the compiled component declares `step: {}` with no `default` (`dist/slider-DDia69Fy.js`, props block). It falls through to reka:

```
node_modules/reka-ui/dist/Slider/SliderRoot.js:58-61
    step: { type: Number, required: false, default: 1 },
node_modules/reka-ui/dist/Slider/SliderRoot.js:122
    const snapToStep = roundValue(Math.round((value - min) / step) * step + min, decimalCount);
```

**(a) Keyboard.** `:max` is a duration in **milliseconds** (channel default `'5s'` = 5000, `ChannelOptions.vue:28`). Step 1 ⇒ one arrow press = 1 ms = 0.02 % of the rail; a full traverse is 5000 presses (500 with Page keys, which reka multiplies by 10 — `SliderRoot.js:174`).

This is not a cosmetic a11y note, because **this Slider is the only slider in the component tree exposed to assistive tech, by design**:

```
AnimationVisualizer.vue:2-7
    <!-- aria-hidden: this big ball is a decorative VISUAL twin of the real
         reka <Slider> in PlaybackRibbon … One AT slider per scrub value — the
         <Slider> is it; this is sighted-only flair … -->
    <div class="p-2 w-full h-full" aria-hidden="true">
```

The component deliberately concentrated all AT affordance into one control and then left that control's granularity at the primitive's default.

**(b) The `source` rail.** The prop doc specifies a normalized rail:

```
PlaybackRibbon.vue:108-109   /** The scrub scale (ms). Defaults to 1 (a normalized [0,1] rail). */
                             duration?: number;
```

With `min=0, max=1, step=1`, `snapToStep` admits exactly two values: 0 and 1. The documented normalized rail is a **binary toggle**. (It is unreachable today — see C-12 — which is why this has not been caught.)

**Falsifier.** Dies if glass-ui's Slider defaults `step` to something duration-relative (its compiled props block declares `step: {}` — no default) or if the ribbon passes `:step` anywhere (it does not; `grep -n "step" PlaybackRibbon.vue` → 0). The *perceived* severity of the keyboard traverse is livable-only — **UNPROVEN-NEEDS-LIVE** for the SS-13 visual audit — but the arithmetic (1 ms/press against a ms-valued max) is fully source-derived.

---

### C-5 · The touch gate on the Slider is a placebo — the child owns `touch-action` — MAJOR

The ribbon wraps the Slider in a gate whose stated purpose is to let a first touch scroll the page:

```
PlaybackRibbon.vue:167-179
    const gatedSliderDown = (e: PointerEvent) => {
        if (e.pointerType === "touch") {
            const wrapper = e.currentTarget as HTMLElement;
            if (!gate.handleTouchStart(wrapper, e.clientY)) {
                // First touch on a resting control — defer to page scroll; prevent
                // the slider from receiving the event until a deliberate re-tap.
                e.stopPropagation();
                e.preventDefault();
                return;
            }
        }
```

`stopPropagation()` does keep the Slider from *receiving* the pointer. It cannot make the page scroll, because `touch-action` is a compositor-level declaration that JS cannot override, and glass-ui declares it on the slider element itself:

```
node_modules/@mkbabb/glass-ui/dist/glass-ui.css
    .glass-slider[data-v-1ba39eb5]{--slider-range-origin:left center;touch-action:none;
      -webkit-user-select:none;user-select:none;inline-size:100%;…}
```

Per the touch-action model the browser intersects the declared values along the hit element's ancestor chain; a hit element declaring `none` blocks panning regardless of what any ancestor says. And the gate composable's only `touch-action` management is to *set* `none` on activation and clear it on deactivate — it never sets `pan-y`:

```
node_modules/@mkbabb/glass-ui/dist/useTouchGate-B4mzQcHJ.js
    function y(e) { o.value = !0, e.style.touchAction = "none", v(); }   // activate
    function x() { … u &&= (u.style.touchAction = "", null); }           // deactivate → "" , not pan-y
```

The ribbon's wrapper carries no `touch-action` style of its own (`PlaybackRibbon.vue:5-14` — none). Contrast the sibling, which owns its DOM and therefore *can* do this correctly:

```
AnimationVisualizer.vue:11
    :style="{ touchAction: gate.isActive.value || !gate.isTouchDevice ? 'none' : 'pan-y' }"
```

**Failure scenario.** Mobile, page scrollable, finger lands on the timeline rail and swipes down. `handleTouchStart` returns `false` (first tap on a resting control); the ribbon swallows the pointer. The Slider does not move — and the page does not scroll either, because `.glass-slider { touch-action: none }` is still in force. The rail becomes a dead zone the user must lift off and re-tap to use, and cannot scroll past.

The component's own comment (`:165-166`) states the cause verbatim — *"glass-ui's Slider does NOT provide [a gate] — it sets `touch-action:none`, hijacking scroll — so the wrapper stays, correctly scoped to touch"* — and then keeps a wrapper that structurally cannot address it. This is a design-system consumption gap, not a demo bug: the fix belongs in glass-ui's Slider (a `scrollGate`/`touchAction` prop), and the correct demo move is a BH-relay, not a wrapper.

**Falsifier.** Dies if (a) `.glass-slider`'s scoped rule does not apply to the ribbon's slider — it does; the demo's own `:deep(.glass-slider[data-variant="standard"])` at `:238` proves the element is in scope, and `data-variant` is emitted unconditionally (`dist/slider-DDia69Fy.js`: `"data-variant": M.value`, prop default `"standard"`); (b) the wrapper sets `pan-y` somewhere — `grep -n "touch" PlaybackRibbon.vue` shows the four gate handlers and no style. The *observed* mobile behaviour is **UNPROVEN-NEEDS-LIVE**; the CSS fact and the composable's behaviour are proven.

---

### C-6 · `.touch-gate-target` / `.touch-gate-active` are undefined classes — the gate has no affordance — MAJOR

```
PlaybackRibbon.vue:7    'touch-gate-target timeline-green',
PlaybackRibbon.vue:8    gate.isActive.value ? 'touch-gate-active' : '',
```

Exhaustive search for a matching rule:

```
$ grep -rl "touch-gate-target\|touch-gate-active" node_modules/@mkbabb/glass-ui/     → (no output)
$ node -e '…extract every rule matching /touch-gate/ from dist/glass-ui.css…'        → TOTAL touch-gate rules: 0
$ grep -rn "touch-gate" demo/ --include="*.vue" --include="*.css" --include="*.ts"
    demo/components/playback/AnimationVisualizer.vue:21,23      (usages)
    demo/components/playback/PlaybackRibbon.vue:7,8             (usages)
$ grep -rn "@utility" demo/styles/*.css   → icon-xs/sm/md/lg, ppmycota-stroke  (no touch-gate)
```

**Four usages, zero definitions, in both repos.** The tap-to-activate contract is therefore invisible: on a touch device the first tap arms the control and nothing on screen changes. The user's model is "the slider is broken" (it ignored my touch) rather than "the slider is armed" — which is precisely the affordance a tap-to-activate gate exists to provide, and precisely the state `gate.isActive` was plumbed into the template to express.

This is a glass-ui consumption gap of the same family as C-5: `useTouchGate` ships the **behaviour** on a subpath and ships **no styling contract** for the states it produces, so every consumer invents a class name and none of them lands.

**Failure scenario.** Mobile user taps the rail; `gate.isActive` flips true; `touch-gate-active` is appended; the computed style is byte-identical to before. Zero rendered difference between "resting, will swallow your next touch" and "armed, will scrub".

**Falsifier.** Dies if a rule exists in a build-time source I did not read — I searched all of `node_modules/@mkbabb/glass-ui/` (recursive, both classes), all of `demo/**` (`.vue`/`.css`/`.ts`), and the demo's `@utility` declarations; there is no `tailwind.config.*` and no `@plugin` in `demo/styles/style.css`. A single matching selector anywhere kills this.

---

## 4. MINORS

### C-7 · `(val: any)` erases glass-ui's declared payload union — MINOR

```
PlaybackRibbon.vue:21   @update:model-value="(val: any) => scrubTo(val[0])"
```

against the declared contract:

```
node_modules/@mkbabb/glass-ui/dist/components/slider/Slider.vue.d.ts:3
    "update:modelValue": (payload: number[] | undefined) => any;
```

The `any` cast discards the `undefined` member of the union. Typed correctly, `val[0]` would not compile without a guard; as written, an `undefined` payload throws `TypeError: Cannot read properties of undefined (reading '0')` inside a template event handler.

**Falsifier.** If reka never emits `undefined` at runtime for this component's configuration, this is a typing-hygiene defect only (a consumer that erases a declared union member), not a crash — which is why it is MINOR rather than MAJOR. It dies entirely if glass-ui's `.d.ts` is corrected to `number[]`.

### C-8 · Both `--slider-thumb-bg` declarations are inert; the style block's claim is false — MINOR

```
PlaybackRibbon.vue:230-234   .timeline-green { --slider-track-bg: …; --slider-range-bg: …;
                                               --slider-thumb-bg: var(--color-progress); }
PlaybackRibbon.vue:241-243   .timeline-green:hover { --slider-thumb-bg: color-mix(…); }
```

Every `.slider-thumb` rule glass-ui 7.0.0 ships (7 total, exhaustively extracted from `dist/glass-ui.css`):

```
[1] .slider-thumb{width:0;height:var(--slider-track-height,.375rem);opacity:0;box-shadow:none;
                  transition:…;background:0 0;border:none;display:block}
[2] .glass-slider[data-variant=spectrum][data-held] .slider-thumb{…}
[3] .glass-slider[data-variant=spectrum] .slider-thumb{…;opacity:1;background:var(--slider-thumb-bg,transparent);…}
[4-7]  all further rules likewise gated on [data-variant=spectrum]
```

`--slider-thumb-bg` is read **only** under `[data-variant=spectrum]`. The ribbon passes no `variant`, so it is `standard` (prop default; and the ribbon's own `:deep(.glass-slider[data-variant="standard"])` at `:238` asserts as much). Under `standard` the thumb is `width:0; opacity:0; background:0 0`. Both declarations paint nothing, and the entire `:hover` rule is a no-op — so the rail has **no hover affordance at all**.

The style block's headline claim is false in both halves:

> `PlaybackRibbon.vue:213-216` — *"so the track + thumb paint the SAME violet the AnimationVisualizer's ball/dashed-twin draws — ONE motion-color identity"*

The **track** is deliberately *not* violet — `--slider-track-bg`/`--slider-range-bg` are both derived from `--color-slider-track`, which `demo/styles/style.css:164-168` defines as a neutral `color-mix(in srgb, var(--foreground) 35%, var(--border))`, and the comment's own next clause concedes it ("a NEUTRAL border-derived groove"). The **thumb** is invisible. Net: nothing in this rail resolves `--color-progress`, while the visualizer's ball does (`bg-accent-kf` = `--color-accent-kf` = `--accent-kf` = `--color-progress`, per `style.css:63` and `:163`). One motion color, one surface painting it.

**Falsifier.** Dies if the slider resolves `data-variant="spectrum"` (it cannot — the demo's own `:deep` override at `:238` targets `standard` and demonstrably lands, per its measured note at `:222-228`), or if an eighth `.slider-thumb` rule restores opacity for standard (the extraction above is complete: `TOTAL .slider-thumb rules: 7`).

### C-9 · `ref="sliderRef"` is a dead template ref — MINOR

```
$ grep -n "sliderRef" demo/components/playback/PlaybackRibbon.vue
16:                        ref="sliderRef"
```

One occurrence. No `useTemplateRef("sliderRef")`, no `const sliderRef = ref()`. Vestigial from a pre-`useDragCapture` implementation that presumably measured the slider element; it now costs a ref registration per mount and misleads a reader into thinking imperative access exists. **Falsifier:** a second occurrence anywhere in the file.

### C-10 · `.btn-interactive` is an undefined class — MINOR

```
PlaybackRibbon.vue:55   'btn-playback h-10 w-full rounded-full gap-2 btn-interactive',
```

```
$ grep -rl "btn-interactive" node_modules/@mkbabb/glass-ui/   → (no output)
$ grep -rn "btn-interactive" demo/ --include="*.css"          → (no output)
$ grep -rn "@utility" demo/styles/*.css                       → no btn-interactive
```

Six demo usages (`PlaybackRibbon.vue:55`, `CubeScene.vue:188,193`, `SequenceTarget.vue:31`, `SpringScene.vue:167`, `SpringPhysicsFacet.vue:74`), zero definitions. Note the *sibling* `.btn-playback` family **is** properly homed (`demo/styles/playback-idiom.css:16,28,44,58`) — so this is one orphan in an otherwise-real idiom, not a systemic miss. Same falsifier as C-6.

### C-11 · One import block, two subpath conventions — MINOR

```
PlaybackRibbon.vue:92   import { Button, Slider, useTouchGate } from "@mkbabb/glass-ui";
PlaybackRibbon.vue:94   import { Tooltip, TooltipContent, TooltipTrigger } from "@mkbabb/glass-ui/tooltip";
```

All three root-barrel symbols have dedicated subpaths in the installed 7.0.0 (`node -e '…Object.keys(exports)'`): `./button`, `./slider`, and `useTouchGate` at `./dom` (`dist/dom.js`; declared in `dist/composables/dom/useTouchGate.d.ts`). The file therefore demonstrates both conventions two lines apart. glass-ui declares `sideEffects: ["*.css"]`, so a tree-shaking bundler should recover most of the cost — this is a **coherence** defect (the file cannot be read as evidence of either house rule) more than a weight one, which is why it is MINOR. It is also the per-file instance of lane-frontend **§3.1**'s aggregate finding (31 root-barrel imports vs 21 subpaths reached of 73 available).

**Falsifier.** Dies if `Button`/`Slider`/`useTouchGate` are *not* subpath-reachable — the exports map above lists `./button`, `./slider`, `./dom`, and `dom.js` contains `useTouchGate`.

### C-12 · The `source` contract half is unenforced by the type and unconsumed by every mount — MINOR

```
PlaybackRibbon.vue:99-110
    // … Its time source is EITHER the selected channel's painting `animation` …
    // OR a progress-scalar `source` … At least one is required.
    animation?: KeyframesAnimation<any>;
    source?: { progress(): number; setProgress(t: number): void; duration?: number; };
```

"At least one is required" is prose. Both props are optional; the type admits `{}`. With neither supplied, `effectiveDuration` is `1`, the Slider is a 0-to-1 rail (see C-4), and `scrubTo` (`:181-200`) takes neither branch — it silently emits `scrubbed` and returns. A discriminated union (`{ animation: … } | { source: … }`) expresses the stated contract exactly and costs nothing.

Worse, the branch is **dead**: none of the three mounts passes `source` (`EasingScene.vue:96-108`, `SpringScene.vue:109-130`, `ChannelOptions.vue:378-397` — all pass `animation`). So ~15 lines of prose, a prop, a `??` fallback, and the `else if (source)` branch (`:195-200`) describe a capability the tree never exercises — and, per C-4, one that would not work if it did. Note `demo/components/instrument/transport/transportSource.ts:6` still narrates the channel-capable design, so prose and tree disagree here in the same way lane-frontend **S-2** documents for the tabs contract.

**Falsifier.** Dies if any consumer passes `source` — the mount census in §0 is exhaustive over `demo/`.

### C-13 · The ribbon's only child pierces the library's public boundary and evicts a global cache from a container observer — MINOR

```
AnimationVisualizer.vue:45   import { bumpLayoutEpoch } from "@src/animation/resolve/browser";
AnimationVisualizer.vue:79   useResizeObserver(containerEl, () => bumpLayoutEpoch());
```

`bumpLayoutEpoch` is **not** on the public surface:

```
$ grep -rn "bumpLayoutEpoch" src/
src/animation/resolve/browser.ts:17   export const bumpLayoutEpoch = (): number => {…}
src/animation/resolve/browser.ts:23   window.addEventListener("resize", bumpLayoutEpoch, { passive: true });
$ grep -rn "bumpLayoutEpoch" src/animation/index.ts src/index.ts   → (no output)
```

The demo reaches it via the `@src` alias — a path no published consumer of `@mkbabb/keyframes.js` could use. That matters for the *dogfooding* premise: the demo is the library's proving ground (lane-frontend §1, 68 engine-consuming files), and this is a capability the demo proves it needs and the package does not export.

Two further seams, both source-derived:

1. **What it does is global.** `bumpLayoutEpoch` resets the entire module-level cache — `browserScalarCache = new WeakMap()` (`browser.ts:18`) — for *every* animation in the app. Wiring that to a `ResizeObserver` on one decorative component's container means any size change of the visualizer's box (drawer open/close, pane collapse, scene swap, and every intermediate frame of `ChannelOptions.vue:552-560`'s `grid-template-rows` transition if the ribbon is in-flow) evicts the global scalar cache. The **frequency** and the resulting cost are livable-only — **UNPROVEN-NEEDS-LIVE**.
2. **The comment misattributes the symbol.** `AnimationVisualizer.vue:76-77` — *"Feed the genuine signal value.js exports for exactly this … the eviction policy stays ONCE in value.js"*. `bumpLayoutEpoch` is keyframes.js's own (`src/animation/resolve/browser.ts:17`); value.js supplies only the parse/predicate primitives it consumes (`browser.ts:1-3`: `isLayoutTrackingUnit`, `CssValue`, `parseCssScalar`). The DRY argument is sound; the ownership attribution is not.

**Falsifier.** Dies if `src/animation/index.ts` re-exports `resolve/browser` (the grep above says it does not), or if `bumpLayoutEpoch` scopes its eviction to the observed element (`browser.ts:17-20` replaces the whole WeakMap).

---

## 5. INFO

### C-14 · Both glass-ui imports resolve against an undeclared dependency (lane-frontend **F-1**)

```
PlaybackRibbon.vue:92   from "@mkbabb/glass-ui"
PlaybackRibbon.vue:94   from "@mkbabb/glass-ui/tooltip"
$ grep -n "glass-ui" package.json         → (no output;  only "@mkbabb/value.js": "4.0.0" at :69)
```

Confirming lane-frontend F-1 at this file: `@mkbabb/glass-ui` is absent from `package.json` and `package-lock.json` while 7.0.0 sits in `node_modules`. This component contributes 2 of the 82 census import lines. Adjacent, and not noted by F-1: glass-ui's peers include `"@mkbabb/keyframes.js": "^6.0.0"` and `"@mkbabb/value.js": "^4.0.0"` — the host is exactly `6.0.0` / `4.0.0`, so the peer graph *is* satisfiable; only the declaration is missing. No new defect here, one datum for the F-1 repair.

### C-15 · `isAnimStarted` is faked at 2 of 3 mounts; `userReversed` and `animation.reversed` are a dual authority

`isAnimStarted` drives the `is-disabled` class on both the rail (`:9`) and the visualizer (`:74`). Only the channel mount computes it (`useAnimationSync.ts:32,47` → `animation.started`); the scene mounts hardcode it:

```
demo/scenes/easing/EasingScene.vue:102   isAnimStarted: true,
demo/scenes/spring/SpringScene.vue:122   isAnimStarted: true,
```

So a prop that exists to express an engine state is, at two thirds of the call sites, a constant the caller must supply to opt out. Contract smell, not a failure.

Separately, the Reverse button's visual state reads the **prop** (`:58` `:aria-pressed="userReversed"`, `:66` the icon flip) while `scrubTo` reads the **engine flag** (`:183`). `usePlaybackToggle`'s own docstring explains why they are two things — *"the engine's own `reversed` flag also flips on alternate-direction wrap, so the UI needs a separate user-facing toggle"* (`usePlaybackToggle.ts:17-20`). On an `alternate`-direction animation the button therefore reads un-pressed on iterations where the math inverts. The math is *correct* under the effective-space convention (C-2); the label is what drifts. Worth a note only.

### Negative finding — the R1 parser-crash class is **not** reachable from this component

The commission asks for value.js transitive exposure "where reachable". Recording the negative, since it constrains the megatranche's R1 blast radius:

- **PlaybackRibbon imports no value.js.** `grep -n "value.js" PlaybackRibbon.vue` → 0.
- Its child imports one legal subpath: `AnimationVisualizer.vue:46` `import { clamp } from "@mkbabb/value.js/math"` — `./math` is a declared export of the installed value.js 4.0.0 (`Object.keys(exports)` → `./color ./value ./css ./easing ./math ./transform ./quantize`). Pure numeric; no parser.
- The *scrub* path does not parse. `scrubTo` emits `sliderUpdate` → the mounts route it to `setChildTime` / `scrubTo` (`demo/composables/scene-facility/index.ts:107`, `useSpringDemo.ts:281`), which seat a numeric clock. Keyframes are parsed at **ingest** (`fromString`), not per-seat; `src/animation/engine/interpolate.ts` contains no parse call, and its own floor note at `:63` records that "`fromString`/`parse()` NEVER throw".
- The color parser (`parseCssColor`) is reached only through `@mkbabb/value.js/color`, which is not in this component's import closure. `src/animation/resolve/browser.ts:3` pulls `parseCssScalar` from `/css` — a scalar parser — so R1's crash site is at most co-bundled, never invoked by a scrub.

**Falsifier.** Dies if `interpFrames` re-parses string keyframe values per seat, or if a mount's `sliderUpdate` handler re-ingests CSS — neither is true in the read set. This is a bundle-level co-residency, not a reachable crash.

---

## 6. Superlatives (L-18 both ways)

### L-1 · The `pointerType === "touch"` discrimination is exactly right — and rare

```
PlaybackRibbon.vue:167-179 + the 14-line rationale at :153-166
```

The claim in the comment — that `useTouchGate`'s first-tap-returns-`false` contract triggers on **desktop Chromium for a mouse**, because the gate's device test is `"ontouchstart" in window` — is verifiable and true:

```
node_modules/@mkbabb/glass-ui/dist/useTouchGate-B4mzQcHJ.js
    let o = r(!1), l = typeof window < "u" && "ontouchstart" in window, …
    function S(e, t) { return l ? (u = e, o.value ? (v(), !0) : (_(), f = !0, d = t, h.start(150), !1)) : !0; }
```

`l` is the only device gate, and it is a capability test that Chromium answers `true` on touch-capable desktops and under Playwright. Routing a mouse press through `S` would return `false` on the first press and swallow `useDragCapture`'s arming — hence no `acquireSelectSuppression()`, hence a desktop scrub that highlights everything it sweeps. The diagnosis is correct, the fix is minimal (branch on `pointerType`, not on the device), and it is **correctly scoped**: touch pointers still consult the gate. That is a better reading of the primitive than the primitive has of itself.

*Counter-weight:* the same wrapper's touch branch is inert for its stated purpose (C-5), and the class names it toggles do not exist (C-6). The mouse half is excellent; the touch half is unfinished.

### L-2 · The gesture/value split is the correct seam

```
PlaybackRibbon.vue:136-147   (the rationale) + :148-151 (the wiring)
```

`useDragCapture` owns the gesture (pointer capture, the global `body.is-dragging` select-suppression token, the move/up/cancel lifecycle) and the reka `<Slider>` keeps its own pointer→value geometry. The comment states the principle — *"the seam owns the GESTURE, the component owns the VALUE"* — and the code honours it: no `onMove` body re-derives the value. This is the correct way to layer a cross-cutting gesture concern over a design-system primitive without forking it, and it retired a raw `useEventListener(window, "pointerup", …)` plus a `sliderScrubActive` flag in the process. The vueuse-backed listeners inside `useDragCapture` (`useDragCapture.ts:60-64`) additionally auto-clean on scope dispose, closing the mid-drag-unmount leak the manual-remove path had.

Composition also verifies: the ribbon's capture-phase `setPointerCapture(wrapper)` is superseded by reka's own bubble-phase `target.setPointerCapture(event.pointerId)` (`SliderImpl.js:47-48`), but since reka's capture target is a descendant of the wrapper, the wrapper's `pointerup`/`pointercancel` listeners still receive the bubbled events — `scrubEnd` fires. The two capture calls do not fight.

*Counter-weight:* the seam it chose is pointer-shaped, which is precisely why C-3 (keyboard) falls outside it. `valueCommit` would have covered both.

### L-3 · A clean import boundary and a disciplined single-AT-slider decision

Three things this component gets right that its neighbourhood does not automatically:

- **Zero direct `reka-ui` imports.** reka is reached only through glass-ui. The one reka mention in the file (`:86-87`) is a comment explaining that the `.btn-playback*` global rules land on reka's generated DOM — an honest note about a soft coupling, not a breach. Corroborates lane-frontend **F-6** and **§3.4**.
- **No shadow component.** Unlike the S-1/S-3/S-4 family in lane-frontend's census, this ribbon does not fork a glass-ui primitive: it mounts the real `Slider`, the real `Button`, the real `Tooltip`. The one bespoke sibling it composes (`AnimationVisualizer`) has a genuine justification — it is the engine-dogfooding surface (`SmoothProgress`/`SpringProgress`/`RAFPlayback` at `AnimationVisualizer.vue:136-149`), the **S-8** disposition, not the S-1 one. Its hand-rolled inertia is three engine light-trackers, which is the demo's whole point.
- **Exactly one AT slider per scrub value.** `AnimationVisualizer.vue:2-7` `aria-hidden="true"` with a written rationale is the correct disposition for a redundant visual twin, and it is unusual to find it made deliberately rather than by omission.

*Counter-weight:* the single AT slider it so carefully preserved has a 1 ms step (C-4) and an unnamed thumb — the `<Tooltip>` at `:3-26` attaches its `aria-describedby` to the **wrapper `div`**, which is not focusable and is not the `role="slider"` element (`SliderThumbImpl.js:55-63`), so "Scrub animation timeline" never reaches the control it describes. The structure is right; the last inch is not.

---

## 7. Fold against the hitherto corpus

| lane id | this challenge |
|---|---|
| **F-1** (glass-ui phantom dep) | **Confirmed at file scope** — C-14. Adds: the peer graph *is* satisfiable (keyframes `6.0.0` vs peer `^6.0.0`; value.js `4.0.0` vs `^4.0.0`); only the declaration is missing. |
| **F-6** (glass boundary otherwise clean) | **Confirmed** — L-3. Adds one qualification: the boundary is clean at the *import* layer and pierced at the *CSS* layer, by this file, at `:238` (`:deep(.glass-slider[data-variant="standard"])`) — a documented, measured, specificity-correct reach into the vendor's internal element that nonetheless couples the demo to a prop default it never sets. |
| **§3.1** (21/73 subpaths; 31 root-barrel imports) | **Instantiated** — C-11 shows the two conventions two lines apart in one file, with `./button`, `./slider`, `./dom` all available. |
| **S-2** (glass contract adopted, renderer rejected; prose ≠ tree) | **Same pattern, different surface** — C-12: the `source` channel contract is documented in 15 lines and exercised by zero mounts, with `transportSource.ts:6` still narrating it. |
| **S-4** (`SequenceScrubber` → `ScrubberTimeline`/`Slider`, 162 L) | **Contradiction of emphasis.** The lane frames the *bespoke* scrubbers as the risk. This ribbon is the **non**-bespoke case — it consumes the real `Slider` — and it carries two BLOCKERs anyway (C-1, C-2). Adopting the primitive was necessary and not sufficient; the wave order at §10 should not assume a mechanical swap onto `Slider` yields a correct scrubber. |
| **S-8** (`TypingDots` justified bespoke) | **Extended** — `AnimationVisualizer` belongs in the same disposition for the same reason (engine dogfooding via `SmoothProgress`/`SpringProgress`/`RAFPlayback`), and should be marked **KEEP** if it is ever proposed for the S-3/S-4 timeline sweep. |
| **lane-library** (parse seams) | **Bounded** — the negative finding in §5: the R1 class is not reachable from this component's scrub path; only `@mkbabb/value.js/math` (`clamp`) is in the import closure, plus `parseCssScalar` co-bundled behind a deep internal import (C-13). |

---

## 8. Producer-side relay (per the standing BH/BI edict)

Two of the four MAJORs are glass-ui gaps, not demo bugs, and want a BH-inbox relay rather than a demo patch:

1. **`Slider` offers no scroll-gate seam.** It hard-declares `touch-action:none` on `.glass-slider` with no prop to soften it, so no consumer can implement tap-to-activate above it (C-5). A `scrollGate` / `touchAction` prop — or `useTouchGate` integration inside the primitive, which the package already owns — closes it for every consumer.
2. **`useTouchGate` ships behaviour with no styling contract.** It produces an `isActive` state and names no classes, so consumers invent `.touch-gate-target` / `.touch-gate-active` and define neither (C-6, 4 usages / 0 rules). Either emit `data-touch-active` on the gated element (the Slider already emits `data-touch-active` internally — `dist/slider-DDia69Fy.js`) and ship the rule, or document the expected selector.

Demo-side, in dependency order: **C-1** (unblocks correct scale) → **C-2** (unblocks correct direction) → **C-3/C-4** (unblocks keyboard) → the dead-surface sweep (C-8, C-9, C-10, C-12) → **C-11/C-13** (boundary hygiene). C-1 and C-2 are independent of each other and of everything else; both are single-seam fixes.

---

## 9. Method note

No file in `keyframes.js`, `glass-ui`, or `value.js` was written, mutated, or executed. No installs, no dev servers, no browser tooling. Every glass-ui and reka-ui fact is read from `/Users/mkbabb/Programming/keyframes.js/node_modules/` — the copy the demo actually boots against — so no claim depends on an upgrade. Three claims are marked **UNPROVEN-NEEDS-LIVE** and are flagged inline for the SS-13 visual audit: the perceived severity of C-4's keyboard traverse, C-5's observed mobile behaviour, and C-13's eviction frequency. Their underlying source facts (reka's `step` default, glass-ui's `touch-action` declaration, `bumpLayoutEpoch`'s global reset) are proven statically and stand on their own.
