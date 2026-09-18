# V·π first parse-that vertical — independent adversarial code audit A

status: `REJECT`

date: 2026-07-21

model_served: inherited Codex model route; the service-side backend alias and
effort label were not exposed to this seat, so this receipt claims neither
Opus nor Fable

audited implementation SHA-256:

- `combinators.ts` — `0c0867fb8a07be425f98ac62cbd9d9fe0d22aea982bd4d580cd65b7219f19cbe`
- `css-token.ts` — `c258e98e22bd979d44c2dca1734b776db811f736c20a55378badf194660bc2a4`
- `component.ts` — `32ab5011fbd72986a2955f69244ad99d0c1c114646f7b276302e28cfbf21e684`
- `value.ts` — `d83c9734a0075e8f34258b28d44b89f0dc66ce51ec9e053a8413f61320e29c54`
- `color.ts` — `234928d55f0a970bb4f214e92d7668ff1637dafe591d4a89dcb6be7db5d823c8`

This pass was independent and assume-faulty. I did not read or contact audit B.
I changed no implementation, test, production, authority, coordination, inbox,
or script file; this report is my only write.

## Verdict

**REJECT.** The reset has made a real improvement: value and color now compose
public parse-that parsers with sticky-regex leaves, `chain`, `many`, `sepBy`,
`wrap`, `lazy`, and `eof`. I found no whole-remainder adapter or imperative
balanced splitter in these audited paths, no zero-width `many`/`sepBy` operand,
and no delimiter-swallowing failure in the focused composition cases.

Four blockers prevent acceptance:

1. the shared lexical leaves disagree with CSS Syntax on numbers,
   preprocessing, escapes, and comment EOF;
2. component blocks are still flattened to opaque keyword strings, so this is
   not the promised lossless structural foundation;
3. ordinary CSS Color 4 legacy, clamping, hue, alpha, and missing-component
   semantics are wrong; and
4. relative-color diagnostics still use a raw substring regex, parser offsets
   are discarded, and hostile nesting ends in incidental stack overflow.

The green tests encode or miss each class. No benchmark result can qualify
these bytes before the semantic blockers close.

## 1. Total-tranche / gestalt analysis

The architectural sequence is still inverted. A shared preprocessing-aware
CSS token/component layer must be correct and lossless before value and color
become typed overlays. Instead, `css-token.ts` is a small feature-oriented
regex vocabulary, `component.ts` captures source substrings, and `value.ts`
immediately lowers them into the frozen public union.

A scanner/tokenizer is not itself the regex-era mistake: CSS Syntax requires
stateful token recognition. The necessary boundary is one bounded, tested
token owner built from parse-that primitives plus only the smallest justified
stateful leaves. Feature grammars must not invent their own source dialects.

The current `CssValue` carrier has no block/token/span arms. It may remain the
public compatibility projection, but it cannot dictate the internal parser
spine. Until blocks remain structured internally and the token errors below
close, this vertical must receive no downstream foundation or graduation
credit.

## 2. Vertical / wave analysis

Mechanical evidence is green:

```text
npm test -- --run && npm run check
12 test files passed; 70 tests passed; 3 TODO; strict TypeScript GREEN
```

Focused probes contradict semantic acceptance:

```text
parseCssValue("1.")                       -> ACCEPT number 1
parseCssValue("\\d800 ")                  -> ACCEPT lone surrogate
parseCssColor("rgb(none, 0, 0)")         -> ACCEPT
parseCssColor("rgb(100%, 0, 0%)")        -> ACCEPT
parseCssColor("rgb(0 0 0 / 2)")          -> REJECT color_out_of_range
parseCssColor("hsl(-540 50% 50%)")       -> ACCEPT hue -540 unchanged
parseCssColor("color(xyz-d50 none 0 0)") -> REJECT color_invalid_input
```

At 1,000 nested generic functions, `cssValueGrammar.parseState()` throws
`RangeError`. The public door catches it and returns an undifferentiated
whole-input syntax failure. That is neither an explicit limit nor a `+1` limit
proof.

The architecture test also overclaims. Its “without flattening” case asserts
only `result.ok`; the parsed blocks in
`fn([a, inner(b/c)] {d: e; f: g})` are two raw-string keyword scalars. Its
source guard merely bans two historic function/import names in `value.ts` and
`color.ts`; it does not inspect the component capture or diagnostic regex.

## 3. Feature analyses

### 3.1 Combinator/result layer — partial ACCEPT, diagnostic REJECT

`succeed`, `reject`, `select`, EOF ownership, and caller-owned delimiter
composition are small and idiomatic. But `parseGrammar()` throws away
parse-that's furthest offset and expectations. The public doors then create
`0..source.length` failures, and their catch blocks erase the exception/limit
cause. ParseIssue fidelity is therefore not proved.

### 3.2 CSS token leaves — REJECT

- `css-token.ts:22` accepts a decimal point without a following digit. CSS
  consume-number only consumes `.` when the next code point is a digit, so
  `1.` is a number token plus a delim token, not scalar `1`. The W1 bank
  explicitly blesses it.
- `decodeCssIdent()` replaces zero and values above U+10FFFF, but not surrogate
  escapes. `\\d800 ` returns U+D800 rather than U+FFFD. Raw NUL/surrogate input
  preprocessing is absent too.
- `commentChunk` requires `*/`; CSS Syntax consumes a comment to its terminator
  **or EOF**. Thus `foo/*` is wrongly rejected.

These are normative token errors, not reasons to add feature-local regexes.
Authorities: [input preprocessing](https://www.w3.org/TR/css-syntax-3/#input-preprocessing),
[comments](https://www.w3.org/TR/css-syntax-3/#consume-comments),
[escapes](https://www.w3.org/TR/css-syntax-3/#consume-an-escaped-code-point), and
[numbers](https://www.w3.org/TR/css-syntax-3/#consume-a-number).

### 3.3 Component/value structure — REJECT

`component.ts:9-47` is recursive parse-that composition, which is valid
progress. Nevertheless, `captured()` materializes source slices and
`simpleBlockValue` immediately maps every block to a keyword. No child nodes,
token identity, spans, or recovery survive. The grammar therefore proves
balanced acceptance, not the readable lossless structure required for later
CSS modules. Retain structure internally and test that structure separately
from the frozen public projection.

### 3.4 Color — REJECT

The combinator layout is readable, but one shared `ChannelParser` erases
necessary modern/legacy distinctions:

- `legacyBody()` permits `none`, mixed RGB number/percentage channels, and bare
  number S/L in legacy HSL; Color 4 forbids all three;
- out-of-range alpha is valid and must clamp at parsed-value time, but the
  factory rejects it;
- out-of-range RGB channels must clamp, but the factory retains them unchanged;
- hue must normalize to `[0,360)`, but negative/overflow hues survive; and
- modern functions allow missing components, but the `xyz-d50` arm rejects
  every `none` channel and its test records that as an agreed rejection.

These are ordinary Color 4 rules within the current carrier, not future
relative-color expansion. Authorities: [modern/legacy syntax](https://www.w3.org/TR/css-color-4/#color-syntax),
[alpha](https://www.w3.org/TR/css-color-4/#alpha-value), and
[RGB](https://www.w3.org/TR/css-color-4/#rgb-functions).

### 3.5 Context diagnostics, hostility, and proof — REJECT

`color.ts:248-268` searches the raw suffix for the word `from`. It falsely
classifies `rgb(foo "from" bar)` as context-required and misses escaped
`fr\\6f m`. Relative/context classification must use decoded tokens at the
proper depth or remain deferred, never a source substring.

The tests prove useful EOF, ordinary nesting, named-color, LIVE-compatibility,
and non-string no-throw cases, but not this architecture. They omit exact CST
shape, WPT/spec cases above, error spans, direct exported-grammar hostility,
and depth/size limits; `1.` and `xyz-d50 none` are baked in with wrong expected
results. LIVE equality cannot arbitrate defects shared with LIVE.

## 4. Fresh-audit close conditions

1. Correct the shared token/preprocessing semantics; do not add another
   feature scanner.
2. Preserve blocks/functions as internal structure and test that shape.
3. Separate modern/legacy color channels and implement Color 4 parsed-value
   normalization/missingness.
4. Remove the raw `from` scan, preserve parser locations, and add explicit
   no-throw depth/work limits with boundary tests.
5. Add born-RED spec/WPT/browser witnesses for every case above, then run two
   fresh independent audits.

Nothing here authorizes production execution, dependency/pin changes,
benchmark claims, PB fan-out, or BBNF uplift adoption.
