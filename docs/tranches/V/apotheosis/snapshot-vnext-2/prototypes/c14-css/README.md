# C14 published-engine CSS assay

This directory is an isolated **formation prototype**, not tranche execution and
not production CSS support. It consumes exactly the published registry artifact
`@mkbabb/parse-that@1.0.0`; it never links to a workspace, imports package-private
files, or reads parse-that source.

The 15 files in `src/css/grammar/l4/` are the filename/import-topology peers of
the 15 formation-current BBNF runtime stems in
`../../CSS-MODULE-ISOMORPHISM.json`. There is deliberately no barrel. Each module
has one external test peer. Full production/semantic equivalence remains P01
RED. `pretty.bbnf` remains a serialization oracle only: exact untouched emission
and non-overlapping source edits live in `src/css/serialize.ts`, not in a second
parser runtime.

Only W0 is a product-shaped vertical: `oklch()`, `cubic-bezier()`, and one
qualified stylesheet rule. The remaining modules are thin executable edge and
responsibility witnesses, not CSS coverage claims. The typed boundary is:

```
source -> combinator CST (raw text + Span) -> Value-like semantic values
       -> complete token/trivia interval partition -> exact source / bounded edits
```

After this prototype is committed, run `npm run reproduce -- <commit>` from any
checkout. The harness exports only that commit's C14 tree to a self-cleaning
temporary directory, runs exact-lock `npm ci`, typecheck, all 17 tests, and the
registry-package plus 15-module proofs, then removes `node_modules` with the
temporary tree. It retains no private parse-that source and grants no P00/P01
or full-CSS credit. For local assay work use `npm ci`, then `npm run check`,
`npm test`, `npm run proof`, and `npm run bench`. The benchmark reports current
and historical adapters as
`ABSENT` unless their module URLs are explicitly supplied through
`C14_CURRENT_ADAPTER` and `C14_HISTORICAL_ADAPTER`; absent comparators never
become fabricated performance credit.

Compact evidence is retained in `proof/`: `package-receipt.json` binds the
registry artifact, `benchmark.json` binds one complete isolated sample vector
and runtime identity, `status.json` records the claim boundary, and
`corpus.json` binds every retained peer except its own recursively impossible
receipt row using locale-independent path order. The package proof byte-twins
the installed runtime/declarations to the verified registry tarball. `npm
install` output is intentionally not retained in V-next.
