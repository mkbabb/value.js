# `SYNTAX-NUMBER-START` generation 0 — specification boundary REJECT

**Exact reviewed manifest:**
`8083052ad158dc9381c877ce1d0ead1b459749498f142a0a654cf323fde96960`.

## Blockers

1. The imported parser is specified for any valid UTF-16 offset, but the
   contract/harness observes only `parseState(source)` at offset zero. An
   absolute-origin implementation could pass every fixture yet fail at offset
   2 in `xx+.5`. Nonzero composition, astral-prefix offsets, unchanged offset,
   and a downstream sentinel must be observable.
2. The occurrence matrix incorrectly counts the leading-digit consume-token
   branch as a caller of the number-start predicate. CSS Syntax directly
   reconsumes a digit and consumes a numeric token; only `+`, `-`, and `.` use
   the predicate in that dispatch algorithm.
3. The claimed raw/preprocessed equivalence is under-specified by fixtures.
   CR, CRLF, FF, lone high/low surrogates, and transformations in the second or
   third inspected position need public cases; a valid astral pair is not a
   surrogate code point after decoding.

The authority hash, atomic operation split, public polarity, hostile hashes,
holdout sequencing, and prepare-only tranche admission were otherwise sound.
Any repair changes sealed public inputs and therefore requires generation 1.
