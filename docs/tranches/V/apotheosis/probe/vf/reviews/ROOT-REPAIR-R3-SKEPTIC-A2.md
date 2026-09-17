# Root Repair R3 — Skeptic A2

## Review boundary

- Role: fresh hostile software-quality skeptic A2.
- Scope: RR14–RR18 formation artifacts only.
- Production state: held at **0/190**. No implementation wave, package publication, deployment, parse-that mutation, staging, or commit was performed.
- Evidence basis: current non-R3 formation authorities, schemas, validators, selftests, wave rows, and read-only reproductions.

## Frozen corpus binding

The first substantive review command was exactly:

`node docs/tranches/V/vnext/tools/corpus-epoch.mjs`

It returned:

```json
{
  "schema": "vnext-formation-corpus-epoch/1",
  "files": 183,
  "exclusions": [
    "FORMATION-CLEAN-PASSES.json",
    "reviews/FORMATION-CLEAN-PASS-1-A.md",
    "reviews/FORMATION-CLEAN-PASS-1-B.md",
    "reviews/FORMATION-CLEAN-PASS-1-ADJ.md",
    "reviews/FORMATION-CLEAN-PASS-2-A.md",
    "reviews/FORMATION-CLEAN-PASS-2-B.md",
    "reviews/FORMATION-CLEAN-PASS-2-ADJ.md"
  ],
  "sha256": "3d7274f4fe825a3ccdc070a781b5de286f3ee6125737aac8ec1498266feeec03"
}
```

All conclusions below bind that exact pre-report epoch.

## Verdict

**NOT CLEAN.** RR17 leaves one repeatable same-layer defect. The resolver can create the expressly required typed blocking receipt for an unavailable mandatory root, but the canonical authority/receipt/return chain cannot validate or return that receipt. This is a new surviving mechanism, so no formation clean-pass credit may accrue against this epoch.

## Surviving finding

### A2-RR17-01 — the unavailable-root receipt cannot cross the canonical C00U/C05 return boundary

**Owner:** C00U, with the shared consumer-bounds/consumer-return validation layer and C05 live-rerun join. C02D's distinct Slides-K branch is the concrete mandatory-root crater.

**Contract promised.** `FORMATION.md:52-61` says an unavailable root or edge produces a self-hashed `resolvable:false` receipt and blocking exit 2, while C05 later requires `resolvable:true`. `waves/M-C.md:37` repeats the exit-2 receipt law, and `waves/M-C.md:42` expressly permits a typed unavailable Slides-K retrigger that blocks closure. The universal return schema also admits nonterminal `BLOCKED` and `NOT_CLEAN` statuses (`return.schema.json:34-36`).

**Resolver branch exists.** `resolve-consumer-universe.mjs:623-657` accepts a missing root only when it is typed `unavailable`, verifies its evidence and retrigger, and adds a blocker. Required child paths are skipped only for that unavailable parent (`:169-201`). The receipt derives `resolvable` from the blocker vector, self-hashes, is written, and exits 2 (`:785-847`). The current selftest exercises this isolated resolver branch and observes one exit-2 receipt (`selftest-consumer-universe.mjs:669-715`).

**Canonical validation makes the branch unreachable.** Three independent joins reject the promised result:

1. `validateConsumerBoundsAuthority` requires every mandatory root to exist and be a real directory before it returns authority (`consumer-bounds-authority.mjs:185-204`), and likewise requires every mandatory child path to exist (`:206-256`). A genuinely unavailable Slides-K/root therefore cannot reach receipt validation.
2. `validateConsumerUniverseReceipt` defaults `requireResolvable = true` and rejects any exact blocking receipt at `consumer-universe-return.mjs:93-101,225-228`. `validate-return.mjs:877-890` requires the consumer annex for C00U and C05 regardless of return status but supplies no status-aware `requireResolvable:false` mode.
3. Even if those two checks were relaxed, live return validation rejects every nonzero resolver rerun at `validate-return.mjs:897-918`; the specified blocking result is exit 2, so it is rejected before its receipt can be compared.

The existing unavailable selftest stops after reading `resolvable` and blocker count from the resolver output. It never passes that receipt through `validateConsumerUniverseReceipt`, a C00U/C05 annex projection, or a nonterminal universal return. Its reported `valid_return_annex_controls:1` therefore covers only the resolvable branch.

**Read-only reproduction.** With only `existsSync('/Users/mkbabb/Programming/slides-K')` projected false in memory, canonical authority validation returned:

```json
{"accepted":false,"error":"consumer-universe required root is unavailable: slides-k"}
```

Independent source-shape projection returned:

```json
{"return_statuses":["COMPLETE","KEEP","PRUNE","REFUSED","BLOCKED","NOT_CLEAN"],"c00u_requires_annex_all_statuses":true,"live_rerun_rejects_any_nonzero":true,"status_aware_require_resolvable":false}
```

This is not merely a failure to complete C00U—which is correct while a root is unavailable. It is a failure to authenticate and carry the exact blocking evidence in the nonterminal return format expressly provided for that situation. The system currently forces a choice between an unvalidated side receipt and pretending the mandatory root is mounted.

**Required correction.** Keep resolved/advancing returns at least as strict as they are now, while making the blocking arm first-class:

1. Separate immutable authority validation (file/self-hash, exact fifteen IDs, six typed path laws, lexical containment and bounds) from live mounted-root validation, or pass an exact unavailable-ID projection derived from the verified input. Only roots typed unavailable, and required child paths beneath those roots, may skip `stat`/`realpath`; present roots and paths remain strict. The live resolver must continue to reject an `unavailable` declaration when that path exists.
2. Bind the resolver itself to the canonical bounds authority, with an explicit fixture authority only for tests. A hash computed solely from caller-supplied embedded bounds is not an independent canonical-authority join.
3. Make receipt resolvability status-aware. Advancing C00U/C05 returns must require `resolvable:true` and zero blockers. A nonterminal return may carry `resolvable:false`, but its blocker vector must exactly join its blocking routed remainder; it must never become dependency-advancing.
4. In live return replay, accept exactly exit 0 for a resolved receipt and exactly exit 2 for a blocking receipt. Validate the emitted file in the matching mode and compare roots, edges, blockers, resolvability, authority hashes, and receipt hashes. Reject every exit/receipt mismatch and every other exit code.

**Repair gate.** Add same-layer adversarial tests that:

- remove one mandatory fixture root with required child identities and take its exit-2 receipt through canonical/fixture authority validation, receipt validation, annex projection, and a `BLOCKED` C00U return;
- exercise the distinct Slides-K route explicitly;
- prove `COMPLETE` C00U and C05 reject that same receipt;
- prove a blocking live replay accepts exit 2 only with the exact false receipt and blockers;
- prove an existing root falsely marked unavailable, an undeclared unavailable ID, and an available root/path with realpath drift still reject;
- prove the normal resolved branch remains exit 0, strictly mounted, blocker-free, and dependency-advancing.

After repair, freeze a new corpus epoch and run a wholly fresh hostile A/B pair plus adjudicator. This epoch cannot receive pass-1 credit.

## RR14–RR18 disposition

### RR14 — canonical asynchronous clean-exec liveness: clean on reviewed evidence

The repair has a closed launch/poll state machine rather than trusting a yielded cell. Canonical source generators fix both outer and nested budgets (`clean-exec-contract.mjs:5-18,708-733`); receipt parsing requires exactly one terminal exit or owned session (`:792-848`); physical call/output records must be unique, contiguous, chronological pairs (`:1211-1291`); and the fold reconstructs output while enforcing session identity, at most 120 polls, 3,900,000 ms, 1,048,576 UTF-8 bytes, successful termination, and no commentary interruption (`:1294-1463`). `validate-clean-passes.mjs:543-579` consumes logical runs and requires the two epoch commands to be the first and last completed runs.

`node docs/tranches/V/vnext/tools/selftest-clean-exec-contract.mjs` passed with **21 positives and 225 rejections**, including the fixed resource limits. No additional RR14 mechanism survived.

### RR15 — provider boundary, bootstrap authority, and continuous custody: clean on reviewed evidence

The protocol names its non-self-certified boundaries instead of claiming transcript cryptography it does not possess. The coordinator/host filesystem boundary is explicit at `FORMATION-CLEAN-PASS-PROTOCOL.md:20-24`; authenticated plaintext delivery remains an explicit provider trust boundary at `:70-80`. The pre-campaign bootstrap calibration is corpus-owned, binds the earlier session's first eight physical records and digest matrix, must predate custody, and is rechecked after all six sessions (`:86-107`; `clean-provider-bootstrap-authority.mjs:61-153`).

The custody protocol binds one physical line interval from quiescence through all two-pass spawns, observations, root-only report persistence, immediate descriptor-safe report hashes, and the pass-2 adjudicator hash (`FORMATION-CLEAN-PASS-PROTOCOL.md:142-209`). The implementation validates exact physical positions and permitted activity, not a timestamp-window proxy; final validation rehashes all session/report files, revalidates bootstrap authority, and recomputes the closing corpus epoch (`validate-clean-passes.mjs:850-897`). `hash-clean-report.mjs` uses a single `O_NOFOLLOW` descriptor with inode/path/size/time continuity.

The live bootstrap authority command passed and returned calibration session `019f7bfc-2eb2-7a70-b52a-d6be55dea6b7`, calibrated at `2026-07-19T20:05:53.477Z`, with manifest hash `8f0a30a2f6321ee4682dc8aa3646ef8ff31c0e6b888a331f8c75aca43f410f08`. Its current authority file SHA-256 is `a3e74b866279e7a9651e3bb53f4cd30aba95de841f9e2590475361b3bfd05098`.

### RR16 — formation/implementation separation and immutable final-state challenge order: clean on reviewed evidence

`waves/P-V.md:5-36` distinguishes the formation triad from implementation review and contains the exact machine order `born_red → partition → implement → freeze → critic pair → adjudicator → gate/crater → receipt → return`. `formation-proof-layer.mjs:10-23,159-199` hashes and validates that projection and its ordered prose. `validate-return.mjs` binds distinct critic/adjudicator sessions and reports, exact prompts, immutable live state, adjudication-before-gate chronology, and the implementation-challenge hash in every gate receipt. `wave-contract.mjs` gives every wave exactly one canonical direct command gate.

The proof-layer selftest passed **2 positives and 14 same-layer forgery rejections**. Wave validation passed **190 contracts, 190 gates, 149 seed requirements**, formation-proof hash `3a3301eee756102a80068d180d51209eb56299273df1ac299c13ba33b282cd8c`, and wave-manifest hash `579a8ff6eb902d6214629ce73ec69526d4811c409208b41661f906bf6f4c3af5`.

### RR17 — complete manifest/lock/transitive consumer census: not clean only for A2-RR17-01

The census breadth repair itself is present. It scans all four package manifest sections (`resolve-consumer-universe.mjs:363-391`), npm package-lock v2/v3 installed/direct/transitive records (`:393-445`), literal static/type/dynamic/CSS source edges (`:447-481`), and recursively traverses bounded repository trees (`:483-529`). It closes observed/declaration joins and catches omitted lock/transitive edges (`selftest-consumer-universe.mjs:617-627`).

Canonical bounds validation otherwise passed with one search root, **15 required roots, 6 required paths, and 5 package scopes**; authority file SHA-256 is `aefd4ff211c644a8b96916cfb1229ccd4b535a6304497e44696948f0db246437`, manifest hash `390038efc53df1e60ae3c89a98b4db55bbbfbe93c6a15ae61bae23e0da402b88`, and semantic bounds hash `43029aea41d939ec908778d26b3763668599c7c2ac4afc65ba85d55e65c05d83`. Those greens do not cover the unavailable-root authority/return composition identified above.

### RR18 — D19–D25 G05 disposition closure: clean on reviewed evidence

`waves/G-D.md:90-96` gives D19 `relocate`, D20/D21/D23 `engage`/`release`, D24 `birth`, and D22 the exclusive typed N/A arm with reason and evidence. D25 owns the exact six-row ledger and is audit-only. `formation-proof-layer.mjs:25-41,55-87,140-199` emits those rows as machine projections; each projection is included in the hashed wave contract.

The current contract projection returned exactly those six rows, with D22 alone using `effects:[]` plus typed `not_applicable`. A dependency traversal also proved every D19–D24 row has a transitive G05 predecessor; for example, D19 reaches G05 through `D19 → D02 → D01 → D00 → D00A → K24 → K23 → K22T → K14 → G07 → G06 → G05`. The 190-wave validator and 14-forgery proof selftest both passed. No RR18 mechanism survived.

## Current non-R3 consistency ledger

- `validate-seat-ledger.mjs`: passed 32 seats, 15 panels, 7 closed triads, 14 batches, `gpt-5.6-sol/ultra`, runtime `root+3`, and 3 external-upstream witnesses. `FORMATION-SEAT-LEDGER.json` file SHA-256: `9b5b55fe4ced04e17c73f5f36ef7c5fd19b8f82946b67d27976b637daa5a2ab9`.
- `clean-provider-bootstrap-authority.mjs`: passed with the calibration and hashes recorded above.
- `selftest-clean-exec-contract.mjs`: passed 21 positives / 225 rejections.
- `selftest-formation-proof-layer.mjs`: passed 2 positives / 14 same-layer forgery rejections.
- `validate-wave-contracts.mjs`: passed 190/190 contracts and gates; edge-policy manifest hash `d4c9b937a939adfb0602083198323eeec1a51533644071e889a15456bfeaae1f`.
- `validate-consumer-bounds.mjs`: passed 15 roots / 6 paths / 5 packages with semantic bounds hash `43029aea41d939ec908778d26b3763668599c7c2ac4afc65ba85d55e65c05d83`.
- `FORMATION-CLEAN-PASSES.json` and all six excluded clean-pass reports are absent. That is consistent with no clean campaign having begun and grants zero clean-pass credit.

## Final routing

Route A2-RR17-01 to C00U's consumer authority/receipt/return layer, include C05's exit-2 live replay, and exercise the Slides-K mandatory-root crater. Preserve every reviewed RR14, RR15, RR16, and RR18 mechanism. Production remains **0/190** until the repair, new epoch, and fresh formation challenge close.
