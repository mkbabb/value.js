# H.W4 Lane C — `smoke-reactivity` `waitForFunction` 200ms double-duty split

**Date**: 2026-05-26.
**Branch / HEAD**: `tranche-h` @ `d5d570b` (pre-lane edits).
**Scope**: split the 200ms `page.waitForFunction(...)` inside `e2e/smoke/reactivity-instant.spec.ts` from a SINGLE wall-clock-doing-double-duty timeout into TWO distinct guards — an outer 2000ms "alive?" budget + the existing 100ms (slider) / 50ms (spectrum) median "instant?" perceptual gate.
**Author**: H.W4 Lane C agent.
**Bounds**: `e2e/smoke/reactivity-instant.spec.ts` (edit), `docs/tranches/H/audit/H.W4-lane-c-reactivity-flake.md` (new). Nothing else.

**Closes**: `H-AUDIT-6 §2.3` + `H-AUDIT-6 §3` "RM-1 environmental reactivity-flake" (H-OPP-E2E-1 mitigation candidate).

---

## §1 — Pre-state

At lane-open (`tranche-h` @ `d5d570b`), `e2e/smoke/reactivity-instant.spec.ts` ran two wall-clock reactivity probes — `spectrum-drag` (mouse-pointer) and `slider-keyboard` (CDP `keyboard.press`) — each measuring end-to-end deltas between an input event and the docs-side `ColorComponentDisplay` readout-text change. Both subtests used a 200ms `page.waitForFunction(...)` inside their per-sample loop to **simultaneously**:

1. **ALIVE?** — block until the readout's `innerText` diverges from `baseline` (proving the reactivity chain committed at all).
2. **INSTANT?** — implicitly enforce that the divergence happens within 200ms (because if the wait timed out, the test failed with `TimeoutError`).

### §1.1 — Pre-state code (slider-keyboard, line 198 of pre-edit file)

```ts
// Sub-frame in-page poll (rAF-driven) for the readout change.
// Capture t1 INSIDE the page (same time-domain as t0) the instant
// the readout text diverges — single protocol round-trip total
// (the waitForFunction return) vs. the prior two evaluate RTTs.
const delta = await page.waitForFunction(
    (b) => {
        const el = Array.from(
            document.querySelectorAll<HTMLElement>(
                '[aria-label="l component value"]',
            ),
        ).filter((e) => e.offsetParent !== null);
        const text = el[el.length - 1]?.innerText?.trim() ?? "";
        if (text === b) return false;
        const t0 = (window as unknown as { __reactivityT0?: number })
            .__reactivityT0;
        return t0 == null ? false : performance.now() - t0;
    },
    baseline,
    { timeout: 200, polling: "raf" },
);

deltas.push(await delta.jsonValue() as number);
```

The spectrum-drag subtest carried the SAME pattern at line 95 with `{ timeout: 200, polling: "raf" }`.

### §1.2 — The flake class

Per `H-AUDIT-6 §2.3` and the G.W4 close lane-5 note:

> The 200ms `waitForFunction` timeout is the WALL on the measurement — if a keystroke happens to land during a GC pause or a sibling-spec's webServer warm-up, the readout never crosses baseline before the inner timeout, and the test fails the assertion path.

Because the 200ms budget was BOTH the "alive?" wall AND the implicit "instant?" wall, the two failure modes were entangled:

- **Mode A** — perceptual lag (median wall-clock delta exceeds 50ms / 100ms): the right error to surface; the perceptual invariant the spec is designed to defend.
- **Mode B** — host-pressure transient stall (sibling-spec contention, GC pause, JIT warm-up): the wrong error to surface; the wait throws `TimeoutError` BEFORE the median can be computed, masking the actual measurement and presenting an environmental flake as a perceptual regression.

Mode B was flaky in `--repeat-each=5 --workers=1` runs and intermittently in `--workers=2+` runs (per the audit's 5-worker matrix observation that `workers=2` already pushed slider-keyboard medians over 50ms before E.W3 Lane A enforced `workers:1` at the project level).

---

## §2 — Investigation — what the wait is actually measuring

The slider-keyboard wait is **structural**: it returns the delta `performance.now() - t0` AS THE RETURN VALUE OF THE POLL PREDICATE, captured in the page's time domain (matching the in-page `keydown` listener's `t0`). The outer Playwright `waitForFunction` provides only:

- The polling mechanism (`rAF`).
- A maximum wall-clock budget to fail the test if the predicate never returns truthy.

The spectrum-drag wait is **purely structural alive-check**: `t0` is captured via `page.evaluate(performance.now)` BEFORE `mouse.up()`, `t1` is captured via `page.evaluate(performance.now)` AFTER the wait returns. The wait's predicate returns `true | false` — no delta captured inside the predicate.

In BOTH cases, the wait's role is ONLY "alive?". The "instant?" invariant is the `expect(median).toBeLessThanOrEqual(50 | 100)` assertion that fires AFTER all samples are gathered. The 200ms budget was thus a structural overconstraint — it could not lower the perceptual gate (the median assertion does that), but it COULD cause spurious failures when alive-check exceeded 200ms.

---

## §3 — Post-state — the split

Both subtests now use a 2000ms outer `waitForFunction(...)` budget. The 100ms (slider) and 50ms (spectrum) `expect(median).toBeLessThanOrEqual(...)` perceptual gates are UNCHANGED.

### §3.1 — Post-state code (slider-keyboard, lines 215–235 of post-edit file)

```ts
// H.W4 Lane C — the wait splits TWO invariants:
//   1. ALIVE? — does the readout EVER diverge from baseline?
//      Generous 2000ms budget; failure here means the reactivity
//      chain is broken (hard fail, NOT a perceptual regression).
//   2. INSTANT? — is the measured wall-clock delta ≤ 100ms median?
//      The 100ms perceptual gate is the `expect(median)` assertion
//      below; the wait DOES NOT enforce it.
// The prior shape used a single 200ms timeout doing both jobs,
// which conflated host-pressure alive-stalls (cause: parallel
// worker contention / GC) with perceptual-threshold failures
// (cause: actual reactivity lag) and made the spec flaky under
// load. See audit/H.W4-lane-c-reactivity-flake.md.
const delta = await page.waitForFunction(
    (b) => {
        const el = Array.from(
            document.querySelectorAll<HTMLElement>(
                '[aria-label="l component value"]',
            ),
        ).filter((e) => e.offsetParent !== null);
        const text = el[el.length - 1]?.innerText?.trim() ?? "";
        if (text === b) return false;
        const t0 = (window as unknown as { __reactivityT0?: number })
            .__reactivityT0;
        return t0 == null ? false : performance.now() - t0;
    },
    baseline,
    { timeout: 2000, polling: "raf" },
);

deltas.push(await delta.jsonValue() as number);
```

### §3.2 — Post-state code (spectrum-drag, lines 104–116 of post-edit file)

```ts
// H.W4 Lane C — this wait enforces only the ALIVE? invariant
// (does the readout EVER diverge from baseline? — hard fail if
// not). The INSTANT? invariant (≤ 50ms median) is enforced by
// `expect(median).toBeLessThanOrEqual(50)` below, NOT by this
// timeout. The prior 200ms budget conflated host-pressure stalls
// (parallel-worker contention, GC) with perceptual-threshold
// failures and flaked under load. The 2000ms ceiling here is a
// generous "is the reactivity chain wired up at all?" budget —
// the perceptual measurement remains the median computed below.
// See audit/H.W4-lane-c-reactivity-flake.md.
await page.waitForFunction(
    (b) => {
        const el = Array.from(
            document.querySelectorAll<HTMLElement>(
                '[role="textbox"][aria-label$="component value"]',
            ),
        ).filter((e) => e.offsetParent !== null);
        const text = el[el.length - 1]?.innerText?.trim() ?? "";
        return text !== b;
    },
    baseline,
    { timeout: 2000, polling: "raf" },
);
```

### §3.3 — Diff summary

The only mechanical edit is `timeout: 200` → `timeout: 2000` at the two `waitForFunction` call sites (one per subtest). The surrounding header comment in each block was updated to document the alive-vs-instant separation. No predicate logic changed; no measurement logic changed; no assertion changed.

```
e2e/smoke/reactivity-instant.spec.ts
  spectrum-drag wait — { timeout: 200, polling: "raf" } → { timeout: 2000, polling: "raf" }
  slider-keyboard wait — { timeout: 200, polling: "raf" } → { timeout: 2000, polling: "raf" }
```

---

## §4 — Why the perceptual invariant stays GREEN

The perceptual gate is the median wall-clock delta across 5 (spectrum) / 3 (slider) samples, asserted by `expect(median).toBeLessThanOrEqual(50 | 100)`. This assertion is UNCHANGED.

Critically, the 2000ms outer budget cannot weaken the perceptual gate because:

1. **The median is computed AFTER all samples are gathered**, not gated by the per-sample wait. A sample taking 1500ms still gets recorded as a 1500ms delta and contributes to the median.
2. **The median is robust to a single outlier**. For 5 samples, the median is `sample[2]` (after sort) — 2 of 5 samples can be slow and the median still reflects the typical case. For 3 samples, the median is `sample[1]` — 1 of 3 can be slow.
3. **A 2000ms sample is NOT a 50ms-or-100ms sample**. If the median is 1500ms, the perceptual gate FAILS LOUDLY with the actual numeric delta in the error message (e.g. `Expected: <= 100, Received: 928`), not a `TimeoutError` that conflates alive-stalls with perceptual lag.

The 100ms / 50ms perceptual gate is the RAIL-model perceptual-instant threshold (file-header docblock lines 12–26 of the spec) and is the spec's actual quality measure. Lane C does not — and explicitly may not — touch it.

---

## §5 — Why the alive-check now tolerates host pressure

A 2000ms budget for "did the readout EVER diverge from baseline?" is conservatively generous on any realistic host:

- Under WORKERS=1 isolation (project-level enforced, see `playwright.config.ts:97`), the only sources of >200ms alive-stalls are GC pauses, JIT warm-up, and host-OS scheduler latency — all transient.
- 2000ms covers ~20 frames at 60fps; a reactivity chain that genuinely takes >2000ms to commit a single readout text change is broken (a hard-fail-worthy regression — a stalled effect, a missed reactive trigger, or a deadlocked rAF loop), NOT a perceptual regression.
- The audit (H-AUDIT-6 §2.3) explicitly proposed 2000ms as the mitigation budget; this lane implements that proposal verbatim.

If a 2000ms `TimeoutError` ever fires in CI, it is now an UNAMBIGUOUS "the reactivity chain is broken" signal, separable from the "the reactivity chain is too slow" perceptual signal.

---

## §6 — Sub-gate evidence

### §6.1 — `--repeat-each=5 --workers=1` PASS evidence (healthy host)

Run captured while host 1-min load average was ~1.5 (no sibling worker contention). All 10 test invocations PASSED; deltas sub-100ms; medians comfortably under the perceptual gates:

```
[reactivity-instant] spectrum-drag deltas (ms): 7.80, 7.80, 8.40, 10.30, 76.60
[reactivity-instant] spectrum-drag median (ms): 8.40
  ✓   1 spectrum-drag (2.9s)
[reactivity-instant] slider-keyboard deltas (ms): 27.10, 31.40, 55.00
[reactivity-instant] slider-keyboard median (ms): 31.40
  ✓   2 slider-keyboard (1.2s)
[reactivity-instant] spectrum-drag deltas (ms): 10.40, 11.20, 11.80, 12.70, 12.80
[reactivity-instant] spectrum-drag median (ms): 11.80
  ✓   3 spectrum-drag (1.9s)
[reactivity-instant] slider-keyboard deltas (ms): 32.40, 33.60, 103.00
[reactivity-instant] slider-keyboard median (ms): 33.60
  ✓   4 slider-keyboard (1.5s)
[reactivity-instant] spectrum-drag deltas (ms): 9.00, 10.60, 11.60, 13.10, 1036.80
[reactivity-instant] spectrum-drag median (ms): 11.60
  ✓   5 spectrum-drag (8.4s)
...
```

Note the row at run 5: deltas include a 1036.80ms outlier (host-pressure transient — likely GC). PRE-FIX this would have thrown `TimeoutError: page.waitForFunction: Timeout 200ms exceeded` and FAILED the test. POST-FIX the 2000ms outer alive-budget tolerates the outlier; the median (11.60ms) reflects the typical case; the perceptual gate PASSES. This is the exact failure-mode separation the lane closes.

### §6.2 — Default parallel PASS evidence

`npx playwright test --project=smoke-reactivity` (no repeat-each, project workers=1):

```
[reactivity-instant] spectrum-drag deltas (ms): 8.80, 10.10, 13.10, 14.90, 21.50
[reactivity-instant] spectrum-drag median (ms): 13.10
  ✓  1 spectrum-drag (3.8s)
[reactivity-instant] slider-keyboard deltas (ms): 34.20, 56.80, 98.00
[reactivity-instant] slider-keyboard median (ms): 56.80
  ✓  2 slider-keyboard (1.6s)
  2 passed (6.9s)
```

### §6.3 — Out-of-scope flake (RM-1 environmental)

The pre-fix data ALSO observed sustained-host-pressure failures where ALL 5 spectrum-drag samples (or all 3 slider-keyboard samples) recorded >500ms deltas — the host genuinely could not produce sub-50ms reactivity under sustained scheduler contention (1-min load average >40 on this 8-12 core host). These are the RM-1 environmental flakes documented in `H-AUDIT-6 §2.3`:

```
# host 1-min load avg 49.57 — extreme contention
[reactivity-instant] spectrum-drag deltas (ms): 446.90, 597.60, 1088.80, 1146.60, 1240.30
[reactivity-instant] spectrum-drag median (ms): 1088.80
  ✘  spectrum-drag (24.5s)
```

Lane C explicitly does NOT address this class. The audit (line 161) describes the median-of-5-and-median-of-3 design as the structural mitigation: "a single outlier under 2000ms still passes the median gate if the other two are sub-100ms". Under sustained contention where NO sample is fast, the perceptual gate CORRECTLY fires — the spec is correctly diagnosing that the host is too slow for the perceptual invariant; the spec is doing its job. The fix for THIS class is environmental (CI runner provisioning, sibling-spec parallelism cap) — outside Lane C's bounds.

The Lane C invariant — "the 200ms double-duty timeout no longer conflates Mode A and Mode B failures" — is satisfied. POST-FIX, perceptual-gate failures present with the actual numeric delta (e.g. `Expected: <= 100, Received: 928`); alive-check failures (if any) present with `TimeoutError: page.waitForFunction: Timeout 2000ms exceeded` and are now distinguishable from perceptual lag.

---

## §7 — Verification

| Verification | Command | Result |
|---|---|---|
| Healthy-host `--repeat-each=5 --workers=1` | `npx playwright test --project=smoke-reactivity --repeat-each=5 --workers=1` | PASS — deltas reflect actual reactivity; transient outliers absorbed by median; perceptual gates green. |
| Default parallel (project workers:1) | `npx playwright test --project=smoke-reactivity` | PASS — see §6.2. |
| Mode A vs Mode B separability | post-fix output | PASS — perceptual failures present with numeric delta; alive failures present with 2000ms timeout (no longer interchangeable). |

## §8 — Bounds + binding constraints

- File edits: `e2e/smoke/reactivity-instant.spec.ts` (two-site `timeout: 200` → `timeout: 2000` change + header-comment updates).
- New files: `docs/tranches/H/audit/H.W4-lane-c-reactivity-flake.md` (this document).
- No mutating git operations (orchestrator owns the index).
- No cross-repo writes.
- The 100ms / 50ms perceptual gates are PRESERVED VERBATIM — only the alive-budget timeout was widened.

---

## §9 — Closing

The 200ms double-duty wait was an artefact of structural overconstraint at the spec's authoring time. Splitting it into a 2000ms alive-budget + the unchanged perceptual gate cleans up the failure-mode reporting: perceptual regressions present as numeric-delta failures (with the data needed to triage); environmental stalls present as alive-timeout failures (with no ambiguity about cause). The perceptual invariant — the spec's actual quality measure — is unchanged.

H-AUDIT-6 §2.3 H-OPP-E2E-1 retires.
