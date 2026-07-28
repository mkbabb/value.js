# CHALLENGE-L — library structure · `demo/workbenches/extract/ExtractControls.vue`

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context Opus 5
seat, spawned with an explicit Opus 5 declaration. The seat is declared, not inherited.

## Subject + pin verification

```
$ git rev-parse HEAD
32b4040e52d45cb331306dc60196de6c0fe71b17
$ git branch --show-current
tranche-u
$ shasum -a 256 demo/workbenches/extract/ExtractControls.vue
71aa0a65873c367ae3ae393283d4e81bcfc9cbb57b6f232eec9f930264d46c28
$ wc -l demo/workbenches/extract/ExtractControls.vue
     151
```

**Pin VERIFIED** — SHA-256 matches the BJ W4 hold value exactly. Consumer edits FORBIDDEN
until Glass 8; the blocked wave is authored in §5 with its exact release condition.

**HEAD discrepancy (recorded, not a finding against the component):** the seat brief names
HEAD `c654824e`; the working tree is at `32b4040e`. `c654824e` is its parent-of-parent-ish
ancestor in this branch's log. The subject file hashes identically to the pin at `32b4040e`,
so the audit is valid at the pinned content regardless.

## 0. Verdict

**DEFECTIVE.** Ten findings. The strongest is not inside the 151 lines — it is that this
component is the second consumer of a *contrived duplicate* of a capability glass-ui already
ships, reached through a *third* indirection layer (`demo/ui/`) that contains zero
implementation, and that the split of one visual concept across two modules has already
produced a provably dead code branch. The component itself is small, correctly layered
(feature → shared, never feature → shell), and imports nothing from `src/` internals.

---

## 1. What it imports, and whether it should

Full import list, `ExtractControls.vue:96-101`:

| line | specifier | resolves to | direction | verdict |
|---|---|---|---|---|
| 96 | `vue` | framework | — | OK |
| 97 | `@lucide/vue` | devDep icon pkg | — | OK |
| 98 | `@mkbabb/glass-ui/dock` | producer **subpath** | feature → design system | OK |
| 99 | `../../ui/slider` | **demo barrel** → `@mkbabb/glass-ui` root | feature → local shim → design system | **L-1** |
| 100 | `../../color-session/useContrastSafeColor` | demo shared color spine | feature → shared | OK |
| 101 | `../../color-session/ink` | demo shared color spine | feature → shared | **L-6** (dup home) |

### Positive proof (the negatives that hold)

- **No boundary crossed the wrong way.** There is no `feature → shell`, no `component → boot`,
  no `demo → src/` edge in this file or in its transitive demo imports. `useContrastSafeColor`
  and `ink` are lower-layer shared modules; the app-root boot module imports *down* into them
  (`demo/color-picker/composables/boot/view-accents.ts:26` imports `../../../color-session/ink`),
  never the reverse.
- **The published surface is honoured.** This component imports nothing from `@mkbabb/value.js`
  at all. Across the whole demo tree the library is reached *only* through published subpaths —
  a real consumer could write every one of them:

  ```
  $ grep -rhn "@mkbabb/value.js[^\"']*" demo/ -o | sed 's/^[0-9]*://' | sort | uniq -c | sort -rn
    25 @mkbabb/value.js/color
    10 @mkbabb/value.js/css
     6 @mkbabb/value.js/math
     5 @mkbabb/value.js/easing
     4 @mkbabb/value.js/quantize
  ```

  Zero deep paths, zero `@src/*`. `tsconfig.demo.json:32-34` records that the demo `@…` aliases
  were killed at W43 and that `@src/*` was dropped from the demo program. **This axis is clean.**
- **`verbatimModuleSyntax` satisfied.** Every one of the six imports is value-position
  (`computed`, three icon components, two components, one composable, one const). No type-only
  import is mis-declared. Edict 8: PASS.
- **Not a god module.** 151 lines, 6 props, 5 emits, 1 computed, 1 composable call.
  Edict 1: PASS at this file.

---

## 2. Findings

### L-1 · MAJOR — two paths to the same package, one line apart; `demo/ui/` is a 19-barrel shim with zero implementation

`ExtractControls.vue:98-99`:

```ts
import { DockControl, DockSeparator } from "@mkbabb/glass-ui/dock";
import { Slider } from "../../ui/slider";
```

`demo/ui/slider/index.ts` is one line:

```ts
export { Slider } from "@mkbabb/glass-ui";
```

The whole directory is that:

```
$ find demo/ui -type f ! -name index.ts | wc -l
       0
```

19 directories, 19 `index.ts` files, **zero** local implementation. `demo/ui/alert/index.ts`
even carries the epitaph in its own header — "This barrel previously held a local shadcn-vue
re-implementation … B.W2 converted it to a re-export … The two consumers import from this
barrel unchanged." That is the definition of a **migration shim kept for consumer convenience**
— edict 2 (no aliases, no dual paths, no back-compat) and edict 3 (KISS, no wrapper layers).

Two aggravations:

1. The barrel pulls from the **root** `@mkbabb/glass-ui` barrel, not the `./slider` subpath
   glass-ui 7.0.0 publishes (`node_modules/@mkbabb/glass-ui/package.json` exports include
   `./slider`). So no consumer of `demo/ui/slider` can ever get subpath-scoped resolution.
2. The dual path is *live*, not theoretical: within this very file line 98 goes direct and
   line 99 goes through the shim. Repo-wide, 6 sites import `Slider` via the barrel while
   `ConsoleRail.vue:91-93`, `useSliderTouchGates.ts:15`, `ConfigSliderPane.vue:20-23` import
   other glass-ui primitives direct. One concept, two conventions.

**Cure:** delete `demo/ui/**` (19 files). Every consumer imports the glass-ui subpath directly
(`@mkbabb/glass-ui/slider`). Mechanical, 6 call sites for Slider, ~40 repo-wide.
*This touches the pinned file (line 99) — blocked, see §5.*

---

### L-2 · MAJOR — the "gradient rides the track" concept has two implementations; this component runs the contrived one

Glass-ui **already owns** this. From the shipped stylesheet
(`node_modules/@mkbabb/glass-ui/dist/glass-ui.css`, offset 35003):

```css
.glass-slider[data-variant=spectrum] .slider-track[data-v-4f4cab01]{
  height:calc(var(--slider-thumb-size,1rem) * 1.5);
  background:var(--slider-track-bg,var(--secondary))
}
```

**Path A — one element, producer seam** (`demo/picker/controls/ComponentSliders/ComponentSliders.vue:193-200`):

```ts
const ramp = stops ? `linear-gradient(to right, ${stops.join(", ")})` : undefined;
return { "--slider-track-bg": ramp && component === "alpha" ? `${ramp}, var(--alpha-checker)` : ramp, … };
```

**Path B — two elements, the contrivance** (`ExtractControls.vue:18-34`): set the producer's
own track to `transparent`, then paint the gradient on a hand-rolled absolutely-positioned
sibling that the slider floats over:

```html
<div class="relative flex-1 h-6 flex items-center">
    <div data-o18="extract-k-rail" class="absolute inset-0 rounded-full overflow-hidden h-6"
         :style="{ background: gradient, backgroundColor: trackInk, boxShadow: `inset 0 0 0 1.5px ${trackInk}` }" />
    <Slider … :style="{ '--slider-track-bg': 'transparent' }" />
</div>
```

Path B has a **second live instance**: `demo/workbenches/generate/GenerateControls.vue:292-308`,
whose own comment (line 284-285) says *"the extract k-slider pattern verbatim"*. So the
duplicate is documented as a duplicate and copied anyway.

Path B exists to buy two things Path A can't express today: a **background colour beneath** the
gradient and an **inset ring**. Both are producer concerns — a `trackFill` / `trackRing` prop
pair on the glass-ui Slider. Instead they became a demo-side DOM overlay, which then required a
bespoke e2e oracle anchor (`data-o18="extract-k-rail"`, asserted at
`e2e/smoke/oracles/o18-contrast-census.spec.ts:1133-1134`) — the census has to certify a rail
that would not exist under the correct boundary, while its sibling row
(`extract-kc`, line 1126) certifies the ordinary `.slider-track`. **The test surface itself
records the split.**

Measured, `/#/extract` at rest (WebKit 1440×900):

```
tracks: [ { w:434, h:24, bg:"rgba(0, 0, 0, 0)", bgi:"none" },     ← k slider: producer track blanked
          { w:230, h:24, bg:"oklch(0.545141 0.218024 9.834023)" } ]  ← kC slider: producer track used
```

Two sliders, ten lines apart, two different mechanisms for one visual idea.

---

### L-3 · MAJOR — the `disabled` prop is honoured by 1 of 3 controls; measured MediaStream leak

`ExtractControls.vue` takes a scalar `disabled` (line 109) and applies it to exactly one child:

- line 40-46 `DockControl` (Upload) — **no** `:disabled`
- line 49-55 `DockControl` (Camera) — **no** `:disabled`
- line 83-90 `DockControl` (Reset) — `:disabled="disabled || !hasImage"`

The parent passes `:disabled="session.isProcessing.value || cameraActive"`
(`ExtractWorkbench.vue:70`) — i.e. the parent's *intent* is "the camera is running, stand down",
but the camera button is the one control that ignores it. `ExtractWorkbench.startCamera`
(lines 239-255) then overwrites `cameraStream` without stopping the previous stream:

```ts
cameraStream = await navigator.mediaDevices.getUserMedia({ video: {…} });
```

**Reproduction (run, output pasted).** Headless WebKit against the live dev server, with
`navigator.mediaDevices` stubbed to count calls and `track.stop()`:

```
$ node scratchpad/probe3.mjs
{ "after1": { "gum": 1, "stopped": 0, "disabled": false },
  "after2": { "gum": 2, "stopped": 0 },
  "after3": { "gum": 3, "stopped": 0 } }
```

Three clicks on `button[title="Open camera"]` → **3 `getUserMedia` grants, 0 tracks stopped**.
Two live MediaStreams are orphaned with no reference; the camera hardware stays acquired.
`onBeforeUnmount(stopCamera)` (line 281) releases only the last one, so the leak survives
navigation away from `/#/extract` until the page unloads.

**Mechanism (structural, not a typo):** a boolean named `disabled` is the wrong shape for a
control *cluster*. Three independent capabilities were collapsed into one scalar, and two of
them silently dropped it.

**Cure, and it is NOT blocked:** the state that gates the camera (`cameraActive`, `cameraStream`)
lives in `ExtractWorkbench.vue`, which is **not** the pinned file. Guarding
`startCamera` with `stopCamera()` (or an early return when `cameraActive`) at
`ExtractWorkbench.vue:239` fixes the leak with zero edits to the pinned consumer. The deeper
cure — moving the camera control to the module that owns the stream, or replacing the scalar
with `{ canUpload, canCamera, canReset }` — does touch the pin.

---

### L-4 · MAJOR — one visual concept owned by two modules; the split produced a provably dead branch

`useExtractSession.ts:101-112` owns the k-rail gradient *including its empty degenerate*:

```ts
const kSliderGradient = computed(() => {
    const presented = presentedPalette.value;
    if (!presented.ok || presented.value.length === 0) return "var(--muted)";   // ← line 103
    …
});
```

`ExtractControls.vue:22` owns the rail's *material*, and writes both longhand and shorthand into
one style object:

```html
:style="{ background: gradient, backgroundColor: trackInk, boxShadow: `inset 0 0 0 1.5px ${trackInk}` }"
```

`background:` is a shorthand — it resets `background-color`. `backgroundColor:` follows it in
the object and wins. Therefore when `gradient === "var(--muted)"` (empty palette, the *entire*
purpose of that branch) the value is overwritten before it ever paints. Measured live at rest:

```
rail: { bgColor: "oklch(0.545141 0.218024 9.834023)",   ← trackInk, not --muted
        bgImage: "none",                                 ← the degenerate contributed nothing
        boxShadow: "oklch(0.545141 0.218024 9.834023) 0px 0px 0px 1.5px inset" }
```

and visible in the audit screenshot
(`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/extract.png`) — the k rail
is solid crimson on an image-less plate, never the muted grey the session module thinks it is
returning.

`ExtractControls.vue:103` is a **masking fallback that cannot fire** — edict 2. It is not a
typo; it is the direct consequence of two modules each believing they decide what the rail
paints. One home per concept: the session should hand down a single rail descriptor
(`{ fill, ink }`) or the component should own the whole thing. Not half each.

---

### L-5 · MAJOR — glass-ui `DockControl` has no labeling contract; this route is the worst nameless-button row in the whole audit

`node_modules/@mkbabb/glass-ui/dist/components/dock/DockControl.vue.d.ts` — the full prop set is
`shape | compact | active | type | disabled | as | asChild | class`. **There is no `label`, no
`aria-label`, and the doc-block never mentions accessible naming** for an icon-only control.
Labeling is left to attribute fallthrough, so the consumer picks a convention. This one picked
`title` (lines 41, 51, 86).

The visual audit measures the result. `REPORT.json`, `safari-desktop-light /#/extract`:

```json
"a11y": { "namelessButtons": 3, … }
```

3 in **all four** matrices (desktop/mobile × light/dark; `REPORT.md:98-112`) — the highest
non-`/#/blob` count on any route. Strict-name probe, live:

```
STRICT NAMELESS: [
 { "n":"", "title":"Upload image", "w":40,"h":40, "html":"<button … class=\"dock-icon-button …\" title=\"Upload image\"" },
 { "n":"", "title":"Open camera",  "w":40,"h":40, … },
 { "n":"", "title":"Reset",        "w":40,"h":40, … "disabled=\"\" aria-disabled=\"true\"" } ]
```

Exactly this component's three controls. Meanwhile the *same demo* labels the *same primitive*
the other way — `demo/shell/dock/Dock.vue:143-154` and `demo/shell/dock/layers/SlugEditLayer.vue:94-114`
all use `aria-label`. Repo split: 8 `aria-label` call sites (all under `demo/shell/`) vs 11
`title` call sites (all under `demo/workbenches/`). The convention boundary follows the *feature
tree*, which is exactly what an absent producer contract looks like.

**Cure is producer-side and belongs in Glass 8:** `DockControl` should require `label: string`
when `shape="icon"` (stamped as `aria-label`), making an unnamed icon button a *type error*.
That fixes 11 demo call sites at once and cannot regress.

---

### L-6 · MAJOR — `GRAPHICS_CONTRAST_FLOOR` has two homes, in the same directory

```
$ grep -rn "GRAPHICS_CONTRAST_FLOOR" demo/ src/
demo/workbenches/extract/ExtractControls.vue:101:import { GRAPHICS_CONTRAST_FLOOR } from "../../color-session/ink";
demo/workbenches/extract/ExtractControls.vue:124:    cssColor ? safeCss(cssColor, GRAPHICS_CONTRAST_FLOOR) : "var(--ink-muted)",
demo/color-session/view-accent.ts:13:export const GRAPHICS_CONTRAST_FLOOR = 3;
demo/color-session/ink.ts:16:export const GRAPHICS_CONTRAST_FLOOR = 3;
```

Two `export const … = 3` declarations, same name, same value, same directory, neither
re-exporting the other. `ExtractControls.vue:101` picks one arbitrarily; `view-accent.ts:41`
uses the other for `minimumRatio`. Unique semantic ownership is the invariant and it is broken.

Worse: **this constant does not belong in the demo at all.** Both files import
`safeAccentColor` from `@mkbabb/value.js/color` and pass it a `minimumRatio`. The WCAG 1.4.11
graphics floor (3) and the 1.4.3 text floor (4.5) are properties of the *contrast primitive*,
not of this application. They belong beside `safeAccentColor` in
`@mkbabb/value.js/color`, exported once, consumed twice.

---

### L-7 · MINOR — dead scoped CSS in the subject file

`ExtractControls.vue:139-142`:

```css
/* Touch gate styling for extract sliders */
.touch-gate-target { border-radius: var(--radius-pill); }
```

`touch-gate-target` appears **nowhere in this component's template** (grep of the file: the only
hit is the rule itself, line 140). Vue compiles scoped rules to `.touch-gate-target[data-v-…]`,
so it cannot reach the `Slider` child's internals either. The class's real owners are
`ComponentSliders.vue:58` and `SpectrumCanvas.vue:11` — and `ComponentSliders.vue:245` documents
that *its* block is "intentionally UNSCOPED" precisely because a scoped rule would not work.
This is a copy of that idiom that never landed its class. Dead bytes, plus a comment that lies
about what the file does.

---

### L-8 · MINOR — `tsconfig.demo.json` `paths` has desynchronised from `package.json#exports`

`package.json` exports, 7 keys, **no root**: `./color ./value ./css ./easing ./math ./transform ./quantize`.

`tsconfig.demo.json:42-49` lists 8 entries, and the comment above them (line 40) claims
*"the `exports` map is a CLOSED 8-key set"*:

| tsconfig entry | in exports map? | target exists? |
|---|---|---|
| `@mkbabb/value.js` → `./dist/index.d.ts` | **no** (no `.` key) | **no** (`ls dist/*.d.ts` → no matches) |
| `/color`, `/math`, `/easing`, `/transform`, `/quantize` | yes | yes |
| `/parsing` → `dist/subpaths/parsing.d.ts` | **no** | **no** |
| `/units` → `dist/subpaths/units.d.ts` | **no** | **no** |
| `/css` | **yes — and 10 demo files import it** | absent from `paths` |
| `/value` | yes | absent from `paths` |

**Falsified sub-hypothesis, recorded honestly:** I expected `/css` (the subpath
`demo/color-session/ink.ts:9-12` uses, i.e. the module this component's `trackInk` depends on)
to fall through to the installed registry tarball, giving split TS-vs-runtime resolution.
It does not — traced:

```
$ npx tsc -p tsconfig.demo.json --noEmit --traceResolution | grep -A3 "value.js/css"
======== Module name '@mkbabb/value.js/css' was successfully resolved to
         '/Users/mkbabb/Programming/value.js/dist/subpaths/css.d.ts'
         with Package ID '@mkbabb/value.js/dist/subpaths/css.d.ts@4.0.0'. ========
```

Self-package `exports` resolution catches it. So this is **not a live break** — it is a
*config block that no longer proves anything*: three dead entries, two live specifiers absent,
and a comment asserting a key count that is wrong. Meanwhile `vite.config.ts:37-50` **generates**
its alias set from the exports map precisely so it "can never drift". Two configs describing one
truth, one generated and one hand-maintained and already drifted. The hand-maintained one should
be generated from the same source, or deleted (self-`exports` resolution already works).

---

### L-9 · MINOR — the dogfood alias silently substitutes the working tree into glass-ui's and keyframes' own dependency; the comment justifying it is false

`vite.config.ts:25`: *"A package does not install itself, so these exact aliases point the seven
public specifiers at this checkout's freshly-built published surface."*

It does install itself here — transitively:

```
$ grep -n "@mkbabb/value.js" package-lock.json | sed -n '4,6p'
1330:                "@mkbabb/value.js": "4.0.0"          ← @mkbabb/keyframes.js hard-pins it
1336:        "node_modules/@mkbabb/value.js": {
1338:            "resolved": "https://registry.npmjs.org/@mkbabb/value.js/-/value.js-4.0.0.tgz",
$ ls node_modules/@mkbabb/
glass-ui  keyframes.js  value.js
```

glass-ui 7.0.0 peer-depends `@mkbabb/value.js: ^4.0.0`; keyframes.js 6 hard-depends `4.0.0`.
Both ship internal imports of the bare specifiers:

```
glass-ui  : 7 × /color, 4 × /css, 2 × /easing
keyframes : 5 × /color, 28 × /css, 4 × /easing, 2 × /math, 1 × /transform, 3 × /value
```

The Vite alias is repo-wide and anchored on those exact specifiers, so **glass-ui's and
keyframes' own 56 internal value.js imports are rewritten to this checkout's `dist/` too**.
The demo therefore runs glass-ui 7.0.0 against an unreleased value.js. That is a defensible
dogfood *choice* — but it is undocumented, and the sentence that does document the alias is
factually wrong at HEAD, which means nobody reading it knows the substitution is happening.
Directly relevant to this component: `Slider`'s spectrum track and `DockControl`'s glass
recipes are downstream of glass-ui's `@mkbabb/value.js/color` imports.

---

### L-10 · MINOR — producer geometry below the WCAG target-size floor, surfaced through this component

Measured live on `/#/extract`:

```
thumbs: [ { tag:"SPAN", aria:"Number of colors", w:12, h:24 },
          { tag:"SPAN", aria:"Chroma weight",    w:12, h:24 } ]
```

12 × 24 CSS px against the WCAG 2.5.8 (AA) 24 × 24 minimum. The audit lists both, in all four
matrices, by their `aria-label`s — `REPORT.json` `smallTapTargets` for `safari-desktop-light
/#/extract` contains exactly `{"w":12,"h":24,"tag":"span","label":"Number of colors"}` and
`{"w":12,"h":24,"tag":"span","label":"Chroma weight"}`. The width comes from glass-ui's
`--slider-thumb-size` recipe, not from this consumer — a producer defect made visible here.
Consumer pinned ⇒ Glass 8.

---

## 3. Mechanism families

| family | findings | one sentence |
|---|---|---|
| **Absent producer contract** | L-2, L-5, L-10 | glass-ui owns Slider and DockControl but exposes neither a track-fill seam, nor a required label, nor a compliant hit box — so each consumer invents its own, differently. |
| **Indirection with no content** | L-1, L-8 | `demo/ui/**` (19 barrels, 0 implementations) and `tsconfig.demo.json#paths` (3 dead entries, 2 missing) are layers that restate what a lower layer already states correctly. |
| **Concept with two homes** | L-4, L-6, L-9 | the rail material (session + component), `GRAPHICS_CONTRAST_FLOOR` (`ink.ts` + `view-accent.ts`), and value.js itself (local `dist/` + registry tarball) each have two owners; in every case one of the two is silently overridden. |
| **Wrong-shaped prop** | L-3 | a scalar `disabled` for a three-capability cluster; two capabilities dropped it, and a measured hardware-resource leak followed. |
| **Copy-paste residue** | L-7 | a scoped rule whose class never arrived. |

---

## 4. The greenfield lattice

Stated concretely, no hedging.

```
@mkbabb/value.js/color            ← owns: convertColor, safeAccentColor, mapToGamut,
   │                                      TEXT_CONTRAST_FLOOR = 4.5, GRAPHICS_CONTRAST_FLOOR = 3
   ▼                                      (the floors live beside the primitive that takes them)
@mkbabb/glass-ui/{slider,dock}    ← owns: Slider(trackFill, trackRing, thumb ≥24px),
   │                                      DockControl(label: string  — required for shape="icon")
   ▼
demo/color-session/ink            ← owns: the SURFACE referent (rung tints, live probes,
   │                                      certifyAccentInk). ONE module. `view-accent.ts`
   ▼                                      imports the floors, never re-declares them.
demo/workbenches/extract/
   ├── useExtractSession.ts       ← owns ALL derived visual state, including the k-rail
   │                                 descriptor { fill, ink } with its degenerate. One decider.
   ├── ExtractWorkbench.vue       ← owns the camera stream + eyedropper + result plate
   └── ExtractControls.vue        ← presentation only: props in, events out, zero computed
```

Concretely, five moves:

1. **Delete `demo/ui/**`** (19 files, 0 implementation). Consumers import glass-ui subpaths
   directly — `@mkbabb/glass-ui/slider`, `@mkbabb/glass-ui/card`. One path to the design system,
   everywhere. (L-1)
2. **Glass-ui `Slider` gains `trackFill?: string` + `trackRing?: string`.** The rail `<div>` dies
   at *both* consumers (ExtractControls, GenerateControls); `--slider-track-bg: transparent`
   dies with it; the `data-o18="extract-k-rail"` oracle anchor collapses onto `.slider-track`
   like every other census row. Net: −2 DOM nodes, −1 bespoke test hook, −1 duplicate idiom. (L-2)
3. **Glass-ui `DockControl` gains required `label` for `shape="icon"`** (stamped `aria-label`),
   and lifts thumb/hit geometry to the 24 px floor. Makes an unnamed icon button a compile
   error; retires the `title` ⁄ `aria-label` convention split across `demo/shell` vs
   `demo/workbenches` in one move. (L-5, L-10)
4. **The WCAG floors move down into `@mkbabb/value.js/color`,** next to `safeAccentColor`.
   `ink.ts` and `view-accent.ts` import them; neither declares one. (L-6)
5. **The session owns the rail whole.** `useExtractSession` returns
   `kRail: { fill: string; ink: string }` — one module decides both layers, so the
   shorthand/longhand collision that killed `var(--muted)` is structurally impossible, and
   `ExtractControls` loses its only `computed` and becomes pure presentation. The camera control
   moves next to the stream it owns (or `disabled` becomes
   `{ canUpload; canCamera; canReset }`). (L-3, L-4)

After those five, `ExtractControls.vue` is ~90 lines of template with a `defineProps` /
`defineEmits` pair and **no script logic at all** — which is what a controls strip should be.

---

## 5. The blocked wave (pin `71aa0a65…`, consumer edits FORBIDDEN until Glass 8)

**W-XL-1 — Extract controls · the Glass-8 fold.**

*Scope (all inside the pinned file, therefore blocked):* L-1 (line 99 import), L-2 (lines 18-34
rail div), L-4 (line 22 style object + the session's degenerate), L-5 (lines 41/51/86 `title` →
`label`), L-7 (lines 139-142 dead CSS), and the `disabled`-shape half of L-3 (lines 84, 109).

**Exact release condition — ALL THREE must hold before a single byte of
`demo/workbenches/extract/ExtractControls.vue` changes:**

1. `@mkbabb/glass-ui` published at `>= 8.0.0` **and** the root `package.json` dependency range
   bumped to `^8.0.0`; and
2. that release's `Slider` type surface exposes `trackFill?: string` and `trackRing?: string`
   (verifiable at `node_modules/@mkbabb/glass-ui/dist/components/slider/types.d.ts`), and its
   `DockControl` type surface makes `label: string` **required** for `shape="icon"`
   (verifiable at `.../components/dock/DockControl.vue.d.ts`), and the shipped thumb hit box
   measures `>= 24 × 24` CSS px; and
3. the BJ W4 hold is released by the glass-ui owner, with the new pin hash recorded.

**Not blocked, may land independently of Glass 8** (different file, not pinned):

- **L-3 stream leak** — `ExtractWorkbench.vue:239` `startCamera` must release the prior stream
  (`stopCamera()` / early-return when `cameraActive`). Measured 3 grants / 0 stops today.
- **L-6 duplicate constant** — collapse `GRAPHICS_CONTRAST_FLOOR` to one home
  (`demo/color-session/ink.ts:16` **or** the library); `view-accent.ts:13` imports it. The pinned
  file's *import specifier* is unchanged if `ink.ts` stays the home — so this is fully clear of
  the pin.
- **L-8 tsconfig drift** — generate `tsconfig.demo.json#paths` from `package.json#exports`, or
  delete the block (self-`exports` resolution already carries it, traced above).
- **L-9 alias documentation** — correct `vite.config.ts:25`; state that value.js *is* installed
  transitively and that the alias deliberately overrides it for glass-ui and keyframes too.

**No source edits land from this formation.** Everything above is authored, not applied.

---

## 6. Commands and probes run

```
git rev-parse HEAD ; git branch --show-current ; shasum -a 256 <subject>
find demo/ui -type f ! -name index.ts | wc -l                       → 0
grep -rn "GRAPHICS_CONTRAST_FLOOR" demo/ src/                       → 2 declarations
grep -rn "slider-track-bg" demo/ src/                               → 2 idioms, 6 sites
grep -rho "@mkbabb/value\.js[a-z/]*" node_modules/@mkbabb/{glass-ui,keyframes.js}/dist/
npx tsc -p tsconfig.demo.json --noEmit --traceResolution | grep "value.js/css"
node scratchpad/probe.mjs    (WebKit) → rail computed style, thumb geometry, track styles
node scratchpad/probe2.mjs   (WebKit) → strict accessible-name sweep of all 15 buttons
node scratchpad/probe3.mjs   (WebKit) → getUserMedia call/stop counter, 3 clicks
```

Read: `REPORT.md`, `REPORT.json` (extract rows, all four matrices),
`shots/safari-desktop-light/extract.png`.
