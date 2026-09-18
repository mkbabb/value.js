# SYNTAX-NUMBER-START G7 — root gestalt

**Verdict: REJECT before candidate code.** G7 closes the G6 type and verifier
defects and correctly specifies CSS Syntax §4.3.10, but it freezes the wrong
parse-that feature boundary. An always-successful, zero-width
`Parser<boolean>` classifies source position; it does not recognize a distinct
grammar language on success versus false. Carrying that tokenizer predicate
forward as a standalone parser would preserve the lexical decision seam the
2026-07-22 reset explicitly removed.

No H/B/S/D/R candidate was authored or executed. The confidential holdout was
never revealed or executed and was permanently destroyed after rejection.

## Exact subjects

| subject | SHA-256 | bytes | verdict |
|---|---:|---:|---|
| `manifest.json` | `0927a5e276f3d3902b6b9a0d5b353d06ffc6131d51a2f5370be03fa9da64b37c` | 6,668 | REJECT |
| `feature-public.json` | `b3cf8f8f0dc4d84399dd853ca93070ac5f412ff1fa99d316f856ec82f3f90a46` | 15,611 | superseded precursor |
| `holdout-receipt.json` | `fc5fda34c0912fcbf7b1cd45797871b3734fbed6cfad5a4732adee854354682f` | 11,856 | applicability only; holdout destroyed |
| challenge A, specification | `73eaab221d69b335a7a2021298d408752915be3321180182c07c68728af942da` | 19,381 | ACCEPT narrow semantic boundary |
| challenge B, architecture | `f5fc571456cc722bad83b3d0049103b1492cc2e54a219e521dbb7b7e3ff0d9d1` | 19,401 | REJECT feature and verifier closure |

Both challenges independently reproduced the exact manifest, public precursor,
holdout receipt, all 22 declared closure rows, and the 256 × 196 = 50,176
holdout arithmetic. The split verdict is substantive rather than an identity
disagreement.

## Three-altitude adjudication

### Total tranche

Challenge A is correct that §4.3.10 has a coherent truth table and that
`value-unit` owns consuming numeric grammar. Challenge B is correct that a
named tokenizer algorithm does not automatically deserve a parser module.
Direct grammar composition should consume or assert the numeric prefix through
ordinary success/failure structure. It should not return a total boolean that
downstream code must inspect with a second semantic dispatch.

The deciding test is architectural usefulness after the tokenizer layer is
removed. G7's composition witness continues through its following parser on
both `true` and `false`; it proves state plumbing, not numeric grammar. Its
diagnostic sandbox exists largely to undo failed-terminal bookkeeping so that a
false recognition can be converted into successful boolean state. That is a
strong signal that the boundary fights the combinator engine rather than using
it idiomatically.

The truth table remains valuable fixture evidence. It belongs inside the
formation of the consuming number/integer/percentage/dimension productions, or
inside a local success/failure lookahead only where a concrete consumer proves
the assertion is needed. It does not earn a separately integrated parser root.

### Formation generation

G7 repaired real G6 defects:

- externally supplied owner-sealed manifest identity;
- running-verifier self-row binding;
- strict two-root TypeScript program with ledger-bound tool/dependency inputs;
- exact direct `numberStart: Parser<boolean>` type proof;
- zero-source active base and one-row overlay/projection;
- fresh balanced confidential holdout.

Three pre-code blockers nevertheless remain:

1. the feature boundary is a tokenizer/predicate seam rather than an
   independently useful grammar production;
2. the 22-row closure binds G6 re-export files/manifests but does not reproduce
   the live G5/G4 contract and harness leaves that execute the observations;
3. the TypeScript host checks the candidate through a disk-backed root after
   hashing captured bytes, leaving a check/use window in which the receipted
   bytes and typechecked bytes can differ.

The second and third defects require a new public closure and verifier. The
first requires a new feature identity. None is an in-place G7 repair.

### Feature

`SYNTAX-NUMBER-START` receives no parser, integration, benchmark, or feature
credit. Its public §4.3.10/§3.3 fixtures and the exact rejection docket may be
inputs to a successor consuming numeric feature, but no hidden G7 byte or
result may be reused.

The successor boundary must be a grammar-shaped operation actually consumed by
the module DAG—for example, a numeric representation production with separately
typed number/integer/percentage/dimension compositions. It must not re-merge
conversion, unit dispatch, or the EOF observation door merely to avoid the
predicate. Its formation must prove the smallest composable consuming seam.

## Binding next-generation requirements

1. Select and twice-challenge a consuming direct-grammar feature boundary;
   candidate authors must be allowed to contest its decomposition.
2. Keep §4.3.10 truth vectors as numeric-prefix evidence, not a standalone
   exported `Parser<boolean>` contract.
3. Flatten or recursively validate every executable contract/harness/fixture
   leaf in the exact public and holdout execution closure.
4. Serve the candidate TypeScript root from captured in-memory bytes, compare
   the program source text to those bytes, and revalidate the overlay before
   receipt close.
5. Form a wholly fresh holdout only after the new precursor freezes; do not
   recover, infer, or reuse G7 hidden material.
6. Require two fresh boundary challenges and root gestalt before any candidate
   source, then retain the five-author → five-skeptic → three-adjudicator law.

## Destruction and mutation receipt

| field | value |
|---|---|
| hidden plaintext copies | 0 |
| hidden ciphertext copies | 0 |
| hidden key copies | 0 |
| same-byte hidden copies | 0 |
| decrypted copies created during destruction | 0 |
| candidate sources written | 0 |
| candidate executions | 0 |
| active grammar TypeScript sources | 0 |
| production execution | none |

