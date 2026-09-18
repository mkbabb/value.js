# CHALLENGE-L — library structure · `demo/workbenches/generate/GeneratePane.vue`

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`), spawned with an explicit Opus 5
declaration. The seat is declared, not inherited.

## Scope + substrate

- Repo `/Users/mkbabb/Programming/value.js`, branch `tranche-u`.
- **HEAD at audit time is `9268f054`**, not the `c654824e` named in the seat brief — the
  fleet landed three commits (`e9cf0aa4`, `ef06618b`, `9268f054`) during formation. No
  `demo/`, `src/` or `test/` file in this component's graph differs between the two;
  recorded so the evidence lines below are anchorable.
- Subject: 41 lines, `demo/workbenches/generate/GeneratePane.vue`.
- Live probes ran against the dev server at `http://localhost:9000` (200 OK) with a
  headless Chromium driven by the repo's own `playwright@1.60`. Probe scripts live in the
  session scratchpad; both are reproduced verbatim below their findings.
- Writes confined to this directory. No source touched.

## The import graph, traced

```
GeneratePane.vue
├─ vue                                        ✓ (value imports only)
├─ ../../ui/card              → demo/ui/card/index.ts  → @mkbabb/glass-ui   ⚠ L-8
├─ ../../shared/ui/PaneHeader.vue                                            ⚠ L-2, L-5
├─ ./GenerateControls.vue                     ✓ feature-internal
│   ├─ ../../ui/{select,slider,button,badge}  → glass-ui via barrel          ⚠ L-8
│   ├─ @mkbabb/glass-ui              (writeClipboard)  — bare specifier      ⚠ L-8
│   ├─ @mkbabb/glass-ui/watercolor-dot          — bare subpath               ✓
│   ├─ ../../palettes/browser/card  (PaletteColorStrip) — feature → feature  ⚠ L-4a
│   ├─ ../../color-session/color-chips (PreviewStrip)   — feature → shared   ✓
│   ├─ ../../color-session/generate-color                                    ⚠ L-12
│   │   ├─ @mkbabb/value.js/color   → dist/subpaths/color.d.ts  ✓ published
│   │   ├─ @mkbabb/value.js/css     → dist/subpaths/css.d.ts    ✓ published
│   │   └─ ./prng (mulberry32)                                               ⚠ L-12
│   └─ ./composables/useColorGeneration                                      ✓
├─ ../../palettes/usePalettePorts  (for ONE Symbol)                          ⚠ L-4
├─ ../../color-session/keys        (CSS_COLOR_KEY — NEVER READ)              ⚠ L-3
└─ type ../../palettes/types                  ✓ `import type`, verbatimModuleSyntax clean
```

**The published-surface question resolves clean for this component.** Nothing in the
GeneratePane graph reaches `src/` internals. The one value.js hop —
`demo/color-session/generate-color.ts:41-42` — goes through `@mkbabb/value.js/color` and
`@mkbabb/value.js/css`, both real keys in `package.json#exports`. `tsc --traceResolution`
confirms the specifier resolves through the package's own `exports` map by **package
self-reference**, to this checkout's build, not to a stale artifact:

```
======== Module name '@mkbabb/value.js/css' was successfully resolved to
'/Users/mkbabb/Programming/value.js/dist/subpaths/css.d.ts'
with Package ID '@mkbabb/value.js/dist/subpaths/css.d.ts@4.0.0'. ========
```

That is the one thing this component gets architecturally right, and it is worth stating
as a positive: **a real consumer could write every value.js import in this graph.** The
defects are all on the demo side of the boundary.

---

## Findings

### L-1 · BLOCKER — the user's palette name is destroyed at the pane/controls boundary

`GenerateControls.vue:41-43` declares a two-payload emit:

```ts
const emit = defineEmits<{
    save: [colors: string[], name: string];
}>();
```

`GeneratePane.vue:14-20` handles it with a **one-parameter** function and substitutes a
hardcoded string for the payload it dropped:

```ts
function onSave(colors: string[]) {
    const paletteColors: PaletteColor[] = colors.map((css, i) => ({ css, position: i }));
    pm.createPalette("Generated Palette", paletteColors);
}
```

The `paletteName` ref (`GenerateControls.vue:47`) is bound to a live, editable,
`aria-label="Palette name"` input in the plate title position — the screenshot at
`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/generate.png` shows it
rendered as the plate's headline. The comment at `GenerateControls.vue:37-40` asserts the
opposite of what ships: *"the save carries the plate's own name … The pane's `createPalette`
name-wire is its owner's one-liner … this emit is already truthful."* The emit is truthful.
The receiver is not.

TypeScript cannot catch this: a handler with fewer parameters is assignable to a wider
signature. Nothing in the gate set sees it.

**Live reproduction** (`probe-generate-name.mjs`, headless Chromium, dev server at :9000):

```
NAME_INPUT_INITIAL:    Generated Palette
NAME_INPUT_AFTER_FILL: MY-UNIQUE-BENCH-NAME
STORED_NAMES:   [{"name":"Generated Palette","slug":"generated-palette-5a40e3bc","id":"23baf7a9"}]
STORED_NAMES_2: [{"name":"Generated Palette","slug":"generated-palette-11b06cb1"},
                 {"name":"Generated Palette","slug":"generated-palette-5a40e3bc"}]
```

Two saves, two distinct user-typed names (`MY-UNIQUE-BENCH-NAME`, `SECOND-BENCH-NAME`),
two records both named `Generated Palette`. The rename affordance is decorative. Every
generated palette in a user's library is indistinguishable by name.

The store makes the consequence worse in a second way. `usePaletteStore.ts:66-81`
dedups on `name.toLowerCase() === name && colorsMatch(colors)`; with a frozen name the
dedup key collapses to colors-only, so the name axis of the identity is inert. (Slugs
survive — `utils.ts:14-16` appends `crypto.randomUUID().slice(0,8)` — so this is *not*
a slug-collision bug; I checked and it is not.)

**Mechanism.** A presentational shell was given a persistence responsibility it has no
information to discharge. `GeneratePane` knows nothing about the generate session; it
receives a partial projection of it through an emit and has to re-invent the rest. The
hardcoded `"Generated Palette"` is the tell: a constant that is *already owned* by the
child (`GenerateControls.vue:47` seeds the same literal) copied into the parent.

**Cure — transposition, not a patch.** Do not widen `onSave` to `(colors, name)`. Delete
it. The persistence verb belongs beside the state it persists. `useColorGeneration` becomes
the feature session — it already owns `preset/harmony/count/seed/palette`; give it `name`
and a `save()` that calls `LIBRARY_PORT_KEY.createPalette(name, colors)` directly.
`GeneratePane` then imports neither `usePalettePorts` nor `palettes/types` and shrinks to
a pure shell. That single move also kills L-3, L-4 and half of L-7 at the same site.

---

### L-2 · MAJOR — glass-ui already ships the pane-header primitive; the demo reimplements it, three times

The subject's one structural child is `PaneHeader` (`GeneratePane.vue:4, 32-34`), 224 lines
at `demo/shared/ui/PaneHeader.vue`, of which ~170 are CSS implementing a scroll-condensing
card header: a `::before` veil painted with `--glass-bg-resting` / `--glass-blur-resting`,
a bottom `mask-image` feather, a scroll-scrubbed title shrink, a description fade-out.

**glass-ui 7.0.0 — the installed, imported, already-compiled dependency — ships exactly
that primitive.** `node_modules/@mkbabb/glass-ui/dist/components/card/CardHeader.vue.d.ts:1-5`:

```ts
type __VLS_Props = {
    /** Requires `.card-scroll-host` on the scrollable ancestor. */
    shrink?: boolean;
    class?: HTMLAttributes["class"];
};
```

and `dist/components/card/card-scroll.css:1` implements it with the *same construction the
demo re-derived*:

```css
.card-header--shrink::before { content:""; position:absolute;
  inset: 0 0 calc(var(--card-pad-title-gap) * -1); z-index:-1;
  background: var(--glass-bg-resting);
  backdrop-filter: var(--glass-blur-resting);
  mask-image: linear-gradient(to bottom, black calc(100% - var(--card-pad-title-gap)), transparent);
  opacity: 0; }
.card-header--shrink[data-condensed="true"] > [data-slot="card-title"] { font-size: var(--type-display-1); }
.card-header--shrink[data-condensed="true"] > [data-slot="card-description"] { display: none; }
```

The demo's `.pane-scroll-fade` is likewise a superset copy of glass-ui's scroll-host
utility. Side by side:

| glass-ui `dist/styles/utilities/base-misc.css:1` | demo `PaneHeader.vue:54-57` |
|---|---|
| `.card-scroll-host { contain: layout style paint; }` | `.pane-scroll-fade { contain: layout style paint; scroll-timeline: --pane-scroll block; }` |

`demo/styles/foundation.css:56` does `@import "@mkbabb/glass-ui/styles"`, and that surface's
`index.css` chains `@import "../components/card/card-scroll.css"`. So the design system's
implementation **is compiled into the page the demo serves and then not used.** Measured on
the live `/#/generate` route (`probe-structure.mjs`):

```json
{
  "ruleCardScrollHostLoaded":    true,
  "ruleCardHeaderShrinkLoaded":  true,
  "cardScrollHostEls":           0,
  "cardHeaderShrinkEls":         0,
  "paneScrollFadeEls":           2,
  "paneHeaderEls":               2,
  "generatePaneCardClass": "glass-resting card rounded-card text-card-foreground scrollbar-hidden pane-scroll-fade w-full overflow-y-auto overflow-x-hidden min-w-0 h-full",
  "cardScrollTimeline": "--pane-scroll"
}
```

1383 bytes of shipped, parsed, zero-element design-system CSS; a 224-line demo file doing
its job.

And there is a **third** implementation. `demo/picker/composables/useHeaderCondense.ts` is
an IntersectionObserver-driven condense used by `ColorPicker.vue:134,193` — which, unlike
the workbench panes, *does* use glass-ui's `CardHeader` (`ColorPicker.vue:108`), just
without its `shrink` prop. So the same concept has three live homes:

| # | home | mechanism | consumers |
|---|---|---|---|
| 1 | glass-ui `<CardHeader shrink>` + `.card-header--shrink` | attribute toggle + transition | **0** (measured) |
| 2 | `demo/shared/ui/PaneHeader.vue` + `.pane-scroll-fade` | CSS scroll-timeline scrub | 9 panes incl. GeneratePane |
| 3 | `demo/picker/composables/useHeaderCondense.ts` + `header.css` | IntersectionObserver + JS state | ColorPicker |

The repo already knows. `PaneHeader.vue:172` says *"until P3's ScrollCardHeader knobs land
(BOOKED)"*; `useHeaderCondense.ts:8-14` argues at length that the producer's shipped
choreography *"structurally cannot satisfy §0.8/BR-9"* and calls itself *"the REFERENCE
implementation a producer real-box-shrink door later absorbs."* The reasoning is sound;
the *placement* is the defect. Under edict 4, a better variant is an argument for landing
it **in glass-ui**, not for keeping a second and third copy in `demo/`.

**Cure.** One home. Land the scrub-scrubbed and real-box-shrink behaviours as glass-ui
`CardHeader` modes (the BH relay is the existing channel), then `GeneratePane` becomes:

```vue
<Card tier="resting" class="card-scroll-host …">
  <CardHeader shrink>
    <CardTitle>Generate</CardTitle>
    <CardDescription>Create pleasing random palettes with aesthetic presets.</CardDescription>
  </CardHeader>
  …
```

`PaneHeader.vue`, `.pane-scroll-fade`, `--pane-scroll` and `useHeaderCondense.ts` all die.
Note the demo *already re-exports* `CardHeader`/`CardTitle`/`CardDescription` at
`demo/ui/card/index.ts:1` and uses `CardHeader` only in `ColorPicker.vue` —
`CardTitle`/`CardDescription`/`CardFooter` have **zero** demo consumers, which is what a
shadow primitive looks like from the barrel side.

---

### L-3 · MAJOR — a dead cross-boundary inject, structurally undetectable

`GeneratePane.vue:10`:

```ts
const cssColorOpaque = inject(CSS_COLOR_KEY)!;
```

`cssColorOpaque` is never read — not in the script, not in the template. Occurrence count
per file, over every `.vue` that touches `CSS_COLOR_KEY` (1 = declaration only):

```
1  demo/workbenches/generate/GeneratePane.vue     ← DEAD
1  demo/workbenches/gradient/GradientPane.vue     ← DEAD
2  demo/palettes/BrowsePane.vue
2  demo/workbenches/mix/MixPane.vue
3  demo/palettes/PalettesPane.vue
3  demo/palettes/admin/AdminPane.vue
3  demo/scenes/about/ColorNutritionLabel.vue
3  demo/shell/dock/Dock.vue
3  demo/workbenches/extract/ExtractWorkbench.vue
4  demo/color-picker/App.vue
```

`GradientPane.vue:1-15` is byte-for-byte the same skeleton as `GeneratePane.vue:1-26`
including the same dead line — this is copy-paste propagation, not an isolated slip.

The component therefore declares a hard dependency on the `color-session` provide contract
that it does not consume. Move `GeneratePane` under a tree where `App.vue` does not provide
`CSS_COLOR_KEY` and the `!` non-null assertion silently yields `undefined` with no error at
the injection site — a latent trap for exactly the modularization this audit is asked to
propose.

**Why nothing catches it.** `tsconfig.base.json:1-17` sets `strict`,
`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` — but **not** `noUnusedLocals`.
And `eslint.config.js:71` disables the backstop:

```js
"@typescript-eslint/no-unused-vars": "off",
```

with the rationale at `eslint.config.js:11-13` — *"many destructure-and-discard patterns …
would generate >100 churn-only diffs."* That trade bought the epidemic.

**Cure.** Delete the line. Turn on `noUnusedLocals` in `tsconfig.base.json` (it is a
demo-and-lib-wide win, and the >100-diff objection is precisely the debt this finding
measures). The `!`-asserted `inject` idiom should be replaced repo-wide by a
`injectStrict(key)` helper that throws with the key name — but see KISS: only if more than
one site needs it, which the table above shows it does (10 sites).

---

### L-4 · MAJOR — the injection key is imported from the 250-line port factory

`GeneratePane.vue:6`:

```ts
import { LIBRARY_PORT_KEY } from "../../palettes/usePalettePorts";
```

`demo/palettes/usePalettePorts.ts` has **18 import statements** and wires 15 composables —
`useAdminAuth`, `useUserAuth`, `useSession`, `useBrowsePalettes`, `useAdminUsers`,
`useColorNameQueue`, `useSlugMigration`, `usePaletteActions`, `useFilteredList`,
`useAdminAudit`, `useAdminFlagged`, `useAdminTags`, `useVersionHistory`, `useTagEdit`,
`usePaletteStore` — plus `../shell/useViewManager`. The generate feature imports all of it
to obtain **one `Symbol`**.

This also inverts the layer: a leaf feature (`workbenches/generate`) statically depends on
the composition-root module that *provides* to it. The dependency arrow points from the
consumer to the provider's factory, which is the wrong direction — the provider should
depend on the contract, not the other way round.

The repo already ships the correct idiom **one directory over**: `demo/color-session/keys.ts`
is a leaf module that exports nothing but `InjectionKey`s and types, and `GeneratePane.vue:7`
imports `CSS_COLOR_KEY` from it correctly. `demo/palettes/` has no `keys.ts` (directory
listing: 24 entries, none). Five consumers pay the toll:

```
demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue:27
demo/workbenches/mix/MixPane.vue:10
demo/workbenches/mix/MixSourceSelector.vue:6
demo/workbenches/generate/GeneratePane.vue:6
demo/palettes/PalettesPane.vue:134
```

Sub-note **L-4a**: the five sites are also inconsistent about the contract's nullability —
`GeneratePane.vue:11` and `MixPane.vue:16` write `inject(LIBRARY_PORT_KEY)!`,
`GradientVisualizer.vue:30` and `MixSourceSelector.vue:33` write `inject(LIBRARY_PORT_KEY)`
with no assertion. Same key, two contracts.

Sub-note **L-4b**: `GenerateControls.vue:16` imports `PaletteColorStrip` from
`../../palettes/browser/card` — a *sibling feature's* card-internals directory. Feature →
feature, reaching into another feature's presentation subtree. `PaletteColorStrip` is used
by generate, extract, mix and palettes; it is a shared strip primitive living in
`palettes/browser/card/` for historical reasons only.

**Cure.** `demo/palettes/keys.ts` holding the five `InjectionKey` symbols + the five port
types (derived from interfaces, not from `ReturnType<typeof providePalettePorts>` — that
`ReturnType` at `usePalettePorts.ts` is what forces the factory into every consumer's type
graph). `usePalettePorts.ts` imports the keys and provides. Consumers import keys only.
`PaletteColorStrip` moves to `demo/color-session/color-chips/` beside `PreviewStrip`, which
is where its four consumers already agree it belongs.

---

### L-5 · MAJOR — the pane shell is copy-pasted, and its class is defined by its own child

`GeneratePane.vue:30-31` opens with a two-element shell that is duplicated verbatim across
the pane family:

```html
<div class="relative w-full mx-auto h-full min-w-0">
  <Card tier="resting" class="pane-scroll-fade w-full overflow-y-auto overflow-x-hidden min-w-0 h-full">
```

`grep` counts: the outer wrapper string appears in **5** files
(`generate`, `gradient`, `mix`, `extract`, `scenes/ConfigSliderPane`); the
`pane-scroll-fade w-full …` Card string in **8**; `.pane-scroll-fade` overall in **9**
panes (`+ AboutPane`, `BrowsePane`, `PalettesPane`, `admin/AdminPane`). Nine components
hand-restate the same composition of utility classes. Edict 5 asks for styling at the root
component level; nine per-instance restatements of one shell is the opposite.

Worse is the ownership direction. The class the **Card** carries is defined inside the
**PaneHeader** child's unscoped `<style>` (`PaneHeader.vue:54-57`) — a child module owning
a class applied to its parent and to eight sibling components it never sees. The file's own
comment (`PaneHeader.vue:43-52`) argues the block must be unscoped *"because the class is
applied across siblings of PaneHeader"*, which correctly describes the inversion but treats
it as a constraint rather than the defect. `demo/styles/foundation.css:578` records the
move as deliberate.

The load-bearing consequence: `.pane-scroll-fade`'s CSS exists only if `PaneHeader.vue`'s
style block is in the graph. `demo/scenes/ConfigSliderPane.vue:106` applies
`.pane-scroll-fade` to a plain `<div>` and happens to also import `PaneHeader`
(`ConfigSliderPane.vue:22`) — so it works by coincidence of co-import, not by construction.

**Cure.** L-2's cure subsumes this: `class="card-scroll-host"` is glass-ui's, owned by
glass-ui, and there is no demo class to misplace. If a demo-side shell is still wanted after
that, it is one `PaneShell.vue` in `demo/shared/ui/` owning the wrapper + Card + header
slot — one file, nine call sites reduced to `<PaneShell title="Generate" description="…">`.

---

### L-6 · MAJOR — the three verbs have two homes; two live controls share one accessible name

Regenerate / Save / Copy exist twice on the `/#/generate` route:

- in the plate, `GenerateControls.vue` — real `<Button>`s, direct handlers;
- in the dock, `usePaneRouter.ts:181-186` — a `DockAction[]` whose handlers reach back
  through `paneRefs.generate.value?.regenerate?.()`.

Two mechanisms, one concept, no shared definition — the titles, descriptions, icons and
`aria-label`s are independently authored in the two places. Measured collision on the live
route (`probe-structure.mjs`):

```json
"duplicateAccessibleNames": ["Save palette", "Color count"]
```

Playwright's own strict-mode resolver states it plainly — my first probe run failed with:

```
locator.click: Error: strict mode violation: locator('button[aria-label="Save palette"]')
resolved to 2 elements:
  1) …aria-label="Save palette" class="action-button-wrapper…"    (dock)
  2) …aria-label="Save palette" data-slot="button" data-icon-only="true"…  (plate)
```

A screen-reader user hears "Save palette, button" twice with no way to tell them apart;
an automation author cannot address either without a structural selector. The visual audit
independently counts 5 small tap targets on `/#/generate` in all four matrices
(`REPORT.md:38,53,68,83`) and 0 page errors / 0 overflow — so the route is otherwise clean
and this is the standout structural defect the a11y surface exposes.

**Cure.** One definition. The feature session (see L-1's cure) exports its verb list —
`{ key, title, description, icon, handler }[]` — and both the dock and the plate render
*that*. The dock stops needing a component ref at all, which kills L-7.

---

### L-7 · MAJOR — an `any`-typed imperative ref bridge with two layers of masking optional-call

`usePaneRouter.ts:103-107`:

```ts
export interface PaneActionRefs {
    generate: Ref<any>;
    gradient: Ref<any>;
    mix: Ref<any>;
}
```

The shell's contract with this component is `any`. There is no typed surface between the
router and the pane at all — `defineExpose` on the pane side and `Ref<any>` on the shell
side means the three exposed verb names are validated by nothing.

Then the call is optional-chained **twice**, once on each side of the boundary:

- shell: `handler: () => paneRefs.generate.value?.regenerate?.()` (`usePaneRouter.ts:183`)
- pane:  `regenerate: () => controlsRef.value?.regenerate?.()` (`GeneratePane.vue:23`)

The `?.` after the member access is a masking fallback in the edict-2 sense: if the exposed
name is ever renamed or the child fails to mount, the dock button becomes a silent no-op —
no throw, no console, nothing for a gate to catch. The inner `?.` is doubly gratuitous:
`controlsRef` is typed `InstanceType<typeof GenerateControls>` (`GeneratePane.vue:12`), so
`regenerate` is a *statically known non-optional* member; the `?.()` defends against a
case the type system has already excluded, which is how the pattern spread.

And the whole bridge is pure re-export: `GeneratePane.vue:22-26` forwards three names from
`GenerateControls`'s `defineExpose({ regenerate, save, copyColors })`
(`GenerateControls.vue:120`) to the router, adding nothing.

**Cure.** L-6's cure deletes the bridge. If an imperative handle survives at all, type it —
`Ref<InstanceType<typeof GeneratePane> | null>` — and drop every `?.` after the ref's own
null-guard.

---

### L-8 · MAJOR — `demo/ui/` is a 19-file re-export alias over the design system, and it is a live dual path

Every directory under `demo/ui/` is a one-line barrel that re-exports glass-ui:

```
demo/ui/alert/      lines=11 glassrefs=2
demo/ui/avatar/     lines=1  glassrefs=1
demo/ui/badge/      lines=1  glassrefs=1
… (19 total, 18 of them exactly 1 line)
demo/ui/card/index.ts:1:
  export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@mkbabb/glass-ui";
```

That is an alias layer with no encapsulation, no adaptation, no default props — precisely
the shape edict 2 forbids and edict 3 calls contrivance. It survives from the pre-glass-ui
shadcn-vue era, where `demo/ui/*` held real component source.

It is not merely inert, it is a **dual path**, and the proof is inside this component's own
feature. `GenerateControls.vue` reaches glass-ui through *both* routes in one file:

```ts
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";  // barrel
import { Slider } from "../../ui/slider";                                                        // barrel
import { Button } from "../../ui/button";                                                        // barrel
import { Badge } from "../../ui/badge";                                                          // barrel
import { writeClipboard } from "@mkbabb/glass-ui";                                               // bare
import { WatercolorDot } from "@mkbabb/glass-ui/watercolor-dot";                                 // bare subpath
```

`GeneratePane.vue:3` takes the barrel route for `Card`. Two spellings for the same package,
in the same feature, three lines apart. The barrel route also defeats glass-ui's subpath
tree-shaking: `../../ui/card` pulls the package root barrel, whereas
`@mkbabb/glass-ui/card` is a declared export key (74 keys in glass-ui 7.0.0's `exports`).

Adjacent, same mechanism: `demo/shared/utils.ts:4-6` defines `cn()` (clsx + twMerge) while
glass-ui exports `cn` at `node_modules/@mkbabb/glass-ui/dist/index.d.ts:41`. Second
implementation, same concept.

**Cure.** Delete `demo/ui/` entirely (12 files import its barrels). Import
`@mkbabb/glass-ui/<subpath>` at the call site. The design system is the design system.

---

### L-9 · MINOR — `tsconfig.demo.json`'s value.js `paths` block is drifted, partly dead, and its own comment is false

`tsconfig.demo.json` declares 8 `paths` keys for the library. `package.json#exports`
declares 7, and **none of them is `.`**. Cross-tabulated:

| `paths` key | in `exports`? | target exists? |
|---|---|---|
| `@mkbabb/value.js` → `./dist/index.d.ts` | **no** — there is no `.` export | **no** — `ls dist/index.d.ts` → *No such file or directory* |
| `@mkbabb/value.js/parsing` | **no** | **no** — `src/subpaths/` has no `parsing.ts` |
| `@mkbabb/value.js/units` | **no** | **no** — `src/subpaths/` has no `units.ts` |
| `/color`, `/math`, `/easing`, `/transform`, `/quantize` | yes | yes |
| `/css` | yes — **and actually imported** by this component's graph | **absent from `paths`** |
| `/value` | yes | **absent from `paths`** |

Three dead keys, two real keys missing. The file's own comment asserts the block
*"Mirrors the `vite.config.ts` runtime self-alias generated from the same map"* and calls
it *"the CLOSED 8-key set"*. `vite.config.ts:52-61` genuinely generates its aliases from
`package.json#exports` — 7 anchored regexes, no `.`. The `paths` block is hand-maintained
and has drifted away from the thing it claims to mirror.

The one saving grace, established by `--traceResolution` above: `/css` resolves correctly
**despite** having no `paths` entry, via package self-reference through the real `exports`
map. Which is the finding's sharpest edge — **the entire value.js `paths` block is inert
scaffolding.** TypeScript already honours the published surface without it, and the block's
only live effect is to shadow that correct resolution with three broken targets.

**Cure.** Delete the seven value.js `paths` entries. Self-reference is the correct,
drift-proof mechanism and it is already working. That also makes the tsconfig honest by
construction: adding an export key needs no second edit.

---

### L-10 · MINOR — `palettes/export.ts` vs `palettes/export/`: the tested implementation is not the shipped one

Named in the brief as a historical suspect; it is still live and the situation is worse
than "two implementations."

- `demo/palettes/export.ts` — 132 lines, self-contained `exportAsJSON` /
  `exportAsCSSCustomProperties` / `exportAsTailwindConfig` / `exportAsSVG` / `exportAsPNG`
  / `downloadExport`, with its own private `slugify`.
- `demo/palettes/export/` — 12 modules: `serializers.ts`, `canonical.ts`, `rfc8785.ts`,
  `digest.ts`, `bytes.ts`, `json.ts`, `css.ts`, `tailwind.ts`, `svg.ts`, `png.ts`,
  `reload.ts`, `types.ts`. No `index.ts`.

`demo/palettes/usePaletteExport.ts:2-9` imports `from "./export"`. With
`moduleResolution: bundler` that resolves to **`export.ts`**, the 132-line file. The
12-module tree has exactly one reachable entry point in the whole repo:

```
demo/test/export/byte-exact.test.ts:23:} from "../../palettes/export/serializers";
```

So the byte-exact serializer suite — canonical JSON, RFC-8785, digests — certifies a
module tree that **no shipping code path executes**, while the code users actually reach
(`BrowsePane.vue:198`, `PalettesPane.vue:152` → `usePaletteExport` → `export.ts`) is the
untested one. A green test suite proving a property of dead code is worse than no suite:
it reads as coverage.

Out of GeneratePane's direct graph — recorded because it lives in the same `palettes/`
domain GeneratePane depends on (L-4) and because the brief named it. Cure: delete
`export.ts`, add `demo/palettes/export/index.ts` re-exporting `serializers.ts`, repoint
`usePaletteExport`, re-run the byte-exact suite against the live path.

---

### L-11 · MINOR — non-idiomatic Vue 3.5 template ref

`GeneratePane.vue:12`:

```ts
const controlsRef = ref<InstanceType<typeof GenerateControls> | null>(null);
```

Edict 7 names `useTemplateRef` as the idiom. Vue 3.5's `useTemplateRef("controlsRef")`
infers the instance type from the template binding, removing the hand-written
`InstanceType<typeof …> | null` annotation. `GradientPane.vue:9` carries the identical
non-idiomatic line — same copy-paste vector as L-3. (Moot if L-6/L-7's cure removes the ref
entirely; recorded because the pattern is repo-wide.)

---

### L-12 · INFO — generation is demo-owned while extraction is library-owned: the same concept, two homes

The generate and extract workbenches are siblings of identical shape — take parameters,
produce an array of CSS colors, offer them for save. Their cores live on opposite sides of
the library boundary:

| workbench | core | home |
|---|---|---|
| extract | `quantizePixels`, `dominantColor` | **`src/quantize.ts`**, published as `@mkbabb/value.js/quantize` |
| generate | `generatePalette`, `generateSingleColor`, `GENERATION_PRESETS`, `HARMONY_DEFS` | `demo/color-session/generate-color.ts` (243 lines) |

`generate-color.ts` is pure, deterministic, seeded, Vue-free, and its only imports are
`@mkbabb/value.js/color`, `@mkbabb/value.js/css` and a local `mulberry32`. It is library
code sitting in the demo. `demo/color-session/prng.ts` (mulberry32) likewise has no library
home although `@mkbabb/value.js/math` is the obvious one — the subpath already carries
`clamp`/`scale`/`lerp`/`deCasteljau` and is described as *"pure numeric math … parse-that-FREE."*

The file's header (`generate-color.ts:1-22`) explains its current home as a cycle break:
`demo/color-session/useColorParsing.ts:3,120` needs `generateSingleColor`, and while the
math lived in the feature that was a shared-layer → feature edge. True, and the move fixed
it — but it fixed a demo-internal cycle by relocating library-grade code *sideways within
the demo* rather than *down into the library*, where the cycle cannot exist at all.

`package.json` also has **no `.` root export** — 7 subpaths, no barrel. That is a
deliberate, good posture (`vite.config.ts:181-183`: *"The seven literal package
capabilities are the complete library graph; there is no root or compatibility entry"*), but
`demo/shared/utils.ts:9-19` records the cost: `debounce` was stranded with *"no rightful
subpath home"* and got copied into the demo. `generatePalette` is not stranded — `./color`
is exactly its home. Hypothesis, not a reproduction: I did not build a variant to prove the
move is clean, though the import graph shows no obstacle.

---

## The greenfield lattice

Stated concretely, no hedging. Layers strictly downward-depending.

```
┌ LIBRARY  @mkbabb/value.js  (published, subpath-only, Vue-free)
│   ./color    … + generatePalette / generateSingleColor / GENERATION_PRESETS / HARMONY_DEFS   ← from L-12
│   ./css      serializeCssColor, parseCssColor
│   ./math     … + mulberry32                                                                  ← from L-12
│   ./quantize quantizePixels, dominantColor        (already correct)
│
├ DESIGN SYSTEM  @mkbabb/glass-ui  (published, subpath-only)
│   ./card      Card, CardHeader{shrink}, CardTitle, CardDescription, CardContent
│   ./button ./select ./slider ./badge ./watercolor-dot …
│   ./dom       writeClipboard, cn
│   ← the ONLY source of visual primitives. demo/ui/ does not exist. (L-2, L-8)
│
├ demo/color-session/     the color spine
│   keys.ts               InjectionKey leaves only          (already correct — the model)
│   color-chips/          PreviewStrip, PaletteColorStrip   ← PaletteColorStrip lands here (L-4b)
│   useColorPipeline.ts, useColorParsing.ts  → import generatePalette from the LIBRARY
│
├ demo/palettes/          the library domain
│   keys.ts               ← NEW: 5 InjectionKeys + 5 port interfaces   (L-4)
│   ports.ts              providePalettePorts, imports keys.ts
│   store.ts, actions.ts, browse.ts, admin.ts
│   export/               ONE serializer tree, with index.ts           (L-10)
│
├ demo/shared/ui/
│   PaneShell.vue         wrapper + <Card class="card-scroll-host"> + <CardHeader shrink>
│                         ← the 9-fold shell, once                     (L-2, L-5)
│   EmptyState.vue
│
└ demo/workbenches/generate/
    useGenerateSession.ts ← preset/harmony/count/seed/palette/name + save() + the verb list
    GenerateControls.vue  ← renders session state + session.actions
    GeneratePane.vue      ← <PaneShell title="Generate" description="…"><GenerateControls/></PaneShell>
```

`GeneratePane.vue` under this lattice is roughly 8 lines with **zero** script block: no
inject, no port import, no `PaletteColor` type, no `defineExpose`, no template ref. The dock
reads `useGenerateSession().actions` through the view registry rather than through
`Ref<any>` (L-6, L-7). The name reaches `createPalette` because the ref that holds it and
the function that saves it are in the same module (L-1).

Four edges disappear entirely from the component's import graph: `ui/card`,
`palettes/usePalettePorts`, `color-session/keys`, `palettes/types`.

## Defect family map

| family | mechanism | findings |
|---|---|---|
| A — responsibility in the wrong module | a shell given work it lacks the information to do | **L-1**, L-4, L-7 |
| B — design-system code living in the demo | a better variant landed downstream instead of upstream | **L-2**, L-5, L-8 |
| C — copy-paste propagation across sibling panes | no shared shell, so every pane restates the skeleton | L-3, L-5, L-11 |
| D — dual paths kept alive | the second implementation was never deleted | L-8, **L-10**, L-2 |
| E — declaration/reality drift | hand-maintained mirrors of generated truth | L-9, L-12 |

Families A and B are the load-bearing ones: A produces the only user-visible failure, B
produces the largest quantity of unnecessary code (224 + ~120 lines of header logic, 19
barrel files, 132 lines of superseded export code).

## What is sound

Stated as positive evidence, not as absence of finding:

- **The published-surface contract holds.** Every value.js import in this graph is a real
  `package.json#exports` key, verified by `tsc --traceResolution` to resolve through the
  exports map. No `@src/*`, no deep path, no `src/` internal. A real npm consumer could
  write these imports verbatim. `tsconfig.demo.json`'s comment about the T.W1 dogfood
  keystone is, on the substance, true.
- **`verbatimModuleSyntax` is honoured** — `GeneratePane.vue:8` and every type import in
  `GenerateControls.vue`, `useColorGeneration.ts` and `generate-color.ts` use
  `import type`. Zero violations in the graph.
- **The feature → shared direction is correct** where it matters: `useColorGeneration.ts`
  imports *down* into `color-session/generate-color`, never sideways into another feature's
  composable.
- **The route renders clean.** Visual audit `REPORT.md:124,139,154,169`: `/#/generate` in
  all four Safari matrices shows 0 page errors, 0 console errors, 0 horizontal overflow,
  exactly 1 `<main>`, `darkClassMissing` 0, settle 3417–3553 ms. The one console error in
  the whole matrix (`REPORT.md:24`) is a WebGL context loss on `/#/`, not this route. The
  screenshot renders the plate, strip, swatches, seed note, both selects and the ramp slider
  correctly in both schemes.
- **`generatePalette` is genuinely pure and seed-exact**, which is what lets
  `GenerateControls.vue:100-106` render truthful per-option preview strips. The comment at
  `GenerateControls.vue:93-99` claims the previews are byte-identical to the future
  selection; the implementation (`mulberry32(seed)`, same `count`/`preset`/`harmony`) makes
  the claim structurally true, not aspirational.

## Reproduction artifacts

- `probe-generate-name.mjs` — L-1. Navigate `/#/generate`, clear `localStorage`, fill
  `input[aria-label="Palette name"]`, click the plate's Save, read
  `localStorage["color-palettes"]`. Output pasted under L-1.
- `probe-structure.mjs` — L-2, L-6. Counts `.card-scroll-host` / `.card-header--shrink` /
  `.pane-scroll-fade` elements, checks the corresponding rules are present in
  `document.styleSheets`, and collects duplicate `aria-label` values. Output pasted under
  L-2 and L-6.

Both are in the session scratchpad at
`/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/`;
they are self-contained and re-runnable against a dev server on :9000 with the repo's own
`playwright` dependency.

## Verdict

**DEFECTIVE.** One BLOCKER with a live reproduction (L-1 — user-typed palette names are
destroyed at the pane/controls boundary), six MAJORs, four MINORs, one INFO. The library
boundary *proper* — the `@mkbabb/value.js` published surface — is the one part of this
graph that is structurally sound; the defects are all in the demo's own module lattice and
in its relationship to glass-ui.
