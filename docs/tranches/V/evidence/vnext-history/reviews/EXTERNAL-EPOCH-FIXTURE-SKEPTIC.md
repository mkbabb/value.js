# External-Epoch Fixture Skeptic

## Verdict

**NOT CLEAN.** The Value resolution/transpose fixture fabricates the external
consumer-root epoch, hand-authors a receipt that claims stronger resolver truth
than its input-to-output join proves, and reaches the failure only after an
expensive live rerun. This is formation evidence only. It does not execute V29T
or authorize production work.

No active BBNF/parse-that artifact or quarantined `r1-opus-refuted` content was
read for this audit. The required repair must remain hermetic and must not
consume the active BBNF campaign.

## Sustained finding

The failure `live pre-cut consumer resolver failed: root bbnf-lang forged Git
branch main; observed master` is correct.

[`tools/value-target-resolution-fixture.mjs`](../tools/value-target-resolution-fixture.mjs)
fabricates the epoch in two distinct ways:

- lines 137–152 assign every root the synthetic dirty digest
  `sha256("fixture-clean")` and reduce provenance to empty origins plus one
  caller-supplied worktree;
- lines 161–173 copy the temporary Value fixture's branch and HEAD into every
  canonical required root;
- lines 201–253 hand-build a supposedly resolved receipt containing only the
  one included fixture root, although the input declares the five canonical
  required roots.

The temporary repositories are explicitly initialized on `main` at resolution
fixture lines 826–834 and
[`tools/value-target-transpose-fixture.mjs`](../tools/value-target-transpose-fixture.mjs)
lines 501–508. At the inspected epoch, bbnf-lang, glass-ui, keyframes and
parse-that were all on `master`; Value was on `tranche-u`. Copying the temporary
`main` identity therefore fails immediately at bbnf-lang, and would remain
false for HEAD, dirty state, origins or worktrees even if the branch names
happened to coincide.

The live resolver is correct. It observes the real Git root and checks branch,
HEAD, dirty digest, origins and worktrees at
[`tools/resolve-consumer-universe.mjs`](../tools/resolve-consumer-universe.mjs)
lines 497–506. It then requires bounded repository discovery to equal the
declared available-root set at lines 524–526. A fixture cannot satisfy that
contract by copying one repository identity over unrelated roots.

## Receipt-verifier hole

[`tools/consumer-universe-return.mjs`](../tools/consumer-universe-return.mjs)
lines 24–121 validate hashes, schemas and the authority bounds, but do not prove
that the receipt roots and edges are the exact projection of the universe
input. Lines 62–65 check only that the required roots occur in the input. Lines
80–99 check only that the receipt counts describe the receipt itself. Thus a
caller can omit declared roots from a receipt, recompute its counts and hashes,
and survive structural validation.

The fixture exploits that gap unintentionally: its one-root handcrafted receipt
survives until [`tools/deletion-judgment.mjs`](../tools/deletion-judgment.mjs)
lines 151–164 rerun the actual resolver. The verifier must instead reject the
receipt before any expensive closure replay by proving:

- exact input-root to receipt-root identity, status and owner/reason/retrigger
  projection;
- exact input-edge to receipt-edge semantic projection and evidence-path
  coverage;
- input-derived root, edge and disposition counts;
- recomputable observed-root and observed-edge epoch hashes.

The real resolver, never fixture code, must emit the positive receipt.

## Smallest honest construction

Use one two-phase fixture consumer epoch.

1. Create five temporary Git roots with canonical IDs `bbnf-lang`, `glass-ui`,
   `keyframes`, `parse-that` and `value`. The `value` root is the actual
   temporary resolution or transpose repository. The other four are inert Git
   repositories containing only local fixture evidence. They are not clones or
   copies of active repositories.
2. Observe every root through one exported canonical Git-identity helper from
   the resolver. Fixture code must not duplicate or synthesize branch, HEAD,
   dirty, origin or worktree logic.
3. Write a fixture bounds authority inside the primary temporary Value Git
   root. It is a relocation of canonical semantics: the exact five root IDs,
   exact package/target/kind scopes and exact quarantine exclusions remain;
   only search/required realpaths and bounded fixture limits point into the
   temporary constellation.
4. Commit that authority before the return's clean pin is captured.
5. After the final primary commit, observe all five roots, write the universe
   input, execute `tools/resolve-consumer-universe.mjs`, and validate the
   resolver-produced receipt against the committed fixture authority. Delete
   the handcrafted receipt path entirely.
6. Keep all five roots included. The transpose fixture's generated grammar
   contains real `@mkbabb/parse-that` imports, so its universe must declare the
   exact observed `value -> parse-that` runtime edge and every occurrence
   evidence path. Narrowing package scope or excluding the internal parse-that
   target would merely replace one fixture lie with another.
7. Derive deletion casualty-root rows from every included receipt root. The
   four inert roots are `unaffected`; the physical truth receipt joins only the
   primary `value` root.

For the resolution fixture, the authority may be included before the baseline
commit or committed before `makeTruthReceipt`. For the transpose fixture, it
must be present before the initial commit currently made at lines 501–508.
Adding it inside `writeV29TDeletion` is too late: the ledger's repository-state
hash is already frozen at transpose fixture line 642.

Every resolved root and every edge-observation path in this fixture must be
asserted to lie beneath the temporary fixture root. That is the executable
proof that active BBNF/parse-that artifacts were not consumed.

## Bounds-authority binding

Use one clean-break binding shape in both the consumer-universe return annex and
every deletion-judgment `consumer_scan` variant:

```json
"bounds_authority": {
  "path": "/absolute/logical/path",
  "file_sha256": "<sha256>",
  "manifest_hash": "<sha256>"
}
```

The existing sibling `bounds_sha256` remains the semantic-bounds binding. The
object replaces the consumer-universe annex's scalar
`bounds_authority_sha256`; no alias or dual representation is allowed. The
outer deletion-return binding need not repeat it because the outer binding
already hashes the complete deletion annex and its `annex_hash`.

The authority validator must distinguish the logical bound path from the path
used to verify bytes. Live verification reads the logical path. Historical
verification maps that logical path into an immutable worktree and projects the
logical binding back into the annex; it must never rewrite the annex to a
temporary worktree path.

## Canonical live and immutable historical authority law

Live C00U/C05 and deletion validation must require the exact canonical
[`CONSUMER-UNIVERSE-BOUNDS.json`](../CONSUMER-UNIVERSE-BOUNDS.json) path, current
file SHA-256, self `manifest_hash` and `bounds_sha256`. Caller discretion over
live bounds remains forbidden. Plain `--offline` must also reject an alternate
authority because it materializes no immutable epoch.

Only `--historical-certificate` and `--immutable-authority` may consume an
alternate authority, and only when all of the following hold:

1. exactly one return pin lexically contains the authority's logical path;
2. the containing pin names a clean, available commit;
3. the logical relative path is safe, nonempty and nonescaping;
4. that commit's materialized worktree contains the path as one tracked,
   regular, non-symlink file;
5. the materialized bytes equal `file_sha256`;
6. the parsed authority has the bound self `manifest_hash` and semantic
   `bounds_sha256`;
7. the authority retains the exact root-ID, scope and quarantine laws.

Zero containing pins, multiple containing pins, an untracked file, a symlink,
different bytes or a file available only in the mutable checkout are RED.

This fits the existing historical worktree mechanism with one ordering repair.
[`tools/validate-return.mjs`](../tools/validate-return.mjs) validates the deletion
annex at lines 864–897, but initializes and materializes the pin worktree cache
only at lines 1680–1760. Move the cache/helper initialization before annex
validation and call `historicalGateWorktree(pin, pointer)` lazily for the exact
containing pin. Its existing `pin.path + pin.head` cache key must be reused by
the later pin and gate replay. A bounds-specific second worktree is forbidden.

Pass the mapped replay path to both `validateDeletionJudgment` and the later
consumer-receipt projection at validate-return lines 897–903. Descendant
validation must carry the same law from its annex, not from a caller flag or
environment variable.

The recursive return arguments at validate-return line 891 currently collapse
all offline states to `--offline`. When the parent is performing historical
gate replay, recursive deletion-return validation must use
`--historical-certificate`; plain `--offline` has no materialized authority
epoch and cannot authorize the alternate artifact.

## Required adversarial controls

The repair is incomplete without direct controls for all of the following:

1. copy the primary root's branch/HEAD into an external root;
2. substitute `sha256("fixture-clean")` for an observed dirty digest;
3. remove one declared root from a receipt, repair counts/hashes, and require
   the structural verifier to reject before live rerun;
4. omit the generated `value -> parse-that` runtime edge;
5. add an undeclared sixth Git repository under the fixture search root;
6. present the alternate authority to live validation;
7. present the alternate authority to plain `--offline`;
8. move byte-identical authority outside every pin;
9. make two pins contain the logical authority path;
10. leave the authority untracked at the pinned commit;
11. make the authority a symlink;
12. change authority bytes after the pin;
13. update file SHA-256 while leaving the authority `manifest_hash` stale;
14. recompute the authority manifest while leaving the annex binding stale;
15. regress recursive historical validation from `--historical-certificate` to
    `--offline`;
16. assert every fixture root and observation realpath lies beneath the
    temporary fixture root.

The positive control must use the real resolver twice over the unchanged
temporary constellation and compare exact roots/edges while allowing only new
receipt/epoch timestamps and hashes.

## Family disposition

- **F-01** is sustained because external Git identity and provenance were
  invented or pointed at the wrong checkout.
- **F-09** is sustained because a fixture hand-authored supposedly executable
  resolver evidence and the structural verifier accepted a rehashed partial
  projection.
- **F-13/F-14** remain the governing non-regression families for recursive
  `--offline` conflation and for any alternate authority that is not joined to
  one exact replayed clean commit and physical consumer/deletion universe.

This is an existing-family compound defect, not a new family. It resets the
focused clean counter until the construction, verifier join, authority law and
controls above are implemented and independently re-adjudicated.
