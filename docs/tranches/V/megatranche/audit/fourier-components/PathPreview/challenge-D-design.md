claude-opus-5[1m] (served model id)

# CHALLENGE — `PathPreview.vue` · axis **D (DESIGN)**

**Subject.** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/ui/PathPreview.vue` (69 lines).
**Substrate.** fourier HEAD `cd26c6533adc32dfe1453d74117d3cb73b89ea16`, tree `9a66411d…` — the pin
adopted at intake row **R4-9** (`lane-fourier-r3-r6.md:107`, ADOPT-AS-FACT, "the audited scope is
byte-identical to the tree F.W0 opens on"). `PathPreview.vue` is **not** among the 28 dirty paths
(`git status --porcelain` → 27 M + 1 ??; the file is clean), so this challenge reads committed bytes.
**Method.** Static + source-derived only. No browser tooling. Two claims that require a live paint are
marked **UNPROVEN-NEEDS-LIVE (SS-13)**. Read whole: the subject, its sole import (`vue`), its sole
referrer `GalleryCard.vue`, and the three in-tree files that establish the house idioms it deviates
from (`ContourPreview.vue`, `EasingCurvePreview.vue`, `canvas-drawing/ghost-path.ts`).
**Posture.** Assumed defective until the tree proved otherwise. It proved otherwise on six counts
(§3) — L-18 runs both ways — and failed on twelve (§2).

**Severity law used here (declared, because D-1 changes what "severity" can mean).** The component
renders **zero instances** today (D-1). A defect on an unrendered surface harms no user *now*.
So every row below is graded at **remount** — the grade the defect carries the moment F.W4's
per-component disposition puts it back on screen — with **D-1 itself standing as the reason every
other row is latent**. Grading them at *today's* impact would score the whole file INFO and tell
the formation nothing.

---

## §1 — Verdict

| | |
|---|---|
| **Defects** | 12 (**2 BLOCKER** · 3 MAJOR · 4 MINOR · 3 INFO) |
| **Superlatives** | 6 |
| **F.W1 tri-package break surface** | **ZERO lines** — see S-5. The break surface lives in its *referrer*, not in it (D-12b). |
| **Headline** | The component is **dead** — a zero-instance orphan whose only live reference is a **born-dead import** at `GalleryCard.vue:10`, ungated because `web/` has **no ESLint at all** and `tsconfig.json` sets no `noUnusedLocals`. Its *design* is, on the merits, the **best** of fourier's three preview-SVG implementations — and it is the one that was orphaned. |
| **Corpus contradiction** | `lane-frontend.md:444` files PathPreview as *"genuinely bespoke — no flag"*. **Half right, and the half it got right I confirm independently.** No producer analogue exists (receipt in D-5). But a **local** shadow does — `ContourPreview.vue` — and the lane's own shadow table never opened that column. See **D-5**. |

---

## §2 — DEFECTS

### D-1 · BLOCKER · The component is a zero-instance orphan; its sole reference is a born-dead import

`web/src/components/ui/PathPreview.vue` · referrer `web/src/components/visualization/gallery/GalleryCard.vue:10`

`GalleryCard.vue:10` reads `import PathPreview from "@/components/ui/PathPreview.vue";`. The
component name appears **nowhere in that file's template**, nor in any other template in the repo.

**Falsifier (run, failed to falsify).** `grep -rn "<PathPreview\|<path-preview" web/src/` → **0 hits,
exit 1**. The only three `PathPreview` string hits in the whole tree are: the import line, and two
self-references inside the file itself.

**It was born dead.** `git log -S PathPreview` over the two consumers yields three commits:

- `ffeca1b` *feat(web): share tooltip with SVG path preview…* (2026-03-09) — **created** the component
  and its one real renderer, inside `layout/AppHeader.vue`.
- `7721484` *refactor(web): extract ShareButton from AppHeader* — moved the render into
  `layout/ShareButton.vue`.
- `eefa318` *feat(web): add gallery system…* — added the import to `GalleryCard.vue`. Checked:
  `git show eefa318:…/GalleryCard.vue | grep -n PathPreview` → **`7:import …`, and nothing else.**
  The import never had a template usage, not even on the commit that introduced it.

`ShareButton.vue` — the *only* file that ever rendered `<PathPreview>` — was **deleted** at
`a459a56` *feat(web): replace header tabs with navigation dropdown*
(`git log --diff-filter=D -- web/src/components/layout/ShareButton.vue`). `find web/src -name
"ShareButton*"` → empty. From that commit forward the component has had **zero renderers**.

**Why nothing caught it.** Two gates exist (`web/package.json` scripts: `build: "vue-tsc -b && vite
build"`, `test:e2e: "playwright test"`). Neither can see this:

- `find . -maxdepth 2 -name ".eslintrc*" -o -name "eslint.config.*"` (excluding `node_modules`) →
  **empty**. There is no ESLint in this repo, so no `no-unused-vars` / `vue/no-unused-components`.
- `web/tsconfig.json` sets `strict: true` but **not** `noUnusedLocals` / `noUnusedParameters`
  (full file read; the compilerOptions block is 14 keys and contains neither). And even with them,
  `vue-tsc` treats `<script setup>` component imports as template-reachable bindings.

**What I will NOT claim.** This does *not* cost bundle bytes. Rollup drops the unreferenced binding.
**Falsifier run:** `grep -rlo "path-preview" web/dist` → **no files**. The component's scoped class
does not appear in the built output. (Caveat: `web/dist` is dated Jun 12 2026, one commit-month
behind HEAD — so this is *strong* evidence of tree-shaking, not proof at HEAD. Anyone re-running
`npm run build` re-establishes it in one command.) **The cost is audit-truth and maintenance, not
kilobytes** — and the audit-truth cost is exactly what a design challenge is for: *§3's six
superlatives describe pixels no user has seen since `a459a56`.*

**Disposition owed at F.W4** (this is a fork, not a bug-fix): (a) delete the component + the dead
import; or (b) restore a renderer — the share-affordance the component was built for is the obvious
seat, and `GalleryCard`'s `card-image-frame` (`GalleryCard.vue:98`, `aspect-[4/3]`, grid-plate background) is
the seat the import was evidently *reaching* for as a fallback when `thumbnailUrl()` 404s. Option
(b) is the one that makes D-2..D-9 real work; option (a) makes them moot. **Do not close this row by
silently deleting the import** — that would preserve a component with no renderer and no owner.

---

### D-2 · BLOCKER (at remount) · The closing `Z` is unconditional — the preview fabricates a chord the data does not have

`PathPreview.vue:43` — `return \`M${pts.join("L")}Z\`;`

Every path is closed. There is no `closed` prop, no heuristic, no escape hatch. A consumer with an
**open** polyline gets a preview showing a shape that does not exist.

**This is not a hypothetical — the tree itself says the data is not always closed.** The repo's own
canonical renderer for the *identical* `(pathX, pathY)` pair,
`web/src/components/visualization/lib/canvas-drawing/ghost-path.ts:7-13`, takes closure as an
explicit parameter with an explicit default:

```ts
export function drawGhostPath(
    surface: CanvasSurface, view: ViewTransform,
    pathX: number[], pathY: number[],
    closePath = false,          // ← ghost-path.ts:12
): void
```

…documented at `ghost-path.ts:5`: *"@param closePath Whether to close the path (**epicycle mode
closes it**)."* — i.e. closure is **mode-dependent** in this codebase, and the *default is open*.
`ghost-path.ts:27` honours it (`if (closePath) ctx.closePath();`). PathPreview honours nothing.

**Falsifier.** Feed the arity that `ghost-path` defaults to: `pathX=[0,1,2]`, `pathY=[0,1,0]`.
Expected (open) render: a "Λ". Actual: `d="M0.0833,0.9167L0.5000,0.0833L0.9167,0.9167Z"` — a filled-
outline **triangle**. The chord along the bottom is invented. This falsifier is arithmetic, not
visual; it survives without a browser.

**Why BLOCKER and not MAJOR.** The file lives in `components/ui/` — which `DA6-guard-thread-scoping.md:77`
names as a **cross-cutting surface**: *"the shared UI kit (`ui/{CollapsibleSection,PathPreview,SliderControl}.vue`
+ `ui/tooltip/`) … every design agent must account for these where they appear."* A shared-kit
primitive that silently misrepresents its input, with no prop by which a consumer can correct it,
is not a tuning defect — it is a primitive that cannot be trusted. Any F.W4 remount that does not
add `closed?: boolean` (default **false**, matching `ghost-path.ts:12`) re-ships the lie.

---

### D-3 · MAJOR (at remount) · No accessible name, no role, no `aria-hidden` — and the axe keystones are structurally blind to it

`PathPreview.vue:48-61` — the `<svg>` opens with `class`, `:width`, `:height`, `viewBox`,
`preserveAspectRatio`, `fill`, `:stroke`, `:stroke-width`, `stroke-linejoin`, `stroke-linecap`.
**Ten attributes, zero a11y.** No `role`, no `aria-label`, no `aria-hidden`, no `<title>` child.

A bare `<svg>` is mapped by SVG-AAM to `graphics-document`; Chromium exposes it in the a11y tree
**with no accessible name**. For a component that is by construction *either* meaningful (a
thumbnail of the artifact being shared — its original ShareButton seat) *or* decorative (a glyph
beside a label), exactly one of two markings is correct and neither is present:

- meaningful → `role="img"` + `aria-label` (or `<title>`),
- decorative → `aria-hidden="true"`.

**The gates cannot catch this, and that is the sharper half of the finding.** `@axe-core/playwright`
is wired and *hard*: `visualization-crud.spec.ts:85-95` and `visualization-ux.spec.ts:26+` assert
**zero serious/critical violations** at keystone states. But axe's `svg-img-alt` rule fires only on
`svg[role="img"]`. **A bare `<svg>` with no role is not in scope.** So the current markup is
*compliant-by-omission*: adding the correct `role="img"` **without** a name would turn the gate RED,
while omitting the role keeps it green. The gate rewards the less accessible markup.

**Falsifier.** Add `role="img"` to line 49 and re-run the axe keystone with the component mounted →
`svg-img-alt` (serious) fires. Remove it → green. If instead axe flagged the bare `<svg>` today,
this row dies.

**Systemic, not solo — read the denominator before assigning blame.** House survey over the whole
tree: `grep -rn "<svg" web/src --include="*.vue"` → **17 occurrences across 12 files**; of those,
**exactly one** carries `aria-hidden="true"` (`decorative/SvgFilters.vue:64`), **zero** carry
`role="img"`, **zero** carry a `<title>`. PathPreview is 1-of-16 offenders, not an outlier. Route
the *class* to F.W4 (an SVG a11y sweep over 12 files) and the *instance* to whatever disposition
D-1 receives.

---

### D-4 · MAJOR (at remount) · The stroke-scaling law is CSS-fragile — and disagrees with both of its siblings

`PathPreview.vue:56` — `:stroke-width="strokeWidth / size"`

With `viewBox="0 0 1 1"` and `width=height=size`, one user unit maps to `size` device px, so
`strokeWidth/size` user units renders as exactly `strokeWidth` px. **The arithmetic is right.** It is
right *only while the `width`/`height` presentation attributes actually govern the rendered box* —
and presentation attributes are the **lowest-priority** source in the CSS cascade. Any consumer
stylesheet that sizes the element overrides them, and the compensation silently inverts.

**Falsifier (arithmetic, no browser).** Place `<PathPreview :size="64" class="w-full" />` in a 200px
column. Tailwind's `.w-full { width: 100% }` beats the `width="64"` attribute; the SVG paints at
200px; the viewBox still spans 1 unit, so the scale is now 200 px/unit and `stroke-width="0.0234"`
renders **4.69 px**, not 1.5. A **3.1× stroke-weight error**, silent, with no console warning.

**The tree already contains the immune idiom, in the sibling next door.**
`visualization/ContourPreview.vue:47` uses `vector-effect="non-scaling-stroke"` with a plain
`stroke-width="2"` — device-px-locked and **cascade-proof**, because the vector-effect is applied
after the viewport transform. `ContourPreview.vue:56-60` proves why it needs to be: its scoped style
sets `width: 160px; height: 160px` on the SVG, i.e. this repo *does* size preview SVGs from CSS.

**Three siblings, three incompatible stroke laws** — this is the design-system incoherence, not the
single line:

| file:line | stroke law | behaviour as the box grows | CSS-safe? |
|---|---|---|---|
| `ui/PathPreview.vue:56` | `strokeWidth / size` (user units, compensated) | constant px **until CSS resizes it**, then wrong | ✗ |
| `visualization/EasingCurvePreview.vue:29` | `stroke-width="0.15"` (raw user units) | **scales** with the box — constant *relative* weight | ✓ (by accident) |
| `visualization/ContourPreview.vue:46-47` | `stroke-width="2"` + `vector-effect="non-scaling-stroke"` | constant px, always | ✓ (by design) |

None of the three is absolutely wrong; a preview family with **three** of them is. PathPreview's
choice (constant device px) is the defensible default for a small thumbnail — it is the *mechanism*
that is wrong. **Cure:** `stroke-width="1.5"` + `vector-effect="non-scaling-stroke"`, deleting the
`/ size` arithmetic and the coupling between two otherwise-independent props.

---

### D-5 · MAJOR · A **local** shadow exists — `ContourPreview.vue`. *(Explicit contradiction of `lane-frontend.md:444`)*

`lane-frontend.md:444` files the component as `| components/ui/PathPreview.vue | 69 | *(none)* |
genuinely bespoke — no flag |`, in the **CANDIDATE SHADOWS** table whose column header is
*"Unimported producer subpath"*. `lane-frontend.md:369` repeats it: *"Bespoke with no glass-ui
analogue."*

**On the producer axis the lane is CORRECT, and I confirm it independently rather than inheriting
it.** Producer `glass-ui@7.0.0` export map, read from `/Users/mkbabb/Programming/glass-ui/package.json`
(63 subpaths): `. ./tokens ./forms ./dark ./keyboard ./carousel ./motion ./motion-core ./sidebar
./infinite-scroll ./axes ./blob-config ./color ./dom ./reactive ./canvas ./fourier-math ./aurora
./badge ./blob ./button ./card ./chip ./collapsible ./command ./configurator ./constellation
./dark-mode-toggle ./data-table ./deck ./dialog ./dock ./dropdown-menu ./easing
./expandable-container ./fading-scroll ./fourier-field ./handmark ./label ./labeled-field ./metric
./music-staff ./number-field ./pager-dots ./popover ./progress ./scroll-progress-rim ./search
./select ./separator ./slider ./sortable-list ./status-dot ./surface ./switch ./tabs ./timeline
./toast ./toggle-group ./tooltip ./typewriter ./watercolor-dot ./styles …` — **no
path-thumbnail / sparkline / polyline-fit primitive at 7.0.0 either.** The one 7.0.0 addition that
could plausibly host an arbitrary path, `./handmark`, I opened and **rejected**: its README declares
*"the platform's ONE hand voice… lays a hand-drawn mark — an underline, a circle around a datum, a
strike, a highlight band, a box, a bracket, or an arbitrary path"* over a five-layer
geometry/ink/grain/animation/surface stack (`glass-ui/src/components/handmark/README.md`). It is a
hand-voice **annotation** family with deliberate wobble; it has no fit/normalize transform and would
*add* jitter to a data thumbnail. Not a substitute. **So "no producer analogue" stands — twice
measured, once at 4.0.0 by the lane, once at 7.0.0 here.**

**On the local axis the lane's table has no column, and that is where the shadow is.**
`web/src/components/visualization/ContourPreview.vue` (59 lines) does **the same job**: take a
contour, derive its bounding box, fit it into a preview SVG, stroke it. Two independent
implementations of one primitive, agreeing on nothing:

| decision | `PathPreview.vue` | `ContourPreview.vue` |
|---|---|---|
| input | `pathX: number[]` + `pathY: number[]` (:6-7) | `points: Point2D[] \| undefined` (:7) |
| bbox | 4× variadic `Math.min/max(...)` (:25-28) | single linear scan (:19-25) |
| fit | normalize coords into a fixed `0 0 1 1` viewBox (:33-40) | leave coords alone, **compute the viewBox** around them (:26-28) |
| Y-flip | arithmetic, `0.5 - (y-cy)*scale` (:39) | `transform="scale(1,-1)"` + a negated viewBox (:41, :28) |
| padding | `1/(range*(1+2p))`, p=0.1 (:33) | `pad = (maxX-minX)*0.1`, **applied to both axes** (:26, :28) |
| stroke | `strokeWidth/size` user units (:56) | `stroke-width="2"` + `non-scaling-stroke` (:46-47) |
| colour | **`currentColor`** (:16) | hard-coded `hsl(40 90% 55% / 0.85)` (:45) |
| closure | unconditional `Z` (:43) | `closedSplinePath()` — closure named in the function (:13) |
| curve | polyline (`L`) | spline |

**ContourPreview carries a bug PathPreview does not.** `ContourPreview.vue:26` computes
`const pad = (maxX - minX) * 0.1` — an **X-range-derived** pad — and `:28` then applies it to the Y
extent too. For a 10:1-wide contour the vertical padding is 10× the horizontal; for a tall-thin one
it collapses toward zero. PathPreview's `Math.max(rangeX, rangeY)` (`:33`) is isotropic and correct
(see S-2). **On six of the nine rows above PathPreview is the better implementation, and PathPreview
is the one that got orphaned.**

**Falsifier for the whole row.** If `ContourPreview.vue` did *not* fit-and-stroke a contour into a
preview SVG, there is no local shadow and this row dies. Read `:16-29` and `:36-50`: it does.

**Disposition → F.W3/F.W4** (the census's F.W3 is *"shadow retirement"*; this row belongs there and
is currently unbudgeted): pick one primitive — **PathPreview's normalize-into-a-unit-viewBox model
is the one to keep**, because a fixed viewBox composes with CSS sizing while a data-derived viewBox
does not — port ContourPreview's `non-scaling-stroke` and spline path into it, retire the duplicate,
and *then* apply D-2/D-3. Note the interaction with F.W1: `./easing` at 7.0.0 retires the *third*
family member (`EasingCurvePreview.vue`, the census's *"forbidden fourth fork"*,
`CENSUS-2026-08-03.md:95-96`), so after the uplift there are two, not three — which makes this
convergence cheaper, not more expensive.

---

### D-6 · MINOR · `padding` is off by a sixth from its own name, and is unvalidated into a NaN path

`PathPreview.vue:11` (prop), `:17` (default `0.1`), `:33` (use), `:32` (comment
*"Fit into [0, 1] with uniform scale + padding"*).

`scale = 1 / (max(rangeX,rangeY) * (1 + padding*2))`. The dominant axis therefore spans
`1/(1+2p)` of the box, centred at 0.5. At the default `p = 0.1` that is `1/1.2 = 0.8333` → the glyph
occupies **[0.0833, 0.9167]**, i.e. an **8.33 %** margin per side, not 10 %. The prop reads as a
fraction of the *viewBox*; it is in fact a fraction of the *pre-scaled path extent*, which is a
different denominator.

**Falsifier.** `pathX=[0,10], pathY=[0,0], padding=0.1` → `scale = 1/(10*1.2)`, `cx=5` →
`sx ∈ {0.0833, 0.9167}`. If the intended semantic held, it would be `{0.1, 0.9}`.
**Cure (one line):** `const scale = (1 - 2*padding) / Math.max(rangeX, rangeY)`.

**Unvalidated, with a hard edge.** `padding = -0.5` → `1 + 2p = 0` → `scale = Infinity`. Then at any
sample where `x === cx`, `(x-cx)*scale = 0 * Infinity = NaN` → `NaN.toFixed(4)` → `"NaN"` → the
emitted `d` is `"MNaN,NaN…"`. An invalid path data string renders **nothing** and Chromium logs
`Error: <path> attribute d: Expected number`. `padding` has no `min` guard and, unlike a runtime
value, `-0.5` is a perfectly legal `number` to `vue-tsc`. Same class at `padding = -0.6` (negative
scale, mirrored render). **Aristotelian note:** 8.33 % is, visually, a *good* margin for a
thumbnail — the mean between a glyph that kisses the frame and one that floats. The defect is that
the number in the source and the number on the screen are different numbers, so the next person to
tune it tunes blind.

---

### D-7 · MINOR · No decimation — 1024 segments are drawn into a ~53 px glyph

`PathPreview.vue:37-41` maps **every** input sample to a vertex; `:42` joins them all with `L`.

fourier's contour default is `n_points: 1024` (`web/src/lib/defaults.ts:8`; echoed as the fallback
at `composables/useWorkspaceLoader.ts:19,68` — `?? 1024`). At `size = 64` and the D-6 fit, the glyph
spans `0.8333 × 64 ≈ 53 px`. So **1024 line segments are laid across ~53 addressable device
positions** — roughly **19 segments per pixel column**, before DPR.

Design cost, in order of confidence:

1. **Certain, arithmetic:** the `d` attribute is `1 + 1024 × ~14 chars ≈ 14 KB` of string, rebuilt
   whenever any prop changes (it is one `computed`, so it is at least memoized — credit where due).
2. **UNPROVEN-NEEDS-LIVE (SS-13):** with `stroke-linejoin="round"` (`:57`) and a 1.5 px stroke,
   sub-pixel-spaced vertices stack round joins on top of each other. In high-curvature regions the
   overlapping joins read as a **blob** rather than a line — the thumbnail loses exactly the
   silhouette detail it exists to convey. *Falsifier:* render the same contour at 1024 points and
   Ramer–Douglas–Peucker-decimated to ~120 and diff the rasters at 64 px; if they are
   perceptually identical, this sub-claim dies (the string-size half at (1) survives regardless).

**Cure:** decimate to the device budget (`~2 × size` points is generous) before emitting. This is a
*design* fix, not a perf one — a thumbnail's job is legibility at its own size.

---

### D-8 · MINOR · Violates a codified in-tree invariant — the sole violator, with its own shadow complying

`PathPreview.vue:25-28`:

```ts
const minX = Math.min(...pathX);   const maxX = Math.max(...pathX);
const minY = Math.min(...pathY);   const maxY = Math.max(...pathY);
```

Four variadic spreads. `web/src/components/visualization/composables/useViewTransform.ts:15-22`
carries the repo's own written law, naming this exact anti-pattern, over these exact arrays:

> `// ── Memoized data bounding box (Invariant 20) ──`
> `// The variadic Math.min(...xs) / Math.max(...xs) spread allocates an`
> `// arguments array of length n_points; at n=1024 that's four allocations of`
> `// ~1k elements every rAF, and at n≈10k the spread approaches V8's argument`
> `// count ceiling.`

…and `:35` states the cure it adopted: `// Single linear scan — no variadic spread, no arguments
array.` `ContourPreview.vue:19-25` independently uses the linear scan too. **PathPreview is the only
file in the preview family that does the thing its own repo wrote an invariant against.**

**Falsifier.** Pass a 200 000-point path (well inside what a high-`n_points` contour or a stitched
multi-contour trace can reach). `Math.min(...arr)` throws `RangeError: Maximum call stack size
exceeded` before a single pixel is drawn — the component does not degrade, it **throws**, taking its
parent's render with it. If V8 raised the argument ceiling above that, the row's *hard* half dies;
the invariant-violation half does not.

**Why this is on the DESIGN axis and not just L/C.** State coverage is a design property: *"what does
this surface show under the states it can actually receive."* Under large-N this surface shows a
crash. Cross-route the mechanical half to the L axis; the state-coverage half is filed here.

---

### D-9 · MINOR · Empty state is a silent hole — no placeholder, no skeleton, not even hidden

`PathPreview.vue:23` (`if (!pathX.length || !pathY.length) return "";`) and `:60`
(`<path v-if="svgPath" :d="svgPath" />`).

On empty input the `<svg>` still renders — `:width="size" :height="size"` — and reserves a full
`size × size` box containing **nothing**. Three consequences, all design:

- The layout **does not collapse**, so a grid of previews shows a hole exactly where a glyph should
  be, with no signal distinguishing *"no data"* from *"data failed to load"* from *"data is a
  degenerate point"*.
- There is no loading affordance. Contour data is fetched (`lib/api.ts`), so the *empty* and the
  *pending* states are the same pixels.
- The empty `<svg>` is still exposed to AT as an unnamed graphic (D-3) — the one case where
  `aria-hidden="true"` is unambiguously right, and it is absent.

**Falsifier.** `pathX=[]` → `:23` returns `""` → `:60`'s `v-if` is false → `<svg width="64"
height="64">` with zero children. Confirmed by reading, not inferred.

**Compare the house standard**, which is higher: `GalleryCard.vue:98-107` gives its thumbnail a
`card-image-frame` — an `aspect-[4/3]` plate with a 16 px `--foreground`-4 % grid background
(`GalleryCard.vue` scoped style, `.card-image-frame`) — so a missing image degrades to a *deliberate
empty frame*, not a void. PathPreview, in the same kit, has no such floor. (This is also the seat
D-1's option (b) should reach for.)

---

### D-10 · INFO · `preserveAspectRatio="xMidYMid meet"` is inert

`PathPreview.vue:53`. The viewBox is `0 0 1 1` (square) and the viewport is `size × size` (square),
so the aspect ratios are equal and `meet` has nothing to do — no letterbox, no scale change.
`xMidYMid meet` is also the SVG default, so the attribute is doubly redundant. It becomes
load-bearing **only** in the CSS-override scenario D-4 already condemns; keeping it is harmless
insurance, but it is presently three attributes' worth of noise implying a flexibility the
`strokeWidth / size` arithmetic on `:56` actively contradicts. *Falsifier:* delete it and the
rendered output at any square `size` is byte-identical.

### D-11 · INFO · `size = 0` emits `stroke-width="Infinity"`

`PathPreview.vue:56` — `strokeWidth / size` with `size = 0` yields `Infinity`, serialized into the
attribute. `size` is typed `number` with no `min`, so `0` is a legal call. Invalid attribute value;
the browser falls back to `1` (the SVG initial value) and paints a 0×0 box, so nothing catastrophic
occurs — but the failure is silent and the attribute is malformed. Low reachability (no consumer),
hence INFO. *Falsifier:* `:size="0"` → inspect the rendered attribute.

### D-12 · INFO · `toFixed(4)` is ~10× past the device-pixel floor · and the F.W1 break surface is the referrer's, not this file's

**(a) Precision.** `PathPreview.vue:40` formats normalized coordinates to 4 decimals. `1e-4` of the
viewBox is `0.0064 px` at `size = 64`, or `0.019 px` at 3× DPR — an order of magnitude below
anything addressable. Three decimals (`0.064 px`) already over-resolves. On a 1024-point path
(D-7) the surplus digit costs ~2 KB of string per render for zero visible difference.

**(b) F.W1 break surface — recorded here so the ledger is complete.** Against the census break
surface (`CENSUS-2026-08-03.md:102-105`: `metric-badge` ×7 files, `hover-card` ×2, `hover-popover`
×2, `DockIconButton` ×2, `DockDropdownTrigger` ×1, `ToastVariant` definition-absent,
`lucide-vue-next → @lucide/vue` ×35, pencil-boil `0.4.1 → ^0.11.2`), **`PathPreview.vue` scores
zero on every row** — see S-5 for the receipt. Its *referrer* does not: `GalleryCard.vue:11-17`
imports five icons from `lucide-vue-next` (`Eye`, `Heart`, `Crown`, `Bookmark`, `Trash2`) → one of
the 35 rename sites; and `GalleryCard.vue:3-5` imports `Button` (`./button`), `Badge` (`./badge`)
and `Checkbox` (**root barrel** — the one deep-import inconsistency in that file, since `./button`
and `./badge` are subpath-imported two lines above). None of the four *removed* subpaths appear
there, so `GalleryCard` is a rename-only site. **Filed under PathPreview only because D-1 makes
`GalleryCard.vue:10` this component's sole live coordinate** — the substantive review of that file
belongs to its own challenge.

---

## §3 — SUPERLATIVES *(L-18 runs both ways — each carries its own falsifier)*

### S-1 · `currentColor` — the only theme-correct member of the preview family, and structurally immune to a WCAG tax this repo has already paid

`PathPreview.vue:16` — `strokeColor: "currentColor"`. The glyph inherits the ambient `color`, so it
is automatically correct in **both** themes at **every** placement, with no token to keep in sync.
Its two siblings hard-code:

- `EasingCurvePreview.vue:12` — `color: "hsl(248 88% 71%)"`
- `ContourPreview.vue:45` — `stroke="hsl(40 90% 55% / 0.85)"`

**The repo has already been billed for exactly this class of mistake.** `web/src/style.css:113-127`
carries a standing override with the receipt in its own comment:

> *"D.W4.d — light-mode `--viz-amber` darken (axe contrast carry). glass-ui ships light `--viz-amber`
> at `hsl(35 70% 42%)` ≈ 3.54:1 against `--background` — fails WCAG AA for normal text. The override
> darkens to `hsl(35 76% 35%)` ≈ 4.6:1 (clears AA)."*

`ContourPreview`'s `hsl(40 90% 55% / 0.85)` is the same amber neighbourhood, lighter, and further
diluted by 15 % alpha — a WCAG 1.4.11 (non-text contrast, 3:1) exposure on a light background, and a
maintenance liability the moment the theme moves. **PathPreview cannot acquire that defect**, because
it has no colour of its own to go stale. *Falsifier:* if `currentColor` failed to inherit — it does
not; it resolves against the computed `color` of the nearest ancestor per CSS Color 3 — or if the
component pinned a fallback anywhere, this row dies. `grep -n "hsl\|rgb\|oklch\|#" PathPreview.vue`
→ **0 hits.**

### S-2 · Isotropic fit — `Math.max(rangeX, rangeY)` — the one thing its shadow got wrong

`PathPreview.vue:33` uses a **single** scale derived from the larger range, so a 10:1 contour renders
10:1. The naive per-axis fit (`sx` by `rangeX`, `sy` by `rangeY`) would squash every shape to the
frame and destroy the silhouette — which is the entire information content of a path thumbnail.
`ContourPreview.vue:26,28` demonstrates the failure mode from the other side: an X-derived pad
applied to both axes, so its padding is anisotropic even though its fit is not (D-5). *Falsifier:*
`pathX=[0,10], pathY=[0,1]` → `scale = 1/12` for both axes; `sy` spans `1/12 = 0.083` of the box
against `sx`'s `0.833`. Aspect preserved exactly.

### S-3 · Arithmetic Y-flip, not a transform — the legible choice

`PathPreview.vue:39` — `const sy = 0.5 - (pathY[i] - cy) * scale; // flip Y`. One subtraction, one
comment, done in the same expression that does the fit. The alternative in the tree,
`ContourPreview.vue:41` (`<g transform="scale(1,-1)">`), forces a **negated viewBox** at `:28`
(`${-(maxY + pad)}`) that needs its own explanatory comment at `:27` (*"Flip Y: SVG viewBox uses
negative Y since we scale(1,-1) inside"*), and would additionally invert any non-uniform scale
applied later. PathPreview's version is the one a reader can verify in one glance. *Falsifier:* if
the flip were wrong, a monotonically-increasing `pathY` would render downward; substitute `y = cy +
r` → `sy = 0.5 - r*scale` → up. Correct.

### S-4 · Two CSS declarations, both load-bearing, zero spacing opinion — the Aristotelian mean for a leaf primitive

`PathPreview.vue:65-68` — the entire stylesheet is `display: block; flex-shrink: 0;`.

- **No margin, no padding.** A leaf primitive that owns outer spacing leaks into every parent's
  rhythm; one that owns none composes everywhere. This one owns none. (Contrast
  `ContourPreview.vue:33` — `<div class="cartoon-card px-3 py-2">` — a *preview* that ships a card
  chrome and its padding, and is therefore un-embeddable.)
- **`display: block` is not cosmetic:** an inline SVG sits on the text baseline and drags a
  descender gap (~4 px at 16 px/1.5) beneath it. *Falsifier:* remove it and the component gains
  phantom bottom space in any text-flow parent.
- **`flex-shrink: 0` is not cosmetic either:** the `width` attribute is not a `min-width`, so a flex
  row would compress the square non-uniformly. *Falsifier:* remove it, put the component in a
  `flex` row narrower than `size`, and the thumbnail deforms.

Two declarations, neither removable, none decorative. This is the mean between *"no layout opinion at
all"* (broken in flow and in flex) and *"opinionated chrome"* (un-embeddable). `EasingCurvePreview.vue:37-40`
carries the byte-identical pair — evidence the idiom is the house standard and PathPreview holds it.

### S-5 · Uplift-inert — a **zero-line** diff under the F.W1 atomic tri-package transaction

The census's §5 risk 1 (`CENSUS-2026-08-03.md:218-221`) makes glass 4→7 ∧ keyframes 4.3→6 ∧ value
0.13→4.0 one indivisible transaction that *"Nothing in the commission's frontend goal can start
until it lands."* Against its measured break surface, PathPreview scores nil on every axis, and the
receipt is a single grep of a 69-line file:

| break-surface row (census :102-105) | PathPreview |
|---|---|
| `metric-badge` (×7 files) | 0 |
| `hover-card` / `hover-popover` (×4) | 0 |
| `DockIconButton` / `DockDropdownTrigger` (×3) | 0 |
| `ToastVariant` (hard typecheck break) | 0 |
| `lucide-vue-next → @lucide/vue` (×35 sites) | 0 |
| pencil-boil `0.4.1 → ^0.11.2` | 0 |
| any `@mkbabb/glass-ui` specifier at all | 0 |

*Falsifier:* `grep -n "glass-ui\|lucide\|pencil-boil\|keyframes\|@mkbabb" web/src/components/ui/PathPreview.vue`
→ **0 hits.** Its only import is `{ computed } from "vue"` (`:2`). Of the ≈51 files carrying live
glass-ui specifiers (`CENSUS-2026-08-03.md:59-62`, C-3), this is one of the handful F.W1 need not
open. **And the uplift is a net *improvement* for the family it belongs to**: 7.0.0's new `./easing`
subpath retires `EasingCurvePreview.vue` (the census's *"forbidden fourth fork"*, `:95-96`), taking
one of the three competing stroke laws (D-4) off the board for free.

### S-6 · The degenerate single-point case renders a dot instead of crashing — the `|| 1` guards are deliberate and correct

`PathPreview.vue:29-30` — `const rangeX = maxX - minX || 1;` (and the Y twin). With `pathX=[5],
pathY=[5]` both ranges are `0`, the guards substitute `1`, `scale = 1/1.2` stays finite,
`cx = cy = 5`, and the emitted path is `d="M0.5000,0.5000Z"`. A zero-length subpath with
`stroke-linecap="round"` (`:58`) paints a filled dot of the stroke diameter per SVG 1.1 §11.4 —
i.e. **a single-point path renders as a single point**, which is the correct answer.

*Falsifier (what the guards are worth):* delete them → `scale = 1/(0 * 1.2) = Infinity` →
`(x - cx) * scale = 0 * Infinity = NaN` → `d="MNaN,NaN Z"` → invalid path, nothing renders, console
error. The two `|| 1`s are the difference between a dot and a broken path. Note the asymmetry with
D-6: this component guards a degenerate *input* rigorously and a degenerate *prop* not at all.

---

## §4 — Checked and NOT filed as defects *(so the next reader does not re-derive them)*

- **`prefers-reduced-motion` — vacuously satisfied, correctly.** The component has **zero** motion:
  no `transition`, no `animation`, no `@keyframes`, no `useTransition` (`grep -n
  "transition\|animation\|@keyframes"` over the file → 0 hits). Its absence from `lane-frontend.md:619`'s
  8-block reduced-motion inventory is therefore **correct, not a gap** — there is nothing to gate.
  A static thumbnail that swaps instantly on data change is the right behaviour; animating a
  silhouette morph would be motion for its own sake. *Falsifier:* if any ancestor animated it via a
  `:deep()` rule the row would reopen; `grep -rn "path-preview" web/src` → the class appears only in
  its own scoped block.
- **`fill="none"` (`:54`) is right**, not an omission. A closed contour filled would read as a
  silhouette blob at 64 px and lose all interior structure; the outline is the information.
- **The single `computed` (`:21-44`) is correctly memoized** — re-evaluates only when `pathX`,
  `pathY` or `padding` change identity, not on parent re-render. Compare the invariant it *does*
  violate (D-8): `useViewTransform.ts:23` reaches for the same tool for the same reason.
- **`viewBox="0 0 1 1"` + normalize-into-it (rather than a data-derived viewBox)** is the composable
  choice and should be the surviving model in the D-5 convergence: a fixed viewBox is invariant
  under CSS sizing, a data-derived one is not.

---

## §5 — Routing

| row | severity | owning wave | note |
|---|---|---|---|
| D-1 | BLOCKER | **F.W4** (with an F.W0 flag) | delete-or-restore fork; F.W0's re-ground should record it since the referrer sits in the frozen 28-path tree's neighbourhood |
| D-2 | BLOCKER (at remount) | F.W4 | add `closed?: boolean` defaulting **false**, per `ghost-path.ts:12` |
| D-3 | MAJOR | F.W4 | instance + the 12-file SVG a11y sweep; the axe keystones are blind here by rule scope |
| D-4 | MAJOR | F.W3 / F.W4 | one stroke law for the family; `non-scaling-stroke` is the in-tree answer |
| D-5 | MAJOR | **F.W3** | **currently unbudgeted** — the census's shadow ledger has no local-duplicate column |
| D-6, D-7, D-9 | MINOR | F.W4 | fit semantics, decimation, empty/loading floor |
| D-8 | MINOR | F.W4 (+ L axis) | Invariant 20 compliance |
| D-10..D-12 | INFO | F.W4 | cleanup; D-12b is `GalleryCard`'s row, recorded not claimed |
| S-1..S-6 | — | — | **preserve through any refactor.** S-1 (`currentColor`), S-2 (isotropic fit) and S-4 (zero-spacing leaf) are the properties the D-5 convergence must carry *into* the surviving primitive, not away from it |

---

## §6 — Corpus reconciliation (explicit)

| # | subject | hitherto corpus | this challenge | resolution |
|---|---|---|---|---|
| 1 | PathPreview shadow status | `lane-frontend.md:444` — *"genuinely bespoke — no flag"*; `:369` *"no glass-ui analogue"* | producer-axis **AGREE** (independently re-measured at 7.0.0, 63 subpaths, `./handmark` opened and rejected); local-axis **CONTRADICT** | **PARTIAL CONTRADICTION.** The lane's table has only an *"Unimported producer subpath"* column, so a local duplicate could not be expressed in it. `ContourPreview.vue` is one. → F.W3, unbudgeted (D-5) |
| 2 | PathPreview LOC = 69 | `lane-frontend.md:183,444` | `wc -l` → 69 | **AGREE, exact** |
| 3 | `components/ui/` inventory | `lane-frontend.md:181-185` — 5 files, 3 glass wrappers + PathPreview + a barrel; `:371` *"keep"* | `ls web/src/components/ui/` → `CollapsibleSection.vue  PathPreview.vue  SliderControl.vue  tooltip/` | **AGREE** on membership. The `:371` *"keep"* verdict is scoped to the **three thin adapters**; it does not cover PathPreview, whose disposition (D-1) is genuinely open |
| 4 | `components/ui/` is a cross-cutting design surface | `DA6-guard-thread-scoping.md:77` (fourier's own D-audit) — *"the shared UI kit … every design agent must account for these"* | names `PathPreview` explicitly | **ADOPTED** — this is the authority making D-2's severity BLOCKER rather than MAJOR |
| 5 | reduced-motion inventory (8 CSS blocks) | `lane-frontend.md:619` — PathPreview absent | 0 motion in the file | **AGREE, and the absence is correct** (§4) |
| 6 | SVG-surface inventory | `lane-frontend.md:565` lists `ui/PathPreview.vue`, `ContourPreview.vue`, `EasingCurvePreview.vue` as three separate SVG surfaces | all three implement one primitive with three incompatible stroke laws and three colour laws | **EXTENDS the lane** — it enumerated them; it did not compare them (D-4, D-5) |
| 7 | dead devDeps / vestigial shadcn | `lane-frontend.md:70` — CVA, clsx, tailwind-merge, reka-ui at 0 import sites | `web/package.json` devDeps still list all four | **AGREE, unchanged at HEAD.** Adjacent, not this component's row |
| 8 | frontend gates | `CENSUS-2026-08-03.md:114` — *"vitest ABSENT … only gates are `vue-tsc` + 29 Playwright tests"* | `web/package.json` scripts = `dev/build/preview/test:e2e/test:e2e:ui`; `build = "vue-tsc -b && vite build"`; **no ESLint config anywhere** | **AGREE, and SHARPENED**: the census says *no unit tests*; the stronger fact is *no linter either*, which is precisely why D-1's dead import survived four months and two refactors |
| 9 | `GalleryCard` in the Codex corpus | `lane-fourier-r3-r6.md:86` (R3-12, ADOPT-AS-FACT) — `GalleryCard` `basisLabels` is one of 7 duplicated open-family rows collapsing 35→28 | `GalleryCard.vue:36-51` is that `basisLabels` computed; PathPreview is a **separate** import in the same file | **NO CONFLICT** — disjoint findings in one file. Recorded so F.W4 does not double-count `GalleryCard`'s rows |
| 10 | substrate freshness | `lane-fourier-r3-r6.md:107` (R4-9) — the audited tree is byte-identical to the tree F.W0 opens on | `PathPreview.vue` is clean (not among the 28 dirty paths) | **AGREE** — this challenge is not stale-at-HEAD |

---

## §7 — Method and limits

- **Read-only** in `/Users/mkbabb/Programming/fourier-analysis` and `/Users/mkbabb/Programming/glass-ui`.
  No product source was written in any repo. **This file is the only write.**
- **Read whole:** `web/src/components/ui/PathPreview.vue` (69); its only import (`vue`); its only
  referrer `web/src/components/visualization/gallery/GalleryCard.vue` (whole, incl. the scoped
  style block); `web/src/components/visualization/ContourPreview.vue` (59);
  `web/src/components/visualization/EasingCurvePreview.vue` (39); `web/src/lib/canvas-drawing/
  ghost-path.ts:1-40`; `web/src/components/visualization/composables/useViewTransform.ts:1-45`;
  `web/tsconfig.json`; `web/package.json`; `web/src/style.css:55-130`; `glass-ui/package.json`
  exports; `glass-ui/src/components/handmark/README.md:1-60`.
- **Evidence commands:** `grep` / `git log -S` / `git log --diff-filter=D` / `git show <sha>:<path>` /
  `git status --porcelain` / `find` / `ls` / `wc` / `node -e` over `package.json`. No browser, no
  Playwright, no DevTools.
- **UNPROVEN-NEEDS-LIVE (SS-13), 2 claims, both isolated and both non-load-bearing:** D-7's
  round-join blob-up at 1024 points (its string-size half is arithmetic and stands independently);
  and D-3's precise AT exposure of a bare `<svg>` (the *rule-scope* half — that axe's `svg-img-alt`
  cannot fire without `role="img"` — is a documented rule definition, not a live observation, and
  stands).
- **Disclosed weakness in D-1's bundle sub-claim:** `web/dist` is dated 2026-06-12, one commit-month
  behind HEAD `cd26c65`. The tree-shaking evidence is therefore strong-but-stale; a single
  `npm run build` at HEAD settles it either way. I state it as a *limit* rather than dropping the
  sub-claim, because it is the sub-claim that keeps me from over-charging D-1.
