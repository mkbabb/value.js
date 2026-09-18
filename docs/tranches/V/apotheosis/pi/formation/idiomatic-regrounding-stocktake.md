# V·π idiomatic parse-that re-grounding stocktake (2026-07-22)

## Verdict

The mirror contains substantial code and useful evidence, but it does not yet
contain an acceptable parser architecture. Mechanical green was mistaken for
architectural progress. The parser work must be re-grounded around direct
parse-that productions before further feature growth.

## What was actually built

| area | current fact | disposition |
|---|---|---|
| package/contract | self-contained exact parse-that 1.0.0 package; 52-export declaration parity | **KEEP as harness/constraint** |
| result/types/conversions | result carriers, public type transpose, named colors, color conversion dependencies | **KEEP provisionally; audit semantic separation** |
| W0 helpers | `lexeme.ts`, balanced/string/list utilities, scanner tests | **RETIRE from grammar path; salvage fixtures only** |
| CSS syntax architecture | 608 LOC of atoms, token objects, source preprocessing, component-value CST | **REJECT** |
| semantic projections | 186 LOC value projection + 357 LOC color projection | **REJECT as architectural coupling; salvage expected results** |
| public parser doors | 8 parser doors consume the rejected atom/token/CST path; `coerceToSyntax` and `collectTimelineOptions` depend on them indirectly | **UNACCEPTED; rebuild through prototype contest** |
| direct sketch | 367 LOC in `grammar/css/l4/{combinators,tokens,value-unit,color}.ts` | **QUARANTINE as an unaudited candidate fragment** |
| stylesheet | analysis/collection helpers exist; `parseStylesheet` is a hard stub | **KEEP non-parser helpers only after review; parser missing** |
| tests | 86 pass, 2 TODO; typecheck green on 2026-07-22 | **KEEP fixtures selectively; architecture assertions are obsolete** |
| benchmark | `bench/stub.ts` prints a message; no measurements of the current mirror exist. Historical `parser-proof/bench-results.json` (`08b92775…8070be2`) is comparator evidence only | **MISSING** |

The direct sketch is not secretly the new parser. It is not imported by the
public grammar barrel. Its four tests cover combinators, identifier/string/hash
leaves, units, and comments; `grammar/css/l4/color.ts` is untested and unused.
It is also not fit to become candidate B unchanged: `tokens.ts` exposes a
generic `tokenGrammar`; `color.ts` uses adjacency lookahead as a tokenizer
surrogate and mixes clamping, conversion, D50 adaptation, and model
construction into recognition; global `w0`/`w1` risk erasing production-
specific whitespace; and the 248-line color monolith lacks diagnostics.

### Public-door routing

| route | doors |
|---|---|
| direct rejected grammar dependency | `parseCssColor`, `parseCssScalar`, `parseCssValue`, `parseTimingFunction`, `parseKeyframeSelector`, `parseAnimationTimeline`, `parseAnimationRange` |
| indirect rejected dependency | `parseCssValues`, `coerceToSyntax`, `collectTimelineOptions` |
| hard stub | `parseStylesheet` |
| no behavioral parser dependency | `serializeCssColor`, `serializeTimelineOptions`, `collectAnimationOptions`, `collectCustomFunctions`, `collectDeclarations`, `collectKeyframes`, `collectPropertyDescriptors`, `collectStyleRules` |

The package itself is isolated and exactly pins parse-that 1.0.0, but its proof
suite is intentionally repository-coupled: eight contract/differential/test
files import the live source or built distribution.

## Why the course was wrong

1. **Category error.** CSS token/component-value concepts were turned into a
   second runtime architecture instead of being expressed as parse-that
   productions. That recreated the custom parser substrate the migration was
   meant to remove.
2. **The plan ossified the error.** `ADDENDA-02` and its audits repeatedly made
   “one scanner, one CST, overlays” an acceptance goal. More auditing therefore
   made the wrong premise harder to dislodge.
3. **Overlapping substrates accumulated.** Test-only `lexeme.ts`, live
   `util.ts` scanners, orphaned legacy `grammar/{css-token,component}.ts`, the
   atom/token/CST layer, and an isolated direct-combinator sketch coexist.
   Shared behavior is duplicated while no one path owns the complete language.
4. **Projection bulk hid grammar weakness.** Hundreds of lines convert a
   generic CST after the parse. The grammar itself says too little about the
   typed CSS production being recognized.
5. **Directory structure drifted from the grammar.** The current tree centers
   `syntax/atom` and projectors rather than the acknowledged BBNF production
   families. It cannot be meaningfully compared module by module.
6. **Green tests were overclaimed.** The suite is narrow, partly tests the
   rejected architecture itself, and does not cover full CSS, stylesheet
   parsing, spec closure, or performance.
7. **Performance work became paperwork.** The benchmark remains a stub while
   `ADDENDA-06` accumulated a large execution protocol. There is no measured
   win over the regex parser or any prior iteration.
8. **The live regex implementation was allowed too much gravitational pull.**
   It is useful as a compatibility oracle, not as a grammar architecture.

## What remains useful

- frozen public types, export census, and consumer seam;
- named-color and pure conversion tables/functions, subject to fresh audits;
- pinned specification sources and the R-series counterexamples discovered by
  prior audits;
- differential, no-throw, parity, hostile, source-span, and round-trip fixture
  ideas, once detached from atom/CST assumptions;
- historical direct-combinator code as one prototype provenance, never as a
  ready-made answer;
- the acknowledged BBNF module assay, hashes, and import graph;
- published parse-that 1.0.0 and its authenticated combinator/packrat behavior.

## Historical lesson

Value commit `f5723e72` (`src/parsing/{units,color}.ts`) and Keyframes commit
`54424ee0d258c58ab9cdd96fbbc347bea9822e05` demonstrate the desired basic
shape: named `Parser`
productions composed directly with `any`, `all`, `then`, `chain`, `lazy`,
`map`, and terminal parsers. They are seeds, not golden code. Later history
also contains the exact hazards now forbidden: hand-written animation/list
scanners, large color monoliths, permissive remainder regexes, unsafe math
evaluation, memoization without proof, and semantic work embedded in parsing.

## BBNF lesson

The acknowledged BBNF tree has fifteen useful production families and no
import cycles. It is not complete authority:

- the registered stylesheet closure reaches only nine modules;
- `values`, `gradients`, `transforms`, `filters`, `easing`, and `keyframes` are
  disconnected;
- function/math and keyframes ownership is duplicated;
- current bytes do not prove full CSS L4, tokenization, WPT, recovery,
  serialization, or performance.

The TypeScript tree should be structurally comparable while independently
closing those defects against the pinned CSS corpus.

## Path forward

The governing protocol is `ADDENDA-07.md`. In short:

1. freeze a feature ledger from normative grammar operations;
2. author three independent direct-combinator candidates per feature:
   historical, BBNF-production, and spec-first;
3. challenge all three with five independent skeptics;
4. synthesize with three independent adjudicators;
5. integrate only the accepted exact hash;
6. rerun full-surface correctness, hostility, serialization, consumer, and
   benchmark rails after every integration;
7. retire the old architecture rather than adapting it in place.

The first attempted keyframe-selector boundary was subsequently rejected by
two independent challenges because it bundled unsettled foundation, list, and
compatibility operations. The next code should therefore be the smallest
independently closable direct foundation feature through the whole 3→5→3 path,
not a prebuilt lexical framework. Accepted foundation productions may then be
imported normally by later feature rows; no token tape, atom/CST substrate, or
cross-cutting god helper is implied.
