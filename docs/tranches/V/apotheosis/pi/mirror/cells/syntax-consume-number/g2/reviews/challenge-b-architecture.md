# SYNTAX-CONSUME-NUMBER G2 — Challenge B: architecture, performance, and promotion boundary

**Verdict: REJECT.** The frozen G2 precursor and sealed ciphertext are byte-consistent and candidate-free, and the selected consuming-number semantic seam is appropriately smaller than a token/scanner feature. The promotion system nevertheless cannot establish the claims its command name and one-row projection imply. Do not invite H/B/S/D/R authors from this generation. Because precursor/config/holdout bytes are protected, lift the blockers in a newly formed generation with a fresh holdout; do not repair G2 in place.

## Altitude 1 — Semantic boundary, no-token seam, and candidate topology

The useful part of the boundary is narrow: one parser consumes the maximal CSS number prefix at the current UTF-16 offset and returns only `value`, `type`, and `sign`; representation and extent remain same-input `ParserState` observations. `Object.is` correctly makes negative zero observable, incomplete dot/exponent suffixes remain outside the extent, and number/integer/percentage/dimension witnesses reuse the same parser. This grants no token, scanner, source-map, serialization, contextual-range, or unit-dispatch credit.

That stated seam is not enforced exactly:

1. **The semantic leaf check is enumerable-string-key-only.** `harness.ts` lines 76–85 uses `Object.keys(actual)` and then reads the three expected properties. An object with enumerable `value`/`type`/`sign` plus a non-enumerable `raw`/`parts` field or a symbol-keyed token payload passes. Structural TypeScript exactness does not reject runtime surplus. This directly contradicts “owns no raw/parts/span fields.” The gate must use `Reflect.ownKeys`, require exactly three own data properties (and an agreed prototype), and reject accessors/symbol/non-enumerable surplus.

2. **The anti-scanner AST filter is spelling-based and bypassable.** `assertCandidateSurface` rejects only selected identifiers and dot-property accesses. Element access (`state["src"]`), destructuring (`const { src, offset } = state`), `Reflect.get`, aliased helpers, and state-bearing callbacks through the allowed `Parser` API (notably `mapState`) are not rejected. Global facilities require no import at all. The narrow import allowlist therefore does not prove absence of cursor/source slicing, scanner state, mutation, casts, aliases, or indirection; the protocol itself admits this nonclaim. An exact no-scanner boundary needs a positive construction grammar/AST allowlist plus runtime state-delta checks, or it must be explicitly manual and incapable of producing a mechanical promotion result.

3. **Seat names do not establish topology or orthogonality.** The verifier checks only that the canonical overlay path names one of `h|b|s|d|r`; it never proves the declared construction. Byte-identical source can be placed in all five seat roots and be independently accepted. B and S may collapse to the same `any`/`all` arrangement, while D can merely wrap that arrangement in dispatch; the public file already concedes H/B genealogy may collapse. No cross-seat digest inequality, normalized-AST comparison, lineage receipt, or independent-author identity is part of the sealed promotion path. Five labels are not five alternatives.

These are boundary blockers, not claims that a bad candidate currently exists. At challenge time there is no `candidates/` directory, governed `consume-number.ts`, manifest, candidate source, or active grammar TypeScript source.

## Altitude 2 — Byte closure, package-default gates, compiler capture, and promotion

The supplied identities and live precursor closure reproduce exactly. Formation is `f3e5a6c708129d8578364245d5c5da098def327533b89d431d7106e14cca1b67 / 6506`; holdout receipt is `bb6a4b9a5a57ba43cc7fb4ed6ceb2f9566e1928b768194bf620f026b94429380 / 4854`; ciphertext is `911371622d319acbaf8d5fac706244048bdfef3fcabd43620aee332e529489e8 / 56833`; and the proof config is `32ab097846458d2df074bc13e8682d605872cb6f6eef2fbd5b4fa7f05bbcca39 / 315`. All nine `precursor_byte_closure` rows match. The ciphertext has one final LF, canonical base64 round-trips, and decodes—without decryption—to `6f1dd4dfa713d5bad6de691ffce8ef9fd221539bcf9a5dc5df72463a51cc3fa3 / 42623`, matching the receipt. No key was sought and no plaintext was recovered.

Those exact successes expose five promotion blockers:

1. **The package-default gate is not transitively sealed.** `tsconfig.apotheosis.json` extends `./tsconfig.json`, but the parent (`a0d0395313c3eb6521ba9b8550345ba21e1dba49f8f68d7c56dfa330e736a1cc / 586`) is neither a manifest row nor verified by `verifySelf`. The root `package.json` (`b15f2948615b3ab979fdd1c356d5cbdaee3639115e07930d4041ccc77b3cd3af / 755`) is mentioned by the formation receipt but is likewise not revalidated or manifest-bound. `apotheosis/vitest.config.ts` (`95117ad7b8cfbb108b50a99763a68a0c538829620b8b979028113c7017e2c2b9 / 216`) is also unbound. Changing the parent include/options, changing `check` to a no-op, or changing test discovery leaves every required manifest path and the 315-byte child config unchanged. Current execution passes, but `npm test` reports **“No test files found”**; it is not a feature gate.

2. **`verifyPromotion` is not a promotion gate.** Its path is `verifySelf` → hash manifest → load tools → inspect/type-check one overlay → close only that overlay. It never invokes `runPublicHarness`, decrypts/runs the authorized holdout, runs the benchmark, runs package-default check/test against the projected target, obtains skeptical/adjudicator receipts, or projects and tests the target in the active grammar. Further, `verifyManifest` hashes challenge/root files but never interprets their verdicts. A manifest that faithfully binds a Challenge A `REJECT`, this Challenge B `REJECT`, or a rejecting root gestalt still passes the function. Hashing a rejection is not satisfying it.

3. **The manifest is not the exact public input closure.** `requiredPostFreeze` omits `holdout-ciphertext.b64`; the ciphertext is only transitively named by the receipt and is not reproduced before candidate inspection. The executable default-gate dependencies above are also absent. Conversely, the hard-coded exact path set prevents adding candidate, runtime, holdout-run, benchmark, adjudication, projection, and package-default receipts. The caller-supplied manifest digest closes only the manifest bytes, not these missing facts.

4. **Compiler dependency capture has a check/use gap.** Candidate and generated probe text are genuinely served from memory and compared to those exact strings. For every other compiler source, however, the compiler host first obtains `source.text` through `baseSource`; the verifier later reopens the path and hashes the then-current disk bytes, without comparing those bytes to `source.text`. A concurrent replace/restore can therefore make the compiler consume one dependency while the receipt records the ledger version. Tool trees are verified before loading/compiling and are not reclosed; manifest, precursor, proof config, and clean base are also not reclosed with the overlay. Capture every compiler input once into immutable buffers, construct every `SourceFile` from those buffers, hash the same buffers, and close the full input set after all gates.

5. **The clean-base projection is a declaration plus a suffix test, not a tree closure.** `verifyCleanBase` binds `clean-base.json`, trusts its empty `typescript_sources`, then rejects only paths ending in `.ts`. `.tsx`, `.mts`, `.cts`, and runtime `.js` entries pass; a concurrent `.ts` addition after `verifySelf` also escapes the final close. Thus “overlay ledger equals projected grammar ledger” is not established from a captured active-grammar tree. Bind and reproduce an actual clean-base tree ledger with the complete source-extension policy immediately before and after projection.

The current commands are still useful negative evidence, not promotion evidence:

```text
$ npm run check
exit 0

$ npm test
No test files found, exiting with code 0

$ ./node_modules/.bin/tsc --noEmit --strict --target ES2022 --module ESNext --moduleResolution Bundler --types node --resolveJsonModule --allowSyntheticDefaultImports --verbatimModuleSyntax cells/syntax-consume-number/g2/contract.ts cells/syntax-consume-number/g2/harness.ts
exit 0

$ node --check cells/syntax-consume-number/g2/promotion-verifier.mjs
exit 0

$ node cells/syntax-consume-number/g2/promotion-verifier.mjs --self-check
exit 0; local=[contract.ts,harness.ts], fixture=[fixtures/public-cases.json], external=[@mkbabb/parse-that/core,@mkbabb/parse-that/diagnostics], cleanBase=dcece5fb104fbcbf1f87ec5d548307f38a0a18bf98bfdb9a771aef0bd7da37d2
```

The full promotion command was correctly not run: no manifest or candidate exists.

## Altitude 3 — Benchmark reproducibility and five-author parsimony

The benchmark names the right operation family: each candidate receives identical ordered inputs; `ParserState` allocation, one `consumeNumber.call`, semantic observation, and retained digest are all charged; wrappers, predicates, tokenizers, unit dispatch, and BBNF f64 emission are correctly non-comparable. Public/revealed-holdout correctness is a prerequisite and failures are retained.

It is not yet a reproducible decision procedure:

1. **The schedule is unbalanced.** Forty-one measured rounds rotated over five candidates gives one position/candidate nine observations and the others eight. Seven warmup rounds are likewise asymmetric. Use a multiple of five or a balanced Latin/Williams schedule, and specify process isolation, runtime flags, CPU/thermal policy, GC policy, timer, batching/calibration, and whether hostile strings are materialized outside timing.

2. **The bootstrap rule is incomplete.** “One-sided 95% paired bootstrap confidence interval ... over per-round candidate/peer ratios” does not define the resampled statistic (mean, median, or geometric mean), percentile/BCa construction and interpolation, pairing unit, zero/invalid handling, whether every peer must be beaten, multiple-comparison control, or the no-strict-winner rule. `median` and `MAD` reporting does not fill those gaps. Therefore independent implementations need not produce the same winner from identical nanoseconds.

3. **The timed digest operation is ambiguous and can dominate the parser.** “Consumed-representation identity” could mean folding the constant-size `(caseId,start,end)` identity or slicing/hashing tens of thousands of code units per invocation. “Semantic normalization” is similarly undefined. The latter adds a common O(n) observer that can hide topology costs. Specify exact executable code and receipt schema, including per-round/per-candidate invocation counts and raw samples; benchmark the same captured candidate bytes verified elsewhere.

4. **Allocation evidence is non-comparable.** Optional peak RSS/heap delta with an unspecified “host tool” has no sampling boundary, GC rule, process boundary, or fallback comparability. Either make one exact method mandatory on one captured environment or label allocation wholly non-adjudicative.

5. **Five authors are not parsimonious under the present proof.** There are at most three defensible lineages before source, no enforced orthogonality, and no rule for collapsing equivalent candidates. Five author/skeptic tracks add coordination and multiple-comparison cost without adding five independent observations. Reduce to three genuinely distinct constructions (for example whole-prefix terminal, specification clauses, and character repetition), or bind author identity, declared topology, normalized AST evidence, byte distinctness, and a predeclared collapse/tie rule that justifies retaining B and D.

Minimum re-entry docket: seal the transitive package-default/config/test closure; directly bind the ciphertext and all result receipts; make ACCEPT verdicts and public/holdout/default/projection gates executable prerequisites; capture and reclose every compiler/manifest/base byte; harden the semantic leaf and scanner policy; replace the benchmark prose with one exact runner/statistic; and reduce or prove the five-seat design. Until all are present, G2 has valid candidate-free evidence but no valid author-admission or promotion architecture.
