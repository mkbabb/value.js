SERVED MODEL: claude-opus-5-5

# Packet: keyframes.js, RD-11 (the exact pin) and the UIA-KF-177 repin hand-off

**From**: value.js, X-W11 `.e` (Track A), 2026-10-28. **To**: keyframes.js (master `5c48e3da`, the X·KF lane). **INBOX row**: O-117. **Grant**: by packet only. value.js holds no direct-edit grant in keyframes.js, and no emergency patch release is owed (RD-11, ruled; CC-084's "exact-pin consumers notified").
**Authority**: W11.md G9 and G12; COHESION §0fl.2 (ESC-W13X-r3res2f-1, UIA-KF-177's kf half re-homed by id to this release repin); EXECUTION-RUNBOOK E-1 (KF.W3 is gate-keyed on `RC-P(V)`, never scheduled).

## 1. The coordinate and the pin

- `@mkbabb/value.js@4.1.0` is `latest`: shasum `d488535c9bfc747e318895417c28a753a3b7b3d6`, integrity `sha512-K7wcvd+P6rjxxEhwnrSpBVyzYZPs5TMg1zmbe6gOG9s1qaUGZOnProxkZxXgTQfIUqXN81yPFPzB56w9mb95SQ==`, provenance attested.
- keyframes.js declares `"@mkbabb/value.js": "4.0.0"`, an EXACT pin (`package.json:71`). A clean `npm ci` at kf HEAD resolves `@mkbabb/value.js@4.0.0` (integrity `sha512-Z8ywb4ht…SzGw==`). So 4.1.0 is excluded until kf moves the pin.
- Because the pin is exact, any project that installs both kf and value.js ^4 carries two copies. Measured in a clean glass-ui install with 4.1.0: `node_modules/@mkbabb/value.js` 4.1.0 and `node_modules/@mkbabb/keyframes.js/node_modules/@mkbabb/value.js` 4.0.0.

## 2. What a repin to 4.1.0 meets, measured

This was a scratch copy of kf HEAD (⟨`git archive HEAD`⟩; the kf tree was not touched): `npm ci` (4.0.0), then ⟨`npm install @mkbabb/value.js@4.1.0 --save-exact --ignore-scripts`⟩ → ⟨`npm ls @mkbabb/value.js`⟩ `@mkbabb/value.js@4.1.0` (glass-ui 10.1.2's copy dedupes onto it).

**Typecheck** (⟨`vue-tsc --noEmit -p tsconfig.json && … -p tsconfig.test.json`⟩): exit 2, 3 errors, all in one file:

- `demo/components/instrument/timeline/components/TimelineHoverPreview.vue(276,10)`: `'"@mkbabb/value.js/transform"' has no exported member 'decomposeMatrix2D'`
- the same at `(276,29)` for `decomposeMatrix3D`, and at `(277,15)` for the type `Mat4`.

    4.1.0 retired the unused transform matrix family (X-W9 G27 / CC-094; "no shim, no forwarding export"). X-W9's census measured 0 consumers in value.js `demo/` and in `../keyframes.js/src`, but **not** in kf's `demo/`, where `TimelineHoverPreview.vue` (last touched by kf `ff9cbabc`, 2026-09-25) imports both functions. `PathGeometry`, which kf's MorphSVG uses (`src/animation/svg/morph-geometry.ts:18`, `morph-svg.ts:45`), is preserved and resolves.

**Tests** (⟨`vitest run --maxWorkers=2`⟩): `Test Files 4 failed | 289 passed | 5 skipped (298)` · `Tests 13 failed | 2274 passed | 2 expected fail | 14 skipped (2303)`.

| file                                                  | failed | cause at the bytes                                                                                                                                                                                             |
| ----------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `test/demo/instrument/timeline-hover-preview.test.ts` | 5      | `TypeError: decomposeMatrix2D is not a function`, the retired family (above)                                                                                                                                   |
| `test/ingest/keyframes-name-escapes.test.ts`          | 6      | the clause (c) title reads "REFUSED, citably, by value.js 4.0.0": `expected [] to include 'PARSE_ERROR'`. 4.1.0's grammar accepts the escaped identifiers that 4.0.0 refused, so the escaped sibling now links |
| `test/compile/easing-identity.test.ts`                | 1      | "NEGATIVE CONTROL — value.js's own `easing()` is unstable for 21 of the 40": `expected +0 to be 21`. 4.1.0's `easing()` is stable for all 40                                                                   |
| `test/compile/grammar-fuzz.test.ts`                   | 1      | malformedColourArb counterexample `oklch()`. kf's arbitrary pins 4.0.0's empty-argument behaviour (CC-084 R1, cured in 4.1.0)                                                                                  |

**Control at the declared 4.0.0** (the same scratch copy, `npm ci` from kf HEAD's own lockfile, ⟨`npm ls`⟩ → `@mkbabb/value.js@4.0.0`), the 4 failing files only: ⟨`guarded -- npx vitest run --maxWorkers=2 <the 4 files>`⟩ → `Test Files 4 passed (4)` · `Tests 105 passed (105)`. So all 13 failures are attributable to the 4.0.0 → 4.1.0 difference.

## 3. The asks (kf-owned, by packet)

1. **Move the pin** `4.0.0` → `4.1.0` (exact, or `^4.1.0`), in the same act as the glass 10.2.0 repin, per COHESION §0fl.2.
2. **Re-home the demo's matrix decomposition.** `TimelineHoverPreview.vue:276-277` needs a kf-owned `decomposeMatrix2D` / `decomposeMatrix3D` / `Mat4`, or the 4.0.0 algorithm vendored into kf's demo. value.js will not re-export the retired family (G27's falsifier).
3. **Re-aim the four 4.0.0-behaviour tests.** Each asserts a 4.0.0 defect that 4.1.0 cures (escaped-identifier refusal, unstable `easing()`, the `oklch()` empty-argument path). The negative controls need a new subject, or the clauses need to state 4.1.0's accepting behaviour. Their assertions are kf's to restate; none of them is a value.js regression.
4. **UIA-KF-177 (kf half).** 4.1.0 publishes the unit fields the kf half waits on. ⟨`grep -n 'durationUnit\|delayUnit' dist/subpaths/css.d.ts`⟩ on the registry tarball → `:93 durationUnit?: CssTimeUnit;` and `:97 delayUnit?: CssTimeUnit;`. The `AnimationOptions` unit plumbing is GRANTED at the repin (§0fl.2: ingest `compile/parse-facade.ts`, emit `css-text.ts` and the other emit sites), with a falsifier showing the authored unit surviving, RED → GREEN ×2.
5. **KF.W3** opens or does not on `RC-P(4.1.0)`, evaluated by its commands. That reading is in value.js X-W11's FINAL (§RC-P(V)). This packet does not open it.
