# Foundation G0 — skeptic 2, parse-that architecture

**Subject:** `SUBJECT.json` SHA-256
`22ec8f1270f3ffa5b75ed8be85c43069e62f71d383d43be12ba29821b8f4b207`

**Disposition:** **REJECT_ALL / REJECT THE WHOLE SET.** H is an architecturally
acceptable candidate tree, but the sealed set does not prove an admissible
orthogonal triplet, B is a regex-source metagrammar with an accidental public
surface, and S inserts `Parser.lazy` at seven non-recursive seams. This review
grants no feature, integration, benchmark, or conformance credit.

| candidate | verdict | architectural rank |
|---|---|---:|
| H | **ACCEPT (architecture axis only)** | 1 |
| B | **REJECT** | 3 |
| S | **REJECT** | 2 |
| sealed set | **REJECT_ALL** | — |

## Exact-byte and runtime checks

- The subject hash matches. Its brief, fixtures, evaluator, browser-witness,
  accepted-number, and three ledger hashes all match the values sealed in the
  subject.
- Every entry in `h-ledger.sha256`, `b-ledger.sha256`, and
  `s-ledger.sha256` verifies against its candidate tree. The accepted numeric
  dependency matches
  `8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa`.
- All three trees pass strict TypeScript and the common evaluator (`128`
  success transactions, `56` failure transactions, `62` units each).
- I emitted each tree with TypeScript under NodeNext, imported the resulting
  JavaScript with Node as ESM, and parsed `1p\\78!`. All three emitted trees
  resolve their `.js` imports and return canonical `px` at offset 5.
- No candidate contains a token-object/CST layer, mutable source cursor,
  `state.src`, balanced scanner, generic remainder capture, or manual loop over
  parser input. Their `tokens/` directories are grammar-production namespaces,
  which is permitted by `ADDENDA-07` and `MODULE-DAG.md`.

Those GREEN facts show that the bytes are runnable. They do not cure the
architecture blockers below.

## Total-tranche / feature-boundary blockers

### A1 — The exact subject does not prove the mandatory independent provenance

`ADDENDA-07` §§2–3 requires a provenance graph, pairwise construction review,
and an author receipt containing model, input-manifest hash, isolated root
hash, commands, and close time. The complete sealed subject contains only the
brief, common fixtures/evaluator/browser witness, candidate files, and content
ledgers. It contains no author receipt, provenance graph, pairwise independence
review, API/LOC/backtracking/allocation record, or known-compromise record.
The letters H/B/S are not provenance evidence. This alone blocks acceptance of
the triplet even though the source trees are visibly different in places.

### A2 — This is a review batch, not one independently specifiable feature row

The brief seals escape decoding, name-code-point consumption, whitespace,
comments, trivia, identifiers, strings, percentages, dimensions, and unit
classification under one subject. These have distinct input languages, result
contracts, diagnostics, and benchmark doors. Under `ADDENDA-07` §2, they
cannot receive one feature disposition merely because they form a useful
dependency vertical. Reviewing them together is efficient; accepting them as
one feature is not.

The problem is observable inside the triplet. H and S have byte-identical
`value-unit/percentage.ts` files (SHA-256
`3118291038ba2b1db6bf5b085ef0614603f1756ce62aa4288436796dfd327f7f`),
and B implements the same `consumeNumber.skip(string("%"))` topology at
`candidates/b/value-unit/percentage.ts:16-18`. All three dimensions likewise
use the same `consumeNumber.then(cssIdentifier)` construction
(`h:57`, `b:45`, `s:40-42`), differing materially only through the identifier
dependency and unit lookup. These may be valid convergences, but the sealed
bytes do not prove three orthogonal percentage or dimension prototypes. They
therefore cannot confer per-feature 3×5×3 credit.

### A3 — Family placement and dependency direction are otherwise sound

All grammar leaves live under `tokens/`; percentage and dimension live under
`value-unit/`; each index makes every required production reachable; and
`value-unit` depends on `tokens`, never conversely. All three import the exact
accepted number rather than cloning its recognizer. No import cycle is present.
This matches the acknowledged direct DAG and is not a blocker.

## Candidate H — ACCEPT on the architecture axis

H is the clearest direct parse-that production tree in this generation:

- `tokens/code-point.ts:16-32` expresses hex, ordinary, and EOF escapes as
  ordinary `string`/`regex`/`next`/`skip`/`any` productions. The mapping
  functions decode only values already recognized by a parser; they do not
  inspect `ParserState.src` or implement a second scanner.
- `tokens/identifier.ts:8-20` renders the start alternatives and maximal
  continuation with `all`, `any`, and `many`, making the CSS production visible
  rather than hiding it inside a generated pattern.
- `tokens/string.ts:8-20` and `tokens/trivia.ts:3-19` remain similarly direct.
  No lazy wrapper is used where the graph is not recursive.
- `value-unit/dimension.ts:57-66` and
  `value-unit/percentage.ts:15-17` reuse the canonical number and token-family
  identifier in the correct import direction.
- `index.ts:1-12` exposes exactly the required public values/types. Its emitted
  ESM export list has ten runtime names and no decoder or regex-construction
  internals.

The 208 non-test source lines are reasonable for this multi-production batch.
The module-initialization loop at `value-unit/dimension.ts:43-48` builds a
finite classification map; it neither scans input nor constructs parsers per
parse. H still needs the missing provenance/compromise receipt and per-row
orthogonality proof, but I found no source-level lexer/scanner, ownership,
reachability, ESM, or parse-that-idiom blocker in its exact tree.

## Candidate B — REJECT

### B1 — Whole productions are hidden in a second regex-source grammar

`tokens/code-point.ts:3-10`, `tokens/identifier.ts:5`,
`tokens/string.ts:5-9`, and `tokens/trivia.ts:5-7` concatenate exported
`String.raw` fragments to synthesize complete identifier, string, comment, and
trivia recognizers. The resulting modules use seven `regex(...)` leaves and no
`any`, `all`, `chain`, `dispatch`, or `many` composition outside one optional
trivia wrapper. `regex` is a legitimate terminal parser; this particular use
is not merely terminal regex. It is a parallel regex-source metagrammar that
hides the production tree and then reparses matched spelling with global
replacement regexes (`code-point.ts:37-40`, `string.ts:9-19`). That is the
needless-regex/manual-decoding architecture `ADDENDA-07`'s parse-that skeptic is
required to reject, especially for the B seat whose stated character is a
near-one-for-one production transpose into parse-that combinators.

The opacity already creates local duplication: `nameStartSource` includes
`escapeSource` at `code-point.ts:9`, while `identifierSource` adds
`|${escapeSource}` again in both its hyphen and ordinary arms at
`identifier.ts:5`. It happens to recognize the public corpus, but the source no
longer provides one readable owner per production.

### B2 — The barrel leaks construction and decoder internals

`index.ts:1-6` uses `export *`. The emitted ESM surface contains sixteen names,
not the required ten: it additionally publishes `decodeEscape`, `decodeName`,
`escapeSource`, `nameCodePointSource`, `nameStartSource`, and
`preprocessCodePoints`. H and S emit exactly the ten required runtime exports.
The B leak makes regex-source fragments and decoder utilities reachable as
quasi-public grammar APIs, expands the surface without a ledger row, and
undercuts unique ownership. This is a concrete module-boundary blocker, not a
style preference.

B is the smallest tree by raw LOC (173 non-test lines), but that count is not a
parsimony win: substantial grammar is compressed into interpolated patterns
and repeated decoder passes. It requires a new candidate generation that keeps
regexes at legitimate terminal boundaries, expresses compound productions
through parse-that, and exports only the frozen surface.

## Candidate S — REJECT

### S1 — Seven lazy wrappers guard an acyclic grammar

S invokes `Parser.lazy` seven times:

- `tokens/code-point.ts:29-31`, `37-41`, and `43-47`;
- `tokens/trivia.ts:10-13` and `20-22`;
- `tokens/identifier.ts:24-27`;
- `tokens/string.ts:23`.

None closes a recursion cycle. Each callback returns parser singletons already
constructed at module initialization. In parse-that 1.0.0, `Parser.lazy`
creates a new parser whose call crosses a closure cache and delegates to the
cached parser. Here it adds indirection and obscures dependency order without
solving recursion or construction ordering. This is precisely speculative
abstraction rather than idiomatic direct composition. It is especially
conspicuous in `cssEscape`, where `string("\\").next(any(...))` is sufficient,
and in `cssTrivia`, where `any(cssWhitespace, cssComment).many()` is already
acyclic.

S's `dispatch`/`chain` identifier topology (`tokens/identifier.ts:4-27`) is a
useful genuinely different construction, its explicit barrel is clean, and its
emitted ESM is valid. But the lazy indirection is systematic across the tree,
not one harmless occurrence. Removing it changes reviewed parser bytes and
construction topology, so this exact candidate is rejected and must not be
silently repaired during synthesis.

## Required next generation

1. Preserve H unchanged as comparator evidence; do not call this set accepted.
2. Re-author B with compound CSS productions visible as parse-that composition
   and with an explicit ten-name barrel. Regex remains appropriate for bounded
   terminal character classes and numeric fragments.
3. Re-author S without `Parser.lazy` except where a real recursive production
   demands it; retain its useful `dispatch`/`chain` topology.
4. Bind author/provenance receipts and a pairwise construction review into the
   next exact subject.
5. Treat the foundation vertical as a dependency-coherent review batch while
   recording separate feature dispositions (or a content-addressed E-3 row
   merge that actually proves one shared observable/diagnostic/benchmark door).
   Reuse earlier accepted-number and percentage evidence explicitly rather than
   counting byte-identical adapters as fresh orthogonal prototypes.

## Receipt

- **ROLE:** hostile skeptic 2 — parse-that architecture
- **MODEL:** GPT-5 Codex runtime; exact served model identifier was not exposed
  to this task
- **REASONING:** high
- **METHOD:** exact-ledger replay, complete source inspection, parse-that 1.0.0
  declaration/source-map inspection, import graph/export census, strict
  TypeScript, common evaluator, and emitted-ESM execution
- **INDEPENDENCE:** no other skeptic verdict was read before sealing this file

