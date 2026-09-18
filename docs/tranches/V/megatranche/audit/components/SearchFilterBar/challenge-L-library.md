# CHALLENGE-L — library structure · `demo/palettes/browser/search/SearchFilterBar.vue`

## PASS 5 (2026-07-29) — read this header first

Four CHALLENGE-L seats preceded me on this axis. **I overwrote none.** All four are preserved
verbatim:

    challenge-L-library-pass1-c654824e.md   (42 745 B · 12-row ledger · HEAD c654824e · browser)
    challenge-L-library-pass2-80fc5c40.md   (31 870 B ·  8-row ledger · HEAD 80fc5c40 · no browser)
    challenge-L-library-pass3-f36f780c.md   (25 006 B ·  6-row ledger · HEAD f36f780c · browser)
    challenge-L-library-pass4-9268f054.md   (25 059 B ·  4-row ledger · HEAD 9268f054 · browser)

This is the **fifth pass**. I derived the axis independently from the source before reading any
predecessor, then reconciled. My independent derivation **re-found** passes 1–4's core almost
row-for-row — the `demo/ui/` shim, the `:checked` Checkbox miswiring, the `/^#[0-9a-f]{6}$/i`
gate, the client/server colour-filter duplication, the hand-rolled HSV engine, the
`tsconfig.demo.json` `paths` drift, the inert G-DEMO eslint boundaries. That convergence is itself
evidence: five independent derivations agree, so **the confirmed core is not an artifact of any one
seat's reading**. I record my re-verification in §6 and add nothing to those rows.

What is below is only what is **new**: four findings, all of them *missing-or-ignored public
surface* — the half of the challenge-L brief ("wrong public surface") the prior passes measured the
consequences of without naming the cause.

The headline: **the published `@mkbabb/value.js` surface cannot write a hex colour.** Pass 2
measured that the demo's two colour engines disagree on 12–27 % of the HSV grid and listed four
homes for "→ hex". None of the four passes observed that the library — a CSS colour library whose
own parser accepts `#rrggbb` — publishes no function that emits one. That single missing export is
why the fork exists, why glass-ui (a *downstream consumer*) carries `oklchStopToHex`, and why the
cure passes 1 and 2 propose ("delete both conversions, route through the library") is currently
**not writable** without a `toString(16)` at the call site.

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model id `claude-opus-5[1m]` — the tier this
seat was spawned with. Declared, not inherited. No seat defect.

## Substrate

- **HEAD at this pass: `d19da6d3`** (`docs(V·mega): 3:30am wall harvested — 233/243 axes banked …`).
  Not the `c654824e` in my work order; the branch has advanced four times under this axis. The
  subject file is byte-identical across all five substrates and every line number cited by all five
  passes still resolves.
- No browser probe was needed for any pass-5 finding: all four are decided by the published
  artifacts (`package.json#exports`, `dist/`, `node_modules/@mkbabb/glass-ui/dist/styles/`) and by
  executing the shipped library directly under Node. I ran the library, not the app.
- Every command below was run from `/Users/mkbabb/Programming/value.js` and its output is pasted
  unedited.

**Verdict: DEFECTIVE.** Confirming all four predecessors; four new findings, one of which
(LP5-1) is a precondition for the cure passes 1 and 2 already prescribed.

---

## §1 · Ledger — pass 5 only

| id | sev | defect | status vs passes 1–4 |
|---|---|---|---|
| LP5-1 | **MAJOR** | **NEW** — the published surface has **no hex writer**. `serializeCssColor` emits 8 notations and omits hex; `grep "toString(16)" src/` returns **0**. The library parses `#4488cc` and cannot print it. This is the *cause* of pass 1's L-6 / pass 2's LP2-4 fork and of glass-ui carrying `oklchStopToHex` | no pass names the missing export; `serializeCssColor` appears in **zero** of the four |
| LP5-2 | MINOR | **NEW** — `colorToHexString` (`color-model.ts:61`) is a zero-value pass-through alias over `pickerColorToHex` (`picker-color.ts:213`) with **5 consumers to the implementation's 1**, carrying a doc comment that misstates the contract. A live legacy alias — owner edict 2 | no pass mentions `colorToHexString` |
| LP5-3 | MINOR | **NEW** — the subject's `.filter-option` is a **byte-identical, lossy re-declaration** of glass-ui's published `.interactive-item`. The published recipe is imported (`foundation.css:56`) and used **zero** times in demo code. Three spellings of one hover rule exist and **two of them render different colours** (`in srgb` vs Tailwind-4's `in oklab`) | no pass mentions `.interactive-item`; refines LP3-1's dead focus ring by naming the recipe that carries it |
| LP5-4 | INFO | **NEW mechanism** — `color-utils.ts` is a **partial facade**: 3 of `picker-color.ts`'s 20 exports, and it omits precisely `pickerColorToHex`. The subject imports the facade at `:145`; its child needed hex; the facade did not carry it; the child re-rolled it. Refines LP2-5 — the spine's defect is not "no barrel", it is a facade that silently omits | LP2-5 counts barrels; no pass reads the facade's contents |

---

## §2 · LP5-1 · MAJOR · NEW — the published surface cannot write a hex colour

### The claim

`@mkbabb/value.js` is described in its own `package.json` as *"Immutable, failure-explicit CSS
color, value, easing, transform, math, and quantization capabilities."* Its parser accepts hex. Its
serializer cannot emit hex. There is no hex writer anywhere in `src/`.

### Evidence — the serializer's complete switch

`src/css/grammar.ts:289-311`, the whole of `serializeCssColor`:

```ts
export function serializeCssColor(color: CssColor): Result<string, ColorIssue> {
    …
    switch (color.space) {
        case "rgb":   return ok(`rgb(${format(a)} ${format(b)} ${format(c)}${alpha})`);
        case "hsl":   return ok(`hsl(…)`);
        case "hwb":   return ok(`hwb(…)`);
        case "lab":   return ok(`lab(…)`);
        case "lch":   return ok(`lch(…)`);
        case "oklab": return ok(`oklab(…)`);
        case "oklch": return ok(`oklch(…)`);
        case "xyz":   return ok(`color(xyz …)`);
        default:      return ok(`color(${color.space} …)`);
    }
}
```

Eight notations. No hex branch. It takes **no options argument** — there is no `{ format: "hex" }`
seam to add one through at the call site.

### Evidence — no hex writer anywhere in the library

```
$ grep -rn "toString(16)" src/
$ echo "exit=$?"
exit=1
```

Zero hits across the entire published library. `toRgba8` stops at bytes:

```
$ node --input-type=module -e "
import { serializeCssColor } from './dist/subpaths/css.js';
import { convertColor, hsv, toRgba8 } from './dist/subpaths/color.js';
const c = hsv(210, 0.6666666666666669, 0.8);
const rgb = convertColor(c.value, 'rgb');
console.log('serialize ->', JSON.stringify(serializeCssColor(rgb.value)));
console.log('toRgba8   ->', JSON.stringify(toRgba8(c.value, {gamut:'clip'})));
"
serialize -> {"ok":true,"value":"rgb(68 136 204)"}
toRgba8   -> {"ok":true,"value":[68,136,204,255]}
```

`rgb(68 136 204)` **is** `#4488cc`. The library holds the right bytes and declines to print the
notation its own parser accepts:

```
$ node --input-type=module -e "
import { parseCssColor } from './dist/subpaths/css.js';
import { convertColor } from './dist/subpaths/color.js';
const p = parseCssColor('#4488cc');
console.log('parse #4488cc ok:', p.ok, JSON.stringify(p.value.channels));
console.log('hsv:', JSON.stringify(convertColor(p.value,'hsv').value.channels));
"
parse #4488cc ok: true [68,136,204]
hsv: [210,0.6666666666666669,0.8]
```

Round-trip closed in both directions **except the last line**. That last line — `value.toString(16)
.padStart(2,"0")` — is the entire delta, and the library makes every consumer write it.

### Evidence — five consumers wrote it, four differently

```
$ grep -rn "padStart(2, \"0\")" demo/ src/
demo/workbenches/extract/ImageEyedropper/composables/useImageSampler.ts:33:    const hex = (v: number) => v.toString(16).padStart(2, "0");
demo/color-session/picker-color.ts:215:    const hex = (value: number) => value.toString(16).padStart(2, "0");
demo/palettes/browser/search/MiniColorPicker.vue:103:    const toHex = (c: number) => Math.round(c * 255).toString(16).padStart(2, "0");
demo/palettes/export/bytes.ts:31:    for (const b of bytes) out += b.toString(16).padStart(2, "0");
```

Plus a fifth, in a *downstream package*:

```
$ grep -B1 "oklchStopToHex" node_modules/@mkbabb/glass-ui/dist/composables/color/index.d.ts
/** OKLCh stop → `#rrggbb` gamma hex through value.js `toRgba8`. */
export declare function oklchStopToHex(s: OklchStop): string;
```

**The design system carries a colour-library capability because the colour library declined to
publish it.** glass-ui's own doc comment names the seam it had to bridge — *"through value.js
`toRgba8`"* — i.e. it took the bytes and wrote the missing line itself. That is a direction-of-
dependency defect: `inv-K-1` fixes the topology as glass-ui → value.js, and here the *capability*
flows the wrong way along that edge — the consumer owns a concept the producer should.

### Why this is the root, not a sibling, of the confirmed fork

Pass 1's L-6 and pass 2's LP2-4 prescribe the same cure: delete `MiniColorPicker`'s two conversions
and route `currentHex` through the library. **That cure is currently not writable.** Compose it and
the last hop has no library call to make:

```ts
// the prescribed cure, written out:
const currentHex = computed(() =>
    pickerColorToHex(convertPickerColor(hsv(hue.value, sat.value, val.value), "rgb")),
);           // ^^^^^^^^^^^^^^^^ demo-owned, because the library has no equivalent
```

`pickerColorToHex` is `demo/color-session/picker-color.ts:213` — a demo module. So the "converge on
the library" cure converges on the **demo's** hex writer, not the library's, and the concept keeps a
demo home. Pass 2's LP2-3 (the `toRgba8` achromatic-asymmetry defect) is a defect *in* that same
last hop and is currently unfixable in one place for the same reason: there is no one place.

`Math.round(c*255)` (half-up, `MiniColorPicker.vue:103`) vs the library's banker's rounding is one
of pass 2's two measured divergence causes. A published writer makes that a library decision taken
once, not a per-consumer accident taken four times.

### Reproduction

```
$ grep -rn "toString(16)" src/ ; echo "exit=$?"     # → exit=1, zero hits
$ node -e "const p=require('./package.json'); console.log(Object.keys(p.exports).join(' '))"
./color ./value ./css ./easing ./math ./transform ./quantize
```
Then read `src/css/grammar.ts:289-311` — the switch has no hex arm and the function has no options
parameter.

### Cure — architectural, not a patch

Publish the writer from the library, in `src/css/grammar.ts` beside its parser:

```ts
export function serializeCssColor(
    color: CssColor,
    options?: { readonly format?: "functional" | "hex" },
): Result<string, ColorIssue>
```

with the `hex` arm routed through the existing `toRgba8(color, { gamut: "clip" })` so gamut policy
and rounding policy are decided **once**, inside the failure-explicit boundary, and returned as a
`Result` like everything else. Then, in order:

1. `demo/color-session/picker-color.ts:213` `pickerColorToHex` → one library call.
2. `MiniColorPicker.vue:85-105` and `:110-125` → deleted; pass 1's L-6 cure becomes writable.
3. `useImageSampler.ts:33` → deleted.
4. glass-ui's `oklchStopToHex` → one library call; the capability returns to the producer side of
   the `inv-K-1` edge. (Relay to the glass-ui BH inbox — standing formation invariant.)
5. Pass 2's LP2-3 becomes a single-site fix.

`demo/palettes/export/bytes.ts:31` is **not** in this set — it hexes a SHA digest, not a colour.
Correctly separate.

---

## §3 · LP5-2 · MINOR · NEW — a zero-value alias with five consumers

`demo/color-session/color-model.ts:60-65`:

```ts
/** Convert a normalized rgb color (components in [0,1]) to a hex string. */
export function colorToHexString(
    color: PickerColor,
): string {
    return pickerColorToHex(color);
}
```

The body is the call. The wrapper adds nothing — no narrowing, no defaulting, no error handling.
It is an alias, and owner edict 2 bans aliases.

**The doc comment is false.** `pickerColorToHex` (`picker-color.ts:213-217`) takes `AnyColor` in any
space and projects through `toRgba8(color, { gamut: "clip" })`; it does not take "a normalized rgb
color (components in [0,1])". A reader of `color-model.ts` is told the wrong contract.

**The alias won.** Measured consumer counts:

```
$ grep -rn "colorToHexString" demo/ | grep -v "color-model.ts:6"
demo/color-session/ColorSpaceSelector.vue:119 / :156
demo/color-session/useColorUrl.ts:6 / :56
demo/color-session/useColorNameResolution.ts:12 / :44
demo/color-session/useSliderGradients.ts:12 / :66
demo/color-session/useColorPipeline.ts:19 / :177

$ grep -rn "pickerColorToHex" demo/ | grep -v "picker-color.ts:213"
demo/color-session/color-model.ts:13
demo/color-session/color-model.ts:64
```

**5 consumers reach the alias; 1 reaches the implementation, and that 1 is the alias itself.** The
real home is unreachable in practice — which is exactly the shape that makes a fresh author (see
`MiniColorPicker.vue:103`) conclude no such function exists.

**Cure.** Delete `colorToHexString`; point its five consumers at `pickerColorToHex`; after LP5-1
lands, point them at the library and delete `pickerColorToHex` too. One concept, one home, the home
being the package that owns colour.

---

## §4 · LP5-3 · MINOR · NEW — the published interaction recipe, ignored, then forked three ways

### The published primitive

`demo/styles/foundation.css:56` imports glass-ui's full Tailwind-source style surface:

```
$ grep -n "glass-ui/styles" demo/styles/foundation.css
56:@import "@mkbabb/glass-ui/styles";
57:@import "@mkbabb/glass-ui/styles.css";
```

That surface publishes `.interactive-item`
(`node_modules/@mkbabb/glass-ui/dist/styles/utilities/base.css`, `@layer components`), reproduced
here in full:

```css
.interactive-item { scale: 1; border-radius: var(--radius-lg); user-select: none;
  transition: background-color var(--duration-fast) var(--ease-standard),
              color …, border-color …, box-shadow …, scale var(--transition-liquid-spatial); }
.interactive-item:hover { background-color: color-mix(in srgb, var(--accent) 50%, transparent); }
.interactive-item:focus-visible { outline: none; box-shadow: var(--focus-ring-shadow); }
.interactive-item:active { scale: var(--scale-press-sm); }
.interactive-item:disabled, .interactive-item[data-disabled] {
  pointer-events: none; opacity: var(--opacity-disabled); cursor: not-allowed; }
```

### It is used zero times

```
$ grep -rn "interactive-item" demo/
demo/DESIGN.md:238:`.interactive-item`, `.tap-squish` — the scale leg reads `--transition-liquid-spatial`),
```

One hit, in prose, in the demo's own design document. **No component in `demo/` uses it.** The
demo documents the primitive and then does not consume it.

### The subject forks it, byte-identically on hover and lossily everywhere else

`SearchFilterBar.vue:240-248`:

```css
.filter-option {
    display: flex; align-items: center; gap: 0.5rem;
    padding: 0.25rem 0.5rem;
    font-family: var(--font-serif); font-size: var(--type-small);
    line-height: var(--leading-small); cursor: pointer;
    border-radius: var(--radius-md);
    transition: background-color var(--duration-fast) var(--ease-standard);
}
.filter-option:hover { background-color: color-mix(in srgb, var(--accent) 50%, transparent); }
```

The hover declaration is **character-for-character** glass-ui's. The rest is a strict subset that
drops the three legs that matter for interaction:

| leg | glass `.interactive-item` | subject `.filter-option` |
|---|---|---|
| hover tint | `color-mix(in srgb, var(--accent) 50%, transparent)` | **identical** |
| focus ring | `:focus-visible { box-shadow: var(--focus-ring-shadow) }` | **absent** |
| press feedback | `:active { scale: var(--scale-press-sm) }` | **absent** |
| disabled | `[data-disabled] { pointer-events:none; … }` | **absent** |
| radius | `--radius-lg` | `--radius-md` (silently forked) |

Every row in this component's Sort, Tier and Tags lists is a `<label class="filter-option">`
(`:22, :34, :38, :50`). None of them can show a focus ring. This is the same failure class pass 3
recorded at LP3-1 for the sibling swatch, from the opposite direction: **LP3-1 is a ring defeated by
a competing `box-shadow`; LP5-3 is a ring that was never declared** — because the recipe that
declares it was re-typed by hand with that leg omitted.

### And a third spelling that renders a different colour

`TagEditPopover.vue:24` writes the same recipe as a Tailwind utility:

```html
class="flex items-center gap-2 rounded-md px-2 py-1 text-small cursor-pointer hover:bg-accent/50 transition-colors"
```

Tailwind 4 compiles the `/50` opacity modifier in **oklab**, not srgb:

```
$ grep -o "color-mix(in oklab, [^)]*)" node_modules/tailwindcss/dist/lib.js | head -1
color-mix(in oklab, ${e} ${r}, transparent)
```

So one hover recipe has three spellings in this repo, and two of them mix in different spaces and
therefore paint different colours for the same token:

| site | computed hover fill |
|---|---|
| glass-ui `.interactive-item` (published, unused) | `color-mix(in srgb, var(--accent) 50%, transparent)` |
| `SearchFilterBar.vue:248` `.filter-option` | `color-mix(in srgb, var(--accent) 50%, transparent)` |
| `TagEditPopover.vue:24` `hover:bg-accent/50` | `color-mix(in oklab, var(--accent) 50%, transparent)` |

Two sibling popovers in the same cluster, one filter-row recipe, two different fills. Owner edicts
4 (glass-ui is the design system) and 5 (style at the root component level, never per-instance).

### Cure

Delete `.filter-option` and `hover:bg-accent/50`; put `class="interactive-item"` on the rows and
keep only what is genuinely local (the serif voice, the `--type-small` rung, the padding). If the
`--radius-md` rung is wanted for menu rows, that is a **glass-ui** change — a `size` leg on the
published recipe — not a demo re-declaration. (Pass 4's P4-3 found glass-ui also ships an unexported
`_shared/menuRowClass`; that is the TS-side twin of this. Both land in the same glass-ui relay.)

---

## §5 · LP5-4 · INFO · NEW mechanism — the partial facade is why the fork happened

Pass 2's LP2-5 records that `color-session/` has **no barrel** while the leaf has seven. That is
true and it is not the operative defect. The operative defect is that the module the palettes area
*does* import behaves like a barrel and is a lossy one.

`demo/color-session/color-utils.ts` — its complete export list:

```
$ grep -n "^export" demo/color-session/color-utils.ts
11:export function parseColorIn<S extends PickerSpace>(source: string, space: S): PickerColorIn<S>
16:export function colorToRgb255(color: AnyColor): readonly [number, number, number]
23:export function colorToCss(color: AnyColor, outputSpace?: PickerSpace): string

$ grep -c "^export" demo/color-session/picker-color.ts
20
```

Three functions, all of them thin wrappers over `picker-color.ts`, which itself has twenty exports.
`color-utils` is the face the rest of the demo sees — six areas reach it:

```
$ grep -rn "color-session/color-utils" demo/ | sed 's/:.*//' | sort -u
demo/palettes/browser/search/SearchFilterBar.vue
demo/palettes/mix.ts
demo/workbenches/gradient/composables/useGradientCSS.ts
demo/workbenches/gradient/composables/useGradientInterpolation.ts
demo/workbenches/mix/MixAnimationCanvas/composables/mixStage.ts
demo/workbenches/mix/composables/useMixingState.ts
```

**It omits `pickerColorToHex`.** So the causal chain behind the confirmed L-6 fork is mechanical,
not careless:

1. `SearchFilterBar.vue:145` imports `parseColorIn` from `color-utils` — the area's colour face.
2. `MiniColorPicker.vue`, its own child, needs hex.
3. `color-utils` has `colorToRgb255` and `colorToCss` — bytes and functional notation — and no hex.
4. The one hex writer in the demo lives two modules deeper, behind an alias (LP5-2), reachable only
   by a path the neighbourhood does not use.
5. The child wrote `toHex` at `MiniColorPicker.vue:103`.

A three-function facade in front of a twenty-function module is worse than no facade: no facade
makes the author read the real module; a partial facade tells them the capability is absent.

**Cure.** `color-utils.ts` should not exist as a separate module. Merge its three functions into
`picker-color.ts` (they are already only wrappers over it), give the area one honest barrel, and
after LP5-1 lands most of what survives is a re-export of `@mkbabb/value.js/{color,css}` and can be
deleted with its consumers pointed at the package.

---

## §6 · Independent re-verification of the confirmed core

I derived these before reading passes 1–4 and re-measured each at `d19da6d3`. **Nothing to add or
correct** — recorded so the fifth agreement is on the record.

| prior row | my independent measurement at `d19da6d3` |
|---|---|
| L-1 / LP2-1 · Checkbox miswired | `SearchFilterBar.vue:52-53` and `TagEditPopover.vue:28-29` both write `:checked` / `@update:checked`; glass-ui 7's `Checkbox.vue.d.ts` declares `modelValue`. **2 of 2** demo consumers wrong. **CONFIRMED** |
| L-5 / LP3-5 · the hex-only gate | `SearchFilterBar.vue:218`. Ran the library against the shapes the gate discards: `hsl(120 100% 50%)`→`0.866440,-0.233888,0.179498`; `#f00`→`0.627955,0.224863,0.125846`; `rebeccapurple`→`0.440272,0.088177,-0.133864`; `oklch(0.7 0.1 30)`→`0.700000,0.086603,0.050000`; `color(display-p3 1 0 0)`→`0.648574,0.262042,0.145002`; `not-a-color`→`PARSE-FAIL css_syntax`; `""`→`PARSE-FAIL css_syntax`. Five valid colours silently replaced by `pickerHex`; two genuine failures indistinguishable from them. **CONFIRMED** |
| L-3 · client/server colour-filter duplication | `BrowsePane.vue:344-348` (`Math.hypot`, `radius = 0.15`) vs `api/src/modules/palette/service/crud-list.ts:159-180` (`Math.sqrt(dL²+da²+db²)`, `query.colorRadius ?? 0.15`). Same predicate, same default, two homes. `ListPalettesOptions.colorL/colorA/colorB/colorRadius` exist at `demo/palettes/api/palettes.ts:27-30` and are set at `:50-53`; `grep -rn "colorRadius" demo/` returns **only those two lines** — zero callers. `currentFilterOpts()` (`useBrowsePalettes.ts:52-61`) emits `sort`/`q`/`tier`/`tags` and never colour. **CONFIRMED** |
| L-4 · filter ownership scattered | `sortMode`/`tierFilter`/`selectedTags` in `useBrowsePalettes.ts:30,40,41`; the handlers in `browser/dialog/composables/useDialogBrowseActions.ts:87-100`; `colorSearchParams` pane-local at `BrowsePane.vue:336`; `colorSearchActive` component-local at `SearchFilterBar.vue:171`. One concept, four owners; colour is the only filter with **two** local homes and no store home. **CONFIRMED** |
| L-6 / LP2-4 · two colour engines | `MiniColorPicker.vue:85-105` (HSV→hex) and `:110-125` (hex→HSV). Library equivalence measured: `hsv(210, 0.6666666666666669, 0.8)` → `convertColor(…,'rgb')` → `rgb(68 136 204)` = `#4488cc`; `parseCssColor('#4488cc')` → `convertColor(…,'hsv')` → `[210, 0.6666666666666669, 0.8]`. Byte-exact round trip both directions. **CONFIRMED** — and see §2 for why the prescribed cure does not currently compile |
| L-9 / LP2-7 · `demo/ui/` | 19 directories, every `index.ts` a pure re-export. 18 route through the **root** `@mkbabb/glass-ui` barrel; `demo/ui/input` alone routes through `@mkbabb/glass-ui/forms` — while glass-ui publishes 49 component subpaths (`./button`, `./popover`, `./label`, …). Measured spread: **79** demo files import glass-ui directly, **48** import through the shim, **24 do both**. `DESIGN.md:384` documents the shim's purpose as "ergonomics". The subject takes 5 of its 5 UI symbols through it. **CONFIRMED** |
| L-10 · `tsconfig.demo.json` `paths` drift | The config's own header calls the map "a CLOSED 8-key set". Resolved each key with the TS API under the real program: `@mkbabb/value.js` → **UNRESOLVED** (`dist/index.d.ts` does not exist); `/parsing` → **UNRESOLVED**; `/units` → **UNRESOLVED**. Meanwhile `/css` and `/value` — both real `exports` keys, both on this component's own chain — carry **no** `paths` entry and resolve only by TypeScript's package self-reference (`→ /Users/mkbabb/Programming/value.js/dist/subpaths/css.d.ts`). 3 phantom keys, 2 silent omissions, and the `exports` map itself has 7 keys and no `.` root. **CONFIRMED** |
| L-11 · G-DEMO boundaries inert | `npx eslint --print-config demo/palettes/browser/search/SearchFilterBar.vue` → `no-restricted-imports: undefined`. `demo/@` does not exist (`ls -d demo/@` → No such file or directory); `@components/` survives in exactly 2 places repo-wide, both of them prose comments. The subject's own barrel header (`search/index.ts:1`) advertises a "hardened public surface"; **zero** import guards are in force on the entire `demo/palettes/` tree. **CONFIRMED** |
| pass 1's suspect sweep | `demo/palettes/export.ts` (shipping, reached via `usePaletteExport.ts:9`) vs `demo/palettes/export/serializers.ts` — the latter's own header states *"the sibling legacy `../export.ts` … still resolves `./export`"*, and `grep` shows its only consumer is `demo/test/export/byte-exact.test.ts:23`. A byte-exact contract stack that ships to nothing. **Live, and out of the subject's chain** — one hop up at `BrowsePane.vue:198`. Pass 1 homed it to the `CurrentPaletteEditor`/`PaletteCard` seats; I concur |

---

## §7 · The greenfield lattice

Asked concretely, with no legacy. The single organising rule: **each concept has exactly one home,
and that home is the lowest package that can hold it.**

```
@mkbabb/value.js                    (the published library — owns colour)
  src/color/          spaces · conversion · gamut · Result
  src/color/metric.ts NEW  oklabDistance(a, b)      ← the one home for colour proximity
  src/css/grammar.ts  parse ⟷ serialize, serialize gains { format: "hex" }   ← LP5-1
  exports: ./color ./css …           (+ the `.` root the map still lacks)

@mkbabb/glass-ui                    (the design system — owns interaction)
  .interactive-item                  the menu-row recipe, consumed not re-typed   ← LP5-3
  ./checkbox ./radio-group ./popover reached DIRECTLY, no demo alias layer        ← L-9
  MiniColorPicker → a glass-ui primitive (SV canvas + hue strip is design-system
                    furniture, not palette-feature furniture); its colour maths
                    is three library calls after LP5-1                            ← L-6

demo/
  color/                             ONE module, merged from picker-color +
                                     color-utils + color-model; no partial facade,
                                     no pass-through aliases                       ← LP5-2 · LP5-4
  palettes/
    api/palettes.ts                  ListPalettesOptions — already carries
                                     colorL/A/B/Radius, unchanged
    browseQuery.ts            NEW    the ONE browse-query model:
                                       { sort, q, tier, tags, color: Result<OklabTarget> }
                                     colour parsed by the library, kept as a Result,
                                     never regex-gated                             ← L-5
    useBrowsePalettes.ts             currentFilterOpts() emits ALL FIVE filters;
                                     colour goes on the wire like every sibling;
                                     paging and colour can no longer disagree      ← L-3 · L-4
    browser/search/
      SearchFilterBar.vue            a controlled view over browseQuery.
                                     Zero local filter state. Zero colour maths.
                                     Zero scoped interaction CSS.

demo/ui/                             DELETED (19 files, 20 lines, 0 behaviour)     ← L-9
```

Three deletions carry most of the value and none of them needs a new abstraction: `demo/ui/`,
`color-utils.ts` + `colorToHexString`, and `.filter-option`. Two additions are genuinely new
capability and both belong upstream: `serializeCssColor(…, { format: "hex" })` and
`oklabDistance`. The component that remains is ~60 lines of template over a props/emits pair, which
is what a filter bar should be.

---

## §8 · Negative proof — what I looked for and did not find

Recorded so the seat's negatives are real, not silent.

- **`verbatimModuleSyntax` (edict 8) — clean.** The subject has exactly one type-only import and it
  is correct: `SearchFilterBar.vue:144` `import type { Tag } from "../../types"`. Every other import
  is a value import. `MiniColorPicker.vue` has no type-only imports. No violation.
- **No deep-`src/` reach.** The subject's chain reaches `@mkbabb/value.js/color` and
  `@mkbabb/value.js/css` only, both through the published `exports` map. `grep -rn "@src/" demo/`
  finds nothing on this path. The T.W1 demo-dogfood keystone holds here: a real consumer could write
  every specifier this chain uses. The public-surface defect is one of **omission** (§2), not of
  boundary violation.
- **No dual value.js instance.** glass-ui's `dist/` imports value.js only by subpath
  (`@mkbabb/value.js/color`, `/css`, `/easing` — never the bare root), and the Vite self-alias set
  is generated from the same `exports` map, so the subject's glass-ui components and the subject's
  own colour calls resolve to one build. `tsconfig.demo.json`'s header describes a bare-specifier
  alias that the generator cannot produce — stale prose, not a live defect.
- **`.section-label` and `.scrollbar-thin` are consumed correctly.** Both are glass-ui-published
  (`dist/styles/typography/utilities.css`, `dist/styles/utilities/base.css`) and the subject uses
  them by name at `:20/:32/:48/:63` and `:49`. The design-system consumption is not uniformly bad —
  which sharpens LP5-3: the component knows how to consume published utilities and declined to for
  the one that carries the focus ring.
- **Named suspect `ActionBarLayer` / `useLayerTransition`** — not on this chain; concur with pass 1.
- **Named suspect: three parallel `useDark` stores** — present at
  `demo/scenes/about/markdown/composables/useMarkdownHighlighting.ts:76`, and this component touches
  no dark-mode store. Out of chain; concur with pass 1.
- **The visual audit shows nothing new for this component.** `/#/browse` is captured with the
  popover closed in all four matrices (`REPORT.json`: `overflowX 0`, `pageErrors 0`, `main 1`, the
  four `smallTapTargets` all belonging to `PaletteSlugBar` and the glass `SearchBar`, none to the
  subject). The route's only console line is `Failed to load remote palettes: SyntaxError`, and the
  screenshot shows the error plate — the commons is unreachable from the capture host, so the wall
  and the tag section never render. Pass 3's LP3-3 already established that this matrix structurally
  cannot see the component; I confirm and add nothing.
