claude-opus-5[1m] (served model id)

# CHALLENGE — `FourierShapeExtractor.vue` · axis **L (LIBRARY)**

**Subject** `fourier-analysis/web/src/components/morph/FourierShapeExtractor.vue` (191 lines, tracked, clean at HEAD).
**Substrate pin** fourier HEAD `cd26c6533adc32dfe1453d74117d3cb73b89ea16` — byte-identical to the tree the
intake lane adjudicated (`lane-fourier-r3-r6.md` §0: "Nothing here is STALE-AT-HEAD"). Component and
`lib/svg-contours.ts` both clean (`git status --porcelain` → empty for both paths).

**Method.** Static + source-derived only; no browser. I read the component whole and every file it
imports (`vue`; `@mkbabb/glass-ui/button` → `dist/button-BNDWhAZb.js` cva; `@mkbabb/pencil-boil` →
`src/{index,celestial,random}.ts`; `@/lib/svg-contours` whole), then followed the artifact chain the
component exists to feed (`scripts/precompute_svg_fourier.py` → `web/src/assets/fourier-paths/{sun,moon}.json`
→ `DarkModeToggle.vue` + `FourierMorphDemo.vue`). Three checks are *executed measurements*, not
readings, and are labelled as such: (a) a Node re-derivation of pencil-boil 0.4.1's `mulberry32`
stream against the on-disk `scripts/raw-contours.json`; (b) bounding-box arithmetic over the shipped
JSON assets vs. the extractor's own contours; (c) PNG-header + visual reading of the checked-in
J-tranche baseline captures. No product source was modified in any repo. This file is my only write.

**Posture.** Assumed DEFECTIVE until the tree proved otherwise. It is defective — but not in the way
five prior audits recorded. Every prior pass (M-deep-audit `SE-02..SE-14`, D-audit `DA-design` row 5,
`r2-fourier-A-refinement` BW-9, M-critique `B7-12`) graded this file as *cosmetic debt on a dev-only
page*. That framing is wrong, and the tree says so: this component is the **sole tracked half of the
build-time generator for the site-wide dark-mode toggle's geometry**, and the generator has silently
diverged from the artifact it generates.

**Where it sits on the viz render path.** Census §3a [FE §6] / `lane-frontend.md:514`: *"Canvas2D
throughout. WebGL/WebGPU: ABSENT … Three independent canvases + a 12-file SVG surface."* This
component is one of those twelve (`lane-frontend.md:564-565`, `morph/{FourierShapeExtractor, …}`). It
touches the viz path **not** through canvas or WebGL but through the DOM SVG geometry API
(`SVGGeometryElement.getPointAtLength`, `SVGPointList`) in `lib/svg-contours.ts` (58 lines,
`lane-frontend.md:190`) — the only contour extractor in the frontend, with exactly one consumer
(corroborated by fourier's own `b-precepts-compliance.md:318`: *"1 · keep-current"*).

**Tally** — 20 findings: **3 BLOCKER · 7 MAJOR · 6 MINOR · 4 INFO**, plus **5 superlatives** (L-18
runs both ways).

---

## §0 — The chain, established first (everything below hangs on it)

```
FourierShapeExtractor.vue          (TRACKED, ships in prod bundle)
  ├─ renders 16 SVG geometry elements (8 sun / 8 moon), 0 v-for
  ├─ extractContours(svg, 128)  →  lib/svg-contours.ts
  └─ JSON  →  <pre id="output">  +  window.__fourierShapeData
                    ↓  (manual copy — no tooling)
       scripts/raw-contours.json         (UNTRACKED — .gitignore:53 `scripts/*`)
                    ↓
       scripts/precompute_svg_fourier.py (UNTRACKED — .gitignore:53)
                    ↓
       web/src/assets/fourier-paths/{sun,moon}.json   (TRACKED, 220 KB each)
                    ↓
       DarkModeToggle.vue:23-27  ← site-wide header control, EVERY page
       FourierMorphDemo.vue:95-100 ← /morph
```

Verification of each edge: `precompute_svg_fourier.py:4-19` names this component as its input source
by name; `:116` reads `scripts/raw-contours.json`; `:125,145` writes the two assets;
`DarkModeToggle.vue:23-27` and `FourierMorphDemo.vue:95-100` import them. `git check-ignore -v
scripts/precompute_svg_fourier.py scripts/raw-contours.json` → `.gitignore:53 scripts/*` for both.

**Consequence for the axis**: this is not a demo page. It is a code generator whose product is
rendered on every route of the site. Judge it as one.

---

## §1 — BLOCKERS

### L-B1 · BLOCKER — The generator has diverged from the artifact it generates; re-running it regresses shipped UI

**Provenance** `FourierShapeExtractor.vue:97-119` (moon stars + dots) · commit `9e5ba74` (2026-03-16)
· `web/src/assets/fourier-paths/moon.json`.

Commit `9e5ba74`'s own message states the product decision verbatim:

> *"Day/night toggle: **remove stars from moon SVG contour**, cap sun/moon at 50 harmonics, simplify
> DarkModeToggle (no special idle level needed)"*

`git show 9e5ba74 --stat -- web/src/assets/fourier-paths/` → **two files changed, `moon.json` and
`sun.json`, and nothing else**. The generator was never touched. `git log --follow` on the component
shows no commit between `1657dc3` (2026-03-08, the file's creation) and `9e5ba74`; I diffed
`git show 1657dc3:web/src/components/FourierShapeExtractor.vue` against HEAD's moon block — the three
`<polygon :points="starPolygonPoints[n]">` (`:98-115`) and three `<circle … fill="red">` (`:117-119`)
survive unchanged to today.

So the extractor still draws six moon decorations that the shipped asset deliberately excludes.
**Pressing "Extract Shape Contours" today and re-running the pipeline reinstates them in the
site-wide dark-mode toggle.** The tool's output is a regression, and nothing in the tree says so.

**Independent second proof (measured, not inferred).** Bounding boxes:

| | shipped `moon.json.original` | extractor's moon contours (`raw-contours.json`) | crescent contour **alone** |
|---|---|---|---|
| x | `[30.06, 140.96]` | `[28.03, 187.50]` | `[28.03, 153.93]` |
| y | `[36.55, 174.73]` | `[7.00, 177.11]` | `[30.00, 177.11]` |

The shipped moon is strictly *inside* the crescent-alone box on all four sides. `resample_arc_length`
(`contours/geometry.py:92-110`) interpolates **between existing sample points**, so its output bbox
is a subset of its input bbox and can shrink only by the local segment span (≈1–2 units at 128
samples). A 13.0-unit shrink in x-max and a 6.6-unit shrink in y-min is not resampling error. The
shipped moon is **not derivable from this component's Moon SVG at all** — not merely "with the stars
removed."

For contrast, the sun *is* consistent: shipped `sun.json` bbox `x[11.15,175.10] y[10.90,177.77]` vs.
extractor union `x[10.80,175.20] y[10.90,178.40]` — agreement to ≤0.63 units, exactly resampling-scale.
**The two canonical assets have different provenance, and only one of them is reproducible.**

**Falsifier.** Show a tracked recipe that maps `FourierShapeExtractor.vue`'s Moon SVG onto
`moon.json` — any transform whose output bbox is `x[30.06,140.96] y[36.55,174.73]`. There is none in
the tree; the only recipe present (§L-B2) is untracked, broken, and parameterized differently
(`n_harmonics=100`, 12 levels vs. the shipped `n_harmonics: 50`, 10 levels). Or: produce the commit
that removed the stars from the generator. `git log --follow` says it does not exist.

---

### L-B2 · BLOCKER — The sole consumer of this component's output is untracked *and* broken at import

**Provenance** `.gitignore:53` (`scripts/*`) · `scripts/precompute_svg_fourier.py:40,81` ·
`src/fourier_analysis/shortest_tour.py:49` · commit `ecca2df` (2026-03-14).

```python
# scripts/precompute_svg_fourier.py:40
from fourier_analysis.shortest_tour import order_contours
# :81
stitched = order_contours(contours)
```

`order_contours` **does not exist**. `/usr/bin/grep -rn "order_contours" --include="*.py" .` returns
exactly two live sites — this script, and `README.md:126,135` (tracked doc rot). `shortest_tour.py`
defines `build_contour_tour` (`:49`), `_complex_to_xy`, `_nearest_neighbor`, `_gap_cost`, `_two_opt`
and nothing else. The rename landed at `ecca2df` (2026-03-14, *"refactor(lib): modularize contour
extraction into package with ML strategy"*).

Two breaks, not one:
1. `ImportError` at line 40 — the script cannot start.
2. Even with the name fixed, `build_contour_tour` returns a **`ContourTour` dataclass**
   (`shortest_tour.py:30-46`), not an `ndarray`; `:84`'s `resample_arc_length(stitched, n_samples)`
   would then receive a dataclass where `contours/geometry.py:92` expects `NDArray[complex128]`.
   `.path` is the field it wants.

And the parameters no longer match the product: the script hard-codes `n_harmonics=100` with 12
levels (`:139-142`); both shipped assets carry `n_harmonics: 50` and 10 levels — the `9e5ba74` "cap at
50" decision that also never reached the generator side.

Note the chronology: the rename (2026-03-14) **predates** the last asset regeneration (2026-03-16).
Whatever produced today's `sun.json`/`moon.json`, it was not this script as written.

**Falsifier.** Run `python scripts/precompute_svg_fourier.py` from a clean checkout. It cannot even be
attempted — `scripts/` is gitignored, so a clean checkout has no script and no `raw-contours.json`;
the tracked tree contains **zero** paths from `<pre id="output">` to `fourier-paths/*.json`. If
someone claims the pipeline is live, the falsifier is `git ls-files scripts/` → empty.

---

### L-B3 · BLOCKER — Canonical geometry is a pure function of an unpinned third-party PRNG, with zero detection

**Provenance** `FourierShapeExtractor.vue:144,151,153-163` · `pencil-boil@0.4.1
src/{random.ts:2-10, celestial.ts:11,29,46}` · census `lane-frontend.md:481`.

Six of the sixteen shipped contours (3 sparkle diamonds, 3 stars, the sun's ray polygon) are emitted
by `mulberry32(seed)` inside pencil-boil. The exact byte-level geometry of the site's sun is
therefore a function of a **library's internal RNG call order**, consumed as `^0.4.1`.

Census `lane-frontend.md:481` schedules exactly this bump: *"`pencil-boil` peer floor … 7.0
optional-peers `^0.11.2`; installed 0.4.1"* — inside the atomic
glass 4→7 ∧ keyframes 4.3→6 ∧ value 0.13→4.0 transaction (census §3a FE §5, "THE RESOLUTION
DEADLOCK"). A single reordered `rng()` call in `generateSunRays` between 0.4.1 and 0.11.2 silently
changes the shipped sun. There is **no pin, no hash, no golden-file test, no snapshot** — the artifact
that would show the drift (`raw-contours.json`) is gitignored, and no spec asserts anything about the
geometry.

**Falsifier.** Point to any tracked artefact that would go red if `generateSunRays(42)` returned a
different polygon. `web/e2e/*.spec.ts` contains zero references to `__fourierShapeData`, `extract-btn`
or any contour value (`/usr/bin/grep -rn` → 0 hits outside the component and the docs corpus). The
only spec touching the route is `visual-baseline.spec.ts:36`, which screenshots and asserts *horizontal
overflow only*. Full-page pixel comparison is never performed (`page.screenshot(...)` writes; there is
no `toMatchSnapshot`).

---

## §2 — MAJOR

### L-M1 · MAJOR — Closed shapes are emitted open; `<path … Z>` is handled correctly and `<polygon>`/`<circle>` are not

**Provenance** `lib/svg-contours.ts:26-29` (circle), `:30-35` (polygon), `:38-46` (path).

The polygon branch pushes exactly `numberOfItems` vertices with no wrap-around (`:32-35`); the circle
branch loops `i < n` over `2πi/n` with no closing point (`:26-29`). The path branch samples
`getPointAtLength` over `getTotalLength()`, which per SVG 2 **includes the `closepath` segment** — so a
`Z`-terminated path (the moon crescent, `:83`) *is* closed while a `<polygon>` is not. Downstream,
`build_contour_tour` concatenates contours end-to-start and `resample_arc_length` interpolates along
the concatenation; **nothing closes a contour anywhere in the pipeline.**

Magnitudes, computed from the actual shapes:

| shape | vertices | fraction of outline dropped |
|---|---:|---:|
| sparkle diamond `wobbleDiamond(35,40,6,10,10)` | 4 | **25.0 %** (one of four 11.66-unit sides) |
| 5-point star `wobbleStarPolygon(…)` | 10 | 10.0 % |
| dot circle r=2 | 16 | 6.3 % |
| disc circle r=48 | 123 | 0.8 % |

A quarter of every sparkle diamond is absent from the Fourier input for the shipped sun.

**Falsifier.** Add `if (points.length) points.push(points[0])` to the polygon and circle branches; the
contour lengths become 5/11/17/124 and the stitched perimeter grows. If closure were recovered
downstream, `build_contour_tour`/`resample_arc_length` would contain a wrap — they do not
(`shortest_tour.py:49-107`, `geometry.py:92-110`).

### L-M2 · MAJOR — `extractContours` is coordinate-space-naive: no CTM composition anywhere

**Provenance** `lib/svg-contours.ts:1-4` (docstring), `:22-24`, `:44`.

`el.cx.baseVal.value` and `geom.getPointAtLength(t)` both return values in the **element's own user
coordinate system**. The module never calls `getCTM()`, `getScreenCTM()`, or composes any
`transform`. Any `transform` on the element or on an ancestor `<g>`/`<svg>` silently produces contours
in the wrong space, with no error and no signal. The docstring (*"Sample points along every shape
element in an SVG"*) promises root-space extraction and delivers element-space.

Today's SVGs carry no transforms (`:17`, `:80` — bare `<g>`), so this is **latent, not live**. But this
is the frontend's only contour extractor and it is one line of markup away from producing silently
wrong canonical geometry. Note also that `<polyline>` is absent from the selector (`:16`) — a polyline
is silently skipped, not sampled.

**Falsifier.** Add `transform="translate(10,0)"` to `:17`'s `<g>`; the rendered sun moves, the emitted
contours do not change by a single unit. There is no `getCTM` in the file (`grep` → 0).

### L-M3 · MAJOR — Three silent-drop gates, zero diagnostics, on the path that defines shipped geometry

**Provenance** `lib/svg-contours.ts:40` (`if (totalLen < 1) continue`), `:47-49` (`catch { continue }`),
`:52-54` (`if (points.length >= 3)`) · `FourierShapeExtractor.vue:166` (silent early return).

Every failure mode of this module is *"drop the contour and say nothing."* A `<path>` whose geometry
API throws, a degenerate shape, a sub-unit length — each removes one of the sixteen contours, changing
the shipped sun or moon, with no console output, no count, no marker. The `<pre>` prints only the raw
JSON (`:178`), so a human following the documented workflow ("copy the output") cannot notice that 15
contours came back instead of 16. `extractAndOutput` itself returns silently when either ref is null
(`:166`) — a no-op click with no feedback.

This is the error posture that makes L-B1 possible: divergence between the tool and its artifact is
structurally unobservable.

**Falsifier.** The bare `catch { continue }` at `:47` has no binding and no logging. If diagnostics
existed, `grep -n "console\|throw\|warn" lib/svg-contours.ts` would be non-empty. It returns 0.

### L-M4 · MAJOR — Uncancelled `setTimeout` in `onMounted`; no teardown at all

**Provenance** `FourierShapeExtractor.vue:185-190`.

```ts
onMounted(() => {
    setTimeout(() => { extractAndOutput(); }, 200);
});
```

`grep -n "onUnmounted\|onBeforeUnmount\|clearTimeout\|useTimeoutFn"` on the file → **NONE**. The route
is lazily imported (`router/index.ts:114`), so a 200 ms window in which the user can navigate away is
entirely reachable. The pending timer retains the closure — and therefore the component scope
including the two ref objects — past unmount, and then fires into a document that no longer contains
this component, where it (a) reads `document.getElementById("output")` **globally** (`:176`), and (b)
writes `window.__fourierShapeData` (`:180`). The ref guard at `:166` prevents a crash, not the write.

`@vueuse/core@14.3.0` is a direct dependency (`web/package.json:19`) and ships `useTimeoutFn`, which
auto-disposes on scope teardown; it is used nowhere in `web/src` (`grep` → 0 hits). The correct fix is
smaller still: `onMounted` already guarantees DOM insertion, and `getTotalLength()` needs no layout
pass for an in-document SVG with a fixed `viewBox` — `await nextTick()` or nothing at all suffices.

Folds and re-grades M-audit `SE-03` (*"`setTimeout(200)` race … brittle and semantically wrong"*,
graded **medium**): SE-03 diagnosed the delay as a *race*. The leak — an uncancelled timer with no
unmount hook, writing to two globals after teardown — is not in SE-03 and is the sharper half.

**Falsifier.** Static: the file contains no unmount hook and no handle for the timer, so cancellation
is impossible by construction. The cross-route write is UNPROVEN-NEEDS-LIVE (SS-13): navigate away
within 200 ms and inspect `window.__fourierShapeData` on the next route.

### L-M5 · MAJOR — The machine-readable handoff is gated on a presentational DOM node, untyped, and has no consumer

**Provenance** `FourierShapeExtractor.vue:176-181`.

```ts
const el = document.getElementById("output");
if (el) {
    el.textContent = JSON.stringify(output);
    // Also put it on window for Playwright to access
    (window as any).__fourierShapeData = output;
}
```

Three defects stacked in five lines:

1. **The data export is inside the markup guard.** Rename or remove the `<pre>` and the *machine*
   handoff silently vanishes with the *visual* one. The two have nothing to do with each other.
2. **`(window as any)`** — no `declare global` augmentation exists anywhere in `web/src`
   (`env.d.ts`, no `global.d.ts`), so the property is invisible to `vue-tsc -b` in a project running
   `strict: true` + `verbatimModuleSyntax: true` (`tsconfig.app.json:5,12`). The cast is the only
   thing making it compile.
3. **The comment is false.** No Playwright spec reads it — I re-confirm at HEAD what M-audit `SE-05`
   recorded in June (*"grep of `web/e2e/*.spec.ts` = 0 hits"*): 0 hits today across all 8 specs.

**Where I contradict the prior corpus.** M-audit `SE-05`'s proposed remedy was *"delete the
`window.__fourierShapeData` assignment entirely — the `<pre>` text content is already sufficient."*
That is wrong on the tree. The real consumer was never Playwright: `precompute_svg_fourier.py:4-5`
names *"multi-contour shape data extracted by FourierShapeExtractor.vue (via Playwright)"* as its
input. The comment and SE-05 both describe a Playwright harvester that **does not exist in any repo**
— the actual handoff is a human copying a 24 KB line out of a `<pre>`. Deleting the global without
building the harvester would leave the pipeline exactly as broken as it is, while removing the only
affordance a future harvester would use.

**Falsifier.** `/usr/bin/grep -rn "__fourierShapeData" --include="*.ts" --include="*.mjs" --include="*.py"`
over both repos returns hits only in the component itself and in the docs corpus — never in `e2e/`,
never in `scripts/`.

### L-M6 · MAJOR — Hand-unrolled indexed repetition: the R5-7 invisibility class, one step further out

**Provenance** `FourierShapeExtractor.vue:44-61` (sun sparkles), `:98-115` (moon stars),
`:153-163` (the backing arrays) · intake lane `lane-fourier-r3-r6.md:125` (R5-7).

R5-7 (ADOPT-AS-FACT, CARRY → F.W4) established that *"template-loop evidence keyed to **component**
callsites is blind to native HTML element loops"* — `PaperSidebar.vue`'s three `<li v-for>` register
nowhere, so `instance.loop.paper-sidebar` derived as `[]`. R6-5's `NATIVE_TEMPLATE_LOOP` family cures
that case.

**This file defeats the cure too.** It contains `v-for` **zero times** (`grep -c "v-for"` → 0). The
repetition is hand-unrolled against literal indices:

```html
<polygon :points="sunSparklePoints[0]" … />
<polygon :points="sunSparklePoints[1]" … />
<polygon :points="sunSparklePoints[2]" … />
```

— six such bindings, plus five literal-constant `<circle>` repetitions. A `NATIVE_TEMPLATE_LOOP`
extractor sees nothing here; a component-callsite extractor sees exactly one callsite (`Button`,
`:125`). Yet the file's **product is those sixteen elements** — `grep -c "<polygon\|<circle\|<path"` → 16,
and `raw-contours.json` carries exactly 8 sun + 8 moon contours. Any instance denominator over this
file reports ≈1 while the rendered artefact is 16.

Beyond the derivation blind spot, it is a live desync hazard in the one place where the model *is*
the product: append a fourth tuple to `sunSparklePoints` (`:159-163`) and it renders nowhere, contour
count stays 8, the regenerated `sun.json` is byte-identical, and no gate anywhere notices. The array
and the template are two sources of truth for one thing.

**Falsifier.** Add `wobbleDiamond(90, 90, 5, 8, 40)` as a fourth entry; `sunSparklePoints.length === 4`
and the DOM still holds three `<polygon>`s bound to indices 0–2. Additionally `tsconfig.app.json` does
not enable `noUncheckedIndexedAccess`, so `sunSparklePoints[3]` would type as `string`, not
`string | undefined` — the compiler cannot help either.

### L-M7 · MAJOR — `variant="default"` pins nothing and its meaning already changed under the component

**Provenance** `FourierShapeExtractor.vue:125` · glass-ui@4.0.0 `dist/button-BNDWhAZb.js` cva ·
`docs/tranches/J/audit/screenshots/before/shape-extractor-{1440x900,375x667}.png` ·
`FourierMorphDemo.vue:286-298`.

The installed glass-ui **4.0.0** button cva reads:

```
variants.variant.default = "glass-wash btn-glass text-foreground hover:bg-(--glass-bg-resting) …"
variants.variant.solid   = "bg-primary text-primary-foreground hover:bg-primary/90 …"
defaultVariants          = { variant: "default", size: "default" }
```

The checked-in J baseline captures (both 1440×900 and 375×667) show this button as a **solid black
pill** — i.e. the *old* `default` (`bg-primary`), which in 4.0.0 is named `solid`. The variant string
`"default"` silently changed meaning from *solid primary CTA* to *glass wash* underneath a component
that spells it out explicitly. `variant="default" size="default"` restates the cva's own
`defaultVariants` verbatim: **two props that read as a deliberate design choice and pin nothing.**
Nothing in the repo caught the swap, because the only automated artefact for this page is a
screenshot that is never compared (L-B3 falsifier).

Two riders from the same evidence:
- The baseline captures show the pill with **no visible label** at both viewports, while the sibling
  `/morph` Export button renders "Export" in white — because `.btn-export` locally overrides
  `background: var(--foreground); color: var(--background)` (`FourierMorphDemo.vue:293-294`), masking
  the glass-ui pair. This component is the unmasked witness. Under glass-ui 4.0.0's `text-foreground`
  the label should now be legible, so the *current* rendering is **UNPROVEN-NEEDS-LIVE (SS-13)** — but
  the captures, and `DELTA.md:21`'s row *"shape-extractor | none/incidental | baseline | (W8) — stable"*,
  are demonstrably stale.
- Census `lane-frontend.md` FE §5 schedules glass 4→7 next. The same unpinned-variant mechanism will
  fire again, on the same line.

**Falsifier.** Delete both props; the rendered class list is byte-identical (`defaultVariants`
supplies them). Then check `git log` for any commit adjusting this line across the 3.x→4.0.0 hop —
there is none (`git log --follow` on the component: last touch `262c3d0`).

---

## §3 — MINOR

### L-m1 · MINOR — Three `computed()` over zero reactive dependencies
`:151`, `:153-157`, `:159-163`. `generateSunRays(42)`, `wobbleStarPolygon(160,20,12,5,1)` … every
argument is a literal; nothing reactive is read. Each allocates a `ComputedRefImpl` + `ReactiveEffect`
per component instance that can never invalidate. These are module-level constants wearing reactivity
costume — and the costume is what makes L-M6's array/template desync read as "reactive, therefore
safe." **Falsifier:** no `.value` read, no `ref`, no `props` inside any of the three bodies.

### L-m2 · MINOR — `generateSunRays`'s `innerPoly` is computed and thrown away
`celestial.ts:45-97` returns `{ outerPoly, innerPoly }`; `innerPoly` accumulates ten additional
`rng()`-driven vertex pairs (`:75-90`). `/usr/bin/grep -rn "innerPoly" web/src web/e2e` → **0 hits**.
The template renders only `sunRayPoints.outerPoly` (`:20`). So the canonical sun omits the paired
inner ray polygon the library computes for it, and pays for it every mount. Either the shape is
incomplete relative to the library's intent, or the destructuring should discard it explicitly.

### L-m3 · MINOR — Line 150's comment is arithmetically false and cites a formula that exists nowhere
`// Use seed 42 for canonical shapes (first frame = seed * 100 + 42 = 42)`. `seed * 100 + 42 = 42`
holds only for `seed = 0`, and the seed in use is 42 (`:151`) → 4242. `/usr/bin/grep -rn "\* 100 +"
web/src/` returns this comment and nothing else: the frame-seed scheme it references does not exist in
the tree. A stale comment on the single line that documents *why the canonical geometry is what it is*
is worse than none — it is the only prose anywhere explaining the artifact's provenance.

### L-m4 · MINOR — Document-global unnamespaced ids on a route component
`id="output"` (`:130`) and `id="extract-btn"` (`:125`), reached via `document.getElementById("output")`
(`:176`) instead of a template ref for an element the component itself owns. `output` is close to the
most collision-prone identifier available, and the repo already performs generic caller-supplied
`getElementById` lookups (`components/paper/useScrollNavigation.ts:39`). Folds M-audit `SE-04`; adds
the id-globality half, which SE-04 does not raise.

### L-m5 · MINOR — The canonical seed set has no home
`42` (`:151`), `1, 2, 3` (`:154-156`), `10, 20, 30` (`:160-162`) are scattered inline across two
computeds. "Regenerate the canonical shapes with a different seed" has no single knob, and the seeds
are the artifact's only free parameters.

### L-m6 · MINOR — The route provably cannot satisfy the repo-wide occlusion gate the only spec touching it asserts
`:5` (`display: flex; gap: 2rem` with no `flex-wrap`) + `:12-14`, `:75-77` (two `width="200"` SVGs) +
`:2` (`padding: 2rem`). Content width = 200 + 32 + 200 + 64 = **496 px** against a 375 px viewport;
flex items cannot shrink below their 200 px replaced-element intrinsic width, and neither `html` nor
`body` sets `overflow-x: hidden` (`web/src/style.css:17-36,40-50` — the only `overflow` rules in the
file are `.katex-display`, `:64-69`). `visual-baseline.spec.ts:62-68` asserts
`documentElement.scrollWidth - clientWidth <= 2` for **every** page × viewport, including this route
(`:36`). The checked-in capture confirms the outcome directly: `before/shape-extractor-375x667.png`
shows the Moon SVG cut off at the right edge. Folds M-audit `SE-07`, and adds the part SE-07 missed —
this is not a cosmetic mobile issue, it is a **standing repo gate that this markup cannot pass**.

---

## §4 — INFO

### L-i1 · INFO — The internal tool ships in the production bundle (build-artifact proof)
`web/dist/assets/FourierShapeExtractor-BntwCyyr.js` exists on disk — the compiled component, including
the inlined `extractContours` body and `window.__fourierShapeData=r`. Prior audits inferred prod
reachability from the router (`r2-fourier-A-refinement.md:276` BW-9; `DA-design-A4` row 5); this is the
emitted chunk. `router/index.ts:111-115` has no `import.meta.env.DEV` guard.

### L-i2 · INFO — The route carries no `meta`, so the site's default description is stamped on a debug page
`router/index.ts:111-115` is the only route record without `meta.title`/`meta.description` (contrast
`:91-108`). `applyRouteMeta` (`:153-158`) therefore applies `DEFAULT_TITLE` and the full
`DEFAULT_DESCRIPTION` — the paper's marketing copy — to an internal harness. The fallback is correct
code; the content is wrong for the page, and there is no `noindex`.

### L-i3 · INFO — Census correction: pencil-boil is **3** import sites across 3 files, not 4
`lane-frontend.md:481` records *"4 sites (`SvgFilters.vue:3`, `FourierShapeExtractor.vue:144`,
`svg-fourier.ts:11`)"* — three sites listed under a count of four. Live:
`/usr/bin/grep -rn "@mkbabb/pencil-boil" web/src/` → 4 lines, of which `SvgFilters.vue:19` is a
**comment**. **Adopt: 3 import statements / 3 files.** Does not change the row's verdict (the peer-floor
break surface is unaffected); recorded so F.W4's budget is right.

### L-i4 · INFO — The tool's only human handoff is a 24 KB unindented single line, and the copy affordance already exists next door
`:178` `JSON.stringify(output)` with no `space` argument, into a `<pre>` with `overflow: auto`
(`:129-137`). `scripts/raw-contours.json` is 24 048 bytes — one line, no wrapping, in a 300 px-tall
box. The documented workflow (`precompute_svg_fourier.py:10-12`, *"extract contours via the browser …
then:"*) requires a human to select and copy it. The sibling `useMorphConfig().copyToClipboard()` —
used by `FourierMorphDemo.vue:71-74` with a `Copied` affordance — was not reused. Folds M-audit
`SE-08`'s button critique and supplies the missing "what should it do instead".

---

## §5 — SUPERLATIVES (L-18 runs both ways)

Each carries its own falsifier; none is a consolation prize.

### S-1 · The generator is **bit-reproducible**, and I proved it by re-derivation
I transcribed pencil-boil 0.4.1's `mulberry32` (`random.ts:2-10`) and all three celestial generators
into Node and compared their output against the on-disk `scripts/raw-contours.json`:

| contour | n | max abs Δ |
|---|---:|---:|
| `generateSunRays(42).outerPoly` | 20 | 6 × 10⁻⁶ |
| 3 × `wobbleDiamond` | 4 each | 2–6 × 10⁻⁶ |
| 3 × `wobbleStarPolygon` | 10 each | 6 × 10⁻⁶ |

Every delta is float32 quantization of the DOM's `SVGPoint` — visible in the checked-in capture
itself, which reads `{"sun":[[[100.19999694824219,10.899999618530273],…` (`float32(100.2)`). The
contour *counts* match exactly too — sun `[20,123,128,4,4,4,16,16]`, moon `[128,128,10,10,10,16,16,16]`
— reproducing the adaptive circle formula and the polygon vertex counts element for element. **Given
today's dependency tree, this component produces exactly what it produced in March.** That is a real
property, rare in generator code, and it is precisely what makes L-B3's version exposure worth
blocking on rather than shrugging at. **Falsifier:** any Δ > 10⁻⁴ would indicate genuine drift; the
observed 6 × 10⁻⁶ is float32 ULP at magnitude ~10².

### S-2 · The circle branch's adaptive sampling is the right instinct, correctly floored
`svg-contours.ts:25`: `n = Math.max(16, Math.round(samplesPerPath * (r / 50)))`. It normalizes sample
density by radius against a 50-unit reference and floors degenerate small circles at 16. This is the
only adaptive rung in the module and it is the correct call for an arc-length-resampled downstream:
the r=48 disc gets 123 samples and the r=1.5 dot gets 16, rather than 128 each. **Falsifier:** a flat
128 would oversample the r=1.5 dot by ~85× relative to the disc, and after `order_contours` +
`resample_arc_length` the dots would dominate the stitched arc-length budget. (The magic `50` is
undocumented — the instinct is right, the provenance of the constant is not recorded.)

### S-3 · Type narrowing over casting, in a file that had every excuse to cast
`:21` `el instanceof SVGCircleElement` and `:30` `el instanceof SVGPolygonElement` narrow *before*
touching `.cx.baseVal` / `.points`. The single `as SVGGeometryElement` (`:37`) is the honest fallback
for the residual union and is wrapped in `try/catch`. **Falsifier:** `grep -c "as any" lib/svg-contours.ts`
→ **0**, in a repo whose sibling component reaches for `(window as any)` (`:180`) and whose consumers
use `as any` on the JSON assets (`DarkModeToggle.vue:26-27`).

### S-4 · The `points.length >= 3` floor is a real guard, not decoration
`:52-54`. It keeps 0/1/2-point contours out of `resample_arc_length`, which computes
`arc / total_length` (`geometry.py:99-104`) and would otherwise be handed a degenerate segment. Cheap,
correct, placed at the boundary. **Falsifier:** remove it and feed a 1-point contour;
`geometry.py:97-101`'s `len(contour) < 2` early-return catches the trivial case, but the 2-point
zero-length case reaches the `total_length < 1e-12` branch and returns a truncated contour into the
Fourier decomposition. The frontend guard is the better place.

### S-5 · Pinning `128` explicitly at both call sites is correct for a canonical-artifact generator
`:168-169` restate `samplesPerPath`'s default (`svg-contours.ts:12`). For a tool whose output is a
*versioned artifact*, pinning the sample count at the call — rather than inheriting a library default
that can move — is exactly right, and it is the discipline L-B3 shows is missing everywhere else.
Note the contrast this draws with L-M7: restating a numeric parameter that **determines the artifact**
is prudence; restating a cva variant name that **determines nothing** is noise. Same syntax, opposite
value. **Falsifier:** change `svg-contours.ts:12`'s default to 256 — sun/moon regenerate identically,
because the call sites pin it.

---

## §6 — Corpus reconciliation

**Folded without re-derivation** (cited, not re-argued): M-deep-audit 2026-06-16 `SE-02` (inline
styles), `SE-06`/`SE-14` (typography register), `SE-11` (`#ccc` border, dark mode), `SE-12` (`<pre>`
layout cost) — all design-axis; I carry none of them onto L. `SE-03`, `SE-04`, `SE-05`, `SE-07`,
`SE-08` are folded **and re-graded** at L-M4, L-m4, L-M5, L-m6, L-i4 respectively, each with the half
the original missed. `DA-design-A4` row 5 and `r2-fourier-A-refinement` BW-9 (prod-reachable, ungated)
are folded at L-i1 with build-artifact proof rather than router inference.

**Census rows cited**: §3a [FE §6] / `lane-frontend.md:514`, `:564-565` (Canvas2D throughout, WebGL
ABSENT, 12-file SVG surface — this component's position on the viz path); `lane-frontend.md:174` (the
component row, 191 lines, "uses `pencil-boil` generators"); `:190` (`lib/svg-contours.ts` 58 lines);
`:481` (pencil-boil peer floor — the L-B3 mechanism); §3a FE §5 "THE RESOLUTION DEADLOCK" (the atomic
uplift that fires it).

**Intake lane rows cited**: `lane-fourier-r3-r6.md:125` **R5-7** (ADOPT-AS-FACT, CARRY → F.W4) — extended
at L-M6 to the manual-unroll case that defeats even R6-5's `NATIVE_TEMPLATE_LOOP` cure. `:153` **X-2**
(9 route records) — this component owns one of them, and it is the single record carrying no `meta`
(L-i2), a detail X-2's enumeration does not reach.

**Where I contradict the corpus.**
1. **M-audit `SE-05`'s remedy is wrong on the tree** (argued in full at L-M5): the `__fourierShapeData`
   global's real consumer was never Playwright — `precompute_svg_fourier.py:4-5` is, and it is
   untracked and broken. "Delete the global, the `<pre>` suffices" leaves the pipeline dead.
2. **`lane-frontend.md:481`'s "4 sites" is 3** (L-i3).
3. **The census leaves this component's role unhomed.** §3a Shadows records *"CHARACTERFUL —
   `DarkModeToggle` (sun↔moon Fourier morph; keep, reconcile)"*. It homes the *consumer* and never
   names the **generator** of the geometry that consumer renders. L-B1/L-B2 are exactly the reconcile
   work that row implies and does not enumerate; F.W4 cannot "keep and reconcile" `DarkModeToggle`
   without deciding whether its shapes can ever be regenerated.
4. **Every prior audit's framing — "internal dev tool, deferrable"** — does not survive the chain in
   §0. `DA-design-A4` row 5 calls it *"deliberately deferrable"*; `M-critique B7-12` files it as
   *"internal tool hygiene"*. Both are reasonable readings of a page and wrong readings of a build
   step for shipped, site-wide geometry.

---

## §7 — UNPROVEN-NEEDS-LIVE (SS-13 queue)

Claims above that a live pass must settle; none is load-bearing for a BLOCKER.

1. **L-M4 cross-route write** — that the orphaned 200 ms timer actually writes
   `window.__fourierShapeData` and touches a foreign `#output` after navigation. Static proof covers
   only the *absence of cancellation*.
2. **L-M7 current button rendering** — glass-ui 4.0.0's `default` should now render `text-foreground`
   on a glass wash, so the baseline captures' unlabelled black pill is presumed stale. Needs one
   screenshot to confirm, and `DELTA.md:21` needs re-marking either way.
3. **L-M2 transform-blindness** — demonstrable statically (no `getCTM` in the file); the *magnitude* of
   the resulting error under a real transform is live-only.
4. **L-m6 occlusion gate outcome** — the arithmetic and the checked-in 375 px capture both say RED;
   whether `visual-baseline.spec.ts` is currently run (it is opt-in via `VISUAL_MODE` but is a plain
   spec file, so `playwright test` collects it) is a live/CI question.
5. **L-B1 visual delta** — I proved the shipped moon is not derivable from the extractor's Moon SVG by
   bbox arithmetic and commit archaeology. The *rendered* difference in the dark-mode toggle after a
   hypothetical regeneration is live-only, and should never be produced on `master`.
