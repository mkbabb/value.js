# CHALLENGE-L — library structure · `demo/picker/controls/ComponentSliders/ComponentSliders.vue`

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context variant), the model this seat
was explicitly spawned with. The declaration is not inherited: it is the model named in my own
system context. Seat is DECLARED, not defaulted.

---

## Verdict — **DEFECTIVE**

The component's own 395 lines are competently written. The **structure underneath it is not**.
Ten defects, one of which is a **whole-application blank-page BLOCKER reproduced on the live dev
server**, and three of which are measured with numbers (21 eager allocations, 5 leaked detached
DOM nodes, a 25 239-byte barrel where 288 bytes suffice).

The single strongest charge: **the library is failure-explicit (`Result<T,E>`) and the demo's
boundary module throws that contract away at the first hop**, in root `setup()`, unguarded — so
one legal CSS Color 4 URL blanks the entire app.

### Pin verification — NO DRIFT

```
$ shasum -a 256 demo/picker/controls/ComponentSliders/ComponentSliders.vue
a61b5ed39703af205d6ba0f4923d32daeaaf55cf9c2e21e22030a01fa82ef327   ← matches CARRY-LEDGER §D
$ shasum -a 256 demo/workbenches/extract/ExtractControls.vue
71aa0a65873c367ae3ae393283d4e81bcfc9cbb57b6f232eec9f930264d46c28   ← matches CARRY-LEDGER §D
```

Both files this report's wave would touch are pinned receivers in the **glass BJ W4 / v8 Slider
post-cut consumer hold** (`CARRY-LEDGER.md:55-79`). Both hashes match. The hold's stated Value
authority is `c654824e…`; working-tree HEAD is now `7775473b` (docs-only commits since) — the
pinned files are byte-identical, so the authority statement still holds.

---

## Method

Everything below is a command I ran with its pasted output, a `file:line`, or a measured number.
Two hypotheses are labelled as such. Browser probes: 6 navigations total (parsimony edict).

---

## Findings

### L-1 · BLOCKER — the demo discards the library's `Result` contract at the boundary, and blanks the whole app

The library's own identity (`package.json:4`) is *"Immutable, **failure-explicit** CSS color…"*.
Every fallible operation returns `Result<T, E>`. `demo/color-session/picker-color.ts:104-107`
converts that, at the very first hop, into a **thrown exception**:

```ts
function valueOrThrow<T, E extends Readonly<{ code: string }>>(result: Result<T, E>): T {
    if (result.ok) return result.value;
    throw new PickerColorError(result.error.code);
}
```

`useColorPipeline.ts:74` then calls it in **root `setup()`**, unguarded:

```ts
const initHsv = convertPickerColor(model.value.color, "hsv");
```

CSS Color 4 `none` channels are legal and the library parses and preserves them:

```
$ node --input-type=module -e "import {parseCssColor} from './dist/subpaths/css.js';
  console.log(JSON.stringify(parseCssColor('oklch(none 0.2 30)')))"
{"ok":true,"value":{"space":"oklch","channels":["none",0.2,30],"alpha":1},"diagnostics":[]}

$ node ... convertColor(that,'oklch')  → {"ok":true,...channels:["none",0.2,30]}   (identity: none survives)
$ node ... convertColor(that,'rgb')    → {"ok":false,"error":{"code":"color_missing_channel"}}
```

`clampPickerColor` (`picker-color.ts:197`) explicitly passes `"none"` through, so the model
legitimately holds it. **Reproduction (live dev server, Playwright, chromium):**

```
$ node scratchpad/probe3.mjs "http://localhost:9000/#/?space=oklch&color=oklch(none%200.2%2030)"
PAGE-ERROR STACK:
PickerColorError: color_missing_channel
    at valueOrThrow      (demo/color-session/picker-color.ts:154:8)
    at convertPickerColor(demo/color-session/picker-color.ts:162:9)
    at useColorPipeline  (demo/color-session/useColorPipeline.ts:57:18)
    at setup             (App.vue:77:20)
    at callWithErrorHandling / setupStatefulComponent / mountComponent / patch
---
app innerText len: 0
body text sample:
sliders-console: 0   spectrum: 0
```

Screenshot: a flat `#b1748f` field — the FOUC-guard ground and **nothing else**. The application
does not mount. ComponentSliders never exists.

`demo/color-picker/ErrorBoundary.vue` cannot help: it is mounted **inside** `App.vue`'s own
template (`App.vue:50`, closing `:140`), and `onErrorCaptured` in a descendant can never catch a
throw in its own ancestor's `setup()`. The boundary is structurally incapable of catching the one
crash that matters.

The **input path is guarded** (`useColorParsing.ts:39-44, 63-84` wrap the same calls in
`try/catch`), and `useColorUrl.applyUrlToModel` is guarded (`useColorUrl.ts:44`). Only the
**boot/hydrate** path is bare. So this is precisely a *shared-link* failure: the URL the app
itself writes is safe, but any hand-edited or third-party-authored deep link with a `none`
channel is a blank page for the recipient.

**Mechanism.** The ownership is inverted. The library owns *"this may fail, here is why"*; the
demo bridge owns *"convert that to an exception"*; and the demo shell owns *no recovery at all*.
Three modules, and the error contract dies between the first and second.

**Cure (architectural, not a patch).** `picker-color.ts` stops being a throw-site. Its public
surface returns `Result` unchanged — the library already ships the type. `useColorPipeline`
accepts a `Result` at hydrate and, on `!ok`, seeds the documented default color and surfaces the
diagnostics through the existing status-lamp channel. `valueOrThrow` is deleted, not relocated.
Independently, `ErrorBoundary` moves **above** `App.vue` (wrap `<App/>` at the `createApp` mount
site in the boot entry), which is the only position from which it can catch a root-setup throw.

> Note for the megatranche: this is the same signature as CARRY-LEDGER §F's *"gh-pages
> prod-preview empty-mount"* carry, flagged there as the first deep-audit probe. This report does
> not claim they are the same instance — it establishes that **at least one** blank-mount path
> is a bare root-setup throw from a discarded `Result`.

---

### L-2 · MAJOR — `demo/ui/**` is 19 pure alias barrels; the component imports the design system through them, and the same folder imports it three other ways

`ComponentSliders.vue:95-96`:

```ts
import { Card } from "../../../ui/card";
import { Slider } from "../../../ui/slider";
```

Those files, in full:

```ts
// demo/ui/card/index.ts   (1 line)
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@mkbabb/glass-ui";
// demo/ui/slider/index.ts (1 line)
export { Slider } from "@mkbabb/glass-ui";
```

Census of all 19 directories under `demo/ui/`: **19 of 19 contain exactly one `index.ts`, zero
`.vue` files, and 18 of 19 are a single `export … from "@mkbabb/glass-ui"` line** (the 19th,
`input`, re-exports `@mkbabb/glass-ui/forms`). There is not one line of local implementation,
one local prop, one local style, or one added semantic in the entire tree.

This is an **alias layer with no encapsulation** — a direct violation of owner edict 2 (*no
aliases, no dual paths*), edict 3 (*KISS, no contrivance — no wrapper components that do not
already exist*), and the letter of edict 4 (*variants belong in glass-ui, not in `demo/ui/`*).

It is not merely inert. Measured import census across `demo/`:

| idiom | sites |
|---|---|
| `…/ui/<name>` alias barrel | **92** |
| `@mkbabb/glass-ui` root barrel | **37** |
| `@mkbabb/glass-ui/<subpath>` granular | **68** |

**Three live idioms for importing one design system.** The collision is not theoretical — it
occurs *inside this component's own folder, three lines apart*, in `ConsoleRail.vue:5-12`:

```ts
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../ui/tooltip";
import { WatercolorDot } from "@mkbabb/glass-ui/watercolor-dot";
import { useGlobalDark }  from "@mkbabb/glass-ui/dark";
import { useBreakpoint }  from "@mkbabb/glass-ui/dom";
```

And the barrel routes through the **wrong glass entry**. glass-ui 7.0.0 publishes 70 export keys
including first-class `./card` and `./slider`; `demo/ui/*` imports the root `.` instead:

```
$ ls -la node_modules/@mkbabb/glass-ui/dist/{glass-ui,card,slider}.js
     25239  glass-ui.js      ← what `demo/ui/card` + `demo/ui/slider` pull in
       217  card.js          ← the granular entry that exists
        71  slider.js
$ ls -la node_modules/@mkbabb/glass-ui/dist/{index,card,slider}.d.ts
      2913  index.d.ts
        35  card.d.ts
        37  slider.d.ts
```

**25 239 bytes of entry surface for 288 bytes of intent — an 87× larger runtime entry module and
a 40× larger declaration entry**, per import site, for the two symbols this component uses.

**Cure.** Delete `demo/ui/**` entirely (19 directories, 92 import sites rewritten). Every consumer
imports the granular glass subpath directly — `@mkbabb/glass-ui/card`, `@mkbabb/glass-ui/slider`.
One idiom, zero indirection, the smallest correct entry. This is the edict-4 posture stated
plainly: there is no demo design system, there is glass-ui.

---

### L-3 · MAJOR — the demo's value.js typecheck resolves through TWO different mechanisms; the `paths` map has drifted 3 dead keys and 2 missing keys off the `exports` map

`ComponentSliders.vue:98` is the component's only library import:

```ts
import { clamp } from "@mkbabb/value.js/math";
```

`clamp` **is** genuinely published (`src/subpaths/math.ts:12`), and `vite.config.ts:44-52`
generates the runtime aliases from `package.json#exports` so the alias set cannot drift. That half
is sound. The **typecheck** half is not.

`package.json` `exports` has **7 keys**: `./color ./value ./css ./easing ./math ./transform
./quantize`. `tsconfig.demo.json` `paths` has **8**, and they do not agree:

| tsconfig `paths` key | in `exports`? | target file exists? |
|---|---|---|
| `@mkbabb/value.js` (root) | **NO** | **NO** — `dist/index.d.ts` absent |
| `@mkbabb/value.js/parsing` | **NO** | **NO** — `dist/subpaths/parsing.d.ts` absent |
| `@mkbabb/value.js/units` | **NO** | **NO** — `dist/subpaths/units.d.ts` absent |
| `/color /math /easing /transform /quantize` | yes | yes |
| `/css` | yes | **MISSING from paths** |
| `/value` | yes | **MISSING from paths** |

The consequence, from `tsc --traceResolution` — **two different resolution mechanisms, on two
adjacent lines of the same file** (`demo/color-session/picker-color.ts:27` and `:34`):

```
======== Resolving module '@mkbabb/value.js/color' from '…/demo/color-session/picker-color.ts'.
'paths' option is specified, looking for a pattern to match module name '@mkbabb/value.js/color'.
Module name '@mkbabb/value.js/color', matched pattern '@mkbabb/value.js/color'.
Trying substitution './dist/subpaths/color.d.ts' …
======== …successfully resolved to '…/dist/subpaths/color.d.ts'. ========          ← paths substitution

======== Resolving module '@mkbabb/value.js/css' from '…/demo/color-session/picker-color.ts'.
'paths' option is specified, looking for a pattern to match module name '@mkbabb/value.js/css'.
Found 'package.json' at '/Users/mkbabb/Programming/value.js/package.json'.
Entering conditional exports.
Matched 'exports' condition 'types'.
Using 'exports' subpath './css' with target './dist/subpaths/css.d.ts'.
======== …resolved with Package ID '@mkbabb/value.js/dist/subpaths/css.d.ts@4.0.0'. ========
                                                                    ← real exports-map resolution
```

`tsconfig.demo.json`'s own header calls itself *"the T.W1 demo-dogfood keystone… the demo speaks
only the 8 public keys"*. It does not. **5 of 7 subpaths — including the one this component uses —
short-circuit the `exports` map entirely.** A break in `package.json#exports` for `./math`,
`./color`, `./easing`, `./transform` or `./quantize` would not be caught by `npm run typecheck`.
The dogfood proof is false for 5/7 of the public surface, and the drift (3 dead entries naming a
`parsing`/`units`/root API that no longer exists) proves nobody re-derives the list.

There is also a **live artifact skew** between the two copies TypeScript can reach. A registry
`@mkbabb/value.js@4.0.0` is installed in `node_modules` as a transitive dependency of both
glass-ui and keyframes.js (`npm ls @mkbabb/value.js`). Comparing it to this checkout's `dist`:

```
$ for s in color value css easing math transform quantize; do … shasum -a256 … ; done
color     SAME       easing    SAME       transform SAME
value     SAME       math      SAME       quantize  SAME
css       SKEWED     local=ded101dc54ef   installed=c81d095213d1     (41 diff lines)
```

The skew is a `rollupTypes` duplicate-declaration artifact (`Color_2`/`Channel_2`/`SpaceId_2`
shadow copies present locally, absent in the published build). Today TS lands on the *local*
copy because self-reference finds the repo-root `package.json` first — but that is an accident of
CWD, not a guarantee, and it means the published `.d.ts` and the locally-built `.d.ts` **are not
byte-identical for `./css`**, which is itself a library-build defect.

**Cure.** Delete `paths` for `@mkbabb/value.js*` from `tsconfig.demo.json` entirely. Self-reference
through `exports` already works — it is demonstrably the mechanism that resolves `./css` and
`./value` today, and it is the mechanism a real consumer uses. One resolution path, generated from
one source, for both `vite` and `tsc`. Separately, fix `rollupTypes` so `dist/subpaths/css.d.ts`
emits no `_2` shadow declarations.

---

### L-4 · MAJOR — `sliderWrapperEls` leaks detached DOM; measured 5 retained subtrees after 8 space switches

`ComponentSliders.vue:56`:

```vue
:ref="(el: any) => { if (el) sliderWrapperEls[component] = el as HTMLElement }"
```

Vue invokes a template ref function with `null` on unmount. The `if (el)` guard **skips the
delete**, so the map only ever grows. Because the map is keyed by the *bare* channel letter
(`r`, `a`, `b`, `l`, `h`, …) and those letters are reused across the 17 spaces, a space change
overwrites the shared keys and **strands the non-shared ones pointing at detached reka
`SliderRoot` subtrees, for the lifetime of the page**.

Measured on the live dev server by reading the component's own `setupState`:

```
initial:                    {"gateCount":21,"mapKeys":4,"keys":["l","a","b","alpha"],
                             "detached":0,"liveSliders":4}
after 8 space switches:     {"gateCount":21,"mapKeys":9,"keys":["l","a","b","alpha","r","g","c","h","w"],
                             "detached":5,"detachedKeys":["a","b","r","g","w"],"liveSliders":4}
```

**9 map entries for 4 live sliders; 5 hard references to detached DOM.**

Two consumers then iterate the poisoned map on every tick:

- `useSliderTouchGates.ts:53` `attachSliderListeners()` runs on every space change and binds
  **five** listeners (`pointerdown` capture, `touchmove`, `touchend`, `pointercancel`,
  `lostpointercapture`) to each entry — including the detached ones.
- `useSliderAnnouncements.ts:37` `apply()` runs on **every value edit** and does a
  `querySelector('[role="slider"]')` + `setAttribute` per entry — 9 DOM queries where 4 are live,
  and computes `sliderValueText(space, "a", …)` for a channel that does not exist in the current
  space.

**Mechanism.** The map is a manual mirror of the render tree's identity, hand-maintained by a
callback that implements only half the contract. The render tree already knows which channels are
live; the map re-derives it and gets it wrong.

**Cure.** Delete the map. The strips are a `v-for` over a known list — bind a single
`useTemplateRef` array (Vue 3.5's array-ref form), which Vue itself keeps in exact
correspondence with the rendered rows. Zero manual bookkeeping, zero strand-by-construction.

---

### L-5 · MAJOR — 21 `useTouchGate()` instances eagerly allocated; at most 4 are ever live

`useSliderTouchGates.ts:31-40` builds the union of every channel key across all 17 color spaces
and instantiates one glass-ui touch gate per key, at setup, unconditionally:

```ts
const ALL_COMPONENTS = new Set([
    ...Object.values(PICKER_CHANNELS).flatMap((channels) => channels.map(({ key }) => key)),
    "alpha",
]);
for (const comp of ALL_COMPONENTS) sliderGates[comp] = useTouchGate();
```

Measured: `gateCount: 21`, `liveSliders: 4` (probe output in L-4). **17 gates — each with its own
refs and timer machinery — are permanently idle.** They are allocated on every mount of the
picker, on every device, including the mobile matrix.

Worse, the union-by-bare-key is a **semantic collision by construction**: `b` is simultaneously
sRGB *blue*, HWB *blackness*, Lab *b-axis* and OKLab *b-axis*; `a` is Lab and OKLab *a-axis*.
They share one gate object. It is benign only because exactly one space renders at a time — an
invariant nothing enforces.

**Cure.** Gates are per *rendered strip*, not per *conceivable channel*. Create them inside the
strip abstraction (see L-4's cure), keyed by the strip's identity, disposed with it. The
`PICKER_CHANNELS`-union import disappears from this composable entirely.

---

### L-6 · MAJOR — the component owns an unscoped global style for three other components, and it is silently overridden on the one that matters

`ComponentSliders.vue:238` opens `<style>` — **not** `<style scoped>` — deliberately. Its own
comment (`:243-247`) states the intent: reach `SpectrumCanvas`, `ExtractControls` and
`PointerDebug`. A leaf component thereby owns the styling of three siblings it does not contain.

That is the module-boundary inversion. It also **does not work.** Measured on `/#/`:

```
$ node scratchpad/probe4.mjs
/  {"present":true,"outlineWidth":"3px","outlineStyle":"solid",
    "transition":"box-shadow",                       ← NOT outline-color
    "borderRadius":"12px",
    "cls":"spectrum-picker flex w-full … touch-gate-target"}
```

`ComponentSliders.vue:256` declares `transition: outline-color var(--duration-normal)
var(--ease-standard)` at specificity (0,1,0). `SpectrumCanvas.vue`'s **scoped** rule
`.spectrum-picker[data-v-ad23e00d] { … transition: box-shadow … }` is (0,2,0) and wins
deterministically. **The gate-activation fade ComponentSliders exports is dead on its principal
consumer — the outline snaps.** An unscoped rule cannot reach past a scoped one; the mechanism
was doomed at authorship.

And there are **two homes for the class**. CSSOM enumeration on `/#/extract`:

```
=== /extract (8 rules) ===
  .touch-gate-target { outline: transparent solid 3px; outline-offset: 1px;
                       transition: outline-color …; }                    ← ComponentSliders, unscoped
  .touch-gate-target:has(.slider-track) { border-radius: var(--radius-pill); }
  .touch-gate-target.touch-gate-active  { outline-color: color-mix(…); }
  .touch-gate-target[data-v-bfbc09b0]   { border-radius: var(--radius-pill); }  ← ExtractControls, scoped
```

`ExtractControls.vue:139-142` re-declares `.touch-gate-target`. Two implementations of one
concept, in two SFCs, one scoped and one not — a textbook edict-2 dual path.

**Cure.** `.touch-gate-target` / `.touch-gate-active` are a **global interaction affordance**, so
they belong in the global sheet: one block in `demo/styles/`, owned by nobody's component. Delete
the unscoped block from `ComponentSliders.vue` and the duplicate from `ExtractControls.vue`. The
`transition` then lands at the same cascade level as everything else and actually animates. This
also satisfies edict 6 (the animation is *moved*, never deleted).

---

### L-7 · MAJOR — `controls/` reaches into `display/`'s private internals for a concept neither owns

`ComponentSliders.vue:100`:

```ts
import { readoutDecimals } from "../../display/ColorComponentDisplay/readoutReservation";
```

`readoutReservation.ts` is, by its own 40-line docblock, a **typography line-packing table** —
`ch` extents, `DOT_CH = 0.45`, `SIGN_CH = 0.65`, greedy line-count derivation, a fit coefficient.
It is a private implementation file inside a *different feature folder* (`display/`), reached
from `controls/` by a `../../` traversal.

The concept borrowed — *"how many decimals does a channel of space S carry"* — is a property of
the **color space**, not of a readout's width reservation. The signature proves the module knows
it does not own the concept:

```ts
export function readoutDecimals(space: string, _component: string): number {
    return INTEGER_LEAST_COUNT.has(space) ? 0 : 1;
}
```

`_component` is **declared and ignored**. The API advertises per-channel granularity it does not
have, and both call sites (`ComponentSliders.vue:169`, `ColorComponentDisplay.vue:108`) pass a
component argument that is discarded.

The docblock compounds it (`readoutReservation.ts:24-25`): *"STATIC, derived at module scope from
the library's own `COLOR_SPACE_RANGES` + `COLOR_SPACE_DENORM_UNITS`"*. Neither symbol exists:

```
$ grep -rn "COLOR_SPACE_RANGES\|DENORM_UNITS" src/
(no output)
```

The module actually derives from the **demo's** `PICKER_CHANNELS` (`readoutReservation.ts:43`).
The comment names a dead pre-4.0 library API.

**Cure.** `leastCount(space)` moves to `demo/color-session/` beside `PICKER_CHANNELS` — or better,
into the library (see L-8), where the space taxonomy already lives. `readoutReservation.ts` then
*consumes* it like everyone else and shrinks to the `ch`-packing table it claims to be. The
`controls/ → display/` edge is deleted, not redirected. The unused `_component` parameter goes
with it.

---

### L-8 · MAJOR — the library owns the space taxonomy but not the channel domain, so the demo re-declares it, and one constant now has two homes

The library exports `SpaceId`, `ChannelsBySpace`, and 17 constructors, but **no metadata about a
channel's legal range or unit** (`src/subpaths/color.ts` — full surface read; no range export).
So the demo re-derives all of it by hand: `picker-color.ts:52-70`, 17 spaces of literal
`min`/`max`/`unit`, with `satisfies Record<SpaceId, readonly ChannelMeta[]>` as the only tie back
to the library.

That knowledge is what makes a slider possible. `ComponentSliders.vue:131` calls
`normalizedChannel(color, component)` → `picker-color.ts:160-163` → `(value - meta.min) /
(meta.max - meta.min)`. **The entire normalization domain of the app's primary control is demo
knowledge the library declines to publish.**

The duplication is already live and drift-capable:

| constant | library home | demo home |
|---|---|---|
| kelvin ∈ [1000, 40000] | `src/color/model.ts:91` (validates, rejects outside) | `demo/color-session/picker-color.ts:62` (`min: 1000, max: 40000`) |

Two homes, two packages, no shared source. They agree today by coincidence. Widen the library's
kelvin guard and the demo slider silently misnormalizes with no test, no type error, no signal.
The other 16 spaces' domains have **no** library counterpart at all, so nothing checks them.

**Cure (architectural transposition).** The library gains one small export — a `ChannelSpec`
table under `./color`:

```ts
export type ChannelSpec = Readonly<{ key: string; min: number; max: number;
                                     unit: "" | "%" | "deg" | "K"; hue?: true; leastCount: 0 | 1 }>;
export const CHANNELS: Readonly<Record<SpaceId, readonly ChannelSpec[]>>;
```

It is the natural home: the library already owns `SpaceId` and `ChannelsBySpace`, and
`model.ts:91` already enforces one of the bounds. `PICKER_CHANNELS` becomes a re-export;
`readoutDecimals` becomes `spec.leastCount`; the kelvin bound has one home; and any *real*
consumer building a color slider gets the same table instead of re-typing 51 numbers.

---

### L-9 · MINOR — `valueDomain.ts` is a 3-line alias whose 30-line docblock describes a deleted architecture

`demo/color-session/valueDomain.ts:47-49`, the entire executable content:

```ts
export const clampColorToSpaceDomain = (color: PickerColor): PickerColor => clampPickerColor(color);
```

A pure rename of `clampPickerColor`, with two call sites (`useColorPipeline.ts:51, 67`). Owner
edict 2 forbids aliases outright.

Its 46-line preamble cites `COLOR_SPACE_RANGES`, `getColorSpaceBound`, and
`src/units/color/conversions/kelvin.ts`. None exist:

```
$ ls src/
color  css  easing.ts  foundation  quantize.ts  subpaths  transform  value.ts  vite-env.d.ts
$ ls src/units
ls: src/units: No such file or directory
```

The file is a tombstone for a mechanism that was replaced. The doc is load-bearing misinformation:
it is the reason `readoutReservation.ts:26` also cites `getColorSpaceBound` (L-7).

**Cure.** Delete the file; call `clampPickerColor` directly. Move the *surviving, true* paragraphs
(the hue-wrap rule; the kelvin-is-physical rule) into `clampPickerColor`'s own docblock, where
they describe live code. `test/value-domain-clamp.test.ts` exists and re-points to the real name.

---

### L-10 · MINOR — `componentEntries` builds a tuple whose second element is never read, via two `unknown` casts

`ComponentSliders.vue:120-125`:

```ts
const componentEntries = computed(() =>
    [
        ...PICKER_CHANNELS[currentColorSpace.value].map((meta) => [meta.key, meta] as [string, unknown]),
        ["alpha", { key: "alpha", min: 0, max: 1, unit: "%" }] as [string, unknown],
    ],
);
```

Both consumers discard the second element — `:34` `componentEntries.map(([c]) => c)` and `:52`
`v-for="[component] in componentEntries"`. The `meta` payload is never read. The two
`as [string, unknown]` casts exist solely to type a shape nobody consumes, and in doing so they
**erase `ChannelMeta`** — the one place the component could have obtained `min`/`max`/`unit`
without the L-7 cross-feature import.

**Cure.** `componentEntries` becomes `computed<string[]>(() => [...PICKER_CHANNELS[space].map(m
=> m.key), "alpha"])`. Both casts and the synthetic alpha object disappear. If the meta is wanted
later, keep it *typed* (`ChannelMeta`), never `unknown`.

---

## Negative proofs — checked, and SOUND

Recording these so the seat's silence is not mistaken for an unexamined area.

1. **`@mkbabb/value.js/math` is a genuine published specifier.** `./math` is in `package.json`
   `exports`; `clamp` is exported by `src/subpaths/math.ts:12`; `dist/subpaths/math.d.ts` is
   byte-identical to the registry-published 4.0.0. A real consumer can write this import verbatim.
   The component commits **no deep-path violation into `src/`** — `grep -rn '@src' demo/picker/`
   returns nothing.

2. **No `src/` internal is reachable from `demo/`.** All 51 value.js specifiers in `demo/` are
   subpath imports (`/color` 25, `/css` 10, `/math` 6, `/easing` 5, `/quantize` 4); the single
   bare `@mkbabb/value.js` hit is prose inside a comment (`demo/shared/utils.ts:12`), not an
   import. The T.W1 dogfood posture holds at the *specifier* level (its failure is at the
   *resolution* level — L-3).

3. **The three-parallel-`useDark` suspect is CLOSED.** `useMarkdownHighlighting.ts:76-80` records
   that S.W4-8 killed its private vueuse instance; `ConsoleRail.vue:11` uses
   `useGlobalDark` from `@mkbabb/glass-ui/dark`, the single authority provided at `App.vue`.
   One store. No finding.

4. **The `--slider-*` tokens the component feeds are the producer's real public seam.** All three
   of `--slider-track-bg`, `--slider-thumb-bg`, `--slider-thumb-border-color` appear in glass-ui's
   own shipped `dist/glass-ui.css` token set (15 `--slider-*` customs total). The component is
   driving the documented API, not inventing one.

5. **`verbatimModuleSyntax` is satisfied.** Every one of the 10 imports in
   `ComponentSliders.vue:94-105` binds a runtime value; there is no type-only import to mark. The
   colocated composables comply too (`useSliderAnnouncements.ts:19-21`, `useSliderTouchGates.ts:13,16`
   all use `import type` / inline `type`).

6. **The happy path renders correctly.** `shots/safari-mobile-dark/picker.png` (read): four strips
   (L / a / b / α), rail letters, correct perceptual ramps, alpha checker under the α ramp, meters
   `92.0%` `88.8` `20.0` `82.7%` at the per-space least count, thumb positions consistent with the
   Lab domains ((88.8 + 125)/250 = 0.855 ⇒ thumb at ~85%). No layout defect. The visual audit
   REPORT records **0 blankOrNearBlank and 0 pageErrors** across all 60 captures — which is exactly
   why L-1 matters: the matrix has **no query-parameter states**, so the entire deep-link state
   space is invisible to it.

---

## The greenfield lattice

Stated concretely, as asked — what the module graph would be with no legacy.

```
@mkbabb/value.js ─ the library (unchanged posture: immutable, Result-typed)
  ./color      Color algebra, SpaceId, constructors, conversions
               + CHANNELS: Record<SpaceId, readonly ChannelSpec[]>          ← NEW (L-8)
                 {key, min, max, unit, hue?, leastCount}
                 THE one home for a channel's domain and its least count.
  ./css        parse / serialize — Result in, Result out
  ./math ./value ./easing ./transform ./quantize

demo/
  color-session/                    ← the session domain. No Vue in the pure files.
    picker-color.ts                 Result-preserving bridge. NO valueOrThrow. (L-1)
                                    PICKER_CHANNELS = re-export of CHANNELS.  (L-8)
    format.ts                       formatChannel(space, key, v) — reads spec.leastCount (L-7)
    pipeline.ts                     hydrate(Result) → seeded default on !ok, diagnostics surfaced
    keys.ts                         ALL injection keys, one home

  picker/
    controls/
      ChannelConsole/               ← renamed: the console is the unit, not "sliders"
        ChannelConsole.vue          template + wiring only, target ≤140 LoC
        ConsoleRail.vue
        useChannelStrips.ts         strips = ref array via useTemplateRef (L-4)
                                    one touch gate per LIVE strip (L-5)
                                    sliderVars / meterText / announcements
      plateLuma.ts                  (was controls/spectrumLuma.ts — neither consumer is a slider)

  styles/
    touch-gate.css                  ← the global gate affordance, ONE home (L-6)

  ui/                               ← DELETED. 19 dirs, 92 sites. (L-2)

  boot/
    main.ts                         createApp(ErrorBoundary(App)).mount()   ← boundary ABOVE App (L-1)
```

Four transpositions carry the elegance, and each is a deletion:

1. **Delete `demo/ui/**`** — 19 directories, 92 rewritten imports, one idiom survives, the entry
   module shrinks 87×.
2. **Delete `sliderWrapperEls` and the 21-gate union** — the render tree already holds the
   identity; stop mirroring it.
3. **Delete `valueOrThrow`** — the library's `Result` is the contract; propagate it instead of
   converting it to an unhandled throw in root setup.
4. **Delete the demo's copy of the channel domain** — publish it once, from the package that
   already owns the space taxonomy.

The performance gain is not incidental: 17 fewer allocations per mount, 5 fewer retained DOM
subtrees per 8 space switches, ~25 KB less entry graph per glass import site, and 9→4 DOM writes
per value edit.

---

## Proposed wave — **BLOCKED-ON-GLASS-V8**

**Status: BLOCKED. No source edit lands from this formation** (standing law), and independently,
two of the touched files are pinned consumers under an active hold.

### Blocked half (must wait)

Everything that edits `ComponentSliders.vue` (pin `a61b5ed3…`) or `ExtractControls.vue`
(pin `71aa0a65…`):

- **L-2** removing `../../../ui/card` + `../../../ui/slider` from `ComponentSliders.vue:95-96`
- **L-6** removing the unscoped `<style>` from `ComponentSliders.vue:238-395` and the duplicate
  from `ExtractControls.vue:139-142`
- **L-7** removing the `readoutReservation` import at `ComponentSliders.vue:100`
- **L-10** the `componentEntries` simplification at `ComponentSliders.vue:120-125`
- Any migration of the `--slider-track-bg` feed at `ComponentSliders.vue:197`

**Exact release condition** (quoted from `CARRY-LEDGER.md:55-79`, unmodified):

> Against Value authority `c654824e0b252cda7f8490b67f182a48c48cc0ed`, hold all consumer edits and
> the `@mkbabb/glass-ui` pin until **one unique immutable v8 candidate proves exact
> source→built→packed→installed→served equality, is neither a workspace/source link nor mutable
> v7, and survives two unchanged-byte Sol critics.** Then migrate **only the property name** to
> the inheriting CSS-`background` seam `--glass-slider-track-background` in the four pinned
> receivers … Preserve the perceptual/alpha-checker ramps, ancestor-fed certified `--ink-muted`,
> transparent K/count underlays, kC `trackInk`, orientation/RTL/inversion and existing pixels;
> **add no `--track-bg`, v7 alias, copied CSS or local mask.**

Formation packets that must bind: emitter `3547c78b…`, gate/package `458e5198…`, synthesis
`1b8719a0…`. Glass is currently producer/package/browser **RED**.

Additionally, three cures in this report are properly **glass-ui-side** work and should ride the
same v8 conversation rather than being re-implemented in the demo (edict 4):

- the `Slider variant="spectrum"` should own the coarse-pointer ≥44px hit extension
  (`ComponentSliders.vue:345-357`), the `cursor: grab / grabbing` grammar (`:363-383`) and the
  centre-notch needle (`:384-394`). All three currently reach past the producer's public API into
  **reka-ui's private DOM classes** (`.slider-track`, `.slider-thumb`) from a consumer SFC — the
  deepest boundary violation in the file, and unfixable from this side.
- `Slider` still exposes **no `aria-valuetext` prop**, which is the sole reason
  `useSliderAnnouncements.ts` exists as a DOM-poking workaround (its own docblock, `:4-8`,
  records this as the standing producer RELAY). Fold it into the v8 ask.

### Unblocked half (may proceed independently — touches no pinned file)

These are the highest-severity findings and **none of them requires editing a held file**:

| # | file(s) | change |
|---|---|---|
| **L-1** | `demo/color-session/picker-color.ts`, `useColorPipeline.ts`, boot entry | delete `valueOrThrow`; propagate `Result`; hoist `ErrorBoundary` above `App.vue` |
| **L-3** | `tsconfig.demo.json`, `vite.config.ts` (dts) | delete the `@mkbabb/value.js*` `paths` block; fix `rollupTypes` `_2` shadow decls in `css.d.ts` |
| **L-4/L-5** | `.../ComponentSliders/composables/useSliderTouchGates.ts`, `useSliderAnnouncements.ts` | array `useTemplateRef`; per-live-strip gates |
| **L-8** | `src/color/`, `src/subpaths/color.ts`, `demo/color-session/picker-color.ts` | publish `CHANNELS`/`ChannelSpec`; demote `PICKER_CHANNELS` to a re-export |
| **L-9** | `demo/color-session/valueDomain.ts` | delete; retarget 2 call sites + the test |

**Born-RED gate for the wave.** A test that navigates to
`http://localhost:9000/#/?space=oklch&color=oklch(none 0.2 30)` and asserts
`document.querySelector("#app").innerText.length > 0` with **zero page errors**. It is RED today
(measured: `innerText len: 0`, `PickerColorError: color_missing_channel`). The visual-audit matrix
should gain query-parameter states at the same time — its 60 captures found 0 page errors precisely
because it never exercised one.

---

## Strongest defect

**L-1.** The library declares itself failure-explicit and returns `Result<T,E>` from every fallible
operation. `demo/color-session/picker-color.ts:104-107` converts that to a thrown exception at the
first hop; `useColorPipeline.ts:74` calls it in root `setup()` with no guard; `ErrorBoundary` sits
one level too low to catch it. One legal CSS Color 4 deep link — `oklch(none 0.2 30)` — therefore
renders a **completely blank application**, reproduced live with a pasted stack trace and a
screenshot of an empty page. Everything else in this report is structure; this one is the product
failing.
