# KF.W13X — execution record (keyframes.js, Track B)

## KF.W13X.g0 (repin 10.1.0, landed ahead of the wave)

Owner ruling (verbatim): "All should be on 10.1." Unit = the pin only (COHESION §0de).

- **Commit (keyframes.js master):** `9fa56c26` — `"@mkbabb/glass-ui": "10.0.1"` → `"10.1.0"` exact, lockfile resolved to `glass-ui-10.1.0.tgz`. Pushed `6e8fc989..9fa56c26`, no force. Pathspec was package.json + package-lock.json only; Track B's dirty demo files were left untouched.
- **Producer delta:** glass-ui CHANGELOG 10.1.0 (read from the glass-ui repo at tag `v10.1.0`, because the tarball ships only `dist` + `MIGRATION.md`). It adds ConfiguratorLayer `#actions` + `actionsWhen` (O-68) and Configurator `layout="detached"` + `--configurator-detached-gap` (O-75). No break. MIGRATION.md is unchanged.
- **Not adopted here:** `#actions` and `detached` belong to KF.W13X's own units (KF-W13.md addendum (c)). keyframes' demo mounts no Configurator or ConfiguratorLayer today.
- **Gates (with Track B's in-flight demo edits present):**
  - `npm run check`: GREEN (vue-tsc app + test, proof:structure 0 violations).
  - `vitest run`, run twice: both GREEN, 197 files passed / 5 skipped, 1848 tests passed, 2 expected-fail, 14 skipped, 0 failed.
  - `npm run build` (lib): GREEN. `npm run gh-pages`: GREEN.
  - `npm run lint`: 4 depcruise no-cycle errors, all inside `demo/scenes/cube/orbital-drag/`. They are unrelated to the pin (import graph only).
- **Served look (headed Chromium, reducedMotion=reduce, DPR 1):** / · /cube · /easing · /spring at 1440 light, 1440 dark and 390 light. Before = the shared :5173 server, whose prebundle predated the install, so it served 10.0.1. After = an isolated :5187 server with its own force-optimized cache, verified to serve 10.1.0 (`actionsWhen` present in its prebundle).
  - Result: **12/12 frames pixel-identical** at a threshold of >24 levels.
  - The one exception is a 157×148 box on the 3D cube's specular sheen at 390. A 10.0.1-vs-10.0.1 rerun reproduces the same box on home and spring 390, so it is run-to-run noise, not the pin.
  - **Regressions: 0.**
  - Frames: `docs/tranches/X/keyframes/evidence/W13X/g0/{before,after}/`.
- **Glass migration traps:**
  1. `@layer components`: the move shipped in 10.0.0, which keyframes already consumed, so 10.1.0 introduces no new layered rules that keyframes renders. The identical frames confirm this.
  3. `:global(.dark)` in scoped CSS: 0 sites.
  4. `light-dark()` inset shadow: 0 sites (one prose mention in demo/DESIGN.md).
  5. `npm ls @mkbabb/value.js`: a single `4.0.0`, deduped under glass-ui.
