# G16 synthesis — performance and tranche gestalt

## Nomination

**NOMINATE `h2` — SHA-256
`8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa`.**

I treated every candidate, the corrected evidence packet, and the five
unanimous skeptic verdicts as wrong until the exact bound bytes supported this
selection. I inspected no other synthesis report, communicated with no other
adjudicator, ran no timing, and changed no candidate or evidence artifact.

The synthesis subject reproduces SHA-256
`062bbafc1f2e8445fa6a84b6e56594c9425388b4c18a5f75887f5b2e8467d58a`.
Its five skeptic reports reproduce their bound hashes and all independently
return **ACCEPT**. The H, B, S, D, and H2 candidates, architecture selection,
correctness evidence, benchmark erratum, and raw timing stream likewise
reproduce every SHA-256 named by the subject.

## Performance adjudication

I independently reconstructed the sole immutable raw stream rather than
trusting its controller summary or the superseded descriptive result. It has
exactly 545 complete records under one attempt ID: one start, binding,
controller-environment, inference, and successful terminal record; 30 fresh
child processes with 30 semantic preflights and zero total stderr bytes; 360
retained paired sample blocks; and 30 process aggregates. There is no second
attempt or discarded block.

Every sample block records 320,000 operations per lane and identical work
digests. The retained total is therefore 230,400,000 lane operations. There are
180 H2-first and 180 deposed-first blocks. All logged block ratios reproduce
from their durations, and every process aggregate reproduces as the arithmetic
mean of its twelve paired log ratios. The 30 process aggregates are all below
zero; their minimum and maximum are approximately `-0.11472` and `-0.02191`.
The balanced order subsets are also consistent: their mean log ratios are
approximately `-0.07266` and `-0.07407`, so the selected result is not an
obvious lane-order artifact.

Recalculation from those 30 independent process units gives exactly:

- mean log H2/deposed ratio: `-0.07336197220979548`;
- sample standard deviation: `0.027244341177386378`;
- predeclared one-sided 95% upper log bound: `-0.06491032168356216`;
- geometric-mean time ratio: `0.9292644012517273`;
- one-sided upper time ratio: `0.9371515017780626`; and
- point-estimate time reduction: `0.07073559874827273`.

The strict upper bound remains below equality. The erratum is also exact: all
360 retained durations yield H2 median/MAD `21,818,104`/`576,396` ns and
deposed median/MAD `23,620,145.5`/`749,750` ns. It changes only four false
descriptive fields; it changes no raw observation, sample, estimator, candidate,
corpus, or qualification and performs no rerun.

The comparison is appropriately normalized for this feature boundary. Both
lanes create a parse-that `ParserState`, invoke the exact bound parser once on
the same source and offset, and return the same mutable `{end, leaf}` endpoint.
The deposed adapter derives the sign and integer/number classification that its
historical scalar parser does not return; this is necessary work to reach the
feature's common `{sign,type,value}` result, not oracle assistance. Neither lane
receives expected fields. Every timed row is in the explicitly declared common
domain, every child validates both lanes before timing, and equal work is
checked after each block.

This proves only the exact 64-row, Apple M5 Max / Node 26, normalized numeric-
leaf comparison against the exact deposed peer. It does **not** prove per-case
dominance, browser performance, a production distribution, full value-unit or
stylesheet throughput, or wins over every historical/full-parser peer. Those
remain mandatory integrated tranche rails. That limitation does not defeat
selection of this atomic leaf: the benchmark supplies the required narrow
strict win, while correctness and architecture independently select H2.

## Simplicity, hostile fitness, and integration

H2 is the best reviewed implementation for retention. H2 and H are tied at the
minimum 17 lines, but H2 is the exact candidate with the valid confirmatory
peer result. B and S expand one regular CSS Syntax leaf into 64- and 81-line
intermediate parser graphs without creating a reusable semantic boundary. D is
compact but duplicates the complete number language across three dispatched
branches. H2 instead uses one module-initialized parse-that `regex` terminal
and one adjacent semantic `map`; the entire regular language and projection
are readable at sight.

That is idiomatic use of a combinator framework, not a return to the rejected
scanner architecture. H2 has no source loop, manual cursor, slice-based
recognizer, token tape, atom/component-value object, CST, mutable cache, or
per-call parser construction. Its regex is ASCII-specific, sticky through the
published primitive, and contains no nested unbounded ambiguity or
backreference. The exponent is all-or-nothing and the leaf deliberately leaves
incomplete continuations to its parent.

The exact correctness evidence establishes 180/180 sealed cases, the frozen
public rail, and 65,024 independent test-only scanner-oracle transactions. It
covers maximal prefixes, incomplete fractions and exponents, repeated
fractions, UTF-16/nonzero offsets, ahead diagnostics, failure transactions,
parent rollback and composition, ordinary mutable result descriptors, hostile
bounded strings, stable repeated calls, and no per-call parser-ID growth. The
five fresh skeptics found no semantic, runtime, hostile, ownership,
architecture, or corrected-evidence blocker.

The downstream boundary is also disciplined. This leaf owns only CSS Syntax
consume-number recognition and `{sign,type,value}` projection. Percentage,
dimension units, integer constraints, range bounds, delimiters, whitespace,
EOF, diagnostics policy, and serialization remain parent productions. Its
proper location is the BBNF-aligned `value-unit/numeric` family, from which it
can support percentage/dimension and the first keyframe-to-stylesheet vertical
without introducing a second lexical runtime.

## Gestalt disposition

Exact H2 should be promoted unchanged if and only if the other two independent
synthesis adjudicators nominate the same ID and SHA. This nomination grants
credit only to the atomic `SYNTAX-CONSUME-NUMBER` feature. It grants no
percentage, dimension, keyframe, stylesheet, full-CSS, browser, integrated-
benchmark, production, or megatranche-execution credit.

After unanimous synthesis, the correct next move is direct composition into
percentage/dimension and the value-unit-to-keyframes vertical—not another
generation of admission machinery around punctuation or wrappers.
