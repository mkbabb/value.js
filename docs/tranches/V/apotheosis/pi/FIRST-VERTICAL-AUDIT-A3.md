# V·π repaired first vertical — independent adversarial audit A3

status: `REJECT`

date: 2026-07-22

model_served: inherited Codex route; the service-side backend alias and effort
label were not exposed to this seat, so this receipt claims neither Opus nor
Fable

This is a fresh post-repair, assume-faulty pass over the frozen first vertical.
I re-ran every A2 witness against the current source/token/CST, value, color,
wrapper, serializer, and test bytes. I changed no implementation, tests,
production, authority, coordination, inbox, or script file. This report is my
only write.

Audited SHA-256s:

- `syntax/atom.ts` — `3cb1b3feef0a24c9b97a12ccdd4b0b7204b906ac1f1e2017613d85742cf5e4e0`
- `syntax/component-value.ts` — `07cd147af7f07fe0833410cde0d98b6706decdc9985773085b5b03a8e13bec6a`
- `syntax/source.ts` — `0c0d11442d1c837a11a82a6304d01abacc75b50232d6f3c82f8b773333c0ad81`
- `syntax/tokens.ts` — `3d8fc54b62667aa10aedddfbb53540d0a4467d2a6c8543a78c0a9027b059a816`
- `syntax/types.ts` — `7af6ba8d26603df4cf97327d59b2bf161ef0149eab8f27e5790f99d68eb7fb20`
- `values/project.ts` — `37f5e42844c43737db3f115fcfc5c241259a925697c95c99b4a983ecc5670ac0`
- `color/project.ts` — `ded07e88556c96627c253990ef780f20be19f0dfa1eae60ad209ec0a1ba2832e`
- `grammar/value.ts` — `f512407ca44c8e59eb17c95fdd5d297b89f7fb2a3aced8fa3ef3b12b453902f4`
- `grammar/color.ts` — `22e89a9810bf5125022656473fc9e9369b9826f5e0fe025fafdb895961542c62`
- `css-syntax-foundation.test.ts` — `e5380fc93690c3ca43fb77815f0cd6e72557f7f16f9c33a220819b93dc08ddcf`
- `first-vertical-architecture.test.ts` — `66381b0971989a4bed3846c55f98d8629e947e664cf5a6b617196897e9e65b8e`
- `w1-values.test.ts` — `9a8912e2be7d8d64ea398c1fb147c1ca45aebd7fa1a860f1cb80fca8c83a915f`
- `w2-color.test.ts` — `27c7e1aeb557a9d83167cfc27fdd291b01e39ca656421c7d6458e563e45137e2`

## Verdict

**REJECT.** The repair closes most A2 implementation defects. Numeric token
boundaries and lexical type flags are correct; escaped and EOF URL/string
states are represented; DEL URLs and unterminated comments reject; escaped
hex, no-space alpha, and adjacent channel tokens parse; value/color diagnostics
now use the furthest parser offset; and hostile depth is bounded without a
throw. The architecture remains the right one: one legitimate lexical owner,
a typed CST, and pure family projections, with no feature scanner or raw-source
splitter.

Acceptance is still blocked by five exact defects:

1. direct/raw grammar equivalence holds only for the new happy-path fixtures,
   not for NUL/surrogate input inside raw-preserving strings, URLs, hashes, and
   blocks;
2. a quoted string ending in a bare backslash at EOF is not tokenized as an
   unterminated string and the public value door wrongly accepts it;
3. the W1 scalar wrapper rejects escaped hex colors that the repaired color,
   value, and values doors accept, and it still discards furthest offsets;
4. the CST remains strict rather than CSS Syntax recovery-capable, and direct
   projected diagnostics still compute `actual` from the wrong source slice;
5. the frozen public color carrier cannot truthfully represent D50 missingness
   or unbounded `color(srgb ...)` coordinates. Current code silently loses both.

These are model-level correctness defects, not formatting nits. The first
vertical cannot be ACCEPTED or benchmark-qualified on these bytes.

## 1. Total-tranche / gestalt analysis

The common architecture is now materially sound:

```text
CSS code points -> token owner -> typed component CST -> family projection
```

The two imperative loops are justified: source code-point normalization and
the CSS-defined URL-token state machine. Neither is a feature scanner. Value
and color semantics traverse typed component nodes and do not split or match
whole raw feature strings. The first vertical is therefore salvageable and
should remain the shared basis after correction.

Two boundary decisions remain unresolved before this architecture can fan out.
First, `cssComponentDocumentGrammar` is strict-balanced, while CSS Syntax's
component algorithms preserve unmatched closing tokens inside a function and
auto-close functions/blocks at EOF while recording parse errors. A strict
public property door may reject recovered syntax, but the claimed lossless
shared CST must be able to represent it. `fn(a])` and `fn(a` currently fail at
the CST boundary, so recovery and feature validation are still conflated.

Second, the Phase-A `CssColor` union is demonstrably too small for two Color 4
families. D50 missingness needs D50 provenance plus `none`; extended
`color(srgb ...)` needs unbounded sRGB coordinates distinguishable from the
parsed-value-clamped `rgb()` notation. Neither can be fixed by another parser
branch over the current carrier. They need the already-routed PB carrier work,
with an exact Phase-A compatibility result until that carrier exists.

## 2. Wave and mechanical evidence

The mechanical suite is green:

```text
npm test -- --run
13 files passed; 80 tests passed; 2 TODO

npm run check
GREEN
```

Fresh hostile probes are also green:

- deterministic 20,000-input sweep through both component grammars, both
  typed grammars, and both public doors: zero throws;
- depths 128, 129, 1,000, and 10,000: no throws;
- depth 128 succeeds; every larger depth rejects with furthest offset 256;
- public value mismatch diagnostics now point at `]` for `fn(a]` and at `}`
  for `fn([a,b})`, rather than at offset zero.

The cap is therefore effective. The limit result is still reported only as
`expected:["scalar"]` at the next function head, not as an explicit maximum-
depth condition, but this is secondary to the blockers below.

## 3. Replayed A2 witnesses

### 3.1 Closed witnesses — ACCEPT

The following exact A2 defects are closed on the frozen hashes:

- `1.` tokenizes as number `1` plus `.` delimiter;
- `1.0`, `1e0`, `1e+3`, `1e+3%`, and `1e2px` remain single numeric tokens
  and carry lexical `numberType:"number"`;
- `url(foo` is a URL token with `terminated:false`, while `u\\72l(foo)` is a
  decoded URL token and U+007F produces `bad-url`;
- EOF strings have `kind:"string"` and `terminated:false`; ordinary escapes
  and escaped newlines have decoded token values;
- public `foo/*` rejects at `3..5`, expected `terminated comment`;
- raw CRLF/form-feed/bare NUL/standalone surrogate and `r\\65\r\nd` agree
  between the exported grammar and public door in the tested scalar cases;
- `rgb(1 2 3/.5)` and `rgb(1 2 3/50%)` accept;
- channel-token adjacency accepts `rgb(1-2-3)`, `rgb(1+2+3)`,
  `hsl(0-10-20)`, and `lab(50%0 0)`; Chromium 148.0.7778.96 independently
  accepts the same rows;
- decoded `#\\31 23` and `#\\66 00` parse as `#123` and `#f00` through the
  color and value doors;
- modern/legacy separation, direct-RGB/alpha clamping, hue normalization,
  authorized lightness/chroma transforms, and token-position `from` handling
  remain green.

This is substantial repair credit. It does not erase the narrower counter-
examples below.

### 3.2 Raw/preprocessed equivalence — REJECT

The new direct-grammar tests cover NUL as a top-level delimiter, but public
values also preserve raw spelling for strings, URL keywords, non-color hashes,
and simple blocks. Those paths still expose the unpreprocessed input:

```text
source          cssValueGrammar                    parseCssValue
"a\0b"          keyword containing U+0000          keyword containing U+FFFD
"a<U+D800>b"   keyword containing surrogate       keyword containing U+FFFD
url(a\0b)       reject bad-url                     accept url(a<U+FFFD>b)
url(a<U+D800>b) keyword containing surrogate       keyword containing U+FFFD
[a\0b]          block keyword containing U+0000    block keyword containing U+FFFD
#a\0b            keyword containing U+0000          keyword containing U+FFFD
```

The raw CST often has a correctly normalized decoded `value`, but projection
uses `raw` for these public arms. The composable parser and public door thus
still implement different CSS preprocessing semantics. The repair must occur
once at the source/token/projection boundary, not as per-family exceptions.

### 3.3 EOF token states — REJECT

The ordinary EOF-string case is fixed, but the backslash-at-EOF substate is
not:

```text
source: "foo\

current CST:
  delim '"', ident 'foo', delim '\\'

current parseCssValue:
  ACCEPT space-list ['"', 'foo', '\\']
```

CSS's consume-string-token algorithm treats backslash followed by EOF as part
of the still-open string, then returns the string token at EOF with a parse
error. The mirror must produce one `string`, `terminated:false` token and the
public conformance failure. The current `eofStringToken` regex requires a code
point after every backslash, allowing the generic delimiter fallback to steal
the input.

### 3.4 Escaped hash and W1 replay — REJECT

`hexColor()` correctly uses decoded `token.value`, but `isScalarComponent()`
still validates `token.raw`:

```text
source       parseCssColor  parseCssValue  parseCssValues  parseCssScalar
#\\31 23     ACCEPT #123    ACCEPT          ACCEPT          REJECT
#\\66 00     ACCEPT #f00    ACCEPT          ACCEPT          REJECT
```

This is not merely an omitted test; it breaks the required W2-to-W1 typed seam.
The scalar gate must use the same decoded hash predicate as color projection.

### 3.5 Diagnostics — partial ACCEPT, direct/scalar REJECT

Furthest offset is now preserved by `parseCssValue()` and `parseCssColor()`:

```text
fn(a]       -> 4..5, actual "]"
fn([a,b})   -> 7..8, actual "}"
fn(a        -> 4..4, actual null
depth 129   -> 256..257, actual "f"
```

`parseCssScalar()` does not use the same path. `red]`, `1]`, and
`rgb(1 2 3]` still return whole-input `0..length` failures while the value and
color doors identify the closer.

The exported value grammar also constructs nested failures from token-local
source with document-absolute spans. Exact divergence:

```text
source              cssValueGrammar actual    parseCssValue actual
fn(1e309)           "09"                      "1e309"
outer(fn(1e309))    null                      "1e309"
```

A composable grammar cannot expose corrupted diagnostic slices. Projection
must carry the full source/envelope or defer `actual` construction to the
wrapper that owns it.

## 4. Color carrier analysis — REJECT / structural deferral required

### 4.1 D50 missing components

The current code still replaces D50 `none` channels with zero and applies the
D50-to-D65 matrix:

```text
color(xyz-d50 none 1 1)
  -> { space:"xyz",
       channels:[0.04016078825180605,
                 1.0310368392732214,
                 1.309858276943225] }
```

That is a resolved conversion, not a lossless parsed value. It erases which
input coordinate was missing. `ADDENDA-04` R23 explicitly requires the exact
Phase-A `expected:["concrete xyz-d50"]` compatibility rejection until PB5 can
return a D50-tagged carrier. The current success and W2 assertion contradict
that disposition and remain blocking.

### 4.2 Extended `color(srgb ...)`

A second carrier contradiction is now executable:

```text
C0 = parseCssColor("color(srgb 2 -1 .5)")
   = rgb [510, -255, 127.5]

s0 = serializeCssColor(C0)
   = "rgb(510 -255 127.5)"

C1 = parseCssColor(s0)
   = rgb [255, 0, 127.5]
```

Color 4 requires `color()` coordinates to remain unbounded; direct `rgb()`
coordinates are clamped at parsed-value time. Lowering both into one
`space:"rgb"` carrier loses which semantics apply, and the serializer changes
the value on the first cycle. This contradicts the addendum's unbounded-
`color()` rule and its bounded canonicalization premise for parser-produced
colors.

Missing in-range `color(srgb none .2 .3)` happens to retain its numeric value,
but serializes as `rgb(none 51 76.5)` rather than preserving a distinct
predefined-sRGB expression. That success does not solve extended coordinates.
PB0/PB5 need a truthful `srgb` predefined-color carrier (or equivalent tagged
expression). Because this limitation was not given the exact Phase-A RED
projection that R23/R24 have, it requires a focused E-3 disposition rather
than an ad-hoc cast or clamp.

Authority: [CSS Color 4, modern syntax and predefined
colors](https://www.w3.org/TR/css-color-4/) and [CSS Syntax 3 token/recovery
algorithms](https://www.w3.org/TR/css-syntax-3/).

## 5. Close conditions

1. Make direct/raw and public preprocessing semantics identical for every
   raw-preserving value arm, including nested strings, URLs, hashes, and blocks.
2. Tokenize backslash-at-EOF as one unterminated string and propagate its parse
   error.
3. Reuse decoded hash classification in `parseCssScalar`, and give that door
   the same furthest-offset mapping as value/color.
4. Build direct projected diagnostics from the correct full source and separate
   lossless CSS recovery from strict public feature validation.
5. Restore the exact R23 Phase-A D50-missing rejection.
6. Route extended predefined sRGB through E-3/PB carrier ownership and freeze
   an exact Phase-A compatibility projection before further color claims.
7. Add these witnesses plus the already-required persistent W2/W1 banks, then
   run two fresh independent audits against immutable bytes.

Nothing here authorizes production execution, dependency or public-surface
changes, benchmark claims, Phase-B fan-out, or BBNF uplift adoption.
