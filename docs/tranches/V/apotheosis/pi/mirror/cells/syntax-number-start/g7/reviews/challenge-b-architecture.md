# SYNTAX-NUMBER-START G7 — independent architecture challenge B

**Verdict: REJECT before candidate code.** The repaired G7 verifier is a much
stronger type and identity floor than G6's, but the frozen feature boundary is
not an idiomatic direct-grammar boundary. An always-successful, zero-width
`Parser<boolean>` is a source-position classifier: as a parser it accepts the
empty string on both the true and false arms, so it cannot gate a numeric
production without a second semantic dispatch. That is the lexical seam this
reset is supposed to remove, not an independently useful grammar production.
The exact subject is `g7/manifest.json` SHA-256
`0927a5e276f3d3902b6b9a0d5b353d06ffc6131d51a2f5370be03fa9da64b37c`
(6,668 bytes).

MODEL: `GPT-5 Codex agent (exact served build not exposed)`  
REASONING: `inherited session setting (exact label not exposed)`  
WORKFLOW: `fresh independent exact-byte three-altitude architecture/idiom challenge, v1`

I began from the presumption that the boundary, topology claims, promotion
closure, and benchmark were wrong. I did not read the sibling G7 challenge,
inspect a candidate directory, locate or read any private/ciphertext object,
read hidden bytes, inspect a prior hidden receipt, or create or execute a
candidate. I used only read-only hash/content assays over the named public
inputs and the installed ledger-bound package. No temporary file or governed
candidate was created.

## Exact-byte reproduction

The three named identities reproduce:

| object | bytes | SHA-256 | result |
|---|---:|---|---|
| `manifest.json` | 6,668 | `0927a5e276f3d3902b6b9a0d5b353d06ffc6131d51a2f5370be03fa9da64b37c` | exact |
| `feature-public.json` | 15,611 | `b3cf8f8f0dc4d84399dd853ca93070ac5f412ff1fa99d316f856ec82f3f90a46` | exact |
| `holdout-receipt.json` | 11,856 | `fc5fda34c0912fcbf7b1cd45797871b3734fbed6cfad5a4732adee854354682f` | exact |

The public precursor, manifest, and holdout receipt contain the same 22 rows in
the same order. Every live row reproduced both byte count and digest:

| # | path | bytes | SHA-256 |
|---:|---|---:|---|
| 1 | `contract.ts` | 190 | `9e8a24d12444f7631bf5fa66e1c7011a20e32f1bc0d80ac488df758b9f96db3e` |
| 2 | `harness.ts` | 188 | `c595d3ad5ddba2996bf55c7e166e5f6f08342fffa668e20687087d0f09e56932` |
| 3 | `benchmark-protocol.json` | 1,054 | `b3939805eb229ce6b010386db04a833a2ed22a4ab61bcb245703a911410a6e90` |
| 4 | `promotion-protocol.json` | 7,286 | `64e37760ea312f69759800abc6a9d593bcdaa583b2cbb4d7268bdc91beb9dab8` |
| 5 | `promotion-verifier.mjs` | 31,585 | `7e22b43b386ff4a38d24f6f6f978a13ca0310b9ea06fac1140eb3737821badf5` |
| 6 | `../g6/contract.ts` | 175 | `e8e1f82bd0eafafc3795fa4cddbd04dd22d5653e4364b5b6e6f3468017b3d51e` |
| 7 | `../g6/harness.ts` | 187 | `8de9fbd556b3f4cc95e3d99fd32615401c4ebb7fdc26500231d1a37d2ad7cb4d` |
| 8 | `../g6/benchmark-protocol.json` | 7,220 | `a3cfc5356d535c4a8a100bb7301cf58b7775479db04d5d0b69249b58bf72a4ed` |
| 9 | `../g6/feature-public.json` | 19,707 | `8a5559937ce73bd0db576fb36a35427a182c0cf682cae42c50781552e6a8c667` |
| 10 | `../g6/manifest.json` | 7,663 | `fc3c059accc160841c391bb20bee0364e2defb3b69a8661ae00cfc9fa0e1f064` |
| 11 | `../g6/reviews/challenge-a-specification.md` | 12,889 | `89b112ab2621b4a21c281af706c826ff218875833c61430b432fa4312dbcb29c` |
| 12 | `../g6/reviews/challenge-b-architecture.md` | 8,468 | `0809fb83866d14fddf22eb795a1ec136d11485d42e8a3f48116292428eb5ff2c` |
| 13 | `../g6/root-gestalt.md` | 3,160 | `3866bc53927393dab1372598db5ca6510bd98c8aec7d3a11a15fcf4962ceb6da` |
| 14 | `../g6/rejection.json` | 1,861 | `ce4ad499fcb180b79826036c6798528ad8490367924982c409d7f7d40d790612` |
| 15 | `../g6/typescript-package.ledger` | 12,054 | `3a08d88df997493df6c0dc751d81e52377f155defada21c1a0a7d4d0df048f47` |
| 16 | `../g3/parse-that-dist.ledger` | 5,586 | `998c5668fa103e4692d69f48a0665f152cb1d014b11fa668c99693307ef1690b` |
| 17 | `../../../apotheosis/clean-base.json` | 1,177 | `dcece5fb104fbcbf1f87ec5d548307f38a0a18bf98bfdb9a771aef0bd7da37d2` |
| 18 | `../../../package.json` | 755 | `b15f2948615b3ab979fdd1c356d5cbdaee3639115e07930d4041ccc77b3cd3af` |
| 19 | `../../../package-lock.json` | 69,400 | `489c5981ffa75d795cd3fae0e6d5a837b272ffec1633d862dba9c11a59e668b7` |
| 20 | `../../../../MODULE-DAG.md` | 4,880 | `291e51451d84f2fd41adb8b9a31b3c33cf1503b6f47019a06e16702c98daca8f` |
| 21 | `../../../../FEATURE-LEDGER.md` | 13,998 | `16a95950a51432b31615d0c9b714b2024b811b360f4d0e7546caa1ea1ad766b3` |
| 22 | `../../../../ADDENDA-07.md` | 20,954 | `78a5bdb753fec5efb61311db570930bc2af80757531054b9ee3c415e98ee26d5` |

There were 22 reproduced rows and zero mismatches. Serializing them exactly as
`<sha256><two spaces><path><LF>` yields 2,013 bytes and SHA-256
`b42ef703d423c5a469646578dcf4b83052f4121061bdf028a7129a4acb06f6a7`,
matching the holdout receipt. Its arithmetic also closes:
`256 * 196 = 50,176`, with 128 true and 128 false cases. This grants exact
receipt applicability, not hidden-corpus truth by inspection.

## Blocking finding B1 — the root is a predicate seam, not a direct grammar production

The public contract requires `numberStart: Parser<boolean>` to succeed on
every input, consume nothing, and return `true` or `false`. In parser-language
terms, therefore, it recognizes the same language on both outcomes: the empty
string at every position. The boolean is preclassification state. A consumer
cannot use ordinary success/failure composition to select the numeric path;
it must inspect the semantic boolean with `chain` or equivalent and then choose
another parser. The public composition witness makes the defect visible:

```text
string(prefix).map(predecessor).next(numberStart).skip(string(continuation))
```

That composition continues through `continuation` for both `true` and `false`.
It proves state/value plumbing, not that `numberStart` gates or participates in
a numeric grammar.

The exact inherited occurrence map reinforces this conclusion. Three claimed
consumers are CSS Syntax §4.3.1 plus/minus/dot **tokenizer dispatch** sites; the
leading-digit dispatch is explicitly a non-occurrence; and one remaining
consumer is the consume-number precondition. The V·π reset, however, forbids a
generic token root, token objects, and a lexical runtime. Preserving the
tokenizer's preliminary three-code-point decision as a standalone parser after
removing its token-dispatch consumer carries the old lexer boundary into the
new architecture. The consume-number production does not rescue the split:
its direct parser can own the numeric prefix alternatives, or a local
success/failure lookahead can guard it without exporting an always-successful
boolean classifier.

This is not an argument against the normative truth table. CSS Syntax §4.3.10
is exact evidence for the six true prefix arms. It is an argument about the
chosen parse-that boundary. The ledger law requires an independently useful
grammar operation with a grammar-shaped result, not every named step of the
specification's tokenizer algorithm as a parser export.

The installed, ledger-bound `@mkbabb/parse-that@1.0.0` makes the alternative
concrete. `Parser.peek()` is explicitly a zero-width positive assertion: it
succeeds only when its inner parser recognizes input and otherwise fails.
Prefix alternatives followed by `peek()` therefore compose as grammar. Better
still, the future consuming number parser can own those alternatives once,
avoiding a lookahead plus a second parse. The manifest offers no evidence that
either direct construction is unsafe.

Instead, the frozen boundary makes ordinary combinators fight the engine.
Failed `string`, `regex`, `any`, or `dispatch` probes update
`furthest`/`expected` and may replace or mutate the diagnostic arrays. Because
the predicate must then turn failure into successful `false` while preserving
every diagnostic identity, H/B/S/D-style candidates need a custom `Parser`
wrapper that snapshots and repairs engine bookkeeping. G7 expressly permits
this "diagnostic sandbox." A boundary that requires bespoke rollback around a
three-character lookahead merely to simulate a total boolean function is not
the KISS/direct-combinator seam. It also conflicts with exact MODULE-DAG
invariant 5: a narrowly scoped terminal algorithm needs an explicit waiver
proving ordinary parse-that composition cannot safely express it. Here the
published engine supplies the ordinary lookahead primitive and no such proof
or waiver exists.

`value-unit` is the right family for actual number, integer, percentage, unit,
and dimension productions. That family placement does not establish that
`value-unit/number-start.ts` is an independent module or root. The active base
has zero TypeScript grammar sources, `numberStart` has no public root, and no
reachable consuming production exists. The MODULE-DAG acknowledgement is
carefully limited to the family graph and grants no feature or conformance
credit. The exact pre-code evidence thus does not justify this finer boundary.

### Effect on the five planned lineages

H/B/S are candidly allowed to collapse to one explicit-branch lineage; D uses
first-character dispatch; R uses one bounded terminal expression. Those can
be three different *inner classifiers*, and the return-to-formation clause is
sound. They are not five independent answers to the architecture question:
every seat is constrained to the same always-successful boolean seam, and most
must carry the same state-restoration shell. R may avoid much of that work with
one optional bounded regex, making the supposedly architectural comparison
largely a contest between engine-diagnostic overheads created by the contract.
Five source reviews cannot validate a feature split that candidate authors are
forbidden to question.

The local benchmark is comparably scheduled for the five exact candidate
operations, includes candidate-local rollback cost, balances order, and makes
external regex/BBNF peers `NON_COMPARABLE`. Those are good reservations. But it
times the isolated classifier, not a consuming numeric grammar or a real
dispatch consumer. A strict win within that artificial door cannot establish
that retaining the door improves the direct parser. G7 correctly withholds
integrated/full-feature performance credit; it cannot use that future
reservation to justify the present boundary.

## Blocking finding B2 — the 22-row set is not the executable harness closure

The reproduced rows authenticate the two small re-export files but omit the
files those exports execute:

```text
g7/contract.ts -> g6/contract.ts -> g5/contract.ts -> g4/contract.ts
g7/harness.ts  -> g6/harness.ts  -> g5/harness.ts  -> g4/harness.ts
```

The current unlisted leaves are not incidental. `g5/harness.ts` implements the
default-`undefined` lanes and imports the G4 observation machinery; G4 carries
the public case materialization and primary state/diagnostic checks. Their
current identities are:

| unlisted executable input | bytes | SHA-256 |
|---|---:|---|
| `../g5/contract.ts` | 1,308 | `19b5986cc18df6f798afcab2a53e4f72046a0cbc788543ee94baa46b3606339b` |
| `../g5/harness.ts` | 13,128 | `3f60d0be173947d93d1bf2cc1b55d38314d0146ef74b2b8c4e3b84c36999bf1b` |
| `../g4/contract.ts` | 1,207 | `cec73b16fe84603eeb485dea3bb2d789aa4cb66bc8ad230d71faf2da17e2e0b9` |
| `../g4/harness.ts` | 11,879 | `92ac650855113414b80a49d954a507f33c6461d9b62fa6b363530fb086949f05` |

The exact G6 manifest contains historical rows that *describe* these hashes,
so its digest is a useful Merkle-style commitment. G7 does not recursively
reproduce those leaves, however: the holdout receipt says it reproduced the 22
G7 rows, and the promotion verifier checks its own manifest row plus the tool
inputs it needs, not the contract/harness import graph. Mutating a G5/G4 leaf
would leave all three named G7 identities and every one of the 22 live-row
checks unchanged while changing what an import of the G7 harness executes.
There is no sealed semantic runner in the G7 closure that recursively validates
the predecessor manifests before correctness or holdout execution.

This matters after source close, not merely at formation. The confidential
corpus may be immutable while the code that makes the 50,176 observations is
not bound by the running G7 ledger. The procedural reveal law cannot repair a
semantic execution whose transitive harness bytes are not part of the exact
candidate/holdout receipt.

A recut must either flatten every runtime/type/fixture leaf reachable from the
G7 contract and harness into the G7 closure or seal an executable recursive
closure validator and require its complete leaf ledger in public, candidate,
benchmark, and holdout receipts. Hashing an older manifest is necessary but is
not the same as reproducing the live imported leaves.

## Blocking finding B3 — the isolated compiler can typecheck bytes other than the receipted candidate

G7 correctly reads and hashes the candidate, applies the AST floor to that
captured text, and re-reads the disk file once at entry to
`verifyCandidateTypeProgram`. It then creates the TypeScript program with the
candidate path as an ordinary disk root. Unlike the in-memory probe, the
compiler host does not serve the previously captured candidate text. It calls
the original disk-backed `getSourceFile`, and after program creation it records
the old `candidateBytes` in `resolvedInputs` without comparing those bytes to
`candidateSource.text` or re-reading the file at close.

There is consequently a check/use window:

1. bytes A pass the source floor and are hashed;
2. the entry re-read still equals A;
3. the file changes to bytes B before the compiler host loads it;
4. TypeScript checks B, while the receipt records A as the candidate and
   resolved compiler input.

No governed candidate or mutation assay is needed to establish this; it follows
directly from the verifier's two different input paths. A race may be unlikely,
but an "exact candidate" isolated-program identity cannot depend on filesystem
quiescence that the protocol neither states nor enforces. Serve the candidate
root from the captured in-memory bytes just like the probe, verify the resulting
`SourceFile` text/identity, and optionally revalidate the overlay tree before
emitting the receipt. That changes verifier and manifest bytes and therefore
belongs in a fresh generation.

## Evidence that survives the rejection

- The normative boolean classification, zero-consumption semantics, mapped
  retained-position domain, 256-case balance, 50,176-observation arithmetic,
  and public/hidden disjointness receipt are internally coherent. I grant no
  hidden-case truth beyond the sealed custodian receipt.
- The exact MODULE-DAG at `291e...ca8f` repairs family reachability and unique
  ownership without authorizing a token/CST runtime. `value-unit` remains the
  right owner for consuming numeric grammar.
- The G7 verifier closes G6's broad-project and weak-type defects in ordinary
  non-racing execution: two explicit roots, strict fixed options, a closed
  resolved-source allowlist, zero diagnostics, exact direct export inspection,
  bidirectional `Parser<boolean>`/payload probes, and declaration provenance to
  the ledger-bound parse-that `Parser`.
- The external manifest digest plus exact adjacent-manifest and self-row checks
  correctly bind the ordinary running verifier invocation to the supplied
  sealed bytes. Alternate caller digests remain nonconformant by protocol.
- With a zero-TypeScript clean base and one canonical overlay row, source,
  overlay, and projected grammar ledgers are equal and easy to audit. The
  verifier emits canonical roots and host runtime metadata. It does not enforce
  `<seat>` ancestry of the caller-supplied overlay root, so the future custodian
  must reject receipts whose emitted root is not the declared H/B/S/D/R path;
  the current text does not earn a mechanical seat-path claim.
- The benchmark is suitable for descriptive, correctness-qualified comparison
  among implementations of this exact door. External token/BBNF peers are
  truthfully non-comparable, allocation evidence may be `UNAVAILABLE` only with
  the stated tool reason, and no integrated, regex-peer, full-parser, or
  production performance claim follows.
- The holdout receipt records no candidate execution or reveal, no plaintext
  filesystem copy, and a reveal point after five complete identities. That law
  remains a confidential-custodian procedure; no public bytes establish that
  execution has occurred or that a candidate passed.

## Mechanical nonclaims remain binding

Even after B3 is repaired, the AST and type mechanisms establish only a syntax,
dependency, type, and identity floor. They do not prove runtime truth, no-throw
behavior, diagnostic/state preservation, predecessor independence, absence of
casts, aliases, indirection, recursion, prototype/inherited coercion, source
derivation, scanner behavior, token/atom/component-value/CST naming hidden by
other spellings, bounded regex breadth, O(1) work/space, LOC/KISS, idiomatic
parse-that, material lineage independence, benchmark superiority, or
architectural fitness. The five exact-source skeptics must retain every one of
those axes for every candidate; an AST/type pass grants none of them. The full
CSS denominator remains RED, so no candidate, cell, integration, apotheosis,
public compatibility, or production credit can be inferred.

## Three-altitude disposition

### Total tranche

The direct-combinator reset, empty active base, acknowledged family DAG,
anti-scanner floor, five common-axis skeptics, and explicit denominator RED
status are sound directions. Turning a tokenizer predicate into the first
accepted numeric grammar root would nevertheless preserve the rejected lexical
decision seam and make later consuming grammar depend on a total boolean state
transformer. The architecture should be corrected before it becomes a shared
foundation.

### Formation generation

All named G7 identities and all 22 declared rows close exactly. G7 also repairs
the principal G6 type/verifier docket. Formation still fails because the row is
not an optimal direct-grammar operation, its executable observation imports are
not a reproduced leaf closure, and the isolated program does not use the
captured candidate bytes atomically. These are pre-code defects; no quintet can
retroactively fix them without changing frozen inputs.

### Feature

The truth table can survive as fixtures and as a candidate-local numeric-prefix
recognizer. Recut the feature around a consuming numeric production, or justify
a concrete separately reachable consumer and use an idiomatic success/failure
lookahead with an explicit MODULE-DAG waiver if a standalone assertion is truly
necessary. Benchmark the composable door that downstream grammar actually
uses. Do not freeze an always-successful `Parser<boolean>` merely because the
CSS tokenizer specification names the predicate.

**Required result:** REJECT exact G7 before H/B/S/D/R authoring. Do not reveal or
execute the G7 holdout and do not reuse it. Re-form the operation boundary,
close the executable contract/harness leaves, make the compiler consume the
captured candidate bytes, freeze new public inputs, form a wholly fresh holdout,
and obtain two fresh exact-byte challenges plus root gestalt. G7 earns no
candidate, integration, conformance, performance, apotheosis, or production
credit.
