# Formation-Root Repair Skeptic B

Date: 2026-07-19  
Actor: `/root/root_repair_skeptic_b3`, requested `gpt-5.6-sol` / `ultra`  
Posture: assume the consumer, transpose, and deletion joins are wrong  
Verdict: **NOT CLEAN**

This is formation review only. Production execution remains **0/190**.

## Evidence and commands

The critic reviewed the five-root resolver/authority fixture, Value and
Keyframes composition records, deletion truth/judgment, parse-that
coordination, and aggregate closure registration. It ran only existing local
selftests:

```text
node docs/tranches/V/vnext/tools/selftest-consumer-universe.mjs
node docs/tranches/V/vnext/tools/selftest-deletion-judgment.mjs
node docs/tranches/V/vnext/tools/selftest-keyframes-target-transpose.mjs
```

Their pre-repair vectors were respectively `2/22/8/1/1`, owner/C05/C10
`1/1/1` plus 32 rejections, and `6+5` positives plus `30+22` rejections.
The Value transpose run was stopped at the reporting boundary and was not
credited.

## Findings

| ID | Severity | Sustained mechanism | Evidence | Required repair |
|---|---|---|---|---|
| RB-01 | High | Keyframes mirrored-test dataflow tracks binding names rather than lexical symbols. A shadowed import/assert/test name can satisfy the AST check without the mirrored source reaching the assertion. The interrupted precursor review additionally identified that any call result is marked derived when any argument is derived, even when the callee ignores it. | `tools/keyframes-proof-contract.mjs:60-74,91-131,166-203`; existing laundering controls near `tools/selftest-keyframes-target-transpose.mjs:1074` omit lexical shadowing and ignored-argument calls. | Resolve binding references by declaration/scope identity; conservatively propagate call/new results only from a derived callee/receiver; add source/assert/test shadowing and ignored-argument call craters. |
| RB-02 | High | Deletion judgment collects every truth-receipt modified path but checks only that declared modified effects are non-invented. Exact union equality is enforced only for deleted effects, so a mixed delete-plus-modify receipt can omit its modified paths while counting as used through the deletion. The positive fixture itself contains this omission. | `tools/deletion-judgment.mjs:400-409,473-475,583-588`; `tools/selftest-deletion-judgment.mjs:392-417,482-500,644-647`. | Accumulate declared modified effects and require an exact bijection with `actualModifiedEffects`; make the positive fixture declare its mixed-receipt modifications and add an omission crater. |

## Rejected suspicions

- Five-root identities, the exact authority, two resolver passes, and the
  complete root/edge receipt projection held.
- Value and Keyframes composition records otherwise bound their physical
  vectors and shared deletion truth.
- The stale parse-that V2 clearance is intentional and execution-born RED.
- Aggregate registration already includes Value, Keyframes, deletion,
  consumer, and coordination suites; RB-01 and RB-02 are missing assertions
  inside registered tests rather than missing registration.

The formation root remains open until both sustained mechanisms are repaired
and independently adjudicated.
