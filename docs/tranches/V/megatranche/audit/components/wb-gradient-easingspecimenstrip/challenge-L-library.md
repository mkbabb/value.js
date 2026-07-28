# CHALLENGE-L — library structure · `EasingSpecimenStrip.vue`

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model id `claude-opus-5[1m]` — the tier this
seat was spawned with. Declared, not inherited.

---

## Provenance of this document (r2)

A prior L-seat report existed at this path (written `2026-07-27 18:58`, 35 655 B). This is **r2**: a
second, independent pass that re-derived the corpus from source and then merged. Nothing from r1 is
lost — every r1 finding (L-1 … L-11) is carried forward with its ID and evidence intact, and a
verbatim copy of r1 was taken before the rewrite.

r2 changes:

| r1 finding | r2 action |
|---|---|
| L-1 | **strengthened** — the consequence is now *executed end-to-end in the live app*, not inferred from literals |
| L-2 | **strengthened + narrowed** — a 33-case equivalence probe proves the copies are *currently in sync*; the defect is latent, and the gate that guards it covers **1 of 30** presets |
| L-3, L-4, L-6..L-10 | carried forward; L-4 independently re-measured (511-node page, 26.0 %) |
| L-5 | **strengthened** — a fourth, direct proof: a scan of every loaded stylesheet finds **zero** `.glass-chip*` selectors |
| L-11 | **strengthened** — the TS resolver was *traced*, proving the `paths` block is dead as well as stale |
| — | **NEW L-12** — MT-F030 / OM-4 radius incoherence: the full measured census the brief demands |
| — | **NEW L-13** — the repo installs a *registry copy of itself*, because keyframes.js hard-pins `"4.0.0"` exact |

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
Live probe origin `http://localhost:9000/#/gradient` (dev server; read-only except for two clicks
that only open disclosures and select a curve — no persisted state mutated).

---

## Verdict

**DEFECTIVE.** Thirteen findings; seven MAJOR. The dominant mechanism is one sentence:

> **The published surfaces under-specify what they already know, so consumers re-declare that
> knowledge locally — and the local copies are projections, not mirrors.**

Two independent instances (L-1 taxonomy, L-2 serializer) are the deepest defects. One MAJOR (L-5)
is glass-owned and is **FOLD-banked, not patched**. One MAJOR (L-12) is the owner's own mark
MT-F030, and it is **ours**.

---

## Import trace — every edge, and whether it may be crossed

`EasingSpecimenStrip.vue`

| line | specifier | resolves to | verdict |
|---|---|---|---|
| 11 | `vue` | host vue (deduped, `vite.config.ts:92-99`) | OK |
| 12 | `@vueuse/core` → `useMediaQuery` | devDep | **L-3** — wrong owner |
| 13 | `@mkbabb/glass-ui/fading-scroll` | glass-ui `exports["./fading-scroll"]` | OK — published |
| 14 | `@mkbabb/glass-ui/chip` | glass-ui `exports["./chip"]` | OK — published |
| 15–16 | `./easingCatalogue` (`SPECIMEN_FAMILIES`, `type SpecimenTile`) | sibling | OK |
| 60 | *(not an import — a `.closest(".fading-scroll")` reach into producer-private DOM)* | — | **L-7** |

`easingCatalogue.ts`

| line | specifier | verdict |
|---|---|---|
| 22–26 | `@mkbabb/value.js/easing` (values: `bezierPresets`, `CubicBezier`, `steppedEase`) | OK — real key in `package.json#exports` |
| 27–30 | `@mkbabb/value.js/easing` (types) | OK — `import type` |
| 31–35 | `@mkbabb/glass-ui/easing` (types) | OK — published |
| 36 | `../../composables/useGradientModel` → `type GradientInterval` | **L-8** — a curve catalogue must not know what a gradient is |

`useSpecimenRows.ts`

| line | specifier | verdict |
|---|---|---|
| 13 | `../../../../color-session/useContrastSafeColor` | direction OK (feature → session); depth 4 is a symptom — **L-8** |
| 14–15 | `../../composables/useGradientCSS` / `useGradientInterpolation` | OK |

### Published-surface verdict: **CLEAN at the specifier level**

Every library import in this subtree goes through a real key in `package.json#exports` or glass-ui's
exports map. There is no `@src/*` reach, no `dist/` deep path, no import a real npm consumer could
not write:

```
$ grep -rn 'from "@src\|from "\.\./\.\./\.\./src/\|@mkbabb/value.js/dist' demo --include='*.ts' --include='*.vue'
(no output)

$ grep -rhoE '"@mkbabb/value\.js[a-zA-Z/.-]*"' demo | sort | uniq -c | sort -rn
  25 "@mkbabb/value.js/color"
  10 "@mkbabb/value.js/css"
   6 "@mkbabb/value.js/math"
   5 "@mkbabb/value.js/easing"
   4 "@mkbabb/value.js/quantize"
```

All five specifiers the demo writes are real `exports` keys. `vite.config.ts:41–51` *generates* the
runtime self-alias set from `package.json#exports`, so runtime resolution cannot drift from the
published map. **The demo's proof of the public API is honest.**

The *type* program tells a different story — see **L-11** and **L-13**.

---

# Findings

### L-1 — MAJOR · the catalogue silently drops 6 of value.js's 30 `bezierPresets`

`easingCatalogue.ts:174, 191`:

```ts
const FAMILY_ORDER = ["css", "sine", "quad", "cubic", "expo", "circ", "back", "steps"];
…
return FAMILY_ORDER.filter((f) => byFamily.has(f)).map(…);   // :191
```

A **filter**, not a sort. Any preset whose regex-derived family (`:168`) is absent from that list
vanishes with no diagnostic. `quart` and `quint` are absent. Measured live:

```
$ node scratchpad/quart.mjs
STRIP TILES (row 0): ["linear","ease","ease-in","ease-out","ease-in-out","ease-in-sine",
 "ease-out-sine","ease-in-out-sine","ease-in-quad","ease-out-quad","ease-in-out-quad",
 "smooth-step-3","ease-in-cubic","ease-out-cubic","ease-in-out-cubic","ease-in-expo",
 "ease-out-expo","ease-in-out-expo","ease-in-circ","ease-out-circ","ease-in-out-circ",
 "ease-in-back","ease-out-back","ease-in-out-back","steps","step-start","step-end"]
count: 27
```

24 bezier + 3 steps = 27, against `Object.keys(bezierPresets).length === 30`.

**r2 addition — the consequence, executed.** The producer's `<EasingPicker>` (mounted by the sibling
`EasingAuthoringStage.vue:29`, disclosed by the tune button) publishes **all 30** presets. Selecting
one of the six dropped curves through that menu:

```
$ node scratchpad/quart2.mjs
PICKER PRESET OPTIONS: 30 [… "ease-in-quart","ease-out-quart","ease-in-out-quart",
                              "ease-in-quint","ease-out-quint","ease-in-out-quint" …]
AFTER selecting ease-out-quart: {
 "headText": "1 → 2custom",
 "readout": "cubic-bezier(0.165, 0.84, 0.44, 1)",
 "pressedTile": "NONE PRESSED"
}
```

A **first-class library preset, selected through the design system's own control, renders as
`custom` with no tile pressed.** Two surfaces in one open row disagree about whether a named curve
has a name. That is the defect in its user-visible form.

The module's own docstring (`easingCatalogue.ts:15–17`) asserts *"the tile catalogue **IS** value.js
`bezierPresets` + the steps family — the SAME catalogue the glass-ui `<EasingPicker>`'s preset menu
speaks (never a second mint)"*. **False on both clauses**: it is `bezierPresets` minus two families,
and it *is* a second mint of the taxonomy.

The gate is blind: `test/gradient-v4-consume.test.ts:56` asserts only
`expect(SPECIMEN_TILES.length).toBeGreaterThan(20)`. 27 > 20; 33 > 20; 21 > 20.

**Mechanism.** value.js owns the presets but publishes them as a bare `Record<string, quad>`; it
does not publish their **taxonomy**. So the consumer re-derived the taxonomy by regex and then
*closed* it with a hand-written allow-list. Adding a preset family to the library is now a silent
no-op in the demo.

**Cure (gestalt — the library publishes the structure it already has implicitly):**

```ts
// src/easing — presets become self-describing
export interface BezierPreset {
    name: BezierPresetName;
    family: string;      // "css" | "sine" | … — DATA, not a consumer regex
    variant: string;     // "in" | "out" | "in-out" | …
    points: readonly [number, number, number, number];
}
export const bezierPresetList: readonly BezierPreset[];   // ordered, families intact
```

**Cure (KISS, today, no library change):** make `FAMILY_ORDER` a *rank*, not a gate —

```ts
const rank = (f: string) => { const i = FAMILY_ORDER.indexOf(f); return i < 0 ? FAMILY_ORDER.length : i; };
return [...byFamily.keys()].sort((a, b) => rank(a) - rank(b)).map(family => ({ family, tiles: byFamily.get(family)! }));
```

A new library family then always appears, merely at the end. One expression.

---

### L-2 — MAJOR · `/css` parses timing functions but cannot serialize them; three consumers hand-mint the literal

`src/subpaths/css.ts` exports `parseTimingFunction` (:53) and `serializeCssColor` (:54) — the colour
grammar is symmetric, the timing grammar is not. `grep -rn "export function serialize" src/` returns
`serializeCssValue`, `serializeCssColor`, `serializeKeyframeSelector`, `serializeTimelineOptions` —
**there is no `serializeTimingFunction` anywhere in `src/`.**

Three hand-rolled inverses exist as a direct result:

1. **glass-ui** — `useEasingPicker.readout` (*"The complete re-parseable readout literal for the
   active mode"*, `dist/components/easing/composables/useEasingPicker.d.ts`), a **public export** of
   `@mkbabb/glass-ui/easing`.
2. **this catalogue** — `easingCatalogue.ts:48–56`, whose own comment (`:41–45`) states it mirrors
   glass-ui's minting *byte-for-byte*.
3. **the gradient composable** — `useGradientCSS.ts:52–61`, a third copy frozen as a string literal
   `css: "cubic-bezier(0, 0, 1, 1)"`.

The catalogue's comment names #3 as its own precedent — *"the `linearInterval()` precedent
(useGradientCSS.ts), **generalized** to the whole catalogue"*. It generalized the duplicate instead
of retiring it. A documented dual path (edict 2).

`bezierLiteral` / `stepsLiteral` are `export`ed and consumed **only inside their own file** — dead
public surface on top of duplicated law.

**r2 addition — the duplication is currently IN SYNC, and the guard is 1-of-30.** A 33-case
equivalence probe run against the real producer composable:

```
$ node scratchpad/equiv.mjs
presetNames: 30  |  bezierPresets keys: 30
bezier: 30 compared, 0 mismatched
steps compared: 3   (no mismatches)
producer-only: []  demo-only: []
```

So the defect is **latent, not live** — which is exactly why it is dangerous. What guards it? Exactly
one assertion, on exactly one preset:

```ts
// e2e/smoke/oracles/o17-easing-composition.spec.ts:189-192
await row.locator("[data-specimen='ease-out-back']").click();
await expect(row.locator("code").first()).toHaveText("cubic-bezier(0.175, 0.885, 0.32, 1.275)");
```

**1 of 30 bezier presets, 0 of 3 steps tiles, 0 assertions in the vitest suite.** A rounding-rule
change in glass-ui's `readout` would break `tileIdFor`'s string equality for 29 tiles and leave the
green tripwire standing.

**Cure (gestalt).** value.js `/css` exports the exact inverse of what it already parses:

```ts
export function serializeTimingFunction(ast: CssTimingFunction): string;
```

`parseTimingFunction ∘ serializeTimingFunction ≡ id` becomes a round-trip property test over the whole
`bezierPresets` corpus + the steps space. glass-ui's `readout`, `bezierLiteral`, `stepsLiteral` and
`linearInterval`'s frozen string all collapse into one call. The "byte-identity with the picker" law
stops being a comment two packages must both honour by hand and becomes a fact of the grammar module
— the same shape the library already got right for colours (`parseCssColor` / `serializeCssColor`).

**Cure (KISS, today):** `useEasingPicker` is public. Mint the catalogue *through it* once at module
scope, and delete `bezierLiteral` / `stepsLiteral` / `payload()`'s hand-assembly outright.

---

### L-3 — MAJOR · reduced motion has four homes in the demo and a fifth, published and unused, in the design system

`EasingSpecimenStrip.vue:12,47`:

```ts
import { useMediaQuery } from "@vueuse/core";
const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
```

glass-ui — the declared design system — **publishes exactly this**, at
`dist/composables/motion/core/useReducedMotion.d.ts` → `motion-core.d.ts` → the published subpath
`@mkbabb/glass-ui/motion-core`:

```
/** Read the current OS preference without subscribing (SSR-safe). */
export declare function readReducedMotion(): boolean;
/** Share one reactive OS preference and one MediaQueryList listener. */
export declare function useReducedMotion(): Readonly<Ref<boolean>>;
```

Census across `demo/` (`grep -rn "prefers-reduced-motion" demo --include='*.ts' --include='*.vue'`,
11 files, 5 JS-side readers):

| site | mechanism |
|---|---|
| `EasingSpecimenStrip.vue:47` | `@vueuse/core` `useMediaQuery` — **the only vueuse-PRM site in the demo** |
| `useInertiaGesture.ts:37` | glass-ui `useBreakpoint("(prefers-reduced-motion: reduce)")` — a *breakpoint* composable pressed into a non-breakpoint query |
| `useMixingAnimation.ts:69` | same misuse |
| `useOverture.ts:96` | raw `window.matchMedia(…).matches` (non-reactive) — this is `readReducedMotion()` |
| `useDockArrival.ts:26` | raw `window.matchMedia(…).matches` — same |
| glass-ui `useReducedMotion()` | the shared, single-listener owner — **zero demo consumers** |

The demo *already imports from that exact module*: `useMixingAnimation.ts:42` and
`useInertiaGesture.ts` both take `useRAFLoop` from `@mkbabb/glass-ui/motion-core`, then hand-roll PRM
next to it.

Inside a single open specimen row the duplication is simultaneous: `<EasingPicker>` runs glass-ui's
shared `useReducedMotion` (its `UseEasingPickerReturn` exposes `reducedMotion`), so one row carries
two independent `MediaQueryList` subscriptions for one OS fact — one of them per strip instance,
which multiplies by interval count (L-4).

**Cure.** One line in the strip:

```ts
import { useReducedMotion } from "@mkbabb/glass-ui/motion-core";
const prefersReducedMotion = useReducedMotion();
```

The `@vueuse/core` import dies. Fleet-wide the other four follow. No new demo module, no new
`shared/` dir — glass-ui already owns the concept, which is exactly what edict 4 demands.

---

### L-4 — MAJOR · a 27-tile, 133-node strip is mounted per interval row, though only one row can ever be open

`GradientEasingEditor.vue`:

```
:61   const openInterval = ref<number | null>(0);            // SINGLE — one row open, ever
:112  v-for="row in specimenRows"                            // every interval gets a row
:144  v-show="openInterval === row.index"                    // v-show MOUNTS
:152  v-if="openInterval === row.index && openIntervalRamp"  // the CHEAP ramp IS gated
:161  <EasingSpecimenStrip … />                              // the 133-node strip is NOT
```

Independently re-measured live at K = 1 interval:

```
$ node scratchpad/cost.mjs
{ "stripNodes": 133, "stripChips": 27, "stripSvgs": 27,
  "portScrollable": true, "portScrollWidth": 1482, "portClientWidth": 436,
  "rowCount": 1, "docNodes": 511, "glyphChars": 685 }
```

**133 / 511 = 26.0 % of the entire route's element count for one selection surface.** Because the
strip sits inside `v-show` rather than `v-if`, a K-interval gradient mounts K strips: 133·K DOM
elements, 27·K Chip instances, K `MediaQueryList` listeners (L-3) — for a surface of which at most
one is ever visible. The author already recognised the cost for the *cheap* ramp and gated it with
`v-if` at `:152`; the expensive thing beside it is ungated.

The strip's own source documents the consequence and works around it — `EasingSpecimenStrip.vue:38–40`:

> *"scoped to THIS strip's own subtree (sibling rows mount hidden twins of every data-specimen id)"*

The workaround is the evidence.

**Cure (architectural transposition).** Hoist **one** `<EasingSpecimenStrip>` out of the `v-for`,
bound to `openInterval`. The disclosure body can only ever hold one row's content, so it can move out
of the loop entirely. What dies with it: the `visible` prop (a strip that exists is visible), the
"hidden twins" scoping paragraph, the subtree-scoped `querySelector`, and 133·(K−1) DOM nodes. What
it enables: with one instance the strip can afford a wrapped grid instead of a 3.4× horizontal scroll
— measured `scrollWidth 1482` vs `clientWidth 436`, i.e. ~8 of 27 tiles reachable at desktop and ~5
of 27 at 390 px mobile.

---

### L-5 — MAJOR · **glass-owned, FOLD-BANK** · Chip's material CSS is orphaned *and unreachable* through glass-ui's published surface

The known **M3 / INBOX I-9 / D58 / O-7 §F** residual. It is worse than "not imported": it is
**not importable**.

- The file ships: `node_modules/@mkbabb/glass-ui/dist/styles/glass/glass-chip.css` — the full
  `.glass-chip` recipe (tint floor, `--chip-flood-t` `@property`, pressed accent band, the
  `--cell` radius, the coarse-pointer touch floor).
- Nothing in the package `@import`s it. `dist/styles/glass.css` lists **18** imports —
  `material, ladder, ladder-undershadow, grain-overlay, accent-tone, rim, surfaces, surfaces-pager,
  control-surfaces, glass-capsule, liquid-fill, surface-axis, material-roles, reveal, liquid-enter,
  deep, defined, squircle` — no `glass-chip.css`. `dist/styles/index.css` does not reference it.
  `grep -c "glass-chip" dist/glass-ui.css` → **0**.
- glass-ui's `exports` map has `./styles`, `./styles.css` and no `./styles/*` wildcard, so a consumer
  cannot deep-import the orphan even knowingly. The demo consumes **both** published style surfaces
  correctly (`demo/styles/foundation.css:56–57`).

**r2 addition — the direct proof.** Rather than infer from computed styles, r2 walked every
`CSSStyleSheet` in the live document and counted selectors:

```
$ node scratchpad/radii.mjs   (excerpt)
"chipRules": 0,          // selectors containing ".glass-chip"   — in ANY loaded stylesheet
"chipCellRules": 0,      // selectors containing "glass-chip--cell"
"capsuleRules": 10,      // ".glass-capsule*" rules — these DO load
"tileClass": "glass-chip glass-capsule accent-tone … glass-chip--interactive glass-capsule-hover
              focus-ring … glass-chip--cell flex-col gap-1.5 px-2 py-2.5 text-micro specimen-tile"
```

**Zero.** The element carries five `glass-chip*` classes and not one of them resolves to a rule
anywhere in the document. Only `.glass-capsule` survives — which is precisely why the failure mode
is what it is. Confirming consequences, measured in the same pass:

```
"specimenTile": "9999px  box 45x44",     // .glass-capsule { border-radius: var(--radius-pill) } wins
"tileBg":   "oklab(0.925644 0.0094459 0.0291917 / 0.83872)",
"tileOnBg": "oklab(0.925644 0.0094459 0.0291917 / 0.83872) | radius 9999px"   // BYTE-IDENTICAL
```

1. `border-radius: 9999px` on an element carrying `glass-chip--cell`, where
   `.glass-chip--cell, .glass-chip--cell.glass-capsule { border-radius: var(--radius-card) }` (= 1rem,
   token present and resolving) should win. **`shape="cell"` is inert**; the tiles render as perfect
   circles, not cells.
2. Selected and unselected chip backgrounds are **byte-identical**.
   `.glass-chip[data-mode="selectable"][data-state="on"] { background-color: var(--accent-band); … }`
   never applies, and neither does the `::after` `plus-lighter` radial flood. Selection reads **only**
   through this seat's own scoped `--motion-accent` ink on the glyph + label.
3. The `@media (pointer: coarse) { .glass-chip--interactive { min-inline-size / min-block-size:
   var(--touch-target, 2.75rem) } }` block is likewise absent — mobile receives no tap-target bump
   (compounds L-6).

**Blast radius is exactly this file.** `grep -rln "glass-ui/chip" demo | wc -l` → **1**;
`grep -rn 'shape="cell"' demo` → **only `EasingSpecimenStrip.vue:102`**. The strip is the demo's sole
Chip consumer, and its sole `shape="cell"` consumer.

**What it looks like.** `audit/visual/owner-marked/OM-4-easing-radius-incoherence.png` (light) and
`audit/visual/shots/safari-desktop-dark/gradient.png` (dark): the eight visible tiles are **round
cream/umber pucks with a raised bevel and drop shadow**, floating on the plate rather than sitting
flat in it. Each circle inscribes a square of content, so the sparkline is pinched and the wider
labels (`in-out`) run to the circle's edge on both sides. The pressed tile (`linear`) is **the same
disc as its seven neighbours** — its only selection cue is the teal/cyan stroke on its sparkline and
a bolded tinted label. Identical in both schemes.

**Disposition: FOLD-BANK on glass (BJ born-RED), NO local patch.** A demo-side
`.specimen-tile { border-radius: var(--radius-card) }` plus a hand-rolled pressed wash would fork the
design system's chip recipe into `demo/` — precisely the masking fallback **MT-F014** and edict 2
forbid — and would silently diverge the moment glass fixes the import. Mark M3 already carries this
row; r1 added the *unreachability* fact (no `./styles/*` export key), and r2 adds the
**zero-selectors-loaded** proof and the **N = 1 blast radius** to the packet.

---

### L-6 — MAJOR · the seat's per-instance geometry override on the Chip root puts the tile under the design system's own `--touch-target`

`EasingSpecimenStrip.vue:163–170` restyles the **producer's root element** from outside:

```css
.specimen-tile {
    display: flex; flex-direction: column; align-items: center;
    gap: 0.125rem;
    padding: 0.3125rem 0.375rem 0.25rem;
    min-width: 2.75rem;
}
```

glass-ui's own cell recipe already declares that geometry — `chipVariants`:
`cell: "glass-chip--cell flex-col gap-1.5 px-2 py-2.5 text-micro"`. The seat's scoped rule
(specificity 0,2,0 with the `data-v-*` attribute) beats the Tailwind utility (0,1,0) and replaces it.
An edict-5 violation with a measured a11y consequence — the tile lands at **44 × 43.8 px** against the
house token `--touch-target: 2.75rem` = 44 px, with `min-height: auto` (the seat set an inline floor
and no block floor). Under the producer's own `py-2.5` the tile would be ≈ 54.8 px. r2 re-measured the
box at `45 × 44` (rounded `getBoundingClientRect`) — same story, sub-token by construction.

The mega-tranche visual audit does not flag it: `capture.mjs` filters on `w < 24 || h < 24`, looser
than the design system's own token. Confirmed — the six `smallTapTargets` on `/#/gradient` are a slug
input, three slug-bar buttons and the two gradient stop handles, not these tiles:

```
$ node -e '…REPORT.json…'  safari-mobile-light /#/gradient
[{w:160,h:20,tag:"input"}, {23×23 "Switch to slug"}, {23×23 "Generate new slug"},
 {23×23 "Cancel"}, {20×20 "Gradient stop at 0%"}, {20×20 "Gradient stop at 100%"}]
```

**Cure.** Stop overriding the producer root. Specimen scale is a **size axis on the cell recipe**,
which glass-ui already models (`SIZE.sm`): `<Chip mode="selectable" shape="cell" size="sm">`. If
`sm × cell` does not compose to specimen scale, that composition is a glass-owned addendum on the same
M3 packet — not a demo override. The seat keeps only what is genuinely its own: the `--motion-accent`
ink on `.tile-glyph path` / `.tile-label`.

---

### L-7 — MINOR · the strip reaches into the producer's private DOM by class name

`EasingSpecimenStrip.vue:58–60`:

```ts
// The FadingScroll root IS the scroll port (its documented DOM contract)
const port = el?.closest<HTMLElement>(".fading-scroll");
```

**It is not a documented contract.** `dist/components/fading-scroll/FadingScroll.vue.d.ts` declares
five props (`axis, fadeStart, fadeEnd, ariaLabel, ariaLabelledby`), one default slot, **no
`defineExpose`, no exposed port ref**, and never names the class. `.fading-scroll` is a literal inside
the compiled render function (`dist/fading-scroll-DhxXIhm2.js`: `"fading-scroll"`,
`"fading-scroll--x"`, `"fading-scroll--y"`). The consumer depends on a compiled implementation detail,
and the comment asserts a contract the published type surface does not carry.

And it buys nothing — the demo's own class is on the very same element. Measured: the element matched
by `.specimen-strip` *is* the scroll port (`portScrollable: true, scrollWidth 1482 > clientWidth 436`).

**Cure (today, no glass change).** Take the root through Vue's own contract:

```ts
const stripRef = useTemplateRef<ComponentPublicInstance>("stripRef");   // <FadingScroll ref="stripRef">
const port = stripRef.value?.$el as HTMLElement | undefined;
```

Zero producer-private knowledge; survives any class rename. If the reveal deserves to be first-class,
bank a `defineExpose({ port })` / `scrollChildIntoInlineView()` addendum on glass — `useFadingScroll(target)`
is already published and already takes an explicit port element, so the component simply has not
surfaced the same handle.

*(The single-axis discipline the comment defends is **correct** and must be preserved verbatim — the
`scrollIntoView` ancestor-walk it replaced was the O-19 root cause. Only the selector is wrong.)*

---

### L-8 — MINOR · `easingCatalogue.ts` holds four concerns, and the curve catalogue knows what a gradient is

| span | concern |
|---|---|
| 48–56 | CSS literal minting (dies under L-2) |
| 66–74 | SVG glyph painting |
| 98–203 | tile / family construction |
| 207–230 | **gradient-interval identity** (`isStepsInterval`, `tileIdFor`, `specimenNameFor`) |

The fourth forces `import type { GradientInterval } from "../../composables/useGradientModel"` (:36).
A catalogue of easing curves must not know what a gradient is — and it does not need to: every
predicate reads exactly one field, `interval.css`.

**Cure.** Key the identity on the literal, not the model:

```ts
export function tileIdForCss(css: string): string | null;
export function specimenNameForCss(css: string): string;
```

The `GradientInterval` import vanishes; the catalogue becomes a pure `@mkbabb/value.js/easing`
consumer with no feature knowledge, testable with string inputs alone.

`useSpecimenRows.ts:13`'s four-level climb to `color-session/useContrastSafeColor` is *directionally*
correct (workbenches → color-session; no reverse edge — see negative proofs) but its depth is the
symptom: derivation logic is living at presentation depth.

---

### L-9 — MINOR · `isStepsInterval` is a masking dual-truth

`easingCatalogue.ts:207–209`:

```ts
function isStepsInterval(interval: GradientInterval): boolean {
    return interval.mode === "steps" || interval.css.startsWith("steps(");
}
```

The module's own stated law is that `css` is *"the persisted TRUTH"* (:43) and that `mode` is minted
**from** it (`stepsTile`, :139–153, sets both from one source). The `||` accepts and papers over a
state in which the two disagree instead of forbidding it — a masking fallback (edict 2) in three
tokens.

**Cure.** `return interval.css.startsWith("steps(")`. If `mode` can genuinely diverge from `css`, the
model carries two truths for one fact — and *that* is the finding to fix, in `useGradientModel`, not
here.

---

### L-10 — INFO · array-getter watch source

`EasingSpecimenStrip.vue:50–51`: `watch(() => [selectedId, visible] as const, …)` allocates a fresh
tuple per evaluation. Behaviourally fine; the idiomatic Vue 3.5 form for two independent sources is
`watch([() => selectedId, () => visible], …)`. Legibility only — no defect claimed.

---

### L-11 — MINOR · `tsconfig.demo.json#paths` has rotted away from `package.json#exports` — and is dead code besides

`vite.config.ts:36–51` *generates* its value.js self-alias set from `package.json#exports` specifically
so *"the alias set can never drift from the exports map"*. `tsconfig.demo.json:42–49` mirrors the same
fact **by hand**. Measured diff:

```
$ node -e '…compare package.json#exports against tsconfig.demo.json paths…'
exports  : ./color ./css ./easing ./math ./quantize ./transform ./value
tsconfig : .  ./color ./easing ./math ./parsing ./quantize ./transform ./units
ts-only  : .  ./parsing ./units
exp-only : ./css ./value
```

Three phantom entries, two real exports omitted, and `./css` is *used* (10 demo imports, incl.
`useGradientCSS.ts:25`). `dist/index.d.ts`, `dist/subpaths/parsing.d.ts` and
`dist/subpaths/units.d.ts` do not exist:

```
$ ls dist/subpaths/
color.d.ts color.js css.d.ts css.js easing.d.ts easing.js math.d.ts math.js
quantize.d.ts quantize.js transform.d.ts transform.js value.d.ts value.js
```

The file's own comment (:38–41) calls it *"a CLOSED 8-key set"*; the map has **7** keys and no `.`.

**r2 addition — the block is not merely stale, it is inert.** Traced through the real TS resolver
using the demo program's own parsed options:

```
$ node -e '…ts.resolveModuleName from demo/…/easingCatalogue.ts…'
@mkbabb/value.js/easing          dist/subpaths/easing.d.ts
@mkbabb/value.js/css             dist/subpaths/css.d.ts      ← NO paths entry; resolved anyway
@mkbabb/value.js/color           dist/subpaths/color.d.ts
@mkbabb/value.js/value           dist/subpaths/value.d.ts    ← NO paths entry; resolved anyway
@mkbabb/value.js/parsing         UNRESOLVED                  ← paths entry exists; still unresolved
@mkbabb/value.js                 UNRESOLVED

$ …with traceResolution on '@mkbabb/value.js/css':
'paths' option is specified, looking for a pattern to match module name '@mkbabb/value.js/css'.
Module name '@mkbabb/value.js/css' was successfully resolved to
  '/…/value.js/dist/subpaths/css.d.ts' with Package ID '@mkbabb/value.js/dist/subpaths/css.d.ts@4.0.0'
```

TypeScript's **self-reference** resolution (a package may import itself by name when `exports` is
declared) already resolves all seven subpaths through the same map vite reads. The `paths` entries
add nothing and can only drift.

**Cure.** Delete the value.js entries from `tsconfig.demo.json#paths`. One mirror, not two — and the
surviving mirror is generated.

---

### L-12 — MAJOR · **NEW** · MT-F030 / OM-4: five radius registers in one 462 px card, three of them not role-bearing

Owner mark 2026-07-27, witness `audit/visual/owner-marked/OM-4-easing-radius-incoherence.png`:
*"too rounded in some areas, not rounded enough in others."* `DESIGN-CANON-BRIEF.md:73` books it as a
demand for a **RADIUS DERIVATION law**. This is the census the brief asks for.

**Every radius declaration in the easing corpus** (source):

| site | declaration | source |
|---|---|---|
| `GradientEasingEditor.vue:114` | `rounded-card` | row shell |
| `GradientEasingEditor.vue:153` | `rounded-md` | the interval ramp strip |
| `GradientEasingEditor.vue:176` | `rounded-md` | the readout rail |
| `GradientEasingEditor.vue:242` | `border-radius: 9999px` | `.specimen-dot` (hand-rolled pill, not the token) |
| `GradientEasingEditor.vue:274` | `border-radius: var(--radius-input)` | `.rail-btn` |
| `EasingSpecimenStrip.vue` | **none** | inherits `.glass-capsule` / `.glass-chip--cell` |
| `EasingAuthoringStage.vue` | **none** | the producer `.glass-card` = 16 px |

**What actually paints** (live computed, `scratchpad/radii.mjs`, `/#/gradient` desktop light):

```
rowCard            16px    box 462x197     ← --radius-card
intervalHead        0px
fadingScrollPort    0px    box 436x72
rampStrip           6px    box 436x20      ← rounded-md
readoutRail         6px    box 436x32      ← rounded-md
railBtn             4px    box  24x24      ← --radius-input
specimenTile     9999px    box  45x44      ← .glass-capsule (L-5: cell's 16px never loads)
specimenDot      9999px    box  10x10
pickerGlassCard    16px
```

**Five distinct registers — 0 / 4 / 6 / 16 / 9999 — inside one 462 × 197 card.**

Judgement against the house register (`demo/DESIGN.md:190–197`, four role tokens):

1. **`rounded-md` (6 px) is not a role-bearing token.** DESIGN.md names exactly four —
   `rounded-card` (16), `rounded-input`, `rounded-pill`/`rounded-full`, `rounded-panel` (12). `md` is
   a raw Tailwind scale step, used **twice** here, on the two widest elements in the open row. This is
   the corpus's own authored incoherence and the direct cause of the owner's *"not rounded enough"*.
2. **`--radius-input` measures 4 px; DESIGN.md:195 documents 8 px.** Live root:
   `--radius-input: 0.25rem`, resolving through glass's `--radius-input: var(--radius)` →
   `--radius: 0.25rem` (a Tailwind stock var in `dist/styles/components.css`, not a house value). The
   demo overrides neither. The house design authority states a value the runtime has never had.
   Verified token set: `--radius-card: 1rem` ✅, `--radius-panel: 12px` ✅, `--radius-pill: 9999px` ✅,
   `--radius-input: 0.25rem` ❌ (doc says 8 px).
3. **The circles are NOT ours.** The 9999 px on the tiles is glass's `.glass-capsule` winning because
   `.glass-chip--cell { border-radius: var(--radius-card) }` never loads (L-5, proven: 0 chip
   selectors in the document). The single most jarring register in OM-4 is **glass-owned** and its
   cure is the FOLD-bank, not a local rule. Distinguishing this is load-bearing: patching
   `.specimen-tile { border-radius: … }` locally would satisfy OM-4 by committing MT-F014.
4. **`.specimen-dot` hand-rolls `9999px`** where DESIGN.md:201 explicitly says *"Avoid hand-rolling
   `rounded-full` or `rounded-[9999px]` when the role-bearing token applies."* Should be
   `var(--radius-pill)`.
5. **Nothing derives from anything.** 16 → 6 → 4 is not a ladder; the three values have no relation
   to each other or to the 12 px (`px-3`) inset that separates them.

**Cure — state the derivation law the canon is missing, then apply it.**

> **Radius derivation (proposed).** A nested surface's radius is its parent's **halved**, floored at
> `--radius-xs`: 16 → 8 → 4. A surface never picks a radius from the Tailwind scale; it derives one.
>
> **When a circle may sit beside a rounded rect.** The pill register (`--radius-pill`) belongs to
> **points** — dots, markers, status lamps, dock controls: elements whose meaning is *position*, not
> *content*. A **cell** — anything bearing a glyph and a label — takes the derived rect register.
> The specimen dots are points (pill is right). The specimen tiles are cells (pill is wrong, and is
> glass's bug).

Applied to this corpus:

| element | today | derived |
|---|---:|---:|
| row card | 16 | 16 (`--radius-card`, depth 0) |
| ramp strip, readout rail | 6 | **8** (depth 1) |
| rail buttons | 4 | **4** (depth 2) |
| specimen tile | 9999 | **8** (depth 1 — glass's cell recipe at `--radius-card`/2, banked on M3) |
| specimen dot | 9999 hand-rolled | `var(--radius-pill)` (point register) |

Two authored radii in the corpus (`--radius-card` and one derived custom), zero Tailwind steps, one
token for the point register. That answers both halves of the owner's sentence: the circles stop
being circles, and the strip/rail stop being under-rounded against their 16 px shell.

**Ownership note.** `--radius-input`'s documented-vs-actual drift (item 2) is a *house-token* defect,
not this component's — it belongs on the DESIGN.md §Radii row alongside the new derivation clause.

---

### L-13 — INFO · **NEW** · the repo installs a registry copy of itself, because keyframes.js hard-pins `"4.0.0"` exact

```
$ npm ls @mkbabb/value.js
@mkbabb/value.js@4.0.0 /Users/mkbabb/Programming/value.js
├─┬ @mkbabb/glass-ui@7.0.0
│ └── @mkbabb/value.js@4.0.0
└─┬ @mkbabb/keyframes.js@6.0.0
  └── @mkbabb/value.js@4.0.0 deduped

$ node -e '…' → kf deps: {"@mkbabb/value.js":"4.0.0"}      # EXACT pin, a dependency (not peer)
                glass-ui peer: {"@mkbabb/value.js":"^4.0.0"}  # correctly a peer
```

`node_modules/@mkbabb/value.js/` is a **real directory with its own `dist/`** (not a symlink;
`realpathSync` stays inside `node_modules`). Today it is harmless — the trees are identical
(`diff dist/subpaths/easing.d.ts node_modules/@mkbabb/value.js/dist/subpaths/easing.d.ts` → identical)
and r1 proved the copy is out of the Vite graph. But the mechanism is structural, not incidental:

- glass-ui declaring it a **peer** is correct and would never have materialised a copy;
- keyframes.js declaring it a **dependency at an exact version** guarantees a second copy forever, and
  guarantees that copy stays at `4.0.0` even after this repo cuts `4.0.1` — which is exactly the
  vehicle **INBOX O-7 §B** proposes for the shipping parser P0.
- The consumer that then runs against two builds is *keyframes.js's own code inside our demo*.

**Cure.** Relay to keyframes.js: `@mkbabb/value.js` belongs in `peerDependencies` at `^4.0.0`, as
glass-ui already has it. This is a one-line producer change that removes a whole class of
two-instance failure from every downstream tree, and it should ride the same packet as the 4.0.1
decision O-7 §B is waiting on.

---

## Negative proofs — hypotheses this seat killed

Each is **sound**, with the evidence that proves it.

1. **Deep-import / false proof of the public API — NONE.** Every library import in the subject and
   its four neighbours resolves through a real key in `package.json#exports` or glass-ui's exports
   map. `grep -rn 'from "@src\|\.\./\.\./\.\./src/\|value.js/dist' demo` → no output. All 5 distinct
   value.js specifiers the demo writes are real exports keys. `vite.config.ts:41–51` derives the
   runtime aliases *from* the exports map, so runtime drift is structurally impossible.
2. **Stale `dist/` (demo proving an old API) — NO.** `find src -name "*.ts" -newer dist/subpaths/easing.js`
   → empty.
3. **Dual value.js instance at runtime — NO.** r1: no artefact under `node_modules/.vite/deps/`
   references the on-disk copy; the anchored-regex aliases fold glass-ui's bare
   `@mkbabb/value.js/{color,css,easing}` imports onto the repo's own `dist/`. r2 confirms the on-disk
   copy is byte-identical today. The *latent* trap is booked as L-13.
4. **Dependency cycle / wrong direction — NO.** `useSpecimenRows.ts:13` climbs workbenches →
   color-session; the reverse edge does not exist (shell → feature only, and lazily via
   `defineAsyncComponent`).
5. **`verbatimModuleSyntax` violation — NONE.** Every type-only import in the subtree is
   `import type`: `EasingSpecimenStrip.vue:16`, `easingCatalogue.ts:27,31,36`,
   `useSpecimenRows.ts:12,17`, `EasingAuthoringStage.vue:30`.
6. **Vue 3.5 idiom — CLEAN.** Reactive props destructure with default (`:18`), `useTemplateRef`
   (`:48`), controlled `:model-value` with no `defineModel` round-trip to go stale.
7. **Selection not exposed to assistive tech — NO.** glass-ui's Chip emits `aria-pressed` alongside
   `data-state`, so L-5's missing pressed *wash* is purely visual; the state is announced. The strip
   names the group (`role="group"`, `aria-label="Easing curve specimens"`, `:88–89`) and every tile
   (`:aria-label="tile.id"`, `:105`). All 27 tiles carry an accessible name.
8. **The `/#/gradient` nameless button is not ours** — it is the shell dock overflow control
   (`dock-icon-button …--compact`), 1 per desktop capture, 1 per mobile capture.
9. **The strip does not overflow the page.** `overflowX: 0` on all four gradient captures
   (`REPORT.md:125,140,155,170`). The strip's overflow is the scroll port's own content
   (`scrollWidth 1482` vs `clientWidth 436`), correctly clipped and masked.
10. **The six `smallTapTargets` on `/#/gradient` are not the tiles** — a slug input, three slug-bar
    buttons, two gradient stop handles (REPORT.json, mobile-light). The tiles measure 45 × 44.
11. **`glyphPath` has exactly one home in the repo** — `grep -rln "glyphPath\|generateCurveSVGPath"
    demo/ src/` → two files, both in this subtree, one definition. Module-eval cost is not a finding
    (r1: 1.73 ms cold / 0.80 ms warm; r2: 685 chars per glyph × 27 ≈ 18.5 KB of path strings).
12. **The literal law is currently byte-identical** — 30/30 bezier presets + 3/3 steps tiles agree
    with the producer's `readout`, and the preset name sets are equal (no producer-only, no
    demo-only). L-2 is a latent defect, not a live one; L-1's drop is the live one.
13. **Zero page errors, zero route console errors** on `/#/gradient` across all four Safari matrices
    (REPORT.md § pageErrors / consoleErrors). The one console error r2 saw locally is the
    `VITE_API_URL` dev-config banner (OM-5), not this route.

---

## Greenfield lattice, stated concretely

Were this built today with no legacy, the ownership boundaries would be:

```
@mkbabb/value.js/easing        bezierPresetList: readonly BezierPreset[]  — taxonomy is DATA   [L-1]
@mkbabb/value.js/css           parseTimingFunction ⟷ serializeTimingFunction (round-trip law)  [L-2]
@mkbabb/glass-ui/motion-core   useReducedMotion / readReducedMotion — the ONE PRM subscription [L-3]
@mkbabb/glass-ui/chip          the chip material recipe, REACHABLE from ./styles;
                               size × shape composes to specimen scale                    [L-5, L-6]
@mkbabb/glass-ui/fading-scroll the port exposed (defineExpose) — or consume useFadingScroll   [L-7]
@mkbabb/keyframes.js           value.js as a PEER, not an exact dependency                   [L-13]

demo/styles/                   DESIGN.md §Radii gains a DERIVATION clause (halve per depth,
                               pill = the POINT register only); --radius-input's documented
                               value corrected to its actual                                 [L-12]

demo/workbenches/gradient/
  composables/useGradientEasing.ts   interval ⟷ specimen identity, keyed on the literal   [L-8, L-9]
  GradientVisualizer/easing/
    specimens.ts                     catalogue + glyph painter; value.js/easing its ONLY import
    EasingSpecimenStrip.vue          ONE instance, hoisted out of the row loop                [L-4]
    EasingAuthoringStage.vue         unchanged in shape

tsconfig.demo.json                   value.js `paths` DELETED — self-reference through exports [L-11]
```

Net effect: the demo stops re-declaring library knowledge (L-1, L-2, L-3), stops overriding the design
system (L-6), stops touching producer-private DOM (L-7), stops paying 133 nodes per closed row (L-4),
stops mirroring the exports map by hand (L-11), and derives its radii instead of picking them (L-12).

Four moves are one-line consumer changes available **today** through already-published surfaces
(L-3, L-7, the `.filter()`→rank half of L-1, and the L-11 deletion). Three are library addenda that
retire duplicated law in two packages at once (value.js `serializeTimingFunction` + `bezierPresetList`;
keyframes.js's peer demotion). **L-5 is banked on glass and must not be patched here — and L-12's
most conspicuous symptom is L-5's, so the radius work must land the derivation law without touching
the tile radius.**

---

## Standing-edict compliance

| edict | verdict |
|---|---|
| 1 · no god modules | ⚠️ `easingCatalogue.ts` = 4 concerns / 230 lines — **L-8** |
| 2 · no legacy / dual paths / masking fallbacks | ❌ literal minting ×3 (**L-2**), `isStepsInterval` `\|\|` (**L-9**), stale hand-mirrored `paths` (**L-11**) |
| 3 · KISS, no contrivance | ✅ no invented `shared/` dir, no wrapper components |
| 4 · glass-ui is the design system | ❌ PRM re-minted from vueuse though glass publishes it (**L-3**) |
| 5 · root-level styling | ❌ `.specimen-tile` overrides the Chip root's own recipe (**L-6**); `rounded-md` + hand-rolled `9999px` bypass the role tokens (**L-12**) |
| 6 · animations never deleted | ✅ nothing deleted; the strip's only motion is the PRM-gated `scrollBy` |
| 7 · idiomatic Vue 3.5 | ✅ (L-10 is legibility, not a defect) |
| 8 · `verbatimModuleSyntax` | ✅ clean throughout the subtree |

---

## Commands run (reproduce)

```bash
# ── L-1: taxonomy drop, and its user-visible consequence
node scratchpad/quart.mjs      # strip offers 27 ids; quart/quint absent
node scratchpad/quart2.mjs     # picker offers 30; selecting ease-out-quart → head "custom", NONE PRESSED

# ── L-2: the copies are in sync, and the gate covers 1/30
node scratchpad/equiv.mjs      # 30/30 bezier + 3/3 steps identical; preset sets equal
grep -n "data-specimen='ease-out-back'" -A2 e2e/smoke/oracles/o17-easing-composition.spec.ts
grep -rn "export function serialize" src/                 # 4 hits, none for timing functions

# ── L-3: PRM ownership
cat node_modules/@mkbabb/glass-ui/dist/composables/motion/core/useReducedMotion.d.ts
grep -rn "prefers-reduced-motion" demo --include='*.ts' --include='*.vue'

# ── L-4 + L-12: live DOM cost and the radius census
node scratchpad/cost.mjs
node scratchpad/radii.mjs      # chipRules:0, capsuleRules:10, tokens, every computed radius

# ── L-5: the orphan, three ways
grep -c "glass-chip" node_modules/@mkbabb/glass-ui/dist/glass-ui.css        # 0
grep -o '@import "[^"]*"' node_modules/@mkbabb/glass-ui/dist/styles/glass.css   # 18, no chip
grep -rln "glass-ui/chip" demo | wc -l                                       # 1 — sole consumer

# ── L-11: exports ⟷ tsconfig drift, and the dead paths block
node -e '…compare package.json#exports to tsconfig.demo.json paths…'
node -e '…ts.resolveModuleName with traceResolution…'

# ── L-13: the self-install
npm ls @mkbabb/value.js
node -e 'console.log(require("./node_modules/@mkbabb/keyframes.js/package.json").dependencies)'
```

Probe scripts live in this session's scratchpad
(`/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/`):
`radii.mjs`, `equiv.mjs`, `quart.mjs`, `quart2.mjs`, `cost.mjs`, plus `challenge-L-r1-backup.md`.
