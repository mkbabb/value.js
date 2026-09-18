# G16 skeptic 1 — independent semantic audit

## Verdict

**ACCEPT**

I assumed the candidate and evidence were semantically wrong and attempted to reproduce a blocking defect at the tranche, feature-contract, and individual-behavior levels. I reproduced none. This verdict applies only to the exact frozen G16 subject and its narrowly stated benchmark claim; it is not integration or production approval.

## Frozen subject

- Subject: `docs/tranches/V/apotheosis/pi/mirror/cells/syntax-consume-number/g16/skeptic-subject.json`
- Required and observed SHA-256: `e97b1786ffd5a7046d64e80fd39a3e88143e38a99626780b1b9973e187f975fc`
- Candidate H2 required and observed SHA-256: `8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa`

All other hashes named directly by the subject matched: the G15 feature/interface/root disposition; the G16 correctness replay, evidence, and tsconfig; all seven benchmark artifacts; and both preflight audits. The inherited G14 feature contract matched its pin `266df7a5994fd7a75cb7bb2eee2fbcee02d38320ae0dde265727c6737626dc29`. The pinned CSSWG document matched `3f129d17407f9bd027291bcfb8015beb86fc229bf5efe505b49ec2dc30be4390`, and `sed -n '1610,1678p' ... | sha256sum` reproduced the excerpt pin `3d9bc61ac4fbaa5a1038354c260e2289bc334b9837b9faf5acab840439cc5708`.

I did not inspect any other file under `g16/reviews`, mutate the subject/candidate/evidence, run fresh timing, or read or touch production source.

## Findings by altitude

### 1. Total tranche fitness

The G16 correction actually binds the unchanged H2 candidate and supplies directly executable correctness evidence for it. The exact replay stdout byte-matched `correctness/evidence.json`. The replay covers all 180 sealed cases, the frozen G14 public evaluator, and an independently written imperative-scanner assay totaling 65,024 calls. The evidence truthfully limits the post-freeze corpus claim and does not claim cryptographically isolated author access.

The benchmark bundle is coherent within its stated narrow scope. Untimed self-test and two-lane validation passed. I independently parsed all 545 bound raw NDJSON records: one attempt ID; 30 child processes; 360 sample blocks; 30 summaries and exits; and one inference and terminal record. Every recorded block log ratio equals `Math.log(h2/deposed)`, every child summary equals the arithmetic mean of its 12 blocks, and recomputation across 30 child aggregates exactly reproduced:

- mean log ratio: `-0.07336197220979548`
- sample SD: `0.027244341177386378`
- one-sided 95% upper log-ratio bound: `-0.06491032168356216`
- strict qualification: `upper < 0`

The result limits the performance claim to the exact 64-row common-domain corpus and pinned environment. It does not use that benchmark as proof of feature, integration, or production fitness. I performed no timing.

### 2. Feature boundary and specification fidelity

The normative excerpt describes the CSS Syntax consume-a-number algorithm: optional sign, digit run, a fraction only when a dot is followed by a digit, and an exponent only when its optional sign is followed by a digit. H2's single expression is language-equivalent at the declared starts-number boundary:

`[+-]?(?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+)(?:[Ee][+-]?[0-9]+)?`

Greedy digit runs give the maximal valid prefix. Requiring a digit inside the optional fraction and exponent groups leaves incomplete suffixes unconsumed, including `.`, `e`, `e+`, and `e-`; a second fraction remains outside the first consumed number. The projection derives `sign` from the consumed first code unit, derives `type` from whether a decimal point or exponent marker was actually consumed, and applies the contract's explicit `Number(consumedRepresentation)` binary64 rule.

The candidate uses direct `@mkbabb/parse-that` combinators, constructs its parser graph once at module initialization, and contains no manual cursor/source loop, slicing scanner, token layer, per-call parser construction, or external read. Its ordinary non-throwing parser introspection and stable Parser ID/context/keys were exercised by the replay. The CSS algorithm itself assumes a starts-number precondition; the inherited feature contract deliberately and consistently specifies parser-transaction behavior outside that precondition, which H2 satisfies.

### 3. Individual semantic behavior

No mismatch was reproduced in the following hostile areas:

- **Maximal prefix and rollback:** `1e+` consumes integer `1`; `1.2.3` consumes number `1.2`; incomplete exponents and repeated fractions remain available to a parent. Holdout families `maximal-prefix`, `incomplete-exponents`, `repeated-fraction`, and `parent-composition` all passed.
- **Sign and type:** absent, plus, and minus signs are distinguished; an exponent changes `type` to `number` even when the numeric value is integral; unconsumed punctuation does not change the type.
- **Binary64:** targeted checks passed `-0`, `-0e999999`, positive and negative overflow, `5e-324`, underflow of `2e-324`, and ordinary decimal/exponent values using `Object.is` where signed zero matters.
- **UTF-16 offsets:** the parser advances by the matched representation's UTF-16 code-unit length at nonzero offsets, including offsets after astral characters, and fails transactionally when positioned in nonnumeric surrogate context. The 16 sealed UTF-16 cases and the wider wrapped-context assay passed.
- **Failure transaction:** on ordinary and ahead-diagnostic failures, source identity/content, offset, and predecessor value identity are preserved and `isError` becomes true. Pre-existing ahead diagnostics remain structurally unchanged.
- **Result contract:** each success produces a fresh `Object.prototype` object with own-key order `sign,type,value`; ordinary enumerable/writable/configurable data descriptors; extensibility; and `Object.isFrozen(result) === false`. The "frozen" property belongs to the exact candidate/subject binding, not to the result leaf.
- **Hostile/no-throw scope:** the public hostile cases, 16 sealed hostile cases, and independent long bounded strings up to 200,000 code units completed without a candidate throw. This supports the contract's public hostile-case scope, not an impossible promise against resource exhaustion or invalid non-string/non-offset inputs outside the declared preconditions.
- **Repeat behavior:** fresh result identity, stable semantic signatures, stable parser introspection, and no per-invocation Parser-ID growth all passed.

## Commands and evidence

- `sha256sum` over the frozen subject and every directly bound candidate, contract, correctness, benchmark, and preflight artifact — all pins matched.
- `sed -n '1610,1678p' .../css-syntax-3.Overview.bs | sha256sum` — exact normative excerpt pin matched.
- `../../../node_modules/.bin/tsc -p correctness/tsconfig.json --noEmit` — exit 0.
- `../../../node_modules/.bin/tsx correctness/holdout-replay.mts --verify` — exit 0; 180/180 holdout cases, frozen public evaluator PASS, and 65,024-call independent assay PASS.
- `../../../node_modules/.bin/tsx correctness/holdout-replay.mts --verify 2>/dev/null | cmp -s - correctness/evidence.json` — exact replay/evidence byte match.
- `../../../node_modules/.bin/tsc -p bench/tsconfig.json --noEmit` — exit 0.
- `../../../node_modules/.bin/tsx bench/benchmark.mts --self-test` — `PASS_FROZEN_STRUCTURE_NO_TIMING`.
- `../../../node_modules/.bin/tsx bench/benchmark.mts --validate` — exact 64-case/128-observation two-lane correctness result reproduced; no timing.
- Read-only Node recomputation over `raw-first-attempt.ndjson` and `result.json` — raw hash `372fef4094e34b1b78d9ab8e48fcf36bcda7557f2e8ba54cac637c222de11e54`, 545 records, all event/cardinality checks and bound inference values matched.
- Read-only inline `tsx` adversarial probe — signed zero, underflow/subnormal, infinities, rollback, repeated fraction, nonzero UTF-16 offset, and ahead-diagnostic transaction PASS. My first invocation contained two incorrect hand-counted expected end offsets and failed on that test expectation; the corrected code-unit counts passed and exposed no candidate defect.

## Justified credit

This report justifies one fresh skeptic **ACCEPT** for the exact H2 semantic candidate, the directly reproducible correctness evidence, and the benchmark's expressly limited fixed-corpus claim. It awards no integration or production credit and does not itself promote the feature. The subject's feature, integration, and production credit remains zero until the required five-skeptic process and synthesis complete.
