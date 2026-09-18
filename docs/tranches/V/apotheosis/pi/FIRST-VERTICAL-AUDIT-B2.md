# V·π first-vertical independent challenge B2

**Date:** 2026-07-22  
**Seat:** independent adversarial B2. I did not read or contact audit A2. The
Codex task envelope exposed no trustworthy `model_served` receipt, so this
document records that variance instead of inventing one.  
**Verdict:** **REJECT**

This is a narrow, evidence-backed rejection. The repaired first vertical is no
longer the feature-scanner architecture that prompted the owner's objection.
It has one CSS token/component-value foundation, and the value and color
modules lower that typed CST without rescanning the raw source. The only
imperative character walk in the audited L4 path is CSS's URL-token state
machine at the lexical boundary. That is a legitimate normative token
algorithm, not a color/value parser disguised as a scanner.

The vertical nevertheless cannot close because the current public color
carrier destroys two kinds of valid CSS Color 4 information: D50 missingness
and extended-range `color(srgb ...)` provenance. Both defects return successful
values, so the green suite currently confers false semantic credit.

## Artifact identity

The verdict is bound to these SHA-256 inputs:

| artifact | SHA-256 |
|---|---|
| `syntax/atom.ts` | `3cb1b3feef0a24c9b97a12ccdd4b0b7204b906ac1f1e2017613d85742cf5e4e0` |
| `syntax/component-value.ts` | `07cd147af7f07fe0833410cde0d98b6706decdc9985773085b5b03a8e13bec6a` |
| `syntax/source.ts` | `0c0d11442d1c837a11a82a6304d01abacc75b50232d6f3c82f8b773333c0ad81` |
| `syntax/tokens.ts` | `3d8fc54b62667aa10aedddfbb53540d0a4467d2a6c8543a78c0a9027b059a816` |
| `syntax/types.ts` | `7af6ba8d26603df4cf97327d59b2bf161ef0149eab8f27e5790f99d68eb7fb20` |
| `values/project.ts` | `37f5e42844c43737db3f115fcfc5c241259a925697c95c99b4a983ecc5670ac0` |
| `color/project.ts` | `ded07e88556c96627c253990ef780f20be19f0dfa1eae60ad209ec0a1ba2832e` |
| `grammar/value.ts` | `f512407ca44c8e59eb17c95fdd5d297b89f7fb2a3aced8fa3ef3b12b453902f4` |
| `grammar/color.ts` | `22e89a9810bf5125022656473fc9e9369b9826f5e0fe025fafdb895961542c62` |
| `css-syntax-foundation.test.ts` | `e5380fc93690c3ca43fb77815f0cd6e72557f7f16f9c33a220819b93dc08ddcf` |
| `first-vertical-architecture.test.ts` | `66381b0971989a4bed3846c55f98d8629e947e664cf5a6b617196897e9e65b8e` |
| `w1-values.test.ts` | `9a8912e2be7d8d64ea398c1fb147c1ca45aebd7fa1a860f1cb80fca8c83a915f` |
| `w2-color.test.ts` | `27c7e1aeb557a9d83167cfc27fdd291b01e39ca656421c7d6458e563e45137e2` |

## 1. Total-tranche / gestalt analysis

The architectural correction is sound and should be retained:

- `css/l4/syntax` owns source preprocessing, token construction, component
  values, spans, functions, and blocks;
- `css/l4/values/project.ts` and `css/l4/color/project.ts` are semantic
  projections over that tree;
- the public wrappers are thin parse/preprocess/remap joins;
- no `complete`, `completeBody`, `splitTopLevel`, `splitValueTokens`, or
  feature-local balanced scanner remains in this vertical;
- the small `split()` helper partitions an existing component array and never
  searches raw source;
- token-local regular expressions implement lexical atoms, not whole-feature
  recognition.

That is idiomatic enough to continue refining. CSS Syntax itself specifies
token-consumption state machines, so the URL token necessarily has lexical
state. Removing that state merely to avoid the word "scanner" would make the
grammar less correct, not more generalized. The operative prohibition is a
second, feature-owned source parser; I found none here.

The remaining faults are now above the tokenizer: the public `CssColor`
carrier conflates specified color expressions with resolved legacy values.
The `xyz-d50` arm resolves missing channels to zero before chromatic
adaptation, while the `srgb` arm relabels extended-range `color()` coordinates
as direct `rgb` channels. Later modules cannot reconstruct the erased space or
missingness. PB0 should therefore freeze the lossless specified-color carrier
before color-dependent Phase-B fan-out. This is a type/ownership decision, not
an invitation to add another parser.

**Gestalt result: RED on carrier completeness; GREEN on the repaired grammar
architecture.**

## 2. Wave analysis

### Mechanical and hostile rails

At the bound artifact:

```text
npm test -- --run: 13 files passed; 80 passed; 2 intentional TODO
npm run check: GREEN
declaration parity: 52 contracts
```

Direct CST, direct value grammar, public value, and public color probes did not
throw at 127, 128, 129, 1,000, or 10,000 nested function frames. CST/value
accepted through the documented depth 128 and rejected 129+; the 10,000-frame
cases rejected in roughly one millisecond in this run. Color correctly
rejected the non-color nesting at every depth. This discharges the probed
unbounded-recursion/crash class.

The challenge also drove concrete repairs now present and green:

- escaped `url` heads and escaped hashes are classified after CSS decoding;
- EOF string and URL states retain their proper token kinds and termination
  status;
- string decoding preserves astral characters and applies CSS escapes;
- direct composable grammars and public doors agree on CRLF/FF/NUL input;
- adjacent signed channel tokens and no-trivia alpha solidi compose;
- integer/number token classification is lexical;
- unterminated comments reject;
- malformed blocks report the furthest structural span rather than offset
  zero (`fn(a` at 4, `fn([a)` at 5..6, `a}` at 1..2).

These are real corrections, not paper dispositions. The following two current
success paths still block the wave.

### B2-C1 — D50 missing components are silently zeroed

All probed sources return `ok:true` and collapse to the same D65 black:

```text
color(xyz-d50 none 0 0)
color(xyz-d50 0 none 0)
color(xyz-d50 0 0 none)
color(xyz-d50 none none none)
    -> { space: "xyz", channels: [0, 0, 0], alpha: 1 }
    -> serialize: color(xyz 0 0 0)
```

`color/project.ts` implements this by substituting zero for each `none` before
D50→D65 adaptation. CSS Color 4 accepts missing components and preserves them
as missing in modern color syntax; zero is only a context-dependent conversion
value, not permission to erase the specified missingness. See
[CSS Color 4 §4.4](https://www.w3.org/TR/css-color-4/#missing).

This also contradicts the recorded R23 disposition: while the frozen Phase-A
carrier cannot express D50 plus missingness, the exact eight-source bank must
return the named `concrete xyz-d50` compatibility rejection; PB0/PB5 later
replace it with a lossless carrier. Although `ADDENDA-04` still awaits owner
ratification, current lossy success is wrong under either possible authority:
it is neither the bounded compatibility rejection nor the expanded charter's
lossless L4 result. The existing W2 test at lines 200–203 encodes the defect as
expected success and must be replaced by born-RED coverage, not counted green.

**Severity: acceptance-blocking.**

### B2-C2 — extended-range `color(srgb ...)` does not round-trip

Reproduced exactly:

```text
parse color(srgb 2 -.5 0)
    -> { space: "rgb", channels: [510, -127.5, 0], alpha: 1 }
serialize
    -> rgb(510 -127.5 0)
reparse
    -> { space: "rgb", channels: [255, 0, 0], alpha: 1 }
```

CSS Color 4 permits extended-range coordinates in predefined `color()` spaces,
whereas direct `rgb()` parsed values are clamped. See
[CSS Color 4 predefined color spaces](https://www.w3.org/TR/css-color-4/#predefined)
and [RGB range handling](https://www.w3.org/TR/css-color-4/#rgb-functions).
The current projector multiplies by 255 and stores the result in the direct
`rgb` arm, erasing the syntax family needed for a truthful serializer. This is
a genuine parse→serialize→parse semantic failure, not merely noncanonical
formatting.

**Severity: acceptance-blocking.**

**Wave result: REJECT.** The mechanical rails are green, but they omit one
blocker and positively assert the other.

## 3. Feature analyses

### Shared CSS Syntax token/CST foundation — ACCEPT for this vertical

Against the challenged families, the current foundation preserves token raw
text and spans, structured functions/blocks, comments/trivia, decoded token
values, termination state, lexical numeric type, and bounded nesting. Public
preprocessing maintains a processed-to-original offset map; direct parser
composition was checked on the same NUL/newline dialect. Escaped URL routing,
EOF token recovery, astral strings, escaped hashes, unterminated comments, and
furthest diagnostic spans now pass maintained tests.

The diagnostic `expected` label for structural failures remains generic
(`scalar`), but the source ranges are now honest. Exact/edit-oriented labels
should remain a visible later diagnostic rail; they are not a reason to undo
the CST architecture.

### Value projection and direct composition — ACCEPT for this vertical

The value projector is a pure CST lowering. Space, comma, and slash lists are
partitioned from typed component arrays; nested calls and simple blocks are
already structural nodes. Direct parsers stop before caller-owned semicolons,
and public doors enforce EOF. No raw whole-remainder parsing or feature scanner
was found.

### Color legacy/modern syntax — ACCEPT except for the carrier blockers

The tested legacy/modern separation, comment and escape handling, alpha slash,
adjacent signed channels, named colors, hex forms, direct-RGB clamping, hue
normalization, and missing channels in representable output spaces are sound
for the current vertical. The two exceptions are B2-C1 and B2-C2. They are
model-level failures and prevent accepting the color feature as a whole.

### Hostile/no-throw behavior — ACCEPT for the probed class

Non-string public inputs, invalid serializer inputs, malformed syntax, and the
adversarial nesting ladder returned values/failures without throwing. This is
substantive credit, but not a substitute for semantic correctness.

### Performance — no verdict in B2

This challenge measured hostile termination only. It did not run the tranche's
pinned regex/prior-iteration comparator matrix, so it grants no peer-beating
performance credit and makes no performance rejection. That evidence remains
the continuous bench rail's responsibility.

## Required repair and re-audit

1. PB0/owner authority must freeze a lossless specified-color carrier that can
   distinguish at least `xyz-d50` from D65 `xyz`, preserve missing channels,
   and distinguish predefined `srgb` from direct `rgb` when their parsed-value
   range rules differ.
2. Until that carrier is authorized, implement the exact R23 Phase-A
   compatibility rejection for all eight D50-missing sources. Never return a
   lossy successful value.
3. Add born-RED then green tests for all eight D50 masks and for extended-range
   `color(srgb ...)` parse→serialize→parse identity, including negative,
   greater-than-one, percentage, and alpha cases.
4. Re-run the maintained mechanical/differential/browser/hostile rails and two
   fresh independent E-1 implementation challenges against fixed hashes.

## Final verdict

**REJECT.** The current grammar foundation deserves retention: it is shared,
typed, composable, bounded, and no longer the former overfit feature-scanner
design. Acceptance is withheld specifically because the color carrier returns
successful but irreversible results for valid Color 4 inputs. Fix the carrier
boundary; do not reintroduce raw-source feature parsers.
