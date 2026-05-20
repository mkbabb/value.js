# E.W3 — e2e/ coverage expansion + smoke-safari + flake fix + env-noise shared fixture

**Opens after**: E.W2 close.
**Lanes**: 3 — A (reactivity-instant flake fix + 14 interactive-flow specs), B (smoke-safari WebKit project + sustained spec), C (env-noise fixture consolidation).
**Status**: planned.

Closes the e2e coverage gaps (`E-AUDIT-6 §4`) + the smoke-safari follow-up filed at D.W6.

## Scope

### Lane A — reactivity-instant flake fix + 14 interactive-flow specs

Per `E-AUDIT-6 §4 + §10 + AUD-6.6, AUD-6.7`:

#### A.1 — reactivity-instant flake under parallel load

`e2e/smoke/reactivity-instant.spec.ts:111` (slider-keyboard) — median 54.30ms under 2-worker parallel load (over the 50ms gate); 31.20ms solo. The CI `retries: 2` papers over a real architectural mismatch.

**Two paths to fix** (pick one based on what the data suggests):
- **Option 1 (workers:1)**: configure `smoke` project to run reactivity-instant in single-worker mode (or extract to its own project). The wall-clock measurement is sensitive to driver-RTT jitter under parallel load; single-worker isolates the test from CI noise.
- **Option 2 (methodology refactor)**: instead of measuring from real `page.mouse.move` (which adds 4× protocol RTTs), drive the canvas via direct event dispatch + measure from `pointerup` to docs-pane settle. Threshold tightens to ≤ 30ms.

Decision at lane dispatch — Option 1 is KISS, Option 2 is more measurement-accurate but more invasive.

#### A.2 — 14 interactive-flow specs

E-AUDIT-6 §4 enumerates the 14 gaps. Spec list:

User flows (8):
1. `e2e/smoke/flows/vote-toggle.spec.ts` — login flow + vote click + count update + re-vote-undo.
2. `e2e/smoke/flows/login-register.spec.ts` — anonymous register + login flow + /me check.
3. `e2e/smoke/flows/palette-save.spec.ts` — create palette + save + verify in saved list.
4. `e2e/smoke/flows/palette-edit.spec.ts` — edit palette name/slug.
5. `e2e/smoke/flows/palette-delete.spec.ts` — delete + confirm + verify absence.
6. `e2e/smoke/flows/palette-fork.spec.ts` — fork from existing palette + verify the fork has new slug + parent recorded.
7. `e2e/smoke/flows/color-propose.spec.ts` — propose color name + verify in pending queue.
8. `e2e/smoke/flows/palette-flag.spec.ts` — flag a palette + verify in flagged queue.

Admin flows (6):
9. `e2e/smoke/admin/flows/tag-create.spec.ts` — admin creates tag.
10. `e2e/smoke/admin/flows/tag-delete.spec.ts` — admin deletes tag (verify cascade).
11. `e2e/smoke/admin/flows/user-status.spec.ts` — admin suspends/restores a user.
12. `e2e/smoke/admin/flows/palette-feature.spec.ts` — admin toggles palette featured.
13. `e2e/smoke/admin/flows/color-approve.spec.ts` — admin approves a proposed color name.
14. `e2e/smoke/admin/flows/color-reject.spec.ts` — admin rejects a proposed color name.

All use B.W3 binding invariants (role/label only, no `waitForTimeout`, no `.lucide-*`, no `page.evaluate` for interaction). Per-spec budget: 25-35 lines.

For flows that mutate server state (most of these), use the existing `admin-auth.ts` fixture pattern (addInitScript localStorage seeding + page.route mocks) — OR a new `user-auth.ts` fixture for non-admin flows.

**Sub-gate A**:
- `reactivity-instant.spec.ts` median ≤ 50ms across 5 consecutive runs under the configured worker policy.
- `ls e2e/smoke/flows/*.spec.ts | wc -l` ≥ 8 (user flows).
- `ls e2e/smoke/admin/flows/*.spec.ts | wc -l` ≥ 6 (admin flows).
- All specs green; total smoke count rises from 21 → ≥ 35.

### Lane B — smoke-safari WebKit project + sustained spec

Per the D.W6 D-FINAL-named follow-up (`E-AUDIT-2 D-bucket D-03 + E-AUDIT-4 §3`). The D.W5 Lane C Pixel-7 spec runs Chromium (not WebKit); iOS-Safari engine-specific bugs aren't caught.

1. **Add `smoke-safari` project to `playwright.config.ts`**:
   ```ts
   {
     name: "smoke-safari",
     testDir: "./e2e/smoke/safari",
     use: { ...devices["iPhone 14"], headless: true },  // or iPhone 14 Pro for the latest
   }
   ```
2. **Write `e2e/smoke/safari/sustained-30s.spec.ts`** — 30-second sustained spec that:
   - Boot the demo.
   - Open the palettes pane.
   - Drive the spectrum canvas for ~10 seconds (the iOS-Safari stack-overflow at frame ~294 from the recursion-guard pattern).
   - Switch views several times.
   - Check the goo-blob renders (the WebGL-on-WebKit class).
   - Assert zero `webglcontextlost`, zero `RangeError: Maximum call stack`, zero `[stale prop]` console substrings.
3. **CI integration** — extend `.github/workflows/node.js.yml` to run `--project=smoke-safari` (deferred to E.W4 CI lane).

**Sub-gate B**:
- `playwright.config.ts` has `smoke-safari` project.
- `e2e/smoke/safari/sustained-30s.spec.ts` exists + passes locally.
- The spec catches the iOS-Safari recursion-guard pattern (verify by intentionally introducing nesting in a side branch + reverting — the spec MUST fail under the bug).

### Lane C — env-noise filter consolidation

Per `E-AUDIT-6 §10 top-3 + AUD-6.3`. ~80 LoC of duplicated env-noise filter across 8 specs (the 4xx/5xx filter from D.W5 Lane A page-load.spec.ts addition).

1. **Author `e2e/smoke/fixtures/env-noise.ts`** — a shared `setupEnvNoise(page)` helper that installs the console-error filter.
2. **Consume from the 8 specs** that currently inline the filter.
3. **Leave specs that DON'T need the filter alone** (e.g., the admin specs use `page.route` mocks so they don't hit the production API).

**Sub-gate C**:
- `e2e/smoke/fixtures/env-noise.ts` exists.
- `grep -rn 'Failed to load resource:' e2e/smoke/*.spec.ts e2e/smoke/views/*.spec.ts` returns ZERO (the inline filter strings consolidated).
- All affected specs still green.

## File bounds

| Lane | Files |
|---|---|
| A | `e2e/smoke/reactivity-instant.spec.ts` (flake fix), `e2e/smoke/flows/*.spec.ts` (8 new), `e2e/smoke/admin/flows/*.spec.ts` (6 new), `e2e/smoke/fixtures/user-auth.ts` (new if needed), `playwright.config.ts` (worker-policy change if Option 1), `docs/tranches/E/audit/E.W3-coverage.md` (new) |
| B | `playwright.config.ts` (smoke-safari project), `e2e/smoke/safari/sustained-30s.spec.ts` (new), `docs/tranches/E/audit/E.W3-smoke-safari.md` (new) |
| C | `e2e/smoke/fixtures/env-noise.ts` (new), 8 consumer specs (consolidation), `docs/tranches/E/audit/E.W3-env-noise.md` (new) |

## Gate

The conjunction of sub-gates A + B + C. Wave-level:
- `npx playwright test` (all 4 projects: smoke + smoke-admin + smoke-mobile + smoke-safari) — ALL GREEN.
- Total spec count rises from 21 → ≥ 36 (21 baseline + 14 flow + smoke-safari).
- `reactivity-instant.spec.ts` median ≤ 50ms in 5 consecutive runs.
- CI runtime aggregate ≤ 60s (verify; E.W4 handles CI integration of smoke-safari project).
- `vue-tsc` 126; `vitest` 1582+; `lint` exit 0.

## Verification artefacts

3 per-lane audit docs + per-spec captures for the new flows + the smoke-safari 30s sustained capture.

## Commit plan

- `test(e2e/w3): reactivity-instant flake fix + 14 interactive-flow specs (vote/login/save/edit/delete/fork/propose/flag + 6 admin)` — Lane A.
- `test(e2e/w3): smoke-safari WebKit project + 30s sustained spec (closes D.W6 named-destination follow-up)` — Lane B.
- `refactor(e2e/w3): consolidate env-noise console-error filter into shared fixture (~80 LoC dedup)` — Lane C.

## Dependencies

- Depends on: E.W2 close (the api/ pipeline is stable; interactive flows can rely on consistent envelope shapes).
- Blocks: E.W4 (CI matrix integration depends on the 4-project structure E.W3 lands).
