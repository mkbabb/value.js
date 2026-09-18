# V·π repaired first vertical — independent adversarial audit A4

status: `REJECT`

date: 2026-07-22

model_served: inherited Codex route; the service-side backend alias and effort
label were not exposed to this seat, so this receipt claims neither Opus nor
Fable

This is a focused post-A3 verification of the repaired first-vertical bytes. I
replayed every executable A3 witness, the full local rails, a deterministic
hostile sweep, and the component-depth boundary. I also re-judged the two
unrepaired color-carrier cases and the strict-CST recovery boundary. I changed
no implementation, test, production, authority, coordination, inbox, or
script file. This report is my only write.

Audited SHA-256s:

- `syntax/atom.ts` — `45bba904ce5614426e285a18ae74e2a1fcc687e91421b66b60f4a21efc797165`
- `syntax/component-value.ts` — `07cd147af7f07fe0833410cde0d98b6706decdc9985773085b5b03a8e13bec6a`
- `syntax/source.ts` — `0c0d11442d1c837a11a82a6304d01abacc75b50232d6f3c82f8b773333c0ad81`
- `syntax/tokens.ts` — `f2c4f0ce0bdc5a4437c7cfd6cb981af7e12ac37c720e48945c3bf99a2ce330bc`
- `syntax/types.ts` — `7af6ba8d26603df4cf97327d59b2bf161ef0149eab8f27e5790f99d68eb7fb20`
- `values/project.ts` — `ff33997ace5993be88083f2d5830e661291838bc8efe4f00cc23aa44fa6f6b98`
- `color/project.ts` — `35f05fe510e4bd23f4aec7d22a3d1f7a19d37e7f30812768624c22bd445f74e7`
- `grammar/value.ts` — `36e7d92aae4e71b8682847584eabfd0b89f9dd952f52c5c1c62108c5a0c3480f`
- `grammar/color.ts` — `22e89a9810bf5125022656473fc9e9369b9826f5e0fe025fafdb895961542c62`
- `css-syntax-foundation.test.ts` — `6687fb7f790000db7072f7bdff59a7a83ddb5ac3d1804c18d103d19da61528a5`
- `first-vertical-architecture.test.ts` — `14350fb17840c4e182fc1970e53c2b4c3d114fbe48797a45feb1fd2ac7f40bc8`
- `w1-values.test.ts` — `d263d9523f5cb7272d85fd8e8e7df02422342a51acedbe480636bb949e4e47ae`
- `w2-color.test.ts` — `27c7e1aeb557a9d83167cfc27fdd291b01e39ca656421c7d6458e563e45137e2`

## Verdict

**REJECT overall; ACCEPT the post-A3 executable repair slice.** All six
implementation witnesses named by A3 are now closed on these hashes:

1. nested NUL and standalone-surrogate values agree between the composable
   grammar and the preprocessed public door across strings, URLs, blocks,
   hashes, identifiers, and nested calls;
2. a quoted string ending in a bare backslash at EOF is one unterminated
   string token and the public value door rejects it;
3. escaped hex `#\\31 23` succeeds through scalar, value, values, and color;
4. scalar/value suffix diagnostics use the furthest offset;
5. nested non-finite diagnostics retain the exact absolute `actual:"1e309"`
   slice in both direct and public paths;
6. raw URL code points now normalize NUL and unpaired surrogates without
   corrupting valid surrogate pairs.

The vertical still cannot be accepted because the two carrier contradictions
and the CST recovery/model boundary were not repaired. D50 missingness is
silently zero-filled and erased. Unbounded predefined-sRGB coordinates are
lowered into the clamping `rgb` carrier and change on serialize/reparse. The
shared CST remains a strict balanced-delimiter tree rather than the claimed
lossless CSS Syntax component model. These are architectural correctness
failures, not residual faults in the A3 executable repairs.

## 1. Total-tranche / gestalt analysis

The repaired pipeline is still the correct foundation:

```text
CSS code points -> one CSS token owner -> typed component CST -> pure family projection
```

The token owner is legitimate generalized CSS lexical state, not a return to
feature-specific scanning. The URL-token state machine and code-point
normalization are specification algorithms; value and color projections walk
typed component nodes and do not rescan whole feature strings. No finding in
this pass supports reintroducing regex feature parsers or per-door scanners.

The repair also demonstrates that composable parse-that grammars and public
EOF-enforcing doors can share one semantic dialect. Direct/public equivalence
now holds on the hostile preprocessing witnesses, and direct diagnostics no
longer fabricate source slices.

The remaining defects sit below family grammar quality. The current CST cannot
truthfully be called lossless for CSS component values because it has no
recovery representation. The current `CssColor` union cannot truthfully carry
all accepted Color 4 parsed values because it lacks D50/missing provenance and
a distinct unbounded predefined-sRGB form. Neither defect should be hidden by
parser special cases, clamping, or serializer heuristics.

## 2. Wave and mechanical evidence

Fresh full rails:

```text
npm test -- --run
13 files passed; 81 tests passed; 2 TODO

npm run check
GREEN
```

Fresh adversarial no-throw evidence:

- deterministic seed `0x9e3779b9`;
- 20,000 generated hostile strings containing structural punctuation,
  escapes, whitespace, NUL, isolated surrogates, and valid astral pairs;
- eight paths per string: component CST, direct value/color grammars, and the
  five public scalar/value/values/keyframe/color doors;
- 160,000 calls, zero throws;
- depths 128, 129, 1,000, and 10,000 all complete without throwing;
- depth 128 accepts; 129, 1,000, and 10,000 reject at furthest offset 256.

The no-throw and depth rails are therefore GREEN. The generic public diagnostic
at the depth cap remains less specific than ideal, but it is not an A4 blocker.

## 3. Replayed A3 executable witnesses — ACCEPT

### 3.1 Direct/public preprocessing equivalence

The following exact rows now produce byte-for-byte-equivalent projected
results through `cssValueGrammar` and `parseCssValue`:

```text
"a\0b"            -> keyword "a<U+FFFD>b"
"a<U+D800>b"     -> keyword "a<U+FFFD>b"
url(a\0b)         -> keyword url(a<U+FFFD>b)
url(a<U+D800>b)  -> keyword url(a<U+FFFD>b)
[a\0b]            -> keyword [a<U+FFFD>b]
fn([a<U+D800>b]) -> nested keyword [a<U+FFFD>b]
#a\0b              -> keyword #a<U+FFFD>b
foo\0bar           -> keyword foo<U+FFFD>bar
```

Every direct grammar consumed the complete input. This closes A3 §3.2 for
the requested raw-preserving and nested witnesses.

### 3.2 Bare-backslash EOF string

For source `"foo\\` the CST now contains exactly one token:

```text
{ kind:"string", raw:"\"foo\\", value:"foo<U+FFFD>", terminated:false,
  span:{start:0,end:5} }
```

`parseCssValue` rejects `0..5` with `expected:["scalar"]`. Generic delimiter
fallback no longer steals the input. This closes A3 §3.3.

### 3.3 Escaped hash across all W1/W2 doors

`#\\31 23` succeeds through all required seams:

```text
parseCssScalar -> rgb [17,34,51]
parseCssValue  -> rgb [17,34,51]
parseCssValues -> one-item rgb list [17,34,51]
parseCssColor  -> rgb [17,34,51]
```

Scalar classification now uses decoded hash identity. This closes A3 §3.4.

### 3.4 Furthest offsets and nested direct `actual`

Scalar and value doors agree on the unexpected closer:

```text
red]          -> 3..4, actual "]"
1]            -> 1..2, actual "]"
rgb(1 2 3]    -> 9..10, actual "]"
```

Direct `cssValueGrammar` and `parseCssValue` also agree exactly on the nested
non-finite failures:

```text
fn(1e309)           -> 3..8, expected:[], actual:"1e309"
outer(fn(1e309))    -> 9..14, expected:[], actual:"1e309"
a, 1e309            -> 3..8, expected:[], actual:"1e309"
```

This closes both scalar furthest-offset loss and the direct projected-source
corruption from A3 §3.5.

## 4. Unrepaired carrier contradictions — REJECT

### 4.1 D50 missingness is still erased

The exact witness remains:

```text
parseCssColor("color(xyz-d50 none 1 1)")
  -> { space:"xyz",
       channels:[0.04016078825180605,
                 1.0310368392732214,
                 1.309858276943225],
       alpha:1 }

serialize
  -> "color(xyz 0.040160788252 1.031036839273 1.309858276943)"
```

The first coordinate's `none` is replaced with zero before chromatic
adaptation, and both missingness and D50 provenance disappear. The numerical
round trip is close only because it round-trips the already-resolved D65
result; it does not preserve the parsed Color 4 value.

`ADDENDA-04` R23 already defines the Phase-A compatibility disposition:
missing `xyz-d50` must reject with `expected:["concrete xyz-d50"]` until the PB
carrier can retain it. The current success and the current W2 assertion remain
contrary to that authority. Restore the exact RED projection; do not zero-fill
or invent a partial adaptation rule.

### 4.2 Extended predefined sRGB changes after one cycle

The second exact witness also remains:

```text
C0 = parseCssColor("color(srgb 2 -1 .5)")
   = { space:"rgb", channels:[510,-255,127.5], alpha:1 }

s0 = serializeCssColor(C0)
   = "rgb(510 -255 127.5)"

C1 = parseCssColor(s0)
   = { space:"rgb", channels:[255,0,127.5], alpha:1 }
```

Predefined `color(srgb ...)` coordinates are unbounded, while direct `rgb()`
coordinates clamp at parsed-value time. Lowering both syntaxes into the same
`space:"rgb"` carrier destroys the distinction and causes an observable
first-cycle value change. A tagged predefined-sRGB carrier, or an equivalent
lossless expression carrier, is required. Until its E-3/PB owner lands, an
exact Phase-A compatibility projection must be authorized and frozen; success
through the lossy carrier is not acceptable.

Authority: [CSS Color 4](https://www.w3.org/TR/css-color-4/).

## 5. Strict CST versus CSS recovery — REJECT

`syntax/component-value.ts` is unchanged from A3 and still requires every
function/block to consume its matching close token. Fresh probes confirm:

```text
source   CST result   furthest
fn(a]    REJECT       4
fn(a     REJECT       4
[a)      REJECT       2
[a       REJECT       2
```

CSS Syntax's component algorithms preserve unmatched closing tokens as
ordinary component tokens when they do not close the current block and
auto-close an open function/block at EOF while recording a parse error. A
strict public property door may still reject such recovered syntax. The shared
CST, however, must first represent the recovered token/tree plus error state if
it is to serve as the lossless common foundation promised by the tranche.

This is not a request to make malformed property values succeed. It is a
separation-of-layers requirement:

```text
recovering CSS CST + syntax issues -> strict family validation -> public result
```

Keeping mandatory close parsers at the CST layer conflates recovery with
feature validity and will force later stylesheet/at-rule work either to lose
source or to fork the syntax foundation. That is a vertical-level blocker.

Authority: [CSS Syntax 3](https://www.w3.org/TR/css-syntax-3/).

## 6. Close conditions

1. Credit the post-A3 executable repair slice as closed; do not churn those
   implementations absent a new counterexample.
2. Reinstate the exact R23 Phase-A rejection for missing `xyz-d50` until a
   truthful D50/missing carrier exists.
3. Give extended predefined sRGB an E-3-owned lossless carrier or an explicit
   exact Phase-A compatibility rejection; prohibit the demonstrated lossy
   success path.
4. Add a recovering component-CST representation with syntax issues, while
   retaining strict family/public validation above it.
5. Persist the A4 carrier and recovery witnesses, then run two fresh independent
   audits against immutable bytes.

Nothing here authorizes production execution, dependency or public-surface
changes, benchmark qualification, Phase-B fan-out, or BBNF uplift adoption.
