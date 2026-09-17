# ROOT-REPAIR R3 Hostile Skeptic B

## Verdict

**NOT CLEAN.** One reproducible RR-17 integration defect survives. The current
machine happens to have all fifteen mandatory Git roots mounted, so the normal
positive census is green, but the canonical authority/receipt-validation layer
cannot authenticate the typed unavailable-root audit receipt that the normative
contract and resolver both define. That makes a specified fail-closed branch
unreachable across layers and reopens the formation-root repair.

No production wave was executed. Production remains **0/190**. I did not read a
sibling R3 report and did not modify parse-that, production source, staging, or
history. This report is the only authored artifact.

## Frozen inspection boundary

The first substantive command was:

```text
node docs/tranches/V/vnext/tools/corpus-epoch.mjs
```

It returned:

```json
{
  "schema": "vnext-formation-corpus-epoch/1",
  "files": 183,
  "sha256": "3d7274f4fe825a3ccdc070a781b5de286f3ee6125737aac8ec1498266feeec03"
}
```

The same command was repeated during the final pre-authorship boundary check
and returned the same file count and SHA-256. The review file did not exist
during either boundary read.

The authoritative status remains formation-only:

- `docs/tranches/V/vnext/reviews/ROOT-REPAIR-IMPLEMENTATION.md:5-14` says
  production is 0/190, RR-14 through RR-18 remain open pending focused hostile
  review, parse-that remains published 1.0.0-only, and P01 remains born RED.
- `docs/tranches/V/vnext/reviews/ROOT-REPAIR-IMPLEMENTATION.md:121-123` says the
  focused reports had not closed and the whole-pass count remained zero.
- `docs/tranches/V/vnext/AUDIT-REGISTRY.md:116-121`,
  `docs/tranches/V/vnext/README.md:139-142`, and
  `docs/tranches/V/vnext/PLAN.md:26-42` independently retain zero pass credit,
  0/190 production execution, and the two-fresh-triad prerequisite.

## Surviving finding

### R3B-RR17-01 — mandatory unavailable roots cannot cross canonical bounds authority

**Owner and impact:** formation-root RR-17, with C00U as the mechanism owner.
C05 is the first dependency-green consumer; the defect also reaches the C08,
C09, C10, consumer-return, and deletion-judgment projections that reuse the
same canonical authority validation. This is a blocking mechanism defect, not
a request to execute any product wave.

#### Normative branch

The contract defines the unavailable branch rather than treating it as prose:

- `docs/tranches/V/vnext/RETURN-CONTRACT.md:446-460` requires C00U's exact
  resolver output and complete input-to-output receipt authentication.
- `docs/tranches/V/vnext/RETURN-CONTRACT.md:494-499` says a required root may be
  included or explicitly unavailable with a blocking retrigger, never excluded;
  the physical-path requirement is explicitly scoped to an **available**
  repository-subdirectory.
- `docs/tranches/V/vnext/RETURN-CONTRACT.md:501-505` calls an unavailable root or
  edge valid when it has evidence and an existing-wave retrigger; the resolver
  must persist `resolvable:false` and exit 2.
- The C00U row at `docs/tranches/V/vnext/waves/M-C.md:37` repeats that an
  unavailable row emits a typed non-resolvable receipt and exit 2. The C02D row
  at `docs/tranches/V/vnext/waves/M-C.md:42` specifically requires a Slides-K
  included row or a typed unavailable retrigger that blocks closure.

The resolver implements that law. At
`docs/tranches/V/vnext/tools/resolve-consumer-universe.mjs:634-639`, an absent
root with `status:"unavailable"` has its evidence and retrigger checked and
produces a blocker. Required identities are then checked at line 659. The
receipt derives `resolvable` from blocker count at lines 825-831 and exits 2 at
line 847. The return projection likewise derives exact unavailable blockers at
`docs/tranches/V/vnext/tools/consumer-universe-return.mjs:74-84` and verifies
blockers/resolvability at lines 225-228.

#### Contradicting authority layer

The canonical bounds authority is disposition-blind:

- `docs/tranches/V/vnext/tools/consumer-bounds-authority.mjs:185-203`
  unconditionally requires every mandatory root path to exist and be a
  directory before any receipt/root disposition is available to it. The
  decisive rejection is lines 193-195.
- `docs/tranches/V/vnext/tools/consumer-bounds-authority.mjs:206-255`
  unconditionally requires every typed subdirectory to exist as well; lines
  242-247 reject the necessarily absent child of an unavailable repository.
- `docs/tranches/V/vnext/tools/consumer-universe-return.mjs:93-101` exposes
  `requireResolvable`, including the non-green inspection mode, but lines
  137-143 always run the disposition-blind authority validator first. Therefore
  `requireResolvable:false` cannot authenticate the normative unavailable-root
  receipt against canonical authority.

The existing selftest does not join these layers. It validates the return
projection only for the earlier available fixture at
`docs/tranches/V/vnext/tools/selftest-consumer-universe.mjs:294-346`. It later
removes the fixture root, forms unavailable root/edge dispositions, and checks
resolver exit 2 at lines 669-697, but never passes that receipt through
`validateConsumerUniverseReceipt`. Its green summary at lines 708-715 therefore
does not exercise the contradictory boundary.

#### Read-only reproduction

This command changes no filesystem byte. It simulates only the declared
Slides-K root being absent, updates Node's named builtin exports, then invokes
the canonical authority validator:

```text
node --input-type=module -e 'import {createRequire,syncBuiltinESMExports} from "node:module"; const target="/Users/mkbabb/Programming/slides-K"; const require=createRequire(import.meta.url); const fs=require("node:fs"); const original=fs.existsSync; fs.existsSync=(path)=>String(path)===target?false:original(path); syncBuiltinESMExports(); const mod=await import("./docs/tranches/V/vnext/tools/consumer-bounds-authority.mjs?unavailable-repro"); try { mod.validateConsumerBoundsAuthority(); console.log("ACCEPTED"); } catch (error) { console.log(JSON.stringify({simulated_unavailable:target,result:"REJECTED",message:error.message})); }'
```

Observed result, exit 0 from the observation wrapper:

```json
{"simulated_unavailable":"/Users/mkbabb/Programming/slides-K","result":"REJECTED","message":"consumer-universe required root is unavailable: slides-k"}
```

The expected contract behavior is not dependency green. It is a successfully
authenticated, typed blocking receipt with the unavailable root/retrigger,
`resolvable:false`, and resolver exit 2. The actual cross-layer behavior rejects
the semantic authority before that receipt can be authenticated.

All fifteen roots are physically present today, which explains why ordinary
positive controls do not reveal this defect. A separate read-only realpath/Git
check returned `{"count":15,"all_canonical_git_roots":true}` for:
`atlas-active`, `bbnf-buddy`, `bbnf-lang`, `fourier-analysis`, `glass-ui`,
`keyframes`, `latex-paper`, `muster`, `parse-that`, `sci-report`, `slides`,
`slides-k`, `speedtest`, `value`, and `words`. Current availability is not a
proof that the specified unavailable branch composes.

#### Required wave-shaped repair

Reopen RR-17 at C00U and keep production held. The repair must:

1. Separate immutable bounds-shape authentication from live presence checks.
   The authority validator must still bind the exact fifteen IDs, six typed
   paths, absolute/canonical declared strings, package/target/kind scope,
   quarantine exclusions, file hash, semantic bounds hash, and manifest hash.
2. Make physical presence disposition-aware in the resolver/receipt layer.
   Included or excluded available roots must retain strict directory, realpath,
   Git identity, containment, and discovery checks. A required root declared
   unavailable must be physically absent, carry evidence and a valid retrigger,
   never be excluded, and force its dependent edges and receipt to block.
3. Treat required subdirectories under an unavailable required root as blocked
   by that root rather than requiring impossible live `realpathSync` evidence.
   Once the root is available, every typed subdirectory must again satisfy the
   current strict existence, exact-realpath, and containment law.
4. Add a same-layer integration control that creates a canonical or explicitly
   permitted fixture authority, obtains the resolver's exit-2 unavailable
   receipt, and passes it through
   `validateConsumerUniverseReceipt(..., {requireResolvable:false})`. It must
   assert the exact blocker projection and reject exclusion, forged evidence,
   a false unavailable claim for an existing root, and any attempt to treat the
   blocking receipt as dependency green.
5. Preserve the existing mounted-root positive and the 29 resolver plus eight
   receipt-projection adversarial rejections. After amendment, run one wholly
   fresh focused hostile pair and adjudicator against the new formation epoch;
   any later whole-formation clean-pass counter starts from zero.

## Eight-area hostile adjudication

The surviving finding above controls the global verdict. The remaining areas
were checked independently so a green local selftest is not being used to erase
the cross-layer failure.

### 1. RR-14 canonical asynchronous clean execution

`docs/tranches/V/vnext/tools/clean-exec-contract.mjs:5-14` freezes the outer and
nested timing/output limits. Lines 708-776 construct exact launch and empty poll
cells; lines 792-848 validate the provider receipt envelope. Lines 1211-1464
fold physical cells into logical runs and enforce chronology, one session,
terminal completion, poll/time/output limits, output reconstruction, and no
commentary interruption. In particular, lines 1386-1391 compare reported wall
time with the physical call/output interval.

A read-only synthetic fold reproduced an asynchronous start/poll and an
impossible-wall-time rejection:

```text
node --input-type=module -e 'import {canonicalCleanStartSource,canonicalCleanPollSource,foldCleanExecRuns} from "./docs/tranches/V/vnext/tools/clean-exec-contract.mjs"; const ts=(ms)=>new Date(Date.parse("2026-07-19T00:00:00.000Z")+ms).toISOString(); const outer=(receipt)=>[{type:"input_text",text:"Script completed\nWall time 0.1 seconds\nOutput:\n"},{type:"input_text",text:JSON.stringify(receipt)}]; const cells=[{id:"start",input:canonicalCleanStartSource("node audit.mjs"),receipt:{session_id:7,output:"left",wall_time_seconds:0.05},a:0,b:100},{id:"poll",input:canonicalCleanPollSource(7),receipt:{exit_code:0,output:"right",wall_time_seconds:0.05},a:200,b:300}]; const executed={calls:new Map(),outputs:new Map()}; for(const [i,c] of cells.entries()){executed.calls.set(c.id,{line:i*2+1,timestamp:ts(c.a),kind:"custom_tool_call",name:"exec",input:c.input});executed.outputs.set(c.id,{line:i*2+2,timestamp:ts(c.b),kind:"custom_tool_call_output",value:outer(c.receipt)});} const ok=foldCleanExecRuns(executed); const impossible={calls:new Map([["wall",{line:1,timestamp:ts(0),kind:"custom_tool_call",name:"exec",input:canonicalCleanStartSource("node wall.mjs")}]]),outputs:new Map([["wall",{line:2,timestamp:ts(100),kind:"custom_tool_call_output",value:outer({exit_code:0,output:"",wall_time_seconds:2})}]])}; const bad=foldCleanExecRuns(impossible); console.log(JSON.stringify({async:{commands:ok.runs.map(r=>r.command),poll_count:ok.runs[0].pollCount,reconstructed_output:ok.runs[0].result.output,elapsed_ms:ok.runs[0].elapsedMs,failures:ok.failures},impossible_wall_time:{failures:bad.failures}},null,2));'
```

Result: the logical command was `node audit.mjs`, poll count was 1,
reconstructed output was `leftright`, elapsed time was 300 ms, and failures
were empty. The second fold rejected reported 2000 ms against a 100 ms physical
interval plus the 1000 ms tolerance. The canonical selftest exited 0 with 21
positives and 225 adversarial rejections. No additional RR-14 defect reproduced.

### 2. RR-15 provider bootstrap authority

`docs/tranches/V/vnext/CLEAN-PROVIDER-BOOTSTRAP.json:1-36` pins the calibration
session, parent, line-8 prefix hash, provider digest matrix, and manifest hash.
`docs/tranches/V/vnext/tools/clean-provider-bootstrap-authority.mjs:61-70`
derives the only three-field binding. Lines 72-153 validate exact keys, current
bytes/self-hash, the eight-record calibration prefix, same-root parent,
pre-custody time, and observed digest projection. The clean manifest can bind
only path/file hash/manifest hash at
`docs/tranches/V/vnext/formation-clean-passes.schema.json:32-40`; it cannot
re-author the digest matrix.

The authority command exited 0 and reported calibration time
`2026-07-19T20:05:53.477Z`, session
`019f7bfc-2eb2-7a70-b52a-d6be55dea6b7`, and the pinned authority manifest. Its
selftest exited 0 with one positive and six rejections. No additional bootstrap
defect reproduced.

### 3. RR-15 prompt identity and child carrier

`docs/tranches/V/vnext/tools/clean-pass-prompts.mjs:31-52` seals and checks the
prompt body SHA-256 and incorporates it into the provider-visible task name.
Lines 54-94 put the same digest and corpus epoch in the attestation; lines
96-146 define critic/adjudicator prompts, exact canonical cells, boundary epoch
commands, allowlist law, sibling isolation, and content-addressed critic reads.
`docs/tranches/V/vnext/tools/clean-exec-contract.mjs:257-594` validates the child
transcript bootstrap/carrier, lines 597-680 validate the spawn triplet, and
lines 683-695 join ciphertext fragments. The declared limitation remains an
explicit authenticated-provider boundary rather than a local plaintext claim.

The prompt selftest exited 0 with 10 positives and 12 adversarial rejections.
No additional prompt/task/carrier defect reproduced.

### 4. RR-15 continuous coordinator custody and persistence

`docs/tranches/V/vnext/tools/clean-coordinator-custody.mjs:318-363` requires a
continuous physical-line sequence and chronology; lines 366-418 bind the exact
custody slice; lines 435-469 distinguish active from inert envelopes; lines
502-592 enforce quiescence/completion observations; lines 595-650 enforce phase
tool absence; and lines 653-837 implement exact spawn, persistence, immediate
hashing, two-pass order, and the pass-2 adjudicator-hash terminus.
`docs/tranches/V/vnext/tools/hash-clean-report.mjs:47-100` uses no-follow,
descriptor identity, and metadata continuity. Closing validation re-reads the
six sessions/reports at
`docs/tranches/V/vnext/tools/validate-clean-passes.mjs:471-643`, consumes custody
at lines 837-864, then rehashes reports, sessions, bootstrap, manifest, and
corpus at lines 866-897.

The custody selftest exited 0 with six positives and 32 custody rejections; its
hash-helper submatrix had two positives and 12 rejections. Adversarial source at
`docs/tranches/V/vnext/tools/selftest-clean-coordinator-custody.mjs:576-610`,
654-692, and 725-808 covers interposed effects, missing/wrong hashes, order,
forbidden tools, and physical gaps. No additional custody defect reproduced.

### 5. RR-16 formation versus immutable final-state challenge

The machine order is exact at
`docs/tranches/V/vnext/tools/formation-proof-layer.mjs:10-23` and in the source
marker at `docs/tranches/V/vnext/waves/P-V.md:15`. The surrounding normative
prose at `docs/tranches/V/vnext/waves/P-V.md:5-36` separates pre-mutation
formation critique from born-RED, partition, implementation, freeze, two
final-state critics, adjudicator, sole gate/crater, receipt, and return; a repair
invalidates that state and requires a fresh triad.

The universal return law at
`docs/tranches/V/vnext/RETURN-CONTRACT.md:379-432` preserves the same split.
`docs/tranches/V/vnext/tools/validate-return.mjs:2199-2388` binds the frozen
state, requires both critics before the adjudicator, requires all hostile
reviews to complete strictly before the gate at lines 2368-2374, and joins the
challenge hash into the gate at lines 2382-2388.

The formation-proof selftest exited 0 with two positives and 14 same-layer
forgery rejections. `selftest-contracts.mjs` exited 0 with 88 adversarial
rejections; `validate-formation.mjs` reported 190 waves, 759 edges, contract hash
`e8942c859b776f8793e6ade34a34f6d828735a8037a3736aa5ac1a25021839ea`, and
proof hash `3a3301eee756102a80068d180d51209eb56299273df1ac299c13ba33b282cd8c`;
`validate-wave-contracts.mjs` reported 190 contracts/gates, 149 seed
requirements, 759 edges, and aggregate hash
`579a8ff6eb902d6214629ce73ec69526d4811c409208b41661f906bf6f4c3af5`.
No additional RR-16 defect reproduced.

### 6. RR-17 bounded discovery breadth and present-day identities

`docs/tranches/V/vnext/CONSUMER-UNIVERSE-BOUNDS.json:32-57` binds all five
package scopes and all eight edge kinds, including lock and transitive edges.
Lines 59-75 enumerate the fifteen mandatory roots and lines 76-124 enumerate
the six typed subdirectories. The exact IDs and laws are duplicated as code
constants at `docs/tranches/V/vnext/tools/consumer-bounds-authority.mjs:12-49`.

The resolver scans manifest dependency classes at
`docs/tranches/V/vnext/tools/resolve-consumer-universe.mjs:363-391`, npm lockfile
v2/v3 package maps including installed/direct/transitive facts at lines 393-445,
static runtime/type/dynamic/CSS imports at lines 447-481, and bounded recursive
filesystem entries at lines 483-529. Lines 621-678 check roots, Git identities,
exact discovery, and required identities; lines 680-727 enforce the declared
versus observed edge bijection; lines 729-847 close hashes and receipt state.

`validate-consumer-bounds.mjs` exited 0 with 15 roots, six paths, five packages,
file SHA-256 `aefd4ff211c644a8b96916cfb1229ccd4b535a6304497e44696948f0db246437`,
bounds SHA-256 `43029aea41d939ec908778d26b3763668599c7c2ac4afc65ba85d55e65c05d83`,
and manifest SHA-256
`390038efc53df1e60ae3c89a98b4db55bbbfbe93c6a15ae61bae23e0da402b88`.
The consumer selftest exited 0 with two
real-Git receipts, 29 resolver rejections, eight projection rejections, one
resolver-only unavailable blocker, and one available return-annex control. The
present-day 15-root Git check was green. Those results establish current scope
breadth, but the missing unavailable-receipt integration is R3B-RR17-01.

### 7. RR-18 D19-D25 exclusive Breath ledger

The executable marker at `docs/tranches/V/vnext/waves/G-D.md:29-33` has exactly
six mutually exclusive rows: D19 `relocate`; D20, D21, and D23
`engage`/`release`; D22 typed N/A with required reason/evidence and no effects;
D24 `birth`. The corresponding wave contracts at
`docs/tranches/V/vnext/waves/G-D.md:90-96` state those obligations and make D25
audit-only.

`docs/tranches/V/vnext/tools/formation-proof-layer.mjs:25-41` freezes the exact
machine projection; lines 55-87 bind mandatory row prose; lines 140-156 project
each contract; and lines 159-199 verify marker/source identity and stage order.
The exact `loadWaveContracts()` projection reproduced those six rows, including
D22's empty-effects N/A arm, and D25 carried the same complete ledger. The proof
selftest's 14 same-layer forgeries cover missing, duplicate, wrong-arm, and
order/source drift. No additional RR-18 defect reproduced.

### 8. Ledger, byte identities, and zero-credit closure state

The focused ledger's claimed mechanisms are at
`docs/tranches/V/vnext/reviews/ROOT-REPAIR-IMPLEMENTATION.md:73-119`. A read-only
comparison of all 32 SHA-256 rows at lines 155-190 against current bytes returned
`{"rows":32,"mismatches":[]}`. This proves byte agreement with the ledger, not
semantic cleanliness; R3B-RR17-01 is in the interaction between individually
hashed tools.

`node docs/tranches/V/vnext/tools/validate-clean-passes.mjs` exited 1 with:

```text
FORMATION-CLEAN-PASSES.json is absent; two consecutive fresh clean triads have not closed
```

`node docs/tranches/V/vnext/tools/validate-p01-authorship.mjs` exited 0 while
reporting `state:"born_red"`, zero author receipts, and
`completion_eligible:false`. Thus no validator result, focused repair, or this
review has minted clean-pass or production credit.

## Executed validator matrix

All repository commands below were observational; selftests used only their
internally managed temporary fixtures.

| Command | Result used in this judgment |
|---|---|
| `node docs/tranches/V/vnext/tools/corpus-epoch.mjs` | exit 0 twice before authorship; 183 files; epoch `3d7274f4fe825a3ccdc070a781b5de286f3ee6125737aac8ec1498266feeec03` |
| `node docs/tranches/V/vnext/tools/selftest-clean-exec-contract.mjs` | exit 0; 21 positives; 225 rejections; 120 polls/3,900,000 ms/1,048,576 bytes enforced |
| `node docs/tranches/V/vnext/tools/clean-provider-bootstrap-authority.mjs` | exit 0; pinned calibration authority validated |
| `node docs/tranches/V/vnext/tools/selftest-clean-provider-bootstrap-authority.mjs` | exit 0; 1 positive; 6 rejections |
| `node docs/tranches/V/vnext/tools/selftest-clean-pass-prompts.mjs` | exit 0; 10 positives; 12 rejections |
| `node docs/tranches/V/vnext/tools/selftest-clean-coordinator-custody.mjs` | exit 0; 6 custody positives/32 rejections; 2 hash positives/12 rejections |
| `node docs/tranches/V/vnext/tools/selftest-formation-proof-layer.mjs` | exit 0; 2 positives; 14 same-layer forgeries rejected |
| `node docs/tranches/V/vnext/tools/validate-formation.mjs` | exit 0; 190 waves; 759 edges |
| `node docs/tranches/V/vnext/tools/validate-wave-contracts.mjs` | exit 0; 190 contracts/gates; 149 seed requirements; 759 edges |
| `node docs/tranches/V/vnext/tools/selftest-contracts.mjs` | exit 0; 88 adversarial rejections |
| `node docs/tranches/V/vnext/tools/validate-consumer-bounds.mjs` | exit 0; 15 roots; 6 paths; 5 package scopes |
| `node docs/tranches/V/vnext/tools/selftest-consumer-universe.mjs` | exit 0; 2 real-Git positives; 29 resolver and 8 receipt-projection rejections; unavailable branch tested only at resolver layer |
| `node docs/tranches/V/vnext/tools/selftest-corpus-safety.mjs` | exit 0; quarantine rejected before metadata/traversal; clean-report exclusions exact |
| `node docs/tranches/V/vnext/tools/validate-p01-authorship.mjs` | exit 0; born RED; zero authors; completion ineligible |
| `node docs/tranches/V/vnext/tools/validate-clean-passes.mjs` | exit 1 as required; clean manifest absent |

## Final adjudication

RR-14, RR-15, RR-16, and RR-18 have no additional reproducible defect on the
inspected epoch. RR-17 is **not clean** because its typed unavailable-root law is
implemented by the resolver but rejected by the mandatory bounds authority
before receipt authentication. Current all-mounted success does not close that
cross-formation branch. Reopen RR-17/C00U, implement the disposition-aware
authority split and same-layer integration test above, preserve production at
0/190, and require a wholly fresh focused hostile pair plus adjudicator on the
new epoch.
