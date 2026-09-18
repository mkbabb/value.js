claude-opus-5[1m]

# CHALLENGE · `PathPreview.vue` · axis **C — CONSUMPTION**

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/ui/PathPreview.vue` (69 lines, clean/committed at audit time)
**Axis** how this component consumes value.js 0.13 / keyframes 4.3 / glass-ui ^4.0.0 / the 45-operation fourier API; props+emits contract; integration seams.
**Posture** assumed DEFECTIVE until the tree proved otherwise. Every claim below carries its own falsifier.
**Method** static + source-derived only. No browser. Read whole: the target, its every import, its only importer, its only-ever production call site (via git), the API types + client, the color chain, both tsconfig/CI gates.

---

## §0 — The headline

`PathPreview.vue` imports **exactly one thing**: `computed` from `vue` (`PathPreview.vue:2`). It consumes **zero** of the four surfaces this axis exists to examine — no value.js, no keyframes.js, no glass-ui, no API type, no client function.

That is not, by itself, a defect (see **S-4**). The defect is what the reachability check found:

> **`PathPreview` has no render site anywhere in the fourier tree.** Its sole reference in the entire repository is a **dead import** at `GalleryCard.vue:10`. The component's consumption of every dependency surface is zero because *the component itself is not consumed.*

The hitherto corpus inventoried this file **four separate times** and rated it *"genuinely bespoke — no flag"*. It audited the file; it did not audit the graph. §5 states that contradiction explicitly.

**Tally — defects 13 · blockers 1 · superlatives 4.**

---

## §1 — Findings

### C-1 · **BLOCKER** · The component is unreachable; its only reference is a dead import

**Provenance**
- Sole reference in tree: `web/src/components/visualization/gallery/GalleryCard.vue:10` — `import PathPreview from "@/components/ui/PathPreview.vue";`
- `GalleryCard.vue` template spans lines 64–187. It renders `Checkbox`, `<img>`, `Badge`, `Button`, `Eye`, `Heart`, `Crown`, `Bookmark`, `Trash2`. It does **not** render `<PathPreview>`.
- Repo-wide: `grep -rn "<PathPreview\|<path-preview" --include="*.vue"` → **exit 1, zero matches.**
- No global registration: `web/src/main.ts` is 11 lines and calls only `app.use(createPinia())` / `app.use(router)`; `grep -rn "app.component\|globalProperties\|unplugin\|Components(" src/ vite.config.ts` → **zero matches.** No auto-import plugin exists.

**History (the fossil record)**
| commit | event |
|---|---|
| `ffeca1b` (2026-03-09) | Born. Rendered in the `AppHeader.vue` share tooltip. |
| `7721484` | `ShareButton.vue` extracted from `AppHeader`; usage moves with it. |
| `4340ac8` (2026-03-15) | Marquee gallery. `GalleryView.vue:388-396` renders it as *"primary visual (not source image)"* — **the only production call site this component ever had.** |
| `eefa318` | Gallery re-architected into `GalleryCard.vue`. The new card carried the **import at line 7 and never a tag** — `git show eefa318:…/GalleryCard.vue \| grep -in "pathpreview\|path-preview"` returns **only the import line.** Dead from birth in this file. |
| `a459a56` (2026-03-16) | `ShareButton.vue` deleted ("Delete unused ShareButton component"). Last live render site gone. |

So the component has been unreachable since **2026-03-16** — roughly five months — surviving 10+ commits across `GalleryCard` and every audit wave (`A.W2.e`, `A.W3.b`, `A.W5.c`, `C.W4`, `D.W4`, `G.W4`, `J.W3+W4`, `262c3d0` "3.1.0 adoption").

**Why no gate caught it → see C-10.**

**Falsifier** *"It is registered globally, or resolved dynamically, or referenced from a non-`.vue` surface."* — **Refuted three ways:** (a) `main.ts` performs no component registration and no auto-import plugin is configured; (b) an unrestricted repo-wide `grep -rn "PathPreview"` returns exactly three hits — the dead import, plus two *documentation* mentions (`docs/audits/runs/2026-05-27-D-audit/DA6-guard-thread-scoping.md:77` and `docs/audits/runs/2026-06-16-M-deep-audit/raw-findings.json:1172`), neither of which is code; (c) `<script setup>` exposes bindings to the template only — an unrendered binding cannot mount.

**Scope honesty (bundle):** the *source-level* deadness is CONFIRMED. Whether the dead module is fully eliminated from the shipped bundle is **UNPROVEN-NEEDS-LIVE (SS-13)** — `web/package.json` declares no `sideEffects` field, and the SFC carries a `<style scoped>` block (`PathPreview.vue:64-69`) which compiles to a side-effectful CSS import that Rollup normally retains. The likely live state is *"the `.path-preview` CSS rule ships, the component code is shaken."* I do not claim the byte count without a build.

---

### C-2 · **MAJOR** · Stroke normalization is coupled to a `size` prop that CSS silently overrides — demonstrated broken at the component's only-ever call site

`PathPreview.vue:56` — `:stroke-width="strokeWidth / size"` — against `viewBox="0 0 1 1"` (`:52`). The technique is correct *in principle* (S-2): to render `strokeWidth` CSS px inside a 1-unit viewBox, the user-space stroke must be `strokeWidth / renderedSizeInPx`.

The contract breaks because `size` governs the stroke divisor but **cannot** govern the rendered size. `:width="size"` / `:height="size"` (`:50-51`) are SVG **presentation attributes**, which any CSS `width`/`height` declaration outranks. The component's own scoped style (`:65-68`) sets neither, so it defends nothing.

**This is not hypothetical — it is what the only production caller did.** At `4340ac8`, `GalleryView.vue:388-396` passed `:size="240" :stroke-width="2.5" class="card-path-primary"`, and `GalleryView.vue:850-855` defined:

```css
.card-path-primary { width: 100%; height: 100%; opacity: 0.8; pointer-events: none; }
```

So the stroke divisor was calibrated for 240px while the element rendered at the flex parent's width. The declared `strokeWidth: 2.5` rendered at `2.5 × (actualPx / 240)` — never 2.5px except by coincidence. **The component's single consumer used it wrongly, and the API gave it no way to notice.**

**Falsifier** *"Presentation attributes win over the stylesheet, so `size` did govern."* — **Refuted by CSS cascade order:** presentation attributes are specificity-0 and sit at the bottom of the author origin; any author rule (here a class selector) overrides them. This is why `<svg width>` is routinely overridden by CSS in responsive layouts. A design that wanted `size` to be authoritative would set it in the scoped style (`width: calc(var(--size) * 1px)`), or would derive the stroke from a `vector-effect="non-scaling-stroke"` instead of a manual divisor.

**Fix shape (not applied):** `vector-effect="non-scaling-stroke"` makes `stroke-width` resolve in *screen* units regardless of viewBox and regardless of CSS sizing — deleting the `size` coupling entirely and making `size` a pure layout hint.

---

### C-3 · **MAJOR** · The props contract mirrors no shape the fourier API emits

`PathPreview.vue:6-7` declares two parallel arrays:
```ts
pathX: number[];
pathY: number[];
```

Every path carrier in the fourier API is a **single object**:
| carrier | file:line | shape |
|---|---|---|
| `EpicycleData.path` | `web/src/lib/types.ts:26` | `{ x: number[]; y: number[] }` |
| `EpicycleData.trace` | `types.ts:25` | `{ x: number[]; y: number[] }` |
| `ContourAsset.points` | `types.ts:80` | `{ x: number[]; y: number[] }` |
| `AnimationData.original` | `types.ts:15` | `{ x: number[]; y: number[] }` |
| `AnimationData.partial_sums[b][n]` | `types.ts:17` | `{ x: number[]; y: number[] }` |

Five carriers, one shape, and the component matches none of them. The impedance shows in the only real call site, which had to hand-destructure a value it had already narrowed:
```
4340ac8 GalleryView.vue:390-391
    :path-x="getPathData(item)!.x"
    :path-y="getPathData(item)!.y"
```
with `getPathData` (`4340ac8 GalleryView.vue:173-177`) returning exactly `{ x: number[]; y: number[] } | null`. A prop typed `path: { x: number[]; y: number[] }` would have made this `:path="getPathData(item)!"` — one binding, one null-check, no possible desync (which is also the cure for C-4).

**Falsifier** *"Split arrays match the house idiom — `drawGhostPath(surface, view, pathX, pathY)` takes them split too."* — **Partially true and worth conceding:** `ghost-path.ts:10-11` does take `pathX: number[], pathY: number[]`. But that is a *positional-argument* function where object-vs-split is a style choice, and it is fed from the same `{x,y}` carriers, so it inherits the same destructure tax. The falsifier does not rescue the *component* case, where Vue props are already a named-bag: splitting an atomic wire object into two independent props discards the API's own invariant for no gain. The house idiom is the API's, and it is `{x, y}`.

---

### C-4 · **MAJOR** · No length-agreement invariant → silent `NaN` in the `d` attribute

`PathPreview.vue:23` guards **emptiness only**:
```ts
if (!pathX.length || !pathY.length) return "";
```
Then `:37-41` maps over `pathX` while indexing `pathY`:
```ts
const pts = pathX.map((x, i) => {
    const sx = 0.5 + (x - cx) * scale;
    const sy = 0.5 - (pathY[i] - cy) * scale; // flip Y
    return `${sx.toFixed(4)},${sy.toFixed(4)}`;
});
```
If `pathY.length < pathX.length`, `pathY[i]` is `undefined` → `(undefined - cy)` is `NaN` → `NaN.toFixed(4)` is the **string `"NaN"`** → the emitted `d` is `M0.5000,NaNL…Z`. `:60` renders `<path v-if="svgPath" :d="svgPath" />` — `svgPath` is a non-empty string, so the guard passes and an **invalid path attribute** is committed to the DOM. Browsers discard the malformed segment silently: no throw, no console error, no Vue warning. A blank thumbnail, indistinguishable from "no data".

The same poison enters from the data side: a single non-finite coordinate anywhere in `pathX` makes `Math.min(...pathX)` (`:25`) `NaN`, which propagates through `rangeX` (`:29` — note `NaN || 1` is `1`, so the degenerate guard does *not* rescue it), `cx` (`:34`), and every point. One bad sample blanks the whole preview.

Two independent `number[]` props give TypeScript nothing to enforce; only the caller's discipline stands between the component and this state, and there is no dev-mode assertion.

**Falsifier** *"The arrays always come from one `{x, y}` object, so they are always equal-length by construction."* — **True of today's producers, and precisely the argument for C-3.** But it is a convention the type system does not encode and the component does not check, and the component's contract is public: `pathX`/`pathY` are separate required props, so any future caller may satisfy the types while violating the invariant. Adopting the `{x, y}` prop of C-3 collapses C-4 to impossible-by-construction — which is the cheapest fix in this document.

---

### C-5 · **MAJOR** · Unconditional `Z` contradicts the house path-rendering contract

`PathPreview.vue:43`:
```ts
return `M${pts.join("L")}Z`;
```
The path is **always** closed. The tree's other path renderer for the identical data makes closure an explicit, defaulted-off parameter:

```
web/src/components/visualization/lib/canvas-drawing/ghost-path.ts:7-13, 27
export function drawGhostPath(surface, view, pathX, pathY, closePath = false)
…
if (closePath) ctx.closePath();
```
with the doc comment at `ghost-path.ts:5` — *"Whether to close the path (epicycle mode closes it)"*. Closure is a **mode-dependent** property in this codebase: epicycle reconstructions are closed loops; basis expansions over a domain are not. `BasisDecomposition.domain: [number, number]` (`types.ts:11`) and `AnimationData.eval_points` (`:18`) describe open intervals, and `AnimationData.original` / `partial_sums` (`:15,:17`) are exactly the `{x,y}` carriers a series-mode preview would use.

`PathPreview` exposes no `closePath` prop, so a series-mode preview gets a spurious chord from last point back to first. Its historical caller fed it `item.epicycleData?.path ?? item.basesData?.original` (`4340ac8 GalleryView.vue:176`) — the `??` right-hand branch is exactly the open-contour case, rendered closed.

**Falsifier** *"Contours are closed loops by construction, so `Z` is always right."* — **Refuted by the sibling's own default:** `drawGhostPath` defaults `closePath = false` and the comment names epicycle mode as the *exception*, not the rule. Had all contours been closed, the parameter would not exist and the default would be `true`. The two renderers for the same data disagree on its most basic geometric property.

---

### C-6 · **MAJOR** · The color seam `strokeColor` consumes is broken: basis colors are frozen at hardcoded fallbacks and never track theme

`strokeColor?: string` (`PathPreview.vue:10`, default `"currentColor"` at `:16`) is the component's only color surface. Its historical supplier was `getPathColor` (`4340ac8 GalleryView.vue:179-186`), which resolves `basisDisplay[key]?.color ?? VIZ_COLORS.fourier`. That chain is defective **today**:

```
web/src/components/visualization/lib/basis-display.ts:1-7
import { VIZ_COLORS } from "@/lib/colors";
export const basisDisplay: Record<string, {icon; label; color}> = {
    fourier:   { …, color: VIZ_COLORS.fourier },     // ← read at MODULE EVAL
    chebyshev: { …, color: VIZ_COLORS.chebyshev },
    legendre:  { …, color: VIZ_COLORS.legendre },
};
```

`VIZ_COLORS` is `reactive({ fourier: "#bf4040", chebyshev: "#3d72b8", legendre: "#9545b8", … })` (`lib/colors.ts:77-87`) — hardcoded fallbacks. The real values arrive by **mutation**:

```
lib/colors.ts:90-96   resolveVizColors() { VIZ_COLORS.fourier = cssVarToHex("--viz-fourier"); … }
App.vue:10-18         onMounted(() => { resolveVizColors();
                          new MutationObserver(() => resolveVizColors())
                            .observe(document.documentElement, {attributeFilter:["class"]}); })
```

`basis-display.ts` is a module-eval-time **property read** that copies three primitive strings into a **new, non-reactive plain object**. `resolveVizColors()` runs in `onMounted` — strictly after module evaluation. Therefore `basisDisplay.*.color` is permanently `#bf4040` / `#3d72b8` / `#9545b8`, never `--viz-*`, and the dark-mode `MutationObserver` (`App.vue:13`) — whose entire purpose is theme repaint — **cannot reach it**. The reactivity is severed by value-copy at the one place it needed to survive.

**Blast radius: 7 live consumers**, including PathPreview's own dead importer:
`GalleryCard.vue:40` (basis pill `--pill-c`, `:121`) · `GalleryCardModal.vue:45` · `BasisSelector.vue:139` · `BasisCanvas.vue:251` · `GallerySearchBar.vue:31` · `GalleryDraftsSection.vue:44` · `canvas-drawing/labels.ts:30`.

**Attribution honesty:** the defect is located in `basis-display.ts:4-6`, **not** in `PathPreview.vue`. It is reported on this axis because it is the designated supplier for PathPreview's only dependency-bearing prop, and because any revival of the component (§3) inherits it. Do not book it against the target file.

**Falsifier** *"`basisDisplay` is read inside `computed()`s (e.g. `GalleryCard.vue:36-51`), so Vue re-evaluates and picks up new values."* — **Refuted:** a `computed` re-runs only when a *tracked reactive dependency* changes. `basisDisplay` is a bare `export const` plain object; reading `cfg.color` from it registers no dependency and the object is never reassigned. The computed re-runs when `props.entry` changes and reads the same stale literal every time. (Corroborating tell: `basisDisplay` is typed `Record<string, {…}>` with no `reactive`/`computed`/getter wrapper anywhere in its 7 lines.)

**Relation to the corpus:** lane-docs.md:474 books `W.L5` as *"delete `cssVarToHex`/`hslToHex`/`rgbToHex`/`hexToRgb`/`hexToRgba` (`colors.ts:22-117`) … **NOT EXECUTED**"*. C-6 sharpens that work order: swapping the hand-rolled parsers for value.js 0.13 **will not fix these colors**, because the break is in the *routing* (value-copy at module eval), not the parsing. W.L5 must re-derive `basisDisplay` as a `computed`/getter, or the migration lands a correct parser behind a severed wire.

---

### C-7 · **MINOR** · `padding` is not the fraction it names, and does not budget the stroke

`PathPreview.vue:33`:
```ts
const scale = 1 / (Math.max(rangeX, rangeY) * (1 + padding * 2));
```
The resulting margin is `p / (1 + 2p)` of the viewBox, not `p`. At the default `padding: 0.1` (`:17`) the shape's half-extent is `0.5/1.2 = 0.4167`, spanning `0.0833…0.9167` — an **8.33%** margin from a prop that reads as 10%. Callers tuning a visual gap must solve `p = m/(1-2m)` to get the margin they want.

Separately, SVG strokes are centered on the path, so half the stroke extends beyond the geometry — and `padding` does not account for it. The clip condition is `strokeWidth/size > 2p/(1+2p)` (≈ `0.167` at defaults): safe for the shipped defaults (`1.5/64 = 0.023`) and for the historical call (`2.5/240 = 0.010`), but a caller passing `strokeWidth: 12, size: 64` clips silently.

**Falsifier** *"`padding` is documented as a scale-divisor knob, not a margin fraction."* — **Refuted:** the only documentation is the inline comment at `:32`, *"Fit into [0, 1] with uniform scale + padding"*, which reads as a margin. The prop name carries the CSS meaning of `padding` (a length/fraction of the box). No JSDoc, no unit note, no docblock exists on the component at all.

---

### C-8 · **MINOR** · Unbounded spread on API-controlled array length

`PathPreview.vue:25-28` uses `Math.min(...pathX)` / `Math.max(...pathX)` four times. Spread-as-arguments is bounded by the engine's argument limit (V8: ~65k–125k, and it is a *stack* limit, so it throws `RangeError`, not a graceful degradation).

The array length is API-controlled and **unbounded server-side**:
```
api/models/shared.py:13        n_points: int = 1024
api/models/computation.py:45   n_points: int = 1024
api/models/computation.py:50   n_points: int = 1024
```
Bare `int` with a default — **no** `Field(ge=…, le=…)`, no validator. The contour is resampled to exactly this count (`api/routers/images.py:257` `path = resample_arc_length(path, cs.n_points)`; `api/services/computation.py:108,145` likewise), and `ContourSettings.n_points` is a client-supplied field on the request body (`types.ts:34`, `api/routers/contours.py:39,50,61,73`). So the client chooses `pathX.length`, and nothing on either side caps it.

The default 1024 (`web/src/lib/defaults.ts:8`) is comfortably safe. This is a robustness gap, not a live break.

**Falsifier** *"1024 is the only value ever used, so the spread is safe."* — **Conceded for the default path**, which is why this is MINOR and not MAJOR. But `n_points` is a user-editable contour setting round-tripped through `ContourSettings`, and the server accepts any `int`. `reduce`/loop-based min/max costs one line and removes the cliff entirely. Note also the same 4× full-array scan is redundant: one pass can yield all four extrema.

---

### C-9 · **MINOR** · No accessible name, no `aria-hidden` — and it was the *primary* card visual

The `<svg>` (`PathPreview.vue:48-61`) carries no `role`, no `<title>`, no `aria-label`, and no `aria-hidden="true"`. An unlabeled inline `<svg>` is exposed to the a11y tree in several engines as a nameless graphic.

Either disposition would be defensible — but the component must pick one, and its history shows it needed the *labeled* one: commit `4340ac8`'s body states **"Cards show PathPreview as primary visual (not source image)"**, i.e. it replaced the `<img>` (whose `:alt` the current card still supplies at `GalleryCard.vue:101`). A decorative-by-default preview that gets promoted to primary content with no way to name it is an unmet contract.

Contrast the house standard elsewhere in the same card: `role="button"` + `tabindex` + `:aria-label` (`GalleryCard.vue:72-74`), `:aria-label` on the checkbox (`:92`), `:aria-pressed` on the like button (`:140`) — all landed by `D.W4.c` / `A.W5.c` per the comments at `:65-69` and `:82-84`. `PathPreview` never received that sweep.

**Falsifier** *"It is decorative; the card's own `aria-label` names the entry."* — **True in the current (dead) wiring, false in the wiring it was built for.** If decorative is the intent, the fix is a one-attribute `aria-hidden="true"` that makes the intent explicit and machine-checkable; the component states nothing, which is the finding. **UNPROVEN-NEEDS-LIVE (SS-13)** for the exact per-engine AX-tree exposure.

---

### C-10 · **MINOR** · No gate in the repository can detect C-1

The dead import survived five months because nothing looks for it:

| gate | state | provenance |
|---|---|---|
| `noUnusedLocals` | **absent** | `web/tsconfig.json` — full `compilerOptions` read; sets `strict`, `noEmit`, `isolatedModules`, `verbatimModuleSyntax`, `skipLibCheck`, but neither `noUnusedLocals` nor `noUnusedParameters`. |
| ESLint / oxlint / biome | **absent** | no config file at any depth in `web/`; no `lint` script in `web/package.json` (scripts are exactly `dev`, `build`, `preview`, `test:e2e`, `test:e2e:ui`). |
| knip / depcheck / unimported | **absent** | `grep -rn "knip\|depcheck\|unimported" package.json` → zero. |
| CI | typecheck + build only | `.github/workflows/ci.yml:95` `npx vue-tsc -b --force`, `:98` `npm run build`; `.github/workflows/deploy-pages.yml:114` same. |

`vue-tsc` without `noUnusedLocals` emits no diagnostic for an unused binding, and `vite build` tree-shakes silently by design. **The dead import is invisible to every check the project runs.** This is the mechanism finding behind C-1 and generalizes: any other dead component import in this tree is equally undetectable.

**Falsifier** *"`vue-tsc` flags unused component imports in `<script setup>` regardless."* — **Refuted structurally:** `noUnusedLocals` is the flag that produces TS6133, and it is not set; absent it, TypeScript emits nothing for unused bindings. (Additionally, `<script setup>` compiles bindings into a template render context, which historically suppresses even the flagged diagnostic for components — so enabling the flag alone may be insufficient; a Vue-aware unused-component rule is the reliable gate.) **UNPROVEN-NEEDS-LIVE** for the exact `vue-tsc@3.3.5` behavior *were* the flag enabled; the finding as written — that no configured gate detects it — is CONFIRMED from config alone. I deliberately did **not** run `vue-tsc -b`, which would write `.tsbuildinfo` into the read-only evidence repo.

---

### C-11 · **INFO** · Peer-range violation opened by the in-flight F.W2 bump (repo-level, *not* a PathPreview defect)

`web/package.json` is **uncommitted-modified** and carries the F.W2 migration:
```
-  "@mkbabb/glass-ui": "^3.1.0"      →  +"^4.0.0"
-  "@mkbabb/keyframes.js": "^2.2.0"  →  +"^4.3.0"
-  "@mkbabb/value.js": "^0.10.0"     →  +"^0.13.0"
```
But `glass-ui@4.0.0` declares (`web/package-lock.json:338`):
```json
"@mkbabb/value.js": "^0.10.0 || ^0.11.0"
```
while the tree resolves **value.js 0.13.0** (`package-lock.json:15`; `node_modules/@mkbabb/value.js/package.json` → `"version": "0.13.0"`). `0.13.0` satisfies neither range. npm is silent because the peer is declared **optional** (`package-lock.json:357-358`, `peerDependenciesMeta`). Note also the axis brief says "0.13 **pinned**" — the manifest actually specifies the caret range `^0.13.0`, which for a 0.x major floats across `0.13.x`.

Recorded here because it is a genuine consumption-surface fact this lane surfaced; **it is not attributable to `PathPreview.vue`**, which imports neither package. Route to the F.W2 owner.

**Falsifier** *"Optional peers make the range advisory."* — Optional controls whether npm *installs/errors*; it does not make the declared compatibility window true. glass-ui@4.0.0 asserts it was built against value.js ^0.10||^0.11; running it on 0.13.0 is outside its declared support, silently.

---

### C-12 · **INFO** · Mutual dead capability — the client preview is dead *and* the server's preview field is always empty

`ContourAsset.preview_path: string` (`types.ts:77`) is a declared server-side contour-preview surface. It is never populated:
- `api/models/assets.py:85` — `preview_path: str = ""`
- `api/services/image_storage.py:318` — `"preview_path": ""` (hardcoded literal at write time)
- `api/responses.py:22` — `preview_path=asset.get("preview_path", "")`
- No generator: `grep -rn "preview" api/services/contour_storage.py api/routers/contours.py` → **zero matches.**

So the capability *"show a contour preview"* is dead on **both** sides of the seam simultaneously: the client component is unreachable (C-1) and the operation field is always `""`.

This is adjacent to, but structurally distinct from, intake row **R6-8** (`lane-fourier-r3-r6.md:142`), which established that an operation record embedding derived client back-references cannot attribute a defect to one side. Here there is no coupling to blame — both leaves are independently, silently empty, and no conformance check exists that would notice a capability with zero implementation on either side. **Carry candidate for F.W5** alongside R6-8: the shared-provenance contract needs a *liveness* predicate (is this leaf ever populated / ever rendered?), not only an identity/isolation predicate.

**Falsifier** *"`preview_path` is populated by a migration or worker outside `api/`."* — Not found: the only three writes in the tree are the empty-string literals above, and the field's model default is `""`.

---

### C-13 · **INFO** · Barrel/subpath specifier inconsistency in the only importer

`GalleryCard.vue:3-5`:
```ts
import { Button }   from "@mkbabb/glass-ui/button";   // subpath
import { Badge }    from "@mkbabb/glass-ui/badge";    // subpath
import { Checkbox } from "@mkbabb/glass-ui";          // bare barrel
```
One file, three imports, two conventions — the barrel pulls the full entry graph for a single primitive. The tree is split repo-wide: `CollapsibleSection.vue:2` uses the barrel, `SliderControl.vue:24` uses `/slider`, `App.vue:5` uses `/toast`. Relevant to this axis as the *counterfactual* consumption idiom PathPreview would have had to choose had it consumed glass-ui at all; not a PathPreview defect.

---

## §2 — Superlatives (L-18 runs both ways)

### S-1 · The normalization geometry is correct, and correctly needs no library
`PathPreview.vue:25-39` is a textbook fit-to-unit-box:
- **Uniform scale** from `Math.max(rangeX, rangeY)` (`:33`) — preserves aspect ratio. The naive bug here is scaling X and Y independently, which shears every non-square contour; this code does not make it.
- **Bbox centering** `cx = (minX+maxX)/2` (`:34-35`) then `0.5 + (x-cx)*scale` (`:38`) — exact centering for any input, including asymmetric contours.
- **Degenerate-range guards** `rangeX = maxX - minX || 1` (`:29-30`) — a perfectly horizontal or vertical contour would otherwise divide by zero; the `|| 1` collapses it to a centered line rather than `NaN`. This is a real edge case (a straight-edge contour) and it was anticipated.
- **Y-flip** `0.5 - (pathY[i]-cy)*scale` (`:39`) with the comment `// flip Y` — image/contour space is Y-down from OpenCV, SVG user space is Y-down too, but the *decomposition* output is math-convention Y-up (`api/services/computation.py:79` emits `c.real`/`c.imag` — complex-plane, Y-up). The flip is correct and, notably, is the one line most likely to be wrong in a hand-rolled preview.

Four independent chances to be subtly wrong; zero taken. **Falsifier:** *"the uniform scale is wrong — it should fit each axis."* Refuted: fitting each axis independently is non-conformal and would distort every contour; `max()` is the correct `contain` semantic.

### S-2 · Unit-viewBox stroke normalization is the right *idea*
`viewBox="0 0 1 1"` (`:52`) + `preserveAspectRatio="xMidYMid meet"` (`:53`) + `:stroke-width="strokeWidth / size"` (`:56`) is a coherent, resolution-independent design: geometry in normalized space, stroke re-expressed in that space so it reads as CSS pixels. Most hand-rolled previews either hardcode a pixel viewBox (losing resolution independence) or forget the stroke divisor entirely (getting hairlines that scale with content). This one reasoned it through. C-2 faults the *enforceability* of the coupling, not the concept — and the concept is one `vector-effect` attribute away from being airtight.

### S-3 · `.toFixed(4)` is a deliberate, well-chosen precision floor
`:40` — at a 1-unit viewBox, 1e-4 is sub-pixel for any rendered size below 10 000 px, so the quantization is invisible at every plausible preview scale. It also bounds each point at ~13 bytes of `d`-string instead of the ~35–40 bytes raw float serialization produces (`0.5000000000000001`-class output), a ~3× payload reduction on a default 1024-point contour with no visible loss. A naive implementation interpolates raw floats; this is the considered choice. **Falsifier:** *"4 dp loses fidelity on dense contours."* Refuted by scale: adjacent resampled points on a 1024-point contour in a unit box are ~1e-3 apart — an order of magnitude above the quantum.

### S-4 · Zero dependency surface is, for *this* component, arguably right
The census's *"genuinely bespoke — no flag"* (`lane-frontend.md:444`) is correct about the bespokeness, and this challenge concedes the point: there is no glass-ui analogue for an SVG path thumb; `currentColor` (`:16`) is a genuinely superior default to any parsed color because it inherits theme for free through CSS — **strictly better than the `basisDisplay` chain that C-6 shows to be broken**; and the component needs no animation, so keyframes 4.3 would be dead weight. A component that consumes nothing is not automatically under-integrated. The finding of this lane is not *"it should import more"* — it is C-1: **it is not imported at all.**

---

## §3 — The revival path (what any fix must consume)

Should the mega-tranche restore the preview rather than delete the file, the consumption surface it must acquire is now known:

1. **Data reachability is the blocker.** `GalleryCard`'s prop is `entry: Visualization` (`GalleryCard.vue:20`), and `Visualization` (`types.ts:207-239`) carries **no path arrays** — only `contour_hash: string` (`:213`), an asset FK. `listVisualizations` (`api/lib/api.ts:397-414`) embeds nothing further. The card structurally *cannot* render the component from its own props, which is very likely why the tag was dropped at `eefa318` while the import was not.
2. **The reachable operation** is `getContour(contourHash)` → `ContourAsset` (`api.ts:326-328`, `operation:GET:/api/contours/{contour_hash}`), whose `points: {x, y}` (`types.ts:80`) is exactly the payload. But that is **one fetch per card** — an N+1 across the gallery grid, against a route with no batch sibling (the batch endpoints are `POST /admin/visualizations/batch` and `/admin/users/batch`, `api/routers/admin.py:411,451` — neither serves contours).
3. **Therefore the honest fix is server-side**: populate `ContourAsset.preview_path` (C-12), or add path arrays to the list projection. Reviving the client component alone converts a dead import into a gallery-wide request storm.
4. **And the color seam must be repaired first** (C-6), or the revived stroke renders in permanently-stale, theme-blind hardcoded hex.

---

## §4 — Independent corroboration offered back to the corpus

**The 45-operation surface — CONFIRMED.** `CENSUS-2026-08-03.md:332` records *"45 ops ✓"* as live-corroborated. Reproduced independently here from the live tree: `grep -rEn "@[a-z_]*router\.(get|post|patch|put|delete)" api/routers/*.py` → **44** (contours 4 · equations 2 · images 7 · sessions 4 · visualizations 13 · admin 13 · gallery 1), plus `@app.get("/api/health")` at `api/main.py:125` → **45 exactly.** Agreement, not contradiction; and it is worth recording *how* the 45th is reached, since a `^@router\.` pattern alone yields only 30 and would read as a census miss.

---

## §5 — Contradictions with the hitherto corpus (stated explicitly, per Law)

| # | corpus row | its claim | this lane |
|---|---|---|---|
| **X-a** | `formation/fourier/lane-frontend.md:183` / `:366` / `:369` / `:444` | `PathPreview.vue` inventoried four times: *"Bespoke SVG path thumb (no glass-ui analogue)"*, *"3 are glass-ui wrappers, `PathPreview.vue` is bespoke SVG"*, *"Bespoke with no glass-ui analogue"*, and the verdict **"genuinely bespoke — no flag"**. | **CONTRADICTED on the verdict, upheld on the classification.** The bespokeness is correct (S-4). But *"no flag"* is wrong: the component is unreachable (C-1). Every one of the four rows is a **file-level** inventory — a `find`/`ls` over `src/components/ui`, a LOC count, an import-shape read. None performed a reachability check, so a dead component and a live bespoke component are indistinguishable in that method. **Method carry:** a component census must join the file list against render sites, or it will keep rating corpses healthy. |
| **X-b** | `fourier-analysis/docs/audits/runs/2026-06-16-M-deep-audit/raw-findings.json:1172` | *"On card hover, swap the static thumbnail for a lightweight live PathPreview animating the contour trace (**PathPreview is already imported at GalleryCard.vue:10 but only static**)."* | **FACTUALLY FALSE, and consequentially so.** It is not "only static" — it is **not rendered**. Since `eefa318` the import has never had a tag (proven in C-1). The M-audit inferred rendering from an import. Had the proposal been implemented as written — a keyframes-driven hover animation on `<PathPreview>` — it would have targeted a component that never mounts, and (given C-10) the build would have gone green. This is a live example of an import-presence heuristic manufacturing a false positive in fourier's own audit corpus. |
| **X-c** | `intakes/lane-fourier-r3-r6.md:142` (**R6-8**, ADOPT-AS-FACT, CARRY → F.W5) | *"an API-operation model that embeds derived client back-references cannot attribute a defect to one side of the seam."* | **NO CONTRADICTION — extended.** C-12 finds an orthogonal seam failure on the same axis: `preview_path` (operation leaf) and `PathPreview` (client leaf) are both dead, independently and silently. R6-8's cure (keep operation identity independent of client identity) does not detect this; a leaf whose value is always `""` and a component with zero callsites both satisfy any identity/isolation predicate. **Recommend F.W5 carry a *liveness* predicate alongside R6-8's isolation predicate.** |
| **X-d** | `formation/fourier/lane-docs.md:474` (**W.L5**, *NOT EXECUTED*) | *"5 specifiers → `/easing`; delete `cssVarToHex`/`hslToHex`/`rgbToHex`/`hexToRgb`/`hexToRgba` (`colors.ts:22-117`); the declared 3-line hex residual with a deletion date."* | **NO CONTRADICTION — sharpened, and the scope is insufficient.** C-6 shows the basis-color chain is broken *upstream of the parsers*: `basis-display.ts:4-6` value-copies `VIZ_COLORS` at module eval, so `resolveVizColors()` (`App.vue:11`) and the dark-mode observer (`App.vue:13`) never reach it. Replacing the hand-rolled arms with value.js 0.13 leaves a correct parser behind a severed wire, and the 7 consumers keep rendering hardcoded hex. **W.L5 must add: re-derive `basisDisplay` as a `computed`/getter over `VIZ_COLORS`** — otherwise the migration lands green and changes nothing on screen. Cross-ref `lane-docs.md:268` (**I-9 `resolveCssColor` DECLINED**, re-trigger = *"a second hand-rolled context-resolution arm"*): `cssVarToHex`'s four regex arms (`colors.ts:29,31-36,40-43,46-51`) remain that arm, and C-6 adds that even routed correctly it has no `oklch()` branch (consistent with `CENSUS-2026-08-03.md:174`). |

---

## §6 — Disposition

| id | sev | claim | file:line |
|---|---|---|---|
| C-1 | **BLOCKER** | Component unreachable; sole reference is a dead import, dead since `a459a56` (2026-03-16) | `GalleryCard.vue:10`; `PathPreview.vue` whole |
| C-2 | MAJOR | Stroke normalization coupled to a `size` prop CSS overrides — broken at its only-ever call site | `PathPreview.vue:50-51,56`; `4340ac8 GalleryView.vue:850-855` |
| C-3 | MAJOR | Split `pathX`/`pathY` props mirror none of the API's five `{x,y}` carriers | `PathPreview.vue:6-7`; `types.ts:15,17,25,26,80` |
| C-4 | MAJOR | No length-agreement invariant → silent `"NaN"` in `d`; non-finite input poisons all points | `PathPreview.vue:23,25,37-41` |
| C-5 | MAJOR | Unconditional `Z` contradicts the house contract (`drawGhostPath` defaults `closePath=false`) | `PathPreview.vue:43`; `ghost-path.ts:5,12,27` |
| C-6 | MAJOR | `strokeColor`'s supplier chain frozen at hardcoded hex; theme observer severed; 7 consumers | `basis-display.ts:4-6`; `colors.ts:77-96`; `App.vue:10-18` |
| C-7 | MINOR | `padding` yields `p/(1+2p)` margin, not `p`; stroke half-width unbudgeted | `PathPreview.vue:17,33` |
| C-8 | MINOR | Unbounded spread min/max over API-controlled length; `n_points` has no server bound | `PathPreview.vue:25-28`; `api/models/shared.py:13`; `computation.py:45,50` |
| C-9 | MINOR | No accessible name and no `aria-hidden`, though promoted to primary card visual | `PathPreview.vue:48-61`; `4340ac8` commit body |
| C-10 | MINOR | No configured gate can detect C-1 (`noUnusedLocals` absent, no linter, CI = tsc+build) | `tsconfig.json`; `package.json`; `ci.yml:95,98` |
| C-11 | INFO | glass-ui@4.0.0 peer `value.js ^0.10\|\|^0.11` vs resolved 0.13.0; silent (optional peer) | `package-lock.json:15,338,357-358` |
| C-12 | INFO | Mutual dead capability: `preview_path` always `""` on the server, component dead on the client | `assets.py:85`; `image_storage.py:318`; `responses.py:22` |
| C-13 | INFO | Barrel/subpath specifier inconsistency in the only importer | `GalleryCard.vue:3-5` |

**Superlatives** S-1 geometry correct (`:25-39`) · S-2 unit-viewBox stroke idea sound (`:52-56`) · S-3 `.toFixed(4)` a considered precision/payload floor (`:40`) · S-4 zero-dependency is right *for this component* (`:2,:16`).

**Recommended disposition:** the cheapest correct action is **delete `PathPreview.vue` and the dead import at `GalleryCard.vue:10`**, and book C-6 / C-10 / C-12 as independent live defects. If the preview is wanted, §3 is the order of operations — server projection first, color chain second, component third — and the rewrite should take a single `path: {x, y}` prop (killing C-3 and C-4 together), an explicit `closePath` prop (C-5), and `vector-effect="non-scaling-stroke"` (C-2).

**Marked UNPROVEN-NEEDS-LIVE (SS-13):** C-1's bundle-byte consequence · C-9's per-engine AX-tree exposure · C-10's `vue-tsc@3.3.5` behavior *were* `noUnusedLocals` enabled. Every other claim is source-derived and CONFIRMED.

**Law compliance:** `fourier-analysis` was read-only throughout; no build, typecheck, or install was run against it (deliberately, to avoid writing `.tsbuildinfo`). This file is this lane's only write.
