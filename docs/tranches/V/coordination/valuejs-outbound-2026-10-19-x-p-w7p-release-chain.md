SERVED MODEL: claude-opus-5-5

# value.js → parse-that · bbnf-lang · latex-paper — X.P.W7P release chain landed (the `.z` relays)

**Provenance.** value.js tranche X, X.P.W7P (`docs/tranches/X/parse-that/waves/W7P.md`), step 5 `.z`, as X.P.W7 §"Sibling repos: written vs relayed" names (`parse-that/waves/W7.md`). The owner authorized this chain on 2026-10-19 (COHESION §0ge.5). This letter is file-only: delivery is left to the orchestrator, and no sibling working tree was written.

## Facts (verified 2026-10-19)
- `@mkbabb/parse-that@2.0.0` is published. Tag `v2.0.0` is at parse-that-x-p-w7 `96e68e9`.
- `@mkbabb/bbnf-lang@0.2.0` is published (dependency `@mkbabb/parse-that ^2.0.0`), with tag `v0.2.0`. bbnf-lang PR #1 (`x-p-w7-typescript`, head `5c7411f2c`, `typescript/**` only) is MERGED into origin/master as `2fe18f9c`. Local bbnf-lang master was not touched (still `af15f63e`).
- value.js `4038dce5a`: `@mkbabb/bbnf-lang` is now an exact `0.2.0` devDependency. The direct `@mkbabb/parse-that` pin is removed: value.js imports none, so it resolves transitively at 2.0.0. The registry integrity matches the lockfile for both packages. `node scripts/gen-grammar.mjs --check` is a CI step after `test:css-equivalence`. value.js carries **no parse-that and no bbnf-lang at runtime**: the shipped CSS parser is the checked-in generated tables (`src/css/bbnf/generated/*.js`), and the paired bench's product bundle has 0 parse-that bytes.

## To parse-that
- **Program T.** `.p`'s four cures shipped in 2.0.0 on T's result/diagnostics surface (X.P.W7 decision 3, arm (a)). T's coordination checkpoints were the release gate. Please record them as your surface's installment.
- **Program U.** PT-R stays a language contract, and the TS leaves stay on irregexp. **U.W7 ("packed value.js adoption") retires**, because value.js has no parse-that at runtime. value.js's **VALUEJS-PT-E** ask letter is CLOSED: `.p` answers its `mapState` and benign-failure asks (`docs/tranches/V/apotheosis/parser-proof/PROFILE-ANALYSIS.md` §3 O-6).

## To bbnf-lang (SK-V26)
- E026/R3 is stale. value.js consumes the TS package at build time only (`bbnf gen`), from 0.2.0.
- The TsEmitter ruling (X.P.W7 decision 5, COHESION §0ck): the Rust `crates/core/src/backend/ts` is left untouched. The TS package's emitter is value.js's output of record for TypeScript.
- The TS package's value semantics (positional concatenation, §0ck) are the behavioural reference for SK-V26's TS v1.
- Your local master and its uncommitted sk-v25 paths are yours. The merge landed on origin only. Your next pull of origin/master brings in `2fe18f9c` (`typescript/**` only).

## To latex-paper
- latex-paper stays on `@mkbabb/bbnf-lang ^0.1.1`. 0.2.0 is breaking within 0.x and does not enter that range, so no action is needed.

**Nothing here needs a reply to proceed.** An acknowledgement row in your inbox discharges the `.z` relay gate.
