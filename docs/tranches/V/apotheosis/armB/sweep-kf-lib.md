# ARM B — keyframes.js LIBRARY truth sweep

**Checkout:** `/Users/mkbabb/Programming/keyframes-v-exec` · branch `master` · HEAD **`81a56990`** · pkg **`@mkbabb/keyframes.js@6.0.0`**.
**Pin drift note (G0′):** the letters pin kf at `master@0dac636b`; HEAD has since advanced **+2 docs-only commits** (`197a1f49`, `81a56990` — both `docs(V·vnext)`). No source moved; every zone/anchor below is re-derived at `81a56990`, not cited from the blueprint.
**Firewall:** independent of the Codex corpus (`vnext/`, `snapshot-vnext`, `armA` unread). All facts below are file:line from the live kf tree + git.

---

## 1 — src/animation module DAG (structure + wiring)

`src/` holds exactly ONE tree: `src/animation/**` (no other src top-level files). 14 zone dirs + 5 root files (`easing.ts` 99, `index.ts` 315, `load-engine.ts` 129, `public.ts` 173, `validate.ts` 245).

**Zone LOC (measured `wc -l`, all `.ts`) — confirms P3.1 exactly where it gives a figure:**

| Zone | LOC (measured) | P3.1 figure | Match |
|---|---|---|---|
| engine/ | 2602 | 2,602 | ✓ exact |
| compile/ | 4888 | 4,888 | ✓ exact |
| resolve/ | 1083 | 1,083 | ✓ exact |
| group/ | 1665 | 1,665 | ✓ exact |
| waapi/ | 978 | 978 | ✓ exact |
| physics/ | 2552 | (spring+decay+smooth+numeric+playback+oscillator~150+morph) | sub-split in P3.1 |
| orchestration/ | 3215 | (sequence/stagger/vt/timeline + flip 176 + drag 585 + split-text 486) | sub-split |
| svg/ | 956 | (draw ~194 + morph ~350 + motion-path ~180 + handle/geometry) | sub-split |
| scroll/ | 1233 | 1,233 | ✓ exact |
| ingest/ | 835 | 835 | ✓ exact |
| presets/ | 905 | 905 | ✓ exact |
| internal/ | 535 | 535 | ✓ exact |
| constants/ | 370 | 370 | ✓ exact |

**Every LOC anchor in P3.1 that is directly measurable is EXACT at HEAD — zero drift.** The library layer is a single cohesive DAG rooted at `index.ts` (public API barrel) with `public.ts` as the full static engine mirror (the `./engine` subpath source) and `load-engine.ts` as the lazy split boundary. Zone barrels (`index.ts` per dir) are the only cross-zone import surface (impure-barrel banned by proof:structure R3).

---

## 2 — internal/ fan-in (the OWNER-DECISION restructure cost sheet)

`internal/` = 535 LOC across 9 leaf files: `errors.ts` 108 · `reduced-motion.ts` 162 · `leaves.ts` 75 · `scheduler.ts` 49 · `binary-search.ts` 37 · `transport-core.ts` 36 · `animation-id.ts` 34 · `helpers.ts` 18 · `scroll-phases.ts` 16.

**Fan-in = 11 distinct importing modules** (grep `internal/` across `src/animation`, excluding self):
`compile`, `engine`, `group`, `orchestration`, `physics`, `scroll`, `svg`, `waapi` (8 zone dirs) + root files `index.ts`, `public.ts`, `easing.ts`. By nested subdir the pressure concentrates in **group (5 files), physics (4), scroll (3), orchestration/sequence (3), engine/play-lifecycle (3), engine (3), compile/emit (3)**.

P3.1 says "10-zone fan-in / G5′/LT-10 governs." Measured is **11 importers** (8 top-level zones + 3 root files). The `internal/` value.js-free-leaf law is the governing fence (see §5). **Restructure — not prune — is confirmed: no dead leaf; every file is consumed.**

---

## 3 — P4.3 flatten anchors RE-DERIVED at HEAD `81a56990` (13 config/gate anchors)

Law §7.3 requires anchor re-derivation at execution (N-ADJ-3: cites drift within days). Result — **9 of 13 anchors EXACT, 3 drifted, 1 aggregate**:

| # | Anchor | P4.3 cite | HEAD (`81a56990`) | State |
|---|---|---|---|---|
| 1 | tsconfig `@src/*` path | (grouped) | `tsconfig.json:17` | — |
| 2 | tsconfig self-alias `@mkbabb/keyframes.js`→src/animation/index.ts | :30 | `tsconfig.json:30` | ✓ EXACT |
| 3 | vite demo alias block | :41 | `vite.config.ts:37` (alias opens :37; `@styles`:43) | ⚠ DRIFT −4 |
| 4 | vite lib `entry` object | :156 | `vite.config.ts:153` | ⚠ DRIFT −3 |
| 5 | vite `engine/index` entry → `public.ts` | :172 | `vite.config.ts:172` (public.ts path) | ✓ EXACT |
| 6 | vite dts `entryRoot: "src/animation"` | :225 | `vite.config.ts:225` | ✓ EXACT |
| 7 | vite `compilerOptions.rootDir` (lockstep) | :229 | `vite.config.ts:227` | ⚠ DRIFT −2 |
| 8 | vitest `src/animation/index.ts` include | :18 | `vitest.config.ts:18` | ✓ EXACT |
| 9 | depcruise `LIGHT_FROM` | :84 | `.dependency-cruiser.cjs:84` | ✓ EXACT |
| 10 | depcruise `ENGINE_PATH` | :93 | `.dependency-cruiser.cjs:93` | ✓ EXACT |
| 11 | depcruise internal-leaf rule (`from:^src/animation/internal/`) | :171 | `.dependency-cruiser.cjs:171` | ✓ EXACT |
| 12 | structure-gate resolver self-alias map | index.mjs:91 | `scripts/gates/structure/index.mjs:91` | ✓ EXACT |
| 13 | engine-dts-rollup: public.ts src / rootDir | :34/:64 | `scripts/build/vite/engine-dts-rollup.ts:34` (`../../../src/animation/public.ts`) + `:64` (`rootDir` = `src/animation`) | ✓ EXACT |
| + | surface gates (aggregate "15 grep sites") | — | `scripts/gates/surface/boundary.mjs:91` (`ANIM=src/animation`); scans `src/animation/**` (:56); + published-surface.mjs / consume-bundle.mjs / agent-surface.mjs | present |

**The `./engine` subpath source is `public.ts` (NOT `engine/index.ts`)** — confirmed at both vite.config.ts:172 and engine-dts-rollup.ts:34. The 3 drifts are all in `vite.config.ts` (comment insertions push line numbers down); the P4.3 mandate "anchors MUST be re-derived at execution" is **vindicated on live evidence** — anchors 3/4/7 would have mis-targeted.

**Import-line count (the ≈340 churn estimate):** measured `from '…animation…'|@src` specifiers — **test = 265, bench = 32, scripts = 2** (narrow pattern; self-alias `@mkbabb/keyframes.js` imports in test add more). Order confirms the P4.3 ≈340 (test 277 + bench 37 + scripts 18 + demo ~9) figure. Intra-`src/animation` relative imports = **648** lines (the internal graph churn surface). Post-move re-verification required: 44-key engine mirror re-execution + `proof:structure --selftest` + full `lint` (depcruise).

---

## 4 — easing.ts:30/:38-39 boundary row (the ONE live census row, P1.4)

**CONFIRMED EXACT at HEAD.** `src/animation/easing.ts`:
- **:30** `const CSS_NATIVE_KEYWORD = /^(linear|ease|ease-in|ease-out|ease-in-out)$/;`
- **:38-39** `const CSS_FUNCTION_EASING = /^(cubic-bezier\(|steps\(|linear\(|step-start$|step-end$)/;`

These two regexes re-encode value.js's timing-function name table under kf's documented **"faithful CSS twin"** law (the surrounding doc-comment, :31-37, justifies `linear(...)` inclusion so the engine's own spring `linear()` emission round-trips — F.W7). `toEasing` (:26) and `toCssEasing` (below :39) are the consuming seam. This is the SOLE boundary row where a grammar-adjacent table is duplicated (all other kf↔value seams are thin pass-throughs: `scroll/grammar.ts`, `parseAnimationCSS`). **Adjudicate consume-vs-ratify:** it is a two-regex string classifier, not a parser — no productions. It ALSO is a kf regex-census row for addendum-2 (all-regex-abrogation): these two literals are legitimate CSS-keyword classifiers, the strongest consume-vs-ratify candidate.

---

## 5 — WAAPI surface today + what full-WAAPI (C12) would add

**Today (978 LOC, 6 files):** `delegation.ts` 173 · `densify.ts` 318 · `eligibility.ts` 267 · `emission.ts` 82 · `options.ts` 113 · `index.ts` 25. Barrel exports: `isWAAPIEligible`, `WAAPIEligibility`, `toWAAPIKeyframes`, `toWAAPIOptions`, `playWAAPI`, `attachNativeScrollTimeline`, `NativeScrollAttachment`. **`useWAAPI: true` is the DEFAULT** at `constants/defaults.ts:86` (confirms P0.2 row 6 KEEP-EARNED — every eligible play rides the strategy).

**What it emits/drives now:** effect-level `composite` (ONE operator/animation, `options.ts:35`, unmapped→`replace`), `direction`/`fill`/`duration`/`iterations`/`delay`. `playWAAPI` (`delegation.ts`) drives `target.animate()` (:27), `pause`/`play` (:44-47), awaits `wa.finished` (:67), `commitStyles()` if present (:83-85), `cancel()` (:87).

**Eligibility gate REJECTS (falls back to rAF) for:** custom transform fns (:133), non-uniform per-frame timing (:147), easing with no faithful CSS twin (:178), WebKit `linear()` HW-accel refusal (:195, CE-1.0), layout-dependent units→px freeze (:253), color interpolation needing perceptual lerp (:259), `var()`/`calc()` (:19-20 deliberate).

**Full-WAAPI support (C12) would ADD** — measured ABSENT in `waapi/`: `persist()` (0 files), `pseudoElement` targeting (0), `iterationComposite` (0), `getAnimations()` reflection (0), `CSS.registerProperty` custom-property animation (0), `updatePlaybackRate`/live `playbackRate` (0), per-keyframe `composite` member (only effect-level today). Plus **widening the eligibility gate** to admit the currently-refused classes (WAAPI-native color, layout units, calc). This is net-new surface + gate liberalization, not a restore.

---

## 6 — Gates/tests state

**proof:structure** (`package.json:50` → `scripts/gates/structure/index.mjs`): LIVE, encodes the R2-05 "one grammar" as **6 falsifiable rules** — R1 dir-prefix stutter · R2 single-consumer fragment/hollow-shim · R3 impure-barrel ban · R4 500-raw-line ceiling (allowlist EMPTY; src max 484L) · R5 kind-dir ban · R6 no-unused-exports. BIRTH SCOPE `src/` only; `--selftest` proves each rule can pass AND fail. **NO isomorphism rule exists in it** (see §7).

**depcruise / `lint`** (`package.json:44` = `depcruise src`): LIVE as a script. The value.js-free internal-leaf law at `.dependency-cruiser.cjs:171` (`from:^src/animation/internal/`), LIGHT_FROM :84, ENGINE_PATH :93.

**CI wiring (`.github/workflows/ci.yml`) — CONFIRMS P3.3:** the library-gates job runs `check:lib` (:42), `build:lib` (:44), `test:lib` (:46), `proof:publish` (:48). The demo job runs the roster + `proof:publish` again + `audit:lighthouse` **masked** (`:100` `npm run audit:lighthouse || echo "…recorded"` — cannot fail). **`lint` (depcruise) and `proof:structure` appear in NO workflow, ever** — grep across all 3 workflow files (ci/deploy-pages/release) = 0 hits. The two cheapest real structural guards are enforcement-free exactly as P3.3 row 2 states; wiring them = two one-line CI steps. `proof:owner-golden` still present (`package.json:52`) — the W9 `→review:` rename has NOT landed on master.

**W9 staging branch — EXISTS.** `v/w9-staging` present both **local and `remotes/origin/v/w9-staging`**, HEAD **`b920b1902b4854c1bc7c5778d1674436dd51dce6`** (`b920b190` — matches P3.3/P5 exactly). The staged quartet (MR1–MR4) + prune is real and unlanded; landing it is P3.3 row 1.

---

## 7 — Test-tree isomorphism state

**test/ tree mirrors src/animation zones de-facto, but NO gate enforces it.** `test/` subdirs: `compile, engine, group, ingest, orchestration, physics, presets, resolve, scroll, svg, waapi, internal` (12 — one-to-one with the src zones) + support/non-zone dirs `_root, characterization, demo, fixtures, support`. The mirror is real on disk.

**But proof:structure's 6 rules (R1–R6) contain NO test-tree isomorphism rule and NO support-dir allowlist** — its BIRTH SCOPE is `src/` only. Confirms P4.4 §4: "kf needs a NEW isomorphism rule + support-dir allowlist." The tree LOOKS isomorphic; nothing locks it against re-drift, and the 5 support dirs (`_root/characterization/demo/fixtures/support`) have no formalized exemption. This is born-RED gate work (the rule + the allowlist must be authored), not a restructure — the underlying tree already largely complies.

---

## Load-bearing deltas vs the blueprint
1. HEAD advanced 0dac636b→**81a56990** (+2 docs commits) — re-pin.
2. All measurable P3.1 zone LOC **EXACT**; internal fan-in = **11** importers (P3.1 said "10-zone").
3. P4.3 anchors: **9/13 EXACT, 3 vite drifts (−4/−3/−2), engine-dts-rollup :34/:64 EXACT** — re-derivation mandate vindicated.
4. easing.ts:30/:38-39 **EXACT** — the sole live boundary census row.
5. `lint` + `proof:structure` confirmed **unwired in all CI**; `audit:lighthouse` masked; W9 staging branch **exists at b920b190**; `proof:owner-golden` un-renamed on master (W9 unlanded).
6. Test tree de-facto isomorphic but **no enforcing rule / no support allowlist** (born-RED gate work).
