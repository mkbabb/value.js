# V·π first-vertical independent verification B3

**Date:** 2026-07-22  
**Seat:** focused independent B3 over the post-repair artifact. I did not use
another implementation-audit verdict as evidence. The Codex task envelope did
not expose a trustworthy `model_served` receipt, so none is inferred.  
**Verdict:** **REJECT — only the two color-carrier blockers remain in the B3
scope**

B3 re-ran the repaired lexical, CST, direct-composition, diagnostic, hostile,
and mechanical rails rather than accepting their status by report. Every
focused repair named in the assignment is reproducibly green. The vertical
still cannot be accepted because valid CSS Color 4 inputs are successfully
lowered into a carrier that irreversibly loses D50 missingness or extended
`srgb` range semantics.

## Artifact identity

This verdict is bound to the following SHA-256 inputs:

| artifact | SHA-256 |
|---|---|
| `syntax/atom.ts` | `45bba904ce5614426e285a18ae74e2a1fcc687e91421b66b60f4a21efc797165` |
| `syntax/component-value.ts` | `07cd147af7f07fe0833410cde0d98b6706decdc9985773085b5b03a8e13bec6a` |
| `syntax/source.ts` | `0c0d11442d1c837a11a82a6304d01abacc75b50232d6f3c82f8b773333c0ad81` |
| `syntax/tokens.ts` | `f2c4f0ce0bdc5a4437c7cfd6cb981af7e12ac37c720e48945c3bf99a2ce330bc` |
| `syntax/types.ts` | `7af6ba8d26603df4cf97327d59b2bf161ef0149eab8f27e5790f99d68eb7fb20` |
| `values/project.ts` | `ff33997ace5993be88083f2d5830e661291838bc8efe4f00cc23aa44fa6f6b98` |
| `color/project.ts` | `35f05fe510e4bd23f4aec7d22a3d1f7a19d37e7f30812768624c22bd445f74e7` |
| `grammar/value.ts` | `36e7d92aae4e71b8682847584eabfd0b89f9dd952f52c5c1c62108c5a0c3480f` |
| `grammar/color.ts` | `22e89a9810bf5125022656473fc9e9369b9826f5e0fe025fafdb895961542c62` |
| `serialize.ts` | `a3f29fe8dedfb8b249ad94eb2226489a86200bacc515b812df4aa807af30c4e8` |
| `index.ts` | `65f3d934624e899a7242505985742c3fc6f0ac712dd4b32db9955ff74681ce89` |
| `css-syntax-foundation.test.ts` | `6687fb7f790000db7072f7bdff59a7a83ddb5ac3d1804c18d103d19da61528a5` |
| `first-vertical-architecture.test.ts` | `14350fb17840c4e182fc1970e53c2b4c3d114fbe48797a45feb1fd2ac7f40bc8` |
| `w1-values.test.ts` | `d263d9523f5cb7272d85fd8e8e7df02422342a51acedbe480636bb949e4e47ae` |
| `w2-color.test.ts` | `27c7e1aeb557a9d83167cfc27fdd291b01e39ca656421c7d6458e563e45137e2` |

## 1. Total-tranche / gestalt analysis

The current vertical is a credible generalized parse-that foundation. One CSS
Syntax layer owns lexical atoms, tokens, functions, blocks, trivia, spans, and
bounded component-value composition. Value and color semantics consume that
typed tree. I found no whole-remainder adapter, feature-local balanced scanner,
or raw-source feature recognizer in the current path. The URL implementation is
the CSS-specified lexical token state machine; the CST-array `split()` helper
does not scan source.

The post-repair work also closes the previously suspicious raw/direct dialect
seam for the cases B3 was asked to challenge. Raw composable grammars and
preprocessed public doors now produce equal public values for nested NUL in
idents, URLs, blocks, and hashes while preserving caller-owned offsets. This is
not evidence for a second parser; it is evidence that the shared tokens and
semantic projection implement one CSS dialect at both entry shapes.

The remaining architectural defect is deliberately narrower: `CssColor`
currently serves as both a specified-expression carrier and a resolved legacy
color value, although those domains are not isomorphic. `xyz-d50` missingness
and predefined `srgb` range provenance cannot fit truthfully in the current
union. PB0 must settle that ownership before more Color 4/5 grammar is layered
on top.

**Gestalt result: grammar architecture GREEN; specified-color carrier RED.**

## 2. Wave analysis

### Full mechanical rails

```text
npm test -- --run
  13 test files passed
  81 tests passed, 2 intentional TODO (83 total)
npm run check
  GREEN
d.ts parity
  52 contracts resolved
```

The hostile nesting replay was also green: CST, direct value grammar, public
value, and public color returned without throwing at depths 128, 129, 1,000,
and 10,000. CST/value accept exactly through the configured depth 128 and
reject 129+; the 10,000-frame cases rejected in under one millisecond in this
run. Color rejected the non-color source throughout.

### Focused B3 matrix

| concern | independent result |
|---|---|
| direct/public dialect, NUL | `a\0b`, `fn(a\0b)`, `url(a\0b)`, `[a\0b]`, and `#a\0b` produced equal direct/public values with U+FFFD and full raw offsets |
| EOF bare-backslash string | `"foo\` tokenized as `string`, value `foo�`, `terminated:false`, span `0..5`; scalar/value doors rejected with `actual` equal to the full source |
| escaped scalar hash | `#\31 23` tokenized as hash value `123`, `id:true`; direct, scalar, value, and color doors all returned RGB `[17,34,51]` |
| structural spans | scalar/value/color reported `1]` at `1..2`, `fn(a` at `4..4`, `fn([a)` at `5..6`, `red]` at `3..4`, and `rgb(1 2 3]` at `9..10` |
| semantic color span | leading-trivia `  nope` reported color failure at `2..6`, `actual:"nope"` |
| direct nested `actual` | `fn(1e309)` reported `1e309` at `3..8`; `fn(fn(1e309))` at `6..11`; `a, 1e309` at `3..8`; nested invalid RGB reported `rgb(1 2 x)` at `3..13`; direct and public results were identical |
| adjacent channels | `rgb(1-2-3)`, `rgb(1+2+3)`, `hsl(0-10-20)`, and `lab(50%0 0)` tokenized into the required adjacent numeric components and parsed successfully |
| alpha solidus | `rgb(1 2 3/.5)`, `hsl(120 50% 50%/50%)`, and `color(display-p3 1 0 0/50%)` parsed successfully without requiring trivia around `/` |
| escaped URL and EOF URL | `u\72l(foo)` is one terminated URL token; `url(foo` is one unterminated URL token, and the strict value door rejects the latter with its full span |

Astral strings, escaped token values, lexical `numberType`, comments, delimiter
composition, and no-throw public-door guards also remained green in the full
suite. No focused B3 regression remains open.

### Remaining blocker B3-C1 — D50 missingness is erased

The current projector still replaces every `none` channel with numeric zero
before D50→D65 adaptation. Independent results include:

```text
color(xyz-d50 none 0 0)      -> xyz [0,0,0]
color(xyz-d50 0 none 0)      -> xyz [0,0,0]
color(xyz-d50 0 0 none)      -> xyz [0,0,0]
color(xyz-d50 none none none / none)
                               -> xyz [0,0,0] / none
```

Serialization then emits `color(xyz 0 0 0...)`; both the D50 provenance and
channel missingness are unrecoverable. CSS Color 4 permits and preserves
missing components in modern color syntax; zero is a temporary value for
specific conversions, not a specified-value replacement. See
[CSS Color 4 §4.4](https://www.w3.org/TR/css-color-4/#missing).

The result is also neither disposition available to this tranche: it is not
the exact bounded R23 Phase-A compatibility rejection, and it is not the
eventual lossless PB0/PB5 value. A green test that expects this lossy success
cannot discharge the defect.

**Severity: acceptance-blocking.**

### Remaining blocker B3-C2 — extended `color(srgb ...)` changes on round-trip

The independent replay remains:

```text
color(srgb 2 -.5 0)
  parse     -> rgb [510,-127.5,0]
  serialize -> rgb(510 -127.5 0)
  reparse   -> rgb [255,0,0]
```

Predefined `color()` coordinates admit extended range, while direct `rgb()`
uses different parsed-value range handling. The projector erases the
predefined-space provenance and the serializer therefore chooses a syntax
whose parser clamps the value. See
[CSS Color 4 predefined spaces](https://www.w3.org/TR/css-color-4/#predefined)
and [RGB functions](https://www.w3.org/TR/css-color-4/#rgb-functions).

**Severity: acceptance-blocking.**

**Wave result: REJECT on B3-C1/B3-C2 only.**

## 3. Feature analyses

### CSS Syntax/token/CST foundation — ACCEPT

The focused token classifications, decoding, source dialect, spans, component
structure, direct composition, and bounded-depth behavior are green. EOF
string/URL token kinds are correct and separately carry termination status.
The shared lexical URL state machine remains appropriate; no feature scanner
should replace it.

### Value/scalar projection — ACCEPT

Nested NUL normalization, escaped hash semantics, direct/public equivalence,
nested failure propagation, `actual`, and structural spans all passed. The
projection partitions typed component arrays and does not reparse raw feature
text.

### Color syntax/projector — REJECT

Legacy/modern separation, adjacent numeric tokens, alpha solidus, escapes,
hash colors, representable missingness, and ordinary range normalization are
green. The feature as a whole remains rejected because B3-C1 and B3-C2 return
successful, irreversible values.

### Hostile/no-throw — ACCEPT for the probed vertical

Depth and malformed-input families terminate without exceptions. No broader
fuzz-totality claim is inferred beyond the maintained and focused corpus.

### Performance — no B3 peer-comparator verdict

B3 measured adversarial termination, not the pinned regex/prior-iteration
benchmark matrix. It grants no peer-beating performance credit and identifies
no new performance defect.

## Required disposition

1. Preserve the current shared CST/combinator architecture and the now-green
   B3 lexical/diagnostic cases.
2. Until a lossless carrier is authorized, return the exact R23 compatibility
   rejection for every D50-missing mask; never silently zero a missing channel.
3. Freeze a specified-color carrier that distinguishes D50/D65 provenance,
   preserves missingness, and keeps predefined `srgb` distinct from direct
   `rgb` where their range/serialization semantics differ.
4. Add born-RED coverage for all eight D50 masks and extended/negative
   `color(srgb ...)` parse→serialize→parse identity, then run two fresh
   independent implementation challenges on fixed hashes.

## Final verdict

**REJECT.** All post-repair concerns explicitly assigned to B3 are green. The
only B3 blockers are the two already isolated color-carrier losses. This
verdict supports continuing with the generalized token/CST parse-that design;
it does not support a return to feature-specific source scanners.
