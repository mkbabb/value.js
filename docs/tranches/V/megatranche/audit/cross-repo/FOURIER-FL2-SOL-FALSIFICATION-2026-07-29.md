# Fourier F-L2 hostile Sol falsification

**Date:** 2026-07-29  
**Mode:** tranche development only  
**Candidate:** Luna xhigh thread
`019faf96-fc6a-7861-b169-cbacfc8db54e`  
**Isolated evidence:**
`/Users/mkbabb/Documents/Codex/2026-07-29/fourier-luna-gate-prototypes/outputs`  
**Terminal ruling:** **REJECT-AS-ADMISSION; FOLD reproduced defects only**

## 1. Type-gate ruling

The pinned F-L2 tuple did not reproduce the historical exit-zero false green:

| command | observed exit |
|---|---:|
| `vue-tsc -b` | 1 |
| `vue-tsc -b --force` | 1 |
| `vue-tsc --noEmit -p tsconfig.json` | 2 |
| current build shape | 1 |

The historical TS2882 false green remains valid archaeology, but it is not
current-tuple authority. F-L2 also ran Node 26/npm 11 while Fourier CI pins
Node 22, and its side-effect package was synthetic rather than the actual
`@mkbabb/latex-paper@0.2.1`. The real `./theme` export points to raw CSS without
a types condition; that is a producer defect, not permission for a Fourier
ambient declaration.

The proposed wrapper merely runs `vue-tsc --noEmit` and scans output for
`error TS…`. It adds no protection when upstream already exits nonzero, misses
nonmatching exit-zero failures, and has no stale-incremental/no-output mutant.

Terminal disposition:

- KEEP one direct source gate:
  `vue-tsc --noEmit --pretty false -p tsconfig.json`;
- KEEP `npm run typecheck && vite build`;
- PRUNE `vue-tsc -b`, `--force`, and the diagnostic-scanning wrapper from the
  final gate;
- PRUNE a Fourier-owned ambient compatibility declaration;
- BLOCK the packed tuple on a producer-owned `./theme` type contract;
- run the final controls on Node 22 and the actual packed tuple;
- prove green → missing-subpath-types RED → restore green and green →
  named-export RED → restore green, plus a stale-after-green control;
- reword the present-tense “may mask” claim as a historical June defect that
  the current exact tuple did not reproduce.

## 2. Transport ruling

The live defects are source-proven:

- the client silently falls back to same-origin when its API origin is absent;
- the client emits PATCH plus authorization/session/content/conditional and
  idempotency headers;
- the client reads `ETag` and `RateLimit-Reset`;
- API CORS omits PATCH, mutation headers, and response-header exposure;
- Pages build/deploy does not bind the API origin.

The proposed analyzer is not an admissible gate. It hardcodes future truth,
regexes hand-reduced excerpts instead of the real registry/runtime, rejects
harmless extras, can green while live code drifts, and labels
`If-None-Match` current even though it is a future W11 operation. Its corrected
fixture also exposes only `ETag` despite the extant `RateLimit-Reset` read and
does not settle credential posture.

Terminal disposition:

- KEEP the A-02/A-03 defect families;
- PRUNE the regex analyzer as product or admission substrate;
- generate the operation-derived transport table in W11;
- test the real client with mock fetch;
- test FastAPI OPTIONS with an actual Origin and requested method/headers;
- assert allow/expose/credential behavior against admitted operations;
- assert the built artifact's exact API origin;
- require a deployed Browser OPTIONS → GET/PATCH → ETag/conditional/idempotency
  smoke;
- expose at minimum the extant `ETag` and `RateLimit-Reset` reads;
- admit other rate/retry headers only with an immediate consumer;
- PRUNE `allow_credentials=True` unless a cookie-auth consumer is established.

## 3. Evidence-registry ruling

The candidate validator can green with four routes while the live router has a
substantially larger route set. It checks one self-reported workflow and no
test-result, artifact, hash, viewport, or state truth.

The live evidence defects nevertheless stand: swallowed navigation, omitted
`/v`, broad console/network filters, and fixmes.

Terminal disposition:

- KEEP those born-RED defect families;
- PRUNE the standalone fixture registry;
- FOLD its useful rules into real Playwright execution;
- add only a small cross-check from actual router inventory plus the
  66-component workflow registry to Playwright JSON results and artifact
  hashes;
- assert expected negative HTTP results per operation rather than suppressing
  global console substrings;
- require zero unexpected skip/fixme and no swallowed navigation, page error,
  or request failure.

## Exact Fourier wave delta

1. `W0.U2`: direct `--noEmit`, Node 22, actual packed tuple, stale-after-green
   and Vite runtime-asset controls; delete wrapper plan and correct P-03 tense.
2. `W1`: block on the latex-paper packed `./theme` type contract; no consumer
   shim.
3. `W10.U5`: actual Playwright-result/router/workflow cross-check only.
4. `W11` then `W12.U1`: freeze the operation-derived transport table before
   client/FastAPI/deployed probes; add `RateLimit-Reset` and credential posture.
5. `W12.U2`: require `VITE_API_URL` at build and prove the built artifact points
   to the exact API origin.

## Terminal matrix

| item | disposition |
|---|---|
| F-L2 type measurements | KEEP as negative evidence |
| wrapper | PRUNE |
| synthetic package fixture | MOVE to wrong-answer control only |
| producer subpath declaration | KEEP / BLOCKED-ON latex-paper |
| transport defect evidence | KEEP |
| regex transport analyzer | PRUNE |
| evidence defect examples | KEEP |
| standalone evidence registry | PRUNE |
| direct runtime and Playwright gates | KEEP |

