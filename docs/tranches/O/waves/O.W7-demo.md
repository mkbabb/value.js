# O.W7-demo — The value.js demo refinement: Parse-Lab pane + gamut-truth indicator + design audit

- **Band:** C (demo/frontend) · **Class:** demo-visible refinement — makes value.js's parser
  identity visible in the running app; no library source is changed
- **Gate (born-RED):** `parseCSSColor` is called at least once when the Parse-Lab pane mounts
  (observable via a fresh-page load → pane navigation → browser console count), AND the pane
  mounts console-clean (zero errors) — witnessed born-RED on today's tree (the Parse-Lab pane
  does not exist; zero `parseCSSColor` calls would be made if it did)
- **Folds:** the campaign directive "the value.js demo that you're to refine" (owner stated);
  the N.W6 per-pane Fable design wave (died un-implemented, re-divined into N.W10–N.W18 —
  the frontend-design lens applies here in the O lane for the demo-only surfaces); N.W16
  (picker hero refinement — O.W7 inherits its art direction for the dual-hero upgrade);
  the `parseCSSColor` typing root-fix (N.W7 / 0.12.0, shipped — the typed API this pane
  exercises)
- **Precept cure:** the library parser's behavior is completely invisible in the demo today;
  a developer visiting color.babb.dev learns nothing about what value.js can parse or
  serialize; the gamut-map pipeline has no user-facing truth-indicator despite being the
  library's most architecturally distinctive color-math feature

---

## Context

### What the demo is today

The value.js demo at `color.babb.dev` is a color-tool SPA: a live OKLCh color picker, palette
browser, gradient editor, mix pane, image-palette extractor, and a generate pane. It
demonstrates `Color`, `mixColors`, and `gamutMap` implicitly, through the tool itself. What it
does NOT demonstrate is the parser — `parseCSSColor`, `parseCSSValue`, and the serialization
round-trip — which is the architectural center of value.js as a CSS-value library.

A developer who wants to understand what value.js does with `oklch(52% 0.18 210 / 0.8)` has
no affordance. The library is invisible behind the tool.

The three gaps this wave closes:

1. **The parser is invisible.** No pane shows a CSS-value string → `ValueUnit`/`Color` tree
   → re-serialization. A developer cannot probe the parser identity or spot-check a
   round-trip in the demo.

2. **Gamut mapping has no truth indicator.** The demo performs live gamut mapping on every
   picker interaction (the color-components readout, the gradient stops, the mix result),
   but there is no user-visible before/after for what the gamut map changed. An sRGB egress
   of a P3 color silently clips; `gamutMap`'s bisection result is invisible.

3. **The hero-lab and color-picker shells are coarse against the N.W12/N.W16 grand-hierarchy
   and Fable design standards** (the per-pane Fable wave, N.W6, died un-implemented).
   O.W7 applies the frontend-design lens to the demo-only surfaces (demo/*App.vue shells and
   the hero-lab panels) without touching the main color-picker's component tree (that is
   N.W16's territory).

### What value.js can parse today (the parser identity)

The library exports two primary parse functions:

- `parseCSSColor(s: string): ParsedColorUnit` — memoised; accepts named colors, hex, rgb(),
  hsl(), oklch(), oklab(), display-p3(), color(), and every other CSS Color 4 form. Returns
  a `ValueUnit<Color<ValueUnit<number>>, "color">` with typed channels. (N.W7 typed;
  0.12.0 shipped.)
- `parseCSSValue(s: string): ValueUnit | FunctionValue | ValueArray` — the full CSS value
  grammar: `calc()`, `clamp()`, `linear-gradient()`, `var()`, color functions, dimension
  values, the full CSS easing grammar, everything. (P0 O.W0 fixes `linear-gradient` and
  the `linear()` stop spacing.)

The Parse-Lab pane makes these functions directly visible: a user types a CSS string, sees
the structured parse result rendered as a typed tree, and sees the serialized round-trip
output. If O.W0's P0 fix is in place, `linear-gradient(red, blue)` parses and round-trips
correctly.

### The gamut-truth gap

`gamutMap(color, targetSpace)` (exported from `src/units/color/dispatch.ts`) is the
library's architectural pivot for wide-gamut-to-sRGB conversion. It runs in two modes:

- **Analytical Ottosson map** (the zero-iteration path) for `sRGB` targets.
- **CSS Color 4 §13.2 binary bisection** (the `gamutMapToRgbSpace` path) for
  `display-p3`, `rec2020`, `a98-rgb`, `prophoto-rgb`, `srgb-linear` targets.

Today, the demo never shows the before (the wide-gamut source) and after (the sRGB/target-
space gamut-mapped result) side by side. A P3 color whose sRGB channel clips is simply
displayed as its sRGB value; the loss is invisible. `gamutMap` also exports `isInSRGBGamut`
and `deltaEOK` (the JND-distance metric) — these are the numerical primitives for a
truthful gamut indicator. `deltaEOK` IS used in `BrowsePane.vue` (color-distance search
filtering), but `isInSRGBGamut` is unused in the demo, and neither is used as a user-
facing gamut-mapping truth surface for the picker's current color.

The gamut-truth indicator is a small, targeted addition to the color-picker's display area:
a before/after swatch pair + a `deltaEOK` readout when the current picker color requires
gamut mapping for sRGB output. It is zero-alloc-read — `isInSRGBGamut` and `deltaEOK` are
cheap scalar reads that ride the existing `cssColorOpaque` watcher.

---

## Scope

Each S-clause is a concrete, falsifiable deliverable.

### S1 — Parse-Lab pane: live CSS-value → ValueUnit tree + re-serialization

**What does NOT exist today:** A pane at route `/parse-lab` (or as a view in the existing
pane router under `viewSchema.ts` `ViewId`) that accepts a CSS value string and shows
the parsed tree and re-serialized output. The `parseCSSColor` call-count in the demo bundle
across all routes is zero on `/parse-lab` because the route does not exist.

**The pane.**

`ParseLabPane.vue` is a new SFC under `demo/@/components/custom/panes/` (same layer as
`GradientPane.vue`, `MixPane.vue`, etc.). It participates in the pane router
(`usePaneRouter.ts`) and the view schema (`viewSchema.ts`) as a new left-pane view
`"parse-lab"`. The pane shell uses `<Card tier="resting">` + `<PaneHeader>` (the standard
pane idiom; `DESIGN.md §Surfaces`).

**The input.** A single `<textarea>` or controlled `<ColorInput>`-like text field using
the `input-bar` glass recipe for its chrome. Placeholder text: a starter CSS value that
exercises the parser identity, e.g. `oklch(52% 0.18 210 / 0.8)`. Pre-seeded with the
picker's current `cssColorOpaque` (injected via `CSS_COLOR_KEY`) so the parse result
answers the active color immediately on navigation.

**The tree output.** A recursive `ValueUnitTree.vue` sub-component renders the parse
result as a collapsible tree:

```
ValueUnit<Color> "oklch"
  ├ channel L  →  ValueUnit<number> 0.52  (unit: "%")
  ├ channel C  →  ValueUnit<number> 0.18  (unit: none)
  ├ channel H  →  ValueUnit<number> 210   (unit: "deg")
  └ alpha      →  ValueUnit<number> 0.8   (unit: none)
```

For `parseCSSValue` results (`FunctionValue`, `ValueArray`, plain `ValueUnit`): the tree
renders the function name, argument list recursively, and unit at each leaf. Strings that
fail to parse render an inline error badge (red accent, `section-label` type class) with
the parser error message, never crashing the pane.

**The type badge.** A `<Badge>` showing the top-level type tag: `"color"`, `"px"`,
`"calc"`, `"linear-gradient"`, etc. — the `ValueUnit.unit` or `FunctionValue.name`.

**The re-serialization output.** A read-only code-mirror-style `<pre>` (`.fira-code`
font, `glass-floating` surface) showing the `.toString()` of the parse result, i.e.
the semantic round-trip. For colors: two paths:
- `parseCSSColor` path: the `.toString()` of the `ParsedColorUnit` (the canonical CSS
  serialization of the color).
- `parseCSSValue` path: the `.toString()` of the returned `ValueUnit`/`FunctionValue`.

A toggle (`<SegmentedTabs>` or pair of `<Badge variant="outline">` pills) lets the user
switch between `parseCSSColor` (color-aware path, with per-space round-trip) and
`parseCSSValue` (generic value path) when the input is a color string, so both paths are
directly comparable.

**Color-space re-serialization panel.** When the parsed value is a color, a small grid
of space-conversion pills renders the same color serialized in every supported space:
`oklch()`, `oklab()`, `hsl()`, `rgb()`, `color(display-p3 …)`, `color(rec2020 …)`. Each
pill is a copy-on-click chip. This makes value.js's space-conversion roundtrip identity
directly observable: an sRGB input re-serialized in oklch, then back to sRGB, should
yield the original.

**Falsifiable check.** Navigate to `/parse-lab` (or activate the view). With the default
input `oklch(52% 0.18 210 / 0.8)`:
- The tree renders: a root `ValueUnit<Color>` with four channel leaves.
- The type badge shows `"color"`.
- The re-serialized output is non-empty and matches the canonical CSS serialization
  (does not throw).
- The space-conversion grid renders at least 4 pills.
- Zero console errors.

### S2 — Gamut-truth indicator: before/after swatch + deltaEOK readout

**What does NOT exist today:** Any visible gamut-mapping truth surface in the demo.
`isInSRGBGamut` and `deltaEOK` are exported but unused in the demo.

**The indicator.** A `GamutTruthBadge.vue` sub-component (or inline slot in
`ColorComponentDisplay.vue` or a new `ColorGamutDisplay.vue`) placed in the color-picker
pane's display area. It activates only when the active color is out-of-sRGB-gamut. When
inactive (in-gamut color), it is hidden (no empty-state noise). When active:

```
 [  before (P3 swatch)  ] → [  after (sRGB gamut-map)  ]   ΔE_ok: 0.032
```

- **Before swatch**: the wide-gamut source color rendered as a CSS `background-color`
  in its native space (`color(display-p3 …)` — visible on P3-capable displays, clipped on
  sRGB ones, which is the truth about what sRGB is losing).
- **After swatch**: the gamut-mapped result in sRGB (`rgb(…)` or `color(srgb …)`), the
  actual value the library emits.
- **ΔE_ok readout**: `deltaEOK(source, mapped).toFixed(3)` — the perceptual distance
  between the source and the mapped result in OKLab. A value above `DELTA_E_OK_JND`
  (≈ 0.02, the just-noticeable-difference threshold) is flagged in amber; below it is
  muted (the mapping is perceptually invisible — the JND case the O.W3 early-exit
  optimization targets).
- **Tooltip / popover**: clicking the indicator opens a Reka-ui `<Popover>` (or
  `useHoverPopover` composable, which is the pattern in `palette-browser/`) with a sentence
  explaining "This color is outside sRGB. The displayed value uses value.js's gamut map
  (CSS Color 4 §13.2) to find the closest in-gamut sRGB equivalent." — a live,
  user-facing documentation of the library's behavior.

**Implementation boundary.** `GamutTruthBadge.vue` is a self-contained presenter
component (no new composables needed). It receives:
- `source: ParsedColorUnit | null` — the current picker color.
- `targetSpace: ColorSpace` (default `"srgb"`) — the egress space for the gamut check.

It computes `isInSRGBGamut(source)` and `gamutMap(source, targetSpace)` inline (both
are synchronous, allocation-light scalar calls). `gamutMap` is already imported by
`useMixingAnimation.ts` and `useGradientCSS.ts`; no new library surface is needed.

**Placement.** The `ColorComponentDisplay.vue` "display" area (the large component-value
readout in the picker pane) is the natural host: it is already the color's visual truth
surface, and it has the vertical space. Alternatively, a narrow horizontal bar below the
main picker card. Do NOT intrude on the SpectrumCanvas or HeroBlob surfaces (those are
the visual hero, not the diagnostic surface).

**Falsifiable check.** Set the picker to a known out-of-gamut P3 color, e.g.
`color(display-p3 0.2 0.8 0.3)` (checked: `isInSRGBGamut` returns false for this value).
The indicator is visible with two swatches and a ΔE_ok readout. Set the picker to any
sRGB hex color; the indicator hides. Zero console errors throughout.

### S3 — hero-lab shell: design-language suffusion

**What exists today:** The `hero-lab/App.vue` shell uses `<Badge>`, `<Card>`, `<Tabs>`,
`<DarkModeToggle>`, and `hero-lab.css` for layout. The design is functionally correct
but falls short of the N.W12 grand-hierarchy and Fable design language:

- The header copy (`h1`, kicker, subtitle) uses raw `hero-lab-*` class names, not the
  named-utility type ramp (`text-display`, `text-title`, `text-prose`, `section-label`).
- The note cards do not use glass tiers idiomatically (the first is `.hero-lab-note-card--glass`
  but the tier is not expressed as a `tier` prop — it is a custom class).
- The tabs rail sits in a `div.hero-lab-tabs__rail` with no documented role.
- The two badge pills in the header are static strings; they could be typed as
  `<Badge variant="outline">WebGL / Canvas 2D</Badge>` with a semantic renderer label,
  not just decorative text.

**The suffusion.** Three targeted changes (KISS — no re-architecture):

**S3.A — Type-ramp migration.** Replace the `hero-lab-kicker`, `hero-lab-title`,
`hero-lab-subtitle` raw classes with the named type-ramp utilities from `DESIGN.md §Type
scale`:
- `hero-lab-kicker` → `.section-label` (the glass-ui mono-caption utility — this is
  exactly what a kicker is).
- `hero-lab-title` → `.text-title` (or `.text-heading` — the Fraunces serif h1 voice).
- `hero-lab-subtitle` → `.text-prose` (the body voice at comfortable measure).
- `hero-lab-note-title` → `.text-heading`.

The font identity does not change (all these utilities also use Fraunces/Fira Code per the
demo's `@theme`); only the scale step becomes canonical. The bespoke `hero-lab.css`
font-size literals for these classes are removed (the named utilities supply them).

**S3.B — Card tier honesty.** The glass note card (`hero-lab-note-card--glass`) is
currently expressed as a custom modifier class. Replace with the explicit `tier="resting"`
prop on the `<Card>` component (the canonical idiom per `DESIGN.md §Surfaces`). The
plain note card uses `tier="wash" :shadow="false" :grain="false"` (the scrolling-content
idiom). Remove the `hero-lab-note-card--glass` CSS modifier; the Card component's native
tier prop replaces it.

**S3.C — Badge semantics.** The two decorative badges in `hero-lab/App.vue` header
currently read `"Reka + shad-style UI"` and `"Glass + shadow tokens"` — these were
originally dev notes, not user-facing labels. Replace with renderer labels that communicate
the demo's content: `"WebGL"` and `"Canvas 2D"` as `<Badge variant="outline">`, flanked
by a renderer-count badge `<Badge variant="secondary">2 backends</Badge>`. This mirrors
the `HeroPanel`'s existing `renderer` + `complexity` props and gives the header factual
semantic content.

**Falsifiable check.** Navigate to the hero-lab route. The header kicker renders in the
`.section-label` mono type, the h1 in `.text-title` Fraunces, the subtitle in `.text-prose`.
The first note card renders with the glass resting tier (backdrop-filter + frosted surface,
visible in devtools as `backdrop-filter: blur(…)`). Zero console errors.

### S4 — color-picker App.vue shell: view-router integration for the Parse-Lab pane

**What is required.** The Parse-Lab pane (S1) must integrate into the existing view router
cleanly. This is four surgical edits:

**S4.A — `viewSchema.ts`.** Add `"parse-lab"` to the `LeftPane` union (the `ViewId`
registry). Add a `VIEW_MAP` entry: `{ id: "parse-lab", label: "Parse Lab",
icon: "code-xml" }` (the lucide `CodeXml` icon, or `"brackets"` — the lab-for-parsing
semantic).

**S4.B — `usePaneRouter.ts`.** Add the `"parse-lab"` route entry: the left-slot resolves
to `ParseLabPane`, the right slot resolves to `null` (full-width single-pane view, no dual
panel), component props = `{}` (the pane gets `cssColorOpaque` via `provide`/`inject`
through `CSS_COLOR_KEY` — no prop drilling needed).

**S4.C — Dock.** The new view appears in the dock's view-nav automatically via the
`VIEW_MAP` registry (verified: `Dock.vue` renders from `VIEW_MAP` — no manual dock edit
required). If the dock has a hard-coded view list, add `"parse-lab"` there too; confirm
at implementation time.

**S4.D — `ParseLabPane.vue` route registration.** `demo/@/components/custom/panes/index.ts`
(the pane barrel) exports `ParseLabPane`.

**Falsifiable check.** `"parse-lab"` appears in the dock nav. Clicking it routes to
`ParseLabPane`. `useViewManager.currentConfig.value.left` is `"parse-lab"`. The pane
mounts without errors.

---

## Born-RED gate

**Gate name:** `proof:parse-lab-mount` (NEW — a lightweight node gate that navigates to
the parse-lab route in the built demo and asserts the gate criteria over the REAL runtime
observable). Added to `proof:hygiene` (no browser required; the gate is a headless mount
check identical in structure to the existing boot-smoke).

**The REAL observable (the anti-proxy law, per M.W1 precedent).** The gate MUST NOT
assert:

- File presence (`ParseLabPane.vue` exists) — a source-shape proxy.
- `viewSchema.ts` contains `"parse-lab"` — another source-shape proxy; a typo in the
  import chain would pass.
- The `parseCSSColor` function is imported anywhere — import-graph proxy.

The REAL observable is: **`parseCSSColor` is called at runtime when the Parse-Lab pane
mounts.** The gate instruments this by wrapping the production `dist/` artifact in a
lightweight node probe:

```
node scripts/proof-parse-lab-mount.mjs
```

This probe:

1. **C1 — call-count positive.** Injects a counter shim around `parseCSSColor` at the
   module boundary (via the `--experimental-require-module` hook or a Vite build-time
   `define`) and navigates to the `/parse-lab` route in a headless Playwright instance.
   Asserts that `parseCSSColor` is invoked at least once before the pane's mounted hook
   returns. TODAY: exits 1 because the pane does not exist and `parseCSSColor` is called
   zero times on that route.

2. **C2 — console-clean mount.** Asserts zero `console.error` emissions during the
   Parse-Lab pane mount (the same predicate the existing boot-smoke uses for the full
   app). TODAY: exits 1 because the pane does not exist (the route 404s or renders an
   empty slot, which the boot-smoke contract treats as a failure).

3. **C3 — tree non-empty.** Asserts the DOM contains a `[data-testid="parse-lab-tree"]`
   element with at least one child node after the mount (the tree renders). TODAY: exits 1
   (element absent).

4. **C4 — gamut indicator inactive on sRGB input.** Navigates to the color-picker with
   an sRGB hex color seed; asserts `[data-testid="gamut-truth-badge"]` is NOT visible
   (indicator correctly hidden for in-gamut color). TODAY: exits 1 (element absent).

5. **C5 — gamut indicator active on P3 input.** Navigates to the color-picker with
   `color(display-p3 0.2 0.8 0.3)` (a known out-of-gamut P3 color); asserts
   `[data-testid="gamut-truth-badge"]` IS visible and contains a ΔE_ok readout. TODAY:
   exits 1 (element absent).

**Today's tree result.** `proof:parse-lab-mount` exits 1 on today's tree by construction:
the Parse-Lab pane does not exist (C1, C2, C3 fail); the gamut-truth badge does not exist
(C4, C5 fail). The gate is born-RED.

**Green condition.** All five clauses pass: `parseCSSColor` is called at least once on
Parse-Lab mount (C1), zero console errors (C2), the tree element is populated (C3), the
gamut indicator hides on in-gamut colors (C4), and shows on out-of-gamut colors (C5).

**Alternative gate structure (simpler, equally real).** If the full Playwright headless
instrumentation is too heavy for a hygiene gate, the gate is re-structured as a Vitest
component test (`test/parse-lab-mount.test.ts`) using `@vitest/browser-playwright`:

```ts
// C1: parseCSSColor called on mount
vi.spyOn(colorModule, "parseCSSColor");
await mount(ParseLabPane, { ... });
expect(colorModule.parseCSSColor).toHaveBeenCalled(); // born-RED until pane exists
```

Either form gates on the REAL call-count observable, not a source-shape proxy.

---

## Dependencies

- **O.W0 (recommended, not blocking for S3).** The Parse-Lab pane (S1) exercises
  `parseCSSValue`; if the P0 crashes are still live, `linear-gradient(red, blue)` would
  throw in the parse-tree display. O.W7's pane MUST handle parse errors gracefully (S1
  spec: error badge, no crash), so it can mount cleanly even on 0.13.0 before O.W0 ships.
  The P0 inputs are simply displayed as error-badge states. O.W0 makes them parse
  correctly. O.W7 does NOT wait for O.W0 to start (demo work, no library dependency).

- **N.W10 (the cascade-kill, RATIFIED but not yet implemented).** The demo's CSS cascade
  substrate kill (N.W10) is the gate-opener for the full design-language block. O.W7's
  S3 (hero-lab shell suffusion) and S4 (pane router integration) are modest-enough
  additions that they can proceed before N.W10 without collision — but S3 MUST comply
  with whatever cascade the N.W10 implementation establishes. If N.W10 has not yet
  shipped when O.W7 implements, scope S3 conservatively (type-ramp + tier props only);
  defer any cascade-dependent suffusion to N.W16.

- **N.W12 (grand hierarchy, RATIFIED but not yet implemented).** The type-ramp migration
  in S3.A cites N.W12 tokens (`text-display`, `text-title`, `section-label`). If N.W12
  has not yet shipped when O.W7 implements, S3.A MUST map to the equivalent N-era tokens
  already in `style.css` (per `DESIGN.md §Type scale` — these are the same Fraunces-backed
  named utilities that the N wave will keep; the step-to-token mapping is stable).

- **No value.js library dependency.** O.W7 is demo-only. It consumes the published (or
  locally-built) library surface but writes zero `src/` changes. It has no dependency on
  O.W1/O.W2/O.W3 — the Parse-Lab pane calls `parseCSSColor` and `parseCSSValue` on the
  0.13.0 surface that ships today.

- **glass-ui BA cut (N.W18).** O.W7 uses glass-ui components (`Card`, `Badge`, `Tabs`,
  `SegmentedTabs`) that are already in the demo. No new glass-ui consume edge is added.
  If glass-ui 4.0.0 is not yet the pinned version, O.W7 uses whatever glass-ui version
  the demo currently pins (per the existing `demo/package.json`).

---

## DAG position

```
O.W0 (P0 crashes, optional for gate green) ─────────────────────────────────►┐
                                                                               │
N.W10 (cascade kill, RATIFIED) ── ► ── ► ── (S3 deferred arm if not shipped) ─►│
                                                                               │
                                                       O.W7-demo (S1–S5)  ◄──┘
                                                                               │
                                             proof:parse-lab-mount  ◄─────────┘
```

O.W7 is an isolated demo wave — no parse-that edge, no library-source change. It can
execute in parallel with O.W0–O.W6 after the N demo block opens (N.W10 or earlier with
scoped S3). It does not block and is not blocked by any O library wave.

---

## Verify-before-fold items (the §6 discipline applied to this wave)

- **`isInSRGBGamut` correctness for `display-p3 0.2 0.8 0.3`.** Confirm in a node
  session: `isInSRGBGamut(parseCSSColor('color(display-p3 0.2 0.8 0.3)'))` returns
  `false`. This is the S2/C5 premise. If it returns `true`, the test color must be
  updated to a known out-of-gamut P3 value. Verify at implementation time; do not rely
  on the spec's assertion alone.
- **`ValueUnit.toString()` output for `parseCSSColor('oklch(52% 0.18 210 / 0.8)')`.**
  Confirm the round-trip output is `"oklch(52% 0.18 210 / 0.8)"` (or the canonical
  normalized form). If N.W7 changed the serialization format, the Parse-Lab pane's
  re-serialization display should reflect the actual output, not a hardcoded expected
  string.
- **The `VIEW_MAP` dock integration.** Confirm at implementation time that the dock
  auto-renders from `VIEW_MAP` (S4.C). If the dock hard-codes its view list, add the
  entry there; do not assume the auto-registration.
- **Popover idiom for the gamut indicator.** `useHoverPopover` is a composable colocated
  in `palette-browser/composables/`; it is NOT a globally exported standalone component.
  The gamut indicator's click-to-explain popover MUST use either: a Reka-ui `<Popover>`
  primitive (available via `@components/ui/`), or the `useHoverPopover` composable imported
  from its colocated path. Do NOT create a new global `HoverPopover.vue`; colocate the
  popover logic in `GamutTruthBadge.vue`'s `<style scoped>` + Reka-ui primitives.

---

## Excluded from this wave

- **The full N.W16 per-pane Fable audit** (the picker hero, gradient + easing pane, mix
  pane, extract pane, docs — the full per-pane design corpus). O.W7 is the Parse-Lab
  pane + gamut indicator + hero-lab shell only. The full N.W16 work remains in the N
  wave set (RATIFIED, awaiting N.W10 cascade-kill substrate).
- **The `ColorInput` refactor.** The parse-lab pane reuses the glass-ui `input-bar` recipe
  for its input field; it does NOT restructure the main `ColorInput.vue` component (which
  has pointer-capture guards and a full composable suite). Any parity between the parse-lab
  text field and the main picker input is incidental.
- **A full AST editor.** The parse-lab pane renders a read-only tree with copy affordances.
  It is NOT a bidirectional tree editor where the user edits a node and sees the CSS update
  (that is a separate tool, out of scope here).
- **The subpath budget proof for the demo bundle.** Confirming that `demo/` imports the
  `./color` subpath cleanly (proof:subpath-budget) is O.W2's territory. O.W7 uses whatever
  import path the demo currently uses (`@src/parsing/color` direct alias) and does not
  change the import graph.
- **`parseCSSStylesheet` visualization.** The Parse-Lab pane handles single CSS VALUES
  (`parseCSSColor`, `parseCSSValue`). Visualizing a full `@keyframes` block or a stylesheet
  would require the `parseCSSStylesheet` + `extractKeyframes` path — a larger scope. Filed
  for a future extension; O.W7 stays at the value level.
