claude-opus-5[1m] (served model id)

# CHALLENGE — `ContourPreview.vue` · axis **C** (CONSUMPTION)

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/ContourPreview.vue` (62 lines).
**Axis** how this component consumes value.js (0.13 pinned), keyframes.js (4.3), glass-ui (^4.0.0 / installed 4.0.0), the 45-operation fourier API, and its props/emits + integration seams.
**Mode** static + source-derived, read-only. No browser tooling. No product source touched in any repo; this file is the lane's only write.
**Substrate** fourier HEAD `cd26c6533adc32dfe1453d74117d3cb73b89ea16` — the same coordinate the intake lane certified byte-identical to the F.W0 opening tree (`lane-fourier-r3-r6.md` R4-9, X-4).

**Import closure read whole:** the component itself; `web/src/lib/contourEditing.ts` (222); `web/src/components/ui/CollapsibleSection.vue` (72). Seam context read: `VisualizationView.vue` (the sole caller), `ContourEditorCanvas.vue` (the sibling renderer + the `defineExpose` source of `points`), `composables/usePointDrag.ts`, `lib/colors.ts`, `lib/defaults.ts`, `style.css`, `components/ui/PathPreview.vue`, and the installed `@mkbabb/glass-ui@4.0.0` dist.

**Verdict.** The component is **DEFECTIVE on the consumption axis, but not blocking.** Its *package* consumption is exemplary-by-abstinence (zero direct value.js / keyframes.js / glass-ui coupling — see S-3). Its *design-system* consumption is where it fails: it hand-authors a CSS color the repo has a token, a resolver, a dark-mode observer and a booked WCAG carry for, and it lands **1.660:1** in light mode where the design system's own cured token lands **4.625:1**. Its props contract compiles to a lie. And it re-forks a local primitive that already solves its exact problem, then re-forks it *worse* than the sibling that shares its data.

| | count |
|---|---:|
| defects | **11** |
| BLOCKER | **0** |
| MAJOR | 5 |
| MINOR | 5 |
| INFO | 1 |
| superlatives | **4** |

---

## §1 — DEFECTS

### D-1 · **MAJOR** — the stroke is a hand-authored CSS color literal: theme-blind, contrast-failing, and invisible to the F.W2 migration surface

**Provenance** `ContourPreview.vue:44` — `stroke="hsl(40 90% 55% / 0.85)"`.

Two separately-receipted consequences of one root cause. Counted **once** (the R3-7a/b/c precedent: one claim, several actionable children).

**(a) WCAG 1.4.11 non-text contrast failure, light mode only.**

The component's chrome is `cartoon-card` (`ContourPreview.vue:32`), which resolves `background: var(--card)` (`style.css:108-112`). glass-ui 4.0.0 ships `--card: hsl(36 48% 97%)` light / `hsl(24 8% 16%)` dark (`node_modules/@mkbabb/glass-ui/dist/styles/tokens/color-radius.css:72`, `tokens/dark-arm.css:64`). Composited sRGB relative-luminance contrast of the shipped stroke against that surface:

| stroke | vs light `--card` | vs dark `--card` |
|---|---:|---:|
| `hsl(40 90% 55%)` α=1 (as authored) | **1.810 : 1** | — |
| `hsl(40 90% 55% / 0.85)` α=.85 (**as shipped**) | **1.660 : 1** | 5.922 : 1 |
| `var(--viz-amber)` light, post-D.W4.d `hsl(35 76% 35%)` | **4.625 : 1** | — |

WCAG 2.2 SC 1.4.11 requires **≥ 3:1** for graphical objects required to understand content. The spline *is* the content — it is the only rendering of the contour in the left panel. The shipped value misses the bar by **1.81×**.

The repo already fought and won this exact fight for the token: `style.css:113-118` books *"D.W4.d — light-mode `--viz-amber` darken (axe contrast carry). glass-ui ships light `--viz-amber` at `hsl(35 70% 42%)` ≈ 3.54:1 … The override darkens to `hsl(35 76% 35%)` ≈ **4.6:1**"*. My independent computation reproduces the repo's own published figure to three digits (**4.625**), which authenticates the method. **The cure was applied to the token; this component does not read the token, so the cure does not reach it.** It survived the D.W4.d sweep because `@axe-core/playwright` (`web/package.json` devDeps) does not evaluate SVG `stroke` contrast — 1.4.11 graphics-contrast is not machine-detectable, so the automated gate that motivated D.W4.d is structurally blind to this site.

**Falsifier.** Show that (i) `cartoon-card` does not resolve to `var(--card)` in light mode, or (ii) the light `--card` is materially darker than `hsl(36 48% 97%)` at runtime (a local override), or (iii) SC 1.4.11 does not apply because the contour is decorative and an equivalent non-visual affordance exists. (iii) fails on the tree: `VisualizationView.vue:257` mounts this as the *only* contour rendering in the editor's left panel; there is no textual equivalent. **UNPROVEN-NEEDS-LIVE (SS-13):** the computed runtime `--card`, should any cascade layer override glass-ui's token.

**(b) The literal is invisible to every color mechanism the repo owns — including the F.W2 value.js migration surface.**

- It bypasses `--viz-amber`, the token 8 other files consume (`grep -rn -- "--viz-amber" web/src` → 11 live selector sites in `CanvasControlsDock.vue:128-129`, `EditorControlsDock.vue:199`, `EquationModeToggle.vue:64`, `EquationView.vue:421-422`, `ConvergenceLegend.vue:78-79,94`, `FunctionInput.vue:251-253`, `AppHeader.vue:197-198,203`).
- It bypasses `VIZ_COLORS` (`lib/colors.ts:79-89`) and therefore `resolveVizColors()` (`:92-98`) and therefore the dark-mode `MutationObserver` at `App.vue:11-17`. The stroke is byte-identical in light and dark, while the design system deliberately gives amber **two** values (`style.css:120` light / `:125` dark).
- **It could not be captured even if F.W2 rewired `lib/colors.ts` onto value.js.** `cssVarToHex` (`colors.ts:21-55`) offers exactly three parse arms: `hsl(h,s%,l%)` / `hsl(h s% l%)` (`:31-33`), the bare Tailwind triplet `"h s% l%"` (`:41`), and `rgb(r,g,b)` (`:46-48`). None matches modern space-separated **slash-alpha** syntax — the `hslMatch` regex requires `\)` after the third component, and `" / 0.85"` intervenes. Fed this component's own literal, the repo's resolver returns the `#888888` sentinel (`:20`). The literal sits *outside* the 117-LOC hand-rolled color surface that F.W2 exists to migrate, so the migration cannot sweep it up as collateral.

**Falsifier for (b).** Exhibit a code path that reads this stroke value, or a resolver arm that parses `hsl(40 90% 55% / 0.85)`. I ran the three regexes against the string: zero matches. Note the honest limit — value.js 0.13's own `parseCssColor` may well handle slash-alpha; the claim is about *the repo's* resolver, which is the thing F.W2 migrates.

**Fix (one line, zero migration risk):** `stroke="var(--viz-amber)"`, alpha via `stroke-opacity` or `color-mix`. That simultaneously discharges (a), (b), and the dark-mode divergence.

**Route** F.W2 (the value.js/colors.ts migration surface) + the a11y carry that D.W4.d opened.

---

### D-2 · **MAJOR** — the props contract compiles to `{ type: null, required: true }`: a required prop the sole caller cannot supply, with runtime validation destroyed

**Provenance** `ContourPreview.vue:6-8`:
```ts
const props = defineProps<{
    points: Point2D[] | undefined;
}>();
```
Call site `VisualizationView.vue:257` — `<ContourPreview :points="editorRef?.points" />`, where `editorRef` is `ref<InstanceType<typeof ContourEditorCanvas> | null>(null)` (`VisualizationView.vue:80`).

**Receipt — compiled with the project's own installed compiler** (`web/node_modules/@vue/compiler-sfc`, `parse` + `compileScript` over the real file):

```
props: { points: { type: null, required: true } },
```

And the three-way falsifier probe, same compiler:

| declaration | compiled |
|---|---|
| `points: P[] \| undefined` (**as written**) | `{ type: null, required: true }` |
| `points?: P[]` (the fix) | `{ type: Array, required: false }` |
| `points: P[]` | `{ type: Array, required: true }` |

Two distinct defects fall out:

1. **`required: true` on a prop that is structurally `undefined` at first render.** `editorRef` is a template ref; the whole `v-if="isEditing"` subtree's vnodes are built during the parent render *before* any child mounts, so `editorRef.value` is `null` on the pass that creates `<ContourPreview>`. Every entry into edit mode therefore emits `[Vue warn] Missing required prop: "points"` and burns one wasted empty render before the ref assignment re-renders the parent.
2. **`type: null` = runtime type validation permanently off.** The `| undefined` arm collapses the union to no resolvable runtime constructor. The declaration that *reads* stricter than `points?: P[]` is in fact strictly weaker: it throws away the `type: Array` check the optional form keeps.

The compile-time and runtime contracts **diverge and `vue-tsc` cannot see it** — at the type level `Point2D[] | undefined` accepts the optional-chained call site, so the build is green while the runtime contract says "required". That divergence is the reason this survived CI (`web-build` = `vue-tsc -b && vite build`, `.github/workflows/ci.yml`).

**Falsifier.** Show `defineProps<{ points: P[] | undefined }>()` compiling to `required: false` under the installed `@vue/compiler-sfc`, or show `editorRef.value` non-null on the render pass that creates the `ContourPreview` vnode. Neither holds. **UNPROVEN-NEEDS-LIVE (SS-13):** the console warning itself (dev-mode only; Vue strips prop validation in production builds — so the *impact* is dev-ergonomic, and a reader who weighs impact alone may fairly downgrade this to MINOR. I grade MAJOR because it is the component's **entire** contract, it is wrong in two independent ways, and the fix is one character).

**Related, folded here rather than counted separately:** the prop is not `readonly Point2D[]`. The component receives the editor's *live mutable array by reference* (`ContourEditorCanvas.vue` `defineExpose({ …, points })` — `points` is the same `ref<Point2D[]>` `usePointDrag` splices and index-assigns). The contract permits a mutation the component does not perform; `readonly Point2D[]` would seal it at zero cost.

**Route** F.W4 (per-component D/L/C contract audit).

---

### D-3 · **MAJOR** — live-bounds viewBox: the preview rescales continuously during drag, contradicting the sibling's *documented* stable-bounds decision on the same data

**Provenance** `ContourPreview.vue:16-28` recomputes min/max over `props.points` and returns a viewBox derived from **live** extents.

The sibling that owns and mutates that very array made the opposite decision, in writing:

```
ContourEditorCanvas.vue:49  // Stable bounds — computed from initial contour, not live points
ContourEditorCanvas.vue:50  const stableBounds = ref({ minX: 0, maxX: 1, minY: 0, maxY: 1, width: 1, height: 1 });
ContourEditorCanvas.vue:72  // Bounds — use stable bounds for viewBox and image overlay, live bounds for nothing
ContourEditorCanvas.vue:73  const bounds = computed(() => stableBounds.value);
```

`usePointDrag.onPointerMove` (`usePointDrag.ts:24-52`) replaces `points.value[dragStartIdx]` plus `2 × magnetRadius` neighbours (default `magnetRadius = 3` → 7 objects) on **every pointermove**. Each index assignment fires the array's index dependency; `previewViewBox` reads every element, so it invalidates on every move. Result: **dragging a point toward or past the bounding box zooms and re-centres the thumbnail under the user's hand**, while the editor canvas beside it holds still by design. That is not a cosmetic quibble — it is the preview disagreeing with the editor about what "the shape" is, mid-gesture, on shared state.

**Falsifier.** Show that `previewViewBox` does not re-evaluate during drag, or that `stableBounds` is not the sibling's live viewBox source. Both fail: `ContourEditorCanvas.vue:75-81` builds `viewBox` from `bounds.value` = `stableBounds.value`, and `ContourPreview.vue:17` reads `props.points` directly. **UNPROVEN-NEEDS-LIVE (SS-13):** the perceived magnitude of the jitter, which depends on how far a drag moves an extremal point.

**Fix** mirror the sibling: snapshot bounds on contour change, not on point change.

**Route** F.W4.

---

### D-4 · **MAJOR** — O(n) spline-string + O(n) bbox rebuilt per pointermove at n = 1024 default, into a 160×160 px thumbnail, with the repo's own INP discipline unapplied

**Provenance** `ContourPreview.vue:10-14` (`closedSplinePath(pts)`) + `:16-28` (bbox pass), both invalidated by the per-move index writes at `usePointDrag.ts:32,42-49`.

Scale receipt: `web/src/lib/defaults.ts:8` → `n_points: 1024`. `closedSplinePath` (`contourEditing.ts:22-45`) emits **one cubic segment per point** — for n=1024 that is 1024 `C x,y x,y x,y` groups built by string concatenation into an array then `join("")`, on the order of tens of kilobytes of `d` attribute, handed to the SVG path parser, **per pointermove event**, to fill a `160px × 160px` box (`ContourPreview.vue:57-61`). The bbox loop adds a second full 1024-element pass. Neither is memoised, throttled, decimated, nor `requestAnimationFrame`-coalesced.

The repo owns exactly the tool for this and does not point it here: `web/src/lib/scheduler.ts` (54 LOC) implements a three-rung `yieldToMain()` floor plus `processInChunks`. Its header (`scheduler.ts:14-19`) scopes itself out of the render loop *because* that loop "is already rAF-paced AND off-screen-gated" — a rationale that does **not** cover this component, which is neither.

Note the asymmetry the tree itself supplies: `simplifyClosedPoints` (`contourEditing.ts:104-181`) is a heap-driven O(n log n) rewrite whose 26-line docblock explains that the prior O(n²) scan was unacceptable. That care was spent on a user-invoked one-shot; the per-pointermove path got none.

**Falsifier.** Show that `previewPath`/`previewViewBox` do not invalidate per move (they do — index writes on a deep-reactive array, read by both computeds), or that live contours are materially smaller than 1024 points. The second is the real limit on this claim: `simplifyClosedPoints` (default `removalFraction = 0.2`) and a user-lowered `n_points` both shrink n, and `ContourSettings` exposes `n-points` as a control (`VisualizationView.vue:257-263`). At small n the cost is negligible. **The claim is bounded to the default configuration**, which is what an unmodified session gets. **UNPROVEN-NEEDS-LIVE (SS-13):** the actual per-move task duration and whether it crosses the 50 ms long-task / 200 ms INP thresholds.

**Route** F.W4 (with the census's INP/long-task lane).

---

### D-5 · **MAJOR** — re-forks `components/ui/PathPreview.vue`, the repo's own SVG path-thumbnail primitive, and re-forks it *worse*

**Provenance** `web/src/components/ui/PathPreview.vue` (69 LOC) vs `ContourPreview.vue:10-28,50-62`. `PathPreview` has **one** consumer tree-wide (`GalleryCard.vue:10`); `ContourPreview` imports it zero times.

The primitive already solves this component's exact problem, and solves each sub-problem better:

| concern | `PathPreview` | `ContourPreview` |
|---|---|---|
| degenerate extent | `rangeX = maxX - minX \|\| 1`, `rangeY = … \|\| 1` (`:31-32`) | **absent** — see D-6 |
| aspect handling | single uniform `scale = 1 / (max(rangeX,rangeY) * (1 + padding*2))` (`:35`) — isotropic by construction | X-derived pad applied to Y (`:26`) — anisotropic; see D-6 |
| padding | `padding` prop, default **`0.1`** (`:17`) | hardcoded `0.1` (`:26`) — same magnitude, no knob |
| stroke color | `strokeColor` prop, default **`"currentColor"`** (`:16`) — inherits the cascade, themes for free | hardcoded literal — see D-1 |
| stroke weight | `strokeWidth / size` (`:57`) — resolution-independent | `stroke-width="2"` + `vector-effect` (a *different*, also-valid technique) |
| viewBox | fixed `"0 0 1 1"` (`:54`) — never churns | recomputed per move — see D-3 |
| size | `size` prop, default 64 (`:14`) | hardcoded 160px in scoped CSS (`:57-61`) |

`lane-frontend.md:444` classifies `PathPreview` as *"genuinely bespoke — no flag"*, i.e. it is the **sanctioned** local primitive; and `contourEditing.ts:12-18` already exports `unzipPoints` producing exactly the `{x:number[], y:number[]}` shape `PathPreview` consumes.

**Falsifier — and it is a real one, so the claim is stated narrowly.** `PathPreview` renders a **polyline** (`M…L…Z`, `:44`); `ContourPreview` renders a **closed Catmull-Rom spline** (`closedSplinePath`). It is therefore *not* a drop-in: feeding `unzipPoints(pts)` to `PathPreview` would lose the smoothing that is the whole point of the preview. **The defect is not "should have called `PathPreview`" — it is that a `d`-accepting slot or `path` prop on the existing primitive was the two-line move, and instead its geometry, padding, fit and framing logic were re-derived from scratch and each re-derivation came out weaker.** Refute by showing `PathPreview` cannot be extended to accept a precomputed `d` without breaking `GalleryCard`.

**Route** F.W4 (component-convergence budget), alongside `lane-frontend.md §4`'s shadow ledger.

---

### D-6 · **MINOR** — anisotropic padding derived from the X extent alone, and no degenerate-extent guard

**Provenance** `ContourPreview.vue:26-28`:
```ts
const pad = (maxX - minX) * 0.1;
return `${minX - pad} ${-(maxY + pad)} ${maxX - minX + pad * 2} ${maxY - minY + pad * 2}`;
```
The Y padding is `(maxX − minX) * 0.1` — an **X**-derived quantity. The sibling on the same data computes both axes independently at a different magnitude: `padX = b.width * MARGIN`, `padY = b.height * MARGIN`, `MARGIN = 0.15` (`ContourEditorCanvas.vue:30,76-81`). Two consequences:

- For a tall, narrow contour the vertical margin collapses toward zero while the horizontal stays at 10% — the stroke crowds or clips the top/bottom edge.
- If every point shares an `x` (a vertical degenerate), `pad = 0` **and** viewBox width = 0 → a zero-width viewport. The sibling guards precisely this (`width: maxX - minX || 1`, `:69`); so does `PathPreview` (`|| 1` on both ranges, `:31-32`). This component guards neither.

**Falsifier.** The zero-width case is defensive, not live: contours arrive from image extraction (`api.ts:305` `/api/images/{slug}/extract-contour`) and always carry a positive X extent, and D-7's `n < 2` early-return catches the empty case. **So the honest severity is MINOR** — the anisotropy is the live half, the degenerate guard is the latent half. Refute the anisotropy half by showing `preserveAspectRatio="xMidYMid meet"` (`:53`) neutralises it: it does not — `meet` letterboxes the *viewport*, it does not equalise padding *inside* the viewBox.

---

### D-7 · **MINOR** — three different minimum-point thresholds across one 62-line component and its library

| site | threshold | behaviour below it |
|---|---|---|
| `ContourPreview.vue:12` | `pts.length < 3` → `""` | draws nothing |
| `ContourPreview.vue:18` | `pts.length < 2` → `"0 0 1 1"` | frames a unit box |
| `contourEditing.ts:24-27` | `n < 2` → `""`; `n === 2` → `M…L…Z` | the library **supports** n=2 |

At exactly **n = 2** the component computes a real bounding box, sizes the viewport to it, and then renders an empty path — a correctly framed blank — while the library it calls would have drawn the segment. The two in-component thresholds are also mutually inconsistent with each other.

**Falsifier.** Show n=2 is unreachable: `deleteSelected` floors at 3 (`ContourEditorCanvas.vue:167`) and `simplifyClosedPoints` floors at 4 (`contourEditing.ts:114`), so **n=2 is indeed not reachable through the editor today** — which is why this is MINOR and not MAJOR. It remains an unforced internal inconsistency, and the floors that save it live in two other files.

---

### D-8 · **MINOR** — the glass-ui seam this component depends on imports from the **root barrel** while the rest of the tree uses the subpath

**Provenance** `CollapsibleSection.vue:2` —
```ts
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@mkbabb/glass-ui'
```
against the tree's other two `Collapsible` consumers, both on the subpath: `ContourSettings.vue:8-12` and `PaperSidebar.vue:7` → `"@mkbabb/glass-ui/collapsible"`. It is also the tree's only single-quoted glass-ui specifier (`lane-frontend.md:293` records the same line in the full import census; the census counts it under *(root)* while listing the identical symbols under `/collapsible`).

`ContourPreview.vue:4` is a first-order consumer of that seam. Root-barrel imports defeat subpath-level treeshaking; here the practical cost is nil because `vite.config.ts:40-56` lumps all of glass-ui into a single `vendor-ui` manual chunk regardless — **so this is MINOR on discipline, not on bytes.** Falsify by showing the barrel and the subpath resolve to different modules (they do not) or that the manual chunk is removed.

---

### D-9 · **MINOR** — `:default-open="true"` is both redundant and inert; the section's state is uncontrollable and unpersisted

**Provenance** `ContourPreview.vue:33` passes `:default-open="true"`. `CollapsibleSection.vue:5-11` already declares `withDefaults(…, { defaultOpen: true })` — the pass is a no-op restatement.

Worse, it is the *only* control the consumer has, and it is one-shot: `CollapsibleSection.vue:13` `const open = ref(props.defaultOpen)` snapshots the prop and never watches it, and the wrapper exposes **no** `v-model:open` passthrough. So `ContourPreview` can neither open, close, nor read the section after mount, and the state dies on unmount — every re-entry into edit mode re-opens the preview regardless of what the user did last. Contrast the sibling panels in the same left stack, whose visibility state *is* persisted (`useViewState` → localStorage, `VisualizationView.vue:37`).

**Falsifier.** Show `CollapsibleSection` forwards `open`: it does not — `defineExpose` is absent and the only `v-model:open` binding is internal (`CollapsibleSection.vue:41`).

---

### D-10 · **MINOR** — a live upstream carry: `cartoon-card` is a local resurrection shim, and the in-repo site count is stale

**Provenance** `ContourPreview.vue:32` `class="cartoon-card px-3 py-2"`, resolved by `style.css:107-112` `@utility cartoon-card`, whose docblock (`:98-106`) records that *"glass-ui removed the `.cartoon-card` recipe at C.W5"* and that the shim is *"the fourier-local KISS stop-gap"* pending a cross-repo re-publish. `lane-frontend.md §9 item 8` books it as a held upstream carry.

**Measured correction to the in-repo comment.** `style.css:102` claims *"14 application sites (13 files; one uses it 5 times)"*. Live:

```
$ grep -ro "cartoon-card" web/src | wc -l     → 25   (matches lane-frontend.md §3's raw figure)
$ grep -rl "cartoon-card" web/src | wc -l     → 15
```
Of the 25, **4 are in `style.css` itself** (3 prose mentions + the `@utility` declaration). **Application sites = 21 across 14 files**, with `EquationView.vue` at 5 (the comment's "one uses it 5 times" detail still holds). So the comment is stale by **+7 sites / +1 file**, and `lane-frontend.md`'s "25 `cartoon-card`" is the *raw occurrence* count, not the application-site count — both figures are right under their own denominator, in the X-3 pattern.

`ContourPreview` is 1 of those 21. **Falsifier:** re-run the two greps.

---

### D-11 · **INFO** — zero automated coverage

`grep -rn "ContourPreview\|preview-svg\|live contour" web/e2e/` → empty. The repo has **no unit-test runner at all** (`lane-frontend.md §1`: vitest ABSENT; only `@playwright/test`), so the sole gate over this file is `vue-tsc -b` — which, per D-2, is precisely the gate its props defect is invisible to. Not actionable alone; it is the reason D-1..D-7 could all coexist unnoticed.

---

## §2 — SUPERLATIVES (L-18 runs both ways)

### S-1 · The Y-flip is derived correctly and documented — and matches the sibling character-for-character

`ContourPreview.vue:25-27` returns min-y as `-(maxY + pad)` with the comment *"Flip Y: SVG viewBox uses negative Y since we scale(1,-1) inside"*, paired with `<g transform="scale(1,-1)">` at `:55`.

**Derivation (the falsifier, run):** under `scale(1,-1)` a data point `(x, y)` renders at `(x, −y)`; data `y ∈ [minY, maxY]` therefore occupies rendered `y ∈ [−maxY, −minY]`; a viewBox covering it with padding `p` must start at `−(maxY + p)` with height `(maxY − minY) + 2p`. That is exactly the expression written. It is also identical in form to `ContourEditorCanvas.vue:78` (`${b.minX - padX} ${-(b.maxY + padY)} …`) and to `usePointDrag`'s coordinate convention via `svgPoint`'s `return { x, y: -transformed.y }` (`ContourEditorCanvas.vue:135`). Sign conventions are the classic silent-corruption site in flipped-axis SVG; this one is right, reasoned, and consistent across three files.

### S-2 · `vector-effect="non-scaling-stroke"` is the correct primitive, not a copied incantation

`ContourPreview.vue:48`. The viewBox is *data-space* and unbounded (contour coordinates run to the extraction resize, commonly ~768 — `ContourEditorCanvas.vue:91`), while the viewport is fixed at 160 px (`:57-61`). Without `non-scaling-stroke` a `stroke-width="2"` in a 768-unit viewBox mapped to 160 px renders at ≈ 0.42 device px — a sub-pixel hairline that antialiases toward invisible, and whose apparent weight would then *change with contour size*. **Falsifier:** remove the attribute and the stroke becomes extent-dependent. The same attribute is used correctly on the sibling's path and control points (`ContourEditorCanvas.vue:225,238`).

Stated limit, so this credit is not oversold: `non-scaling-stroke` guarantees a constant *2 device px* stroke — it does **not** rescue D-1, because a 2 px stroke at 1.660:1 is still 1.660:1.

### S-3 · Zero direct package coupling — the tri-package [P0] atomic bump costs this component **zero lines**

`grep -n "value.js\|keyframes" ContourPreview.vue contourEditing.ts CollapsibleSection.vue` → the only hit tree-wide in the closure is a *prose comment* (`CollapsibleSection.vue:59`). Concretely, across the whole import closure:

- **value.js 0.13 → 4.0**: 0 sites. (`lane-frontend.md §9 item 5` measures the repo-wide value.js consumer surface at just 5 sites — `easings.ts:9,16`, `ConvergencePlot.vue:5`, `useCurveTransition.ts:8`, `harmonics.ts:5` — none of them here.)
- **keyframes.js 4.3 → 6**: 0 sites. The only motion in the closure is CSS (`CollapsibleSection.vue:60-65`), driven by glass-ui's canonical `collapsible-open`/`collapsible-close` keyframes with a `prefers-reduced-motion: reduce` escape at `:66-70`.
- **glass-ui 4.0.0 → 7.0.0**: exposure is exactly the `Collapsible` / `CollapsibleTrigger` / `CollapsibleContent` triple, and **`./collapsible` appears in neither the 14 ADDED nor the 21 REMOVED subpaths** of `lane-frontend.md §5`'s measured export-map diff. It survives the uplift untouched.
- **the 45-operation API surface**: 0 calls. The component receives already-materialised points through a prop.

Against `lane-frontend.md §9 item 1` — *"[P0] The tri-package atomic bump … cannot be decomposed"* — this component is on the **free** side of that transaction. **Falsifier:** name one import in the closure that resolves to `@mkbabb/value.js`, `@mkbabb/keyframes.js`, or a removed glass-ui subpath. There is none.

### S-4 · The `R6-8` leaf-coupling hazard is genuinely unreachable here — and that is a structural property, not luck

`lane-fourier-r3-r6.md` **R6-8** (ADOPT-AS-FACT + CARRY → F.W5) establishes that fourier's operation records embed derived client back-references (`operation:PATCH:/api/visualizations/{slug}` carrying `"clients": ["client:updateVisualization"]`), so a client-side edit mutates the operation leaf too and the two are *"structurally non-isolable by construction."*

`ContourPreview` cannot participate in that failure mode: it imports no client function, references no operation, and its data crosses the seam only as plain `Point2D[]`. The contour data originates upstream at `getContour` / `saveContour` (`api.ts:320,326-327` → `/api/contours`, `/api/contours/{hash}`) and is fully materialised into `store.contour` before it reaches `ContourEditorCanvas`, which zips it into points (`ContourEditorCanvas.vue:54`) and exposes them. **This is the posture F.W5's shared-provenance contract wants generalised** — the client↔operation join kept out of the leaf. **Falsifier:** find a transitive `lib/api.ts` import in the closure; there is none (`contourEditing.ts` imports nothing at all; `CollapsibleSection.vue` imports only glass-ui, vue, lucide).

---

## §3 — CORPUS FOLD (hitherto, per L-law)

| corpus row | this lane |
|---|---|
| `lane-fourier-r3-r6.md` **R4-9 / X-4** (substrate byte-identical at HEAD `cd26c653`) | **relied on** — no staleness caveat needed on any file:line above. |
| **R6-8** (operation leaf embeds client back-refs; → F.W5) | **CONFIRMED-BY-ABSENCE** at this component — S-4. Cited, not contradicted. |
| **R5-7** (loop evidence keyed to component callsites is blind to native element loops; → F.W4) | **not applicable** — this component has zero `v-for`. Recorded so the F.W4 denominator can mark it explicitly rather than silently. |
| **R3-7a** (35 Tooltip callsites / 9 consumers; → F.W3) | **not applicable** — no Tooltip here. |
| **R3-10** (6 dynamic `:is` families; → F.W4) | **not applicable** — no dynamic components here. |
| `lane-frontend.md` §2 roster row *"ContourPreview.vue · 62 · Small SVG contour thumb"* | **AGREE** on both figures; this lane supplies the contents. |
| `lane-frontend.md` §4 — `PathPreview.vue` *"genuinely bespoke — no flag"* | **AGREE, and extended.** The lane flagged bespoke components that shadow *glass-ui*; D-5 flags the inverse — a bespoke component shadowing the repo's own sanctioned local primitive. New axis, no contradiction. |
| `lane-frontend.md` §3 — *"25 `cartoon-card`"* | **REFINED, not refuted.** 25 is the raw occurrence count (verified); **application sites are 21 / 14 files**. The in-repo comment at `style.css:102` ("14 sites / 13 files") is the stale one. Same two-denominator pattern as X-3. |
| `lane-frontend.md` §3 verdict — the 3 `components/ui/` wrappers are *"thin API-shape adapters, not shadows … the correct posture — keep"* | **PARTIAL CONTRADICTION.** For `CollapsibleSection` specifically, "thin adapter" understates two live defects the wrapper introduces on its own account: the root-barrel specifier (D-8) and the non-forwarded, non-persisted `open` state (D-9). *Keep* remains right; *no findings* does not. |
| `lane-frontend.md` §9 item 1/5 (tri-package [P0] bump; value.js leg = 5 sites) | **CORROBORATED and localised** — S-3: this component's leg is 0 sites. |
| `lane-frontend.md` §9 item 8 (`cartoon-card` + `--viz-amber` upstream carries) | **BOTH land on this component**: D-10 (the shim) and D-1 (the amber cure that could not reach a hardcoded literal). D-1 is the first evidence I find that the D.W4.d contrast carry was **incompletely applied**. |
| `CENSUS-2026-08-03.md` §6.7 (Codex residue "zero credit") | untouched; I follow the intake lane's correction (X-1) and cite R-rows as measurement. |

---

## §4 — UNPROVEN-NEEDS-LIVE (queued for SS-13)

1. **D-1(a)** — computed runtime `--card` under the real cascade, and an in-browser contrast probe of the rendered stroke against it. Static math predicts **1.660 : 1** light.
2. **D-2** — the `[Vue warn] Missing required prop: "points"` line in a dev-server console on entering edit mode.
3. **D-3** — perceived viewBox jitter amplitude while dragging an extremal point.
4. **D-4** — measured per-`pointermove` task duration at `n_points = 1024`; whether it crosses 50 ms long-task / 200 ms INP.
5. **D-1(b)** — whether value.js 0.13's own `parseCssColor` accepts `hsl(40 90% 55% / 0.85)` (bears on how F.W2 should shape the resolver replacement; does **not** bear on the claim, which is about `lib/colors.ts`).

---

## §5 — TALLY

**11 defects** — 0 BLOCKER · 5 MAJOR (D-1, D-2, D-3, D-4, D-5) · 5 MINOR (D-6, D-7, D-8, D-9, D-10) · 1 INFO (D-11).
**4 superlatives** — S-1, S-2, S-3, S-4, each with its falsifier run.

**Wave routing.** F.W2 ← D-1. F.W4 ← D-2, D-3, D-4, D-5, D-6, D-7, D-9. F.W3/upstream-carry ← D-8, D-10. F.W5 ← nothing (S-4: the seam is clean here). Test-gate lane ← D-11.

**The single sentence.** The component's *package* consumption is the cleanest thing about it — zero lines owed to the [P0] tri-package bump — and its *design-system* consumption is the worst: one hardcoded amber literal simultaneously fails WCAG 1.4.11 by 1.81×, opts out of dark mode, and sits outside the very color surface F.W2 exists to migrate.

**Method note.** Read-only throughout; the only write is this file. Probes used: `cat`/`sed`/`grep`/`find`/`wc`/`ls`, `node` for (i) sRGB relative-luminance contrast arithmetic and (ii) `@vue/compiler-sfc` `parse`+`compileScript` over the real SFC and over three synthetic prop declarations. No dev server, no browser, no network.
