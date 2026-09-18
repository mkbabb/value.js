# PROOF SEAT P-2 — Coverage Census (C14 assay vs three surfaces)

Mechanical, owner-mandated **pre-execution gate** (D-23 mirror-primary). This
census measures the **C14 published-engine CSS assay** at
`/Users/mkbabb/.claude/jobs/9e7dadd0/tmp/parser-proof/c14-css` against three
surfaces. No repo source was modified.

## What is being measured (read this before the verdict)

The C14 assay is, by its own charter, a **W0-only mirror prototype**:

> "Only W0 is a product-shaped vertical: `oklch()`, `cubic-bezier()`, and one
> qualified stylesheet rule. The remaining modules are thin executable edge and
> responsibility witnesses, **not CSS coverage claims** … Full production/
> semantic equivalence remains P01 RED."
> — `c14-css/README.md:16-18`, `:12-14`

Its **entire public API is three functions** —
`parseColor` / `parseEasing` / `parseStylesheet` — over its own private value
model (`OklchValue` / `CubicBezierValue` / `StylesheetValue`):

- `c14-css/src/css/api.ts:8-23` (the three exported functions)
- `c14-css/src/css/value.ts:1-25` (its private value types)
- `c14-css/README.md:17` — "There is deliberately no barrel."

Therefore this census is **assay-vs-frozen-contract coverage**, i.e. *"if this
mirror were promoted to the v4 parser (the V03 transpose), would it cover the
contract value.js already ships and keyframes already consumes?"* It is **not**
a claim that value.js 4.0.0 is missing exports. value.js ships the full frozen
surface today in `src/css/grammar.ts` (483 L), `stylesheet.ts` (899 L),
`timeline.ts` (124 L), `syntax.ts` (101 L) — 1607 lines backing the 52 exports.

Verdict legend: **TOTAL** = assay covers the item by name + shape; **PARTIAL** =
present but narrower (what's missing named); **ABSENT** = no assay peer.

---

## Surface 1 — THE FROZEN v4 SURFACE (`src/css/index.ts` + `types.ts`)

value's `/css` public surface = **52 exports** = 19 runtime + 33 types
(`src/css/index.ts:1-61`), plus the 8-code `ParseIssue` union and the 4-kind
`CssTimingFunction`.

### 1a. Runtime exports (19) — `src/css/index.ts:36-60`

| Export (anchor) | Assay peer | Verdict | Missing |
|---|---|---|---|
| `parseCssColor` `index.ts:37` | `api.ts:8 parseColor` → `color.ts:9,26 oklch` | **PARTIAL** | 12 of 13 spaces + hex + named + `color()` + relative-color + `color-mix` — assay parses `oklch()` only |
| `parseCssScalar` `index.ts:38` | `value-unit.ts:16 numberValue` (not exported at api) | **ABSENT** | no public scalar entry; no dimension/angle/percent unification export |
| `parseCssValue` `index.ts:39` | `values.ts:11 cssValue` (not exported at api) | **ABSENT** | no public single-value entry |
| `parseCssValues` `index.ts:40` | — | **ABSENT** | no space/comma list parsing anywhere in assay |
| `parseKeyframeSelector` `index.ts:41` | `keyframes.ts:4 keyframeSelector` (not exported at api) | **ABSENT** | percentage only; no `from`/`to`; no named ranges; not exported |
| `parseTimingFunction` `index.ts:42` | `api.ts:15 parseEasing` → `easing.ts:6,18` | **PARTIAL** | keyword (`linear`/`ease`/`ease-in`/`ease-out`/`ease-in-out`), `steps()`, `linear()` — assay parses `cubic-bezier()` only |
| `serializeCssColor` `index.ts:43` | — (`serialize.ts` is exact/edit **source** serializer) | **ABSENT** | no canonical color serializer |
| `coerceToSyntax` `index.ts:45` (from `./syntax`) | — (no `syntax` module in assay) | **ABSENT** | entire syntax-descriptor surface |
| `parseAnimationRange` `index.ts:47` | — (no `timeline` module) | **ABSENT** | entire timeline surface |
| `parseAnimationTimeline` `index.ts:48` | — | **ABSENT** | entire timeline surface |
| `serializeTimelineOptions` `index.ts:49` | — | **ABSENT** | entire timeline surface |
| `collectAnimationOptions` `index.ts:52` | — | **ABSENT** | no `collect*` API |
| `collectCustomFunctions` `index.ts:53` | — | **ABSENT** | `@function` unrecognized |
| `collectDeclarations` `index.ts:54` | — | **ABSENT** | no collector |
| `collectKeyframes` `index.ts:55` | — | **ABSENT** | `@keyframes` refused (`stylesheet.ts:19-21`) |
| `collectPropertyDescriptors` `index.ts:56` | — | **ABSENT** | `@property` unrecognized |
| `collectStyleRules` `index.ts:57` | `stylesheet.ts:23-30` (internal, not exported as collector) | **ABSENT** | no `CollectedRule`/path model; not exported |
| `collectTimelineOptions` `index.ts:58` | — | **ABSENT** | no collector |
| `parseStylesheet` `index.ts:59` | `api.ts:20 parseStylesheet` → `stylesheet.ts:23` | **PARTIAL** | returns private `StylesheetValue`, **not** `Stylesheet`; style-rules only; only `color` + `animation-timing-function` declarations are lowered (`lower.ts:89-102`); all at-rules refused (`stylesheet.ts:19-21`); no nesting/recovery/`collect*` |

**Runtime tally: 0 TOTAL / 3 PARTIAL / 16 ABSENT.**

### 1b. Type exports (33) — `src/css/index.ts:1-35`

The assay defines its **own** types (`value.ts:1-25`, `cst.ts:3-47`,
`result.ts:3-15`). **None** of the 33 frozen type names appear anywhere in the
assay tree. All **ABSENT**:

`AnimationRangeValue`, `AnimationTimelineValue`, `AnimationTriggerValue`,
`CSSAnimationOptions`, `CSSPropertyDescriptor`, `CSSTimelineOptions`,
`CollectedRule`, `CssColor`, `CssColorSpace`, `CssLinearStop`,
`CssTimingFunction`, `CustomFunctionDescriptor`, `CustomFunctionParameter`,
`CustomFunctionRule`, `Declaration`, `KeyframeRule`, `KeyframeSelector`,
`KeyframesBlock`, `ParseIssue`, `ParseResult`, `PropertyRule`, `RangeBoundary`,
`RangePhase`, `ScrollTimelineDescriptor`, `ScrollerKeyword`, `StyleRule`,
`Stylesheet`, `StylesheetItem`, `TimelineAxis`, `TimelineScopeValue`,
`TriggerType`, `ViewInset`, `ViewTimelineDescriptor`
(defined `types.ts:6-129`).

**Type tally: 0 TOTAL / 0 PARTIAL / 33 ABSENT.**

### 1c. The 8-code `ParseIssue` union — `src/css/types.ts:10-19`

Assay diagnostic model is a **different 3-code union** (`result.ts:4`:
`CSS_PARSE | CSS_TRAILING | CSS_EXCEPTION`) — not the frozen `code` shape (no
`start`/`end`/`expected[]`/`actual`).

| Frozen code (`types.ts:12-19`) | Assay echo | Verdict |
|---|---|---|
| `css_syntax` | `CSS_PARSE` (`result.ts:21`) | **PARTIAL** (loose, wrong shape) |
| `trailing_input` | `CSS_TRAILING` (`result.ts:21`) | **PARTIAL** (loose, wrong shape) |
| `keyframe_selector_invalid` | — | **ABSENT** |
| `color_context_required` | — | **ABSENT** |
| `syntax_descriptor_invalid` | — | **ABSENT** |
| `syntax_mismatch` | — | **ABSENT** |
| `animation_option_invalid` | — | **ABSENT** |
| `timeline_option_invalid` | — | **ABSENT** |

(Assay's `CSS_EXCEPTION` `result.ts:43` is a runtime guard with no frozen peer.)
**Union tally: 0 TOTAL / 2 PARTIAL / 6 ABSENT.**

### 1d. `CssTimingFunction` 4 kinds — `src/css/types.ts:32-36`

`keyword` / `cubic-bezier` / `steps` / `linear-function`. Assay covers
`cubic-bezier` only (`easing.ts:6`). **PARTIAL** — 3 of 4 kinds ABSENT.

---

## Surface 2 — THE KF CONSUME SEAMS

`grep @mkbabb/value.js/css` over `keyframes-v-exec/src` → **27 import sites**,
**75 symbol occurrences**, **37 distinct symbols**. (Line-hit count is 29 —
`scroll/grammar.ts` and `emit/css-text.ts` each carry two import blocks.)

**Finding A — the frozen surface is a total superset of KF's needs (contract
intact, GREEN):** every one of the 37 KF-consumed symbols is exported by
`src/css/index.ts`. value.js/css fully serves keyframes. Zero orphan imports.

**Finding B — the ASSAY covers almost none of them (RED as a mirror):** the
assay exports 3 functions; per the Surface-1 mapping only `parseStylesheet`
(name-match, PARTIAL), `parseTimingFunction` (≈`parseEasing`, PARTIAL), and
`parseCssColor` (≈`parseColor`, PARTIAL) have any assay peer. The other 34 are
**ABSENT**.

| KF-consumed symbol (×uses) | frozen? | assay verdict |
|---|---|---|
| `KeyframeSelector` ×8 | yes (type) | ABSENT |
| `CSSTimelineOptions` ×6 | yes (type) | ABSENT |
| `CSSAnimationOptions` ×4 · `CSSPropertyDescriptor` ×4 · `Stylesheet` ×4 | yes (type) | ABSENT |
| `AnimationRangeValue` ×3 · `AnimationTimelineValue` ×3 · `CustomFunctionDescriptor` ×3 · `collectStyleRules` ×3 · `parseStylesheet` ×3 | yes | `parseStylesheet` → **PARTIAL**; rest **ABSENT** |
| `Declaration` ×2 · `ParseIssue` ×2 · `collectKeyframes` ×2 · `collectTimelineOptions` ×2 · `parseCssScalar` ×2 · `parseTimingFunction` ×2 · `serializeCssColor` ×2 | yes | `parseTimingFunction` → **PARTIAL**; rest **ABSENT** |
| `AnimationTriggerValue` · `CssColor` · `CssLinearStop` · `CssTimingFunction` · `CustomFunctionParameter` · `KeyframeRule` · `ParseResult` · `RangeBoundary` · `RangePhase` · `StylesheetItem` · `TriggerType` · `coerceToSyntax` · `collectAnimationOptions` · `collectCustomFunctions` · `collectPropertyDescriptors` · `parseAnimationRange` · `parseAnimationTimeline` · `parseCssValues` · `parseKeyframeSelector` · `serializeTimelineOptions` (×1 each) | yes | ABSENT (except none have assay peers) |

Representative site anchors (`keyframes-v-exec/src`):
`animation/scroll/grammar.ts:44,55` (11 symbols), `compile/adapter.ts:14` (12
symbols), `engine/css/metadata.ts:30` (7 symbols), `animation/validate.ts:47`
(`collectKeyframes`,`parseStylesheet`), `resolve/browser.ts:3`
(`parseCssScalar`), `compile/frame/interp-slot.ts:8` (`serializeCssColor`).

**Surface-2 assay tally: 0 TOTAL / 3 PARTIAL / 34 ABSENT.**

---

## Surface 3 — THE JULY-2026 SPEC SET (assay's 15 grammar modules vs inventory)

Inventory source: the Codex standards machinery in
`docs/tranches/V/apotheosis/snapshot-vnext-2/`:
- **Module-topology inventory** — `CSS-MODULE-ISOMORPHISM.json:22-127` (the
  15 formation-current BBNF runtime stems; BBNF HEAD `af15f63`).
- **Feature-depth inventory** — the operation-vector algebra
  (`PARSER-CSS-COLOR.md:128-181`: every feature owns a
  parse/type/evaluate/resolve/adapt/serialize×3 vector) + the V-wave feature
  registry (`waves/P-V.md:84-122`).

Note: the assay ships **15** `l4` modules (matching the isomorphism set) + 1
`combinators.ts` helper = 16 grammar files (`combinators.ts:1-42`). The task's
"17 grammar modules" reads loosely (README `:27` counts "all 17 tests"; only 15
`l4` test peers exist). All 15 canonical modules are enumerated below.

**Module-topology join: 15/15 COVERED** — every BBNF runtime stem has its
handwritten `l4/*.ts` filename peer + external test peer (verified against
`CSS-MODULE-ISOMORPHISM.json:24-127`). **Feature-depth: each module is a single
thin production** — the gaps below. (Per task: **Surface-3 gaps do NOT redden
the gate; C12 owns growth.**)

| Module (anchor) | What it parses today | Feature GAP | Owning wave(s) |
|---|---|---|---|
| `color.ts:9,26` | `oklch()` only | rgb/hsl/hwb/lab/lch/oklab/xyz + `srgb-linear`/`display-p3`/`a98-rgb`/`prophoto-rgb`/`rec2020` + hex + named + `color()` + relative-color + `color-mix()` + `light-dark()` + `contrast-color()` | V12·V13·V14·V17·V19·V20 |
| `easing.ts:6,18` | `cubic-bezier()` only | keyword easings, `steps()`, `linear()`, `spring()` | V25 |
| `filters.ts:5,11` | `blur()` only | brightness/contrast/drop-shadow/grayscale/hue-rotate/invert/opacity/saturate/sepia + `url()` | V23 |
| `func-body.ts:4,10` | `calc(<single value-unit>)` | operators `+ − * /`, `min/max/clamp`, `round/mod/rem`, trig/exp/sign, nesting | V04·V05 |
| `gradients.ts:6,17` | `linear-gradient(angle, oklch, oklch)` | radial/conic/repeating-*, N color-stops, hints, positions, `in <space>` interpolation, non-oklch stops | V21·V22 |
| `keyframes.ts:4,7` | `<percentage>` selector | `from`/`to`, named ranges (`entry`/`exit`/`cover`/`contain` + offset), multi-selector, per-keyframe timing/composition | V26·V27 |
| `keywords.ts:4,11` | css-wide `inherit`/`initial`/`unset`/`revert`/`revert-layer` | **near-total for its narrow responsibility** | V03·V04 |
| `media.ts:5,11` | `@media <ident> { … }` (standalone, unwired) | feature queries, ranges, `and`/`or`/`not`, `@container`/`@supports`; wire into stylesheet | V08 |
| `properties.ts:14-25` | `name : <regex value> ;` (catch-all value) | typed value parse, per-property grammar, nested rules | V04·V09 |
| `selectors.ts:5,9` | regex `(?!@)[^{}]+?(?=\{)` catch-all | typed selector CST, combinators, pseudo, nesting `&`, specificity, forgiving lists, namespaces | V07 |
| `stylesheet.ts:23-30` | `qualifiedRule.many(1)` — style rules only, **at-rules refused** (`:19-21`) | `@media`/`@keyframes`/`@property`/`@function`/`@font-face`/`@layer`/`@scope`/`@starting-style`/`@supports`/`@scroll-timeline`/`@view-timeline`, nesting, recovery, source order | V09·V26·V27 |
| `tokens.ts:4-7` | identifier / string / `#hash` | number/dimension/percentage/url/function/delim/comment/CDO-CDC per CSS Syntax L3 | V03 |
| `transforms.ts:4,10` | `translateX()` only | translate(Y/Z/3d)/scale*/rotate*/skew*/matrix*/perspective, 2D↔3D promotion | V24C·V24M |
| `value-unit.ts:16-35` | number / percentage / angle / dimension (`[a-zA-Z]+` catch) | typed unit algebra, length/time/frequency/resolution classes, signed-zero/non-finite, context-requirements | V05 |
| `values.ts:11-20` | `any(oklch, cubic-bezier, blur, linear-gradient, translateX, value-unit, token)` | comma/space lists, `var()`/`env()`/`attr()` substitution, inherits every leaf gap above | V03·V04·V06 |

---

## Named gap list (Surface 3) with suggested owning waves

The C12 lane owns growth (`CANON-SUPPLEMENT-INVENTORY.json` row `C12 →
V01,V29,K04I,K09`). Gaps route to their feature wave (`waves/P-V.md`):

1. **Full color inventory** (12 spaces + hex/named/`color()`/relative/`color-mix`/`light-dark`/`contrast-color`) → **V12, V13, V14, V17, V19, V20** — all BORN-RED (`waves/P-V.md:97-99,105,109-110`).
2. **Full easing** (keyword/steps/`linear()`/`spring()`) → **V25** (`P-V.md:118`).
3. **Filter functions** (10 + `url()`) + shapes/shadow → **V23** (`P-V.md:113`).
4. **calc/math** (operators, min/max/clamp, stepped/trig/exp) → **V04, V05** (`P-V.md:87-88`).
5. **Gradients & image union** (radial/conic/repeating, N-stops, `<image>`) → **V21, V22** (`P-V.md:111-112`).
6. **Keyframes & timelines** (from/to, named ranges, scroll/view, triggers) → **V26, V27, V28** (`P-V.md:119-121`).
7. **Media/container/supports queries** → **V08** (`P-V.md:91`).
8. **Typed declarations / value-definition matcher** → **V04, V09** (`P-V.md:87,92`).
9. **Typed selectors** (specificity, nesting, forgiving) → **V07** (`P-V.md:90`).
10. **At-rule stylesheet model** (`@property`/`@function`/`@layer`/`@scope`/`@starting-style` + recovery) → **V09** (`P-V.md:92`).
11. **CSS-Syntax-L3 tokenizer** (number/dimension/url/function/comment) → **V03** (`P-V.md:86`).
12. **Full transform + motion** → **V24C, V24M** (`P-V.md:115,117`).
13. **Unit algebra & context-requirements** → **V05** (`P-V.md:88`).
14. **Substitution** (`var()`/`env()`/`attr()`) → **V06** (`P-V.md:89`).

The V03 transpose (`P-V.md:86`) is the wave that materializes the frozen v4
public parser from the completed P01 mirror; V29 (`P-V.md:122`) closes every
operation cell. All are BORN-RED — consistent with this census.

---

## GATE VERDICT (Surface 1 + 2 only)

### **RED.**

The frozen v4 surface + KF seams are **NOT** total in the C14 assay, and no
PARTIAL has a trivial named completion (each requires a BORN-RED V-wave). The
assay is a W0-only mirror prototype (`oklch()` + `cubic-bezier()` + one
qualified rule) exposing a 3-function private API; it does not cover the shipped
52-export contract nor the 37 KF-consumed symbols.

**Exact missing list (the gate blocker):**

- **Surface 1 runtime — 16 ABSENT** (`index.ts:38-58`): `parseCssScalar`,
  `parseCssValue`, `parseCssValues`, `parseKeyframeSelector`, `serializeCssColor`,
  `coerceToSyntax`, `parseAnimationRange`, `parseAnimationTimeline`,
  `serializeTimelineOptions`, `collectAnimationOptions`, `collectCustomFunctions`,
  `collectDeclarations`, `collectKeyframes`, `collectPropertyDescriptors`,
  `collectStyleRules`, `collectTimelineOptions`.
- **Surface 1 runtime — 3 PARTIAL** (no trivial completion): `parseCssColor`
  (1/13 spaces), `parseTimingFunction` (1/4 kinds), `parseStylesheet` (private
  shape, style-rules only, 2 declaration types lowered, at-rules refused).
- **Surface 1 types — 33 ABSENT** (all of `index.ts:1-35`).
- **Surface 1 `ParseIssue` — 6/8 codes ABSENT**; 2/8 only loosely echoed under a
  different 3-code union (`result.ts:4`).
- **Surface 1 `CssTimingFunction` — 3/4 kinds ABSENT.**
- **Surface 2 — 34/37 KF-consumed symbols ABSENT**, 3/37 PARTIAL.

**Read the RED correctly:** it certifies the assay is *not yet* a totality proof
of the frozen contract (expected for a W0 pilot; it matches `README.md:16-18` and
the BORN-RED V03/V12–V28 registry). It is **not** a defect in value.js 4.0.0 —
the shipped surface is total, and (Surface-2 Finding A) is a complete superset of
everything keyframes imports (0 orphan seams). The gate blocks *promotion of the
mirror to primary* until the V03 transpose builds the full 52-export mirror.
