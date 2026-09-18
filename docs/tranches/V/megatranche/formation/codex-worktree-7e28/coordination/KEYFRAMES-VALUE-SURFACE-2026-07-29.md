<!--
  PROVENANCE — M-21 C-11 (codex-provenance ledger row 28), 7e28 worktree census, ruled 2026-08-03
  original: /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/coordination/KEYFRAMES-VALUE-SURFACE-2026-07-29.md
  original-mtime: 2026-07-29T20:03:50
  original-sha256: f9a98d7df6addf6e0d61d2adfad7340e667f503486668da0403f1861c3965b96
  original-bytes: 16421
  ruling: ADOPT-COPY — M-21 C-11 — 2026-08-03
  note: this comment block is prepended to otherwise byte-exact original content, so the
  copy's own sha256 differs; both digests are recorded in CENSUS.md. The original bytes
  are exactly the last original-bytes bytes of this file.
-->
# Keyframes Consumer Truth — Value Surface and Disposition Delta

Date: 2026-07-29
Status: P2 AGGLOMERATED **AMEND**; placement and narrow operation names frozen,
record shapes remain execution-gated
Inputs: Keyframes W-01/W-02, root adjudications, parser-owner receipt, live
Value and Keyframes source census, XR-16
`audit/cross-repo/VALUE-P2-SOL-AGGLOMERATION-2026-07-29.md`

## 1. Reconciled census

Keyframes contains exactly 49 direct `@mkbabb/value.js/css` import declarations in 47 files:

- 29 declarations under `src`;
- 7 under `demo`;
- 10 under `test`;
- 3 under `bench`;
- `src/animation/compile/emit/css-text.ts` and `src/scroll/grammar.ts` each contain two declarations.

The dirty Keyframes evidence tree also contains four non-import literal
references: two `import.meta.resolve` packaging probes and two bench HTML
import-map keys. The precise statement is 49 direct imports in 47 files plus
four non-import literals, for 53 `/css` references across 51 files.

Current production carry:

- CSS AST/value/timing/selector/animation serialization in `src/animation/compile/emit/css-text.ts`;
- callable-easing projection and sampled `linear()` construction;
- CSS scroll/timeline grammar;
- SVG path scanning/normalization used by `morph-svg.ts` and `morph-geometry.ts`;
- raw motion-path strings and unvalidated offset distance/rotate.

Terminal direction is `MOVE/FOLD`, then `PRUNE` from Keyframes. Value owns the sole CSS grammar, consumer contract, and canonical inverse. Parse-that owns only the reusable parser runtime. Keyframes keeps DOM computed-style resolution, timeline-to-progress, WAAPI/rAF scheduling and composition, curve-sampling policy, and browser-only DrawSVG geometry.

## 2. Frozen subpath placement

| Subpath | Terminal ownership |
|---|---|
| `/css` | stylesheet/keyframes/animation/timing/timeline/value/selector/transform-property grammar and canonical inverses; CSS motion properties and `path()` wrapper; typed explicit CSS `linear()` stop validation/construction |
| `/path` | SVG `d` grammar/inverse plus typed `PathGeometry` |
| `/transform` | zero-parsing numeric matrix/decompose/slerp leaf only |
| parse-that | generic Result/state/spans/diagnostics/recovery/combinators; no CSS/path/transform types |
| Keyframes root/timing | scheduling, composition, progress, DOM resolution, sampling policy |
| Keyframes engine | may consume Value `/css`, `/path`, and `/transform` after explicit engine load |

No CSS transform parser or SVG path scanner enters `/transform`. No token/scanner plane, copied CSS, raw-source alias, compatibility export, dual path, or parser/constructor overload is admitted.

## 3. P2-agglomerated surface

P2 freezes only the operations supported by existing Value source or explicit
inverse adjudication:

- existing `/css` parse/collect/timeline names:
  `parseCssValue`, `parseCssValues`, `parseKeyframeSelector`,
  `parseTimingFunction`, `parseAnimationRange`, `parseAnimationTimeline`,
  `parseStylesheet`, `collectAnimationOptions`, `collectCustomFunctions`,
  `collectDeclarations`, `collectKeyframes`, `collectPropertyDescriptors`,
  `collectStyleRules`, and `collectTimelineOptions`;
- direct inverse names: `serializeCssValue`, `serializeTimingFunction`,
  `serializeKeyframeSelector`, `serializeDeclaration`,
  `serializeStylesheetItem`, and `serializeStylesheet`;
- the existing `PathGeometry` identity, moved to `/path`, with
  `totalLength` as the sole length accessor.

Names for the parsed-animation-shorthand inverse, semantic ordered-longhand
projection, explicit CSS-stop construction/validation, transform/motion
parse/inverse operations, typed matrix factories, and SVG parse/inverse remain
open until their born-RED cells derive the smallest coherent family. There is
no compatibility alias when a name settles.

Record shapes also remain open: parsed-node/source-map spans, public diagnostic
codes/`cause`/`actual`, full transform/motion unions, CSS `linear()` fix-up
rules, matrix factory records, and parsed SVG command/span projection must be
derived from parse-that guarantees plus the complete Webref/WPT denominator.
The local prototype cannot freeze any of them.

### Result and recovery

```ts
type CssResult<T> =
  | {
      readonly ok: true;
      readonly value: T;
      readonly diagnostics: readonly CssDiagnostic[];
    }
  | {
      readonly ok: false;
      readonly diagnostics: readonly [
        CssDiagnostic,
        ...CssDiagnostic[],
      ];
    };
```

A successful stylesheet parse may carry non-empty immutable recovery
diagnostics. Leaf parsers may remain strict. Invalid source remains
failure-explicit and non-throwing. Exact parsed-node span/source-map
representation is deliberately not frozen by P2.

### `/css`

V.L2 splits two animation operations:

1. inverse of a parsed, grammar-valid animation shorthand AST;
2. projection of semantic `CSSAnimationOptions` to ordered typed longhand
   declarations.

The projection preserves `playState`. An explicitly supplied
`composition: "replace"` emits `animation-composition: replace`; only an
absent composition may be omitted. This is the runtime-safe longhand route,
not a permanent claim about future shorthand grammar.

Value validates and canonically represents explicit CSS `linear()` stops.
Keyframes owns callable sampling, error measurement, `maxStops`,
thrown/non-finite sample handling, and the sampling receipt. No adaptive
sampling brand or provenance apparatus exists in Value.

Transform and motion record shapes must cover the full Webref/WPT denominator,
including axis-specific translate/scale/rotate/skew forms and unresolved
`var()`/`calc()` values. CSS `offset-path`/distance/rotate and `path()` consume
typed `/path` data. Numerical `invertCssMatrix*` operations are pruned.

### `/path`

Invalid SVG source enters only through the future failure-explicit parse
operation. `PathGeometry` is a total typed-only constructor over admitted,
parser-produced finite SVG path data:

```ts
declare class PathGeometry {
  constructor(path: SvgPathData);
  readonly totalLength: number;
}

// compile RED
new PathGeometry("M0 0");
```

The constructor never parses and never accepts a string. Empty SVG data has
length `0` and samples the origin. Move-only data has length `0` and samples
the move point. Multiple subpath moves add no segment and no phantom connecting
length. Geometry must prove finite work/tolerance and explicit
NaN/±Infinity sampling behavior. The duplicate `getTotalLength()` method and
string helper/factory paths are pruned.

### `/transform`

`/transform` retains typed numeric matrix construction/operations, decomposition, interpolation, and slerp. String helpers, path parsing, and `PathGeometry` move out. A light `/transform` import must not evaluate or resolve parse-that, `/css`, `/color`, or `/path`.

## 4. Serializer contract

All inverses are canonical, failure-explicit, and non-throwing for representational refusal.

- numbers are finite; negative zero serializes as `0`;
- known identifiers and units use canonical lowercase spelling;
- whitespace, comma, slash, declaration, and property ordering is stable;
- stylesheet joins use `\n`, with no platform-dependent newline;
- CSS strings and identifiers use one standards-conforming escaping implementation;
- unknown at-rules may round-trip only as parser-provenanced opaque nodes with exact spans; callers cannot forge a raw passthrough node;
- unsupported, non-finite, internally contradictory, or unrepresentable typed values return `ok:false`;
- a serializer never substitutes an empty string, drops a field silently, or throws for ordinary refusal.

Ownership of punctuation:

- `serializeDeclaration` returns `property: value` and never owns the semicolon;
- the declaration-list or stylesheet container owns separators and optional terminal semicolons;
- `serializeAnimationShorthand` serializes exactly one shorthand value and owns neither property name nor semicolon;
- `animationDeclarations` is not shorthand serialization: it projects typed animation options into ordered longhand declaration nodes;
- `serializeStylesheetItem` owns the complete item spelling but not the separator between sibling items;
- `serializeStylesheet` owns sibling newlines and the final-newline policy.

`serializeCssValue` and `serializeKeyframeSelector` already have grounded internal implementations in Value. Formation folds and hardens them rather than inventing compatibility aliases.

P2 freezes the separator boundary above: leaf declaration and shorthand-value
inverses own no semicolon; their container owns separators. Indentation and
final-newline spelling remain V.L2 born-RED choices, but one explicit container
contract must own them and cannot depend on ambient formatting state.

Animation composition is likewise not a standards-final shorthand claim. The
current runtime-safe candidate emits `animation-composition` as a separate
longhand. CSS Animations Level 2 draft prose/examples and its normative
shorthand grammar are internally inconsistent, Chromium currently accepts
`animation-composition: add` while rejecting shorthand `add`/`accumulate`, and
the same runtime accepts shorthand `paused`. Formation therefore withholds the
absolute claim that composition can never belong to the shorthand.

## 5. Exact Keyframes disposition delta

| Keyframes carry | Value destination | Keyframes terminal result |
|---|---|---|
| CSS AST/value emitters in `css-text.ts` | `/css` canonical inverses | `MOVE`, replace imports, then `PRUNE` |
| selector serialization | `/css` | `FOLD` into existing grounded inverse, then `PRUNE` duplicate |
| animation shorthand/declaration spelling | `/css` | `MOVE`, then `PRUNE` |
| timing-function spelling | `/css` | `MOVE`, then `PRUNE` |
| callable easing sampling and projection | Keyframes timing | `KEEP` callable sampling, error, `maxStops`, thrown/non-finite handling, and receipt |
| explicit CSS `linear()` stop validation/construction | `/css` | `MOVE/FOLD`; no adaptive provenance brand |
| CSS scroll/timeline grammar | `/css` | `MOVE`, then `PRUNE` |
| SVG path scanner/normalizer | `/path` | `MOVE`, consumers migrate, then `PRUNE` |
| `morph-svg.ts`, `morph-geometry.ts` | explicit Keyframes engine consuming `/path` | `KEEP` heavy behavior |
| `motion-path.ts` raw `OffsetPath=string` | `/css` typed motion path | `FOLD`, then `PRUNE` raw-string contract |
| offset distance/rotate validation | `/css` | `MOVE/FOLD` |
| numerical `invertCssMatrix*` | none | `PRUNE`; no consumer evidence |
| duplicate `PathGeometry.getTotalLength()` | none | `PRUNE`; `totalLength` property is canonical |
| DrawSVG browser geometry | Keyframes | `KEEP` |
| DOM computed-style resolution | Keyframes | `KEEP` |
| timeline progress and WAAPI/rAF | Keyframes | `KEEP` |
| generic parser runtime | parse-that | `KEEP`; no API widening required |

The 49 import sites migrate by semantic family, not through a barrel compatibility layer. Test and bench sites consume the same public packed subpaths as production. Demo sites do not receive a raw-source exception.

## 6. Import-weight and package gates

Measured current source weights:

- Value `/transform`: approximately 14,201 bytes and nominally self-contained, while the carried path parser/geometry source is approximately 21,726 bytes;
- Value `/css` closure: approximately 56,545 bytes;
- built parse-that baseline closure: approximately 44,179 bytes.

Those measurements rule out contaminating `/transform` with parse-that-backed CSS/path grammar. They do not by themselves freeze every public name.

Born-RED graph cells:

1. native-ESM `@mkbabb/value.js/transform` import resolves/evaluates no parse-that, `/css`, `/color`, or `/path`;
2. `new PathGeometry("M0 0")` fails type-checking;
3. invalid path/transform/CSS source returns `Result`, never a thrown syntax error;
4. clean packed `/css`, `/path`, and `/transform` resolve only declared package artifacts;
5. Keyframes eager `.` is statically free of `/css`, `/path`, `/transform`, parse-that, `/color`, and the heavy engine; only a separately proved `/math` edge is admissible;
6. named timing resolution remains on `/easing`; `resolveEasing()` loads no
   `/css`, `/path`, or `/transform`;
7. `loadAnimationEngine()` and explicit `/engine` may load `/css`, `/path`, and `/transform`;
8. no unproved within-engine path micro-chunk gate is imposed; eager root and
   named timing remain the protected light tiers;
9. a packed-graph failure causes an internal split or a narrower public motion entry, never a compatibility path;
10. every migrated Keyframes test and bench imports the packed public entry, not Value source.
11. Keyframes W2 proves exact adoption plus deletion of local grammar,
    scanner, and serializer carry; W3 supplies the immutable tarball SHA and
    tier/evaluation receipt; the constellation row remains open through the
    W10 Atlas MorphSVG crater.

Additional signature falsifiers:

12. explicit CSS stops pass standards-derived arity/position/fix-up vectors;
    Value carries no adaptive-sampling provenance, while Keyframes proves
    callable sampler error/`maxStops`/throw/non-finite receipts;
13. public issue discriminants, `cause`, and `actual` fields are intentionally
    stable or intentionally private; an internal parser diagnostic shape does
    not leak into a frozen Value API by accident;
14. `playState` survives any animation-options projection;
15. nested-path inverses remain failure-explicit and never fall through to a
    scanner or string constructor.
16. transform/motion types cover full Webref/WPT axis forms and unresolved
    `var()`/`calc()` values before their shapes freeze.
17. empty, move-only, multi-subpath-move, finite-work/tolerance, and
    non-finite-sampling geometry cells pass; the string constructor is
    compile-RED and no duplicate length accessor survives.

## 7. Wave binding

| Unit | Value wave | Completion |
|---|---|---|
| lossless CSS grammar/spans/recovery | V.L1 | parser-owner invariants and recovery cells green |
| canonical CSS inverses | V.L2 | explicit refusal and round-trip cells green |
| explicit CSS `linear()` stops | V.L3 | standards-derived validation green; callable sampling stays Keyframes |
| CSS transform and motion grammar | V.L4 | packed `/css` graph and inverse gates green |
| SVG path and geometry split | V.L5 | `/path` cohesive; `/transform` light and string-free |
| Keyframes migration | V.L6 | W2 adoption/deletion and W3 immutable pack/tier receipts; W10 Atlas receiver remains open |
| clean audits | V.Q1/V.Q2 | no copied emitters, scanners, aliases, or heavy eager edges |

Execution order is dependency-driven rather than numeric: V.L3 depends on
V.L1–L2 because its canonical inverse uses the inverse contract, and V.L5
executes before V.L4 because CSS `path()` must consume typed `/path` data rather
than introduce a temporary raw-string representation.

## 8. Freeze condition

Architecture placement and the narrow operation set in section 3 are frozen.
Record shapes and the still-unnamed operation families freeze only after:

- the graph cells above pass against clean packed artifacts;
- every suggested convenience function is tested against the no-string-overload/no-dual-path rule;
- Keyframes W2 confirms a terminal classification for all 53 references across
  all 51 files—49 direct imports plus both `import.meta.resolve` probes and
  both bench HTML import-map keys—without an unclassified consumer;
- Keyframes W3 supplies the exact immutable tarball SHA and tier/evaluation
  proof; no “can migrate” assertion closes the Value receipt;
- the cross-repo engine/MorphSVG edge stays open through the W10 Atlas crater.

The P2 Luna candidate is terminal **AMEND**, not accepted verbatim. XR-16
settles geometry totality, empty/move-only semantics, adaptive-provenance
pruning, shorthand/longhand separation, timing-tier ownership, and numerical
inversion pruning. It deliberately leaves record shapes, standards-derived
grammar unions, issue stability, and indentation/final-newline spelling to
their fail-capable execution cells. This file is a formation contract, not a
release claim.

The historical Keyframes baseline is the annotated-but-cryptographically-
unsigned `v6.0.0` tag object
`26190755ce1e57c54cb14ef0a454ae02ed2b3da0`, commit
`5a9183a7afe24702081a7b87c8adc7286ddce9a0`. It is not a signed or packed W3
receipt.
