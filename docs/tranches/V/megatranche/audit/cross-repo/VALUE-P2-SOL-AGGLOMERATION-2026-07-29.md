# Value P2 CSS/path hostile Sol agglomeration

**Date:** 2026-07-29  
**Mode:** tranche development only  
**Candidate:** Luna xhigh thread
`019faf94-1134-7223-b9b3-c53249f206f5`  
**Isolated evidence:**
`/Users/mkbabb/Documents/Codex/2026-07-29/value-p2-css-path-surface/outputs`  
**Terminal ruling:** **AMEND** — architecture survives; exact candidate surface
does not freeze

## Hard amendments

### 1. Preserve recovery

The candidate's successful `ParseResult` permits only
`diagnostics: []` and rejects recovered ASTs, contradicting V.L1's
transactional recovery obligation. Leaf parsers may remain strict, but a
successful stylesheet parse must be able to carry immutable recovery
diagnostics. Exact parsed-node/source-map span representation remains open.

### 2. Derive transform/motion types from the denominator

The proposed transform union omits axis-specific translate, scale, rotate and
skew functions already present in the local prototype. Its
`CssLengthPercentage` cannot represent unresolved `var()`/`calc()` forms, and
its URL/basic-shape restrictions are unsupported. Freeze operation names, not
these record shapes, until the Webref/WPT denominator is complete.

### 3. Keep sampling in Keyframes

The candidate rejects decreasing authored `linear()` positions and restricts
them to `[0,1]`, while the current consumer applies standards-style fix-up.
Arity, range and fix-up remain open to standards vectors.

Value validates CSS-representable explicit stops. Keyframes owns callable
sampling, measured error, `maxStops`, thrown/nonfinite samples and the sampling
receipt. Arbitrary stops are valid CSS data, not proof of adaptive sampling.
PRUNE Value's adaptive-sampling provenance apparatus.

### 4. Split animation responsibilities

One `serializeAnimationOptions(): {shorthand,longhands}` is not total because
names such as `linear`, `paused`, `reverse` and `infinite` are
shorthand-ambiguous.

Split:

1. inverse of a parsed, grammar-valid shorthand AST;
2. projection of semantic `CSSAnimationOptions` to ordered typed longhand
   declarations.

An explicitly supplied `composition: "replace"` must emit
`animation-composition: replace`; only absent composition may be omitted.
Separate composition is the current runtime-safe route, not permanent
standards law.

### 5. No public raw escape

The candidate's public `{kind: "unknown", raw: string}` is caller-forgeable and
violates the opaque parser-provenance requirement. Keep one byte-preserving
unknown node, but make it parser-produced and non-forgeable. Delete the public
raw constructor and the competing prelude/body/children representation.

### 6. Prune numerical inversion

`invertCssMatrix` and `invertCssMatrix3d` have no observed consumer and confuse
canonical serialization with numerical matrix inversion. PRUNE both. Keep
finite typed `matrix()`/`matrix3d()` construction plus transform-list
serialization; exact factory names remain open.

### 7. Restore the timing-tier boundary

The candidate permits `resolveEasing()` to load `/css`, contradicting XR-07.
The current registry already imports `/css`, making this a live V.L6/Keyframes
defect. Named easing resolution stays on `/easing`; authored CSS timing syntax
belongs at the heavy CSS boundary. Conversely, requiring `/path` to
micro-chunk only when invoked after explicit engine load is unsupported; the
engine tier may load both `/css` and `/path`.

### 8. Strengthen typed geometry

KEEP typed-only, total `new PathGeometry(SvgPathData)` for admitted
parser-produced finite data. Empty data has zero length at the origin; move-only
data samples its move point. Add exact gates for:

- multiple subpath moves contributing zero length without phantom connecting
  segments—the incumbent currently creates them;
- finite work bounds and tolerance;
- explicit NaN/±Infinity sampling behavior;
- settled parsed-command/span projection;
- compile-RED `new PathGeometry(string)`.

## Terminal surface matrix

| surface | disposition |
|---|---|
| `/css`, `/path`, numeric-only `/transform` placement | KEEP / FROZEN |
| existing parse/collect/timeline operation names | KEEP; amend Result for recovery |
| `serializeCssValue`, `serializeTimingFunction`, `serializeKeyframeSelector`, `serializeDeclaration`, `serializeStylesheetItem`, `serializeStylesheet` | FOLD/MOVE then KEEP; names may freeze |
| failure-explicit path-bearing serializer result | KEEP; exact codes open |
| `serializeAnimationOptions` hybrid | SPLIT / REJECT |
| parsed shorthand inverse + semantic longhand projection | ADD; names open |
| explicit CSS stop construction/validation | KEEP; name and standards rules open |
| Value callable/adaptive sampler or provenance brand | PRUNE |
| transform-list and offset-property parse/serialize operations | KEEP; shapes open |
| typed finite matrix construction | KEEP; names open |
| numerical `invertCssMatrix*` | PRUNE |
| opaque parser-provenanced unknown item | KEEP / FOLD |
| public forgeable raw unknown item | PRUNE |
| `SvgPathData`, parse/inverse and `PathGeometry` | KEEP / MOVE to `/path`; names may freeze |
| string geometry constructor/factory and parse-each-call helpers | PRUNE |
| `PathGeometry.totalLength` plus duplicate `getTotalLength()` | KEEP property; PRUNE duplicate method |
| numeric `/transform` placement/purity | KEEP; exact Goldilocks export set open |
| Keyframes local serializers/scanner/raw motion writes | MOVE/FOLD then PRUNE in V.L6 |

## Minimal wave delta

1. `V.L1`: recovery-capable Result and parsed-span contracts.
2. `V.L2`: split animation shorthand from semantic longhand projection; brand
   unknown nodes; freeze punctuation boundary and direct inverse names.
3. `V.L3`: remove adaptive provenance; standards-test CSS stop validation;
   Keyframes owns sampling.
4. `V.L5` before `V.L4`: bind typed path and geometry semantics, prune duplicate
   string/length helpers, then seal the numeric export census.
5. `V.L4`: denominator-derived transform/motion types; no numerical inversion.
6. `V.L6`: CSS-free timing tier, same-wave Keyframes deletion and packed
   consumer/Atlas proof.

