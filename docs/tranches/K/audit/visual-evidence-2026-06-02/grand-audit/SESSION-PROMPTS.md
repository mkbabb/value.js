# Execution — per-tranche recap + session prompts (2026-06-03)

For the 6 open Claude Code sessions: **value.js · glass-ui · slides · fourier · keyframes.js · speedtest**. Each executes its tranche **in totality** from its committed docs (which carry all detail + DEC-1..9). Decisions baked: DEC-1 configurator RIGHT+fix-void · DEC-2 publish-not-file · DEC-3 no-mascot · DEC-4 friday separate · DEC-5 color.babb.dev · DEC-6 proof divergent · DEC-7 creds separate · DEC-8 slides font stays · DEC-9 CI/CD (words single-home friday via words.babb.dev, speedtest off babb.dev, no-rsync, branch=master+parameterize, publish=changesets).

## Two hard gates
**keyframes `3.0.0`** + **glass-ui `3.2.0`** PUBLISH before consumers adopt.

## Order
**T0 (parallel):** keyframes(→pub 3.0.0) ‖ glass-ui(→pub 3.2.0) ‖ value.js K.W2 ‖ slides B.W0–W2 ‖ fourier dev.sh-P0+J.W2 ‖ speedtest AT-R1. **T1 (after both roots publish):** value.js K.W4/W5 ‖ fourier J.W5–W7 ‖ slides B.W3–W4 ‖ speedtest AT-R2. **T2 (after value.js v1.0.0):** glass-ui Metaballs+BlobDot ‖ value.js blob-lift + L.

## What each tranche does (recap)
- **keyframes.js (A) — root:** EasingResolvable; the **exported RAFPlayback PRM gate** (default-on — roots the constellation PRM-RAF epidemic); scheduler.yield in tick; WAAPI linear() spring; LoAF; README posture. Cut **3.0.0** (semver-correct barrel split) + changesets + `--provenance`. Publishes first → unblocks the dep-cohort (sudoku/bbnf).
- **glass-ui (AS) — root:** **P9** (build-independent component-utilities → fixes the constellation silent-no-op + the square configurator; round ConfiguratorLayer content); the primitives (Configurator `asideSide`+token default-RIGHT, `deriveAuroraFromColor`, `useTextHighlight`, self-hosted Fraunces face, `vt.ready` hardening, `--dock-fg-on-aurora`+`as`/`asChild`, motion-safe Spinner/Pulse); inherit the keyframes PRM gate in `/motion`; new DataTable/Tabs/SortableList a11y. Keep `proof:*` (DEC-6). Publish **3.2.0** + changesets/`--provenance`.
- **value.js (K→L) — babb.dev/api.color:** K.W2 substrate green + CRUD test + dock `transition:all` strip + blob C3 local fix; K.W4 aurora-derive (deriveAurora 2nd-consumer gate) + contrast guard; K.W5 modern-web + Fraunces + `:user-invalid` + inherited PRM; **v1.0.0** at K.W6; then blob-LIFT + tranche L (api excision). CI/deploy: babb.dev spine, git-pull (no rsync), unified ci.yml + lighthouse/axe gate.
- **fourier (J) — babb.dev/api.fourier, reference impl:** P0 dev.sh bash-3.2 fix; J.W2 remix/publish WRITE side; J.W5 compose the empty-state **void** (configurator stays RIGHT) + epicycle PRM + cross-page VT + trail taper + adopt P9 (rounds free) + `useTextHighlight`; **J.W6 = the instrumented-gate pilot** (real axe+Lighthouse); J.W7 CSP.
- **slides (B) — friday.institute exemplar:** B.W0–W2 responsive reflow (kill 0.29 letterbox) + dark-dock + `<360` collapse + declarative; B.W3–W4 adopt glass-ui `/deck` + home↔deck VT. **Font stays (DEC-8).** Branch→`master` + parameterize the deploy-gate (DEC-9). PRM-gate the constellation RAF.
- **speedtest (AT) — friday.institute (NOT babb.dev):** AT-R1 dial **CLS 0.3228** fix (revert-layer) + needle spring; AT-R2 VT completion re-founding (after glass-ui `vt.ready`) + mobile-blank-card; **add CI from zero** + wire the existing `lighthouserc.json` into the unified lighthouse+axe gate — **passing it lifts the SUM-1 freeze (DEC-9)**; adopt `deriveAurora` (gauge, 2nd consumer) + `@container`.

## Prompts
**① keyframes.js** *(root)* > Execute tranche A in full per `docs/tranches/A/` (incl. the `3.0.0` re-release + the exported `RAFPlayback` PRM gate + changesets/`--provenance`). Publish 3.0.0 first. Gate on green CI.

**② glass-ui** *(root)* > Execute AS in full per `docs/tranches/AS/` (incl. `design/AS.W5-constellation-primitives.md` §6 P9 first). Publish 3.2.0 first (+ `--provenance`/changesets; keep `proof:*` per DEC-6). Gate on the AS gate fleet.

**③ value.js** > Execute tranche K in full per `docs/tranches/K/`. K.W2 now; K.W4/W5 after glass-ui 3.2.0 + keyframes 3.0.0. CI/deploy = babb.dev spine, `api.color.babb.dev`, git-pull (DEC-9), unified `ci.yml` + lighthouse/axe gate. Gate on vue-tsc 0 + Playwright green vs no backend.

**④ fourier-analysis** > Execute tranche J in full per `docs/tranches/J/`. dev.sh-P0 + J.W2 now; J.W5–W7 after glass-ui 3.2.0. You're the instrumented-gate pilot (J.W6). Deploy = babb.dev spine (`api.fourier.babb.dev`). Gate on green CI incl. e2e.

**⑤ slides** > Execute tranche B in full per `docs/tranches/B/`. B.W0–W2 now (the `/deck` prerequisite); B.W3–W4 after glass-ui `/deck`+3.2.0. Font stays (DEC-8); branch→`master`+parameterize (DEC-9). Deploy = friday.institute CF Pages. Gate on typecheck+build.

**⑥ speedtest** > Execute tranche AT in full per `docs/tranches/AT/`. AT-R1 dial-CLS now; AT-R2 after glass-ui `vt.ready` hardening. Add CI from zero + wire your `lighthouserc.json` into the unified lighthouse+axe gate — passing it lifts the SUM-1 freeze (DEC-9; stay frozen until). Deploy = friday.institute (NOT babb.dev). Gate on the budget + green CI.

**⑦ sudoku** *(babb.dev; needs a session or assign — rides keyframes 3.0.0)* > Execute the sudoku grand-audit fold in full per `docs/grand-audit-2026-06-02.md`. **P0 (after keyframes 3.0.0 publishes):** bump `@mkbabb/keyframes.js` 2.0.0→3.0.0 + re-point the 4 moved `Animation`/`CSSKeyframesAnimation` imports (`usePathAnimation.ts:2`, `glyphAnimations.ts:7`) → un-blank the build; bump `@mkbabb/value.js` ^0.5.0→0.10.0. PRM: the mid-session reactive-teardown in `@mkbabb/pencil-boil`. Keep the hand-drawn pencil-boil aesthetic — **no glass-ui (DEC-3)**. Deploy = babb.dev spine: `sudoku.babb.dev` + `api.sudoku.babb.dev` (`:8120`; verify the `.pages.dev` tuple); add CI from zero + the unified lighthouse/axe gate. Gate on green CI.

## No-session repos (book / cohort)
bbnf (glass-ui+keyframes bump, mascot PRM, local-only) · words (**babb.dev** — `words.babb.dev` + `api.words.babb.dev`, mbabb server, `:8110` spine; re-point `deploy.sh` off friday; SW P0; CI from zero) · muster (K.W3, local-only) · deploy (ζ.5–ζ.10 — owns the unified standard).
