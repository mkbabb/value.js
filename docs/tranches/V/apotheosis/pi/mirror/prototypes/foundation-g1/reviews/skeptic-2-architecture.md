# Foundation G1 — skeptic 2, parse-that architecture

**Subject:** `SUBJECT.json` SHA-256
`687ac4941ab73f79fdf7abd21d997262a1c66ca15c51d04e2505d9c895631764`

**Disposition:** **ACCEPT_ALL on the architecture axis, with rank B > H > S.**
All three exact trees are admissible direct parse-that foundation prototypes.
B is the most economical and has the cleanest module surface; H is the most
literal production transcription and has better chunking under long trivia;
S remains admissible but carries a redundant identifier fast path, a
code-point-at-a-time comment loop, and avoidable post-match regex work. This
review grants no full-parser, feature, integration, production, conformance,
or benchmark credit.

| candidate | architecture verdict | rank | decisive reservation |
|---|---|---:|---|
| B | **ACCEPT** | 1 | whitespace repeats per code point |
| H | **ACCEPT** | 2 | escape prefix is rebuilt and retried in three branches |
| S | **ACCEPT WITH RESERVATIONS** | 3 | redundant dispatch/fallback and per-code-point comment body |

## Exact bindings and executable floor

The subject digest matches the requested SHA. Its author subject, superseded
author subject, brief, fixtures, erratum, erratum fixtures, three candidate
ledgers, common replay, evaluator, Unicode evaluator, browser witness,
accepted `consumeNumber`, mirror `package.json`/lockfile, installed
`@mkbabb/parse-that@1.0.0` manifest, and installed ESM core all match their
sealed hashes. Every path in all three candidate ledgers verifies after the
review. The candidate bytes were not modified.

For each of H, B, and S, I ran:

- strict NodeNext TypeScript with `strict`, `noUncheckedIndexedAccess`,
  `exactOptionalPropertyTypes`, and `verbatimModuleSyntax` inherited from the
  mirror configuration;
- its own Vitest configuration (H: 10/10, B: 104/104, S: 11/11);
- the candidate-neutral evaluator (each: `PASS`, 205 recorded success
  transactions, 88 failure transactions, 62 known units, and 180,000 hostile
  parser calls);
- live ESM imports and runtime export census.

Each barrel has exactly the ten required runtime names. The accepted number is
imported by identity from the single accepted owner; no candidate copies its
recognizer. These facts establish only the runnable architectural floor.

## Whole-tree forbidden-architecture audit

I inspected every production, barrel, test, TypeScript configuration, and
Vitest configuration in the H/B/S ledgers. Across the production trees:

- no `lazy`, `getLazyParser`, or other deferred parser construction appears;
- no candidate creates a `Parser` or `ParserState`, reads `state.src`, manages
  an offset/cursor, slices a source remainder, or implements a scanner loop;
- no lexer, token tape, token-shaped result, CST/AST/atom layer, span wrapper,
  or balanced-source recognizer appears;
- no regex source fragment, `.source`, `String.raw` grammar fragment, or
  dynamically generated `RegExp` appears; every regex is a local terminal or
  a small bounded leaf;
- all exported parsers are module singletons. The only factories (`quoted`,
  `stringBranch`, and `quotedString`) run a fixed two times during module
  initialization, never during parsing;
- successful percentage, dimension, and classifier object results are freshly
  allocated. Unit Maps/Sets contain only private primitive metadata;
- the dependency direction is acyclic: `value-unit/dimension` imports the
  accepted numeric leaf and `tokens/identifier`; `percentage` imports only the
  numeric leaf and `%`; token leaves do not depend upward on value units;
- internal helpers are absent from every public barrel. H and S necessarily
  export sibling-shared code-point helpers from their internal module, but
  those helpers do not escape the explicit root surface. B's code-point module
  is itself limited to the two required runtime exports.

The `tokens/` name is a BBNF production-family namespace here, not evidence of
a tokenizer. Results are decoded semantic strings, and source extent remains
the parse-that state offset. All three therefore preserve the intended direct
composition model.

## Reproduced hostile architecture probes

These probes instrumented parser objects only inside disposable Node
processes; they did not alter candidate files. Call counts are deterministic.
The elapsed time and heap deltas below are illustrative stress evidence, not a
benchmark or benchmark credit.

### S retries the complete ordinary identifier branch

`s/tokens/identifier.ts:20-31` constructs a dispatch fast path and then places
the same `ordinaryIdentifier` object after it in an outer `any`. Runtime
context inspection confirms that parser id 36 is both a parser reachable from
the dispatch table and the exact second `any` arm. On `"\\\n"`, dispatch
selects `ordinaryIdentifier`, it fails after the backslash, and `any` invokes
the same object again. Instrumentation recorded `ordinaryCalls: 2`, final
`isError: true`, rollback to offset 0, and `furthest: 1`.

This is not a correctness failure: for common successful ASCII identifiers it
is a reasonable fast path, and the fallback is required for non-ASCII starts.
It is nonetheless duplicated ownership of the ordinary production and makes
malformed dispatched prefixes do twice the work. A downstream foundation can
avoid this by dispatching ASCII branches and giving the non-ASCII fallback its
own non-overlapping parser, or simply by retaining the already complete
ordinary production without the fast path.

### S's comment body scales in combinator iterations with input length

`s/tokens/trivia.ts:10-18` uses `/[^*]/u` as one comment code point and then
`many()`. For an unterminated comment containing 100,000 `x` code points, the
repetition body was called 100,001 times. H's `/[^*]+/` branch and B's
`/[^*]+/u` branch each called their repetition body twice on the identical
input. In one process per candidate, the illustrative observations were:

| candidate | body calls | elapsed | heap delta |
|---|---:|---:|---:|
| H | 2 | 0.191 ms | 222,056 B |
| B | 2 | 0.277 ms | 326,016 B |
| S | 100,001 | 3.022 ms | 3,268,880 B |

The sealed million-character no-throw gate still passes, so this is not an
acceptance blocker. It is a real downstream cost and the strongest reason not
to promote S as the architectural template.

### B makes the inverse tradeoff for whitespace

`b/tokens/trivia.ts:3,13-15` repeats a one-code-point whitespace parser so it
can preserve CRLF as one grammar code point. On 100,000 spaces it invoked the
repetition body 100,001 times; H and S recognize the maximal run in one regex
leaf. Illustrative isolated observations were B 5.212 ms and about 3.29 MB of
heap growth versus H 0.371 ms and S 0.443 ms in those processes. This is a
localized economy defect, not a scanner or semantic blocker. B should use a
maximal whitespace terminal like the other two while retaining explicit CRLF
normalization.

### H reparses the backslash prefix across alternatives

`h/tokens/code-point.ts:16-32` gives `escapedHex`, `escapedCodePoint`, and
`escapedEof` separate `string("\\")` prefixes. Graph inspection found three
distinct backslash parser nodes. Instrumentation recorded two prefix calls for
`"\\?"` and three for terminal `"\\"` and invalid `"\\\n"`; B and S each
have one prefix node and one call for all three inputs because they factor
`string("\\").next(any(...))` once. H's formulation is still direct and small,
but B/S better express the grammar's shared prefix and avoid needless
backtracking.

## Candidate B — rank 1, ACCEPT

B is the strongest architecture candidate in these exact bytes.

- `tokens/code-point.ts:5-30` keeps the large Unicode union in its proper role:
  a regex terminal matching exactly one code point. Escape is visibly
  `"\\"` followed by one of hex, ordinary, or EOF bodies. This is not the G0
  regex-source metagrammar: there are no interpolated grammar fragments or
  whole identifier/string regexes.
- `tokens/identifier.ts:5-15` uses parse-that set difference to derive name
  start from the owned name-code-point production and then composes the three
  prefix forms. `minus(/[0-9-]/)` is especially suitable for a future BBNF
  transpose: exclusion is structural and escaped digits remain valid because
  the exclusion is tested against raw input at the same start.
- `tokens/string.ts:11-28` and `tokens/trivia.ts:17-24` expose the production
  branches directly. The fixed quote factory is construction-time only.
- `value-unit/percentage.ts:16-18` and
  `value-unit/dimension.ts:48-56` are minimal direct composition over the
  accepted numeric and identifier owners.
- `value-unit/dimension.ts:15-46` has one declarative family table, one private
  lookup Map, ASCII-only canonicalization, and fresh public records.
- `index.ts` is explicit, exact, and leak-free. B uniquely keeps the direct
  `tokens/code-point.ts` runtime surface to the required two names.

At the subject's sealed count B is 188 non-test TypeScript lines, versus H's
221 and S's 223. A second nonblank-source count produced the same ordering
(B 152, H 183, S 190). B earns that economy through ordinary combinators and
compact types, not hidden regex grammar. Its one-code-point whitespace loop is
the only material reservation.

## Candidate H — rank 2, ACCEPT

H is the easiest tree to audit against the prose grammar.

- `tokens/code-point.ts:14-52` separates preprocessing, hex decoding, ordinary
  escapes, EOF escapes, name starts, and name continuations into plainly owned
  leaves. The three repeated backslash prefixes are unnecessary, but no branch
  is hidden in a scanner or metagrammar.
- `tokens/identifier.ts:8-20` is a literal `any` of double-hyphen,
  leading-hyphen, and ordinary productions with maximal `many()` continuation.
  It duplicates the `initial + remainder` suffix structurally across two arms,
  but that mirrors the normative alternatives and remains readable.
- `tokens/string.ts:8-23` correctly reuses owned escape/newline productions;
  its quote factory runs only at import time. `tokens/trivia.ts:3-19` uses
  maximal chunks for both whitespace and comment text.
- its numeric value leaves point in the correct direction and allocate fresh
  semantic records. The classifier's table-to-Map initialization is finite,
  private module construction, not parser construction or source scanning.

H's barrel is exact. Its internal code-point module has five runtime exports
because string and identifier need three sibling-shared helpers. That is not a
root API leak, although a later production package should make deep-import
policy explicit. H is larger than B and builds the largest reachable parser
graph in this review (90 unique nodes versus B's 85 and S's 84), principally
because it repeats prefixes and alternatives. Its chunked trivia behavior and
transparent grammar keep it comfortably admissible.

## Candidate S — rank 3, ACCEPT WITH RESERVATIONS

S repairs the G0 lazy-wrapper defect completely: the exact G1 tree has no
`lazy` at all. It is a real direct-combinator implementation, not a disguised
scanner.

- `tokens/code-point.ts:24-46` factors the escape prefix and owns the corrected
  Unicode domain directly. However, `hexEscapeBody` consumes digits plus
  optional whitespace and `decodeHexEscape` then runs a second regex to recover
  the digits. H/B pass the already recognized digit string to their mapper;
  S's rematch is avoidable duplicate recognition.
- `tokens/identifier.ts:20-31` uses idiomatic `dispatch`, but its overlapping
  complete fallback causes the reproduced retry above.
- `tokens/string.ts:18-38` uses dispatch well: the quote alternatives are
  disjoint, directly selected, and built once. The escaped-newline regex is a
  small bounded compound leaf rather than a regex metagrammar, though
  `string("\\").next(newline)` would expose ownership more clearly.
- `tokens/trivia.ts:10-18` is semantically direct but allocates/iterates per
  non-asterisk code point. It should adopt the maximal chunk terminal already
  demonstrated by H/B before becoming the foundation template.
- `value-unit/dimension.ts:14-38` is compact but scatters one conceptual unit
  registry over five Sets plus a hard-coded `fr` branch. H/B's family table and
  generated lookup provide one extension point and better BBNF-family
  stewardship.

S's explicit barrel is exact, parser identities are stable, and its fixed
factories are import-time only. None of the reservations violates the frozen
architecture contract, so rejection would overstate them. Together they do
make S the least parsimonious downstream choice despite its slightly smaller
reachable parser graph.

## Downstream BBNF-family suitability

All three preserve the required family boundary and can be composed directly
by later BBNF-family productions. B is the best promotion basis because it has
the smallest source, exact internal/public surfaces, a single unit registry,
factored escape prefix, and a structural `minus` representation of the name
start exception. H is a strong comparator when grammar transparency and
chunked trivia are prioritized. S should remain comparator evidence unless its
overlapping identifier dispatch, comment granularity, hex rematch, and split
unit registry are simplified in a new content-addressed generation.

Promotion must still happen per owned module/feature and through the tranche's
normal evidence gates. This architecture verdict does not establish a complete
CSS parser, does not validate unrelated BBNF productions, does not authorize
copying the whole prototype tree into production, and does not convert the
illustrative stress probes into benchmark evidence.

## Receipt

- **ROLE:** hostile skeptic 2 — idiomatic parse-that architecture and module
  ownership
- **SUBJECT:** exact SHA-256
  `687ac4941ab73f79fdf7abd21d997262a1c66ca15c51d04e2505d9c895631764`
- **METHOD:** complete ledger/source inspection, binding replay, import and
  runtime export census, parse-that 1.0.0 implementation/context inspection,
  strict TypeScript, candidate Vitest, neutral hostile evaluator, parser-graph
  census, and disposable runtime call-count stress probes
- **INDEPENDENCE:** no other Foundation G1 skeptic verdict was read before this
  verdict was sealed
- **CREDIT BOUNDARY:** architecture-axis candidate review only; no broad or
  full-parser credit
