claude-opus-5[1m] (served model id)

# CHALLENGE · `ConvergenceTimeline.vue` · axis **L (LIBRARY)**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/equation/convergence/ConvergenceTimeline.vue` (146 lines; 57 script, 28 template, 58 style)
**Substrate** fourier HEAD `cd26c65`; the file is **`M` in the working tree** (one of the 28 uncommitted M.W1a paths). Both readings below are of the *working-tree* text, with the committed delta cited where it matters.
**Read whole (read-only):** the subject; its two imports resolved to the installed producer (`@mkbabb/glass-ui@4.0.0` — `dist/slider.js`, `dist/slider-DQ95MET2.js`, `dist/components/ui/slider/{index,Slider.vue}.d.ts`, `dist/button.js`, `dist/components/ui/button/Button.vue.d.ts`, `dist/button-BNDWhAZb.js`, `dist/glass-ui.css`, `dist/useTouchGate-28Tk2-t2.js`, `dist/dockContext-Bu1Avy-a.js`, `dist/timeline.js`, `dist/components/custom/timeline/*.d.ts`) and *its* transitive primitives (`reka-ui@2.9.x` `src/Slider/{SliderRoot,SliderImpl,SliderThumbImpl}.vue`); the sole consumer `equation/ConvergencePlot.vue` (410) and its mount path `equation/EquationView.vue:309` → `router/index.ts:92`; the two in-tree twins `visualization/GlassTimeline.vue` (127) and `ui/SliderControl.vue`; the sibling `visualization/AnimationControls.vue`; the e2e gate (`e2e/visual-baseline.spec.ts`, `e2e/visualization-ux.spec.ts`); `web/tsconfig.json`, `web/package.json`.
**Tooling** static + source-derived only. One read-only command was run against the tree — `npx vue-tsc --noEmit` (result quoted verbatim in D-12). No browser. Livable-only claims are marked **UNPROVEN-NEEDS-LIVE (SS-13)**.
**Corpus folded** `formation/fourier/{CENSUS-2026-08-03.md, lane-frontend.md}` and `audit/codex-provenance/intakes/lane-fourier-r3-r6.md`. Overlaps cited by row id; one explicit contradiction of the corpus is filed as **D-7**.

**Verdict — the component is DEFECTIVE.** It hand-rolls a scrub state machine on top of a primitive whose end-of-interaction signal is *conditional*, and therefore emits `scrub-start` without a matching `scrub-end` on ordinary gestures — stranding the parent's animation clock while the UI still reads "playing". The producer ships the exact contract it reinvents, correctly, at the pinned version, unimported.

**Tally — 14 defects (1 BLOCKER · 5 MAJOR · 7 MINOR · 1 INFO) · 4 superlatives.**

---

## §1 · The seam under audit

```
ConvergencePlot.vue  (owns t, playing, rAF loop, canvas)
   │  :t :playing :active-count :total-harmonics
   │  @toggle-play @scrub-start @scrub-move @scrub-end
   ▼
ConvergenceTimeline.vue         ← subject
   ├── <Button variant="glass" size="icon">     @mkbabb/glass-ui/button
   └── <Slider variant="standard">              @mkbabb/glass-ui/slider
            └── reka-ui SliderRoot → SliderHorizontal → SliderImpl → SliderThumbImpl
```

The subject is a **transport chassis**: it owns no clock, no canvas, no store. Its whole contract is the four-signal emit surface. Every BLOCKER/MAJOR below is a defect *of that contract*.

Viz-render-path provenance: `[FE §6]` / `lane-frontend.md:559` — "`ConvergencePlot.vue:93` `getContext("2d")`; own loop at `:67-69` `requestAnimationFrame(tick)` … **Not** gated by `stores/animation.ts` — a second, ungated clock." **This component is the only user-facing transport for that second clock.** Canvas2D throughout; WebGL/WebGPU absent `[FE §6]` — so there is no GL context, no shader program, and no GPU resource for this file to leak. Its render-path exposure is exactly one thing: whether `scrub-start`/`scrub-end` correctly start and stop `ConvergencePlot`'s rAF.

---

## §2 · Defects

### D-1 · **BLOCKER** · `scrub-start` fires without a matching `scrub-end`; the parent's rAF clock is stranded while the UI reads "playing"

**Provenance**
- `ConvergenceTimeline.vue:46-50` — `onPointerDown()` sets `scrubbing = true` and emits `scrub-start`, bound at `:80` `@pointerdown="onPointerDown"`.
- `ConvergenceTimeline.vue:52-56` — `onValueCommit()` is the **sole** path that clears the latch and emits `scrub-end`, bound at `:81` `@value-commit="onValueCommit"`.
- `reka-ui/src/Slider/SliderRoot.vue:128-134` —
  ```js
  function handleSlideEnd() {
    const prevValue = valuesBeforeSlideStartRef.value[valueIndexToChangeRef.value]
    const nextValue = currentModelValue.value[valueIndexToChangeRef.value]
    const hasChanged = nextValue !== prevValue
    if (hasChanged) emits('valueCommit', toRaw(currentModelValue.value))
  }
  ```
  `valueCommit` is emitted **only if the value differs from the value at pointerdown** (`valuesBeforeSlideStartRef` is captured on the root's own `@pointerdown`, `SliderRoot.vue:184-186`).
- `ConvergencePlot.vue:282-284` — `onScrubStart() { stopLoop(); }`; `:289-291` — `onScrubEnd() { if (playing.value) startLoop(); }`; `:72-75` — `stopLoop()` cancels the rAF and nulls `loopStartTime`.

**Failure scenario (deterministic, no timing race).** `playing === true`, the plot is animating. The user presses on the track, drags, changes their mind and **returns to the value they started from**, then releases.
1. `pointerdown` → `scrubbing = true`, `scrub-start` → `ConvergencePlot.stopLoop()` — the rAF chain is cancelled.
2. `pointerup` → reka `handleSlideEnd()` → `prevValue === nextValue` → **no `valueCommit`**.
3. `onValueCommit` never runs → `scrub-end` never emitted → `startLoop()` never called.
4. **`playing` is still `true`.** The pause glyph (`:63`) and the `.is-playing` paint (`:124-128`) both still assert "playing". The canvas is frozen. Nothing in the tree reconciles this.
5. Second order: `scrubbing` is stuck `true`, so the `:47` guard `if (scrubbing.value) return;` **suppresses every subsequent `scrub-start`**. Once the user restarts the clock (two play-button presses), the next drag no longer stops the loop — `onScrubMove` writes `t` and the live rAF tick overwrites it on the next frame (`ConvergencePlot.vue:61-65`). The scrubber is inoperative until a value-changing drag completes.

Two further triggers of the same class, from the same reka guard: **press-and-release without moving**, and **a track click landing inside the ~1 %-of-width band that rounds to the current integer** (`:74` `:step="1"` over `:min="0"`/`:max="100"`).

**Falsifiers, each checked**
- *"reka commits unconditionally."* — False: `SliderRoot.vue:131-133`, quoted above, is a bare `if (hasChanged)`.
- *"The consumer has a pointerup/pointercancel fallback."* — False: the file's only two listeners are `:80 @pointerdown` and `:81 @value-commit` (`grep -n "@pointer\|@value\|@lost" ConvergenceTimeline.vue` → lines 80, 81 only).
- *"The parent reconciles."* — False: `ConvergencePlot.vue:289-291` is the only `startLoop()` caller besides `togglePlay` (`:276`) and `onMounted` (`:324`).
- *"Pressing the thumb is the only trigger, and the thumb is unhittable."* — Partly true and it does **not** save the claim. The `standard` variant thumb is `width:0;opacity:0` (`dist/glass-ui.css`, `.slider-thumb[data-v-534634a7]`) and its hit halo is explicitly inert (`.slider-thumb.touch-hit-area[data-v-534634a7]:before{pointer-events:none}`), so the thumb is *not* the usual target — the **round-trip drag** and the **same-integer click** paths are on the track and are unaffected.

**The producer already solves this.** `@mkbabb/glass-ui/timeline` → `ScrubberTimeline` (installed, `dist/timeline.js`) binds `onPointerup: f, onPointercancel: f` where `f() { c.value = !1, r("scrubEnd") }` — **unconditional**, both events. See D-7.

---

### D-2 · **MAJOR** · No `pointercancel` / `lostpointercapture` recovery — an interrupted touch strands the latch permanently

**Provenance** `reka-ui/src/Slider/SliderImpl.vue:49-73` binds exactly three pointer events — `@pointerdown`, `@pointermove`, `@pointerup`. There is **no `pointercancel` and no `lostpointercapture` handler anywhere in the chain**, and the subject adds none (`ConvergenceTimeline.vue:80-81`).

**Failure scenario.** A touch drag on the slider is cancelled by the UA (system edge gesture, scroll takeover, incoming call, the element being re-laid-out). Pointer capture is implicitly released; **`pointerup` never fires**; `slideEnd` never fires; `valueCommit` never fires. `scrubbing` is stuck `true` and the parent's loop is stopped with `playing === true` — the D-1 end state, reached without any "same value" coincidence, and not self-healing (the `:47` guard blocks the next `scrub-start`).

Aggravator, **UNPROVEN-NEEDS-LIVE (SS-13)**: the installed glass Slider wraps a touch gate that swallows the *first* touch (`dist/slider-DQ95MET2.js` `F(e) { … P.handleTouchStart(t, n.clientY) || (e.preventDefault(), e.stopPropagation()) }`, with `handleTouchStart` returning `false` on the arming pass — `dist/useTouchGate-28Tk2-t2.js`, function `S`, 150 ms arm / 10 px move-abort / 3 s auto-deactivate). Because `pointerdown` precedes `touchstart` in the UA event order, `scrub-start` is emitted *before* the gate decides to swallow. I can prove the code paths statically; I cannot prove the resulting first-tap frequency without a device. Flagged, not counted as CONFIRMED.

**Falsifier** — *"reka or glass handles cancel upstream."* Checked and false: `grep -o "pointercancel\|lostpointercapture" reka-ui/src/Slider/*.vue` → 0; the only `pointercancel` in the glass Slider chunk belongs to `useDockHold`'s *window* cleanup (`dist/slider-DQ95MET2.js`, function `c`), which releases a dock token and emits nothing.

**Cross-repo precedent (this is a known, already-cured class).** value.js hit exactly this defect against the same primitive and cured it consumer-side: `/Users/mkbabb/Programming/value.js/demo/picker/controls/ComponentSliders/composables/useSliderTouchGates.ts:9` — *"leak recovery (`pointercancel`/`lostpointercapture`)"* — with the handlers registered at `:91-92` and torn down at `:98`. fourier's Slider consumers carry none.

---

### D-3 · **MAJOR** · The play/pause button has no accessible name

**Provenance** `ConvergenceTimeline.vue:61-66`:
```html
<Button variant="glass" size="icon" class="play-btn" :class="{ 'is-playing': playing }" @click="emit('toggle-play')">
  <Transition name="icon-swap" mode="out-in">
    <svg v-if="playing" class="size-3" viewBox="0 0 320 512" …>
    <svg v-else        class="size-3" viewBox="0 0 384 512" …>
```
No `aria-label`, no `<title>`, no visually-hidden text, no `Tooltip`. The only `aria-*` in the entire file are the four Slider attributes at `:75-78`. The producer contributes nothing: `dist/components/ui/button/Button.vue.d.ts` declares `variant | size | class | type | disabled` + `PrimitiveProps` — no name injection.

**Failure scenario.** Screen-reader and voice-control users reach a `<button>` whose accessible name computes to the empty string. axe `button-name` is **critical**; WCAG 4.1.2. Voice control ("click …") has no target token at all.

**Falsifier** — *"the SVG supplies a name."* False: neither `<svg>` carries `role`, `aria-label`, or `<title>`; SVG content is not part of the accname text alternative here.

**Contradicted one directory away, in the same repo.** `visualization/AnimationControls.vue:67` and `:82` render the *identical* control with `:aria-label="anim.playing ? 'Pause animation' : 'Play animation'"` **and** a wrapping `Tooltip`. The correct pattern exists in-tree; this file did not adopt it.

**Why CI cannot see it:** see D-14.

---

### D-4 · **MAJOR** · The ARIA value trio is on the wrong element *and* carries the wrong quantity

**Provenance** `ConvergenceTimeline.vue:75-78`:
```html
:aria-valuenow="activeCount"   aria-valuemin="0"   :aria-valuemax="totalHarmonics"   aria-label="Harmonics timeline"
```
Attribute routing, traced end to end:
- The glass `Slider` does **not** set `inheritAttrs: false` (no such key in the compiled component object, `dist/slider-DQ95MET2.js`), so `$attrs` fall through to its single root — `SliderRoot`.
- `reka-ui/src/Slider/SliderRoot.vue:77-79` sets `inheritAttrs: false` and re-binds `v-bind="$attrs"` at `:174` onto `SliderHorizontal`/`SliderVertical` → `SliderImpl` → `Primitive as="span"` (`SliderImpl.vue:21-22, 29-31`). **The trio lands on `<span data-slider-impl>`, which has no `role`.** `aria-valuenow/min/max` are defined only for widget roles (`slider`, `spinbutton`, `progressbar`, `scrollbar`) — on a role-less span they are **inert**.
- The real `role="slider"` element is the thumb, and it computes its own values: `reka-ui/src/Slider/SliderThumbImpl.vue:59, 64-66` — `role="slider"`, `:aria-valuenow="value"`, `:aria-valuemin="rootContext.min.value"`, `:aria-valuemax="rootContext.max.value"` — i.e. **0…100 on the scaled `t` axis**.

**Failure scenario.** With 12 harmonics and 3 active, the author intends "3 of 12". AT announces the thumb: *"slider, 47, minimum 0, maximum 100"*. The harmonic count is never conveyed by any route. Additionally `aria-label="Harmonics timeline"` is emitted **twice** — once on the inert span via fallthrough, once on the thumb (the glass Slider explicitly re-reads it: `dist/slider-DQ95MET2.js`, `"aria-label": n.$attrs["aria-label"] ?? void 0` on each `SliderThumb`; consumed at `SliderThumbImpl.vue:61`). And `:aria-valuemax="totalHarmonics"` evaluates to `0` whenever `trigHarmonics.length === 0` (`ConvergencePlot.vue:370`), yielding `valuemax === valuemin` — an invalid range, were it live.

**Falsifier** — *"glass hoists the trio to the thumb like it hoists `aria-label`."* False: the compiled thumb render hoists **only** `aria-label` (single `$attrs` read, quoted above).

**The correct vehicle is `aria-valuetext`**, which is exactly for "value better represented by text than a number" — and neither this file nor the producer's scrubber supplies one (`ScrubberTimeline` sets `aria-valuenow: Number(modelValue ?? 0)` on a 0…1 axis, `dist/timeline.js`). Recording it so the D-7 cure is not read as an ARIA fix on its own.

---

### D-5 · **MAJOR** · Keyboard scrubbing is inoperative while playing, and the same asymmetry can spawn a second rAF chain that outlives unmount

**Provenance**
- The scrub-open signal is bound **only** to `pointerdown` (`ConvergenceTimeline.vue:80`).
- reka commits keyboard steps with no pointer event at all: `SliderRoot.vue:190-201` routes Home/End/arrow/PageUp/PageDown through `updateValues(…, { commit: true })`, and `:146-147` emits `valueCommit` inside that call.
- `ConvergencePlot.vue:57-70` `startLoop()` — **no `stopLoop()` first, no `rafId !== null` guard**; it overwrites `rafId` unconditionally.
- `ConvergencePlot.vue:329-333` `onUnmounted` — `stopLoop(); cancelTransition?.(); resizeObserver?.disconnect();` — **never sets `playing.value = false`**.
- `ConvergencePlot.vue:60` — the tick's only exit is `if (!playing.value) return;`.

**Failure scenario A (keyboard, plain).** A keyboard user tabs to the thumb and presses ArrowRight while playing. `scrubbing` is `false`, so `scrub-start` is never emitted and the parent never calls `stopLoop()`. `scrub-move` lands, `t` updates, `draw()` runs — and the still-live tick recomputes `t` from `loopStartTime` on the very next frame (`ConvergencePlot.vue:61-65`), erasing it. **Keyboard scrubbing does nothing while playing** — precisely the state in which scrubbing is wanted.

**Failure scenario B (the leak).** Start from the D-1 stuck state (`scrubbing === true`, loop stopped, `playing === true`). The user presses play/pause twice to get motion back → loop chain #1 is live, `scrubbing` still `true`. Any commit now — a keyboard step, or a value-changing drag whose `scrub-start` was suppressed by the `:47` guard — runs `onValueCommit` (`:52-56`), clears the latch and emits `scrub-end` **with no preceding `scrub-start`**. The parent's `onScrubEnd` (`ConvergencePlot.vue:289-291`) calls `startLoop()` while chain #1 is still scheduled. `rafId` is overwritten; **chain #1 is orphaned and uncancellable**. Both chains write `t` and call `draw()` each frame. On unmount, `stopLoop()` cancels one; the orphan's guard `!playing.value` is never satisfied because `onUnmounted` doesn't clear it — so it re-schedules forever, calling `draw()` (which bails at `ConvergencePlot.vue:82` on the nulled template refs) once per frame for the life of the tab.

**Falsifiers, each checked**
- *"`startLoop` is idempotent."* — False: `ConvergencePlot.vue:57-70` has no guard and no prior cancel.
- *"`onUnmounted` clears `playing`."* — False: `:329-333`, quoted above.
- *"`scrub-end` without `scrub-start` is unreachable."* — False: reachable exactly as in scenario B, because the `:47` guard and the `:53` guard read the *same* latch from opposite ends; once the latch desynchronises (D-1), the two guards disagree about whose turn it is.

**Attribution.** The amplifier (unguarded `startLoop`, unclear `playing` on unmount) is `ConvergencePlot`'s and belongs to that component's own L-challenge. The *enabling* defect — an emit contract whose pairing invariant is not enforced at either end — is this file's, which is why it is filed here at MAJOR rather than as the parent's BLOCKER.

---

### D-6 · **MINOR** · `--slider-scrub-track-height` is dead CSS: the token has never existed in glass-ui, and the supported knob is not overridable this way

**Provenance** `ConvergenceTimeline.vue:135-137`:
```css
.convergence-slider { --slider-scrub-track-height: 20px; }
```
Measurements:
- Installed producer: `grep -rl "slider-scrub-track-height" node_modules/@mkbabb/glass-ui/dist/` → **0 files**.
- Producer **source at 7.0.0**: `grep -rn "slider-scrub-track-height" /Users/mkbabb/Programming/glass-ui/src/` → **0**; `grep -rn "glass-scrubber" src/` → **0**. Neither the token nor the variant it belonged to has ever shipped.
- The real knob is `--slider-track-height`: `dist/glass-ui.css` reads it twice — `.slider-track[data-v-534634a7]{…height:var(--slider-track-height,.375rem)…}` and `.slider-thumb[data-v-534634a7]{…height:var(--slider-track-height,.375rem)…}`.

**Failure scenario, and its honest limit.** The declaration is inert; the requested 20 px track is never applied *as written*. **It produces no visual delta today**, because the default `size="md"` already sets `.glass-slider[data-size=md][data-v-534634a7]{--slider-track-height:1.25rem}` = 20 px at a 16 px root — the exact value asked for. So this is dead code plus a false belief encoded in source, not a rendering bug. **Falsifier accepted and stated:** had the author wanted anything other than 20 px, the failure would be visible; it is not, so the claim is confined to deadness.
Worse for any naive repair: renaming to `--slider-track-height` **still would not work** — the producer's setter `.glass-slider[data-size=md][data-v-534634a7]` has specificity (0,3,0) against a consumer's `.convergence-slider[data-v-parent]` at (0,2,0). The supported override is the `size` prop (`sm|md|lg`), not a custom property on the root.

**The migration is provably half-applied at this file.** `git diff` on the subject shows exactly two changed lines — `:6` and `:72`, both `glass-scrubber` → `standard`. The orphan token at `:136`, which belonged to the deleted variant, was left behind. **The same orphan namespace survives elsewhere**: `ui/SliderControl.vue:139-144` sets five of them (`--slider-scrub-track-height` **and** `--slider-scrub-range-bg`, `--slider-scrub-range-bg-hover`, `--slider-scrub-thumb-bg`, `--slider-scrub-thumb-bg-hover`) — there the deadness *is* visible, because the per-instance `--track-color` tint it exists to project is silently dropped; and `visualization/GlassTimeline.vue:125` sets a sixth. Corroborates `lane-frontend.md:382`'s "all 11 `glass-scrubber` … occurrences are prose comments only" by adding the part that lane missed: the *token* family is live CSS, not prose, and it is entirely orphaned.

---

### D-7 · **MAJOR** · Undeclared shadow — this file re-forks a producer component that ships at the pinned version, with a strictly better contract · **CONTRADICTS the corpus**

**Provenance**
- `@mkbabb/glass-ui/timeline` is exported at the **installed 4.0.0** (`package.json` exports `./timeline`; `dist/components/custom/timeline/index.d.ts`) and at 7.0.0.
- `dist/components/custom/timeline/GlassTimeline.vue.d.ts` — `variant?: "scrubber" | "segmented" | "continuous"` (**default `scrubber`**), `modelValue?: number` ("0..1 scrubber position"), emitting `"update:modelValue": (v: number)`, `scrubStart: () => any`, `scrubEnd: () => any`.
- `dist/components/custom/timeline/ScrubberTimeline.vue.d.ts` — *"single-track normalized 0..1 scrubber … pointer-capture drag, keyboard a11y (role=slider + arrow-key step + shift-step) … AA.A4 §S-16 — the `aria-valuenow` binding coerces `Number(modelValue ?? 0)` so a numeric attribute always renders (axe `aria-required-attr` regression)."*
- Compiled behaviour (`dist/timeline.js`, `ScrubberTimeline` setup): `onPointerdown: u` → `setPointerCapture` + `scrubStart` + immediate `update:modelValue`; `onPointerup: f` **and** `onPointercancel: f` → `scrubEnd`, **unconditional**; `onKeydown: p` → arrow/shift-arrow step on the 0..1 axis with `preventDefault`; `role="slider" tabindex="0" aria-valuenow=… aria-valuemin="0" aria-valuemax="1"` on the **track**.

That is, line for line, the contract this file hand-rolls — `modelValue` already on the `t` axis (no ×100 adapter), `scrubStart`/`scrubEnd` already paired, `pointercancel` already handled, ARIA already on a real `role="slider"` host. **Lines 36-56 of the subject (the `scrubbing` latch + `tArr` adapter + two handlers, 21 lines) are the fork.** `grep -rn "glass-ui/timeline" web/src/` → **0 imports**.

**The corpus undercounts.** `lane-frontend.md:397-403` files the HARD-SHADOW list as `GlassTimeline.vue` (127) alone — *"Name-identical, zero-import: the strongest shadow signal in the tree."* `ConvergenceTimeline.vue` appears only as an ordinary component row, `lane-frontend.md:134` — *"146 | `Slider`-driven harmonic timeline"* — and in the prose-comment census at `:382`. The tree disagrees: it is a **second fork of the same producer recipe**, and the two forks are near-verbatim:

| | ConvergenceTimeline.vue | GlassTimeline.vue |
|---|---|---|
| latch | `:36` `const scrubbing = ref(false)` | `:30` identical |
| adapter | `:38-44` `computed<number[]>` · `[Math.round(x*100)]` · `Math.max(0,Math.min(1,(arr[0] ?? 0)/100))` | `:35-41` identical body |
| open | `:46-50` guard + set + emit | `:43-51` identical shape |
| close | `:52-56` guard + clear + emit | `:53-57` identical |
| bindings | `:70-74, 80-81` `variant="standard" :min="0" :max="100" :step="1" @pointerdown @value-commit` | `:66-74` identical |
| dead token | `:136` `--slider-scrub-track-height: 20px` | `:125` same token, `24px` |

**Both therefore carry D-1 and D-2 identically** — the defect is duplicated, not isolated.

**Correction owed to the census.** lane-frontend's shadow aggregate (`:446`) reads "9 components / ~1 990 LOC (…≈ 2 079 counting the canvas-drawing lib; 1 315 excluding it)" — already amended by `CENSUS §2 C-5`. Adding this file: **10 components / 2 225 LOC incl. canvas-drawing (1 461 excluding)**. `CENSUS §4` wave F.W3 ("`GlassTimeline` → `glass-ui/timeline`") must budget **two** call sites, not one.

**Falsifier** — *"`./timeline` doesn't exist at the pinned 4.0.0, only at 7.0.0, so this is uplift work not shadow work."* False, and lane-frontend already proved it at `:401` ("The `./timeline` subpath exists at 4.0.0 and 7.0.0"); independently re-verified here by reading the installed `dist/components/custom/timeline/*.d.ts`. **The cure is available today, before the tri-package uplift** (`CENSUS §5` risk 1), which makes this the rare fourier finding that is *not* blocked behind the resolution deadlock.

---

### D-8 · **MINOR** · Verbatim icon duplication, against a live icon dependency

**Provenance** The two Font Awesome path strings at `ConvergenceTimeline.vue:63` and `:64` are byte-identical to `visualization/AnimationControls.vue:69`/`:70` and `:84`/`:85` (`grep -rln "M48 64C21.5 64 0 85.5 0 112" web/src/` → 2 files; same for the play triangle) — three copies of each glyph in the tree. `lucide-vue-next` is a live dependency (`web/package.json`) with `Play`/`Pause`, and the *very file holding the other two copies* imports lucide at `AnimationControls.vue:6`.
The `.icon-swap-*` transition CSS is likewise duplicated across four files (`grep -rln "icon-swap" web/src/` → `AnimationControls.vue`, `gallery/UserSlugBar.vue`, `equation/EquationResult.vue`, `ConvergenceTimeline.vue`) with **divergent durations** — `0.1s` at `ConvergenceTimeline.vue:142` vs `0.15s` at `AnimationControls.vue:196` for the identically-named transition.
The class name `.play-btn` is also reused across the two files with completely different paints (28 px plain here at `:106-128`; 48×40 px rainbow-glass at `AnimationControls.vue:139-187`) — scoping prevents collision but the shared name misleads a reader into assuming a shared chassis.

**Falsifier** — *"the two buttons are genuinely different components with different needs."* Granted for the *paint*; not for the *path data* or the transition, which are identical by inspection and belong in one place (a shared icon module, or lucide).

---

### D-9 · **MINOR** · The file breaks its own inline law two rules later

**Provenance** `ConvergenceTimeline.vue:114-118` carries the annotation *"A.W3.d — named properties + canonical token, no `transition: all`"* and uses `var(--ease-standard)` on all three properties. `:142` — the next transition in the same stylesheet — uses the raw CSS keyword and a raw duration:
```css
.icon-swap-enter-active, .icon-swap-leave-active { transition: opacity 0.1s ease, transform 0.1s ease; }
```
The twin copy at `AnimationControls.vue:196` carries the same A.W3.d annotation **and** uses `var(--ease-standard)`. This file is the sole outlier.

**Falsifier** — *"`ease` is deliberate for icon swaps."* Unsupported: no comment says so, and the identical transition elsewhere in the tree uses the token.

---

### D-10 · **MINOR** · `variant="glass"` is bought, then overridden away

**Provenance** `:61` requests the producer's `glass` Button variant and `size="icon"` — both are real keys (`dist/button-BNDWhAZb.js` CVA: `default | solid | primary-audacious | gold-audacious | destructive | outline | secondary | accent | ghost | glass | glass-wash | ai | link`; sizes `default | xs | sm | lg | icon | icon-sm`), so this is **not** an invalid-variant defect like the committed `glass-scrubber` was. But `:106-128` then re-specifies `width`, `height`, `border`, `background`, `backdrop-filter`, `color`, `transition`, plus `:hover` and `.is-playing` states. Specificity: scoped `.play-btn[data-v-x]` = (0,2,0) and `.play-btn:hover[data-v-x]` = (0,3,0) beat Tailwind's single-class utilities at (0,1,0)/(0,2,0) — including precisely the variant's payload (`glass-wash btn-glass … hover:bg-(--glass-bg-resting) hover:border-(--glass-border-resting)`).

**Failure scenario.** The design-system variant contributes essentially nothing but the base chassis and focus ring; a future glass-ui re-paint of `variant="glass"` will not reach this button, and the local paints will drift from the system silently. This is the standing value.js feedback class (root-level styling over per-instance override; glass-ui first-class), not a runtime bug — hence MINOR.

**Falsifier** — *"some glass paint survives."* Only what is not re-specified (chassis layout, focus-ring, the `[&_svg…]` glyph sizing — itself opted out of by `class="size-3"` at `:63-64`, which matches the variant's own `:not([class*=size-])` escape).

---

### D-11 · **MINOR** · No reduced-motion posture, against its own neighbourhood — and it is the transport for the tree's ungated clock

**Provenance** `grep -c "prefers-reduced-motion" ConvergenceTimeline.vue` → **0**. Its parent has one (`ConvergencePlot.vue:405-409`) and its twin has one (`AnimationControls.vue:178-180`). `lane-frontend.md:619` enumerates the tree's eight `reduce` blocks — this file is not among them. The `.icon-swap-*` rules (`:140-145`) animate `transform: scale(0.7)`.

**Coupling to the census gap.** `lane-frontend.md:624` / `:644` books the ungated-clock finding: *"the two ungated animation clocks are `stores/animation.ts` … and `equation/ConvergencePlot.vue`'s own rAF (`:67-69`; the file's `reduce` block at `:405` is CSS-only and does not stop `tick`)."* This component is that clock's **only** transport, and its prop contract cannot express the cure: `playing: boolean` (`:24`) has no channel for "suppressed by motion preference", and the parent autostarts unconditionally at `ConvergencePlot.vue:324` (`playing.value = true; startLoop()`). So the F.W4 cure requires a *contract* change here, not only a CSS block — recording it so the wave does not budget a one-line media query.

**Falsifier** — *"WCAG 2.2.2 is satisfied by the visible play/pause transport."* That is lane-frontend's own (fair) mitigation at `:624` — and it is **weaker here than there**, because this transport's control has no accessible name (D-3), so the pause affordance is unreachable by AT.

---

### D-12 · **MINOR** · Latent wrong-type hole on the model setter, and the gate does not see it

**Provenance** `ConvergenceTimeline.vue:40-43`:
```ts
set: (arr) => { const next = Math.max(0, Math.min(1, (arr[0] ?? 0) / 100)); emit("scrub-move", next); }
```
`arr[0] ?? 0` guards the *element*, not the *array*. The producer types the emit as `"update:modelValue": (payload: number[] | undefined) => any` (`dist/components/ui/slider/Slider.vue.d.ts`), forwarded from `reka-ui/src/Slider/SliderRoot.vue:44`. `tArr` is `computed<number[]>` (`:38`), so its setter parameter is `number[]`; an `undefined` payload would reach `arr[0]` and throw `TypeError`.

**Measured gate behaviour.** `web/tsconfig.json` sets `"strict": true`, yet `npx vue-tsc --noEmit` over the tree emits exactly one diagnostic, and it is elsewhere:
```
src/components/paper/PaperView.vue(12,8): error TS2882: Cannot find module or type declarations for side-effect import of '@mkbabb/latex-paper/theme'.
```
No diagnostic for this assignment. The tree's sole typecheck gate does not catch the narrowing.

**Falsifier, and why the severity is MINOR.** *"`undefined` is reachable."* — Not today: reka's only writer assigns an array (`SliderRoot.vue:151` `modelValue.value = nextValues`), and `useVModel` is in controlled mode because `modelValue` is always bound (`:109-112`). The hole is real in the **type contract** and unreachable in the **current call graph**; it becomes live the moment an uncontrolled/`defaultValue`-reset path is introduced upstream.

---

### D-13 · **MINOR** · Duplicated state and one node of layout contrivance

**Provenance**
- `:36` `const scrubbing = ref(false)` mirrors a phase the parent already owns implicitly through `stopLoop`/`startLoop`. Its only function is to de-duplicate `scrub-start` — and that de-duplication is exactly what converts a single missed `valueCommit` into a *permanent* contract desynchronisation (D-1 step 5, D-5 scenario B). A latch that exists to enforce an invariant, while having no path to re-synchronise, is the wrong shape; the producer's scrubber needs no latch at all because its end signal is unconditional.
- `:68` / `:83` `.timeline-track-wrap` wraps a single child: `@apply flex-1 min-w-0 relative flex items-center; padding: 0 0.125rem;` (`:130-133`). Its parent `.timeline-dock` is already `flex items-center gap-2` (`:92-94`) and `<Slider>` already accepts `class` (it is in the producer's prop list, merged via `cn()`), so the wrapper adds a DOM node and a `relative` containing block that nothing positions against. KISS / no-contrivance.

**Falsifier** — *"the wrapper is needed because scoped styles can't reach the child root."* False: Vue applies the parent's scope id to a child component's root element; `.convergence-slider` at `:135` already relies on exactly that mechanism, one rule below.

---

### D-14 · **INFO** · Zero functional and zero a11y coverage for this component

**Provenance**
- vitest is **absent** from the repo (`CENSUS §3a` / `[FE §0, §9]`; `web/package.json` scripts = `dev`, `build`, `preview`, `test:e2e`, `test:e2e:ui`).
- Mount path: `router/index.ts:92-94` `/equation` → `EquationView.vue` → `:309` `<ConvergencePlot>` → `ConvergencePlot.vue:366` `<ConvergenceTimeline>`.
- e2e route coverage, measured — `grep -rn "goto(" web/e2e/*.ts`: `/visualize` ×12, `/gallery` ×5, `/v/${slug}` ×1, `/paper` ×1, plus one parametrised sweep. `/equation` appears **only** in that sweep: `e2e/visual-baseline.spec.ts:34` `{ slug: "equation", path: "/equation" }`.
- What that spec does (`:47-71`): `page.goto(pg.path, …).catch(() => {})` → `waitForTimeout(1200)` → `emulateMedia({ reducedMotion: "reduce" })` → `screenshot({ animations: "disabled" })` → assert `scrollWidth - clientWidth <= 2`. **No interaction, no assertion on behaviour, and the navigation failure is swallowed by `.catch(() => {})`.**
- The axe gate (`e2e/visualization-ux.spec.ts:26-42`, `withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa"])`, serious/critical → fail) runs only after `page.goto("/visualize")` (`:47`) and the `/w/…` workspace flow.

**Consequence.** D-1/D-2/D-5 are behavioural and unexercised; D-3/D-4 are axe-detectable (`button-name` critical, `aria-*` misuse) and **structurally out of the axe gate's reach**. Filed INFO because it is a property of the gate, not of the component — but it is why every defect above could ship green.

---

## §3 · R5-7 (native-template-loop invisibility) — disposition

**NOT APPLICABLE at this component's surface. Stated, not skipped, because the brief requires the disposition either way.**

- Falsifier run: `grep -c "v-for" ConvergenceTimeline.vue` → **0**. The template has neither component loops nor native element loops; every child is a fixed node (`Button`, two `svg` under a `Transition`, a wrapper `div`, `Slider`, a `span`).
- Therefore the subject contributes **0** to both totals adopted in `CENSUS ADDENDUM §"Adopted facts" 2` ("16 template loops (+16 native, R6)"). No correction is owed to the census on this file's account.
- Its two mounted subjects (`<Button>`, `<Slider>`) are **component callsites**, so they are already visible to the R5-era callsite-keyed deriver; the R5-7 blindness class (`intakes/lane-fourier-r3-r6.md:125`, ADOPT-AS-FACT + CARRY → F.W4 — *"template-loop evidence keyed to component callsites is blind to native HTML element loops"*) does not bite here.
- **The adjacent nuance worth carrying to F.W4.** The one loop in this component's *rendered subtree* is producer-internal: the glass Slider renders its thumbs through `renderList(t.modelValue, …)` (`dist/slider-DQ95MET2.js`), i.e. a `v-for` over the model array inside a `node_modules` SFC. A consumer-side deriver cannot see it under **either** model — component-keyed (R5) or native-element-keyed (R6-5's `NATIVE_TEMPLATE_LOOP` family) — because both scan the consumer tree. This is a *third* blindness class, orthogonal to R5-7: **producer-internal loops behind a component boundary**. It is harmless for this file (one model element ⇒ exactly one thumb, always), but F.W4's mounted-instance denominator — already flagged OPEN in the addendum — will systematically undercount wherever a producer component fans out over a consumer-supplied array.

---

## §4 · Superlatives (L-18 runs both ways)

### S-1 · Module size is exemplary Goldilocks — the best-proportioned file in this neighbourhood

146 lines total, **57 of script**, one job, 4 props / 4 emits, no store reach-through, no props destructuring, no `defineExpose`. **Falsifier run and passed:** `grep -c "watch\|onMounted\|onUnmounted\|onBeforeUnmount" ConvergenceTimeline.vue` → **0**; no `useXStore()`, no template refs, no imperative DOM access. Contrast its own parent at 410 lines carrying the canvas, the rAF clock, the hit-test cache, a ResizeObserver, a deep watcher and KaTeX rendering (`ConvergencePlot.vue:44-53, 308-333`). The *extraction* that produced this file was the right call, cleanly executed — the composition boundary (chassis-owns-play-button-and-count, slider-owns-scrub) is exactly where the corpus's own §4 disposition would put it.

### S-2 · Zero teardown surface — and therefore zero teardown leaks

**Falsifier run and passed:** `grep -c "addEventListener\|setInterval\|setTimeout\|requestAnimationFrame\|ResizeObserver\|MutationObserver" ConvergenceTimeline.vue` → **0**. The component registers no listener, timer, observer or animation frame of its own; the two producer components it mounts own their own cleanup, verified in the installed dist — the glass Slider's `onBeforeUnmount` removes all three touch listeners and `useDockHold` removes the window `pointerup`/`pointercancel` pair *and* releases its token (`dist/slider-DQ95MET2.js`, functions `d(…)` and `c()`), and it defensively `removeEventListener`s before every `addEventListener` so repeated pointerdowns cannot accumulate. Consequence worth stating plainly: **the post-unmount rAF chain in D-5 is not this file's leak** — it holds no resource that could leak. On the axis the L-brief names first (leaks/teardown), this component is clean by construction.

### S-3 · A precisely typed, one-directional emit surface that avoids a trap value.js itself documented

`:29-34` uses `defineEmits<{ "toggle-play": []; "scrub-start": []; "scrub-move": [t: number]; "scrub-end": [] }>()` — the modern tuple form with a **named** payload element, so the parent's handler parameter is self-documenting at the call site (`ConvergencePlot.vue:372-374`). Props are read-only and never written back; there is no `defineModel` on the `t` axis, which is the right call — value.js's own memory records the `defineModel()` async-round-trip trap (writes not readable synchronously) that a two-way `t` binding here would have walked straight into, and the emit-based design sidesteps it. **Falsifier run and passed:** `props` is never assigned; all four declared emits are declared *and* consumed (`ConvergencePlot.vue:371-374`) — no dead emit, no undeclared emit.

### S-4 · A doc header that is load-bearing and mostly verifiable — a rarity in this tree

`:2-17` names its provenance (P.W5 Lane B.4), the LOC it replaced (166), the ×100 axis adaptation, and — unusually — *why an inapplicable mechanism is safe*: "this site isn't a `<GlassDock>` descendant — but the variant's internal `useOptionalDockContext()` resolves to `null` and the behavior is a no-op." **I set out to falsify that sentence and could not**: the dock context module really does export an optional accessor (`dist/dockContext-Bu1Avy-a.js`, `o.useOptional`), and `useDockHold`'s guard short-circuits on a null context (`!i() || a || !n` in `dist/slider-DQ95MET2.js`) so `keepOpen`/`release` are never called — while the listener registration and teardown remain symmetric, so the no-op costs nothing and leaks nothing. That is a comment doing real work.
The honest other half, since L-18 cuts both ways: two of the header's four claims are stale — the `glass-scrubber` variant it originally claimed to have migrated *to* never existed in glass-ui (D-6), and the token family it left behind never existed either. But the working-tree diff shows that error being repaired in place rather than papered over, and the header's *reasoning* survived the repair intact. Credit for the reasoning; the defects are filed above.

---

## §5 · Cure order (for F.W3/F.W4 budgeting — not authored here)

1. **D-7 first, and it dissolves D-1, D-2, D-4 and D-5's enabling half at once.** Replace `:36-56` + `:69-82` with `<GlassTimeline variant="scrubber" :model-value="t" @update:model-value="…" @scrub-start @scrub-end>` from `@mkbabb/glass-ui/timeline` — available at the **installed** 4.0.0, so this is *not* blocked behind the tri-package deadlock (`CENSUS §5` risk 1). Budget **two** call sites (`GlassTimeline.vue` too), not one. Residual after adoption: `aria-valuetext` for the "N of total" announcement (D-4's tail) is owed by *both* sides and should be relayed to the glass BH inbox per standing law.
2. **D-3** independently and immediately: one `:aria-label` binding, copying `AnimationControls.vue:67`.
3. **D-6** with the F.W1 sweep: delete all six orphaned `--slider-scrub-*` declarations tree-wide; where a real override was intended (`SliderControl.vue`'s `--track-color` tint), re-express against `--slider-range-bg`/`--slider-thumb-bg` *and* verify it wins the specificity contest against `.glass-slider[data-size=…]`, or use the `size` prop.
4. **D-14** gates the rest: `/equation` needs at least one functional spec and one axe run, or none of the above can be proven cured.
5. **Out of scope here, routed to `ConvergencePlot`'s own L-challenge:** guard `startLoop()` against re-entry and clear `playing` in `onUnmounted` (D-5's amplifier). Both are one-line, and both are required for the leak to be *provably* dead rather than merely unreachable.

---

*Challenge only. `/Users/mkbabb/Programming/fourier-analysis` was read as evidence; no file in any repo was mutated. This document is the sole write.*
