claude-opus-5[1m]

# Lane: keyframes.js LIBRARY census

**Target** `/Users/mkbabb/Programming/keyframes.js` (READ-ONLY; static census only — file reads, `grep`, `wc`, `find`, `git log --oneline`, plus offline import-graph scripts run out of the session scratchpad against copies of nothing — they only *read* the tree).
**Substrate** branch `master`, HEAD `8281638c fix(demo-shell): provide tooltip context for the routed control group` (`git log --oneline -15`). Newest tag `v6.0.0` (`git tag --list | tail -8`). Working tree not inspected for dirt (out of scope; no git-mutating command run).
**Date of census** 2026-08-03.

---

## 0. Headline numbers (all measured)

| fact | value | probe |
|---|--:|---|
| library source files (`src/**/*.ts`) | **145** | `find src -type f -name '*.ts' \| wc -l` |
| library source LOC | **22 636** | `find src -type f -name '*.ts' -exec wc -l {} +` (total line) |
| top-level dirs under `src/` | **1** (`src/animation/`) | `find src -type d` |
| zones (dirs under `src/animation/`) | **14** (incl. root) | see §2 |
| test files | **131** | `find test -name '*.test.ts' \| wc -l` |
| colocated tests inside `src/` | **0** | `find src -name '*.test.ts' -o -name '*.spec.ts' \| wc -l` → `0` |
| `it(`/`test(` cases | **1 051** total, **153** of them under `test/demo/` | `grep -rhoE "^\s*(it\|test)(\.\w+)?\(" test --include='*.test.ts' \| wc -l` |
| `describe(` blocks | **299** | same grep shape |
| bench files | **12** `.bench.ts` (+ 2 `.measure.test.ts`, 2 `.mjs`, 2 `.html`, 1 `.json` in `bench/`) | `find bench -name '*.bench.ts' \| wc -l`; `find bench -type f` |
| parser fixture corpus | **14** `.css` + `manifest.json` under `test/fixtures/keyframes/`, **2** `.css` under `test/fixtures/compile/` | `ls test/fixtures/keyframes/*.css \| wc -l` |
| distinct `@mkbabb/value.js` subpaths imported by `src/` | **6** (`/css` 29, `/value` 15, `/color` 7, `/math` 5, `/easing` 3, `/transform` 2) | import-graph scan, comment-stripped |
| value.js `from`-clause lines in `src/` | **61** across **39** modules (of 145) | `grep -rn 'from "@mkbabb/value.js' src/ \| wc -l` → 61; `grep -rln … \| wc -l` → 39; total mentions incl. prose = 79 |
| STATIC-RUNTIME import cycles in `src/` | **0** | comment-stripped statement-level DFS (§3) |
| import cycles when type-only edges are counted | **17** | same scan, `gALL` graph (§3) |
| demo files (`.ts`/`.vue`) | **184** | `find demo -type f \( -name '*.ts' -o -name '*.vue' \) \| wc -l` |

---

## 1. Package surface (`package.json`)

```
name     @mkbabb/keyframes.js
version  6.0.0            ← matches newest git tag v6.0.0
type     module           sideEffects false
engines  node >= 22
```

**Exports map — exactly two entries, no wildcard:**

| specifier | types | default |
|---|---|---|
| `.` | `./dist/keyframes.d.ts` | `./dist/keyframes.js` |
| `./engine` | `./dist/engine/index.d.ts` | `./dist/engine/index.js` |

`files: ["dist", "!dist/gh-pages", "!dist/_*"]`. `types` (legacy top-level) also set to `./dist/keyframes.d.ts` — a redundant-but-harmless dual declaration alongside `exports["."].types`.

**Runtime dependencies — exactly one:**

```json
"dependencies": { "@mkbabb/value.js": "4.0.0" }
```

Pinned EXACT (no caret). The installed copy is `node_modules/@mkbabb/value.js` **4.0.0**, whose own exports map offers **7** subpaths: `./color ./value ./css ./easing ./math ./transform ./quantize`. keyframes consumes **6** of the 7 — **`./quantize` is ABSENT from the whole repo** (probe: `grep -rn "@mkbabb/value.js" src/ test/ bench/ demo/ scripts/` returns zero `/quantize` hits). Note value.js 4.0.0 exposes **no root (`.`) entry** — it is, in the config's words, "a rootless capability package" (`vite.config.ts:184`), so every kf edge is subpath-scoped.

**value.js consumers outside `src/`** (probe `grep -rln "@mkbabb/value.js" test/ bench/ demo/ scripts/`, 133 hits): `demo/` 43 files, `test/` 26, `bench/` 8, `scripts/` 4.

devDependencies (48) include the toolchain that matters for this lane: `vite ^8`, `rolldown ^1`, `vite-plugin-dts ^5`, `vitest ^4.1.8`, `typescript ^6.0.3`, `dependency-cruiser ^18`, `fast-check ^4.8.0` (property/fuzz), `jsdom ^29`, `@microsoft/api-extractor`, `pixelmatch`+`pngjs` (visual gate), `monaco-editor` (demo CSS editor).

**Scripts of note:** `build:lib` = `vite build --mode production`; `gh-pages` = `vite build --mode gh-pages`; `check` = `tsc --noEmit && tsc --noEmit -p tsconfig.test.json`; `check:lib` = `tsc --noEmit -p tsconfig.lib.json`; `lint` = `depcruise src`; `test:lib` = `vitest run --project library`; plus five gate/observability entry points (`proof:publish`, `proof:owner-golden`, `demo:correctness`, `audit:lighthouse`, `bench:color-fidelity`) that shell into `scripts/gates/**`, `scripts/observe/`, `scripts/release/`.

---

## 2. Build modes

Three branches in `vite.config.ts`, keyed on `mode.mode`:

| mode | line | root | output | shape |
|---|--:|---|---|---|
| `production` | `vite.config.ts:122` | project root | `dist/` | **library**: two named lib entries + dts + `esbuild.drop:["console","debugger"]` |
| `gh-pages` | `vite.config.ts:238` | `demo/app/` | `dist/gh-pages/` | demo SPA build (chunk manifest emitted to `dist/gh-pages/_chunks.json`) |
| *(else — dev/default)* | `vite.config.ts:353` | `demo/app/` | `DEMO_DEFAULT_OUTDIR` under `dist/` | dev server / any non-enumerated mode; the explicit `outDir` exists to kill the "default-outDir LANDMINE" that used to write `demo/app/dist/` (`vite.config.ts:356-359`) |

**The library build has TWO entries** (`vite.config.ts:153-174`), which is the structural fact the parser-consumption wave must respect:

```
entry.keyframes      → src/animation/index.ts      (the LIGHT static barrel, value.js-free)
entry["engine/index"]→ src/animation/public.ts     (the HEAVY composition barrel)
```

`formats: ["es"]` only — **no CJS/UMD**. `rolldownOptions.external` enumerates **6 explicit value.js subpaths + `vue`** (`vite.config.ts:183-191`) — a prefix predicate was deliberately rejected ("a prefix predicate would silently admit removed or private paths"). Consequence for a value.js parser change: **adding a 7th kf-consumed subpath requires editing this `external` array or it gets bundled in.**

The `dist/` currently on disk (`ls -R dist`) shows the split working: `keyframes.js`, `engine/index.js`, plus three shared chunks `easing-registry-B0rLmOtw.js`, `easing-registry-Db7xwtXT.js`, `sequence-BvpIpCGp.js` (note: **two** easing-registry chunks — one per entry graph; worth a probe in the perf lane, not this one).

---

## 3. Dependency shape

### 3.1 Zone-level graph (runtime edges only, comment-stripped; edge counts = number of import statements)

```
animation/(root)  → physics(7) orchestration(7) compile(6) internal(4) engine(2)
                    group(1) svg(1) presets(1) ingest(1) scroll(1) waapi(1)
animation/compile → internal(10) group(3) resolve(2) orchestration(2) (root)(1) scroll(1) constants(1)
animation/engine  → compile(12) internal(7) constants(3) physics(1) resolve(1) (root)(1) waapi(1)
animation/group   → internal(5) physics(3) waapi(3) constants(2) compile(1) engine(1)
animation/ingest  → engine(2)
animation/orchestration → internal(10) physics(6) (root)(2)
animation/physics → internal(10) (root)(1)
animation/presets → physics(1) engine(1)
animation/resolve → compile(4) physics(1)
animation/scroll  → internal(3) physics(3) waapi(1) orchestration(1)
animation/svg     → engine(3) internal(1)
animation/waapi   → orchestration(1) internal(1)
```

`internal/` is the universal sink (35 inbound edges, 0 outbound to any zone except `(root)`) — the leaf tier is genuinely leaf-shaped. `constants/` is imported by 3 zones and imports nothing outward.

### 3.2 Cycles

**STATIC-RUNTIME cycles: ZERO.** Probe: statement-level import scan with block/line comments blanked out (a naive scan false-positives on the many JSDoc blocks that *quote* `import("./engine")`), then DFS over runtime-only edges. Result: `RUNTIME CYCLES: 0`.

**Type-only-inclusive cycles: 17.** These are erased at build (`import type`) and carry no module-init hazard, but they are real coupling and worth naming for a refactor wave. The distinct rings:

| ring | members |
|---|---|
| constants | `constants/types.ts ↔ constants/defaults.ts`; `constants/types.ts → compile/value-ast.ts → constants/index.ts → constants/types.ts` |
| engine core (7 rings, all through `engine/animation.ts`) | `animation.ts ↔ play-lifecycle.ts`, `↔ interpolate.ts`, `↔ option-setters.ts`, `↔ compile-bridge.ts`, `↔ resolve/element-resolve.ts` |
| engine ↔ waapi (5 rings) | `engine/index → engine/animation → engine/play-lifecycle → waapi/index → {eligibility, emission, emission→densify, waapi-options, delegation} → engine/index` |
| engine ↔ easing ↔ compile | `compile/easing/easing-option → easing → engine/index → engine/animation → compile/frame-compiler → easing-option`; and the `option-setters → options → easing-option` variant |
| easing ↔ engine/css | `easing → engine/index → engine/css/index → engine/css/css-animation → easing` (and a longer one through `orchestration/timeline/timeline`) |
| group | `group/group ↔ {compositor, layer-api, lifecycle}`, `group/group → lifecycle → waapi → group` |
| sequence | `orchestration/sequence/sequence ↔ orchestration/sequence/lifecycle` |

Zone-pair mutual edges (runtime): `compile↔resolve` (2/4), `compile↔group` (3/1), `(root)↔physics` (7/1), `(root)↔orchestration` (7/2), `(root)↔engine` (2/1), `(root)↔compile` (6/1). The `(root)↔*` pairs are the barrel (`index.ts`/`public.ts`) reaching down and one module reaching back up to `easing.ts` — benign.

### 3.3 Dynamic (lazy) edges — exactly TWO

```
src/animation/easing.ts:79        await import("./compile/easing/easing-registry")
src/animation/load-engine.ts:124  (enginePromise ??= import("./public"))
```

These are the LIGHT/HEAVY boundary. `load-engine.ts:124` is *the* value.js firewall: everything value.js-bearing is reachable only behind it (or behind the `./engine` published subpath, which points at the same `public.ts`).

### 3.4 Most-imported modules (runtime in-degree)

```
compile/emit/css-text.ts    12     internal/leaves.ts           12
internal/errors.ts          11     engine/index.ts               9
physics/playback.ts          9     internal/reduced-motion.ts    9
physics/spring/index.ts      8     compile/value-ast.ts          7
easing.ts                    6     internal/helpers.ts           6
compile/emit/easing-serialize.ts 6 constants/index.ts            6
```

Highest fan-out: `animation/index.ts` (19), `public.ts` (13), `engine/animation.ts` (12), `group/group.ts` (11), `compile/emit/backward.ts` (10).

### 3.5 The graph lint (`.dependency-cruiser.cjs`, 14 001 bytes) — **and two defects in it**

Three `forbidden` rules, all `severity: "error"`: `no-cycle` (`:113`), `leaf-no-engine-no-valuejs` (`:160`), `light-barrel-no-engine` (`:200`). `options.tsPreCompilationDeps: true`, `doNotFollow: node_modules` (`:233-248`).

> **DEFECT L-1 — the LIGHT allowlist has 4 dead paths.** `LIGHT_BARREL_MODULES` (`.dependency-cruiser.cjs:56-79`) still names `physics/spring/duration`, `physics/spring/reseat`, `physics/spring/linear-stops`, `physics/spring/timing-function`. Probe:
> ```
> MISSING src/animation/physics/spring/duration.ts
> MISSING src/animation/physics/spring/reseat.ts
> MISSING src/animation/physics/spring/linear-stops.ts
> MISSING src/animation/physics/spring/timing-function.ts
> ```
> The real files moved into the `solver/` and `css/` sub-zones (`physics/spring/solver/duration.ts`, `…/solver/reseat.ts`, `…/css/linear-stops.ts`, `…/css/timing-function.ts`). Rule 3's `from` regex is built off that list (`LIGHT_FROM`, `:82-85`), so **those four LIGHT modules are no longer guarded** — a static `@mkbabb/value.js` import added to `physics/spring/css/timing-function.ts` would not red the lint. Silent-coverage-loss, not a false RED, which is why nothing noticed.

> **DEFECT L-2 — the promised no-cycle baseline file does not exist.** The `no-cycle` comment (`:120-128`) says the pre-existing cycles "are recorded in the known-violations BASELINE (`.dependency-cruiser-known-violations.json`) so this rule greens on today's tree". Probes: `ls .dependency-cruiser-known-violations.json` → *No such file or directory*; `grep -rn "known" .dependency-cruiser.cjs` → only the two prose lines above, **no `knownViolations` key in `options`**. The rule greens not because of a ratchet but because (per §3.2) the runtime graph is genuinely cycle-free and the rule's `viaOnly.dependencyTypesNot` (`:216-230`) exempts type-only rings. The comment is stale documentation describing machinery that isn't wired.

---

## 4. THE CSS / KEYFRAMES PARSING SEAM

This is the cut-point inventory for a value.js-parser-consumption wave. **keyframes.js owns no CSS grammar of its own** — every grammar-level parse is delegated to a value.js `/css` entry point. What it owns is (a) the *normalisation* around those calls, (b) a small number of **ad-hoc regexes over CSS-ish text**, and (c) the **serializer half** of the round-trip.

### 4.1 Tier A — delegated grammar parses (the true seam; 13 sites)

| # | site | call | what enters |
|---|---|---|---|
| A1 | `src/animation/compile/adapter.ts:222` | `parseStylesheet(source)` | **THE** whole-stylesheet parse. Wrapped by `parseSource()` (`:217-225`), returns `{ast, issues}`; failure yields `ast: []` + diagnostics, never a throw. |
| A2 | `src/animation/compile/adapter.ts:266` | `resolveKeyframes(…)` | the normaliser that owns A1. Parses raw input; if ZERO `@keyframes` surfaced and input non-empty, re-wraps as `@keyframes anonymous { … }` and **re-parses** (`:250-258` documents the PX-1 comment-defeat bug this replaced). The single ingest→template entry. |
| A3 | `src/animation/compile/value-ast.ts:71` | `parseCssValues(value)` | per-declaration authored-value parse (`parseAuthoredValue`); throws `TypeError` with `issue.start-issue.end` on failure (`:73-77`). |
| A4 | `src/animation/compile/selector.ts:24` | `parseKeyframeSelector` (aliased `parseValueSelector`) | keyframe-selector grammar — "Value's sole grammar authority" (`:18-22`). Throws `AnimationOptionError` with code `EMPTY_PARSE` for a blank selector (`:27-34`). |
| A5 | `src/animation/compile/easing/easing-registry.ts:131` | `parseTimingFunction(timingFunction)` | `<easing-function>` from a public option. |
| A6 | `src/animation/compile/emit/format-options.ts:104` | `parseTimingFunction(timingSource)` | the same grammar again, on the **emit** side (shorthand reconstruction). |
| A7 | `src/animation/engine/options.ts:31` | `parseCssScalar(raw)` | `tryParseTime` — `s`/`ms` only; anything else → `undefined` (`:29-38`). |
| A8 | `src/animation/resolve/browser.ts:165` | `parseCssScalar(source)` | live computed-value → scalar. |
| A9 | `src/animation/scroll/grammar.ts:109` | `parseStylesheet(input)` inside `parseScrollCSS` | scroll-driven declarations; a parse failure **throws** via `requireParsed` (`:57-61`) — *different failure posture from A1*. |
| A10 | `src/animation/scroll/grammar.ts:77` | `parseAnimationTimeline(input)` | `animation-timeline` value grammar. |
| A11 | `src/animation/scroll/grammar.ts:85` | `parseAnimationRange(input)` | `animation-range` value grammar. |
| A12 | `src/animation/validate.ts:182` | `parseStylesheet(css)` inside `keyframesNames` | wrapped in `try{}catch{return []}` (`:181-192`) — a **third** failure posture. |
| A13 | `src/animation/engine/css/css-animation.ts:176` | `resolveKeyframes(keyframes)` inside `fromString` | the public string entry (`fromString(keyframes, transform?)`, `:169`). |

**AST-level collectors** (not parsers, but the same value.js surface and the same blast radius): `collectKeyframes` `adapter.ts:205`, `validate.ts:186`; `collectStyleRules` `adapter.ts:241`, `scroll/grammar.ts:111`, `engine/css/metadata.ts:42`; `collectAnimationOptions` `adapter.ts:377`; `collectCustomFunctions` `adapter.ts:341`; `collectPropertyDescriptors` `adapter.ts:374`; `collectTimelineOptions` `scroll/grammar.ts:112`, `engine/css/metadata.ts:102`.

### 4.2 Tier B — CSSOM text bridge (live-stylesheet ingest)

`src/animation/ingest/cssom.ts` (466 L) walks `document.styleSheets` and feeds `rule.cssText` back into A2. It is the LIVE analogue of the string path, and it is the one place kf constructs CSS-ish text-matching of its own:

- `cssom.ts:117-130` `isKeyframesRule` — `instanceof CSSKeyframesRule` **or** a duck-typed `{name, cssText}` fallback (jsdom/SSR).
- `cssom.ts:183-198` first pass collecting every `CSSStyleRule.cssText` so a sibling `animation:` shorthand can be linked.
- **`cssom.ts:214-216`** — the ad-hoc linkage regex:
  ```ts
  const nameRe = new RegExp(
      `\\banimation(?:-name)?\\s*:[^;}]*\\b${name}\\b`,
  );
  ```
  This interpolates a CSSOM-supplied identifier **unescaped** into a `RegExp`. A `@keyframes` name containing regex metacharacters (legal via CSS escapes) would throw or mis-match. Flagged as a parser-wave cut point: this is exactly the job a real declaration parse should do.
- `cssom.ts:221` `rule.cssText` → `reconstructFromRule` (`:248-296`) → `new CSSKeyframesAnimation(...).fromString(...)`.
- `cssom.ts:29-33` carries a standing comment that value.js's "VJ-9 FULL partial-input" story is **OPEN**, and that "a rule whose `cssText` derails value.js's parser" is the current failure mode. **That is a live, self-declared handoff to the value.js parser wave.**
- Recursive descent into `CSSGroupingRule` bodies (`@media`/`@supports`/`@layer`/`@container`) at `cssom.ts:231+`.

### 4.3 Tier C — ad-hoc regex parsing of CSS-ish text (6 sites; all candidates for deletion)

| site | code | risk |
|---|---|---|
| `src/animation/presets/catalog.ts:16` | `` /^\s*@keyframes\s+[^\s{]+\s*\{([\s\S]*)\}\s*$/.exec(css)?.[1] ?? css `` | strips the `@keyframes` wrapper off preset CSS with a regex, not a parse |
| `src/animation/compile/emit/view-transition.ts:146` | `for (const m of body.matchAll(/([\w-]+)\s*:\s*([^;]+);/g))` | re-parses **kf's own emitted** declaration body with a regex to recover `{prop, value}` pairs — a serialize→regex-reparse round trip inside the library |
| `src/animation/compile/emit/view-transition.ts:159` | `CQ_UNIT_RE = /\b-?\d*\.?\d+cq(w\|h\|i\|b\|min\|max)\b/i` | container-query unit sniff on text |
| `src/animation/engine/composition.ts:176` | `raw.match(/-?\d*\.?\d+(?:e[+-]?\d+)?/gi)` | positional numeric extraction from an inline style string (`target.style.getPropertyValue(prop)`) — no unit awareness |
| `src/animation/compile/emit/format.ts:136-144` | `.replace(/^[^{]*{/, "")` / `.replace(/^  /gm,"")` in `formatCSSKeyframeString` | de-formats an emitted block by regex |
| `src/animation/svg/draw-svg.ts:89` | `` /^\s*\d*\.?\d+\s*%\s*$/.test(v) `` | percentage validation by regex instead of `parseCssScalar` |

Also `src/animation/resolve/resolve-if.ts:102` `value.trim().replace(/\s+/g," ")` — whitespace canonicalisation for `if()` clause comparison; and `resolve-if.ts:27` `legacyClauses()` handling an older `if()` argument shape (see §7).

### 4.4 Tier D — the serializer half (the round-trip mirror; the parser wave must move these in lockstep)

`src/animation/compile/emit/css-text.ts` (129 L, **in-degree 12 — the single most-imported module in the tree**) is the text emitter:

- `:17-28` `reverseAnimationShorthand(options)` — kf's own shorthand emitter (note: value.js *also* publishes a `reverseAnimationShorthand`; `format-options.ts:121` calls **value.js's**, `css-text.ts:17` defines **kf's**. Two functions, one name, both live — see §7 DUAL-1).
- `:30-39` `serializeTimingFunction` — hand-rolled `cubic-bezier()`/`steps()`/`linear()` emit.
- `:41-56` `serializeCssValue` — recursive `CssValue` → text; delegates colors to value.js `serializeCssColor` (`:53`) and **throws** if value.js returns `!ok` (`:54`).
- `:58-63` `serializeSelector`, `:65-66` `serializeDeclaration`, `:71+` `serializeStylesheetItem` — a full AST→text writer living in kf, not value.js.

Other serialize sites: `compile/interp-slot.ts:325` `serializeCssColor`; `scroll/grammar.ts:134` `serializeTimelineOptions` (value.js's own inverse — the honest one); `compile/emit/format.ts` `CSSKeyframesToString` (`:292`) / `CSSKeyframesToStrings` (`:126`).

`scroll/grammar.ts:136-149` `roundTripScrollCSS` already codifies the replay-equality oracle (`serialize(parse(s)) ≡ s`) — the pattern the rest of the seam lacks.

### 4.5 Tier E — CSSOM / native-platform reads (not parsing, but adjacent)

`getComputedStyle` at `resolve/browser.ts:52,69,92,105,122,210,224` and `resolve/element-resolve.ts:188-190`; `CSS.supports` at `resolve/env.ts:92` and (feature-probe) `scroll/trigger.ts:25,66`.

### 4.6 Downstream (demo) parse consumers — the blast radius outside `src/`

```
demo/scenes/square/useSquareTumble.ts:22          parseCssColor(css)      ← the known R1 crash surface
demo/scenes/square/useSquareDemo.ts:82            parseCssScalar(v)
demo/utils/keyframeSelector.ts:15                 parseKeyframeSelector(source)
demo/utils/reference-data/animationDescriptions.ts:76  parseTimingFunction(value)
demo/components/instrument/keyframes/KeyframesEditor.vue:186  parseCssScalar(val)
```

### 4.7 The parser test corpus (the wave's regression net)

- `test/fixtures/keyframes/` — 14 `.css` inputs + `manifest.json`. The manifest's `_README` declares three round-trip modes: `byte` (parse→format→reparse→`interpFrames(0.5)` byte-identical), a single `epsilon` row for chromatic color ("a value.js HANDOFF — the oklab parse↔serialize float drift, NOT a kf serializer channel-drop"), and `text` rows for `var()`/`calc()` values whose oracle is serialized text. Consumed by `test/compile/roundtrip-fidelity.test.ts:13`.
- `test/fixtures/compile/` — `scroll-driven.css`, `multi-color-scroll.css`; consumed by `test/compile/compile-roundtrip.test.ts:426`.
- Parser-facing test modules: `test/compile/grammar-fuzz.test.ts`, `valuejs-contract.test.ts`, `value4-color-emit.test.ts`, `value4-easing-contract.test.ts`, `frame-compiler-value4.test.ts`, `selector-value4.test.ts`, `compile-roundtrip.test.ts`, `roundtrip-easing.test.ts`, `entry-roundtrip.test.ts`, `view-transition-roundtrip.test.ts`, `serialize-from-template.test.ts`, `authored-values.test.ts`, `resolve/value4-immutable-resolve.test.ts`, `waapi/value4-layout-eligibility.test.ts`, `demo/instrument/value4-editor-boundary.test.ts`.

---

## 5. Test placement

**100 % external.** Probe: `find src -name '*.test.ts' -o -name '*.spec.ts'` → `0`. All 131 test files live under `test/`, in 24 subdirectories mirroring the src zones plus three that do not:

| dir | files | mirrors |
|---|--:|---|
| `test/compile` | 26 | `src/animation/compile` |
| `test/engine` | 21 | `src/animation/engine` |
| `test/demo` (`app`,`instrument`,`reference-data`,`scenes`,`state`) | 26 | `demo/` — **not the library** |
| `test/physics` | 14 | `src/animation/physics` |
| `test/group` | 10 | `src/animation/group` |
| `test/orchestration` | 9 | `src/animation/orchestration` |
| `test/svg` 3 · `test/waapi` 3 · `test/ingest` 3 · `test/internal` 3 · `test/resolve` 4 · `test/scroll` 2 · `test/presets` 2 | 20 | 1:1 |
| `test/_root` | 1 (`resolve-easing.test.ts`) | `src/animation/easing.ts` — an underscore-prefixed dir holding one file |
| `test/characterization` | 1 (`stable-surfaces.test.ts`) | cross-cutting |
| `test/support` | 2 (`group-probe.ts` = helper, `mirror.test.ts` = test) | mixed helper/test dir |
| `test/fixtures` | 17 data files + 1 `.ts` | corpus |

Two vitest projects (`vitest.config.ts:38-57`): `library` (`test/**/*.test.ts` minus `test/demo/**`, jsdom) and `demo` (`test/demo/**`, jsdom). Benches are a separate `benchmark.include: ["bench/*.bench.ts"]`. Notably `bench/` also holds two `*.measure.test.ts` files that the `library` project **does not** pick up (its include is `test/**`), and two `.mjs` harnesses — so `bench/d3-changed-keys.measure.test.ts` and `bench/sync-step.measure.test.ts` are run by neither project's default glob. (Probe: `vitest.config.ts` include patterns vs `find bench -type f`.)

`vitest.config.ts:16-19` self-aliases `@mkbabb/keyframes.js` → `src/animation/index.ts` so demo tests share one realm with the library under test.

---

## 6. Module roster

`in` = runtime in-degree within `src/`. Purpose = first sentence of the module's leading docblock (blank where the module opens with imports instead).

#### `src/animation/compile/` — 23 modules, 4764 LOC

| module | LOC | in | exports (n) | purpose |
|---|--:|--:|---|---|
| `frame-compiler.ts` | 461 | 2 | 1: FrameCompiler | FrameCompiler — the frame-compilation half of the animation engine, split out of the former ~1019-line Animation god-object (D.W4 D-4). |
| `emit/entry.ts` | 459 | 2 | 6: EntryRoleSpec, EntryCompileOptions, EntryRefusalReason, EntryRefusal, CompiledEntryCSS, compileToEntry | compile/emit/entry.ts — S.F3 EN-c THE ENTRY/EXIT EMITTER (C-22 revised; P2-2). |
| `value-ast.ts` | 400 | 7 | 17: ParsedVarMap, CompiledValue, CompiledVarMap, AuthoredValue, FlatAuthoredValues, AuthoredSink, +11 |  |
| `emit/backward.ts` | 393 | 2 | 7: CompileOptions, CompileChildOptions, CompiledCSS, DEFAULT_DELTA_E_EPSILON, DEFAULT_DENSIFY_STOPS, compileChild, +1 | compile.ts — K.W10 THE COMPILE (the XL anchor of the round-trip's BACKWARD direction). |
| `emit/view-transition.ts` | 387 | 2 | 6: VTRoleSpec, ViewTransitionCompileOptions, VTCompileRefusalReason, VTCompileRefusal, CompiledViewTransitionCSS, compileToViewTransition | compile/emit/view-transition.ts — S.F1 VT-c THE VIEW-TRANSITIONS EMITTER (p09). |
| `emit/backward-color.ts` | 385 | 2 | 5: round, isColorUnit, colorUnitToOklabCSS, DensifyResult, densifyColorBlock | compile-color.ts — K.W10 CC-2 the oklab DENSIFY (the color leg of THE COMPILE). |
| `adapter.ts` | 381 | 2 | 4: DiagnosticCode, Diagnostic, ResolvedKeyframes, resolveKeyframes |  |
| `interp-slot.ts` | 350 | 4 | 11: NumericInterpSlot, ColorInterpSlot, ComputedInterpSlot, DiscreteInterpSlot, InterpSlot, InterpSlotOptions, +5 |  |
| `emit/format.ts` | 342 | 4 | 7: CSSKeyframesToStrings, formatCSSKeyframeString, declaredKeyframeBodyFor, keyframesBlock, PremultiplyResult, premultipliedKeyframesBlock, +1 | T.F22 — the OPTION/SHORTHAND serialization concern (the .class { animation-* } |
| `emit/format-options.ts` | 169 | 2 | 4: animationOptionsToString, animationShorthand, animationComposition, propertyRegistryToString | compile/emit/format-options.ts — the OPTION/SHORTHAND serialization half of the backward format surface (T.F22 — the per-zone cohesion carve off fo… |
| `emit/backward-walk.ts` | 148 | 3 | 6: CompileChild, CompileInput, walkGroup, walkSequence, walkList, cssIdent | compile/emit/backward-walk.ts — the COMPILE input walkers (K.W10, carved off backward.ts in R.W2b). |
| `easing/easing-registry.ts` | 136 | 3 | 2: timingFunctionEntries, resolveTimingFunction | Resolve public timing-function inputs through Value 4's typed contracts. |
| `emit/densify.ts` | 132 | 1 | 1: densifiedKeyframesBlock | compile/emit/densify — the EN-b percentage-keyed densify MERGE tier (S.B3; carved from format.ts at the S.B3 merge — the mixed-track cure: densifie… |
| `emit/css-text.ts` | 129 | 12 | 5: reverseCSSTime, reverseAnimationShorthand, serializeTimingFunction, serializeCssValue, serializeStylesheetItem |  |
| `emit/easing-serialize.ts` | 89 | 6 | 1: serializeEasing | compile/emit/easing-serialize — the Easing → CSS <easing-function> serialization tier (EN-a, S.B3; carved from format.ts at the S.B3 merge — the 50… |
| `index.ts` | 74 | 2 | 32: FrameCompiler, namedSelectorToFraction, parseKeyframeSelector, parseAndFlattenObject, compileValuePair, transformTargetsStyle, +26 | compile/ — the forward + backward CSS-keyframe compile pipeline (R.W1, S.B3). |
| `easing/easing-option.ts` | 66 | 3 | 1: resolveEasingOption | compile/easing/easing-option.ts — the heavy-surface easing-input resolver (carved off frame-compiler.ts in R.W2b; relocated into the compile/easing… |
| `selector.ts` | 62 | 3 | 3: FRAME_ID_SCALE, parseKeyframeSelector, namedSelectorToFraction | Keyframe selector ingestion and named-phase timeline resolution. |
| `emit/index.ts` | 57 | 1 | 19: compileToCSS, DEFAULT_DELTA_E_EPSILON, DEFAULT_DENSIFY_STOPS, CompileOptions, CompiledCSS, CompileRefusal, +13 | compile/emit/ — the EMIT leg of the CSS-keyframe compile (S.B3, C-2; U.C8 P1). |
| `emit/refusal-probes.ts` | 57 | 1 | 3: CompileRefusalReason, CompileRefusal, probeChildRefusal |  |
| `compiled-frame.ts` | 32 | 0 | 2: NumericFoldPlan, CompiledAnimationFrame |  |
| `numeric-plan.ts` | 32 | 1 | 1: buildNumericPlan |  |
| `easing/index.ts` | 23 | 1 | 1: resolveEasingOption | compile/easing/ — the FORWARD leg's easing sub-zone (U.C8; the owner's named example carve). |

#### `src/animation/orchestration/` — 20 modules, 3215 LOC

| module | LOC | in | exports (n) | purpose |
|---|--:|--:|---|---|
| `drag/draggable.ts` | 470 | 2 | 5: DragSubscriber, DragAxis, DragOptions, Draggable, drag | The 2-D drag sugar (drag2D + its Drag2DHandle return type) lives in the |
| `sequence/sequence.ts` | 399 | 1 | 8: SequenceOptions, Sequence, SequencePosition, SequenceEntry, SequenceEvent, SequenceSegmentSubscriber, +2 | Sequence — the master-playhead orchestrator (GSAP-Timeline-class position sequencing for keyframes.js). |
| `split-text/split-text.ts` | 345 | 1 | 4: SplitBy, SplitTextOptions, SplitTextResult, splitText | splitText — an a11y-FIRST text-splitter that rides the existing engine (S.F2; SF-10). |
| `sequence/transport.ts` | 300 | 2 | 12: applySequenceAt, fireSequenceCrossings, SequencePosition, resolveSequencePosition, foldPhase, restPhase, +6 | orchestration/sequence/transport.ts — the pure master-clock transport math (carved off sequence.ts in R.W2b). |
| `view-transition/view-transition.ts` | 260 | 1 | 4: ViewTransitionMutate, ViewTransitionOptions, ViewTransitionHandle, viewTransition | viewTransition — the LIGHT View-Transitions dispatch (S.F1 VT-a; p09). |
| `timeline/timeline.ts` | 221 | 1 | 5: TimelineOptions, Timeline, KeyframesScrollTimelineOptions, KeyframesScrollTimeline, ManualTimeline | orchestration/timeline/timeline.ts — the progress-driver family (S.B4 — carved out of the timeline/index.ts barrel so the barrel is a pure re-expor… |
| `sequence/events.ts` | 216 | 1 | 6: SequenceEntry, SequenceEvent, SequenceSegmentSubscriber, SequenceLabelSubscriber, SequenceSubscriber, SequenceEventBus | Sequence TRANSPORT EVENTS — the segment-lifecycle + named-label crossing channel that {@link Sequence.on} (sequence.ts) exposes. |
| `stagger.ts` | 177 | 3 | 4: StaggerOrigin, StaggerOptions, StaggerFn, stagger | stagger — a construction-time per-index delay generator. |
| `flip.ts` | 176 | 3 | 3: FlipOptions, flip, flipShared | flip / flipShared — the FLIP (First-Last-Invert-Play) layout-animation composition over {@link ElementMorph}. |
| `sequence/lifecycle.ts` | 168 | 1 | 8: play, stop, pause, resume, timeScale, reverse, +2 | orchestration/sequence/lifecycle.ts — the Sequence TRANSPORT verbs (play / stop / pause / resume) + the playback-rate/repeat modifiers (timeScale /… |
| `drag/drag-2d.ts` | 115 | 1 | 2: Drag2DHandle, drag2D |  |
| `timeline/native.ts` | 80 | 3 | 3: ScrollTimelineAxis, NativeTimelineSpec, createNativeTimeline | orchestration/timeline/native.ts — the platform native-timeline feature-detect (R.W1; lib-light F-9). |
| `split-text/segment.ts` | 77 | 1 | 3: TextSegment, segmentWords, segmentGraphemes | The layout-INDEPENDENT segmenters for splitText — by: "word" and by: "grapheme" (S.F2 §S2). |
| `split-text/refuse.ts` | 64 | 2 | 2: SplitTextRefusalReason, SplitTextRefusalError | The typed REFUSAL for splitText's by: "line" measure-or-refuse posture (SF-10 / S.F2 §S2). |
| `index.ts` | 57 | 0 | 40: stagger, StaggerOrigin, StaggerOptions, StaggerFn, flip, flipShared, +34 | orchestration/ — temporal/multi-target helpers over the physics steppers or the engine (R.W1). |
| `timeline/index.ts` | 21 | 2 | 7: Timeline, KeyframesScrollTimeline, ManualTimeline, TimelineOptions, KeyframesScrollTimelineOptions, createNativeTimeline, +1 | orchestration/timeline/ — the progress-driver family barrel (R.W1; thinned to a pure re-export surface at S.B4 — r3 F4 / a02, so the barrel no long… |
| `split-text/index.ts` | 19 | 2 | 7: splitText, SplitBy, SplitTextOptions, SplitTextResult, SplitTextRefusalError, SplitTextRefusalReason, +1 | orchestration/split-text/ — the a11y-first splitText primitive (S.F2). |
| `view-transition/index.ts` | 19 | 2 | 4: viewTransition, ViewTransitionOptions, ViewTransitionHandle, ViewTransitionMutate | orchestration/view-transition/ — the LIGHT View-Transitions dispatch (S.F1 VT-a; p09). |
| `sequence/index.ts` | 18 | 4 | 8: Sequence, SequencePosition, SequenceOptions, SequenceEntry, SequenceEvent, SequenceSegmentSubscriber, +2 | orchestration/sequence/ — the Sequence temporal orchestrator (R.W1). |
| `drag/index.ts` | 13 | 2 | 7: drag, Draggable, DragOptions, DragAxis, DragSubscriber, drag2D, +1 | orchestration/drag/ — the pointer drag/fling input layer (R.W1; lib-light F-10). |

#### `src/animation/physics/` — 22 modules, 2552 LOC

| module | LOC | in | exports (n) | purpose |
|---|--:|--:|---|---|
| `spring/progress.ts` | 484 | 3 | 1: SpringProgress | The spring family's shared option/subscriber types + the canonical |
| `numeric.ts` | 257 | 3 | 3: NumericAnimationOptions, NumericFrameCallback, NumericAnimation |  |
| `playback.ts` | 250 | 9 | 3: RAFPlaybackOptions, Tickable, RAFPlayback |  |
| `smooth.ts` | 197 | 4 | 3: SmoothProgressOptions, SmoothFrameCallback, SmoothProgress |  |
| `oscillator.ts` | 149 | 2 | 4: OscillatorWaveform, OscillatorConfig, waveformValue, Oscillator | Oscillator — a LIGHT periodic phase clock (L.W9 S5 · W128 KF-OSCILLATOR). |
| `morph.ts` | 122 | 3 | 3: MorphRect, ElementMorphOptions, ElementMorph |  |
| `spring/solver/vector.ts` | 121 | 2 | 2: EMPTY_LANES, SpringVectorLanes |  |
| `spring/types.ts` | 120 | 3 | 6: SpringProgressOptions, SpringSubscriber, SpringFrameCallback, SpringPlayback, DEFAULT_SPRING_RESPONSE, defaultSpringOptions | The spring family's shared types + the one canonical default — the ring-break (R.W1, lib-spring §3). |
| `spring/css/timing-function.ts` | 116 | 1 | 2: SpringTimingFunctionOptions, springTimingFunction |  |
| `spring/solver/solver.ts` | 112 | 3 | 5: SpringSolution, SpringModalStep, prepareDampedHarmonic, solvePreparedDampedHarmonic, solveDampedHarmonic | physics/spring/solver/solver.ts — the closed-form damped-harmonic kernel (R.W2c §spring). |
| `decay.ts` | 100 | 4 | 4: DecayOptions, DecaySample, decay, decayRest | Frictional decay (inertial glide) — the one-line closed-form sibling of the spring solver, for the fling/flick case where there is no target to set… |
| `spring/solver/reseat.ts` | 98 | 1 | 3: VelocityProbe, probeVelocity, reseatToSpring | The K.W11 PHYS-B2 velocity-continuous interruption seam — the finite-differenced re-seat that makes a keyframe-stream interruption velocity-continu… |
| `spring/solver/duration.ts` | 83 | 2 | 2: SpringDurationOptions, durationToSpringOptions | The spring-from-duration surface — the modern, time-based { visualDuration \| duration, bounce } idiom Motion now leads its docs with, and its pure… |
| `spring/css/linear-stops.ts` | 71 | 2 | 2: SpringLinearStopsOptions, springLinearStops |  |
| `spring/solver/sample.ts` | 66 | 3 | 2: NormalizedSpringSampleOptions, sampleNormalizedSpring | physics/spring/solver/sample.ts — the normalized-spring sampler shared by the two CSS serializers (R.W1 §spring; the closed-form kernel split to ./… |
| `spring/managed-play.ts` | 51 | 1 | 3: springStartLoop, springPlay, springStop | physics/spring/managed-play.ts — the SpringProgress MANAGED-PLAYBACK loop (the .play()/.stop() rAF ownership), lifted off SpringProgress as FREE FU… |
| `index.ts` | 42 | 0 | 34: NumericAnimation, NumericAnimationOptions, NumericFrameCallback, SmoothProgress, SmoothProgressOptions, SmoothFrameCallback, +28 | physics/ — the LIGHT, clock-driven value steppers + the rAF driver (R.W1). |
| `spring/vector-surface.ts` | 37 | 1 | 4: armVectorLanes, vectorValues, vectorVelocities, tickVectorLanes |  |
| `managed-stepper.ts` | 33 | 2 | 4: ManagedStepper, managedStart, managedPlay, managedStop |  |
| `spring/index.ts` | 28 | 8 | 14: SpringProgress, probeVelocity, reseatToSpring, VelocityProbe, DEFAULT_SPRING_RESPONSE, SpringProgressOptions, +8 | physics/spring/ — the spring physics family barrel (R.W1). |
| `spring/solver/index.ts` | 11 | 1 | 11: prepareDampedHarmonic, solveDampedHarmonic, solvePreparedDampedHarmonic, sampleNormalizedSpring, SpringVectorLanes, EMPTY_LANES, +5 |  |
| `spring/css/index.ts` | 4 | 1 | 4: springLinearStops, SpringLinearStopsOptions, springTimingFunction, SpringTimingFunctionOptions |  |

#### `src/animation/engine/` — 13 modules, 2532 LOC

| module | LOC | in | exports (n) | purpose |
|---|--:|--:|---|---|
| `play-lifecycle.ts` | 482 | 2 | 23: dispatchAnimationEvent, shouldReverse, reverse, onStart, onEnd, advanceTo, +17 | engine/play-lifecycle.ts — the STANDALONE-play lifecycle machine (the play/ advance/transport FREE FUNCTIONS), lifted off the KeyframesAnimation go… |
| `animation.ts` | 478 | 2 | 2: KeyframesAnimation, getAnimationId | engine/animation.ts — the base KeyframesAnimation class over a composed FrameCompiler. |
| `interpolate.ts` | 329 | 1 | 5: restPosition, paintRest, assertNoUnresolvedNamedSelector, at, interpFrames | engine/interpolate.ts — the interpolation HOT PATH, lifted off the KeyframesAnimation god-object (R.W2 — lib-engine "Concern C"). |
| `css/css-animation.ts` | 256 | 1 | 1: CSSKeyframesAnimation | engine/css/css-animation.ts — CSSKeyframesAnimation, the CSS-parsing entry-point subclass, lifted out of the engine god-module (R.W2 — lib-engine F… |
| `composition.ts` | 220 | 2 | 7: CompositionRuntime, computeHasComposition, resetCompositionCaches, applyComposition, captureUnderlyingBase, endValueFor, +1 | animation-composition honoring (K.W7 S1) — the pure helper surface the Animation engine calls to composite a lerped numeric leaf onto its captured … |
| `options.ts` | 194 | 1 | 9: normalizeTimingFunction, normalizeIterationCount, normalizeDuration, normalizeDelay, normalizeDirection, normalizeFillMode, +3 | The fail-explicit option-NORMALIZER surface (the Animation setter contract, lifted off the engine god-object). |
| `css/metadata.ts` | 180 | 1 | 3: recoverAnimationOptionsBase, recoverScrollOptions, registerPropertyDescriptors | CSS-rule METADATA RECOVERY (the W1/W2 seam) — the standalone helpers the CSSKeyframesAnimation engine calls in fromString to recover, off the SAME … |
| `option-setters.ts` | 160 | 1 | 12: applyTimingFunction, applyIterationCount, applyDuration, applyDelay, applyDirection, applyFillMode, +6 | engine/option-setters.ts — the option-APPLY surface, lifted off the KeyframesAnimation god-object (R.W2 — "Concern B"). |
| `compile-bridge.ts` | 114 | 1 | 4: parse, computeHasComposition, computeStableKeys, adoptCompiled | engine/compile-bridge.ts — the compile/recompile bridge between the KeyframesAnimation class and its composed FrameCompiler, lifted off the god-obj… |
| `playback-state.ts` | 55 | 1 | 1: PlaybackState | engine/playback-state.ts — the PlaybackState run-state STORE, carved off engine/play-lifecycle.ts at S.B2 on the STATE↔BEHAVIOR cohesion seam (the … |
| `index.ts` | 28 | 9 | 9: KeyframesAnimation, getAnimationId, CSSKeyframesAnimation, resolveKeyframes, ResolvedKeyframes, DIRECTIONS, +3 | engine/ — the HEAVY value.js-bearing engine core barrel (R.W1/R.W2; gestalt §5). |
| `compiler-state.ts` | 21 | 3 | 2: compilerFor, setCompilerFor |  |
| `css/index.ts` | 15 | 1 | 1: CSSKeyframesAnimation | engine/css/ — the engine's CSS-entry sub-zone (S.B2 — C-1, p01). |

#### `src/animation/group/` — 14 modules, 1647 LOC

| module | LOC | in | exports (n) | purpose |
|---|--:|--:|---|---|
| `group.ts` | 437 | 1 | 2: AnimationGroup, LayerTransitionSpring | PKG-3 (L.W8 §S4): the engine class is KeyframesAnimation (formerly |
| `compositor.ts` | 287 | 1 | 2: compositeFrame, residualBlendArm | group/compositor.ts — the single-target composite engine (R.W2 — lib-group: the transformFramesGrouped (146L) + residualBlendArm (70L) carve the sp… |
| `lifecycle.ts` | 201 | 1 | 10: resolvePlay, play, playReducedMotion, pause, resume, toggle, +4 | group/lifecycle.ts — the AnimationGroup TRANSPORT verbs (play / pause / resume / stop / settle / reset / playing + the reduced-motion snap), lifted… |
| `entries.ts` | 131 | 4 | 6: resolveEntryKey, requireEntry, computeGroupedKeys, renderMultiTarget, snapChildrenToFinal, setChildrenPaused | group/entries.ts — the entry-set helpers AnimationGroup leans on (R.W2 — lib-group: the group-layer-springs.ts junk-drawer 3-way split; these are t… |
| `soa.ts` | 114 | 1 | 4: isNumericAuthoredValue, SoALayerPlan, groupSoABlendLayer, buildSoAPlans |  |
| `layer-api.ts` | 97 | 1 | 4: setLayerConfig, getLayerConfig, transitionLayer, crossfade | group/layer-api.ts — the layer-management + spring-transition API (R.W2 — the cohesive "layer API" concern carved off AnimationGroup to keep group.… |
| `springs.ts` | 92 | 2 | 3: LayerTransitionSpring, seedLayerSpring, advanceLayerSprings | group/springs.ts — the K.W11 PHYS-C spring-driven blend-weight helpers (R.W2 — the group-layer-springs.ts junk-drawer split; the ACTUAL spring-rela… |
| `waapi.ts` | 88 | 2 | 3: GroupWAAPIEligibility, isGroupWAAPIEligible, lowerGroupWAAPI | Group WAAPI lowering (U.C16 / OD-U14 T4b). |
| `yield-batch.ts` | 55 | 1 | 2: advanceSlice, advanceBatched | group/yield-batch.ts — the INP-yield batched-advance the AnimationGroup draw loop drives (R.W2 — the group-layer-springs.ts junk-drawer split; this… |
| `composite-state.ts` | 40 | 1 | 1: CompositeState |  |
| `types.ts` | 29 | 0 | 3: AnimationGroupEntry, AnimationGroupObject, AnimationGroupInput | group/types.ts — the AnimationGroup shared TYPE leaf (S.B4 / a04). |
| `weight.ts` | 27 | 5 | 3: isWeightBlend, resolveBlendWeight, normalizeBlendWeight |  |
| `composite-storage.ts` | 25 | 1 | 2: GroupCompositeStorage, createGroupCompositeStorage |  |
| `index.ts` | 24 | 3 | 6: AnimationGroup, AnimationGroupEntry, AnimationGroupObject, AnimationGroupInput, isGroupWAAPIEligible, lowerGroupWAAPI | group/ — the AnimationGroup compositor barrel (R.W1). |

#### `src/animation/scroll/` — 7 modules, 1233 LOC

| module | LOC | in | exports (n) | purpose |
|---|--:|--:|---|---|
| `trigger.ts` | 313 | 2 | 5: TriggerState, TriggerDirection, supportsNativeTrigger, TriggerScene, createTriggerScene | scroll/trigger.ts — S.F4: realize the already-parsed animation-trigger grammar as the DISCRETE idle→active→done lifecycle in the JS scroll-scene dr… |
| `scene.ts` | 312 | 2 | 6: ScrollSceneEvent, ScrollSceneSubscriber, SnapPoints, ScrollSceneOptions, ScrollScene, createScrollScene | scroll-scene.ts — K.W9 SCROLL-AS-CSS (the field's #1 named gap, closed the only-kf way: PARSE + ROUND-TRIP + DISPATCH the scroll grammar the platfo… |
| `grammar.ts` | 149 | 1 | 10: parseScrollTimeline, parseScrollRange, parseScrollCSS, serializeScrollOptions, roundTripScrollCSS, AnimationTimelineValue, +4 | scroll-grammar.ts — the SO-1 scroll-grammar ROUND-TRIP half of K.W9 SCROLL-AS-CSS (the value.js consume edge; the parser run BOTH ways over the SAM… |
| `dispatch.ts` | 147 | 2 | 5: ScrollDispatchRequest, ScrollBackend, ScrollDispatch, dispatchScrollBackend, pinCSS | scroll/dispatch.ts — the BACKEND-DISPATCH + PIN-SYNTHESIS half of the scroll zone (T.F22 — the per-zone cohesion carve off scene.ts). |
| `drive.ts` | 146 | 1 | 4: ScrollDriveOptions, ScrollDriveTarget, ScrollCSSDrive, driveScrollCSS | The composition face of the scroll zone: parse once, then drive the continuous range, optional discrete trigger, and native-vs-JS backend from that… |
| `range.ts` | 112 | 3 | 2: ResolvedRange, resolveRange | scroll/range.ts — the animation-range → [0,1] progress mapping (K.W9, carved off scene.ts in R.W2b). |
| `index.ts` | 54 | 2 | 32: ScrollScene, createScrollScene, ScrollSceneOptions, ScrollSceneEvent, ScrollSceneSubscriber, SnapPoints, +26 | scroll/ — the scroll-grammar parse/serialize + the JS scroll-scene driver (R.W1). |

#### `src/animation/resolve/` — 8 modules, 1087 LOC

| module | LOC | in | exports (n) | purpose |
|---|--:|--:|---|---|
| `browser.ts` | 257 | 1 | 7: getLayoutEpoch, bumpLayoutEpoch, convertToPixels, convertPixelsToCh, BrowserScalarResolutionError, ResolvedBrowserScalar, +1 |  |
| `element-resolve.ts` | 204 | 1 | 2: resolveElementAwareValues, bindTargets | resolve/element-resolve.ts — the emerging-CSS Phase-2 element-AWARE resolution pass (Q.WB1), lifted off the KeyframesAnimation god-object (R.W2 — l… |
| `resolve-if.ts` | 150 | 2 | 2: resolveIf, isStyleConditionIf |  |
| `env.ts` | 134 | 4 | 6: ResolveEnv, ResolveContext, defaultResolveEnv, makeResolveContext, DROP, Resolved | resolve/env.ts — the injectable resolution environment + context (P.W13 / Q.WB1, carved off resolve/index.ts in R.W2b). |
| `core.ts` | 111 | 1 | 3: resolveValues, hasResolvableValue, hasPhase2Node |  |
| `resolve-function.ts` | 103 | 1 | 2: ResolveNode, resolveFunctionCall |  |
| `spring-css.ts` | 93 | 1 | 3: SpringCssOptions, springCssToOptions, resolveSpringTiming | resolve/spring-css.ts — the CSS spring() → kf-Easing helpers (S.B4 — carved off the resolve/index.ts barrel beside the core recursion so the barrel… |
| `index.ts` | 35 | 2 | 13: ResolveEnv, ResolveContext, defaultResolveEnv, makeResolveContext, DROP, Resolved, +7 | resolve/ — the emerging-CSS lowering pass barrel (P.W13 / Q.WB1; thinned to a pure re-export surface at S.B4 — a02 F3/F4, the last zone barrel that… |

#### `src/animation/waapi/` — 6 modules, 978 LOC

| module | LOC | in | exports (n) | purpose |
|---|--:|--:|---|---|
| `densify.ts` | 318 | 2 | 5: WAAPI_MAX_SUBSEGMENT_STOPS, WAAPI_CHORD_TOLERANCE, canDensifyWAAPISlots, segmentFlatnessError, densifyInteriorTimes | waapi-densify.ts — the WAAPI curvature-adaptive sub-segment densify machinery (Q.WB4), lifted off waapi.ts as a cohesive INTERNAL gestalt seam (Q.W… |
| `eligibility.ts` | 267 | 3 | 2: WAAPIEligibility, isWAAPIEligible |  |
| `delegation.ts` | 173 | 1 | 4: playWAAPI, NativeScrollAttachment, NativeScrollDispatchContext, attachNativeScrollTimeline |  |
| `waapi-options.ts` | 113 | 3 | 1: toWAAPIOptions |  |
| `emission.ts` | 82 | 3 | 1: toWAAPIKeyframes | ── Curvature-adaptive sub-segment densify (Q.WB4) ──────────────────────── |
| `index.ts` | 25 | 3 | 11: WAAPIEligibility, isWAAPIEligible, toWAAPIKeyframes, toWAAPIOptions, NativeScrollAttachment, playWAAPI, +5 | waapi/ — the WAAPI eligibility + emission + options + delegation surface (R.W1/R.W2). |

#### `src/animation/(root)/` — 5 modules, 961 LOC

| module | LOC | in | exports (n) | purpose |
|---|--:|--:|---|---|
| `index.ts` | 315 | 0 | 141: NumericAnimation, NumericAnimationOptions, NumericFrameCallback, SmoothProgress, SmoothProgressOptions, SpringProgress, +135 | keyframes.js package barrel — the value.js static/dynamic boundary. |
| `validate.ts` | 245 | 1 | 4: ValidateOptions, ValidateResult, validate, explain | validate.ts — L.W6 THE AGENT-AUTHORING VERB (the forward direction of the moat: the VALIDATION layer over the compile surface). |
| `public.ts` | 173 | 0 | 80: AnimationGroup, AnimationGroupEntry, AnimationGroupObject, AnimationGroupInput, MotionPath, fromMotionPath, +74 | public.ts — the @mkbabb/keyframes.js/engine subpath's COMPOSITION barrel: the COMPLETE static mirror of the heavy engine surface (R.W4b). |
| `load-engine.ts` | 129 | 1 | 3: AnimationEngine, loadAnimationEngine, warmEngine | The heavy entry seam. |
| `easing.ts` | 99 | 6 | 3: toEasing, cssTwinFor, resolveEasing | Easing construction at the light/heavy boundary. |

#### `src/animation/svg/` — 6 modules, 956 LOC

| module | LOC | in | exports (n) | purpose |
|---|--:|--:|---|---|
| `morph-svg.ts` | 350 | 1 | 4: MorphSVGOptions, fromMorphSVG, MorphSVG, MorphPoint | MorphSVG — SVG path-shape morphing (O.W6, the DM-3 7-tranche chronic terminal). |
| `draw-svg.ts` | 194 | 1 | 4: SVGDrawTarget, DrawSVGOptions, fromDrawSVG, DrawSVG | DrawSVG — CSS-native SVG line-drawing (G.W13). |
| `motion-path.ts` | 177 | 1 | 4: OffsetPath, MotionPathOptions, fromMotionPath, MotionPath | MotionPath — CSS-native path motion (F.W12). |
| `morph-geometry.ts` | 168 | 1 | 11: MorphPoint, DEFAULT_SAMPLES, xKey, yKey, angleKey, samplePolyline, +5 | svg/morph-geometry.ts — the GEOMETRY-SAMPLING + per-frame RENDER machinery of the SVG morph (T.F22 — the per-zone cohesion carve off morph-svg.ts). |
| `handle.ts` | 53 | 3 | 1: SVGAnimationHandle | svg/handle.ts — the abstract SVG animation-handle base (S.B4 / a20 F1+F2; fold row 59). |
| `index.ts` | 14 | 1 | 12: MotionPath, fromMotionPath, MotionPathOptions, OffsetPath, DrawSVG, fromDrawSVG, +6 | svg/ — the HEAVY SVG animation factories (R.W1; lib-light F-1: these are NOT light — each statically imports CSSKeyframesAnimation from the engine,… |

#### `src/animation/presets/` — 6 modules, 954 LOC

| module | LOC | in | exports (n) | purpose |
|---|--:|--:|---|---|
| `classic-data.ts` | 458 | 1 | 34: fadeInKeyframes, fadeOutKeyframes, pulseKeyframes, shakeKeyframes, bounceKeyframes, flipKeyframes, +28 | presets/classic-data.ts — the 34 raw \@keyframes\ CSS-string constants for the classic preset catalog (S.B5 / fold row 32 — the data-volume split o… |
| `catalog.ts` | 386 | 3 | 10: PresetGroup, PresetFactory, PRESET_SPECS, definePreset, presetFactories, enterPresets, +4 |  |
| `index.ts` | 61 | 1 | 43: fadeIn, fadeOut, pulse, shake, bounce, flipPreset, +37 | presets/ — the preset catalog barrel (R.W1; lib-animations F1). |
| `classic.ts` | 36 | 1 | 34: fadeIn, fadeOut, pulse, shake, bounce, flipPreset, +28 |  |
| `taxonomy.ts` | 7 | 1 | 5: enterPresets, exitPresets, attentionPresets, loopPresets, presetTaxonomy |  |
| `spring.ts` | 6 | 1 | 4: springScaleIn, springSlideIn, springPop, springWobble |  |

#### `src/animation/ingest/` — 3 modules, 835 LOC

| module | LOC | in | exports (n) | purpose |
|---|--:|--:|---|---|
| `cssom.ts` | 466 | 2 | 6: IngestedAnimation, IngestResult, IngestOptions, resolveLiveKeyframes, fromStyleSheets, fromLiveAnimations | ingest-cssom.ts — the CSSOM-walk half of the K.W8 ingest (the parser pointed FORWARD at the live web's declared @keyframes). |
| `adopt.ts` | 349 | 1 | 9: AdoptRunningOptions, AdoptResult, adoptRunning, resolveLiveKeyframes, fromStyleSheets, fromLiveAnimations, +3 | ingest.ts — the round-trip pointed FORWARD at the live web (K.W8). |
| `index.ts` | 20 | 1 | 9: fromStyleSheets, fromLiveAnimations, resolveLiveKeyframes, IngestedAnimation, IngestResult, IngestOptions, +3 | ingest/ — the CSSOM walk + live-animation temporal takeover (R.W1). |

#### `src/animation/internal/` — 9 modules, 552 LOC

| module | LOC | in | exports (n) | purpose |
|---|--:|--:|---|---|
| `reduced-motion.ts` | 162 | 9 | 5: prefersReducedMotion, onReducedMotionChange, ReducedMotionPolicy, reducedMotionScale, withReducedMotion | One shared prefers-reduced-motion gate for the whole engine. |
| `errors.ts` | 108 | 11 | 4: AnimationOptionErrorCode, AnimationOptionError, UnknownEasingError, parseOption | Typed option-validation errors — the fail-explicit seam. |
| `leaves.ts` | 75 | 12 | 7: FRAME_RATE, requestAnimationFrame, cancelAnimationFrame, clamp, scale, lerp, +1 | Leaf rAF shims + the re-exported value.js math leaves, kept here so the light engines (SpringProgress, SmoothProgress, NumericAnimation, RAFPlaybac… |
| `scheduler.ts` | 49 | 2 | 1: yieldToMain | yieldToMain() — break a long main-thread task so the browser can service input/render between slices (INP relief). |
| `binarySearch.ts` | 37 | 2 | 1: binarySearchRange | Binary search over a sorted array of non-overlapping ranges. |
| `transport/core.ts` | 36 | 3 | 5: HeldPlayState, RunFlags, beginPlay, playing, toggle | Value-free transport primitives shared by animation, group, and sequence drivers. |
| `helpers.ts` | 35 | 6 | 6: camelCaseToHyphen, hyphenToCamelCase, isObject, sleep, debounce, seekPreviousValue | Small product-owned helpers that do not belong to the Value domain. |
| `animation-id.ts` | 34 | 4 | 2: AnimationIdentity, getAnimationId | internal/animation-id.ts — the shared animation-identity helper (R.W2c). |
| `scroll-phases.ts` | 16 | 2 | 1: PHASE_FRACTIONS | internal/scroll-phases.ts — the FOUR keyframe-reachable scroll-range phase spans, value.js-free (R.W1; lib-scroll-ingest F7 / lib-compile F5). |

#### `src/animation/constants/` — 3 modules, 370 LOC

| module | LOC | in | exports (n) | purpose |
|---|--:|--:|---|---|
| `types.ts` | 259 | 1 | 14: TimingFunctionNames, Vars, TransformFunction, TimingFunction, Easing, TemplateAnimationFrame, +8 | S.B1 — the constants seam, structural (SPEC-v3 §3 S.B1; fold row 34). |
| `defaults.ts` | 96 | 1 | 7: DIRECTIONS, FILL_MODES, COLOR_SPACES, HUE_METHODS, NOOP_TRANSFORM, defaultOptions, +1 | S.B1 — the constants seam, structural (SPEC-v3 §3 S.B1; fold row 34). |
| `index.ts` | 15 | 6 | 2: * (./types), * (./defaults) | S.B1 — the constants seam, structural (SPEC-v3 §3 S.B1; fold row 34). |

---

## 7. Flags

### 7.1 God modules (>~400 LOC) — **9**

| module | LOC | note |
|---|--:|---|
| `physics/spring/progress.ts` | 484 | largest in tree; the spring engine |
| `engine/play-lifecycle.ts` | 482 | extracted from `animation.ts` yet still XL; type-cycles back into it |
| `engine/animation.ts` | 478 | the base engine class; fan-out 12, 5 type-cycles through it |
| `orchestration/drag/draggable.ts` | 470 | |
| `ingest/cssom.ts` | 466 | **on the parsing seam** (§4.2) |
| `compile/frame-compiler.ts` | 461 | its own docblock says it was split out of a "~1019-line Animation god-object" |
| `compile/emit/entry.ts` | 459 | |
| `presets/classic-data.ts` | 458 | pure data (preset CSS strings) — a data-god, lower risk |
| `group/group.ts` | 437 | 4 type-cycles with its own siblings |

Near-misses worth watching: `compile/value-ast.ts` 400, `orchestration/sequence/sequence.ts` 399, `compile/emit/backward.ts` 393, `compile/emit/view-transition.ts` 387, `presets/catalog.ts` 386, `compile/emit/backward-color.ts` 385, `compile/adapter.ts` 381.

### 7.2 Fragment modules (<~30 LOC) — 23 total, of which **5 are pure single-source pass-throughs**

The genuine Goldilocks violations — modules whose entire body is a re-export from ONE sibling, with no docblock and no consumer other than the zone barrel:

| module | LOC | body |
|---|--:|---|
| `presets/classic.ts` | 36 | `export { …34 names… } from "./catalog"` — **nothing else** |
| `presets/spring.ts` | 6 | `export { springScaleIn, springSlideIn, springPop, springWobble } from "./catalog"` |
| `presets/taxonomy.ts` | 7 | `export { enterPresets, exitPresets, attentionPresets, loopPresets, presetTaxonomy } from "./catalog"` |
| `physics/spring/css/index.ts` | 4 | 2-module barrel, no docblock |
| `physics/spring/solver/index.ts` | 11 | 5-module barrel, no docblock |

The `presets/` trio is the sharpest: `presets/index.ts:1-8` documents "the former 886L `animations.ts` god-list **split by kind**: `classic.ts` …, `spring.ts` …, `taxonomy.ts` …" — but the split never happened. All three are zero-logic re-export shims over `catalog.ts` (386 L) + `classic-data.ts` (458 L). Probe: `grep -rn "presets/spring\|presets/taxonomy" src/ demo/ test/ bench/ scripts/` → the ONLY consumers are `presets/index.ts:54` and `:61`. So the chain is `classic-data → catalog → {classic,spring,taxonomy} → index` — a 4-hop re-export ladder where hop 3 is a no-op. **Delete the three shims, export from `catalog.ts` directly in `presets/index.ts`.**

The remaining 18 sub-30 modules are legitimate zone barrels or single-constant leaves (`internal/scroll-phases.ts` 16 L = one `PHASE_FRACTIONS` table with a 10-line docblock justifying its existence as a de-duplication; `engine/compiler-state.ts` 21 L; `group/types.ts` 29 L; etc.).

### 7.3 Module-name redundancy (dir/name stuttering) — 16 measured + 2 structural

Probe: basename equals, prefixes, or suffixes its parent directory token.

```
compile/easing/easing-option.ts          compile/easing/easing-registry.ts
engine/css/css-animation.ts              group/group.ts
orchestration/drag/drag-2d.ts            orchestration/sequence/sequence.ts
orchestration/split-text/split-text.ts   orchestration/timeline/timeline.ts
orchestration/view-transition/view-transition.ts
physics/spring/solver/solver.ts          resolve/element-resolve.ts
resolve/resolve-function.ts              resolve/resolve-if.ts
svg/draw-svg.ts                          svg/morph-svg.ts
waapi/waapi-options.ts
```

Import sites read as `from "./sequence/sequence"`, `from "../physics/spring/solver/solver"`, `from "./view-transition/view-transition"`. Two structural instances on top:

- **`src/` has exactly one child, `src/animation/`** (`find src -type d` → `src`, `src/animation`, …). Every path in the repo is `src/animation/…`; the `animation/` level carries zero discriminating information. That in turn produces the worst stutter in the tree: **`src/animation/engine/animation.ts`**.
- `compile/compiled-frame.ts` inside `compile/`.

### 7.4 Legacy / dual paths

| id | finding |
|---|---|
| **DUAL-1** | **Two live `reverseAnimationShorthand`s.** kf defines its own at `compile/emit/css-text.ts:17`; value.js publishes one that `compile/emit/format-options.ts:20,121` imports and calls. `emit/backward.ts:20` documents the value.js one as "value.js's OWN"; `emit/format-options.ts:81` calls it "the published 0.12.0 inverse". Same name, two implementations, both reachable from the emit tier. A parser wave that changes value.js's shorthand output changes only ONE of them. |
| **DUAL-2** | **Two library entries with overlapping surfaces.** `src/animation/index.ts` (315 L, 141 exports, LIGHT) and `src/animation/public.ts` (173 L, 80 exports, HEAVY, published as `./engine`). ~30 type names appear in both (`ScrollSceneOptions`, `CompileOptions`, `IngestResult`, `AnimationTimelineValue`, …). Deliberate (documented at `index.ts:19`, `vite.config.ts:160-173`), but it means the exports map has two ways in and a name added to one is silently absent from the other. |
| **DUAL-3** | `constants/index.ts` is explicitly a **"back-compat barrel"** (`:3`) over the `types`/`defaults` split, preserving "the EXACT import surface of the former monolithic `constants.ts`". It is also the ONLY `export *` in the non-leaf tier — `presets/index.ts:9-12` states the policy that "`export *` is reserved for the leaf tier". |
| **LEG-1** | `resolve/resolve-if.ts:27` `legacyClauses()` — handles an older `if()` argument shape, reached at `:52`. The one genuine legacy code path in `src/`. |
| **LEG-2** | Retired-alias tombstones (documentation only, code already deleted — good hygiene, listed so a reader doesn't chase them): `index.ts:61-64` (`ScrollTimeline` dropped in 5.0.0), `index.ts:280-281` + `engine/animation.ts:55-56` + `group/group.ts:3` (`Animation` alias dropped), `orchestration/timeline/timeline.ts:183-185`, `orchestration/sequence/sequence.ts:11`. |
| **LEG-3** | `internal/leaves.ts:6` — "THE MATH LEAVES are NO LONGER DUPLICATED (Q.WE2 Arm A — the no-legacy…)": `:28` now does `export { clamp, scale, lerp, lerpArray } from "@mkbabb/value.js/math"`. But the dep-cruiser rule that guards the leaf tier (`:160`) still carries prose asserting "the leaves carry byte-equivalent **copies** of value.js's clamp/lerp/scale" (`:161-164`) — stale comment vs. shipped code. |
| **LEG-4** | `package.json` sets both `types` (top-level, legacy) and `exports["."].types`. Harmless, redundant. |
| **LEG-5** | `dist/` on disk carries **two** `easing-registry-*.js` chunks (`easing-registry-B0rLmOtw.js`, `easing-registry-Db7xwtXT.js`). Either a stale artifact from a prior build or a genuine duplication across the two entries; `dist/` is gitignored so this is a local-tree observation, not a repo claim. |
| **STALE-1 / -2** | The two `.dependency-cruiser.cjs` defects, §3.5 (dead LIGHT allowlist paths; a baseline file that does not exist). |

### 7.5 Failure-posture inconsistency on the parse seam (cross-cutting)

The same value.js parse failure is handled three different ways depending on the call site:

- `compile/adapter.ts:217-225` — **absorb**: returns empty AST + `ParseIssue[]`, surfaced as `Diagnostic` rows on `animation.diagnostics`.
- `scroll/grammar.ts:57-61` (`requireParsed`) — **throw** `TypeError`.
- `validate.ts:181-192` (`keyframesNames`) — **swallow**: `try { … } catch { return [] }`.
- `compile/selector.ts:27-34` — **throw** `AnimationOptionError` with a structured `EMPTY_PARSE` code.
- `compile/value-ast.ts:73-77` — **throw** `TypeError`.

Any parser-consumption wave that changes value.js's diagnostic shape touches all five independently. This is the strongest argument for a single kf-side `parse()` façade before the wave begins.
