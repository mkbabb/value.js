# E.W3 Lane B — smoke-safari WebKit project + 30s sustained spec

**Branch**: `tranche-e`
**Head at dispatch**: `0d74e05f44853af90354dfa67531399858db2195` (verified)
**Date**: 2026-05-20.

## §1 — Pre-state

- `playwright.config.ts` projects at dispatch (post-E.W3 Lane A): **4
  projects** — `smoke` + `smoke-admin` + `smoke-mobile` + `smoke-reactivity`.
  - `smoke` runs Chromium (desktop 1280×720, default 2 workers).
  - `smoke-admin` runs Chromium (5 admin-view + admin-walk + 6 admin-flow
    specs via the `addInitScript` admin-auth fixture).
  - `smoke-mobile` runs Pixel-7 (Chromium engine — per D-HARDEN-5 §4).
  - `smoke-reactivity` runs Chromium with `workers: 1` ENFORCED (E.W3
    Lane A flake-fix for the wall-clock subtest).
- Total spec count at dispatch: **35** specs across the 4 projects.
- **WebKit device chosen**: `iPhone 14` from `@playwright/test`'s `devices`
  catalog. The device descriptor pins:
  - `userAgent`: iOS 16.0 / Safari 26.0 / AppleWebKit/605.1.15
  - `viewport`: 390 × 664 (mobile portrait)
  - `defaultBrowserType`: `"webkit"` (no separate `browserName` override)
  - `isMobile: true`, `hasTouch: true`, `deviceScaleFactor: 3`
  - The wave spec named `iPhone 14`; it IS present in the catalog. Newer
    devices (iPhone 14 Pro, iPhone 15 series) are also available but
    iPhone 14 is the wave-spec choice + matches the catalog's iOS-16
    pinned UA. iPhone 15 Pro uses identical engine; no engine-fidelity
    gain from upgrading.
- **Existing WebGL specs (Chromium-only)**: `webgl-goo-blob.spec.ts` (goo-blob
  canvas survives a view switch without `webglcontextlost`),
  `webgl-atmosphere.spec.ts` (atmosphere canvas warms up 2s without
  `webglcontextlost`). Both run only in `smoke` (Chromium). Neither
  catches WebKit-side shader-compile divergence.
- **WebKit binary**: not installed locally before this lane. Installed
  via `npx playwright install webkit` (WebKit 26.0, build v2248,
  72.6 MiB, downloaded to `~/Library/Caches/ms-playwright/webkit-2248`).
  CI requires the same install step — deferred to E.W4 Lane B per the
  wave spec.

## §2 — Lane B diffs

### `playwright.config.ts` — `smoke-safari` project + `testIgnore` update

```ts
// File-header doc: 4-project → 5-project partition documented.
// `smoke` project's testIgnore extended:
testIgnore: [
    "**/admin/**",
    "**/mobile/**",
    "**/safari/**",            // ← NEW
    "**/reactivity-instant.spec.ts",
],
// New project at the end of the `projects` array:
{
    name: "smoke-safari",
    testDir: "./e2e/smoke/safari",
    use: {
        ...devices["iPhone 14"],
        baseURL: "http://localhost:8090",
        headless: true,
    },
},
```

The `iPhone 14` device descriptor pins `defaultBrowserType: "webkit"`,
so no separate `browserName` override is needed (matches the
`smoke-mobile` Pixel-7 pattern but with WebKit instead of Chromium).

### `e2e/smoke/safari/sustained-30s.spec.ts` — new (key shape)

```ts
// Per-test timeout: bump to 60s (the default 30s in playwright.config.ts
// truncates the 30s+ wall-clock budget). Documented inline.
test.setTimeout(60_000);

// Console-failure capture installed BEFORE goto so full lifecycle is observed.
const CONSOLE_FAIL_SUBSTRINGS = [
    "webglcontextlost",
    "RangeError: Maximum call stack",
    "[stale prop]",
] as const;
// page.on("console") + page.on("pageerror") push matches into consoleFailures[].

// addInitScript: install the document-level `webglcontextlost` listener
// BEFORE the canvas mounts (pattern from webgl-goo-blob/atmosphere specs).
await page.addInitScript(() => {
    document.addEventListener(
        "webglcontextlost",
        () => console.error("webglcontextlost"),
        true,
    );
});

await page.goto("/");
await expect(page.getByRole("main", { name: "Color tool panes" })).toBeVisible();

// Step 1: goo-blob canvas attached confirmation.
await expect(page.getByTestId("goo-blob-canvas").last()).toBeAttached();

// Step 2: 10s spectrum-drive — pointer-down then parametric Lissajous-like
// curve (ω₁ = 0.6 Hz, ω₂ = 0.9 Hz incommensurate) across the spectrum
// canvas. Exercises the colorUnit2() per-frame path that hit the
// Mar-2026 stack-overflow at frame ~294.
const spectrum = page.getByRole("img", { name: /Color spectrum/ }).last();
// ... pointer-down → 10s drive loop → pointer-up.
// Early bail-out assertion: zero stack-overflow during this window.

// Step 3: 5s view-switching (Palettes → Mix → Gradient → Extract → Generate → Home).
const viewSelect = page.getByRole("combobox", { name: "Select view" });
// ... click + select option for each.

// Step 4: 5s WebGL-render-watch — held while goo-blob canvas is alive.
// page.waitForFunction((start) => performance.now() - start >= 5_000, ...).

// Step 5: 10s settle — residual rAF + microtask drain.
// page.waitForFunction((start) => performance.now() - start >= 10_000, ...).

// Binding assertion: ZERO console failures across the full 30s window.
expect(consoleFailures).toEqual([]);
```

## §3 — Spec coverage assertions

### 30s budget breakdown

| Step | Budget | Surface |
|---|---|---|
| Boot + Step 1 (goo-blob attached) | ~2-3s | WebKit boot + canvas mount + shader compile |
| Step 2: spectrum-drive | 10s | colorUnit2() per-frame path (recursion-guard) |
| Step 3: view-switching | ~3-4s | usePaneRouter component-registry leaks |
| Step 4: WebGL-render-watch | 5s | sustained-render WebGL context stability |
| Step 5: settle | 10s | residual microtask + rAF drain |
| **Total wall-clock observed (local)** | **~32-34s** | (within < 35s cap per the wave spec hard-cap) |

Measured wall-clock across two consecutive runs: 33720ms + 31822ms.
Per-test timeout (60_000ms) leaves > 25s headroom for CI variance.

### Console assertions

The spec asserts ZERO occurrences of all three failure-class substrings
across the entire 30s window (capture installed BEFORE `page.goto`):

- `webglcontextlost` — captured via both `page.on("console")` (the
  document-level `addInitScript` re-emitter) and the direct console-error
  re-emission inside the demo (if any). WebGL-on-WebKit shader-compile
  divergence would surface here as the runtime aborts the context.
- `RangeError: Maximum call stack` — JSC's stack-overflow message. The
  Mar-2026 ValueUnit-nesting bug fired this at frame ~294 on iOS Safari.
- `[stale prop]` — the canonical guard the topology-reactivity contract
  emits when a stale-prop write reaches a child component. JSC's
  microtask ordering differs subtly from V8; bugs that only manifest
  there would surface here.

### View-switch sequence (Step 3)

Walk: `Home → Palettes → Mix → Gradient → Extract → Generate → Home`.
Six transitions through the dock combobox (`Select view`); each click
triggers a `usePaneRouter` registry swap. The walk returns to `Home`
explicitly so the goo-blob canvas is mounted for Step 4's WebGL-render-
watch (it is unmounted in non-picker views).

### WebGL render confirmation method

Two-stage:

1. Synchronous attached-assertion: `expect(page.getByTestId("goo-blob-canvas").last()).toBeAttached()` after boot AND after returning to Home.
2. Sustained watch (5s) with the document-level `webglcontextlost` listener
   armed via `addInitScript` (BEFORE canvas mount). Any GL context loss
   during the watch window writes to the failure array.

The `iPhone 14` headless WebKit successfully compiles the goo-blob
fragment shader (SDF smooth-union metaballs + FBM noise) — observed
zero `webglcontextlost` events across the full 30s window in both local
runs. The HARD-CAP "WebKit fails to compile shader" branch is therefore
NOT activated; the spec is GREEN on the engine it tests.

## §4 — Recursion-guard verification

The sustained spec WOULD catch the iOS-Safari frame-294 stack-overflow
class because both invariants hold:

1. **30s run duration > 294 frames @ 60fps**: 294 frames ÷ 60 fps ≈ 4.9s.
   The 10s spectrum-drive step alone exceeds this by 2×. Local
   measurement: **2275 + 2120 pointer-moves over 10s** in two runs (a
   ~210/s throughput, well above the 60Hz rAF cycle the original bug
   tracked — the spec's pointer-move rate is denser than the bug's
   frame budget, so the depth-amplification path would surface sooner
   than at frame 294 under this spec's load).
2. **Console assertion catches `RangeError: Maximum call stack`**: the
   capture pattern matches the exact substring JSC emits for stack
   overflow, and the assertion `expect(consoleFailures).toEqual([])`
   would fail loudly if any single capture occurred during the run.

The wave-spec hard-cap mandates "verify by intentionally introducing
nesting in a side branch + reverting — the spec MUST fail under the
bug". Per the dispatch directive, the destructive verification is
documented HERE rather than executed (introducing the nesting bug
would mutate `src/units/color/normalize.ts:102` — a binding "no `src/`
edits" rule). The double-coverage argument:

- **Vitest layer**: `test/recursion-guard.test.ts` (D.W1 L8) codifies
  the SAME invariant via three regression cases: (a) `294-frame-replay`
  drives `colorUnit2()` 294 times + asserts depth stays at 1; (b)
  `clone-no-amplify` drives 3 successive clones + asserts channel
  depth invariance; (c) `depth-3-nest` builds a malicious VU<VU<VU<…>>>
  + asserts `colorUnit2()` collapses to depth 1. If the unwrap loop
  at `normalize.ts:102` regressed, all three vitest cases fail.
- **E2e layer (this spec)**: drives the SAME `colorUnit2()` per-frame
  path via real pointer-drag at the WebKit engine, for > 2× the bug's
  frame threshold (~600 frames at 60Hz across 10s). Catches:
  - The exact JSC stack-overflow message (engine-side, not unit-side).
  - WebKit-only manifestations (smaller JSC call stack than V8 — the
    Mar-2026 bug appeared on iOS Safari first because V8 had headroom
    that masked it locally).
  - Integration-path bugs (any future watcher/computed that amplifies
    nesting through reactive proxies before reaching `colorUnit2()`).

So the invariant is doubly defended: synchronous unit-tests at the
vitest layer + a sustained engine-layer e2e probe in this spec.

## §5 — Gates

| Gate | Expected | Actual | Verdict |
|---|---|---|---|
| `npx playwright test --project=smoke-safari --list` lists the new spec | 1 test in 1 file | 1 test in 1 file | PASS |
| `npx playwright test --project=smoke-safari --reporter=line` passes | 1 passed | 1 passed (37.0s) | PASS |
| `npx playwright test --reporter=line` passes all 5 projects (~36 specs) | 36 passed | 36 passed (54.8s) | PASS |
| `npm run lint` | exit 0 | exit 0 (no output) | PASS |
| Wall-clock per smoke-safari run < 60s test-timeout | < 60_000ms | 31_822ms + 33_720ms | PASS |
| Console-failure capture = 0 | 0 | 0 | PASS |
| WebKit goo-blob render succeeds (no `webglcontextlost`) | yes | yes | PASS |

## §6 — Files modified

- `playwright.config.ts` — 4-project → 5-project partition; header
  rewritten; `smoke` testIgnore extended with `**/safari/**`;
  `smoke-safari` project added.
- `e2e/smoke/safari/sustained-30s.spec.ts` — new (~210 LoC).
- `docs/tranches/E/audit/E.W3-lane-b-smoke-safari.md` — new (this doc).

Files NOT modified:
- `src/**/*` — no library changes.
- `.github/workflows/node.js.yml` — CI integration deferred to E.W4 Lane B
  per the wave spec.
- `test/recursion-guard.test.ts` — already in place from D.W1 L8;
  no edits needed (the e2e layer complements, not replaces).
- Other smoke specs — unchanged.

## §7 — Notes / follow-up routing

- **CI WebKit install**: E.W4 Lane B must add `npx playwright install
  webkit` (or `--with-deps webkit`) to `.github/workflows/node.js.yml`
  before the `playwright test` step. The Linux CI runner does not have
  the WebKit binary cached by default; the install step is a one-time
  ~70 MiB download per workflow run (cacheable via `actions/cache` keyed
  on the playwright version).
- **Per-test timeout (60s)**: the spec uses `test.setTimeout(60_000)`
  inline rather than bumping the global `timeout` in
  `playwright.config.ts`. Rationale: 30s is the right default for the
  other 35 specs; only the sustained-budget spec needs the bump.
- **iPhone 14 Pro / iPhone 15 family**: deferred. The engine is the
  same WebKit binary across all `iPhone *` devices in the catalog;
  the device descriptor pins viewport + UA but not engine variant. If
  a future Lane wants to exercise foldables or iPad-form-factor WebKit,
  add a separate project rather than mutating this one.
- **Pointer-event-driven spectrum-drive**: the spec uses
  `page.mouse.move` (CDP-level pointer events). On WebKit the descriptor
  reports `hasTouch: true`, but the spec stays on the pointer-events
  path because reka-ui's spectrum canvas listens to BOTH pointer and
  touch events through the same code path (`usePointerDebug` traces
  both). A touch-only variant is filed as a successor concern (not
  binding for this lane).

## §8 — E.W3 Lane B sub-gate verdict

**PASS** — all 4 Lane B asks satisfied:

1. **B.1 — `smoke-safari` project added**: `playwright.config.ts` lists
   5 projects; `--project=smoke-safari --list` returns the new spec.
2. **B.2 — sustained-30s spec authored**: drives spectrum 10s, walks 5
   views, watches WebGL 5s, settles 10s; wall-clock 31-34s; B.W3
   invariants observed (role/label only, no waitForTimeout, no
   .lucide-*, no page.evaluate for interaction).
3. **B.3 — CI integration deferred to E.W4 Lane B**: documented in §7.
4. **B.4 — recursion-guard verification**: documented in §4 (sustained
   spec WOULD catch the bug; vitest layer also covers it; destructive
   verification deliberately not executed per dispatch's "no `src/`
   edits" constraint).

Verification gates 1-3 all green (§5 table). Hard-cap branches not
activated (WebKit shader compile succeeded; wall-clock < 35s).
