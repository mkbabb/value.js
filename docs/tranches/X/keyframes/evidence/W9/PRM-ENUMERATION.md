SERVED MODEL: claude-opus-5[1m]

# X.KF.W9 `.b` — THE PRM ENUMERATION · G-KFW9-5's ONE LIST

**Wave** X.KF.W9 (Track B) · **unit** `.b` (desktop-Safari cell · the PRM band) · **2026-09-17**.
**Gate**: G-KFW9-5 — *"ONE enumeration of every demo motion with flag state + layer
(CSS/WAAPI/rAF/engine), replacing §6.5; each of the seventeen rows resolves against it; the census row
amends, the lane file stays dated evidence."*

**Substrate of record**: keyframes.js `origin/master` = **`55e9bf0d2391bbc6d9871bb3f0555a6225daae92`**,
the pin published at `evidence/W9/SUBSTRATE-PIN.md` §1. **Every figure below is read from that ref's
bytes**, never from the working tree — the tree moved twice during this wave (§6) and a census taken
from it would be a census of nobody's substrate. Method: ⟨`git archive 55e9bf0d demo | tar -x -C
<scratch>`⟩, then every count re-run over the exported bytes and **double-run identical**.

**This file writes no census byte.** `CENSUS-2026-08-03.md` and `lane-frontend.md §6.5` are read-only at
both paths (§Bounds `:70`); the amendment lands as the **DRAFT at §7**, for `.e` alone to place.

---

## 0 · The claim being replaced, re-read at its byte

⟨`sed -n '462p' docs/tranches/V/megatranche/formation/keyframes/lane-frontend.md`⟩ →

```
### 6.5 `prefers-reduced-motion` — 13 enforcement sites across 12 files
```

⟨`sed -n '463,466p'`⟩ → the body's split: **10 CSS + 3 JS**.

The claim is **three-quarters right and wrong in the way that matters**: the 10 CSS is exact, the JS
count is short by one, the file count is short by two, and — decisively — **the whole engine layer is
absent from it.** A tally of *enforcement* sites answers "where is PRM written?"; the wave's question is
"what moves, and is it gated?". Those are different questions and §6.5 answers only the first.

---

## 1 · REGISTER A — the PRM **enforcement** sites (§6.5's own subject, made true)

**Counting rule**: one site = one authored construct that *consults* `prefers-reduced-motion` in
`demo/**` at `55e9bf0d`; CSS sites are counted at the `@media` at-rule, JS sites at the call that reads
the preference. Reproducing command:
⟨`grep -rn 'prefers-reduced-motion' demo/`⟩ → **18 lines**, of which **4 are prose** (`useSceneSwap.ts:29`
· `App.skeleton.vue:15` · `TypingDots.vue:121` · `KeyframeTimeline.vue:94`) and **14 are sites**.

### A.1 · CSS — **10 blocks, 10 files**

| # | site | governs |
|---|---|---|
| C-1 | `demo/scenes/square/SquareScene.css:136` | `transition: none` (`.square-tether`, `.demo-box`…) |
| C-2 | `demo/scenes/square/SquareInstrument.vue:207` | `<style>` block |
| C-3 | `demo/scenes/easing/EasingTarget.css:48` | `transition: none` (specimen-name enter/leave) |
| C-4 | `demo/scenes/sequence/SequenceTarget.css:238` | `animation: none` (`:241`) |
| C-5 | `demo/scenes/spring/SpringTarget.vue:462` | `animation: none` ×2 (`:464`, `:467`) |
| C-6 | `demo/scenes/spring/StartingStyleTarget.vue:211` | `<style>` block |
| C-7 | `demo/scenes/spring/SpringHeatmap.vue:333` | `<style>` block |
| C-8 | `demo/app/App.skeleton.vue:95` | `animation: none` (`:97`) |
| C-9 | `demo/components/instrument/transport/controls-pane/ControlsPaneWrapper.css:144` | `transition: none` — **compound**: `(min-width: 1024px) and (prefers-reduced-motion: reduce)` |
| C-10 | `demo/components/instrument/shell/AnimatedText.vue:121` | `animation: none` (`:123`) |

**Measured, and load-bearing**: **6 of the 10** (C-1, C-2, C-3, C-6, C-7, C-9) sit in files carrying
**no local `animation` property at all** — they gate `transition` only. Read at the bytes, C-1's body is
`transition: none;` under `.square-tether`; C-3's is `transition: none;`; C-9's is `transition: none;`
with its own comment conceding *"the mobile sheet's PRM snap is owned by the Drawer's own SpringProgress
`respectReducedMotion` — no CSS here."* **This is the enumerated form of §A's "the CSS blocks the
comments call compliance govern the layer with no motion"** (kf-SquareScene D-3/L-12/C-6 and
kf-ControlsPaneWrapper's `MISSED (RR-1)` row), now counted rather than asserted.

### A.2 · JS — **4 sites, 4 files, 3 distinct mechanisms**

| # | site | mechanism |
|---|---|---|
| J-1 | `demo/scenes/cube/useCubeDemo.ts:164` | `window.matchMedia?.("(prefers-reduced-motion: reduce)").matches` |
| J-2 | `demo/scenes/sequence/useSequenceInstrument.ts:31` | `window.matchMedia?.(…)` |
| J-3 | `demo/scenes/easing/EasingTarget.vue:234` | `useMediaQuery("(prefers-reduced-motion: reduce)")` (vueuse) |
| J-4 | `demo/scenes/amiga/AmigaScene.vue:58` | `usePreferredReducedMotion()` (vueuse), read at `:107` `if (prm.value === "reduce")` |

**J-4 is §6.5's missing fourth** — precisely the site §A's anchor row predicts (*"JS tally amends to
**4 sites / 3 mechanisms** (AmigaScene.vue:58 the uncounted fourth)"*), found here by an independent
sweep rather than inherited: the row's arithmetic **reproduces at the bytes**.

### A.3 · The fourth mechanism §6.5 does not count at all — the **engine flag**

⟨`grep -rn 'respectReducedMotion' demo/`⟩ → **7 lines**, 3 prose, **4 sites**:

| # | site | shape |
|---|---|---|
| E-1 | `demo/app/transition/useSceneSwap.ts:45` | `new SpringProgress({ respectReducedMotion: true })` |
| E-2 | `demo/components/instrument/shell/TypingDots.vue:91` | inside the options bag of the `CSSKeyframesAnimation` at `:86` |
| E-3 | `demo/components/playback/AnimationVisualizer.vue:147` | inside the options bag of the `SpringProgress` at `:144` |
| E-4 | `demo/state/animationOptionsStore.ts:49` | `defaultAnimationOptions.respectReducedMotion: true` — a **stored default**, not an animation |

### A.4 · REGISTER A's figure

> **14 enforcement sites across 14 files, by four mechanisms** — 10 CSS `@media` blocks · 2
> `window.matchMedia` · 1 `useMediaQuery` · 1 `usePreferredReducedMotion` — **plus 4 engine-flag sites
> (3 live + 1 stored default) that §6.5 counts nowhere.**
> **§6.5's "13 sites across 12 files" is wrong in both numerals**: 13 counts the engine flag at zero and
> misses J-4; 12 under-counts the files by two (the 14 sites sit in 14 distinct files — `EasingTarget.css`
> and `EasingTarget.vue` are two files, not one).

---

## 2 · REGISTER B — every demo **motion**, by layer, with flag state

**Counting rule**: one motion = one authored construct that produces time-varying visual state, counted
at its **declaration site**. Four layers, per the gate. `transition` declarations and utility-class
transitions are registered separately at §2.5 with their reach stated, because they are governed by the
**producer's** blanket rather than by any demo-side construct.

### 2.1 · ENGINE — **42 instances** (the layer §6.5 omits entirely)

Emitted from the settled bytes by ⟨`sh gen-enum.sh <exported demo>`⟩, **double-run identical**; the
comment-only mentions at `useTimingFunctionEditor.ts:122/:174` are excluded by the generator (they are
prose about the constructor, not instances). Column derivation is printed in the generator's header:

- **FLAG-LITERAL** — `respectReducedMotion` inside the site's own options literal.
- **FLAG-STORED** — the options argument is `getStoredAnimationOptions(…).animationOptions`, which on a
  store-empty profile is `structuredClone(defaultStoredAnimationOptions)` (`animationOptionsStore.ts:108-113`)
  whose `animationOptions` **is** `defaultAnimationOptions` (`:62`) carrying `respectReducedMotion: true`
  (`:49`).
- **play path** — GROUP where the instance is a child of a named `AnimationGroup`, else STANDALONE.

| file | line | construct | flag · play path |
|---|---|---|---|
| `app/transition/useSceneSwap.ts` | `45` | new SpringProgress | FLAG-LITERAL (respectReducedMotion: true)  ·  STANDALONE |
| `components/CopyButton.vue` | `69` | new CSSKeyframesAnimation | —  ·  GROUP → CopyButton.vue:95 |
| `components/CopyButton.vue` | `82` | new CSSKeyframesAnimation | —  ·  GROUP → CopyButton.vue:95 |
| `components/CopyButton.vue` | `95` | new AnimationGroup | —  ·  STANDALONE |
| `components/instrument/keyframes/KeyframesEditor.vue` | `245` | presets.warpLeft | —  ·  STANDALONE |
| `components/instrument/keyframes/KeyframesEditor.vue` | `246` | presets.jumpUp | —  ·  STANDALONE |
| `components/instrument/keyframes/KeyframesEditor.vue` | `255` | new CSSKeyframesAnimation | —  ·  STANDALONE |
| `components/instrument/keyframes/KeyframesStringControls.vue` | `121` | presets.shake | —  ·  STANDALONE |
| `components/instrument/keyframes/components/KeyframesAddDialog.vue` | `128` | new CSSKeyframesAnimation | —  ·  STANDALONE |
| `components/instrument/keyframes/composables/useKeyframeBrushApply.ts` | `18` | new CSSKeyframesAnimation | —  ·  STANDALONE |
| `components/instrument/keyframes/composables/useKeyframeOps.ts` | `66` | new CSSKeyframesAnimation | —  ·  STANDALONE |
| `components/instrument/shell/TypingDots.vue` | `86` | new CSSKeyframesAnimation | FLAG-LITERAL (respectReducedMotion: true)  ·  STANDALONE |
| `components/instrument/timeline/utils/timelineEngine.ts` | `49` | new CSSKeyframesAnimation | —  ·  STANDALONE |
| `components/instrument/transport/TransportDock/useIconSpin.ts` | `13` | new CSSKeyframesAnimation | —  ·  STANDALONE |
| `components/playback/AnimationVisualizer.vue` | `144` | new SpringProgress | FLAG-LITERAL (respectReducedMotion: true)  ·  STANDALONE |
| `scenes/amiga/AmigaScene.vue` | `116` | new SpringProgress | —  ·  STANDALONE |
| `scenes/amiga/useAmigaDemo.ts` | `93` | new CSSKeyframesAnimation | —  ·  GROUP → useAmigaDemo.ts:153 |
| `scenes/amiga/useAmigaDemo.ts` | `110` | new CSSKeyframesAnimation | —  ·  GROUP → useAmigaDemo.ts:153 |
| `scenes/amiga/useAmigaDemo.ts` | `127` | new CSSKeyframesAnimation | —  ·  GROUP → useAmigaDemo.ts:153 |
| `scenes/amiga/useAmigaDemo.ts` | `153` | new AnimationGroup | —  ·  STANDALONE |
| `scenes/cube/CubeTarget.vue` | `205` | new CSSKeyframesAnimation | —  ·  STANDALONE |
| `scenes/cube/matrix-editor/useTransformState.ts` | `87` | new NumericAnimation | —  ·  STANDALONE |
| `scenes/cube/matrix-editor/useTransformState.ts` | `105` | new NumericAnimation | —  ·  STANDALONE |
| `scenes/cube/useCubeDemo.ts` | `58` | new CSSKeyframesAnimation | FLAG-STORED (defaultAnimationOptions:49 → true)  ·  GROUP → useCubeDemo.ts:116 |
| `scenes/cube/useCubeDemo.ts` | `80` | new CSSKeyframesAnimation | FLAG-STORED (defaultAnimationOptions:49 → true)  ·  GROUP → useCubeDemo.ts:116 |
| `scenes/cube/useCubeDemo.ts` | `109` | presets.hover | FLAG-STORED (defaultAnimationOptions:49 → true)  ·  GROUP → useCubeDemo.ts:116 |
| `scenes/cube/useCubeDemo.ts` | `116` | new AnimationGroup | —  ·  STANDALONE |
| `scenes/cube/useCubeDemo.ts` | `130` | new CSSKeyframesAnimation | —  ·  STANDALONE |
| `scenes/easing/useEasingDemo.ts` | `139` | new NumericAnimation | —  ·  STANDALONE |
| `scenes/easing/useEasingDemo.ts` | `290` | new CSSKeyframesAnimation | —  ·  STANDALONE |
| `scenes/sequence/useSequenceDemo.ts` | `128` | new CSSKeyframesAnimation | —  ·  STANDALONE |
| `scenes/spring/useCompiledEntry.ts` | `54` | new CSSKeyframesAnimation | —  ·  STANDALONE |
| `scenes/spring/useSpringDemo.ts` | `90` | new SpringProgress | —  ·  STANDALONE |
| `scenes/spring/useSpringDemo.ts` | `103` | new SpringProgress | —  ·  STANDALONE |
| `scenes/spring/useSpringDemo.ts` | `171` | new NumericAnimation | —  ·  STANDALONE |
| `scenes/spring/useSpringDemo.ts` | `326` | new SpringProgress | —  ·  STANDALONE |
| `scenes/spring/useSpringKeyframesEditor.ts` | `58` | new CSSKeyframesAnimation | —  ·  STANDALONE |
| `scenes/square/SquareScene.vue` | `174` | new AnimationGroup | —  ·  STANDALONE |
| `scenes/square/useSquareDemo.ts` | `60` | new SpringProgress | —  ·  STANDALONE |
| `scenes/square/useSquareDemo.ts` | `61` | new SpringProgress | —  ·  STANDALONE |
| `scenes/square/useSquareDemo.ts` | `343` | new CSSKeyframesAnimation | —  ·  GROUP → SquareScene.vue:174 |
| `scenes/square/useSquareTumble.ts` | `8` | new SpringProgress | —  ·  STANDALONE |

**Tally** (self-counted from the table above): **42 instances** — 21 `new CSSKeyframesAnimation` · 9
`new SpringProgress` · 4 `new NumericAnimation` · 4 `new AnimationGroup` · 4 `presets.*`
(`hover`/`warpLeft`/`jumpUp`/`shake`). **9 are group children**; **6 carry a flag** (3 FLAG-LITERAL, 3
FLAG-STORED); **36 carry none** and therefore take `defaults.ts:87`'s `respectReducedMotion: false`.

**THE THREE FINDINGS THIS REGISTER EXISTS TO STATE:**

1. **`0 of 42` uses the intensity form.** All three FLAG-LITERAL sites pass boolean `true`. Read at the
   library: `reducedMotionScale` (`internal/reduced-motion.ts:125`) returns **`0` for `true`** under an
   active query and *"that number, clamped to [0,1]"* for a numeric. **The demo's opt-ins are exactly the
   binary snap the adjudicated cure forbids** (*"the remedy is the **intensity** form
   (`respectReducedMotion: ~0.3`), not a binary snap"*, kf-AmigaScene). This is deliverable 2's gap,
   counted.
2. **The three FLAG-STORED instances are INERT.** `useCubeDemo.ts:58` (matrix), `:80` (rotation) and
   `:109` (`presets.hover`) each receive `respectReducedMotion: true` in their options bag from the
   stored default — and all three are children of the group constructed at `:116`. The group's play path
   reads **the group's own field**, never a child's bag: `group/lifecycle.ts:79-80`
   `beginPlay(group, () => withReducedMotion(group.respectReducedMotion, …))`, and
   `group/group.ts:57` is `respectReducedMotion = false;` with **no demo site setting it**
   (⟨`grep -rn 'respectReducedMotion' demo/`⟩ shows no `g.respectReducedMotion` assignment anywhere).
   **A true flag in the bag, a false gate at the group** — a fifth PRM-inert mechanism, and the exact
   subject of G-KFW9-6(i).
3. **The one cube motion that IS gated is gated by hand, not by the flag.** `changeGraphPerspectiveAnim`
   (`useCubeDemo.ts:130`, options `{ duration: 650, timingFunction: "ease-out-back" }` — no flag) is
   fenced by J-1's hand-rolled `matchMedia` at `:164-168`: under reduce the code writes
   `graphEl.style.transform = "rotate3d(-1, 1, 0, 30deg)"` and never calls `.play()`. **"cube gates 1 of
   4 engine motions (650ms graph settle only)" reproduces exactly** — and the enumeration adds *why*: the
   gate is a hand-rolled branch, not the engine contract.

### 2.2 · CSS — **7 keyframe-driven motions, 7 declarations**

| # | `@keyframes` | applied | PRM gate | state |
|---|---|---|---|---|
| K-1 | `seq-ruler-wipe` `SequenceTarget.css:228` | `:222` 420ms | C-4 → `:241 animation: none` | GATED |
| K-2 | `seq-lane-drop` `SequenceTarget.css:232` | `:225` 420ms | C-4 | GATED |
| K-3 | `enter` `styles/design-idioms.css:278` | `styles/tab-idiom.css:76` | **none in either file** | **UNGATED** |
| K-4 | `scene-skeleton-sweep` `App.skeleton.vue:85` | `:81` 1.6s infinite | C-8 → `:97` | GATED |
| K-5 | `charLift` `AnimatedText.vue:103` | `:100` `var(--wave-cycle, 3.6s)` infinite | C-10 → `:123` | GATED |
| K-6 | `spring-settle-pulse` `SpringTarget.vue:387` | `:376` 220ms | C-5 → `:464` | GATED |
| K-7 | `derby-fade-in` `SpringTarget.vue:457` | `:415` 220ms | C-5 → `:467` | GATED |

**6 of 7 gated; K-3 is the CSS layer's one ungated keyframe motion** — the tab-panel slide-in, applied in
`tab-idiom.css` which carries no PRM block, from a keyframe declared in `design-idioms.css` which carries
none either. (The five `animation: none` declarations at `SequenceTarget.css:241`, `App.skeleton.vue:97`,
`AnimatedText.vue:123`, `SpringTarget.vue:464`, `:467` are **enforcements, not motions**, and are counted
in Register A, never here.)

### 2.3 · rAF — **1 motion loop of 4 rAF sites**

| site | what it is | motion? | flag |
|---|---|---|---|
| `demo/scenes/cube/orbital-drag/composables/useOrbitalInertia.ts:131` | `useRafFn(applyInertia)` — the post-release inertial glide, per-frame factor from the engine's analytic `decay()` (`:71`) | **YES** | **none** — no `prefers-reduced-motion` token in the file |
| `demo/components/instrument/timeline/composables/useTimelineBuild.ts:73` | `useRafFn` as a `nextFrame()` promise flush (`:68-85`), pauses itself on the first tick | no | n/a |
| `demo/scenes/cube/matrix-editor/useTransformState.ts:203` | one-shot `requestAnimationFrame` coalescing a transform write | no | n/a |
| `demo/components/CopyButton.vue:58` | `requestAnimationFrame` re-arming a live region | no | n/a |

**OD-11 reproduces**: one ungated rAF glide in the scene that names *"the house reduced-motion
contract"*, and the corrected cube tally (4 engine + 1 rAF) is the enumeration's own reading.

### 2.4 · WAAPI — **0 direct sites**

⟨`grep -rn '\.animate(' demo/`⟩ → **0**. **No demo file calls `Element.animate` directly.** Every WAAPI
motion in this demo is reached through the library's delegation (`src/animation/waapi/delegation.ts`),
which is why KF-TD-1's live-flip question **cannot be answered from demo bytes at all** and is a library
question with a demo witness (G-KFW9-7).

### 2.5 · Declared boundaries of this enumeration (stated, not hidden)

- **Property-level `transition` declarations**: ⟨`grep -rnE '^\s*transition(-[a-z]+)?\s*:' demo/`⟩ →
  **34**. Registered as a class, not per site: they are state-change motions governed demo-wide by the
  **producer's** unlayered `*:not([data-allow-motion]) … !important` PRM reset (the SS-6 mechanism, three
  banked witnesses), so a demo-side per-site flag state would be a fiction. Six of Register A's ten CSS
  blocks exist only to snap members of this class.
- **Utility-class transitions in templates**: `transition-colors` ×6 · `transition-all` ×3 ·
  `transition-transform` ×1 (plus 44 bare `transition` tokens), across **23** `.vue` files. Same
  producer-governed class; this is the layer kf-PlaybackRibbon **D-24** names — *"PRM rescued ONLY by the
  producer allowlist (`transform` absent)"* — and `components/playback/` carries **zero**
  `prefers-reduced-motion` tokens (⟨`grep -rln 'prefers-reduced-motion' demo/components/playback/`⟩ → no
  hits), so the row's "zero authored PRM" is measured here.
- **Custom-property-driven transforms**: `demo/scenes/sequence/SequencePlayhead.vue:46`
  `transform: translateX(calc(var(--playhead-p, 0) * 100cqw - 50%))` with `will-change: transform` at
  `:51`. Motion with **no** `animation` and **no** `transition`: the engine writes the custom property.
  This is kf-SequencePlayhead **D-8/C-§5**'s *"fourth distinct producer-blanket failure mode"*, located.
- **Timer-driven tours**: `demo/scenes/square/useSquareKeyboard.ts:66` `tourTimer = setTimeout(step, 520)`
  — the 5-leg tour of kf-SquareInstrument **D-13**, ungated. ⟨`grep -rn 'matchMedia' demo/scenes/square/`⟩
  → **0 hits**, so that row's *"zero matchMedia in `demo/scenes/square/*.ts`"* reproduces.

### 2.6 · REGISTER B's figure

> **51 motion sites**: **42 engine** · **7 CSS keyframe-driven** · **1 rAF loop** · **1 timer tour** ·
> **0 direct WAAPI**, plus the four declared boundary classes at §2.5.
> **Gated**: 6 CSS (of 7) · 1 engine-by-hand (the cube graph settle, via J-1) · 3 engine-by-flag
> (E-1/E-2/E-3) · 3 engine-by-flag-but-INERT (the cube group's children).
> **Ungated**: 36 engine instances · 1 CSS motion · the rAF glide · the timer tour.

---

## 3 · The seventeen banked rows, resolved against the enumeration

§Carry §A carries **eighteen** bullets at the bytes (⟨`awk 'NR>=106 && NR<=123'`⟩ → 18 `- **` bullets);
G-KFW9-5's witness cell says *"seventeen banked rows correct it"*. **Both readings are satisfied here**:
all eighteen resolve, so the gate's condition (*"each of the seventeen rows resolves against it"*) holds
under either enumeration. The candidate for the eighteenth — stated as a reading, **adjudicated by
nobody here** — is **D-8/C-§5 ⟨kf-SequencePlayhead⟩**, banked *INFO, NO-CHARGE ruled*: it contributes a
mechanism, not a correction to the tally. No row is re-graded by this file.

| # | row ⟨record⟩ | resolves against | verdict |
|---|---|---|---|
| 1 | **D-7 / C-15 / L-m8** ⟨kf-AmigaScene⟩ | engine `useAmigaDemo.ts:93/:110/:127` + group `:153` (all four **no flag**) · J-4 `AmigaScene.vue:58`→`:107` · the settle `AmigaScene.vue:116` `new SpringProgress` | **RESOLVES** — amiga **0 of 4** gated; the only PRM path is the hand-rolled J-4 settle branch |
| 2 | **D-8 + M-7** ⟨kf-CubeScene⟩ | engine `useCubeDemo.ts:58/:80/:109` (FLAG-STORED, group-inert) + group `:116` + `:130` (no flag, gated by J-1) + `useTransformState.ts:87/:105` | **RESOLVES + SHARPENS** — 1 of 4 gated, and §2.1 finding 2 shows the other three carry a *true* flag that the group arm discards |
| 3 | **OD-11** ⟨kf-OrbitalDrag⟩ | rAF `useOrbitalInertia.ts:131` (+`decay()` `:71`), no PRM token in file | **RESOLVES** — the one ungated rAF loop |
| 4 | **#10 / D·M-1 / C·D-1** ⟨kf-CubeTarget⟩ | engine `CubeTarget.vue:205` `rollAnim`, no flag | **RESOLVES** — folds under the cube tally |
| 5 | **D-3 / L-12 / C-6** ⟨kf-SquareScene⟩ | engine `useSquareDemo.ts:60/:61`, `useSquareTumble.ts:8`, `useSquareDemo.ts:343`, group `SquareScene.vue:174` — **none flagged**; C-1/C-2 gate `transition` only | **RESOLVES** — square **0 of 4**; the PRM-inert rider is Register A's 6-of-10 measurement |
| 6 | **D-13** ⟨kf-SquareInstrument⟩ | timer `useSquareKeyboard.ts:66`; 0 `matchMedia` in `scenes/square/` | **RESOLVES** |
| 7 | **D-4** ⟨kf-SequenceTarget⟩ | engine `useSequenceDemo.ts:128` (`playReel`, no flag); the idiom known at J-2 `useSequenceInstrument.ts:31`; C-4 gates K-1/K-2 only | **RESOLVES** |
| 8 | **D-3** ⟨kf-SpringTarget⟩ | engine `useSpringDemo.ts:90/:103/:326` — **three construction sites, none passes the flag**; C-5 reaches two decorations (`:464`, `:467`) | **RESOLVES** — the row's "three sites" is exact |
| 9 | **KF-SS-20** ⟨kf-SpringScene⟩ | C-5 + C-6 + C-7 = the three gated cosmetic CSS sites; the 60 Hz solvers are in row 8's three | **RESOLVES** |
| 10 | **KF-KE-8** ⟨kf-KeyframesEditor⟩ | engine `KeyframesEditor.vue:255` (1000ms sweep) · `useKeyframeBrushApply.ts:18` (**infinite**) · `useKeyframeOps.ts:66` · presets `:245`/`:246` — none flagged | **RESOLVES** |
| 11 | **KAD-11** ⟨kf-KeyframesAddDialog⟩ | engine `KeyframesAddDialog.vue:128` `new CSSKeyframesAnimation({ duration: 1000 }, progressBarEl.value)` — bag is duration-only; twin `KeyframesEditor.vue:255` identical in shape | **RESOLVES** — the PAIR LOCK's two members are byte-visible as a pair |
| 12 | **KF-EST-11** ⟨kf-EditorStartScreen⟩ | `EditorStartScreen.vue:29` `<span class="hero-dots"><TypingDots /></span>` (import `:63`) → engine `TypingDots.vue:86` + E-2 `:91` | **RESOLVES** — the start screen's dots ARE the TypingDots instance; rows 12 and 13 are one surface |
| 13 | **KF-TD-1** ⟨kf-TypingDots⟩ | engine `TypingDots.vue:86`/E-2 `:91`, FLAG-LITERAL `true`, STANDALONE; library anchors at §G-KFW9-7's register | **RESOLVES** |
| 14 | **KF-SST-13** ⟨kf-StartingStyleTarget⟩ | C-6 `StartingStyleTarget.vue:211` — a demo-side block whose effect is a producer question (SS-6) | **RESOLVES** |
| 15 | **D-8 / C-§5** ⟨kf-SequencePlayhead⟩ | §2.5's custom-property transform `SequencePlayhead.vue:46`/`:51` | **RESOLVES** — mechanism input, no tally charge |
| 16 | **KF-SKEL-11** ⟨kf-App.skeleton⟩ | K-4 `App.skeleton.vue:81` **1.6s** infinite, gated at C-8 | **RESOLVES** — the shimmer's own clock is measured here; the `--duration-shimmer` comparison is a producer token and is not re-derived in this file |
| 17 | **KF-HA-9** ⟨kf-HeroAurora⟩ | `HeroAurora.vue` carries **no local motion declaration** (0 hits for every layer pattern); its docblock `:6` names *"the rAF-coalescing, the PRM-safe"* path and `:81-82` the per-rAF uniform upload — the loop is composable/producer-side | **RESOLVES as a boundary row** — the mechanism (*"PRM gates the reschedule, not the suspend set"*) is not a demo-side motion site; SS-6's half stays SS-6's |
| 18 | **D-24** ⟨kf-PlaybackRibbon⟩ | §2.5's utility-class class; `demo/components/playback/` has **zero** `prefers-reduced-motion` tokens; `PlaybackRibbon.vue:65` `transition-transform duration-fast` | **RESOLVES** — accidental compliance, located at the class the producer allowlist governs |

**18 of 18 resolve. 0 rows fail to find a coordinate in the enumeration.**

---

## 4 · What this enumeration does NOT claim

- It does **not** re-grade any banked row. Where a measurement sharpens a row (rows 2, 5), the sharpening
  is stated as an *addition* and the bank's severity is untouched.
- It does **not** measure *effect*. A gate present in the bytes may be defeated at render by the
  producer's unlayered `!important` reset (three banked witnesses) — that is a **rendered** question and
  belongs to the capture band, which is blocked at this seat (`DESKTOP-CELL-B.md`).
- It does **not** close G-KFW9-6's unification constraint, which is HANDED to KF.W5/KF.W6 and reads
  **UNMEASURED** here (§0j.C; RULINGS-4 R4-3).
- It is a **static** census at one ref. The FLAG-STORED classification is true on a **store-empty
  profile**; a profile whose `animation-groups-options-store` localStorage entry predates
  `defaultAnimationOptions`'s flag would carry whatever was persisted. **Stated as a bound**, and it is
  one more reason the rendered witness is owed.

---

## 5 · Substrate invariance — what a re-pin would cost this census

The kf tree moved twice during this wave (SUBSTRATE-PIN §8; `DESKTOP-CELL-B.md` §1). KF.W4's `.a`
committed at **`5388907b`** (= `55e9bf0d` + 1, 23 `demo/` files, *"cure the day-one type surface"*).
**The census was re-derived at BOTH refs and differenced**:

| census | pin `55e9bf0d` | frontier `5388907b` | delta |
|---|---|---|---|
| PRM lines (`prefers-reduced-motion` ∪ `respectReducedMotion`) | **25** | **25** | **one coordinate**: `EasingTarget.vue:234` → **`:241`** (+7). Content byte-identical. |
| engine instantiations (4 constructors) | **40** | **40** | **three coordinates**, all in `useSquareDemo.ts` (`:60`→`:85`, `:61`→`:86`, `:343`→`:368`). Content byte-identical. |

⟨`diff prm-pin.txt prm-frontier.txt`⟩ → 1 line differs · ⟨`diff eng-pin.txt eng-frontier.txt`⟩ → 3 lines
differ. **Every figure in this file is substrate-invariant across the move; exactly four coordinates
drift, and they are named here so a re-pin is a re-anchoring of four lines and not a re-census.** That is
the price of the re-pin, measured rather than feared — it is offered to the orchestrator as evidence, and
this file **rules nothing** about which ref the wave pins.

---

## 6 · THE AMENDMENT DRAFT — handed to `.e`, placed by `.e` alone

*`.b` writes no byte of `CENSUS-2026-08-03.md`; `lane-frontend.md §6.5` is read-only **and never
rewritten** (§Bounds `:70`) — it stays dated evidence of what was believed on 2026-08-03. The text below
is the DRAFT the `evidence/W9/**` create row authorises, for `.e`'s write-back.*

> **PRM enumeration — amends the census row; supersedes `lane-frontend.md §6.5`'s tally as the figure of
> record (X.KF.W9 `.b`, 2026-09-17, at `55e9bf0d`).**
>
> §6.5's *"13 enforcement sites across 12 files (10 CSS + 3 JS)"* is superseded by measurement, not
> correction-in-place: the lane file stays dated evidence.
>
> **Enforcement**: **14 sites / 14 files / 4 mechanisms** — 10 CSS `@media` blocks · 2 `matchMedia`
> (`useCubeDemo.ts:164`, `useSequenceInstrument.ts:31`) · 1 `useMediaQuery` (`EasingTarget.vue:234`) ·
> 1 `usePreferredReducedMotion` (`AmigaScene.vue:58`) — **plus 4 engine-flag sites §6.5 counts nowhere**
> (`useSceneSwap.ts:45`, `TypingDots.vue:91`, `AnimationVisualizer.vue:147`, and the stored default
> `animationOptionsStore.ts:49`).
>
> **Motion**: **51 sites** — **42 engine** · 7 CSS keyframe-driven · 1 rAF loop · 1 timer tour · **0
> direct WAAPI**. **36 of 42 engine instances carry no flag** (engine default `false`,
> `defaults.ts:87`); **3 carry `true` in their own bag**; **3 carry `true` via the stored default and are
> INERT** because their play path is a group whose own `respectReducedMotion` (`group/group.ts:57`,
> consumed at `group/lifecycle.ts:80`) is never set. **`0 of 42` uses the numeric intensity form the
> adjudicated cure names.**
>
> **Six of the ten CSS blocks gate `transition` in files with no local `animation`** — compliance
> authored over a layer with no motion.
>
> Full enumeration, counting rules and commands: `docs/tranches/X/keyframes/evidence/W9/PRM-ENUMERATION.md`.

---

## 7 · Gate reading

**G-KFW9-5: RED → GREEN at this seat's limb.**
**BEFORE** ⟨`sed -n '462p' lane-frontend.md`⟩ → *"13 enforcement sites across 12 files"* standing as the
only tally, with *"no replacing enumeration anywhere in the tree"* (the wave's opening witness).
**AFTER**: ONE enumeration exists — every demo motion, four layers, flag state per site, 51 motion sites
and 14 enforcement sites both self-counted from the settled bytes and double-run; **18 of 18 §A rows
resolve against it**; the amendment rides as a DRAFT and **no census byte is written by this seat**.
The gate's fail conditions are checked and clear: no row is unresolved, the lane file is untouched, and
the amendment is not placed by the wrong hand.
