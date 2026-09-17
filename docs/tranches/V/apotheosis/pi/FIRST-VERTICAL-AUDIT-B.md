# V·π first vertical — independent adversarial audit B

**Verdict: REJECT.** This is now real parse-that code: the whole-remainder
adapters and imperative top-level splitters are gone, and the implementation
uses `chain`, `many`, `sepBy`, `wrap`, lazy recursion, and public EOF. But the
current vertical still fails its claimed reusable boundary. Its token layer is
not CSS Syntax tokenization, its component layer captures raw strings, its
value grammar does not reliably compose with declaration terminators, and its
Color 4 grammar retains confirmed spec defects.

This pass was independent of audit A; I did not read or contact that seat. I
edited no implementation, tests, production, coordination, or status artifact.
This report is the only output.

`model_served`: inherited Codex GPT-5-family child route. The exact backend
alias and service-side effort label were not exposed, so this receipt does not
claim an Opus-labelled route. Date: 2026-07-21.

Reviewed principal SHA-256s:

- `combinators.ts` `0c0867fb8a07be425f98ac62cbd9d9fe0d22aea982bd4d580cd65b7219f19cbe`
- `css-token.ts` `c258e98e22bd979d44c2dca1734b776db811f736c20a55378badf194660bc2a4`
- `component.ts` `32ab5011fbd72986a2955f69244ad99d0c1c114646f7b276302e28cfbf21e684`
- `value.ts` `d83c9734a0075e8f34258b28d44b89f0dc66ce51ec9e053a8413f61320e29c54`
- `color.ts` `234928d55f0a970bb4f214e92d7668ff1637dafe591d4a89dcb6be7db5d823c8`
- architecture test `214fce7d45d0ae4998676e3875800d398b3d105d9bfbd2c89c64a8ffd7a45d80`

I inspected the installed exact `@mkbabb/parse-that@1.0.0` state and
combinator implementations. Authorities: [CSS Syntax
3](https://www.w3.org/TR/css-syntax-3/) and [CSS Color
4](https://drafts.csswg.org/css-color-4/).

## 1. Total-tranche / gestalt analysis

The new code answers the original architectural criticism only halfway.
Atomic regex leaves are appropriate, and the recursive/separator structure is
now readable. However, `css-token.ts` exposes a small lexeme subset rather than
CSS tokens; `component.ts` uses structure only to find delimiters and returns
source slices; `value.ts` then makes lexical and component decisions inside a
reduced semantic union. Extending this exact boundary would reintroduce
per-family exceptions for URLs, arbitrary delimiters, blocks, comments, and
recovery.

The first vertical must establish one common token/component boundary before
it is copied. Existing combinator work is salvageable, but the current
`CssValue` union cannot be allowed to erase simple-block/function structure at
the shared layer. The differential also needs spec fixtures: four recorded
spec-over-LIVE token cases do not prove CSS Syntax, and LIVE agreement cannot
clear shared Color 4 defects.

There is no first-vertical benchmark evidence. Repeated function-head trials
and nested `slice()` capture are visible risks, but timing this rejected
boundary would not prove the target architecture.

## 2. Wave analysis

Mechanically green:

- `npm test -- --run`: 12 files, 70 pass, 3 intentional TODO;
- `npm run check`: pass;
- `npm run dts-parity`: 33 type + 19 runtime exports;
- deterministic 20,000-input hostile sweep through public value/color doors:
  zero throws;
- ordinary tested offsets, `any()`/`sepBy()` rollback, and public EOF: green.

The architecture guard only bans the old adapter/splitter spellings. It has no
matrix for CSS preprocessing, number/URL boundaries, EOF comment behavior,
component output shape, trivia before declaration terminators, or the Color 4
rules below.

The exported grammar also has an uncontrolled depth failure:

```ts
const s = "f(".repeat(1000) + "a" + ")".repeat(1000);
cssValueGrammar.parseState(s); // RangeError; depth 500 succeeds
```

`parseCssValue` catches this and remains no-throw, but converts resource
failure into an ordinary generic syntax result. A hardening limit/result policy
is absent.

## 3. Feature analysis

### F-B1 — BLOCKING: token correctness

Exact reproduced cases:

| source | CSS Syntax result | current result |
|---|---|---|
| `1.` | number `1`, then `.` delim | accepts number `1`, silently loses `.` |
| `url(http://x)` | valid URL token/component | rejects |
| `url(a b)` | bad-URL token | accepts generic two-argument call |
| `foo/*` | consume comment through EOF and record parse error | generic rejection; comment requires `*/` |
| U+0000 | preprocess to U+FFFD | no preprocessing |
| `r\65\r\nd` | CRLF→LF; decoded ident `red` | color rejects |

The number defect is `NUMBER` accepting `\d+\.?\d*`; CSS incorporates a
decimal point only when followed by a digit. URL/bad-URL and input filtering
are token rules, not generic-function special cases.

### F-B2 — BLOCKING: component and generic-function structure

`component.ts:9-47` parses balanced delimiters but `captured()` returns the
whole substring, and a simple block is mislabeled as a keyword scalar because
the union has no block arm. `value.ts:62-86` recurses through the reduced
semantic value grammar rather than CSS component values. It therefore rejects
valid component material such as `fn(!)`, `fn(@x)`, `fn(#id)`, `fn(a;)`, and
`url(http://x)`, and rejects arbitrary empty `fn()` via a hand-maintained name
allowlist. The shared layer is structurally aware but not structurally valued.

### F-B3 — BLOCKING: delimiter composition

The export says its caller owns the following delimiter, while semicolon is
also a value atom. Trivia changes which contract wins:

```ts
cssValueGrammar.skip(string(";")).parseState("foo;tail")   // success, offset 4
cssValueGrammar.skip(string(";")).parseState("foo ;tail") // error, offset 0
parseCssValue("a ; b")                                     // accepts `;` as item
```

The maintained composition test covers only the first shape. A declaration
terminator must remain caller-owned independent of preceding trivia.

### F-B4 — BLOCKING: Color 4 correctness

The combinator layout is readable, but the same channel parser is used for
modern and legacy branches and the factories omit parsed-value rules:

| source | required | current |
|---|---|---|
| `rgb(1, 2%, 3)` | reject mixed legacy kinds | accepts `[1,5.1,3]` |
| `rgb(none, 2, 3)` | reject legacy `none` | accepts |
| `rgba(1,2,3,none)` | reject legacy `none` alpha | accepts |
| `hsl(120,50,50)` | reject legacy non-percent S/L | accepts `[120,.5,.5]` |
| `rgb(1 2 3 / 2)` | accept; clamp alpha to `1` | rejects `color_out_of_range` |
| `rgb(300 -10 20)` | clamp parsed RGB to `[255,0,20]` | retains `[300,-10,20]` |
| `hsl(720 -10 50)` | normalize/clamp `[0,0,.5]` | retains `[720,-.1,.5]` |
| `lab(150% 0 0)` | clamp L to `100` | retains `150` |
| `lch(-5 -2 720)` | clamp/normalize `[0,0,0]` | retains `[-5,-2,720]` |
| `color(xyz-d50 none 0 0)` | valid missing component | rejects |

These should remain declarative: distinct legacy/modern productions plus a
small post-parse normalization projection. They do not justify returning to
imperative scanners.

## Fresh-audit gates

1. Reproduce and repair F-B1–F-B4 under the applicable owner/E-3 authority.
2. Return structured functions/simple blocks from the shared component layer.
3. Add terminator-with-trivia and deterministic depth/limit tests.
4. Add spec fixtures independent of LIVE, then benchmark the corrected bytes.

