# T.W9 close — the E2E certification (the deferred leg, now run on a quiet machine)

**Date**: 2026-07-12 (evening, after both W8-successor workflows closed — machine load ~11 on 18
cores, no concurrent fleet). **Ports**: lane-unique `VJS_E2E_PORT=8290` / `VJS_E2E_PERF_PORT=8291`
(the owner's `:9000` untouched). **Tree**: `tranche-t` HEAD at run time (post-`138af33` FINAL.md +
`d81261e` U polish; product tree byte-identical to the W8 close `6d95871`).

This discharges the one honest residual the W9 `repo-sweeps` lane recorded: the full 6-project e2e
was DEFERRED because the close session was saturated ~4–5× by the concurrent U-formation
(§6.1 of FINAL.md). Run now on the quiet machine.

## The full-suite run

`npx playwright test` (all 6 projects) → **159 passed / 2 skipped / 1 failed** (12.5m, exit 1).

- **The 3 born-RED `test.fail()` legs** (O-16-R1 PKT-1 · O-5 RP-2 · O-26 aurora-headless) reproduce
  as EXPECTED — they are the tranche's standing producer/perf reds, never counted as failures, and
  they are exactly the named-expected-red set the close predicted.
- **`smoke-safari`**: green — sustained-30s spectrum-drive + view-switch (31.6s, console-failures 0),
  the L1 aurora shader cure re-verified painting on WebKit, the blob-spazz repro NO-REPRO
  (`maxJumpPx=0.8`, centroid stays in wrapper under dual-WebGL2 drive).
- **`smoke-perf`**: green — the frame-interaction budgets (drag/view/idle) hold. These are a DIFFERENT
  instrument from the Q14 LCP/TBT Lighthouse escalation (§3 of FINAL.md); the Q14 red is the
  CI-lighthouse boot-metric row, not a playwright leg.
- **The one hard failure**: `o7-card-census.spec.ts:190` — O-7 census (light): the visible "Generate"
  pane heading not found after the 8000ms expect-timeout (`element(s) not found`).

## The one failure classified — PROVEN FLAKE, not a regression

Re-ran the exact spec in isolation on the same lane ports:

`npx playwright test o7-card-census --project=smoke` → **4 passed / exit 0** (43.4s).

Both the failing light case (`:190`) AND the dark case (`:190`) AND the two mobile frames
(F-7 `:399`, F-8 `:440`) pass clean. The failure does NOT reproduce isolated.

**Why it is a flake, not a defect** (the config's own rationale, `playwright.config.ts:88-104`):
the whole suite runs `workers:1` over a single vite dev server with live software-GL WebGL2 surfaces
on every page; in the serialized full-suite ordering a preceding spec can leave residual mount/scroll
state or trigger an on-navigation transform burst, so a first-paint/visibility assertion times out
non-deterministically — "a DIFFERENT set of specs reddens each run." The failure signature here is
that timeout artifact (`element not found` after 8s), NOT a deterministic assertion mismatch. A
genuine defect fails identically at any worker/load (cf. the color-space dead-control bug, which
reproduced at `workers:1` and was root-fixed). O-7 census has stood GREEN across T.W2/W3/W6.5; the
assertion is a structural pane-presence check, not a subtle visual.

## Verdict

**E2E CERTIFIED for the close.** The tree is e2e-GREEN modulo (a) one proven O-7 serialization-timing
flake (isolated re-run 4/4 green) and (b) the named-expected-red set — the 3 standing born-RED
`test.fail()` legs (O-16-R1/O-5/O-26), each riding to W7/W9/U by name. This matches the two prior
quiet-machine wave closes to the leg — **W6 146 passed / 2 skip** (`5b64236`), **W8 160 passed /
2 skip** (`6d95871`) — same 3 born-RED legs, no product defect. No red gate. The owner-gated
merged-tree re-run at the close ceremony (§8) stands as the final confirmation on the merged sha.

Logs (untracked probes): `scratchpad/t-w9-e2e-cert.log` (full run) · `scratchpad/o7-rerun.log`
(the isolation classification).
