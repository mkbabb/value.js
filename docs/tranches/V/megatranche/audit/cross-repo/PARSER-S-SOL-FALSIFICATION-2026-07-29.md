# parse-that Pass-3 S hostile Sol falsification

**Date:** 2026-07-29  
**Mode:** tranche development only  
**Artifact audited:**
`/Users/mkbabb/Programming/parse-that-css-totality/docs/tranches/B/artifacts/pass3/s`  
**Terminal:** **AMEND** — keep the large signal; reject admission framing

## 1. Primary timing boundary is unequal

The control is called through production `Parser.parseState()`, including
packrat epoch handling, fault normalization and error rendering. The candidate
uses a private `Compiled.parseState()` that only constructs `ParserState` and
invokes the parser.

Fresh reproduction:

- original full-corpus floor 75.87×, median 82.37×;
- original 96-name floor 11.72×, median 11.86×;
- candidate wrapped once in the same production boundary: 96-name
  8.97×/10.13×/10.17×, floor **8.97×**;
- one matched-boundary full run remains 71.39×.

The speed signal is real, but the frozen-scale ≥10× admission claim is not.

## 2. Duplicate choice diagnostics diverge

For `any(string("a"), string("ab"), string("a"))` at a nonzero offset,
production reports labels `["\"a\"", "\"ab\""]`; the compiled candidate
reports `["\"a\"", "\"ab\"", "\"a\""]`.

The candidate installs a new-frontier label slice without production's
membership deduplication. Success priority survives; the complete diagnostic
product does not.

## 3. Webref plane measures ordered-prefix choice

The harness asserts equality between control and candidate, but not equality to
the full input name. In Webref order, 487 of 753 names are shadowed by an
earlier prefix; for example, `animation-delay` succeeds as `animation`.

This is valid equal-product evidence for authored ordered choice. It is not
property-name recognition or exact 753-name classification. Either label it
accordingly or add a delimiter/whole-name plane with value/span assertions.

## 4. Baseline and statistics remain insufficient

- The durable baseline is rejected M3, not accepted M2.
- A transplant onto M2 still showed a strong signal, but no durable
  multiprocess M2 floor/median exists.
- Warmup and fresh processes are adequate.
- Process order is always closure then staged, not AB/BA.
- Individual batch observations are discarded.
- Observed process minimum is not a confidence bound.

## 5. Memory is authored-shape-sensitive

The 271,056 typed-array bytes are arithmetically correct. The 1.41× retained
ratio is valid only against the frozen control shape with 753 separate
span-wrapper parsers. An equivalent single outer-span control retained about
254,180 bytes, making the candidate about 2.29×.

Report both control shapes. Do not universalize 1.41×.

## 6. V8 and proof wording corrections

- Hot candidate parser functions optimize without named bailouts.
- Candidate construction helpers are dependency-deoptimized, so “all
  unrelated” is too broad.
- Each trace has 48 GC events: 45 scavenges and 3 mark-compacts, not 48
  scavenges.
- Package suite is 132 passed + 2 skipped = 134 total, not 134 passed.
- Clean archive reproduction needed the checkout's untracked data symlink.
- Artifact manifest omits source hashes for the kernel/profile drivers and
  records the parent rather than exact artifact head.

## 7. Runtime boundary

The prototype is source-direct UTF-16 with no token/event tape or fallback, so
it does not violate the scannerless terminal law. Its separate
Grammar/literal/choice/compile/Compiled/StagedPlan hierarchy is nevertheless a
parallel research runtime. It remains admissible only under
`test/prototypes/**` and unexported. It cannot land as-is.

## Smallest S-evidence amendment

1. Deduplicate new-frontier labels and add duplicate/nonzero-offset coverage.
2. Benchmark both sides through the identical boundary.
3. AB/BA rotate, retain batches and calculate bootstrap CI-low.
4. Correctly label ordered-prefix choice or add whole-name recognition.
5. Report outer-span and authored-shape memory.
6. Correct GC/test wording and seal exact source/head/data inputs.
7. Withdraw the 96-name ≥10× claim unless it survives the corrected assay.

No production export, CSS surface or second runtime follows from this evidence.

