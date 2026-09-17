# SYNTAX-CONSUME-NUMBER G2 — root gestalt

**Verdict: `REJECTED_BEFORE_CANDIDATES`.** The feature decomposition and CSS
number semantics survive. The exact G2 executable boundary does not: both
independent challenges found a reproducible surplus-field hole in the semantic
leaf check, and the architecture challenge found that the so-called promotion
verifier neither closes its transitive proof inputs nor proves acceptance.

## Exact adjudicated set

| object | SHA-256 | bytes | verdict |
|---|---|---:|---|
| `formation-receipt.json` | `f3e5a6c708129d8578364245d5c5da098def327533b89d431d7106e14cca1b67` | 6,506 | frozen precursor |
| `holdout-receipt.json` | `bb6a4b9a5a57ba43cc7fb4ed6ceb2f9566e1928b768194bf620f026b94429380` | 4,854 | sealed, never revealed |
| `holdout-ciphertext.b64` | `911371622d319acbaf8d5fac706244048bdfef3fcabd43620aee332e529489e8` | 56,833 | sealed, never decrypted by authors/reviewers/root |
| challenge A | `7e555146be8158ec9ba1c3c67b3fb9d6bc4546116e73470a22ff4364e2f97e48` | 11,880 | `REJECT` |
| challenge B | `26f5b9ca277a4c7c7eb89e36a444f74fc2729a28e1dc98a60f8e60282d643007` | 12,361 | `REJECT` |

No candidate directory, candidate source, manifest, active grammar TypeScript,
benchmark result, or promotion exists.

## Findings retained

Challenge A exhaustively compared the declared language and semantic triple
against an independent CSS Syntax oracle across 299,593 short strings and
targeted binary64 cases. The following boundary is retained for G3:

- consume the maximal §4.3.13 numeric prefix at the current parser position;
- return exactly `value`, `type`, and `sign`;
- preserve negative zero with `Object.is` and state binary64 overflow/underflow;
- observe spelling and extent through same-input parser state, never result
  token/CST fields;
- leave percentage/dimension dispatch, units, source mapping, math,
  serialization, and complete-input diagnostics to separate rows;
- keep number-start as subordinate evidence, not an exported predicate.

## Confirmed blockers and proportionate G3 repair

1. `Object.keys` accepts non-enumerable and symbol-keyed `raw`/span/token
   payloads. G3 must use `Reflect.ownKeys`, exact ordinary own data
   descriptors, and an agreed prototype.
2. The proof config's parent `tsconfig.json`, package scripts, and test config
   are outside the frozen gate. G3 must bind the transitive proof-input closure.
   An empty pre-candidate default test remains truthful zero feature credit; it
   is not to be relabeled a feature gate.
3. The verifier hashes challenge/root files without requiring `ACCEPT`, omits
   the ciphertext and later result receipts, and is named as though type/shape
   admission were promotion. G3 must separate **author admission** from later
   candidate qualification and final promotion. The admission validator must
   require two accepting boundary verdicts plus accepting root gestalt and
   reproduce every author input. Public/holdout/benchmark/quintetto/
   adjudicator/integration results become mandatory in the later cell
   acceptance validator, never fake pre-author results.
4. Compiler sources, manifest inputs, and clean-base bytes have check/use
   gaps. G3 must compile from captured buffers, hash those same buffers, close
   the full source-extension policy, and revalidate inputs at close.
5. The mechanical anti-scanner gate misses element access, destructuring,
   reflection, state callbacks, aliases, and `mapState`. G3 must positively
   constrain candidate construction where mechanical and explicitly leave
   semantic/idiom proof to the five skeptics; it may not claim impossible
   whole-program proof.
6. Five candidates are not justified. The owner law requires at least three
   orthogonal candidates and a fourth when H/B ancestry is uncertain. G3 uses
   four seats—H, B, S, and D—with independent authors, distinct exact bytes,
   provenance receipts, and topology checks. The repetition seat is removed.
7. The benchmark prose is not executable or deterministic: 41 rounds are
   unbalanced over five seats; statistic, pairing, observation digest,
   environment, batching, and allocation semantics are incomplete. G3 must
   ship one exact four-seat runner/receipt schema with balanced order and one
   fully specified paired statistic. No timing claim exists before execution.

G3 changes frozen harness/protocol/verifier bytes, so the G2 holdout is
ineligible and must never be reused. Its ciphertext and all key material are
to be destroyed after this rejection receipt records their sealed identities.
A wholly fresh candidate-free G3 holdout and two fresh challenges are
mandatory.

This is a prototype-formation rejection only. It authorizes no production or
megatranche mutation and grants no parser, feature, benchmark, integration, or
conformance credit.
