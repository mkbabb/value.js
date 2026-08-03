<!--
  PROVENANCE — M-21 C-11 (codex-provenance ledger row 28), 7e28 worktree census, ruled 2026-08-03
  original: /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V11-2026-08-02.md
  original-mtime: 2026-08-02T06:13:25
  original-sha256: abf2c70c9cd87fd0caecb1071bc7365fb6d655d3f1eaa65a48aaf0014018e2dd
  original-bytes: 7996
  ruling: ADOPT-COPY — M-21 C-11 — 2026-08-03
  note: this comment block is prepended to otherwise byte-exact original content, so the
  copy's own sha256 differs; both digests are recorded in CENSUS.md. The original bytes
  are exactly the last original-bytes bytes of this file.
-->
# Value CSS DREI paper/source architecture v11 — 2026-08-02

## 0. Boundary

**Status:** `SOURCE_IMPLEMENTED_UNEXECUTED_PAPER_RED_PENDING_A11_B11`

**Authority:** `NONE`

Embedded source, parser, CSS runtime, product, benchmark, package, Browser,
release, and rebind are unexecuted. Every credit remains zero. V11 is frozen
for two fresh static reviews; this owner task dispatches neither review.

## 1. Frozen v10 terminal

V10 remains unchanged at paper
`f3d5fcd0c0b856a9e5832d9bc4227bb6589ab0e08a0d2cf63adb8d12b5111656`
and manifest
`71be78ab75334631839fd0a6f9f1c0ba060049e18fdb0cc03595edf0ada3f783`.
Review A proved its changed predicate bytes were never instantiated or
evaluated; Review B proved its object-key sort erased baseline insertion order.
Both are terminal RED. V11 carries no retrospective credit.

## 2. Ordered baseline authority

Canonical authority is an exact array of 188 `{controlId, entry}` records.
Array order is validated before any lookup object exists. Object fields inside
each record use stable key normalization, but rows never do.

| Identity | SHA-256 |
|---|---|
| Ordered array | `ade8549fb0925c24d009a0050c69a16accaf139f1773c7e8ca7a9ed0b1b6caa6` |
| Ordered array root | `be6a3d7c59dd93fd15d25d5d31bb0444f47fd8501b67b0b563dd986bdd6c1556` |
| Baseline pin | `18f76ead1aea74f5baad2ea76d8e7ef72da28175491f12d5cf0e356ae96d4f95` |

Source gates distinguish missing, extra, duplicate, reverse/reordered, one
AFTER substitution, mixed AFTER substitution, entry drift, array-hash drift,
ordered-root drift, and pin drift. Reverse order changes both array SHA and
ordered root. The map used by predicates is built only from authenticated
records.

## 3. Operative compromised-predicate architecture

Each of 188 controls binds its normal owning predicate and a distinct named
function expression with the same advertised function name and exact changed
source bytes. The host language parses the expression as module source; the
audit additionally binds `Function.prototype.toString`, function name,
source hash, exact single-function grammar, and changed return semantics.

CoC constructs a fresh 188-function registry, replaces exactly the owner,
proves the other 187 function objects unchanged, and runs the identical mutant
through both registries. The normal registry returns the owner leaf; the
compromised registry loses it; the audit guard rejects that loss. Ordinary
same-owner suppression remains `runOrdinarySuppressionControl` and is never
reported as CoC.

Comment-only, invalid-source, same-return, wrong-function, no-op,
multi-function, and wrong-return candidates are source-defined refusals. No
changed-source hash can self-certify without the corresponding instantiated
function object occupying the owner slot.

## 4. Source topology and carried corpus

Source architecture root: `02573823f5e3c3fdd92c1b1f8c14c4456a4d729463d8e01c04871e512cc87e03`.

| Measure | Exact value |
|---|---:|
| Modules | 9 |
| Function identities | 415 |
| Normal functions | 227 |
| Compromised variants | 188 |
| Direct static call edges | 440 |
| Registry-dispatch edges | 188 |
| Import edges | 16 |
| Controls | 188 = 183 parsed + 5 raw |
| Alternate invalid inputs | 376 |
| Ordered nonowner pairs | 35,156 |

V11 KEEP/FOLDs v10's authentic operations, ten closed schemas, measured masks,
semantic invariants, exact raw-v8 authorities at ordinals 33/38/43/48/53,
true byte offsets and anchors, escape-decoding duplicate-key lexer, alternate
invalid values, nonowner retention, and refusal controls. The five raw rows
remain the authentic 373/349-byte class; no v7 template returns.

## 5. Exact paper/machine claims

| Claim | Exact value |
|---|---|
| `V11-PC01` | Status is SOURCE_IMPLEMENTED_UNEXECUTED_PAPER_RED_PENDING_A11_B11; authority and every execution or product credit remain zero. |
| `V11-PC02` | V10 is frozen terminal two-review RED at paper f3d5fcd0c0b856a9e5832d9bc4227bb6589ab0e08a0d2cf63adb8d12b5111656 and manifest 71be78ab75334631839fd0a6f9f1c0ba060049e18fdb0cc03595edf0ada3f783. |
| `V11-PC03` | V11 carries exactly 188 controls, 183 parsed inputs, five authentic raw-v8 inputs, 376 alternates, 10 schemas, and 35,156 ordered nonowner pairs. |
| `V11-PC04` | Canonical baseline authority is an ordered 188-record array with SHA ade8549fb0925c24d009a0050c69a16accaf139f1773c7e8ca7a9ed0b1b6caa6, ordered root be6a3d7c59dd93fd15d25d5d31bb0444f47fd8501b67b0b563dd986bdd6c1556, and pin 18f76ead1aea74f5baad2ea76d8e7ef72da28175491f12d5cf0e356ae96d4f95; lookup construction occurs only after exact order validation. |
| `V11-PC05` | Missing, extra, duplicate, reverse/reordered, one AFTER-substituted, and mixed AFTER rows have distinct source-defined refusal codes; object-key sorting is not baseline authority. |
| `V11-PC06` | Nine exact source modules contain 415 function identities, 440 direct static call edges, 188 compromised-registry dispatch edges, and 16 import edges; source root is 02573823f5e3c3fdd92c1b1f8c14c4456a4d729463d8e01c04871e512cc87e03. |
| `V11-PC07` | Each control has one normal owning predicate and one distinct source-owned named compromised variant whose exact instantiated function bytes change the return semantics to unconditional accept. |
| `V11-PC08` | CoC clones the 188-function registry, replaces exactly the owning function, proves all other 187 identities exact, and runs the identical mutant through normal and compromised registries; ordinary suppression remains separately named. |
| `V11-PC09` | Normal CoC emits the unique owner leaf, the compromised registry loses it, and the audit guard reports compromise; comment-only, invalid-source, same-return, wrong-function, no-op, multi-function, and wrong-return candidates refuse. |
| `V11-PC10` | All operations, closed schemas, semantic invariants, two alternates per control, authentic raw-v8 bytes/offsets/anchors, escape-aware duplicate-key lexer, nonowner retention rows, and suppression refusal laws remain source-bound. |
| `V11-PC11` | Every observation, runtime receipt, static-review receipt, correctness credit, product credit, release credit, and authority field remains null or zero because embedded v11 source was not executed. |
| `V11-PC12` | A11 and B11 are fresh independent static reviews required after this exact two-file freeze and are not dispatched by the owner task. |

The manifest exact-compares these claims, ordered baseline records and
hostiles, source modules/functions/edges, compromised bindings, control rows,
35,156 nonowner rows, review boundary, and zero-credit record. Static document
construction is not execution evidence.

## 6. Required static reviews

- **A11:** reconstruct the ordered record array before lookup creation; replay
  all six named baseline hostiles; authenticate all modules/functions; rebuild
  every operation, schema, invariant, alternate, raw byte/offset/anchor, mask,
  lexer, and normal-versus-compromised registry observation from source.
- **B11:** independently prove each after-source function is an operative named
  function in the cloned registry; prove exactly one changed identity and 187
  retained identities; replay same-mutant CoC, ordinary suppression separation,
  seven source hostiles, 35,156 nonowner bindings, refusal codes, and
  paper↔manifest↔source parity.

## 7. Dispositions and zero-credit terminal

**KEEP:** authentic 188-control corpus and exact raw-v8 evidence. **FOLD:** v10
reviews as negative evidence. **MOVE:** baseline authority from object-key order
to ordered records. **SPLIT:** ordinary suppression from source-operative CoC.
**PRUNE:** sorted-key baseline acceptance, source-hash-only CoC, arbitrary
unequal after bytes, inferred observations, and all execution claims.

V11 is PAPER RED pending A11/B11. Authority is NONE. Observation, correctness,
performance, CSS, parser, product, API, Browser, package, release, rebind,
formation-admission, and constellation-close credit are all zero. No v12 or
runtime/source coordinate is authorized.
