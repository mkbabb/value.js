# V·π W0 structural check

Date: 2026-07-21  
Artifact checked: write-frozen `pi/mirror/` state after the final result-boundary hostile-input guard  
Method: independent, assume-faulty structural review against `waves/W-0.md`,
`PI.md`, `HANDOFF.md`, `formation/research-architecture.md` §A–C, and
`formation/harden.md` W0 requirements.

## Verdict: ACCEPT

The initial check rejected the scaffold on D-1–D-3 below. The write-frozen
repair has now passed the targeted re-audit recorded at the end of this report;
that re-audit supersedes the initial rejection. W0 is structurally ACCEPTED.

## Blocking defects

### D-1 — K-5 declaration parity gate compares names, not resolved declarations

`tools/parity.ts:47-60` does not implement the promised "emitted `index.d.ts`
export-set + resolved type text == live" gate.

- `test/dts-parity.test.ts:6` calls `verifyDtsParity()` with its default
  `requireEmitted = false`. Therefore `npm test` neither requires a declaration
  emit nor reads `.dts/index.d.ts` at all.
- Even `verifyDtsParity(true)` parses only explicit export clauses and compares
  `type|runtime:name` strings (`tools/parity.ts:29-39,56-60`). It never resolves
  an exported alias, runtime signature, generic, member, or dependency type.
- The raw body check at `:48-50` proves the intended byte parity of `types.ts`
  after imports, but it cannot prove the resolved bodies supplied by
  `deps/color-model.ts`, `deps/value-types.ts`, or `deps/foundation.ts`.
- `support/contract-parity.ts` adds useful mutual assignability against the
  repository's already-built `dist/subpaths/css.js`, but mutual structural
  assignability is not member-for-member identity (for example, optional extra
  members can be mutually assignable), and a stale `dist/` is not the live
  source authority.

This gate can therefore print `d.ts parity GREEN` after declaration drift. It is
not the born-GREEN K-5 gate specified by W0/H-4.

**Required repair:** make the test produce or require a fresh emit and compare
all 52 emitted exports against a fresh live declaration authority using the
TypeScript checker (resolved, symbol/member/signature scoped; source `from`
provenance ignored). The ordinary test must fail if the emit is absent/stale,
not reserve that check for a separate script branch.

### D-2 — the alleged differential harness never invokes the LIVE oracle

`harness/differential.ts:1-53` imports only the mirror. Its `green` flags are
single hand-written success predicates; none compares live acceptance, result
shape, diagnostic code, or value. `test/door-stubs.test.ts:7-9` checks only
`length === 19` and that all flags are false. It does not assert uniqueness or
that `exportName` equals the barrel's exact 19-runtime set. Nineteen duplicated
or misspelled rows could satisfy this test.

The current stubs are in fact RED on the witnesses inspected, but the mandatory
claim "every door's differential is RED" is not mechanically established.

**Required repair:** wire each row to the LIVE parser/serializer/collector
oracle and represent the comparison result, then assert the 19 row names are
unique and exactly equal to the runtime barrel census. At W0, a positive live
witness versus its stub must be RED for every door.

### D-3 — `balancedUntil` mishandles quotes preceded by an even backslash run

At `lexeme.ts:73-75`, a quote closes only when the immediately preceding
character is not `\`. CSS escaping depends on parity: a quote after two
backslashes is unescaped and must close. The present scanner treats it as still
quoted and misses the following top-level stop.

Independent probe:

```text
source characters: ["'","a","\\","\\","'",";","t","a","i","l"]
balancedUntil(";").parseState(source)
actual:   { isError: true, offset: 0 }
expected: success at the semicolon, capturing the quoted raw field
```

This is a foundational recognition error, not a later feature-wave issue.
`scanners.test.ts:22-28` covers a separator inside a simple quote but has no odd
versus even escape-parity cases, so the scanner gate stays green.

**Required repair:** track the parity of the immediately preceding backslash
run (or consume escapes as pairs) in `balancedUntil`, and add both odd- and
even-backslash quote tests. `util.ts` is presently the mandated verbatim live
transpose; any decision to correct the same inherited behavior there should be
routed as an explicit correction/addendum rather than silently folded into W0.

## Non-blocking refinement finding

### R-1 — one unused, out-of-subset helper violates the KISS boundary

`deps/color-model.ts:132-138` transposes and exports `makeColor`, although W0's
authorized model subset ends at live `model.ts:134` (`isAnyColor`) and the helper
has no consumer (`rg -n '\bmakeColor\b'` finds only its declaration). Remove it
until a wave demonstrates a need, or explicitly justify its inclusion. The
authorized `multiply`, `D50_TO_D65`, and `adaptXyzD50ToD65` anchor helpers are
not part of this finding.

## Checks that passed

- **52 surface:** the source barrel is exactly 33 type exports plus 19 runtime
  exports; all runtime names import, and all 33 type imports compile.
- **Type bodies:** `src/css/types.ts` versus mirror `types.ts` differs only in
  the four authorized import rewires. The 9-kind stylesheet union and 8-code
  `ParseIssue` union are intact. Convenience type re-exports remain off the
  public barrel.
- **Dependency receipt/isolation:** the runtime dependency is exactly
  `@mkbabb/parse-that@1.0.0`; the lock records the registry tarball and integrity
  `sha512-ygzF6JPb0OC2XRCeg/ywtNYgo2hKmZYGabaimObx0/czxH/8I2gF8obQjkWpPrXW8azOtt5x3RpnU5nZVEpY1Q==`.
  Root dependencies contain no other runtime package. Runtime prototype imports
  use only relative modules and the published parse-that root surface; the
  live-repository imports are confined to proof support/tooling.
- **Parser-state arithmetic:** the implementation correctly treats
  `ParserState.ok/err`'s second argument as a **relative delta**. Thus
  `state.ok(value, end - start)` and `state.err(undefined, 0)` are correct at a
  nonzero offset. The architecture pseudocode's `state.ok(..., end)` and
  `state.err(..., state.offset)` are absolute-offset-shaped and would
  over-advance if copied literally. A composed probe produced span `{start:2,
  end:3}`, confirming the implementation's deliberate correction.
- **Fused leaf invariants:** sticky assertion, one `RegExp.exec`, match start at
  `state.offset`, span end sealed before `skipBlockComments`, and no map/
  mapState staging are present. `numUnit` extracts number and unit from one
  match. Identifier case and function-head lowercasing behave as tested.
- **Transposed helpers:** `splitTopLevel`, `splitValueTokens`, `topLevelColon`,
  and `emptyComma` match the cited live bodies. Result shapes match the public
  contract and the final boundary guard keeps all 19 stubs nonthrowing on the
  supplied hostile call.
- **No-freeze / forbidden-law scan:** excluding generated declarations and
  dependencies, grep found no `Object.freeze`, `deepFreeze`, `FREEZE`, parser
  `.map`, `.mapState`, `.skip`, bare `regex()`, or `splitBalanced` use. The only
  `trailing_input` text is its required declaration in `types.ts`.
- **Scaffold isolation:** root TypeScript and Vitest scopes exclude this docs
  package; the mirror has its own strict NodeNext configuration and scripts.
- **Package reproducibility:** manifest and lock agree on all direct dependency
  versions after the final write-frozen update.

The broader claim made by `freeze-independence.test.ts` that it detects mutation
of parsed payloads is **UNPROVEN**: its regex detects `parsed.value = ...`-style
replacement, but not nested writes, mutator calls, aliases, bracket notation,
or optional-chain variants. The current consumer scan is clean; this is a guard
coverage limitation, not an observed consumer reliance defect.

## Command evidence (final frozen tree)

```text
$ npm test
Test Files  7 passed (7)
Tests       16 passed (16)

$ npm run check
tsc --noEmit                         # exit 0

$ npm run dts-parity
V·π W0 d.ts parity GREEN: 33 types + 19 runtime exports.
# D-1 explains why this printed verdict is insufficient.

$ differential witness probe
live:   color=true value=true timing=true sheet=true
mirror: color=false value=false timing=false sheet=false
all 19 current hand-written door flags: false

$ forbidden-law grep
types.ts:13: | "trailing_input"       # sole match

$ named/result freeze probe
NAMED_COLORS entries=148, frozen=false
success/result/value frozen=false; failure/diagnostics frozen=false

$ package-lock receipt probe
rootDependencies={"@mkbabb/parse-that":"1.0.0"}
resolvedVersion=1.0.0, integrity present
```

**Seal:** structural check complete; prototype and authority files were not
edited. Only this report was written.

## Re-audit after D-1–D-3 repair

**Verdict: ACCEPT.** The write-frozen repair discharges all three blockers and
the KISS refinement:

- **D-1 discharged:** ordinary `npm test` now fresh-emits with
  `tsconfig.declarations.json`, compiles `contract/source-parity.ts` against the
  current live `src/css/index.ts` under strict Bundler resolution, and then
  requires the emitted 33-type/19-runtime census. The contract contains 33
  `Assert<Equal<Live.*, Mirror.*>>` type rows and 19 exact runtime `typeof`
  equality rows. `npm run dts-parity` runs the same three rails.
- **D-2 discharged:** the harness has exactly 19 unique names equal to
  `Object.keys(api)`, invokes each witness against LIVE and mirror, and asserts
  all 19 LIVE witnesses GREEN, all mirror stubs not GREEN, and all 19
  differential rows RED.
- **D-3 discharged:** `balancedUntil` now counts the contiguous preceding
  backslash run and closes on even parity. Independent even/odd fixtures both
  pass in `scanners.test.ts`.
- **R-1 discharged:** `makeColor` is absent; repository grep returns zero
  occurrences outside generated/dependency trees.

Final command evidence:

```text
$ npm test
Test Files  7 passed (7)
Tests       17 passed (17)
dts parity test: fresh emit + live-source contract, 913 ms

$ npm run check
tsc --noEmit                         # exit 0

$ npm run dts-parity
tsc --noEmit                         # exit 0
tsc -p tsconfig.declarations.json    # exit 0
tsc -p tsconfig.source-contract.json # exit 0
V·π W0 d.ts parity GREEN: 33 types + 19 runtime exports.
```

**Re-audit seal:** W0 is ACCEPTED on the repaired, write-frozen artifact. No
prototype or authority file was edited by the auditor; only this report changed.

## POST-W1 SHARED-LEXEME STRUCTURAL REPLAY — 2026-07-21

**Verdict: ACCEPT.** This was one W0 structural replay over the current
foundation plus W1's shared `lexeme.ts`/`util.ts` activation, not an E-1 review
of W1 features. No W0 invariant regressed.

- **Identifier start:** independent probes accepted `--`, `---`, `----`,
  `--0`, and `--1` exactly, while rejecting bare `-` and `-0`. The explicit
  double-hyphen branch therefore admits the required CSS `--` start without
  widening the ordinary single-hyphen start.
- **Quoted continuation:** one-backslash continuations over LF, CRLF, CR, and
  FF all round-tripped byte-for-byte through `quoted`; the corresponding bare
  line breaks were all rejected.
- **Quote parity:** a generated 1/2/3/4-backslash matrix produced the required
  odd/even vector across the fused quoted leaf, `balancedUntil`, and activated
  scanners: runs 1 and 3 kept the quote escaped; runs 2 and 4 closed it.
  `splitTopLevel` yielded arm counts `[1,2,1,2]`; `splitValueTokens` token counts
  `[1,3,1,3]`; `topLevelColon` returned `[-1,5,-1,7]`; and
  `emptyTopLevelItem` returned `[undefined,6,undefined,8]`.
- **O-1/O-2 leaf behavior:** a `RegExp` subclass counted exactly **one** `exec`
  in a composed, nonzero-offset parse. For source
  `x /*lead*/ word /*tail*/`, `word` began at 11, the built span was exactly
  `{start:11,end:15}`, and `runComplete` succeeded after post-token trivia.
  This simultaneously re-proves relative offset arithmetic, span sealing before
  trivia, sticky execution at the current offset, and comment/whitespace skip.
  Non-sticky rejection and unterminated-trivia rejection remain GREEN.
- **Scanner gates:** all seven scanner tests pass, including comma/slash empty
  arms, nested depth, quote/comment shielding, raw trimming, and odd/even escape
  cases in every top-level utility. No parse-that `regex()`, parser `.map`,
  `.mapState`, `.skip`, or `splitBalanced` staging appears in the mirror.
- **Freeze/dependency/export invariants:** the only `trailing_input` occurrence
  remains its type declaration. No `Object.freeze`, `deepFreeze`, or `FREEZE`
  site exists. `NAMED_COLORS` has 148 entries and is unfrozen; success values,
  failure results, and diagnostics are unfrozen. The barrel remains exactly 19
  runtime names, the live-source contract remains 33 exact type rows plus 19
  exact runtime rows, and the sole runtime dependency/lock receipt remains
  `@mkbabb/parse-that@1.0.0` with integrity.

Exact command evidence on the replayed tree:

```text
$ npm test
Test Files  8 passed (8)
Tests       30 passed | 4 todo (34)
# W0: lexeme 6/6, scanners 7/7, freeze 1/1, barrel 2/2,
#     no-trailing 1/1, parity 1/1, door-state/no-throw 2/2

$ npm run check
tsc --noEmit                         # exit 0

$ npm run dts-parity
tsc --noEmit                         # exit 0
tsc -p tsconfig.declarations.json    # exit 0
tsc -p tsconfig.source-contract.json # exit 0
V·π W0 d.ts parity GREEN: 33 types + 19 runtime exports.

$ npm audit
found 0 vulnerabilities

$ independent generated probes
ident -- start: accepted [--, ---, ----, --0, --1]; rejected [-, -0]
continuations LF/CRLF/CR/FF: escaped=true, bareRejected=true for all
quote close by backslash count 1/2/3/4: [false,true,false,true]
counting sticky RegExp: exec=1, offset=11, sealed span=[11,15]
runtime barrel=19; source-contract Equal rows=33 type + 19 runtime
freeze flags: named/success/value/failure/diagnostics all false
```

**Replay seal:** the post-W1 shared lexeme/util foundation is structurally
ACCEPTED. The auditor changed only this report.
