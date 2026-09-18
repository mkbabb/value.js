# CHALLENGE-L — PreviewRamp.vue · library structure

## Model receipt

I observe myself to be **Opus 5** (exact model id `claude-opus-5[1m]`), spawned with an explicit
Opus 5 declaration by the workflow orchestrator. The declaration is present, not inherited.

**Repo state observed:** `/Users/mkbabb/Programming/value.js`, branch `tranche-u`.
The task named HEAD `c654824e`; the working tree HEAD had already advanced when I attached:

```
$ git rev-parse HEAD
f36f780c5938390b8dc93cd87920418e82cdd81a
$ git log --oneline -1
f36f780c docs(V·mega): STATE — three OM censuses complete, findings at MT-F043
```

`f36f780c` is a docs-only commit (`docs(V·mega)`); no `demo/` or `src/` file on this component's
chain moved between the two revisions. Every line/byte citation below is against the working tree
at `f36f780c`.

**Subject:** `demo/color-session/color-chips/PreviewRamp.vue` (50 lines).
**Seat premise:** the library structure underneath this component is wrong. **Verdict: DEFECTIVE.**

---

## 0. The subject's actual dependency cone

Traced by hand, every edge:

```
demo/color-session/color-chips/PreviewRamp.vue
├── vue                                         (computed)                    OK
└── ./sample                                    (stampStops)                  ← L-9
    ├── @mkbabb/value.js/color                  (mixColors, AnyColor,
    │                                            HueInterpolationMethod)      OK — published
    ├── ../color-utils                          (colorToCss, parseColorIn)
    │   ├── @mkbabb/value.js/color              (toRgba8, AnyColor)           OK — published
    │   └── ./picker-color
    │       ├── @mkbabb/value.js/color          (17 constructors + types)     OK — published
    │       └── @mkbabb/value.js/css            (parseCssColor,
    │                                            serializeCssColor, …)        OK — published, ← L-11
    └── ../picker-color                         (type-only)                   OK
```

Consume sites (`grep -rn "PreviewRamp\|PreviewStrip\|color-chips"` over `demo/ src/ test/ e2e/`):

| site | file:line | what |
| --- | --- | --- |
| mix Space rows | `demo/workbenches/mix/MixConfigBar.vue:23,111` | `PreviewRamp` + sampler |
| mix Hue rows | `demo/workbenches/mix/MixConfigBar.vue:23,133` | `PreviewRamp` + sampler |
| generate Preset | `demo/workbenches/generate/GenerateControls.vue:20,245` | `PreviewStrip` |
| generate Harmony | `demo/workbenches/generate/GenerateControls.vue:20,274` | `PreviewStrip` |
| atmosphere Harmony | `demo/scenes/atmosphere/AuroraPane.vue:39,132` | `PreviewStrip` |
| vitest oracle | `test/preview-chips.test.ts:29-31` | `sample.ts` direct |
| e2e O-14 leg | `e2e/smoke/oracles/o14-preview-truth.spec.ts:341-421` | `[data-stops]` in DOM |
| e2e O-20 leg | `e2e/smoke/oracles/o20-generate-plate.spec.ts:79-90` | `[data-stops]` in DOM |

**Zero consumers inside `demo/color-session/`** — proven by enumeration:

```
$ grep -rn "color-chips" demo/color-session/ --include="*.vue" --include="*.ts" \
    | grep -v "^demo/color-session/color-chips/"
(no output)
```

---

## 1. Findings

### L-1 · MAJOR — the chip paints through a masking regex that cannot fire (proven dead)

`demo/color-session/color-chips/sample.ts:38-41` — every stop `PreviewRamp` paints goes through:

```ts
/** Serialize one sampled stop as paintable OKLCh (alpha only when < 1). */
export function serializeStop(stop: AnyColor): string {
    return colorToCss(stop, "oklch").replace(/ \/ 1\)$/, ")");
}
```

The library already owns that decision. `src/css/grammar.ts:287`:

```ts
const alphaSuffix = (alpha: Alpha): string => alpha === 1 ? "" : ` / ${alpha === "none" ? "none" : `${format(alpha * 100)}%`}`;
```

Alpha `1` emits **nothing**; any other alpha emits a **percentage**. The literal ` / 1)` is
unproducible by the serializer the demo calls. Measured against the shipped `dist/`:

```
$ node scratchpad/probe/alpha.mjs
1         -> oklch(70% 0.15 220deg)              | regex-hits: false
0.5       -> oklch(70% 0.15 220deg / 50%)        | regex-hits: false
0.999999  -> oklch(70% 0.15 220deg / 99.9999%)   | regex-hits: false
"none"    -> oklch(70% 0.15 220deg / none)       | regex-hits: false
mixed alpha-1 stop -> oklch(55% 0.175 300deg)    | regex-hits: false
```

0 hits of 5, including the real `mixColors → serializeCssColor` path the sampler runs.

Three defects stacked in three lines:

1. **Ownership inversion.** Alpha-omission is a CSS-serialization concern; its unique home is
   `src/css/grammar.ts`. The demo re-asserts it by string surgery on the library's output.
2. **Masking fallback** — a standing-edict-2 violation. It is a "just in case the library is
   wrong" guard, and it is provably wrong about what the library does.
3. **The doc-comment documents a mechanism that does not exist** ("alpha only when < 1" reads as
   the regex's contribution; it is entirely the library's).

**The oracle structurally cannot catch it.** `test/preview-chips.test.ts:48` computes the
*expected* value with the same `serializeStop`:

```ts
return serializeStop(result.value as PickerColorIn<typeof space>);
```

so the regex sits on both sides of `toEqual` — a tautology. The e2e leg compares the stamp to the
paint, and both come from the same string. Nothing in the suite reaches the library's serializer
independently.

**Reproduction:** the node probe above (script at
`scratchpad/probe/alpha.mjs`, imports `dist/subpaths/{color,css}.js` directly).

**Cure:** delete `.replace(...)`. `serializeStop` becomes `colorToCss(stop, "oklch")` — at which
point it is not a function, it is a partial application, and the sampler should call `colorToCss`
directly (see §2).

---

### L-2 · MAJOR — `.preview-chip` is a scoped twin: one recipe, two literal copies

`PreviewRamp.vue:40-49` and `PreviewStrip.vue:56-65` each define `.preview-chip` in `<style scoped>`.
Four of the five declarations are byte-identical (`inline-size`, `block-size`, `border-radius`,
`box-shadow`); only `display` differs (`inline-block` vs `inline-flex`). Both carry the same
comment `/* one golden plate — φ² × 1em (F7) */`.

Scoped styles do not share. This is two homes for the F7 plate law, and the house has already
named this exact failure and forbidden it. `demo/styles/utils.css:181-183`, on the
`.palettes-ramp-text` recipe:

> The ONE recipe for the exactly-TWO consume sites … — **never a scoped twin (the S.W7-7 lesson)**.

and `demo/styles/utils.css:170-172` on `.swatch-row`:

> A shared recipe (3 consumers) per DESIGN.md's global-utility rule.

`demo/DESIGN.md:388` states the rule and its converse:

> **No new global utility class for one consumer** — colocate to the component's `<style scoped>` …
> The shared survivors … are true cross-feature recipes; each carries a comment justifying its
> global residence.

`.preview-chip` has two consumers across two components — a true cross-feature recipe by the
house's own test — and it is a scoped twin anyway.

**Reproduction:** `diff <(sed -n '40,49p' demo/color-session/color-chips/PreviewRamp.vue) <(sed -n '56,65p' demo/color-session/color-chips/PreviewStrip.vue)`.

**Cure:** one `.preview-chip` recipe in `demo/styles/utils.css` beside `.specimen-seg` /
`.swatch-row` / `.palettes-ramp-text`; the two SFCs keep only their genuine differentiators
(`display`, `.preview-strip-segment`, the truncation mask).

---

### L-3 · MAJOR — the golden plate is re-hardcoded where a root token owns it

`PreviewRamp.vue:43` (and identically `PreviewStrip.vue:59`):

```css
inline-size: 2.618rem; /* one golden plate — φ² × 1em (F7) */
```

`demo/styles/foundation.css:453-462` mints exactly that number as a root token, with the law
written into the comment:

```css
/* ── The φ ladder (S.W4-8 …) 1rem base, neighbours a factor of φ ≈ 1.618 apart.
 * … one ladder, never a re-hardcoded arbitrary value. */
--phi-0: 0.382rem;  --phi-1: 0.618rem;  --phi-2: 1rem;  --phi-3: 1.618rem;
--phi-4: 2.618rem;  /* base × φ² */
```

Two components re-hardcode `--phi-4`. Standing edict 5 (root-level styling) and the ladder's own
stated law. **Cure:** `inline-size: var(--phi-4);`, once, in the L-2 shared recipe.

---

### L-4 · MAJOR — a second k=16 ramp sampler is alive in the same feature tree

`sample.ts:36` — `export const RAMP_SAMPLE_COUNT = 16;`
`demo/workbenches/mix/MixAnimationCanvas/composables/mixStage.ts:28` — `const RAMP_STOPS = 16;`

`mixStage.ts:93-109`:

```ts
function pigmentRamp(fromCss, toCss, space, hueMethod): RGB[] {
    const from = parseColorIn(fromCss, space);
    const to = parseColorIn(toCss, space);
    return Array.from({ length: RAMP_STOPS }, (_, index) => {
        const result = mixColors(from, to, index / (RAMP_STOPS - 1), { space, hue: hueMethod });
        if (!result.ok) throw new Error(`Pigment mix failed: ${result.error.code}`);
        return colorToRgb255(result.value as PickerColorIn<typeof space>);
    });
}
```

Same k, same `parseColorIn` endpoints, same `mixColors(t = i/(k-1))`, same `{space, hue}` options —
identical to `sampleInterpolationRamp`'s two-operand case modulo the final encoder
(`colorToRgb255` vs `serializeStop`). Both live under `demo/workbenches/mix/`; one is the preview
of what the other animates.

Only `sampleInterpolationRamp` is oracle-tested. `pigmentRamp` is not covered by
`test/preview-chips.test.ts` and is invisible to the O-14 laws — so the mix animation and the mix
preview can silently diverge (change `RAMP_SAMPLE_COUNT` and the chip re-samples; the canvas does
not). The full census of `mixColors` consumers in `demo/`:

```
$ grep -rln "mixColors" demo/ | sort
demo/color-session/color-chips/sample.ts          ← ramp sampler (oracle-tested)
demo/color-session/ink.ts
demo/palettes/mix.ts                               ← mixColorSequence
demo/workbenches/gradient/composables/useGradientCSS.ts
demo/workbenches/gradient/composables/useGradientInterpolation.ts   ← interpolateStopColors
demo/workbenches/mix/MixAnimationCanvas/composables/mixStage.ts     ← pigmentRamp (dual path)
```

`useGradientInterpolation.ts:27-38`'s `interpolateStopColors` is the same operation at k=1.

**Cure:** one sampler (see §2 — it belongs in `src/`).

---

### L-5 · MAJOR — wrong home: `color-chips/` lives inside a tree that never consumes it

`color-chips/` sits at `demo/color-session/color-chips/`. Its `index.ts:2-3` justifies this as
"born colocated". It is not colocated with anything: **zero** files under `demo/color-session/`
import it (enumerated in §0). All five consume sites reach *up and across*:

- `../../color-session/color-chips` from `demo/workbenches/mix/MixConfigBar.vue:23`
- `../../color-session/color-chips` from `demo/workbenches/generate/GenerateControls.vue:20`
- `../../color-session/color-chips` from `demo/scenes/atmosphere/AuroraPane.vue:39`

`demo/color-session/` is the color-*truth* tree (`color-utils.ts`, `picker-color.ts`,
`palettes-ramp.ts`, `ink.ts`, the `useColor*` composables). `PreviewRamp.vue` is a presentational
`<span>` with a `backgroundImage`; it contains no color knowledge at all. The demo already has the
cross-feature component home — `demo/shared/ui/` (`EmptyState.vue`, `PaneHeader.vue`) — and it is
where three-feature-wide presentational components live. The module is filed by its *history*
(which pane authored it) rather than by *what it is*.

Note the same directory's `index.ts:11-14` documents a "CONSUME MAP (the W6 single-writer law)"
naming which lane wires which host — a routing table is a symptom that the module's home does not
match its consumers.

**Cure:** split by kind, not by birth (see §2). Nothing new is created: both target directories
already exist.

---

### L-6 · MAJOR — the chip's composition grammar has no home and has already drifted 3 ways

The F7 law is "chip leading, description after" in the Select `#description` lane. That
composition is re-authored at every call site, and the five sites are already three different
things:

| site | file:line | wrapper |
| --- | --- | --- |
| mix · Space | `MixConfigBar.vue:110` | `<span class="flex items-center gap-2">` |
| mix · Hue | `MixConfigBar.vue:132` | `<span class="flex items-center gap-2">` |
| generate · Preset | `GenerateControls.vue:244` | `<span class="flex items-center gap-2 min-w-0">` |
| generate · Harmony | `GenerateControls.vue:273` | `<span class="flex items-center gap-2 min-w-0">` |
| atmosphere · Harmony | `AuroraPane.vue:131-133` | **none** — bare `<PreviewStrip>` |

```
$ grep -rn 'flex items-center gap-2' demo/workbenches/mix/MixConfigBar.vue \
      demo/workbenches/generate/GenerateControls.vue demo/scenes/atmosphere/AuroraPane.vue
MixConfigBar.vue:110:   <span class="flex items-center gap-2">
MixConfigBar.vue:132:   <span class="flex items-center gap-2">
GenerateControls.vue:244: <span class="flex items-center gap-2 min-w-0">
GenerateControls.vue:273: <span class="flex items-center gap-2 min-w-0">
```

The mix rows are missing `min-w-0`, so a long space description in a narrow `SelectContent` cannot
shrink the way the generate rows can — the flex-min-content overflow, in exactly the two rows the
subject component serves. This is not a styling nit; it is the measurable cost of a composition with
no owner. The chip carries `flex: none` on itself (`PreviewRamp.vue:42`) precisely because it
knows it is inside someone else's flex row — the component already assumes the lane it does not own.

**Reproduction (structural, not yet visual):** the two mix `<span>`s lack `min-w-0`; the generate
ones have it. The visual matrix cannot show it —
`docs/tranches/V/megatranche/audit/visual/REPORT.md` captures 15 routes with **`horizontalOverflow — 0`**
and **`blankOrNearBlank — 0`**, but reka unmounts `SelectContent` when closed, so **no capture in the
60-shot matrix contains a single chip**. Every route-level row for `/#/mix`, `/#/generate`,
`/#/atmosphere` is chip-blind. Labelled a hypothesis for the overflow consequence; the class
divergence itself is fact.

---

### L-7 · MAJOR — the O-14 invariant's two halves live in two modules

`PreviewRamp.vue` asserts, in its own doc-comment, that the stamp is "the O-14 paint≡stops
referent". The two serializations that must agree are authored apart:

- **stamp** — `sample.ts:89` `stops.join("|")`
- **paint** — `PreviewRamp.vue:25` `` `linear-gradient(90deg, ${stops.join(", ")})` ``

Nothing in-process ties them; the equality is asserted only by an e2e leg
(`e2e/smoke/oracles/o14-preview-truth.spec.ts:395-421`) that needs a real browser, a dev server, and
an opened dropdown. An invariant between two pure string functions is being proved by Playwright.

The paint half is also a sixth mint of a function the app already owns.
`demo/workbenches/gradient/composables/useGradientCSS.ts:223`:

```ts
return `linear-gradient(90deg, ${parts.join(", ")})`;
```

— character-for-character the same expression. The full census of stops→gradient string builders:

```
useGradientCSS.ts:223                 `linear-gradient(90deg, ${parts.join(", ")})`
PreviewRamp.vue:25                    `linear-gradient(90deg, ${stops.join(", ")})`
GenerateControls.vue:72               `linear-gradient(to right, ${stops.join(", ")})`
useExtractSession.ts:111              `linear-gradient(to right, ${stops.join(", ")})`
ComponentSliders.vue:195              `linear-gradient(to right, ${stops.join(", ")})`
MixResultDisplay.vue:112              `linear-gradient(to right, ${...join(', ')})`
```

Six sites, one concept, and the axis is spelled two incompatible ways (`90deg` vs `to right` — the
same direction, so a future "make ramps vertical" change has six edit sites and two idioms).
`GenerateControls.vue:72` is especially telling: the same file that renders `PreviewStrip` also
hand-builds a ramp gradient for its count slider.

---

### L-8 · MINOR — two incompatible notations share the one `data-stops` contract

`data-stops` is a single DOM contract consumed by two e2e oracles
(`o14-preview-truth.spec.ts:366`, `o20-generate-plate.spec.ts:90`, both `.split("|")`). Two
producers write it in different color notations:

- `sample.ts:39-41` → library `serializeCssColor` → **`oklch(70% 0.15 220deg)`** (measured, §L-1)
- `demo/scenes/atmosphere/aurora-harmony-stops.ts:26-40` → hand-rolled:

```ts
function fmt(v: number): string { return v.toFixed(4).replace(/\.?0+$/, ""); }
…
return palette.map((s) => `oklch(${fmt(s.L)} ${fmt(s.C)} ${fmt(s.h)})`);
```

→ **`oklch(0.7 0.15 220)`** — percent-less L, unit-less hue, a private `fmt` (4 dp) against the
library's `format` (`src/css/grammar.ts:283-285`, 12 dp). Both are valid CSS; neither is the
other. The module comment calls this "no denorm needed", which is true of the *values* and false of
the *notation*. A third serializer for a type the library serializes.

---

### L-9 · MINOR — a presentational chip imports the color-engine module for a string join

`PreviewRamp.vue:17` — `import { stampStops } from "./sample";` — the only non-`vue` import in the
component. `stampStops` is `stops.join("|")` (`sample.ts:89-91`), zero dependencies. But `sample.ts`
is also the home of `sampleInterpolationRamp`, so the chip's module record pulls
`@mkbabb/value.js/color` → `color-utils` → `picker-color` → `@mkbabb/value.js/{color,css}`: the
entire 17-space constructor table and the CSS parser, to join an array of strings.

Rollup tree-shakes this in the `production`/`gh-pages` builds (`sideEffects: false`,
`package.json:18`), so this is **not** a shipped-bytes defect. It is an ownership defect: the DOM
contract (`data-stops`) and the color math are in one module, and the presentational leaf cannot
import the former without naming the latter. `stampStops` is a *component* concern that has been
filed under *color*.

**Labelled: structural, no runtime reproduction.**

---

### L-10 · MAJOR — the repo installs a registry copy of itself; the dogfood rests on two aliases

`package-lock.json` installs the published tarball of the package under development into the
package's own `node_modules`, to satisfy glass-ui's peer dependency:

```
$ python3 -c "... package-lock.json ..."
node_modules/@mkbabb/value.js -> {'version': '4.0.0',
  'resolved': 'https://registry.npmjs.org/@mkbabb/value.js/-/value.js-4.0.0.tgz'}

$ python3 -c "... node_modules/@mkbabb/glass-ui/package.json ..."
glass-ui version 7.0.0
peerDependencies {'@mkbabb/value.js': '^4.0.0'}
devDependencies  {'@mkbabb/value.js': '^4.0.0'}

$ python3 -c "import os; print(os.path.islink('node_modules/@mkbabb/value.js'))"
False
```

It is a real directory, not a link. The repo's own `package.json:3` is `"version": "4.0.0"`. So two
artifacts labelled `@mkbabb/value.js@4.0.0` coexist in one tree — **and they are not the same
bytes**:

```
$ wc -c node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts dist/subpaths/css.d.ts
   10910 node_modules/@mkbabb/value.js/dist/subpaths/css.d.ts
   12490 dist/subpaths/css.d.ts
$ diff node_modules/@mkbabb/value.js/dist/subpaths/css.js dist/subpaths/css.js | head -3
2,3c2,3
< import { C as n, … r as f, s as p, v as m, x as h, y as g } from "../anchors-C_wdoOYd.js";
> import { C as n, … r as ee, s as f, v as p, x as m, y as h } from "../anchors-C_wdoOYd.js";
$ wc -c node_modules/@mkbabb/value.js/dist/subpaths/css.js dist/subpaths/css.js
   43972 …/node_modules/…/css.js
   43973 dist/subpaths/css.js
```

The `.d.ts` drift is structural, not cosmetic: the checkout's declaration carries a duplicated
`Alpha_2 / Channel_2 / Color_2 / SpaceId_2` type family and maps `CssColorBySpace` to `Color_2<S>`,
where the tarball maps it to `Color<S>` — 1580 bytes of extra declaration on the exact
`@mkbabb/value.js/css` surface `picker-color.ts:28-34` (on this component's chain) imports.

The demo only avoids binding to the stale tarball because of **two independent redirections**, both
of which I verified currently hold:

```
$ npx tsc -p tsconfig.demo.json --noEmit --traceResolution | grep "value.js/css"
======== Resolving module '@mkbabb/value.js/css' from '…/demo/color-session/picker-color.ts'. ========
======== Module name '@mkbabb/value.js/css' was successfully resolved to
         '/Users/mkbabb/Programming/value.js/dist/subpaths/css.d.ts'
         with Package ID '@mkbabb/value.js/dist/subpaths/css.d.ts@4.0.0'. ========
```

(TypeScript **package self-name resolution** through the repo's own `exports` map — *not* the
`tsconfig.demo.json` `paths` entry, which does not exist for `/css`; see L-11.)

```
$ node scratchpad/probe/resolve.mjs      # Vite resolver under vitest.config.ts
@mkbabb/value.js/color => /Users/mkbabb/Programming/value.js/dist/subpaths/color.js
@mkbabb/value.js/css   => /Users/mkbabb/Programming/value.js/dist/subpaths/css.js
```

and at dev/build time the generated `valueJsSelfAlias` (`vite.config.ts:31-51`). `package.json` has
**no `overrides`** block pinning `@mkbabb/value.js` to the checkout.

So the T.W1 "demo-dogfood keystone" — the claim that the demo consumes only the published surface —
is currently true by *redirection*, not by *graph*. Remove the vite alias, or run any tool that does
not implement self-name resolution (a bare `node --experimental-strip-types`, an editor's own
resolver, `esbuild` invoked directly, a future `vitest` with `resolve.alias` cleared), and the
demo/tests silently bind to a stale published tarball whose declarations already differ. The
guarantee should be a property of `node_modules`, not of three configs agreeing.

**Reproduction:** the byte comparison above is the reproduction of the *hazard*; there is currently
**no live mis-binding** — I checked all three resolvers and all three land on the checkout. Labelled
latent.

---

### L-11 · MINOR — `tsconfig.demo.json` `paths` and `package.json#exports` are different maps

`package.json:20-49` `exports` = 7 keys: `./color ./value ./css ./easing ./math ./transform ./quantize`.
`tsconfig.demo.json` `paths` = 8 keys: `. /color /parsing /math /easing /units /transform /quantize`.

The comment above them claims they mirror:

> The value.js published surface: the bare `.` root + the 7 subpath barrels … Mirrors the
> `vite.config.ts` runtime self-alias generated from the same map. … there is no `.../*` wildcard
> because the `exports` map is a **CLOSED 8-key set**.

They do not mirror, in both directions:

| tsconfig `paths` key | target | exists? |
| --- | --- | --- |
| `@mkbabb/value.js` | `./dist/index.d.ts` | **no** — `ls: dist/index.d.ts: No such file or directory` |
| `@mkbabb/value.js/parsing` | `./dist/subpaths/parsing.d.ts` | **no** — not in `ls dist/subpaths/` |
| `@mkbabb/value.js/units` | `./dist/subpaths/units.d.ts` | **no** — not in `ls dist/subpaths/` |
| — | `./value`, `./css` (real exports) | **absent from `paths`** |

```
$ ls dist/subpaths/
color.d.ts color.js css.d.ts css.js easing.d.ts easing.js math.d.ts math.js
quantize.d.ts quantize.js transform.d.ts transform.js value.d.ts value.js
$ ls dist/index.d.ts
ls: dist/index.d.ts: No such file or directory
$ ls src/subpaths/
color.ts css.ts easing.ts math.ts quantize.ts transform.ts value.ts
```

Three dead entries are legacy residue from a retired `parsing`/`units`/root surface (edict 2). Their
practical effect: `@mkbabb/value.js/css` — used 10× in `demo/`, including twice on this component's
chain — has **no** `paths` entry and only works via the self-name fallback documented in L-10; and
anyone writing the bare `@mkbabb/value.js` import gets a `paths` hit on a nonexistent `.d.ts`, while
Vite has no alias for it (the alias generator, `vite.config.ts:43-51`, derives from `exports`, which
has no `.` key) — a TS/runtime split by construction.

Subpath usage census, for the record:

```
$ grep -rhno '@mkbabb/value\.js[a-z/]*' demo/ | sed 's/.*://' | sort | uniq -c | sort -rn
  25 @mkbabb/value.js/color
  10 @mkbabb/value.js/css
   6 @mkbabb/value.js/math
   5 @mkbabb/value.js/easing
   4 @mkbabb/value.js/quantize
   1 @mkbabb/value.js          ← a prose mention in demo/shared/utils.ts:12, not an import
```

---

### L-12 · INFO — dev-only double instance of the value.js core

Vite's dep optimizer inlines the checkout's value.js into glass-ui's prebundle:

```
$ python3 -c "…node_modules/.vite/deps/value-DMhh2R94-CPDEMxVg.js.map…"
n sources: 2
  ../../../dist/operations-CB_1wGy4.js            ← the CHECKOUT's dist (alias applied ✓)
  ../../@mkbabb/glass-ui/dist/value-DMhh2R94.js
$ wc -c node_modules/.vite/deps/value-DMhh2R94-CPDEMxVg.js
    7721
$ grep -l "value-DMhh2R94" node_modules/.vite/deps/*.js
@mkbabb_glass-ui_aurora.js  @mkbabb_glass-ui_color.js  @mkbabb_glass-ui_dock.js
accent-tone-solve-…js       value-DMhh2R94-CPDEMxVg.js
```

In dev, glass-ui's color operations come from this 7.7 KB prebundled record while demo source (and
therefore `sample.ts`) gets `/dist/subpaths/color.js` served raw — two module records of the same
source. The alias *did* apply (the sourcemap proves it resolved to the checkout, not the tarball),
the library is `sideEffects: false` with frozen data, and the production build resolves both to one
file. **No correctness consequence; recorded because it is the mechanism by which an alias slip in
L-10 would go unnoticed** — a second copy already loads without anyone seeing it.

---

## 2. If I were structuring this greenfield today

The current module is filed by **who authored it** (T.W6 Lane D, hence `color-session/`) and holds
three unrelated kinds of thing behind one barrel. The lattice below files by **what each thing is**.
No new directory, no new shared/ tree, no wrapper component that does not already exist.

```
src/color/                          ── THE LIBRARY owns "sample an interpolation"
  interpolate.ts
    export function sampleMix(from, to, k, opts): Result<AnyColor[], ColorIssue>
    export function sampleChain(colors: readonly AnyColor[], k, opts)
  → published through src/subpaths/color.ts (the existing ./color export; no new subpath)

demo/color-session/                 ── COLOR TRUTH (unchanged home, correct home)
  ramp.ts            (was color-chips/sample.ts, minus the component bits)
    sampleInterpolationRamp()  = parse operands → sampleChain() → colorToCss(_, "oklch")
    — no k arithmetic, no joint dedupe, no `.replace(/ \/ 1\)$/)`

demo/shared/ui/                     ── CROSS-FEATURE PRESENTATION (exists: EmptyState, PaneHeader)
  PreviewRamp.vue    props: { stops: readonly string[] }   imports: vue only
  PreviewStrip.vue   props: { stops: readonly string[] }   imports: vue only
  preview-stops.ts   stampStops() + rampPaint() — the O-14 pair, ONE module, unit-testable

demo/styles/utils.css               ── ROOT-LEVEL STYLING (exists)
  .preview-chip { inline-size: var(--phi-4); block-size: 1em; border-radius: var(--radius-sm);
                  box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--foreground) 12%, transparent); }
```

**The four moves, in order of value:**

1. **Push the sampler into the library.** "Sample an interpolation into k stops" is pure color math
   over `mixColors`, which `src/` already publishes. Today the demo carries **four**
   implementations of it (`sample.ts:52`, `mixStage.ts:93`, `useGradientInterpolation.ts:27`,
   `useSliderGradients.ts:29`) with three different k's (16, 16, 1, 10) and three different
   encoders. One library function with an encoder left to the caller kills all four and turns the
   demo into a genuine consumer of the published surface — which is the entire point of the
   dogfood keystone. This subsumes L-1 (the alpha regex disappears with `serializeStop`), L-4, and
   most of L-7. **This is the architectural transposition; take it, do not patch around it.**

2. **Split presentation from color truth** and file each in its existing home (L-5, L-9). The chips
   become what their own doc-comments claim they are — `<span>`s that paint what they are handed,
   with a `vue`-only import list. `stampStops` + the gradient string move into one 6-line module
   beside them, so "paint ≡ stops" becomes a vitest assertion over two pure functions instead of a
   Playwright leg (L-7).

3. **One `.preview-chip` recipe in `utils.css`, reading `var(--phi-4)`** (L-2, L-3). The house rule,
   the named S.W7-7 lesson, and the DESIGN.md:388 cross-feature test all already say so.

4. **Pin the package graph** (L-10, L-11): an `overrides` entry resolving `@mkbabb/value.js` to the
   checkout so one copy exists in `node_modules`, and regenerate `tsconfig.demo.json` `paths` from
   `package.json#exports` the way `vite.config.ts:43-51` already generates its alias set — the
   comment claims they mirror; make the claim structural, and the three dead keys delete themselves.

**On the description lane (L-6):** the honest options are (a) accept the three-way drift and fix the
two missing `min-w-0`s, or (b) let the chip components render the lane (`<PreviewRamp :stops
:description>`), which removes a composition without adding a wrapper. (b) is the greenfield
answer; (a) is the minimum. I do not recommend a new `PreviewDescription` wrapper — that is the
contrivance edict 3 forbids.

**On glass-ui (edict 4):** glass-ui 7.0.0 publishes `./chip` (`node_modules/@mkbabb/glass-ui/dist/
components/chip/{Chip.vue.d.ts,chipVariants.d.ts}`, styles at `dist/styles/glass/glass-chip.css`),
already consumed by the demo at `EasingSpecimenStrip.vue:14`. It is a **label/action chip** (pill /
cell / icon shapes, padding + text scales) — *not* a color plate; PreviewRamp is not a misuse of it.
But the demo mints a class literally named `preview-chip` for a different concept while
`.glass-chip` exists, which is the name collision edict 4's "reuse existing component-type names"
guards against. glass-ui ships `./color` and `./watercolor-dot` and **no swatch/ramp primitive**
(`ls node_modules/@mkbabb/glass-ui/dist | grep -iE "swatch|chip|ramp|gradient|preview|stop"` →
`chip*` only). A `Swatch` primitive in glass-ui is the edict-4-correct home for the F7 plate; that
is a BH/BI relay decision, not a value.js one, and I record it as a relay item rather than a
finding.

---

## 3. What I checked and found SOUND (the negative proof)

These were the seat's premises and they do not hold — recorded with evidence so the next seat need
not re-run them:

1. **The library import is correct and a real consumer could write it.** `sample.ts:27-31` imports
   `@mkbabb/value.js/color`, which is a genuine `package.json#exports` key (`"./color"`,
   `package.json:21-24`) resolving to `dist/subpaths/color.js`. No deep path, no `src/` reach. The
   whole `color-chips/` module contains **zero** `@src`/`src/` imports.
2. **No boundary violation in the component's own imports.** `PreviewRamp.vue` imports `vue` and a
   sibling. It reaches no shell, no boot chain, no router, no store. (`AuroraPane`'s
   `aurora-harmony-stops.ts` read-consumes a boot module, but that is the strip's chain, not the
   ramp's.)
3. **`@mkbabb/value.js/color` and `/css` resolve to the CHECKOUT in all three resolvers** — tsc
   (traceResolution, quoted in L-10), vitest's Vite resolver (`scratchpad/probe/resolve.mjs`), and
   the dev/build alias (`vite.config.ts:43-51`). The O-14 vitest oracle is therefore testing the
   real library, not the stale tarball. I expected the opposite and it is not so.
4. **`verbatimModuleSyntax` is respected.** `sample.ts:29-30` uses inline `type` modifiers,
   `sample.ts:33` is `import type`. `PreviewRamp.vue` has no type imports.
5. **Vue 3.5 idiom is correct.** `PreviewRamp.vue:19` uses reactive props destructure; no
   `defineModel` round-trip exists here so no `shallowRef` question arises; no template ref needed.
6. **No animation was deleted.** The chip declares static paint / PRM-neutral
   (`PreviewRamp.vue:14`) and holds no keyframes; `PreviewStrip.vue:74` keeps its scoped truncation
   mask, which is legitimately scoped (one consumer).
7. **`demo/palettes/export.ts` + `usePaletteExport.ts` vs `export/serializers`, `ActionBarLayer`'s
   `useLayerTransition`, and the three `useDark` stores** — the named historical suspects — are
   **not** on this component's cone. Not this seat's finding.
8. **The O-14 machinery exists and is real** (`test/preview-chips.test.ts`,
   `e2e/smoke/oracles/o14-preview-truth.spec.ts`, `o20-generate-plate.spec.ts`). Its one blind spot
   is the tautology at `test/preview-chips.test.ts:48` (L-1), not its existence.
9. **Visual matrix is clean for the routes but blind to the component.**
   `docs/tranches/V/megatranche/audit/visual/REPORT.md`: `blankOrNearBlank — 0`, `pageErrors — 0`,
   `horizontalOverflow — 0`, `darkClassMissing — 0`; the single console error is
   `safari-desktop-light /#/: WebGL: context lost` (the hero blob, unrelated). The chips render only
   inside an open `SelectContent`, which reka unmounts when closed, so **none of the 60 captures
   contains a chip** — the matrix cannot confirm or deny this component's rendering. A live probe
   was attempted and declined by the shared browser lock (`Browser is already in use for
   …/mcp-chrome-83447af`); per the probe-parsimony edict I did not force an isolated instance, and
   I have marked L-6's overflow consequence a hypothesis rather than claim what I did not see.

---

## 4. Verdict

**DEFECTIVE.** Seven MAJOR + three MINOR + one INFO. The component itself is 50 honest lines; the
structure under it is the defect. Three mechanism families:

- **F-A · ownership inversion** (L-1, L-8) — the demo re-implements or repairs serialization the
  library owns. The proven one, L-1, is dead code that the oracle is constitutionally unable to see.
- **F-B · one concept, many homes** (L-2, L-3, L-4, L-6, L-7) — the F7 plate (2 scoped twins), the φ
  token (2 re-hardcodes), the k=16 sampler (4 implementations), the description lane (3 drifted
  compositions), the stops→gradient string (6 mints).
- **F-C · a package graph that is right only by redirection** (L-10, L-11, L-12) — a registry copy
  of the package under development sits in its own `node_modules` with already-drifted bytes, and
  three configs must independently agree for the dogfood claim to hold. One is already a fiction
  (L-11's `paths` map).

The single highest-value move is not a patch: **publish the ramp sampler from `src/color` and let
the demo consume it.** That one transposition retires L-1, L-4, most of L-7, and turns
`demo/color-session/color-chips/` from a four-kind grab-bag into two small, correctly-homed things.
