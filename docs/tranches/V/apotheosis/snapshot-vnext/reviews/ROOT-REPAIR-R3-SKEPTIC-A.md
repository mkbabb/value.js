# Root repair round 3 — skeptic A

Verdict: **NOT CLEAN**.

This was a formation-only review of RR-14 through RR-18 and their surrounding
joins. No product wave was executed, production remains **0/190**, P01 remains
born RED, and no parse-that source or package surface was modified.

## Epoch and current identities

The first substantive command was:

```text
node docs/tranches/V/vnext/tools/corpus-epoch.mjs
```

It returned the required opening epoch exactly: 183 files and SHA-256
`3d7274f4fe825a3ccdc070a781b5de286f3ee6125737aac8ec1498266feeec03`.
The 32 authorities in the current-code-identity table at
`reviews/ROOT-REPAIR-IMPLEMENTATION.md:157-190` were independently rehashed;
all 32 matched and the mismatch vector was empty. In particular, the inspected
bytes match the ledger for the clean-exec, bootstrap, custody, formation-proof,
return, consumer resolver, consumer-bounds, schema, and bounds-manifest
authorities. The current wave registry also reproduces 190 contracts, 759
edges, 149 seed requirements, and aggregate contract hash
`579a8ff6eb902d6214629ce73ec69526d4811c409208b41661f906bf6f4c3af5`.

## Blocking finding

### R3A-01 — RR-17's mandatory-root `unavailable` arm cannot pass its own authority and return joins

**Contracted state.** The formation contract deliberately distinguishes
semantic membership from current availability. `FORMATION.md:52-61` says an
unavailable root emits a self-hashed `resolvable:false` receipt and blocking
exit 2. `PROVENANCE.md:101-118` says required roots, including Slides-K, may be
included or unavailable but never excluded. `RETURN-CONTRACT.md:494-505`
repeats that law, and `waves/M-C.md:42` specifically permits C02D to return a
typed unavailable Slides-K retrigger that blocks closure.

The input schema and resolver implement that state correctly in isolation.
`consumer-universe.schema.json:210-242` defines the typed unavailable root arm.
`tools/resolve-consumer-universe.mjs:623-639` accepts a physically absent root,
requires evidence and an existing-wave retrigger, and adds the blocker; lines
659-672 retain the exact required identity and discover only available roots.
The resolver selftest deletes a required checkout and observes exit 2 plus a
blocking receipt at `tools/selftest-consumer-universe.mjs:669-697`.

**Failing composition.** The canonical authority validator rejects before that
lane can compose. `tools/consumer-bounds-authority.mjs:187-204` requires every
mandatory root path to exist and be a directory. Lines 206-256 likewise require
every typed subdirectory to exist even when its parent root is absent. This is
stricter than the resolver, whose typed-path check intentionally skips physical
existence when the parent root is unavailable
(`tools/resolve-consumer-universe.mjs:169-200`).

There is a second independent rejection after receipt creation.
`validateConsumerUniverseReceipt` defaults `requireResolvable` to true
(`tools/consumer-universe-return.mjs:93-101`) and rejects every nonempty blocker
vector at lines 225-228. The universal return path invokes it for both C00U and
C05 without overriding that default (`tools/validate-return.mjs:880-910`).
Consequently C00U cannot return the auditable blocking receipt promised by the
formation law even if authority validation is bypassed; the code applies C05's
dependency-green rule too early to C00U's audit attempt.

The current green selftest does not cover this join. It constructs and validates
the fixture authority while every root exists, and validates only the resolvable
receipt (`tools/selftest-consumer-universe.mjs:294-346`). After deleting the
required checkout it tests the resolver and receipt bytes only, not
`validateConsumerBoundsAuthority`, `validateConsumerUniverseReceipt`, the C00U
annex, or the universal return (`tools/selftest-consumer-universe.mjs:669-697`).

**Read-only reproducer.** I replaced only Node's in-process `existsSync` view of
the Slides-K path and imported the current authority validator; no filesystem
entry was changed or created.

```text
node --input-type=module -e '<patch node:fs existsSync for only /Users/mkbabb/Programming/slides-K; sync builtin ESM exports; import consumer-bounds-authority.mjs; validateConsumerBoundsAuthority()>'
```

Result:

```json
{"absentRoot":"/Users/mkbabb/Programming/slides-K","accepted":false,"error":"consumer-universe required root is unavailable: slides-k"}
```

This is fail-closed, but it is not the contracted typed failure. It loses the
root disposition, evidence, retrigger, blocker vector, receipt hash, and C00U
return needed to route the outage. Current physical availability of all fifteen
roots merely hides the defect on the happy path.

**Affected owners.** RR-17 / F-01 / F-10, C00U, C02D, C05, the canonical bounds
authority, the consumer-return composer, and the universal return validator.
Because C00U is a predecessor of the consumer adoption waves, the defect blocks
the downstream consumer branch rather than remaining local to Slides-K.

**Required correction.** Preserve the exact fifteen IDs, six typed paths,
package scopes, kinds, and hashes as semantic authority without requiring an
absent mandatory checkout to exist. Physical existence, Git identity,
disposition evidence, and retrigger validation belong in the resolver/receipt
join: an available root must still realpath exactly, while an absent mandatory
root must have exactly one unavailable row and cannot be excluded. Typed paths
beneath an unavailable parent must follow the resolver's existing skip law.
Then validate C00U's exit-2 receipt with `requireResolvable:false` for a
BLOCKED/NOT_CLEAN audit return, while retaining `requireResolvable:true` for
C05 dependency green. Add one end-to-end crater that removes a mandatory root
before authority validation, obtains and validates the exact blocking receipt,
composes the C00U annex/return, and proves that C05 rejects the same state. The
crater must include Slides-K and a root owning one of the six typed paths.

## RR-14 through RR-18 source adjudication

| Repair | Result | Current-byte evidence |
|---|---|---|
| RR-14 clean execution | No additional defect found. Canonical start/poll cells freeze workspace, yields and output budgets; exact structured receipts reject nonzero terminals; physical call/output pairs are contiguous; one pending session owns every poll; output, polls, wall time and total elapsed time are bounded; opening and closing corpus probes surround all completed audit runs. | `tools/clean-exec-contract.mjs:5-14,708-848,1211-1464`; `tools/validate-clean-passes.mjs:546-579` |
| RR-15 bootstrap, external boundary, and custody | No additional defect found. The pre-campaign authority binds a same-parent earlier child prefix, exact eight-record grammar, self/file/prefix hashes, and a timestamp before custody. Coordinator and child ciphertext carriers join byte-for-byte, while plaintext decryption is honestly external. Continuous custody begins at quiescence, admits only phase-owned transactions, ends at the pass-2 adjudicator hash, hashes reports through `O_NOFOLLOW` descriptor/path inode and nanosecond metadata continuity, then rehashes all six sessions/reports and revalidates bootstrap authority. | `FORMATION-CLEAN-PASS-PROTOCOL.md:60-104`; `tools/clean-provider-bootstrap-authority.mjs:80-153`; `tools/clean-coordinator-custody.mjs:318-430,476-624,767-825`; `tools/hash-clean-report.mjs:47-100`; `tools/validate-clean-passes.mjs:848-897` |
| RR-16 final-state triad order | No additional defect found. Formation critique and implementation review are distinct. The executable order is born RED → partition → implement → freeze → critic pair → adjudicator → sole gate/crater → receipt → return. The universal validator binds exact live pin-state digests, distinct A/B/adjudicator artifacts, critic completion before adjudicator start, adjudicator completion before gate start, and the challenge hash in the gate receipt. The content/provider-authentication limitation remains explicit rather than overstated. | `waves/P-V.md:5-36`; `tools/formation-proof-layer.mjs:10-23,43-53,159-199`; `RETURN-CONTRACT.md:379-442`; `tools/validate-return.mjs:2199-2388` |
| RR-17 consumer universe | **NOT CLEAN** for the unavailable-root composition above. The all-present path otherwise binds the exact fifteen-root set, six typed subdirectories, recursive manifests, npm lock v2/v3 direct/installed/transitive observations, runtime/type/dynamic/CSS imports, Slides and distinct Slides-K identities, exact authority/receipt hashes, and C00U→C05 rerun/delta. | `CONSUMER-UNIVERSE-BOUNDS.json:4-124`; `tools/consumer-bounds-authority.mjs:12-49,149-269`; `tools/resolve-consumer-universe.mjs:363-565,585-734`; `tools/consumer-universe-return.mjs:93-241`; `tools/validate-return.mjs:880-980` |
| RR-18 D19–D25 / G05 | No additional defect found. One canonical machine marker fixes D19 relocate; D20/D21/D23 engage+release; D22 typed N/A with reason/evidence and zero owned trigger/clock; D24 server-confirmed birth; and D25's complete exclusive six-row ledger. The projection enters the relevant wave contracts and the same-layer selftest rejects fourteen order/ledger forgeries. | `waves/G-D.md:29-33,90-96`; `tools/formation-proof-layer.mjs:25-41,55-86,140-199`; `tools/wave-contract.mjs:59-80`; `tools/selftest-formation-proof-layer.mjs:27-137` |

## Executed controls

| Command | Result |
|---|---|
| `node docs/tranches/V/vnext/tools/selftest-clean-exec-contract.mjs` | 21 positives; 225 adversarial rejections; 120-poll, 3,900,000 ms and 1,048,576-byte limits reproduced |
| `node docs/tranches/V/vnext/tools/clean-provider-bootstrap-authority.mjs` | calibration `019f7bfc-2eb2-7a70-b52a-d6be55dea6b7`; manifest hash `8f0a30a2f6321ee4682dc8aa3646ef8ff31c0e6b888a331f8c75aca43f410f08` |
| `node docs/tranches/V/vnext/tools/selftest-clean-pass-prompts.mjs` | 10 positives; 12 adversarial rejections |
| `node docs/tranches/V/vnext/tools/selftest-formation-proof-layer.mjs` | 2 positives; 14 same-layer rejections; proof hash `3a3301eee756102a80068d180d51209eb56299273df1ac299c13ba33b282cd8c` |
| `node docs/tranches/V/vnext/tools/validate-consumer-bounds.mjs` | 15 required roots; 6 typed paths; 5 packages; bounds SHA-256 `43029aea41d939ec908778d26b3763668599c7c2ac4afc65ba85d55e65c05d83` |
| `node docs/tranches/V/vnext/tools/validate-formation.mjs` | P8/V44/K27/A36/G10/D33/M13/C19 = 190; 759 edges; current formation proof hash accepted |
| `node docs/tranches/V/vnext/tools/validate-wave-contracts.mjs` | 190 contracts/gates; 149 seeds; 759 edges; aggregate `579a8ff6eb902d6214629ce73ec69526d4811c409208b41661f906bf6f4c3af5` |
| Read-only rehash of the implementation ledger | `{"checked":32,"mismatches":[]}` |
| In-process missing-Slides-K authority repro | canonical authority rejected the promised unavailable state before receipt composition |

I did not execute the temp-file-writing bootstrap, custody, or consumer-universe
selftests because this review was authorized to create only this report. Their
source mechanisms and asserted case partitions were inspected; the executed
read-only controls above are not credited as substitutes for the missing
end-to-end unavailable-root crater.

## Disposition

RR-14, RR-15, RR-16, and RR-18 have no surviving finding in this review.
RR-17 remains open. Fixing only the current all-present happy path is
insufficient: the repaired formation must preserve and return the exact typed
blocking state when a mandatory consumer disappears. After correction, rerun
the focused hostile pair and adjudicator on a fresh corpus epoch; the two later
whole-formation clean triads remain uncredited.
