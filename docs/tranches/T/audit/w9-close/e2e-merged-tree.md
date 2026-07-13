# T close ceremony — the MERGED-TREE E2E re-run (the §8 owner-gated final confirmation)

**Date**: 2026-07-13 (early AM). **Tree**: merged `master` — merge commit `6e14e90`
(`T close: merge tranche-t → master --no-ff`), amended tip `e97a9d1` (the in-place FINAL-doc
amend), annotated tag `tranche-t-close` → `6e14e90`. Checked out `master` (→ `e97a9d1`) into an
isolated worktree `.claude/worktrees/ceremony-e2e`. **Ports**: lane-unique `VJS_E2E_PORT=8490` /
`VJS_E2E_PERF_PORT=8491` / `PERF_PORT=8491` (the owner's `:9000` untouched; the `tranche-u` main
tree untouched). **Nothing committed.**

This discharges the §8 close-ceremony leg: re-run the full 6-project Playwright suite against the
MERGED sha, as the final confirmation on top of the two prior quiet-machine wave closes
(W6 146p/2s `5b64236`, W8 160p/2s `6d95871`) and the W9 deferred cert (159p/2s/1-flake, on the
tranche-t tip `e2e-certification.md`).

---

## SUBSTRATE CAVEAT (load-bearing — read first)

The value.js `file:` sibling `@mkbabb/glass-ui` symlink resolves, through
`.claude/worktrees/glass-ui`, to the **live** glass-ui main tree at `/Users/mkbabb/Programming/glass-ui`.
That tree has **drifted forward** since the T certification: it is on branch `tranche/BI`, which
executed the **`goo-blob` → `blob` rename** — the subpath export `./goo-blob` was removed
(`13735a99` "goo-blob->blob rename EXECUTED", export re-pin `2e559f7a` "./goo-blob OUT"), the
component export `GooBlob` → `Blob`, dir `custom/goo-blob` → `custom/blob`. The merged value.js tree
still imports `@mkbabb/glass-ui/goo-blob` (`GooBlob`, `BLOB_CONFIG_KEY`, `BLOB_CONFIG_DEFAULTS`,
`BlobConfig` — `useAtmosphere.ts`, `HeroBlob.vue`, `BlobPane.vue`). Against the drifted live
glass-ui the demo build **dies** at resolve (`"./goo-blob" is not exported`), so a naive re-run is
impossible.

**This is a pending cross-repo adopt-event, NOT a value.js merge defect.** value.js T's merged tree
correctly imports the API that existed at T-certification. The glass-ui BI rename is newer than the
whole T tranche (and newer than the U-formation communiqué). Adopting `goo-blob`→`blob` is future
value.js/U work (the §3.4 named-export-drift class the pin policy anticipates).

**Reconstruction of the certified substrate.** The value.js T BH relay was discharged against
glass-ui **`17e0f522`** (per project memory + the U-formation communiqué commit itself), which
exports `./goo-blob` at 5.0.0 — the byte-true certified substrate, an ancestor of the rename by 21
commits. Reconstructed cleanly, without touching the active BI tree:

1. `git worktree add .claude/worktrees/ceremony-glass-ui 17e0f522` (isolated glass-ui worktree).
2. `npm ci && npm run build` there → `dist/goo-blob.js` (103.97 kB) emitted; `./goo-blob` exports
   `GooBlob`/`BLOB_CONFIG_KEY`/`BLOB_CONFIG_DEFAULTS` verified resolvable under ESM.
3. Re-pointed **only** the ceremony worktree's own `node_modules/@mkbabb/glass-ui` symlink at
   `ceremony-glass-ui` (the shared `.claude/worktrees/glass-ui` symlink other lanes use was left
   alone). `npm run build` (mechanism-C self-alias) + `npm run gh-pages` then both succeed.

Every number below was measured against **value.js master `e97a9d1` × glass-ui `17e0f522`** (the
T-certified substrate). The live-glass-ui drift is flagged for the U adopt; it did not enter the
measured product.

---

## The full-suite run

`VJS_E2E_PORT=8490 VJS_E2E_PERF_PORT=8491 PERF_PORT=8491 npx playwright test` (all 6 projects,
162 tests, 1 worker) → **158 passed / 2 skipped / 2 failed** (21.5m, exit 1).

### Per-project breakdown (expected `test.fail()` legs folded into passed)

| project           | passed | failed (unexpected) | skipped | notes |
|-------------------|:------:|:-------------------:|:-------:|-------|
| smoke             | 134    | 1                   | 2       | incl. 2 born-RED legs (O-16-R1, O-26); 1 unexpected = O-17 desktop; 2 skips = O-3 headed-GPU dark+light |
| smoke-admin       | 11     | 0                   | 0       | green |
| smoke-mobile      | 3      | 0                   | 0       | green |
| smoke-reactivity  | 1      | 1                   | 0       | spectrum-drag green in-suite; slider-keyboard failed (wall-clock, see below) |
| smoke-perf        | 5      | 0                   | 0       | incl. 1 born-RED leg (O-5); frame-budget specs green |
| smoke-safari      | 4      | 0                   | 0       | WebKit sustained-30s green |
| **total**         | **158**| **2**               | **2**   | |

### The 3 standing born-RED `test.fail()` legs — reproduce as EXPECTED

The Playwright list reporter draws a `test.fail()`-expected-failure with the same `✘` glyph as an
unexpected failure; the distinction lives only in the summary (they count as **passed**). All three
reproduced exactly:

- **O-16-R1** `o16-computed-cascade.spec.ts:29` (PKT-1 producer dist clobber) — expected red, in the 158.
- **O-26** `o26-aurora-perceptibility.spec.ts:51` (aurora 10s migration, T-25/T-26 gate) — expected red, in the 158.
- **O-5** `o5-boot-pacing.spec.ts:45` (RP-2 boot-jitter, → W7) — expected red, in the 158.

These are the named-expected-red set the close predicted; each rides to W7/U by name.

### The 2 skips — baseline

`o3-headed-gpu-probe.spec.ts:29` (dark + light) — the headed real-GPU cold-load probes, skipped under
the headless-swiftshader channel. Matches the W6/W8/W9 "2 skipped" baseline.

### O-7 census — GREEN 4/4 in-suite

`o7-card-census.spec.ts` (`:190` light + dark, `:399` F-7, `:440` F-8) all passed in the full-suite
ordering this run. The W9-cert O-7 serialization flake **did not reproduce** — instead a different
spec (O-17 desktop) reddened. This is precisely the config's documented "a DIFFERENT set of specs
reddens each run" behavior (`playwright.config.ts:88-104`), the tell of the workers:1 serialization
class rather than a product defect.

---

## The 2 unexpected failures — classified

### 1 · O-17 desktop letterbox — PROVEN serialization-timing flake (not a regression)

`o17-easing-composition.spec.ts:102 "…— desktop"` failed in-suite: the easing-bench SVG letterbox
predicate `expect(ratio).toBeLessThanOrEqual(1)` received `10.609` after the 5000ms predicate
timeout (the SVG had not laid out/settled when measured). Its sibling parametrization
`"…— 390"` (same body, mobile viewport) passed clean in the same run.

**Isolation re-run** (same lane ports):
`npx playwright test o17-easing-composition --project=smoke` → **3 passed** (26.8s) — `desktop` ✓ (15.0s),
`390` ✓ (3.9s), `composition` ✓ (4.7s). The failure does **not** reproduce isolated.

Classification: the workers:1 single-vite serialization-timing flake the config + W9 cert describe —
a preceding spec left residual mount/scroll/transform-burst state, so a first-settle assertion
timed out non-deterministically. A genuine letterbox defect would fail BOTH viewports and fail
identically isolated. **Not a product red.**

### 2 · Reactivity wall-clock gates — host-CPU-contention artifact (instrument-precondition violated)

`reactivity-instant.spec.ts` measures ABSOLUTE wall-clock medians. In-suite, `slider-keyboard:137`
returned median **207.5ms** vs the `≤100ms` gate (spectrum-drag passed). The `smoke-reactivity`
project is `workers:1` to isolate the measurement from **sibling-spec** CPU — but `workers:1` cannot
isolate it from **other host processes**.

**Isolation re-runs** (`--project=smoke-reactivity`, run alone) did NOT clear it — and, tellingly,
the FAILING SUBTEST SHIFTED:
- iso #1: `spectrum-drag:41` median **161.4ms** vs `≤50ms`; `slider-keyboard` did-not-run (serial-mode first-fail skip).
- iso #A: `spectrum-drag:41` median **123.6ms** vs `≤50ms`; `slider-keyboard` did-not-run.

The median TRACKS host load (161 → 123ms as the 1-min load eased 12 → 9.8). Measured host state
during the run window:

- **`load averages: 12.29 / 27.79 / 32.92` on 18 cores** — 1.5–1.8× oversubscribed across the run.
- Top CPU: `Backblaze bztransmit` **97.9%** (a full backup saturating a core), a `node` at 98%,
  `dasd` 90.6%, Chrome helpers 40%+.
- **A concurrent glass-ui BI-lane Playwright fleet** was live:
  `npm exec playwright test carousel-rebuild --config tests-visual/playwright.config.ts` — plus the
  owner's `:9000`, `vitest-vscode`, `chrome-devtools-mcp`.

This is the direct violation of the wall-clock gates' documented **quiet-host precondition**: the W9
cert ran on "load ~11 on 18 cores, no concurrent fleet"; the spectrum-drag quiet-host floor is ~7ms
(config comment). 123–207ms is ~100–200ms of pure contention latency, not a product change. The
byte-identical product tree was GREEN on these gates at W6/W8 (quiet) and W9 (quiet). The
subtest-shift (slider-keyboard in-suite → spectrum-drag isolated) is the signature of contention,
not a deterministic defect (which would pin to one subtest).

**Honest status of this leg**: it FAILED on every attempt on THIS host (3/3), and I could NOT obtain
a clean green — the contention sources (Backblaze backup, the glass-ui `carousel-rebuild` fleet, the
owner's `:9000`) are outside this lane's control and must not be touched. Classification:
**host-CPU-contention instrument-precondition violation, not a product regression.** It requires a
**quiet-host re-run to seal green** — exactly the reason W9 deferred these timing legs to a quiet
machine. Recorded as an honest open residual, NOT laundered as green.

---

## Verdict

**GREEN-modulo — no deterministic product regression on the merged tree**, against the T-certified
substrate (value.js `e97a9d1` × reconstructed glass-ui `17e0f522`). Modulo:

- **(a)** the O-17-desktop serialization-timing flake — PROVEN (isolation 3/3 green);
- **(b)** the two wall-clock reactivity gates (`spectrum-drag ≤50ms`, `slider-keyboard ≤100ms`)
  failing under MEASURED non-quiet-host contention (load ~28–33/18, Backblaze backup + a concurrent
  glass-ui Playwright fleet) — an instrument-precondition violation, byte-identical-green on the
  quiet W8/W9 machines, **the one honest open residual: needs a quiet-host reconfirmation**;
- **(c)** the 3 standing born-RED `test.fail()` legs (O-16-R1 / O-26 / O-5) — expected, in the 158.

The 158/2/2 matches the quiet-machine baselines to the leg (W8 160/2, W9 159/2/1-flake) once the
timing-instrument flakes are accounted for; the product surface is byte-identical to the W8 close
`6d95871`. **No product red.** Two follow-through items handed up: the quiet-host reactivity re-run
(residual b), and the glass-ui `goo-blob`→`blob` ADOPT for value.js/U (the substrate caveat).

Logs (untracked, scratchpad): `e2e-full-run.log` (full run) · O-17 + reactivity isolation captures
in this lane's transcript.
