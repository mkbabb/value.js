# SYNTAX-NUMBER-START G4 boundary challenge B — architecture/performance

**Verdict: REJECT before candidate code.** Two load-bearing evidence defects
remain. This receipt is bound to
`g4/manifest.json` SHA-256
`8d5a75cf11d63fc250e9968641aae377ac8a97ed4a160470468d5c508064a342`.

## Seat receipt

- model served: `gpt-5.6-sol`
- reasoning effort: `ultra`
- workflow: independent exact-byte adversarial challenge, v2
- review posture: assume the formation is semantically wrong, architecturally
  contrived, and benchmark-biased until its executable boundaries prove
  otherwise
- independence: no agent was queried or listed; no sibling review was read;
  no hidden-holdout bytes or path were requested or inspected
- mutation: this receipt only; no sealed input, parser, candidate, grammar,
  production tree, or holdout artifact was changed

## Reproduction docket

The expected manifest hash reproduced. Its immutable public precursor is
16,016 bytes at
`f3ff92a0b3589c00e3ec6a2b29e0394961db1b9a7bc63a3521c30209852acb1a`;
the separate holdout receipt is 3,204 bytes at
`3da23e5c9d4944e5930079df3427a2f3305da5236c8549e1f772d540c60866e5`.
Every path, byte count, and SHA-256 in the 20-row public-input closure
reproduced exactly. The TypeScript check is GREEN.

The pinned CSS Syntax source reproduced over HTTPS as 144,427 bytes at
`3f129d17407f9bd027291bcfb8015beb86fc229bf5efe505b49ec2dc30be4390`.
Its algorithm has exactly the sealed first-code-point decisions: digit;
sign followed by digit; dot followed by digit; or sign, dot, digit. Its
tokenizer occurrences are the plus, minus, and dot dispatches, with the
leading-digit arm correctly classified as a non-occurrence. The consume-number
row is a downstream precondition rather than a second owner.

The public materializers reproduce 406 generation-3 cases (306 true, 100
false), 23 generation-4 EOF cases (12 true, 11 false), and the three declared
hostiles. All hostile UTF-8 sizes and hashes reproduce. The 429 ordinary cases
have unique IDs and valid source/offset/continuation relationships. The two
diagnostics modes, seven profiles, six predecessor classes, raw-child lane,
and ordinary-parent lane are executable. An unpersisted direct-combinator
probe satisfying the allowed local diagnostic sandbox passed all 432 public
and hostile cases, so the contract is demanding but feasible; this is assay
evidence only, not a candidate or implementation credit.

The raw-child harness directly rejects a different returned `ParserState`, a
changed `src` own-property/value, error, non-boolean, input consumption,
diagnostic reference/value drift, and global diagnostics-mode drift. The
parent harness preserves outer state identity, exact following-parser offset,
boolean value, and diagnostic references/values. In the ordinary construction
the child sees the same source, offset, predecessor, diagnostics, and mode as
the raw lane, so the raw source assertion closes the non-contrived
composition case; the later all-axis human source review remains necessary
against deliberately stateful or reflective code.

The live 19-file `grammar/**/*.ts` path/hash set matches the frozen integration
base ledger. The installed parse-that `dist` set is 64/64 at ledger SHA-256
`998c5668fa103e4692d69f48a0665f152cb1d014b11fa668c99693307ef1690b`.
The installed package, mirror package, and lock hashes reproduce as
`f53ca9b85c43e65c1f3f8a21414f990211d8d0e6a7f07df805557cdb6b50f4ff`,
`9250d9d95ab51664a47682a61bb1d82de8938481d8413b792378c9155d15723b`,
and `489c5981ffa75d795cd3fae0e6d5a837b272ffec1633d862dba9c11a59e668b7`.
No candidate file or integrated `number-start.ts` exists.

The separate holdout receipt binds the exact precursor and public corpus
hashes, reports 160 cases split 80/80, records zero overlap/duplicates on four
axes, and withholds the bytes until all five source/overlay/projected
identities close. I did not inspect or attempt to reproduce its hidden bytes.
That is the correct two-stage sealing shape.

H/B/S may converge on one explicit bounded-branch construction, while D is
constrained to engine dispatch/chain and R to a bounded zero-width regex
terminal. Those five seats can yield at least three material lineages without
a whole-number recognizer, source scanner, lexer, token object, atom, or CST.
The exact DAG ownership and primitive-only boundary are preserved. The
full-ledger status remains explicitly RED, and both precursor and manifest
withhold feature apotheosis even after a future local winner.

## Blocking findings

### B1 — the supposedly exact enabled benchmark block never enables diagnostics

`benchmark-protocol.json` says, in order, to time the disabled pool, call
`disableDiagnostics`, time the enabled pool, and call `disableDiagnostics`
again. It never specifies the required `enableDiagnostics()` call before the
enabled timed block. The surrounding words “enabled pool” and “toggle calls”
do not define where that state change occurs, and a literal implementation
runs both samples with diagnostics disabled.

This is not editorial. Candidate-local sandbox cost and failed-terminal
bookkeeping can differ by global diagnostics mode. Pairing two disabled blocks
would mismeasure the very overhead this generation was cut to include and
would make independent benchmark implementations non-identical. Seal the
actual sequence, for every candidate and round, including restoration order:

1. `disableDiagnostics()`; restore disabled pool; time disabled block;
2. `enableDiagnostics()`; restore enabled pool; time enabled block;
3. `disableDiagnostics()` after timing.

Keep all three toggles and both restorations outside timing. Then state whether
an exception invalidates the entire run rather than permitting the final reset
and a partial sample.

### B2 — the live/transitive promotion check is caller-substitutable

`promotion-verifier.ts` accepts `mirrorRoot`, `parseThatPackageRoot`,
`mirrorPackageFile`, and `mirrorLockFile` as unrestricted caller arguments.
The protocol provides no exact runner, canonical/realpath assertion, or
binding of those arguments to the sealed mirror containing this verifier.
Consequently a caller can pass a clean copy matching all frozen ledgers while
the actual live mirror grammar, installed dependency, package, or lock has
drifted. The function succeeds and returns only candidate/overlay/projected
identities; it does not attest which roots were checked.

That defeats the stated “every live grammar path/hash” and “installed
parse-that” promotion guarantees. The hashes and path-set logic are correct
for the trees supplied, but supplied-tree equality is not live-tree equality.
Bind roots relative to an exact content-addressed runner/verifier location (or
seal and verify canonical realpaths against the intended mirror), reject
symlink/root substitution as appropriate, and include the resolved roots and
their reproduced aggregate identities in the promotion receipt.

The AST gate itself is a reasonable necessary floor, not a proof of idiom. For
example, implicit template coercion or constructor indirection can derive
state text without spelling a forbidden property. The precursor truthfully
routes such aliases, indirection, source derivation, recursion, and contrivance
to all five exact-source skeptics, so this ordinary static-analysis
incompleteness is not a third blocker. It must not be upgraded later into a
claim that the AST check is sufficient.

## Three-altitude adjudication

### Total tranche

The reset sequencing is substantially sound: a minimal foundation operation,
five provenance-constrained candidates, all-axis quintet, synthesis
triumvirate, and an explicit full-ledger gate fit the no-lexer direct
parse-that tranche. The content-addressed BBNF DAG and the still-RED complete
CSS denominator are represented honestly. B1 and B2 would, however, allow
non-reproducible performance and promotion evidence to become foundations for
every numeric consumer. The tranche must not compound those defects.

### Wave / formation generation

G4 discharges the G3 semantic, EOF, raw-return, `src`, holdout-precursor,
candidate-absence, package-ledger, and bootstrap-reset dockets. It does not
fully discharge the mode-block and live-drift dockets because their exact
execution remains ambiguous/substitutable. Therefore the exact manifest
cannot admit H/B/S/D/R source.

### Feature

The normative boolean boundary, ownership, O(1)/three-position limit, public
cases, hostile sizes, raw and parent observations, diagnostic profiles,
candidate lineages, holdout separation, and no-apotheosis gate are acceptable.
No semantic fixture or architectural scanner blocker was found. The two
evidence defects above are feature-blocking because they govern candidate
selection and byte-exact promotion, not optional tranche ceremony.

## Required disposition

Start a new formation generation without candidate code. Preserve the sound
G4 semantic/corpus/holdout work only through a fresh public precursor and a
fresh holdout seal; do not rewrite this precursor or reuse this manifest as an
acceptance identity. Repair the exact diagnostics-mode command sequence and
bind the promotion verifier to the actual live roots. Then obtain two fresh
independent exact-byte challenges and a fresh gestalt verdict.

