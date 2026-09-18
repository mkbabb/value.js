# CHALLENGE-C — `demo/scenes/about/AboutPane.vue` — implementation defect hunt

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, the tier
declared at spawn. The seat is NOT undeclared and NOT inherited.

---

## Verdict

**DEFECTIVE.** Fourteen findings; one BLOCKER, three MAJOR. The component is 100 lines and
carries no rAF loop, no listeners, no observers, no WebGL, no `ValueUnit` wrapping and no reka
slider — the classic local hazards are genuinely absent (see §Negative proofs). Its defects are
elsewhere: an **unguarded dynamic import whose rejection destroys the entire application**, a
**hand-maintained space table that has silently drifted 7 spaces behind the domain type**, a
**masking `?? rgb` fallback that renders factually false information**, and a **test surface that
only ever exercises one of eighteen color spaces**, which is exactly why the drift landed.

Strongest defect: **C-1**.

---

## Subject + substrate

| item | value |
|---|---|
| file | `/Users/mkbabb/Programming/value.js/demo/scenes/about/AboutPane.vue` (99 lines) |
| host | `demo/shell/usePaneRouter.ts:69` (async), props at `:146-152` |
| children | `ColorNutritionLabel.vue`, `markdown/Markdown.vue`, `color-session/ColorSpaceSelector.vue` |
| repo | branch `tranche-u`, HEAD at audit time `f36f780c` (task cited `c654824e`; the file is byte-identical, `Jul 17 14:48`) |
| live | `http://localhost:9000`, Chromium 1440×1000, `playwright` driven headless |

Probe scripts (reproducible, read-only):
`/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/about-probe{,2,3,4,5,6,7}.mjs`

---

## C-1 — BLOCKER — one failed markdown fetch destroys the entire application

`AboutPane.vue:82-93` hands `Markdown` a thunk; `Markdown.vue:58-62` awaits it with **no
`try`/`catch`**, from an **async lifecycle hook** (`Markdown.vue:69-71`):

```ts
// Markdown.vue:58
const loadDocs = async () => {
    isLoading.value = true;
    currentDoc.value = await module();   // ← no guard
    isLoading.value = false;
};
onMounted(async () => { await loadDocs(); });
```

Vue invokes lifecycle hooks through `callWithAsyncErrorHandling`, so the rejected promise is
**routed into the component error chain**, not left as a bare unhandled rejection. The nearest
`onErrorCaptured` is `ErrorBoundary.vue:59`, and that boundary wraps **the whole two-pane grid**
(`demo/color-picker/App.vue:50` … `:140`) — not the pane.

### Reproduction (measured)

`about-probe3.mjs` / `about-probe4.mjs` — abort exactly one request, `assets/docs/lab.md`:

```
B2: {
 "boundaryPresent": true,
 "boundaryText": "This panel hit an unexpected error. Failed to fetch dynamically imported
                  module: http://localhost:9000/@fs/.../assets/docs/lab.md?import Try again",
 "role": "alert",
 "pickerPresent": false,      ← the COLOR PICKER is gone
 "aboutPresent": false,       ← the About pane is gone
 "canvases": 1
}
```

Screenshot: `scratchpad/about-chunkfail.png` — the entire product is a warm gradient and a lone
"Try again" pill. A transient CDN blip, a stale deploy hash, or an offline moment on **one prose
document** takes down the color picker.

The insult: `Markdown.vue:19-31` already **ships the designed failure state** for this —
`Alert` / "Oh snap…" / "We couldn't find the documentation for the selected color space." It is
unreachable on this path (and on the C-2 path too — see below). The component owns a correct
empty state and never routes to it.

**Cure (gestalt, not patch).** The doc load is a *resource*, so state it as one instead of as an
imperative side effect: replace the `onMounted`+`ref` pair with the module as a first-class
reactive resource — `watchEffect` on the `module` prop into a `{ status: "loading" | "ready" |
"failed" }` discriminated union, `failed` rendering the Alert that already exists. That kills
C-1, C-2's dead error path and C-6's key dependence in one move, because the doc's lifecycle
stops being a mount event and becomes a function of its input.

---

## C-2 — MAJOR — 7 of the 18 selectable color spaces render a headline with no body

`AboutPane.vue:79` declares a **hand-maintained** union of 11 spaces:

```ts
type MarkdownSpace = "rgb" | "hex" | "hsl" | "hsv" | "hwb" | "lab" | "lch"
                   | "oklab" | "oklch" | "xyz" | "kelvin";
```

The domain type is `DisplayColorSpace = PickerSpace | "hex"` (`color-model.ts:29`), and
`PICKER_SPACE_NAMES` (`picker-color.ts:72-89`) enumerates **17** `SpaceId`s. 17 + `hex` = **18
selectable rows** in the dropdown (`ColorSpaceSelector.vue:150` iterates
`DISPLAY_COLOR_SPACE_NAMES` whole). Missing from `markdownModules`: `srgb-linear`,
`display-p3`, `a98-rgb`, `prophoto-rgb`, `rec2020`, `ictcp`, `jzazbz` — **7 of 18**.

The cast at `AboutPane.vue:97` is the mechanism that hides it:

```ts
const activeMarkdownModule = computed(() =>
    markdownModules[model.value.selectedColorSpace as MarkdownSpace],   // ← the `as` defeats exhaustiveness
);
```

Typed as `Record<DisplayColorSpace, DocModule>` with no cast, `tsc` would have refused the
missing 7 at the moment they were added to the domain. The cast is a **masking construct**
(owner edict 2).

### Reproduction (measured + visual)

`about-probe.mjs`, deep-link `#/?space=display-p3&color=color(display-p3 0.5 0.2 0.7)`:

```
=== space: display-p3 ===
{ "triggerText": "Display P3",
  "heads": [ "H3:About the color spaces, Display P3", …, "H2:Detailed Guide" ],
  "guideBodyLen": 14,          ← 14 chars = the heading text and nothing else
  "hasMarkdownBody": false }
=== space: rec2020 ===          ← identical
```

`about-probe2.mjs` dumps the section verbatim:

```html
<div data-slot="card-content" class="card-content px-3 sm:px-6 pt-phi-3 pb-phi-4">
  <h2 class="font-display text-title mb-phi-3">Detailed Guide</h2><!--v-if--></div>
```

A promise with nothing behind it. And because `AboutPane.vue:51`'s `v-if="activeMarkdownModule"`
pre-empts the child, `Markdown.vue`'s "Oh snap…" Alert — the *correct* answer to "no doc for this
space" — never renders. The guard and the empty state are on opposite sides of the same boundary.

**Cure.** Delete `MarkdownSpace`; type the table `Partial<Record<DisplayColorSpace, DocModule>>`
and drop `v-if`, passing `:module` through and letting `Markdown` own its own absence (its Alert
already says the right sentence). Exhaustiveness then lives in the type, and the missing-doc
answer lives in the one component that already renders it.

---

## C-3 — MAJOR — the same 7 spaces are described with RGB's facts, presented as truth

`AboutPane.vue:43` mounts `ColorNutritionLabel` on the same `model`.
`ColorNutritionLabel.vue:210-215`:

```ts
const currentColorSpaceInfo = computed(() => {
    const space = resolveColorSpace(model.value.selectedColorSpace);
    return space in colorSpaceInfo
        ? colorSpaceInfo[space as keyof typeof colorSpaceInfo]
        : colorSpaceInfo.rgb;            // ← a masking fallback
});
```

`colorSpaceInfo` has **10** keys (`rgb hsl hsv hwb lab lch oklab oklch xyz kelvin`;
`grep -c industries demo/color-session/colorSpaceInfo.ts` → 14 records, 10 space entries). `hex`
resolves legitimately to `rgb`. The other **7** silently render RGB's dossier.

### Reproduction (visual — `scratchpad/about-display-p3.png`)

With **Display P3** selected, the About pane states:

| field rendered | value shown | truth |
|---|---|---|
| Definition | "A color space based on the additive mixture of red, green, and blue light." | that is RGB's definition |
| White Point | "Varies (typically D65)" | Display P3 is **D65, fixed** |
| Gamut | "Limited (device-specific)" | Display P3 is a **standardized** gamut (DCI-P3 primaries) |
| Created | **1931** | Display P3 is **2015** (Apple); DCI-P3 2010. 1931 is CIE RGB. |

This is worse than C-2. C-2 shows nothing; C-3 shows **wrong facts with full editorial
confidence**, on a pane whose entire purpose is to be right about color science. A `??`
that substitutes a *different subject's* data is not a fallback, it is a fabrication.

**Cure.** `colorSpaceInfo` must be `Record<DisplayColorSpace, SpaceInfo>` — no partial, no
fallback. Missing rows become a compile error, and the 7 dossiers get written (or the 7 spaces
leave the picker). Either resolution is honest; the `?? rgb` is not.

---

## C-4 — MAJOR — vacuous gate: no test exercises any color space but `lab`

There is **no unit test** for `AboutPane`, `ColorNutritionLabel` or `Markdown`:

```
$ grep -rln "AboutPane|ColorNutritionLabel|scenes/about" demo/test test
(no output)
```

The three e2e specs that touch it:

| spec | what it asserts | survives C-2/C-3? |
|---|---|---|
| `e2e/smoke/oracles/o10-type-locks.spec.ts:66-117` | computed font family/style/weight/size of `.about-card .space-trigger` and `.pane-header-title` | yes — reads type only |
| `e2e/smoke/mobile/walk.spec.ts:103,113,125` | the **heading** `"Detailed Guide"` is visible | yes — the heading is exactly what survives C-2 |
| `e2e/smoke/oracles/o18-contrast-census.spec.ts:745-777` | `.markdown-wrapper .markdown-body` visible + prose contrast | yes — it boots `OWNER_URL` which pins `space=lab` (`:70`) |

`OWNER_URL = "/#/?space=lab&color=" + encodeURIComponent(OWNER_COLOR)` — **every** About
assertion in the suite runs at one space.

**The exact green-keeping mutation.** Reduce `AboutPane.vue:79-93` to a single entry:

```ts
type MarkdownSpace = "lab";
const markdownModules: Record<MarkdownSpace, DocModule> = {
    lab: () => import("../../../assets/docs/lab.md"),
};
```

17 of 18 spaces now render a bare heading. `o10` green (type only). `walk` green (the heading
survives). `o18` green (boots at `lab`). **Full suite GREEN with 94 % of the feature dead.**
That is not a hypothetical: it is the same blind spot that let the real 7-space drift ship.

The visual audit inherits it — `REPORT.json` captures `/#/` at `?space=lab` only
(`results[].probe.url`), so 7 broken spaces are invisible to the matrix too.

**Cure.** One table-driven spec that iterates `DISPLAY_COLOR_SPACE_NAMES` and asserts, for every
key, that the Detailed Guide section has a `.markdown-body` **or** the not-found Alert — never a
lone heading. Twelve lines, and it is impossible for the table to drift again.

---

## C-5 — MINOR — whole-model overwrite through a stale `defineModel` snapshot, typed `any`

`AboutPane.vue:25`:

```ts
@update:model-value="(colorSpace: any) => { model = { ...model, selectedColorSpace: colorSpace }; }"
```

Three defects in one expression.

1. **`any`** in a `strict: true` repo. Any string can be written into `selectedColorSpace`; it is
   the same erasure family as C-2's cast.
2. **Read-modify-write on a `defineModel` computed with no local cache.** `model` is
   `defineModel<ColorModel>({ required: true })` (`:72`) — a `WritableComputedRef` reading a prop
   that only refreshes on the next render flush. Owner edict 7 names this exact hazard and names
   the cure ("`shallowRef` where the `defineModel` async round-trip would return stale reads");
   this file has no such cache. Any write landing between AboutPane's last props flush and this
   emit is reverted.
3. **A whole-model write against a patch-merging setter.** The prop lands at
   `usePaneRouter.ts:148-151` → `deps.updateModel(v)` → `useColorPipeline.ts:59-70`, whose
   contract is `Partial<ColorModel>`. AboutPane hands it the entire snapshot, so `color`,
   `inputColor` and `savedColors` are all re-asserted from the stale copy on a change that
   concerns one field.

The sibling host does the same job correctly, one field, through the injected pipeline —
`ColorPicker.vue:43`:

```ts
@update:model-value="(colorSpace: any) => updateModel({ selectedColorSpace: colorSpace })"
```

Two divergent write paths for one action (owner edict 2, no dual paths).

**Honest status of the reproduction.** I probed it (`about-probe5.mjs`) and the two paths are
**behaviourally identical today** — same URL, same triggers, same doc, both panes:

```
--- change space via ABOUT dropdown ---   after: url …space=oklch…  aboutTrigger "OKLCh"  pickerTrigger "OKLCh"
--- change space via PICKER dropdown ---  after: url …space=oklch…  aboutTrigger "OKLCh"  pickerTrigger "OKLCh"
```

Real pointer events land in separate tasks, so props always flush between them and the stale
window does not open under manual interaction. **The clobber is a HYPOTHESIS.** The dual path,
the `any`, and the edict-7 divergence are **CONFIRMED by source**.

**Cure.** Inject `COLOR_MODEL_KEY` — the pipeline is already provided app-wide and
`ColorSpaceSelector.vue:142` already injects it in this very subtree — and call
`updateModel({ selectedColorSpace })`. The `defineModel` and the router's `modelValue`/
`onUpdate:modelValue` prop pair (`usePaneRouter.ts:146-152`) both disappear. One write path, no
snapshot, no `any`, no stale window to reason about.

---

## C-6 — MINOR — the `:key` remount is load-bearing; `Markdown` never watches its `module`

`AboutPane.vue:52` sets `:key="model.selectedColorSpace"` on `<Markdown>`. `Markdown.vue` calls
`loadDocs()` **only** from `onMounted` (`:69-71`) — there is no `watch(() => module, …)` anywhere
in the file. So the doc changes **only** because the key destroys and rebuilds the component.

Consequences that ship today: every space change discards the rendered document, flashes the
skeleton (`Markdown.vue:3-9`), re-runs the whole `TreeWalker` highlight pass, and loses reading
position inside a 7523 px-tall scroller (measured, `about-probe7.mjs`).

The latent trap: the `:key` looks redundant beside the `v-if` and reads like belt-and-braces. Delete
it — a plausible simplification — and the Detailed Guide **freezes on the first space forever**,
silently, with no error. Correctness resting on a prop that looks like an optimisation is a trap
laid for the next reader.

Status: **CONFIRMED by source** (whole-file read of `Markdown.vue`, no watcher exists). The
runtime repro requires a source edit, which this seat may not make.

**Cure.** The C-1 resource rewrite subsumes this: a `watchEffect` on `module` makes the doc a
function of its input, and the `:key` can then be deleted safely because it no longer carries
meaning.

---

## C-7 — MINOR — the async guide swap is never announced (WCAG 4.1.3)

Measured, `about-probe5.mjs`:

```
before: {"ariaLiveInAbout":0, …}
after : {"ariaLiveInAbout":0, …}
```

Zero `[aria-live]` regions in `.about-card`. Choosing a space swaps the Detailed Guide through
skeleton → prose asynchronously; a screen-reader user gets **silence**, then a document that
changed under them. WCAG 2.2 SC 4.1.3 Status Messages (AA) requires the change to be
programmatically determinable through a status role without receiving focus.

Focus handling itself is **correct** — after selection `document.activeElement` is the trigger
`BUTTON` (`about-probe5.mjs`), so focus is restored, not stranded. The defect is announcement,
not focus.

**Cure.** `role="status"` on the guide's `CardContent`, and let the skeleton/prose/Alert
transition inside it. One attribute, at the section root, no wrapper component.

---

## C-8 — MINOR — inverted heading outline; zero `h1` in the document

`PaneHeader.vue:26` renders the pane title as `<h3>`. `AboutPane.vue:49` renders "Detailed
Guide" as `<h2>`, and `ColorNutritionLabel.vue:18,43,71,93,149` render five more `<h2>`. So every
section **outranks the pane's own title**.

Measured document outline (`about-probe6.mjs`):

```
"outline": "H3,H3,H2,H2,H2,H2,H2,H2,H3,H3,H2,H3,H3,H3,H2,H3,H3,H2,H3,H3,H2"
```

and `h1` count is **0** — independently confirmed by the repo's own harness,
`REPORT.json → results[].probe.counts.h1 = 0` for every one of the 60 captures.

`docs/tranches/V/megatranche/audit/visual/REPORT.md` does not surface this because `capture.mjs`
records `counts.h1` but never asserts on it (`:119`, and the summary at `:236-243` has no `h1`
row). The number was measured and then not read.

**Cure.** The pane title is the section's heading: `PaneHeader` emits `<h2>` and About's
sections step to `<h3>`, with the app shell owning the single `<h1>`. It is a producer-level fix
in `PaneHeader.vue`, inherited by all nine panes — not a per-pane override.

---

## C-9 — MINOR — 285 style-attribute writes per drag; the coalesced signal exists and is unused

`AboutPane.vue:54` forwards `cssColor` into the prose subtree. `useMarkdownColors.ts:33-88`
recomputes on every change: `parseCssColor` → `convertColor(…,"oklch")` →
`resolveSurfaceLightnessLive` → `certifyAccentInk` (distance guard + gamut map + WCAG floor
walk), then Vue patches `.markdown-wrapper`'s `style` attribute, and `Markdown.vue:73-75`'s
`onUpdated` re-enters `applyHighlighting`.

Measured (`about-probe3.mjs`) — `MutationObserver` on `.markdown-wrapper`, `attributeFilter:
["style"]`, during one 60-move slider drag:

```
C. setup: {"hasWrapper":true,"sliders":4}
C. 60 pointer moves in 4192 ms → {"mdStyleMutations":285}
```

285 recompute-and-patch cycles in 4.2 s. The pipeline already publishes a rAF-coalesced signal
built for exactly this — `cssColorOpaqueFrame` (`useColorPipeline.ts:279`), whose composable
header states the intent verbatim: *"SYNCHRONOUSLY on EVERY `cssColorOpaque` change, i.e. 60×/s
under a slider drag"* (`useAtmosphereFrameCoalesce.ts:14-19`). AboutPane is wired to the raw
signal instead (`usePaneRouter.ts:150` → `deps.cssColor()`).

**Honest perf status.** I A/B'd it (`about-probe4.mjs`) with a `PerformanceObserver` on
`longtask`, About-mounted vs. Palettes-mounted, same drag:

```
C2-A (right pane = About)   : {"about":true, "md":true,  "longTaskMs":70,"longTasks":1}
C2-B (right pane = Palettes): {"about":false,"md":false, "longTaskMs":82,"longTasks":1}
```

**No measurable long-task penalty.** The churn is real and structurally wrong; the claim that it
is *expensive* is **NOT SUBSTANTIATED** and I decline to make it.

**Cure.** Feed the About subtree the coalesced signal the pipeline already publishes — the
prose ink is atmosphere, not readout, and it belongs on the atmosphere clock.

---

## C-10 — MINOR — the module table is rebuilt on every mount

`markdownModules` (`AboutPane.vue:81-93`) is declared **inside** `<script setup>` — a fresh
object plus 11 closures per component instance, of a value that is a compile-time constant. The
pane is `defineAsyncComponent`-mounted and re-created on every view switch
(`usePaneRouter.ts:69`). It belongs at module scope, where it is allocated once per chunk.

---

## C-11 — MINOR — the pane class recipe is a per-instance duplicate across eight panes

`AboutPane.vue:4`:

```
about-card pane-scroll-fade w-full mx-auto overflow-y-auto overflow-x-hidden min-w-0 h-full
```

Census (`grep -rn "pane-scroll-fade" demo --include=*.vue`) — eight panes repeat the same recipe,
and they **disagree**: `AboutPane`, `AdminPane`, `PalettesPane`, `BrowsePane` carry `mx-auto`;
`GradientPane`, `MixPane`, `GeneratePane`, `ExtractPane` do not. Nobody chose that difference.

`.pane-scroll-fade` is already a real class with a real unscoped producer block
(`PaneHeader.vue:54-57`, which owns `contain` and `scroll-timeline`). The scroll/overflow/sizing
recipe belongs *there*, once — root-level styling (owner edict 5), not eight instance overrides.

---

## C-12 — INFO — Vue 3.5 idiom and template-casing divergence

- `AboutPane.vue:75-77` uses `defineProps<{ cssColor: string }>()` and **discards** the return.
  Every sibling in this subtree uses reactive props destructure — `Markdown.vue:44`,
  `ColorSpaceSelector.vue:125` — which is the edict-7 idiom.
- Attribute casing is mixed inside one template: `:model-value` (`:21`) and `v-model:open`
  (`:22`) against `:cssColor` (`:54`) and `:colorSpaceName` (`:55`).

Neither is a runtime defect. Both are drift from the file's own neighbours.

---

## C-13 — MINOR / **HYPOTHESIS** — manual DOM surgery inside a Vue-rendered subtree

`useMarkdownHighlighting.ts:60-64` replaces text nodes inside `<component :is="markdownContent">`
with document fragments:

```ts
textNode.parentNode?.replaceChild(frag, textNode);
```

Those text nodes are Vue-owned: the compiled `.md` is a component (the docs carry
`<script setup>` + `<Katex>`; `assets/docs/oklch.md:1-3`). Vue's patcher holds `vnode.el`
references to nodes this code has detached. Any subsequent patch of that subtree can write into
detached nodes or throw `NotFoundError: Failed to execute 'insertBefore'`.

**No reproduction.** The compiled `.md` receives no changing props today, so it does not re-patch
under normal use; only the wrapper's `style` changes (C-9). Labelled a hypothesis, honestly.

**Cure if pursued.** Do the marking where the content is *produced*, not after it paints — a
remark/rehype pass in the `.md` pipeline emits `<mark class="cs-name">` as real vnodes, and the
`onUpdated` TreeWalker disappears entirely.

---

## C-14 — MINOR — the only focusable control in a 7523 px scroller swallows the scroll keys

Measured (`about-probe7.mjs`), oklch doc, 1440×1000:

```
about-card scroll meta: {"tabindex":null,"role":null,"ariaLabel":null,
                         "scrollHeight":7523,"clientHeight":830,"overflowY":"auto"}
key PageDown : scrollTop 0   -> 790
key ArrowDown: scrollTop 790 -> 790     ← swallowed: opens the color-space Select
key End      : scrollTop 790 -> 790     ← swallowed
key Space    : scrollTop 790 -> 468     ← scrolls BACKWARD
tab stops until inside .about-card: 9   (BUTTON "Select color space")
```

`.about-card` holds **9.1 viewports** of content and exactly two interactive descendants (probe 5:
the 152×48 trigger, and one 52×21 inline prose link). The trigger sits in the sticky header, so it
is the element a keyboard user necessarily holds while reading — and it consumes `ArrowDown`
(reka Select's open key) and `End`. Pressing the obvious "scroll down" key **changes the selected
color space** instead of scrolling.

`PageDown` works, so the pane is not unreachable — this is operability friction, not a hard
2.1.1 failure. Reported at the severity the measurement supports.

---

## Negative proofs — hazards checked and genuinely ABSENT

Stated positively, with the evidence, because a clean result must be as auditable as a defect.

| hazard | result | evidence |
|---|---|---|
| ungated rAF loops (PRM-RAF epidemic) | **absent** | `grep -n "requestAnimationFrame\|addEventListener\|setInterval\|setTimeout\|onUnmounted\|ResizeObserver\|MutationObserver" AboutPane.vue` → **0 matches**. Nothing to leak, nothing to clean up. |
| WebGL on the critical path / context loss | **absent** | no canvas, no GL in the file or its two children. `REPORT.json` `/#/` logs `WebGL: context lost.` — that is `HeroBlob` in the picker pane, not About. |
| `ValueUnit` nesting accumulation | **absent** | no `new ValueUnit`, no wrapping of possibly-wrapped values anywhere in the subtree. |
| reka-ui slider pointer-capture leak | **absent** | About mounts no slider; its only reka surface is the Select. |
| oklch→HSV hue drift / `stableHue` | **absent** | About never converts to HSV; `stableHue` is owned by `useColorPipeline.ts:78`. |
| `verbatimModuleSyntax` compliance | **clean** | `AboutPane.vue:68` `import type { ColorModel }`, `:70` `import type { DocModule }` — both type-only imports are correctly marked. |
| focus restoration after the Select closes | **correct** | `about-probe5.mjs` → `activeEl` = `BUTTON` (the trigger), both write paths. |
| tap targets in `.about-card` | **pass** | trigger measured **152×48**; the 52×21 prose link is an inline link inside a sentence, which WCAG 2.5.8 explicitly exempts ("Inline: the target is in a sentence or its size is otherwise constrained by the line-height of non-target text"). Not a finding. |
| About's contribution to the REPORT tap-target census | **zero** | `REPORT.json` `/#/` desktop-light lists 8 small targets: 1 input, 3 admin/slug buttons, 4 picker channel spans. **None is About's.** |
| per-drag long-task penalty from the About subtree | **not measurable** | 70 ms (About mounted) vs 82 ms (not mounted), 1 long task each. |
| the two space-change write paths diverging observably | **they do not, today** | `about-probe5.mjs`: identical URL, triggers, and doc from both dropdowns. |
| page errors / horizontal overflow on About's route | **none** | `REPORT.md` summary: `pageErrors — 0`, `horizontalOverflow — 0`, `blankOrNearBlank — 0`. |

---

## Family grouping (for the mega-tranche register)

| family | members | one mechanism |
|---|---|---|
| **A. Unstated totality** | C-2, C-3, C-4 | a hand-maintained table over an open domain type, kept from failing loudly by a cast (`as MarkdownSpace`) and a fallback (`?? colorSpaceInfo.rgb`), and kept from failing visibly by a suite pinned to one space |
| **B. Failure has no home** | C-1, C-2, C-6 | the doc's lifecycle is a mount *event* rather than a function of its input, so failure escapes to the app boundary, absence escapes past the empty state, and change requires a remount key |
| **C. The seam is wired one level too raw** | C-5, C-9 | the pane receives snapshots and un-coalesced signals through the router instead of injecting the pipeline that is already provided app-wide |
| **D. Producer/consumer inversion** | C-8, C-11, C-12 | outline level, scroll recipe, and props idiom decided per instance instead of at the producer (`PaneHeader`, `.pane-scroll-fade`) |
| **E. Manual DOM under a framework** | C-13 | post-paint mutation of framework-owned nodes instead of production-time markup |

Families A and B are both discharged by the same two changes: type the table against
`DisplayColorSpace`, and make the doc a resource. That is the architectural transposition worth
making; the rest are local.
