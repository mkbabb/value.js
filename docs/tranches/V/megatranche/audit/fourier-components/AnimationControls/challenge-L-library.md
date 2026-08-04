claude-opus-5[1m]

# CHALLENGE · `AnimationControls.vue` · axis **L (LIBRARY)**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/AnimationControls.vue` (224 lines)
**Posture** DEFECTIVE-until-proven. Static + source-derived only; no browser tooling. Every claim carries severity + `file:line` + its own falsifier.
**Writes** this file only. `fourier-analysis` read to completion, never written. (`npx vue-tsc --noEmit` was executed — a read-only check with `noEmit: true` in `tsconfig.json`; it emits no artifact.)

---

## §0 · Method + read-set

Read whole: the subject; its 3 local children `GlassTimeline.vue` (127) / `EasingPicker.vue` (98) / `SpeedSelect.vue` (70); the transitive leaf `EasingCurvePreview.vue` (41); the adapter `components/ui/tooltip/Tooltip.vue` (38); both stores `stores/animation.ts` (146) / `stores/workspace.ts` (471); `lib/easings.ts` (127); `lib/types.ts` (the two payload shapes); `lib/defaults.ts`. Read for the render path it touches: `BasisCanvas.vue` (the level derivation :180-300, the label :370, the watchers :374-423, the IO gate :425-459, `defineExpose` :515), `lib/canvas-drawing/trail.ts` :35-70, `lib/svg-fourier.ts` :113-139. Read for the callers: `VisualizationView.vue` :236, :282-285; `FullscreenViewer.vue` whole; `CanvasControlsDock.vue` :1-60; `composables/useWorkspaceLoader.ts` :57. Read as duplication control: `components/equation/convergence/ConvergenceTimeline.vue` :28-62.

Read as the producer contract at the **installed** version (`node_modules/@mkbabb/glass-ui/package.json` → **4.0.0**, matching `web/package.json:14` `^4.0.0`): `dist/components/custom/dock/GlassDock.vue.d.ts`, `dock/index.d.ts`, `dock/composables/useDockShellProps.d.ts`, `dist/dock.js:685-710` (the emitted root class list), `metric-badge/MetricBadge.vue.d.ts`, `timeline/index.d.ts`, `ui/slider/Slider.vue.d.ts`. Read as the primitive's real behaviour: `node_modules/reka-ui/dist/Slider/SliderImpl.js:34-63` and `SliderRoot.js:104-128,158-168`.

Git archaeology (read-only): `git log`/`git show` on `2f53d5d`, `be24948`, `c7d1bd2`.

### Corpus folded, not re-invented

| corpus row | what it gives this challenge |
|---|---|
| **R3-7a** (intake, TRUE, CARRY→F.W3) | "AnimationControls 4" Tooltip callsites. **Re-derived here: `:66, :81, :94, :105` = 4. Exact.** Adopted, not recounted. |
| **R3-10** (intake, TRUE, CARRY→F.W4) | the six live `<component :is>` dynamic families. AnimationControls is **not** among them — see **L-8**, where that absence is itself the finding. |
| **R5-7** (intake, TRUE, ADOPT+CARRY→F.W4) | "template-loop evidence keyed to *component* callsites is blind to native HTML element loops." Transposed to this component at **L-8/L-9**; explicitly **not** applicable in its literal form (§4). |
| **census §3a [FE §4] HARD shadows** | local `GlassTimeline.vue` (127, name-identical, producer subpath never imported) + `EasingPicker`/`EasingCurvePreview`/`lib/easings.ts` ("the producer README's forbidden fourth fork"). **AnimationControls is the sole mount point of both** (`:11`, `:12`). Confirmed live: `glass-ui@4.0.0` `dist/components/custom/timeline/index.d.ts` exports `GlassTimeline` by that exact name. |
| **census §3a uplift break surface / lane-frontend:472,476; census C-4** | `./metric-badge` removed at 7.0.0 (7 files, this is one); `DockDropdownTrigger` removed member-level (**1 import — this file**). See **L-13**, and the correction that it is *not* a live break. |
| **lane-frontend:619,624** | this file owns 1 of only 8 `prefers-reduced-motion` blocks in the tree (`:178`), while the clock it drives is ungated. Both halves used — as **S-3** and its caveat. |
| **census §3a "Canvas2D throughout, WebGL/WebGPU ABSENT; three independent canvases (epicycle instrument reactive-redraw off a store rAF clock…)"** | the viz-architecture row this component's transport sits on top of. **L-1b** is a defect *in that row's clock*. |

---

## §1 · Findings

| id | sev | site | one line |
|---|---|---|---|
| **L-1** | **BLOCKER** | `GlassTimeline.vue:43-57` + `stores/animation.ts:116-126` | `startScrub` fires on an unconditional native `pointerdown`; `endScrub` fires only on a **conditional** `valueCommit`. Unpaired ⇒ tapping the timeline permanently freezes the transport. |
| **L-1b** | **BLOCKER** (same root) | `stores/animation.ts:114-126,132-135` → `trail.ts:48` | the same unpaired exit strands `anim.scrubbing = true` with **no reset path**, forcing a full trail rebuild on every subsequent frame of the epicycle canvas. |
| **L-2** | MAJOR | `FullscreenViewer.vue:131-139` vs `AnimationControls.vue:15-30` | 2 props + 2 emits the parent binds were deleted from the child at `2f53d5d` and never removed from the parent. Ghost / image-overlay are unreachable in fullscreen; `vue-tsc` is silent. |
| **L-3** | MAJOR | `GlassTimeline.vue:53-57` + `stores/animation.ts:63` | keyboard scrub (`←/→/Home/End`) never opens a scrub session, and the rAF's latched `startTime` clobbers the seek on the next frame ⇒ keyboard timeline control is a no-op during playback. |
| **L-4** | MAJOR | `AnimationControls.vue:44-45` vs `BasisCanvas.vue:231-236,370` | `Math.round(pos)` vs `Math.floor(pos)`: the dock's caret label and the canvas's own label report **different N** for the same frame. |
| **L-5** | MAJOR | `:39-50` · `BasisCanvas.vue:196,226-241` · `lib/svg-fourier.ts:130-139` | the level derivation is written **four** times with **three** different rules and no shared composable. |
| **L-6** | MAJOR | `GlassTimeline.vue:30` vs `ConvergenceTimeline.vue:36` | the whole broken scrub-session pairing is **forked verbatim** into a second timeline; the defect is already duplicated. |
| **L-7** | MINOR | `:69,84` / `:70,85` | four byte-identical inline `<svg><path>` literals (~1.1 KB, 20 % of file bytes) for a two-state icon, in a file that already imports lucide. |
| **L-8** | MINOR | `:68-71`, `:83-86` | the R5-7 blind-spot class, transposed: two `v-if/v-else` icon twins are shape-identical to R3-10's six `<component :is>` families but invisible to an `:is`-keyed budget. |
| **L-9** | MINOR | `:67, :82` | the two native `<button class="play-btn">` hand-roll focus-ring/hover/press/backdrop-filter that `<Button variant="glass">` ships. **Contradicts** fourier's A-tranche ledger, which books them as "ornament". |
| **L-10** | MINOR | `:25` + `:135` | duplicated default: the prop default `"960px"` makes the CSS fallback `var(--animation-dock-max-width, 960px)` provably unreachable. |
| **L-11** | MINOR | `SpeedSelect.vue:38-42` + `useWorkspaceLoader.ts:57` | persisted `speed` is restored unvalidated into a 5-literal option set; an off-set value renders an empty trigger while the collapsed badge still shows it. |
| **L-12** | MINOR | `:96` and `:117` | one logical control instantiated twice with a hand-rolled `:model-value` + `@update:model-value` pair instead of `v-model`, duplicated verbatim. |
| **L-13** | MINOR (deferred) | `:8`, `:10` | both symbols are removed at glass-ui 7.0.0 — but **not** a live break at the installed 4.0.0. Correction to how the census row reads at a per-component altitude. |
| **L-14** | MINOR | `:74` | the collapsed progress bar is two bare `<div>`s: no `role="progressbar"`, no `aria-hidden`, no text alternative. |
| **L-15** | INFO | `BasisCanvas.vue:418-423` | the 60 fps render watcher depends on both `anim.t` and `anim.easedT`; the latter is a pure derivation of the former. |
| **L-16** | INFO | `:39-50` | a presentation component reaches into `store.basesData` / `store.epicycleData` — the raw compute payload — to compute a label the canvas also computes. |

**17 rows = 16 defects + 1 deferral. Blockers 2 (L-1, L-1b — one root, two consequences). Superlatives 5.**
L-13 is counted as a **deferral, not a defect**: it is a correction to how a census row reads at per-component altitude, and the tree is clean at the installed version (§2, L-13).

---

## §2 · Detail

### L-1 — BLOCKER · the scrub session opens unconditionally and closes conditionally

`GlassTimeline.vue` is the timeline mounted at `AnimationControls.vue:91`. Its session pairing:

```
:49  function onPointerDown() { onValueCommitStart(); }        // native pointerdown, unconditional
:43  function onValueCommitStart() { … anim.startScrub(); }
:53  function onValueCommit() { if (!scrubbing.value) return; … anim.endScrub(); }
:74  @pointerdown="onPointerDown"   @value-commit="onValueCommit"
```

`anim.startScrub()` (`stores/animation.ts:116-119`) calls `stopRAF()`. `anim.endScrub()` (`:121-126`) is the **only** thing that restarts the loop after a scrub. So the clock's restart is hostage to `valueCommit`.

`valueCommit` is **not** unconditional. `reka-ui/dist/Slider/SliderRoot.js`:

```
:159-161  onPointerdown: () => { if (!disabled) valuesBeforeSlideStartRef.value = currentModelValue.value }
:114-118  function handleSlideEnd() {
              const prevValue = valuesBeforeSlideStartRef.value[valueIndexToChangeRef.value];
              const nextValue = currentModelValue.value[valueIndexToChangeRef.value];
              const hasChanged = nextValue !== prevValue;
              if (hasChanged) emits("valueCommit", toRaw(currentModelValue.value));   // ← gated
          }
```

Three source-proven routes where the guard is false and `valueCommit` never fires, after `startScrub` already fired:

1. **Tap the thumb.** `SliderImpl.js:46-52` — `onPointerdown` on a thumb element calls `target.focus()` and *does not* emit `slideStart`; the value is untouched. On release `handleSlideEnd` compares an unchanged value ⇒ `hasChanged === false` ⇒ no commit. `t` is modelled as an integer 0..100 (`GlassTimeline.vue:35-41`), so this is exact-equality on an int.
2. **Drag and return.** Grab, move, come back to the same 1 % step, release ⇒ same equality ⇒ no commit.
3. **Pointer cancelled.** `SliderImpl.js:34-63` registers exactly `onKeydown` / `onPointerdown` / `onPointermove` / `onPointerup` with `setPointerCapture` / `releasePointerCapture` — and **no `pointercancel`, no `lostpointercapture`**. A cancelled pointer never reaches `onPointerup`, so `slideEnd` never emits at all. (This project's own constellation memory records exactly this class: reka-ui slider pointer-capture leaks on iOS Safari, cured downstream in value.js's `ComponentSliders.vue` with explicit `pointercancel`/`lostpointercapture` handlers. The cure was never carried here.)

Consequence: `rafId === null`, `playing === true`. `AnimationControls.vue:67,82` keep painting the **pause** glyph and the `is-playing` rainbow (`:176`) while `t` is frozen. The transport lies about its own state — in a component whose single reason to exist is that transport.

Recovery requires an unrelated action: pause+play (`:82`), a speed change (`stores/animation.ts:138-143`), or scrolling the canvas out of and back into the viewport (`:99-106`). None is discoverable.

> **Falsifier.** The claim dies if `valueCommit` is unconditional, or if `GlassTimeline` has any second `endScrub` path. Checked: `SliderRoot.js` has exactly three `valueCommit` emit sites (`:91` declaration, `:118` gated, `:128` gated on `hasChanged && commit`) — all gated. `grep -n "endScrub" web/src/` → `stores/animation.ts:121,145` and `GlassTimeline.vue:56` only. The claim survives. **The exact gesture-to-freeze is UNPROVEN-NEEDS-LIVE (SS-13)**; the code path is closed statically.

### L-1b — BLOCKER · the same unpaired exit strands the canvas trail

`anim.scrubbing` (`stores/animation.ts:114`) has exactly two writers — `startScrub` (`:117` → `true`) and `endScrub` (`:122` → `false`) — and `reset()` (`:132-135`) calls `pause()` and zeroes `t` but **never clears `scrubbing`**. So an L-1 freeze leaves `scrubbing === true` with no reset path for the session's lifetime.

`anim.scrubbing` is read by the canvas at `BasisCanvas.vue:144` and `:329`:

```
trail.update(anim.t, tip[0], tip[1], anim.scrubbing, components);
```

and `lib/canvas-drawing/trail.ts:48`:

```
if (scrubbing || t < this.lastT - 0.01) {  // full rebuild
```

So once the user recovers the clock by pressing pause+play, every frame thereafter takes the rebuild branch. The incremental `else` branch (`:69` — `this.x.push(tipX)`) becomes unreachable. When `preX`/`preY` are present the cost is an ≤`TRAIL_RESOLUTION` array copy per frame; when they are absent (`:60-66`) it is `evaluateFourier(components, tEval)` over up to 600 sample points **per frame at 60 fps**.

This is the census row's "epicycle instrument reactive-redraw off a store rAF clock" (§3a) degrading to O(600 × n_components) per frame, triggered by a tap on a timeline. It is the only place in this audit where a control-surface defect reaches the Canvas2D render path.

> **Falsifier.** Dies if any other site clears `scrubbing`, or if `trail.update` is not on the per-frame path. `grep -rn "scrubbing" web/src/` returns 5 non-test writers/readers, all enumerated above; `reset()` read whole — it does not clear it. `BasisCanvas.vue:418-423` is the 60 fps watcher and `drawFrame` reaches both `trail.update` sites. Survives.

### L-2 — MAJOR · a cross-component prop/emit contract that no longer exists on either side of the wire

`FullscreenViewer.vue:131-139`:

```
<AnimationControls
    :active-bases="activeBases"
    :show-ghost="showGhost"                 ← not declared
    :show-image-overlay="showImageOverlay"  ← not declared
    max-width="60rem"
    @toggle-ghost="emit('toggleGhost')"              ← never emitted
    @toggle-image-overlay="emit('toggleImageOverlay')" ← never emitted
    @export-frame="canvasComponent?.exportFrame()" />
```

`AnimationControls.vue:15-26` declares `{ activeBases, maxWidth }`; `:28-30` declares exactly one emit, `exportFrame`.

Archaeology (not inference): `git show 2f53d5d -- …/AnimationControls.vue` deletes `showGhost?`, `showImageOverlay?`, `(e:"toggleGhost")`, `(e:"toggleImageOverlay")` and their two buttons. `git show --name-only 2f53d5d` lists exactly four files — `AnimationControls.vue`, `CanvasControlsDock.vue`, `CanvasOverlayButton.vue`, `VisualizationView.vue`. **`FullscreenViewer.vue` is not among them.** The controls moved to `CanvasControlsDock.vue:44-62`, which is rendered by `VisualizationView` — i.e. *behind* the fullscreen layer's opaque `position: fixed; inset: 0; background: var(--background)` backdrop (`FullscreenViewer.vue:148-153`). So in fullscreen the ghost trace and image overlay cannot be toggled at all, and `VisualizationView.vue:285`'s `@toggle-ghost` / `@toggle-image-overlay` handlers are dead by construction.

Two runtime residues, both provable from `glass-ui@4.0.0` `dist/dock.js:685-700`, which spreads `t.$attrs` onto the dock's root element:

- `show-ghost` / `show-image-overlay` land as non-standard literal DOM attributes on the dock root (`false` is written as the string `"false"`, not removed — they are not boolean attributes).
- `onToggleGhost` / `onToggleImageOverlay` are `on`-prefixed, so Vue's `patchProp` registers real `addEventListener("toggle-ghost", …)` / `("toggle-image-overlay", …)` on that root. Two listeners per mount for events nothing dispatches.

**And the typechecker cannot see it.** `npx vue-tsc --noEmit -p tsconfig.json` over the whole `web/` tree returns exactly one diagnostic:

```
src/components/paper/PaperView.vue(12,8): error TS2882: Cannot find module or type declarations
  for side-effect import of '@mkbabb/latex-paper/theme'.
```

Nothing on `FullscreenViewer.vue` or `AnimationControls.vue`. Unknown attrs and unknown `on*` handlers pass through Vue's fallthrough-attr typing. This is the reason the rot survived from `2f53d5d` to HEAD.

> **Falsifier.** Dies if `AnimationControls` declares those props/emits (it does not, `:15-30`), or if some other fullscreen surface exposes the toggles (`FullscreenViewer.vue` read whole — its only other children are a close `<Button>`, `ContourEditorCanvas`, `BasisCanvas`), or if `vue-tsc` flags it (it does not — output above). Survives.

### L-3 — MAJOR · keyboard scrub is inert during playback

`reka-ui` *does* wire the keyboard: `SliderImpl.js:34-45` emits `homeKeyDown` / `endKeyDown` / `stepKeyDown`, and `SliderRoot.js:165-168` routes all three into `updateValues(…, { commit: true })`, which at `:128` emits `valueCommit`. So `valueCommit` *does* fire for keys.

But `GlassTimeline.vue:53-54` guards it:

```
function onValueCommit() { if (!scrubbing.value) return; … }
```

and `scrubbing` is set **only** by `onPointerDown` (`:49`). A keyboard interaction therefore never calls `anim.startScrub()`, so the rAF loop is never stopped. The `tArr` setter (`:35-41`) still calls `anim.seek(next)` — and `stores/animation.ts:63`:

```
if (startTime === null) startTime = now - t.value * dur;
```

latches `startTime` **once per loop start**. Every subsequent tick recomputes `t` purely from `elapsed` (`:65-69`), so the seek is overwritten on the very next frame. Net: arrow keys / Home / End move the thumb for ≤16 ms and snap back while playing. (Paused, they work — there is no rAF to clobber them.) The `aria-label="Timeline"` at `:71` advertises a keyboard-operable slider that is not one.

> **Falsifier.** Dies if `startTime` were re-derived per tick (it is not, `:63` is guarded by `startTime === null`), or if the guard at `:54` were absent, or if `stepKeyDown` also produced a `pointerdown` (it does not — `SliderImpl.js:34-45` is a separate handler). Survives. **The user-visible snap-back is UNPROVEN-NEEDS-LIVE (SS-13).**

### L-4 — MAJOR · the caret label disagrees with the canvas it annotates

```
AnimationControls.vue:43-45   const pos = anim.easedT * (levels.length - 1);
                              return levels[Math.round(pos)];
BasisCanvas.vue:231-236       const pos = anim.easedT * (levels.length - 1);
                              const lo = Math.floor(pos); … level = levels[lo];
BasisCanvas.vue:370           drawBasisLabels(s, props.activeBases, `N = ${level}`, hoveredBasis);
```

Same `pos`, different rounding. `AnimationControls.vue:53` renders `N = ${currentLevel}` into the caret at `GlassTimeline.vue:62-64`, directly above the canvas that is simultaneously painting `N = ${level}` onto itself. Whenever `frac(pos) > 0.5` the two disagree by one level.

Concrete: `stores/workspace.ts:321-323` builds `levels` as `Array.from({length: min(n_harmonics,50)}, …)`. At `n_harmonics = 50` that is `[1…50]`, length 50, so `pos = easedT × 49`. At `easedT = 0.5`, `pos = 24.5` → canvas `levels[24] = 25`, dock `levels[25] = 26`. The canvas is additionally *interpolating* toward 26 at `levelFrac = 0.5` (`:234,275-287`), so the geometry on screen is genuinely between 25 and 26 — but the dock asserts the discrete value 26 while the canvas asserts 25. Neither is wrong about the geometry; they are wrong about **each other**.

Note the branch also mis-labels the empty state: with `isEpicycleOnly === false` and both payloads null, `:49` returns `1` and the caret reads a confident `N = 1` for no data.

> **Falsifier.** Dies if `levels.length === 1` (then `pos ≡ 0`, both agree), or if the two labels are never co-visible. The former is not the general case (`min(n_harmonics, 50)` rows). The latter: `BasisCanvas.vue:370` is inside `drawMultiBasesFrame`, reached when `!onlyEpicycles` (`:110`, `:318`) — the exact condition under which `AnimationControls.vue:52-53` selects the `N =` branch. They are co-visible **by construction**. Survives. Pixel confirmation is UNPROVEN-NEEDS-LIVE (SS-13).

### L-5 — MAJOR · one derivation, four implementations, three rules

| site | rule |
|---|---|
| `AnimationControls.vue:42-48` | `levels[round(pos)]`, else `max(1, ceil(easedT × n))` |
| `BasisCanvas.vue:229-241` | `levels[floor(pos)]` + `levelNext` + `levelFrac`, else `max(1, ceil(easedT × n))` |
| `BasisCanvas.vue:196` | `max(1, ceil(easedT × n))` (epicycle-only path, third copy of the same expression) |
| `lib/svg-fourier.ts:130-139` | a fourth bracket search over `levels` with explicit `lo`/`hi` scanning |

`components/visualization/composables/` exists (`ls` — 9 entries) and this is not among them. The colocation verdict is unambiguous: the `easedT → (level, levelNext, levelFrac)` map is the shared vocabulary of the dock, the canvas and the SVG exporter, and it lives in none of them. **L-4 is the first bill for this**; the next divergence is free.

> **Falsifier.** Dies if the four sites are genuinely different quantities. They are not: all four map the same normalized clock onto the same `levels: number[]` (`lib/types.ts:19`) produced by the same `runComputeBases` (`stores/workspace.ts:310-337`). Survives.

### L-6 — MAJOR · the broken pairing is already forked

`components/equation/convergence/ConvergenceTimeline.vue:36-57` is a near-verbatim copy of `GlassTimeline.vue:30-57` — same private `scrubbing` ref, same `tArr` computed with the same `(arr[0] ?? 0) / 100` clamp, same `onPointerDown`/`onValueCommit` guard shape. Only the sink differs (emits instead of store calls). So L-1 and L-3 are structural properties of **two** timelines, and a fix applied to one leaves the other. This is the duplication finding that matters most, because the duplicated artifact is a defect.

Second-order: the census books `GlassTimeline.vue` as a **HARD shadow** of the producer's own `GlassTimeline` (`glass-ui@4.0.0` `dist/components/custom/timeline/index.d.ts:1` exports that exact name; the tree imports the local one at `AnimationControls.vue:11` and the producer subpath nowhere). Both forks of the defect are shadow code.

> **Falsifier.** Dies if the two files differ materially in the pairing. Read side by side above — they do not. Survives.

### L-7 — MINOR · four identical SVG blobs for a two-state icon

`grep -c` on each path literal: the pause path (`M48 64C21.5 64 0 85.5 0 112…`) appears **2×** (`:69`, `:84`); the play path (`M73 39c-14.8-9.1-33.4-9.4-48.5…`) appears **2×** (`:70`, `:85`). The collapsed and expanded branches are otherwise identical except `class="play-btn--mini"` and `@click.stop` vs `@click`. ~1.1 KB of a 10.8 KB file. The file already imports from `lucide-vue-next` at `:5-6`, which ships `Play`/`Pause`; the hand-rolled Font-Awesome geometry is a third icon vocabulary in one component (lucide + inline SVG + `EasingCurvePreview`'s generated paths).

> **Falsifier.** Dies if the four differ. Byte-identical per `grep -c` = 2 for each of the two distinct literals across 4 tags. Survives. (Not raised higher: it is cosmetic weight, not behaviour.)

### L-8 — MINOR · the R5-7 blind-spot class, transposed

R5-7's generalizable form is that **evidence keyed to component callsites cannot see native-element structure**. R3-10 carries the dual to F.W4: six live `<component :is>` dynamic families to budget (`CoefficientsSpectrum:132`, `EditorControlsDock:144`, `AppHeader:117,130`, `MobileFloatingToc:157`, `FourierMorphDemo:72`).

`AnimationControls.vue:68-71` and `:83-86` are the *same shape* — one of two icons selected by one boolean, inside a `<Transition name="icon-swap" mode="out-in">` — expressed as `v-if`/`v-else` twins on native `<svg>` instead of `<component :is>`. A per-component audit that enumerates R3-10's `:is` families will report AnimationControls as having zero dynamic icon families; it has two. Identically, `EditorControlsDock.vue:144`'s `<component :is="showGhost ? Eye : EyeOff" />` — a counted family — is behaviourally the same construct as this file's uncounted one.

> **Falsifier.** Dies if this file has a `<component :is>` (it does not) or if R3-10's family list already covers `v-if`/`v-else` icon twins (its six named sites are all literal `:is` bindings — verified against the intake row's own quotations). Survives as a *scope-of-budget* claim, not a runtime defect. Severity capped at MINOR accordingly.

### L-9 — MINOR · two native buttons that the tree's own migration wave declared "ornament"

`:67` and `:82` are native `<button class="play-btn">`. The CSS at `:139-186` hand-rolls what `<Button variant="glass">` already ships — `backdrop-filter: blur(12px) saturate(1.4)`, an inset+drop shadow stack, `:hover` scale, `:active` scale, and a hand-written `:focus-visible { outline: 2px solid … }`. The same file's sibling `FullscreenViewer.vue:110` uses `<Button variant="glass" size="icon">` for a *less* important control, and `ConvergenceTimeline.vue:60` uses `<Button variant="glass" size="icon" class="play-btn">` for **the literally same play/pause control**. Three registers for one affordance.

**Explicit contradiction of the tree's own record.** `fourier-analysis/docs/tranches/A/FINAL.md:124` and `PROGRESS.md:457,483` book these two sites as justified residue, described as "ornament `AnimationControls.play-btn` ×2" and "two bespoke-ornament play-buttons". They are not ornament: they are the primary transport control of the visualization, they carry `:aria-label`, and `@click="anim.toggle"` is the component's most-invoked interaction. The residue is real but its stated rationale does not hold; the correct rationale (if kept) is the rainbow `::before` drift at `:158-176`, which a variant would fight — and that is a variant-extension request to glass-ui, not a justification for a native element. Per standing constellation law this is a glass-ui BH-inbox relay candidate.

> **Falsifier.** Dies if `<Button variant="glass">` cannot host a `::before` animated gradient (unverified) or if `A.W3.b` migrated them and the tree regressed. `git show be24948 -- …/AnimationControls.vue` shows it migrating the Export item to `<Button variant="ghost" size="sm">` and **leaving** both `.play-btn` tags — a deliberate skip, matching the ledger. The factual claim (still native, hand-rolled chrome, contradicts the "ornament" characterization) survives; the "should be `<Button>`" prescription is **UNPROVEN-NEEDS-LIVE** on the gradient question. |

### L-10 — MINOR · a default written twice, one copy dead

`:25` `withDefaults(…, { maxWidth: "960px" })` and `:135` `width: min(var(--animation-dock-max-width, 960px), …)`. `:62` binds the var from the prop on every render, so the var is *always* set and the CSS fallback can never be read. Two places to change one number, one of which has no effect. Also unvalidated: `maxWidth: string` accepts `"960"`, which silently poisons `min()` and collapses the rule.

> **Falsifier.** Dies if `maxWidth` can be `undefined` at the style binding — `withDefaults` guarantees not, including for an explicit `:max-width="undefined"`. Survives.

### L-11 — MINOR · unvalidated speed restore against a hard-coded option set

`SpeedSelect.vue:38-42` hard-codes exactly five options `{0.25, 0.5, 1, 2, 4}` as string literals. `lib/types.ts:49` types `AnimationSettings.speed` as unconstrained `number`, and `composables/useWorkspaceLoader.ts:57` restores it without validation:

```
if (as?.speed) anim.speed = as.speed;
```

`as` originates from a persisted draft or a server `animation_settings` blob (`stores/workspace.ts:216-220`). An off-set value (any hand-edited draft, any older schema, any future option) produces `speedStr = "3"` (`SpeedSelect.vue:24`), no matching `<SelectItem>`, and an **empty** `<SelectValue />` — while `AnimationControls.vue:75`'s `<MetricBadge :value="anim.speed">` in the collapsed summary happily renders `3×`. Collapsed and expanded then disagree about the same scalar. The `if (as?.speed)` guard also silently drops a legitimate `0`.

> **Falsifier.** Dies if `speed` is constrained upstream. `lib/types.ts:44-51` — plain `number`, no union, no enum; `lib/defaults.ts:31-33` spreads `ANIMATION_DEFAULTS` with no clamp. Survives. Whether an off-set value is reachable in production data is **UNPROVEN-NEEDS-LIVE**.

### L-12 — MINOR · one control, two instances, hand-rolled v-model, duplicated

`:96` and `:117` both render `SpeedSelect` with `:model-value="anim.speed" @update:model-value="anim.speed = $event"` — the manual expansion of `v-model="anim.speed"`, written twice. The two exist only for the responsive split (`hidden sm:block` at `:95`, `flex sm:hidden` at `:115`), which means two live component instances, two Select popovers in the tree, and two independently mounted reka-ui listbox subtrees for one logical control at every viewport.

> **Falsifier.** Dies if `v-model` on a Pinia state ref were invalid — it is not; `speed` is returned as a `ref` (`stores/animation.ts:145`) and is directly assignable, as `:96` itself proves. Survives.

### L-13 — MINOR (deferred) · the uplift break surface, corrected at this altitude

`:8` imports `DockDropdownTrigger` and `:10` imports from `@mkbabb/glass-ui/metric-badge`. The census records both as removed at glass-ui 7.0.0 (lane-frontend:476 — `DockDropdownTrigger` is a **single** import tree-wide, and it is this line; lane-frontend:472 + census C-4 — `./metric-badge` across 7 files, this being one).

**Correction to how that reads per-component:** it is *not* a live defect. Installed is `@mkbabb/glass-ui@4.0.0`; `dist/components/custom/dock/index.d.ts` exports `DockDropdownTrigger`, `dist/components/custom/metric-badge/index.d.ts` exports `MetricBadge`, and `package.json` `exports` lists `./metric-badge`. The `:value` prop at `:75` also already matches 4.0.0's `MetricBadgeProps.value` (the 3.1→4.0 `amount=` → `value=` rename landed — `git show be24948` shows the old `:amount`). And per census §3a the 4→7 hop is not independently landable: `keyframes@4.3.0` tilde-locks `glass-ui ~4.0.0` while `glass-ui@7` peers `keyframes ^6.0.0`. So this component's two rows are correctly **deferred to the atomic tri-package transaction**, not chargeable to it now.

> **Falsifier.** Dies if 4.0.0 lacks either export — both `.d.ts` files read directly above. Survives as a deferral, not a defect-now.

### L-14 — MINOR · the collapsed progress bar is invisible to assistive tech

`:74` `<div class="mini-progress"><div class="mini-fill" :style="{ width: (anim.t*100)+'%' }" /></div>`. No `role="progressbar"`, no `aria-valuenow`/`aria-valuemin`/`aria-valuemax`, no `aria-hidden="true"` either — so it is neither exposed nor deliberately hidden. In the collapsed dock it is the *only* indication of position (the timeline lives in the expanded branch), so a screen-reader user in the collapsed state has a play/pause button and a speed badge and no clock.

> **Falsifier.** Dies if the collapsed dock also renders a labelled position readout. `:65-76` read whole: `Tooltip` + play button + this div + `MetricBadge`. Survives.

### L-15 — INFO · a redundant dependency on the 60 fps path

`BasisCanvas.vue:418-423` watches `[() => anim.t, () => anim.easedT, …]`. `easedT` is `computed(() => fn(t.value))` (`stores/animation.ts:27-30`) — a pure function of `t`. Vue's scheduler dedupes the two invalidations into one flush, so this costs a second dependency edge and a second computed re-evaluation per frame, not a second draw. Named because the file's own comment (`:415-417`) claims to "keep it to the bare minimum".

> **Falsifier.** Dies if it caused a double draw (it does not — one flush per tick) or if `easedT` could change without `t` (it cannot; `easing` changes are a separate reactive edge that this watcher does *not* observe — arguably the real bug is the reverse, that changing easing while paused does not redraw). Survives as INFO only.

### L-16 — INFO · altitude

`:39-50` reaches past every abstraction into `store.basesData.levels` and `store.epicycleData.components` — the raw compute payloads (`lib/types.ts:14-27`) — so a dock chrome component now depends on the shape of the bases API response. This is the structural cause of L-5 and L-4: the label was written where it was displayed rather than where it was derived.

> **Falsifier.** Dies if no better seat exists. `composables/` exists next door and `BasisCanvas` already computes the identical value. Survives.

---

## §3 · Superlatives (L-18 runs both ways)

**S-1 — the ARIA reasoning at `:100-118` + `EasingPicker.vue:10-15` is correct, load-bearing, and rare.** The comments explain *why* `role="group"` is the legal child of `role="menu"` for a rich settings cluster, and why an easing chip is `menuitemradio` + `aria-checked` rather than `aria-pressed`. Verified: `DropdownMenuContent` is `reka-ui`'s `MenuContent` (`glass-ui@4.0.0` `dist/components/ui/dropdown-menu/DropdownMenuContent.vue.d.ts:2` re-exports `DropdownMenuContentProps` from `reka-ui`), which does render `role="menu"`, so `aria-required-children` genuinely applies and the fix is genuinely necessary. Most ARIA comments in audited trees are decoration; this one is a correct derivation of a non-obvious constraint. *Falsifier:* would die if the content were not `role="menu"` (then the groups would be inert) or if `EasingPicker`'s chips were not mutually exclusive — `anim.easing` is a single ref (`stores/animation.ts:24`), so they are.

**S-2 — `maxWidth` retires an implicit cross-component CSS-var contract into a typed prop, documented at both ends.** `:18-23` states what it replaced; `FullscreenViewer.vue:225-227` states the same from the other side; `git show 2f53d5d`-era code had the parent's `.fs-controls` feeding `--animation-dock-max-width` into a child's scoped rule — an invisible coupling no tool could check. Converting it to `maxWidth?: string` makes the coupling typed and greppable. This is exactly the de-shadowing move the megatranche is trying to institutionalize. *Falsifier:* the var contract is not fully retired — `:135` still reads `var(--animation-dock-max-width, …)`, so an ancestor could still set it and (harmlessly) lose to the inline style. The de-shadowing is 90 %, not 100 % (and see **L-10**). Superlative stands with that caveat.

**S-3 — this file is 1 of only 8 `prefers-reduced-motion` blocks in the tree, and it is a correct one.** `:178-180` kills the `rainbow-drift` keyframe rather than merely shortening it, and `git show be24948` shows the same commit that added it also replaced a raw `ease` with the `--ease-standard` token — motion hygiene applied together, not piecemeal. Corroborated by lane-frontend:619, which enumerates all eight sites. *Falsifier and honest caveat:* lane-frontend:624 records that the **rAF clock this component drives** is ungated (`stores/animation.ts` has no `prefers-reduced-motion` reference — re-grepped, still none). The component gates its own ornament and not the 60 fps epicycle animation it starts. The superlative is genuine at file scope and incomplete at system scope; glass-ui 7's `DockBackgroundToggle` is the named canonical seat.

**S-4 — zero teardown surface, and the surface it delegates to is correct.** The component has no `onMounted`/`onUnmounted`, no timers, no observers, no manual listeners, no `defineExpose`. Its only long-lived resource is the store's rAF, and `stores/animation.ts` cancels it on every exit path — `pause()` `:93`, `startScrub()` `:118`, `setCanvasVisible(false→0)` `:104`, the speed watcher `:140`, and the in-tick guard `:59-62` that nulls `rafId` when it stops scheduling. `BasisCanvas.vue:454-459` correctly disconnects its `IntersectionObserver` **and** releases its visibility credit under a `lastVisible` guard, so the reference count cannot leak. For a component driving a 60 fps loop this is a clean bill. *Falsifier:* would die if the two fallthrough `on*` handlers from L-2 leaked — Vue removes fallthrough listeners with the element on unmount, so they do not. Survives.

**S-5 — the comments are accurate archaeology, and that is checkable.** `:100-102` claims the DropdownMenu "replaces the hand-rolled popup + onClickOutside"; `git show be24948` shows the pre-migration file importing `onClickOutside` and hand-rolling `menuOpen`/`menuAnchor`. `GlassTimeline.vue:2-19` claims a 175 LOC pointer state machine was replaced by `<Slider variant="standard">` and names the exact regression it avoids (CR-2, string-key dock injects retired at O.W2) — and `glass-ui@4.0.0` `Slider.vue.d.ts:9-17` confirms `keepDockOpen` acquires the typed `DockContext` token internally, exactly as claimed. `stores/animation.ts:46-50` records excising a dead `keyframes.js` `Animation` graph. In a tree with this much doc surface, comments that survive `git`-level verification are worth naming. *Falsifier:* one comment does **not** survive — `:19-21`'s claim that the CSS-var contract is "replaced" is contradicted by `:135` (see L-10, S-2). Four of five verify; the fifth is a 90 % claim. Named as a superlative-with-exception, not a clean sweep.

---

## §4 · Where the assigned classes do *not* apply (stated, not skipped)

**R5-7 in its literal form is absent here.** `grep -n "v-for"` across the subject and all five files it pulls in returns exactly one hit: `EasingPicker.vue:20`, `v-for="(opt, key) in EASING_OPTIONS"` — and it renders a glass-ui `<Button>`, i.e. a **component callsite**, which R5-7's deriver *does* see (the intake's own contrast case, `instance.loop.presets`, is keyed exactly this way). AnimationControls itself has **zero** `v-for` and zero native element loops. So the `li v-for` invisibility class does not fire; its transposition (L-8) does. Stating this explicitly so the F.W4 native-loop budget is not padded with a false row.

Two secondary notes on that single loop: iterating a `Record<AnimationEasingName, …>` types `key` as `string`, forcing the two `as EasingName` casts at `EasingPicker.vue:28` and `:33` — an unchecked assertion that would silently lie if the catalog ever gained a key outside the union (`lib/easings.ts:71-84` currently keeps them in sync by construction). And the *inverse* blind spot lives next door: `SpeedSelect.vue:38-42` hand-unrolls its five options with no loop at all, so a loop-keyed derivation sees an option set of size zero where five exist.

**WebGL is not in scope for this component and must not be claimed.** Census §3a: "Canvas2D throughout, **WebGL/WebGPU ABSENT**". The render path this component touches is the Canvas2D epicycle instrument, reached via `stores/animation.ts`'s rAF clock and `BasisCanvas.vue`'s watchers — which is exactly where L-1b lands.

---

## §5 · Falsifier ledger

| id | the single fact that would kill it | checked against | verdict |
|---|---|---|---|
| L-1 | `valueCommit` is unconditional | `reka-ui SliderRoot.js:118,128` — both gated on `hasChanged` | survives |
| L-1 | a second `endScrub` caller exists | `grep -rn "endScrub" web/src/` → 3 hits, all enumerated | survives |
| L-1b | something clears `anim.scrubbing` | `stores/animation.ts` read whole; `reset()` `:132-135` does not | survives |
| L-2 | `vue-tsc` catches it | full run → 1 error, `PaperView.vue:12`, unrelated | survives |
| L-2 | fullscreen has another toggle seat | `FullscreenViewer.vue` read whole | survives |
| L-3 | `startTime` re-derives per tick | `stores/animation.ts:63`, guarded `=== null` | survives |
| L-4 | the two labels are never co-visible | `BasisCanvas.vue:318,370` vs `AnimationControls.vue:36,52` — same condition | survives |
| L-5 | the four sites compute different things | all four consume the same `levels: number[]` from `runComputeBases` | survives |
| L-6 | the two timelines differ materially | read side by side | survives |
| L-7 | the four SVG literals differ | `grep -c` = 2 per literal | survives |
| L-8 | R3-10's family list already covers `v-if` twins | its six sites are all literal `:is` | survives (as scope claim) |
| L-9 | `A.W3.b` migrated them | `git show be24948` — deliberately skipped, ledger-booked | survives (contradicts the ledger's *rationale*, not its existence) |
| L-10 | `maxWidth` can be undefined at `:62` | `withDefaults` `:25` | survives |
| L-11 | `speed` is constrained upstream | `lib/types.ts:49` plain `number` | survives |
| L-12 | `v-model` on the store ref is invalid | `:96` assigns it directly | survives |
| L-13 | 4.0.0 lacks the two exports | both `.d.ts` present | survives as **deferral**, not defect-now |
| L-14 | a labelled readout exists collapsed | `:65-76` read whole | survives |
| L-15 | it causes a double draw | one scheduler flush per tick | downgraded to INFO |
| L-16 | no better seat exists | `composables/` exists; `BasisCanvas` duplicates it | survives |
| S-2 | the var contract is fully retired | `:135` still reads it | **superlative qualified** |
| S-3 | the clock is reduced-motion gated | `stores/animation.ts` — no match | **superlative qualified** |
| S-5 | all comments verify | `:19-21` does not | **superlative qualified** |

**UNPROVEN-NEEDS-LIVE (SS-13):** the gesture→freeze of L-1, the visual snap-back of L-3, the on-screen label divergence of L-4, the reachability of an off-set persisted `speed` in L-11, and the `<Button variant="glass">`-can-host-the-gradient premise of L-9. Every one has a closed static path; only the pixels are owed.

---

**Counts — defects 16 · blockers 2 · superlatives 5** (17 finding rows; L-13 is a deferral, not a defect).
