# G14 skeptic 2 — parse-that architecture, parsimony, and state safety

**Task receipt:** `/root/g14_skeptic_2`  
**Model receipt:** `GPT-5 Codex`  
**Role:** independent hostile parse-that skeptic, architecture/parsimony axis  
**Presumption:** every candidate is non-idiomatic, overfit, or state-unsafe
until the exact runtime and adversarial probes prove otherwise  
**Disposition:** **REJECT_ALL for G14 apotheosis selection.** H is the clear
architecture winner and D is a credible but duplicated optimization specimen.
B is not a faithful BBNF transpose and B/S break parser introspection. S also
creates parser objects during every parse and reproducibly exhausts the
package's global packrat parser-ID budget. Every candidate independently fails
the frozen strict performance qualification, and the result is an
unpredeclared third capture that explicitly earns zero qualification credit.

I did not read another G14 skeptic review. This review grants zero parser,
feature, benchmark, integration, production, package, or release credit.

## Exact subject and runtime receipt

I independently hashed the requested subject before testing:

| artifact | SHA-256 |
|---|---|
| feature | `266df7a5994fd7a75cb7bb2eee2fbcee02d38320ae0dde265727c6737626dc29` |
| candidate set | `e2f786bb2e190da3c45e9f6396ffb98bad652772de12c6c047519d48c4fda5e6` |
| H | `ca17a811198a286c3e07ab06670b76b16f98c513d246696296dd4c3e4abffaa8` |
| B | `42e6e6a3662c5bb30858b845fe04ced565ff6f755e7edd54d703804285f4e913` |
| S | `2edb390a542ebb98221c624934b14c009bc07c6b306cf7d4be1ccfcfd74202c8` |
| D | `a1e4fc2016362f4d1e4b49089c9580b85f6caa19d2adf91f60dd2dac412f8cd8` |
| public evaluator | `bbeeee5e7333a0105fe85c91624fc2be4c34500447bfe9dfce9de5a426b784b7` |
| hidden evaluator | `887799d06f170c6ae799cfb5ce5d5d825b555e50c394b21f78c5b156890e05c0` |
| hidden evidence | `fdc135c2cb9480a181321824cb67e823c7d9c3af07eaaa56dd8adba4d29c43d9` |
| benchmark manifest | `652f3f5056ff5d4fbcec69bba1b009a4a9612516d31da0a33ee4665b9a7e0807` |
| benchmark harness | `90ee2014b7e8705208c0d45c6ebf245f53ec7be3a573512fec32fb3890193540` |
| benchmark result | `722f5edcd8b25337a0d08d724406f7038cdfa93df632687423c397dee172644a` |

The governing local architecture bytes also match: `ADDENDA-07.md` is
`78a5bdb753fec5efb61311db570930bc2af80757531054b9ee3c415e98ee26d5`
and `MODULE-DAG.md` is
`291e51451d84f2fd41adb8b9a31b3c33cf1503b6f47019a06e16702c98daca8f`.
The installed package is exactly `@mkbabb/parse-that@1.0.0`; its `package.json`,
`dist/core.js`, and implementation chunk hash respectively to
`f53ca9b85c43e65c1f3f8a21414f990211d8d0e6a7f07df805557cdb6b50f4ff`,
`d577cc3e19b3a7e138ad433670ebdf4857776744c3375ae174391e2f68e642f5`,
and `1f8674c3d325579363356e1fd091a3735ae9a7ac9da0cb61a4ca0ebfb6d474a8`.

The actual acknowledged BBNF source was present at
`/Users/mkbabb/Programming/bbnf-lang/grammar/css/l4/value-unit.bbnf`, hash
`cb57f79050a6304d79e3a7d8c7b690c902f243880aab4c896a63899290dd727b`.
Its `number` production is one regex terminal followed by an `f64` projection;
it is not a factored sign/mantissa/exponent production tree.

## Independent replay and adversarial probes

I ran the exact public evaluator separately for H, B, S, and D. Each reported
PASS with 88 successes, 336 transactional failure observations, 10 parent
compositions, and 10 hostile inputs. The authenticated hidden evidence reports
PASS_EXACT_61_OF_61 for each candidate over all eight committed families. I did
not rerun the destructive one-shot hidden evaluator because its own contract
refuses to overwrite the already-persisted evidence.

I ran the frozen benchmark in validation-only mode. All seven lanes passed the
24/24 exact-end, leaf-shape, and binary64 gate, and the reported corpus and
harness hashes matched the manifest. I deliberately did not create another
timing retry.

I then used an independently written procedural consume-number oracle, not a
candidate regex, and exhaustively enumerated every string of length zero
through six over `{+, -, ., e, E, 0, 1, 9, x}` after one astral scalar, starting
at UTF-16 offset two. Across 597,871 inputs and 2,391,484 candidate calls, all
four had zero grammar, end-offset, sign/type, binary64, throw, or predecessor-
on-leaf-failure mismatches. This is strong bounded evidence against regex
overfit; it is not a universal proof.

Three architecture probes did expose defects:

1. Calling the published `Parser.toString()` API succeeds for H and D but
   throws `Error: parserPrint: missing parser context name` for B and S. Their
   hand-built transaction Parsers have empty context objects.
2. One thousand ordinary integer parses advanced the package-global Parser ID
   by 1 for H, B, and D (the probe's sentinel Parser) but by **2,001** for S.
   S lines 26–31 execute `fraction.opt().map(...)` inside `chain`, constructing
   two new Parser instances per integer parse.
3. After 1,048,600 successful S parses of `"1"`, an otherwise ordinary newly
   constructed memoized `string("x")` parser threw
   `RangeError: packrat memo key out of float64-safe budget:
   parser.id=2097221 (max 2097151)`. This is deterministic cross-parser global
   state exhaustion caused by S, not a timing inference.

I also composed each candidate as
`"(".next(consumeNumber).skip("%").skip(")")` and parsed `(1x)` from a frozen
predecessor value. Every parent correctly failed and rewound to offset zero,
but every parent left the successfully parsed numeric leaf in `state.value`
instead of restoring the predecessor. That is the real 1.0.0 sequencing
semantics, not a candidate-specific surprise.

## What parse-that 1.0.0 actually does

The package inspection matters because superficial combinator syntax conceals
mutable-state behavior:

- `regex` creates a sticky regex and runs it at `state.offset`. On failure it
  leaves offset and value alone; on success it writes the matched substring.
- `dispatch` builds an ASCII `Int8Array(128)` keyed by the next code unit.
  Multi-character keys such as `"+-"` enumerate characters, and `"0-9"` is a
  range. D's table therefore routes exactly the intended 13 ASCII starts.
- `all`, `then`, `skip`, `next`, `any`, and `opt` save and rewind offsets at
  their respective failure boundaries, but generally do not restore the
  predecessor value. `all` also compacts `undefined` values out of its product.
- `ParserState.save()` snapshots only `{offset, value}`. `restore()` restores
  those fields and clears `isError`; it does not roll back furthest-error
  diagnostics. B/S restore the snapshot and then set `isError = true`, which
  exactly satisfies this leaf's frozen failure contract and preserves
  pre-existing diagnostics ahead of the attempt.
- `chain` invokes its callback during parsing. S's callback creates fresh
  combinator wrappers on every call. Every `new Parser` consumes a monotonically
  increasing module-global ID, while memoization rejects IDs above 2,097,151.

Thus the B/S transaction wrapper is not fictitious: without it, their partial
sign/mantissa sequences can leak an intermediate value on leaf failure. It is
still an ad hoc boundary, duplicated twice, with no `createParserContext`, and
it does not make enclosing parse-that sequences value-transactional. H and D
avoid the wrapper because every routed recognizer is a single atomic regex
whose failure does not overwrite the predecessor.

The parent-value probe is not a frozen semantic blocker: `feature.json`
explicitly places parent value/offset-on-error outside this leaf contract, and
the evidence scores parent accept/reject plus source preservation only. It is
an integration warning. A later parent must not infer full state rollback from
offset rollback, and this tranche must not proliferate feature-local
`transaction` copies as an accidental shadow combinator library.

## Altitude 1 — total tranche and module architecture

The feature boundary is sound and correctly sequenced. Consume-number is one
small, independently specifiable semantic leaf used by integer constraints,
percentages, dimensions, math, color channels, media values, and higher value
grammars. `MODULE-DAG.md` correctly places exact number/integer/percentage/unit/
dimension productions under `value-unit`, reachable through
`stylesheet -> properties -> values -> value-unit`. It does not belong in
`tokens`, a generic CST, or a scanner module.

A terminal regex is not architecturally suspect merely for being a regex.
Here the entire recognition language is a small regular terminal, the
published parse-that `regex` parser is sticky at the current state offset, and
both the actual BBNF production and the historical direct grammar use that
shape. H therefore survives the regex-overfit challenge. D's branch regexes
also survive semantically, but its first-character specialization repeats the
same grammar three times and may duplicate a future parent dispatch.

None of these bytes is integrated into the acknowledged module root or the
52-export/37-consumer compatibility surface. The feature itself says
`PUBLIC_BOUNDARY_ONLY_ZERO_CREDIT`; the full denominator and public-root fit
remain tranche-RED. The accepted implementation, if any later generation
earns acceptance, must be the sole numeric owner imported by percentage,
dimension, and integer-only parents. Repeating H/D regexes in each parent would
recreate the duplicated-ownership defect that the reset forbids.

## Altitude 2 — feature cell, state contract, and evidence

The observable contract is now coherent. It preserves the maximal consumed
prefix, explicit sign including negative zero, integer/number classification,
Number conversion including underflow and infinities, unchanged source,
UTF-16 offsets, an ordinary mutable exact-key object, and predecessor identity
on leaf failure. All candidates build the final object with a plain object
literal in `sign,type,value` order; none freezes, seals, subclasses, or adds a
token/CST envelope.

No candidate violates the typed-grammar anti-scanner rule. There is no
`state.src`, cursor loop, source slice, `indexOf`, balanced scan, token tape,
generic remainder capture, filesystem, process, or corpus access. H's
`representation[0]` and H/D's type tests inspect the already-consumed terminal
value; they are small semantic projections, not source scanners.

The object and intermediate-allocation story is not equal:

- H and D allocate only the required final leaf on the candidate path.
- B allocates fused `all` products, mantissa objects, reconstructed strings,
  and a saved-state object before the final leaf.
- S allocates nested `then` products, reconstructed strings, a saved-state
  object, and fresh Parser wrappers during every parse before the final leaf.

The benchmark is correctness-gated and directionally useful, but it cannot
close this cell. Its own immutable result says every candidate fails the
strict comparison against the deposed peer. The one-sided 95% upper ratios are
H `1.80860`, B `4.90348`, S `3.84321`, and D `1.38087`; all are greater than
one. More fundamentally, `benchmark-result.json` says this is the third
capture after two valid timing executions were not persisted, no retry rule
was predeclared, and the consequence is zero performance qualification.

There is also a parsimony defect in the timed adapter: candidate lanes first
allocate their contract-required leaf and then `normalize` allocates a second
leaf, while the deposed bare-number peer pays only for its adapter-created
leaf. Calling the same `normalize` function is not the same total construction
work. That concern cannot rescue any candidate from the explicit strict loss
or forbidden retry; it means the frozen timing should not be used to choose
between H and D architecturally.

## Altitude 3 — individual candidate verdicts

### H — whole-prefix terminal regex

**Correctness: ACCEPT. Parse-that idiom: ACCEPT. Performance: REJECT.
Hostility/state safety: ACCEPT. KISS/LOC: ACCEPT. Overall: REJECT for G14
apotheosis. Architecture rank: 1.**

H is the construction to beat. At 477 bytes and 15 physical lines, it is one
published sticky terminal parser followed by one semantic `map` and one plain
result object. Its regex exactly matches the CSS consume-number prefix,
including complete-fraction and complete-exponent guards, and the exhaustive
probe found no overconsumption or rollback defect. It has an intact parser
context and `toString()` representation.

The `/[.eE]/` type test makes a second short pass over the captured spelling,
but that is a negligible and readable semantic classification, not a hidden
lexer. H also matches the actual one-terminal BBNF shape more closely than B.
Its only blocking axis in these exact bytes is the common performance gate.

### D — first-character dispatch

**Correctness: ACCEPT. Parse-that idiom: ACCEPT with duplication reservation.
Performance: REJECT. Hostility/state safety: ACCEPT. KISS/LOC: ACCEPT with
reservation. Overall: REJECT for G14 apotheosis. Architecture rank: 2.**

D uses the engine's published dispatch exactly as implemented. `"+-"`, `"."`,
and `"0-9"` are correct keys; non-ASCII and invalid routed suffixes fail without
cursor or predecessor mutation because each branch is atomic. The shared
`result` helper constructs the exact leaf once. This is legitimate parse-that,
not a lexer.

The cost is three separately spelled copies of mantissa/exponent grammar in
963 bytes and 26 lines. Any later edit must keep all three synchronized, and a
values-family first-character dispatch may make this leaf dispatch redundant.
D is fastest in the frozen candidate set, but it still fails the strict
deposed comparison and the run has no qualification credit. That is
insufficient evidence to prefer duplicated grammar over H.

### B — factorized `all` / `any`

**Correctness: ACCEPT. Parse-that idiom: REJECT. Performance: REJECT.
Hostility/state safety: ACCEPT for parsing. KISS/LOC: REJECT. Overall: REJECT.
Architecture rank: 3.**

B's static combinator graph is semantically sound, and its transaction wrapper
correctly restores this leaf's predecessor value. The wrapper is not itself a
manual scanner. The rest is still the wrong BBNF transpose. The exact BBNF
`number` at line 15 is one regex terminal; B invents factories and local
sign/fraction/mantissa/exponent productions, intermediate `Mantissa` objects,
fused product arrays, string reconstruction, and a custom outer Parser. It is
4.78x the deposed peer by geometric mean and more than four times H's source
bytes without exporting a reusable subproduction.

The custom Parser at lines 8–16 is also malformed for the package's published
introspection surface: because no parser context is supplied, `toString()`
throws. `createParserContext` is publicly exported, so this is candidate code,
not an inaccessible-engine excuse. B is correct as a specimen but neither the
nearly one-for-one BBNF seat promised by ADDENDA-07 nor a parsimonious final
grammar.

### S — staged chain

**Correctness: ACCEPT for isolated results. Parse-that idiom: REJECT.
Performance: REJECT. Hostility/state safety: REJECT. KISS/LOC: REJECT.
Overall: REJECT. Architecture rank: 4.**

S's surface staging follows the normative algorithm, and G14 repaired G13's
repeated-fraction overconsumption. Its exact output now agrees with the
procedural oracle. That local correctness does not make the implementation
safe or idiomatic.

Lines 26–31 use `chain` for a regular, statically expressible alternative and
construct `.map()`/`.opt()` Parsers inside the callback. This mutates the
package-global Parser ID on every successful number parse, allocates parser
graphs on the hot path, and deterministically makes later packrat parsers throw
after enough otherwise successful calls. A cached leading-fraction branch and
a cached digit-led branch would avoid that global-state failure; changing to
them would be new candidate bytes. S also has B's context-free transaction
wrapper and therefore the same reproducible `toString()` throw. Its 1,768
bytes and 52 lines buy neither reuse nor safety.

## Blocking docket, ranking, and final verdict

1. **P-1, common blocker — no performance-qualified candidate.** All four
   frozen confidence intervals lose to the deposed peer. The persisted result
   is an unpredeclared third capture and explicitly assigns performance credit
   zero. ADDENDA-07 forbids retry erasure.
2. **A-1, B/S blocker — broken Parser abstraction.** Exact call:
   `consumeNumber.toString()`. Exact result: both throw
   `parserPrint: missing parser context name`; H and D do not.
3. **A-2, S blocker — unbounded parser construction and global state
   exhaustion.** 1,048,600 parses of `"1"`, followed by a newly memoized
   `string("x")`, reproduces parser ID 2,097,221 and the package's hard
   RangeError above.
4. **A-3, B blocker — provenance/shape failure.** The exact acknowledged BBNF
   production is one regex terminal. B's private production forest is neither
   a nearly one-for-one transpose nor a reusable module boundary.

**All-axis ranking:** H > D > B > S.  
**Idiom/parsimony ranking:** H > D > B > S.  
**Performance observation only:** D > H > S > B, with no qualification credit.  
**Generation verdict:** `REJECT_ALL_FOR_APOTHEOSIS_G14`.

The smallest technically credible next generation retains H unchanged as the
architecture baseline and D unchanged as the optimization comparator, removes
B/S from contention unless replaced by genuinely idiomatic exact candidates,
and freezes a predeclared first-capture benchmark that does not duplicate the
candidate result leaf. Any such source, candidate-set, or benchmark change is
a new generation and requires the full five reviews again.
