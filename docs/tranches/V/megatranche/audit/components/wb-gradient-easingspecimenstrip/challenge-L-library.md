# CHALLENGE-L — library structure · `EasingSpecimenStrip.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model id `claude-opus-5[1m]` — the tier
this seat was spawned with. Declared, not inherited.

---

## Subject

`demo/workbenches/gradient/GradientVisualizer/easing/EasingSpecimenStrip.vue` (215 lines) and its
module neighbourhood:

| file | lines | role |
|---|---:|---|
| `easing/EasingSpecimenStrip.vue` | 215 | the strip (subject) |
| `easing/easingCatalogue.ts` | 230 | tile catalogue + literal minting + glyph painting + interval identity |
| `easing/useSpecimenRows.ts` | 74 | per-interval row derivation |
| `easing/EasingAuthoringStage.vue` | 116 | the sibling seat around glass-ui `<EasingPicker>` |
| `GradientVisualizer/GradientEasingEditor.vue` | 295 | the host that mounts the strip |

Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
Live probe origin `http://localhost:9000/#/gradient` (dev server, read-only; no interaction that
mutates state was performed).

---

## Verdict

**DEFECTIVE.** Eleven findings; six MAJOR. The dominant mechanism is a single one:
**value.js's published surface under-specifies what it knows, so its consumers re-declare that
knowledge locally — and the local copies rot.** Two independent instances of that mechanism
(L-1, L-2) are the deepest defects here. One MAJOR (L-5) is glass-owned and is FOLD-banked, not
patched.

---

## Import trace — every edge, and whether it may be crossed

`EasingSpecimenStrip.vue`

| line | specifier | resolves to | verdict |
|---|---|---|---|
| 11 | `vue` | host vue | ✅ |
| 12 | `@vueuse/core` → `useMediaQuery` | devDep | ⚠️ **L-3** — wrong owner |
| 13 | `@mkbabb/glass-ui/fading-scroll` | glass-ui `exports["./fading-scroll"]` | ✅ published |
| 14 | `@mkbabb/glass-ui/chip` | glass-ui `exports["./chip"]` | ✅ published |
| 15–16 | `./easingCatalogue` (`SPECIMEN_FAMILIES`, `type SpecimenTile`) | sibling | ✅ |

`easingCatalogue.ts`

| line | specifier | verdict |
|---|---|---|
| 22–26 | `@mkbabb/value.js/easing` (values) | ✅ `package.json exports["./easing"]` |
| 27–30 | `@mkbabb/value.js/easing` (types) | ✅ `import type` |
| 31–35 | `@mkbabb/glass-ui/easing` (types) | ✅ published |
| 36 | `../../composables/useGradientModel` → `type GradientInterval` | ⚠️ **L-8** — a curve catalogue must not know what a gradient is |

`useSpecimenRows.ts`

| line | specifier | verdict |
|---|---|---|
| 13 | `../../../../color-session/useContrastSafeColor` | ✅ direction (feature → session); depth 4 is a symptom, see L-8 |
| 14–15 | `../../composables/useGradientCSS` / `useGradientInterpolation` | ✅ |

**Published-surface verdict: CLEAN.** Every library import in this subtree goes through a real
subpath in `package.json#exports` (`./easing`) or glass-ui's exports map
(`./fading-scroll`, `./chip`, `./easing`). There is no `@src/*` reach, no `dist/` deep path, no
import a real consumer could not write. `vite.config.ts:41–51` *generates* the self-alias set from
`package.json#exports` so runtime resolution cannot drift from the published map. The demo's proof
of the public API is honest here.

---

## Findings

### L-1 — MAJOR · the catalogue silently drops 6 of value.js's 30 `bezierPresets`

`easingCatalogue.ts:174` hardcodes the taxonomy:

```ts
const FAMILY_ORDER = ["css", "sine", "quad", "cubic", "expo", "circ", "back", "steps"];
…
return FAMILY_ORDER.filter((f) => byFamily.has(f)).map(…);   // :191
```

A **filter**, not a sort. Any preset whose derived family is absent from that list vanishes with no
diagnostic. Reproduced against the shipped `dist/subpaths/easing.js`:

```
$ node scratch/families.mjs
ALL presets: 30
KEPT    css     linear, ease, ease-in, ease-out, ease-in-out
KEPT    sine    ease-in-sine, ease-out-sine, ease-in-out-sine
KEPT    quad    ease-in-quad, ease-out-quad, ease-in-out-quad
KEPT    cubic   smooth-step-3, ease-in-cubic, ease-out-cubic, ease-in-out-cubic
DROPPED quart   ease-in-quart, ease-out-quart, ease-in-out-quart
DROPPED quint   ease-in-quint, ease-out-quint, ease-in-out-quint
KEPT    expo    ease-in-expo, ease-out-expo, ease-in-out-expo
KEPT    circ    ease-in-circ, ease-out-circ, ease-in-out-circ
KEPT    back    ease-in-back, ease-out-back, ease-in-out-back
kept bezier tiles: 24 + 3 steps = 27
DROPPED: 6
```

Confirmed live — the rendered strip carries exactly 27 tiles and 8 family eyebrows:

```js
// page.evaluate on http://localhost:9000/#/gradient
{ tileCount: 27, glassChipCount: 27,
  families: ["css","sine","quad","cubic","expo","circ","back","steps"] }
```

The module's own docstring (`easingCatalogue.ts:15–17`) asserts *"the tile catalogue **IS** value.js
`bezierPresets` + the steps family — the SAME catalogue the glass-ui `<EasingPicker>`'s preset menu
speaks (never a second mint)"*. That statement is **false**: it is `bezierPresets` minus whatever
families the seat forgot to enumerate, and it *is* a second mint of the taxonomy.

**Downstream consequence** (`easingCatalogue.ts:219–223`): `tileIdFor()` matches only against
`SPECIMEN_TILES`, so an interval whose literal is `cubic-bezier(0.895, 0.03, 0.685, 0.22)` — value.js
`ease-in-quart`, a first-class library preset — matches nothing, `specimenNameFor()` returns
`"custom"`, and the strip presses no tile. A named library curve reads as unnamed. The literals:

```
ease-in-quart      cubic-bezier(0.895, 0.03, 0.685, 0.22)
ease-out-quart     cubic-bezier(0.165, 0.84, 0.44, 1)
ease-in-out-quart  cubic-bezier(0.77, 0, 0.175, 1)
ease-in-quint      cubic-bezier(0.755, 0.05, 0.855, 0.06)
ease-out-quint     cubic-bezier(0.23, 1, 0.32, 1)
ease-in-out-quint  cubic-bezier(0.86, 0, 0.07, 1)
```

The gate is blind to it — `test/gradient-v4-consume.test.ts:56` asserts only
`expect(SPECIMEN_TILES.length).toBeGreaterThan(20)`. 27 > 20; 33 > 20; 21 > 20.

**Mechanism.** The library owns the presets but publishes them as a bare `Record<string, quad>`; it
does not publish their taxonomy. So the consumer re-derived the taxonomy by regex
(`easingCatalogue.ts:168`) and then *closed* it with a hand-written allow-list. Adding a preset
family to value.js is now a silent no-op in the demo.

**Cure (gestalt).** value.js `/easing` publishes the structure it already has implicitly:

```ts
// src/easing — the presets become self-describing
export interface BezierPreset { name: BezierPresetName; family: string; variant: string; points: readonly [number,number,number,number] }
export const bezierPresetList: readonly BezierPreset[];   // ordered, families intact
```

The demo then groups by `family` in encounter order and never filters. **Cure (KISS, today, no
library change):** change `.filter()` to a sort — known families in `FAMILY_ORDER` order, unknown
families appended — so a new library family always appears, merely at the end. One line. The
regex-derived family stays a demo concern only until the library publishes the field.

---

### L-2 — MAJOR · `/css` parses timing functions but cannot serialize them; three consumers hand-mint the literal

`src/subpaths/css.ts` exports `parseTimingFunction` (line 53) and `serializeCssColor` (line 54) —
the color grammar is symmetric, the timing grammar is not. `grep -rn "export function serialize" src/`
returns `serializeCssValue`, `serializeCssColor`, `serializeKeyframeSelector`,
`serializeTimelineOptions` — **there is no `serializeTimingFunction` anywhere in `src/`.**

Three hand-rolled inverses exist as a direct result:

1. **glass-ui** — `useEasingPicker.readout` ("The complete re-parseable readout literal for the
   active mode", `node_modules/@mkbabb/glass-ui/dist/components/easing/composables/useEasingPicker.d.ts`).
2. **this component's catalogue** — `easingCatalogue.ts:48–56`, whose own comment (`:41–45`) states
   it mirrors glass-ui's minting *byte-for-byte*:
   ```ts
   export function bezierLiteral(quad: readonly number[]): string {
       const [x1, y1, x2, y2] = quad.map((n) => +n.toFixed(3));
       return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
   }
   export function stepsLiteral(n: number, term: JumpTerm): string { return `steps(${n}, ${term})`; }
   ```
3. **the gradient composable** — `useGradientCSS.ts:53–62`, a third copy as a frozen string:
   ```ts
   export function linearInterval(): GradientInterval {
       return { mode: "bezier", css: "cubic-bezier(0, 0, 1, 1)", fn: linear, … };
   }
   ```

The catalogue's comment names #3 as its own precedent — *"the `linearInterval()` precedent
(useGradientCSS.ts), **generalized** to the whole catalogue"*. It generalized the duplicate instead
of retiring it. That is a dual path, alive and documented (edict 2).

`bezierLiteral` and `stepsLiteral` are `export`ed and consumed **only inside their own file**
(`grep -rn "bezierLiteral\|stepsLiteral" demo/ test/` → 4 hits, all in `easingCatalogue.ts`) — dead
public surface on top of a duplicated law.

**Cure (gestalt).** value.js `/css` exports the exact inverse of what it already parses:

```ts
export function serializeTimingFunction(ast: CssTimingFunction): string;
```

`parseTimingFunction ∘ serializeTimingFunction ≡ id` becomes a round-trip property test over the
whole `bezierPresets` corpus + the steps space. glass-ui's `readout`, `bezierLiteral`,
`stepsLiteral`, and `linearInterval`'s frozen string all collapse into one call. The
"byte-identity with the picker" law stops being a comment two packages must both honour by hand and
becomes a fact of the grammar module. This is the same shape the library already got right for
colors (`parseCssColor` / `serializeCssColor`).

---

### L-3 — MAJOR · reduced motion has four homes in the demo and a fifth, published and unused, in the design system

`EasingSpecimenStrip.vue:12,47`:

```ts
import { useMediaQuery } from "@vueuse/core";
const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
```

glass-ui — the declared design system — **publishes exactly this**:

```
node_modules/@mkbabb/glass-ui/dist/composables/motion/core/useReducedMotion.d.ts
  /** Read the current OS preference without subscribing (SSR-safe). */
  export declare function readReducedMotion(): boolean;
  /** Share one reactive OS preference and one MediaQueryList listener. */
  export declare function useReducedMotion(): Readonly<Ref<boolean>>;
```

Re-exported from `./composables/motion/core/index.d.ts:6` → `motion-core.d.ts` → the published
subpath `@mkbabb/glass-ui/motion-core`. The demo **already imports from that exact module**
(`useMixingAnimation.ts:42`, `useInertiaGesture.ts:3` — both take `useRAFLoop` from it) and then
still hand-rolls PRM.

The census across `demo/`:

| site | mechanism |
|---|---|
| `EasingSpecimenStrip.vue:47` | `@vueuse/core` `useMediaQuery` — **the only vueuse-PRM site in the demo** |
| `useInertiaGesture.ts:36` | glass-ui `useBreakpoint("(prefers-reduced-motion: reduce)")` — a *breakpoint* composable pressed into a non-breakpoint query |
| `useMixingAnimation.ts:70` | same misuse |
| `useOverture.ts:96` | raw `window.matchMedia(…).matches` (non-reactive) — this is `readReducedMotion()` |
| `useDockArrival.ts:26` | raw `window.matchMedia(…).matches` — same |
| glass-ui `useReducedMotion()` | the shared, single-listener owner — **zero demo consumers** |

Worse, inside a single open specimen row the duplication is simultaneous: glass-ui's
`<EasingPicker>` (mounted by the sibling `EasingAuthoringStage.vue:29`) already runs glass-ui's
shared `useReducedMotion` — proven from the dev graph:

```
$ grep -o 'from "[^"]*"' node_modules/.vite/deps/@mkbabb_glass-ui_easing.js | sort -u
…
from "./useReducedMotion-vCXA_vyM-DVuAJw8b.js"
```

So one row carries two independent `MediaQueryList` subscriptions for one OS fact, one of them
per-strip-instance (see L-4: it multiplies by interval count).

**Cure.** One line in the strip:

```ts
import { useReducedMotion } from "@mkbabb/glass-ui/motion-core";
const prefersReducedMotion = useReducedMotion();
```

The `@vueuse/core` import dies. Fleet-wide the other four sites follow (`readReducedMotion()` for
the two one-shot boot sites, `useReducedMotion()` for the two `useBreakpoint` misuses). No new demo
module and no new `shared/` dir is needed — glass-ui already owns the concept, which is exactly what
edict 4 demands.

---

### L-4 — MAJOR · a 27-tile, 133-node strip is mounted per interval row, though only one row can ever be open

`GradientEasingEditor.vue`:

```
:61   const openInterval = ref<number | null>(0);          // SINGLE — one row open, ever
:112  v-for="row in specimenRows"                          // every interval gets a row
:144  v-show="openInterval === row.index"                  // v-show MOUNTS
:152  v-if="openInterval === row.index && openIntervalRamp" // the cheap ramp IS gated
:161  <EasingSpecimenStrip … />                            // the 133-node strip is NOT
```

Measured live at K = 1 interval:

```js
{ stripNodeCount: 133, pageNodeCount: 579, stripShare: 23.0,   // percent of the whole page
  tileCount: 27, glassChipCount: 27, stripCount: 1 }
```

One selection surface is **23 % of the entire page's element count**. Because the strip sits inside
`v-show` rather than `v-if`, a K-interval gradient mounts K strips: 133·K DOM elements, 27·K Chip
component instances, K `MediaQueryList` listeners (L-3) — for a surface of which at most one is ever
visible. The author already recognised the cost for the *cheap* ramp and gated it with `v-if` at
`:152`; the expensive thing next to it is ungated.

The strip's own source documents the consequence and works around it rather than removing it —
`EasingSpecimenStrip.vue:38–40`:

> *"scoped to THIS strip's own subtree (sibling rows mount hidden twins of every data-specimen id)"*

The workaround is the evidence.

**Cure (architectural transposition).** Hoist **one** `<EasingSpecimenStrip>` out of the `v-for`,
bound to `openInterval`:

```
GradientEasingEditor
├── v-for row → head (always) + readout rail + authoring stage   [per-row]
└── <EasingSpecimenStrip :selected-id="openRow?.tileId" @select="onTileSelect(openInterval, …)" />
    rendered ONCE, inside the open row's disclosure via <Teleport> or by moving the disclosure
    body out of the loop entirely (it can only ever hold one row's content)
```

What dies with it: the `visible` prop (a strip that exists is visible), the "hidden twins" scoping
paragraph, the subtree-scoped `querySelector`, and 133·(K−1) DOM nodes. What it enables: with one
instance the strip can afford a wrapped grid instead of a 3.4× horizontal scroll — measured
`scrollWidth: 1482` against `clientWidth: 436`, i.e. ~8 of 27 tiles reachable at desktop and ~5 of 27
at 390 px mobile (see `shots/safari-mobile-light/gradient.png`).

---

### L-5 — MAJOR · **glass-owned, FOLD-BANK** · Chip's material CSS is orphaned *and unreachable* through glass-ui's published surface

This is the known M3 / INBOX I-9 / D58 residual. It is worse than "not imported": it is
**not importable**.

- The file ships: `node_modules/@mkbabb/glass-ui/dist/styles/glass/glass-chip.css` (one line, the
  full `.glass-chip` recipe — flood, cell radius, pressed band, coarse-pointer touch floor).
- Nothing in the package `@import`s it. `dist/styles/glass.css` lists 18 imports
  (`material, ladder, ladder-undershadow, grain-overlay, accent-tone, rim, surfaces, surfaces-pager,
  control-surfaces, glass-capsule, liquid-fill, surface-axis, material-roles, reveal, liquid-enter,
  deep, defined, squircle`) — no `glass-chip.css`. `dist/styles/index.css` does not reference it
  either. `grep -rn 'glass-chip.css' node_modules/@mkbabb/glass-ui/dist` → **no matches**.
- glass-ui's `exports` map has `./styles`, `./styles.css`, `./styles/fonts`, `./styles/theme` — and
  **no `./styles/*` wildcard**. A consumer therefore cannot deep-import the orphan even knowingly.
  The demo consumes both published style surfaces correctly (`demo/styles/foundation.css:56–57`).

Measured in the live page — three independent proofs the recipe never lands:

```js
// selected vs unselected specimen tile, computed styles
selected:   { borderRadius: "9999px",
              backgroundColor: "oklab(0.925644 0.0094459 0.0291917 / 0.83872)",
              borderColor: "rgb(198, 180, 159)", color: "rgb(91, 70, 51)",
              chipTintFloor: "", chipFloodT: "" }
unselected: { borderRadius: "9999px",
              backgroundColor: "oklab(0.925644 0.0094459 0.0291917 / 0.83872)",   // BYTE-IDENTICAL
              borderColor: "rgb(198, 180, 159)", color: "rgb(91, 70, 51)",
              chipTintFloor: "", chipFloodT: "" }
--accent-band resolves fine: "color-mix( in oklab, light-dark(hsl(30 85% 96%), hsl(26 22% 17%)), oklch(…) 18% )"
--radius-card: "1rem"   --touch-target: "2.75rem"
```

1. `border-radius: 9999px` on an element carrying `glass-chip--cell`, where
   `.glass-chip--cell, .glass-chip--cell.glass-capsule { border-radius: var(--radius-card) }` (= 1rem,
   token present) should win. The `shape="cell"` prop is **inert**; the `glass-capsule` pill radius
   takes the field. The tiles render as **perfect circles**, not cells.
2. Selected and unselected chips are byte-identical in background, border and text colour.
   `.glass-chip[data-mode="selectable"][data-state="on"] { background-color: var(--accent-band);
   border-color: var(--accent-edge); color: var(--accent-ink) }` never applies, and neither does the
   `::after` `plus-lighter` radial flood. Selection reads **only** through this seat's own scoped
   `--motion-accent` ink on the glyph + label.
3. `--chip-tint-floor` and `--chip-flood-t` compute to the empty string — the `@property
   --chip-flood-t` registration and the tint floor declaration are absent from the document.

The coarse-pointer block in the same orphaned file
(`@media (pointer: coarse) { .glass-chip--interactive { min-inline-size / min-block-size:
var(--touch-target, 2.75rem) } }`) is likewise absent, so mobile receives no tap-target bump
(compounds L-6).

**What it looks like** (captures cropped from the mega-tranche visual audit; copies alongside this
report as `strip-light.png` / `strip-dark.png`):

`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/gradient.png` — the eight
visible tiles are **round pucks with a raised bevel and drop shadow**, floating on the plate rather
than sitting flat in it. Each circle inscribes a square of content, so the sparkline is pinched and
the wider labels (`in-out`) run to the circle's edge on both sides. The pressed tile (`linear`) is
the *same cream disc* as its seven neighbours — its only selection cue is the teal stroke on its
sparkline and a bolded teal label.
`…/safari-desktop-dark/gradient.png` — identical in dark: same circles, same absent band, cyan ink
carrying selection alone.

**Disposition: FOLD-BANK on glass (BJ born-RED), NO local patch.** A demo-side
`.specimen-tile { border-radius: var(--radius-card) }` plus a hand-rolled pressed wash would fork
the design system's chip recipe into `demo/` — precisely the masking fallback MT-F014 and edict 2
forbid, and it would silently diverge the moment glass fixes the import. Our mark M3 already carries
this; this seat adds the *unreachability* fact (no `./styles/*` export key) and the three computed-
style proofs to the packet.

---

### L-6 — MAJOR · the seat's per-instance geometry override on the Chip root puts the tile 0.2 px under the design system's own `--touch-target`

`EasingSpecimenStrip.vue:163–170` restyles the **producer's root element** from outside:

```css
.specimen-tile {
    display: flex; flex-direction: column; align-items: center;
    gap: 0.125rem;
    padding: 0.3125rem 0.375rem 0.25rem;
    min-width: 2.75rem;
}
```

glass-ui's own cell recipe already declares that geometry —
`chipVariants.d.ts`: `cell: "glass-chip--cell flex-col gap-1.5 px-2 py-2.5 text-micro"`. The seat's
scoped rule (specificity 0,2,0 with the `data-v-*` attribute) beats the Tailwind utility (0,1,0) and
replaces it. That is an edict-5 violation with a measured a11y consequence:

```js
{ id: "ease", tileRect: { w: 44, h: 43.8 },
  padding: "5px 6px 4px 6px", gap: "2px",
  minWidth: "44px", minHeight: "auto",
  glyphBox: { w: 22, h: 22 }, labelBox: { h: 10.8, fs: "9px", lh: "10.8px" },
  touchTargetToken: "2.75rem" }
```

22 + 2 + 10.8 + 5 + 4 = **43.8 px** — exactly the measured height, against the house token
`--touch-target: 2.75rem` = 44 px. `min-height` is `auto`: the seat set an inline floor and no block
floor. Under the producer's own `py-2.5` (10 px each) the tile would be 22 + 2 + 10.8 + 20 = 54.8 px,
comfortably clear. The seat cut 11 px of the producer's padding and landed 0.2 px short.

(The mega-tranche visual audit does not flag it: `capture.mjs:98` filters on `w < 24 || h < 24`, a
threshold looser than the design system's own token. The six `smallTapTargets` on `/#/gradient` are
a slug input and four other controls, not these tiles.)

**Cure.** Stop overriding the producer root. Specimen scale is a **size axis on the cell recipe**,
which glass-ui already models (`ChipVariants` `SIZE.sm`): `<Chip mode="selectable" shape="cell"
size="sm">`. If `sm × cell` does not yet compose to specimen scale, that composition is a glass-owned
addendum on the same M3 packet — not a demo override. The seat keeps only what is genuinely its own:
the `--motion-accent` ink on `.tile-glyph path` / `.tile-label`.

---

### L-7 — MINOR · the strip reaches into the producer's private DOM by class name

`EasingSpecimenStrip.vue:58–60`:

```ts
// The FadingScroll root IS the scroll port (its documented DOM contract)
const port = el?.closest<HTMLElement>(".fading-scroll");
```

It is not a documented contract. `FadingScroll.vue.d.ts` declares five props
(`axis, fadeStart, fadeEnd, ariaLabel, ariaLabelledby`), one default slot, **no `defineExpose`, no
exposed port ref**. `.fading-scroll` is a literal inside the compiled render function
(`dist/fading-scroll-DhxXIhm2.js`: `class: a(["fading-scroll", e.axis === "y" ? "fading-scroll--y" :
"fading-scroll--x"])`). The consumer is depending on a compiled implementation detail.

And it buys nothing — the demo's own class is on the very same element:

```js
{ stripClass: "fading-scroll fading-scroll--x specimen-strip", portHasSpecimenStripClass: true }
```

**Cure (today, no glass change).** Take the root through Vue's own contract:

```ts
const stripRef = useTemplateRef<ComponentPublicInstance>("stripRef");   // <FadingScroll ref="stripRef">
const port = stripRef.value?.$el as HTMLElement | undefined;
```

Zero producer-private knowledge, and it survives any class rename. If the reveal deserves to be
first-class, bank a `defineExpose({ port })` / `scrollChildIntoView()` addendum on glass — the
`useFadingScroll(target)` composable is already published and already takes an explicit port, so the
component simply has not surfaced the same handle.

(The single-axis discipline the comment defends is *correct* and worth preserving verbatim — the
`scrollIntoView` ancestor-walk it replaced was the O-19 root cause. Only the selector is wrong.)

---

### L-8 — MINOR · `easingCatalogue.ts` holds four concerns, and the curve catalogue knows what a gradient is

| span | concern |
|---|---|
| 48–56 | CSS literal minting (dies under L-2) |
| 66–74 | SVG glyph painting |
| 98–203 | tile/family construction |
| 207–230 | **gradient-interval identity** (`isStepsInterval`, `tileIdFor`, `specimenNameFor`) |

The fourth forces `import type { GradientInterval } from "../../composables/useGradientModel"`
(line 36). A catalogue of easing curves must not know what a gradient is — and it does not need to:
every predicate reads exactly one field, `interval.css`.

**Cure.** Key the identity on the literal, not on the model:

```ts
export function tileIdForCss(css: string): string | null;
export function specimenNameForCss(css: string): string;
```

The `GradientInterval` import vanishes; the catalogue becomes a pure `@mkbabb/value.js/easing`
consumer with no feature knowledge, testable with string inputs alone. Greenfield lattice for this
subtree:

```
easing/
  specimens.ts        catalogue + glyph painter        ← imports value.js/easing ONLY
  EasingSpecimenStrip.vue   presentation               ← imports specimens.ts + glass-ui
  EasingAuthoringStage.vue  presentation               ← imports glass-ui/easing
../composables/
  useGradientEasing.ts  interval ↔ specimen identity   ← imports specimens.ts + the model
  useSpecimenRows.ts    row derivation                 ← as today
```

`useSpecimenRows.ts:13`'s four-level climb to `color-session/useContrastSafeColor` is *directionally*
correct (workbenches → color-session; color-session imports nothing from workbenches — verified, see
negative proofs) but its depth is the symptom: derivation logic is living at presentation depth. The
lattice above lifts it one level and shortens the reach to three.

---

### L-9 — MINOR · `isStepsInterval` is a masking dual-truth

`easingCatalogue.ts:207–209`:

```ts
function isStepsInterval(interval: GradientInterval): boolean {
    return interval.mode === "steps" || interval.css.startsWith("steps(");
}
```

The module's own stated law is that `css` is *"the persisted TRUTH"* (line 43) and that `mode` is a
field of the payload minted **from** it (`stepsTile`, lines 139–153, sets both from one source). The
`||` therefore accepts and papers over a state in which the two disagree, instead of forbidding it.
That is a masking fallback (edict 2) in three tokens.

**Cure.** `return interval.css.startsWith("steps(")`. If `mode` can genuinely diverge from `css`,
the model carries two truths for one fact — and *that* is the finding to fix, in
`useGradientModel`, not here.

---

### L-10 — INFO · array-getter watch source

`EasingSpecimenStrip.vue:50–51`:

```ts
watch(() => [selectedId, visible] as const, () => { … }, { immediate: true });
```

Allocates a fresh tuple per evaluation. Behaviourally fine (the getter only re-runs when a tracked
dep changes), but the idiomatic Vue 3.5 form for two independent sources is
`watch([() => selectedId, () => visible], …)`. Legibility only — **hypothesis-free, no defect
claimed**.

---

### L-11 — INFO · `tsconfig.demo.json#paths` has rotted away from `package.json#exports`

`vite.config.ts:36–51` *generates* its value.js self-alias set from `package.json#exports`
specifically so *"the alias set can never drift from the exports map"*. `tsconfig.demo.json` mirrors
the same fact **by hand**, and it has drifted:

| declared in `tsconfig.demo.json#paths` | reality |
|---|---|
| `@mkbabb/value.js` → `./dist/index.d.ts` | **no `.` key in `exports`; `dist/index.d.ts` does not exist** |
| `@mkbabb/value.js/parsing` → `./dist/subpaths/parsing.d.ts` | **not an export; file does not exist** |
| `@mkbabb/value.js/units` → `./dist/subpaths/units.d.ts` | **not an export; file does not exist** |
| `@mkbabb/value.js/{color,math,easing,transform,quantize}` | ✅ |
| — | `./css` and `./value` are real exports, **both omitted**, and `./css` is used: `useGradientCSS.ts:25` imports `parseTimingFunction` from `@mkbabb/value.js/css` |

```
$ ls dist/
anchors-C_wdoOYd.js  gh-pages  operations-CB_1wGy4.js  result-CZJK1CwL.js  subpaths
$ ls dist/subpaths/
color  css  easing  math  quantize  transform  value      (.js + .d.ts each)
```

The file's own comment calls it *"the CLOSED 8-key set"* and *"the 8 public keys"*; the map has 7
keys and three of the tsconfig's eight point at nothing. It typechecks today only because TS's
bundler resolution self-references through `package.json#exports` for the two omitted subpaths — the
`paths` block is simultaneously stale and redundant.

**Cure.** Delete the value.js entries from `tsconfig.demo.json#paths` and let self-reference through
`exports` do the work (one source of truth, the same one vite reads) — or, if an explicit map is
wanted for build determinism, generate it the way vite generates its aliases. Either way: one mirror,
not two.

---

## Negative proofs — hypotheses this seat killed

These were the obvious CHALLENGE-L suspects. Each is **sound**, with the evidence that proves it.

1. **Deep-import / false proof of the public API — NONE.** Every library import in the subject and
   its four neighbours resolves through a real key in `package.json#exports` (`./easing`) or
   glass-ui's exports map (`./fading-scroll`, `./chip`, `./easing`, and `./motion-core` at the
   sibling seats). No `@src/*`, no `dist/` deep path, no import a real npm consumer could not write.
   `vite.config.ts:41–51` derives the runtime aliases *from the exports map*, so drift is structurally
   impossible at runtime.
2. **Stale `dist/` (demo proving an old API) — NO.**
   `find src -name "*.ts" -newer dist/subpaths/easing.js` → empty. `dist/subpaths/easing.js` built
   `Jul 27 11:52`, newer than every source file.
3. **Dual value.js instance at this seam — NO.** glass-ui declares `@mkbabb/value.js: ^4.0.0`, and
   npm did materialise a second copy at `node_modules/@mkbabb/value.js` (4.0.0, its own `dist/`).
   It is **not in the graph**: no artefact under `node_modules/.vite/deps/` references that path
   (`grep -rl "node_modules/@mkbabb/value.js" node_modules/.vite/deps/*.js` → empty), and
   `_metadata.json`'s optimized set contains only `@mkbabb/glass-ui*` entries. The generated
   anchored-regex aliases catch glass-ui's bare `@mkbabb/value.js/{color,css,easing}` imports
   (7/4/2 occurrences in its dist) and fold them onto the repo's own `dist/`. One instance. The
   on-disk copy is a latent trap the alias defuses — worth an INFO note in the mega-tranche ledger,
   not a finding here.
4. **Dependency cycle / wrong direction — NO.** `useSpecimenRows.ts:13` climbs
   workbenches → color-session; `grep -rn "workbenches" demo/color-session/ demo/shell/ demo/platform/
   demo/shared/` finds only a prose mention in `color-model.ts:3` and the four *lazy*
   `defineAsyncComponent` imports in `shell/usePaneRouter.ts:72–75` (shell → feature, correct). No
   feature→shell edge, no cycle.
5. **`verbatimModuleSyntax` violation — NONE.** Every type-only import in the subtree is
   `import type`: `EasingSpecimenStrip.vue:16`, `easingCatalogue.ts:27,31,36`,
   `useSpecimenRows.ts:12,17`, `EasingAuthoringStage.vue:30`.
6. **Vue 3.5 idiom — CLEAN.** Reactive props destructure with default (`:18`), `useTemplateRef`
   (`:48`), controlled `:model-value` with no `defineModel` round-trip to go stale.
7. **Selection not exposed to assistive tech — NO.** glass-ui's Chip emits `aria-pressed` alongside
   `data-state` (`dist/chip-DFZQr6rV.js`), so L-5's missing pressed *wash* is purely visual; the
   state itself is announced. The strip additionally names the group (`role="group"`,
   `aria-label="Easing curve specimens"`, `:88–89`) and every tile (`:aria-label="tile.id"`, `:105`),
   verified live — all 27 tiles carry an accessible name.
8. **The `/#/gradient` nameless button is not ours.** Probed live: the single nameless button is
   `dock-icon-button glass-specular-track glass-capsule-hover dock-icon-button--compact` — the shell
   dock overflow control.
9. **The strip does not overflow the page.** `overflowX: 0` on all four gradient captures. The strip
   elements appear in the audit's `bleeding` list only because they are the scroll port's own
   overflowing content (`scrollWidth 1482` vs `clientWidth 436`), correctly clipped and masked
   (`maskImage` resolves, `--fade-end: 16px`).
10. **`glyphPath` is not duplicated.** `grep -rln "glyphPath\|generateCurveSVGPath\|1 - fn("
    demo/ src/` → two files, both in this subtree, one definition. The curve→path sampler has exactly
    one home in the repo. Cost measured (33 tiles, node, `dist/subpaths/easing.js`): cold build
    1.73 ms, warm 0.80 ms, 22 651 glyph chars — module-eval cost is not a finding.

---

## Greenfield lattice, stated concretely

Were this built today with no legacy, the ownership boundaries would be:

```
@mkbabb/value.js/easing   bezierPresetList: readonly BezierPreset[]   ← taxonomy is DATA, not regex   [L-1]
@mkbabb/value.js/css      parseTimingFunction ⟷ serializeTimingFunction (round-trip law)              [L-2]
@mkbabb/glass-ui/motion-core  useReducedMotion / readReducedMotion — the ONE PRM subscription         [L-3]
@mkbabb/glass-ui/chip     the chip material recipe, REACHABLE from ./styles; size × shape composes    [L-5,L-6]
@mkbabb/glass-ui/fading-scroll  the port exposed (defineExpose) — or consume useFadingScroll directly [L-7]

demo/workbenches/gradient/
  composables/useGradientEasing.ts     interval ⟷ specimen identity, keyed on the literal            [L-8,L-9]
  GradientVisualizer/easing/
    specimens.ts                       catalogue + glyph painter; value.js/easing is its ONLY import
    EasingSpecimenStrip.vue            ONE instance, hoisted out of the row loop                     [L-4]
    EasingAuthoringStage.vue           unchanged in shape
```

Net effect: the demo stops re-declaring library knowledge (L-1, L-2, L-3), stops overriding the
design system (L-6), stops touching producer-private DOM (L-7), and stops paying 133 nodes per
closed row (L-4). Three of the five moves are one-line consumer changes available **today** through
already-published surfaces (L-3, L-7, and the `.filter()`→sort half of L-1); the other two are
library addenda (value.js `serializeTimingFunction` + `bezierPresetList`) that retire duplicated law
in two packages at once. L-5 is banked on glass and must not be patched here.

---

## Standing-edict compliance

| edict | verdict |
|---|---|
| 1 · no god modules | ⚠️ `easingCatalogue.ts` = 4 concerns / 230 lines — **L-8** |
| 2 · no legacy / dual paths / masking fallbacks | ❌ literal minting ×3 (**L-2**), `isStepsInterval` `\|\|` (**L-9**) |
| 3 · KISS, no contrivance | ✅ no invented `shared/` dir, no wrapper components |
| 4 · glass-ui is the design system | ❌ PRM re-minted from vueuse though glass publishes it (**L-3**) |
| 5 · root-level styling | ❌ `.specimen-tile` overrides the Chip root's own recipe (**L-6**) |
| 6 · animations never deleted | ✅ nothing deleted; the strip's only motion is the PRM-gated `scrollBy` |
| 7 · idiomatic Vue 3.5 | ✅ (L-10 is legibility, not a defect) |
| 8 · `verbatimModuleSyntax` | ✅ clean throughout the subtree |

---

## Commands run (reproduce)

```bash
# taxonomy drop (L-1)
node -e 'import("/…/value.js/dist/subpaths/easing.js").then(m=>console.log(Object.keys(m.bezierPresets).length))'   # 30
#   vs live page: document.querySelectorAll("[data-specimen]").length                                              # 27

# serializer asymmetry (L-2)
grep -rn "export function serialize" src/          # 4 hits, none for timing functions
grep -n "parseTimingFunction\|serializeCssColor" src/subpaths/css.ts     # :53 :54

# PRM ownership (L-3)
cat node_modules/@mkbabb/glass-ui/dist/composables/motion/core/useReducedMotion.d.ts
grep -rn "prefers-reduced-motion" demo --include="*.ts" --include="*.vue"

# orphaned chip CSS (L-5)
grep -rn 'glass-chip.css' node_modules/@mkbabb/glass-ui/dist        # no matches
grep -n '@import' node_modules/@mkbabb/glass-ui/dist/styles/glass.css

# tsconfig drift (L-11)
ls dist/ dist/subpaths/
python3 -c "import json;print(list(json.load(open('package.json'))['exports']))"
```
