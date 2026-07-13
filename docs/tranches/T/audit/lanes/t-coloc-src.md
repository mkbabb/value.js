# Lane t-coloc-src — COLOCATION CENSUS 4 (E-1, the library `src/`)

**Mandate**: `docs/tranches/T/MANDATE-2026-07-06.md` §2 **E-1 THE COLOCATION GRAND EDICT**
(recursive, all file directories), abstracted "befitting for those languages/idioms" — here the
idiom is a **published library** whose subpath `exports` map binds the public shape.
**Substrate**: `tranche-t` = master @ `cc4f4fa` (S close). **Scope**: `src/**` + `test/**` +
the build wiring that freezes the surface (`package.json#exports`, `vite.library.ts`).
**Sibling lanes**: `t-coloc-components` (demo components), `t-coloc-composables-lib` (demo module
tier). This lane owns the **library** tier — a categorically different animal from the demo,
because here a wrong move is a **semver break to published consumers**, not just an in-repo churn.

**This is DEVELOPMENT** — census + target-structure + the FORBIDS/FREE ledger. ZERO product code.

---

## §0 The load-bearing frame — the public surface is a NAME SET, not a file tree

The single fact that governs every E-1 move in `src/`:

**`package.json#exports` is a CLOSED SET of 8 keys with NO wildcard** (`package.json:25-66`):

```
"."  "./color"  "./parsing"  "./math"  "./easing"  "./transform"  "./units"  "./quantize"
```

There is no `"./*"` re-export. `"files": ["dist"]` ships the whole `dist/` tree, but a consumer
can *resolve* only those 8 specifiers — Node/bundler subpath resolution refuses any key not in
the map. Therefore:

> **The 3.x public contract is the SET OF EXPORTED NAMES from `src/index.ts` (the `.` root) plus
> the 7 `src/subpaths/*.ts` barrels — NOT the internal file layout under `src/`.** A file may move
> anywhere under `src/` with ZERO semver impact **as long as the owning barrel re-exports the same
> symbol names**. Renaming or dropping an *exported symbol* is the only breaking act.

I verified the closed-set claim three ways:
- `package.json:25-66` — 8 literal keys, no glob.
- The dts test (`test/dts-published-surface.test.ts:30-38`) asserts the surface *by symbol name*
  (`extractFunctions`) in `dist/index.d.ts` + `dist/subpaths/parsing.d.ts` — it locks names, never
  file paths. That is the contract the repo itself chose to guard.
- `scripts/proof-subpath-resolve.mjs` asserts the 8 map targets *exist as built chunks* and yield
  their *symbols* — again name-keyed, layout-agnostic.

This is what makes the library tier the **most freely restructurable** tier in the whole
constellation under E-1 — the opposite of the demo, where every component is reachable by path.
The catch, and the real finding of this lane, is §2: **the in-repo consumers (demo + test) do NOT
respect the barrier** and reach raw internal file paths, which converts "semver-free" into "23
import-sites to update per move." That coupling — not semver — is the true cost of E-1 here.

### §0.1 What the build actually freezes (the load-bearing FILE paths)

`vite.library.ts:27-55` auto-discovers entries:
- **Tier 1**: `src/index.ts` → `dist/value.js` (the `.` monolith).
- **Tier 2**: every `src/subpaths/*.ts` → `dist/subpaths/<name>.js`, picked up by `readdirSync`
  with **no hand-list** — add a `.ts` there and a new chunk appears automatically.

So the build-frozen *paths* are exactly: `src/index.ts`, the `src/subpaths/` **directory name**,
and each `src/subpaths/<name>.ts` **filename** (the filename == the dist chunk name == the exports
target stem). `libraryFileName` (`vite.library.ts:53-55`) hard-codes the `index → value.js` legacy
name and the `subpaths/` prefix; the prefix is documented load-bearing (a flat `dist/units.js`
would shadow the mirrored `dist/units/` dts dir and collapse `ValueUnit` to `any`,
`vite.library.ts:45-52`). **Everything the barrels import is free.**

---

## §1 The census — `src/**` as-landed (S close)

`find`-verified tree (LoC = `wc -l`, the repo's own source-of-truth precept; the per-dir CLAUDE.md
files already renounce inline LoC — see §6). Long-running dirs flagged **[LR]**.

```
src/                                  root barrel + 4 pure leaves
├── index.ts            443   the "." root barrel (FROZEN name set — §0)
├── math.ts             137   pure numeric (lerp/bezier/clamp/scale/deCasteljau)
├── easing.ts           643   CSS timing-function table + bezier/steps/linear() solvers  [watch]
├── utils.ts            228   clone/memoize/debounce/RAF/case-convert
├── vite-env.d.ts         7   module decls
│
├── subpaths/                 the 7 FROZEN build-entry barrels (§0.1) — trivial re-export files
│   ├── color.ts        185   parse-that-FREE color surface (proof:subpath-budget C-color)
│   ├── parsing.ts      138   the ONE parse-that-COUPLED chunk (C5)
│   ├── units.ts         60   parse-that-free unit core
│   ├── easing.ts        32 · math.ts 18 · transform.ts 22 · quantize.ts 8
│
├── parsing/            [LR]  15 flat files, 5+ concerns, four 600+ LoC files
│   ├── index.ts        586   top-level compose: parseCSSValue, gradients, transforms, var/calc
│   ├── color.ts        718   ← color-parse CLUSTER head
│   ├── color-unit.ts    59   ← used ONLY by color.ts + relative-color.ts
│   ├── relative-color.ts 164 ← used ONLY by color.ts
│   ├── units.ts        154   dimension parsers
│   ├── math.ts         525   calc() AST + math-fn eval
│   ├── utils.ts        603   parse-that primitives (istring/number/none/tryParse)
│   ├── easing.ts       324   ← timeline CLUSTER: linear()/steps/spring parsers
│   ├── scroll-timeline.ts 658 ← timeline CLUSTER: animation-timeline/range/trigger grammar
│   ├── animation-shorthand.ts 208
│   ├── stylesheet.ts   643   ← stylesheet CLUSTER head (at-rules + qualified rules)
│   ├── stylesheet-types.ts 120 ← stylesheet CLUSTER: shared AST types (extract/serialize/stylesheet/scroll-timeline)
│   ├── extract.ts      301   ← stylesheet CLUSTER: keyframes/properties/rules walkers
│   ├── serialize.ts    277   ← stylesheet CLUSTER: AST → string + prettier
│   └── syntax.ts       219   <syntax> validator (VJ-Q6)
│
├── units/             [LR]  core value classes + the color subsystem
│   ├── index.ts        422   ValueUnit/FunctionValue/ValueArray/InterpolatedVar
│   ├── constants.ts    165   unit tuples (LENGTH_UNITS…) — broad, correctly-shared, stays put
│   ├── style-names.ts  641   STYLE_NAMES data table (W1-8 data-module split)
│   ├── dom-metrics.ts  158   viewport/font/cq px-resolution helpers (W1-8 split)
│   ├── utils.ts        601   unit conversion + flatten/unflatten
│   ├── normalize.ts    272   value normalization (static-imports parseCSSValue — the coupling)
│   ├── layout-cache.ts 296   getComputedValue + layout-epoch memo (W1-8 split)
│   ├── interpolate.ts  284   value-level interpolation  ← MISSING from units/CLAUDE.md (§6)
│   └── color/         [LR]  17 flat top-level files + conversions/ subdir (28 total)
│       ├── index.ts     73   subsystem barrel (W1-8: base+spaces+serialize+dispatch/mix/contrast)
│       ├── base.ts     357   Color<T> + ColorChannel brand + ch/channelOf/setChannel (W1-8 leaf)
│       ├── spaces.ts   486   the 17 space subclasses + ColorSpaceMap (W1-8 leaf; extends base)
│       ├── serialize.ts 248   apply-path serializers (W1-8 leaf)
│       ├── constants.ts 500   ← MULTI-CONCERN god-table (ranges | white-pts+matrices | gamut-coeffs)
│       ├── color-names.ts 260  COLOR_NAMES data + custom-name registry (W1-8 data lift)
│       ├── matrix.ts    91   Vec3/Mat3 math
│       ├── dispatch.ts 518   color2()/color2Into/DIRECT_PATHS/gamutMap
│       ├── normalize.ts 126   color unit → [0,1]
│       ├── mix.ts      479   mixColors/interpolateHue/ramps (K-DISP home)
│       ├── contrast.ts 256   OKLab contrast + WCAG contrast-color()
│       ├── colorFilter.ts 305  SPSA CSS-filter solver
│       ├── gamut.ts    498   ← GAMUT family: Ottosson analytical sRGB map
│       ├── gamut-raytrace.ts 137 ← GAMUT family: exact-boundary reference twin (S.W1-10)
│       ├── boundary.ts 454   ← GAMUT family: sRGB-excess contour + OKLCh slice cusp (R.W1.5/S.W1-6)
│       ├── okhsl.ts    270   ← GAMUT family: OKHSL/OKHSV pickers (reuse cusp math)
│       ├── difference.ts 243   deltaE2000/deltaEITP + ICtCp (perceptual metrics)
│       └── conversions/  10 {from}2{to} modules + index (G.W1 Lane B) — ALREADY encapsulated ✓
│           ├── index.ts 76 · hex 44 · kelvin 123 · cylindrical 193 · lab 239 · oklab 180
│           ├── transfer 119 · xyz-extended 302 · direct 288 · ictcp 44 · jzazbz 144
│
├── transform/               matrix + path geometry
│   ├── decompose.ts    541   2D/3D decompose + slerp + recompose
│   └── path.ts         562   DOM-free getTotalLength/getPointAtLength (VJ-F1) ← MISSING from CLAUDE.md
│
└── quantize/                OKLab image quantization — clean 3-file domain ✓
    ├── index.ts        191 · cluster.ts 356 · types.ts 50
```

**Already-encapsulated (E-1 GREEN, cite as precedent, do NOT churn):**
- `conversions/` — the G.W1 Lane B split; 10 `{from}2{to}` leaves + aggregate barrel. This is the
  *exemplar* of "long-running dir broken into common modules and encapsulated." Every other split
  proposal below should mirror **its** shape (leaves + `index.ts` barrel).
- `quantize/` — a tight 3-file domain (public + cluster + types); nothing to do.
- The W1-8 leaf-splits inside `color/` (base/spaces/serialize out of the old 968-LoC `index.ts`)
  and `units/` (style-names/dom-metrics/layout-cache) — these are *file-level* cohesion splits;
  they are done and correct. The residual (§3/§4) is *directory-level* grouping, one tier up.

---

## §2 [MOST LOAD-BEARING] The demo + tests pierce the subpath barrier — this is the only thing that makes E-1 moves costly, and it is itself an E-1/E-3 violation

The §0 frame says internal moves are semver-free. They are — for *npm* consumers. But the two
**in-repo** consumers reach raw internal file paths, so "free" becomes "N import-sites per move":

**Demo** (`@src/*` tsconfig alias → `src/`) imports **23 distinct deep specifiers**
(`grep -rhoE 'from "@src/[^"]+"' demo/`):

```
 32× @src/units/color/constants      15× @src/units/color/normalize
 15× @src/units/color/mix            15× @src/parsing/color
 12× @src/units/color                 8× @src/units/color/gamut
  6× @src/units/color/boundary        4× @src/units/color/dispatch
  2× @src/units/color/matrix          2× @src/units/color/contrast
  … + @src/units/color/color-names, @src/units/utils, and — the smoking gun —
  @src/units/color/conversions/{cylindrical,hex,oklab,transfer,xyz-extended}
```

**The smoking gun**: the demo imports **un-exported conversion primitives** the public surface
deliberately withholds. `src/index.ts:142-145` states the 51 `<from>2<to>` helpers "remain
INTERNAL to value.js … NOT exported from the main barrel." Yet:
- `useGamutOverlay.ts:43` → `hsl2rgb` from `@src/units/color/conversions/cylindrical`
- `useColorGeneration.ts:24-25` → `oklch2xyz`, `xyz2rgb` from `conversions/oklab` + `xyz-extended`
- `perceivedSpacePaint.ts:23` → `linearToSrgb` from `conversions/transfer`
- `SearchFilterBar.vue:146` → `hex2rgb` from `conversions/hex`

`grep` confirms **none** of `hsl2rgb / oklab2xyz / xyz2rgb / rgb2hsl` appear in `src/subpaths/` or
`src/index.ts`. The demo has **hard white-box coupling to library internals no external consumer
can reach.** That is simultaneously (a) an E-1 encapsulation breach — the demo treats `src/` as an
open drawer, not a module with a public face — and (b) the mechanism that would make *any*
`conversions/` reshuffle a demo-compile break.

**Tests** (`src/*` via vitest baseUrl) reach even deeper — `test/*` imports
`src/units/color/gamut-raytrace`, `okhsl`, `difference`, `parsing/math`, `layout-cache`, etc. For
tests this is *defensible* (white-box unit tests legitimately probe internals), but it means the
test suite is a second lockstep-update surface for every move.

- **Root cause**: the demo was authored against the pre-subpath tree (the `@src/*` alias predates
  the O.W2 subpath cut — `vite.config.ts:26-44` says exactly this) and never migrated onto the
  public subpaths the split created. The subpath barrels exist; the in-repo consumer ignores them.
- **Owner**: **joint** (demo consumes; src defines the surface). The primitive-leak sub-finding is
  **src** (the 5 primitives the demo *needs* are either public API the barrel should expose, or a
  demo-side re-derivation that should route through `color2`).
- **Cure direction (gestalt, E-3)**: **the demo must dogfood the published surface.** Re-point the
  demo off `@src/units/color/*` onto `@mkbabb/value.js/color` (the parse-that-free subpath it was
  built to consume) — repoint the `@src` alias, or better, retire the demo's deep specifiers in
  favor of the 8 public keys. For the 5 leaked conversion primitives: **decide their citizenship**
  — either (i) they are genuine public API (promote into `subpaths/color.ts` + `index.ts` with a
  MIGRATION note, the S-era idiom), or (ii) they are internal and the demo's need is a
  `color2(x, "srgb")` call it should make instead of importing the raw matrix chain. Once the demo
  speaks only the 8 keys, **every §3/§4 move collapses to editing one barrel** and the semver-free
  promise of §0 becomes an *actual* refactor-free promise. This is the keystone: land it FIRST and
  the rest of E-1's `src/` restructure is nearly costless; skip it and every move drags the demo.

---

## §3 `parsing/` — the clearest "long-running dir broken into common modules" residual

`parsing/` is 15 flat files spanning **five** concerns, with four files over 600 LoC. The reverse-
dependency graph (`grep`-verified) shows **three tight clusters with private-to-the-cluster
members** — the textbook signal that a subdir wants to exist:

| Cluster | Members | Private-inside evidence |
|---|---|---|
| **color-parse** | `color.ts` `color-unit.ts` `relative-color.ts` | `relative-color.ts` imported ONLY by `color.ts`; `color-unit.ts` imported ONLY by `color.ts` + `relative-color.ts` — a sealed sub-graph |
| **timeline** | `easing.ts` `scroll-timeline.ts` | `scroll-timeline.ts` imports `easing.ts`; both are the CSS-animation *value* grammars (distinct from the property parsers) |
| **stylesheet** | `stylesheet.ts` `stylesheet-types.ts` `extract.ts` `serialize.ts` | `stylesheet-types.ts` imported by exactly {`extract`,`serialize`,`stylesheet`,`scroll-timeline`} — a shared-AST hub for the rule surface |

The remaining files are the true `parsing/` core (`index`, `units`, `math`, `utils`, `syntax`,
`animation-shorthand`) — the value/dimension/math/primitive layer everything sits on.

- **Root cause**: `parsing/` grew organically R→S (relative-color L5, color(), scroll-timeline
  N.W11′, syntax VJ-Q6) as flat additions; the G.W1 encapsulation discipline that produced
  `conversions/` was never re-applied one dir up.
- **Owner**: **src**.
- **Cure direction**: mirror the `conversions/` precedent — `parsing/color/` (color+color-unit+
  relative-color+`index.ts`), `parsing/timeline/` (easing+scroll-timeline+`index.ts`),
  `parsing/stylesheet/` (stylesheet+types+extract+serialize+`index.ts`), leaving the core flat.
  Each new subdir gets an `index.ts` barrel; `parsing/index.ts` re-composes from the barrels, so
  the FROZEN `src/subpaths/parsing.ts` surface is byte-identical (§0). **Gate it on §2** — until
  the demo/tests stop deep-importing `@src/parsing/color`, this move touches 14 test files + the
  demo's 15 `@src/parsing/color` sites. The `Parser.lazy()` circular-break (color↔units,
  `parsing/CLAUDE.md:56`) survives a dir move unchanged (it is runtime-lazy, not path-bound).

---

## §4 `units/color/` — a `gamut/` subdir + the `constants.ts` god-table split, both by cohesion

Two directory-level residuals inside the color subsystem (the file-level W1-8 splits are done):

**(a) The GAMUT family wants a subdir mirroring `conversions/`.** Four files share the Ottosson
cusp/max-saturation math: `gamut.ts` (498, analytical map), `gamut-raytrace.ts` (137, exact-
boundary twin), `boundary.ts` (454, sRGB-excess contour + OKLCh slice), `okhsl.ts` (270, pickers
that "reuse gamut cusp math" per `CLAUDE.md:76`). That is one cohesive concern spread across four
top-level files — exactly the pre-`conversions/` condition. Cure: `color/gamut/{gamut,raytrace,
boundary,okhsl,index}.ts`; the `color/index.ts` barrel + `subpaths/color.ts` re-export the same
names (currently `gamutMapSRGB`, `sampleGamutBoundary`, `okhslToSrgb`, … — all name-preserved).

**(b) `color/constants.ts` (500 LoC) is a three-concern god-table** (`grep` of its exports):
- **ranges/bounds** (lines 4-408: `COLOR_SPACE_RANGES`, `DENORM_UNITS`, `getColorSpaceBound`, …) —
  broadly consumed across the whole subsystem → the *true* shared color constant; **stays**.
- **white-points + chromatic-adaptation matrices** (410-476: `WHITE_POINT_*`, `XYZ_TO_LMS_MATRIX`,
  `LMS_TO_OKLAB_MATRIX`, …) — consumed by `conversions/{direct,oklab}.ts` (`grep` confirms only
  those two + the re-export barrels). **Colocation target: `conversions/`.**
- **`GAMUT_SECTOR_COEFFICIENTS`** (478) — consumed by `gamut.ts` **only** (+ re-export barrels).
  **Colocation target: the new `gamut/`.**

This is E-1's "constants colocated with their consumers" *precisely*: the gamut coefficients live
500 lines from their sole consumer; the adaptation matrices live one dir up from theirs.

- **Root cause**: `constants.ts` is the historical dumping ground; the W1-8 data-lift pulled
  `COLOR_NAMES` out (→ `color-names.ts`) but stopped there.
- **Owner**: **src**.
- **Cure direction**: split `constants.ts` by consumer — keep the shared ranges as `color/
  constants.ts`; move the adaptation matrices into `conversions/` (a `conversions/matrices.ts` or
  fold into `xyz-extended.ts`); move `GAMUT_SECTOR_COEFFICIENTS` into `gamut/`. Barrels
  (`color/index.ts`, `subpaths/color.ts`, `src/index.ts`) re-export every name unchanged → §0
  semver-free. **Caveat**: `subpaths/color.ts` explicitly re-exports all these matrices as *public*
  (lines 55-63) — the split must keep them re-exported from the *same barrel name*; only the
  definition file moves. **Gate on §2** (demo has 32 `@src/units/color/constants` sites).

**Judgment (E-3, do-not-over-restructure)**: the *other* flat color files (`difference`,
`contrast`, `colorFilter`, `mix`, `dispatch`, `matrix`) are each a distinct single concern with
broad or cross-cutting consumers — they do **not** cluster and should **stay flat**. Grouping them
into a `perceptual/` or `ops/` bucket would be churn-for-churn, which E-3 forbids. The census
finding is: color/ needs exactly **one** new subdir (`gamut/`) + the constants split, not a
wholesale re-tree.

---

## §5 `test/` is FLAT — it does not mirror `src/`, violating E-1 "recursively for nested"

All **70** test files sit directly in `test/` (+ `test/__snapshots__/`). None live under
`test/units/`, `test/units/color/`, `test/parsing/`, `test/transform/`. E-1 says colocation is
"recursive for nested components"; the test tree is the library's shadow structure and should
mirror the module it exercises. Today `color-conversions.test.ts`, `gamut-mapping.test.ts`,
`gamut-raytrace.test.ts`, `okhsl.test.ts`, `oklch-slice-boundary.test.ts` (all `units/color/gamut`
subjects) are scattered flat among `parsing-*.test.ts`, `math*.test.ts`, `decompose-*.test.ts`.

- **Root cause**: tests were added flat since inception; no discipline mirrors the src tree.
- **Owner**: **src** (test tree is a src-tier artifact).
- **Cure direction**: mirror src under `test/` — `test/units/color/`, `test/parsing/`,
  `test/transform/`, `test/quantize/`, `test/units/`, and root-level (`math`, `easing`, `utils`).
  This is a *pure move* (vitest globs `test/**`; no path is import-frozen — tests import *from*
  `src/*`, nothing imports *them*), so it is the **lowest-risk E-1 move in the whole lane** and can
  land independent of §2. It also makes the §3/§4 moves self-documenting: when `gamut/` is born,
  its four tests are already sitting in `test/units/color/gamut/`. **Sequence it BEFORE §3/§4** so
  the source move and its test move are one reviewable unit.

---

## §6 The colocated `CLAUDE.md` docs are a good E-1 pattern — but ALL are stale, and one breaks its own precept

`src/` already practices *documentation* colocation: `parsing/CLAUDE.md`, `units/CLAUDE.md`,
`units/color/CLAUDE.md`, `transform/CLAUDE.md`. This is exactly the E-1 spirit (docs colocated with
their subject). But every one has drifted, because nothing re-syncs them against the tree:

| Doc | Claims | Reality | Drift |
|---|---|---|---|
| `parsing/CLAUDE.md` | 9 files | 15 files | omits `color-unit`, `easing`, `relative-color`, `scroll-timeline`, `stylesheet-types`, `syntax` |
| `units/color/CLAUDE.md` | "8 conversions", no `gamut-raytrace` | 10 conversions + `gamut-raytrace.ts` | omits `ictcp`,`jzazbz` in conversions/ + the raytrace file |
| `units/CLAUDE.md` | 8 files | 9 files | omits `interpolate.ts` |
| `transform/CLAUDE.md` | only `decompose.ts`, **"541 loc"** | `decompose.ts` + `path.ts` | omits `path.ts` (VJ-F1) **and hard-codes an inline LoC** |

`transform/CLAUDE.md:9` writes `# 541 loc` — a **direct violation** of the no-inline-LoC precept
its three sibling docs each state verbatim ("LoC counts intentionally omitted — `wc -l` is the
source of truth … E.W1 Lane E stripped them"). And `quantize/` + `subpaths/` have **no** CLAUDE.md
at all, though `subpaths/` is the single most surface-critical dir in the repo (§0.1).

- **Root cause**: the docs are hand-maintained with no drift gate; E.W1 Lane E stripped LoC from
  three of the four but missed `transform/`, and none were updated as R/S added files.
- **Owner**: **src**.
- **Cure direction**: fold a colocated-doc refresh into whichever T wave lands the §3/§4 moves
  (the doc *must* change when the dir does, so bind them). Strip `transform/CLAUDE.md`'s inline
  LoC to match its siblings. Author a `subpaths/CLAUDE.md` that states the §0.1 frozen-entry law
  (this is the highest-value net-new doc — it is the one place the "these filenames are the public
  API" fact should live next to the files). E-3 note: do **not** re-introduce a `proof:*` grep gate
  for doc-drift (the retired-idiom precept, MEMORY [[feedback-proof-idiom-retired]]) — bind the doc
  update to the structural move in review, not a script.

---

## §7 Target-structure table

The E-1 end-state for `src/` (each move name-preserving at the barrel → §0 semver-free):

```
src/
├── index.ts                 [FROZEN name set]         — unchanged
├── math.ts · utils.ts · easing.ts · vite-env.d.ts     — pure leaves, stay flat
│                              (easing.ts @643 = watch-only; single cohesive concern, E-3 no-split)
├── subpaths/                [FROZEN filenames §0.1] + NEW subpaths/CLAUDE.md (§6)
│   └── color · parsing · units · math · easing · transform · quantize
├── parsing/                 [LR → encapsulate §3]
│   ├── color/               {color, color-unit, relative-color, index}
│   ├── timeline/            {easing, scroll-timeline, index}
│   ├── stylesheet/          {stylesheet, stylesheet-types, extract, serialize, index}
│   ├── index · units · math · utils · syntax · animation-shorthand   (core, flat)
│   └── CLAUDE.md            (refreshed §6)
├── units/
│   ├── index · constants · style-names · dom-metrics · utils · normalize · layout-cache · interpolate
│   ├── CLAUDE.md            (refresh: add interpolate.ts §6)
│   └── color/               [LR → §4]
│       ├── gamut/           {gamut, raytrace, boundary, okhsl, GAMUT_SECTOR_COEFFICIENTS, index}
│       ├── conversions/     {…10 leaves…, + adaptation matrices from constants.ts, index}   ✓ exemplar
│       ├── constants.ts     (ranges/bounds ONLY, post-split §4b)
│       ├── index · base · spaces · serialize · matrix · dispatch · normalize · mix ·
│       │   contrast · colorFilter · difference · color-names        (flat — distinct concerns)
│       └── CLAUDE.md        (refreshed §6)
├── transform/               decompose · path   (+ CLAUDE.md refresh, strip inline LoC §6)
└── quantize/                index · cluster · types   ✓ (+ optional CLAUDE.md)

test/                        [→ mirror §5]
├── units/color/{gamut/,conversions/,…}  ·  units/  ·  parsing/{color/,timeline/,stylesheet/}
├── transform/  ·  quantize/  ·  (root: math, easing, utils)
└── __snapshots__/           unchanged
```

## §8 The FORBIDS-vs-FREE ledger (what 3.x semver binds)

| Class | Examples | Move rule |
|---|---|---|
| **FORBIDDEN — breaking** | removing/renaming any *exported symbol* from `src/index.ts` or the 7 `src/subpaths/*.ts` | major bump; not an E-1 move at all |
| **FORBIDDEN unless dist chunk name preserved** | renaming `src/subpaths/<name>.ts`, the `src/subpaths/` dir, or `src/index.ts` | changes the build entry → dist chunk → exports target; do NOT touch |
| **FREE to npm, but LOCKSTEP with demo+tests (§2)** | any file move under `parsing/`, `units/`, `units/color/`, `transform/` (§3/§4) | non-breaking IF owning barrel re-exports same names; requires updating demo `@src/*` + test `src/*` sites — **the §2 dogfood fix removes this cost** |
| **FREE, lowest risk** | mirroring `test/**` (§5); refreshing colocated CLAUDE.md (§6) | nothing imports tests/docs; pure move |
| **SUBPATH-BUDGET INVARIANT (orthogonal, must survive any move)** | `subpaths/{color,units,math,easing,transform,quantize}.ts` must stay parse-that-FREE; only `subpaths/parsing.ts` may drag it | `scripts/proof-subpath-budget.mjs` bundle-traces this; a §3/§4 move that accidentally makes a color file import `parsing/` would trip it — the real guard rail, keep it green |

**Sequencing (E-3, elegance-first)**: (1) §2 demo-dogfood → collapses all later moves to one-barrel
edits; (2) §5 test mirror (independent, low-risk, self-documents the source moves); (3) §3 parsing
subdirs + §4 color gamut/ + constants split, each with its §6 doc refresh bound in. None of it is a
semver event; all of it is gated only by the in-repo coupling §2 dissolves.
