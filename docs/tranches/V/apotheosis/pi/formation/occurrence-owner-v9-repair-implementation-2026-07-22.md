# V9 occurrence-owner repair — implementation receipt

**Date:** 2026-07-22  
**Status:** `GREEN_REPAIR_RESEARCH_ONLY_ZERO_DENOMINATOR_CREDIT`  
**Authority:** corpus-analysis tooling only. This is not parser code, a full
denominator, a launcher, a publisher, a movement gate, or production execution.

## Rejected inputs

This repair preserves the exact original subject as rejected evidence:

| artifact | bytes | SHA-256 |
|---|---:|---|
| rejected analyzer | 27,806 | `8d31d5189599f03be502aab450b5f17a9615d499c29dabc9a657eda4e69323da` |
| rejected oracle | 14,073 | `19c9dd905990129d48a37eeb7d8667482cf61f8fec9b95e2574ddacdbd659ec2` |
| rejected test | 19,213 | `7378e6514359252e9fcd6ce726f9c76053a1d913b73e7d9e0c8f4430aeaa56ab` |
| challenge A | 26,357 | `d37b05dedab2973f10b09dcc86a24b9ed5919473e2a1f528b2af758ee4bbd2ad` |
| challenge B | 30,503 | `33cdf9e8e3b220b093d96658fa6fa3012de8b11d6b1f3141e4030a19c65f08b5` |

Both exact challenges were read in full. Their `REJECT` verdicts remain
unchanged.

## Repaired exact subject

| artifact | bytes | SHA-256 |
|---|---:|---|
| `denominator/tools/occurrence-owner-v9/analyzer.mjs` | 36,243 | `5b084bfba01f5fcf8979aaed7a3be21a326cbef070f0cffd2e9599e1e6c1fb9e` |
| `denominator/tools/occurrence-owner-v9/oracle.mjs` | 37,680 | `5c4e1f65f5eaeefd886fa63ac2aa6d771adda9bbd13b6a4169b1d5f77b5e4afd` |
| `denominator/tools/occurrence-owner-v9/test.mjs` | 25,356 | `2e09d97a7af648c81b072b2cf67f2682ee2e427e9b4f074a0f3a1ad33c3d965b` |
| repair evidence | 6,501 | `b7316ed3d3beef7a10fb39ec73d4cb8f5f254083a0c7851ca85f77e7248090b3` |

The repaired subject resolves the confirmed in-boundary defects:

- physical-line ATX admission, inline-tag heading projection, and Setext
  headings;
- valid raw end-tag boundaries, quote-aware close ends, and non-void slash
  syntax;
- Unicode-scalar escape ownership and exact escaped-delimiter intervals;
- explicit empty-href omission rather than an invalid zero-width candidate;
- disposition-gated definition joins;
- stack-paired nested same-name owner intervals;
- operation-ledger joins by exact source SHA-256, pinned URL, byte locator,
  kind, and anchor—not ordinal sequence;
- full SHA-256 candidate/carrier IDs with collision visibility;
- source-derived independent oracle checks for state, tag, occurrence,
  disposition, omission, heading, carrier, definition-target, operation, base,
  and work-suppression semantics.

The repeated whole-source lowercase and raw-suffix parse defects were removed.
The analyzer lowercases once, raw-close probing advances monotonically without
reparsing the remaining suffix, and reference close positions are indexed once
per bounded state range. The false `8*N+64` assertion was not replaced by
another invented bound: the result now says
`INSTRUMENTED_LOWER_BOUND_NOT_FORMAL_COMPLEXITY_PROOF`, rejects suppression of
that instrument, and assigns **zero** formal complexity credit.

## Replay

All three sources pass `node --check`. Three complete test outputs—two from the
workspace and one with `/tmp` as CWD—are byte-identical:

| output | bytes | SHA-256 |
|---|---:|---|
| deterministic test JSON | 10,148 | `b7dd3b9c0eb4f12a50a70e77247aa404a753bfbbc8dc38f5782d745f346c1dd4` |

The deterministic run covers:

- 18/18 frozen V9 fixture cases;
- 29/29 inherited V8 evidence cases, truthfully classified as V8-code replay;
- 12 confirmed semantic counterexamples;
- 12/12 independent semantic mutations rejected, including full omission,
  fabrication, state substitution, source-base substitution, owner
  fabrication, and complete work-counter suppression;
- 512 deterministic arbitrary-byte sequences (130,605 input bytes; 237,348
  decoded UTF-8 bytes) without a throw;
- all 13 declared states;
- 25 geometric rows across valid raw elements, invalid raw ends, unterminated
  references, nested same-name elements, and ATX lines at sizes
  32/64/128/256/512.

One local `/usr/bin/time -l` observation on Node v26.0.0 / arm64 / macOS 26.4.1
was 0.25 s and 88,965,120 maximum-resident-set bytes. It is a fixture/hostile
suite observation only, not a full-corpus measurement or benchmark credit.

## Still RED

No one may run or publish the 168-source denominator from this receipt. The
complete independently reviewed normative operation ledger is absent; the
14,609,103-byte universe has not run; container and complete definition outputs
do not exist; launcher/runtime/dependency/post-import custody does not exist;
arbitrary-output regeneration, publisher, fsync/rename/crash rails do not
exist; and no formal resource proof or full-corpus RSS exists.

This exact repaired subject now requires two fresh independent hostile
challenges and root gestalt. It earns zero denominator, semantic, owner,
operation, compatibility, conformance, parser, feature, cost-lattice,
movement, integration, and production credit until that governed sequence
closes.
