# G14 skeptic 4 — hostile state, diagnostics, composition, and recovery

**Task path:** `/root/g14_skeptic_4`  
**Model identity:** Codex, based on GPT-5  
**Role:** independent hostile skeptic seat 4  
**Reviewed root:**
`/Users/mkbabb/Programming/value.js/docs/tranches/V/apotheosis/pi/mirror/cells/syntax-consume-number/g14`  
**Presumption:** every candidate and every aggregate evidence claim was treated
as wrong until reproduced against the frozen bytes.  
**Primary-axis rank:** **H > D > B > S**.  
**Terminal verdict:**
**H and D ACCEPT on the hostile leaf-state/composition axis; B REJECTS on the
published Parser construction/introspection surface; S REJECTS on call
stability and cross-parser global-state safety. REJECT the exact G14 wave for
apotheosis.** No parser, feature, benchmark, integration, production, package,
or release credit is granted.

## Exact frozen subject

I hashed the subject before testing and again after writing this review. The
required and observed SHA-256 values were identical:

| artifact | exact reviewed SHA-256 |
|---|---|
| `feature.json` | `266df7a5994fd7a75cb7bb2eee2fbcee02d38320ae0dde265727c6737626dc29` |
| `candidate-set.json` | `e2f786bb2e190da3c45e9f6396ffb98bad652772de12c6c047519d48c4fda5e6` |
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

Every listed authority/candidate byte was mode `0444`. I made no change to a
candidate, evaluator, fixture, receipt, benchmark artifact, runtime, or any
other subject byte. This review is the only file I wrote.

## Commands and reproduced evidence

The principal replay commands were:

```sh
shasum -a 256 feature.json candidate-set.json candidates/{h,b,s,d}/index.ts \
  public-evaluator.mts holdout-evaluator.mts holdout-evidence.json \
  benchmark-manifest.json benchmark.mts benchmark-result.json

for seat in h b s d; do
  ../../../node_modules/.bin/tsx public-evaluator.mts \
    --candidate "candidates/$seat/index.ts"
done

../../../node_modules/.bin/tsx benchmark.mts --validate
```

Each exact public replay returned PASS: 77 inherited successes plus 5 complete
and 6 repeated-fraction cases (88 successes total), 336 failure runs split
168 ordinary/168 preseeded-ahead, 10 parent cases, and 10 hostile cases. The
benchmark validation rerun, without another timing attempt, returned
`PASS_CORRECTNESS_ONLY_NO_TIMING_EXECUTED` and 24/24 exact leaf/end/binary64
for every candidate and all three peers.

I did not invoke the one-shot hidden evaluator in place: its exact source
refuses to overwrite the already-present `holdout-evidence.json`. Instead I
independently decoded the canonical recovery frame, authenticated it with
AES-256-GCM using the revealed key, tag, nonce, and AAD, and parsed the
plaintext in memory. The recovered 13,840 bytes hash to the precommitted
`f53e24b703596990e9e53cf0160e2e32bf3a524022d41d982d251207ea5d5867`.
I inspected the state-relevant rows rather than relying only on evidence
totals: 8 transactional failures, 4 UTF-16/nonzero-offset cases, 3 descriptor
cases, 15 parents, and 5 generated hostile strings. The persisted evidence
reports exact 61/61 per candidate and 244 executions total.

I then ran an independent ESM state matrix against each frozen export with
diagnostics explicitly enabled. It used the same ESM parse-that instance as
the candidates and checked:

- exact `Parser` identity and repeated `.call()` reuse;
- success from offset 4 after an astral prefix, and failure starting on the
  low surrogate at offset 1;
- incomplete decimal and repeated-fraction maximal prefixes;
- exact frozen predecessor identity on ordinary and preseeded-ahead failure;
- byte-for-byte JSON snapshots of furthest/expected/suggestions/secondary
  spans when the pre-existing diagnostic was ahead;
- ordinary diagnostic structural bounds with diagnostics enabled;
- ordinary-object prototype, exact key order, descriptor flags, assignment,
  deletion, extension, and fresh result identity;
- percentage parent success and full-source parent rejection;
- `recover(regex(/[^,]+/), sentinel).skip(string(",")).eof()` from UTF-16
  offset 2, requiring end offset, exact sentinel identity, and one collected
  diagnostic;
- bounded 8,193-code-unit success and failure strings with no throw; and
- 1,000 successful integer calls bracketed by fresh Parser IDs.

The exact compact observations were:

| seat | matrix | `consumeNumber.toString()` | Parser-ID delta across 1,000 calls | recovery diagnostics |
|---|---|---|---:|---:|
| H | PASS | PASS, whole regex | 1 (the closing sentinel only) | 1 |
| B | PASS | **THROW** `parserPrint: missing parser context name` | 1 | 1 |
| S | PASS | **THROW** `parserPrint: missing parser context name` | **2,001** | 1 |
| D | PASS | PASS, `dispatch` | 1 | 1 |

Finally, I escalated S's deterministic two-Parsers-per-integer-call behavior
to the package's global memo-key limit:

```sh
node --import ../../../node_modules/tsx/dist/loader.mjs --input-type=module \
  -e '<1,048,600 successful S calls; construct and invoke memoized string("x")>'
```

The fresh inner parser had ID `2097257`, and its first call threw exactly:

```text
RangeError: packrat memo key out of float64-safe budget:
parser.id=2097257 (max 2097151), offset=0 (max 4294967295)
```

This is a reproduced state/composition defect, not a timing inference. S can
poison a later, otherwise ordinary packrat parser in the same module instance.

## Altitude 1 — total tranche

`SYNTAX-CONSUME-NUMBER` is correctly scoped as a small prefix-consuming
`value-unit` leaf shared by percentage, dimension, integer-only, and delimited
parents. State and source observations belong at this boundary; a token tape,
CST, source-copying result, or second cursor architecture does not.

The tranche nevertheless remains RED/zero-credit. `feature.json` is explicitly
`PUBLIC_BOUNDARY_ONLY_ZERO_CREDIT`, every credit field is zero, and this cell
does not prove integration, public issue translation, serializer behavior, or
the full feature-ledger denominator. The result spelling remains recoverable
only from the parent's unchanged source plus start/end UTF-16 offsets. No
candidate review can convert this isolated prototype evidence into tranche,
integration, or production acceptance.

The common parent-state observation reinforces that boundary. For the invalid
parent `"😀(.5.6%)"` begun at UTF-16 offset 2, all four parents ended in error
and rewound to offset 2, but `state.value` was the successfully parsed `.5`
leaf, not the frozen predecessor. This is parse-that sequencing behavior. It
is not a violation of the frozen leaf contract because `feature.json`
explicitly excludes parent value/offset-on-error, but any integrated parent
that assumes full state rollback would be wrong.

## Altitude 2 — G14 feature wave and evidence sufficiency

### Leaf state and no-throw

H and D fail atomically because their routed recognizers are single sticky
regex parsers. On a start failure, neither offset nor value changes. B and S
can write sign/intermediate values before aggregate failure, but their custom
outer transaction saves `{offset,value}`, calls the inner parser, restores
that exact pair on error, then reapplies `isError = true`. Against exact
parse-that 1.0.0, that is sufficient for this leaf's predecessor-identity
contract. None of the candidates writes `state.src`.

All four passed empty input, sign/dot partial input, nonzero ASCII offsets,
astral-prefix offsets, a low-surrogate start, immutable object/array and
primitive predecessors, 8,193-code-unit bounded attacks, incomplete suffixes,
and alternating reuse. No direct candidate call threw in those cases.

### Diagnostics

The hidden evidence proves an exact structural snapshot for diagnostics whose
furthest offset is already ahead: 5 of its 9 failure executions use that
profile, and the public replay adds 168 more per candidate. Candidate source
inspection agrees with the result: `mergeErrorState` cannot replace an ahead
record, and B/S restore offset/value without rolling diagnostics back.

The evidence overstates ordinary-diagnostic coverage if read broadly. Neither
frozen evaluator calls `enableDiagnostics()`. Their ordinary runs therefore
validate that `expected === undefined` is structurally permitted; they do not
exercise candidate-local expected-label arrays under enabled diagnostics.
They also do not exercise the package's diagnostic collection/recovery path.
My enabled matrix supplied bounded evidence for both gaps: every candidate
kept structurally valid ordinary fields, and every recovery composed to the
exact sentinel/end with one collected diagnostic. Expected text and furthest
positions differ across candidate topologies, which is allowed because the
contract assigns no stable ParseIssue fidelity credit to this leaf.

### Descriptors and UTF-16

The hidden descriptor assertion is substantive, not a key-only check. It
requires `Object.prototype`, exact `sign,type,value` order, ordinary writable/
enumerable/configurable data descriptors, extensibility, sign assignment,
type deletion/redefinition, and extension/deletion. All four pass. My assay
also proved fresh leaf identity after mutating a prior result.

The hidden UTF-16 rows include astral, mixed BMP/astral/BMP, and variation-
selector prefixes at offsets 2 and 4. My extra probes succeeded after an
astral-plus-ASCII prefix at offset 4 and failed transactionally when started
on the low surrogate at offset 1. Because candidates recognize only ASCII
number syntax with sticky parsing at `state.offset`, no code-point/code-unit
drift was found.

### Parent composition and recovery

The 15 hidden full-source parents cover all four declared kinds, with 6
acceptances and 9 rejections, including repeated fractions, incomplete
exponents, integer-only rejection, negative zero, prefixes, and delimiters.
On accepted parents the evaluator checks the exact leaf again. On rejected
parents it checks only `isError` and source identity, exactly as the feature
declares. It does **not** prove predecessor identity or value rollback at the
parent level; the common `.5` leak above proves why no such claim is available.

No frozen evaluator invokes `Parser.recover`. All four nonetheless survived
the independent recovery composition with enabled diagnostics. This is useful
prototype evidence, not a universal recovery guarantee and not a substitute
for an integrated parent's own state contract.

### Wave blockers

The G14 wave cannot promote. S has a reproduced cross-parser hard failure and
B/S have a published Parser-surface construction defect. Independently of
this seat's primary axis, the frozen benchmark result says it is a third
capture after two unpersisted runs, gives qualification credit zero, and marks
H, B, S, and D `FAIL_NOT_STRICTLY_FASTER_THAN_ALL_THREE_PEERS`. Thus even H/D's
hostile-state acceptance cannot satisfy the exact wave's all-axis gate.

## Altitude 3 — per-candidate verdicts

### H — rank 1 — ACCEPT on this axis

H has one atomic sticky whole-prefix regex followed by one result map. It
preserves predecessor identity naturally on failure, retains diagnostics ahead
of the attempt, produces a fresh exact mutable leaf, composes and recovers,
survives repeated calls without Parser allocation, and retains working Parser
introspection. No hostile state, no-throw, diagnostic, UTF-16, descriptor, or
composition counterexample was found. **Axis verdict: ACCEPT exact H
`ca17a811198a286c3e07ab06670b76b16f98c513d246696296dd4c3e4abffaa8`.**

### D — rank 2 — ACCEPT on this axis

D's first-code-unit dispatch routes to three atomic sticky regexes. Invalid
ASCII and non-ASCII starts fail without predecessor mutation; successful
branches emit the same exact leaf. Reuse is stable, `toString()` works, and all
state/recovery probes pass. It ranks behind H only because three duplicated
recognizers present more composition/drift surface than one whole-prefix
terminal. **Axis verdict: ACCEPT exact D
`a1e4fc2016362f4d1e4b49089c9580b85f6caa19d2adf91f60dd2dac412f8cd8`.**

### B — rank 3 — REJECT on Parser construction/introspection

B's static factorized graph passes the complete leaf-state matrix. Its outer
transaction is necessary and works: partial sign/fraction failures restore
the exact predecessor while preserving useful furthest diagnostics, and
recovery collects them correctly. It creates no Parser objects while calling.

The exported object is still a malformed published Parser. The custom
`new Parser((state) => ...)` supplies no `ParserContext`, so the inherited
public `consumeNumber.toString()` deterministically throws
`parserPrint: missing parser context name`; recursive parser debugging inherits
that defect. The frozen evaluators check only `instanceof Parser` and `.call()`,
so their all-pass result does not prove this construction surface. **Axis
verdict: REJECT exact B
`42e6e6a3662c5bb30858b845fe04ced565ff6f755e7edd54d703804285f4e913`,
despite semantic leaf/state PASS.**

### S — rank 4 — REJECT on call/global-state stability

S has B's context-free transaction and the same `toString()` throw. More
seriously, its `digits.opt().chain(...)` callback executes
`fraction.opt().map(...)` for every integer parse, constructing two new Parser
objects per call. The 1,000-call probe measured exactly 2,000 unexpected IDs.
The 1,048,600-call probe then pushed the module-global ID past 2,097,151 and
made a later memoized parser throw the exact RangeError above.

The candidate therefore violates repeated-call and cross-parser composition
safety even though every isolated result and bounded hidden case is correct.
The holdout's largest hostile strings invoke each candidate only once and its
61 cases cannot expose a cumulative global-ID leak. **Axis verdict: REJECT
exact S
`2edb390a542ebb98221c624934b14c009bc07c6b306cf7d4be1ccfcfd74202c8`.**

## Terminal disposition

**Primary-axis ranking: H > D > B > S.** H is the state-safe nominee; D is an
acceptable but duplicated state-safe alternative; B is semantically safe but
not a fully constructed published Parser; S is globally unsafe under ordinary
repeated calls. The evidence is strong for the frozen leaf contract but does
not prove enabled ordinary diagnostics, recovery, Parser introspection,
repeated construction stability, or parent value rollback.

**Final:**
`REJECT_G14_WAVE_FOR_APOTHEOSIS__ACCEPT_EXACT_H_ON_HOSTILE_STATE_AXIS`.
Preserve all candidate bytes for provenance. Any repair to B/S, evaluator
coverage, benchmark capture, or candidate set is a new generation.

**Credit:** parser `0`; feature `0`; benchmark `0`; integration `0`;
production `0`.
