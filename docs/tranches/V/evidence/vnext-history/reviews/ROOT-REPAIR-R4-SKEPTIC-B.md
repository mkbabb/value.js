# Root Repair R4 Skeptic B

## Authenticated boundary

- Frozen subject: `docs/tranches/V/vnext`
- Native corpus identity: **189 files**
- SHA-256: **`a315d91d7294a0672c5d9a5134d5f7b849efb2fc1e841bad37383db36317f645`**
- Production execution: **0/190**
- Whole-formation clean-pass credit: **0/2**
- No production, parser, staging, commit, or repository mutation receives credit.
- No file whose basename begins `ROOT-REPAIR-R4-` was read or used, and no sibling critic was contacted or inspected.

## Global verdict

**NOT CLEAN.** The R4 candidate repairs the principal R3 unavailable-root and blocking-return branches, but three RR-17 mechanism defects remain:

1. C05 does not enforce the promised complete equality between its consumer annex and deletion `consumer_scan`.
2. Historical deletion validation selects immutable consumer-receipt mode but still scans the mutable current checkout.
3. The source projector silently omits a direct optional call to bare CommonJS `require`, contradicting its fail-closed runtime-import law.

The first two defects directly affect the shared Value and Keyframes deletion/public-package/transpose composition. The third can make the supposedly total consumer census resolvable over a missing runtime edge.

## Findings

### R4B-RR17-PROJECTION-01 — C05 joins only two fields of the promised complete deletion consumer projection

**Mechanism family:** RR-17 / C05 consumer-to-deletion immutable-projection identity.

The normative requirement is exact:

- `docs/tranches/V/vnext/waves/M-C.md:50` requires the C05 deletion annex to contain the same complete consumer projection as the C05 census.
- `docs/tranches/V/vnext/RETURN-CONTRACT.md:725-733` says deletion `consumer_scan` carries the complete exact immutable projection, including receipt/input/bounds/schema/resolver/registry, epoch/counts, root/edge hashes, resolvability, and blockers.
- `docs/tranches/V/vnext/tools/consumer-universe-return.mjs:30-51` defines that immutable identity and includes `receipt_path`, file hashes, authority, semantic hashes, timestamps, complete epoch/counts, root/edge hashes, resolvability, and blockers.

Each side is internally authenticated:

- `docs/tranches/V/vnext/tools/validate-return.mjs:943-957` compares the top-level C05 annex with its verified receipt projection.
- `docs/tranches/V/vnext/tools/deletion-judgment.mjs:312-337` separately compares deletion `consumer_scan` with its verified receipt projection.

The only cross-annex equality check is then:

- `docs/tranches/V/vnext/tools/validate-return.mjs:1159-1163`

That check compares only `receipt_hash` and `epoch.epoch_sha256`.

A benign counterexample is two canonical regular files containing identical receipt bytes at different absolute output paths. The top-level C05 annex can bind the first path while deletion `consumer_scan` binds the second. Both validate independently, and their receipt and epoch hashes agree, so the cross-annex guard reports no mismatch even though `receipt_path`—an explicit immutable-binding field—differs. Historical validation can likewise bind distinct authority objects with identical semantic bounds.

**Observed versus expected:** the implementation establishes “same receipt payload and epoch,” while the contract and repair ledger claim “same complete consumer projection.”

**Impact and false-green path:** C05 can certify that deletion rehearsal used its exact frozen census while permitting divergent custody coordinates or authority identity. That weakens the content-addressed C05→deletion→C10 chain and makes the R4 claim at `docs/tranches/V/vnext/reviews/ROOT-REPAIR-IMPLEMENTATION.md:120-127` stronger than the executable join.

**Superior correction:** normalize both objects through `consumerUniverseImmutableBindingProjection`, compare every immutable field canonically, and retain the deletion phase-specific `authority` field as a separate check. Add negative controls for a byte-identical receipt at another path and a second self-consistent authority with identical semantic bounds.

### R4B-RR17-DELETION-EPOCH-02 — historical deletion validation scans mutable present-day bytes

**Mechanism family:** RR-17 / immutable consumer epoch and deletion casualty replay.

The global mode contract distinguishes historical epoch proof from present truth:

- `docs/tranches/V/vnext/RETURN-CONTRACT.md:44-65` says historical-certificate mode proves `accepted_at_epoch`, not `holds_now`.
- `docs/tranches/V/vnext/RETURN-CONTRACT.md:480-492` says immutable consumer validation does not rerun live discovery.
- `docs/tranches/V/vnext/RETURN-CONTRACT.md:725-733` says historical deletion validation revalidates the complete immutable consumer projection.

The universal validator selects that mode correctly at its boundary:

- `docs/tranches/V/vnext/tools/validate-return.mjs:1106-1117` passes `consumerValidationMode: "immutable"` and disables the live consumer-resolver rerun in offline/historical modes.
- `docs/tranches/V/vnext/tools/deletion-judgment.mjs:312-320` consequently authenticates the immutable receipt binding.

The deletion layer then leaves the frozen epoch:

- `docs/tranches/V/vnext/tools/deletion-judgment.mjs:177-218` scans each receipt root’s current checkout with current `git ls-files` results and current file bytes.
- `docs/tranches/V/vnext/tools/deletion-judgment.mjs:415-428` validates historical truth receipts against the current repository and merely requires the historical after-HEAD to be an ancestor of its present HEAD.
- `docs/tranches/V/vnext/tools/deletion-judgment.mjs:540-574` unconditionally calls `liveCasualtyHits`, regardless of `consumerValidationMode`.

A benign state example is a historical K22T or K23 return pinned at commit H, followed by an ordinary descendant commit or untracked file in the same checkout. Adding a file containing the decision’s tombstone pattern can make the unchanged historical return fail; removing a formerly unreported occurrence before delayed certification can make the past epoch appear clean. The outcome is therefore a function of the mutable present checkout, not solely H and the authenticated immutable projection.

The shared fixtures do not expose this composition:

- `docs/tranches/V/vnext/tools/selftest-consumer-universe.mjs:1069-1085` proves that an immutable consumer receipt remains valid after a root advance, but it does not pass that advanced state through deletion judgment.
- `docs/tranches/V/vnext/tools/selftest-keyframes-target-transpose.mjs:1260-1304` creates the final census and immediately validates the K22T historical return.
- `docs/tranches/V/vnext/tools/selftest-keyframes-public-package.mjs:233-304,909-913` likewise creates the K23 deletion scan and validates it before a later checkout epoch.
- `docs/tranches/V/vnext/tools/value-target-resolution-fixture.mjs:419-468` uses the same consumer-receipt and deletion-scan construction for the Value fixture family.

**Observed versus expected:** consumer receipt validation is immutable, but casualty judgment is live. Historical results can change without any authenticated return, receipt, annex, or pinned-commit byte changing.

**Impact and false-green path:** a delayed historical certificate can authenticate deletion safety using future descendant bytes. It can also turn previously valid Value or Keyframes historical evidence red because of unrelated later work. Either result defeats reproducible epoch proof and contaminates K22T, K23, M10T, Value transpose, C05 aggregation, and C10 release inheritance.

**Superior correction:** scan a content-addressed file snapshot or a managed worktree materialized at each receipt root’s authenticated HEAD. Pass that mapping into deletion judgment instead of dereferencing the original mutable checkout. Add one shared Value/Keyframes control that advances the live root after receipt capture and proves the historical deletion result remains byte-for-byte invariant.

### R4B-RR17-SOURCE-03 — optional bare `require` calls disappear instead of failing closed

**Mechanism family:** RR-17 / deterministic static runtime-edge projection.

The contract requires unsupported candidate import syntax to fail closed:

- `docs/tranches/V/vnext/waves/M-C.md:37`
- `docs/tranches/V/vnext/RETURN-CONTRACT.md:508-512`

The tokenizer recognizes optional chaining as a distinct `?.` punctuator at:

- `docs/tranches/V/vnext/tools/resolve-consumer-universe.mjs:743-746`

The projector recognizes bare CommonJS loading only when `require` is followed immediately by `(`:

- `docs/tranches/V/vnext/tools/resolve-consumer-universe.mjs:916-924`

There is no rejection arm for bare `require` followed by `?.`. The token sequence is simply ignored. It therefore never reaches `scanSource` at `docs/tranches/V/vnext/tools/resolve-consumer-universe.mjs:1003-1006`, never enters the observed map, and cannot be caught by the declared-versus-observed comparisons at `docs/tranches/V/vnext/tools/resolve-consumer-universe.mjs:1195-1207`.

A minimal benign input is a CommonJS source file that optionally calls the in-scope bare `require` function with one literal `@mkbabb/value.js` specifier. When `require` is present, this loads the package, but the current projection emits no runtime occurrence and no syntax failure. A universe that omits the runtime tuple can consequently reach the blocker-free derivation at `docs/tranches/V/vnext/tools/resolve-consumer-universe.mjs:1303-1327`.

The syntax fixture covers ordinary direct `require` and a false object-property call at `docs/tranches/V/vnext/tools/selftest-consumer-universe.mjs:34-58`; it does not cover the optional direct-call form.

**Impact and false-green path:** C00U can emit `resolvable:true` over a missing runtime edge. Every later immutable binding, deletion casualty scan, Value fixture, Keyframes fixture, C05 rehearsal, and hash join can then faithfully authenticate the incomplete edge set.

**Superior correction:** explicitly recognize an optional call to bare `require` with one bounded literal argument as a runtime edge, or reject it as unsupported candidate syntax. Add omission and wrong-kind controls and distinguish it from property calls such as an object member named `require`.

## Hostile checks that did hold

The following R4 repairs are present and internally consistent under this lens:

- Structural bounds authentication no longer requires every declared repository root to be physically present. Required-root shape and typed subpath laws are checked at `docs/tranches/V/vnext/tools/consumer-bounds-authority.mjs:197-263`; live presence and Git identity are owned by `docs/tranches/V/vnext/tools/resolve-consumer-universe.mjs:295-372`.
- The unavailable-edge matrix distinguishes unavailable sources from available-source/unavailable-target edges and retains observations for the latter at `docs/tranches/V/vnext/tools/resolve-consumer-universe.mjs:375-400`.
- The return schema admits C00U `COMPLETE` and `BLOCKED` while keeping C05 resolvable-only at `docs/tranches/V/vnext/return.schema.json:200-259,1145-1174`.
- Live C00U replay distinguishes resolver exits 0 and 2, authenticates blockers, and bijects blocking routed remainder at `docs/tranches/V/vnext/tools/validate-return.mjs:893-917,920-1009`.
- C05 still rejects blocking consumer receipts and requires a fresh predecessor delta at `docs/tranches/V/vnext/tools/validate-return.mjs:1011-1071`.
- C10’s deletion layer compares its C05 baseline projection and requires empty root/edge deltas at `docs/tranches/V/vnext/tools/deletion-judgment.mjs:349-405`.
- The shared fixture helper constructs the full immutable binding rather than the former partial binding at `docs/tranches/V/vnext/tools/consumer-universe-fixture.mjs:400-409`.
- The Keyframes public-package and target-transpose fixtures consume that helper at `docs/tranches/V/vnext/tools/selftest-keyframes-public-package.mjs:289-304` and `docs/tranches/V/vnext/tools/selftest-keyframes-target-transpose.mjs:203-218`.
- The wave totals in `docs/tranches/V/vnext/PLAN.md:12-24` and `docs/tranches/V/vnext/README.md:127-137` both sum to 190.
- The zero-credit state is consistent across `docs/tranches/V/vnext/reviews/ROOT-REPAIR-IMPLEMENTATION.md:5-16,134-174`, `docs/tranches/V/vnext/AUDIT-REGISTRY.md:116-123`, `docs/tranches/V/vnext/README.md:139-144`, and `docs/tranches/V/vnext/PLAN.md:26-45`.
- The canonical bounds file, semantic-bounds, and manifest hashes agree across `docs/tranches/V/vnext/waves/M-C.md:37,50`, `docs/tranches/V/vnext/RETURN-CONTRACT.md:469-475`, and `docs/tranches/V/vnext/reviews/ROOT-REPAIR-IMPLEMENTATION.md:211-219`.
- All 40 hashes actually listed in the candidate identity table at `docs/tranches/V/vnext/reviews/ROOT-REPAIR-IMPLEMENTATION.md:176-219` matched their named current bytes. That byte agreement does not close the cross-file mechanisms above.
- `API-OPERATIONS.md`, `API-RETURN-COVERAGE.json`, `api-contract.source.json`, `return.schema.json`, and the API checks loaded by `tools/validate-return.mjs:75-142` showed no separate R4 API ownership or coverage mismatch.

## Inspected validators and controls

The review inspected the current source and composition of:

- `tools/corpus-epoch.mjs`
- `tools/consumer-bounds-authority.mjs`
- `tools/resolve-consumer-universe.mjs`
- `tools/consumer-universe-return.mjs`
- `tools/validate-return.mjs`
- `tools/deletion-judgment.mjs`
- `tools/deletion-truth.mjs`
- `tools/selftest-consumer-universe.mjs`
- `tools/selftest-deletion-judgment.mjs`
- `tools/consumer-universe-fixture.mjs`
- `tools/consumer-universe-return-mode-fixture.mjs`
- `tools/selftest-keyframes-target-transpose.mjs`
- `tools/selftest-keyframes-public-package.mjs`
- `tools/value-target-resolution-fixture.mjs`
- `tools/value-target-transpose-fixture.mjs`
- `tools/validate-api-return-coverage.mjs`
- `tools/validate-wave-contracts.mjs`

Terminal read-only controls observed before the review boundary closed were:

- Corpus epoch: 189 files and the required SHA-256.
- Consumer-universe selftest: 2 valid real-Git receipts, 44 resolver rejections, 11 receipt-projection rejections, 2 blocking receipts, 22 syntax controls, 1 return-annex control, and 11 immutable controls.
- Deletion-judgment selftest: owner/C05/C10 positives 1/1/1, 3 same-root truth receipts, 1 modified-only receipt, and 36 adversarial rejections.
- Candidate identity table: 40 listed rows, zero byte-hash mismatches.

Those greens receive no closure credit because none tests the three cross-file counterexamples above.

## Required disposition

Reopen RR-17 for the three mechanism families above. Preserve the repaired unavailable-root and C00U blocking branches, but require:

1. complete C05 consumer-annex/deletion-scan immutable-binding equality;
2. epoch-stable deletion casualty replay from authenticated historical bytes;
3. fail-closed handling of optional bare `require` calls;
4. shared post-epoch Value and Keyframes controls;
5. refreshed affected identities, corpus epoch, and a wholly fresh R4 hostile pair plus adjudicator.

Production remains **0/190**, whole-formation clean credit remains **0/2**, and the candidate is not eligible to advance C05 or begin either clean triad.
