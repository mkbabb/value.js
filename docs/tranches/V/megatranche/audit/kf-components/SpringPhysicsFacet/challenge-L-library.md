claude-opus-5[1m]

# CHALLENGE · `SpringPhysicsFacet.vue` · axis **L (LIBRARY)**

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/spring/SpringPhysicsFacet.vue` (242 L)
**Mode:** static, read-only. No installs, no dev server, no browser tooling. Every livable-only claim is marked `UNPROVEN-NEEDS-LIVE`.
**Read whole:** the target + all 6 import edges + the 4 transitive edges that carry contract:

| edge | file | why read |
|---|---|---|
| direct | `scenes/spring/springKeys.ts` | `SpringDemoContext` type + the injection key the facet does *not* use |
| direct | `scenes/spring/useSpringDemo.ts` (499 L) | the context object; `SpringPreset`/`SpringTrack` re-export hop |
| direct | `scenes/spring/SpringHeatmap.vue` (338 L) | child component, same prop contract |
| direct | `components/instrument/keyframes/KeyframesEditor.vue` (284 L) | `:framed` / `:animation` contract |
| direct | `@mkbabb/glass-ui` → `Card`,`CardContent`,`LabeledSlider`,`Chip` | installed **7.0.0**, `dist/chip-6ysLmScu.js`, `dist/styles/glass/glass-chip.css`, `dist/styles/glass/accent-tone.css`, `dist/components/labeled-field/LabeledSlider.vue.d.ts` |
| direct | `@mkbabb/value.js/math` → `clamp` · `@lucide/vue` → `RefreshCw` | resolution + signature |
| transitive | `composables/scene-runtime/usePainterRegistry.ts` (20 L) | the painter contract the facet consumes |
| transitive | `scenes/spring/useSpringHotPath.ts` (146 L) | `springLive.trackValues` — the data the painter reads |
| transitive | `scenes/spring/springPresets.ts` · `useSpringKeyframesEditor.ts` | the four ζ values; the editor animation |
| transitive | `scenes/spring/SpringTarget.vue` · `SpringScene.vue` · `app/App.vue` · `styles/design-idioms.css` · `styles/style.css` | the sibling painter, the mount site, the idiom homes |

**Corpus folded (not re-invented):** `docs/tranches/V/megatranche/formation/keyframes/lane-frontend.md` — **F-1** (glass-ui phantom dependency), **F-5** (back-compat re-export shims), **S-1..S-8** (shadow census), §3.4 (the demo reaches *around* glass-ui at the CSS layer), §6.1 (`design-idioms.css` = 300 L). Contradictions to the lanes are marked **⚠ CONTRADICTS** and carry their own provenance.

**Verdict:** **13 defects · 0 BLOCKERS · 5 superlatives.** The script half of this file (48 lines) is close to exemplary and I say so at length in §3. The defects are concentrated in two places the axis names explicitly: **engine-consumption idiom** (one clamp that erases the physics the component exists to show) and **the glass-ui boundary** (a phantom class + an `!important` war against a primitive that ships the exact prop being fought).

---

## 0. Headline

| id | severity | claim | provenance |
|---|---|---|---|
| **D-L1** | **MAJOR** | The preset-ball painter clamps track values to `[0,1]`, erasing 100% of the spring overshoot — the *only* property that distinguishes the four presets — on the surface the file declares "the ONE place the four canonical presets live". | `:159` vs `SpringTarget.vue:220-223` |
| **D-L2** | **MAJOR** | `btn-interactive` is a **phantom class**, applied twice here. Zero definitions in the repo, zero in glass-ui 7.0.0. The repo's own `LESSONS-LEARNED.md:603` records its deletion under a false zero-site verdict. | `:74`, `:105` |
| **D-L3** | **MAJOR** | The Chip's selectable-state design (`--accent-band`/`--accent-edge`/`--accent-ink`/`--chip-flood-t`) is dismantled by `bg-background` + `border-none` + two `!important` background shorthands — while `Chip` ships a first-class `tone` prop that plumbs exactly this. | `:74`, `:209-223` |
| **D-L4** | MINOR | The ball-el collector + painter loop is a **verbatim duplicate** of `SpringTarget.vue:186-225`. That duplication *is* the mechanism by which D-L1's clamp policies diverged. | `:145-162` |
| **D-L5** | MINOR | `.keyframes-editor-scroll { container-type: inline-size }` has **zero** container-query consumers; it silently imposes layout+style containment, a stacking context and an abs-pos containing block on the whole editor subtree. Also re-authors the demo's own `.container-inline-size` utility. | `:237` |
| **D-L6** | MINOR | `SpringPreset`/`SpringTrack` imported through `useSpringDemo`'s pure re-export hop — the **F-5 shim shape** — whose own stated rationale names a component this file's header declares dissolved. | `:139` |
| **D-L7** | MINOR | `(el as HTMLElement) ?? null` — unchecked downcast from `Element \| ComponentPublicInstance \| null`; the `?? null` arm is unreachable. | `:147` |
| **D-L8** | MINOR | Child `SpringHeatmap` carries a live watcher with an **empty callback** and a `defineExpose` of two constants with no consumer — the facet mounts it without a ref, so they are unreachable by construction. | `SpringHeatmap.vue:281-286`, `:277` |
| **D-L9** | MINOR | The `class` string re-authors five of `shape="cell"`'s own geometry declarations from the call site — variant re-authoring, not variant use. | `:74` |
| **D-L10** | INFO | `applyPreset` discards the emitted payload; the active chip can never be deselected. Correct-by-accident (the model is controlled), but four `aria-pressed` toggle buttons are the wrong primitive for a mutually-exclusive set the repo already has `ToggleGroup` for. | `:72-75`, `:169-172` |
| **D-L11** | INFO | `will-change: transform` on 4 balls is never released, in a scene explicitly designed to rest. | `:197` |
| **D-L12** | INFO | `const demo = props.demo` snapshots the prop non-reactively. | `:142` |
| **D-L13** | INFO | Cites `proof:easing-sidebar-normalized`, a gate name with no runnable script. | `:118` |

**Zero blockers, stated deliberately.** Nothing in this file crashes, leaks, double-registers, or breaks the build. D-L1 is the closest call and I argue *against* escalating it in §1.1 — the author faced a real geometric constraint and the escalation would not survive its own falsifier.

---

## 1. Engine-consumption defects

### D-L1 — **MAJOR** · the clamp that erases the demonstrand

```
SpringPhysicsFacet.vue:152-161
    unregisterPainter = demo.registerSpringPainter(() => {
        const values = demo.springLive.trackValues;
        for (let i = 0; i < trackBallEls.length; i++) {
            const el = trackBallEls[i];
            if (el) el.style.transform = `translateX(${clamp(values[i] ?? 0, 0, 1) * 100}cqw)`;
        }
    });
```

The four preset springs are constructed `initial: 0 → target: 1` (`useSpringDemo.ts:101-119`) and are *defined* by their damping fraction (`springPresets.ts:17-42`). Peak overshoot is `exp(-ζπ/√(1-ζ²))` — the exact closed form the sibling heatmap mounted directly above these cells computes and paints (`SpringHeatmap.vue:100-104`):

| preset | ζ | peak value | blurb (`springPresets.ts`) |
|---|---|---|---|
| smooth | 0.86 | **1.005** | "settles without ringing" |
| snappy | 0.65 | **1.068** | "quick with a touch of **overshoot**" |
| bouncy | 0.45 | **1.205** | "**pronounced overshoot**, playful ring" |
| gentle | 1.00 | **1.000** | "critically damped — no overshoot" |

`clamp(v, 0, 1)` pins all four at exactly 100% at their peak. Every excursion above the rail — the entire visual content of the words *overshoot* and *ring* printed inside those same cells — is discarded before it reaches the DOM. The re-seat gesture (`useSpringDemo.ts:294-300`, target → 0) undershoots symmetrically (`bouncy` dips to ≈ −0.205) and is clamped identically at the left rail.

The clamp is **not** house policy. The same painter registry, the same `translateX(<cqw>)` idiom, the same `trackValues` array, one file over:

```
SpringTarget.vue:207        liveBallEl.value.style.transform = `translateX(${live.value * 100}cqw)`;   // NO clamp at all
SpringTarget.vue:212-215    // "the live lanes remain relaxed so the bouncy lane visibly rings PAST the
                            //  target line — the overshoot is the point"
SpringTarget.vue:220-223    // "Allow a small overshoot beyond 100% so the ring is seen; cap so the ball
                            //  can't leave the lane entirely."
                            const v = clamp(trackValues[i] ?? 0, 0, 1.18);
```

Three clamp policies (`none` / `1.18` / `1.0`) over one data source inside one scene, and only the strictest one is undocumented — the comment at `:156-158` justifies `translateX` over `left` at length and never mentions the clamp.

**Consequence.** `smooth` and `bouncy` share `response: 0.5`. With the overshoot removed, the two most-contrasting presets by name reduce to two slightly different rise curves converging on the same pinned endpoint. The preset row's stated job — "the four canonical presets as clickable points … each cell carries its OWN live track ball" (`:11-14`, `:60-65`) — is a comparison the surface can no longer make.

**Falsifier (and the honest counter-argument).** Adopt `SpringTarget`'s 1.18 and the ball's centre lands 18% of track-width past the track's right edge. `.preset-track` is `w-full` inside a Chip carrying `px-3`; in a 2-column rail the track is on the order of ~128 px, so 18% ≈ 23 px of escape against 12 px of Chip padding and an 8 px `gap-2`. `.glass-chip` sets `position: relative; isolation: isolate` but **no** `overflow` (`node_modules/@mkbabb/glass-ui/dist/styles/glass/glass-chip.css:1` — grep for `overflow` returns nothing), so the ball would visibly cross into the neighbouring cell. **That geometric constraint is real, and it is why I grade this MAJOR and not BLOCKER.** The defect is not "the author clamped"; it is that the clamp silently destroys the demonstrand with no compensating design and no note, when at least three cures exist that the tree already contains: inset the rail so the track owns headroom (`.progress-rail` is already `width: 100%` of a container the facet controls), add `overflow: hidden` to `.preset-track` and cap at 1.25, or map `[-0.25, 1.25] → [0, 1]` in the painter so the full excursion is in-frame.

**What would kill this claim:** (a) a design ruling on record that the preset cells are deliberately amplitude-normalised — I found none in the file, `springPresets.ts`, or `useSpringDemo.ts`; (b) `SpringProgress` not actually exceeding its target under ζ<1 — contradicted by `src/animation/physics/spring/types.ts:15` ("`dampingFraction = 1` is critically damped (no overshoot), `< 1` rings") and by `progress.ts:158-161` computing `omegaD = omega·√(1-ζ²)` for `ζ < 1`, the underdamped branch; (c) `springLive.trackValues` being pre-clamped upstream — it is not, it is a straight copy of `t.spring.value` (`useSpringDemo.ts:220-224`).

### D-L4 — MINOR · the duplication that produced D-L1

```
SpringPhysicsFacet.vue:145-148        SpringTarget.vue:186-188
  const trackBallEls: (HTMLElement | null)[] = [];       (identical)
  const setTrackBallEl = (i, el) => {                    const setDerbyBallEl = (i, el) => {
      trackBallEls[i] = (el as HTMLElement) ?? null;         derbyBallEls[i] = (el as HTMLElement) ?? null;
  };                                                     };
```

Verbatim to the cast and the `?? null`. The painter bodies are the same loop over the same `trackValues` emitting the same `translateX(${v * 100}cqw)` string. The house already owns the extraction home — `usePainterRegistry` lives in `demo/composables/scene-runtime/`, i.e. the shared tier, not colocated. A `useBallPainter(els, getValues, { cap })` would retire ~20 duplicated lines across the two files **and would have forced one clamp policy**, which is precisely D-L1's root cause. This is not a style complaint; it is the causal antecedent of the MAJOR above.

**Falsifier:** if the two loops diverged for a reason — they do not; the only difference *is* the clamp bound, which is the bug. If a house rule forbade a third file in `scene-runtime/` — `usePainterRegistry.ts`, `useSceneTransport.ts`, `useSceneVisibilityPause.ts`, `useSweepScene.ts` already live there.

### D-L11 — INFO · `will-change` never released

`:197` puts `will-change: transform` on `.preset-ball` unconditionally — 4 permanent compositor promotions. The scene is explicitly designed to rest: `SpringScene.vue:188-194` records VERDICT #19 ("the spring sampler swept forever at idle, burning ~33% of a core … 'god awful'") and sets `autoPlays: false` so the loop takes zero rAF ticks at rest. Permanent `will-change` is the memory-side analogue of the CPU-side sin that verdict cured.

**Falsifier:** layer count / memory is `UNPROVEN-NEEDS-LIVE` (SS-13). The *static* claim — that the hint is set at author time and never removed — is provable from source and is what I assert. If the balls are the compositor's target anyway (they are transform-animated at 60 Hz while playing), the hint is a no-op while playing and a cost only at rest.

---

## 2. glass-ui boundary defects

### D-L2 — **MAJOR** · `btn-interactive` is a phantom class

Applied twice in this file:

```
:74    class="preset-cell rounded-pill border-none bg-background px-3 pt-1.5 pb-2 h-auto items-start gap-1
              font-medium leading-normal whitespace-nowrap btn-interactive"
:105   class="reseed-btn btn-interactive shrink-0 inline-flex items-center gap-1 rounded-md px-2 py-0.5 …"
```

Exhaustive search for a definition:

```
$ grep -rn "\.btn-interactive" --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=.claude .
   → 10 hits, ALL in docs/**.md.  Zero in any .css, .vue <style>, or .ts.
$ grep -rn "@utility btn-interactive\|@utility *btn" (same exclusions)
   → (no output)
$ grep -rn "btn-interactive" node_modules/@mkbabb/glass-ui/dist/
   → (no output)                                  ← glass-ui 7.0.0, the installed copy
$ grep -rln "btn-interactive" (same exclusions)
   → 6 .vue files (class attributes) + 14 .md files (prose).  Zero CSS.
```

It is not a Tailwind-generatable name (no `@utility` declaration, no arbitrary-value syntax), so it emits nothing.

**The repo already knows.** `docs/precepts/instructions/LESSONS-LEARNED.md:603`:

> "Three same-pattern instances: substrate `b0debec` (D.W2.D 'delete zero-site orphans' — retired `.rainbow-vivid` + `.rainbow-pastel` + **`.btn-interactive`** under a false zero-site verdict; keyframes.js consumed `.rainbow-*`), consumer `17adae2` + `c7f7c96` …"

The `.rainbow-*` half of that lesson was repaired (they are live in `design-idioms.css`). The `.btn-interactive` half was **not**, and 6 consumer files still declare it. The corroborating prose says what it used to carry: `docs/tranches/S/audit/pass1/design/morph.md:97` — *"riding `.btn-interactive` … inherits the demo's single-sourced `:focus-visible` contract (`design-idioms.css:340-343`)"*. That citation is doubly stale: `design-idioms.css` is 300 lines (lane-frontend §6.1), so lines 340-343 no longer exist either.

**This is lane-frontend F-1's family, one layer down.** F-1 is a package declared nowhere yet present in `node_modules`; this is a *class* declared nowhere and present in no stylesheet at all — strictly worse, because F-1 at least works in the current tree. **⚠ Extends F-1:** the lane audited the import boundary and found it "otherwise clean" (F-6); the class boundary is not, and the lane did not look there.

**Bite on this component:** the preset cells' and the re-sample button's interaction affordance is whatever `.glass-chip--interactive` / bare `<button>` give them. `.glass-chip--interactive` supplies hover scale + focus-ring for the Chip, so the cells degrade gracefully; the `reseed-btn` at `:105` is a **bare `<button>`** whose only remaining interaction styling is `hover:text-foreground` — no press state, no focus ring beyond UA default.

**Falsifier:** a definition reachable at build time that my greps missed — an `@utility` in a file outside the repo, a runtime-injected stylesheet, or a Tailwind plugin. I checked all three surfaces named above and `demo/styles/*.css` in full (`@utility` declarations present: `icon-xs`, `icon-sm`, `icon-md`, `icon-lg`, `ppmycota-stroke` — that is the complete set). If someone produces a `.btn-interactive` rule, this drops to INFO (stale prose only).

### D-L3 — **MAJOR** · `!important` against a primitive that ships the prop

The facet's scoped block:

```
:209-223
.preset-cell { outline: 1px dashed transparent; outline-offset: -1px; transition: outline-color …, background-color …; }
.preset-cell:hover            { background: color-mix(in srgb, var(--color-progress)  8%, var(--background)) !important;
                                outline-color: color-mix(in srgb, var(--color-progress) 35%, transparent); }
.preset-cell[data-state="on"] { background: color-mix(in srgb, var(--color-progress) 12%, var(--background)) !important;
                                outline-color: color-mix(in srgb, var(--color-progress) 65%, transparent); }
```

What glass-ui 7.0.0's Chip actually ships (`dist/styles/glass/glass-chip.css:1`, verbatim):

```css
.glass-chip { --chip-tint-floor: 12%; --accent-band-strength: max(18%, calc(var(--chip-tint-floor) + 10%));
              position: relative; isolation: isolate;
              background-image: linear-gradient(var(--glass-fill-tinted), var(--glass-fill-tinted)); … }
.glass-chip[data-mode="selectable"][data-state="on"] { --chip-flood-t: 1;
              background-color: var(--accent-band); border-color: var(--accent-edge); color: var(--accent-ink); }
.glass-chip[data-mode="selectable"]::after { … background: radial-gradient(120% 140% at 50% 50%,
              color-mix(in oklab, var(--accent-band) 60%, …)); mix-blend-mode: plus-lighter;
              opacity: var(--chip-flood-t); transition: opacity var(--duration-normal) var(--ease-out) 60ms; }
```

and the accent chain it reads (`dist/styles/glass/accent-tone.css:1`, on the `.accent-tone` class every Chip carries — `dist/chip-6ysLmScu.js`, base class string):

```css
.accent-tone { --accent-band: color-mix(in oklab, var(--surface, var(--card)), var(--tone, var(--primary)) var(--accent-band-strength));
               --accent-edge: color-mix(in oklab, transparent, var(--tone, var(--primary)) var(--accent-edge-strength));
               --accent-ink:  var(--accent-ink-resolved, var(--foreground)); }
```

and `--tone` is set by **the `tone` prop**, a declared part of `ChipProps` (`dist/components/chip/types.d.ts` → `tone?: string`), forwarded through `useAccentTone` (`dist/useAccentTone-DyInfHXE.js` → `toneStyle = { "--tone": toValue(tone) || "var(--primary)" }`).

So the seam the facet wants — "the active cell wears the canonical motion-color `--color-progress`" (`:200-208`) — is **one prop**: `tone="var(--color-progress)"`. Instead:

1. `bg-background` (`:74`) is a Tailwind utility in `@layer utilities`; glass's on-state `background-color: var(--accent-band)` is in `@layer components`. Utilities win the layer order → **the class string is what defeats the primitive's own on-state**, and the `!important` is the symptom-patch for a wound the same class string opened.
2. `background:` is the **shorthand**, so `!important` also resets `background-image` to `none` — nuking `.glass-chip`'s `linear-gradient(var(--glass-fill-tinted), …)` glass fill on every hover and on the active cell.
3. `border-none` (`:74`) discards `border-color: var(--accent-edge)`.
4. The `::after` flood overlay still fires (`--chip-flood-t: 1` is a custom property, not a background), so the active cell composites a `plus-lighter` radial of `--accent-band` — the *primary* token — over a hand-mixed `--color-progress` wash. Two uncoordinated accent systems on one element.

This is `feedback_glass_ui_first_class` ("add variants/primitives there, not in demo/") and `feedback_root_styling` ("style changes at the root component level, not per-instance overrides") at once, and it is lane-frontend **§3.4**'s finding — "the demo does reach *around* glass-ui at the CSS layer … a soft coupling to glass-ui's internal render tree" — with a concrete site and a concrete cost.

**Falsifier.** (a) If `tone` cannot express the owner's *dashed* treatment — it cannot, and it needn't: the dashed `outline` is legitimately demo-owned and composes fine on top of a toned Chip; only the `background`/`border` fights are at issue. (b) If the `!important` is load-bearing — it is not: Vue SFC `<style scoped>` is emitted **unlayered**, and unlayered normal declarations outrank every `@layer`, so `.preset-cell:hover` (specificity 0,2,0 with the scope attribute) already beats both `.bg-background` and `.glass-chip[data-mode=…]`. `!important` here buys nothing and costs the `background-image` reset. This falsifier dies only if this build sets Tailwind `important: true` — no `@config`/`important` directive exists in `demo/styles/*.css`. (c) If `--color-progress` were unreachable here the whole rule would go invalid-at-computed-value-time — **it is reachable**; see §4 (verified non-defect NR-2).

### D-L9 — MINOR · re-authoring `shape="cell"` from the call site

`shape="cell"` resolves to `glass-chip--cell flex-col gap-1.5 px-2 py-2.5 text-micro` plus `border-radius: var(--radius-card)` (`dist/components/chip/chipVariants.d.ts`, `glass-chip.css`). The call site at `:74` then passes `rounded-pill px-3 pt-1.5 pb-2 h-auto items-start gap-1` — a head-on collision with five of the variant's six declarations. Whatever the emitted source order resolves (`gap-1` vs `gap-1.5` is decided by Tailwind's ascending-value sort, not by attribute order, so `gap-1` is at best redundant and at worst dead), the shape of the defect is fixed: the component is *using* a variant and *re-authoring* it in the same breath. If `cell` is the wrong geometry, the variant is the place to fix it (`feedback_glass_ui_first_class`); if it is right, five of these utilities should not be here.

**Falsifier:** build the demo and read the emitted stylesheet's utility order — forbidden by lane law (no installs). I therefore assert only the collision, not which side wins; the collision alone is the finding.

### D-L10 — INFO · wrong primitive for a mutually-exclusive set

```
:72-75    :model-value="isActivePreset(t)"  @update:model-value="applyPreset(t.preset)"
:169-172  const applyPreset = (preset) => { demo.response.value = preset.response;
                                            demo.dampingFraction.value = preset.dampingFraction; };
```

The emitted payload is discarded. Clicking the already-active chip emits `false`; `applyPreset` re-writes the identical values; `isActivePreset` still returns `true`. **No state desync** — I verified the model is fully controlled: `Chip mode="selectable"` renders reka `Toggle` with `:model-value` bound from the prop (`dist/chip-6ysLmScu.js`, selectable branch), so `data-state` derives from the prop, not internal state. The cell is un-deselectable *by design*, which is radio semantics.

But it is built from four independent `aria-pressed` toggle buttons, which is not radio semantics for assistive tech. glass-ui ships `ToggleGroup`/`ToggleGroupItem` and this very demo already consumes it (`scenes/easing/EasingTarget.vue:139`). Grading INFO because the a11y consequence belongs to a different axis; the *library* observation is that a first-party primitive for exactly this shape is already in the demo's dependency graph and unused here.

**Falsifier:** if `ToggleGroupItem` cannot host the two-row slotted content (name row + live track) these cells carry. I could not verify slot shape from `dist/components/toggle-group/` without a live render — `UNPROVEN-NEEDS-LIVE` on the swap's feasibility; the semantic mismatch itself is proven from `chip-6ysLmScu.js`.

---

## 3. Superlatives (L-18, the other direction)

### S-L1 — **the hot-path discipline is textbook, and this file is the proof**

Four balls move at 60 Hz. The facet writes **zero** reactive refs to do it (`:151-162`): the painter reads a non-reactive snapshot (`useSpringHotPath.ts:87-95`) and writes `el.style.transform` directly. Every reactive read in the whole file — `demo.response.value`, `demo.dampingFraction.value`, `demo.tracks` (`:28,38,67`) — is a **cold-path user parameter**, changed by human input, never by the loop. The component's contribution to the Vue render graph during a sweep is exactly nil.

This is the discipline `useSpringHotPath.ts:23-33` was written to enforce ("the former `frame()` wrote 17 reactive refs PER FRAME … Reactivity is the wrong tool for a 60 Hz positional update"), and the facet is the consumer that honours it without a single leak back into reactivity. **Falsifier:** any reactive write inside the painter closure, or any template binding to `springLive`/`scrubberPhase`/`liveValue` — there are none; `springLive` appears once, inside the painter.

### S-L2 — **`translateX(<cqw>)` against a locally-owned query container: a layout-read-free positional path**

```
:159   el.style.transform = `translateX(${…} * 100}cqw)`;
:189   .preset-track { container-type: inline-size; }
:192   .preset-ball  { left: 0; margin-left: calc(var(--ball-size) / -2); }
```

`.preset-ball` is a child of `.preset-track` (`:81-87`), so `cqw` resolves against the track's inline size — the painter never calls `offsetWidth` or `getBoundingClientRect`, never triggers a forced synchronous layout, and the value axis stays rail-relative under any container width, at any DPR, with no resize listener. The `-half` margin makes `v=0` and `v=1` land the ball's *centre* exactly on the rail ends. The container is declared on **the smallest element that can own it** — contrast D-L5, where the same author put one where nothing queries it.

**Falsifier:** if `.preset-ball` were not a descendant of `.preset-track`, `cqw` would silently fall back to the small-viewport width and every ball would fly off-screen. The template proves the nesting.

### S-L3 — **teardown is exact, total, and verified against the actual mount shape**

```
:150   let unregisterPainter: (() => void) | null = null;
:151   onMounted(() => { unregisterPainter = demo.registerSpringPainter(…); });
:163   onScopeDispose(() => unregisterPainter?.());
```

One acquire, one release, null-guarded for the never-mounted path (Suspense abandon). The file owns **no** other effect: no rAF, no `setTimeout`, no `addEventListener`, no `ResizeObserver`, no `MutationObserver`, no watcher. `registerPainter` returns `() => painters.delete(paint)` over a `Set` (`usePainterRegistry.ts:8-12`), so re-mount/unmount cycles are idempotent and cannot accumulate.

I checked the one thing that would break this: `onScopeDispose` is equivalent to `onUnmounted` **only** if no `<KeepAlive>` sits above (a cached-inactive component keeps its scope and would keep painting into detached DOM). `app/App.vue:74-79` — *"A keyed `<Suspense>` … **NO `<KeepAlive>`**, NO wrapping `<Transition>`: both broke the async loader outright."* Verified sound.

### S-L4 — **the eager first paint is consumed with the one ordering that makes it correct**

`usePainterRegistry.ts:10` calls `paint(...currentArgs())` at registration. The facet registers in `onMounted` — *after* the `:ref` callbacks have populated `trackBallEls` — so a facet that mounts mid-sweep (the controls drawer opened while the loop is running) has all four balls seated on the registration paint rather than blinking at 0 until the next rAF tick. Registering in `setup()` would have made the eager paint a no-op over an empty array; registering in `onUpdated` would have made it a storm. There is exactly one right hook here and the file uses it.

### S-L5 — **`:framed="false"` is the producer seam, not a CSS suppression**

`:119` passes `:framed="false"` to drop the editor's inner `Card`. That prop is a declared, documented part of `KeyframesEditor`'s contract (`KeyframesEditor.vue:132-139`, `:10` / `:23` — two real template branches, not a class toggle). The lazy alternative — `:deep(.card) { border: none; box-shadow: none }` — would have been a reach into the child's render tree. The facet asked the producer instead. This is the correct instinct, and it is the same instinct D-L3 abandons two rules later.

---

## 4. Verified NON-defects (recorded so the next pass does not re-litigate them)

| id | hypothesis tested | verdict |
|---|---|---|
| **NR-1** | *The facet takes `demo` as a prop while `springKeys.ts:9` exports `SPRING_DEMO_KEY` and siblings `inject` it (`SpringTarget.vue:169`, `StartingStyleTarget.vue:96`) — inconsistent transport.* | **NOT a defect.** `SpringScene.vue:67` builds the vnode (`h(SpringPhysicsFacet, { demo })`) but `app/App.vue:61-63` **renders** it (`<component :is="sceneRef?.tabsContent">`), inside the `#tabs-content` slot of the shell — outside SpringScene's subtree. `inject` walks the *instance* parent chain, so the key is unreachable here. The prop is **required**. |
| **NR-2** | *`color-mix(in srgb, var(--color-progress) …)` with `--color-progress` scoped to the scene would be invalid-at-computed-value-time, turning the hovered chip transparent.* | **NOT a defect.** `--color-progress: var(--accent-kf)` is declared at `:root` (`styles/style.css:91` opens the block, `:163` declares it, `:179` closes). Globally inherited; resolves everywhere. |
| **NR-3** | *`rounded-pill` / `rounded-md` are phantom utilities like `btn-interactive`.* | **NOT a defect.** `node_modules/@mkbabb/glass-ui/dist/styles/theme/radius.css` is an `@theme` block declaring `--radius-pill: 9999px` and `--radius-md: 6px`, so Tailwind v4 generates both utilities. |
| **NR-4** | *Re-clicking the active Chip desyncs reka `Toggle`'s internal state from the controlled prop.* | **NOT a defect.** `dist/chip-6ysLmScu.js` binds `:model-value` from the prop unconditionally in the selectable branch → fully controlled; `data-state` cannot drift. |
| **NR-5** | *Inline `:ref` arrows (`:84`) re-create identity each render, causing a null-then-set churn or stale entries.* | **NOT a defect.** Vue's `setRef` nulls old refs only for string/`Ref` forms; function refs are simply re-invoked with the same element. `:key="t.preset.name"` is stable (four distinct names), and `trackBallEls` is per-instance. |
| **NR-6** | *`values[i] ?? 0` masks a length mismatch between `trackBallEls` and `trackValues`.* | **NOT a defect (dead guard).** Both derive from the same frozen `SPRING_PRESETS` (`springPresets.ts:17`, `useSpringHotPath.ts:92`, `useSpringDemo.ts:101`); lengths are 4 by construction. Folded into D-L7 as dead defensive code rather than raised separately. |
| **NR-7** | *`LabeledSlider`'s `@update:model-value` payload type mismatches `demo.response.value` (number vs number[]).* | **NOT a defect.** `dist/components/labeled-field/LabeledSlider.vue.d.ts` declares `"update:modelValue": (value: number) => any`. Correct. |
| **NR-8** | *`clamp` from `@mkbabb/value.js/math` is unresolvable (an F-1-style phantom).* | **NOT a defect.** `@mkbabb/value.js@4.0.0` is the one `@mkbabb` entry that *is* in the lockfile (lane-frontend §2); `package.json` `exports["./math"]` resolves to `dist/subpaths/math.js`; `math.d.ts:1` declares `clamp(value, min, max): number`. `@lucide/vue@1.17.0` is declared at `package.json:74` and installed. |
| **NR-9** | *The editor's sticky footer is broken by the `26rem` scroll cap (`:234-238`).* | **NOT a defect.** `KeyframesEditor`'s root is `<div class="contents">`, so the footer becomes a direct child of `.keyframes-editor-scroll`; `sticky bottom-0` inside an `overflow-y: auto` box pins as the comment at `:225-229` claims. |

---

## 5. Remaining defects, briefly

### D-L5 — MINOR · a query container nothing queries

```
:237   .keyframes-editor-scroll { max-height: 26rem; overflow-y: auto;
                                  border-radius: var(--radius-md, 0.5rem); container-type: inline-size; }
$ grep -rn "@container\|cqw\|cqh\|cqi\|cqmin" demo/components/instrument/keyframes/   → (no output)
```

Nothing in the editor subtree resolves a container unit or runs a container query. `container-type: inline-size` is not inert: it applies layout + style + inline-size containment, makes the element a stacking context and a containing block for absolutely and fixed-positioned descendants. Separately, the demo already ships `.container-inline-size` as a named utility (`styles/style.css:238-240`), and this file re-authors the declaration twice in scoped CSS.

**Falsifier — and it is a live one.** The declaration may be load-bearing as an *intrinsic-size firewall*: with inline-size containment the scroll box contributes 0 to its grid track's intrinsic width, which (together with the `min-width: 0` at `:231`) prevents a wide `<pre>` in a keyframe card from blowing out the rail. If that is the real job, the finding stands but changes shape: it is **mis-declared**, and should be `contain: inline-size` with that rationale written down, not `container-type` with a comment that says "container query container" when there is no query. Either way the current line is wrong about itself.

### D-L6 — MINOR · the F-5 shim shape, one directory over

```
:138   import type { SpringDemoContext } from "./springKeys";        ← real home
:139   import type { SpringPreset, SpringTrack } from "./useSpringDemo";  ← a re-export hop
```

`useSpringDemo.ts:19-22`:

```ts
// The comparison-row vocabulary stays importable from the demo composable (the
// sidebar consumes it here); the interface itself lives with the hot-path seam.
export type { SpringPreset } from "./springPresets";
export type { SpringTrack } from "./useSpringHotPath";
```

The real homes are `./springPresets` and `./useSpringHotPath` — **siblings in the same directory** as the importer. The re-export's stated justification names "the sidebar", and this file's own header (`:2-10`) declares that sidebar dissolved. This is lane-frontend **F-5**'s exact shape (a re-export that exists only to preserve an old path) at a third site the lane did not enumerate — **⚠ EXTENDS F-5** (the lane found 2; this is a 3rd, type-only). Type-only, so zero runtime cost; the cost is that the type's home is now a lie and grep-by-path fails.

### D-L7 — MINOR · unchecked downcast

```
:146-148   const setTrackBallEl = (i: number, el: Element | ComponentPublicInstance | null) => {
               trackBallEls[i] = (el as HTMLElement) ?? null;
           };
```

`as HTMLElement` from a union containing `ComponentPublicInstance` is a raw assertion, not a narrowing — if the `:ref` ever moved onto a component, `trackBallEls[i]` would hold an instance and `el.style.transform` would throw at 60 Hz. The `?? null` arm is unreachable: the assertion's input can be `null` but never `undefined`, and `null ?? null` is `null`. `el instanceof HTMLElement ? el : null` is one token longer and sound.

### D-L8 — MINOR · dead code in the child this file mounts

```
SpringHeatmap.vue:281-286
    watch(() => [demo.response.value, demo.dampingFraction.value] as const,
          () => { /* marker is reactive (markerStyle); nothing else to repaint */ });
SpringHeatmap.vue:277
    defineExpose({ HALF_CELL_RESPONSE, HALF_CELL_DAMPING });   // "for any future consumer / gate witness"
```

A live watcher with an empty callback — a real reactive effect, re-evaluated on every param edit, doing nothing; the comment concedes it. And a `defineExpose` of two module constants that this facet cannot reach: `:58` mounts `<SpringHeatmap :demo="demo" />` with **no `ref`**, and no other file imports the component. Speculative API with zero consumers.

Attributed to `SpringHeatmap.vue`, raised here because the facet is its sole mount site and the L axis names "dead code" over the import closure.

**Third, related observation (INFO, no id):** `SpringHeatmap.vue:290-293` documents the field as riding *"the scene's `--ball-tone` seam (inherited from `.spring-target` → `--color-progress`)"*. Per **NR-1** the heatmap renders in the shell's `#tabs-content`, never under `.spring-target` (`SpringTarget.vue:278` is where `--ball-tone` is set). So `resolveTone()`'s `--ball-tone` probe (`:117`) always returns empty and always falls through to `--color-progress` (`:118`). No visual bug — both resolve to the same violet — but the documented seam is unreachable by construction, and the same applies to `.preset-ball`'s `var(--ball-tone, var(--color-progress))` here (`design-idioms.css:184`).

### D-L12 — INFO · non-reactive prop snapshot

`:141-142` `const props = defineProps<{ demo }>(); const demo = props.demo;` freezes the prop at setup. Provably harmless: `SpringScene.vue:31,67` passes a setup-scope `const`, and the scene is recreated per swap-in under the keyed `<Suspense>`. Recorded because the failure mode is silent and total — a changed prop would leave the facet driving a dead context *and* leave a painter registered on the old registry (the `onScopeDispose` closure targets the stale one). Note the manual-`props` form is the house majority (21 files vs 7 reactive-destructure), so the *style* is idiomatic; only the snapshot line carries the hazard.

### D-L13 — INFO · a gate citation with no gate

`:118` cites *"the `proof:easing-sidebar-normalized` G6 flatten clause"*. `package.json` declares exactly two `proof:*` scripts (`proof:publish`, `proof:owner-golden`); the demo tree cites ~60 distinct `proof:*` names, of which this file's is one of the unrunnable majority. `grep -rl "easing-sidebar-normalized"` finds this file and 19 tranche docs — the name is archival, not executable. Raised at INFO only: the claim the comment makes (no card-in-card) is *true* and is enforced structurally by `:framed="false"` (S-L5), so the stale citation misleads about provenance, not about behaviour.

---

## 6. Module size / colocation (Goldilocks)

| measure | value | read |
|---|---|---|
| total | 242 L | well inside the demo's ≤500 L discipline |
| `<template>` | 124 L, of which **~55 L are comment** | 44% comment |
| `<script setup>` | 48 L, of which 10 L comment | tight; one hook pair, two pure helpers |
| `<style scoped>` | 68 L, of which **~30 L are comment** | 44% comment |
| imports | 9, all reachable; 0 unused | clean |
| exported surface | none (leaf component) | correct |

Colocation is right: `SpringHeatmap` is a sibling, `springPresets`/`useSpringHotPath`/`useSpringKeyframesEditor` are colocated concern seams, `KeyframesEditor` is correctly reached through the shared `@components` alias. Nothing here is a god module and nothing wants splitting.

The one structural observation: at 44% comment density in both non-script blocks, most of it changelog (`T.B7`, `K.W1′`, `S3 → T.D7`, `J.W2 S5 (DS-3)`, `P.W6 S3`) narrating what *used to be here* — `SpringSidebar`, `useSpringPaneDrag.ts`, `KfPillTabs`, the solid-green inset, the red hover family. Three of the defects above (D-L6, D-L13, and the `--ball-tone` note) are cases where that narration has drifted out of agreement with the tree. Grading none of it as a defect on its own — the L axis measures code, and the code is the right size — but recording that the file's dominant maintenance risk is its prose, not its logic.

---

## 7. What I did not test

- **Anything requiring a render.** Layer count for D-L11, the emitted utility order for D-L9, `ToggleGroupItem` slot feasibility for D-L10, and the actual on-screen amplitude of D-L1 are all `UNPROVEN-NEEDS-LIVE` and belong to SS-13. Every claim above is asserted from source only.
- **`npm ci` reproducibility.** Deferred wholesale to lane-frontend **F-1**: `@mkbabb/glass-ui` is absent from both `package.json` and `package-lock.json` while 7.0.0 sits in `node_modules`. Every glass-ui fact in this challenge is sourced from that installed copy and is therefore true of *this working tree*; none of it is guaranteed to survive a clean install. D-L2 and D-L3 both name glass-ui behaviour and both inherit that caveat — though D-L2 is if anything *strengthened* by it, since a phantom class and a phantom package are the same failure twice.
- **The engine's own solver.** `SpringProgress` was read only far enough to confirm the underdamped branch exists (`src/animation/physics/spring/progress.ts:158-161`, `types.ts:15`) — enough to falsify or sustain D-L1, not an engine audit.

**No file in keyframes.js, glass-ui, or value.js was written, mutated, or executed. No installs, no servers, no browser. This document is the only write.**
