# Formation-Root Repair Skeptic A

Date: 2026-07-19  
Actor: `/root/root_repair_skeptic_a2`, requested `gpt-5.6-sol` / `ultra`  
Posture: assume the universal proof repair is wrong  
Verdict: **NOT CLEAN**

This is formation review only. Production execution remains **0/190**.

## Evidence and commands

The critic reviewed the universal return/gate contract, proof runner,
challenge transcripts, validation modes, closure identity, canonical JSON,
edge policy, reopening docket, and audit registry. It ran:

```text
node docs/tranches/V/vnext/tools/validate-formation.mjs
node docs/tranches/V/vnext/tools/validate-wave-contracts.mjs
node docs/tranches/V/vnext/tools/selftest-wave-edge-policy.mjs
node docs/tranches/V/vnext/tools/selftest-canonical-order.mjs
```

Those checks returned 190 waves, 759 edges, 190 contracts, 149 seed
requirements, one edge-policy positive with ten rejections, and three
locale-independent canonical-order runs with five invalid-surrogate
rejections. `selftest-contracts.mjs` did not finish within the critic's review
window and was not credited.

## Findings

| ID | Severity | Sustained mechanism | Evidence | Required repair |
|---|---|---|---|---|
| RA-01 | High | `npm run` remains a configurable intermediary. A repository `.npmrc` can select a script shell that emits expected bytes without invoking the verified runner; the validator proves runner bytes exist but not that npm executed them. | `tools/gate-runtime.mjs:73-87,159-165`; `tools/validate-return.mjs:1936-2021`; the existing poisoned-bin control does not cover project npm configuration. | Execute the exact committed runner directly with the bound Node executable and canonical arguments; remove npm from acceptance execution and add a wrapper-bypass crater. |
| RA-02 | High | Caller-authored JSONL can prove only content consistency. It cannot locally prove provider session existence, freshness, independence, model, or effort. The synthetic positive fixture is the reproducer. | `tools/validate-return.mjs:206-284`; `tools/selftest-contracts.mjs:344-443`; `RETURN-CONTRACT.md:424-428`. | Join a trusted session store, or state the complete session/provenance/independence boundary as an external trust assumption. Do not limit that caveat to model/effort. |
| RA-03 | Medium | Challenge chronology accepts equal boundaries and does not require ordered, monotone `session_meta → user → context/work → final → task_complete` records. | `tools/validate-return.mjs:252-284,2362-2367`; the current chronology mutant tests only a clearly earlier adjudicator. | Require strict later-than joins, canonical record order, nondecreasing timestamps, and equality/reordering craters. |
| RA-04 | Medium | The strict JSON parser uses ECMAScript `\s`, admitting non-JSON whitespace, and nonfatal UTF-8 decoding can replace malformed bytes before parsing. | `tools/json-contract.mjs:60-62`; formation readers commonly call `readFileSync(..., "utf8")`; canonical-order tests cover surrogates but not byte validity or JSON whitespace. | Permit only space/tab/CR/LF; fatally decode JSON/JSONL bytes; add NBSP, BOM, malformed, overlong, and truncated UTF-8 controls. |

## Rejected suspicions

- The central 190-wave/759-edge direction, outcome hashes, and 723/24/4/8
  role vector held.
- Typed refusal rows held.
- Default live, structural offline, historical certificate, and immutable
  authority remained distinct.
- No conflicting closure identity was accepted in the reviewed composer.
- Unsigned-UTF-16 canonical ordering and lone-surrogate rejection held; RA-04
  concerns input validity rather than member ordering.
- The root docket and registry correctly retained NOT CLEAN and a zero
  clean-pass count.

The formation root remains open until every sustained mechanism is repaired
and independently adjudicated.
