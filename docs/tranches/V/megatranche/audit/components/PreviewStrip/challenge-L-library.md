# CHALLENGE-L — library structure · `demo/color-session/color-chips/PreviewStrip.vue`

**Pass 2** · 2026-07-28. Pass 1 preserved at `challenge-L-library.pass-1-2026-07-28.md`.

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context tier this seat
was explicitly spawned with. Declared, not inherited.

---

## Posture — what this pass adds, and what it takes away

Pass 1 audited the *demo's internal lattice* around the chip (misfiled `stampStops`, duplicated
material, three serializers, four truncation homes) and pronounced the **library boundary SOUND**:

> *"§2 · The published-surface question — NEGATIVE PROOF … It consumes the map, exclusively …
> **This axis is SOUND and is the strongest structural property of the subject's neighbourhood.**"*
> — `challenge-L-library.pass-1-2026-07-28.md:107-139`

**That negative proof is wrong.** It tested the *specifier strings the demo writes* and never tested
the *map they are claimed to resolve through*. This pass tests the map, the resolvers, the type
surface, the dependency manifest, and the enforcement config. Every one of those five is defective,
and one of them (`package.json#dependencies`) is a shipping BLOCKER that makes every downstream
consumer of `@mkbabb/value.js` install a duplicate pinned copy of `@mkbabb/value.js`.

This pass also **retracts a pass-1 measurement**: the "62.5 KiB of published library chunk reachable
from a 76-line component" costs **zero shipped bytes** — measured, §5.

- **Subject:** `/Users/mkbabb/Programming/value.js/demo/color-session/color-chips/PreviewStrip.vue`
  — 76 lines (`grep -c "" …` → 76).
- **Tree:** branch `tranche-u`. Prompt names HEAD `c654824e`; working HEAD at audit time is
  **`f36f780c`** (`docs(V·mega): STATE — three OM censuses complete…`).
  `git status --porcelain demo/ src/ test/ e2e/` → **empty**. All measurements are against a clean
  `demo/`/`src/`/`test/`/`e2e/` at `f36f780c`.
- **Consumers** (`grep -rn "PreviewStrip" demo src test e2e`):
  `demo/workbenches/generate/GenerateControls.vue:20,245,274` ·
  `demo/scenes/atmosphere/AuroraPane.vue:39,132`. Two features, three call sites.
  `test/preview-chips.test.ts:31` imports the *sibling* `sample.ts`, never the component.

---

## §1 · The import trace — verified independently

`PreviewStrip.vue` declares two imports, lines 21–22: `computed` from `vue`, `stampStops` from
`./sample`. I re-walked the closure with my own walker
(`probe-L-closure.mjs`, relative specifiers only, halting at bare):

```
$ node docs/…/PreviewStrip/probe-L-closure.mjs demo/color-session/color-chips/PreviewStrip.vue

### demo/color-session/color-chips/PreviewStrip.vue
  relative modules in closure: 4
    demo/color-session/color-chips/PreviewStrip.vue       2615B
    demo/color-session/color-chips/sample.ts              3721B
    demo/color-session/color-utils.ts                     1092B
    demo/color-session/picker-color.ts                    8402B
  total 15830B
  bare specifiers reached:
    @mkbabb/value.js/color   <- sample.ts, picker-color.ts, color-utils.ts
    @mkbabb/value.js/css     <- picker-color.ts
    vue                      <- PreviewStrip.vue
```

Reproduces pass 1 exactly. The subject's own file is import-clean; every library edge enters through
`sample.ts` → `color-utils.ts` → `picker-color.ts`. **`picker-color.ts` is therefore the real
subject of this seat** — it is where the demo meets the published surface, and it is the module the
chip's paint is computed through.

One hop out, the third call site's truth function reaches *upward*:

```
### demo/scenes/atmosphere/aurora-harmony-stops.ts
  relative modules in closure: 2
    demo/color-picker/composables/boot/atmosphere-calibration.ts  4681B
    demo/scenes/atmosphere/aurora-harmony-stops.ts                1784B
  bare specifiers reached:
    @mkbabb/glass-ui/aurora   <- aurora-harmony-stops.ts, atmosphere-calibration.ts
    @mkbabb/glass-ui/color    <- atmosphere-calibration.ts
```

Note what is *absent*: **`@mkbabb/value.js` does not appear in the AuroraPane strip's closure at
all.** One of this component's two hosts computes its colors through glass-ui's aurora engine and a
hand-written OKLCh serializer, with the library this repository publishes entirely out of the path.
(Finding L2-8.)

---

## §2 · The published surface — four defects at the boundary pass 1 cleared

### L2-1 · BLOCKER — `package.json#dependencies` makes value.js depend on itself, and ships ~6 MB to every consumer for zero code

**Defect.** `package.json:82-85` declares two **runtime** dependencies:

```json
"dependencies": {
    "@mkbabb/glass-ui": "^7.0.0",
    "@mkbabb/keyframes.js": "^6.0.0"
}
```

The published artifact imports **neither**. Nor anything else:

```
$ node -e '…scan every emitted ESM file in dist/ for import specifiers…'
files scanned: 10
relative imports (internal chunks): 10
BARE (external) specifiers in the published artifact: 0 []
```

`vite.library.ts:13` — `export const libraryExternal: string[] = [];` — everything is bundled by
construction. `src/` contains **zero** `@mkbabb/*` imports (`grep -rn "@mkbabb/" src/` → 2 hits, both
inside doc-comments naming the package's own subpaths). `files` (`package.json:51-55`) ships only
`dist`. **The published library has no runtime dependencies whatsoever.**

Both declared deps are demo-only (`grep -rn "@mkbabb/glass-ui" demo/` is extensive;
`grep -rn "@mkbabb/keyframes" src/ demo/ test/ e2e/` → **0**). They belong in `devDependencies`.

**The cycle.** `@mkbabb/keyframes.js@6.0.0` declares `"@mkbabb/value.js": "4.0.0"` — an **exact
pin**, a hard `dependencies` entry (`package-lock.json:1330`). So:

```
$ npm ls @mkbabb/glass-ui @mkbabb/keyframes.js @mkbabb/value.js
@mkbabb/value.js@4.0.0 /Users/mkbabb/Programming/value.js
├─┬ @mkbabb/glass-ui@7.0.0
│ ├── @mkbabb/keyframes.js@6.0.0 deduped
│ └── @mkbabb/value.js@4.0.0
└─┬ @mkbabb/keyframes.js@6.0.0
  └── @mkbabb/value.js@4.0.0 deduped
```

**The package depends on itself, transitively, at a hard pin, through its own declared
`dependencies`.** `node_modules/@mkbabb/value.js/` is a registry tarball of this very package
(`"resolved": "https://registry.npmjs.org/@mkbabb/value.js/-/value.js-4.0.0.tgz"`).

**Measured cost to a downstream consumer** of `npm i @mkbabb/value.js`:

```
$ du -sh node_modules/@mkbabb/glass-ui node_modules/@mkbabb/keyframes.js node_modules/@mkbabb/value.js
5.2M	node_modules/@mkbabb/glass-ui
608K	node_modules/@mkbabb/keyframes.js
168K	node_modules/@mkbabb/value.js      ← the duplicate, pinned copy
$ du -sh dist/subpaths ; du -ch dist/*.js | tail -1
132K	dist/subpaths
 28K	total
```

**≈ 6.0 MB of forced install to obtain a 160 KB library that imports nothing** — a 37× tax. And a
whole Vue design system (`@mkbabb/glass-ui`, 5.2 MB of `.vue`-compiled components, its own Vue and
reka-ui peers) is dragged into the dependency graph of a package whose stated identity
(`package.json:4`) is *"Immutable, failure-explicit CSS color, value, easing, transform, math, and
quantization capabilities."*

**Second-order consequence, and the one that touches this component.** Because keyframes.js's pin is
`"4.0.0"` and not `"^4.0.0"`, the *next* value.js publish (4.1.0, or the V·π parser work already
formed) produces a graph with **two live copies of value.js**: the app's 4.1.0 and keyframes.js's
pinned 4.0.0. For a library whose contract is branded immutable values and `Result` discriminants
crossing module boundaries, dual-instance is a correctness hazard, not just weight. In *this* repo it
is masked — `vite.config.ts:40-50` aliases the seven specifiers to the local `dist/` before node
resolution ever runs — so the demo (and PreviewStrip's `/color` + `/css` edges) never sees it. The
mask is exactly why it has survived.

**Reproduction.** The three commands above, verbatim, from the repo root.

**Proposed cure.** Move both entries to `devDependencies`. `dependencies: {}`. glass-ui already
declares value.js as an *optional peer* (`node_modules/@mkbabb/glass-ui/package.json`
`peerDependencies` + `peerDependenciesMeta.@mkbabb/value.js.optional: true`) — that is the correct
shape and value.js must not re-declare the reverse edge. keyframes.js's exact pin is a
cross-repository row: relay to the keyframes.js inbox that its `dependencies` should be a
`^4`-ranged **peer**, which is what dissolves the cycle at the ecosystem level rather than locally.

---

### L2-2 · MAJOR — the demo's library trust boundary is enforced by nothing; the config that claims to enforce it is 3-parts dead and 2-parts absent

**Defect.** `tsconfig.demo.json` carries a hand-rolled `paths` block whose comment states the law:

> *"The value.js published surface: the bare `.` root + the 7 subpath barrels, each → its
> `dist/*.d.ts` (the T.W1 demo-dogfood keystone; TS `paths` needs an explicit per-subpath entry —
> there is no `.../*` wildcard because the `exports` map is a **CLOSED 8-key set**). Mirrors the
> `vite.config.ts` runtime self-alias **generated from the same map**."*

Every clause is false.

```
$ node -e '…diff package.json#exports against tsconfig.demo.json paths…'
package.json exports keys: ["./color","./value","./css","./easing","./math","./transform","./quantize"]
tsconfig.demo paths:
   @mkbabb/value.js           -> ./dist/index.d.ts
   @mkbabb/value.js/color     -> ./dist/subpaths/color.d.ts
   @mkbabb/value.js/parsing   -> ./dist/subpaths/parsing.d.ts
   @mkbabb/value.js/math      -> ./dist/subpaths/math.d.ts
   @mkbabb/value.js/easing    -> ./dist/subpaths/easing.d.ts
   @mkbabb/value.js/units     -> ./dist/subpaths/units.d.ts
   @mkbabb/value.js/transform -> ./dist/subpaths/transform.d.ts
   @mkbabb/value.js/quantize  -> ./dist/subpaths/quantize.d.ts

IN tsconfig BUT NOT IN exports: [ '@mkbabb/value.js', '@mkbabb/value.js/parsing', '@mkbabb/value.js/units' ]
IN exports BUT NOT IN tsconfig: [ '@mkbabb/value.js/value', '@mkbabb/value.js/css' ]
```

The exports map is a **7**-key set, not 8. Three `paths` entries name subpaths that do not exist and
point at files that do not exist:

```
$ ls dist/*.d.ts                      # → no matches (there is no dist/index.d.ts)
$ ls dist/subpaths/
color.d.ts color.js css.d.ts css.js easing.d.ts easing.js math.d.ts math.js
quantize.d.ts quantize.js transform.d.ts transform.js value.d.ts value.js
                                      # → no parsing.*, no units.*
```

And two published subpaths — `./css` and `./value` — have **no `paths` entry at all**, yet
`picker-color.ts:28-34` (inside PreviewStrip's closure) imports `@mkbabb/value.js/css` and it
typechecks green.

**Mechanism.** The block is inert. What actually resolves the demo's library imports is TypeScript's
**package self-name reference** through the real `exports` map — which needs no configuration at all:

```
$ node docs/…/PreviewStrip/probe-L-resolve.mjs      # ts.resolveModuleName, paths removed entirely
### TS resolution with NO `paths` block at all:
   @mkbabb/value.js            -> UNRESOLVED
   @mkbabb/value.js/color      -> dist/subpaths/color.d.ts
   @mkbabb/value.js/css        -> dist/subpaths/css.d.ts
   @mkbabb/value.js/value      -> dist/subpaths/value.d.ts
   @mkbabb/value.js/parsing    -> UNRESOLVED
   @mkbabb/value.js/units      -> UNRESOLVED
   @mkbabb/value.js/math       -> dist/subpaths/math.d.ts
   @mkbabb/value.js/easing     -> dist/subpaths/easing.d.ts
   @mkbabb/value.js/quantize   -> dist/subpaths/quantize.d.ts
   @mkbabb/value.js/transform  -> dist/subpaths/transform.d.ts
```

Byte-for-byte the same resolution as with the block present. **Deleting the entire `paths` block
changes nothing** except removing three lies. The same is true of the runtime side — the 30-line
`valueJsSelfAlias` generator (`vite.config.ts:23-50`), whose comment narrates an R-era boot break:

```
$ node docs/…/PreviewStrip/probe-L-resolve.mjs
### (b) vitest.config.ts  [ORACLE]  importer=test/preview-chips.test.ts    ← NO value.js alias exists here
   @mkbabb/value.js/color -> dist/subpaths/color.js
   @mkbabb/value.js/css   -> dist/subpaths/css.js
   @mkbabb/value.js       -> THROWS  "." is not exported … (see exports field in package.json)
### (c) vite.config.ts    [APP]  importer=demo/color-session/color-chips/sample.ts
   @mkbabb/value.js/color -> dist/subpaths/color.js
   @mkbabb/value.js/css   -> dist/subpaths/css.js
   @mkbabb/value.js       -> THROWS  "." is not exported …
```

vitest — which has **no** value.js alias (`vitest.config.ts:6-11` aliases only `@src`) — resolves
identically to the aliased app config. All four resolvers (Node ESM, TS, Vite-app, Vite-test) agree,
and none of them needs the two configs that claim credit for the agreement.

**Why this is a finding and not a tidy-up.** The demo-dogfood keystone's whole value is that
"the demo can only write what a real consumer can write." That property is currently **accidental**
(a Node/TS resolution feature) rather than **enforced**. The dead `parsing` and `units` entries are
live invitations: a writer who types `import { … } from "@mkbabb/value.js/parsing"` gets a TS
resolution against a file that does not exist → `Cannot find module`, and will reasonably conclude
the *build* is broken rather than that the *subpath* is unpublished. The config lies in the exact
direction that produces a false public API.

**Proposed cure.** Delete the `paths` block for `@mkbabb/value.js*` from `tsconfig.demo.json`
entirely, and delete `valueJsSelfAlias` from `vite.config.ts`. Self-reference is the mechanism; make
it *the* mechanism. Then add the one thing neither config does — a gate that fails when a demo
specifier is not a key of `package.json#exports`:

```
G-L2-2:  comm -13 <(node -p 'Object.keys(require("./package.json").exports).map(k=>"@mkbabb/value.js"+k.slice(1)).sort().join("\n")') \
                  <(grep -rho '@mkbabb/value\.js\(/[a-z-]*\)\?' demo/ src/ test/ e2e/ | sort -u)   # must be empty
```

---

### L2-3 · MAJOR — the library's `Color<S>` does not distribute, so every demo call site that picks a space at runtime must defeat the type system; the cure is one alias in `src/color`

**Defect.** The library publishes (`dist/subpaths/color.d.ts:31-34, 43, 71-74`):

```ts
export declare type Color<S extends SpaceId> = Readonly<{ space: S; channels: ChannelsBySpace[S]; alpha: Alpha }>;
export declare type AnyColor = { [S in SpaceId]: Color<S> }[SpaceId];
export declare function convertColor<S extends SpaceId>(color: AnyColor, space: S): Result<Color<S>, ColorIssue>;
export declare function mixColors<S extends SpaceId>(from: AnyColor, to: AnyColor, progress: number,
    options: { readonly space: S; readonly hue?: HueInterpolationMethod }): Result<Color<S>, ColorIssue>;
```

`Color<S>` is a *non-distributive* mapped shape. When `S` is a generic parameter it is not assignable
to the union-member form the demo needs; when `S` is the full `SpaceId` union it is not assignable to
`AnyColor`. Both failure modes are live. The demo's response is nine casts:

```
$ grep -rn "as unknown as PickerColorIn\|as PickerColorIn\|as AnyColor" demo/ test/ --include='*.ts' --include='*.vue'
demo/workbenches/gradient/composables/useGradientCSS.ts:211           color: mixed.value as AnyColor
demo/workbenches/gradient/composables/useGradientInterpolation.ts:38  colorToCss(mixed.value as AnyColor)
demo/workbenches/mix/MixAnimationCanvas/composables/mixStage.ts:107   colorToRgb255(result.value as PickerColorIn<typeof space>)
demo/color-session/picker-color.ts:116                                valueOrThrow(convertColor(color, space)) as unknown as PickerColorIn<S>
demo/color-session/picker-color.ts:175                                buildColor(…) as PickerColorIn<S>
demo/color-session/picker-color.ts:192                                buildColor(…) as PickerColorIn<S>
demo/color-session/color-chips/sample.ts:82                           serializeStop(result.value as PickerColorIn<typeof space>)
demo/palettes/mix.ts:37                                               result.value as unknown as PickerColorIn<S>
test/preview-chips.test.ts:48                                         serializeStop(result.value as PickerColorIn<typeof space>)
```

Two of these are inside PreviewStrip's own import closure (`sample.ts:82`, `picker-color.ts:116`) —
i.e. **every stop this component paints is produced through a defeated type boundary** — and one is
inside the O-14 oracle that is supposed to guarantee the chip's truth (`preview-chips.test.ts:48`).
`useGradientCSS.ts:207-208` even carries a comment blaming the compiler:

> *"A runtime SpaceId keeps the discriminant/channel pair intact; TypeScript cannot distribute
> `Color<SpaceId>` back into `AnyColor`."*

**Mechanism, measured.** The demo mints its own replacement for `Color<S>` at `picker-color.ts:38`:

```ts
export type PickerColorIn<S extends SpaceId> = Extract<AnyColor, { readonly space: S }>;
```

That mint is what forces the two worst casts. Probe A/B compiles both real call shapes with the casts
**removed**, under the demo's own compiler options:

```
$ node docs/…/PreviewStrip/probe-L-types.mjs
### A_demo_Extract   (casts removed)  ->  2 error(s)
   line 10: TS2322 Type 'Readonly<{ space: S; channels: ChannelsBySpace[S]; alpha: Alpha; }>' is not assignable to type 'PickerColorIn<S>'.
   line 16: TS2322 Type 'Readonly<{ space: S; channels: ChannelsBySpace[S]; alpha: Alpha; }>' is not assignable to type 'PickerColorIn<S>'.

### B_library_Color   (casts removed)  ->  0 error(s)
```

**The `as unknown as` at `picker-color.ts:116` and the `as` at `sample.ts:82` are not forced by the
library — they are manufactured by the demo's duplicate type.** Typing `PickerColorIn<S> = Color<S>`
deletes both, today, with no library change.

That still leaves the union-shaped call (`useGradientCSS.ts:211`). Probe 2 shows neither published
signature shape can serve both call sites (`SHIPPED Result<Color<S>>` → 1 error at the union site;
`Result<Extract<AnyColor,{space:S}>>` → 1 error at the generic site). Probe 3 finds the **total
cure — one distributive alias, published from `src/color`**:

```
$ node docs/…/PreviewStrip/probe-L-types3.mjs
### TOTAL CURE (one distributive alias, 4 call shapes, ZERO casts) -> 0 error(s)
```

```ts
/* src/color/model.ts — one new exported alias */
export type ColorIn<S extends SpaceId> = S extends SpaceId ? Color<S> : never;
/* return positions become Result<ColorIn<S>, ColorIssue> for convertColor / mixColors / mapColorToGamut */
```

With that alias in the published `/color` surface, all four demo call shapes — generic-`S` sampling
(`sample.ts:75`, `mixStage.ts:102`, `palettes/mix.ts:35`), union-`S` gradient
(`useGradientCSS.ts:202`), `convertColor` (`picker-color.ts:116`), and "a `ColorIn<S>` must still be
usable as an `AnyColor`" — compile with **zero casts**. `PickerColorIn` deletes; the 25 references to
it (`grep -rn "PickerColorIn" demo/ test/` → 25 across 7 files) retarget onto the library's own name.

**Reproduction.** The three probe commands above, pasted output included. All three are committed
beside this report.

**Attribution.** New. Pass 1 did not read the published `.d.ts`.

---

### L2-4 · MINOR — `dist/` is not the artifact published as `4.0.0`, at the same version string

**Defect.** The working tree's `dist/` and the registry tarball for the *same version* differ:

```
$ for f in color css easing math quantize transform value; do cmp -s dist/subpaths/$f.js \
      node_modules/@mkbabb/value.js/dist/subpaths/$f.js && echo "$f IDENTICAL" || echo "$f ***DIFFERS***"; done
color.js  IDENTICAL (604B)
css.js  ***DIFFERS*** local=43973B registry=43972B
easing.js  IDENTICAL … math.js  IDENTICAL … quantize.js  IDENTICAL … transform.js  IDENTICAL … value.js  IDENTICAL
```

First divergence at char 140 — a different minifier identifier allocation in the entry only (the
content-hashed shared chunks `anchors-C_wdoOYd.js` / `operations-CB_1wGy4.js` / `result-CZJK1CwL.js`
are byte-identical in both trees):

```
LOCAL     … import { … r as ee, s as f, v as p, x as m, y as h } from "../anchors-C_wdoOYd.js";
REGISTRY  … import { … r as f,  s as p, v as m, x as h, y as g } from "../anchors-C_wdoOYd.js";
```

**Mechanism.** Behaviour is unchanged (renamed locals only), so this is MINOR — but it proves
`npm run prepare` at this tree does not reproduce the bytes published under `4.0.0`. `/css` is one of
the two library edges in PreviewStrip's closure (`picker-color.ts:28-34`), so the demo dogfoods a
`/css` that no consumer has. Given that L2-1 already puts a *second* copy of `4.0.0` in the graph,
"which 4.0.0" is a question the tree cannot presently answer.

**Reproduction.** The `cmp` loop above; byte-offset diff in `probe-L-resolve.mjs`'s sibling one-liner
(pasted above).

---

## §3 · Ownership and direction

### L2-5 · MAJOR — every demo layering gate in `eslint.config.js` matches zero files; the edge they exist to forbid is live in this component's data path

**Defect.** `eslint.config.js` carries three demo-layering gates — G-DEMO-1, G-DEMO-3a, G-DEMO-3b —
whose `files` globs are:

```
$ grep -n '"demo/@' eslint.config.js
235:            "demo/@/components/**/*.ts",
236:            "demo/@/components/**/*.vue",
237:            "demo/@/lib/**/*.ts",
238:            "demo/@/lib/**/*.vue",
275:            "demo/@/composables/**/*.ts",
276:            "demo/@/composables/**/*.vue",
$ ls -d demo/@
ls: demo/@: No such file or directory
$ find demo -path 'demo/@*' | wc -l
       0
```

`demo/@/` was deleted at W43 (RF-15 — the alias kill, narrated in `vitest.config.ts:5-9` and
`vite.config.ts:65-70`); the gates were not. Their banned patterns also target the dead `@components`
alias (`grep -rn '"@components' demo/` → **0**). G-DEMO-1's ban is, verbatim:

> *"the shared color layer … **must never import app-root boot (demo/color-picker)** — the spine is a
> clean lower layer."*

Measured effect on the two files this seat cares about:

```
$ npx eslint --print-config demo/scenes/atmosphere/aurora-harmony-stops.ts | jq -c '.rules["no-restricted-imports"]'
undefined
$ npx eslint --print-config demo/color-session/color-chips/PreviewStrip.vue   | jq -c '.rules["no-restricted-imports"]'
undefined
```

And the forbidden edge is live, in this component's own stop-producing path:

```
$ grep -rn "color-picker/composables/boot" demo/ | grep -v "^demo/color-picker/"
demo/scenes/atmosphere/aurora-harmony-stops.ts:23:import { resolveCalibratedAtmosphere } from "../../color-picker/composables/boot/atmosphere-calibration";
demo/test/glass/aurora-bracket.test.ts:14:} from "../../color-picker/composables/boot/atmosphere-calibration";
demo/picker/ColorPicker.vue:129:import { OVERTURE_KEY } from "../color-picker/composables/boot/useOverture";
```

`demo/scenes/atmosphere/` is a leaf scene; `demo/color-picker/composables/boot/` is the application's
boot chain (`vite.config.ts:15` imports from it too — the build config reaching into a
feature-*named* directory is the tell that the boot layer has no home of its own). This is precisely
the feature→shell edge the charter names, one hop from the subject, and it is what makes
`<PreviewStrip :stops="auroraHarmonyStops(atoms, h)" />` (`AuroraPane.vue:132`) resolvable at all.

**Mechanism.** A structural law was encoded as configuration, the tree was restructured beneath it,
and the configuration was left pointing at the old shape. Because eslint silently no-ops a `files`
glob that matches nothing, the law failed **open**. Owner edict 2 (no legacy) bites the config itself.

**Proposed cure.** Retarget the three objects onto the live tree and give the region names the tree
actually has. Concretely, one object per layer, over the real directories:

| layer | glob | banned |
|---|---|---|
| shared presentation | `demo/shared/**` | `../{color-session,palettes,picker,workbenches,scenes,shell,platform}/**` — shared reaches nothing |
| color/data spine | `demo/color-session/**` | `../{shell,scenes,workbenches,color-picker}/**` — the spine never reaches up |
| features | `demo/{workbenches,scenes,picker}/**` | `**/color-picker/composables/boot/**` — the G-DEMO-1 ban, retargeted; this is the rule that would have caught `aurora-harmony-stops.ts:23` |

And a gate that cannot rot the same way: a lint rule whose `files` glob matching **zero** files is
itself an error (`eslint --print-config` on one representative file per layer, asserted non-`undefined`
in CI). A gate that can silently match nothing is not a gate.

**Attribution.** New. Pass 1 named the `scenes/atmosphere → boot` edge (its §1, §5 move 5) but read
it as an un-gated architectural row; it did not find that a gate exists, forbids exactly this, and is
dead.

---

### L2-6 · MAJOR — `demo/color-session/picker-color.ts` is a second color model: it re-mints two library types and adds a 17-space channel model the library does not publish

**Defect.** `picker-color.ts` (8,402 B, in PreviewStrip's closure) declares:

```
picker-color.ts:36   export type PickerColor = AnyColor;                                  // pure re-mint
picker-color.ts:37   export type PickerSpace = SpaceId;                                    // pure re-mint
picker-color.ts:38   export type PickerColorIn<S extends SpaceId> = Extract<AnyColor, { readonly space: S }>;   // broken re-mint (L2-3)
```

Two of the three are *aliases of library names with no added meaning*. `PickerSpace` has **53**
references (`grep -rn "PickerSpace" demo/ test/` → 53) and `PickerColorIn` **25** — 78 references to
names that exist only to rename `SpaceId` and `Color<S>`. The charter's invariant is exactly one home
per concept; here "a color" and "a color space" each have two names, in a tree whose entire subject
matter is colors and color spaces.

**The other half is the reverse defect.** `picker-color.ts:52-70` declares `PICKER_CHANNELS` — a
complete channel model for all 17 spaces (per-channel key, min, max, unit, hue flag) — plus
`channelMeta`, `channelNumber`, `normalizedChannel`, `withChannel`, `withNormalizedChannel`,
`withAlpha`: **immutable per-channel update operations on a colour.** The library exports 34 names
from `/color` and none of them is any of these:

```
$ grep -o "export declare \(function\|const\|type\) [A-Za-z0-9_]*" dist/subpaths/color.d.ts | awk '{print $4}' | sort | tr '\n' ' '
Alpha AnyColor Channel ChannelsBySpace Color ColorIssue HueInterpolationMethod RGBA8 Result RgbGamut SpaceId
a98Rgb convertColor displayP3 hsl hsv hwb ictcp interpolateHue jzazbz kelvin lab lch linearSrgb
mapColorToGamut mixColors oklab oklch prophotoRgb rec2020 rgb safeAccentColor toRgba8 xyz

$ grep -rn "RANGES\|min:\|max:" src/color/*.ts        # → no matches; src/color has no channel-range table
```

The library publishes `ChannelsBySpace` (the tuple *shapes*) but not the channel *ranges*, and it
publishes seventeen constructor factories but no immutable setter. A package whose headline word is
**"Immutable"** cannot express "the same colour with `l` set to 0.62"; the demo can, in
`demo/color-session/picker-color.ts:165-193`. That is library-domain capability living in the demo —
and living, specifically, inside the closure of a 76-line presentational chip.

**Mechanism.** The library's surface was cut at "convert / mix / gamut-map / serialize" and stopped
short of "model" — so the *consumer of the library wrote the model*, and then had to rename the
library's types to make its own model self-consistent.

**Proposed cure.** Promote to `src/color`, published on `/color`: (a) `ColorIn<S>` (L2-3's alias,
which subsumes `PickerColorIn`); (b) `CHANNEL_RANGES: Record<SpaceId, readonly ChannelMeta[]>` — it
is derivable data about the spaces the library already owns and nobody else can own it correctly;
(c) `withChannel` / `withAlpha` returning `Result<ColorIn<S>, ColorIssue>` (failure-explicit, in
keeping with the package identity, replacing `PickerColorError` throws). `PickerColor`,
`PickerSpace`, `PickerColorIn` then delete outright, taking 78 references onto library names.
`picker-color.ts` shrinks to what is genuinely demo taste: `PICKER_SPACE_NAMES` (display strings) and
`CSS_PICKER_SPACES` (which spaces the app's UI offers).

---

### L2-7 · MAJOR — "sample an interpolation into k stops" has six homes, two identically-valued constants under two names, and four failure policies

**Defect.** Census of every `mixColors` call site in the demo:

```
$ grep -rn "mixColors(" demo/ --include='*.ts' --include='*.vue' | grep -v import
demo/workbenches/gradient/composables/useGradientInterpolation.ts:36
demo/workbenches/gradient/composables/useGradientCSS.ts:202
demo/workbenches/mix/MixAnimationCanvas/composables/mixStage.ts:102
demo/color-session/color-chips/sample.ts:75
demo/color-session/ink.ts:147
demo/palettes/mix.ts:35
```

| # | home | k / loop | on `!result.ok` | output form |
|---|---|---|---|---|
| 1 | `color-chips/sample.ts:52-86` | `RAMP_SAMPLE_COUNT = 16` (`:36`, **exported**) | `return null` (`:81`) | OKLCh string via `serializeStop` |
| 2 | `MixAnimationCanvas/…/mixStage.ts:100-108` | `RAMP_STOPS = 16` (`:28`, **module-private**) | `throw` (`:106`) | `RGB` bytes via `colorToRgb255` |
| 3 | `useGradientCSS.ts:195-213` | `stepsPerInterval` (caller-supplied) | `throw` (`:206-208`) | `{position, color}` + `as AnyColor` |
| 4 | `useGradientInterpolation.ts:34-39` | single `t` | `throw` (`:37`) | CSS string via `colorToCss` |
| 5 | `palettes/mix.ts:28-37` `mixedOrThrow` | single `progress` | `throw` (`:36`) | `as unknown as PickerColorIn<S>` |
| 6 | `ink.ts:146-154` | fixed `0.382` | `throw` (`:153`) | certified ink string |

Rows 1 and 2 are the *same function*: parse two operands, walk `k` inclusive samples, project each.
Same `k`, same value **16**, two constant names, two failure policies, two projections. Row 5 is
row 1's inner loop body extracted, with the opposite failure policy.

**The internal contradiction is inside row 1 itself.** `sample.ts:48-50` declares its contract —
*"Returns null when the preview has nothing TRUE to say"* — and honours it for parse (`:63-65`) and
mix (`:81`) failure. But `:82` calls `serializeStop` → `colorToCss` (`color-utils.ts:23`) →
`serializePickerColor` → `valueOrThrow` (`picker-color.ts:104-107`), which **throws**. A
serialization failure escapes as an exception from a function whose declared contract is
total-with-null. (Corroborates pass-1 L-2; the *duplicate-function* evidence and the six-home census
are new. I did not construct an input that makes `serializeCssColor` fail on an in-gamut OKLCh
triple — the escape path is proven statically; a live crash is a **hypothesis**.)

**Proposed cure.** `sampleRamp(colors, { space, hue, k }): Result<readonly ColorIn<S>[], ColorIssue>`
in `src/color` — it is general colour math over `mixColors`, it is what the package's own
`keywords: […, "palette"]` (`package.json:14`) already advertises and does not deliver, and it is the
one place a `k` constant should live. Rows 1, 2, 3 and 5 collapse onto it; each keeps only its own
*projection* (string / bytes / positioned stops) and discharges the one `Result` at its own edge.

---

### L2-8 · MINOR — the AuroraPane host bypasses the library entirely and hand-writes a CSS colour serializer

**Defect.** `demo/scenes/atmosphere/aurora-harmony-stops.ts` — the truth function for one of
PreviewStrip's two hosts — produces paintable CSS colour strings without touching value.js:

```
aurora-harmony-stops.ts:25-28   function fmt(v: number): string { return v.toFixed(4).replace(/\.?0+$/, ""); }
aurora-harmony-stops.ts:39      return palette.map((s) => `oklch(${fmt(s.L)} ${fmt(s.C)} ${fmt(s.h)})`);
```

Its closure (§1) reaches `@mkbabb/glass-ui/aurora` and `@mkbabb/glass-ui/color` and **no
`@mkbabb/value.js` subpath at all** — while `serializeCssColor` is published on `/css` and already
imported two modules away (`picker-color.ts:29`). In a repository whose demo exists to dogfood the
library, one of two hosts of the library's own preview-chip re-implements the library's serializer in
five lines. Owner edict 1 (no duplication) and the demo's dogfood premise both bite.

**Reproduction.** `node probe-L-closure.mjs demo/scenes/atmosphere/aurora-harmony-stops.ts` — output
in §1. (Pass 1 filed the three-serializer census; the *closure* evidence — that value.js is wholly
absent from this path — is new.)

---

### L2-9 · MINOR — the library's test tree holds ten demo test files; and `demo/shared/utils.ts` justifies a fork by citing an export that does not exist

**(a) Direction.** `vitest.config.ts:14-16` states the law: *"the test tree mirrors the src shape."*
`demo/test/` exists for demo suites. Yet:

```
$ grep -rln 'demo/' test/ --include='*.ts' | wc -l ;  find test -name '*.ts' | wc -l ;  find demo/test -name '*.ts' | wc -l
      10
      23
       3
```

**Ten of the twenty-three files in the library's src-mirror test tree import `demo/`** — including
`test/preview-chips.test.ts:31-33`, this component module's only unit oracle, and a whole
`test/demo/palettes/api/` subtree (a third home). The library's test suite depends on the
application. Cure: `test/` mirrors `src/` only; the ten demo suites move to `demo/test/`, whose
include glob already exists (`vitest.config.ts:15`).

**(b) A fork justified by a phantom.** `demo/shared/utils.ts:9-19`:

> *"`debounce` was the last symbol holding 7 demo files on the BARE `@mkbabb/value.js` specifier —
> the full-barrel import … The utility tail has no rightful subpath home …, so the demo owns its
> copy; **the library's root-barrel export stands for external consumers**."*

There is no root-barrel export. `package.json#exports` has no `"."` key; `ls src/index.ts` → absent;
`ls dist/*.d.ts` → no matches; Node throws `ERR_PACKAGE_PATH_NOT_EXPORTED`
(`probe-L-resolve.mjs` §(a)); and `grep -rn "export function debounce" src/` → **0 hits** — the symbol
is gone from `src/` altogether. The comment documents a public surface that does not exist, for a
consumer who cannot reach it. Owner edict 2. Cure: the fork is fine (the demo genuinely owns its
debounce now); the sentence is legacy and deletes.

---

## §4 · The subject file itself — clean

`PreviewStrip.vue` is 76 lines, one prop, one derived pair, one template, one scoped style. Against
the eight standing edicts:

| edict | verdict | evidence |
|---|---|---|
| 1 no god modules | PASS | 76 lines; adds to nothing |
| 2 no legacy | PASS | no shim, no alias, no fallback in the file |
| 3 KISS | PASS | no new dir, no wrapper |
| 4 glass-ui first | PASS | glass-ui 7.0.0 `./chip` is a *pill* (padding/gap/text), `./watercolor-dot` a dot; neither is a swatch strip. Nominal residue only: the demo mints the word "chip" for a swatch while the design system owns `Chip`. **INFO.** |
| 5 root-level styling | **FAIL (pass-1 L-5/L-6)** | `.preview-chip` declared twice, in two `scoped` blocks, already divergent (`display`, `overflow`); `2.618rem` hardcoded twice while `--phi-4` exists (`demo/styles/foundation.css:462`) |
| 6 animations | PASS | static paint by design; no keyframes present, none removed |
| 7 Vue 3.5 | PASS | reactive props destructure `:27`, `computed` `:32-35`, no ref mirror, no `defineModel` |
| 8 `verbatimModuleSyntax` | PASS | `:21` imports the value `computed` only; `sample.ts:29-30,33` mark every type-only import |

I re-verify pass-1's L-5/L-6/L-7 and do not restate them; they stand as written.

---

## §5 · Retraction — the barrel edge costs zero shipped bytes

Pass 1's headline L-1 evidence was:

> *"Published bytes reachable from a 76-line component that needs a string join: … → 63,978 B ≈
> 62.5 KiB"* and *"−62.5 KiB of reachable library from a presentational leaf"*
> (`pass-1:74-82, 486`)

That number is a **static-closure** figure presented as a cost. Measured against a real bundler it is
zero. `probe-L-treeshake.mjs` builds three minimal entries with the repo's own plugin + alias set:

```
$ node docs/…/PreviewStrip/probe-L-treeshake.mjs
### A-barrel   total=  1601B  files=out.css:498 out.js:1103
     markers: {"mixColors-impl":false,"parseCssColor-impl":false,"convertColor-impl":false,"stampStops-inlined":true}
### B-direct   total=  1601B  files=out.css:498 out.js:1103
     markers: {"mixColors-impl":false,"parseCssColor-impl":false,"convertColor-impl":false,"stampStops-inlined":true}
### C-nostamp  total=    86B  files=out.js:86
```

`import { PreviewStrip } from "…/color-chips"` (through the barrel, A) and
`import PreviewStrip from "…/PreviewStrip.vue"` (direct, B) emit **byte-identical** output, and
neither contains any colour-engine code — Rollup shakes `sample.ts` down to the inlined `join("|")`.

**The wrong-direction edge is real and remains a finding — as an ownership and type-boundary defect
(it is how `picker-color.ts`'s casts reach a presentational leaf), not as a weight defect.** The
honest cost is three extra module fetches on the un-shaken dev server. Any cure gated on bundle bytes
would be gated on a number that is zero; gate it on the module graph instead (G-1 below).

---

## §6 · Negative proofs — hunted, and clean

1. **Deep imports into `src/`.** `grep -rn "@src/" demo/ --include='*.ts' --include='*.vue'` → **0**;
   `grep -rn 'value\.js/dist\|from "\.\./\.\./\.\./src/' demo/` → **0**. Every demo specifier is a
   real key of `package.json#exports` (`grep -rho '@mkbabb/value\.js\(/[a-z]*\)\?' demo/ | sort | uniq -c`
   → `25 /color · 10 /css · 6 /math · 5 /easing · 4 /quantize`, plus one occurrence of the bare name
   in a *comment* at `demo/shared/utils.ts:12`, zero in import position). The *strings* are clean —
   what pass 1 got right. It is the map and the resolvers behind them that are not (L2-1..L2-4).
2. **`ERR_PACKAGE_PATH_NOT_EXPORTED` is not reachable from demo code.** Bare-root import count in
   import position: 0. The missing `"."` export is only a defect via L2-9(b)'s stale comment.
3. **The library does not already own the ramp sampler.** `grep -rn "export function .*[Rr]amp\|
   .*[Pp]alette" src/` → 0. `sampleInterpolationRamp` is not a duplicate of library code; it is
   *un-promoted* library code (L2-7).
4. **glass-ui reimplementation.** Checked against glass-ui 7.0.0's 70-key exports map. `./chip` is a
   pill, `./watercolor-dot` a dot. `PreviewStrip` is not a demo-local copy of a glass-ui primitive.
5. **Route health.** `audit/visual/REPORT.md:124,126,139,141,154,156,169,171` — `/#/generate` and
   `/#/atmosphere`, all four Safari matrices: `overflowX 0`, `pageErr 0`, `consoleErr 0`.
6. **The visual matrix is structurally silent on this component — confirmed by eye.** I read
   `audit/visual/shots/safari-desktop-light/generate.png`: the PRESET and HARMONY controls render as
   closed, text-only triggers ("Vibrant", "Golden"); `PreviewStrip` lives only inside an open
   `SelectContent`, which the static capture never opens. Zero chips in the frame. The capture
   neither exonerates nor accuses; §1's probes and pass-1's live count-12 census are the substitute.
7. **`verbatimModuleSyntax` across the whole closure.** No mixed value/type import in any of the four
   modules.

---

## §7 · Greenfield — the lattice I would build today

Pass 1's demo-side lattice (collapse the two chips into one `PreviewChip`, move it to
`demo/shared/ui/`, one `stops.ts` adapter, absorb the three other truncated strips) is right and I
adopt it unchanged. What it is missing is the layer *below* it — the cut between library and demo is
in the wrong place, and three of this pass's findings are consequences of that one misplacement.

```
┌─ src/color  (PUBLISHED on @mkbabb/value.js/color) ──────────────────────────┐
│  type Color<S>                                                              │
│  type ColorIn<S> = S extends SpaceId ? Color<S> : never      ← NEW (L2-3)   │
│      · every Result<…> return position retargets onto it                    │
│      · deletes PickerColorIn + 9 casts, repo-wide (probe-L-types3: 0 errs)  │
│  const CHANNEL_RANGES: Record<SpaceId, readonly ChannelMeta[]> ← NEW (L2-6) │
│  withChannel / withAlpha  : Result<ColorIn<S>, ColorIssue>    ← NEW (L2-6)  │
│      · the "Immutable" in the package description, finally expressible      │
│  sampleRamp(colors, {space, hue, k}): Result<readonly ColorIn<S>[], …>      │
│                                                               ← NEW (L2-7)  │
│      · the ONE k; the `palette` keyword the package already advertises       │
│  package.json:  dependencies {}   (glass-ui + keyframes.js → dev) ← (L2-1)  │
└─────────────────────────────────────────────────────────────────────────────┘
        ▲ reached ONLY by self-reference through `exports`; no `paths`, no alias (L2-2)
┌─ demo/color-session  (the app's colour taste — and nothing else) ───────────┐
│  picker-color.ts →  PICKER_SPACE_NAMES · CSS_PICKER_SPACES  (≈60 lines)     │
│      PickerColor / PickerSpace / PickerColorIn  DELETED (78 refs retargeted)│
│  stops.ts  →  PaintableStop brand + ONE Result policy   (pass-1 §5.3)      │
└─────────────────────────────────────────────────────────────────────────────┘
        ▲ features import DOWN — enforced, per-layer, by a LIVE eslint object (L2-5)
┌─ demo/shared/ui  (exists: EmptyState.vue, PaneHeader.vue) ─────────────────┐
│  PreviewChip.vue  — one material (var(--phi-4) × 1em), one cap token,      │
│                     one honest-overflow grammar, one `data-stops` meaning   │
│                     props: { stops: readonly PaintableStop[] }              │
│                     ZERO library edges — structurally unable to re-draw L-1 │
└─────────────────────────────────────────────────────────────────────────────┘
     ▲ workbenches/generate   workbenches/mix   scenes/atmosphere   palettes/browser/*
┌─ demo/boot  ← demo/color-picker/composables/boot/ REHOMED (L2-5) ──────────┐
│  the app-shell boot chain, out of the feature-named directory that          │
│  vite.config.ts:15 and aurora-harmony-stops.ts:23 both currently reach into │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Ledger.** Library **+4 exports** (`ColorIn`, `CHANNEL_RANGES`, `withChannel`/`withAlpha`,
`sampleRamp`) and **−2 dependencies**. Demo **−3 type mints (78 references retargeted)**,
**−9 casts**, **−1 component**, **−5 duplicate sample loops**, **−3 serializers**, **−2 sample-count
constants**, **−1 hand-rolled OKLCh emitter**, **−1 dead `paths` block**, **−1 dead alias generator**,
**−3 dead lint objects**, **−10 misfiled test files**. Nothing is added to the demo but one branded
type and one adapter.

**The single sentence.** *The library stopped at "convert and mix"; the demo wrote the model, renamed
the library's types to fit it, and then had to cast at every seam. Move the model down and the seams
disappear.*

---

## §8 · Verdict

**DEFECTIVE.** Nine findings this pass — 1 BLOCKER, 5 MAJOR, 3 MINOR — plus one retraction of a
pass-1 measurement and one reversal of a pass-1 negative proof.

**Strongest: L2-1.** It is the only finding that is *already shipped*: `@mkbabb/value.js@4.0.0` is on
the public registry today declaring a 5.2 MB Vue design system and an animation library as runtime
dependencies of a colour library that imports nothing, and one of those two drags a second, pinned
copy of `@mkbabb/value.js` into every consumer's tree. It costs downstream users ~6 MB for a 160 KB
package, it makes the version string ambiguous, and it arms a dual-instance hazard the moment the
next version publishes. Every other finding on this page is fixable in-tree at leisure; this one is
public.

**Runner-up: L2-3**, because it has a *proven* total cure (probe-L-types3 → 0 errors with 0 casts)
that deletes 9 type-system escapes and 78 duplicate-name references from one added alias, and because
two of those escapes sit on the exact path that computes every stop this component paints.

### Gates a cure must pass

- **G-1** `node probe-L-closure.mjs <the chip>` → relative closure = 1 module; bare specifiers = `{vue}`.
  Zero `@mkbabb/value.js/*` in a presentational leaf's graph. *(Not a byte gate — §5.)*
- **G-2** `node -e 'console.log(JSON.stringify(require("./package.json").dependencies))'` → `{}`,
  **and** `npm ls @mkbabb/value.js` shows exactly one node (the root). *(L2-1.)*
- **G-3** `grep -c '@mkbabb/value.js' tsconfig.demo.json vite.config.ts` → 0 in `paths`/`alias`
  position, **and** the G-L2-2 `comm` gate in §2 emits nothing. *(L2-2.)*
- **G-4** `grep -rn "as unknown as PickerColorIn\|as PickerColorIn\|as AnyColor" demo/ test/` → **0**
  (today: 9), **and** `grep -rn "PickerColorIn\|PickerSpace\|PickerColor\b" demo/ test/` → 0
  (today: 78+). *(L2-3, L2-6.)*
- **G-5** `npx eslint --print-config demo/scenes/atmosphere/aurora-harmony-stops.ts` reports a
  non-`undefined` `no-restricted-imports`, **and** `demo/scenes/atmosphere/aurora-harmony-stops.ts:23`
  fails lint before it is rehomed. Plus a CI assertion that no lint object's `files` glob matches zero
  files. *(L2-5.)*
- **G-6** `grep -rn "mixColors(" demo/ | grep -v import` → ≤ 2 (a projection each for
  bytes-vs-strings), and exactly one `k` constant repo-wide. *(L2-7.)*
- **G-7** `grep -rln 'demo/' test/` → **0**; every demo suite under `demo/test/`. *(L2-9a.)*
- **G-8** `cmp dist/subpaths/css.js` against the tarball for the version in `package.json` →
  identical, or the version is bumped. *(L2-4.)*
- **G-9** (inherited, pass-1) `grep -rn "SEGMENT_CAP\|2\.618rem" demo/` → one exported cap, zero
  hardcoded `2.618rem` outside `demo/styles/foundation.css:462`; `.preview-chip` declared once.

### Probe artifacts (committed beside this report)

| file | what it decides |
|---|---|
| `probe-L-closure.mjs` | independent import-closure walk; §1 |
| `probe-L-resolve.mjs` | Node ESM / TS / Vite-app / Vite-test resolution of all 10 candidate specifiers; L2-1, L2-2, L2-9b |
| `probe-L-types.mjs` | `Extract<AnyColor,…>` vs `Color<S>` with casts removed — 2 errors vs 0; L2-3 |
| `probe-L-types2.mjs` | three published-signature shapes × two real call shapes; L2-3 |
| `probe-L-types3.mjs` | the total cure — one distributive alias, four call shapes, 0 errors; L2-3 |
| `probe-L-treeshake.mjs` | barrel vs direct import, real Rollup build — byte-identical, 0 engine code; §5 retraction |
