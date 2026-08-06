claude-opus-5[1m]

# CHALLENGE · `SequenceScrubber.vue` · axis C — CONSUMPTION

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/sequence/SequenceScrubber.vue` (162 lines)
**Axis:** how this component consumes keyframes.js (the library), glass-ui (the design system), and value.js (the transitive dep) — subpath choices, shadow components, R1 reachability, props/emits contract, sibling seams.
**Mode:** static, read-only. No installs, no dev servers, no browser tooling. Every livable-only claim is marked **UNPROVEN-NEEDS-LIVE** for the SS-13 visual audit.
**Posture:** assumed DEFECTIVE until the tree proved otherwise. Three hypotheses were formed and **killed by the tree** (§4) rather than shipped as findings.

**Tally: 13 defects (0 BLOCKER · 4 MAJOR · 7 MINOR · 2 INFO) · 5 superlatives.**

---

## 0. Read set (whole-file, read-only)

| file | why |
|---|---|
| `demo/scenes/sequence/SequenceScrubber.vue` | the target |
| `demo/scenes/sequence/sequenceKeys.ts` | the injection key it consumes |
| `demo/scenes/sequence/useSequenceDemo.ts` (483 L) | the provider facade behind `SEQUENCE_DEMO_KEY` |
| `demo/scenes/sequence/useSequenceInstrument.ts` | `setScrubbing`/`setScrubDir` contract |
| `demo/composables/useDragScrub.ts` | the shared gesture seam it rides |
| `demo/scenes/sequence/SequenceTarget.vue` + `.css` | its parent + the sibling `.seq-ball`/`.seq-handle` conventions |
| `demo/scenes/sequence/SequencePlayhead.vue`, `SequenceAxis.vue`, `SequenceScene.vue` | the colocated peers (the props-vs-inject comparison) |
| `demo/styles/design-idioms.css`, `demo/styles/style.css` | the `.progress-rail`/`.progress-ball`/`.focus-ring` idioms + cascade root |
| `demo/state/sceneMachine.ts`, `demo/state/useSceneMachine.ts` | where `demo.scrub` lands |
| `node_modules/@mkbabb/value.js/{package.json,dist/subpaths/math.js,dist/subpaths/math.d.ts}` | R1 reachability |
| `node_modules/@mkbabb/glass-ui/dist/components/{timeline/ScrubberTimeline.vue.d.ts,slider/Slider.vue.d.ts}` | the S-4 shadow contracts |
| `node_modules/@vueuse/core/dist/index.js` (`useStorage`) | the persist-flush default |
| `demo/components/playback/PlaybackRibbon.vue:140–180` | the prior art on glass `Slider` touch behaviour |

---

## 1. Headline

| # | severity | claim |
|---|---|---|
| C-1 | **MAJOR** | The scrub gesture drives a **localStorage-persisting** state machine at raw pointer-sample frequency — one synchronous `JSON.stringify` + `setItem` per `pointermove`. |
| C-2 | **MAJOR** | The keyboard path silently **bypasses the component's own gesture-reporting contract** (`setScrubDir`/`setScrubbing`), so the ignition cascade + comet trail are pointer-exclusive and can run backwards for keyboard users. |
| C-3 | **MAJOR** | `.seq-scrub` is the **only** pointer-drag surface in the demo with no `touch-action` declaration — 7 siblings declare one, including `.seq-handle` 20 lines away in the same stylesheet. |
| C-4 | **MAJOR** | Inject-only contract (**zero props, zero emits**) diverges from BOTH colocated siblings, which are pure prop-driven leaves — and the parent demonstrably already holds the one scalar this component needs. |
| C-5 | MINOR | Shadow gesture state: a local `scrubbing` ref strictly duplicates `demo.isScrubbing` — the exact D12 smell `useSequenceDemo` deleted from itself. |
| C-6 | MINOR | Stale provenance: the load-bearing idiom citation points at `design-idioms.css:584`; the file is 300 lines. |
| C-7 | MINOR | The master ball and the lane balls consume the **same** `.progress-ball` idiom under two incompatible anchoring conventions. |
| C-8 | MINOR | A `tabindex="0" role="slider"` with **no** focus affordance — neither the demo's `.focus-ring` idiom nor `--focus-ring-shadow`, both of which the sibling slider consumes. |
| C-9 | MINOR | Two drag surfaces in one scene, two cursor vocabularies (`cursor-pointer` vs `grab`/`grabbing`). |
| C-10 | MINOR | Dead identity wrapper `onScrubDown` — and it occupies the exact seat where a genuinely-needed `focus()` belongs. |
| C-11 | MINOR | Redundant `clamp` in the template over a value the provider already clamped. |
| C-12 | INFO | Direction sampling `p >= lastP` reports FORWARD on a zero-delta sample. |
| C-13 | INFO | Zero glass-ui **imports** but a live glass-ui **token** dependency — refines the census's subpath-count framing. |

Superlatives: **S-A** (R1 structurally unreachable) · **S-B** (zero engine import, inv-ζ held) · **S-C** (idiom *parameterised*, not re-authored — the only such consumer in the demo) · **S-D** (`cqw` compositor-only positioning) · **S-E** (rides the shared drag seam, no fourth hand-rolled pointer dance).

---

## 2. Defects

### C-1 · MAJOR — the scrub writes localStorage once per pointer sample

**Provenance chain (every hop read):**

```
SequenceScrubber.vue:69-73    onScrub(p)  →  demo.scrub(p)          [no throttle, no dedupe]
useDragScrub.ts:131-134       useEventListener(window,"pointermove", … onScrub(project(e)))
useSequenceDemo.ts:279-286    scrub(p) → machine.dispatch({ type: "SCRUB", t: progress.value })
sceneMachine.ts:170-175       case "SCRUB": return { status, context: scrub(context, event.t) }
sceneMachine.ts:236-249       scrub() → rebuilds `animations` map + spreads perScene → a FRESH object every call
useSceneMachine.ts:171-181    `if (next === prev && …) return;`  →  cannot fire (fresh object)
                              machine.value = next;  persisted.value = { activeScene, perScene };
useSceneMachine.ts:76-79      const persisted = useStorage<PersistedContext>(SCENE_MACHINE_PERSIST_KEY, {…})
                              ^^ NO options object → vueuse defaults
@vueuse/core@14.3.0 dist/index.js  function useStorage(key, defaults, storage, options = {}) {
                              const { flush = "pre", deep = true, … } = options;
                              watchPausable(data, (newValue) => write(newValue), { flush, deep, eventFilter })
```

`flush: "pre"` + `deep: true` + no `eventFilter` ⇒ the watcher fires once per reactive tick, and each `pointermove` is its own tick. `write()` is `storage.setItem(key, serializer.write(value))` — synchronous `JSON.stringify` of the full per-scene context, then a synchronous, disk-backed `localStorage.setItem`, **on the main thread, inside the drag**.

The demo *ships* the seam that fixes this and does not consume it here: `demo/composables/useThrottledReadout.ts` — "a clock-gated `maybeFlush(now, flush)`… plus a RECONCILE on settle/scrub that flushes unconditionally". Two live consumers (`useEasingDemo.ts`, `useSpringHotPath.ts`); its own docstring names `useSequenceDemo` as a lapsed one. `useDragScrub` offers no throttle either, so the scrubber is the last place the gate could sit.

*Scope honesty:* the row-handle drag in `SequenceTarget.vue:219-221 → reseatRow → useSequenceDemo.ts:348` hits the same dispatch. This is a **shared-seam** defect; SequenceScrubber is its highest-frequency consumer (full-width rail, the scene's headline gesture) and is where the throttle is cheapest to add.

**Falsifier.** Any of: (a) `useStorage` given `{ flush: "post" }`/`throttleFilter`/`debounceFilter` — it is given no options object at all (`useSceneMachine.ts:76`); (b) the reducer's `next === prev` short-circuit firing — `sceneMachine.ts:242` returns a fresh object literal every call, so it cannot; (c) a throttle upstream in `useDragScrub` — `:131-134` calls `onScrub` on every admitted `pointermove`; (d) a measured trace showing `setItem` under the frame budget at drag cadence, which would downgrade this to INFO. **UNPROVEN-NEEDS-LIVE: the magnitude.** The chain itself is CONFIRMED statically.

---

### C-2 · MAJOR — the keyboard path bypasses the component's own gesture contract

The component's header states its contract explicitly (`:54-61`):

> "This handler only reports the GESTURE (scrub start/end + the drag direction) so the cascade direction flips on a drag-back."

The pointer path honours it (`:69-73` `setScrubDir`; `:84-92` `setScrubbing` on/off). The keyboard path does not:

```
SequenceScrubber.vue:97-111   onScrubKeydown → demo.scrub(...) ONLY
                              no setScrubDir, no setScrubbing, no lastP update
```

Consequences, each traced to a live consumer:

* `demo.isScrubbing` never lifts ⇒ `.seq-stage.is-scrubbing` (`SequenceTarget.vue:62` → `SequenceTarget.css:28-31`) never sets `--seq-glow: 1`, so the ignition-cascade heat and the border tint are pointer-only.
* `demo.scrubDir` retains its last value ⇒ `.seq-stage` inline `--scrub-dir` (`SequenceTarget.vue:63`) stays stale ⇒ `SequencePlayhead.vue:78` `transform: scaleX(var(--scrub-dir, 1))` renders the comet trail **pointing forward while the playhead moves backward** on `ArrowLeft`/`Home`. Default is `1` (`useSequenceInstrument.ts:20`), so a fresh page + `ArrowLeft` is wrong on the first press, not just after a stale drag.

`useSequenceInstrument.ts:10-13` documents these as *scrub* semantics ("lifts the stage's `--seq-glow` while the master scrub is held"; "flips the diagonal cascade so the lane detonation chases the thumb"), not pointer-only semantics — the word "thumb" is descriptive, and the whole contract is reachable from `role="slider"` keyboard input, which is a first-class scrub.

**Falsifier.** A comment or spec designating `isScrubbing`/`scrubDir` pointer-exclusive; or a global `:focus-within`/`:active`-driven fallback that lifts `--seq-glow` for keyboard. Neither exists — `grep -rn "setScrubbing\|scrubDir"` across `demo/` returns exactly the sites cited above, and `.seq-stage.is-scrubbing` is the only rule that consumes the flag.

---

### C-3 · MAJOR — the only drag surface with no `touch-action`

`.seq-scrub` (`:20` classes `relative w-full h-9 cursor-pointer select-none`; `:115-122` scoped rule) declares no `touch-action`, and Tailwind's `touch-none` is absent from the class list. `select-none` is `user-select` — a different property; it does not gate gestures.

Every other pointer-drag surface in the demo declares one:

```
scenes/sequence/SequenceTarget.css:134        .seq-handle       touch-action: none   ← same scene, same stylesheet
scenes/square/SquareScene.css:64                                touch-action: none
scenes/cube/CubeTarget.vue:4                                    touch-action: none
scenes/cube/CubeScene.vue:12                                    touch-action: none
scenes/cube/orbital-drag/OrbitalDrag.vue:350                    touch-action: none
scenes/amiga/AmigaScene.vue:254                                 touch-action: none
components/instrument/timeline/components/TimelineTrack.vue:24  touch-none (Tailwind)
```

7 of 8. The master scrubber is the outlier — and `useDragScrub`'s `setPointerCapture` (`useDragScrub.ts:120`) does **not** substitute: pointer capture does not stop a UA from claiming a gesture as a pan, and when it does, it fires `pointercancel` (which `useDragScrub.ts:144-147` correctly handles by *ending* the drag).

**Falsifier — and it partly bites.** `demo/styles/style.css:214-217` sets `html, body { overflow: hidden; overscroll-behavior: none; touch-action: manipulation; }`. `touch-action` is not inherited but composes up the hit chain, and `manipulation` still permits pan + pinch-zoom; with nothing scrollable above the scrubber there may be no pan for the UA to steal. So: **the static asymmetry is CONFIRMED; the runtime manifestation is UNPROVEN-NEEDS-LIVE.** A two-finger pinch begun on the rail, or any future scrollable ancestor (the mobile band at `layout.css:171-201` is actively re-laid-out), converts it. The claim dies outright if a live touch-drag on iOS Safari scrubs cleanly *and* a reviewer accepts that the 7 sibling declarations are all superfluous.

---

### C-4 · MAJOR — inject-only contract, against both colocated siblings

The three sub-units of `SequenceTarget` were split by the *same* ≤500 L rule, each says so in its own header — and they landed on two different contracts:

| sub-unit | lines | contract |
|---|---|---|
| `SequenceAxis.vue` | 49 | `defineProps<{ quarters: readonly number[]; staggerMax: number }>()` — zero inject |
| `SequencePlayhead.vue` | 87 | `defineProps<{ progress: number }>()` — zero inject |
| **`SequenceScrubber.vue`** | **162** | **zero props, zero emits**, `inject(SEQUENCE_DEMO_KEY)!` (`:47`) |

The decisive fact: `SequencePlayhead` receives **`progress`** — the exact scalar SequenceScrubber injects an entire facade to read — as a prop, from the same parent, on the adjacent template line (`SequenceTarget.vue:70`). The value is provably available at the parent, so "the split forced an inject" is not the reason.

The header's stated rationale (`:5-6`) — *"it injects ONLY `demo`, no Target-private state"* — understates the coupling rather than justifying it. `SequenceDemo` is the full `ReturnType<typeof useSequenceDemo>` (`useSequenceDemo.ts:452-482`): ~28 members including `sequence` (the raw engine `Sequence`), `childAnims`, `facility`, `scenePlayback`, `reset`, `reverse`, `setTimeScale`, `playReel`, `reseatRow`, `play`, `pause`. The component uses **4**: `progress`, `scrub`, `setScrubbing`, `setScrubDir`. A `{ progress }` prop + `scrub` / `scrub-start` / `scrub-end` emits is the honest contract, is the shape both siblings already use, and is *exactly* the shape glass-ui's own primitive publishes (§3).

Secondary: `inject(...)!` erases the missing-provider signal from the type system. Rendered outside `SequenceScene`'s `provide` (`SequenceScene.vue:19`), the failure is a runtime `TypeError` at `demo.progress.value` in a render function — the same class of break `CubeScene.vue:43` already carries a scar comment about ("This throws 'Injection …'"). `inject(KEY)` with a guard, or a small `useSequenceDemoOrThrow()`, costs one line.

**Falsifier.** If the scrubber needed provider members the parent does not itself hold, or wrote to Target-private state, inject would be right. It needs `progress` (the parent has it, `SequenceTarget.vue:70`) and three provider verbs (emittable). If a future wave gives the scrubber a second, non-parent consumer, this reverses.

---

### C-5 · MINOR — shadow gesture state (the D12 smell, re-introduced)

`:62` `const scrubbing = ref(false)` is a strict duplicate of `demo.isScrubbing`: both are set at `:85-87` and cleared at `:90-92`, in the same two callbacks, with no path that sets one without the other. `grep -rn "setScrubbing" demo/` returns exactly two call sites — both in this file.

The provider's own header condemns the pattern by name (`useSequenceDemo.ts:52-55`):

> "The former private `isPlaying = ref(false)` (a shadow playback authority nothing could suspend — the D12 smell) is DELETED: the play-intent is now a read-only projection of `machine.status`…"

`:21` could bind `:class="{ 'is-scrubbing': demo.isScrubbing.value }"` and the local ref deletes.

**Falsifier.** A second writer to `setScrubbing`, or a required lead/lag between the local rail class and the stage class (e.g. an exit transition). Neither exists in the tree.

---

### C-6 · MINOR — stale provenance on the load-bearing idiom citation

`:144-147`:

> "CONSUME the promoted `.progress-ball` idiom's `--ball-glow` parameter (**design-idioms.css:584**) rather than re-authoring its box-shadow"

`wc -l demo/styles/design-idioms.css` → **300**. `--ball-glow` is at **`design-idioms.css:185`**; the idiom block is `:161-187`. The comment exists solely to route a reader to the idiom's contract, and it routes past the end of the file.

**Falsifier.** A second `design-idioms.css` on the resolution path, or a historical file the citation was accurate against — the demo has exactly one (`demo/styles/design-idioms.css`, imported at `style.css:5`).

---

### C-7 · MINOR — one idiom, two anchoring conventions, one Card

Both balls consume `.progress-ball` (`design-idioms.css:177-187`: `position:absolute; top:50%; width/height: var(--ball-size, 36px); margin-top: calc(var(--ball-size,36px)/-2)`), then diverge:

```
.scrub-ball  SequenceScrubber.vue:34,155-161
             transform: translateX(calc(p * 100cqw))     +  margin-left: calc(var(--ball-size,36px)/-2)
             → CENTRE-anchored: the ball's midpoint rides 0 … 100cqw

.seq-ball    SequenceTarget.css:187-199
             transform: translateX(calc((row-start + ball-p*(1-row-start)) * (100cqw - var(--ball-size))))
             → INSET-anchored: the ball's LEFT EDGE rides 0 … (rail − ball)
```

No ancestor of `.scrub-ball` sets `--ball-size` (`grep -rn -- "--ball-size:"` → only `EasingTarget.css:163`, `SequenceTarget.css:188` on `.seq-ball` itself, and two spring sites), so it resolves to the idiom default **36px** — matching `h-9` exactly, vertically. Horizontally it overhangs 18px past each rail end; the rail sits inside `px-4` (16px), and the `Card` is `overflow-hidden` (`SequenceTarget.vue:8`), so ~2px of the master ball is clipped at p=0 and p=1.

The design consequence is the one worth naming: at rest the two rails **disagree about what "0" looks like** — the master thumb centres on the origin, every lane traveller sits fully inside its gate — while the master scrub's whole point (`:54-61`) is that the lane cascade chases the thumb.

**Falsifier.** An ancestor setting `--ball-size ≤ 32px` on the scrubber (none), `Card` supplying horizontal padding (the header/storyboard/scrubber each supply their own `px-4`, which is only consistent with a zero-padding Card, and the `border-t` at `:7` spans the full Card width), or a deliberate "thumb overhangs the rail" convention documented anywhere (not found). **UNPROVEN-NEEDS-LIVE: the visual.**

---

### C-8 · MINOR — a focusable slider with no focus affordance

`:18-30` renders `tabindex="0" role="slider"`. Its scoped block (`:114-161`) has no `:focus-visible` rule, and its class list carries neither the demo's `.focus-ring` idiom nor glass-ui's `.focus-ring`/`.interactive-item`.

`design-idioms.css:73-79` calls itself the contract:

> "The demo-owned `:focus-visible` contract — **the SINGLE keyboard-focus affordance**: `.focus-ring` paints glass-ui's `--focus-ring-shadow` on `:focus-visible`…"

The sibling slider consumes it (`SequenceTarget.css:163-167`: `.seq-handle:focus-visible { box-shadow: var(--focus-ring-shadow); }`, with a documented reason for inlining the token rather than wearing the class). The master slider consumes neither form, and falls back to the UA outline on a `border-radius`-less `<div>`.

**Falsifier.** A global `*:focus-visible` rule. There is none: `grep -rn ":focus-visible" demo/styles/*.css` → 3 sites, all class-scoped (`.btn-playback`, `.focus-ring`, `.cartoon-surface:has()`); glass-ui's are opt-in too (`dist/styles/utilities/base.css` — `.focus-ring:focus-visible`, `.interactive-item:focus-visible`; `accessibility.css` carries no unqualified rule). **UNPROVEN-NEEDS-LIVE: whether the UA default ring is visible enough against the rail** — that decides MINOR vs a real a11y failure.

---

### C-9 · MINOR — two drag surfaces, two cursor vocabularies

`:20` `cursor-pointer`; the sibling `SequenceTarget.css:133,168-170` `cursor: grab` / `:active { cursor: grabbing }`. Both are draggable sliders inside the same Card. `pointer` announces "click"; `grab` announces "drag". The master scrubber is the one you drag most.

**Falsifier.** A convention distinguishing "click-to-seek + drag" rails from "grab-only" handles. The master rail does support click-to-seek (`useDragScrub.ts:126` scrubs on pointerdown), so `pointer` is defensible — this is a consistency finding, not a correctness one. Kept MINOR for that reason.

---

### C-10 · MINOR — dead identity wrapper, occupying a seat that is needed

`:95` `const onScrubDown = (e: PointerEvent) => onScrubDownRaw(e);` — no `preventDefault`, no `focus()`, no gating. `@pointerdown="onScrubDownRaw"` is equivalent; the alias-then-rewrap at `:75` + `:95` is pure indirection.

The sharper point: this is exactly where the missing call belongs. A `<div tabindex="0">` does **not** receive focus on mouse-down in Safari (the documented WebKit behaviour for non-form elements), so after a mouse scrub the arrow keys at `:97-111` are dead until the user Tabs to the rail. A one-line `scrubEl.value?.focus()` in this wrapper closes it. Compare `PlaybackRibbon.vue:159-179`, where the analogous wrapper earns its keep with a real touch gate.

**Falsifier.** A global mousedown-focus shim, or evidence that the rail receives focus via `setPointerCapture` (capture does not move focus). **UNPROVEN-NEEDS-LIVE: the Safari focus behaviour.** The dead-wrapper half is CONFIRMED regardless.

---

### C-11 · MINOR — redundant clamp over an already-clamped value

`:34` `clamp(demo.progress.value, 0, 1)`. `demo.progress` is only ever written by `syncFromSequence` (`useSequenceDemo.ts:179-181`), which is itself `progress.value = clamp(sequence.progress, 0, 1)`. Provably in `[0,1]` at the source; every other reader trusts it (`SequenceTarget.vue:21`, `:70`).

The import is still required — `project` (`:81`) clamps a raw pointer ratio, which is the honest use. Note `SequencePlayhead.vue:10` carries the identical redundancy on a prop it also does not need to clamp, so this is a small shared habit, not a one-off.

**Falsifier.** Any writer to `demo.progress` that bypasses `syncFromSequence` — `grep -n "progress.value =" useSequenceDemo.ts` returns only `:180`.

---

### C-12 · INFO — `>=` reports FORWARD on a zero-delta sample

`:70` `demo.setScrubDir(p >= lastP ? 1 : -1)`. A `pointermove` whose projected ratio equals the previous one (stationary finger with pressure/tilt jitter; sub-pixel motion that clamps to the same ratio at a rail end) reports **forward**, flipping `--scrub-dir` to `+1` and `scaleX`-flipping the comet trail (`SequencePlayhead.vue:78`) for that sample mid-backward-drag.

**Falsifier.** UA coalescing of identical-coordinate `pointermove`s would make this unreachable — but pointer events fire on pressure/tiltX/tiltY change at constant coordinates, and both rail ends clamp a range of coordinates to the same ratio (`:81`). Graded INFO because the manifestation is a one-frame flicker, not a wrong state. A deadband (`if (p !== lastP)`) is the whole fix.

---

### C-13 · INFO — zero glass-ui imports, live glass-ui token dependency

This is one of the census's 21 non-glass `.vue` files (lane-frontend §4 lists it at 162 L, "b"). Confirmed: no `@mkbabb/glass-ui` import anywhere in the file. But its paint is glass-coupled through the token layer:

* `.progress-rail` / `.progress-ball` (`design-idioms.css:166-187`) resolve `--radius-pill`, which is **undefined in `demo/styles/`** (`grep -rn -- "--radius-pill:" demo/styles/*.css` → nothing) and supplied by `node_modules/@mkbabb/glass-ui/dist/styles/theme/radius.css`.
* `--color-progress` → `--accent-kf` is demo-owned (`style.css:163`, `:63-66`), so the *tone* is safe; the *geometry* is not.

**Refinement of the census, not a contradiction:** lane-frontend §3.1's 21/73 subpath tally and §9's "21 `.vue` NOT importing glass-ui" both measure the **import** boundary. The `@import "@mkbabb/glass-ui/styles"` cascade (`style.css:3`) is a second, unmeasured consumption surface, and this component sits entirely on it. Under **F-1** (glass-ui undeclared in `package.json`/lockfile — independently re-confirmed here: `keyframes.js@6.0.0`'s `dependencies` is `{ "@mkbabb/value.js": "4.0.0" }`, nothing else) this component's rail and ball lose their pill radius even though it imports nothing from glass-ui. "No glass-ui import" ≠ "F-1-immune".

---

## 3. The S-4 shadow, re-argued from the emit contract

Census `lane-frontend.md` §5 S-4 rates this **AMBER**: *"glass-ui ships `ScrubberTimeline.vue` (unimported) and `Slider` … A rail-with-ball is the `Slider` primitive's exact shape."* The tree lets me **sharpen the `ScrubberTimeline` half and reject the `Slider` half.**

**`ScrubberTimeline` is a 1:1 contract match** (`dist/components/timeline/ScrubberTimeline.vue.d.ts`):

```ts
type __VLS_Props = { modelValue?: number;  /* 0..1 scrubber position */  label?: string };
emits: { "update:modelValue": (v: number) => any; scrubStart: () => any; scrubEnd: () => any }
```

Map it onto this file, line for line:

| SequenceScrubber | ScrubberTimeline |
|---|---|
| `demo.progress.value` (`:16`, `:34`) | `modelValue` (0..1) |
| `onScrub` → `demo.scrub(p)` (`:69-73`) | `update:modelValue` |
| `onStart` → `demo.setScrubbing(true)` (`:84-88`) | `scrubStart` |
| `onEnd` → `demo.setScrubbing(false)` (`:89-92`) | `scrubEnd` |
| `onScrubKeydown` (`:97-111`), C-2's gap | "keyboard a11y (role=slider + arrow-key step + shift-step)" |
| `.seq-scrub` missing `touch-action` (C-3) | "the 44px touch target is an invisible `::before` halo" |
| no focus affordance (C-8) | "Always visible (the `opacity:0`-until-hover is RETIRED — the affordance must be present during keyboard/touch scrub)" |
| `aria-valuenow` hand-bound (`:24`) | "§S-16 — the `aria-valuenow` binding coerces `Number(modelValue ?? 0)`" |

The primitive's docstring answers **four** of this challenge's findings by construction (C-2's keyboard parity, C-3's touch target, C-8's focus affordance, and the ARIA coercion), and its `scrubStart`/`scrubEnd` pair is a literal rename of `useDragScrub`'s `onStart`/`onEnd`. `scrubDir` is not lost — it is derivable from consecutive `update:modelValue` payloads exactly as `:69-73` derives it now.

**`Slider` is the wrong half** (`dist/components/slider/Slider.vue.d.ts`): the model is `number[] | undefined` (reka multi-thumb) with `valueCommit: (payload: number[])`, and there is **no** scrub-start/scrub-end pair — so `demo.setScrubbing` would have to be re-derived from raw pointer events, i.e. the seam this file already rides would still be needed. Worse, the demo has prior art on it, at `PlaybackRibbon.vue:164-165`:

> "…the tap-to-activate gate (**which glass-ui's `Slider` does NOT provide — it sets `touch-action:none`, hijacking scroll** — so the wrapper stays, correctly scoped to touch)."

Note the inversion this exposes: glass `Slider` sets `touch-action: none` unconditionally (too aggressive, needed a gate); `SequenceScrubber` sets nothing (C-3, too permissive). `ScrubberTimeline`'s invisible 44px `::before` halo is the middle path.

**Not a mechanical swap.** What a swap must preserve, and what would have to be re-homed:

1. the `.progress-ball` / `--ball-glow` idiom consumption (S-C) — `ScrubberTimeline`'s head is a glass lozenge on a `useSpring`/`SpringProgress` clock, a *different* visual language from the scene's rail/ball family;
2. `container-type: inline-size` + `cqw` (S-D), which the primitive replaces with its own transform math;
3. the `.is-scrubbing` → `--ball-glow: 60%` lift (`:148-150`);
4. the lit phosphor timecode (`:12-16`, `:131-141`), which the primitive's `label` caret does not cover.

**Verdict: S-4 promoted from AMBER "evaluate `ScrubberTimeline` / `Slider`" to AMBER-SHARP — `ScrubberTimeline` only, contract-verified at the emit level, with the rail/ball visual language as the open design question.** The census's `Slider` suggestion should be struck.

---

## 4. Hypotheses formed and KILLED by the tree

Recorded because a false defect is worse than a missed one.

1. **"`--scrub-dir` is a dead seam"** — the component pays a `setScrubDir` per pointer sample for a variable nothing reads. **KILLED:** `SequencePlayhead.vue:78` `transform: scaleX(var(--scrub-dir, 1))` consumes it; `SequenceTarget.vue:63` publishes it. The seam is live end-to-end. (It does inform C-2 and C-12 — both about *how* it is written, not whether it is read.)
2. **"WCAG 2.5.3 Label-in-Name breach"** — the visible eyebrow reads "master playhead" while `aria-label` is "Scrub the sequence master playhead" (`:11`, `:23`). **KILLED:** the accessible name *contains* the visible label string, which is what 2.5.3 requires.
3. **"value.js is over-consumed for a 3-line `clamp`"** — importing a package to wrap `Math.min(Math.max())`. **KILLED and inverted into S-A:** `@mkbabb/value.js` is a declared, exact-pinned dependency of keyframes.js (`package.json` → `"@mkbabb/value.js": "4.0.0"`), the demo dogfoods it deliberately, and the subpath chosen is the leanest one that exists.

Also considered and **not** raised: `aria-valuetext` absence (permitted; folded into §3 as a supporting bullet), and the master progress being rendered twice in one Card in two units — `Metric` "42%" at `SequenceTarget.vue:18-24` vs the `0.420` timecode at `:16` — which is a deliberate register split (poster metric vs instrument timecode), not a defect.

---

## 5. Superlatives (L-18, running the other way)

### S-A · The R1 parser crash class is **structurally unreachable** from this component

The single value.js reach is `import { clamp } from "@mkbabb/value.js/math"` (`:43`). Read whole:

```
node_modules/@mkbabb/value.js/dist/subpaths/math.js
  → 8 pure numeric functions (clamp, scale, lerp, lerpArray, logerp, deCasteljau,
    cubicBezier, interpBezier, cubicBezierToString)
  → ZERO import statements. Zero module graph beyond itself.
  → package.json: "sideEffects": false
```

`package.json` `exports` publishes **no root entry** — only `./color`, `./value`, `./css`, `./easing`, `./math`, `./transform`, `./quantize`. So there is no barrel through which `parseCssColor` could arrive by accident; reaching R1 would require a *deliberate* `./css` or `./color` import, which this file does not make. The 7-way subpath split plus the pure-leaf `math` module means the CSS parser is not merely unused here — it is **not in the graph**.

*Falsifier:* a single `import` in `dist/subpaths/math.js` (there is none — the file is 46 lines and reads clean), a root `"."` export (absent), or a bundler `sideEffects` override (`"sideEffects": false` is declared). This is the strongest possible posture on the axis and it is not accidental — it is the shape value.js's subpath design was built to give.

### S-B · Zero engine import — inv-ζ held at the leaf

The component imports neither `@mkbabb/keyframes.js` nor `@kf-engine`; it is correctly **not** among the census's 68 engine-consuming files. All engine contact is through the injected facade, and the motion it participates in is engine-painted: the lane cascade is `Sequence.scrub` → each child's `--ball-p` → `SequenceTarget.css:205-208`'s `box-shadow` calc. The component's per-frame cost is one inline CSS custom-value (`:34`) and one text node (`:16`). No `rAF`, no `setInterval`, no second writer. The header claims exactly this (`:57-61`) and the tree honours it.

*Falsifier:* any timer/rAF in the file (none), or a second writer to `--ball-p` (`grep` → the engine's DOM renderer and `SequenceTarget.css` reads only).

### S-C · Idiom **parameterised**, not re-authored — and it is the only such consumer

`:143-150` lifts `--ball-glow` from the idiom's default `35%` to `60%` under `.is-scrubbing`, with the reasoning written down: *"CONSUME the promoted `.progress-ball` idiom's `--ball-glow` parameter … rather than re-authoring its box-shadow — the idiom owns the `0 2px` glow shape; the scene only lifts the glow strength."* The idiom is built for exactly this (`design-idioms.css:161-165`: *"promoted ONCE (was authored four ways) and parameterized by drift-axis custom properties"*), and `grep -rn -- "--ball-glow" demo/` shows **this file is its only consumer** — the parameter exists because this component asked the right way instead of forking the shadow. That is the design-system contract working as designed, at the one site that exercises it. (C-6 dings the citation's line number; the *reasoning* is exemplary and should survive any refactor.)

*Falsifier:* a second `--ball-glow` writer that makes the parameter generic rather than bespoke, or a re-authored `box-shadow` elsewhere in the scoped block — the block declares none.

### S-D · `cqw` transform positioning, consistently applied

`:118-121` `container-type: inline-size` on the rail + `:34` `translateX(calc(<p> * 100cqw))` + `:160` `will-change: transform`. Compositor-only, no per-frame `left`/layout, and the container query scopes the unit to the rail's own inline size so the position stays rail-relative under any parent resize. Both siblings use the identical posture (`SequenceTarget.css:111-115` + `:189-199`; `SequencePlayhead.vue:32-46`) — one T.G4 convention, three components, zero drift. This is the one axis on which the scene's three sub-units are perfectly consistent.

*Falsifier:* a `left`/`width` animation anywhere in the scoped block (`:155-161` sets `left: 0` **once**, statically, as the transform anchor — the correct form).

### S-E · Rides the shared gesture seam instead of a fourth hand-rolled pointer dance

`:75-93` supplies only `project` — the rail rect-ratio — to `useDragScrub`, and inherits, for free: pointer capture with an iOS-safe `try/catch` (`useDragScrub.ts:119-123`), the window `pointermove`/`pointerup`/**`pointercancel`** lifecycle under vueuse's auto-cleanup (`:131-147`), and the global select-suppression token that stops a drag sweeping the chrome from highlighting it (`:29-44`, `:105`, `:116`). The composable's own header names this file as one of the three copies the extraction collapsed. Getting `pointercancel` right by inheritance is the part most hand-rolled scrubbers miss.

*Falsifier:* a raw `useEventListener(window, "pointerup", …)` or a bespoke capture path in the file — there is none; the only pointer wiring is `@pointerdown` (`:28`).

---

## 6. Census reconciliation

| census id | this challenge |
|---|---|
| **S-4** (AMBER, "`ScrubberTimeline` / `Slider`", 162 L) | **Sharpened.** `ScrubberTimeline`'s `{modelValue, scrubStart, scrubEnd}` is a verified 1:1 with this file's `{progress, onStart, onEnd}` and resolves C-2/C-3/C-8 by construction. **`Slider` should be struck** — `number[]` model, no scrub-start/end, and `PlaybackRibbon.vue:164-165` records its unconditional `touch-action:none` as a problem needing a wrapper. §3. |
| **F-1** (RED, glass-ui phantom dep) | **Independently re-confirmed** (`keyframes.js@6.0.0` `dependencies` = `{"@mkbabb/value.js":"4.0.0"}` only) and **extended**: C-13 shows this file, which imports zero glass-ui, still breaks visually under F-1 via `--radius-pill` from `dist/styles/theme/radius.css`. |
| **§3.1 / §9** ("21 `.vue` NOT importing glass-ui", 21/73 subpaths) | **Refined, not contradicted.** Both metrics measure the import boundary; the `@import "@mkbabb/glass-ui/styles"` cascade (`style.css:3`) is a second consumption surface this component sits entirely on. Suggest a token-reach column alongside the subpath tally. §C-13. |
| **§4 roster row** (`sequence/SequenceScrubber.vue` · 162 · **b** · "master scrubber, rail/ball idiom (`:1`)") | **Accurate.** No correction. |
| **§6.3** ("98 unprefixed demo custom properties … a collision surface worth a lane of its own") | **Corroborated at this leaf:** `--ball-glow`, `--ball-tone`, `--ball-size`, `--seq-glow`, `--scrub-dir` are all unprefixed and share the flat global namespace with glass-ui's, which also owns `--ball-*`-adjacent timeline tokens (`--timeline-dot-size`, `--timeline-touch-target`). No live collision found for the five names this file touches. |
| **§6.5** (PRM: 13 sites) | This file has **no** PRM guard and needs none — it carries no `@keyframes` and no `transition`; the scene's decorative boot is PRM-snapped at `SequenceTarget.css:238-243` + `useSequenceInstrument.ts:29-32`. Correctly delegated. |
| **lane-library.md** (parse seams) | No overlap. §S-A establishes that no value.js parse seam is reachable from this component. |

---

## 7. Recommended order (if a wave lands here)

1. **C-1** — throttle the scrub→dispatch seam (`useThrottledReadout`'s `maybeFlush` + a `reconcile` on `onEnd`), or give `useSceneMachine`'s `useStorage` a `throttleFilter`. Highest value, smallest diff, and it fixes the row-drag at the same seam.
2. **C-2** — route `onScrubKeydown` through the same `setScrubDir`/`setScrubbing` reporting as `onScrub` (a `scrubBy(delta)` helper collapses both paths and kills C-12's `>=` at the same time).
3. **C-3** — add `touch-action: none` to `.seq-scrub`, matching the 7 siblings. One line; no reason to wait for the live probe.
4. **C-4** — flip to `defineProps<{ progress: number }>()` + `scrub` / `scrub-start` / `scrub-end` emits. This is also the prerequisite that makes the §3 `ScrubberTimeline` evaluation a drop-in rather than a rewrite, and it deletes C-5.
5. **C-6, C-8, C-9, C-10, C-11** — one cleanup pass (fix the line citation; add `.focus-ring` or the token; align the cursor; delete the wrapper *or* give it the `focus()` it needs; drop the template clamp).
6. **C-7** — decide the anchoring convention scene-wide, then apply. Design call, not a mechanical fix.
7. **§3 / S-4** — evaluate `ScrubberTimeline` **after** step 4, with the rail/ball visual language as the explicit open question. Gated on **F-1** landing first (census §10.1).

---

## Provenance note

Every keyframes.js, glass-ui, value.js and @vueuse claim is sourced by reading the file at the cited path under `/Users/mkbabb/Programming/keyframes.js` (working tree + its `node_modules`). No file in keyframes.js, glass-ui or value.js was written, mutated, or executed; no installs, no dev servers, no browser tooling. The sole write of this lane is this document. Claims whose *manifestation* requires a live browser are marked **UNPROVEN-NEEDS-LIVE** and are held for the SS-13 visual audit: C-1 (magnitude), C-3 (runtime steal), C-7 (the 2px clip + the rest-state disagreement), C-8 (UA ring legibility), C-10 (Safari mousedown focus).
