claude-opus-5[1m]

# CHALLENGE · `PathPreview.vue` · axis **D — DESIGN**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/ui/PathPreview.vue` (69 lines)
**Mode** static + source-derived, read-only. No browser tooling. Livable-only claims tagged `UNPROVEN-NEEDS-LIVE (SS-13)`.
**Posture** subject assumed DEFECTIVE until the tree proves otherwise; every claim carries its own falsifier.
**Date** 2026-08-06.

**Import closure read whole (read-only).** The component imports exactly one symbol — `computed` from `vue`
(`PathPreview.vue:2`). It has **no other imports**: no glass-ui, no `@/lib`, no token module, no util. The
closure is therefore the file itself. To ground the design claims I additionally read its only importer
(`GalleryCard.vue`), its only historical renderer (`ShareButton.vue` @ `a459a56^`), its two `ui/` peers
(`SliderControl.vue`, `CollapsibleSection.vue`), the sibling renderer of the *same* data
(`canvas-drawing/ghost-path.ts`), the bbox precedent (`composables/useViewTransform.ts`), the color resolver
its only call site fed it (`lib/colors.ts`), the design law (`web/DESIGN.md`), and the token cascade actually
loaded (`glass-ui@4.0.0 dist/styles/**`).

**Tally — defects 16 (blockers 2) · superlatives 6.**

---

## §0 · Hitherto corpus — what is folded, what is contradicted

| Source | Row | Disposition here |
|---|---|---|
| `formation/fourier/lane-frontend.md:183` | "Bespoke SVG path thumb (no glass-ui analogue)" | **FOLD — AGREE.** Independently re-derived: `grep -ril "sparkline\|pathpreview\|svg-path" /Users/mkbabb/Programming/glass-ui/src/` → *(empty)*; the 7.0.0 component roster (`ls src/components/`) carries `fourier-field`, `music-staff`, `handmark`, `watercolor-dot`, `metric`, `skeleton` — none is a path thumbnail. No analogue at 4.0.0 or 7.0.0. |
| `lane-frontend.md:366` | "3 are glass-ui wrappers, `PathPreview.vue` is bespoke SVG, `tooltip/index.ts` is a barrel" | **FOLD — AGREE**, re-derived: `ls web/src/components/ui/` → `CollapsibleSection.vue`, `PathPreview.vue`, `SliderControl.vue`, `tooltip/`. |
| `lane-frontend.md:444` | `PathPreview.vue` \| 69 \| *(none)* \| **"genuinely bespoke — no flag"** | **CONTRADICT — scope error.** The clearance is sound *on the axis the census was measuring* (glass-ui shadow-surface: is there a primitive this should have adopted? No). It is **not** a design clearance. §5 of the same lane is a glass-ui-adoption ledger, and "no flag" there means "no adoption debt" — it does not and cannot speak to render surface, a11y, state coverage, proportion, or the tree's own named invariants. The D axis finds **16 defects, 2 of them blocking**, on a component the census marked clean. See D-1, D-2, D-4 in particular: the first two are invisible to an adoption-shadow scan by construction, and the third contradicts a *fourier-side* invariant the census lane never cross-checked. Recommend the census row be re-annotated `no glass-ui adoption debt; NOT design-cleared`. |
| `lane-frontend.md:565` | lists `ui/PathPreview.vue` in the inline-SVG cohort (12 files containing `<svg`) | **FOLD — AGREE**, and note the cohort framing is what let D-1 hide: a static `grep -rl "<svg"` counts *files*, not *mounted files*. |
| `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` | `grep -n "PathPreview"` → **0 hits** | **NOTED AS EVIDENCE.** No row of the 52-claim adjudicated intake touches this component. Combined with D-1 this is coherent, not surprising: a component with no render surface produces no runtime symptom for a hostile static/behavioural sweep to catch. The nearest adjacent row is **R3-12** (`ADOPT-AS-FACT`, 35 open-family records → 28 unique; duplicates enumerated as "both Paper-search callsites, **`GalleryCard` basisLabels**, `MorphPhaseConfig` easingNames") — it audits `GalleryCard`'s *other* computed and stops one import short of line 10. I do not stretch R3-12 to cover this; I record only that PathPreview sat inside an audited file and was still missed. |
| `CENSUS-2026-08-03.md:102-104` (break surface) | `metric-badge` ×7 files · `hover-card` ×2 · `hover-popover` ×2 · `DockIconButton` ×2 · `DockDropdownTrigger` ×1 · `ToastVariant` definition-absent | **FOLD.** Cross-checked against this component: PathPreview appears on **none** of the six break rows. See **S-5** — zero break surface — and **D-8**, where the uplift's token arm is nonetheless load-bearing. |
| `CENSUS-2026-08-03.md:37` | pins glass-ui `^4.0.0`/inst 4.0.0, producer 7.0.0 | **FOLD**, re-verified on disk: `web/node_modules/@mkbabb/glass-ui/package.json` → `"version": "4.0.0"`; `/Users/mkbabb/Programming/glass-ui/package.json` → `"version": "7.0.0"`. |

---

## §1 · BLOCKERS

### D-1 · BLOCKER · The component has **zero render surface**. Its design ships to nobody.

**Provenance.**
- `web/src/components/visualization/gallery/GalleryCard.vue:10` — `import PathPreview from "@/components/ui/PathPreview.vue";`
- `GalleryCard.vue:64-187` (the entire `<template>`) — **no `<PathPreview` element**. The thumbnail seat is an `<img :src="thumbnailUrl(...)">` at `GalleryCard.vue:99-104`.
- Tree-wide: `grep -rn "PathPreview" web/src` → exactly **two** hits — the `GalleryCard.vue:10` import, and the file's own definition. No template instantiation exists anywhere in `web/src`.

**Archaeology (why, and how long).**
- `ffeca1b feat(web): share tooltip with SVG path preview, grid, gold pulse, click-to-copy` — the component is born, rendered by `ShareButton.vue` (verified at `git show a459a56^:web/src/components/layout/ShareButton.vue:26-33`, the only true `<PathPreview …/>` instantiation this repo has ever had).
- `eefa318 feat(web): add gallery system with drafts, search, and marquee` — adds `import PathPreview` to `GalleryCard.vue`. `git show eefa318 -- …/GalleryCard.vue | grep -n "PathPreview"` returns **one** line: `+import PathPreview from "@/components/ui/PathPreview.vue";` — the import arrived with **no accompanying template usage**. The import was **born dead**.
- `a459a56 feat(web): replace header tabs with navigation dropdown` (2026-03-16) — deletes `ShareButton.vue` outright (`--stat`: `web/src/components/layout/ShareButton.vue | 157 ---`), taking the last real render with it.
- Confirmation that nothing changed since: `git log --oneline -S "PathPreview" -- web/src/components/visualization/gallery/GalleryCard.vue` → a **single** commit, `eefa318`. The occurrence count has never moved. The import has been dead every day of its life.

**Why this is a DESIGN blocker, not a hygiene nit.** Every remaining finding on this page — proportion,
motion, a11y, state coverage — describes a surface no user has reached since 2026-03-16. The Aristotelian
question this axis asks (are the proportions right?) is unanswerable-in-practice for a component that is not
in the render tree; and the component's design has consequently never been exposed to correction. D-1 is the
generative cause of D-2, D-6 and D-13: defects that a single day of real use would have surfaced.

**Why the gates did not catch it.** `web/package.json:8` — `"build": "vue-tsc -b && vite build"`.
`web/tsconfig.json` sets `strict: true` but **not** `noUnusedLocals`; `verbatimModuleSyntax: true` preserves
the import verbatim rather than eliding it. There is **no ESLint config in `web/`** (`ls web/eslint.config.*`
→ *no matches*; `package.json` has no `lint` script). So the dead import survives typecheck *and* build, and
`vendor-*` chunking (`vite.config.ts:40-56`) means Rollup's tree-shake is the only thing standing between
this and shipped bytes.

**Falsifier.** Any `<PathPreview` (or `<path-preview`) element in a `.vue` template, or any dynamic
`<component :is>` / async-import resolving to it, anywhere under `web/src`. Run
`grep -rn "PathPreview\|path-preview" web/src`. Present result: 2 hits, neither an instantiation. Additionally
falsifiable by finding a *third* repo (Storybook, docs site, e2e fixture) that mounts it — `grep -rn
"PathPreview" web/e2e web/scripts web/docs` → *(empty)*.

---

### D-2 · BLOCKER (blocks re-mount) · The `<svg>` has **no accessible name and no decorative marking**. WCAG 1.1.1 fails either way.

**Provenance.** `PathPreview.vue:48-61` is the complete element. Attribute set: `class`, `:width`, `:height`,
`viewBox`, `preserveAspectRatio`, `fill`, `:stroke`, `:stroke-width`, `stroke-linejoin`, `stroke-linecap`.
There is **no** `role`, **no** `aria-label`, **no** `aria-labelledby`, **no** `aria-hidden`, **no** `<title>`
child, and **no** prop by which a consumer could supply any of them. `grep -n "role\|aria\|<title" PathPreview.vue`
→ *(empty)*.

**The defect is the missing decision, not the missing attribute.** An inline `<svg>` with no `role` is mapped
inconsistently — some AT/browser pairs expose it as an unnamed `graphics-document` and let the user traverse
into the `<path>`; others skip it. Both outcomes are wrong here, and which one you *want* depends on a
decision the component refuses to make:
- If the preview is **content** (which it was — at `ShareButton.vue:26-33` the path thumbnail *was* the tooltip's
  payload, sitting above a `<hr>` and a caption), it needs `role="img"` + a name.
- If it is **decorative** (a redundant restatement of an adjacent label), it needs `aria-hidden="true"`.

Shipping neither is not neutrality; it is a coin-flip delegated to the user agent. The component exposes six
props (`PathPreview.vue:5-12`) and not one of them is `label` or `decorative`, so **no consumer can fix this
from the outside** — the defect is sealed in.

**The tree knows better.** Every other interactive/graphic surface in this repo makes the call explicitly:
`GalleryCard.vue:72-74` (`role="button"` + `tabindex="0"` + `:aria-label`), `GalleryCard.vue:92`
(`:aria-label="\`Select entry ${entry.image_slug}\`"`), `GalleryCard.vue:140` (`:aria-pressed="isLiked"`),
and `GalleryCard.vue:65-68`'s comment records that this was a *deliberate remediation* — "*Was a bare
`<div @click>` (per A3 #4 finding — unreachable by keyboard …)*". The a11y discipline exists and was applied
one file away; PathPreview escaped it precisely because of D-1 — an unmounted component is invisible to an
axe sweep. `web/package.json` even ships `@axe-core/playwright ^4.11.3` — a scanner that can only ever see
mounted DOM.

**Falsifier.** Find `role`, `aria-*`, or `<title>` in `PathPreview.vue:47-62`; or demonstrate that
`@axe-core/playwright` flags an unnamed decorative-ambiguous `<svg>` as passing under WCAG 1.1.1; or produce a
consumer-side mechanism (attribute fallthrough *does* reach the root `<svg>` since there is no
`inheritAttrs: false`, so a consumer **could** pass `aria-hidden="true"` — this partially falsifies the
"sealed in" clause for the *decorative* branch, but **not** for the content branch, since `<title>` requires a
child element and no slot exists). Recorded honestly: the decorative escape hatch exists via fallthrough; the
named-content path has no escape hatch at all.

---

## §2 · MAJOR

### D-3 · MAJOR · The path is **unconditionally closed** (`Z`). The sibling renderer of the same data parameterizes closure. The preview can draw ink the source does not have.

**Provenance.** `PathPreview.vue:43` — `return \`M${pts.join("L")}Z\`;`. The `Z` is a string literal with no
guard and no prop.

**The in-tree contradiction — this is the load-bearing evidence.** `web/src/components/visualization/lib/canvas-drawing/ghost-path.ts`
renders the *identical* `(pathX, pathY)` pair to canvas, and it takes closure as a **parameter**:
- `ghost-path.ts:5` — `@param closePath  Whether to close the path (epicycle mode closes it).`
- `ghost-path.ts:12` — `closePath = false,` ← **the default is OPEN**
- `ghost-path.ts:27` — `if (closePath) ctx.closePath();`

The repo therefore states, in its own prose, that these paths are **not** always closed, and defaults to open.
PathPreview hardcodes the opposite and offers no override. Fed an open contour, it renders a straight chord
from the last point back to the first — a line segment that exists in no data. A preview that adds ink is a
design falsehood, and it is the *worst* class of preview bug because the artefact is plausible: a spurious
chord across a contour reads as a legitimate feature of the shape.

**Scope, stated honestly.** The one historical call site fed `store.epicycleData.path` — the Fourier-epicycle
arm, which per `ghost-path.ts:5` *is* the closed case. So the bug was latent, not live, at that site. But
PathPreview lives in `components/ui/` and takes bare `pathX: number[] / pathY: number[]` (`PathPreview.vue:6-7`) —
its declared contract is *any* polyline. A `ui/` primitive whose contract is broader than its behaviour is
defective at the contract, and `ghost-path.ts` proves the narrower behaviour is not general in this tree.

**Falsifier.** Show that every `number[]` pair reachable through this prop signature is closed. That requires
`ghost-path.ts:12`'s `closePath = false` default to be dead — it is not: `grep -rn "drawGhostPath" web/src`
and inspect the callers' third argument. Alternatively, add a `closed?: boolean` prop and the finding is cured.

---

### D-4 · MAJOR · Four variadic spreads over `n_points`-length arrays — a direct violation of the repo's **named Invariant 20**, whose fix lives 3 directories away.

**Provenance.** `PathPreview.vue:25-28`:
```
const minX = Math.min(...pathX);
const maxX = Math.max(...pathX);
const minY = Math.min(...pathY);
const maxY = Math.max(...pathY);
```

**The invariant.** `docs/audits/runs/2026-05-26-B-audit-wave-1/SYNTHESIS.md:101` —
"**Invariant 20 — Visvalingam-Whyatt + epicycle-render performance budget.** No per-frame O(n) spread on the
render path (`useViewTransform`); cache bbox-on-path-identity." And `SYNTHESIS.md:35` names the mechanism:
"*L3 D5 names the per-frame O(n) `Math.min(...xs)` spread … 4·n_points operations per rAF tick; hard ceiling
at n≈64 k arguments on V8*".

**The fix already exists, on the same arrays.** `web/src/components/visualization/composables/useViewTransform.ts:14-21`
carries the remediation verbatim:
> `// The variadic Math.min(...xs) / Math.max(...xs) spread allocates an`
> `// arguments array of length n_points; at n=1024 that's four allocations of`
> `// ~1k elements every rAF, and at n≈10k the spread approaches V8's argument`
> `// count ceiling.  Hoist it into a computed keyed on the source-path identity`

and `useViewTransform.ts:33-45` implements the single linear scan (`// Single linear scan — no variadic spread,
no arguments array.`) over **`store.epicycleData.path.x` / `.y`** — the exact arrays PathPreview's only call
site passed (`ShareButton.vue:27-28`: `:path-x="store.epicycleData.path.x"`).

So: the repo identified this hazard, named an invariant for it, wrote a 30-line comment explaining it, and fixed
it on one consumer of `epicycleData.path` — while a second consumer of the same array kept all four spreads.
`n_points` defaults to **1024** (`web/src/lib/defaults.ts:8` — `n_points: 1024`), so the live shape is four
1024-element arguments arrays per recompute.

**Severity calibration, stated honestly.** This is MAJOR, not BLOCKER, on the D axis: `svgPath` is a `computed`
(`PathPreview.vue:21`), not a per-frame rAF callback, so the "every rAF tick" clause of inv-20 does not bind —
it recomputes on prop identity change only. The violation is of the invariant's *letter* ("no variadic spread"
on these arrays) and of its intent (V8 argument-ceiling exposure at high `n_points`), not of its rAF-frequency
clause. The design consequence is real regardless: the component cannot be handed a high-`n_points` contour
without a `RangeError` risk, and its author had a written, in-repo, same-data precedent to copy and did not.

**Falsifier.** Show `n_points` is bounded below V8's ceiling by the UI. `ContourSettings.vue:120` forwards
`n_points: props.nPoints` and `useWorkspaceLoader.ts:19,68` default it to 1024 — I found **no clamp** on the
upper bound in `web/src`. If a max exists server-side (`api/`) that pins it under ~64k, the RangeError arm
falls and only the invariant-letter arm survives (still MAJOR — the precedent was ignored). Marked
`UNPROVEN-NEEDS-LIVE (SS-13)` for the RangeError arm only.

---

### D-5 · MAJOR · `stroke-width` is divided by `size`, welding optical line weight to a **layout scalar**. Any CSS width override rescales the stroke.

**Provenance.** `PathPreview.vue:56` — `:stroke-width="strokeWidth / size"`, against `viewBox="0 0 1 1"`
(`:52`) and `:width="size"` / `:height="size"` (`:50-51`).

**The arithmetic.** At defaults `size=64`, `strokeWidth=1.5`: user-unit stroke `= 1.5/64 = 0.0234375`; the
viewBox's 1 unit maps to 64 CSS px, so rendered stroke `= 0.0234375 × 64 = 1.5 px`. Exactly as intended — but
the identity holds *only while rendered width equals `size`*.

**Why it does not hold.** `width`/`height` on `<svg>` are **presentation attributes**, which sit at the bottom
of the cascade — any author CSS beats them. And `.path-preview` (`PathPreview.vue:65-68`) sets `display: block;
flex-shrink: 0;` and **no width or height**. So the component neither locks its own box nor is protected from
a consumer's. `<PathPreview :size="64" class="w-32" />` renders at 128 px, and the stroke renders at
`0.0234375 × 128 = 3 px` — **exactly 2× the requested 1.5 px**. The prop named `strokeWidth` silently stops
meaning pixels.

The canonical repair is one attribute: `vector-effect="non-scaling-stroke"` plus a plain `stroke-width` in px,
which decouples line weight from the viewport transform entirely and makes `size` a pure layout knob. The
component ships neither.

**Latent vs live, stated honestly.** The one historical call site did pass a class —
`ShareButton.vue:32`, `class="share-tooltip-preview"` — but that rule (`ShareButton.vue:114-117`) sets only
`position: relative; z-index: 1`, no width. So the hazard was **latent, never live**. It is nonetheless a
design defect in a `components/ui/` primitive, which by placement invites exactly the utility-class styling
that breaks it (`GalleryCard.vue` is wall-to-wall Tailwind utilities; `w-full`, `h-full`, `w-6`, `h-4` all appear).

**Falsifier.** Demonstrate that `<svg width>` outranks an author `.w-32` rule — it does not (presentation
attributes lose to all author declarations). Or find `vector-effect`, or a CSS `width` lock, in
`PathPreview.vue:64-69` — neither is present. Or show no consumer may pass `class` — attribute fallthrough is
on (no `inheritAttrs: false`), and `ShareButton.vue:32` proves the pattern was used.

---

### D-6 · MAJOR · **No empty, loading, or error state.** The empty case renders a silent 64×64 hole.

**Provenance.**
- `PathPreview.vue:23` — `if (!pathX.length || !pathY.length) return "";`
- `PathPreview.vue:60` — `<path v-if="svgPath" :d="svgPath" />`
- `PathPreview.vue:65-67` — `.path-preview { display: block; flex-shrink: 0; }`

**The composite behaviour.** With `pathX: []`, the `<path>` is removed but the `<svg>` is not: `display: block`
plus `width="64" height="64"` reserves a full 64×64 box of **absolutely nothing**. Not a skeleton, not a
placeholder glyph, not a dashed frame, not a collapsed box — a void that occupies layout. And `flex-shrink: 0`
guarantees it holds its full width even under flex pressure, so the void is maximally conspicuous.

This is the design failure the state-coverage sub-axis exists to catch. The three states a preview must
distinguish — *loading* (data in flight), *empty* (no path exists), *error* (path failed to compute) — are
collapsed into one indistinguishable blank. A user cannot tell a slow network from a broken record; neither
can a developer.

**The seat exists and is unoccupied.** glass-ui ships `Skeleton` (`/Users/mkbabb/Programming/glass-ui/src/components/skeleton/Skeleton.vue`,
present in the 7.0.0 tree) — the canonical loading affordance. The repo's own `EquationPanel.vue:107-110`
demonstrates the tree's three-state idiom in miniature: `<div v-if="loading" …spinner…>` /
`<div v-else-if="error" class="text-sm text-red-400 fira-code">{{ error }}</div>` / else content. PathPreview
implements zero of the three.

**Falsifier.** Show the empty svg collapses to zero box — it does not; `display: block` with explicit
`width`/`height` presentation attributes and no `:empty` rule reserves the full square. Or show a consumer
guards it: `ShareButton.vue:25` did wrap the preview in `v-if="store.epicycleData"`, which handles *absent
data* — this is a partial falsification and I record it as such: the **consumer** carried the empty state, the
**component** did not. That is exactly backwards for a `ui/` primitive, and it did not survive the consumer's
deletion (D-1).

---

### D-7 · MAJOR · The `padding` prop **lies about its units**. `0.1` delivers an 8.33 % margin, not 10 %.

**Provenance.** `PathPreview.vue:17` — default `padding: 0.1`; `PathPreview.vue:32-33`:
```
// Fit into [0, 1] with uniform scale + padding
const scale = 1 / (Math.max(rangeX, rangeY) * (1 + padding * 2));
```

**The arithmetic.** Let `R = max(rangeX, rangeY)` and `p = padding`. Then `scale = 1/(R·(1+2p))`, so the
drawn extent along the dominant axis is `R·scale = 1/(1+2p)`. Centred at 0.5, the free margin on each side is
`(1 − 1/(1+2p))/2 = p/(1+2p)`.

| `padding` | user reads as | actually delivers |
|---:|---:|---:|
| 0.1 (default) | 10 % | **8.333 %** |
| 0.25 | 25 % | **16.67 %** |
| 0.5 | 50 % | **25 %** |
| → ∞ | — | → 50 % (asymptote; the margin can never reach 50 %) |

To deliver a true fractional margin `p` the scale must be `(1 − 2p)/R`. The shipped form is a *scale-inflation*
factor wearing a *margin* name. This is the Aristotelian complaint in its purest form: the component's single
proportion knob is mis-labelled, so every proportion decision made through it is made on a false reading.

**Aggravated by D-14.** There is no docblock, no prop JSDoc, and no `DESIGN.md` entry stating the units — so
the name is the entire specification, and the name is wrong.

**A second, sharper consequence: `padding` admits a stroke-clipping regime.** At `padding: 0` the extreme
points land exactly on the viewBox boundary, and the outer half of the stroke (`0.0234375/2 = 0.0117` user units
= 0.75 CSS px at `size=64`) falls outside the viewport. The outermost `<svg>` carries UA `overflow: hidden`,
so it is **clipped**: the extreme points render with a flat sheared edge instead of the `stroke-linecap="round"`
cap the component asked for at `:58`. There is no clamp, no `min` on the prop, and no note. A correct
implementation reserves `strokeWidth/(2·size)` of margin unconditionally, independent of `padding`.

**Falsifier.** Recompute `p/(1+2p)` at `p=0.1` — if it equals 0.1 the finding falls; it equals 0.08333. For the
clipping arm: set `padding: 0` and show the caps are not sheared — requires `overflow: visible` on the svg,
which `PathPreview.vue:64-69` does not set. Marked `UNPROVEN-NEEDS-LIVE (SS-13)` for the visual confirmation of
the shear only; the geometry is static-decidable.

---

### D-8 · MAJOR · `strokeColor` has **no token affordance**, and the value its only call site fed it degrades to neutral grey `#888888` — brand hue destroyed, contrast 4.93 : 1 → 3.34 : 1.

**Provenance chain.**
1. `PathPreview.vue:10,16` — `strokeColor?: string` defaulting to `"currentColor"`. A bare `string`. No token
   type, no `var(--…)` guidance, no docblock.
2. `ShareButton.vue:31` (the only real call site, @ `a459a56^`) — `:stroke-color="VIZ_COLORS.fourier"`, i.e. a
   **JS-resolved value**, not a token.
3. `web/src/lib/colors.ts:90-96` — `resolveVizColors()` sets `VIZ_COLORS.fourier = cssVarToHex("--viz-fourier")`.
   Called at `App.vue:11` (mount) and `App.vue:13` (MutationObserver on the dark-mode class flip).
4. `colors.ts:22-54` — `cssVarToHex` reads `getComputedStyle(documentElement).getPropertyValue(varName)` and
   matches exactly four forms: leading `#`, `hsl(…)`, the bare Tailwind triplet `^([\d.]+)\s+([\d.]+)%\s+([\d.]+)%$`,
   and `rgb(…)`. Anything else falls through to `colors.ts:53` — `return "#888888";`.
5. The token's actual form, in the stylesheet the app actually loads
   (`web/src/style.css:3` → `@import "@mkbabb/glass-ui/styles"` → `exports["./styles"] = "./dist/styles/index.css"`):
   `dist/styles/tokens/color-radius.css:263` — `--viz-fourier:   oklch(0.579 0.201 30.4);`
   (dark arm `tokens/dark-arm.css:113`; `light-dark()` arm `tokens/light-dark.css:145`).
6. `--viz-fourier` is **not** `@property`-registered — `grep -n "viz-" dist/styles/tokens/property-regs.css`
   → *(empty)*, against 16 `@property` blocks present for other tokens. An unregistered custom property's
   computed value is its token stream **as authored**, so `getPropertyValue("--viz-fourier")` returns the literal
   string `"oklch(0.579 0.201 30.4)"`.
7. `"oklch(…)"` matches none of `cssVarToHex`'s four patterns ⇒ **`VIZ_COLORS.fourier === "#888888"`** from the
   first `resolveVizColors()` onward, in **both** themes, silently overwriting the `#bf4040` literal seeded at
   `colors.ts:78`.

**Token-decidable contrast.** Ground `--card: hsl(36 48% 97%)` (`dist/styles/tokens/color-radius.css:72`;
`--popover: var(--card)` at `:74`; fourier's `style.css` overrides neither — `grep -n -- "--card:" web/src/style.css`
→ *(empty)*). Relative luminances: card ≈ 0.9422; intended `#bf4040` ≈ 0.1512; degraded `#888888` ≈ 0.2467.

| stroke | contrast vs `--card` | WCAG 1.4.11 (3 : 1, graphical object) |
|---|---:|---|
| intended `--viz-fourier` | **4.93 : 1** | pass, with headroom |
| shipped `#888888` | **3.34 : 1** | pass — by 0.34 |

So the failure is not a contrast *failure*; it is a **32 % contrast loss and a total hue loss** that squeaks
past the threshold and would therefore never trip an axe run. The brand-red identity of the Fourier basis —
the whole semantic point of `VIZ_COLORS.fourier` — is replaced by an anonymous grey that looks deliberate.

**Relation to the F.W1 uplift (per mandate).** glass-ui **7.0.0** ships the identical form —
`/Users/mkbabb/Programming/glass-ui/src/styles/tokens/color-radius.css:326` → `--viz-fourier:   oklch(0.579 0.201 30.4);`.
**The uplift does NOT repair this.** It is a fourier-side parser defect in `colors.ts` that survives 4.0.0 → 7.0.0
untouched, and it will keep surviving: the producer is migrating *toward* oklch/`light-dark()`, not away
(`tokens/light-dark.css:172`). Any F.W1 plan that treats the tri-package bump as curative for the `--viz-*`
arm is mistaken. The correct repair is fourier-side and is one line: pass the token string
(`stroke-color="var(--viz-fourier)"`) and let CSS resolve it — which is **already this tree's canonical idiom**
at `EquationPanel.vue:101` (`color="var(--viz-fourier)"`) and `FunctionInput.vue:185,218`. PathPreview's only
call site was the outlier.

**Design defect attributable to PathPreview itself.** The `strokeColor: string` prop makes both spellings
equally legal and documents neither, so the call site had no guidance. A `ui/` primitive in a tokenized design
system should default to `currentColor` (it does — see **S-4**) *and* state that overrides must be CSS custom
properties. Half the contract is right; the documented half is missing.

**Falsifier.** Register `--viz-fourier` via `@property … syntax: "<color>"` and `getPropertyValue` would return
a resolved value — but no such registration exists (step 6). Or show `cssVarToHex` handles `oklch` — its four
regexes are exhaustive and `colors.ts:53` is the unconditional fallthrough. Or show `resolveVizColors()` never
runs — `App.vue:11` runs it on mount. The one arm I cannot close statically is whether some *other* sheet
redefines `--viz-fourier` in hex/hsl form: `grep -rn -- "--viz-fourier:" web/src web/index.html` → *(empty)*,
and within `dist/styles` all three definitions are `oklch`. Marked **CONFIRMED-STATIC**; the rendered grey is
`UNPROVEN-NEEDS-LIVE (SS-13)`.

---

## §3 · MINOR

### D-9 · MINOR · Scoped `flex-shrink: 0` is **un-overridable** by any consumer utility class.

**Provenance.** `PathPreview.vue:64-68` — `<style scoped> .path-preview { display: block; flex-shrink: 0; }`.

**Mechanism.** Vue compiles scoped rules to `.path-preview[data-v-xxxxxxx]` — specificity (0,2,0) — and injects
them **unlayered**. `web/src/style.css:1` is `@import "tailwindcss"`, which registers v4's cascade layers;
Tailwind utilities live in `@layer utilities`. **Unlayered author styles beat every layer**, so a consumer's
`class="shrink"` loses on layer precedence *before* specificity is even consulted. There is no escape short of
`!important` or a `:deep()` from an ancestor. A leaf `ui/` primitive that dictates its own flex behaviour and
forbids revision is a design-system defect: layout belongs to the composer.

**Falsifier.** Show scoped SFC styles are emitted inside `@layer utilities` or later — they are not; Vue's
`@vitejs/plugin-vue` (`^6.0.7`, `web/package.json:26`) injects them unlayered. Or show `flex-shrink: 0` is
universally desired for a thumbnail — plausible in a row, wrong in a responsive grid, and unarguable either
way because the consumer cannot express an opinion.

### D-10 · MINOR · The frame is **square-only**; a single `size` scalar forbids rectangular previews.

**Provenance.** `PathPreview.vue:8` (`size?: number` — one scalar), `:50-51` (`:width="size" :height="size"`),
`:52` (`viewBox="0 0 1 1"`).

The *fit* is correct and aspect-preserving (see **S-1**), so a 3:1 contour letterboxes cleanly inside the
square — but the square itself is mandatory. A 3:1 shape therefore leaves ~67 % of the allotted box empty,
which in a dense gallery grid is the difference between a legible thumbnail and a smear. A `width`/`height`
pair (or an aspect-derived viewBox) costs one prop.

**Falsifier.** Show a rectangular preview is expressible — it is not from the prop surface; a consumer *could*
override via CSS width, but that immediately triggers **D-5** (stroke rescale) and, with `preserveAspectRatio`
at `xMidYMid meet` (`:53`), letterboxes a second time inside the already-square viewBox. The two defects
compound.

### D-11 · MINOR · `.toFixed(4)` is ~52× finer than the finest addressable step; ~2 kB of wasted `d` string at the default `n_points`.

**Provenance.** `PathPreview.vue:40` — `return \`${sx.toFixed(4)},${sy.toFixed(4)}\`;`.

**Arithmetic.** At `size=64`, one unit of the 4th decimal = `0.0001 × 64 = 0.0064` CSS px. At DPR 3 the finest
addressable step is `1/3 = 0.3333` CSS px — **52× coarser**. Three decimals (`0.064` px) is already 5× finer
than needed; the 4th is pure payload. At `n_points = 1024` (`web/src/lib/defaults.ts:8`) the `d` attribute is
`1024 × 14 ≈ 14.0 kB` of string, of which ~2.0 kB (2 chars/point) buys nothing. Live in the DOM, re-serialized
on every recompute.

**Falsifier.** Show a consumer renders at a size where the 4th decimal is visible — that needs a rendered width
> ~3300 px at DPR 1. Or show the string is not retained — it is bound to `:d` (`:60`) and lives in the attribute.

### D-12 · MINOR · 1024 segments across 64 px = **16 segments per pixel**. The in-tree decimator is not used.

**Provenance.** `PathPreview.vue:37-43` emits one `L` per input point, unconditionally; `size` defaults to 64
(`:14`); `n_points` defaults to 1024 (`lib/defaults.ts:8`).

**The tool exists.** `web/src/lib/contourEditing.ts:73` — "*Visvalingam-Whyatt simplification for closed curves
— heap-driven*" — exporting `simplifyClosedPoints` at `contourEditing.ts:95`, alongside `zipPoints`/`unzipPoints`
(`:7`, `:12`) which convert exactly PathPreview's `(number[], number[])` shape. Inv-20's own title
(`SYNTHESIS.md:101`) is "*Visvalingam-Whyatt + epicycle-render performance budget*" — decimation is half the
named invariant. A 64 px thumbnail is the canonical case for it, and it is one import away.

**Falsifier.** Show 16 segments/px is visually distinguishable from ~1/px at 64 px — it is not; sub-pixel
segments cannot resolve. Or show `simplifyClosedPoints` is unusable here — its `closed` assumption actually
*matches* PathPreview's hardcoded `Z` (**D-3**), so it is a drop-in for the closed case and the two findings
should be cured together.

### D-13 · MINOR · No `transition` on `stroke`; the preview **snaps** on theme flip while its neighbours ease.

**Provenance.** `PathPreview.vue:64-68` — the entire stylesheet is `display` + `flex-shrink`. No `transition`.
Meanwhile `App.vue:13`'s MutationObserver re-runs `resolveVizColors()` on the dark-mode class flip, mutating
`VIZ_COLORS` reactively — so the stroke *does* change on theme toggle, instantaneously. One file away,
`GalleryCard.vue:195-198` transitions `transform 0.25s var(--ease-apple-spring)`, `box-shadow 0.2s
var(--ease-standard)`, `border-color 0.2s var(--ease-standard)`.

**Falsifier.** Show the stroke does not change on theme flip — it does whenever `strokeColor` is bound to
`VIZ_COLORS.*` (and, separately, whenever it is `currentColor` inheriting a transitioning `color`). Or show a
transition is inherited — `transition` is not an inherited property. Visual confirmation marked
`UNPROVEN-NEEDS-LIVE (SS-13)`.

### D-14 · MINOR · **Zero prose.** Two inline comments, no docblock, no prop documentation, no `DESIGN.md` entry.

**Provenance.** The file's entire prose is `PathPreview.vue:32` (`// Fit into [0, 1] with uniform scale +
padding`) and `:39` (`// flip Y`). Both are accurate and load-bearing — credit where due — but there is no
component docblock, no `@param` on any of the six props, and no README (`ls web/src/components/ui/` → no
`.md`).

**The same-directory contrast is stark.** `SliderControl.vue:2-21` — its immediate peer — opens with a 20-line
docblock citing the wave that created it, the LOC of the recipe it replaced, the retirement disposition of a
dead prop, the ledger row that authorized it, and the CR-2 regression that motivated the DockContext change.
`CollapsibleSection.vue:19` documents even a `setTimeout`. PathPreview documents neither `padding`'s units
(**D-7** is a direct consequence), nor `strokeColor`'s expected form (**D-8**), nor the closure assumption
(**D-3**), nor the `strokeWidth/size` coupling (**D-5**). Four of the six MAJORs are, at root, undocumented
contracts.

**`DESIGN.md` never mentions it.** `grep -n -i "PathPreview\|preview\|svg" web/DESIGN.md` → *(empty)*.
`DESIGN.md:15-27` ("Local Utilities") records the A.W2 abrogation wave that migrated every local recipe to its
glass-ui primitive, item by item. `ui/PathPreview.vue` is a bespoke local primitive that passed straight
through that wave without appearing in the ledger — neither migrated, nor exempted, nor booked as a carry.

**Falsifier.** Find a docblock, a prop comment, a README, or a `DESIGN.md` / `CONSTELLATION.md` row naming it.
`grep -rn "PathPreview" web/DESIGN.md web/docs/` → *(empty)*.

### D-15 · MINOR · `preserveAspectRatio="xMidYMid meet"` is the SVG **default** — noise on a 69-line file.

**Provenance.** `PathPreview.vue:53`. Per SVG 1.1/2, the initial value of `preserveAspectRatio` is exactly
`xMidYMid meet`. The attribute changes nothing.

Ordinarily an explicit default is defensible as documentation — but here it is actively misleading: it implies
aspect-fitting is being *governed* at the viewport, when the real fit is done arithmetically at
`PathPreview.vue:33-35` (the uniform `scale` + shared centre) into a 1×1 viewBox that is *already* square. The
attribute can never bind. A reader auditing the fit logic is pointed at the wrong line.

**Falsifier.** Cite an SVG UA where the initial `preserveAspectRatio` differs from `xMidYMid meet`. None exists.

---

## §4 · INFO

### D-16 · INFO · Census scope correction (see §0).

`lane-frontend.md:444`'s "*genuinely bespoke — no flag*" should be read as *no glass-ui adoption debt*, not as a
design clearance. Recommend re-annotation. Filed here rather than as a defect against the census because the
lane's stated scope (§5, the uplift/adoption ledger) is honest about what it measured; the risk is downstream
misreading during F.W1 triage, when a "no flag" row is the natural thing to skip.

---

## §5 · SUPERLATIVES (L-18 runs both ways)

Each carries its own falsifier — the test that would demote it.

### S-1 · SUPERLATIVE · The fit is **uniform-scale and aspect-preserving**, which most hand-rolled previews get wrong.

`PathPreview.vue:29-35`: `rangeX`/`rangeY` are computed separately but consumed through a **single**
`Math.max(rangeX, rangeY)`, and both axes share that one `scale` and a common centre (`cx`, `cy`). Independent
per-axis normalization — `1/rangeX` and `1/rangeY` — is the overwhelmingly common shortcut, and it renders a
2:1 ellipse as a circle, silently falsifying every shape it draws. This component does not make that mistake,
and the `|| 1` degenerate-range guards at `:29-30` mean a perfectly flat path (a horizontal line, `rangeY = 0`)
divides by 1 rather than 0. That is careful code.

**Falsifier.** If `scale` were per-axis, a 2:1 input would render 1:1. Construct `pathX = [0,2]`, `pathY = [0,1]`:
`R = 2`, both axes scale by `1/(2·1.2)`, so the rendered extents are 0.833 and 0.417 — the 2:1 ratio is
preserved exactly. Superlative holds.

### S-2 · SUPERLATIVE · The **Y-flip is present and correct**, and agrees with the canvas renderer.

`PathPreview.vue:39` — `const sy = 0.5 - (pathY[i] - cy) * scale; // flip Y`. Math-space Y-up → screen Y-down.
Mirrored previews are a classic silent bug precisely because a mirrored closed contour still *looks* like a
plausible shape. The sign is right and the comment says why.

**Falsifier.** Change `-` to `+` and the preview mirrors vertically against `ghost-path.ts:23`'s `toScreen`
rendering of the same array. The two agree today. Superlative holds. (Full pixel-agreement with the canvas is
`UNPROVEN-NEEDS-LIVE (SS-13)`; the sign convention is static-decidable.)

### S-3 · SUPERLATIVE · `fill="none"` + round join/cap — the correct, load-bearing presentation set.

`PathPreview.vue:54,57-58`. `fill="none"` is not cosmetic: SVG's initial `fill` is **black**, and a Fourier
epicycle contour is heavily self-intersecting, so under the default `nonzero` fill-rule the omission would
render an opaque black blob rather than a line drawing — a total failure, not a degradation. The explicit
declaration is the single most load-bearing attribute on the element. `stroke-linejoin/linecap="round"` at a
1.5 px weight is likewise the right call: at 16 segments per pixel (**D-12**) a `miter` join would spike at
near-180° turns.

**Falsifier.** Remove `fill="none"` and the preview becomes a filled silhouette. It is present. Superlative holds.

### S-4 · SUPERLATIVE · `strokeColor` defaults to `currentColor` — the correct icon-grade default, and it survives the uplift untouched.

`PathPreview.vue:16`. `currentColor` inherits the ambient text colour, so the component themes for free in any
context, needs no token import, and cannot go stale when the token graph is renamed. It is strictly better than
defaulting to a hard-coded token, and it is the one part of the colour contract this component gets exactly
right — which sharpens **D-8**: the *default* is correct; only the *override guidance* is missing, and the one
call site that overrode it chose the broken spelling.

**Falsifier.** A default of `var(--foreground)` or a literal would break in inverted/on-brand surfaces where
`currentColor` adapts. The shipped default adapts. Superlative holds.

### S-5 · SUPERLATIVE · **Zero glass-ui break surface** under the F.W1 tri-package uplift.

`PathPreview.vue:2` is the complete import list: `import { computed } from "vue";`. Checked against the census
break rows (`CENSUS-2026-08-03.md:102-104`; detail at `lane-frontend.md:23-28`):

| break row | sites | PathPreview |
|---|---|---|
| `./metric-badge` removed → `./metric` | 7 imports / 7 files | **absent** |
| `./hover-card` removed → `<Popover>` | 2 | **absent** |
| `./hover-popover` removed → `<Popover>` | 2 | **absent** |
| `DockIconButton` removed → `<DockControl>` | 2 | **absent** |
| `DockDropdownTrigger` removed → `<DockTrigger>` | 1 | **absent** |
| `type ToastVariant` definition-absent (hard typecheck break) | 1 (`useToast.ts:3,9`) | **absent** |

It also carries none of the four value.js bare-root easing imports (`CENSUS:38`) and no `keyframes.js` surface,
so it sits entirely outside the resolution deadlock (`CENSUS:107-109`). Of the census's 9-component / ~1 990 LOC
shadow surface (`lane-frontend.md:446`), this is the one row that needs no work at 4→7. **Under the old pin it
is the cheapest component in the tree to uplift: cost zero.**

**Falsifier.** Any `@mkbabb/` specifier in the file. `grep -n "@mkbabb" PathPreview.vue` → *(empty)*.
Superlative holds — with the honest counterweight that zero break surface is a consequence of zero adoption,
which is why `lane-frontend.md:444`'s "no flag" is defensible on its own axis (§0, D-16).

### S-6 · SUPERLATIVE · **No motion ⇒ no `prefers-reduced-motion` debt.** Vacuous conformance, honestly earned.

The component declares no `transition`, no `animation`, no `@keyframes`, and no rAF (`PathPreview.vue:64-69` is
two declarations). There is consequently nothing for `prefers-reduced-motion: reduce` to suppress, and the
absence of a PRM block is **correct**, not an omission — the distinction matters because a reviewer scanning for
`@media (prefers-reduced-motion` and finding none would ordinarily flag it.

The counterweight is instructive: `GalleryCard.vue:304-308` had to carve one out —
`@media (prefers-reduced-motion: reduce) { .like-btn.liked :deep(svg) { animation: none; } }` — because
`like-bounce` (`:298-302`, applied at `:295`) is a `scale(1.3)` pop. Every motion the tree adds is a PRM liability it must then
service. PathPreview owes nothing. (This is genuinely orthogonal to **D-13**: adding a `stroke` transition
would create a PRM obligation this component currently does not have, and any D-13 repair must ship the carve
with it.)

**Falsifier.** Any `transition`, `animation`, `@keyframes`, `requestAnimationFrame`, or `<Transition>` in the
file. `grep -n "transition\|animation\|keyframes\|requestAnimationFrame\|Transition" PathPreview.vue` →
*(empty)*. Superlative holds.

---

## §6 · Disposition

**The generative finding is D-1.** This is not a component with fifteen design defects; it is a component that
was removed from the render tree in March 2026 and has been accreting undetected defects ever since, because
nothing — not `vue-tsc` (no `noUnusedLocals`), not ESLint (absent in `web/`), not `@axe-core/playwright` (sees
only mounted DOM), not the 29 Playwright tests, not four prior audit waves, not the 2026-08-03 census — can see
a component that never renders. D-2, D-6 and D-13 are precisely the defects that one day of real use would have
surfaced.

Two coherent dispositions, and the choice is an owner call, not an auditor's:

1. **Delete.** Remove `PathPreview.vue` and the dead import at `GalleryCard.vue:10`. Discharges 16 defects at a
   cost of 70 lines. Consistent with inv-20's NO-legacy arm (`GA3-arc-invariants.md:53`, "*HOLDS — inv-20
   NO-legacy*") and with the G.γ precedent (`HA6-prompts-precepts.md:53` — "*6 dead `types.ts` exports … all
   grep-proven zero-consumer*"), which is the closest in-tree analogue and was resolved by excision.
2. **Re-mount and repair.** If the gallery wants a vector thumbnail (a legitimate design want — it would render
   the *actual contour* rather than the source photograph now at `GalleryCard.vue:99-104`), then D-2, D-3, D-5,
   D-6 and D-7 must all land first; D-4 and D-12 are cured together by routing through
   `simplifyClosedPoints` (`contourEditing.ts:95`); D-8 is cured by the one-word change to
   `stroke-color="var(--viz-fourier)"`, matching `EquationPanel.vue:101`.

**Two findings escape this component's scope and should be relayed regardless of which disposition wins:**
- **D-8's parser arm** — `cssVarToHex` (`lib/colors.ts:22-54`) cannot parse `oklch()`, so **all five**
  `--viz-*` reads in `resolveVizColors()` (`colors.ts:90-96`) degrade to `#888888`. This is a whole-app defect
  with ~6 known consumer sites, it is **not** repaired by the 4→7 uplift (glass-ui 7 ships the same oklch form,
  `color-radius.css:326`), and it should be booked against **F.W1** as an explicit non-curative row so the
  tri-package bump is not credited with a fix it does not deliver.
- **`web/` has no ESLint config and `tsconfig.json` sets no `noUnusedLocals`** — the two gates that would have
  caught D-1 on the day it was introduced. A dead-import gate is cheap and would have prevented this entire
  finding set.

Per standing law (`feedback-glassui-bhbi-relay.md`): **no glass-ui BH relay is owed** — this component touches
no glass-ui surface (S-5).
