# CHALLENGE-L — library structure · `ShadowPalette.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, matching the
explicit Opus 5 declaration this seat was spawned with. The seat is declared, not inherited.

- **Axis:** CHALLENGE-L — library structure: module boundaries, ownership, direction of dependency,
  public surface.
- **Subject:** `demo/palettes/browser/card/ShadowPalette.vue` (115 lines; area *palettes*)
- **Repo:** `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`
- **Verdict:** **DEFECTIVE** — 1 BLOCKER, 4 MAJOR, 5 MINOR, 2 INFO
- **Strongest defect:** the component bypasses the design system's `Skeleton` primitive entirely,
  and thereby loses the three environment carve-outs the producer ships with it. **Measured on the
  live server: under `forced-colors: active` the ghost's 40px colour strip — the component's own
  declared primary readout — becomes exactly its own plate colour, `rgb(255,255,255)` on
  `rgb(255,255,255)`, contrast 1.00:1. The instrument face erases itself.** glass-ui's `Skeleton`
  ships `@media (forced-colors:active){ .skeleton{opacity:.18;background:canvastext} }` — the exact
  cure — and the sibling ghost in the same `<Transition>` slot inherits it.

---

## 0 · What this component imports — the trace

`demo/palettes/browser/card/ShadowPalette.vue` has a `<script setup>` block of **six lines**
(`:84-90`) containing **zero import statements**.

```
$ sed -n '84,90p' demo/palettes/browser/card/ShadowPalette.vue
<script setup lang="ts">
const { count = 5 } = defineProps<{
    /** Ghost segment/swatch count ... */
    count?: number;
}>();
</script>
```

Consequences for this axis's three import limbs:

| limb | finding |
|---|---|
| **deep reach across a feature/shell/boot boundary** | **NONE outbound.** No edge to trace. The violating edge is *inbound* — see L-2. |
| **`@mkbabb/value.js` reached through the published `exports` map, or a deep path?** | **NEGATIVE PROOF — the component never touches the library.** It cannot false-proof the public API. The repo-wide posture on this limb is already correct: `vite.config.ts:63-66` records T.W1 retiring every `@src/*` import from the demo tree, and the self-alias set is machine-derived from `package.json#exports` (`vite.config.ts:37-50`) so it cannot drift. Verified: `grep -rn 'from "@mkbabb/value.js"' demo/` → **0 hits** (no bare-root reach), and the only subpaths the demo speaks are `/color` (25), `/css` (10), `/math` (6), `/easing` (5), `/quantize` (4) — all five are real keys in the exports map. The one residue is L-11, in the *type* view, not this component. |
| **`verbatimModuleSyntax` — every type-only import `import type`** | **VACUOUSLY SATISFIED** — zero imports. |

The component's entire dependency surface is therefore **CSS-token-shaped, not module-shaped**: it
consumes eight class names from three different owners with no compiler edge to any of them.

```
ShadowPalette.vue:43  class="shadow-palette skeleton-ink-register rounded-card border
                             border-card-edge bg-well overflow-hidden shadow-cartoon-sm"
      shadow-palette        → NOTHING.                       (dead — L-6, measured)
      skeleton-ink-register → demo/styles/utils.css:56        (house)
      rounded-card          → --radius-card, glass-ui theme/radius.css:1
      border-card-edge      → --color-card-edge, demo/styles/foundation.css:136
      bg-well               → --well-bg, demo/styles/foundation.css (house rung-2)
      shadow-cartoon-sm     → --shadow-cartoon-sm, glass-ui theme (producer)
ShadowPalette.vue:55  animate-pulse                           → Tailwind v4 built-in
ShadowPalette.vue:75  rounded-badge → --radius-badge: var(--radius-pill) = 9999px
                                                              (glass-ui theme/radius.css:1)
```

**A dependency the type system cannot see is a dependency the type system cannot protect.** Every
defect below except L-2 and L-11 lives in that blind region — none of them is reachable by
`vue-tsc`, and `npm run lint` is a declared "smoke gate ... intentionally permissive"
(`eslint.config.js:4-6`) with every structural rule off.

---

## L-1 · BLOCKER — the design-system bypass erases the component under `forced-colors: active`

**Mechanism.** Unique semantic ownership inverted at the *primitive* level. Every other loading
surface in the app renders its blocks through glass-ui's `Skeleton`; this one hand-rolls
`<div class="animate-pulse">` with a scoped `background`. The producer's primitive is not merely a
styling convenience — it carries three environment carve-outs. Hand-rolling drops all three.

### Evidence 1 — the producer's carve-outs, quoted from the shipped stylesheet

`node_modules/@mkbabb/glass-ui/dist/glass-ui.css` (extracted with a `python3 re.finditer` window
around each `.skeleton[data-v-cd03d0b0]` occurrence):

```css
.skeleton[data-v-cd03d0b0]{isolation:isolate;border-radius:var(--radius-input);
                           background:var(--muted);position:relative;overflow:hidden}
.skeleton[data-v-cd03d0b0]:after{content:"";background:linear-gradient(105deg, …);inset:0}
@media (prefers-reduced-motion:no-preference){
    .skeleton[data-v-cd03d0b0]:after{animation:skeleton-scan-cd03d0b0 var(--duration-shimmer,2.4s) …}}
@media (prefers-reduced-transparency:reduce){
    .skeleton[data-v-cd03d0b0]{background:var(--muted)}}
@media (forced-colors:active){
    .skeleton[data-v-cd03d0b0]{opacity:.18;background:canvastext}
    .skeleton[data-v-cd03d0b0]:after{display:none}}
```

Three carve-outs: motion is **opt-in** (`no-preference`), transparency has a solid fallback, and
forced-colors repaints on a *system* colour (`canvastext`) at a legal alpha. `ShadowPalette.vue`
has none of them: its entire `<style scoped>` block is four `background:` declarations
(`:103-114`), and its motion is an unconditional Tailwind `animate-pulse` (`:55,62,66,75`).

### Evidence 2 — the measured erasure (live server, `http://localhost:9000/#/extract`)

```js
// Playwright, read-only: page.emulateMedia({ forcedColors: 'active' }) then restored to 'none'
{"normal":{"plate":"oklab(0.345295 0.0103877 0.0175526)",
           "seg":  "oklab(0.43228 0.00918712 0.0157811)",
           "swatch":"oklab(0.43228 0.00918712 0.0157811 / 0.3)","segCount":5},
 "forced":{"plate":"rgb(255, 255, 255)",
           "seg":  "rgb(255, 255, 255)",
           "swatch":"oklab(0.43228 0.00918712 0.0157811 / 0.3)","segCount":5}}
```

**`plate === seg === rgb(255,255,255)`. Contrast 1.00:1.** The strip that the component's own
comment calls the load-bearing readout —

> *"A hairline of the well ground between cells keeps the segmentation legible AT REST (the live-k
> readout survives PRM stillness)"* — `ShadowPalette.vue:47-50`

— is gone. So is the meta row and (visually) everything the plate is for. All that remains is a
white rectangle with a hairline. The swatch row's `color-mix(… 30%, transparent)` retains its
authored colour rather than being forced, so the plate degrades into *only* the least informative
of its three registers.

This is the **exact** failure mode `demo/styles/utils.css:44-56` claims to have cured:

> *"E1-R2 (T.W8 remediation_1): the former recipe was NOT certified against its ground — in dark it
> landed ≈ `--well-bg` (probed ΔL 0.007, seg-vs-well 1.02:1), collapsing the ghost to a featureless
> slab. The ink is now a CERTIFIED tone-step OF the well ground itself … so the block is guaranteed
> a bounded ΔL from the well in BOTH schemes by construction."*

The certification is **scheme-true and mode-blind**. `color-mix(in oklab, var(--well-bg),
var(--foreground) 15%)` cannot survive an environment that replaces both operands with the same
system colour. Guaranteeing ΔL "by construction" across two *schemes* proved nothing about a third
*mode* — and the producer had already solved that mode, in the primitive this component declined
to use.

### Evidence 3 — the bypass is a singleton in the codebase

```
$ grep -rln "animate-pulse" demo/ --include="*.vue"
demo/palettes/browser/card/ShadowPalette.vue

$ grep -rln "skeleton-ink-register" demo/ --include="*.vue"
demo/palettes/browser/card/ShadowPalette.vue          ← hand-rolled divs
demo/palettes/browser/card/PaletteCardSkeleton.vue    ← <Skeleton>  (ui/skeleton:1)
demo/palettes/browser/admin/AdminListSkeleton.vue     ← <Skeleton>  (:13,15,16,18)
demo/palettes/browser/admin/AdminTagsPanel.vue        ← <Skeleton>
```

**One of four consumers of the house loading-ink register bypasses the primitive; three do not.**
And the one that does sits in the *same `<Transition>` slot* as one that does not
(`ExtractWorkbench.vue:102-159`) — so the Extract pane's idle plate vanishes in forced-colors while
its processing plate survives. Same seat, same bones, two different accessibility outcomes.

**Reproduction.** Load `http://localhost:9000/#/extract`; enable forced-colors (macOS *Increase
contrast* / Windows *High contrast*, or `page.emulateMedia({forcedColors:'active'})`); read
`getComputedStyle` on `[data-slot="shadow-palette"]` and its `.shadow-seg` child. Both report
`rgb(255,255,255)`.

**Proposed cure.** Not a media-query patch on the demo — the concept has the wrong home. See L-5
and §Greenfield: the block goes back through `<Skeleton>`, and the seams `<Skeleton>` is missing
(tone, stagger) are asked of glass-ui, where variants belong (edict 4). A `@media (forced-colors)`
block added to `ShadowPalette.vue`'s scoped style would be a fourth private copy of a producer
behaviour and is the wrong answer.

---

## L-2 · MAJOR — the component lives in the wrong feature; the only edge that reaches it crosses a feature boundary inward

**Mechanism.** Ownership inverted. `ShadowPalette` is physically a member of the palette-browser
mega-feature and is published on that feature's stable seam, but **no member of palette-browser
renders it**. Its sole live consumer is a *different* top-level feature.

### The exhaustive reference census

```
$ grep -rn "ShadowPalette" --include="*.vue" --include="*.ts" demo/ src/ test/ e2e/
demo/workbenches/extract/ExtractWorkbench.vue:159   <ShadowPalette :count="…" />   ← THE ONLY RENDER
demo/workbenches/extract/ExtractWorkbench.vue:199   import { … ShadowPalette }
demo/palettes/browser/card/index.ts:7               export { default as ShadowPalette }
demo/palettes/browser/index.ts:22                   ShadowPalette,       (re-export)
e2e/smoke/oracles/o9-shadow-palette.spec.ts:17,18,59   the oracle
…                                                   remaining hits are prose in comments
```

The dependency edge, drawn:

```
demo/workbenches/extract/ExtractWorkbench.vue:196-200
    import { PaletteCard, PaletteCardSkeleton, ShadowPalette }
      from "../../palettes/browser/card";
                    ↑
        workbenches/extract  ──────────────▶  palettes/browser/card
                             (inbound reach for a component that
                              palettes/browser itself never uses)
```

Two of those three symbols are legitimate: `PaletteCard` is genuinely the palette feature's card,
and `PaletteCardSkeleton` is genuinely shared (`BrowsePane.vue:49,130`). `ShadowPalette` is not
shared with anything — it is Extract's, in Extract's words:

> *"ONE seat: the standing INSTRUMENT face — Extract's k-threaded undeveloped plate, where the
> ghost is the instrument showing its output shape before any image exists (the live-k leg: turn k
> and the plate re-segments)."* — `ShadowPalette.vue:19-23`

The component's own header declares Extract as its owner while the file sits three directories deep
inside a foreign feature. The `e2e` oracle enforces the single seat as *law* — *"THE FILLER SWEEP —
zero ShadowPalette-as-filler in the scoped host"* (`o9-shadow-palette.spec.ts:59`) — i.e. a green
gate actively guarantees that no palette-browser surface may ever render this member of
palette-browser. **The house has a standing test asserting that this file is in the wrong place.**

**Blast radius on the public surface.** `demo/palettes/browser/index.ts:1-18` describes itself as
*"The stable public API of the palette-browser feature … External consumers reach the feature
through THIS seam"*. A stable public API that publishes a symbol none of its own members can
legally use is a leak, not an API: the seam's job is to hide the feature's internals, and here it is
being used to *export a foreign feature's private component through a third party's front door*.

**Reproduction.** `grep -rn "ShadowPalette" demo/palettes/` returns 6 hits: 2 barrel exports and 4
prose mentions. Zero renders. Contrast `grep -rn "PaletteCardSkeleton" demo/palettes/` → renders at
`BrowsePane.vue:49` and `:130`.

**Proposed cure.** Not "move the file" — see §Greenfield. The component should not exist as a
separate species at all; Extract should reach the *one* palette-ghost through the palette-browser
seam, exactly as it already reaches `PaletteCard` and `PaletteCardSkeleton` in the same import
statement.

---

## L-3 · MAJOR — the boundary rule the seam cites as "standing" enforcement matches nothing

**Mechanism.** The palette-browser seam's stated invariant has **zero mechanism**. Its citation
points at ESLint globs for a directory tree that no longer exists and bans an import specifier whose
alias was deleted.

`demo/palettes/browser/index.ts:6-8` claims:

> *"External consumers reach the feature through THIS seam (or a sub-barrel it re-exports), never a
> raw internal `.vue` file — **the G-DEMO-3b boundary (eslint.config.js) enforces it standing.**"*

`eslint.config.js` G-DEMO-3b (`files` glob and `patterns` group, verbatim):

```js
files: [ "demo/color-picker/**/*.ts", "demo/color-picker/**/*.vue",
         "demo/@/components/**/*.ts", "demo/@/components/**/*.vue",
         "demo/@/lib/**/*.ts",        "demo/@/lib/**/*.vue" ],
rules: { "no-restricted-imports": ["error", { patterns: [{
    group: ["@components/custom/palette-browser/**/*.vue"],
    message: "G-DEMO-3b: reach palette-browser through its barrel seam, never a raw .vue file." }]}]}
```

### Measured

```
$ for g in "demo/color-picker" "demo/@/components" "demo/@/lib" "demo/@/composables"; do …
demo/color-picker         16
demo/@/components         DIR ABSENT
demo/@/lib                DIR ABSENT
demo/@/composables        DIR ABSENT

$ grep -rn "@components/custom/palette-browser" --include="*.ts" --include="*.vue" demo/ | wc -l
0
```

Three of the four file regions the rules govern **do not exist**, and the specifier they ban is
unresolvable — `tsconfig.demo.json:32-34` records the kill:

> *"W43 (RF-15): the demo `@…` path aliases were killed — every demo import is relative to its
> physical home. No `@styles`/`@components`/`@utils`/`@lib`/`@composables`/`@assets` project alias
> survives."*

`vite.config.ts:68-70` records the same. So G-DEMO-3b bans an import nobody *can* write, over
directories that do not exist; and G-DEMO-1/G-DEMO-3a, which guard the composables layer's
direction of dependency, govern `demo/@/composables/**` — likewise absent. **The demo's entire
standing module-graph enforcement is dead code**, and the only surviving live region
(`demo/color-picker/**`, 16 files) is the app-root boot the rules were meant to protect *from*, not
*with*.

This is the direct enabling condition for L-2: nothing structural stopped `workbenches/extract`
from becoming the sole owner-by-use of a `palettes/browser` component, and nothing will stop the
next such edge.

**Reproduction.** The two commands above.

**Proposed cure.** Re-point the globs at the real tree and invert the rule to guard *direction*, not
file extension. Concretely, three bans keyed on physical homes that exist today:

```js
// features must not reach into another feature's internals — only its barrel
files: ["demo/{palettes,workbenches,picker,scenes,shell,platform}/**/*.{ts,vue}"],
patterns: [{ group: ["**/palettes/browser/*/**"],  // any path BELOW a sub-barrel
             message: "reach a feature through its barrel, never an internal file" }]
// shared layers stay lower: shared/ and color-session/ never import a feature
files: ["demo/shared/**", "demo/color-session/**"],
patterns: [{ group: ["**/palettes/**", "**/workbenches/**", "**/picker/**", "**/shell/**"] }]
```

A rule that matches zero files is worse than no rule: it is a false green.

---

## L-4 · MAJOR — the swatch silhouette has two owners, and the ghost's owner disagrees with the truth

**Mechanism.** Duplicate ownership of one concept — *"what a palette swatch looks like"*. The real
swatch's silhouette is computed by a glass-ui primitive; the ghost re-declares it with a Tailwind
radius token. The two disagree, which falsifies the component's stated contract.

**The truth.** A palette swatch is a `WatercolorDot`:

```
demo/palettes/browser/card/SwatchHoverMenu.vue:14-20,29-34   <WatercolorDot :color … :class="[sizeClass …]" />
   ← rendered per colour by PaletteCardSwatches.vue:26-33, which PaletteCard.vue:148 owns
```

and glass-ui computes that silhouette deterministically:

```
node_modules/@mkbabb/glass-ui/dist/components/watercolor-dot/useWatercolorBlob.d.ts
  /** Border-radius range [lo, hi] as percentages (default [20, 80]). */
  "Drives a watercolor dot's organic blob shape. Deterministic given color + seed …
   The seeded `border-radius` silhouette is set ONCE (the dot's identity)"
```

**The ghost.** `ShadowPalette.vue:75` — `rounded-badge` → `--radius-badge: var(--radius-pill)` →
`9999px` (`@mkbabb/glass-ui/dist/styles/theme/radius.css:1`).

### Measured side by side, same page, same frame

```
ghost swatch  (.shadow-swatch)            border-radius: "9999px"
real dot      ([data-variant="ghost"])    border-radius: "28.1208% 33.6845% 57.986% 49.3693%
                                                        / 79.1235% 21.3347% 72.676% 44.8754%"
```

(`http://localhost:9000/#/extract`; the real dot sampled from the `EmptyState` trio in the sibling
My Palettes pane, which renders the same `WatercolorDot` primitive.)

The component's contract is explicit — *"the instrument showing its **output shape** before any
image exists"* (`ShadowPalette.vue:20-22`) — and the output shape is an irregular seeded blob, not a
circle. **The instrument's face is wrong about its own instrument.** Visually confirmed in
`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/extract.png`: the left pane's
five ghost swatches are geometric discs while the right pane's three `WatercolorDot` ghosts, 300px
away in the same viewport, are visibly irregular.

**Why it is a *structure* defect and not a *design* one:** the shape concept is owned by
`useWatercolorBlob`. The ghost does not consume it, cannot consume it (it has no colour to seed
with), and so re-declares a competing answer inline. A concept with two homes drifts by
construction — and here it has already drifted, permanently, because the two homes compute
different functions.

**Reproduction.** The two `getComputedStyle` reads above.

**Proposed cure.** `WatercolorDot` already exposes a `ghost` variant (`SwatchHoverMenu.vue:16`
passes `:variant="ghost ? 'ghost' : 'solid'"`; `EmptyState` consumes it, and `o9-shadow-palette.
spec.ts:75-76` asserts its `.watercolor-ghost-stroke`). The ghost's swatch row should render
`WatercolorDot variant="ghost"` seeded on the *index* rather than a colour — one home, one silhouette
function, and the ghost trio and the ghost plate finally speak one shape language. If the seat
survives the OM-15 ruling at all (see §Cross-references), this is the shape it should wear.

---

## L-5 · MAJOR — the "tone-stepped, staggered skeleton block" concept has no home in the design system, so it has two homes in the demo and one of them is dead

**Mechanism.** Edict 4 ("variants and primitives belong in glass-ui") is being *violated in both
directions at once*, and the root cause is a missing producer surface. glass-ui 7.0.0's `Skeleton`
offers no tone seam, no stagger seam, and one animation register — so the two consumers who needed
those three things each invented their own, in opposite directions.

### What the producer actually publishes

```ts
// node_modules/@mkbabb/glass-ui/dist/components/skeleton/Skeleton.vue.d.ts  (entire prop surface)
type __VLS_Props = { class?: HTMLAttributes["class"]; };
```

**One prop.** And the recipe (quoted in full at L-1) hardcodes `background: var(--muted)`,
`border-radius: var(--radius-input)`, and a single `skeleton-scan` sheen whose only seam is
`--duration-shimmer`. There is **no** `--skeleton-glass-bg`, **no** delay seam, **no** register
selector. Independently confirmed: `grep -o "skeleton" glass-ui/dist/styles/components.css | wc -l`
→ **0** (the recipe lives only in the compiled scoped sheet, keyed `[data-v-cd03d0b0]` — i.e. it is
not even an unscoped, overridable house recipe).

### The two inventions

| | invention | outcome |
|---|---|---|
| `PaletteCardSkeleton.vue:41-45,58-66,71-77` | invented **producer props** (`surface="glass"`, `variant="shimmer"/"breath"`) and **producer custom properties** (`--skeleton-glass-bg`, `--skeleton-shimmer-delay`, `--skeleton-shimmer-tint`, `--pulse-aura-opacity-max`) | **dead** — none exist; the sibling seat measured both registers rendering pixel-identical (`PaletteCardSkeleton/challenge-L-library.md` L-1) |
| `ShadowPalette.vue:55,103-114` | invented **local CSS** (`animate-pulse` + four scoped `background` rules) | **renders correctly**, at the cost of the three carve-outs (L-1) |

Both are the same mistake: **the register belongs to the design system and neither consumer could
put it there.** One wrote a wish into the producer's API and got nothing; the other wrote a private
fork and got an accessibility regression. The demo-side census makes the missing seam concrete —
`demo/styles/utils.css:56-60` mints a three-property block *for a producer contract that does not
exist*:

```css
.skeleton-ink-register {
    --skeleton-ink: color-mix(in oklab, var(--well-bg), var(--foreground) 15%);
    --skeleton-glass-bg: var(--skeleton-ink);       /* read by nothing */
    --skeleton-shimmer-tint: color-mix(…);          /* read by nothing */
}
```

**Proposed cure — a glass-ui ask, not a demo refactor** (relay per the standing BH/BI edict). Three
seams, all of which the producer's own recipe is one line from supporting:

```
Skeleton (glass-ui) gains:
  --skeleton-bg      : tone seam. `background: var(--skeleton-bg, var(--muted))`.
                       One-line change; today's behaviour is the default.
  --skeleton-delay   : stagger seam. `animation-delay: var(--skeleton-delay, 0s)`
                       on the ::after (scan) and on the element (breath).
  register prop      : "scan" (today's sheen) | "breath" (opacity swell) | "none".
                       The variant belongs HERE — this is exactly edict 4's case.
```

With those, `.skeleton-ink-register` collapses to a single `--skeleton-bg` on the plate root, both
demo ghosts become `<Skeleton>` compositions, and the forced-colors / reduced-transparency /
reduced-motion carve-outs are inherited rather than re-invented four times.

---

## L-6 · MINOR — `shadow-palette` is a dead class

**Mechanism.** Dead public surface on the element's own class list.

`ShadowPalette.vue:43` opens with `class="shadow-palette …"`. Measured on the live page by walking
every `CSSStyleSheet` in `document.styleSheets` and collecting selectors matching
`/shadow-(palette|seg|swatch|block)/`:

```json
"matchingRules": [".shadow-seg[data-v-79fcb7a3]", ".shadow-block-name[data-v-79fcb7a3]",
                  ".shadow-block-count[data-v-79fcb7a3]", ".shadow-swatch[data-v-79fcb7a3]"]
```

`.shadow-palette` is absent — no rule, in any sheet, defines it. Static confirmation:

```
$ grep -rn "shadow-palette" e2e/ demo/ test/ --include="*.ts" --include="*.vue" --include="*.css"
e2e/smoke/oracles/o9-shadow-palette.spec.ts:55   '[data-slot="shadow-palette"]'   ← attribute, not class
demo/palettes/browser/card/ShadowPalette.vue:42  data-slot="shadow-palette"
demo/palettes/browser/card/ShadowPalette.vue:43  class="shadow-palette …"
```

The element already publishes its identity as `data-slot`, which is what the oracle and the whole
house grammar select on. The class is a second, unused identity channel.

**Reproduction.** The `document.styleSheets` walk above; or the grep.

**Proposed cure.** Delete the token from `:43`. One identity per element: `data-slot`.

---

## L-7 · MINOR — the scoped classes squat the design system's generated-utility namespace

**Mechanism.** `.shadow-seg`, `.shadow-swatch`, `.shadow-block-name`, `.shadow-block-count` and
`.shadow-palette` occupy Tailwind v4's `shadow-*` utility namespace — **which the same element
consumes on the same line**.

```
ShadowPalette.vue:43   class="shadow-palette … shadow-cartoon-sm"
                              ↑ author class      ↑ generated utility from --shadow-cartoon-sm
```

In Tailwind v4 a `--shadow-<name>` theme entry generates `.shadow-<name> { box-shadow: … }`.
glass-ui mints exactly such tokens (`--shadow-cartoon-sm/md/lg`, consumed at
`demo/DESIGN.md:147,188` and `demo/styles/utils.css:106,136,144`), and glass-ui owns that namespace
as a producer. The day glass-ui or the house mints `--shadow-seg` — a plausible name for a strip
segment's elevation — Tailwind emits `.shadow-seg { box-shadow: … }` into a cascade layer that then
races this file's `.shadow-seg { background: … }`. The collision would be silent: same selector,
different property, different origin, no tool relating them.

**Reproduction.** NONE — this is a **hypothesis** about a future token. The *present* facts are
measured and undisputed: the element mixes author classes and generated utilities from the same
prefix namespace (`:43`), and `--shadow-*` is a live producer-owned Tailwind theme namespace
(`glass-ui/dist/styles/theme/`, consumed at `utils.css:106`).

**Proposed cure.** Rename the four scoped classes out of the producer's namespace — `ghost-seg`,
`ghost-swatch`, `ghost-block-name`, `ghost-block-count` — or, under the L-5 cure, delete them
entirely (they become `<Skeleton>` instances carrying `--skeleton-bg`). Author classes must never
share a prefix with a generated-utility namespace the design system owns.

---

## L-8 · MINOR — the root pulls a three-property utility to read one property; two are measurably dead here

**Mechanism.** The utility `.skeleton-ink-register` is a *bundle* addressed at the `<Skeleton>`
route. This component takes the other route, so two-thirds of what it imports is inert.

Measured on the ghost root, live:

```json
"skeletonInk":          "color-mix(in oklab, color-mix(in oklab, light-dark(…) 92%, …) 15%)"  ← READ (:104)
"skeletonGlassBg":      "color-mix(…)"     ← set on the root, read by NOTHING in its subtree
"skeletonShimmerTint":  "color-mix(in srgb, hsl(30 26% 35%) 24%, transparent)"  ← ditto
```

The subtree contains no `<Skeleton>` (`ShadowPalette.vue` imports nothing), so neither
`--skeleton-glass-bg` nor `--skeleton-shimmer-tint` has a reader — and per L-5 they have no reader
anywhere, since the producer's recipe hardcodes `var(--muted)`. The utility's own docblock
(`utils.css:37-43`) names *"the letter-L9 producer seam (the sheen joins the same ink family once
glass-ui's `::after` reads it)"* — an admitted future tense, still future.

**Reproduction.** `getComputedStyle(document.querySelector('[data-slot="shadow-palette"]'))
.getPropertyValue('--skeleton-glass-bg')` returns a value; nothing in the subtree resolves it.

**Proposed cure.** Falls out of L-5: `.skeleton-ink-register` becomes a one-property block
(`--skeleton-bg`) once the producer publishes the tone seam. Until then the component should read
`--skeleton-ink` via a targeted declaration rather than adopting a bundle written for a different
consumer.

---

## L-9 · MINOR — the e2e oracle reaches past the component's published contract into its scoped CSS

**Mechanism.** Test → implementation coupling across a boundary the component itself drew.

`ShadowPalette.vue:42` publishes `data-slot="shadow-palette"` — the house's component-identity
grammar, and what the oracle uses to *find* the ghost (`o9-shadow-palette.spec.ts:55`). But the
oracle's two assertion helpers then select a `<style scoped>` class:

```ts
// e2e/smoke/oracles/o9-shadow-palette.spec.ts:83  (assertPulsesLive)
Array.from(root.querySelectorAll(".shadow-seg")).map((el) => { … })
// e2e/smoke/oracles/o9-shadow-palette.spec.ts:108 (assertPrmStatic)
Array.from(root.querySelectorAll(".shadow-seg")).map((el) => { … })
// e2e/smoke/oracles/o9-shadow-palette.spec.ts:150  (the live-k leg)
const segs = ghost.locator(".shadow-seg");
```

`.shadow-seg` is defined only inside this SFC's scoped block (`:103-105`) and exists in the DOM only
as an artefact of Vue's scoping — it is the definition of an implementation detail. Two consequences:

1. The oracle **pins the exact class name L-7 says must change**. A correct rename turns a green
   gate red for a non-defect; a *silent* rename (say, to `ghost-seg`) makes `assertPulsesLive`'s
   `expect(probes.length).toBeGreaterThan(0)` fail loudly — which is at least honest — but
   `assertNoFillers` (`:60-62`) would keep passing on a broken component, since it counts
   `data-slot` nodes.
2. Under the L-5 cure the class disappears entirely (the segs become `<Skeleton>` with
   `data-slot="skeleton"`), so the oracle's three legs all break at once for a strictly-improving
   change.

**Reproduction.** `grep -n '"\.shadow-seg"\|\.shadow-seg' e2e/smoke/oracles/o9-shadow-palette.spec.ts`
→ lines 83, 108, 150. `grep -rn "shadow-seg" demo/ --include="*.css"` → 0 (it exists only in the
SFC's scoped block).

**Proposed cure.** The component should publish what the oracle needs to assert. Add
`data-slot="shadow-palette-seg"` (or, post-cure, select `[data-slot="skeleton"]` inside the plate)
and re-point the three oracle legs. Tests select published contracts; scoped classes are private.

---

## L-10 · MINOR — `count` has no domain, and the domain it implicitly has is stated in four places

**Mechanism.** The k-value has no single home. Its range, its default, and its meaning are each
re-declared by an unrelated file.

```
demo/workbenches/extract/ExtractControls.vue:28-30    :min="1"  :max="16"  :step="1"     ← the range
demo/workbenches/extract/composables/useExtractSession.ts:44   const colorCount = ref(5) ← default #1
demo/workbenches/extract/composables/useExtractSession.ts:181  colorCount.value = 5      ← default #2 (reset)
demo/palettes/browser/card/ShadowPalette.vue:85       const { count = 5 } = …            ← default #3
demo/palettes/browser/card/PaletteCardSkeleton.vue:87 const { count = 5, … } = …         ← default #4
```

The prop's type is `count?: number` (`:88`) — it admits `0`, `-1`, `2.5`, `NaN`, `1e6`, none of
which the producer can emit and none of which the component defends against. `v-for="i in count"`
(`:53`, `:73`) renders zero children for any `n <= 0` or `NaN`, so the plate degenerates silently to
a 40px empty band plus the two meta blocks — a shape that means nothing and announces nothing
(`aria-hidden`, `:44`). At the top end, `count=16` is legal and drives a measured 3-row wrap
(`OM-15` §3.2: ≈276px, roughly double the k=5 height).

**Reproduction.** NONE for the degenerate render — this is a **hypothesis** about an
out-of-contract input; the *type* admits it and no runtime guard exists, which is the finding. The
four-way default duplication and the 1..16 range are file:line facts above. The k=5 default and the
5-cell render are confirmed live (`segCount: 5` in the L-1 measurement).

**Proposed cure.** One home for the k domain, in the session that owns it:

```ts
// demo/workbenches/extract/composables/useExtractSession.ts
export const K_RANGE = { min: 1, max: 16, default: 5 } as const;
export type ClusterCount = number;  // clamped at the single mutation point (:171)
```

`ExtractControls` binds `K_RANGE`; the ghost takes `count: number` with **no default** (a required
prop — there is no sensible ghost without a k), and the two 5s in the two ghost files die.

---

## L-11 · INFO — the demo's *type* view of the published surface is a different set from the *runtime* published surface

**Mechanism.** Public-surface drift between `package.json#exports` (the runtime truth, and the
source the Vite self-alias set is machine-derived from) and `tsconfig.demo.json`'s hand-maintained
`paths` map. Out of this component's own cone — `ShadowPalette` imports nothing — but squarely
inside the axis's mandate, and it is the one place where a demo import a real consumer *could not
write* would still typecheck.

```
$ node -e "console.log(Object.keys(require('./package.json').exports).join(' '))"
./color ./value ./css ./easing ./math ./transform ./quantize          ← 7 keys, NO "." root

$ node -e "…JSON.parse(tsconfig.demo.json).compilerOptions.paths…"
vue @vue/* @mkbabb/value.js @mkbabb/value.js/color @mkbabb/value.js/parsing
@mkbabb/value.js/math @mkbabb/value.js/easing @mkbabb/value.js/units
@mkbabb/value.js/transform @mkbabb/value.js/quantize
```

| specifier | `exports` publishes it? | `tsconfig.demo` types it? | measured runtime |
|---|---|---|---|
| `@mkbabb/value.js` (root) | **no** | **yes** (`:42` → `dist/index.d.ts`) | `ERR_PACKAGE_PATH_NOT_EXPORTED` |
| `@mkbabb/value.js/parsing` | **no** | **yes** (`:44`) | `ERR_PACKAGE_PATH_NOT_EXPORTED` |
| `@mkbabb/value.js/units` | **no** | **yes** (`:47`) | (same shape — no `dist/subpaths/units.*`) |
| `@mkbabb/value.js/css` | **yes** | **no** | resolves, 19 exports |
| `@mkbabb/value.js/value` | **yes** | **no** | resolves |

```
$ node --input-type=module -e "import('@mkbabb/value.js').then(…).catch(e=>console.log('ROOT FAIL:',e.code,'|',…))"
ROOT FAIL: ERR_PACKAGE_PATH_NOT_EXPORTED | No "exports" main defined in …/package.json
$ node --input-type=module -e "import('@mkbabb/value.js/parsing')…"
PARSING FAIL: ERR_PACKAGE_PATH_NOT_EXPORTED
$ node --input-type=module -e "import('@mkbabb/value.js/css')…"
CSS OK 19
```

`ls dist/subpaths/` confirms: `color css easing math quantize transform value` — no `parsing`, no
`units`, no `index` under `subpaths`. So three of the demo program's nine typed value.js specifiers
name modules the package does not publish, and two published ones are typed only by accident (they
resolve through the `node_modules/@mkbabb/value.js` self-link, which is a real directory, not a
symlink — `ls -la node_modules/@mkbabb/` shows a materialised copy dated `Jul 17 21:10`).

Severity is INFO only because nothing currently imports the three phantoms (0 hits repo-wide) — but
the map *licenses* them: a future demo file writing `import { … } from "@mkbabb/value.js/parsing"`
typechecks green and crashes at runtime. **The one file in the repo that is generated from the
exports map cannot drift (`vite.config.ts:37-50`); the one that is hand-maintained has.**

**Proposed cure.** Generate `tsconfig.demo.json`'s value.js `paths` from `package.json#exports` the
same way `vite.config.ts` generates its aliases, or delete the `paths` entries outright and let the
self-link's `exports` map be the sole authority (it already resolves `/css` correctly with no
`paths` entry at all — which is the proof the entries are redundant as well as wrong).

---

## L-12 · INFO — `demo/ui/` is 19 one-line alias barrels; the cure must not route through them

**Mechanism.** Edict 2 (no aliases / shims) and edict 4 (glass-ui is the design system, not
`demo/ui/`), measured:

```
$ for d in demo/ui/*/; do n=$(find "$d" -type f | wc -l); echo "$d files=$n"; done
demo/ui/alert/ … demo/ui/tooltip/     19 directories, files=1 each, every index.ts a glass-ui re-export
$ cat demo/ui/skeleton/index.ts
export { Skeleton } from "@mkbabb/glass-ui";
```

`ShadowPalette` does not consume this layer (it imports nothing), but its siblings do
(`PaletteCardSkeleton.vue:85`, `AdminListSkeleton.vue:23`), and the L-5 cure routes this component
into `<Skeleton>`. **It must import from `@mkbabb/glass-ui` directly, not from
`demo/ui/skeleton`** — otherwise the cure adds a twentieth consumer to a shim layer that exists only
to rename a package. Corroborated independently by the sibling seat
(`../PaletteCardSkeleton/challenge-L-library.md` L-4).

---

## Greenfield: the module lattice, stated concretely

Structuring this today with no legacy, the lattice has **four** owners where it currently has seven,
and `ShadowPalette.vue` is not one of them.

```
@mkbabb/glass-ui  (producer — where variants live, edict 4)
  Skeleton                      + --skeleton-bg      tone seam   (today: hardcoded var(--muted))
                                + --skeleton-delay   stagger seam (today: none)
                                + register: "scan" | "breath" | "none"
                                = the three environment carve-outs come free, once, for everyone
  WatercolorDot                   already owns the swatch silhouette (variant="ghost" exists)

demo/palettes/browser/card/
  PaletteCardShell.vue    NEW.   Geometry ONLY. Three named slots (strip / meta / swatches).
                                 Sole owner of  h-10 · px-3 py-2.5 · px-3 pb-3 gap-2 ·
                                 border-t border-border/15 · rounded-card · border-card-edge ·
                                 bg-well · cartoon-surface · NO overflow-hidden (PaletteCard.vue:16-18)
                                 Props: swatchClass, count.  Zero colour, zero motion, zero a11y.
  PaletteCard.vue                Shell + live content.       (unchanged props/emits)
  PaletteCardSkeleton.vue        Shell + <Skeleton> fills.   THE ONE GHOST.
                                   count: number (required — no default; L-10)
                                   --skeleton-bg on the shell root; --skeleton-delay per block
                                   swatches render <WatercolorDot variant="ghost" :seed="i">  (L-4)
                                   ALWAYS aria-hidden — the producer already ruled this
                                   (Skeleton hardcodes aria-hidden and strips role/aria-* from attrs)
  ShadowPalette.vue       DELETED.

demo/workbenches/extract/
  ExtractWorkbench.vue           <PaletteCardSkeleton :count="k" />  in the v-else branch,
                                 reached through the palettes/browser/card barrel it ALREADY
                                 imports from (:196-200).  The loading announcement, if one is
                                 wanted, lives HERE — on the host, as a visually-hidden live
                                 region — not on the ghost.  (Kills the role=status/aria-hidden
                                 fork that is the two components' only remaining difference.)

demo/ui/skeleton/         DELETED (and its 18 siblings) — import from @mkbabb/glass-ui.  (L-12)
demo/styles/utils.css     .skeleton-ink-register → one line: --skeleton-bg.  (L-8)
eslint.config.js          G-DEMO-* re-pointed at the real tree, guarding DIRECTION.  (L-3)
tsconfig.demo.json        value.js paths generated from package.json#exports, or deleted.  (L-11)
e2e/…/o9-shadow-palette   asserts on published data-slots, not scoped classes.  (L-9)
```

**What this buys, measured.** 115 lines of `ShadowPalette.vue` and ~22 dead lines of
`PaletteCardSkeleton.vue` evaporate. The seven geometry constants, the four stagger expressions and
the two `count = 5` defaults each get exactly one home. The forced-colors erasure (L-1), the
reduced-transparency gap, the swatch-shape divergence (L-4) and the dead custom properties (L-8)
all cease to be reachable states rather than being separately patched. And the cross-feature edge
(L-2) becomes ordinary: Extract imports one more symbol from a barrel it already imports three
symbols from, and palette-browser's seam publishes only components palette-browser owns.

**The single asymmetry worth naming.** The two ghosts differ in exactly two axes — motion register
(pulse vs scan) and announcement (`aria-hidden` vs `role="status"`). The first is a producer
`register` prop; the second belongs to the *host*, because "is work happening" is knowledge the
ghost does not and should not have. Once both are relocated, the two components are byte-equivalent
and the second one has no reason to exist. **That, and not the size or the copy, is why there are
two files.**

---

## Cross-references

- **`docs/tranches/V/megatranche/audit/om-15-text/TEXT-CONTRIVANCE-AUDIT.md` §3** — the owner-marked
  `OM-15` already rules on this component's *size and copy*, and its §3.3.5 independently identifies
  the near-duplication (`ShadowPalette.vue:51-80` ≡ `PaletteCardSkeleton.vue:44-77`). Its cure
  option (A) is **delete the seat entirely**. Nothing in this report contradicts that: if the seat
  dies, L-1/L-2/L-4/L-6/L-7/L-9/L-10 die with it, and L-3/L-5/L-8/L-11/L-12 survive unchanged
  because they are not about this file.
- **`../PaletteCardSkeleton/challenge-L-library.md`** — the sibling seat, same axis. Its L-1
  (glass-ui `Skeleton` has one prop; the four custom properties have zero readers) and L-2 (three
  hand-copied implementations of the card lattice) are independently re-verified here from the
  shipped `.d.ts` and `glass-ui.css`. This report does not restate them; L-5 extends them by naming
  the *producer-side* missing seam as the root cause, and L-1 measures a consequence unique to the
  hand-rolled path.
- **`docs/tranches/V/megatranche/audit/visual/REPORT.md`** — the `/#/extract` rows are clean on
  every automated axis (`pageErrors 0`, `consoleErrors 0`, `horizontalOverflow 0`,
  `blankOrNearBlank 0`, all four matrices, lines 122/137/152/167). The 6 `smallTapTargets` and 3
  `namelessButtons` on that route belong to `ExtractControls`, not to this `aria-hidden` plate. The
  visual matrix has **no forced-colors capture of `/#/extract`**
  (`shots/forced-colors-desktop/` holds only adminusers · blob · browse · gradient · picker), which
  is why L-1 required a live probe and why the automated corpus reports this component green.
