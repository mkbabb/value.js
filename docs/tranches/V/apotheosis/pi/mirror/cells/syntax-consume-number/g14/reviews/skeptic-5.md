# G14 skeptic 5 — total-tranche gestalt

**Task:** `/root/g14_skeptic_5`  
**Model identity:** Codex, based on GPT-5  
**Reviewed root:**
`/Users/mkbabb/Programming/value.js/docs/tranches/V/apotheosis/pi/mirror/cells/syntax-consume-number/g14`  
**Role:** independent hostile skeptic seat 5; feature boundary, module DAG,
consumer seams, orthogonality, parsimony, and synthesis fitness  
**Presumption:** all candidates and all evidence are wrong until reproduced  
**Disposition:** **REJECT ALL for G14 synthesis or integration. Retain the
`SYNTAX-CONSUME-NUMBER` boundary and exact H only as zero-credit design
specimens.**

This review grants zero parser, feature, benchmark, integration, production,
package, or tranche credit. I changed no candidate, authority, corpus,
evaluator, evidence, benchmark, BBNF, or production byte. The only persistent
write is this review.

## Exact frozen subject

All identities assigned to this seat matched before review:

| artifact | observed SHA-256 |
|---|---|
| `feature.json` | `266df7a5994fd7a75cb7bb2eee2fbcee02d38320ae0dde265727c6737626dc29` |
| `candidate-set.json` | `e2f786bb2e190da3c45e9f6396ffb98bad652772de12c6c047519d48c4fda5e6` |
| candidate H | `ca17a811198a286c3e07ab06670b76b16f98c513d246696296dd4c3e4abffaa8` |
| candidate B | `42e6e6a3662c5bb30858b845fe04ced565ff6f755e7edd54d703804285f4e913` |
| candidate S | `2edb390a542ebb98221c624934b14c009bc07c6b306cf7d4be1ccfcfd74202c8` |
| candidate D | `a1e4fc2016362f4d1e4b49089c9580b85f6caa19d2adf91f60dd2dac412f8cd8` |
| public evaluator | `bbeeee5e7333a0105fe85c91624fc2be4c34500447bfe9dfce9de5a426b784b7` |
| hidden evaluator | `887799d06f170c6ae799cfb5ce5d5d825b555e50c394b21f78c5b156890e05c0` |
| hidden evidence | `fdc135c2cb9480a181321824cb67e823c7d9c3af07eaaa56dd8adba4d29c43d9` |
| benchmark manifest | `652f3f5056ff5d4fbcec69bba1b009a4a9612516d31da0a33ee4665b9a7e0807` |
| benchmark harness | `90ee2014b7e8705208c0d45c6ebf245f53ec7be3a573512fec32fb3890193540` |
| benchmark result | `722f5edcd8b25337a0d08d724406f7038cdfa93df632687423c397dee172644a` |

The candidate files and frozen authority/evidence/benchmark files were mode
`0444`. Additional governing context inspected for this gestalt pass was:

| governing context | observed SHA-256 |
|---|---|
| `FEATURE-LEDGER.md` | `6d2bd8074e021cc6cf585d1574028c5c2c62036d09733a6f1ca0b120b9bcffc1` |
| `MODULE-DAG.md` | `291e51451d84f2fd41adb8b9a31b3c33cf1503b6f47019a06e16702c98daca8f` |
| `ADDENDA-07.md` | `78a5bdb753fec5efb61311db570930bc2af80757531054b9ee3c415e98ee26d5` |
| acknowledged BBNF `value-unit.bbnf` at `af15f63e…` | `cb57f79050a6304d79e3a7d8c7b690c902f243880aab4c896a63899290dd727b` |

## Commands and reproduced evidence

The material checks were:

```text
find .../g14 -type f -print0 | sort -z | xargs -0 shasum -a 256
stat -f '%Sp %Lp %N' .../g14/{authority,candidates,evidence,benchmark files}

for seat in h b s d; do
  ./node_modules/.bin/tsx cells/syntax-consume-number/g14/public-evaluator.mts \
    --candidate cells/syntax-consume-number/g14/candidates/$seat/index.ts
done

./node_modules/.bin/tsx <hierarchy-preserving-shadow>/g14/holdout-evaluator.mts
./node_modules/.bin/tsx cells/syntax-consume-number/g14/benchmark.mts --validate

git -C /Users/mkbabb/Programming/bbnf-lang show \
  af15f63e0d2d3d719938c13b906a50acbb92ea3b:grammar/css/l4/value-unit.bbnf

curl -L --compressed --silent --show-error \
  https://drafts.csswg.org/css-syntax/ | shasum -a 256
```

The four public replays each returned `PASS`: 88 successes, 336 transactional
failures, 10 parent cases, and 10 hostile cases. I replayed the one-shot hidden
evaluator from a disposable hierarchy-preserving shadow so the persisted
evidence was not overwritten. It returned `PASS_ALL_FOUR_EXACT`, 244 total case
executions, and regenerated evidence SHA-256
`fdc135c2cb9480a181321824cb67e823c7d9c3af07eaaa56dd8adba4d29c43d9`.
The shadow was removed afterward.

The benchmark validation-only command authenticated its bindings and returned
`PASS_CORRECTNESS_ONLY_NO_TIMING_EXECUTED` for all seven lanes on 24/24 rows.
I did not create a fourth timing capture. The persisted result already says it
is a third capture after two unpersisted runs and awards itself zero
qualification credit.

The live CSS Syntax page still identifies the Editor's Draft as 10 June 2026,
and §4.3.13 still returns value, `integer|number`, and optional sign after the
staged sign/digits/fraction/exponent algorithm. Fresh response bytes hash to
`0375dc2d4dda6d38fb97d60cbc35915bd2ad2c9ea0fe563d4d91c1d0ab3c2e46`,
not feature.json's
`755d81a47638112e13b6aa3e5c0599bc4b4aa308f4c1fd6f19cb984d838e019d`.
The semantic reference is inspectable, but its claimed byte pin is not
reproducible without retained bytes or a stated canonicalization.

Two focused parse-that probes supplied cross-feature evidence. Calling
`consumeNumber.toString()` succeeded for H (the terminal expression) and D
(`dispatch`), but B and S each threw
`Error: parserPrint: missing parser context name` because their hand-created
transaction `Parser` has no context. In a fresh process per seat, 1,000 parses
of `"1"` changed a sentinel parser ID by H `+1`, B `+1`, D `+1`, but S
`+2001`. S creates `fraction.opt().map(...)` inside its runtime `chain`
callback: two globally ID-bearing parser objects per integer parse.

## Altitude 1 — total tranche

### The local boundary is right; the tranche is not ready to accept it

`SYNTAX-CONSUME-NUMBER` is the smallest useful consuming numeric operation. It
has one input language, one maximal-prefix rule, one grammar-shaped result,
transaction/recovery behavior, and one natural performance door. It avoids
the rejected zero-width `starts-number` feature and supplies exactly the leaf
needed by percentage, dimension, integer-only, math, color-channel, timeline,
and keyframe parents. Splitting sign, fraction, or exponent into separate
feature cells would create protocol and module overhead without an independent
consumer seam. Merging percentage or dimension into this row would duplicate
the leaf and conflate distinct result/diagnostic doors. The boundary is
therefore locally optimal.

That does not make it globally admissible. The live `FEATURE-LEDGER.md` begins
`BORN-RED / denominator incomplete`, describes these rows as proposed rather
than sealed, and says no parser implementation is accepted. The most recent
occurrence-owner repair records `full_168_source_run: false` and a terminal
reject with zero denominator/operation/feature credit. `ADDENDA-07` §2 requires
the full occurrence-to-row bijection, two challenges, and gestalt acceptance,
and explicitly forbids pilot acceptance before that full-ledger freeze.

This is not a paperwork nit. Until the denominator closes, the tranche cannot
prove that this leaf is owned exactly once, that no omitted numeric operation
requires a different observation boundary, or that the 52-export/37-consumer
surface is fully routed. G14 may retain research evidence, but it cannot reach
apotheosis, synthesis selection, or integration while its own prerequisite
denominator is RED.

### BBNF/module-DAG fit is good, with one provenance correction

The acknowledged `MODULE-DAG.md` assigns exact number, integer, percentage,
unit, and dimension productions to `value-unit`; it also says family names are
namespaces rather than a one-file ceiling. A subordinate target such as
`grammar/css/l4/value-unit/numeric.ts` is therefore the correct eventual home.
It must not live in `tokens`, because `tokens` cannot become a token-object or
numeric-token runtime, and it must not be repeated in `values`, `color`,
`keyframes`, or public adapters.

All four candidates comply with the direct-combinator/no-lexer law. Their
`regex`, `string`, `all`, `any`, `chain`, and `dispatch` objects operate on the
same parse-that string state. No candidate creates a token tape, CST, lexical
object layer, manual cursor loop, or slicing scanner. A terminal regex is
expressly lawful.

The exact acknowledged BBNF module is especially informative: its `number`
production is one regex terminal projected to `f64`; it is not a factored
sign/mantissa/exponent tree. BBNF's `f64` result is not semantic truth for this
cell—the CSS Syntax algorithm requires sign and type too—but its construction
shape means candidate B is not the promised near-one-for-one BBNF transpose.
H is closer to both the historical and the actual BBNF terminal shape.

The right eventual relationship is one-way: the accepted TypeScript
`consumeNumber` leaf owns recognition; percentage, dimension, and integer-only
parents consume that leaf and add their own grammar. The BBNF `number -> f64`
shape is coordination evidence or an adapter target, not permission for a
second numeric regex owner.

### Orthogonality is asserted, not closed

The four source topologies are materially different: H is a whole-prefix
terminal, B uses factorized `all`/`any`, S uses staged `chain`, and D uses
first-character `dispatch`. Structural variety alone is not the whole
orthogonality law. `ADDENDA-07` also requires a preauthor provenance graph,
pairwise construction review, and author receipts carrying served model,
input-manifest hash, isolated root hash, commands, and close time.

The frozen G14 bundle contains no author receipts or provenance graph.
`candidate-set.json` names four task strings and makes one summary isolation
assertion, but it records none of those required receipt fields. It also labels
B a BBNF-production candidate despite the exact BBNF source being the one
terminal construction that B does not use. Thus the candidate set proves four
different syntax trees, not the required independent genealogies and roles.

For the next lawful generation, do not inflate a BBNF seat merely to make it
look different. Treat the one-terminal historical/BBNF overlap as one
candidate plus comparator evidence; use a static specification-staged parser
as the independent S seat and D as the mandatory engine-native fourth seat.
Persist the exact receipts. Orthogonality is a provenance constraint, not a
license for 55 lines around a seven-step atomic terminal.

### Consumer and sequencing seam

This leaf is intentionally internal and currently reaches no active parser in
the clean `apotheosis/` root. That is appropriate for a candidate cell but
means public compatibility, original-source mapping, typed diagnostics,
percentage/dimension serialization, and end-to-end consumer behavior remain
RED. The leaf should preserve only unchanged source plus its start/end UTF-16
positions. The future source-map boundary maps those positions to original
input; it must not introduce a raw token or second recognizer to recover the
spelling.

Nothing from G14 should be integrated now. After denominator and feature
acceptance, integration should add one internal numeric module and make all
numeric parents import its exact accepted hash. Public issue translation and
serialization belong to those parent/public rows. Integration cannot cure an
unaccepted feature and cannot be used to choose between candidates.

## Altitude 2 — feature cell

### Correctness evidence is strong but bounded

The public and hidden evaluators genuinely establish the declared valid-state
contract for all four exact candidates over their rows: maximal prefixes,
incomplete exponents, repeated fractions, UTF-16 nonzero offsets, signed zero,
underflow/infinity, ordinary mutable result descriptors, predecessor identity,
ahead diagnostics, parent accept/reject behavior, and bounded hostile inputs.
I found no semantic counterexample in this gestalt pass.

The result shape is proportionate. `{ sign, type, value }` is the normative
algorithm result, and an ordinary mutable object is the default JavaScript
representation rather than a costly policy such as G13's forced freeze. The
descriptor probes are stringent, but they impose no unusual implementation
machinery on H or D. Source spelling correctly remains an offset observation,
not a serializer or token object.

Ordinary diagnostic labels deliberately receive no fidelity credit. That is a
coherent internal boundary only if every parent supplies one stable typed
translation later. G14 proves structural diagnostic safety, not public
`ParseIssue` behavior. No synthesis or integration record may silently count
it toward the tranche diagnostic denominator.

### Candidate complexity is not proportionate to the operation

H expresses the whole operation in 15 lines and 477 bytes. D spends 26 lines
and 963 bytes to buy prefix dispatch and observed speed, at the cost of
repeating the mantissa/exponent grammar three times. Those are plausible ends
of the design space.

B (55 lines, 2,097 bytes) and S (52 lines, 1,768 bytes) are disproportionate
for this atomic terminal. Both reconstruct strings and need a custom
transaction parser that breaks the package's printable parser graph. B adds
arrays, objects, factories, and alternation without reuse or speed benefit. S
additionally constructs parser objects during parsing, turning a local grammar
choice into monotonic process-global parser-ID consumption. That is a
tranche-level composability defect: a foundational leaf can poison unrelated
later memoized parsers merely by being called often enough.

The exact BBNF source confirms that this complexity is not demanded by module
isomorphism. Production-family isomorphism should preserve ownership and
readability; it should not force every normative prose step into a runtime
wrapper.

### The performance requirement is valid; this benchmark is not comparable

A strict correctness-preserving win against genuinely comparable retained
iterations is a reasonable bar. G14's decisive `deposed` comparison is not
such a door:

- each candidate parses only the sliced token at local offset zero, constructs
  its full leaf, then the harness discards most of that leaf and constructs a
  second leaf;
- `deposed` produces only a primitive number, while the harness injects sign
  and type from the oracle and constructs its only leaf;
- LIVE runs the much broader `parseCssScalar` public path and has no observed
  consumed end; and
- C14 constructs a richer CST/value object that is discarded.

Uniform `extract()` and `normalize()` shells do not make those intrinsic
operations equivalent. They also do not execute the candidate on the declared
original source at offset 3; they slice first and create a new state at offset
zero. Under `ADDENDA-07` §6, such peers are `NON_COMPARABLE`, support no broad
win claim, and cannot close G-3.

Even if that objection is waived, the persisted third capture rejects all
four. Candidate/deposed geometric mean ratios and one-sided 95% upper bounds
are H `1.691 / 1.809`, B `4.777 / 4.903`, S `3.740 / 3.843`, and D
`1.362 / 1.381`. Every upper bound is above 1. The result also candidly records
two earlier successful-but-unpersisted runs and a non-predeclared third
capture, so it cannot satisfy the immutable-first-raw/no-retry law.

The benchmark must be respecified in a new generation:

1. give every leaf lane the original source and offset when the implementation
   supports that operation;
2. make every comparable lane derive sign, type, value, and end from input and
   construct exactly one equivalent leaf;
3. reuse the candidate's intrinsic leaf rather than allocate a normalized copy;
4. mark primitive-only or broader public/CST doors `NON_COMPARABLE` in the leaf
   microbenchmark, then benchmark broad doors separately with equally broad
   candidate adapters;
5. include success, maximal-prefix/failure, and representative parent blocks,
   with an independently seeded balanced schedule; and
6. seal an immutable raw result path before the first timing and preserve every
   attempt append-only.

Changing the comparator operation, manifest, corpus, or harness creates G15;
the existing exact candidates do not inherit a performance pass from that
recut.

### Normative and lifecycle repairs

Before any next synthesis attempt:

1. retain the exact normative document bytes or declare a reproducible
   canonicalization; the current URL/date/hash tuple does not reproduce;
2. finish and accept the full normative occurrence denominator;
3. persist author provenance/receipt evidence and correctly classify the BBNF
   seat;
4. remove runtime parser construction from any staged candidate and preserve
   parse-that introspection; and
5. rerun the public/holdout/benchmark/quintetto generation after every frozen
   input change.

## Altitude 3 — per-candidate ranking and verdicts

`ACCEPT` in the table is axis-local. Global denominator, provenance, and
benchmark blockers make every overall verdict `REJECT`.

| rank | candidate | correctness | parse-that idiom | performance | hostile/composition | KISS/LOC | overall |
|---:|---|---|---|---|---|---|---|
| 1 | **H** | ACCEPT on public + hidden rails | ACCEPT; one lawful terminal/map | **REJECT**; `1.691×` deposed, invalid comparison/capture | ACCEPT on available bounds | ACCEPT; 15 lines | **REJECT; retain exact nominee only** |
| 2 | **D** | ACCEPT on public + hidden rails | ACCEPT; native ASCII dispatch | **REJECT**; `1.362×` deposed, invalid comparison/capture | ACCEPT on available bounds | ACCEPT, qualified by triplicated grammar; 26 lines | **REJECT; retain optimization specimen** |
| 3 | **B** | ACCEPT on public + hidden rails | **REJECT**; non-printable custom wrapper and not a faithful BBNF transpose | **REJECT**; slowest at `4.777×` deposed | ACCEPT on available bounds | **REJECT**; 55 lines/2,097 bytes | **REJECT** |
| 4 | **S** | ACCEPT on finite semantic rails | **REJECT**; runtime parser construction and non-printable wrapper | **REJECT**; `3.740×` deposed | **REJECT**; two global parser IDs consumed per integer parse | **REJECT**; 52 lines/1,768 bytes | **REJECT** |

### 1. H — best gestalt, no synthesis authority

H is the clearest atomic grammar, has the smallest drift surface, matches the
actual one-terminal BBNF construction shape, preserves CSS maximal-prefix
behavior, and composes without a custom transaction wrapper. Its use of one
terminal regex is idiomatic parse-that, not a lexer. It is the only exact
candidate I would preserve as a future selection nominee.

It nevertheless fails the frozen performance predicate, lacks a lawful first
capture, belongs to a provenance-incomplete set, and sits below an unclosed
denominator. **Exact H does not merit current synthesis dispatch or
integration.** Any benchmark or authority recut that could rehabilitate it is
a new generation and must review the same or changed bytes again.

### 2. D — useful engine-native comparator

D is direct, bounded, readable, and fastest among candidates. `dispatch`
makes the leading branch explicit and avoids S/B's wrapper path. Its cost is
three copies of essentially the same numeric grammar. That duplication is
acceptable in a candidate experiment but unattractive in the foundational
owner because every future syntax correction has three edit sites.

D is the correct optimization comparator to retain beside H. It is not the
winner: it still loses the recorded deposed comparison, and no valid evidence
shows that its duplication is necessary after equalizing the output work.

### 3. B — orthogonality theater, not a BBNF transpose

B is semantically sound over the reproduced corpus, and its explicit restore
does preserve the leaf failure transaction. But the acknowledged BBNF
production is a single regex-to-`f64` terminal; B's factories, `all`/`any`
products, mantissa object, string reconstruction, and custom `Parser` are not
near-one-for-one with it. `toString()` throwing confirms that the wrapper is
not transparent to the published parser API. At more than four times H's
bytes and the worst measured candidate time, B offers neither architectural,
readability, reuse, nor performance compensation. Reject it.

### 4. S — cross-feature lifecycle blocker

S repaired G13's repeated-fraction grammar and passes the finite semantic
rails. The source is still unfit as a foundational parser. Its `chain`
callback executes `fraction.opt().map(...)` on every integer parse, allocating
two new `Parser` instances and advancing the package-global parser ID twice.
The 1,000-call probe's `+2001` sentinel delta is exact evidence, while H/B/D
each produced only the sentinel's `+1`. The runtime's memo key admits parser
IDs only through 2,097,151, so repeated ordinary S success deterministically
consumes a finite global budget that unrelated memoized parsers share.

This violates composability and hostile work expectations even though the
five bounded hidden hostile strings do not reach exhaustion. S also breaks
parser printing and is 3.740 times the deposed lane in the persisted capture.
No synthesis should use these bytes.

## Required disposition

- Integrate nothing from G14.
- Retain the feature boundary under the `value-unit` production family; do not
  move it to a lexer or `tokens` runtime and do not merge it with percentage or
  dimension.
- Retain exact H as the zero-credit semantic/KISS nominee and exact D as the
  zero-credit optimization comparator. Withdraw B and S from selection.
- Close the full denominator and reproducible normative pin before feature
  acceptance.
- Recut candidate provenance and the semantics-equivalent benchmark as a new
  generation; do not synthesize unseen H/D composite bytes.
- If a future exact candidate is accepted, install one internal numeric owner
  beneath `grammar/css/l4/value-unit/`; all numeric parents import it, while
  source mapping, public diagnostics, serialization, and compatibility remain
  separately owned rows.

## Terminal verdict

**`REJECT_ALL__NO_G14_SYNTHESIS__NO_INTEGRATION__RETAIN_BOUNDARY_AND_H_ZERO_CREDIT`**

No exact candidate currently merits synthesis. H is the best retained design
specimen, not an accepted winner. Parser `0`; feature `0`; benchmark `0`;
integration `0`; production `0`.
