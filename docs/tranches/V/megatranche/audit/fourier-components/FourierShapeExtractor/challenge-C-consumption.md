served model id: `claude-opus-5[1m]`

# Challenge C — CONSUMPTION · `FourierShapeExtractor.vue`

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/morph/FourierShapeExtractor.vue` (191 lines, git `262c3d0` 2026-06-02)
**Axis** CONSUMPTION — value.js 0.13 · keyframes 4.3 · glass-ui ^4.0.0 · the fourier API operation surface · props/emits contract · integration seams
**Method** static + source-derived only. No browser tooling. Every claim carries `file:line` provenance and its own falsifier; livable-only claims are marked `UNPROVEN-NEEDS-LIVE` for SS-13.
**Prior** assumed DEFECTIVE until the tree proved otherwise. Where the tree exonerated the file I say so (§4 superlatives) — L-18 runs both ways.

## §0 — Read set (whole, read-only)

| File | Why |
|---|---|
| `web/src/components/morph/FourierShapeExtractor.vue` | target |
| `web/src/lib/svg-contours.ts` (58) | its only local import |
| `web/node_modules/@mkbabb/pencil-boil/src/{index,celestial,random,path,vue}.ts` | the 3 consumed generators + the RNG they close over |
| `web/node_modules/@mkbabb/glass-ui/{package.json,dist/button.d.ts,dist/components/ui/button/*.d.ts}` | the consumed `Button` contract at 4.0.0 |
| `/Users/mkbabb/Programming/glass-ui/{package.json,src/components/button/{index.ts,Button.vue}}` | the same contract at 7.0.0 (the F.W1 target) |
| `/Users/mkbabb/Programming/pencil-boil/{package.json,src/{index,celestial,random}.ts}` | 0.12.0 upstream (the F.W1 target) |
| `web/src/router/index.ts:100-118` | route registration |
| `web/src/components/morph/FourierMorphDemo.vue` · `web/src/lib/svg-fourier.ts` | the downstream client leaves of this producer |
| `scripts/precompute_svg_fourier.py` · `scripts/raw-contours.json` | the offline consumer + this component's shipped output |
| `web/src/lib/{api.ts,colors.ts,scheduler.ts}` · `web/{package.json,tsconfig.json,e2e/*.spec.ts}` | the surfaces it *could* consume and does not |
| `src/fourier_analysis/contours/{extraction,pipeline,geometry}.py` · `api/services/computation.py` | the server twin of the same operation |

## §1 — Verdict

The component is not a UI defect story; it is a **producer** whose entire reason to exist is an integration seam, and **the seam is severed at both ends**. It is the sole author of `scripts/raw-contours.json`, which is the sole input to `scripts/precompute_svg_fourier.py`, which is the sole author of `web/src/assets/fourier-paths/{sun,moon}.json` — 450 KB of tracked, shipped data that is the *entire dataset of the `/morph` route*. Both intermediate stages are **gitignored** (C-2). Downstream, the only typed handshake between producer and consumer is `as any` (C-15). Upstream, it consumes `@mkbabb/glass-ui/button` in a shape that **hard-breaks `vue-tsc` at glass-ui 7.0.0** and is not on the CENSUS break-surface list (C-1).

On the three named pinned packages the file is asymmetric and worth stating plainly: **value.js — zero consumption. keyframes.js — zero consumption. glass-ui — one import, and it is the one that breaks.** The 45-operation API surface (39 exported functions in `lib/api.ts`) is consumed **zero** times by a component that reimplements the first stage of the server's own contour pipeline in the browser (C-7).

**18 defects (2 BLOCKER · 6 MAJOR · 7 MINOR · 3 INFO) · 4 superlatives.**

---

## §2 — Findings

### C-1 · BLOCKER · glass-ui 4→7 breaks this callsite twice; the break is absent from the CENSUS break surface

**Provenance** `FourierShapeExtractor.vue:125` —
```
<Button id="extract-btn" variant="default" size="default" @click="extractAndOutput">
```
Consumed contract at **4.0.0** (`web/node_modules/@mkbabb/glass-ui/dist/components/ui/button/index.d.ts`):
`variant?: "link"|"default"|"solid"|…` · `size?: "default"|"xs"|"sm"|"lg"|"icon"|"icon-sm"` · exports `buttonVariants` + `ButtonVariants`.

Contract at **7.0.0** (`/Users/mkbabb/Programming/glass-ui/src/components/button/Button.vue:15-40`):
```ts
export type ButtonEmphasis = "primary" | "secondary" | "quiet" | "text";
export type ButtonSize = Extract<Size, "xs" | "sm" | "md" | "lg">;
export interface ButtonProps extends PrimitiveProps {
    emphasis?: ButtonEmphasis;   // `variant` is GONE
    tone?: Tone;                 // new, orthogonal
    size?: ButtonSize;           // "default" | "icon" | "icon-sm" all GONE
    iconOnly?: boolean;          // replaces size="icon"
    loading?: boolean;
}
withDefaults(…, { as: "button", emphasis: "secondary", tone: "neutral", size: "md", … })
```
`/Users/mkbabb/Programming/glass-ui/src/components/button/index.ts` (6 lines) exports `Button, ButtonProps, ButtonEmphasis, ButtonSize` — **`buttonVariants`/`ButtonVariants` are deleted**.

Two distinct failures at this one line:
1. `size="default"` — `"default"` is not in `ButtonSize`. `size` is a *declared* prop with a narrowed union ⇒ **hard `vue-tsc -b` error**, `npm run build` fails.
2. `variant="default"` — `variant` is no longer a declared prop, so it degrades to a fallthrough attribute and renders a literal `variant="default"` on the `<button>` element. **Silent visual regression, no compiler signal.** The default emphasis flips to `"secondary"`, so the button that was the page's solid primary silently becomes a secondary.

**Break surface this file sits in** (measured, `web/src`): 35 files import `@mkbabb/glass-ui/button`; **99 `<Button` callsites**; **6 `size="default"` sites** (this is one — the others are `ExportModal.vue:74,75`, `FourierMorphDemo.vue:71,75`, `HarmonicLevelGrid.vue:58`); **38 `size="icon*"` sites** (arm deleted → `iconOnly`).

**Corpus contradiction.** `formation/fourier/CENSUS-2026-08-03.md:104-106` enumerates "the uplift break surface" as *removed subpaths (`metric-badge` ×7, `hover-card` ×2, `hover-popover` ×2), removed dock members (×3), `ToastVariant` definition-absent, `lucide-vue-next → @lucide/vue` ×35, pencil-boil 0.4.1→^0.11.2*. **`Button` does not appear.** The `./button` subpath survives 4→7 with an identical `{types, import}` shape, which is exactly why a subpath-diff census misses it: **the break is inside the subpath, in the props.** On the census's own "prior-art rate" line (3.1→4.0 cost 46 lines), a 99-callsite prop-model rename is a materially different budget than the one booked.

**Falsifier.** Show a 7.0.0 compatibility shim accepting `variant`/`size="default"`, or a `defaultVariants`-style alias in `glass-ui@7`'s `Button.vue`. I grepped the 7.0.0 source: `emphasis` and `tone` are the only visual props; no `variant` alias exists. Alternatively, show that `vue-tsc` does not narrow declared prop unions in templates — it does, and `size` is declared.

---

### C-2 · BLOCKER · the producer's entire integration seam is gitignored; the shipped fixtures are unreproducible from a clone

**The pipeline, end to end** (all provenance live):

| Stage | File | Tracked? |
|---|---|---|
| producer | `web/src/components/morph/FourierShapeExtractor.vue:165-182` | **yes** (`262c3d0`) |
| producer lib | `web/src/lib/svg-contours.ts` | **yes** (`9e829ce`) |
| artifact | `scripts/raw-contours.json` (24 048 B) | **NO** |
| transformer | `scripts/precompute_svg_fourier.py` (160 lines) | **NO** |
| shipped data | `web/src/assets/fourier-paths/sun.json` (225 687 B) + `moon.json` (224 944 B) | **yes** |
| consumer | `FourierMorphDemo.vue:95-100` (static `import`) | **yes** |

`git ls-files --error-unmatch scripts/precompute_svg_fourier.py` → `did not match any file(s) known to git`.
`git check-ignore -v` → `.gitignore:53  scripts/*`.
`.gitignore:51-63` is an explicit negation allowlist ("`# Scripts (private/local only — tracked scripts use negation)`") listing 10 tracked scripts; `precompute_svg_fourier.py` and `raw-contours.json` are **not on it**.

**Consequence.** A fresh clone contains the producer and the 450 KB of product it produced, and *nothing in between*. `sun.json`/`moon.json` cannot be regenerated, cannot be diffed against a regeneration, and cannot be validated. The component's docstring-level contract (`precompute_svg_fourier.py:2-12`: "Reads multi-contour shape data extracted by FourierShapeExtractor.vue (via Playwright)") describes a Playwright step that **does not exist** — `grep -rn "__fourierShapeData" web/e2e/` = 0 hits (see C-5). So the seam is: a human opens a route, clicks a button, copies a `<pre>`, saves it to an ignored path, and runs an ignored script.

This is the exact question the 2026-06-16 M-audit left OPEN and unadjudicated (`docs/audits/runs/2026-06-16-M-deep-audit/raw-findings.json:1700`: *"Should the shape-extractor output be validated against the checked-in JSON files (a golden-file diff assertion) to catch drift when the pencil-boil geometry functions change?"*). **The tree now answers it: no validation is possible, because the comparison target is not in the repo.** I promote that open question to BLOCKER on the strength of the gitignore evidence, which the M-audit did not have.

**Falsifier.** Produce a tracked regeneration path — a committed script, a `package.json` task, a CI job, or a golden test — that reconstructs `sun.json` from tracked sources. I searched `web/package.json` (7 scripts, none), the root `package.json` (devDeps only), `scripts/` tracked set (10 shell files + `conformance/`, all deploy/e2e/DNS), and `web/e2e/*.spec.ts` (8 specs; `visual-baseline.spec.ts:36` screenshots the route and asserts nothing about its output). None exists.

---

### C-3 · MAJOR · the contour type cannot express open-vs-closed, and two open strokes ship welded shut

**Provenance.** `svg-contours.ts:10-13` returns `[number, number][][]` — a bare point-array list with **no closure flag, no winding, no element provenance**. Two of the SVG's sampled elements are *open* paths:
- `FourierShapeExtractor.vue:36-42` the golden spiral, `d="M100,100 C…138,76"` — no `Z`.
- `FourierShapeExtractor.vue:90-96` the moon inner stroke, `d="M75,45 C50,65 45,105 55,135"` — no `Z`.

Measured from the component's own shipped output (`scripts/raw-contours.json`, endpoint separation in a 200×200 `viewBox`):

| contour | source | n | first | last | closure gap |
|---|---|---|---|---|---|
| `sun[2]` | golden spiral (open) | 128 | (100.0, 100.0) | (137.2, 74.7) | **44.97** |
| `moon[1]` | inner stroke (open) | 128 | (75.0, 45.0) | (54.8, 134.3) | **91.54** |
| `moon[0]` | crescent (`Z`) | 128 | (85.0, 30.0) | (81.7, 31.8) | 3.75 |
| `sun[1]` | disc circle | 123 | (148.0, 100.0) | (147.9, 97.5) | 2.45 |

`moon[1]`'s gap is **46 % of the canvas width**. The closed elements land at 2–4 units (one sample step); the open ones at 45 and 92 — the discriminator is unambiguous and the type discards it.

**The downstream leaf then assumes closed.** `web/src/lib/svg-fourier.ts:47-50`:
```ts
export function pointsToSvgPath(points: [number, number][], closed: boolean = true): string {
    if (points.length < 2) return "";
    if (!closed) return catmullRomToBezier(points);
```
`closed` **defaults to `true`** and no caller in the tree passes `false` (`grep -rn "pointsToSvgPath" web/src` → declaration + `MorphShapePreview`/`useFourierMorph` call sites, all 1-arg). So the whole pipeline is closed-only by construction, and a 92-unit discontinuity is fed into a Fourier series that must represent it as a jump — the Gibbs term is paid at every harmonic level in `sun.json`/`moon.json`.

**Honest scope.** `precompute_svg_fourier.py:81` runs `order_contours()` (a nearest-neighbour + 2-opt tour) *before* resampling, so open segments are stitched into a global tour rather than each closed individually. That mitigates *where* the discontinuity lands; it does not remove it, and it makes the placement dependent on a tour heuristic the producer cannot see. The defect is squarely the leaf's: **the operation it feeds distinguishes open from closed, and the leaf's return type cannot.**

**Falsifier.** Show a `closed` flag on the wire, or a caller passing `closed: false`, or an out-and-back doubling of open segments at extraction (which would make `moon[1]` 256 points, not 128). All three absent.

---

### C-4 · MAJOR · `samplesPerPath` is honoured by one of three branches; the caller's `128` yields contours of length 4

**Provenance.** `FourierShapeExtractor.vue:168-169` passes `128` twice. `svg-contours.ts` then:
- `:41` paths/lines/rects/ellipses → exactly `samplesPerPath` ✓
- `:25` circles → `Math.max(16, Math.round(samplesPerPath * (r / 50)))` — a **magic reference radius of 50** with no named constant, no comment, no relation to the `viewBox`
- `:32-35` polygons → `pl.numberOfItems`, i.e. **`samplesPerPath` is ignored entirely**

Measured output for `samplesPerPath = 128`:
`sun` → `[20, 123, 128, 4, 4, 4, 16, 16]` · `moon` → `[128, 128, 10, 10, 10, 16, 16, 16]`.
The parameter named "samples per path" produced a 4-point contour. The `r=2` dot (`:63`) and the `r=48` disc (`:27-34`) differ 24× in radius and 7.7× in sample count, because the `max(16, …)` floor dominates for anything under `r ≈ 6.25`.

The parameter is a *suggestion* for 3 of the 6 selector members and a *contract* for the other 3, and nothing in the signature (`samplesPerPath: number = 128`) or the doc comment (`:6-9` "Samples points along every `<path>`, `<polygon>`, `<circle>`, etc.") says which.

**Falsifier.** A doc line or type that scopes the parameter to path-like elements, or a uniform post-pass. Neither exists. (Counter-consideration honoured: the *downstream* `resample_arc_length(stitched, 512)` at `precompute_svg_fourier.py:84` re-uniformizes, so this is a contract lie rather than a geometry corruption — hence MAJOR, not BLOCKER. See C-14 for the cost that survives.)

---

### C-5 · MAJOR · the sole output seam is a dead, untyped ambient global plus a document-wide `getElementById`

**Provenance.** `FourierShapeExtractor.vue:176-181`:
```ts
const el = document.getElementById("output");
if (el) {
    el.textContent = JSON.stringify(output);
    // Also put it on window for Playwright to access
    (window as any).__fourierShapeData = output;
}
```

Four compounding problems, each independently provable:

1. **Dead.** `grep -rn "__fourierShapeData" --exclude-dir=node_modules --exclude-dir=.git .` over the *whole repo* returns **exactly one hit: this line**. No e2e spec reads it. The comment naming Playwright as the consumer is false. This independently corroborates M-audit `SE-05` / `raw-findings.json:1572` ("0 grep hits") — **still true 14 months later**; the file has been touched since (`262c3d0`, 2026-06-02) without the seam being either wired or removed.
2. **Untyped.** `(window as any)` — no `declare global { interface Window { __fourierShapeData?: … } }` anywhere (`web/env.d.ts` and `src/**/*.d.ts` searched). `tsconfig.json` sets `"strict": true` but there is **no ESLint config in `web/`** (`ls .eslintrc* eslint.config.*` → none), so `no-explicit-any` never fires. The cast is legal and unchecked.
3. **Document-scoped reach for an element it owns.** `#output` is declared at `:130` in this component's own template. The file already uses the correct idiom twice — `sunSvgRef` / `moonSvgRef` at `:147-148`, bound at `:10` / `:73`. The `<pre>` was simply not given one. Under the router's own View-Transitions bracket (`router/index.ts:118-131`, which parks the route commit on a promise and can hold two trees alive across a swap) a second `#output` is reachable and `getElementById` returns the first in document order.
4. **The output is gated on the DOM.** The `if (el)` wraps *both* writes, so if the `<pre>` is missing the window global is never set either — the data channel is a hostage of the display channel.

**Contract quality, stated flatly: this component has zero props and zero emits.** Its entire external interface is `window.__fourierShapeData` (dead) + `#output.textContent` (human copy-paste) + `#extract-btn` (no reader). For a component whose job is to hand data to another process, that is a null contract.

**Falsifier.** Any reader of `__fourierShapeData` in any spec, script, or doc-as-code; or a `declare global` augmentation. Neither exists.

---

### C-6 · MAJOR · three silent-drop paths in a producer with no diagnostic channel — while the server twin ships diagnostics

**Provenance.** `svg-contours.ts`:
- `:40` `if (totalLen < 1) continue;` — sub-unit path silently dropped
- `:47` `} catch { continue; }` — **bare swallow**; `getTotalLength`/`getPointAtLength` throwing (detached node, zero-length subpath, engine quirk) is indistinguishable from success
- `:52` `if (points.length >= 3)` — anything shorter silently dropped

The function returns `[number,number][][]` and nothing else. The caller (`FourierShapeExtractor.vue:168-171`) records **no count, no expected count, no error**. If a `<polygon>` regressed to 2 points, the output would simply have 7 contours instead of 8 and the `<pre>` would look fine.

**The server twin does the opposite.** `src/fourier_analysis/contours/extraction.py:153-172` exposes `extract_contours_result(...) -> ContourExtractionResult` — "*returning the full result with diagnostics*" — with `extract_contours()` as the deliberately lossy convenience wrapper on top. `ContourConfig` carries `max_contours` (`pipeline.py:55`, default 24) and a 5-stage documented pipeline (`pipeline.py:53`). The browser leaf has **0 knobs and 0 diagnostics** for the same role.

**Falsifier.** A count assertion, a thrown error, a returned diagnostic, or a caller-side expected-shape check. None of the four exists.

---

### C-7 · MAJOR · zero consumption of the 39-function API surface; the leaf reimplements stage 0 of the server's own contour pipeline (R6-8)

**Provenance.** `web/src/lib/api.ts` (672 lines) exports **39 functions**, including the complete contour→Fourier chain:
```
:300 extractContour(imageSlug, settings)          POST /api/images/{slug}/extract-contour
:316 saveContour(...)                             POST /api/contours
:326 getContour(contourHash)                      GET  /api/contours/{hash}
:330 computeEpicycles(contourHash, ...)           POST /api/contours/{hash}/compute/epicycles
:345 computeBases(contourHash, ...)               POST /api/contours/{hash}/compute/bases
```
`FourierShapeExtractor.vue` imports **none** of them — its import block (`:142-145`) is `vue`, `glass-ui/button`, `pencil-boil`, `@/lib/svg-contours`.

The result is a **second, parallel, untested contour→decomposition path** that terminates in a copy-pasted file. The server path (`api/services/computation.py:12-13` → `fourier_analysis.bases.build_animation_data` + `fourier_analysis.contours.{extract_contours, resample_arc_length}`) is tested (`tests/test_contours.py`, `tests/test_bases.py`, `tests/test_shortest_tour.py`); the browser path has **no test of any kind** (`svg-contours.ts` appears in no spec; there is no vitest setup in `web/`).

**Where I decline to overclaim.** The *decomposition* is not duplicated: `precompute_svg_fourier.py:34-40` imports the very same `fourier_analysis.{bases,contours,shortest_tour}` modules the API service uses. The duplication is precisely at the **leaf**: `extract_contours(image_path, config) -> list[NDArray[complex128]]` (raster, configured, diagnosed, capped, tested) vs `extractContours(svgEl, samplesPerPath) -> [number,number][][]` (SVG-DOM, unconfigured, undiagnosed, uncapped, untested), with a lossy hand-off at `precompute_svg_fourier.py:43-52` (`contours_from_point_arrays`) converting representation #2 back into representation #1. Two representations of one operation's input, and the browser one is the weaker.

**Falsifier.** Show that no API operation accepts an ingested point-list contour — `saveContour` (`:316`, `POST /api/contours` with a `ContourAsset` body) does exactly that, which is what makes the offline detour elective rather than forced.

---

### C-8 · MAJOR · a hard-coded 200 ms `setTimeout` in a repo that ships a documented scheduler floor *and* keyframes.js

**Provenance.** `FourierShapeExtractor.vue:184-190`:
```ts
onMounted(() => {
    // Small delay to ensure SVGs are rendered
    setTimeout(() => { extractAndOutput(); }, 200);
});
```
`nextTick` is not imported (`:142` imports `ref, computed, onMounted` only). The thing being waited for — `sunSvgRef` / `moonSvgRef` binding — is resolved **synchronously before `onMounted` fires**; the `getTotalLength()` calls need layout, which `nextTick` + a rAF settles deterministically. 200 ms is a wager.

**What it declines to consume, in-repo and already paid for:**
- `web/src/lib/scheduler.ts:1-30` — a 54-line, doc-commented, feature-detected 3-rung floor (`scheduler.yield()` → `scheduler.postTask()` → `setTimeout(0)`), authored under this repo's own `inv-29`/`inv-30` (*"progressive-enhancement-floor + platform-over-library"*). Its header explicitly reasons about which consumers should and should not use it. This component is not in that reasoning and does not import it.
- `@mkbabb/keyframes.js@4.3.0` — declared at `web/package.json:14`, consumed by exactly **2 files** repo-wide (`composables/useFourierMorph.ts:14`, `stores/animation.ts:47` comment). Its `loadAnimationEngine()` boundary is the repo's sanctioned timing primitive.

So the file's keyframes consumption is **zero**, and its hand-rolled substitute is the weakest of the three rungs its own repo already implemented.

**UNPROVEN-NEEDS-LIVE (SS-13).** Whether 200 ms is *sufficient* on a cold/throttled load — i.e. whether `extractAndOutput` ever runs against unlaid-out SVGs and silently emits short contours (which C-6 would not report). Static analysis establishes the race exists; only a live throttled run establishes whether it fires.

**Falsifier.** Show that `getTotalLength()` on an in-document `<path>` returns valid geometry without layout, or show a readiness signal (`nextTick`, `ResizeObserver`, `requestAnimationFrame`) anywhere in the file. Neither.

---

### C-9 · MINOR · half the consumed `generateSunRays` return is computed and thrown away

`pencil-boil/src/celestial.ts:45,93-96` — `generateSunRays(seed): { outerPoly: string; innerPoly: string }`. Both polylines are built (`:50-51`, `:77-90`, ten iterations each). `FourierShapeExtractor.vue:151` binds the whole object to `sunRayPoints`; `:20` reads `sunRayPoints.outerPoly` and **`innerPoly` is never referenced** (`grep -n innerPoly` in `web/src` → 0 hits).

Consequence beyond waste: the extracted sun is *definitionally* missing the inner ray polygon that the generator considers part of the sun. Since no other consumer of `generateSunRays` exists in the tree (see C-10), there is no rendered sun to compare against — the fixture's completeness is unfalsifiable by construction.

**Falsifier.** Any `innerPoly` reference, or a doc line stating the omission is intended. Neither.

---

### C-10 · MINOR · a provenance comment that is arithmetically false and cites a formula absent from the tree

`FourierShapeExtractor.vue:150`:
```
// Use seed 42 for canonical shapes (first frame = seed * 100 + 42 = 42)
```
`42 * 100 + 42 = 4242`, not `42`. Beyond the arithmetic: `grep -rn "\* 100 + \|seed \* 100"` over `web/src` **and** `pencil-boil/src` returns nothing — `useLineBoil(frameCount, intervalMs)` (`pencil-boil/src/vue.ts`, used at `SvgFilters.vue:20-21`) takes no seed at all. The comment asserts frame-parity with a boil convention that **does not exist in either repo**.

This is the load-bearing justification for the literal seeds at `:151-162` (`42`, `1/2/3`, `10/20/30`) and therefore for the canonicity of the shipped fixtures. It is wrong twice.

**Falsifier.** Find `seed * 100 + frame` in any consumed package or in the app. I searched both trees; absent.

---

### C-11 · MINOR · three `computed()` over constant inputs

`:151`, `:153-157`, `:159-163` wrap pure functions of numeric literals in `computed`. There is no reactive dependency in any of the three, so they can never invalidate — three `ComputedRefImpl` instances and three effect-scope registrations bought for nothing. `const` is the correct consumption of Vue's reactivity here. (Not a correctness bug; a consumption-idiom defect.)

**Falsifier.** Any reactive source feeding `generateSunRays(42)` / `wobbleStarPolygon(160, 20, 12, 5, 1)` / `wobbleDiamond(35, 40, 6, 10, 10)`. All arguments are literals.

---

### C-12 · MINOR · two global `id` selector hooks, both unread

`:125` `id="extract-btn"` and `:130` `id="output"`. Repo-wide, `#extract-btn` is referenced by **no spec and no source** (only prose in `docs/audits/runs/2026-05-18-fourier-tranche/f-design-math-functionality.md:32`); `#output` is read only by this file's own `getElementById` (C-5). `id` is not a declared prop on glass-ui's `Button` at either 4.0.0 or 7.0.0 (both `extends PrimitiveProps`), so it rides as a fallthrough attr onto the reka-ui `Primitive` root — which *works*, but means the hook's survival depends on `Button` staying single-root through the 4→7 hop.

**Falsifier.** A test or script selecting either id. None.

---

### C-13 · MINOR · consuming pencil-boil 0.4.1 injects 5 `node_modules` `.ts` files into the app's typecheck program

`web/node_modules/@mkbabb/pencil-boil/package.json` at 0.4.1: `"main"/"module"/"types": "./src/index.ts"`, `"exports": { ".": "./src/index.ts" }` — **raw TypeScript, no `dist`**. Measured consequence:
```
$ npx tsc --noEmit --listFiles -p web/tsconfig.json | grep pencil-boil
…/@mkbabb/pencil-boil/src/random.ts
…/@mkbabb/pencil-boil/src/path.ts
…/@mkbabb/pencil-boil/src/celestial.ts
…/@mkbabb/pencil-boil/src/vue.ts
…/@mkbabb/pencil-boil/src/index.ts
```
`web/tsconfig.json` sets `"skipLibCheck": true`, which skips `.d.ts` only — these are `.ts` sources and **are** checked under the app's `strict: true`. A type error introduced in the dependency's source therefore fails `vue-tsc -b` in this app. This file (`:144`) is one of the three import sites that pull it in (the others: `decorative/SvgFilters.vue:3`, `lib/svg-fourier.ts:11`).

Resolved by the F.W1 bump for a good reason worth recording: 0.12.0 ships `"exports": { ".": { "types": "./dist/index.d.ts", "import": "./dist/index.js" } }` — a real build, and `skipLibCheck` then applies.

**Falsifier.** The `--listFiles` output above is the direct measurement; re-run it.

---

### C-14 · MINOR · the leaf's one act of geometric care is undone one stage downstream, and nothing records which side wins

The polygon branch (`svg-contours.ts:30-35`) preserves the **exact authored vertices** — the diamond's 4 corners and the star's 10 — rather than resampling. That is correct and deliberate (see §4 S-4). But `precompute_svg_fourier.py:84` then runs `resample_arc_length(stitched, 512)` over the *stitched* tour, which re-uniformizes and generically misses every corner (a vertex survives only if its arc-length is an exact multiple of `L/512`). The producer optimizes for exactness; the consumer optimizes for uniformity; **neither file documents the precedence**, and the producer cannot know its care was discarded.

**Falsifier.** A corner-preserving resampler, or a comment in either file acknowledging the trade. Neither exists.

---

### C-15 · MINOR · the producer's output type is unenforced end-to-end; the consumer casts through `any`

The producer emits an anonymous object literal (`:171-174` `{ sun, moon }`) with no interface. The offline stage emits an untyped JSON blob. The consumer declares a matching interface **independently** (`svg-fourier.ts:15-28` `FourierPathData`) and then **discards it at the boundary** — `FourierMorphDemo.vue:99-100`:
```ts
const sunShape = prepareFourierShape(sunData as any);
const moonShape = prepareFourierShape(moonData as any);
```
`tsconfig.json` has `"resolveJsonModule": true`, so `sunData` *does* carry a structural type from the JSON — the `as any` deliberately throws it away. Combined with the producer's `(window as any)` (C-5), the shape data crosses **three boundaries and is typed at none of them**.

**Falsifier.** Remove `as any` and show it compiles, or find a runtime validator (zod/valibot/hand-rolled) on the JSON. `grep -rn "zod\|valibot" web/src` → 0; no validator exists.

---

### C-16 · INFO · value.js 0.13.0 is outside glass-ui 4.0.0's peer range — a live violation today, not a post-bump one

`web/package.json:16` declares `"@mkbabb/value.js": "^0.13.0"`; installed **0.13.0**. `web/node_modules/@mkbabb/glass-ui/package.json` (4.0.0) `peerDependencies`: `"@mkbabb/value.js": "^0.10.0 || ^0.11.0"` (`peerDependenciesMeta` marks it optional, which is why install succeeds silently). glass-ui **7.0.0** peers `"@mkbabb/value.js": "^4.0.0"`.

Attribution honesty: this file consumes glass-ui and **not** value.js, so it does not itself exercise the mismatch — it is one of the 35 files holding glass-ui 4.0.0 in place. Recorded because the axis names the 0.13 pin, and because the pre-existing violation means the tri-package deadlock (`CENSUS §5 P0`) is not a *future* state; the peer graph is already inconsistent.

---

### C-17 · INFO · route ships unreachable-but-bundled, no `meta`, no DEV gate — prior art, re-confirmed

`router/index.ts:111-115` registers `/demo/shape-extractor` with **no `meta`** while all six sibling routes carry `title` + `description` (`:100-110` shows `/morph`'s). It is absent from `VALID_TABS` (`:29`). Already booked four times — `2026-05-19-refinement-assay/r2-fourier-A-refinement.md:276` (BW-9), `2026-05-27-D-audit/…A4…md:52` (#5), `2026-06-16-M-deep-audit/raw-findings.json:1527`, `D/waves/W4.md:214`. **Re-confirmed unfixed in the live tree.** Recorded, not re-litigated: it is a routing/design carry, not a consumption defect, and the only consumption-relevant slice is that the lazy chunk drags `pencil-boil/src/celestial.ts` into a production build for a tool no user can reach.

---

### C-18 · INFO · two corpus figures are stale or off-by-one against the live tree

1. `formation/fourier/lane-frontend.md:481` — "*`pencil-boil` peer floor | **4 sites** (`SvgFilters.vue:3`, `FourierShapeExtractor.vue:144`, `svg-fourier.ts:11`)*". The count says 4; the enumeration lists **3**, and `grep -rn "pencil-boil" web/src` returns exactly those **3**. Adopt 3.
2. `CENSUS-2026-08-03.md:105,184,220` targets `pencil-boil ^0.11.2` (taken from glass-ui 7.0.0's peer range, which does read `^0.11.2`). **Upstream `/Users/mkbabb/Programming/pencil-boil` is at 0.12.0.** `^0.11.2` does not admit 0.12.0 under semver's `^0.x` rule (`>=0.11.2 <0.12.0`), so glass-ui 7.0.0's own peer range excludes the current pencil-boil. F.W1 needs the glass-ui peer widened or pencil-boil pinned to 0.11.x — a coordination item the census budget does not carry.
3. `lane-frontend.md:42` says "**8 named routes**"; intake `lane-fourier-r3-r6.md` row **X-2** adjudicated this **CONFLICT — Codex correct, census wrong: 9 route records = 7 lazy component + 2 redirect, +1 alias**. This component is one of the 7 lazy component routes. Cited, not re-derived; my read of `router/index.ts` agrees with X-2.

---

## §3 — Overlap ledger with the adjudicated corpus

| This finding | Corpus row | Relation |
|---|---|---|
| C-1 | `CENSUS-2026-08-03.md:104-106` (uplift break surface) | **CONTRADICTS** — Button's prop-model break (99 callsites / 6 hard type errors) is absent from the enumeration |
| C-2 | `2026-06-16-M-deep-audit/raw-findings.json:1700` (open question on golden-file drift) | **ANSWERS + PROMOTES** — the comparison target is gitignored, so no golden check is constructible |
| C-5 | M-audit `SE-05` / `raw-findings.json:1572` ("0 grep hits") | **CONFIRMS, still true** after `262c3d0`; adds the `if (el)` gating and the `getElementById` document-scope hazard |
| C-8 | M-audit `raw-findings.json:1549` ("a betting line, not a signal") | **CONFIRMS + EXTENDS** — adds the unconsumed in-repo `lib/scheduler.ts` floor and the zero-keyframes fact |
| C-13 / C-18.2 | `lane-frontend.md:481`, `CENSUS:105,184,220` | **CORRECTS** — 3 sites not 4; upstream is 0.12.0, outside glass-ui 7's `^0.11.2` |
| C-17 | `r2-fourier-A-refinement.md:276` (BW-9), `D-audit A4 #5`, `D/waves/W4.md:214` | **RE-CONFIRMS UNFIXED**, not re-litigated |
| — | intake `lane-fourier-r3-r6.md` X-2 (route count 9) | **ADOPTED AS FACT**, tree agrees |
| — | intake `lane-fourier-r3-r6.md` R3-10 (six dynamic `:is` families) | **NOT APPLICABLE** — this component has no dynamic `:is` |
| C-4 / C-14 | `lane-frontend.md:190` (`lib/svg-contours.ts` 58 LOC), `:174` (component 191 LOC) | inventory rows confirmed exactly |

---

## §4 — Superlatives (L-18, same evidentiary bar)

**S-1 · The consumed pencil-boil geometry is bit-for-bit stable across the pending 0.4.1 → 0.12.0 bump.**
`diff -u web/node_modules/@mkbabb/pencil-boil/src/celestial.ts /Users/mkbabb/Programming/pencil-boil/src/celestial.ts` → **two hunks: an import-specifier extension (`'./random'` → `'./random.js'`) and a removed trailing blank line.** `diff` of `random.ts` (the `mulberry32` this all closes over) → **exit 0, identical**. `src/index.ts` at 0.12.0 still re-exports `{ wobbleDiamond, wobbleStarPolygon, generateSunRays }` under the same names with unchanged signatures. Therefore the RNG draw order, the ten-ray loop, and every `toFixed(1)` are unchanged, and **the canonical shapes — and the fixtures derived from them — survive F.W1 unaltered.** This is the single largest latent risk in the file (a fixture regenerated post-bump silently differing from the shipped one) and the tree closes it.
*Falsifier:* any change to `mulberry32`, to draw ordering, or to rounding. Diffed both files in full; none.

**S-2 · The file's F.W2 value.js migration surface is exactly ∅.**
`CENSUS §4 F.W2` budgets "*5 bare specifiers → `/easing`, delete the `colors.ts` hand-rolled arms*". The five bare-specifier sites are `ConvergencePlot.vue:5`, `useCurveTransition.ts:8`, `equation/lib/harmonics.ts:5`, `lib/easings.ts:9,16` — **this file owns none of them**, imports no value.js symbol, and touches no `lib/colors.ts` arm (`cssVarToHex`/`hslToHex`/`rgbToHex`). Its colours are SVG presentation attributes (`stroke="red"`), which is a *design* debt (C-17's neighbours, already booked four times) but a *consumption* zero. When F.W2 runs, this file needs no edit.
*Falsifier:* any `@mkbabb/value.js` or `@/lib/colors` import. `grep` over the file: none.

**S-3 · The glass-ui import is the correct subpath idiom, and the subpath itself survives 4 → 7 untouched.**
`:143` imports from `@mkbabb/glass-ui/button`, not the `.` barrel — the tree-shaking-correct form, and the form the repo uses consistently (35 files). The subpath's export shape is *identical* at both versions: 4.0.0 `{"types":"./dist/button.d.ts","import":"./dist/button.js"}` vs 7.0.0 `{"types":"./dist/button.d.ts","import":"./dist/button.js"}`. The module specifier requires no migration at all; only the props inside it break (C-1). Credit where due: the packaging consumption is right, and it is precisely *because* it is right that a subpath-diff census could not see C-1.
*Falsifier:* a removed or renamed `./button` subpath at 7.0.0. Read both `package.json` export maps; unchanged.

**S-4 · The polygon branch preserves exact authored vertices where a uniform sampler would generically lose every corner.**
`svg-contours.ts:30-35` reads `SVGPolygonElement.points` directly instead of routing through `getPointAtLength`. For a closed polygon of perimeter `L` sampled uniformly at `n` points, a vertex is captured only when its arc-length is an exact multiple of `L/n` — generically never. By reading the vertex list, the 4 diamond corners and 10 star points land in the fixture **exactly as authored**. Verified in the output: `sun[3..5]` are length 4 and `moon[2..4]` are length 10, i.e. vertex-exact, with the wobble offsets from `celestial.ts:12-18` intact to the tenth. This is a real piece of geometric judgement in a 58-line file.
*Falsifier:* the branch could have fallen through to `getPointAtLength` — it does not; and the emitted lengths (4/10, not 128) prove the vertex path ran. **Stated with its limit:** the benefit does not survive `resample_arc_length(stitched, 512)` downstream (C-14), which is a seam defect, not a defect in this decision.

---

## §5 — What a fix has to touch (ordering, not a plan)

1. **C-2 before anything else.** Track `precompute_svg_fourier.py` (one `.gitignore` negation line) and either track `raw-contours.json` or make the extractor write it deterministically. Until the pipeline is in the repo, no other finding here is verifiable by regeneration, and C-1's post-bump fixture question cannot be answered empirically (S-1 answers it by source diff, which is the only reason it is currently closed).
2. **C-1 is F.W1-blocking and is 99 callsites wide, not 1.** The `variant → emphasis` + `size` re-arming needs a mapping table authored once and applied repo-wide; this file is the cheapest place to prototype it (one button, no visual contract).
3. **C-3 + C-4 are one change**: give the contour a type that carries closure and honours its own sampling parameter. Everything downstream (`pointsToSvgPath`'s `closed = true` default, `order_contours`' stitching) is already shaped to consume it.
4. **C-5 + C-15** collapse into: give the producer a named exported interface, emit it through a `ref` and a `data-testid`, delete the `any` at both ends.

## §6 — `UNPROVEN-NEEDS-LIVE` register (SS-13)

| # | Claim | What a live run would settle |
|---|---|---|
| L-1 | C-8: whether the 200 ms wager ever loses on a cold/CPU-throttled load | Throttled navigation to `/demo/shape-extractor`, compare emitted contour lengths against `[20,123,128,4,4,4,16,16]` / `[128,128,10,10,10,16,16,16]` |
| L-2 | C-1(2): that `variant="default"` renders as a literal DOM attribute at glass-ui 7 rather than erroring | Build against 7.0.0 and inspect the rendered `<button>` |
| L-3 | C-12: that `id` survives glass-ui 7's `Button` as a single-root fallthrough | Render at 7.0.0, assert `#extract-btn` resolves |
| L-4 | C-2: that today's extractor still reproduces `raw-contours.json` byte-for-byte (S-1 makes it *likely*; only a run makes it *true*) | Run the route, diff against the on-disk artifact |
