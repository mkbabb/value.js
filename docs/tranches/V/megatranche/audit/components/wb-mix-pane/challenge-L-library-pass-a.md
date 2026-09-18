# CHALLENGE-L — library structure under `demo/workbenches/mix/MixPane.vue`

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`), the tier declared at spawn. The seat is
declared, not inherited.

## Scope + method

Subject: `demo/workbenches/mix/MixPane.vue` (123 lines) and its module lattice.
Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`.
**HEAD at read time was `32b4040e`, not the `c654824e` named in the brief** — the branch advanced
mid-formation (`docs(V·mega): r3 DELTA COMPLETE`). Every line number below was read at `32b4040e`.

Method: full import-closure trace of MixPane and its four children; `paths`-vs-`exports` differential;
`tsc --traceResolution` on the demo program; runtime probes against the built `dist/` for the
mix reduction's algebra; the mega-tranche visual-audit rows for `/#/mix`. No source was edited.

---

## Verdict

**DEFECTIVE.** Fifteen findings, five of them MAJOR, one BLOCKER-adjacent (F-1: measured,
user-visible wrong answer). The defects are not scattered — they fall into **four mechanism families**,
and every one of them is a *homing* error: a concept living in a module that does not own it.

| family | mechanism | findings |
|---|---|---|
| **A · capability homed in the demo** | color math the library should own is hand-rolled in `demo/` | F-1, F-4, F-5 |
| **B · concept with two homes** | one idea, two live implementations | F-2, F-3, F-11, F-15 |
| **C · resolution law forked by hand** | the published surface is described twice, and the copies drifted | F-6, F-7, F-8 |
| **D · ownership inverted** | a module defines what its parent owns, or reaches into a child | F-9, F-10, F-12, F-13, F-14 |

---

## The strongest defect first

### F-1 · MAJOR · The mix result depends on the order the user clicked the swatches — 120° of hue

`useMixingState.startMix()` (`demo/workbenches/mix/composables/useMixingState.ts:85-90`) delegates the
N-ary mix to `mixColorSequence` in `demo/palettes/mix.ts:39-64`, a **demo-owned** sequential pairwise
fold:

```ts
let mixed = colors[0]!;
let accumulated = weights[0]!;
for (let index = 1; index < colors.length; index++) {
    const total = accumulated + weight;
    mixed = mixedOrThrow(mixed, colors[index]!, weight / total, space, hueMethod);
    accumulated = total;
}
```

For a linear channel this fold *is* the weighted mean. **For a hue channel it is not**, because
`interpolateHue`'s `shorter`/`longer` arc selection is path-dependent: the arc chosen at step *k*
depends on where step *k−1* landed. Measured against the built `dist/`, mixing `red`, `blue`, `lime`
at equal weights:

```
$ node --input-type=module -e "...seq(['red','blue','lime'], space, hue) vs reversed..."
oklch/longer     | fwd: 0.6488 0.2886 265.2604 | rev: 0.6488 0.2886 265.2604 | SAME: true
oklch/shorter    | fwd: 0.6488 0.2886  25.2604 | rev: 0.6488 0.2886 145.2604 | SAME: false
hsl/increasing   | fwd: 240.0000 1.0000 0.5000 | rev: 240.0000 1.0000 0.5000 | SAME: true
oklab/shorter    | fwd: 0.6488 -0.0138 -0.0021 | rev: 0.6488 -0.0138 -0.0021 | SAME: true
```

**Same three colors, same weights, same space, same hue method — hue `25.26°` vs `145.26°` purely
from selection order.** `oklch` + `shorter` is not an exotic corner: `oklch` is the first entry of
`INTERPOLATION_SPACES` (`demo/color-session/color-space-meta.ts:28`) and `shorter` is the default
`hueMethod` (`useMixingState.ts:45`). The lightness and chroma channels agree to 4 decimals — only
the hue diverges, which is exactly the signature of a path-dependent circular fold.

**Why this is a library-structure defect, not merely a bug.** `src/color/operations.ts:83` owns
`mixColors` — the *binary* case, with a `Result` contract, `none`-channel handling, alpha
premultiplication, and a `HUE_INDEX` table. The N-ary generalisation is the same concept one
arity up, and it belongs in the same module. Because it was homed in `demo/palettes/mix.ts` instead,
it inherited none of the library's discipline: no `Result`, no hue-aware N-ary semantics (a circular
mean is the correct construction for the hue channel), and — see F-14 — no coverage in a typechecked
program. `src/subpaths/color.ts` exports `mixColors` and nothing else in this family; the published
surface has a hole exactly the shape of the demo's private module.

**Reproduction**: the node command above, run from the repo root against `dist/`. UI-level: on
`/#/mix`, Colors mode, OKLCh + Shorter, add red → blue → lime, Mix; clear; add lime → blue → red, Mix.

**Cure (transposition, not patch).** Move the capability to its owner and give it the right algebra:

```ts
// src/color/operations.ts
export function mixColorSequence<S extends SpaceId>(
    colors: readonly AnyColor[],
    options: { readonly space: S; readonly hue?: HueInterpolationMethod; readonly weights?: readonly number[] },
): Result<Color<S>, ColorIssue>
```

implemented as a **single weighted mean per channel**, with the hue channel resolved by a weighted
*circular* mean (unwrap each hue against the running reference using the caller's arc rule, average,
re-normalise). Order-independence then holds by construction, and the existing `mixColors` becomes
the two-element specialisation. Export it from `src/subpaths/color.ts`. `demo/palettes/mix.ts`
shrinks to what is genuinely demo-shaped: `mixPalettes` — the `Palette`-to-`Palette` orchestration
and the three leftover strategies, which operate on the demo's own `Palette` type.

---

## Family A — capability homed in the demo

### F-4 · MAJOR · The library's `Result` contract is erased by a demo-owned throwing adapter, and MixPane has no failure surface

`demo/color-session/picker-color.ts:104-107` installs a throwing unwrap over the whole library:

```ts
function valueOrThrow<T, E extends Readonly<{ code: string }>>(result: Result<T, E>): T {
    if (result.ok) return result.value;
    throw new PickerColorError(result.error.code);
}
```

`demo/palettes/mix.ts:36-39` repeats it for the mix:

```ts
const result = mixColors(from, to, progress, { space, hue: hueMethod });
if (!result.ok) throw new Error(`Color mix failed: ${result.error.code}`);
```

The package describes itself as *"Immutable, **failure-explicit** CSS color, value, easing, transform,
math, and quantization capabilities"* (`package.json:4`). The demo — the library's own dogfood
consumer, and therefore the reference for how a real consumer should hold it — converts that
contract back into exceptions at the first hop, then writes every downstream call site as if mixing
cannot fail. `useMixingState.startMix()` has no `try`, `MixPane.vue` has no error state, and
`MixResult` has no failure arm.

The failure is reachable with **legal CSS Color 4 input**. Measured against `dist/`:

```
"oklch(0.5 0.1 200 / none)" -> alpha= "none"  channels= [0.5,0.1,200]  mix.ok= false {"code":"color_missing_alpha"}
"oklch(none 0.1 200)"       -> alpha= 1  channels= ["none",0.1,200]    mix.ok= false {"code":"color_missing_channel"}
"oklab(0.6 0.1 0.1)"        -> alpha= 1  channels= [0.6,0.1,0.1]       mix.ok= true
```

A palette colour carrying a `none` channel or `none` alpha — both round-trip through
`parseCssColor`/`serializeCssColor` and are storable as a `PaletteColor.css` string — makes
`startMix()` throw. The throw is caught by `demo/color-picker/ErrorBoundary.vue:59`, so the
consequence is not a white screen: **the entire Mix pane is replaced by an error card, with no
recovery, because one selected swatch used a legal keyword.** Worse, `copyResult` is invoked from
the *dock* (`demo/shell/usePaneRouter.ts:222`), which lives outside that boundary — the same feature's
two failure paths surface in two different boundaries.

*Reproduction of the mechanism*: the node probe above. *Reproduction end-to-end*: NONE — I did not
find a UI affordance that writes a `none` channel into a saved palette, so the ingest half is a
**hypothesis**; the mix half is measured.

**Cure.** Delete `valueOrThrow` from the mix path. `mixResult` becomes
`Ref<Result<MixResult, ColorIssue> | null>`; `MixResultDisplay` renders the `err` arm as an inline
message on the plate (the `code` is already a stable enum). The library's contract then reaches the
pixel, which is the whole point of a dogfood demo.

### F-5 · MINOR · The mix state's space type is 17-wide; the UI offers 9

`useMixingState.ts:44` declares `colorSpace = ref<PickerSpace>("oklab")` where
`PickerSpace = SpaceId` (`picker-color.ts:35`) — all 17 library spaces including `kelvin` (one
channel), `ictcp`, `jzazbz`, `srgb-linear` and the four wide-gamut RGB spaces. The UI offers exactly
9 (`color-space-meta.ts:27-37`). There is no `InterpolationSpace` type; the state is modelled over a
domain eight members wider than any reachable value.

**Cure.** `export type InterpolationSpace = (typeof INTERPOLATION_SPACES)[number]["value"];` in
`color-space-meta.ts`, and type `colorSpace`, `MixConfigBar`'s model, `mixStage`'s `space` and
`PaletteMixOptions.space` over it. One derived type, four call sites, zero runtime change.

---

## Family B — one concept, two homes

### F-2 · MAJOR · Two clipboard implementations and two `MixResult` serializers inside one feature, with divergent UX

`MixPane.vue:49-55`:

```ts
async function copyResult() {
    if (!mixResult.value) return;
    const text = mixResult.value.type === "color"
        ? mixResult.value.css ?? ""
        : mixResult.value.colors?.map((c) => c.css).join(", ") ?? "";
    await writeClipboard(text);
}
```

`MixResultDisplay.vue:31, 42-47`:

```ts
const { status, copy } = useClipboard({ resetMs: 1500 });
...
async function onCopy() {
    const text = result.type === "color"
        ? result.css ?? ""
        : result.colors?.map((c) => c.css).join(", ") ?? "";
    await copy(text);
}
```

The text-building expression is **byte-identical apart from the receiver name**, and the two copies
use **two different glass-ui clipboard primitives**: `writeClipboard` (imperative, `MixPane.vue:12`)
and `useClipboard` (stateful, `MixResultDisplay.vue:5`). The behaviours diverge: the in-plate button
flips its icon to `Check` for 1500 ms (`MixResultDisplay.vue:123-126`); the dock's "Copy result"
action (`usePaneRouter.ts:222`) gives the user nothing at all. Same verb, same data, two answers.

**Cure.** "How a `MixResult` becomes text" is a property of `MixResult`, so it lives beside it:
`export function mixResultToText(result: MixResult): string` in `useMixingState.ts`. One clipboard
primitive — `useClipboard`, since the confirmation state is part of the interaction — hoisted into
`useMixingState` so the dock action and the plate button dispatch the *same* handler and share the
same confirmation. `MixPane.copyResult` then reduces to a re-export of that handler.

### F-3 · MAJOR · `MixResult` is not a discriminated union, and the resulting optionality manufactures six masking fallbacks

`useMixingState.ts:30-36`:

```ts
export type MixResultType = "color" | "palette";
export interface MixResult {
    type: MixResultType;
    css?: string;
    colors?: PaletteColor[];
}
```

The discriminant exists but the payload is not discriminated, so every consumer must defend against
a state the producer never creates. Live fallbacks: `MixPane.vue:41` (`&& mixResult.value.css`),
`:44` (`&& mixResult.value.colors`), `:52`, `:53` (`?? ""` ×2, `?.` ×1), `MixResultDisplay.vue:38`,
`:39` (`?? "var(--muted-foreground)"` ×2), `:44`, `:45`, `:78`, `:91`. That is **eleven** guards
against six impossible states. Standing edict 2 forbids masking fallbacks; every one of these is one.

**Cure.**

```ts
export type MixResult =
    | { readonly type: "color"; readonly css: string }
    | { readonly type: "palette"; readonly colors: readonly PaletteColor[] };
```

All eleven guards delete themselves and `tsc` narrows the branches. This is a one-line change with
a negative diff everywhere else.

### F-11 · MINOR · `demo/palettes/export/` (11 modules) is consumed only by a test; the app runs `demo/palettes/export.ts`

The named historical suspect is still alive, and the split is now decidable:

```
$ grep -rn 'from ".*export"' demo
demo/palettes/usePaletteExport.ts:9:} from "./export";          # → export.ts, the flat module

$ grep -rn "export/serializers|export/css|export/json|…" demo src
demo/test/export/byte-exact.test.ts:23:} from "../../palettes/export/serializers";
```

`demo/palettes/export/` holds 11 files — `serializers.ts`, `canonical.ts`, `rfc8785.ts`, `digest.ts`,
`bytes.ts`, `reload.ts`, plus five format modules — with RFC-8785 canonicalisation and byte-exact
digests. **Nothing in the running application imports any of them.** The live path is the flat
`demo/palettes/export.ts`, reached through `usePaletteExport.ts` from `BrowsePane.vue:198` and
`PalettesPane.vue:152`. Two complete implementations of palette export; the richer one is
test-only, and its test is the only thing keeping it alive.

MixPane's inline `.map((c) => c.css).join(", ")` (F-2) is a **third** ad-hoc serialisation of
"palette → text" in the same repository.

**Cure.** Adopt `export/serializers` as the single home (it is the one with a byte-exact contract),
migrate `usePaletteExport` onto it, delete `demo/palettes/export.ts`, and add the clipboard
`css-list` format there so F-2's serializer has an owner rather than a copy.

### F-15 · INFO · `PickerSpace` and `PickerColorIn<S>` are demo aliases of published library types

`picker-color.ts:35-37`:

```ts
export type PickerColor = AnyColor;
export type PickerSpace = SpaceId;
export type PickerColorIn<S extends SpaceId> = Extract<AnyColor, { readonly space: S }>;
```

`src/color/model.ts:38,43` already publishes `Color<S>` and `AnyColor`, and
`src/subpaths/color.ts:1-13` exports both. `Extract<AnyColor, {space: S}>` **is** `Color<S>` — the
same type computed the long way. Three names for two concepts, which is a direct violation of
unique semantic ownership, and it is not free: because TypeScript cannot see the two constructions
as identical, the demo pays double casts to bridge them —

- `picker-color.ts:116` — `valueOrThrow(convertColor(color, space)) as unknown as PickerColorIn<S>`
- `mix.ts:38` — `return result.value as unknown as PickerColorIn<S>`

Both `as unknown as` casts vanish if `PickerColorIn<S>` is deleted and `Color<S>` imported.

**Cure.** Delete all three aliases; import `Color`, `AnyColor`, `SpaceId` from
`@mkbabb/value.js/color` at every use site. Keep only names the demo genuinely originates
(`ChannelMeta`, `PICKER_CHANNELS`) — those *are* demo concepts.

---

## Family C — the resolution law is forked by hand, and the copies have drifted

### F-6 · MAJOR · `tsconfig.demo.json#paths` is a hand-rolled fork of `package.json#exports` with 3 dead keys and 2 missing live keys

`vite.config.ts:41-51` **generates** the runtime alias set from the exports map, and says so in a
comment that is worth quoting because it states the invariant this finding breaks:

> `// GENERATED (not hand-rolled) so the alias set can never drift from the exports map`

The *typecheck* half was left hand-rolled. Differential:

```
exports (package.json:20-45):  ./color ./value ./css ./easing ./math ./transform ./quantize
paths   (tsconfig.demo.json):  .  /color /parsing /math /easing /units /transform /quantize
```

- **in `paths`, not in `exports`, and the target file does not exist:**
  `@mkbabb/value.js` → `./dist/index.d.ts`, `@mkbabb/value.js/parsing` → `./dist/subpaths/parsing.d.ts`,
  `@mkbabb/value.js/units` → `./dist/subpaths/units.d.ts`

```
$ ls -la dist/index.d.ts dist/subpaths/parsing.d.ts dist/subpaths/units.d.ts
ls: dist/index.d.ts: No such file or directory
ls: dist/subpaths/parsing.d.ts: No such file or directory
ls: dist/subpaths/units.d.ts: No such file or directory
```

- **in `exports`, missing from `paths`:** `./css` and `./value` — and `./css` has **10 live demo
  importers**, one of which is on MixPane's own import closure
  (`MixPane → useMixingState → color-utils → picker-color:28`).

The header comment on `tsconfig.demo.json` compounds it: it claims *"the 8 public keys"* and names
`{color,parsing,math,easing,units,transform,quantize}` — a set that has not matched `package.json`
since the subpath rename. The file documents a surface that does not exist.

### F-7 · MAJOR · Two different resolution mechanisms serve value.js inside a single file

Because of F-6, the demo resolves the library two ways at once. `tsc --traceResolution` on the demo
program, both hits from the *same file* (`demo/color-session/picker-color.ts`, lines 1 and 28):

```
======== Resolving module '@mkbabb/value.js/color' from '…/demo/color-session/picker-color.ts'. ========
'paths' option is specified, looking for a pattern to match module name '@mkbabb/value.js/color'.
Module name '@mkbabb/value.js/color', matched pattern '@mkbabb/value.js/color'.
Trying substitution './dist/subpaths/color.d.ts', candidate module location: './dist/subpaths/color.d.ts'.
======== Module name '@mkbabb/value.js/color' was successfully resolved to '…/dist/subpaths/color.d.ts'. ========

======== Resolving module '@mkbabb/value.js/css' from '…/demo/color-session/picker-color.ts'. ========
'paths' option is specified, looking for a pattern to match module name '@mkbabb/value.js/css'.
File '…/demo/color-session/package.json' does not exist.
File '…/demo/package.json' does not exist.
Found 'package.json' at '/Users/mkbabb/Programming/value.js/package.json'.
Entering conditional exports.
Matched 'exports' condition 'types'.
Using 'exports' subpath './css' with target './dist/subpaths/css.d.ts'.
======== Module name '@mkbabb/value.js/css' was successfully resolved to '…/dist/subpaths/css.d.ts'
         with Package ID '@mkbabb/value.js/dist/subpaths/css.d.ts@4.0.0'. ========
```

`/color` goes through the hand-rolled `paths` map. `/css` falls through it and resolves by **Node
package self-reference** through the real `exports` map. Both land in the same directory today, so
nothing is red — but only one of the two paths is a real proof of the published surface. The `paths`
entries are a *simulation* of the exports map, and a simulation that has already drifted three keys
is a false proof of the public API.

### F-8 · MAJOR · A frozen published `@mkbabb/value.js@4.0.0` is installed in `node_modules`, undeclared, with a `.d.ts` that differs from the local build

```
$ ls -la node_modules/@mkbabb/value.js/
LICENSE  README.md  dist/  package.json          # published tarball layout, mtime Jul 17
$ node -e "console.log(require('…/node_modules/@mkbabb/value.js/package.json').version)"
4.0.0
$ diff -q dist/subpaths/css.d.ts node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts
Files dist/subpaths/css.d.ts and node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts differ
$ python3 -c "import os;print(os.path.realpath('…/node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts'))"
/Users/mkbabb/Programming/value.js/node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts   # NOT a symlink
```

It is not a symlink to the checkout and it is in **no** dependency list — `package.json`'s
`dependencies` are `@mkbabb/glass-ui` and `@mkbabb/keyframes.js` only. It arrives transitively:
glass-ui's published `dist/` imports value.js by bare specifier (the `inv-K-2` posture documented at
`tsconfig.demo.json`), so npm hoists a real copy to the root.

Today self-reference wins (F-7's trace shows the repo `package.json` found before `node_modules`),
so the loaded types are the local ones. **The margin is one resolution-order accident wide.** A
`paths` edit, a `baseUrl` change, a nested-`package.json` addition under `demo/`, or a bundler with
different self-reference support, and the demo starts typechecking against a frozen 4.0.0 whose
`css.d.ts` already differs — while Vite's generated alias keeps running the local build. Types from
one package, runtime from another, no error anywhere. This is the highest-leverage latent defect in
the report.

**Cure for F-6 + F-7 + F-8, one move.** Delete the entire value.js block from
`tsconfig.demo.json#paths`. Self-reference through `exports` already works — F-7's trace proves it
for `/css` — and it is the *only* mechanism that cannot drift, because it reads the same map Vite
generates from. One law, one source, zero hand-maintained copies. Then add a repo-hygiene test under
`test/dist/` (that directory already exists for exactly this purpose per `vitest.config.ts:22-25`)
asserting `Object.keys(pkg.exports)` equals the set of `src/subpaths/*.ts` basenames and that every
target file exists — so the next rename cannot silently fork the surface again. Separately, declare
value.js's own name in an npm `overrides`/`resolutions` entry pointing at the checkout, or accept
the hoisted copy explicitly; leaving an undeclared duplicate of yourself in `node_modules` is not a
posture, it is an accident.

---

## Family D — inverted and untyped ownership

### F-9 · MAJOR · The shell reaches into the feature through `Ref<any>` imperative handles guarded by optional-call masks

`MixPane.vue:57` exposes an imperative surface:

```ts
defineExpose({ clearSelection, startMix, copyResult });
```

Its sole consumer is the **shell**, `demo/shell/usePaneRouter.ts:107-111` and `:220-222`:

```ts
export interface PaneActionRefs {
    generate: Ref<any>;
    gradient: Ref<any>;
    mix: Ref<any>;
}
...
{ key: "clear", icon: Trash2, …, handler: () => paneRefs.mix.value?.clearSelection?.() },
{ key: "mix",   icon: Blend,  …, handler: () => paneRefs.mix.value?.startMix?.() },
{ key: "copy",  icon: Copy,   …, handler: () => paneRefs.mix.value?.copyResult?.() },
```

Three defects in one edge:

1. **Direction.** The shell owns the dock; the feature owns the verbs. The shell should not reach
   *into* the feature to invoke them — the feature should *publish* them.
2. **`Ref<any>`.** The expose contract is untyped at both ends. Rename `startMix` and nothing fails
   to compile.
3. **`?.()` is a masking fallback** (edict 2). If the contract drifts, the dock button silently does
   nothing. Compounding it: the `mix` action carries no `disabled`, while
   `useMixingState.ts:80` opens with `if (!canMix.value) return;` — so with fewer than two colours
   selected the dock's Mix button is fully enabled and silently no-ops. The screenshot
   (`shots/safari-desktop-light/mix.png`) shows the *in-pane* Mix button correctly greyed at zero
   selection; the dock's twin is not.

**Cure.** Invert it. The pane is the authority on its own actions, so it provides them:
`provide(PANE_ACTIONS_KEY, computed<DockAction[]>(() => [...]))` from `MixPane`, injected by the
dock. `DockAction` is already the right type and already lives in `usePaneRouter.ts:37-46` — move it
to a neutral home (`demo/shell/dock-actions.ts`) and the router's three per-view `if` blocks
(`usePaneRouter.ts:187-225`, 39 lines) delete entirely, along with `PaneActionRefs`, the three
`Ref<any>`, the nine `?.()` masks, and all three `defineExpose` blocks. `canMix` then feeds
`disabled` for free, because the action is authored where `canMix` lives.

### F-10 · MINOR · `PaneHeader` (a child) defines the scroll host of its own parent

`demo/shared/ui/PaneHeader.vue:40-58` ships an **unscoped** `<style>` block defining
`.pane-scroll-fade` — the class applied to the *Card that contains PaneHeader* — and the comment
states the inversion outright:

> `Because the class is applied across siblings of PaneHeader (not its descendants), the block must
>  be UNSCOPED to reach those consumers.`

A child component defining the `scroll-timeline` its parent must carry is a dependency pointing the
wrong way. It also leaks: an unscoped rule from a lazily-mounted async component is global CSS whose
presence depends on mount order.

Aggravating: glass-ui already owns this concept family — it ships `./fading-scroll` with
`NATIVE_SCROLL_TIMELINE` (`node_modules/@mkbabb/glass-ui/dist/components/fading-scroll/constants.d.ts`),
the same `scroll()`-support gate the demo hand-rolls in `@supports (animation-timeline: scroll())`
at `PaneHeader.vue:186`. And the demo's class name is a misnomer: `.pane-scroll-fade` does no
fading — the fade is `PaneHeader`'s own `::before` mask; the class only declares
`contain` + `scroll-timeline: --pane-scroll block`.

### F-12 · MINOR · The pane chrome is a 4×-duplicated literal with three drifted variants, styled per-instance on a root component

`MixPane.vue:61-62` is not a MixPane construct; it is a template:

```html
<div class="relative w-full mx-auto h-full min-w-0">
  <Card tier="resting" class="relative pane-scroll-fade w-full overflow-y-auto overflow-x-hidden min-w-0 h-full">
    <PaneHeader description="…">Mix</PaneHeader>
    <div class="flex flex-col gap-4 pb-4 px-4 sm:px-6 pt-2"> … </div>
```

Byte-identical (outer div, Card class list, body class list) in `GradientPane.vue:19-23`,
`GeneratePane.vue:30-35` and `ExtractPane.vue:1-7`. Across all eight `.pane-scroll-fade` consumers
there are three drifted variants: `mx-auto` present in Browse/Palettes/Admin/About and absent in
Gradient/Generate/Mix; `relative` on the Card in Mix only (needed because `MixAnimationCanvas` is
`absolute inset-0`); `ConfigSliderPane.vue:106` uses a bare `div` with `scrollbar-thin` instead of a
Card. Eight per-instance overrides of a design-system root component — edict 5 — with no owner.

Note also that Mix's outer `<div class="relative …">` is dead: the Card *also* carries `relative`, so
the canvas positions against the Card, not the wrapper.

**Cure that satisfies edicts 3, 4 and 5 simultaneously.** glass-ui's `Card` already has a `variant`
prop — `CardVariant = "selection"` at
`node_modules/@mkbabb/glass-ui/dist/components/card/Card.vue.d.ts` — so extend the existing prop with
`"pane"`, and let it own the overflow, `contain`, and the `--pane-scroll` timeline (which resolves
F-10 in the same stroke: `PaneHeader` then *consumes* a timeline it does not define). No new demo
directory, no new wrapper component, an existing component-type name reused. Every pane becomes
`<Card tier="resting" variant="pane">`.

### F-13 · MINOR · `demo/ui/` is a 20-module pure-alias layer, and MixPane straddles it and the direct path in one file

Every file under `demo/ui/*/index.ts` is a verbatim re-export of glass-ui and nothing else:

```ts
// demo/ui/card/index.ts — the entire file
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@mkbabb/glass-ui";
```

Twenty such barrels. They add no type, no default, no wrapper, no ownership. Edict 2 forbids
aliases; this is a directory of them. The consequence is visible inside MixPane itself:

- `MixPane.vue:3` — `import { Card } from "../../ui/card";`
- `MixPane.vue:12` — `import { writeClipboard } from "@mkbabb/glass-ui";`

Two paths to one package, four lines apart. Repo-wide: 48 demo files import a barrel, 82 import
glass-ui directly, and **24 do both**. The barrels also cost bundle granularity — `demo/ui/card`
pulls the root glass-ui barrel while glass-ui publishes a dedicated `./card` subpath (67 subpaths in
its exports map); `demo/ui/input/index.ts` already uses `@mkbabb/glass-ui/forms`, so even the barrel
layer is internally inconsistent about this.

**Cure.** Delete `demo/ui/` entirely; rewrite the 48 importers to
`@mkbabb/glass-ui/<component-subpath>`. Mechanical, and it removes an entire directory whose only
function is to hide which design system the demo uses.

### F-14 · MAJOR · The library's own test suite depends on demo source, and `test/` is typechecked by no program

`test/mix-v4.test.ts` — the only coverage the mix reduction has anywhere:

```ts
import { mixColors } from "@mkbabb/value.js/color";
import { parseColorIn } from "../demo/color-session/color-utils";
import { mixColorSequence } from "../demo/palettes/mix";
```

The **library's** test tree imports the **demo's** source. Ten files in `test/` do this
(`gradient-parse`, `status-lamp`, `gradient-v4-consume`, `value-domain-clamp`, `ink`, `view-accents`,
`image-sampler-v4`, `slider-announcement`, `mix-v4`, `preview-chips`). That is the dependency arrow
pointing exactly backwards — and it is the structural confession of F-1: the mix reduction is
*tested as library behaviour* while *living in demo code*.

Worse, that test is outside every type gate:

- `tsconfig.lib.json#include` — `src/subpaths/*.ts`, `src/color/**`, `src/css/**`, `src/foundation/**`,
  `src/value.ts`, `src/easing.ts`, `src/quantize.ts`, `src/transform/**`. No `test/`.
- `tsconfig.demo.json#include` — `["demo/", "src/vite-env.d.ts"]`. No `test/`.
- `package.json:69` — `"typecheck": "vue-tsc -p tsconfig.lib.json --noEmit && vue-tsc -p tsconfig.demo.json --noEmit"`

`grep -l '"test/"' tsconfig*.json` returns nothing. **The entire library test suite is invisible to
`npm run typecheck`.** `test/mix-v4.test.ts:9` is titled *"folds equal weights through
failure-explicit `mixColors` results"* — it asserts the fold, and it never asserts order-independence,
which is how F-1 survived.

**Cure.** Move `mixColorSequence` to `src/color/operations.ts` (F-1); `test/mix-v4.test.ts` then
imports only `@mkbabb/value.js/color` and the backward edge disappears. Add a third gate leaf —
`tsconfig.test.json` including `test/` and `demo/test/`, referenced from the root solution file and
appended to the `typecheck` script — so the suite is typechecked like everything else. Add the
order-independence property as a test: `mixColorSequence(cs, o)` must equal
`mixColorSequence([...cs].reverse(), o)` for every space × hue-method pair.

### F-16 · MINOR · Dead `computed` import, and the lint gate structurally cannot see it

`MixPane.vue:2` — `import { inject, computed } from "vue";`. `computed` is never used; the file has
one `grep` hit, the import itself.

```
$ npx eslint demo/workbenches/mix/MixPane.vue --max-warnings=0
(no output — clean)
```

It passes because unused-vars is disabled at five separate scopes: `eslint.config.js:71` and `:185`
(`@typescript-eslint/no-unused-vars`), `:81`, `:118`, `:186` (`no-unused-vars`), `:153`
(`vue/no-unused-vars`). The finding is not the dead import — it is that **no gate in this repository
can detect a dead import in a `.vue` file**, so this class of rot accumulates silently.

**Cure.** The stated rationale (`eslint.config.js:10-22`) is destructure-and-discard patterns. That
is what `argsIgnorePattern`/`varsIgnorePattern: "^_"` exists for. Re-enable
`@typescript-eslint/no-unused-vars` with `{ args: "after-used", varsIgnorePattern: "^_" }` and fix
the fallout, rather than blinding the gate across the whole repo.

### F-17 · INFO · MixPane injects a 19-member port to call one function

`MixPane.vue:16` injects `LIBRARY_PORT_KEY` and uses exactly one member,
`pm.createPalette` (`:43`, `:45`). The port publishes nineteen
(`usePalettePorts.ts:129-146`). The RF-15 dissolution replaced one god facade with five ports, which
was right in direction; this consumer shows the granularity did not land — a pane that saves a
palette should depend on *saving a palette*, not on the whole local-library surface including
`showDeleteAllConfirm` and `onPublish`.

Also worth recording: `createPalette` is invoked at four unrelated call sites with hardcoded names —
`MixPane.vue:43` `"Mixed Color"`, `:45` `"Mixed Palette"`, `GeneratePane.vue:19`
`"Generated Palette"`, `useExtractSession.ts:187` — each re-deriving the "result → palette" shape
by hand. The naming convention has no owner.

---

## What the greenfield lattice looks like

Stated concretely, no hedging. Five layers, each edge pointing one way:

```
@mkbabb/value.js/{color,css,math,easing,quantize}   — pure, Result-returning, order-independent
        │  mixColorSequence lives HERE, as the N-ary sibling of mixColors
        ▼
@mkbabb/glass-ui/{card,dock,tabs,watercolor-dot,…}  — the design system, incl. Card variant="pane"
        │  no demo/ui/ alias layer exists
        ▼
demo/color-session/                                 — the session domain: no type aliases of library
        │  types; no valueOrThrow; Result crosses this boundary intact
        ▼
demo/palettes/                                      — Palette as a demo concept: one export/ tree,
        │  one store, ports sized to their consumers
        ▼
demo/workbenches/mix/                               — MixPane: layout + wiring only
             useMixingState  ← the state machine, owns MixResult (a real union) and
                               mixResultToText, publishes its own DockAction[]
             MixAnimationCanvas / MixConfigBar / MixSourceSelector / MixResultDisplay
```

The shell does not appear as a dependency of the feature at all: it *injects* what panes publish.
`test/` mirrors `src/` and imports nothing from `demo/`; `demo/test/` mirrors `demo/`; both are in a
`tsconfig.test.json` leaf of the solution file. There is exactly one description of the published
surface — `package.json#exports` — and both Vite and TypeScript derive from it rather than restating
it.

Applying that lattice to MixPane makes it **smaller**: F-3 deletes eleven guards, F-2 deletes a
duplicate serializer and a second clipboard primitive, F-9 deletes the `defineExpose`, F-13 deletes
one import indirection, F-16 deletes a dead import, F-12 deletes six utility classes and a dead
wrapper `div`. The 123-line file lands near 80, and every line left in it is about *mixing*.

---

## Negatives — what I checked and found sound

These are recorded so the absence of a finding is evidence, not silence.

1. **The library is consumed through the published subpath map, never through `src/` internals.**
   `grep -rn "@src" demo` returns no hits in the mix subtree; `tsconfig.demo.json` carries no
   `@src/*` path; `vite.config.ts:66-70` keeps `@src` alive only for the `assets/docs/*.md`
   `?source` reference pages. Every value.js import in MixPane's closure is a bare public specifier:
   `@mkbabb/value.js/color` ×25, `/css` ×10, `/math` ×6, `/easing` ×5, `/quantize` ×4 across the
   demo. A real consumer could write every one of them. (The *resolution* of those specifiers is
   defective — F-6/F-7/F-8 — but the specifiers themselves are correct.)
2. **`mixStage.ts` is exemplary dogfooding.** `demo/workbenches/mix/MixAnimationCanvas/composables/mixStage.ts:15-17`
   pulls `lerp`/`clamp` from `@mkbabb/value.js/math`, `easeInOutCubic`/`easeOutCubic`/`smoothStep3`
   from `/easing`, `mixColors` from `/color` — no hand-rolled easing curve, no local lerp. This is
   what the rest of the tree should look like.
3. **The cross-feature import is through a declared surface.** `MixSourceSelector.vue:8` imports
   `PaletteCard, PaletteColorStrip` from `../../palettes/browser/card` — a real barrel
   (`demo/palettes/browser/card/index.ts`) with named-only re-exports and a comment explaining the
   no-star rule for side-effecting SFC styles. This is a legitimate published edge, not a reach into
   internals.
4. **`color-space-meta.ts` is correctly homed.** Its header records that `INTERPOLATION_SPACES` used
   to live inside `gradient/composables/useGradientInterpolation.ts` while Mix imported across
   feature trees, and that S.W5-6 · F16 moved it to a neutral home. That is the exact cure this
   report proposes elsewhere, already applied.
5. **`verbatimModuleSyntax` is honoured throughout the subtree.** Every type-only import in
   `MixPane.vue:13`, `useMixingState.ts:19-23`, `MixAnimationCanvas.vue:3,6`, `MixConfigBar.vue:12-15`,
   `MixResultDisplay.vue:7`, `mixStage.ts:19` uses `import type`. No violations.
6. **Vue 3.5 idioms are correct.** `useTemplateRef` at `MixAnimationCanvas.vue:18`, reactive props
   destructure with defaults at `MixResultDisplay.vue:20` and `MixAnimationCanvas.vue:8`,
   `toRef(() => prop)` for prop→ref bridging at `:22-25`. No `ref()` template refs, no `toRefs(props)`.
7. **No animation was deleted anywhere in the subtree.** The `vj-morph` / `vj-enter` transitions,
   the scroll-driven header choreography and the rAF convergence timeline are all intact; the
   one-clock law (`useMixingState.ts:5-15`) is genuinely enforced — the state machine owns no timer,
   and `settleMix` is its only forward edge.
8. **The rendered `/#/mix` surface is clean in the visual audit.** Across all four Safari matrices
   (`docs/tranches/V/megatranche/audit/visual/REPORT.md:123,138,153,168`): `overflowX 0`, `main 1`,
   `pageErr 0`, `consoleErr 0`, no blank/near-blank, `darkClassMissing 0`. The eight
   `smallTapTargets` on `safari-desktop-light /#/mix` are, per `REPORT.json`, one `input` (160×23)
   and the "Switch to slug" / "Generate new slug" / "Cancel" dock buttons (22×22) plus four 12×24
   channel spans labelled `L`/`A`/`B`/`ALPHA` — **all from the dock and the left-hand picker pane,
   none from MixPane**; `safari-mobile-*/#/mix`, where the picker is not mounted, reports 4, and 0
   nameless buttons. The single `namelessButtons` hit on desktop follows the same pattern (present
   on every route where the picker occupies the left slot — `/#/`, `/#/palettes`, `/#/gradient` —
   and absent on `/#/browse`), so it is not MixPane's. I read
   `shots/safari-desktop-light/mix.png` directly: the pane renders correctly — Colors/Palettes
   segmented tabs, the "Selected" well with its ghost drop target, Color Space / Hue Method selects
   reading OKLab / Shorter, and a correctly-disabled Mix button at zero selection.

---

## Findings index

| id | sev | family | finding | anchor |
|---|---|---|---|---|
| F-1 | MAJOR | A | N-ary mix is order-dependent — measured 120° hue divergence | `demo/palettes/mix.ts:39` |
| F-2 | MAJOR | B | Two clipboard impls + two serializers, divergent UX | `MixPane.vue:49` / `MixResultDisplay.vue:42` |
| F-3 | MAJOR | B | `MixResult` not a discriminated union → 11 masking guards | `useMixingState.ts:32` |
| F-4 | MAJOR | A | `Result` erased by throwing adapter; no failure surface | `picker-color.ts:104` |
| F-5 | MINOR | A | Space type 17-wide, UI offers 9 | `useMixingState.ts:44` |
| F-6 | MAJOR | C | `paths` forked from `exports`; 3 dead keys, 2 missing | `tsconfig.demo.json` |
| F-7 | MAJOR | C | Two resolution mechanisms in one file | `picker-color.ts:1,28` |
| F-8 | MAJOR | C | Undeclared frozen `value.js@4.0.0` in `node_modules`, differing `.d.ts` | `node_modules/@mkbabb/value.js` |
| F-9 | MAJOR | D | Shell→feature `Ref<any>` + `?.()` masks; dock Mix never disabled | `usePaneRouter.ts:107,220` |
| F-10 | MINOR | D | Child defines parent's scroll host, unscoped | `PaneHeader.vue:40` |
| F-11 | MINOR | B | `export/` (11 modules) test-only; `export.ts` is live | `demo/palettes/export*` |
| F-12 | MINOR | D | 4× duplicated pane chrome, 3 drifted variants | `MixPane.vue:61` |
| F-13 | MINOR | D | `demo/ui/` = 20 pure aliases; both paths in one file | `demo/ui/card/index.ts` |
| F-14 | MAJOR | D | `test/` imports `demo/`; `test/` in no tsconfig program | `test/mix-v4.test.ts:3` |
| F-15 | INFO | B | `PickerSpace`/`PickerColorIn` alias library types → double casts | `picker-color.ts:35` |
| F-16 | MINOR | D | Dead import; lint structurally blind to it | `MixPane.vue:2` |
| F-17 | INFO | D | 19-member port injected for one member | `MixPane.vue:16` |
