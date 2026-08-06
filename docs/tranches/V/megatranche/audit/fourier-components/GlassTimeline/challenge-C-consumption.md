claude-opus-5[1m]

# CHALLENGE C — `GlassTimeline.vue` · CONSUMPTION axis

> **Subject** `fourier-analysis/web/src/components/visualization/GlassTimeline.vue` (127 lines)
> **Axis** C — how this component consumes value.js `0.13.0` (the F.W2 migration surface), keyframes.js
> `4.3.0`, glass-ui `^4.0.0`, and the fourier API's 45-operation surface; props/emits contract quality;
> integration seams.
> **Substrate** fourier `m/w1-bump-migration @ cd26c65` (28-path dirty WT — **the subject file is one of
> the 28**, see §0a) · value.js `tranche-u @ c654824e`. Installed: glass-ui 4.0.0 · keyframes.js 4.3.0 ·
> value.js 0.13.0 · reka-ui 2.9.10 · vue 3.5.38.
> **Method** static + source-derived only. Every producer claim is verified against the **installed**
> `node_modules` — `.d.ts`, compiled JS, and the compiled scoped CSS in `dist/glass-ui.css` — never
> against memory or a changelog. No browser. The one derived artifact I produced is a read-only
> `compileStyle()` run over the subject's own `<style scoped>` block (§5, C-16); nothing was written to
> any product tree.
> **Posture** the component is DEFECTIVE until the tree proves otherwise. Every row carries its own
> falsifier. L-18 runs both ways, so §7 books the six things I tried to break and could not.

**Read whole (read-only):** the subject; `stores/animation.ts`; `lib/easings.ts`;
`visualization/{AnimationControls,BasisCanvas}.vue` (its only consumer + the co-consumer of the axis it
scrubs); `visualization/lib/canvas-drawing/trail.ts`; `equation/convergence/ConvergenceTimeline.vue`
(the sibling fork); `src/style.css`; `web/package.json`; `web/e2e/*`. Inside
`web/node_modules/@mkbabb/glass-ui/`: `package.json` (exports + peers), `dist/slider.{d.ts,js}`,
`dist/slider-DQ95MET2.js` (the compiled `Slider`), `dist/components/ui/slider/{index,Slider.vue}.d.ts`,
`dist/timeline.js` (the compiled `GlassTimeline`/`ScrubberTimeline`/`SegmentedTimeline`/
`ContinuousTimeline`), `dist/components/custom/timeline/{index,GlassTimeline.vue,ScrubberTimeline.vue,
types}.d.ts`, `dist/dockContext-Bu1Avy-a.js`, `dist/dock.js`, `dist/glass-ui.css`,
`dist/styles/typography/{scale,utilities}.css`, `dist/styles/tokens/scheme-motion.css`. Inside
`web/node_modules/reka-ui/dist/Slider/`: `SliderRoot.js`, `SliderThumbImpl.js`, `SliderImpl.js`.
Inside `web/node_modules/@mkbabb/value.js/`: `package.json`.

---

## §0 — Ledger

| # | Severity | Row |
|---|---|---|
| **C-1** | **BLOCKER** | A press-and-release that does not change the value **never closes the scrub** — reka emits `valueCommit` conditionally. The clock parks forever and the canvas trail is reset every frame, permanently |
| **C-2** | **BLOCKER** | The keyboard axis is **inert during playback** — the state machine is pointer-only, so an arrow-key seek is clobbered by the rAF clock within one frame. The docblock credits the keyboard contract it fails to wire |
| C-3 | MAJOR | The caret's **number** and the caret's **position** are computed from two different store axes (`easedT` vs `t`) — they diverge by up to 10.4 pp on the default easing, 6 px apart on screen |
| C-4 | MAJOR | `--slider-scrub-track-height` is dead at 4.0.0 — **and 24 px is inexpressible through the producer's API at all**: the correct token loses on specificity and the `size` ladder is 12/20/28 |
| C-5 | MAJOR | The fork is a **byte-level copy of the producer's own `ScrubberTimeline` scoped CSS**, with four token regressions introduced on the copy |
| C-6 | MAJOR | The docblock's producer claims are false at 4.0.0: `standard` ships **no thumb and no halo**. The migration deleted the thumb affordance the pre-migration recipe had |
| C-7 | MAJOR | Caret visibility was re-pointed from a self-referential `:has(.glass-track:active)` to a **dock-global, reference-counted** `:has(.glass-slider[data-held])` raised by ≥3 unrelated sources |
| C-8 | MAJOR | The fork introduces a **1 % quantization the primitive does not have**, and its 100 steps bear no relation to the API's `levels` ladder |
| C-9 | MAJOR | **No value contract** — no `modelValue`, no emits, a hard `useAnimationStore()` bind. The tree paid for that with a **second 146-line fork** of the same primitive |
| C-10 | MAJOR | `aria-label="Timeline"` lands **twice** in the DOM — once on a role-less `<span>`, where ARIA prohibits it |
| C-11 | MINOR | `:min="0" :max="100" :step="1"` restate reka's own defaults verbatim |
| C-12 | MINOR | The `[0,1]` clamp is applied twice — once in the setter, once in `seek()` |
| C-13 | MINOR | The `computed` returns a fresh array on a 60 fps dependency, re-rendering the Slider subtree every frame for a value that changes ≤100×/cycle |
| C-14 | MINOR | `label` is **required** where the producer's is optional and `v-if`-guarded; the caret chip renders unconditionally |
| C-15 | MINOR | The caret is positioned against the **padding box** while the track fills the content box — a ±4 px skew. **Inherited from the producer**; a BH/BI relay item, not a fork defect |
| C-16 | MINOR | The scoped block keys off `.timeline-row` — **the producer's own class name, left unscoped** by Vue's transform. A latent collision the moment F.W3 lands the real primitive |
| C-17 | MINOR | A local `scrubbing` ref shadows `anim.scrubbing` by name with a different lifetime; the store's copy is the one `BasisCanvas` reads |
| C-18 | MINOR | Zero value.js and zero keyframes.js consumption at the file; the only edge is transitive, and it is to the axis this component does **not** read |
| C-19 | INFO | The surface has **no test of any kind** — zero e2e hits, and `web/` has no unit runner at all |
| C-20 | INFO | Fold — the repo-level `npm ls` gate is RED; re-measured here, not re-scored |
| C-21 | INFO | Fold of intake **R6-8** — the payloads this component's axis indexes inherit the non-isolable operation↔client property |

**21 findings · 2 BLOCKER · 8 MAJOR · 8 MINOR · 3 INFO · 6 superlatives (§7).**

### §0a — Provenance note: the subject is dirty, and the diff is load-bearing

`git status --porcelain` lists the subject among 28 dirty paths. The uncommitted diff is **two lines**:

```diff
- * legacy string-key dock injects) to `<Slider variant="glass-scrubber">`.
+ * legacy string-key dock injects) to `<Slider variant="standard">`.
@@
-            variant="glass-scrubber"
+            variant="standard"
```

The same working tree bumps `web/package.json` `@mkbabb/glass-ui` `^3.1.0 → ^4.0.0`,
`@mkbabb/keyframes.js` `^2.2.0 → ^4.3.0`, `@mkbabb/value.js` `^0.10.0 → ^0.13.0`. So **the F.W1 uplift
is in flight in this very file**, and it renamed the variant token in two places and stopped. Four
consequences of that half-migration are booked below as C-4, C-5, C-6 and the stale prose at `:120-123`.
This is the sharpest fact in the lane: the uplift's own edit window is where the drift entered, which
means it is cheap to close and expensive to leave.

The file's committed history is short: `9146d3f` (timeline introduced), `335d8f7`, `84d3cd0`,
`4df1a06` (2026-05-16, *"P.W5-B glass-ui CR-2 cross-walk … GlassScrubber adoption"* — the commit that
introduced `--slider-scrub-track-height`), `262c3d0` (2026-06-02, 3.1.0 adoption).

---

## §1 — value.js consumption (0.13.0 pinned — the F.W2 surface)

### C-18 · MINOR — the file's value.js edge is transitive, and it points at the axis it does not read

`grep -rn "@mkbabb/value.js" web/src` → **5 statements / 4 files**, exactly as
`CENSUS-2026-08-03.md` §1 records. **None of them is this file.** The subject's only value.js edge is:

```
GlassTimeline.vue:22  →  @/stores/animation
stores/animation.ts:7 →  @/lib/easings
lib/easings.ts:9,10-16 → @mkbabb/value.js   (timingFunctions, easeInOutSine, …Cubic, …Quad, …Expo, …Circ)
```

That edge terminates in `ANIMATION_EASINGS` (`easings.ts:73-80`), which the store applies at
`animation.ts:27-30` to produce `easedT`. **`GlassTimeline` reads `anim.t` and never `anim.easedT`**
(`:36`, `:62`). So the component sits one hop from a value.js function that governs what the user sees,
consumes the *other* side of it, and renders — inside its own caret — a label computed from the eased
side. That is C-3, and it is the whole value.js story of this file.

**Falsifier** — show a value.js symbol reachable from this component that it actually consumes.
`grep -rn "anim\.t\b\|anim\.easedT" web/src` → 14 sites; the subject holds two, both `anim.t`.

### CONTRADICTION (explicit) — the bare specifier is correct at the pin

`CENSUS-2026-08-03.md` §1 characterises the five value.js sites as *"bare-root specifiers that 4.0.0 no
longer exports"* and §4 F.W2 schedules *"5 bare specifiers → `/easing`"*. Against the installed tree
that reads as a present-tense defect and is not one. `node_modules/@mkbabb/value.js/package.json`
declares **exactly one** export condition:

```json
"exports": { ".": { "types": "./dist/index.d.ts", "import": "./dist/value.js", "default": "./dist/value.js" } }
```

There is no `./easing` subpath at 0.13.0. `easings.ts:9,10-16` are correct as written; the F.W2
migration is a *consequence* of the version uplift, not an independent consumption defect, and must not
be scored as one against the current tree. I reach the same verdict as the AnimationControls lane by
the same measurement, independently.

### C-20 · INFO — fold: the repo-level pin graph does not close

Re-measured in `web/`, exit non-zero:

```
$ npm ls @mkbabb/value.js
├─┬ @mkbabb/glass-ui@4.0.0
│ └── @mkbabb/value.js@0.13.0 deduped invalid: "^0.10.0 || ^0.11.0" from node_modules/@mkbabb/glass-ui
├─┬ @mkbabb/keyframes.js@4.3.0
│ └── @mkbabb/value.js@0.13.0 deduped invalid: "^0.10.0 || ^0.11.0" from node_modules/@mkbabb/glass-ui
└── @mkbabb/value.js@0.13.0 invalid: "^0.10.0 || ^0.11.0" from node_modules/@mkbabb/glass-ui
npm error code ELSPROBLEMS
```

glass-ui 4.0.0 peers `"@mkbabb/value.js": "^0.10.0 || ^0.11.0"` (optional); keyframes.js 4.3.0 hard-depends
`^0.13.0`. Disjoint. This is a repo-level supply-chain gate already booked BLOCKER by the
AnimationControls lane; I **confirm it and decline to re-score it** so the megatranche does not
double-count one defect across 66 component files. What is *new here*: every producer paint this
component mounts — the entire `Slider` `standard` recipe — is running against a value.js two minors
ahead of anything glass-ui declares support for, and the `standard` recipe's sibling `spectrum` is
documented as *"the value.js gradient-track color slider"* (`ui/slider/index.d.ts:26`), i.e. the Slider
family is one where the peer actually matters.

---

## §2 — keyframes.js 4.3.0 consumption

### C-2 · BLOCKER — the keyboard axis is inert during playback, and the docblock credits it anyway

The docblock (`:8-10`) claims the variant ships *"focus ring, ARIA wiring, and **keyboard step**"*. It
does — reka's `SliderRoot` wires `onStepKeyDown` (`SliderRoot.js:167-177`) and `onHomeKeyDown` /
`onEndKeyDown` (`:165-166`), all of which call `updateValues(..., { commit: true })`. **The component
does not consume any of it.**

The scrub state machine has exactly one opener:

```ts
49: function onPointerDown() { onValueCommitStart(); }     // → anim.startScrub() → stopRAF()
53: function onValueCommit() { if (!scrubbing.value) return; … anim.endScrub(); }
```

`@pointerdown` is a pointer event. A keyboard user who focuses the thumb and presses `ArrowRight`
takes this path:

1. reka `updateValues(value + step, atIndex, { commit: true })` → `modelValue` changes → `tArr` setter →
   `anim.seek(next)` → `t.value = next` (`animation.ts:128-130`).
2. reka also emits `valueCommit` (`SliderRoot.js:128`) → `onValueCommit` → **`scrubbing.value` is
   `false`, so it early-returns at `:54`.** `startScrub` was never called.
3. `stopRAF()` was therefore never called, so the clock is still running. `startLoop`'s `tick`
   (`animation.ts:58-72`) computes `t` **purely from `startTime`**, which was anchored once at
   `:63` (`if (startTime === null) startTime = now - t.value * dur`) and is never re-anchored.
   The next frame overwrites the user's seek: `t.value = cycle % 2 === 0 ? frac : 1 - frac`.

**Failure scenario (exact)** — press Play. Tab to the timeline. Press `ArrowRight` twenty times. `t`
is written twenty times and clobbered twenty times, each within ≤16.7 ms. The slider is visually
unchanged; the animation is unchanged; nothing happens. The only functioning path to this control is a
pointer.

**Falsifier** — show a second opener. `grep -n "startScrub" web/src` → **two** hits:
`animation.ts:116` (the definition) and `GlassTimeline.vue:46`, reached only from `onPointerDown`.
Or show that `startLoop` re-reads `t` after anchoring — it does not; `startTime` is a closure `let`
assigned once per loop (`animation.ts:55,63`).

**Severity BLOCKER** — WCAG 2.1.1: the sole keyboard-operable path to the component's only control is
non-functional in the state the control exists to serve. It is also the one contract the file's own
docblock advertises.

**Honest scoping (this survives the F.W3 migration).** The upstream `ScrubberTimeline` has the same
shape — its `onKeydown` handler (`timeline.js`, `function p(e)`) emits `update:modelValue` and emits
**neither** `scrubStart` nor `scrubEnd`. So migrating to `glass-ui/timeline` does not fix this. The
defect lives at the *seam*: `stores/animation.ts` exposes a pointer-shaped scrub contract
(`startScrub`/`endScrub`) with no keyboard-shaped equivalent, and either timeline must adapt to it.
I state this so the wave does not book C-2 as discharged by C-5's migration.

### C-18 (keyframes half) · MINOR — zero keyframes consumption in a component whose whole job is a clock

`grep -rn "@mkbabb/keyframes" web/src` → 2 hits: `composables/useFourierMorph.ts:14` (a live import)
and `stores/animation.ts:47` — a **comment recording the deletion**: *"The previous incarnation
imported `Animation` from `@mkbabb/keyframes.js` … Dead substrate excised."* This component is the UI
of the clock that excision produced. Its two most consequential defects (C-2's un-seekable playback,
and the ping-pong reset in §5) are properties of the hand-rolled rAF, and keyframes 4.3.0 — installed,
declared, live elsewhere in the same tree — ships `setDirection`, the `alternate` direction, `play`/
`pause`, a seek, and a documented velocity-continuous interruption path. I do not re-score the engine
choice (the AnimationControls lane books it); I book that **this component is where the cost is paid at
the UI**, because it is the surface that must open and close a scrub against a clock that has no scrub
concept of its own.

---

## §3 — glass-ui ^4.0.0 consumption

Adoption is nominally correct: `@mkbabb/glass-ui/slider` is a real subpath
(`package.json exports["./slider"] → dist/slider.js`), `Slider` is a real export
(`dist/slider.js:2`), and `variant="standard"` is a real variant
(`ui/slider/index.d.ts:43` — `"standard" | "spectrum"`). What follows is where the adoption is one
layer thinner than it reads.

### C-1 · BLOCKER — the scrub opens unconditionally and closes conditionally

The component's entire scrub lifecycle is:

```ts
43: function onValueCommitStart() { if (scrubbing.value) return; scrubbing.value = true;  anim.startScrub(); }
49: function onPointerDown()      { onValueCommitStart(); }
53: function onValueCommit()      { if (!scrubbing.value) return; scrubbing.value = false; anim.endScrub(); }
```

`@pointerdown` (`:73`) fires on **every** press. `@value-commit` (`:74`) fires only when reka decides to
emit it — and reka's emission is **conditional on the value having changed**:

```js
// reka-ui/dist/Slider/SliderRoot.js:114-119
function handleSlideEnd() {
    const prevValue = valuesBeforeSlideStartRef.value[valueIndexToChangeRef.value];
    const nextValue = currentModelValue.value[valueIndexToChangeRef.value];
    const hasChanged = nextValue !== prevValue;
    if (hasChanged) emits("valueCommit", toRaw(currentModelValue.value));
}
```

`valuesBeforeSlideStartRef` is snapshotted on pointerdown (`:159-161`). So when
`prevValue === nextValue`, **no `valueCommit` is emitted and the scrub never closes.**

**Failure scenario A (one click, permanent).** The animation is playing. The user presses on the
timeline at the position the fill has already reached — the natural gesture for "grab the playhead" —
and releases without moving. Sequence:

- `onPointerDown` → `scrubbing = true` → `anim.startScrub()` → `stopRAF()` (`animation.ts:116-119`).
  The clock is now parked. `playing` is still `true`, so `AnimationControls`' transport still renders
  the pause glyph.
- reka snaps the pointer position to `step: 1` over `max: 100`. At the playhead, that snaps to the value
  already in the model. `hasChanged === false` in `updateValues` (`:127`), and again in `handleSlideEnd`.
- **No `valueCommit`.** `onValueCommit` never runs. `scrubbing` (local) stays `true`; `anim.scrubbing`
  (store, `animation.ts:114`) stays `true`; `endScrub()` — the only caller of `startLoop()` on this
  path — never runs.

The animation is now frozen while claiming to play. And it is worse than frozen, because
`anim.scrubbing` is **read by the renderer**:

```ts
// BasisCanvas.vue:144, :329
trail.update(anim.t, tip[0], tip[1], anim.scrubbing, components);

// lib/canvas-drawing/trail.ts:48-52
if (scrubbing || t < this.lastT - 0.01) {
    this.x.length = 0;
    this.y.length = 0;
    …                       // re-seed from the precomputed table, or re-evaluate the Fourier sum
```

With `scrubbing` stuck `true`, **every** frame takes the reset branch: the accumulated trail is
discarded and rebuilt from scratch, forever. The tool's core artifact — the traced curve — can never
accumulate again for the life of the page.

**Failure scenario B (drag out and back).** Press, drag to 40 %, drag back to the origin step, release.
`prevValue === nextValue` at slide end → same terminal state. This is a *common* gesture ("let me look
and put it back").

**Recovery** requires either a subsequent scrub that does change the value (which finally emits
`valueCommit` and closes the stale scrub) or a full pause→play cycle (`pause()` clears nothing, but
`play()` calls `startLoop()` directly, `animation.ts:84-88`). Neither is discoverable from the frozen
state.

**Falsifier** — show `valueCommit` emitted unconditionally on slide end, or a second close path.
`SliderRoot.js:118` is guarded by `if (hasChanged)`; `grep -n "endScrub" web/src` → 2 hits
(`animation.ts:121` definition, `GlassTimeline.vue:56`), and the one call site is behind
`if (!scrubbing.value) return`. To falsify you would also have to show that `startScrub` is idempotent
in a way that self-heals — it is not: it sets a boolean and calls `stopRAF()`.

**Severity BLOCKER** — one ordinary click, no modifier, no edge case, produces an unrecoverable-looking
freeze plus a permanent renderer degradation, on the component's only control.

**Corroboration, and the reason this is a family defect:** the sibling fork
`equation/convergence/ConvergenceTimeline.vue:46-56` is the same state machine — `onPointerDown` opens
unconditionally, `onValueCommit` closes conditionally — over the same `<Slider variant="standard">`.
Same bug, second site. Fixing one does not fix the other, which is C-9.

### C-4 · MAJOR — the height override is dead, and the height the author wanted is unreachable

`:124-126`:

```css
.timeline-slider { --slider-scrub-track-height: 24px; }
```

Measured over the whole installed producer:
`grep -ro "slider-scrub-track-height" node_modules/@mkbabb/glass-ui/dist | wc -l` → **0**.
The complete `--slider-*` surface at 4.0.0 is ten tokens: `--slider-range-{bg,blur,shadow}`,
`--slider-thumb-{bg,border-color,shadow,size,spring}`, `--slider-track-{bg,height}`.

The AnimationControls lane books this as *"the intended knob is `--slider-track-height`"*.
**I contradict that remedy.** `--slider-track-height` is set by the producer on the same element the
consumer class lands on:

```css
/* dist/glass-ui.css */
.glass-slider[data-size=md][data-v-534634a7]{--slider-track-height:1.25rem;--slider-thumb-size:1rem}
```

Specificity `(0,3,0)` — one class + two attribute selectors. The consumer's scoped rule compiles to
`.timeline-slider[data-v-xxxxxxxx]`, specificity `(0,2,0)`. Neither stylesheet is layered
(`grep -o "@layer" dist/glass-ui.css` → 0 hits; `src/style.css` declares `@layer base` only, and this
rule is outside it). **The producer wins the cascade**, so writing the *correct* token name at the root
would not work either. The sanctioned knob is the `size` prop, whose ladder is
`sm 0.75rem / md 1.25rem / lg 1.75rem` = **12 / 20 / 28 px**. The author's 24 px is not on the ladder.

**Failure scenario** — the track renders at 20 px, not the 24 px the author specified and not the 24 px
the pre-migration recipe had (`.glass-track[data-v-a206e2d2]{…height:24px…}`, verbatim in
`dist/glass-ui.css`). The timeline lost 4 px of height in the P.W5 migration and the compensation has
never applied. Silent: no build error, no lint, no test.

**Falsifier** — `grep -r "slider-scrub-track-height" node_modules/@mkbabb/glass-ui/` (empty), or show
the consumer rule outranking `[data-size=md][data-v-534634a7]` (it does not), or show 24 px in the
`size` ladder (it is not there).

**Honest scoping** — whether `--slider-scrub-track-height` was live at glass-ui **3.1.0** (the committed
pin, against which the token was authored on 2026-05-16) is **not verifiable from this tree**; 3.1.0 is
not installed. That does not weaken the row, it re-frames it: the uncommitted uplift renamed
`variant="glass-scrubber"` → `"standard"` in two places (§0a) and **left the variant's token behind**.
This is a half-completed migration, and §0a proves the edit window.

### C-5 · MAJOR — the fork is a byte-level copy of the producer's own SFC, de-tokenized on the way

`lane-frontend.md:401-403` books the local `GlassTimeline` as *"name-identical, zero-import: the
strongest shadow signal in the tree"* and hedges — *"a **partial** re-fork"*. The AnimationControls
lane sharpens that to an API-shape match. **I close it completely, at the byte level.** The producer's
compiled scoped CSS for `ScrubberTimeline` (`dist/glass-ui.css`, scope `data-v-a206e2d2`) and this
file's `<style scoped>` are the same stylesheet:

| producer `ScrubberTimeline` (`dist/glass-ui.css`) | fork (`GlassTimeline.vue`) | verdict |
|---|---|---|
| `.timeline-row{flex:1 1 0;align-items:center;min-width:0;padding:0 .25rem;display:flex;position:relative}` | `:81-88` — same six declarations, same values, same `0.25rem` | **identical** |
| `.timeline-caret{pointer-events:none;opacity:0;transition:opacity var(--duration-fast) var(--ease-standard);z-index:var(--z-popover);user-select:none;position:absolute;bottom:calc(100% + 6px);transform:translate(-50%)}` | `:90-100` — same, except `transition: opacity 0.2s ease` | **de-tokenized ×1** |
| `.timeline-row:hover .timeline-caret{opacity:1}` | `:102` | **identical** |
| `.timeline-row:has(.glass-track:active) .timeline-caret{opacity:1}` | `:103` → `:has(.glass-slider[data-held])` | **re-pointed — C-7** |
| `.caret-value{font-size:var(--type-small);color:var(--popover-foreground);background:var(--popover);border:1px solid var(--border);border-radius:var(--radius-sm);box-shadow:var(--shadow-sm);white-space:nowrap;padding:.125rem .375rem;font-weight:500;display:block}` | `:107-118` — same nine declarations; `@apply text-base`, `border-radius:0.25rem`, `box-shadow:0 2px 6px rgba(0,0,0,0.1)` | **de-tokenized ×3** |
| `.glass-track{…height:24px;background:var(--surface-tint-6);backdrop-filter:var(--glass-blur-wash)…}` | replaced by `<Slider variant="standard">` + the dead token | **C-4** |

And the template: the producer's compiled `ScrubberTimeline` render emits
`class="timeline-row"` → `class="timeline-caret" style="left: modelValue*100 + '%'"` →
`<span class="caret-value fira-code">{{ label }}</span>`. The fork's `:61-64` is that markup, character
for character, **including the `fira-code` utility class**. The docblock's claim that it *"migrated from
the 175 LOC shadow recipe … `glass-track`/`glass-fill`/`glass-thumb` paints"* is exactly right about
what happened and exactly wrong about what it was: those three class names are the producer's own
`ScrubberTimeline` internals. **The "shadow recipe" was the primitive.**

The four token regressions are the substantive cost:

1. `font-size: var(--type-small)` → `@apply text-base`. `--type-small` is
   `clamp(0.875rem, 0.8rem + 0.25vw, 1.25rem)` (`styles/typography/scale.css:105-109`) — 14 px floor,
   fluid to 20 px. `text-base` is a static `1rem`. The caret label is 14 % larger than the design system
   specifies at the floor and **stops scaling** at every viewport above it.
2. `border-radius: var(--radius-sm)` → `0.25rem`.
3. `box-shadow: var(--shadow-sm)` → `0 2px 6px rgba(0,0,0,0.1)` — a raw rgba literal, which cannot
   respond to the dark scheme.
4. `transition: opacity var(--duration-fast) var(--ease-standard)` → `0.2s ease`. `--duration-fast` is
   `0.2s` (`styles/tokens/scheme-motion.css:67`), so the duration is numerically right today and
   pinned; `--ease-standard` (`:216`) is replaced by the CSS `ease` keyword.

**This contradicts the AnimationControls lane's S-3** (*"Zero hand-rolled motion constants … not one
bezier literal"*), which cites `GlassTimeline.vue:65`'s `--z-popover` as evidence. The `--z-popover`
observation is correct (I re-confirm it as S-4 below). But nine lines up, `:96` hard-codes a duration
*and* an easing keyword where the producer's own source for the same rule uses two tokens. S-3 is true
of what it sampled and false as a file-level claim.

**Falsifier** — `grep -o "a206e2d2[^,{]*{[^}]*}" node_modules/@mkbabb/glass-ui/dist/glass-ui.css`
prints the producer's block; diff it against `GlassTimeline.vue:79-126`. To falsify you would have to
show the two stylesheets diverging in structure rather than in tokens. They do not.

### C-6 · MAJOR — the docblock describes a variant that does not exist at 4.0.0

`:8-9`: *"The variant ships the **3-layer track + thumb + halo paints**, the dock keep-open contract …"*
`:120-123`: *"Retint the **glass-scrubber** variant tokens …"*.

Against the installed producer, both are false, and §0a shows why: the uplift renamed the variant in
the two places a compiler would have caught and left the two places it would not.

- **There is no `glass-scrubber` variant at 4.0.0.** `sliderVariants` declares
  `variant?: "standard" | "spectrum"` (`ui/slider/index.d.ts:43`).
- **`standard` ships no thumb.** `dist/glass-ui.css`:
  `.slider-thumb[data-v-534634a7]{width:0;height:var(--slider-track-height,.375rem);opacity:0;box-shadow:none;background:0 0;border:none;display:block}`.
  The producer's own doc says so in terms: *"the CONTINUOUS GLASS CYLINDER with **NO VISIBLE THUMB AT
  ALL** … The reka `<SliderThumb>` STAYS MOUNTED … but paints INVISIBLE: width 0, opacity 0"*
  (`ui/slider/index.d.ts:13-25`).
- **`standard` ships no halo.** The halo rule is variant-gated to `spectrum`:
  `.glass-slider[data-variant=spectrum][data-held] .slider-thumb{box-shadow:0 0 0 6px var(--surface-tint-15),…}`.
  `standard`'s held affordance is a 2 px ring on the **range**, not a halo on a thumb:
  `.glass-slider:not([data-variant=spectrum])[data-held] .slider-range{…0 0 0 2px var(--surface-tint-15)}`.

**Failure scenario** — the migration **removed an affordance**. The pre-migration recipe painted a
visible handle on hover (`.glass-track:hover .glass-thumb{opacity:1;background:var(--surface-tint-40);width:8px;height:18px}`,
still shipping in `dist/glass-ui.css` as the producer's `ScrubberTimeline`). `standard` has no handle
at any state. The only remaining position indicators are the fill edge and the fork's own caret — and
the caret is `opacity: 0` except on hover or dock-hold (`:102-105`). At rest, during playback, with no
pointer over the dock, **there is no thumb, no caret, and the sole playhead indicator is the fill
edge.** Whether that reads as a regression on screen is `UNPROVEN-NEEDS-LIVE` (SS-13); the deletion of
the thumb paint is provable statically and is what I assert.

**Falsifier** — show a `glass-scrubber` variant, or a non-zero `.slider-thumb` width outside
`[data-variant=spectrum]`, in the installed dist. Neither exists.

### C-7 · MAJOR — a self-referential predicate replaced by a dock-global, reference-counted one

`:102-105`:

```css
.timeline-row:hover .timeline-caret,
.timeline-row:has(.glass-slider[data-held]) .timeline-caret { opacity: 1; }
```

The producer's second arm is `:has(.glass-track:active)` — *"this track is being pressed"*, a fact about
the element itself. The fork's is `data-held`, which the compiled `Slider` defines as:

```js
// slider-DQ95MET2.js
let j = r();                                   // injectOptionalDockContext()
let R = a(() => j?.held.value === !0);          // …
"data-held": R.value || void 0,
```

`held` is the **dock's** hold state, and it is a **reference count** — `dock.js`:
`function I(){ p.value++; w(); }` (keepOpen) / `function L(){ p.value = Math.max(0, p.value-1); … }`
(release), exposed to descendants as `{ keepOpen: L, release: R, held: O }`. Three things follow:

1. **It is not about this slider.** Any descendant that acquires the dock hold raises it. In the
   installed dist, three modules call `keepOpen`: `slider-DQ95MET2.js` (this slider's own drag),
   `dock.js`'s `dock-layer-group` (`function b(){ y.value || (y.value = !0, r?.keepOpen()); }`, released
   on the complementary leave handler), and `HoverPopover-Dpzwvc4t.js`. Two of those are not this
   component. The caret can therefore light while nothing is being scrubbed.
2. **It is null outside a dock.** `j?.held` — if the component is ever mounted outside `<GlassDock>`,
   the second arm is permanently false and the caret is hover-only. Today the sole mount is inside
   `AnimationControls`' `GlassDock` (`AnimationControls.vue:91`), so this is latent, not live. But it
   is exactly the coupling that made a *second* fork necessary for the non-dock site (C-9): the sibling
   `ConvergenceTimeline.vue:9-12` documents having to reason about precisely this — *"this site isn't a
   `<GlassDock>` descendant … the variant's internal `useOptionalDockContext()` resolves to `null`"*.
3. **It is coarser than the thing it replaced.** `:active` is per-element and instantaneous;
   `held` is per-dock and reference-counted with an 800 ms-capped release timer on the dock's own
   collapse path (`dock.js`: `f = setTimeout(…, Math.min(t, 800))`).

Whether a live dock hover lights the caret is `UNPROVEN-NEEDS-LIVE` (SS-13). The **widening of the
predicate from element-local to dock-global** is provable statically and is what I assert.

**Falsifier** — show `data-held` reflecting the slider's own drag rather than the dock's counter.
`slider-DQ95MET2.js` derives it solely from `j?.held.value`; the slider's own touch state is a separate
attribute (`data-touch-active`) which this rule does not use — and which would have been the correct
element-local hook.

**Fold** — `lane-frontend.md:382` calls `GlassTimeline.vue:103` *"the one live `glass-*` selector"* in
the tree. **CONFIRMED** against the producer dist (`glass-slider` × 17, `data-held` × 15 in
`dist/`), and **AMENDED**: it is live, and it is live on the wrong axis.

### C-8 · MAJOR — a 1 % quantization the primitive does not have, on a ladder it does not match

`:35-41` + `:65-75`:

```ts
const tArr = computed<number[]>({
    get: () => [Math.round(anim.t * 100)],
    set: (arr) => { anim.seek(Math.max(0, Math.min(1, (arr[0] ?? 0) / 100))); },
});
```
```html
<Slider v-model="tArr" :min="0" :max="100" :step="1" />
```

The justification is at `:32-34`: *"reka-ui's SliderRoot uses integers"*. **That is false.**
`SliderRoot.js:58-62` declares `step: { type: Number, default: 1 }` — a `Number`, not an integer — and
`updateValues` explicitly handles fractional steps: `const decimalCount = getDecimalCount(step.value);
const snapToStep = roundValue(Math.round((value - min)/step)*step + min, decimalCount)`
(`:121-122`). A `step` of `0.001` works. The producer's own `ScrubberTimeline` takes
`modelValue?: number` as a raw normalized `0..1` float and applies no quantization at all
(`ScrubberTimeline.vue.d.ts:12-13`; its keyboard handler steps by `0.01` / `0.1` on shift).

Two costs, one of which the AnimationControls lane did not reach:

**(a) Resolution.** `duration = 20000 ms` (`animation.ts:23`), so one step is **200 ms** of animation.
No frame between two steps is addressable.

**(b) The step ladder is unrelated to the data ladder** — this is the API-consumption half.
The `t` axis exists to index server payloads: `basesData.levels` and
`epicycleData.components`, fetched by `computeBases` / `computeEpicycles`
(the two `POST /api/contours/{hash}/compute/*` operations of the 45-operation surface). The mapping is
`AnimationControls.vue:44` `pos = easedT * (levels.length - 1)` and
`BasisCanvas.vue:231,239`. **100 fixed steps over an `N`-element ladder** means:

- `levels.length > 101` → some levels are unreachable by scrubbing. The user cannot select them.
- `levels.length < 101` → the ladder is over-sampled and consecutive steps are visually identical.
- `levels.length === 101` → coincidence.

Neither the component nor the store consults the payload length. The scrub granularity is a constant
where the domain is server-determined.

**Falsifier** — show reka rejecting a fractional `step` (`SliderRoot.js:121-122` handles it), or show
the step count derived from the payload (`grep -n "levels\|components" GlassTimeline.vue` → no match —
the component never sees the payload at all).

### C-10 · MAJOR — `aria-label` lands twice, once where ARIA prohibits it

`:71` passes `aria-label="Timeline"`. The producer consumes it **explicitly**:

```js
// slider-DQ95MET2.js — the v-for over modelValue
c(h(b), { key: t, "aria-label": n.$attrs["aria-label"] ?? void 0,
          class: "slider-thumb glass-specular-track touch-hit-area" })
```

and **also implicitly**: the compiled `Slider` sets no `inheritAttrs: false`, so Vue's automatic
fallthrough merges `$attrs` — including `aria-label` — onto its single root vnode, which is
`SliderRoot`. `SliderRoot` is `inheritAttrs: false` but re-merges explicitly
(`SliderRoot.js:149` `mergeProps(_ctx.$attrs, {…})`) down to `SliderHorizontal` → `SliderImpl` →
`Primitive`, whose `as` defaults to `"span"` (`SliderRoot.js:77-81`). `SliderImpl.js` sets **no
`role`** (`grep -n "role" SliderImpl.js` → no match; the only `role: "slider"` in the family is
`SliderThumbImpl.js:55`).

**Result:** `<span class="glass-slider …" data-slot="slider" aria-label="Timeline">` wrapping
`<span role="slider" aria-label="Timeline" aria-valuenow=… tabindex="0">`. The outer element maps to
the `generic` role, on which ARIA prohibits accessible names. The exact axe rule that fires
(`aria-prohibited-attr`, serious) is `UNPROVEN-NEEDS-LIVE` for SS-13; the **duplication and the
role-less host** are provable statically and are what I assert.

This is a producer trap rather than a consumer blunder — omitting `aria-label` would leave the slider
unnamed, so there is no correct consumer move — which is why it belongs in the **BH/BI relay** (the
standing per-component glass-ui relay invariant), not only in the fourier wave. The sibling fork walks
into a worse version of the same trap: `ConvergenceTimeline.vue:75-77` passes `:aria-valuenow`,
`aria-valuemin`, `:aria-valuemax` on the `Slider`, and **only `aria-label` is forwarded to the thumb** —
so those three land on the role-less outer span while the real `role="slider"` element carries reka's
own `0..100` values. Two conflicting value sets in one widget.

**Falsifier** — show `inheritAttrs: false` on glass-ui's `Slider` (absent from the compiled
`defineComponent` options), or a `role` on `SliderImpl`'s host (absent).

---

## §4 — fourier API consumption (the 45-operation surface)

### C-3 · MAJOR — the caret's number and the caret's position come from different axes

The store exposes **two** time axes (`animation.ts:145`): `t` (raw) and `easedT`
(`computed(() => ANIMATION_EASINGS[easing].fn(t))`, `:27-30`). The tree splits them deliberately:

| consumer | axis | what it drives |
|---|---|---|
| `BasisCanvas.vue:140,322` | `anim.t` | `fourierPositionsAt(components, anim.t, …)` — the epicycle **tip trajectory** |
| `BasisCanvas.vue:196,231,239` | `anim.easedT` | the **harmonic level** `N` actually drawn |
| `AnimationControls.vue:44,47` | `anim.easedT` | `currentLevel` |
| `AnimationControls.vue:53` | `anim.t` | the epicycle-only label `t = …` |
| **`GlassTimeline.vue:36,62`** | **`anim.t`** | the slider model **and** the caret's `left` |

`AnimationControls.vue:91` passes `:label="caretLabel"`, and `caretLabel` (`:52-54`) is
`` `N = ${currentLevel}` `` — an **`easedT`** quantity. This component then renders that string at
`left: (anim.t * 100) + '%'` — a **`t`** quantity — 6 px above the track (`:92`
`bottom: calc(100% + 6px)`).

**Failure scenario (exact, on the default easing).** `animation.ts:24` defaults
`easing = "sine"` → `easings.ts:80` → value.js `easeInOutSine`. At `t = 0.25`,
`easedT = -(cos(π·0.25) − 1)/2 = 0.1464`. The caret sits at **25 %** of the track and reports the level
at **14.6 %** of the ladder. Peak divergence is ≈ **10.4 percentage points** of track width — on a
400 px track, ≈ 42 px between where the marker points and the state the marker's own text describes.
With `easing = "expo"` (`easeInOutExpo`) the divergence is far larger.

The same caret element also **switches axes with the basis selection**: in epicycle-only mode
(`AnimationControls.vue:35-37,53`) the label becomes `` `t = ${anim.t.toFixed(2)}` `` — now a raw-`t`
quantity, now consistent with its own position. So one 12-line element is axis-consistent in one mode
and axis-inconsistent in the other, and nothing in either file says so.

**Falsifier** — show `GlassTimeline` reading `easedT`, or show `caretLabel` derived from `t` in the
bases branch. `grep -n "easedT" GlassTimeline.vue` → no match; `AnimationControls.vue:44,47` → `easedT`.
Or show `easeInOutSine(0.25) === 0.25` — it is `0.1464`.

**Scoping (I decline the naive version).** A scrubber over the *time* axis is a defensible design, and
`anim.t` is the right model for a time scrubber; `BasisCanvas` agrees with it on the tip trajectory.
The defect is not "wrong axis" — it is that **the position and the text of a single composite marker
are computed from two different axes**, and that the fork's own `t`↔`N` seam (`:62` vs the `label` it
receives) is the only place in the tree where they are rendered as one object.

### C-21 · INFO — fold of intake R6-8

Intake `lane-fourier-r3-r6.md` row **R6-8** (TRUE, ADOPT-AS-FACT, CARRY→F.W5) establishes that fourier's
operation records embed derived client back-references (`"clients": ["client:updateVisualization"]`,
`"clientDisposition": "CLIENT_MATCH_SOURCE_DERIVED"`), so *"the two leaves are structurally non-isolable
by construction."* This component reads **no API leaf directly** (`grep -n "api\.\|lib/api" GlassTimeline.vue`
→ no match) — its coupling is one hop further out than AnimationControls': the `t` it scrubs is the
index into payloads from `computeBases` / `computeEpicycles`. Consequence booked for the wave: a
conformance fixture that reshapes either payload will produce R6-8's ambiguous two-sided failure, and
**this component is where the ambiguity becomes visible** (C-8's step ladder is the surface that would
mis-address a reshaped `levels` array). No contradiction with the intake; a scoping note.

---

## §5 — props / emits contract + integration seams

### C-9 · MAJOR — there is no value contract, and the tree paid for it with a second fork

The component's entire public surface is:

```ts
24: defineProps<{ label: string }>();
28: const anim = useAnimationStore();
```

No `modelValue`. No emits. A hard singleton bind to a global store. Compare the producer's
`ScrubberTimeline` (`ScrubberTimeline.vue.d.ts:11-24`):

```ts
props:  { modelValue?: number /* 0..1 */; label?: string }
emits:  { "update:modelValue": (v: number) => any; scrubStart: () => any; scrubEnd: () => any }
```

**The fork's four behaviours map 1:1 onto that contract.** `modelValue` ← `anim.t`; `label` ← `label`;
`scrubStart` ← `onPointerDown`→`anim.startScrub()`; `scrubEnd` ← `onValueCommit`→`anim.endScrub()`. The
27 lines of `<script setup>` are an adapter between a store and a contract the producer already
declares — including the `scrubStart`/`scrubEnd` pair that **is** the hand-rolled pointer state machine
(`:30,43-57`).

**This sharpens `lane-frontend.md:401-403` past its own hedge.** The lane calls the fork *"partial"*
because it composes `Slider` and adds a caret; the AnimationControls lane sharpens that to
"`label` is a first-class upstream prop". **The third fact, which neither reached, is the emits:** the
upstream scrubber emits exactly the two scrub events the fork exists to synthesise. The migration is a
substitution of four bindings, not a redesign — and it is the *only* fix that also closes C-1, because
the producer emits `scrubEnd` from `onPointerup`/`onPointercancel` **unconditionally**
(`timeline.js`: `function f(){ c.value = !1, r("scrubEnd"); }`), not conditionally on a value change.

**And the price already paid.** Because this component takes no value and emits nothing, it cannot be
reused. `equation/convergence/ConvergenceTimeline.vue` (146 lines) is a **second fork of the same
primitive**, authored for the equation view, differing from the subject in exactly the way a
`modelValue`/emits contract would have made unnecessary:

```ts
// ConvergenceTimeline.vue:22-56 — the contract the subject should have had
const props = defineProps<{ t: number; playing: boolean; activeCount: number; totalHarmonics: number }>();
const emit  = defineEmits<{ "toggle-play": []; "scrub-start": []; "scrub-move": [t: number]; "scrub-end": [] }>();
const scrubbing = ref(false);
const tArr = computed<number[]>({ get: () => [Math.round(props.t * 100)], set: (arr) => emit("scrub-move", …) });
function onPointerDown()  { if (scrubbing.value) return; scrubbing.value = true;  emit("scrub-start"); }
function onValueCommit()  { if (!scrubbing.value) return; scrubbing.value = false; emit("scrub-end"); }
```

Same `Math.round(t*100)` scaling (C-8), same `variant="standard"`, same dead
`--slider-scrub-track-height` (`:136`, at 20 px), same conditional-close bug (C-1), same de-tokenized
copy of the producer's caret idiom. **Two forks, 273 lines, of one shipped primitive** —
`grep -rn "glass-ui/timeline" web/src` → **0**. `lane-frontend.md:94` books the subject as a shadow and
`:134` books `ConvergenceTimeline` as a plain *"Slider-driven harmonic timeline"*; I book them as **one
shadow with two instances**, and the F.W3 line item should read "retire both".

**Falsifier** — show a behaviour in either fork that `ScrubberTimeline`'s props+emits cannot express.
The candidates are the caret (`label`, upstream prop), the scrub bracketing (`scrubStart`/`scrubEnd`,
upstream emits), and the value (`modelValue`, upstream prop). All three are upstream.

### C-14 · MINOR — a required prop where the producer's is optional, and an unguarded caret

`:24-26` declares `label: string` **required**. The producer declares `label?: string` and guards the
caret element on it: `e.label ? (…, o("div", { class: "timeline-caret", … })) : a("", !0)`
(`timeline.js`). The fork renders `:62-64` unconditionally, so `label=""` ships an empty bordered,
shadowed, padded chip. Today the only caller always passes a non-empty computed string
(`AnimationControls.vue:52-54`), so this is latent — but the required-ness is also what makes the
component unusable in any context that has no label to show, which compounds C-9.

### C-17 · MINOR — a local `scrubbing` that shadows the store's, with a different lifetime

`:30` `const scrubbing = ref(false)` and `animation.ts:114` `const scrubbing = ref(false)` are two
refs with one name. They are written together (`:45-46`, `:55-56`) and are therefore *usually* equal —
but only the store's is read by anyone else (`BasisCanvas.vue:144,329`), and under C-1 they are both
stuck true together with no way for a reader to tell that the state is stale. A future edit that
early-returns from one and not the other desynchronises the renderer silently. The local ref exists
only to make `onValueCommit` idempotent; `anim.scrubbing` already carries that bit.

### C-11 · MINOR — three props restating the producer's defaults

`:68-70` `:min="0" :max="100" :step="1"`. `SliderRoot.js:48-62` declares `min: 0`, `max: 100`,
`step: 1` as defaults. All three are no-ops. Their presence is actively misleading: it makes the
`0..100` domain read as a deliberate range choice rather than as the scaling artefact it is (C-8).

### C-12 · MINOR — the clamp, twice

`:38` `Math.max(0, Math.min(1, (arr[0] ?? 0) / 100))` then `animation.ts:129`
`t.value = Math.max(0, Math.min(1, normalizedT))`. Both correct, one redundant. Since `min`/`max` are
also pinned to `0`/`100` (C-11) and reka itself clamps (`SliderRoot.js:123`), the value is clamped
**three** times on one path.

### C-13 · MINOR — a 60 fps re-render for a value that changes ≤100×/cycle

`:35-41` is a `computed` whose getter returns a **fresh array literal** and whose dependency is
`anim.t`, which the rAF clock writes every frame (`animation.ts:69`). The parent re-renders every frame
anyway (`:62`'s `:style` binds `anim.t`), so every frame the `Slider` receives a new `modelValue`
array identity, fails the `!==` prop check, and patches — including reka's `v-for` over
`t.modelValue` that instantiates the thumb list (`slider-DQ95MET2.js`). The *rounded* value changes at
most 100 times per 20 s cycle; the reconciliation happens ~1200 times. A memo that holds the array
identity while the rounded value is unchanged removes it entirely.

### C-15 · MINOR — the caret is measured against the wrong box (inherited; BH/BI relay)

`:62` `left: (anim.t * 100) + '%'` on an absolutely-positioned child of `.timeline-row`, which has
`padding: 0 0.25rem` (`:84`). Percentage offsets for absolutely-positioned elements resolve against the
containing block's **padding box**; the `Slider` is a flex child filling the **content box** and carries
`w-full` from the CVA base (`slider-DQ95MET2.js`: `"glass-slider focus-ring relative flex w-full …"`).
So caret-x = `t·(W + 8px)` while track-x = `4px + t·W`: a linear skew of `8t − 4` px — **−4 px at
t = 0, 0 at t = 0.5, +4 px at t = 1**.

**I decline to score this against the fork.** The producer's `ScrubberTimeline` has the identical
`padding: 0 .25rem` on `.timeline-row` and the identical `left: modelValue*100 + "%"` caret, so the
skew is **inherited verbatim** (C-5) and migrating to `glass-ui/timeline` will not fix it. Booked as a
producer carry for the BH/BI relay, with the arithmetic above as the reproduction.

### C-16 · MINOR — the scoped block keys off an unscoped producer class name

Vue's scoped transform attaches `[data-v-…]` only to the **last** compound selector. Compiled with the
installed `vue@3.5.38` `compileStyle({ scoped: true })` over this file's own style block:

```css
.timeline-row[data-v-TEST] { … }
.timeline-row:hover .timeline-caret[data-v-TEST],
.timeline-row:has(.glass-slider[data-held]) .timeline-caret[data-v-TEST] { opacity: 1; }
```

So `.timeline-row` in the descendant rules is **unscoped** — and `.timeline-row` is the producer's own
class name, emitted by **two** shipped components: `ScrubberTimeline` (`class="timeline-row"`) and
`ContinuousTimeline` (`class="timeline-row timeline-continuous"`), both in `dist/timeline.js`. Today
`grep -rn "glass-ui/timeline" web/src` → 0, so nothing collides. The moment F.W3 mounts the real
primitive anywhere above this subtree, an upstream `.timeline-row` becomes a matching ancestor for
these rules. This is the specific hazard of a fork that kept the producer's class vocabulary (C-5),
and the wave should delete the block rather than migrate it.

**Falsifier** — show Vue scoping the ancestor compound, or `.timeline-row` absent from the producer's
templates. The compile output above shows the first; `grep -o "timeline-row[a-z -]*" dist/timeline.js`
shows the second is present twice.

### C-19 · INFO — the surface has no test of any kind

`grep -rn -i "timeline\|scrub" web/e2e/` → **4 hits, none of them this surface**
(`gallery.spec.ts:56` a filter button named *SlidersHorizontal*; `contour-extraction.spec.ts:67,75,76`
the blur-sigma range input). And `web/package.json` has **no unit runner at all** — scripts are
`dev`, `build`, `preview`, `test:e2e`, `test:e2e:ui`; no `vitest`, no `test`. So the two BLOCKERs above
sit on a surface with **zero** automated assertions of any kind, in either tier. C-1's freeze and C-2's
inert keyboard are precisely the class of defect a single Playwright interaction test would have caught
on the day it landed (2026-05-16).

---

## §6 — Corpus reconciliation

| Corpus row | This lane |
|---|---|
| `lane-frontend.md:94` — `GlassTimeline.vue` **127** lines, *"Scrub bar over `t∈[0,1]` — SHADOW"* | **CONFIRMED** (line count exact, `wc -l` → 127) |
| `lane-frontend.md:401-403` — name-identical, zero-import; *"the strongest shadow signal in the tree"*; hedged as *"a **partial** re-fork"* | **CONFIRMED + the hedge RETIRED** (C-5, C-9). Not a resemblance: the fork's `<style scoped>` is the producer's own `ScrubberTimeline` scoped CSS block, declaration for declaration, and its caret markup is the producer's compiled template including the `fira-code` class. The "175 LOC shadow recipe" the docblock says it migrated *from* **is the primitive's implementation**. And the upstream emits `scrubStart`/`scrubEnd` — the exact pair the fork hand-rolls — so the divergent surface is **zero**, not "the caret". |
| `lane-frontend.md:134` — `ConvergenceTimeline.vue` (146) booked as a plain *"`Slider`-driven harmonic timeline"* | **CONTRADICTED** (C-9). It is the **second instance of the same shadow**: identical `Math.round(t*100)` scaling, identical conditional-close state machine, identical dead `--slider-scrub-track-height`, `variant="standard"`. F.W3's line item must read "retire both forks", 273 lines, not one. |
| `lane-frontend.md:382` — *"The one live selector is `GlassTimeline.vue:103` `.timeline-row:has(.glass-slider[data-held])`"*; all `glass-track`/`glass-fill`/`glass-thumb` occurrences are prose only | **CONFIRMED + AMENDED** (C-7). Live: yes — `glass-slider` × 17 and `data-held` × 15 in the installed dist. Amendment: the predicate it expresses is not the one it replaced. Upstream's arm is `:has(.glass-track:active)` (element-local); `data-held` is the **dock's reference-counted hold**, raised by three modules in the dist and null outside a dock. Second amendment: `glass-track`/`glass-fill`/`glass-thumb` are prose in fourier **because they are the producer's live class names** — the comment at `:6` is naming the primitive's internals. |
| `lane-frontend.md:499` — the uplift diff `9 − variant="glass-scrubber"` / `9 + variant="standard"` | **CONFIRMED at this file** (§0a: 2 of the 9, both uncommitted) **+ SHARPENED** (C-4, C-6): the rename touched the two compiler-visible sites and left the token (`:125`), the CSS comment (`:120-123`) and the docblock's paint claim (`:8`) behind. Three stale artefacts from one edit. |
| `lane-frontend.md:641` — *"[P2] Retire the two hard shadows: `GlassTimeline.vue` (127) → `glass-ui/timeline`"* | **CONFIRMED + PROMOTED**. Not P2. The migration is the *only* fix that also closes **C-1 (BLOCKER)**, because the producer emits `scrubEnd` unconditionally on `pointerup`/`pointercancel` while reka emits `valueCommit` only `if (hasChanged)`. A shadow-retirement item and a correctness blocker are the same edit. |
| `CENSUS-2026-08-03.md:93` — Shadows HARD: local `GlassTimeline.vue` (127, name-identical, producer subpath) | **CONFIRMED**, with the byte-level proof the census defers (C-5). |
| `CENSUS-2026-08-03.md:190` — F.W3 · shadow retirement — `GlassTimeline` → `glass-ui/timeline` | **CONFIRMED + SCOPED**: the substitution is 4 bindings (`v-model` → `:model-value`+`@update:model-value`, `:label`, `@scrub-start`, `@scrub-end`) plus deleting a 48-line style block. Two caveats the wave must inherit: **C-2 survives the migration** (upstream's keyboard path emits no scrub bracket either — the fix belongs in `stores/animation.ts`), and **C-15 survives it** (the padding-box skew is the producer's). |
| `CENSUS-2026-08-03.md` §1 — value.js "5 statements / 4 files, easing-only"; "bare-root specifiers that 4.0.0 no longer exports"; F.W2 "5 bare specifiers → `/easing`" | **CONFIRMED** on the count (5/4, re-measured); **CONTRADICTED** on the present-tense defect reading (§1). value.js 0.13.0 declares a single `"."` export condition — there is no `/easing` subpath at the pin, so the bare specifier is the only legal one today. F.W2 is a consequence of F.W1, not an independent defect. Reached independently of the AnimationControls lane, same verdict. |
| `CENSUS-2026-08-03.md` §1 — "Pins: value.js `^0.13.0`/inst 0.13.0 · glass-ui `^4.0.0`/inst 4.0.0 — AGREE" | **AMENDED** (C-20): versions agree, the constraint graph does not close (`ELSPROBLEMS`, re-measured). Not re-scored — already BLOCKER at the AnimationControls lane. |
| intake **R6-8** (TRUE, ADOPT-AS-FACT, CARRY→F.W5) — operation↔client leaves structurally non-isolable | **FOLDED, no contradiction** (C-21). This component reads no leaf directly; it is two hops out, and it is the surface where a reshaped `levels` payload would surface as a mis-addressed scrub ladder (C-8). |
| intake **R3-7a** (TRUE, CARRY→F.W3) — 35 Tooltip callsites over nine consumers | **NOT APPLICABLE, verified** — `grep -n "Tooltip" GlassTimeline.vue` → 0. The subject is not in R3's consumer set, and the intake's per-file counts do not list it. Recorded so the F.W3 budget is not inflated. |
| AnimationControls lane **C-5** — *"the intended knob is `--slider-track-height`"* | **CONTRADICTED as a remedy** (C-4). The token is real, but the producer sets it on the same element at `(0,3,0)` while the consumer's scoped rule is `(0,2,0)`, and neither sheet is layered — so the correct name does not work from the root either. The only sanctioned knob is the `size` prop, whose ladder (12/20/28 px) does not contain 24 px. |
| AnimationControls lane **S-3** — *"Zero hand-rolled motion constants … not one bezier literal"*, citing `GlassTimeline.vue:65` `--z-popover` | **PART-CONFIRMED, PART-CONTRADICTED** (C-5, S-4). `--z-popover` is real (`scheme-motion.css:344` = 130) and I re-confirm it. But `:96` hard-codes `transition: opacity 0.2s ease` where the producer's source for the identical rule uses `var(--duration-fast) var(--ease-standard)` — a pinned duration **and** a keyword easing, in the file S-3 cites as its evidence. |
| AnimationControls lane **C-6** — the 1 % quantization, *"paid for nothing"* | **CONFIRMED + EXTENDED** (C-8). Extension: the fork's own justification (`:32-34`, *"reka-ui's SliderRoot uses integers"*) is **false** against the installed reka — `step` is a `Number` and `updateValues` handles decimals via `getDecimalCount` (`SliderRoot.js:121-122`). And the 100 steps bear no relation to the server-determined `levels` ladder, which is the API-consumption half the lane did not reach. |
| AnimationControls lane **S-5** — `:103` is a genuinely live `glass-*` selector, verified against the dist | **CONFIRMED on liveness, CONTRADICTED on sufficiency** (C-7). Both hooks are real; the rule they express is dock-global where the producer's was element-local, and the element-local hook the producer *does* ship (`data-touch-active`, same root) is unused. |

---

## §7 — Superlatives (L-18, both ways)

Each is something I tried to break against the installed producer and could not.

**S-1 · `variant="standard"` is the right variant, correctly renamed.** `standard` is a real 4.0.0
variant (`ui/slider/index.d.ts:43`) and the producer's own doc calls it *"the general-purpose glass
scrubber and the default"* (`:25`). The in-flight uplift (§0a) picked the correct successor to
`glass-scrubber` — of the two variants, `spectrum` is the colour-picker recipe with a visible thumb.
The migration author read the variant docs. (What the same author did **not** carry across is C-4/C-6.)

**S-2 · The CR-2 dock migration is real, complete, and verified end-to-end.** The docblock (`:13-15`)
claims the v1.8.x `<Slider>` acquires the typed `DockContext` internally, so the string-key
`dockKeepOpen`/`dockRelease` injects are retired. Every link verified in the installed producer:
`slider-DQ95MET2.js` calls `useDockHold(rootRef, { enabled: () => keepDockOpen })`, which injects the
typed token (`dockContext-Bu1Avy-a.js`: `createContext("glass-ui:dock-context")`, `useOptional`),
registers `pointerdown` + passive `touchstart` on the root, and releases on `window` `pointerup`/
`pointercancel` **and** on unmount. `keepDockOpen` defaults `true` (`Slider.vue.d.ts:25`). Consumer
side: `grep -rn "dockKeepOpen\|dockRelease" web/src` → **2 hits, both prose comments**
(`GlassTimeline.vue:14`, `SliderControl.vue:19`). The string keys are genuinely gone. This is the one
migration in the file that was carried through completely.

**S-3 · Both event bindings are correct against the declared producer contract.**
`@value-commit` kebab-resolves to `onValueCommit`, and `valueCommit: (payload: number[]) => any` is a
declared emit (`Slider.vue.d.ts:20`). `@pointerdown` is **not** a declared emit, so it falls through
`$attrs` — and it reaches the DOM because glass-ui's `Slider` does not set `inheritAttrs: false` and
its render returns a single root vnode. I checked this first, precisely because a silently-swallowed
`@pointerdown` would have been the tidiest explanation for C-1; it is not the explanation. The binding
works, and the bug is on reka's side of the contract.

**S-4 · The one layering token survived the copy.** `:97` `z-index: var(--z-popover)` resolves from the
producer's token layer (`styles/tokens/scheme-motion.css:344` → `130`), imported at `src/style.css:3`
`@import "@mkbabb/glass-ui/styles"`. Not a magic z-index — in a file where three other tokens were
replaced by literals on the same copy (C-5), this one was not, and it is the one where a literal would
have been most dangerous (the caret escapes the dock's stacking context).

**S-5 · `class="timeline-slider"` takes the sanctioned path.** `class` is a **declared prop** on
glass-ui's `Slider` (`Slider.vue.d.ts:5`), destructured out of the reka forward and merged through
`cn()` (`slider-DQ95MET2.js`: `class: cn(sliderVariants({variant, size}), C.class)`). So the consumer
class composes with the CVA base instead of colliding with it or falling through as a duplicate
attribute. Small, and I checked it because C-4 made me suspect the class was not landing at all — it
lands; the token it carries is the dead part.

**S-6 · The caret cannot eat the gesture.** `:94` `pointer-events: none` on `.timeline-caret`, an
absolutely-positioned element that overlaps the track's hit area at `bottom: calc(100% + 6px)` and can
extend over it via `transform: translateX(-50%)` at the ends. Without that declaration the caret would
intercept the `pointerdown` that opens the scrub. Given C-1 — where a *missing* close is already
catastrophic — a missing *open* would be worse, and this guard is load-bearing. (Inherited from the
producer, but retained, which is not nothing: three sibling declarations in the same rule were not.)

---

## §8 — What this component actually is

A 127-line adapter between a Pinia store and a contract its own dependency already declares. The
glass-ui *surface* is adopted correctly — real subpath, real variant, real emit names, a completed
typed-dock migration (S-1, S-2, S-3). The glass-ui *substance* is a copy: the style block is the
producer's own `ScrubberTimeline` stylesheet with four tokens replaced by literals (C-5), the markup is
the producer's compiled template down to the `fira-code` class, and the 27 lines of script synthesise
`scrubStart`/`scrubEnd` — two first-class upstream emits — out of a pointer event and a *conditional*
one (C-9). The file's docblock describes a variant that no longer exists (C-6) and credits a keyboard
contract it never wires (C-2). Its height override has been inert since the day it was written (C-4).
Its caret carries a number from one time axis at a position from another (C-3).

The two BLOCKERs are independent and both cheap:

- **C-1** — one ordinary click freezes the clock and permanently disables the canvas trail, because the
  scrub opens on a DOM event that always fires and closes on a component event that fires
  `if (hasChanged)`. **The F.W3 shadow retirement fixes it for free**, because the producer's
  `scrubEnd` is unconditional. Shadow retirement and blocker repair are one edit; that is the single
  most useful thing this lane has to say to the wave.
- **C-2** — the keyboard axis is inert during playback, and **F.W3 does not fix it**: upstream's
  keyboard handler emits no scrub bracket either. The repair belongs in `stores/animation.ts` — either
  re-anchor `startTime` on every external `seek()`, or give the store a keyboard-shaped scrub. The wave
  must not book C-2 as discharged by the migration.

And the reason both survived: `grep -rn -i "timeline\|scrub" web/e2e/` returns nothing about this
surface, and `web/` has no unit runner at all. Nothing in this tree has ever asserted anything about
the component that owns the application's primary time control.
