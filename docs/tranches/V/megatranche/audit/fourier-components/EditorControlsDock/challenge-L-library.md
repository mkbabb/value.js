claude-opus-5[1m]

# CHALLENGE — `EditorControlsDock.vue` · axis **L (LIBRARY)**

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/EditorControlsDock.vue` (230 lines: script 1–53, template 55–173, style 175–230)
**Posture** assume-defective; every claim carries severity + `file:line` + its falsifier.
**Method** static + source-derived only. No browser tooling. Read whole: the target, all 7 import edges, the two consumers of its emit surface, and the glass-ui 4.0.0 dist contracts it binds against.

**Verdict** — **15 findings: 2 BLOCKER · 5 MAJOR · 6 MINOR · 2 INFO**, plus **7 superlatives**. The component's *own* authorship is above the tree median (it reaches for library token seams instead of `:deep()` escapes, and its `keep-dock-open` usage is the one non-redundant prop on the file). It fails on **contract**, not craft: three of its eight props are stale mirrors of non-reactive functions, and four of its scoped-CSS declarations bind to custom-property names glass-ui deleted.

---

## 0 · Read set (every import edge, read-only)

| Edge | Resolved | Read |
|---|---|---|
| `vue` `computed` | — | n/a |
| `@mkbabb/glass-ui/slider` → `Slider` | `dist/components/ui/slider/Slider.vue.d.ts`, `dist/slider-DQ95MET2.js` | ✅ |
| `@mkbabb/glass-ui/hover-popover` → `HoverPopover` | `dist/components/custom/hover-popover/HoverPopover.vue.d.ts`, `dist/HoverPopover-Dpzwvc4t.js` | ✅ |
| `@mkbabb/glass-ui/metric-badge` → `MetricBadge` | `dist/components/custom/metric-badge/MetricBadge.vue.d.ts` | ✅ |
| `@mkbabb/glass-ui/dock` → `GlassDock`, `DockIconButton` | `dist/components/custom/dock/{index,GlassDock.vue,DockIconButton.vue,DockSeparator.vue}.d.ts`, `composables/useDockShellProps.d.ts`, `dist/dock.js` | ✅ |
| `@/components/ui/tooltip` → `Tooltip` | `web/src/components/ui/tooltip/Tooltip.vue` (39 l, thin glass-ui shim) | ✅ |
| `@/lib/colors` → `VIZ_COLORS` | `web/src/lib/colors.ts` (117 l) | ✅ |
| `lucide-vue-next` × 13 glyphs | `node_modules/lucide-vue-next/dist/esm/{Icon,createLucideIcon,defaultAttributes}.js` | ✅ |

Emit-surface consumers (required to falsify the prop contract): `VisualizationView.vue:20,79–96,238–248`, `ContourEditorCanvas.vue` (341 l), `composables/{usePointDrag,useContourHistory}.ts`, `stores/animation.ts:35–110`, `BasisCanvas.vue:425–455`.
Style contracts: `glass-ui/dist/styles/dock-controls/icon-button.css`, `dist/styles/dock/layer-group.css`, `dist/styles/theme/bridges.css`, `dist/styles/tokens/{color-radius,dark-arm,light-dark,offsets-sizing}.css`.

Installed producer: **glass-ui 4.0.0** (`web/package.json:14` `^4.0.0`).

**Tree state audited.** The **working tree**, not `HEAD`. `git status` shows `EditorControlsDock.vue` and `VisualizationView.vue` carry uncommitted edits; the target's diff is exactly two lines of the in-flight 3.1→4.0 migration — `:113` `:amount=` → `:value=` and `:117` `variant="glass-scrubber"` → `variant="standard"` — i.e. the `lane-frontend.md:472` note *"the WT diff already did `amount=` → `value=` for the 3.1→4.0 hop"*. Line numbers below are working-tree line numbers. This matters twice: **S-5's cure is uncommitted**, and the migration hand that touched `:117` did not look 108 lines down at `:225–228` (**L-3**).

---

## 1 · BLOCKERS

### L-1 · BLOCKER · the dock's three state props are a push-mirror that the primary edit gesture never refreshes

`canUndo` / `canRedo` / `isSaved` (`EditorControlsDock.vue:25,26,32`) drive `:disabled="!canUndo"` (`:74`), `:disabled="!canRedo"` (`:79`), and the Check↔Save glyph swap (`:63–66`, `:166–169`). None of them is derived. They arrive only through `emit("stateChange", …)` — and **`stateChange` is not emitted on drag-end**.

The chain, verbatim:

- `useContourHistory.ts:31–32` — `const canUndo = () => historyIndex.value > 0` — **plain functions, not refs**. They can only be *sampled*.
- `ContourEditorCanvas.vue:123–130` — `emitState()` is the sole sampler; it calls `canUndo()` / `canRedo()`.
- `ContourEditorCanvas.vue:42–47` — `usePointDrag(points, magnetRadius, svgPoint, pushHistory)`. The 4th argument (`onDragEnd`) is **`pushHistory` itself**, not the `emitState`-wrapping form used everywhere else in the file.
- `usePointDrag.ts:57–63` — `onPointerUp()` calls `onDragEnd()` and nothing else.
- `useContourHistory.ts:11–16` — `pushHistory()` advances `historyIndex`.

**Failure scenario (deterministic).** Open a contour, drag one control point, release. `historyIndex` 0 → 1, so `canUndo()` is now `true`; no `stateChange` fires; the dock still holds `canUndo: false` from the pointer-*down* sample at `ContourEditorCanvas.vue:154–157`. The Undo button at `EditorControlsDock.vue:74` stays **greyed and inert** after the single most common edit in the editor. It un-sticks only on the next unrelated interaction that happens to call `emitState()` (another pointerdown, background click, smooth, simplify, reset).

**Second, worse manifestation — the save indicator lies.** `VisualizationView.vue:87–90` resets `editorSaved = false` *inside* `onEditorStateChange`. So: Save → `isSaved: true` → green Check (`:167`, `.is-save.saved{color:var(--success)}` `:210–212`) → user drags three more points → no `stateChange` → **the Check is still green while the contour holds unsaved edits.** That is a data-loss-adjacent false affirmative on the one control whose whole job is to say "your work is stored".

**Falsifier (tested, holds).** (a) Does `@pointerup` reach the SVG when the circle captured the pointer? Yes — `usePointDrag.ts:22` `setPointerCapture` retargets but does not stop bubbling; `ContourEditorCanvas.vue:239` `@pointerup` is on the ancestor `<svg>`. (b) Is there some other sampler? `grep emitState` → 9 call sites (`:69,114,120,151,157,162,184,191,198`), none on the drag-end path. (c) Would a reactive `canUndo` cure it without touching the dock? Yes — which is precisely the point: **the dock is defenceless because it was handed a snapshot instead of a derivation**, and the tree already ships the live alternative (see L-14).

**Attribution, honestly.** The root cause sits in `ContourEditorCanvas.vue:42–47` + `useContourHistory.ts:31–32`; `EditorControlsDock` is the surface where it becomes user-visible and the component that accepted a snapshot-shaped prop contract. Both ends must change; the dock end is `canUndo`/`canRedo`/`isSaved` → live refs (or the dock consuming `editorRef` directly, as `ContourPreview` already does at `VisualizationView.vue:257`).

---

### L-2 · BLOCKER · `VIZ_COLORS` resolves to grey `#888888` at runtime — `lib/colors.ts` cannot parse glass-ui 4.0's oklch tokens

`EditorControlsDock.vue:8` imports `VIZ_COLORS`; `:123` binds `:style="{ '--track-color': VIZ_COLORS.fourier }"`. That value is **not** `#bf4040`.

- `lib/colors.ts:77–87` seeds `VIZ_COLORS.fourier = "#bf4040"`.
- `App.vue:11` calls `resolveVizColors()` on mount, and `App.vue:13` re-calls it from a `MutationObserver` on every theme toggle.
- `lib/colors.ts:90–96` overwrites each field with `cssVarToHex("--viz-fourier")`.
- `lib/colors.ts:22–54` `cssVarToHex` recognises exactly four shapes: leading `#` (`:29`), `hsl(…)` (`:32–35`), a bare Tailwind-v3-era HSL triplet `"6 72% 49%"` (`:40–43`), and `rgb(…)` (`:46–51`). Anything else → **`return "#888888"` (`:53`)**.
- glass-ui 4.0 defines every primary viz token in **oklch**: `tokens/color-radius.css:263–265` (`--viz-fourier: oklch(0.579 0.201 30.4)`), `tokens/dark-arm.css:113–115`, and `tokens/light-dark.css:145–147` (`light-dark(oklch(…), oklch(…))`). `--viz-green` inherits it transitively through `--section-color-4: oklch(…)` (`color-radius.css:245`).
- No `@property` registration exists for any `--viz-*` (`grep -rn "@property" dist/styles | grep -i viz` → ∅), so `getComputedStyle().getPropertyValue()` returns the **unresolved token stream** — `light-dark(oklch(…), oklch(…))` or `oklch(…)` — matching none of the four patterns.

**Failure scenario.** After first paint, `VIZ_COLORS.fourier === VIZ_COLORS.chebyshev === VIZ_COLORS.legendre === "#888888"`. The initial hex literals — the only correct values in the file — are *destroyed* by the very function meant to refine them. Blast radius beyond this dock: **50 `VIZ_COLORS` references across 14 files**, including the census-named render path — `lib/canvas-drawing/epicycles.ts`, `lib/canvas-drawing/labels.ts`, `lib/golden-shimmer.ts`, `BasisCanvas.vue` (CENSUS-2026-08-03 §3a: *"Palette resolved once at app boot from CSS custom properties (`App.vue:11` `resolveVizColors()`)"* — the census recorded the mechanism, not its arithmetic).

**The one survivor proves the rule.** `--viz-amber` works *only* because fourier locally re-declares it in `hsl()` — `web/src/style.css:120,125` (the D.W4.d WCAG darken). And the single in-tree consumer that reads a resolved colour at render time reads *amber*: `useCoeffHover.ts:65` `const amber = VIZ_COLORS.amber || VIZ_COLORS.golden`. Every oklch-sourced sibling is grey.

**Falsifier (tested, holds).** (a) A later stylesheet re-declaring `--viz-*` in hsl/rgb/hex? Only `style.css:120,125`, amber only — `web/src/style.css` is 143 lines and is the tree's *only* CSS file. (b) `light-dark()` resolved at computed-value time? Only for **registered** custom properties; none are registered. (c) Registered `<color>` props serialize to `rgb()`? Moot — and oklch would serialize as oklch regardless. (d) Does the colour ever matter before `resolveVizColors` runs? `App.vue:11` is `onMounted`, i.e. before any viz route paints.

**Component-local note.** For *this* file the damage is masked by L-3 — the grey never reaches a live custom property, because the property names are dead too. Two independent breaks in one six-line chain (`:8 → :123 → --track-color → :225–228`). Severity is BLOCKER at repo scope, and the finding belongs here because `@/lib/colors` is a direct import edge of the target.

**Corpus delta.** `lane-frontend.md §5` enumerated the glass-ui uplift break surface as *import/subpath/member* removals (`metric-badge ×7`, `hover-popover ×2`, `DockIconButton ×2`, `ToastVariant`, `lucide-vue-next → @lucide/vue`). **A token-COLOUR-SPACE break is a fifth, unenumerated break class** — invisible to import greps, and it already fired on the 3.1→4.0 hop that shipped.

---

## 2 · MAJOR

### L-3 · MAJOR · the magnet-slider retint is dead by rename — `--slider-scrub-*` does not exist in glass-ui 4.0

`EditorControlsDock.vue:222–229`:

```css
/* A.W2.c — glass-scrubber per-instance retint hook + full-width sizing. */
.magnet-slider-track {
    width: 100%;
    --slider-scrub-range-bg:        color-mix(in srgb, var(--track-color) 30%, transparent);
    --slider-scrub-range-bg-hover:  color-mix(in srgb, var(--track-color) 45%, transparent);
    --slider-scrub-thumb-bg:        var(--track-color);
    --slider-scrub-thumb-bg-hover:  var(--track-color);
}
```

glass-ui 4.0's slider reads **`--slider-range-bg`, `--slider-range-blur`, `--slider-range-shadow`, `--slider-thumb-bg`, `--slider-thumb-border-color`, `--slider-thumb-shadow`, `--slider-thumb-size`, `--slider-thumb-spring`, `--slider-track-bg`, `--slider-track-height`** (exhaustive: `grep -ro -- "--slider-[a-z0-9-]*" dist/`). **Zero `--slider-scrub-*` anywhere in the package.** All four declarations are inert; only `width: 100%` survives. Note the shape of the break: two of the four (`*-bg-hover`) have **no counterpart at all** in 4.0, so even a mechanical prefix rename would not restore them.

**Failure scenario.** The magnet popover's slider paints the default `--slider-range-bg` / `--slider-thumb-bg`, never the fourier accent. The `:style` binding at `:123` and the whole `VIZ_COLORS` import edge exist solely to feed these four dead names.

**Falsifier.** (a) Scoped-CSS containment? No — custom properties declared on the class-bearing root inherit into the portaled subtree regardless of the `[data-v-…]` attribute; the failure is the *name*, not the scope. (b) Does the class even land on the Slider root? Yes — `Slider.vue.d.ts` declares `class?: HTMLAttributes['class']`. (c) Is 4.0 the installed producer? `package.json:14` `^4.0.0`, `node_modules/@mkbabb/glass-ui/package.json` `"version": "4.0.0"`.

**Scale — this is an epidemic, not a one-off:** `grep -rn "slider-scrub" web/src` → **23 occurrences across 7 files** (`EditorControlsDock.vue:225–228`, `BasisSelector.vue:319–322`, `SliderControl.vue:144–148`, `HarmonicLevelGrid.vue:210–213`, `MorphPhaseConfig.vue:207–…`, `GlassTimeline.vue:125`, `ConvergenceTimeline.vue:136`). Every per-instance slider retint in fourier is dead.

**CONTRADICTION — corpus row corrected.** `lane-frontend.md:382` reports: *"All 11 `glass-scrubber` and all `glass-track`/`glass-fill`/`glass-thumb` occurrences are **prose comments only** (verified site-by-site: … `EditorControlsDock.vue:48,222` …)"*, concluding the scrubber surface is clean post-4.0. It is not. The sweep greped the **variant/class token** `glass-scrubber`; the live residue is the **custom-property prefix** `--slider-scrub-`, which that pattern does not match. `EditorControlsDock.vue:222` — one of the two lines the lane cites as harmless prose — is the comment sitting *directly above* the four dead declarations at `:225–228`. The lane read the comment and stopped one line short. `lane-frontend.md:382` should be amended: prose-only for `glass-scrubber`, **23 live-but-dead declarations for `--slider-scrub-*`**.

---

### L-4 · MAJOR · 14 of 15 `:size` bindings are inert — the library owns dock glyph sizing, and lucide emits *attributes*

`EditorControlsDock.vue` binds `:size` fifteen times (`:60,64,65,75,80,88,93,98,106,137,144,149,158,167,168`). Fourteen of those icons are direct children of a `DockIconButton`.

- `lucide-vue-next/dist/esm/Icon.js:29–31` renders `h("svg", { …defaultAttributes, …props, width: size, height: size, … })` — `size` becomes the **`width`/`height` presentation attributes** (`defaultAttributes.js:9–11` confirms the default 24/24 shape).
- `glass-ui/dist/styles/dock-controls/icon-button.css:132–135` — `.dock-icon-button > svg { width: var(--dock-icon-glyph, 1.25rem); height: var(--dock-icon-glyph, 1.25rem); }`, inside `@layer components` (`:13`).
- SVG presentation attributes lose to **every** author-origin declaration, layered or not. The CSS wins unconditionally. `--dock-icon-glyph: calc(1.25rem * var(--dock-scale))` (`tokens/offsets-sizing.css:287`).

The library documents exactly this and the *precise* nuance the file misses — `icon-button.css:126–131`: *"A consumer passing an explicit lucide size **class** still WINS (utility layer > component layer)."* A **class** wins. An **attribute** does not.

**Failure scenario.** The deliberate collapsed-vs-expanded design distinction — Save/Check at 18 px collapsed (`:64,65`), 20 px expanded (`:167,168`) — **does not render**. Both paint at `--dock-icon-glyph`. The author's intent is expressed 14 times and honoured 0 times, and any future retune of those numbers is a no-op that will read as "the change didn't take".

**Falsifier.** (a) Inline style would beat layered CSS — but `Icon.js` writes attributes, not `style`. (b) Non-direct-child would miss the `>` combinator — every icon here is the immediate child of the `Primitive as="button"` root (`dock.js` `DockIconButton` renders `Primitive` with the default slot, no wrapper). (c) The **one** binding that *is* live: `:60` `<Wand2 :size="18" class="shrink-0 text-foreground/50" />` sits in the `#collapsed` div outside any `DockIconButton` — correctly 18 px.

---

### L-5 · MAJOR · `canDelete` is a lie at the boundary — the Trash button is enabled on a no-op

`EditorControlsDock.vue:96–100` renders `<DockIconButton class="is-rose" :disabled="!canDelete" @click="emit('delete')">`. The producer of `canDelete` is `ContourEditorCanvas.vue:127` — `canDelete: selectedIdx.value !== null`. The consumer of the emit is `ContourEditorCanvas.vue:179–185`:

```ts
function deleteSelected() {
    if (selectedIdx.value === null || points.value.length <= 3) return;   // :180
    …
}
```

**Failure scenario.** Simplify a contour down to 3 points, select one. `canDelete` is `true`, the Trash button is enabled and lit, the click fires, `deleteSelected()` returns at `:180`, nothing happens, no message, no state change. The affordance promises an action the tree has already decided to refuse. Enabling a control whose handler is guarded by a *different* predicate is the classic four-state-contract break.

**Falsifier.** (a) Is the `<= 3` floor reachable? `simplifyClosedPoints` (`lib/contourEditing.ts`) and repeated deletes both drive toward it; nothing in the tree floors the point count above 3. (b) Does the dock have the information to render honestly? Yes — it already receives `pointCount` (`:28`), so `:disabled="!canDelete || pointCount <= 3"` is a one-token fix; the duplicated threshold is then the residual (see L-10 for the same anti-pattern).

---

### L-6 · MAJOR · the viz render path burns a full 60 fps epicycle pipeline behind an invisible canvas for exactly this dock's lifetime

This is the render-path seam the axis asks for. `EditorControlsDock` mounts under `v-if="isEditing && store.contour"` (`VisualizationView.vue:238`) — **the exact complement** of the canvas-hide predicate at `VisualizationView.vue:198` (`:class="{ 'is-hidden': isEditing && store.contour }"`). The dock's presence on screen is a proof-carrying indicator that the epicycle instrument should be parked.

It is not parked, because `.is-hidden` is opacity-only:

```css
/* VisualizationView.vue:404–409 */
.canvas-stage > .canvas-container.is-hidden,
.canvas-stage > .editor-shell.is-hidden { opacity: 0; z-index: 0; pointer-events: none; }
```

The element keeps its box, stays in flow, stays inside the viewport. `BasisCanvas.vue:435–452` gates the shared clock on `IntersectionObserver` with `{ threshold: 0 }` observing `containerRef`, and **IntersectionObserver reports intersection independent of `opacity` and `visibility`.** So `anim.setCanvasVisible(true)` persists, `anyCanvasVisible` stays `true` (`stores/animation.ts:43–44`), the rAF gate at `animation.ts:48–53` and `:62–63` never trips, `anim.t` mutates every frame, and `BasisCanvas.vue:378–428`'s watchers schedule `drawFrame()` continuously.

**Failure scenario.** Enter contour-edit mode with a computed workspace. For the entire editing session, at 60 fps behind an `opacity: 0` surface: `clearRect` → `getViewTransform` → `drawGrid` → `drawImageOverlay` → `drawGhostPath` → `fourierPositionsAt(components, anim.t, n)` over the full harmonic chain → `trail.update`/`trail.draw` → `computeStableEpicycleBbox` → `drawEpicycleCircles` (297-line module) → `drawConnectingLine` → `drawTipDot` → `drawBasisLabels` → `hover.setLabelHitRegions`. Pipeline enumerated from **CENSUS-2026-08-03 §3a** and **lane-frontend.md §6 Path A** (`BasisCanvas.vue:90–193`), which record the I.γ off-screen gate as *banked hygiene* — it is banked for **scroll-away**, and silently defeated by the crossfade idiom.

**Falsifier.** (a) Is the clock actually running? Autoplay fires at `useWorkspaceLoader.ts:116,118` (`anim.play()`), and **nothing pauses on `isEditing`** — `grep "anim.pause\|pause()" VisualizationView.vue useViewState.ts` → ∅; `useViewState.ts` only flips `isEditing` (`:18,31,40,43`). (b) Would `display:none` fix it? Yes — but it would break the deliberate opacity crossfade (`VisualizationView.vue:390–402`), so the honest cure is `anim.setCanvasVisible(!isEditing && …)` or a `content-visibility`/`visibility` arm plus a gate that reads it. (c) Does this cost anything if the user paused? No — `playing` is user intent and gates first (`animation.ts:53`). That is the one narrowing condition on the claim.
(d) **UNPROVEN-NEEDS-LIVE (SS-13):** the *magnitude* (frame time, dropped frames during drag) is a live measurement. The *existence* of the un-gated loop is fully source-derived above.

---

### L-7 · MAJOR · three of the file's four glass-ui import edges are definition-absent in the producer's shipping majors

`EditorControlsDock.vue:3–6` binds four subpaths. Per **`lane-frontend.md:472,474,475`** (producer inventory against glass-ui 7.0.0 / CHANGELOG):

| Line | Import | Producer disposition | Corpus row |
|---|---|---|---|
| `:5` | `MetricBadge` from `./metric-badge` | subpath **removed** → `./metric` (`Metric`); prop pass due | `lane-frontend.md:472` (7 imports / 6 files) |
| `:4` | `HoverPopover` from `./hover-popover` | subpath **removed at 5.0.0** → `<Popover>` | `lane-frontend.md:474` (2 imports) |
| `:6` | `DockIconButton` from `./dock` | member **removed at 5.0.0** → `<DockControl>` (`shape="icon"`); *"the five legacy SFCs are DEFINITION-ABSENT — clean break, no alias"* | `lane-frontend.md:475` (2 imports) |
| `:3` | `Slider` from `./slider` | survives | — |

Thirteen `DockIconButton` instantiations and two `HoverPopover` instantiations in 118 template lines make this file the **densest single-file migration cost** on the dock surface. It is also load-bearing on the deadlock recorded at `lane-frontend.md §5 🔴` — glass 4→7 ∧ keyframes 4.3→6 ∧ value 0.13→4.0 is one atomic transaction.

**Failure scenario.** Any glass-ui uplift past 4.x fails this file at build with three definition-absent imports before typecheck reaches the props.
**Falsifier.** This is *scheduled* debt, not a live break — the installed producer is 4.0.0 and all four resolve today. MAJOR because the file concentrates the cost, not because it is currently red.

---

## 3 · MINOR

### L-8 · MINOR · `.dock-separator` / `.dock-spacer` are library-owned classes, redeclared unlayered — the consumer copy wins the cascade and has already drifted

`EditorControlsDock.vue:179–188` redeclares two classes glass-ui already ships in `dist/styles/dock/layer-group.css` (`.dock-separator` `:35–41`, `.dock-spacer` `:64–66`), both inside `@layer components` (`:23`). A Vue SFC `<style scoped>` block is **unlayered**, so it beats any layered rule regardless of specificity. What the file discards by winning:

| Property | glass-ui `layer-group.css:35–41` | `EditorControlsDock.vue:179–184` |
|---|---|---|
| height | `var(--dock-separator-height)` = `calc(var(--dock-h) * 0.5)` (`dock/shell.css:24`) — density-responsive | `1.5rem` hardcoded |
| background | `var(--surface-tint-15)` | `color-mix(in srgb, var(--foreground) 20%, transparent)` |
| margin | `0 0.375rem` | *absent* |
| orientation / grid | `:45–63` — vertical rule + `grid-column: 1/-1` section break | *absent* |

The producer shipped **`<DockSeparator>`** specifically to end this, and its doc-comment names the exact failure the raw class caused (`DockSeparator.vue.d.ts`: *"The raw `.dock-separator` class was axis-blind…"*). **Tree-wide adoption of `<DockSeparator>`: zero** (`grep -rn DockSeparator web/src` → ∅), while two consumers hand-roll it.

**Drift already realised** — same class name, two divergent consumer copies: `CanvasControlsDock.vue:106–112` carries `margin: 0 0.125rem`; `EditorControlsDock.vue:179–184` carries none. Two docks on the same stage (`VisualizationView.vue:211,239`, concurrently mounted during editing) space their separators differently.

**Falsifier.** (a) Does the orientation blindness bite *here*? No — this dock is horizontal, so the geometry loss is confined to margin/height/tint. That narrowing is why this is MINOR, not MAJOR. (b) `.dock-spacer`: `flex: 1` (`:187`) and `@apply flex-1` both compute to `1 1 0%` — **byte-equivalent, pure redundancy, zero behaviour delta**. Delete it; do not "fix" it.

### L-9 · MINOR · two of `GlassDock`'s three props restate the library defaults verbatim

`EditorControlsDock.vue:56` — `<GlassDock :collapse-delay="2000" :start-collapsed="true" fit-content>`. `useDockShellProps.d.ts` documents *"Idle-collapse delay in ms (**default 2000**)"* and *"Start in the collapsed state (**default true**)"*. Both bindings are no-ops today, and tomorrow they are a **pin**: a producer retune of the dock collapse cadence will move every dock in the constellation except this one, silently. `fit-content` is the only prop carrying intent. (Compare `CanvasControlsDock.vue:41`, which per `L5-docks.md:48` uses the same pair — a shared idiom worth retiring at both sites.)

### L-10 · MINOR · the `[0, 10]` magnet bound is written three times and a fourth time by the library

`EditorControlsDock.vue:49–52`:
```ts
set: (arr) => emit("update:magnetRadius", Math.max(0, Math.min(10, arr[0] ?? 0))),
```
plus `:min="0"` (`:118`) and `:max="10"` (`:119`). reka-ui already clamps: `SliderRoot.js:122` `const nextValue = clamp(snapToStep, min.value, max.value)`. Four statements of one fact; three of them in one component. A future magnet range change silently half-lands.

**Falsifier on the `?? 0` guard.** Can `arr` be `undefined`? The declared emit is `(payload: number[] | undefined)` (`Slider.vue.d.ts`), but `SliderRoot.js:104,120–129` only ever writes arrays through `updateValues`. So `arr[0]` cannot throw in practice. The guard is defensible defence; the **duplicated bound** is the finding.

### L-11 · MINOR · `@mousedown.stop @pointerdown.stop` is a superseded hand-defence, doubled

`EditorControlsDock.vue:124–125`. Both mechanisms it substitutes for now ship in the library:
- `Slider`'s `keepDockOpen` **defaults `true`** (`slider-DQ95MET2.js`: `keepDockOpen: { type: Boolean, default: !0 }`) — the dock is already held for the drag duration.
- `HoverPopover` stamps `data-glass-dock-portal` + `data-glass-dock-owner` on the portaled content *"so the dock's click-away handler treats clicks inside the popover as inside the dock"* (`HoverPopover.vue.d.ts`).

Additionally the two handlers guard the *same* gesture: browsers fire `pointerdown` then the `mousedown` compatibility event, so the pair is one defence written twice.

**Falsifier.** Could removing them break the slider? No — reka's own handlers sit on the same element (`stopPropagation` does not affect same-element listeners), and the content is teleported to `<body>`, so nothing in the dock's DOM subtree ever sees these events. The claim is *superseded*, not *harmful* — hence MINOR.

### L-12 · MINOR · the save control and point badge are duplicated between the collapsed and expanded slots, and the copies have already drifted

Collapsed `:61–67` vs expanded `:163–170`. Same badge text, same button, same class contract — but `@click.stop` in one and `@click` in the other, and `:size="18"` vs `:size="20"` (a distinction that does not render at all, per L-4). Two copies of a five-line control in a 118-line template is where the next divergence lands.

**Falsifier.** Is the `.stop` asymmetry deliberate? Plausibly — a collapsed-dock click would otherwise expand the dock. That justifies **one** difference, not the pair; and it is undocumented, unlike every other decision in this file (which is otherwise well-commented — see S-2).

### L-13 · MINOR · `showGhost?: boolean` is the lone optional prop among eight, with no caller that omits it

`EditorControlsDock.vue:24–33` declares seven required props and one optional. `VisualizationView.vue:241` — the only call site — always passes `:show-ghost="showGhost"`, and `useViewState.ts` types it non-nullable. The optionality buys nothing and makes `showGhost` `undefined`-capable inside `<component :is="showGhost ? Eye : EyeOff">` (`:144`) and `:class="{ 'is-active': showGhost }"` (`:143`), where `undefined` and `false` silently coincide — an inconsistency that survives only because no caller exercises it.

---

## 4 · INFO

### L-14 · INFO · **R5-7 does not apply inside this file — but its class reaches the component at one remove**

`EditorControlsDock.vue` contains **zero `v-for`** (native or component). The R5-7 defect class — *"template-loop evidence keyed to component callsites is blind to native HTML element loops"* (`lane-fourier-r3-r6.md:125`, ADOPT-AS-FACT, carried to F.W4) — has no direct instance here.

It touches the component **through its only quantitative surface**. The `{{ pointCount }} pts` badge (`:61`, `:163`) is the sole numeric readout in the dock, and the thing it counts is a **native SVG element loop**: `ContourEditorCanvas.vue:268–278` `<circle v-for="(pt, i) in points" :key="i" …>` — precisely the shape R5-7 identified as uncounted, and the shape R6-5's `NATIVE_TEMPLATE_LOOP` family was added to cure. The dock does not derive that count; it receives a hand-pushed snapshot (`emitState`, `ContourEditorCanvas.vue:128`), which is the same push-mirror that L-1 shows is incomplete.

**The tree already ships the live alternative, and uses it eight lines away.** `VisualizationView.vue:257` — `<ContourPreview :points="editorRef?.points" />` — reads the exposed ref directly (`ContourEditorCanvas.vue:225` `defineExpose({ …, points, … })`). So on the same stage, in the same edit session, **two surfaces render the same array through two different derivation mechanisms**: the preview is live, the dock's count is a snapshot. They cannot be guaranteed to agree, and under L-1's drag path they demonstrably do not agree about undo state. The push-emit for `pointCount` is redundant with a live path that already exists.

**Falsifier.** Can `points` change length without an `emitState()`? Length changes occur at `:148` (`splice` insert), `:181` (`splice` delete) and via `points.value = …` at `:188,195` — all four are followed by `emitState()`. So the *count* is currently correct; it is `canUndo`/`canRedo`/`isSaved` that desync (L-1). The finding is architectural, not a live count bug: **the count of a native element loop is maintained by hand at nine call sites**, and R5-7's own lesson is that hand-maintained loop evidence is what rots.

### L-15 · INFO · `aria-expanded` absent on both popover triggers (cross-axis, A)

`EditorControlsDock.vue:105` (`aria-label="Magnet radius"`) and `:136` (`aria-label="Overlay options"`) both label correctly but neither exposes disclosure state. Carried from `docs/audits/runs/2026-06-01-modern-web-audit/fourier.md:34`, which named these exact lines. Noted here only because `icon-button.css:109` treats `[aria-expanded="true"]` as an **active-paint hook** — so the missing attribute costs a visual affordance as well as the a11y contract. Full adjudication belongs to the A axis.

---

## 5 · SUPERLATIVES (L-18 runs both ways)

**S-1 · `keep-dock-open` on both popovers is REQUIRED, not redundant — and the file got it right where the same author got `collapse-delay` wrong.** `HoverPopover`'s `keepDockOpen` defaults **`false`** (`HoverPopover-Dpzwvc4t.js`: `keepDockOpen: { type: Boolean, default: !1 }`), unlike `Slider`'s which defaults `true`. Passing it at `:103` and `:134` is load-bearing: without it the dock's 2 s collapse timer fires mid-slider-drag. I opened this as a suspected L-9 sibling and the tree falsified it. `L5-docks.md:48` recorded the same verdict independently.

**S-2 · The accent variants use the library's declared token seam instead of `:deep()`.** `:199–206` sets `--btn-hover-color` on four variant classes; `icon-button.css:85` reads `color: var(--btn-hover-color, var(--foreground))`. This is the sanctioned per-consumer retint — no scoped-style escape hatch, no `!important`, no producer edit. In a file where four *other* custom properties are dead by rename (L-3), the ones the author chose from the documented surface are alive.

**S-3 · `is-active` hits the library's declared four-state contract.** `:143,148` bind `:class="{ 'is-active': … }"`; `icon-button.css:109` declares `&:is(.is-active, .active, [aria-expanded="true"], [aria-pressed="true"])`. The consumer used the first alternative of the producer's own selector group.

**S-4 · `text-viz-fourier` resolves — the CSS path is live exactly where the JS path is dead.** `:106`'s `magnetRadius > 0 ? 'text-viz-fourier' : ''` works because glass-ui bridges `--color-viz-fourier: var(--viz-fourier)` into the Tailwind theme (`dist/styles/theme/bridges.css:189`). It is the **only** `text-viz-*` utility in the entire tree and it is correct. The contrast with L-2 is the lesson: the same colour reached through CSS is right and reached through `getComputedStyle` string-parsing is grey.

**S-5 · The A8-04 residue is CURED at the source (uncommitted).** `2026-06-16-M-deep-audit/A8-no-legacy-sweep.md:19` filed `variant="glass-scrubber"` at `EditorControlsDock.vue:117` as a high-severity silent identity crisis. The working tree reads `variant="standard"` (`:117`) — one of the two uncommitted lines in the file. The remediation is landing; the *retint hooks* the same A8-04 row also called for (*"The per-instance retint hooks in scoped CSS reference `.glass-scrubber` — replace all consumer-side selectors"*) are **not** in the diff (L-3). Credit where due, and the residual named precisely rather than the whole row reopened.

**S-6 · The chronic dual-dock view-transition collision is RESOLVED upstream.** `2026-06-04-J-postimpl-audit/A4-e2e-ci-chronic.md:26–28` recorded `Unexpected duplicate view-transition-name: glass-dock-1` from `CanvasControlsDock` + `EditorControlsDock` mounting together, root-caused to glass-ui's module-counter naming and DEFERRED-BOOKED to glass-ui 3.2.0. glass-ui 4.0's `GlassDock` derives the name per instance from Vue's `useId()` (`dist/dock.js`: `useId` imported; `view-transition-name: x.replace(/[^a-zA-Z0-9_-]/g,"-")`), so the two docks — still concurrently mounted at `VisualizationView.vue:211,239` during editing — no longer collide. A booked deferral that the producer actually discharged.

**S-7 · Intake row R3-7a verifies exactly.** `lane-fourier-r3-r6.md:79` counts *"EditorControlsDock 10"* Tooltip callsites. Live: `:62, :73, :78, :86, :91, :96, :142, :147, :156, :165` = **10**. Confirmed to the site.

**S-8 · Intake row R3-10 verifies exactly, and its warning holds.** `lane-fourier-r3-r6.md:84` names `EditorControlsDock.vue:144` as one of the two dynamic-`:is` families silently dropped between `MODULE-RESOLUTION.json` (6) and `INSTANCE-STATE-REGISTRY.json` (4). Live: `:144` is `<component :is="showGhost ? Eye : EyeOff" :size="20" />` — confirmed. Worth noting for F.W4's budget: this site is **also** an L-4 casualty (its `:size` is inert) and an L-13 casualty (`showGhost` is optional, so the ternary can be driven by `undefined`). One line, three separate findings, and it was already flagged as census-invisible.

---

## 6 · Module-size / Goldilocks verdict

230 lines: 53 script / 118 template / 56 style. **Correctly sized** — no god-module pressure, one responsibility (an editor control rail), one computed, no composables to extract. The only structural pressure is L-12's duplicated collapsed/expanded save control, which is a 5-line dedup, not a decomposition. Explicitly **not** a finding: this file should not be split.

---

## 7 · Ledger

| id | sev | claim | primary provenance |
|---|---|---|---|
| L-1 | **BLOCKER** | `canUndo`/`canRedo`/`isSaved` never refresh on drag-end; Undo sticks disabled, saved-Check lies | `EditorControlsDock.vue:25,26,32,74,79,166` · `ContourEditorCanvas.vue:42–47` · `usePointDrag.ts:57–63` · `useContourHistory.ts:31–32` |
| L-2 | **BLOCKER** | `VIZ_COLORS.*` = `#888888` — `cssVarToHex` cannot parse oklch tokens; 50 refs / 14 files | `lib/colors.ts:22–54,90–96` · `glass-ui tokens/color-radius.css:263` · `App.vue:11,13` |
| L-3 | MAJOR | `--slider-scrub-*` deleted in glass-ui 4.0 → magnet retint dead; 23 occurrences / 7 files | `EditorControlsDock.vue:225–228` · `grep -ro -- "--slider-[a-z0-9-]*"` |
| L-4 | MAJOR | 14/15 `:size` bindings inert — attributes lose to `.dock-icon-button > svg` | `EditorControlsDock.vue:64–168` · `lucide Icon.js:29–31` · `icon-button.css:132–135` |
| L-5 | MAJOR | `canDelete` enables a handler guarded by a different predicate (`length <= 3`) | `EditorControlsDock.vue:97` · `ContourEditorCanvas.vue:127,180` |
| L-6 | MAJOR | epicycle pipeline runs 60 fps behind `opacity:0` for this dock's whole lifetime | `VisualizationView.vue:198,238,404–409` · `BasisCanvas.vue:435–452` · `animation.ts:48–53,62–70` · CENSUS §3a / lane-frontend §6 Path A |
| L-7 | MAJOR | 3 of 4 glass-ui import edges definition-absent at 5.0.0/7.0.0 | `EditorControlsDock.vue:4,5,6` · `lane-frontend.md:472,474,475` |
| L-8 | MINOR | `.dock-separator`/`.dock-spacer` redeclared unlayered; `<DockSeparator>` 0 adoptions; drift vs `CanvasControlsDock` | `EditorControlsDock.vue:179–188` · `layer-group.css:35–66` · `CanvasControlsDock.vue:106–112` |
| L-9 | MINOR | `collapse-delay`/`start-collapsed` restate library defaults → future pin | `EditorControlsDock.vue:56` · `useDockShellProps.d.ts` |
| L-10 | MINOR | `[0,10]` stated 3× locally + 1× by reka | `EditorControlsDock.vue:51,118,119` · `SliderRoot.js:122` |
| L-11 | MINOR | `@mousedown.stop @pointerdown.stop` superseded and doubled | `EditorControlsDock.vue:124,125` · `slider-DQ95MET2.js` · `HoverPopover.vue.d.ts` |
| L-12 | MINOR | save control + badge duplicated across slots, already drifted | `EditorControlsDock.vue:61–67` vs `:163–170` |
| L-13 | MINOR | lone optional prop with no omitting caller | `EditorControlsDock.vue:30` · `VisualizationView.vue:241` |
| L-14 | INFO | R5-7 inapplicable in-file; reaches the dock via `pointCount` mirroring a native `<circle v-for>` | `EditorControlsDock.vue:61,163` · `ContourEditorCanvas.vue:268–278` · `lane-fourier-r3-r6.md:125` |
| L-15 | INFO | `aria-expanded` absent on both popover triggers (cross-axis A) | `EditorControlsDock.vue:105,136` · `modern-web-audit/fourier.md:34` |

**Corpus deltas** — CONTRADICTS `lane-frontend.md:382` (scrubber surface is *not* prose-only: 23 live-but-dead `--slider-scrub-*` declarations); EXTENDS `lane-frontend.md §5` with a fifth break class (token colour-space, invisible to import greps); CONFIRMS `lane-fourier-r3-r6.md:79` (R3-7a) and `:84` (R3-10) to the site; APPLIES `:125` (R5-7) at one remove; RETIRES `A4-e2e-ci-chronic.md:26–28` (fixed upstream) and `A8-no-legacy-sweep.md:19` (fixed in-tree, retint residual re-filed as L-3).

**Writes performed by this challenge:** this file only. No product source in any repo was modified.
