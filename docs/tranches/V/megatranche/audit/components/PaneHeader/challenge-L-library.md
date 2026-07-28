# CHALLENGE-L — PaneHeader.vue · library structure

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, matching the
explicit declaration this seat was spawned with. Not inherited, not undeclared.

Subject: `demo/shared/ui/PaneHeader.vue` (224 lines; 121 substantive / 91 comment / 12 blank —
`awk` accounting below). Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD
`c654824e`. Nine consumers. No source edits made; probe scripts only, written under this seat's
own directory.

---

## Verdict

**DEFECTIVE.** The premise holds, and it holds at the sharpest possible place: this component is a
**hand fork of a design-system primitive that the repo already adopted whole**, and the fork
diverges from the original on the two axes the original got right — unit-safe type stepping and
motion-preference gating. Two of the defects below are BLOCKER-class and both are *consequences* of
the wrong-home mistake, not independent bugs.

The single cure retires the component.

---

## Executive summary

`@mkbabb/glass-ui@7.0.0` — the design system, adopted **whole** at V·W44 (`91fa1368`) — ships
`CardHeader` with a `shrink` prop whose grammar is:

```
node_modules/@mkbabb/glass-ui/dist/components/card/card-scroll.css
  .card-header--shrink                              → position:relative; isolation:isolate
  .card-header--shrink::before                      → --glass-bg-resting + --glass-blur-resting
                                                       + bottom-feather mask + border-radius:inherit
  [data-condensed="true"]                           → padding-block-start: --card-header-pad-condensed
  [data-condensed] > [data-slot=card-title]         → --type-display-2 → --type-display-1
  [data-condensed] > [data-slot=card-description]   → display:none
  @media (prefers-reduced-motion: reduce) { … transition:none }
```

plus, in `dist/card-Bk96VI2R.js` (`__name: "CardHeader"`), the crossing mechanism:
`root.closest(".card-scroll-host")`, sufficiency gate
`e.scrollHeight - e.clientHeight > root.height/2 + 24`, triggers `at: 24` down/up, `flush:"post"`.
And `.card-scroll-host { contain: layout style paint; }` in
`dist/styles/utilities/base-misc.css`.

The demo carries **two independent forks of that primitive**:

| | home | mechanism | consumers | veil feather | title step |
|---|---|---|---|---|---|
| producer | glass-ui 7.0.0 `CardHeader shrink` | threshold cross → `data-condensed` | 0 (unused) | `--card-pad-title-gap` ≈ 9.17px | token step d2→d1 |
| **fork A** | **`demo/shared/ui/PaneHeader.vue`** | scroll-timeline scrub | **9 panes** | hardcoded **14px** | `calc(tan(atan2(…)))` |
| fork B | `demo/picker/composables/useHeaderCondense.ts` + `demo/picker/header.css` | IntersectionObserver → `.is-condensed` | 1 (ColorPicker) | hardcoded **12px** | token step d2→d1 |

Fork A is the subject. It is the only one of the three that computes its type rung with a browser
trigonometric function, and the only one of the three with no `prefers-reduced-motion` arm. Those
two facts are L-1 and the standing born-RED MT-F023, and they are the *same* defect wearing two
hats: the component took ownership of a design-system concern and then failed to reproduce the
design system's discipline.

---

## L-1 — BLOCKER · the condensed type rung is derived by browser trig in a leaf component, and WebKit gets it wrong by 2×

### The code

`demo/shared/ui/PaneHeader.vue:140-142`

```css
--pane-title-shrink-ratio: calc(
    tan(atan2(var(--type-heading), var(--type-display-1)))
);
```

The file's own comment (`:132-139`) certifies this: *"The ratio is CLOSED-FORM, not a hand constant:
tan(atan2(y, x)) is the CSS length-ratio identity, so the endpoint law survives display-1's
viewport-fluid clamp at every band — ≈0.618 (1/φ) at the ≥1440 cap, degenerating to exactly 1 on
phones where display-1 floor-pins AT heading (the shrink self-neutralizes …)"*.

**Both halves of that claim are false on WebKit.**

### Measured — live app, both engines

`node docs/tranches/V/megatranche/audit/components/PaneHeader/probe-L-structure.mjs`
(route `/#/about`, viewport 1440×900, scroll the `.pane-scroll-fade` host to 200px):

| engine | `--type-heading` | `--type-display-1` (computed) | title transform at 200px | title width |
|---|---|---|---|---|
| **webkit** | `1.618rem` | `41.888px` | `matrix(0.310808, …)` | 462px → **144px** |
| **chromium** | `1.618rem` | `41.888px` | `matrix(0.618029, …)` | 462px → **286px** |

Same viewport, same tokens, same computed `titleFontSize: 41.888px`, both report
`supportsSDA: true`. Chromium lands the designed `1/φ = 0.618`. WebKit lands **0.3108** — the
scrolled title's effective size is `41.888 × 0.310808 = 13.02px`.

That is below the legibility floor **this repo's own sibling grammar explicitly protects**.
`demo/picker/header.css:87-93`: *"`--type-display-1` floors at 1.618rem (25.9px @390 / 41.9px
@1440) — above the legibility floor the wave doc names (BR-11: the T-42 'text too small'
below-bound)."* Fork A ships 13.0px on Safari, the app's primary target (`color.babb.dev`; the
entire visual-audit matrix is WebKit).

### Measured — the "self-neutralizing no-op" INVERTS on mobile

`node /…/scratchpad/m390b.mjs` (390×844, `/#/gradient`, host scrolled to 200):

```
webkit   #/gradient REST {"fs":"25.888px","tr":"matrix(1, 0, 0, 1, 0, 0)","w":324,"h":27}
                    STUCK {"fs":"25.888px","tr":"matrix(1.433843, 0, 0, 1.433843, 0, 0)","w":465,"h":39}
chromium #/gradient REST {"fs":"25.888px","tr":"matrix(1, 0, 0, 1, 0, 0)","w":324,"h":27}
                    STUCK {"fs":"25.888px","tr":"matrix(1, 0, 0, 1, 0, 0)","w":324,"h":27}
```

Chromium: exactly `1` — the designed no-op. **WebKit: `1.4338`** — on Safari mobile the pane title
*grows 43% as you scroll*, 324→465px wide and 27→39px tall, inside a 390px-wide viewport. The
comment's "deliberate no-op" is, on the primary mobile engine, a 43% enlargement in the wrong
direction.

### Mechanism — isolated to a 5-declaration CSS repro

I did not want to assert an engine bug from an app measurement, so I isolated it. Script:
`/…/scratchpad/trig.mjs` (5 divs, `width: calc(1000px * <expr>)`, no app, no framework):

```
webkit   {"a":"310.796875px","b":"618.03125px","c":"311.34375px","d":"31717.265625px","e":"618px"}
chromium {"a":"618.016px",   "b":"618.031px",  "c":"311.344px",  "d":"31717.3px",     "e":"618px"}
```

| id | expression | webkit | chromium |
|---|---|---|---|
| a | `tan(atan2(var(--type-heading), var(--type-display-1)))` | **0.3108** | 0.618016 |
| b | `tan(31.71776deg)` | 0.618031 | 0.618031 |
| c | `tan(31.71776rad)` | 0.311344 | 0.311344 |
| d | `atan2(1.618rem, 2.618rem) / 1deg` | **31.71727** | 31.7173 |
| e | `tan(atan(0.618))` | 0.618 | 0.618 |

Read it: `atan2()` alone is **correct** in WebKit (row d: 31.717deg, matching Chromium to 6 figures).
`tan()` with an explicit `deg` is **correct** (row b). `atan`→`tan` nesting is **correct** (row e).
Only `atan2`→`tan` breaks (row a), and it breaks to *exactly* row c — `tan(31.71776**rad**)`.
WebKit produces the right angle from `atan2()` and then consumes its numeric value as radians
inside `tan()`. `atan(0.618) = 0.5536 rad`; `31.71727 − 10π = 0.301343 rad`; `tan(0.301343) =
0.31081` — the measured value to 5 figures. Confirmed unit-carry defect in nested trig, and
`grep -rn "atan2" demo/ src/` shows PaneHeader.vue:141 is the **only** site in the repository that
depends on it.

### Why this is a *structure* finding, not a browser-bug finding

"One golden rung down from display-1" is a **type-scale** proposition. Its home is the token layer.
glass-ui owns that layer and expresses the identical relationship as a discrete token step
(`card-scroll.css`: `[data-slot=card-title]` `--type-display-2` → `--type-display-1`) — no math
function, no engine-dependent evaluation, no `@supports` gate needed. Fork A re-derived a token
relationship inside a leaf component's `calc()`, which promoted *a browser's math-function
implementation* into a design-system input. Two engines, two designs.

### Cure

Delete the trig. The condensed rung is a token step, taken at the design system's level. Concretely:
`CardTitle` steps `--type-display-1` → `--type-heading` under `[data-condensed]`, declared once in
glass-ui, consumed by every card header in the constellation. No `transform: scale()` at all — which
also kills L-3 outright, because a token step has no `transform-origin`.

---

## L-2 — BLOCKER · triplicate ownership; the premise that justifies both demo forks is false against glass-ui 7.0.0

`demo/picker/composables/useHeaderCondense.ts:9-15` is the load-bearing justification for the
demo owning header-condense at all:

> *"NEVER a compositor-only title `scale()` over an un-shrunk band (t33-research §6.6 — the pinned
> defect; the producer's shipped `card-header--shrink` / `<ScrollCardHeader>` choreography **is
> compositor-only BY ARCHITECTURAL COMMITMENT** — `proof:no-layout-animation` forbids its layout
> lane — so it **structurally cannot** satisfy §0.8/BR-9 …)"*

Against the installed `@mkbabb/glass-ui@^7.0.0`, that is **false**. From
`dist/components/card/card-scroll.css` (full text pasted in the Executive summary above):

- `.card-header--shrink { transition: padding-block-start … }` — a **layout** property.
- `[data-condensed="true"] { padding-block-start: var(--card-header-pad-condensed) }` — a real box shrink, `getComputedStyle`-measurable.
- `[data-condensed="true"] > [data-slot=card-title] { font-size: var(--type-display-1) }` — a real **token step**, not a `scale()`.
- `[data-condensed="true"] > [data-slot=card-description] { display: none }`.
- `@media (prefers-reduced-motion: reduce) { … transition: none }`.

That is, line for line, the §0.8 grammar the demo says the producer structurally cannot ship: padding
contraction + title token step + description collapse + veil, PRM-guarded. Compare
`demo/picker/header.css:79-120` — the same four rows, hand-written. And compare the mechanism:

| concern | glass-ui `CardHeader` (`dist/card-Bk96VI2R.js`) | `useHeaderCondense.ts` |
|---|---|---|
| host resolution | `root.closest(".card-scroll-host")` | `resolveScrollRoot()` walk for `overflowY: auto\|scroll` (`:65-73`) |
| threshold | `at: 24` | `opts.threshold ?? 24` (`:80`) |
| sufficiency gate | `e.scrollHeight - e.clientHeight > root.height/2 + 24` | `overflow <= savings + threshold`, `savings = expandedH - expandedH*0.5` (`:94-98`) |
| binding | `watch(host, …, { immediate:true, flush:"post" })` | `watch([sentinel, header], …, { immediate:true, flush:"post" })` (`:75,121`) |

Same algorithm, same constant, same flush. 127 lines reimplementing an installed dependency.

**Three homes for one concept, and the canonical home has zero consumers.**
`grep -rn "shrink" demo/ | grep -i cardheader` → nothing; `grep -rn "card-scroll-host" demo/` → nothing.
The design system's header primitive is dead code in `node_modules` while two demo forks carry the
app.

This is the edict-2 violation in its exact form: W44 adopted glass-ui 7.0.0 *whole*
(`91fa1368`), which obsoleted both forks, and neither was retired. The forks are legacy that
survived their own supersession, and one of them (Fork A) has since drifted into the two blockers in
this report.

### Cure

Retire both forks. `PaneHeader.vue` ceases to exist; the nine panes become
`<Card tier="resting" class="card-scroll-host …"><CardHeader shrink><CardTitle as="h2">…`.
Where 7.0.0's grammar is genuinely short of §0.8 (if it is — the claim must be re-measured, not
re-quoted), the delta goes to glass-ui as a variant/knob via the standing BH relay, per edict 4. It
does not go back into `demo/`.

---

## L-3 — MAJOR · physical `transform-origin: left top` in a document that ships an RTL seam

`demo/shared/ui/PaneHeader.vue:184`: `transform-origin: left top;`

`demo/color-picker/index.html:6` documents a deliberate *"`dir` seam so `dir="rtl"` flips the whole
document and the grid/flex layout"*, and the mega-tranche visual audit captures `rtl-desktop/` and
`rtl-mobile/` matrices. I read `shots/rtl-desktop/gradient.png`: under RTL the pane titles
("Gradient", "My Palettes") render **right-aligned**, as they must.

Measured (same probe, `document.documentElement.dir = "rtl"`, 1440×900, `/#/about`):

| state | header box | title box | title `transformOrigin` |
|---|---|---|---|
| rest | `l:200 r:710` | `l:224 r:686` | `0px 0px` |
| scrolled 200 | `l:200 r:710` | `l:224 **r:368**` | `0px 0px` |

The title box collapses toward **physical left**. Its text, right-aligned by `dir`, therefore
travels from `r:686` (24px inside the header's right edge) to `r:368` — a **342px drift** away from
the edge it is aligned to, ending mid-header. In LTR the same measurement pins `l:754` at both
states, which is why nobody saw it. Identical in both engines (`chromium` rtl: `r:686 → r:510`,
286px-wide box, same left-anchored collapse).

The design system does not make this mistake because it does not scale: a `font-size` token step
shrinks a text box from its own inline-start by construction, in either direction, with no origin
declaration to get wrong.

### Cure

Subsumed by L-1/L-2. If a `scale()` were kept for some independent reason, the origin must be
logical — but the correct move is that no `scale()` survives.

---

## L-4 — MAJOR · inverted, untyped, silently-failing dependency edge; and the class already exists in glass-ui

`demo/shared/ui/PaneHeader.vue:54-57`, in an **unscoped** `<style>` block:

```css
.pane-scroll-fade {
    contain: layout style paint;
    scroll-timeline: --pane-scroll block;
}
```

A leaf component in `demo/shared/ui/` publishes a **global** class that each of its nine
**ancestors** must independently remember to apply. There is no import edge, no prop, no type, and
no `vue-tsc` or eslint rule that can see the contract. The direction of dependency is inverted:
the parent depends on a stylesheet fragment shipped by the child, addressed by string.

The file argues for the arrangement at `:41-53` — *"the class is applied across siblings of
PaneHeader (not its descendants), the block must be UNSCOPED to reach those consumers … PaneHeader
owns the only consumers of `--pane-scroll` … so the producer + consumer live in one file."* The
premise is imprecise (the hosts are *ancestors*, not siblings — `scroll-timeline` name lookup
requires it, and I verified `t.closest(".pane-scroll-fade") === true` on every route that renders),
and the conclusion does not follow: a global class is not made local by living next to one of its
consumers.

**Compliance today is 9/9** — GradientPane:20, MixPane:62, GeneratePane:31, ExtractPane:5,
ConfigSliderPane:106, AboutPane:4, PalettesPane:2, BrowsePane:2, AdminPane:2. I checked the one
non-obvious case, `ConfigSliderPane.vue:106-107`, where the host is an inner `<div>` and PaneHeader
is its first child — correct.

**The failure mode is silent and indistinguishable from a designed state.** On `/#/palettes` at
390px both engines report `titleTransform: "none"` at rest *and* after scroll — the timeline is
inactive because that pane does not overflow, and `animation-timeline` with no active source simply
does not apply. A pane that *forgot* the host class produces byte-identical telemetry. There is no
observable difference between "correctly dormant" and "wired wrong", so no test can be written that
catches a future omission.

**And the class already exists upstream**, byte-identically:

```
node_modules/@mkbabb/glass-ui/dist/styles/utilities/base-misc.css
  .card-scroll-host { contain: layout style paint; }
```

Same declaration, different name, no consumers in the demo. The demo renamed a design-system
utility into a demo-global and then documented the rename as colocation.

### Cure

`.card-scroll-host` on the pane `Card`, and the timeline concern moves inside glass-ui's
`CardHeader`, where the host relationship is resolved in **code** (`root.closest(".card-scroll-host")`)
and can therefore fail *loudly*. The `.pane-scroll-fade` global and the unscoped `<style>` block
both disappear.

---

## L-5 — MAJOR · heading level hardcoded; the document outline is inverted, and the fork lost the seam that would fix it

`demo/shared/ui/PaneHeader.vue:21`: `<h3 class="pane-header-title font-display"><slot /></h3>` —
no `as`, no `level`, no prop. The component is the sole owner of pane titles (its own comment,
`:12-13`: *"the pane title speaks the DISPLAY voice — the ONE site; all 9 panes inherit"*), so this
one literal fixes the heading level for every pane in the app.

**Measured, first-hand, `/#/about` at 1440, both engines:**

```
"headings":{"h1":0,"h2":10,"h3":11,"main":1}
```

The page's own title is an `<h3>` sitting **above ten `<h2>`s**. The outline is inverted, and there
is no `h1` at all. This is not an isolated route: the mega-tranche visual audit's per-capture table
(`docs/tranches/V/megatranche/audit/visual/REPORT.md:118-178`) has `h1 = 0` in **all 60 rows** —
4 matrices × 15 routes, `main = 1` throughout. A single `<main>` landmark containing no level-1
heading, on every route.

The structural sting: **glass-ui already parameterizes this.** From `dist/card-Bk96VI2R.js`,
`__name: "CardTitle"`:

```js
props: { as: { default: "h3" }, class: {…} },
… "data-slot": "card-title", class: cn("card-title", props.class)
```

`as` is a prop, defaulted to `h3`. The design system got the semantics/typography separation right;
Fork A collapsed them back into one hardcoded tag and **lost the seam**. A component that cannot be
mounted at two different outline depths cannot be structurally correct in both, and PaneHeader is
mounted both as a top-level pane title (Browse, Gradient, About …) and inside the nested
`ConfigSliderPane` shell.

Second-order: `CardTitle` also emits `data-slot="card-title"` and `CardDescription` emits
`data-slot="card-description"`. glass-ui's entire header grammar is addressed through those slots
(`card-scroll.css` targets `> [data-slot=card-title]`). By minting demo-local `.pane-header-title` /
`.pane-header-desc` instead, Fork A **permanently forked the panes out of the design system's
header grammar** — no future glass-ui header improvement can ever reach them. That is the
mechanism by which a local reimplementation becomes load-bearing.

### Cure

`CardTitle as="h2"` (or `h1` where the pane is the page), `CardDescription` for the caption. The
outline becomes correct *and* addressable by the producer in one move.

---

## L-6 — MINOR · one design concept, three magnitudes, nine literals

The bottom feather — the band-killer the file rightly calls constitutive (`:76-81`) — is tokenized
upstream and hardcoded twice downstream:

| home | value | literals |
|---|---|---|
| glass-ui `card-scroll.css` | `--card-pad-title-gap` = `calc(var(--card-pad-inline) / 2.618)` ≈ **9.17px** at `--card-pad-inline: 1.5rem` | 0 |
| `PaneHeader.vue:84,91,94` | **14px** | 4 (`inset`, `mask-image`, `-webkit-mask-image` × its own stop) |
| `picker/header.css:59,67,70` | **12px** | 3 |

`grep -o "\-\-card-pad-title-gap:[^;]*;" node_modules/@mkbabb/glass-ui/dist/components/card/styles.css`
→ `--card-pad-title-gap: calc(var(--card-pad-inline) / 2.618);`

Three feather depths for what the DESIGN doc calls one recipe. PaneHeader's own comment (`:8`,
`:67-69`) claims it *"retires the bespoke `--card` 60% / blur(12px) pair, the census's 7th parallel
recipe, CC-3"* — it retired the 7th by minting the 8th, and Fork B minted the 9th.

**Negative result, stated so the jury does not chase it:** glass-ui's veil carries
`border-radius: inherit` and PaneHeader's does not. I measured it — `headerRadius: "0px"`,
`veilRadius: "0px"` on `.pane-header` in both engines, because `.pane-header` itself has no radius
for the pseudo to inherit. **Not a defect.** No corner artifact exists.

---

## L-7 — MINOR · dead dependency edge on the foundation stylesheet

`demo/shared/ui/PaneHeader.vue:61`: `@reference "../../styles/foundation.css";`

`grep -n "@apply\|theme(" demo/shared/ui/PaneHeader.vue` → **NONE**. Neither style block uses
`@apply` or `theme()`, which are the only things `@reference` serves. The directive declares a
dependency on a 600+-line stylesheet that the file does not consume; rename or restructure
`foundation.css` and this file breaks for no reason.

Systemic, not local — 15 of the 17 demo SFCs carrying `@reference` have zero `@apply`/`theme()`:

```
demo/workbenches/extract/ExtractControls.vue          demo/shell/dock/ActionButton.vue
demo/workbenches/extract/ImageEyedropper/…            demo/shell/dock/Dock.vue
demo/scenes/ConfigSliderPane.vue                      demo/shell/dock/DockStatusLamp.vue
demo/scenes/atmosphere/AuroraPane.vue                 demo/shell/dock/ActionBarToggle.vue
demo/picker/ColorPicker.vue                           demo/shell/dock/layers/ActionBarLayer.vue
demo/picker/controls/SpectrumCanvas/SpectrumCanvas.vue demo/shared/ui/PaneHeader.vue
demo/color-picker/App.vue                             demo/palettes/browser/slug/PaletteSlugBar.vue
demo/palettes/browser/search/SearchFilterBar.vue
```

(I did not measure the build-time cost; the dead-edge claim rests on the grep alone.)

---

## L-8 — MINOR · dangling producer reference; `<ScrollCardHeader>` does not exist in 7.0.0

Both forks defer their future to a producer component that is not in the installed dependency:

- `PaneHeader.vue:157` — *"until P3's ScrollCardHeader knobs land (BOOKED)"*
- `useHeaderCondense.ts:11` — *"the producer's shipped `card-header--shrink` / `<ScrollCardHeader>` choreography"*

```
$ grep -rn "ScrollCardHeader" node_modules/@mkbabb/glass-ui/dist/
$ (no output)
```

Zero hits across `dist/`. The real producer surface is `CardHeader` with `shrink: boolean` —
`dist/components/card/CardHeader.vue.d.ts` states it, including the host contract:
*"Requires `.card-scroll-host` on the scrollable ancestor."* Two forks are parked waiting for a
component that shipped under a different name and is already installed and unused.

---

## L-9 — INFO · the `demo/ui/*` barrel layer is an alias tier; no demo file exercises the design system's real specifier

Nineteen directories under `demo/ui/`; **eighteen are one-line pure re-exports** of
`@mkbabb/glass-ui` (the nineteenth, `alert`, is the same plus a docblock). Full listing produced by
iterating `demo/ui/*/index.ts` — e.g. `demo/ui/card/index.ts` in its entirety:

```ts
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@mkbabb/glass-ui";
```

Every one of PaneHeader's nine consumers imports `Card` through it (`../../ui/card`,
`../ui/card`) rather than through the design system's published specifier. Two consequences:

1. It is an alias tier — the edict-2 shape ("no aliases, no dual paths"). The barrel adds no
   type, no default, no composition; only a second name for the same symbol.
2. It is a **false proof of the design-system surface**, precisely analogous to the deep-import
   defect this challenge names for `@mkbabb/value.js`. Because no demo file writes
   `from "@mkbabb/glass-ui"` for card primitives, the demo never demonstrates that glass-ui's
   export map resolves as a real consumer would use it.

---

## L-10 — INFO · `demo/shared/` is a three-file contrivance colliding with `demo/ui/`

`find demo/shared -type f` → exactly three: `utils.ts`, `ui/PaneHeader.vue`, `ui/EmptyState.vue`.
Created at `6dc12aad` ("panes/ 16→0 — distribute/promote/relocate to feature homes"), i.e. it is
the residue of a *different* directory's dissolution: two components that had no feature home were
given a new generic one. `demo/shared/ui/` and `demo/ui/` now both mean "ui", one holding demo-owned
components and the other holding glass-ui re-exports — a name collision a reader must learn by
convention. This is the shape edict 3 names ("no new `shared/` dirs"). Under the L-2 cure the
directory reduces to `utils.ts` + `EmptyState.vue` and should be dissolved into their consumers'
homes.

---

## The `@mkbabb/value.js` question — answered, and clean

This is the one axis where the premise **fails**, and I want it on the record as a proved negative
rather than an unexamined pass.

**PaneHeader.vue has zero imports.** Its entire `<script setup>` is four lines
(`:34-38`): `defineProps<{ description?: string }>()`. There is no import edge to violate — no
feature→shell reach, no component→boot reach, no `src/` deep path. (Note that this is *why* L-4
matters: the component's real cross-boundary coupling is a global CSS class, which is exactly the
kind of edge no import-graph lint can see.)

Demo-wide, the published-surface discipline is **correct**:

```
$ grep -rhn 'from "@mkbabb/value.js' demo/ --include=*.ts --include=*.vue | sed 's/.*from //' | sort | uniq -c
  24 "@mkbabb/value.js/color";
  10 "@mkbabb/value.js/css";
   6 "@mkbabb/value.js/math";
   5 "@mkbabb/value.js/easing";
   4 "@mkbabb/value.js/quantize";

$ grep -rn 'from "\.\./\.\./\.\./src/\|value.js/src' demo/     → (no output)
$ grep -rn 'from "@mkbabb/value.js";'  demo/ test/ e2e/        → (no output)
```

All 49 imports go through the `package.json` `exports` map; the five subpaths used are a subset of
the seven published (`./color ./value ./css ./easing ./math ./transform ./quantize`, each backed by
`src/subpaths/*.ts`). **No demo import exists that a real consumer could not write.** No deep path,
no bare-barrel reach.

**One defect found in the neighbourhood, filed for the library seat, not this one.**
`package.json` has **no `"."` key** in `exports` (`require('./package.json').exports['.'] ===
undefined`; `main`, `module`, `types` all `undefined` too). The bare specifier
`@mkbabb/value.js` is therefore unresolvable for any external consumer. But
`demo/shared/utils.ts:9-21` justifies the demo's private `debounce` copy on exactly that basis:

> *"`debounce` was the last symbol holding 7 demo files on the BARE `@mkbabb/value.js` specifier …
> The utility tail has no rightful subpath home …, so the demo owns its copy; **the library's
> root-barrel export stands for external consumers.**"*

The final clause is false against the shipped manifest — there is no root barrel to stand for
anyone. Either the root export should exist (and `debounce` needs no demo copy), or it should not
(and the comment's justification must be restated, since the "external consumers" it defers to
cannot import it). Not PaneHeader's defect; recorded because this seat's charter is the published
surface and this is what the surface actually says.

---

## The greenfield lattice

Asked concretely, with no legacy: **`PaneHeader.vue` does not exist.** Nine panes do not need a
demo-owned header component when the design system ships a card header, and the concept
"sticky card header that condenses as its card scrolls" belongs to the design system in every
respect — geometry, material, type rung, motion policy, and semantics.

```
@mkbabb/glass-ui (the ONE home for the concept)
  components/card/
    Card.vue          — tier/material/surface; consumers add .card-scroll-host
    CardHeader.vue    — shrink?: boolean            ← ALREADY SHIPS the crossing mechanism
    CardTitle.vue     — as?: string (default h3)    ← ALREADY SHIPS the outline seam
    CardDescription.vue
    card-scroll.css   — the ONE veil recipe (--card-pad-title-gap), the ONE token step
                        (display-2 → display-1), the ONE PRM arm
  styles/utilities/base-misc.css
    .card-scroll-host { contain: layout style paint; }   ← ALREADY SHIPS

demo/
  <pane>/<Pane>.vue   — <Card tier="resting" class="card-scroll-host …">
                          <CardHeader shrink>
                            <CardTitle as="h2">Gradient</CardTitle>
                            <CardDescription>Build gradients …</CardDescription>
                          </CardHeader>
                          <CardContent>…</CardContent>
                        </Card>
  styles/              — tokens + app-level keyframes ONLY; zero header geometry
```

Deleted by this transposition, from `demo/`:

| artifact | lines |
|---|---|
| `demo/shared/ui/PaneHeader.vue` | 224 |
| `demo/picker/composables/useHeaderCondense.ts` | 127 |
| `demo/picker/header.css` Row B (`:48-143`) | ~96 |
| `.pane-scroll-fade` global + 3 `@keyframes` + `--pane-title-shrink-ratio` + the `@supports` gate | (within the 224) |
| **≈ 447 lines of demo-owned CSS/TS** | |

Deleted *problems*: L-1 (no trig ⇒ no engine divergence ⇒ no 13px Safari title, no 43% mobile
inversion), L-3 (no `scale()` ⇒ no `transform-origin` ⇒ RTL correct by construction), L-4 (host
contract resolved in code, fails loudly), L-5 (`as` prop restores the outline seam; `data-slot`
re-attaches the panes to the producer grammar), L-6 (one tokenized feather), L-7 (no `@reference`),
L-8 (the dangling `<ScrollCardHeader>` reference retires with the comment), MT-F023 (glass-ui's PRM
arm is already inside `card-scroll.css`), and half of L-10.

Three parallel implementations → one. Nine hardcoded feather literals → zero. Two `prefers-reduced-motion`
policies → one, owned where policy belongs.

**Where the transposition owes work upstream.** Two things must be measured, not assumed, before
the swap lands:

1. `useHeaderCondense.ts`'s §0.8/BR-9 claim must be re-tested against 7.0.0's *actual*
   `padding-block-start` + `font-size` grammar. My reading of `card-scroll.css` says the producer
   satisfies it; the demo's docblock says it structurally cannot. One of those is stale, and the
   evidence above says it is the docblock — but the *picker's* specific §0.8 geometry (readout
   line-lock, blob reservation release) is Fork B's business, not mine, and deserves its own
   measurement.
2. Any genuine residual delta — a scroll-*scrub* variant if the scrubbed veil is judged worth
   keeping over the discrete crossing, or the veil rest-floor knob PaneHeader calls the P3
   BOOKED swap — goes to glass-ui as a `CardHeader` variant/token through the standing BH relay
   (edict 4). It does not come back into `demo/`.

---

## Standing born-RED · MT-F023

Adopted as stated, on the disposition the root already ruled: **STRUCTURE, not gate.** The three
scroll-timeline declarations (`PaneHeader.vue:178-193`) move inside
`@media (prefers-reduced-motion: no-preference)`, matching the existing idiom at
`demo/styles/animations.css:43`. I did not weaken it into another override stacked on the blunt
guard at `animations.css:184`.

Two reinforcements from this seat's evidence, both strengthening the structural reading:

1. **glass-ui already enforces exactly that idiom, everywhere, without exception.** Every
   scroll-driven rule in the design system nests the `@supports` gate *inside* a
   `prefers-reduced-motion: no-preference` media query — `dist/styles/scroll-driven.css`
   (`.scroll-progress`, `[data-scroll-reveal]`), `dist/styles/scroll-choreography.css`
   (`.scroll-cascade`, `.scroll-pin-*`, `.smooth-scroll`), and `card-scroll.css` carries the
   `reduce` arm for its transitions. Fork A is the **only** scroll-driven surface in the app
   outside that discipline. MT-F023 is therefore not a missing gate — it is the measurable
   signature of L-2: the fork left the design system and left the design system's motion policy
   behind with it.
2. **Under the L-2 cure, F023 cannot recur.** The producer's grammar is discrete transitions with
   a `reduce` arm, so `animation-duration: auto` never enters the picture and the blunt guard's
   structural blind spot stops mattering for this surface. The gate fix is correct and should land;
   the transposition is what makes it permanent.

---

## Reproduction

```bash
# dev server must be live on :9000  (verified: curl → 200)

# L-1 (ratio, both engines, LTR/RTL/390) · L-3 (RTL drift) · L-4 (host resolution) · L-5 (outline)
node docs/tranches/V/megatranche/audit/components/PaneHeader/probe-L-structure.mjs

# L-1 mechanism, isolated — 5 CSS declarations, no app
#   a: tan(atan2(1.618rem,2.618rem))  b: tan(31.71776deg)  c: tan(31.71776rad)
#   d: atan2(1.618rem,2.618rem)/1deg  e: tan(atan(0.618))
#   → webkit a=0.3108 (== c) while b,d,e correct  ⇒  atan2→tan consumes deg as rad
node <scratchpad>/trig.mjs

# L-1 mobile inversion (WebKit 1.4338× vs Chromium 1.0 at 390px, /#/gradient)
node <scratchpad>/m390b.mjs

# L-2  producer grammar + mechanism
cat node_modules/@mkbabb/glass-ui/dist/components/card/card-scroll.css
cat node_modules/@mkbabb/glass-ui/dist/components/card/CardHeader.vue.d.ts
node -e 'const s=require("fs").readFileSync("node_modules/@mkbabb/glass-ui/dist/card-Bk96VI2R.js","utf8");
         const i=s.indexOf(String.fromCharCode(34)+"CardHeader"+String.fromCharCode(34)); console.log(s.slice(i-60,i+900))'

# L-4  the class already exists upstream
grep -o "card-scroll-host {[^}]*}" node_modules/@mkbabb/glass-ui/dist/styles/utilities/base-misc.css

# L-5  h1 = 0 across all 60 visual-audit captures
sed -n '118,178p' docs/tranches/V/megatranche/audit/visual/REPORT.md   # per-capture table, h1 column

# L-6  the tokenized feather
grep -o "\-\-card-pad-title-gap:[^;]*;" node_modules/@mkbabb/glass-ui/dist/components/card/styles.css

# L-7  dead @reference
grep -n "@apply\|theme(" demo/shared/ui/PaneHeader.vue            # → no output
for f in $(grep -rln "@reference" demo --include="*.vue"); do grep -q "@apply\|theme(" "$f" || echo "$f"; done

# L-8  ScrollCardHeader absent
grep -rn "ScrollCardHeader" node_modules/@mkbabb/glass-ui/dist/    # → no output

# L-9 / L-10  the barrel tier and the shared/ residue
for d in demo/ui/*/; do printf "%-16s " "$(basename $d)"; tr '\n' ' ' < "$d/index.ts" | cut -c1-110; echo; done
find demo/shared -type f

# published surface (clean) + the root-export gap (library seat)
grep -rhn 'from "@mkbabb/value.js' demo/ --include=*.ts --include=*.vue | sed 's/.*from //' | sort | uniq -c
node -e 'console.log(require("./package.json").exports["."])'      # → undefined
```

## Artifacts

- `docs/tranches/V/megatranche/audit/components/PaneHeader/challenge-L-library.md` (this file)
- `docs/tranches/V/megatranche/audit/components/PaneHeader/probe-L-structure.mjs` (retained; the
  cross-engine / cross-direction structural probe)
