# SYNTAX-NUMBER-START generation 3 — specification/formation challenge

**Verdict: REJECT.**  
**Model:** `gpt-5.6-sol`  
**Reasoning:** `ultra`  
**Workflow:** `v2`, exact-byte adversarial specification/formation challenge

All fifteen inputs, pinned CSS source, occurrences, 406 unique public cases,
three hostile hashes, 64-file parse-that ledger, current nineteen-file grammar
base, typecheck, and absence of candidate source reproduced. The reviewer did
not request or inspect hidden bytes.

Blockers independently sealed before a late status-query contamination:

1. `ParserState.src` is absent from the state-preservation contract and
   harness, and the benchmark pool does not restore it. A candidate can mutate
   source through an alias, pass every test, and contaminate later candidates.
2. `ExportDeclaration` bypasses the claimed dependency gate.
3. Live base and installed parse-that bytes are not revalidated against their
   frozen ledgers during promotion.
4. Public EOF endpoints are incomplete. Positive `-digit`, `.digit`, and
   `+.digit`, plus negative `+`, `-`, `.`, `+.`, and `-.`, need explicit EOF
   witnesses; holdout bytes cannot be their sole proof.
5. The benchmark wording forbids diagnostic restoration inside timing even
   though candidate-internal sandbox restoration is part of the candidate's
   exact cost. Only harness/pool restoration belongs outside timing.
6. The named precursor feature bytes for the holdout are not retained.

The raw/preprocessed mapping, CSS semantic boundary, conservative three-
lineage accounting, and full-ledger gate are otherwise sound.

**Independence note:** after the verdict and principal `src`/promotion/
benchmark blockers were sent to root, an agent-status query unexpectedly
exposed the sibling review. No newly exposed overlap is counted as independent
discovery.

